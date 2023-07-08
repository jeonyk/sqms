<template>
    <div class="wrap">
        <div class="lnb_container on">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />
                <!-- <h2 class="sub_title">통계분석 > 교육훈련</h2> -->
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
                                <col width="3%">
                                <col width="20%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>기간</th>   
                                    <td>
                                        <!-- <select name="" id="mySiteYear" class="form_control size_sm" v-model="search.mySite.searchYear" v-on:change="fn_clearSearch('C')"> -->
                                        <select name="" id="mySiteYear" class="form_control size_sm" v-model="search.mySite.searchYear">
                                            <!-- <option value="" selected>선택</option> -->
                                            <option v-for="index in 20" :key="index" :value="advancedInfo.startYear - index + 2">
                                                {{advancedInfo.startYear - index + 2}}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('M')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_eduMySite()">검색</button>
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
                                        1. 교육실시현황
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('mySiteTotalGrid', '교육실시현황')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="mySiteEduSheetTable" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('mySiteTotalCntChart', '교육실시현황')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="mySiteTotalCntChart" :data="mySiteTotalCntChartData" :options="mySiteTotalCntOptions" class="barchart" ref="mySiteTotalCntChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        교육 유형별 현황
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('mySiteEduTypeChart', '교육 유형별 현황')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="mySiteEduTypeChart" :data="mySiteEduTypeChartData" :options="mySiteEduPieChartOptions" class="barchart" ref="mySiteEduTypeChart"></PieChart>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        교육 대상별 현황
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('mySiteEduTrgtChart', '교육 대상별 현황')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="mySiteEduTrgtChart" :data="mySiteEduTrgtChartData" :options="mySiteEduPieChartOptions" class="barchart" ref="mySiteEduTrgtChart"></PieChart>
                                    </div>
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
                                <col width="3%">
                                <col width="20%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>기간</th>   
                                    <td>
                                        <select name="" id="hecSiteYear" class="form_control size_sm" v-model="search.hecSite.searchYear">
                                            <!-- <option value="" selected>선택</option> -->
                                            <option v-for="index in 20" :key="index" :value="advancedInfo.startYear - index + 2">
                                                {{advancedInfo.startYear - index + 2}}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('H')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_eduHecSite()">검색</button>
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
                                        1. 교육실시현황
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('hecSiteTypeGrid', '교육실시현황')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="hecSiteTypeSheetTable" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <!-- <strong class="data_tit"></strong> -->
                                    <div class="table_data">
                                        <div class="move_box w50 pr10">
                                            <strong class="data_tit">
                                                <div class="fr">
                                                    <button
                                                        type="button"
                                                        class="btn btn_sm btn_darkblue"
                                                        @click="fn_chartToImage('hecSiteTotalChart', '교육실시현황')"
                                                    >
                                                        <b-icon icon="download" />
                                                        다운로드
                                                    </button>
                                                </div>
                                            </strong>
                                            <BarChart id="hecSiteTotalChart" :data="hecSiteTotalChartData" :options="hecSiteEduBarChartOptions" class="barchart" ref="hecSiteTotalChart"></BarChart>
                                        </div>
                                        <div class="move_box w50 pl10">
                                            <strong class="data_tit">
                                                <div class="fr">
                                                    <button
                                                        type="button"
                                                        class="btn btn_sm btn_darkblue"
                                                        @click="fn_chartToImage('hecSiteMonthChart', '교육실시현황')"
                                                    >
                                                        <b-icon icon="download" />
                                                        다운로드
                                                    </button>
                                                </div>
                                            </strong>
                                            <BarChart id="hecSiteMonthChart" :data="hecSiteMonthChartData" :options="hecSiteEduBarChartOptions" class="barchart" ref="hecSiteMonthChart"></BarChart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">2. 교육실시추이</strong>
                                    <strong class="data_subtit">
                                        현장 타입별
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('hecEduTypeGrid', '교육실시추이_현장타입별')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <div class="ib_wrap">
                                        <div id="hecEduTypeSheetTable" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit ir">2. 교육실시추이</strong>
                                    <strong class="data_subtit ir">
                                        현장 타입별
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('hecSiteMonthTypeChart', '교육실시추이_현장타입별')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="hecSiteMonthTypeChart" :data="hecSiteMonthTypeChartData" :options="hecSiteMonthTypeChartOptions" class="barchart" ref="hecSiteMonthTypeChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_data mt20">
                            <div id="eduTypeChart1" class="move_box w33">
                                <div class="move_box_inner">
                                    <strong class="data_tit">3. 교육 유형별 현황</strong>
                                    <strong class="data_subtit">
                                        교육 유형별 현황(전사)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('hecSiteEduTypeAllChart', '교육 유형별 현황(전사)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="hecSiteEduTypeAllChart" :data="hecSiteEduTypeAllChartData" :options="hecSiteEduTypeChartOptions" class="barchart" ref="hecSiteEduTypeAllChart"></PieChart>
                                    </div>
                                </div>
                            </div>
                            <div id="eduTypeChart2" class="move_box w33">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        교육 유형별 현황(건축)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('hecSiteEduTypeInfrChart', '교육 유형별 현황(건축)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="hecSiteEduTypeInfrChart" :data="hecSiteEduTypeInfrChartData" :options="hecSiteEduTypeChartOptions" class="barchart" ref="hecSiteEduTypeInfrChart"></PieChart>
                                    </div>
                                </div>
                            </div>
                            <div id="eduTypeChart3" class="move_box w33">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        교육 유형별 현황(인프라)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('hecSiteEduTypeBuldChart', '교육 유형별 현황(인프라)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="hecSiteEduTypeBuldChart" :data="hecSiteEduTypeBuldChartData" :options="hecSiteEduTypeChartOptions" class="barchart" ref="hecSiteEduTypeBuldChart"></PieChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="table_data mt20">
                            <div id="eduTrgtChart1"  class="move_box w33">
                                <div class="move_box_inner">
                                    <strong class="data_tit">3. 교육 대상자별</strong>
                                    <strong class="data_subtit">
                                        교육 대상자별 현황(전사)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('hecSiteEduTrgtAllChart', '교육 대상자별 현황(전사)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="hecSiteEduTrgtAllChart" :data="hecSiteEduTrgtAllChartData" :options="hecSiteEduTrgtChartOptions" class="barchart" ref="hecSiteEduTrgtAllChart"></PieChart>
                                    </div>
                                </div>
                            </div>
                            <div id="eduTrgtChart2" class="move_box w33">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        교육 대상자별 현황(건축)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('hecSiteEduTrgtInfrChart', '교육 대상자별 현황(건축)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="hecSiteEduTrgtInfrChart" :data="hecSiteEduTrgtInfrChartData" :options="hecSiteEduTrgtChartOptions" class="barchart" ref="hecSiteEduTrgtInfrChart"></PieChart>
                                    </div>
                                </div>
                            </div>
                            <div id="eduTrgtChart3" class="move_box w33">
                                <div class="move_box_inner">
                                    <strong class="data_subtit">
                                        교육 대상자별 현황(인프라)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('hecSiteEduTrgtBuldChart', '교육 대상자별 현황(인프라)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="hecSiteEduTrgtBuldChart" :data="hecSiteEduTrgtBuldChartData" :options="hecSiteEduTrgtChartOptions" class="barchart" ref="hecSiteEduTrgtBuldChart"></PieChart>
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

    import { MySiteEduStatusInfo, HecEduTypeCurentStatus, HecEduTrgtCurentStatus } from '@/pages/common/data/StatisticsList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import loader from '@ibsheet/loader'

    import PieChart from '@component/chart/PieChart.vue';
    import BarChart from '@component/chart/BarChart.vue';
    import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

    // import axios from 'axios'

    import _ from 'lodash'

    let SHEET_ID = ''; 
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();

    export default {
        name: 'EduTrainingStatsView',
        components: {
            Breadcrumb,
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
                mySiteTotalGrid  : {
                    data : null,
                    options : {},
                },
                hecSiteTypeGrid  : {
                    data : null,
                    options : {},
                },
                hecEduTypeGrid  : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    /* My Site */
                    mySiteTotl : {
                        mySiteMonth : [],
                        mySiteStatCnt: [],
                    },
                    mySiteType : {
                        mySiteEduKindNm : [],
                        mySiteEduCnt: [],
                    },
                    mySiteTrgt : {
                        mySiteEduTrgtNm : [],
                        mySiteEduCnt: [],
                    },

                    /* Hec Site */
                    hecSiteTotal : {
                        hecSiteTypeNm : [],
                        hecSiteTotaAvg: [],
                    },
                    hecSiteMonth : {
                        hecSiteTypeNm : [],
                        hecSiteMonthAvg: [],
                    },

                    hecSiteMonthType : {
                        hecSiteTypeNm: [],
                        hecSiteAllAvg: [],
                        hecSitecomAvg: [],
                        hecSiteGenAvg: [],
                        hecSiteFacAvg: [],
                        hecSiteInfAvg: [],
                    },

                    hecEduTypeAll : {
                        hecEduTypeNm: [],
                        hecEduTypeEduCnt: [],
                    },
                    hecEduTypeInfr : {
                        hecEduTypeNm: [],
                        hecEduTypeEduCnt: [],
                    },
                    hecEduTypeBuld : {
                        hecEduTypeNm: [],
                        hecEduTypeEduCnt: [],
                    },

                    hecEduTrgtAll : {
                        hecEduTrgtNm: [],
                        hecEduTrgtEduCnt: [],
                    },
                    hecEduTrgtInfr : {
                        hecEduTrgtNm: [],
                        hecEduTrgtEduCnt: [],
                    },
                    hecEduTrgtBuld : {
                        hecEduTrgtNm: [],
                        hecEduTrgtEduCnt: [],
                    }
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
                    mngtType: [],
                    startYear: nowYear
                },

                mySiteTotalCntChartData: {
                    labels: [],
                    datasets: [
                        {
                            label: '교육건수',
                            data: [],
                            backgroundColor: '#28A1E0',
                            borderWidth: 0,
                            barThickness : 20, 
                        },
                    ]
                },
                mySiteTotalCntOptions: {
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
                                stepSize: 1,
                                min: 0,
                                max: 8
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

                mySiteEduTypeChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                mySiteEduTrgtChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                mySiteEduPieChartOptions: {
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
                            formatter: (value /*, ctx*/) => {
                                // let sum = 0;
                                // let dataArr = ctx.chart.data.datasets[0].data;
                                // dataArr.map(data => {
                                //     sum += data;
                                // });
                                // let percentage = (value*100 / sum).toFixed(2)+"%";
                                // return percentage;

                                return value +"%";
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

                hecSiteTotalChartData: {
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
                hecSiteMonthChartData: {
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
                hecSiteEduBarChartOptions: {
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
                                stepSize: 50,
                                min: 0,
                                max: 50
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

                hecSiteMonthTypeChartData: {
                    labels: [],
                    datasets: [
                        {
                            type: 'line',
                            label: '건축',
                            data: [],
                            backgroundColor: 'transparent',
                            borderColor: '#28A1E0',
                            pointRadius: 4,
                            pointBackgroundColor: '#28A1E0',
                            datalabels: {
                                anchor: 'start',
                                color: '#28A1E0',
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
                            }
                        },
                        {
                            type: 'line',
                            label: '전사',
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
                hecSiteMonthTypeChartOptions: {
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
                                stepSize: 10,
                                min: 0,
                                max: 40
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
                    responsive: true,
                    maintainAspectRatio: false
                },

                hecSiteEduTypeAllChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                hecSiteEduTypeInfrChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                hecSiteEduTypeBuldChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                hecSiteEduTypeChartOptions: {
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
                            formatter: (value /*, ctx*/) => {
                                // let sum = 0;
                                // let dataArr = ctx.chart.data.datasets[0].data;
                                // dataArr.map(data => {
                                //     sum += data;
                                // });
                                // let percentage = (value*100 / sum).toFixed(2)+"%";
                                // return percentage;

                                return value +"%";
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

                hecSiteEduTrgtAllChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                hecSiteEduTrgtInfrChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                hecSiteEduTrgtBuldChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                hecSiteEduTrgtChartOptions: {
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
                            formatter: (value /*, ctx*/) => {
                                // let sum = 0;
                                // let dataArr = ctx.chart.data.datasets[0].data;
                                // dataArr.map(data => {
                                //     sum += data;
                                // });
                                // let percentage = (value*100 / sum).toFixed(2)+"%";
                                // return percentage;

                                return value +"%";
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
            }
        },
        mounted() {
            this.fn_initGrid();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
            fn_initGrid: function () {
                let options1 = MySiteEduStatusInfo.options;

                options1.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_eduMySite();
                    },
                    onDataLoad : this.addrowEvt,
                }
                loader.createSheet({
                    el: 'mySiteEduSheetTable',
                    data: [],
                    options: options1
                }).then((sheet) => {
                    this.mySiteTotalGrid.data  = sheet
                });
                
                let options2 = HecEduTypeCurentStatus.options;
                let options3 = HecEduTrgtCurentStatus.options;

                options3.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_eduHecSite();
                    },
                }
                loader.createSheet({
                    el: 'hecSiteTypeSheetTable',
                    data: [],
                    options: options2
                }).then((sheet) => {
                    this.hecSiteTypeGrid.data  = sheet
                });
                loader.createSheet({
                    el: 'hecEduTypeSheetTable',
                    data: [],
                    options: options3
                }).then((sheet) => {
                    this.hecEduTypeGrid.data = sheet
                });
            },

            fn_clearSearch: function (type) {
                if(type == "M"){
                    this.search.mySite.searchYear  = nowYear;

                    this.mySiteTotalGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("M");
                } else if(type == "H"){
                    this.search.hecSite.searchYear  = nowYear;
                    
                    this.hecSiteTypeGrid.data.loadSearchData({
                        data : null
                    });
                    this.hecEduTypeGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("H");
                }
            },

            fn_clearChart: function (type) {
               if(type == "M"){
                    this.chartData.mySiteTotl.mySiteMonth   = [];
                    this.chartData.mySiteTotl.mySiteStatCnt = [];

                    this.mySiteTotalCntChartData.labels           = [];
                    this.mySiteTotalCntChartData.datasets[0].data = [];

                    this.chartData.mySiteType.mySiteEduKindNm   = [];
                    this.chartData.mySiteType.mySiteEduCnt  = [];

                    this.mySiteEduTypeChartData.labels           = [];
                    this.mySiteEduTypeChartData.datasets[0].data = [];

                    this.chartData.mySiteTrgt.mySiteEduTrgtNm   = [];
                    this.chartData.mySiteTrgt.mySiteEduCnt  = [];

                    this.mySiteEduTrgtChartData.labels           = [];
                    this.mySiteEduTrgtChartData.datasets[0].data = [];

                    this.$refs.mySiteTotalCntChart.renderChartData();
                    this.$refs.mySiteEduTypeChart.renderChartData();
                    this.$refs.mySiteEduTrgtChart.renderChartData();
                } else if(type == "H"){
                    this.chartData.hecSiteTotal.hecSiteTypeNm  = [];
                    this.chartData.hecSiteTotal.hecSiteTotaAvg = [];
                    
                    this.hecSiteTotalChartData.labels             = [];
                    this.hecSiteTotalChartData.datasets[0].data   = [];

                    this.chartData.hecSiteMonth.hecSiteTypeNm   = [];
                    this.chartData.hecSiteMonth.hecSiteMonthAvg = [];
                    
                    this.hecSiteMonthChartData.labels             = [];
                    this.hecSiteMonthChartData.datasets[0].data   = [];

                    this.$refs.hecSiteTotalChart.renderChartData();
                    this.$refs.hecSiteMonthChart.renderChartData();


                    this.chartData.hecSiteMonthType.hecSiteTypeNm  = [];
                    this.chartData.hecSiteMonthType.hecSiteAllAvg  = [];
                    this.chartData.hecSiteMonthType.hecSitecomAvg  = [];
                    this.chartData.hecSiteMonthType.hecSiteGenAvg  = [];
                    this.chartData.hecSiteMonthType.hecSiteFacAvg  = [];
                    this.chartData.hecSiteMonthType.hecSiteInfAvg  = [];
                    
                    this.hecSiteMonthTypeChartData.labels             = [];
                    this.hecSiteMonthTypeChartData.datasets[0].data   = [];
                    this.hecSiteMonthTypeChartData.datasets[1].data   = [];
                    this.hecSiteMonthTypeChartData.datasets[2].data   = [];

                    this.$refs.hecSiteMonthTypeChart.renderChartData();


                    this.chartData.hecEduTypeAll.hecEduTypeNm     = [];
                    this.chartData.hecEduTypeAll.hecEduTypeEduCnt = [];
                    
                    this.hecSiteEduTypeAllChartData.labels             = [];
                    this.hecSiteEduTypeAllChartData.datasets[0].data   = [];

                    this.chartData.hecEduTypeInfr.hecEduTypeNm     = [];
                    this.chartData.hecEduTypeInfr.hecEduTypeEduCnt = [];
                    
                    this.hecSiteEduTypeInfrChartData.labels             = [];
                    this.hecSiteEduTypeInfrChartData.datasets[0].data   = [];

                    this.chartData.hecEduTypeBuld.hecEduTypeNm     = [];
                    this.chartData.hecEduTypeBuld.hecEduTypeEduCnt = [];
                    
                    this.hecSiteEduTypeBuldChartData.labels             = [];
                    this.hecSiteEduTypeBuldChartData.datasets[0].data   = [];

                    this.$refs.hecSiteEduTypeAllChart.renderChartData();
                    this.$refs.hecSiteEduTypeInfrChart.renderChartData();
                    this.$refs.hecSiteEduTypeBuldChart.renderChartData();


                    this.chartData.hecEduTrgtAll.hecEduTrgtNm     = [];
                    this.chartData.hecEduTrgtAll.hecEduTrgtEduCnt = [];
                    
                    this.hecSiteEduTrgtAllChartData.labels             = [];
                    this.hecSiteEduTrgtAllChartData.datasets[0].data   = [];

                    this.chartData.hecEduTrgtInfr.hecEduTrgtNm     = [];
                    this.chartData.hecEduTrgtInfr.hecEduTrgtEduCnt = [];
                    
                    this.hecSiteEduTrgtInfrChartData.labels             = [];
                    this.hecSiteEduTrgtInfrChartData.datasets[0].data   = [];

                    this.chartData.hecEduTrgtBuld.hecEduTrgtNm     = [];
                    this.chartData.hecEduTrgtBuld.hecEduTrgtEduCnt = [];
                    
                    this.hecSiteEduTrgtBuldChartData.labels             = [];
                    this.hecSiteEduTrgtBuldChartData.datasets[0].data   = [];

                    this.$refs.hecSiteEduTrgtAllChart.renderChartData();
                    this.$refs.hecSiteEduTrgtInfrChart.renderChartData();
                    this.$refs.hecSiteEduTrgtBuldChart.renderChartData();
                }
            },

           fn_eduMySite : async function(){
                // console.log(" search.mySite *************  %o", this.search.mySite);

                this.fn_clearChart("M");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/edu/mySiteEduStatus/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.mySite,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.mySiteTotalGrid.data.loadSearchData({
                                data: response.data.datas.dlMyTotlCnt,
                            });

                            for(let i=1; i < 13; i++) {
                                this.chartData.mySiteTotl.mySiteMonth.push(i + "월");
                                this.chartData.mySiteTotl.mySiteStatCnt.push(0);
                            }

                            let eduMonth = 0;
                            for(let i=0; i < response.data.datas.dlMyMonthEdu.length; i++) {
                                // this.chartData.mySiteTotl.mySiteMonth.push(response.data.datas.dlMyMonthEdu[i].typeNm);
                                // this.chartData.mySiteTotl.mySiteStatCnt.push(response.data.datas.dlMyMonthEdu[i].eduStatCnt);

                                eduMonth = Number(response.data.datas.dlMyMonthEdu[i].eduMonth) - 1;
                                this.chartData.mySiteTotl.mySiteStatCnt[eduMonth] = response.data.datas.dlMyMonthEdu[i].eduStatCnt;
                            }

                            this.mySiteTotalCntChartData.labels           = this.chartData.mySiteTotl.mySiteMonth;
                            this.mySiteTotalCntChartData.datasets[0].data = this.chartData.mySiteTotl.mySiteStatCnt;

                            let mathStepSize = (Number(response.data.datas.dlMyMonthEdu[0].bsRemnCnt) / 10).toFixed(0);
                            this.mySiteTotalCntOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlMyMonthEdu[0].eduStatCnt);

                            if(response.data.datas.dlMyMonthEdu != null){
                                if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.mySiteTotalCntOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.mySiteTotalCntOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.mySiteTotalCntOptions.scales.yAxes[0].ticks.max = 100;
                                    this.mySiteTotalCntOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else if( mathStepSize > 2 && mathStepSize <= 5) {
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                } else {
                                    this.mySiteTotalCntOptions.scales.yAxes[0].ticks.max = 20;
                                    this.mySiteTotalCntOptions.scales.yAxes[0].ticks.stepSize = 2;
                                }
                            }

                            for(let i=0; i < response.data.datas.dlMyEduType.length; i++) {
                                this.chartData.mySiteType.mySiteEduKindNm.push(response.data.datas.dlMyEduType[i].eduKindNm);
                                this.chartData.mySiteType.mySiteEduCnt.push(response.data.datas.dlMyEduType[i].eduCnt);
                            }

                            this.mySiteEduTypeChartData.labels           = this.chartData.mySiteType.mySiteEduKindNm;
                            this.mySiteEduTypeChartData.datasets[0].data = this.chartData.mySiteType.mySiteEduCnt;

                            for(let i=0; i < response.data.datas.dlMyEduTrgt.length; i++) {
                                this.chartData.mySiteTrgt.mySiteEduTrgtNm.push(response.data.datas.dlMyEduTrgt[i].eduTargetNm);
                                this.chartData.mySiteTrgt.mySiteEduCnt.push(response.data.datas.dlMyEduTrgt[i].eduCnt);
                            }

                            this.mySiteEduTrgtChartData.labels           = this.chartData.mySiteTrgt.mySiteEduTrgtNm;
                            this.mySiteEduTrgtChartData.datasets[0].data = this.chartData.mySiteTrgt.mySiteEduCnt;

                            this.$refs.mySiteTotalCntChart.renderChartData();
                            this.$refs.mySiteEduTypeChart.renderChartData();
                            this.$refs.mySiteEduTrgtChart.renderChartData();
                        });
            },

            fn_eduHecSite : async function(){
                // console.log(" search.hecSite *************  %o", this.search.hecSite);

                this.fn_clearChart("H");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/edu/hecSiteEduStatus/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.hecSite,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.hecSiteTypeGrid.data.loadSearchData({
                                data: response.data.datas.dlHecYearEdu,
                            });
                            this.hecEduTypeGrid.data.loadSearchData({
                                data: response.data.datas.dlHecEduMon,
                            });

                            for(let i=0; i < response.data.datas.dlHecYearEdu.length; i++) {
                                this.chartData.hecSiteTotal.hecSiteTypeNm.push(response.data.datas.dlHecYearEdu[i].csrtTypeNm);
                                this.chartData.hecSiteTotal.hecSiteTotaAvg.push(response.data.datas.dlHecYearEdu[i].eduSiteAvg);

                                this.chartData.hecSiteMonth.hecSiteTypeNm.push(response.data.datas.dlHecYearEdu[i].csrtTypeNm);
                                this.chartData.hecSiteMonth.hecSiteMonthAvg.push(response.data.datas.dlHecYearEdu[i].eduMonthAvg);
                            }

                            this.hecSiteTotalChartData.labels           = this.chartData.hecSiteTotal.hecSiteTypeNm;
                            this.hecSiteTotalChartData.datasets[0].data = this.chartData.hecSiteTotal.hecSiteTotaAvg;

                            this.hecSiteMonthChartData.labels           = this.chartData.hecSiteMonth.hecSiteTypeNm;
                            this.hecSiteMonthChartData.datasets[0].data = this.chartData.hecSiteMonth.hecSiteMonthAvg;

                            let mathStepSize = (Number(response.data.datas.dlHecYearEdu[0].eduSiteAvg) / 10).toFixed(0);
                            this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlHecYearEdu[0].eduSiteAvg);

                            if(response.data.datas.dlHecYearEdu != null){
                                if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else if( mathStepSize > 3 && mathStepSize <= 5) {
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                } else if( mathStepSize > 1 && mathStepSize <= 3) {
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.max = 30;
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                } else {
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.max = 10;
                                    this.hecSiteEduBarChartOptions.scales.yAxes[0].ticks.stepSize = 2;
                                }
                            }

                            this.$refs.hecSiteTotalChart.renderChartData();
                            this.$refs.hecSiteMonthChart.renderChartData();

                            for(let i=1; i < 13; i++) {
                                this.chartData.hecSiteMonthType.hecSiteTypeNm.push(i + "월");
                                this.chartData.hecSiteMonthType.hecSiteAllAvg.push(0);
                                this.chartData.hecSiteMonthType.hecSiteInfAvg.push(0);
                                this.chartData.hecSiteMonthType.hecSiteGenAvg.push(0);
                            }

                            let eduMonth = 0;
                            for(let i=0; i < response.data.datas.dlHecMonEdu.length; i++) {
                                // this.chartData.hecSiteMonthType.hecSiteTypeNm.push(response.data.datas.dlHecMonEdu[i].typeNm);
                                // this.chartData.hecSiteMonthType.hecSiteAllAvg.push(response.data.datas.dlHecMonEdu[i].allEduAvg);
                                // this.chartData.hecSiteMonthType.hecSiteInfAvg.push(response.data.datas.dlHecMonEdu[i].infEduAvg);
                                // this.chartData.hecSiteMonthType.hecSiteGenAvg.push(response.data.datas.dlHecMonEdu[i].genEduAvg);

                                eduMonth = Number(response.data.datas.dlHecMonEdu[i].eduMonth) - 1;
                                this.chartData.hecSiteMonthType.hecSiteAllAvg[eduMonth] = response.data.datas.dlHecMonEdu[i].allEduAvg;
                                this.chartData.hecSiteMonthType.hecSiteInfAvg[eduMonth] = response.data.datas.dlHecMonEdu[i].infEduAvg;
                                this.chartData.hecSiteMonthType.hecSiteGenAvg[eduMonth] = response.data.datas.dlHecMonEdu[i].genEduAvg;
                            }

                            this.hecSiteMonthTypeChartData.labels           = this.chartData.hecSiteMonthType.hecSiteTypeNm;
                            this.hecSiteMonthTypeChartData.datasets[0].data = this.chartData.hecSiteMonthType.hecSiteGenAvg;
                            this.hecSiteMonthTypeChartData.datasets[1].data = this.chartData.hecSiteMonthType.hecSiteInfAvg;
                            this.hecSiteMonthTypeChartData.datasets[2].data = this.chartData.hecSiteMonthType.hecSiteAllAvg;

                            mathStepSize = (Number(response.data.datas.dlHecMonEdu[0].hecSiteAllAvg) / 10).toFixed(0);
                            this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlHecMonEdu[0].hecSiteAllAvg);

                            if(response.data.datas.dlHecMonEdu != null){
                                if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else if( mathStepSize > 3 && mathStepSize <= 5) {
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                } else if( mathStepSize > 1 && mathStepSize <= 3) {
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.max = 30;
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                } else {
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.max = 10;
                                    this.hecSiteMonthTypeChartOptions.scales.yAxes[0].ticks.stepSize = 2;
                                }
                            }

                            this.$refs.hecSiteMonthTypeChart.renderChartData();


                            for(let i=0; i < response.data.datas.dlHecEduTypeAll.length; i++) {
                                this.chartData.hecEduTypeAll.hecEduTypeNm.push(response.data.datas.dlHecEduTypeAll[i].eduKindNm);
                                this.chartData.hecEduTypeAll.hecEduTypeEduCnt.push(response.data.datas.dlHecEduTypeAll[i].eduKindRate);
                            }
                            this.hecSiteEduTypeAllChartData.labels           = this.chartData.hecEduTypeAll.hecEduTypeNm;
                            this.hecSiteEduTypeAllChartData.datasets[0].data = this.chartData.hecEduTypeAll.hecEduTypeEduCnt;

                            for(let i=0; i < response.data.datas.dlHecEduTypeBuld.length; i++) {
                                this.chartData.hecEduTypeBuld.hecEduTypeNm.push(response.data.datas.dlHecEduTypeBuld[i].eduKindNm);
                                this.chartData.hecEduTypeBuld.hecEduTypeEduCnt.push(response.data.datas.dlHecEduTypeBuld[i].eduKindRate);
                            }
                            this.hecSiteEduTypeBuldChartData.labels           = this.chartData.hecEduTypeBuld.hecEduTypeNm;
                            this.hecSiteEduTypeBuldChartData.datasets[0].data = this.chartData.hecEduTypeBuld.hecEduTypeEduCnt;

                            for(let i=0; i < response.data.datas.dlHecEduTypeInfr.length; i++) {
                                this.chartData.hecEduTypeInfr.hecEduTypeNm.push(response.data.datas.dlHecEduTypeInfr[i].eduKindNm);
                                this.chartData.hecEduTypeInfr.hecEduTypeEduCnt.push(response.data.datas.dlHecEduTypeInfr[i].eduKindRate);
                            }
                            this.hecSiteEduTypeInfrChartData.labels           = this.chartData.hecEduTypeInfr.hecEduTypeNm;
                            this.hecSiteEduTypeInfrChartData.datasets[0].data = this.chartData.hecEduTypeInfr.hecEduTypeEduCnt;

                            this.$refs.hecSiteEduTypeAllChart.renderChartData();
                            this.$refs.hecSiteEduTypeBuldChart.renderChartData();
                            this.$refs.hecSiteEduTypeInfrChart.renderChartData();

                            for(let i=0; i < response.data.datas.dlHecEduTrgtAll.length; i++) {
                                this.chartData.hecEduTrgtAll.hecEduTrgtNm.push(response.data.datas.dlHecEduTrgtAll[i].eduTargetNm);
                                this.chartData.hecEduTrgtAll.hecEduTrgtEduCnt.push(response.data.datas.dlHecEduTrgtAll[i].eduKindRate);
                            }
                            this.hecSiteEduTrgtAllChartData.labels           = this.chartData.hecEduTrgtAll.hecEduTrgtNm;
                            this.hecSiteEduTrgtAllChartData.datasets[0].data = this.chartData.hecEduTrgtAll.hecEduTrgtEduCnt;

                            for(let i=0; i < response.data.datas.dlHecEduTrgtBuld.length; i++) {
                                this.chartData.hecEduTrgtBuld.hecEduTrgtNm.push(response.data.datas.dlHecEduTrgtBuld[i].eduTargetNm);
                                this.chartData.hecEduTrgtBuld.hecEduTrgtEduCnt.push(response.data.datas.dlHecEduTrgtBuld[i].eduKindRate);
                            }
                            this.hecSiteEduTrgtBuldChartData.labels           = this.chartData.hecEduTrgtBuld.hecEduTrgtNm;
                            this.hecSiteEduTrgtBuldChartData.datasets[0].data = this.chartData.hecEduTrgtBuld.hecEduTrgtEduCnt;

                            for(let i=0; i < response.data.datas.dlHecEduTrgtInfr.length; i++) {
                                this.chartData.hecEduTrgtInfr.hecEduTrgtNm.push(response.data.datas.dlHecEduTrgtInfr[i].eduTargetNm);
                                this.chartData.hecEduTrgtInfr.hecEduTrgtEduCnt.push(response.data.datas.dlHecEduTrgtInfr[i].eduKindRate);
                            }
                            this.hecSiteEduTrgtInfrChartData.labels           = this.chartData.hecEduTrgtInfr.hecEduTrgtNm;
                            this.hecSiteEduTrgtInfrChartData.datasets[0].data = this.chartData.hecEduTrgtInfr.hecEduTrgtEduCnt;

                            this.$refs.hecSiteEduTrgtAllChart.renderChartData();
                            this.$refs.hecSiteEduTrgtBuldChart.renderChartData();
                            this.$refs.hecSiteEduTrgtInfrChart.renderChartData();
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