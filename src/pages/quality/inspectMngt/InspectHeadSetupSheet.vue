<template>
    <div class="tab_contents">
        <!-- <h2 class="sub_title">검측관리 > 본사 Set-up</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tab.list" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area submenu_on" v-show="currentTab == 0">
            <tree-category-tab
                refId="itpTreeCategory"
                :category-data="itpCategoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedITPTabCheckedList"
                :currentTab="currentTab"
            />
            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <!-- <button type="button" class="btn btn_sm btn_excel" v-if="editMode && checkUser(userId,'unuse')" @click="excelUpload">엑셀 업로드</button> -->
                        <button type="button" class="btn btn_sm btn_excel" v-if="editMode && checkUser(userId,'down')" @click="fn_exportExcel(itpEditGrid)">엑셀 다운로드</button>
                        <button type="button" class="btn btn_sm btn_excel" v-if="!editMode && checkUser(userId,'down')" @click="fn_exportExcel(itpShowGrid)">엑셀 다운로드</button>

                        <div class="fr" v-if="editMode">
                            <button v-if="checkUser(userId,'write') || checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkblue" v-on:click="changeChk">편집해제</button>
                            <button type="button" class="btn btn_sm btn_darkgray" v-on:click="copyRow">행 복사</button>
                            <div class="btn_number" v-if="checkUser(userId,'write') || checkUser(userId,'change')">
                                <select name="" id="selectBox" class="form_control num" v-model="addIdx">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <button v-if="checkUser(userId,'write') || checkUser(userId,'change')" type="button" class="btn btn_sm" v-on:click="addRow">행 추가</button>
                            </div>
                            <button v-if="checkUser(userId,'unuse')" type="button" class="btn btn_sm btn_darkgray" v-on:click="delRow">행 삭제</button>
                            <button v-if="checkUser(userId,'write') || checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkblue" v-on:click="saveCheck">저장</button>
                        </div>
                        <div class="fr" v-if="!editMode">
                            <button v-if="checkUser(userId,'write') || checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkblue" v-on:click="changeEditMode('E')">편집</button>
                            <button v-if="checkUser(userId,'write') || checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkgray">최종 등록</button>
                        </div>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap" style="height:calc(100vh - 270px)">
                        <div id="inptItpSheetShow" class="ibsheet_table" style="height: 100%;" v-show="!editMode"></div>
                        <div id="inptItpSheetEdit" class="ibsheet_table" style="height: 100%;" v-show="editMode"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab_area submenu_on" v-show="currentTab == 1">
            <tree-category-tab
                refId="itrTreeCategory"
                :category-data="itrCategoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedITRTabCheckedList"
                :currentTab="currentTab"
            />
            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <div class="fr">
                            <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" v-on:click="insertPop">추가</button>
                            <button v-if="checkUser(userId,'unuse')" type="button" class="btn btn_sm btn_darkgray" v-on:click="delRow">삭제</button>
                        </div>
                    </div>

                        <!-- ibsheet -->
                    <div class="ib_wrap" style="height:calc(100vh - 270px)">
                        <div id="inptItrChkListSheet" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
        <HeadSetUpChecklistWrite
            :chk-pop-id="selectPopId"
            v-bind:siteChkId="''"
            v-bind:chkId="inptChkId"
            v-bind:mainId="mainCodeId"
            v-bind:midId="midCodeId"
            v-on:insert="getSearchITR"/>

        <excel-download
            v-model="excelDownload.request"
            ref-id="InspectHeadSetupSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />    
    </div>
</template>

<script>
    // import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
    import TreeCategoryTab from "@/pages/quality/testMngt/component/TreeCategoryTab";
    import HeadSetUpChecklistWrite from "@/pages/quality/inspectMngt/popup/InspectCheckListPop.vue"
    import API from '@/apis/'
    import loader from '@ibsheet/loader'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import { InptHeadSetupShow, InptHeadSetupEdit, InptItrChk } from '@/pages/common/data/InptOptnList'
    // import { DetectionChecklist } from '../../common/data/PopupList'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    import _ from 'lodash'

   export default {
        name: 'InspectHeadSetupSheet',
        mixins: [authCheckMixns,MsgBoxMixins],
        components: {
            TreeCategoryTab,
            PopAlert,
            HeadSetUpChecklistWrite,
            Breadcrumb,
            ExcelDownload
        },
        data() {
            return {
                currentTab: 0, // 기본 current 값 지정 
                // tabs: ['ITP', 'ITR(Check List)'], // tab name
                tab: {
                    current: 0,
                    list: ['ITP', 'ITR(Check List)'] // tab name
                },
                mounted: false,
                search: {
                    tab: {
                        useCheckBox: false,
                        itpData : null,
                        itrData : null
                    },
                    box: {}
                },
                itpCategoryData: [],
                itrCategoryData: [],
                category: {
                    data: []
                },
                mainCodeId:'',
                midCodeId:'',
                mainName: '',
                midName:'',
                itpSheet:null,
                itrSheet:null,
                popMsg: '',                                 // 알림창 메세지
                confirmUse: false,                             // 알림창 버튼개수
                popId:'headSetupAlert',                     // 알림창 Id

                siteMstrId:'',
                inptIem:'',                                                 // 항목
                inptStep:'',                                                // 단계
                chkIem:'',                                                  // 검사항목
                chkFreq:'',                                                 // 검사빈도
                chkStd:'',                                                  // 검사기준 및 시험기준
                chkMtd:'',                                                  // 검사방법
                relateHis:'',                                               // 관련기록
                ccpyTradeType:'',                                           // 협력업체
                cnstrctTradeChrgType:'',                                    // 시공사 담당
                cnstrctTradeRspnberType:'',                                 // 시공사 책임
                cnstrctTradeChkType:'',                                     // 검사점
                spvsTradeType:'',                                           // 건설사업관리단
                comment:'',                                                 // 비고

                inptChkId:'',                                               // 본사 체크리스트 아이디
                chkTitle:'',                                                // 체크리스트 제목
                detailIemSeq:'',                                            // 세부항목 순번
                stndrd:'',                                                  // 규격 및 기준
                
                
                saveCheckYn:false,
                
                addIdx:'1',
                delIds:[],
                insertIds:[],
                editMode : false,
                delChkYn:false,
                finalDelYn:false,
                // mainId:'',
                // midId:'',
                
                selectPopId:'HeadSetUpChecklistWrite',
                userId: '',
                searchCnt : 0,
                itpData : null,
                itpShowGrid : null,
                itpEditGrid : null,
                itpMainCodeCombo : [],
                itpMidCodeCombo : [],
                itpSubCodeCombo : [],
                chrgCombo : [],

                itrChkGrid : null,
                itrMainCodeCombo : [],
                itrMidCodeCombo : [],
                itrSubCodeCombo : [],

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
        async created(){
            // console.log("created")
            await this.getChrgCombo();
        },
        async mounted() {
            // console.log("mounted")
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
            //tree tab menu[S]
            // await this.getCategoryData();
            await this.getITPComboCategory();
            await this.getITRComboCategory();
            // this.sheetCreate();
            this.mounted = true;
            //tree tab menu[E]
            this.userId = this.$store.getters['auth/getUserId'];
        },
        beforeDestroy() {
            // loader.removeSheet('inspect1');
            // loader.removeSheet('inspect2');
        },
        watch: {
            "currentTab": {
                handler () {
                    if(this.currentTab == 1 && this.searchCnt == 0){
                        this.searchCnt = 1;
                        this.getSearchITR();
                    }
                },
                deep: true
            },
            editMode : function(){
                if(this.editMode){
                    //console.log('dd');
                }
            }
        },
        methods: {
            getChrgCombo : async function() {
                // 검사점-시공사-담당/책임 콤보
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url   = '/sendApi/api/common/masterCode/list';
                let param = { groupCode: 'CNSTRCT_TRADE_CHRG_TYPE' };
                
                try {
                    const resultData = await sendPostApi(url, param);
                    // console.log(resultData);
                    this.chrgCombo = resultData.data.data;

                } catch (error) {
                    console.error("ERROR : %o", error)
                }
            },
            async getITPComboCategory() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/cntrwkType/list';
                let param = { codeType: 'ITP' };
                
                try {
                    const data = await sendPostApi(url, param);

                    // console.log("getComboCategory : %o", data)
                    if( data.status === 200){
                        this.itpMainCodeCombo = data.data.dlMainCode;
                        this.itpMidCodeCombo  = data.data.dlMidCode;
                        this.itpSubCodeCombo  = data.data.dlSubCode;
                        this.initITPGrid();
                    }
                } catch (error) {
                    console.error("ERROR : %o", error);
                }
            },
            async getITRComboCategory() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/cntrwkType/list';
                let param = { codeType: 'INPT' };
                
                try {
                    const data = await sendPostApi(url, param);

                    // console.log("getComboCategory : %o", data)
                    if( data.status === 200){
                        this.itrMainCodeCombo = data.data.dlMainCode;
                        this.itrMidCodeCombo  = data.data.dlMidCode;
                        this.itrSubCodeCombo  = data.data.dlSubCode;
                        this.initITRGrid();
                    }
                } catch (error) {
                    console.error("ERROR : %o", error);
                }
            },
            initITPGrid : function() {
                /** ITP - show mode **/
                let showOptions = InptHeadSetupShow.options;
                // console.log("initGrid InptHeadSetupShow");

                this.setChrgCombo({
                    cnstrctTradeChrgType : showOptions.Cols[12],
                })

                loader.createSheet({
                    // id: 'inptItpSheetShow',
                    el : 'inptItpSheetShow',
                    data : [],
                    options : showOptions,
                }).then((sheet) => {
                    this.itpShowGrid = sheet;
                })

                /** ITP - edit mode **/
                let editOptions = InptHeadSetupEdit.options;
                // console.log("initGrid InptHeadSetupEdit");

                this.setChrgCombo({
                    cnstrctTradeChrgType : editOptions.Cols[12],
                })

                editOptions.Events =  {
                    onAfterClick: this.clickGrid,
                    onAfterChange: this.changeGrid,
                    onRenderFirstFinish : this.getITPCategoryData
                }

                this.setITPCategoryCombo({
                    main : editOptions.Cols[1],
                    mid : editOptions.Cols[2],
                    sub : editOptions.Cols[3],
                })

                loader.createSheet({
                    // id: 'inptItpSheetEdit',
                    el : 'inptItpSheetEdit',
                    data : [],
                    options : editOptions,
                }).then((sheet) => {
                    this.itpEditGrid = sheet;
                })
            },
            initITRGrid : function() {
                /** ITR(Check List) **/
                let itrChkOptions = InptItrChk.options;
                // console.log("initGrid InptItrChk");

                itrChkOptions.Events =  {
                    ondblclick : this.clickGrid,
                    onAfterChange : this.changeGrid,
                    onRenderFirstFinish : this.getITRCategoryData
                }

                this.setITRCategoryCombo({
                    main: itrChkOptions.Cols[1],
                    mid: itrChkOptions.Cols[2],
                    sub: itrChkOptions.Cols[3],
                })

                loader.createSheet({
                    // id: 'inptItrChkListSheet',
                    el : 'inptItrChkListSheet',
                    data : [],
                    options : itrChkOptions,
                }).then((sheet) => {
                    this.itrChkGrid = sheet;
                })

            },
            async getITPCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'ITP' };
                
                try {
                    const data = await sendPostApi(url, param);

                    // console.log("getCategoryData : %o", data)
                    if( data.status == 200){
                        this.itpCategoryData = data.data.list;
                    }
                } catch (error) {
                    console.error("ERROR : %o", error);
                }
            },
            async getITRCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'INPT' };
                
                try {
                    const data = await sendPostApi(url, param);

                    // console.log("getCategoryData : %o", data)
                    if( data.status == 200){
                        this.itrCategoryData = data.data.list;
                    }
                } catch (error) {
                    console.error("ERROR : %o", error);
                }
            },
            getSearchITP : async function(param) {
                if(param == null){
                    param = {
                        mainCodeId : this.search.tab.itpData.mainCodeId,
                        midCodeId : this.search.tab.itpData.midCodeId,
                    }
                }
                this.editMode = false;
                let payload = {
                    ...param,
                };

                const rst = await API.inspect.getHeadSetupItpList(payload
                                                , {
                                                    headers:{ 'Authorization': this.$cookies.get("Authorization")}
                                                });
                // console.log("search Result : %o", rst)    
                if( rst.status == '200' ){
                    this.itpData = rst.data.datas.dlITPData;
                    this.itpShowGrid.loadSearchData({
                        data : rst.data.datas.dlITPData
                    });
                }
            },
            getSearchITR : async function(param) {
                if(param  == null){
                    param = {
                        mainCodeId : this.search.tab.itrData.mainCodeId,
                        midCodeId : this.search.tab.itrData.midCodeId,
                    };
                }
                let payload = {
                    ...param,
                };
                const rst2 = await API.inspect.getHeadSetupItrList(payload, {
                                                headers:{
                                                    'Authorization': this.$cookies.get("Authorization")
                                                }
                });

                if( rst2.status == '200' ) {
                    this.itrChkGrid.loadSearchData({
                        data : rst2.data.datas.dlITPChk
                    });
                }
            },
            sheetCreate : async function(){
                let param = {};
                // loader.removeSheet('inspect1');

                if(this.currentTab == 0){//ITP
                    if(this.mainCodeId != ''){//공종
                        param['mainCodeId'] = this.mainCodeId;
                    }
                    if(this.midCodeId != ''){//세부공종
                        param['midCodeId'] = this.midCodeId;
                    }
                    const rst = await API.inspect.getHeadSetupItpList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(rst);
                    
                    let data = [];
                    let options = InptHeadSetupShow.options;
                    
                    if(rst.status == '200' && rst.data.datas.dlITPData.length >0){
                        data = rst.data.datas.dlITPData;
                        this.setITPCategoryList({
                            main: options.Cols[1],
                            mid: options.Cols[2]
                        });
                        options.Events =  {
                            onAfterClick: this.clickGrid,
                            onAfterChange: this.changeGrid,
                        }
                    } else {
                        data = [];
                    }
                    loader.createSheet({
                        // id: 'inspect1',
                        el: 'inspectSheetTableShow',
                        data: [],
                        options: options,
                    }).then((sheet) => {
                        this.itpSheet= sheet;
                        sheet.loadSearchData({
                            data: data,
                            append: false
                        });
                        this.$nextTick(() => {
                            //console.log(sheet.getUserOptions())
                        })
                    })
                } else {//ITR
                    // loader.removeSheet('inspect2');
                    if(this.mainCodeId != ''){//공종
                        param['mainCodeId'] = this.mainCodeId;
                    }
                    if(this.midCodeId != ''){//세부공종
                        param['midCodeId'] = this.midCodeId;
                    }
                    const rst2 = await API.inspect.getHeadSetupItrList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(rst2);
                    let data2 = [];
                    let options2 = DetectionAdmin2.options;

                    if(rst2.status == '200' && rst2.data.datas.dlITPChk.length >0){
                        data2 = rst2.data.datas.dlITPChk;
                        // this.setCategoryList({
                        //     main: options2.Cols[1],
                        //     mid: options2.Cols[2]
                        // });
                        options2.Events =  {
                            // onAfterClick: this.clickGrid,
                            ondblclick: this.clickGrid,
                            onAfterChange: this.changeGrid,
                        }
                    }else{
                        data2 = [];
                    }

                    loader.createSheet({
                        // id: 'inspect2',
                        el: 'inptItrChkListSheet',
                        data: data2,
                        options: options2,
                    }).then((sheet) => {
                        this.itrSheet= sheet;
                    })
                }
            },
            saveCheck : function(){
                this.popMsg = '';
                this.saveCheckYn = false;
                if(this.currentTab == 0){
                    this.insertIds = [];
                    let rows = this.itpEditGrid.getDataRows();
                    // let dup = this.itpEditGrid.getRowsByDup('mainCodeId,midCodeId,subCodeId,inptStep,inptIem,chkIem,chkIem01,chkIem02,chkEra,chkStd', false, false, false, "Deleted");
                    let dup = this.itpEditGrid.getRowsByDup('mainCodeId,midCodeId,subCodeId,chkIem,chkIem01,chkIem02,chkEra,chkStd', false, false, false, "Deleted");
                    //console.log(dup,dup.length);
                    if( dup.length > 0){
                        //console.log(dup);
                        for(let x = 0; x< dup.length; x++){
                            for(let y = 1;y<dup[x].length; y++){
                                this.itpEditGrid.setAttribute({
                                    row: dup[x][y],
                                    attr: 'Color',
                                    val: '#f96f6f'
                                })
                            }
                            // this.itpEditGrid.refreshRow(dup[x]);
                        }
                        // this.confirmUse = false;
                        // this.popMsg = '중복된 데이터가 있습니다.';
                        // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                        this.alert('중복된 데이터가 있습니다.');
                        return;
                    } else {
                        for(let x = 0; x<rows.length; x++){
                            let row = {};
                            if(rows[x].mainCodeId == ''||rows[x].mainCodeId == null){
                                // this.confirmUse = false;
                                // this.popMsg = '공종을 입력해주세요.';
                                // this.saveCheckYn = false;
                                // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                                this.alert((x+1) + '번째의 대공종을 입력해주세요.');
                                return;
                            }
                            if(rows[x].midCodeId == ''||rows[x].midCodeId == null){
                                // this.confirmUse = false;
                                // this.popMsg = '세부 공종을 입력해주세요.';
                                // this.saveCheckYn = false;
                                // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                                this.alert((x+1) + '번째의 공종을 입력해주세요.');
                                return;
                            }
                            if(rows[x].subCodeId == ''||rows[x].subCodeId == null){
                                // this.confirmUse = false;
                                // this.popMsg = '세부 공종을 입력해주세요.';
                                // this.saveCheckYn = false;
                                // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                                this.alert((x+1) + '번째의 세부 공종을 입력해주세요.');
                                return;
                            }
                            // if(rows[x].inptStep == ''||rows[x].inptStep == null){
                            //     // this.confirmUse = false;
                            //     // this.popMsg = '단계를 모두 입력해주세요.';
                            //     // this.saveCheckYn = false;
                            //     // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     this.alert((x+1) + '번째의 단계 입력해주세요.');
                            //     return;
                            // }
                            // if(rows[x].inptIem == ''||rows[x].inptIem == null){
                            //     // this.confirmUse = false;
                            //     // this.popMsg = '항목을 모두 입력해주세요.';
                            //     // this.saveCheckYn = false;
                            //     // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     this.alert((x+1) + '번째의 항목을 입력해주세요.');
                            //     return;
                            // }
                            if(rows[x].chkIem == ''||rows[x].chkIem == null){
                                // this.confirmUse = false;
                                // this.popMsg = '검사항목을 모두 입력해주세요.';
                                // this.saveCheckYn = false;
                                // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                                this.alert((x+1) + '번째의 검사항목 1 번째를 입력해주세요.');
                                return;
                            }
                            if(rows[x].chkIem01 == ''||rows[x].chkIem01 == null){
                                // this.confirmUse = false;
                                // this.popMsg = '검사항목을 모두 입력해주세요.';
                                // this.saveCheckYn = false;
                                // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                                this.alert((x+1) + '번째의 검사항목 2 번째를 입력해주세요.');
                                return;
                            }
                            if(rows[x].chkIem02 == ''||rows[x].chkIem02 == null){
                                // this.confirmUse = false;
                                // this.popMsg = '검사항목을 모두 입력해주세요.';
                                // this.saveCheckYn = false;
                                // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                                this.alert((x+1) + '번째의 검사항목 3 번째를 입력해주세요.');
                                return;
                            }
                            if(rows[x].chkEra == ''||rows[x].chkEra == null){
                                // this.confirmUse = false;
                                // this.popMsg = '검사시기/빈도를 모두 입력해주세요.';
                                // this.saveCheckYn = false;
                                // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                                this.alert((x+1) + '번째의 시기 및 빈도를 입력해주세요.');
                                return;
                            }
                            // if(rows[x].chkFreq == ''||rows[x].chkFreq == null){
                            //     // this.confirmUse = false;
                            //     // this.popMsg = '검사시기/빈도를 모두 입력해주세요.';
                            //     // this.saveCheckYn = false;
                            //     // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     this.alert((x+1) + '번째의 검사시기/빈도를 입력해주세요.');
                            //     return;
                            // }
                            // if(rows[x].chkStd == ''||rows[x].chkStd == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '검사기준 및 시험기준을 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            // if(rows[x].chkMtd == ''||rows[x].chkMtd == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '검사방법을 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            // if(rows[x].relateHis == ''||rows[x].relateHis == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '관련기록을 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            // if(rows[x].ccpyTradeType == ''||rows[x].ccpyTradeType == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '협력업체 시험 기준을 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            // if(rows[x].cnstrctTradeChrgType == ''||rows[x].cnstrctTradeChrgType == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '시공사 담당 시험 기준을 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            // if(rows[x].cnstrctTradeRspnberType == ''||rows[x].cnstrctTradeRspnberType == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '시공사 책임 시험 기준을 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            // if(rows[x].cnstrctTradeChkType == ''||rows[x].cnstrctTradeChkType == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '검사점 시험 기준을 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            // if(rows[x].spvsTradeType == ''||rows[x].spvsTradeType == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '건설사업 관리단 시험 기준을 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            // if(rows[x].comment == ''||rows[x].comment == null){
                            //     this.confirmUse = false;
                            //     this.popMsg = '비고를 모두 입력해주세요.';
                            //     this.saveCheckYn = false;
                            //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                            //     return;
                            // }
                            row['status']     = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':(rows[x].Changed?'Changed':''));
                            row['inptMngtId'] = rows[x].inptMngtId;
                            row['mainCodeId'] = rows[x].mainCodeId;
                            row['midCodeId']  = rows[x].midCodeId;
                            row['subCodeId']  = rows[x].subCodeId;
                            // row['inptStep']   = rows[x].inptStep;
                            // row['inptIem']    = rows[x].inptIem;
                            row['chkIem']     = rows[x].chkIem;
                            row['chkIem01']   = rows[x].chkIem01;
                            row['chkIem02']   = rows[x].chkIem02;
                            row['chkEra']     = rows[x].chkEra;
                            row['chkStd']     = rows[x].chkStd;
                            row['chkMtd']     = rows[x].chkMtd;
                            row['relateHis']  = rows[x].relateHis;
                            row['ccpyTradeType']        = rows[x].ccpyTradeType;
                            row['cnstrctTradeChrgType'] = rows[x].cnstrctTradeChrgType;
                            // row['cnstrctTradeRspnberType'] = rows[x].cnstrctTradeRspnberType;
                            row['cnstrctTradeChkType']  = rows[x].cnstrctTradeChkType;
                            row['spvsTradeType']        = rows[x].spvsTradeType;
                            row['comment']              = rows[x].comment;

                            this.insertIds.push(row);
                        }
                    }
                    if(this.popMsg == ''){
                        // this.saveCheckYn = true;
                        this.confirm('저장하시겠습니까?',this.finalSave);
                        // this.finalSave();
                    }
                }
            },
            finalSave : async function(){
                if(this.currentTab == 0){
                    for(let x = 0; x<this.delIds.length;x++){//삭제용
                        let temp = {
                            'inptMngtId': this.delIds[x],
                            'status':'Deleted',
                        };
                        this.insertIds.push(temp);
                    }
                    //console.log(this.insertIds);
                    let payload = {
                        listData: this. insertIds
                    }
                    const rst2 = await API.inspect.setHeadSetupItpList(payload,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    // console.log(rst2);
                    if(rst2.status == 200){
                        // this.popMsg = '저장되었습니다';
                        // this.confirmUse = false;
                        // this.saveCheckYn  = true;
                        // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                        this.alert('저장되었습니다.', this.getSearchITP);
                        return;
                    }else{
                        // this.popMsg = '저장에 실패했습니다.';
                        // this.confirmUse = false;
                        // this.saveCheckYn  = false;
                        // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                        this.alert('저장에 실패했습니다.');
                        return;
                    }
                }
            },
            filterReset: function(){             
                this.mainCodeId = '';   //공종                  
                this.midCodeId  = '';   //세부공종
                // this.midName = '';   //세부공종명
                // this.sheetCreate();                    
            },
            changeEditMode : function(mode){
                if( mode == "E" ) {
                    this.itpEditGrid.loadSearchData({
                        data : this.itpData
                    });
                    this.editMode = true;
                } else {
                    this.editMode = false;
                }
            },
            changedITPTabCheckedList (item) {
                this.search.tab.itpData = item
                // console.log(item);
                // event
                if( this.currentTab === 0) {
                    // console.log('changedITPTabCheckedList');
                    this.getSearchITP({
                        mainCodeId : this.search.tab.itpData.mainCodeId,
                        midCodeId : this.search.tab.itpData.midCodeId,
                    });
                }
            },
            changedITRTabCheckedList (item) {
                this.search.tab.itrData = item
                // console.log(item);
                // event
                if( this.currentTab === 1) {
                    // console.log('changedITRTabCheckedList');
                    // this.getSearchITP();
                    this.getSearchITR({
                        mainCodeId : this.search.tab.itrData.mainCodeId,
                        midCodeId : this.search.tab.itrData.midCodeId,
                    });
                }
            },
            setChrgCombo : function(payload){
                const options = {
                    chrgData : this.chrgCombo,
                    seperator: '|',
                    ...payload,
                }

                options.cnstrctTradeChrgType.Enum       = `${options.seperator}${options.chrgData.map(item => item['codeNameKr']).join(options.seperator)}`
                options.cnstrctTradeChrgType.EnumKeys   = `${options.seperator}${options.chrgData.map(item => item['codeVal']).join(options.seperator)}`
            },
            setITPCategoryCombo : function (payload) {
                const options = {
                    mainData : this.itpMainCodeCombo,
                    midData : this.itpMidCodeCombo,
                    subData : this.itpSubCodeCombo,
                    seperator: '|',
                    ...payload
                }

                // console.log("return =================> %o", options)
                if(!(options.main && options.mid )) return
                // console.log("go =================> %o", options.mid)

                options.main.Enum       = `${options.seperator}${options.mainData.map(item => item['mainName']).join(options.seperator)}`
                options.main.EnumKeys   = `${options.seperator}${options.mainData.map(item => item['mainCodeId']).join(options.seperator)}`

                options.main.clear = options.mid.Name
                options.mid.Related = options.main.Name
                
                options.mainData.forEach(item => {
                    options.mid[`EnumKeys${item['mainCodeId']}`]  = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['midCodeId']).join(options.seperator)}`
                    options.mid[`Enum${item['mainCodeId']}`]    = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['midName']).join(options.seperator)}`
                });
                
                options.mid.clear = options.sub.Name
                options.sub.Related = options.mid.Name

                options.midData.forEach(item => {
                    options.sub[`EnumKeys${item['midCodeId']}`] = `${options.seperator}${options.subData.filter(subitem=> subitem.midCodeId === item.midCodeId).map(inner => inner['subCodeId']).join(options.seperator)}`
                    options.sub[`Enum${item['midCodeId']}`] = `${options.seperator}${options.subData.filter(subitem=> subitem.midCodeId === item.midCodeId).map(inner => inner['subName']).join(options.seperator)}`
                })
                // console.log("options.mid =================> %o", options.mid)
            },
            setITRCategoryCombo : function (payload) {
                const options = {
                    mainData : this.itrMainCodeCombo,
                    midData : this.itrMidCodeCombo,
                    subData : this.itrSubCodeCombo,
                    seperator: '|',
                    ...payload
                }

                // console.log("return =================> %o", options)
                if(!(options.main && options.mid )) return
                // console.log("go =================> %o", options.mid)

                options.main.Enum       = `${options.seperator}${options.mainData.map(item => item['mainName']).join(options.seperator)}`
                options.main.EnumKeys   = `${options.seperator}${options.mainData.map(item => item['mainCodeId']).join(options.seperator)}`

                options.main.clear = options.mid.Name
                options.mid.Related = options.main.Name
                
                options.mainData.forEach(item => {
                    options.mid[`EnumKeys${item['mainCodeId']}`]  = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['midCodeId']).join(options.seperator)}`
                    options.mid[`Enum${item['mainCodeId']}`]    = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['midName']).join(options.seperator)}`
                });
                
                options.mid.clear = options.sub.Name
                options.sub.Related = options.mid.Name

                options.midData.forEach(item => {
                    options.sub[`EnumKeys${item['midCodeId']}`] = `${options.seperator}${options.subData.filter(subitem=> subitem.midCodeId === item.midCodeId).map(inner => inner['subCodeId']).join(options.seperator)}`
                    options.sub[`Enum${item['midCodeId']}`] = `${options.seperator}${options.subData.filter(subitem=> subitem.midCodeId === item.midCodeId).map(inner => inner['subName']).join(options.seperator)}`
                })
                // console.log("options.mid =================> %o", options.mid)
            },
            setITPCategoryList(payload) {
                const options = {
                    categoryData: this.itpCategoryData,
                    seperator: '|',
                    key:'CodeId',
                    value: 'Name',
                    innerObjectKey: 'midCodeList',
                    ...payload
                }

                if(!(options.main && options.mid)) return

                options.main.Enum = `${options.seperator}${options.categoryData.map(item => item['main'.concat(options.value)]).join(options.seperator)}`
                options.main.EnumKeys = `${options.seperator}${options.categoryData.map(item => item['main'.concat(options.key)]).join(options.seperator)}`
                options.main.clear = options.mid.Name

                options.mid.Related = options.main.Name
                options.categoryData.forEach(item => {
                    options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${item[options.innerObjectKey].map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
                    options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${item[options.innerObjectKey].map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
                })
            },
            changeGrid:function(evt) {
                if(evt.col == 'mainCodeId'){
                    evt.row.midCodeId = '';
                    evt.sheet.refreshRow(evt.row);
                }
                if(evt.col == 'midCodeId'){
                    evt.row.subCodeId = '';
                    evt.sheet.refreshRow(evt.row);
                }
                if(this.currentTab ==0){
                    this.fnIsCopy(evt);
                }
            },
            clickGrid:function(evt){
                if(!this.checkUser(this.userId,'change')){
                    return;
                }
                //console.log(evt.row);
                if(this.currentTab == 1 && evt.col!= "chk"){
                    this.inptChkId = evt.row.inptChkId;
                    // this.mainName = evt.row.mainName;
                    // this.midName = evt.row.midName;
                    this.mainId = evt.row.mainCodeId;
                    this.midId = evt.row.midCodeId;
                    this.subId = evt.row.subCodeId;
                    this.$root.$emit('bv::show::modal', 'HeadSetUpChecklistWrite');
                }
            },
            insertPop:function(){
                this.inptChkId = '';
                // this.popMsg = '';
                // if(this.mainCodeId == '' || this.mainCodeId == null){
                //     this.confirmUse = false;
                //     this.popMsg = '공종을 선택해주세요.';
                //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                //     return;
                // }
                // if(this.midCodeId == '' || this.midCodeId == null){
                //     this.confirmUse = false;
                //     this.popMsg = '세부공종을 선택해주세요.';
                //     this.$root.$emit('bv::show::modal', 'headSetupAlert');
                //     return;
                // }
                // if(this.popMsg == ''){
                    this.$root.$emit('bv::show::modal', 'HeadSetUpChecklistWrite');
                // }
            },
            deleteChkLst: async function(){
                this.finalDelYn = false;
                let param = {
                    'listData': this.delIds,
                };
                const delRst = await API.inspect.delHeadSetupItrCheckList(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(delRst);
                if(delRst.status == 200){
                    // this.popMsg = '삭제되었습니다.';
                    // this.confirmUse = false;
                    // this.finalDelYn = true;
                    // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                    this.alert('삭제되었습니다.', this.sheetCreate);
                    return;
                }else{
                    // this.popMsg = '삭제에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.finalDelYn = false;
                    // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                    this.alert('삭제에 실패했습니다.');
                    return;
                }
            },
            delRow : function(){ //행삭제
                let sheet = this.itpEditGrid;
                this.saveCheckYn = false;
                this.delChkYn = false;
                if(this.currentTab == 0){
                    let rows = sheet.getRowsByChecked("chk");
                    if(rows == []||rows.length == 0){
                        // this.confirmUse = false;
                        // this.popMsg = '선택된 행이 없습니다.';
                        // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                        this.alert('선택된 행이 없습니다.');
                        return;
                    } else {
                        for(let i =0; i< rows.length; i++){
                            let id = rows[i].inptMngtId;
                            if(id != '' && id != null){
                                this.delIds.push(id);
                            }
                        }
                        sheet.removeRows(rows);
                        //console.log(this.delIds);
                    }
                } else if(this.currentTab == 1){
                    sheet = this.itpEditGrid;
                    this.delIds = [];
                    let rows = sheet.getRowsByChecked("chk");
                    if(rows == []||rows.length == 0){
                        // this.confirmUse = false;
                        // this.popMsg = '선택된 행이 없습니다.';
                        // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                        this.alert('선택된 행이 없습니다.');
                        return;
                    } else {
                        let id = {};
                        for(let i =0; i< rows.length; i++){
                            id = {
                                'inptChkId':rows[i].inptChkId,
                                'useYn':'N',
                                'delYn':'Y',
                            };
                            this.delIds.push(id);
                        }
                        // //console.log(this.delIds);
                        // this.confirmUse = true;
                        // this.delChkYn = true;
                        // this.popMsg = '삭제하시겠습니까?';
                        // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                        this.confirm('삭제하시겠습니까?', this.deleteChkLst);
                    }
                }
            },
            copyRow : function(){    // 행복사
                const checkedRows = this.itpEditGrid.getRowsByChecked('chk');
                if(checkedRows.length === 0) {
                    this.alert('선택된 행이 없습니다.');
                    return;
                } else {
                    const copiedRows = this.itpEditGrid.copyRows(checkedRows, this.itpEditGrid.getNextRow(checkedRows[0]));
                    copiedRows.forEach(item => {
                        item['chk'] = false
                        item['inptMngtId'] = '';
                        this.itpEditGrid.refreshCell(item, 'chk')
                    })
                }

                // let rows = this.itpEditGrid.getRowsByChecked("chk");
                // //console.log(this.sheet1.getRowsByChecked("checkYn"));
                // if(rows == [] || rows.length == 0){
                    // this.confirmUse = false;
                    // this.popMsg = '선택된 행이 없습니다.';
                    // this.$root.$emit('bv::show::modal', 'headSetupAlert');
                //     this.alert('선택된 행이 없습니다.');
                //     return;
                // } else {
                //     this.itpEditGrid.copyRows({rows:rows,next:this.itpEditGrid.getFirstRow()});
                //     for(let i = 0;i<rows.length; i++){
                //         let focusRow = rows[i];
                //         let idx = this.itpEditGrid.getRowIndex(focusRow) + 1;
                //         this.itpEditGrid.copyRow({row:focusRow,next:this.itpEditGrid.getNextRow(focusRow)});

                //         let selectRow = this.itpEditGrid.getRowByIndex(idx);
                //         selectRow['chk'] = 0;
                //         selectRow['inptMngtId'] = '';
                //         this.itpEditGrid.refreshRow(selectRow);
                //     }
                // }   
            },
            addRow : function(){  //행추가
                this.itpEditGrid.addRows({"count":this.addIdx,"next":this.itpEditGrid.getFirstRow()});

                for(let i = 1; i<= this.addIdx;i++){
                    let selectRow = this.itpEditGrid.getRowByIndex(i);
                    // //console.log(selectRow);
                    selectRow['chk'] = 0;
                    selectRow['inptMngtId'] = '';
                    selectRow['siteMstrId'] = this.siteMstrId;
                    
                    this.itpEditGrid.refreshRow(selectRow);
                }
            },
            alertConfirmFn:function(){
                if(this.finalDelYn) {
                    this.finalDelYn = false;
                    this.$root.$emit('bv::hide::modal', 'headSetupAlert');
                    this.sheetCreate();
                    return;
                } else if(this.delChkYn) {
                    this.$root.$emit('bv::hide::modal', 'headSetupAlert');
                    this.deleteChkLst();
                    this.delChkYn = false;
                    return;
                } else if(!this.saveCheckYn) {
                    this.$root.$emit('bv::hide::modal', 'headSetupAlert');
                    return;
                } else {
                    this.$root.$emit('bv::hide::modal', 'headSetupAlert');
                    // loader.removeSheet('inspect1');
                    this.sheetCreate();
                    this.saveCheckYn = false;
                    return;
                }
            },
            closePop:function(){
                this.$root.$emit('bv::hide::modal', 'headSetupAlert');
            },
            changeChk:function(){
                this.confirm('수정중인 내용이 있습니다. 취소하시겠습니까?',()=>{
                    this.changeEditMode('S');
                });
            },
            fnIsCopy: function(evt){
                if(evt.col == 'inptIem'||evt.col == 'chkIem'){
                    //console.log(evt.row.inptIem+evt.row.chkIem);
                    // let dup = evt.sheet.getRowsByDup('mainCodeId,midCodeId,inptStep,inptIem,chkIem,chkIem01,chkIem02,chkEra,chkStd', false, false, false, "Deleted");
                    let dup = evt.sheet.getRowsByDup('mainCodeId,midCodeId,chkIem,chkIem01,chkIem02,chkEra,chkStd', false, false, false, "Deleted");
                    //console.log(dup.length);
                    //console.log(dup);
                    let yn = false;
                    for(let x = 0;x<dup.length; x++){
                        for(let y = 0; y<dup[x].length;y++){
                            if(evt.sheet.getRowIndex(dup[x][y])==evt.sheet.getRowIndex(evt.row)){
                                evt.row[evt.col] = '';
                                evt.sheet.setAttribute(evt.row,evt.col,'Color','#f96f6f');
                                // evt.sheet.setAttribute({
                                //     row: evt.row,
                                //     attr: 'Color',
                                //     val: '#f96f6f'
                                // })
                                evt.sheet.refreshRow(evt.row);
                                yn = true;
                            }
                        }
                    }
                    if(!yn){
                        evt.sheet.setAttribute(evt.row,evt.col,'Color','');
                    }
                }
            },
            excelDown: function(){
                this.alert('준비중입니다.');
            },
            excelUpload: function(){
                this.alert('준비중입니다');
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['chk'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `검측관리본사셋업_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
                // this.itpShowGrid.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `검측관리본사셋업_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
        }
   }
</script>