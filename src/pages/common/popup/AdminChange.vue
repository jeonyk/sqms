<template>
   <b-modal :id="refId" title="품질관리자 현황 수정" hide-backdrop size="lg" :footer-bg-variant="footerBg" v-on:shown="popupOpenCheck">
      <template #default>
         <div class="pop_container">
            <div class="table_normal_list" style="padding:0">
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
                        <td class="">
                           {{memberName}}
                              <!-- <input type="text" id="" class="form_control" v-model="detailObj.memberName" readonly> -->
                        </td>
                        <th>전공</th>
                        <td class="">
                           <div class="btn_wrap">
                              <input type="text" id="" class="form_control" v-model="majorName" readonly v-b-modal.AdminChange_MajorSearch>
                              <button type='button' class="btn btn_sm btn_darkblue btn_radius" v-b-modal.AdminChange_MajorSearch>검색</button>
                           </div>
                        </td>
                     </tr>
                     <tr>
                        <th><span class="emp_red">등급</span></th>
                        <td class="">
                           <select name="" id="" class="form_control" v-model="level">
                              <option value="" selected>전체</option>
                              <option value="EXPR">특급</option>
                              <option value="ADVC">고급</option>
                              <option value="MIDL">중급</option>
                              <option value="BGIN">초급</option>
                              <option value="NONE">없음</option>
                           </select>
                        </td>
                        <th>해외공사경력(개월)</th>
                        <td class="">
                           <input type="text" id="" class="form_control" v-model="ovCsrtExp" :maxlength="4">
                        </td>
                     </tr>
                     <tr>
                        <th><span class="emp_red">법정 교육 이수</span></th>
                        <td class="">
                           <div>
                              <label class="input_radio" for="radioSolar3">
                                 <input type="radio" id="radioSolar3" name="birthday_type2" 
                                    v-model="leglEduYn" value="Y">
                                 <span class="label_text">이수 완료</span>
                              </label>
                              <label class="input_radio" for="radioSolar4">
                                 <input type="radio" id="radioSolar4" name="birthday_type2"
                                    v-model="leglEduYn" value="N">
                                 <span class="label_text">미 이수</span>
                              </label>
                           </div>
                        </td>
                        <th rowspan="2"><span class="emp_red">배치일자</span></th>
                        <td rowspan="1" class="">
                           <label for="">실제 배치일</label>
                           <DatePicker v-model="dpmtDt" class="fr" :format="'YYYY-MM-DD'"/>
                           <!-- <Datepicker ref="dpmtDatepicker" class="fr" v-on:value-change="dpmtDtChange" v-on:value-reset="dpmtDtReset"/> -->
                        </td>
                     </tr>
                     <tr>
                        <th>품질공구장</th>
                        <td class="">
                           <label class="input_check form_lg pop_notext">
                              <input type="checkbox" id="" name="" v-model="qultToolYn">
                              <span class="label_text"></span>
                           </label>
                        </td>
                        <td rowspan="1" class="">
                           <label for="">배치/변경 신고일 <br> (인·허가 기관)</label>
                           <DatePicker v-model="dpmtChangeDt" class="fr" :format="'YYYY-MM-DD'"/>
                           <!-- <Datepicker ref="dpmtChangeDatepicker" class="fr" v-on:value-change="dpmtChangeDtChange" v-on:value-reset="dpmtChangeDtReset"/> -->
                        </td>
                     </tr>
                     <tr class="">
                        <th rowspan="2">비고</th>
                        <td colspan="3" rowspan="2" class="">
                           <textarea name="" id="" class="form_control" :value="comment" @keyup="fn_inputCheck($event)" :maxLength="200"></textarea>
                           <p class="table_message ar mt0">{{ comment.length }} / {{ 200 }}</p>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            
            <MajorSearch v-on:fn-major-choice="majorChoice" v-bind:major-name="majorName" ref-id="AdminChange_MajorSearch"/>
            <PopAlert
               v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:btn-name="{first : '확인'}" v-bind:pop-id="popId"
               v-on:first-btn-fn="closePop"
            />
            <LstFile v-bind:lst-file-rst="lstFileRst"
                     v-bind:files="files"
                     v-bind:second-remove-file-id="secondRemoveFileId"
                     v-on:file-changed="fileChanged"
                     v-on:file-removed="fileRemoved"/>
         </div>
      </template>
      <template #modal-footer="{  }">
         <b-button class="btn btn_md btn_outline btn_darkgray"  v-on:click="finalClose">수정</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" @click="cancelBtn">취소</b-button>
         <!-- <b-button class="btn btn_md btn_outline btn_gray" v-on:click="resetAll">취소</b-button> -->
      </template>

      
   </b-modal>
</template>

<script>
   import LstFile from '@/pages/common/popup/LstFile.vue'
   // import Datepicker from '@/pages/common/popup/Datepicker.vue'
   import MajorSearch from '@/pages/common/popup/MajorSearch.vue'
   import PopAlert from '@/pages/common/popup/PopAlert.vue' 
   import DatePicker from '@component/common/DatePicker.vue'

   import { sendPostApi, sendPutApi, requestOptions } from '../../../apis/common';
   import { sendFileApi, requestFileOptions } from '../../../apis/common';
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

   import _ from 'lodash'

   export default {
      name: 'AdminChange',
      mixins: [authCheckMixns,MsgBoxMixins],
      components: {
         MajorSearch,
         PopAlert,
         LstFile,
         // Datepicker
         DatePicker,
      }, 
      data() {
         return {
            footerBg: 'transparent',
            files: [],
            color: '#f9f9f9',
            employeeName:'',
            majorName: '',
            majorKrNm : '',
            majorEnNm : '',
            majorId : '',
            memberName:'',
            level:'',
            leglEduYn:'',
            comment:'',
            dpmtDt:'',
            dpmtChangeDt:'',

            siteName : '',
            projectName: '',
            baseType : '',
            csrtType : '',
            ovCsrtExp : '',

            //qultToolYn : this.detailObj.qultToolYn == 'Y' ? true : false,
            qultToolYn : false,

            popMsg: '',
            confirmUse : false,
            popId : 'qultChangeAlert',

            apiChk : false,
            
            //파일 리스트및 삭제
            lstFileRst : [],
            totalCnt:0,
            totalSize:0,
            bytes:"KB",

            //파일 추가
            fileConnectId: 0,

            tempFileLst : [], //등록된 데이터
            secondRemoveFileId:[],  //등록된 데이터 아이디
            tempFiles : [],   //등록되지않은 임시데이터

         }
      },
      props: {
         projectId : {
            type : String,
            default : ''
         },
         siteId : {
            type : String,
            default : ''
         },
         detailObj : {
            type: Object,
            default : function() {
               return {}
            }
         },
         removeFileId : {
            type: Array
            , default : () => {
                return [];
            }
         },
         tempSet: {
            type : Object,
            default : function() {
               return {}
            }
         },
         refId: {
            type:String,
            default:'AdminChange',
         }
      },
      created(){
         // this.ovCsrtExp = this.detailObj.ovCsrtExp;
         // this.majorName = this.detailObj.majorName;
         // this.majorId = this.detailObj.majorId;
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
         },
         files : function(){
            // console.log("files change"+this.files);
         },
         secondRemoveFileId :function(){
            // console.log("lst file에서 지움"+this.secondRemoveFileId);
         }
      },
      methods: {
         enterEvent: function(){
            if(e.keyCode == 13) {
               this.closeAdminChangePop();
            }
         },
         // file drag & drop event
         // handleFileInput(e) { // 버튼 클릭시 리스트에 파일 추가
         //       e.preventDefault();
         //       let files = e.target.files;
         //       files = e.target.files
         //             if(!files) return;

         //       // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
         //       ([...files]).forEach(f => {
         //          this.files.push(f);
         //       });
         // },
         // removeFile(fileKey){ // 등록된 리스트 파일삭제
         //    console.log(this.lstFileRst[fileKey].fileComArcvId);
         //    this.fileQltFileArcvId.push(this.lstFileRst[fileKey].fileComArcvId);
         // },
         // removeTempFile(fileKey){ // 등록되지않은 리스트 파일삭제
         //       this.files.splice(fileKey, 1)lstFileRst
         // },
         closePop : function() { //기본 팝업 닫기 event
            this.$root.$emit('bv::hide::modal', 'qultChangeAlert');
           
            if(this.detailObj['changeChk'] && this.apiChk) {
               this.detailObj['changeChk'] = true;
               this.detailObj['changeCnt'] = 1;
               this.detailObj['fileQltFileArcvId'] = this.secondRemoveFileId;

               this.$emit("change-detail", this.detailObj);
               this.$root.$emit('bv::hide::modal', this.refId);
            }
         },
         majorChoice : function(infoMajor){
            this.majorName = infoMajor.majorKrNm;
            this.majorId = infoMajor.majorId;
            this.majorKrNm = infoMajor.majorKrNm;
            this.majorEnNm = infoMajor.majorEnNm;
         },
         dpmtDtChange : function(param) { //date-picker value change event
            this.dpmtDt = param;
         },
         dpmtDtReset : function() { //date-picker valueReset 함수 호출
            this.dpmtDt = null;
            // this.$refs.dpmtDatepicker.valueReset();
         },
         dpmtChangeDtChange : function(param) { //date-picker value change event
            this.dpmtChangeDt = param;
         },
         dpmtChangeDtReset : function() { //date-picker valueReset 함수 호출
            this.dpmtChangeDt = null;
            // this.$refs.dpmtChangeDatepicker.valueReset();
         },
         popupOpenCheck : function() {
            // console.log(this.detailObj['changeChk']);
            // console.log(this.detailObj);
            this.ovCsrtExp = this.detailObj.ovCsrtExp;
            this.majorName = this.detailObj.majorName;
            this.majorId = this.detailObj.majorId;
            this.memberName = this.detailObj.memberName;
            this.level = this.detailObj.level;
            this.leglEduYn = this.detailObj.leglEduYn;
            this.comment = this.detailObj.comment;
            this.dpmtDt = this.detailObj.dpmtDt;
            this.dpmtChangeDt = this.detailObj.dpmtChangeDt;
            
            // console.log("전공"+this.majorId);
            this.qultToolYn = (this.detailObj.qultToolYn == 'Y' ? true : false);
            if(this.detailObj['changeChk']){
               this.qualityMngrFileList();
               // console.log('들어옴');

               // this.lstFileRst = this.detailObj.lstFileRst;
               // this.tempFileLst = this.detailObj.lstFileRst;
            }else{
               this.lstFileRst = this.detailObj.lstFileRst;
               this.tempFileLst = this.detailObj.tempFileLst;
            }
            if(this.projectId != '' && this.siteId != '') {
               this.siteInfo();

               // this.$refs.dpmtDatepicker.valueChange(this.dpmtDt);
               // this.$refs.dpmtChangeDatepicker.valueChange(this.dpmtChangeDt);
               this.files = this.detailObj.files;
               // this.tempFiles =this.detailObj.files;
               // console.log(this.detailObj);
               // console.log("삭제파일");
               // console.log(this.fileQltFileArcvId);
            }
            // console.log(Object.keys(this.tempSet).length == 0);
            if(Object.keys(this.tempSet).length != 0){
               this.csrtType = this.tempSet.csrtType;
               this.baseType = this.tempSet.baseType;
               this.siteName = this.tempSet.siteName;
               this.projectName = this.tempSet.projectName;
               // console.log(this.tempSet.csrtType);
            }
            // console.log(this.lstFileRst);
            // console.log('detail값'+this.removeFileId);
            // console.log(this.detailObj);
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
         finalClose : _.debounce(function() {
            this.detailObj['majorId'] = this.majorId;
            this.detailObj['majorName'] = this.majorName;
            this.detailObj['qultToolYn'] = this.qultToolYn ? 'Y' : 'N';
            // console.log('전공'+this.detailObj['majorId']);

            if(this.memberName == '' || this.memberName == null) {
               // this.popMsg = '성명을 선택해주세요.';
               // this.$root.$emit('bv::show::modal', 'qultChangeAlert');
               this.alert('성명을 선택해주세요.');
               return;
            }
            // if(this.majorName == '' || this.majorName == null || this.majorId == '' || this.majorId == null) {
            //    this.popMsg = '전공을 선택해주세요.';
            //    this.$root.$emit('bv::show::modal', 'qultChangeAlert');

            //    return;
            // }
            if(this.level == '' || this.level == null) {
               // this.popMsg = '등급을 선택해주세요.';
               // this.$root.$emit('bv::show::modal', 'qultChangeAlert');

               this.alert('등급을 선택해주세요.');
               return;
            }
            if(this.leglEduYn == '' || this.leglEduYn == null) {
               // this.popMsg = '법정 교육 이수를 선택해주세요.';
               // this.$root.$emit('bv::show::modal', 'qultChangeAlert');

               this.alert('법정 교육 이수를 선택해주세요.');
               return;
            }
            if(this.dpmtDt == '' || this.dpmtDt == null || this.dpmtChangeDt == '' || this.dpmtChangeDt == null) {
               // this.popMsg = '배치일자를 선택해주세요.';
               // this.$root.$emit('bv::show::modal', 'qultChangeAlert');

               this.alert('배치일자를 선택해주세요.');
               return;
            }
            this.confirm('수정하시겠습니까?',this.changeDetail);
            // this.changeDetail();
         }, 500),
         changeDetail : function() {
            // console.log('이리로옴');
            if(this.detailObj['changeChk']) {
               this.changeApi();

               return;
            }else {//현장정보
               // console.log(this.detailObj);
               this.detailObj['files'] = this.files;
               this.detailObj['fileQltFileArcvId'] = this.secondRemoveFileId;
               this.detailObj['ovCsrtExp'] = this.ovCsrtExp;

               // console.log('마지막'+this.detailObj['fileQltFileArcvId']);
               
               this.$emit("change-detail", this.detailObj);
               this.$root.$emit('bv::hide::modal', this.refId);
            }
            
         },
         changeApi : async function() {
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/quailtyMngr/change';
            let param = {
                "siteMstrId" : this.detailObj.siteMstrId,
                "projectId" : this.detailObj.projectId,
                "siteId" : this.detailObj.siteId,
                "qultMngrId" : this.detailObj.qultMngrId,
                "memberId" : this.detailObj.memberId,
                "majorId" : this.majorId,
                "level" : this.level,
                "ovCsrtExp" : this.ovCsrtExp,
                "leglEduYn" : this.leglEduYn,
                "dpmtDt" : this.dpmtDt,
                "dpmtChangeDt" : this.dpmtChangeDt,
                "qultToolYn" : this.qultToolYn?'Y':'N',
                "comment" : this.comment
            };

            const resData = await sendPostApi(url, param).then((result) => {
               this.detailObj.ovCsrtExp = this.ovCsrtExp;
               this.detailObj.majorName = this.majorName;
               this.detailObj.majorId = this.majorId;
               this.detailObj.level = this.level;
               this.detailObj.leglEduYn = this.leglEduYn;
               this.detailObj.comment = this.comment;
               this.detailObj.dpmtDt = this.dpmtDt;
               this.detailObj.dpmtChangeDt = this.dpmtChangeDt;
               this.detailObj.qultToolYn = this.qultToolYn?'Y':'N';

               return result.data;
            }).catch((e) => {
               // console.log(e);
               return e.response.data;
            });

            //저장하시겠습니까? 팝업 닫기
            // this.$root.$emit('bv::hide::modal', 'qultChangeAlert');

            if(resData.rCode == "0000") {
               if(this.secondRemoveFileId != ''){
                  // console.log("삭제전"+this.secondRemoveFileId);
                  //파일 삭제먼저
                  requestOptions.headers['Accept-Language'] = "ko";
                  requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                  let url = '/sendApi/api/file/fileUnUse';
                  let param = {
                     fileType : "QualityMngr",
                     fileComArcvIds : this.secondRemoveFileId
                  };
                  const res_data = await sendPostApi(url, param).then((result) => {
                     this.lstFileRst = [];
                     return result.data;
                  }).catch((e) => {
                     // console.log(e);
                     return e.response.data;
                  });
                  // console.log(res_data);
               }

               //파일 추가
               if(this.files != '' && typeof(this.files) != 'undefined'){
                  requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                  this.fileConnectId = this.detailObj.qultMngrId;
                  const res_data2 = await sendFileApi(this.fileConnectId, "QualityMngr", this.files).then((result) => {
                     return result.data;
                  }).catch((e) => {
                     // console.log(e.response.data);
                     return e.response.data;
                  });
                  let fileRst = res_data2.data; //저장된 데이터개수 받아오기
                  if(fileRst != ''){
                     // this.apiChk = true;     
                     // this.popMsg = '저장되었습니다.';
                     this.alert('수정되었습니다.',()=>{
                        this.detailObj['changeChk'] = true;
                        this.detailObj['changeCnt'] = 1;
                        this.detailObj['fileQltFileArcvId'] = this.secondRemoveFileId;

                        this.$emit("change-detail", this.detailObj);
                        this.$root.$emit('bv::hide::modal', this.refId);
                     });
                     return;
                  }else{
                     // this.apiChk = false;
                     // this.popMsg = '저장에 실패했습니다.';
                     this.alert('수정에 실패했습니다.');
                     return;
                  }
               }else{ //추가할 파일이 없을경우
                  // this.apiChk = true;
                  // this.popMsg = '저장되었습니다.';
                  this.alert('수정되었습니다.',()=>{
                     this.detailObj['changeChk'] = true;
                     this.detailObj['changeCnt'] = 1;
                     this.detailObj['fileQltFileArcvId'] = this.secondRemoveFileId;

                     this.$emit("change-detail", this.detailObj);
                     this.$root.$emit('bv::hide::modal', this.refId);
                  });
               }
            }else {
               this.apiChk = false;
               // this.popMsg = resData.rMsg;
               this.alert('수정에 실패했습니다.');
               return;
            }
            // this.$root.$emit('bv::show::modal', 'qultChangeAlert');
         },
         qualityMngrFileList : async function() { // 첨부파일 리스트(품질관리자용)
            // console.log('현장정보아님');
            this.lstFileRst = [];//실행전 데이터 제거
            let insertedFiles = []; //등록된 파일
            if(typeof(this.detailObj['qultMngrId'])!= 'undefined'){
               // console.log('품질관리자 id 보유');
               requestOptions.headers['Accept-Language'] = "ko";
               requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
               let url = '/sendApi/api/file/upFileList';
               let param = {
                  fileType : "QualityMngr",
                  fileConnectId : this.detailObj['qultMngrId'],
               };

               const resData = await sendPostApi(url, param).then((result) => {
                  return result.data;
               }).catch((e) => {
                  // console.log(e);
                  return e.response.data;
               });
               // console.log(resData);
               insertedFiles = resData.data;
            }
            if(insertedFiles.length>0){
               insertedFiles.forEach(data => {
                  this.lstFileRst.push(data);
               })
            }
            return insertedFiles;
         },
         fileChanged(payload) {
            this.files = payload
            // console.log(this.files);
         },
         fileRemoved(id) {
            this.secondRemoveFileId = id
            // console.log("fileRemoved"+this.secondRemoveFileId);
         },
         resetAll(){
            Object.assign(this.$data, this.$options.data());
            this.$root.$emit('bv::hide::modal', this.refId);
         },
         cancelBtn: function(){
            this.confirm("수정중인 내용이 있습니다. 취소하시겠습니까?",() => {
               this.closeAdminChangePop();
            });
         },
         closeAdminChangePop(){//취소버튼 클릭시
            // console.log('here');
            // console.log(this.tempFileLst);
            this.detailObj['backYn'] = 'Y';
            this.detailObj['lstFileRst'] = this.tempFileLst;
            // this.detailObj['files'] = this.tempFiles;
            // this.detailObj['fileQltFileArcvId'] = [];
            // if(this.detailObj.apiChk){
               this.secondRemoveFileId = [];
               this.detailObj['fileQltFileArcvId'] = [];
            // }
            this.$emit("change-detail", this.detailObj);
            this.$root.$emit('bv::hide::modal', this.refId);
         },
         fn_inputCheck(evt){
            if(200 >= evt.target.value.length){
               this.comment = evt.target.value;
            }
         },
      },
   }
</script>