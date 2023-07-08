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
                        @click="currentTab=index"
                    >
                        {{tab}}
                    </a>
                </li>
            </ul>
        </div>
        <!-- 교육관리 교육 훈련 계획/실시(My Site) -->
        <div 
            class="tab_area" 
            v-if="currentTab == 0"
        >
        <edu-plan-sheet/>
        </div>
        <!-- 교육관리 교육 훈련 계획/실시(All Site) -->
        <div 
            class="tab_area" 
            v-else-if="currentTab == 1"
        >
        <edu-plan-all-sites/>
        </div>
    </div>
</template>

<script>
import EduPlanSheet from '@/pages/checkEdu/eduMngt/EduPlanSheet.vue'     
import EduPlanAllSites from '@/pages/checkEdu/eduMngt/EduPlanAllSites.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
export default {
    name: 'EduCurrentTab',
    components: {
        Breadcrumb,
        EduPlanSheet,
        EduPlanAllSites,
    },
    data() {
        return {
            footerBg: 'transparent',
            currentTab: 0, // 기본 current 값 지정 
            tabs: ['My Site', 'All Sites'], // tab name
        }
    },
}
</script>