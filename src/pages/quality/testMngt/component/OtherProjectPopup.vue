<template>
    <!-- 타 프로젝트 데이터 가져오기 (품질시험계획서) 팝업 -->
    <b-modal id="OtherProjectData" title="타 프로젝트 데이터 가져오기 (품질시험계획서)" hide-footer
        modal-class="single_page" size="xl"
        :footer-bg-variant="footerBg" @shown="sheetLoad" @hide="removeSheet">
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="lookup_box">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="5%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>   
                                    <td>
                                        <div class="search_area">
                                            <input type="text" class="form_control w100" placeholder="검색" :value="selectedCommonData.projectNm">
                                            <button type="button" class="btn_search" @click="SearchCommonProject">검색</button>
                                        </div>
                                    </td>        
                                    <!-- <td class="ar">
                                        <button type="button" class="btn_reset">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search">검색</button>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="tab_area submenu_on">   
                        <tree-category-tab
                            :category-data="categoryData"
                            :use-check-box="search.tab.useCheckBox"
                            @changed-checked-list="changedTabCheckedList"
                        />
                        <div class="right_content">
                            <div class="inner">
                                <div class="button_box">
                                    <button type="button" class="btn btn_sm btn_excel" @click="importAllItems">전체 가져오기</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" @click="importSelectedItems">선택 가져오기</button>
                                </div>

                                <!-- ibsheet -->
                                <div class="ib_wrap">
                                    <div id="otherProjectTable" class="ibsheet_table"></div>
                                </div>

                                <div class="button_box ac">
                                    <button type="button" class="btn btn_lg btn_outline btn_darkgray"  @click="closePopup">닫기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { TestPlanDetail } from '@/pages/quality/testMngt/data/testData';
import loader from '@ibsheet/loader';
import TreeCategoryTab from "@/pages/quality/testMngt/component/TreeCategoryTab";
import { sendPostApi, requestOptions } from '@/apis/common';

export default {
    name: 'OtherProjectData',
    props: {
        selectedCommonData: {
            type: Object,
        },
    },
    data() {
        return {
            footerBg: 'transparent',
            categoryData: [],
            search: {
                tab: {
                    useCheckBox: false,
                    data: null
                },
                box: {}
            },
            grid: {
                sheetEl: [],
                sheetId: [],
                data: [],
                options: {},
                focus: {
                    row: null,
                    col: null
                },
            },

            // searchKeyword: '',

            selectedItem: {},
        }
    },
    components: {
        TreeCategoryTab,
    },
    destroyed () {
        this.removeSheet();
    },
    methods: {
        sheetLoad() {
            this.getCategoryData();
            this.initializeGrid();
        },
        initializeGrid () { // initialize grid
            this.grid = {
                sheetEl: [],
                sheetId: [],
                data: [],
                options: {},
            };

            this.grid.options = TestPlanDetail.options;
            // this.grid.options.Cfg = {
            //     NoVScroll: 0,
            //     CanEdit: 0,
            // };

            loader.createSheet({
                el: 'otherProjectTable',
                id: 'otherProject',
                data: this.grid.data,
                options: this.grid.options,
            }).then((sheet) => {
                // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
                this.grid.sheetEl['otherProjectSheet'] = sheet;
                // 생성된 시트 id를 pageSheets 배열에 넣어둠
                this.grid.sheetId.push(sheet.id);
                this.grid.sheetEl['otherProjectSheet'].bind('onClick', this.clickSheet);
                this.grid.sheetEl['otherProjectSheet'].bind('onDblClick', this.dbClickSheet);
            });

            this.getGridData();
        },
        async getGridData(param) {  // 타 프로젝트 리스트
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            const url = '/sendApi/api/testMngt/qualityTestActpln/otrPrjctData/list';
            let payload = {
                ...param,
                otrSiteMstrId: this.selectedCommonData.siteMstrId,
                siteMstrId: this.$cookies.get('siteMstrId'),
            }
            
            try {
                const { data } = await sendPostApi(url, payload);
                this.grid.data = data.datas.dlPrjctData;

                this.grid.sheetEl['otherProjectSheet'].loadSearchData({
                    data: this.grid.data,
                    append: false
                });

                this.selectedItem = this.grid.sheetEl['otherProjectSheet'].getFirstRow();
            } catch (error) {
                console.log(error.response.data);
            }
        },
        async getCategoryData () {  // category menu data 생성
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/common/codeCategory/list';
            let param = { codeType: 'TEST' };
            
            try {
                const { data } = await sendPostApi(url, param);
                this.categoryData = data.list;
            } catch (error) {
                console.log(error.response.data)
            }
        },
        changedTabCheckedList(item) {  // category click (selected item)
            // console.log('changedTabCheckedList : ', item);
            this.search.tab.data = item;
            this.getGridData({
                mainCodeId: this.search.tab.data.mainCodeId,
                midCodeId: this.search.tab.data.midCodeId,
            })
        },
        closePopup() {
            this.$root.$emit('bv::hide::modal', 'OtherProjectData');
        },
        removeSheet() {
            // console.log('removeSheet');
            if(this.grid.sheetEl['otherProjectSheet']) {
                this.grid.sheetEl['otherProjectSheet'].dispose();
            }
            
            // for (var i = 0; i < this.grid.sheetId.length; i++) {
            //     loader.removeSheet(this.grid.sheetId[i]);
            // }
            this.grid = null;
        },

        SearchCommonProject() {
            let item = {
                keyword: this.searchKeyword
            };
            this.$emit('searchCommonProject', item);
        },

        clickSheet() {
            // this.selectedItem = evt.row;
        },
        dbClickSheet() {
            // this.selectedItem = evt.row;
            // this.importSelected();
        },

        importAllItems() {   // 전체 가져오기
            let dataItem = this.grid.sheetEl['otherProjectSheet'].getDataRows();
            this.$emit('importAllItems', dataItem);
        },
        importSelectedItems() {  // 선택 가져오기
            // let checkedRows = this.grid.sheetEl['otherProjectSheet'].getRowsByChecked(this.grid.options.Cols[0].Name);
            // if(checkedRows.length === 0) {

            // }
            let dataItem = this.grid.sheetEl['otherProjectSheet'].getSaveJson({saveMode: 3}).data;


            dataItem.forEach((item) => {  // payload 수정
                item.status = item.STATUS;
                item.subCodeId = this.grid.sheetEl['otherProjectSheet'].getRowById(item.id).subCodeId;
                item.midCodeId = this.grid.sheetEl['otherProjectSheet'].getRowById(item.id).midName;
                item.siteTstSbjDtlId = this.grid.sheetEl['otherProjectSheet'].getRowById(item.id).siteTstSbjDtlId;
            });

            this.$emit('importSelectedItems', dataItem);
        }
    },
}
</script>

<style>

</style>