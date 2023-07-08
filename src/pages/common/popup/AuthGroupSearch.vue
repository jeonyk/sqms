<template>
   <b-modal v-bind:id="authPopId" title="사원 검색" hide-backdrop size="lg" v-bind:footer-bg-variant="footerBg" v-on:shown="firstLoad">
      <!--v-on:shown="sheetCreate"-->
      <template #default>
         <div class="pop_container">
            <div class="lookup_box multi_line align_center">
               <table>
                  <colgroup>
                     <col width="4%">
                     <col width="20%">
                     <col width="*">
                  </colgroup>
                  <tbody>
                     <tr>
                        <th>권한그룹명</th>   
                        <td><input type="text" v-model="search.groupAuthNm" class="form_control" placeholder="입력해주세요" v-on:keyup="enterEvent"></td>        
                        <td class="ar">
                           <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="searchData">검색</button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <!-- ibsheet -->
            <div class="ib_wrap">
               <div id="ibSheet_authGroup" class="ibsheet_table" :style="{'height': '337px'}"></div>
            </div>
            
         </div>
      </template>
      <template #modal-footer="{ }">
         <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnAuthGroupChoice">선택</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" v-on:click="hidePop">닫기</b-button>
      </template>
   </b-modal>
</template>

<script>
import loader from '@ibsheet/loader'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { PopAuthGroupSheet } from '@/pages/common/data/AuthGroupList'
import {requestOptions, sendPostApi }  from '../../../apis/common';
   
   export default {
      name: 'AuthGroupSearch',
      mixins: [MsgBoxMixins],
      components: {
         
      },
      data() {
         return {
            footerBg: 'transparent',
            search : {
               groupAuthNm : ''
            },
            authGroupGrid : {
               data : null,
               options : {},
            },
            groupAuthNm : '',
            groupAuthDtlId : '',
         }
      },
      props:{
         authPopId: {
            type: String,
            default: 'AuthGroupSearch'
         },
      },
      beforeDestroy() {
      },
      created() {
      },
      mounted() {
      },
      methods: {
         enterEvent : function(e) { //검색조건 enter event
            if(e.keyCode == 13) {
               this.searchData();
            }
         },
         firstLoad: function(){
            this.emploName = '';
            this.initSheet();
         },
         initSheet : function() {
            let data   = PopAuthGroupSheet.data;
            let option = PopAuthGroupSheet.options;
            
            option.Events = {
               onRenderFirstFinish : (event) => {
                  this.searchData();
               },
               onDblClick : this.fnAuthGroupChoice
            }

            loader.createSheet({
               el: 'ibSheet_authGroup',
               data: data,
               options: option
            }).then((sheet) => {
               this.authGroupGrid.data = sheet
            });
         },
         searchData : async function() { //검색 버튼 누를 경우 ibsheet-data settings
            /* 임시용 */
            requestOptions.headers['Accept-Language'] = "kr";
            requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
            //
            let url = '/sendApi/api/myWork/authGroupMngt/authGroup/list';
            let param = {
               ...this.search
            };

            const resData = await sendPostApi(url, param)
                                    .then((result) => {
                                       // console.log(result.data.datas.dlAuthGroup)
                                       this.authGroupGrid.data.loadSearchData({
                                          data: result.data.datas.dlAuthGroup
                                       });
                                    });
         },
         fnAuthGroupChoice : function(evt) { //선택 버튼 누를때 event
            // console.log("evt : %o", evt)
            if( evt.eventName == "onDblClick" ) {
               this.groupAuthNm    = evt.row.groupAuthNm;
               this.groupAuthDtlId = evt.row.groupAuthDtlId;
            } else {
               let focusRow =  this.authGroupGrid.data.getFocusedRow();

               if ( focusRow == null ) {
                  this.alert("선택된 사용자가 없습니다");
                  return;
               } else {
                  this.groupAuthNm    = focusRow.groupAuthNm;
                  this.groupAuthDtlId = focusRow.groupAuthDtlId;
               }
            }

            let infoAuthGroup = {
               groupAuthNm : this.groupAuthNm,
               groupAuthDtlId : this.groupAuthDtlId,
               // jobTitle : this.focusJobTitle,
               // workLocNm : this.focusWorkLocNm,
               // workLocCd : this.focusWorkLocCd.replace(/ /g, ''),
               // email: this.focusEmail,
               // jobRoleNm: this.focusJobRoleNm,
               // choosePerson : this.choosePerson,
               // hp : this.focusHp,
            }
            this.$emit('fn-authgroup-choice', infoAuthGroup);
            this.$root.$emit('bv::hide::modal', this.authPopId);
         },
         hidePop : function(){
            this.$root.$emit('bv::hide::modal', this.authPopId);
         },
      }
   }
</script>