<template>
    <section class="tab_contents">
        <div class="lst_tabs">
            <ul class="">
                <li
                    v-for="(item, index) in tab.list"
                    :class="{active: tab.current === index}"
                    :key="index"
                >
                    <a
                        @click="tab.current = index"
                    >
                        {{ item }}
                    </a>
                </li>
            </ul>
        </div>

        <div class="tab_area submenu_on">
            

            <tree-category-tab
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @change-checked-list="changedTabCheckedList"
            />

            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <div class="fr">
                            <button
                                type="button"
                                class="btn btn_sm btn_darkgray"
                                @click="clickRegister"
                            >
                                신규등록
                            </button>
                            <button
                                type="button"
                                class="btn btn_sm btn_darkgray"
                                @click="clickApproval"
                            >
                                결재상신
                            </button>

                        </div>
                    </div>

                    <div class="ib_wrap">
                        <div id="MeterialSpApprSheet" class="ibsheet_table"></div>
                    </div>
                </div>

            </div>
        </div>

    </section>
</template>

<script>
import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
import API from '@/pages/quality/materialMngt/apis/material'

import { Material6 } from '@/pages/common/data/MaterialsList';

import loader from '@ibsheet/loader'

export default {
    name: 'MaterialSourceApprovalSheet',
    components: {
        TreeCategoryTab,
    },
    watch: {
        
    },
    async mounted () {
        await this.getCategoryData()

        this.initializeGrid()
    },
    beforeDestroy () {
        if(this.grid.grid) this.grid.grid.dispose()
        loader.removeSheet(this.grid.grid.id)
    },
    methods: {
        changedTabCheckedList (item) {
            this.search.tab.data = item
        },
        async getCategoryData () {
            try {
                const response = await API.getCategoryData()

                if(response?.status === 200 && response?.data) {
                    this.categoryData = response.data.list
                }

            } catch (error) {
                console.error('getCategory Error', error)
            }
        },
        async getGridData () {
            // const payload = {
            //     siteMstrId: this.$cookies.get('siteMstrId'),
            //     ...param
            // }

            // try {
            //     // const response = await API.getSourceApprovalList(payload, {
            //     //     headers: {
            //     //         'Authorization': this.$cookies.get("Authorization")
            //     //     }
            //     // })

            // } catch(error) {
            //     console.error('material')
            // }


            

            // console.log(response)
        },
        initializeGrid () {
            this.grid = {
                grid: null,
                data: [],
                options: {},
            }

            switch(this.tab.current)  {
                case 0: {

                    this.grid.options = Material6.options

                    this.grid.options.Events = {
                        onDataLoad: this.gridOnDataLoad
                    }

                    break
                }
                case 1: {

                    break
                }
            }

            loader.createSheet({
                el: 'MeterialSpApprSheet',
                data: this.grid.data,
                options: this.grid.options
            }).then(async sheet => {
                this.grid.grid = sheet   
                
                await this.getGridData()

                this.grid.grid.bind('onDataLoad')
            })
        },
        clickRegister () {
            // console.log('click register')
        },
        clickApproval () {
            // console.log('click approval')
        },
        gridOnDataLoad (event) {
            // const options = {

            //     ...options
            // }

            // console.log('grid binded onDataLoad')

            // console.log(event)


            

            
        }
    },
    data () {
        return {
            grid: {
                grid: null,
                data: [],
                options: {},
            },

            tab: {
                current: 0,
                list: ['My Site', 'All Sites'],
            },
            categoryData: [],
            
            search: {
                tab: {
                    useCheckBox: false,
                    data: null
                },
                box: {}
            },
            
        }
    }
}

</script>