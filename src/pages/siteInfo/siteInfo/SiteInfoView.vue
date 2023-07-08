<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <!-- <h2 class="sub_title">{{subTitle}}</h2> -->
        <div class="lst_tabs">
            <ul>
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" v-bind:key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>
        
        <div class="tab_area" v-show="currentTab == 0">     
            <div class="inner">
                <div class="button_box">
                    <button v-if="siteMasterId != '' && siteMasterId != null && checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" v-print="'#mysite_area'">출력</button>
                    <div class="fr">
                        <button v-if="checkUser(userId,'write')" type="button" class="btn btn_md btn_outline btn_darkgray" v-b-modal.projectSelectId>프로젝트 등록</button>
                        <button v-if="siteMasterId != '' && siteMasterId != null && checkUser(userId,'change')" type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="modifyForm">수정</button>
                    </div>
                </div>
                <div id="mysite_area" class="a4">
                    <div class="table_normal_list mt0">
                        <table class="top_table">
                            <colgroup>
                                <col width="148">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span>현장명</span> </th>
                                    <td><span>{{(siteId!=''&&siteId!=null)?'['+siteId+']':''}} {{siteName}}</span></td>
                                </tr>
                                <tr>
                                    <th><span>프로젝트명</span></th>
                                    <td><span>{{(projectId!=''&&projectId!=null)?'['+projectId+']':''}} {{projectName}}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table_normal_list">
                        <table class="w50">
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="148">
                                <col width="*">
                                <col width="148">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colspan="4">공사개요</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>민간/공공</th>
                                    <td>{{publicType == 0? '민간 공사' : (publicType == 1?'공공 공사':'')}}</td>
                                    <th>{{publicType == 0 ? '사업 승인 일자' : (publicType == 1?'입찰 공고 일자':'일자')}}</th>
                                    <td>{{publicType == 0 ? busiApDt :(publicType == 1? bddgNtcDt:'')}}</td>
                                </tr>
                                <tr>
                                    <th>관리여부</th>
                                    <td colspan="3">{{mngtType == 0? '관리':(mngtType == 1? '비관리' : (mngtType == 2?'준공':''))}}</td>
                                </tr>
                                <tr>
                                    <th>본부</th>
                                    <td colspan="3">{{baseType == '4000'? '건축' : (baseType=='1000'?'인프라':'')}}</td>
                                </tr>
                                <tr>
                                    <th>공사유형</th>
                                    <td colspan="3">{{csrtType == 0 ? '공동주택':(csrtType == 1? '일반건축': (csrtType == 2?'공장':(csrtType == 3? '인프라':'')))}}</td>
                                </tr>
                                <tr>
                                    <th>공사기간</th>
                                    <td colspan="3">{{csrtStartDt != '' && csrtStartDt != null? csrtStartDt+' ~ '+csrtEndDt:''}}</td>
                                </tr>
                                <tr>
                                    <th>계약금액</th>
                                    <td colspan="3">{{ctrtAmt != '' && ctrtAmt != null ? ctrtAmt+' '+ctrtType : ''}}</td>
                                </tr>
                                <tr>
                                    <th>공사규모</th>
                                    <td colspan="3">{{csrtSize}}</td>
                                </tr>
                                <tr>
                                    <th>구조</th>
                                    <td colspan="3">{{strc}}</td>
                                </tr>
                                <tr>
                                    <th>주요마감</th>
                                    <td colspan="3">{{mainClose}}</td>
                                </tr>
                                <tr>
                                    <th>연면적(m²)</th>
                                    <td colspan="3">{{totalArea}}</td>
                                </tr>
                                <tr>
                                    <th>대지면적(m²)</th>
                                    <td colspan="3">{{landArea}}</td>
                                </tr>
                                <tr>
                                    <th>발주처</th>
                                    <td colspan="3">{{orderPlace}}</td>
                                </tr>
                                <tr>
                                    <th>설계사</th>
                                    <td colspan="3">{{design}}</td>
                                </tr>
                                <tr>
                                    <th>감리</th>
                                    <td colspan="3">{{spvs}}</td>
                                </tr>
                                <tr>
                                    <th>현장소장</th>
                                    <td colspan="3">{{csrtMngr}}</td>
                                </tr>
                                <tr>
                                    <th>현장공무</th>
                                    <td colspan="3">{{csrtBusi}}</td>
                                </tr>
                                <tr>
                                    <th>현장관리</th>
                                    <td colspan="3">{{csrtMngt}}</td>
                                </tr>
                                <tr>
                                    <th>현장등급</th>
                                    <td colspan="3">{{csrtLevel == 'EXPR' ? '특급' :
                                                      csrtLevel == 'ADVC' ? '고급' : 
                                                      csrtLevel == 'MIDL' ? '중급' : (csrtLevel =='BGIN'? '초급':'')}}</td>
                                </tr>
                                <tr>
                                    <th>품질관리자</th>
                                    <td colspan="3">
                                    <div class="table_normal_list add_table">
                                        <table class="">
                                            <caption class="sr_only">제목</caption>
                                            <colgroup>
                                                <col width="15%">
                                                <col width="35%">
                                                <col width="25%">
                                                <col width="25%">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>NO</th>
                                                    <th>성명</th>
                                                    <th>직급</th>
                                                    <th>등급</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="cursor_pt" v-on:click="qultDetail(item.memberId)" v-for="(item, index) in qultList" v-bind:key="item.memberId">
                                                    <td>{{index+1}}</td>
                                                    <td>{{item.memberName}}</td>
                                                    <td>{{item.jobTitle}}</td>
                                                    <td>
                                                        {{item.level == 'EXPR' ? '특급' : 
                                                            item.level == 'ADVC' ? '고급' : 
                                                            item.level == 'MIDL' ? '중급' : 
                                                            item.level == 'BGIN' ? '초급' : '없음'}}
                                                    </td>
                                                </tr>
                                                <tr v-if="qultList.length == 0">
                                                    <td colspan="5" class="disabled">데이터가 없습니다.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <table class="w50">
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="148">
                                <col width="*">
                                <col width="148">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colspan="4">조감도</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="4">
                                        <div class="img_blank">
                                            <img v-bind:src="vmFileId != '' ?('/sendApi/api/fileCall/getSiteInfoImgFile/' + vmFileId) : require('@/assets/img/layout/img_blank.png')" alt="">
                                            <div v-if="vmFileId !='' && checkUser(userId,'down')">
                                                <a href="javascript:void(0);" v-bind:download="projectName" class="btn_img_download" v-on:click="download" id="downBtn"></a>
                                            </div>
                                        </div>
                                        <input type="hidden" v-model="vmFileId"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>주소</th>
                                    <td colspan="3">
                                    <pre class="textarea">{{addr}}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <th>특이사항</th>
                                    <td colspan="3">
                                    <pre class="textarea">{{spcMt}}</pre>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> <!-- // inner -->
        </div>
        <div class="tab_area" v-show="currentTab == 1">
            <div class="lookup_box multi_line">
                <table>
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
                                    <select name="" id="" class="form_control" v-model="searchObj.mngtType">
                                        <option value="" >전체</option>
                                        <option value="0">관리</option>
                                        <option value="1" >비관리</option>
                                        <option value="2" >준공</option>
                                    </select>
                                    <input type="text" class="form_control" placeholder="입력해주세요" v-model="searchObj.projectNm" @keyup.enter="siteList" :maxlength="100">
                              </div>       
                            </td>              
                            <th>프로젝트코드</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="searchObj.projectId" @keyup.enter="siteList" :maxlength="30"></td>                                
                            <th>공사기간</th>
                            <td>
                                <date-picker-range v-model="dateValue"/>
                                <!-- <DatepickerRange ref="datapickerRange" v-on:value-change="dateRangeChange"/> -->
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" v-on:click="searchDateReset">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="siteList">검색</button>
                            </td>
                        </tr>

                        <tr>
                            <th>현장명</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="searchObj.siteNm" @keyup.enter="siteList" :maxlength="100"></td>                 
                            <th>현장코드</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="searchObj.siteId" @keyup.enter="siteList" :maxlength="30"></td>                  
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- <TabList /> -->

            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel(sheet)">엑셀 다운로드</button>
                        <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet(sheet)">출력</button>
                    </div>
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 350px)'}">
                        <div id="sheetTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>

        <ProjectSelect v-on:fn-choice="writeForm" v-bind:project-id="projectId" v-bind:project-select-id="projectSelectId"/>

        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" :pop-id="popId"
            v-on:first-btn-fn="closePop" v-on:second-btn-fn="closePop"
        />

        <AdminDetail 
            v-bind:change-btn="false" v-bind:detail-obj="qultDetailObj" 
            v-bind:project-id="projectId" v-bind:site-id="siteId" :ref-id="'siteInfoViewAdminDetail'"
        />

        <excel-download
            v-model="excelDownload.request"
            ref-id="siteInfoView_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />

        <form v-bind:action="formUrl" ref="blank_form" target="_blank" method="post">
            <input type="hidden" name="focusProjectId" v-model="focusProjectId">
            <input type="hidden" name="focusSiteId" v-model="focusSiteId">
            <input type="hidden" name="focusSiteMstrId" v-model="focusSiteMstrId">
        </form>
    </div>
</template>

<script>
    // import TabList from '@/pages/common/frame/TabList.vue';
    import ProjectSelect from '@/pages/common/popup/ProjectSelect.vue';
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import AdminDetail from '@/pages/common/popup/AdminDetail.vue' 
    import DatepickerRange from '@/pages/common/popup/DatepickerRange.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

    import loader from '@ibsheet/loader';
    
    import { commonFn } from '@/script/commonFn.js';
    // import { CommonSet_CanEdit } from '@/pages/common/data/ibsheet-setoption.js' 
    import { LocusInfo } from '@/pages/common/data/LocusList'
    import { sendPostApi, requestOptions } from '../../../apis/common'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    let sheetId = '';
    let sheetIdL = '';

    export default {
        name: 'SiteInfoView',
        mixins: [authCheckMixns,MsgBoxMixins],
        components: {
            // TabList,
            ProjectSelect,
            PopAlert,
            AdminDetail,
            DatepickerRange,
            Breadcrumb,
            DatePickerRange,
            ExcelDownload,
        },
        data() {
            return {
                subTitle: '현장 정보',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name,
                openPopup: false,
                projectSelectId : 'site_projectSelect',
                siteMstrIdYn:false,
                popId: 'siteInfoViewAlert',

                sheet: null,

                siteMasterId : '',                //현장정보 id(table 용 pk)
                projectId : '',                    //프로젝트 id
                projectName : '',                    //프로젝트 name
                siteId : '',                       //현장 id
                siteName : '',                       //현장 name
                publicType : '-1',                  //민간/공공
                baseType : '-1',                    //본부
                mngtType : '-1',                    //관리여부
                csrtType : '-1',                    //공사유형
                busiApDt : null,                  //사업승인일자
                bddgNtcDt : null,                 //입찰공고일자
                csrtStartDt : null,               //공사기간 시작일
                csrtEndDt : null,                 //공사기간 종료일
                ctrtAmt : '',                      //계약금액
                ctrtType : 'KRW',                  //계약금액 단위
                csrtSize : '',                     //공사규모
                strc : '',                          //구조
                mainClose : '',                    //주요마감
                totalArea : '',                    //연면적
                landArea : '',                     //대지면서
                orderPlace : '',                   //발주처
                design : '',                        //설계
                spvs : '',                          //감리
                csrtMngr : '',                     //현장소장
                csrtBusi : '',                     //현장공무
                csrtMngt : '',                     //현장관리
                csrtLevel : '',                    //현장등급
                addr : '',                          //주소
                spcMt : '',                        //특이사항
                vmFileId : '',                    //조감도 파일 id
                qultList : [],                     //품질관리자 list

                popMsg : '',
                confirmUse : true,
                
                qultDetailObj : {},

                siteListData : [],

                searchObj : {
                    mngtType : '0',
                    projectNm : '',
                    projectId : '',
                    siteNm: '',
                    siteId : '',
                    csrtStartDt : '',
                    csrtEndDt : '',
                },
                dateValue: null,

                //all_site click data
                focusProjectId : '',
                focusSiteId : '',
                focusSiteMstrId : '',
                formUrl : '',

                userType: '',
                userId :'',

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

        beforeDestroy() {
            // loader.removeSheet(sheetId);
            if(this.sheet) this.sheet.dispose()
            
        },

        mounted() {
            // if(!this.$cookies.get("projectId") || !this.$cookies.get("siteId") || !this.$cookies.get("siteMstrId")){
            //     this.siteMstrIdYn = true;
            //     console.log(this.$cookies.get("projectId"));
            //     console.log(this.$cookies.get("siteId"));
            //     console.log(this.$cookies.get("siteMstrId"));
            //     this.popMsg = '현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.';
            //     this.confirmUse = false;
            //     this.$root.$emit('bv::show::modal', 'siteInfoViewAlert');
            // }else{
                this.userId = this.$store.getters['auth/getUserId'];
                this.userType = this.$store.getters['auth/getUserType'];
                if(this.userType == 'PTNR'){
                    this.tabs = ['My Site'];
                }
                if(this.$cookies.get("projectId") && this.$cookies.get("siteId") && this.currentTab == 0) {
                    this.projectId = this.$cookies.get("projectId");
                    this.siteId = this.$cookies.get("siteId");
                    this.siteMasterId  = this.$cookies.get("siteMstrId");
                    this.detailInfo();
                }
                this.siteList();
            // }
        },
        created() {
            //console.log("file"+this.vmFileId);
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
                        if(this.$cookies.get("projectId") && this.$cookies.get("siteId") && this.currentTab == 0) {
                            this.projectId = this.$cookies.get("projectId");
                            this.siteId = this.$cookies.get("siteId");
                            this.siteMasterId  = this.$cookies.get("siteMstrId");
                            this.detailInfo();
                        }
                        this.siteList();
                    }

                }).catch((e) => {
                    // console.log(e);
                    return e.response;
                });
            }
        },
        methods: {
            closePop : function() { //기본 팝업 닫기 event
                if(this.siteMstrIdYn){
                    this.$cookies.remove('Authorization');
                    this.$cookies.remove('projectId');
                    this.$cookies.remove('siteId');
                    this.$cookies.remove('siteMstrId');
                    this.$root.$emit('bv::hide::modal', 'siteInfoViewAlert');
                    this.$router.push({name: 'Login'});
                }else{
                    this.$router.push({name: 'SiteInfoView'});
                    this.$root.$emit('bv::hide::modal', 'siteInfoViewAlert');
                }
            },
            modifyForm : function() {
                this.$router.push({
                    name : 'SiteInfoChange', 
                    params : {'siteMstrId' : this.siteMasterId}
                });
            },
            writeForm : function(infoObj) {
                this.$router.push({name : 'SiteInfoWrite', params: {infoObj : infoObj}});
            },
            dateRangeChange : function(param) { //범위용 datepicker change event
                this.searchObj.csrtStartDt = param[0];
                this.searchObj.csrtEndDt = param[1];
            },
            dateRangeReset : function() { //범위용 datepicker reset event
                this.$refs.datapickerRange.valueReset();
                this.searchObj.csrtStartDt = null;
                this.searchObj.csrtEndDt = null;
            },
            searchDateReset : function() {
                this.searchObj = {
                    mngtType : '',
                    projectNm : '',
                    projectId : '',
                    siteNm: '',
                    siteId : '',
                    csrtStartDt : '',
                    csrtEndDt : '',
                };
                this.dateValue = null;
                // this.dateRangeReset();
            },
            detailInfo : async function() {
                // console.log('view');
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/siteInfo/view';
                let param = {
                    "projectId" : this.projectId,
                    "siteId" : this.siteId,
                    "siteMstrId" : this.siteMasterId
                };

                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });

                if(resData.rCode == "0000") {
                    let detail = resData.datas.result;
                    //console.log(detail);
                    if(detail != null) {
                        this.siteMasterId = detail.siteMstrId;
                        this.projectName = detail.projectNm;
                        this.siteName = detail.siteNm;
                        this.publicType = detail.publicType;
                        this.busiApDt = detail.busiApDt;
                        this.bddgNtcDt = detail.bddgNtcDt;
                        this.mngtType = detail.mngtType;
                        this.baseType = detail.baseType;
                        this.csrtType = detail.csrtType;
                        this.csrtStartDt = detail.csrtStartDt;
                        this.csrtEndDt = detail.csrtEndDt;
                        this.ctrtAmt = commonFn.methods.addCommas(detail.ctrtAmt);
                        this.ctrtType = detail.ctrtType;
                        this.csrtSize = detail.csrtSize;
                        this.strc = detail.strc;
                        this.mainClose = detail.mainClose;
                        this.totalArea = commonFn.methods.addCommas(detail.totalArea);
                        this.landArea = commonFn.methods.addCommas(detail.landArea);
                        this.orderPlace = detail.orderPlace;
                        this.design = detail.design;
                        this.spvs = detail.spvs;
                        // this.spvs = detail.spvsNm;
                        this.csrtMngr = detail.csrtMngrNm; 
                        this.csrtBusi = detail.csrtBusiNm;
                        
                        let today = commonFn.methods.getToday().replace(/-/gi, '');
                        let from = this.csrtEndDt.replace(/-/gi, '');

                        if(from < today) {
                            this.mngtType = 2;
                        }else if(today <= from && this.mngtType == '1') {
                            this.mngtType = 1;
                        }else if(today <= from && this.mngtType == '0') {
                            this.mngtType = 0;
                        }

                        this.csrtMngt = detail.csrtMngtNm;
                        this.csrtLevel = detail.csrtLevel;
                        this.addr = detail.addr;
                        this.spcMt = detail.spcMt;
                        this.qultList = detail.qultList;
                        this.vmFileId = detail.vmFileId;
                        //this.vmFileId = this.siteImg(detail.siteMstrId)
                        if(this.vmFileId == null){
                            this.vmFileId = '';
                        }

                        return;
                    }
                } else {
                    this.popMsg = '현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.';
                    this.confirmUse = false;
                    this.siteMstrIdYn = true;
                    // this.popMsg = resData.rMsg;
                    this.$root.$emit('bv::show::modal', 'siteInfoViewAlert');
                    this.alert(`현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.`,()=>{
                        this.$cookies.remove('Authorization');
                        this.$cookies.remove('projectId');
                        this.$cookies.remove('siteId');
                        this.$cookies.remove('siteMstrId');
                        // this.$root.$emit('bv::hide::modal', 'siteInfoViewAlert');
                        this.$router.push({name: 'Login'});
                    });
                    return;
                }
            },
            siteImg : async function(siteMstrId) {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/file/upFileList';
                let param = {
                    fileType : "SiteInfo",
                    fileConnectId : siteMstrId
                };
                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });
                //console.log(resData);
                resData.data.forEach(data => {
                    this.LstImgRst.push(data);
                })
                return resData;
            },
            siteList : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/siteInfo/popup/project/list';
                let param = this.searchObj;
                if(this.dateValue != null){
                    param['csrtStartDt'] = this.dateValue[0];
                    param['csrtEndDt'] = this.dateValue[1];
                }else{
                    param['csrtStartDt'] = null;
                    param['csrtEndDt'] = null;
                }

                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });

                let data = [];
                let options = LocusInfo.options;
                
                let cols = [
                    { Name: 'SEQ', Header: [{ Value: 'No', RowSpan: 2 }], Type: "Int", RelWidth: 4 },
                    { Name: 'baseTypeNm', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 5 },
                    { Name: 'csrtTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 5 },
                    { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 5 },
                    { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 10 },
                    { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10 },
                    { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 10 },
                    { Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작' }], RelWidth: 8 },
                    { Name: 'csrtEndDt', Header: [{}, { Value: '종료' }], RelWidth: 8 },
                    { Name: 'csrtMngrNm', Header: [{ Value: '현장소장', RowSpan: 2 }], RelWidth: 5 },
                    { Name: 'csrtLevel', Header: [{ Value: '현장등급', RowSpan: 2 }], RelWidth: 5 },
                    { Name: 'level0', Header: [{ Value: '품질관리자 현황', Span: 5 }, { Value: '특급' }], RelWidth: 5 },
                    { Name: 'level1', Header: [{}, { Value: '고급' }], RelWidth: 5 },
                    { Name: 'level2', Header: [{}, { Value: '중급' }], RelWidth: 5 },
                    { Name: 'level3', Header: [{}, { Value: '초급' }], RelWidth: 5 },
                    // { Name: 'level4', Header: [{}, { Value: '없음' }], RelWidth: 5 },
                ];

                options.Cols = cols;
                if(resData.rCode == "0000") {
                    this.siteListData = resData.datas.resultList;
                    if(this.siteListData.length>0){
                        for(let a = 0; a<this.siteListData.length; a++){
                            let siteLevel = this.siteListData[a].csrtLevel;
                            let base = this.siteListData[a].baseType;
                            if(siteLevel == 'EXPR'){
                                this.siteListData[a].csrtLevel = '특급';
                            }
                            else if(siteLevel == 'ADVC'){
                                this.siteListData[a].csrtLevel = '고급';
                            }
                            else if(siteLevel == 'MIDL'){
                                this.siteListData[a].csrtLevel = '중급';
                            }
                            else if(siteLevel == 'BGIN'){
                                this.siteListData[a].csrtLevel = '초급';
                            }

                            if(base == '4000'){
                                this.siteListData[a].baseType = "건축";
                            }else{
                                this.siteListData[a].baseType = "인프라";
                            }
                        }
                    }
                    data = this.siteListData;
                    //console.log(data);
                }

                
                loader.createSheet({
                    el: 'sheetTable',
                    data: data,
                    options: {
                        Cfg : {
                            CanEdit : 0,
                            NoDataMessage:3,
                            NoVScroll: false,
                        },
                        Cols : cols,
                        Events : {
                            ondblclick : this.fnChoice
                        }
                    },
                }).then((sheet) => {
                    sheetId = sheet.id
                    this.sheet = sheet
                });
            },
            qultDetail : function(memberId) {
                if(!this.checkUser(this.userId,'view')){
                    return;
                }
                for(let i=0; i<this.qultList.length; i++) {
                    if(memberId == this.qultList[i].memberId) {
                        this.qultDetailObj = this.qultList[i];
                    }
                }
                this.$root.$emit('bv::show::modal', 'siteInfoViewAdminDetail');
            },
            fnChoice : function(evtParams) { //all site detail
                let clickIdx = evtParams.sheet.getRowIndex(evtParams.row) - 1;
                let id = evtParams.row.siteMstrId;
                //console.log(id);

                this.$store.dispatch('setInformation', {
                    siteMstrId: id,
                    projectId: this.siteListData[clickIdx].projectId.replace(/ /g, ''), 
                    siteId: this.siteListData[clickIdx].siteId.replace(/ /g, ''),
                })
                //console.log(this.$store);
                let blankTemp = this.$router.resolve({
                    name:'SiteInfoBlank'
                });
                window.open(blankTemp.href,'_blank');
                
                // let blankTemp = this.$router.resolve({
                //     name : 'siteInfoBlank', 
                //     query : {
                //         'projectId' : this.siteListData[clickIdx].projectId.replace(/ /g, ''), 
                //         'siteId' : this.siteListData[clickIdx].siteId.replace(/ /g, ''),
                //         'siteMstrId' : id,
                //         // 'siteMstrId' : this.siteListData[clickIdx].siteMstrId.replace(/ /g, ''),
                //     },
                //     params : {
                //         'projectId' : this.siteListData[clickIdx].projectId.replace(/ /g, ''), 
                //         'siteId' : this.siteListData[clickIdx].siteId.replace(/ /g, ''),
                //         'siteMstrId' : id,
                //         // 'siteMstrId' : this.siteListData[clickIdx].siteMstrId.replace(/ /g, ''),
                //     }, 
                // });
                // // window.open(blankTemp.href, 'siteInfoBlank', '_blank');//새창열기
                // window.open(blankTemp.href, 'siteInfoBlank');
                
            },
            download: function(){
                if(this.vmFileId != ''){
                    let btn = document.getElementById('downBtn');
                    btn.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/' + this.vmFileId);
                }
            },
            mysiteExcel : function() {
                this.alert('준비중입니다.');
                //console.log(sheetIdL);
                // sheetIdL.down2Excel({
                //     SheetDesign: 1,
                //     merge: 1,
                //     fileName: 'test.xlsx'
                // });
            },

            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols,
                }
                this.excelDownload.fileName  = `현장정보_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true;
                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `현장정보_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            printSheet:function(sheet){
                sheet.doPrint();
            }
        },

    }
</script>