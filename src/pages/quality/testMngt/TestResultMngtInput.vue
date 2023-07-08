<template>
    <div class="tab_contents">
        <h2 class="sub_title">
            <template v-if="checklist.pageMode==='detail'">
                결과 상세
                <div class="fr">
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="aprvDtl" v-if="testDetail.resultProgrsStatus === 'RGPR' ||  testDetail.resultProgrsStatus === 'APRV' || testDetail.resultProgrsStatus === 'APRE'">결재보기</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="changeEditMode" v-if="testDetail.resultProgrsStatus !== 'RGPR' && testDetail.resultProgrsStatus !== 'APRV'">수정</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="listBack">목록</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="sendConfirm" v-if="testDetail.resultProgrsStatus !== 'RGPR' && testDetail.resultProgrsStatus !== 'APRV'">결재상신</button>
                     <!-- TTRG: 시험등록, RQPR: 의뢰중, RQRP: 의뢰서 접수 중, RQRA: 의뢰서 접수 완료, TTPR: 시험 중, RGPR: 결제 중, APRV: 완료 -->
                </div>
            </template>
            <template v-else-if="checklist.pageMode==='write'">
                결과 입력
                <div class="fr">
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="saveConfirm">저장</button>
                    <button type="button" class="btn btn_md btn_outline btn_gray" @click="cancelResultWrite">이전</button>
                </div>
            </template>
            <template v-else>
                결과 수정
                 <div class="fr">
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="updateConfirm">저장</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="changeDetailMode">이전</button>
                </div>
            </template>
        </h2>

        <div class="pl30 pr20">
            <div class="table_normal_list mt10">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="10%">
                        <col width="*">
                        <col width="12%">
                        <col width="*">
                        <col width="12%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>시험기관</th>
                            <td>{{ testDetail.testInsttName }}</td>
                            <th>등록일</th>
                            <td>{{ formatDate(testDetail.upDttm) }}</td>
                            <th>시험일</th>
                            <td>
                                <span v-show="checklist.pageMode==='detail'">{{ testDetail.testDate }}</span>
                                <span v-show="checklist.pageMode==='edit' || checklist.pageMode==='write'"><Datepicker ref="testDatepicker" v-on:value-change="registDateChange" v-on:value-reset="registDateReset" /></span>
                            </td>
                        </tr>
                        <tr>
                            <th>시료 개수</th>
                            <td>{{ testDetail.sploreCo }}</td>
                            <th>시료량</th>
                            <td>{{ testDetail.sploreQy }}</td>
                            <th>아스콘 시공량</th>
                            <td>{{ testDetail.apnrtCnstrctQy }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="inner">
            <div class="button_box">
                <strong>시험 종별 목록</strong>  
                <!-- <div class="fr" v-if="checklist.pageMode==='write'">
                    <button type="button" class="btn btn_sm btn_darkgray" v-b-modal.TestSearch>추가</button>
                    <button type="button" class="btn btn_sm btn_darkgray" @click="deleteConfirm">삭제</button>
                </div>  -->
            </div>

            <div class="ib_wrap">
                <div id="resultSheet" class="ibsheet_table" style="height:300px"></div>
            </div>

            <div class="button_box"><strong>시료사진</strong></div>
            <LstImg
                :lst-file-rst="attachments.image.fileRegistered"
                :files="attachments.image.files"
                :second-remove-file-id="attachments.file.requestForDelete"
                @file-changed="imageChanged"
                @file-removed="imageRemoved"
                @return-reset="attachments.file.resetCopyYn=false"
                :uploadable="checklist.pageMode!=='detail'"
                :copyable="checklist.pageMode!=='detail'"
                :reset-copy-yn="attachments.file.resetCopyYn"
                countable
                downloadable
                :file-type="'testResultQltyPicturePop'"
            />

            <div class="button_box"><strong>성적서</strong></div>
            <LstFile
                :lst-file-rst="attachments.file.fileRegistered"
                :files="attachments.file.files"
                :second-remove-file-id="attachments.file.requestForDelete"
                @file-changed="fileChanged"
                @file-removed="fileRemoved"
                :uploadable="checklist.pageMode!=='detail'"
                downloadable
            />
        </div>

        <!-- 시험 추가 팝업 -->
        <!-- <AddTestPopup :testDetail="checklist" @selectTestData="selectTestData"></AddTestPopup> -->

        <!-- 결재상신 import -->
        <approve
            ref-id="TestResultMngtInput_ApproveModal"
            doc-type="TEST"
            :code-type="approve.codeType"
            :code-dtl-type="approve.codeDtlType"
            :main-code-id="approve.mainCodeId"
            :mid-code-id="approve.midCodeId"
            :request-id="approve.testResultMngtSeq"
            :doc-name="approve.docName"
            :doc-seq="approve.docSeq"
            :file-type="approve.fileType"
            :site-mstr-id="approve.siteMstrId"
            @callback="fn_callbackApproval"
            alertable
        />
        <approval-view
            ref-id="TestResultMngtInput_AprvView"
            :aprv-info-id="aprvInfoId"
            :request-id="requestId"
            :optional="{docType: 'compare'}"
        />
        <!-- alert popup -->
        <!-- <wrapped-alert
            refs="alertPopup"
            :ref-id="popup.refId"
            :title="popup.title"
            :is-show.sync="popup.isShow"
            :message="popup.message"
            :purpose="popup.purpose"
            :use-cancel-button="popup.useCancelButton"
            @click-confirm="clickPopupConfirm"
            @click-cancel="clickPopupCancel"
        /> -->
    </div>
</template>

<script>
    import axios from 'axios';
    import LstFile from '@/pages/common/popup/LstFile'
    import LstImg from '@/pages/common/popup/LstImg'
    import loader from '@ibsheet/loader'
    import { testResultWrite } from '@/pages/quality/testMngt/data/testData';
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Datepicker from '@/pages/common/popup/Datepicker.vue';
    import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

    import AddTestPopup  from '@/pages/quality/testMngt/component/AddTestPopup.vue';
    import Approve from '@modal/approval/Approve.vue'
    import { mapGetters } from 'vuex';

    import ApprovalView from '@modal/approval/ApprovalView.vue'

    export default {
        name: 'TestResultMngtInput',
        mixins: [MsgBoxMixins],
        components: {
            LstFile,
            LstImg,
            Datepicker,
            AddTestPopup,
            WrappedAlert,
            Approve,
            ApprovalView
        },
        props: {
            requestParams : {
                type: Object,
                default: null
            }
        },
        computed: {
            ...mapGetters({
                checklist: 'testMngt/getTestMngtCheckList'
            })
        },
        data() {
            return {
                footerBg: 'transparent',

                pageMode: '',    // 'detail', 'write', 'edit'
                // testType: '',

                grid: {
                    sheetEl: [],
                    sheetId: [],
                    data: [],
                    options: {},
                },

                testDetail: {},

                disable: false,
                attachments: {
                    file: {
                        fileRegistered: [],
                        files: [],
                        requestForDelete: []
                    },
                    image: {
                        fileRegistered: [],
                        files: [],
                        requestForDelete: [],
                        copiedFileIds : [],
                        resetCopyYn:false,
                    }
                },
                lstFiles: [],
                lstImg: [],
                lstDoc: [],

                /* 결재상신 */
                approve: {
                    codeType: 'TEST',
                    codeDtlType: '',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    testResultMngtSeq: null,
                    fileType: null,
                    siteMstrId: null,
                },

                popup: {
                    title: '',
                    isShow: false,
                    message: '',
                    useCancelButton: false,
                    buttonName: {},
                    refId: 'testResultMngtInputAlert',
                    purpose: '',

                },              
                
                //결재보기
                aprvInfoId : '',
                requestId : '',
            }
        },
        mounted() {
            //loader.removeSheet('result');

            this.initSheet();

            //console.log("@@@@ checklist : %o",this.checklist);

            const ibsheet = loader.getIBSheetStatic();
            // console.log("loader : %o", ibsheet)

        },
        beforeDestroy() {
            this.removeSheet();
        },

        methods: {
            initSheet() {   // createSheet 
                                
                this.pageMode = this.checklist.pageMode;
                this.testType = this.checklist.testType;
                
                this.grid.options = testResultWrite.options;
                this.grid.options.Events = {
                    onAfterChange: this.afterChangeTestResult,
                    onRenderFirstFinish: this.dataLoad,
                    onRenderFinish: (evt) => {
                        evt.sheet.getDataRows().forEach(row => {
                            if (row.tstSbjDtlName === row.tstSbjNameLvl1) {
                                evt.sheet.setMergeRange(row, 'tstSbjDtlName', row, 'tstSbjNameLvl1')
                            }
                        })
                    },
                };
                this.grid.options.Cfg = {
                    NoVScroll: 0,
                    DataMerge : 1,
                    MergeCellsMatch: true,
                    PrevColumnMerge: 1,
                    FixPrevColumnMerge: 'tstSbjDtlName',
                };
                
                loader.createSheet({
                    el: 'resultSheet',
                    id: 'result',
                    data: this.grid.data,
                    options: this.grid.options
                }).then((sheet) => {
                    this.grid.sheetEl['resultSheet'] = sheet;
                    this.grid.sheetId.push(sheet.id);
                    // this.setGridData(this.$route.params);
                });
            },
            removeSheet() {
                this.grid.sheetEl['resultSheet'].dispose();
                for (var i = 0; i < this.grid.sheetId.length; i++) {
                    loader.removeSheet(this.grid.sheetId[i]);
                }
                this.grid = null;
            },
            async setGridData(param) {    // 데이타 가져오기: 결과판정 상세정보 조회
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/testMngt/testResultMngt/testResultInput/list';
                let payload = { 
                    ...param,
                    siteMstrId: this.$cookies.get('siteMstrId'),
                };

                try {
                    const { data } = await sendPostApi(url, payload);
                    this.grid.data = data.datas.dlChoiseSubject;
                    this.testDetail = data.datas.dmTestDetail;    // 시험 상세

                    if(this.testDetail.testDate === null || this.testDetail.testDate === '') {  // datepicker 초기값 set
                        this.testDetail.testDate = new Date().toISOString().split('T')[0];
                    } else {
                        let arrDate = [];
                        let str = this.testDetail.testDate;

                        arrDate.push(str.substring(0,4));
                        arrDate.push(str.substring(4,6));
                        arrDate.push(str.substring(6,8));
                        this.testDetail.testDate = arrDate.join('-');

                        this.$refs.testDatepicker.valueChange(this.formatDate(this.testDetail.testDate));
                    }
                    
                    if(this.pageMode === 'detail') {   
                        this.grid.sheetEl['resultSheet'].hideCol('chk');
                        for( let i = 0; i < this.grid.options.Cols.length; i++ ) {
                            this.grid.sheetEl['resultSheet'].setAttribute(null, this.grid.options.Cols[i].Name, 'CanEdit', 0, 1); 
                        }
                    } else{ // 입력, 수정
                        this.grid.sheetEl['resultSheet'].showCol('chk');

                        let arrNames = ['chk', 'standard', 'minValue', 'minRange', 'maxValue', 'maxRange', 'testUnit', 'testResult', 'testCost'];
                        for( let i = 0; i < arrNames.length; i++ ) {
                            this.grid.sheetEl['resultSheet'].setAttribute(null, arrNames[i], 'CanEdit', 1, 1); 
                        }
                    }

                    this.grid.sheetEl['resultSheet'].loadSearchData({
                        data: this.grid.data,
                        append: false
                    });

                    this.setMergeRow();
                    this.upFileList();
                } catch (error) {
                    console.log(error.response);
                }
            },
            dataLoad() {
                this.setGridData(this.checklist);
            },
            setMergeRow() {    // area merge
                const options = {
                    key: 'minRange',
                    startColumnName: 'minValue',
                    endColumnName: 'testUnit',
                }
                
                let allRows = this.grid.sheetEl['resultSheet'].getDataRows();

                for (let i = 0; i < allRows.length; i++) {
                    if (allRows[i][options.key] == 'YN' || allRows[i][options.key] == '이상유무' || allRows[i][options.startColumnName] == 'YN') {
                        // this.grid.sheetEl['resultSheet'].setMergeRange(allRows[i], options.startColumnName, allRows[i], options.endColumnName);
                        allRows[i][options.startColumnName] = '이상유무';
                        allRows[i].minRange = '이상유무';
                        allRows[i].maxValue = '이상유무';
                        allRows[i].maxRange = '이상유무';
                        
                        this.grid.sheetEl['resultSheet'].setAttribute(allRows[i], 'testResult', 'Type', 'Enum', 1);
                        this.grid.sheetEl['resultSheet'].setAttribute(allRows[i], 'testResult', 'Enum', '|선택|이상있음|이상없음', 1);
                        this.grid.sheetEl['resultSheet'].setAttribute(allRows[i], 'testResult', 'EnumKeys', '||이상있음|이상없음', 1);
                    }
                }
            },
            
            afterChangeTestResult(evt) {  // 시험 결과 판정 변경 '합격', '불합격'
                // console.log(evt.row);
                // 최소값 minValue, 최대값 maxValue, 시험 결과 testResult, 시험 결과 판정 testResultJdgmnt
                // 첫번째 범위는 N/A, 이상, 초과
                // 두번째 범위는 N/A, 이하, 미만
                
                let minRange = evt.row.minRange;
                let maxRange = evt.row.maxRange;
                let minVal = evt.row.minValue;
                let maxVal = evt.row.maxValue;
                let testResult = evt.row.testResult;


                switch (evt.col) {
                    case this.grid.options.Cols[10].Name:
                        /* 시험기준 최소값 범위 */
                        if( evt.val == "YN" ) {
                            evt.row.minValue = "이상유무";
                            evt.row.maxValue = "이상유무";
                            evt.row.maxRange = "YN";
                            evt.row.testUnit = "이상유무";
                            evt.row.testResult = "";
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[9].Name, "CanEdit", 0);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[11].Name, "CanEdit", 0);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[13].Name, "CanEdit", 0);

                            this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Type', 'Enum', 1);
                            this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Enum', '|선택|이상있음|이상없음', 1);
                            this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'EnumKeys', '||이상있음|이상없음', 1);
                        } else {
                            //console.log(evt.row.maxRange)
                            if (evt.row.minValue == "이상유무"){
                                evt.row.minValue = 0;
                            }
                            if (evt.row.maxValue == "이상유무"){
                                evt.row.maxValue = 0;
                            }
                            if (evt.row.maxRange == "YN"){
                                //evt.row.minRange = "";
                                evt.row.maxRange = "";
                            } else if(evt.row.maxRange == "이상유무") {
                                evt.row.maxRange = "";
                            }
                            if (evt.row.testUnit == "이상유무"){
                                evt.row.testUnit = "";
                            }
                            if (evt.row.minRange == "ETC"){
                                //  alert('기타 선택')
                                evt.row.minValue = '';
                                evt.row.maxRange = '';
                                evt.row.maxValue = '';
                                evt.row.testUnit = '';
                                evt.row.testResult = '';
                                evt.sheet.setAttribute(evt.row, this.grid.options.Cols[12].Name, "CanEdit", 0,1);
                                evt.sheet.setAttribute(evt.row, this.grid.options.Cols[11].Name, "CanEdit", 0,1);
                                this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Type', 'Enum', 1);
                                this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Enum', '|선택|이상있음|이상없음', 1);
                                this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'EnumKeys', '||이상있음|이상없음', 1);
                                
                            } else {
                                evt.row.maxRange = '';
                                evt.row.testResult = 0;
                                evt.sheet.setAttribute(evt.row, 'maxRange', "CanEdit", 0,1);
                                evt.sheet.setAttribute(evt.row, 'maxValue', "CanEdit", 0,1);
                                evt.sheet.setAttribute(evt.row, this.grid.options.Cols[12].Name, "CanEdit", 1,1);
                                evt.sheet.setAttribute(evt.row, this.grid.options.Cols[11].Name, "CanEdit", 1,1);
                                this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Type', 'Float', 1);
                            }
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[9].Name, "CanEdit", 1,1);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[13].Name, "CanEdit", 1,1);
                        }
                        evt.sheet.refreshRow(evt.row);  // 반영
                    break;
                    case this.grid.options.Cols[12].Name:
                        /* 시험기준 최대값 범위 */
                        if( evt.val == "YN" ) {
                            evt.row.minValue = "이상유무";
                            evt.row.maxValue = "이상유무";
                            evt.row.minRange = "YN";
                            evt.row.testUnit = "이상유무";
                            evt.row.testResult = "";
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[9].Name, "CanEdit", 1);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[10].Name, "CanEdit", 1);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[11].Name, "CanEdit", 1);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[12].Name, "CanEdit", 1);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[13].Name, "CanEdit", 1);

                           
                            this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Type', 'Enum', 1);
                            this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Enum', '|선택|이상있음|이상없음', 1);
                            this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'EnumKeys', '||이상있음|이상없음', 1);
                        } else {
                            if (evt.row.minValue == "이상유무"){
                                evt.row.minValue = 0;
                            }
                            if (evt.row.maxValue == "이상유무"){
                                evt.row.maxValue = 0;
                            }
                            if (evt.row.minRange == "YN"){
                                evt.row.minRange = "";
                            } else if(evt.row.minRange == "이상유무") {
                                evt.row.minRange = "";
                            }
                            if (evt.row.testUnit == "이상유무"){
                                evt.row.testUnit = "";
                            }
                            if (evt.row.maxRange == "ETC"){
                                evt.row.minValue = '';
                                evt.row.minRange = 'ETC';
                                evt.row.maxRange = '';
                                evt.row.maxValue = '';
                                evt.row.testUnit = '';
                                evt.row.testResult = '';
                                evt.sheet.setAttribute(evt.row, this.grid.options.Cols[12].Name, "CanEdit", 0,1);
                                evt.sheet.setAttribute(evt.row, this.grid.options.Cols[11].Name, "CanEdit", 0,1);
 
                                this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Type', 'Enum', 1);
                                this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Enum', '|선택|이상있음|이상없음', 1);
                                this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'EnumKeys', '||이상있음|이상없음', 1);
                            }else{
                                evt.sheet.setAttribute(evt.row, this.grid.options.Cols[12].Name, "CanEdit", 1,1);
                                evt.sheet.setAttribute(evt.row, this.grid.options.Cols[11].Name, "CanEdit", 1,1);
                                this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Type', 'Float', 1);
                                evt.row.testResult = 0;
                                
                            }

                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[9].Name, "CanEdit", 1);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[10].Name, "CanEdit", 1);
                            // evt.sheet.setAttribute(evt.row, this.grid.options.Cols[10].Name, "CanEdit", 1);
                            // evt.sheet.setAttribute(evt.row, this.grid.options.Cols[11].Name, "CanEdit", 1);
                            evt.sheet.setAttribute(evt.row, this.grid.options.Cols[13].Name, "CanEdit", 1);
                            // this.grid.sheetEl['resultSheet'].setAttribute(evt.row, 'testResult', 'Type', 'Int', 1);
                            // evt.row.testResult = 0;
                        }
                    break;
                }

                if(testResult !== '' && testResult !== null) {
                    if(isNaN(maxVal)) { // 최대값이 숫자가 아닐 시
                        if(minRange === 'AB' && testResult >= minVal) {    // 이상
                            evt.row.testResultJdgmnt = '합격';
                        } else if (minRange === 'EX' && testResult > minVal) {    // 초과
                            evt.row.testResultJdgmnt = '합격';
                        } else {
                            evt.row.testResultJdgmnt = '불합격';
                        }
                    } else if (isNaN(minVal)) { // 최소값이 숫자가 아닐 시
                        if(maxRange === 'BE' && testResult <= maxVal) {    // 이하
                            evt.row.testResultJdgmnt = '합격';
                        } else if (maxRange === 'BE' && testResult < maxVal) {    // 미만
                            evt.row.testResultJdgmnt = '합격';
                        } else {
                            evt.row.testResultJdgmnt = '불합격';
                        }
                    } else {
                        if(minRange != '' && maxRange != '')  {
                            if(minRange === 'AB' && maxRange === 'BE' && testResult >= minVal && testResult <= maxVal) {    // 이상 / 이하
                                evt.row.testResultJdgmnt = '합격';
                            } else if (minRange === 'AB' && maxRange === 'UN' && testResult >= minVal && testResult < maxVal) {    // 이상 / 미만
                                evt.row.testResultJdgmnt = '합격';
                            } else if (minRange === 'EX' && maxRange === 'BE' && testResult > minVal && testResult <= maxVal) {    // 초과 / 이하
                                evt.row.testResultJdgmnt = '합격';
                            } else if (minRange === 'EX' && maxRange === 'UN' && testResult > minVal && testResult < maxVal) {    // 초과 / 미만
                                evt.row.testResultJdgmnt = '합격';
                            } else {
                                evt.row.testResultJdgmnt = '불합격';
                            }
                            
                        } else {
                            evt.row.testResultJdgmnt = '불합격';
                            if(minRange != '') {
                                if(minRange === 'AB' && testResult >= minVal) {    // 이상 
                                    evt.row.testResultJdgmnt = '합격';
                                } else if(minRange === 'BE' && testResult <= minVal) { // 이하
                                    evt.row.testResultJdgmnt = '합격';
                                } else if(minRange === 'EX' && testResult > minVal) { //초과
                                    evt.row.testResultJdgmnt = '합격';
                                } else if(minRange === 'UN' && testResult < minVal) { // 미만
                                    evt.row.testResultJdgmnt = '합격';
                                }
                            } else if(maxRange != '') {
                                if(maxRange === 'AB' && testResult >= maxVal) {    // 이상 
                                    evt.row.testResultJdgmnt = '합격';
                                } else if(maxRange === 'BE' && testResult <= maxVal) { // 이하
                                    evt.row.testResultJdgmnt = '합격';
                                } else if(maxRange === 'EX' && testResult > maxVal) { //초과
                                    evt.row.testResultJdgmnt = '합격';
                                } else if(maxRange === 'UN' && testResult < maxVal) { // 미만
                                    evt.row.testResultJdgmnt = '합격';
                                }
                            }
                        }       
                    }
                }
                
                if(evt.row.testResult === '이상없음') {
                    evt.row.testResultJdgmnt = '합격';
                } else if (evt.row.testResult === '이상있음') {
                    evt.row.testResultJdgmnt = '불합격';
                }

                this.grid.sheetEl['resultSheet'].refreshCell(evt.row, 'testResultJdgmnt');
                
            },
            saveConfirm() {
                if(this.testDetail.testDate === null || this.testDetail.testDate === '') {  // datepicker 초기값 set
                    //this.openPopup('requiredDate');
                    this.alert("시험일을 선택해 주세요");
                    return;
                }

                // changedRow to Json
                const rows = this.grid.sheetEl['resultSheet'].getDataRows();
                
                let saveValidation = true;
                rows.some((item) => {
                    if(item.testResult === '' || item.testResult === null || item.testResultJdgmnt === '' || item.testResultJdgmnt === null) {
                        //this.openPopup('requiredSave')
                        this.alert("시험 결과 / 시험 결과 판정은 필수 입력 사항입니다");
                        saveValidation = false;
                        return true;
                    } 
                });

                // validation에 이상이 없으면
                if(saveValidation) {
                    //this.openPopup('saveSelectedData');
                    this.confirm("저장하시겠습니까?", () => {
                        this.saveTestResult();
                    })
                }
            },
            cancelResultWrite() {
                //this.openPopup('cancelResultWrite');
                //결과 입력을 취소하시겠습니까?'
                this.confirm("결과 입력을 취소하시겠습니까?", () => {
                    this.$router.push({ name: 'TestResultMngtSheet' })
                })

            },
            async saveTestResult() {   // 결과판정 저장
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/testMngt/testResultMngt/testResultJdgmnt/write';
                
                // changedRow to Json
                const changedInfoToJson = this.grid.sheetEl['resultSheet'].getSaveJson({
                    saveMode: 3
                });

                // payload 수정
                changedInfoToJson.data.forEach((item) => {
                    item.status = item.STATUS;
                    item.testSubjectSeq = this.grid.sheetEl['resultSheet'].getRowById(item.id).testSubjectSeq;
                    item.testDate = this.testDetail.testDate.split('-').join('');

                    if(item.minRange === 'YN' || item.maxRange === 'YN') {
                        item.minValue = 'YN';
                        item.minRange = '';
                        item.maxValue = 'YN';
                        item.maxRange = '';
                        item.testUnit = '';
                    }
                });

                // let registDate = param.split('-').join('');
                // this.registInfo.registDate = registDate;

                let payload = {
                    param: {
                        siteMstrId: this.$cookies.get('siteMstrId'),
                        testResultMngtSeq: this.checklist.testResultMngtSeq,
                        testDate: this.testDetail.testDate.split('-').join(''),
                    },
                    listData: changedInfoToJson.data.reverse()
                };


                try {
                    await sendPostApi(url, payload);
                    this.alert('저장되었습니다.', ()=> {
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                        this.$router.push({ name: 'TestResultMngtSheet' });
                    })
                } catch (error) {
                    console.log(error.response);
                }

                if (this.attachments.image.files.length > 0 || this.attachments.image.copiedFileIds.length > 0) {
                   this.setFile(this.attachments.image.files, 'TestMngtImg',this.attachments.image.copiedFileIds);
                }

                if (this.attachments.file.files.length > 0 ) {
                   this.setFile(this.attachments.file.files);
                }
            },
            updateConfirm(){
                
                if(this.testDetail.testDate === null || this.testDetail.testDate === '') {  // datepicker 초기값 set
                    //this.openPopup('requiredDate');
                    this.alert("시험일을 선택해 주세요");
                    return;
                }

                // changedRow to Json
                const rows = this.grid.sheetEl['resultSheet'].getDataRows();
                
                let saveValidation = true;
                rows.some((item) => {
                    if(item.testResult === '' || item.testResult === null || item.testResultJdgmnt === '' || item.testResultJdgmnt === null) {
                        //this.openPopup('requiredSave')
                        this.alert("시험 결과 / 시험 결과 판정은 필수 입력 사항입니다");
                        saveValidation = false;
                        return true;
                    } 
                });
                // validation에 이상이 없으면
                if(saveValidation) {
                    //this.openPopup('updateSelectedData');
                    this.confirm("수정하시겠습니까?", () => {
                        this.saveTestResultUpdate();
                    })
                }
            },
            async saveTestResultUpdate() {   // 수정사항 저장 : 결과상세 수정 저장
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/testMngt/testResultMngt/testResultDtlResult/change';
                
                // changedRow to Json
                const changedInfoToJson = this.grid.sheetEl['resultSheet'].getSaveJson({
                    saveMode: 1
                });

                // payload 수정
                changedInfoToJson.data.forEach((item) => {
                    item.status = item.STATUS;
                    
                    if(item.minRange === 'YN' || item.maxRange === 'YN') {
                        if( item.minValue != "이상유무" ) {
                            item.minValue = '이상유무';
                        }
                        if( item.maxValue != "이상유무" ) {
                            item.maxValue = '이상유무';
                        }
                        if( item.testUnit != "이상유무" ) {
                            item.testUnit = '이상유무';
                        }
                    }
                });

                let payload = {
                        param: {
                            siteMstrId: this.$cookies.get('siteMstrId'),
                            testResultMngtSeq: this.checklist.testResultMngtSeq,
                            testType: this.checklist.testType,
                            sploreCo: this.testDetail.sploreCo,
                            testDate : this.$moment(this.testDetail.testDate).format('YYYYMMDD')
                        },
                        listData: changedInfoToJson.data
                };

                //console.log(payload)

                // console.log("@@@@ change payload : %o",payload);

                try {
                    await sendPostApi(url, payload);
                    this.alert('수정되었습니다.', () => {
                         this.changeDetailMode();
                    })
                } catch (error) {
                    console.log(error.response);
                }

                if (this.attachments.image.requestForDelete.length > 0) {
                    this.removeFiles(this.attachments.image.requestForDelete);
                }

                if (this.attachments.file.requestForDelete.length > 0) {
                    this.removeFiles(this.attachments.file.requestForDelete);
                }

                if (this.attachments.image.files.length > 0 || this.attachments.image.copiedFileIds.length > 0) {
                   this.setFile(this.attachments.image.files, 'TestMngtImg',this.attachments.image.copiedFileIds);
                }

                if ( this.attachments.file.files.length > 0 ) {
                    this.setFile(this.attachments.file.files);
                }

            },
            async removeFiles(param) {  // file 삭제
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/file/fileUnUse';

                let payload = {
                    fileType : "TestMngt",
                    fileQltArcvIds : param
                };

                try {
                    await sendPostApi(url, payload);
                } catch (error) {
                    console.log(error.response);
                }
            },
            /* 결재상신 */
            sendConfirm() {

                //this.approve.docName        = '경영검토 내용'
                this.approve.siteMstrId = this.$cookies.get('siteMstrId');
                let testType = this.testDetail.testType;
                switch(testType) {
                    case '0001' :   // 현장시험
                        this.testType = 'SITE';
                        this.approve.codeDtlType = this.testType;
                        this.approve.docName = '시험성과 대비표'
                        this.approve.docSeq = this.testDetail.resultRecomDocNo
                        this.approve.testResultMngtSeq = `${this.$cookies.get('siteMstrId')}_${this.testDetail.testResultMngtSeq}`;
                        this.approve.fileType = 'TestMngt'
                        break;
                    case '0002' :   // 의뢰시험
                        this.testType = 'REQT';
                        this.approve.codeDtlType = this.testType;
                        this.approve.docName = '시험성과 대비표'
                        this.approve.docSeq = this.testDetail.rqstdocRecomDocNo
                        this.approve.testResultMngtSeq = `${this.$cookies.get('siteMstrId')}_${this.testDetail.testResultMngtSeq}`;
                        this.approve.fileType = 'TestMngt'
                        break;
                    case '0003' :   // 공장시험
                        this.testType = 'FTRY';
                        this.approve.codeDtlType = this.testType;
                        this.approve.docName = '시험성과 대비표'
                        this.approve.docSeq = this.testDetail.resultRecomDocNo
                        this.approve.testResultMngtSeq = `${this.$cookies.get('siteMstrId')}_${this.testDetail.testResultMngtSeq}`;
                        this.approve.fileType = 'TestMngt'
                        break;
                }
                //this.getDocRequestConfirm();   // 문서번호 생성 docSeq

                this.$bvModal.show('TestResultMngtInput_ApproveModal');
            },
            async getDocRequestConfirm() {    // 의뢰서 결재 상신 문서번호 생성
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/docNum/selectDocNumSeq';
                
                let testType = this.testDetail.testType;
                

                switch(testType) {
                    case '0001' :   // 현장시험
                        this.testType = 'SITE';
                        break;
                    case '0002' :   // 의뢰시험
                        this.testType = 'REQT';
                        break;
                    case '0003' :   // 공장시험
                        this.testType = 'FTRY';
                        break;
                }

                let payload = {
                    siteMstrId: this.$cookies.get('siteMstrId'),
                    codeType: 'TEST',
                    codeDtlType: this.testType,
                    gjmcd: this.checklist.mainCodeId,
                    gjscd: this.checklist.midCodeId,
                };
                
                try {
                    const { data } = await sendPostApi(url, payload);
                    this.approve.docSeq = data;

                } catch (error) {
                    console.log(error.response);
                }
            },
            fn_callbackApproval: function (payload) {
                /* 결재상신 완료 */
                let url   = '/sendApi/api/testMngt/testResultMngt/setleRecomResult/write';
                let param = {
                               testResultMngtSeq: this.testDetail.testResultMngtSeq,
                               siteMstrId: this.$cookies.get('siteMstrId'),
                               resultRecomDocNo : this.approve.docSeq,
                               resultAprvInfoId : payload.aprvInfoId
                            };
                sendPostApi(url, param)
                    .then((data) => {
                        // console.log("data : %o", data.data.count);
                        if( data.data.count > 0 ) {
                            this.alert('결재상신 되었습니다.', () => {
                                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                this.$router.push({ name: 'TestResultMngtSheet' });    
                            });
                            
                        }
                    });
            },            
            deleteConfirm() {
                // let changedInfoToJson = this.grid.sheetEl['resultSheet'].getSaveJson({
                //     saveMode: 3
                // });

                const checkedRow = this.grid.sheetEl['resultSheet'].getRowsByChecked('chk');

                if(checkedRow.length === 0) {
                    //this.openPopup('checkRows');                    
                    this.alert("삭제할 시험을 선택해 주세요");
                    return;
                } else {
                    //this.openPopup('deleteConfirm');
                    this.confirm("삭제하시겠습니까?", () => {
                        this.deleteResultList();
                    })
                }
            },
            async deleteResultList(param) { // 결과판정 삭제
                let checkedRows = this.grid.sheetEl['resultSheet'].getRowsByChecked('chk');
                this.grid.sheetEl['resultSheet'].deleteRows(checkedRows);
                checkedRows.forEach(item => {
                    item.chk = 0;   // 체크 초기화
                    this.grid.sheetEl['resultSheet'].hideRow({
                        row: item,
                        del: false,
                        norender: false
                    });
                });
                checkedRows = null;


                let changedInfoToJson = this.grid.sheetEl['resultSheet'].getSaveJson({
                    saveMode: 3
                });

                changedInfoToJson.data.forEach((item) => {
                    item.tstSbjDtlId = this.grid.sheetEl['resultSheet'].getRowById(item.id).tstSbjDtlId;
                    item.testType = this.grid.sheetEl['resultSheet'].getRowById(item.id).testType;
                    item.testResultMngtSeq = this.grid.sheetEl['resultSheet'].getRowById(item.id).testResultMngtSeq;
                });

                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/testMngt/testResultMngt/testResultInput/delete';

                let payload = {
                    param: {
                        ...param,
                        siteMstrId: this.$cookies.get('siteMstrId'),

                    },
                    listData: changedInfoToJson.data
                }
                
                try {
                    await sendPostApi(url, payload);
                    this.setGridData(this.checklist);
                } catch (error) {
                    console.log(error.response.data);
                }
            },
            
            async upFileList() {   // 파일 업로드 목록 조회
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/file/upFileList';
                let siteMstrId = this.$cookies.get('siteMstrId');
                let testResultMngtSeq = this.testDetail.testResultMngtSeq;
                let fileConnectId = `${siteMstrId}_${testResultMngtSeq}`;
                // let arr_img = [];
                // let arr_doc = [];

                let payload = {
                    'fileConnectId' : fileConnectId 
                };

                try {
                    /* 첨부파일 가져오기 */
                    payload['fileType'] =  'TestMngt';

                    await sendPostApi(url, payload).then(data=>{
                        // console.log(data.data.data)
                        if(data.data.data.length > 0){
                            // data.data.forEach(function(item) { 
                            //     this.attachments.file.fileRegistered.push(item)
                            // })
                            this.attachments.file.fileRegistered = data.data.data
                        }else{
                            this.attachments.file.fileRegistered = [];
                            
                        }
                    });

                     /* 이미지 가져오기 */
                    payload['fileType'] =  'TestMngtImg';

                    await sendPostApi(url, payload).then(data=>{
                        //console.log(data)
                        if(data.data.data.length > 0){
                            // data.data.forEach(function(item) { 
                            //     this.attachments.image.fileRegistered.push(item)
                            // })
                            this.attachments.image.fileRegistered = data.data.data

                            //console.log(this.attachments.image.fileRegistered)
                        }else{
                            this.attachments.image.fileRegistered = [];
                        }
                    });
                } catch (error) {
                    console.log(error.response);
                }
            },
            async setFile(files, fileSubType, copiedFileIds) {   // 파일 업로드
                let siteMstrId = this.$cookies.get('siteMstrId');
                let testResultMngtSeq = this.testDetail.testResultMngtSeq;
                let fileConnectId = `${siteMstrId}_${testResultMngtSeq}`;
                let fileType = ''

                if(fileSubType == 'TestMngtImg'){
                    fileType = 'TestMngtImg';
                }else{
                    fileType = 'TestMngt';
                }
                

                const formData = new FormData();
                formData.append("fileConnectId", fileConnectId);
                formData.append("fileType", fileType);
                if (copiedFileIds) {
                    formData.append("fileCopyIds", copiedFileIds.toString())
                };
                files.forEach((file) => formData.append("file", file));

                try {
                    const response = await axios.post("/sendApi/api/fileUp/fileUploads", formData, {
                        headers: {
                            "Content-Type": "application/json;",
                            "Accept-Language" : "ko",
                            'Authorization' : this.$cookies.get("Authorization")
                        }
                    })
                    // const response = await sendFileApi(fileConnectId, fileType, files, fileSubType);
                    return response;
                } catch (error) {
                    console.log(error.response);
                }
            },
            fileChanged (payload) {
                this.attachments.file.files = payload
            },
            fileRemoved (payload) {
                this.attachments.file.requestForDelete = payload
            },
            imageChanged (payload) {
                this.attachments.image.files = payload.file;
                this.attachments.image.copiedFileIds = payload.copyIds;
            },
            imageRemoved (payload) {
                this.attachments.image.requestForDelete = payload
            },
            formatBytes(bytes, decimals = 1) {
                if (bytes === 0) return '0 Bytes';

                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

                const i = Math.floor(Math.log(bytes) / Math.log(k));

                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },

            formatDate(date) {  // date format 변경
                let today = new Date(date);
                let year = today.getFullYear();
                let month = ('0' + (today.getMonth() + 1)).slice(-2);
                let day = ('0' + today.getDate()).slice(-2);
                let dateString = year + '-' + month  + '-' + day;
                // let hours = ('0' + today.getHours()).slice(-2); 
                // let minutes = ('0' + today.getMinutes()).slice(-2);
                // let seconds = ('0' + today.getSeconds()).slice(-2); 
                // let timeString = hours + ':' + minutes  + ':' + seconds;
                return `${dateString}`;
            },

            changeEditMode() {
                // this.pageMode = 'edit';

                let params = {
                    ...this.checklist,
                    pageMode: 'edit'
                }
                
                this.$store.dispatch('testMngt/setTestMngtCheckList', params);

                this.grid.sheetEl['resultSheet'].showCol('chk');

                let arrNames = ['chk', 'minValue', 'minRange', 'maxValue', 'maxRange', 'testUnit', 'testResult', 'testCost'];
                for( let i = 0; i < arrNames.length; i++ ) {
                    this.grid.sheetEl['resultSheet'].setAttribute(null, arrNames[i], 'CanEdit', 1, 1); 
                }
                
            },
            changeDetailMode() {
                // this.pageMode = 'detail';
                let params = {
                    ...this.checklist,
                    pageMode: 'detail'
                }
                
                this.$store.dispatch('testMngt/setTestMngtCheckList', params);

                this.grid.sheetEl['resultSheet'].hideCol('chk');
                let arrNames = ['chk', 'minValue', 'minRange', 'maxValue', 'maxRange', 'testUnit', 'testResult', 'testCost'];
                for( let i = 0; i < arrNames.length; i++ ) {
                    this.grid.sheetEl['resultSheet'].setAttribute(null, arrNames[i], 'CanEdit', 0, 1); 
                }
            },
            registDateChange : function(param) { //date-picker value change event
                this.testDetail.testDate = param;
            },
            registDateReset : function() { //date-picker valueReset 함수 호출
                this.registInfo.registDate = null;
                this.$refs.testDatepicker.valueReset();
            },

            selectTestData(param) {  // 시험 추가팝업 데이타 선택
                if(param.length === 0) {
                    //this.openPopup('addConfirm');
                    this.alert("추가할 시험을 선택해 주세요");
                    return;
                }
                this.$root.$emit('bv::hide::modal', 'TestSearch');
                this.removeSheet();
                this.initSheet();
            },

            /** alert popup */ 
            openPopup (type) {
                this.popup = {
                    ...this.popup,
                    ...this.default.popup[type],
                }
                this.popup.isShow = true
            }, 
            clickPopupCancel (purpose) {
                this.popup.isShow = false;
                switch(purpose) {
                    case 'saveConfirm':
                        break
                }
            },
            listBack() {
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({ name: 'TestResultMngtSheet' })
            },
            aprvDtl() {
                this.aprvInfoId = this.testDetail.resultAprvInfoId
                this.requestId = `${this.$session.get('userInfo').siteMstrId}_${this.testDetail.testResultMngtSeq}`
                this.$bvModal.show('TestResultMngtInput_AprvView')
            }
        }
   }
</script>

<style>

</style>