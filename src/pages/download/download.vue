<template>
<div class="App">
    <div>
        <div class="app_download_container" v-if="osChk=='android'">
            <h1 id="logo"></h1>
            <div class="main_txt">
                <div class="icon_store android"></div>
                <div class="txt_box">
                    <h3>안드로이드용 Hi-Q</h3>
                    <ul>
                        <li>{{'버전 '+upVersion}}</li>
                        <li>{{'업데이트일 : '+upDttm}}</li>
                    </ul>
                </div>
            </div>
            <!-- <router-link to="/downPrivacy" class="btn_app_download">
                <p>개인정보 동의 및 다운로드</p>
                <p>Android</p>
            </router-link> 
            약관동의
            -->
            <button class="btn_app_download" @click="fnDownloadPop">
                <p>개인정보 동의 및 다운로드</p>
                <p>Android</p>
            </button>
<!--             <div class="down_guide mt50">
                <img class="w100" src="@/assets/img/main/guide.png" alt="">
            </div> -->
            <h2 id="ft_logo" class="mt50"></h2>
        </div>
    
        <div class="app_download_container" v-else>
            <h1 id="logo"></h1>
            <div class="main_txt">
                <div class="icon_store ios"></div>
                <div class="txt_box">
                    <h3>iOS용 Hi-Q</h3>
                    <ul>
                        <li>{{'버전 '+upVersion}}</li>
                        <li>{{'업데이트일 : '+upDttm}}</li>
                    </ul>
                </div>
            </div>
            <!-- <router-link to="/downPrivacy" class="btn_app_download">
                <p>개인정보 동의 및 다운로드</p>
                <p>iOS</p>
            </router-link>
            약관동의 -->
            <button class="btn_app_download" @click="fnDownloadPop">
                <p>개인정보 동의 및 다운로드</p>
                <p>iOS</p>
            </button>
            <div class="down_guide mt50">
                <img class="w100" src="@/assets/img/main/guide01.png" alt="">
            </div>
            <h2 id="ft_logo" class="mt50"></h2>
        </div>
        <b-modal id="offMainP2" static>
            <div class="popup modal_type2">
                <h2 class="mb10">
                    <strong>Hi-Q 다운로드</strong>
                </h2>
                <h3 style="font-size:14px; color:#000;">
                    Hi-Q 앱 다운로드 안내 <br>
                    <br>
                    Hi-Q 앱 설치파일은 Wi-Fi 연결 상태에 따라 다르게 다운받아집니다. <br>
                    <br>
                    [다운로드]를 선택하실 경우 다운로드가 진행되며, [취소]를 선택하실 경우 이전 화면으로 이동합니다. <br>
                    <br>
                    (1) Wi-Fi가 켜진 상태에서는 Wi-Fi로 다운받습니다. <br>
                    (2) Wi-Fi가 꺼진 상태에서는 모바일 데이터로 다운받습니다. <br>
                    <br>
                    * 모바일 데이터를 이용할 경우 요금제에 따라 비용이 발생할 수 있습니다.
                    <br>
                </h3>
            </div>
            <template #modal-footer="{ ok }">
                <div class="modal_button_box type1">
                    <a class="btn_cancel" @click="ok">취소</a>
                    <!-- <a class="btn_ok" href="itms-services://?action=download-manifest&url=https://192.168.11.60:8444/ipa/manifest.plist">다운로드</a> -->
                    <a class="btn_ok" @click="downApp">다운로드</a>
                </div>
            </template>
        </b-modal>
    </div>
</div>
</template>

<script>
import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'

export default {
    name: 'download',
    mixins: [MsgBoxMixins],
    components: {

    },
    data() {
        return {
            osChk:'',                                   // os 확인
            upDttm:'2022-06-12',                        // 임시 날짜
            upVersion:'1.0.0',                          // 임시 버전
        }
    },
    mounted(){
        this.fnOsChk();
    },
    methods:{
        fnOsChk: function(){
            var varUA = navigator.userAgent.toLowerCase();
            var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
            
            document.querySelector('.wrap.p0').classList.remove('wrap')

            if (mobile) { 
                // var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
                if ( varUA.indexOf('android') > -1) {
                    this.osChk = 'android';
                    return;
                } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
                    this.osChk = 'ios';
                    return;
                } else {
                    this.osChk = 'other';
                    return;
                }
            }else{
                return this.alert("모바일 기기에서만 접속이 가능합니다. 웹사이트로 이동합니다.", async () => {this.$router.push({ name: 'Login' })})
            }
        },
        fnDownloadPop: function(){
            // let param = {
            //     'osChk':this.osChk,
            // };
            // this.$router.push({
            //     name : 'DownPrivacy',
            //     params: param,
            // });
            this.$root.$emit('bv::show::modal', 'offMainP2');
        },
        downApp:function(){
            if(this.osChk == 'android'){
                // const objectUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a')

                link.style.cssText = 'display:none'
                // link.href = '/apk/sqms-debug.apk'
                link.href = 'https://nsqms.hec.co.kr/apk/sqms-debug.apk';
                link.setAttribute('download', 'sqms-debug.apk')

                if (typeof link.download === 'undefined') {
                    link.setAttribute('target', '_blank')
                }
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
            else if(this.osChk == 'ios'){
                const link = document.createElement('a')
                link.style.cssText = 'display:none';
                link.href = "itms-services://?action=download-manifest&url=https://nsqms.hec.co.kr/ipa/manifest.plist";
                document.body.appendChild(link)
                link.click();
                link.remove();
            }
            else{
                return this.alert("모바일 기기에서만 다운로드가 가능합니다. 웹사이트로 이동합니다.", async () => {this.$router.push({ name: 'Login' })});
            }
        }
    },
}
</script>
