<template>
   <b-modal v-bind:id="projectSelectId" title="프로젝트 선택" static
      modal-class="single_page" size="xl" v-on:shown="popupOpenCheck"
      v-bind:footer-bg-variant="footerBg" no-close-on-esc no-close-on-backdrop>
      <template #default>
         <div class="pop_container">
            <div class="tab_contents">
               <div class="lookup_box multi_line">
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
                           <th>프로젝트명</th>
                           <td>
                              <div class="form_area">
                                 <select name="" id="" class="form_control" v-model="mngtType">
                                    <option value="all" selected>전체</option>
                                    <option value="0">관리</option>
                                    <option value="1">비관리</option>
                                    <option value="2" >준공</option>
                                 </select>
                                 <input type="text" class="form_control" placeholder="입력해주세요" v-model="projectNm" v-on:keyup="enterEvent">
                              </div>    
                           </td>              
                           <th>프로젝트코드</th>
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="projectCode" v-on:keyup="enterEvent"></td>                                
                           <th>공사기간</th>
                           <td>
                              <date-picker-range v-model="dateValue"/>
                              <!-- <DatepickerRange ref="datepickerRange" v-on:value-change="dateChange" v-on:value-reset="dateReset"/> -->
                           </td>
                           <td class="ar">
                              <button type="button" class="btn_reset" v-on:click="searchReset">초기화</button>
                              <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                           </td>
                        </tr>
                        <tr>
                           <th>현장명</th>
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteNm" v-on:keyup="enterEvent"></td>                 
                           <th>현장코드</th>
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteCode" v-on:keyup="enterEvent"></td>                  
                        </tr>
                     </tbody>
                  </table>
               </div>
            
                  <!-- ibsheet -->
                  <div class="ib_wrap" style="padding-left:20px;padding-right:20px;padding-bottom:20px">
                     <div id="newProjectSelectTable" class="ibsheet_table"></div>
                  </div>
            </div>

            <PopAlert v-bind:msg="popMsg" v-bind:pop-id="popId" v-on:first-btn-fn="closePop" />
         </div>
      </template>
      <template #modal-footer="{}"> <!-- #modal-footer="{ ok, hide }" -->
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnChoice">선택</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" v-on:click="fnClose">닫기</b-button>
      </template>
   </b-modal>
</template>

<script>
   import { ProjectSelect } from '../data/PopupList'
   import DatepickerRange from './DatepickerRange.vue'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'
   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';
   import DatePickerRange from '@component/common/DatePickerRange.vue'

   let sheetIdPop = '';

   export default {
      name: 'NewProjectSelect',
      components: {
         DatepickerRange,
         DatePickerRange,
         PopAlert
      },
      data() {
         return {
            footerBg: 'transparent',

            focusProjectId : '', //선택한 프로젝트 id
            focusProjectNm : '', //선택한 프로젝트 name
            focusSiteId : '', //선택한 현장 id
            focusSiteNm : '', //선택한 현장 name
            focusSiteMstrId : '', //선택한 현장정보 id

            // focusBaseCd : '', //선택한 본부
            focusBaseType : '', //선택한 본부 유형
            focusBaseTypeNm : '', //선택한 유형 코드명  
            focusCsrtType : '', //선택한 공사유형코드
            focusCsrtTypeNm : '', //선택한 공사유형코드명

            popupList : [], //ibsheet에 나올 data list

            //검색조건
            mngtType : '0', //프로젝트 상태(defalut : onging(진행중))
            projectNm : '', //프로젝트 명
            projectCode : '', //프로젝트 코드
            siteNm : '', //현장명
            siteCode : '', //현장코드
            dateValue : null, //공사기간  
            
            popMsg: '',   // alert 팝업용 message
            popId: 'projectAlert' // alert 팝업 id
         } 
      },
      props: {
         projectId : {
            type: String,
            default : ''
         },
         projectSelectId : {
            type : String,
            default : 'NewProjectSelect'
         },
         setCookies: {
            type: Boolean,
            default: false,
         }
      },
      beforeDestroy() {
         loader.removeSheet(sheetIdPop)
      },
      
      mounted() {
      },

      created() {
         this.focusProjectId = this.projectId;
         this.focusSiteId = this.siteCode;
      },

      methods: {
         enterEvent : function(e) { //검색조건 enter event
            if(e.keyCode == 13) {
               this.sheetCreate();
            }
         },
         sheetCreate: async function() { //검색 버튼 누를 경우 ibsheet-data settings
            requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
            let url = '/sendApi/api/popup/newMySitesProject/list';
            let param = {};

            if(this.mngtType != '') {
               param['mngtType'] = this.mngtType;
            }
            if(this.projectNm != '') {
               param['projectNm'] = this.projectNm;
            }
            if(this.projectCode != '') {
               param['projectId'] = this.projectCode;
            }
            if(this.siteNm != '') {
               param['siteNm'] = this.siteNm;
            }
            if(this.siteCode != '') {
               param['siteId'] = this.siteCode;
            }
            if(this.dateValue != null) {
               param['csrtStartDt'] = this.dateValue[0];
               param['csrtEndDt'] = this.dateValue[1];
            }

            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               // console.log(e);
               return e.response.data;
            });

            // console.log('resData',resData);

            let options = ProjectSelect.options;
            let data = this.popupList;

            let cols = [
               // { Name: "SEQ", Header: "번호", Type: "Int", Width: 40},
               { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], Type: "Int", RelWidth: 5 },
               { Name: 'baseTypeNm', Header: [{ Value: '본부', RowSpan: 2 }], Type: "Text", RelWidth: 10 },
               { Name: 'csrtTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], Type: "Text", RelWidth: 10 },
               { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], Type: "Text", RelWidth: 10 },
               { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], Type: "Text", RelWidth: 15, Wrap: 0 },
               { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], Type: "Text", RelWidth: 10 },
               { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], Type: "Text", RelWidth: 10, Wrap: 0 },
               { Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작'}], Type: "Text", RelWidth: 10 },
               { Name: 'csrtEndDt', Header: [{}, { Value: '종료' }], Type: "Text", RelWidth: 10 },
               { Name: 'csrtMngrNm', Header: [{ Value: '현장소장', RowSpan: 2 }], Type: "Text", RelWidth: 10 },
               { Name: 'baseType', Visible : false },
               { Name: 'csrtType', Visible : false},
            ]

            options.Cols = cols;

            let dataMerge = 0;
            let scroll = 0;

            if(typeof(resData.data) != 'undefined' && resData.data != null && (resData.data.length>0)) {
               this.popupList = resData.data;

               data = this.popupList;
               
               if(data != null && data.length > 0) {
                  // options.Cfg['DataMerge'] = 0; //병합 X
                  dataMerge = 0;
                  // console.log('data',data.length);
                  if(data.length<10 ){
                     scroll = 1;
                  }else{
                     scroll = 0;
                  }

                  //맨 윗줄 값 가져오기
                  this.focusProjectNm = data[0].projectNm;
                  this.focusProjectId = data[0].projectId;
                  this.focusSiteId = data[0].siteId;
                  this.focusSiteNm = data[0].siteNm;
                  this.focusSiteMstrId = data[0].siteMstrId;

                  // this.focusBaseCd = data[0].baseCd;
                  this.focusBaseType = data[0].baseType;
                  this.focusBaseTypeNm = data[0].baseTypeNm;
                  this.focusCsrtType = data[0].csrtType;
                  this.focusCsrtTypeNm = data[0].csrtTypeNm;
               }else {
                  // options.Cfg['DataMerge'] = 2; //행 기준 병합
                  dataMerge = 2;
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
                  //       'csrtStartDt' : '조회된 데이터가 없습니다.',
                  //       'csrtEndDt' : '조회된 데이터가 없습니다.',
                  //       'csrtMngrNm' : '조회된 데이터가 없습니다.',
                  //    },
                  // ];

                  //가지고있는 값 제거
                  this.focusProjectNm = '';
                  this.focusProjectId = '';
                  this.focusSiteId  = '';
                  this.focusSiteNm = '';
                  this.focusSiteMstrId = '';

                  // this.focusBaseCd = '';
                  this.focusBaseType = '';
                  this.focusBaseTypeNm = '';
                  this.focusCsrtType = '';
                  this.focusCsrtTypeNm = '';
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
               //       'csrtStartDt' : '조회된 데이터가 없습니다.',
               //       'csrtEndDt' : '조회된 데이터가 없습니다.',
               //       'csrtMngrNm' : '조회된 데이터가 없습니다.',
               //    },
               // ];
            }

            // console.log('scroll',scroll);

            loader.createSheet({
               el: 'newProjectSelectTable',
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
               sheetIdPop = sheet;
            });
            this.heightChange(scroll,'newProjectSelectTable');

         },
         fnDblClick : function(evt){
            if(evt.row.Kind != 'Data'){
               return;
            }
            this.fnChoice();
         },
         fnChoice : function() { //선택 버튼 누를때 event
            if(this.focusProjectId == '') {
               this.popMsg = '프로젝트를 선택해주세요';
               this.$root.$emit('bv::show::modal', 'projectAlert');
               return;
            }

            let infoObj = {
               projectId : this.focusProjectId,
               // projectId : this.focusProjectId.replace(/ /g, ''),
               projectNm : this.focusProjectNm,
               // siteId : this.focusSiteId.replace(/ /g, ''),
               siteId : this.focusSiteId,
               siteNm : this.focusSiteName,
               // siteMstrId : this.focusSiteMstrId.replace(/ /g, ''),
               siteMstrId : this.focusSiteMstrId,

               // baseCd : this.focusBaseCd,
               baseType : this.focusBaseType,
               baseTypeNm : this.focusBaseTypeNm,
               // csrtType : this.focusCsrtType.replace(/ /g, ''),
               csrtType : this.focusCsrtType,
               csrtTypeNm : this.focusCsrtTypeNm,
            }

            // console.log("@@ obj : %o",infoObj);

            // 쿠키에 프로젝트 id, 현장 id 담기
            if (this.setCookies) {
               this.$cookies.set("projectId", infoObj.projectId);
               this.$cookies.set("siteId", infoObj.siteId);
               this.$cookies.set("siteMstrId", infoObj.siteMstrId);
               this.$cookies.set("projectName", infoObj.projectNm);
               // console.log(this.$store)
               this.$store.dispatch('ui/setProjectName', infoObj.projectNm)

               // console.log("@@@@ infoObj baseCd : "+infoObj.baseCd);

               //vuex에 추가
               this.$store.dispatch('auth/setProjectInfo',infoObj);
               // vue session에 추가
               this.$session.set('userInfo', this.$store.getters['auth/getAuth']);
               
               // refresh
               //this.$router.go();               
               this.$emit('fn-choice', infoObj);
            }else{
               // vue session에 추가
               this.$session.set('userInfo', infoObj);
               //vuex에 추가
               this.$store.dispatch('auth/setProjectInfo',infoObj);
               this.$store.dispatch('tabInfo/allTabClose');
               this.$emit('fn-other-project-choice', infoObj);

            }

            // 세션 스토리지에 프로젝트 id, 현장 id 담기
            // sessionStorage 미사용으로 인한 주석
            // sessionStorage.setItem("projectId", infoObj.projectId);
            // sessionStorage.setItem("siteId", infoObj.siteId);
            // sessionStorage.setItem("siteMstrId", infoObj.siteMstrId);
       
            
         },
         fnClick : function(evtParams) { //ibsheet row(or cell) click & data settings event
            this.focusProjectId = evtParams.row.projectId;
            this.focusProjectNm = evtParams.row.projectNm;
            this.focusSiteId = evtParams.row.siteId;
            this.focusSiteName = evtParams.row.siteNm;
            this.focusSiteMstrId = evtParams.row.siteMstrId;
            // this.focusBaseCd = evtParams.row.baseCd;
            this.focusBaseType = evtParams.row.baseType;
            this.focusBaseTypeNm = evtParams.row.baseTypeNm;
            this.focusCsrtType = evtParams.row.csrtType;
            this.focusCsrtTypeNm = evtParams.row.csrtTypeNm;

            // console.log("@@@ this.focusBaseTypeName : "+this.focusBaseTypeName );
         },
         dateChange : function(param) { //date-picker value change event
            this.dateValue = param;
         },
         dateReset : function() {
            this.dateValue = null;
            this.$refs.datepickerRange.valueReset(); //DatepickerRange valueReset 함수 호출
         },
         searchReset : function() { //검색조건 초기화
            this.mngtType = '0';
            this.projectNm = '';
            this.projectCode = '';
            this.siteCode = '';
            this.siteNm = '';
            this.dateValue = null;
            // this.dateReset();
         },
         popupOpenCheck : function() {
            // console.log('here');
            this.searchReset();
            this.sheetCreate();
         },
         fnClose : function() {
            // if(this.$cookies.get("projectId") == '' || this.$cookies.get("projectId") == null){
            //    this.popMsg = '프로젝트를 선택해주세요';
            //    this.$root.$emit('bv::show::modal', 'projectAlert');
            //    return;
            // }else{
               this.$root.$emit('bv::hide::modal', 'NewProjectSelect');
            // }
         },
         closePop : function() {
            this.$root.$emit('bv::hide::modal', 'projectAlert');
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