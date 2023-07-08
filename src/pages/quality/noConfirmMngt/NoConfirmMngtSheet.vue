<template>
    <section class="tab_contents">
        <!--<h2 class="sub_title">부적합관리 > 부적합 List</h2>-->
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area submenu_on" v-show="currentTab == 0">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="6%">
                        <col width="23%">
                        <col width="6%">
                        <col width="23%">
                        <col width="6%">
                        <col width="23%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>       
                            <th>구분</th>
                            <td>
                                <select name="" id="" class="form_control" v-model="search.box.noCnfmType">
                                    <option value="" selected>전체</option>
                                    <option value="CAR" >시정조치보고서(CAR)</option>
                                    <option value="NCR" >부적합보고서(NCR)</option>
                                    <option value="Punch" >현지시정조치보고서(Punch)</option>
                                </select>
                            </td>                                
                               
                            <th>공종</th>
                            <td>
                                <select
                                    v-model="search.box.mainCodeId"
                                    class="form_control"
                                >
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
                                    v-model="search.box.midCodeId"
                                    class="form_control"
                                >
                                    <option value="">전체</option>
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
                                <button type="button" class="btn_reset" v-on:click="clearOptionMySite()">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="searchMySite()">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>부적합 번호</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search.box.docSeq" @keyup.enter="searchMySite()"></td>          
                            <th>제목</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search.box.title" @keyup.enter="searchMySite()"></td>       
                            <th>진행상황</th>
                            <td>
                                <select name="" id="" class="form_control" v-model="search.box.noCnfmStatus">
                                    <option value="" selected>전체</option>
                                    <option
                                        v-for="status in noCnfmStatusList.filter(item => item.codeVal != 'APVL2')"
                                        :key="status.masterCodeId"
                                        :value="status.codeVal"
                                    >
                                        {{ status.codeNameKr }}
                                    </option>
                                </select>
                            </td> 
                        </tr>
                        <tr>
                            <th>업체명</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search.box.actnComp" @keyup.enter="searchMySite()"></td>                           
                            <th>발행일</th>
                            <td>
                                <date-picker-range v-model="issueDate"/>
                            </td>
                            <th>조치요구일</th>
                            <td>
                                <date-picker-range v-model="closeDt"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <tree-category-tab
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedTabCheckedList"
                :currentTab="currentTab"
            />
            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" v-if="this.checkUser(this.userId,'down')" @click="fn_exportExcel(noCnfmInfoSheet)">엑셀 다운로드</button>
                        <button type="button" class="btn btn_sm btn_darkgray" v-if="this.checkUser(this.userId,'view') && !ozOpenCheck" @click="ozOpen">부적합 시정조치 보고서</button>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fnUnuse()" v-if="userType === 'HEC' && this.checkUser(this.userId,'unuse')">삭제</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fnIncongruityWrite" v-if="userType === 'HEC' && this.checkUser(this.userId,'write')">등록</button>
                            <button type="button" class="btn btn_sm btn_darkblue" @click="clickApproval"  v-if="userType === 'HEC' && this.checkUser(this.userId,'write')">결재상신</button>
                        </div>
                    </div>
                    
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 370px)'}">
                        <div id="NoConfirmMngtSheet_sheetTable" class="ibsheet_table" style="height: 100%;"></div>
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
                        <col width="23%">
                        <col width="5%">
                        <col width="23%">
                        <col width="6%">
                        <col width="23%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>프로젝트명</th>       
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search2.box.projectNm" @keyup.enter="searchAllSite()"></td>
                            <th>구분</th>
                            <td>
                                <select name="" id="" class="form_control" v-model="search2.box.noCnfmType">
                                    <option value="" selected>전체</option>
                                    <option value="CAR" >시정조치보고서(CAR)</option>
                                    <option value="NCR" >부적합보고서(NCR)</option>
                                    <option value="Punch" >현지시정조치보고서(Punch)</option>
                                </select>
                            </td>                                
                            <th>부적합 번호</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search2.box.docSeq" @keyup.enter="searchAllSite()"></td>           
                            <td class="ar">
                                <button type="button" class="btn_reset" v-on:click="clearOptionAllSite()">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="searchAllSite()"> 검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>공종</th>
                            <td>
                                <select
                                    v-model="search2.box.mainCodeId"
                                    class="form_control"
                                >
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
                                    v-model="search2.box.midCodeId"
                                    class="form_control"
                                >
                                    <option value="">전체</option>
                                    <option
                                        v-for="category in getMidCategoryList()"
                                        :key="category.midCodeId"
                                        :value="category.midCodeId"
                                    >
                                        {{ category.midName }}
                                    </option>
                                </select>    
                            </td>       
                            <th>제목</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search2.box.title" @keyup.enter="searchAllSite()"></td>       
                        </tr>
                        <tr>
                            <th>진행상황</th>
                            <td>
                                <select name="" id="" class="form_control" v-model="search2.box.noCnfmStatus">
                                    <option value="" selected>전체</option>
                                    <option
                                        v-for="status in noCnfmStatusList"
                                        :key="status.masterCodeId"
                                        :value="status.codeVal"
                                    >
                                        {{ status.codeNameKr }}
                                    </option>
                                </select>
                            </td> 
                            <th>업체명</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search2.box.actnComp" @keyup.enter="searchAllSite()"></td>                           
                        </tr>
                        <tr>
                            <th>발행일</th>
                            <td>
                                <date-picker-range v-model="issueDate2"/>
                                <!-- <DatepickerRange ref="issueDate3" v-on:value-change="dateRangeChange3" v-on:value-reset="dateRangeReset3"/> -->
                            </td>
                            <th>조치요구일</th>
                            <td>
                                <date-picker-range v-model="closeDt2"/>
                                <!-- <DatepickerRange ref="datepickerRange4" v-on:value-change="dateRangeChange4" v-on:value-reset="dateRangeReset4"/> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <tree-category-tab
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedTabCheckedList"
                :currentTab="currentTab"
            />
            
            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" v-if="this.checkUser(this.userId,'down')" @click="fn_exportExcel(noCnfmInfoAllSheet)">엑셀 다운로드</button>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 370px)'}">
                        <div id="NoConfirmMngtSheet_sheetAllTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>

            <PopAlert
                v-bind:msg="popMsg" v-bind:popId="popId" v-bind:confirm-use="confirmUse"
                v-on:first-btn-fn="closePop"
            />
            <NoConfirmWiteModal
                v-bind:popId="noConfirmId"
                v-bind:viewType="viewType"
                v-bind:noCfrmType="noCfrmType"
                v-bind:siteMode="siteMode"
                v-bind:noCnfmInfoId="noCnfmInfoId"
                v-on:sheet-create="sheetCreate"
                @callback="fn_sheetCrate"
            />
            <approve
                ref-id="NoConfirmMngtApproveModal"
                doc-type="NCFM"
                :code-type="approve.codeType"
                :code-dtl-type="approve.codeDtlType"
                :doc-seq="approve.docSeq"
                :request-id="approve.requestId"
                :doc-name="approve.docName"
                :file-type="approve.fileType"
                :site-mstr-id="approve.siteMstrId"
                :doc-title="approve.inputTitle"
                @callback="fn_setSourceApproval"
                alertable
            />
            <excel-download
                v-model="excelDownload.request"
                ref-id="NoCnfirmMngtSheet_ExcelDownload"
                :file-name="excelDownload.fileName"
                :options="excelDownload.options"
                :data="excelDownload.data"
            />
            
        </div>

        <b-modal id="IncongruityWrite" title="부적합 등록" 
            hide-backdrop size="lg" hide-footer
            :footer-bg-variant="footerBg" >
            <template #default>
                <div class="pop_container">
                    <div class="lst_detail">
                        <h3 class="subject">발행하실 종류는 선택하여 주세요.</h3>
                        <dl @click="popupView('CAR', 'write')">
                            <dt>시정조치보고서(CAR)</dt>
                            <dd>
                                <ul>
                                    <li>동일하거나 유사한 부적합 사항이 반복적으로 발생하는 경우</li>
                                    <li>품질시스템과 관련된 요건 또는 절차의 미준수 시</li>
                                    <li>종결 결과 불만족 시</li>
                                    <li>기타 품질관리 쳬계의 개선 또는 품질 문제의 근본적인 원인을 규명 하여 제거할 필요가 있는 경우</li>
                                    <li>현장소장 결재 必</li>
                                </ul>
                            </dd>
                        </dl>
                        <dl @click="popupView('NCR', 'write')">
                            <dt>부적합보고서(NCR)</dt>
                            <dd>
                                <ul>
                                    <li>규정된 요건을 위배하는 부적합 품목(또는 사항)을 발견하는 경우 <br> (Punch 발행 기준 보다 규정된 요구사항의 위배 정도가 중대한 경우)</li>
                                    <li>현장소장 결재 必</li>
                                </ul>
                            </dd>
                        </dl>
                        <dl @click="popupView('Punch', 'write')">
                            <dt>현지시정조치보고서(Punch)</dt>
                            <dd>
                                <ul>
                                    <li>부적합의 처리방안에 대해 기술 타당성 검토가 필요없거나</li>
                                    <li>즉시 시정조치하여 규정된 요건 만족시</li>
                                    <li>NCR 발행요건보다 부적합 내용이 경미한 경우</li>
                                    <li>담당자 전결</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                </div>
            </template>
        </b-modal>
    </section>
</template>

<script>
    import loader from '@ibsheet/loader'
    // import DatepickerRange from '../../common/popup/DatepickerRange.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import TreeCategoryTab from '@/pages/quality/materialMngt/component/TreeCategoryTab'
    
    import { sendPostApi, requestOptions } from '@/apis/common';
    import { IncongruityList, IncongruityList2 } from '../../common/data/MaterialsList'

    import NoConfirmWiteModal from '@/pages/common/popup/NoConfirmWiteModal.vue'
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'

    import Approve from '@modal/approval/Approve.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
    import { mapGetters } from 'vuex'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

    import { commonFn } from '@/script/commonFn.js';
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    import axios from 'axios'

    let mySheet = '';
    let allSheet='';

    export default {
        name: 'NoConfirmMngtSheet',
        components: {
            DatePickerRange,
            TreeCategoryTab,
            PopAlert,
            NoConfirmWiteModal,
            Approve,
            Breadcrumb,
            ExcelDownload
        },
        mixins: [MsgBoxMixins, authCheckMixns],
        computed: {
            //유저정보
            ...mapGetters({
                userId: 'auth/getUserId',
                userNm: 'auth/getUserNm',
                userType: 'auth/getUserType',
            }),
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
                categoryData: [],
                noCnfmStatusList : [],
                popId : 'NoConfirmSheetAlert',
                popMsg: '',
                noConfirmId : 'NoConfirmWiteModal',
                noCfrmType : 'write',
                viewType : '',
                noCnfmInfoId : '',
                confirmUse: false,
                siteMstrId:'',
                noCnfmInfoSheet : null,
                noCnfmInfoAllSheet : null,
                siteMode : '',
                search: {
                    tab: {
                        useCheckBox: false,
                        data: null
                    },
                    box: {
                        mngtType: '',
                        projectNm: '',
                        prdtNm: '',
                        mainCodeId: '',
                        midCodeId: '',
                        status: '',
                        stnd: '',
                        sppr: '',
                        mnft: '',
                        apprResult: '',
                        noCnfmType : '',
                        docSeq : '',
                        title : '',
                        noCnfmStatus : '',
                        actnComp : '',
                    }
                },
                search2: {
                    box: {
                        mngtType: '',
                        projectNm: '',
                        prdtNm: '',
                        mainCodeId: '',
                        midCodeId: '',
                        status: '',
                        stnd: '',
                        sppr: '',
                        mnft: '',
                        apprResult: '',
                        noCnfmType : '',
                        docSeq : '',
                        title : '',
                        noCnfmStatus : '',
                        actnComp : '',
                    }
                },
                mainCodeId: '',
                midCodeId: '',
                mainCodeId2: '',
                midCodeId2: '',
                popup : {
                    msg : '',
                },
                approve: {  // 결재상신
                    codeType: 'NCFM',
                    codeDtlType: null,
                    docSeq: null,
                    docName: null,
                    fileType: null,
                    siteMstrId: null,
                    inputTitle: null,
                },
                ozReport : {    //oz
                    noCnfmInfoId : '',
                    aprvInfoId : '',
                    aprvInfoId2 : '',
                    src : '',
                },
                ozOpenCheck : false,
                issueDate : [],
                closeDt : [],
                issueDate2 : [],
                closeDt2 : [],

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
        mounted() {
            if(this.userType ==='PTNR') {
                this.tabs = ['My Site'] 
            }
            if (this.$route.params.noCnfmStatus){
                this.search.box.noCnfmType   = this.$route.params.noCnfmType
                this.search.box.noCnfmStatus = this.$route.params.noCnfmStatus
            }
            this.getCategoryData();
            this.getOptionData();
            this.sheetCreate();
            this.allSheetCreate();
        },
        beforeDestroy() {
            // loader.removeSheet(mySheet);
            // loader.removeSheet(allSheet);

            // if (this.noCnfmInfoSheet) loader.removeSheet(this.noCnfmInfoSheet)
            if (this.noCnfmInfoSheet) this.noCnfmInfoSheet.dispose()
            if (this.noCnfmInfoAllSheet) this.noCnfmInfoAllSheet.dispose()
        },
        watch:{
            currentTab:function(){
                this.filterReset();
                this.sheetCreate();
            }
        },
        methods: {
            clearOptionMySite(){
                this.search.box.mngtType =  '';
                this.search.box.projectNm =  '';
                this.search.box.prdtNm =  '';
                this.search.box.mainCodeId =  '';
                this.search.box.midCodeId =  '';
                this.search.box.status =  '';
                this.search.box.stnd =  '';
                this.search.box.sppr =  '';
                this.search.box.mnft =  '';
                this.search.box.apprResult =  '';
                this.search.box.noCnfmType  =  '';
                this.search.box.docSeq  =  '';
                this.search.box.title  =  '';
                this.search.box.noCnfmStatus  =  '';
                this.search.box.actnComp  =  '';
                this.issueDate = [];
                this.closeDt = [];
                // this.startDate = '';
                // this.endDate = '';
                // this.startDate2 = '';
                // this.endDate2 = '';
                // this.$refs.datepickerRange.valueReset(); //DatepickerRange valueReset 함수 호출
                // this.$refs.datepickerRange2.valueReset(); //DatepickerRange valueReset 함수 호출
                this.ozReport.noCnfmInfoId = '';
                this.ozReport.src = '';
                this.ozOpenCheck = false;
            },
            clearOptionAllSite(){
                this.search2.box.mngtType =  '';
                this.search2.box.projectNm =  '';
                this.search2.box.prdtNm =  '';
                this.search2.box.mainCodeId =  '';
                this.search2.box.midCodeId =  '';
                this.search2.box.status =  '';
                this.search2.box.stnd =  '';
                this.search2.box.sppr =  '';
                this.search2.box.mnft =  '';
                this.search2.box.apprResult =  '';
                this.search2.box.noCnfmType  =  '';
                this.search2.box.docSeq  =  '';
                this.search2.box.title  =  '';
                this.search2.box.noCnfmStatus  =  '';
                this.search2.box.actnComp  =  '';
                this.issueDate2 = [];
                this.closeDt2 = [];
                // this.startDate3 = '';
                // this.endDate3 = '';
                // this.startDate4 = '';
                // this.endDate4 = '';
                // this.$refs.datepickerRange3.valueReset(); //DatepickerRange valueReset 함수 호출
                // this.$refs.datepickerRange4.valueReset(); //DatepickerRange valueReset 함수 호출
                this.ozReport.noCnfmInfoId = '';
                this.ozReport.src = '';
                this.ozOpenCheck = false;
            },
            getCategoryData : async function () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'NCFM' };
                
                try {
                    const { data } = await sendPostApi(url, param);
                    this.categoryData = data.list;
                } catch (error) {
                    console.log(error.response.data)
                }
            },
            getOptionData : async function () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/noCnfmMngt/getOptions';
                let param = {};
                try {
                    const { data } = await sendPostApi(url, param);
                    this.issueTypeList = data.issueType;
                    this.causeList = data.causeList;
                    this.noCnfmStatusList = data.noCnfmStatusList;
                } catch (error) {
                    console.log(error.response)
                }
            },
            sheetCreate: async function() {
            
                this.siteMstrId = this.$cookies.get("siteMstrId");
                
                if(this.siteMstrId == null){
                    this.siteMstrIdYn = true;
                    this.alert('현장정보 아이디가 없습니다.\n 다시 로그인해주세요')
                    // this.popMsg = '현장정보 아이디가 없습니다.\n 다시 로그인해주세요';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'listAlert');
                } else {
                    let param = {};
                    let url = '/sendApi/api/noCnfmMngt/noCnfmInfo/list';
                    param['siteMstrId'] = this.siteMstrId;
                    if(this.userType === "PTNR") {  
                        param['actnUser'] = this.userId;
                    }
                    if(this.search.box.noCnfmType !=''){ //구분
                        param['noCnfmType'] = this.search.box.noCnfmType;
                    }                    
                    if(this.search.box.docSeq !=''){ //부적합 번호
                        param['docSeq'] = this.search.box.docSeq;
                    }
                    if(this.search.box.mainCodeId !=''){//공종
                        param['mainCodeId']=this.search.box.mainCodeId;
                    }
                    if(this.search.box.midCodeId !=''){//세부공종
                        param['midCodeId']=this.search.box.midCodeId;
                    }
                    if(this.mainCodeId !=''){//공종
                        param['mainCodeId']=this.mainCodeId;
                    }
                    if(this.midCodeId !=''){//세부공종
                        param['midCodeId']=this.midCodeId;
                    }
                    if(this.search.box.title !=''){//제목
                        param['title']=this.search.box.title;
                    }
                    if(this.search.box.noCnfmStatus !=''){//진행상황
                        param['noCnfmStatus']=this.search.box.noCnfmStatus;
                        if(this.search.box.noCnfmStatus === 'APVL') param['noCnfmStatus'] +=',APVL2';
                    }
                    if(this.search.box.actnComp !=''){//업체명
                        param['actnComp']=this.search.box.actnComp;
                    }
                    if(this.startDate !=''){//발행일 시작일
                        param['startIssueDt']=this.issueDate[0];
                    }
                    if(this.endDate !=''){//발행일 종료일
                        param['endIssueDt']=this.issueDate[1];
                    }
                    if(this.startDate2 !=''){//조치요구 시작일
                        param['startCloseDt']=this.closeDt[0];
                    }
                    if(this.endDate2 !=''){//조치요구 종료일
                        param['endCloseDt']=this.closeDt[1];
                    }

                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    
                    
                    const resData = await sendPostApi(url, param);
                    //console.log(resData)
                    if(resData.status == '200') {
                        let noConfirmData = resData.data.list;
                        let options = IncongruityList.options;
                        if(noConfirmData.length > 0) {
                            loader.createSheet({
                            el: 'NoConfirmMngtSheet_sheetTable',
                            data: noConfirmData,
                            options: {
                                Cfg:{
                                    NoVScroll : 0,
                                    NoDataMessage:3,
                                },
                                Cols: options.Cols,
                                Events: {
                                    onRenderFinish: this.progressEvt,
                                    ondblclick : this.popopenEvt,
                                    //onAfterChange: this.clickGrid,
                                }
                            }
                            }).then((sheet) => {
                                mySheet = sheet.id;
                                this.noCnfmInfoSheet = sheet;
                                // if(noConfirmData.length <= 0){ 
                                //     sheet.bind('onDataLoad', function (evtParam) {
                                //         console.log(noConfirmData.length)
                                //         var sheet = evtParam.sheet;
                                //         var row = sheet.getFirstRow(); 
                                //         console.log("sheet = ", sheet)
                                //         console.log("row = ", row)
                                        
                                //         row['isSelectedType'] = 'text';
                                //         row['nullSheet'] = '1';
                                //         row.isSelected = '조회된 데이터가 없습니다.';
                                //         sheet.setMergeRange(row, "isSelected", row, "inUserNm"); 
                                //         row = sheet.getNextRow(row); 
                                //     })
                                // }
                            });
                        } else {
                            loader.createSheet({
                            el: 'NoConfirmMngtSheet_sheetTable',
                            data: noConfirmData,
                            options: {
                                Cfg:{
                                    NoVScroll : 0,
                                    NoDataMessage:3,
                                },
                                Cols: options.Cols,
                                Events: {
                                    onRenderFinish: this.progressEvt,
                                    ondblclick : this.popopenEvt,
                                    //onAfterChange: this.clickGrid,
                                }
                            }
                            }).then((sheet) => {
                                mySheet = sheet.id;
                                this.noCnfmInfoSheet = sheet;
                            });
                        }
                        
                    }
                    else{
                        noConfirmData = [];
                    }
                }
            },
            allSheetCreate: async function() {
                
                let param = {};
                let url = '/sendApi/api/noCnfmMngt/noCnfmInfo/list';
                if(this.search2.box.noCnfmType !=''){ //구분
                    param['noCnfmType'] = this.search2.box.noCnfmType;
                }   
                if(this.search2.box.projectNm !=''){ //부적합 번호
                    param['projNm'] = this.search2.box.projectNm;
                }
                if(this.search2.box.docSeq !=''){ //부적합 번호
                    param['docSeq'] = this.search2.box.docSeq;
                }
                if(this.search2.box.mainCodeId !=''){//공종
                    param['mainCodeId']=this.search2.box.mainCodeId;
                }
                if(this.search2.box.midCodeId !=''){//세부공종
                    param['midCodeId']=this.search2.box.midCodeId;
                }
                if(this.mainCodeId2 !=''){//공종
                    param['mainCodeId'] = this.mainCodeId2;
                }
                if(this.midCodeId2 !=''){//세부공종
                    param['midCodeId'] = this.midCodeId2;
                }
                if(this.search2.box.title !=''){//제목
                    param['title']=this.search2.box.title;
                }
                if(this.search2.box.noCnfmStatus !=''){//진행상황
                    param['noCnfmStatus']=this.search2.box.noCnfmStatus;
                    if(this.search2.box.noCnfmStatus === 'APVL') param['noCnfmStatus'] +=',APVL2';
                }
                if(this.search2.box.actnComp !=''){//업체명
                    param['actnComp']=this.search2.box.actnComp;
                }
                if(this.startDate3 !=''){//발행일 시작일
                    param['startIssueDt']=this.issueDate2[0];
                }
                if(this.endDate3 !=''){//발행일 종료일
                    param['endIssueDt']=this.issueDate2[1];
                }
                if(this.startDate4 !=''){//조치요구 시작일
                    param['startCloseDt']=this.closeDt2[0];
                }
                if(this.endDate4 !=''){//조치요구 종료일
                    param['endCloseDt']=this.closeDt2[1];
                }

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                
                const resData = await sendPostApi(url, param);
                let noConfirmData = resData.data.list;
                let options = IncongruityList2.options;

                if(resData.status == '200') {
                    if(noConfirmData.length > 0) {
                        loader.createSheet({
                        el: 'NoConfirmMngtSheet_sheetAllTable',
                        data: noConfirmData,
                        options: {
                            Cfg:{
                                NoVScroll : 0,
                                NoDataMessage:3,
                            },
                            Cols: options.Cols,
                            Events: {
                                onRenderFinish: this.progressEvt,
                                ondblclick : this.popopenEvt,
                                //onAfterChange: this.clickGrid,
                            }
                        }
                        }).then((sheet) => {
                            mySheet = sheet.id;
                            this.noCnfmInfoAllSheet = sheet;
                            // if(noConfirmData.length <= 0){ 
                            //     sheet.bind('onDataLoad', function (evtParam) {
                            //         console.log(noConfirmData.length)
                            //         var sheet = evtParam.sheet;
                            //         var row = sheet.getFirstRow(); 
                            //         console.log("sheet = ", sheet)
                            //         console.log("row = ", row)
                                    
                            //         row['isSelectedType'] = 'text';
                            //         row['nullSheet'] = '1';
                            //         row.isSelected = '조회된 데이터가 없습니다.';
                            //         sheet.setMergeRange(row, "isSelected", row, "inUserNm"); 
                            //         row = sheet.getNextRow(row); 
                            //     })
                            // }
                        });
                    } else {
                        loader.createSheet({
                        el: 'NoConfirmMngtSheet_sheetAllTable',
                        data: noConfirmData,
                        options: {
                            Cfg:{
                                NoVScroll : 0,
                                NoDataMessage:3,
                            },
                            Cols: options.Cols,
                            Events: {
                                onRenderFinish: this.progressEvt,
                                ondblclick : this.popopenEvt,
                                //onAfterChange: this.clickGrid,
                            }
                        }
                        }).then((sheet) => {
                            mySheet = sheet.id;
                            this.noCnfmInfoAllSheet = sheet;
                        });
                    }
                }
                else{
                    noConfirmData = [];
                }
            },
            getMidCategoryList () {
                const selectedCategoryData = this.categoryData.filter(item => item.mainCodeId === this.search.box.mainCodeId)[0]
                return selectedCategoryData ? selectedCategoryData.midCodeList : []
            },

            fnIncongruityWrite() {
                this.$bvModal.show('IncongruityWrite'); 
            },
            popupView : function(type, mode) {
                this.viewType = type;
                this.noCfrmType = mode;
                this.noCnfmInfoId = '';
                this.$bvModal.hide('IncongruityWrite');
                this.$bvModal.show('CarWrite');
                //this.$root.$emit('bv::show::modal', 'CarWrite');
            },
            filterReset: async function() {

            },
            dateRangeChange: function(param){
                this.startDate = param[0];
                this.endDate = param[1];
            },
            dateRangeReset: function(){
                this.startDate = null;
                this.endDate = null;
                // this.$refs.datepickerRange.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            dateRangeChange2: function(param){
                this.startDate2 = param[0];
                this.endDate2 = param[1];
            },
            dateRangeReset2: function(){
                this.startDate2 = null;
                this.endDate2 = null;
                // this.$refs.datepickerRange2.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            dateRangeChange3: function(param){
                this.startDate3 = param[0];
                this.endDate3 = param[1];
            },
            dateRangeReset3: function(){
                this.startDate3 = null;
                this.endDate3 = null;
                // this.$refs.datepickerRange3.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            dateRangeChange4: function(param){
                this.startDate4 = param[0];
                this.endDate4 = param[1];
            },
            dateRangeReset4: function(){
                this.startDate4 = null;
                this.endDate4 = null;
                // this.$refs.datepickerRange4.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            changedTabCheckedList (item) {
                this.search.tab.data = item
                if(this.currentTab === 0) {
                    this.mainCodeId = item.mainCodeId;
                    this.midCodeId = item.midCodeId;
                    this.sheetCreate();
                }
                if(this.currentTab === 1) {
                    this.mainCodeId2 = item.mainCodeId;
                    this.midCodeId2 = item.midCodeId;
                    this.allSheetCreate();
                }
            },
            searchMySite() {
                this.mainCodeId = '';
                this.midCodeId = '';
                this.sheetCreate();
            },
            searchAllSite() {
                this.mainCodeId2 = '';
                this.midCodeId2 = '';
                this.allSheetCreate();
            },
            closePop : function() { //기본 팝업 닫기 event
                if(this.siteMstrIdYn){
                    this.$cookies.remove('Authorization');
                    this.$cookies.remove('projectId');
                    this.$cookies.remove('siteId');
                    this.$router.push({name: 'Login'});
                    return;
                }
                if(this.insertLstYn){
                    this.sheetCreate();
                }
                this.$root.$emit('bv::hide::modal', this.popId);
            },
            progressEvt: function(evtParam) {
                var sheet = evtParam.sheet;
                var row = sheet.getFirstRow(); // 첫번째 row
                var sheetText = ''; 
                var sheetCell; 
                var itemArr = ['REGT', 'APVL', 'PRCS', 'CHCK', 'APVL2', 'APRV'];
                var nameArr = ['작성 중', '결재 중', '처리 중', '확인 중',  '결재 중', '완료'];
                //var orderArr = ['등록', '회신', '확인'];
                var itemNumArr = [1, 33, 40, 80, 90, 100];
                
                while (row != null) { // return row 반복
                    var sheetNum = 0, sheetClass = ''; // 등록, 회신, 확인
                    if(row.noCnfmStatus) {
                        sheetCell = row.noCnfmStatus;
                        itemArr.forEach(function(sVal, sIdx){
                            if(sheetCell === sVal){
                                sheetText = nameArr[sIdx];
                                sheetNum = itemNumArr[sIdx];
                            }
                        })
                        if(sheetCell === 'APRV') { // itemArr[last] 일 경우
                            sheetClass = 'complete';
                        } else if((sheetCell === 'CHCK') && row.etc === 'Y'){ // 지연일경우(임시)
                            sheetClass = 'warning';
                        } else { 
                            sheetClass = '';
                        }
                       
                    } else {
                        sheetText = '';
                        sheetNum = '', sheetClass = '';
                    }
                    var itemEvt = function(item) {
                        (item === 1) ? item += 'px' : item += '%';
                        return item;
                    };
                    
                    var steps = '<div class="guage">'+
                        '<span class="bar_wrap">' +
                            '<span class=\'bar '+sheetClass+'\' style=\'width:'+itemEvt(sheetNum)+';\'></span>' + 
                        '</span>'+
                        '<span class="label" style=\'width:'+sheetNum+'%\'>'+sheetText+'</span>' +
                    '</div>';
                    row.noCnfmStatus = steps;
                    
                    if(row.etc === 'Y') {
                        row.etc = '지연';
                    }
                    sheet.setMergeRange(row, "noCnfmStatus", row, "noCnfmStatus3"); // case10
                    row = sheet.getNextRow(row); // 다음행 return
                }
            },
            fnDblClick: function(evtParam) {
                
            },
            popopenEvt: function(evtParam) {
                let ts = this;
                if(evtParam.col){ 
                    
                    ts.viewType = evtParam.row.noCnfmType;
                    ts.noCfrmType = "modify";
                    if(this.currentTab === 1) {
                        ts.siteMode = "allSite";
                    } else {
                        ts.siteMode = "mySite";
                    }   
                    ts.noCnfmInfoId = evtParam.row.noCnfmInfoId
                    ts.$bvModal.show('CarWrite')
                    //ts.$root.$emit('bv::show::modal', 'CarWrite');
                }
            },
            fnUnuse : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");                
                let url = '/sendApi/api/noCnfmMngt/noCnfmInfo/unUse';
                let param = {}
                const row = this.noCnfmInfoSheet.getRowsByChecked('isSelected')[0];
                
                if(!row) {
                    //console.log(row);
                    this.alert('삭제할 행을 선택해주세요.')
                    return
                } else {
                    if(this.$store.getters['auth/getGroupAuthInfoId'] == "GRAT_0000000009"){
                        this.confirm('삭제하시겠습니까?', async() => {
                            param = {                                        
                                noCnfmInfoId : row.noCnfmInfoId,
                            }
                            const { data } = await sendPostApi(url, param);
                            if(data.data === '0000') {
                                this.alert('삭제되었습니다.', async => {
                                    this.sheetCreate();
                                })
                            }
                        });
                    } else {
                        if(row.inUser == this.userId)  {
                            if(row.noCnfmStatusView === 'REGT') {
                                this.confirm('삭제하시겠습니까?', async() => {
                                    param = {                                        
                                        noCnfmInfoId : row.noCnfmInfoId,
                                    }
                                    const { data } = await sendPostApi(url, param);
                                    if(data.data === '0000') {
                                        this.alert('삭제되었습니다.', async => {
                                            this.sheetCreate();
                                        })
                                    }
                                });
                            } else {
                                this.alert('삭제 불가능한 행입니다.')
                                return
                            }
                            
                        } else {
                            this.alert('삭제 권한이 없습니다.')
                            return
                        }
                    }
                }
            },
            fnApproval : async function(aprvInfoId) {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");                
                let url = '/sendApi/api/noCnfmMngt/noCnfmInfo/change';
                let param = {}
                const row = this.noCnfmInfoSheet.getRowsByChecked('isSelected')[0]
                if(row.noCnfmStatusView === 'REGT') {
                    param = {                                        
                        noCnfmInfoId : row.noCnfmInfoId,
                        aprvInfoId : aprvInfoId,
                        noCnfmStatus : 'APVL'
                    }
                } else if(row.noCnfmStatusView === 'CHCK') {
                    param = {
                        noCnfmInfoId : row.noCnfmInfoId,
                        aprvInfoId2 : aprvInfoId,
                        noCnfmStatus : 'APVL2'
                    }
                }
                try {
                    const { data } = await sendPostApi(url, param);
                    if(data.data === '0000') {
                        this.alert('결재가 상신되었습니다.',  async => {
                            this.sheetCreate();
                        })
                    }
                } catch (error) {
                    console.log(error.response.data)
                }
            
            },
            fn_setSourceApproval: function (payload) {   // 결재상신 성공시 리턴 callback
                if(payload.aprvInfoId !== '') {
                    this.fnApproval(payload.aprvInfoId);
                    this.alert('결재가 상신되었습니다.', async => {
                        this.sheetCreate();
                    })
                    
                }
            },
            clickApproval () {
                // console.log('click approval')
                const row = this.noCnfmInfoSheet.getRowsByChecked('isSelected')[0]
                if(!row) {
                    this.alert('선택된 행이 없습니다.')
                    return
                }

                if(row.noCnfmType === 'Punch') {
                    this.alert('현지시정조치보고서(Punch)는 결재상신을 할 수 없습니다.');
                    return
                }

                if(row.noCnfmStatusView === 'APVL2' || row.noCnfmStatusView === 'APVL') {
                    this.alert('결재가 진행중인 행입니다.')
                    return
                } else if(row.noCnfmStatusView === 'APRV') {
                    this.alert('완료된 행입니다.')
                    return
                } else {
                    this.approve.mainCodeId     = row.mainCodeId
                    this.approve.midCodeId      = row.midCodeId
                    this.approve.siteMstrId     = row.siteMstrId ? row.siteMstrId : null

                    this.approve.requestId      = row.noCnfmInfoId
                    this.approve.fileType       = 'NoConfirmMngt'
                    this.approve.codeType       = 'NCFM'
                    if(row.noCnfmType === 'Punch') this.approve.codeDtlType  = 'PNCH';
                    else this.approve.codeDtlType  = row.noCnfmType;

                    this.approve.docSeq         = row.docSeq
                    // temporary
                    this.approve.docName        = '시정조치보고서'
                    this.approve.inputTitle     = row.title;
                    // console.log(this.approve)
                    this.$bvModal.show('NoConfirmMngtApproveModal')
                }
                
                // popup 결재상신
                // result =  APRV_INFO_ID(결재정보id)
                // ㄴ> result
                // 임시 결재 정보 ID 대신 문서번호..
                // 자재공급원 결재 완료 처리.(param=>APRV_INFO_ID)                
            },
            fn_sheetCrate() {
                //this.sheetCreate();
            },
            // clickGrid(event) {
            //     switch(event.col) {
            //         case this.noCnfmInfoSheet.options.Cols[0].Name : {
            //             // if(event.row.noCnfmType  === 'Punch') {
            //             //     this.ozOpenCheck = true;
            //             // } else {
            //             //     this.ozOpenCheck = false;
            //             // }
            //         }
            //     }
            // },
            ozOpen() {
                const row = this.noCnfmInfoSheet.getRowsByChecked('isSelected')[0];
                // console.log(row)
                if(!row) {
                    this.alert('선택된 행이 없습니다.')
                    return
                } else {
                    // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                    if(!commonFn.methods.isEmpty(row.noCnfmInfoId)) {
                        if(row.noCnfmType === 'NCR') {
                            let urlParam = '';
                            if(!commonFn.methods.isEmpty(row.aprvInfoId)) {
                                urlParam += this.$store.getters['auth/getOzTypeList'][29].jspNm
                                urlParam += `&noCnfmInfoId=${row.noCnfmInfoId}`
                                urlParam += `&aprvInfoId=${row.aprvInfoId}`
                                urlParam += `&siteMstrId=${this.siteMstrId}`
                            } else {
                                urlParam += this.$store.getters['auth/getOzTypeList'][31].jspNm
                                urlParam += `&noCnfmInfoId=${row.noCnfmInfoId}`
                                urlParam += `&siteMstrId=${this.siteMstrId}`
                            }
                            if(!commonFn.methods.isEmpty(row.aprvInfoId2)) {
                                urlParam += `&aprvInfoId2=${row.aprvInfoId2}`
                            }
                            this.ozReport.src = urlParam
                            window.open(this.ozReport.src, '_blank')
                        } else if(row.noCnfmType === 'CAR') {
                            let urlParam = '';
                    
                            if(!commonFn.methods.isEmpty(row.aprvInfoId)) {
                                urlParam += this.$store.getters['auth/getOzTypeList'][28].jspNm
                                urlParam += `&noCnfmInfoId=${row.noCnfmInfoId}`
                                urlParam += `&aprvInfoId=${row.aprvInfoId}`
                                urlParam += `&siteMstrId=${this.siteMstrId}`
                            } else {
                                urlParam += this.$store.getters['auth/getOzTypeList'][30].jspNm
                                urlParam += `&noCnfmInfoId=${row.noCnfmInfoId}`
                                urlParam += `&siteMstrId=${this.siteMstrId}`
                            }
                            if(!commonFn.methods.isEmpty(row.aprvInfoId2)) {
                                urlParam += `&aprvInfoId2=${row.aprvInfoId2}`
                            }
                            this.ozReport.src = urlParam
                            window.open(this.ozReport.src, '_blank')
                        } else if(row.noCnfmType === 'Punch') {
                            this.alert('Punch 항목은 보고서 출력이 불가능합니다.')
                            return
                        }
                    }
                    
                }
                
            },
            /** 엑셀 다운로드 */
            // fn_exportExcel: function (sheet) {
            //     sheet.down2Excel({
            //         merge:      1,                  // 머지된 내용 그대로 출력할 것인지
            //         downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
            //         //downCols:   'noCnfmType|docSeq|mainName|midName|actnComp|title|issueDt|closeDt|replyDt|cnfmDt|inUserNm|etc',
            //         reqHeader:  {
            //                         'Authorization': this.$cookies.get('Authorization'),
            //                         'Accept-Language': 'ko'
            //                     },
            //         fileName:   `부적합관리_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
            //     })
            // },
            fn_exportExcel: function(sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['isSelected'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `부적합관리_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
            },
        }
    }
</script>