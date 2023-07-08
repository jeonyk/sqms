<!--
    업무 : 경영검토
    2022.06.02
 -->
<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
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
                        <col width="4%">
                        <col width="20%">
                        <col width="4%">
                        <col width="20%">
                        <col width="6%">
                        <col width="20%">
                        <col width="*">
                    </colgroup>
                    <tbody>

                        <tr>
                            <th>현황</th>                                        
                            <td>
                                <select v-model="search.mysite.progrsStatus" class="form_control">
                                    <option value="" > {{ '전체' }} </option>
                                    <option
                                        v-for="item in categoryData"
                                        :key="item.codeVal"
                                        :value="item.codeVal"
                                    >
                                        {{ item.codeNameKr }}
                                    </option>
                                </select>
                            </td>
                            <th>제목</th>
                            <td><input type="text" v-model="search.mysite.reviewTitle" class="form_control"></td>
                            <th>데이터기준</th>
                            <td>
                                <date-picker-range v-model="search.mysite.date" :format="'YYYYMMDD'"/>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="searchDataClean('MY')">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData('MY')">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="inner">
                <div class="button_box">
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="creatReview()">생성</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="clickDelete()" >삭제</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap" style="height: calc(100vh - 320px)">
                    <div id="wikMySiteSheet" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div>
        </div>
        <div class="tab_area" v-show="currentTab == 1">
            <div class="lookup_box multi_line">
                <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="10%">
                            <col width="25%">
                            <col width="10%">
                            <col width="25%">
                            <col width="*">
                        </colgroup>
                        <tbody>

                            <tr>
                                <th>현장명</th>
                                <td>
                                    <div class="form_area">
                                        <select v-model="search.allsites.mngtType" class="form_control">
                                            <option value="" > {{ '전체' }} </option>
                                            <option
                                                v-for="item in mngtTypeCode"
                                                :key="item.codeVal"
                                                :value="item.codeVal"
                                            >
                                                {{ item.codeNameKr }}
                                            </option>
                                        </select>
                                        <input type="text" v-model="search.allsites.projNm" class="form_control">
                                    </div>
                                </td>
                                <th>현황</th>                                        
                                <td width="100%">
                                    <select v-model="search.allsites.progrsStatus" class="form_control w100">
                                        <option value="" > {{ '전체' }} </option>
                                        <option
                                            v-for="item in categoryData"
                                            :key="item.codeVal"
                                            :value="item.codeVal"
                                        >
                                            {{ item.codeNameKr }}
                                        </option>
                                    </select>
                                </td>
                                <td class="ar" rowspan="2">
                                    <button type="button" class="btn_reset">초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData('ALL')">검색</button>
                                </td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input type="text" v-model="search.allsites.reviewTitle" class="form_control w100">
                                </td>
                                <th>데이터기준</th>
                                <td>
                                    <date-picker-range v-model="search.allsites.date" :format="'YYYYMMDD'" />
                                </td>
                            </tr>
                        </tbody>
                </table>

            </div>
            <div class="inner">
                <div class="button_box">
                    <strong>현장별 경영검토 보고서 현황</strong>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap" style="height: calc(100vh - 330px)">
                    <div id="wikAllSitesSheet" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div>
        </div>  
    
        <!-- 보고서 생성 팝업 -->
        <ReviewTitlePop :requestTitleParams="requestTitleParams" @responseTitleSaveForm="responseTitleSaveForm"/>

        <!-- 보고서 작성 팝업 -->
        <ReviewDetailPop :requestParams="requestParams" @responseDtlSaveForm="responseDtlSaveForm" />

        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:btn-name="btnNm"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />

   </div>
</template>

<script>
import PopAlert from '@/pages/common/popup/PopAlert.vue' 
import Datepicker from '@component/common/DatePicker.vue'
import DatePickerRange from '@component/common/DatePickerRange.vue'
import loader from '@ibsheet/loader';
import { commonFn } from '@/script/commonFn.js';

import { sendPostApi, requestOptions } from '@/apis/common';
import { reviewMySiteSheet, reviewAllSitesSheet } from '../../common/data/ReviewList' 
import ReviewTitlePop from '@/pages/stats/review/ReviewTitlePop.vue'
import ReviewDetailPop from '@/pages/stats/review/ReviewDetailPop.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    
    let ferstTabCnt = 0;

    export default {
        name: 'ReviewSheet',
        components: {
            PopAlert,
            Datepicker,
            DatePickerRange,
            ReviewTitlePop,
            ReviewDetailPop,
            Breadcrumb
        },
        data() {
            return {
                /* Popup Alert start */
                popMsg: '',
                confirmUse : false,
                btnNm : {first : '확인', second : '취소'},
                progrsYn : false,
                /* Popup Alert end */                
                categoryData : [],
                mngtTypeCode : [],
                search: {
                    mysite : {
                        reviewTitle : null,
                        progrsStatus : '',
                        date : [ null, null ]
                    },
                    allsites : {
                        mngtType : '',
                        projNm : null,
                        reviewTitle : null,
                        progrsStatus : '',
                        date : [ null, null ]
                    },
                },
                grid: {
                    wikMySiteData: null,
                    wikMySiteDataOption: {},
                    wikAllSitesData: null,
                    wikAllSitesDataOption: {},
                },
                requestTitleParams : {},    // 보고서 제목 팝업
                requestParams : {},    // 보고서 상세 팝업
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My site', 'All sites'], // tab name
            }
        },
        created() {
            this.categoryData = this.getCategoryCode();
            // console.log("this.categoryData : %o", this.categoryData);
            this.getMngtTypeCode();
        },
        mounted() {
            // console.log("== mounted ==");
            this.initializeGrid();
        },
        beforeDestroy() {
        },
        watch: {
            "currentTab": {
                handler () {
                    // console.log('tab changed');

                    if( ferstTabCnt === 0 ) {
                        ferstTabCnt = 1;

                        if( this.currentTab === 1 ) {
                            this.searchData('ALL');
                        }
                    }
                }
            }
        },
        methods: {
            async getCategoryCode () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url   = '/sendApi/api/common/masterCode/list';
                let param = { groupCode: 'REVIEW_PROGRS_STATUS' };
                
                try {
                    const categoryData = await sendPostApi(url, param);
                    // console.log(categoryData);
                    this.categoryData = categoryData.data.data;
                } catch (error) {
                    console.log(error.response.data)
                }
            },
            async getMngtTypeCode () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url   = '/sendApi/api/common/masterCode/list';
                let param = { groupCode: 'MNGT_TYPE' };
                
                try {
                    const mngtTypeData = await sendPostApi(url, param);
                    this.mngtTypeCode = mngtTypeData.data.data;
                } catch (error) {
                    console.log(error.response.data)
                }
            },
            creatReview() {
                // v-b-modal.ReviewWrite
                this.requestTitleParams = {
                    reviewTitle : '',
                    dateStr : [null, null]
                }

                this.$root.$emit('bv::show::modal', 'ReviewWrite');
            },
            gridReviewDetail() {
                this.$root.$emit('bv::show::modal', 'ReviewDetailWrite');
            },
            responseTitleSaveForm(param) {  // 보고서 제목 작성완료
                // console.log("hide ReviewWrite");
                this.$root.$emit('bv::hide::modal', 'ReviewWrite'); // 제목 작성 닫기
                this.searchData('MY');

                // console.log("responseTitleSaveForm : %o", param);

                this.requestParams = param;
                this.gridReviewDetail();  // 상세 팝업
            },
            responseDtlSaveForm(param) {  // 보고서 상세 완료
                // console.log(param);
                this.$root.$emit('bv::hide::modal', 'ReviewDetailWrite'); // 상세화면 닫기
                this.searchData('MY');  // 재조회
            },
            initializeGrid() {
                let data     = reviewMySiteSheet.data;
                let options  = reviewMySiteSheet.options;
                let data2    = reviewAllSitesSheet.data;
                let options2 = reviewAllSitesSheet.options;

                // My Site Event
                options.Events = {
                    onAfterClick: (event) => {
                        switch(event.col) {
                            case 'progrsTxt':
                                this.requestParams = event.row;
                                if( this.requestParams.progrsStatus == 'APVL' && this.requestParams.finlAprvYn == 'Y' ) {
                                    this.approvalStatusChange(this.requestParams);
                                }
                                this.gridReviewDetail();
                            break;
                        }
                        // console.log("event:"+event.col);
                        
                    },
                    onRenderFirstFinish: (event) => {
                        this.searchData('MY');
                    },
                }
                // All Sites Event
                options2.Events = {
                    onAfterClick: (event) => {
                        switch(event.col) {
                            case 'progrsTxt':
                                if(event.row.progrsTxt == 1) {
                                    this.requestParams = event.row;
                                    this.gridReviewDetail();
                                }
                            break;
                        }
                        // console.log("event:"+event.col);
                    },
                }

                loader.createSheet({
                    el: 'wikMySiteSheet',
                    options: options,
                    data: data
                }).then(sheet => {
                    this.grid.wikMySiteData = sheet;
                });
                loader.createSheet({
                    el: 'wikAllSitesSheet',
                    options: options2,
                    data: data2
                }).then(sheet => {
                    this.grid.wikAllSitesData = sheet;
                });
            },
            async searchData(type) {

                /* search */
                let url = '';
                let param = {};
                // console.log(search.mysite.progrsStatus) ;

                if( type == 'ALL' ) {
                    url = '/sendApi/api/stats/review/reviewAll/list';

                    param.siteMstrId   = this.$cookies.get('siteMstrId');
                    param.mngtType     = this.search.allsites.mngtType;
                    param.projNm       = this.search.allsites.projNm;
                    param.progrsStatus = this.search.allsites.progrsStatus;
                    param.reviewTitle  = this.search.allsites.reviewTitle;
                    param.dataStartDt  = this.search.allsites.date[0];
                    param.dataEndDt    = this.search.allsites.date[1];
                    
                } else {
                    url = '/sendApi/api/stats/review/reviewMy/list';

                    param.siteMstrId   = this.$cookies.get('siteMstrId');
                    param.progrsStatus = this.search.mysite.progrsStatus;
                    param.reviewTitle  = this.search.mysite.reviewTitle;
                    param.dataStartDt  = this.search.mysite.date[0];
                    param.dataEndDt    = this.search.mysite.date[1];
                }

                const data  = await sendPostApi(url, param);
                // console.log(data);
                // console.log('data: %o', data);

                if( type == 'ALL' ) {
                    this.grid.wikAllSitesData.loadSearchData({
                        // data: data.datas.dlReviewData,
                        data: data.data.datas.dlReviewData,
                        
                    });
                    // this.grid.wikAllSitesData.rerender();
                } else {
                    this.grid.wikMySiteData.loadSearchData({
                        // data : data.datas.dlReviewData
                        data : data.data.datas.dlReviewData
                    });
                    // this.grid.wikMySiteData.rerender();
                }

            },
            searchDataClean : function(type) {
                if( type == 'ALL' ) {
                    this.search.allsites.progrsStatus = ''; 
                    this.search.allsites.reviewTitle  = '';
                    this.search.allsites.dataStartDt  = '';
                    this.search.allsites.dataEndDt    = '';
                    this.search.allsites.date         = [null, null];
                } else {
                    this.search.mysite.progrsStatus = '';
                    this.search.mysite.reviewTitle  = '';
                    this.search.mysite.dataStartDt  = '';
                    this.search.mysite.dataEndDt    = '';
                    this.search.mysite.date         = [null, null];
                }
            },
            /* delete */
            clickDelete : function() {
                const checkedRows = this.grid.wikMySiteData.getRowsByChecked(this.grid.wikMySiteData.options.Cols[0].Name);
                // console.log(checkedRows + "/" + checkedRows.length );

                if(checkedRows == [] || checkedRows.length == 0){
                    this.popMsg = '삭제할 행을 선택해주세요.';
                    this.confirmUse = false;
                    this.progrsYn = false;
                    this.$root.$emit('bv::show::modal', 'popAlert');
                    return;
                } else {
                    this.popMsg = "삭제하시겠습니까?";
                    this.confirmUse = true;
                    this.progrsYn = true;
                    this.$root.$emit('bv::show::modal', 'popAlert');
                }
            },
            clickRowDelete : function() {
                // console.log("clickRowDelete");
                const checkedRows = this.grid.wikMySiteData.getRowsByChecked(this.grid.wikMySiteData.options.Cols[0].Name);

                this.grid.wikMySiteData.deleteRows(checkedRows);
                checkedRows.forEach(item => {
                    this.grid.wikMySiteData.hideRow({
                         row: item,
                         del: false,
                         norender: false
                     });
                });

                this.deleteSave();
            },
            /* Delete Save */
            deleteSave : function() { // 삭제 버튼 누를경우
                // console.log("deleteSave");

                let url = '/sendApi/api/stats/review/review/unuse';
                let param = {
                        listData : this.grid.wikMySiteData
                                        .getSaveJson({saveMode: 0})
                                        .data
                                        .filter(item => item.STATUS === 'Deleted')
                                        .map(item => {
                                            item.status = item.STATUS
                                            return item
                                        })
                    }

                // console.log("param: "+param);
                // console.log("sendPostApi");
                const data = sendPostApi(url, param, {
                                                            headers: {
                                                                "Content-Type": "application/json;",
                                                                "Accept-Language": "ko",
                                                                'Authorization': this.$cookies.get("Authorization")
                                                            }
                                                        });
                // console.log("data:"+data);

                // if(resData.rCode == "0000") {
                //     this.searchData('MY');
                // }

            },
            approvalStatusChange : async function(param) {
                let url = '/sendApi/api/stats/review/reviewAppSuccess/change';
                let params = {
                        siteMstrId : param.siteMstrId,
                        reviewId : param.reviewId
                };
                const data = sendPostApi(url, params);
            },

            /* 메시지팝업 컨트롤 */
            alertConfirmFn : function() { //commonAlert 팝업에서 확인 버튼 누를 경우 상황에 따른 event 주입
                if( this.progrsYn ) {
                    this.clickRowDelete();
                }
                this.closePop();
            },
            /* 메시지팝업 컨트롤 */
            closePop : function() { //기본 팝업 닫기 event
                this.deleteYn = false;
                this.$root.$emit('bv::hide::modal', 'popAlert');
            },

        }
    }
</script>