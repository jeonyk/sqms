<template>
    <!-- 협력업체인력 조회 팝업 -->
    <b-modal :id="refId" title="협력업체인력 조회" 
        hide-backdrop size="lg" @shown="searchReset"
        :footer-bg-variant="footerBg" static>
        <template #default>
            <div class="pop_container">
                <div class="lookup_box multi_line align_center">
                    <table>
                        <caption class="sr_only"></caption>
                        <tbody>
                            <tr>
                                <th>업체명</th>   
                                <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="companyName" v-on:keyup="enterEvent"></td>
                                <td class="ar">
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div :id="`cooperationSearch_${popIdx}`" class="ibsheet_table" style="max-height: 337px;"></div>
                </div>

                <PopAlert
                    v-bind:msg="popMsg" v-bind:pop-id="popId"
                    v-on:first-btn-fn="closePop"
                />
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="fnPartnerChoice">선택</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
// import API from '@/apis/'
import PopAlert from '@/pages/common/popup/PopAlert.vue'
import loader from '@ibsheet/loader'
import { CooperationSearch } from '../../common/data/PopupList'
import {requestOptions, sendPostApi }  from '../../../apis/common';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

let sheetId = '';

export default {
    name: 'CooperationSearch',
    mixins: [MsgBoxMixins],
    components: {
        PopAlert,
    },
    data() {
        return{
            footerBg: 'transparent',

            focusUserNm: '', //선택한 사원명 
            focusUserId: '', //선택한 사원id
            focusJobRoleNm: '', //선택한 직책명
            focusTradeId: '', //선택한 협력사 id
            focusTradeNm: '', //선택한 협력사명
            
            partnerList : [],
            
            //검색어
            emploName:'', //협력사 직원 명
            companyName:'', // 협력사 명

            //alert pop
            popMsg: '',
            popId: 'cooperationAlert'
        }
    },
    props:{
        siteMstrId:{
            type:String,
            default:'',
        },
        refId:{
            type:String,
            default:'CooperationSearch',
        },
        popIdx:{
            type:String,
            default:'0',
        },
    },
    beforeDestroy(){
        loader.removeSheet(sheetId);
    },
    methods:{
        enterEvent : function(e) { //검색조건 enter event
            if(e.keyCode == 13) {
               this.sheetCreate();
            }
        },
        searchReset: function(){
            this.emploName = '';
            this.companyName = '';
            this.sheetCreate();
        },
        
        sheetCreate: async function() {
            requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
            
            let url = '/sendApi/api/popup/partnerUserSearch/list';
            let param = {};

            if(this.emploName != '') {
               param['userNm'] = this.emploName;
            }
            if(this.companyName != '') {
               param['tradeNm'] = this.companyName;
            }
            if(this.siteMstrId != ''){
                param['siteMstrId'] = this.siteMstrId;
            }

            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               return e.response.data;
            });

            let data = [];
            let options = CooperationSearch.options;
            let scroll = 1;

            if(resData.rCode == "0000" && resData.datas.resultList.length != 0) {
               this.partnerList = resData.datas.resultList;

               data = this.partnerList;
               if(data.length<10){
                  scroll = 1;
               }else{
                  scroll = 0;
               }

               //맨 윗줄 값 가져오기
               this.focusUserNm = data[0].userNm;
               this.focusUserId = data[0].userId;
               this.focusJobRoleNm = data[0].jobRoleNm;
               this.focusTradeId = data[0].tradeId;
               this.focusTradeNm = data[0].tradeNm;
            }else {
               dataMerge = 2; //행 기준 병합
               data = [];
               scroll = 1;

               //가지고있는 값 제거
               this.focusUserNm = '';
               this.focusUserId = '';
               this.focusJobRoleNm = '';
               this.focusTradeId = '';
               this.focusTradeNm = '';
            }

            loader.createSheet({
                el: `cooperationSearch_${this.popIdx}`,
                data: data,
                options: {
                    Cfg: {
                        NoVScroll: scroll,
                        NoDataMessage:3,
                        CanEdit:0,
                    },
                    Cols: options.Cols,
                    Events : {
                        onClick: this.fnClick,
                        ondblclick : this.fnPartnerChoice
                    }
                },
            }).then((sheet) => {
               sheetId = sheet.id
            });
            this.heightChange(scroll);
        },
        fnPartnerChoice: function(){//선택 버튼 누를때 event
            if(this.focusUserId == ''|| typeof(this.focusUserId) == "undefined" || this.focusUserId == "조회된 데이터가 없습니다") {
                // this.popMsg = '협력업체인력을 선택해주세요';
                // this.$root.$emit('bv::show::modal', 'cooperationAlert');
                this.alert('선택된 행이 없습니다.');
                return;
            }else{
                // if(this.memberIdList.indexOf(this.focusUserId) >= 0){
                //    this.popMsg = '같은 사원은 등록할 수 없습니다.';
                //    this.$root.$emit('bv::show::modal', 'cooperationAlert');
                //    return;
                // }else {
                    // this.memberIdList.push(this.focusUserId);
                    let infoPartner = {
                        userNm: this.focusUserNm,
                        userId: this.focusUserId,
                        jobRoleNm: this.focusJobRoleNm,
                        tradeId: this.focusTradeId,
                        tradeNm: this.focusTradeNm,
                        // memberIdList: this.memberIdList,
                    }
                    //console.log(this.focusUserNm);
                    this.$emit('fn-partner-choice', infoPartner);
                    this.focusUserNm = '';
                    this.focusUserId = '';
                    this.focusJobRoleNm = '';
                    this.focusTradeId = '';
                    this.focusTradeNm = '';

                    this.emploName = '';
                    this.companyName = '';
                    // //console.log(this.memberIdList);

                    this.$root.$emit('bv::hide::modal', this.refId);
                // }
            }
        },
        fnClick: function(evtParams){//셀 클릭할때마다
            this.focusUserNm = evtParams.row.userNm;
            this.focusUserId = evtParams.row.userId;
            this.focusJobRoleNm = evtParams.row.jobRoleNm;
            this.focusTradeId = evtParams.row.tradeId;
            this.focusTradeNm = evtParams.row.tradeNm;
            //console.log(this.focusUserId);
        },
        closePop: function() {
            this.$root.$emit('bv::hide::modal', 'cooperationAlert');
        },
        heightChange:function(scroll){
            let div = document.getElementById(`cooperationSearch_${this.popIdx}`);
            if(scroll == 0){
               div.parentElement.style.height = "337px";
            }else{
               div.parentElement.style.height = "";
            }
            div.style.height = "100%";
        }
    }
}
</script>