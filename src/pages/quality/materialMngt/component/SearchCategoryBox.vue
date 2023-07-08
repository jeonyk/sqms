<template>
    <!-- <section class="search-category"> -->
        <div :id="refId" class="lookup_box multi_line">
            <table>
                <caption class="sr_only" />
                <colgroup>
                    <col :width="tight? '8%' :'4%'">
                    <col :width="tight? '20%' :'24%'">
                    <col :width="tight? '8%' :'5%'">
                    <col :width="tight? '20%' :'24%'">
                    <col :width="tight? '10%' :'5%'">
                    <col :width="tight? '20%' :'24%'">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>품명</th>
                        <td>
                            <input 
                                v-model="search.productName"
                                type="text" 
                                class="form_control size_lg" 
                                placeholder="입력해주세요"
                                @keyup.enter="clickSearch"
                            />
                        </td>                 
                        <th>공종</th>   
                        <td>
                            <select
                                v-model="search.mainCodeId"
                                class="form_control size_lg"
                            >
                                <!-- <option value="" selected>공종</option> -->
                                <option v-if="categoryData.length === 0" disabled > Empty selected </option>
                                <option v-else :value="''"  > 전체 </option>
                                <option
                                    v-for="category in categoryData"
                                    :key="category.mainCodeId"
                                    :value="category.mainCodeId"
                                >
                                    {{ category.mainName }}
                                </option>
                            </select>
                            </td>        
                        <th>세부 공종</th>
                        <td>
                            <select
                                v-model="search.midCodeId"
                                class="form_control size_lg"
                            >
                                <!-- <option value="" selected>세부 공종</option> -->
                                <!-- <option v-if=" categoryData.filter(item => item.id === search.mainCode).inner.length === 0" disabled > Empty selected </option> -->
                                <option :value="''" > 전체 </option>
                                <option
                                    v-for="category in getMidCategoryList()"
                                    :key="category.midCodeId"
                                    :value="category.midCodeId"
                                >
                                    {{ category.midName }}
                                </option>
                            </select>
                        </td>           
                        <td class="ar">
                            <button
                                v-if="!tight"
                                type="button" 
                                class="btn_reset"
                                @click="clickReset"
                            >
                                초기화
                            </button>
                            <button 
                                type="button" 
                                class="btn btn_sm btn_darkblue btn_radius btn_search"    
                                @click="clickSearch"
                            >
                                검색
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    <!-- </section> -->
</template>

<script>

export default {
    name: 'SearchCategoryBox',
    props: {
        refId: {
            type: String,
            default: 'SearchCategoryBox'
        },
        categoryData: {
            type: Array,
            default: () => {
                return []
            }
        },
        tight: {
            type: Boolean,
            default: false,
        }
    },   
    watch: {
        'search.mainCodeId': {
            handler() {
                this.search.midCodeId = ''
            }
        }
    },
    mounted () {
        
    },
    methods: {
        clickReset () {
            this.search.productName = ''
            this.search.mainCodeId = ''
            this.search.midCodeId = ''
        },
        clickSearch () {
            const payload = {
                ...this.search,
                productName: this.search.productName.trim(),
            }
            
            this.$emit('search-category', payload)
        },
        getMidCategoryList () {
            const selectedCategoryData = this.categoryData.filter(item => item.mainCodeId === this.search.mainCodeId)[0]
            return selectedCategoryData ? selectedCategoryData.midCodeList : []
        }
    },
    data () {
        return {
            search: {
                productName: '',
                mainCodeId: '',
                midCodeId: ''
            },
        }
    }
}
</script>
