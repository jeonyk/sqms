<template>
    <div class="wrap">
        <div class="lnb_container on">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />

                <div class="lst_tabs">
                    <ul>
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                    </ul>
                </div>
                <div class="tab_area" v-show="currentTab == 0">
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
                                        <select name="" id="mySiteYear" class="form_control size_sm" v-model="search.mySite.searchYear">
                                            <!-- <option value="" selected>선택</option> -->
                                            <option v-for="index in 20" :key="index" :value="advancedInfo.startYear - index + 2">
                                                {{advancedInfo.startYear - index + 2}}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('H')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_pqiMySite()">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="inner">
                        <div class="button_box mt20">
                            <h2>1. PQI 점수</h2>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        평가영역별 분석
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIMySitePointRadarChart', 'PQI 점수')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <RadarChart id="PQIMySitePointRadarChart" :data="PQIMySitePointRadarChartData" :options="PQIRadarChartOptions" class="barchart" ref="PQIMySitePointRadarChart"></RadarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        평가영역별 분석
                                        <div class="fr">
                                            <button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQImySiteGrid1', 'PQI 점수')"
											>
												엑셀 다운로드
											</button>

                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIMySiteBarChart', 'PQI 점수')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIMySiteBarChart" :data="PQIMySiteBarChartData" :options="PQIMySiteBarChartOptions" class="barchart" ref="PQIMySiteBarChart"></BarChart>
                                </div>
                            </div>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="mySitePqiSheetTable1" class="ibsheet_table"></div>
                        </div>

                        <div class="button_box">
                            <h2>2. 사업본부 및 현장 평균 비교</h2>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        평가영역별 분석
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIMySiteAvgRadarChart', '사업본부 및 현장 평균 비교')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <RadarChart id="PQIMySiteAvgRadarChart" :data="PQIMySiteAvgRadarChartData" :options="PQIRadarChartOptions" class="barchart" ref="PQIMySiteAvgRadarChart"></RadarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        평가영역별 분석
                                        <div class="fr">
                                            <button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQImySiteGrid2', '사업본부 및 현장 평균 비교')"
											>
												엑셀 다운로드
											</button>

                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIMySiteGroupChart', '사업본부 및 현장 평균 비교')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIMySiteGroupChart" :data="PQIMySiteGroupChartData" :options="PQIMySiteGroupChartOptions" class="barchart" ref="PQIMySiteGroupChart"></BarChart>
                                </div>
                            </div>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="mySitePqiSheetTable2" class="ibsheet_table"></div>
                        </div>

                        <div class="button_box">
                            <h2>3. 지적사항 조치</h2>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        지적사항 조치
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIMySitePieChart', '지적사항 조치')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <PieChart id="PQIMySitePieChart" :data="PQIMySitePieChartData" :options="PQIMySitePieChartOptions" class="barchart" ref="PQIMySitePieChart"></PieChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        공종별 조치율
                                        <div class="fr">
                                            <button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQImySiteGrid3', '지적사항 조치')"
											>
												엑셀 다운로드
											</button>

                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIMySiteStackChart', '지적사항조치_공종별 조치율')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIMySiteStackChart" :data="PQIMySiteStackChartData" :options="PQIMySiteStackChartOptions" class="barchart" ref="PQIMySiteStackChart"></BarChart>
                                </div>
                            </div>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="mySitePqiSheetTable3" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 1">
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
                                        <!-- <select name="" id="hecSiteYear" class="form_control size_sm" v-model="search.hecSite.searchYear" v-on:change="fn_clearSearch('C')"> -->
                                        <select name="" id="hecSiteYear" class="form_control size_sm" v-model="search.hecSite.searchYear">
                                            <!-- <option value="" selected>선택</option> -->
                                            <option v-for="index in 20" :key="index" :value="advancedInfo.startYear - index + 2">
                                                {{advancedInfo.startYear - index + 2}}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('M')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_pqiHecSite()">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="inner">
                        <div class="button_box mt20">
                            <h2>1. 전사평균 및 사업본부 평균</h2>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        PQI등급 분포
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSitePieChart', 'PQI등급 분포')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <PieChart id="PQIHecSitePieChart" :data="PQIHecSitePieChartData" :options="PQIHecSitePieChartOptions" class="barchart" ref="PQIHecSitePieChart"></PieChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        본부 별 평균점수
                                        <div class="fr">
                                            <button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid1', 'PQI등급 분포')"
											>
												엑셀 다운로드
											</button>

                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteOperBarChart', 'PQI등급 분포_본부 별 평균점수')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteOperBarChart" :data="PQIHecSiteOperBarChartData" :options="PQIHecSiteBarChartOptions" class="barchart" ref="PQIHecSiteOperBarChart"></BarChart>
                                </div>
                            </div>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="hecSitePqiSheetTable1" class="ibsheet_table"></div>
                        </div>

                        <div class="button_box">
                            <h2>2. 평가영역별 분석</h2>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        평가영역별 분석
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteRadarChart', '평가영역별 분석')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <RadarChart id="PQIHecSiteRadarChart" :data="PQIHecSiteRadarChartData" :options="PQIRadarChartOptions" class="barchart" ref="PQIHecSiteRadarChart"></RadarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        평가영역별 분석
                                        <div class="fr">
                                            <button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid2', '평가영역별 분석')"
											>
												엑셀 다운로드
											</button>

                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteGroupChart', '평가영역별 분석')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteGroupChart" :data="PQIHecSiteGroupChartData" :options="PQIHecSiteGroupChartOptions" class="barchart" ref="PQIHecSiteGroupChart"></BarChart>
                                </div>
                            </div>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="hecSitePqiSheetTable2" class="ibsheet_table"></div>
                        </div>

                        <div class="button_box">
                            <h2>3. 연도별 추이</h2>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        본부별 PQI 추이
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteOperLineChart', '본부별 PQI 추이')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteOperLineChart" :data="PQIHecSiteOperLineChartData" :options="PQIHecSiteLineChartOptions" class="barchart" ref="PQIHecSiteOperLineChart"></BarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid3', '본부별 PQI 추이')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="hecSitePqiSheetTable3" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        공사유형별 PQI추이 - 화공플랜트
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteChemLineChart', '공사유형별 PQI추이 - 화공플랜트')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteChemLineChart" :data="PQIHecSiteChemLineChartData" :options="PQIHecSiteLineChartOptions" class="barchart" ref="PQIHecSiteChemLineChart"></BarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid4', '공사유형별 PQI추이 - 화공플랜트')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="hecSitePqiSheetTable4" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        공사유형별 PQI추이 - 전력플랜트
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteElecLineChart', '공사유형별 PQI추이 - 전력플랜트')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteElecLineChart" :data="PQIHecSiteElecLineChartData" :options="PQIHecSiteLineChartOptions" class="barchart" ref="PQIHecSiteElecLineChart"></BarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid5', '공사유형별 PQI추이 - 전력플랜트')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="hecSitePqiSheetTable5" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        공사유형별 PQI추이 - 인프라
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteInfrLineChart', '공사유형별 PQI추이 - 인프라')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteInfrLineChart" :data="PQIHecSiteInfrLineChartData" :options="PQIHecSiteLineChartOptions" class="barchart" ref="PQIHecSiteInfrLineChart"></BarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid6', '공사유형별 PQI추이 - 인프라')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="hecSitePqiSheetTable6" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        공사유형별 PQI추이 - 건축
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteBildLineChart', '공사유형별 PQI추이 - 건축')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteBildLineChart" :data="PQIHecSiteBildLineChartData" :options="PQIHecSiteLineChartOptions" class="barchart" ref="PQIHecSiteBildLineChart"></BarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid7', '공사유형별 PQI추이 - 건축')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="hecSitePqiSheetTable7" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="button_box">
                            <h2>4. 사업유형별</h2>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        사업유형별 분석
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteBsnsBarChart', '사업유형별 분석')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteBsnsBarChart" :data="PQIHecSiteBsnsBarChartData" :options="PQIHecSiteBarChartOptions" class="barchart" ref="PQIHecSiteBsnsBarChart"></BarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid8', '사업유형별 분석')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="hecSitePqiSheetTable8" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="button_box">
                            <h2>5. 지적사항 조치</h2>
                        </div>

                        <div class="table_data">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        본부별 조치율
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('PQIHecSiteStackChart', '조적사항조치_본부별 조치율')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="PQIHecSiteStackChart" :data="PQIHecSiteStackChartData" :options="PQIHecSiteStackChartOptions" class="barchart" ref="PQIHecSiteStackChart"></BarChart>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit p0">
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('PQIhecSiteGrid9', '지적사항조치_본부별 조치율')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="hecSitePqiSheetTable9" class="ibsheet_table"></div>
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

    import { PQIHecSiteList1, PQIHecSiteList2, PQIHecSiteList3, PQIHecSiteList4, PQIHecSiteList5, PQIHecSiteList6, PQIHecSiteList7, PQIHecSiteList8, PQIHecSiteList9, PQIMySiteList1, PQIMySiteList2, PQIMySiteList3 } from '@/pages/common/data/StatisticsList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import loader from '@ibsheet/loader'

    import RadarChart from '@component/chart/RadarChart.vue';
    import PieChart from '@component/chart/PieChart.vue';
    import BarChart from '@component/chart/BarChart.vue';

    import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

    // import axios from 'axios'

    import _ from 'lodash'

    let SHEET_ID = ''; 
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();

    export default {
        name: 'PqiStatsInfoView',
        components: {
            Breadcrumb,
            RadarChart,
            BarChart,
            PieChart
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정
                tabs: ['My Site', 'HEC'], // tab name

                /* chart option */
                plugins: [ChartJSPluginDatalabels],

                /* Grid option */
                PQImySiteGrid1 : {
                    data : null,
                    options : {},
                },
                PQImySiteGrid2 : {
                    data : null,
                    options : {},
                },
                PQImySiteGrid3 : {
                    data : null,
                    options : {},
                },
                /* Grid option */
                PQIhecSiteGrid1 : {
                    data : null,
                    options : {},
                },
                PQIhecSiteGrid2 : {
                    data : null,
                    options : {},
                },
                PQIhecSiteGrid3 : {
                    data : null,
                    options : {},
                },
                PQIhecSiteGrid4 : {
                    data : null,
                    options : {},
                },
                PQIhecSiteGrid5 : {
                    data : null,
                    options : {},
                },
                PQIhecSiteGrid6 : {
                    data : null,
                    options : {},
                },
                PQIhecSiteGrid7 : {
                    data : null,
                    options : {},
                },
                PQIhecSiteGrid8 : {
                    data : null,
                    options : {},
                },
                PQIhecSiteGrid9 : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    /* My Site */
                    PQImySite11 : {
                        mySiteLabl: [],
                        mySiteAllsite: [],
                        mySiteCnstSite: [],
                    },
                    PQImySite12 : {
                        mySiteLabl: [],
                        mySiteCnstSite: [],
                    },
                    PQImySite21 : {
                        mySiteLabl: [],
                        mySiteAllsite: [],
                        mySiteCnstSite: [],
                    },
                    PQImySite22 : {
                        mySiteLabl: [],
                        mySiteAllsite: [],
                        mySiteCnstSite: [],
                    },
                    PQImySite31 : {
                        mySiteLabl: [],
                        mySiteRate: [],
                    },
                    PQImySite32 : {
                        mySiteLabl: [],
                        mySiteEvalOpen: [],
                        mySiteEvalClose: [],
                    },
                    /* Hec Site */
                    PQIhecSite11 : {
                        hecSiteLabl: [],
                        hecSiteType: [],
                    },
                    PQIhecSite12 : {
                        hecSiteLabl: [],
                        hecSiteType: [],
                    },
                    PQIhecSite21 : {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    },
                    PQIhecSite22 : {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    },
                    PQIhecSite31 : {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    },
                    PQIhecSite32 : {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    },
                    PQIhecSite33 : {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    },
                    PQIhecSite34 : {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    },
                    PQIhecSite35 : {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    },
                    PQIhecSite41 : {
                        hecSiteLabl: [],
                        hecSiteTypeAvg: [],
                    },
                    PQIhecSite42 : {
                        hecSiteLabl: [],
                        hecSiteOpen: [],
                        hecSiteClose: [],
                    },
                },

                /** searchInfo */
                search: {
                    mySite: {
                        searchYear: nowYear,
                    },
                    hecSite: {
                        searchYear: nowYear,
                    }
                },

                /* 프로젝트 구분 */
                advancedInfo: {
                    startYear: nowYear
                },

                /**
                 * My Site
                 */
                /* 1. PQI 점수 > 평가영역별 분석 - Radar chart */
                PQIMySitePointRadarChartData: {
                    labels: ['품질시스템','시공품질', '품질RISK', 'IT시스템활용도', '고객만족도'],
                    datasets: [
                        {
                            label: '전사',
                            backgroundColor: 'rgba(40,161,224,0.2)',
                            borderColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#28A1E0',
                            data: []
                        },
                        {
                            label: '현장',
                            backgroundColor: 'rgba(250,167,25,0.2)',
                            borderColor: '#FAA719',
                            pointBackgroundColor: '#FAA719',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#FAA719',
                            data: []
                        }
                    ]
                },

                /* 1. PQI 점수 > 평가영역별 분석 - Bar chart */
                PQIMySiteBarChartData: {
                    labels: ['전사', '품질시스템','시공품질', '품질RISK', 'IT시스템활용도', '고객만족도'],
                    datasets: [
                        {   
                            label: '현장',
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                            barThickness : 20, 
                        },
                    ]
                },
                PQIMySiteBarChartOptions: {
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
                            color: '#333',
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
                                // stepSize: 10,
                                // min: 70,
                                // max: 100
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
                        // position: 'right',
                        // align: 'end',
                        position: 'bottom',
                        align: 'center',
                        labels:{
                          usePointStyle: true,
                          boxWidth: 6,
                          fontSize: 16,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },

                /* 2. 사업본부 및 현장 평균 비교 > 평가영역별 분석 - Radar chart */
                PQIMySiteAvgRadarChartData: {
                    labels: ['품질시스템','시공품질', '품질RISK', 'IT시스템활용도', '고객만족도'],
                    datasets: [
                        {
                            label: '본부',
                            backgroundColor: 'rgba(40,161,224,0.2)',
                            borderColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#28A1E0',
                            data: []
                        },
                        {
                            label: '현장',
                            backgroundColor: 'rgba(250,167,25,0.2)',
                            borderColor: '#FAA719',
                            pointBackgroundColor: '#FAA719',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#FAA719',
                            data: []
                        }
                    ]
                },

                /* 2. 사업본부 및 현장 평균 비교 > 평가영역별 분석 - Bar group chart */
                PQIMySiteGroupChartData: {
                    labels: ['전체','품질시스템','시공품질', '품질RISK', 'IT시스템활용도', '고객만족도'],
                    datasets: [
                        {
                            label: '본부',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '현장',
                            data: [],
                            backgroundColor: '#FAA719',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        }
                    ]
                },
                PQIMySiteGroupChartOptions: {
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
                            display: false,
                            // backgroundColor: "transparent",
                            // textAlign: "center",
                            // font: {
                            //     weight: "bold",
                            //     size: 14
                            // }
                        },
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                // stepSize: 100,
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

                /* 3. 지적사항 조치 > 지적사항 조치 - Pie chart */
                PQIMySitePieChartData: {
                    labels: ['조치완료', '미조치'],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FF5C5D', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                PQIMySitePieChartOptions: {
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
                          fontSize: 16,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },

                /* 3. 지적사항 조치 > 지적사항 조치 - Bar Stacked chart */
                PQIMySiteStackChartData: null,
                PQIMySiteStackChartOptions: null,
                data_publish5: [140, 60, 120, 80, 120],
                data_delay5: [20, 30, 40, 20, 70],
                data_total5: [],

                /**
                 * Hec Site
                 */
                /* 1. 전사평균 및 사업본부 평균 > PQI등급 분포 - Pie chart */
                PQIHecSitePieChartData: {
                    labels: ['S등급', 'A등급', 'B등급', 'C등급', 'D등급'],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                PQIHecSitePieChartOptions: {
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
                            // align: 'end',
                            // anchor: 'end',
                            // color: '#000',
                            formatter: (value, ctx) => {
                                return value;
                                // return ctx.chart.data.labels[ctx.dataIndex] + ':' + value;
                                // return ctx.chart.data.labels[ctx.dataIndex];
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
                        // position: 'bottom',
                        // align: 'center',
                        labels:{
                          usePointStyle: true,
                          boxWidth: 6,
                          fontSize: 16,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },
                

                /* 1. 전사평균 및 사업본부 평균 > 본부 별 평균점수 - Bar chart */
                PQIHecSiteOperBarChartData: {
                    labels: ['전체','플랜트(화공)','플랜트(전력)','인프라','건축'],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                            barThickness : 20, 
                        },
                    ]
                },
                PQIHecSiteBarChartOptions: {
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
                            color: '#333',
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
                                // stepSize: 10,
                                // min: 70,
                                // max: 100
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

                /* 2. 평가영역별 분석 > 평가영역별 분석 - Radar chart */
                PQIHecSiteRadarChartData: {
                    labels: ['품질시스템', '시공품질', '품질RISK', 'IT시스템 활용도', '고객만족도'],
                    datasets: [
                        {
                            label: '전체',
                            backgroundColor: 'rgba(40,161,224,0.2)',
                            borderColor: '#28A1E0',
                            pointBackgroundColor: '#28A1E0',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#28A1E0',
                            data: []
                        },
                        {
                            label: '플랜트(화공)',
                            backgroundColor: 'rgba(250,167,25,0.2)',
                            borderColor: '#FAA719',
                            pointBackgroundColor: '#FAA719',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#FAA719',
                            data: []
                        },
                        {
                            label: '플랜트(전력)',
                            backgroundColor: 'rgba(127,215,237,0.2)',
                            borderColor: '#7FD7ED',
                            pointBackgroundColor: '#7FD7ED',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#7FD7ED',
                            data: []
                        },
                        {
                            label: '인프라',
                            backgroundColor: 'rgba(5,79,106,0.2)',
                            borderColor: '#054F6A',
                            pointBackgroundColor: '#054F6A',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#054F6A',
                            data: []
                        },
                        {
                            label: '건축',
                            backgroundColor: 'rgba(188,187,192,0.2)',
                            borderColor: '#BCBBC0',
                            pointBackgroundColor: '#BCBBC0',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#BCBBC0',
                            data: []
                        },
                    ]
                },
                PQIRadarChartOptions: {
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
                            color: '#666',
                            /*
                            formatter: (value, ctx) => {
                                let sum = 0;
                                let dataArr = ctx.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += data;
                                });
                                let percentage = (value*100 / sum).toFixed(2)+"%";
                                return percentage;
                            },
                            */
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
                          fontSize: 16,
                        }
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            // stepSize: 20
                            // max: 100,
                            // min: 0,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                    
                },

                /* 2. 평가영역별 분석 > 평가영역별 분석 - Bar chart */
                PQIHecSiteGroupChartData: {
                    labels: ['품질시스템', '시공품질', '품질RISK', 'IT시스템 활용도', '고객만족도'],
                    datasets: [
                        {
                            label: '전체',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '플랜트(화공)',
                            data: [],
                            backgroundColor: '#FAA719',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '플랜트(전력)',
                            data: [],
                            backgroundColor: '#7FD7ED',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '인프라',
                            data: [],
                            backgroundColor: '#054F6A',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '건축',
                            data: [],
                            backgroundColor: '#BCBBC0',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            categoryPercentage : 0.5,
                        },
                    ]
                },
                PQIHecSiteGroupChartOptions: {
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
                            display: false,
                            // backgroundColor: "transparent",
                            // textAlign: "center",
                            // font: {
                            //     weight: "bold",
                            //     size: 14
                            // }
                        },
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                // stepSize: 100,
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

                /* 3. 연도별 추이 > 본부별 PQI 추이 - Line chart */
                PQIHecSiteOperLineChartData: {
                    labels: ['2018년', '2019년', '2020년', '2021년', '2022년'],
                    datasets: [
                        {
                            type: 'line',
                            label: '전체',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#0D8AC2',
                            pointRadius: 4,
                            pointBackgroundColor: '#0D8AC2',
                            datalabels: {
                                anchor: 'start',
                                color: '#0D8AC2',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '플랜트(화공)',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#FAA719',
                            pointRadius: 4,
                            pointBackgroundColor: '#FAA719',
                            datalabels: {
                                anchor: 'start',
                                color: '#FAA719',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '플랜트(전력)',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#7FD7ED',
                            pointRadius: 4,
                            pointBackgroundColor: '#7FD7ED',
                            datalabels: {
                                anchor: 'start',
                                color: '#7FD7ED',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '인프라',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#054F6A',
                            pointRadius: 4,
                            pointBackgroundColor: '#054F6A',
                            datalabels: {
                                anchor: 'start',
                                color: '#054F6A',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '건축',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#BCBBC0',
                            pointRadius: 4,
                            pointBackgroundColor: '#BCBBC0',
                            datalabels: {
                                anchor: 'start',
                                color: '#BCBBC0',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                    ]
                },
                /* 3. 연도별 추이 > 공사유형별 PQI추이 - 화공플랜트 - Line chart */
                PQIHecSiteChemLineChartData: {
                    labels: ['2018년', '2019년', '2020년', '2021년', '2022년'],
                    datasets: [
                        {
                            type: 'line',
                            label: '품질시스템',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#0D8AC2',
                            pointRadius: 4,
                            pointBackgroundColor: '#0D8AC2',
                            datalabels: {
                                anchor: 'start',
                                color: '#0D8AC2',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '시공품질',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#FAA719',
                            pointRadius: 4,
                            pointBackgroundColor: '#FAA719',
                            datalabels: {
                                anchor: 'start',
                                color: '#FAA719',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '품질RISK',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#7FD7ED',
                            pointRadius: 4,
                            pointBackgroundColor: '#7FD7ED',
                            datalabels: {
                                anchor: 'start',
                                color: '#7FD7ED',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: 'IT시스템활용도',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#054F6A',
                            pointRadius: 4,
                            pointBackgroundColor: '#054F6A',
                            datalabels: {
                                anchor: 'start',
                                color: '#054F6A',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '고객만족도',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#BCBBC0',
                            pointRadius: 4,
                            pointBackgroundColor: '#BCBBC0',
                            datalabels: {
                                anchor: 'start',
                                color: '#BCBBC0',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                    ]
                },
                /* 3. 연도별 추이 > 공사유형별 PQI추이 - 전력플랜트 - Line chart */
                PQIHecSiteElecLineChartData: {
                    labels: ['2018년', '2019년', '2020년', '2021년', '2022년'],
                    datasets: [
                        {
                            type: 'line',
                            label: '품질시스템',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#0D8AC2',
                            pointRadius: 4,
                            pointBackgroundColor: '#0D8AC2',
                            datalabels: {
                                anchor: 'start',
                                color: '#0D8AC2',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '시공품질',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#FAA719',
                            pointRadius: 4,
                            pointBackgroundColor: '#FAA719',
                            datalabels: {
                                anchor: 'start',
                                color: '#FAA719',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '품질RISK',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#7FD7ED',
                            pointRadius: 4,
                            pointBackgroundColor: '#7FD7ED',
                            datalabels: {
                                anchor: 'start',
                                color: '#7FD7ED',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: 'IT시스템활용도',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#054F6A',
                            pointRadius: 4,
                            pointBackgroundColor: '#054F6A',
                            datalabels: {
                                anchor: 'start',
                                color: '#054F6A',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '고객만족도',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#BCBBC0',
                            pointRadius: 4,
                            pointBackgroundColor: '#BCBBC0',
                            datalabels: {
                                anchor: 'start',
                                color: '#BCBBC0',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                    ]
                },
                /* 3. 연도별 추이 > 공사유형별 PQI추이 - 인프라 - Line chart */
                PQIHecSiteInfrLineChartData: {
                    labels: ['2018년', '2019년', '2020년', '2021년', '2022년'],
                    datasets: [
                        {
                            type: 'line',
                            label: '품질시스템',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#0D8AC2',
                            pointRadius: 4,
                            pointBackgroundColor: '#0D8AC2',
                            datalabels: {
                                anchor: 'start',
                                color: '#0D8AC2',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '시공품질',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#FAA719',
                            pointRadius: 4,
                            pointBackgroundColor: '#FAA719',
                            datalabels: {
                                anchor: 'start',
                                color: '#FAA719',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '품질RISK',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#7FD7ED',
                            pointRadius: 4,
                            pointBackgroundColor: '#7FD7ED',
                            datalabels: {
                                anchor: 'start',
                                color: '#7FD7ED',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: 'IT시스템활용도',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#054F6A',
                            pointRadius: 4,
                            pointBackgroundColor: '#054F6A',
                            datalabels: {
                                anchor: 'start',
                                color: '#054F6A',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '고객만족도',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#BCBBC0',
                            pointRadius: 4,
                            pointBackgroundColor: '#BCBBC0',
                            datalabels: {
                                anchor: 'start',
                                color: '#BCBBC0',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                    ]
                },
                /* 3. 연도별 추이 > 공사유형별 PQI추이 - 건축 - Line chart */
                PQIHecSiteBildLineChartData: {
                    labels: ['2018년', '2019년', '2020년', '2021년', '2022년'],
                    datasets: [
                        {
                            type: 'line',
                            label: '품질시스템',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#0D8AC2',
                            pointRadius: 4,
                            pointBackgroundColor: '#0D8AC2',
                            datalabels: {
                                anchor: 'start',
                                color: '#0D8AC2',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '시공품질',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#FAA719',
                            pointRadius: 4,
                            pointBackgroundColor: '#FAA719',
                            datalabels: {
                                anchor: 'start',
                                color: '#FAA719',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '품질RISK',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#7FD7ED',
                            pointRadius: 4,
                            pointBackgroundColor: '#7FD7ED',
                            datalabels: {
                                anchor: 'start',
                                color: '#7FD7ED',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: 'IT시스템활용도',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#054F6A',
                            pointRadius: 4,
                            pointBackgroundColor: '#054F6A',
                            datalabels: {
                                anchor: 'start',
                                color: '#054F6A',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                        {
                            type: 'line',
                            label: '고객만족도',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#BCBBC0',
                            pointRadius: 4,
                            pointBackgroundColor: '#BCBBC0',
                            datalabels: {
                                anchor: 'start',
                                color: '#BCBBC0',
                                offset: 20,
                                align: function() {
                                    return 330;
                                },
                            }
                        },
                    ]
                },
                PQIHecSiteLineChartOptions: {
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
                                // stepSize: 10,
                                // min: 0,
                                // max: 100
                            },
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                borderDash: [3, 2],
                                borderColor: '#dcdcdc'
                            }
                        },
                        // {
                        //     position: 'right',
                        //     ticks: {
                        //         beginAtZero: true,
                        //         // stepSize: 50,
                        //         // min: 0,
                        //         // max: 100,
                        //         callback: function(value) {
                        //             return value + '%';
                        //         }
                        //     },
                        //     gridLines: {
                        //         display: false,
                        //         drawBorder: false,
                        //         borderDash: [3, 2],
                        //         borderColor: '#dcdcdc'
                        //     }
                        // }
                        ],
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },

                /* 4. 사업유형별 > 사업유형별 분석 - Bar chart */
                PQIHecSiteBsnsBarChartData: {
                    labels: ['전사','공동주택','일반건축','공장','인프라'],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                            barThickness : 20, 
                        },
                    ]
                },

                /** 5. 지적사항 조치 > 본부별 조치율 - bar Stacked chart */
                PQIHecSiteStackChartData: null,
                PQIHecSiteStackChartOptions: null,
                data_publish: [],
                data_delay: [],
                data_total: [],
            }
        },
        created() {
            this.fn_myStackChart();
            this.fn_hecStackChart();
        },
        mounted() {
            this.fn_initMyGrid();
            this.fn_initHecGrid();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
            fn_initMyGrid: function () {
                
                let hecOptions1 = PQIMySiteList1.options;
                let hecOptions2 = PQIMySiteList2.options;
                let hecOptions3 = PQIMySiteList3.options;

                hecOptions3.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_pqiMySite();
                    },
                }

                loader.createSheet({
                    el: 'mySitePqiSheetTable1',
                    data: [],
                    options: hecOptions1
                }).then((sheet) => {
                    this.PQImySiteGrid1.data  = sheet
                });
                loader.createSheet({
                    el: 'mySitePqiSheetTable2',
                    data: [],
                    options: hecOptions2
                }).then((sheet) => {
                    this.PQImySiteGrid2.data  = sheet
                });
                loader.createSheet({
                    el: 'mySitePqiSheetTable3',
                    data: [],
                    options: hecOptions3
                }).then((sheet) => {
                    this.PQImySiteGrid3.data = sheet
                });
            },

            fn_initHecGrid: function () {
                let myOptions1 = PQIHecSiteList1.options;
                let myOptions2 = PQIHecSiteList2.options;
                let myOptions3 = PQIHecSiteList3.options;
                let myOptions4 = PQIHecSiteList4.options;
                let myOptions5 = PQIHecSiteList5.options;
                let myOptions6 = PQIHecSiteList6.options;
                let myOptions7 = PQIHecSiteList7.options;
                let myOptions8 = PQIHecSiteList8.options;
                let myOptions9 = PQIHecSiteList9.options;

                myOptions9.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_pqiHecSite();
                    },
                }

                loader.createSheet({
                    el: 'hecSitePqiSheetTable1',
                    data: [],
                    options: myOptions1
                }).then((sheet) => {
                    this.PQIhecSiteGrid1.data  = sheet
                });
                loader.createSheet({
                    el: 'hecSitePqiSheetTable2',
                    data: [],
                    options: myOptions2
                }).then((sheet) => {
                    this.PQIhecSiteGrid2.data  = sheet
                });
                loader.createSheet({
                    el: 'hecSitePqiSheetTable3',
                    data: [],
                    options: myOptions3
                }).then((sheet) => {
                    this.PQIhecSiteGrid3.data = sheet
                });
                loader.createSheet({
                    el: 'hecSitePqiSheetTable4',
                    data: [],
                    options: myOptions4
                }).then((sheet) => {
                    this.PQIhecSiteGrid4.data  = sheet
                });
                loader.createSheet({
                    el: 'hecSitePqiSheetTable5',
                    data: [],
                    options: myOptions5
                }).then((sheet) => {
                    this.PQIhecSiteGrid5.data  = sheet
                });
                loader.createSheet({
                    el: 'hecSitePqiSheetTable6',
                    data: [],
                    options: myOptions6
                }).then((sheet) => {
                    this.PQIhecSiteGrid6.data  = sheet
                });
                loader.createSheet({
                    el: 'hecSitePqiSheetTable7',
                    data: [],
                    options: myOptions7
                }).then((sheet) => {
                    this.PQIhecSiteGrid7.data  = sheet
                });
                loader.createSheet({
                    el: 'hecSitePqiSheetTable8',
                    data: [],
                    options: myOptions8
                }).then((sheet) => {
                    this.PQIhecSiteGrid8.data  = sheet
                });
                loader.createSheet({
                    el: 'hecSitePqiSheetTable9',
                    data: [],
                    options: myOptions9
                }).then((sheet) => {
                    this.PQIhecSiteGrid9.data = sheet
                });
            },

            fn_clearSearch: function (type) {
                if(type == "H"){
                    this.search.hecSite.searchYear  = nowYear;

                    this.PQIhecSiteGrid1.data.loadSearchData({
                        data : null
                    });
                    this.PQIhecSiteGrid2.data.loadSearchData({
                        data : null
                    });
                    this.PQIhecSiteGrid3.data.loadSearchData({
                        data : null
                    });
                    this.PQIhecSiteGrid4.data.loadSearchData({
                        data : null
                    });
                    this.PQIhecSiteGrid5.data.loadSearchData({
                        data : null
                    });
                    this.PQIhecSiteGrid6.data.loadSearchData({
                        data : null
                    });
                    this.PQIhecSiteGrid7.data.loadSearchData({
                        data : null
                    });
                    this.PQIhecSiteGrid8.data.loadSearchData({
                        data : null
                    });
                    this.PQIhecSiteGrid9.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("M");
                } else if(type == "M"){
                    this.search.mySite.searchYear  = nowYear;
                    
                    this.PQImySiteGrid1.data.loadSearchData({
                        data : null
                    });
                    this.PQImySiteGrid2.data.loadSearchData({
                        data : null
                    });
                    this.PQImySiteGrid3.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("H");
                }
            },

            fn_clearChart: function (type) {
               if(type == "H"){
                /* Hec Site */
                    this.chartData.PQIhecSite11 = {
                        hecSiteLabl: [],
                        hecSiteType: [],
                    };
                    this.chartData.PQIhecSite12 = {
                        hecSiteLabl: [],
                        hecSiteType: [],
                    };
                    this.chartData.PQIhecSite21 = {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    };
                    this.chartData.PQIhecSite22 = {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    };
                    this.chartData.PQIhecSite31 = {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    };
                    this.chartData.PQIhecSite32 = {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    };
                    this.chartData.PQIhecSite33 = {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    };
                    this.chartData.PQIhecSite34 = {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    };
                    this.chartData.PQIhecSite35 = {
                        hecSiteLabl: [],
                        hecSiteCnstType1: [],
                        hecSiteCnstType2: [],
                        hecSiteCnstType3: [],
                        hecSiteCnstType4: [],
                        hecSiteCnstType5: [],
                    };
                    this.chartData.PQIhecSite41 = {
                        hecSiteLabl: [],
                        hecSiteTypeAvg: [],
                    };
                    this.chartData.PQIhecSite42 = {
                        hecSiteLabl: [],
                        hecSiteOpen: [],
                        hecSiteClose: [],
                    };

                    // this.PQIHecSitePieChartData.labels                 = [];
                    this.PQIHecSiteOperBarChartData.labels             = [];
                    // this.PQIHecSiteRadarChartData.labels               = [];
                    // this.PQIHecSiteGroupChartData.labels               = [];
                    this.PQIHecSiteOperLineChartData.labels            = [];
                    this.PQIHecSiteChemLineChartData.labels            = [];
                    this.PQIHecSiteElecLineChartData.labels            = [];
                    this.PQIHecSiteInfrLineChartData.labels            = [];
                    this.PQIHecSiteBildLineChartData.labels            = [];
                    this.PQIHecSiteBsnsBarChartData.labels             = [];
                    this.PQIHecSiteStackChartData.labels               = [];


                    this.PQIHecSitePieChartData.datasets[0].data       = [];

                    this.PQIHecSiteOperBarChartData.datasets[0].data   = [];

                    this.PQIHecSiteRadarChartData.datasets[0].data     = [];
                    this.PQIHecSiteRadarChartData.datasets[1].data     = [];
                    this.PQIHecSiteRadarChartData.datasets[2].data     = [];
                    this.PQIHecSiteRadarChartData.datasets[3].data     = [];
                    this.PQIHecSiteRadarChartData.datasets[4].data     = [];

                    this.PQIHecSiteGroupChartData.datasets[0].data     = [];
                    this.PQIHecSiteGroupChartData.datasets[1].data     = [];
                    this.PQIHecSiteGroupChartData.datasets[2].data     = [];
                    this.PQIHecSiteGroupChartData.datasets[3].data     = [];
                    this.PQIHecSiteGroupChartData.datasets[4].data     = [];

                    this.PQIHecSiteOperLineChartData.datasets[0].data  = [];
                    this.PQIHecSiteOperLineChartData.datasets[1].data  = [];
                    this.PQIHecSiteOperLineChartData.datasets[2].data  = [];
                    this.PQIHecSiteOperLineChartData.datasets[3].data  = [];
                    this.PQIHecSiteOperLineChartData.datasets[4].data  = [];

                    this.PQIHecSiteChemLineChartData.datasets[0].data  = [];
                    this.PQIHecSiteChemLineChartData.datasets[1].data  = [];
                    this.PQIHecSiteChemLineChartData.datasets[2].data  = [];
                    this.PQIHecSiteChemLineChartData.datasets[3].data  = [];
                    this.PQIHecSiteChemLineChartData.datasets[4].data  = [];

                    this.PQIHecSiteElecLineChartData.datasets[0].data  = [];
                    this.PQIHecSiteElecLineChartData.datasets[1].data  = [];
                    this.PQIHecSiteElecLineChartData.datasets[2].data  = [];
                    this.PQIHecSiteElecLineChartData.datasets[3].data  = [];
                    this.PQIHecSiteElecLineChartData.datasets[4].data  = [];

                    this.PQIHecSiteInfrLineChartData.datasets[0].data  = [];
                    this.PQIHecSiteInfrLineChartData.datasets[1].data  = [];
                    this.PQIHecSiteInfrLineChartData.datasets[2].data  = [];
                    this.PQIHecSiteInfrLineChartData.datasets[3].data  = [];
                    this.PQIHecSiteInfrLineChartData.datasets[4].data  = [];

                    this.PQIHecSiteBildLineChartData.datasets[0].data  = [];
                    this.PQIHecSiteBildLineChartData.datasets[1].data  = [];
                    this.PQIHecSiteBildLineChartData.datasets[2].data  = [];
                    this.PQIHecSiteBildLineChartData.datasets[3].data  = [];
                    this.PQIHecSiteBildLineChartData.datasets[4].data  = [];

                    this.PQIHecSiteBsnsBarChartData.datasets[0].data   = [];

                    this.PQIHecSiteStackChartData.datasets[0].data     = [];
                    this.PQIHecSiteStackChartData.datasets[1].data     = [];

                    this.$refs.PQIHecSitePieChart.renderChartData();
                    this.$refs.PQIHecSiteOperBarChart.renderChartData();
                    this.$refs.PQIHecSiteRadarChart.renderChartData();
                    this.$refs.PQIHecSiteGroupChart.renderChartData();
                    this.$refs.PQIHecSiteOperLineChart.renderChartData();
                    this.$refs.PQIHecSiteChemLineChart.renderChartData();
                    this.$refs.PQIHecSiteElecLineChart.renderChartData();
                    this.$refs.PQIHecSiteInfrLineChart.renderChartData();
                    this.$refs.PQIHecSiteBildLineChart.renderChartData();
                    this.$refs.PQIHecSiteBsnsBarChart.renderChartData();
                    this.$refs.PQIHecSiteStackChart.renderChartData();
                } else if(type == "M"){
                    /* My Site */
                    this.chartData.PQImySite11 = {
                        mySiteLabl: [],
                        mySiteAllsite: [],
                        mySiteCnstSite: [],
                    };
                    this.chartData.PQImySite12 = {
                        mySiteLabl: [],
                        mySiteCnstSite: [],
                    };
                    this.chartData.PQImySite21 = {
                        mySiteLabl: [],
                        mySiteAllsite: [],
                        mySiteCnstSite: [],
                    };
                    this.chartData.PQImySite22 = {
                        mySiteLabl: [],
                        mySiteAllsite: [],
                        mySiteCnstSite: [],
                    };
                    this.chartData.PQImySite31 = {
                        mySiteLabl: [],
                        mySiteRate: [],
                    };
                    this.chartData.PQImySite32 = {
                        mySiteLabl: [],
                        mySiteEvalOpen: [],
                        mySiteEvalClose: [],
                    };

                    // this.PQIMySitePointRadarChartData.labels            = [];
                    // this.PQIMySiteBarChartData.labels                   = [];
                    // this.PQIMySiteAvgRadarChartData.labels              = [];
                    // this.PQIMySiteGroupChartData.labels                 = [];
                    this.PQIMySitePieChartData.labels                   = [];
                    this.PQIMySiteStackChartData.labels                 = [];

                    this.PQIMySitePointRadarChartData.datasets[0].data  = [];
                    this.PQIMySitePointRadarChartData.datasets[1].data  = [];

                    this.PQIMySiteBarChartData.datasets[0].data         = [];

                    this.PQIMySiteAvgRadarChartData.datasets[0].data    = [];
                    this.PQIMySiteAvgRadarChartData.datasets[1].data    = [];

                    this.PQIMySiteGroupChartData.datasets[0].data       = [];
                    this.PQIMySiteGroupChartData.datasets[1].data       = [];

                    this.PQIMySitePieChartData.datasets[0].data         = [];

                    this.PQIMySiteStackChartData.datasets[0].data       = [];
                    this.PQIMySiteStackChartData.datasets[1].data       = [];


                    this.$refs.PQIMySitePointRadarChart.renderChartData();
                    this.$refs.PQIMySiteBarChart.renderChartData();
                    this.$refs.PQIMySiteAvgRadarChart.renderChartData();
                    this.$refs.PQIMySiteGroupChart.renderChartData();
                    this.$refs.PQIMySitePieChart.renderChartData();
                    this.$refs.PQIMySiteStackChart.renderChartData();
                }
            },

            fn_initGrodHead: function () {

                    let hr3 = this.PQIhecSiteGrid3.data.getRowById("Header"); 
                    this.PQIhecSiteGrid3.data.setValue( hr3, "before4pnt", (this.search.hecSite.searchYear - 4) + "년" );
                    this.PQIhecSiteGrid3.data.setValue( hr3, "before3pnt", (this.search.hecSite.searchYear - 3) + "년" );
                    this.PQIhecSiteGrid3.data.setValue( hr3, "before2pnt", (this.search.hecSite.searchYear - 2) + "년" );
                    this.PQIhecSiteGrid3.data.setValue( hr3, "before1pnt", (this.search.hecSite.searchYear - 1) + "년" );
                    this.PQIhecSiteGrid3.data.setValue( hr3, "before0pnt", (this.search.hecSite.searchYear - 0) + "년" );

                    let hr4 = this.PQIhecSiteGrid4.data.getRowById("Header"); 
                    this.PQIhecSiteGrid4.data.setValue( hr4, "before4", (this.search.hecSite.searchYear - 4) + "년" );
                    this.PQIhecSiteGrid4.data.setValue( hr4, "before3", (this.search.hecSite.searchYear - 3) + "년" );
                    this.PQIhecSiteGrid4.data.setValue( hr4, "before2", (this.search.hecSite.searchYear - 2) + "년" );
                    this.PQIhecSiteGrid4.data.setValue( hr4, "before1", (this.search.hecSite.searchYear - 1) + "년" );
                    this.PQIhecSiteGrid4.data.setValue( hr4, "before0", (this.search.hecSite.searchYear - 0) + "년" );

                    let hr5 = this.PQIhecSiteGrid5.data.getRowById("Header"); 
                    this.PQIhecSiteGrid5.data.setValue( hr5, "before4", (this.search.hecSite.searchYear - 4) + "년" );
                    this.PQIhecSiteGrid5.data.setValue( hr5, "before3", (this.search.hecSite.searchYear - 3) + "년" );
                    this.PQIhecSiteGrid5.data.setValue( hr5, "before2", (this.search.hecSite.searchYear - 2) + "년" );
                    this.PQIhecSiteGrid5.data.setValue( hr5, "before1", (this.search.hecSite.searchYear - 1) + "년" );
                    this.PQIhecSiteGrid5.data.setValue( hr5, "before0", (this.search.hecSite.searchYear - 0) + "년" );

                    let hr6 = this.PQIhecSiteGrid6.data.getRowById("Header"); 
                    this.PQIhecSiteGrid6.data.setValue( hr6, "before4", (this.search.hecSite.searchYear - 4) + "년" );
                    this.PQIhecSiteGrid6.data.setValue( hr6, "before3", (this.search.hecSite.searchYear - 3) + "년" );
                    this.PQIhecSiteGrid6.data.setValue( hr6, "before2", (this.search.hecSite.searchYear - 2) + "년" );
                    this.PQIhecSiteGrid6.data.setValue( hr6, "before1", (this.search.hecSite.searchYear - 1) + "년" );
                    this.PQIhecSiteGrid6.data.setValue( hr6, "before0", (this.search.hecSite.searchYear - 0) + "년" );

                    let hr7 = this.PQIhecSiteGrid7.data.getRowById("Header"); 
                    this.PQIhecSiteGrid7.data.setValue( hr7, "before4", (this.search.hecSite.searchYear - 4) + "년" );
                    this.PQIhecSiteGrid7.data.setValue( hr7, "before3", (this.search.hecSite.searchYear - 3) + "년" );
                    this.PQIhecSiteGrid7.data.setValue( hr7, "before2", (this.search.hecSite.searchYear - 2) + "년" );
                    this.PQIhecSiteGrid7.data.setValue( hr7, "before1", (this.search.hecSite.searchYear - 1) + "년" );
                    this.PQIhecSiteGrid7.data.setValue( hr7, "before0", (this.search.hecSite.searchYear - 0) + "년" );
                            
                    // this.PQIhecSiteGrid7.data.refreshCell( hr7, "before0pnt" );
            },

           fn_pqiMySite : async function(){
                this.fn_clearChart("M");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/pqi/pqiMySiteInfo/list';
                let param = {
                    ...this.search.mySite,
                    searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    searchProjectId: this.$store.getters['auth/getProjectId'],
                    searchBaseCd: this.$store.getters['auth/getBaseType'],
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            let pqiData = [];
                            for(let i=0; i < response.data.datas.dlSitePointTotal.length; i++) {
                                console.log(response.data.datas.dlSitePointTotal[i].baseType);
                                if( response.data.datas.dlSitePointTotal[i].baseType != "4000") {
                                    /* 전사 데이터 제외 */
                                    pqiData.push(response.data.datas.dlSitePointTotal[i]);
                                }
                            }

                            this.PQImySiteGrid1.data.loadSearchData({
                                // data: response.data.datas.dlSitePointTotal,
                                data: pqiData,
                            });
                            this.PQImySiteGrid2.data.loadSearchData({
                                data: response.data.datas.dlBussHeadSite,
                            });
                            this.PQImySiteGrid3.data.loadSearchData({
                                data: response.data.datas.dlSitePoutMeas,
                            });

                            // console.log(" My Site Data ************* %o", response.data.datas);

                            let pointData1 = [];
                            let pointData2 = []; 
                            let pointData3 = []; 
                            let maepljum0  = 0;  let maepljum1  = 0;  let maepljum2 = 0; 
                            let maepljum3  = 0;  let maepljum4  = 0;  let maepljum6 = 0;
                            let siteCnt    = 0;

                            for(let i=0; i < response.data.datas.dlSitePointTotal.length; i++) {
                                if( response.data.datas.dlSitePointTotal[i].baseType == "4000") {
                                    /* 전사 */
                                    pointData1.push(response.data.datas.dlSitePointTotal[i].maepljum1);
                                    pointData1.push(response.data.datas.dlSitePointTotal[i].maepljum2);
                                    pointData1.push(response.data.datas.dlSitePointTotal[i].maepljum6);
                                    pointData1.push(response.data.datas.dlSitePointTotal[i].maepljum4);
                                    pointData1.push(response.data.datas.dlSitePointTotal[i].maepljum3);

                                    // eval("pointData" + (i+1) + "= pointData");
                                    // pointData  = []
                                } else {
                                    /* 현장 1건만 수신될 경우*/
                                    // this.chartData.PQImySite12.mySiteCnstSite[0] = response.data.datas.dlSitePointTotal[i].totalpoint;
                                    // this.chartData.PQImySite12.mySiteCnstSite[1] = response.data.datas.dlSitePointTotal[i].maepljum1;
                                    // this.chartData.PQImySite12.mySiteCnstSite[2] = response.data.datas.dlSitePointTotal[i].maepljum2;
                                    // this.chartData.PQImySite12.mySiteCnstSite[3] = response.data.datas.dlSitePointTotal[i].maepljum6;
                                    // this.chartData.PQImySite12.mySiteCnstSite[4] = response.data.datas.dlSitePointTotal[i].maepljum4;
                                    // this.chartData.PQImySite12.mySiteCnstSite[5] = response.data.datas.dlSitePointTotal[i].maepljum3;

                                    /* 현장 여러건 수신될 경우*/
                                    maepljum0 += Number(response.data.datas.dlSitePointTotal[i].totalpoint);
                                    maepljum1 += Number(response.data.datas.dlSitePointTotal[i].maepljum1);
                                    maepljum2 += Number(response.data.datas.dlSitePointTotal[i].maepljum2);
                                    maepljum6 += Number(response.data.datas.dlSitePointTotal[i].maepljum6);
                                    maepljum4 += Number(response.data.datas.dlSitePointTotal[i].maepljum4);
                                    maepljum3 += Number(response.data.datas.dlSitePointTotal[i].maepljum3);

                                    siteCnt++;
                                }
                            }

                            if(siteCnt == 0) siteCnt = 1;

                             /* 전체 평균점수 제외 */
                            pointData2.push((maepljum1 / siteCnt).toFixed(2));
                            pointData2.push((maepljum2 / siteCnt).toFixed(2));
                            pointData2.push((maepljum6 / siteCnt).toFixed(2));
                            pointData2.push((maepljum0 / siteCnt).toFixed(2));
                            pointData2.push((maepljum3 / siteCnt).toFixed(2));

                            this.chartData.PQImySite11.mySiteAllsite  = pointData1;
                            this.chartData.PQImySite11.mySiteCnstSite = pointData2;

                            // this.PQIMySitePointRadarChartData.labels           = this.chartData.PQImySite11.mySiteLabl;
                            this.PQIMySitePointRadarChartData.datasets[0].data = this.chartData.PQImySite11.mySiteAllsite;
                            this.PQIMySitePointRadarChartData.datasets[1].data = this.chartData.PQImySite11.mySiteCnstSite;

                            pointData3.push((maepljum0 / siteCnt).toFixed(2));
                            pointData3.push((maepljum1 / siteCnt).toFixed(2));
                            pointData3.push((maepljum2 / siteCnt).toFixed(2));
                            pointData3.push((maepljum6 / siteCnt).toFixed(2));
                            pointData3.push((maepljum4 / siteCnt).toFixed(2));
                            pointData3.push((maepljum3 / siteCnt).toFixed(2));

                            this.chartData.PQImySite12.mySiteCnstSite = pointData3;

                            // this.PQIMySiteBarChartData.labels             = this.chartData.PQImySite12.mySiteLabl;
                            this.PQIMySiteBarChartData.datasets[0].data   = this.chartData.PQImySite12.mySiteCnstSite;


                            let radData   = []; 
                            let radData1  = []; let radData2  = [];

                            let siteData  = [];
                            let siteData1 = []; let siteData2 = []; 

                            for(let i=0; i < response.data.datas.dlBussHeadSite.length; i++) {
                                radData.push(response.data.datas.dlBussHeadSite[i].maepljum1);
                                radData.push(response.data.datas.dlBussHeadSite[i].maepljum2);
                                radData.push(response.data.datas.dlBussHeadSite[i].maepljum6);
                                radData.push(response.data.datas.dlBussHeadSite[i].maepljum4);
                                radData.push(response.data.datas.dlBussHeadSite[i].maepljum3);

                                eval("radData" + (i+1) + "= radData");

                                siteData.push(response.data.datas.dlBussHeadSite[i].totalpoint);
                                siteData.push(response.data.datas.dlBussHeadSite[i].maepljum1);
                                siteData.push(response.data.datas.dlBussHeadSite[i].maepljum2);
                                siteData.push(response.data.datas.dlBussHeadSite[i].maepljum6);
                                siteData.push(response.data.datas.dlBussHeadSite[i].maepljum4);
                                siteData.push(response.data.datas.dlBussHeadSite[i].maepljum3);

                                eval("siteData" + (i+1) + "= siteData");

                                siteData  = []
                                radData   = []
                            }

                            this.chartData.PQImySite21.mySiteAllsite  = radData1;
                            this.chartData.PQImySite21.mySiteCnstSite = radData2;

                            // this.PQIMySiteAvgRadarChartData.labels           = this.chartData.PQImySite21.mySiteLabl;
                            this.PQIMySiteAvgRadarChartData.datasets[0].data = this.chartData.PQImySite21.mySiteAllsite;
                            this.PQIMySiteAvgRadarChartData.datasets[1].data = this.chartData.PQImySite21.mySiteCnstSite;

                            this.chartData.PQImySite22.mySiteAllsite  = siteData1;
                            this.chartData.PQImySite22.mySiteCnstSite = siteData2;

                            // this.PQIMySiteGroupChartData.labels           = this.chartData.PQImySite22.mySiteLabl;
                            this.PQIMySiteGroupChartData.datasets[0].data = this.chartData.PQImySite22.mySiteAllsite;
                            this.PQIMySiteGroupChartData.datasets[1].data = this.chartData.PQImySite22.mySiteCnstSite;

                            let prcsRate = 0;  let totlSum = 0; let fixedSum = 0; let errorSum = 0; 
                            for(let i=0; i < response.data.datas.dlSitePoutMeas.length; i++) {
                                totlSum  += Number(response.data.datas.dlSitePoutMeas[i].totalCnt);
                                fixedSum += Number(response.data.datas.dlSitePoutMeas[i].fixedCnt);
                                errorSum += Number(response.data.datas.dlSitePoutMeas[i].errorCnt);

                                // this.chartData.PQImySite31.mySiteLabl.push(response.data.datas.dlSitePoutMeas[i].gongjongNm);
                                // /* 조치율 표시를 위해 계산식 적용 */
                                // prcsRate = (100 - Number(response.data.datas.dlSitePoutMeas[i].notyetRate)).toFixed(2);
                                // this.chartData.PQImySite31.mySiteRate.push(prcsRate);
                            }

                            this.chartData.PQImySite31.mySiteLabl.push("조치완료");
                            this.chartData.PQImySite31.mySiteLabl.push("미조치");
                            if(errorSum > 0){
                                prcsRate = ((fixedSum / totlSum) * 100).toFixed(2);
                            } else {
                                prcsRate = 100;
                            }
                            this.chartData.PQImySite31.mySiteRate.push(prcsRate);
                            this.chartData.PQImySite31.mySiteRate.push((100 - prcsRate).toFixed(2));

                            this.PQIMySitePieChartData.labels             = this.chartData.PQImySite31.mySiteLabl;
                            this.PQIMySitePieChartData.datasets[0].data   = this.chartData.PQImySite31.mySiteRate;

                            for(let i=0; i < response.data.datas.dlSitePoutMeas.length; i++) {
                                this.chartData.PQImySite32.mySiteLabl.push(response.data.datas.dlSitePoutMeas[i].gongjongNm);
                                this.chartData.PQImySite32.mySiteEvalClose.push(response.data.datas.dlSitePoutMeas[i].fixedCnt);
                                this.chartData.PQImySite32.mySiteEvalOpen.push(response.data.datas.dlSitePoutMeas[i].errorCnt);
                            }

                            this.PQIMySiteStackChartData.labels           = this.chartData.PQImySite32.mySiteLabl;
                            this.PQIMySiteStackChartData.datasets[0].data = this.chartData.PQImySite32.mySiteEvalClose;
                            this.PQIMySiteStackChartData.datasets[1].data = this.chartData.PQImySite32.mySiteEvalOpen;


                            this.$refs.PQIMySitePointRadarChart.renderChartData();
                            this.$refs.PQIMySiteBarChart.renderChartData();
                            this.$refs.PQIMySiteAvgRadarChart.renderChartData();
                            this.$refs.PQIMySiteGroupChart.renderChartData();
                            this.$refs.PQIMySitePieChart.renderChartData();
                            this.$refs.PQIMySiteStackChart.renderChartData();
                        });
            },

           fn_pqiHecSite : async function(){
                this.fn_initGrodHead();

                this.fn_clearChart("H");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/pqi/pqiHecSiteInfo/list';
                let param = {
                    ...this.search.hecSite,
                    searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    searchProjectId: this.$store.getters['auth/getProjectId'],
                    searchBaseCd: this.$store.getters['auth/getBaseType'],
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.PQIhecSiteGrid1.data.loadSearchData({
                                data: response.data.datas.dlSiteBussAvg,
                            });
                            this.PQIhecSiteGrid2.data.loadSearchData({
                                data: response.data.datas.dlYearEvalAnly,
                            });
                            this.PQIhecSiteGrid3.data.loadSearchData({
                                data: response.data.datas.dlYearBussHead,
                            });
                            this.PQIhecSiteGrid4.data.loadSearchData({
                                data: response.data.datas.dlYearTypeChem,
                            });
                            this.PQIhecSiteGrid5.data.loadSearchData({
                                data: response.data.datas.dlYearTypeElec,
                            });
                            this.PQIhecSiteGrid6.data.loadSearchData({
                                data: response.data.datas.dlYearTypeInfr,
                            });
                            this.PQIhecSiteGrid7.data.loadSearchData({
                                data: response.data.datas.dlYearTypeBild,
                            });
                            this.PQIhecSiteGrid8.data.loadSearchData({
                                data: response.data.datas.dlSiteBussType,
                            });
                            this.PQIhecSiteGrid9.data.loadSearchData({
                                data: response.data.datas.dlMatrPoutMeas,
                            });

                            this.PQIhecSiteGrid3.data.reload();
                            this.PQIhecSiteGrid4.data.reload();
                            this.PQIhecSiteGrid5.data.reload();
                            this.PQIhecSiteGrid6.data.reload();
                            this.PQIhecSiteGrid7.data.reload();

                            // console.log(" Hec Site Data ************* %o", response.data.datas);

                            // for(let i=0; i < response.data.datas.dlSiteBussAvg.length; i++) {
                            //     this.chartData.PQIhecSite11.hecSiteLabl.push(response.data.datas.dlSiteBussAvg[i].baseNm);
                            //     this.chartData.PQIhecSite11.hecSiteType.push(response.data.datas.dlSiteBussAvg[i].average);
                            // }
 
                            let sumS = 0; let sumA = 0; let sumB = 0; let sumC = 0; let sumD = 0;
                            for(let i=0; i < response.data.datas.dlSiteBussAvg.length; i++) {
                                sumS += Number(response.data.datas.dlSiteBussAvg[i].pointS);
                                sumA += Number(response.data.datas.dlSiteBussAvg[i].pointA);
                                sumB += Number(response.data.datas.dlSiteBussAvg[i].pointB);
                                sumC += Number(response.data.datas.dlSiteBussAvg[i].pointC);
                                sumD += Number(response.data.datas.dlSiteBussAvg[i].pointD);
                            }

                            this.chartData.PQIhecSite11.hecSiteType[0] = sumS;
                            this.chartData.PQIhecSite11.hecSiteType[1] = sumA;
                            this.chartData.PQIhecSite11.hecSiteType[2] = sumB;
                            this.chartData.PQIhecSite11.hecSiteType[3] = sumC;
                            this.chartData.PQIhecSite11.hecSiteType[4] = sumD;

                            // this.PQIHecSitePieChartData.labels           = this.chartData.PQIhecSite11.hecSiteLabl;
                            this.PQIHecSitePieChartData.datasets[0].data = this.chartData.PQIhecSite11.hecSiteType;

                            for(let i=0; i < response.data.datas.dlSiteBussAvg.length; i++) {
                                this.chartData.PQIhecSite12.hecSiteLabl.push(response.data.datas.dlSiteBussAvg[i].baseNm);
                                this.chartData.PQIhecSite12.hecSiteType.push(response.data.datas.dlSiteBussAvg[i].average);
                            }

                            this.PQIHecSiteOperBarChartData.labels            = this.chartData.PQIhecSite12.hecSiteLabl;
                            this.PQIHecSiteOperBarChartData.datasets[0].data  = this.chartData.PQIhecSite12.hecSiteType;

                            // for(let i=0; i < response.data.datas.dlYearEvalAnly.length; i++) {
                            //     this.chartData.PQIhecSite21.hecSiteLabl.push(response.data.datas.dlYearEvalAnly[i].baseNm);
                            //     this.chartData.PQIhecSite21.hecSiteCnstType1.push(response.data.datas.dlYearEvalAnly[i].maepljum1);
                            //     this.chartData.PQIhecSite21.hecSiteCnstType2.push(response.data.datas.dlYearEvalAnly[i].maepljum2);
                            //     this.chartData.PQIhecSite21.hecSiteCnstType3.push(response.data.datas.dlYearEvalAnly[i].maepljum6);
                            //     this.chartData.PQIhecSite21.hecSiteCnstType4.push(response.data.datas.dlYearEvalAnly[i].maepljum4);
                            //     this.chartData.PQIhecSite21.hecSiteCnstType5.push(response.data.datas.dlYearEvalAnly[i].maepljum3);
                            // }

                            let baseData  = [];
                            let baseData1 = []; let baseData2 = []; let baseData3 = []; let baseData4 = []; let baseData5 = [];
                            for(let i=0; i < response.data.datas.dlYearEvalAnly.length; i++) {
                                // this.chartData.PQIhecSite21.hecSiteLabl.push(response.data.datas.dlYearEvalAnly[i].baseNm);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum1);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum2);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum6);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum4);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum3);

                                eval("baseData" + (i+1) + "= baseData");
                                baseData  = []
                            }
                            this.chartData.PQIhecSite21.hecSiteCnstType1 = baseData5;
                            this.chartData.PQIhecSite21.hecSiteCnstType2 = baseData1;
                            this.chartData.PQIhecSite21.hecSiteCnstType3 = baseData2;
                            this.chartData.PQIhecSite21.hecSiteCnstType4 = baseData3;
                            this.chartData.PQIhecSite21.hecSiteCnstType5 = baseData4;


                            // this.PQIHecSiteRadarChartData.labels              = this.chartData.PQIhecSite21.hecSiteLabl;
                            this.PQIHecSiteRadarChartData.datasets[0].data    = this.chartData.PQIhecSite21.hecSiteCnstType1;
                            this.PQIHecSiteRadarChartData.datasets[1].data    = this.chartData.PQIhecSite21.hecSiteCnstType2;
                            this.PQIHecSiteRadarChartData.datasets[2].data    = this.chartData.PQIhecSite21.hecSiteCnstType3;
                            this.PQIHecSiteRadarChartData.datasets[3].data    = this.chartData.PQIhecSite21.hecSiteCnstType4;
                            this.PQIHecSiteRadarChartData.datasets[4].data    = this.chartData.PQIhecSite21.hecSiteCnstType5;

                            // for(let i=0; i < response.data.datas.dlYearEvalAnly.length; i++) {
                            //     this.chartData.PQIhecSite22.hecSiteLabl.push(response.data.datas.dlYearEvalAnly[i].baseNm);
                            //     this.chartData.PQIhecSite22.hecSiteCnstType1.push(response.data.datas.dlYearEvalAnly[i].maepljum1);
                            //     this.chartData.PQIhecSite22.hecSiteCnstType2.push(response.data.datas.dlYearEvalAnly[i].maepljum2);
                            //     this.chartData.PQIhecSite22.hecSiteCnstType3.push(response.data.datas.dlYearEvalAnly[i].maepljum6);
                            //     this.chartData.PQIhecSite22.hecSiteCnstType4.push(response.data.datas.dlYearEvalAnly[i].maepljum4);
                            //     this.chartData.PQIhecSite22.hecSiteCnstType5.push(response.data.datas.dlYearEvalAnly[i].maepljum3);
                            // }

                            for(let i=0; i < response.data.datas.dlYearEvalAnly.length; i++) {
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum1);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum2);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum6);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum4);
                                baseData.push(response.data.datas.dlYearEvalAnly[i].maepljum3);

                                eval("baseData" + (i+1) + "= baseData");
                                baseData  = []
                            }
                            this.chartData.PQIhecSite22.hecSiteCnstType1 = baseData5;
                            this.chartData.PQIhecSite22.hecSiteCnstType2 = baseData1;
                            this.chartData.PQIhecSite22.hecSiteCnstType3 = baseData2;
                            this.chartData.PQIhecSite22.hecSiteCnstType4 = baseData3;
                            this.chartData.PQIhecSite22.hecSiteCnstType5 = baseData4;

                            // this.PQIHecSiteGroupChartData.labels              = this.chartData.PQIhecSite22.hecSiteLabl;
                            this.PQIHecSiteGroupChartData.datasets[0].data    = this.chartData.PQIhecSite22.hecSiteCnstType1;
                            this.PQIHecSiteGroupChartData.datasets[1].data    = this.chartData.PQIhecSite22.hecSiteCnstType2;
                            this.PQIHecSiteGroupChartData.datasets[2].data    = this.chartData.PQIhecSite22.hecSiteCnstType3;
                            this.PQIHecSiteGroupChartData.datasets[3].data    = this.chartData.PQIhecSite22.hecSiteCnstType4;
                            this.PQIHecSiteGroupChartData.datasets[4].data    = this.chartData.PQIhecSite22.hecSiteCnstType5;

                            let labelYear = '';

                            if(response.data.datas.dlYearBussHead !== null && response.data.datas.dlYearBussHead.length > 0){
                                for(let i=0; i < 5; i++) {
                                    labelYear = (Number(response.data.datas.dlYearBussHead[0].standardYear) + i) + '년';
                                    this.chartData.PQIhecSite31.hecSiteLabl.push(labelYear);
                                }
                            }

                            // for(let i=0; i < response.data.datas.dlYearBussHead.length; i++) {
                            //     this.chartData.PQIhecSite31.hecSiteLabl.push(response.data.datas.dlYearBussHead[i].maepljumNm);
                            //     this.chartData.PQIhecSite31.hecSiteCnstType1.push(response.data.datas.dlYearBussHead[i].before4);
                            //     this.chartData.PQIhecSite31.hecSiteCnstType2.push(response.data.datas.dlYearBussHead[i].before3);
                            //     this.chartData.PQIhecSite31.hecSiteCnstType3.push(response.data.datas.dlYearBussHead[i].before2);
                            //     this.chartData.PQIhecSite31.hecSiteCnstType4.push(response.data.datas.dlYearBussHead[i].before1);
                            //     this.chartData.PQIhecSite31.hecSiteCnstType5.push(response.data.datas.dlYearBussHead[i].before0);
                            // }

                            let yearData  = [];
                            let yearData1 = []; let yearData2 = []; let yearData3 = []; let yearData4 = []; let yearData5 = [];

                            for(let i=0; i < response.data.datas.dlYearBussHead.length; i++) {
                                yearData.push(response.data.datas.dlYearBussHead[i].before4pnt);
                                yearData.push(response.data.datas.dlYearBussHead[i].before3pnt);
                                yearData.push(response.data.datas.dlYearBussHead[i].before2pnt);
                                yearData.push(response.data.datas.dlYearBussHead[i].before1pnt);
                                yearData.push(response.data.datas.dlYearBussHead[i].before0pnt);

                                eval("yearData" + (i+1) + "= yearData");
                                yearData  = []
                            }
                            this.chartData.PQIhecSite31.hecSiteCnstType1 = yearData5;
                            this.chartData.PQIhecSite31.hecSiteCnstType2 = yearData1;
                            this.chartData.PQIhecSite31.hecSiteCnstType3 = yearData2;
                            this.chartData.PQIhecSite31.hecSiteCnstType4 = yearData3;
                            this.chartData.PQIhecSite31.hecSiteCnstType5 = yearData4;

                            this.PQIHecSiteOperLineChartData.labels           = this.chartData.PQIhecSite31.hecSiteLabl;
                            this.PQIHecSiteOperLineChartData.datasets[0].data = this.chartData.PQIhecSite31.hecSiteCnstType1;
                            this.PQIHecSiteOperLineChartData.datasets[1].data = this.chartData.PQIhecSite31.hecSiteCnstType2;
                            this.PQIHecSiteOperLineChartData.datasets[2].data = this.chartData.PQIhecSite31.hecSiteCnstType3;
                            this.PQIHecSiteOperLineChartData.datasets[3].data = this.chartData.PQIhecSite31.hecSiteCnstType4;
                            this.PQIHecSiteOperLineChartData.datasets[4].data = this.chartData.PQIhecSite31.hecSiteCnstType5;

                            if(response.data.datas.dlYearTypeChem !== null && response.data.datas.dlYearTypeChem.length > 0){
                                for(let i=0; i < 5; i++) {
                                    labelYear = (Number(response.data.datas.dlYearTypeChem[0].standardYear) + i) + '년';
                                    this.chartData.PQIhecSite32.hecSiteLabl.push(labelYear);
                                }
                            }
                            // for(let i=0; i < response.data.datas.dlYearTypeChem.length; i++) {
                            //     this.chartData.PQIhecSite32.hecSiteLabl.push(response.data.datas.dlYearTypeChem[i].maepljumNm);
                            //     this.chartData.PQIhecSite32.hecSiteCnstType1.push(response.data.datas.dlYearTypeChem[i].before4);
                            //     this.chartData.PQIhecSite32.hecSiteCnstType2.push(response.data.datas.dlYearTypeChem[i].before3);
                            //     this.chartData.PQIhecSite32.hecSiteCnstType3.push(response.data.datas.dlYearTypeChem[i].before2);
                            //     this.chartData.PQIhecSite32.hecSiteCnstType4.push(response.data.datas.dlYearTypeChem[i].before1);
                            //     this.chartData.PQIhecSite32.hecSiteCnstType5.push(response.data.datas.dlYearTypeChem[i].before0);
                            // }

                            for(let i=0; i < response.data.datas.dlYearTypeChem.length; i++) {
                                yearData.push(response.data.datas.dlYearTypeChem[i].before4);
                                yearData.push(response.data.datas.dlYearTypeChem[i].before3);
                                yearData.push(response.data.datas.dlYearTypeChem[i].before2);
                                yearData.push(response.data.datas.dlYearTypeChem[i].before1);
                                yearData.push(response.data.datas.dlYearTypeChem[i].before0);

                                eval("yearData" + (i+1) + "= yearData");
                                yearData  = []
                            }
                            this.chartData.PQIhecSite32.hecSiteCnstType1 = yearData1;
                            this.chartData.PQIhecSite32.hecSiteCnstType2 = yearData2;
                            this.chartData.PQIhecSite32.hecSiteCnstType3 = yearData3;
                            this.chartData.PQIhecSite32.hecSiteCnstType4 = yearData4;
                            this.chartData.PQIhecSite32.hecSiteCnstType5 = yearData5;

                            this.PQIHecSiteChemLineChartData.labels           = this.chartData.PQIhecSite32.hecSiteLabl;
                            this.PQIHecSiteChemLineChartData.datasets[0].data = this.chartData.PQIhecSite32.hecSiteCnstType1;
                            this.PQIHecSiteChemLineChartData.datasets[1].data = this.chartData.PQIhecSite32.hecSiteCnstType2;
                            this.PQIHecSiteChemLineChartData.datasets[2].data = this.chartData.PQIhecSite32.hecSiteCnstType3;
                            this.PQIHecSiteChemLineChartData.datasets[3].data = this.chartData.PQIhecSite32.hecSiteCnstType4;
                            this.PQIHecSiteChemLineChartData.datasets[4].data = this.chartData.PQIhecSite32.hecSiteCnstType5;
                            if(response.data.datas.dlYearTypeElec !== null && response.data.datas.dlYearTypeElec.length > 0){
                                for(let i=0; i < 5; i++) {
                                    labelYear = (Number(response.data.datas.dlYearTypeElec[0].standardYear) + i) + '년';
                                    this.chartData.PQIhecSite33.hecSiteLabl.push(labelYear);
                                }
                            }
                            // for(let i=0; i < response.data.datas.dlYearTypeElec.length; i++) {
                            //     this.chartData.PQIhecSite33.hecSiteLabl.push(response.data.datas.dlYearTypeElec[i].maepljumNm);
                            //     this.chartData.PQIhecSite33.hecSiteCnstType1.push(response.data.datas.dlYearTypeElec[i].before4);
                            //     this.chartData.PQIhecSite33.hecSiteCnstType2.push(response.data.datas.dlYearTypeElec[i].before3);
                            //     this.chartData.PQIhecSite33.hecSiteCnstType3.push(response.data.datas.dlYearTypeElec[i].before2);
                            //     this.chartData.PQIhecSite33.hecSiteCnstType4.push(response.data.datas.dlYearTypeElec[i].before1);
                            //     this.chartData.PQIhecSite33.hecSiteCnstType5.push(response.data.datas.dlYearTypeElec[i].before0);
                            // }

                            for(let i=0; i < response.data.datas.dlYearTypeElec.length; i++) {
                                yearData.push(response.data.datas.dlYearTypeElec[i].before4);
                                yearData.push(response.data.datas.dlYearTypeElec[i].before3);
                                yearData.push(response.data.datas.dlYearTypeElec[i].before2);
                                yearData.push(response.data.datas.dlYearTypeElec[i].before1);
                                yearData.push(response.data.datas.dlYearTypeElec[i].before0);

                                eval("yearData" + (i+1) + "= yearData");
                                yearData  = []
                            }
                            this.chartData.PQIhecSite33.hecSiteCnstType1 = yearData1;
                            this.chartData.PQIhecSite33.hecSiteCnstType2 = yearData2;
                            this.chartData.PQIhecSite33.hecSiteCnstType3 = yearData3;
                            this.chartData.PQIhecSite33.hecSiteCnstType4 = yearData4;
                            this.chartData.PQIhecSite33.hecSiteCnstType5 = yearData5;

                            this.PQIHecSiteElecLineChartData.labels           = this.chartData.PQIhecSite33.hecSiteLabl;
                            this.PQIHecSiteElecLineChartData.datasets[0].data = this.chartData.PQIhecSite33.hecSiteCnstType1;
                            this.PQIHecSiteElecLineChartData.datasets[1].data = this.chartData.PQIhecSite33.hecSiteCnstType2;
                            this.PQIHecSiteElecLineChartData.datasets[2].data = this.chartData.PQIhecSite33.hecSiteCnstType3;
                            this.PQIHecSiteElecLineChartData.datasets[3].data = this.chartData.PQIhecSite33.hecSiteCnstType4;
                            this.PQIHecSiteElecLineChartData.datasets[4].data = this.chartData.PQIhecSite33.hecSiteCnstType5;

                            if(response.data.datas.dlYearTypeInfr !== null && response.data.datas.dlYearTypeInfr.length > 0){
                                for(let i=0; i < 5; i++) {
                                    labelYear = (Number(response.data.datas.dlYearTypeInfr[0].standardYear) + i) + '년';
                                    this.chartData.PQIhecSite34.hecSiteLabl.push(labelYear);
                                }
                            }
                            // for(let i=0; i < response.data.datas.dlYearTypeInfr.length; i++) {
                            //     this.chartData.PQIhecSite34.hecSiteLabl.push(response.data.datas.dlYearTypeInfr[i].maepljumNm);
                            //     this.chartData.PQIhecSite34.hecSiteCnstType1.push(response.data.datas.dlYearTypeInfr[i].before4);
                            //     this.chartData.PQIhecSite34.hecSiteCnstType2.push(response.data.datas.dlYearTypeInfr[i].before3);
                            //     this.chartData.PQIhecSite34.hecSiteCnstType3.push(response.data.datas.dlYearTypeInfr[i].before2);
                            //     this.chartData.PQIhecSite34.hecSiteCnstType4.push(response.data.datas.dlYearTypeInfr[i].before1);
                            //     this.chartData.PQIhecSite34.hecSiteCnstType5.push(response.data.datas.dlYearTypeInfr[i].before0);
                            // }
                            
                            for(let i=0; i < response.data.datas.dlYearTypeInfr.length; i++) {
                                yearData.push(response.data.datas.dlYearTypeInfr[i].before4);
                                yearData.push(response.data.datas.dlYearTypeInfr[i].before3);
                                yearData.push(response.data.datas.dlYearTypeInfr[i].before2);
                                yearData.push(response.data.datas.dlYearTypeInfr[i].before1);
                                yearData.push(response.data.datas.dlYearTypeInfr[i].before0);

                                eval("yearData" + (i+1) + "= yearData");
                                yearData  = []
                            }
                            this.chartData.PQIhecSite34.hecSiteCnstType1 = yearData1;
                            this.chartData.PQIhecSite34.hecSiteCnstType2 = yearData2;
                            this.chartData.PQIhecSite34.hecSiteCnstType3 = yearData3;
                            this.chartData.PQIhecSite34.hecSiteCnstType4 = yearData4;
                            this.chartData.PQIhecSite34.hecSiteCnstType5 = yearData5;
                            
                            this.PQIHecSiteInfrLineChartData.labels           = this.chartData.PQIhecSite34.hecSiteLabl;
                            this.PQIHecSiteInfrLineChartData.datasets[0].data = this.chartData.PQIhecSite34.hecSiteCnstType1;
                            this.PQIHecSiteInfrLineChartData.datasets[1].data = this.chartData.PQIhecSite34.hecSiteCnstType2;
                            this.PQIHecSiteInfrLineChartData.datasets[2].data = this.chartData.PQIhecSite34.hecSiteCnstType3;
                            this.PQIHecSiteInfrLineChartData.datasets[3].data = this.chartData.PQIhecSite34.hecSiteCnstType4;
                            this.PQIHecSiteInfrLineChartData.datasets[4].data = this.chartData.PQIhecSite34.hecSiteCnstType5;

                            if(response.data.datas.dlYearTypeBild !== null && response.data.datas.dlYearTypeBild.length > 0){
                                for(let i=0; i < 5; i++) {
                                    labelYear = (Number(response.data.datas.dlYearTypeBild[0].standardYear) + i) + '년';
                                    this.chartData.PQIhecSite35.hecSiteLabl.push(labelYear);
                                }
                            }
                            // for(let i=0; i < response.data.datas.dlYearTypeBild.length; i++) {
                            //     this.chartData.PQIhecSite35.hecSiteLabl.push(response.data.datas.dlYearTypeBild[i].maepljumNm);
                            //     this.chartData.PQIhecSite35.hecSiteCnstType1.push(response.data.datas.dlYearTypeBild[i].before4);
                            //     this.chartData.PQIhecSite35.hecSiteCnstType2.push(response.data.datas.dlYearTypeBild[i].before3);
                            //     this.chartData.PQIhecSite35.hecSiteCnstType3.push(response.data.datas.dlYearTypeBild[i].before2);
                            //     this.chartData.PQIhecSite35.hecSiteCnstType4.push(response.data.datas.dlYearTypeBild[i].before1);
                            //     this.chartData.PQIhecSite35.hecSiteCnstType5.push(response.data.datas.dlYearTypeBild[i].before0);
                            // }

                            for(let i=0; i < response.data.datas.dlYearTypeBild.length; i++) {
                                yearData.push(response.data.datas.dlYearTypeBild[i].before4);
                                yearData.push(response.data.datas.dlYearTypeBild[i].before3);
                                yearData.push(response.data.datas.dlYearTypeBild[i].before2);
                                yearData.push(response.data.datas.dlYearTypeBild[i].before1);
                                yearData.push(response.data.datas.dlYearTypeBild[i].before0);

                                eval("yearData" + (i+1) + "= yearData");
                                yearData  = []
                            }
                            this.chartData.PQIhecSite35.hecSiteCnstType1 = yearData1;
                            this.chartData.PQIhecSite35.hecSiteCnstType2 = yearData2;
                            this.chartData.PQIhecSite35.hecSiteCnstType3 = yearData3;
                            this.chartData.PQIhecSite35.hecSiteCnstType4 = yearData4;
                            this.chartData.PQIhecSite35.hecSiteCnstType5 = yearData5;

                            this.PQIHecSiteBildLineChartData.labels           = this.chartData.PQIhecSite35.hecSiteLabl;
                            this.PQIHecSiteBildLineChartData.datasets[0].data = this.chartData.PQIhecSite35.hecSiteCnstType1;
                            this.PQIHecSiteBildLineChartData.datasets[1].data = this.chartData.PQIhecSite35.hecSiteCnstType2;
                            this.PQIHecSiteBildLineChartData.datasets[2].data = this.chartData.PQIhecSite35.hecSiteCnstType3;
                            this.PQIHecSiteBildLineChartData.datasets[3].data = this.chartData.PQIhecSite35.hecSiteCnstType4;
                            this.PQIHecSiteBildLineChartData.datasets[4].data = this.chartData.PQIhecSite35.hecSiteCnstType5;

                            let evgSum = 0;
                            for(let i=0; i < response.data.datas.dlSiteBussType.length; i++) {
                                evgSum += Number(response.data.datas.dlSiteBussType[i].average);

                                this.chartData.PQIhecSite41.hecSiteLabl.push(response.data.datas.dlSiteBussType[i].gongsaTypeNm);
                                this.chartData.PQIhecSite41.hecSiteTypeAvg.push(response.data.datas.dlSiteBussType[i].average);
                            }
                            this.chartData.PQIhecSite41.hecSiteLabl.push("전사");
                            if(response.data.datas.dlSiteBussType.length > 0){
                                this.chartData.PQIhecSite41.hecSiteTypeAvg.push((evgSum / response.data.datas.dlSiteBussType.length).toFixed(2));
                            } else {
                                this.chartData.PQIhecSite41.hecSiteTypeAvg.push(evgSum);
                            }

                            this.PQIHecSiteBsnsBarChartData.labels            = this.chartData.PQIhecSite41.hecSiteLabl;
                            this.PQIHecSiteBsnsBarChartData.datasets[0].data  = this.chartData.PQIhecSite41.hecSiteTypeAvg;

                            let fixedSum = 0; let errorSum = 0; 
                            for(let i=0; i < response.data.datas.dlMatrPoutMeas.length; i++) {
                                fixedSum += Number(response.data.datas.dlMatrPoutMeas[i].fixedCnt);
                                errorSum += Number(response.data.datas.dlMatrPoutMeas[i].errorCnt);

                                this.chartData.PQIhecSite42.hecSiteLabl.push(response.data.datas.dlMatrPoutMeas[i].baseNm);
                                this.chartData.PQIhecSite42.hecSiteClose.push(response.data.datas.dlMatrPoutMeas[i].fixedCnt);
                                this.chartData.PQIhecSite42.hecSiteOpen.push(response.data.datas.dlMatrPoutMeas[i].errorCnt);
                            }
                            this.chartData.PQIhecSite42.hecSiteLabl.push("전사");
                            this.chartData.PQIhecSite42.hecSiteClose.push(fixedSum);
                            this.chartData.PQIhecSite42.hecSiteOpen.push(errorSum);

                            this.PQIHecSiteStackChartData.labels              = this.chartData.PQIhecSite42.hecSiteLabl;
                            this.PQIHecSiteStackChartData.datasets[0].data    = this.chartData.PQIhecSite42.hecSiteClose;
                            this.PQIHecSiteStackChartData.datasets[1].data    = this.chartData.PQIhecSite42.hecSiteOpen;

                            this.$refs.PQIHecSitePieChart.renderChartData();
                            this.$refs.PQIHecSiteOperBarChart.renderChartData();
                            this.$refs.PQIHecSiteRadarChart.renderChartData();
                            this.$refs.PQIHecSiteGroupChart.renderChartData();
                            this.$refs.PQIHecSiteOperLineChart.renderChartData();
                            this.$refs.PQIHecSiteChemLineChart.renderChartData();
                            this.$refs.PQIHecSiteElecLineChart.renderChartData();
                            this.$refs.PQIHecSiteInfrLineChart.renderChartData();
                            this.$refs.PQIHecSiteBildLineChart.renderChartData();
                            this.$refs.PQIHecSiteBsnsBarChart.renderChartData();
                            this.$refs.PQIHecSiteStackChart.renderChartData();
                        });
            },

            setImportance: function(a, b) { // 비중 data set
                let copy_delay = _.cloneDeep(b); // 지연 건수
                let copy_publish = _.cloneDeep(a); // 발행 건수

                this.data_importance = [];
                copy_publish.map((item, i) => {
                    this.data_importance.push(
                        ( copy_delay[i]/(copy_publish[i] + copy_delay[i]) * 100 ).toFixed(2)
                    );
                }); 
                return this.data_importance;
            },
            dataTotal: function(chartData, chartData2, idx) { // legend click 시 전체 건수의 datalabels 변경
                let copy_delay = _.cloneDeep(chartData.data);
                let copy_publish = _.cloneDeep(chartData2.data); 
                if(chartData.legendstate === true) {
                    copy_delay[idx] = 0;
                }
                if(chartData2.legendstate === true) {
                    copy_publish[idx] = 0;
                }

                return Number(copy_delay[idx]) + Number(copy_publish[idx]);
            },

            fn_myStackChart: function () {
                let data_publish = this.data_publish;
                let data_delay = this.data_delay;
                
                this.PQIHecSiteStackChartData = {
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: '미조치',
                            data: data_delay,
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
                            label: '조치',
                            data: data_publish,
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
                            data: [0, 0, 0, 0, 0],
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
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ],
                }

                this.PQIHecSiteStackChartOptions = {
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
                                // max: 200
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

            fn_hecStackChart: function () {
                let data_publish = this.data_publish;
                let data_delay = this.data_delay;
                
                this.PQIMySiteStackChartData = {
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: '미조치',
                            data: data_delay,
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
                            label: '조치',
                            data: data_publish,
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
                            data: [0, 0, 0, 0, 0],
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
                                    return this.dataTotal(context.chart.data.datasets[0], context.chart.data.datasets[1], context.dataIndex);
                                },
                            },
                            legendstate: null, // legend display state
                        },
                    ],
                }

                this.PQIMySiteStackChartOptions = {
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
                                // max: 200
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
  height: 328px;
  border: 1px solid #DCDCDC;
}
</style>