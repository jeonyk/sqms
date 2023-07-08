<template>
<!-- 세대옵션 정보 팝업 -->
    <b-modal id="HoldOption" title="세대옵션 정보"
        hide-backdrop size="lg"
        v-bind:footer-bg-variant="footerBg" >
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" v-b-modal.QrcordPrint>QR코드출력</button>
                    </div>
                </div>
                <div class="table_normal_list align_center">
                    <table>
                        <colgroup>
                            <col width="20%">
                            <col width="20%">
                            <col width="20%">
                            <col width="20%">
                            <col width="*">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>동</th>
                                <th>호수</th>
                                <th>주택형</th>
                                <th>등록일</th>
                                <th>수정일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>101동</td>
                                <td>102호</td>
                                <td>59 Type</td>
                                <td>2021-05-21</td>
                                <td>2021-06-30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <div class="fr">
                        <select name="" id="" class="form_control num">
                            <option value="">1차</option>
                            <option value="">2차</option>
                        </select>
                    </div>
                </div>
                <div class="table_normal_list">
                    <table>
                            <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="25%">
                            <col width="*">
                            <col width="25%">
                            <col width="*">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>옵션</th>
                                <th>1차(2021.05.10)</th>
                                <th>2차((2021.06.10)</th>
                                <th>변동유무</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>가구</td>
                                <td>-</td>
                                <td>안방 붙박이장</td>
                                <td>O</td>
                            </tr>
                            <tr>
                                <td>가구</td>
                                <td>-</td>
                                <td>안방 붙박이장</td>
                                <td>O</td>
                            </tr>
                            <tr>
                                <td>가구</td>
                                <td>-</td>
                                <td>안방 붙박이장</td>
                                <td>O</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <QrcordPrint />
            </div>
        </template>
            <template #modal-footer="{ ok }"> 
            <b-button class="btn btn_lg btn_outline btn_blue" v-on:click="ok">확인</b-button>
            <!-- <b-button class="btn btn_lg btn_outline btn_blue" @click="hide('forget')">닫기</b-button> -->
        </template>
    </b-modal>
</template>

<script>
//import loader from '@ibsheet/loader'

import QrcordPrint from '@/pages/common/popup/QrcordPrint.vue'
//import printJS from 'print-js' 

//Vue.use(printJS);

//let SHEET_ID = '';

export default {
    name: 'HoldOption',
    components: {
        QrcordPrint
    },
    data() {
        return {
            footerBg: 'transparent',
        }
    },
    beforeDestroy() {
        //loader.removeSheet(SHEET_ID)
    },
}
</script>