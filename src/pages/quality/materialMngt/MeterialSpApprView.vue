<template>
   <div class="wrap">
       <div class="tab_contents">
            <h2 class="sub_title">자재공급원 승인 상세보기</h2>
            <div class="inner">
                <div class="data_num">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="86">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>문서번호</th>
                                <td>EHKR2101-공통-자재승인-2021-187</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="lst_data">
                    <p class="data_tit">1. 발주TYPE</p>
                    <div class="line_box">
                        <label class="input_radio" for="rdoSolar1">
                            <input type="radio" id="rdoSolar1" name="birthday_type" checked="">
                            <span class="label_text">당사 지급</span>
                        </label>
                        <label class="input_radio" for="rdoSolar2">
                            <input type="radio" id="rdoSolar2" name="birthday_type" checked="">
                            <span class="label_text">발주자</span>
                        </label>
                        <label class="input_radio" for="rdoSolar3">
                            <input type="radio" id="rdoSolar3" name="birthday_type" checked="">
                            <span class="label_text">협력자</span>
                        </label>
                    </div>

                    <p class="data_tit">2. 자재 정보</p>
                    <div class="table_normal_list table_write align_center">
                        <table>
                            <colgroup>
                                <col width="7%">
                                <col width="15%">
                                <col width="15%">
                                <col width="15%">
                                <col width="22%">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>공종</th>
                                    <th>세부공종</th>
                                    <th>품명</th>
                                    <th>공급업체(ERP연계)</th>
                                    <th>제조업체</th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>건축</td>
                                    <td>철근콘크리트공사</td>
                                    <td>이혈철근</td>
                                    <td>000건업</td>
                                    <td>000철근</td>
                                    <td>비고 내용</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <p class="data_tit">3. 주소</p>
                    <textarea name="" id="" class="form_control textarea" placeholder="ERP 공급업체주소자동불러오기, 수정가능"></textarea>

                    <p class="data_tit">4. 인증여부</p>
                    <div class="line_box">
                        <div class="multi_form">
                            <label class="input_radio" for="rdoSolar4">
                                <input type="radio" id="rdoSolar4" name="birthday_type2" checked="">
                                <span class="label_text">KS</span>
                            </label>
                            <input type="text" class="form_control" placeholder="인증번호/규격번호" value="KS203465" disabled>
                        </div>
                        <label class="input_radio" for="rdoSolar4">
                            <input type="radio" id="rdoSolar4" name="birthday_type2">
                            <span class="label_text">비 KS</span>
                        </label>
                    </div>
                    <div class="line_box check_area">
                        <label class="input_check">
                            <input type="checkbox" id="" name=""  checked="">
                            <span class="label_text">환경표지</span>
                        </label>
                        <label class="input_check">
                            <input type="checkbox" id="" name="">
                            <span class="label_text">GR인증</span>
                        </label>
                        <label class="input_check">
                            <input type="checkbox" id="" name="">
                            <span class="label_text">HB인증</span>
                        </label>
                    </div>

                    <p class="data_tit">5. 품명/ 규격/ 설계량</p>
                    <!-- ibsheet -->
                    <div class="ib_wrap">
                        <div id="popsheetTable" class="ibsheet_table"></div>
                    </div>

                    <p class="data_tit">6. 시공자 의견</p>
                    <pre class="form_control">국세/지방세납부증명서당해년도로첨부해주십시오<br>국세/지방세납부증명서당해년도로첨부해주십시오..</pre>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
   import loader from '@ibsheet/loader';
   import { MaterialApproval } from '@/pages/common/data/MaterialsList';

   let SHEET_ID = '';

   export default {
        name: 'MeterialSpApprView',
        components: {
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'] // tab name
            }
        },
        mounted() {
            let data = MaterialApproval.data;
            let options = MaterialApproval.options;

            setTimeout(function() {
                loader.createSheet({
                    el: 'popsheetTable',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    SHEET_ID = sheet.id
                });
            }, 100)
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
        }
   }
</script>