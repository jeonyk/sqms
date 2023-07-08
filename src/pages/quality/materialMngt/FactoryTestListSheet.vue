<template>
            <div class="tab_contents">
                <!-- <h2 class="sub_title">자재관리 > 공장검사</h2> -->
                <Breadcrumb :currentPath="$route.fullPath" />
                <div class="lst_tabs">
                    <ul class="">
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                    </ul>
                </div>
                <div class="tab_area submenu_on" v-show="currentTab == 0">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="4%">
                                <col width="24%">
                                <col width="5%">
                                <col width="24%">
                                <col width="5%">
                                <col width="24%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>품명</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="prdtNm" @keyup.enter="fetchFactoryTestList(0)" :maxlength="100"></td>
                                    <th>자재 TYPE</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="mtrlMainYn">
                                            <option value="" selected>전체</option>
                                            <option value="Y">주요자재</option>
                                            <option value="N">일반자재</option>
                                        </select>
                                    </td>
                                    <th>검사실시일</th>
                                    <td>
                                        <date-picker-range v-model="dateValue"/>
                                        <!-- <DatepickerRange ref="datepickerRange" v-on:value-change="dateRangeChange" v-on:value-reset="dateRangeReset"/> -->
                                    </td>              
                                    <td class="ar">
                                        <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="fetchFactoryTestList(0)">검색</button>
                                    </td>
                                </tr>
                                <!-- <tr>
                                    <th>공종</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="mainCodeId" v-on:change="selectChange()">
                                            <option value="" selected>전체</option>
                                            <option v-for="(subItem,oneIndex) in categoryData" v-bind:key="oneIndex" v-bind:value="subItem.mainCodeId">
                                                {{subItem.mainName}}
                                            </option>
                                        </select>
                                    </td>                                
                                    <th>세부공종</th>
                                    <td>
                                        <select name="" id="midCode" class="form_control size_md" v-model="midCodeId" disabled>
                                            <option value="" selected>전체</option>
                                            <option v-for="(subItem,twoIndex) in categoryDataSub" v-bind:key="twoIndex" v-bind:value="subItem.midCodeId">
                                                {{subItem.midName}}
                                            </option>
                                        </select>
                                    </td>
                                </tr> -->
                                <tr>
                                    <th>공급업체</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="spprNm" @keyup.enter="fetchFactoryTestList(0)" :maxlength="30"></td>                  
                                    <th>제조업체</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="mnft" @keyup.enter="fetchFactoryTestList(0)" :maxlength="30"></td>
                                    <th>현황</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="testStatus">
                                            <option value="" selected>전체</option>
                                            <option value="REGT">검사 등록</option>
                                            <option value="CHECK">검사중</option>
                                            <option value="APVL">결재중</option>
                                            <option value="APRV">완료</option>
                                        </select>
                                    </td>                  
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <tree-category-tab
                        :category-data="categoryData"
                        :use-check-box="false"
                        @changed-checked-list="changedTabCheckedList"
                    />
                    <div class="right_content">
                        <div class="inner">
                            <div class="button_box">
                                <button type="button" class="btn btn_sm btn_excel" id="excelBtn" @click="fn_exportExcel(mySheet)">엑셀 다운로드</button>
                                <button type="button" class="btn btn_sm btn_outline btn_darkgray btn_print" v-on:click="print()" v-if="checkUser(userId,'down')">출력</button>
                                <button type="button" class="btn btn_sm btn_darkgray" @click="ftryOzReport('1')" v-if="checkUser(userId,'down')">레미콘(아스콘) 공장 사전(정기)점검표</button>
                                <button type="button" class="btn btn_sm btn_darkgray" @click="ftryOzReport('2')" v-if="checkUser(userId,'down')">공장검사 결과 보고서</button>
                                <!-- <button type="button" class="btn btn_sm btn_outline btn_darkgray btn_print" v-print="'#mysite_area'">출력</button> -->
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="copyInsert" v-if="checkUser(userId,'write')">등록복사</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" @click="openPop" v-if="checkUser(userId,'write')">신규등록</button>
                                    <button type="button" class="btn btn_sm btn_darkblue" @click="insertSignChk" v-if="checkUser(userId,'write')">결재상신</button>
                                </div>
                            </div>
                            <!-- ibsheet -->
                            <div class="ib_wrap" id="mysite_area" style="height: calc(100vh - 350px)">
                                <div id="factorySheetTable" class="ibsheet_table" style="height:100%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab_area submenu_on" v-show="currentTab == 1">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="24%">
                                <col width="5%">
                                <col width="24%">
                                <col width="5%">
                                <col width="24%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select name="" id="" class="form_control" v-model="mngtType">
                                                <option value="">전체</option>
                                                <option value="0">관리</option>
                                                <option value="1">비관리</option>
                                                <option value="2">준공</option>
                                            </select>
                                            <input type="text" class="form_control" placeholder="입력해주세요" v-model="projNm" @keyup.enter="fetchFactoryTestList(1)" :maxlength="100">
                                        </div>    
                                    </td>              
                                    <th>품명</th>
                                    <td><input type="text" class="form_control size_lg" placeholder="입력해주세요" v-model="prdtNm" @keyup.enter="fetchFactoryTestList(1)" :maxlength="100"></td>                 
                                    <th>자재 TYPE</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="mtrlMainYn">
                                            <option value="" selected>전체</option>
                                            <option value="Y">주요자재</option>
                                            <option value="N">일반자재</option>
                                        </select>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="fetchFactoryTestList(1)">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>검사실시일</th>
                                    <td>
                                        <date-picker-range v-model="dateValue"/>
                                        <!-- <DatepickerRange ref="datepickerRange2" v-on:value-change="dateRangeChange2" v-on:value-reset="dateRangeReset2"/> -->
                                    </td>  
                                    <!-- <th>공종</th>
                                    <td>
                                        <select name="" id="" class="form_control size_lg" v-on:change="selectChange()" v-model="mainCodeId">
                                            <option value="" selected>전체</option>
                                            <option v-for="(subItem,oneIndex) in categoryData" v-bind:key="oneIndex" v-bind:value="subItem.mainCodeId">
                                                {{subItem.mainName}}
                                            </option>
                                        </select>
                                    </td>                                
                                    <th>세부공종</th>
                                    <td>
                                        <select name="" id="midCode2" class="form_control size_md" v-model="midCodeId" disabled>
                                            <option value="" selected>전체</option>
                                            <option v-for="(subItem,twoIndex) in categoryDataSub" v-bind:key="twoIndex" v-bind:value="subItem.midCodeId">
                                                {{subItem.midName}}
                                            </option>
                                        </select>
                                    </td> -->
                                <!-- </tr>
                                <tr> -->
                                    <th>공급업체</th>
                                    <td><input type="text" class="form_control size_lg" placeholder="입력해주세요" v-model="spprNm" @keyup.enter="fetchFactoryTestList(1)" :maxlength="30"></td>                  
                                    <th>제조업체</th>
                                    <td><input type="text" class="form_control size_lg" placeholder="입력해주세요" v-model="mnft" @keyup.enter="fetchFactoryTestList(1)" :maxlength="30"></td>                  
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <tree-category-tab
                        :category-data="categoryData"
                        :use-check-box="false"
                        @changed-checked-list="changedTabCheckedList"
                    />
                    <div class="right_content">
                        <div class="inner">
                            <div class="button_box">
                                <!-- <button type="button" class="btn btn_sm btn_outline btn_darkgray btn_print" v-print="'#allSite_area'">출력</button> -->
                                <button type="button" class="btn btn_sm btn_excel" id="excelBtn" @click="fn_exportExcel(allSheet)">엑셀 다운로드</button>
                                <button type="button" class="btn btn_sm btn_outline btn_darkgray btn_print" v-on:click="print()">출력</button>
                            </div>
                            <!-- ibsheet -->
                            <div class="ib_wrap" id="allSite_area" style="height: calc(100vh - 350px)">
                                <div id="factorySheetTable2" class="ibsheet_table" style="height:100%"></div>
                            </div>
                        </div>
                    </div>
                <br>
                </div>
                <NewFactoryTestPop 
                    v-bind:aprv-type="aprvOptnType" v-bind:detail-obj="detailObj" 
                    :ref-id="'ftryList_NewFactoryTestPop'"
                    v-on:add-factory="addFactory"/>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
                <approve
                    ref-id="factoryApproveModal"
                    doc-type="MTRL"
                    :code-type="approve.codeType"
                    :code-dtl-type="approve.codeDtlType"
                    :main-code-id="approve.mainCodeId"
                    :mid-code-id="approve.midCodeId"
                    :request-id="approve.requestId"
                    :doc-name="approve.docName"
                    :doc-seq="approve.docSeq"
                    :file-type="approve.fileType"
                    :site-mstr-id="approve.siteMstrId"
                    @callback="fn_setSourceApproval"
                    alertable
                />
                <excel-download
                    v-model="excelDownload.request"
                    ref-id="FactoryTestListSheet_ExcelDownload"
                    :file-name="excelDownload.fileName"
                    :options="excelDownload.options"
                    :data="excelDownload.data"
                />
            </div>
</template>

<script>
    import loader from '@ibsheet/loader'
    import { MaterialFactory, MaterialFactory2 } from '@/pages/common/data/MaterialsList'
    import NewFactoryTestPop from '@/pages/quality/materialMngt/NewFactoryTestPop.vue'
    import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
    import API from '@/apis/'
    import axios from 'axios'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    // import DatepickerRange from '../../common/popup/DatepickerRange.vue'
    import Approve from '@modal/approval/Approve.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { mapGetters } from 'vuex'
    import {sendPostApi, requestOptions }  from '../../../apis/common';
    import ExcelDownload from '@component/common/ExcelDownload.vue';

    let mySheetId = '';
    let allSheetId= '';

    export default {
        name: 'FactoryTestListSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            PopAlert,
            NewFactoryTestPop,
            TreeCategoryTab,
            // DatepickerRange,
            DatePickerRange,
            Approve,
            Breadcrumb,
            ExcelDownload,
        },
        computed: {
            ...mapGetters({
                siteMstrId: 'auth/getSiteMstrId'
            })
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정
                tabs: ['My Site', 'All Sites'], // tab name 
                
                //tree tab menu[S]
                mounted: false,
                search: {
                    tab: {
                        useCheckBox: false,
                        data: null
                    },
                    box: {}
                },
                categoryData: [],
                category: {
                    data: []
                },
                categoryDataSub:[],
                categoryList:[],
                //tree tab menu[E] 
                mySheet : null,
                allSheet : null,
                
                popMsg: '',                                 // 알림창 메세지
                confirmUse: '',                             // 알림창 버튼개수
                popId:'factLstAlert',                       // 알림창 Id
                // siteMstrId: '',                             // 현장정보Id
                projNm: '',
                mngtType : '0',

                mainCodeId: '',                             // 공종 Id
                midCodeId: '',                              // 세부공종 Id
                midName: '',                                // 세부공종명
                detailObj: [],                              // 등록복사용
                newYn: false,                               // 등록확인용
                prdtNm: '',                                 // 품명 
                prdt: '',                                   // 품명id                     
                mainCode: '',                               // 공종                  
                midCode: '',                                // 세부공종
                mainName: '',                               // 공종명
                testStatus: '',                             // 현황
                stnd: '',                                   // 규격
                sppr: '',                                   // 공급업체
                spprNm: '',                                 // 공급업체명
                mnft: '',                                   // 제조업체
                mnftNm: '',                                 // 제조업체명
                startDate: '',                              // 검색필터-시작일
                endDate: '',                                // 검색필터-종료일
                startDate2: '',
                endDate2: '',
                ftryJdmt: '',                               // 결과
                mtrlMainYn: '',                             // 자재type
                aprvOptnType:'',
                approve: {
                    codeType: 'MTRL',
                    codeDtlType: 'TSFC',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: null,
                },


                /** ProgressBar Info - to global */
                // progressBar - Info
                progressInfo: [
                    {
                        code: 'REGT',
                        text: '검사등록',
                        value: 20
                    },
                    {
                        code: 'CHECK',
                        text: '검사중',
                        value: 45
                    },
                    {
                        code: 'APVL',
                        text: '결재중',
                        value: 75
                    },
                    {
                        code: 'APRV',
                        text: '완료',
                        value: 100
                    },
                ],
                dateValue:[],
                userId:'',
                userType:'',

                //엑셀다운로드
                excelDownload : {
                    request : false,
                    fileName :'',
                    downloadOption :'',
                    options : null,
                    data : [],
                }
            }
        },
        async mounted() {
            //tree tab menu[S]
            await this.getCategoryData();
            
            // this.mounted = true;
            //tree tab menu[E]

            /** render-순서변경 */
            this.userId = this.$store.getters['auth/getUserId'];
            this.userType = this.$store.getters['auth/getUserType'];
            if(this.userType == 'PTNR'){
                this.tabs= ['My Site'];
            }else{
                this.tabs= ['My Site', 'All Sites'];
            }
            if (this.$route.params.testStatus){
                this.testStatus = this.$route.params.testStatus
            }
            this.createSheetLst()
        },
        beforeDestroy() {
            // loader.removeSheet(mySheetId);
            // loader.removeSheet(allSheetId);
            if (this.mySheet)  loader.removeSheet(this.mySheet)
            if (this.allSheet) loader.removeSheet(this.allSheet)
        },
        watch: {
            // "search.tab.data": {
            //     handler () {
            //         // // //console.log('search.tab.data changed')
            //         if (this.mounted) {
            //             // //console.log(this.search.tab.data)
            //             this.mainCodeId = this.search.tab.data.mainCodeId? this.search.tab.data.mainCodeId : '';
            //             this.midCodeId = this.search.tab.data.midCodeId;
            //             this.midName = this.search.tab.data.midName;
            //         }
            //         this.sheetLoad();
            //     },
            //     deep: true
            // },
            currentTab: function(newVal){
                if (this.mounted) {
                    this.filterReset();
                    this.fetchFactoryTestList(newVal)
                }
                // this.sheetLoad();
            },
            // mainCodeId : function(){
            //     if (this.mounted) {
            //         if(this.mainCodeId == '' || this.mainCodeId == null){
            //             document.getElementById('midCode').setAttribute('disabled',true);
            //             document.getElementById('midCode2').setAttribute('disabled',true);
            //         }else{
            //             document.getElementById('midCode').removeAttribute('disabled');
            //             document.getElementById('midCode2').removeAttribute('disabled');
            //         }
            //     }
            // },
        },
        activated(){
            // keepAlive 재조회 처리
            if(this.$store.getters['tabInfo/getSavePage'].length > 0){
                
                //keepAlive 재조회 처리
                let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
                let url="/sendApi/api/programMngt/menuChildProgram/list"
                let reSearch = false;
                let param = {"menuMngtId":menuid}; 
                
                // sdave정보가 있는지 체크하여 처리
                sendPostApi(url, param).then((result) => {
                    // 하부 페이지 정보
                    for (let i = 0; i < result.data.dlprogram.length ; i++){
                        // 저장 페이지 정보와 비교
                        for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                            if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                                this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);

                                reSearch = true;
                                break;
                            }
                        }

                        if(reSearch){
                            break;
                        }
                    }

                    if(reSearch){
                        this.createSheetLst();
                    }

                }).catch((e) => {
                    // //console.log(e);
                    return e.response;
                });
            }
        },
        methods: {
            async getCategoryData () {
                const response = await API.material.getCategoryData();
                // // //console.log(response)
                if (response.status === 200 && response.data) {
                    // temporary
                    this.categoryData = response.data.list;
                    // //console.log(this.categoryData);
                    for(let x = 0; x<this.categoryData.length; x++){
                        this.categoryList.push(this.categoryData[x].mainCodeId);
                    }
                    //console.log(this.categoryData);
                    //console.log(this.categoryList);
                }
            },
            changedTabCheckedList (item) {
                // this.search.tab.data = item

                
                if (this.mounted) {
                    this.mainCodeId = item.mainCodeId   ? item.mainCodeId   : ''
                    this.midCodeId  = item.midCodeId    ? item.midCodeId    : ''
                    this.midName    = item.midName      ? item.midName      : ''
    
                    this.fetchFactoryTestList(this.currentTab)
                }
            },
            filterReset: function(){
                this.prdtNm= ''; //품명 
                this.prdt='';    //품명id                     
                this.mainCodeId= ''; //공종                  
                this.midCodeId= '';//세부공종
                this.midName='';//세부공종명
                this.testStatus= '';//현황
                this.stnd= '';//규격
                this.sppr= '';//공급업체
                this.spprNm='';//공급업체명
                this.mnft= '';//제조업체
                this.mnftNm= '';//제조업체명
                this.startDate= '';//검색필터-시작일
                this.endDate= '';//검색필터-종료일
                this.startDate2= '';//검색필터-시작일
                this.endDate2= '';//검색필터-종료일
                this.ftryJdmt= '';//결과
                this.mtrlMainYn= '';//자재type
                this.mngtType = '0';
                this.projNm = '';
                this.dateValue = [];
                // this.dateRangeReset();
                // this.dateRangeReset2();
                // this.sheetLoad();                    
            },
            
            /** API 호출  */
            fetchFactoryTestList: async function (currentTab) {
                this.detailObj = []
                const numTab = Number(currentTab)

                const params = {
                    mainCodeId:     this.mainCodeId ? this.mainCodeId   : undefined, 
                    midCodeId:      this.midCodeId  ? this.midCodeId    : undefined, 
                    prdtNm:         this.prdtNm     ? this.prdtNm       : undefined, 
                    spprNm:         this.spprNm     ? this.spprNm       : undefined, 
                    mtrlMainYn:     this.mtrlMainYn ? this.mtrlMainYn   : undefined, 
                    mnft:           this.mnft       ? this.mnft         : undefined, 
                    startDate:      this.dateValue  ? this.dateValue[0] : undefined,
                    endDate:        this.dateValue  ? this.dateValue[1] : undefined,
                }
                // tab 별 처리
                if (numTab === 0) {
                    params.siteMstrId   = this.siteMstrId   ? this.siteMstrId   : undefined
                    params.testStatus   = this.testStatus   ? this.testStatus   : undefined
                    params.apprJdmt     = this.apprJdmt     ? this.apprJdmt     : undefined
                    params.stnd         = this.stnd         ? this.stnd         : undefined
                    // params.startDate    = this.dateValue    ? this.dateValue[0] : undefined
                    // params.endDate      = this.dateValue    ? this.dateValue[1] : undefined
                } else if (numTab === 1) {
                    params.testStatus   = 'APRV'
                    params.projNm       = this.projNm       ? this.projNm       : undefined
                    params.mngtType     = this.mngtType     ? this.mngtType     : undefined
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get("Authorization")
                    }
                }

                try {
                    const rst = await API.material.getFactoryTestList (params, options)
                    // //console.log(rst.data.list)

                    if (rst.status === 200) {
                        this.aprvOptnType = rst.data?.data?.aprvOptnType

                        rst.data.list.forEach(item => {
                            item.mtrlMainYn     = item.mtrlMainYn === 'Y' ? '주요자재' : '일반자재'
                            item.inDttm         = item.inDttm ? this.$moment(item.inDttm).format('YYYY-MM-DD') : ''
                            item.apprJdmtNm     = item.apprJdmtNm ? item.apprJdmtNm : '-'
                            // item.insertYn       = item.testStatus === 'REGT' ? '0' : '1'
                            item.insertRst      = item.testStatus === 'REGT' ? '0' : '1'


                            if (numTab === 0) {
                                item.changeAmount   = item.testStatus !== 'REGT' && item.testStatus === 'CHECK' ? '0' : ''
    
                                const progress = this.progressInfo.find(prog => prog.code === item.testStatus)
    
                                let htmlElement     = ''
                                                        + '<div class="guage">'
                                                            + '<span class="bar_wrap">' 
                                                                + '<span class=\'bar '+ (item.testStatus === 'APRV' ? 'complete' : '') + '\' style=\'width:'+ progress.value +'%;\'></span>'
                                                            + '</span>'
                                                            + '<span class="label" style=\'width:'+ progress.value +'%\'>'+ progress.text +'</span>'
                                                        + '</div>'
                                item.testStatus     = htmlElement
                                item.testStatus2    = htmlElement
                                item.testStatus3    = htmlElement
                                item.testStatus4    = htmlElement
                                item.status         = progress.code
                            } 
                        })

                        if (numTab === 0) { 
                            this.mySheet.loadSearchData({
                                data: rst.data.list,
                            })
                        } else if (numTab === 1) {   
                            this.allSheet.loadSearchData({
                                data: rst.data.list
                            })
                        }
                    }
                } catch (error) {
                    //console.error(error)
                } finally {
                    this.mounted = true
                }
            },

            /** 시트 생성 */
            createSheetLst: function () {
                const myOptions = MaterialFactory.options
                myOptions.Events = {
                    onAfterClick: this.fnClick,
                    onDblClick : this.fnDblClick,
                    onRenderFirstFinish: () => {
                        this.fetchFactoryTestList(0)
                    },
                }
                loader.createSheet({
                    el:      'factorySheetTable',
                    data:    [],
                    options: myOptions,
                }).then(sheet => {
                    this.mySheet = sheet
                })

                const allOptions = MaterialFactory2.options
                allOptions.Events = {
                    onAfterClick: this.fnSecondClick,
                    onDblClick : this.allSiteDblClick,
                    onRenderFirstFinish: () => {
                        this.fetchFactoryTestList(1)
                    },
                }
                loader.createSheet({
                    el:      'factorySheetTable2',
                    data:    [],
                    options: allOptions,
                }).then(sheet => {
                    this.allSheet = sheet
                })

            },


            // 폐기
            sheetLoad: async function() {
                this.detailObj = [];
                // this.siteMstrId  = this.$cookies.get("siteMstrId");
                // let param = {};
                // // //console.log(this.currentTab);
                // if(this.mainCodeId != ''){//공종
                //     param['mainCodeId'] = this.mainCodeId;
                // }
                // if(this.midCodeId != ''){//세부공종명
                //     param['midCodeId'] = this.midCodeId;
                // }
                // if(this.prdtNm != ''){//품명
                //     param['prdtNm'] = this.prdtNm;
                // }
                // if(this.spprNm != ''){//공급업체명
                //     param['spprNm'] = this.spprNm; 
                // }
                // if(this.testStatus != ''){//상태
                //     param['testStatus'] = this.testStatus;
                // }
                // if(this.mtrlMainYn != ''){//자재type
                //     param['mtrlMainYn'] = this.mtrlMainYn;
                // }
                // if(this.apprJdmt != ''){//결과(적합,부적합)
                //     param['apprJdmt'] = this.apprJdmt;
                // }
                // if(this.mnft != ''){//제조업체명
                //     param['mnft'] = this.mnft;
                // }
                // if(this.stnd != ''){//규격
                //     param['stnd'] = this.stnd;
                // }
                // if(this.startDate != ''){//검색:시작일
                //     param['startDate'] = this.startDate;
                // }
                // if(this.endDate != ''){//검색:종료일
                //     param['endDate'] = this.endDate;
                // }
                // if(this.mngtType != ''){//프로젝트 기준
                //     param['mngtType'] = this.mngtType;
                // }
                // if(this.projNm != ''){//프로젝트명
                //     param['projNm'] = this.projNm;
                // }
                if(this.currentTab == 0){
                    
                    // //console.log(rst);
                    // this.aprvOptnType = rst.data.data.aprvOptnType;
                    // //console.log(this.aprvOptnType);
                    
                    let options = MaterialFactory.options;
                    options.Events = {
                        onAfterClick: this.fnClick,
                        ondblclick : this.fnDblClick,
                        // onRenderFinish: this.mergeProgressBar,
                        // onAfterSort: this.mergeProgressBar,
                        onRenderFirstFinish: async (event) => {
                            this.siteMstrId  = this.$cookies.get("siteMstrId");
                            let param = {};
                            // //console.log(this.currentTab);
                            if(this.mainCodeId != ''){//공종
                                param['mainCodeId'] = this.mainCodeId;
                            }
                            if(this.midCodeId != ''){//세부공종명
                                param['midCodeId'] = this.midCodeId;
                            }
                            if(this.prdtNm != ''){//품명
                                param['prdtNm'] = this.prdtNm;
                            }
                            if(this.spprNm != ''){//공급업체명
                                param['spprNm'] = this.spprNm; 
                            }
                            if(this.testStatus != ''){//상태
                                param['testStatus'] = this.testStatus;
                            }
                            if(this.mtrlMainYn != ''){//자재type
                                param['mtrlMainYn'] = this.mtrlMainYn;
                            }
                            if(this.apprJdmt != ''){//결과(적합,부적합)
                                param['apprJdmt'] = this.apprJdmt;
                            }
                            if(this.mnft != ''){//제조업체명
                                param['mnft'] = this.mnft;
                            }
                            if(this.stnd != ''){//규격
                                param['stnd'] = this.stnd;
                            }
                            if(this.startDate != ''){//검색:시작일
                                param['startDate'] = this.startDate;
                            }
                            if(this.endDate != ''){//검색:종료일
                                param['endDate'] = this.endDate;
                            }
                            if(this.mngtType != ''){//프로젝트 기준
                                param['mngtType'] = this.mngtType;
                            }
                            if(this.projNm != ''){//프로젝트명
                                param['projNm'] = this.projNm;
                            }
                            param['siteMstrId'] = this.siteMstrId;
                            const rst = await API.material.getFactoryTestList(param,{
                                headers:{
                                    'Authorization': this.$cookies.get("Authorization")
                                }
                            });
                            this.aprvOptnType = rst.data.data.aprvOptnType;
                            let data = rst.data.list;

                            let sheetText = ''; 
                            let sheetNum = 0; 
                            let sheetClass = ''; // 등록, 회신, 확인
                            let sheetCell;
                            let itemArr = ['REGT','CHECK','APVL','APRV'];
                            let nameArr = ['검사등록','검사중','결재중','완료'];
                            let itemNumArr = [20, 45, 75, 100];
                            // if(rst.statusText == "OK" && rst.data.list.length != 0){
                            if(rst.status == 200 && rst.data.list.length != 0){
                                for(let a = 0; a<data.length; a++){
                                    data[a].mtrlMainYn = (data[a].mtrlMainYn=='Y')?'주요자재':'일반자재';
                                    data[a].inDttm = (data[a].inDttm)==null?'':((data[a].inDttm)==''?'':(data[a].inDttm).substr(0,10));
                                    data[a]['insertRst']=(data[a].testStatus=='REGT')?'0':'1';
                                    // data[a]['changeAmount']=(data[a].testStatus=='REGT')?'':(data[a].testStatus=='CHECK'?'':'0');
                                    // data[a]['apprJdmtNm'] = (data[a]['apprJdmtNm'] == '')?'-':((data[a]['apprJdmtNm']) == null?'-':data[a]['apprJdmtNm']);
                                    sheetNum = 0;//그래프 크기초기화
                                    sheetClass = '';
                                    sheetText = '';
                                    sheetCell = data[a].testStatus;
                                    let status = sheetCell;
                                    itemArr.forEach(function(val,idx){
                                        if(data[a].testStatus === val){
                                            sheetNum = itemNumArr[idx];
                                            sheetText = nameArr[idx];
                                        }
                                    })
                                    if(sheetCell === 'APRV'){
                                        sheetClass = 'complete';
                                    }else{
                                        sheetClass = '';
                                    }
                                    var steps = '<div class="guage">'+
                                        '<span class="bar_wrap">' +
                                            '<span class=\'bar '+sheetClass+'\' style=\'width:'+sheetNum+'%;\'></span>' + 
                                        '</span>'+
                                        '<span class="label" style=\'width:'+sheetNum+'%\'>'+sheetText+'</span>' +
                                    '</div>';
                                    data[a].testStatus = steps;
                                    data[a]['testStatus2'] = steps;
                                    data[a]['testStatus3'] = steps;
                                    data[a]['testStatus4'] = steps;
                                    data[a]['status'] = status;
                                }
                            }else{
                                data = [];
                            }

                            event.sheet.loadSearchData({
                                data: data,
                                append: false
                            })

                        }
                    };

                    

                    loader.createSheet({
                        el: 'factorySheetTable',
                        data: [],
                        options: options,
                    }).then((sheet) => {
                        // mySheetId = sheet.id
                        this.mySheet = sheet
                    });
                }else{
                    
                    // //console.log(rst);
                    let options2 = MaterialFactory2.options;
                    options2.Events = {
                        onAfterClick: this.fnSecondClick,
                        // onRenderFinish: this.mergeProgressBar,
                        // onAfterSort: this.mergeProgressBar,
                        onDblclick : this.allSiteDblClick,
                        onRenderFirstFinish: async (event) => {
                            this.siteMstrId  = this.$cookies.get("siteMstrId");
                            let param = {};
                            // //console.log(this.currentTab);
                            if(this.mainCodeId != ''){//공종
                                param['mainCodeId'] = this.mainCodeId;
                            }
                            if(this.midCodeId != ''){//세부공종명
                                param['midCodeId'] = this.midCodeId;
                            }
                            if(this.prdtNm != ''){//품명
                                param['prdtNm'] = this.prdtNm;
                            }
                            if(this.spprNm != ''){//공급업체명
                                param['spprNm'] = this.spprNm; 
                            }
                            if(this.testStatus != ''){//상태
                                param['testStatus'] = this.testStatus;
                            }
                            if(this.mtrlMainYn != ''){//자재type
                                param['mtrlMainYn'] = this.mtrlMainYn;
                            }
                            if(this.apprJdmt != ''){//결과(적합,부적합)
                                param['apprJdmt'] = this.apprJdmt;
                            }
                            if(this.mnft != ''){//제조업체명
                                param['mnft'] = this.mnft;
                            }
                            if(this.stnd != ''){//규격
                                param['stnd'] = this.stnd;
                            }
                            if(this.startDate != ''){//검색:시작일
                                param['startDate'] = this.startDate;
                            }
                            if(this.endDate != ''){//검색:종료일
                                param['endDate'] = this.endDate;
                            }
                            if(this.mngtType != ''){//프로젝트 기준
                                param['mngtType'] = this.mngtType;
                            }
                            if(this.projNm != ''){//프로젝트명
                                param['projNm'] = this.projNm;
                            }

                            if(this.startDate2 != ''){//검색:시작일
                                param['startDate'] = this.startDate2;
                            }
                            if(this.endDate2 != ''){//검색:종료일
                                param['endDate'] = this.endDate2;
                            }
                            param['testStatus'] = 'APRV';
                            const rst = await API.material.getFactoryTestList(param,{
                                headers:{
                                    'Authorization': this.$cookies.get("Authorization")
                                }
                            });

                            let data2 = rst.data.list;
                            // if(rst.statusText == "OK" && rst.data.list.length != 0){
                            if(rst.status == 200 && rst.data.list.length != 0){
                                for(let a = 0; a< data2.length; a++){
                                    data2[a].mtrlMainYn = (data2[a].mtrlMainYn=='Y')?'주요자재':'일반자재';
                                    data2[a].inDttm = (data2[a].inDttm)==null?'':((data2[a].inDttm)==''?'':(data2[a].inDttm).substr(0,10));
                                    data2[a]['insertRst']=(data2[a].testStatus=='APRV')?'1':'';
                                }
                            }else{
                                data2 = [];
                            }

                            event.sheet.loadSearchData({
                                data: data2,
                                append: false
                            })


                        }
                    };
                    

                    loader.createSheet({
                        el: 'factorySheetTable2',
                        data: [],
                        options: options2,
                    }).then((sheet) => {
                        // allSheetId = sheet.id
                        this.allSheet = sheet
                        
                        // sheet.hideCol('mtrlSpApprId');
                    });
                }
            },
            dateRangeChange: function(param){
                this.startDate = param[0];
                this.endDate = param[1];
            },
            dateRangeReset: function(){
                this.startDate = null;
                this.endDate = null;
                this.$refs.datepickerRange.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            dateRangeChange2: function(param){
                this.startDate2 = param[0];
                this.endDate2 = param[1];
            },
            dateRangeReset2: function(){
                this.startDate2 = null;
                this.endDate2 = null;
                this.$refs.datepickerRange2.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            fnClick: function(evt){
                // console.log(evt.row);
                if(evt.col == 'selectYn'){//라디오버튼 이벤트
                    // //console.log(evt.row.mtrlSpApprId);
                    let tempLst = {};
                    tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                    tempLst['siteMstrId'] = evt.row.siteMstrId;
                    tempLst['rmcYn'] = evt.row.rmcYn;
                    // tempLst['mtrlSpApprSubId'] = evt.row.mtrlSpApprSubId;
                    tempLst['mtrlFtryTsId'] = evt.row.mtrlFtryTsId;
                    tempLst['testStatus'] = evt.row.status;
                    tempLst['mainCodeId'] = evt.row.mainCodeId;
                    tempLst['midCodeId'] = evt.row.midCodeId;
                    tempLst['aprvOptnType'] = evt.row.aprvOptnType;
                    tempLst['docSeq'] = evt.row.docSeq;
                    this.detailObj[0] = tempLst;
                    // //console.log(this.detailObj[0]);
                }
                if(evt.col == "insertRst" && evt.event.target.tagName == "BUTTON"){//검사결과등록 버튼
                    // let tempLst = {};
                    // tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                    // tempLst['mtrlFtryTsId'] = evt.row.mtrlFtryTsId;
                    // // tempLst['mtrlSpApprSubId'] = evt.row.mtrlSpApprSubId;
                    // this.detailObj[0] = tempLst;
                    // // //console.log(this.detailObj);
                    // //console.log(evt.row.mainCodeId);
                    let param = {
                        'siteMstrId' : this.siteMstrId,
                        'mtrlSpApprId' : evt.row.mtrlSpApprId.toString(),
                        'mtrlFtryTsId' : evt.row.mtrlFtryTsId,
                        'mySiteYn' : true,
                        'status': evt.row.status,
                        'rmcYn':evt.row.rmcYn,
                        'mainCodeId': evt.row.mainCodeId,
                        'midCodeId': evt.row.midCodeId,
                    }
                    // //console.log(param);
                    this.$router.push({
                        name : 'FactoryTestResultWrite',
                        params: param
                    });
                }
            },
            fnDblClick:function(evt){
                if(evt.col != "insertRst" && evt.col != 'selectYn'){//검사결과등록 버튼
                    // let tempLst = {};
                    // tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                    // tempLst['mtrlFtryTsId'] = evt.row.mtrlFtryTsId;
                    // // tempLst['mtrlSpApprSubId'] = evt.row.mtrlSpApprSubId;
                    // this.detailObj[0] = tempLst;
                    // // //console.log(this.detailObj);
                    // //console.log(evt.row.mainCodeId);
                    let param = {
                        'siteMstrId' : this.siteMstrId,
                        'mtrlSpApprId' : evt.row.mtrlSpApprId.toString(),
                        'mtrlFtryTsId' : evt.row.mtrlFtryTsId,
                        'mySiteYn' : true,
                        'status': evt.row.status,
                        'rmcYn':evt.row.rmcYn,
                        'mainCodeId': evt.row.mainCodeId,
                        'midCodeId': evt.row.midCodeId,
                    }
                    //console.log(param);
                    this.$router.push({
                        name : 'FactoryTestResultWrite',
                        params: param
                    });
                }
            },
            fnSecondClick:function(evt){
                if(evt.col == "insertRst" && evt.event.target.tagName == "BUTTON"){
                    // //console.log(evt.row.siteMstrId);
                    // this.$router.push({name : 'AcceptTestResultWrite', params: {mtrlAccpTsId : evt.row.mtrlAccpTsId}});
                    this.$store.dispatch('setInformation', {
                        siteMstrId : evt.row.siteMstrId,
                        mtrlSpApprId : evt.row.mtrlSpApprId.toString(),
                        mtrlFtryTsId : evt.row.mtrlFtryTsId,
                        testStatus:evt.row.status,
                        mySiteYn:false,
                    })
                    

                    let blankTemp = this.$router.resolve({
                        name : 'FactoryTestResultAllSite',
                    });
                    window.open(blankTemp.href,'_blank');
                }
            },
            allSiteDblClick:function(evt){
                if(evt.col != "insertRst"){
                    // //console.log(evt.row.siteMstrId);
                    // this.$router.push({name : 'AcceptTestResultWrite', params: {mtrlAccpTsId : evt.row.mtrlAccpTsId}});
                    this.$store.dispatch('setInformation', {
                        siteMstrId : evt.row.siteMstrId,
                        mtrlSpApprId : evt.row.mtrlSpApprId.toString(),
                        mtrlFtryTsId : evt.row.mtrlFtryTsId,
                        testStatus:evt.row.status,
                        mySiteYn:false,
                    })
                    
                    let blankTemp = this.$router.resolve({
                        name : 'FactoryTestResultAllSite',
                    });
                    window.open(blankTemp.href,'_blank');
                }
            },
            copyInsert: function(){
                /*
                if(this.detailObj.length == 0 ){
                    this.popMsg = '등록복사할 검사를 선택해주세요.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'factLstAlert');
                    return;
                }else{
                    this.detailObj['clickYn']=true;
                    this.$root.$emit('bv::show::modal', 'NewFactoryTestPop');
                }
                */
                const row = this.mySheet.getRowsByChecked('selectYn')[0];
                if(!row) {
                    this.alert('등록복사할 검사를 선택해주세요.');
                    // this.popMsg = '등록복사할 검사를 선택해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'factLstAlert');
                    return;
                } else {
                    this.detailObj['clickYn']=true;
                    this.$root.$emit('bv::show::modal', 'ftryList_NewFactoryTestPop');
                }
            },
            closePop:function(){
                this.$root.$emit('bv::hide::modal', 'factLstAlert');
            },
            addFactory: function(rst){//신규등록팝업 닫힌후
                this.newYn = rst;
                // if(this.insertRst){
                    // this.sheetLoad();
                this.fetchFactoryTestList(this.currentTab)
                // }
                this.$root.$emit('bv::hide::modal', 'ftryList_NewFactoryTestPop');
            },
            selectChange: function(){
                let a = this.categoryList.indexOf(this.mainCodeId);
                //console.log(a);
                this.midCodeId = ''  // 세부공종 초기화
                this.categoryDataSub = this.categoryData[a].midCodeList;
                //console.log(this.categoryDataSub);
            },
            mergeProgressBar (evtParam) {//진황상황그래프 merge
                const options = {
                    key: 'mtrlSpApprId',
                    startColumnName: 'testStatus',
                    endColumnName: 'testStatus4',
                }
                
                const allRows = evtParam.sheet.getDataRows();

                let compare = allRows[0]
                for (let i = 0; i < allRows.length; i++) {
                    if (compare[options.key] !== allRows[i][options.key]) {
                        evtParam.sheet.setMergeRange(compare, options.startColumnName, allRows[i-1], options.endColumnName)
                        compare = allRows[i]
                    }
                    if (i === allRows.length -1 ) {
                        evtParam.sheet.setMergeRange(compare, options.startColumnName, allRows[i], options.endColumnName)
                    }
                }
                // evtParam.sheet.hideCol('mtrlSpApprId');
                this.$nextTick(() => {
                    evtParam.sheet.blur(0);
                })
            },
            alertConfirmFn:function(){
                // if(this.insertSignYn == true){
                //     this.insertSignYn = false;
                //     this.$root.$emit('bv::hide::modal', 'factLstAlert');
                //     this.sheetLoad();
                // }
                if(this.insertSignYn){
                    this.insertSignYn = false;
                    this.$root.$emit('bv::hide::modal', 'factLstAlert');
                    // this.sheetLoad();
                    this.fetchFactoryTestList(this.currentTab)
                    return;
                }
                if(this.confirmUse){
                    this.confirmUse = false;
                    this.$root.$emit('bv::hide::modal', 'factLstAlert');
                    this.insertSign();
                    return;
                }
                if(this.confirmUse == false){
                    this.$root.$emit('bv::hide::modal', 'factLstAlert');
                    return;
                }
                // if(this.insertSignYn == false){
                //     this.$root.$emit('bv::hide::modal', 'factLstAlert');
                //     return;
                // }
            },
            insertSignChk :function(){
                this.popMsg = '';
                /*
                if(this.detailObj.length == 0 ){
                    this.popMsg = '결재상신할 검사를 선택해주세요.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'factLstAlert');
                    return;
                }
                if(this.detailObj.length > 0 && this.detailObj[0].testStatus == 'REGT'){
                    this.popMsg = '검사 결과가 입력되지 않았습니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'factLstAlert');
                    return;
                }
                if(this.detailObj.length > 0 && (this.detailObj[0].testStatus == 'APRV'||this.detailObj[0].testStatus == 'APVL')){
                    this.popMsg = '결재중이거나 결재가 완료된 검사입니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'factLstAlert');
                    return;
                }
                */
                const row = this.mySheet.getRowsByChecked('selectYn')[0];
                if(!row) {
                    // this.popMsg = '결재상신할 검사를 선택해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'factLstAlert');
                    this.alert('선택된 행이 없습니다.');
                    return;
                }
                if(row.status == 'REGT'){
                    // this.popMsg = '검사 결과가 입력되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'factLstAlert');
                    this.alert('검사 결과가 입력되지 않았습니다.');
                    return;
                }
                if(row.status == 'APRV'|| row.status == 'APVL'){
                    // this.popMsg = '결재중이거나 결재가 완료된 검사입니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'factLstAlert');
                    this.alert('결재중이거나 결재가 완료된 검사입니다.');
                    return;
                }

                if(this.popMsg == ''){
                    this.approve.mainCodeId     = this.detailObj[0].mainCodeId;
                    this.approve.midCodeId      = this.detailObj[0].midCodeId;
                    this.approve.docSeq         = this.detailObj[0].docSeq;
                    this.approve.siteMstrId     = this.siteMstrId ? this.siteMstrId : null;

                    this.approve.requestId      = this.detailObj[0].mtrlFtryTsId;
                    this.approve.fileType       = 'MeterialMngt';
                    // temporary
                    this.approve.docName        = '공장검사';
                    this.$bvModal.show('factoryApproveModal');

                    // this.popMsg = '결재상신하시겠습니까?';
                    // this.confirmUse = true;
                    // this.$root.$emit('bv::show::modal', 'factLstAlert');
                    // return;
                }
            },
            print:function(){
                if(this.currentTab == 0){
                    this.mySheet.doPrint();
                    // this.mySheet.doPrint({
                    //     menu: 2,
                    // });
                }else{
                    this.allSheet.doPrint();
                    // this.allSheet.doPrint({
                    //     menu: 2,
                    // });
                }
            },
            insertSign: async function(){//결재상신
                // //console.log(this.detailObj[0]);
                const urls = {
                    docSeq: '/sendApi/api/docNum/selectDocNumSeq',
                    approveDoc: '/sendApi/api/approv/approvedDoc/write',
                    setFactoryInfo: '/sendApi/api/quality/materialSiteCheck/factoryTest/change',
                }
                const payload = {
                    siteMstrId: this.siteMstrId,
                    codeType: 'MTRL',
                    codeDtlType: 'TSFC',
                    gjmcd: this.detailObj[0].mainCodeId,
                    gjscd: this.detailObj[0].midCodeId,
                    aprvOptnType: this.detailObj[0].aprvOptnType,
                    docType: '',
                }
                // //console.log(payload);
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
                        axios.post(
                            urls.approveDoc, 
                            {
                                dmApprvDoc: {
                                    ...payload,
                                    docSeq: this.detailObj[0].docSeq,
                                },
                            }, 
                            options)
                            .then(aprvRes => {
                                axios.post(
                                    urls.setFactoryInfo,
                                    {
                                        ...payload,
                                        docSeq: this.detailObj[0].docSeq,
                                        ...aprvRes.data.datas.dmApprvDoc,
                                        //
                                        mtrlFtryTsId : this.detailObj[0].mtrlFtryTsId, 
                                        testStatus : 'APVL',
                                        // apprJdmt: 'PASS',
                                    },
                                    options                                    
                                    )
                                    .then(setCrackInfoRes => {
                                        
                                        //console.log(setCrackInfoRes)
                                        
                                        this.popMsg = '결재상신 되었습니다.';
                                        this.confirmUse = false;
                                        this.insertSignYn = true;
                                        this.signYn = false;
                                        this.detailObj = [];
                                        this.$root.$emit('bv::show::modal', 'factLstAlert');
                                        return;
                                    })
                                    .catch(error => {
                                        //console.error(error)

                                        this.popMsg = '결재상신에 실패했습니다.';
                                        this.confirmUse = false;
                                        this.insertSignYn = false;
                                        this.$root.$emit('bv::show::modal', 'factLstAlert');
                                        return;
                                    })

                            })
                            .catch(error => {
                                // throw new Error(error)
                                //console.error(error)

                                this.popMsg = '결재상신에 실패했습니다.';
                                this.confirmUse = false;
                                this.insertSignYn = false;
                                this.$root.$emit('bv::show::modal', 'factLstAlert');
                                return;
                            })
            },
            fn_setSourceApproval: function (payload) {
                //console.log(payload)

                const url = '/sendApi/api/quality/materialSiteCheck/factoryTest/change';
                const _payload = {
                    ...payload,
                    mtrlFtryTsId: this.detailObj[0].mtrlFtryTsId,
                    testStatus: 'APVL',
                    // apprJdmt: 'PASS',
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(url, _payload, options)
                .then(res => {
                    //console.log(res)

                    // this.popMsg = '결재상신 되었습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = true;
                    // this.signYn = false;
                    this.detailObj = [];
                    // this.$root.$emit('bv::show::modal', 'factLstAlert');
                    this.alert('결재상신 되었습니다.',()=>{
                        this.fetchFactoryTestList(this.currentTab)
                    });
                })
                .catch(error => {
                    //console.error(error)
                    
                    // this.popMsg = '결재상신에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = false;
                    // this.$root.$emit('bv::show::modal', 'factLstAlert');
                    this.alert('결재상신에 실패했습니다.');
                    return;
                })
            },
            openPop:function(){
                this.detailObj = [];
                this.$root.$emit('bv::show::modal', 'ftryList_NewFactoryTestPop');
            },
            ftryOzReport:function(idx){
                let row = this.mySheet.getRowsByChecked('selectYn')[0];
                if(!row) {
                    this.alert(`선택된 행이 없습니다.`);
                    return;
                } else if(row.status != 'APRV'){
                    this.alert(`결재 완료 되지 않은 항목은 \n 출력이 불가능합니다.`);
                    return;
                }else if(idx == '1' && row.rmcYn != 'Y'){
                    this.alert(`레미콘/아스콘만 출력 가능합니다.`);
                    return;
                }else if(idx == '2' && row.rmcYn != 'N'){
                    this.alert(`레미콘/아스콘 외 항목만 출력 가능합니다.`);
                    return;
                }else{
                    //console.log(row);
                    // let url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH;
                    let url2 = '';
                    if(row.rmcYn == 'Y'){
                        url2 = this.$store.getters['auth/getOzTypeList'][13].jspNm ;
                    }else{
                        url2 = this.$store.getters['auth/getOzTypeList'][14].jspNm;
                    }
                    let url3 = url2+ '&siteMstrId='+this.siteMstrId+'&mtrlFtryTsId='+row.mtrlFtryTsId;
                    window.open(url3, '_blank')
                }
            },
            fn_exportExcel(sheet){
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['selectYn'].includes(item.Name) && !['insertRst'].includes(item.Name)))
                }
                this.excelDownload.fileName  = `공장검사_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
                // let sheet = null;
                // if(this.currentTab == 0){
                //     sheet = this.mySheet;
                // }else{
                //     sheet = this.allSheet;
                // }
                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `공장검사_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
        }
    }
</script>