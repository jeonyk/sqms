<template>
   <div class="App sub">
      <div class="nav_header">
         <button class="btn_back" @click="historyBack"></button>   
         <h2> {{ qualityPledge }} </h2>
         <div class="nav_icon" style="width:25px"> </div>
      </div>

      <div class="notice_detail">
         <div class="edu_info mt30 main_container">
            <span class="info_txt">■ {{ qualityPledgeLine1 }}</span>
            <p class="edu_info_box mt20" style="color:#333">
               {{ qualityPledgeLine2 }}
            </p>
            <input type="checkbox" id="agreeEdu" v-model="isCheck">
            <label for="agreeEdu" class="mt10 pl30">{{ qualityPledgeLine3 }}</label>
         </div>
      </div>

      <div class="button_box detail_btn type1">
         <a class="btn_cancel" :class="this.isCheck ? 'on' : 'gray'" @click="pledgeCompl">{{ qualityPledgeLine4 }}</a>
      </div>

      <MobilePopup id="PLEDGEAGREE" :mainMsg="msg1" :btnRight="msg2" @modalHandler="$bvModal.hide('PLEDGEAGREE')" />
      <MobilePopup id="alert" :mainMsg="msg3" :btnRight="msg2" @modalHandler="closeBtn" />

   </div>
</template>

<script>
   import MobilePopup from "@/pages/common/popup/MobilePopup.vue"
   import API from '@/apis/'
   import _ from 'lodash'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

   export default {
      name: 'workerEduCationMobilePledge',
      mixins: [MsgBoxMixins],
      components: {
         MobilePopup
      },
      data : () => ({
         isCheck: false,
         qualityPledge : '',
         qualityPledgeLine1 : '',
         qualityPledgeLine2 : '',
         qualityPledgeLine3 : '',
         qualityPledgeLine4 : '',
         msg1 : '',
         msg2 : '',
         msg3 : '',
         msgAlert1 : '',
         msgAlert2 : '',
         wokerId : '',
         workerEduMtrlId : '',
         mainCodeId : '',
         midCodeId : '',
         langCode : '',
         projectId : '',
      }),
      created() {
         this.workerEduMtrlId = this.$store.getters['workerEdu/getWorkerEduMtrlId']
         this.mainCodeId = this.$store.getters['workerEdu/getMainCode'] 
         this.midCodeId = this.$store.getters['workerEdu/getMidCode'] 
         this.langCode = this.$store.getters['workerEdu/getLangCode'] 
         this.projectId = this.$store.getters['workerEdu/getProjectId'] 
         this.getWorkerEduCodeLangList()
      },
      mounted() {
         document.querySelector('.wrap.p0').classList.remove('wrap')
      },
      methods: {
         historyBack: function () {
            
            this.$router.push({
               name: 'WorkerEduCationMobileView',
               query : { workerEduMtrlId : this.workerEduMtrlId, mainCodeId : this.mainCodeId, midCodeId : this.midCodeId, langCode : this.langCode, projectId : this.projectId}
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
                  this.qualityPledge = result.dlContsMultiLang.S3_1
                  this.qualityPledgeLine1 = result.dlContsMultiLang.S3_2
                  this.qualityPledgeLine2 = result.dlContsMultiLang.S3_3
                  this.qualityPledgeLine3 = result.dlContsMultiLang.S3_4
                  this.qualityPledgeLine4 = result.dlContsMultiLang.S3_5
                  this.msg1 = result.dlContsMultiLang.S3_6
                  this.msg2 = result.dlContsMultiLang.S3_7
                  this.msgAlert1 = result.dlContsMultiLang.S3_8
                  this.msgAlert2 = result.dlContsMultiLang.S3_9
               }
            } catch (error) {
               console.error('언어 번역 리스트 가져오기 실패 : ', error)
            }
         },
         async pledgeCompl () {
            if(this.isCheck === false){
               this.$bvModal.show('PLEDGEAGREE')
            } else {
               this.wokerId = this.$store.getters['auth/getUserNm']
               const payload = {
                  workerEduMtrlId : this.workerEduMtrlId,
                  workerId : this.wokerId,
                  projectId : this.projectId,
                  eduAgree : 'Y'
               }
               try {
                  const result = await API.workerEdu.getEduCatorComplete(payload)
                  if(result?.count > 0){
                     this.msg3 = this.msgAlert1
                     this.$bvModal.show('alert')
                  } else {
                     // 재 이수시도 이수 완료 메세지 표시
                     this.msg3 = this.msgAlert1
                     //this.msg3 = this.msgAlert2
                     this.$bvModal.show('alert')
                  }
               } catch (error) {
                  console.error('신규 근로자 교육 현황 이수 처리 실패 : ', error)
               }
            }
         },
         closeBtn () {
            this.$router.push({
               name: 'WorkerEduCationMobileSelect',
               query : { mainCodeId : this.mainCodeId, midCodeId : this.midCodeId, langCode : this.langCode}
            })
         }
      },
   }
</script>

<style>

</style>