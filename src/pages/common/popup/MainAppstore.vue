<template>
   <b-modal id="pop_app_store" title="App Store" size="lg" hide-backdrop :footer-bg-variant="footerBg" v-on:shown="loadPop">
      <template #default>
         <div class="pop_container">
            <div class="lst_appstore">
               <h3>분류</h3>
               <select v-model="searchType" class="form_control">
                  <option value="">전체</option>
                  <option value="T1">기본항목</option>
                  <option value="T2">품질활동</option>
                  <option value="T3">점검 및 교육</option>
                  <option value="T4">BS점검</option>
                  <option value="T5">통계분석</option>
               </select>

               <div class="appstore small">
                  <!-- <div class="search_area">
                     <input type="text" placeholder="앱을 검색하세요." class="form_control">
                     <button type="button" class="btn_search">검색</button>
                  </div> -->
                  <ul>
                     <li>
                        <div v-for="item in strLayout.filter(item => (item.layoutType === searchType || searchType == '') && item.layoutType !== 'T6' )" :class="`app_icon ${item.iconCd}`" :key="item.layoutCd+'1'">
                           <span>{{item.layoutNm}}
                              <strong class="sub_tit" v-if="item.layoutType=='T1'">기본항목 <span class="system">1X1</span></strong>
                              <strong class="sub_tit" v-if="item.layoutType=='T2'">품질활동 <span class="system">1X1</span></strong>
                              <strong class="sub_tit" v-if="item.layoutType=='T3'">점검 및 교육 <span class="system">1X1</span></strong>
                              <strong class="sub_tit" v-if="item.layoutType=='T4'">BS점검 <span class="system">1X1</span></strong>
                              <strong class="sub_tit" v-if="item.layoutType=='T5'">통계분석 <span class="system">1X1</span></strong>
                           </span>
                           <button type="button" class="btn btn_sm btn_darkgray ico_add" @click="addItem(item)" v-if="item.fixingYn == 'N' && item.choiseYn == 'N'">추가</button>
                        </div>
                     </li>
                     <!-- <li>
                        <div class="app_icon icon_chart_histogram_two disabled">
                           <span>품질 지표 관리
                              <strong class="sub_tit">품질활동 <span class="system">1X1</span></strong>
                           </span>
                           <button type="button" class="btn btn_sm btn_darkgray ico_add" @click="addItem">추가</button>
                        </div>
                     </li>
                     <li>
                        <div class="app_icon icon_creative">
                           <span>벌점 계산
                              <strong class="sub_tit">품질활동 <span class="system">1X1</span></strong>
                           </span>
                           <button type="button" class="btn btn_sm btn_darkgray ico_add icon_creative" @click="addItem">추가</button>
                        </div>
                     </li> -->
                  </ul>
               </div>
            </div>
            <div class="board_appstore">
               <p class="message">설치된 앱을 원하시는 위치로 Drag&Drop하여 배열해보세요.</p>
               <grid-layout :layout.sync="layout" class="appstore"
                  :col-num="colNum"
                  :row-height="120"
                  :is-draggable="draggable"
                  :is-resizable="resizable"
                  :vertical-compact="true"
                  :use-css-transforms="true"
                  :margin="[12, 12]"
               >
                  <grid-item v-for="item in layout" :key="item.layoutCd"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.layoutCd"
                  >
                     <div class="item">
                        <div :class="`app_icon ${item.iconCd}`">
                           <span>{{ item.layoutNm }}</span>
                           <button type="button" class="ico_remove" @click="removeItem(item.layoutCd)" v-if="item.fixingYn=='N'"></button>
                        </div>
                     </div>

                     <!-- <div v-if="item.i == 0" class="item">
                        <div class="app_icon icon_me">
                           <span>My Work</span>
                           <button type="button" class="ico_remove" @click="removeItem(item.name)"></button>
                        </div>
                     </div> -->

                  </grid-item>
               </grid-layout>
            </div>
         </div>
      </template>
      <template #modal-footer="{ hide }">
         <div class="lst_appstore">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="saveData">적용</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
         </div>
      </template>

   </b-modal>
</template>

<script>

import _ from 'lodash';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { sendPostApi, requestOptions } from '@/apis/common';
import { GridLayout, GridItem } from "vue-grid-layout"

   export default {
      name: 'MainAppstore',
      mixins: [MsgBoxMixins],
      components: {
        GridLayout,
        GridItem,
      },
      data() {
         return {
            footerBg: 'transparent',
            searchType : '',
            /* grid layout */
            strLayout : [],
            layout : [],
            draggable : true,
            resizable : false,
            colNum : 4,
            index : 0,
            posX : 0,
         }
      },
      mounted() {
      },
      methods: {
         loadPop : function(){
            this.searchData();
         },
         addItem : function (item) { // grid 추가
            // console.log("val : %o", item)
            let name = item.iconCd;
            let pstW = 1;
            this.index = this.layout.length;

            // 품질 지표 관리는 3
            if( item.iconSize > 1 ){
               pstW = Number(item.iconSize);
            }

            // console.log("this.layout : %o", this.layout)

            this.layout.push({
                x : Number(this.posX % this.colNum),
                y : Number(this.layout.length), // puts it at the bottom
                w : Number(pstW),
                h : 1,
                i : item.layoutCd,
                iconCd : name,
                layoutNm : item.layoutNm,
                layoutCd : item.layoutCd,
                fixingYn : item.fixingYn
            });
            // Increment the counter to ensure key is always unique.

            this.strLayout.forEach((data) => {
               if ( data.layoutCd == item.layoutCd ) {
                  item.choiseYn = data.i;
               }
            })
            // console.log("this.layout : %o", this.strLayout)
            
            this.posX ++;
         },
         removeItem: function (val) { // grid 삭제
            // console.log("val : %o", val)
            // console.log("this.layout : %o", this.layout)
            const index = this.layout.map(item => item.layoutCd).indexOf(val);
            this.layout.splice(index, 1);

            this.strLayout.forEach((data) => {
               if ( val == data.layoutCd ) {
                   data.choiseYn = "N";
                }
            });

            // 삭제전 원본에 수정된 정보를 복사
            // this.orgLayout =  this.orgLayout
            //                         .map(orgItem => {
            //                            let changItem = this.layout.filter(subItem => subItem.name === orgItem.name);

            //                            if( changItem.length > 0 ){
            //                               orgItem = this.layout.find(subItem => subItem.name === orgItem.name);
            //                               // console.log("NO orgItem " + cnt + ": %o", orgItem);
            //                            } else {
            //                               orgItem = orgItem;
            //                               // console.log("OK orgItem " + cnt + ": %o", orgItem);
            //                            }
            //                            return orgItem
            //                         });
            // console.log("change =====================> %o", this.orgLayout);
            // console.log("change =====================> %o", this.layout);
         },
         searchData : async function() {
            let url = '/sendApi/api/common/appStore/layoutSet/list';
            let param = {
                  userId : this.$session.get('userInfo').userId,
                  layoutList : this.layout
            }

            await sendPostApi(url, param)
                     .then(data => {
                        this.strLayout = data.data.datas.dlStrLayout;
                        this.layout    = data.data.datas.dlLayout;
                     });
         },
         saveData : async function() {
            let url = '/sendApi/api/common/appStore/layoutSet/write';
            let param = {
                  userId : this.$session.get('userInfo').userId,
                  layoutList : this.layout
            }
            await sendPostApi(url, param)
               .then(result => {
                  this.alert("적용되었습니다.", this.searchData);
               });
         },
      },
   }
</script>