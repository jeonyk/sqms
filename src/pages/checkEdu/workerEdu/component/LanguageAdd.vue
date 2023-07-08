<template>
   <b-modal v-bind:id="emplPopId" title="언어 추가" hide-backdrop size="lg" v-bind:footer-bg-variant="footerBg" v-on:shown="firstLoad">
      <!--v-on:shown="sheetCreate"-->
      <template #default>
         <div class="pop_container">
            <div class="lookup_box multi_line align_center">
               <table>
                  <tbody>
                     <tr>
                        <th>사원명</th>   
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="emploName" v-on:keyup="enterEvent"></td>        
                        <th>근무지명(현장명)</th>
                        <td>
                           <input type="text" class="form_control" placeholder="입력해주세요" readonly v-model="insertSiteName">
                        </td>
                        <td class="ar">
                           <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <!-- ibsheet -->
            <div class="ib_wrap">
               <div id="sheetTable2" class="ibsheet_table" style="max-height: 337px;"></div>
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

   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';
   
   let empId = '';

   export default {
      name: 'EmployeeSearch',
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
            
            employeeList : [], //ibsheet에 나올 data list
            
            //검색어
            emploName:'', //사원 명
            // insertSiteName:'', //현장 명

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
         emplPopId: {
            type: String,
            default: 'EmployeeSearch'
         },
         choosePerson: {
            type: String,
            default: '',
         }
      },
      beforeDestroy() {
         loader.removeSheet(empId)
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
            this.sheetCreate();
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
               { Name: 'hideUserId', Header: [{ Value: '사원번호' }], RelWidth: 20 },
               { Name: 'userNm', Header: [{ Value: '사원명' }], RelWidth: 10 },
               { Name: 'jobTitle', Header: [{ Value: '직급' }], RelWidth: 30 },
               { Name: 'workLocNm', Header: [{ Value: '근무지명(현장명)' }], RelWidth: 30 },
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
            }

            loader.createSheet({
               el: 'sheetTable2',
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
                     ondblclick : this.fnEmployeeChoice
                  }
               },
            }).then((sheet) => {
               empId = sheet.id
            });
            this.heightChange(scroll,'sheetTable2');
         },
         fnEmployeeChoice: function(){//선택 버튼 누를때 event
            if(this.focusUserId == '' || typeof(this.focusUserId) == "undefined" || this.focusUserId == "조회된 데이터가 없습니다") {
               this.popMsg = '선택된 사용자가 없습니다';
               this.$root.$emit('bv::show::modal', 'employeeAlert');
               return;
            }
            let infoEmployee = {
               userNm : this.focusUserNm,
               userId : this.focusUserId,
               jobTitle : this.focusJobTitle,
               workLocNm : this.focusWorkLocNm,
               workLocCd : this.focusWorkLocCd.replace(/ /g, ''),
               choosePerson : this.choosePerson,
            }
            this.$emit('fn-employee-choice', infoEmployee);
            this.focusUserId = '';
            this.focusUserNm = '';
            this.focusJobTitle = '';
            this.focusWorkLocNm = '';
            this.focusWorkLocCd = '';
            this.focusHideUserId = '';
            this.emploName='';
            this.$root.$emit('bv::hide::modal', this.emplPopId);
         },
         fnClick: function(evtParams){//셀 클릭할때마다
             this.focusUserId = evtParams.row.userId;
             this.focusUserNm = evtParams.row.userNm;
             this.focusJobTitle = evtParams.row.jobTitle;
             this.focusWorkLocNm = evtParams.row.workLocNm;
             this.focusWorkLocCd = evtParams.row.workLocCd;
         },
         closePop: function() {
              this.$root.$emit('bv::hide::modal', 'employeeAlert');
         },
         heightChange:function(scroll,div){
            if(scroll == 0){
               document.getElementById(div).parentElement.style.height = "337px";
            }else{
               document.getElementById(div).parentElement.style.height = "";
            }
            document.getElementById(div).style.height = "100%";
         },
         hidePop: function(){
            this.emploName = '';
            this.$root.$emit('bv::hide::modal', this.emplPopId);
         },
      }
   }
</script>