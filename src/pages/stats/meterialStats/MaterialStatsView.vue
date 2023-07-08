<template>
    <div class="wrap">
        <div class="lnb_container on">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />
                <!-- <h2 class="sub_title">통계분석 > 자재관리</h2> -->
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
                                            <select v-model="search.matrBase.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.matrBase.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('B')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_rjtMatrBaseData()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType01">
                                                <input type="radio" id="termType01" name="searchTermType00" value="1" v-model="search.matrBase.searchTermType"
                                                    @click="fn_initMonthType('B')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType02">
                                                <input type="radio" id="termType02" name="searchTermType00" value="2" v-model="search.matrBase.searchTermType"
                                                    @click="fn_initMonthType('B')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType01">
                                                <input type="radio" id="monthType01" name="searchMonthType00" :value="'1'"
                                                    v-model="search.matrBase.searchMonthType" :disabled="search.matrBase.searchTermType=='2'">
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType02">
                                                <input type="radio" id="monthType02" name="searchMonthType00" :value="'2'"
                                                    v-model="search.matrBase.searchMonthType" :disabled="search.matrBase.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType03">
                                                <input type="radio" id="monthType03" name="searchMonthType00" :value="'3'"
                                                    v-model="search.matrBase.searchMonthType" :disabled="search.matrBase.searchTermType=='2'">

                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType04">
                                                <input type="radio" id="monthType04" name="searchMonthType00" :value="'4'"
                                                    v-model="search.matrBase.searchMonthType" :disabled="search.matrBase.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>
                                            <date-picker-range ref="searchDate" v-model="search.matrBase.searchDate" :format="'YYYYMMDD'" v-if="search.matrBase.searchTermType=='2'" />
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
                                        품명 기준 불합격 상위 10개 자재
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_excel"
                                                @click="fn_exportExcel('matrBaseGrid', '품명 기준 불합격 상위 10개 자재')"
                                            >
                                                엑셀 다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="matrStatsSheetTable1" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        품명 기준 불합격 상위 10개 자재
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('matrBaseBarChart', '품명 기준 불합격 상위 10개 자재')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="matrBaseBarChart" :data="matrBaseBarChartData" :options="matrBaseBarChartOptions" class="barchart" ref="matrBaseBarChart"></BarChart>
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
                                            <select v-model="search.matrCmpny.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.matrCmpny.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('C')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_rjtMatrCmpnyData()">검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="termType11">
                                                <input type="radio" id="termType11" name="searchTermType10" value="1" v-model="search.matrCmpny.searchTermType" checked
                                                    @click="fn_initMonthType('C')">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="termType12">
                                                <input type="radio" id="termType12" name="searchTermType10" value="2" v-model="search.matrCmpny.searchTermType"
                                                    @click="fn_initMonthType('C')">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType11">
                                                <input type="radio" id="monthType11" name="searchMonthType10" :value="'1'"
                                                    v-model="search.matrCmpny.searchMonthType" :disabled="search.matrCmpny.searchTermType=='2'" checked>
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType12">
                                                <input type="radio" id="monthType12" name="searchMonthType10" :value="'2'"
                                                    v-model="search.matrCmpny.searchMonthType" :disabled="search.matrCmpny.searchTermType=='2'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType13">
                                                <input type="radio" id="monthType13" name="searchMonthType10" :value="'3'"
                                                    v-model="search.matrCmpny.searchMonthType" :disabled="search.matrCmpny.searchTermType=='2'">
                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType14">
                                                <input type="radio" id="monthType14" name="searchMonthType10" :value="'4'"
                                                    v-model="search.matrCmpny.searchMonthType" :disabled="search.matrCmpny.searchTermType=='2'">
                                                <span class="label_text">12개월</span>
                                            </label>

                                            <date-picker-range ref="searchDate" v-model="search.matrCmpny.searchDate" :format="'YYYYMMDD'" v-if="search.matrCmpny.searchTermType=='2'" />
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
                                        불합격 상위 10개업체(공급&제조)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_excel"
                                                @click="fn_exportExcel('matrCmpnyGrid', '불합격 상위 10개업체(공급&제조)')"
                                            >
                                                엑셀 다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="matrStatsSheetTable2" class="ibsheet_table"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        불합격 상위 10개업체(공급&제조)
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('matrCmpnyBarChart', '불합격 상위 10개업체(공급&제조)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <BarChart id="matrCmpnyBarChart" :data="matrCmpnyBarChartData" :options="matrCmpnyBarChartOptions" class="barchart" ref="matrCmpnyBarChart"></BarChart>
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
    import { MaterialBase, MaterialCmpny } from '@/pages/common/data/StatisticsList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import loader from '@ibsheet/loader'

    import BarChart from '@component/chart/BarChart.vue';
    import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

    import axios from 'axios'

    let SHEET_ID = ''; 

    export default {
        name: 'MaterialStatsView',
        components: {
            Breadcrumb,
            DatePickerRange,
            BarChart,
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
                tabs: ['불량 다발 자재', '불량 다발 업체'], // tab name

                /* chart option */
                plugins: [ChartJSPluginDatalabels],

                /* Grid option */
                matrBaseGrid  : {
                    data : null,
                    options : {},
                },
                matrCmpnyGrid  : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    matrBase: {
                        matrBaseLbl: [],
                        matrBaseData: [],
                    },
                    matrCmpny: {
                        matrCmpnyLbl: [],
                        matrCmpnyData: [],
                    }
                },

                /** searchInfo */
                search: {
                    matrBase: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    },
                    matrCmpny: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchTermType: '1',
                        searchMonthType: '1',
                        searchDate: [null, null],
                        searchStartDt:null,
                        searchEndDt:null,
                    }
                },

                /* 프로젝트 구분 */
                advancedInfo: {
                    mngtType: []
                },

                /* 불량 다발 자재 차트 */
                matrBaseBarChartData: {
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
                matrBaseBarChartOptions: {
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
                                stepSize: 100,
                                min: 0,
                                max: 1000
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

                /* 불량 다발 업체 차트 */
                matrCmpnyBarChartData: {
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
                matrCmpnyBarChartOptions: {
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
                                stepSize: 100,
                                min: 0,
                                max: 1000
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
                /* 불량다발 자재 */

                let options1 = MaterialBase.options;
                options1.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_rjtMatrBaseData();
                    },
                }

                loader.createSheet({
                    el: 'matrStatsSheetTable1',
                    data: [],
                    options: options1
                }).then((sheet) => {
                    this.matrBaseGrid.data  = sheet
                });

                /* 불량 다발 업체 */ 
                let options2 = MaterialCmpny.options;
                options2.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_rjtMatrCmpnyData();
                    },
                }
                loader.createSheet({
                    el: 'matrStatsSheetTable2',
                    data: [],
                    options: options2
                }).then((sheet) => {
                    this.matrCmpnyGrid.data  = sheet
                });
            },

            fn_clearSearch: function (type) {
                if(type == "B"){
                    this.search.matrBase.searchMngtType  = '';
                    this.search.matrBase.searchProjectNm = null;
                    this.search.matrBase.searchTermType  = '1';
                    this.search.matrBase.searchMonthType = '1';
                    this.search.matrBase.searchDate      = [null, null],
                    this.search.matrBase.searchStartDt   = null,
                    this.search.matrBase.searchEndDt     = null,

                    this.matrBaseGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("B");
                } else if(type == "C"){
                    this.search.matrCmpny.searchMngtType  = '';
                    this.search.matrCmpny.searchProjectNm = null;
                    this.search.matrCmpny.searchTermType  = '1';
                    this.search.matrCmpny.searchMonthType = '1';
                    this.search.matrCmpny.searchDate      = [null, null],
                    this.search.matrCmpny.searchStartDt   = null,
                    this.search.matrCmpny.searchEndDt     = null,
                    
                    this.matrCmpnyGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("C");
                }
            },


            fn_clearChart: function (type) {
                if(type == "B"){
                    this.chartData.matrBase.matrBaseLbl   = [];
                    this.chartData.matrBase.matrBaseData  = [];

                    this.matrBaseBarChartData.labels           = [];
                    this.matrBaseBarChartData.datasets[0].data = [];

                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.max      = 1000;
                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;

                    this.$refs.matrBaseBarChart.renderChartData();
                } else if(type == "C"){
                    this.chartData.matrCmpny.matrCmpnyLbl   = [];
                    this.chartData.matrCmpny.matrCmpnyData  = [];

                    this.matrCmpnyBarChartData.labels           = [];
                    this.matrCmpnyBarChartData.datasets[0].data = [];

                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.max      = 1000;
                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;

                    this.$refs.matrCmpnyBarChart.renderChartData();
                }
            },

            fn_initMonthType: function (type) {
                // console.log(type + " === " + this.search.matrBase.searchTermType + "  ****  " + this.search.matrBase.searchMonthType);
                if(type == "B"){
                    if(this.search.matrBase.searchTermType  == '1' && this.search.matrBase.searchMonthType != null){
                        this.search.matrBase.searchMonthType = null;
                    } else if(this.search.matrBase.searchTermType  == '2' && this.search.matrBase.searchMonthType == null){
                        this.search.matrBase.searchMonthType = '1';
                        this.search.matrBase.searchDate      = [null, null];
                        this.search.matrBase.searchStartDt   = null;
                        this.search.matrBase.searchEndDt     = null;
                    }
                } else if(type == "C"){
                    if(this.search.matrCmpny.searchTermType  == '1' && this.search.matrCmpny.searchMonthType != null){
                        this.search.matrCmpny.searchMonthType = null;
                    } else if(this.search.matrCmpny.searchTermType  == '2' && this.search.matrCmpny.searchMonthType == null){
                        this.search.matrCmpny.searchMonthType = '1';
                        this.search.matrCmpny.searchDate      = [null, null];
                        this.search.matrCmpny.searchStartDt   = null;
                        this.search.matrCmpny.searchEndDt     = null;
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

            fn_rjtMatrBaseData : async function(){
                // console.log(" search.matrBase *************  %o", this.search.matrBase);

                this.fn_clearChart("B");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/material/rejectedMaterialBaseItem/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.matrBase,
                    searchStartDt   : this.search.matrBase.searchDate[0],
                    searchEndDt     : this.search.matrBase.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.matrBaseGrid.data.loadSearchData({
                                data: response.data.datas.dlMatrBase,
                            });

                            for(let i=0; i < response.data.datas.dlMatrBase.length; i++) {
                                this.chartData.matrBase.matrBaseLbl.push(response.data.datas.dlMatrBase[i].prdtDtlNm);
                                this.chartData.matrBase.matrBaseData.push(response.data.datas.dlMatrBase[i].rjctCnt);
                            }

                            this.matrBaseBarChartData.labels           = this.chartData.matrBase.matrBaseLbl;
                            this.matrBaseBarChartData.datasets[0].data = this.chartData.matrBase.matrBaseData;

                            // console.log(" matrBase.matrCmpnyData *************  %o", this.chartData.matrBase.matrBaseData);

                            if(response.data.datas.dlMatrBase != null){

                                let mathStepSize = (Number(response.data.datas.dlMatrBase[0].rjctCnt) / 10).toFixed(0);
                                this.matrBaseBarChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlMatrBase[0].rjctCnt);

                                if( mathStepSize > 5000) {
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.matrBaseBarChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.matrBaseBarChart.renderChartData();
                });

            },

            fn_rjtMatrCmpnyData : async function(){
                // console.log(" search.matrCmpny *************  %o", this.search.matrCmpny);

                this.fn_clearChart("C");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/material/rejectedMaterialCompanies/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.matrCmpny,
                    searchStartDt   : this.search.matrCmpny.searchDate[0],
                    searchEndDt     : this.search.matrCmpny.searchDate[1],
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.matrCmpnyGrid.data.loadSearchData({
                                data: response.data.datas.dlMatrCmpny,
                            });

                            for(let i=0; i < response.data.datas.dlMatrCmpny.length; i++) {
                                this.chartData.matrCmpny.matrCmpnyLbl.push(response.data.datas.dlMatrCmpny[i].tradeNm);
                                this.chartData.matrCmpny.matrCmpnyData.push(response.data.datas.dlMatrCmpny[i].rjctCnt);
                            }

                            this.matrCmpnyBarChartData.labels           = this.chartData.matrCmpny.matrCmpnyLbl;
                            this.matrCmpnyBarChartData.datasets[0].data = this.chartData.matrCmpny.matrCmpnyData;

                            // console.log(" matrCmpny.matrCmpnyData *************  %o", this.chartData.matrCmpny.matrCmpnyData);
                            // console.log(" response.data.datas.dlMatrCmpny[0] *************  %o", response.data.datas.dlMatrCmpny[0]);

                            let mathStepSize = (Number(response.data.datas.dlMatrCmpny[0].rjctCnt) / 10).toFixed(0);
                            this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlMatrCmpny[0].rjctCnt);

                            if(response.data.datas.dlMatrCmpny != null){
                                if( mathStepSize > 5000) {
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.matrCmpnyBarChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.matrCmpnyBarChart.renderChartData();
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