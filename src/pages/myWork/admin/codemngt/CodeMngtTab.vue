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

        <!-- // 메뉴관리(1 DEPTH) -->
        <div class="tab_area" v-if="currentTab == 0">
            <keep-alive>
                <menu-1-depth-Mngt-Sheet/>
            </keep-alive>
        </div>

        <!-- // 메뉴관리(2 DEPTH) -->
        <div class="tab_area" v-else-if="currentTab == 1">
            <keep-alive>
                <menu-2-depth-Mngt-Sheet/>
            </keep-alive>
        </div>

        <!-- // 메뉴관리(3 DEPTH) -->
        <div class="tab_area" v-else-if="currentTab == 2">
            <keep-alive>
                <menu-3-depth-Mngt-Sheet/>
            </keep-alive>
        </div>

        <!-- // 공통코드  -->
        <div class="tab_area" v-else-if="currentTab == 3">
            <keep-alive>
                <code-1-depth-Mngt-Sheet/>
            </keep-alive>
        </div>

        <!-- // 대분류 코드  -->
        <div class="tab_area" v-else-if="currentTab == 4">
            <keep-alive>
                <main-code-mngt-sheet/>
            </keep-alive>
        </div>

        <!-- // 중분류 코드  -->
        <div class="tab_area" v-else-if="currentTab == 5">
            <keep-alive>
                <mid-code-mngt-sheet/>
            </keep-alive>
        </div>

        <!-- // 소분류 코드  -->
        <div class="tab_area" v-else-if="currentTab == 6">
            <keep-alive>
                <sub-code-mngt-sheet/>
            </keep-alive>
        </div>

    </div>  <!-- // tab_contents -->
</template>

<script>
import Menu1DepthMngtSheet from '@/pages/myWork/admin/codemngt/Menu1DepthMngtSheet.vue'
import Menu2DepthMngtSheet from '@/pages/myWork/admin/codemngt/Menu2DepthMngtSheet.vue'
import Menu3DepthMngtSheet from '@/pages/myWork/admin/codemngt/Menu3DepthMngtSheet.vue'
import Code1DepthMngtSheet from '@/pages/myWork/admin/codemngt/Code1DepthMngtSheet.vue'
import MainCodeMngtSheet from '@/pages/myWork/admin/codemngt/MainCodeMngtSheet.vue'
import MidCodeMngtSheet from '@/pages/myWork/admin/codemngt/MidCodeMngtSheet.vue'
import SubCodeMngtSheet from '@/pages/myWork/admin/codemngt/SubCodeMngtSheet.vue'
// import CmmnCodeSheet from '@/pages/myWork/admin/codemngt/CmmnCodeSheet.vue'
// import LangSetupSheet from '@/pages/myWork/admin/codemngt/LangSetupSheet.vue'
// import CodeTrnslatSheet from '@/pages/myWork/admin/codemngt/CodeTrnslatSheet.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

export default {
    name: 'CodeMngtTab',
    components: {
        Menu1DepthMngtSheet,
        Menu2DepthMngtSheet,
        Menu3DepthMngtSheet,
        Code1DepthMngtSheet,
        MainCodeMngtSheet,
        MidCodeMngtSheet,
        SubCodeMngtSheet,
        Breadcrumb,
    },
    data() {
        return {
            footerBg: 'transparent',
            currentTab: 0, // 기본 current 값 지정 
            tabs: ['메뉴관리(1 DEPTH)', '메뉴관리(2 DEPTH)', '메뉴관리(3 DEPTH)', '공통코드', '대분류 코드','중분류 코드','소분류 코드'], // tab name
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