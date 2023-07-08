<!--
    업무 : 주간업무보고
    2022.05.07
 -->
<template>
    <!-- 보고서 작성 팝업 -->
    <b-modal :id="refId" title="보고서 작성" modal-class="single_page" size="xl" hide-footer :footer-bg-variant="footerBg" no-close-on-backdrop @shown="loadPopup">
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="inner pb0">
                        <h2 class="button_box">
                            <h2>상세보기</h2>
                            <div class="fr">
                                <button class="btn btn_md btn_outline btn_darkgray" v-if="lst_steps_num === 8 && detailInfo.progrsStatus !== '1' " @click="clickApproval()">결재상신</button>
                                <!-- <button class="btn btn_md btn_outline btn_darkgray btn_print">출력</button> -->
                            </div>
                        </h2>
                    </div>

                    <div class="lst_steps">
                        <ul>
                            <li v-for="(item, index) in lst_steps" :key="index" v-bind:class="{active: lst_steps_num === index, complete: lst_steps_num > index}">{{item}}</li>
                        </ul>
                    </div>

                    <!-- 표지 -->
                    <div class="steps_area" v-show="lst_steps_num == 0">
                        <div class="inner">
                            <h2 class="sub_title">표지
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 1">다음단계</button>
                                </div>
                            </h2>
                            <div class="button_box" v-if="detailInfo.progrsStatus !== '1'">
                                <div class="fr">
                                    <span class="ico  ">저장됨</span>
                                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveDocInfo()">저장</button>
                                </div>
                            </div>

                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="12%">
                                        <col width="*">
                                        <col width="12%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr> 
                                            <th><span class="emp_red">문서제목</span></th>
                                            <td colspan="4">
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.docTitle" class="form_control">
                                                </span>
                                                <span v-else>{{ detailInfo.docTitle }}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><span class="emp_red">부제목</span></th>
                                            <td colspan="4">
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.subTitle" class="form_control">
                                                </span>
                                                <span v-else>{{ detailInfo.subTitle }}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><span class="emp_red">일자</span></th>
                                            <td colspan="4">
                                                <span v-if="detailInfo.progrsTxt !== '1'">
                                                    <Datepicker v-model="detailInfo.writngDt" :input-style="{width: '100%;'}" :format="'YYYYMMDD'"/>
                                                </span>
                                                <span v-else>{{ $moment(detailInfo.writngDt).format('YYYY-MM-DD') }}</span>
                                                <!-- <span v-else>{{ detailInfo.writngDt }}</span> -->
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><span class="emp_red">구분</span></th>
                                            <td colspan="4">
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <label class="input_radio" for="optnType1">
                                                        <input type="radio" id="optnType1" name="optn_type" v-model="detailInfo.optnType" value="PRSS">
                                                        <span class="label_text">의사결정</span>
                                                    </label>
                                                    <label class="input_radio" for="optnType2">
                                                        <input type="radio" id="optnType2" name="optn_type" v-model="detailInfo.optnType" value="INFO">
                                                        <span class="label_text">정보전달</span>
                                                    </label>
                                                    <label class="input_radio" for="optnType3">
                                                        <input type="radio" id="optnType3" name="optn_type" v-model="detailInfo.optnType" value="DRCT">
                                                        <span class="label_text">지시사항</span>
                                                    </label>
                                                </span>
                                                <span v-else>{{ detailInfo.optnType == 'PRSS' ? '의사결정' : detailInfo.optnType == 'INFO' ? '정보전달' : detailInfo.optnType == 'DRCT' ? '지시사항':''}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th rowspan="4">협조</th>
                                            <td class="ac">공무</td>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.ofcs" class="form_control medium">
                                                </span>
                                                <span v-else>{{detailInfo.ofcs}}</span>
                                            </td>
                                            <td class="ac">전기</td>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.elcty" class="form_control medium">
                                                </span>
                                                <span v-else>{{detailInfo.elcty}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="ac">관리</td>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.mngt" class="form_control medium">
                                                </span>
                                                <span v-else>{{detailInfo.mngt}}</span>
                                            </td>
                                            <td class="ac">토목</td>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.engrk" class="form_control medium">
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="ac">건축</td>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.bildng" class="form_control medium">
                                                </span>
                                                <span v-else>{{detailInfo.bildng}}</span>
                                            </td>
                                            <td class="ac">품질</td>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.qlity" class="form_control medium">
                                                </span>
                                                <span v-else>{{detailInfo.qlity}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="ac">설비</td>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.eqp" class="form_control medium">
                                                </span>
                                                <span v-else>{{detailInfo.eqp}}</span>
                                            </td>
                                            <td class="ac">안전</td>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <input type="text" v-model="detailInfo.safe" class="form_control medium">
                                                </span>
                                                <span v-else>{{detailInfo.safe}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>지시사항</th>
                                            <td colspan="4">
                                                <div class="input_text">
                                                    <span v-if="detailInfo.progrsStatus !== '1'">
                                                        <textarea v-model="detailInfo.drctMatter" class="form_control"></textarea>
                                                        <div class="num"><strong class="count">{{detailInfo.drctMatter.length}}</strong>/200</div>
                                                    </span>
                                                    <span v-else>{{detailInfo.drctMatter}}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- 목차 -->
                    <div class="steps_area" v-show="lst_steps_num == 1">
                        <div class="inner">
                            <h2 class="sub_title">목차
                                <div class="fr">
                                    <!-- <span class="ico ico_save">저장됨</span> -->
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 0">이전단계</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 2">다음단계</button>
                                    <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                                </div>
                            </h2>

                            <div class="report_contents">
                                <dl>
                                    <dt>1. 전년도 경영검토 조치이행 상황</dt>
                                    <dt>2. 내/외부 이슈 및 고객만족 피드백</dt>
                                    <dt>3. 현장 품질방침 및 목표 / 운영성과 측정지표</dt>
                                    <dt>4. 공사 운영성과 이행분석 검토서</dt>
                                    <dd>
                                        <ul>
                                            <li>4-1. 부적합 및 시정조치</li>
                                            <li>4-2. 모니터링 및 측정 결과</li>
                                            <li>4-3. 심사 결과</li>
                                            <li>4-4. 외부 공급자의 성과</li>
                                            <li>4-5. 자원의 충족성</li>
                                            <li>4-6. 리스크를 다루기 위한 조치의 효과성</li>
                                            <li>4-7. 개선 기회</li>
                                            <li>4-8. 기타 사항</li>
                                        </ul>
                                    </dd>
                                    <dt>5. 개선 도출 필요사항</dt>
                                    <dt>6. 차년도 계획 수립</dt>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <!-- 1. 전년도 경영검토 -->
                    <div class="steps_area" v-show="lst_steps_num == 2">
                        <div class="inner">
                            <h2 class="sub_title">전년도 경영검토 조치이행상황
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 1">이전단계</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 3">다음단계</button>
                                </div>
                            </h2>
                            <div class="button_box">
                                <strong>전년도 계획</strong>
                                <div class="fr" v-if="detailInfo.progrsStatus !== '1'">
                                    <span class="ico ico_save">저장됨</span>
                                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveMngmtExmnt()">저장</button>
                                </div>
                            </div>
                            
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>전년도 경영검토 총평</th>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <textarea v-model="detailInfo.prvyyPlanGenrvw" class="form_control"></textarea>
                                                </span>
                                                <span v-else>{{detailInfo.prvyyPlanGenrvw}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>향후 계획</th>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <textarea v-model="detailInfo.prvyyFutrPlan" class="form_control"></textarea>
                                                </span>
                                                <span v-else>{{detailInfo.prvyyFutrPlan}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="button_box">
                                <strong>전년도 계획대비 이행 현황</strong>
                            </div>

                                <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>전년도 경영검토 총평</th>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <textarea v-model="detailInfo.prvyyPlanProvsGenrvw" class="form_control"></textarea>
                                                </span>
                                                <span v-else>{{detailInfo.prvyyPlanProvsGenrvw}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>향후 계획</th>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <textarea v-model="detailInfo.prvyyProvsFutrPlan" class="form_control"></textarea>
                                                </span>
                                                <span v-else>{{detailInfo.prvyyProvsFutrPlan}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <!-- 2. 내/외부 이슈 -->
                    <div class="steps_area" v-show="lst_steps_num == 3">
                        <div class="inner">
                            <h2 class="sub_title">내,외부 이슈 및 고객만족 피드백
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 2">이전단계</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 4">다음단계</button>
                                </div>
                            </h2>
                            <div class="button_box">
                                <strong>내,외부 이슈/리스크</strong>
                                <div class="fr" v-if="detailInfo.progrsStatus !== '1'">
                                    <span class="ico ico_save">저장됨</span>
                                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveIssue()">저장</button>
                                </div>
                            </div>
                            
                            <div class="ib_wrap mt0">
                                <div id="popIssueSheet" class="ibsheet_table" :style="{'height': '238px'}"></div>

                                <!-- <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="*">
                                        <col width="*">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>이슈Type</th>
                                            <th>Risk</th>
                                            <th>기존의 관리</th>
                                            <th>필요한 추가 활동</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>내부</td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                        <tr>
                                            <td>외부</td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                    </tbody>
                                </table> -->
                            </div>

                            <div class="button_box">
                                <strong>이해관계자의 요구사항 및 관리방안</strong>
                            </div>

                            <div class="ib_wrap mt0">
                                <div id="popIssueMngtSheet" class="ibsheet_table" :style="{'height': '238px'}"></div>
                                <!-- <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="*">
                                        <col width="*">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>이슈Type</th>
                                            <th>Risk</th>
                                            <th>기존의 관리</th>
                                            <th>필요한 추가 활동</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>정부/지자체</td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                        <tr>
                                            <td>발주처/감리단</td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                        <tr>
                                            <td>임직원</td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                        <tr>
                                            <td>협력사</td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                        <tr>
                                            <td>노조</td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                            <td><input type="text" v-model="detailIssue" class="form_control"></td>
                                        </tr>
                                    </tbody>
                                </table> -->
                            </div>

                        </div>
                    </div>

                    <!-- 3. 현장품질방침 -->
                    <div class="steps_area" v-show="lst_steps_num == 4">
                        <div class="inner">
                            <h2 class="sub_title">현장 품질방침 및 목표, 운영성과 측정지표
                                <div class="fr">
                                    <!-- <span class="ico ico_save">저장됨</span> -->
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 3">이전단계</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 5">다음단계</button>
                                    <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                                </div>
                            </h2>
                            <div class="button_box">
                                <strong>현장 품질방침</strong>
                            </div>
                                <div class="step_box">
                                <b>현장 품질방침 사진 연동</b>
                            </div>

                            <div class="button_box">
                                <strong>현장 품질목표</strong>
                            </div>
                            <div class="step_box">
                                <b>현장 품질목표 사진 연동</b>
                            </div>
                        </div>
                    </div>

                    <!-- 4. 공사 운영성과 -->
                        <div class="steps_area" v-show="lst_steps_num == 5">
                            <div class="inner">
                            <h2 class="sub_title">공사 운영성과
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 4">이전단계</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 6">다음단계</button>
                                </div>
                            </h2>

                            <div class="tab_area submenu_on">
                                <div class="left_content">
                                    <div class="link_area">
                                        <ul class="depth_only">
                                            <li v-for="(item, index) in lst_steps_inner" :key="index" v-bind:class="{on: lst_steps_inner_num === index}"><a href="javascript:void(0)" v-on:click="lst_steps_inner_num = index">{{ item }}</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="right_content">
                                    <div class="inner">
                                        <!-- 부적합 및 시정조치 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 0">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>분류 별, 부적합 현황 (CAR/NCR/Punch)</strong>
                                            </div>
                                            <div class="step_box">
                                                <div class="table_normal_list align_center">
                                                    <table>
                                                        <caption class="sr_only"></caption>
                                                        <colgroup>
                                                            <col width="*">
                                                            <col width="*">
                                                            <col width="*">
                                                            <col width="*">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th>분류</th>
                                                                <th>Open</th>
                                                                <th>Close</th>
                                                                <th>완료%</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>NCR</td>
                                                                <td>{{ ncrData.openCnt }}</td>
                                                                <td>{{ ncrData.closeCnt }}</td>
                                                                <td>{{ ncrData.compRate }}%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>CAR</td>
                                                                <td>{{ carData.openCnt }}</td>
                                                                <td>{{ carData.closeCnt }}</td>
                                                                <td>{{ carData.compRate }}%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Punch</td>
                                                                <td>{{ punchData.openCnt }}</td>
                                                                <td>{{ punchData.closeCnt }}</td>
                                                                <td>{{ punchData.compRate }}%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>전체</td>
                                                                <td>{{ allData.openCnt }}</td>
                                                                <td>{{ allData.closeCnt }}</td>
                                                                <td>{{ allData.compRate }}%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="move_box w50 ml20">
                                                    <div class="move_box_inner">
                                                        <strong class="data_subtit ir">Open/Close 비율</strong>
                                                        <div class="">
                                                            <BarChart id="reViewNoCnfmChart" :data="reViewNoCnfmChartData" :options="reViewNoCnfmChartOptions" class="barchart" ref="reViewNoCnfmChart"></BarChart>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="button_box">
                                                <strong>발생원인 별, 부적합 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <table>
                                                    <caption class="sr_only"></caption>
                                                    <colgroup>
                                                        <col width="*">
                                                        <col width="*">
                                                        <col width="*">
                                                        <col width="*">
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th>원인별</th>
                                                            <th>Open</th>
                                                            <th>Close</th>
                                                            <th>발생 비중</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>시공/제작</td>
                                                            <td>453</td>
                                                            <td>353</td>
                                                            <td>353%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>자재</td>
                                                            <td>453</td>
                                                            <td>353</td>
                                                            <td>353%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>설계</td>
                                                            <td>453</td>
                                                            <td>353</td>
                                                            <td>353%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>시험/검사</td>
                                                            <td>453</td>
                                                            <td>353</td>
                                                            <td>353%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>서류/기록</td>
                                                            <td>453</td>
                                                            <td>353</td>
                                                            <td>353%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>환경</td>
                                                            <td>453</td>
                                                            <td>353</td>
                                                            <td>353%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>시운전</td>
                                                            <td>453</td>
                                                            <td>353</td>
                                                            <td>353%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>기타</td>
                                                            <td>453</td>
                                                            <td>353</td>
                                                            <td>353%</td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td>전체시험</td>
                                                            <td>1,178</td>
                                                            <td>838</td>
                                                            <td>838%</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            
                                            <div class="button_box">
                                                <strong>부적합 다발 시공업체</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>CAR / NCR / Punch 발행 상위 10개 업체 <br><br>
                                                    부적합 발행건수(건) (연도/공종/원인 별 분류) <br>
                                                    막대그래프 표현</b>
                                            </div>

                                            <div class="button_box">
                                                <strong>부적합 회신지연 시공업체</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>CAR / NCR / Punch 발행 상위 10개 업체 <br><br>
                                                    부적합 지연 건수 (건), 비중(%) (연도/공종/원인 별 분류) <br><br>
                                                    건수: 막대 그래프 표현 <br>
                                                    비중: 꺽은선 그래프</b>
                                            </div>

                                            <div class="button_box">
                                                <strong>발생원인 별, 부적합 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>원형 그래프 표현</b>
                                            </div>
                                        </div>

                                        <!-- 불합격 다발 시험 종목 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 1">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>불합격 다발 시험 종목</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>종별 기준 불합격 상위 10개 List <br><br>
                                                    불합격 건수(건), 불합격 비중(%) <br><br>
                                                    건수(막대), 비중(꺽은 선)</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>당해년도 의뢰시험 비용</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>의뢰시험 비용 분석 (결과 입력시 작성)
                                                    표현타입: 표
                                                    현장별 비용 데이터 리스트업</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>시험기관 비중</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>등록된 시험 기관 중, 의뢰시험을 수행한 비중(%)
                                                    표현타입:원형 그래프</b>
                                            </div>
                                        </div>

                                        <!-- 모니터링 및 측정 결과_콘크리트 관리 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 2">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>물성시험 불량 다발 업체</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>물성시험 Fail 다발 레미콘 업체 순위 <br><br>
                                                시험 Fail 횟수(건) / 시험 타입 별, 구분 <br><br>
                                                표현 타입: 막대 그래프</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>강도시험 불량 다발 업체</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>강도시험 Fail 다발 레미콘 업체 순위
                                                    시험 Fail 횟수(건) / 시험 타입 별, 구분
                                                    표현 타입: 막대 그래프</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>레미콘 업체 별, 물량 비중</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>레미콘 업체 별, 타설 물량 비중
                                                    표현 타입: 원형 그래프</b>
                                            </div>
                                        </div>

                                        <!-- 모니터링 및 측정 결과_검측, 균열 관리 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 3">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>검측 진행 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>월별 검측 진행 현황
                                                    부문 별, 검측 진행 횟수(건)
                                                    표현타입 : 표(월별)/원형 그래프(전체)</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>균열 발생/조치 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>월별 균열 발생 현황/조치 현황
                                                    균열 발생 및 조치 횟수(건)
                                                    표현타입 : 표</b>
                                            </div>
                                        </div>

                                        <!-- 심사 결과_대외점검 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 4">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>[현장] 대외기관 점검</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>대외기관 점검 메뉴 內, 점검 List <br>
                                                    지적사항 List 연동</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>[현장] 대외기관 점검</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>대외기관 점검 메뉴 內, 점검 List <br>
                                                    지적사항 List 연동</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>[전사] 점검기관 분석</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>점검기관별, 점검횟수 및 비율 <br>
                                                    횟수(건), 총 점검 대비 비율(%) <br>
                                                    표현타입: 원형 그래프 <br>
                                                    All Sites 데이터</b>
                                            </div>
                                        </div>

                                        <!-- 심사 결과_대외점검 PQI -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 5">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>[현장] PQI 점검</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>영역별 점수 / 사업본부 및 현장평균 비교 / 지적사항 조치</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>[전사] PQI 분석</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>전사평균 및 사업본부 평균 / 평가영역별 분석 / 연도별 추이 / 사업유형별 / 지적사항 조치 <br>
                                                    All Sites 데이터</b>
                                            </div>
                                        </div>

                                        <!-- 외부 공급자의 성과_자재 관리 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 6">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>자재 승인 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>자재관리 Menu 內 자재승인 List 현황</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>공장검사 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>자재관리 Menu 內 공장검사 List 현황 <br>
                                                    /연간 계획대비 실적 (캘린더)</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>인수검사 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>자재관리 Menu 內 인수검사 List 현황</b>
                                            </div>
                                            
                                        </div>

                                        <!-- 외부 공급자의 성과_불량 자재 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 7">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>불량 다발 자재 분석</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>품명 기준 불합격 상위 10개 자재 List <br>
                                                    불합격 자재 개수(EA) <br>
                                                    표현타입: 막대 그래프</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>공장검사 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>불합격 상위 10개 업체 List(공급&제조) <br>
                                                    불합격 자재 개수(EA) <br>
                                                    표현타입: 막대그래프</b>
                                            </div>
                                        </div>

                                        <!-- 자원의 충족성 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 8">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>품질관리자 배치 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>시스템 등록된 품질관리자 Data 연동</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>품질관리비 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>품질관리비 Menu의 report 갑지 연동</b>
                                            </div>
                                        </div>

                                        <!-- 리스크를 다루기 위한 조치의 효과성 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 9">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>VE 등록 현황</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>VELL System 內, VE Master List 현황표 연동 <br>
                                                    /등록 리스트 연동</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>LL 필수사례</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>VELL System 內, LL Master List 현황표 연동 <br>
                                                /필수사례 선정 및 조치현황 리스트 연동</b>
                                            </div>
                                        </div>

                                        <!-- 개선 기회 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 10">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}
                                                <div class="fr" v-if="detailInfo.progrsStatus !== '1'">
                                                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveImprvmOpp()">저장</button>
                                                </div>
                                            </h2>
                                            <div class="button_box">
                                                <strong>현장 별, 개선사례</strong>
                                            </div>
                                            <div style="padding: 5px; border: 1px solid #c8c8c8;">
                                                <div class="input_text">
                                                    <span v-if="detailInfo.progrsStatus !== '1'">
                                                        <textarea v-model="detailInfo.imprvmCase" class="form_control" style="height: 220px;"></textarea>
                                                        <div class="num"><strong class="count">{{detailInfo.imprvmCase.length}}</strong>/200</div>
                                                    </span>
                                                    <span v-else>{{detailInfo.imprvmCase}}</span>
                                                </div>
                                            </div>
                                            <div class="button_box">
                                                <strong>BS점검 통계분석</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>BS점검 Menu 內, 통계분석 DATA 연동 <br>
                                                    (BS점검 실시했을 경우)</b>
                                            </div>
                                        </div>

                                        <!-- 기타 사항 -->
                                        <div class="steps_area_inner" v-show="lst_steps_inner_num == 11">
                                            <h2 class="sub_title">{{ lst_steps_inner[lst_steps_inner_num] }}</h2>
                                            <div class="button_box">
                                                <strong>SQMS 활용 현황 (Web)</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>접속자 현황 / 전체인원 대비 활용한 인원수 / 메뉴활용도 / 월별 평균치 분석 <br>
                                                    (Web)</b>
                                            </div>
                                            <div class="button_box">
                                                <strong>SQMS 활용 현황 (Mobile)</strong>
                                            </div>
                                            <div class="step_box">
                                                <b>접속자 현황 / 전체인원 대비 활용한 인원수 / 메뉴활용도 / 월별 평균치 분석 <br>
                                                    (Mobile)</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 5. 현장별 개선 필요사항 -->
                    <div class="steps_area" v-show="lst_steps_num == 6">
                        <div class="inner">
                            <h2 class="sub_title">현장별 개선 필요사항
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 5">이전단계</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 7">다음단계</button>
                                </div>
                            </h2>

                            <div class="sub_title" v-if="detailInfo.progrsStatus !== '1'">
                                <div class="fr">
                                    <!-- <span class="ico ico_save">저장됨</span> -->
                                    <button type="button" class="btn btn_sm btn_darkgray">행 복사</button>
                                    <div class="btn_number">
                                        <select v-model="popGrid.addRowsCount" class="form_control num">
                                            <option
                                                v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                                :key="count"
                                                :value="count"
                                            >
                                                {{ String(count).padStart(3, '0') }}
                                            </option>    
                                        </select>
                                        <button type="button" class="btn btn_sm" @click="clickAddRows()">행 추가</button>
                                    </div>
                                    <button type="button" class="btn btn_sm btn_darkgray" @click="clickDeleteRow()">행 삭제</button>
                                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveSiteImprvm()">저장</button>
                                </div>
                            </div>


                            <div class="ib_wrap mt0">
                                <div id="popsheetTable" class="ibsheet_table"></div>
                            </div>
                        </div>
                    </div>            

                    <!-- 6. 차년도 계획 수립 -->
                    <div class="steps_area" v-show="lst_steps_num == 7">
                        <div class="inner">
                            <h2 class="sub_title">차년도 계획 수립
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 6">이전단계</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 8">다음단계</button>
                                </div>
                            </h2>
                            <div class="button_box">
                                <strong>전년도 계획</strong>
                                <div class="fr" v-if="detailInfo.progrsStatus !== '1'">
                                    <span class="ico ico_save">저장됨</span>
                                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveNeyrPlan()">저장</button>
                                </div>
                            </div>

                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>금년도 총평</th>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <textarea v-model="detailInfo.thsyrGenrvw" class="form_control max_height"></textarea>
                                                </span>
                                                <span v-else>{{detailInfo.thsyrGenrvw}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>보완점</th>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <textarea v-model="detailInfo.thsyrSplemnt" class="form_control max_height"></textarea>
                                                </span>
                                                <span v-else>{{detailInfo.thsyrSplemnt}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="button_box">
                                <strong>차년도 계획 수립</strong>
                            </div>

                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>중점사항</th>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <textarea v-model="detailInfo.neyrMatter" class="form_control max_height"></textarea>
                                                </span>
                                                <span v-else>{{detailInfo.neyrMatter}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>계획</th>
                                            <td>
                                                <span v-if="detailInfo.progrsStatus !== '1'">
                                                    <textarea v-model="detailInfo.neyrPlan" class="form_control max_height"></textarea>
                                                </span>
                                                <span v-else>{{detailInfo.neyrPlan}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>                     
                        
                    <!-- 첨부파일 -->
                    <div class="steps_area" v-show="lst_steps_num == 8">
                        <div class="inner">
                            <h2 class="sub_title">&nbsp;
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 7">이전단계</button>
                                </div>
                            </h2>
                            <div class="button_box">
                                <strong>파일첨부</strong>
                                <div class="fr" v-if="detailInfo.progrsStatus !== '1'">
                                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveFileInfo()">저장</button>
                                </div>
                            </div>
                            <LstFile
                                :downloadable="true"
                                :lst-file-rst="lstFileRst"
                                :files="files"
                                :secondRemoveFileId="secondRemoveFileId"
                                @file-changed="fileChanged"
                                @file-removed="fileRemoved"
                                :uploadable="detailInfo.progrsStatus !== '1'"
                            />

                        </div>
                    </div>
                </div>
                <!-- 결재상신 -->
                <approve
                    ref-id="sourceApproveModal"
                    doc-type="MNGT"
                    :code-type="approve.codeType"
                    :code-dtl-type="approve.codeDtlType"
                    :main-code-id="approve.mainCodeId"
                    :mid-code-id="approve.midCodeId"
                    :request-id="approve.requestId"
                    :doc-name="approve.docName"
                    :doc-seq="approve.docSeq"
                    :file-type="approve.fileType"
                    :site-mstr-id="approve.siteMstrId"
                    @callback="fn_callbackApproval"
                    alertable
                />

            </div>
        </template>
    </b-modal>

</template>

<script>
    import API from '@/apis/'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import Datepicker from '@component/common/DatePicker.vue'
    import LstFile from '@/pages/common/popup/LstFile'
    import Approve from '@modal/approval/Approve.vue'
    import { sendPostApi, sendFileApi, requestOptions } from '@/apis/common';
    import { commonFn } from '@/script/commonFn.js';
    import BarChart from '@component/chart/BarChart.vue';
    import { reviewIssueSheet, reviewSiteImprvmMatterSheet } from '../../common/data/ReviewList' 
    import loader from '@ibsheet/loader';

    export default {
        name: 'ReviewDetailSheet',
        mixins: [MsgBoxMixins],
        components: {
            commonFn,
            Datepicker,
            LstFile,
            Approve,
            BarChart,
        },
        props: {
            refId: {
                type: String,
                default: 'ReviewDetailWrite',
            },
            requestParams : {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My site', 'All sites'], // tab name
                lst_steps_num: 0,
                lst_steps: [
                    '표지', 
                    '목차', 
                    '1. 전년도 경영검토', 
                    '2. 내/외부 이슈', 
                    '3. 현장품질방침', 
                    '4. 공사 운영성과', 
                    '5. 현장별 개선 필요사항', 
                    '6. 차년도 계획', 
                    '7. 첨부파일'
                ],
                lst_steps_inner_num: 0,
                lst_steps_inner: [
                    '4-1. 부적합 및 시정조치',
                    '4-2-1. 불합격 다발 시험 종목',
                    '4-2-2. 모니터링 및 측정 결과_콘크리트 관리',
                    '4-2-3. 모니터링 및 측정 결과_검측, 균열 관리',
                    '4-3-1. 심사 결과_대외점검',
                    '4-3-2. 심사 결과_대외점검_PQI',
                    '4-4-1. 외부 공급자의 성과_자재 관리',
                    '4-4-2. 외부 공급자의 성과_불량 자재',
                    '4-5. 자원의 충족성',
                    '4-6. 리스크를 다루기 위한 조치의 효과성',
                    '4-7. 개선 기회',
                    '4-8. 기타 사항'
                ],
                popGrid : {
                    addRowsCount: 1,
                    reviewSiteImprvmData: null,
                    reviewSiteImprvmDataOption: {},
                    reviewIssueData : null,
                    reviewIssueMngtData : null,
                },
                detailInfo : {
                    siteMstrId : '',
                    reviewId : '',
                    saveTitleStatus : '',
                    docTitle : '',
                    subTitle : '',
                    writngDt : '',
                    optnType : 'PRSS',
                    ofcs : '',
                    elcty : '',
                    mngt : '',
                    engrk : '',
                    bildng : '',
                    qlity : '',
                    eqp : '',
                    safe : '',
                    drctMatter : '',
                    prvyyPlanGenrvw : '',
                    prvyyFutrPlan : '',
                    prvyyPlanProvsGenrvw : '',
                    prvyyProvsFutrPlan : '',
                    savePlanStatus : '',
                    thsyrGenrvw : '',
                    thsyrSplemnt : '',
                    neyrMatter : '',
                    neyrPlan : '',
                    imprvmCase : '',
                    docSeq : '',
                    aprvInfoId : '',
                    reviewFileId : '',
                    progrsStatus : '',
                    progrsTxt : '',
                },

                lstFileRst : [],
                files : [],
                secondRemoveFileId: [],


                /* 결재상신 */
                approve: {
                    codeType: 'MNGT',
                    codeDtlType: '',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: null,
                },
                resultParam : {
                },
                punchData: {
                    noCnfmType : '',
                    openCnt : 0,
                    closeCnt : 0,
                    compRate : 0
                },
                carData : {
                    noCnfmType : '',
                    openCnt : 0,
                    closeCnt : 0,
                    compRate : 0
                },
                ncrData : {
                    noCnfmType : '',
                    openCnt : 0,
                    closeCnt : 0,
                    compRate : 0
                },
                allData : {
                    openCnt : 0,
                    closeCnt : 0,
                    compRate : 0
                },

                /* 부적합 및 시정 조치 그래프 */
                reViewNoCnfmChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '전체',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20, 
                        },
                    ]
                },
                reViewNoCnfmChartOptions: {
                    layout: {
                        padding: {
                            top: 40,
                            bottom: 20,
                        }
                    },
                    plugins: {
                        datalabels: {
                            // display: false,
                            align: 'end',
                            anchor: 'end',
                            offset: 0,
                            color: '#28A1E0',
                            backgroundColor: "transparent",
                            textAlign: "center",
                            font: {
                                weight: "bold",
                                size: 12
                            },
                        },
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                // stepSize: 50,
                                // min: 0,
                                // max: 150
                            },
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                borderDash: [3, 2],
                                borderColor: '#dcdcdc'
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                        }]
                    },
                    legend: {
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },
            }
        },
        created() {
        },
        mounted() {
            
        },
        beforeDestroy() {
        },
        watch: {
            "lst_steps_num" : {
                handler () {
                    if( this.lst_steps_num == 3 ){
                        // 내/외부 이슈 조회
                        this.searchIssue('ISSUE');
                        this.searchIssue('ISSUE_MNGT');
                    } else if( this.lst_steps_num == 5 ){
                        this.getReViewNoConFirmList()
                        this.getReViewNoConFirmTradeTypeList()
                    }else if( this.lst_steps_num == 6 ){
                        // 현장별 개선 필요 사항 조회
                        this.searchSiteImprvm();
                    }
                }
            }
        },        
        methods: {
            initializeGrid() {
                let data1     = reviewIssueSheet.data;
                let options1  = reviewIssueSheet.options;
                let data2     = reviewSiteImprvmMatterSheet.data;
                let options2  = reviewSiteImprvmMatterSheet.options;

                /* 내/외부 이슈 리스크 Sheet */
                loader.createSheet({
                    el: 'popIssueSheet',
                    options: options1,
                    data: data1
                }).then(sheet => {
                    this.popGrid.reviewIssueData = sheet;
                });

                /* 요구사항 및 관리방안 Sheet */
                loader.createSheet({
                    el: 'popIssueMngtSheet',
                    options: options1,
                    data: data1
                }).then(sheet => {
                    this.popGrid.reviewIssueMngtData = sheet;
                });

                // Event
                options2.Events = {
                    // 데이터 조회후 진행
                    onRenderFisrtFinish: (event) => {
                        // this.searchDetail();
                    },
                }

                /* 현장별 개선 필요 사항 */
                loader.createSheet({
                    el: 'popsheetTable',
                    options: options2,
                    data: data2
                }).then(sheet => {
                    this.popGrid.reviewSiteImprvmData = sheet;
                });

                
            },
            loadPopup : function() {   // popup shown
                this.initializeGrid();
                // console.log("loadPopup");

                this.lst_steps_num = 0;
                this.searchDetail();
            },
            searchDetail : function() {
                // console.log("searchDetail");
                let url = '/sendApi/api/stats/review/reviewDetail/view';
                let param = {
                        siteMstrId : this.requestParams.siteMstrId,
                        reviewId : this.requestParams.reviewId
                };
                const detailData = sendPostApi(url, param)
                                   .then((data) => {
                                        this.detailInfo  = data.data.datas.dmTitleDetail;
                                        this.getFileInfoList();
                                   });
            },
            searchIssue : function( stat ) {
                // console.log("searchIssue");
                let url = '/sendApi/api/stats/review/reviewIssueDetail/list';
                let param = {
                        siteMstrId : this.requestParams.siteMstrId,
                        reviewId : this.requestParams.reviewId,
                        issueStatus : stat
                };
                const detailData =  sendPostApi(url, param)
                                    .then((data) => {
                                        if( stat == 'ISSUE') {
                                            this.popGrid.reviewIssueData.loadSearchData({
                                                data: data.data.datas.dlIssueDetail,
                                            });
                                            // this.popGrid.reviewIssueData.sheet.rerender();
                                        } else  if( stat == 'ISSUE_MNGT') {
                                            this.popGrid.reviewIssueMngtData.loadSearchData({
                                                data: data.data.datas.dlIssueDetail,
                                            });
                                            // this.popGrid.reviewIssueMngtData.sheet.rerender();
                                        }
                                    });
            },
            searchSiteImprvm : function() {
                // console.log("searchSiteImprvm");
                let url = '/sendApi/api/stats/review/reviewSiteImprvm/list';
                let param = {
                        siteMstrId : this.requestParams.siteMstrId,
                        reviewId : this.requestParams.reviewId,
                    };
                const detailData =  sendPostApi(url, param)
                                    .then((data) => {
                                        this.popGrid.reviewSiteImprvmData.loadSearchData({
                                            data: data.data.datas.dlSiteImprvm,
                                        });
                                        
                                    });
            },
            getFileInfoList : async function() {
                const payload = {
                    fileConnectId : this.detailInfo.reviewFileId,
                    fileType : 'ReviewMngt',
                }
                try {
                    const result = await API.concrete.loadFileInfo(payload)
                    if(result?.data){
                        this.lstFileRst = result.data
                        // console.log("this.lstFileRst : %o", this.lstFileRst);
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },

            clickAddRows () {
                // 초기화 할 데이터가 없다면 addRows 함수를 쓰는것을 권장
                this.popGrid.reviewSiteImprvmData.addRows({
                    count: this.popGrid.addRowsCount,
                    next: this.popGrid.reviewSiteImprvmData.getFirstRow(),
                })

                // this.popGrid.reviewSiteImprvmData.blur();
                // this.grid.focus.row = this.grid.grid.getFirstRow()
                // this.grid.focus.col = this.grid.options.Cols[1].Name
                // this.grid.grid.focus(this.grid.focus.row, this.grid.focus.col)
            },
            clickDeleteRow () {
                // changed 기록엔 남아있음
                const checkedRows = this.popGrid.reviewSiteImprvmData.getRowsByChecked(this.popGrid.reviewSiteImprvmData.options.Cols[0].Name)
                this.popGrid.reviewSiteImprvmData.deleteRows(checkedRows)
                checkedRows.forEach(item => {
                    this.popGrid.reviewSiteImprvmData.hideRow({
                        row: item,
                        del: false,
                        norender: false
                    })
                })
            },
            saveDocInfo : function() {
                if(commonFn.methods.isEmpty(this.detailInfo.docTitle)){
                    this.alert('문서제목을 입력해주세요')
                    return
                }
                if(commonFn.methods.isEmpty(this.detailInfo.subTitle)){
                    this.alert('부제목을 입력해주세요')
                    return
                }
                if(commonFn.methods.isEmpty(this.detailInfo.writngDt)){
                    this.alert('일자를 선택해주세요')
                    return
                }
                if(commonFn.methods.isEmpty(this.detailInfo.optnType)){
                    this.alert('구분을 선택해주세요')
                    return
                }
                
                /* 표지저장 */
                let url = '/sendApi/api/stats/review/reviewDocInfo/change';
                let param = {
                               ...this.detailInfo
                            };
                const data = sendPostApi(url, param)
                                .then((data) => {
                                    // console.log("data : %o", data.data.count);
                                    if( data.data.count > 0 ) {
                                        this.alert("저장 되었습니다.");
                                    }
                                });
            },
            saveMngmtExmnt : function() {
                /* 전년도 경영검토 저장 */

                let url   = '/sendApi/api/stats/review/reviewMngmtExmnt/change';
                let param = {
                               ...this.detailInfo
                            };
                const data = sendPostApi(url, param)
                                .then((data) => {
                                    // console.log("data : %o", data.data.count);
                                    if( data.data.count > 0 ) {
                                        this.alert("저장 되었습니다.");
                                    }
                                });
            },
            saveIssue : function() {
            /* 내/외부 이슈 저장 */
                const reviewIssueDataJson     = this.popGrid.reviewIssueData.getSaveJson({saveMode: 3});
                const reviewIssueMngtDataJson = this.popGrid.reviewIssueMngtData.getSaveJson({saveMode: 3});

                // payload 수정
                reviewIssueDataJson.data.forEach((item) => {
                    item.status = item.STATUS;
                });
                reviewIssueMngtDataJson.data.forEach((item) => {
                    item.status = item.STATUS;
                });

                /* 이슈 저장 */
                let url   = '/sendApi/api/stats/review/reviewIssue/change';
                let param = {
                               listIssueData : reviewIssueDataJson.data,
                               listIssueMngtData : reviewIssueMngtDataJson.data,
                            };
                const data = sendPostApi(url, param);
            },
            saveImprvmOpp : function() {
            /* 개선 기회 */
                let url   = '/sendApi/api/stats/review/reviewImprvmCase/change';
                let param = {
                               ...this.detailInfo
                            };
                const data = sendPostApi(url, param);
            },
            saveSiteImprvm : function() {
            /* 현장별 개선 필요 사항 저장 */

                const reviewSiteImprvmDataJson     = this.popGrid.reviewSiteImprvmData.getSaveJson({saveMode: 3});

                // STATUS 값 복사
                reviewSiteImprvmDataJson.data.forEach((item) => {
                    item.status = item.STATUS;
                });

                let url   = '/sendApi/api/stats/review/siteImprvm/write';
                let param = {
                               param : {
                                    siteMstrId : this.requestParams.siteMstrId,
                                    reviewId : this.requestParams.reviewId,
                               },
                               listImprvmData : reviewSiteImprvmDataJson.data,
                            };
                const data = sendPostApi(url, param)
                                .then((data) => {
                                    if( data.data.count > 0 ) {
                                       this.searchSiteImprvm();
                                    }
                                });
            },
            saveNeyrPlan : function() {
                /* 차년도 계획 수립 저장 */
                let url   = '/sendApi/api/stats/review/reviewNeyrPlan/change';
                let param = {
                               ...this.detailInfo
                            };
                const data = sendPostApi(url, param)
                                .then((data) => {
                                    // console.log("data : %o", data.data.count);
                                    if( data.data.count > 0 ) {
                                        this.alert("저장 되었습니다.");
                                    }
                                });
            },
            clickApproval () {
                /* 결재상신 */
                // console.log('click approval')
                this.approve.docName        = '경영검토 내용'
                this.approve.siteMstrId = this.$cookies.get('siteMstrId');
                this.approve.docSeq     = this.detailInfo.docSeq;
                this.approve.requestId  = this.detailInfo.reviewId;

                this.$bvModal.show('sourceApproveModal')

            },
            fn_callbackApproval: function (payload) {
                /* 결재상신 완료 */
                // console.log("결재상신 완료 : %o", payload);
                let url   = '/sendApi/api/stats/review/reviewApprove/write';
                let param = {
                               ...this.detailInfo
                               , aprvInfoId : payload.aprvInfoId
                            };
                const appResultData = sendPostApi(url, param)
                                        .then((data) => {
                                            // console.log("data : %o", data.data.count);
                                            if( data.data.count > 0 ) {
                                                this.alert('결재상신 되었습니다.');
                                            }
                                        });
            },
            fileChanged (payload) {
                this.files = payload
            },
            fileRemoved (payload) {
                this.secondRemoveFileId = payload
            },
            /** 파일 정보저장 이벤트 */
            saveFileInfo : async function () {

                if(!this.files?.length && this.secondRemoveFileId.length === 0) return this.alert('수정된 파일이 없습니다.')

                this.confirm('저장 하시겠습니까?', async () => {
                    // console.log("remove : %o", this.secondRemoveFileId.length)
                    // console.log("filse : %o", this.files.length)

                    if(this.secondRemoveFileId.length > 0 && this.files.length === 0){
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                        const payload = {
                                          fileType : "ReviewMngt"
                                        , fileQltArcvIds : this.secondRemoveFileId
                                        }

                        const deleteFile = await sendPostApi('/sendApi/api/file/fileUnUse', payload)
                        // console.log(deleteFile)
                        if(deleteFile?.status === 200){
                            const insertFile = await API.concrete.getSpecificFomlFileChange({
                                                            concMixFileId : this.detailInfo.reviewFileId,
                                                            concSpfcFomlId: this.detailInfo.reviewFileId,
                                                        })
                            if (insertFile) {
                                if (insertFile?.data.rCode === '0000') { // 성공
                                    this.files = []
                                    return this.alert('저장 되었습니다.')
                                } else {
                                    let failMsg = insertFile?.json?.rMsg ? insertFile.json.rMsg : '저장에 실패했습니다.'
                                    return this.alert(failMsg)
                                }
                            }
                        } else {
                            this.alert('저장에 실패했습니다.') 
                            this.secondRemoveFileId = []
                        }
                    } else if(this.secondRemoveFileId.length > 0 && this.files.length > 0){
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                        const payload = { fileType : "ReviewMngt", fileQltArcvIds : this.secondRemoveFileId}
                        const deleteFile = await sendPostApi('/sendApi/api/file/fileUnUse', payload)
                        if(deleteFile?.status === 200){
                            const result = await sendFileApi(
                                                        this.detailInfo.reviewFileId, // fileConnectId
                                                        'ReviewMngt', // fileType
                                                        this.files // files
                                                    )
                            if(result?.data) {
                                this.files = []
                                return this.alert('수정되었습니다.')
                            } else {
                                return this.alert('저장에 실패했습니다.')
                            }
                        } else {
                            this.alert('저장에 실패했습니다.') 
                            this.secondRemoveFileId = []
                        }
                    } else if(this.secondRemoveFileId.length === 0 && this.files.length > 0) {
                        const result = await sendFileApi(
                                                    this.detailInfo.reviewFileId, // fileConnectId
                                                    'ReviewMngt', // fileType
                                                    this.files // files
                                                );
                        if(result?.data) {
                            this.files = []
                            return this.alert('수정되었습니다.')
                        } else {
                            return this.alert('수정에 실패했습니다.')
                        }
                    }
                })
            },

            fn_toHtml: function (string) {
                return string ? string.split('\n').join('<br>') : ''
            },
            getReViewNoConFirmList() {
                console.log(this.requestParams)
                let url = '/sendApi/api/stats/review/reViewNoConFirm/list';
                let param = {
                        siteMstrId : this.requestParams.siteMstrId,
                        dataStartDt : this.requestParams.dataStartDt,
                        dataEndDt : this.requestParams.dataEndDt
                };
                const detailData = sendPostApi(url, param)
                                   .then((data) => {
                                    console.log(data)
                                    if(data.data.punchData != null){
                                        this.punchData.noCnfmType = data.data.punchData.noCnfmType
                                        this.punchData.openCnt = Number(data.data.punchData.openCnt)
                                        this.punchData.closeCnt = Number(data.data.punchData.closeCnt)
                                        this.punchData.compRate = parseFloat(Number(data.data.punchData.compRate))
                                    }
                                    if(data.data.carData != null){
                                        this.carData.noCnfmType = data.data.carData.noCnfmType
                                        this.carData.openCnt = Number(data.data.carData.openCnt)
                                        this.carData.closeCnt = Number(data.data.carData.closeCnt)
                                        this.carData.compRate = parseFloat(Number(data.data.carData.compRate))
                                    }
                                    if(data.data.ncrData != null){
                                        this.ncrData.noCnfmType = data.data.ncrData.noCnfmType
                                        this.ncrData.openCnt = Number(data.data.ncrData.openCnt)
                                        this.ncrData.closeCnt = Number(data.data.ncrData.closeCnt)
                                        this.ncrData.compRate = parseFloat(Number(data.data.ncrData.compRate))
                                    }
                                    
                                    this.allData.openCnt = this.punchData.openCnt + this.carData.openCnt + this.ncrData.openCnt
                                    this.allData.closeCnt = this.punchData.closeCnt + this.carData.closeCnt + this.ncrData.closeCnt
                                    this.allData.compRate = parseFloat(((this.punchData.closeCnt + this.carData.closeCnt + this.ncrData.closeCnt) / (this.punchData.openCnt + this.carData.openCnt + this.ncrData.openCnt)) * 100).toFixed(2)
                                   });
            },
            getReViewNoConFirmTradeTypeList() {
                let url = '/sendApi/api/stats/review/reviewTradeType/List'
                let param = {
                        siteMstrId : this.requestParams.siteMstrId,
                        dataStartDt : this.requestParams.dataStartDt,
                        dataEndDt : this.requestParams.dataEndDt
                }
                const response = sendPostApi(url, param).then((data) => {
                    console.log('이게바로 데이터다 : '+ data.data.qData.openCnt)
                });
            },
        }
    }
</script>