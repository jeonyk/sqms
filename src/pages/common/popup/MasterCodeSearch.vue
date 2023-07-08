<template>
    <b-modal id="MasterCodeSearch" :title="titleName" hide-backdrop size="lg" :footer-bg-variant="footerBg" v-on:shown="searchReset">
        <template #default>
            <div class="pop_container">
                <div class="lookup_box multi_line align_center">
                    <table> 
                        <tbody>
                            <tr>
                                <th>검색유형</th>   
                                <td><input type="text" class="form_control" placeholder="입력해주세요" v-on:keyup="enterEvent"></td>        
                                <td class="ar">
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="fnMasterCodeSearch">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="ib_wrap">
                    <div id="popsheetTable" class="ibsheet_table" style="max-height: 337px;"></div>
                </div>
            </div>

        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="selectGrid">선택</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" v-on:click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
   import { MasterCodeSearchList } from '../data/PopupList'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import { commonFn } from '@/script/commonFn.js';
   import loader from '@ibsheet/loader'
   import {requestOptions, sendPostApi }  from '../../../apis/common';
   
   export default {
      name: 'MasterCodeSearch',
      mixins: [MsgBoxMixins],
      components: {
      },
      data() {
         return {
            footerBg: 'transparent',
            iptSheet : null,
            defectData : [],
         }
      },
      props: {
         codeVal : '',
         codeNameKr : '',
         codeVal : '',
         masterCodeId : '',
         titleName : '',
         groupCode : '',
      },
      beforeDestroy() {
         if(this.iptSheet) {
            this.iptSheet.dispose();
         }
      },
      mounted() {
      },
      created() {
      },
      methods: {
         enterEvent : function(e) { //검색조건 enter event
            if(e.keyCode == 13) {
               this.fnMasterCodeSearch();
            }
         },
         searchReset: function(){
            this.fnMasterCodeSearch();
         },
         async fnMasterCodeSearch() {
            MasterCodeSearchList.options.Events = {
               onRenderFirstFinish: async (event) => {
                  requestOptions.headers['Accept-Language'] = "ko";
                  requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                     
                  let url = '/sendApi/api/common/masterCode/list';
                  let param = {};

                  if(!commonFn.methods.isEmpty(this.groupCode)) {
                     param['groupCode'] = this.groupCode
                  }
                  if(!commonFn.methods.isEmpty(this.codeNameKr)) {
                     param['codeNameKr'] = this.codeNameKr
                  }
                  if(!commonFn.methods.isEmpty(this.codeVal)) {
                     param['codeVal'] = this.codeVal
                  }

                  try {
                     const response = await sendPostApi(url, param);
                     if (response.status === 200 && response.data) {
                        this.defectData = response.data.data;
                        
                        event.sheet.loadSearchData({
                           data: this.defectData,
                           append : false // false : 데이터 클리어 후 reload 느낌 : 검색조건 붙었을때 
                        })
                     }
                  } catch (error) {
                     console.error(error)
                  }
                  
               },
               onDblClick : this.clickGrid,
            }

            let options = MasterCodeSearchList.options;  
            loader.createSheet({
               el: 'popsheetTable',
               data: [],
               options: options,
            }).then(sheet => {
               this.itpSheet = sheet;
            })
               
         },
         clickGrid(event) {
            const selectData = event.sheet.getFocusedRow();
            this.$emit('fn-master-code-search', selectData);
            this.$bvModal.hide('MasterCodeSearch');
         },
         selectGrid() {
            const selectData = this.itpSheet.getFocusedRow();
            this.$emit('fn-master-code-search', selectData);
            this.$bvModal.hide('MasterCodeSearch');
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