<template>
    <div class="tab_contents">
        
        <h2 class="sub_title">시험 등록
            <div class="fr">
                <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="clickSaveData">등록</button>
                <button type="button" class="btn btn_md btn_outline btn_gray" @click="cancelRegistTest">취소</button>
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
                                    <option v-for="(item, idx) in testInstt" :key="idx">{{ `${item.testInsttName} / ${item.userNm}` }}</option>
                                </select>
                            </td>
                            <th>등록일</th>
                            <td colspan="3">
                                <!-- <Datepicker ref="registDateDatepicker" v-on:value-change="registDateChange" v-on:value-reset="registDateReset" /> -->
                                {{ this.registInfo.registDate }}
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
                            <td><input type="text" class="form_control form_sm" v-model="registInfo.sploreQy" maxlength="8"></td>
                            <th>아스콘 시공량</th>
                            <td><input type="text" class="form_control form_sm" v-model="registInfo.apnrtCnstrctQy" maxlength="8"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="button_box">
                <strong>시험 종별 검색/추가</strong>
            </div>
        </div>
        
        <hr>
        
        <div class="tab_area submenu_on">
            <tree-category-tab
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedTabCheckedList"
            />

            <div class="right_content">
                <div class="inner">
                    
                    <div class="table_data">
                        <div class="move_box">
                            <div class="data_tit">Rev {{ finalRevNum }}</div>
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="siteTestPlanSheet" class="ibsheet_table" ref="siteTestPlanSheet" :style="{'height': '487px'}"></div>
                            </div>
                        </div>
                        <div class="move_box arrow">
                            <button type="button" class="ico_data_prev" @click="deleteRows">이전 영역으로 이동</button>
                            <button type="button" class="ico_data_next" @click="copyRows">다음 영역으로 이동</button>
                        </div>
                        <div class="move_box">
                            <div class="data_tit" style="height:28px"></div>
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="choiseTestSheet" class="ibsheet_table" ref="choiseTestSheet" :style="{'height': '487px'}"></div>
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
import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
import { sendPostApi, requestOptions } from '@/apis/common';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
// import Datepicker from '@/pages/common/popup/Datepicker.vue'

export default {
    name: 'TestResultMngtWrite',
    mixins: [MsgBoxMixins],
    components: {
        TreeCategoryTab,
        WrappedAlert,
        // Datepicker
    },
    data() {
        return {
            footerBg: 'transparent',

            disableInstt : true,

            categoryData: [],
            search: {
                tab: {
                    useCheckBox: false,
                    data: null
                },
                box: {}
            },

            testInstt: [],              // 시험기관 dataset
            tradeNm: ['선택'],          // 시험기관 options
            tradeId: '',

            registInfo : {
                registDate: '',         // 등록일자 
                testInstt: '',          // 시험기관 
                testInsttName: '',      // 시험기관명
                sploreCo: '',           // 시료개수
                sploreQy: '',           // 시료량 
                apnrtCnstrctQy: '',     // 아스콘 시공량
            },

            grid: { // ibsheet
                siteTestPlanSheet: [],
                choiseTestSheet: [],
                data: {
                    siteTestPlanData: []
                },
                siteTestPlanSheetOpt : [],
                choiseTestSheetOpt : [],
                focus: {
                    row: null,
                    col: null
                },
                addRowsCount: 1,
            },

            finalRevNum: null,

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
    mounted() {
        this.initializeGrid ();               // 그리드 초기화
        this.getTestInsttInfo();              // 시험기관 조회
        
        // 등록일 설정
        this.registInfo.registDate = this.$moment().format('YYYY-MM-DD'); 
    },
    watch: {
        'registInfo.sploreQy': {
            handler(newVal) {
                this.registInfo.sploreQy = newVal.replace(/[^0-9]/g, '');
            },
        },
        'registInfo.apnrtCnstrctQy': {
            handler(newVal) {
                this.registInfo.apnrtCnstrctQy = newVal.replace(/[^0-9]/g, '');
            },
        },
    },
    beforeDestroy() {
        this.removeSheet();
    },
    methods: {
        async getCategoryData () {  // category menu data 생성
            let url = '/sendApi/api/common/codeCategory/list';
            let param = { codeType: 'TEST' };
            
            try {
                const { data } = await sendPostApi(url, param);
                this.categoryData = data.list;
            } catch (error) {
                console.log(error.response);
            }
        },
        changedTabCheckedList (item) {  // category click (selected item)
            
            let param = new Object();
            param.mainCodeId = item.mainCodeId;
            param.midCodeId = item.midCodeId;

            // 시험계획 종목 리스트 조회
            this.getSiteTestPlanData(param);;
        },

        initializeGrid () { 
            // 시험계획 grid 초기화
            this.grid.siteTestPlanSheetOpt = _.cloneDeep(testWrite.options);
            this.grid.siteTestPlanSheetOpt.Cfg = {
                NoVScroll: 0,
                DataMerge: 5,
                FixPrevColumnMerge : 'subName'
            }
            this.grid.siteTestPlanSheetOpt.Events = {
                onRenderFirstFinish : () => { 
                    this.getCategoryData();             // 그리드가 그려진 후 한번만 LEFT 시험 종별 조회                    
                }
            };

            const ts = this; 

            loader.createSheet({    // IBSheet loaded
                el: 'siteTestPlanSheet',
                data: this.grid.data.siteTestPlanData,
                options: this.grid.siteTestPlanSheetOpt,
            }).then((sheet) => {
                // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
                this.grid.siteTestPlanSheet = sheet;
            });

            // 시험 선택 grid 초기화
            this.grid.choiseTestSheet= _.cloneDeep(testWrite.options);
            this.grid.choiseTestSheet.Cols.find(col => col.Name === 'testType').Visible = 1;

            this.grid.choiseTestSheet.Cfg = {
                NoVScroll: 0,
            }
            this.grid.choiseTestSheet.Events = {
                onAfterRowCopy:function(evtParam){

                    let enumInfo = "";
                    let enumKeyInfo = "";
                    let firstData = "";

                    if(evtParam.row.testTypeSpt > 0){
                        enumInfo += "|현장시험";
                        enumKeyInfo += "|0001"
                        firstData = "0001"
                    }

                    if(evtParam.row.testTypeReqest > 0){
                        enumInfo += "|의뢰시험"
                        enumKeyInfo += "|0002"

                        if(firstData == ""){
                            firstData = "0002"
                            ts.disableInstt = false;
                        }                       
                    }

                    if(evtParam.row.testTypeFctry > 0){
                        enumInfo += "|공장시험"
                        enumKeyInfo += "|0003"

                        if(firstData == ""){
                            firstData = "0003"
                        }
                    }

                    // 시험타입 셀렉트 값 설정
                    evtParam.sheet.setAttribute( evtParam.sheet.getRowById(evtParam.row.id) , "testType" , "Type" , "Enum");
                    evtParam.sheet.setAttribute( evtParam.sheet.getRowById(evtParam.row.id) , "testType" , "Enum" , enumInfo);
                    evtParam.sheet.setAttribute( evtParam.sheet.getRowById(evtParam.row.id) , "testType" , "EnumKeys" , enumKeyInfo);                    

                    // 첫번째 값으로 셋팅
                    evtParam.row.testType = firstData;
                 },
                 onAfterChange:function(evtParam){
                    //시험타입 변경이 일어났을 경우
                    if(evtParam.col == "testType"){

                        let rows = evtParam.sheet.getDataRows();
                        let isReqest = false;

                        for(let i = 0; i < rows.length; i++){
                            if(rows[i]["testType"] == "0002"){
                                isReqest = true;
                                break;
                            }   
                        }

                        if(isReqest){
                            //시험타입에 1개이상 공사정보가 있으면
                            ts.disableInstt = false;
                        }else{
                            //시험타입 공사정보가 1개도 없으면
                            ts.disableInstt = true;
                            ts.registInfo.testInsttName = "";
                        }
                    }                    
                }
            };

            loader.createSheet({    // IBSheet loaded
                el: 'choiseTestSheet',
                data: [],
                options: this.grid.choiseTestSheet
            }).then((sheet) => {
                this.grid.choiseTestSheet = sheet;
            });
        },
        async getSiteTestPlanData(param) {    
            // 시험계획 시험종목 정보 가져오기
            let url = '/sendApi/api/testMngt/testResultMngt/testResultInfo/list';
            let payload = { 
                ...param,
                siteMstrId: this.$store.getters['auth/getSiteMstrId']
            };

            try {
                const testPlanInfo = await sendPostApi(url, payload);
                this.grid.data.siteTestPlanData = testPlanInfo.data.dlTestPlanInfo;

                this.grid.siteTestPlanSheet.loadSearchData({
                    data: this.grid.data.siteTestPlanData,
                    append: false
                });

                // 최종 REVISION 정보
                this.finalRevNum = testPlanInfo.data.dlTestPlanInfo[0].revisionId;

            } catch (error) {
               console.log(error.response);
            }
        },

        // resizeSheet(evtParam){
        //     // sheet, dataRowCnt, baseRowCnt
        //     let sheet = evtParam.sheet;
        //     let dataRowCnt = evtParam.sheet.getDataRows().length;
        //     let baseRowCnt = 15;
        //     var p = sheet.MainTag.parentNode;  //시트 부모 객체
        //     var h = sheet.MainTag.clientHeight; //시트객체 높치

        //     this.$refs.selectDataTable.style.height = '100%';
            
        //     console.log(p, h);

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
            let selectedRows = this.grid.choiseTestSheet.getDataRows();
            
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
            } else {
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
                let dup = this.grid.choiseTestSheet.getRowsByDup("subCodeId,tstSbjDtlName,testType,tstSbjNameLvl1",false,true,false);                
                if(dup.length > 0){
                    this.alert("중복된 시험종목이 있습니다.");
                    return;
                }
            }

            // 문제가 없으면 저장
            this.confirm("저장하시겠습니까?", () => {
                this.saveSelectedData(this.registInfo);
            })
        },
        async saveSelectedData(param) { 
            
            let url = '/sendApi/api/testMngt/testResultMngt/testSubjectWrite/write';
            
            // 데이터 종별,시험타입기준으로 정렬
            this.grid.choiseTestSheet.doSort("subCodeId,testType");

            // changedRow to Json
            const changedInfoToJson = this.grid.choiseTestSheet.getSaveJson({
                saveMode: 1
            });

            let payload = {
                param: {
                    ...param,
                    siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                },
                listData: changedInfoToJson.data.reverse()
            };
            
            // console.log("@@@@ payload : %o",payload);

            try {
                const writeReult = await sendPostApi(url, payload);
                // console.log("@@@@ writeReult : %o",writeReult);

                if(writeReult.status == "200"){                                    
                    if(writeReult.data.count > 0 ){
                        this.alert('저장되었습니다.', () => {
                            this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                            this.$router.push({ name: 'TestResultMngtSheet' });
                        })
                    }else{
                        this.alert('저장실패했습니다.')
                    }
                }
            } catch (error) {
                console.log(error.response);
            }
        },
        // async docRequestConfirm() {    // 의뢰서 결재 상신 문서번호 생성
        //     let url = '/sendApi/api/docNum/selectDocNumSeq';
        //     let testType = this.requestParams.testType;

        //     switch(testType) {
        //         case '0001' :   // 현장시험
        //             this.requestParams.codeDtlType = 'SITE';
        //             break;
        //         case '0002' :   // 의뢰시험
        //             this.requestParams.codeDtlType = 'REQT';
        //             break;
        //         case '0003' :   // 공장시험
        //             this.requestParams.codeDtlType = 'FTRY';
        //             break;
        //     }

        //     let payload = {
        //         siteMstrId: this.$cookies.get('siteMstrId'),
        //         codeType: 'TEST',
        //         codeDtlType: this.requestParams.codeDtlType,
        //         gjmcd: this.requestParams.mainCodeId,
        //         gjscd: this.requestParams.midCodeId,
        //     };
        //     console.log("==============>payload : %o ",payload )
            
        //     try {
        //         const { data } = await sendPostApi(url, payload);
        //         this.approve.docSeq = data;
        //     } catch (error) {
        //         console.log(error.response);
        //     }
        // },
        copyRows() {    // 선택된 데이터로 이동
            let checkedRows = this.grid.siteTestPlanSheet.getRowsByChecked('chk');
            if(checkedRows.length === 0) {
                //this.openPopup('checkTestItem');
                this.alert("시험 종별을 선택해 주세요");
                return;
            }
            
            // 체크된 정보 복사
            this.grid.choiseTestSheet.copyRows({rows:checkedRows});

            // 체크 표시 초기화
            this.grid.siteTestPlanSheet.setAllCheck("chk", 0);
            this.grid.choiseTestSheet.setAllCheck('chk', 0);

        },
        deleteRows() {  
            let checkedRows = this.grid.choiseTestSheet.getRowsByChecked('chk');

            if(checkedRows.length === 0) {
                //this.openPopup('checkTestItem');
                this.alert("시험 종별을 선택해 주세요");
                return;
            }
            
            // 시험선택 제거
            this.grid.choiseTestSheet.removeRows(checkedRows);
            
            if(this.grid.choiseTestSheet.getDataRows() == 0 ){
                // 시험기관 초기화 처리
                this.disableInstt = true;
                this.registInfo.testInsttName = "";
            }

            // 체크버튼 초기화
            //this.grid.siteTestPlanSheet.setAllCheck('chk', 0);
            this.grid.choiseTestSheet.setAllCheck('chk', 0);
        },
        removeSheet() { // sheet 객체 삭제
            if (this.grid.siteTestPlanSheet) {
                this.grid.siteTestPlanSheet.dispose();
            }
            if (this.grid.choiseTestSheet) {
                this.grid.choiseTestSheet.dispose();
            }
        },

        /** 최종 등록 정보 */
        cancelRegistTest() {
            //this.openPopup('cancelRegistTest');
            this.confirm("등록을 취소하시겠습니까?", () => {
                this.$router.push({ name: 'TestResultMngtSheet' })
            });
        },
        async getTestInsttInfo(param) {  // 시험기관 리스트 가져오기
            // let url='/sendApi/api/testMngt/testResultMngt/testInsttCombo/list';
            let url='/sendApi/api/testMngt/siteSetUp/qltyTestInstt/list';
            
            let payload = { 
                ...param,
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
            };

            try {
                const testInsttinfo = await sendPostApi(url, payload);
                this.testInstt = testInsttinfo.data.datas.dlTestInstt;
            } catch (error) {
                console.log(error.response);
            }
            
        },
        changeTestInstt(evt) {  // 시험기관 change
            let val = evt.target.value;
            let selectedItem = this.testInstt.filter((item) => {
               return item.testInsttName === val
            })
            this.registInfo.testInstt = selectedItem[0].testInsttId;
        },
        registDateChange : function(param) { //date-picker value change event
            let registDate = param.split('-').join('');
            this.registInfo.registDate = registDate;
        },
        registDateReset : function() { //date-picker valueReset 함수 호출
            this.registInfo.registDate = null;
            this.$refs.registDateDatepicker.valueReset();
        },
        formatDate(date) {  // date format 변경
            let today = new Date(date);
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);
            let dateString = year + '-' + month  + '-' + day;
            // let hours = ('0' + today.getHours()).slice(-2); 
            // let minutes = ('0' + today.getMinutes()).slice(-2);
            // let seconds = ('0' + today.getSeconds()).slice(-2); 
            // let timeString = hours + ':' + minutes  + ':' + seconds;
            return date !== null && date !== '' ? `${dateString}` : '';
        }
    }
}
</script>

<style>

</style>