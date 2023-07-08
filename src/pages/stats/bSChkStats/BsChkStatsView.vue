<template>
    <div class="wrap">
        <div class="lnb_container on">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />
                <!-- <h2 class="sub_title">통계분석 > BS점검 현황</h2> -->
                <div class="lst_tabs">
                    <ul class="">
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                    </ul>
                </div>

                <div class="tab_area" v-show="currentTab == 0">
                    <div class="lookup_box multi_line" v-if="mode !== 'inherited'">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.bsDefPrcs.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.bsDefPrcs.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('D')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_bsDefPrcs()">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="inner">
                        <div class="button_box">
                            <strong>BS 점검 요약</strong>
                        </div>
                                    
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="10%">
                                    <col width="*">
                                    <col width="10%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>총 결함건수</th>
                                        <td>{{infoData.bsTotlCnt}}건</td>
                                        <th>결함건수(세대당)</th>
                                        <td>{{infoData.hoCnfmCnt}}건</td>
                                    </tr>
                                    <tr>
                                        <th>처리건수</th>
                                        <td>{{infoData.bsPrcsCnt}}건</td>
                                        <th>결함처리율</th>
                                        <td>{{infoData.bsPrcsRate}}%</td>
                                    </tr>
                                    <tr>
                                        <th>잔여건수</th>
                                        <td>{{infoData.bsRemnCnt}}건</td>
                                        <th>잔여건수(세대당)</th>
                                        <td>{{infoData.hoRemnCnt}}건</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="button_box">
                            <strong>
                                결함처리현황 (처리율 저조 공종순)
                                <div class="fr">
                                    <button
                                        type="button"
                                        class="btn btn_sm btn_excel"
                                        @click="fn_exportExcel('conReqCostGrid', '결함처리현황 (처리율 저조 공종순)')"
                                    >
                                        엑셀 다운로드
                                    </button>
                                </div>
                            </strong>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="bsStatsSheetTable1" class="ibsheet_table"></div>
                        </div>
                        <p class="table_message">* 환산계수: 58타입이하 – 1.2 / 59~83타입 – 1.1 / 84~98타입 – 1.0 / 99~118타입 – 0.9 / 119타입 이상 – 0.8</p>

                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 1">
                    <div class="lookup_box multi_line" v-if="mode !== 'inherited'">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.bsPrtnrCur.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.bsPrtnrCur.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('P')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_bsPrtnrCur()">검색</button>
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
                                        협력업체별 현황(결함건수가 많은상위 9개 업체 중 잔여건이 많은 순)
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('bsPrtnrCurGrid', '협력업체별 현황')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="bsStatsSheetTable2" class="ibsheet_table"></div>
                                    </div>
                                    <p class="table_message">* 환산계수: 58타입이하 – 1.2 / 59~83타입 – 1.1 / 84~98타입 – 1.0 / 99~118타입 – 0.9 / 119타입 이상 – 0.8</p>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        잔여건 많은 순 막대그래프
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('bsPrtnrCurChart', '협력업체별 현황')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="bsPrtnrCurChart" :data="bsPrtnrCurChartData" :options="bsPrtnrCurChartOptions" class="barchart" ref="bsPrtnrCurChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 2">
                    <div class="lookup_box multi_line" v-if="mode !== 'inherited'">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.bsWorkTypeCur.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.bsWorkTypeCur.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('W')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_bsWorkTypeCur()">검색</button>
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
                                        공종별 현황(결함건수가 많은 상위 9개 결함공종 중 잔여건이 많은 순)
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('bsWorkTypeCurGrid', '공종별 현황')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="bsStatsSheetTable3" class="ibsheet_table"></div>
                                    </div>
                                    <p class="table_message">* 환산계수: 58타입이하 – 1.2 / 59~83타입 – 1.1 / 84~98타입 – 1.0 / 99~118타입 – 0.9 / 119타입 이상 – 0.8</p>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        잔여건 많은 순 막대그래프
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('bsWorkTypeCurChart', '공종별 현황')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="bsWorkTypeCurChart" :data="bsWorkTypeCurChartData" :options="bsWorkTypeChartOptions" class="barchart" ref="bsWorkTypeCurChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 3">
                    <div class="lookup_box multi_line" v-if="mode !== 'inherited'">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="6%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.bsMajorWork.searchMngtType" class="form_control">
                                                <option value="" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in advancedInfo.mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }}
                                                </option>
                                            </select>
                                            <input v-model="search.bsMajorWork.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch('M')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_bsMajorWork()">검색</button>
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
                                        공종별 현황(결함건수가 많은 상위 9개 주공종 중 잔여건이 많은 순)
                                        <div class="fr">
											<button
												type="button"
												class="btn btn_sm btn_excel"
												@click="fn_exportExcel('bsMajorWorkGrid', '공종별 현황(결함건수가 많은 상위 9개 주공종 중 잔여건이 많은 순)')"
											>
												엑셀 다운로드
											</button>
										</div>
                                    </strong>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="bsStatsSheetTable4" class="ibsheet_table"></div>
                                    </div>
                                    <p class="table_message">* 환산계수: 58타입이하 – 1.2 / 59~83타입 – 1.1 / 84~98타입 – 1.0 / 99~118타입 – 0.9 / 119타입 이상 – 0.8</p>
                                </div>
                            </div>
                            <div class="move_box w50">
                                <div class="move_box_inner">
                                    <strong class="data_tit">
                                        잔여건 많은 순 막대그래프
                                        <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('bsMajorWorkChart', '공종별 현황(결함건수가 많은 상위 9개 주공종 중 잔여건이 많은 순)')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                    </strong>
                                    <div class="">
                                        <BarChart id="bsMajorWorkChart" :data="bsMajorWorkChartData" :options="bsWorkTypeChartOptions" class="barchart" ref="bsMajorWorkChart"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
        <!-- 주요공종별 결함유형현황 팝업 -->
        <!-- <b-modal id="bsMajorDeftCur" title="주요공종별 결함유형현황" hide-backdrop size="xl" :footer-bg-variant="footerBg" hide-footer @shown="sheetLoad"> -->
        <b-modal id="bsMajorDeftCur" title="주요공종별 결함유형현황" hide-backdrop size="xl" :footer-bg-variant="footerBg" @shown="sheetLoad">
            <template #default>
                <div class="pop_container">
                    <div class="table_data mt20">

                        <div class="move_box w50">
                            <div class="move_box_inner">
                                <strong class="data_tit">도장공사</strong>

                                <!-- ibsheet -->
                                <div class="ib_wrap">
                                    <div id="popBsMajorDefSheet" class="ibsheet_table"></div>
                                </div>
                            </div>
                        </div>
                        <div class="move_box w50">
                            <div class="move_box_inner">
                                <strong class="data_tit">
                                    결함유형별 처리 결과
                                    <div class="fr">
                                            <button
                                                type="button"
                                                class="btn btn_sm btn_darkblue"
                                                @click="fn_chartToImage('bsMajorDeftCurChart', '결함유형별 처리 결과')"
                                            >
                                                <b-icon icon="download" />
                                                다운로드
                                            </button>
                                        </div>
                                </strong>
                                <div class="">
                                    <BarChart id="bsMajorDeftCurChart" :data="bsMajorDeftCurChartData" :options="bsMajorDeftCurChartOptions" class="barchart" ref="bsMajorDeftCurChart"></BarChart>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal> 
    </div>
</template>

<script>
    //import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import { BsDefectsPrcsStatus, BsPartnerCurStatus, BsWorkTypeCurStatus, BsMajorWorkCurStatus, BsMajorWorkDeftCur } from '@/pages/common/data/StatisticsList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import loader from '@ibsheet/loader'

    import BarChart from '@component/chart/BarChart.vue';
    import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

    import axios from 'axios'

    let SHEET_ID = ''; 

    export default {
        name: 'BsChkStatsView',
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
                // mode: 'inherited',  // 상속모드

                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정
                tabs: ['점검요약', '협력업체별', '공종별 현황', '주요 6대 공종'], // tab name

                /* chart option */
                plugins: [ChartJSPluginDatalabels],

                /* Grid option */
                bsDefPrcsGrid  : {
                    data : null,
                    options : {},
                },
                bsPrtnrCurGrid  : {
                    data : null,
                    options : {},
                },
                bsWorkTypeCurGrid  : {
                    data : null,
                    options : {},
                },
                bsMajorWorkGrid  : {
                    data : null,
                    options : {},
                },
                bsWorkDefGrid  : {
                    data : null,
                    options : {},
                },

                /* chart Data */
                chartData: {
                    bsPrtnrCur: {
                        bsPrtnrCurLbl: [],
                        bsPrtnrCurRemn: [],
                    },
                    bsWorkTypeCur: {
                        bsWorkTypeCurLbl: [],
                        bsWorkTypeCurRemn: [],
                        bsWorkTypeCurRate: [],
                    },
                    bsMajorWork: {
                        bsMajorWorkLbl: [],
                        bsMajorWorkRemn: [],
                        bsMajorWorkRate: [],
                    },
                    bsWorkDef: {
                        bsWorkDefLbl: [],
                        bsWorkDefTotl: [],
                        bsWorkDefRemn: [],
                        bsWorkDefRate: [],
                    },
                },

                /** searchInfo */
                search: {
                    bsDefPrcs: {
                        searchMngtType: '',
                        searchProjectNm: '',
                    },
                    bsPrtnrCur: {
                        searchMngtType: '',
                        searchProjectNm: '',
                    },
                    bsWorkTypeCur: {
                        searchMngtType: '',
                        searchProjectNm: '',
                    },
                    bsMajorWork: {
                        searchMngtType: '',
                        searchProjectNm: '',
                    },
                    bsWorkDef: {
                        searchMngtType: '',
                        searchProjectNm: '',
                        searchMidCodeId: '',
                    },
                },
                infoData : {
                    bsTotlCnt : '0',
                    hoCnfmCnt : '0',
                    bsPrcsCnt : '0',
                    bsPrcsRate : '0',
                    bsRemnCnt : '0',
                    hoRemnCnt : '0',
                },

                /* 프로젝트 구분 */
                advancedInfo: {
                    mngtType: [],
                },
                


                /* 협력업체별 현황 - 잔여건 많은 순 막대그래프 */
                bsPrtnrCurChartData: {
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
                bsPrtnrCurChartOptions: {
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

                bsWorkTypeCurChartData: {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '처리율(%)',
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
                            }
                        },
                        {
                            type: 'bar',
                            label: '잔여건수',
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
                                borderWidth: 1,
                                barThickness: 1,
                            }
                        },
                        
                    ]
                },

                bsMajorWorkChartData: {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '처리율(%)',
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
                            }
                        },
                        {
                            type: 'bar',
                            label: '잔여건수',
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
                                borderWidth: 1,
                                barThickness: 1,
                            }
                        },
                        
                    ]
                },

                bsWorkTypeChartOptions: {
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
                                if(item.datasetIndex != 0) { // 처리율 제외한 tooltip return
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
                                stepSize: 10,
                                min: 0,
                                max: 100
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
                                // stepSize: 50,
                                // min: 0,
                                // max: 500,
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
                            gridLines: {
                                display: false
                            },
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },


                bsMajorDeftCurChartData : {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'rightAlign',
                            type: 'line',
                            label: '비중(%)',
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
                },
                bsMajorDeftCurChartOptions: {
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
                                // console.log(item, data);
                                /* legend click 시 비중 data set */
                                data.datasets[item.datasetIndex].legendstate = item.hidden; // legend display state 저장
                                // let copy_publish = _.cloneDeep(data_publish);
                                // let copy_delay = _.cloneDeep(data_delay);

                                /*
                                if(data.datasets[1].label === '지연 건수' && data.datasets[1].legendstate || data.datasets[2].label === '발행 건수' && data.datasets[2].legendstate) { 
                                    // 발행건수, 지연건수 hidden = true 인 경우
                                    
                                    data.datasets[0].data.map((item, idx) => {
                                        data.datasets[0].data[idx] = 0;
                                    })
                                }
                                
                                else{
                                    data.datasets[0].data.map((item, idx) => {
                                        data.datasets[0].data[idx] = ( copy_delay[idx]/(copy_publish[idx] + copy_delay[idx]) * 100 ).toFixed(2);
                                    })
                                }
                                */
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
                                // stepSize: 100,
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
                /* BS점검 요약, 결함처리현황  */
                let options1 = BsDefectsPrcsStatus.options;
                options1.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_bsDefPrcs();
                    },
                }
                loader.createSheet({
                    el: 'bsStatsSheetTable1',
                    data: [],
                    options: options1
                }).then((sheet) => {
                    this.bsDefPrcsGrid.data  = sheet
                });
                
                /* 협력업체별 현황(결함건수가 많은상위 9개 업체 중 잔여건이 많은 순) */ 
                let options2 = BsPartnerCurStatus.options;
                options2.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_bsPrtnrCur();
                    },
                }
                loader.createSheet({
                    el: 'bsStatsSheetTable2',
                    data: [],
                    options: options2
                }).then((sheet) => {
                    this.bsPrtnrCurGrid.data  = sheet
                });

                /* 공종별 현황(결함건수가 많은 상위 9개 결함공종 중 자연건이 많은 순) */ 
                let options3 = BsWorkTypeCurStatus.options;
                options3.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_bsWorkTypeCur();
                    },
                }
                loader.createSheet({
                    el: 'bsStatsSheetTable3',
                    data: [],
                    options: options3
                }).then((sheet) => {
                    this.bsWorkTypeCurGrid.data = sheet
                });
                
                /* 공종별 현황(결함건수가 많은 상위 9개 주공종 중 자연건이 많은 순) */
                let options4 = BsMajorWorkCurStatus.options;
                options4.Events = {
                    onRenderFirstFinish: (event) => {
                        this.fn_bsMajorWork(event);
                    },
                    onAfterClick: event => {
                        this.chartData.bsWorkDef.bsWorkDefLbl  = [];
                        this.chartData.bsWorkDef.bsWorkDefTotl = [];
                        this.chartData.bsWorkDef.bsWorkDefRemn  = [];
                        this.chartData.bsWorkDef.bsWorkDefRate = [];
                            
                        this.bsMajorDeftCurChartData.labels           = [];
                        this.bsMajorDeftCurChartData.datasets[0].data = [];
                        this.bsMajorDeftCurChartData.datasets[1].data = [];
                        this.bsMajorDeftCurChartData.datasets[2].data = [];

                        this.$root.$emit('bv::show::modal', 'bsMajorDeftCur');
                    }
                }
                loader.createSheet({
                    el: 'bsStatsSheetTable4',
                    data: [],
                    options: options4
                }).then((sheet) => {
                    this.bsMajorWorkGrid.data = sheet
                });
            },

            fn_clearSearch: function (type) {
                if(type == "D"){
                    this.search.bsDefPrcs.searchMngtType  = '';
                    this.search.bsDefPrcs.searchProjectNm = null;

                    this.bsDefPrcsGrid.data.loadSearchData({
                        data : null
                    });

                } else if(type == "P"){
                    this.search.bsPrtnrCur.searchMngtType  = '';
                    this.search.bsPrtnrCur.searchProjectNm = null;
                    
                    this.bsPrtnrCurGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("P");
                } else if(type == "W"){
                    this.search.bsWorkTypeCur.searchMngtType  = '';
                    this.search.bsWorkTypeCur.searchProjectNm = null;
                    
                    this.bsWorkTypeCurGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("W");
                } else if(type == "M"){
                    this.search.bsMajorWork.searchMngtType  = '';
                    this.search.bsMajorWork.searchProjectNm = null;
                    
                    this.bsMajorWorkGrid.data.loadSearchData({
                        data : null
                    });

                    this.fn_clearChart("T");
                }
            },

            fn_clearChart: function (type) {
               if(type == "P"){
                    this.chartData.bsPrtnrCur.bsPrtnrCurLbl   = [];
                    this.chartData.bsPrtnrCur.bsPrtnrCurRemn  = [];

                    this.bsPrtnrCurChartData.labels           = [];
                    this.bsPrtnrCurChartData.datasets[0].data = [];

                    // this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.max      = 1000;
                    // this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 100;

                    this.$refs.bsPrtnrCurChart.renderChartData();
                } else if(type == "W"){
                    this.chartData.bsWorkTypeCur.bsWorkTypeCurLbl  = [];
                    this.chartData.bsWorkTypeCur.bsWorkTypeCurRemn = [];
                    this.chartData.bsWorkTypeCur.bsWorkTypeCurRate = [];
                    
                    this.bsWorkTypeCurChartData.labels             = [];
                    this.bsWorkTypeCurChartData.datasets[0].data   = [];
                    this.bsWorkTypeCurChartData.datasets[1].data   = [];

                    // this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.max      = 50;
                    // this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5;

                    this.$refs.bsWorkTypeCurChart.renderChartData();
                } else if(type == "M"){
                    this.chartData.bsMajorWork.bsMajorWorkLbl  = [];
                    this.chartData.bsMajorWork.bsMajorWorkRemn = [];
                    this.chartData.bsMajorWork.bsMajorWorkRate = [];
                    
                    this.bsMajorWorkChartData.labels           = [];
                    this.bsMajorWorkChartData.datasets[0].data = [];
                    this.bsMajorWorkChartData.datasets[1].data = [];

                    // this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.max      = 50;
                    // this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5;

                    this.$refs.bsMajorWorkChart.renderChartData();
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

            sheetLoad() {
                /* 주요공종별 결함유형현황 */
                let options5 = BsMajorWorkDeftCur.options;

                options5.Events = {
                    // onRenderFirstFinish: (event) => { this.fn_popMajorWorkDef(event.row)},
                    onRenderFirstFinish: this.fn_popMajorWorkDef,
                }
                
                loader.createSheet({
                    el: 'popBsMajorDefSheet',
                    data: [],
                    options: options5
                }).then((sheet) => {
                    this.bsWorkDefGrid.data = sheet
                });
            },

            fn_bsDefPrcs : async function(){
                // console.log(" search.bsDefPrcs *************  %o", this.search.bsDefPrcs);

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/bsChk/bsInsptSummary/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.bsDefPrcs,
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.bsDefPrcsGrid.data.loadSearchData({
                                data: response.data.datas.dlbsDefPrcs,
                            });

                            this.infoData = response.data.datas.dlBsInspt;
                });
            },

            fn_bsPrtnrCur : async function(){
                // console.log(" search.bsPrtnrCur *************  %o", this.search.bsPrtnrCur);

                this.fn_clearChart("P");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/bsChk/bsPartnerCurStatus/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.bsPrtnrCur,
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.bsPrtnrCurGrid.data.loadSearchData({
                                data: response.data.datas.dlBsPrtnrCur,
                            });

                            for(let i=0; i < response.data.datas.dlBsPrtnrCur.length; i++) {
                                this.chartData.bsPrtnrCur.bsPrtnrCurLbl.push(response.data.datas.dlBsPrtnrCur[i].tradeNm);
                                this.chartData.bsPrtnrCur.bsPrtnrCurRemn.push(response.data.datas.dlBsPrtnrCur[i].bsRemnCnt);
                            }

                            this.bsPrtnrCurChartData.labels           = this.chartData.bsPrtnrCur.bsPrtnrCurLbl;
                            this.bsPrtnrCurChartData.datasets[0].data = this.chartData.bsPrtnrCur.bsPrtnrCurRemn;

                            let mathStepSize = (Number(response.data.datas.dlBsPrtnrCur[0].bsRemnCnt) / 10).toFixed(0);
                            this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlBsPrtnrCur[0].bsRemnCnt);

                            if(response.data.datas.dlBsPrtnrCur != null){
                                if( mathStepSize > 5000) {
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.bsPrtnrCurChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.bsPrtnrCurChart.renderChartData();
                });
            },

            fn_bsWorkTypeCur : async function(){
                // console.log(" search.bsWorkTypeCur *************  %o", this.search.bsWorkTypeCur);

                this.fn_clearChart("W");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/bsChk/bsWorkTypeCurStatus/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.bsWorkTypeCur,
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.bsWorkTypeCurGrid.data.loadSearchData({
                                data: response.data.datas.dlBsWorkTypeCur,
                            });

                            for(let i=0; i < response.data.datas.dlBsWorkTypeCur.length; i++) {
                                this.chartData.bsWorkTypeCur.bsWorkTypeCurLbl.push(response.data.datas.dlBsWorkTypeCur[i].midName);
                                this.chartData.bsWorkTypeCur.bsWorkTypeCurRate.push(response.data.datas.dlBsWorkTypeCur[i].bsPrcsRate);
                                this.chartData.bsWorkTypeCur.bsWorkTypeCurRemn.push(response.data.datas.dlBsWorkTypeCur[i].bsRemnCnt);
                            }

                            this.bsWorkTypeCurChartData.labels           = this.chartData.bsWorkTypeCur.bsWorkTypeCurLbl;
                            this.bsWorkTypeCurChartData.datasets[0].data = this.chartData.bsWorkTypeCur.bsWorkTypeCurRate;
                            this.bsWorkTypeCurChartData.datasets[1].data = this.chartData.bsWorkTypeCur.bsWorkTypeCurRemn;

                            let mathStepSize = (Number(response.data.datas.dlBsWorkTypeCur[0].bsRemnCnt) / 10).toFixed(0);
                            this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlBsWorkTypeCur[0].bsRemnCnt);

                            if(response.data.datas.dlBsWorkTypeCur != null){
                                if( mathStepSize > 5000) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.bsWorkTypeCurChart.renderChartData();
                });
            },

            fn_bsMajorWork : async function(){
                // console.log(" search.bsMajorWork *************  %o", this.search.bsMajorWork);

                this.fn_clearChart("M");

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/bsChk/bsMajorWorkTypeCurStatus/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.bsMajorWork,
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.bsMajorWorkGrid.data.loadSearchData({
                                data: response.data.datas.dlMajorWorkType,
                            });

                            for(let i=0; i < response.data.datas.dlMajorWorkType.length; i++) {
                                this.chartData.bsMajorWork.bsMajorWorkLbl.push(response.data.datas.dlMajorWorkType[i].midName);
                                this.chartData.bsMajorWork.bsMajorWorkRate.push(response.data.datas.dlMajorWorkType[i].bsPrcsRate);
                                this.chartData.bsMajorWork.bsMajorWorkRemn.push(response.data.datas.dlMajorWorkType[i].bsRemnCnt);
                            }

                            this.bsMajorWorkChartData.labels           = this.chartData.bsMajorWork.bsMajorWorkLbl;
                            this.bsMajorWorkChartData.datasets[0].data = this.chartData.bsMajorWork.bsMajorWorkRate;
                            this.bsMajorWorkChartData.datasets[1].data = this.chartData.bsMajorWork.bsMajorWorkRemn;

                            let mathStepSize = (Number(response.data.datas.dlMajorWorkType[0].bsRemnCnt) / 10).toFixed(0);
                            this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlMajorWorkType[0].bsRemnCnt);

                            if(response.data.datas.dlMajorWorkType != null){
                                if( mathStepSize > 5000) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.bsWorkTypeChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.bsMajorWorkChart.renderChartData();
                });
            },


            fn_popMajorWorkDef : async function (event) {
                // console.log(" search.bsWorkDef *************  %o", this.search.bsWorkDef);

                // let focusRow = event.row;
                // const focusRow = event
                const focusRow = this.bsMajorWorkGrid.data.getFocusedRow()

                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                let url = '/sendApi/api/stats/bsChk/bsMajorWorkDefectTypeCurStatus/list';
                let param = {
                    // searchSiteMasterId: this.$store.getters['auth/getSiteMstrId'],
                    // searchProjectId: this.$store.getters['auth/getProjectId'],
                    // searchProjectNm: this.$store.getters['auth/getProjectNm'],
                    ...this.search.bsMajorWork,
                    searchMidCodeId : focusRow.midCodeId,
                    searchSiteMasterId:     this.mode === 'inherited'
                                                ? this.$store.getters['auth/getSiteMstrId']
                                                : undefined,
                };

                await sendPostApi(url, param)
                        .then((response) => {
                            this.bsWorkDefGrid.data.loadSearchData({
                                data: response.data.datas.dlMajorWorkDef,
                            });

                            for(let i=0; i < response.data.datas.dlMajorWorkDef.length; i++) {
                                this.chartData.bsWorkDef.bsWorkDefLbl.push(response.data.datas.dlMajorWorkDef[i].defectTypeNm);
                                this.chartData.bsWorkDef.bsWorkDefRate.push(response.data.datas.dlMajorWorkDef[i].itmPrcsRate);
                                this.chartData.bsWorkDef.bsWorkDefRemn.push(response.data.datas.dlMajorWorkDef[i].itmRemnCnt);
                                this.chartData.bsWorkDef.bsWorkDefTotl.push(response.data.datas.dlMajorWorkDef[i].itmTotlCnt);
                            }

                            this.bsMajorDeftCurChartData.labels           = this.chartData.bsWorkDef.bsWorkDefLbl;
                            this.bsMajorDeftCurChartData.datasets[0].data = this.chartData.bsWorkDef.bsWorkDefRate;
                            this.bsMajorDeftCurChartData.datasets[1].data = this.chartData.bsWorkDef.bsWorkDefRemn;
                            this.bsMajorDeftCurChartData.datasets[2].data = this.chartData.bsWorkDef.bsWorkDefTotl;

                            let mathStepSize = (Number(response.data.datas.dlMajorWorkDef[0].bsRemnCnt) / 10).toFixed(0);
                            this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.max      = Number(response.data.datas.dlMajorWorkDef[0].bsRemnCnt);

                            if(response.data.datas.dlMajorWorkDef != null){
                                if( mathStepSize > 5000) {
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.stepSize = 10000;
                                } else if( mathStepSize > 1000 && mathStepSize <= 5000) {
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.stepSize = 5000;
                                } else if( mathStepSize > 500 && mathStepSize <= 1000) {
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.stepSize = 1000;
                                } else if( mathStepSize > 100 && mathStepSize <= 500) {
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.stepSize = 500;
                                } else if( mathStepSize > 50 && mathStepSize <= 100) {
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.stepSize = 100;
                                } else if( mathStepSize > 10 && mathStepSize <= 50) {
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.stepSize = 50;
                                } else if( mathStepSize > 5 && mathStepSize <= 10) {
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.max = 100;
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.stepSize = 10;
                                } else {
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.max = 50;
                                    this.bsMajorDeftCurChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                                }
                            }

                            this.$refs.bsMajorDeftCurChart.renderChartData();
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