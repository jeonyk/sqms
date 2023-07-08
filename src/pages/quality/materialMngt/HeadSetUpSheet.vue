<template>
    <div class="tab_contents">
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>
        <div class="tab_area submenu_on" v-show="currentTab == 0">
            <TabList />
            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray btn_number"><span class="num">001</span> 행 추가</button>
                            <button type="button" class="btn btn_sm btn_darkgray">행 삭제</button>
                            <button type="button" class="btn btn_sm btn_darkblue">저장</button>
                        </div>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap">
                        <div id="sheetTable" class="ibsheet_table"></div>
                    </div>
                </div>
            </div>
            <br>
        </div>

        <div class="tab_area submenu_on" v-show="currentTab == 1">
            <TabList />
            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray">자재분류체계추가</button>
                        </div>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap mt0">
                        <div id="sheetTable2" class="ibsheet_table"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TabList from '@/pages/common/frame/TabList.vue';
    import loader from '@ibsheet/loader';
    import { Material, Material2 } from '@/pages/common/data/MaterialsList';

    let SHEET_ID = '';

    export default {
        name: 'HeadSetUpSheet',
        components: {
            TabList
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['자재분류체계 및 Check List 등록', '신규 등록 자재 (프로젝트별)'] // tab name
            }
        },
        mounted() {
            let data = Material.data;
            let options = Material.options;
            
            loader.createSheet({
                el: 'sheetTable',
                data: data,
                options: options
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });
            
            let data2 = Material2.data;
            let options2 = Material2.options;
            
            loader.createSheet({
                el: 'sheetTable2',
                data: data2,
                options: options2
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        }
    }
</script>