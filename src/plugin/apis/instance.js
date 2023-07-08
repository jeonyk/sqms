import Vue from 'vue';
import Axios from 'axios'
import VueCookies from 'vue-cookies'
import router from "@/router/router";
import store from "@/store/index";
import { i18n } from "@/plugin/i18n/i18n";
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'


// const axios = Axios.create({
//     baseURL: process.env.VUE_APP_API_SERVER_URL 
//         ? process.env.VUE_APP_API_SERVER_URL + '/api' 
//         : '/sendApi',
//     timeout: process.env.VUE_APP_API_TIMEOUT 
//         ? process.env.VUE_APP_API_TIMEOUT 
//         : 1000,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept-Langquage': 'ko',
//         'Authorization': VueCookies.get('Authorization')
//     }
// })

Axios.interceptors.request.use(
    function (config) {

        // API통신시 axios 기본 설정
        config.headers["Content-Langquage"] = "ko";

        // 임시 테스트
        let url = config.url
        if(url.includes('fileUp') || url.includes('defectReg/write') || url.includes('defecPros/write') || url.includes('defecCnfm/write')){
          
          config.headers["Content-Type"] = "multipart/form-data;charset=UTF-8";
        }else{
          config.headers["Content-Type"] = "application/json";
        }
        
        config.headers["Authorization"] = VueCookies.get("Authorization");
        config.headers["RefreshToken"] = VueCookies.get("RefreshToken");

        //세션 정보가 변경되는 경우 처리(VUEX 정보 변경)
        if(Vue.prototype.$session.get('userInfo') != null || Vue.prototype.$session.get('userInfo') != undefined){
          if(store.getters['auth/getUserId'] != Vue.prototype.$session.get('userInfo').userId){
            store.dispatch('auth/setUserInfo', Vue.prototype.$session.get('userInfo'))          
          }

          if(store.getters['auth/siteMstrId'] != Vue.prototype.$session.get('userInfo').siteMstrId){
            store.dispatch('auth/setProjectInfo', Vue.prototype.$session.get('userInfo'))          
          }
        }

        // if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ADDR ) {
        //   config.url = config.url.replace('/sendApi', process.env.VUE_APP_SERVER_ADDR)
        // }
        if (process.env.VUE_APP_ENV_MODE === 'devserver') {
          config.url = config.url.replace('/sendApi', process.env.VUE_APP_SERVER_ADDR)
        }

        

        //로딩바 적용 - reissue 제외
        // if (!config.url.includes('/auth/reissue') && !config.url.includes('/spfcPop/view') && !config.url.includes('/api/messageMngt/certMail/send') ) {
        //   store.dispatch('etc/setLoading', true);
        // }

        // 메인 로딩바 제거
        let name = router.history.current.name;
        
        const exceptLoading = [
          '/auth/reissue',
          '/spfcPop/view',
          '/api/messageMngt/certMail/send',
        ]
        if (!exceptLoading.some(url => config.url.includes(url)) && name != "Main") {
          store.dispatch('etc/setLoading', true)
        }

        return config;
      },
      // 요청중 에러시....
      function (error) {
        //console.log("interceptor error : "+error);
        // Do something with request error
        
        //로딩바 해제
        store.dispatch('etc/setLoading', false);
        return error.response;
      }   
)

Axios.interceptors.response.use(
    function (response) {
        // console.log("response 받고나서 interceptor!!!!");  

        // 로그인, 토큰 재발행 요청 이외에 통신시 토큰 갱신
        if(!response.config.url.includes('login') && !response.config.url.includes('reissue')){
          
            let param = {"reflashToken": VueCookies.get("RefreshToken")};
            //코큰 갱신 요청
            Axios.post("/sendApi/auth/reissue",param).then((result) => {            
            VueCookies.set("Authorization", result.data.reIssueToken);
            
           }).catch((e) => {
                // console.log(e);
                // 로딩바 해제
                store.dispatch('etc/setLoading', false); 
                return e.response;
            }); 
        }
        
        // 로딩바 해제
        store.dispatch('etc/setLoading', false); 
        return response;
     },
     // 요청 에러시....
     function (error) {

        // console.log("@@@@@ response error : %o",error);

         // 로그인 처리 요청 이외 경우
         if(!error.response.config.url.includes('login')){
            
            // reflash 토큰 만료시
            if (error.response.status === 401) {                              
                                
                //로그인 화면으로 이동 ( 이미 이동한 경우 제외처리 )
                if(router.history.current.name != 'Login'){                
                  // session정보 초기화        
                  Vue.prototype.$session.destroy(); 

                  // 로딩바 해제
                  store.dispatch('etc/setLoading', false); 
                  router.push({ name: 'Login' });                  
                  return error.response;                               
                }                                       
            }else if(error.response.status === 404 || error.response.status === 500){
                
                if(error.response.data.message == "messageSendError"){
                  
                  if(error.response.data.exceptionString == "publicError"){
                    //alert("통합알림 발송이 실패했습니다.");
                  }

                  if(error.response.data.exceptionString == "mailError"){
                    //alert("메일 발송이 실패했습니다.");
                  } 

                  return error.response;
                }else{
                  // 로딩바 해제
                  store.dispatch('etc/setLoading', false); 
                  router.push({ name: 'NotSupport' });                
                  return error.response;  
                }                
            }
         }
         
         // 로딩바 해제
         store.dispatch('etc/setLoading', false); 
         return error.response;
     }
)

export default Axios