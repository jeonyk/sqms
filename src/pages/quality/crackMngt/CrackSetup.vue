<template>
        <div class="tab_contents">
            <Breadcrumb :currentPath="$route.fullPath" />
            <div class="inner type2">
                <div class="lst_tabs pt0">
                    <ul class="">
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" v-bind:key="index"><a href="javascript:void(0);" v-on:click="[currentTab=index,fnSwitch()]">{{tab}}</a></li>
                    </ul>
                </div>
                <div class="tab_area" v-show="currentTab === 0">
                    <div class="inner">
                        <div class="button_box">
                            <strong>차수별 점검 기준일정 Set-up</strong>
                            <div class="fr">
                                <button v-if="checkUser(userId,'change')" type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="fnCrckSetupChange">저장</button>
                            </div>
                        </div>

                        <div class="table_normal_list table_write align_center">
                            <table>
                                <colgroup>
                                    <col width="30%">
                                    <col width="*">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>차수</th>
                                        <th>점검 기준</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1차</td>
                                        <td>탈형 후,
                                            <input type="text" class="form_control small" v-model="crckDate01"> 일 이내
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2차</td>
                                        <td>1차 후, <input type="text" class="form_control small" v-model="crckDate02"> 일 이내</td>
                                    </tr>
                                    <tr>
                                        <td>3차</td>
                                        <td>2차 후, <input type="text" class="form_control small" v-model="crckDate03"> 일 이내</td>
                                    </tr>
                                    <tr>
                                        <td>보수/보강</td>
                                        <td>보수/보강 후, <input type="text" class="form_control small" v-model="crckDateRepr"> 일 이내</td>
                                    </tr>
                                    <tr>
                                        <td>4차</td>
                                        <td>3차 후, <input type="text" class="form_control small" v-model="crckDate04"> 일 이내</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab === 1">
                    <approval-option
                        code-type="CRCK"
                    />
                    <!-- <div class="inner">
                        <div class="button_box">
                            <h2>결재방식 선택</h2>
                            <button type="button" class="btn btn_sm btn_darkblue" v-on:click="fnCrckAprvChange">저장</button>
                        </div>
                        <div class="table_normal_list opt_payment">
                            <table>
                                <colgroup>
                                    <col width="*">
                                    <col width="*">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td
                                            v-for="(item, index) in approval.list"
                                            :key="index"
                                        >
                                            <label
                                                class="input_radio"
                                                :for="`approvalMethod_${index}`"
                                            >
                                                <input
                                                    type="radio"
                                                    v-model="approval.current"
                                                    :id="`approvalMethod_${index}`"
                                                    :value="item.option"
                                                >
                                                <span class="label_text"> 
                                                    {{item.title}}
                                                    <div class="info">

                                                        <strong v-html="toHtml(item.content)">  </strong>
                                                    </div>
                                                </span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p class="table_message">* 진행 중인 결재는 기존 옵션으로 진행됩니다. 변경된 결재옵션은 새로운 결재부터 적용됩니다.</p>
                    </div> -->
                </div>
            </div>
            <PopAlert
                v-bind:msg="popMsg" v-bind:pop-id="popId" v-bind:confirm-use="confirmUse"
                v-on:first-btn-fn="closePop"
            />
        </div>
</template>

<script>
    // import { HoldOption, HoldOption2, QualityState } from '../data/LocusList'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import {sendPostApi, requestOptions }  from '../../../apis/common';
    import ApprovalOption from "@material/component/ApprovalOption";
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';

    export default {
        name: 'CrackSetupSheet',
        mixins: [authCheckMixns,MsgBoxMixins],
        components: {
            PopAlert,
            ApprovalOption,
            Breadcrumb,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['기본정보', '결재옵션'], // tab name
                
                //set up 등록
                siteMstrId: '', // 현장정보 ID
                crckSetupOptnId: '', // 기본정보 ID
                crckDate01: 0, // 1차 점검기준일자
                crckDate02: 0, // 2차 점검기준일자
                crckDate03: 0, // 3차 점검기준일자
                crckDateRepr: 0, // 보수보강 기준일자
                crckDate04: 0, // 4차 점검기준일자
                writeYn: false, //기존정보 등록 여부

                //aprv option 등록
                aprvOptnInfoId:'', // 결재정보 ID
                aprvOptnType:'', // 결재처리방식


                focusDate01: 0,
                focusDate02: 0,
                focusDate03: 0,
                focusDateRepr: 0,
                focusDate04: 0,

                //alert pop
                popMsg: '',
                popId: 'setupAlert',
                confirmUse: false,

                approval: {
                    current: '',
                    list: [
                        {
                            title: '온라인',
                            content: '전체 결재 라인\n 온라인 결재',
                            option: 'ALLON',
                        },
                        {
                            title: '50% 온라인',
                            content: 'HEC 내부만\n 온라인 결재',
                            option: 'HAFON',
                        },
                        {
                            title: '오프라인',
                            content: '결재 서류 출력 후 결재\n 단, 결재완료 후\n 최종승인 처리 필요',
                            option: 'OFFLN',
                        }
                    ]
                },
                userId: '',
            }
        },
        mounted() {
            this.userId = this.$store.getters['auth/getUserId'];
        },
        created() {
            this.fnCrckSetupView();
        },
        beforeDestroy() {
        },
        watch: {
            crckDate01 : function(){
                this.focusDate01 = this.crckDate01.toString();
                if(this.focusDate01.length >1 && this.focusDate01.substring(0,1) == 0 ){
                    this.focusDate01 = this.focusDate01.substring(1,this.focusDate01.length);
                }
                this.crckDate01 =this.focusDate01.replace(/[^0-9]/g, '');
            },
            crckDate02 : function(){
                this.focusDate02 = this.crckDate02.toString();
                if(this.focusDate02.length >1 && this.focusDate02.substring(0,1) == 0 ){
                    this.focusDate02 = this.focusDate02.substring(1,this.focusDate02.length);
                }
                this.crckDate02 = this.focusDate02.replace(/[^0-9]/g, '');
            },
            crckDate03 : function(){
                this.focusDate03 = this.crckDate03.toString();
                if(this.focusDate03.length >1 && this.focusDate03.substring(0,1) == 0 ){
                    this.focusDate03 = this.focusDate03.substring(1,this.focusDate03.length);
                }
               this.crckDate03 = this.focusDate03.replace(/[^0-9]/g, '');
            },
            crckDateRepr : function(){
                this.focusDateRepr = this.crckDateRepr.toString();
                if(this.focusDateRepr.length >1 && this.focusDateRepr.substring(0,1) == 0 ){
                    this.focusDateRepr = this.focusDateRepr.substring(1,this.focusDateRepr.length);
                }
                this.crckDateRepr = this.focusDateRepr.replace(/[^0-9]/g, '');
            },
            crckDate04 : function(){
                this.focusDate04 = this.crckDate04.toString();
                if(this.focusDate04.length >1 && this.focusDate04.substring(0,1) == 0 ){
                    this.focusDate04 = this.focusDate04.substring(1,this.focusDate04.length);
                }
                this.crckDate04 = this.focusDate04.replace(/[^0-9]/g, '');
            },
        },
        methods: {
            //탭메뉴 클릭시 조회
            fnSwitch: function(){
                if(this.currentTab === 0){
                    this.fnCrckSetupView();
                }else if(this.currentTab === 1){
                    this.fnCrckAprvView();
                }
            },
            //기본정보 조회
            fnCrckSetupView: async function(){
                this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/quality/crackMngt/setup/view';
                let param = {
                    "siteMstrId": this.siteMstrId,
                };
                const resData = await sendPostApi(url, param).then((result) => {
                    return result;
                }).catch((e) => {
                    // //console.log(e);
                    return e.response.data;
                });
                //console.log(resData);
                // if(resData.statusText == "OK" && resData.data.resultList!= null && typeof(resData.data.resultList) != "undefined"){
                if(resData.status == 200 && resData.data.resultList!= null && typeof(resData.data.resultList) != "undefined"){
                    this.siteMstrId = resData.data.resultList.siteMstrId;
                    this.crckSetupOptnId = resData.data.resultList.crckSetupOptnId;
                    this.crckDate01 = resData.data.resultList.crckDate01;
                    this.crckDate02 = resData.data.resultList.crckDate02;
                    this.crckDate03 = resData.data.resultList.crckDate03;
                    this.crckDateRepr = resData.data.resultList.crckDateRepr;
                    this.crckDate04 = resData.data.resultList.crckDate04;
                    this.writeYn = true;
                // }else if(resData.statusText == "OK" && resData.data.resultList == null){
                }else if(resData.status == 200 && resData.data.resultList == null){
                    this.crckDate01 = 30;
                    this.crckDate02 = 30;
                    this.crckDate03 = 30;
                    this.crckDateRepr = 30;
                    this.crckDate04 = 30;
                    this.writeYn = false;
                }
            },
            //기본정보 수정
            fnCrckSetupChange: async function(){
                if(this.currentTab === 0 && this.writeYn){//기본정보일경우
                    if(this.fnCrckCheck() != ''){
                        this.alert(this.popMsg);
                        return;
                        // this.$root.$emit('bv::show::modal','setupAlert');
                    }else{
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        let url = '/sendApi/api/quality/crackMngt/setup/change';
                        let param = {
                            "crckDate01": this.crckDate01,
                            "crckDate02": this.crckDate02,
                            "crckDate03": this.crckDate03,
                            "crckDateRepr": this.crckDateRepr,
                            "crckDate04": this.crckDate04,
                            "siteMstrId": this.siteMstrId,
                            "crckSetupOptnId": this.crckSetupOptnId,
                        };
                        const resData2 = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // //console.log(e);
                            return e.response.data;
                        });
                        //console.log(resData2);

                        // this.confirmUse = false;
                        // this.popMsg = '저장되었습니다.';
                        // this.$root.$emit('bv::show::modal', 'setupAlert');
                        this.alert('저장되었습니다.');
                        return;
                    }
                }
                // }else if(this.currentTab === 0 && !this.writeYn){

                //     requestOptions.headers['Accept-Language'] = "ko";
                //     requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                //     let url = '/sendApi/api/quality/crackMngt/setup/write';
                //     //console.log(this.siteMstrId);
                //     let param = {
                //         "crckDate01": this.crckDate01,
                //         "crckDate02": this.crckDate02,
                //         "crckDate03": this.crckDate03,
                //         "crckDateRepr": this.crckDateRepr,
                //         "crckDate04": this.crckDate04,
                //         "siteMstrId": this.siteMstrId,
                //     };
                //     const resData = await sendPostApi(url, param).then((result) => {
                //         return result.data;
                //     }).catch((e) => {
                //         // //console.log(e);
                //         return e.response.data;
                //     });

                //     this.confirmUse = false;
                //     this.popMsg = resData.rMsg;
                //     this.$root.$emit('bv::show::modal', 'setupAlert');

                //     return;
                // }
            },
            //결재옵션 조회
            fnCrckAprvView: async function(){
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/quality/crackMngt/approveOption/view';
                let param = {
                    "siteMstrId": this.$store.getters['auth/getSiteMstrId'],
                };
                const resData3 = await sendPostApi(url, param).then((result) => {
                    return result;
                }).catch((e) => {
                    // //console.log(e);
                    return e.response.data;
                });
                //console.log(resData3);
                // if(resData3.statusText == "OK" && resData3.data.resultList.siteMstrId != null && typeof(resData3.data.resultList.siteMstrId) != "undefined"){
                if(resData3.status == 200 && resData3.data.resultList.siteMstrId != null && typeof(resData3.data.resultList.siteMstrId) != "undefined"){
                    this.siteMstrId = resData3.data.resultList.siteMstrId;
                    this.aprvOptnInfoId = resData3.data.resultList.aprvOptnInfoId;
                    this.aprvOptnType = resData3.data.resultList.aprvOptnType;
                    let index = (this.aprvOptnType=='HAFON'?1:(this.aprvOptnType=='OFFLN'?2:0));
                    //console.log(index);
                    let id = 'approvalMethod_'+index;
                    let element = document.getElementById(id);
                    element.click();
                }
            },
            //결재옵션 수정
            fnCrckAprvChange: async function(){
                if(this.currentTab === 1){//결재옵션일경우
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = '/sendApi/api/quality/crackMngt/approveOption/change';
                    let param = {
                        "siteMstrId": this.siteMstrId,
                        "aprvOptnInfoId": this.aprvOptnInfoId,
                        "aprvOptnType": this.approval.current,
                    };
                    const resData = await sendPostApi(url, param).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // //console.log(e);
                        return e.response.data;
                    });

                    if(resData.rCode == "0000") {
                        // this.confirmUse = false;
                        // this.popMsg = '결재옵션이 적용되었습니다.';
                        this.alert('결재옵션이 적용되었습니다.');
                    }else {
                        // this.confirmUse = false;
                        // this.popMsg = '저장에 실패했습니다.';
                        this.alert('저장에 실패했습니다.');
                    }
                    // this.$root.$emit('bv::show::modal', 'setupAlert');
                }
                return;
            },
            // 기본정보 write
            // fnCrckSetupWrite : async function(){

            //     requestOptions.headers['Accept-Language'] = "ko";
            //     requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            //     let url = '/sendApi/api/quality/crackMngt/setup/write';
            //     //console.log(this.siteMstrId);
            //     let param = {
            //         "crckDate01": this.crckDate01,
            //         "crckDate02": this.crckDate02,
            //         "crckDate03": this.crckDate03,
            //         "crckDateRepr": this.crckDateRepr,
            //         "crckDate04": this.crckDate04,
            //         "siteMstrId": this.siteMstrId,
            //     };
            //     const resData = await sendPostApi(url, param).then((result) => {
            //         return result.data;
            //     }).catch((e) => {
            //         // //console.log(e);
            //         return e.response.data;
            //     });

            //     if(resData.rCode == "0000") {
            //         this.confirmUse = false;           
            //     }else {
            //         this.confirmUse = false;
            //     }

            //     this.popMsg = resData.rMsg;
            //     this.$root.$emit('bv::show::modal', 'setupAlert');

            //     return;
            // },
            closePop : function() { //기본 팝업 닫기 event
                this.$root.$emit('bv::hide::modal', 'setupAlert');
            },
            fnCrckCheck : function() {
                this.popMsg = '';
                if(this.crckDate01 == null || this.crckDate01 ==''){
                    return this.popMsg = '1차 점검기준일을 입력해주세요';
                }
                if(this.crckDate02 == null || this.crckDate02 ==''){
                    return this.popMsg = '2차 점검기준일을 입력해주세요';
                }
                if(this.crckDate03 == null || this.crckDate03 ==''){
                    return this.popMsg = '3차 점검기준일을 입력해주세요';
                }
                if(this.crckDateRepr == null || this.crckDateRepr ==''){
                    return this.popMsg = '보수/보강 점검기준일을 입력해주세요';
                }
                if(this.crckDate04 == null || this.crckDate04 ==''){
                   return this.popMsg = '4차 점검기준일을 입력해주세요';
                }
                return this.popMsg;
            },
            toHtml(string) {
                return string.split('\n').join('<br>')
            },
        }
    }
</script>