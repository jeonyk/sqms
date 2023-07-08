<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
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
            <worker-edu-lang-sheet/>
            </keep-alive>
        </div>

        <div class="tab_area" v-else-if="currentTab == 1">
            <keep-alive>
            <worker-edu-code-sheet/>
            </keep-alive>
        </div>
        <div class="tab_area" v-else-if="currentTab == 2">
            <keep-alive>
            <worker-edu-tran-slation-sheet/>
            </keep-alive>
        </div>
        <div class="tab_area" v-else-if="currentTab == 3">
            <keep-alive>
            <worker-edu-text-book-sheet/>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import WorkerEduLangSheet from '@/pages/checkEdu/workerEdu/WorkerEduLangSheet.vue'
import WorkerEduCodeSheet from '@/pages/checkEdu/workerEdu/WorkerEduCodeSheet.vue'
import WorkerEduTranSlationSheet from '@/pages/checkEdu/workerEdu/WorkerEduTranSlationSheet.vue'
import WorkerEduTextBookSheet from '@/pages/checkEdu/workerEdu/WorkerEduTextBookSheet.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
export default {
    name: 'WorkerEduCurrentTab',
    components: {
        Breadcrumb,
        WorkerEduLangSheet,
        WorkerEduCodeSheet,
        WorkerEduTranSlationSheet,
        WorkerEduTextBookSheet,
    },
    data() {
        return {
            footerBg: 'transparent',
            currentTab: 0, // 기본 current 값 지정 
            tabs: ['언어 설정', '코드 번역', '언어 번역', '교육 등록'], // tab name
        }
    },
}
</script>