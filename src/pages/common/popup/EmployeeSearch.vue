<template>
   <b-modal v-bind:id="emplPopId" title="사원 검색" static hide-backdrop size="lg" v-bind:footer-bg-variant="footerBg" v-on:shown="firstLoad">
      <!--v-on:shown="sheetCreate"-->
      <template #default>
         <div class="pop_container">
            <div class="lookup_box multi_line align_center">
               <table>
                  <!-- <caption class="sr_only"></caption>
                  <colgroup>
                     <col width="10%">
                     <col width="20%">
                     <col width="*">
                     <col width="10%">
                  </colgroup> -->
                  <tbody>
                     <tr>
                        <th>사원명</th>   
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="emploName" v-on:keyup="enterEvent"></td>        
                        <!-- <th>근무지명(현장명)</th>
                        <td>
                           <input type="text" class="form_control" placeholder="입력해주세요" readonly v-model="insertSiteName">
                        </td> -->
                        <template v-if="additionalSearchable">
                           <th>사원번호</th>
                           <td>
                              <input type="text" class="form_control" placeholder="입력해주세요" v-model="emploId" @keyup.enter="enterEvent" />
                           </td>
                        </template>
                        <td class="ar">
                           <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                        </td>
                     </tr>
                     <template v-if="additionalSearchable">
                        <tr>
                           <th>근무지명(현장명)</th>   
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="workLocNm" v-on:keyup="enterEvent"></td>        
                        </tr>
                     </template>
                  </tbody>
               </table>
            </div>
            <!-- ibsheet -->
            <div class="ib_wrap">
               <div :id="`employee_search_pop_sheet_${popIdx}`" class="ibsheet_table" style="max-height: 337px;"></div>
            </div>
            
            <PopAlert
               v-bind:msg="popMsg" v-bind:pop-id="popId"
               v-on:first-btn-fn="closePop"
             />
         </div>
      </template>
      <template #modal-footer="{ }">
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnEmployeeChoice">선택</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" v-on:click="hidePop">닫기</b-button>
      </template>
   </b-modal>
</template>

<script>
   import { EmployeeSearch } from '../data/PopupList'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'
   // import MsgBoxMixins from '@/pages/quality/concreteMngt/component/MsgBox.mixins'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';
   
   let empId = '';

   export default {
      name: 'EmployeeSearch',
      mixins: [MsgBoxMixins],
      components: {
         PopAlert
      },
      data() {
         return {
            footerBg: 'transparent',
            
            focusHideUserId:'', //선택한 암호화된 사원 id
            focusUserId:'', //선택한 사원 id
            focusUserNm: '', //선택한 사원 name
            focusJobTitle: '', //선택한 직급
            focusWorkLocNm: '', //선택한 현장 name
            focusWorkLocCd: '', //선택한 현장 id
            focusJobRoleNm: '',

            /** */
            focusEmail: '',
            focusHp: '',   /* 연락처 */

            empSheet: null, /* 임시 sheet */
            
            employeeList : [], //ibsheet에 나올 data list
            
            //검색어
            emploName:'', //사원 명
            emploId:'',    //사원번호
            workLocNm: '',
            // insertSiteName:'', //현장 명
            // regUserNotChk : '',  // 등록사용자 제외
            //alert pop
            popMsg: '', 
            popId: 'employeeAlert'
         }
      },
      props:{
         userNm: {
            type: String,
            default: ''
         },
         userId: {
            type: String,
            default: ''
         },
         insertSiteName: {
            type: String,
            default: ''
         },
         siteCode: {
            type: String,
            default: ''
         },
         siteMstrId:{
            type:String,
            default: ''
         },
         emplPopId: {
            type: String,
            default: 'EmployeeSearch'
         },
         choosePerson: {
            type: String,
            default: '',
         },
         regUserNotChk: {
            type: String,
            default: '',
         },
         popIdx:{
            type:String,
            default:'0',
         },

         /** workLocNm 검색창 여부 */
         additionalSearchable: {
            type: Boolean,
            default: false,
         },

         /**   show일때 검색 실시   */
         allSiteEnable:{
            type: Boolean,
            default: false,
         }
      },
      beforeDestroy() {
         // loader.removeSheet(empId)
         // if (this.empSheet) loader.removeSheet(this.empSheet)
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
         firstLoad: function(){
            this.emploName = '';
            this.emploId = '';
            this.workLocNm = '';
            if(!this.allSiteEnable){
               this.sheetCreate();
            }
            else{
               //검색 안함
               let scroll = 1;
               let options = EmployeeSearch.options;
               let data = [];

               let cols = [
                  { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
                  { Name: 'userId', Header: [{ Value: '사원번호' }], RelWidth: 20, CustomFormat: (v) => { return '****' + (v.length > 3 ? v.substr(v.length-3) : v) } },
                  { Name: 'userNm', Header: [{ Value: '사원명' }], RelWidth: 10 },
                  { Name: 'jobTitle', Header: [{ Value: '직급' }], RelWidth: 30 },
                  { Name: 'workLocNm', Header: [{ Value: '근무지명(현장명)' }], RelWidth: 30 },
                  { Name: 'workLocCd', Visible: 0 },
                  { Name: 'jobRoleNm', Visible: 0 },
                  { Name: 'email', Visible: 0 },
                  { Name: 'hp', Visible: 0 },
               ]
               options.Cols = cols;

               loader.createSheet({
                  el:  `employee_search_pop_sheet_${this.popIdx}`,
                  data: data,
                  options: {
                     Cfg : {
                        NoVScroll : scroll,
                        CanEdit : 0,
                        NoDataMessage:3,
                        // DataMerge : dataMerge
                     },
                     Cols : cols,
                     Events : {
                        onClick: this.fnClick,
                        onDblClick : this.fnDblClick

                     }
                  },
               }).then((sheet) => {
                  empId = sheet.id
                  // this.empSheet = sheet
               });
               this.heightChange(scroll);
            }
         },
         sheetCreate: async function() {//검색 버튼 누를 경우 ibsheet-data settings
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
            if(this.regUserNotChk != '') {
               param['regUserNotChk'] = this.regUserNotChk;
            }

            if(this.siteMstrId != ''){
               param['siteMstrId'] = this.siteMstrId;
            }
            if (this.additionalSearchable && this.workLocNm !== '') {
               param['workLocNm'] = this.workLocNm
            }
            if(this.emploId !== ''){
               param['userId'] = this.emploId;
            }
            
            // console.log(param);

            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               return e.response.data;
            });

            let scroll = 1;
            let options = EmployeeSearch.options;
            let data = this.employeeList;

            let cols = [
               { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
               // { Name: 'hideUserId', Header: [{ Value: '사원번호' }], RelWidth: 20 },
               { Name: 'userId', Header: [{ Value: '사원번호' }], RelWidth: 20, CustomFormat: (v) => { return '****' + (v.length > 3 ? v.substr(v.length-3) : v) } },
               { Name: 'userNm', Header: [{ Value: '사원명' }], RelWidth: 10 },
               { Name: 'jobTitle', Header: [{ Value: '직급' }], RelWidth: 30 },
               { Name: 'workLocNm', Header: [{ Value: '근무지명(현장명)' }], RelWidth: 30 },

               { Name: 'workLocCd', Visible: 0 },
               { Name: 'jobRoleNm', Visible: 0 },
               
               { Name: 'email', Visible: 0 },
               { Name: 'hp', Visible: 0 },
            ]
            options.Cols = cols;
            // let dataMerge = 0;
            

            if(resData.rCode == "0000" && resData.datas.resultList.length != 0) {
               this.employeeList = resData.datas.resultList;

               data = this.employeeList;
               // dataMerge = 0; //병합 X
               if(data.length<10){
                  scroll = 1;
                  // document.getElementById('multiEmpTable2').parentElement.style.height = "";
               }else{
                  scroll = 0;
                  // document.getElementById('multiEmpTable2').parentElement.style.height = "337px";
               }
               
               //맨 윗줄 값 가져오기
               this.focusUserNm = data[0].userNm;
               this.focusUserId = data[0].userId;
               this.focusJobTitle = data[0].jobTitle;
               this.focusWorkLocNm  = data[0].workLocNm;
               this.focusWorkLocCd = data[0].workLocCd;
               this.focusEmail = data[0].email
               this.focusJobRoleNm = data[0].jobRoleNm
               this.focusHp = data[0].hp
            }else {
               // dataMerge = 2; //행 기준 병합
               data = [];
               scroll = 1;

               //가지고있는 값 제거
               this.focusUserNm = '';
               this.focusUserId = '';
               this.focusJobTitle = '';
               this.focusWorkLocNm  = '';
               this.focusWorkLocCd = '';
               this.focusEmail = '';
               this.focusJobRoleNm = '';
               this.focusHp = '';
            }

            loader.createSheet({
               el:  `employee_search_pop_sheet_${this.popIdx}`,
               data: data,
               options: {
                  Cfg : {
                     NoVScroll : scroll,
                     CanEdit : 0,
                     NoDataMessage:3,
                     // DataMerge : dataMerge
                  },
                  Cols : cols,
                  Events : {
                     onClick: this.fnClick,
                     onDblClick : this.fnDblClick

                  }
               },
            }).then((sheet) => {
               empId = sheet.id
               // this.empSheet = sheet
            });
            this.heightChange(scroll);
         },
         fnDblClick : function(evt){
            if(evt.row.Kind != 'Data'){
               return;
            }
            this.fnEmployeeChoice();
         },
         fnEmployeeChoice: function(){//선택 버튼 누를때 event
            if(this.focusUserId == '' || typeof(this.focusUserId) == "undefined" || this.focusUserId == "조회된 데이터가 없습니다") {
               // this.popMsg = '선택된 사용자가 없습니다';
               // this.$root.$emit('bv::show::modal', 'employeeAlert');
               this.alert('선택된 사용자가 없습니다');
               return;
            }
            let infoEmployee = {
               userNm : this.focusUserNm,
               userId : this.focusUserId,
               jobTitle : this.focusJobTitle,
               workLocNm : this.focusWorkLocNm,
               workLocCd : this.focusWorkLocCd.replace(/ /g, ''),
               email: this.focusEmail,
               jobRoleNm: this.focusJobRoleNm,
               choosePerson : this.choosePerson,
               hp : this.focusHp,
            }
            this.$emit('fn-employee-choice', infoEmployee);
            this.focusUserId = '';
            this.focusUserNm = '';
            this.focusJobTitle = '';
            this.focusWorkLocNm = '';
            this.focusWorkLocCd = '';
            this.focusHideUserId = '';
            this.focusEmail = '';
            this.focusJobRoleNm = '';
            this.focusHp = '';
            this.emploName = '';
            this.$root.$emit('bv::hide::modal', this.emplPopId);
         },
         fnClick: function(evtParams){//셀 클릭할때마다
            if(evtParams.row.Kind != 'Data'){
               return;
            }
             this.focusUserId = evtParams.row.userId;
             this.focusUserNm = evtParams.row.userNm;
             this.focusJobTitle = evtParams.row.jobTitle;
             this.focusWorkLocNm = evtParams.row.workLocNm;
             this.focusWorkLocCd = evtParams.row.workLocCd;
             this.focusEmail = evtParams.row.email
             this.focusJobRoleNm = evtParams.row.jobRoleNm
             this.focusJobRoleNm = evtParams.row.jobRoleNm
             this.focusHp    = evtParams.row.hp
         },
         closePop: function() {
              this.$root.$emit('bv::hide::modal', 'employeeAlert');
         },
         heightChange:function(scroll){
            let div = document.getElementById(`employee_search_pop_sheet_${this.popIdx}`);
            // console.log(div);
            if(scroll == 0){
               div.parentElement.style.height = "337px";
            }else{
               div.parentElement.style.height = "";
            }
            div.style.height = "100%";
         },
         hidePop: function(){
            this.emploName = '';
            this.$root.$emit('bv::hide::modal', this.emplPopId);
         },
      }
   }
</script>