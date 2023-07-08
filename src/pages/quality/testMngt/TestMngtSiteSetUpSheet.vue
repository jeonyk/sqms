<template>
    <section class="tab_contents">
        <!-- <h2 class="sub_title">시험관리 &gt; 현장 Set-up</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />

        <div class="lst_tabs">
            <ul class="">
                <li
                    v-for="(item, index) in tab.list"
                    :class="{active: tab.current === index}"
                    :key="item"
                >
                    <a
                        href="javascript:void(0);"
                        @click="tab.current = index"
                    >
                        {{ item }}
                    </a>
                </li>
            </ul>
        </div>

        <div 
            v-show="tab.current === 0"
            class="tab_area"
        >
            <!-- <search-category-box
                :category-data="categoryData"
                @search-category="searchCategory"
            /> -->

            <div class="right_content" >
                <div class="inner">
                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel"  @click="fn_exportExcel()">엑셀 다운로드</button>
                        <!-- v-if="this.checkUser(this.userId,'down')" @click="fn_exportExcel()" -->
                        <!-- 협력사 페이지 임시 주석 -->
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="addTestInstt">추가</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="delTestInstt">삭제</button>
                        </div>
                    </div>


                    <div class="ib_wrap" :style="{height: 'calc(100vh - 250px)'}">
                        <div id="agencyTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-show="tab.current === 1"
            class="tab_area"
        >
            <div class="lst_tabs_in">
                <ul>
                    <li
                        v-for="(inner, index) in tab.innerList"
                        :class="{active: tab.innerCurrent === index}"
                        :key="index"
                    >
                        <a 
                            href="javascript:void(0);"
                            @click="tab.innerCurrent = index"
                        >
                            {{ inner.value }}
                        </a>
                    </li>
                </ul>
            </div>

            <numbering
                :title="tab.innerList[tab.innerCurrent].value"
                code-type="TEST"
                :key="tab.innerList[tab.innerCurrent].key"
                :code-dtl-type="tab.innerList[tab.innerCurrent].key"
                :useSameAsRequest="tab.innerList[tab.innerCurrent].useSameAsRequest"
            />
        </div>

        <div
            v-show="tab.current === 2"
            class="tab_area"
        >
            <approval-option
                code-type="TEST"
            />
        </div>

        <!-- <wrapped-alert
            refs="alertPopup"
            :title="popup.title"
            :is-show.sync="popup.isShow"
            :message="popup.message"
            :purpose="popup.purpose"
            :use-cancel-button="popup.useCancelButton"
            @click-confirm="clickPopupConfirm"
            @click-cancel="clickPopupCancel"
        /> -->
        <add-test-instt-popup  :requestParams="requestParams" @responseInsttCallback="responseInsttCallback"/>
    </section>
</template>

<script>
import AddTestInsttPopup from "@/pages/quality/testMngt/component/AddTestInsttPopup";
// import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
import loader from '@ibsheet/loader';
import { sendPostApi, requestOptions } from '@/apis/common';
import { testAgency } from '@/pages/quality/testMngt/data/testData';
import Numbering from "@material/component/Numbering"
import ApprovalOption from "@material/component/ApprovalOption"
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

import axios from 'axios'

export default {
    name: 'testMngtSiteSetUpsheet',
    mixins: [MsgBoxMixins],
    data () {
        return {
            // tabInfo
            tab: {
                current: 0,
                list: ['품질시험기관', 'Numbering', '결재 옵션'],  // tab name
                innerCurrent: 0,
                innerList: [
                    {
                        key: 'SITE',
                        value: '현장',
                    },
                    {
                        key: 'REQT',
                        value: '의뢰',
                    },
                    {
                        key: 'FTRY',
                        value: '공장',
                    },
                ],
            },
            data: {
                sheet: null,
                options: {},
                data: []
            },
            userId : '',
            requestParams : {
                siteMstrId :'',     /* 현장정보 ID */
                testInsttId :'',    /* 시험기관ID */
                editMode : '',
            },
        }
    },
    components: {
        AddTestInsttPopup,
        // TreeCategoryTab,
        // WrappedAlert,
        Numbering,
        ApprovalOption,
        Breadcrumb,
    },
    watch: {
        // 'search.tab.data': {
        //     handler () {
        //         if(this.mounted) {
        //             this.getGridData({
        //                 productName: '',
        //                 mainCodeId: this.search.tab.data.mainCodeId,
        //                 midCodeId: this.search.tab.data.midCodeId,
        //             })
        //         }
        //     },
        //     deep: true
        // },
        // "tab.current": {
        //     handler () {
        //         console.log('tab changed');
        //         this.removeSheet();
        //         this.initializeGrid();
        //     }
        // }
    },
    mounted () {
        // await this.getCategoryData()

        // this.initializeGrid ()
        // this.default.siteMasterId = this.$cookies.get('siteMstrId')

        // this.mounted = true
        this.userId = this.$session.get('userInfo').userId;
        this.fn_initialize()
    },
    beforeDestroy () {
        // this.grid.grid.dispose()
        // loader.removeSheet(this.grid.grid.id);

        // for (var i = 0; i < this.pageInfo.pageSheets.length; i++) {
        //     loader.removeSheet(this.pageInfo.pageSheets[i]);
        // }
        // this.pageInfo = null;
        if (this.data.sheet) this.data.sheet.dispose()
    },
    methods: {
        // event 처리
        fn_initialize: function () {
            this.data.options = testAgency.options
            this.data.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchData()
                },
                ondblclick : this.getDetail
            }

            loader.createSheet({
                el: 'agencyTable',
                data: this.data.data,
                options: this.data.options
            }).then(sheet => {
                this.data.sheet = sheet
            })
        },
        fn_fetchData: function () {
            const url = '/sendApi/api/testMngt/siteSetUp/qltyTestInstt/list'
            const payload = {
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    this.data.data = response.data.datas.dlTestInstt

                    this.data.sheet.loadSearchData({
                        data: this.data.data,
                    })
                })

        },
        addTestInstt : function() {
            this.requestParams.editMode = 'W';
            // 품질시험기관 추가
            this.$root.$emit('bv::show::modal', 'AddTestInsttPop');
        },
        responseInsttCallback : function() {
            // console.log("responseInsttCallback")
            this.$root.$emit('bv::hide::modal', 'AddTestInsttPop');
            this.fn_fetchData();
        },
        delTestInstt : function() {
            // 품질시험기관 삭제 체크
            const checkedRows = this.data.sheet.getRowsByChecked("chk");

            if(checkedRows == [] || checkedRows.length == 0){
                this.alert('삭제할 행을 선택해주세요.');
                return;
            }

            this.confirm('삭제 하시겠습니까?', this.delSaveTestInstt);
        },
        delSaveTestInstt : async function() {
            // console.log("delSaveTestInstt")
            // 품질시험기관 삭제
            let checkedRows = this.data.sheet.getRowsByChecked("chk");

            this.data.sheet.deleteRows(checkedRows);
            checkedRows.forEach(item => {
                this.data.sheet.hideRow({
                    row: item,
                    del: false,
                    norender: false
                });
            });
            let param = this.data.sheet
                                    .getSaveJson({saveMode: 0})
                                    .data
                                    .filter(item => item.STATUS === 'Deleted')
                                    .map(item => {
                                        item.status = item.STATUS
                                        return item
                                    })
// console.log("  param : %o", param)

            let url = '/sendApi/api/testMngt/siteSetUp/qltyTestInstt/unuse';
            let payload = {
                listData : param
            }

            const data = await sendPostApi(url, payload);

            if( data.status == 200 ){
                this.alert("삭제 되었습니다.", this.fn_fetchData);
            }

        },
        getDetail : function(event) {
            // var selectRow = this.sheet.getRowById(param.row.id);
            // console.log("select : %o", selectRow)
            this.requestParams.editMode = 'S';
            this.requestParams.siteMstrId = event.row.siteMstrId;
            this.requestParams.testInsttId = event.row.testInsttId;

            this.$root.$emit('bv::show::modal', 'AddTestInsttPop');
        },
        initializeGrid () {
            // console.log("this.tab.current : %o", this.tab.current)
            switch(this.tab.current) {
                case 0: { // 품질시험기관 {}
                    this.grid =  {
                        sheetEl: [],
                        sheetId: [],
                        data: {
                            selectData: [],
                            selectedData: []
                        },
                        options: {},
                        focus: {
                            row: null,
                            col: null
                        },
                        addRowsCount: 1,
                    }
                    this.grid.options = testAgency.options;
                    this.grid.options.Events = {
                        onRenderFirstFinish : async (event) => {
                            this.dataLoad();
                            // await this.getAgencyGridData()
                        },
                        onRenderFinish: this.dataLoad()
                    };

                    loader.createSheet({
                        //id: 'agencySheet',
                        el: 'agencyTable',
                        data: this.grid.data,
                        options: this.grid.options
                    }).then(sheet => {
                        // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
                        this.grid.sheetEl['agency'] = sheet;
                        // 생성된 시트 id를 pageSheets 배열에 넣어둠
                        this.grid.sheetId.push(sheet.id);
                        
                    });
                    break;
                } 
                case 1:
                    break;

                case 2: // 결재 옵션
                    this.getPaymentOption();
                    break;
            }
        },
        async getPaymentOption() {  // 결재 옵션 불러오기
            try {
                const url = '/sendApi/api/apvlOptn/approvalOption/view';
                let payload = {
                    codeType : 'TEST',
                    siteMstrId : this.$cookies.get('siteMstrId')
                };
                const { data } = await sendPostApi(url, payload, {
                    headers: {
                        "Content-Type": "application/json;",
                        "Accept-Language": "ko",
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });

                let paymentType = data.data.aprvOptnType;
                switch (paymentType) {
                    case 'ALLON':
                        this.approval.current = 0;
                        break;
                    case 'HAFON':
                        this.approval.current = 1;
                        break;
                    case 'OFFLN':
                        this.approval.current = 2;
                        break;
                }
            } catch (error) {
                console.log(error.response);
            }
        },
        async savePaymentOption() { // 결재 옵션 저장
            try {
                // console.log(this.approval.current);
                const url = '/sendApi/api/apvlOptn/approvalOption/change';

                let payload = {
                    codeType : 'TEST',
                    siteMstrId : this.$cookies.get('siteMstrId'),
                    aprvOptnType : this.approval.list[this.approval.current].value
                };
                const response = await sendPostApi(url, payload, {
                    headers: {
                        "Content-Type": "application/json;",
                        "Accept-Language": "ko",
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log(response);
            } catch (error) {
                console.log(error.response);
            }
        },
        dataLoad() {
            // console.log("dataLoad")
            this.getAgencyGridData();
        },
        async getAgencyGridData (param) {   // 품질시험기관 Data
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            const url = '/sendApi/api/testMngt/siteSetUp/qualityTestAgency/list';
            const payload = {
                ...param,
                siteMasterId: this.$cookies.get('siteMstrId'),
            };

            try {
                const data = await sendPostApi(url, payload)
                                        .then((data)=>{
                                            this.grid.data = data.data.datas.dlTestAgency;

                                            this.grid.sheetEl['agency'].loadSearchData({
                                                data: this.grid.data,
                                                append: false
                                            });
                                        });

            } catch (error) {
                console.log(error.response.data);
            }
        },
        
        /* searchCategory (item) { // 기획서 검색 기능 삭제
            // this.search.box = item
            let searchItem = this.grid.data.filter(data => data.tradeNm.includes(item.agencyName) && data.jobRoleNm.includes(item.managerName));
            
            this.search.box = searchItem;
            this.grid.grid.loadSearchData({
                data: this.search.box,
                append: false
            })
        }, */

        addList(){
            // console.log('admin페이지로 이동');
            // this.$router.push('/');
        },

        removeSheet() { // sheet 객체 삭제
            
            if (this.grid.sheetEl['agency']) {
                this.grid.sheetEl['agency'].dispose();
            }
            
            for (var i = 0; i < this.grid.sheetId.length; i++) {
                loader.removeSheet(this.grid.sheetId[i]);
            }
            this.grid =  {
                sheetEl: [],
                sheetId: [],
                data: {
                    selectData: [],
                    selectedData: []
                },
                options: {},
                focus: {
                    row: null,
                    col: null
                },
                addRowsCount: 1,
            }
        },

        async saveData () {
            const changedInfoToJson = this.grid.grid.getSaveJson({
                saveMode: 3
            })

            changedInfoToJson.data.forEach(item => {
                item.status = item.STATUS
                item.siteMasterId = this.default.siteMasterId
            })
        },

        clickPopupConfirm (purpose) {
            this.popup.isShow = false
            
            // console.log(purpose)
        },
        clickPopupCancel (purpose) {
            this.popup.isShow = false

            // console.log(purpose)
        },
        openPopup (type) {
            this.popup = {
                ...this.popup,
                ...this.default.popup[type]
            }
            this.popup.isShow = true
        },
        fn_exportExcel: function () {
            this.data.sheet.down2Excel({
            merge:      1,
            downCols:   'Visible',
            reqHeader:  {
                            'Authorization': this.$cookies.get('Authorization'),
                            'Accept-Language': 'ko'
                        },
            fileName:    `품질시험기관_${this.$moment().format('YYYYMMDD')}.xlsx`

            })
        },
        
    },
    
}
</script>
