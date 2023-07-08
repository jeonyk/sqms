<template>
    <b-modal id="AddTestInsttPop" :title="popupTitle" hide-backdrop size="lg" :footer-bg-variant="footerBg" @shown="loadPopup">
    <!-- <section class="search-category"> -->
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only" />
                <colgroup>
                    <col width="6%">
                    <col width="24%">
                    <col width="5%">
                    <col width="24%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>시험기관 명</th>
                        <td>
                            <input 
                                v-model="search.agencyName"
                                type="text" 
                                class="form_control size_lg" 
                                placeholder="입력해주세요"
                                @keyup.enter="clickSearch"
                            />
                        </td>                 
                        <th>담당자 명</th>
                        <td>
                            <input 
                                v-model="search.managerName"
                                type="text" 
                                class="form_control size_lg" 
                                placeholder="입력해주세요"
                                @keyup.enter="clickSearch"
                            />
                            <!-- <select
                                v-model="search.managerName"
                                class="form_control size_lg"
                            >
                                <option v-if="categoryData.length === 0" disabled > Empty selected </option>
                                <option v-else :value="''"  > 전체 </option>
                                <option
                                    v-for="category in categoryData"
                                    :key="category.managerName"
                                    :value="category.managerName"
                                >
                                    {{ category.mainName }}
                                </option>
                            </select> -->
                        </td>        
                        <!-- <th>세부 공종</th>
                        <td>
                            <select
                                v-model="search.midCodeId"
                                class="form_control size_lg"
                            >
                                <option v-if="search.managerName === ''" :value="''" > 전체 </option>
                                <option
                                    v-for="category in getMidCategoryList()"
                                    :key="category.midCodeId"
                                    :value="category.midCodeId"
                                >
                                    {{ category.midName }}
                                </option>
                            </select>
                        </td>            -->
                        <td class="ar">
                            <button 
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
    </b-modal>
    <!-- </section> -->
</template>

<script>

export default {
    name: 'SearchCategoryBox',
    props: {
        categoryData: {
            type: Array,
            default: () => {
                return []
            }
        },
    },    
    mounted () {
        
    },
    methods: {
        clickReset () {
            this.search.agencyName = ''
            this.search.managerName = ''
            this.search.midCodeId = ''
        },
        clickSearch () {
            const payload = {
                ...this.search,
                agencyName: this.search.agencyName.trim(),
            }
            
            this.$emit('search-category', payload)
        },
        // getMidCategoryList () {
        //     const selectedCategoryData = this.categoryData.filter(item => item.managerName === this.search.managerName)[0]
        //     return selectedCategoryData ? selectedCategoryData.midCodeList : []
        // }
    },
    data () {
        return {
            search: {
                agencyName: '',
                managerName: ''
            },
        }
    }
}
</script>
