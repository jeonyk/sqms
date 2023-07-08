<template>
    <div class="tab_contents">
        <div class="lnb_container on">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />
                <!-- <h2 class="sub_title">통계분석 > 시험관리</h2> -->
                <div class="lst_tabs">
                    <ul class="">
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                    </ul>
                </div>
                <div class="tab_area" v-show="currentTab == 0">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr v-if="mode !== 'inherited'">
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.ctgryFail.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.ctgryFail.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('C')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_categoryFailData()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType01">
                                                <input type="radio" id="termType01" name="searchTermType00" value="1" v-model="search.ctgryFail.searchTermType"
                                                    @click="fn_initMonthType('C')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType02">
                                                <input type="radio" id="termType02" name="searchTermType00" value="2" v-model="search.ctgryFail.searchTermType"
                                                    @click="fn_initMonthType('C')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType01">
                                                <input type="radio" id="monthType01" name="searchMonthType00" :value="'1'"
                                                    v-model="search.ctgryFail.searchMonthType" :disabled="search.ctgryFail.searchTermType=='2'">
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType02">
                                                <input type="radio" id="monthType02" name="searchMonthType00" :value="'2'"
                                                    v-model="search.ctgryFail.searchMonthType" :disabled="search.ctgryFail.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType03">
                                                <input type="radio" id="monthType03" name="searchMonthType00" :value="'3'"
                                                    v-model="search.ctgryFail.searchMonthType" :disabled="search.ctgryFail.searchTermType=='2'">

                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType04">
                                                <input type="radio" id="monthType04" name="searchMonthType00" :value="'4'"
                                                    v-model="search.ctgryFail.searchMonthType" :disabled="search.ctgryFail.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>
                                            <date-picker-range ref="searchDate" v-model="search.ctgryFail.searchDate" :format="'YYYYMMDD'" v-if="search.ctgryFail.searchTermType=='2'" />
                                        </div>
                                    </td>
                                    <td class="ar vat" v-if="mode === 'inherited'">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('C')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_categoryFailData()">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="inner">
                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        종별 기준 불합격 상위 10개
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_excel"
                                                @click="fn_exportExcel('ctgryFailGrid', '종별 기준 불합격 상위 10개')"
                                            >
                                                엑셀 다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    
                                    
                                    <!-- ibsheet -->
                                    <div class="ib_wrap mt0">
                                        <div id="ctestStatsSheetTable1" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        종별 기준 불합격 상위 10개 (불합격 건수 & 불합격 비중)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('ctgryFailChart', '종별 기준 불합격 상위 10개 (불합격 건수 & 불합격 비중)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>

                                    <BarChart id="ctgryFailChart" :data="ctgryFailChartData" :options="ctgryFailChartoptions" class="barchart" ref="ctgryFailChart"></BarChart>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 1">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr v-if="mode !== 'inherited'">
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.reqCost.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.reqCost.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('R')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_requestCostData()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType11">
                                                <input type="radio" id="termType11" name="searchTermType10" value="1" v-model="search.reqCost.searchTermType" checked
                                                    @click="fn_initMonthType('R')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType12">
                                                <input type="radio" id="termType12" name="searchTermType10" value="2" v-model="search.reqCost.searchTermType"
                                                    @click="fn_initMonthType('R')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType11">
                                                <input type="radio" id="monthType11" name="searchMonthType10" :value="'1'"
                                                    v-model="search.reqCost.searchMonthType" :disabled="search.reqCost.searchTermType=='2'" checked>
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType12">
                                                <input type="radio" id="monthType12" name="searchMonthType10" :value="'2'"
                                                    v-model="search.reqCost.searchMonthType" :disabled="search.reqCost.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType13">
                                                <input type="radio" id="monthType13" name="searchMonthType10" :value="'3'"
                                                    v-model="search.reqCost.searchMonthType" :disabled="search.reqCost.searchTermType=='2'">
                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType14">
                                                <input type="radio" id="monthType14" name="searchMonthType10" :value="'4'"
                                                    v-model="search.reqCost.searchMonthType" :disabled="search.reqCost.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>

                                            <date-picker-range ref="searchDate" v-model="search.reqCost.searchDate" :format="'YYYYMMDD'" v-if="search.reqCost.searchTermType=='2'" />
                                        </div>
                                    </td>
                                    <td class="ar vat" v-if="mode === 'inherited'">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('C')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_categoryFailData()">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="inner">

                        <div class="button_box">
                            <strong>
                                프로젝트 별 의뢰시험 비용 분석
                                <div class="fr">
                                    <button
                                        type="button"
                                        class="btn btn_sm btn_excel"
                                        @click="fn_exportExcel('pjtReqCostGrid', '프로젝트 별 의뢰시험 비용 분석')"
                                    >
                                        엑셀 다운로드
                                    </button>
                                </div>
                            </strong>
                        </div>
                            <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="ctestStatsSheetTable2" class="ibsheet_table"></div>
                        </div>
                        
                        <div class="button_box">
                            <strong>
                                공종별 의뢰시험 비용 분석
                                <div class="fr">
                                    <button
                                        type="button"
                                        class="btn btn_sm btn_excel"
                                        @click="fn_exportExcel('conReqCostGrid', '공종별 의뢰시험 비용 분석')"
                                    >
                                        엑셀 다운로드
                                    </button>
                                </div>
                            </strong>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="ctestStatsSheetTable3" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 2">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr v-if="mode !== 'inherited'">
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.insttReq.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.insttReq.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('I')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_insttRequestData()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType21">
                                                <input type="radio" id="termType21" name="searchTermType20" :value="'1'" v-model="search.insttReq.searchTermType" checked
                                                    @click="fn_initMonthType('I')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType22">
                                                <input type="radio" id="termType22" name="searchTermType20" :value="'2'" v-model="search.insttReq.searchTermType"
                                                    @click="fn_initMonthType('I')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType21">
                                                <input type="radio" id="monthType21" name="searchMonthType20" :value="'1'"
                                                    v-model="search.insttReq.searchMonthType" :disabled="search.insttReq.searchTermType=='2'" checked>
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType22">
                                                <input type="radio" id="monthType22" name="searchMonthType20" :value="'2'"
                                                    v-model="search.insttReq.searchMonthType" :disabled="search.insttReq.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType23">
                                                <input type="radio" id="monthType23" name="searchMonthType20" :value="'3'"
                                                    v-model="search.insttReq.searchMonthType" :disabled="search.insttReq.searchTermType=='2'">
                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType24">
                                                <input type="radio" id="monthType24" name="searchMonthType20" :value="'4'"
                                                    v-model="search.insttReq.searchMonthType" :disabled="search.insttReq.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>

                                            <date-picker-range ref="searchDate" v-model="search.insttReq.searchDate" :format="'YYYYMMDD'" v-if="search.insttReq.searchTermType=='2'" />
                                        </div>
                                    </td>
                                    <td class="ar vat" v-if="mode === 'inherited'">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('C')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_categoryFailData()">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="inner">

                        <div class="button_box">
                            <strong>
                                공종별 의뢰시험 비용 분석
                                <div class="fr">
                                    <button
                                        type="button"
                                        class="btn btn_sm btn_excel"
                                        @click="fn_exportExcel('insttReqGrid', '공종별 의뢰시험 비용 분석')"
                                    >
                                        엑셀 다운로드
                                    </button>
                                </div>
                            </strong>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="ctestStatsSheetTable4" class="ibsheet_table"></div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        품질시험기관의 시험 수행 비중
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('insttReqPieChart', '품질시험기관의 시험 수행 비중')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <PieChart id="insttReqPieChart" :data="insttReqPieChartData" :options="insttReqPieChartOptions" class="barchart" ref="insttReqPieChart"></PieChart>    
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        평균 소요기간
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('insttReqBarChart', '평균 소요기간')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="insttReqBarChart" :data="insttReqBarChartData" :options="insttReqBarChartOptions" class="barchart" ref="insttReqBarChart"></BarChart>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 3">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr v-if="mode !== 'inherited'">
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.typeCond.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.typeCond.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('T')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_typeConductData()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType31">
                                                <input type="radio" id="termType31" name="searchTermType30" :value="'1'" v-model="search.typeCond.searchTermType" checked
                                                    @click="fn_initMonthType('T')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType32">
                                                <input type="radio" id="termType32" name="searchTermType30" :value="'2'" v-model="search.typeCond.searchTermType"
                                                    @click="fn_initMonthType('T')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType31">
                                                <input type="radio" id="monthType31" name="searchMonthType30" :value="'1'"
                                                    v-model="search.typeCond.searchMonthType" :disabled="search.typeCond.searchTermType=='2'" checked>
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType32">
                                                <input type="radio" id="monthType32" name="searchMonthType30" :value="'2'"
                                                    v-model="search.typeCond.searchMonthType" :disabled="search.typeCond.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType33">
                                                <input type="radio" id="monthType33" name="searchMonthType30" :value="'3'"
                                                    v-model="search.typeCond.searchMonthType" :disabled="search.typeCond.searchTermType=='2'">
                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType34">
                                                <input type="radio" id="monthType34" name="searchMonthType30" :value="'4'"
                                                    v-model="search.typeCond.searchMonthType" :disabled="search.typeCond.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>

                                            <date-picker-range ref="searchDate" v-model="search.typeCond.searchDate" :format="'YYYYMMDD'" v-if="search.typeCond.searchTermType=='2'" />
                                        </div>
                                    </td>
                                    <td class="ar vat" v-if="mode === 'inherited'">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('C')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_categoryFailData()">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="inner">
                        <div class="button_box">
                            <strong>
                                시험TYPE별 시험 수행 비중
                                <div class="fr">
                                    <button
                                        type="button"
                                        class="btn btn_sm btn_excel"
                                        @click="fn_exportExcel('typeCondGrid', '시험TYPE별 시험 수행 비중')"
                                    >
                                        엑셀 다운로드
                                    </button>
                                </div>
                            </strong>
                        </div>
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="ctestStatsSheetTable5" class="ibsheet_table"></div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        시험 TYPE별 비중
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('typeCondPieChart', '시험 TYPE별 비중')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <PieChart id="typeCondPieChart" :data="typeCondPieChartData" :options="typeCondPieChartOptions" class="barchart" ref="typeCondPieChart"></PieChart>    
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        평균 소요기간
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('typeCondBarChart', '평균 소요기간')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="typeCondBarChart" :data="typeCondBarChartData" :options="typeCondBarChartOptions" class="barchart" ref="typeCondBarChart"></BarChart>    
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import { TestCtgryFail, TestPjtReqCost, TestConReqCost, TestInsttReq, TestTypeCond } from '@/pages/common/data/StatisticsList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import loader from '@ibsheet/loader'

    import PieChart from '@component/chart/PieChart.vue';
    import BarChart from '@component/chart/BarChart.vue';
    import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

    import axios from 'axios'

    let SHEET_ID = ''; 

    export default {
        name: 'TestStatsView',
        components: {
            Breadcrumb,
            DatePickerRange,
            BarChart,
            PieChart,
        },
        computed: {
            // store 정보에 따른 mode 정보 변경
            mode: function () {
                return ['GADT_0000000001', 'GADT_0000000002'].includes(this.$store.getters['auth/getGroupAuthDtlId']) ? '' : 'inherited'
            }
        },
        data() {
            return {
                // mode: 'inherited',  // 상속모드 inherited 

                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정
                tabs: ['불합격시험', '시험비용', '시험기관', '시험TYPE비중'], // tab name

                /* chart option */
                plugins: [ChartJSPluginDatalabels],

                /* Grid option */
                ctgryFailGrid  : {
                    data : null,
                    options : {},
                },
                pjtReqCostGrid  : {
                    data : null,
                    options : {},
                },
                conReqCostGrid  : {
                    data : null,
                    options : {},
                },
                insttReqGrid  : {
                    data : null,
                    options : {},
                },
                typeCondGrid  : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    ctgryFail: {
                        ctgryDataLbl: [],
                        ctgryLineData: [],
                        ctgryBarData: [],
                    },
                    insttReq: {
                        insttPieLbl: [],
                        insttPieData: [],
                        insttBarLbl: [],
                        insttBarData: [],
                    },
                    typeCond: {
                        typeCondPieLbl: [],
                        typeCondPieData: [],
                        typeCondBarLbl: [],
                        typeCondBarData: [],
                    }
                },

                /** searchInfo */
                search: {
                    ctgryFail: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    reqCost: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    insttReq: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    typeCond: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                },

                /* 프로젝트 구분 */
                advancedInfo: {
                    mngtType: []
                },
                
                /* 불합격시험 차트 */
                ctgryFailChartData: {
                    //labels: ['성토용 흙', '말뚞'],
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '불합격 비중',
                            //data: [41.38, 50.0],
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#F9A038',
                            pointRadius: 4,
                            pointBackgroundColor: '#F9A038',
                            datalabels: {
                                anchor: 'start',
                                color: '#F9A038',
                                offset: 20,
                                align: function() {
                                    return 280;
                                },
                                formatter: (value) => {
                                    return value + '%';
                                },
                            }
                        },
                        {
                            type: 'bar',
                            label: '불합격 건수',
                            //data: [12, 1],
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#28A1E0',
                            }
                        },
                        
                    ]
                },
                ctgryFailChartoptions: {
                    layout: {
                        padding: {
                            top: 40,
                            bottom: 20,
                        }
                    },
                    tooltips: {
                        mode: 'label',
                        intersect: false,
                        itemSort: function(a, b) {
                            return b.datasetIndex - a.datasetIndex
                        },
                        callbacks: {
                            /* title: function() {
                                return false;
                            }, */
                            label: function(item, data) {
                                if(item.datasetIndex != 0) { // 비중 제외한 tooltip return
                                    return (data.datasets[item.datasetIndex].label) + ": " + item.value;
                                }
                            },
                        },
                    },
                    plugins: {
                        datalabels: {
                            backgroundColor: "transparent",
                            textAlign: "center",
                            font: {
                                weight: "bold",
                                size: 12
                            }
                        },
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
                        reverse: true, // 범례 역순
                    },
                    scales: {
                        yAxes: [{
                            position: 'left',
                            ticks: {
                                beginAtZero: true,
                                stepSize: 200,
                                min: 0,
                                max: 2000
                            },
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                borderDash: [3, 2],
                                borderColor: '#dcdcdc'
                            }
                        }, {
                            id: 'rightAlign',
                            position: 'right',
                            ticks: {
                                beginAtZero: true,
                                stepSize: 5,
                                min: 0,
                                max: 100,
                                callback: function(value) {
                                    return value + '%';
                                }
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false,
                                borderDash: [3, 2],
                                borderColor: '#dcdcdc'
                            },
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },


                /* 시험기관 차트 */
                insttReqPieChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                insttReqPieChartOptions: {
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
                                // let sum = 0;
                                // let dataArr = ctx.chart.data.datasets[0].data;
                                // dataArr.map(data => {
                                //     sum += data;
                                // });
                                // let percentage = (value*100 / sum).toFixed(2)+"%";
                                return value+"%";
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

                insttReqBarChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '전체',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness: 20,
                        },
                    ]
                },
                insttReqBarChartOptions: {
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
                                stepSize: 5,
                                min: 0,
                                max: 20
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

                /* 시험TYPE비중 차트 */
                typeCondPieChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                typeCondPieChartOptions: {
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
                            formatter: (value /*, ctx */) => {
                                // let sum = 0;
                                // let dataArr = ctx.chart.data.datasets[0].data;
                                // dataArr.map(data => {
                                //     sum += data;
                                // });
                                // let percentage = (value*100 / sum).toFixed(2)+"%";
                                // return percentage;

                                return value+"%";
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

                typeCondBarChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '전체',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness: 20,
                        },
                    ]
                },
                typeCondBarChartOptions: {
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
                                stepSize: 5,
                                min: 0,
                                max: 20
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
        mounted() {
            this.fn_fetchAdvanceInfo();
            this.fn_initGrid();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
            fn_initGrid: function () {
                /* 불합격시험 */

                let options1 = TestCtgryFail.options;
                options1.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_categoryFailData();
                    },
                }

                loader.createSheet({
                    el: 'ctestStatsSheetTable1',
                    data: [],
                    options: options1
                }).then((sheet) => {
                    this.ctgryFailGrid.data  = sheet
                });
                /* 시험비용 */ 
                let options2 = TestPjtReqCost.options;
                let options3 = TestConReqCost.options;
                options2.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_requestCostData();
                    },
                }
                loader.createSheet({
                    el: 'ctestStatsSheetTable2',
                    data: [],
                    options: options2
                }).then((sheet) => {
                    this.pjtReqCostGrid.data  = sheet
                });
                loader.createSheet({
                    el: 'ctestStatsSheetTable3',
                    data: [],
                    options: options3
                }).then((sheet) => {
                    this.conReqCostGrid.data = sheet
                });
                
                /* 시험기관 */
                let options4 = TestInsttReq.options;
                options4.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_insttRequestData();
                    },
                }
                loader.createSheet({
                    el: 'ctestStatsSheetTable4',
                    data: [],
                    options: options4
                }).then((sheet) => {
                    this.insttReqGrid.data = sheet
                });
                
                /* 시험TYPE비중 */
                let options5 = TestTypeCond.options;
                options5.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_typeConductData();
                    },
                }
                loader.createSheet({
                    el: 'ctestStatsSheetTable5',
                    data: [],
                    options: options5
                }).then((sheet) => {
                    this.typeCondGrid.data = sheet
                });
            },

            fn_clearSearch: function (type) {
                if(type == "C"){
                    this.search.ctgryFail.searchMngtType  = '';
                    this.search.ctgryFail.searchProjectNm = null;
                    this.search.ctgryFail.searchTermType  = '1';
                    this.search.ctgryFail.searchMonthType = '1';
                    this.search.ctgryFail.searchDate      = [null, null],
                    this.search.ctgryFail.searchStartDt   = null,
                    this.search.ctgryFail.searchEndDt     = null,

                    this.ctgryFailGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("C");
                } else if(type == "R"){
                    this.search.reqCost.searchMngtType  = '';
                    this.search.reqCost.searchProjectNm = null;
                    this.search.reqCost.searchTermType  = '1';
                    this.search.reqCost.searchMonthType = '1';
                    this.search.reqCost.searchDate      = [null, null],
                    this.search.reqCost.searchStartDt   = null,
                    this.search.reqCost.searchEndDt     = null,
                    
                    this.pjtReqCostGrid.data.loadSearchData({
                        data : null
                    });
                    this.conReqCostGrid.data.loadSearchData({
                        data : null
                    });
                } else if(type == "I"){
                    this.search.insttReq.searchMngtType  = '';
                    this.search.insttReq.searchProjectNm = null;
                    this.search.insttReq.searchTermType  = '1';
                    this.search.insttReq.searchMonthType = '1';
                    this.search.insttReq.searchDate      = [null, null],
                    this.search.insttReq.searchStartDt   = null,
                    this.search.insttReq.searchEndDt     = null,
                    
                    this.insttReqGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("I");
                } else if(type == "T"){
                    this.search.typeCond.searchMngtType  = '';
                    this.search.typeCond.searchProjectNm = null;
                    this.search.typeCond.searchTermType  = '1';
                    this.search.typeCond.searchMonthType = '1';
                    this.search.typeCond.searchDate      = [null, null],
                    this.search.typeCond.searchStartDt   = null,
                    this.search.typeCond.searchEndDt     = null,
                    
                    this.typeCondGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("T");
                }
            },

            fn_clearChart: function (type) {
               if(type == "C"){
                    this.chartData.ctgryFail.ctgryDataLbl  = [];
                    this.chartData.ctgryFail.ctgryLineData = [];
                    this.chartData.ctgryFail.ctgryBarData  = [];

                    this.ctgryFailChartData.labels           = [];
                    this.ctgryFailChartData.datasets[0].data = [];
                    this.ctgryFailChartData.datasets[1].data = [];

                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.max      = 1000;
                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 100;

                    this.$refs.ctgryFailChart.renderChartData();
                } else if(type == "I"){
                    this.chartData.insttReq.insttPieLbl  = [];
                    this.chartData.insttReq.insttPieData = [];
                    this.chartData.insttReq.insttBarLbl  = [];
                    this.chartData.insttReq.insttBarData = [];
                    
                    this.insttReqPieChartData.labels           = [];
                    this.insttReqPieChartData.datasets[0].data = [];
                    this.insttReqBarChartData.labels           = [];
                    this.insttReqBarChartData.datasets[0].data = [];

                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.max      = 50;
                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.stepSize = 5;

                    this.$refs.insttReqPieChart.renderChartData();
                    this.$refs.insttReqBarChart.renderChartData();
                } else if(type == "T"){
                    this.chartData.typeCond.typeCondPieLbl  = [];
                    this.chartData.typeCond.typeCondPieData = [];
                    this.chartData.typeCond.typeCondBarLbl  = [];
                    this.chartData.typeCond.typeCondBarData = [];
                    
                    this.typeCondPieChartData.labels           = [];
                    this.typeCondPieChartData.datasets[0].data = [];
                    this.typeCondBarChartData.labels           = [];
                    this.typeCondBarChartData.datasets[0].data = [];

                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.max      = 50;
                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                    
                    this.$refs.typeCondPieChart.renderChartData();
                    this.$refs.typeCondBarChart.renderChartData();
                }
            },

            fn_initMonthType: function (type) {
                // console.log(type + " === " + this.search.ctgryFail.searchTermType + "  ****  " + this.search.ctgryFail.searchMonthType);
                if(type == "C"){
                    if(this.search.ctgryFail.searchTermType  == '1' && this.search.ctgryFail.searchMonthType != null){
                        this.search.ctgryFail.searchMonthType = null;
                    } else if(this.search.ctgryFail.searchTermType  == '2' && this.search.ctgryFail.searchMonthType == null){
                        this.search.ctgryFail.searchMonthType = '1';
                        this.search.ctgryFail.searchDate      = [null, null];
                        this.search.ctgryFail.searchStartDt   = null;
                        this.search.ctgryFail.searchEndDt     = null;
                    }
                } else if(type == "R"){
                    if(this.search.reqCost.searchTermType  == '1' && this.search.reqCost.searchMonthType != null){
                        this.search.reqCost.searchMonthType = null;
                    } else if(this.search.reqCost.searchTermType  == '2' && this.search.reqCost.searchMonthType == null){
                        this.search.reqCost.searchMonthType = '1';
                        this.search.reqCost.searchDate      = [null, null];
                        this.search.reqCost.searchStartDt   = null;
                        this.search.reqCost.searchEndDt     = null;
                    }
                } else if(type == "I"){
                    if(this.search.insttReq.searchTermType  == '1' && this.search.insttReq.searchMonthType != null){
                        this.search.insttReq.searchMonthType = null;
                    } else if(this.search.insttReq.searchTermType  == '2' && this.search.insttReq.searchMonthType == null){
                        this.search.insttReq.searchMonthType = '1';
                        this.search.insttReq.searchDate      = [null, null];
                        this.search.insttReq.searchStartDt   = null;
                        this.search.insttReq.searchEndDt     = null;
                    }
                } else if(type == "T"){
                    if(this.search.typeCond.searchTermType  == '1' && this.search.typeCond.searchMonthType != null){
                        this.search.typeCond.searchMonthType = null;
                    } else if(this.search.typeCond.searchTermType  == '2' && this.search.typeCond.searchMonthType == null){
                        this.search.typeCond.searchMonthType = '1';
                        this.search.typeCond.searchDate      = [null, null];
                        this.search.typeCond.searchStartDt   = null;
                        this.search.typeCond.searchEndDt     = null;
                    }
                }
            },

            fn_fetchAdvanceInfo: function () {
                const masterCode = {
                    url: '/sendApi/api/common/masterCode/list',
                    payload: {
                        siteMstrId: this.$cookies.get('siteMstrId'),
                    }
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(masterCode.url, {...masterCode.payload, groupCode: 'MNGT_TYPE'}, options)
                .then(response => {
                     this.advancedInfo.mngtType          = response.data.data
                })
                .catch(error => {
                     console.error(error)
                })
                .then(() => {
                    // console.log("end");
                })
            },

            fn_categoryFailData : async function(){
                // console.log(" search.ctgryFail *************  %o", this.search.ctgryFail);

                this.fn_clearChart("C");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/test/testCategoryFail/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.ctgryFail,
                    searchStartDt   : this.search.ctgryFail.searchDate[0],
                    searchEndDt     : this.search.ctgryFail.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.ctgryFailGrid.data.loadSearchData({
                                data: response.data.datas.dlCtgryFail,
                            });

                            for(let i=0; i < response.data.datas.dlCtgryFail.length; i++) {
                                this.chartData.ctgryFail.ctgryDataLbl.push(response.data.datas.dlCtgryFail[i].subName);
                                this.chartData.ctgryFail.ctgryLineData.push(response.data.datas.dlCtgryFail[i].avgCnt);
                                this.chartData.ctgryFail.ctgryBarData.push(response.data.datas.dlCtgryFail[i].rsltCnt);
                            }

                            this.ctgryFailChartData.labels           = this.chartData.ctgryFail.ctgryDataLbl;
                            this.ctgryFailChartData.datasets[0].data = this.chartData.ctgryFail.ctgryLineData;
                            this.ctgryFailChartData.datasets[1].data = this.chartData.ctgryFail.ctgryBarData;

                            let mathStepSize = (Number(response.data.datas.dlCtgryFail[0].rsltCnt) / 10).toFixed(0);
                            this.ctgryFailChartoptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlCtgryFail[0].rsltCnt);

                            if(response.data.datas.dlCtgryFail != null){
                                if( mathStepSize > 5000) {
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.max = 100;
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.max = 50;
                                    this.ctgryFailChartoptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.ctgryFailChart.renderChartData();
                });

            },

            fn_requestCostData : async function(){
                // console.log(" search.reqCost *************  %o", this.search.reqCost);

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/test/testRequestCost/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.reqCost,
                    searchStartDt   : this.search.reqCost.searchDate[0],
                    searchEndDt     : this.search.reqCost.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.pjtReqCostGrid.data.loadSearchData({
                                data: response.data.datas.dlPjtReqCost,
                            });
                            this.conReqCostGrid.data.loadSearchData({
                                data: response.data.datas.dlConReqCost,
                            });
                });
            },

            fn_insttRequestData : async function(){
                // console.log("this.search.insttReq *************  " + this.search.insttReq);

                this.fn_clearChart("I");
                
                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/test/testInsttRequest/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.insttReq,
                    searchStartDt   : this.search.insttReq.searchDate[0],
                    searchEndDt     : this.search.insttReq.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.insttReqGrid.data.loadSearchData({
                                data: response.data.datas.dlInsttReq,
                            });

                            for(let i=0; i < response.data.datas.dlInsttReq.length; i++) {
                                this.chartData.insttReq.insttPieLbl.push(response.data.datas.dlInsttReq[i].testInsttNm);
                                this.chartData.insttReq.insttPieData.push(response.data.datas.dlInsttReq[i].avgTestRate);
                                this.chartData.insttReq.insttBarLbl.push(response.data.datas.dlInsttReq[i].testInsttNm);
                                this.chartData.insttReq.insttBarData.push(response.data.datas.dlInsttReq[i].avgDay);
                            }

                            this.insttReqPieChartData.labels           = this.chartData.insttReq.insttPieLbl;
                            this.insttReqPieChartData.datasets[0].data = this.chartData.insttReq.insttPieData;
                            this.insttReqBarChartData.labels           = this.chartData.insttReq.insttBarLbl;
                            this.insttReqBarChartData.datasets[0].data = this.chartData.insttReq.insttBarData;

                            let mathStepSize = (Number(response.data.datas.dlInsttReq[0].avgDay) / 10).toFixed(0);
                            this.insttReqBarChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlInsttReq[0].avgDay);

                            if(response.data.datas.dlInsttReq != null){
                                if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else if( mathStepSize > 3 && mathStepSize <= 5) {
                                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.stepSize = 5
                                } else if( mathStepSize > 1 && mathStepSize <= 3) {
                                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.max = 30;
                                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.stepSize = 5
                                } else {
                                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.max = 10;
                                    this.insttReqBarChartOptions.scales.yAxes[0].ticks.stepSize = 2;
                                }
                            }

                            this.$refs.insttReqPieChart.renderChartData();
                            this.$refs.insttReqBarChart.renderChartData();
                });
            },

            fn_typeConductData : async function(){
                // console.log("this.search.typeCond *************  " + this.search.typeCond);

                this.fn_clearChart("T");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/test/testTypeConduct/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.typeCond,
                    searchStartDt   : this.search.typeCond.searchDate[0],
                    searchEndDt     : this.search.typeCond.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.typeCondGrid.data.loadSearchData({
                                data: response.data.datas.dlTypeCond,
                            });

                            for(let i=0; i < response.data.datas.dlTypeCond.length; i++) {
                                this.chartData.typeCond.typeCondPieLbl.push(response.data.datas.dlTypeCond[i].testTypeNm);
                                this.chartData.typeCond.typeCondPieData.push(response.data.datas.dlTypeCond[i].avgTestRate);
                                this.chartData.typeCond.typeCondBarLbl.push(response.data.datas.dlTypeCond[i].testTypeNm);
                                this.chartData.typeCond.typeCondBarData.push(response.data.datas.dlTypeCond[i].avgDay);
                            }

                            this.typeCondPieChartData.labels           = this.chartData.typeCond.typeCondPieLbl;
                            this.typeCondPieChartData.datasets[0].data = this.chartData.typeCond.typeCondPieData;
                            this.typeCondBarChartData.labels           = this.chartData.typeCond.typeCondBarLbl;
                            this.typeCondBarChartData.datasets[0].data = this.chartData.typeCond.typeCondBarData;

                            let mathStepSize = (Number(response.data.datas.dlTypeCond[0].avgDay) / 10).toFixed(0);
                            this.typeCondBarChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlTypeCond[0].avgDay);

                            if(response.data.datas.dlTypeCond != null){
                                if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else if( mathStepSize > 3 && mathStepSize <= 5) {
                                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.stepSize = 5
                                } else if( mathStepSize > 1 && mathStepSize <= 3) {
                                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.max = 30;
                                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.stepSize = 5
                                } else {
                                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.max = 10;
                                    this.typeCondBarChartOptions.scales.yAxes[0].ticks.stepSize = 2;
                                }
                            }

                            this.$refs.typeCondPieChart.renderChartData();
                            this.$refs.typeCondBarChart.renderChartData();
                });
            },
            /** excel 다운로드 */
            fn_exportExcel: function (sheetId, fileName) {
                // const sheet = this[sheetId].data
                
                this[sheetId].data.down2Excel({
                    downCols:   'Visible',
                    reqHeader:  {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Accept-Language': 'ko'
                                },
                    fileName:   (fileName ? fileName : sheetId) +`_${this.$moment().format('YYYYMMDD')}.xlsx`,
                })

                this[sheetId].data.hideMessage()
            },

            /** image다운로드 */
            fn_chartToImage: function (chartId, fileName) {
                const canvas = this.$refs[chartId].$refs.canvas
                const image = canvas.toDataURL('image/png')

                const link          = document.createElement('a')
                link.style.cssText  = 'display:none'
                link.href           = image
                link.setAttribute('download', (fileName ? fileName : chartId) + `_${this.$moment().format('YYYYMMDD')}.png`)

                document.body.appendChild(link)
                link.click()
                link.remove()
            },

        }
    }
</script>

<style scoped>
.barchart{
  padding: 0 30px;
  height: 438px;
  border: 1px solid #DCDCDC;
}
</style>