<template>   
    <div class="tab_contents">
        <!-- <h2 class="sub_title">시험관리 &gt; 품질시험계획서</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />
        
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(item, index) in tab.list" :class="{active: tab.current === index}" :key="item">
                    <a href="javascript:void(0);" @click="tab.current = index">{{ item }}</a>
                </li>
            </ul>
        </div>

        <div class="tab_area submenu_on" v-show="tab.current === 0">
            <tree-category-tab
                refId="selTestCategory"
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedDataTabCheckedList"
                :currentTab="tab.current"
            />
            
            <div class="right_content">
                <div class="inner">
                    <div class="table_data">
                        <div class="move_box">
                            <div class="move_box_inner">
                                <div class="data_tit">
                                    본사 Set-up 데이터

                                    <div class="fr">
                                        <div class="search_area">
                                            <input
                                                v-model="clientSearch.key"
                                                type="text"
                                                class="form_control"
                                                placeholder="검색"
                                                @keyup.enter="fn_clientSearch"
                                            />
                                            <button
                                                type="button"
                                                class="btn_search"
                                                @keyup.enter="fn_clientSearch"
                                                @click="fn_clientSearch"
                                            >
                                                <!-- style="position: absolute; right: 7px; top: 50%; transform: translateY(-50%);" -->
                                                {{'검색'}}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- ibsheet -->
                                <div class="ib_wrap" style="height: calc(100vh - 265px)">
                                    <div id="selectDataTable" class="ibsheet_table" style="height:100%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="move_box arrow">
                            <button type="button" class="ico_data_prev mt0" @click="deleteRows">이전 영역으로 이동</button>
                            <button type="button" class="ico_data_next mt10" @click="copyRows">다음 영역으로 이동</button>
                        </div>
                        <div class="move_box">
                            <div class="move_box_inner">
                                <div class="data_tit">선택된 데이터
                                    <div class="fr">
                                        <button type="button" class="btn btn_sm btn_darkblue" @click="clickSaveData">저장</button>
                                    </div>
                                </div>
                                <!-- ibsheet -->
                                <div class="ib_wrap" style="height: calc(100vh - 265px)">
                                    <div id="selectedDataTable" class="ibsheet_table" style="height:100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="tab_area submenu_on" v-show="tab.current === 1">
            <tree-category-tab
                refId="planCategory"
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                :editMode="editMode"
                @changed-checked-list="changedPlanTabCheckedList"
                :currentTab="tab.current"
            />
            <div class="right_content"  id="testPlanDataPrintArea">
                <h2 class="sub_title">시험 계획서
                    <div class="fr">
                        <span class="num_revision">Rev {{ dmResData.lastRevisionId }}</span>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-b-modal.HistoryLoad>History 불러오기</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="print" v-if="!editMode">시험계획서 출력</button>
                    </div>
                </h2>
                <div class="inner">
                    <div class="button_box">
                        <!-- <button type="button" class="btn btn_sm btn_excel" v-if="editMode" @click="importExcel">엑셀 다운로드</button> -->
                        <button type="button" class="btn btn_sm btn_excel" v-if="!editMode" @click="fn_exportExcel(grid.testPlanSheetShow)">엑셀 다운로드</button>
                        <button type="button" class="btn btn_sm btn_excel" v-if="editMode" @click="fn_exportExcel(grid.testPlanSheetEdit)">엑셀 다운로드</button>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkblue" @click="cancelEditMode" v-if="editMode">편집취소</button>
                            <button type="button" class="btn btn_sm btn_darkblue" @click="changeEditMode" v-if="!editMode">편집</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="finalTestWrite" v-if="!editMode">최종 등록</button>
                            <!-- <button type="button" class="btn btn_sm btn_darkgray" v-b-modal.OtherProjectData v-if="editMode">타 프로젝트 가져오기</button> -->
                            <!-- <button type="button" class="btn btn_sm btn_darkgray" v-if="editMode" @click="clickPlanCopyRows">행 복사</button> -->
                            <!-- <div v-if="editMode" class="btn_number">
                                <select v-model="grid.addRowsCount" class="form_control num">
                                    <option
                                        v-for="count in Array(10).fill().map((item, index) => {return index+1})" :key="count" :value="count">
                                        {{ count }}
                                    </option>
                                </select>
                                <button type="button" class="btn btn_sm" @click="clickPlanAddRows()">행 추가</button>
                            </div> -->
                            <button type="button" class="btn btn_sm btn_darkgray" v-if="editMode" @click="clickPlanDelRow">행 삭제</button>
                            <button type="button" class="btn btn_sm btn_darkblue" v-if="editMode" @click="clickPlanSave">저장</button>
                        </div>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{'height': 'calc(100vh - 320px)'}">
                        <div id="testPlanWriteTableShow" class="ibsheet_table" style="height:100%;" v-show="!editMode"></div>
                        <div id="testPlanWriteTableEdit" class="ibsheet_table" style="height:100%;" v-show="editMode"></div>
                    </div>
                    <!-- <div class="ib_wrap" :style="{'height': 'calc(100vh - 320px)'}" >
                        <div id="testPlanWriteTableEdit" class="ibsheet_table" style="height:100%;"></div>
                    </div> -->
                </div>
            </div>
        </div>
        
        <!-- alert popup -->
        <wrapped-alert
            refs="alertPopup"
            :ref-id="popup.refId"
            :title="popup.title"
            :is-show.sync="popup.isShow"
            :message="popup.message"
            :purpose="popup.purpose"
            :use-cancel-button="popup.useCancelButton"
            @click-confirm="clickPopupConfirm"
            @click-cancel="clickPopupCancel"
        />

        <!-- 공통 프로젝트 선택 팝업 -->
        <CommonProjectSelect :projectSelectId="'ImportCommonProject'" v-on:fn-other-project-choice="selectCommonProject"></CommonProjectSelect>
        
        <!-- 타 프로젝트 데이타 불러오기 팝업 -->
        <OtherProjectPopup @searchCommonProject="openCommonProject" @importAllItems="importAllItems" @importSelectedItems="importSelectedItems" :selectedCommonData="selectedCommonData"></OtherProjectPopup>

        <!-- History 불러오기 팝업 -->
        <HistoryLoadPopup @selectHistory="selectHistory"></HistoryLoadPopup>

        <!-- 최종 등록 팝업 -->
        <FinalWritePopup @registFinal="registFinal"></FinalWritePopup>
        
        <!-- 엑셀 다운로드 -->
        <excel-download
            v-model="excelDownload.request"
            ref-id="QualityTestPlanSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />  
    </div>
</template>

<script>
import _ from 'lodash';
import loader from '@ibsheet/loader'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import TreeCategoryTab from "@/pages/quality/testMngt/component/TreeCategoryTab";
import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
import HistoryLoadPopup from '@/pages/quality/testMngt/component/HistoryLoadPopup.vue';
import FinalWritePopup from '@/pages/quality/testMngt/component/FinalWritePopup.vue';
import OtherProjectPopup from '@/pages/quality/testMngt/component/OtherProjectPopup.vue';
import CommonProjectSelect from '@/pages/common/popup/CommonProjectSelect.vue';
import { testSelect, testPlanWriteShow, testPlanWriteEdit } from '@/pages/quality/testMngt/data/testData';
import { sendPostApi, requestOptions } from '@/apis/common';
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
import axios from 'axios'
import ExcelDownload from '@component/common/ExcelDownload.vue'

export default {
    name: 'QualityTestPlanSheet',
    mixins: [MsgBoxMixins],
    components: {
        TreeCategoryTab,
        WrappedAlert,
        HistoryLoadPopup,
        FinalWritePopup,
        CommonProjectSelect,
        OtherProjectPopup,
        Breadcrumb,
        ExcelDownload,
    },
    data() {
        return {
            footerBg: 'transparent',
            currentTab: 0, // 기본 current 값 지정 
            tab: {
                current: 0,
                list: ['시험종목 선택', '시험계획서 작성'] // tab name
            },
            categoryData: [],
            mainCombo: [],
            midCombo: [],
            subCombo: [],
            search: {
                tab: {
                    useCheckBox : false,
                    data : null,
                    planData : null
                },
                box: {}
            },
            // grid: {
            //     sheetEl: [],
            //     sheetId: [],
            //     data: {
            //         selectData: [],
            //         selectedData: [],
            //         testPlanData: [],
            //     },
            //     options: {},
            //     focus: {
            //         row: null,
            //         col: null
            //     },
            //     addRowsCount: 1,
            // },
            grid : {
                testDataSheet :null,
                testChoiceSheet : null,
                testPlanSheetShow : null,
                testPlanSheetEdit : null,
                addRowsCount : 1,
            },
            testPlanSaveYn : false,
            testPlanSearchEvent : 'all',
            // mounted: false,
            statusData: [], // 입력 상태값

            editMode: false,    // 편집모드
            dmResData: {},    // dmResData revisionId

            historyItem: {},

            popup: {
                title: '',
                isShow: false,
                message: '',
                useCancelButton: false,
                buttonName: {},
                refId: 'qualityTestPlanSheetAlert',
                purpose: '',
            },
            default: {
                popup: {
                    successSaveData: {
                        title: '알림',
                        message: '저장되었습니다',
                        purpose: 'successSaveData',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    saveTestPlanData: {
                        title: '알림',
                        message: '저장하시겠습니까?',
                        purpose: 'saveTestPlanData',
                        useCancelButton: true,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    finalRequiredTitle: {
                        title: '알림',
                        message: '제목을 입력해주세요',
                        purpose: 'finalRequiredTitle',
                        useCancelButton: true,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    finalRequiredDesc: {
                        title: '알림',
                        message: '비고를 입력해주세요',
                        purpose: 'finalRequiredDesc',
                        useCancelButton: true,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    copyRows: {
                        title: '알림',
                        message: '복사할 행을 체크해 주세요',
                        purpose: 'copyRows',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    addRows: {
                        title: '알림',
                        message: '추가할 기준행을 체크해 주세요',
                        purpose: 'addRows',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    addRowsCheckLength: {
                        title: '알림',
                        message: '기준행은 하나만 체크 가능합니다',
                        purpose: 'addRowsCheckLength',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    importAllItems: {
                        title: '알림',
                        message: '타 프로젝트 데이터를 가져올 시, 기존 데이터가 삭제됩니다. 데이터를 가져오시겠습니까?',
                        purpose: 'importAllItems',
                        useCancelButton: true,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    importSelectedItems: {
                        title: '알림',
                        message: '타 프로젝트 데이터를 가져올 시, 기존 데이터가 삭제됩니다. 데이터를 가져오시겠습니까?',
                        purpose: 'importSelectedItems',
                        useCancelButton: true,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    blankCheckedData: {
                        title: '알림',
                        message: '데이터를 선택해 주세요',
                        purpose: 'blankCheckedData',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    requiredTestPlanData: {
                        title: '알림',
                        message: '시험계획 횟수를 입력해주세요',
                        purpose: 'requiredTestPlanData',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                }
            },

            selectedCommonData: {},  // 공통 프로젝트 선택 팝업 선택 값
            otherProjectSelectedData: {},   // 타 프로젝트 선택 데이타
            // otherProjectAllData: {},   // 타 프로젝트 전체 데이타

            finalRevNum: null,  // final rev num

            //엑셀다운로드
            excelDownload : {
                request : false,
                fileName :'',
                downloadOption :'',
                options : null,
                data : [],
            },

            // clientSearch
            clientSearch: {
                target: [],
                key: '',
            }

        }
    },
    mounted () {
        // this.getCategoryData();

        //loader.removeSheet('headTestSearchData');
        //loader.removeSheet('testChoiceData');
        //loader.removeSheet('testPlanWriteShow');
        //loader.removeSheet('testPlanWriteEdit');

        this.initializeGrid ();
        // const ibsheet = loader.getIBSheetStatic();
        // console.log("loader : %o", ibsheet)

    },
    beforeDestroy () {
        // for (var i = 0; i < this.grid.sheetId.length; i++) {
        //     // loader.removeSheet(this.grid.sheetId[i]);
        //     // if (this.grid.)
        // }
        // if (this.grid.testDataSheet) loader.removeSheet('headTestSearchData');
        // if (this.grid.testChoiceSheet) loader.removeSheet('testChoiceData');
        // if (this.grid.testChoiceSheet) loader.removeSheet('testPlanWriteShow');
        // if (this.grid.testChoiceSheet) loader.removeSheet('testPlanWriteEdit');
        if (this.grid.testDataSheet) this.grid.testDataSheet.dispose()
        if (this.grid.testChoiceSheet) this.grid.testChoiceSheet.dispose()
        if (this.grid.testPlanSheetShow) this.grid.testPlanSheetShow.dispose()
        if (this.grid.testPlanSheetEdit) this.grid.testPlanSheetEdit.dispose()
        this.grid = null;
    },
    watch: {
        "tab.current": {
            handler () {
                if(this.tab.current == 0){
                    // 계획서작성 저장이 이루어진 경우 선택 데이터 재조회
                    if(this.testPlanSaveYn){
                        this.getTestChoiceData();
                        this.testPlanSaveYn = false;
                    }
                } else if(this.tab.current == 1){
                    this.editMode = false;
                    this.getTestPlanData({
                        mainCodeId: this.search.tab.planData.mainCodeId,
                        midCodeId: this.search.tab.planData.midCodeId,
                    });
                }
            }
        }
    },
    methods: {
        initializeGrid () { // initialize grid
            // console.log('initializeGrid');

            let testData          = _.cloneDeep(testSelect.data);
            let testOptions       = _.cloneDeep(testSelect.options);
            testOptions.Events = {
                onRenderFirstFinish: this.getCategoryData,
            };

            loader.createSheet({    // IBSheet loaded
                id : 'headTestSearchData',
                el : 'selectDataTable',
                data : testData,
                options : testOptions
            }).then((sheet) => {
                // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
                this.grid.testDataSheet = sheet;
            });

            let testChoiceData    = _.cloneDeep(testSelect.data);
            let testChoiceOptions = _.cloneDeep(testSelect.options);
            testChoiceOptions.Events = {
                onRenderFirstFinish: this.getTestChoiceData
            };

            loader.createSheet({    // IBSheet loaded
                id : 'testChoiceData',
                el : 'selectedDataTable',
                data : testChoiceData,
                options : testChoiceOptions
            }).then((sheet) => {
                this.grid.testChoiceSheet = sheet;
            });

            /* 시험계획서 작성 */
            let planShowData    = _.cloneDeep(testPlanWriteShow.data);
            let planShowOptions = _.cloneDeep(testPlanWriteShow.options);
            let planEditData    = _.cloneDeep(testPlanWriteEdit.data);
            let planEditOptions = _.cloneDeep(testPlanWriteEdit.options);

            /** 편집모드 추가 */
            planEditOptions.Cfg.ShowFilter = true

            planEditOptions.Events = {
                // onBeforeChange : this.changeGrid,
                onAfterChange : this.afterChangeTestPlan,
            };

            loader.createSheet({    // IBSheet loaded
                id : 'testPlanWriteShow',
                el : 'testPlanWriteTableShow',
                data : planShowData,
                options : planShowOptions
            }).then((sheet) => {
                // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
                this.grid.testPlanSheetShow = sheet;
            });

            loader.createSheet({    // IBSheet loaded
                id : 'testPlanWriteEdit',
                el : 'testPlanWriteTableEdit',
                data : planEditData,
                options : planEditOptions
            }).then((sheet) => {
                // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
                this.grid.testPlanSheetEdit = sheet;
            });
        },
        getCategoryData : async function() {  /* category menu data 생성 */
            // console.log('getCategoryData')
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/common/codeCategory/list';
            let param = { codeType: 'TEST' };
            
            try {
                const data = await sendPostApi(url, param);
                this.categoryData = data.data.list;
            } catch (error) {
                console.log(error.response.data);
            }
        },
        changedDataTabCheckedList (item) {  // category click (selected item)
            // console.log('changedDataTabCheckedList');
            this.search.tab.data = item;
            if( this.tab.current === 0) {
                // console.log('headTestData');
                this.getHeadTestData({
                    mainCodeId : this.search.tab.data.mainCodeId,
                    midCodeId : this.search.tab.data.midCodeId,
                });
            }
        },
        changedPlanTabCheckedList (item) {  // category click (selected item)
            // console.log('changedPlanTabCheckedList');
            this.search.tab.planData = item;
            if( this.tab.current === 1) {
                // this.grid.sheetEl['sheet3'].setAutoMerge(1);    // 다시 merge 상태 변경
                this.getTestPlanData({
                    mainCodeId: this.search.tab.planData.mainCodeId,
                    midCodeId: this.search.tab.planData.midCodeId,
                });
            }
        },
        // dataLoad() {
        //     if(this.tab.current === 0) {
        //         this.setGridData();
        //     } else {
        //         this.getTestPlanData();
        //     }
        // },
        getHeadTestData : async function(param) {   /* 본사 Set-up 데이터 */
            let url = '/sendApi/api/testMngt/qualityTestActpln/headSetupTestSbj/list';
            let payload = { 
                ...param,
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
            };

            try {
                const data = await sendPostApi(url, payload);
                // console.log("getHeadTestData - data : %o", data);

                // for clientSearch
                this.clientSearch.target = data.data.datas.dlSubject
                this.clientSearch.key    = ''

                this.grid.testDataSheet.loadSearchData({
                    data: data.data.datas.dlSubject,
                });
            
            } catch (error) {
               console.log("ERROR : %o", error);
            }
        },
        getTestChoiceData : async function() {   /* 선택된 데이터 */
            let url = '/sendApi/api/testMngt/qualityTestActpln/siteTestSbjChoice/list';
            let payload = { 
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
            };

            try {
                const data = await sendPostApi(url, payload);

                // console.log("getTestChoiceData - data : %o", data);
                this.grid.testChoiceSheet.loadSearchData({
                    data : data.data.datas.dlChoice,
                });
            } catch (error) {
               console.log("ERROR : %o", error);
            }
        },
        async getTestPlanData(param) {    /* 시험계획서 작성 Data */
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

            let url = '/sendApi/api/testMngt/qualityTestActpln/testActplnWrite/list';
            let payload = { 
                ...param,
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
            };

            try {
                const data = await sendPostApi(url, payload);
                // console.log(data);
                // this.grid.data.testPlanData = data.data.datas.dlActplnData;
                this.dmResData  = data.data.datas.dmResData;

                if( this.testPlanSearchEvent == 'all' || this.testPlanSearchEvent == 'show'){
                    this.grid.testPlanSheetShow.loadSearchData({
                        data: data.data.datas.dlActplnData,
                    });
                }
                if( this.testPlanSearchEvent == 'all' || this.testPlanSearchEvent == 'edit'){
                    this.grid.testPlanSheetEdit.loadSearchData({
                        data: data.data.datas.dlActplnData,
                    });
                }

                this.getTestPlanStatus();
                
            } catch (error) {
                console.log("ERROR : %o", error);
            }
        },
        async setGridData(param) {    // 본사 Set-up 데이터, 선택된 데이터
            // requestOptions.headers['Accept-Language'] = "ko";
            // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

            // let url = '/sendApi/api/testMngt/qualityTestActpln/siteTestSbjChoice/list';
            // let payload = { 
            //     ...param,
            //     siteMstrId: this.$cookies.get('siteMstrId'),
            // };

            // try {
            //     const { data } = await sendPostApi(url, payload);
            //     this.grid.data.selectData = data.datas.dlSubject;
            //     this.grid.data.selectedData = data.datas.dlChoice;
                
            //     this.grid.testDataSheet.loadSearchData({
            //         data: this.grid.data.selectData,
            //         append: false
            //     });
            //     this.grid.testChoiceSheet.loadSearchData({
            //         data: this.grid.data.selectedData,
            //         append: false
            //     });
            // } catch (error) {
            //    console.log(error.response.data);
            // }

            // // this.grid.testDataSheet.blur();
        },
        async getSetupData(param) {    // 본사 Set-up 데이터만
            // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            // let url = '/sendApi/api/testMngt/qualityTestActpln/siteTestSbjChoice/list';
            // let payload = { 
            //     ...param,
            //     siteMstrId: this.$cookies.get('siteMstrId'),
            // };

            // try {
            //     const { data } = await sendPostApi(url, payload);
            //     this.grid.data.selectData = data.datas.dlSubject;
                
            //     this.grid.testDataSheet.loadSearchData({
            //         data: this.grid.data.selectData,
            //         append: false
            //     });

            // } catch (error) {
            //    console.log(error.response);
            // }
        },
        setCategoryList(payload) {
            // const options = {
            //     mainData : this.mainCombo,
            //     midData : this.midCombo,
            //     subData : this.subCombo,
            //     seperator: '|',
            //     key:'CodeId',
            //     value: 'Name',
            //     ...payload
            // }
            // if(!(options.main && options.mid && options.sub)) return
            
            // options.main.Enum = `${options.seperator}${options.mainData.map(item => item['main'.concat(options.value)]).join(options.seperator)}`
            // options.main.EnumKeys = `${options.seperator}${options.mainData.map(item => item['main'.concat(options.key)]).join(options.seperator)}`
            
            // options.main.clear = options.mid.Name
            // options.mid.Related = options.main.Name

            // options.mainData.forEach(item => {
            //     options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
            //     options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
            // })

            // options.mid.clear = options.sub.Name
            // options.sub.Related = options.mid.Name

            // options.midData.forEach(item => {
            //     options.sub[`Enum${item['mid'.concat(options.key)]}`] = `${options.seperator}${options.subData.filter(subitem=> subitem.midCodeId === item.midCodeId).map(inner => inner['sub'.concat(options.value)]).join(options.seperator)}`
            //     options.sub[`EnumKeys${item['mid'.concat(options.key)]}`] = `${options.seperator}${options.subData.filter(subitem=> subitem.midCodeId === item.midCodeId).map(inner => inner['sub'.concat(options.key)]).join(options.seperator)}`
            // })
        },
        changeGrid (event) {
            switch (event.col) {
            //     case this.grid.options.Cols[1].Name:    // mainCodeId 변경
            //         event.row[this.grid.options.Cols[2].Name] = ''
            //         event.row[this.grid.options.Cols[3].Name] = ''
            //         event.sheet.refreshRow(event.row)
            //     break;
            //     case this.grid.options.Cols[2].Name:    // minCodeId 변경
            //         event.row[this.grid.options.Cols[3].Name] = ''
            //         event.sheet.refreshRow(event.row)
            //     break;
            }
        },
        copyRows () {   // 선택된 데이터로 이동
            let checkedRows = this.grid.testDataSheet.getRowsByChecked('chk');  // 체크 정보 확인
            let dplct = 0;  // 중복 갯수 확인

            if( checkedRows.length === 0 ) {
                //this.openPopup('blankCheckedData'); // 팝업 확인버튼 안누르고 닫았을때 더이상 안뜨는 이슈로 인한 팝업창 변경
                this.alert('데이터 선택을 해주세요.')
                return;
            } else {

                let rowData = this.grid.testChoiceSheet.getDataRows();

                for( let i=0; i<rowData.length; i++ ){
                    checkedRows.forEach(subItem => {
                        // 중복 체크
                        if( rowData[i].mainCodeId == subItem.mainCodeId 
                           && rowData[i].midCodeId ==  subItem.midCodeId
                           && rowData[i].subCodeId ==  subItem.subCodeId) {
                            dplct++;
                           }
                        
                    })
                }
            }
            
            if( dplct > 0 ) {
                this.alert("선택된 데이터에 이동할 데이터가 포함되어 있습니다.");
                return;
            } else {
                const copiedRows = this.grid.testChoiceSheet.copyRows(checkedRows, this.grid.testChoiceSheet.getFirstRow());
                // this.grid.testDataSheet.deleteRows(checkedRows);
                checkedRows.forEach(item => {
                    item.chk    = false;     // 체크 초기화
                    item.cratYn = "N";       // 최초등록시 계획서 저장유무 'N'
                    this.grid.testDataSheet.refreshCell(item, 'chk')
                });
                // checkedRows = null;
                copiedRows.forEach(item => {
                    item['chk'] = false
                    this.grid.testChoiceSheet.refreshCell(item, 'chk')
                })
                // this.grid.testChoiceSheet.setAllCheck('chk', 0);
            }

        },
        deleteRows() {  // 본사 Set-up 데이터로 이동
            let checkedRows =this.grid.testChoiceSheet.getRowsByChecked('chk');
            let delImpblCnt = 0;    // 삭제 불가능 숫자

            if(checkedRows.length === 0) {
                this.openPopup('blankCheckedData'); // 팝업창 확인 버튼을 안누르고 닫았을때 더이상 같은 팝업이 뜨지 않는 이슈로 팝업창 수정
                this.alert('데이터 선택을 해주세요.')
                return;
            } else {
                checkedRows.forEach(item => {
                    if(item.cratYn == "Y"){
                        delImpblCnt++;
                    }
                })
            }

            if( delImpblCnt > 0 ) {
                this.alert("시험계획서 작성중인 정보는 제외가 불가능 합니다. \n삭제 필요시 '시험계획서 작성' 편집모드에서 삭제 하세요.");
                return;
            }
            // const copiedRows = this.grid.testDataSheet.copyRows(checkedRows, this.grid.testDataSheet.getFirstRow());
            this.grid.testChoiceSheet.deleteRows(checkedRows);
            checkedRows.forEach(item => {
                item.chk = 0;   // 체크 초기화
                this.grid.testChoiceSheet.hideRow({
                    row: item,
                    del: false,
                    norender: false
                });
            });
            // checkedRows = null;
            // copiedRows.forEach(item => {
            //     item['chk'] = false
            //     this.grid.testDataSheet.refreshCell(item, 'chk')
            // })
        },
        clickSaveData() {
            this.confirm("선택된 데이터를 시험계획서에 저장하시겠습니까?", this.saveSelectedData, '');
        },
        async saveSelectedData(param) {
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            
            let url = '/sendApi/api/testMngt/qualityTestActpln/siteTestSbjChoice/write';
            
            // changedRow to Json
            const changedInfoToJson = this.grid.testChoiceSheet.getSaveJson({
                saveMode: 2
            });

            // payload 수정
            changedInfoToJson.data.forEach((item) => {
                item.status = item.STATUS;
            });

            let payload = {
                param: {
                    ...param,
                    // siteMstrId: this.$cookies.get('siteMstrId'),
                    siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                },
                listData: changedInfoToJson.data.reverse()
            };
            
            if( payload.listData.length == 0){
                this.alert("변경된 정보가 없습니다.");
                return;
            }

            // console.log("save : %o", payload);
            try {
                const data =  await sendPostApi(url, payload);
                // console.log("SAVE result : %o", data);

                if( data.data.count > 0) {
                    this.alert("저장 되었습니다.", this.getTestChoiceData);
                }
            } catch (error) {
                console.log("ERROR : %o", error);
            }
        },
        afterChangeTestPlan(evt) {  /* 계획서 횟수 입력시 합산 계산 */
            // 수정 시 상태 값, 합계 값 변경
            // console.log(evt.row);
            // 상태 수정
            evt.row.usgstt = '수정';
            this.grid.testPlanSheetEdit.refreshCell(evt.row, 'usgstt');
            
            // testScreAltrtv
            // if(evt.col === 'testTypeSpt' || evt.col === 'testTypeReqest' || evt.col === 'testTypeFctry' || evt.col === 'testScreAltrtv') {
            //     evt.row.testSum = Number(evt.row.testTypeSpt) + Number(evt.row.testTypeReqest) + Number(evt.row.testTypeFctry) + Number(evt.row.testScreAltrtv);
            // }
            if(evt.col === 'testTypeSpt' || evt.col === 'testTypeReqest' || evt.col === 'testTypeFctry') {
                evt.row.testSum = Number(evt.row.testTypeSpt) + Number(evt.row.testTypeReqest) + Number(evt.row.testTypeFctry);
            }
            
            this.grid.testPlanSheetEdit.refreshCell(evt.row, 'testSum');
        },

        async getTestPlanStatus(param) {    // category 상태값 받아오기
            // console.log('getTestPlanStatus');
            // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

            let url = '/sendApi/api/testMngt/qualityTestActpln/actplnOpertSttus/list';
            let payload = { 
                ...param,
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
            };

            try {
                const { data } = await sendPostApi(url, payload);
                // console.log('getTestPlanStatus : ', data.datas.dlOpert);
                this.statusData = data.datas.dlOpert;

                this.categoryData.forEach((item, i) => {
                    this.categoryData[i].totalCnt = 0;
                    this.categoryData[i].inCnt = 0;
                });

                this.statusData.forEach((data) => {
                    for(let i = 0; i < this.categoryData.length; i++) {
                        for(let j = 0; j < this.categoryData[i].midCodeList.length; j++) {
                            if(this.categoryData[i].midCodeList[j].midCodeId === data.midCodeId) {
                                this.categoryData[i].midCodeList[j].inCnt = data.inCnt;
                                this.categoryData[i].midCodeList[j].totalCnt = data.totalCnt;
                                
                                this.categoryData[i].totalCnt = this.categoryData[i].totalCnt + 1;
                                if(data.inCnt === data.totalCnt) {
                                    this.categoryData[i].inCnt ++;
                                }
                            }
                        }
                        
                    }
                });
                
            } catch (error) {
                console.log(error.response);
            }
        },
        changeEditMode() {    // 편집모드 변환
            this.editMode = true;
            // const testPlanSheet = this.grid.testPlanSheet;
            // this.grid.options.Cfg.DataMerge = 0;
            
            // standard;   // 규격
            // testPlanVolm;   // 시험계획물량
            // unit;   // 단위
            // testTypeSpt;  // 현장
            // testTypeReqest;  // 의뢰
            // testTypeFctry;  // 공장
            // testScreAltrtv;  // 성적서대체

            // const allRows = testPlanSheet.getDataRows();
            // for( let i=0; i <allRows.length; i++) {
            //     testPlanSheet.setAttribute(allRows[i], 'mainCodeId', "ColMerge", 0);
            //     testPlanSheet.setAttribute(allRows[i], 'midCodeId', "ColMerge", 0);
            //     testPlanSheet.setAttribute(allRows[i], 'subCodeId', "ColMerge", 0);
            // }

            // const arrName = ['chk', 'standard', 'testPlanVolm', 'unit', 'testTypeSpt', 'testTypeReqest', 'testTypeFctry', 'testScreAltrtv'];

            // for( let i = 0; i < arrName.length; i++) {
            //     testPlanSheet.setAttribute(null, arrName[i], 'CanEdit', 1, 1);  // 편집모드 변환
            // }

            // testPlanSheet.rerender()
            // testPlanSheet.setAutoMergeCancel('Data');

            // this.grid.testPlanSheet.sheet.renderBody(); 
            // testPlanSheet.setAttribute(testPlanSheet.getFocusedRow(), testPlanSheet.getFocusedCol() ,"Color" ,"#FF0000" ,1);
            // testPlanSheet.setAttribute({row:testPlanSheet.getFocusedRow(), attr:"TextStyle", val:1, render:1});
        },
        cancelEditMode() {    // 편집모드 취소
            this.editMode = false;
            // const testPlanSheet = this.grid.testPlanSheet;
            // testPlanSheet.options.Cfg.DataMerge = 0;

            // const arrName = ['chk', 'standard', 'testPlanVolm', 'unit', 'testTypeSpt', 'testTypeReqest', 'testTypeFctry', 'testScreAltrtv'];

            // for( let i = 0; i < arrName.length; i++) {
            //     testPlanSheet.setAttribute(null, arrName[i], 'CanEdit', 0, 1);  // 편집모드 취소
            // }
            // testPlanSheet.setAutoMerge(1);
            // this.getTestPlanData();
            // const allRows = testPlanSheet.getDataRows();
            // for( let i=0; i <allRows.length; i++) {
            //     testPlanSheet.setAttribute(allRows[i], 'mainCodeId', "ColMerge", 1);
            //     testPlanSheet.setAttribute(allRows[i], 'midCodeId', "ColMerge", 1);
            //     testPlanSheet.setAttribute(allRows[i], 'subCodeId', "ColMerge", 1);
            // }
        },

        openPopup (type) {
            this.popup = {
                ...this.popup,
                ...this.default.popup[type],
            }
            this.popup.isShow = true
        }, 
        clickPopupConfirm (purpose) {
            this.popup.isShow = false;

            switch(purpose) {
                case 'saveTestPlanData':
                    // console.log(purpose)
                    this.saveTestPlanData();
                    break;
                case 'importAllItems':
                    // console.log(purpose);
                    this.saveAllProject();
                    break;
                case 'importSelectedItems':
                    // console.log(purpose)
                    this.saveSelectedProject(this.otherProjectSelectedData);
                    break;
            }
        },
        clickPopupCancel (purpose) {
            this.popup.isShow = false;

            switch(purpose) {
                case 'saveConfirm':
                    break
            }
        },

        selectCommonProject(item) { // 공통 프로젝트 불러오기 팝업 선택 클릭 시
            // console.log('selectCommonProject : ', item);
            this.selectedCommonData = item;

            this.$root.$emit('bv::hide::modal', 'ImportCommonProject');
            this.$root.$emit('bv::show::modal', 'OtherProjectData');
        },
        importExcel () {
            const options = {
                append: 1,                  // 새로로드할지, 뒤에 붙일지 여부
                fileExt: 'xls|xlsx|csv',    // 가용 확장자
                mode: 'HeaderMatch'         // column 명 매칭해서 처리
            }

            this.grid.testPlanSheetEdit.importData(options)
        },
        exportExcel () {
            // export Data options
            // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
            const options = {
                fileName: `TestPlan_${'date'}.xlsx`,
            }

            this.grid.testPlanSheetShow.exportData(options)
            
        },
        clickPlanCopyRows () {
            const checkedRows =this.grid.testPlanSheetEdit.getRowsByChecked('chk');
            if(checkedRows.length === 0) {
                this.openPopup('copyRows');
            }
            const copiedRows = this.grid.testPlanSheetEdit.copyRows(checkedRows, this.grid.testPlanSheetEdit.getNextRow(checkedRows[0]));
            copiedRows.forEach(item => {
                item['chk'] = false
                this.grid.testPlanSheetEdit.refreshCell(item, 'chk')
            })
        },
        clickPlanDelRow () { // 행 삭제
            const checkedRows = this.grid.testPlanSheetEdit.getRowsByChecked('chk');
            if(checkedRows.length === 0) {
                this.alert('삭제할 행을 체크해 주세요');
                return;
            }
            // console.log("checkedRows.length : %o", checkedRows.length)

            this.confirm("삭제하시겠습니까?", this.deleteData, '');
            // this.openPopup('deleteConfirm');
            // this.deleteData();
        },
        deleteData() {
            // changed 기록엔 남아있음
            const checkedRows = this.grid.testPlanSheetEdit.getRowsByChecked('chk');

            this.grid.testPlanSheetEdit.deleteRows(checkedRows);

            checkedRows.forEach(item => {
                item['chk'] = false;
                item.usgstt = '삭제';
                this.grid.testPlanSheetEdit.hideRow({
                    row: item,
                    del: false,
                    norender: false
                })
                this.grid.testPlanSheetEdit.refreshCell(item, 'chk');
            });
        },
        clickPlanAddRows () {   // 행 추가
            // const focusRows = this.grid.testPlanSheetEdit.getFocusedRow();  // get focus row
            // console.log("=============== focusRows : %o", focusRows.HasIndex);

            const checkedRows = this.grid.testPlanSheetEdit.getRowsByChecked(this.grid.options.Cols[0].Name);
            if(checkedRows.length === 0) {
                this.openPopup('addRows');
                return;
            } else if(checkedRows.length > 1) {
                this.openPopup('addRowsCheckLength');
                return;
            }

            let arrNames = [];
            for(let i = 4; i < this.grid.options.Cols.length; i++) {
                arrNames.push(this.grid.options.Cols[i].Name);
                // console.log(arrNames)
            }

            for(let i = 0; i < this.grid.addRowsCount; i++) {
                let arrCopyRows = this.grid.testPlanSheetEdit.copyRows(checkedRows, this.grid.testPlanSheetEdit.getNextRow(checkedRows[0]));
                // console.log(arrCopyRows)

                arrCopyRows.forEach(item => {
                    item['chk'] = false;
                    this.grid.testPlanSheetEdit.refreshCell(item, 'chk');

                    for(let j = 0; j < arrNames.length; j ++ ) {
                        let name = arrNames[j];
                        item[name] = '';
                        this.grid.testPlanSheetEdit.setAttribute(item, arrNames[j], 'CanEdit', 1, 1);
                    }
                })
            }
        },
        clickPlanSave() {
            const changedInfoToJson = this.grid.testPlanSheetEdit.getSaveJson({ // changedRow to Json
                saveMode: 3
            });
            if( changedInfoToJson.data.length == 0) {
                this.alert("수정된 데이터가 없습니다.");
                return;
            }

            const Rows = this.grid.testPlanSheetEdit.getDataRows();
            let blankCnt = 0;

            Rows.forEach(item => {
                // console.log(item.status);
                if(item.usgstt  !== '삭제') {
                    // if(item.testSum < 1 || item.testSum === null || item.testSum === '') {
                    if( item.testSum === null || item.testSum === '' ) {
                        blankCnt ++;
                    }
                } 
            })

            // console.log("@@@ blankCnt : "+blankCnt);

            if(blankCnt > 0) {
                this.openPopup('requiredTestPlanData');
                return;
            } else {
                this.openPopup('saveTestPlanData');
            }
        },
        async saveTestPlanData (param) {
            // console.log('saveTestPlanData', param);

            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            
            const url = '/sendApi/api/testMngt/qualityTestActpln/testActplnTmpr/write';
            const changedInfoToJson = this.grid.testPlanSheetEdit.getSaveJson({ // changedRow to Json
                saveMode: 3
            });

            changedInfoToJson.data.forEach((item) => {  // payload 수정
                item.status = item.STATUS;
            });

            let payload = {
                param: {
                    ...param,
                    // siteMstrId: this.$cookies.get('siteMstrId'),
                    siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                },
                listData: changedInfoToJson.data.reverse()
            };

            try {
                const data =  await sendPostApi(url, payload);

                if( data.data.count > 0 ){
                    this.alert("저장 되었습니다.");
                    this.testPlanSaveYn = true;
                    this.editMode       = false;
                    this.getTestPlanData({
                        mainCodeId: this.search.tab.planData.mainCodeId,
                        midCodeId: this.search.tab.planData.midCodeId,
                    });
                } 

            } catch (error) {
                console.log("ERROR : %o", error);
            }
        },
        finalTestWrite() {
            const Rows = this.grid.testPlanSheetShow.getDataRows();
            let blankCnt = 0;

            Rows.forEach(item => {
                // console.log(item.testSum);
                // if(item.testSum < 1 || item.testSum === null || item.testSum === '') {
                if( item.testSum === null || item.testSum === '') {
                    blankCnt ++;
                }
            })

            if(blankCnt > 0) {
                this.openPopup('requiredTestPlanData');
            } else {
                this.$root.$emit('bv::show::modal', 'FinalWrite');
            }
        },
        registFinal(item) { // 최종등록 confirm
            // console.log('registFinal', item);
            if (item.title === '') {
                this.alert('제목을 입력해주세요');
                return;
                // this.openPopup('finalRequiredTitle');
            } else if(item.desc === '') {
                this.alert('비고를 입력해주세요');
                return;
                // this.openPopup('finalRequiredDesc');
            }  else {
                this.$root.$emit('bv::hide::modal', 'FinalWrite');
                this.finalWrite(item);
            }
        },
        async getHistory() {
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            const url = '/sendApi/api/testMngt/qualityTestActpln/qualityTestActplnHist/list';
            
            let payload = {
                // siteMstrId: this.$cookies.get('siteMstrId')
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
            };

            try {
                const { data } = await sendPostApi(url, payload);
                // console.log(data.datas.dlHist.length)
                this.finalRevNum = data.datas.dlHist.length;
                let revPayload = {
                    // siteMstrId: this.$cookies.get('siteMstrId'),
                    revisionId: this.finalRevNum,
                };
                this.getTestPlanData({
                        mainCodeId: this.search.tab.planData.mainCodeId,
                        midCodeId: this.search.tab.planData.midCodeId,
                    });
            } catch (error) {
                error.response;
            }
        },
        async finalWrite(param) { // 최종등록 API
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            
            const url = '/sendApi/api/testMngt/qualityTestActpln/testActplnLast/write';
            
            let payload = {
                ...param,
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
            };

            try {
                let rst = await sendPostApi(url, payload);
                if(rst.status == 200){
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = '/sendApi/api/quailtyMngr/list';
                    let param = {
                        "siteMstrId" : this.$store.getters['auth/getSiteMstrId'],
                    };

                    const resData = await sendPostApi(url, param).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });

                    if(resData.rCode == "0000" && resData.datas.resultList.length>0) {
                        let ids = [];
                        for(let x = 0; x<resData.datas.resultList.length; x++){
                            ids.push(resData.datas.resultList[x].memberId);
                        }
                        // console.log(ids);
                        this.fn_sendMessage({
                            messageCode:    'A004',
                            reciveUserIds:  ids
                        })
                    }else{
                        this.alert('등록되었습니다.');
                        this.getTestPlanData({
                            mainCodeId: this.search.tab.planData.mainCodeId,
                            midCodeId: this.search.tab.planData.midCodeId,
                        });
                        return;
                    }
                }else{
                    this.alert('등록에 실패했습니다.');
                    return;
                }
                
            } catch (error) {
                // console.error(error);
                console.log(error.response);
            }
        },
        /** 통합 메세지 */
        fn_sendMessage: function (_payload) {
            const url       = '/sendApi/api/messageMngt/message/send'
            const payload   = {
                                messageCode:    ''    ,
                                userId:         this.$store.getters['auth/getUserId'],
                                projectId:      this.$store.getters['auth/getProjectId'],
                                projectName:    this.$store.getters['auth/getProjectNm'],
                                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                                // reciveUserId:
                                // reciveuserIds:
                                docSeq:         '',

                                ..._payload,
                            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            // console.log(payload)

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('fn_sendMessage');
                    }else{
                        this.alert('등록되었습니다.');
                        this.getTestPlanData({
                            mainCodeId: this.search.tab.planData.mainCodeId,
                            midCodeId: this.search.tab.planData.midCodeId,
                        });
                        return;
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.alert('발송에 실패했습니다.');
                    return;
                })
        },
        selectHistory(item) {
            this.historyItem = item;
            this.confirm("History를 불러올 시, 기존 편집 중인 데이터가 삭제됩니다. 데이터를 가져오시겠습니까?", this.saveHistory, ''); 

            // if(this.editMode) { // 편집모드 시 alert
            // this.confirm("History를 불러올 시, 기존 데이터가 삭제됩니다. 데이터를 가져오시겠습니까?", this.saveHistory, ''); 
            // } else {
            //     this.saveHistory(this.historyItem); // 일반모드 시 바로 저장
            // }
        },
        async saveHistory() {
            // console.log('saveHistory : %o', this.historyItem);
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            const url = '/sendApi/api/testMngt/qualityTestActpln/testActplnReflct/write';
            
            let payload = {
                siteMstrId: this.historyItem.siteMstrId,
                revisionId: this.historyItem.revisionId,
            };

            try {
                this.$root.$emit('bv::hide::modal', 'HistoryLoad');
                await sendPostApi(url, payload);
                this.getTestPlanData({
                        mainCodeId: this.search.tab.planData.mainCodeId,
                        midCodeId: this.search.tab.planData.midCodeId,
                    });
            } catch (error) {
                console.log(error.response.data);
            }
        },
        openCommonProject() {
            // console.log('openCommonProject : ', item);
            this.$root.$emit('bv::show::modal', 'ImportCommonProject');
            this.$root.$emit('bv::hide::modal', 'OtherProjectData');
        },
        importSelectedItems(item) {
            // console.log('importSelectedItems : ', item.length);
            if(item.length === 0) {
                this.openPopup('blankCheckedData');
                return;
            }
            this.otherProjectSelectedData = item;
            this.openPopup('importSelectedItems');
        },
        importAllItems(item) {
            // console.log('importAllItems : ', item);
            // this.otherProjectAllData = item; 
            if(item.length === 0) {
                this.alert('조회된 데이터가 없습니다');
                return;
            }
            this.openPopup('importAllItems');
        },

        async saveAllProject() {    // 전체 데이타 저장
            // requestOptions.headers['Accept-Language'] = "ko";
            // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            // const url = '/sendApi/api/testMngt/qualityTestActpln/otrPrjctDataAll/write';
            // let payload = {
            //     otrSiteMstrId: this.selectedCommonData.siteMstrId,
            //     siteMstrId: this.$cookies.get('siteMstrId'),
            // };

            // try {
            //     await sendPostApi(url, payload);
            //     this.$root.$emit('bv::hide::modal', 'OtherProjectData');
            //     this.getTestPlanData();
            // } catch (error) {
            //     console.log(error.response.data);
            // }
        },
        async saveSelectedProject() {    // 선택 데이타 저장
            // console.log('saveSelectedProject :: ', this.otherProjectSelectedData);
            // requestOptions.headers['Accept-Language'] = "ko";
            // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            // const url = '/sendApi/api/testMngt/qualityTestActpln/otrPrjctDataPart/write';

            // let payload = {
            //     param: {
            //         otrSiteMstrId: this.selectedCommonData.siteMstrId,
            //         siteMstrId: this.$cookies.get('siteMstrId'),
            //     },
            //     listData: this.otherProjectSelectedData
            // }

            // try {
            //     await sendPostApi(url, payload);
            //     this.$root.$emit('bv::hide::modal', 'OtherProjectData');
            //     this.getTestPlanData();
            // } catch (error) {
            //     console.log(error.response.data);
            // }
            
        },
        async getComboData () {  // category menu data 생성
            // console.log('getComboData')
            // requestOptions.headers['Accept-Language'] = "ko";
            // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            // let url = '/sendApi/api/common/mainMidCode/list';
            // let param = { codeType: 'TEST', stepCnt : 'SP3'  };
            
            // try {
            //     const data = await sendPostApi(url, param);
            //     // console.log('===> getComboData : %o', data.data)
            //     this.mainCombo = data.data.dlMainCode;
            //     this.midCombo = data.data.dlMidCode;
            //     this.subCombo = data.data.dlSubCode;
            //     // console.log('===> mainCombo : %o', this.mainCombo)
            // } catch (error) {
            //     console.log(error.response.data);
            // }
        },

        /** client Seacrh */
        fn_clientSearch: function () {

            /** 검색 시 초기화 하는 방법 */
            this.grid.testDataSheet.loadSearchData({
                data: this.clientSearch.target.filter(item => this.clientSearch.key ? String(item.subName).indexOf  (this.clientSearch.key) > -1 : true )
            })

            
            /** 검색 후에도 남는 방법 */
            // this.grid.testDataSheet.getDataRows().forEach(row => {
            //     if (!this.clientSearch.key || this.clientSearch.key === '') {
            //         this.grid.testDataSheet.showRow(row)
            //     } else {
            //         if (String(row.subName).indexOf(this.clientSearch.key) > -1) {
            //             this.grid.testDataSheet.showRow(row)
            //         } else {
            //             this.grid.testDataSheet.hideRow(row)
            //         }
            //     }
            // })
        },

        print:function(){
            this.grid.testPlanSheetShow.doPrint();
            // this.grid.testPlanSheetShow.doPrint({
            //     menu: 2,
            // });
        },

        /** 엑셀 다운로드 */
        fn_exportExcel: function (sheet) {
            this.excelDownload.options   = {
                Cfg: sheet.options.Cfg,
                Cols : sheet.options.Cols.filter((item => !['chk'].includes(item.Name)))
            }
            // this.excelDownload.downloadOption = {
            // }
            this.excelDownload.fileName  = `품질시험계획서_${this.$moment().format('YYYYMMDD')}.xlsx`
            this.excelDownload.data = sheet.getDataRows();
            this.excelDownload.request  = true
            // sheet.down2Excel({
            //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
            //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
            //     reqHeader:  {
            //                     'Authorization': this.$cookies.get('Authorization'),
            //                     'Accept-Language': 'ko'
            //                 },
            //     fileName:   `품질시험계획_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
            // })  
        },
    }
}
</script>