<template>
   <b-modal :id="refId" title="품질관리자 현황 상세" hide-backdrop size="lg" :footer-bg-variant="footerBg"  v-on:shown="popupOpenCheck">
      <template #default>
         <div class="pop_container">
            <button type='button' class="btn btn_md btn_outline btn_darkgray btn_print" @click="print">출력</button>
            <div id="popup_quality_detail_area" class="a4">
               <button type="button" id="printBtn" style="display: flex;visibility: hidden;height: 0px;padding: 0;border: none;" v-print="'#popup_quality_detail_area'">출력</button>
               <div class="table_normal_list mt10">
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
                           <th><span class="emp_red">성명</span></th>
                           <td class="">{{detailObj.memberName}}</td>
                           <th>전공</th>
                           <td class="">{{detailObj.majorName}}</td>
                        </tr>
                        <tr>
                           <th><span class="emp_red">등급</span></th>
                           <td class="">
                              {{detailObj.level == 'EXPR' ? '특급' : 
                                    detailObj.level == 'ADVC' ? '고급' : 
                                    detailObj.level == 'MIDL' ? '중급' : 
                                    detailObj.level == 'BGIN' ? '초급' : '없음'}}
                           </td>
                           <th>해외공사경력(개월)</th>
                           <td class="">{{detailObj.ovCsrtExp}}</td>
                        </tr>
                        <tr>
                           <th><span class="emp_red">법정 교육 이수</span></th>
                           <td>{{detailObj.leglEduYn == 'Y' ? '이수 완료' : '미 이수'}}</td>
                           <th rowspan="2"><span class="emp_red">배치일자</span></th>
                           <td rowspan="1" class="">
                              <label for="">실제 배치일</label>
                              <p class="fr">{{detailObj.dpmtDt}}</p>
                           </td>
                        </tr>
                        <tr>
                           <th>품질공구장</th>
                           <td>
                              <label class="input_check form_lg pop_notext">
                                 <input type="checkbox" id="" name="" v-model="qultToolYn" disabled>
                                 <span class="label_text"></span>
                              </label>
                           </td>
                           <td rowspan="1" class="">
                              <label for="">배치/변경 신고일 <br> (인·허가 기관)</label>
                              <p class="fr">{{detailObj.dpmtChangeDt}}</p>
                           </td>
                        </tr>
                        <tr>
                           <th rowspan="2">비고</th>
                           <td colspan="3" rowspan="2">{{detailObj.comment}}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>

               <div class="lst_file w100">
                  <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                  <ul>
                     <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                        <a href="javascript:void(0); " v-on:click="orgFileDown(index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                     </li>
                     <li v-for="(siteFile, fIndex) in detailObj.files" v-bind:key="fIndex+'|'">
                        <a href="javascript:void(0);" v-on:click="newFileDown(fIndex)"><i class="ico_file" :class="fn_getFileIcons(siteFile.name)">{{siteFile.name}} ({{tempFileSize[fIndex]}})</i></a>
                     </li>
                  </ul>
               </div>
            </div>
            <AdminChange 
               v-bind:project-id="projectId" v-bind:site-id="siteId" 
               v-bind:detail-obj="detailObj"
               v-bind:remove-file-id="fileQltFileArcvId"
               v-on:change-detail="changeDetail"
               v-bind:temp-set="tempSet" :ref-id="'qltyMngrAdminChange'"
            />
         </div>
         
      </template>
      <template #modal-footer="{  }"> <!-- #modal-footer="{ ok, hide } -->
         <b-button v-if="changeBtn" class="btn btn_md btn_outline btn_darkgray" v-b-modal.qltyMngrAdminChange> <!-- @click="ok" -->수정</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" v-on:click="endDetail"> 닫기
         </b-button>
      </template>
   </b-modal>
</template>

<script>
   import AdminChange from '@/pages/common/popup/AdminChange.vue'

   import { sendPostApi, requestOptions } from '../../../apis/common';
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js';
   import { commonFn } from '@/script/commonFn.js';
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import commonUtilMixins from '@plugin/mixin/CommonUtil.js'

   export default {
      name: 'AdminDetail',
      mixins: [authCheckMixns,MsgBoxMixins, commonUtilMixins],
      components:{
         AdminChange
      },
      data() {
         return {
            footerBg: 'transparent',

            siteName : '',
            projectName: '',
            baseType : '',
            csrtType : '',

            qultToolYn : this.detailObj.qultToolYn == 'Y' ? true : false,
            lstFileRst : [],
            fileQltFileArcvId : [],
            totalCnt:0,
            totalSize:'',
            tempFileSize :[],
            changeCnt: 0,
            // beforeFiles : [],
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
         changeBtn : {
            type: Boolean,
            default : true
         },
         tempSet: {
            type : Object,
            default : function() {
               return {}
            }
         },
         refId: {
            type:String,
            default: 'AdminDetail',
         }
      },
      // watch:{
      //    fileQltFileArcvId :function(){
      //       console.log("fileQltFileArcvId"+this.fileQltFileArcvId);
      //       this.detailObj['fileQltFileArcvId']= this.fileQltFileArcvId;
      //    }
      // },
      methods : {
         popupOpenCheck : function() {
            // console.log(this.detailObj);
            // console.log(this.detailObj.qultMngrId);
            if(this.projectId != '' && this.siteId != '') {
               this.siteInfo();
               this.qualityMngrFileList();
               this.qultToolYn = this.detailObj.qultToolYn == 'Y' ? true : false;
            }
            // console.log(Object.keys(this.tempSet).length == 0);
            if(Object.keys(this.tempSet).length != 0){
               this.csrtType = this.tempSet.csrtType;
               this.baseType = this.tempSet.baseType;
               this.siteName = this.tempSet.siteName;
               this.projectName = this.tempSet.projectName;
               // console.log(this.tempSet.csrtType);
            }
            this.detailObj.ovCsrtExp = commonFn.methods.addCommas(this.detailObj.ovCsrtExp);
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
               // console.log(detail);
               
               if(detail != null) {
                  this.projectName = detail.projectNm;
                  this.siteName = detail.siteNm;
                  this.baseType = detail.baseType;
                  this.csrtType = detail.csrtType;
               }
               // this.dataClear();
            }
         },
         changeDetail : function(infoQult) {
            // console.log('here');
            // console.log(this.fileQltFileArcvId);
            this.$root.$emit('bv::hide::modal', 'qltyMngrAdminChange');
            // console.log(infoQult);
            this.detailObj = infoQult;
            this.detailObj.ovCsrtExp = commonFn.methods.addCommas(this.detailObj.ovCsrtExp);
            // if(this.detailObj['backYn'] == 'Y'){
            //    this.files = this.beforeFiles;
            // }else{
            //    this.beforeFiles = this.files;
            // }
            // console.log(this.beforFiles);
            // console.log(this.detailObj.fileQltFileArcvId);
            if(typeof(this.detailObj.fileQltFileArcvId) != 'undefined' && this.detailObj.fileQltFileArcId != []){
               for(let idx = 0; idx<this.detailObj.fileQltFileArcvId.length; idx++){
                  if(!this.fileQltFileArcvId.includes(this.detailObj.fileQltFileArcvId[idx])){
                     this.fileQltFileArcvId.push(this.detailObj.fileQltFileArcvId[idx]);
                  }
               }
               // console.log(this.fileQltFileArcvId);
            }
            this.qultToolYn = this.detailObj.qultToolYn == 'Y' ? true : false;
            // console.log(this.detailObj);
            this.detailObj['changeCnt'] = 0;
            this.detailObj['fileQltFileArcvId'] = this.fileQltFileArcvId;
            // console.log('끝');
            // console.log(this.detailObj);
            // console.log('this.qultToolYn'+this.qultToolYn);
            // console.log('fileQltFileArcvId'+this.fileQltFileArcvId);
            this.qualityMngrFileList();
         },
         endDetail : function() {
            if(this.detailObj.changeChk){
               // console.log('초기화');
               // console.log(this.detailObj);
               this.fileQltFileArcvId = [];
            }
            this.detailObj['changeCnt'] = 1;
            this.$root.$emit('bv::hide::modal', this.refId);
            this.$emit("end-detail", this.detailObj);
         },
         qualityMngrFileList : async function() {
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

            this.totalCnt = 0; //파일갯수
            this.totalSize = '0 KB';
            let inputFileSize = 0;
            if(typeof(this.detailObj.files) !='undefined'){
               if(this.detailObj.files.length>0){// 현장정보일때
                  for(let j = 0; j< this.detailObj.files.length; j++){
                     this.totalCnt++;
                     // console.log('시퀀스 없는 파일');
                     // console.log(this.detailObj.files[j]);
                     inputFileSize += parseInt(this.detailObj.files[j].size); //총파일크기
                     let tempSize = this.formatBytes(parseInt(this.detailObj.files[j].size), 2);
                     this.tempFileSize.push(tempSize);
                  }
               }
            }

            if(insertedFiles.length>0){
               for(let i = 0; i< insertedFiles.length;i++){
               //    let check = true;
               //    for(let r = 0; r<this.fileQltFileArcvId.length; r++){
               //       if(resData.data[i].fileComArcvId == this.fileQltFileArcvId[r]){
               //          check = false;
               //       }
               //    }
                  if(typeof(this.fileQltFileArcvId)!= 'undefined'){
                     // console.log('삭제할 파일 있음');
                     if(!this.fileQltFileArcvId.includes(insertedFiles[i].fileComArcvId)){
                        this.lstFileRst.push(insertedFiles[i]);
                        this.totalCnt++;
                        inputFileSize += parseInt(insertedFiles[i].fileSize); //총파일크기
                        insertedFiles[i].fileSize = this.formatBytes(parseInt(insertedFiles[i].fileSize), 2); //각각의 파일크기
                     }
                  }else{
                     // console.log('삭제할 파일 없음');
                     this.fileQltFileArcvId  = [];
                     this.lstFileRst.push(insertedFiles[i]);
                     this.totalCnt++;
                     inputFileSize += parseInt(insertedFiles[i].fileSize); //총파일크기
                     insertedFiles[i].fileSize = this.formatBytes(parseInt(insertedFiles[i].fileSize), 2); //각각의 파일크기
                  }
               }
            }
            // resData.data.forEach(data => {
            //    this.lstFileRst.push(data);
            // })

            if(inputFileSize > 0){
               this.totalSize = this.formatBytes(inputFileSize,2);
            }

            this.detailObj['lstFileRst'] = this.lstFileRst;

            return insertedFiles;
         },
         formatBytes(bytes, decimals = 0) {//바이트 계산
            if (bytes === 0) return '0 MB';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
         },
         orgFileDown: function(index){//데이터 등록된 파일
            let fileCode = this.lstFileRst[index].fileComArcvId;
            let fileName = this.lstFileRst[index].orgFileName;
            // console.log(fileCode);
            
            let element = document.createElement('a');
            element.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/'+fileCode);
            element.setAttribute('download',fileName);
            element.click();
            element.remove();
         },
         newFileDown: function(index){//데이터 등록되지않은 파일
            let fileCode = URL.createObjectURL(this.detailObj.files[index]);
            let fileName = this.detailObj.files[index].name;
            // console.log(this.detailObj.files[index]);
            let element = document.createElement('a');
            element.setAttribute('href',fileCode);
            element.setAttribute('download',fileName);
            element.click();
            element.remove();
         },
         print:function(){
            let btn = document.getElementById('printBtn');
            btn.click();
         }
      }
   }
</script>