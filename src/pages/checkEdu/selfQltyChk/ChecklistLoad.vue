<template>
    <!-- 체크리스트 불러오기 팝업 --> 
    <b-modal id="ChecklistLoad" :title="titleNm" 
    hide-backdrop size="lg" @shown="sheetLoad"
    :footer-bg-variant="footerBg">
        <template #default>
            <div class="pop_container">
                <div class="button_box" v-if="canCheck">
                    <strong>1. Check List 종류 체크</strong>
                </div>
                <div class="lookup_box multi_line ac" v-if="canCheck">
                    <label class="input_radio" for="rdoSolar1">
                        <input type="radio" id="rdoSolar1" name="birthday_type2" value="Y" checked="" v-model="isSite" @change="sheetLoad">
                        <span class="label_text">현장 체크리스트</span>
                    </label>
                    <label class="input_radio ml40" for="rdoSolar2">
                        <input type="radio" id="rdoSolar2" name="birthday_type2" value="N" v-model="isSite" @change="sheetLoad">
                        <span class="label_text">본사 체크리스트</span>
                    </label>
                </div>

                <div class="ib_wrap">
                    <div id="checklistLoadTable" class="ibsheet_table" style="max-height:336px"></div>
                </div>
                <PopAlert
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
            </div>
        </template>
        <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="fnChoice"> <!-- @click="ok" -->선택</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
        </template>
    </b-modal>
</template>
<script>
// import {sendPostApi, requestOptions }  from '../../../apis/common';
// import API from '@/apis/'
import PopAlert from '@/pages/common/popup/PopAlert.vue' 
import { ChecklistLoad } from '../../common/data/PopupList'
import loader from '@ibsheet/loader'
import axios from 'axios'

export default {
    name:'ChecklistLoad',
    components:{
        PopAlert,
    },
    data(){
        return {
            titleNm:'본사 체크리스트 불러오기',
            footerBg: 'transparent',
            popListSheet:null,
            confirmUse:false,
            popId:'checkListPopAlert',
            popMsg: '',

            isSite: 'Y',
            selfChkInfoId:'',
            title:'',
        }
    },
    props:{
        siteId:{
            type: String,
            default:'',
        },
        canCheck:{  //라디오버튼유무
            type: Boolean,
            default:false,
        }
    },
    beforeDestroy() {
        loader.removeSheet('checklistLoad1');
    },
    methods:{
        sheetLoad: async function(){
            loader.removeSheet('checklistLoad1');
            this.selfChkInfoId = '';
            this.title = '';
            let scroll = 1;
            let data = [];
            let option = ChecklistLoad.options;
            let url = '/sendApi/api/selfQltyChk/popup/checkList/list';
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }
            if(!this.canCheck){
               this.isSite = 'N';
               this.titleNm = '본사 체크리스트 불러오기';
            }else{
                this.titleNm = 'Check List 검색';
            }
            
            let payload = {};
            if(this.isSite == 'Y'){
                payload['siteMstrId'] = this.siteId;
            }

            axios.post(url, payload, options).then(response => {
                // console.log(response.data.data);
                data = response.data.data;
                if(data.length<10){
                    scroll = 1;
                }else{
                    scroll = 0;
                }
            }).catch(error => {
                // throw new Error(error)
                console.error(error);
                scroll = 1;
                this.popMsg = '오류로 인해 데이터가 조회되지 않았습니다.';
                this.confirmUse = false;
                this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                return;
            })

            option.Cfg = {
                NoVScroll: scroll,
                CanEdit: 0,
                NoDataMessage:3,
            };

            option.Events = {
                onClick: this.fnClick,
                ondblclick : this.fnChoice,
            };

            loader.createSheet({
                el: 'checklistLoadTable',
                id:'checklistLoad1',
                data: data,
                options: option,
            }).then((sheet) => {
               this.popListSheet = sheet;
            });
            this.heightChange(scroll,'checklistLoadTable');
        },
        fnClick: function(evt){
            // console.log(evt.row);
            this.selfChkInfoId = evt.row.selfChkInfoId;
            this.title = evt.row.title;
        },
        fnChoice:function(){
            if(this.selfChkInfoId == '' || this.selfChkInfoId == null){
                this.popMsg ='선택된 데이터가 없습니다.';
                this.confirmUse = false;
                this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                return;
            }else{
                let obj = {
                    'selfChkInfoId':this.selfChkInfoId,
                    'title':this.title,
                };
                this.$emit("fn-select-check-lst",obj);
                this.$root.$emit('bv::hide::modal', 'ChecklistLoad');
            }
        },
        heightChange:function(scroll,div){
            if(scroll == 0){
                document.getElementById(div).parentElement.style.height = "336px";
            }else{
                document.getElementById(div).parentElement.style.height = "";
            }
            document.getElementById(div).style.height = "100%";
        },
        alertConfirmFn:function(){
            this.$root.$emit('bv::hide::modal', 'checkListPopAlert');
        },
        closePop: function() {
            this.$root.$emit('bv::hide::modal', 'checkListPopAlert');
        },
    },
}
</script>