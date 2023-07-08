<template>
   <b-modal id="UserGroup" title="권한그룹 설정" 
   size="lg" @shown="sheetCreate"
   hide-backdrop :footer-bg-variant="footerBg" static>
      <template #default>
         <div class="pop_container">
            <div class="lookup_box multi_line align_center">
               <table>
                  <caption class="sr_only"></caption>
                  <colgroup> 
                        <col width="55">
                        <col width="220">
                        <col width="80">
                  </colgroup>
                  <tbody>
                        <tr>
                           <th>권한그룹명</th>   
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="groupAuthNm" @keyup.enter="fn_search"></td>        
                           <td class="ar">
                              <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_search">검색</button>
                           </td>
                        </tr>

                  </tbody>
               </table>
            </div>

            <!-- ibsheet -->
            <div class="ib_wrap">
               <div id="UserGroupSearch" class="ibsheet_table" style="max-height: 337px;"></div>
            </div>
         </div>
      </template>
      <template #modal-footer="{ hide }">
         <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_authGroupChoice('choice')">선택</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" @click="hide(fn_clear())">닫기</b-button>
      </template>
   </b-modal>
</template>

<script>
   import loader from '@ibsheet/loader'
   import { UserGroup } from '../data/PopupList'
   import { sendPostApi } from '@/apis/common'

   export default {
      name: 'UserGroup',
      data() {
         return {
            footerBg: 'transparent',
            authGroupSheet : null,
            groupAuthNm : '',

            authGroup : {
               groupTypeNm : '',     // 그룹 유형명
               groupAuthNm : '',     // 권한그룹
               groupAuthDtlId : ''   // 그룹코드
            }
         }
      },
      mounted() {
         
      },

      beforeDestroy() {
         // loader.removeSheet(SHEET_ID)
      },

      methods: {
         sheetCreate: function() {
            this.fn_authGroupList((rst) => {
               loader.createSheet({
                  el: 'UserGroupSearch',
                  data: rst,
                  options: {
                     Cfg: {
                        NoVScroll: 0, 
                     },
                     Cols: UserGroup.options.Cols,
                     Events : {
                        onClick: this.fnClick,
                        ondblclick : this.fn_authGroupChoice
                     }
                  },
               }).then((sheet)=>{
                  this.authGroupSheet = sheet
               });
            })
         },

         async fn_authGroupList(callback){  // 권한 그룹 List
            let url = '/sendApi/api/myWork/authGroupMngt/authGroup/list'; 
            let param = {
               groupAuthNm : this.groupAuthNm, // 협력사 유형
            };

            await sendPostApi(url, param).then((result) => {
               if(typeof result.data.datas.dlAuthGroup != 'undefined'){
                  return callback(result.data.datas.dlAuthGroup)
               }
            }).catch((e) => {
               return callback([])
            });
         },

         fn_search(){  // 검색
            this.fn_authGroupList((rst)=>{
               this.authGroupSheet.loadSearchData({
                  data : rst,  // authGroupSheet 데이터 세팅
               })
            })
         },

         fn_clear(){  // 초기화
            this.groupAuthNm = ''

            this.authGroup = {
               groupTypeNm : '',     // 그룹 유형명
               groupAuthNm : '',     // 권한그룹
               groupAuthDtlId : ''   // 그룹코드
            }
         },

         fnClick(evt){
            if(evt.kind == 'Data'){
               this.authGroup = {
                  ...evt.row
               }
            }
         },

         fn_authGroupChoice(evt){
            if(evt=='choice' || evt.kind == 'Data'){
               this.$emit('fnAuthGroupChoice', this.authGroup);
               this.$root.$emit('bv::hide::modal', 'UserGroup');
            }
         },
               
      },
      
   }
</script>