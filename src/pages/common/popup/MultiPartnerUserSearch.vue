<template>
    <b-modal :id="refId" title="협력사 직원 검색" static hide-backdrop size="lg" v-bind:footer-bg-variant="footerBg" v-on:shown="searchReset">
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
               <div class="table_data mt20">
                  <span class="color_warning fwb">※ 여러명 등록 가능</span>
                  <div class="move_box w100">
                     <div class="ib_wrap" style="height: 337px">
                        <div :id="`multiPartTable2_${popIdx}`" class="ibsheet_table" style="height: 100%"></div>
                     </div>
                  </div>
                  <div class="move_box w100 mt20">
                     <div class="user_table" style="height: 241px;">
                        <div class="label_item radius">
                           <ul>
                              <li class="blue" v-for="(name,index) in userNames" :key="index+'i'">
                                 <strong>{{name}}</strong>
                                 <span class="delete" v-on:click="deleteId(index)">삭제</span>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>

                <PopAlert
                    v-bind:msg="popMsg" v-bind:pop-id="popId"
                    v-on:first-btn-fn="closePop"
                />
            </div>

        </template>
        <template #modal-footer="{ }">
            <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnPartnerChoice">{{btnNm}}</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" v-on:click="closePop">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
   import { PartnersSearch } from '../data/PopupList'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'

   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   
   import _ from 'lodash'

   export default {
      name: 'MultiPartnerUserSearch',
      components: {
          PopAlert
      },
      mixins: [MsgBoxMixins],
      data() {
         return {
            sheet: null,
            footerBg: 'transparent',
            
            // focusUserNm: '', //선택한 사원명 
            // focusUserId: '', //선택한 사원id
            // focusJobRoleNm: '', //선택한 직책명
            // focusTradeId: '', //선택한 협력사 id
            // focusTradeNm: '', //선택한 협력사명
            
            partnerList : [],
            userIds:[],//멀티 사원 Id
            userNames: [],//멀티 사원명
            // listId:[],
            // listNm:[],
            
            //검색어
            emploName:'', //협력사 직원 명
            companyName:'', // 협력사 명

            //alert pop
            popMsg: '',
            popId: 'multiPartnersAlert'
         }
      },
      props: {
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
         memberListId: { //이전데이터(Id)
            type: Array,
            default: () => []
         },
         memberListNm: { //이전데이터(Nm)
            type: Array,
            default: () => []
         },
         siteMstrId:{
            type:String,
            default: '',
         },
         refId:{
            type:String,
            default:'MultiPartnerUserSearch',
         },
         popIdx:{
            type:String,
            default: '0',
         },
         maxlength:{      // 최대 선택 가능 인원수
            type:Number,
            default: 20,
         },
         headerCheck:{    // 전체선택 가능 여부 0 : false / 1 : ture
            type:Number,
            default: 0,
         },
         sqmsPartner:{    // SQMS 협력사 테이블 조회 여부
            type:Boolean,
            default: false,
         },
         emitCloseYn:{    // emit 후 모달창 close 여부 
            type:Boolean,
            default: true,
         },
         btnNm:{          // 선택 버튼명
            type:String,
            default: '선택',
         }
      },
      beforeDestroy() {
         // loader.removeSheet(multiPartId)
      },
      
      mounted() {
      
      },

      created() {
      //   this.focusUserId = this.userId;
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
            this.userIds = _.cloneDeep(this.memberListId)
            this.userNames = []
            this.sheetCreate('first');
         },
         sheetCreate: async function(type) {
            /* 임시용 */
            requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
            
            let url = '';
            let param = {};

            if(this.emploName != '') {   
               param['userNm'] = this.emploName;
            }
            if(this.companyName != '') {
               param['tradeNm'] = this.companyName;
            }
            if(this.siteMstrId != '') {
               param['siteMstrId'] = this.siteMstrId;
            }
            
            if(this.sqmsPartner){
               url = '/sendApi/api/adminPtnr/tradeUser/list'
            }else{
               url = '/sendApi/api/popup/partnerUserSearch/list';
            }

            let resData = await sendPostApi(url, param).then((result) => {
                if(this.sqmsPartner){
                   return result.data.resultList;
                }else{
                   return result.data.datas.resultList;
                }
               }).catch((e) => {
                  return e.response.data;
               });
           
            
            let scroll = 1;
            let options = PartnersSearch.options;
            let data = [];

            let cols = [
               { Name: 'checkYn', Header: [{ Value: '', HeaderCheck: this.headerCheck, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
               { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10, CanEdit:0 },
               { Name: 'userNm', Header: [{ Value: '사용자명' }], RelWidth: 20, CanEdit:0 },
               { Name: 'jobRoleNm', Header: [{ Value: '직책명' }], RelWidth: 20, CanEdit:0 },
               { Name: 'tradeNm', Header: [{ Value: '협력사명' }], RelWidth: 50 , CanEdit:0},
            ]

            options.Cols = cols;

            if(resData.length != 0) {
               this.partnerList = resData

               data = this.partnerList;
               if(data.length<10){
                  scroll = 1;
               }else{
                  scroll = 0;
               }

               await this.userIds.forEach( async userId => {
                  await data.forEach( row => {
                     if(row.userId.toString() == userId){
                        if(type == 'first'){
                           this.userNames.push(row.userNm.toString())
                        }
                        row['checkYn'] = true;
                     }
                  })
               })
            }else {
               data = [];
               scroll = 1;
            }

            loader.createSheet({
               el: `multiPartTable2_${this.popIdx}`,
               data: data,
               options: {
                  Cfg : {
                     // DataMerge : dataMerge,
                     NoVScroll: scroll,
                     NoDataMessage:3,
                  },
                  Cols : cols,
                  Events : {
                     onClick: this.fnClick,
                     ondblclick : this.fnClick,
                  }
               },
            }).then((sheet) => {
               this.sheet = sheet
               sheet.blur(0);
            });
            this.heightChange(scroll);
         },
         fnPartnerChoice: function(){ //선택 버튼 누를때 event
            if(this.userIds== []|| this.userIds.length == 0|| typeof(this.userIds) == "undefined"){
               this.alert('협력사 직원을 선택해주세요')
               return;
            }else{
               let infoPartner = {
                  userIds: this.userIds,
                  userNames: this.userNames,
               }

               if(this.emitCloseYn){
                  this.$emit('fn-multi-partner-choice', infoPartner);
                  this.emploName = '';
                  this.companyName = '';
                  this.userIds = [];
                  this.userNames = [];
   
                  this.$root.$emit('bv::hide::modal', this.refId);
               }else{
                  this.$emit('fn-multi-partner-choice', infoPartner);
               }
            }
         },
         fnClick: function(evtParams){//셀 클릭할때마다
            let eventName = evtParams.eventName
            
            if(evtParams.row.Kind == 'Data'){
               if((eventName == 'onClick' && evtParams.col == 'checkYn')|| eventName=='onDblClick'){
                  
                  let check = false
                  if(evtParams.row.checkYn == null || evtParams.row.checkYn == 0){
                     check = true
                  }

                  let userId = evtParams.row.userId.toString()
                  let userNm = evtParams.row.userNm.toString()

                  let ids = this.userIds        
                  let names = this.userNames    
                  let userIdx = ids.indexOf(userId)

                  if(check){   // checked - true
                     if(ids.length > this.maxlength-1){   // 최대 인원수 제한
                        evtParams.row.checkYn = 1
                        this.alert('최대 '+(this.maxlength)+'명까지 선택할 수 있습니다.');
                        return;
                     }else{
                        if(userIdx < 0){   // 명단에 없는경우 추가
                           ids.push(userId);
                           names.push(userNm);
                           evtParams.row.checkYn = 0
                        }
                     }
                  }else if(!check){ // checked - false
                     if(userIdx > -1){ 
                        ids.splice(userIdx,1);
                        names.splice(userIdx,1);
                        evtParams.row.checkYn = 1
                     }
                  }
   
                  if(eventName == 'onDblClick'){   // 더블 클릭시 check 상태 변경
                     evtParams.row.checkYn = evtParams.row.checkYn == 0 ? 1 : 0
                  }
   
                  evtParams.sheet.refreshRow(evtParams.row)
               }
            }else if(this.headerCheck == 1 && evtParams.row.Kind == 'Header' && evtParams.col == 'checkYn'){
               if(!evtParams.row.checkYnChecked == 1){  // 전체 선택시
                  evtParams.sheet.getDataRows().map(item => {   // 전체 리스트 담기
                     return {
                         userId: item.userId,
                         userNm: item.userNm,
                     }
                  }).forEach(item => {
                     let index = this.userIds.indexOf(item.userId)
                     if(index < 0){
                        this.userIds.push(item.userId)
                        this.userNames.push(item.userNm)
                     }
                  })
               }else{
                  this.userIds = [];
                  this.userNames = [];
               }
               
            }
            
         },
         deleteId:function(index){

            this.sheet.getDataRows().forEach(item => {
               if(item.userId == this.userIds[index]){
                  item.checkYn = (item.checkYn == 1 ? 0 : 1)
                  this.sheet.Header.checkYnChecked = 0
                  this.sheet.refreshRow(item)
               }
            })
            this.userIds.splice(index,1);
            this.userNames.splice(index,1);
            this.sheet.refreshRow(this.sheet.Header);
         },
         closePop: function() {
            this.userIds = [];
            this.userNames = [];
            this.$root.$emit('bv::hide::modal', this.refId);
         },
         closePop2: function() {
            this.userIds = [];
            this.userNames = [];
            this.$root.$emit('bv::hide::modal', 'multiPartnersAlert');
         },
         heightChange:function(scroll){
            let div = document.getElementById(`multiPartTable2_${this.popIdx}`);
            if(scroll == 0){
               div.parentElement.style.height = "337px";
            }else{
               div.parentElement.style.height = "";
            }
            div.style.height = "100%";
         },
      }
   }
</script>