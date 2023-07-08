<template>
   <b-modal :id="refId" title="품질관리자 현황 등록" hide-backdrop size="lg" :footer-bg-variant="footerBg" v-on:shown="popupOpenCheck">
      <template #default>
         <div class="pop_container">
            <div class="table_normal_list">
               <table>
                  <caption class="sr_only">제목</caption>
                  <colgroup>
                     <col width="100">
                     <col width="*">
                     <col width="100">
                     <col width="*">
                  </colgroup>
                  <tbody>
                     <tr> 
                        <th>현장명</th>
                        <td colspan="3">[{{siteId}}] {{siteName}}</td>
                     </tr>
                     <tr>
                        <th>프로젝트명</th>
                        <td colspan="3">[{{projectId}}] {{projectName}}</td>
                     </tr>
                     <tr>
                        <th>본부</th>
                        <td>{{baseType ? ((baseType == '4000')? '건축': '인프라'): '-'}} </td>
                        <th>공사유형</th>
                        <td>{{baseType?(baseType != '4000'?'인프라':(csrtType ? (csrtType == '0'? '공동주택': (csrtType == '1'? '일반건축': '공장')) : '-')):'-'}} </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="table_normal_list table_write">
               <table>
                  <caption class="sr_only">제목</caption>
                  <colgroup>
                     <col width="100">
                     <col width="*">
                     <col width="100">
                     <col width="*">
                  </colgroup>
                  <tbody>
                     <tr>
                        <th><span class="emp_red">성명</span></th>
                        <td>
                           <div class="btn_wrap">
                              <input type="text" id="" class="form_control" v-model="userNm" readonly v-b-modal.AdminWrtie_EmployeeSearch> 
                              <button type='button' class="btn btn_sm btn_darkblue btn_radius" v-b-modal.AdminWrtie_EmployeeSearch>검색</button>
                           </div>
                        </td>
                        <th>전공</th>
                        <td>
                           <div class="btn_wrap">
                              <input type="text" id="" class="form_control" v-model="majorKrNm" readonly v-b-modal.AdminWrtie_MajorSearch>
                              <button type='button' class="btn btn_sm btn_darkblue btn_radius" v-b-modal.AdminWrtie_MajorSearch>검색</button>
                           </div>
                        </td>
                     </tr>
                     <tr>
                        <th><span class="emp_red">등급</span></th>
                        <td>
                           <select name="" id="" v-model="level" class="form_control">
                              <option value="" selected>전체</option>
                              <option value="EXPR">특급</option>
                              <option value="ADVC">고급</option>
                              <option value="MIDL">중급</option>
                              <option value="BGIN">초급</option>
                              <option value="NONE">없음</option>
                           </select>
                        </td>
                        <th>해외공사경력(개월)</th>
                        <td>
                           <input type="text" id="" class="form_control" v-model="ovCsrtExp" :maxlength="4">
                        </td>
                     </tr>
                     <tr>
                        <th><span class="emp_red">법정 교육 이수</span></th>
                        <td>
                           <div>
                              <label class="input_radio" for="radioSolar1">
                                 <input type="radio" id="radioSolar1" name="leglEduYn" 
                                    v-model="leglEduYn" value="Y" checked>
                                 <span class="label_text">이수 완료</span>
                              </label>
                              <label class="input_radio" for="radioSolar2">
                                 <input type="radio" id="radioSolar2" name="leglEduYn"
                                    v-model="leglEduYn" value="N">
                                 <span class="label_text">미 이수</span>
                              </label>
                           </div>
                        </td>
                        <th rowspan="2"><span class="emp_red">배치일자</span></th>
                        <td rowspan="1">
                           <label for="">실제 배치일</label>
                           <!-- <Datepicker ref="dpmtDatepicker" class="fr" v-on:value-change="dpmtDtChange" v-on:value-reset="dpmtDtReset"/> -->
                           <DatePicker class="fr" v-model="dpmtDt" :format="'YYYY-MM-DD'"/>
                        </td>
                     </tr>
                     <tr>
                        <th>품질공구장</th>
                        <td>
                           <label class="input_check form_lg pop_notext">
                              <input type="checkbox" id="" name="" v-model="qultToolYn">
                              <span class="label_text"></span>
                           </label>
                        </td>
                        <td rowspan="1">
                           <label for="">배치/변경 신고일 <br> (인·허가 기관)</label>
                           <DatePicker class="fr" v-model="dpmtChangeDt" :format="'YYYY-MM-DD'"/>
                           <!-- <Datepicker ref="dpmtChangeDatepicker" class="fr" v-on:value-change="dpmtChangeDtChange" v-on:value-reset="dpmtChangeDtReset"/> -->
                        </td>
                     </tr>
                     <tr>
                        <th rowspan="2">비고</th>
                        <td colspan="3" rowspan="2">
                           <textarea name="" id="" class="form_control" :value="comment" @keyup="fn_inputCheck($event)" :maxLength="200"></textarea>
                           <p class="table_message ar mt0">{{ comment.length }} / {{ 200 }}</p>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <EmployeeSearch 
               v-on:fn-employee-choice="employeeChoice" 
               :empl-pop-id="'AdminWrtie_EmployeeSearch'"
               v-bind:additional-searchable="true" :all-site-enable="true"
               v-bind:emplo-name="userNm"
               :pop-idx="popIdx"
            />
            <MajorSearch ref-id="AdminWrtie_MajorSearch" v-on:fn-major-choice="majorChoice" v-bind:search-value="majorKrNm"/>
            
            <LstFile v-on:file-changed="fileChanged" v-bind:files="files"/>

            <PopAlert
               v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:btn-name="{first : '확인'}" v-bind:pop-id="popId"
               v-on:first-btn-fn="close_pop"
            />
         </div>
      </template>
      <template #modal-footer="{ }">
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="finalClose">등록</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" @click="cancelBtn">취소</b-button>
      </template>

      
   </b-modal>
</template>

<script>
   import LstFile from '@/pages/common/popup/LstFile.vue'
   // import Datepicker from '@/pages/common/popup/Datepicker.vue'
   import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'
   import MajorSearch from '@/pages/common/popup/MajorSearch.vue'
   import PopAlert from '@/pages/common/popup/PopAlert.vue' 
   import { commonFn } from '@/script/commonFn.js';
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import DatePicker from '@component/common/DatePicker.vue'

   import { sendPostApi, requestOptions } from '../../../apis/common';
   import { sendFileApi, requestFileOptions } from '../../../apis/common';


   export default {
      name: 'AdminWrite',
      mixins: [MsgBoxMixins],
      components: {
         EmployeeSearch,
         MajorSearch,
         LstFile,
         // Datepicker,
         PopAlert,
         DatePicker,
      }, 
      data() {
         return {
            footerBg: 'transparent',

            popMsg: '',
            confirmUse : false,
            popId : 'qultAlert',
            baseType: '',
            csrtType : '',

            //사원 검색
            userId:'', // 선택한 사원 id
            userNm:'', // 선택한 사원 name
            jobTitle : '',
            siteName:'', // 현재 현장 name
            
            //전공 검색
            majorId:'', //선택한 전공 id
            majorKrNm:'', //선택한 전공 한국어 name
            majorEnNm:'', //선택한 전공 영어 name

            dateValue : null, //공사기간

            projectName : '',

            level : '',              //등급
            ovCsrtExp : '',       //해외공사경력
            leglEduYn : 'Y',      //법정 교육 이수
            qultToolYn : false,     //품질공구장
            dpmtDt : '',           //실제 배치일
            dpmtChangeDt : '',    //배치/변경 신고일  
            comment : '',           //비고         

            apiChk : false,

            //파일
            files: [],
            fileConnectId: 0,
            popIdx:'',
         }
      },
      props: {
         siteMstrId : {
            type : String,
            default : ''
         },
         projectId : {
            type : String,
            default : ''
         },
         siteId : {
            type : String,
            default : ''
         },
         memberIdList : {
            type : Array,
            default : function() {
               return [];
            }
         },
         detailObj : {
            type: Object,
            default : function() {
               return {}
            }
         },
         tempSet: {
            type : Object,
            default : function() {
               return {}
            }
         },
         refId:{
            type:String,
            default:'AdminWrite',
         },
      },
      mounted() {
      },
      watch :{
         ovCsrtExp :function(){
            if(this.ovCsrtExp != null && this.ovCsrtExp != ''){
               this.ovCsrtExp = this.ovCsrtExp.toString();
                  if(this.ovCsrtExp.length >1 && this.ovCsrtExp.substring(0,1) == 0 ){
                     this.ovCsrtExp = this.ovCsrtExp.substring(1,this.ovCsrtExp.length);
                  }
               this.ovCsrtExp =this.ovCsrtExp.replace(/[^0-9]/g, '');
            }
         }
      },
      methods: {
         employeeChoice : function(infoEmployee){ //사원검색 후 event
            // console.log(this.memberIdList);
            // console.log(infoEmployee.userId+"");
            // console.log(this.memberIdList.indexOf(infoEmployee.userId+""));
            // console.log(this.memberIdList.indexOf(infoEmployee.userId));
            if(this.memberIdList.indexOf(infoEmployee.userId+"") < 0 && this.memberIdList.indexOf(infoEmployee.userId) < 0) {
               this.userNm = infoEmployee.userNm;
               this.userId = infoEmployee.userId;
               this.jobTitle = infoEmployee.jobTitle;
            }else {
               // this.popMsg = '같은 사원은 등록할 수 없습니다.';
               // this.$root.$emit('bv::show::modal', 'qultAlert');
               this.alert('같은 사원은 등록할 수 없습니다.');
               return;
            }
         },
         majorChoice : function(infoMajor){ //전공 검색 후 event
            this.majorId = infoMajor.majorId;
            this.majorKrNm = infoMajor.majorKrNm;
            this.majorEnNm = infoMajor.majorEnNm;
         },
         dpmtDtChange : function(param) { //date-picker value change event
            this.dpmtDt = param;
         },
         dpmtDtReset : function() { //date-picker valueReset 함수 호출
            this.dpmtDt = null;
            // this.$refs.dpmtDatepicker.valueResetDefault();
         },
         dpmtChangeDtChange : function(param) { //date-picker value change event
            this.dpmtChangeDt = param;
         },
         dpmtChangeDtReset : function() { //date-picker valueReset 함수 호출
            this.dpmtChangeDt = null;
            // this.$refs.dpmtChangeDatepicker.valueResetDefault();
         },
         popupOpenCheck : function() {
            if(this.detailObj['saveChk']){
               this.popIdx = '2';
            }else{
               this.popIdx = '1';
            }
            // console.log(this.popIdx);
            let today = commonFn.methods.getToday();
            // console.log(this.memberIdList);
            // console.log(this.dpmtChangeDt);
            // console.log(this.dpmtDt);
            this.userId = '';
            this.userNm = '';
            this.majorId ='';
            this.majorKrNm = '';
            this.majorEnNm = '';
            this.level = '';
            this.leglEduYn = 'Y';
            this.qultToolYn = false;
            this.dpmtDt = today;
            this.dpmtChangeDt = today;
            this.comment = '';
            this.ovCsrtExp = '';
            // console.log(this.detailObj.saveChk);
            // console.log(this.apiChk);
            this.apiChk = false;
            this.files = [];

            if(this.projectId != '' && this.siteId != '') {
               this.siteInfo();
            }
            // console.log(Object.keys(this.tempSet).length == 0);
            if(Object.keys(this.tempSet).length != 0){
               this.csrtType = this.tempSet.csrtType;
               this.baseType = this.tempSet.baseType;
               this.siteName = this.tempSet.siteName;
               this.projectName = this.tempSet.projectName;
               // console.log(this.tempSet.csrtType);
            }
         },
         close_pop : function() { //기본 팝업 닫기 event
            this.$root.$emit('bv::hide::modal', 'qultAlert');

            if(this.detailObj['saveChk'] && this.apiChk) {
               this.detailObj['saveChk'] = false;
               this.dataClear();
               this.$emit('final-close', this.detailObj);
            }
         },
         siteInfo : async function() {
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/siteInfo/popup/project/list';
            let param = {
               "projectId" : this.projectId,
               "siteId" : this.siteId,
            };

            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               // console.log(e);
               return e.response.data;
            });

            if(resData.rCode == "0000") {
               let detail = resData.datas.resultList[0];
               
               if(detail != null) {
                  this.projectName = detail.projectNm;
                  this.siteName = detail.siteNm;
                  this.baseType = detail.baseType;
                  this.csrtType = detail.csrtType;
               }

               // this.dataClear();
            }
         },
         finalClose : function() {
            if(this.userNm == '' ||this.userNm == null) {
               // this.popMsg = '성명을 입력해주세요.';
               // this.$root.$emit('bv::show::modal', 'qultAlert');
               this.alert('성명을 입력해주세요.');

               return;
            }
            // if(this.majorKrNm == '' || this.majorKrNm == null) {
            //    this.popMsg = '전공을 입력해주세요.';
            //    this.$root.$emit('bv::show::modal', 'qultAlert');

            //    return;
            // }
            if(this.level == '' || this.level == null) {
               // this.popMsg = '등급을 선택해주세요.';
               // this.$root.$emit('bv::show::modal', 'qultAlert');
               this.alert('등급을 선택해주세요.');

               return;
            }
            if(this.leglEduYn == '' || this.leglEduYn == null) {
               // this.popMsg = '법정 교육 이수를 선택해주세요.';
               // this.$root.$emit('bv::show::modal', 'qultAlert');

               this.alert('법정 교육 이수를 선택해주세요.');
               return;
            }
            if(this.dpmtDt == ''||this.dpmtDt == null ||this.dpmtChangeDt == null || this.dpmtChangeDt == '') {
               // this.popMsg = '배치일자를 선택해주세요.';
               // this.$root.$emit('bv::show::modal', 'qultAlert');

               this.alert('배치일자를 선택해주세요.');
               return;
            }

            let infoQult = {};

            if(this.detailObj['saveChk']) {
               infoQult['memberId'] = this.userId;
               infoQult['memberName'] = this.userNm;
               infoQult['jobTitle'] = this.jobTitle;
               infoQult['majorId'] = this.majorId + "";
               infoQult['majorName'] = this.majorKrNm;
               infoQult['level'] = this.level+"";
               infoQult['ovCsrtExp'] = this.ovCsrtExp;
               infoQult['leglEduYn'] = this.leglEduYn;
               infoQult['qultToolYn'] = this.qultToolYn ? 'Y' : 'N';
               infoQult['dpmtDt'] = this.dpmtDt;
               infoQult['dpmtChangeDt'] = this.dpmtChangeDt;
               infoQult['comment'] = this.comment;
               this.confirm('등록하시겠습니까?',this.writeApi);
               // this.writeApi();
            }else {
               let member = {};
               member['memberId'] = this.userId;
               member['memberName'] = this.userNm;
               member['jobTitle'] = this.jobTitle;
               member['majorId'] = this.majorId + "";
               member['majorName'] = this.majorKrNm;
               member['level'] = this.level+"";
               member['ovCsrtExp'] = this.ovCsrtExp;
               member['leglEduYn'] = this.leglEduYn;
               member['qultToolYn'] = this.qultToolYn ? 'Y' : 'N';
               member['dpmtDt'] = this.dpmtDt;
               member['dpmtChangeDt'] = this.dpmtChangeDt;
               member['comment'] = this.comment;
               member['files'] =this.files;
               
               // console.log(member);

               this.$emit('final-close', member);
               this.dataClear();
               this.$root.$emit('bv::hide::modal', this.refId);
            }
         },
         writeApi : async function() {
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/quailtyMngr/write';
            let param = {
                "siteMstrId" : this.siteMstrId,
                "projectId" : this.projectId,
                "siteId" : this.siteId,
                "memberId" : this.userId,
                "majorId" : this.majorId,
                "level" : this.level,
                "ovCsrtExp" : this.ovCsrtExp,
                "leglEduYn" : this.leglEduYn,
                "dpmtDt" : this.dpmtDt,
                "dpmtChangeDt" : this.dpmtChangeDt,
                "qultToolYn" : this.qultToolYn ? 'Y' : 'N',
                "comment" : this.comment,
                //"fileList" :this.fileList
            };

            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               // console.log(e);
               return e.response.data;
            });

            // 저장하시겠습니까? 팝업 닫기
            this.$root.$emit('bv::hide::modal', 'qultAlert');
            
            //품질관리자 등록 성공시 파일 업로드
            if(resData.rCode == "0000" && this.files != '' && typeof(this.files) != 'undefined') {
               this.fileConnectId = resData.rMsg; //파일연결아이디입력
               requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
               const res_data = await sendFileApi(this.fileConnectId, "QualityMngr", this.files).then((result) => {
                  return result.data;
               }).catch((e) => {
                  // console.log(e.response.data);
                  return e.response.data;
               });
               let fileRst = res_data.data; //저장된 데이터개수 받아오기
               if(fileRst != ''){
                  this.apiChk = true;     
                  // this.popMsg = '저장되었습니다.';
                  this.alert('등록되었습니다.',()=>{
                     this.detailObj['saveChk'] = false;
                     this.dataClear();
                     this.$emit('final-close', this.detailObj);
                  });
                  //this.$root.$emit('bv::hide::modal', this.refId);
               }else{
                  this.apiChk = false;
                  // this.popMsg = '저장에 실패했습니다.';
                  this.alert('등록에 실패했습니다.');
                  return;
               }
            }else if (resData.rCode == "0000"){
               this.apiChk = true;     
               // this.popMsg = '저장되었습니다.';
               this.alert('등록되었습니다.',()=>{
                  this.detailObj['saveChk'] = false;
                  this.dataClear();
                  this.$emit('final-close', this.detailObj);
               });
               //this.$root.$emit('bv::hide::modal', this.refId);
            }else {
               this.apiChk = false;
               // this.popMsg = resData.rMsg;
               this.alert('등록에 실패했습니다.');
               return;
            }

            // this.$root.$emit('bv::show::modal', 'qultAlert');
         },
         dataClear : function() {
            this.userId = '';
            this.userNm = '';
            this.jobTitle = '';
            this.siteName = '임시현장';
            
            //전공 검색
            this.majorId = '';
            this.majorKrNm = '';
            this.majorEnNm = '';

            this.dateValue = null;

            this.projectName = '';

            this.level = '';
            this.ovCsrtExp = '';
            this.leglEduYn = 'Y';
            this.qultToolYn = false;
            this.dpmtDt = '';
            this.dpmtChangeDt = '';
            this.comment = '';
            this.files = [];
            this.$forceUpdate();
            this.dpmtDtReset();
            this.dpmtChangeDtReset();
         },
         fileChanged(payload) {
            this.files = payload;
            // console.log(this.files);
         },
         cancelBtn: function(){
            this.confirm("취소하시겠습니까?",() => {
               this.$root.$emit('bv::hide::modal', this.refId);
            });
         },
         fn_inputCheck(evt){
            if(200 >= evt.target.value.length){
               this.comment = evt.target.value;
            }
         },
      }
   }
</script>