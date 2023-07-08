<template>
    <section id="product-select-modal">
        <b-modal
            :ref="refId"
            :id="id"
            :title="'품명 선택/입력'"
            size="lg"
            footer-bg-variant="transparent"
            @shown="initialize"
            @hidden="fn_closeModal"
        >
            <template #default>
                <div class="pop_container">
                    <search-category-box
                        :category-data="categoryData"
                        tight
                        @search-category="searchCategory"
                    />

                    <div class="ib_wrap">
                        <div id="existSheet" class="ibsheet_table" style="height:250px;" />
                    </div>

                    <div class="button_box">
                        <label for="newMaterial" class="input_check">
                            <input id="newMaterial" type="checkbox" v-model="useNewable" @change="fn_changeNewable">
                            <span class="label_text">신규 자재로 등록</span>
                        </label>
                    </div>

                    <div class="ib_wrap">
                        <div id="newSheet" class="ibsheet_table" />
                    </div>

                </div>
            </template>

            <template #modal-footer="{ hide }">
                <b-button 
                    class="btn btn_md btn_outline btn_darkgray"
                    @click="clickInput"
                >
                    <!-- :disabled="" -->
                    입력
                </b-button>
                <b-button 
                    class="btn btn_md btn_outline btn_gray"
                    @click="hide('forget')"
                >
                    취소
                </b-button>

            </template>

            
        </b-modal>

        <wrapped-alert
            refs="alertPopup"
            :ref-id="'alertPopup'"
            :is-show.sync="popup.isShow"
            :message="popup.message"
            @click-confirm="popup.isShow = !popup.isShow"
        />


    </section>
</template>

<script>
import { ProductSelect } from '@/pages/common/data/PopupList'
import SearchCategoryBox from './SearchCategoryBox.vue'
import WrappedAlert from './WrappedAlert.vue'

import API from '@/apis/'

// import API from '@/pages/quality/materialMngt/apis/material'
import loader from '@ibsheet/loader'
import _ from 'lodash'


export default {
    name: 'productSelectModal',
    components: {
        SearchCategoryBox,
        WrappedAlert,
    },
    props: {
        id: {
            type: String,
            default: 'productSelectModal'
        },
        refId: {
            type: String,
            default: 'productSelectModal'
        },
        
        newPrdtYn: {
            type: String,
            default: 'N'
        },
        mainCodeId: {
            type: String,
            default: ''
        },
        midCodeId: {
            type: String,
            default: ''
        },
        productName: {
            type: String,
            default: ''
        },

        
    },
    watch: {
        useNewable: {
            handler (newValue) {
                this.grid.new.sheet.setAttribute(this.grid.new.sheet.getFirstRow(), null, 'CanEdit', newValue ? '1' : '0', 1)
                if (newValue) {
                    this.grid.exist.sheet.blur()
                } 
            }
        }
    },
    computed: {
        
    },
    beforeDestroy () {
        if (this.grid.exist.sheet) this.grid.exist.sheet.dispose()
        if (this.grid.new.sheet) this.grid.new.sheet.dispose()

    },
    methods: {
        async initialize () {
            this.useNewable = this.newPrdtYn === 'N' ? false : true

            if(this.categoryData.length === 0) {
                await this.getCategoryData()
            }

            this.grid.options = {
                ...this.grid.options,
                ...ProductSelect.options
            }
            
            this.setCategoryList({
                main: this.grid.options.Cols[0],
                mid: this.grid.options.Cols[1]
            })

            const existOptions = _.cloneDeep(this.grid.options)
            existOptions.Cfg.CanEdit = 3
            existOptions.Cfg.NoDataMessage = 3
            existOptions.Cfg.NoVScroll = false

            existOptions.Events = {
                onDblclick: this.onDoubleClick,
                onRenderFinish: this.onRenderFinish,
                onRenderFirstFinish: () => {
                    this.getGridData()
                }
            }

            loader.createSheet({
                el: 'existSheet',
                data: [],
                options: existOptions
            }).then(sheet => {
                this.grid.exist.sheet = sheet

                // await this.getGridData()
            })

            // this.grid.options.Cfg.CanEdit = 0

            const newOptions = _.cloneDeep(this.grid.options)
            newOptions.Cfg.CanSort = 0

            const newSheetData = this.newPrdtYn === 'N' ? {} : {
                mainCodeId: this.mainCodeId,
                midCodeId: this.midCodeId,
                productName: this.productName
            }

            loader.createSheet({
                el: 'newSheet',
                data: [newSheetData],
                options: newOptions,
            }).then(async sheet => {
                this.grid.new.sheet = sheet

                // this.grid.new.sheet.disable(true)
                if (this.newPrdtYn === 'N') {
                    this.grid.new.sheet.setAttribute(this.grid.new.sheet.getFirstRow(), null, 'CanEdit', 0, 1)
                }
            })

        },
        fn_closeModal: function () {
            if (this.grid.exist.sheet) this.grid.exist.sheet.dispose()
            if (this.grid.new.sheet) this.grid.new.sheet.dispose()
        },

        async getCategoryData () {
            try {
                const response = await API.material.getCategoryData()
                if (response.status === 200 && response?.data) {
                    this.categoryData = response.data.list
                }
            } catch(error) {
                console.error('getCategoryData')
            }
        },
        async getGridData (param) {
            try {
                const payload = {
                    ...param
                }

                const response = await API.material.getProjectDetailList(payload)
                if (response.status === 200 && response?.data) {
                    
                    this.grid.exist.sheet.loadSearchData({
                        data: response.data.data,
                        append: false
                    })

                    // if (this.mainCodeId && this.midCodeId && this.productName) {
                    //     this.grid.exist.sheet.getDataRows().some(row => {
                    //         if (row.mainCodeId === this.mainCodeId
                    //             && row.midCodeId === this.midCodeId
                    //             && row.productName === this.productName) {
                    //                 console.log(row)
                    //             this.grid.exist.sheet.focus(row)
                    //             return true
                    //         }
                    //     })
                    // }

                }
            } catch (error) {
                console.error('getGridData')
            }
        },
        searchCategory (item) {
            this.getGridData(item)
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
        onDoubleClick () {
            if (this.useNewable) {
                return
            }
            this.clickInput()
        },
        onRenderFinish () {
            if(this.grid.exist.sheet) {
                this.$nextTick(()=> {
                    this.grid.exist.sheet.blur()
                })
            }
        },
        clickInput () {
            let validate = false
            
            // validate

            if (this.useNewable) {
                const row = this.grid.new.sheet.getFirstRow()

                if (!row.mainCodeId || !row.midCodeId || !row.productName) {
                    // console.log('row.mainCodeId')
                    validate = true
                    this.openPopup('신규 자재 정보를 입력해주세요.')
                }

                // 중복체크

                const validateList = ['레미콘', '아스콘']
                
                if (validateList.includes(row.productName?.trim())) {
                    validate = true
                    this.openPopup('레미콘, 아스콘은 등록할 수 없습니다.')
                }


            } else {
                if(!this.grid.exist.sheet.getFocusedRow()) {
                    // console.log('exist.focus')
                    validate = true
                    this.openPopup('자재를 선택해주세요.')
                    
                }
            }
            

            if(!validate) this.selectItem()
        },
        selectItem () {
            const payload = {}

            if ( this.useNewable ) {
                const row = this.grid.new.sheet.getFirstRow()

                // console.log(this.grid.new.sheet.getDataRows()[0])

                // console.log(row.productName)

                payload.mainCodeId = row.mainCodeId
                payload.midCodeId = row.midCodeId
                payload.productName = row.productName
                payload.mtrlPrjtDtlId = row.materialProjectDetailId
                
            } else {
                this.grid.exist.focus = this.grid.exist.sheet.getFocusedRow()
    
                payload.mainCodeId = this.grid.exist.focus.mainCodeId,
                payload.midCodeId = this.grid.exist.focus.midCodeId,
                payload.productName = this.grid.exist.focus.productName
                payload.mtrlPrjtDtlId = this.grid.exist.focus.materialProjectDetailId
    
            }

            payload.mainName = this.categoryData.filter(item => item.mainCodeId === payload.mainCodeId)[0].mainName
            payload.mainCode = this.categoryData.filter(item => item.mainCodeId === payload.mainCodeId)[0].mainCode
            payload.midName = this.categoryData.filter(item => item.mainCodeId === payload.mainCodeId)[0].midCodeList.filter(item => item.midCodeId === payload.midCodeId)[0].midName
            payload.midCode = this.categoryData.filter(item => item.mainCodeId === payload.mainCodeId)[0].midCodeList.filter(item => item.midCodeId === payload.midCodeId)[0].midCode
            payload.newPrdtYn = this.useNewable ? 'Y' : 'N'
            
            this.$emit('selected', payload)
            this.$refs[this.refId].hide()
        },
        openPopup (message) {
            this.popup.message = message
            this.popup.isShow = true
        },
        fn_changeNewable: function () {
            if (!this.useNewable) {
                const row = this.grid.new.sheet.getDataRows()[0]
                row.mainCodeId  = ''
                row.midCodeId   = ''
                row.productName = '' 
                this.grid.new.sheet.refreshRow(row)
            }
        }
        
    },
    data () {
        return {
            categoryData: [],

            grid: {
                options: {
                    Cfg: {}
                },

                exist: {
                    sheet: null,
                    data: [],
                    focus: {},
                },
                new: {
                    sheet: null,
                    row: {}
                },

            },

            useNewable: false,
            popup: {
                message: '',
                isShow: false
            }

        }
    }
}

</script>
