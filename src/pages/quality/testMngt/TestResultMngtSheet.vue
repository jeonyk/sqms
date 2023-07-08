<template>
    <div class="tab_contents">
        <!-- <h2 class="sub_title">시험관리 > 시험결과관리</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />

        <div class="lst_tabs">
            <ul class="">
                <li v-for="(item, index) in tab.list" :class="{active: tab.current === index}" :key="item">
                    <a href="javascript:void(0);" @click="tab.current = index">{{ item }}</a>
                </li>
            </ul>
        </div>

        <!-- My Site -->
        <div class="tab_area">
            <SrchMySite ref="TestResultMngtSheet_srchMySite" @srchTestData="srchTestData" :categoryData="categoryData" :currentTab="tab.current"></SrchMySite>
            
            <div class="inner">
                <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(grid.sheetEl['sheet'])">엑셀 다운로드</button>
                    <button type="button" class="btn btn_sm btn_darkgray" v-if="tab.current === 0" @click="print">성과대비표</button>
                    <button type="button" class="btn btn_sm btn_darkgray" v-if="tab.current === 0" @click="printTotal">품질검사 성과 총괄표</button>
                    <button type="button" class="btn btn_sm btn_darkgray" v-if="tab.current === 0" @click="printQr">품질검사대장 </button>
                    <button type="button" class="btn btn_sm btn_darkgray" v-if="tab.current === 0" @click="printQtpar">품질시험 검사실적 보고서</button>
                    <label for="hiddenCol" class="input_check">
                        <input type="checkbox" id="hiddenCol" class="form_control" @change="hiddenCol" v-model="hiddenCheck">
                        <span class="label_text">목록 숨기기</span>
                    </label>
                    <div class="fr" v-if="tab.current === 0">
                        <button type="button" class="btn btn_sm btn_darkgray" @click="copySelectedTest" v-if="checkUser(userId, 'write')">선택 시험 복사</button>
                        <button type="button" class="btn btn_sm btn_darkgray" @click="registTestResult" v-if="checkUser(userId, 'write')">등록</button>
                        <button type="button" class="btn btn_sm btn_darkblue" @click="requestConfirm" v-if="checkUser(userId, 'write')">결재 상신</button>
                    </div>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" :style="{'height': 'calc(100vh - 340px)'}">
                    <div id="TestResultMngtSheet" class="ibsheet_table" style="height:100%"></div>
                </div>

                <!-- <vue-friendly-iframe
                    v-if="ozReport.src !== ''"
                    className="w100 iframe-height"
                    :src="ozReport.src"
                /> -->
            </div>
        </div>

        <!-- 시료 사진 보기(개별) 팝업 -->
        <b-modal id="ImgView" title="시료 사진 보기" 
            no-hide-backdrop no-close-on-backdrop scrollable size="lg"
            :footer-bg-variant="footerBg" >
            <template #default>
                <div class="pop_container">
                    <div class="lst_imgview">
                        <swiper class="swiper" :options="swiperOption">
                            <swiper-slide v-for="(item, idx) in upFileImg" :key="idx">
                                <div class="img_wrap">
                                    <div class="img_area">
                                        <img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+`${item.fileQltArcvId}`">
                                    </div>
                                </div>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">선택</b-button> -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>
        
        <!-- 첨부파일 보기(개별) 팝업 -->
         <file-download
            refId="fileView"
            modal-title="파일 보기"
            :file-connect-id="fileModal.fileConnectId"
            :file-type="fileModal.fileType"
        />

        <!-- 의뢰서 작성 팝업 -->
        <RequestformWrite :requestParams="requestParams" @requestSaveForm="requestSaveForm" @requestDocConfirm="requestDocConfirm" @fnChange="fnChange"></RequestformWrite>

        <!-- 결재상신 팝업 -->
        <approve
            ref-id="TestResultMngtSheet_ApproveModal"
            doc-type="TEST"
            :code-type="approve.codeType"
            :code-dtl-type="approve.codeDtlType"
            :doc-seq="approve.docSeq"
            :main-code-id="testMngtInfo.mainCodeId"
            :mid-code-id="testMngtInfo.midCodeId"
            :request-id="testResultMngtSeq"
            :doc-name="approve.docName"
            :file-type="approve.fileType"
            :site-mstr-id="approve.siteMstrId"
            @callback="fn_setSourceApproval"
            alertable
        />

        <!-- alert popup -->
        <WrappedAlert
            refs="alertPopup"
            :ref-id="popup.refId"
            :title="popup.title"
            :is-show.sync="popup.isShow"
            :message="popup.message"
            :purpose="popup.purpose"
            :use-cancel-button="popup.useCancelButton"
            @click-confirm="clickPopupConfirm"
            @click-cancel="clickPopupCancel"
        />

        <file-download
            :refId="fileModal.refId"
            modal-title="파일 보기"
            :file-connect-id="fileModal.fileConnectId"
            :file-type="fileModal.fileType"
        />

        <excel-download
            v-model="excelDownload.request"
            ref-id="dataMngtHeadSetupSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />

    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { sendPostApi, requestOptions } from '@/apis/common';
import { testResult, testResultHidden, testResult2, testResult2Hidden } from '@/pages/quality/testMngt/data/testData';
import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
import RequestformWrite from "@/pages/quality/testMngt/component/RequestformWritePopup";
import SrchMySite from '@/pages/quality/testMngt/component/SrchMySite';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Approve from '@modal/approval/Approve.vue';
import 'swiper/css/swiper.css';
import FileDownload from '@modal/common/FileDownloadModal.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import ExcelDownload from '@component/common/ExcelDownload.vue'

import { eventTupleToStore } from '@fullcalendar/common';
// import { commonFn } from '@/script/commonFn.js';

export default {
    name: 'TestResultMngtSheet',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        swiper, 
        swiperSlide,
        SrchMySite,
        WrappedAlert,
        RequestformWrite,
        Approve,
        Breadcrumb,
        FileDownload,
        ExcelDownload
    },
    
    data() {
        const _vm = this;
        return {
            footerBg: 'transparent',
            currentTab: 0, // 기본 current 값 지정 
            activeIdx: 0,
            userId : '',
            hiddenCheck : true,  // 목록 숨기기
            fileModal : {  // 첨부파일 보기
                fileConnectId : '' , 
                fileType : 'TestMngt',
            },
            swiperOption: { 
                slidesPerView: 1, 
                spaceBetween: 0, 
                loop: false, 
                autoplay: false, 
                pagination: { 
                    el: '.swiper-pagination', 
                    clickable: true 
                }, 
                navigation: { 
                    nextEl: '.swiper-button-next', 
                    prevEl: '.swiper-button-prev' 
                },
                on: {
                    slideChange() {
                        _vm.activeIdx = this.activeIndex;
                    }
                }
            },
            tab: {
                current: 0,
                list: ['My Site', 'All Sites'] // tab name
            },
            search: {
                box: {}
            },
            categoryData: [],
            grid: {
                sheetEl: [],
                data: [],
                options: {},
            },

            requestParams: {},    // 의뢰서 params
            requestFormData: {},    // 의뢰서 data
            formDataStatus: false,  // 의뢰서 저장 상태

            upFileImg: [], // 시료사진
            upFileDoc: [],  // 성적서파일

            testMngtInfo: {
                mainCodeId: '',
                midCodeId: '',
            },
            mtrlSpApprId: null,
            testResultMngtSeq: null,
    
            approve: {  // 결재상신
                codeType: 'TEST',
                codeDtlType: null,
                docSeq: null,
                docName: null,
                fileType: null,
                siteMstrId: null,
            },
            printParamInfo : {
                mainCodeId : '',
                midCodeId : '',
                subName : '',
                standard : '',
                tstSbjDtlName : '',
                testType : '',
                testDateFr : '',
                testDateTo : '',
                testInstt : '',
            },
            popup: {
                title: '',
                isShow: false,
                message: '',
                useCancelButton: false,
                buttonName: {},
                refId: 'testResultAlert',
                purpose: '',
            },
            default: {
                popup: {
                    copyRows: {
                        title: '알림',
                        message: '복사할 시험을 선택해 주세요',
                        purpose: 'copyRows',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    selectTask: {
                        title: '알림',
                        message: '결재상신할 요청문서를 선택해주세요',
                        purpose: 'selectTask',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    completeTask: {
                        title: '알림',
                        message: '이미 결재 중이거나 완료된 건입니다',
                        purpose: 'completeTask',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    writeResult: {
                        title: '알림',
                        message: '결과입력 후 상신해주세요',
                        purpose: 'writeResult',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    
                    requiredRequestFormData: {
                        title: '알림',
                        message: '시료량 / 시료 또는 자재 생산국 / 시험 및 시방기준 / 성과 이용 목적은 필수 입력 사항입니다',
                        purpose: 'saveRequestFormData',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    saveRequestFormData: {
                        title: '알림',
                        message: '저장하시겠습니까?',
                        purpose: 'saveRequestFormData',
                        useCancelButton: true,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    saveResponseFormData: {
                        title: '알림',
                        message: '저장되었습니다',
                        purpose: 'saveResponseFormData',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    requestDocConfirm: {
                        title: '알림',
                        message: '결재상신하시겠습니까?',
                        purpose: 'requestDocConfirm',
                        useCancelButton: true,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                    responseDocConfirm: {
                        title: '알림',
                        message: '결재가 상신되었습니다',
                        purpose: 'responseDocConfirm',
                        useCancelButton: false,
                        buttonName: {
                            confirm: '확인',
                            cancel: '취소'
                        }
                    },
                }
            },

            fileModal: {
                refId: 'testResultMngtSheet_FileModal',
                fileConnectId: '',
                fileType: 'TestMngt',
            },
            //오즈리포트
            ozReport : {
                src : '',
            },
            //엑셀다운로드
            excelDownload : {
                request : false,
                fileName :'',
                downloadOption :'',
                options : null,
                data : [],
            }
        }
    },
    mounted() {
        this.userId = this.$session.get('userInfo').userId;
        this.getCategoryData();
        // TestResultMngtSheet_srchMySite
        if (this.$route.params.resultProgrsStatus){
            this.$refs.TestResultMngtSheet_srchMySite.srchOptions.resultProgrsStatus = this.$route.params.resultProgrsStatus

            this.initSheet({
                resultProgrsStatus: this.$route.params.resultProgrsStatus
            });
        } else {
            this.initSheet();
        }
    },
    beforeDestroy () {
        if(this.grid.sheetEl['sheet']) {
            this.grid.sheetEl['sheet'].dispose();
            this.grid = null;
        }
    },
    activated(){
        // keepAlive 재조회 처리
        if(this.$store.getters['tabInfo/getSavePage'].length > 0){
            //keepAlive 재조회 처리
            let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
            let url="/sendApi/api/programMngt/menuChildProgram/list"
            let reSearch = false;
            let param = {"menuMngtId":menuid};
            // sdave정보가 있는지 체크하여 처리
            sendPostApi(url, param).then((result) => {
                // 하부 페이지 정보
                for (let i = 0; i < result.data.dlprogram.length ; i++){
                    // 저장 페이지 정보와 비교
                    for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                        if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                            this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);
                            reSearch = true;
                            break;
                        }
                    }
                    if(reSearch){
                        break;
                    }
                }
                if(reSearch){
                    //console.log("@@@@@  재조회");
                    // 화면 재조회 메소드 입력	
                    this.dataLoad();
                }
            }).catch((e) => {
                // console.log(e);
                return e.response;
            });
        }
    },
    watch: {
        "tab.current": {
            handler () {
                if(this.grid.sheetEl['sheet']) {
                    this.grid.sheetEl['sheet'].dispose();
                }
                this.initSheet();
            }
        }
    },
    methods: {
        initSheet(params = undefined) {   // createSheet 
            this.grid = {
                sheetEl: [],
                sheetId: [],
                data: [],
                options: {},
            };
            
            switch(this.tab.current) {
                case 0:
                    if(this.hiddenCheck == true){
                        this.grid.options = testResultHidden.options;
                    }else{
                        this.grid.options = testResult.options;
                    }
                    
                    this.grid.options.Events = {
                        onRenderFinish: this.mergeProgressBar,
                        onAfterSort: this.mergeProgressBar,
                        onClick: this.popopenEvt,
                    }
                    loader.createSheet({
                        el: 'TestResultMngtSheet',
                        data: [],
                        options: this.grid.options
                    }).then((sheet) => {
                        this.grid.sheetEl['sheet'] = sheet;
                        this.dataLoad(params);
                    });
                    break;
                case 1:
                    if(this.hiddenCheck == true){
                        this.grid.options = testResult2Hidden.options;
                    }else{
                        this.grid.options = testResult2.options;
                    }
                    this.grid.options.Events = {
                        onRenderFinish: this.mergeProgressBar,
                        onAfterSort: this.mergeProgressBar,
                        onClick: this.popopenEvt,
                    }
                    loader.createSheet({
                        el: 'TestResultMngtSheet',
                        data: [],
                        options: this.grid.options
                    }).then((sheet) => {
                        this.grid.sheetEl['sheet'] = sheet;
                        this.dataLoad(params);
                    });
                    break;
            }
        },
        setProgressBar() {
            let sheetText = ''; 
            let sheetNum = 0; 
            let sheetClass = ''; // 등록, 회신, 확인
            let sheetCell;
            
            let statusArr = ['TTRG', 'RQPR', 'RQRP', 'RQRA', 'TTPR', 'RGPR', 'APRV'];
            let nameArr = ['시험 등록', '의뢰 중', '의뢰서 접수 중', '의뢰 접수 완료', '시험 중', '결재중', '완료'];
            let itemNumArr = [1, 25, 37, 50, 75, 100, 100];
            let dataArr = this.grid.data;

            for( let i = 0; i < dataArr.length; i++ ) {
                switch (dataArr[i].resultProgrsStatus) {
                    case 'TTRG':    // 시험등록
                        dataArr[i].testInfo = 1;
                        dataArr[i].rqstdoc = 0;
                        dataArr[i].resultDetail = '';
                        if(dataArr[i].testType === '0003' || dataArr[i].testType === '0001') {    // 공장/현장 시험 일 경우
                            dataArr[i].resultDetail = 0;
                            dataArr[i].rqstdoc = '-';
                        }
                        break;
                    case 'RQPR':    // 의뢰중
                        dataArr[i].testInfo = 1;
                        dataArr[i].rqstdoc = 1;
                        dataArr[i].resultDetail = '';
                        if(dataArr[i].testType === '0003' || dataArr[i].testType === '0001') {    // 공장/현장 시험 일 경우
                            dataArr[i].rqstdoc = '-';
                        }
                        break;
                    case 'RQRP':    // 의뢰서 접수 중
                        dataArr[i].testInfo = 1;
                        dataArr[i].rqstdoc = 1;
                        dataArr[i].resultDetail = '';
                        if(dataArr[i].testType === '0003' || dataArr[i].testType === '0001') {    // 공장/현장 시험 일 경우
                            dataArr[i].rqstdoc = '-';
                        }
                        break;
                    case 'RQRA':    // 의뢰서 접수 완료
                        dataArr[i].testInfo = 1;
                        dataArr[i].rqstdoc = 1;
                        dataArr[i].resultDetail = 0;
                        if(dataArr[i].testType === '0003' || dataArr[i].testType === '0001') {    // 공장/현장 시험 일 경우
                            dataArr[i].rqstdoc = '-';
                        }
                        break;
                    case 'TTPR':    // 시험 중
                        dataArr[i].testInfo = 1;
                        dataArr[i].rqstdoc = 1;
                        dataArr[i].resultDetail = 1;
                        if(dataArr[i].testType === '0003' || dataArr[i].testType === '0001') {    // 공장/현장 시험 일 경우
                            dataArr[i].rqstdoc = '-';
                        }
                        break;
                    case 'RGPR':    // 결제 중
                        dataArr[i].testInfo = 1;
                        dataArr[i].rqstdoc = 1;
                        dataArr[i].resultDetail = 1;
                        if(dataArr[i].testType === '0003' || dataArr[i].testType === '0001') {    // 공장/현장 시험 일 경우
                            dataArr[i].rqstdoc = '-';
                        }
                        break;
                    case 'APRV':    // 완료
                        dataArr[i].testInfo = 1;
                        dataArr[i].rqstdoc = 1;
                        dataArr[i].resultDetail = 1;
                        if(dataArr[i].testType === '0003' || dataArr[i].testType === '0001') {    // 공장/현장 시험 일 경우
                            dataArr[i].rqstdoc = '-';
                        }
                        break;
                     default :
                        dataArr[i].testInfo = '';
                        dataArr[i].rqstdoc = '';
                        dataArr[i].resultDetail = '';
                        if(dataArr[i].testType === '0003' || dataArr[i].testType === '0001') {    // 공장/현장 시험 일 경우
                            dataArr[i].rqstdoc = '-';
                        }
                }

                dataArr[i].splorePhoto === '' ? 0 : dataArr[i].splorePhoto = 1;   // 시료사진
                dataArr[i].screDoc === '' ? 0 : dataArr[i].screDoc = 1; //성적서

                sheetNum = 0;//그래프 크기초기화
                sheetClass = '';
                sheetText = '';
                sheetCell = dataArr[i].resultProgrsStatus;
                // let status = sheetCell;
                statusArr.forEach(function(val, idx){
                    if(dataArr[i].resultProgrsStatus === val){
                        sheetNum = itemNumArr[idx];
                        sheetText = nameArr[idx];
                    }
                })

                if(sheetCell === 'APRV'){
                    sheetClass = 'complete';
                }else{
                    sheetClass = '';
                }

                let steps = '<div class="guage">'+
                    '<span class="bar_wrap">' +
                        '<span class=\'bar '+sheetClass+'\' style=\'width:'+sheetNum+'%;\'></span>' + 
                    '</span>'+
                    '<span class="label" style=\'width:'+sheetNum+'%\'>'+sheetText+'</span>' +
                '</div>';
                dataArr[i].registStatus = steps;
                // dataArr[i]['status'] = status;
            }

        },
        removeSheet() {
            if(this.grid.sheetEl['sheet']) {
                this.grid.sheetEl['sheet'].dispose();
                this.grid = null;
            }
        },
        dataLoad(params = undefined) {
            this.setGridData(params);
        },
        async getCategoryData () {
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            
            let url = '/sendApi/api/common/codeCategory/list';
            let param = { codeType: 'TEST' };
            
            try {
                const { data } = await sendPostApi(url, param);
                this.categoryData = data.list;
            } catch (error) {
                console.log(error.response.data)
            }
        },
        async setGridData(param) {  // sheet data load
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '';
            if (this.tab.current === 0) {
                url='/sendApi/api/testMngt/testResultMngt/testResultMngtMy/list';
            } else {
                url='/sendApi/api/testMngt/testResultMngt/testResultMngtAll/list';
            }
            let payload = { 
                ...param,
                siteMstrId: this.$session.get('userInfo').siteMstrId,
            };
            
            if(this.hiddenCheck == true){
                payload.searchType = this.hiddenCheck
            }

            try {
                const { data } = await sendPostApi(url, payload);
                if (this.tab.current === 0) {   // testResult
                    if(data.datas.dlResultMy)
                    this.grid.data = data.datas.dlResultMy;
                    // this.grid.data = testResult.data;
                } else {
                    this.grid.data = data.datas.dlResultAll;
                }
                /**
                 * TTRG: 시험등록, RQPR: 의뢰중, RQRP: 의뢰서 접수 중, RQRA: 의뢰서 접수 완료, TTPR: 시험 중, RGPR: 결제 중, APRV: 완료
                 */

                this.setProgressBar();
                
                this.grid.sheetEl['sheet'].loadSearchData({
                    data: this.grid.data,
                    append: false
                });
            } catch (error) {
                console.log(error.response.data);
            }
            
        },
        mergeProgressBar() {    // progressbar area merge
            const options = {
                key: 'testResultMngtSeq',
                startColumnName: 'registStatus',
                endColumnName: 'setleStatus',
            }
            
            const allRows = this.grid.sheetEl['sheet'].getDataRows();

            let compare = allRows[0]
            for (let i = 0; i < allRows.length; i++) {
                if (compare[options.key] !== allRows[i][options.key]) {
                    this.grid.sheetEl['sheet'].setMergeRange(compare, options.startColumnName, allRows[i-1], options.endColumnName)
                    compare = allRows[i]
                }

                if (i === allRows.length -1 ) {
                    this.grid.sheetEl['sheet'].setMergeRange(compare, options.startColumnName, allRows[i], options.endColumnName)
                }
            }
            //this.grid.sheetEl['sheet'].hideCol('testResultMngtSeq');
            this.$nextTick(() => {
                this.grid.sheetEl['sheet'].blur(0);
            })
        },
        async viewImg(param) {
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url='/sendApi/api/file/upFileList';
            let testResultMngtSeq = param.testResultMngtSeq;
            let siteMstrId = this.$session.get('userInfo').siteMstrId;
            let fileConnectId = `${siteMstrId}_${testResultMngtSeq}`;
            
            let payload = { 
                fileConnectId: fileConnectId,
                fileType: 'TestMngtImg',
            };

            this.fileModal.fileConnectId = fileConnectId

            try {
                await sendPostApi(url, payload).then(data => {
                    this.upFileImg = data.data.data;
                    this.$root.$emit('bv::show::modal', 'ImgView');
                });
            } catch (error) {
                console.log(error.response.data);
            }
        },
        
        async viewFile(param) {
            let siteMstrId = this.$session.get('userInfo').siteMstrId;
            let fileConnectId = `${siteMstrId}_${param.testResultMngtSeq}`;
            this.fileModal.fileConnectId = fileConnectId

            this.$root.$emit('bv::show::modal', 'fileView');
        },
        
        
        popopenEvt: function(evtParam) {
            let params = {
                testResultMngtSeq: evtParam.row.testResultMngtSeq,
                testType: evtParam.row.testType,
                resultProgrsStatus: evtParam.row.resultProgrsStatus,
                realProgrsStatus: evtParam.row.realProgrsStatus,
                mainCodeId: evtParam.row.mainCodeId,
                midCodeId: evtParam.row.midCodeId,
                subCodeId: evtParam.row.subCodeId,
                siteMstrId: this.$session.get('userInfo').siteMstrId,
                formDataStatus: this.formDataStatus,
                testType : evtParam.row.testType,
                resultRecomDocNo : evtParam.row.resultRecomDocNo,
                rqstdocRecomDocNo : evtParam.row.rqstdocRecomDocNo,

            };
            this.requestParams = params;
            if(evtParam.event.target.tagName == 'BUTTON') {
                /**
                 * TTRG: 시험등록, RQPR: 의뢰중, RQRP: 의뢰서 접수 중, RQRA: 의뢰서 접수 완료, TTPR: 시험 중, RGPR: 결제 중, APRV: 완료
                 */
                switch (evtParam.col) {
                    case 'splorePhoto': // 시료 사진
                        // this.$root.$emit('bv::show::modal', 'ImgView');
                        //console.log('evtParam.row')
                        //console.log(evtParam.row)
                        this.viewImg(evtParam.row);
                        break;
                    case 'screDoc': // 성적서
                        this.viewFile(evtParam.row);
                        //this.fileModal.fileConnectId = `${this.$session.get('userInfo').siteMstrId}_${evtParam.row.testResultMngtSeq}`
                        //this.$bvModal.show(this.fileModal.refId)
                        break;
                    case 'rqstdoc': // 의뢰서
                        if(evtParam.row.resultProgrsStatus === 'TTRG') {    // 작성 || evtParam.row.resultProgrsStatus === 'RQPR'
                            this.requestParams = {
                                ...params,
                                resultProgrsStatus: evtParam.row.resultProgrsStatus,
                                formDataStatus : false
                            }
                        } else if(evtParam.row.resultProgrsStatus === 'RQPR') {
                             this.requestParams = {
                                ...params,
                                resultProgrsStatus: evtParam.row.resultProgrsStatus,
                                formDataStatus : true
                            }
                        } else if(evtParam.row.resultProgrsStatus === 'RQRP') {    // 보기
                            this.requestParams = {
                                ...params,
                                resultProgrsStatus: evtParam.row.resultProgrsStatus
                            }
                        } else if (evtParam.row.resultProgrsStatus === 'RQRA') {  // RQRA: 의뢰서 접수 완료
                            this.requestParams = {
                                ...params,
                                resultProgrsStatus: evtParam.row.resultProgrsStatus
                            }
                        } else {    // 의뢰서 접수 완료 이후 접수증 추가
                            this.requestParams = {
                                ...params,
                                resultProgrsStatus: evtParam.row.resultProgrsStatus
                            }
                            
                        }
                        this.$root.$emit('bv::show::modal', 'RequestformWrite');
                        break;
                    case 'testInfo':    // 시험정보
                        this.$store.dispatch('testMngt/setTestMngtCheckList', params);
                        this.$router.push({ name: 'TestResultMngtDetail' })
                        break;
                    case 'resultDetail':    // 결과상세
                        if(evtParam.row.resultProgrsStatus === 'RQRA' || evtParam.row.resultProgrsStatus === 'TTRG') {    // 입력
                            params = {
                                ...params,
                                pageMode: 'write'
                            }
                        } else {    // 상세
                            params = {
                                ...params,
                                pageMode: 'detail'
                            }
                        }
                        this.$store.dispatch('testMngt/setTestMngtCheckList', params);
                        this.$router.push({ name: 'TestResultMngtInput' });
                        break;
                }
            }
        },
        
        /** search var */ 
        srchTestData(item) {   // 검색
            this.printParamInfo = item;
            this.setGridData(item);
        },
        srchPeriod(targetDate, item) {  // testDate 검색
            let result = false;
            let testDate = '';
            let startDate = '';
            let endDate = '';

            if(targetDate) {
                testDate = new Date(targetDate);
                startDate = new Date(item.startDate);
                endDate = new Date(item.endDate);
            }

            if(testDate >= startDate && testDate <= endDate || testDate === '' || testDate === null || item.startDate === '' || item.startDate === null) {
                result = true;
            } else {
                result = false;
            }
            return result;
        },

        /** button function */ 
        requestConfirm() { // 결재 상신
            const checkedRow = this.grid.sheetEl['sheet'].getRowsByChecked(this.grid.options.Cols[1].Name);
            
            if(checkedRow.length === 0) {
                this.openPopup('selectTask');
                return;
            }

            // let param = {
            //     testResultMngtSeq: checkedRow[0].testResultMngtSeq
            // };
            /**
             * TTRG: 시험등록, RQPR: 의뢰중, RQRP: 의뢰서 접수 중, RQRA: 의뢰서 접수 완료, TTPR: 시험 중, RGPR: 결제 중, APRV: 완료
             */
            let params = {
                testResultMngtSeq: checkedRow[0].testResultMngtSeq,
                testType: checkedRow[0].testType,
                resultProgrsStatus: checkedRow[0].resultProgrsStatus,
                realProgrsStatus: checkedRow[0].realProgrsStatus,
                mainCodeId: checkedRow[0].mainCodeId,
                midCodeId: checkedRow[0].midCodeId,
                siteMstrId: this.$session.get('userInfo').siteMstrId,
                formDataStatus: this.formDataStatus,
                resultRecomDocNo : checkedRow[0].resultRecomDocNo,
                rqstdocRecomDocNo : checkedRow[0].rqstdocRecomDocNo,
            };
            this.requestParams = {
                ...params
            }

            switch (checkedRow[0].resultProgrsStatus) {
                case 'TTRG':    // 시험등록
                    if(checkedRow[0].testType === '0003' || checkedRow[0].testType === '0001' ) {    // 현장/공장 시험 인 경우
                        this.openPopup('writeResult');
                    } else {    // 의뢰시험 인 경우
                        this.alert('의뢰서를 작성해주세요.')
                        return
                        // this.requestParams = {
                        //     ...params,
                        //     testResultMngtSeq: checkedRow[0].testResultMngtSeq,
                        //     siteMstrId: this.$session.get('userInfo').siteMstrId,
                        //     resultProgrsStatus: 'TTRG'
                        // }
                        // console.log("this.requestParams : %o", this.requestParams);

                        // this.$root.$emit('bv::show::modal', 'RequestformWrite');
                    }
                    
                    break;
                case 'RQPR':    // 의뢰중
                    if(checkedRow[0].testType === '0002') {
                        this.requestDocConfirm();
                    } else {
                        this.openPopup('completeTask');
                    }   
                    break;
                case 'RQRP':    // 의뢰서 접수 중
                    this.openPopup('completeTask');
                    break;
                case 'RQRA':    // 의뢰서 접수 완료
                    this.openPopup('writeResult');
                    break;
                case 'TTPR':    // 시험 중
                    // console.log('결재상신 팝업 > 우선 결재상신 처리');
                    this.requestDocConfirm();
                    break;
                case 'RGPR':    // 결제 중
                    this.openPopup('completeTask');
                    break;
                case 'APRV':    // 완료
                    this.openPopup('completeTask');
                    break;
            }

        },
       
        exportExcel () {
            // export Data options
            // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
            const options = {
                fileName: `시험결과관리_${'date'}.xlsx`,
            }

            this.grid.sheetEl['sheet'].exportData(options)
            
        },
        registTestResult() {
            this.$router.push({ name: 'TestResultMngtWrite' });
        },
        copySelectedTest() {
            const checkedRow = this.grid.sheetEl['sheet'].getRowsByChecked(this.grid.options.Cols[1].Name);

            if(checkedRow.length === 0) {
                this.openPopup('copyRows');
                return;
            } else {
                this.confirm('복사하시겠습니까?', ()=> {
                    let param = {
                            testResultMngtSeq: checkedRow[0].testResultMngtSeq,
                            testType : checkedRow[0].testType,
                            mainCodeId : checkedRow[0].mainCodeId,
                            midCodeId : checkedRow[0].midCodeId
                        }
                    this.saveCopyList(param);
                })
            }

            
            /*
            this.grid.sheetEl['sheet'].copyRow(checkedRow[0], this.grid.sheetEl['sheet'].getFirstRow());
            checkedRow[0].case1 = 0;
            this.grid.sheetEl['sheet'].refreshCell(checkedRow[0], 'case1');

            this.mergeProgressBar();
            */
        },
        async saveCopyList(param) { // 선택시험복사
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/testMngt/testResultMngt/testSubjectCopy/write';
            let payload = { 
                ...param,
                siteMstrId: this.$session.get('userInfo').siteMstrId,
            };

            // console.log("@@@@ copy param : %o",payload);

            try {
                let copyReult = await sendPostApi(url, payload);
                // console.log("@@@@ copyReult : %o",copyReult);
                
                if(copyReult.status == "200"){                                    
                    if(copyReult.data.count > 0 ){
                        this.alert('복사가 완료되었습니다.', () => {
                            this.setProgressBar();                
                            this.setGridData();
                        })
                    }else{
                        this.alert('시험 복사에 실패했습니다.')
                    }
                }               
            } catch (error) {
                console.log(error.response.data);
            }
        },

        requestSaveForm(param) {  // 의뢰서작성 저장
            //if(param.makrNation === '' || param.makrNation === null || param.stdr === '' || param.stdr === null || param.usePurps === '' || param.usePurps === null) {
            //    this.openPopup('requiredRequestFormData');
            //    return;
            //} else {
                this.requestFormData = param
                this.saveFormData();
                //this.openPopup('saveRequestFormData')
            //}
            //this.openPopup('saveRequestFormData')
        },
        async saveFormData() { // 의뢰서작성 저장
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/testMngt/testResultMngt/rqstdocWritng/write';

            let pickDate = "";

            if(this.requestFormData.pickDate !== '' && this.requestFormData.pickDate !== null){
                pickDate = this.requestFormData.pickDate.split('-').join('');
            }

            let payload = {
                ...this.requestFormData,
                pickDate: pickDate
            };

            try {
                const resultData = await sendPostApi(url, payload);
                //if(resultData.status === '200') {
                    this.requestParams.formDataStatus = true;
                    this.openPopup('saveResponseFormData');
                    this.getCategoryData();
                    this.initSheet();
                //}
                
               
            } catch (error) {
                console.log(error.response.data);
            }
        },
        requestDocConfirm() {   // 의뢰서 결재상신
            let testType = this.requestParams.testType
            switch(testType) {
                case '0001' :   // 현장시험
                    this.requestParams.codeDtlType = 'SITE';
                    break;
                case '0002' :   // 의뢰시험
                    this.requestParams.codeDtlType = 'REQT';
                    //this.docRequestConfirm();
                    break;
                case '0003' :   // 공장시험
                    this.requestParams.codeDtlType = 'FTRY';
                    break;
            }
            this.testMngtInfo.mainCodeId = this.requestParams.mainCodeId;
            this.testMngtInfo.midCodeId = this.requestParams.midCodeId;
            //의뢰시험(의뢰중)일때만 mtrlSpApprId 보내기 
            //if(this.requestParams.codeDtlType === 'REQT' && this.requestParams.resultProgrsStatus === 'RQPR') {
                this.testResultMngtSeq = `${this.$cookies.get('siteMstrId')}_${this.requestParams.testResultMngtSeq}`;
            //}

            //this.testResultMngtSeq      = this.requestParams.testResultMngtSeq;
            this.approve.codeType       = 'TEST';
            this.approve.codeDtlType    = this.requestParams.codeDtlType;
            this.approve.siteMstrId     = this.$session.get('userInfo').siteMstrId;
            //if 의뢰시험(의뢰중)일때는 : 품질검사 의로서 else 나머지 최종결재 : 시험성과 대비표
            if(this.requestParams.codeDtlType === 'REQT' && this.requestParams.resultProgrsStatus === 'RQPR') {
                this.approve.docName = '품질검사 의뢰서';
                this.approve.docSeq = this.requestParams.rqstdocRecomDocNo;
            } else {
                this.approve.docName  = '시험성과 대비표';
                this.approve.docSeq = this.requestParams.resultRecomDocNo;
            }
            
            this.approve.fileType       = 'TestMngt';

            //console.log(this.requestParams.codeDtlType)
            //console.log(this.approve.codeDtlType)
            //console.log(this.testResultMngtSeq)
            //  console.log('this.approve')
            // console.log(this.approve)
            this.$bvModal.show('TestResultMngtSheet_ApproveModal');
        },
        async docRequestConfirm() {    // 의뢰서 결재 상신 문서번호 생성
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/docNum/selectDocNumSeq';
            let testType = this.requestParams.testType;

            switch(testType) {
                case '0001' :   // 현장시험
                    this.requestParams.codeDtlType = 'SITE';
                    break;
                case '0002' :   // 의뢰시험
                    this.requestParams.codeDtlType = 'REQT';
                    break;
                case '0003' :   // 공장시험
                    this.requestParams.codeDtlType = 'FTRY';
                    break;
            }

            let payload = {
                siteMstrId: this.$session.get('userInfo').siteMstrId,
                codeType: 'TEST',
                codeDtlType: this.requestParams.codeDtlType,
                gjmcd: this.requestParams.mainCodeId,
                gjscd: this.requestParams.midCodeId,
            };
            // console.log("==============>payload : %o ",payload )
            
            try {
                const { data } = await sendPostApi(url, payload);
                this.approve.docSeq = data;
            } catch (error) {
                console.log(error.response);
            }
        },
        fn_setSourceApproval: function (payload){    // 결재상신 성공시 리턴 callback
            const checkedRow = this.grid.sheetEl['sheet'].getRowsByChecked(this.grid.options.Cols[1].Name);
            if(checkedRow.length === 1 && checkedRow[0].resultProgrsStatus === 'TTPR') {
                this.docSavePaymentConfirm(payload);
            } else {
                this.docSaveRequestConfirm(payload);
            }
        },
        async docSaveRequestConfirm(param) {   // 의뢰서 결과 정보 저장
            let url = '/sendApi/api/testMngt/testResultMngt/rqstdocRecomInfo/write';
            let payload = {
                rqstdocRecomDocNo : this.approve.docSeq,    // DOC_SEQ,(문서번호) 
                rqstdocAprvInfoId : param.aprvInfoId,       // APRV_INFO_ID(결재정보ID)
                siteMstrId: this.$session.get('userInfo').siteMstrId,
                testResultMngtSeq: this.requestParams.testResultMngtSeq
            }
            
            try {
                await sendPostApi(url, payload);
                this.openPopup('responseDocConfirm');
                this.setGridData();
            } catch (error) {
                console.log(error.response.data);
            }
        },
        async docSavePaymentConfirm(param) {   // 결재상신
            let url   = '/sendApi/api/testMngt/testResultMngt/setleRecomResult/write';

            let payload = {
                resultRecomDocNo : this.approve.docSeq,
                resultAprvInfoId : param.aprvInfoId,
                siteMstrId: this.$session.get('userInfo').siteMstrId,
                testResultMngtSeq: this.requestParams.testResultMngtSeq
            }
            
            try {
                await sendPostApi(url, payload);
                this.openPopup('responseDocConfirm');
                this.setGridData();
            } catch (error) {
                console.log(error.response.data);
            }
        },
        

        /** alert popup */ 
        openPopup (type) {
            this.popup = {
                ...this.popup,
                ...this.default.popup[type],
            }
            this.popup.isShow = true
        }, 
        clickPopupConfirm (purpose) {
            this.popup.isShow = false;
            switch(purpose) {
                case 'saveSelectedData':
                    //console.log(purpose)
                    this.saveSelectedData();
                    break;
                case 'saveRequestFormData':
                    //console.log(purpose)
                    this.saveFormData();
                    break;
                case 'requestDocConfirm':
                    //console.log(purpose)
                    //this.docRequestConfirm();
                    break;
                case 'responseDocConfirm':
                    this.$root.$emit('bv::hide::modal', 'RequestformWrite');
                    break;
            }
        },
        clickPopupCancel (purpose) {
            this.popup.isShow = false;
            switch(purpose) {
                case 'saveConfirm':
                    break
            }
        },

        //시험성과 대비표
        print:function(){
            let compare = 0;
            const allRows = this.grid.sheetEl['sheet'].getDataRows();
            
            for (let i = 0; i < allRows.length; i++) {
                if ( "APRV" == allRows[i].resultProgrsStatus ) {
                    compare++;
                }
            }
            if( compare == 0){
                this.alert("출력 할 이력이 존재하지 않습니다.");
                return;
            }
            
            // this.grid.sheetEl['sheet'].doPrint();
            // let url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
            this.ozReport.src = this.$store.getters['auth/getOzTypeList'][1].jspNm
            + `&siteMstrId=`     + this.$session.get('userInfo').siteMstrId
            + `&mainCodeId=`    + this.printParamInfo.mainCodeId
            + `&midCodeId=`     + this.printParamInfo.midCodeId
            + `&subName=`       + this.printParamInfo.subName
            + `&standard=`      + this.printParamInfo.standard
            + `&tstSbjDtlName=` + this.printParamInfo.tstSbjDtlName
            + `&testType=`      + this.printParamInfo.testType
            + `&testDateFr=`    + this.printParamInfo.testDateFr
            + `&testDateTo=`    + this.printParamInfo.testDateTo
            + `&testInstt=`     + this.printParamInfo.testInstt
            + `&userId=`        + this.$session.get('userInfo').userId
            + `&resultProgrsStatus=`    + 'APRV'
            + `&testResultMngtSeq=` + ''
            

            //console.log(this.ozReport)
            window.open(this.ozReport.src, '_blank')
        },
        /* 품질검사 성과 총괄표 */
        printTotal : function(){

            let compare = 0;
            const allRows = this.grid.sheetEl['sheet'].getDataRows();
            
            for (let i = 0; i < allRows.length; i++) {
                if ( "APRV" == allRows[i].resultProgrsStatus ) {
                    compare++;
                }
            }
            if( compare == 0){
                this.alert("출력 할 이력이 존재하지 않습니다.");
                return;
            }
            
            // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
            this.ozReport.src = this.$store.getters['auth/getOzTypeList'][2].jspNm
            + `&siteMstrId=`     + this.$session.get('userInfo').siteMstrId
            + `&mainCodeId=`    + this.printParamInfo.mainCodeId
            + `&midCodeId=`     + this.printParamInfo.midCodeId
            + `&subName=`       + this.printParamInfo.subName
            + `&standard=`      + this.printParamInfo.standard
            + `&tstSbjDtlName=` + this.printParamInfo.tstSbjDtlName
            + `&testType=`      + this.printParamInfo.testType
            + `&testDateFr=`    + this.printParamInfo.testDateFr
            + `&testDateTo=`    + this.printParamInfo.testDateTo
            + `&testInstt=`     + this.printParamInfo.testInstt
            + `&userId=`        + this.$session.get('userInfo').userId
            + `&userNm=`        + this.$session.get('userInfo').userNm
            + `&userType=`      + this.$session.get('userInfo').userType
            + `&userTitle=`      + this.$session.get('userInfo').jobTitle
            //console.log(this.ozReport)
            window.open(this.ozReport.src, '_blank')
        },
        printQr () {
            let compare = 0;
            const allRows = this.grid.sheetEl['sheet'].getDataRows();
            
            for (let i = 0; i < allRows.length; i++) {
                if ( "APRV" == allRows[i].resultProgrsStatus ) {
                    compare++;
                }
            }
            if( compare == 0){
                this.alert("출력 할 이력이 존재하지 않습니다.");
                return;
            } else {
                //alert('품질검사대장')
                // let url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][3].jspNm
                + `&siteMstrId=`     + this.$session.get('userInfo').siteMstrId
                + `&mainCodeId=`    + this.printParamInfo.mainCodeId
                + `&midCodeId=`     + this.printParamInfo.midCodeId
                + `&subName=`       + this.printParamInfo.subName
                + `&standard=`      + this.printParamInfo.standard
                + `&tstSbjDtlName=` + this.printParamInfo.tstSbjDtlName
                + `&testType=`      + this.printParamInfo.testType
                + `&testDateFr=`    + this.printParamInfo.testDateFr
                + `&testDateTo=`    + this.printParamInfo.testDateTo
                + `&testInstt=`     + this.printParamInfo.testInstt
                + `&userId=`        + this.$session.get('userInfo').userId
                
                //console.log(this.ozReport)
                window.open(this.ozReport.src, '_blank')
                
            }
            //qltinspRegstr : 품질검사대장
        },
        printQtpar () {
            let compare = 0;
            const allRows = this.grid.sheetEl['sheet'].getDataRows();
            
            for (let i = 0; i < allRows.length; i++) {
                if ( "APRV" == allRows[i].resultProgrsStatus ) {
                    compare++;
                }
            }
            if( compare == 0){
                this.alert("출력 할 이력이 존재하지 않습니다.");
                return;
            } else {
                this.alert('검색옵션의 시험일 기준으로 데이터 출력됩니다.', async () => {
                    //alert('준비 중입니다.')
                    // let url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                    this.ozReport.src = this.$store.getters['auth/getOzTypeList'][4].jspNm
                    + `&siteMstrId=`     + this.$session.get('userInfo').siteMstrId
                    + `&mainCodeId=`    + this.printParamInfo.mainCodeId
                    + `&midCodeId=`     + this.printParamInfo.midCodeId
                    + `&subName=`       + this.printParamInfo.subName
                    + `&standard=`      + this.printParamInfo.standard
                    + `&tstSbjDtlName=` + this.printParamInfo.tstSbjDtlName
                    + `&testType=`      + this.printParamInfo.testType
                    + `&testDateFr=`    + this.printParamInfo.testDateFr
                    + `&testDateTo=`    + this.printParamInfo.testDateTo
                    + `&testInstt=`     + this.printParamInfo.testInstt
                    + `&userId=`        + this.$session.get('userInfo').userId
                    + `&userNm=`        + this.$session.get('userInfo').userNm
                    + `&userType=`      + this.$session.get('userInfo').userType
                    + `&userTitle=`      + this.$session.get('userInfo').jobTitle
                    
                    //console.log(this.ozReport)
                    window.open(this.ozReport.src, '_blank')
                })
            }
            //qlityTestPrsecAcmsltReprt : 품질시험 검사실적 보고서
        },
        /** 엑셀 다운로드 */
        fn_exportExcel: function (sheet) {
            this.excelDownload.options   = {
                Cfg: sheet.options.Cfg,
                Cols : sheet.options.Cols.filter((item => 
                    !['chk'].includes(item.Name)
                    && !['registStatus'].includes(item.Name)
                    && !['reqestStatus'].includes(item.Name)
                    && !['testStatus'].includes(item.Name)
                    && !['setleStatus'].includes(item.Name)
                    && !['testInfo'].includes(item.Name)
                    && !['rqstdoc'].includes(item.Name)
                    && !['resultDetail'].includes(item.Name)
                    && !['splorePhoto'].includes(item.Name)
                    && !['screDoc'].includes(item.Name)
                ))
            }
            // this.excelDownload.downloadOption = {
            // }
            this.excelDownload.fileName  = `시험결과관리_${this.$moment().format('YYYYMMDD')}.xlsx`
            this.excelDownload.data = sheet.getDataRows();
            this.excelDownload.request  = true
        },
        fnChange() {
            this.getCategoryData();
            this.initSheet();
        },
        hiddenCol(e){
            this.hiddenCheck = e.target.checked
            this.initSheet()
        }   
    }
}
</script>

<style lang="scss" >
.iframe-height {
    height: 1000px;
}
</style>