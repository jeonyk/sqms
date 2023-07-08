<!--
    업무 : 주간업무보고
    2022.05.07
 -->
<template>
        <!-- 보고서 작성 팝업 -->
        <!-- ReportDetailWrite -->
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
                                <!-- <li v-for="(item, index) in lst_steps" :key="index" v-bind:class="{active: lst_steps_num === index, complete: lst_steps_num > index}">{{item}}</li> -->
                                <li v-for="(item, index) in lst_steps" :key="index" v-bind:class="{active: lst_steps_num === index, complete: lst_steps_num > index}" v-html="fn_toHtml(item)"></li>
                            </ul>
                        </div>

                        <!-- 표지 -->
                        <div class="steps_area" v-show="lst_steps_num == 0">
                            <div class="inner">
                                <div class="button_box">
                                    <div class="fr">
                                        <span class="ico ico_save" v-if="detailInfo.progrsStatus == '1'">저장됨</span>
                                        <button type="button" class="btn btn_sm btn_darkblue" v-if="detailInfo.progrsStatus !== '1'" @click="saveDocInfo()">저장</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 1">다음단계</button>
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
                                                        <input type="text" v-model="detailInfo.docTitle" maxLength="150" class="form_control">
                                                    </span>
                                                    <span v-else>{{ detailInfo.docTitle }}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span class="emp_red">부제목</span></th>
                                                <td colspan="4">
                                                    <span v-if="detailInfo.progrsStatus !== '1'">
                                                        <input type="text" v-model="detailInfo.subTitle" maxLength="150" class="form_control">
                                                    </span>
                                                    <span v-else>{{ detailInfo.subTitle }}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>지시사항</th>
                                                <td colspan="4">
                                                    <div class="input_text">
                                                        <span v-if="detailInfo.progrsStatus !== '1'">
                                                            <textarea v-model="detailInfo.drctMatter" maxLength="1500" class="form_control"></textarea>
                                                        </span>
                                                        <span v-else v-html="fn_toHtml(detailInfo.drctMatter)"></span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span class="emp_red">일자</span></th>
                                                <td colspan="4">
                                                    <span v-if="detailInfo.progrsStatus !== '1'">
                                                        <Datepicker v-model="detailInfo.writngDt" :input-style="{width: '100%;'}" :format="'YYYYMMDD'"/>
                                                    </span>
                                                    <span v-else>{{ $moment(detailInfo.writngDt).format('YYYY-MM-DD') }}</span>
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
                                <h2 class="sub_title">
                                    <div class="fr">
                                        <!-- <span class="ico ico_save">저장됨</span> -->
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 0">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 2">다음단계</button>
                                        <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                                    </div>
                                </h2>

                                <div class="report_contents">
                                    <dl>
                                        <dt>부적합 및 시정조치</dt>
                                        <dd>
                                            <ul>
                                                <li>1) 분류 별, 부적합 현황 (CAR/NCR/Punch)</li>
                                            </ul>
                                        </dd>

                                        <dt>품질시험 및 검측관리</dt>
                                        <dd>
                                            <ul>
                                                <li>1) 품질 시험 시행 현황</li>
                                                <li>2) 검측 진행 현황</li>
                                            </ul>
                                        </dd>

                                        <dt>콘크리트및 균열관리</dt>
                                        <dd>
                                            <ul>
                                                <li>1) 콘크리트 타설 현황</li>
                                                <li>2) 콘크리트 물성/강도 시험 현황</li>
                                                <li>3) 균열 발생/조치 현황</li>
                                            </ul>
                                        </dd>

                                        <dt>자재관리</dt>
                                        <dd>
                                            <ul>
                                                <li>1) 자재 승인 현황</li>
                                                <li>2) 공장검사 현황</li>
                                                <li>3) 인수검사 현황</li>
                                            </ul>
                                        </dd>

                                        <dt>교육관리</dt>
                                        <dd>
                                            <ul>
                                                <li>1) HEC/협력사 교육 이수 현황</li>
                                                <li>2) 작업자 동영상 교육</li>
                                            </ul>
                                        </dd>

                                        <dt>대외기관 점검 및 자체품질점검</dt>
                                        <dd>
                                            <ul>
                                                <li>1) 대외기관 점검 현황</li>
                                                <li>2) 자체품질점검 실시 내용</li>
                                            </ul>
                                        </dd>
                                        
                                        <dt>기타 특이사항</dt>

                                    </dl>
                                </div>
                            </div>
                        </div>

                        <!-- 1. 부적합 및 시장조치 -->
                        <div class="steps_area" v-show="lst_steps_num == 2">
                            <div class="inner">
                                <!-- <h2 class="sub_title">1. 부적합 및 시정조치\
                                    <div class="fr">
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 1">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 3">다음단계</button>
                                    </div>
                                </h2> -->

                                <div class="button_box">
                                    <div class="fr">
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 1">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 3">다음단계</button>
                                    </div>
                                </div>
                                <div class="table_data mt20">
                                    <div class="move_box w50">
                                        <div class="move_box_inner">
                                            <strong class="data_tit">1. 부적합 및 시정조치</strong>
                                            <strong class="data_subtit">1) 분류 별, 부적합 현황 (CAR/NCR/Punch)</strong>

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
                                                            <td>CAR</td>
                                                            <td>{{nonCnfrmData.carOpen}}</td>
                                                            <td>{{nonCnfrmData.carClose}}</td>
                                                            <td>{{nonCnfrmData.carRate}}%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>NCR</td>
                                                            <td>{{nonCnfrmData.ncrOpen}}</td>
                                                            <td>{{nonCnfrmData.ncrClose}}</td>
                                                            <td>{{nonCnfrmData.ncrRate}}%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Punch</td>
                                                            <td>{{nonCnfrmData.punchOpen}}</td>
                                                            <td>{{nonCnfrmData.punchClose}}</td>
                                                            <td>{{nonCnfrmData.punchRate}}%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>전체</td>
                                                            <td>{{nonCnfrmData.allOpen}}</td>
                                                            <td>{{nonCnfrmData.allClose}}</td>
                                                            <td>{{nonCnfrmData.allRate}}%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="move_box w50">
                                        <div class="move_box_inner">
                                            <strong class="data_subtit ir">Open/Close 비율</strong>
                                            <div class="">
                                                <PieChart id="nonCnfrmPieChart" :data="nonCnfrmPieChartData" :options="nonCnfrmPieChartOptions" class="barchart" ref="nonCnfrmPieChart"></PieChart> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. 품질 시험 및 검측 관리 -->
                        <div class="steps_area" v-show="lst_steps_num == 3">
                            <div class="inner">
                                <div class="button_box">
                                    <div class="fr">
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 2">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 4">다음단계</button>
                                    </div>
                                </div>
                                
                                <div class="table_data mt20">
                                    <div class="move_box w50">
                                        <div class="move_box_inner">
                                            <strong class="data_tit">2. 품질 시험 및 검측 관리</strong>
                                            <strong class="data_subtit">1) 품질 시험 시행 현황</strong>
                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikTestSheetTable1" class="ibsheet_table"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="move_box w50">
                                        <div class="move_box_inner">
                                            <strong class="data_subtit ir">Open/Close 비율</strong>
                                            <div>
                                                <BarChart id="testTypeBarGroupChart" :data="testTypeBarGroupChartData" :options="reportWikBarGroupChartOptions" class="barchart" ref="testTypeBarGroupChart"></BarChart>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="table_data mt20">
                                    <div class="move_box w50">
                                        <div class="move_box_inner">
                                            <strong class="data_subtit">2) 검측 진행 현황</strong>
                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikInspSheetTable1" class="ibsheet_table"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="move_box w50">
                                        <div class="move_box_inner">
                                            <strong class="data_subtit ir">Open/Close 비율</strong>
                                            <div>
                                                <PieChart id="testInspPieChart" :data="testInspPieChartData" :options="testInspPieChartOptions" class="barchart" ref="testInspPieChart"></PieChart> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 3. 콘크리트 및 균열 관리 -->
                        <div class="steps_area" v-show="lst_steps_num == 4">
                            <div class="inner">
                                <div class="button_box">
                                    <div class="fr">
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 3">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 5">다음단계</button>
                                    </div>
                                </div>

                                <div class="table_data mt20">
                                    <div class="move_box w100">
                                        <div class="move_box_inner">
                                            <strong class="data_tit">3. 콘크리트 및 균열 관리</strong>
                                            <strong class="data_subtit">1) 콘크리트 타설 현황</strong>

                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikConcSheetTable1" class="ibsheet_table" :style="{height: '270px'}"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table_data mt20">
                                    <div class="move_box w50">
                                        <div class="move_box_inner">
                                            <strong class="data_subtit">2) 콘크리트 물성/강도 시험 현황</strong>

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
                                                            <th>구분</th>
                                                            <th>시험횟수(건)</th>
                                                            <th>합격(건)</th>
                                                            <th>불합격(건)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>물성</td>
                                                            <td>{{concPourData.suplTotlCnt}}</td>
                                                            <td>{{concPourData.suplPassCnt}}</td>
                                                            <td>{{concPourData.suplFailCnt}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>강도</td>
                                                            <td>{{concPourData.strgTotlCnt}}</td>
                                                            <td>{{concPourData.strgPassCnt}}</td>
                                                            <td>{{concPourData.strgFailCnt}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="move_box w50">
                                        <div class="move_box_inner">
                                            <strong class="data_subtit ir">Open/Close 비율</strong>
                                            <div>
                                                <BarChart id="concPourBarGroupChart" :data="concPourBarGroupChartData" :options="reportWikBarGroupChartOptions" class="barchart" ref="concPourBarGroupChart"></BarChart>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="table_data mt20">
                                    <div class="move_box w100">
                                        <div class="move_box_inner">
                                            <strong class="data_subtit">3) 균열 발생/조치 현황</strong>

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
                                                            <th>타설건수</th>
                                                            <th>균열 발생</th>
                                                            <th>조치 완료</th>
                                                            <th>조치율</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{{concCrckData.concPourCnt}}</td>
                                                            <td>{{concCrckData.crckTotlCnt}}</td>
                                                            <td>{{concCrckData.crckPassCnt}}</td>
                                                            <td>{{concCrckData.crckPassRate}}%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- 4. 자재관리 -->
                         <div class="steps_area" v-show="lst_steps_num == 5">
                            <div class="inner">
                                <div class="button_box">
                                    <div class="fr">
                                        <!-- <span class="ico ico_save">저장됨</span> -->
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 4">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 6">다음단계</button>
                                        <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                                    </div>
                                </div>

                                <div class="table_data mt20">
                                    <div class="move_box w100">
                                        <div class="move_box_inner">
                                            <strong class="data_tit">4. 자재 관리</strong>
                                            <strong class="data_subtit">1) 자재 승인 현황</strong>

                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikMatrialSheetTable1" class="ibsheet_table" :style="{height: '260px'}"></div>
                                            </div>

                                            <strong class="data_subtit mt10">2) 공장검사 현황</strong>

                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikMatrialSheetTable2" class="ibsheet_table" :style="{height: '260px'}"></div>
                                            </div>

                                            <strong class="data_subtit mt10">3) 인수검사 현황</strong>

                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikMatrialSheetTable3" class="ibsheet_table" :style="{height: '260px'}"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 5. 교육관리 -->
                        <div class="steps_area" v-show="lst_steps_num == 6">
                            <div class="inner">
                                <div class="button_box">
                                    <div class="fr">
                                        <!-- <span class="ico ico_save">저장됨</span> -->
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 5">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 7">다음단계</button>
                                        <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                                    </div>
                                </div>

                                <div class="table_data mt20">
                                    <div class="move_box w100">
                                        <div class="move_box_inner">
                                            <strong class="data_tit">5. 교육 관리</strong>
                                            <strong class="data_subtit">1) HEC/협력사 교육 이수 현황</strong>

                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikEduSheetTable1" class="ibsheet_table" :style="{height: '280px'}"></div>
                                            </div>

                                            <strong class="data_subtit mt10">2) 작업자 동영상 교육</strong>

                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikEduSheetTable2" class="ibsheet_table" :style="{height: '280px'}"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>            

                        <!-- 6. 대외기기관점검 및 자재품질점검 -->
                        <div class="steps_area" v-show="lst_steps_num == 7">
                            <div class="inner">
                                <div class="button_box">
                                    <div class="fr">
                                        <!-- <span class="ico ico_save">저장됨</span> -->
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 6">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 8">다음단계</button>
                                        <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                                    </div>
                                </div>
                                <div class="table_data mt20">
                                    <div class="move_box w100">
                                        <div class="move_box_inner">
                                            <strong class="data_tit">6. 대외기관 점검 및 자체품질점검</strong>
                                            <strong class="data_subtit">1) 대외점검</strong>

                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikExtrnlSheetTable1" class="ibsheet_table" :style="{height: '280px'}"></div>
                                            </div>

                                            <strong class="data_subtit mt10">2) 자체품질점검 실시 내용</strong>

                                            <!-- ibsheet -->
                                            <div class="ib_wrap">
                                                <div id="reportWikExtrnlSheetTable2" class="ibsheet_table" :style="{height: '280px'}"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                     
                            
                        <!-- 7.기타 특이사항 -->
                        <div class="steps_area" v-show="lst_steps_num == 8">
                            <div class="inner">
                                <div class="button_box">
                                    <div class="fr">
                                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="lst_steps_num = 7">이전단계</button>
                                        <button type="button" class="btn btn_sm btn_darkblue" v-if="detailInfo.progrsStatus !== '1'" @click="saveRemark()">저장</button>
                                        <span class="ico ico_save" v-if="detailInfo.progrsStatus == '1'">저장됨</span>
                                    </div>
                                </div>
                                <div class="table_normal_list table_write">
                                    <strong class="data_tit">7. 기타 특이사항</strong>
                                    <table>
                                        <caption class="sr_only"></caption>
                                        <colgroup>
                                            <col width="15%">
                                            <col width="*">
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>제목</th>
                                                <td>
                                                    <span v-if="detailInfo.progrsStatus !== '1'">
                                                        <input type="text" v-model="detailInfo.remarkTitle" maxLength="150" class="form_control">
                                                    </span>
                                                    <span v-else>{{ detailInfo.remarkTitle }}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>특이사항</th>
                                                <td>
                                                    <span v-if="detailInfo.progrsStatus !== '1'">
                                                        <textarea name="" id="" v-model="detailInfo.remarkDetail" class="form_control max_height" maxLength="1500" placeholder="특이사항이 있으면 입력해주세요. (선택 입력)"></textarea>
                                                    </span>
                                                    <span v-else>{{ detailInfo.remarkDetail }}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                    </div>

                    <!-- 결재상신 -->
                    <approve
                        ref-id="sourceApproveModal"
                        doc-type="WEKM"
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

                    <!-- alert popup -->
                    <wrapped-alert
                        refs="alertDetailPopup"
                        :ref-id="popup.refId"
                        :title="popup.title"
                        :is-show.sync="popup.isShow"
                        :message="popup.message"
                        :purpose="popup.purpose"
                        :use-cancel-button="popup.useCancelButton"
                        @click-confirm="clickPopupConfirm"
                        @click-cancel="clickPopupCancel"
                    />

                </div>
            </template>
        </b-modal>


</template>

<script>
    import { ReportWikStats21, ReportWikStats22, ReportWikStats31, ReportWikStats41, ReportWikStats42, ReportWikStats43, ReportWikStats51, ReportWikStats52, ReportWikStats61, ReportWikStats62 } from '@/pages/common/data/PopupList'

    import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
    import Datepicker from '@component/common/DatePicker.vue'
    import Approve from '@modal/approval/Approve.vue'
    import { sendPostApi, requestOptions } from '@/apis/common';

    import loader from '@ibsheet/loader';

    import PieChart from '@component/chart/PieChart.vue';
    import BarChart from '@component/chart/BarChart.vue';
    import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

    let SHEET_ID = ''; 

    export default {
        name: 'WikReportSheet',
        components: {
            WrappedAlert,
            Datepicker,
            Approve,
            PieChart,
            BarChart,
        },
        props: {
            refId: {
                type: String,
                default: 'ReportDetailWrite'
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

                /* chart option */
                plugins: [ChartJSPluginDatalabels],

                lst_steps_num: 0,
                lst_steps: [
                    '표지', 
                    '목차', 
                    '1. 부적합\n &nbsp;&nbsp;&nbsp;및 시정조치', 
                    '2. 품질시험\n &nbsp;&nbsp;&nbsp;및 검측관리', 
                    '3. 콘크리트\n &nbsp;&nbsp;&nbsp;및 균열관리', 
                    '4. 자재관리', 
                    '5. 교육관리', 
                    '6. 대외기관 점검\n &nbsp;&nbsp;&nbsp;및 자체품질점검', 
                    '7. 기타 특이사항'
                ],
                detailInfo : {
                    siteMstrId : '',
                    reportWikId : '',
                    docTitle : '',
                    subTitle : '',
                    drctMatter : '',
                    writngDt : '',
                    remarkTitle : '',
                    remarkDetail : '',
                    progrsStatus : '',
                },
                /* 부적합 */
                nonCnfrmData : {
                    carOpen : '0',
                    carClose : '0',
                    carRate : '0',
                    ncrOpen : '0',
                    ncrClose : '0',
                    ncrRate : '0',
                    punchOpen : '0',
                    punchClose : '0',
                    punchRate : '0',
                    allOpen : '0',
                    allClose : '0',
                    allRate : '0',
                },
                concPourData : {
                    suplTotlCnt : '0',
                    suplPassCnt : '0',
                    suplFailCnt : '0',
                    strgTotlCnt : '0',
                    strgPassCnt : '0',
                    strgFailCnt : '0',
                },
                /* 콘크리트 크랙 */
                concCrckData : {
                    concPourCnt : '0',
                    crckTotlCnt : '0',
                    crckPassCnt : '0',
                    crckPassRate : '0',
                },

                testSheetGrid  : {
                    data : null,
                    options : {},
                },

                inspSheetGrid  : {
                    data : null,
                    options : {},
                },
                concPourGrid  : {
                    data : null,
                    options : {},
                },

                matrialListGrid  : {
                    data : null,
                    options : {},
                },
                matrialFtryGrid  : {
                    data : null,
                    options : {},
                },
                matrialAcptGrid  : {
                    data : null,
                    options : {},
                },

                eduHecTradGrid  : {
                    data : null,
                    options : {},
                },
                eduVdeoUserGrid  : {
                    data : null,
                    options : {},
                },

                extrnlListGrid  : {
                    data : null,
                    options : {},
                },
                extrnlQultyGrid  : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    /* 부적합관리 */
                    nonCnfrm : {
                        nonCnfrmLabl: [],
                        nonCnfrmRate: [],
                    },
                    /* 품질시험관리 */
                    testType : {
                        testTypeLabl: [],
                        testCnfrmCnt: [],
                        testNonCnfrmCnt: [],
                    },
                    testInsp : {
                        testInspLabl: [],
                        testInspRate: [],
                    },
                    concPour : {
                        concPourLabl: [],
                        concPassCnt: [],
                        concFailCnt: [],
                    },
                },
                /* 결재상신 */
                approve: {
                    codeType: 'WEKM',
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
                /* alert 팝업 */
                popup: {
                    title: '',
                    isShow: false,
                    message: '',
                    useCancelButton: false,
                    buttonName: {},
                    refId: 'reportDetailAlert',
                    purpose: '',
                },
                /* alert 팝업-설정정보 */
                default: {
                    popup: {
                        successMsg : {
                            title: '알림',
                            message: '저장 되었습니다.',
                            purpose: 'save',
                            useCancelButton: false,
                            buttonName: {
                                confirm: '확인',
                            }
                        },
                        successAppMsg : {
                            title: '알림',
                            message: '결재상신 되었습니다.',
                            purpose: 'successAppCallback',
                            useCancelButton: false,
                            buttonName: {
                                confirm: '확인',
                            }
                        },
                    }
                },

                nonCnfrmPieChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#BCBBC0', '#7FD7ED', '#054F6A',  '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                nonCnfrmPieChartOptions: {
                    title: {
                        display: true,
                        text: 'Open/Close 비율'
                    },
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20,
                        }
                    },
                    plugins: {
                        datalabels: {
                            align: 'center',
                            anchor: 'center',
                            color: '#fff',
                            formatter: (value/* , ctx */) => {
                                return value + '%';
                            },
                            textAlign: "center",
                            font: {
                                weight: "bold",
                                size: 12
                            }
                        },
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        align: 'end',
                        labels:{
                          usePointStyle: true,
                          boxWidth: 6,
                          fontSize: 12,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },

                testTypeBarGroupChartData: {
                    labels: ['의뢰시험', '현장시험', '공장시험'],
                    datasets: [
                        {
                            label: '합격',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '불합격',
                            data: [],
                            backgroundColor: '#FAA719',
                            borderWidth: 0,
                            barThickness : 20,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                    ]
                },
                reportWikBarGroupChartOptions: {
                    title: {
                        display: true,
                        text: '시험별 합격/불합격 건수'
                    },
                    layout: {
                        padding: {
                            top: 40,
                            bottom: 20,
                        }
                    },
                    tooltips: {
                        mode: 'label',
                        intersect: false,
                    },
                    plugins: {
                        datalabels: {
                            // display: false,
                            align: 'end',
                            anchor: 'end',
                            offset: 0,
                            color: '#333333',
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
                                // stepSize: 5,
                                // min: 0,
                                // max: 20
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
                        display: true,
                        position: 'bottom',
                        align: 'end',
                        labels:{
                          usePointStyle: true,
                          boxWidth: 6,
                          fontSize: 12,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },

                testInspPieChartData: {
                    labels: ['건축', '설비', '전기', '토목', '조경', '품질시스템'],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                testInspPieChartOptions: {
                    title: {
                        display: true,
                        text: '분류별 진행 비중'
                    },
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20,
                        }
                    },
                    plugins: {
                        datalabels: {
                            align: 'center',
                            anchor: 'center',
                            color: '#fff',
                            formatter: (value/* , ctx */) => {
                                return value + '%';
                            },
                            textAlign: "center",
                            font: {
                                weight: "bold",
                                size: 12
                            }
                        },
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        align: 'end',
                        labels:{
                          usePointStyle: true,
                          boxWidth: 6,
                          fontSize: 12,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },

                concPourBarGroupChartData: {
                    labels: ['물성', '강도'],
                    datasets: [
                        {
                            label: '합격',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '불합격',
                            data: [],
                            backgroundColor: '#FAA719',
                            borderWidth: 0,
                            barThickness : 20,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                    ]
                },
            }
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID);
        },
        methods: {
            fn_initGrid: function () {
                let options1 = ReportWikStats21.options;
                let options2 = ReportWikStats22.options;
                let options3 = ReportWikStats31.options;
                let options4 = ReportWikStats41.options;
                let options5 = ReportWikStats42.options;
                let options6 = ReportWikStats43.options;
                let options7 = ReportWikStats51.options;
                let options8 = ReportWikStats52.options;
                let options9 = ReportWikStats61.options;
                let optionsA = ReportWikStats62.options;

                options3.Events = {
                    onRenderFirstFinish: (event) => {
                        // this.searchDetail();
                    },
                }
                loader.createSheet({
                    el: 'reportWikTestSheetTable1',
                    data: [],
                    options: options1
                }).then((sheet) => {
                    this.testSheetGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikInspSheetTable1',
                    data: [],
                    options: options2
                }).then((sheet) => {
                    this.inspSheetGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikConcSheetTable1',
                    data: [],
                    options: options3
                }).then((sheet) => {
                    this.concPourGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikMatrialSheetTable1',
                    data: [],
                    options: options4
                }).then((sheet) => {
                    this.matrialListGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikMatrialSheetTable2',
                    data: [],
                    options: options5
                }).then((sheet) => {
                    this.matrialFtryGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikMatrialSheetTable3',
                    data: [],
                    options: options6
                }).then((sheet) => {
                    this.matrialAcptGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikEduSheetTable1',
                    data: [],
                    options: options7
                }).then((sheet) => {
                    this.eduHecTradGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikEduSheetTable2',
                    data: [],
                    options: options8
                }).then((sheet) => {
                    this.eduVdeoUserGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikExtrnlSheetTable1',
                    data: [],
                    options: options9
                }).then((sheet) => {
                    this.extrnlListGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'reportWikExtrnlSheetTable2',
                    data: [],
                    options: optionsA
                }).then((sheet) => {
                    this.extrnlQultyGrid.data  = sheet
                });
            },

            loadPopup : function() {   // popup shown
                // console.log("loadPopup");
                // console.log("requestParams.siteMstrId ==> %o", this.requestParams.siteMstrId);
                // console.log("requestParams.reportWikId ==> %o", this.requestParams.reportWikId);

                this.fn_initGrid();

                this.lst_steps_num = 0;
                this.searchDetail();
                
            },
            searchDetail : function() {
                // console.log("searchDetail");
                let url = '/sendApi/api/stats/report/reportWikDetail/view';
                let param = {
                        siteMstrId : this.requestParams.siteMstrId,
                        reportWikId : this.requestParams.reportWikId
                };
                const detailData = sendPostApi(url, param)
                                   .then((data) => {
                                        this.detailInfo  = data.data.datas.dmWikDetail;

                                        this.chartData.nonCnfrm.nonCnfrmLabl = [];
                                        this.chartData.nonCnfrm.nonCnfrmRate = [];

                                        for(let i=0; i < data.data.datas.dlNonCnfrm.length; i++) {

                                            if(data.data.datas.dlNonCnfrm[i].noCnfmType == "CAR") {
                                            this.nonCnfrmData.carOpen    = data.data.datas.dlNonCnfrm[i].openCnt;
                                            this.nonCnfrmData.carClose   = data.data.datas.dlNonCnfrm[i].closeCnt;
                                            this.nonCnfrmData.carRate    = data.data.datas.dlNonCnfrm[i].closeRate;
                                            } else if(data.data.datas.dlNonCnfrm[i].noCnfmType == "NCR") {
                                            this.nonCnfrmData.ncrOpen    = data.data.datas.dlNonCnfrm[i].openCnt;
                                            this.nonCnfrmData.ncrClose   = data.data.datas.dlNonCnfrm[i].closeCnt;
                                            this.nonCnfrmData.ncrRate    = data.data.datas.dlNonCnfrm[i].closeRate;
                                            } else if(data.data.datas.dlNonCnfrm[i].noCnfmType == "Punch") {
                                            this.nonCnfrmData.punchOpen  = data.data.datas.dlNonCnfrm[i].openCnt;
                                            this.nonCnfrmData.punchClose = data.data.datas.dlNonCnfrm[i].closeCnt;
                                            this.nonCnfrmData.punchRate  = data.data.datas.dlNonCnfrm[i].closeRate;
                                            } else {
                                            this.nonCnfrmData.allOpen    = data.data.datas.dlNonCnfrm[i].openCnt;
                                            this.nonCnfrmData.allClose   = data.data.datas.dlNonCnfrm[i].closeCnt;
                                            this.nonCnfrmData.allRate    = data.data.datas.dlNonCnfrm[i].closeRate;
                                            }

                                            if(data.data.datas.dlNonCnfrm[i].noCnfmType != "ZZZ") {
                                                this.chartData.nonCnfrm.nonCnfrmLabl.push(data.data.datas.dlNonCnfrm[i].noCnfmType);
                                                this.chartData.nonCnfrm.nonCnfrmRate.push(data.data.datas.dlNonCnfrm[i].closeRate);
                                            }
                                        }

                                        this.nonCnfrmPieChartData.labels           = this.chartData.nonCnfrm.nonCnfrmLabl;
                                        this.nonCnfrmPieChartData.datasets[0].data = this.chartData.nonCnfrm.nonCnfrmRate;

                                        this.$refs.nonCnfrmPieChart.renderChartData();

                                        this.testSheetGrid.data.loadSearchData({
                                            data: data.data.datas.dlTestCond,
                                        });
                                        this.inspSheetGrid.data.loadSearchData({
                                            data: data.data.datas.dlInptCtgry,
                                        });

                                        this.chartData.testType.testTypeLabl    = [];
                                        this.chartData.testType.testCnfrmCnt    = [];
                                        this.chartData.testType.testNonCnfrmCnt = [];
                                        this.chartData.testInsp.testInspLabl    = [];
                                        this.chartData.testInsp.testInspRate    = [];


                                        for(let i=0; i < data.data.datas.dlTestCtgry.length; i++) {
                                            this.chartData.testType.testTypeLabl.push(data.data.datas.dlTestCtgry[i].testTypeNm);
                                            this.chartData.testType.testCnfrmCnt.push(data.data.datas.dlTestCtgry[i].testAcptCnt);
                                            this.chartData.testType.testNonCnfrmCnt.push(data.data.datas.dlTestCtgry[i].testFailCnt);
                                        }

                                        this.testTypeBarGroupChartData.labels           = this.chartData.testType.testTypeLabl;
                                        this.testTypeBarGroupChartData.datasets[0].data = this.chartData.testType.testCnfrmCnt;
                                        this.testTypeBarGroupChartData.datasets[1].data = this.chartData.testType.testNonCnfrmCnt;

                                        for(let i=0; i < data.data.datas.dlInptCtgry.length; i++) {
                                            this.chartData.testInsp.testInspLabl.push(data.data.datas.dlInptCtgry[i].mainCodeNm);
                                            this.chartData.testInsp.testInspRate.push(data.data.datas.dlInptCtgry[i].inptRsltRate);
                                        }

                                        this.testInspPieChartData.labels           = this.chartData.testInsp.testInspLabl;
                                        this.testInspPieChartData.datasets[0].data = this.chartData.testInsp.testInspRate;

                                        this.$refs.testTypeBarGroupChart.renderChartData();
                                        this.$refs.testInspPieChart.renderChartData();

                                        this.concPourGrid.data.loadSearchData({
                                            data: data.data.datas.dlConcPour,
                                        });

                                        this.chartData.concPour.concPourLabl = [];
                                        this.chartData.concPour.concPassCnt  = [];
                                        this.chartData.concPour.concFailCnt  = [];

                                        for(let i=0; i < data.data.datas.dlConcTest.length; i++) {
                                            if(data.data.datas.dlConcTest[i].concTestType == "SUPL") {
                                            this.concPourData.suplTotlCnt    = data.data.datas.dlConcTest[i].concTotlCnt;
                                            this.concPourData.suplPassCnt    = data.data.datas.dlConcTest[i].concPassCnt;
                                            this.concPourData.suplFailCnt   = data.data.datas.dlConcTest[i].concFailCnt;
                                            } else if(data.data.datas.dlConcTest[i].concTestType == "STRG") {
                                            this.concPourData.strgTotlCnt    = data.data.datas.dlConcTest[i].concTotlCnt;
                                            this.concPourData.strgPassCnt    = data.data.datas.dlConcTest[i].concPassCnt;
                                            this.concPourData.strgFailCnt   = data.data.datas.dlConcTest[i].concFailCnt;
                                            } 

                                            this.chartData.concPour.concPourLabl.push(data.data.datas.dlConcTest[i].concTestType);
                                            this.chartData.concPour.concPassCnt.push(data.data.datas.dlConcTest[i].concPassCnt);
                                            this.chartData.concPour.concFailCnt.push(data.data.datas.dlConcTest[i].concFailCnt);
                                        }

                                        //this.concPourBarGroupChartData.labels           = this.chartData.concPour.concTestType;
                                        this.concPourBarGroupChartData.datasets[0].data = this.chartData.concPour.concPassCnt;
                                        this.concPourBarGroupChartData.datasets[1].data = this.chartData.concPour.concFailCnt;

                                        let mathStepSize = (Number(data.data.datas.dlConcTest[0].concTotlCnt) / 10).toFixed(0);
                                        this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.max = Number(data.data.datas.dlConcTest[0].concTotlCnt);
                                        if(data.data.datas.dlConcTest != null){
                                            if( mathStepSize > 5000) {
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                            } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                            } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                            } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                            } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                            } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                            } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.max = 100;
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                            } else {
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.max = 50;
                                                this.reportWikBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                            }
                                        }

                                        this.$refs.concPourBarGroupChart.renderChartData();

                                        this.concCrckData   = data.data.datas.dmCrckInfo;


                                        this.matrialListGrid.data.loadSearchData({
                                            data: data.data.datas.dlMtrlAprv,
                                        });
                                        this.matrialFtryGrid.data.loadSearchData({
                                            data: data.data.datas.dlMtrlFtry,
                                        });
                                        this.matrialAcptGrid.data.loadSearchData({
                                            data: data.data.datas.dlMtrlAcpt,
                                        });

                                        this.eduHecTradGrid.data.loadSearchData({
                                            data: data.data.datas.dlEduHecTrad,
                                        });
                                        this.eduVdeoUserGrid.data.loadSearchData({
                                            data: data.data.datas.dlEduVdeoUser,
                                        });

                                        this.extrnlListGrid.data.loadSearchData({
                                            data: data.data.datas.dlExtrnList,
                                        });
                                        this.extrnlQultyGrid.data.loadSearchData({
                                            data: data.data.datas.dlSelfQulty,
                                        });
                                    });
            },
            saveDocInfo : function() {
                let url = '/sendApi/api/stats/report/reportWikDocInfo/change';
                let param = {
                               ...this.detailInfo
                            };
                const data = sendPostApi(url, param)
                                .then((data) => {
                                    // console.log("data : %o", data.data.count);
                                    if( data.data.count > 0 ) {
                                        this.openPopup ('successMsg');  // "보고서 생성에 성공하였습니다."
                                    }
                                });
            },
            saveRemark : function() {
                /* 기타 특이사항 저장시 표지정보도 같이 저장되도록 처리 */
                this.saveDocInfo();

                let url   = '/sendApi/api/stats/report/reportWikRemark/change';
                let param = {
                               ...this.detailInfo
                            };
                const data = sendPostApi(url, param)
                            .then((data) => {
                                if( data.data.count > 0 ) {
                                    this.openPopup ('successMsg');
                                }
                        });
            },

            /* 결재상신 */
            clickApproval () {
                // console.log('click approval')
                this.approve.docName        = '주간업무보고 내용'
                this.approve.siteMstrId = this.$cookies.get('siteMstrId');
                this.approve.docSeq     = this.detailInfo.docSeq;
                this.approve.requestId  = this.detailInfo.reportWikId;

                this.$bvModal.show('sourceApproveModal')
            },
            fn_callbackApproval: function (payload) {
                // console.log("결재상신 완료 : %o", payload)
                let url   = '/sendApi/api/stats/report/reportWikApprove/write';
                let param = {
                               ...this.detailInfo
                               , aprvInfoId : payload.aprvInfoId
                            };
                const appResultData = sendPostApi(url, param)
                                .then((data) => {
                                    // console.log("data : %o", data.data.count);
                                    if( data.data.count > 0 ) {
                                        this.openPopup ('successAppMsg');  // "결재상신 되었습니다."
                                    }
                                });
            },

            /** alert popup */ 
            openPopup (type) {
                this.popup = {
                    ...this.popup,
                    ...this.default.popup[type],
                }
                this.popup.isShow = true
            }, 
            clickPopupConfirm (purpose) {
                this.popup.isShow = false;
                // console.log(purpose)
                switch(purpose) {
                    case 'successAppCallback':
                        this.$emit('dataDtlSaveForm', this.resultParam);
                        break;
                }
            },
            clickPopupCancel (purpose) {
                this.popup.isShow = false;
                switch(purpose) {
                    case '':
                        break
                }
            },

            fn_toHtml: function (string) {
                return string ? string.split('\n').join('<br>') : ''
            },

        }
    }
</script>