<template>
    <b-modal
        :id="id"
        :title="title"
        size="lg"
        hide-backdrop
        fotter-bg-variant="transparent"
        @shown="initializeGrid"
    >
        <template #default>
            <div class="pop_container">
                <search-category-box
                    :category-data="categoryData"
                    @search-category="searchCategory"
                    tight
                />
                <div class="ib_wrap">
                    <div 
                        :id="id+'_sheet'" 
                        class="ibsheet_table"
                        style="max-height: 327px;"
                    ></div>
                </div>
            </div>

        </template>
        <template #modal-footer="{ hide }">
            <b-button
                class="btn btn_md btn_outline btn_darkgray"
                @click="saveData"
            >
                선택
            </b-button>
            <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="hide('forget')"
            >
                취소
            </b-button>
            
        </template>

    </b-modal>
</template>

<script>
import SearchCategoryBox from '@material/component/SearchCategoryBox.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import API from '@/apis/'

import { ProductSelect } from '@/pages/common/data/PopupList'
import loader from '@ibsheet/loader'

export default {
    name: 'NewMaterialMapping',
    mixins: [MsgBoxMixins],
    props: {
        id: {
            type: String,
            default: 'popNewMaterial'
        },
        title: {
            type: String,
            default: '기존 자재 매핑'
        },
        categoryData: {
            type: Array,
            default: () =>{
                return []
            }
        },
        mappingData: {
            type: Array,
            default: () => {
                return []
            }
        }

    },
    components: {
        SearchCategoryBox,
    },
    watch: {

    },
    mounted () {

    },
    beforeDestroy () {
        if(this.dataSheet.sheet) this.dataSheet.sheet.dispose()
    },
    methods: {
        searchCategory (item) {
            // this.search = item
            this.getGridData(item)
        },
        setCategoryList (payload) {
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

        initializeGrid () {

            this.dataSheet.options = ProductSelect.options

            this.dataSheet.options.Cfg = {
                NoVScroll: false,
                CanEdit: 0,
            }
            this.dataSheet.options.Events = {
                onDblClick: this.saveData
            }

            this.setCategoryList({
                main: this.dataSheet.options.Cols[0],
                mid: this.dataSheet.options.Cols[1],
            })

            loader.createSheet({
                el: this.id + '_sheet',
                options: this.dataSheet.options,
                data: [],
            }).then(async sheet => {
                this.dataSheet.sheet = sheet

                await this.getGridData()
            })
        },
        async getGridData (param) {
            const payload = {
                ...param
            }

            await API.material.getProjectDetailList(payload)
                .then(response => {
                    if(response.status === 200 && response?.data) {
                        this.dataSheet.sheet.loadSearchData({
                            data: response.data.data,
                            append: false,
                        })
                    } else {
                        throw new Error('new get Data')
                    }
                })  
                .catch(error => {
                    console.error(error)
                    
                })

        },

        async saveData () {
            const focusedRow = this.dataSheet.sheet.getFocusedRow()

            if(!focusedRow) {
                this.alert('자재를 선택해주세요')
                return
            }

            const payload = {
                mtrlNewDtlIds: this.mappingData,
                mtrlPrjtDtlId: focusedRow.materialProjectDetailId
            }

            await API.material.mapNewProductList(payload)
                .then(response => {
                    // console.log(response)

                    if (response.status === 200) {
                        // alert and closeModal
                        this.alert('기존자재에 매핑되었습니다.')
                        this.$emit('callback')
                        this.$bvModal.hide(this.id)
                    } else {
                        throw new Error('mapData')
                    }
                }).catch(error => {
                    console.error(error)

                    this.alert('기존자재 매핑에 실패했습니다.')
                    // throw new Error(error)
                    
                }) 
        }
    },
    data () {
        return {
            // search: {
            //     productName: '',
            //     mainCodeId: '',
            //     midCodeId: ''
            // },
            dataSheet: {
                sheet: null,
                options: {},
                data: []
            },
        }
    }



}

</script>
