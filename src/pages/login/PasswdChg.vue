<template>
    <div class="wrap login_wrap">
        <div class="login_detail">
            <h2></h2>
            <h3>비밀번호 변경 안내</h3>
            <div class="info_area">
               <!-- 비밀번호 변경 (1단계- 아이디 입력) -->
               <div class="user_input">
                    <input type="text" class="form_control" id="EMP_NO" v-bind:disabled="disabled" placeholder="아이디(ID)를 입력해주세요.">
                    <div class="input_number" v-show="this.STEP == 1">
                        <input id="CERT_NUM" type="text" class="form_control" placeholder="인증번호를 입력해주세요.">
                        <span id="CERT_TIME1" class="time">00:00</span>
                    </div>

                    <input type="text" class="form_control" id="PASSWD_NEW" placeholder="새 비밀번호를 입력해주세요." v-show="this.STEP == 2">
                    <input type="text" class="form_control" id="PASSWD_CHK" placeholder="한번 더 새 비밀번호를 입력해주세요." v-show="this.STEP == 2">
                    
                    <p class="txt_warning" id="STEP1" v-show="STEP == 3">* 인증번호가 발송되었습니다. 유효 시간은 10분 입니다. 인증번호 전송 후 3분 이내 비밀번호를 변경해주세요.</p>
                    <p class="txt_warning" id="STEP2" v-show="STEP == 3">* 3분 이내 비밀번호를 변경해주세요. <span class="time" id="CERT_TIME2" >02:59</span></p>

                    <button type="button" class="btn_login" v-show="STEP === 0" v-on:click="fn_certNum">인증번호 전송</button>
                    <button type="button" class="btn_login" v-show="STEP === 1" v-on:click="fn_certNumChk">확인</button>
                    <button type="button" class="btn_login white mt10" v-show="STEP == 1" >취소</button>
                    <button type="button" class="btn_login" v-show="STEP === 3" >비밀번호 변경</button>
                </div>

                <!-- 비밀번호 변경(내정보 - 비밀번호변경) -->
                <!--
                <div class="user_input">
                    <input type="text" class="form_control" placeholder="아이디">
                    <input type="text" class="form_control" placeholder="현재 비밀번호">
                    <input type="text" class="form_control" placeholder="새 비밀번호">
                    <input type="text" class="form_control" placeholder="새 비밀번호 확인">
                    <p class="txt_warning">* 3분 이내 비밀번호를 변경해주세요. <span class="time">02:59</span></p>
                    <button type="button" class="btn_login">비밀번호 변경</button>
                </div>
                -->
                <ul class="lst_help">
                    <li>비밀번호는 3개월마다 변경해야 합니다.</li>
                    <li>비밀번호는 적어도 하나의 영문자, 숫자, 특수문자를 포함해야 합니다.</li>
                    <li>비밀번호는 최소 8자 이상 20자 이내의 글자수로 구성되어야 합니다.</li>
                    <li>최근 사용한 비밀번호(이전 5번의 비밀번호)는 사용할 수 없습니다. </li>
                </ul>
           </div>
           <p class="copy">COPYRIGHTⓒ HYUNDAI ENGINEERING CO.,LTD. ALL RIGHTS RESERVED.</p>
        </div>
       
        <!-- Alert 팝업 -->
        <b-modal id="pop_alert" title="알림"
            hide-backdrop size="sm"
            :footer-bg-variant="footerBg" >
            <template #default>
                <div class="pop_container">
                    <div class="message_table">
                        <p class="msg">
                            아이디를 입력해주세요.
                            <!-- 존재하지 않는 아이디입니다. -->
                            <!-- 인증번호를 입력해주세요. -->
                            <!-- 인증번호 유효시간이 지났습니다. <br>
                                다시 인증번호를 전송/입력 후 <br>
                                진행해주세요. -->
                            <!-- 인증번호가 일치하지 않습니다. -->
                            <!-- 변경 유효시간이 지났습니다. -->
                            <!-- 비밀번호 구성 조건이 맞지 않습니다. <br>
                                최소 8자 ~ 최대 20자, 영문자, 숫자, 특수문자를 하나 이상 포함해야 합니다. -->
                            <!-- 최근 사용된 비밀번호입니다. <br>
                                다른 비밀번호를 입력해주세요. -->
                            <!-- 새 비밀번호가 일치하지 않습니다. -->
                            <!-- 비밀번호를 입력해주세요. -->
                            <!-- 비밀번호가 일치하지 않습니다. -->
                            <!-- 비밀번호 변경이 완료되었습니다. -->
                            <!-- 비밀번호 생성규칙 또는 <br> 
                                새 비밀번호 정보가 일치하지 않습니다. -->
                            <!-- 아이디 또는 비밀번호를 입력해주세요. -->
                        </p>
                    </div>
                </div>
            </template>
                <template #modal-footer="{ ok }"> 
                <b-button class="btn btn_lg btn_outline btn_blue" @click="ok">확인</b-button>
                <!-- <b-button class="btn btn_lg btn_outline btn_blue" @click="hide('forget')">닫기</b-button> -->
            </template>
        </b-modal>
   </div>
</template>
<script>


export default { 
    data() {
        return {
            STEP : 0
            , disabled : false
            , data : {}
        }
    }
    , beforeCreate() {
        this.STEP = 0;
        // console.log("this.STEP = ", this.STEP);
        //console.log(this.$emailValidation("0000"));
    }
    , computed: {
        fn_showStep1() {
            if(this.STEP == 1) return true;
            return false;
        }
        , fn_showStep2() {
            if(this.STEP == 2) return true;
            return false;
        }
    }
    , methods: {
        fn_login() {
            this.$router.push({name: 'Login'});
        }
        , fn_certNum() {
            var EMP_NO = document.getElementById("EMP_NO").value;            
            var url = "/sendApi/login";
            var param = {
                "memberId":EMP_NO
                , "memberPassword":"1234"
            }

            if(EMP_NO.length > 0) {
                var result = this.$sendApi(url, param);    
                if(result != undefined) {
                    this.STEP = 1;
                    this.disabled = true;
                }
            } else {
                this.STEP = 0;
                this.disabled = false;
            }
            
        }
        , fn_certNumChk() {
            var CERT_NUM = document.getElementById("CERT_NUM").value;            
            if(CERT_NUM.length > 0) {
                this.STEP = 2;
                this.disabled = true;
            } else {
                this.STEP = 1;
                this.disabled = false;
            }         
        }
        , fn_showCert() {
            // console.log("this.STEP = ", this.STEP);
            if(this.STEP == 1) {
                // console.log("true");
                return true;
            }
            else {
                // console.log("false");
                return false;
            }
        }
    }
}
</script>
