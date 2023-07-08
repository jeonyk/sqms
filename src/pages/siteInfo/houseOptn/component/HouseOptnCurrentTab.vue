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
            <house-optn-info-my-site-sheet/>
        </div>

        <div class="tab_area" v-else-if="currentTab == 1">
            <house-optn-info-all-site-view/>
        </div>

        <div class="tab_area" v-else-if="currentTab == 2">
            <house-optn-info-sheet/>
        </div>
    </div>
</template>

<script>
import HouseOptnInfoMySiteSheet from '@/pages/siteInfo/houseOptn/HouseOptnInfoMySiteSheet.vue'
import HouseOptnInfoAllSiteView from '@/pages/siteInfo/houseOptn/HouseOptnInfoAllSiteView.vue'
import HouseOptnInfoSheet from '@/pages/siteInfo/houseOptn/HouseOptnInfoSheet.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'


export default {
    name: 'HouseOptnCurrentTab',
    components: {
        Breadcrumb,
        HouseOptnInfoMySiteSheet,
        HouseOptnInfoAllSiteView,
        HouseOptnInfoSheet
    },
    data() {
        return {
            footerBg: 'transparent',
            currentTab: 0, // 기본 current 값 지정 
            tabs: ['My site', 'All sites', '세대설정'], // tab name
        }
    }
}
</script>