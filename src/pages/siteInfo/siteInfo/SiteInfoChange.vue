<template>
    <div class="tab_contents">
        <h2 class="sub_title">{{subTitle}}
            <div class="fr">
                <button v-if="checkUser(userId,'change')" type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="changeCheck">수정</button>
                <button type="button" class="btn btn_md btn_outline btn_gray" v-on:click="cancelBtn()">취소</button>
            </div>
        </h2>
        
        <div class="inner">
            <div class="table_normal_list mt0">
                <table class="top_table">
                    <colgroup>
                        <col width="148">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span>현장명</span> </th>
                            <td><span>[{{siteId}}] {{siteName}}</span></td>
                        </tr>
                        <tr>
                            <th><span>프로젝트명</span></th>
                            <td><span>[{{projectId}}] {{projectName}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table_normal_list table_write">
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
                        <th><span class="emp_red">민간/공공</span></th>
                        <td>
                            <select class="form_control" v-model="publicType" v-on:change="dateReset">
                                <option value="0">민간 공사</option>
                                <option value="1">공공 공사</option>
                            </select>
                        </td>
                        <th><span class="emp_red">{{publicType == 0 ? '사업 승인 일자' : '입찰 공고 일자'}}</span></th>
                        <td>
                            <DatePicker v-model="busiApDt" :format="'YYYY-MM-DD'" v-if="publicType == '0'"/>
                            <DatePicker v-model="bddgNtcDt" :format="'YYYY-MM-DD'" v-if="publicType == '1'"/>
                            <!-- <Datepicker ref="datapicker" v-on:value-change="dateChange" /> -->
                        </td>
                    </tr>
                    <tr>
                        <th><span class="emp_red">관리여부</span></th>
                        <td class="br0">
                            <div>
                                <label class="input_check" for="rdoSolar1">
                                    {{mngtTypeTxt}}
                                </label>
                           </div>
                        </td>
                        <th>비관리여부</th>
                        <td>
                            <div>
                                <label class="input_check" for="rdoSolar2">
                                    <input type="checkbox" id="rdoSolar2" name="birthday_type2"
                                    v-model="mngtTypeNone" v-on:click="mngtTypeNoneChk" :disabled="!canCheck? true : false">
                                    <span class="label_text">비관리</span>
                                </label>
                           </div>
                        </td>
                    </tr>
                    <tr>
                        <th><span class="emp_red">본부</span></th>
                        <td colspan="3">
                            <select class="form_control" v-model="baseType">
                                <option value="4000" selected>건축</option>
                                <option value="1000">인프라</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th><span class="emp_red">공사유형</span></th>
                        <td colspan="3">
                            <select class="form_control" v-if="baseType == '4000'" v-model="csrtType">
                                <option value="0" selected>공동주택</option>
                                <option value="1">일반건축</option>
                                <option value="2">공장</option>
                            </select>
                            <span v-if="baseType == '1000'">인프라</span>
                        </td>
                    </tr>
                    <tr>
                        <th><span class="emp_red">공사기간</span></th>
                        <td colspan="3">
                            <div class="datepicker_wrap">
                                <!-- <DatepickerRange ref="datapickerRange" v-on:value-change="dateRangeChange"/> -->
                                <date-picker-range v-model="date" :limitable="true"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>계약금액</th>
                        <td colspan="3">
                            <!-- <input type="text" class="form_control num" :value="ctrtAmt" placeholder="입력해주세요" :maxlength="30" @keyup="keyEvt"/> -->
                            <input type="text" class="form_control num" v-model="ctrtAmt" placeholder="입력해주세요" :maxlength="30"/>
                            <input type="text" v-model="ctrtType" class="form_control num" placeholder="입력해주세요" :maxlength="20">
                        </td>
                    </tr>
                    <tr>
                        <th>공사규모</th>
                        <td colspan="3">
                            <input type="text" v-model="csrtSize" class="form_control" :maxlength="100">
                        </td>
                    </tr>
                    <tr>
                        <th>구조</th>
                        <td colspan="3">
                            <input type="text" v-model="strc" class="form_control" :maxlength="100">
                        </td>
                    </tr>
                    <tr>
                        <th>주요마감</th>
                        <td colspan="3">
                            <input type="text" v-model="mainClose" class="form_control" :maxlength="100">
                        </td>
                    </tr>
                    <tr>
                        <th>연면적(m²)</th>
                        <td colspan="3">
                            <!-- <input type="text" class="form_control" :value="totalArea" placeholder="입력해주세요" :maxlength="100" @keyup="keyEvt2"/> -->
                            <input type="text" class="form_control" v-model="totalArea" :maxlength="100"/>
                        </td>
                    </tr>
                    <tr>
                        <th>대지면적(m²)</th>
                        <td colspan="3">
                            <!-- <input type="text" class="form_control" :value="landArea" placeholder="입력해주세요" :maxlength="100" @keyup="keyEvt3"/> -->
                            <input type="text" class="form_control" v-model="landArea" :maxlength="100"/>
                        </td>
                    </tr>
                    <tr>
                        <th><span class="emp_red">발주처</span></th>
                        <td colspan="3">
                            <input type="text" v-model="orderPlace" class="form_control" :maxlength="100">
                        </td>
                    </tr>
                    <tr>
                        <th>설계사</th>
                        <td colspan="3">
                            <input type="text" v-model="design" class="form_control" :maxlength="100">
                        </td>
                    </tr>
                    <tr>
                        <th>감리</th>
                        <td colspan="3">
                            <!-- <div class="btn_wrap"> -->
                                <!-- <input v-if="checkUser(userId,'change')" type="text" v-model="spvsNm" class="form_control" readonly v-on:click="partnerClick()"> -->
                                <input type="text" v-model="spvs" class="form_control" :maxlength="100">
                                <!-- <button v-if="checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkblue btn_radius" v-on:click="partnerClick()">검색</button> -->
                            <!-- </div> -->
                        </td>
                    </tr>
                    <tr>
                        <th>현장소장</th>
                        <td colspan="3">
                            <div class="btn_wrap">
                                <input v-if="checkUser(userId,'change')" type="text" v-model="csrtMngrNm" class="form_control" readonly v-on:click="employeeClick('csrtMngr')">
                                <input v-if="!checkUser(userId,'change')" type="text" v-model="csrtMngrNm" class="form_control" readonly>
                                <button v-if="checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkblue btn_radius" v-on:click="employeeClick('csrtMngr')">검색</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>현장공무</th>
                        <td colspan="3">
                            <div class="btn_wrap">
                                <input v-if="checkUser(userId,'change')" type="text" v-model="csrtBusiNm" class="form_control" readonly v-on:click="employeeClick('csrtBusi')">
                                <input v-if="!checkUser(userId,'change')" type="text" v-model="csrtBusiNm" class="form_control" readonly>
                                <button v-if="checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkblue btn_radius" v-on:click="employeeClick('csrtBusi')">검색</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>현장관리</th>
                        <td colspan="3">
                            <div class="btn_wrap">
                                <input v-if="checkUser(userId,'change')" type="text" v-model="csrtMngtNm" class="form_control" readonly v-on:click="employeeClick('csrtMngt')">
                                <input v-if="!checkUser(userId,'change')" type="text" v-model="csrtMngtNm" class="form_control" readonly>
                                <button v-if="checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkblue btn_radius" v-on:click="employeeClick('csrtMngt')">검색</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>현장등급</th>
                        <td colspan="3">
                            <select  name="" id="" class="form_control form_sm" v-model="csrtLevel">
                                <option value="BGIN">초급</option>
                                <option value="MIDL">중급</option>
                                <option value="ADVC">고급</option>
                                <option value="EXPR">특급</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>품질관리자</th>
                        <td colspan="3">
                            <div class="add_title ar">
                                <button v-if="checkUser(userId,'change')" type="button" class="btn_plus" v-b-modal.siteInfoChangeAdminWrite>등록</button>
                                <button v-if="checkUser(userId,'change')" type="button" class="btn_del" v-on:click="deleteQult">삭제</button>
                            </div>
                            <div class="table_normal_list add_table">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="30%">
                                        <col width="30%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div v-if="qultList.length != 0">
                                                    <label class="input_check pop_notext">
                                                        <input type="checkbox" id="checkBox" name="" v-on:click="allChecked">
                                                        <span class="label_text"></span>
                                                    </label>
                                                </div>
                                            </th>
                                            <th>번호</th>
                                            <th>성명</th>
                                            <th>직급</th>
                                            <th>등급</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="" v-for="(item, index) in qultList" v-bind:key="item.memberId">
                                            <td>
                                                <label class="input_check pop_notext">
                                                    <input type="checkbox" id="" name="" v-bind:value="item.memberId"  v-model="qultChecked">
                                                    <span class="label_text"></span>
                                                </label>
                                            </td>
                                            <td>{{index+1}}</td>
                                            <td v-on:click="qultDetail(item.memberId)" class="cursor_pt">{{item.memberName}}</td>
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
                            <div class="btn_area ar">
                                <div class="file_upload">
                                    <input type="file" id="input_upload_copy2" class="upload_hidden" name="file-input" @change="handleFileInput" style="display:none">
                                    <label v-if="checkUser(userId,'change')" for="input_upload_copy2" class="btn btn_sm btn_darkgray btn_addimg">이미지 첨부</label>
                                </div>
                            </div>
                            <div class="img_blank">
                                <img v-bind:src="(fileImg.length != 0 ? fileImg[0].preview : ((vmFileId != '' && vmFileId != null)? '/sendApi/api/fileCall/getSiteInfoImgFile/' + vmFileId : require('@/assets/img/layout/img_blank.png')))" alt="">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colspan="3">
                            <!-- <textarea v-model="addr" name="" id="" class="form_control"></textarea> -->
                            <textarea :value="addr" name="" id="" class="form_control" @keyup="fn_inputCheck" :maxlength="200"></textarea>
                            <p class="table_message ar mt0">{{ addr.length }} / {{ 200 }}</p>
                        </td>
                    </tr>
                    <tr>
                        <th>특이사항</th>
                        <td colspan="3">
                            <!-- <textarea v-model="spcMt" name="" id="" class="form_control"></textarea> -->
                            <textarea :value="spcMt" name="" id="" class="form_control" @keyup="fn_inputCheck2" :maxlength="200"></textarea>
                            <p class="table_message ar mt0">{{ spcMt.length }} / {{ 200 }}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <PartnerUserSearch
            v-on:fn-partner-choice="partnerChoice" v-bind:member-id-list="[]" :ptnr-type="'I'"
            :ref-id="'siteInfoChangePtnrUserPop'"
        />
        <EmployeeSearch
            v-on:fn-employee-choice="employeeChoice" v-bind:emplo-name="userNm"
            v-bind:additional-searchable="true" :all-site-enable="true"
            v-bind:empl-pop-id="emplPopId" v-bind:choose-person="choosePerson"
        />
        <AdminDetail 
            v-bind:project-id="projectId" v-bind:site-id="siteId" 
            v-bind:detail-obj="qultDetailObj" v-bind:change-btn="false"
            v-on:end-detail="endDetail" :ref-id="'siteInfoChangeAdminDetail'"
        />
        <AdminWrite 
            v-bind:project-id="projectId" v-bind:site-id="siteId" 
            v-bind:member-id-list="qultIdList" v-bind:detail-obj="qultDetailObj"
            v-on:final-close="qultWriteClose" :ref-id="'siteInfoChangeAdminWrite'" />
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:btn-name="btnNm"
            :pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
    </div>
</template>

<script>
import AdminDetail from '@/pages/common/popup/AdminDetail.vue' 
import AdminWrite from '@/pages/common/popup/AdminWrite.vue' 
import NumberInput from '@/pages/common/frame/NumberInput.vue'
import PopAlert from '@/pages/common/popup/PopAlert.vue' 
// import Datepicker from '@/pages/common/popup/Datepicker.vue'
import DatePickerRange from '@component/common/DatePickerRange.vue'
import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue' 
import PartnerUserSearch from '@/pages/common/popup/PartnerUserSearch.vue' 
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

import { commonFn } from '@/script/commonFn.js';
import { sendPostApi, sendPutApi, requestOptions } from '../../../apis/common'
import { sendFileApi, requestFileOptions } from '../../../apis/common';
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import DatePicker from '@component/common/DatePicker.vue'

export default {
    name: 'SiteInfoChange',
    mixins: [MsgBoxMixins,authCheckMixns],
    components: {
        AdminDetail,
        AdminWrite,
        PopAlert,
        // Datepicker,
        DatePickerRange,
        NumberInput,
        EmployeeSearch,
        PartnerUserSearch,
        DatePicker,
    },
    props: {
        siteMstrId: {
            type: String,
            default : ''
        },
        files: {
            type: Array
            , default : () => {
                return [];
            }
        }
    },
    data() {
        return {
            subTitle: '현장 정보 수정',
            popId:'siteInfoChangeAlert',
            popMsg: '',
            confirmUse : true,
            btnNm : {first : '확인', second : '취소'},
            
            siteMasterId : this.siteMstrId,   
            projectId : this.$cookies.get("projectId"),    //프로젝트 id
            projectName : '',
            siteId : this.$cookies.get("siteId"),          //현장 id
            siteName : '',
            publicType : '0',                   //민간/공공
            baseType : '0',                       //본부
            mngtType : '0',                       //관리여부 value
            mngtTypeTxt : '비관리',               //관리여부 text
            mngtTypeNone : false,                 //관리여부(비관리)
            csrtType : '0',                     //공사유형
            busiApDt : null,                     //사업승인일자
            bddgNtcDt : null,                    //입찰공고일자
            csrtStartDt : null,                  //공사기간 시작일
            csrtEndDt : null,                    //공사기간 종료일
            ctrtAmt : '',                       //계약금액
            ctrtType : 'KRW',                     //계약금액 단위
            csrtSize : '',                     //공사규모
            strc : '',                          //구조
            mainClose : '',                    //주요마감
            totalArea : '',                    //연면적
            landArea : '',                     //대지면서
            orderPlace : '',                   //발주처
            design : '',                        //설계
            spvs : '',                          //감리
            spvsNm : '',                       //감리 이름
            csrtMngr : '',                     //현장소장 id
            csrtMngrNm : '',                   //현장소장 이름
            csrtBusi : '',                     //현장공무 id
            csrtBusiNm : '',                   //현장공무 이름
            csrtMngt : '',                     //현장관리 id
            csrtMngtNm : '',                   //현장관리 이름
            csrtLevel : '0',                    //현장등급
            addr : '',                          //주소
            spcMt : '',                        //특이사항
            vmFileId : '',                    //조감도 파일 id
            qultList : [],                     //품질관리자 list

            saveChk : false,
            inputClass : 'form_control num',
            inputClassCommon : 'form_control',
            qultChecked : [],                  // checkbox control용 변수
            qultIdList : [],                  // 품질관리자 팝업에서 동일인물 등록 불가하게 만들 id 변수
            qultDeleteIdList : [],           // 삭제한 품질관리자 id
            qultDetailObj : {},               // 클릭한 품질관리자 정보
            deleteFileLst : [],                //삭제한 파일들
            fileConnectId : '',                //파일연결아이디
            fileImg : [],                      //조감도파일 미리보기용
            insertFiles:[],                    //조감도입력파일
            
            userNm : '',                       //사원검색, 협력사검색

            userId : '',                       //사원 아이디
            jobTitle : '',                      //직급
            
            emplPopId: 'siteInfoChangeEmplPop',          // 팝업 선택 아이디
            choosePerson: '',                  //사람선택
            canCheck: false,                   //공사기간 미입력시 체크 비활성화
            date:[],
            userId:'',
        }
    },
    beforeDestroy() {
            
    },
    mounted() {
        // console.log('change');
        this.userId = this.$store.getters['auth/getUserId'];
    },
    created() {
        if(this.$cookies.get("projectId") && this.$cookies.get("siteId")) {
                this.projectId = this.$cookies.get("projectId");
                this.siteId = this.$cookies.get("siteId");
                if(this.csrtStartDt == '' || this.csrtEndDt == '' || this.csrtStartDt == null || this.csrtEndDt == null){
                    this.canCheck = false;
                }else{
                    this.canCheck = true;
                }
                this.detailInfo();
            }
            if(this.siteMstrId == ''|| this.siteMstrId == null){
                this.siteMasterId = this.$cookies.get("siteMstrId");
            }
            if(!(this.$cookies.get("projectId") && this.$cookies.get("siteId") && this.$cookies.get("siteMstrId"))){
                this.$cookies.remove('Authorization');
                this.$cookies.remove('projectId');
                this.$cookies.remove('siteId');
                this.$cookies.remove('siteMstrId');
                this.$router.push({name: 'Login'});
            }
    },
    watch:{
        ctrtAmt: function(){
            this.ctrtAmt = this.ctrtAmt.replace(/[^0-9]/gi, '');
            this.ctrtAmt = this.ctrtAmt.replace(/^0+/, '');
            this.ctrtAmt = commonFn.methods.addCommas(this.ctrtAmt);
        },
        landArea: function(){
            this.landArea = this.landArea.replace(/[^0-9]/gi, '');
            this.landArea = this.landArea.replace(/^0+/, '');
            this.landArea = commonFn.methods.addCommas(this.landArea);
        },
        totalArea: function(){
            this.totalArea = this.totalArea.replace(/[^0-9]/gi, '');
            this.totalArea = this.totalArea.replace(/^0+/, '');
            this.totalArea = commonFn.methods.addCommas(this.totalArea);
        },
        date : function(){
            this.dateRangeChange(this.date);
        },
        deleteFileLst: function(){
            //console.log('deleteFileLst',this.deleteFileLst);
            if(typeof(this.deleteFileLst) == 'undefined' || this.deleteFileLst == null){
                this.deleteFileLst = [];
            }
        },
        baseType: function(){
            if(this.baseType == '4000' && this.csrtType == '3'){
                this.csrtType = '0';
            }
        }
    },
    methods : {
        cancelBtn: function(){
            this.confirm('작성중인 내용이 있습니다 취소하시겠습니까?', () => {
                this.siteinfoBack();
            });
        },
        siteinfoBack : function() { //취소버튼 event
            this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
            // this.$router.go(-1);
            this.$router.push({name: 'SiteInfoView'});
        },
        alertConfirmFn : function() { //common_alert 팝업에서 확인 버튼 누를 경우 상황에 따른 event 주입
            if(!this.saveChk && this.popMsg == '수정하시겠습니까?') {
                this.changeFinal();
            }else {
                this.closePop();
                if(this.saveChk) {
                    this.$cookies.set("projectId", this.projectId);
                    this.$cookies.set("siteId", this.siteId);
                    this.$cookies.set("siteMstrId", this.siteMasterId);
                    this.$cookies.set("projectName", this.projectName);
                    this.siteinfoBack();
                }
            }
        },
        closePop : function() { //기본 팝업 닫기 event
            if((!this.saveChk) && this.projectId ==''){
                this.$cookies.remove('Authorization');
                this.$cookies.remove('projectId');
                this.$cookies.remove('siteId');
                this.$router.push({name: 'Login'});
            }else if(this.popMsg == '현장정보 ID를 불러올 수 없습니다. 다시로그인해주세요.'){
                this.$cookies.remove('Authorization');
                this.$cookies.remove('projectId');
                this.$cookies.remove('siteId');
                this.$router.push({name: 'Login'});
            }else{
                this.$root.$emit('bv::hide::modal', 'siteInfoChangeAlert');
            }
            
        },
        dateChange : function(param) { //단일 datapicker change event
            if(this.publicType == 0) {
                this.busiApDt = param;
                this.bddgNtcDt = null;
            }else {
                this.busiApDt = null;
                this.bddgNtcDt = param;
            }
        },
        dateReset : function() { //단일 datepicker reset event
            let today = commonFn.methods.getToday();
            // console.log('today',today);
            // this.$refs.datapicker.valueChange(today);
            // this.$refs.datapicker.valueReset();
            if(this.publicType == 0) {
                this.busiApDt = today;
                this.bddgNtcDt = null;
            }else{
                this.busiApDt = null;
                this.bddgNtcDt = today;
            }
        },
        dateRangeChange : function(param) { //범위용 datepicker change event
            //console.log(param)
            this.csrtStartDt = param[0];
            this.csrtEndDt = param[1];
            if(this.csrtStartDt == '' || this.csrtEndDt == '' || this.csrtStartDt == null || this.csrtEndDt == null){
                this.canCheck = false;
            }else{
                this.canCheck = true;
            }
            
            if(!commonFn.methods.isEmpty(this.csrtEndDt)){
                let from = this.csrtEndDt.replace(/-/gi, '');

                let today = commonFn.methods.getToday().replace(/-/gi, '');
                
                if(from < today) {
                    this.mngtType = 2;
                    this.mngtTypeTxt = '준공';
                }else if(today <= from && this.mngtTypeNone) {
                    this.mngtType = 1;
                    this.mngtTypeTxt = '비관리';
                }else if(today <= from && !this.mngtTypeNone) {
                    this.mngtType = 0;
                    this.mngtTypeTxt = '관리';
                }
            }
        },
        dateRangeReset : function() { //범위용 datepicker reset event
            this.$refs.datapickerRange.valueReset();
            this.csrtStartDt = null;
            this.csrtEndDt = null;
        },
        mngtTypeNoneChk : function(e) { //비관리 체크 여부에 따른 mngtType 결정
            let from = this.csrtEndDt.replace(/-/gi, '');
            let today = commonFn.methods.getToday().replace(/-/gi, '');
            if(from < today) {
                this.mngtType = 2;
                this.mngtTypeTxt = '준공';
            }else{
                if(e.target.checked) {
                    this.mngtType = 1;
                    this.mngtTypeTxt = '비관리';
                }else{
                    this.mngtType = 0;
                    this.mngtTypeTxt = '관리';
                }
            }
        },
        allChecked : function(e) { //품질관리자 전체 체크박스 event
            if(e.target.checked) {
                for(let i=0; i<this.qultList.length; i++) {
                    this.qultChecked.push(this.qultList[i].memberId);
                }
            }else {
                this.qultChecked = [];
            }
        },
        deleteQult : function() {
            if(this.qultChecked.length == 0) {
                // this.confirmUse = false;
                // this.popMsg = '삭제할 품질관리자를 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('선택된 행이 없습니다.');
                return;
            }else {
                for(var a =0; a<this.qultChecked.length; a++){
                    this.qultDeleteIdList.push(this.qultChecked[a]);
                }
                //console.log('삭제');
                //console.log(this.qultDeleteIdList);
                //this.qultDeleteIdList = this.qultChecked;
                
                for(let i=0; i<this.qultChecked.length; i++) {
                    this.qultIdList.splice(this.qultIdList.indexOf(this.qultChecked[i]), 1);

                    for(let j=0; j<this.qultList.length; j++) {
                        if(this.qultChecked[i] == this.qultList[j].memberId) {
                            this.qultList.splice(j, 1);
                        }
                    }

                }
                this.qultChecked = [];
                let checkbox = document.getElementById("checkBox");
                if(checkbox.getAttribute("checked")){
                    checkbox.setAttribute("checked",false);
                }
                //console.log(this.qultIdList);
            }
        },
        qultWriteClose : function(member) {
            this.qultList.push(member);
            this.qultIdList.push(member.memberId);
            //console.log("신규멤버");
            //console.log(member.files);
            //console.log(this.qultIdList);
        },
        detailInfo : async function() {
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
                
                if(detail != null) {
                    this.projectName = detail.projectNm;
                    this.siteName = detail.siteNm;
                    this.publicType = detail.publicType;
                    this.busiApDt = detail.busiApDt;
                    this.bddgNtcDt = detail.bddgNtcDt;
                    this.mngtType = detail.mngtType;
                    if(this.mngtType == '1'){
                        this.mngtTypeNone = true;
                    }
                    this.baseType = detail.baseType;
                    this.csrtType = detail.csrtType;
                    this.csrtStartDt = detail.csrtStartDt;
                    this.csrtEndDt = detail.csrtEndDt;
                    this.date = [this.csrtStartDt, this.csrtEndDt];
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
                    this.csrtMngr = detail.csrtMngr; 
                    this.csrtBusi = detail.csrtBusi;
                    this.csrtMngt = detail.csrtMngt;
                    this.spvsNm = detail.spvsNm;
                    this.csrtMngrNm = detail.csrtMngrNm; 
                    this.csrtBusiNm = detail.csrtBusiNm;
                    this.csrtMngtNm = detail.csrtMngtNm;
                    this.csrtLevel = detail.csrtLevel;
                    this.addr = detail.addr;
                    this.spcMt = detail.spcMt;
                    this.qultList = detail.qultList;
                    this.vmFileId = detail.vmFileId;
                    

                    // let datepicker = '';
                    // if(this.publicType == 0) {
                    //     datepicker = this.busiApDt;
                    // }else {
                    //     datepicker = this.bddgNtcDt;
                    // }
                    // this.$refs.datapicker.valueChange(datepicker);
                    // this.$refs.datapickerRange.valueChange([this.csrtStartDt,this.csrtEndDt]);
                    for(let i=0; i<this.qultList.length; i++) {
                        this.qultIdList.push(this.qultList[i].memberId);
                    }

                    let today = commonFn.methods.getToday().replace(/-/gi, '');
                    let from = this.csrtEndDt.replace(/-/gi, '');

                    //console.log('today',today);
                    if(from < today) {
                        this.mngtType = 2;
                    }else if(today <= from && this.mngtType == '1') {
                        this.mngtType = 1;
                        this.mngtTypeNone = true;
                    }else if(today <= from && this.mngtType == '0') {
                        this.mngtType = 0;
                    }

                    return;
                }
            }else {
                this.confirmUse = false;
                // this.popMsg = '현장정보 ID를 불러올 수 없습니다. 다시로그인해주세요.';
                // this.popMsg = resData.rMsg;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert(`현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.`,()=>{
                    this.$cookies.remove('Authorization');
                    this.$cookies.remove('projectId');
                    this.$cookies.remove('siteId');
                    this.$router.push({name: 'Login'});
                });
                return;
            }
        },
        changeCheck : function() { //등록버튼 event
            this.popMsg = '';
            // 필수 값 체크[s]
            if(typeof(this.siteMasterId) == 'undefined' || this.siteMasterId == '' || this.siteMasterId == null){
                // this.popMsg = '현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert(`현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.`,()=>{
                    this.$cookies.remove('Authorization');
                    this.$cookies.remove('projectId');
                    this.$cookies.remove('siteId');
                    this.$router.push({name: 'Login'});
                });
                return;
            }
            if(!this.$cookies.get("siteMstrId")||!this.$cookies.get("Authorization")){
                // this.popMsg = '현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert(`현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.`,()=>{
                    this.$cookies.remove('Authorization');
                    this.$cookies.remove('projectId');
                    this.$cookies.remove('siteId');
                    this.$router.push({name: 'Login'});
                });
                return;
            }
            if(commonFn.methods.isEmpty(this.publicType+"")) {
                // this.popMsg = '민간/공공타입을 선택해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('민간/공공타입을 선택해주세요.');
                return;
            }
            if(this.publicType == 0 && commonFn.methods.isEmpty(this.busiApDt)){
                // this.popMsg = '사업승인일자를 선택해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('사업승인일자를 선택해주세요.');
                return;
            }
            if(this.publicType == 1 && commonFn.methods.isEmpty(this.bddgNtcDt)){
                // this.popMsg = '입찰공고일자를 선택해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('입찰공고일자를 선택해주세요.');
                return;
            }
            if(commonFn.methods.isEmpty(this.mngtType+"")) {
                // this.popMsg = '관리여부를 선택해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('관리여부를 선택해주세요.');
                return;
            }
            if(commonFn.methods.isEmpty(this.baseType)) {
                // this.popMsg = '본부를 선택해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('본부를 선택해주세요.');
                return;
            }
            if(commonFn.methods.isEmpty(this.csrtType)) {
                // this.popMsg = '공사유형을 선택해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('공사유형을 선택해주세요.');
                return;
            }
            if(commonFn.methods.isEmpty(this.csrtStartDt) && commonFn.methods.isEmpty(this.csrtEndDt)) {
                // this.popMsg = '공사기간을 선택해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('공사기간을 선택해주세요.');
                return;
            }
            if(commonFn.methods.isEmpty(this.orderPlace)) {
                // this.popMsg = '발주처를 입력해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('발주처를 입력해주세요.');
                return;
            }
            // 필수 값 체크[e]
                this.confirm('수정하시겠습니까?',this.changeFinal);
                // this.saveChk = false;
                // this.confirmUse = true;
                // this.popMsg = '수정하시겠습니까?';
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
            },
        changeFinal: async function() { //최종 저장 event
            this.saveChk = false;//세이브체크 초기화

            //조감도 등록
            if(this.fileImg != [] > 0){
                requestOptions.headers['Accept-Language'] = "ko";
                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                this.fileConnectId = this.$cookies.get("siteMstrId");
                const res_data2 = await sendFileApi(this.fileConnectId, "SiteInfo", this.insertFiles).then((result) => {
                    return result.data;
                }).catch((e) => {
                    //console.log(e.response.data);
                    //return e.response.data;
                });
                //console.log(res_data2);
                this.vmFileId = res_data2.data;
                this.fileConnectId = '';
            }

            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/siteInfo/change';
            if(this.baseType == '1000'){
                this.csrtType = '3';
            }
            if(this.publicType == 0){
                this.bddgNtcDt = null;
            }else{
                this.busiApDt= null;
            }
            //console.log('ddddddd'+this.siteMasterId);
            let param = {
                "siteMstrId" : this.siteMasterId,
                "projectId" : this.projectId,
                "siteId" : this.siteId,
                "publicType" : this.publicType,
                "baseType" : this.baseType,
                "mngtType" : this.mngtType,
                "csrtType" : this.csrtType,
                "busiApDt" : this.busiApDt,
                "bddgNtcDt" : this.bddgNtcDt,
                "csrtStartDt" : this.csrtStartDt,
                "csrtEndDt" : this.csrtEndDt,
                "ctrtAmt" : commonFn.methods.removeCommas(this.ctrtAmt),
                "ctrtType" : this.ctrtType,
                "csrtSize" : this.csrtSize,
                "strc" : this.strc,
                "mainClose" : this.mainClose,
                "totalArea" : commonFn.methods.removeCommas(this.totalArea),
                "landArea" : commonFn.methods.removeCommas(this.landArea),
                "orderPlace" : this.orderPlace,
                "design" : this.design,
                "spvs" : this.spvs,
                "csrtMngr" : this.csrtMngr,
                "csrtBusi" : this.csrtBusi,
                "csrtMngt" : this.csrtMngt,
                "csrtLevel" : this.csrtLevel,
                "addr" : this.addr,
                "spcMt" : this.spcMt,
                "vmFileId" : this.vmFileId,
                // "qultList" : this.qultList
            };
            const resData = await sendPostApi(url, param).then((result) => {
                return result.data;
            }).catch((e) => {
            // console.log(e);
                return e.response.data;
            });

            //저장하시겠습니까? 팝업 닫기
            this.$root.$emit('bv::hide::modal', 'siteInfoChangeAlert');
            
            //팝업 버튼 변수 및 저장 확인용 변수 변경
            if(resData.rCode == "0000") {
                this.confirmUse = false;
                this.saveChk = true;                
            }else {
                // this.confirmUse = false;
                this.saveChk = false;
                // this.popMsg = resData.rMsg;
                this.alert('수정에 실패했습니다.');
                return;
            }
        
            //파일 제외 현장정보 수정 성공시
            if(this.saveChk){
                //조감도 파일 삭제 후 등록

                // //삭제
                // let url = '/sendApi/api/file/fileUnUse';
                // let param = {
                //     fileType : "SiteInfo",
                //     fileComArcvIds : this.fileQltFileArcvId
                // };
                // const res_data = await sendPostApi(url, param).then((result) => {
                //     this.lstFileRst = [];
                //     return result.data;
                // }).catch((e) => {
                //     // console.log(e);
                //     return e.response.data;
                // });
                // console.log(res_data);

                //품질관리자 삭제먼저
                //console.log('1');
                if(this.qultDeleteIdList.length>0){
                    //console.log("삭제`111111");
                    let url = '/sendApi/api/quailtyMngr/unuse2';
                    //console.log(this.qultDeleteIdList);
                    let param = {
                        qultMngrIds : this.qultDeleteIdList,
                        siteMstrId : this.$cookies.get("siteMstrId"),
                    };
                    const res_data3 = await sendPostApi(url, param).then((result) => {
                        this.qultDeleteIdList = [];
                        return result.data;
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });
                    //console.log(res_data3);
                    if(res_data3.rCode == "0000") {
                        this.confirmUse = false;
                        this.saveChk = true;                
                    }else {
                        // this.confirmUse = false;
                        this.saveChk = false;
                        // this.popMsg = res_data3.rMsg;
                        this.alert('수정에 실패했습니다.');
                        return;
                    }
                }

                //품질관리자 내 파일, 조감도 파일 삭제
                //console.log('2');
                //console.log(this.deleteFileLst);
                if(this.deleteFileLst.length>0){
                    //console.log("품질관리자 파일 삭제전");
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = '/sendApi/api/file/fileUnUse';
                    let param = {
                        fileType : "QualityMngr",
                        fileComArcvIds : this.deleteFileLst
                    };
                    const res_data7 = await sendPostApi(url, param).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });
                    //console.log(res_data7);
                }
                //console.log("품질관리자 삭제 및 파일 삭제 완료");
            }

            //삭제후 등록과 수정
            if(typeof(this.qultList) != 'undefined'){
                //console.log("품질관리등록시작`111111");
                //console.log(this.qultList);
                // console.log(this.qultList[0]);
                for(let member = 0; member< this.qultList.length; member++){
                    //console.log("for문등록`");
                    //console.log(('qultMngrId' in this.qultList[member]));
                    // console.log(this.qultList[member].qultMngrId);
                    // console.log(this.qultList[member].fileQltFileArcvId);
                    let result = '';
                    if(!('qultMngrId' in this.qultList[member])){
                        //console.log('품질관리등록');
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        let url = '/sendApi/api/quailtyMngr/write';
                        let param = {
                            "siteMstrId" : this.$cookies.get("siteMstrId"),
                            "projectId" : this.projectId,
                            "siteId" : this.siteId,
                            "memberId" : this.qultList[member].memberId,
                            "majorId" : this.qultList[member].majorId,
                            "level" : this.qultList[member].level,
                            "ovCsrtExp" : this.qultList[member].ovCsrtExp,
                            "leglEduYn" : this.qultList[member].leglEduYn,
                            "dpmtDt" : this.qultList[member].dpmtDt,
                            "dpmtChangeDt" : this.qultList[member].dpmtChangeDt,
                            "qultToolYn" : this.qultList[member].qultToolYn == 'Y' ? 'Y' : 'N',
                            "comment" : this.qultList[member].comment,
                        }

                        const res_data4 = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        result = res_data4.rCode;

                        if(result=="0000"){
                            this.fileConnectId = res_data4.rMsg;
                        }else{
                            // this.popMsg = res_data4.rMsg;
                            // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                            this.alert('수정에 실패했습니다.');
                            return;
                        }
                        //console.log(result=="0000"?"등록성공":"등록실패");
                    }else{
                        //품질관리자 수정
                        //console.log("품질관리수정");
                        let url = '/sendApi/api/quailtyMngr/change';
                        let param = {
                            "siteMstrId" : this.$cookies.get("siteMstrId"),
                            "projectId" : this.projectId,
                            "siteId" : this.siteId,
                            "qultMngrId" : this.qultList[member].qultMngrId,
                            "memberId" : this.qultList[member].memberId,
                            "majorId" : this.qultList[member].majorId,
                            "level" : this.qultList[member].level,
                            "ovCsrtExp" : this.qultList[member].ovCsrtExp,
                            "leglEduYn" : this.qultList[member].leglEduYn,
                            "dpmtDt" : this.qultList[member].dpmtDt,
                            "dpmtChangeDt" : this.qultList[member].dpmtChangeDt,
                            "qultToolYn" : this.qultList[member].qultToolYn == 'Y' ? 'Y' : 'N',
                            "comment" : this.qultList[member].comment,
                        };

                        const res_data6 = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        result = res_data6.rCode;
                        //console.log(result=="0000"?"수정성공":"수정실패");
                        if(result=="0000"){
                            this.fileConnectId = this.qultList[member].qultMngrId;
                        }else{
                            // this.popMsg = res_data6.rMsg;
                            // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                            this.alert('수정에 실패했습니다.');
                            return;
                        }
                    }

                    //등록,수정 후 파일 추가
                    //console.log(this.qultList[member].files);
                    if(result == "0000" && this.qultList[member].files != '' && typeof(this.qultList[member].files) != 'undefined'){
                        //console.log("파일추가");
                        //console.log(this.qultList[member].files);
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        const res_data8 = await sendFileApi(this.fileConnectId, "QualityMngr", this.qultList[member].files).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            //console.log(e.response.data);
                            //return e.response.data;
                        });
                        //console.log(res_data8);
                    }

                    // if (!this.saveChk){
                    //     this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                    //     return;
                    // }
                }
            }
            this.popMsg = '수정되었습니다.';
            // if(this.saveChk){
            //     this.popMsg = '수정되었습니다.';
            // }
            this.alert('수정되었습니다.',()=>{
                this.$cookies.set("projectId", this.projectId);
                this.$cookies.set("siteId", this.siteId);
                this.$cookies.set("siteMstrId", this.siteMasterId);
                this.$cookies.set("projectName", this.projectName);
                this.siteinfoBack();
            });
            // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
        },
        qultDetail : function(memberId) {
            for(let i=0; i<this.qultList.length; i++) {
                if(memberId == this.qultList[i].memberId) {
                    this.qultDetailObj = this.qultList[i];
                }
            }
            this.$root.$emit('bv::show::modal', 'siteInfoChangeAdminDetail');
        },
        endDetail : function(infoQult) {
            for(let i=0; i<this.qultList.length; i++) {
                if(infoQult.memberId == this.qultList[i].memberId) {
                    this.qultList[i] = infoQult;
                    //console.log(infoQult);
                    this.deleteFileLst = infoQult.fileQltFileArcvId;
                }
            }
        },
        handleFileInput(e) { // 버튼 클릭시 리스트에 파일 추가
            e.preventDefault();
            let files = e.target.files;
            files = e.target.files;
            //console.log(files);
            
            if(!files) return;

            // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
            // ([...files]).forEach(f => {
            //     if(this.fileCheck(f, this.files)) this.files.push(f);
            // });
            //files.d
            var ext = files[0].name;
            
            //이미지파일일경우
            if(ext.indexOf(".jpg")>0 || ext.indexOf(".png")>0 || ext.indexOf(".gif")>0 || ext.indexOf(".jpeg")>0||ext.indexOf(".JPG")>0 || ext.indexOf(".PNG")>0 || ext.indexOf(".GIF")>0 || ext.indexOf(".JPEG")>0){
                this.fileImg = [];
                this.insertFiles = [];
                var fileInfo = 
                                {file: files[0],
                                preview: URL.createObjectURL(files[0]),
                                filename: files[0].name};
                this.fileImg.push(fileInfo);
                //console.log('vmFileId',this.vmFileId);
                if(this.vmFileId != '' && this.vmFileId != null){
                    this.deleteFileLst.push(this.vmFileId);
                }
                ([...files]).forEach(f => {
                    if(this.fileCheck(f, this.insertFiles)) this.insertFiles.push(f);
                });
                //console.log(this.fileImg[0].file);
                //console.log(this.fileImg);
                this.fileSizeRefresh();
            }else{
                // this.popMsg = '이미지파일을 선택해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'siteInfoChangeAlert');
                this.alert('이미지파일을 선택해주세요.');
                return;
            }
        },
        fileCheck(fileInput, fileData) {
            var result = true;
            
            if(fileData.length == 0) return true;
            fileData.forEach(data => {
                if(fileInput.name == data.name && fileInput.size == data.size && fileInput.lastModified == data.lastModified) {
                    result = false;
                }
            });
            return result;
        },
        fileSizeRefresh() {
            this.fileSize = 0;
            if(this.files.length == 0) this.fileViewSize = '0 MB';
            else {
                this.files.forEach(data => {
                    this.fileSize += data.size;
                    this.fileViewSize = this.formatBytes(this.fileSize, 2);
                });
            }
        },
        formatBytes(bytes, decimals = 0) {
            if (bytes === 0) return '0 MB';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        employeeChoice : function(infoEmployee){ //사원검색 후 event
            if(infoEmployee.choosePerson == 'csrtMngr'){
                this.csrtMngrNm = infoEmployee.userNm;
                this.csrtMngr = infoEmployee.userId;
                this.choosePerson = '';
                return;
            } else if(infoEmployee.choosePerson == 'csrtMngt'){
                this.csrtMngtNm = infoEmployee.userNm;
                this.csrtMngt = infoEmployee.userId;
                this.choosePerson = '';
                return;
            }else if(infoEmployee.choosePerson == 'csrtBusi'){
                this.csrtBusiNm = infoEmployee.userNm;
                this.csrtBusi = infoEmployee.userId;
                this.choosePerson = '';
                return;
            }
        },
        partnerChoice : function(infoPartner){ //협력사 사원검색 후 event
            this.spvsNm = infoPartner.userNm;
            this.spvs = infoPartner.userId;
        },
        employeeClick : function(person){
            //console.log(person);
            this.choosePerson = person;
            this.$root.$emit('bv::show::modal', 'siteInfoChangeEmplPop');
        },
        partnerClick: function(){
            this.$root.$emit('bv::show::modal', 'siteInfoChangePtnrUserPop');
        },
        fn_inputCheck(evt){
            if(200 >= evt.target.value.length){
                this.addr = evt.target.value;
            }
        },
        fn_inputCheck2(evt){
            if(200 >= evt.target.value.length){
                this.spcMt = evt.target.value;
            }
        },
        keyEvt:function(evt){
            this.ctrtAmt = evt.target.value;
            this.ctrtAmt = this.ctrtAmt.replace(/[^0-9]/gi, '');
            this.ctrtAmt = this.ctrtAmt.replace(/^0+/, '');
            this.ctrtAmt = commonFn.methods.addCommas(this.ctrtAmt);
        },
        keyEvt2:function(evt){
            this.landArea = evt.target.value;
            this.landArea = this.landArea.replace(/[^0-9]/gi, '');
            this.landArea = this.landArea.replace(/^0+/, '');
            this.landArea = commonFn.methods.addCommas(this.landArea);
        },
        keyEvt3:function(evt){
            this.totalArea = evt.target.value;
            this.totalArea = this.totalArea.replace(/[^0-9]/gi, '');
            this.totalArea = this.totalArea.replace(/^0+/, '');
            this.totalArea = commonFn.methods.addCommas(this.totalArea);
        },
    },
}
</script>