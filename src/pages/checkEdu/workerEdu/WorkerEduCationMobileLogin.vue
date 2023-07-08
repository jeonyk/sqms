<template>
   <div class="App sub">
      <div class="main_container">
         <div class="worker_education">
            <div class="top_layout">
               <div class="logo">
                  <img src="../../../assets/img/layout/HEC_logo.svg" alt="현대 엔지니어링 로고">
               </div>
               <h2></h2>
            </div>
            <div class="grid_wrap pb50">
               <div class="division">
                  <div class="grid_container mt40">
                     <div class="grid_box grid_column">
                        <div class="box"><input type="text" :placeholder="name" v-model="userId"></div>
                     </div>
                     <div class="grid_box grid_column grid_select">
                        <div class="box">
                           <input type="text" 
                              id="single-factor-code-text-field"
                              name="auth-token"
                              inputmode="numeric"
                              :placeholder="phoneNumber"
                              pattern="[0-9]*"
                              v-model.trim="userPw" 
                              @keyup.enter="certiMsgSendBtn()" 
                              autocomplete="one-time-code"
                           >
                           <button class="btn_choice_box" @click="certiMsgSendBtn()">{{ certifiButton }}</button>
                        </div>
                     </div>
                     <div>
                        <div class="grid_box grid_column" >
                           <div class="box"><input type="number" pattern="\d*" v-model="certNum" :placeholder="certifiNumber"></div>
                        </div>
                        
                        <div class="sms_box mt0">
                           <div class="division">
                              <div class="sms_info_box">
                                 <p>{{ remainTime }} : {{ TimerStr }}</p>
                                 <button v-if="TimeCounter === 0" @click="certifiNumberSendBtn">{{ certifiNumberSend }}</button><!-- timerStart -->
                              </div>
                              <div class="button_box">
                                 <a class="btn_cancel on m0" @click="fn_login()">{{ loginButton }}</a> <!-- v-b-modal.WOCKEREDU -->
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="education_list">
         <h3>{{ eduCationListHeader }}</h3>
         <ul class="list">
            <li>{{ eduCationListLine2 }}</li>
            <li>{{ eduCationListLine3 }}</li>
         </ul>
      </div>

      <MobilePopup id="workerEdu" :mainMsg="msg" 
      btnRight="확인" 
      @modalHandler="$bvModal.hide('workerEdu')"/>

      <MobilePopup id="not" :mainMsg="certifiNumberMsg" 
      btnRight="확인" 
      @modalHandler="$bvModal.hide('not')"/>

   </div>

</template>

<script>

   import MobilePopup from "@/pages/common/popup/MobilePopup.vue"
   import { requestOptions, sendPostApi }  from '../../../apis/common'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import API from '@/apis/'
   import _ from 'lodash'

   export default {
      name: 'WorkerEduCationMobileLogin',
      mixins: [MsgBoxMixins],
      components: {
         MobilePopup
      },
      data: () => ({
         userId : '',
         userPw: '',
         userType: 'WORK',
         langCode : 'kr',
         projectId : '',
         name : '',
         phoneNumber : '',
         certifiNumber : '',
         certifiNumberSend : '인증번호 재전송',
         certifiButton : '',
         loginButton : '',
         eduCationListHeader : '',
         eduCationListLine1 : '',
         eduCationListLine2 : '',
         eduCationListLine3 : '',
         eduCationListLine4 : '',
         eduCationListLine5 : '',
         mainCodeId : '',
         midCodeId : '',
         certiBtn : false,
         msg : '',
         msg1 : '',
         msg2 : '',
         certifiNumberMsg : '',
         certifiNumberMsg1 : '',
         certifiNumberMsg2 : '',
         Timer: null,
         TimeCounter: 300,
         TimerStr: "05:00",
         certNum : "",
         remainTime : '',
         noUserInfo : '',
         realCertiNumber : '',
         num : '',
      }),
      created() {
         this.mainCodeId = this.$route.query.mainCodeId
         this.midCodeId = this.$route.query.midCodeId
         this.langCode = this.$route.query.langCode
         this.projectId = this.$route.query.projectId
         this.getWorkerEduCodeLangList()
      },
      
      mounted() {
         if(document.querySelector('.wrap.p0').classList[0] === 'wrap'){
            document.querySelector('.wrap.p0').classList.remove('wrap')
         }
      },
      watch : {
         'TimeCounter' : {
            handler() {
               if(this.TimeCounter === 0){
                  
               }
            }
         }
      },
      methods: {
         timerStart: function() {
            // 1초에 한번씩 start 호출
            this.TimeCounter = 300;
            var interval = setInterval(() => {
            this.TimeCounter--; //1초씩 감소
            this.TimerStr = this.prettyTime();
            if (this.TimeCounter <= 0) this.timerStop(interval);
            }, 1000);
            return interval;
         },
         timerStop: function(Timer) {
            clearInterval(Timer);
            this.TimeCounter = 0;
            this.TimerStr = "05:00";
         },
         prettyTime: function() {
            // 시간 형식으로 변환 리턴
            let time = this.TimeCounter / 60;
            let minutes = parseInt(time);
            let secondes = Math.round((time - minutes) * 60);
            return (
            minutes.toString().padStart(2, "0") +
            ":" +
            secondes.toString().padStart(2, "0")
            );
         },
         checkCertNum : async function() {
            if(this.TimeCounter  > 0) {
               let result = {};
               let param = {
                  'userId' : this.userId,
                  'num' : this.num,
                  'certNum': this.certNum
               };
               let url = '/sendApi/api/login/cert/checkNum/check'
               // 쿠키에 토큰 값 넣기(accessToken)
               try {
                  result = await sendPostApi(url, param);
                  if(result.status == '200' && result.data.data == '0000') {
                    return true
                  } else {
                    return false
                  }
               } catch (error) {
                  console.error(error);
               }
            } else {
               return false
            }

         },
         fn_login: async function() {
            if(this.userId == '' || this.userId == null) {
               this.msg = this.msg1
               return this.$bvModal.show('workerEdu')
            }else if(this.userPw == '' || this.userPw == null) {
               this.msg = this.msg2
               return this.$bvModal.show('workerEdu')
            }
            if(this.certiBtn === false){
              this.certifiNumberMsg = this.certifiNumberMsg1 
               return this.$bvModal.show('not')
            }
            if(this.certNum === '') {
               this.certifiNumberMsg = this.certifiNumberMsg2
               return this.$bvModal.show('not')
            }


            if(!this.checkCertNum()) {
               this.certifiNumberMsg = this.certifiNumberMsg2
               return this.$bvModal.show('not')
            }

            // if(this.certNum != this.realCertiNumber) {
            //    this.certifiNumberMsg = this.certifiNumberMsg2
            //    return this.$bvModal.show('not')
            // }
            // login API
            requestOptions.headers['Accept-Language'] = "kr"
            let url = '/sendApi/login'
            let param = {"userId":this.userId, "userPw":this.userPw, "userType": this.userType, "projectId" : this.projectId}
            const res_data = await sendPostApi(url, param).then((result) => {
               return result
            }).catch((e) => {
               // console.log(e);
               return e.response
            });
            
            if(res_data.data.rCode == "0000"){  // API 성공
               // 쿠키에 토큰 값 넣기
               this.$cookies.set("Authorization", res_data.headers.authorization)
               this.$cookies.set("RefreshToken", res_data.headers.refreshtoken)


               //권한정보 vuex에 user정보 넣기                
               this.$store.dispatch('auth/setUserInfo', {
                  ...res_data.data.datas,
                  userType: this.userType,               
               }) 

               //vuex에 프러젝트정보 초기화
               this.$store.dispatch('auth/setInitProjectInfo');

               this.$store.dispatch('auth/setProjectId', res_data.data.datas.projectId); 

               //vue-session 저장
               this.$session.set('userInfo', this.$store.getters['auth/getAuth'] );

               this.$store.dispatch('workerEdu/setMainCode',this.mainCodeId);
               this.$store.dispatch('workerEdu/setMidCode', this.midCodeId);
               this.$store.dispatch('workerEdu/setLangCode', this.langCode);
               this.$store.dispatch('workerEdu/setProjectId', this.projectId);
               
               this.$session.set('workerEduInfo', this.$store.getters['workerEdu/getWorkerEdu'] );

               //sample list page 이동
               //this.$router.push("/sample/list");
               this.$router.push({
                  name: 'WorkerEduCationMobileSelect',
                  query : { mainCodeId : this.mainCodeId, midCodeId : this.midCodeId, langCode : this.langCode}
               })
            }else if(res_data.status == "401"){
               //  console.log("인증 실패")
                this.msg = this.noUserInfo
               return this.$bvModal.show('workerEdu')
            }else {     // API 실패
               //  console.log("서버 에러")
                this.alert("서버 에러가 발생하였습니다.")
                return
            }
         },
         /**
          * 신규 근로자 교육 현황 모바일 다국어 지원
          */
         async getWorkerEduCodeLangList(){
            const payload = {
            // workerEduType: '2',
            // mainCodeId : this.mainCodeId,
            // midCodeId : this.midCodeId,
            langCode : this.langCode
            }
            try {
               // const result = await API.workerEdu.getWorkerEduTranSlation(payload)
               const result = await API.workerEdu.getMobileContensLangList(payload)
               if(result?.dlContsMultiLang) {
                  this.name = result.dlContsMultiLang.S0_1 //성명
                  this.phoneNumber = result.dlContsMultiLang.S0_2 //전화번호
                  this.certifiNumber = result.dlContsMultiLang.S0_4
                  this.certifiButton = result.dlContsMultiLang.S0_3
                  this.loginButton = result.dlContsMultiLang.S0_5
                  this.eduCationListHeader = result.dlContsMultiLang.S0_6
                  this.eduCationListLine2 = result.dlContsMultiLang.S0_7
                  this.eduCationListLine3 = result.dlContsMultiLang.S0_8
                  this.remainTime = result.dlContsMultiLang.S0_14
                  this.msg1 = result.dlContsMultiLang.S0_10
                  this.msg2 = result.dlContsMultiLang.S0_11
                  this.certifiNumberMsg1 = result.dlContsMultiLang.S0_12
                  this.certifiNumberMsg2 = result.dlContsMultiLang.S0_13
                  this.noUserInfo = result.dlContsMultiLang.S0_9
               }
            } catch (error) {
               console.error('언어 번역 리스트 가져오기 실패 : ',error)
            }
         },
         /** 인증번호 요청 */
         async certiMsgSendBtn() {
            if(this.userId == '' || this.userId == null) {
               this.msg = this.msg1
               return this.$bvModal.show('workerEdu')
            }else if(this.userPw == '' || this.userPw == null) {
               this.msg = this.msg2
               return this.$bvModal.show('workerEdu')
            }
            this.certiBtn = true
            let param = {
            'userId' : this.userId, 
            'viewType': 'WEB',
            'userType': this.userType,
            'reqType' : 'web',
            'projectId' : this.projectId,
            };

            console.log("@@@ setMakeCertiNumber param : %o",param);

            try {
               const rst = await API.workerEdu.setMakeCertiNumber(param);     
               this.num = rst.resultData.num;    
               if(rst.data === '0000') {    
                  if(this.Timer != null) {
                        this.timerStop(this.Timer);
                        this.Timer = null;
                        this.realCertiNumber = ''
                  }
                  this.Timer = this.timerStart();
               }
            } catch (error) {
               console.error(error);
            }
         },
         /** 인증번호 재전송 버튼 */
         async certifiNumberSendBtn() {
            if(this.userId == '' || this.userId == null) {
               this.msg = this.msg1
               return this.$bvModal.show('workerEdu')
            }else if(this.userPw == '' || this.userPw == null) {
               this.msg = this.msg2
               return this.$bvModal.show('workerEdu')
            }
            this.TimeCounter = 300
            this.certiBtn = true
            let param = {
            'userId' : this.userId, 
            'viewType': 'WEB',
            'userType': this.userType,
            'reqType' : 'web'
            };
            try {
               const rst = await API.workerEdu.setMakeCertiNumber(param);           
               if(rst.data === '0000') {                  
                  this.num = rst.resultData.num;    
                  if(this.Timer != null) {
                        this.timerStop(this.Timer);
                        this.Timer = null;
                        this.realCertiNumber = '';
                  }
                  this.Timer = this.timerStart();
               }
            } catch (error) {
               console.error(error);
            }
         },
      },
   }
</script>

<style>

</style>