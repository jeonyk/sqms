<template>
    <div class="tab_contents">
        <h2 class="sub_title">시험 수정
            <div class="fr">
                <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="clickSaveData">저장</button>
                <button type="button" class="btn btn_md btn_outline btn_gray" @click="cancelRegistTest">이전</button>
            </div>
        </h2>
        
        <div class="pl30 pr20">
            <div class="button_box mt10">
                <strong>최종 등록 정보</strong>
            </div>
            <div class="table_normal_list table_write">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="10%">
                        <col width="*">
                        <col width="12%">
                        <col width="*">
                        <col width="12%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span class="emp_red">시험기관</span></th>
                            <td>
                                <select class="form_control form_sm" v-model="registInfo.testInsttName" @change="changeTestInstt" :disabled="disableInstt">
                                    <option value="" selected>선택</option>
                                    <option v-for="(item, idx) in testInstt" :key="idx">{{ item.testInsttName }}</option>
                                </select>
                            </td>
                            <th>등록일</th>
                            <td colspan="3">
                                <!-- <Datepicker ref="registDatepicker" v-on:value-change="registDateChange" v-on:value-reset="registDateReset" /> -->
                                {{ registInfo.registDate }}
                            </td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">시료 개수</span></th>
                            <td>
                                <select class="form_control form_sm" v-model="registInfo.sploreCo">
                                    <option value="" selected>선택</option>
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
                            </td>
                            <th><span class="emp_red">시료량</span></th>
                            <td><input type="text" class="form_control form_sm" v-model="registInfo.sploreQy"></td>
                            <th>아스콘 시공량</th>
                            <td><input type="text" class="form_control form_sm" v-model="registInfo.apnrtCnstrctQy"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="button_box">
                <strong>시험 종별 검색/추가</strong>
            </div>
        </div>
        
        <hr>
        
        <div class="tab_area">
            <!-- <tree-category-tab
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedTabCheckedList"
            /> -->

            <div class="center_content">
                <div class="inner">                    
                    <div class="table_data">
                        <div class="move_box">
                            <div class="data_tit">Rev {{ finalRevNum }}</div>
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <!-- <div id="selectDataTable" class="ibsheet_table" ref="selectDataTable" :style="{'height': '560px'}"></div> -->
                                <div id="headerSetSheet" class="ibsheet_table" ref="headerSetSheet" :style="{'height': '560px'}"></div>
                            </div>
                        </div>
                        <div class="move_box arrow">
                            <button type="button" class="ico_data_prev" @click="deleteRows">이전 영역으로 이동</button>
                            <button type="button" class="ico_data_next" @click="copyRows">다음 영역으로 이동</button>
                        </div>
                        <div class="move_box">
                            <!-- <div class="data_tit"></div> -->
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <!-- <div id="selectedDataTable" class="ibsheet_table" ref="selectedDataTable" :style="{'height': '560px'}"></div> -->
                                <div id="testSubjectChoiseSheet" class="ibsheet_table" ref="testSubjectChoiseSheet" :style="{'height': '560px'}"></div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- alert popup -->
        <!-- <wrapped-alert
            refs="alertPopup"
            :ref-id="popup.refId"
            :title="popup.title"
            :is-show.sync="popup.isShow"
            :message="popup.message"
            :purpose="popup.purpose"
            :use-cancel-button="popup.useCancelButton"
            @click-confirm="clickPopupConfirm"
            @click-cancel="clickPopupCancel"
        /> -->
    </div>
</template>

<script>
import loader from '@ibsheet/loader'
import { testWrite } from '@/pages/quality/testMngt/data/testData';
import TreeCategoryTab from "@/pages/quality/testMngt/component/TreeCategoryTab";
//import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
import { sendPostApi, requestOptions } from '@/apis/common';
import { mapGetters } from 'vuex';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
// import Datepicker from '@/pages/common/popup/Datepicker.vue'

import _ from 'lodash'

export default {
    name: 'TestResultMngtWrite',
    mixins: [MsgBoxMixins],
    components: {
        TreeCategoryTab,
        //WrappedAlert,
        // Datepicker
    },    
    data() {
        return {
            footerBg: 'transparent',
            categoryData: [],
            search: {
                tab: {
                    useCheckBox: false,
                    data: null
                },
                box: {}
            },

            finalRevNum : null,
            disableInstt : true,

            testInstt: [],  // 시험기관 dataset
            tradeNm: ['선택'],   // 시험기관 options
            tradeId: '',

            registInfo : {
                registDate: '',   // 등록일자 
                testInstt: '',  // 시험기관 
                testInsttName: '', // 시험기관명
                sploreCo: '',  // 시료개수
                sploreQy: '', // 시료량 
                apnrtCnstrctQy: '', // 아스콘 시공량
            },

            grid : {
                headerSetSheet : [],
                testSubjectChoiseSheet : [],
                data: {
                    headerSetData: [],              // 본사 Set-up 데이터
                    testSubjectChoiseData: [],      // 시험 선택 데이터
                },
                headerSetSheetOpt: {},
                testSubjectChoiseSheetOpt: {},
                focus: {
                    row: null,
                    col: null
                },
                addRowsCount: 1,
            },

            popup: {
                title: '',
                isShow: false,
                message: '',
                useCancelButton: false,
                buttonName: {},
                refId: 'qualityTestPlanSheetAlert',
                purpose: '',
            },
        }
    },
    computed: {
        ...mapGetters({
            checklist: 'testMngt/getTestMngtCheckList'
        }),

        checkTestType() {   // testType === '0002' (의뢰시험) 일 경우 시험기관 disabled
            // return this.totalTestTypeCount > 0 && this.totalTestTypeCount === this.requestTestTypeCount; 
            return this.requestTestTypeCount > 0;
        }
    },    
    async mounted() {
        // console.log("@@@@ checklist : %o",this.checklist);
        this.initializeGrid();              // sheet 초기화        
        this.getTradeNmCombo();             // 시험기관 정보        
        //this.setGridData(this.checklist);   // sheet data조회
    },
    beforeDestroy() {
        this.removeSheet();
    },

    methods: {
        async getCategoryData () {  // left 시험 종별
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/common/codeCategory/list';
            let param = { codeType: 'TEST' };
            
            try {
                //const { data } = await sendPostApi(url, param);
                const categoryInfo = await sendPostApi(url, param);
                this.categoryData = categoryInfo.data.list;
            } catch (error) {
                console.log(error.response);
            }
        },
        // changedTabCheckedList (item) {  // category click (selected item)
            
        //     let param = new Object();
        //     param.mainCodeId = item.mainCodeId;
        //     param.midCodeId = item.midCodeId;            
        //     param.testResultMngtSeq = this.checklist.testResultMngtSeq;
        //     param.testType = this.checklist.testType;
        //     param.siteMstrId = this.checklist.siteMstrId;
        //     param.realProgrsStatus = this.checklist.realProgrsStatus;
        //     param.resultProgrsStatus = this.checklist.resultProgrsStatus;
        //     param.type = this.checklist.type;

        //     this.getHeaderSetData(param);

        // },

        initializeGrid () { // initialize grid

            // 본사 시험관리 setup Sheet 초기화
            this.grid.headerSetSheetOpt = _.cloneDeep(testWrite.options);
            this.grid.headerSetSheetOpt.Cfg = {
                NoVScroll: 0,
                DataMerge: 5,
                FixPrevColumnMerge : 'subName'
            }
            this.grid.headerSetSheetOpt.Events = {
                onRenderFirstFinish : () => {                      
                    this.getHeaderSetData(this.checklist);            
                 }
            //     // onSearchFinish: this.resizeSheet
            };

            loader.createSheet({    // IBSheet loaded
                el: 'headerSetSheet',                               // 본사 시험관리 setup Sheet
                data: this.grid.data.headerSetData,
                options: this.grid.headerSetSheetOpt,
            }).then((sheet) => {
                // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
                this.grid.headerSetSheet = sheet;
            });


            // 테스트 시험결과 Sheet 초기화
            const ts = this; 
            this.grid.testSubjectChoiseSheetOpt = _.cloneDeep(testWrite.options);
            this.grid.testSubjectChoiseSheetOpt.Cols.find(col => col.Name === 'revisionId').Visible = 1;
            this.grid.testSubjectChoiseSheetOpt.Cols.find(col => col.Name === 'testType').Visible = 1;
            this.grid.testSubjectChoiseSheetOpt.Cfg = {
                NoVScroll: 0,
                DataMerge: 2,
                //FixPrevColumnMerge : 'subName'
            }
            this.grid.testSubjectChoiseSheetOpt.Events = {
                onRenderFirstFinish : () => { 
                    //this.getCategoryData();             // 그리드가 그려진 후 한번만 LEFT 시험 종별 조회                    
                    this.getTestSubjectChoiseData(this.checklist);
                },
                onAfterRowCopy:function(evtParam){

                    let enumInfo = "";
                    let enumKeyInfo = "";
                    // let firstData = "";

                    if(evtParam.row.testTypeSpt > 0){
                        enumInfo += "|현장시험";
                        enumKeyInfo += "|0001"
                    }

                    if(evtParam.row.testTypeReqest > 0){
                        enumInfo += "|의뢰시험"
                        enumKeyInfo += "|0002"      
                    }

                    if(evtParam.row.testTypeFctry > 0){
                        enumInfo += "|공장시험"
                        enumKeyInfo += "|0003"
                    }

                    // 시험타입 셀렉트 값 설정
                    evtParam.sheet.setAttribute( evtParam.sheet.getRowById(evtParam.row.id) , "testType" , "Type" , "Enum");
                    evtParam.sheet.setAttribute( evtParam.sheet.getRowById(evtParam.row.id) , "testType" , "Enum" , enumInfo);
                    evtParam.sheet.setAttribute( evtParam.sheet.getRowById(evtParam.row.id) , "testType" , "EnumKeys" , enumKeyInfo);
                    evtParam.sheet.setAttribute( evtParam.sheet.getRowById(evtParam.row.id) , "testType" , "CanEdit" , 0);                     

                    // 첫번째 값으로 셋팅
                    evtParam.row.testType = ts.checklist.testType;
                
                 },
            };
            
            loader.createSheet({    // IBSheet loaded                
                el: 'testSubjectChoiseSheet',                           //Test 시험 결과 Sheet
                data: this.grid.data.testSubjectChoiseData,
                options: this.grid.testSubjectChoiseSheetOpt
            }).then((sheet) => {                
                this.grid.testSubjectChoiseSheet = sheet;                
            });

        },
        async getHeaderSetData(param) {    // 시험관리 계획정보 가져오기
            let url = '/sendApi/api/testMngt/testResultMngt/testResultInfo/list';
            let payload = { 
                ...param,
                siteMstrId: this.$store.getters['auth/getSiteMstrId']
            };
            
            try {
                // 시험결과(공종, 세부공종, 종별, 시험타입이 같은 시험종목 조회)
                const headerSetData = await sendPostApi(url, payload);
                this.grid.data.headerSetData = headerSetData.data.dlTestPlanInfo;              
                this.grid.headerSetSheet.loadSearchData({
                    data: this.grid.data.headerSetData
                });

                // 최종 REVISION 정보
                this.finalRevNum = headerSetData.data.dlTestPlanInfo[0].revisionId;

            } catch (error) {
               console.error(error);
            }
        },
        async getTestSubjectChoiseData(param) {                                                     // 시험 선택 정보
            let url = '/sendApi/api/testMngt/testResultMngt/testResultInputUpd/list';
            let payload = { 
                ...param
            };

            try {
                const testSubjectChoiseInfo = await sendPostApi(url, payload);

                // 시험 기간 / 시료정보 
                this.registInfo.registDate = testSubjectChoiseInfo.data.datas.dmTestDetail.registDate;                 
                this.registInfo.testInstt = testSubjectChoiseInfo.data.datas.dmTestDetail.testInstt;
                
                // 의뢰정보가 없을 경우 
                this.registInfo.testInsttName = testSubjectChoiseInfo.data.datas.dmTestDetail.testInsttName;

                if(this.registInfo.testInsttName == null || this.registInfo.testInsttName == "-"){
                    this.registInfo.testInsttName = "";
                }

                this.registInfo.sploreCo = testSubjectChoiseInfo.data.datas.dmTestDetail.sploreCo;
                this.registInfo.sploreQy = testSubjectChoiseInfo.data.datas.dmTestDetail.sploreQy;
                this.registInfo.apnrtCnstrctQy = testSubjectChoiseInfo.data.datas.dmTestDetail.apnrtCnstrctQy;
                this.registInfo.testResultMngtSeq = testSubjectChoiseInfo.data.datas.dmTestDetail.testResultMngtSeq;
                
                this.grid.data.testSubjectChoiseData = testSubjectChoiseInfo.data.datas.dlTestSubjectChoise;                  // 시험결과 선택정보

                this.grid.testSubjectChoiseSheet.loadSearchData({
                    data: this.grid.data.testSubjectChoiseData
                });
                
                // 시험타입 설정
                let rows = this.grid.testSubjectChoiseSheet.getDataRows();
                
                // 시험 타입 셀렉트 형식으로 변경 처리
                for(let i = 0; i < rows.length; i++){                    
                    let rowId = rows[i].id; 
                    let enumInfo = "";
                    let enumKeyInfo = "";


                    if(rows[i].testTypeSpt > 0){
                        enumInfo += "|현장시험";
                        enumKeyInfo += "|0001"

                    }

                    if(rows[i].testTypeReqest > 0){
                        enumInfo += "|의뢰시험"
                        enumKeyInfo += "|0002"                     
                    }

                    if(rows[i].testTypeFctry > 0){
                        enumInfo += "|공장시험"
                        enumKeyInfo += "|0003"
                    }
    
                    // 시험타입 셀렉트 값 설정
                    this.grid.testSubjectChoiseSheet.setAttribute( this.grid.testSubjectChoiseSheet.getRowById(rowId) , "testType" , "Type" , "Enum");
                    this.grid.testSubjectChoiseSheet.setAttribute( this.grid.testSubjectChoiseSheet.getRowById(rowId) , "testType" , "Enum" , enumInfo);
                    this.grid.testSubjectChoiseSheet.setAttribute( this.grid.testSubjectChoiseSheet.getRowById(rowId) , "testType" , "EnumKeys" , enumKeyInfo); 
                    this.grid.testSubjectChoiseSheet.setAttribute( this.grid.testSubjectChoiseSheet.getRowById(rowId) , "testType" , "CanEdit" , 0);    

                    //의뢰정보에 대한 결과일 경우 시험기관 선택가능 처리
                    if(rows[i].testType == "0002"){
                        this.disableInstt = false;
                    }
                }   
            } catch (error) {
               console.error(error);
            }
        }
        ,
        // resizeSheet(evtParam){
        //     // sheet, dataRowCnt, baseRowCnt
        //     // console.log(evtParam);
        //     let sheet = evtParam.sheet;
        //     let dataRowCnt = evtParam.sheet.getDataRows().length;
        //     let baseRowCnt = 15;
        //     var p = sheet.MainTag.parentNode;  //시트 부모 객체
        //     var h = sheet.MainTag.clientHeight; //시트객체 높치

        //     //this.$refs.selectDataTable.style.height = '100%';
            

        //     //시트에서 데이터 영역을 제외한 나머지 영역에 대한 높이
        //     var hOtherRows = h - sheet.MainTable.tBodies[0].querySelector('.IBBodyMid').clientHeight - sheet.MainTable.tBodies[0].querySelector(".HeightSpace").parentNode.offsetHeight;

        //     //기준행과 조회된 데이터행 수에 따라 부모의 크기를 바꾼다.
        //     if(dataRowCnt < baseRowCnt){
        //         p.style.height = ((dataRowCnt * sheet.RowHeight) + hOtherRows)+"px";
        //     }else{
        //         p.style.height = ((baseRowCnt * sheet.RowHeight) + hOtherRows)+"px";
        //     }
        // },

        clickSaveData() {
            let selectedRows = this.grid.testSubjectChoiseSheet.getDataRows();
            
            // validation 체크
            if(!this.disableInstt) {    // 의뢰시험일 경우 시험기관 제외하고 체크
                if(this.registInfo.testInsttName === '') {
                    this.alert("시험기관을 선택해주세요");
                    return;
                } else if( this.registInfo.sploreCo === '') {
                    this.alert("시료 개수를 입력해주세요");
                    return;
                } else if( this.registInfo.sploreQy === '' ) {
                    this.alert("시료량을 입력해주세요");
                    return;
                } else if( selectedRows.length === 0 ) {
                    this.alert("시험 종목을 1개이상 추가해 주세요");
                    return;
                }
            }  else {
                if(this.registInfo.sploreCo === '') {
                    this.alert("시료 개수 필수입력 사항입니다");
                    return;
                }else if(this.registInfo.sploreQy === ''){   
                    this.alert("시료량은 필수 입력 사항입니다");
                    return;
                } else if( selectedRows.length === 0 ) {
                    this.alert("시험 종목을 1개이상 추가해 주세요");
                    return;
                } 
            }

            // 중복 입력된 시험정보를 체크
            if(selectedRows.length > 0){
                let dup = this.grid.testSubjectChoiseSheet.getRowsByDup("subCodeId,tstSbjDtlName,testType,tstSbjNameLvl1",false,true,false);                
                if(dup.length > 0){
                    this.alert("중복된 시험종목이 있습니다.");
                    return;
                }
            }

            // 문제가 없으면 저장
            this.confirm("수정 하시겠습니까?", () => {
                this.saveSelectedData(this.registInfo);
            })
        },
        async saveSelectedData(param) { 
            let url = '/sendApi/api/testMngt/testResultMngt/testResultTestInfo/change';
            
            // changedRow to Json
            const changedInfoToJson = this.grid.testSubjectChoiseSheet.getSaveJson({
                saveMode: 0
            });
            
            // 날짜 '-' 제거
            this.registDateChange(param.registDate);

            let payload = {
                param: {
                    ...param,
                    siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                },
                listData: changedInfoToJson.data.reverse()
            };

            try {
                const changeReult = await sendPostApi(url, payload);
                // console.log("@@@@ changeReult : %o",changeReult);

                if(changeReult.status == "200"){                                    
                    if(changeReult.data.count > 0 ){
                        this.alert('수정되었습니다.', () => {
                            this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                            this.$router.push({ name: 'TestResultMngtDetail' });
                        })
                    }else{
                        this.alert('수정 실패했습니다.')
                    }
                }
            } catch (error) {
                console.log(error.response);
            }
        },
        copyRows() {    // 선택된 데이터로 이동
            let checkedRows = this.grid.headerSetSheet.getRowsByChecked('chk');
            if(checkedRows.length === 0) {
                this.alert("시험 종별을 선택해 주세요");
                return;
            }
            this.grid.testSubjectChoiseSheet.copyRows({rows:checkedRows});
            
            
            // 체크 표시 초기화
            this.grid.headerSetSheet.setAllCheck("chk", 0);
            this.grid.testSubjectChoiseSheet.setAllCheck('chk', 0);
            
            let selectedRows = this.grid.testSubjectChoiseSheet.getDataRows();
            this.totalTestTypeCount = selectedRows.length;

        },
        deleteRows() {  // 본사 Set-up 데이터로 이동
            let checkedRows = this.grid.testSubjectChoiseSheet.getRowsByChecked('chk');
            
            if(checkedRows.length === 0) {
                this.alert("시험 종별을 선택해 주세요");
                return;
            }

            this.grid.testSubjectChoiseSheet.removeRows(checkedRows);

            //체크 초기화
            this.grid.testSubjectChoiseSheet.setAllCheck('chk', 0);
        },
        removeSheet() { // sheet 객체 삭제
            if (this.grid.headerSetSheet) {
                this.grid.headerSetSheet.dispose();
            }
            if (this.grid.testSubjectChoiseSheet) {
                this.grid.testSubjectChoiseSheet.dispose();
            }
        },

        /** 최종 등록 정보 */
        cancelRegistTest() {            
            this.confirm("수정을 취소하시겠습니까?", () => {
                this.$router.push({ name: 'TestResultMngtDetail' })
            });
        },
        async getTradeNmCombo() {  // 시험기관 리스트 가져오기
            let url='/sendApi/api/testMngt/siteSetUp/qltyTestInstt/list';
            
            let payload = { 
                ...this.checklist
            };

            try {
                const testInsttInfo = await sendPostApi(url, payload);            
                this.testInstt = testInsttInfo.data.datas.dlTestInstt;
            } catch (error) {
                console.log(error.response);
            }
            
        },
        changeTestInstt(evt) {  // 시험기관 change
            let val = evt.target.value;
            let selectedItem = this.testInstt.filter((item) => {
               return item.testInsttName === val
            })
            // console.log(selectedItem[0].tradeId);
            this.registInfo.testInstt = selectedItem[0].testInsttId;
        },
        registDateChange : function(param) { //date-picker value change event
            // console.log(param);
            let registDate = param.split('-').join('');
            this.registInfo.registDate = registDate;
        },
        registDateReset : function() { //date-picker valueReset 함수 호출
            this.registInfo.registDate = null;
            this.$refs.registDatepicker.valueReset();
        },
    }
}
</script>

<style>

</style>