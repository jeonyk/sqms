<template>
   <b-modal 
      id="AdmPartnerUserSearch" 
      title="협력사 직원 검색" 
      hide-backdrop 
      size="xxl" 
      :footer-bg-variant="footerBg" 
      @shown="sheetCreate()"
   >
      <template #default>
         <div class="pop_container">
            <div class="lookup_box multi_line align_center">
               <table> 
                  <colgroup>
                     <col width="6%">
                     <col width="24%">
                     <col width="6%">
                     <col width="24%">
                     <col width="5%">
                     <col width="24%">
                     <col width="*">
                  </colgroup>
                  <tbody>
                        <tr>
                           <th>협력사 유형</th>
                           <td>
                              <select class="form_control" v-model="tradeType">
                                 <option value="">전체</option>
                                 <option v-for="(item,index) in tradeTypeList" :key="index" :value="item.codeVal">{{ item.codeName }}</option>
                              </select>
                           </td>
                           <th>협력사명</th>
                           <td>
                              <input 
                                 v-model="tradeNm" 
                                 type="text" 
                                 class="form_control" 
                                 placeholder="입력해주세요" 
                                 @keyup.enter="fn_search"
                              >
                           </td>
                           <th>사용자명</th>   
                           <td>
                              <input 
                                 v-model="emploName" 
                                 type="text" 
                                 class="form_control" 
                                 placeholder="입력해주세요" 
                                 :disabled="useNewable" 
                                 @keyup.enter="fn_search"
                              >
                           </td>        
                           <td class="ar">
                              <button type="button" class="btn_reset" @click="fn_reset">초기화</button>
                              <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="fn_search">검색</button>
                           </td>
                        </tr>
                        <tr>
                           <th>프로젝트명</th>
                           <td>
                              <input
                                 v-model="projectNm"
                                 type="text"
                                 class="form_control"
                                 placeholder="입력해주세요"
                                 @keyup.enter="fn_search"
                              />
                           </td>
                           <th>프로젝트코드</th>
                           <td>
                              <input
                                 v-model="projectId"
                                 type="text"
                                 class="form_control"
                                 placeholder="입력해주세요"
                                 @keyup.enter="fn_search"
                              />
                           </td>
                        </tr>
                  </tbody>
               </table> 
            </div>
               
            <div class="ib_wrap">
               <div id="AdmPartnerUserPopsheetTable" class="ibsheet_table" style="height: 100%; "></div>
            </div>

            <div class="button_box">
               <label for="newMaterial" class="input_check">
                  <input id="newMaterial" type="checkbox" v-model="useNewable" @change="fn_search('new')">
                  <span class="label_text">신규 사용자로 등록</span>
               </label>
            </div>

            <div class="table_normal_list align_center">
               <table>
                  <caption class="sr_only"></caption>
                  <colgroup>
                     <col width="33%"> 
                     <col width="33%"> 
                     <col width="34%"> 
                  </colgroup>
                  <thead>
                     <tr>
                        <th>협력사 유형</th>
                        <th>협력사명</th>
                        <th><span :class="{ 'emp_red' : useNewable }" >사용자명</span></th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>{{ partnerUser.tradeTypeNm }}</td>
                        <td>{{ partnerUser.tradeNm }}</td>
                        <td v-if="!useNewable">{{ partnerUser.userNm }}</td>
                        <td v-else><input type="text" v-model="partnerUser.userNm" @keyup.enter="fnPartnerChoice('choice')"></td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

      </template>
      <template #modal-footer="{ hide }">
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnPartnerChoice('choice')">입력</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" v-on:click="hide('forget')">취소</b-button>
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
   import { commonFn } from '@/script/commonFn.js';

   export default {
      name: 'AdmPartnerUserSearch',
      mixins: [MsgBoxMixins],
      components: {
         PopAlert
      },
      data() {
         return {
            footerBg: 'transparent',
            partnerSheet : null,
            
            partnerUser : {    // 협력사 직원 param
               userNm: '',       // 사원명 
               userId: '',       // 사원id
               jobRoleNm: '',    // 직책명
               tradeId: '',      // 협력사 id
               tradeNm: '',      // 협력사명
               tradeTypeNm: '',  // 협력사 유형명
               tradeType: '',    // 협력사 유형
               jobTitle: '',     // 호칭
               hp: '',           // 핸드폰
               email: '',        // 이메일
               userTitle: '',    // 호칭
               siteMstrId: '',   // 현장 id
            },
            
            //검색어
            tradeType:'', // 협력사 유형
            emploName:'', // 협력사 직원 명
            tradeNm:'',   // 협력사 명
            projectNm: '', // 프로젝트 명
            projectId: '', // 프로젝트 아이디

            useNewable:false,   // 신규 등록 여부
            personNm:'',
            tradeTypeViewNm: '',
            tradeTypeList:[],   // 협력사 유형 
         }
      },
      props: {
         tradeObj: {
            type:Object,
            default: function () {
               return {}
            },
         },
         refId:{
            type:String,
            default:'AdmPartnerUserSearch',
         },
         deleteIds: { //받아올 사원리스트가 있는경우 중복을 방지하기 위한 변수
            type: Array,
            default: () => {
               return []
            }
         }
      },
      beforeDestroy() {
         // loader.removeSheet(sheetId)
      },
      
      mounted() {
         
      },

      created() {
        this.focusUserId = this.userId;
        this.getTradeType();
      },

      methods: {
         searchReset: function(){
            this.emploName = '';
            this.getTradeType();
            this.sheetCreate();
         },
         sheetCreate: async function() {

            this.partnerUser = {
               userNm: '',       // 사원명 
               userId: '',       // 사원id
               jobRoleNm: '',    // 직책명
               tradeId: '',      // 협력사 id
               tradeNm: '',      // 협력사명
               tradeTypeNm: '',  // 협력사 유형명
               tradeType: '',    // 협력사 유형
               jobTitle: '',     // 호칭
               hp: '',           // 핸드폰
               email: '',        // 이메일
               userTitle: '',    // 호칭
               siteMstrId: '',   // 현장 id
            }

            this.tradeType = ''
            this.tradeNm = ''
            this.emploName = ''

            this.useNewable = false // 신규 등록 여부


            // modal open 시 데이터 조회여부
            // this.fn_partnersList((rst) => {
               this.fn_changeHeight('AdmPartnerUserPopsheetTable')

               let options = PartnersSearch.options;
               // let data = rst;
               let data = [];
               let scroll = 1;

               let cols = [
                  { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
                  { Name: 'userNm', Header: [{ Value: '사용자명' }], RelWidth: 20 },
                  { Name: 'tradeTypeNm', Header: [{ Value: '협력사 유형' }], RelWidth: 20 },
                  { Name: 'jobRoleNm', Header: [{ Value: '직책명' }], RelWidth: 20 },
                  { Name: 'tradeId', Header: [{ Value: '사업자 번호' }],CustomFormat : '###-##-#####' , RelWidth: 20 },
                  { Name: 'tradeNm', Header: [{ Value: '협력사명' }], RelWidth: 50 },
                  { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], RelWidth: 50 },
                  { Name: 'projectId', Header: [{ Value: '프로젝트코드' }], RelWidth: 50 },
               ] 

               options.Cols = cols;
               let canEdit = 0; //ibsheet 수정불가
               let dataMerge = 0;

               if(data.length != 0) {
                  if(data.length<10){
                     scroll = 1;
                  }else{
                     scroll = 0;
                  }
                  dataMerge = 0; //병합 X
               }else {
                  dataMerge = 2; //행 기준 병합
                  data = [];
                  scroll = 1;
               }

               loader.createSheet({
                  el: 'AdmPartnerUserPopsheetTable',
                  data: data,
                  options: {
                     Cfg : {
                        CanEdit : canEdit,
                        DataMerge : dataMerge,
                        NoVScroll : 0,
                        NoDataMessage:3,
                     },
                     Cols : cols,
                     Events : {
                        onClick: this.fnClick,
                        ondblclick : this.fnPartnerChoice
                     }
                  },
               }).then((sheet) => {
                  this.partnerSheet = sheet
                  this.partnerSheet.hideCol( "tradeTypeNm" )
                  this.partnerSheet.hideCol( "tradeId" )
               });

               // this.heightChange(scroll,'AdmPartnerUserPopsheetTable');
               // this.fn_changeHeight('AdmPartnerUserPopsheetTable')
            // })
         },

         fn_changeHeight: function (divId) {
            document.getElementById(divId).parentElement.style.height = '337px'
            // document.getElementById(divId).parentElement.style.height = this.useNewable ? '337px' : '113px'
         },

         heightChange:function(scroll,div){
            if(scroll == 0){
               document.getElementById(div).parentElement.style.height = "337px";
            }else{
               document.getElementById(div).parentElement.style.height = "113px";
            }
            document.getElementById(div).style.height = "100%";
         },

         async fn_partnersList(callback){
            let url = '';  
            let param = {};
            
            if(!this.useNewable){
               url = '/sendApi/api/popup/partnerUserSearch/list'; 
               param = {
                 tradeType : this.tradeType, // 협력사 유형
                 userNm : this.emploName,    // 사용자명
                 tradeNm : this.tradeNm,     // 협력사명
                 projectId: this.projectId,
                 projectNm: this.projectNm,
                 searchType : 'SQMS',     // SQMS 등록자 중복 제거
               };

               await sendPostApi(url, param).then((result) => {
                  if(typeof result.data.datas.resultList != 'undefined'){
                     this.partnerUser = {
                        ...result.data.datas.resultList[0]
                     }
                     return callback(result.data.datas.resultList)
                  }
               }).catch((e) => {
                  return callback([])
               });
            }else{
               url = '/sendApi/api/popup/partnerCompanySearch/list'
               param = {        
                  tradeType : this.tradeType,   // 유형
                  searchValue : this.tradeNm,   // 협력사명
                  projectId: this.projectId,    // 프로젝트아이디
                  projectNm: this.projectNm,    // 프로젝트명
               }

               await sendPostApi(url, param).then((result) => {
                  if(typeof result.data.datas.resultList != 'undefined'){
                     this.partnerUser = {
                        ...result.data.datas.resultList[0]
                     }
                     return callback(result.data.datas.resultList)
                  }else{
                     return callback([])
                  }
               })
            }
         },

         fn_reset() {
            this.partnerUser = {
               userNm: '',       // 사원명 
               userId: '',       // 사원id
               jobRoleNm: '',    // 직책명
               tradeId: '',      // 협력사 id
               tradeNm: '',      // 협력사명
               tradeTypeNm: '',  // 협력사 유형명
               tradeType: '',    // 협력사 유형
               jobTitle: '',     // 호칭
               hp: '',           // 핸드폰
               email: '',        // 이메일
               userTitle: '',    // 호칭
               siteMstrId : '',  // 현장 id
            }

            this.tradeType    = ''
            this.tradeNm      = ''
            this.emploName    = ''

         },

         fn_search(type){
            // 값 초기화
            this.partnerUser = {
               userNm: '',       // 사원명 
               userId: '',       // 사원id
               jobRoleNm: '',    // 직책명
               tradeId: '',      // 협력사 id
               tradeNm: '',      // 협력사명
               tradeTypeNm: '',  // 협력사 유형명
               tradeType: '',    // 협력사 유형
               jobTitle: '',     // 호칭
               hp: '',           // 핸드폰
               email: '',        // 이메일
               userTitle: '',    // 호칭
               siteMstrId : '',  // 현장 id
            }

            if(type == 'new'){
               this.tradeType = ''
               this.emploName = ''
               this.tradeNm = ''
               this.projectNm = ''
               this.projectId = ''

               this.partnerSheet.loadSearchData({
                  data : [],  // partnerSheet 데이터 세팅
               })

               return
            }

            if(!this.useNewable){
               this.partnerSheet.hideCol( "tradeTypeNm" )
               this.partnerSheet.hideCol( "tradeId" )
               this.partnerSheet.showCol( "userNm" )
               this.partnerSheet.showCol( "jobRoleNm" )
            }else{
               this.partnerSheet.showCol( "tradeTypeNm" )
               this.partnerSheet.showCol( "tradeId" )
               this.partnerSheet.hideCol( "userNm" )
               this.partnerSheet.hideCol( "jobRoleNm" )
            }

            this.fn_partnersList((rst)=>{
               this.fn_changeHeight('AdmPartnerUserPopsheetTable')
               this.partnerSheet.loadSearchData({
                  data : rst,  // partnerSheet 데이터 세팅
               })
            })
         },

         fnPartnerChoice: function(evt){ // 선택 버튼 누를때 event 
            if(evt == 'choice' || evt.kind == 'Data'){
               if(commonFn.methods.isEmpty(this.partnerUser.tradeId)){  // 협력사 ID
                  return this.alert('협력사 직원을 선택해주세요.');
               }  
               
               if(commonFn.methods.isEmpty(this.partnerUser.tradeNm)){  // 협력사명
                  return this.alert('협력사 직원을 선택해주세요.');
               }  
               
               if(commonFn.methods.isEmpty(this.partnerUser.tradeTypeNm)){  // 협력사 유형명
                  return this.alert('협력사 직원을 선택해주세요.');
               }  
               
               if(commonFn.methods.isEmpty(this.partnerUser.tradeType)){  // 협력사 유형
                  return this.alert('협력사 직원을 선택해주세요.');
               }  
   
               if(!this.useNewable){   // 신규 등록이 아닐 경우
                  if(commonFn.methods.isEmpty(this.partnerUser.userId)){  // 사원 ID
                     return this.alert('협력사 직원을 선택해주세요.');
                  }  
               
                  if(commonFn.methods.isEmpty(this.partnerUser.userNm)){  // 사원명
                     return this.alert('협력사 직원을 선택해주세요.');
                  } 
               }else{                 // 신규 등록
                  if(commonFn.methods.isEmpty(this.partnerUser.userNm)){  // 사원명
                     return this.alert('사용자명을 입력해주세요.');
                  } 
               } 


               this.$emit('fnPartnerChoice', {...this.partnerUser, useNewable : this.useNewable});
            }
         },

         fnClick: function(evtParams){ //셀 클릭할때마다
            if(evtParams.kind == 'Data'){
               this.partnerUser = {
                  ...evtParams.row
               }
            }
         },
         closePop: function() {
            this.$root.$emit('bv::hide::modal', 'AdmPartnerUserSearch');
         },

         getTradeType: async function(){
            let url = '/sendApi/api/common/masterCode/list';
            let payload = {
               groupCode: 'PATN_COMP_TYPE' 
            };

            try {
               const response = await sendPostApi(url, payload);
               if (response.status === 200 && response.data) {
                  this.tradeTypeList = [];
                  let list = response.data.data;
                  for(let i =0; i<list.length;i++){
                        //kor일경우(한국어)
                        if(this.tradeObj.tradeType == list[i].codeVal){
                           this.tradeTypeViewNm = list[i].codeNameKr;
                        }
                        this.tradeTypeList.push(
                           {
                              'codeVal':list[i].codeVal,
                              'codeName':list[i].codeNameKr
                           }
                        );
                  }
               }
            } catch (error) {
               // console.error(error);
               this.alert('조회에 실패했습니다.');
               return;
            }
         },
      }
   }
</script>