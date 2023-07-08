<template>
    <section class="tab_contents">
        <!-- <h2 class="sub_title">자재관리 > 현장 Set-Up</h2> -->
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
            class="tab_area submenu_on"
        >
            <search-category-box
                :category-data="categoryData"
                @search-category="searchCategory"
            />
            <tree-category-tab
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedTabCheckedList"
            />

            <div class="right_content" >
                <div class="inner">
                    <div class="button_box">
                        <button
                            type="button"
                            class="btn btn_sm btn_excel"
                            @click="fn_exportExcel"
                        >
                            엑셀 다운로드
                        </button>
                        
                        <div class="fr">
                            <button
                                type="button"
                                class="btn btn_sm btn_darkgray"
                                @click="clickSave"
                            >
                                저장
                            </button>
                        </div>
                    </div>


                    <div class="ib_wrap" :style="{height: `calc(100vh - 320px)`}">
                        <div id="MaterialSiteSetUpsheet" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>

            <excel-download
                v-model="excelDownload.request"
                ref-id="MaterialProjectCheckListView_ExcelDownload"
                :file-name="excelDownload.fileName"
                :download-option="excelDownload.downloadOption"
                :options="excelDownload.options"
                :data="excelDownload.data"
            />
        </div>

        <div
            v-show="tab.current === 1"
            class="tab_area"
        >
            <!-- class=" submenu_on" -->
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
                code-type="MTRL"
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
                code-type="MTRL"
            />

        </div>

    </section>
</template>

<script>
import SearchCategoryBox from "@/pages/quality/materialMngt/component/SearchCategoryBox"
import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
import Numbering from "@material/component/Numbering"
import ApprovalOption from "@material/component/ApprovalOption"
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import ExcelDownload from '@component/common/ExcelDownload.vue'

import axios from 'axios'

import loader from '@ibsheet/loader'
// import API from '@/pages/quality/materialMngt/apis/material'
import API from '@/apis/'
import { mapGetters } from 'vuex'

import { Material3 } from '@/pages/common/data/MaterialsList'

export default {
    name: 'MaterialSiteSetUpsheet',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        Numbering,
        ApprovalOption,
        SearchCategoryBox,
        TreeCategoryTab,
        Breadcrumb,
        ExcelDownload,
    },
    computed: {
        ...mapGetters({
            userId: 'auth/getUserId',
        }),
        userWritable: {
            get: function () {
                return this.checkUser(this.userId, 'write')
            },
        },
        userUnusable: {
            get: function () {
                return this.checkUser(this.userId, 'unuse')
            },
        },
        userChangable: {
            get: function () {
                return this.checkUser(this.userId, 'change')
            },
        }, 
    },
    watch: {
        'search.tab.data': {
            handler () {
                if(this.mounted) {
                    this.getGridData({
                        productName: '',
                        mainCodeId: this.search.tab.data.mainCodeId,
                        midCodeId: this.search.tab.data.midCodeId,
                    })
                }
            },
            deep: true
        }
    },
    activated: function () {
        const savePage = this.$store.getters['tabInfo/getSavePage']

        if (savePage.length > 0) {
            const menuId = this.$store.getters['tabInfo/getCurrentMenuId']
            const url = '/sendApi/api/programMngt/menuChildProgram/list'
            const payload = {
                menuMngtId: menuId
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

                    const fetchable = response.data.dlprogram.some(program => {
                        const pageInfo = savePage.find(page => page == program.routerName)
                        if (pageInfo) {
                            this.$store.dispatch('tabInfo/reMoveSavePage', pageInfo)
                            return true
                        }
                    })
                    if (fetchable) {
                        this.getGridData()
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    async mounted () {
        await this.getCategoryData()
        this.default.siteMstrId = this.$store.getters['auth/getSiteMstrId']

        this.$nextTick(() => {
            this.initializeGrid ()
            // this.getApprovalOption()
        })

        this.mounted = true
    },
    beforeDestroy () {
        if(this.grid.grid) this.grid.grid.dispose()
        // loader.removeSheet(this.grid.grid.id)
    },
    methods: {
        initializeGrid () {
            this.grid =  {
                grid: null,
                data: [],
                options: {},
                focus: {
                    row: null,
                    col: null
                }
            }

            this.grid.options = Material3.options

            // console.log(this.grid.options)
            this.setCategoryList({
                main: this.grid.options.Cols[1],
                mid: this.grid.options.Cols[2],
            })

            this.grid.options.Events = {
                onAfterClick: this.clickGrid,
                onRenderFirstFinish: () => {
                    this.getGridData()
                },
            }

            loader.createSheet({
                el: 'MaterialSiteSetUpsheet',
                data: this.grid.data,
                options: this.grid.options
            }).then(sheet => {
                this.grid.grid = sheet

                // this.getGridData()
            })

        },
        async getCategoryData () {
            const response = await API.material.getCategoryData()
            if (response.status === 200 && response.data) {
                // // temporary
                this.categoryData = response.data.list
                
            }
        },
        async getGridData (param) {
            // console.log('getGridData')

            const payload = {
                siteMasterId : this.$cookies.get('siteMstrId'),
                ...param
            }

            const response = await API.material.getSiteDetailList(payload)

            if(response.status === 200 && response.data) {
                this.grid.data = response.data.data

                this.grid.data.forEach(item => {
                    
                    item.acceptCheckListYn  = item.acceptCheckListCount == 0 ? (this.userWritable ? '0' : null) : '1'
                    item.factoryCheckListYn = item.factoryCheckListCount == 0 ? (this.userWritable ? '0' : null) : '1'

                    // 내부 checklist 갯수에서 개정차수 기준으로 변경
                    // item.acceptCheckListYn = item.acceptCheckNumber === 0 ? (this.userWritable ? '0' : null) : '1'
                    // item.factoryCheckListYn = item.factoryCheckNumber === 0 ? (this.userWritable ? '0' : null) : '1'

                    // dbcheckList
                    // item.acceptCheckListYn = item.acceptCheckYn
                    // item.factoryCheckListYn = item.factoryCheckYn
                })

                this.grid.grid.loadSearchData({
                    data: this.grid.data,
                    append: false
                })
            }

            // console.log(response)
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
            options.categoryData.forEach(item => {
                options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${item[options.innerObjectKey].map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
                options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${item[options.innerObjectKey].map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
            })
        },
        changedTabCheckedList (item) {
            this.search.tab.data = item
            // event
        },
        searchCategory (item) {
            this.search.box = item
            // console.log(item)
            this.getGridData(this.search.box)

        },
        clickSave () {
            // console.log('click save')
            // validate

            switch(this.tab.current) {
                case 0: {
                    

                    this.saveData()
                    break
                }
                // case 2: {
                //     this.saveApprovalOption()
                //     break
                // }
            }
        },
        async saveData () {
            const changedInfoToJson = this.grid.grid.getSaveJson({
                saveMode: 3
            })

            changedInfoToJson.data.forEach(item => {
                item.status = item.STATUS
                item.siteMasterId = this.default.siteMstrId
            })

            // console.log(changedInfoToJson.data)

            const response = await API.material.setSiteDetailList(changedInfoToJson.data.reverse())

            // console.log(response)
            if (response.status === 200) {
                // this.openPopup('saveSuccessed')
                this.alert('저장되었습니다.')
            } else {
                // this.openPopup('saveFailed')
                this.alert('저장에 실패했습니다.')
            }
        },
        clickGrid (event) {
            
            switch(event.col) {
                case this.grid.options.Cols[8].Name : {
                    // console.log(this.grid.options.Cols[8].Name)
                    if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                        const mainCodeObject = this.categoryData.find(item => item.mainCodeId === event.row.mainCodeId)
    
                        const rowData = {
                            materialProjectDetailId: event.row.materialProjectDetailId,
                            materialSiteDetailId: event.row.materialSiteDetailId,
                            acceptCheckNumber: event.row.acceptCheckNumber,
                            factoryCheckNumber: event.row.factoryCheckNumber,
                            productName: event.row.productName,
                            inDttm: event.row.inDttm,
                            raFlag: event.row.raFlag,
                            
                        }
    
                        this.$store.dispatch('quality/setMaterialSiteCheckList', {
                            pageType: 'site',
                            checkType: 'accept',
                            mainName: mainCodeObject.mainName,
                            midName: mainCodeObject.midCodeList.find(item => item.midCodeId === event.row.midCodeId).midName,
                            // row: event.row,
                            row: rowData,
                        })
    
                        this.$router.push({
                            name: 'MaterialSiteCheckListView'
                        })
                    }

                    break
                }
                case this.grid.options.Cols[10].Name : {
                    // console.log(this.grid.options.Cols[10].Name)

                    if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                        const mainCodeObject = this.categoryData.find(item => item.mainCodeId === event.row.mainCodeId)
    
                        const rowData = {
                            materialProjectDetailId: event.row.materialProjectDetailId,
                            materialSiteDetailId: event.row.materialSiteDetailId,
                            acceptCheckNumber: event.row.acceptCheckNumber,
                            factoryCheckNumber: event.row.factoryCheckNumber,
                            productName: event.row.productName,
                            inDttm: event.row.inDttm,
                            raFlag: event.row.raFlag,
                        }
    
                        this.$store.dispatch('quality/setMaterialSiteCheckList', {
                            pageType: 'site',
                            checkType: 'factory',
                            mainName: mainCodeObject.mainName,
                            midName: mainCodeObject.midCodeList.find(item => item.midCodeId === event.row.midCodeId).midName,
                            // row: event.row,
                            row: rowData,
                        })
    
                        this.$router.push({
                            name: 'MaterialSiteCheckListView'
                        })
                    }

                    break
                }
            }
        },
        toHtml(string) {
            return string.split('\n').join('<br>')
        },

        fn_exportExcel: function () {
            this.excelDownload.options   = {
                Cfg: this.grid.options.Cfg,
                Cols: this.grid.options.Cols.filter((item) => !['isChecked', 'acceptCheckListYn', 'acceptCheckNumber', 'factoryCheckListYn', 'factoryCheckNumber'].includes(item.Name))
            }
            this.excelDownload.downloadOption = {
                checkBoxOnValue:    'Y',
                checkBoxOffValue:   'N',
            }
            this.excelDownload.fileName  = `현장자재분류체계_${this.$moment().format('YYYYMMDD')}.xlsx`
            this.excelDownload.data      = this.grid.data
            this.excelDownload.request  = true
        }
        
    },
    data () {
        return {
            grid: {
                grid: null,
                data: [],
                options: {},
                focus: {
                    row: null,
                    col: null
                }
            },
            tab: {
                current: 0,
                list: ['자재분류체계 및 Check List 등록', 'Numbering', '결재 옵션'],  // tab name
                innerCurrent: 0,
                innerList: [
                    // '자재공급원 승인(요청)',
                    // '자재공급원 승인(통보)',
                    // '인수검사',
                    // '공장검사'
                    {
                        key: 'MREQ',
                        value: '자재공급원 승인(요청)',
                    },
                    {
                        key: 'MRES',
                        value: '자재공급원 승인(통보)',
                        useSameAsRequest: true
                    },
                    {
                        key: 'TSAC',
                        value: '인수검사',

                    },
                    {
                        key: 'TSFC',
                        value: '공장검사'
                    },
                ],
            },
            
            mounted: false,
            categoryData: [],
            search: {
                tab: {
                    useCheckBox: false,
                    data: null
                },
                box: {}
            },

            popup: {
                efId: 'materialSiteSetUpAlert',
                title: '',
                isShow: false,
                message: '',
                useCancelButton: false,
                buttonName: {},
                purpose: ''
            },

            default: {
                siteMasterId: '',
                
            },

            /** excel */
            excelDownload: {
                request: false,
                fileName: '',
                options: {},
                data: [],
                downloadOption: {}
            },
        }
    }
}
</script>
