<template>
   <b-modal v-bind:id="`projectSelectId`" title="프로젝트 선택" static
      modal-class="single_page" size="xl" v-on:shown="popupOpenCheck"
      v-bind:footer-bg-variant="footerBg">
   
      <template #default>
         <div class="pop_container">
            <div class="tab_contents">
               <div class="lookup_box multi_line">
                  <table>
                     <colgroup>
                        <col width="6%">
                        <col width="15%">
                        <col width="6%">
                        <col width="15%">
                        <col width="6%">
                        <col width="15%">
                        <col width="6%">
                        <col width="15%">
                        <col width="*">
                     </colgroup>
                     <tbody>
                        <tr>
                           <th>프로젝트명</th>
                           <td>
                              <input type="text" class="form_control" placeholder="입력해주세요" v-model="projName" v-on:keyup="enterEvent">    
                           </td>              
                           <th>프로젝트코드</th>
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="projCode" v-on:keyup="enterEvent"></td>                                
                           
                           <th>현장명</th>
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteNm" v-on:keyup="enterEvent"></td>                 
                           <th>현장코드</th>
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteCode" v-on:keyup="enterEvent"></td>                  

                           <td class="ar">
                              <button type="button" class="btn_reset" v-on:click="searchReset">초기화</button>
                              <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            
               <!-- ibsheet -->
               <div class="inner">
                  <!-- ibsheet -->
                  <div class="ib_wrap">
                     <div id="sheetTable_projectSelectPopUp" class="ibsheet_table"></div>
                  </div>
               </div>
            </div>
         </div>

         <PopAlert
            v-bind:msg="popMsg" v-bind:confirm-use="confirm_use" v-bind:btn-name="{first : '확인'}" v-bind:pop-id="pop_id"
            v-on:first-btn-fn="closePop"
         />
      </template>
      <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide }" -->
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnChoice">선택</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
      </template>
   </b-modal>
</template>

<script>
   /**
    * 미등록된 프로젝트 선택용 팝업(현장정보용)
    */

   import PopAlert from '@/pages/common/popup/PopAlert.vue' 

   import { ProjectSelect } from '../data/PopupList'
   // import DatepickerRange from './DatepickerRange.vue'
   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';
   import DatePickerRange from '@component/common/DatePickerRange.vue'

   let sheetIdPop = '';

   export default {
      name: 'ProjectSelect',
      components: {
         // DatepickerRange
         DatePickerRange,
         PopAlert,
         
      },
      data() {
         return {
            footerBg: 'transparent',

            popMsg: '',
            confirm_use : false,
            pop_id : 'qultAlert',

            focusProjectId : '', //선택한 프로젝트 id
            focusProjectNm : '', //선택한 프로젝트 name
            focusSiteId : '', //선택한 현장 id
            focusSiteNm : '', //선택한 현장 name
            
            focusBaseType : '', //선택한 본부 코드
            focusBaseTypeName : '', //선택한 본부 코드명  
            focusGongsaTypeCd : '', //선택한 공사유형코드
            focusGongsaTypeNm : '', //선택한 공사유형코드명

            popupList : [], //ibsheet에 나올 data list

            //검색조건
            projStatus : 'ongoing', //프로젝트 상태(defalut : onging(진행중))
            projName : '', //프로젝트 명
            projCode : '', //프로젝트 코드
            siteNm : '', //현장명
            siteCode : '', //현장코드
            dateValue : null, //공사기간


         } 
      },
      props: {
         projectId : {
            type: String,
            default : ''
         },
         projectSelectId : {
            type : String,
            default : 'ProjectSelect'
         }
      },
      beforeDestroy() {
         // loader.removeSheet(sheetIdPop)
      },
      
      mounted() {
         
      },

      created() {
         this.focusProjectId = this.projectId;
      },

      methods: {
         enterEvent : function(e) { //검색조건 enter event
            if(e.keyCode == 13) {
               this.sheetCreate();
            }
         },
         sheetCreate: async function() { //검색 버튼 누를 경우 ibsheet-data settings
            // requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/siteInfo/popup/project/notList';
            let param = {};

            if(this.projName != '') {
               // param['projStatus'] = this.projStatus;
               param['projectNm'] = this.projName;
            }
            if(this.projCode != '') {
               param['projectId'] = this.projCode;
            }
            if(this.siteNm != '') {
               param['siteNm'] = this.siteNm;
            }
            if(this.siteCode != '') {
               param['siteId'] = this.siteCode;
            }
            // console.log(param);
            // if(this.dateValue != null) {
            //    param['csrtStartDt'] = this.dateValue[0];
            //    param['csrtEndDt'] = this.dateValue[1];
            // }

            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               // console.log(e);
               return e.response.data;
            });

            let options = ProjectSelect.options;
            let data = this.popupList;

            let cols = [
               // { Name: "SEQ", Header: "번호", Type: "Int", Width: 40},
               { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], Type: "Int", RelWidth: 2 },
               // { Name: 'baseTypeName', Header: [{ Value: '본부', RowSpan: 2 }], Type: "Text", RelWidth: 10 },
               // { Name: 'baseNm', Header: [{ Value: '본부', RowSpan: 2 }], Type: "Text", RelWidth: 10 },
               // { Name: 'gongsaTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], Type: "Text", RelWidth: 10 },
               { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], Type: "Text", RelWidth: 7 },
               { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], Type: "Text", RelWidth: 15 },
               { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], Type: "Text", RelWidth: 7 },
               { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], Type: "Text", RelWidth: 15 },
               { Name: 'baseType', Visible : false },
               // { Name: 'baseCd', Visible : false },
               // { Name: 'gongsaTypeCd', Visible : false},
            ]

            options.Cols = cols;
            let dataMerge = 0;
            let scroll = 1;

            if(resData.rCode == "0000") {
               this.popupList = resData.datas.resultList;
               if(this.popupList.length> 0){
                  for(let a = 0; a<this.popupList.length; a++){
                     // let base = this.popupList[a].baseType;
                     let base = this.popupList[a].baseCd;
                     if(base == '4000'){
                        this.popupList[a].baseNm = "건축";
                     }else{
                        this.popupList[a].baseNm = "인프라";
                     }
                  }
               }
               
               if(this.popupList.length == 0) {
                  dataMerge = 2; //행 기준 병합
                  data =[];
                  scroll = 1;
                  // data = [
                  //    {
                  //       'baseType' : '조회된 데이터가 없습니다.',
                  //       'gongsaTypeNm' : '조회된 데이터가 없습니다.',
                  //       'projectId' : '조회된 데이터가 없습니다.',
                  //       'projectNm' : '조회된 데이터가 없습니다.',
                  //       'siteId' : '조회된 데이터가 없습니다.',
                  //       'siteNm' : '조회된 데이터가 없습니다.',
                  //    },
                  // ];
                  this.focusProjectId = '';
                  this.focusProjectNm = '';
                  this.focusSiteId = '';
                  this.focusSiteNm = '';

                  // this.focusBaseType = '';
                  this.focusBaseType = '';
                  // this.focusBaseTypeName = '';
                  this.focusBaseTypeName = '';
                  this.focusGongsaTypeCd = '';
                  this.focusGongsaTypeNm = '';
               }else {
                  data = this.popupList;
                  dataMerge = 0; //병합 X
                  if(data.length<10){
                     scroll = 1;
                     // document.getElementById('multiEmpTable2').parentElement.style.height = "";
                  }else{
                     scroll = 0;
                     // document.getElementById('multiEmpTable2').parentElement.style.height = "337px";
                  }

                  this.focusProjectId = this.popupList[0].projectId;
                  this.focusProjectNm = this.popupList[0].projectNm;
                  this.focusSiteId = this.popupList[0].siteId;
                  this.focusSiteNm = this.popupList[0].siteName;

                  // this.focusBaseType = this.popupList[0].baseCd;
                  // this.focusBaseTypeName = this.popupList[0].baseNm;
                  // this.focusGongsaTypeCd = this.popupList[0].gongsaTypeCd;
                  // this.focusGongsaTypeNm = this.popupList[0].gongsaTypeNm;
               }
            }else {
               dataMerge = 2; //행 기준 병합
               data =[];
               scroll = 1;
               // data = [
               //    {
               //       'baseType' : '조회된 데이터가 없습니다.',
               //       'gongsaTypeNm' : '조회된 데이터가 없습니다.',
               //       'projectId' : '조회된 데이터가 없습니다.',
               //       'projectNm' : '조회된 데이터가 없습니다.',
               //       'siteId' : '조회된 데이터가 없습니다.',
               //       'siteNm' : '조회된 데이터가 없습니다.',
               //       'CSRT_START_DT' : '조회된 데이터가 없습니다.',
               //       'CSRT_END_DT' : '조회된 데이터가 없습니다.',
               //       'CSRT_MNGR' : '조회된 데이터가 없습니다.',
               //    },
               // ];

               this.focusProjectId = '';
               this.focusProjectNm = '';
               this.focusSiteId = '';
               this.focusSiteNm = '';

               this.focusBaseType = '';
               this.focusBaseTypeName = '';
               this.focusGongsaTypeCd = '';
               this.focusGongsaTypeNm = '';
            }

            loader.createSheet({
               el: 'sheetTable_projectSelectPopUp',
               options: {
                  Cfg : {
                     CanEdit : 0,
                     DataMerge : dataMerge,
                     NoVScroll: scroll,
                     NoDataMessage : 3,
                  },
                  Cols : cols,
                  Events : {
                     onClick: this.fnClick,
                     ondblclick : this.fnDblClick
                  }
               },
               data: data,
            }).then((sheet) => {
               sheetIdPop = sheet.id;
            });
            this.heightChange(scroll,'sheetTable_projectSelectPopUp');
         },
         fnDblClick : function(evt){
            if(evt.row.Kind != 'Data'){
               return;
            }
            this.fnChoice();
         },
         fnChoice : function() { //선택 버튼 누를때 event
            // console.log(this.focusProjectId);
            if(this.focusProjectId == '') {
               this.popMsg = '프로젝트를 선택해주세요';
               this.$root.$emit('bv::show::modal', 'qultAlert');
               return;
            }
            let infoObj = {
               projectId : this.focusProjectId,
               projectNm : this.focusProjectNm,
               siteId : this.focusSiteId,
               siteNm : this.focusSiteNm,

               // baseType : this.focusBaseType.replace(/ /g, ''),
               // baseType : this.focusBaseType,
               // baseTypeName : this.focusBaseTypeName,
               // gongsaTypeCd : this.focusGongsaTypeCd.replace(/ /g, ''),
               // gongsaTypeCd : this.focusGongsaTypeCd,
               // gongsaTypeNm : this.focusGongsaTypeNm,
            }

            //vuex에 추가
            //this.$store.dispatch('auth/setProjectInfo',infoObj);
            this.$root.$emit('bv::hide::modal', 'projectSelectId');
            this.$emit('fn-choice', infoObj);
         },
         fnClick : function(evtParams) { //ibsheet row(or cell) click & data settings event
            this.focusProjectId = evtParams.row.projectId;
            this.focusProjectNm = evtParams.row.projectNm;
            this.focusSiteId = evtParams.row.siteId;
            this.focusSiteNm = evtParams.row.siteNm;

            // this.focusBaseType = evtParams.row.baseCd;
            // this.focusBaseTypeName = evtParams.row.baseNm;
            // this.focusGongsaTypeCd = evtParams.row.gongsaTypeCd;
            // this.focusGongsaTypeNm = evtParams.row.gongsaTypeNm;
            // console.log(this.focusProjectId,this.focusSiteId,this.focusBaseType,this.focusGongsaTypeCd);
            // console.log(evtParams.row.baseCd);
         },
         dateChange : function(param) { //date-picker value change event
            this.dateValue = param;
         },
         // dateReset : function() {
         //    this.dateValue = null;
         //    this.$refs.datepickerRange.valueReset(); //DatepickerRange valueReset 함수 호출
         // },
         searchReset : function() { //검색조건 초기화
            this.projStatus = 'ongoing';
            this.projName = '';
            this.projCode = '';
            this.siteCode = '';
            this.siteNm = '';
            // this.dateReset();
         },
         popupOpenCheck : function() {
            this.searchReset();
            this.sheetCreate();
         },
         closePop : function() { //기본 팝업 닫기 event
            this.$root.$emit('bv::hide::modal', 'qultAlert');
         },
         heightChange:function(scroll,div){
            if(scroll == 0){
               document.getElementById(div).parentElement.style.height = "520px";
            }else{
               document.getElementById(div).parentElement.style.height = "";
            }
            document.getElementById(div).style.height = "100%";
         }
      },
   }
</script>
<style>
   /* .modal-header .close { display: none !important;} */
</style>