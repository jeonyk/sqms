<template>
   <b-modal :id="refId" title="사원 검색" static hide-backdrop size="lg" v-bind:footer-bg-variant="footerBg" v-on:shown="searchReset">
      <!--v-on:shown="sheetCreate"-->
      <template #default>
         <div class="pop_container">
            <div class="lookup_box multi_line align_center">
               <table>
                  <tbody>
                     <tr>
                        <th>사원명</th>   
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="emploName" v-on:keyup="enterEvent"></td>        
                        <template v-if="additionalSearchable">
                           <th>근무지명(현장명)</th>
                           <td>
                              <input type="text" class="form_control" placeholder="" v-model="siteName">
                           </td>
                        </template>
                        <td class="ar">
                           <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="table_data mt20">               
               <div class="move_box w100">
                  <span class="color_warning fwb">※ 여러명 등록 가능</span>
                  <!-- ibsheet -->
                  <div class="ib_wrap">
                     <div :id="`multiEmpTable2_${popIdx}`" class="ibsheet_table" style="max-height: 337px;"></div>
                  </div>
               </div>
               <div class="move_box w100 mt20">
                  <div class="user_table" style="height: 241px;">
                     <div class="label_item radius">
                        <ul>
                           <li class="blue" v-for="(orgName,mIndex) in listId" :key="mIndex">
                              <strong>{{listNm[mIndex]}}</strong>
                              <span class="delete" v-on:click="deleteOrgId(mIndex)">삭제</span>
                           </li>
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
               v-on:first-btn-fn="closePop2"
             />
         </div>
      </template>
      <template #modal-footer="{ }">
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnEmployeeChoice">{{btnNm}}</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" v-on:click="closePop">닫기</b-button>
      </template>
   </b-modal>
</template>

<script>
   import { MultiEmployeeSearch } from '../data/PopupList'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'

   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   let multiEmpId = '';
   import _ from 'lodash'

   export default {
      name: 'MultiEmployeeSearch',
      components: {
         PopAlert
      },
      mixins: [MsgBoxMixins],
      data() {
         return {
            sheet: null,
            footerBg: 'transparent',
            
            // focusHideUserId:'', //선택한 암호화된 사원 id
            // focusUserId:'', //선택한 사원 id
            // focusUserNm: '', //선택한 사원 name
            // focusJobTitle: '', //선택한 직급
            // focusWorkLocNm: '', //선택한 현장 name
            // focusWorkLocCd: '', //선택한 현장 id
            
            employeeList : [], //ibsheet에 나올 data list
            userIds:[],//멀티 사원
            userNames: [],
            listId:[],
            listNm:[],
            firstYn:false,

            //검색어
            emploName:'', //사원 명
            siteName:'',  //현장 명
            // insertSiteName:'', //현장 명

            //alert pop
            popMsg: '', 
            popId: 'MultiEmployeeAlert'
         }
      },
      props:{
         insertSiteName: { //현장명이 고정되어야 할 시 사용
            type: String,
            default: ''
         },
         siteCode: {
            type: String,
            default: ''
         },
         headerCheck:{    // 전체선택 가능 여부 0 : false / 1 : ture
            type:Number,
            default: 0,
         },
         memberListId: { //이전데이터(Id)
            type: Array,
            default: () => []
         },
         memberListNm: { //이전데이터(Nm)
            type: Array,
            default: () => []
         },
         siteMstrId: {
            type: String,
            default: ''
         },
         refId: {
            type:String,
            default: 'MultiEmployeeSearch'
         },
         popIdx:{
            type:String,
            default: '0',
         },
         emitCloseYn:{    // emit 후 모달창 close 여부 
            type:Boolean,
            default: true,
         },
         btnNm:{          // 선택 버튼명
            type:String,
            default: '선택',
         },
         pageNm:{          // 조회 url 구분값 (사용 페이지)
            type:String,
            default: 'default',
         },
         maxlength:{      // 최대 선택 가능 인원수
            type:Number,
            default: 20,
         },

         /** workLocNm 검색창 여부 */
         additionalSearchable: {
            type: Boolean,
            default: false,
         },
      },
      beforeDestroy() {
         // loader.removeSheet(multiEmpId)
      },

      mounted() {
         
      },

      created() {
         // this.focusUserId = this.userId;
      },

      methods: {
         enterEvent : function(e) { //검색조건 enter event
            if(e.keyCode == 13) {
               this.sheetCreate();
            }
         },
         searchReset: function(){
            this.emploName = '';
            this.userIds = _.cloneDeep(this.memberListId)
            this.userNames = []

            //props로 현장명을 보냈을 경우
            if(this.insertSiteName != '' && this.insertSiteName != null){
               this.siteName = this.insertSiteName;
            }
            this.sheetCreate('first');
         },
         sheetCreate: async function(type) {//검색 버튼 누를 경우 ibsheet-data settings
            /* 임시용 */
            requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
            //
            let url = '/sendApi/api/popup/employeeSearch/list';
            let param = {};

            if(this.emploName != '') {
               param['userNm'] = this.emploName;
            }
            if(this.siteCode!= '') {
               param['workLocCd'] = this.siteCode;
            }
            if(this.siteName != '' && this.siteName != this.insertSiteName){
               param['workLocNm'] = this.siteName;
            }
            if(this.siteMstrId!= '') {
               param['siteMstrId'] = this.siteMstrId;
            }

            if(this.pageNm == 'admin'){ // 사용자관리 페이지 url 
               url = '/sendApi/api/myWork/userMngt/prjctRegUserMapng/list'; 
            }

            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               return e.response.data;
            });

            let scroll = 1;
            let options = MultiEmployeeSearch.options;
            let data = [];

            let cols = [
               { Name: 'checkYn', Header: [{ Value: '',  HeaderCheck: this.headerCheck, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10,},
               { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10,CanEdit:0 },
               { Name: 'userId', Header: [{ Value: '사원번호' }], RelWidth: 20,CanEdit:0, CustomFormat: (v) => { return '****' + (v.length > 3 ? v.substr(v.length-3) : v) } },
               { Name: 'userNm', Header: [{ Value: '사원명' }], RelWidth: 10,CanEdit:0 },
               { Name: 'jobTitle', Header: [{ Value: '직급' }], RelWidth: 30,CanEdit:0 },
               { Name: 'workLocNm', Header: [{ Value: '근무지명(현장명)' }], RelWidth: 30,CanEdit:0 },
            ]
            options.Cols = cols;

            if(resData.rCode == "0000" && resData.datas.resultList.length != 0) {
               
               this.employeeList = resData.datas.resultList;

               data = this.employeeList;
               if(data.length<10){
                  scroll = 1;
               }else{
                  scroll = 0;
               }

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
               el: `multiEmpTable2_${this.popIdx}`,
               data: data,
               options: {
                  Cfg : {
                     NoVScroll: scroll,
                     NoDataMessage:3,
                  },
                  Cols : cols,
                  Events : {
                     onclick : this.fnClick,
                     ondblclick : this.fnClick,
                  }
               },
            }).then((sheet) => {
               this.sheet = sheet
               multiEmpId = sheet.id
               sheet.blur(0);
            });
            this.firstYn = false;
            this.heightChange(scroll);
         },
         fnEmployeeChoice: function(){ // 선택 버튼 누를때 event
            if(this.userIds == [] || typeof(this.userIds) == "undefined" || this.userIds.length == 0){
               this.popMsg = '선택된 사용자가 없습니다';
               this.$root.$emit('bv::show::modal', 'MultiEmployeeAlert');
               return;
            }
            //기존데이터와 합치기
            let infoEmployee = {
               userIds: this.userIds,
               userNames: this.userNames,
            }

            this.$emit('fn-multi-employee-choice', infoEmployee);

            if(this.emitCloseYn){
               this.emploName='';
               this.userIds = [];
               this.userNames = [];
               this.$root.$emit('bv::hide::modal', this.refId);
            }
         },
        
         fnClick: function(evtParams){ // 셀 클릭할때마다
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
            }
            else if(this.headerCheck == 1 && evtParams.row.Kind == 'Header' && evtParams.col == 'checkYn'){
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
         closePop:function(){
            this.userIds = [];
            this.userNames = [];
            this.$root.$emit('bv::hide::modal', this.refId);
         },
         closePop2: function() {
            this.userIds = [];
            this.userNames = [];
            this.$root.$emit('bv::hide::modal', 'MultiEmployeeAlert');
         },
         heightChange:function(scroll){
            let div = document.getElementById(`multiEmpTable2_${this.popIdx}`);
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