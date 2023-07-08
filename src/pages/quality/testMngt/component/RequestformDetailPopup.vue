<template>
    <b-modal id="RequestformDetail" title="의뢰서 보기" 
            hide-backdrop size="lg"
            :footer-bg-variant="footerBg">
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print">출력</button>
                    </div>
                </div>

                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="15%">
                            <col width="*">
                            <col width="15%">
                            <col width="*">
                            <col width="15%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>문서번호</th>
                                <td colspan="5"></td>
                            </tr>
                            <tr>
                                <th>구분 <br> [대분류]</th>
                                <td>공통</td>
                                <th>공종 <br> [중분류]</th>
                                <td>가설기자재</td>
                                <th>종별 <br> [소분류]</th>
                                <td>강관비계용 부재</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="7%">
                            <col width="8%">
                            <col width="*">
                            <col width="15%">
                            <col width="*">
                            <col width="15%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th colspan="2">시험 · 검사종목</th>
                                <td colspan="5">
                                    <p>(비계용강관)인장하중 / (강관조인트)인장하중 / (강관조인트)휨하중 / (강관조인트)압축하중</p>
                                    *  △△ 시멘트㈜
                                </td>
                            </tr>
                            <tr>
                                <th colspan="2">시료명</th>
                                <td colspan="2"></td>
                                <th>시료량</th>
                                <td colspan="2">
                                    2<span class="ml30 mr10">채취일:</span>: 2021-11-23 
                                </td>
                            </tr>
                            <tr>
                                <th colspan="2">시료 또는 자재 생산국</th>
                                <td colspan="2">대한민국</td>
                                <th>시료 채취 장소</th>
                                <td colspan="2">경기도 고양시 덕은 도시개발구역 내 업 2,3블럭</td>
                            </tr>
                            <tr>
                                <th colspan="2">시료 채취자</th>
                                <td colspan="5" class="cell_division">
                                    <ul>
                                        <li>
                                            <strong>소속</strong>
                                            <span>현대엔지니어링(주)</span>
                                        </li>
                                        <li>
                                            <strong>담당업무</strong>
                                            <span>품질관리</span>
                                        </li>
                                        <li>
                                            <strong>소속</strong>
                                            <span>김현대</span>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th colspan="2">입회자</th>
                                <td colspan="5" class="cell_division">
                                    <ul>
                                        <li>
                                            <strong>소속</strong>
                                            <span>현대엔지니어링(주)</span>
                                        </li>
                                        <li>
                                            <strong>담당업무</strong>
                                            <span>품질관리</span>
                                        </li>
                                        <li>
                                            <strong>소속</strong>
                                            <span>김현대</span>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th colspan="2">시험 및 시방기준</th>
                                <td colspan="5">KS F 3110 / KS M 1998</td>
                            </tr>
                            <tr>
                                <th colspan="2">성과 이용 목적</th>
                                <td colspan="5">품질관리(시험)</td>
                            </tr>
                            <tr>
                                <th rowspan="3" colspan="2">공사개요</th>
                                <th>공사명</th>
                                <td colspan="4">고양시 덕은지구 복합시설 신축공사</td>
                            </tr>
                            <tr>
                                <th>착공일</th>
                                <td colspan="4">2019-04-30</td>
                            </tr>
                            <tr>
                                <th>준공예정일</th>
                                <td colspan="4">2019-04-30</td>
                            </tr>
                            <tr>
                                <th colspan="2">발주자</th>
                                <td colspan="2">현대자동차(주)</td>
                                <th>시공자</th>
                                <td colspan="2">현대엔지니어링(주)</td>
                            </tr>
                            <tr>
                                <th colspan="2">국가중요시설 여부</th>
                                <td colspan="5">해당 없음</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            
                <!-- 접수증 -->
                <p class="ac mt20">================================= 자르는 선 =================================</p>
                <div class="receipt">
                    <h3>접수증</h3>
                    <ul>
                        <li>1. 접수일 : 2021-12-01</li>
                        <li>2. 의뢰 시험 · 검사 종목 : (비계용강관)인장하중 / (강관조인트)인장하중 / (강관조인트)휨하중 / (강관조인트)압축하중</li>
                        <li>3. 시료명 및 시료량 : 강관비계용 부재 / 2</li>
                        <li>귀하께서 의뢰한 시험 · 검사 요청 건은 접수일부터 약 <input type="text" class="form_control num"> 일이 걸릴 예정임을 알려드리며 이 접수증을 발급합니다.</li>
                    </ul>
                    <div class="signature">
                        <p>접수자 : 김현대 <span>(건설엔지니어링 사업자)</span></p>
                        <p>성명 : 홍길동 <span>(서명 또는 인)</span></p>
                    </div>
                </div>                
        </div>
        </template>
            <template #modal-footer="{ hide }">
            <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">선택</b-button> -->
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
export default {
    name: 'RequestformWrite',
    data() {
        return {
            footerBg: 'transparent',
        }
    },
    methods: {
        
    },
}
</script>

<style>

</style>