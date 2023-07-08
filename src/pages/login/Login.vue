<template>
   <div class="wrap login_wrap">
       <h1 class="logo">현대엔지니어링</h1>
       <div class="main_image">
           <img v-bind:src="image_path" alt=""/>
       </div>
        <!-- <swiper class="swiper" v-bind:options="swiperOption">
            <swiper-slide><div class="login_bg bg1"></div></swiper-slide>
            <swiper-slide><div class="login_bg bg2"></div></swiper-slide>
            <swiper-slide><div class="login_bg bg3"></div></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper> -->
        <div class="login">
            <h2>SQMS 
                <em>현장품질관리시스템</em>
                <select class="form_control lang" v-model="locale" @change="changeLocale">
                    <option value="ko">KOR</option>
                    <option value="en">EN</option>
                </select>
            </h2>

            <div class="info_area">
                <div class="user_select">
                    <label class="input_radio" for="rdoLunar1">
                        <input type="radio" id="rdoLunar1" checked="" value="HEC" v-model="userType">
                        <span class="label_text">{{$t('login.employees')}}</span>
                    </label>
                    <label class="input_radio" for="rdoLunar2">
                        <input type="radio" id="rdoLunar2" value="PTNR" v-model="userType">
                        <span class="label_text">{{$t('login.partner')}}</span>
                    </label>
                </div>
                <div class="user_input lock_msg"> 
                    <input type="text" class="form_control" :placeholder="$t('login.id')" v-model.trim="userId">
                    <input type="password" class="form_control" :placeholder="$t('login.pw')" v-model.trim="userPw" v-on:keyup.enter="fn_login" @keydown="capsLockCheck($event)">
                    <p class="lock_alert pt10" style="color:#ffffff; right:290px; top:55%" v-show="capsCheck">Caps Lock이 켜져 있습니다.</p>
                    <div class="clearfix">
                        <label class="input_check">
                            <input type="checkbox">
                            <span class="label_text">{{$t('login.save')}}</span>
                        </label>
                        <button type="button" class="txt_password fr" v-on:click="fn_passwdChg">{{$t('login.pwChange')}}</button>
                    </div>
                    <button type="button" class="btn_login" v-on:click="fn_login">{{$t('login.login')}}</button>
                </div>
            </div>
            <div class="security">
                <h3>{{$t('login.policyTitle')}}</h3>
                <div class="txt_area">
                    {{$t('login.policyContent1')}}
                    {{$t('login.policyContent2')}}
                </div>
                <div class="download">
                    <button class="btn_privacy" @click="openPolicy">개인정보 처리방침</button>
                    <div class="qr_box">
                        <p class="msg">App<br>Download</p>
                        <p class="qrcord">
                            <!-- <img style="{display: inline-block; width: 76px; height: 76px;}"
                                :src="'/sendApi/api/fileCall/getQrCode/'"
                            /> -->
                            <!-- <img style="{display: inline-block; width: 76px; height: 76px;}"
                                src='../../assets/img/main/downloadQr.png'
                            /> -->
                            <img style="{display: inline-block; width: 76px; height: 76px;}"
                                src='../../assets/img/main/serverDownloadQr.png'
                            />
                        </p>
                    </div>
                    <!-- <p class="qrcord"></p> -->
                </div>
            </div>
            <p class="copy">COPYRIGHTⓒ HYUNDAI ENGINEERING CO.,LTD. ALL RIGHTS RESERVED.</p>
        </div>


        <!-- SMS/Email 추가 인증 안내 팝업 -->
         <b-modal id="pop_citation" :title="$t('login.certTiltle')"
            hide-backdrop size="sm"
            :footer-bg-variant="footerBg" static>
            <template #default>
                <div class="pop_container">
                     <p>{{$t('login.certWarning')}}</p>
                     <div class="input_number">
                         <label for="form_num" class="label_text"> {{$t('login.certNumber')}} : </label>
                         <input id="form_num" type="text" class="form_control" v-model.trim="certNum" @keyup.enter="checkCertNum()">
                         <span class="time">{{TimerStr}}</span>
                     </div>
                     <ul class="lst_help">
                         <li>{{$t('login.certWarning1')}}</li>
                         <li>{{$t('login.certWarning2')}}</li>
                     </ul>
                </div>
            </template>
                <template #modal-footer="{ hide }"> 
                <b-button class="btn btn_lg btn_outline btn_gray mr30" @click="certNumSend()" :disabled="TimeCounter!==0">{{$t('login.reSend')}}</b-button>
                <!--<b-button class="btn btn_lg btn_outline btn_blue" v-on:click="fn_auth">확인</b-button>-->
                <b-button class="btn btn_lg btn_outline btn_blue" @click="checkCertNum()">{{$t('login.comfirm')}}</b-button>
                <b-button class="btn btn_lg btn_outline btn_gray" v-on:click="hide('forget')">{{$t('login.cancel')}}</b-button>
            </template>
        </b-modal>

        <!-- Alert 팝업 -->
        <!-- <b-modal id="pop_alert" title="알림"
            hide-backdrop size="sm"
            v-bind:footer-bg-variant="footerBg" >
            <template #default>
                <div class="pop_container">
                    <div class="message_table">
                        <p class="msg">
                            인증번호가 일치하지 않습니다. <br>
                            다시 인증해 주세요.
                        </p>
                    </div>
                </div>
            </template>
                <template #modal-footer="{ ok }"> 
                <b-button class="btn btn_lg btn_outline btn_blue" v-on:click="ok">확인</b-button>
            </template>
        </b-modal> -->

        <PopAlert 
            v-bind:msg="pop_msg" 
            v-on:first-btn-fn="close_pop" v-on:second-btn-fn="close_pop"
        />
        <PopPolicy :id="userId" :type="userType" @insert-success="openPop()"/>
        <SinglePolicy :type="'privacy'"/>
        <password-change-ext-modal
            :ref-id="passwordChangeExtModal"
            :user-id="passwordUserId"
            :first-login="firstLogin"
            @callback="userPw = ''"
        />
   </div>
</template>

<script>
// Import Swiper Vue.js components
import { swiper, swiperSlide } from 'vue-awesome-swiper' 
// Import Swiper styles
import 'swiper/css/swiper.css'
import VueCookies from 'vue-cookies'
import PopAlert from '@/pages/common/popup/PopAlert.vue';
import {requestOptions, sendPostApi}  from '../../apis/common';
// import axios from '@plugin/apis/instance'
import axios from 'axios'
//import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import PopPolicy from '@/pages/login/PopPolicy.vue'
import PasswordChangeExtModal from '@/pages/login/PasswordChangeExtModal.vue'
import SinglePolicy from '@/pages/login/SinglePolicy.vue'


export default { 
   // mixins: [MsgBoxMixins],
    components: { 
        swiper, 
        swiperSlide,
        PopAlert,
        PopPolicy,
        PasswordChangeExtModal,
        SinglePolicy,
    }, 
    data() { 
        return {
            locale : 'ko', 
            footerBg: 'transparent',
            pop_msg: '',
            userId: '',
            userPw: '',
            userType: 'HEC',
            userPath : 'web',
            loginIp : '',
            image_path: null,
            swiperOption: {
                slidesPerView: 1, 
                spaceBetween: 0, 
                loop: true, 
                autoplay : {
                    delay: 3000,
                    // disableOnInteraction : false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
                },
                pagination: { 
                    el: '.swiper-pagination', 
                    clickable: true 
                }, 
                navigation: { 
                    nextEl: '.swiper-button-next', 
                    prevEl: '.swiper-button-prev' 
                } 
            },
            authorization: '',
            acceseToken: '',
            refreshtoken:'',
            user:null,
            rstNum:-1,
            Timer: null,
            TimeCounter: 300,
            TimerStr: "05:00",
            certNum : "",

            /** 비밀번호 변경 */
            passwordChangeExtModal: 'passwordChangeExtModal',
            firstLogin: false,
            passwordUserId: '',

            capsCheck : false,
        } 
    },
    mounted(){                    
        this.clearUserSet();                                
        //client IP가져오기
        fetch('https://api.ipify.org?format=json')    
        .then((res) => res.json())
        .then((data) => {
        this.loginIp = data.ip;
        }).catch(e => {        
            //return "";
        });

        let random_number = parseInt(Math.floor(Math.random() * 6) + 1); //1,2,3,4,5,6
        this.image_path = require('@/assets/img/main/bg_login'+random_number+'.jpg');
        return this.image_path;
        // image_path
    },
    created(){
        if( this.$store.getters['auth/getLoacale'] == null || this.$store.getters['auth/getLoacale'] == "undefinded" || this.$store.getters['auth/getLoacale'] == ''){            
            this.$store.dispatch('auth/setLoacale','ko');
            this.locale = 'ko'
            this.$i18n.locale = 'ko'
        }else{
            this.locale = this.$store.getters['auth/getLoacale'];
            this.$i18n.locale = this.$store.getters['auth/getLoacale'];
        }
    },
    methods: {
        changeLocale(){
            this.$store.dispatch('auth/setLoacale',this.locale)                                  
            this.$i18n.locale = this.locale;
        },
        fn_login: async function() {
            if(this.userId == '' || this.userId == null) {
                this.pop_msg = this.$t('login.missingId');
                this.$root.$emit('bv::show::modal', 'popAlert');
                return;
            }else if(this.userPw == '' || this.userPw == null) {
                this.pop_msg = this.$t('login.missingPw');
                this.$root.$emit('bv::show::modal', 'popAlert');
                return;
            }

            // login API
            requestOptions.headers['Accept-Language'] = "kr";
            let url = '/sendApi/login';
            let param = {"userId":this.userId, "userPw":this.userPw, "userType": this.userType};

            
            const res_data = await sendPostApi(url, param).then((result) => {
                return result;
            }).catch((e) => {
                 // console.log(e);
                return e.response;
            });
            
            if(res_data.data.rCode == "0000"){  // API 성공

                // console.log("@@@ user : %o",res_data.data.datas);
                
                //  if(res_data.data.datas.lockYn == "Y" && res_data.data.datas.lockTime < 60 ){
                //     this.pop_msg = this.$t('login.loginLock');
                //     this.$root.$emit('bv::show::modal', 'popAlert');
                // }else
                if(res_data.data.datas.dormantYn == 'Y') {
                    this.pop_msg = this.$t('login.dormantUser');
                    this.$root.$emit('bv::show::modal', 'popAlert');
                    this.updateLoginHistory();
                    this.clearUserSet();
                }  else if(res_data.data.datas.blockYn == 'Y') {
                    this.pop_msg = this.$t('login.blockUser');
                    this.$root.$emit('bv::show::modal', 'popAlert');
                    this.updateLoginHistory();
                    this.clearUserSet();
                } else if(res_data.data.datas.pwChgYn == 'Y') {
                    this.pop_msg = this.$t('login.oldUser');
                    this.$root.$emit('bv::show::modal', 'popAlert');
                    this.updateLoginHistory();
                    this.clearUserSet();
                    

                } else if(res_data.data.datas.projectCnt == 0){                
                    this.pop_msg = this.$t('login.missProject');
                    this.$root.$emit('bv::show::modal', 'popAlert');

                     //login 이력저장(로그인은 성공이라서 저장)
                    this.updateLoginHistory();
                } else if(this.userType == 'HEC'){
                    //console.log('hec',res_data);
                                        
                    this.authorization = res_data.headers.authorization;
                    this.refreshtoken = res_data.headers.refreshtoken;

                    // let msgAlert = "최근 로그인시간 : " + res_data.data.datas.finalLoginDttm + "\n"
                    // msgAlert += "최근 로그인IP : "+res_data.data.datas.loginIp+"\n";
                    
                    let msgAlert = ''
                    msgAlert += res_data.data.datas.finalLoginDttm ? this.$t('login.lastLoginTime') + " : " + res_data.data.datas.finalLoginDttm + "\n" : ''
                    msgAlert += res_data.data.datas.loginIp ? this.$t('login.lastLoginIp')+" : "+res_data.data.datas.loginIp+"\n" : '';
                    msgAlert += this.$t('login.loginWarning1')+"\n";
                    msgAlert += this.$t('login.loginWarning2');
                    //alert(msgAlert);                    

                    this.user = res_data.data.datas;  

                    // this.goToMain();

                    // 문자인증 발송화면 호출
                    this.timerStop(this.Timer);
                    this.Timer = null;
                    this.certNumSend();
                    
                } else if(this.userType == 'PTNR'){

                    this.authorization = res_data.headers.authorization;
                    this.refreshtoken = res_data.headers.refreshtoken;
                    
                    let msgAlert = ''
                    msgAlert += res_data.data.datas.finalLoginDttm ? this.$t('login.lastLoginTime') + " : " + res_data.data.datas.finalLoginDttm + "\n" : ''
                    msgAlert += res_data.data.datas.loginIp ? this.$t('login.lastLoginIp')+" : "+res_data.data.datas.loginIp+"\n" : '';
                    msgAlert += this.$t('login.loginWarning1')+"\n";
                    msgAlert += this.$t('login.loginWarning2');
                    alert(msgAlert); 

                    //최초 로그인시 처리 (약관동의 미처리시)
                    // if(res_data.data.datas.firstLoginYn == "Y"){   
                    //     this.$root.$emit('bv::show::modal', 'pop_policy');  
                    // }else{
                    //     this.timerStop(this.Timer);
                    //     this.Timer = null;
                    //     this.certNumSend();
                    // }
                    // 문자인증 발송화면 호출

                    /** 약관동의 순수 변경에 따른 조건 변경 */
                    this.timerStop(this.Timer);
                    this.Timer = null;
                    this.certNumSend();

                    this.user = res_data.data.datas;
                                        
                }
            } else {                 
                // API 실패
                // console.log("@@@ 로그인 실패 : %o",res_data.data);

                if(res_data.status == "401"){
                    // 로그인 실패 카운트 추가
                    let url = '/sendApi/api/login/fail/write';                
                    const failResponse = await sendPostApi(url, param);
                    if(failResponse.status == '200'){
                        if(failResponse.data.rCode == '9999'){
                            this.pop_msg = this.$t('login.userFail');
                            return this.$root.$emit('bv::show::modal', 'popAlert');
                        }
                        else{
                            let url = '/sendApi/api/login/checkLock';
                            let param = {"userId":this.userId};
        
                            await sendPostApi(url, param).then((result) => {
                                console.log('result : ', result);
                                // if(result.data.lockYn == "Y"){
                                //     this.pop_msg = this.$t('login.loginLock');
                                //     this.$root.$emit('bv::show::modal', 'popAlert');
                                // }else{
                                   this.pop_msg = this.$t('login.authFail');
                                    this.$root.$emit('bv::show::modal', 'popAlert'); 
                                //}
                                
                            }).catch((e) => {
                                this.pop_msg =this.$t('login.authFail');
                                this.$root.$emit('bv::show::modal', 'popAlert');
                            });
                        }
                    }
                    else{
                        this.pop_msg = this.$t('login.authFail');
                        this.$root.$emit('bv::show::modal', 'popAlert');
                    }
                }else{
                    this.pop_msg = this.$t('login.authFail');
                    this.$root.$emit('bv::show::modal', 'popAlert');
                }
            }
        },
        fn_auth: async function() {
            //성공시 로그인 이력 저장 && 동의 약관 이력 조회
            await this.updateLoginHistory();
            if(this.rstNum == 0){
                // 동의 약관 X
                this.$root.$emit('bv::hide::modal', 'pop_citation');   
                this.$root.$emit('bv::show::modal', 'pop_policy');
            }else if(this.rstNum > 0){
                //동의 약관 O
                this.goToMain();
            }else{
                // console.log('dd');
            }
        },
        updateLoginHistory: async function(){ //로그인 이력 저장 && 협력사일 시 약관동의 이력 조회

            let url = '/sendApi/api/login/history/write';
            let param = {
                "userId":this.userId, 
                "userType":this.userType, 
                "userPath":this.userPath,
                "loginIp" : this.loginIp
            };

            const updateRst = await sendPostApi(url, param).then((result) => {
                // this.$root.$emit('bv::show::modal', 'popAlert');                
                return result;
            }).catch((e) => {
                // console.log(e);
                return e.response;
            });                        
        },
        goToMain:function(){
            this.$root.$emit('bv::hide::modal', 'pop_citation');
            this.$root.$emit('bv::hide::modal', 'pop_policy');
            
            // 문자인증이 완료되면 로그인 처리
            this.updateLoginHistory();

            // 쿠키에 토큰 값 넣기(accessToken)
            VueCookies.set("Authorization", this.authorization);
            VueCookies.set("RefreshToken", this.refreshtoken);

            // localStorage에 오픈 정보가 없으면 (최초 로그인 시)
            if(!localStorage.getItem("viewCnt")){
                localStorage.setItem("viewCnt",1);
            }

            //vuex에 user정보 넣기                
            this.$store.dispatch('auth/setUserInfo', {
                ...this.user,
                userType: this.userType,
                currentIp : this.loginIp
            })

            //vuex에 프로젝트정보 초기화
            this.$store.dispatch('auth/setInitProjectInfo');

            //vue-session 저장
            this.$session.set('userInfo', this.$store.getters['auth/getAuth'] );

            //텝정보 초기화
            this.$store.dispatch('tabInfo/allTabClose');

            this.$router.push("/main");
        },
        fn_passwdChg: function() {

            //오토웨이 비빌번호 변경화면 호출
            if (this.userType === 'HEC') {
                window.open("https://imsso.hec.co.kr:7443/im/profile/nonecert/userpwd/reset/",'_blank',"width=1000, height=700");
            } else {
                this.firstLogin = false
                this.passwordUserId = ''
                this.$bvModal.show(this.passwordChangeExtModal)
            }
            //this.$router.push({name: 'PasswdChg'});
        },
        openPop: function(){
            // this.timerStop(this.Timer);
            // this.Timer = null;
            // this.certNumSend();
            this.$bvModal.hide('pop_policy')

            if (this.userType === 'HEC') {
                this.goToMain()
            } else {
                this.firstLogin = true
                this.passwordUserId = `${this.userId}` 
                this.$bvModal.show(this.passwordChangeExtModal)
            }

        },
        close_pop : function() {
            this.$root.$emit('bv::hide::modal', 'popAlert');
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
                    // this.fn_auth();                    
                    // this.goToMain();

                    /** 순서 수정 */
                    if (this.user.firstLoginYn === 'Y') {
                        this.$bvModal.hide('pop_citation')
                        this.$bvModal.show('pop_policy')
                    } else {
                        this.goToMain()
                    }
                  } else {
                    this.pop_msg =this.$t('login.certNumberFail');
                    this.$root.$emit('bv::show::modal', 'popAlert');
                    
                    //this.$root.$emit('bv::hide::modal', 'pop_citation');   
                  }
               } catch (error) {
                  console.error(error);
               }
            } else {

            }

         },
         certNumSend : async function () {
            // this.$root.$emit('bv::hide::modal', 'pop_policy');
            if(this.TimeCounter == 0) {
                let param = {
                  'userId' : this.userId, 
                  'viewType': 'WEB',
                  'userType': this.userType,
                  'reqType' : 'web'
                };
                let url = '/sendApi/api/login/cert/checkNum/write'
                // 쿠키에 토큰 값 넣기(accessToken)
                try {
                    const rst = await sendPostApi(url, param);            
                    if(rst.status == '200' && rst.data.data === '0000') {                  
                                            
                        this.num = rst.data.resultData.num;
                        this.certNum = rst.data.resultData.certNum;

                        // //메일 발송 (주석처리요청 : 20220808)
                        // let mailParam = {

                        //     'num' :  this.num,
                        //     'certNum' : this.certNum, 
                        //     'userId' : this.userId,
                        //     'reciveUserId' : this.userId,
                        //     'toEmail' : this.user.email,
                        //     'messageCode' : "A075"                
                        // }

                        // sendPostApi("/sendApi/api/messageMngt/certMail/send", mailParam)

                        if(this.Timer != null) {
                            this.timerStop(this.Timer);
                            this.Timer = null;
                        }
                        this.Timer = this.timerStart();
                        this.$root.$emit('bv::show::modal', 'pop_citation');
                    }
                } catch (error) {                    
                    console.error(error);
                }
            }
         },
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
         clearUserSet: function() {
            VueCookies.remove('Authorization');
            VueCookies.remove('RefreshToken');
            VueCookies.remove('projectId');
            VueCookies.remove('siteId');
            this.$store.dispatch('auth/setInitData');
            this.$store.dispatch('tabInfo/allTabClose');
         },
         openPolicy:function(){
            this.$root.$emit('bv::show::modal', 'SinglePolicy');
         },
         capsLockCheck:function(evt){
            if(evt.getModifierState("CapsLock")) {
                this.capsCheck = true;
            } else {
                this.capsCheck = false;
            }
         }



        // userManu : async function() {
        //     let url = '/sendApi/api/myWork/codeMngt/userMenu/list';
        //     let param = {
        //         "userId":this.userId,             
        //     };
        //     const manuInfo = await sendPostApi(url, param);

        //     //console.log("@@@@ manuInfo : %o",manuInfo);      
        //     let userMeny = manuInfo.data.datas.dlUserMenu;   

        //     const sample    = userMeny.filter(lv1 => lv1.menuLevel == 1).map(lv1 => {
        //                                 lv1.children   = userMeny.filter(lv2 => lv2.menuLevel == 2 && lv2.upperMenuMngtId == lv1.menuMngtId)
        //                                                 .map(lv2 => {
        //                                                     lv2.children = userMeny.filter(lv3 => lv3.menuLevel == 3 && lv3.upperMenuMngtId == lv2.menuMngtId)                                                        
        //                                                     return lv2
        //                                                 })
        //                                 return lv1
        //                       });


        //     console.log("@@@@ sample : %o",sample);

        //     let manuList = [];

        //     for(let i = 0; i < sample.lenth; i++){

        //         let lv1Obj = new Object();

        //         lv1Obj.name = sample[i].menuNmKr;

        //         let lv2List = [];
        //         for(let j = 0; j < sample[i].children.length; j++){
        //             let lv2Obj = new Object();
                 
        //         }

        //     }
        // }
    }
}

</script>
<style>
    @media all and (max-height:930px) {
        .wrap.login_wrap { height: auto; }
    } 
</style>