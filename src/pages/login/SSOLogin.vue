<template>
    <div>
        <div class="header_wrap">
        <header>
            <div class="l_layout">
                <h1 id="logo">
                <img src="img/logo.png" alt="">
                </h1>
            </div>
        </header>
        </div>
        <div class="lnb_container on">
            <!-- <Lnb /> -->
            <div class="tab_contents">
                <div class="error">
                    <h3 class="title">로그인 처리 중입니다.</h3>
                    <p class="desc">잠시만 기다려주세요.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {sendPostApi}  from '../../apis/common';
import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'

export default { 
    mixins: [MsgBoxMixins],
    data() { 
        return {
            paramId : '',
            loginIp : '',
            authorization : '',
            refreshtoken : ''            
        }
    },
    created(){
        this.paramId = this.$route.query.userId 
    },
    mounted(){
        console.log("mounted : ");
        //client IP가져오기
        fetch('https://api.ipify.org?format=json')    
        .then((res) => res.json())
        .then((data) => {
            this.loginIp = data.ip;
            console.log('then data  : ', data);
            this.ssoLogin();
        }).catch(e => { 
            
            this.loginIp = '';
            console.log('catch : ');
            this.ssoLogin();
            //return "";
        });
    },
    methods : {
        ssoLogin : async function (){

            console.log('ssoLogin : ');
            
            let url = '/sendApi/api/login/ssologinProcess';
            let param ={ 
                userId : this.paramId,
                loginIp : this.loginIp            
            }

            const res_data = await sendPostApi(url, param);

            console.log('res_data : ', res_data);

            if(res_data.data.userInfo != null && res_data.data.rCode == '0000'){
                // 로그인 이력 저장
                url = '/sendApi/api/login/history/write';
                param = {
                    "userId":this.paramId, 
                    "loginIp" : this.loginIp,
                    "userType": 'HEC', 
                    "userPath": 'web',
                };

                await sendPostApi(url, param).then(async rst => {
                    if(typeof rst.data.loginIp != 'undefined'){
                        // changeYn 수정
                        url = '/sendApi/api/login/userChangeYn/change';
                        param = {
                            "userId":this.paramId, 
                        };

                        await sendPostApi(url, param).then(async changeRst => {
                            if(typeof changeRst.data.data != 'undefined'){
                                //vuex에 user정보 넣기                
                                this.$store.dispatch('auth/setUserInfo', {
                                    ...res_data.data.userInfo,
                                    currentIp : this.loginIp
                                })

                                this.authorization = res_data.headers.authorization;
                                this.refreshtoken = res_data.headers.refreshtoken;

                                // 쿠키에 토큰 값 넣기(accessToken)
                                this.$cookies.set("Authorization", this.authorization);
                                this.$cookies.set("RefreshToken", this.refreshtoken);

                                //vuex에 프로젝트정보 초기화
                                this.$store.dispatch('auth/setInitProjectInfo');

                                //vue-session 저장
                                this.$session.set('userInfo', this.$store.getters['auth/getAuth'] );

                                //텝정보 초기화
                                this.$store.dispatch('tabInfo/allTabClose');

                                this.$router.push("/main");
                            }
                        })

                    }
                });
            } 
            else if(res_data.data.rCode == '9999') {
                this.alert(this.$t('login.userFail'), () => {
                    this.$router.push("/sqmsLogin");
                });
            }
            else{
                this.$router.push("/sqmsLogin");
            }
 
        },
    }    
}
</script>
 