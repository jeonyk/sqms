<template>
    <div class="wrap">
        <div class="lnb_container on">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />
                <!-- <h2 class="sub_title">통계분석 > 대외점검</h2> -->
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
                                            <select v-model="search.freqRate.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.freqRate.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('F')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_insttFreqRate()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType01">
                                                <input type="radio" id="termType01" name="searchTermType00" value="1" v-model="search.freqRate.searchTermType"
                                                    @click="fn_initMonthType('F')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType02">
                                                <input type="radio" id="termType02" name="searchTermType00" value="2" v-model="search.freqRate.searchTermType"
                                                    @click="fn_initMonthType('F')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType01">
                                                <input type="radio" id="monthType01" name="searchMonthType00" :value="'1'"
                                                    v-model="search.freqRate.searchMonthType" :disabled="search.freqRate.searchTermType=='2'">
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType02">
                                                <input type="radio" id="monthType02" name="searchMonthType00" :value="'2'"
                                                    v-model="search.freqRate.searchMonthType" :disabled="search.freqRate.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType03">
                                                <input type="radio" id="monthType03" name="searchMonthType00" :value="'3'"
                                                    v-model="search.freqRate.searchMonthType" :disabled="search.freqRate.searchTermType=='2'">

                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType04">
                                                <input type="radio" id="monthType04" name="searchMonthType00" :value="'4'"
                                                    v-model="search.freqRate.searchMonthType" :disabled="search.freqRate.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>
                                            <date-picker-range ref="searchDate" v-model="search.freqRate.searchDate" :format="'YYYYMMDD'" v-if="search.freqRate.searchTermType=='2'" />
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
                                        점검기관별, 점검횟수 및 비율
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('freqRateGrid', '점검기관별, 점검횟수 및 비율')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap mt0">
                                        <div id="extStatsSheetTable1" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        점검기관별 점검비율
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('freqRatePieChart', '점검기관별 점검비율')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <PieChart id="freqRatePieChart" :data="freqRatePieChartData" :options="freqRatePieChartOptions" class="barchart" ref="freqRatePieChart"></PieChart>    
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
                                            <select v-model="search.poutTotl.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.poutTotl.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('P')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_poutCntTtlDem()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType11">
                                                <input type="radio" id="termType11" name="searchTermType10" value="1" v-model="search.poutTotl.searchTermType" checked
                                                    @click="fn_initMonthType('P')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType12">
                                                <input type="radio" id="termType12" name="searchTermType10" value="2" v-model="search.poutTotl.searchTermType"
                                                    @click="fn_initMonthType('P')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType11">
                                                <input type="radio" id="monthType11" name="searchMonthType10" :value="'1'"
                                                    v-model="search.poutTotl.searchMonthType" :disabled="search.poutTotl.searchTermType=='2'" checked>
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType12">
                                                <input type="radio" id="monthType12" name="searchMonthType10" :value="'2'"
                                                    v-model="search.poutTotl.searchMonthType" :disabled="search.poutTotl.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType13">
                                                <input type="radio" id="monthType13" name="searchMonthType10" :value="'3'"
                                                    v-model="search.poutTotl.searchMonthType" :disabled="search.poutTotl.searchTermType=='2'">
                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType14">
                                                <input type="radio" id="monthType14" name="searchMonthType10" :value="'4'"
                                                    v-model="search.poutTotl.searchMonthType" :disabled="search.poutTotl.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>

                                            <date-picker-range ref="searchDate" v-model="search.poutTotl.searchDate" :format="'YYYYMMDD'" v-if="search.poutTotl.searchTermType=='2'" />
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
                                지적사항 중, 확인서 발행건수 집계
                                <div class="fr">
                                    <button
                                        type="button"
                                        class="btn btn_sm btn_excel"
                                        @click="fn_exportExcel('poutTotlGrid', '지적사항 중, 확인서 발행건수 집계')"
                                    >
                                        엑셀 다운로드
                                    </button>
                                </div>
                            </strong>
                        </div>
                        <div class="ib_wrap">
                            <div id="extStatsSheetTable2" class="ibsheet_table"></div>
                        </div>

                        <div class="button_box">
                            <strong>
                                지적사항 분류체계별  확인서 발행건수/벌점집계
                                <div class="fr">
                                    <button
                                        type="button"
                                        class="btn btn_sm btn_excel"
                                        @click="fn_exportExcel('poutDemGrid', '지적사항 분류체계별_확인서 발행건수/벌점집계')"
                                    >
                                        엑셀 다운로드
                                    </button>
                                </div>
                            </strong>
                        </div>
                        <div class="ib_wrap">
                            <div id="extStatsSheetTable3" class="ibsheet_table"></div>
                        </div>

                        <div class="table_data mt20">
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        지적사항별 확인서 발행건수
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('poutTotlPieChart', '지적사항별 확인서 발행건수')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <PieChart id="poutTotlPieChart" :data="poutTotlPieChartData" :options="poutMatrPieChartOptions" class="barchart" ref="poutTotlPieChart"></PieChart>    
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        지적사항별 벌점집계
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('poutDemPieChart', '지적사항별 벌점집계')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <PieChart id="poutDemPieChart" :data="poutDemPieChartData" :options="poutMatrPieChartOptions" class="barchart" ref="poutDemPieChart"></PieChart>    
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
    import { ExtrnlChckInsttFreqRate, ExtrnlChckPoutMatrTotl, ExtrnlChckPoutMatrDem } from '@/pages/common/data/StatisticsList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import loader from '@ibsheet/loader'

    import PieChart from '@component/chart/PieChart.vue';
    import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

    import axios from 'axios'


    let SHEET_ID = ''; 

    export default {
        name: 'ExtrnlChckStatsView',
        components: {
            Breadcrumb,
            DatePickerRange,
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
                // mode: 'inherited',  // 상속모드

                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정
                tabs: ['점검기관 분석', '지적사항/벌점분석'], // tab name

                /* chart option */
                plugins: [ChartJSPluginDatalabels],

                /* Grid option */
                freqRateGrid  : {
                    data : null,
                    options : {},
                },
                poutTotlGrid  : {
                    data : null,
                    options : {},
                },
                poutDemGrid  : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    freqRate: {
                        freqRateLbl: [],
                        freqRateData: [],
                    },
                    poutTotl: {
                        poutTotlLbl: [],
                        poutTotlData: [],
                    },
                    poutDem: {
                        poutDemLbl: [],
                        poutDemData: [],
                    }
                },

                /** searchInfo */
                search: {
                    freqRate: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    poutTotl: {
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

                /* 점검기관별 점검비율 차트 */
                freqRatePieChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                freqRatePieChartOptions: {
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

                /* 지적사항별 확인서 발행건수, 지적사항별 벌점집계 차트 */
                poutTotlPieChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                poutDemPieChartData: {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: ['#0D8AC2', '#FAA719', '#7FD7ED', '#054F6A', '#BCBBC0', '#3DB9B7', '#B9CF2E', '#FAEA5D', '#67829B', '#DBAC32'],
                            borderWidth: 0,
                        },
                    ]
                },
                poutMatrPieChartOptions: {
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
                /* 점검기관 분석 */

                let options1 = ExtrnlChckInsttFreqRate.options;
                options1.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_insttFreqRate();
                    },
                }

                loader.createSheet({
                    el: 'extStatsSheetTable1',
                    data: [],
                    options: options1
                }).then((sheet) => {
                    this.freqRateGrid.data  = sheet
                });

                /* 지적사항 및 벌점분석 */ 
                let options2 = ExtrnlChckPoutMatrTotl.options;
                let options3 = ExtrnlChckPoutMatrDem.options;
                options2.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_poutCntTtlDem();
                    },
                }
                loader.createSheet({
                    el: 'extStatsSheetTable2',
                    data: [],
                    options: options2
                }).then((sheet) => {
                    this.poutTotlGrid.data  = sheet
                });
                loader.createSheet({
                    el: 'extStatsSheetTable3',
                    data: [],
                    options: options3
                }).then((sheet) => {
                    this.poutDemGrid.data = sheet
                });
            },


            fn_clearSearch: function (type) {
                if(type == "F"){
                    this.search.freqRate.searchMngtType  = '';
                    this.search.freqRate.searchProjectNm = null;
                    this.search.freqRate.searchTermType  = '1';
                    this.search.freqRate.searchMonthType = '1';
                    this.search.freqRate.searchDate      = [null, null],
                    this.search.freqRate.searchStartDt   = null,
                    this.search.freqRate.searchEndDt     = null,

                    this.freqRateGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("F");
                } else if(type == "P"){
                    this.search.poutTotl.searchMngtType  = '';
                    this.search.poutTotl.searchProjectNm = null;
                    this.search.poutTotl.searchTermType  = '1';
                    this.search.poutTotl.searchMonthType = '1';
                    this.search.poutTotl.searchDate      = [null, null],
                    this.search.poutTotl.searchStartDt   = null,
                    this.search.poutTotl.searchEndDt     = null,
                    
                    this.poutTotlGrid.data.loadSearchData({
                        data : null
                    });
                    this.poutDemGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("P");
                }
            },

            fn_clearChart: function (type) {
               if(type == "F"){
                    this.chartData.freqRate.freqRateLbl  = [];
                    this.chartData.freqRate.freqRateData = [];

                    this.freqRatePieChartData.labels           = [];
                    this.freqRatePieChartData.datasets[0].data = [];

                    this.$refs.freqRatePieChart.renderChartData();
                } else if(type == "P"){
                    this.chartData.poutTotl.poutTotlLbl  = [];
                    this.chartData.poutTotl.poutTotlData = [];
                    this.chartData.poutDem.poutDemLbl  = [];
                    this.chartData.poutDem.poutDemData = [];
                    
                    this.poutTotlPieChartData.labels           = [];
                    this.poutTotlPieChartData.datasets[0].data = [];
                    this.poutDemPieChartData.labels            = [];
                    this.poutDemPieChartData.datasets[0].data  = [];

                    this.$refs.poutTotlPieChart.renderChartData();
                    this.$refs.poutDemPieChart.renderChartData();
                }
            },

            fn_initMonthType: function (type) {
                // console.log("this.search.freqRate ======== %o", this.search.freqRate);

                if(type == "F"){
                    if(this.search.freqRate.searchTermType  == '1' && this.search.freqRate.searchMonthType != null){
                        this.search.freqRate.searchMonthType = null;
                    } else if(this.search.freqRate.searchTermType  == '2' && this.search.freqRate.searchMonthType == null){
                        this.search.freqRate.searchMonthType = '1';
                        this.search.freqRate.searchDate      = [null, null];
                        this.search.freqRate.searchStartDt   = null;
                        this.search.freqRate.searchEndDt     = null;
                    }
                } else if(type == "P"){
                    if(this.search.poutTotl.searchTermType  == '1' && this.search.poutTotl.searchMonthType != null){
                        this.search.poutTotl.searchMonthType = null;
                    } else if(this.search.poutTotl.searchTermType  == '2' && this.search.poutTotl.searchMonthType == null){
                        this.search.poutTotl.searchMonthType = '1';
                        this.search.poutTotl.searchDate      = [null, null];
                        this.search.poutTotl.searchStartDt   = null;
                        this.search.poutTotl.searchEndDt     = null;
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

            fn_insttFreqRate : async function(){
                // console.log("this.search.freqRate *************  %o", this.search.freqRate);

                this.fn_clearChart("F");
                
                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/extrnl/inspectionFrequencyRatioInstt/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.freqRate,
                    searchStartDt   : this.search.freqRate.searchDate[0],
                    searchEndDt     : this.search.freqRate.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.freqRateGrid.data.loadSearchData({
                                data: response.data.datas.dlFrequRate,
                            });

                            for(let i=0; i < response.data.datas.dlFrequRate.length; i++) {
                                this.chartData.freqRate.freqRateLbl.push(response.data.datas.dlFrequRate[i].extrnlInsttNm);
                                this.chartData.freqRate.freqRateData.push(response.data.datas.dlFrequRate[i].dnstRate);
                            }

                            this.freqRatePieChartData.labels           = this.chartData.freqRate.freqRateLbl;
                            this.freqRatePieChartData.datasets[0].data = this.chartData.freqRate.freqRateData;

                            this.$refs.freqRatePieChart.renderChartData();
                });
            },

            fn_poutCntTtlDem : async function(){
                // console.log("this.search.poutTotl *************  %o", this.search.poutTotl);

                this.fn_clearChart("P");
                
                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/extrnl/poutMatterCnfrmnPblicteNumTotl/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.poutTotl,
                    searchStartDt   : this.search.poutTotl.searchDate[0],
                    searchEndDt     : this.search.poutTotl.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.poutTotlGrid.data.loadSearchData({
                                data: response.data.datas.dlCnfrmnTotl,
                            });

                            this.poutDemGrid.data.loadSearchData({
                                data: response.data.datas.dlCnfrmnDem,
                            });

                            for(let i=0; i < response.data.datas.dlCnfrmnDem.length; i++) {
                                this.chartData.poutTotl.poutTotlLbl.push(response.data.datas.dlCnfrmnDem[i].poutMatterNm);
                                this.chartData.poutTotl.poutTotlData.push(response.data.datas.dlCnfrmnDem[i].poutMatterRate);

                                this.chartData.poutDem.poutDemLbl.push(response.data.datas.dlCnfrmnDem[i].poutMatterNm);
                                this.chartData.poutDem.poutDemData.push(response.data.datas.dlCnfrmnDem[i].lastDemRate);
                            }

                            this.poutTotlPieChartData.labels           = this.chartData.poutTotl.poutTotlLbl;
                            this.poutTotlPieChartData.datasets[0].data = this.chartData.poutTotl.poutTotlData;

                            this.poutDemPieChartData.labels            = this.chartData.poutDem.poutDemLbl;
                            this.poutDemPieChartData.datasets[0].data  = this.chartData.poutDem.poutDemData;

                            this.$refs.poutTotlPieChart.renderChartData();
                            this.$refs.poutDemPieChart.renderChartData();
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
  padding: 30px 30px 20px;
  height: 438px;
  border: 1px solid #DCDCDC;
}
</style>