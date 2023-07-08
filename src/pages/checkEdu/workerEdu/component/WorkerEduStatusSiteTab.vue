<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul>
                <li 
                    v-for="(tab, index) in tabs" 
                    v-bind:class="{active:currentTab===index}" 
                    :key="index"
                >
                    <a
                        href="javascript:void(0);" 
                        v-on:click="currentTab=index"
                    >
                    {{tab}}
                    </a>
                </li>
            </ul>
        </div>
        <div class="tab_area" v-if="currentTab == 0">
            <keep-alive>
            <worker-edu-status-my-site/>
            </keep-alive>
        </div>

        <div class="tab_area" v-else-if="currentTab == 1">
            <keep-alive>
            <worker-edu-status-all-site/>
            </keep-alive>
        </div>
    </div>
</template>

<script>
   import WorkerEduStatusMySite from '@/pages/checkEdu/workerEdu/WorkerEduStatusMySite.vue'
   import WorkerEduStatusAllSite from '@/pages/checkEdu/workerEdu/WorkerEduStatusAllSite.vue'
   import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
   import { mapGetters } from 'vuex'

   export default {
        name: 'WorkerEduStatusSiteTab',
        components: {
            Breadcrumb,
            WorkerEduStatusMySite,
            WorkerEduStatusAllSite
        },
        computed: {
        ...mapGetters({
            userType: 'auth/getUserType',
        })
        },
        data() {
            return {
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
            }
        },
        created(){
            if(this.userType == "PTNR"){
                tabs: ['My Site'];
            }
        }
   }
</script>