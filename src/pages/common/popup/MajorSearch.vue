<template>
   <b-modal :id="refId" title="전공 검색" hide-backdrop size="lg" static v-bind:footer-bg-variant="footerBg" v-on:shown="loadPop">
      <template #default>
         <div class="pop_container">
           <div class="lookup_box multi_line align_center">
               <table>
                  <colgroup>
                     <col width="55">
                     <col width="220">
                     <col width="80">
                  </colgroup>
                  <tbody>
                     <tr>
                        <th>전공명</th>   
                        <td><input type="text" class="form_control w100" placeholder="입력해주세요" v-model="searchValue" v-on:keyup="enterEvent"></td>        
                        <td>
                           <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                        </td>
                     </tr>

                  </tbody>
               </table>
            </div>

            <!-- ibsheet -->
            <div class="ib_wrap">
               <div :id="`${refId}_majorSheetTable`" class="ibsheet_table" style="max-height: 337px;"></div>
            </div>
            
            <PopAlert
               v-bind:msg="popMsg" v-bind:pop-id="popId"
               v-on:first-btn-fn="closePop"
             />
         </div>
        
      </template>
      <template #modal-footer="{ hide }">
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnMajorChoice">선택</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" v-on:click="hide('forget')">닫기</b-button>
      </template>
   </b-modal>
</template>

<script>
   import { MajorSearch } from '../data/PopupList'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'
   
   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';

   let sheetId = '';

   export default {
      name: 'MajorSearch',
      components: {
         PopAlert
      },
      data() {
         return {
            footerBg: 'transparent',

            focusMajorId:'', //선택한 전공 id
            focusMajorKrNm: '', //선택한 한국어 전공 name
            focusMajorKrShrtNm: '', //선택한 한국어 전공 약칭
            focusMajorEnNm: '', //선택한 영어 전공 name
            focusMajorEnShrtNm: '', //선택한 영어 전공 약칭
            
            majorList : [], //ibsheet에 나올 data list

            //검색어
            searchValue:'', //전공 명
            
            //alert pop
            popMsg: '',
            confirmUse: false,
            popId: 'majorAlert'
         }
      },
      props: {
         refId: {
            type: String,
            default: 'MajorSearch'
         },

         majorKrNm: {
            type: String,
            default: ''
         },
         majorEnNm: {
            type: String,
            default: ''
         },
         majorId:{
            type: String,
            default: ''
         },
         // searchValue:{
         //    type: String,
         //    default: ''
         // }
      },
      beforeDestroy() {
         // loader.removeSheet(sheetId)
      },
      
      mounted() {
      
      },

      created() {
         // this.focusMajorId = this.majorId;
      },
      methods: {
         enterEvent : function(e) { //검색조건 enter event
            if(e.keyCode == 13) {
               this.sheetCreate();
            }
         },
         loadPop: function(){
            // console.log('shown')
            this.searchValue = '';
            this.focusMajorId = this.majorId;
            this.sheetCreate();
         },
         sheetCreate: async function() {
            /* 임시용 */
            requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
            //

            let url = '/sendApi/api/popup/majorSearch/list';
            let param = {};

            if(this.searchValue != '') {
               param['searchValue'] = this.searchValue;
            }
            const resData = await sendPostApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               return e.response.data;
            });

            let options = MajorSearch.options;
            let data = this.majorList;

            //언어가 kr일때만, en일때는 추후 수정
            let cols = [
               { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 20,CanEdit:0 },
               { Name: 'majorKrNm', Header: [{ Value: '전공명' }], RelWidth: 40,CanEdit:0 },
               { Name: 'majorKrShrtNm', Header: [{ Value: '약칭' }], RelWidth: 40,CanEdit:0 },
            ]
            
            let scroll = 1;
            options.Cols = cols;
            // let dataMerge = 0;

            if(resData.rCode == "0000" && resData.datas.resultList.length != 0) {
               this.majorList = resData.datas.resultList;

               data = this.majorList;
               // dataMerge= 0; //병합 X
               if(data.length<10){
                  scroll = 1;
                  // document.getElementById('multiEmpTable2').parentElement.style.height = "";
               }else{
                  scroll = 0;
                  // document.getElementById('multiEmpTable2').parentElement.style.height = "337px";
               }

               //맨 윗줄 값 가져오기
               this.focusMajorId = data[0].majorId;
               this.focusMajorKrNm = data[0].majorKrNm;
               this.focusMajorKrShrtNm = data[0].majorKrShrtNm;
               this.focusMajorEnNm = data[0].majorEnNm;
               this.focusMajorEnShrtNm = data[0].majorEnShrtNm;
            }else {
               // dataMerge = 2; //행 기준 병합
               data = [];
               scroll = 1;
               //가지고있는 값 제거
               this.focusMajorId = '';
               this.focusMajorKrNm = '';
               this.focusMajorKrShrtNm = '';
               this.focusMajorEnNm = '';
               this.focusMajorEnShrtNm = '';
            }

            loader.createSheet({
               el: `${this.refId}_majorSheetTable`,
               data: data,
               options: {
                  Cfg : {
                     // CanEdit : canEdit,
                     // DataMerge : dataMerge,
                     NoVScroll: scroll,
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
            this.heightChange(scroll,`${this.refId}_majorSheetTable`);
            // document.getElementById('multiEmpTable2').style.height = "100%";
         },
         fnDblClick:function(evt){
            if(evt.row.Kind != 'Data'){
               return;
            }
            this.fnMajorChoice();
         },
         fnMajorChoice: function(){//선택 버튼 누를때 event
            if(this.focusMajorId == '' || typeof(this.focusMajorId) == "undefined") {
               this.popMsg = '전공을 선택해주세요';
               this.$root.$emit('bv::show::modal', 'majorAlert');
               return;
            }
            let infoMajor = {
               majorId: this.focusMajorId,
               majorKrNm: this.focusMajorKrNm,
               majorKrShrtNm: this.focusMajorKrShrtNm,
               majorEnNm: this.focusMajorEnNm,
               majorEnShrtNm: this.focusMajorEnShrtNm,
            }
            this.$emit('fn-major-choice', infoMajor);
            this.focusMajorId = '';
            this.focusMajorKrNm = '';
            this.focusMajorKrShrtNm = '';
            this.focusMajorEnNm = '';
            this.focusMajorEnShrtNm = '';

            this.searchValue = '';

            this.$root.$emit('bv::hide::modal', this.refId);
         },
         fnClick: function(evtParams){//셀 클릭할때마다
            this.focusMajorId = evtParams.row.majorId;
            this.focusMajorKrNm = evtParams.row.majorKrNm;
            this.focusMajorKrShrtNm = evtParams.row.majorKrShrtNm;
            this.focusMajorEnNm = evtParams.row.majorEnNm;
            this.focusMajorEnShrtNm = evtParams.row.majorEnShrtNm;
         },
         closePop: function() {
            this.$root.$emit('bv::hide::modal', 'majorAlert');
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