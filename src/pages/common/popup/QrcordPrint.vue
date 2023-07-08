<template>
    <!-- 세대옵션 QR 코드 팝업 -->
    <b-modal id="QrcordPrint" title="세대옵션 QR 코드"
        hide-backdrop size="lg"
        v-bind:footer-bg-variant="footerBg" >
        <template #default>
            <div class="pop_container" id="printQR">
                <h2 class="sub_title">고양시 덕은지구 복합시설 신축공사</h2>
                <div class="lst_qrcord">
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
                </div>
            </div>
        </template>
            <template #modal-footer="{ hide }"> 
            <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" v-on:click="fnPrintCode">출력</button>
            <button type="button" class="btn btn_md btn_outline btn_gray" v-on:click="hide('forget')">닫기</button>
        </template>
    </b-modal>
</template>

<script>
    //import loader from '@ibsheet/loader'
    // import printJS from 'print-js'

    //let SHEET_ID = '';

    export default {
        name: 'QrcordPrint',
        data() {
            return {
                footerBg: 'transparent',
                popMsg: '',
                confirmUse: false,
                popId: 'QrPrintAlert'
            }
        },
        beforeDestroy() {
            //loader.removeSheet(SHEET_ID)
        },
        methods: {
            fnPrintCode: function() {
                //printJS('printArea','html');
                
                // printJS({
                //     printable:'printArea',
                //     type:'html', 
                //     css: ['@/assets/scss/_index.scss'], 
                //     scanStyles : false
                // });

                // Get HTML to print from element
                const prtHtml = document.getElementById('printQR').innerHTML;

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
                        ${prtHtml}
                    </body>
                </html>`);

                //WinPrint.focus();
                WinPrint.print();
                // WinPrint.document.focus();
                WinPrint.document.close();
                setTimeout(function () { WinPrint.focus(); WinPrint.close(); }, 100);
            }
        }
    }
</script>