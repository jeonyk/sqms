<template>
    <section class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li
                    v-for="(item, index) in tab.list"
                    :class="{active: tab.current === index}"
                    :key="item"
                >
                    <a @click="tab.current = index">
                        {{ item }}
                    </a>
                </li>
            </ul>
        </div>

        <div  class="tab_area submenu_on">
            <search-category-box
                v-show="tab.current === 0"
                ref-id="MaterialHeadSetUpsheet_CategoryBox_MY"
                :category-data="advancedInfo.categoryData"
                @search-category="fn_changeSearchBox"
            />
            <search-category-box
                v-show="tab.current === 1"
                ref-id="MaterialHeadSetUpsheet_CategoryBox_ALL"
                :category-data="advancedInfo.categoryData"
                @search-category="fn_changeSearchBox"
            />
            <tree-category-tab
                v-show="tab.current === 0"
                ref-id="MaterialHeadSetUpsheet_TreeCategoryTab_MY"
                :category-data="advancedInfo.categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="fn_changeSearchTab"
            />
            <tree-category-tab
                v-show="tab.current === 1"
                ref-id="MaterialHeadSetUpsheet_TreeCategoryTab_ALL"
                :category-data="advancedInfo.categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="fn_changeSearchTab"
            />
            
            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <button
                            v-if="tab.current === 0"
                            type="button"
                            class="btn btn_sm btn_excel"
                            @click="$bvModal.show('MaterialHeadSetUpsheet_ExcelUploadModal')"
                        >
                            엑셀 업로드
                        </button>
                        <button
                            type="button"
                            class="btn btn_sm btn_excel"
                            @click="fn_exportExcel"
                        >
                            엑셀 다운로드
                        </button>
                        <!--
                        <button
                            v-if="tab.current === 0"
                            type="button"
                            class="btn btn_sm btn_excel"
                            @click="$bvModal.show('MaterialProjectCheckListView_ExcelUploadModal2')"
                        >
                            엑셀 업로드(체크박스)
                        </button>
                        -->
                        <div class="fr">
                            <button
                                v-if="tab.current === 0 && userWritable"
                                type="button"
                                class="btn btn_sm btn_darkgray"
                                @click="fn_clickCopy"
                            >
                                행 복사
                            </button>

                            <div 
                                v-if="tab.current === 0 && userWritable"
                                class="btn_number"
                            >
                                <select
                                    v-model="data.classfication.addRowsCount"
                                    class="form_control num"
                                >
                                    <option
                                        v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                        :key="count"
                                        :value="count"
                                    >
                                        <!-- {{ String(count).padStart(3, '0') }} -->
                                        {{ String(count) }}
                                    </option>    
                                </select>
                                <button
                                    type="button"
                                    class="btn btn_sm"
                                    @click="fn_clickAdd"
                                >
                                    행 추가
                                </button>
                            </div>
                            
                            <button
                                v-if="tab.current === 1 && userWritable"
                                type="button"
                                class="btn btn_sm btn_darkblue"
                                @click="fn_clickNewMap"
                            >
                                기존 자재 매핑
                            </button>

                            <button
                                v-if="tab.current === 1 && userWritable"
                                type="button"
                                class="btn btn_sm btn_darkblue"
                                @click="fn_clickNewAdd"
                            >
                                자재분류체계 추가
                            </button>

                            <button 
                                v-if="userUnusable"
                                type="button" 
                                class="btn btn_sm btn_darkgray"
                                @click="fn_clickDelete"
                            >
                                행 삭제
                            </button>
                            <button 
                                v-if="tab.current === 0 && userWritable"
                                type="button" 
                                class="btn btn_sm btn_darkblue"
                                @click="fn_clcikSave"
                            >
                                {{'저장'}}
                            </button>
                        </div>
                    </div>

                    <!-- <div class="ib_wrap" :style="{height: `calc(100vh - 310px)`}">
                        <div id="materialHeadSetUpSheet" class="ibsheet_table" style="height: 100%;"></div>
                    </div> -->

                    <div v-show="tab.current === 0" class="ib_wrap" :style="{height: `calc(100vh - 310px)`}">
                        <div id="MaterialHeadSetUpSheet_classification" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                    <div v-show="tab.current === 1" class="ib_wrap" :style="{height: `calc(100vh - 310px)`}">
                        <div id="MaterialHeadSetUpSheet_newProduct" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>

        </div>


        <new-material-mapping
            id="newMaterialMapping"
            :category-data="advancedInfo.categoryData"
            :mapping-data="data.newProduct.mapping"
            @callback="fn_fetchData(search.box1, 1)"
        />
        <excel-upload-modal
            ref-id="MaterialHeadSetUpsheet_ExcelUploadModal"
            mode="SHEET"
            fileType="MTRL"
            columnLength="7"
            @import="fn_importExcel"
        />
        <excel-upload-modal
            ref-id="MaterialProjectCheckListView_ExcelUploadModal2"
            mode="CHECK"
            fileType="ACCP"
            columnLength="0"
            @import="fn_importExcel"
        />

        <excel-download
            v-model="excelDownload.request"
            ref-id="MaterialProjectCheckListView_ExcelDownload"
            :file-name="excelDownload.fileName"
            :download-option="excelDownload.downloadOption"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </section>
</template>

<script>
import SearchCategoryBox from "@/pages/quality/materialMngt/component/SearchCategoryBox"
import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"

import ExcelUploadModal from '@modal/common/ExcelUploadModal.vue'
import ExcelDownload from '@component/common/ExcelDownload.vue'
import NewMaterialMapping from "@material/component/NewMaterialMapping"
import { Material, Material2 } from '@/pages/common/data/MaterialsList'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

import loader from '@ibsheet/loader'
// import _ from 'lodash'

// import API from '@/apis/'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'MaterialHeadSetUpsheet',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        TreeCategoryTab,
        SearchCategoryBox,
        NewMaterialMapping,
        ExcelUploadModal,
        ExcelDownload,
        Breadcrumb,
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
    mounted () {
        this.$nextTick(() => {
            this.fn_fetchAdvancedInfo()
        })
    },
    beforeDestroy () {

        if (this.data.classfication.sheet)  this.data.classfication.sheet.dispose()
        if (this.data.newProduct.sheet)     this.data.newProduct.sheet.dispose()

    },
    methods: {

        /** common */
        fn_fetchAdvancedInfo: function () {
            
            const url = '/sendApi/api/quality/materialMngt/codeCategory/list'
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.all([
                    axios.post(url, {}, options),
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.categoryData      = response[0].data.list
                }))
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    this.fn_createSheet()
                })
        },
        fn_setEnumCategory: function (payload) {
            const options = {
                categoryData:   this.advancedInfo.categoryData,
                key:            'CodeId',
                value:          'Name',
                seperator:      '|',
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
        fn_createSheet: function () {
            this.data.classfication.options = Material.options
            this.fn_setEnumCategory({
                main: this.data.classfication.options.Cols[1],
                mid: this.data.classfication.options.Cols[2],
                categoryData: this.advancedInfo.categoryData,
            })
            this.data.classfication.options.Events = {
                onAfterClick: (event) => {
                    switch(event.col) {
                        case 'acceptCheckListYn': {
                            if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                                const mainCode = this.advancedInfo.categoryData.find(item => item.mainCodeId === event.row.mainCodeId)

                                this.$store.dispatch('quality/setMaterialProjectCheckList', {
                                    pageType:   'project',
                                    checkType:  'accept',
                                    mainName:   mainCode.mainName,
                                    midName:    mainCode.midCodeList.find(item => item.midCodeId === event.row.midCodeId).midName,
                                    row:        {
                                                    materialProjectDetailId: event.row.materialProjectDetailId,
                                                    materialSiteDetailId:   event.row.materialSiteDetailId,
                                                    acceptCheckNumber:      event.row.acceptCheckNumber,
                                                    factoryCheckNumber:     event.row.factoryCheckNumber,
                                                    productName:            event.row.productName,
                                                    inDttm:                 event.row.inDttm,
                                                    raFlag:                 event.row.raFlag,
                                                },

                                })

                                this.$router.push({name: 'MaterialProjectCheckListView' })
                            }
                            break
                        }
                        case 'factoryCheckListYn': {
                            if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                                const mainCode = this.advancedInfo.categoryData.find(item => item.mainCodeId === event.row.mainCodeId)

                                this.$store.dispatch('quality/setMaterialProjectCheckList', {
                                    pageType:   'project',
                                    checkType:  'factory',
                                    mainName:   mainCode.mainName,
                                    midName:    mainCode.midCodeList.find(item => item.midCodeId === event.row.midCodeId).midName,
                                    row:        {
                                                    materialProjectDetailId: event.row.materialProjectDetailId,
                                                    materialSiteDetailId:   event.row.materialSiteDetailId,
                                                    acceptCheckNumber:      event.row.acceptCheckNumber,
                                                    factoryCheckNumber:     event.row.factoryCheckNumber,
                                                    productName:            event.row.productName,
                                                    inDttm:                 event.row.inDttm,
                                                    raFlag:                 event.row.raFlag,
                                                },

                                })

                                this.$router.push({name: 'MaterialProjectCheckListView' })
                            }
                            break
                        }
                    }
                },
                onAfterChange: event => {
                    switch(event.col) {
                        case 'mainCodeId': {
                            // event.sheet.setValue(event.row, event.col, '')
                            const duplicated = event.sheet.getRowsByDup('mainCodeId,midCodeId,productName', false, false, false, 'Deleted')
                            if (duplicated.length > 0) {
                                this.alert('중복된 자재가 있습니다.')
                                event.sheet.setValue(event.row, event.col, this.data.classfication.oldval)
                            }
                            break
                        }
                        case 'midCodeId':
                        case 'productName': {
                            const duplicated = event.sheet.getRowsByDup('mainCodeId,midCodeId,productName', false, false, false, 'Deleted')
                            if (duplicated.length > 0) {
                                this.alert('중복된 자재가 있습니다.')
                                event.sheet.setValue(event.row, event.col, this.data.classfication.oldval)
                            }
                            break
                        }   
                    }
                },
                onBeforeChange: event => {
                    switch(event.col) {
                        case 'mainCodeId':
                        case 'midCodeId':
                        case 'productName': {
                            this.data.classfication.oldval = event.oldval
                            break
                        }
                    }
                    return null
                },
                onAfterRowDelete: event => {
                    event.sheet.hideRow(event.row)
                },
                onAfterRowCopy: event => {
                    event.sheet.setCheck(event.row, 'isChecked', false)
                    event.sheet.setValue(event.row, 'materialProjectDetailId', '')
                },
                onRenderFirstFinish: () => {
                    this.fn_fetchData({}, 0)
                },
                onRenderFinish: event => {
                    if (this.userWritable) {

                        this.remicons.forEach(key => {
                            const row = event.sheet.findText('raFlag', String(key))
                            if(row) {
                                event.sheet.setAttribute(row, 'productName', 'CanEdit', 2)
                                event.sheet.setAttribute(row, 'isChecked', 'CanEdit', 0)
                                event.sheet.setAttribute(row, 'mainCodeId', 'CanEdit', 0)
                                event.sheet.setAttribute(row, 'midCodeId', 'CanEdit', 0)
                            }
                        })
                        
                    } else {
                        event.sheet.getDataRows().forEach(row => {
                            event.sheet.setAttribute(row, null, 'CanEdit', false)
                        })
                    }
                }
            }

            loader.createSheet({
                el:     'MaterialHeadSetUpSheet_classification',
                data:   this.data.classfication.data,
                options:this.data.classfication.options,
            }).then(sheet => {
                this.data.classfication.sheet = sheet
            })


            this.data.newProduct.options = Material2.options
            this.fn_setEnumCategory({
                main: this.data.newProduct.options.Cols[2],
                mid: this.data.newProduct.options.Cols[3],
                categoryData: this.advancedInfo.categoryData,
            })
            this.data.newProduct.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchData({}, 1)
                }
            }

            loader.createSheet({
                el:     'MaterialHeadSetUpSheet_newProduct',
                data:   this.data.newProduct.data,
                options:this.data.newProduct.options,
            }).then(sheet => {
                this.data.newProduct.sheet = sheet
            })
        },
        fn_fetchData: function (_param, tabIdx = this.tab.current) {
         
            const url   = tabIdx === 0
                            ? '/sendApi/api/quality/materialMngt/projectDetail/list' 
                            : '/sendApi/api/quality/materialMngt/materialNewProduct/list'
            const payload = {
                ..._param
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
                    if (response.status === 200) {
                        if (tabIdx === 0) {
                            this.data.classfication.data = response.data.data

                            this.data.classfication.data.forEach(item => {
                                item.acceptCheckListYn  = item.acceptCheckListCount > 0     ? '1' : (this.userWritable ? '0' : null)
                                item.factoryCheckListYn = item.factoryCheckListCount > 0    ? '1' : (this.userWritable ? '0' : null)
                            })

                            if (this.data.classfication.sheet) {
                                this.data.classfication.sheet.loadSearchData({
                                    data: this.data.classfication.data
                                })
                            }

                        } else {
                            this.data.newProduct.data = response.data.data

                            if (this.data.newProduct.sheet) {
                                this.data.newProduct.sheet.loadSearchData({
                                    data: this.data.newProduct.data
                                })
                            }
                        }
                    } else {
                        throw new Error('MHSS > fn_fetchData')
                    }
                })
                .catch(() => {
                    this.alert('조회 실패했습니다.')
                })
        },


        /** tab.current === 0 (classification) */
        fn_clickCopy: function () {
            const checked = this.data.classfication.sheet.getRowsByChecked('isChecked')
            if (checked.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }

            this.data.classfication.sheet.copyRows(checked, checked[0].nextSibling)
        },
        fn_clickAdd: function () {
            const checked = this.data.classfication.sheet.getRowsByChecked('isChecked')
            if (checked.length === 0) {
                this.data.classfication.sheet.addRows({
                    count:  this.data.classfication.addRowsCount,
                    next:   this.data.classfication.sheet.getFirstRow()
                })
            } else {
                this.data.classfication.sheet.addRows({
                    count:  this.data.classfication.addRowsCount,
                    next:   checked[0].nextSibling
                })
            }
        },
        fn_clickDelete: function () {
            switch(this.tab.current) {
                case 0: {
                    const checked = this.data.classfication.sheet.getRowsByChecked('isChecked')
                    if (checked.length === 0) {
                        this.alert('선택된 행이 없습니다.')
                        return 
                    }
                    this.data.classfication.sheet.deleteRows(checked)
                    break
                }
                case 1: {
                    this.fn_clickNewDelete()
                    break
                }
            }
        },
        fn_clcikSave: function () {

            const isChanged         = this.data.classfication.sheet.hasChangedData()
            if (!isChanged) {
                this.alert('수정된 내역이 없습니다.')
                return 
            }

            // validation set
            const hasEmptyString    = this.data.classfication.sheet
                                        .getDataRows()
                                        .filter(row => !row.Deleted)
                                        .some(row => {
                                                if (row.mainCodeId === '') {
                                                    this.alert('공종을 입력해야합니다.')
                                                    return true
                                                }
                                                if (row.midCodeId === '') {
                                                    this.alert('세부공종을 입력해야합니다.')
                                                    return true
                                                }
                                                if (row.productName === '') {
                                                    this.alert('품명을 입력해야합니다.')
                                                    return true
                                                }
                                            })
            if(hasEmptyString) return  
            
            const duplicated        = this.data.classfication.sheet.getRowsByDup('mainCodeId,midCodeId,productName', false, false, false, 'Deleted')
            if (duplicated.length > 0) {
                this.alert('이미 등록된 품명입니다.')
                return
            }

            this.confirm('저장 하시겠습니까?', ()=> {
                this.fn_setSave()
            })
        },
        fn_setSave: function () {

            const url       = '/sendApi/api/quality/materialMngt/projectDetail/change'
            const payload   = this.data.classfication.sheet
                                .getSaveJson({ saveMode: 3 })
                                .data
                                .map(row => {
                                    row.status = row.STATUS
                                    return row
                                })
                                .reverse()
            const options   = {
                                headers: {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Content-Type': 'application/json',
                                    'Accept-Language': 'ko'
                                }
                            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200 && response.data?.count > 0) {
                        this.alert('저장되었습니다.', () => {
                            this.fn_fetchData({}, 0)
                        })
                    } else {
                        throw new Error('MHSS > fn_setSave')
                    }
                })
                .catch(() => {
                    this.alert('저장에 실패했습니다.')
                })
        },

        /** tab.current === 1 (newProduct) */
        fn_clickNewMap: function () {
            const checked = this.data.newProduct.sheet.getRowsByChecked('isChecked')
            if (checked.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }

            this.confirm('매핑하시겠습니까?', () => {
                this.data.newProduct.mapping = checked.map(row => row.mtrlNewDtlId)
                this.$bvModal.show('newMaterialMapping')
            })

        },
        fn_clickNewAdd: function () {
            const checked = this.data.newProduct.sheet.getRowsByChecked('isChecked')
            if (checked.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }

            this.confirm('추가하시겠습니까?', () => {
                const url       = '/sendApi/api/quality/materialMngt/materialNewProduct/add'
                const payload   = {
                                    mtrlNewDtlId: checked[0].mtrlNewDtlId
                                    }
                const options   = {
                                    headers: {
                                        'Authorization': this.$cookies.get('Authorization'),
                                        'Content-Type': 'application/json',
                                        'Accept-Language': 'ko'
                                    }
                                }
    
                axios.post(url, payload, options)
                    .then(response => {
                        if (response.status === 200 ) {
                            if (response.data.data == '0000') {
                                this.alert('자재분류체계에 추가했습니다.', () => {
                                    this.fn_fetchData({}, 1)
                                })
                            } else if (response.data.data == '9900') {
                                this.alert('동일한 자재가 존재합니다. 확인해주세요.')
                            } else {
                                throw new Error('MHSS > fn_clickNewAdd')
                            }
                        } else {
                            throw new Error('MHSS > fn_clickNewAdd')
                        }
                    })
                    .catch(() => {
                        this.alert('자재분류체계 추가에 실패했습니다.')
                    })
            })

        },
        fn_clickNewDelete: function () {
            const checked = this.data.newProduct.sheet.getRowsByChecked('isChecked')
            if (checked.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }

            const url       = '/sendApi/api/quality/materialMngt/materialNewProduct/unUse'
            const payload   = {
                                mtrlNewDtlIds: checked.map(row => row.mtrlNewDtlId)
                                }
            const options   = {
                                headers: {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Content-Type': 'application/json',
                                    'Accept-Language': 'ko'
                                }
                            }
            
            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200) {
                        this.alert('삭제되었습니다.', () => {
                            this.fn_fetchData({}, 1)
                        })
                    } else {
                        throw new Error('MHSS > fn_clickNewDelete')
                    }
                })
                .catch(() => {
                    this.alert('삭제에 실패했습니다.')
                })
        },



        /** search */
        fn_changeSearchTab: function (item) {
            this.search.tab.data = item
            this.fn_fetchData(this.search.tab.data, this.tab.current)
        },
        fn_changeSearchBox: function (item) {
            this.search[`box${this.tab.current}`] = item
            this.fn_fetchData(this.search[`box${this.tab.current}`],  this.tab.current)
        },

        /** excel upload modal */ 
        fn_importExcel: function (data) {
            this.data.classfication.sheet.loadSearchData({
                data:   data.map(item => {
                                item.Added = 1
                                return item
                            }),
                append: true,
                next:   this.data.classfication.sheet.getFirstRow()
            })
        },
        // fn_exportExcel: function () {
            
        //     this.data[['classfication', 'newProduct'][this.tab.current]].sheet.down2Excel({
        //         merge:              1,                  // 머지된 내용 그대로 출력할 것인지
        //         // downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
        //         downCols:           this.tab.current === 0 
        //                                 ? 'mainCodeId|midCodeId|productName|productMeta|materialMainYn|acceptCheckYn|factoryCheckYn'          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
        //                                 : 'projNm|mainCodeId|midCodeId|prdtNm',
        //         reqHeader:          {
        //                                 'Authorization': this.$cookies.get('Authorization'),
        //                                 'Accept-Language': 'ko'
        //                             },
        //         checkBoxOnValue:    'Y',
        //         checkBoxOffValue:   'N',
        //         fileName:           `${['본사자재분류체계', '신규등록자재'][this.tab.current]}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
        //     })
        // },
        fn_exportExcel: function () {
            this.excelDownload.options   = {
                Cfg: this.data[['classfication', 'newProduct'][this.tab.current]].options.Cfg,
                Cols: this.tab.current === 0 
                    ? this.data.classfication.options.Cols.filter((item) => !['isChecked', 'acceptCheckListYn', 'factoryCheckListYn'].includes(item.Name))
                    : this.data.newProduct.options.Cols.filter((item) => !['isChecked'].includes(item.Name))
            }
            this.excelDownload.downloadOption = {
                checkBoxOnValue:    'Y',
                checkBoxOffValue:   'N',
            }
            this.excelDownload.fileName  = `${['본사자재분류체계', '신규등록자재'][this.tab.current]}_${this.$moment().format('YYYYMMDD')}.xlsx`
            this.excelDownload.data      = this.data[['classfication', 'newProduct'][this.tab.current]].data
            this.excelDownload.request   = true
        },


    },
    data () {
        return {
            advancedInfo: {
                categoryData: [],
            },

            data: {
                classfication: {
                    sheet: null,
                    data: [],
                    options: {},

                    oldval: null,
                    addRowsCount: 1,
                },
                newProduct: {
                    sheet: null,
                    data: [],
                    options: {},

                    mapping: [],
                }
            },

            

            search: {
                tab: {
                    useCheckBox: false,
                    data: null
                },
                box0: {},
                box1: {},
            },

            tab: {
                current: 0,
                list: ['자재분류체계 및 Check List 등록', '신규 등록 자재 (프로젝트별)'] // tab name
            },

            categoryData: [],

            // remicons: [320,370],
            remicons: ['R', 'A'],

            // searchInfo: {
            //     classfication: {

            //     },
            //     newProduct: {

            //     },
            // },

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
