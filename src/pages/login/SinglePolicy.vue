<template>
    <b-modal id="SinglePolicy" :title="title" hide-backdrop size="lg" scrollable :footer-bg-variant="footerBg" @shown="selectType">
        <template #default>
            <div class="pop_container">

                <p>&#39;SQMS 및 모바일 Hi-Q&#39;를 운영하는 &#39;현대엔지니어링&#39;은 (이하 &#39;회사&#39;는) 고객님의
                    개인정보를 중요시하며, 개인정보보호법에 따라 정보주체의 개인정보 보호 및 권익을
                    보호하고 개인정보와 관련한 정보주체의 고충을 원활하게 처리 할 수 있도록 다음과
                    같은 처리방침을 두고 있습니다.
                    회사는 개인정보처리방침을 개정하는 경우 &#39;https://nsqms.hec.co.kr&#39; 로그인 화면의
                    개인정보처리방침을 통하여 공지할 것입니다.
                    본 방침은 2022년 10월 01일부터 시행됩니다.
                </p>

                <h3 class="title flc">
                    개인정보처리방침
                    <div class="top_area">
                        <p>변경이력</p>
                        <select name="" id="" class="form_control" :value="depthIdx" @change="valueChange">
                            <option v-for="(data, idx) in privacy" :key="idx" :value="idx">{{data.date}}</option>
                        </select>
                    </div>
                </h3>
                <div class="terms_area" v-html="content"></div>
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>
</template>
<script>
import privacyPolicy from '@/pages/common/data/PrivacyPolicy'

export default{
    name: 'SinglePolicy',
    components: {

    },
    data(){
        return{
            footerBg: 'transparent',
            orgPrivacy:privacyPolicy,   //스크립트
            privacy: [],                //개인정보 처리방침
            termsOfService: [],         //이용약관
            depthIdx:0,
            content:'',
            title:'',
        }
    },
    props:{
        type:{
            type:String,
            default: '',
        }
    },
    mounted(){
    },
    methods: {
        selectType:function(){
            //초기화
            this.privacy = [];
            this.termsOfService = [];
            
            for(let x = 0; x<this.orgPrivacy.length; x++){
                //개인정보 처리방침일 경우
                if(this.orgPrivacy[x].type == 'privacy'){   
                    this.privacy.push(this.orgPrivacy[x]);
                }else if(this.orgPrivacy[x].type == 'use'){
                    this.termsOfService.push(this.orgPrivacy[x]);
                }
            }
            // console.log(this.privacy,this.termsOfService);
            if(this.type == 'privacy'){
                this.title = '개인정보 처리방침';
                this.content = this.privacy[this.depthIdx].content;
            }else{
                this.title = '이용약관 동의안내';
                this.content = this.termsOfService[this.depthIdx].content;
            }
        },
        valueChange: function(){
            if(this.type == 'privacy'){
                this.content = this.privacy[this.depthIdx].content;
            }else{
                this.content = this.termsOfService[this.depthIdx].content;
            }
        }
    }
}
</script>