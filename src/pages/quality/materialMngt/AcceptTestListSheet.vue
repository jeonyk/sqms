<template>
        <!-- <router-view/> -->
            <div class="tab_contents">
                <!-- <h2 class="sub_title">자재관리 > 인수검사</h2> -->
                <Breadcrumb :currentPath="$route.fullPath" />
                <div class="lst_tabs">
                    <ul class="">
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a
                                href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                    </ul>
                </div>
                <div class="tab_area submenu_on" v-show="currentTab == 0">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <!-- <col width="6%">
                                <col width="16%">
                                <col width="5%">
                                <col width="16%">
                                <col width="5%">
                                <col width="16%">
                                <col width="5%">
                                <col width="16%">
                                <col width="*"> -->
                                <col width="6%">
                                <col width="24%">
                                <col width="6%">
                                <col width="24%">
                                <col width="5%">
                                <col width="24%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>품명</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="prdtNm" @keyup.enter="fetchAccptTestList(0)" :maxlength="30"></td>
                                    <th>규격</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="stnd" @keyup.enter="fetchAccptTestList(0)" :maxlength="30"></td>                 
                                    <th>자재 TYPE</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="mtrlMainYn">
                                            <option value="" selected>전체</option>
                                            <option value="Y">주요자재</option>
                                            <option value="N">일반자재</option>
                                        </select>
                                    </td>              
                                    <td class="ar">
                                        <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="fetchAccptTestList(0)">검색</button>
                                    </td>
                                </tr>

                                <tr>
                                    <!-- <th>공종</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="mainCodeId" v-on:change="selectChange()">
                                            <option value="" selected>전체</option>
                                            <option v-for="(item,oneIndex) in categoryData" v-bind:key="oneIndex" v-bind:value="item.mainCodeId">
                                                {{item.mainName}}
                                            </option>
                                        </select>
                                    </td>                                
                                    <th>세부공종</th>
                                    <td>
                                        <select name="" id="midCode" class="form_control size_md" v-model="midCodeId" disabled>
                                            <option value="" selected>전체</option>
                                            <option v-for="(subItem,twoIndex) in categoryDataSub" v-bind:key="twoIndex" v-bind:value="subItem.midCodeId">
                                                {{subItem.midName}}
                                            </option>
                                        </select>
                                    </td> -->
                                    <th>공급업체</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="spprNm" @keyup.enter="fetchAccptTestList(0)" :maxlength="30"></td>                  
                                    <th>제조업체</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="mnft" @keyup.enter="fetchAccptTestList(0)" :maxlength="30"></td>                  
                                    <th>검사실시일</th>
                                    <td>
                                        <date-picker-range v-model="date"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>현황</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="testStatus">
                                            <option value="" selected>전체</option>
                                            <option value="REGT">검사 등록</option>
                                            <option value="CHECK">검사중</option>
                                            <option value="APVL">결재중</option>
                                            <option value="APRV">완료</option>
                                        </select>
                                    </td>
                                    <th>결과</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="apprJdmt">
                                            <option value="" selected>전체</option>
                                            <option value="PASS">적합</option>
                                            <option value="PART">조건부 적합</option>
                                            <option value="UNPASS">부적합</option>
                                        </select>
                                    </td>
                                    <th>KS 인증 여부</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="ksCtfcYn">
                                            <option value="" selected>전체</option>
                                            <option value="Y">KS</option>
                                            <option value="N">비 KS</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <tree-category-tab
                        :category-data="categoryData"
                        :use-check-box="false"
                        @changed-checked-list="changedTabCheckedList"
                    />

                    <div class="right_content">
                        <div class="inner">
                            <div class="button_box">
                                <button type="button" class="btn btn_sm btn_excel" id="excelBtn" @click="fn_exportExcel(mySheet)">엑셀 다운로드</button>
                                <button v-if="checkUser(this.userId,'down')" type="button" class="btn btn_sm btn_outline btn_darkgray btn_print" v-on:click="print()">출력</button>
                                <button v-if="checkUser(this.userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="ozOpen('INVENTORY')">자재 수불부</button>
                                <button v-if="checkUser(this.userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="ozOpen('TEST')">자재 검사부</button>
                                <button v-if="checkUser(this.userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="ozOpen('MANAGEMENT')">관리대장</button>
                                <button v-if="checkUser(this.userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="ozOpen('CHECK')">검사 및 수불부</button>
                                <button v-if="checkUser(this.userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="ozOpen('KS_INFO')">K.S 자재 사용총괄표</button>
                                <button v-if="checkUser(this.userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="accpOzReport">인수검사 신청서 및 체크리스트</button>
                                <label for="hiddenCol" class="input_check">
                                    <input type="checkbox" id="hiddenCol" class="form_control" @change="hiddenCol" v-model="hiddenCheck">
                                    <span class="label_text">목록 숨기기</span>
                                </label>
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="copyInsert" v-if="checkUser(this.userId,'write')">등록복사</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="openPop" v-if="checkUser(this.userId,'write')">신규등록</button>
                                    <button type="button" class="btn btn_sm btn_darkblue" v-on:click="insertSignChk" v-if="checkUser(this.userId,'write')">결재상신</button>
                                </div>
                            </div>
                            <!-- ibsheet -->
                            <div class="ib_wrap ib_max_height">
                                <div class="ib_container" id="mysite_area" style="height: calc(100vh - 350px)">
                                    <div id="acceptSheetTable" class="ibsheet_table" style="height: 100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab_area submenu_on" v-show="currentTab == 1">
                     <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="24%">
                                <col width="6%">
                                <col width="24%">
                                <col width="5%">
                                <col width="24%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select name="" id="" class="form_control" v-model="mngtType">
                                                <option value="">전체</option>
                                                <option value="0">관리</option>
                                                <option value="1">비관리</option>
                                                <option value="2">준공</option>
                                            </select>
                                            <input type="text" class="form_control" placeholder="입력해주세요" v-model="projNm" @keyup.enter="fetchAccptTestList(1)" :maxlength="100">
                                        </div>    
                                    </td>                 
                                    <!-- <th>공종</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="mainCodeId" v-on:change="selectChange()">
                                            <option value="" selected>전체</option>
                                            <option v-for="(item,oneIndex) in categoryData" v-bind:key="oneIndex" v-bind:value="item.mainCodeId">
                                                {{item.mainName}}
                                            </option>
                                        </select>
                                    </td>                                
                                    <th>세부공종</th>
                                    <td>
                                        <select name="" id="midCode2" class="form_control size_md" v-model="midCodeId" disabled>
                                            <option value="" selected>전체</option>
                                            <option v-for="(subItem,twoIndex) in categoryDataSub" v-bind:key="twoIndex" v-bind:value="subItem.midCodeId">
                                                {{subItem.midName}}
                                            </option>
                                        </select>
                                    </td> -->
                                    <th>자재 TYPE</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="mtrlMainYn">
                                            <option value="" selected>전체</option>
                                            <option value="Y">주요자재</option>
                                            <option value="N">일반자재</option>
                                        </select>
                                    </td>      
                                    <th>KS 인증 여부</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="ksCtfcYn">
                                            <option value="" selected>전체</option>
                                            <option value="Y">KS</option>
                                            <option value="N">비 KS</option>
                                        </select>
                                    </td>
                                    <!-- <th>현황</th>
                                    <td>
                                        <select name="" id="" class="form_control size_md" v-model="testStatus">
                                            <option value="" selected>전체</option>
                                            <option value="REGT">검사 등록</option>
                                            <option value="CHECK">검사중</option>
                                            <option value="APVL">결재중</option>
                                            <option value="APRV">완료</option>
                                        </select>
                                    </td> -->
                                    <td class="ar">
                                        <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="fetchAccptTestList(1)">검색</button>
                                    </td>
                                </tr>

                                <tr>         
                                    <th>품명</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="prdtNm" @keyup.enter="fetchAccptTestList(1)" :maxlength="30"></td>                  
                                    <th>공급업체</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="spprNm" @keyup.enter="fetchAccptTestList(1)" :maxlength="30"></td>                  
                                    <th>제조업체</th>
                                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="mnft" @keyup.enter="fetchAccptTestList(1)" :maxlength="30"></td>                  
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <tree-category-tab
                        :category-data="categoryData"
                        :use-check-box="false"
                        @changed-checked-list="changedTabCheckedList"
                    />
                    <div class="right_content">
                        <div class="inner">
                            <div class="button_box">
                                <button type="button" class="btn btn_sm btn_excel" id="excelBtn" @click="fn_exportExcel(allSheet)">엑셀 다운로드</button>
                                <!-- <button type="button" class="btn btn_sm btn_outline btn_darkgray btn_print" v-print="'#allSite_area'">출력</button> -->
                                <button type="button" class="btn btn_sm btn_outline btn_darkgray btn_print" v-on:click="print()">출력</button>
                            </div>
                            <!-- ibsheet -->
                            <div class="ib_wrap" id="allSite_area" style="height: calc(100vh - 350px)">
                                <div id="acceptSheetTable2" class="ibsheet_table" style="height:100%"></div>
                            </div>
                        </div>
                    </div>
                    <br>
                </div>
                <AcceptanceWrite 
                    v-bind:aprv-type="aprvOptnType" v-bind:detail-obj="detailObj" 
                    :ref-id="'accpList_AcceptanceWrite'"
                    v-on:add-acceptance="addAcceptance"/>
                <!--v-bind:trade-list="tradeList" v-bind:sub-stnd="subStnd" v-bind:sub-prdt="subPrdt" 
                    v-bind:sub-sppr="subSppr" v-bind:sub-mnft="subMnft" 
                    v-bind:sub-mid-code="subMidCode"-->

                <QuantityChange 
                    v-on:change-amount-close="changeAmountClose"
                    v-bind:mtrl-accp-ts-id="mtrlAccpTsId" :ref-id="'accpList_QuantityChange'"
                    v-bind:doc-seq="docSeq" v-bind:status="bindStatus" ref="Quantity"/>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
                <approve
                    ref-id="acceptanceApproveModal"
                    doc-type="MTRL"
                    :code-type="approve.codeType"
                    :code-dtl-type="approve.codeDtlType"
                    :main-code-id="approve.mainCodeId"
                    :mid-code-id="approve.midCodeId"
                    :request-id="approve.requestId"
                    :doc-name="approve.docName"
                    :doc-seq="approve.docSeq"
                    :file-type="approve.fileType"
                    :site-mstr-id="approve.siteMstrId"
                    @callback="fn_setSourceApproval"
                    alertable
                />
                <excel-download
                    v-model="excelDownload.request"
                    ref-id="acceptTestList_ExcelDownload"
                    :file-name="excelDownload.fileName"
                    :options="excelDownload.options"
                    :data="excelDownload.data"
                />
            </div>
</template>

<script>
    import {sendPostApi, requestOptions }  from '../../../apis/common';
    import loader from '@ibsheet/loader'
    import { Material7, Material8 } from '@/pages/common/data/MaterialsList'
    // import DatepickerRange from '../../common/popup/DatepickerRange.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
    import API from '@/apis/'
    import axios from 'axios'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import AcceptanceWrite from '@/pages/quality/materialMngt/AcceptanceWrite.vue'
    import QuantityChange from '@/pages/quality/materialMngt/QuantityChange.vue'
    import Approve from '@modal/approval/Approve.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { mapGetters } from 'vuex'
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    let mySheetId = '';
    let allSheetId='';

    export default {
        name: 'AcceptTestList',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            PopAlert,
            DatePickerRange,
            TreeCategoryTab,
            AcceptanceWrite,
            QuantityChange,
            Approve,
            Breadcrumb,
            ExcelDownload,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
               //tree tab menu[S]
                mounted: false,
                hiddenCheck: true,   // 목록 숨기기 여부
                search: {
                    tab: {
                        useCheckBox: false,
                        data: null
                    },
                    box: {}
                },
                categoryData: [],
                categoryDataSub:[],
                categoryList:[],
                category: {
                    data: []
                },
                //tree tab menu[E]
                popMsg: '',                                 //알림창 메세지
                confirmUse: '',                             //알림창 버튼개수
                popId:'accpLstAlert',                       //알림창 Id
                // siteMstrId: '',                             //현장정보Id
                mySheet:null,
                allSheet:null,

                mainCodeId: '',                             //공종 Id
                midCodeId: '',                              //세부공종 Id
                midName: '',                                //세부공종명
                mtrlAccpTsId: '',                           //인수검사 Id
                mtrlSpApprId: '',                           //자재공급원 승인 id

                testStatus: '',                             //진행상태(현황)
                stnd: '',                                   // 규격
                sppr: '',                                   // 공급업체
                spprNm: '',                                 //공급업체명
                mnft: '',                                   // 제조업체
                mnftNm: '',                                 //제조업체명               
                prdt: '',                                   //제품
                prdtNm:'',                                  //품명
                apprJdmt: '',                               //결과
                mtrlMainYn: '',                             //자재Type
                startDate: '',                              //range 시작일
                endDate: '',                                //range 종료일
                projNm: '',                                 //프로젝트명
                docSeq: '',
                mngtType : '0',
                ksCtfcYn:'',

                // tradeList: [],               //select box용 공급업체
                insertRst:false,                //등록 성공 여부
                detailObj:[],                   //등록복사용
                insertSignYn: false,            //결재상신결과
                bindStatus:'',
                aprvOptnType:'',
                approve: {
                    codeType: 'MTRL',
                    codeDtlType: 'TSAC',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: null,
                },


                /** ProgressBar Info - to global */
                // progressBar - Info
                progressInfo: [
                    {
                        code: 'REGT',
                        text: '검사등록',
                        value: 20
                    },
                    {
                        code: 'CHECK',
                        text: '검사중',
                        value: 45
                    },
                    {
                        code: 'APVL',
                        text: '결재중',
                        value: 75
                    },
                    {
                        code: 'APRV',
                        text: '완료',
                        value: 100
                    },
                ],
                date:[],
                userId: '',
                userType:'',
                ozReport:{src : '',},
                ozData : [],

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
        computed: {
            ...mapGetters({
                siteMstrId: 'auth/getSiteMstrId'
            })
        },
        async mounted() {
            this.userType = this.$store.getters['auth/getUserType'];
            this.userId = this.$store.getters['auth/getUserId'];

            if(this.userType == 'PTNR'){
                this.tabs = ['My Site'];
            }

            // if (this.router)

            if (this.$route.params.testStatus){
                this.testStatus = this.$route.params.testStatus
            }
            //tree tab menu[S]
            // this.siteMstrId = this.$store.getters['auth/getSiteMstrId']

            await this.getCategoryData();
            // this.mounted = true;
            //tree tab menu[E]
            // let ts = this;

            /** render-순서변경 */
            this.createSheetLst()


            // let data = Material7.data;
            // let options = Material7.options;

            // loader.createSheet({
            //     el: 'acceptSheetTable',
            //     data: data,
            //     options: options,
            // }).then((sheet) => {
            //     mySheetId = sheet.id
               
            //     sheet.bind("onClick", function(evtParam) {
            //         if(evtParam.col == "case20" && evtParam.event.target.tagName == "BUTTON"){ // case20: 물량변경
            //             return ts.$root.$emit('bv::show::modal', 'Quantitychange')
            //         }
            //     })
            // });

            // this.bringCompany();//공급업체 불러오기

        },
        beforeDestroy() {
            // loader.removeSheet(mySheetId);
            // loader.removeSheet(allSheetId);
            if (this.mySheet)  loader.removeSheet(this.mySheet)
            if (this.allSheet) loader.removeSheet(this.allSheet)
        },
        watch: {
            // "search.tab.data": {
            //     handler () {
            //         // //console.log('search.tab.data changed')

            //         if (this.mounted) {
            //             //console.log(this.search.tab.data)
            //             // this.getGridData({
            //             //     productName: '',
            //             //     mainCodeId: this.search.tab.data.mainCodeId,
            //             //     midCodeId: this.search.tab.data.midCodeId,
            //             // })
            //             this.mainCodeId = this.search.tab.data.mainCodeId? this.search.tab.data.mainCodeId : '';
            //             this.midCodeId = this.search.tab.data.midCodeId;
            //             this.midName = this.search.tab.data.midName;
            //             // this.createSheetLst();
            //             this.fetchAccptTestList()
            //         }
            //     },
            //     deep: true
            // },
            currentTab: function(){

                if (this.mounted) {
                    this.filterReset();
                }
                //this.createSheetLst();
            },
            // mainCodeId : function(){
            //     if (this.mounted) {
            //         if(this.mainCodeId == '' || this.mainCodeId == null){
            //             document.getElementById('midCode').setAttribute('disabled',true);
            //             document.getElementById('midCode2').setAttribute('disabled',true);
            //         }else{
            //             document.getElementById('midCode').removeAttribute('disabled');
            //             document.getElementById('midCode2').removeAttribute('disabled');
            //         }
            //     }
            // },
        },
        activated(){
            // keepAlive 재조회 처리
            if(this.$store.getters['tabInfo/getSavePage'].length > 0){
                
                //keepAlive 재조회 처리
                let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
                let url="/sendApi/api/programMngt/menuChildProgram/list"
                let reSearch = false;
                let param = {"menuMngtId":menuid}; 
                
                // sdave정보가 있는지 체크하여 처리
                sendPostApi(url, param).then((result) => {
                    // 하부 페이지 정보
                    for (let i = 0; i < result.data.dlprogram.length ; i++){
                        // 저장 페이지 정보와 비교
                        for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                            if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                                this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);

                                reSearch = true;
                                break;
                            }
                        }

                        if(reSearch){
                            break;
                        }
                    }

                    if(reSearch){
                        this.createSheetLst();
                    }

                }).catch((e) => {
                    // //console.log(e);
                    return e.response;
                });
            }
        },
        methods: {
            async getCategoryData () {
                const response = await API.material.getCategoryData()
                // //console.log(response)
                if (response.status === 200 && response.data) {
                    // temporary
                    this.categoryData = response.data.list;
                    for(let x = 0; x<this.categoryData.length; x++){
                        this.categoryList.push(this.categoryData[x].mainCodeId);
                    }
                    //console.log(this.categoryData);
                    //console.log(this.categoryList);
                }
            },
            /** 통합 API 요청 - 요청 후 loadSearchData */
            fetchAccptTestList: async function (currentTab) {
                this.detailObj = []
                const numTab = Number(currentTab)
                
                const params = {
                    mainCodeId:     this.mainCodeId ? this.mainCodeId   : undefined, 
                    midCodeId:      this.midCodeId  ? this.midCodeId    : undefined, 
                    prdtNm:         this.prdtNm     ? this.prdtNm       : undefined, 
                    spprNm:         this.spprNm     ? this.spprNm       : undefined, 
                    mtrlMainYn:     this.mtrlMainYn ? this.mtrlMainYn   : undefined, 
                    mnft:           this.mnft       ? this.mnft         : undefined, 
                    ksCtfcYn:       this.ksCtfcYn   ? this.ksCtfcYn     : undefined,
                }
                // tab 별 처리
                if (numTab === 0) {
                    params.siteMstrId   = this.siteMstrId   ? this.siteMstrId   : undefined
                    params.testStatus   = this.testStatus   ? this.testStatus   : undefined
                    params.apprJdmt     = this.apprJdmt     ? this.apprJdmt     : undefined
                    params.stnd         = this.stnd         ? this.stnd         : undefined
                    params.startDate    = this.date    ? this.date[0]    : undefined
                    params.endDate      = this.date      ? this.date[1]      : undefined
                } else if (numTab === 1) {
                    params.testStatus   = 'APRV'
                    params.projNm       = this.projNm       ? this.projNm       : undefined
                    params.mngtType     = this.mngtType     ? this.mngtType     : undefined
                }

                ////console.log(params);
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get("Authorization")
                    }
                }

                try {
                    const rst = await API.material.getAccptTestList (params, options)

                    //console.log("rst = ", rst);
                    if(rst.data.list.length > 0 && currentTab === 0) {
                        this.ozData = rst.data.list;
                    } else if(rst.data.list.length <= 0  && currentTab === 0) {
                        this.ozData = [];
                    }

                    if (rst.status === 200 ) {
                        this.aprvOptnType = rst.data?.data?.aprvOptnType

                        rst.data.list.forEach(item => {
                            item.mtrlMainYn     = item.mtrlMainYn === 'Y' ? '주요자재' : '일반자재'
                            item.ksCtfcYn       = (item.ksCtfcYn=='Y')?'KS':'비 KS';
                            item.inDttm         = item.inDttm ? this.$moment(item.inDttm).format('YYYY-MM-DD') : ''
                            item.insertYn       = item.testStatus === 'REGT' ? '0' : '1'
                            item.apprJdmtNm     = item.apprJdmtNm ? item.apprJdmtNm : '-'

                            if (numTab === 0) {
                                item.changeAmount   = item.testStatus !== 'REGT' && item.testStatus !== 'CHECK' ? '0' : ''
    
                                const progress = this.progressInfo.find(prog => prog.code === item.testStatus)
    
                                let htmlElement     = ''
                                                        + '<div class="guage">'
                                                            + '<span class="bar_wrap">' 
                                                                + '<span class=\'bar '+ (item.testStatus === 'APRV' ? 'complete' : '') + '\' style=\'width:'+ progress.value +'%;\'></span>'
                                                            + '</span>'
                                                            + '<span class="label" style=\'width:'+ progress.value +'%\'>'+ progress.text +'</span>'
                                                        + '</div>'
                                item.testStatus     = htmlElement
                                item.status         = progress.code
                            } 
                        })

                        let sheet ;

                        if (numTab === 0) {
                            sheet = this.mySheet
                        }else{
                            sheet = this.allSheet
                        }
                        

                        if(this.hiddenCheck){   // 목록 숨김 여부
                            rst.data.list = _.uniqBy(rst.data.list, 'docSeq')      
                            sheet.hideCol("prdtDtl")    // 세부품명
                            sheet.hideCol("stnd")       // 규격
                            sheet.hideCol("designAmt")  // 설계량
                            sheet.hideCol("total")      // 누계
                            sheet.hideCol("brAmt")      // 반입량
                            sheet.hideCol("rjtAmt")     // 불합격량
                        }else{
                            sheet.showCol("prdtDtl")    // 세부품명
                            sheet.showCol("stnd")       // 규격
                            sheet.showCol("designAmt")  // 설계량
                            sheet.showCol("total")      // 누계
                            sheet.showCol("brAmt")      // 반입량
                            sheet.showCol("rjtAmt")     // 불합격량
                        }

                        sheet.loadSearchData({
                            data: rst.data.list,
                        })
                    } 
                } catch (error) {
                    this.alert('검색에 실패했습니다.')
                    //console.error(error)
                } finally {
                    
                    this.mounted = true
                }
            },
            /** New CreateSheet - 조건: Render 후 api 요청 */
            createSheetLst: function () {
                const myOptions = Material7.options
                myOptions.Events = {
                    onAfterClick: this.fnClick,
                    onRenderFinish: this.mergeProgressBar,
                    onAfterSort: this.mergeProgressBar,
                    onDblClick : this.fnDblClick,
                    onRenderFirstFinish: () => {
                        this.fetchAccptTestList(0)
                    },
                    
                }
                loader.createSheet({
                    el:      'acceptSheetTable',
                    data:    [],
                    options: myOptions,
                }).then(sheet => {
                    this.mySheet = sheet
                })

                const allOptions = Material8.options
                allOptions.Events = {
                    onAfterClick: this.fnSecondClick,
                    onDblClick : this.allSiteDblClick,
                    onRenderFirstFinish: () => {
                        this.fetchAccptTestList(1)
                    }
                }
                loader.createSheet({
                    el:      'acceptSheetTable2',
                    data:    [],
                    options: allOptions,
                }).then(sheet => {
                    this.allSheet = sheet
                })

            },

            // 폐기
            createSheetLst2 : function(){//내현장,모든현장리스트 그리기
                // this.siteMstrId  = this.$cookies.get("siteMstrId");
                if(this.currentTab == 0){
                    //내현장일경우
                    this.detailObj = [];
                    // let param = {
                    //     "siteMstrId": this.siteMstrId,
                    // };
                    // if(this.mainCodeId != ''){//공종
                    //     param['mainCodeId'] = this.mainCodeId;
                    // }
                    // if(this.midName != ''){//세부공종명
                    //     param['midName'] = this.midName;
                    // }
                    // if(this.prdtNm != ''){//품명
                    //     param['prdtNm'] = this.prdtNm;
                    // }
                    // if(this.spprNm != ''){//공급업체명
                    //     param['spprNm'] = this.spprNm; 
                    // }
                    // if(this.testStatus != ''){//상태
                    //     param['testStatus'] = this.testStatus;
                    // }
                    // if(this.mtrlMainYn != ''){//자재type
                    //     param['mtrlMainYn'] = this.mtrlMainYn;
                    // }
                    // if(this.apprJdmt != ''){//결과(적합,부적합)
                    //     param['apprJdmt'] = this.apprJdmt;
                    // }
                    // if(this.mnft != ''){//제조업체명
                    //     param['mnft'] = this.mnft;
                    // }
                    // if(this.stnd != ''){//규격
                    //     param['stnd'] = this.stnd;
                    // }
                    // if(this.startDate != ''){//검색:시작일
                    //     param['startDate'] = this.startDate;
                    // }
                    // if(this.endDate != ''){//검색:종료일
                    //     param['endDate'] = this.endDate;
                    // }

                    // const rst = await API.material.getAccptTestList(param,{
                    //     headers:{
                    //         'Authorization': this.$cookies.get("Authorization")
                    //     }
                    // });
                    
                    // //console.log(rst);

                    let options = Material7.options;
                    options.Events = {
                        onAfterClick: this.fnClick,
                        onRenderFinish: this.mergeProgressBar,
                        onAfterSort: this.mergeProgressBar,
                        ondblclick : this.fnDblClick,
                        onRenderFirstFinish: async (event) => {
                            let param = {
                                "siteMstrId": this.siteMstrId,
                            };
                            if(this.mainCodeId != ''){//공종
                                param['mainCodeId'] = this.mainCodeId;
                            }
                            if(this.midName != ''){//세부공종명
                                param['midName'] = this.midName;
                            }
                            if(this.prdtNm != ''){//품명
                                param['prdtNm'] = this.prdtNm;
                            }
                            if(this.spprNm != ''){//공급업체명
                                param['spprNm'] = this.spprNm; 
                            }
                            if(this.testStatus != ''){//상태
                                param['testStatus'] = this.testStatus;
                            }
                            if(this.mtrlMainYn != ''){//자재type
                                param['mtrlMainYn'] = this.mtrlMainYn;
                            }
                            if(this.apprJdmt != ''){//결과(적합,부적합)
                                param['apprJdmt'] = this.apprJdmt;
                            }
                            if(this.mnft != ''){//제조업체명
                                param['mnft'] = this.mnft;
                            }
                            if(this.stnd != ''){//규격
                                param['stnd'] = this.stnd;
                            }
                            if(this.startDate != ''){//검색:시작일
                                param['startDate'] = this.startDate;
                            }
                            if(this.endDate != ''){//검색:종료일
                                param['endDate'] = this.endDate;
                            }

                            const rst = await API.material.getAccptTestList(param,{
                                headers:{
                                    'Authorization': this.$cookies.get("Authorization")
                                }
                            });

                            let data = rst.data.list;
                            let sheetText = ''; 
                            let sheetNum = 0; 
                            let sheetClass = ''; // 등록, 회신, 확인
                            let sheetCell;
                            let itemArr = ['REGT','CHECK','APVL','APRV'];
                            let nameArr = ['검사등록','검사중','결재중','완료'];
                            let itemNumArr = [20, 45, 75, 100];
                            // if(rst.statusText == "OK" && rst.data.list.length != 0){
                            if(rst.status == 200 && rst.data.list.length != 0){
                                let array = rst.data.list;
                                this.aprvOptnType = rst.data.data.aprvOptnType;
                                //console.log(this.aprvOptnType);
                                for(let a = 0; a< array.length; a++){
                                    // array[a].designAmt = array[a].designAmt==null?0:(array[a].designAmt==''?0:array[a].designAmt);
                                    array[a].mtrlMainYn = (array[a].mtrlMainYn=='Y')?'주요자재':'일반자재';
                                    array[a].ksCtfcYn = (array[a].ksCtfcYn=='Y')?'KS':'비 KS';
                                    array[a].inDttm = (array[a].inDttm)==null?'':((array[a].inDttm)==''?'':(array[a].inDttm).substr(0,10));
                                    array[a]['insertYn']=(array[a].testStatus=='REGT')?'0':'1';
                                    array[a]['changeAmount']=(array[a].testStatus=='REGT')?'':(array[a].testStatus=='CHECK'?'':'0');
                                    array[a]['apprJdmtNm'] = (array[a]['apprJdmtNm'] == '')?'-':((array[a]['apprJdmtNm']) == null?'-':array[a]['apprJdmtNm']);
                                    sheetNum = 0;//그래프 크기초기화
                                    sheetClass = '';
                                    sheetText = '';
                                    sheetCell = array[a].testStatus;
                                    let status = sheetCell;
                                    itemArr.forEach(function(val,idx){
                                        if(array[a].testStatus === val){
                                            sheetNum = itemNumArr[idx];
                                            sheetText = nameArr[idx];
                                        }
                                    })
                                    if(sheetCell === 'APRV'){
                                        sheetClass = 'complete';
                                    }else{
                                        sheetClass = '';
                                    }
                                    var steps = '<div class="guage">'+
                                        '<span class="bar_wrap">' +
                                            '<span class=\'bar '+sheetClass+'\' style=\'width:'+sheetNum+'%;\'></span>' + 
                                        '</span>'+
                                        '<span class="label" style=\'width:'+sheetNum+'%\'>'+sheetText+'</span>' +
                                    '</div>';
                                    array[a].testStatus = steps;
                                    array[a]['status'] = status;
                                }
                                
                            }else{
                                data = [];
                            }

                            event.sheet.loadSearchData({
                                data: data,
                                append: false
                            })

                        }
                    };
                    

                    loader.createSheet({
                        el: 'acceptSheetTable',
                        data: [],
                        options:options,
                    }).then((sheet) => {
                        // mySheetId = sheet.id;
                        this.mySheet = sheet;
                        
                        
                        // sheet.hideCol('mtrlAccpTsId');
                    });
                }else{//모든현장
                    this.detailObj = [];
                    
                    let options2 = Material8.options;

                    options2.Events = {
                        onAfterClick: this.fnSecondClick,
                        // onRenderFinish: this.mergeProgressBar,
                        // onAfterSort: this.mergeProgressBar,
                        
                        onRenderFirstFinish: async (event) => {
                            let param = {//완료인것만
                                'testStatus': 'APRV',
                            };
                            if(this.mainCodeId != ''){//공종
                                param['mainCodeId'] = this.mainCodeId;
                            }
                            if(this.midCodeId != ''){//세부공종명
                                param['midCodeId'] = this.midCodeId;
                            }
                            if(this.prdtNm != ''){//품명
                                param['prdtNm'] = this.prdtNm;
                            }
                            if(this.spprNm != ''){//공급업체명
                                param['spprNm'] = this.spprNm; 
                            }
                            if(this.mtrlMainYn != ''){//자재type
                                param['mtrlMainYn'] = this.mtrlMainYn;
                            }
                            if(this.mnft != ''){//제조업체명
                                param['mnft'] = this.mnft;
                            }
                            if(this.projNm != ''){//프로젝트명
                                param['projNm'] = this.projNm;
                            }
                            if(this.mngtType != ''){
                                param['mngtType'] = this.mngtType;
                            }

                            const rst = await API.material.getAccptTestList(param,{
                                headers:{
                                    'Authorization': this.$cookies.get("Authorization")
                                }
                            });

                            let data2 = rst.data.list;
                            // if(rst.statusText == "OK" && rst.data.list.length != 0){
                            if(rst.status == 200 && rst.data.list.length != 0){
                                let array = rst.data.list;
                                for(let a = 0; a< array.length; a++){
                                    array[a].mtrlMainYn = (array[a].mtrlMainYn=='Y')?'주요자재':'일반자재';
                                    array[a].ksCtfcYn = (array[a].ksCtfcYn=='Y')?'KS':'비 KS';
                                    array[a].inDttm = (array[a].inDttm)==null?'':((array[a].inDttm)==''?'':(array[a].inDttm).substr(0,10));
                                    array[a]['insertYn']=(array[a].testStatus=='REGT')?'':'1';
                                    array[a]['apprJdmtNm'] = (array[a]['apprJdmtNm'] == '')?'-':((array[a]['apprJdmtNm']) == null?'-':array[a]['apprJdmtNm']);
                                }
                            }else{
                                data2 = [];
                            }

                            event.sheet.loadSearchData({
                                data: data2,
                                append: false
                            })
                            event.sheet.hideCol('mtrlAccpTsId');
                            

                        }
                    };
                    

                    loader.createSheet({
                        el: 'acceptSheetTable2',
                        data: [],
                        options:options2,
                    }).then((sheet) => {
                        // allSheetId = sheet.id
                        this.allSheet = sheet;
                        
                    });
                }
            },
            filterReset: function(){
                this.prdtNm= ''; //품명 
                this.prdt='';    //품명id                     
                this.mainCodeId= ''; //공종                  
                this.midCodeId= '';//세부공종
                this.midName='';//세부공종명
                this.testStatus= '';//현황
                this.stnd= '';//규격
                this.sppr= '';//공급업체
                this.spprNm='';//공급업체명
                this.mnft= '';//제조업체
                this.mnftNm= '';//제조업체명
                this.date = [];
                this.startDate= '';//검색필터-시작일
                this.endDate= '';//검색필터-종료일
                this.apprJdmt= '';//결과
                this.mtrlMainYn= '';//자재type
                this.mngtType = '0';
                this.projNm = '';
                this.ksCtfcYn = '';
                // this.dateRangeReset();
                // this.createSheetLst();   
                
                // fetch
                // this.fetchAccptTestList(this.currentTab)
            },
            dateRangeChange: function(param){
                this.startDate = param[0];
                this.endDate = param[1];
            },
            dateRangeReset: function(){
                this.startDate = null;
                this.endDate = null;
                this.$refs.datepickerRange.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            changedTabCheckedList (item) {

                // this.search.tab.data = item
                if (this.mounted) {
                    this.mainCodeId = item.mainCodeId   ? item.mainCodeId   : ''
                    this.midCodeId  = item.midCodeId    ? item.midCodeId    : ''
                    this.midName    = item.midName      ? item.midName      : ''
    
                    this.fetchAccptTestList(this.currentTab)
                }
                // event
            },
            // sheetLoad: function() {//신규등록 팝업열기
            //     this.resetSubParam(); //검색 조건 초기화
            //     this.refreshWritePop();//아이비시트 불러오기
            // },
            copyInsert: function(){
                const row = this.mySheet.getRowsByChecked('selectYn')[0];
                /*
                if(this.detailObj.length == 0 ){
                    this.popMsg = '등록복사할 검사를 선택해주세요.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }else{
                    this.detailObj['clickYn']=true;
                    this.$root.$emit('bv::show::modal', 'AcceptanceWrite');
                }
                */
                if(!row) {
                    this.alert('등록복사할 검사를 선택해주세요.');
                    // this.popMsg = '등록복사할 검사를 선택해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                } else {
                    this.detailObj['clickYn']=true;
                    this.$root.$emit('bv::show::modal', 'accpList_AcceptanceWrite');
                }
            },
            insertSignChk :function(){
                this.popMsg = '';
                const row = this.mySheet.getRowsByChecked('selectYn')[0];
                
                /*
                if(this.detailObj.length == 0 ){
                    this.popMsg = '결재상신할 검사를 선택해주세요.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }
                if(this.detailObj.length > 0 && this.detailObj[0].testStatus == 'REGT'){
                    this.popMsg = '검사 결과가 입력되지 않았습니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }
                if(this.detailObj.length > 0 && (this.detailObj[0].testStatus == 'APRV'||this.detailObj[0].testStatus == 'APVL')){
                    this.popMsg = '결재중이거나 결재가 완료된 검사입니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }
                */
                if(!row) {
                    this.alert('결재상신할 검사를 선택해주세요.');
                    // this.popMsg = '결재상신할 검사를 선택해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }
                if(row.status == 'REGT'){
                    this.alert('검사 결과가 입력되지 않았습니다.');
                    // this.popMsg = '검사 결과가 입력되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }
                if(row.status == 'APRV'|| row.status == 'APVL'){
                    this.alert('결재중이거나 결재가 완료된 검사입니다.');
                    // this.popMsg = '결재중이거나 결재가 완료된 검사입니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }
               
                if(this.popMsg == ''){
                    this.approve.mainCodeId     = this.detailObj[0].mainCodeId;
                    this.approve.midCodeId      = this.detailObj[0].midCodeId;
                    this.approve.docSeq         = this.detailObj[0].docSeq;
                    this.approve.siteMstrId     = this.siteMstrId ? this.siteMstrId : null;

                    this.approve.requestId      = this.detailObj[0].mtrlAccpTsId;
                    this.approve.fileType       = 'MeterialMngt';
                    // temporary
                    this.approve.docName        = '인수검사';
                    this.$bvModal.show('acceptanceApproveModal');

                    // this.confirmUse = true;
                    // this.popMsg = '결재상신하시겠습니까?';
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    // return;
                    // this.insertSign();
                }
            },
            insertSign: async function(){//결재상신
                const urls = {
                    docSeq: '/sendApi/api/docNum/selectDocNumSeq',
                    approveDoc: '/sendApi/api/approv/approvedDoc/write',
                    setAcceptInfo: '/sendApi/api/quality/materialSiteCheck/acceptTest/change',
                }

                const payload = {
                    siteMstrId: this.siteMstrId,
                    codeType: 'MTRL',
                    codeDtlType: 'TSAC',
                    gjmcd: this.detailObj[0].mainCodeId,
                    gjscd: this.detailObj[0].midCodeId,
                    aprvOptnType: this.detailObj[0].aprvOptnType,
                    docType: this.detailObj[0].docSeq,
                }
                
                // //console.log(payload);
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
                        axios.post(
                            urls.approveDoc, 
                            {
                                dmApprvDoc: {
                                    ...payload,
                                    // docSeq: response.data,
                                },
                            }, 
                            options)
                            .then(aprvRes => {
                                axios.post(
                                    urls.setAcceptInfo,
                                    {
                                        ...payload,
                                        // docSeq: response.data,
                                        ...aprvRes.data.datas.dmApprvDoc,
                                        //
                                        mtrlAccpTsId : this.detailObj[0].mtrlAccpTsId, 
                                        testStatus : 'APRV',
                                        apprJdmt: 'PASS',
                                    },
                                    options                                    
                                    )
                                    .then(setCrackInfoRes => {
                                        
                                        //console.log(setCrackInfoRes)
                                        
                                        this.alert('결재상신 되었습니다.',()=>{
                                            this.fetchAccptTestList(this.currentTab);
                                        });
                                        return;
                                        // this.popMsg = '결재상신 되었습니다.';
                                        // this.confirmUse = false;
                                        // this.insertSignYn = true;
                                        // this.signYn = false;
                                        // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                    })
                                    .catch(error => {
                                        //console.error(error)

                                        this.alert('결재상신에 실패했습니다.');
                                        // this.popMsg = '결재상신에 실패했습니다.';
                                        // this.confirmUse = false;
                                        // this.insertSignYn = false;
                                        // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                        return;
                                    })

                            })
                            .catch(error => {
                                // throw new Error(error)
                                //console.error(error)

                                // this.popMsg = '결재상신에 실패했습니다.';
                                // this.confirmUse = false;
                                // this.insertSignYn = false;
                                // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                this.alert('결재상신에 실패했습니다.');
                                return;
                            })
            },
            fn_setSourceApproval: function (payload) {
                //console.log(payload)

                const url = '/sendApi/api/quality/materialSiteCheck/acceptTest/change';
                const _payload = {
                    ...payload,
                    mtrlAccpTsId: this.detailObj[0].mtrlAccpTsId,
                    testStatus: 'APVL',
                    // apprJdmt: 'PASS',
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(url, _payload, options)
                .then(res => {
                    //console.log(res)

                    // this.popMsg = '결재상신 되었습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = true;
                    // this.signYn = false;
                    this.detailObj = [];
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    this.alert('결재상신 되었습니다.',()=>{
                        this.fetchAccptTestList(this.currentTab);
                    });
                    return;
                })
                .catch(error => {
                    //console.error(error)
                    this.alert('결재상신에 실패했습니다.');
                    // this.popMsg = '결재상신에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                })
            },
            addAcceptance: function(rst){//신규등록팝업 닫힌후
                this.insertRst = rst;
                // if(this.insertRst){
                    // this.createSheetLst();
                    this.fetchAccptTestList(this.currentTab)
                // }
                this.$root.$emit('bv::hide::modal', 'accpList_AcceptanceWrite');
            },
            changeAmountClose: function(rst2){
                this.insertRst = rst2;
                this.$root.$emit('bv::hide::modal', 'accpList_QuantityChange');
                // this.createSheetLst();
                this.fetchAccptTestList(this.currentTab)
            },
            alertConfirmFn:function(){
                if(this.insertSignYn == true){
                    this.insertSignYn = false;
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    // this.createSheetLst();
                    this.fetchAccptTestList(this.currentTab)
                    return;
                }
                if(this.confirmUse){
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    this.insertSign();
                    return;
                }
                if(this.confirmUse == false){
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    return;
                }
                if(this.insertSignYn == false){
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    return;
                }
            },
            closePop:function(){
                this.$root.$emit('bv::hide::modal', 'accpLstAlert');
            },
            mergeProgressBar (evtParam) {//진황상황그래프 merge
                const options = {
                    key: 'mtrlAccpTsId',
                    startColumnName: 'testStatus',
                    endColumnName: 'testStatus4',
                }
                
                const allRows = evtParam.sheet.getDataRows();

                let compare = allRows[0]
                for (let i = 0; i < allRows.length; i++) {
                    if (compare[options.key] !== allRows[i][options.key]) {
                        evtParam.sheet.setMergeRange(compare, options.startColumnName, allRows[i-1], options.endColumnName)
                        compare = allRows[i]
                    }

                    if (i === allRows.length -1 ) {
                        evtParam.sheet.setMergeRange(compare, options.startColumnName, allRows[i], options.endColumnName)
                    }
                }
                evtParam.sheet.hideCol('mtrlAccpTsId');
                this.$nextTick(() => {
                    evtParam.sheet.blur(0);
                })
            },
            fnClick: function(evt){
                if(evt.col == 'selectYn'){//라디오버튼 이벤트
                    // console.log(evt.row);
                    let tempLst = {};
                    tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                    tempLst['mtrlSpApprSubId'] = evt.row.mtrlSpApprSubId;
                    tempLst['mtrlAccpTsId'] = evt.row.mtrlAccpTsId;
                    tempLst['testStatus'] = evt.row.status;
                    tempLst['mainCodeId'] = evt.row.mainCodeId;
                    tempLst['midCodeId'] = evt.row.midCodeId;
                    tempLst['aprvOptnType'] = evt.row.aprvOptnType;
                    tempLst['docSeq'] = evt.row.docSeq;

                    let array = evt.sheet.getMergeRange(evt.row,"docSeq");
                    let start = evt.sheet.getRowIndex(array[0]);
                    let end = evt.sheet.getRowIndex(array[2]);
                    let ids = [];
                    for(let x = start; x<=end; x++){
                        ids.push(evt.sheet.getRowByIndex(x).mtrlSpApprSubId);
                    }
                    tempLst['mtrlSpApprSubIds'] = ids;
                    this.detailObj[0] = tempLst;
                    //console.log(this.detailObj[0]);
                }
                if(evt.col == "changeAmount" && evt.event.target.tagName == "BUTTON"){ // 물량변경팝업
                    if(!this.checkUser(this.userId,'write')){
                        return;
                    }
                    this.mtrlAccpTsId = evt.row.mtrlAccpTsId;
                    this.docSeq = evt.row.docSeq;
                    this.bindStatus = evt.row.status;
                    this.$refs.Quantity.btnYn = this.checkUser(this.userId,'write')
                    this.$root.$emit('bv::show::modal', 'accpList_QuantityChange')
                }
                // if(evt.col == "insertYn" && evt.event.target.tagName == "BUTTON" && evt.row.insertYn == '0'){
                if(evt.col == "insertYn" && evt.event.target.tagName == "BUTTON"){
                    if(!this.checkUser(this.userId,'view')){
                        return;
                    }
                    let tempLst = {};
                    tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                    tempLst['mtrlAccpTsId'] = evt.row.mtrlAccpTsId;
                    // tempLst['mtrlSpApprSubId'] = evt.row.mtrlSpApprSubId;
                    this.detailObj[0] = tempLst;
                    //console.log(this.detailObj);
                    this.$router.push({
                        name : 'AcceptTestResultWrite',
                        params: {
                            'mtrlSpApprId' : evt.row.mtrlSpApprId,
                            'mtrlAccpTsId' : evt.row.mtrlAccpTsId,
                            'siteMstrId' :evt.row.siteMstrId,
                            'status' : evt.row.status,
                            'mainCodeId': evt.row.mainCodeId,
                            'midCodeId': evt.row.midCodeId,
                        }
                    });
                }
            },
            fnDblClick : function(evt){
                if(!this.checkUser(this.userId,'view')){
                    return;
                }
                if(evt.col != "changeAmount" && evt.col != "selectYn"){
                    let tempLst = {};
                    tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                    tempLst['mtrlAccpTsId'] = evt.row.mtrlAccpTsId;
                    // tempLst['mtrlSpApprSubId'] = evt.row.mtrlSpApprSubId;
                    this.detailObj[0] = tempLst;
                    //console.log(this.detailObj);
                    this.$router.push({
                        name : 'AcceptTestResultWrite',
                        params: {
                            'mtrlSpApprId' : evt.row.mtrlSpApprId,
                            'mtrlAccpTsId' : evt.row.mtrlAccpTsId,
                            'siteMstrId' :evt.row.siteMstrId,
                            'testStatus' : evt.row.status,
                            'mainCodeId': evt.row.mainCodeId,
                            'midCodeId': evt.row.midCodeId,
                        }
                    });
                }
            },
            fnSecondClick: function(evt){
                // if(evt.col == 'selectYn'){//라디오버튼 이벤트
                //     //console.log(evt.row.mtrlSpApprId);
                //     let tempLst = {};
                //     tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                //     tempLst['mtrlSpApprSubId'] = evt.row.mtrlSpApprSubId;
                //     this.detailObj[0] = tempLst;
                // }
                // if(evt.col == "changeAmount" && evt.event.target.tagName == "BUTTON"){ // 물량변경팝업
                //     this.$root.$emit('bv::show::modal', 'QuantityChange')
                // }
                if(evt.col == "insertYn" && evt.event.target.tagName == "BUTTON"){
                    let tempLst = {};
                    tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                    tempLst['mtrlAccpTsId'] = evt.row.mtrlAccpTsId;
                    // tempLst['mainName']=evt.row.mainName;
                    // tempLst['midName']=evt.row.midName;
                    // tempLst['prdtNm']=evt.row.prdtNm;
                    // tempLst['prdtDtl']=evt.row.prdtDtl;
                    // tempLst['stnd']=evt.row.stnd;
                    // tempLst['spprNm']=evt.row.spprNm;
                    // tempLst['mnft']=evt.row.mnft;
                    // tempLst['designAmt']=evt.row.designAmt;
                    // tempLst['designAmt']=evt.row.designAmt;//설계량 단위
                    // tempLst['total']=evt.row.total;
                    // tempLst['mtrlSpApprSubId'] = evt.row.mtrlSpApprSubId;
                    this.detailObj[0] = tempLst;

                    // this.$router.push({name : 'AcceptTestResultWrite', params: {mtrlAccpTsId : evt.row.mtrlAccpTsId}});
                    this.$store.dispatch('setInformation', {
                        mtrlSpApprId : evt.row.mtrlSpApprId,
                        mtrlAccpTsId : evt.row.mtrlAccpTsId,
                        siteMstrId: evt.row.siteMstrId,
                    })

                    let blankTemp = this.$router.resolve({
                        name : 'AcceptTestResultAllSite',
                    });
                    window.open(blankTemp.href,'_blank');
                }
            },
            allSiteDblClick: function(evt){
                if(evt.col != "insertYn"){
                    let tempLst = {};
                    tempLst['mtrlSpApprId'] = evt.row.mtrlSpApprId;
                    tempLst['mtrlAccpTsId'] = evt.row.mtrlAccpTsId;
                    this.detailObj[0] = tempLst;

                    this.$store.dispatch('setInformation', {
                        mtrlSpApprId : evt.row.mtrlSpApprId,
                        mtrlAccpTsId : evt.row.mtrlAccpTsId,
                        siteMstrId: evt.row.siteMstrId,
                    })

                    let blankTemp = this.$router.resolve({
                        name : 'AcceptTestResultAllSite',
                    });
                    window.open(blankTemp.href,'_blank');
                }
            },
            selectChange: function(){
                let a = this.categoryList.indexOf(this.mainCodeId);
                //console.log(a);
                this.midCodeId = ''  // 세부공종 초기화
                this.categoryDataSub = this.categoryData[a].midCodeList;
                //console.log(this.categoryDataSub);
            },
            print:function(){
                if(this.currentTab == 0){
                    this.mySheet.doPrint({
                        menu: 2,
                    });
                }else{
                    // this.allSheet.doPrint();
                    this.allSheet.doPrint({
                        menu: 2,
                    });
                }
            },
            openPop:function(){
                this.detailObj = [];
                this.$root.$emit('bv::show::modal', 'accpList_AcceptanceWrite');
            },
            ozOpen(pageType) {
                if(pageType != null && pageType !== '') {
                    if(pageType === 'KS_INFO') {
                        // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                        this.ozReport.src = this.$store.getters['auth/getOzTypeList'][11].jspNm
                        + '&siteMstrId='+ this.siteMstrId
                        //console.log(this.ozReport)
                        window.open(this.ozReport.src, '_blank')
                    } else {
                        const row = this.mySheet.getRowsByChecked('selectYn')[0];
                        if(!row) {
                            this.alert('선택된 행이 없습니다.');
                            // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                            return;
                        }else if(row.status != 'APRV'){
                            this.alert(`결재 완료 되지 않은 항목은 \n 출력이 불가능합니다.`);
                            return;
                        }
                        //console.log("row" , this.ozData)
                        // let aprvInfoIds = "";
                        // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                        this.ozReport.src = this.$store.getters['auth/getOzTypeList'][7].jspNm
                        + '&pageType=' + pageType
                        + '&siteMstrId='+ this.siteMstrId
                        + '&mtrlAccpTsId='+ row.mtrlAccpTsId;
                        //console.log(this.ozReport)
                        window.open(this.ozReport.src, '_blank')
                    }
                }
            },
            accpOzReport:function(){
                let row = this.mySheet.getRowsByChecked('selectYn')[0];
                if(!row) {
                    this.alert(`선택된 행이 없습니다.`);
                    return;
                } else if(row.status != 'APRV'){
                    this.alert(`결재 완료 되지 않은 항목은 \n 출력이 불가능합니다.`);
                    return;
                }else{
                    //console.log(row);
                    // let url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH;
                    let url2 = this.$store.getters['auth/getOzTypeList'][12].jspNm
                    let url3 = url2+ '&siteMstrId='+this.siteMstrId
                                   +'&mtrlAccpTsId='+row.mtrlAccpTsId;
                    window.open(url3, '_blank')
                }
            },
            fn_exportExcel(sheet){
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['selectYn'].includes(item.Name) && !['insertYn'].includes(item.Name) && !['changeAmount'].includes(item.Name)))
                }
                this.excelDownload.fileName  = `인수검사_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
                // let sheet = null;
                // if(this.currentTab == 0){
                //     sheet = this.mySheet;
                // }else{
                //     sheet = this.allSheet;
                // }
                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `인수검사_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            // bringCompany: async function(){//공급업체 select box 데이터 가져오기
            //     requestOptions.headers['Accept-Language'] = "ko";
            //     requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            //     let url = '/sendApi/api/concrete/supplier/view';
            //     let param = {
            //         "siteMstrId": this.$cookies.get("siteMstrId"),
            //     };

            //     const res_data = await sendPostApi(url, param).then((result) => {
            //         return result.data;
            //     }).catch((e) => {
            //         // //console.log(e);
            //         return e.response.data;
            //     });

            //     if(typeof(res_data) != 'undefined' && res_data.data.length>0){
            //         this.tradeList = res_data.data;
            //     }
            // },
            // resetSubParam: function(){
            //     this.subSppr = '';
            //     this.subStnd = '';
            //     this.subMnft = '';
            //     this.subPrdtNm = '';
            //     this.subMidCode = '';
            //     this.resetSubParam = '';
            //     this.frtyExDt = '';     //검사예정일
            // },
            // async getGridData (param) {
            //     const payload = {
            //         ...param
            //     }
                
            //     const response = await API.getProjectDetailList(payload)
            //     // //console.log(response)

            //     if (response.status === 200 && response.data) {

            //         this.grid.data = response.data.data

            //         this.grid.data.forEach(item => {
            //             item.acceptCheckListYn = item.acceptCheckListCount > 0 ? '1' : '0'
            //             item.factoryCheckListYn = item.factoryCheckListCount > 0 ? '1' : '0'
            //         })
                    
            //         this.grid.grid.loadSearchData({
            //             data: this.grid.data,
            //             append: false
            //         })
            //     }

            //     this.grid.grid.blur()

            // },
            hiddenCol(e){
                this.hiddenCheck = e.target.checked

                this.fetchAccptTestList(this.currentTab)
            }   
        }
    }
</script>