<template>
    <section class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />

        <div class="lst_tabs">
            <ul class="">
                <li v-for="(item, index) in tab.list" :class="{active: tab.current === index}" :key="item" >
                    <!-- <a href="javascript:void(0);" @click="tab.current = index; if(tab.current === 1) dataLoadCost()"> -->
                    <a href="javascript:void(0);" @click="tab.current = index">
                        {{ item }}
                    </a>
                </li>
            </ul>
        </div>

        <div 
            class="tab_area submenu_on"
        >
            <tree-category-tab
                ref-id="testMngtTreeCategory_data"
                v-show="tab.current === 0"
                ref="testMngtTreeCategory_data"
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedTabCheckedList"
                no-init-emit
            />
            <tree-category-tab
                ref-id="testMngtTreeCategory_cost"
                v-show="tab.current === 1"
                ref="testMngtTreeCategory_cost"
                :category-data="categoryData"
                :use-check-box="false"
                @changed-checked-list="changedTabCheckedList"
                no-init-emit
            />
            
            <div 
                class="right_content"
            >
                <div class="inner">
                    <div class="button_box">
                        <button
                            type="button"
                            class="btn btn_sm btn_excel"
                            @click="$bvModal.show('TestMngtHeadSetUpSheet_ExcelUploadModal2')"
                            v-if="tab.current === 0 && editMode"
                        >
                            엑셀 업로드
                        </button>
                        <button
                            type="button"
                            class="btn btn_sm btn_excel"
                            @click="fn_exportExcel"
                            v-if="(tab.current === 0 && !editMode) || tab.current === 1"
                        >
                            엑셀 다운로드
                        </button>
                        <!--
                        <button
                            v-if="tab.current === 0"
                            type="button"
                            class="btn btn_sm btn_excel"
                            @click="$bvModal.show('TestMngtHeadSetUpSheet_ExcelUploadModal1')"
                        >
                            엑셀 업로드(종별)
                        </button>
                        -->
                        <div class="fr">
                            <button
                                type="button" 
                                class="btn btn_sm btn_darkblue"
                                @click="changeMode('E')"
                                v-if="tab.current === 0 && !editMode"
                            >
                                편집모드
                            </button>
                            <button
                                type="button" 
                                class="btn btn_sm btn_darkblue"
                                @click="changeMode('S')"
                                v-if="tab.current === 0 && editMode"
                            >
                                편집취소
                            </button>
                            <button
                                type="button"
                                class="btn btn_sm btn_darkgray"
                                @click="clickCopyRows()"
                                v-if="tab.current === 0 && editMode"
                            >
                                행 복사
                            </button>

                            <div 
                                v-if="tab.current === 0 && editMode"
                                class="btn_number"
                            >
                                <select v-model="gridData.addRowsCount" class="form_control num">
                                    <option
                                        v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                        :key="count"
                                        :value="count"
                                    >
                                        {{ count }}
                                    </option>    
                                </select>
                                <button
                                    type="button"
                                    class="btn btn_sm"
                                    @click="clickAddRows()"
                                >
                                    행 추가
                                </button>
                            </div>

                            <button 
                                type="button" 
                                class="btn btn_sm btn_darkgray"
                                @click="clickDeleteRow()"
                                v-if="tab.current === 0 && editMode"
                            >
                                행 삭제
                            </button>
                            <button
                                type="button" 
                                class="btn btn_sm btn_darkblue"
                                @click="clickDataSave()"
                                v-if="tab.current === 0 && editMode"
                            >
                                저장
                            </button>
                            <button
                                type="button" 
                                class="btn btn_sm btn_darkblue"
                                @click="clickCostSave()"
                                v-if="tab.current === 1"
                            >
                                저장
                            </button>
                            <!-- <button
                                type="button" 
                                class="btn btn_sm btn_darkblue"
                                @click="changeMode()"
                            >
                                편집모드
                            </button> -->
                        </div>
                    </div>

                    <div class="ib_wrap" v-show="tab.current === 0" :style="{height: `calc(100vh - 280px)`}">
                        <div id="testMngtHeadSetUpSheetShow" class="ibsheet_table" style="height: 100%;" v-show="!editMode"></div>
                        <div id="testMngtHeadSetUpSheetEdit" class="ibsheet_table" style="height: 100%;" v-show="editMode"></div>
                    </div>
                    <div class="ib_wrap" v-show="tab.current === 1" :style="{height: `calc(100vh - 280px)`}">
                        <div id="testMngtHeadSetUpSheet_cost" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>

        </div>

        <excel-upload-modal
            ref-id="TestMngtHeadSetUpSheet_ExcelUploadModal1"
            mode="SHEET"
            fileType="TEST1"
            columnLength="7"
            @import="fn_importExcel"
        />

        <excel-upload-modal
            ref-id="TestMngtHeadSetUpSheet_ExcelUploadModal2"
            mode="SHEET"
            fileType="TEST2"
            columnLength="12"
            @import="fn_importExcel"
        />
        
        <excel-download
            v-model="excelDownload.request"
            ref-id="TestMngtHeadSetUpSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
        
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
        />         -->
    </section>
</template>

<script>
import TreeCategoryTab from "@/pages/quality/testMngt/component/TreeCategoryTab";
// import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
import { sendPostApi, requestOptions } from '@/apis/common';
import { testDataShow, testDataEdit, testExpense } from '@/pages/quality/testMngt/data/testData';
import loader from '@ibsheet/loader';
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

import axios from 'axios'
import _ from 'lodash'
import ExcelUploadModal from '@modal/common/ExcelUploadModal.vue'
import ExcelDownload from '@component/common/ExcelDownload.vue'

export default {
    name: 'TestMngtHeadSetUpsheet',
    mixins: [MsgBoxMixins],
    data () {
        return {
            editMode : false,
            gridDataShow : {
                data : [],
            },
            gridData: {
                grid: null,
                data: [],
                options: {},
                addRowsCount: 1,
                focus: {
                    row: null,
                    col: null
                }
            },
            gridCost: {
                grid: null,
                data: [],
                options: {},
                // addRowsCount: 1,
                focus: {
                    row: null,
                    col: null
                }
            },
            mounted: false,

            search: {
                tab: {
                    useCheckBox: false,
                    data0: {
                        mainCodeId: null,
                        midCodeId: null,
                    },
                    data1: {
                        mainCodeId: null,
                        midCodeId: null,
                    },
                },
                box: {}
            },

            tab: {
                current: 0,
                list: ['품질시험 Data', '품질시험비용'] // tab name
            },
            popup: {
                title: '',
                isShow: false,
                message: '',
                useCancelButton: false,
                buttonName: {},
                refId: 'testMngtHeadSetUpAlert',
                purpose: '',

            },

            categoryData: [],
            category: {
                data: []
            },

            default: {
                popup: {
                    duplicateProductName: {
                        title: '알림',
                        message: '이미 등록된 품명 혹은 품명메타입니다.',
                        purpose: 'duplicateProductName',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인'
                        }
                    },
                    saveSuccessed: {
                        title: '알림',
                        message: '저장되었습니다.',
                        purpose: 'saveSuccessed',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    saveFailed: {
                        title: '알림',
                        message: '저장에 실패했습니다.',
                        purpose: 'saveFailed',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인'
                        }
                    },
                    emptyAlert: {
                        title: '알림',
                        message: '구분/공종/종별 모두 입력해야합니다.',
                        purpose: 'emptyAlert',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인'
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
                    deleteRows: {
                        title: '알림',
                        message: '삭제할 행을 체크해 주세요',
                        purpose: 'copyRows',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                }
            },

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
    components: {
        TreeCategoryTab,
        // WrappedAlert,
        Breadcrumb,
        ExcelUploadModal,
        ExcelDownload
    },
    watch: {
        // "search.tab.data": {
        //     handler () {
        //         if (this.mounted) {
        //             // console.log(this.search.tab.data);
        //             this.fetchData({}, this.tab.current)
        //         }

        //     },
        //     deep: true
        // },
        // "tab.current": {
        //     handler () {
        //         console.log("tab.current : %o", this.tab.current)
        //         if(this.tab.current == 1){
        //             this.dataLoadCost();
        //         }

        //     }
        // }

    },
    
    mounted () {
        // this.getCategoryData();
        // this.initGrid()
        this.mounted = true;

        this.fetchCategoryData()
    },
    beforeDestroy () {
        if (this.gridDataShow.data) this.gridDataShow.data.dispose()
        if (this.gridData.grid) this.gridData.grid.dispose()
        if (this.gridCost.grid) this.gridCost.grid.dispose()
    },
    methods: {
        

        fetchCategoryData () {
            const url = '/sendApi/api/common/codeCategory/list'
            const payload = {
                codeType: 'TEST'
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
                    this.categoryData = response.data.list
                })
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    this.initGrid()
                })

        },
        initGrid () {
            // data - init
            let dataShowoptions = testDataShow.options

            // 품질시험DATA Sheet생성 view
            loader.createSheet({
                el: 'testMngtHeadSetUpSheetShow',
                data : null,
                options : dataShowoptions,
            }).then(sheet => {
                this.gridDataShow.data = sheet
            })

            // 본사 set-up 수정상태
            this.gridData.options = testDataEdit.options

            this.setCategoryList({
                main: this.gridData.options.Cols[1],
                mid: this.gridData.options.Cols[2]
            })

            this.gridData.options.Events = {
                onAfterClick: this.clickGrid,
                onAfterChange: this.changeGrid,
                /** loading 이슈로 임시 주석처리 */
                // onDblClick: (event) => {
                //     const merged = event.sheet.getMergeRange(event.row, event.col)
                //     if (merged[0] !== merged[3]) {
                //         if('minValue' === event.col) {
                //             event.sheet.setMergeCancel(event.row, event.col)
                //             event.sheet.setAttribute(event.row, event.col, 'CanEdit', 1)
                //         }
                //     }
                // },
                // onRenderFinish: (event) => {
                //     event.sheet.getDataRows().forEach(row => {
                //         if(row.minRange === 'YN') {
                //             event.sheet.setMergeRange(row, 'minValue', row, 'testUnit')
                //             event.sheet.setAttribute(row, 'minValue', 'CanEdit', 0)
                //         }
                //     })
                // },
                onRenderFirstFinish: () => {
                    const payload = {
                        mainCodeId: this.categoryData[0].mainCodeId,
                        midCodeId:  this.categoryData[0].midCodeList[0].midCodeId
                    }
                    this.fetchData(payload, 0)
                },
                onAfterRowAdd: (event) => {
                    event.sheet.setAttribute(event.row, null, 'RowMerge', false)
                },
                onAfterRowDelete: (event) => {
                    event.sheet.hideRow(event.row)
                },
                onAfterRowCopy: event => {
                    event.sheet.setAttribute(event.row, null, 'RowMerge', false)
                    event.sheet.setCheck(event.row, 'chk', false)
                }
            }

            // cost - init
            this.gridCost.options = testExpense.options;
            this.gridCost.options.Events = {
                onRenderFirstFinish: () => {
                    const payload = {
                        mainCodeId: this.categoryData[0].mainCodeId,
                        midCodeId:  this.categoryData[0].midCodeList[0].midCodeId
                    }
                    this.fetchData(payload, 1)
                }
            }
            this.setCategoryList({
                main: this.gridCost.options.Cols[0],
                mid: this.gridCost.options.Cols[1]
            })

            // 품질시험DATA Sheet생성 edit
            loader.createSheet({
                el: 'testMngtHeadSetUpSheetEdit',
                data: this.gridData.data,
                options: this.gridData.options,
            }).then(sheet => {
                this.gridData.grid = sheet
            })

            // 품질시험비용 Sheet생성
            loader.createSheet({
                el: 'testMngtHeadSetUpSheet_cost',
                data: this.gridCost.data,
                options: this.gridCost.options,
            }).then(sheet => {
                this.gridCost.grid = sheet
            })

        },
        fetchData (param, tabCurrent = this.tab.current) {
            const url = tabCurrent === 0
                            ? '/sendApi/api/testMngt/headSetUp/qualityTestData/list'
                            : '/sendApi/api/testMngt/headSetUp/qualityTestCost/list'
            const payload = {
                mainCodeId: this.search.tab[`data${tabCurrent}`].mainCodeId,
                midCodeId:  this.search.tab[`data${tabCurrent}`].midCodeId,
                ...param
            }
            // console.log(param);
            // console.log(payload);
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (tabCurrent === 0) {
                        this.gridData.data = response.data.datas.dlTestData;
                        // 뷰어 모드
                        this.gridDataShow.data.loadSearchData({
                            data: response.data.datas.dlTestData
                        });
                        // 편집 모드
                        this.gridData.grid.loadSearchData({
                            data: this.gridData.data
                        });
                    } else if (tabCurrent === 1) {
                        this.gridCost.data = response.data.datas.dlTestCost
                        this.gridCost.grid.loadSearchData({
                            data: response.data.datas.dlTestCost
                        });
                    }
                 })
                .catch(error => {
                    console.error(error)
                })
        },
        // 품질시험 DATA 조회
        getQualityTestData : async function() {
            const url = '/sendApi/api/testMngt/headSetUp/qualityTestData/list';
            const payload = {
                mainCodeId: this.search.tab.data0.mainCodeId,
                midCodeId:  this.search.tab.data0.midCodeId,
            }

            const data = await sendPostApi(url, payload);

            this.gridData.data = data.data.datas.dlTestData;
            // 뷰어 모드
            this.gridDataShow.data.loadSearchData({
                data: data.data.datas.dlTestData
            });
        },

        async getCategoryData () {
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            
            let url = '/sendApi/api/common/codeCategory/list';
            let param = { codeType: 'TEST' };
            
            try {
                const { data } = await sendPostApi(url, param);
                this.categoryData = data.list;

                this.initGrid()
            } catch (error) {
                console.log(error.response.data)
            }
        },
        dataLoad() {
            this.fetchData({}, 0)
        },
        dataLoadCost() {
            this.fetchData({}, 1)
        },
        setMergeRow() {    // area merge
            const options = {
                key: 'minRange',
                startColumnName: 'minValue',
                endColumnName: 'testUnit',
            }
            // console.log('setMergeRow')
            
            const allRows = this.grid.grid.getDataRows();
            
            for (let i = 0; i < allRows.length; i++) {
                if ( allRows[i][options.key] == 'YN' ) {
                    this.grid.grid.setMergeRange(allRows[i], options.startColumnName, allRows[i], options.endColumnName);
                    this.grid.grid.setAttribute(allRows[i], options.startColumnName, "CanEdit", 0);
                }
            }
        },
        setCategoryList(payload) {
            const options = {
                categoryData: this.categoryData,
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
            // console.log("=============== options.categoryData : %o", options.categoryData);
            options.categoryData.forEach(item => {
                options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${item[options.innerObjectKey].map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
                options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${item[options.innerObjectKey].map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
            })
        },
        changedTabCheckedList (item) {
            this.search.tab[`data${this.tab.current}`] = item
            this.fetchData(this.search.tab[`data${this.tab.current}`], this.tab.current)
            // event
        },
        importExcel () {
            const options = {
                append: 1,                  // 새로로드할지, 뒤에 붙일지 여부
                fileExt: 'xls|xlsx|csv',    // 가용 확장자
                mode: 'HeaderMatch'         // column 명 매칭해서 처리
            }

            this.gridData.grid.importData(options)
        },
        fn_exportExcel: function () {
            if(this.tab.current === 0) {
                this.gridDataShow.data.down2Excel({
                merge:      1,
                downCols:   'Visible',
                reqHeader:  {
                                'Authorization': this.$cookies.get('Authorization'),
                                'Accept-Language': 'ko'
                            },
                fileName:    `품질시험데이터_${this.$moment().format('YYYYMMDD')}.xlsx`

                })
            } else {
                this.gridCost.grid.down2Excel({
                merge:      1,
                downCols:   'Visible',
                reqHeader:  {
                                'Authorization': this.$cookies.get('Authorization'),
                                'Accept-Language': 'ko'
                            },
                fileName:    `품질시험비용_${this.$moment().format('YYYYMMDD')}.xlsx`

                })
            }
            // this.excelDownload.options   = {
            //     Cfg: sheet.options.Cfg,
            //     Cols : sheet.options.Cols
            // }
            // // this.excelDownload.downloadOption = {
            // // }
            // this.excelDownload.fileName  = `${['품질시험_데이터','품질시험비용'][this.tab.current]}_${this.$moment().format('YYYYMMDD')}.xlsx`
            // this.excelDownload.data = sheet.getDataRows();
            // this.excelDownload.request  = true

            
        },
        exportExcel () {
            // export Data options
            // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
            const options = {
                fileName: `HeadSetUp_${'date'}.xlsx`,
            }

            
            if (this.tab.current === 0) {
                this.gridData.grid.exportData(options)
            } else {
                this.gridCost.grid.exportData(options)
            }
            
        },
        clickAddRows () {
            // // default data
            // const initializedDefaultData = {
            //     // case9: '0',
            //     // case10: '0'
            // }
            // // need to initialData
            // for(let i=0; i<this.grid.addRowsCount; i++) {
            //     this.grid.grid.addRow({
            //         next: this.grid.grid.getFirstRow(),
            //         init: initializedDefaultData
            //     })
            // }
            // const checkedRows = this.grid.grid.getRowsByChecked(this.grid.options.Cols[0].Name);
            // if(checkedRows.length === 0) {
            //     // 초기화 할 데이터가 없다면 addRows 함수를 쓰는것을 권장
            //     this.grid.grid.addRows({
            //         count: this.grid.addRowsCount,
            //         next: this.grid.grid.getFirstRow(),
            //     }) 
            // } else {
            //     this.grid.grid.addRows({
            //         count: this.grid.addRowsCount,
            //         next: this.grid.grid.getNextRow(checkedRows[0]),
            //     })
            // }

            

            // this.grid.grid.blur()
            // this.grid.focus.row = this.grid.grid.getFirstRow()
            // this.grid.focus.col = this.grid.options.Cols[1].Name
            // this.grid.grid.focus(this.grid.focus.row, this.grid.focus.col)

            const checkedRows = this.gridData.grid.getRowsByChecked(this.gridData.options.Cols[0].Name)
            if(checkedRows.length === 0) {
                this.gridData.grid.addRows({
                    count: this.gridData.addRowsCount,
                    next:  this.gridData.grid.getFirstRow(),
                })
            // } else if (checkedRows.length === 1) {
            } else {
                this.gridData.grid.addRows({
                    count: this.gridData.addRowsCount,
                    next:  this.gridData.grid.getNextRow(checkedRows[0])
                })
            }

            // this.gridData.grid.blur()
            // this.gridData.focus
        },
        clickCopyRows (sheet = this.gridData.grid, checkColumn = 'chk') {
            const checkedRows = sheet.getRowsByChecked(checkColumn)
            if(checkedRows.length === 0) {
                // this.openPopup('copyRows');
                this.alert('복사할 행을 체크해 주세요')
                return;
            }
            // const copiedRows = sheet.copyRows(checkedRows, sheet.getNextRow(checkedRows[0]))
            sheet.copyRows(checkedRows, sheet.getNextRow(checkedRows[0]))
            // copiedRows.forEach(item => {
            //     item[checkColumn] = false
            //     sheet.setAttribute(item, null, 'RowMerge', false)
            //     sheet.refreshCell(item, checkColumn)
            // })
        },
        clickDeleteRow () {
            // changed 기록엔 남아있음
            const checkedRows = this.gridData.grid.getRowsByChecked(this.gridData.options.Cols[0].Name)
            if(checkedRows.length === 0) {
                // this.openPopup('deleteRows')
                this.alert('삭제할 행을 체크해 주세요')
                return;
            }
            this.gridData.grid.deleteRows({rows: checkedRows })
            // checkedRows.forEach(item => {
            //     this.gridData.grid.hideRow({
            //         row: item,
            //         del: false,
            //         norender: false
            //     })
            // })
            // checkedRows.forEach(item => {
            //     item['chk'] = false
            //     this.gridData.grid.refreshCell(item, 'chk')
            // })
        },
        clickDataSave () {
            // validate
            // const changedRows = this.grid.grid.getRowsByStatus("Added,Changed,Deleted")
            
            // validate 됬을때 saveData를 발생 시키지 않기 위함
            let validate = true
            
            const tabs = ['Data']

            // this[`grid${tabs[this.tab.current]}`].grid.getDataRows

            this[`grid${tabs[this.tab.current]}`].grid.getDataRows().some((item)=> {
                this[`grid${tabs[this.tab.current]}`].focus.row = item
                if (item.Deleted) return false

                Array(3).fill().map((item, index) => {return index+1}).some((columnIndex) => {
                    this[`grid${tabs[this.tab.current]}`].focus.col = this[`grid${tabs[this.tab.current]}`].options.Cols[columnIndex].Name
                    if(item[this[`grid${tabs[this.tab.current]}`].focus.col] === '') {
                        validate = false
                        // this.openPopup('emptyAlert')
                        this.alert('구분/공종/종별 모두 입력해야합니다')
                        return true
                    }
                })
            })

            if(validate) {
                this.confirm('저장하시겠습니까?', this.saveData);
            }
            // if(validate) this.saveData()
        },
        clickCostSave () {
            let validate = true
            
            const tabs =  ['Data', 'Cost']
            //const tabs =  ['Cost']
            // this[`grid${tabs[this.tab.current]}`].grid.getDataRows

            this[`grid${tabs[this.tab.current]}`].grid.getDataRows().some((item)=> {
                this[`grid${tabs[this.tab.current]}`].focus.row = item
                if (item.Deleted) return false

                Array(3).fill().map((item, index) => {return index+1}).some((columnIndex) => {
                    this[`grid${tabs[this.tab.current]}`].focus.col = this[`grid${tabs[this.tab.current]}`].options.Cols[columnIndex].Name
                    if(item[this[`grid${tabs[this.tab.current]}`].focus.col] === '') {
                        validate = false
                        // this.openPopup('emptyAlert')
                        this.alert('구분/공종/종별 모두 입력해야합니다.')
                        return true
                    }
                })
            })

            if(validate) {
                this.confirm('저장하시겠습니까?', this.saveData);
            }
            // this.saveData()
        },
        async saveData () {
            // changedRow to Json

            const tabs = ['Data', 'Cost']


            const changedInfoToJson =  this[`grid${tabs[this.tab.current]}`].grid.getSaveJson({
                saveMode: 3
            })
            let changedValue = changedInfoToJson.data.length;
            // console.log(changedInfoToJson.data.length);
            // payload 수정
            changedInfoToJson.data.forEach((item) => {
                item.status = item.STATUS;
                item.tstSbjDtlId =  this[`grid${tabs[this.tab.current]}`].grid.getRowById(item.id).tstSbjDtlId;
                item.subCodeId =  this[`grid${tabs[this.tab.current]}`].grid.getRowById(item.id).subCodeId;
                item.midCodeId =  this[`grid${tabs[this.tab.current]}`].grid.getRowById(item.id).midCodeId;
                item.tstQltCostId = this[`grid${tabs[this.tab.current]}`].grid.getRowById(item.id).tstQltCostId;

                if(item.minRange === 'YN' || item.maxRange === 'YN') {
                    if( item.minValue != "이상유무" ) {
                        item.minValue = '이상유무';
                    }
                    if( item.maxValue != "이상유무" ) {
                        item.maxValue = '이상유무';
                    }
                    if( item.testUnit != "이상유무" ) {
                        item.testUnit = '이상유무';
                    }
                }
                // delete item.STATUS;
            })

            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

            let url = '';
            if( this.tab.current === 0) {
                url = '/sendApi/api/testMngt/headSetUp/qualityTestData/write';
            } else{
                url = '/sendApi/api/testMngt/headSetUp/qualityTestCost/write';
            }
            
            const payload = changedInfoToJson.data.reverse();
            // console.log( "payload =====> %o", payload )
            let param = {
                param: {
                    siteId: '',
                    projectId: ''
                },
                listData: payload
            }

            try {
                await sendPostApi(url, param, {
                    headers: {
                        "Content-Type": "application/json;",
                        "Accept-Language": "ko",
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                
                // this.openPopup('saveSuccessed')
                
                if( this.tab.current === 0 ){
                    if(changedValue > 0){
                        let url = '/sendApi/api/myWork/userMngt/userMngt/list';
                        let param = {};

                        let rst2 = await sendPostApi(url, param);
                        // console.log(rst2.data.datas.dlUser);
                        if(rst2.data.datas.dlUser.length>0){
                            let ids = [];
                            for(let x = 0; x<rst2.data.datas.dlUser.length; x++){
                                ids.push(rst2.data.datas.dlUser[x].userId);
                            }
                            // console.log(ids);
                            this.fn_sendMessage({
                                messageCode:    'A005',
                                reciveUserIds:  ids
                            })
                        }else{
                            this.alert('저장되었습니다');
                            this.editMode = false;
                            this.getQualityTestData();
                            return;
                        }
                    }else{
                        this.alert('저장되었습니다');
                        this.editMode = false;
                        this.getQualityTestData();
                        return;
                    }
                } else {
                    this.alert('저장되었습니다');
                    let obj = {};
                    if(this.search.tab.data1.mainCodeId == null ){
                        obj['mainCodeId'] = this.categoryData[0].mainCodeId;
                        obj['midCodeId'] = this.categoryData[0].midCodeList[0].midCodeId;
                        this.fetchData(obj, 1);
                        return;
                    }else{
                        this.fetchData(this.search.tab.data1, 1)
                    }
                }

                return;
                // this.getGridData();
            } catch (error) {
                console.log(error.response);
            }
            
            // console.log(response)
        },

        clickPopupConfirm (purpose) {
            this.popup.isShow = false

            const tabs = ['Data', 'Cost']

            // console.log(purpose)
            switch(purpose) {
                case 'duplicateProductName': 
                case 'emptyAle+*9-**************-**************9rt':
                case 'NotSelectMaterial':
                    // console.log(purpose)
                    this[`grid${tabs[this.tab.current]}`].grid.blur()
                    this[`grid${tabs[this.tab.current]}`].grid.focus( this[`grid${tabs[this.tab.current]}`].focus.row,  this[`grid${tabs[this.tab.current]}`].focus.col)
                    break
                case 'saveSuccessed':
                case 'saveFailed':
                    break
            }
        },

        clickPopupCancel (purpose) {
            this.popup.isShow = false

            switch(purpose) {
                case 'save':

                    break
            }
        },
        
        changeGrid (event) {
            switch (event.col) {
                case this.gridData.options.Cols[2].Name:    // midCodeId 삽입
                    // console.log(event.val);
                    event.row.midCodeId = event.val;
                    break;
                case this.gridData.options.Cols[3].Name:    // subCodeId 삭제
                    event.row.subCodeId = '';
                    break;
                case this.gridData.options.Cols[9].Name:
                    // var focusRow = headDataSheet.getFocusedRow();
                    // var focusCol = sheet.getFocusedCol();
                    // var msg = document.getElementById('msg');

                    // alert(">>"+event.val+"<<");

                    // 최소값 범위선택
                    if( event.val == "YN" ) {
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Type", "Text")
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Format", "")
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Type", "Text")
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Format", "")
                        // console.log(event.row)

                        event.row.minValue = "이상유무";
                        event.row.maxValue = "이상유무";
                        event.row.maxRange = "YN";
                        event.row.testUnit = "이상유무";
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[8].Name, "CanEdit", 0);
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[10].Name, "CanEdit", 0);
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[12].Name, "CanEdit", 0);
                    } else if( event.val == "" || event.val == null ) {
                        event.row.minValue = "";
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[8].Name, "CanEdit", 0);
                    } else {
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Type", "Text")
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Format", "#,##0.00")
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Type", "Text")
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Format", "#,##0.00")
                        if (event.row.minValue == "이상유무"){
                            event.row.minValue = "";
                        }
                        if (event.row.maxValue == "이상유무"){
                            event.row.maxValue = "";
                        }
                        if (event.row.maxRange == "YN"){
                            event.row.maxRange = "";
                        }
                        if (event.row.testUnit == "이상유무"){
                            event.row.testUnit = "";
                        }
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[8].Name, "CanEdit", 1);
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[10].Name, "CanEdit", 1);
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[12].Name, "CanEdit", 1);
                    }
                    event.sheet.refreshRow(event.row);  // 반영
                    break;
                case this.gridData.options.Cols[11].Name:
                    // 최대값 범위선택
                    if( event.val == "YN" ) {
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Type", "Text");
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Format", "");
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Type", "Text");
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Format", "");
                        event.row.minValue = "이상유무";
                        event.row.minRange = "YN";
                        event.row.maxValue = "이상유무";
                        event.row.testUnit = "이상유무";
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[8].Name, "CanEdit", 0);
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[10].Name, "CanEdit", 0);
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[12].Name, "CanEdit", 0);
                    } else if( event.val == "" || event.val == null ) {
                        event.row.maxValue = "";
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[10].Name, "CanEdit", 0);
                    } else {
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Type", "Text");
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Format", "#,##0.00");
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Type", "Text");
                        // event.sheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Format", "#,##0.00");

                        if (event.row.minValue == "이상유무"){
                            event.row.minValue = "";
                        }
                        if (event.row.minRange == "YN"){
                            event.row.minRange = "";
                        }
                        if (event.row.maxValue == "이상유무"){
                            event.row.maxValue = "";
                        }
                        if (event.row.testUnit == "이상유무"){
                            event.row.testUnit = "";
                        }
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[8].Name, "CanEdit", 1);
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[10].Name, "CanEdit", 1);
                        event.sheet.setAttribute(event.row, this.gridData.options.Cols[12].Name, "CanEdit", 1);
                    }
                    event.sheet.refreshRow(event.row);  // 반영
                    break;
            }
        },
        changeMode : function(mode){
            if( mode == 'E') {
                this.editMode = true;
                // 편집 모드 조회된 정보를 셋팅
                this.gridData.grid.loadSearchData({
                    data: this.gridData.data
                });
            } else {
                this.editMode = false;
            }
        },
        /*
        gridMergeCancel(event){
            let mergeArr      = headDataSheet.getMergeRange( event.row, event.col );
            var mergeStartRow = mergeArr[0]; // 머지 시작 행
            var mergeStartCol = mergeArr[1]; // 머지 시작 열
            var mergeEndRow   = mergeArr[2]; // 머지 종료 행
            var mergeEndCol   = mergeArr[3]; // 머지 종료 열

            // merge 상태 인 경우 진행
            if( mergeStartCol != mergeEndCol ) {
                if( "minValue" === event.col ) {
                    headDataSheet.setMergeCancel( event.row, event.col );
                    headDataSheet.setAttribute(event.row, event.col, "CanEdit", 1);
                }
            }
        },
        */
        // gridFocusChk(event){
        //     if( "minValue" === event.col || "maxValue" === event.col) {
        //         if( event.row.minRange == "YN" ) {
        //             headDataSheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Type", "Text");
        //             headDataSheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Format", "");
        //         } else {
        //             headDataSheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Type", "Text");
        //             headDataSheet.setAttribute(event.row, this.grid.options.Cols[9].Name, "Format", "#,##0.00");
        //         }
        //         if( event.row.maxRange == "YN" ) {
        //             headDataSheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Type", "Text");
        //             headDataSheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Format", "");
        //         } else {
        //             headDataSheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Type", "Text");
        //             headDataSheet.setAttribute(event.row, this.grid.options.Cols[11].Name, "Format", "#,##0.00");
        //         }
        //     }
        // },
        openPopup (type) {
            this.popup = {
                ...this.popup,
                ...this.default.popup[type],
            }
            this.popup.isShow = true
        }, 
        deleteStringSpace (object) {
            return String(object).replace(' ', '')
        },
        wrappedDivSize () {
            return document.getElementsByClassName('ib_wrap').length === 0
                ? 280
                : (document.getElementsByClassName('ib_wrap')[0].getBoundingClientRect().top + 280)
        },
        fn_importExcel: function (data) {
            this.gridData.grid.loadSearchData({
                data:   data.map(item => {
                                item.Added = 1
                                return item
                            }),
                append: true,
                next:   this.gridData.grid.getFirstRow()
            })
            this.$bvModal.hide('TestMngtHeadSetUpSheet_ExcelUploadModal2');
        },
        /** 통합 메세지 */
        fn_sendMessage: function (_payload) {
            const url       = '/sendApi/api/messageMngt/message/send'
            const payload   = {
                                messageCode:    ''    ,
                                userId:         this.$store.getters['auth/getUserId'],
                                projectId:      'ALL_SITE',
                                projectName:    'ALL_SITE',
                                siteMstrId:     'ALL_SITE',
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
                        //품질시험data일경우
                        this.alert('저장되었습니다');
                        this.editMode = false;
                        // this.getQualityTestData();
                        return;
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.alert('발송에 실패했습니다.');
                    return;
                })
        },
    },
    
}

</script>
