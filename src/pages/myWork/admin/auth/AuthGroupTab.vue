<template>
            <div class="tab_contents">
               <Breadcrumb :currentPath="$route.fullPath" />
                <div class="lst_tabs">
                    <ul>
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index">
                            <a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a>
                        </li>
                    </ul>
                </div>

                <!-- // 권한그룹 -->
                <div class="tab_area" v-show="currentTab == 0">
                    <auth-group-sheet/>
                </div>

                <!-- // 그룹유형 -->
                <div class="tab_area" v-show="currentTab == 1">
                    <auth-group-type-sheet/>
                </div>

            </div><!-- // tab_contents -->

    <!-- 권한그룹 등록(추가) 팝업 -->
    <!-- <b-modal id="AuthorityGroup" title="권한그룹 추가" size="lg" hide-backdrop :footer-bg-variant="footerBg">
      <template #default>
         <div class="pop_container">
            <div class="table_normal_list table_write">
               <table>
                  <caption class="sr_only">권한그룹추가</caption>
                  <colgroup> 
                        <col width="185">
                        <col width="*">
                  </colgroup>
                  <tbody>
                        <tr>
                           <th class="ac">그룹유형 이름</th>   
                           <td>
                              <select name="" id="" class="form_control w50">
                                 <option>선택해주세요</option>
                              </select>
                           </td>
                        </tr>   
                        <tr>
                           <th class="ac">권한그룹 이름</th>   
                           <td>
                              <input type="text" class="form_control" placeholder="입력해주세요">
                           </td>
                        </tr>     
                  </tbody>
               </table>
            </div>
         </div>
      </template>
      <template #modal-footer="{ ok, hide }">
         <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">추가</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
      </template>
   </b-modal> -->

   <!--그룹유형 추가 팝업 -->
    <!-- <b-modal id="AuthorityType" title="권한유형 추가" size="lg" hide-backdrop :footer-bg-variant="footerBg">
      <template #default>
         <div class="pop_container">
            <div class="table_normal_list table_write">
               <table>
                  <caption class="sr_only">권한그룹추가</caption>
                  <colgroup> 
                        <col width="185">
                        <col width="*">
                  </colgroup>
                  <tbody>  
                        <tr>
                           <th class="ac">권한그룹 이름</th>   
                           <td>
                              <input type="text" class="form_control" placeholder="입력해주세요">
                           </td>
                        </tr>     
                  </tbody>
               </table>
            </div>
         </div>
      </template>
      <template #modal-footer="{ ok, hide }">
         <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">추가</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
      </template>
   </b-modal> -->
</template>

<script>
import AuthGroupSheet from '@/pages/myWork/admin/auth/AuthGroupSheet.vue'
import AuthGroupTypeSheet from '@/pages/myWork/admin/auth/AuthGroupTypeSheet.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

    export default {
        name: 'AuthGroupTab',
        components: {
            AuthGroupTypeSheet,
            AuthGroupSheet,
            Breadcrumb,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['권한그룹', '그룹유형'], // tab name
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        methods: {
        },
   }
</script>