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
                        <button type="button" class="btn btn_sm btn_excel">본사 표준안 가져오기</button>
                        <button type="button" class="btn btn_sm btn_excel" v-b-modal.ProjectLoad @click="sheetLoad">타 프로젝트 가져오기</button>
                        <div class="fr"> 
                            <button type="button" class="btn btn_sm btn_darkgray">행 복사</button>
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

        <div class="tab_area" v-show="currentTab == 1">
            <div class="inner">
                <div class="button_box">
                    <h2>결재방식 선택</h2>
                    <button type="button" class="btn btn_sm btn_darkblue">저장</button>
                </div>
                <div class="table_normal_list opt_payment">
                    <table>
                        <colgroup>
                            <col width="137">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>
                                    <label class="input_radio" for="rdoLunar1">
                                        <input type="radio" id="rdoLunar1" name="birthday_type" checked="">
                                        <span class="label_text">온라인</span>
                                    </label>
                                </td>
                                <td>결재 문서의 결재 라인 모두 온라인 결재 진행</td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="input_radio" for="rdoLunar2">
                                        <input type="radio" id="rdoLunar2" name="birthday_type">
                                        <span class="label_text">50% 온라인</span>
                                    </label>
                                </td>
                                <td>결재 문서의 결재 라인 중 현장 소장까지만 온라인 결재</td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="input_radio" for="rdoLunar3">
                                        <input type="radio" id="rdoLunar3" name="birthday_type">
                                        <span class="label_text">오프라인</span>
                                    </label>
                                </td>
                                <td>전체 오프라인 결재</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="tab_area" v-show="currentTab == 2">
            <div class="lst_tabs_in">
                <ul>
                    <li v-for="(tab, index) in tabsInner" v-bind:class="{active:currentTabInner===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTabInner=index">{{tab}}</a></li>
                </ul>
            </div>
            <div class="tab_area_in" v-show="currentTabInner == 0">
                <div class="inner">
                    <div class="button_box">
                        <h2>자재공급원승인(요청)Numbering</h2>
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray">저장</button>
                        </div>
                    </div>
                    <div class="button_box mt10">
                        <span>Sequence Number</span>
                        <select name="" id="" class="form_control num">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                        </select>
                        <span>Preview : <span class="point_color">CUKR1303-건축-자재승인-2021-0001</span></span>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray">추가</button>
                            <button type="button" class="btn btn_sm btn_darkgray">삭제</button>
                        </div>
                    </div>

                    <div class="ib_wrap">
                        <div id="sheetTable2" class="ibsheet_table"></div>
                    </div>

                    <div class="button_box">
                        <h2>Numbering 히스토리</h2>
                    </div>
                    <div class="ib_wrap">
                        <div id="sheetTable3" class="ibsheet_table"></div>
                    </div>
                </div>
            </div>
            <div class="tab_area_in" v-show="currentTabInner == 1"></div>
            <div class="tab_area_in" v-show="currentTabInner == 2"></div>
            <div class="tab_area_in" v-show="currentTabInner == 3"></div>
        </div>

        <!-- 타 프로젝트 데이터 가져오기 (자재분류체계) 팝업 -->
        <b-modal id="ProjectLoad" title="타 프로젝트 데이터 가져오기 (자재분류체계)" hide-footer
            modal-class="single_page" size="full"
            :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="tab_contents">
                        <div class="tab_area submenu_on">
                            <div class="lookup_box">
                                <table>
                                    <colgroup>
                                        <col width="70">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>프로젝트명</th>
                                            <td>
                                                <div class="search_area">
                                                    <input type="text" placeholder="검색" class="form_control">
                                                    <button type="button" class="btn_search">검색</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <TabList /> 

                            <div class="right_content">
                                <div class="inner">
                                    <div class="button_box">
                                        <button type="button" class="btn btn_sm btn_excel">전체 가져오기</button>
                                        <button type="button" class="btn btn_sm btn_darkgray">선택 가져오기</button>
                                    </div>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="popsheetTable" class="ibsheet_table"></div>
                                    </div>
                                    
                                    <div class="button_box ac">
                                        <button type="button" class="btn btn_lg btn_outline btn_darkgray"  @click="$bvModal.hide('ProjectLoad')">닫기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </b-modal>

        <!-- 인수검사 Check List 팝업 -->
        <b-modal id="ChecklistWrite" title="인수검사 Check List" 
            hide-backdrop size="lg" 
            :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list align_center">
                        <table>
                            <colgroup>
                                <col width="15%">
                                <col width="*">
                                <col width="*">
                                <col width="15%">
                                <col width="15%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>공종</th>
                                    <th>세부공종</th>
                                    <th>품명</th>
                                    <th>등록일자</th>
                                    <th>개정번호</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>공통</td>
                                    <td>토공사 및 기초공사</td>
                                    <td>성토용 흙</td>
                                    <td>2021-11-11</td>
                                    <td>Rev. 0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel">엑셀 다운로드</button>
                    </div>

                    <div class="ib_wrap">
                        <div id="popsheetTable2" class="ibsheet_table"></div>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide }" -->
                <b-button class="btn btn_md btn_outline btn_darkgray">등록</b-button>
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 공장검사 Check List 팝업 -->
        <b-modal id="ChecklistWrite2" title="공장검사 Check List"  hide-footer
            hide-backdrop size="lg" 
            :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list align_center">
                        <table>
                            <colgroup>
                                <col width="15%">
                                <col width="*">
                                <col width="*">
                                <col width="15%">
                                <col width="15%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>공종</th>
                                    <th>세부공종</th>
                                    <th>품명</th>
                                    <th>등록일자</th>
                                    <th>개정번호</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>공통</td>
                                    <td>토공사 및 기초공사</td>
                                    <td>성토용 흙</td>
                                    <td>2021-11-11</td>
                                    <td>Rev. 0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel">엑셀 다운로드</button>
                    </div>

                    <div class="ib_wrap">
                        <div id="popsheetTable3" class="ibsheet_table"></div>
                    </div>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import TabList from '@/pages/common/frame/TabList.vue';
    import loader from '@ibsheet/loader';
    import { Material3, Material4, Material5, MaterialChecklist, MaterialChecklist2 } from '@/pages/common/data/MaterialsList';

    let SHEET_ID = '';

    export default {
        name: 'SiteSetUpSheet',
        components: {
            TabList
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['자재분류체계 및 Check List 등록', '결재 옵션', 'Numbering'], // tab name
                currentTabInner: 0, // 기본 current 값 지정 
                tabsInner: ['자재공급원(요청)', '자재공급원(통보)', '인수검사', '공장검사'],
            }
        },
        mounted() {
            let data = Material3.data;
            let options = Material3.options;

            loader.createSheet({
                el: 'sheetTable',
                data: data,
                options: options,
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });

            let data2 = Material4.data;
            let options2 = Material4.options;
            loader.createSheet({
                el: 'sheetTable2',
                data: data2,
                options: options2,
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });
            
            let data3 = Material5.data;
            let options3 = Material5.options;
            loader.createSheet({
                el: 'sheetTable3',
                data: data3,
                options: options3,
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });
            
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
            sheetLoad: function() {
                let ts = this;

                let data = Material3.data;
                let options = Material3.options;
                
                setTimeout(function() {
                    /* 팝업 아이비시트 */
                    loader.createSheet({
                        el: 'popsheetTable',
                        options: options,
                        data: data
                    }).then((sheet) => {
                        SHEET_ID = sheet.id

                        sheet.bind("onClick", function(evtParam) {
                            if(evtParam.col == "case9" && evtParam.event.target.tagName == "BUTTON"){ // case9: 인수검사 Check List
                                ts.$root.$emit('bv::show::modal', 'ChecklistWrite')

                                setTimeout(function() {
                                    let data = MaterialChecklist.data;
                                    let options = MaterialChecklist.options;

                                    loader.createSheet({
                                        el: 'popsheetTable2',
                                        options: options,
                                        data: data
                                    }).then((sheet) => {
                                        SHEET_ID = sheet.id
                                    });
                                }, 100);
                            }
                            if(evtParam.col == "case11" && evtParam.event.target.tagName == "BUTTON"){ // case11: 공장검사 Check List
                                ts.$root.$emit('bv::show::modal', 'ChecklistWrite2')

                                setTimeout(function() {
                                    let data = MaterialChecklist2.data;
                                    let options = MaterialChecklist2.options;

                                    loader.createSheet({
                                        el: 'popsheetTable3',
                                        options: options,
                                        data: data
                                    }).then((sheet) => {
                                        SHEET_ID = sheet.id
                                    });
                                }, 100);
                            }
                        }) 
                    });
                }, 100);
            }
        }
    }
</script>