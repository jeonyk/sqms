<template>
    <!-- 세대옵션 QR코드 출력(옵션있음, 옵션없음) 팝업(일괄출력) -->
    <b-modal id="QrcordPrintAll" title="세대옵션 QR 코드" hide-footer
        modal-class="single_page" size="xl"
        v-bind:footer-bg-variant="footerBg">
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="lst_tabs_round p20">
                        <ul class="">
                            <li v-for="(tab, index) in tabsRound2" v-bind:class="{active:popcurrentTabRound2===index}" v-bind:key="index"><a href="javascript:void(0);" v-on:click="popcurrentTabRound2=index">{{tab}}</a></li>
                        </ul>
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" v-on:click="fnPrintAll">출력</button>
                        </div>
                    </div>
                    
                    <div class="tab_area_round" v-if="popcurrentTabRound2 == 0" id="printArea">
                        <div class="inner">
                            <div class="table_normal_list lst_qrcord">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="25%">
                                        <col width="25%">
                                        <col width="25%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td rowspan="2">
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                                <div class="table_normal_list">
                                                    <table>
                                                            <caption class="sr_only">제목</caption>
                                                        <colgroup>
                                                            <col width="30%">
                                                            <col width="*">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>옵션그룹명</th>
                                                                <th>옵션품목명</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>침실1 화장대</td>
                                                                <td>화장대(입식)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>발코니확장</td>
                                                                <td>(일반)기본확장형</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                                <div class="table_normal_list">
                                                    <table>
                                                            <caption class="sr_only">제목</caption>
                                                        <colgroup>
                                                            <col width="30%">
                                                            <col width="*">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>옵션그룹명</th>
                                                                <th>옵션품목명</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>침실1 화장대</td>
                                                                <td>화장대(입식)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>발코니확장</td>
                                                                <td>(일반)기본확장형</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                                <div class="table_normal_list">
                                                    <table>
                                                            <caption class="sr_only">제목</caption>
                                                        <colgroup>
                                                            <col width="30%">
                                                            <col width="*">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>옵션그룹명</th>
                                                                <th>옵션품목명</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>침실1 화장대</td>
                                                                <td>화장대(입식)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>발코니확장</td>
                                                                <td>(일반)기본확장형</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                                <div class="table_normal_list">
                                                    <table>
                                                            <caption class="sr_only">제목</caption>
                                                        <colgroup>
                                                            <col width="30%">
                                                            <col width="*">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>옵션그룹명</th>
                                                                <th>옵션품목명</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>침실1 화장대</td>
                                                                <td>화장대(입식)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>발코니확장</td>
                                                                <td>(일반)기본확장형</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                                <div class="table_normal_list">
                                                    <table>
                                                            <caption class="sr_only">제목</caption>
                                                        <colgroup>
                                                            <col width="30%">
                                                            <col width="*">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>옵션그룹명</th>
                                                                <th>옵션품목명</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>침실1 화장대</td>
                                                                <td>화장대(입식)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>발코니확장</td>
                                                                <td>(일반)기본확장형</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                                <div class="table_normal_list">
                                                    <table>
                                                            <caption class="sr_only">제목</caption>
                                                        <colgroup>
                                                            <col width="30%">
                                                            <col width="*">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>옵션그룹명</th>
                                                                <th>옵션품목명</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>침실1 화장대</td>
                                                                <td>화장대(입식)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>발코니확장</td>
                                                                <td>(일반)기본확장형</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                                <div class="table_normal_list">
                                                    <table>
                                                            <caption class="sr_only">제목</caption>
                                                        <colgroup>
                                                            <col width="30%">
                                                            <col width="*">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>옵션그룹명</th>
                                                                <th>옵션품목명</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>침실1 화장대</td>
                                                                <td>화장대(입식)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>발코니확장</td>
                                                                <td>(일반)기본확장형</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                            <tr>
                                                                <td>빌트인가전</td>
                                                                <td>(공통)빌트인 김치냉장고 삼성</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="board_paging">
                                <ul>
                                    <li class="paging_first"><a href="javascript:void(0);">paging_first</a></li>
                                    <li class="active"><a href="javascript:void(0);">1</a></li>
                                    <li><a href="javascript:void(1);">2</a></li>
                                    <li><a href="javascript:void(0);">3</a></li>
                                    <li><a href="javascript:void(0);">4</a></li>
                                    <li><a href="javascript:void(0);">5</a></li>
                                    <li><a href="javascript:void(0);">6</a></li>
                                    <li><a href="javascript:void(0);">7</a></li>
                                    <li><a href="javascript:void(0);">8</a></li>
                                    <li><a href="javascript:void(0);">9</a></li>
                                    <li><a href="javascript:void(0);">10</a></li>
                                    <li class="paging_last"><a href="javascript:void(0);">paging_last</a></li>
                                </ul> <!-- // board_paging -->
                            </div>
                        </div>
                    </div>

                    <div class="tab_area_round" v-else-if="popcurrentTabRound2 == 1" id="printArea">
                        <div class="inner">
                            <div class="table_normal_list lst_qrcord">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="25%">
                                        <col width="25%">
                                        <col width="25%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td rowspan="2">
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="qr_title">고양시 덕은지구 복합시설 신축공사</p>
                                                <p class="qr_name">
                                                    <img src="@/assets/img/layout/qrcord_thema.png" alt="qrcord">
                                                    <strong>59 Type  101동 102호</strong>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="board_paging">
                                <ul>
                                    <li class="paging_first"><a href="javascript:void(0);">paging_first</a></li>
                                    <li class="active"><a href="javascript:void(0);">1</a></li>
                                    <li><a href="javascript:void(1);">2</a></li>
                                    <li><a href="javascript:void(0);">3</a></li>
                                    <li><a href="javascript:void(0);">4</a></li>
                                    <li><a href="javascript:void(0);">5</a></li>
                                    <li><a href="javascript:void(0);">6</a></li>
                                    <li><a href="javascript:void(0);">7</a></li>
                                    <li><a href="javascript:void(0);">8</a></li>
                                    <li><a href="javascript:void(0);">9</a></li>
                                    <li><a href="javascript:void(0);">10</a></li>
                                    <li class="paging_last"><a href="javascript:void(0);">paging_last</a></li>
                                </ul> <!-- // board_paging -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </b-modal>
</template>

<script>
    //import loader from '@ibsheet/loader'
    // import printJS from 'print-js' 

    //let SHEET_ID = '';

    export default {
        name: 'QrcordPrintAll',
        data() {
            return {
                footerBg: 'transparent',
                tabsRound2: ['옵션있음', '옵션없음'],
                popcurrentTabRound2: 0, // 기본 current 값 지정 
            }
        },
        beforeDestroy() {
            //loader.removeSheet(SHEET_ID)
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
            fnPrintAll: function(){
                //printJS('printArea','html');
                
                // printJS({
                //     printable:'printArea',
                //     type:'html', 
                //     css: ['@/assets/scss/_index.scss'], 
                //     scanStyles : false
                // });

                // Get HTML to print from element(remove paging)
                document.getElementsByClassName('board_paging')[0].style.display = "none";

                const prtHtml = document.getElementById('printArea').innerHTML;

                // Get all stylesheets HTML
                let stylesHtml = '';
                for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
                }

                // Open the print window
                const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

                WinPrint.document.write(`<!DOCTYPE html>
                <html>
                    <head>
                        ${stylesHtml}
                    </head>
                    <body>
                    <div class="pop_container">
                        <div class="tab_contents">
                            ${prtHtml}
                        </div>
                    </div>
                    </body>
                </html>`);
                
                
                //WinPrint.focus();
                WinPrint.print();
                // WinPrint.document.focus();
                WinPrint.document.close();
                document.getElementsByClassName('board_paging')[0].style.display = "block";
                setTimeout(function () { WinPrint.focus(); WinPrint.close(); }, 100);
            }
        }
    }
</script>