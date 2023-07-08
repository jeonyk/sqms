<template>
   <div class="App sub">
      <div class="nav_header">
         <!--<button class="btn_back" @click="historyBack"></button>  -->
         <h2> {{ header1 }} </h2>
         <div class="nav_icon" style="width:25px"> </div>
      </div>

      <div class="notice_detail pb50">
         <div class="edu_info mt30 main_container">
            <h3 class="mb20">{{ header2 }}</h3>
            <div>
               <div 
                  class="button_box mb20"
                  v-for="list in publicMtrlList" 
                  :key="list.workerEduMtrlId"
               >
                  <a 
                     class="btn_cancel" 
                     :class="class1"
                     @click="videoBtn(list.workerEduMtrlId)" 
                     >
                     {{ list.mtrlName }}
                  </a>
               </div>
            </div>      
         </div>

         <hr>

         <div 
            class="edu_info mt30 main_container"
            v-for="list in mainMtrlList" 
            :key="list.workerEduMtrlId"
         >
            <h3 class="mb20">{{ list.mainName }}</h3>
            <div >
               <div 
                  class="button_box mb20"
               >
                  <a 
                     class="btn_cancel" 
                     :class="class2" 
                     @click="videoBtn(list.workerEduMtrlId)"
                  >
                     {{ list.midName }}.{{ list.mtrlName }}
                  </a>
               </div>
            </div>             
         </div>

      </div>
   </div>
</template>

<script>
   import API from '@/apis/'
   import _ from 'lodash'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   export default {
      name: 'WorkerEduCationMobileSelect',
      mixins: [MsgBoxMixins],
      components: {
      },
      data: () => ({
         mainCodeId : '',
         midCodeId : '',
         langCode : '',
         workerEduType : '2',
         mainName : '',
         midName : '',
         mtrlName : '',
         class1 : 'green',
         class2 : 'on',
         publicMtrlList : [],
         mainMtrlList : [],
         header1 : '',
         header2 : '',
      }),
      created(){
         this.mainCodeId = this.$store.getters['workerEdu/getMainCode'] 
         this.midCodeId = this.$store.getters['workerEdu/getMidCode'] 
         this.langCode = this.$store.getters['workerEdu/getLangCode'] 
         this.getWorkerEduCodeLangList()
         this.getSelectMaterialList()
      },
      mounted() {
         if(document.querySelector('.wrap.p0') != null){
            if(document.querySelector('.wrap.p0').classList[0] === 'wrap'){
               document.querySelector('.wrap.p0').classList.remove('wrap')
            }
         }
         
      },
      methods: {
         historyBack: function () {
            this.$router.go(-1)
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
                  this.header1 = result.dlContsMultiLang.S1_1
                  this.header2 = result.dlContsMultiLang.S1_2
               }
            } catch (error) {
               console.error('언어 번역 리스트 가져오기 실패 : ',error)
            }
         },
         /**
          * 공통 교육 및 공통 교재 불러오기
          */
         async getSelectMaterialList(){
            const payload = {
               //workerEduType : this.workerEduType,
               //mainCodeId : this.mainCodeId,
               //midCodeId : this.midCodeId,
               langCode : this.langCode,
            }
            try {
               const response = await API.workerEdu.getSelectMaterialList(payload)
               if(response?.dlSelMaterial){

                  this.publicMtrlList = response.dlSelMaterial.filter(item =>item.workerEduType == "1");
                  this.mainMtrlList = response.dlSelMaterial.filter(item =>item.workerEduType == "2" && item.mainCodeId == this.mainCodeId && item.midCodeId == this.midCodeId);

               }
            } catch (error) {
               console.error('공통 교육 및 공통 교재 불러오기 에러 : ',error)
            }
         },
         videoBtn (seq) {

            this.$store.dispatch('workerEdu/setWorkerEduMtrlId', seq);

            this.$router.push({
               name: 'WorkerEduCationMobileView',
               query : { workerEduMtrlId : seq, mainCodeId : this.mainCodeId, midCodeId : this.midCodeId, langCode : this.langCode, projectId : this.projectId}
            })
         }
      }
   }
</script>

<style>

</style>