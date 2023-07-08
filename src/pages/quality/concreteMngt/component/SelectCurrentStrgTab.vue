<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li 
                v-for="(tab, index) in tabs" 
                :class="{active:currentTab===index}" 
                :key="index"
                >
                <a 
                    href="javascript:void(0);" 
                    @click="currentTab=index"
                >{{tab}}</a>
                </li>
            </ul>
        </div>

        <div
            class="tab_area"
            v-if="currentTab == 0"
        >
            <comp-strg-my-site
                :param-strg-test-status="strgTestStatus"
            />
        </div>
        <!-- My Site -->
        <div
            class="tab_area"
            v-else-if="currentTab == 1"
        >
            <comp-strg-allsites />
        </div>
        <!-- All Sites -->
    </div>
</template>

<script>
import CompStrgAllsites from '@/pages/quality/concreteMngt/CompStrgAllSites.vue'
import CompStrgMySite from '@/pages/quality/concreteMngt/CompStrgMySite.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
export default {
    name: 'SelectCurrentStrgTab',
    components: {
        Breadcrumb,
        CompStrgMySite,
        CompStrgAllsites 
    },
    data() {
        return {
            footerBg: 'transparent',
            tabs: ['My Site', 'All Sites'],
            currentTab: 0, // 기본 current 값 지정 

            strgTestStatus: null,
        }
    },
    created () {
        if (this.$route.params.strgTestStatus){
            this.strgTestStatus = this.$route.params.strgTestStatus
        }
    }
}
</script>