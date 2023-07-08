<template>
    <div class="tab_contents">
        <!-- <h2 class="sub_title">검측관리 > 현장 Set-up</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area" v-show="currentTab == 0" v-bind:class="currentTabInner == 2 ? '': 'submenu_on'">
            <tree-category-tab
                refId="itpTreeCategory"
                :category-data="itpCategoryData"
                :use-check-box="false"
                @changed-checked-list="changedITPTabCheckedList"
                :currentTab="currentTab"
            />
            <div class="right_content">
                <div class="lst_tabs_in">
                    <ul>
                        <li v-for="(tab, index) in tabsInner" v-bind:class="{active:currentTabInner===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTabInner=index">{{tab}}</a></li>
                    </ul>
                </div>
                <div class="tab_area_in" v-if="currentTabInner == 0">
                    <ItpSelect :main-id="itpMainCodeId" :mid-id="itpMidCodeId" :rev-id="revisionId" :user-id="userId"/>
                </div>

                <div class="tab_area_in" v-if="currentTabInner == 1">
                    <ItpWrite
                        :main-id="itpMainCodeId"
                        :main-id-name="itpMainCodeIdName"
                        :mid-id="itpMidCodeId"
                        :mid-id-name="itpMidCodeIdName"
                        :rev-id="revisionId" 
                        @fn-change="fnRevChange"
                        :user-id="userId"
                    />
                </div>

                <div class="tab_area_in" v-if="currentTabInner == 2">
                    <ItpList :user-id="userId"/>
                </div>
            </div>
        </div>

        <div class="tab_area submenu_on" v-show="currentTab == 1">
            <tree-category-tab
                refId="itrTreeCategory"
                :category-data="itrCategoryData"
                :use-check-box="false"
                @changed-checked-list="changedITRTabCheckedList"
                :currentTab="currentTab"
            />
            <div class="right_content">
                <ItrList :main-id="itrMainCodeId" :mid-id="itrMidCodeId" :user-id="userId"/>
            </div>
        </div>

        <div class="tab_area" v-show="currentTab == 2">
            <div class="lst_tabs_in">
                <ul>
                    <li v-for="(inner, index) in tab.innerList" v-bind:class="{active: tab.innerCurrent === index}" :key="index"><a href="javascript:void(0);" v-on:click="tab.innerCurrent = index">{{inner.value}}</a></li>
                </ul>
            </div>
            <numbering
                :title="tab.innerList[tab.innerCurrent].value"
                code-type="INPT"
                :key="tab.innerList[tab.innerCurrent].key"
                :code-dtl-type="tab.innerList[tab.innerCurrent].key"
                :useSameAsRequest="tab.innerList[tab.innerCurrent].useSameAsRequest"
                :except-list="tab.innerList[tab.innerCurrent].exceptList"
            />
            <!-- <div class="tab_area_in" v-show="currentTabInner2 == 0">
                <div class="inner type2">
                    <div class="button_box">
                        <h2>ITP Numbering</h2>
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray">저장</button>
                        </div>
                    </div>
                    <div class="button_box mt10">
                        <span>Sequence Digit</span>
                        <select name="" id="" class="form_control num">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                        </select>
                        <span class="numbering_tit">Preview : <span class="point_color txt_ellipsis">CUKR1303-건축-자재승인-2021-0001</span></span>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray">추가</button>
                            <button type="button" class="btn btn_sm btn_darkgray">삭제</button>
                        </div>
                    </div>

                    <div class="ib_wrap">
                        <div id="sheetTable5" class="ibsheet_table"></div>
                    </div>
                    <p class="table_message">* Sequence 구분 체크 시 체크된 항목 기준으로 Sequence Number가 Counting됩니다.</p>

                    <div class="button_box">
                        <h2>Numbering 히스토리</h2>
                    </div>
                    <div class="ib_wrap">
                        <div id="sheetTable6" class="ibsheet_table"></div>
                    </div>
                </div>
            </div>
            <div class="tab_area_in" v-show="currentTabInner2 == 1">
                <div class="inner type2">
                    <div class="button_box">
                        <h2>검측 요청 Numbering</h2>
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray">저장</button>
                        </div>
                    </div>
                    <div class="button_box mt10">
                        <span>Sequence Digit</span>
                        <select name="" id="" class="form_control num">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                        </select>
                        <span>Preview : <span class="point_color">CUKR1303-건축-검측-2021-0001</span></span>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray">추가</button>
                            <button type="button" class="btn btn_sm btn_darkgray">삭제</button>
                        </div>
                    </div>

                    <div class="ib_wrap">
                        <div id="sheetTable7" class="ibsheet_table"></div>
                    </div>
                    <p class="table_message">* Sequence 구분 체크 시 체크된 항목 기준으로 Sequence Number가 Counting됩니다.</p>

                    <div class="button_box">
                        <h2>Numbering 히스토리</h2>
                    </div>
                    <div class="ib_wrap">
                        <div id="sheetTable8" class="ibsheet_table"></div>
                    </div>
                </div>
            </div>
            <div class="tab_area_in" v-show="currentTabInner2 == 2">
                <div class="inner type2">
                    <div class="button_box">
                        <h2>검측 통보 Numbering 
                            <label for="" class="input_check vat ml20">
                                <input type="checkbox" name="" id="">
                                <span class="label_text">요청과 동일하게 적용</span>
                            </label>
                        </h2>
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray">저장</button>
                        </div>
                    </div>
                    <div class="button_box mt10">
                        <span>Sequence Digit</span>
                        <select name="" id="" class="form_control num">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                        </select>
                        <span>Preview : <span class="point_color">CUKR1303-건축-검측-2021-0001</span></span>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray">추가</button>
                            <button type="button" class="btn btn_sm btn_darkgray">삭제</button>
                        </div>
                    </div>

                    <div class="ib_wrap">
                        <div id="sheetTable9" class="ibsheet_table"></div>
                    </div>
                    <p class="table_message">* Sequence 구분 체크 시 체크된 항목 기준으로 Sequence Number가 Counting됩니다.</p>

                    <div class="button_box">
                        <h2>Numbering 히스토리</h2>
                    </div>
                    <div class="ib_wrap">
                        <div id="sheetTable10" class="ibsheet_table"></div>
                    </div>
                </div>
            </div> -->
        </div>

        <div class="tab_area" v-if="currentTab == 3">
            <approval-option
                code-type="INPT"
            />
        </div>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
    </div> 
</template>
<script>
    import loader from '@ibsheet/loader'
//    import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
    import TreeCategoryTab from "@/pages/common/frame/TreeCategoryTab";
    import Numbering from "@material/component/Numbering"
    import { DetectionChecklist2 } from '../../common/data/PopupList'
    import ApprovalOption from "@material/component/ApprovalOption"
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import { sendPostApi, requestOptions } from '@/apis/common';
    import ItrList from "@/pages/quality/inspectMngt/component/ItrList.vue";
    import ItpSelect from "@/pages/quality/inspectMngt/component/ItpSelect.vue";
    import ItpWrite from "@/pages/quality/inspectMngt/component/ItpWrite.vue";
    import ItpList from "@/pages/quality/inspectMngt/component/ItpList.vue";
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
//    import API from '@/apis/'
//    import { Material4, Material5 } from '@/pages/common/data/InptOptnList'

   let SHEET_ID = '';

   export default {
        name: 'InspectSiteSetupSheet',
        mixins: [authCheckMixns],
        components: {
            ApprovalOption,
            TreeCategoryTab,
            ItrList,
            ItpSelect,
            ItpWrite,
            ItpList,
            PopAlert,
            Numbering,
            Breadcrumb,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['ITP', 'ITR(Check List)', 'Numbering', '결재 옵션'], // tab name
                currentTabInner: 0, // 기본 current 값 지정 
                tabsInner: ['ITP 선택', 'ITP 작성', 'ITP 리스트'], // tab name
                currentTabInner2: 0, // 기본 current 값 지정 
                tabsInner2: ['ITP', '검측 요청', '검측 통보'],
                siteMstrId:'',
                itpMainCodeId:'',
                itpMainCodeIdName:'',
                itpMidCodeId:'',
                itpMidCodeIdName:'',
                itrMainCodeId:'',
                itrMidCodeId:'',
                mounted:false,
                popMsg: '',                                 // 알림창 메세지
                confirmUse: false,                             // 알림창 버튼개수
                popId:'siteSetupAlert',                     // 알림창 Id
                tab: {
                    // current: 0,
                    // list: ['자재분류체계 및 Check List 등록', 'Numbering', '결재 옵션'],  // tab name
                    innerCurrent: 0,
                    innerList: [
                        // '자재공급원 승인(요청)',
                        // '자재공급원 승인(통보)',
                        // '인수검사',
                        // '공장검사'
                        {
                            key: 'ITP',
                            value: 'ITP',
                            exceptList:['GJGCD', 'GJSCD','GJMCD'],
                        },
                        {
                            key: 'CREQ',
                            value: '검측 요청',
                        },
                        {
                            key: 'CRES',
                            value: '검측 통보',
                            useSameAsRequest: true
                        },
                    ],
                },
                
                search: {
                    tab: {
                        useCheckBox: false,
                        itpData: null,
                        itrData: null
                    },
                    box: {}
                },
                itpCategoryData : [],
                itrCategoryData: [],
                category: {
                    data: []
                },
                inptChkId:'',

                revisionId:0,
                userId:'',
            }
        },
        async mounted() {
            //tree tab menu[S]
            await this.getITPCategoryData();
            await this.getITRCategoryData();
            // this.sheetCreate();
            this.mounted = true;
            //tree tab menu[E]
            this.userId = this.$store.getters['auth/getUserId'];

            /* Numbering */
            // let data4 = Material4.data;
            // let options4 = Material4.options;
            // loader.createSheet({
            //     el: 'sheetTable5',
            //     data: data4,
            //     options: options4,
            // })
            // loader.createSheet({
            //     el: 'sheetTable7',
            //     data: data4,
            //     options: options4,
            // })
            // loader.createSheet({
            //     el: 'sheetTable9',
            //     data: data4,
            //     options: options4,
            // })
            
            // let data5 = Material5.data;
            // let options5 = Material5.options;
            // loader.createSheet({
            //     el: 'sheetTable6',
            //     data: data5,
            //     options: options5,
            // })
            // loader.createSheet({
            //     el: 'sheetTable8',
            //     data: data5,
            //     options: options5,
            // })
            // loader.createSheet({
            //     el: 'sheetTable10',
            //     data: data5,
            //     options: options5,
            // })
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },
        watch:{
            // "search.tab.itpData": {
            //     handler () {
            //         console.log('search.tab.itpData changed')
            //         if (this.mounted) {
            //             console.log(this.search.tab.data)
            //             // loader.removeSheet('inspect1');
            //             // loader.removeSheet('inspect2');
            //             this.mainCodeId = this.search.tab.data.mainCodeId? this.search.tab.data.mainCodeId : '';
            //             this.midCodeId = this.search.tab.data.midCodeId;
            //             console.log();
            //             // this.sheetCreate();
            //         }
            //     },
            //     deep: true
            // },
            // "search.tab.itrData": {
            //     handler () {
            //         console.log('search.tab.itrData changed')
            //     },
            // },
            // currentTab: function (){
            //     if( this.currentTab == 0 ) {
            //         this.itpMainCodeId = '';
            //         this.itpMidCodeId = '';
            //     } else if( this.currentTab == 1 ) {
            //         this.itrMainCodeId = '';
            //         this.itrMidCodeId = '';
            //     }
            // },
        },
        methods: {
            async getITPCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'ITP' };
                
                try {
                    const data = await sendPostApi(url, param);
                    this.itpCategoryData = data.data.list;
                } catch (error) {
                    console.log(error.response.data)
                }
            },
            async getITRCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'INPT' };
                
                try {
                    const data = await sendPostApi(url, param);
                    this.itrCategoryData = data.data.list;
                } catch (error) {
                    console.log(error.response.data)
                }
            },
            // sheetLoad: function() {
            //     let data = DetectionChecklist2.data;
            //     let options = DetectionChecklist2.options;

            //     loader.createSheet({
            //         el: 'popsheetTable',
            //         data: data,
            //         options: options,
            //     })
            // },
            sheetCreate: function(){
                // console.log('dd');
            },
            changedITPTabCheckedList (item) {
                // console.log("call changedITPTabCheckedList");
                this.search.tab.itpData = item
                // console.log("item : %o", item);

                this.itpCategoryData.forEach(row => {
                    if(row.mainCodeId == this.search.tab.itpData.mainCodeId) {
                        // console.log("row.mainName =========== %o", row.mainName)
                        this.itpMainCodeIdName = row.mainName;
                    }
                })

                // event
                this.itpMainCodeId     = this.search.tab.itpData.mainCodeId;
                // this.itpMainCodeIdName = this.search.tab.itpData.mainName;
                this.itpMidCodeId      = this.search.tab.itpData.midCodeId;
                this.itpMidCodeIdName  = this.search.tab.itpData.midName;
            },
            changedITRTabCheckedList (item) {
                // console.log("call changedITRTabCheckedList");
                this.search.tab.itrData = item
                // console.log("item : %o", item);

                // event
                this.itrMainCodeId = this.search.tab.itrData.mainCodeId;
                this.itrMidCodeId  = this.search.tab.itrData.midCodeId;
            },
            fnRevChange:function(rev){
                this.revisionId = rev;
            },
            alertConfirmFn:function(){
                this.$root.$emit('bv::hide::modal', 'siteSetupAlert');
            },
            closePop:function(){
                this.$root.$emit('bv::hide::modal', 'siteSetupAlert');
            },
        }
   }
</script>