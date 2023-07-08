<template>
    <b-modal :id="refId" title="협력사 직원 검색" hide-backdrop size="lg" v-bind:footer-bg-variant="footerBg" v-on:shown="searchReset">
        <template #default>
            <div class="pop_container">
                <div class="lookup_box multi_line align_center">
                    <table> 
                        <tbody>
                            <tr>
                                <th>사용자명</th>   
                                <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="emploName" v-on:keyup="enterEvent"></td>        
                                <th>협력사명</th>
                                <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="companyName" v-on:keyup="enterEvent"></td>
                                <td class="ar">
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="ib_wrap">
                    <div id="partnerUserPopsheetTable" class="ibsheet_table" style="max-height: 337px;"></div>
                </div>

                <PopAlert
                    v-bind:msg="popMsg" v-bind:pop-id="popId"
                    v-on:first-btn-fn="closePop"
                />
            </div>

        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnPartnerChoice">선택</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" v-on:click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
   import { PartnersSearch } from '../data/PopupList'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'

   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   
   let sheetId = '';

   export default {
      name: 'PartnerUserSearch',
      mixins: [MsgBoxMixins],
      components: {
          PopAlert
      },
      data() {
         return {
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
            popId: 'partnersAlert'
         }
      },
      props: {
         siteMstrId:{
            type:String,
            default: '',
         },
         ptnrType: {
            type:String,
            default:'',
         },
         refId:{
            type:String,
            default:'PartnerUserSearch',
         },
         // searchValue: {
         //    type: String,
         //    default: ''
         // }
         // memberIdList: { //받아올 사원리스트가 있는경우 중복을 방지하기 위한 변수
         //    type: Array,
         //    default: () => {
         //       return{
                  
         //       }
         //    }
         // }
      },
      beforeDestroy() {
         // loader.removeSheet(sheetId)
      },
      
      mounted() {
      
      },

      created() {
        this.focusUserId = this.userId;
      },

      methods: {
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
            /* 임시용 */
            requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
            //
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
            if(this.ptnrType != '' && this.ptnrType != null){
               param['tradeType'] = this.ptnrType;
            }

            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               return e.response.data;
            });

            let options = PartnersSearch.options;
            let data = this.partnerList;
            let scroll = 1;

            let cols = [
                { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
                { Name: 'userNm', Header: [{ Value: '사용자명' }], RelWidth: 20 },
                { Name: 'jobRoleNm', Header: [{ Value: '직책명' }], RelWidth: 20 },
                { Name: 'tradeNm', Header: [{ Value: '협력사명' }], RelWidth: 50 },
            ]

            options.Cols = cols;
            let canEdit = 0; //ibsheet 수정불가
            let dataMerge = 0;

            if(resData.rCode == "0000" && resData.datas.resultList.length != 0) {
               this.partnerList = resData.datas.resultList;

               data = this.partnerList;
               if(data.length<10){
                  scroll = 1;
               }else{
                  scroll = 0;
               }
               dataMerge = 0; //병합 X

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
               el: 'partnerUserPopsheetTable',
               data: data,
               options: {
                  Cfg : {
                     CanEdit : canEdit,
                     DataMerge : dataMerge,
                     NoVScroll : scroll,
                     NoDataMessage:3,
                  },
                  Cols : cols,
                  Events : {
                     onClick: this.fnClick,
                     ondblclick : this.fnDblClick
                  }
               },
            }).then((sheet) => {
               sheetId = sheet.id
            });
            this.heightChange(scroll,'partnerUserPopsheetTable');
         },
         fnDblClick : function(evt){
            if(evt.row.Kind != 'Data'){
               return;
            }
            this.fnPartnerChoice();
         },
         fnPartnerChoice: function(){//선택 버튼 누를때 event
            if(this.focusUserId == ''|| typeof(this.focusUserId) == "undefined" || this.focusUserId == "조회된 데이터가 없습니다") {
               // this.popMsg = '협력사 직원을 선택해주세요';
               // this.$root.$emit('bv::show::modal', 'partnersAlert');
               this.alert('협력사 직원을 선택해주세요.');
               return;
            }else{
               // if(this.memberIdList.indexOf(this.focusUserId) >= 0){
               //    this.popMsg = '같은 사원은 등록할 수 없습니다.';
               //    this.$root.$emit('bv::show::modal', 'partnersAlert');
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
                  // console.log(this.focusUserNm);
                  this.$emit('fn-partner-choice', infoPartner);
                  this.focusUserNm = '';
                  this.focusUserId = '';
                  this.focusJobRoleNm = '';
                  this.focusTradeId = '';
                  this.focusTradeNm = '';

                  this.emploName = '';
                  this.companyName = '';
                  // console.log(this.memberIdList);

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
          },
          closePop: function() {
              this.$root.$emit('bv::hide::modal', 'partnersAlert');
          },
          heightChange:function(scroll,div){
            if(scroll == 0){
               document.getElementById(div).parentElement.style.height = "337px";
            }else{
               document.getElementById(div).parentElement.style.height = "";
            }
            document.getElementById(div).style.height = "100%";
         }
      }
   }
</script>