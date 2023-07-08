<template>
   <div class="App sub">
      <div class="nav_header">
         <button class="btn_back" @click="historyBack"></button>  
         <h2> {{ eduTrainingHeader}} </h2>
         <div class="nav_icon" style="width:25px">  </div>
      </div>
      <div class="worker_education">
         <div class="edu_video_container">
         <!-- <h2> ■ {{ mainName}} > {{ midName }} {{ eduTrainingNm }} </h2> -->
            <video ref="myvideo"
               class="video"
               :src="src" 
               type="video/mp4"
               controls
               controlsList="nodownload"
               @ended="onEnd"
            >
            </video>
         </div>
      </div>
      <div class="edu_info mt40 main_container">
         <h2>■ {{ mainName}} > {{ midName }} {{ eduTrainingNm }}</h2>
         <p class="edu_info_box">
            <b-icon icon="exclamation-circle"></b-icon> {{ eduTrainingLine1 }}
         </p>
      </div>
      <div class="file_upload_wrap mt20">
         <div class="upload_box">
            <h3> ※ {{ eduTraining2 }}</h3>
            <div class="file_wrap" v-for="(file, index) in files" :key="index">
               <!-- <a href="javascript:(0)" class="file mt0" @click="pdfDown(file)"> <i class="icon icon_file"></i> {{ file.orgFileName }}</a> @click="pdfViewer(file)" -->
               <a href="javascript:(0)" class="file mt0" @click="fn_onModal(file)"> <i class="icon icon_file"></i> {{ file.orgFileName }}</a> <!--@click="pdfViewer(file)"-->
            </div>
         </div>
      </div>
      <div class="main_container" style="margin-bottom:100px"><!-- style="margin-bottom:100px" -->
         <span class="info_txt">
            # {{ eduTrainingLine2 }}
         </span>
      </div>

      <div class="button_box detail_btn type1">
         <a class="btn btn_sm btn_blue" @click="eduComplBtn">{{ eduTraining3 }}</a>
      </div>

      <MobilePopup id="EDU_APPROVAL" :mainMsg="msg"
      btnRight="확인" 
      @modalHandler="$bvModal.hide('EDU_APPROVAL')"/>

      <iframe
         v-if="requestUrl.fileId !== ''"
         class="w100 iframe-height"
         :src="requestUrl.src"
         style="height : 100vh; width: 100%;"
      />
   </div>

</template>

<script>
   import MobilePopup from "@/pages/common/popup/MobilePopup.vue"
   import API from '@/apis/'
   import _ from 'lodash'
   import axios from 'axios'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   
   export default {
      name: 'WorkerEduCationMobileView',
      mixins: [MsgBoxMixins],
      components: {
        MobilePopup,
      },
      data: () => ({
         src : '',
         eduTrainingHeader : '',
         eduTrainingNm : '',
         mainName : '',
         midName : '',
         eduTrainingLine1 : '',
         eduTraining2 : '',
         eduTrainingLine2 : '', 
         eduTraining3 : '',
         eduTrainingLine3 : '', 
         eduTrainingPopup : '', 
         workerEduMtrlId : '',
         fileChkEduArcvId : '',
         ended : false,
         downloadable : false,
         files : [],
         mainCodeId : '',
         midCodeId : '',
         langCode : '',
         projectId : '',
         msg : '',
         requestUrl : {
            fileId : '',
            src: '',
         }
      }),
      created(){
         this.workerEduMtrlId = this.$store.getters['workerEdu/getWorkerEduMtrlId']
         this.mainCodeId = this.$store.getters['workerEdu/getMainCode'] 
         this.midCodeId = this.$store.getters['workerEdu/getMidCode'] 
         this.langCode = this.$store.getters['workerEdu/getLangCode'] 
         this.projectId = this.$store.getters['workerEdu/getProjectId'] 
         this.getWorkerEduCodeLangList()
         this.getSelectMaterialList()
         this.getFileInfoList()
         this.getFileInfoList2()
         this.saveEduWorker()
         
      },
      mounted() {
         if(document.querySelector('.wrap.p0') != null){
            if(document.querySelector('.wrap.p0').classList[0] == 'wrap'){
               document.querySelector('.wrap.p0').classList.remove('wrap')
            }
         }
      },
      methods: {
         historyBack: function () {   
            this.$router.push({
               name: 'WorkerEduCationMobileSelect',
               query: { mainCodeId : this.mainCodeId, midCodeId : this.midCodeId, langCode: this.langCode, projectId : this.projectId}
            })
         },
         /**
          * 신규 근로자 교육 현황 모바일 다국어 지원
          */
         async getWorkerEduCodeLangList(){
            const payload = {
               langCode : this.langCode
            }
            try {
               const result = await API.workerEdu.getMobileContensLangList(payload)
               if(result?.dlContsMultiLang) {
                  this.eduTrainingHeader = result.dlContsMultiLang.S2_1
                  this.eduTrainingLine1 = result.dlContsMultiLang.S2_4
                  this.eduTraining2 = result.dlContsMultiLang.S2_3
                  this.eduTrainingLine2 = result.dlContsMultiLang.S2_5
                  this.eduTraining3 = result.dlContsMultiLang.S2_2
                  this.eduTrainingLine3 = result.dlContsMultiLang.S2_6
                  this.msg = result.dlContsMultiLang.S2_6
               }
            } catch (error) {
               console.error('언어 번역 리스트 가져오기 실패 : ', error)
            }
         },
         /**
          * 공통 교육 및 공통 교재 불러오기
          */
         async getSelectMaterialList(){
            const payload = {
               workerEduMtrlId : this.workerEduMtrlId
            }
            try {
               const response = await API.workerEdu.getSelectMaterialList(payload)
               if(response?.dlSelMaterial){
                  this.mainName = response.dlSelMaterial[0].mainName
                  this.midName = response.dlSelMaterial[0].midName
                  this.eduTrainingNm = response.dlSelMaterial[0].mtrlName
               }
            } catch (error) {
               console.error('공통 교육 및 공통 교재 불러오기 에러 : ', error)
            }
         },
         /**
          * 신규 근로자 교육 현황 VIDEO 파일 불러오기 이벤트
          */
         async getFileInfoList() {
            const payload = {
               fileConnectId : this.workerEduMtrlId,
               fileType : 'WorkerEdu',
               fileSubType: 'video'
            }
            try {
               const result = await API.concrete.loadFileInfo(payload)
               if(result?.data){
                  this.fileChkEduArcvId = result.data[0].fileChkEduArcvId
                  this.src = '/sendApi/api/fileCall/getChkEduArcvFile/'+result.data[0].fileChkEduArcvId
               }
            } catch (error) {
               console.error('파일 불러오기 에러 : ', error)
            }
         },
         /**
          * 신규 근로자 교육 현황 PDF 파일 불러오기 이벤트
          */
         async getFileInfoList2() {
            const payload = {
               fileConnectId : this.workerEduMtrlId,
               fileType : 'WorkerEdu',
               fileSubType: 'pdf'
            }
            try {
               const result = await API.concrete.loadFileInfo(payload)
               if(result?.data){
                  this.files = result.data
               }
            } catch (error) {
               console.error('파일 불러오기 에러 : ', error)
            }
         },
         /**
          * 영상 감지 시청을 마치면 true
          */
         onEnd () {
            this.ended = true
         },
         /**
          * 교육이수 인증 버튼 눌렀을때 이벤트
          */
         eduComplBtn () {
            // if(this.ended === false){
            //    this.$bvModal.show('EDU_APPROVAL')
            // } else {
            //    this.$router.push({
            //       name: 'WorkerEduCationMobilePledge',
            //       query: { workerEduMtrlId : this.workerEduMtrlId, mainCodeId : this.mainCodeId, midCodeId : this.midCodeId, langCode: this.langCode}
            //    })
            // }
            this.$router.push({
               name: 'WorkerEduCationMobilePledge',
               query: { workerEduMtrlId : this.workerEduMtrlId, mainCodeId : this.mainCodeId, midCodeId : this.midCodeId, langCode: this.langCode}
            })
         },
         /**
          * 교육자료 PDF 파일 클릭시 PDF Down 이벤트 
          */
         pdfDown: function(fileInfo) {
            const fileId = this.getFileId(fileInfo)
            const url = '/sendApi/api/file/singleFileDownload'
            const payload = {
               fileId: fileId
            }

            axios.post(url, payload, {
               headers: {
                  'Accept-Language': 'ko',
                  'Authorization': this.$cookies.get("Authorization"),
               },
               responseType: 'blob'
            }).then(response => {
               const blob = new Blob([response.data])
               const fileName = fileInfo.orgFileName

               // Internet Explorer
               if (typeof window.navigator.msSaveBlob !== 'undefined') {
                  window.navigator.msSaveOrOpenBlob(blob, fileName)
               // Other Browsers
               } else {
                  const objectUrl = window.URL.createObjectURL(blob);
                  const link = document.createElement('a')

                  link.style.cssText = 'display:none'
                  link.href = objectUrl
                  link.setAttribute('download', fileName)

                  if (typeof link.download === 'undefined') {
                        link.setAttribute('target', '_blank')
                  }

                  document.body.appendChild(link)
                  link.click()
                  link.remove()
                  window.URL.revokeObjectURL(objectUrl)

               }
            }).catch(error => {
               console.error(error)
               throw new Error(error)
            })
         },
         getFileId (fileObj) {
            return fileObj.fileId
            || fileObj.fileChkBsArcvId 
            || fileObj.fileChkEduArcvId
            || fileObj.fileComArcvId
            || fileObj.fileQltArcvId
            || fileObj.fileQltImgArcvId
         },
         // 교육 이수자 정보 저장
         saveEduWorker(){

            // 작업자 교육은 이름으로 로그인하므로 ID와 name이 바뀜: 주의요망
            const payload = {
               workerEduMtrlId : this.workerEduMtrlId,
               workerName : this.$store.getters['auth/getUserId'],
               workerId : this.$store.getters['auth/getUserNm'],
               projectId : this.$store.getters['auth/getProjectId'],
               partnrId : this.$store.getters['auth/getTradeId'],
               partnrName : this.$store.getters['auth/getTradeNm'],
               workerGender : this.$store.getters['auth/getSex'],
               workerNtnlCode : this.$store.getters['auth/getNationalityCd'],
               workerNtnlName : this.$store.getters['auth/getNationality'],
            }
            try {
               const result = API.workerEdu.getEduCationStatusChange(payload)               
            } catch (error) {
               console.error('작업자 교육 이수자 정보 생성 에러 : ', error)
            }
         },
         fn_onModal(item) {
            // if(!commonFn.methods.isEmpty(item)){
            //    return;
            // }
            this.modalShow = true;
            this.requestUrl.fileId = item.fileChkEduArcvId;
            const filePath = process.env.VUE_APP_SERVER_ADDR+`/api/fileCall/docViewer/`+this.requestUrl.fileId
            // const filePath = `http://sqms.smartbizcore.com/api/fileCall/docViewer/`+this.requestUrl.fileId
            const convertType = "0"
            const fileType = "URL"
            const encodeUrl = encodeURIComponent(filePath)
            this.requestUrl.src = process.env.VUE_APP_SYNAP_DOMAIN+`?fid=${this.requestUrl.fileId}&filePath=${encodeUrl}&convertType=${convertType}&fileType=${fileType}`
         }
       }
   }
</script>

<style>

</style>