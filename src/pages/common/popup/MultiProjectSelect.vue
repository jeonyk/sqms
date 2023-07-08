<template>
   <b-modal id="MultiProjectSelect" title="프로젝트 설정" size="xxl" @shown="sheetCreate"
   :footer-bg-variant="footerBg" static>
      <template #default>
         <div class="pop_container">
               <div class="lookup_box multi_line">
                  <table>
                     <caption class="sr_only"></caption>
                     <colgroup>
                        <col width="14%">
                        <col width="*">
                        <col width="10%">
                        <col width="*">
                     </colgroup>
                     <tbody>
                        <tr>
                           <th>프로젝트명</th>
                           <td colspan="3">
                                 <select class="form_control size_sm mr10" v-model="search.mngtType">
                                    <option value="" selected>전체</option>
                                    <option value="0">관리</option>
                                    <option value="1">비관리</option>
                                    <option value="2" >준공</option>
                                 </select>
                                 <input type="text" class="form_control size_lg" placeholder="입력해주세요" v-model="search.projectNm" @keyup.enter="fn_search()">   
                           </td>           
                           <td class="ar">
                              <button type="button" class="btn_reset" @click="fn_clear()">초기화</button>
                              <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_search()">검색</button>
                           </td>    
                        </tr>
                        <tr>
                           <th>프로젝트코드</th>
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search.projectId" @keyup.enter="fn_search()"></td>
                           <th>현장코드</th>
                           <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search.siteId" @keyup.enter="fn_search()"></td>    
                        </tr> 
                        <tr>
                           <th>현장명</th>
                           <td colspan="3"><input type="text" class="form_control w100" placeholder="입력해주세요" v-model="search.siteNm" @keyup.enter="fn_search()"></td>     
                        </tr>                                        
                     </tbody>
                  </table>

               </div>
            
               <div class="table_data mt20">
                    <div class="move_box w100">
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="ProjectAdd" class="ibsheet_table" style="height: 400px;"></div>
                        </div>
                    </div>
                    <div class="move_box w100 mt10">
                        <div class="user_table" style="height: 120px;">
                            <div class="label_project">
                                <ul>
                                    <li class="blue" v-if="selectList.indexOf('ALL_SITE') > -1">
                                       <strong>전체 프로젝트</strong>
                                       <span class="delete_black" @click="fn_delete('ALL_SITE')">삭제</span>
                                    </li>
                                    <li class="gray" v-for="(item, index) in selectList" :key="index" v-else>
                                       <strong>{{item.projectNm}}</strong>
                                       <span class="delete_black" @click="fn_delete(item.siteMstrId)">삭제</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
         </div>
      </template>
      <template #modal-footer="{ hide }"> 
         <b-button class="btn btn_lg btn_outline btn_darkgray" @click="fn_allSite">전체선택</b-button>
         <b-button class="btn btn_lg btn_outline btn_darkgray" @click="fn_choice">적용</b-button>
         <b-button class="btn btn_lg btn_outline btn_gray" @click="hide">닫기</b-button>
      </template>
   </b-modal>

</template>

<script>
   import { MultiProjectSelect } from '../data/PopupList'
   import loader from '@ibsheet/loader'
   import { sendPostApi } from '@/apis/common'
   import _ from 'lodash'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';

   export default {
      name: 'MultiProjectSelect',
      components: {},
      mixins : [MsgBoxMixins],
      data() {
         return {
            footerBg: 'transparent',

            project : {
               mngtType : '',    // 프로젝트 유형
               projectNm : '',   // 프로젝트 이름
               projectId : '',   // 프로젝트 코드
               siteId : '',      // 현장 코드
               siteNm : '',      // 현장명
            },

            search : {
               mngtType : '0',   // 프로젝트 유형
               projectNm : '',   // 프로젝트 이름
               projectId : '',   // 프로젝트 코드
               siteId : '',      // 현장 코드
               siteNm : '',      // 현장명
            },

            selectList : [],
            projectListSheet : null
         }
      },

      props : {
         selectInfo: {    // 기존 리스트 정보
                type: Array ,
                default : () => {
                   return [];
                }
            },
      },

      beforeDestroy() {
         // loader.removeSheet(SHEET_ID)
      },

      methods: {
         fn_clear(){
            this.search = {
               mngtType : '0',   // 프로젝트 유형
               projectNm : '',   // 프로젝트 이름
               projectId : '',   // 프로젝트 코드
               siteId : '',      // 현장 코드
               siteNm : '',      // 현장명
            }
         },

         sheetCreate: async function() {   
            this.search = {
               mngtType : '0',   // 프로젝트 유형
               projectNm : '',   // 프로젝트 이름
               projectId : '',   // 프로젝트 코드
               siteId : '',      // 현장 코드
               siteNm : '',      // 현장명
            }

            // 선택값 초기화
            this.selectList = []

            // 기존 데이터 있는경우
            if(this.selectInfo.length > 0){
               if(this.selectInfo.indexOf('ALL_SITE') < 0){
                  // 전체 현장 조회
                  let url = '/sendApi/api/popup/project/list';
                  let param = {
                     projectIds : this.selectInfo
                  }  

                  // 기존 프로젝트 일치 여부 확인
                  await sendPostApi(url, param).then( async result => {
                     if(typeof result.data.datas.resultList != 'undefined'){
                        this.selectList = (result.data.datas.resultList).map(item => {
                           return {
                              'siteMstrId' : item.siteMstrId,
                              'projectNm'  : item.projectNm,
                           }
                        })
                     }
                  })
               }else{
                  this.selectList = ['ALL_SITE']
               }
            }

            this.fn_projectList( async(rst) => {
               this.fn_checked(rst)

               loader.createSheet({
                  el: 'ProjectAdd',
                  data: rst,
                  options: {
                     Cfg: MultiProjectSelect.options.Cfg,
                     Cols: MultiProjectSelect.options.Cols,
                     Events : {
                        OnClick : this.fn_click,
                        ondblclick : this.fn_projectChoice,
                        OnChange : this.fn_change
                     }
                  },
               }).then((sheet)=>{
                  this.projectListSheet = sheet
               });
            })
         },

         fn_search(){
            this.fn_projectList(rst => {
               this.fn_checked(rst)

               this.projectListSheet.loadSearchData({
                  data : rst,  // partnerSheet 데이터 세팅
               })
               
            })
         },

         /* 현재 선택중인 프로젝트 checked 표시 */
         async fn_checked(list){
            let ids = list.map(row=>row.siteMstrId)
                 
            await this.selectList.forEach(item => {    
               let index = ids.indexOf(item.siteMstrId)

               if(index > -1){
                  list[index].isChecked = 1
               }
            })
         },

         async fn_projectList(callback, ){  // 프로젝트 List
            let url = '/sendApi/api/popup/project/list';
            let param = this.search

            await sendPostApi(url, param).then(async (result) => {
               if(typeof result.data.datas.resultList != 'undefined'){
                  let list = result.data.datas.resultList
                  return callback(list)
               }
            }).catch((e) => {
               return callback([])
            });
         },

         async fn_delete(id){
            if(id == 'ALL_SITE'){   // allSite 경우
               let index = this.selectList.indexOf('ALL_SITE')
               this.selectList.splice(index,1)
            }else{                   // 프로젝트 선택의 경우
               let index = this.selectList.map(item => item.siteMstrId).indexOf(id)
               this.selectList.splice((index),1)

               let data = this.projectListSheet.getDataRows()

               await data.forEach( (dataRow) => { 
                  if(dataRow.siteMstrId == id){
                     dataRow.isChecked = 0
                     this.projectListSheet.Header.isCheckedChecked = 0
                     this.projectListSheet.refreshRow(dataRow);
                  }
               })
            }
            this.projectListSheet.refreshRow(this.projectListSheet.Header);
         },
         
         fn_allSite(){
            this.selectList = ['ALL_SITE']
            this.$emit('fnProjectChoice', this.selectList);
            this.$root.$emit('bv::hide::modal', 'MultiProjectSelect');
         },

         fn_choice(){
            if(this.selectList.length < 1){
               return this.alert('프로젝트를 선택해주세요.');
            }
            this.$emit('fnProjectChoice', this.selectList);
            this.$root.$emit('bv::hide::modal', 'MultiProjectSelect');
         },

         fn_click(evt){
            if (evt.col == 'isChecked') {
               let allSite = this.selectList.indexOf('ALL_SITE')

               if(allSite > -1){
                  this.fn_delete('ALL_SITE')
               }

               if(evt.kind == 'Data'){     // 일반 선택
                  evt.sheet.setCheck(evt.row, 'isChecked', !evt.row.isChecked)
                  if(evt.row.isChecked == 1){ // checked 인경우
                     let index = this.selectList.map(item => item.siteMstrId).indexOf(evt.row.siteMstrId)
                     if(index < 0){
                        this.selectList.push({
                           siteMstrId : evt.row.siteMstrId,
                           projectNm  : evt.row.projectNm
                        })
                     }
                  }else{
                     this.fn_delete(evt.row.siteMstrId)
                  }
               }else{                    
                  let data = evt.sheet.getDataRows()
                  if(evt.row.isCheckedChecked == 1){  // 전체선택 해제
                     data.forEach(row => {
                        let index = this.selectList.map(item => item.siteMstrId).indexOf(row.siteMstrId)
                        if(index > -1){
                           this.selectList.splice(index,1)
                           row.isChecked = 0
                           this.projectListSheet.refreshRow(row);
                        }
                     })
                  }else{    // 전체선택
                     data.forEach(row => {
                        let index = this.selectList.map(item => item.siteMstrId).indexOf(row.siteMstrId)
                        if(index < 0){
                           this.selectList.push(row)
                           row.isChecked = 1
                           this.projectListSheet.refreshRow(row);
                        }
                     })
                  }
               }
               
            }
         },

         fn_projectChoice(evt){
            if(evt.kind == 'Data' && evt.col != 'isChecked'){
               let allSite = this.selectList.indexOf('ALL_SITE')

               if(allSite > -1){
                  this.fn_delete('ALL_SITE')
               }
               let index = this.selectList.map(item => item.siteMstrId).indexOf(evt.row.siteMstrId)
               if(index < 0){
                  evt.row.isChecked = 1
                  this.selectList.push(evt.row)
                  this.projectListSheet.refreshRow(evt.row);
               }
            }
         },
      },
      mounted() {
         
      }
   }
</script>