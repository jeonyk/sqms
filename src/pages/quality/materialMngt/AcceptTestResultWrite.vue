<template>
        <div class="tab_contents">
            <div class="inner type2">
                <h2 class="sub_title" v-if="testStatus != 'APVL' && testStatus != 'APRV'">인수검사
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="beforeInsertCheck" v-if="checkUser(userId,'change')">저장</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="fnDeleteChk" v-if="checkUser(userId,'unuse')">삭제</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="insertSign" v-bind:class="{disabled:testStatus==='REGT'}" v-if="checkUser(userId,'write')">결재상신</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="goList">목록</button>
                    </div>
                </h2>
                <h2 class="sub_title" v-else>인수검사 상세보기
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="viewAprv" v-if="checkUser(userId,'view')">결재보기</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="goList">목록</button>
                    </div>
                </h2>
                <div class="data_num">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="170">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>신청번호</th>
                                <td>{{docSeq}}</td>
                            </tr>
                            <tr>
                                <th>기자재공급원승인번호</th>
                                <td>{{spDocSeq}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <div class="data_num">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="170">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>신청번호</th>
                                <td>WA2101-공통-인수검사-2021–587</td>
                            </tr>
                            <tr>
                                <th>기자재공급원승인번호</th>
                                <td>WA2101-공통-자재승인-2021–0187</td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
                
                <div class="lst_data mt0">
                    <div class="table_normal_list table_write" v-if="testStatus != 'APVL' && testStatus != 'APRV'">
                        <table>
                             <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="130">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">검사 실시일</span></th>
                                    <td>
                                        <!-- <Datepicker ref="datapicker" v-on:value-change="dateChange" /> -->
                                        <DatePicker v-model="accpInspDt" :format="'YYYY-MM-DD'"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table_normal_list" v-else>
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="130">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>검사 실시일</th>
                                    <td>
                                        {{accpInspDt}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="data_tit">1. 기본정보</div>
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <!-- <col width="80">
                                <col width="*"> -->
                                <col width="100">
                                <col width="*">
                                <col width="130">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">공종</span></th>
                                    <td>{{mainName}}</td>
                                    <th><span class="emp_red">세부공종</span></th>
                                    <td>{{midName}}</td>
                                    <!-- <th>제품고유 모델명</th>
                                    <td><input type="text" class="form_control" placeholder="입력해주세요"></td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="data_tit" v-if="testStatus != 'APVL' && testStatus != 'APRV'">2. 인수검사결과입력</div>
                    <div class="data_tit" v-else>2. 인수검사결과</div>
                    <!-- ibsheet -->
                    <div class="ib_wrap">
                        <div id="rstTable" class="ibsheet_table"></div>
                    </div>
                    
                    <div class="data_tit">3.인수검사Check List</div>
                    <!-- ibsheet -->
                    <div class="ib_wrap">
                        <div id="checkLstTable" class="ibsheet_table"></div>
                    </div>

                    <div class="data_tit">4. 첨부파일 </div>
                    <div v-if="testStatus != 'APVL' && testStatus != 'APRV'">
                        <div class="line_box check_area">
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="fileEquipYn">
                                <span class="label_text">기자재 송장 사본</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="fileChklstYn">
                                <span class="label_text">체크리스트</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="fileScoreYn">
                                <span class="label_text">시험성적서</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="filePicYn">
                                <span class="label_text">검사사진</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="fileEtcYn">
                                <span class="label_text">기타</span>
                            </label>
                        </div>
                        <LstFile v-bind:lst-file-rst="lstFileRst"
                            v-bind:files="files"
                            v-bind:second-remove-file-id="secondRemoveFileId"
                            v-on:file-changed="fileChanged"
                            v-on:file-removed="fileRemoved"
                            :downloadable="checkUser(userId,'down')"  
                        />
                        <div class="data_tit">5. 사진등록 </div>
                        <LstImg
                            v-bind:lst-file-rst="lstImgRst"
                            :files="img"
                            :copied-file-ids="copiedFileIds"
                            :copied-files="copiedFiles"
                            @file-changed="imageChanged"
                            @file-removed="imageRemoved"
                            @return-reset="resetCopyYn=false"
                            :downloadable="checkUser(userId,'down')"
                            :reset-copy-yn="resetCopyYn"
                            :file-type="'accpQltyPicturePop'"
                        />
                    </div>
                    <div v-else>
                        <div class="line_box check_area">
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="fileEquipYn" disabled>
                                <span class="label_text">기자재 송장 사본</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="fileChklstYn" disabled>
                                <span class="label_text">체크리스트</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="fileScoreYn" disabled>
                                <span class="label_text">시험성적서</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="filePicYn" disabled>
                                <span class="label_text">검사사진</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" id="" name="" checked="" v-model="fileEtcYn" disabled>
                                <span class="label_text">기타</span>
                            </label>
                        </div>
                        <div class="lst_file">
                            <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                            <ul>
                                <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                                    <a href="javascript:void(0); " v-on:click="orgFileDown('file',index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                                </li>
                            </ul>
                        </div>
                        <div class="data_tit">5. 사진 </div>
                        <div class="lst_img">
                            <ul>
                                <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex">
                                    <div class="img_wrap" v-if="mngrImgRst.fileQltArcvId != null && mngrImgRst.fileQltArcvId != ''">
                                        <p class="img_area"><img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrImgRst.fileQltArcvId"></p>
                                    </div>
                                    <a href="javascript:void(0);" v-on:click="orgFileDown('img',mIndex)">
                                        <i class="ico_file" :class="fn_getFileIcons(mngrImgRst.orgFileName)">{{mngrImgRst.orgFileName}}</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <PopAlert 
                v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
            />

            <!-- <pop-alert
                pop-id="acceptTestApprovalAlert"
                :msg="popMsg"
                :btn-name="{first : '확인', second : '취소'}"
                confirm-use
                @first-btn-fn="saveApprovalData"
                @second-btn-fn="$bvModal.hide('acceptTestApprovalAlert')"
            /> -->
            <approve
                ref-id="acceptanceWriteApproveModal"
                doc-type="MTRL"
                :code-type="approve.codeType"
                :code-dtl-type="approve.codeDtlType"
                :main-code-id="approve.mainCodeId"
                :mid-code-id="approve.midCodeId"
                :request-id="approve.requestId"
                :doc-name="approve.docName"
                :doc-seq="approve.docSeq"
                :file-type="approve.fileType"
                :site-mstr-id="approve.siteMstrId"
                @callback="fn_setSourceApproval"
                alertable
            />
            <approval-view
                ref-id="AcceptTestResultWrite_AprvView"
                :aprv-info-id="approvalViewId"
            />
        </div>
</template>

<script>
   import LstFile from '../../common/popup/LstFile.vue'
   import LstImg from '../../common/popup/LstImg.vue'
//    import Datepicker from '../../common/popup/Datepicker.vue'
   import loader from '@ibsheet/loader'
   import API from '@/apis/'
   import axios from 'axios'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'
   import { Material9, Material10 } from '@/pages/common/data/MaterialsList'
   import { sendPostApi, requestOptions } from '../../../apis/common';
   import { sendFileApi, requestFileOptions } from '../../../apis/common';
   import Approve from '@modal/approval/Approve.vue'
   import ApprovalView from '@modal/approval/ApprovalView.vue'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
   import commonUtilMixins from '@plugin/mixin/CommonUtil.js'
   import DatePicker from '@component/common/DatePicker.vue'

   let firstSheetId = '';
   let secondSheetId = '';

   export default {
        name: 'AcceptTestResultWrite',
        mixins: [MsgBoxMixins, authCheckMixns, commonUtilMixins],
        components: {
            LstFile,
            LstImg,
            // Datepicker,
            DatePicker,
            PopAlert,
            Approve,
            ApprovalView,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0,                              // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'],             // tab name
                popMsg: '',                                 // 알림창 메세지
                confirmUse: '',                             // 알림창 버튼개수
                popId:'accpLstAlert',                       // 알림창 Id
                inUser:'',                                  // 등록자
                // siteMstrId: '',                          // 현장정보Id
                mtrlSpApprId : '',                          // 자재공급원승인Id
                // mtrlAccpTsId : '',                       // 인수검사 Id
                docSeq:'',
                spDocSeq: '',
                accpInspDt: '',                             // 검사 실시일 
                testStatus: '',                             // 현황
                mainName : '',                              // 공종명
                midName : '',                               // 세부공종명
                prdtNm : '',                                // 품명
                prdtDtl : '',                               // 상세품명
                stnd : '',                                  // 규격
                spprNm : '',                                // 공급업체명
                mnft : '',                                  // 제조업체명
                designAmt : '',                             // 설계량
                unit: '',                                   // 단위
                total : '',                                 // 누계
                rcvAmt : 0,                                 // 입고량
                brAmt : 0,                                  // 반입량
                rjtAmt : 0,                                 // 불합격량
                imdtShmtYn : '',                            // 즉시출고 여부
                shmtDt : '',                                // 출고일
                comment : '',                               // 비고
                // mainCodeId : '',
                // midCodeId : '',
                mtrlSpApprSubId : '',                       // 자재공급원승인 자재 Id
                mtrlAccpTsSubId : '',                       // 인수검사 자재 Id
                accpChkListId : '',                         // 인수검사 체크리스트 Id
                mtrlPrjtDtlId : '',                         // 본사 자재 분류체계 Id
                prjtChkListId : '',                         // 본사 체크리스트 Id
                mtrlSiteDtlId : '',                         // 현장 자재 분류체계 Id
                siteChkListId : '',                         // 현장 체크리스트 Id
                accpChkRslt : '',                           // 검사결과
                msrs : '',                                  // 조치사항
                fileEquipYn : false,                        // 첨부파일유무-기자재송장사본
                fileChklstYn : false,                       // 첨부파일유무-체크리스트
                fileScoreYn : false,                        // 첨부파일유무-시험성적서
                filePicYn : false,                          // 첨부파일유무-검사사진
                fileEtcYn : false,                          // 첨부파일유무-기타
                insertCheckYn : false,                      // 필수요소검사유무
                insertSignYn: false,
                errorYn : false,                            // 에러 체크
                signYn: false,
                saveYn :false,
                firstSheet :null,                           // 아이비시트 첫번째
                secondSheet : null,                         // 아이비시트 두번째
                dtlData : [],                               // param용 dtl
                checkListData :[],                          // param용 체크리스트     
                siteMstrId : '',            
                aprvOptnType:'',

                //파일 리스트및 삭제
                lstFileRst : [],
                lstImgRst : [],
                files : [],
                img : [],
                copiedFileIds : [],
                copiedFiles : [],
                secondRemoveImgId:[],                       // 이미지용 삭제 Id
                resetCopyYn:false,
                totalCnt:0,
                totalSize:0,
                bytes:"KB",

                //파일 추가
                fileConnectId: 0,

                tempFileLst : [],                           // 등록된 파일 데이터
                secondRemoveFileId:[],                      // 등록된 파일 데이터 아이디
                tempFiles : [],                             // 등록되지않은 파일 임시데이터
                approve: {
                    codeType: 'MTRL',
                    codeDtlType: 'TSAC',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: null,
                },
                userId:'',
                approvalViewId:'',
            }
        },
        props: {
            // mtrlSpApprId: {
            //     type: String,
            //     default : ''
            // },
            mtrlAccpTsId: {
                type: String,
                default : ''
            },
            status:{
                type: String,
                default : 'REGT'
            },
            mainCodeId:{
                type: String,
                default : ''
            },
            midCodeId:{
                type: String,
                default : ''
            },
        },
        mounted() {
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.userId = this.$store.getters['auth/getUserId'];
            if(this.status != '' && this.status != null && typeof(this.status) != 'undefined'){
                this.testStatus = this.test;
            }
            this.detailInfo();
            /** */
            // quality/materialMngt/siteCheckList/list
        },
        beforeDestroy() {
            // loader.removeSheet(firstSheetId);
            // loader.removeSheet(secondSheetId);
        },

        methods: {
            detailInfo: async function(){
                this.lstFileRst = []
                this.lstImgRst = []
                this.img = []
                this.copiedFiles = [];
                this.copiedFileIds = [];
                this.secondRemoveImgId = [];
                this.resetCopyYn= true;
                // this.siteMstrId = this.$cookies.get("siteMstrId");
                //console.log(this.mtrlAccpTsId == '');
                if(this.mtrlAccpTsId == '' || this.mtrlAccpTsId  == null ||typeof(this.mtrlAccpTsId) == 'undefined'){
                    // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    // this.$router.go(-1);
                    // //console.log(this.mtrlAccpTsId);
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name: 'AcceptTestList'});
                    return;
                }
                
                let param = {
                    "siteMstrId": this.siteMstrId,
                    // "mtrlSpApprId": this.mtrlSpApprId,
                    "mtrlAccpTsId": this.mtrlAccpTsId,
                };
                try{
                    const rst = await API.material.getAccptTestDtl(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(rst);
                    // if(rst.statusText == 'OK'){
                    if(rst.status == 200){
                        let resultData = rst.data.data;
                        this.mainName = resultData.mainName;
                        this.midName = resultData.midName;
                        this.spprNm = resultData.spprNm;
                        this.mnft = resultData.mnft;
                        this.mtrlSpApprId = resultData.mtrlSpApprId;
                        this.prdtNm = resultData.prdtNm;
                        this.fileEquipYn = resultData.fileEquipYn == 'Y'? true:false;
                        this.fileChklstYn = resultData.fileChklstYn == 'Y'? true:false;
                        this.fileScoreYn = resultData.fileScoreYn == 'Y'? true:false;
                        this.filePicYn = resultData.filePicYn == 'Y'? true:false;
                        this.fileEtcYn = resultData.fileEtcYn == 'Y'? true:false;
                        // this.mainCodeId = resultData.mainCodeId;
                        // this.midCodeId = resultData.midCodeId;
                        this.docSeq = resultData.docSeq;
                        this.spDocSeq = resultData.spDocSeq;
                        this.accpInspDt = resultData.accpInspDt;
                        this.aprvOptnType = resultData.aprvOptnType;
                        this.testStatus = resultData.testStatus;
                        this.approvalViewId = resultData.aprvInfoId;

                        if(this.accpInspDt == '' || this.accpInspDt == null){
                            let today = new Date();
                            let year = today.getFullYear();
                            let month = today.getMonth() +1;
                            let date = today.getDate();
                            let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);
                            this.accpInspDt = dateFormat;
                        }
                        // if(this.testStatus == 'REGT' || this.testStatus == 'CHECK'){
                        //     this.$refs.datapicker.valueChange(this.accpInspDt);
                        // }

                        //공종 혹은 세부공종값이 없을시
                        if(this.mainName == '' || this.mainName == null){
                            throw new Error('something went wrong');
                        }
                        if(this.midName == '' || this.midName == null){
                            throw new Error('something went wrong');
                        }
                        
                        //인수검사 dtl
                        let data1 = resultData.data;
                        let options1 = Material9.options;
                        options1.Events = {
                            onAfterClick: this.fnClick,
                            onAfterChange: this.fnChange,
                        };
                        if(data1.length>0){
                            for(let a=0; a<data1.length; a++){
                                data1[a]['prdtNm']=this.prdtNm;
                                /* 2022-10-04 : 즉시출고는 무조건으로 변경 및 hidden처리 */
                                // data1[a]['imdtShmtYn'] = data1[a].imdtShmtYn == 'Y'?1:0;
                                data1[a].imdtShmtYn = true
                                if(this.testStatus == 'APRV' || this.testStatus == 'APVL'){
                                    data1[a]['rcvAmtCanEdit'] = 0;
                                    data1[a]['brAmtCanEdit'] = 0;
                                    data1[a]['rjtAmtCanEdit'] = 0;
                                    /* 2022-10-04 : 즉시출고는 무조건으로 변경 및 hidden처리 */
                                    // data1[a]['imdtShmtYnCanEdit'] = 2;
                                    data1[a]['imdtShmtYnCanEdit'] = 0;
                                    data1[a]['shmtDtCanEdit'] = 0;
                                    data1[a]['commentCanEdit'] = 0;
                                }
                                if(this.testStatus == 'CHECK'|| this.testStatus == 'REGT' ){
                                    data1[a]['shmtDt'] = (data1[a]['shmtDt'] == ''||data1[a]['shmtDt'] == null)?this.accpInspDt:data1[a]['shmtDt'];
                                }
                            }
                        }else{
                            data1 = [];
                        }
                        loader.createSheet({
                            el: 'rstTable',
                            data: data1,
                            options: options1,
                        }).then((sheet) =>{
                            // firstSheetId = sheet.id;
                            this.firstSheet = sheet;
                            this.$nextTick(() => {
                                sheet.blur(0);
                            })
                        });

                        //인수검사 체크리스트
                        let data2 = resultData.checkListData;
                        if(data2.length>0){
                            for(let start = 0; start<data2.length; start++){
                                if(data2[start]['accpChkRslt'] == 'PASS'){
                                    data2[start]['pass'] = true;
                                }else if(data2[start]['accpChkRslt'] == 'UNPASS'){
                                    data2[start]['unPass'] = true;
                                }else{
                                    data2[start]['none'] = true;
                                }
                                if(this.testStatus == 'APRV' || this.testStatus == 'APVL'){
                                    data2[start]['passCanEdit'] = 2;
                                    data2[start]['unPassCanEdit'] = 2;
                                    data2[start]['noneCanEdit'] = 2;
                                    data2[start]['msrsCanEdit'] = 0;
                                }
                            }
                        }else{
                            data2 = [];
                        }

                        let options2 = Material10.options;
                        options2.Events = {
                            onAfterClick: this.fnClick,
                        };
                        loader.createSheet({
                            el: 'checkLstTable',
                            data: data2,
                            options: options2,
                        }).then((sheet) =>{
                            // secondSheetId = sheet.id;
                            this.secondSheet = sheet;
                            this.$nextTick(() => {
                                sheet.blur(0);
                            })
                        })

                        //첨부파일 가져오기
                        let url = '/sendApi/api/file/upFileList';
                        let param = {
                            fileType : "MeterialMngt",
                            fileConnectId : this.mtrlAccpTsId,
                        };
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        const fileRst = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // //console.log(e);
                            return e.response.data;
                        });
                        this.lstFileRst = fileRst.data;

                        //계산식
                        this.totalCnt = 0; //파일갯수
                        this.totalSize = '0 KB';

                        if(this.lstFileRst.length>0){
                            let inputFileSize = 0;
                            for(let i = 0; i< this.lstFileRst.length;i++){
                                this.totalCnt++;
                                inputFileSize += parseInt(this.lstFileRst[i].fileSize); //총파일크기
                                this.lstFileRst[i].fileSize = this.formatBytes(parseInt(this.lstFileRst[i].fileSize), 2); //각각의 파일크기
                            }
                            if(inputFileSize > 0){
                                this.totalSize = this.formatBytes(inputFileSize,2);
                            }
                        }
                        
                        //이미지 가져오기
                        param = {
                            fileType : "MeterialMngtImg",
                            fileConnectId : this.mtrlAccpTsId,
                        };
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        const imgRst = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // //console.log(e);
                            return e.response.data;
                        });
                        //console.log(imgRst);
                        this.lstImgRst = imgRst.data;
                    }
                }catch(error){
                    this.errorYn = true;
                    // //console.log(error);
                    this.alert('조회에 실패했습니다.', this.goList);
                    // this.popMsg = '오류로 인해 정보를 불러올 수 없습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                }
            },
            beforeInsertCheck: function(){
                this.popMsg = '';
                this.insertCheckYn = false;
                if(this.accpInspDt == '' || this.accpInspDt == null){
                    this.alert('검사 실시일을 입력해주세요.');
                    // this.popMsg = '검사 실시일을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }
                const sheetRows = this.firstSheet.getDataRows();
                for(let y = 0; y<sheetRows.length; y++){
                    let dtlLst = {};
                    //console.log(sheetRows[y].rcvAmt);
                    //console.log(sheetRows[y].brAmt===0);
                    if(sheetRows[y].rcvAmt == '' || sheetRows[y].rcvAmt == null){
                        if(sheetRows[y].rcvAmt !==0){
                            this.dtlData = [];
                            this.alert('입고량을 입력해주세요.');
                            // this.popMsg = '입고량을 모두 입력해주세요.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                            return;
                        }
                    }
                    if(sheetRows[y].brAmt == '' || sheetRows[y].brAmt == null){
                        if(sheetRows[y].brAmt !== 0){
                            this.dtlData = [];
                            this.alert('반입량을 입력해주세요.');
                            // this.popMsg = '반입량을 모두 입력해주세요.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                            return;
                        }
                    }
                    if(sheetRows[y].rjtAmt == '' || sheetRows[y].rjtAmt == null){
                        if(sheetRows[y].rjtAmt !==0){
                            this.dtlData = [];
                            this.alert('불합격량을 입력해주세요.');
                            // this.popMsg = '불합격량을 모두 입력해주세요.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                            return;
                        }
                    }
                    // if(sheetRows[y].rcvAmt>sheetRows[y].designAmt){
                    //     this.dtlData = [];
                    //     this.popMsg = '설계량을 초과한 입고량이 있습니다.';
                    //     this.confirmUse = false;
                    //     this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    //     return;
                    // }
                    if(sheetRows[y].rcvAmt<0){
                        this.dtlData = [];
                        this.alert('입고량을 확인해주세요.');
                        // this.popMsg = '입고량이 올바르지 않습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                        return;
                    }
                    if(sheetRows[y].rjtAmt>sheetRows[y].rcvAmt){
                        this.dtlData = [];
                        this.alert('불합격량을 확인해주세요.');
                        // this.popMsg = '입고량을 초과한 불합격량이 있습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                        return;
                    }
                    if(sheetRows[y].rjtAmt<0){
                        this.dtlData = [];
                        this.alert('불합격량을 확인해주세요.');
                        // this.popMsg = '불합격량이 올바르지 않습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                        return;
                    }
                    dtlLst['mtrlAccpTsSubId'] = sheetRows[y].mtrlAccpTsSubId;
                    dtlLst['rcvAmt'] = sheetRows[y].rcvAmt;
                    dtlLst['brAmt'] = sheetRows[y].brAmt;
                    dtlLst['rjtAmt'] = sheetRows[y].rjtAmt;
                    /* 2022-10-04 : 즉시출고는 무조건으로 변경 및 hidden처리 */
                    // dtlLst['imdtShmtYn'] = sheetRows[y].imdtShmtYn==1?'Y':'N';
                    dtlLst.imdtShmtYn = 'Y'
                    dtlLst['shmtDt'] = (sheetRows[y].shmtDt == '' || sheetRows[y].shmtDt == null)?this.accpInspDt:IBSheet.dateToString(sheetRows[y].shmtDt,"yyyy-MM-dd");
                    dtlLst['comment'] = sheetRows[y].comment;
                    this.dtlData.push(dtlLst);
                }
                //console.log(this.dtlData);
                const sheetRows2 = this.secondSheet.getDataRows();
                for(let z = 0; z< sheetRows2.length; z++){
                    let checkLst = {};
                    checkLst['accpChkRslt'] = sheetRows2[z].pass==true?'PASS':sheetRows2[z].unPass==true?'UNPASS':sheetRows2[z].none==true?'NONE':'';
                    if(checkLst['accpChkRslt'] == ''){
                        this.alert('검사결과를 선택해주세요.');
                        // this.popMsg = '체크리스트의 검사결과를 모두 선택해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                        return;
                    }
                    checkLst['accpChkListId'] = sheetRows2[z].accpChkListId;
                    checkLst['msrs'] = sheetRows2[z].msrs;
                    this.checkListData.push(checkLst);
                }
                if(this.popMsg == ''){
                    // this.insertCheckYn = true;
                    // this.updateAcceptTest();
                    this.confirm('저장하시겠습니까?',this.updateAcceptTest);
                    return;
                }
            },
            updateAcceptTest : async function(){
                this.errorYn= false;
                this.saveYn = false;
                //정보 저장
                let updateData = {};
                updateData['mtrlAccpTsId'] = this.mtrlAccpTsId;
                updateData['siteMstrId'] = this.siteMstrId;
                updateData['fileEquipYn'] = this.fileEquipYn == true?'Y':'N';
                updateData['fileChklstYn'] = this.fileChklstYn == true?'Y':'N';
                updateData['fileScoreYn'] = this.fileScoreYn == true?'Y':'N';
                updateData['filePicYn'] = this.filePicYn == true?'Y':'N';
                updateData['fileEtcYn'] = this.fileEtcYn == true?'Y':'N';
                updateData['data'] = this.dtlData;
                updateData['checkListData'] = this.checkListData;
                updateData['accpInspDt']=this.accpInspDt;
                updateData.testStatus = 'CHECK'
                //console.log(updateData);
                try{
                    // const change1 = await API.material.setAcceptTestChange(updateData,{
                    //     headers:{
                    //         'Authorization': this.$cookies.get("Authorization")
                    //     }
                    // });
                    const change1 = await API.material.setAcceptTestChange(updateData)
                    //console.log(change1)
                    // if(change1.statusText=="OK"){
                    if(change1.status== 200){
                        //파일 삭제
                        if(this.secondRemoveFileId.length >0){
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            let url = '/sendApi/api/file/fileUnUse';
                            let param = {
                                fileType : "MeterialMngt",
                                fileQltArcvIds : this.secondRemoveFileId
                            };
                            try{
                                const res_data = await sendPostApi(url, param).then((result) => {
                                this.lstFileRst = [];
                                    return result.data;
                                }).catch((e) => {
                                    // //console.log(e);
                                    return e.response.data;
                                });
                                //console.log(res_data);
                            }catch(error){
                                this.errorYn = true;
                                this.alert('저장에 실패했습니다.');
                                // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                return;
                            }
                        }
                        //이미지 삭제
                        if(this.secondRemoveImgId.length >0){
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            let url = '/sendApi/api/file/fileUnUse';
                            let param = {
                                fileType : "MeterialMngtImg",
                                fileQltArcvIds : this.secondRemoveImgId
                            };
                            try{
                                const res_data = await sendPostApi(url, param).then((result) => {
                                this.lstFileRst = [];
                                    return result.data;
                                }).catch((e) => {
                                    // //console.log(e);
                                    return e.response.data;
                                });
                                //console.log(res_data);
                            }catch(error){
                                this.errorYn = true;
                                this.alert('저장에 실패했습니다.');
                                // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                return;
                            }
                        }
                        //파일 저장
                        if(this.files != '' && typeof(this.files) != 'undefined'){
                            requestFileOptions.headers['Accept-Language'] = "ko";
                            requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            this.fileConnectId = this.mtrlAccpTsId;
                            try{
                                let fileSaveRst = await sendFileApi(this.fileConnectId, "MeterialMngt", this.files).then((result) => {
                                    return result.data;
                                }).catch((e) => {
                                    //console.log(e.response.data);
                                    return e.response.data;
                                });
                                let fileRst = fileSaveRst.data; //저장된 데이터개수 받아오기
                                if(fileRst == ''){
                                    this.errorYn = true;
                                    this.alert('저장에 실패했습니다.');
                                    // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                    // this.confirmUse = false;
                                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                    return;
                                }
                            }catch(error){
                                this.errorYn = true;
                                this.alert('저장에 실패했습니다.');
                                // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                return;
                            }
                        }
                        //이미지 저장
                        if((this.img != '' && typeof(this.img) != 'undefined') ||(this.copiedFileIds && this.copiedFileIds.length>0)){
                            requestFileOptions.headers['Accept-Language'] = "ko";
                            requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            this.fileConnectId = this.mtrlAccpTsId;
                            try{
                                let imgSaveRst = await sendFileApi(this.fileConnectId, "MeterialMngtImg", this.img, null, this.copiedFileIds).then((result) => {
                                    return result.data;
                                }).catch((e) => {
                                    //console.log(e.response.data);
                                    return e.response.data;
                                });
                                let fileRst2 = imgSaveRst.data; //저장된 데이터개수 받아오기
                                if(fileRst2 == ''){
                                    this.errorYn = true;
                                    this.alert('저장에 실패했습니다.');
                                    // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                    // this.confirmUse = false;
                                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                    return;
                                }
                            }catch(error){
                                this.errorYn = true;
                                this.alert('저장에 실패했습니다.');
                                // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                return;
                            }
                        }
                        if(!this.errorYn){
                            // this.saveYn = true;
                            // this.popMsg = '저장되었습니다.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                            this.alert('인수검사 결과가 저장되었습니다.',this.detailInfo);
                            // this.testStatus = 'CHECK';
                            this.files = [];
                            this.img = [];
                            return;
                            // this.goList()
                        }
                    }else{
                        throw new Error('something went wrong');
                    }
                }catch(error){
                    this.errorYn = true;
                    this.alert('저장에 실패했습니다.');
                    // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    return;
                }

            },
            insertSign :function(){
                this.popMsg = '';
                if(this.testStatus == 'REGT'){
                    // this.popMsg = '검사 결과가 입력되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    this.alert('검사 결과가 입력되지 않았습니다.');
                    return;
                }
                if(this.testStatus == 'APRV'||this.testStatus == 'APVL'){
                    // this.popMsg = '결재중이거나 결재가 완료된 검사입니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    this.alert('결재중이거나 결재가 완료된 검사입니다.');
                    return;
                }
                if(this.popMsg == ''){
                    this.approve.mainCodeId     = this.mainCodeId;
                    this.approve.midCodeId      = this.midCodeId;
                    this.approve.docSeq         = this.docSeq;
                    this.approve.siteMstrId     = this.siteMstrId ? this.siteMstrId : null;

                    this.approve.requestId      = this.mtrlAccpTsId;
                    this.approve.fileType       = 'MeterialMngt';
                    // temporary
                    this.approve.docName        = '인수검사';
                    this.$bvModal.show('acceptanceWriteApproveModal');

                    // this.signYn = true;
                    // this.confirmUse = true;
                    // this.popMsg = '결재상신하시겠습니까?';
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                }
            },
            saveApprovalData: function() {
                this.signFinal()
            },
            signFinal: async function(){//결재상신
                const urls = {
                        docSeq: '/sendApi/api/docNum/selectDocNumSeq',
                        approveDoc: '/sendApi/api/approv/approvedDoc/write',
                        setAcceptInfo: '/sendApi/api/quality/materialSiteCheck/acceptTest/change',
                    }
                    const payload = {
                        siteMstrId: this.siteMstrId,
                        codeType: 'MTRL',
                        codeDtlType: 'TSAC',
                        gjmcd: this.mainCodeId,
                        gjscd: this.midCodeId,
                        aprvOptnType: this.aprvOptnType,
                        docType: 'MTRL',
                    }
                    // //console.log(payload);
                    const options = {
                        headers: {
                            'Authorization': this.$cookies.get('Authorization'),
                            'Content-Type': 'application/json',
                            'Accept-Language': 'ko'
                        }
                    }

                    axios.post(urls.docSeq, payload, options)
                        .then(response => {
                            axios.post(
                                urls.approveDoc, 
                                {
                                    dmApprvDoc: {
                                        ...payload,
                                        docSeq: this.docSeq,
                                    },
                                }, 
                                options)
                                .then(aprvRes => {
                                    axios.post(
                                        urls.setAcceptInfo,
                                        {
                                            ...payload,
                                            docSeq: this.docSeq,
                                            ...aprvRes.data.datas.dmApprvDoc,
                                            //
                                            mtrlAccpTsId : this.mtrlAccpTsId, 
                                            testStatus : 'APRV',
                                            apprJdmt: 'PASS',
                                        },
                                        options)
                                        .then(setCrackInfoRes => {
                                            
                                            //console.log(setCrackInfoRes)
                                            
                                            this.popMsg = '결재상신 되었습니다.';
                                            this.confirmUse = false;
                                            this.insertSignYn = true;
                                            this.signYn = false;
                                            this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                        })
                                        .catch(error => {
                                            //console.error(error)

                                            this.popMsg = '오류로 인해 결재상신이 완료되지 않았습니다.';
                                            this.confirmUse = false;
                                            this.insertSignYn = false;
                                            this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                            return;
                                        })

                                })
                                .catch(error => {
                                    // throw new Error(error)
                                    //console.error(error)

                                    this.popMsg = '오류로 인해 결재상신이 완료되지 않았습니다.';
                                    this.confirmUse = false;
                                    this.insertSignYn = false;
                                    this.$root.$emit('bv::show::modal', 'accpLstAlert');
                                    return;
                                })
                        })
                        .catch(error => {
                            //console.error(error)

                            this.popMsg = '오류로 인해 결재상신이 완료되지 않았습니다.';
                            this.confirmUse = false;
                            this.insertSignYn = false;
                            this.$root.$emit('bv::show::modal', 'accpLstAlert');
                            return;
                        })
            },
            fn_setSourceApproval: function (payload) {
                //console.log(payload)

                const url = '/sendApi/api/quality/materialSiteCheck/acceptTest/change';
                const _payload = {
                    ...payload,
                    mtrlAccpTsId: this.mtrlAccpTsId,
                    testStatus: 'APVL',
                    apprJdmt: 'PASS',
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(url, _payload, options)
                .then(res => {
                    //console.log(res)

                    // this.popMsg = '결재상신 되었습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = true;
                    // this.signYn = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    this.alert('결재상신 되었습니다.',this.detailInfo);
                    return;
                })
                .catch(error => {
                    //console.error(error)
                    
                    // this.popMsg = '오류로 인해 결재상신이 완료되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = false;
                    // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                    this.alert('결재상신에 실패했습니다.');
                    return;
                })
            },
            fnDeleteChk : function(){
                if(this.testStatus != 'APVL' && this.testStatus != 'APRV'){
                    this.insertSignYn = false;
                    this.confirm("삭제하시겠습니까?", async() =>{
                        let param = {
                            'mtrlAccpTsId':this.mtrlAccpTsId,
                        };
                        let delRst = await API.material.acceptTestUnuse(param);
                        //console.log(delRst);
                        if(delRst.data.data>0){
                            // this.popMsg = '삭제가 완료되었습니다.';
                            // this.confirmUse = false;
                            // this.insertSignYn = true;
                            // this.$root.$emit('bv::show::modal', 'accpLstAlert');
                            this.alert('삭제되었습니다.',()=>{
                                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                this.$router.push({name: 'AcceptTestList'});
                            });
                            return;
                        }else{
                            this.alert('삭제에 실패했습니다.');
                        }
                    });
                }
            },
            alertConfirmFn : function(){
                if(this.saveYn){
                    this.saveYn = false;
                    this.detailInfo();
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    // this.$router.push({name: 'AcceptTestList'});
                    return;
                }
                if(this.insertSignYn){
                    this.insertSignYn = false;
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    // this.$router.go(-1);
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name: 'AcceptTestList'});
                    return;
                }
                if(this.signYn){
                    this.signYn = false;
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    this.signFinal();
                    return;
                }
                // if(!this.errorYn && this.insertCheckYn){
                //     // this.$router.push({name: 'AcceptTestList'});

                //     this.$bvModal.hide(this.popId)
                //     return;
                // }
                if(this.errorYn && this.insertCheckYn) {
                    //console.error('errorYn && insertCheckYn')
                    this.$bvModal.hide(this.popId)
                    return
                }
                if(this.insertCheckYn){
                    this.insertCheckYn = false;
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    // this.goList()

                    return;
                }
                if(this.errorYn){
                    // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    // this.$router.go(-1);
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name: 'AcceptTestList'});
                    return;
                }
                if(!this.confirmUse){
                    this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                    // this.goList()
                    return;
                }else{
                    //console.log('확인버튼');
                }
            },
            orgFileDown: function(type,index){//데이터 등록된 파일'
                let fileCode = '';
                let fileName = '';
                if(type == 'file'){
                    fileCode = this.lstFileRst[index].fileQltArcvId;
                    fileName = this.lstFileRst[index].orgFileName;
                }else if (type == 'img'){
                    fileCode = this.lstImgRst[index].fileQltArcvId;
                    fileName = this.lstImgRst[index].orgFileName;
                }
                
                // //console.log(fileCode);
                
                let element = document.createElement('a');
                element.setAttribute('href','/sendApi/api/fileCall/getMtMngtImgFile/'+fileCode);
                element.setAttribute('download',fileName);
                element.click();
                element.remove();
            },
            formatBytes(bytes, decimals = 0) {//바이트 계산
                if (bytes === 0) return '0 MB';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
            goList : function(){
                // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                // this.$router.go(-1);
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name: 'AcceptTestList'});
            },
            dateChange : async function(param) { //date-picker value change event
                this.accpInspDt = param;
                //console.log(this.accpInspDt);
            },
            fileChanged(payload) {
                this.files = payload
                //console.log("this.files");
                //console.log(this.files);
            },
            fileRemoved(id) {
                this.secondRemoveFileId = id
                //console.log("fileRemoved"+this.secondRemoveFileId);
            },
            imageChanged(payload){
                this.img = payload.file;
                this.copiedFileIds = payload.copyIds;
            },
            imageRemoved(id) {
                this.secondRemoveImgId = id
                //console.log("fileRemoved"+this.secondRemoveImgId);
            },
            fnClick: function(evt){
                //console.log(evt.row);
            },
            closePop: function(){
                //console.log('click close - alert')
                this.signYn = false;
                this.$root.$emit('bv::hide::modal', 'accpLstAlert');
                return;
            },
            fnChange:function(evt){
                console.log(evt.col);
                if(evt.col == 'rcvAmt' || evt.col == 'rjtAmt'){
                    let replaceVal = evt.val.toString().replaceAll('.','').replaceAll(',','')
                    if(isNaN(replaceVal) || replaceVal == '' || replaceVal < 0){
                        evt.row[evt.col] = ''
                    }
                    evt.row['brAmt'] = evt.row['rcvAmt']-evt.row['rjtAmt'];
                    evt.sheet.refreshRow(evt.row);
                }
            },
            viewAprv:function(){
                this.$root.$emit('bv::show::modal', 'AcceptTestResultWrite_AprvView');
            }
        }
   }
</script>