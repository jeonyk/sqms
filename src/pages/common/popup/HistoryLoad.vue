<!--rivision 등록 -->
<template>
   <b-modal id="HistoryLoad" title="History 불러오기" hide-backdrop size="lg" v-bind:footer-bg-variant="footerBg" v-on:shown="sheetLoad()">
      <template #default>
         <div class="pop_container">
             <h3 class="subject">Revision 정보</h3>
             
              <!-- ibsheet -->
             <div class="ib_wrap">
                 <div id="sheetTable4" class="ibsheet_table"></div>
             </div>
             <template v-if="confirmUse == false">
               <PopAlert
                  v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:btn-name="btnNm" v-bind:pop-id="popId"
                  v-on:first-btn-fn="closePop"
               />
             </template>
             <template v-else>
               <PopAlert
                  v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:btn-name="btnNm" v-bind:pop-id="popId"
                  v-on:first-btn-fn="fnConfirm" v-on:second-btn-fn="closePop"
               />
             </template>
         </div>
      </template>
      <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide }" -->
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnRevisionChoice">선택</b-button>
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="hide('forget')"> 닫기
         </b-button>
      </template>
   </b-modal>
</template>

<script>
   import { HistoryLoad } from '../data/PopupList'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'

   import loader from '@ibsheet/loader'
   import {requestOptions, sendGetApi }  from '../../../apis/common';

   let sheetId = '';

   export default {
      name: 'HistoryLoad',
      components: {
          PopAlert
      },
      data() {
         return {
            footerBg: 'transparent',
            focusRevisionName: '',
            revisionList : [],
            popMsg: '',
            confirmUse: false,
            btnNm: {first : '확인'},
            popId: 'revisionAlert'
         }
      },
      props: {
         rivisionName: {
            type: String,
            default: ''
         }
      },

      beforeDestroy() {
         loader.removeSheet(sheetId)
      },

      created() {
        this.focusRivisionName = this.rivisionName;
      },

      methods: {
         sheetLoad: async function() {
            /* 임시용 */
            requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm1lbWJlck5hbWUiOiLslrTrk5zrr7wiLCJleHAiOjE2NDQ0NTA5ODksIm1lbWJlcklkIjoiYWRtaW4ifQ.CjIERKYS40wdM2YA4tO1sYgeLg-oYxRDchz66uH22JO5ZXX0X3pUm0DN4EOJ_MBsF1KYtzUDQmXKMELWDkS4Rw";
            //
            let url = '/sendApi/api/member/siteInfo/popup/list';
            let param = {};

            const resData = await sendGetApi(url, param).then((result) => {
               return result.data;
            }).catch((e) => {
               // console.log(e);
               return e.response.data;
            });

            let options = HistoryLoad.options;
            let data = this.rivisionList;

            let cols = [
               { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
               { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 30 },
               { Name: 'upUser', Header: [{ Value: '수정한 사람' }], RelWidth: 20 },
               { Name: 'upDttm', Header: [{ Value: '수정 일시' }], RelWidth: 20 },
               { Name: 'contents', Header: [{ Value: '비고' }], RelWidth: 20 },
            ];

            options.Cols = cols;
            let dataMerge = 0;

            if(resData.rCode == "0000") {
               this.rivisionList = resData.datas.resultList;


               data = this.rivisionList;
               dataMerge = 0; //병합 X
            }else {
               dataMerge = 2; //행 기준 병합
               data = [
                  {
                     'title' : '조회된 데이터가 없습니다.',
                     'upUser' : '조회된 데이터가 없습니다.',
                     'upDttm' : '조회된 데이터가 없습니다.',
                     'contents' : '조회된 데이터가 없습니다.',
                  },
               ];
            }
        
            loader.createSheet({
               el: 'sheetTable4',
               options: {
                  Cfg : {
                     CanEdit : 0,
                     DataMerge : dataMerge
                  },
                  Cols : cols, 
                  Events : {
                     onClick: this.fnClick
                  }
               },
               data: data,
            }).then((sheet) => {
                  sheetId = sheet.id
            });
         },
         fnRevisionChoice: function(){//선택 버튼 누를때 event
            
            if(this.focusRevisionName == '') {
               this.popMsg = 'History를 선택해주세요';
               this.confirmUse = false;
               this.btnNm = {first : '확인'};
               this.$root.$emit('bv::show::modal', 'revisionAlert');
               return;
            }else {
               this.popMsg = 'History를 불러올시 기존데이터가 삭제됩니다. 데이터를 가져오시겠습니까?';
               this.confirmUse = true;
               this.btnNm ={first : '확인', second : '취소'};
               this.$root.$emit('bv::show::modal', 'revisionAlert');
            }
          },
          fnClick: function(evtParams){//셀 클릭할때마다
             this.focusRevisionName = evtParams.row.title;
             
            //  console.log(this.focusRevisionName);
          },
          fnConfirm: function(){
            let infoRevision = {
                  revisionName: this.focusRevisionName,
               }
            this.$emit('fn-revision-choice', infoRevision);
            this.focusRevisionName = '';
            this.$root.$emit('bv::hide::modal', 'HistoryLoad');
          },
          closePop: function() {
              this.$root.$emit('bv::hide::modal', 'revisionAlert');
          }
      }
   }
</script>