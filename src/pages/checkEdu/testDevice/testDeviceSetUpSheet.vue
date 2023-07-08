<template>
        <div class="tab_contents">
            <Breadcrumb :currentPath="$route.fullPath" />
            <numbering
                :title="'시험장비'"
                code-type="EQPM"
                code-dtl-type="EQPM"
                :except-list="['GJGCD', 'GJSCD']"
                :key="'EQPM'"
            />

            <!-- <div class="inner type2">
                <div class="button_box">
                    <h2>시험/검사 장비 Numbering</h2>
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray">저장</button>
                    </div>
                </div>
                <div class="button_box mt10">
                    <span>Sequence Digit</span>
                    <select name="" id="" class="form_control num">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                    </select>
                    <span class="numbering_tit">Preview : <span class="point_color txt_ellipsis">CUKR1303-건축-자재승인-2021-0001</span></span>
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray">추가</button>
                        <button type="button" class="btn btn_sm btn_darkgray">삭제</button>
                    </div>
                </div>

                <div class="ib_wrap">
                    <div id="sheetTable" class="ibsheet_table"></div>
                </div>

                <div class="button_box">
                    <h2>Numbering 히스토리</h2>
                </div>
                <div class="ib_wrap">
                    <div id="sheetTable2" class="ibsheet_table"></div>
                </div>

            </div> -->
        </div>
</template>

<script>
    import loader from '@ibsheet/loader'
    import Numbering from "@material/component/Numbering"
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import { Material4, Material5 } from '../../common/data/MaterialsList'
    import { TestSearch } from '../../common/data/PopupList'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

    let SHEET_ID = '';

    export default {
        name: 'TestDeviceSetUpSheet',
        mixins: [authCheckMixns],
        components: {
            Numbering,
            Breadcrumb
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My site', 'All sites'] // tab name
            }
        },
        mounted() {
            // let data2 = Material4.data;
            // let options2 = Material4.options;
            // loader.createSheet({
            //     el: 'sheetTable',
            //     data: data2,
            //     options: options2,
            // }).then((sheet) => {
            //     SHEET_ID = sheet.id
            // });
            
            // let data3 = Material5.data;
            // let options3 = Material5.options;
            // loader.createSheet({
            //     el: 'sheetTable2',
            //     data: data3,
            //     options: options3,
            // }).then((sheet) => {
            //     SHEET_ID = sheet.id
            // });
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
            sheetLoad: function() {
                let data = TestSearch.data;
                let options = TestSearch.options;

                loader.createSheet({
                    el: 'popsheetTable',
                    options: options,
                    data: data,
                }).then((sheet) => {
                    SHEET_ID = sheet.id
                });
            }
        }
    }
</script>