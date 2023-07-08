<template>
   <div class="wrap">
    <div class="tab_contents">
        <h2 class="sub_title pb20">균열 리스트</h2>
        <div class="tab_area">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="4%">
                        <col width="23%">
                        <col width="6%">
                        <col width="24%">
                        <col width="4%">
                        <col width="24%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>타설번호</th>   
                            <td><input type="text" class="form_control size_md" placeholder="입력해주세요"></td>
                            <th>구조물위치</th>
                            <td><input type="text" class="form_control size_md" placeholder="입력해주세요"></td>
                            <th>타설부위</th>   
                            <td><input type="text" class="form_control size_md" placeholder="입력해주세요"></td>
                            <td class="ar">
                                <button type="button" class="btn_reset">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>차수</th>
                            <td><input type="text" class="form_control size_md" placeholder="입력해주세요"></td>
                            <th>차수</th>
                            <td>
                                <select name="" id="" class="form_control size_md">
                                    <option value="">1차</option>
                                    <option value="">2차</option>
                                    <option value="">3차</option>
                                    <option value="">보수</option>
                                    <option value="">4차</option>
                                </select>
                            </td>
                            <th>진행상황</th>
                            <td>
                                <select name="" id="" class="form_control size_md">
                                    <option value="">전체</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray">균열관리대장</button>
                        <button type="button" class="btn btn_sm btn_darkgray">QR코드 일괄출력</button>
                        <button type="button" class="btn btn_sm btn_darkgray">타설복사</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div id="sheetTable" class="ibsheet_table"></div>
                </div>
            </div>
        </div>
    </div>
   </div>
</template>

<script>
   import loader from '@ibsheet/loader'
   import { CrackList2 } from '../../common/data/MaterialsList'

   let SHEET_ID = '';

   export default {
        name: 'SQMS_WS02_002_10',
        components: {
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
            }
        },
        mounted() {
            let data = CrackList2.data;
            let options = CrackList2.options;

            loader.createSheet({
                el: 'sheetTable',
                data: data,
                options: options,
            }).then((sheet) => {
                SHEET_ID = sheet.id
            });
            

        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
        }
   }
</script>