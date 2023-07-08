<template>
    <div class="wrap">
        <div class="lnb_container on">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />
                <!-- <h2 class="sub_title">통계분석 > 부적합관리</h2> -->
                <div class="lst_tabs">
                    <ul class="">
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                    </ul>
                </div>
                <!-- 부적합 다발 시공업체 -->
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
                                            <select v-model="search.issuData.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.issuData.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('I')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_nonCnfrmIssu()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType01">
                                                <input type="radio" id="termType01" name="searchTermType00" value="1" v-model="search.issuData.searchTermType"
                                                    @click="fn_initMonthType('I')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType02">
                                                <input type="radio" id="termType02" name="searchTermType00" value="2" v-model="search.issuData.searchTermType"
                                                    @click="fn_initMonthType('I')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType01">
                                                <input type="radio" id="monthType01" name="searchMonthType00" :value="'1'"
                                                    v-model="search.issuData.searchMonthType" :disabled="search.issuData.searchTermType=='2'">
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType02">
                                                <input type="radio" id="monthType02" name="searchMonthType00" :value="'2'"
                                                    v-model="search.issuData.searchMonthType" :disabled="search.issuData.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType03">
                                                <input type="radio" id="monthType03" name="searchMonthType00" :value="'3'"
                                                    v-model="search.issuData.searchMonthType" :disabled="search.issuData.searchTermType=='2'">

                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType04">
                                                <input type="radio" id="monthType04" name="searchMonthType00" :value="'4'"
                                                    v-model="search.issuData.searchMonthType" :disabled="search.issuData.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>
                                            <date-picker-range ref="searchDate" v-model="search.issuData.searchDate" :format="'YYYYMMDD'" v-if="search.issuData.searchTermType=='2'" />
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
                                        부적합(Punch) 발행 상위 10개 업체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_excel"
                                                @click="fn_exportExcel('issuCompPunGrid')"
                                            >
                                                엑셀 다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable11" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(Punch) 발행 상위 10개 업체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('issuCompPunBarChart')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="issuCompPunBarChart" :data="issuCompPunBarChartData" :options="issuCompBarChartOptions" class="barchart" ref="issuCompPunBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(NCR) 발행 상위 10개 업체
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('issuCompNcrGrid', '부적합(NCR) 발행 상위 10개 업체')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable12" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(NCR) 발행 상위 10개 업체
										<div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('issuCompNcrBarChart', '부적합(NCR) 발행 상위 10개 업체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="issuCompNcrBarChart" :data="issuCompNcrBarChartData" :options="issuCompBarChartOptions" class="barchart" ref="issuCompNcrBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(CAR) 발행 상위 10개 업체
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('issuCompCarGrid', '부적합(CAR) 발행 상위 10개 업체')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable13" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(CAR) 발행 상위 10개 업체
										<div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('issuCompCarBarChart', '부적합(CAR) 발행 상위 10개 업체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="issuCompCarBarChart" :data="issuCompCarBarChartData" :options="issuCompBarChartOptions" class="barchart" ref="issuCompCarBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(Punch) 발행 원인별
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('issuCausePunGrid', '부적합(Punch) 발행 원인별')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable14" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        원인별 부적합(Punch) 발행건수
										<div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('issuCausePunBarChart', '원인별 부적합(Punch) 발행건수')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="issuCausePunBarChart" :data="issuCausePunBarChartData" :options="issuCauseBarChartOptions" class="barchart" ref="issuCausePunBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(NCR) 발행 원인별
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('issuCauseNcrGrid', '부적합(NCR) 발행 원인별')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable15" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        원인별 부적합(NCR) 발행건수
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('issuCauseNcrBarChart', '원인별 부적합(NCR) 발행건수')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="issuCauseNcrBarChart" :data="issuCauseNcrBarChartData" :options="issuCauseBarChartOptions" class="barchart" ref="issuCauseNcrBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(CAR) 발행 원인별
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('issuCauseCarGrid', '부적합(CAR) 발행 원인별')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable16" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        원인별 부적합(CAR) 발행건수
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('issuCauseCarBarChart', '원인별 부적합(CAR) 발행건수')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="issuCauseCarBarChart" :data="issuCauseCarBarChartData" :options="issuCauseBarChartOptions" class="barchart" ref="issuCauseCarBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 부적합 회신지연 시공업체 -->
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
                                            <select v-model="search.delyData.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.delyData.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('D')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_nonCnfrmDely()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType11">
                                                <input type="radio" id="termType11" name="searchTermType10" value="1" v-model="search.delyData.searchTermType" checked
                                                    @click="fn_initMonthType('D')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType12">
                                                <input type="radio" id="termType12" name="searchTermType10" value="2" v-model="search.delyData.searchTermType"
                                                    @click="fn_initMonthType('D')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType11">
                                                <input type="radio" id="monthType11" name="searchMonthType10" :value="'1'"
                                                    v-model="search.delyData.searchMonthType" :disabled="search.delyData.searchTermType=='2'" checked>
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType12">
                                                <input type="radio" id="monthType12" name="searchMonthType10" :value="'2'"
                                                    v-model="search.delyData.searchMonthType" :disabled="search.delyData.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType13">
                                                <input type="radio" id="monthType13" name="searchMonthType10" :value="'3'"
                                                    v-model="search.delyData.searchMonthType" :disabled="search.delyData.searchTermType=='2'">
                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType14">
                                                <input type="radio" id="monthType14" name="searchMonthType10" :value="'4'"
                                                    v-model="search.delyData.searchMonthType" :disabled="search.delyData.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>

                                            <date-picker-range ref="searchDate" v-model="search.delyData.searchDate" :format="'YYYYMMDD'" v-if="search.delyData.searchTermType=='2'" />
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
                                        부적합(Punch) 지연 상위 10개 업체
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('delyCompPunGrid', '부적합(Punch) 지연 상위 10개 업체')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable21" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(Punch) 지연 상위 10개 업체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('delyCompPunBarChart', '부적합(Punch) 지연 상위 10개 업체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="delyCompPunBarChart" :data="delyCompPunBarChartData" :options="delyCompBarChartOptions" class="barchart" ref="delyCompPunBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(NCR) 지연 상위 10개 업체
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('delyCompNcrGrid', '부적합(NCR) 지연 상위 10개 업체')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable22" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(NCR) 지연 상위 10개 업체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('delyCompNcrBarChart', '부적합(NCR) 지연 상위 10개 업체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="delyCompNcrBarChart" :data="delyCompNcrBarChartData" :options="delyCompBarChartOptions" class="barchart" ref="delyCompNcrBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(CAR) 지연 상위 10개 업체
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('delyCompCarGrid', '부적합(CAR) 지연 상위 10개 업체')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable23" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(CAR) 지연 상위 10개 업체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('delyCompCarBarChart', '부적합(CAR) 지연 상위 10개 업체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="delyCompCarBarChart" :data="delyCompCarBarChartData" :options="delyCompBarChartOptions" class="barchart" ref="delyCompCarBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                    <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(Punch) 발생 원인별 지연 상위 10개
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('delyCausePunGrid', '부적합(Punch) 발생 원인별 지연 상위 10개' )"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable24" class="ibsheet_table"></div>
                                    </div>
                                    </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(NCR) 지연 상위 10개 업체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('delyCausePunBarChart', '부적합(NCR) 지연 상위 10개 업체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="delyCausePunBarChart" :data="delyCausePunBarChartData" :options="delyCauseBarChartOptions" class="barchart" ref="delyCausePunBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                    <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(NCR) 발생 원인별 지연 상위 10개
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('delyCauseNcrGrid', '부적합(NCR) 발생 원인별 지연 상위 10개')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable25" class="ibsheet_table"></div>
                                    </div>
                                    </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(CAR) 지연 상위 10개 업체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('delyCauseNcrBarChart', '부적합(CAR) 지연 상위 10개 업체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="delyCauseNcrBarChart" :data="delyCauseNcrBarChartData" :options="delyCauseBarChartOptions" class="barchart" ref="delyCauseNcrBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>                <div class="table_data mt20">
                            <div class="move_box w50">
                                    <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(CAR) 발생 원인별 지연 상위 10개
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('delyCauseCarGrid', '부적합(CAR) 발생 원인별 지연 상위 10개')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable26" class="ibsheet_table"></div>
                                    </div>
                                    </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        부적합(Punch) 지연 상위 10개 업체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('delyCauseCarBarChart', '부적합(Punch) 지연 상위 10개 업체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="delyCauseCarBarChart" :data="delyCauseCarBarChartData" :options="delyCauseBarChartOptions" class="barchart" ref="delyCauseCarBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>

                <!-- 부적합관리(현장)-->
                <div class="tab_area" v-show="currentTab == 2">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="3%">
                                <col width="20%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>기간</th>   
                                    <td>
                                        <!-- <select name="" id="cnstSiteYear" class="form_control size_sm" v-model="search.cnstSite.searchYear" v-on:change="fn_clearSearch('C')"> -->
                                        <select name="" id="cnstSiteYear" class="form_control size_sm" v-model="search.cnstSite.searchYear">
                                            <!-- <option value="" selected>선택</option> -->
                                            <option v-for="index in 20" :key="index" :value="advancedInfo.startYear - index + 2">
                                                {{advancedInfo.startYear - index + 2}}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('C')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_nonCnfrmCnstSite()">검색</button>
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
                                        1. 부적합현황
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('cnstSiteAllBarChart', '부적합현황')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="cnstSiteAllBarChart" :data="cnstSiteAllBarChartData" :options="cnstSiteBarChartOptions" class="barchart" ref="cnstSiteAllBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <!-- <strong class="data_tit"></strong> -->
                                    <strong class="data_tit">
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('cnstSiteAllGrid', '부적합현황')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable31" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">2. 부적합 분류별 (CAR/NCR/Punch)</strong>
                                    <strong class="data_subtit">
                                        - CAR
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('cnstSiteCarBarChart', '부적합 분류별-CAR')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="cnstSiteCarBarChart" :data="cnstSiteCarBarChartData" :options="cnstSiteBarChartOptions" class="barchart" ref="cnstSiteCarBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit ir">2. 부적합 분류별 (CAR/NCR/Punch)</strong>
                                    <strong class="data_subtit ir">
                                        - CAR
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('cnstSiteCarGrid', '부적합 분류별-CAR')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable32" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        - NCR
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('cnstSiteNcrBarChart', '부적합 분류별-NCR')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="cnstSiteNcrBarChart" :data="cnstSiteNcrBarChartData" :options="cnstSiteBarChartOptions" class="barchart" ref="cnstSiteNcrBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit ir">
                                        - NCR
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('cnstSiteNcrGrid', '부적합 분류별-NCR')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable33" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        - Punch
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('cnstSitePunBarChart', '부적합 분류별-Punch')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="cnstSitePunBarChart" :data="cnstSitePunBarChartData" :options="cnstSiteBarChartOptions" class="barchart" ref="cnstSitePunBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit ir">
                                        - Punch
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('cnstSitePunGrid', '부적합 분류별-Punch')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable34" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 부적합관리(전사)-->
                <div class="tab_area" v-show="currentTab == 3">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="3%">
                                <col width="20%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>기간</th>   
                                    <td>
                                        <!-- <select name="" id="allSiteYear" class="form_control size_sm" v-model="search.allSite.searchYear" v-on:change="fn_clearSearch('A')"> -->
                                        <select name="" id="allSiteYear" class="form_control size_sm" v-model="search.allSite.searchYear">
                                            <!-- <option value="" selected>선택</option> -->
                                            <option v-for="index in 20" :key="index" :value="advancedInfo.startYear - index + 2">
                                                {{advancedInfo.startYear - index + 2}}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('A')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_nonCnfrmAllSite()">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="inner">
                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">1. 부적합현황 (자체발행)</strong>
                                    <strong class="data_subtit">
                                        - 자체
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('ctgryFaiallSiteHecBarChartlChart', '부적합현황 (자체발행)-자체')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="allSiteHecBarChart" :data="allSiteHecBarChartData" :options="allSiteBarChartOptions" class="barchart" ref="allSiteHecBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit ir">1. 부적합현황 (자체발행)</strong>
                                    <strong class="data_subtit ir">
                                        - 자체
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('allSiteHecGrid', '부적합현황 (자체발행)-자체')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- <strong class="data_tit"></strong> -->
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable41" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">2. 부적합 분류별 (CAR/NCR/Punch)</strong>
                                    <strong class="data_subtit">
                                        - CAR
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('allSiteCarBarChart', '부적합 분류별-CAR')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="allSiteCarBarChart" :data="allSiteCarBarChartData" :options="allSiteBarChartOptions" class="barchart" ref="allSiteCarBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit ir">2. 부적합 분류별 (CAR/NCR/Punch)</strong>
                                    <strong class="data_subtit ir">
                                        - CAR
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('allSiteCarGrid', '부적합 분류별-CAR')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable42" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        - NCR
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('allSiteNcrBarChart', '부적합 분류별-NCR')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="allSiteNcrBarChart" :data="allSiteNcrBarChartData" :options="allSiteBarChartOptions" class="barchart" ref="allSiteNcrBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit ir">
                                        - NCR
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('allSiteNcrGrid', '부적합 분류별-NCR')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable43" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        - Punch
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('allSitePunBarChart', '부적합 분류별-Punch')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="allSitePunBarChart" :data="allSitePunBarChartData" :options="allSiteBarChartOptions" class="barchart" ref="allSitePunBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit ir">
                                        - Punch
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('allSitePunGrid', '부적합 분류별-Punch')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable44" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">3. 발생원인별 현황</strong>
                                    <strong class="data_subtit">
                                        - 발생원인
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('allSitePieChart', '발생원인별 현황-발생원인')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="allSitePieChart" :data="allSitePieChartData" :options="allSitePieChartOptions" class="barchart" ref="allSitePieChart"></PieChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit ir">3. 발생원인별 현황</strong>
                                    <strong class="data_subtit ir">
                                        - 발생원인
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('allSiteCauseGrid', '발생원인별 현황-발생원인')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable45" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">4. 부적합 평균처리시간(일)</strong>
                                    <strong class="data_subtit">
                                        - 처리시간(일)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('allSiteBarGroupChart', '부적합 평균처리시간(일)-처리시간')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="allSiteBarGroupChart" :data="allSiteBarGroupChartData" :options="allSiteBarGroupChartOptions" class="barchart" ref="allSiteBarGroupChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit ir">4. 부적합 평균처리시간(일)</strong>
                                    <strong class="data_subtit ir">
                                        - 처리시간(일)
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('allSiteTimeGrid', '부적합 평균처리시간(일)-처리시간')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="nonStatsSheetTable46" class="ibsheet_table"></div>
                                    </div>
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
    import { NonConfirmIssuCompPun, NonConfirmIssuCompNcr, NonConfirmIssuCompCar, NonConfirmIssuCausePun, NonConfirmIssuCauseNcr, NonConfirmIssuCauseCar,
             NonConfirmDelyCompPun, NonConfirmDelyCompNcr, NonConfirmDelyCompCar, NonConfirmDelyCausePun, NonConfirmDelyCauseNcr, NonConfirmDelyCauseCar,
             NonConfirmSiteAll, NonConfirmSitePun, NonConfirmSiteNcr, NonConfirmSiteCar,
             NonConfirmAllSitHec, NonConfirmAllSitCar, NonConfirmAllSitNcr, NonConfirmAllSitPun, NonConfirmAllSiteCause, NonConfirmAllSiteTime
             } from '@/pages/common/data/StatisticsList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import loader from '@ibsheet/loader'

    import PieChart from '@component/chart/PieChart.vue';
    import BarChart from '@component/chart/BarChart.vue';
    import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

    import axios from 'axios'

    import _ from 'lodash'

    let SHEET_ID = ''; 
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();

    export default {
        name: 'NonConfirmStatsView',
        components: {
            Breadcrumb,
            DatePickerRange,
            BarChart,
            PieChart
        },
        computed: {
            // store 정보에 따른 mode 정보 변경
            mode: function () {
                return ['GADT_0000000001', 'GADT_0000000002'].includes(this.$store.getters['auth/getGroupAuthDtlId']) ? '' : 'inherited'
            }
        },
        data() {
            return {
                // mode: 'inherited',  // 상속모드

                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정
                tabs: ['부적합 다발 시공업체', '부적합 회신지연 시공업체', '부적합관리(현장)', '부적합관리(전사)'], // tab name

                /* chart option */
                plugins: [ChartJSPluginDatalabels],

                /* Grid option */
                /* 부적합 다발 시공업체(발행 분류별) */
                issuCompPunGrid  : {
                    data : null,
                    options : {},
                },
                issuCompNcrGrid  : {
                    data : null,
                    options : {},
                },
                issuCompCarGrid  : {
                    data : null,
                    options : {},
                },

                /* 부적합 다발 시공업체(발행 원인별) */
                issuCausePunGrid  : {
                    data : null,
                    options : {},
                },
                issuCauseNcrGrid  : {
                    data : null,
                    options : {},
                },
                issuCauseCarGrid  : {
                    data : null,
                    options : {},
                },

                /* 부적합 회신지연 시공업체(지연 업체별) */
                delyCompPunGrid  : {
                    data : null,
                    options : {},
                },
                delyCompNcrGrid  : {
                    data : null,
                    options : {},
                },
                delyCompCarGrid  : {
                    data : null,
                    options : {},
                },

                /* 부적합 회신지연 시공업체(발생 원인별) */
                delyCausePunGrid  : {
                    data : null,
                    options : {},
                },
                delyCauseNcrGrid  : {
                    data : null,
                    options : {},
                },
                delyCauseCarGrid  : {
                    data : null,
                    options : {},
                },

                /* 부적합관리(현장) */
                cnstSiteAllGrid  : {
                    data : null,
                    options : {},
                },
                cnstSiteCarGrid  : {
                    data : null,
                    options : {},
                },
                cnstSiteNcrGrid  : {
                    data : null,
                    options : {},
                },
                cnstSitePunGrid  : {
                    data : null,
                    options : {},
                },

                /* 부적합관리(전사) */
                allSiteHecGrid  : {
                    data : null,
                    options : {},
                },
                allSiteCarGrid  : {
                    data : null,
                    options : {},
                },
                allSiteNcrGrid  : {
                    data : null,
                    options : {},
                },
                allSitePunGrid  : {
                    data : null,
                    options : {},
                },
                allSiteCauseGrid  : {
                    data : null,
                    options : {},
                },
                allSiteTimeGrid  : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    /* 부적합 다발 시공업체(발행 분류별) */
                    issuCompPun : {
                        issuCompPunNm : [],
                        issuCompPunCnt: [],
                    },
                    issuCompNcr : {
                        issuCompNcrNm : [],
                        issuCompNcrCnt: [],
                    },
                    issuCompCar : {
                        issuCompCarNm : [],
                        issuCompCarCnt: [],
                    },

                    /* 부적합 다발 시공업체(발행 원인별) */
                    issuCausePun : {
                        issuCausePunNm : [],
                        issuCausePunCnt: [],
                    },
                    issuCauseNcr : {
                        issuCauseNcrNm : [],
                        issuCauseNcrCnt: [],
                    },
                    issuCauseCar : {
                        issuCauseCarNm : [],
                        issuCauseCarCnt: [],
                    },

                    /* 부적합 회신지연 시공업체(지연 업체별) */
                    delyCompPun : {
                        delyCompPunLabl: [],
                        delyCompPunDnst: [],
                        delyCompPunDely: [],
                        delyCompPunRate: [],
                        delyCompPunToal: [],
                    },
                    delyCompNcr : {
                        delyCompNcrLabl: [],
                        delyCompNcrDnst: [],
                        delyCompNcrDely: [],
                        delyCompNcrRate: [],
                        delyCompNcrToal: [],
                    },
                    delyCompCar : {
                        delyCompCarLabl: [],
                        delyCompCarDnst: [],
                        delyCompCarDely: [],
                        delyCompCarToal: [],
                        delyCompCarRate: [],
                    },

                    /* 부적합 회신지연 시공업체(발생 원인별) */
                    delyCausePun : {
                        delyCausePunLabl: [],
                        delyCausePunDnst: [],
                        delyCausePunDely: [],
                        delyCausePunToal: [],
                        delyCausePunRate: [],
                    },
                    delyCauseNcr : {
                        delyCauseNcrLabl: [],
                        delyCauseNcrDnst: [],
                        delyCauseNcrDely: [],
                        delyCauseNcrToal: [],
                        delyCauseNcrRate: [],
                    },
                    delyCauseCar : {
                        delyCauseCarLabl: [],
                        delyCauseCarDnst: [],
                        delyCauseCarDely: [],
                        delyCauseCarToal: [],
                        delyCauseCarRate: [],
                    },

                    /* 부적합관리(현장) */
                    cnstSiteAll : {
                        cnstSiteAllLabl:  [],
                        cnstSiteAllOpen:  [],
                        cnstSiteAllClose: [],
                        cnstSiteAllTotal: [],
                    },
                    cnstSiteCar : {
                        cnstSiteCarLabl:  [],
                        cnstSiteCarOpen:  [],
                        cnstSiteCarClose: [],
                        cnstSiteCarTotal: [],
                    },
                    cnstSiteNcr : {
                        cnstSiteNcrLabl:  [],
                        cnstSiteNcrOpen:  [],
                        cnstSiteNcrClose: [],
                        cnstSiteNcrTotal: [],
                    },
                    cnstSitePun : {
                        cnstSitePunLabl:  [],
                        cnstSitePunOpen:  [],
                        cnstSitePunClose: [],
                        cnstSitePunTotal: [],
                    },

                    /* 부적합관리(전사) */
                    allSiteHec : {
                        allSiteHecLabl:  [],
                        allSiteHecOpen:  [],
                        allSiteHecClose: [],
                        allSiteHecTotal: [],
                    },
                    allSiteCar : {
                        allSiteCarLabl:  [],
                        allSiteCarOpen:  [],
                        allSiteCarClose: [],
                        allSiteCarTotal: [],
                    },
                    allSiteNcr : {
                        allSiteNcrLabl:  [],
                        allSiteNcrOpen:  [],
                        allSiteNcrClose: [],
                        allSiteNcrTotal: [],
                    },
                    allSitePun : {
                        allSitePunLabl:  [],
                        allSitePunOpen:  [],
                        allSitePunClose: [],
                        allSitePunTotal: [],
                    },
                    allSiteCause : {
                        allSitePieLabl:  [],
                        allSitePieDnst:  [],
                    },
                    allSiteTime : {
                        allSiteTimeLabl:  [],
                        allSiteTimeTotl:  [],
                        allSiteTimeAprt:  [],
                        allSiteTimeNorm:  [],
                        allSiteTimeFact:  [],
                        allSiteTimeInfr:  [],
                    }
                },

                /** searchInfo */
                search: {
                    issuData: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    delyData: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    cnstSite: {
                        searchYear: nowYear,
                    },
                    allSite: {
                        searchYear: nowYear,
                    }
                },

                /* 프로젝트 구분 */
                advancedInfo: {
                    mngtType: [],
                    startYear: nowYear
                },

                /* 부적합 다발 시공업체 차트 */
                issuCompPunBarChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '부적합(Punch) 발행 상위 10개 업체',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness: 20,
                        },
                    ]
                },
                issuCompNcrBarChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '부적합(NCR) 발행 상위 10개 업체',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness: 20,
                        },
                    ]
                },
                issuCompCarBarChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '부적합(CAR) 발행 상위 10개 업체',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness: 20,
                        },
                    ]
                },
                issuCompBarChartOptions: {
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
                                // max: 500
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

                issuCausePunBarChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '부적합(Punch) 발행 원인별',
                            data: [],
                            backgroundColor: '#7FD7ED',
                            borderWidth: 0,
                            barThickness: 20,
                        },
                    ]
                },
                issuCauseNcrBarChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '부적합(NCR) 발행 원인별',
                            data: [],
                            backgroundColor: '#7FD7ED',
                            borderWidth: 0,
                            barThickness: 20,
                        },
                    ]
                },
                issuCauseCarBarChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '부적합(CAR) 발행 원인별',
                            data: [],
                            backgroundColor: '#7FD7ED',
                            borderWidth: 0,
                            barThickness: 20,
                        },
                    ]
                },
                issuCauseBarChartOptions: {
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
                                // max: 500
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

                /* 부적합 회신지연 시공업체 차트 */
                delyCompPunBarChartData: null,
                // data_compPunLabl: [],
                // data_compPunDnst: [],
                // data_compPunDely: [],
                // data_compPunRate: [],
                // data_compPunToal: [],

                delyCompNcrBarChartData: null,
                // data_compNcrLabl: [],
                // data_compNcrDnst: [],
                // data_compNcrDely: [],
                // data_compNcrRate: [],
                // data_compNcrToal: [],
                
                delyCompCarBarChartData: null,
                // data_compCarLabl: [],
                // data_compCarDnst: [],
                // data_compCarDely: [],
                // data_compCarToal: [],
                // data_compCarRate: [],

                delyCompBarChartOptions: null,
               
                /* 부적합 회신지연 사유 차트 */
                delyCausePunBarChartData: null,
                // data_causePunLabl: [],
                // data_causePunDnst: [],
                // data_causePunDely: [],
                // data_causePunToal: [],
                // data_causePunRate: [],

                delyCauseNcrBarChartData: null,
                // data_causeNcrLabl: [],
                // data_causeNcrDnst: [],
                // data_causeNcrDely: [],
                // data_causeNcrToal: [],
                // data_causeNcrRate: [],

                delyCauseCarBarChartData: null,
                // data_causeCarLabl: [],
                // data_causeCarDnst: [],
                // data_causeCarDely: [],
                // data_causeCarToal: [],
                // data_causeCarRate: [],

                delyCauseBarChartOptions: null,


                /* 부적합관리(현장) 차트 */
                cnstSiteAllBarChartData: null,
                // data_siteAllLabl:  [],
                // data_siteAllOpen:  [],
                // data_siteAllClose: [],
                // data_siteAllTotal: [],

                cnstSiteCarBarChartData: null,
                // data_siteCarLabl:  [],
                // data_siteCarOpen:  [],
                // data_siteCarClose: [],
                // data_siteCarTotal: [],

                cnstSiteNcrBarChartData: null,
                // data_siteNcrLabl:  [],
                // data_siteNcrOpen:  [],
                // data_siteNcrClose: [],
                // data_siteNcrTotal: [],

                cnstSitePunBarChartData: null,
                // data_sitePunLabl:  [],
                // data_sitePunOpen:  [],
                // data_sitePunClose: [],
                // data_sitePunTotal: [],

                cnstSiteBarChartOptions: null,

                /* 부적합관리(전사) 차트 */
                allSiteHecBarChartData: null,
                // data_allSiteHecLabl:  [],
                // data_allSiteHecOpen:  [],
                // data_allSiteHecClose: [],
                // data_allSiteHecTotal: [],

                allSiteCarBarChartData: null,
                // data_allSiteCarLabl:  [],
                // data_allSiteCarOpen:  [],
                // data_allSiteCarClose: [],
                // data_allSiteCarTotal: [],

                allSiteNcrBarChartData: null,
                // data_allSiteNcrLabl:  [],
                // data_allSiteNcrOpen:  [],
                // data_allSiteNcrClose: [],
                // data_allSiteNcrTotal: [],

                allSitePunBarChartData: null,
                // data_allSitePunLabl:  [],
                // data_allSitePunOpen:  [],
                // data_allSitePunClose: [],
                // data_allSitePunTotal: [],

                allSiteBarChartOptions: null,
                
                allSitePieChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                            barThickness : 20,
                        },
                    ]
                },

                allSitePieChartOptions: {
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
                                return value;
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

                allSiteBarGroupChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '전체',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '공동주택',
                            data: [],
                            backgroundColor: '#FAA719',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '일반건축',
                            data: [],
                            backgroundColor: '#7FD7ED',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '공장',
                            data: [],
                            backgroundColor: '#054F6A',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '인프라',
                            data: [],
                            backgroundColor: '#BCBBC0',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                    ]
                },

                allSiteBarGroupChartOptions: {
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
                                // stepSize: 2,
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
            }
        },
        created() {
            this.fn_delyCompChart();
            this.fn_delyCauseChart();
            this.fn_cnstSiteChart();
            this.fn_allSiteChart();
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
                /* 부적합 다발 시공업체 */
                let options11 = NonConfirmIssuCompPun.options;
                let options12 = NonConfirmIssuCompNcr.options;
                let options13 = NonConfirmIssuCompCar.options;
                let options14 = NonConfirmIssuCausePun.options;
                let options15 = NonConfirmIssuCauseNcr.options;
                let options16 = NonConfirmIssuCauseCar.options;

                options16.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_nonCnfrmIssu();
                    },
                }

                loader.createSheet({
                    el: 'nonStatsSheetTable11',
                    data: [],
                    options: options11
                }).then((sheet) => {
                    this.issuCompPunGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable12',
                    data: [],
                    options: options12
                }).then((sheet) => {
                    this.issuCompNcrGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable13',
                    data: [],
                    options: options13
                }).then((sheet) => {
                    this.issuCompCarGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable14',
                    data: [],
                    options: options14
                }).then((sheet) => {
                    this.issuCausePunGrid.data  = sheet
                });
                
                loader.createSheet({
                    el: 'nonStatsSheetTable15',
                    data: [],
                    options: options15
                }).then((sheet) => {
                    this.issuCauseNcrGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable16',
                    data: [],
                    options: options16
                }).then((sheet) => {
                    this.issuCauseCarGrid.data  = sheet
                });

                /* 부적합 회신지연 시공업체 */
                let options21 = NonConfirmDelyCompPun.options;
                let options22 = NonConfirmDelyCompNcr.options;
                let options23 = NonConfirmDelyCompCar.options;
                let options24 = NonConfirmDelyCausePun.options;
                let options25 = NonConfirmDelyCauseNcr.options;
                let options26 = NonConfirmDelyCauseCar.options;

                options26.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_nonCnfrmDely();
                    },
                }

                loader.createSheet({
                    el: 'nonStatsSheetTable21',
                    data: [],
                    options: options21
                }).then((sheet) => {
                    this.delyCompPunGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable22',
                    data: [],
                    options: options22
                }).then((sheet) => {
                    this.delyCompNcrGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable23',
                    data: [],
                    options: options23
                }).then((sheet) => {
                    this.delyCompCarGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable24',
                    data: [],
                    options: options24
                }).then((sheet) => {
                    this.delyCausePunGrid.data  = sheet
                });
                
                loader.createSheet({
                    el: 'nonStatsSheetTable25',
                    data: [],
                    options: options25
                }).then((sheet) => {
                    this.delyCauseNcrGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable26',
                    data: [],
                    options: options26
                }).then((sheet) => {
                    this.delyCauseCarGrid.data  = sheet
                });

                /* 부적합관리(현장) */
                let options31 = NonConfirmSiteAll.options;
                let options32 = NonConfirmSitePun.options;
                let options33 = NonConfirmSiteNcr.options;
                let options34 = NonConfirmSiteCar.options;

                options34.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_nonCnfrmCnstSite();
                    },
                }

                loader.createSheet({
                    el: 'nonStatsSheetTable31',
                    data: [],
                    options: options31
                }).then((sheet) => {
                    this.cnstSiteAllGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable32',
                    data: [],
                    options: options32
                }).then((sheet) => {
                    this.cnstSiteCarGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable33',
                    data: [],
                    options: options33
                }).then((sheet) => {
                    this.cnstSiteNcrGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable34',
                    data: [],
                    options: options34
                }).then((sheet) => {
                    this.cnstSitePunGrid.data  = sheet
                });

                /* 부적합관리(전사) */
                let options41 = NonConfirmAllSitHec.options;
                let options42 = NonConfirmAllSitCar.options;
                let options43 = NonConfirmAllSitNcr.options;
                let options44 = NonConfirmAllSitPun.options;
                let options45 = NonConfirmAllSiteCause.options;
                let options46 = NonConfirmAllSiteTime.options;

                options46.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_nonCnfrmAllSite();
                    },
                }

                loader.createSheet({
                    el: 'nonStatsSheetTable41',
                    data: [],
                    options: options41
                }).then((sheet) => {
                    this.allSiteHecGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable42',
                    data: [],
                    options: options42
                }).then((sheet) => {
                    this.allSiteCarGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable43',
                    data: [],
                    options: options43
                }).then((sheet) => {
                    this.allSiteNcrGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable44',
                    data: [],
                    options: options44
                }).then((sheet) => {
                    this.allSitePunGrid.data  = sheet
                });
                
                loader.createSheet({
                    el: 'nonStatsSheetTable45',
                    data: [],
                    options: options45
                }).then((sheet) => {
                    this.allSiteCauseGrid.data  = sheet
                });

                loader.createSheet({
                    el: 'nonStatsSheetTable46',
                    data: [],
                    options: options46
                }).then((sheet) => {
                    this.allSiteTimeGrid.data  = sheet
                });
            },

            fn_clearSearch: function (type) {
                if(type == "I"){
                    this.search.issuData.searchMngtType  = '';
                    this.search.issuData.searchProjectNm = null;
                    this.search.issuData.searchTermType  = '1';
                    this.search.issuData.searchMonthType = '1';
                    this.search.issuData.searchDate      = [null, null],
                    this.search.issuData.searchStartDt   = null,
                    this.search.issuData.searchEndDt     = null,

                    this.issuCompPunGrid.data.loadSearchData({
                        data : null
                    });
                    this.issuCompNcrGrid.data.loadSearchData({
                        data : null
                    });
                    this.issuCompCarGrid.data.loadSearchData({
                        data : null
                    });

                    this.issuCausePunGrid.data.loadSearchData({
                        data : null
                    });
                    this.issuCauseNcrGrid.data.loadSearchData({
                        data : null
                    });
                    this.issuCauseCarGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("I");
                } else if(type == "D"){
                    this.search.delyData.searchMngtType  = '';
                    this.search.delyData.searchProjectNm = null;
                    this.search.delyData.searchTermType  = '1';
                    this.search.delyData.searchMonthType = '1';
                    this.search.delyData.searchDate      = [null, null],
                    this.search.delyData.searchStartDt   = null,
                    this.search.delyData.searchEndDt     = null,
                    
                    this.delyCompPunGrid.data.loadSearchData({
                        data : null
                    });
                    this.delyCompNcrGrid.data.loadSearchData({
                        data : null
                    });
                    this.delyCompCarGrid.data.loadSearchData({
                        data : null
                    });

                    this.delyCausePunGrid.data.loadSearchData({
                        data : null
                    });
                    this.delyCauseNcrGrid.data.loadSearchData({
                        data : null
                    });
                    this.delyCauseCarGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("D");
                } else if(type == "C"){
                    this.search.cnstSite.searchYear  = nowYear;
                    
                    this.cnstSiteAllGrid.data.loadSearchData({
                        data : null
                    });
                    this.cnstSiteCarGrid.data.loadSearchData({
                        data : null
                    });
                    this.cnstSiteNcrGrid.data.loadSearchData({
                        data : null
                    });

                    this.cnstSitePunGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("C");
                } else if(type == "A"){
                    this.search.allSite.searchYear  = nowYear;

                    this.allSiteHecGrid.data.loadSearchData({
                        data : null
                    });

                    this.allSiteCarGrid.data.loadSearchData({
                        data : null
                    });
                    this.allSiteNcrGrid.data.loadSearchData({
                        data : null
                    });
                    this.allSitePunGrid.data.loadSearchData({
                        data : null
                    });

                    this.allSiteCauseGrid.data.loadSearchData({
                        data : null
                    });
                    this.allSiteTimeGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("A");
                }
            },

            fn_clearChart: function (type) {
                if(type == "I"){
                    /* 부적합 다발 시공업체 */
                    this.chartData.issuCompPun = {
                        issuCompPunNm : [],
                        issuCompPunCnt: [],
                    };
                    this.chartData.issuCompNcr = {
                        issuCompNcrNm : [],
                        issuCompNcrCnt: [],
                    };
                    this.chartData.issuCompCar = {
                        issuCompCarNm : [],
                        issuCompCarCnt: [],
                    };
                    this.chartData.issuCausePun = {
                        issuCausePunNm : [],
                        issuCausePunCnt: [],
                    };
                    this.chartData.issuCauseNcr = {
                        issuCauseNcrNm : [],
                        issuCauseNcrCnt: [],
                    };
                    this.chartData.issuCauseCar = {
                        issuCauseCarNm : [],
                        issuCauseCarCnt: [],
                    };

                    this.issuCompPunBarChartData.labels            = [];
                    this.issuCompNcrBarChartData.labels            = [];
                    this.issuCompCarBarChartData.labels            = [];

                    this.issuCompPunBarChartData.datasets[0].data  = [];
                    this.issuCompNcrBarChartData.datasets[0].data  = [];
                    this.issuCompCarBarChartData.datasets[0].data  = [];

                    this.issuCausePunBarChartData.labels           = [];
                    this.issuCauseNcrBarChartData.labels           = [];
                    this.issuCauseCarBarChartData.labels           = [];

                    this.issuCausePunBarChartData.datasets[0].data = [];
                    this.issuCauseNcrBarChartData.datasets[0].data = [];
                    this.issuCauseCarBarChartData.datasets[0].data = [];

                    // this.issuCompBarChartOptions.scales.yAxes[0].ticks.max      = 500;
                    // this.issuCompBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                    
                    // this.issuCauseBarChartOptions.scales.yAxes[0].ticks.max      = 500;
                    // this.issuCauseBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;

                    this.$refs.issuCompPunBarChart.renderChartData();
                    this.$refs.issuCompNcrBarChart.renderChartData();
                    this.$refs.issuCompCarBarChart.renderChartData();

                    this.$refs.issuCausePunBarChart.renderChartData();
                    this.$refs.issuCauseNcrBarChart.renderChartData();
                    this.$refs.issuCauseCarBarChart.renderChartData();
                } else if(type == "D"){
                    /* 부적합 회신지연 시공업체 */
                    this.chartData.delyCompPun = {
                        delyCompPunLabl: [],
                        delyCompPunDnst: [],
                        delyCompPunDely: [],
                        delyCompPunRate: [],
                        delyCompPunToal: [],
                    };
                    this.chartData.delyCompNcr = {
                        delyCompNcrLabl: [],
                        delyCompNcrDnst: [],
                        delyCompNcrDely: [],
                        delyCompNcrRate: [],
                        delyCompNcrToal: [],
                    };
                    this.chartData.delyCompCar = {
                        delyCompCarLabl: [],
                        delyCompCarDnst: [],
                        delyCompCarDely: [],
                        delyCompCarToal: [],
                        delyCompCarRate: [],
                    };

                    this.chartData.delyCausePun = {
                        delyCausePunLabl: [],
                        delyCausePunDnst: [],
                        delyCausePunDely: [],
                        delyCausePunToal: [],
                        delyCausePunRate: [],
                    };
                    this.chartData.delyCauseNcr = {
                        delyCauseNcrLabl: [],
                        delyCauseNcrDnst: [],
                        delyCauseNcrDely: [],
                        delyCauseNcrToal: [],
                        delyCauseNcrRate: [],
                    };
                   this.chartData.delyCauseCar = {
                        delyCauseCarLabl: [],
                        delyCauseCarDnst: [],
                        delyCauseCarDely: [],
                        delyCauseCarToal: [],
                        delyCauseCarRate: [],
                    };

                    this.delyCompPunBarChartData.labels            = [];
                    this.delyCompNcrBarChartData.labels            = [];
                    this.delyCompCarBarChartData.labels            = [];

                    this.delyCausePunBarChartData.labels           = [];
                    this.delyCauseNcrBarChartData.labels           = [];
                    this.delyCauseCarBarChartData.labels           = [];

                    for(let i=0; i < this.delyCompPunBarChartData.datasets.length; i++){
                        this.delyCompPunBarChartData.datasets[i].data  = [];
                        this.delyCompNcrBarChartData.datasets[i].data  = [];
                        this.delyCompCarBarChartData.datasets[i].data  = [];

                        this.delyCausePunBarChartData.datasets[i].data = [];
                        this.delyCauseNcrBarChartData.datasets[i].data = [];
                        this.delyCauseCarBarChartData.datasets[i].data = [];
                    }
                    
                    // this.delyCompBarChartOptions.scales.yAxes[0].ticks.max      = 500;
                    // this.delyCompBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;

                    // this.delyCauseBarChartOptions.scales.yAxes[0].ticks.max      = 500;
                    // this.delyCauseBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;

                    this.$refs.delyCompPunBarChart.renderChartData();
                    this.$refs.delyCompNcrBarChart.renderChartData();
                    this.$refs.delyCompCarBarChart.renderChartData();

                    this.$refs.delyCausePunBarChart.renderChartData();
                    this.$refs.delyCauseNcrBarChart.renderChartData();
                    this.$refs.delyCauseCarBarChart.renderChartData();
                } else if(type == "C"){
                    /* 부적합관리(현장) */
                    this.chartData.cnstSiteAll = {
                        cnstSiteAllLabl:  [],
                        cnstSiteAllOpen:  [],
                        cnstSiteAllClose: [],
                        cnstSiteAllTotal: [],
                    };
                    this.chartData.cnstSiteCar = {
                        cnstSiteCarLabl:  [],
                        cnstSiteCarOpen:  [],
                        cnstSiteCarClose: [],
                        cnstSiteCarTotal: [],
                    };
                    this.chartData.cnstSiteNcr = {
                        cnstSiteNcrLabl:  [],
                        cnstSiteNcrOpen:  [],
                        cnstSiteNcrClose: [],
                        cnstSiteNcrTotal: [],
                    };
                    this.chartData.cnstSitePun = {
                        cnstSitePunLabl:  [],
                        cnstSitePunOpen:  [],
                        cnstSitePunClose: [],
                        cnstSitePunTotal: [],
                    };

                    this.cnstSiteAllBarChartData.labels           = [];
                    this.cnstSiteCarBarChartData.labels           = [];
                    this.cnstSiteNcrBarChartData.labels           = [];
                    this.cnstSitePunBarChartData.labels           = [];

                    for(let i=0; i < this.cnstSiteAllBarChartData.datasets.length; i++){
                        this.cnstSiteAllBarChartData.datasets[i].data = [];
                        this.cnstSiteCarBarChartData.datasets[i].data = [];
                        this.cnstSiteNcrBarChartData.datasets[i].data = [];
                        this.cnstSitePunBarChartData.datasets[i].data = [];
                    }

                    // this.cnstSiteBarChartOptions.scales.yAxes[0].ticks.max      = 500;
                    // this.cnstSiteBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;

                    this.$refs.cnstSiteAllBarChart.renderChartData();
                    this.$refs.cnstSiteCarBarChart.renderChartData();
                    this.$refs.cnstSiteNcrBarChart.renderChartData();
                    this.$refs.cnstSitePunBarChart.renderChartData();
                } else if(type == "A"){
                    /* 부적합관리(전사) */
                    this.chartData.allSiteHec = {
                        allSiteHecLabl:  [],
                        allSiteHecOpen:  [],
                        allSiteHecClose: [],
                        allSiteHecTotal: [],
                    };
                    this.chartData.allSiteCar = {
                        allSiteCarLabl:  [],
                        allSiteCarOpen:  [],
                        allSiteCarClose: [],
                        allSiteCarTotal: [],
                    };
                    this.chartData.allSiteNcr = {
                        allSiteNcrLabl:  [],
                        allSiteNcrOpen:  [],
                        allSiteNcrClose: [],
                        allSiteNcrTotal: [],
                    };
                    this.chartData.allSitePun = {
                        allSitePunLabl:  [],
                        allSitePunOpen:  [],
                        allSitePunClose: [],
                        allSitePunTotal: [],
                    };
                    this.chartData.allSiteCause = {
                        allSitePieLabl:  [],
                        allSitePieDnst:  [],
                    };
                    this.chartData.allSiteTime = {
                        allSiteTimeLabl:  [],
                        allSiteTimeTotl:  [],
                        allSiteTimeAprt:  [],
                        allSiteTimeNorm:  [],
                        allSiteTimeFact:  [],
                        allSiteTimeInfr:  [],
                    };

                    this.allSiteHecBarChartData.labels            = [];
                    this.allSiteCarBarChartData.labels            = [];
                    this.allSiteNcrBarChartData.labels            = [];
                    this.allSitePunBarChartData.labels            = [];
                    this.allSitePieChartData.labels               = [];
                    this.allSiteBarGroupChartData.labels          = [];

                    for(let i=0; i < this.allSiteHecBarChartData.datasets.length; i++){
                        this.allSiteHecBarChartData.datasets[i].data = [];
                        this.allSiteCarBarChartData.datasets[i].data = [];
                        this.allSiteNcrBarChartData.datasets[i].data = [];
                        this.allSitePunBarChartData.datasets[i].data = [];
                    }

                    this.allSitePieChartData.datasets[0].data     = [];

                    for(let j=0; j < this.allSiteBarGroupChartData.datasets.length; j++){
                        this.allSiteBarGroupChartData.datasets[j].data = [];
                    }

                    // this.allSiteBarChartOptions.scales.yAxes[0].ticks.max      = 500;
                    // this.allSiteBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;

                    // this.allSiteBarGroupChartOptions.scales.yAxes[0].ticks.max      = 20;
                    // this.allSiteBarGroupChartOptions.scales.yAxes[0].ticks.stepSize = 2;

                    this.$refs.allSiteHecBarChart.renderChartData();
                    this.$refs.allSiteCarBarChart.renderChartData();
                    this.$refs.allSiteNcrBarChart.renderChartData();
                    this.$refs.allSitePunBarChart.renderChartData();
                    
                    this.$refs.allSitePieChart.renderChartData();
                    
                    this.$refs.allSiteBarGroupChart.renderChartData();
                }
            },

            fn_initMonthType: function (type) {
                // console.log(type + " === " + this.search.issuData.searchTermType + "  ****  " + this.search.issuData.searchMonthType);
                if(type == "I"){
                    if(this.search.issuData.searchTermType  == '1' && this.search.issuData.searchMonthType != null){
                        this.search.issuData.searchMonthType = null;
                    } else if(this.search.issuData.searchTermType  == '2' && this.search.issuData.searchMonthType == null){
                        this.search.issuData.searchMonthType = '1';
                        this.search.issuData.searchDate      = [null, null];
                        this.search.issuData.searchStartDt   = null;
                        this.search.issuData.searchEndDt     = null;
                    }
                } else if(type == "D"){
                    if(this.search.delyData.searchTermType  == '1' && this.search.delyData.searchMonthType != null){
                        this.search.delyData.searchMonthType = null;
                    } else if(this.search.delyData.searchTermType  == '2' && this.search.delyData.searchMonthType == null){
                        this.search.delyData.searchMonthType = '1';
                        this.search.delyData.searchDate      = [null, null];
                        this.search.delyData.searchStartDt   = null;
                        this.search.delyData.searchEndDt     = null;
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

            fn_nonCnfrmIssu : async function(){
                // console.log(" search.issuData *************  %o", this.search.issuData);

                this.fn_clearChart("I");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/nonConfirm/nonConformBundleConstComp/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.issuData,
                    searchStartDt   : this.search.issuData.searchDate[0],
                    searchEndDt     : this.search.issuData.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.issuCompPunGrid.data.loadSearchData({
                                data: response.data.datas.dlIssuCompPun,
                            });
                            this.issuCompNcrGrid.data.loadSearchData({
                                data: response.data.datas.dlIssuCompNcr,
                            });
                            this.issuCompCarGrid.data.loadSearchData({
                                data: response.data.datas.dlIssuCompCar,
                            });
                            this.issuCausePunGrid.data.loadSearchData({
                                data: response.data.datas.dlIssuCausePun,
                            });
                            this.issuCauseNcrGrid.data.loadSearchData({
                                data: response.data.datas.dlIssuCauseNcr,
                            });
                            this.issuCauseCarGrid.data.loadSearchData({
                                data: response.data.datas.dlIssuCauseCar,
                            });

                            for(let i=0; i < response.data.datas.dlIssuCompPun.length; i++) {
                                this.chartData.issuCompPun.issuCompPunNm.push(response.data.datas.dlIssuCompPun[i].tradeNm);
                                this.chartData.issuCompPun.issuCompPunCnt.push(response.data.datas.dlIssuCompPun[i].dnstCnt);
                            }

                            this.issuCompPunBarChartData.labels           = this.chartData.issuCompPun.issuCompPunNm;
                            this.issuCompPunBarChartData.datasets[0].data = this.chartData.issuCompPun.issuCompPunCnt;

                            for(let i=0; i < response.data.datas.dlIssuCompNcr.length; i++) {
                                this.chartData.issuCompNcr.issuCompNcrNm.push(response.data.datas.dlIssuCompNcr[i].tradeNm);
                                this.chartData.issuCompNcr.issuCompNcrCnt.push(response.data.datas.dlIssuCompNcr[i].dnstCnt);
                            }

                            this.issuCompNcrBarChartData.labels           = this.chartData.issuCompNcr.issuCompNcrNm;
                            this.issuCompNcrBarChartData.datasets[0].data = this.chartData.issuCompNcr.issuCompNcrCnt;

                            for(let i=0; i < response.data.datas.dlIssuCompCar.length; i++) {
                                this.chartData.issuCompCar.issuCompCarNm.push(response.data.datas.dlIssuCompCar[i].tradeNm);
                                this.chartData.issuCompCar.issuCompCarCnt.push(response.data.datas.dlIssuCompCar[i].dnstCnt);
                            }

                            this.issuCompCarBarChartData.labels           = this.chartData.issuCompCar.issuCompCarNm;
                            this.issuCompCarBarChartData.datasets[0].data = this.chartData.issuCompCar.issuCompCarCnt;

                            for(let i=0; i < response.data.datas.dlIssuCausePun.length; i++) {
                                this.chartData.issuCausePun.issuCausePunNm.push(response.data.datas.dlIssuCausePun[i].causeDtlNm);
                                this.chartData.issuCausePun.issuCausePunCnt.push(response.data.datas.dlIssuCausePun[i].dnstCnt);
                            }

                            this.issuCausePunBarChartData.labels           = this.chartData.issuCausePun.issuCausePunNm;
                            this.issuCausePunBarChartData.datasets[0].data = this.chartData.issuCausePun.issuCausePunCnt;

                            for(let i=0; i < response.data.datas.dlIssuCauseNcr.length; i++) {
                                this.chartData.issuCauseNcr.issuCauseNcrNm.push(response.data.datas.dlIssuCauseNcr[i].causeDtlNm);
                                this.chartData.issuCauseNcr.issuCauseNcrCnt.push(response.data.datas.dlIssuCauseNcr[i].dnstCnt);
                            }

                            this.issuCauseNcrBarChartData.labels           = this.chartData.issuCauseNcr.issuCauseNcrNm;
                            this.issuCauseNcrBarChartData.datasets[0].data = this.chartData.issuCauseNcr.issuCauseNcrCnt;

                            for(let i=0; i < response.data.datas.dlIssuCauseCar.length; i++) {
                                this.chartData.issuCauseCar.issuCauseCarNm.push(response.data.datas.dlIssuCauseCar[i].causeDtlNm);
                                this.chartData.issuCauseCar.issuCauseCarCnt.push(response.data.datas.dlIssuCauseCar[i].dnstCnt);
                            }

                            this.issuCauseCarBarChartData.labels           = this.chartData.issuCauseCar.issuCauseCarNm;
                            this.issuCauseCarBarChartData.datasets[0].data = this.chartData.issuCauseCar.issuCauseCarCnt;


                            // console.log(" issuData.issuData *************  %o", this.chartData.issuData.issuDataData);

                            this.$refs.issuCompPunBarChart.renderChartData();
                            this.$refs.issuCompNcrBarChart.renderChartData();
                            this.$refs.issuCompCarBarChart.renderChartData();

                            this.$refs.issuCausePunBarChart.renderChartData();
                            this.$refs.issuCauseNcrBarChart.renderChartData();
                            this.$refs.issuCauseCarBarChart.renderChartData();
                });

            },

            fn_nonCnfrmDely : async function(){
                // console.log(" search.delyData *************  %o", this.search.delyData);

                this.fn_clearChart("D");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/nonConfirm/nonConformReplyDelayConstComp/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.delyData,
                    searchStartDt   : this.search.delyData.searchDate[0],
                    searchEndDt     : this.search.delyData.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.delyCompPunGrid.data.loadSearchData({
                                data: response.data.datas.dlDelyCompPun,
                            });
                            this.delyCompNcrGrid.data.loadSearchData({
                                data: response.data.datas.dlDelyCompNcr,
                            });
                            this.delyCompCarGrid.data.loadSearchData({
                                data: response.data.datas.dlDelyCompCar,
                            });

                            this.delyCausePunGrid.data.loadSearchData({
                                data: response.data.datas.dlDelyCausePun,
                            });
                            this.delyCauseNcrGrid.data.loadSearchData({
                                data: response.data.datas.dlDelyCauseNcr,
                            });
                            this.delyCauseCarGrid.data.loadSearchData({
                                data: response.data.datas.dlDelyCauseCar,
                            });

                            for(let i=0; i < response.data.datas.dlDelyCompPun.length; i++) {
                                this.chartData.delyCompPun.delyCompPunLabl.push(response.data.datas.dlDelyCompPun[i].tradeNm);
                                this.chartData.delyCompPun.delyCompPunDnst.push(response.data.datas.dlDelyCompPun[i].dnstCnt);
                                this.chartData.delyCompPun.delyCompPunDely.push(response.data.datas.dlDelyCompPun[i].delayCnt);
                                this.chartData.delyCompPun.delyCompPunRate.push(response.data.datas.dlDelyCompPun[i].dnstRate);
                            }

                            this.delyCompPunBarChartData.labels           = this.chartData.delyCompPun.delyCompPunLabl;
                            this.delyCompPunBarChartData.datasets[2].data = this.chartData.delyCompPun.delyCompPunDnst;
                            this.delyCompPunBarChartData.datasets[1].data = this.chartData.delyCompPun.delyCompPunDely;
                            this.delyCompPunBarChartData.datasets[0].data = this.chartData.delyCompPun.delyCompPunRate;

                            for(let i=0; i < response.data.datas.dlDelyCompNcr.length; i++) {
                                this.chartData.delyCompNcr.delyCompNcrLabl.push(response.data.datas.dlDelyCompNcr[i].tradeNm);
                                this.chartData.delyCompNcr.delyCompNcrDnst.push(response.data.datas.dlDelyCompNcr[i].dnstCnt);
                                this.chartData.delyCompNcr.delyCompNcrDely.push(response.data.datas.dlDelyCompNcr[i].delayCnt);
                                this.chartData.delyCompNcr.delyCompNcrRate.push(response.data.datas.dlDelyCompNcr[i].dnstRate);
                            }

                            this.delyCompNcrBarChartData.labels           = this.chartData.delyCompNcr.delyCompNcrLabl;
                            this.delyCompNcrBarChartData.datasets[2].data = this.chartData.delyCompNcr.delyCompNcrDnst;
                            this.delyCompNcrBarChartData.datasets[1].data = this.chartData.delyCompNcr.delyCompNcrDely;
                            this.delyCompNcrBarChartData.datasets[0].data = this.chartData.delyCompNcr.delyCompNcrRate;

                            for(let i=0; i < response.data.datas.dlDelyCompCar.length; i++) {
                                this.chartData.delyCompCar.delyCompCarLabl.push(response.data.datas.dlDelyCompCar[i].tradeNm);
                                this.chartData.delyCompCar.delyCompCarDnst.push(response.data.datas.dlDelyCompCar[i].dnstCnt);
                                this.chartData.delyCompCar.delyCompCarDely.push(response.data.datas.dlDelyCompCar[i].delayCnt);
                                this.chartData.delyCompCar.delyCompCarRate.push(response.data.datas.dlDelyCompCar[i].dnstRate);
                            }

                            this.delyCompCarBarChartData.labels           = this.chartData.delyCompCar.delyCompCarLabl;
                            this.delyCompCarBarChartData.datasets[2].data = this.chartData.delyCompCar.delyCompCarDnst;
                            this.delyCompCarBarChartData.datasets[1].data = this.chartData.delyCompCar.delyCompCarDely;
                            this.delyCompCarBarChartData.datasets[0].data = this.chartData.delyCompCar.delyCompCarRate;

                            for(let i=0; i < response.data.datas.dlDelyCausePun.length; i++) {
                                this.chartData.delyCausePun.delyCausePunLabl.push(response.data.datas.dlDelyCausePun[i].causeDtlNm);
                                this.chartData.delyCausePun.delyCausePunDnst.push(response.data.datas.dlDelyCausePun[i].dnstCnt);
                                this.chartData.delyCausePun.delyCausePunDely.push(response.data.datas.dlDelyCausePun[i].delayCnt);
                                this.chartData.delyCausePun.delyCausePunRate.push(response.data.datas.dlDelyCausePun[i].dnstRate);
                            }

                            this.delyCausePunBarChartData.labels           = this.chartData.delyCausePun.delyCausePunLabl;
                            this.delyCausePunBarChartData.datasets[2].data = this.chartData.delyCausePun.delyCausePunDnst;
                            this.delyCausePunBarChartData.datasets[1].data = this.chartData.delyCausePun.delyCausePunDely;
                            this.delyCausePunBarChartData.datasets[0].data = this.chartData.delyCausePun.delyCausePunRate;

                            for(let i=0; i < response.data.datas.dlDelyCauseNcr.length; i++) {
                                this.chartData.delyCauseNcr.delyCauseNcrLabl.push(response.data.datas.dlDelyCauseNcr[i].causeDtlNm);
                                this.chartData.delyCauseNcr.delyCauseNcrDnst.push(response.data.datas.dlDelyCauseNcr[i].dnstCnt);
                                this.chartData.delyCauseNcr.delyCauseNcrDely.push(response.data.datas.dlDelyCauseNcr[i].delayCnt);
                                this.chartData.delyCauseNcr.delyCauseNcrRate.push(response.data.datas.dlDelyCauseNcr[i].dnstRate);
                            }

                            this.delyCauseNcrBarChartData.labels           = this.chartData.delyCauseNcr.delyCauseNcrLabl;
                            this.delyCauseNcrBarChartData.datasets[2].data = this.chartData.delyCauseNcr.delyCauseNcrDnst;
                            this.delyCauseNcrBarChartData.datasets[1].data = this.chartData.delyCauseNcr.delyCauseNcrDely;
                            this.delyCauseNcrBarChartData.datasets[0].data = this.chartData.delyCauseNcr.delyCauseNcrRate;

                            for(let i=0; i < response.data.datas.dlDelyCauseCar.length; i++) {
                                this.chartData.delyCauseCar.delyCauseCarLabl.push(response.data.datas.dlDelyCauseCar[i].causeDtlNm);
                                this.chartData.delyCauseCar.delyCauseCarDnst.push(response.data.datas.dlDelyCauseCar[i].dnstCnt);
                                this.chartData.delyCauseCar.delyCauseCarDely.push(response.data.datas.dlDelyCauseCar[i].delayCnt);
                                this.chartData.delyCauseCar.delyCauseCarRate.push(response.data.datas.dlDelyCauseCar[i].dnstRate);
                            }

                            this.delyCauseCarBarChartData.labels           = this.chartData.delyCauseCar.delyCauseCarLabl;
                            this.delyCauseCarBarChartData.datasets[2].data = this.chartData.delyCauseCar.delyCauseCarDnst;
                            this.delyCauseCarBarChartData.datasets[1].data = this.chartData.delyCauseCar.delyCauseCarDely;
                            this.delyCauseCarBarChartData.datasets[0].data = this.chartData.delyCauseCar.delyCauseCarRate;

                            // console.log(" delyData.delyData *************  %o", this.chartData.delyCompPun.delyCompPunDnst);
                            // console.log(" response.data.datas.dlDelyCompPun[0] *************  %o", response.data.datas.dlDelyCompPun[0]);

                            this.$refs.delyCompPunBarChart.renderChartData();
                            this.$refs.delyCompNcrBarChart.renderChartData();
                            this.$refs.delyCompCarBarChart.renderChartData();

                            this.$refs.delyCausePunBarChart.renderChartData();
                            this.$refs.delyCauseNcrBarChart.renderChartData();
                            this.$refs.delyCauseCarBarChart.renderChartData();
                });
            },

            fn_nonCnfrmCnstSite : async function(){
                // console.log(" search.cnstSite *************  %o", this.search.cnstSite);

                this.fn_clearChart("C");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/nonConfirm/nonConformManagementSite/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.cnstSite
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            // console.log("response : %o ", response)

                            this.cnstSiteAllGrid.data.loadSearchData({
                                data: response.data.datas.dlSiteAllType,
                            });
                            this.cnstSiteCarGrid.data.loadSearchData({
                                data: response.data.datas.dlSiteCarType,
                            });
                            this.cnstSiteNcrGrid.data.loadSearchData({
                                data: response.data.datas.dlSiteNcrType,
                            });
                            this.cnstSitePunGrid.data.loadSearchData({
                                data: response.data.datas.dlSitePunType,
                            });

                            for(let i=1; i < 13; i++) {
                                this.chartData.cnstSiteAll.cnstSiteAllLabl.push(i + "월");
                                this.chartData.cnstSiteAll.cnstSiteAllOpen.push(0);
                                this.chartData.cnstSiteAll.cnstSiteAllClose.push(0)

                                this.chartData.cnstSiteCar.cnstSiteCarLabl.push(i + "월");
                                this.chartData.cnstSiteCar.cnstSiteCarOpen.push(0);
                                this.chartData.cnstSiteCar.cnstSiteCarClose.push(0);

                                this.chartData.cnstSiteNcr.cnstSiteNcrLabl.push(i + "월");
                                this.chartData.cnstSiteNcr.cnstSiteNcrOpen.push(0);
                                this.chartData.cnstSiteNcr.cnstSiteNcrClose.push(0);

                                this.chartData.cnstSitePun.cnstSitePunLabl.push(i + "월");
                                this.chartData.cnstSitePun.cnstSitePunOpen.push(0);
                                this.chartData.cnstSitePun.cnstSitePunClose.push(0);
                            }

                            let siteMonth = 0;
                            for(let i=0; i < response.data.datas.dlSiteAllType.length; i++) {
                                // this.chartData.cnstSiteAll.cnstSiteAllLabl.push(response.data.datas.dlSiteAllType[i].monthType);
                                // this.chartData.cnstSiteAll.cnstSiteAllOpen.push(response.data.datas.dlSiteAllType[i].openCnt);
                                // this.chartData.cnstSiteAll.cnstSiteAllClose.push(response.data.datas.dlSiteAllType[i].closeCnt);

                                siteMonth = Number(response.data.datas.dlSiteAllType[i].siteMonth) - 1;
                                this.chartData.cnstSiteAll.cnstSiteAllOpen[siteMonth] = response.data.datas.dlSiteAllType[i].openCnt;
                                this.chartData.cnstSiteAll.cnstSiteAllClose[siteMonth] = response.data.datas.dlSiteAllType[i].closeCnt;
                            }

                            this.cnstSiteAllBarChartData.labels           = this.chartData.cnstSiteAll.cnstSiteAllLabl;
                            this.cnstSiteAllBarChartData.datasets[0].data = this.chartData.cnstSiteAll.cnstSiteAllOpen;
                            this.cnstSiteAllBarChartData.datasets[1].data = this.chartData.cnstSiteAll.cnstSiteAllClose;

                            for(let i=0; i < response.data.datas.dlSiteCarType.length; i++) {
                                // this.chartData.cnstSiteCar.cnstSiteCarLabl.push(response.data.datas.dlSiteCarType[i].monthType);
                                // this.chartData.cnstSiteCar.cnstSiteCarOpen.push(response.data.datas.dlSiteCarType[i].openCnt);
                                // this.chartData.cnstSiteCar.cnstSiteCarClose.push(response.data.datas.dlSiteCarType[i].closeCnt);

                                siteMonth = Number(response.data.datas.dlSiteCarType[i].siteMonth) - 1;
                                this.chartData.cnstSiteCar.cnstSiteCarOpen[siteMonth] = response.data.datas.dlSiteCarType[i].openCnt;
                                this.chartData.cnstSiteCar.cnstSiteCarClose[siteMonth] = response.data.datas.dlSiteCarType[i].closeCnt;
                            }

                            this.cnstSiteCarBarChartData.labels           = this.chartData.cnstSiteCar.cnstSiteCarLabl;
                            this.cnstSiteCarBarChartData.datasets[0].data = this.chartData.cnstSiteCar.cnstSiteCarOpen;
                            this.cnstSiteCarBarChartData.datasets[1].data = this.chartData.cnstSiteCar.cnstSiteCarClose;

                            for(let i=0; i < response.data.datas.dlSiteNcrType.length; i++) {
                                // this.chartData.cnstSiteNcr.cnstSiteNcrLabl.push(response.data.datas.dlSiteNcrType[i].monthType);
                                // this.chartData.cnstSiteNcr.cnstSiteNcrOpen.push(response.data.datas.dlSiteNcrType[i].openCnt);
                                // this.chartData.cnstSiteNcr.cnstSiteNcrClose.push(response.data.datas.dlSiteNcrType[i].closeCnt);

                                siteMonth = Number(response.data.datas.dlSiteNcrType[i].siteMonth) - 1;
                                this.chartData.cnstSiteNcr.cnstSiteNcrOpen[siteMonth] = response.data.datas.dlSiteNcrType[i].openCnt;
                                this.chartData.cnstSiteNcr.cnstSiteNcrClose[siteMonth] = response.data.datas.dlSiteNcrType[i].closeCnt;
                            }

                            this.cnstSiteNcrBarChartData.labels           = this.chartData.cnstSiteNcr.cnstSiteNcrLabl;
                            this.cnstSiteNcrBarChartData.datasets[0].data = this.chartData.cnstSiteNcr.cnstSiteNcrOpen;
                            this.cnstSiteNcrBarChartData.datasets[1].data = this.chartData.cnstSiteNcr.cnstSiteNcrClose;

                            for(let i=0; i < response.data.datas.dlSitePunType.length; i++) {
                                // this.chartData.cnstSitePun.cnstSitePunLabl.push(response.data.datas.dlSitePunType[i].monthType);
                                // this.chartData.cnstSitePun.cnstSitePunOpen.push(response.data.datas.dlSitePunType[i].openCnt);
                                // this.chartData.cnstSitePun.cnstSitePunClose.push(response.data.datas.dlSitePunType[i].closeCnt);

                                siteMonth = Number(response.data.datas.dlSitePunType[i].siteMonth) - 1;
                                this.chartData.cnstSitePun.cnstSitePunOpen[siteMonth] = response.data.datas.dlSitePunType[i].openCnt;
                                this.chartData.cnstSitePun.cnstSitePunClose[siteMonth] = response.data.datas.dlSitePunType[i].closeCnt
                            }

                            this.cnstSitePunBarChartData.labels           = this.chartData.cnstSitePun.cnstSitePunLabl;
                            this.cnstSitePunBarChartData.datasets[0].data = this.chartData.cnstSitePun.cnstSitePunOpen;
                            this.cnstSitePunBarChartData.datasets[1].data = this.chartData.cnstSitePun.cnstSitePunClose;

                            // console.log(" cnstSite.matrCmpnyData *************  %o", this.chartData.cnstSite.cnstSiteData);

                            this.$refs.cnstSiteAllBarChart.renderChartData();
                            this.$refs.cnstSiteCarBarChart.renderChartData();
                            this.$refs.cnstSiteNcrBarChart.renderChartData();
                            this.$refs.cnstSitePunBarChart.renderChartData();
                });

            },

            fn_nonCnfrmAllSite : async function(){
                // console.log(" search.allSite *************  %o", this.search.allSite);

                this.fn_clearChart("A");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/nonConfirm/nonConformManagementAllSite/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.allSite
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.allSiteHecGrid.data.loadSearchData({
                                data: response.data.datas.dlAllSiteHec,
                            });
                            this.allSiteCarGrid.data.loadSearchData({
                                data: response.data.datas.dlAllSiteCar,
                            });
                            this.allSiteNcrGrid.data.loadSearchData({
                                data: response.data.datas.dlAllSiteNcr,
                            });
                            this.allSitePunGrid.data.loadSearchData({
                                data: response.data.datas.dlAllSitePun,
                            });
                            this.allSiteCauseGrid.data.loadSearchData({
                                data: response.data.datas.dlAllSiteCause,
                            });
                            this.allSiteTimeGrid.data.loadSearchData({
                                data: response.data.datas.dlAllSiteTime,
                            });

                            for(let i=0; i < response.data.datas.dlAllSiteHec.length; i++) {
                                this.chartData.allSiteHec.allSiteHecLabl.push(response.data.datas.dlAllSiteHec[i].csrtTypeNm);
                                this.chartData.allSiteHec.allSiteHecOpen.push(response.data.datas.dlAllSiteHec[i].openCnt);
                                this.chartData.allSiteHec.allSiteHecClose.push(response.data.datas.dlAllSiteHec[i].closeCnt);
                            }

                            this.allSiteHecBarChartData.labels           = this.chartData.allSiteHec.allSiteHecLabl;
                            this.allSiteHecBarChartData.datasets[0].data = this.chartData.allSiteHec.allSiteHecOpen;
                            this.allSiteHecBarChartData.datasets[1].data = this.chartData.allSiteHec.allSiteHecClose;

                            for(let i=0; i < response.data.datas.dlAllSiteCar.length; i++) {
                                this.chartData.allSiteCar.allSiteCarLabl.push(response.data.datas.dlAllSiteCar[i].csrtTypeNm);
                                this.chartData.allSiteCar.allSiteCarOpen.push(response.data.datas.dlAllSiteCar[i].openCnt);
                                this.chartData.allSiteCar.allSiteCarClose.push(response.data.datas.dlAllSiteCar[i].closeCnt);
                            }

                            this.allSiteCarBarChartData.labels           = this.chartData.allSiteCar.allSiteCarLabl;
                            this.allSiteCarBarChartData.datasets[0].data = this.chartData.allSiteCar.allSiteCarOpen;
                            this.allSiteCarBarChartData.datasets[1].data = this.chartData.allSiteCar.allSiteCarClose;

                            for(let i=0; i < response.data.datas.dlAllSiteNcr.length; i++) {
                                this.chartData.allSiteNcr.allSiteNcrLabl.push(response.data.datas.dlAllSiteNcr[i].csrtTypeNm);
                                this.chartData.allSiteNcr.allSiteNcrOpen.push(response.data.datas.dlAllSiteNcr[i].openCnt);
                                this.chartData.allSiteNcr.allSiteNcrClose.push(response.data.datas.dlAllSiteNcr[i].closeCnt);
                            }

                            this.allSiteNcrBarChartData.labels           = this.chartData.allSiteNcr.allSiteNcrLabl;
                            this.allSiteNcrBarChartData.datasets[0].data = this.chartData.allSiteNcr.allSiteNcrOpen;
                            this.allSiteNcrBarChartData.datasets[1].data = this.chartData.allSiteNcr.allSiteNcrClose;

                            for(let i=0; i < response.data.datas.dlAllSitePun.length; i++) {
                                this.chartData.allSitePun.allSitePunLabl.push(response.data.datas.dlAllSitePun[i].csrtTypeNm);
                                this.chartData.allSitePun.allSitePunOpen.push(response.data.datas.dlAllSitePun[i].openCnt);
                                this.chartData.allSitePun.allSitePunClose.push(response.data.datas.dlAllSitePun[i].closeCnt);
                            }

                            this.allSitePunBarChartData.labels           = this.chartData.allSitePun.allSitePunLabl;
                            this.allSitePunBarChartData.datasets[0].data = this.chartData.allSitePun.allSitePunOpen;
                            this.allSitePunBarChartData.datasets[1].data = this.chartData.allSitePun.allSitePunClose;

                            for(let i=0; i < response.data.datas.dlAllSiteCause.length; i++) {
                                this.chartData.allSiteCause.allSitePieLabl.push(response.data.datas.dlAllSiteCause[i].causeNm);
                                this.chartData.allSiteCause.allSitePieDnst.push(response.data.datas.dlAllSiteCause[i].dnstRate);
                            }

                            this.allSitePieChartData.labels           = this.chartData.allSiteCause.allSitePieLabl;
                            this.allSitePieChartData.datasets[0].data = this.chartData.allSiteCause.allSitePieDnst;

                            for(let i=0; i < response.data.datas.dlAllSiteTime.length; i++) {
                                this.chartData.allSiteTime.allSiteTimeLabl.push(response.data.datas.dlAllSiteTime[i].noCnfmTypeNm);
                                this.chartData.allSiteTime.allSiteTimeTotl.push(response.data.datas.dlAllSiteTime[i].totlAvg);
                                this.chartData.allSiteTime.allSiteTimeAprt.push(response.data.datas.dlAllSiteTime[i].apartAvg);
                                this.chartData.allSiteTime.allSiteTimeNorm.push(response.data.datas.dlAllSiteTime[i].normlAvg);
                                this.chartData.allSiteTime.allSiteTimeFact.push(response.data.datas.dlAllSiteTime[i].factrAvg);
                                this.chartData.allSiteTime.allSiteTimeInfr.push(response.data.datas.dlAllSiteTime[i].infraAvg);
                            }

                            this.allSiteBarGroupChartData.labels           = this.chartData.allSiteTime.allSiteTimeLabl;
                            this.allSiteBarGroupChartData.datasets[0].data = this.chartData.allSiteTime.allSiteTimeTotl;
                            this.allSiteBarGroupChartData.datasets[1].data = this.chartData.allSiteTime.allSiteTimeAprt;
                            this.allSiteBarGroupChartData.datasets[2].data = this.chartData.allSiteTime.allSiteTimeNorm;
                            this.allSiteBarGroupChartData.datasets[3].data = this.chartData.allSiteTime.allSiteTimeFact;
                            this.allSiteBarGroupChartData.datasets[4].data = this.chartData.allSiteTime.allSiteTimeInfr;

                            // console.log(" allSite.allSiteData *************  %o", this.chartData.allSite.allSiteData);
                            // console.log(" response.data.datas.dlAllSiteHec[0] *************  %o", response.data.datas.dlAllSiteHec[0]);

                            this.$refs.allSiteHecBarChart.renderChartData();
                            this.$refs.allSiteCarBarChart.renderChartData();
                            this.$refs.allSiteNcrBarChart.renderChartData();
                            this.$refs.allSitePunBarChart.renderChartData();
                            
                            this.$refs.allSitePieChart.renderChartData();
                            
                            this.$refs.allSiteBarGroupChart.renderChartData();
                });
            },

            /* 부적합 회신지연 시공업체 차트 */
            dataTotal: function(chartData, chartData2, idx) { // legend click 시 전체 건수의 datalabels 변경
                let copy_delay   = _.cloneDeep(chartData.data);
                let copy_publish = _.cloneDeep(chartData2.data); 
                if(chartData.legendstate === true) {
                    copy_delay[idx]   = 0;
                }
                if(chartData2.legendstate === true) {
                    copy_publish[idx] = 0;
                }

                return copy_delay[idx] + copy_publish[idx];
            },

            // setImportance: function(a, b) {        // 비중 data set
            //     let copy_delay = _.cloneDeep(b);   // 지연 건수
            //     let copy_publish = _.cloneDeep(a); // 발행 건수

            //     this.data_compPunRate = [];
            //     copy_publish.map((item, i) => {
            //         this.data_compPunRate.push(
            //             ( copy_delay[i]/(copy_publish[i] + copy_delay[i]) * 100 ).toFixed(2)
            //         );
            //     }); 
            //     return this.data_compPunRate;
            // },

            fn_delyCompChart: function () {
                // let data_compPunLabl = this.data_compPunLabl;
                // let data_compPunDnst = this.data_compPunDnst;
                // let data_compPunDely = this.data_compPunDely;
                // let data_compPunRate = this.data_compPunRate;
                // let data_compPunToal = this.data_compPunToal;

                this.delyCompPunBarChartData = {
                    // labels: data_compPunLabl,
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '비중(%)',
                            // data: this.setImportance(data_compPunDnst, data_compPunDely),
                            // data: data_compPunRate,
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
                                    return 330;
                                },
                                formatter: (value) => {
                                    return value + '%';
                                },
                            },  
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '지연 건수',
                            // data: data_compPunDely,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '발행 건수',
                            // data: data_compPunDnst,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_compPunToal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness: 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[1], context.chart.data.datasets[2], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_compNcrLabl = this.data_compNcrLabl;
                // let data_compNcrDnst = this.data_compNcrDnst;
                // let data_compNcrDely = this.data_compNcrDely;
                // let data_compNcrRate = this.data_compNcrRate;
                // let data_compNcrToal = this.data_compNcrToal;

                this.delyCompNcrBarChartData = {
                    // labels: data_compNcrLabl,
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '비중(%)',
                            // data: this.setImportance(data_compNcrDnst, data_compNcrDely),
                            // data: data_compNcrRate,
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
                                    return 330;
                                },
                                formatter: (value) => {
                                    return value + '%';
                                },
                            },  
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '지연 건수',
                            // data: data_compNcrDely,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '발행 건수',
                            // data: data_compNcrDnst,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_compNcrToal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness: 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[1], context.chart.data.datasets[2], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_compCarLabl = this.data_compCarLabl;
                // let data_compCarDnst = this.data_compCarDnst;
                // let data_compCarDely = this.data_compCarDely;
                // let data_compCarRate = this.data_compCarRate;
                // let data_compCarToal = this.data_compCarToal;

                this.delyCompCarBarChartData = {
                    // labels: data_compCarLabl,
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '비중(%)',
                            // data: this.setImportance(data_compCarDnst, data_compCarDely),
                            // data: data_compCarRate,
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
                                    return 330;
                                },
                                formatter: (value) => {
                                    return value + '%';
                                },
                            },  
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '지연 건수',
                            // data: data_compCarDely,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '발행 건수',
                            // data: data_compCarDnst,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_compCarToal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness: 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[1], context.chart.data.datasets[2], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                this.delyCompBarChartOptions = {
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
                                if(item.datasetIndex != 0 && item.datasetIndex != 3) { // 전체 건수, 비중 제외한 tooltip return
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
                            },
                            color: '#000',
                        },
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'end',
                        reverse: true,
                        labels:{
                            usePointStyle: true,
                            boxWidth: 6,
                            fontSize: 12,
                            filter: (item, data) => {
                                /* legend click 시 비중 data set */
                                data.datasets[item.datasetIndex].legendstate = item.hidden; // legend display state 저장
                                
                                // let copy_publish = _.cloneDeep(data.datasets[2].data);
                                // let copy_delay   = _.cloneDeep(data.datasets[1].data);

                                // if(data.datasets[1].label === '지연 건수' && data.datasets[1].legendstate || data.datasets[2].label === '발행 건수' && data.datasets[2].legendstate) { 
                                //     // 발행건수, 지연건수 hidden = true 인 경우
                                //     data.datasets[0].data.map((item, idx) => {
                                //         data.datasets[0].data[idx] = 0;
                                //     })
                                // }else{
                                //     data.datasets[0].data.map((item, idx) => {
                                //         data.datasets[0].data[idx] = ( copy_delay[idx]/(copy_publish[idx] + copy_delay[idx]) * 100 ).toFixed(2);
                                //     })
                                // }
                                
                                /* 전체건수 제외하고 legend return */
                                if(item.datasetIndex != 3) {
                                    return (data.datasets[item.datasetIndex].label)
                                }
                            },
                        },
                    },
                    scales: {
                        yAxes: [{
                            position: 'left',
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                // stepSize: 50,
                                // min: 0,
                                // max: 500
                            },
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                borderDash: [3, 2],
                                borderColor: '#dcdcdc'
                            },
                        }, {
                            id: 'rightAlign',
                            position: 'right',
                            ticks: {
                                beginAtZero: true,
                                stepSize: 10,
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
                            }
                        }],
                        xAxes: [{
                            stacked: true,
                            gridLines: {
                                display: false
                            },
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            },

            fn_delyCauseChart: function () {
                // let data_causePunLabl = this.data_causePunLabl;
                // let data_causePunDnst = this.data_causePunDnst;
                // let data_causePunDely = this.data_causePunDely;
                // let data_causePunRate = this.data_causePunRate;
                // let data_causePunToal = this.data_causePunToal;
                
                this.delyCausePunBarChartData = {
                    // labels: data_causePunLabl,
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '비중(%)',
                            // data: this.setImportance(data_compPunDnst, data_compPunDely),
                            // data: data_causePunRate,
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
                                    return 330;
                                },
                                formatter: (value) => {
                                    return value + '%';
                                },
                            },  
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '지연 건수',
                            // data: data_causePunDely,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '발행 건수',
                            // data: data_causePunDnst,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_causePunToal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness: 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[1], context.chart.data.datasets[2], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_causeNcrLabl = this.data_causeNcrLabl;
                // let data_causeNcrDnst = this.data_causeNcrDnst;
                // let data_causeNcrDely = this.data_causeNcrDely;
                // let data_causeNcrRate = this.data_causeNcrRate;
                // let data_causeNcrToal = this.data_causeNcrToal;
                
                this.delyCauseNcrBarChartData = {
                    // labels: data_causeNcrLabl,
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '비중(%)',
                            // data: this.setImportance(data_compNcrDnst, data_compNcrDely),
                            // data: data_causeNcrRate,
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
                                    return 330;
                                },
                                formatter: (value) => {
                                    return value + '%';
                                },
                            },  
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '지연 건수',
                            // data: data_causeNcrDely,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '발행 건수',
                            // data: data_causeNcrDnst,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness: 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_causeNcrToal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[1], context.chart.data.datasets[2], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_causeCarLabl = this.data_causeCarLabl;
                // let data_causeCarDnst = this.data_causeCarDnst;
                // let data_causeCarDely = this.data_causeCarDely;
                // let data_causeCarRate = this.data_causeCarRate;
                // let data_causeCarToal = this.data_causeCarToal;
                
                this.delyCauseCarBarChartData = {
                    // labels: data_causeCarLabl,
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '비중(%)',
                            // data: this.setImportance(data_compCarDnst, data_compCarDely),
                            // data: data_causeCarRate,
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
                                    return 330;
                                },
                                formatter: (value) => {
                                    return value + '%';
                                },
                            },  
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '지연 건수',
                            // data: data_causeCarDely,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '발행 건수',
                            // data: data_causeCarDnst,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_causeCarToal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[1], context.chart.data.datasets[2], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                this.delyCauseBarChartOptions = {
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
                                if(item.datasetIndex != 0 && item.datasetIndex != 3) { // 전체 건수, 비중 제외한 tooltip return
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
                            },
                            color: '#000',
                        },
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'end',
                        reverse: true,
                        labels:{
                            usePointStyle: true,
                            boxWidth: 6,
                            fontSize: 12,
                            filter: (item, data) => {
                                /* legend click 시 비중 data set */
                                data.datasets[item.datasetIndex].legendstate = item.hidden; // legend display state 저장
                                
                                // let copy_publish = _.cloneDeep(data.datasets[2].data);
                                // let copy_delay   = _.cloneDeep(data.datasets[1].data);

                                // if(data.datasets[1].label === '지연 건수' && data.datasets[1].legendstate || data.datasets[2].label === '발행 건수' && data.datasets[2].legendstate) { 
                                //     // 발행건수, 지연건수 hidden = true 인 경우
                                //     data.datasets[0].data.map((item, idx) => {
                                //         data.datasets[0].data[idx] = 0;
                                //     })
                                // }else{
                                //     data.datasets[0].data.map((item, idx) => {
                                //         data.datasets[0].data[idx] = ( copy_delay[idx]/(copy_publish[idx] + copy_delay[idx]) * 100 ).toFixed(2);
                                //     })
                                // }
                                
                                /* 전체건수 제외하고 legend return */
                                if(item.datasetIndex != 3) {
                                    return (data.datasets[item.datasetIndex].label)
                                }
                            },
                        },
                    },
                    scales: {
                        yAxes: [{
                            position: 'left',
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                // stepSize: 50,
                                // min: 0,
                                // max: 500
                            },
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                borderDash: [3, 2],
                                borderColor: '#dcdcdc'
                            },
                        }, {
                            id: 'rightAlign',
                            position: 'right',
                            ticks: {
                                beginAtZero: true,
                                stepSize: 10,
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
                            }
                        }],
                        xAxes: [{
                            stacked: true,
                            gridLines: {
                                display: false
                            },
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            },

            fn_cnstSiteChart: function () {
                // let data_siteAllLabl  = this.data_siteAllLabl;
                // let data_siteAllOpen  = this.data_siteAllOpen;
                // let data_siteAllClose = this.data_siteAllClose;
                // let data_siteAllTotal = this.data_siteAllTotal;
                
                this.cnstSiteAllBarChartData = {
                    // labels: data_siteAllLabl,
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Open',
                            // data: data_siteAllOpen,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: 'Closed',
                            // data: data_siteAllClose,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_siteAllTotal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_siteCarLabl  = this.data_siteCarLabl;
                // let data_siteCarOpen  = this.data_siteCarOpen;
                // let data_siteCarClose = this.data_siteCarClose;
                // let data_siteCarTotal = this.data_siteCarTotal;
                
                this.cnstSiteCarBarChartData = {
                    // labels: data_siteCarLabl,
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Open',
                            // data: data_siteCarOpen,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: 'Closed',
                            // data: data_siteCarClose,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_siteCarTotal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_siteNcrLabl  = this.data_siteNcrLabl;
                // let data_siteNcrOpen  = this.data_siteNcrOpen;
                // let data_siteNcrClose = this.data_siteNcrClose;
                // let data_siteNcrTotal = this.data_siteNcrTotal;
                
                this.cnstSiteNcrBarChartData = {
                    // labels: data_siteNcrLabl,
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Open',
                            // data: data_siteNcrOpen,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: 'Closed',
                            // data: data_siteNcrClose,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_siteNcrTotal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_sitePunLabl  = this.data_sitePunLabl;
                // let data_sitePunOpen  = this.data_sitePunOpen;
                // let data_sitePunClose = this.data_sitePunClose;
                // let data_sitePunTotal = this.data_sitePunTotal;
                
                this.cnstSitePunBarChartData = {
                    // labels: data_sitePunLabl,
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Open',
                            // data: data_sitePunOpen,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: 'Closed',
                            // data: data_sitePunClose,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_sitePunTotal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                this.cnstSiteBarChartOptions = {
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
                                if(item.datasetIndex != 2) { // 전체 건수 제외한 tooltip return
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
                            },
                            color: '#000',
                        },
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'end',
                        reverse: true,
                        labels:{
                            usePointStyle: true,
                            boxWidth: 6,
                            fontSize: 12,
                            filter: (item, data) => {
                                /* legend click 시 비중 data set */
                                data.datasets[item.datasetIndex].legendstate = item.hidden; // legend display state 저장

                                /* 전체건수 제외하고 legend return */
                                if(item.datasetIndex != 2) {
                                    return (data.datasets[item.datasetIndex].label)
                                }
                            },
                        },
                    },
                    scales: {
                        yAxes: [{
                            position: 'left',
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                // stepSize: 50,
                                // min: 0,
                                // max: 500
                            },
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                borderDash: [3, 2],
                                borderColor: '#dcdcdc'
                            },
                        }],
                        xAxes: [{
                            stacked: true,
                            gridLines: {
                                display: false
                            },
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            },

            fn_allSiteChart: function () {
                // let data_allSiteHecLabl  = this.data_allSiteHecLabl;
                // let data_allSiteHecOpen  = this.data_allSiteHecOpen;
                // let data_allSiteHecClose = this.data_allSiteHecClose;
                // let data_allSiteHecTotal = this.data_allSiteHecTotal;
                
                this.allSiteHecBarChartData = {
                    // labels: data_allSiteHecLabl,
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Open',
                            // data: data_allSiteHecOpen,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: 'Closed',
                            // data: data_allSiteHecClose,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_allSiteHecTotal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_allSiteCarLabl  = this.data_allSiteCarLabl;
                // let data_allSiteCarOpen  = this.data_allSiteCarOpen;
                // let data_allSiteCarClose = this.data_allSiteCarClose;
                // let data_allSiteCarTotal = this.data_allSiteCarTotal;
                
                this.allSiteCarBarChartData = {
                    // labels: data_allSiteCarLabl,
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Open',
                            // data: data_allSiteCarOpen,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: 'Closed',
                            // data: data_allSiteCarClose,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_allSiteCarTotal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_allSiteNcrLabl  = this.data_allSiteNcrLabl;
                // let data_allSiteNcrOpen  = this.data_allSiteNcrOpen;
                // let data_allSiteNcrClose = this.data_allSiteNcrClose;
                // let data_allSiteNcrTotal = this.data_allSiteNcrTotal;
                
                this.allSiteNcrBarChartData = {
                    // labels: data_allSiteNcrLabl,
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Open',
                            // data: data_allSiteNcrOpen,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: 'Closed',
                            // data: data_allSiteNcrClose,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_allSiteNcrTotal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness : 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                // let data_allSitePunLabl  = this.data_allSitePunLabl;
                // let data_allSitePunOpen  = this.data_allSitePunOpen;
                // let data_allSitePunClose = this.data_allSitePunClose;
                // let data_allSitePunTotal = this.data_allSitePunTotal;
                
                this.allSitePunBarChartData = {
                    // labels: data_allSitePunLabl,
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Open',
                            // data: data_allSitePunOpen,
                            data: [],
                            backgroundColor: '#FF5C5D',
                            pointBackgroundColor: '#FF5C5D',
                            borderWidth: 0,
                            barThickness : 20,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: 'Closed',
                            // data: data_allSitePunClose,
                            data: [],
                            backgroundColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20,
                            hidden: false,
                            datalabels: {
                                align: 'center',
                                anchor: 'center',
                                offset: 0,
                                color: '#fff',
                                borderWidth: 1,
                                barThickness : 1,
                            },
                            legendstate: null, // legend display state
                        },
                        {
                            type: 'bar',
                            label: '전체 건수',
                            // data: data_allSitePunTotal,
                            data: [],
                            backgroundColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            borderWidth: 0,
                            barThickness : 20,
                            barThickness : 20,
                            datalabels: {
                                align: 'end',
                                anchor: 'end',
                                offset: 0,
                                color: '#000',
                                borderWidth: 1,
                                barThickness: 1,
                                formatter: (value, context) => {
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ] ,
                }

                this.allSiteBarChartOptions = {
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
                                if(item.datasetIndex != 2) { // 전체 건수 제외한 tooltip return
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
                            },
                            color: '#000',
                        },
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'end',
                        reverse: true,
                        labels:{
                            usePointStyle: true,
                            boxWidth: 6,
                            fontSize: 12,
                            filter: (item, data) => {
                                /* legend click 시 비중 data set */
                                data.datasets[item.datasetIndex].legendstate = item.hidden; // legend display state 저장

                                /* 전체건수 제외하고 legend return */
                                if(item.datasetIndex != 2) {
                                    return (data.datasets[item.datasetIndex].label)
                                }
                            },
                        },
                    },
                    scales: {
                        yAxes: [{
                            position: 'left',
                            stacked: true,
                            ticks: {
                                beginAtZero: true,
                                // stepSize: 50,
                                // min: 0,
                                // max: 500
                            },
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                borderDash: [3, 2],
                                borderColor: '#dcdcdc'
                            },
                        }],
                        xAxes: [{
                            stacked: true,
                            gridLines: {
                                display: false
                            },
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
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

        },
    }
</script>

<style scoped>
.barchart{
  padding: 0 30px;
  height: 428px;
  border: 1px solid #DCDCDC;
}
</style>