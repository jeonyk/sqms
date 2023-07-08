<template>
    <div class="tab_contents">
        <!--<h2 class="sub_title">부적합관리 > Setup</h2>-->
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area" v-show="currentTab == 0">
            <div class="lst_tabs_in">
                <ul>
                    <li v-for="(inner, index) in tab.innerList" v-bind:class="{active: tab.innerCurrent === index}" :key="index"><a href="javascript:void(0);" v-on:click="tab.innerCurrent = index">{{inner.value}}</a></li>
                </ul>
            </div>
            <numbering
                :title="tab.innerList[tab.innerCurrent].value"
                code-type="NCFM"
                :key="tab.innerList[tab.innerCurrent].key"
                :code-dtl-type="tab.innerList[tab.innerCurrent].key"
                :useSameAsRequest="tab.innerList[tab.innerCurrent].useSameAsRequest"
                :except-list="tab.innerList[tab.innerCurrent].exceptList"
            />
        </div>

        <div class="tab_area" v-show="currentTab == 1">
            <approval-option
                code-type="NCFM"
            />
        </div>


    </div>
</template>

<script>
    import Numbering from "@material/component/Numbering";
    import ApprovalOption from "@material/component/ApprovalOption";
    import loader from '@ibsheet/loader'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
    let SHEET_ID = '';

    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'


    export default {
        name: 'NoConfirmSiteSetUpSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            Numbering,
            ApprovalOption,
            Breadcrumb
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['Numbering', '결재옵션'], // tab name
                currentTabInner: 0, // 기본 current 값 지정 
                tabsInner: ['CAR(부적합 시정조치 보고서)', 'NCR(부적합 보고서)', 'Punch'], // tab name
                tab: {
                    innerCurrent: 0,
                    innerList: [
                        {
                            key: 'CAR',
                            value: 'CAR(부적합 시정조치 보고서)',
                            //exceptList:['GJGCD', 'GJSCD','GJMCD'],
                        },
                        {
                            key: 'NCR',
                            value: 'NCR(부적합 보고서)',
                            //exceptList:['GJGCD', 'GJSCD','GJMCD'],
                        },
                        {
                            key: 'PNCH',
                            value: 'Punch',
                            //exceptList:['GJGCD', 'GJSCD','GJMCD'],
                        },
                    ],
                },
            }
        },
        mounted() {
            
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
        }
    }
</script>