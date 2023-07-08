<template>
    <div class="wrap">
        <div class="lnb_container on">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />
                <!-- <h2 class="sub_title">통계분석 > 콘크리트관리</h2> -->
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
                                            <select v-model="search.trdPhyscl.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.trdPhyscl.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('P')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_concTradePhysical()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType01">
                                                <input type="radio" id="termType01" name="searchTermType00" value="1" v-model="search.trdPhyscl.searchTermType"
                                                    @click="fn_initMonthType('P')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType02">
                                                <input type="radio" id="termType02" name="searchTermType00" value="2" v-model="search.trdPhyscl.searchTermType"
                                                    @click="fn_initMonthType('P')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType01">
                                                <input type="radio" id="monthType01" name="searchMonthType00" :value="'1'"
                                                    v-model="search.trdPhyscl.searchMonthType" :disabled="search.trdPhyscl.searchTermType=='2'">
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType02">
                                                <input type="radio" id="monthType02" name="searchMonthType00" :value="'2'"
                                                    v-model="search.trdPhyscl.searchMonthType" :disabled="search.trdPhyscl.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType03">
                                                <input type="radio" id="monthType03" name="searchMonthType00" :value="'3'"
                                                    v-model="search.trdPhyscl.searchMonthType" :disabled="search.trdPhyscl.searchTermType=='2'">

                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType04">
                                                <input type="radio" id="monthType04" name="searchMonthType00" :value="'4'"
                                                    v-model="search.trdPhyscl.searchMonthType" :disabled="search.trdPhyscl.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>
                                            <date-picker-range ref="searchDate" v-model="search.trdPhyscl.searchDate" :format="'YYYYMMDD'" v-if="search.trdPhyscl.searchTermType=='2'" />
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
                                        물성시험 Fail 다발 레미콘 업체 순위
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_excel"
                                                @click="fn_exportExcel('trdPhysclGrid', '물성시험 Fail 다발 레미콘 업체 순위')"
                                            >
                                                엑셀 다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="concStatsSheetTable1" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        물성시험 Fail 다발 레미콘 업체 순위
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('trdPhysclBarChart', '물성시험 Fail 다발 레미콘 업체 순위')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="trdPhysclBarChart" :data="trdPhysclBarChartData" :options="trdPhysclBarChartOptions" class="barchart" ref="trdPhysclBarChart"></BarChart>
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
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr v-if="mode !== 'inherited'">
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.trdStrngth.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.trdStrngth.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('S')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_concTradeStrength()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType11">
                                                <input type="radio" id="termType11" name="searchTermType10" value="1" v-model="search.trdStrngth.searchTermType" checked
                                                    @click="fn_initMonthType('S')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType12">
                                                <input type="radio" id="termType12" name="searchTermType10" value="2" v-model="search.trdStrngth.searchTermType"
                                                    @click="fn_initMonthType('S')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType11">
                                                <input type="radio" id="monthType11" name="searchMonthType10" :value="'1'"
                                                    v-model="search.trdStrngth.searchMonthType" :disabled="search.trdStrngth.searchTermType=='2'" checked>
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType12">
                                                <input type="radio" id="monthType12" name="searchMonthType10" :value="'2'"
                                                    v-model="search.trdStrngth.searchMonthType" :disabled="search.trdStrngth.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType13">
                                                <input type="radio" id="monthType13" name="searchMonthType10" :value="'3'"
                                                    v-model="search.trdStrngth.searchMonthType" :disabled="search.trdStrngth.searchTermType=='2'">
                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType14">
                                                <input type="radio" id="monthType14" name="searchMonthType10" :value="'4'"
                                                    v-model="search.trdStrngth.searchMonthType" :disabled="search.trdStrngth.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>

                                            <date-picker-range ref="searchDate" v-model="search.trdStrngth.searchDate" :format="'YYYYMMDD'" v-if="search.trdStrngth.searchTermType=='2'" />
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
                                        강도시험 Fail 다발 레미콘 업체 순위
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_excel"
                                                @click="fn_exportExcel('trdStrngthGrid', '강도시험 Fail 다발 레미콘 업체 순위')"
                                            >
                                                엑셀 다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="concStatsSheetTable2" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        강도시험 Fail 다발 레미콘 업체 순위
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('trdStrngthBarChart', '강도시험 Fail 다발 레미콘 업체 순위')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="trdStrngthBarChart" :data="trdStrngthBarChartData" :options="trdStrngthBarChartOptions" class="barchart" ref="trdStrngthBarChart"></BarChart>
                                    </div>
                                </div>
                            </div>
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
                                            <select v-model="search.trdPnumb.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.trdPnumb.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('N')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_concTradePnumber()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType21">
                                                <input type="radio" id="termType21" name="searchTermType20" :value="'1'" v-model="search.trdPnumb.searchTermType" checked
                                                    @click="fn_initMonthType('N')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType22">
                                                <input type="radio" id="termType22" name="searchTermType20" :value="'2'" v-model="search.trdPnumb.searchTermType"
                                                    @click="fn_initMonthType('N')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType21">
                                                <input type="radio" id="monthType21" name="searchMonthType20" :value="'1'"
                                                    v-model="search.trdPnumb.searchMonthType" :disabled="search.trdPnumb.searchTermType=='2'" checked>
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType22">
                                                <input type="radio" id="monthType22" name="searchMonthType20" :value="'2'"
                                                    v-model="search.trdPnumb.searchMonthType" :disabled="search.trdPnumb.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType23">
                                                <input type="radio" id="monthType23" name="searchMonthType20" :value="'3'"
                                                    v-model="search.trdPnumb.searchMonthType" :disabled="search.trdPnumb.searchTermType=='2'">
                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType24">
                                                <input type="radio" id="monthType24" name="searchMonthType20" :value="'4'"
                                                    v-model="search.trdPnumb.searchMonthType" :disabled="search.trdPnumb.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>

                                            <date-picker-range ref="searchDate" v-model="search.trdPnumb.searchDate" :format="'YYYYMMDD'" v-if="search.trdPnumb.searchTermType=='2'" />
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
                                        레미콘 업체별, 타설물량 비중
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_excel"
                                                @click="fn_exportExcel('trdPnumbGrid', '레미콘 업체별, 타설물량 비중')"
                                            >
                                                엑셀 다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="concStatsSheetTable3" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        레미콘 업체별, 타설물량 비중
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('trdPnumbPieChart', '레미콘 업체별, 타설물량 비중')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <PieChart id="trdPnumbPieChart" :data="trdPnumbPieChartData" :options="trdPnumbPieChartOptions" class="barchart" ref="trdPnumbPieChart"></PieChart>    
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
    import { ConcreteTradePhysical, ConcreteTradeStrngth, ConcreteTradePnumb } from '@/pages/common/data/StatisticsList'
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
        name: 'ConcreteStatsView',
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
                // mode: 'inherited',  // 상속모드 inherited 
                
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정
                tabs: ['불량레미콘업체(물성)', '불량레미콘업체(강도)', '물량비중'], // tab name

                /* chart option */
                plugins: [ChartJSPluginDatalabels],

                /* Grid option */
                trdPhysclGrid  : {
                    data : null,
                    options : {},
                },
                trdStrngthGrid  : {
                    data : null,
                    options : {},
                },
                trdPnumbGrid  : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    trdPhyscl: {
                        trdPhysclLbl:   [],
                        trdPhysclTotl:  [],
                        trdPhysclTemp:  [],
                        trdPhysclSlump: [],
                        trdPhysclAir:   [],
                        trdPhysclDenst: [],
                        trdPhysclUnit:  [],
                    },
                    trdStrngth: {
                        trdStrngthLbl:  [],
                        trdStrngthTotl: [],
                        trdStrngthT07d: [],
                        trdStrngthT28d: [],
                        trdStrngthT91d: [],
                        trdStrngthVert: [],
                        trdStrngthHrzn: [],
                        trdStrngthFill: [],
                    },
                    trdPnumb: {
                        trdPnumbPieLbl: [],
                        trdPnumbPieData: [],
                    }
                },

                /** searchInfo */
                search: {
                    trdPhyscl: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    trdStrngth: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    trdPnumb: {
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

                /* 불량레미콘업체(물성) 차트 */
                trdPhysclBarChartData: {
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
                            label: '온도',
                            data: [],
                            backgroundColor: '#FAA719',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '슬럼프',
                            data: [],
                            backgroundColor: '#7FD7ED',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '공기량',
                            data: [],
                            backgroundColor: '#054F6A',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '염화물',
                            data: [],
                            backgroundColor: '#BCBBC0',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '단위수량',
                            data: [],
                            backgroundColor: '#BCBBC0',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                    ]
                },
                trdPhysclBarChartOptions: {
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
                                stepSize: 100,
                                min: 0,
                                max: 500
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

                /* 불량레미콘업체(강도) 차트 */
                trdStrngthBarChartData: {
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
                            label: '7일',
                            data: [],
                            backgroundColor: '#7FD7ED',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '28일',
                            data: [],
                            backgroundColor: '#3DB9B7',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '91일',
                            data: [],
                            backgroundColor: '#B9CF2E',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '수직부재',
                            data: [],
                            backgroundColor: '#054F6A',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: '수평부재',
                            data: [],
                            backgroundColor: '#FAA719',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                        {
                            label: 'Filler Support',
                            data: [],
                            backgroundColor: '#BCBBC0',
                            borderWidth: 0,
                            barPercentage : 0.5,
                            // barThickness : 10,
                            categoryPercentage : 0.5,
                        },
                    ]
                },
                trdStrngthBarChartOptions: {
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
                                stepSize: 100,
                                min: 0,
                                max: 500
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

                /* 물량비중 차트 */
                trdPnumbPieChartData: {
                    labels: ['1 레미콘', '2 레미콘', '3 레미콘', '4 레미콘', '5 레미콘', '6 레미콘', '7 레미콘', '8 레미콘', '9 레미콘', '10 레미콘'],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                trdPnumbPieChartOptions: {
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
                                return value + "%"; ;
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
            this.fn_fetchAdvanceInfo();
            this.fn_initGrid();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },
        methods: {
            fn_initGrid: function () {
                /* 불량레미콘업체(물성) */

                let options1 = ConcreteTradePhysical.options;
                options1.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_concTradePhysical();
                    },
                }

                loader.createSheet({
                    el: 'concStatsSheetTable1',
                    data: [],
                    options: options1
                }).then((sheet) => {
                    this.trdPhysclGrid.data  = sheet
                });
                /* 불량레미콘업체(강도) */ 
                let options2 = ConcreteTradeStrngth.options;
                options2.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_concTradeStrength();
                    },
                }
                loader.createSheet({
                    el: 'concStatsSheetTable2',
                    data: [],
                    options: options2
                }).then((sheet) => {
                    this.trdStrngthGrid.data  = sheet
                });
                
                /* 물량비중 */
                let options3 = ConcreteTradePnumb.options;
                options3.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_concTradePnumber();
                    },
                }
                loader.createSheet({
                    el: 'concStatsSheetTable3',
                    data: [],
                    options: options3
                }).then((sheet) => {
                    this.trdPnumbGrid.data = sheet
                });
            },

            fn_clearSearch: function (type) {
                if(type == "P"){
                    this.search.trdPhyscl.searchMngtType  = '';
                    this.search.trdPhyscl.searchProjectNm = null;
                    this.search.trdPhyscl.searchTermType  = '1';
                    this.search.trdPhyscl.searchMonthType = '1';
                    this.search.trdPhyscl.searchDate      = [null, null],
                    this.search.trdPhyscl.searchStartDt   = null,
                    this.search.trdPhyscl.searchEndDt     = null,

                    this.trdPhysclGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("P");
                } else if(type == "S"){
                    this.search.trdStrngth.searchMngtType  = '';
                    this.search.trdStrngth.searchProjectNm = null;
                    this.search.trdStrngth.searchTermType  = '1';
                    this.search.trdStrngth.searchMonthType = '1';
                    this.search.trdStrngth.searchDate      = [null, null],
                    this.search.trdStrngth.searchStartDt   = null,
                    this.search.trdStrngth.searchEndDt     = null,
                    
                    this.trdStrngthGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("S");
                } else if(type == "N"){
                    this.search.trdPnumb.searchMngtType  = '';
                    this.search.trdPnumb.searchProjectNm = null;
                    this.search.trdPnumb.searchTermType  = '1';
                    this.search.trdPnumb.searchMonthType = '1';
                    this.search.trdPnumb.searchDate      = [null, null],
                    this.search.trdPnumb.searchStartDt   = null,
                    this.search.trdPnumb.searchEndDt     = null,
                    
                    this.trdPnumbGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("N");
                }
            },

            fn_clearChart: function (type) {
                if(type == "P"){
                    this.chartData.trdPhyscl.trdPhysclLbl   = [];
                    this.chartData.trdPhyscl.trdPhysclTotl  = [];
                    this.chartData.trdPhyscl.trdPhysclTemp  = [];
                    this.chartData.trdPhyscl.trdPhysclSlump = [];
                    this.chartData.trdPhyscl.trdPhysclAir   = [];
                    this.chartData.trdPhyscl.trdPhysclDenst = [];
                    this.chartData.trdPhyscl.trdPhysclUnit  = [];

                    this.trdPhysclBarChartData.labels           = [];
                    this.trdPhysclBarChartData.datasets[0].data = [];
                    this.trdPhysclBarChartData.datasets[1].data = [];
                    this.trdPhysclBarChartData.datasets[2].data = [];
                    this.trdPhysclBarChartData.datasets[3].data = [];
                    this.trdPhysclBarChartData.datasets[4].data = [];
                    this.trdPhysclBarChartData.datasets[5].data = [];

                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.max      = 1000;
                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;

                    this.$refs.trdPhysclBarChart.renderChartData();
                } else if(type == "S"){
                    this.chartData.trdStrngth.trdStrngthLbl  = [];
                    this.chartData.trdStrngth.trdPhysclTotl  = [];
                    this.chartData.trdStrngth.trdStrngthT07d = [];
                    this.chartData.trdStrngth.trdStrngthT28d = [];
                    this.chartData.trdStrngth.trdStrngthT91d = [];
                    this.chartData.trdStrngth.trdStrngthVert = [];
                    this.chartData.trdStrngth.trdStrngthHrzn = [];
                    this.chartData.trdStrngth.trdStrngthFill = [];

                    this.trdStrngthBarChartData.labels           = [];
                    this.trdStrngthBarChartData.datasets[0].data = [];
                    this.trdStrngthBarChartData.datasets[1].data = [];
                    this.trdStrngthBarChartData.datasets[2].data = [];
                    this.trdStrngthBarChartData.datasets[3].data = [];
                    this.trdStrngthBarChartData.datasets[4].data = [];
                    this.trdStrngthBarChartData.datasets[5].data = [];
                    this.trdStrngthBarChartData.datasets[6].data = [];

                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.max      = 1000;
                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;

                    this.$refs.trdStrngthBarChart.renderChartData();
                } else if(type == "N"){
                    this.chartData.trdPnumb.trdPnumbPieLbl  = [];
                    this.chartData.trdPnumb.trdPnumbPieData = [];

                    this.trdPnumbPieChartData.labels           = [];
                    this.trdPnumbPieChartData.datasets[0].data = [];

                    this.$refs.trdPnumbPieChart.renderChartData();
                }
            },

            fn_initMonthType: function (type) {
                // console.log(type + " === " + this.search.trdPhyscl.searchTermType + "  ****  " + this.search.trdPhyscl.searchMonthType);
                if(type == "p"){
                    if(this.search.trdPhyscl.searchTermType  == '1' && this.search.trdPhyscl.searchMonthType != null){
                        this.search.trdPhyscl.searchMonthType = null;
                    } else if(this.search.trdPhyscl.searchTermType  == '2' && this.search.trdPhyscl.searchMonthType == null){
                        this.search.trdPhyscl.searchMonthType = '1';
                        this.search.trdPhyscl.searchDate      = [null, null];
                        this.search.trdPhyscl.searchStartDt   = null;
                        this.search.trdPhyscl.searchEndDt     = null;
                    }
                } else if(type == "S"){
                    if(this.search.trdStrngth.searchTermType  == '1' && this.search.trdStrngth.searchMonthType != null){
                        this.search.trdStrngth.searchMonthType = null;
                    } else if(this.search.trdStrngth.searchTermType  == '2' && this.search.trdStrngth.searchMonthType == null){
                        this.search.trdStrngth.searchMonthType = '1';
                        this.search.trdStrngth.searchDate      = [null, null];
                        this.search.trdStrngth.searchStartDt   = null;
                        this.search.trdStrngth.searchEndDt     = null;
                    }
                } else if(type == "N"){
                    if(this.search.trdPnumb.searchTermType  == '1' && this.search.trdPnumb.searchMonthType != null){
                        this.search.trdPnumb.searchMonthType = null;
                    } else if(this.search.trdPnumb.searchTermType  == '2' && this.search.trdPnumb.searchMonthType == null){
                        this.search.trdPnumb.searchMonthType = '1';
                        this.search.trdPnumb.searchDate      = [null, null];
                        this.search.trdPnumb.searchStartDt   = null;
                        this.search.trdPnumb.searchEndDt     = null;
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

            fn_concTradePhysical : async function(){
                // console.log(" search.trdPhyscl *************  %o", this.search.trdPhyscl);

                this.fn_clearChart("P");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/concrete/defectiveRemiconPhysical/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.trdPhyscl,
                    searchStartDt   : this.search.trdPhyscl.searchDate[0],
                    searchEndDt     : this.search.trdPhyscl.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.trdPhysclGrid.data.loadSearchData({
                                data: response.data.datas.dlTrdPhyscl,
                            });

                            for(let i=0; i < response.data.datas.dlTrdPhyscl.length; i++) {
                                this.chartData.trdPhyscl.trdPhysclLbl.push(response.data.datas.dlTrdPhyscl[i].tradeNm);
                                this.chartData.trdPhyscl.trdPhysclTotl.push(response.data.datas.dlTrdPhyscl[i].totlCnt);
                                this.chartData.trdPhyscl.trdPhysclTemp.push(response.data.datas.dlTrdPhyscl[i].tempCnt);
                                this.chartData.trdPhyscl.trdPhysclSlump.push(response.data.datas.dlTrdPhyscl[i].slumpCnt);
                                this.chartData.trdPhyscl.trdPhysclAir.push(response.data.datas.dlTrdPhyscl[i].airCnt);
                                this.chartData.trdPhyscl.trdPhysclDenst.push(response.data.datas.dlTrdPhyscl[i].densityCnt);
                                this.chartData.trdPhyscl.trdPhysclUnit.push(response.data.datas.dlTrdPhyscl[i].unitCnt);
                            }

                            this.trdPhysclBarChartData.labels           = this.chartData.trdPhyscl.trdPhysclLbl;
                            this.trdPhysclBarChartData.datasets[0].data = this.chartData.trdPhyscl.trdPhysclTotl;
                            this.trdPhysclBarChartData.datasets[1].data = this.chartData.trdPhyscl.trdPhysclTemp;
                            this.trdPhysclBarChartData.datasets[2].data = this.chartData.trdPhyscl.trdPhysclSlump;
                            this.trdPhysclBarChartData.datasets[3].data = this.chartData.trdPhyscl.trdPhysclAir;
                            this.trdPhysclBarChartData.datasets[4].data = this.chartData.trdPhyscl.trdPhysclDenst;
                            this.trdPhysclBarChartData.datasets[5].data = this.chartData.trdPhyscl.trdPhysclUnit;

                            let mathStepSize = (Number(response.data.datas.dlTrdPhyscl[0].totlCnt) / 10).toFixed(0);
                            this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlTrdPhyscl[0].totlCnt);

                            if(response.data.datas.dlTrdPhyscl != null){
                                if( mathStepSize > 5000) {
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.trdPhysclBarChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.trdPhysclBarChart.renderChartData();
                });

            },

            fn_concTradeStrength : async function(){
                // console.log(" search.trdStrngth *************  %o", this.search.trdStrngth);

                this.fn_clearChart("S");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/concrete/defectiveRemiconStrength/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.trdStrngth,
                    searchStartDt   : this.search.trdStrngth.searchDate[0],
                    searchEndDt     : this.search.trdStrngth.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.trdStrngthGrid.data.loadSearchData({
                                data: response.data.datas.dlTrdStrngth,
                            });

                            for(let i=0; i < response.data.datas.dlTrdStrngth.length; i++) {
                                this.chartData.trdStrngth.trdStrngthLbl.push(response.data.datas.dlTrdStrngth[i].tradeNm);
                                this.chartData.trdStrngth.trdPhysclTotl.push(response.data.datas.dlTrdStrngth[i].totlCnt);
                                this.chartData.trdStrngth.trdStrngthT07d.push(response.data.datas.dlTrdStrngth[i].t7DCnt);
                                this.chartData.trdStrngth.trdStrngthT28d.push(response.data.datas.dlTrdStrngth[i].t28DCnt);
                                this.chartData.trdStrngth.trdStrngthT91d.push(response.data.datas.dlTrdStrngth[i].t91DCnt);
                                this.chartData.trdStrngth.trdStrngthVert.push(response.data.datas.dlTrdStrngth[i].vertCnt);
                                this.chartData.trdStrngth.trdStrngthHrzn.push(response.data.datas.dlTrdStrngth[i].hrznCnt);
                                this.chartData.trdStrngth.trdStrngthFill.push(response.data.datas.dlTrdStrngth[i].fillCnt);
                            }

                            this.trdStrngthBarChartData.labels           = this.chartData.trdStrngth.trdStrngthLbl;
                            this.trdStrngthBarChartData.datasets[0].data = this.chartData.trdStrngth.trdPhysclTotl;
                            this.trdStrngthBarChartData.datasets[1].data = this.chartData.trdStrngth.trdStrngthT07d;
                            this.trdStrngthBarChartData.datasets[2].data = this.chartData.trdStrngth.trdStrngthT28d;
                            this.trdStrngthBarChartData.datasets[3].data = this.chartData.trdStrngth.trdStrngthT91d;
                            this.trdStrngthBarChartData.datasets[4].data = this.chartData.trdStrngth.trdStrngthVert;
                            this.trdStrngthBarChartData.datasets[5].data = this.chartData.trdStrngth.trdStrngthHrzn;
                            this.trdStrngthBarChartData.datasets[6].data = this.chartData.trdStrngth.trdStrngthFill;

                            let mathStepSize = (Number(response.data.datas.dlTrdStrngth[0].totlCnt) / 10).toFixed(0);
                            this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlTrdStrngth[0].totlCnt);

                            if(response.data.datas.dlTrdStrngth != null){
                                if( mathStepSize > 5000) {
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.trdStrngthBarChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.trdStrngthBarChart.renderChartData();
                });
            },

            fn_concTradePnumber : async function(){
                // console.log("search.trdPnumb *************  " + this.search.trdPnumb);

                this.fn_clearChart("N");
                
                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/concrete/remiconPercenNumber/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.trdPnumb,
                    searchStartDt   : this.search.trdPnumb.searchDate[0],
                    searchEndDt     : this.search.trdPnumb.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.trdPnumbGrid.data.loadSearchData({
                                data: response.data.datas.dlPerNum,
                            });

                            for(let i=0; i < response.data.datas.dlPerNum.length; i++) {
                                this.chartData.trdPnumb.trdPnumbPieLbl.push(response.data.datas.dlPerNum[i].tradeNm);
                                this.chartData.trdPnumb.trdPnumbPieData.push(response.data.datas.dlPerNum[i].dnstRate);
                            }

                            this.trdPnumbPieChartData.labels           = this.chartData.trdPnumb.trdPnumbPieLbl;
                            this.trdPnumbPieChartData.datasets[0].data = this.chartData.trdPnumb.trdPnumbPieData;

                            this.$refs.trdPnumbPieChart.renderChartData();
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