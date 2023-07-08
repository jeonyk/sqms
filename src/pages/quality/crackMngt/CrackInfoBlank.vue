<template>
   <div class="wrap">
        <div class="tab_contents">
            <h2 class="sub_title">균열 상세보기</h2>
            <div class="inner type2">
                <div class="data_num">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="86">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>타설 No.</th>
                                <td>WA10102-콘크리트-2022-237
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <div class="p20 pb0">
                    <label class="input_radio" for="rdoSolar">
                        <input type="radio" id="rdoSolar" name="crack" checked="">
                        <span class="label_text">균열 있음</span>
                    </label>
                    <label class="input_radio" for="rdoLunar">
                        <input type="radio" id="rdoLunar" name="crack">
                        <span class="label_text">균열 없음</span>
                    </label>
                </div>
                -->
                <div class="lst_tabs">
                    <ul>
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                    </ul>
                </div>

                <div class="tab_area" v-show="currentTab == 0">
                    <div class="inner">
                        <div class="table_normal_list table_write">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="12%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>주요 원인</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>관리 방법</th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="button_box">
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkgray">행 복사</button>
                                <div class="btn_number">
                                    <select name="" id="" class="form_control num">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                        <option value="">5</option>
                                        <option value="">6</option>
                                        <option value="">7</option>
                                        <option value="">8</option>
                                        <option value="">9</option>
                                        <option value="">10</option>
                                    </select>
                                    <button type="button" class="btn btn_sm">행 추가</button>
                                </div>
                                <button type="button" class="btn btn_sm btn_darkgray">행 삭제</button>
                            </div>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="sheetTable" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 1">
                    <div class="inner">
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="sheetTable2" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 2">
                    <div class="inner">
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="sheetTable3" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 3">
                    <div class="inner">
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="sheetTable4" class="ibsheet_table"></div>
                        </div>
                        
                        <div class="table_normal_list table_write">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="12%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>특이사항</th>
                                        <td>
                                            <div class="input_text">
                                                <textarea name="" id="" class="form_control"></textarea>
                                                <div class="num"><strong class="count">187</strong>/200</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 4">
                    <div class="inner">
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="sheetTable5" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loader from '@ibsheet/loader'
    import { CrackDetail, CrackDetail2, CrackDetail3 } from '../../common/data/MaterialsList'
    // import { CompanySelect } from '../data/PopupList'
    let SHEET_ID = '';

    export default {
        name: '',
        components: {
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['1차 조사', '2차 조사', '3차 조사', '보수/보강', '4차 조사'], // tab name
            }
        },
        mounted() {
            //let ts = this;

            let data = CrackDetail.data;
            let options = CrackDetail.options;

            loader.createSheet({
                el: 'sheetTable',
                options: options,
                data: data
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });

            let data3 = CrackDetail3.data;
            let options3 = CrackDetail3.options;

            loader.createSheet({
                el: 'sheetTable2',
                options: options3,
                data: data3
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });

            loader.createSheet({
                el: 'sheetTable3',
                options: options3,
                data: data3
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });

            loader.createSheet({
                el: 'sheetTable5',
                options: options3,
                data: data3
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });


            let data2 = CrackDetail2.data;
            let options2 = CrackDetail2.options;

            loader.createSheet({
                el: 'sheetTable4',
                options: options2,
                data: data2
            }).then((sheet) => {
                SHEET_ID = sheet.id
                sheet.bind("onClick", function(evtParam) {
                    if(evtParam.col == "case4" && evtParam.event.target.tagName == "BUTTON"){ // case4: 보수업체
                        //ts.$root.$emit('bv::show::modal', 'CompanySelect')

                       // let data = CompanySelect.data;
                        //let options = CompanySelect.options;

                        setTimeout(function() {
                            loader.createSheet({
                                el: 'popsheetTable',
                                options: options,
                                data: data
                            }).then((sheet) => {
                                SHEET_ID = sheet.id
                            })
                        }, 100)
                    }
                })
            });

        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
            // left_content show & hide event
            closeBtn: function(e) {
                var getElement = e.target.parentElement.parentElement.parentElement;
                // console.log(getElement)
                if(getElement.className == "tab_area submenu_on"){
                    getElement.classList.remove('submenu_on')
                }
            },
        }
    }
</script>