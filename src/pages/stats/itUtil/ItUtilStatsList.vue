<template>
    <div class="wrap">
        <!-- <router-view/> -->
        <div class="lnb_container on" style="min-height: 0">
            <div class="tab_contents">
                <Breadcrumb :currentPath="$route.fullPath" />
                <div class="lst_tabs">
                </div>
                <div class="tab_area">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="5%">
                                <col width="35%">
                            </colgroup>
                            <tbody>
                                <tr v-if="mode !== 'inherited'">
                                    <th>프로젝트명</th>
                                    <td>
                                        <div class="form_area">
                                            <select v-model="search.searchMngtType" class="form_control">
                                                <option :value="null" > {{ '전체' }} </option>
                                                <option 
                                                    v-for="projectType in mngtType"
                                                    :key="projectType.codeVal"
                                                    :value="projectType.codeVal"
                                                >
                                                    {{ projectType.codeNameKr }} 
                                                </option>
                                            </select>
                                            <input v-model="search.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" @keyup.enter="siteInfoView()"/>
                                        </div>
                                    </td>
                                    <td class="ar vat">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch()">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="siteInfoView()">검색</button>
                                    </td>     
                                </tr>
                                <tr>
                                    <th class="vat">조회기간</th>
                                    <td>
                                        <div class="">
                                            <label class="input_radio" for="searchType1">
                                                <input type="radio" id="searchType1" value="select" v-model="search.type" @click="search.date = [null,null]">
                                                <span class="label_text">월별</span>
                                            </label>
                                            <label class="input_radio" for="searchType2">
                                                <input type="radio" id="searchType2" value="input" v-model="search.type" @click="search.selectMonth = '1'">
                                                <span class="label_text">기간지정</span>
                                            </label>
                                        </div>

                                        <div class="pt10">
                                            <label class="input_radio" for="monthType01">
                                                <input type="radio" id="monthType01" name="searchMonth" :value="'1'"
                                                    v-model="search.selectMonth" :disabled="search.type == 'input'">
                                                <span class="label_text">1개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType02">
                                                <input type="radio" id="monthType02" name="searchMonth" :value="'3'"
                                                    v-model="search.selectMonth" :disabled="search.type == 'input'">
                                                <span class="label_text">3개월</span>
                                            </label>
                                            <label class="input_radio" for="monthType03">
                                                <input type="radio" id="monthType03" name="searchMonth" :value="'6'"
                                                    v-model="search.selectMonth" :disabled="search.type == 'input'">

                                                <span class="label_text">6개월</span>
                                            </label>
                                            <label class="input_radio mr10" for="monthType04">
                                                <input type="radio" id="monthType04" name="searchMonth" :value="'12'"
                                                    v-model="search.selectMonth" :disabled="search.type == 'input'">
                                                <span class="label_text">12개월</span>
                                            </label>
                                            <date-picker-range ref="searchDate" v-model="search.date" :format="'YYYYMMDD'" v-if="search.type == 'input'" />
                                        </div>
                                    </td>
                                    <td class="ar vat" v-if="mode === 'inherited'">
                                        <button type="button" class="btn_reset" @click="fn_clearSearch()">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="siteInfoView()">검색</button>
                                    </td>    
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="inner">
                        <!-- <div class="button_box">
                            <div class="fl">
                                <button type="button" class="btn btn_sm btn_excel">엑셀 다운로드</button>
                            </div>
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkgray" v-b-modal.ScoringStandard>점수 산정 기준</button>
                                <button type="button" class="btn btn_sm btn_darkgray">저장</button>
                            </div>
                        </div> -->

                        <!-- ibsheet -->
                        <div class="ib_wrap" :style="{height: 'calc(100vh - 670px)'}">
                            <div id="siteInfoTable" class="ibsheet_table" style="height: 100%"></div>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap" >
                            <div id="menuInfoTable1" class="ibsheet_table"></div>
                        </div>

                        <div class="ib_wrap">
                            <div id="menuInfoTable2" class="ibsheet_table"></div>
                        </div>

                        <div class="ib_wrap">
                            <div id="allMenuTable" class="ibsheet_table"></div>
                        </div>

                    </div>   <!-- // inner -->
                </div>  <!-- // tab_area -->

            </div>  <!-- // tab_contents -->
        </div>

        <!-- 점수산정 기준 팝업 -->
        <b-modal id="ScoringStandard" title="점수산정 기준" 
            hide-backdrop size="lg" @shown="sheetLoad" static
            :footer-bg-variant="footerBg" >
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 전사평균 및 사업본부 평균</strong>
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print">출력</button>
                        </div>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="10%">
                                <col width="15%">
                                <col width="25%">
                                <col width="35%">
                                <col width="12%">
                                <col width="12%">
                                <col width="13%">
                                <col width="15%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>분류</th>
                                    <th>세부 점검사항</th>
                                    <th>세부평가 기준</th>
                                    <th colspan="2">기준</th>
                                    <th>건별 수<br>(0점)</th>
                                    <th>배점<br>(최대점수)</th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="5">1</td>
                                    <td rowspan="5">전체 메뉴 활용</td>
                                    <td rowspan="5" class="al">활동 게시판<br>건수 Check</td>
                                    <td rowspan="5" class="al">활용된 메뉴 수 / 전체 메뉴 수<br>(게시물이 1개 이상 올라온 게시판을 활용된 게시판으로 판단함)</td>
                                    <td>70.0%</td>
                                    <td>이하(%)</td>
                                    <td>30.0점</td>
                                    <td rowspan="5">50.0점</td>
                                    <td rowspan="5">토건 비고1</td>
                                </tr>
                                <tr>
                                    <td>80.0%</td>
                                    <td>이하(%)</td>
                                    <td>35.0점</td>
                                </tr>
                                <tr>
                                    <td>90.0%</td>
                                    <td>이하(%)</td>
                                    <td>40.0점</td>
                                </tr>
                                <tr>
                                    <td>95.0%</td>
                                    <td>이하(%)</td>
                                    <td>45.0점</td>
                                </tr>
                                <tr>
                                    <td>100.0%</td>
                                    <td>이하(%)</td>
                                    <td>50.0점</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>누적 입력 건수</td>
                                    <td class="al">누적 입력<br>게시판의 각 게시물 개별 Count</td>
                                    <td class="al">누적 입력 건수</td>
                                    <td colspan="2">누적 입력 건수</td>
                                    <td>30.0점</td>
                                    <td>30.0점</td>
                                    <td>토건 비고2</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>평균 입력 건수</td>
                                    <td class="al">평균 입력<br>게시판의 월평균 입력 건수 Count</td>
                                    <td class="al">최근 3개월 평균 입력 건수 :<br>해당 게시판의 3개월간 입력된 게시물 총 개수 ÷ 3개월 ÷ 게시판 개수</td>
                                    <td colspan="2">최근 3개월<br>평균 입력 건수</td>
                                    <td>30.0점</td>
                                    <td>30.0점</td>
                                    <td>토건 비고3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- <div class="button_box">
                        <strong>2. 대상 메뉴 설정</strong>
                    </div>
                    <div class="ib_wrap">
                        <div id="popsheetTable" class="ibsheet_table"></div>
                    </div> -->
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">선택</b-button> -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import {StatisticsItuses, StatisticsItuses2,StatisticsItuses3,StatisticsItuses4} from '@/pages/common/data/StatisticsList'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import loader from '@ibsheet/loader'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import { sendPostApi }  from '@/apis/common';
    // import {ScoringStandardMenu } from '@/pages/common/data/PopupList.js'
    import axios from 'axios'
    
    let SHEET_ID = ''; 

    export default {
        name: 'ItUtilStatsList',
        components: {
            Breadcrumb,
            DatePickerRange
        },
        computed: {
            // store 정보에 따른 mode 정보 변경
            mode: function () {
                return ['GADT_0000000001', 'GADT_0000000002'].includes(this.$store.getters['auth/getGroupAuthDtlId']) ? '' : 'inherited'
            }
        },
        data() {
            return {
                footerBg: 'transparent',
                /** searchInfo */
                search : {
                    type : 'select',        // 기간 선택 타입 select(선택) / input(입력)
                    selectMonth : '1',      // 선택 개월수
                    date : [null,null],     // 입력 날짜
                    searchMngtType : null,
                    searchProjectNm : '',
                },
                 /* 프로젝트 구분 */
                mngtType : [],
                // 조회
                searchStartDt : '',         // 시작일
                searchEndDt : '',           // 종료일
                /* 시트 */
                siteInfoSheet : null,       // 현장 정보
                menuInfoSheet1 : null,      // (추후 사용예정)
                menuInfoSheet2 : null,      // 메뉴 정보
            }
        },
        mounted() {
            this.fn_fetchAdvanceInfo()

            // let data3 = StatisticsItuses3.data;
            let options3 = StatisticsItuses3.options;

            loader.createSheet({
                el: 'menuInfoTable2',
                data: [],
                options: options3,
            }).then((sheet) => {
                this.menuInfoSheet2 = sheet
            });


            let data = StatisticsItuses.data;
            let options = StatisticsItuses.options;

            options.Events = {
                onRenderFirstFinish: () => {
                    this.siteInfoView() // 협력사 리스트 조회
                },
            }

            loader.createSheet({
                el: 'siteInfoTable',
                data: data,
                options: options,
            }).then((sheet) => {
                this.siteInfoSheet = sheet
            });

            let data2 = StatisticsItuses2.data;
            let options2 = StatisticsItuses2.options;


            loader.createSheet({
                el: 'menuInfoTable1',
                data: data2,
                options: options2,
            })

            let data4 = StatisticsItuses4.data;
            let options4 = StatisticsItuses4.options;

            loader.createSheet({
                el: 'allMenuTable',
                data: data4,
                options: options4,
            })

        },
        beforeDestroy() {
            /* 시트 삭제 */
            if (this.siteInfoSheet)  loader.removeSheet(this.siteInfoSheet)
            if (this.menuInfoSheet2) loader.removeSheet(this.menuInfoSheet2)
        },

        methods: {
            fn_clearSearch(){
                this.search = {
                    type : 'select',        // 기간 선택 타입 select(선택) / input(입력)
                    selectMonth : '1',      // 선택 개월수
                    date : [null,null],     // 입력 날짜
                    searchMngtType : null,
                    searchProjectNm : '',
                }
            },
            async siteInfoView(){
                let url = '/sendApi/api/common/itUtilStats/view';
                let param = {}

                // 프로젝트명
                if(this.mode !== 'inherited'){
                    param["searchMngtType"] = this.search.searchMngtType
                    param["searchProjectNm"] = this.search.searchProjectNm
                }else{
                    param["siteMstrId"] = this.$store.getters['auth/getSiteMstrId']
                }

                // 조회기간
                if(this.search.type == 'select'){
                    param['searchStartDt'] = this.$moment().add(-this.search.selectMonth ,'month').format('YYYYMMDD')
                    param['searchEndDt'] = this.$moment().format('YYYYMMDD')
                }else{
                    param['searchStartDt'] = this.search.date[0]
                    param['searchEndDt'] = this.search.date[1]
                }

                await sendPostApi(url, param).then((data) => {
                    if(typeof data.data.rstList != 'undefined'){
                        this.siteInfoSheet.loadSearchData({
                            data: data.data.rstList
                        });

                        let cnt = data.data.rstList.map(row => row.dataCount).filter(item => item != null || item != '')
                        StatisticsItuses3.data[0].cnt = cnt.reduce((a,b) => (a+b))
                        
                        this.menuInfoSheet2.loadSearchData({
                            data: StatisticsItuses3.data
                        });
                    }
                })
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
                     this.mngtType          = response.data.data
                })
                .catch(error => {
                     console.error(error)
                })
                .then(() => {
                    // console.log("end");
                })
            },
            sheetLoad : function(){
                // let data6 = ScoringStandardMenu.data;
                // let options6 = ScoringStandardMenu.options;

                // loader.createSheet({
                //     el: 'popsheetTable',
                //     data: data6,
                //     options: options6,
                // })
            }
        },
        
   }
</script>