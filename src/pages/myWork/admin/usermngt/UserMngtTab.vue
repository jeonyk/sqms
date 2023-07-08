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

        
        <!-- // tab_area -->

        <!-- // 사용자 -->
        <div class="tab_area" v-show="currentTab == 0">
            <user-sheet ref="userSheet"/>
        </div>

        <!-- // 프로젝트 매핑 -->
        <div class="tab_area" v-show="currentTab == 1">
            <prjct-mapng-sheet ref="prjctMapngSheet" />
        </div>  

        <!-- // 배치관리 -->
        <div class="tab_area" v-show="currentTab == 2">
            <sqms-batch-sheet ref="sqmsBatchSheet"/>
        </div>

        <!-- // 접속기록 조회 -->
        <div class="tab_area" v-show="currentTab == 3">
            <login-history-view ref="loginHistoryView"/>
        </div>
        
        <!-- // 문서타입관리 -->
        <div class="tab_area" v-show="currentTab == 4">
            <oz-doc-type ref="OzDocType"/>
        </div>
    </div>  <!-- // tab_contents -->
</template>

<script>
import UserSheet from '@/pages/myWork/admin/usermngt/UserSheet.vue'
import PrjctMapngSheet from '@/pages/myWork/admin/usermngt/PrjctMapngSheet.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
import { sendPostApi, requestOptions } from '@/apis/common';
import SqmsBatchSheet from '@/pages/myWork/admin/usermngt/SqmsBatchSheet.vue'
import LoginHistoryView from '@/pages/myWork/admin/usermngt/LoginHistoryView.vue';
import OzDocType from '@/pages/myWork/admin/usermngt/OzDocTypeSheet.vue';

    // import EmployeeSearch from '../Modal/EmployeeSearch.vue' /* 사원 검색 팝업 */
    // import {ProjectMapping, ProjectMappingUser}  from '../data/MyworkList.js' /* 프로젝트 매핑 */
    // import EmployeeSearch2 from '../Modal/EmployeeSearch2.vue' /* 사원 검색 팝업 */

    export default {
        name: 'UserMngtTab',
        components: {
            UserSheet,
            PrjctMapngSheet,
            SqmsBatchSheet,
            LoginHistoryView,
            Breadcrumb,
            OzDocType
        },
   
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['사용자', '프로젝트 매핑', 'Batch 관리', '접속기록 조회', '문서TYPE 관리'], // tab name
            }
        },
        watch :{
            'currentTab' : {
                handler(tab){
                    switch (tab) {
                        case 0:
                            this.$refs.userSheet.initGrid()
                            break; 
                        case 1:
                            this.$refs.prjctMapngSheet.initGrid()
                            break;
                        case 2:
                            this.$refs.sqmsBatchSheet.batchList()
                            break;
                        case 3:
                            this.$refs.loginHistoryView.init()
                            break;
                        case 4:
                            this.$refs.OzDocType.docInfo()
                            break;
                    }
                }
            }
        },

        mounted() {
        },
        beforeDestroy() {
        },
        activated(){
            // keepAlive 재조회 처리
            if(this.$store.getters['tabInfo/getSavePage'].length > 0){
                
                //keepAlive 재조회 처리
                let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
                let url="/sendApi/api/programMngt/menuChildProgram/list"
                let reSearch = false;
                let param = {"menuMngtId":menuid}; 
                
                // sdave정보가 있는지 체크하여 처리
                sendPostApi(url, param).then((result) => {
                    // 하부 페이지 정보
                    for (let i = 0; i < result.data.dlprogram.length ; i++){
                        // 저장 페이지 정보와 비교
                        for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                            if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                                this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);

                                reSearch = true;
                                break;
                            }
                        }

                        if(reSearch){
                            break;
                        }
                    }

                    if(reSearch){
                        this.$refs.userSheet.initGrid();
                    }

                }).catch((e) => {
                    return e.response;
                });
            }
        },
        methods: {
            
        },
        
   }
</script>