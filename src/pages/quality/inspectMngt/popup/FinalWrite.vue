<template>
    <!-- 최종 등록 팝업 -->
    <b-modal id="FinalWrite" title="최종 등록" 
        hide-backdrop size="lg" 
        :footer-bg-variant="footerBg" static>
        <template #default>
            <div class="pop_container">
                <h3 class="subject">* 제목과 비고를 입력하여 ITP를 관리하세요</h3>
                
                <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="20%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td><input type="text" class="form_control" v-model="title" :maxlength="20"></td>
                            </tr>
                            <tr>
                                <th>비고</th>
                                <td>
                                    <textarea name="" id="" class="form_control" :value="comment" @keyup="fn_inputCheck($event)" :maxlength="500"></textarea>
                                    <p class="table_message ar mt0">{{ comment.length }} / {{ 500 }}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
            </div>
        </template>
        <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide }" -->
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="finalSaveYn">등록</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
        </template>
    </b-modal>
</template>
<script>
    import axios from 'axios'
    import API from '@/apis/'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    // import { sendPostApi, requestOptions } from '@/apis/common';

    export default {
        name: 'FinalWrite',
        mixins: [MsgBoxMixins],
        components: {
            PopAlert,
            // ProjectSelect,
        },
        data() {
            return {
                footerBg: 'transparent',
                siteMstrId:'',
                mainCodeId:'',
                midCodeId:'',
                mounted:false,
                popMsg: '',                                 // 알림창 메세지
                confirmUse: false,                             // 알림창 버튼개수
                popId:'FinalWriteAlert',                     // 알림창 Id
                title:'',
                comment:'',
            }
        },
        props:{
            siteId:{
                type:String,
                default:'',
            },
        },
        mounted(){  

        },
        methods: {
            finalSaveYn:function(){
                this.popMsg = '';
                if(this.title == ''||this.title == null){
                    this.alert('제목을 입력해주세요.')
                    return
                }
                if(this.popMsg ==''){
                    this.confirm('등록하시겠습니까?',()=>{
                        this.finalSave();
                    })
                }
            },
            finalSave: async function(){
                this.finalSaveYn = false;
                const urls = {
                    docSeq: '/sendApi/api/docNum/selectDocNumSeq',
                    inptITPWritngLastWrite: '/sendApi/api/inptMngt/siteSetUp/inptITPWritngLast/write',
                    // approveDoc: '/sendApi/api/approv/approvedDoc/write',
                    // setFactoryInfo: '/sendApi/api/quality/materialSiteCheck/factoryTest/change',
                }
                const payload = {
                    siteMstrId: this.siteId,
                    codeType: 'INPT',
                    codeDtlType: 'ITP',
                    gjmcd: '',
                    gjscd: '',
                    aprvOptnType: '',
                    docType: '',
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
                axios.post(urls.docSeq, payload, options)
                    .then(response => {
                        axios.post(
                            urls.inptITPWritngLastWrite, 
                            {   ...payload,
                                itpNo: response.data,
                                title:this.title,
                                comment:this.comment,
                            }, 
                            options)
                            .then(aprvRes => {
                                //console.log(aprvRes)
                                this.alert('등록되었습니다.',()=>{
                                    this.$emit('fn-load',true);
                                    this.$root.$emit('bv::hide::modal', 'FinalWrite');
                                })
                                return
                            })
                        .catch(error => {
                            // throw new Error(error)
                            //console.error(error)
                            this.alert('등록되었습니다.',()=>{
                                this.$emit('fn-load',true);
                                this.$root.$emit('bv::hide::modal', 'FinalWrite');
                            })
                            return        
                        })
                    })
                    .catch(error => {
                        //console.error(error)
                        this.alert('등록에 실패했습니다.')
                        return        
                    })        
            },
            alertConfirmFn:function(){
                if(this.finalSaveYn){
                    this.finalSaveYn = false;
                    this.$emit('fn-load',true);
                    this.$root.$emit('bv::hide::modal', 'FinalWrite');
                }
                this.$root.$emit('bv::hide::modal', 'FinalWriteAlert');
            },
            closePop:function(){
                this.$root.$emit('bv::hide::modal', 'FinalWriteAlert');
            },
            fn_inputCheck(evt){
                if(500 >= evt.target.value.length){
                this.comment = evt.target.value;
                }
            },
        }
    }
</script>
