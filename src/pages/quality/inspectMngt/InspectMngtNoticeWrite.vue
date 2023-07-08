<template>
    <div class="tab_contents">
        <div class="inner pb0">
            <h2 class="sub_title">{{subTitle}}
                <div class="fr" v-if="!allSiteYn">
                    <template v-if="progrsSttus == 'SVWT' || progrsSttus == 'SVRV'">
                        <button type="button" v-if="checkUser(userId,'write')" class="btn btn_md btn_outline btn_darkgray" @click="fnSaveChk" v-bind:class="{disabled : progrsSttus!='SVWT'  && progrsSttus != 'SVRV'}">저장</button>
                    </template>
                    <button type="button" v-if="checkUser(userId,'change')" class="btn btn_md btn_outline btn_darkgray" @click="finalSaveChk" v-bind:class="{disabled:progrsSttus != 'SVRV'}">작성완료</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fnBack">목록</button>
                </div>
            </h2>
            <div class="table_normal_list mt0">
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
                            <th>검측 번호</th>
                            <td colspan="3">{{inptDoc}}</td>
                        </tr>
                        <tr>
                            <th>검측 등록일(실시일)</th>
                            <td>{{inptOrder == 1|| inptOrder == '1'?inptRegistDate01:inptRegistDate02}}</td>
                            <th><span class="emp_red">검측 요구일</span></th>
                            <td>{{inptOrder == 1|| inptOrder == '1'?inptDemandDate01:inptDemandDate02}}</td>
                        </tr>
                        <tr v-if="progrsSttus == 'SVWT' || progrsSttus == 'SVRV'" >
                            <th><span class="emp_red">검측일</span></th>
                            <td v-if="inptOrder == 1|| inptOrder == '1'">
                                <Datepicker v-model="inptDate01" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                            </td>
                            <td v-if="inptOrder != 1 && inptOrder != '1'">
                                <Datepicker v-model="inptDate02" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                            </td>
                            <th><span class="emp_red">검측 통보일</span></th>
                            <td v-if="inptOrder == 1|| inptOrder == '1'">
                                <Datepicker v-model="inptDspthDate01" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                            </td>
                            <td v-if="inptOrder != 1 && inptOrder != '1'">
                                <Datepicker v-model="inptDspthDate02" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                            </td>
                        </tr>
                        <tr v-else>
                            <th><span class="emp_red">검측일</span></th>
                            <td>{{inptOrder == 1|| inptOrder == '1'?inptDate01:inptDate02}}</td>
                            <th><span class="emp_red">검측 통보일</span></th>
                            <td>{{inptOrder == 1|| inptOrder == '1'?inptDspthDate01:inptDspthDate02}}</td>
                        </tr>
                        <tr>
                            <th>대공종</th>
                            <td>{{mainName}}</td>
                            <th>공종</th>
                            <td>{{midName}}</td>
                        </tr>
                        <tr>
                            <th>세부 공종</th>
                            <td colspan="3">{{subName}}</td>
                        </tr>
                        <tr>
                            <th>위치 및 검측 부위</th>
                            <td>{{inptLc}}</td>
                            <th>도면</th>
                            <td>{{drw}}</td>
                        </tr>
                        <tr>
                            <th>검측 내용</th>
                            <td colspan="3">{{inptCn}}</td>
                        </tr>
                        <tr>
                            <th>협력업체</th>
                            <td>{{ccpyName}}</td>
                            <th>검측 점검표</th>
                            <td>{{siteInptChkTitle}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="inner">
            <div class="button_box mt20">
                <strong>1. Check List</strong>
                <br/>
                <p class="txt_sm">협력사명 (Sub-contractor) : {{ccpyName}}</p>
            </div>

            <!-- ibsheet -->
            <div class="ib_wrap">
                <div id="noticeSheetTable" class="ibsheet_table"></div>
            </div>

            <div class="button_box">
                <strong>2. 사진 대지</strong>
            </div>
            <div class="lst_img" v-if="progrsSttus!='SVWT' && progrsSttus != 'SVRV'">
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
            <LstImg 
                v-bind:lst-file-rst="lstImgRst"
                :files="img"
                @file-changed="imageChanged"
                @file-removed="imageRemoved"
                @return-reset="resetCopyYn=false"
                v-if="progrsSttus == 'SVWT' || progrsSttus == 'SVRV'"
                :file-type="'inspectNoticeQltyPicturePop'"
                :copied-file-ids="copiedFileIds"
                :reset-copy-yn="resetCopyYn"
            />

            <div class="button_box">
                <strong>3. 첨부파일</strong>
            </div>
            <div class="lst_file" v-if="progrsSttus!='SVWT' && progrsSttus != 'SVRV'">
                <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                <ul>
                    <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                        <a href="javascript:void(0); " v-on:click="orgFileDown('file',index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                    </li>
                </ul>
            </div>
            <div v-if="progrsSttus == 'SVWT' || progrsSttus=='SVRV'">
                <!-- <div class="line_box check_area">
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="inptChkYn">
                        <span class="label_text">검측체크리스트</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="drwYn">
                        <span class="label_text">도면 및 상세도</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="csrtUserYn">
                        <span class="label_text">공사참여자(기능공포함)</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="photoYn">
                        <span class="label_text">사진대지</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="etcYn">
                        <span class="label_text">기타</span>
                    </label>
                </div> -->
                <LstFile    
                    v-bind:lst-file-rst="lstFileRst"
                    v-bind:files="files"
                    v-bind:second-remove-file-id="secondRemoveFileId"
                    v-on:file-changed="fileChanged"
                    v-on:file-removed="fileRemoved"
                    :downloadable="checkUser(userId,'down')"
                />
                <!-- <LstFile    
                    v-bind:lst-file-rst="lstFileRst"
                    v-bind:files="files"
                    v-bind:second-remove-file-id="secondRemoveFileId"
                    v-on:file-changed="fileChanged"
                    v-on:file-removed="fileRemoved"
                    v-if="progrsSttus == 'SVWT' || progrsSttus=='SVRV'"
                    :acceptExtn="videoFileTypes"
                    :limitFileSize="videoFileSize"
                    :limitFileSizeStr="videoFileSizeStr"
                    downloadable
                /> -->
            </div>

            <div class="button_box">
                <strong>4. 검측결과 통보</strong>
            </div>
            <div class="table_normal_list table_write">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="10%">
                        <col width="*">
                    </colgroup>
                    <tbody v-if="progrsSttus == 'SVWT' || progrsSttus=='SVRV'">
                        <tr>
                            <th>검측결과</th>
                            <td><input type="text" class="form_control" v-model="inptResult" maxlength="100"></td>
                        </tr>
                        <tr>
                            <th>지시사항</th>
                            <td><input type="text" class="form_control" v-model="drctMatter" maxlength="100"></td>
                        </tr>
                        <tr>
                            <th>특이사항</th>
                            <td><input type="text" class="form_control" v-model="spct" maxlength="500"></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <th>검측결과</th>
                            <td>{{inptResult}}</td>
                        </tr>
                        <tr>
                            <th>지시사항</th>
                            <td>{{drctMatter}}</td>
                        </tr>
                        <tr>
                            <th>특이사항</th>
                            <td>{{spct}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
    </div>
</template>

<script>
   import LstFile from '@/pages/common/popup/LstFile.vue'
   import LstImg from '@/pages/common/popup/LstImg.vue'
   import Datepicker from '@component/common/DatePicker.vue'
   import loader from '@ibsheet/loader'
   import { InspectionRequestWrite, InspectionVideo } from '@/pages/common/data/InptOptnList'
   import API from '@/apis/'
   import { sendPostApi, requestOptions } from '@/apis/common'
   import { sendFileApi, requestFileOptions } from '../../../apis/common';
   import PopAlert from '@/pages/common/popup/PopAlert.vue'
   import axios from 'axios'
   import authCheckMixns from '@plugin/mixin/AuthCheck.js'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import commonUtilMixins from '@plugin/mixin/CommonUtil.js'

   let SHEET_ID = '';

   export default {
        name: 'InspectMngtNoticeWrite',
        components: {
            Datepicker,
            LstFile,
            LstImg,
            PopAlert,
        },
        mixins: [MsgBoxMixins,authCheckMixns, commonUtilMixins],
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['1차 검측', '2차 검측'], // tab name

                mounted: false,
                popMsg:'',
                confirmUse: false,                             // 알림창 버튼개수
                popId:'noticeWriteAlert',                     // 알림창 Id
                noticeWriteSheet:null,

                saveYn:false,                               //저장여부
                saveChkYn: false,
                signYn:false,
                // listYn: false,                              //목록버튼 여부

                subTitle:'검측 통보서 작성',
                mainCodeId:'',                                              // 공종 Id
                midCodeId:'',                                               // 세부공종 Id
                subCodeId:'',
                mainName:'',
                midName:'',
                subName:'',
                inptLc: '',                                                 // 검측부위
                drw:'',                                                     // 도면
                inptCn:'',                                                  // 검측내용
                ccpyId:'',                                                  // 협력업체 Id
                ccpyName:'',                                                // 협력업체명
                siteInptChkId:'',                                           // 검측점검표
                tradeType:'',
                chkTitle:'',
                siteInptChkTitle:'',
                aprvOptnType:'',
                inptRegistDate01:'',
                inptRegistDate02:'',
                inptDemandDate01:'',
                inptDemandDate02:'',
                inptDate01:'',
                inptDate02:'',
                inptDspthDate01:'',
                inptDspthDate02:'',
                inptDoc:'',
                progrsSttus:'',
                inptOrder:'',
                msrs:'',
                inptRequstDocFileId:'',
                inptResult:'',
                drctMatter:'',
                spct:'',
                requstSaveYn:'',
                dspthSaveYn:'',
                hasUnPass:false,
                detailObj:[],

                //파일 리스트및 삭제
                lstFileRst : [],
                lstImgRst : [],
                files : [],
                img : [],
                copiedFileIds : [],
                resetCopyYn:false,
                secondRemoveImgId:[],                       //이미지용 삭제 Id
                totalCnt:0,
                totalSize:0,
                bytes:"KB",

                //파일 추가
                fileConnectId: 0,

                tempFileLst : [],                           //등록된 파일 데이터
                secondRemoveFileId:[],                      //등록된 파일 데이터 아이디
                tempFiles : [],                             //등록되지않은 파일 임시데이터
                videoFileTypes :['avi','mp4','wbm','webm'], //동영상 확장자
                videoFileSize : 3221225472,                 // 3GB
                videoFileSizeStr : '3GB',
                userId:'',

                inptChkYn:true,
                drwYn:true,
                csrtUserYn:true,
                photoYn:true,
                etcYn:true,
            }
        },
        props:{
            siteMstrId:{
                type: String,
                default: '',
            },
            siteInptDetailId:{
                type: String,
                default: '',
            },
            copyInptSeq:{
                type: Number,
                default: 0,
            },
            allSiteYn:{
                type:Boolean,
                default:false,
            }
        },
        async mounted() {
            this.mounted = true;
            this.userId = this.$store.getters['auth/getUserId'];
            await this.loadView();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {
            loadView: async function(){
                if(this.siteInptDetailId == ''|| this.siteInptDetailId == null){
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name:'InspectMngtListSheet'});
                    return;
                }
                // var itemArr = ['INRG','INVL','SDVL','SVWT','SVVL','APVL','APRV'];
                // var itemArr = ['검측 등록', '시공사 검측중', '통보서 발송중', '감리단 검측대기', '감리단 검측중', '결재중', '완료'];
                this.hasUnPass = false;
                this.copiedFileIds = [];
                this.resetCopyYn = true;
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'siteInptDetailId':this.siteInptDetailId,
                    'copyInptSeq':this.copyInptSeq,
                };
                let rst = await API.inspect.inptSttusResultNtcdocList(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log(rst);
                if(rst.data.rCode =='0000'){
                    let dtl = rst.data.datas.dmDetail;
                    let chkList = rst.data.datas.dlChk;
                    let data = chkList;
                    // let options = InspectionRequestWrite.options;
                    let options  = {
                        Cfg:{
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'SEQ', Header: [{ Value: 'NO', RowSpan: 3 }], RelWidth: 3,CanEdit:0, },
                            { Name: 'chkIem', Header: [{ Value: '검사항목', RowSpan: 3 }], RelWidth: 20,CanEdit:0, Type: "Lines",AcceptEnters: 3, Align: 'Left', },
                            { Name: 'stndrd', Header: [{ Value: '규격 및 기준', RowSpan: 3 }], RelWidth: 33,CanEdit:0, Type: "Lines",AcceptEnters: 3, Align: 'Left', },
                            { Name: 'cnst1JdgmntResult', Header: [{ Value: '검사결과', Span: 4 }, { Value: '1차', Span: 2 }, { Value: ' 시공사' }], Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE", RelWidth: 15,CanEdit:0 },
                            { Name: 'srvn1JdgmntResult', Header: [{}, {}, { Value: ' 건설사업관리단' }], RelWidth: 15, Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE" },
                            { Name: 'cnst2JdgmntResult', Header: [{}, { Value: '2차', Span: 2 }, { Value: ' 시공사' }], RelWidth: 15, Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE",CanEdit:0 },
                            { Name: 'srvn2JdgmntResult', Header: [{}, {}, { Value: ' 건설사업관리단' }], RelWidth: 15, Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE" },
                            { Name: 'msrs', Header: [{ Value: '조치사항', RowSpan: 3 }],Size : 100, RelWidth: 15 },
                        ]
                    }

                    this.mainCodeId=dtl.mainCodeId;
                    this.midCodeId=dtl.midCodeId;
                    this.subCodeId = dtl.subCodeId;
                    this.mainName=dtl.mainName;
                    this.midName=dtl.midName;
                    this.subName = dtl.subName;
                    this.inptLc= dtl.inptLc;
                    this.drw=dtl.drw;
                    this.inptCn=dtl.inptCn;
                    this.ccpyId=dtl.ccpyId;
                    this.ccpyName=dtl.ccpyName;
                    this.siteInptChkId=dtl.siteInptChkId;
                    this.tradeType=dtl.tradeType;
                    this.siteInptChkTitle=dtl.siteInptChkTitle;
                    this.inptRegistDate01=dtl.inptRegistDate01;
                    this.inptRegistDate02=dtl.inptRegistDate02;
                    this.inptDemandDate01=dtl.inptDemandDate01;
                    this.inptDemandDate02=dtl.inptDemandDate02;
                    this.inptDate01=dtl.inptDate01;
                    this.inptDate02=dtl.inptDate02;
                    this.inptDspthDate01=dtl.inptDspthDate01;
                    this.inptDspthDate02=dtl.inptDspthDate02;
                    this.inptDoc=dtl.inptDoc;
                    this.progrsSttus = dtl.progrsSttus;
                    this.inptOrder = dtl.inptOrder;
                    this.aprvOptnType = dtl.aprvOptnType;
                    this.inptRequstDocFileId = dtl.inptRequstDocFileId;
                    this.inptResult=dtl.inptResult;
                    this.drctMatter=dtl.drctMatter;
                    this.spct=dtl.spct;
                    this.requstSaveYn = dtl.requstSaveYn;
                    this.dspthSaveYn = dtl.dspthSaveYn;
                    // console.log(this.dspthSaveYn,this.requstSaveYn);
                    if(this.inptOrder.toString() == '1'){
                        options.Cols[5]['Type']="Text";
                        options.Cols[6]['Type']="Text";
                        if(this.inptDate01 == null|| this.inptDate01 == ''){
                            this.inptDate01 = this.$moment(this.$moment(this.inptRegistDate01,'YYYY-MM-DD').toDate(), 'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
                            this.inptDspthDate01 = this.$moment(this.$moment(this.inptDate01,'YYYY-MM-DD').toDate(), 'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
                        }
                    }else{
                        options.Cols[5]['Type']="Radio";
                        options.Cols[6]['Type']="Radio";
                        if(this.inptDate02 == null|| this.inptDate02 == ''){
                            this.inptDate02 = this.inptDate01;
                            this.inptDspthDate02 = this.inptDspthDate01;
                            // console.log();
                        }
                    }
                    // console.log(this.progrsSttus);
                    if(this.progrsSttus =='SVWT' || this.progrsSttus == 'SVRV'){
                        this.subTitle = '검측 통보서 작성';
                        options.Cols[4]['CanEdit']=(this.inptOrder.toString() == '1'?1:0);
                        options.Cols[5]['CanEdit']=0;
                        options.Cols[6]['CanEdit']=(this.inptOrder.toString() == '1'?0:1);
                        options.Cols[7]['CanEdit']=1;
                        options.Cfg['CanEdit'] = 1;
                    }else{
                        this.subTitle = '검측 통보서 상세';
                        options.Cfg['CanEdit'] = 0;
                    }

                    for(let i = 0; i<chkList.length; i++){
                        if(this.inptOrder.toString() == '2'){
                            // chkList[i].cnst1JdgmntResult = (chkList[i].cnst1JdgmntResult==null||chkList[i].cnst1JdgmntResult=='')?'PASS':chkList[i].cnst1JdgmntResult;
                            // chkList[i].srvn1JdgmntResult = (chkList[i].srvn1JdgmntResult==null||chkList[i].srvn1JdgmntResult=='')?'PASS':chkList[i].srvn1JdgmntResult;
                            chkList[i].srvn2JdgmntResult = (chkList[i].srvn2JdgmntResult==null||chkList[i].srvn2JdgmntResult=='')?'PASS':chkList[i].srvn2JdgmntResult;
                            if(chkList[i].srvn2JdgmntResult == 'UNPASS'){
                                this.hasUnPass = true;
                            }
                        }else{
                            chkList[i].cnst1JdgmntResult = (chkList[i].cnst1JdgmntResult==null||chkList[i].cnst1JdgmntResult=='')?'PASS':chkList[i].cnst1JdgmntResult;
                            chkList[i].srvn1JdgmntResult = (chkList[i].srvn1JdgmntResult==null||chkList[i].srvn1JdgmntResult=='')?'PASS':chkList[i].srvn1JdgmntResult;
                            chkList[i].cnst2JdgmntResult = '';
                            chkList[i].srvn2JdgmntResult = '';
                            if(chkList[i].srvn1JdgmntResult == 'UNPASS'){
                                this.hasUnPass = true;
                            }
                        }
                    }

                    loader.createSheet({
                        el: 'noticeSheetTable',
                        data: data,
                        options: options,
                    }).then((sheet) => {
                        // console.log(options);
                        this.noticeWriteSheet = sheet;
                    });

                    //첨부파일 가져오기
                    let url = '/sendApi/api/file/upFileList';
                    let param = {
                        fileType : "InspectMngtSRVN",
                        fileConnectId : this.inptRequstDocFileId,
                    };
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let fileBringRst = await sendPostApi(url, param).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });
                    this.lstFileRst = fileBringRst.data;

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
                        fileType : "InspectMngtImgSRVN",
                        fileConnectId : this.inptRequstDocFileId,
                    };
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let imgBringRst = await sendPostApi(url, param).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });
                    // console.log(imgBringRst);
                    this.lstImgRst = imgBringRst.data;
                }
                this.mounted = true;
            },
            fnSaveChk:function(){
                this.popMsg = '';
                this.saveYn = false;
                this.saveChkYn = false;
                this.detailObj = [];
                if(this.progrsSttus != 'SVWT' && this.progrsSttus != 'SVRV'){
                    return;
                }
                if(this.inptOrder.toString() == '1' &&(this.inptDate01 == ''|| this.inptDate01 == null)){
                    this.alert('검측일을 입력해주세요.');
                    return;
                }
                if(this.inptOrder.toString() == '1' &&(this.inptDspthDate01 == ''|| this.inptDspthDate01 == null)){
                    this.alert('검측 통보일을 입력해주세요.');
                    return;
                }
                if(this.inptOrder.toString() == '2' &&(this.inptDate02 == ''|| this.inptDate02 == null)){
                    this.alert('검측일을 입력해주세요.');
                    return;
                }
                if(this.inptOrder.toString() == '2' &&(this.inptDspthDate02 == ''|| this.inptDspthDate02 == null)){
                    this.alert('검측 통보일을 입력해주세요.');
                    return;
                }
                // if((this.inptOrder.toString()== '1' &&this.$moment(this.inptDemandDate01,'YYYY-MM-DD').toDate()<=this.$moment(this.inptRegistDate01,'YYYY-MM-DD').toDate())
                //   || (this.inptOrder.toString()== '2' &&this.$moment(this.inptDemandDate02,'YYYY-MM-DD').toDate()<=this.$moment(this.inptRegistDate02,'YYYY-MM-DD').toDate())){
                //     this.popMsg = '검측 요구일은 검측 등록일보다 작거나 같을 수 없습니다.';
                //     this.confirmUse = false;
                //     this.saveYn = false;
                //     this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                //     return;
                // }
                let rows = this.noticeWriteSheet.getDataRows();
                for(let i = 0; i< rows.length; i++){
                    if(this.inptOrder.toString() == '1'&&(rows[i].srvn1JdgmntResult == ''||rows[i].srvn1JdgmntResult == null)){
                        this.alert('검사 결과를 입력해주세요.');
                        return;
                    }
                    if(this.inptOrder.toString() == '2'&&(rows[i].srvn2JdgmntResult == ''||rows[i].srvn2JdgmntResult == null)){
                        this.alert('검사 결과를 입력해주세요.');
                        return;
                    }
                    let temp = {
                        'siteInptChkId':rows[i].siteInptChkId,
                        'siteInptDetailId':rows[i].siteInptDetailId,
                        'siteDetailIemSeq':rows[i].siteDetailIemSeq,
                        'msrs':rows[i].msrs,
                    };

                    temp['srvn1JdgmntResult'] = this.inptOrder.toString() == '1'?rows[i].srvn1JdgmntResult:'';
                    temp['srvn2JdgmntResult'] = this.inptOrder.toString() == '2'?rows[i].srvn2JdgmntResult:'';
                    temp['insttType'] = 'SRVN';
                    this.detailObj.push(temp);
                }
                if(this.popMsg == ''){
                    this.confirm('저장하시겠습니까?',this.fnSave);
                }
            },
            fnSave: async function(){
                this.saveYn = false;
                let yn = true;
                let param = {
                    'param':{
                        'siteMstrId':this.siteMstrId,
                        'inptOrder':this.inptOrder,
                        'inptDate':this.inptOrder.toString() == '1'?this.inptDate01:this.inptDate02,
                        'inptDspthDate':this.inptOrder.toString() == '1'?this.inptDspthDate01:this.inptDspthDate02,
                        'siteInptDetailId':this.siteInptDetailId,
                        'siteInptChkTitle':this.siteInptChkTitle,
                        'copyInptSeq':this.copyInptSeq,
                        'progrsSttus':'SVRV',
                        'inptResult':this.inptResult,
                        'drctMatter':this.drctMatter,
                        'spct':this.spct,
                    },
                    'listData':this.detailObj,
                };
                // console.log(param);
                let rst = await API.inspect.inptSttusResultNtcdocWrite(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log(rst);
                // if(rst.statusText == 'OK'){
                if(rst.status == 200){
                    //파일 삭제
                    if(this.secondRemoveFileId.length >0){
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        let url = '/sendApi/api/file/fileUnUse';
                        let param = {
                            fileType : "InspectMngtSRVN",
                            fileQltArcvIds : this.secondRemoveFileId
                        };
                        try{
                            let fileDelRst = await sendPostApi(url, param).then((result) => {
                                this.lstFileRst = [];
                                return result.data;
                            }).catch((e) => {
                                // console.log(e);
                                return e.response.data;
                            });
                            // console.log(fileDelRst);
                        }catch(error){
                            yn = false;
                            this.saveYn = false;
                            this.detailObj = [];
                            // this.popMsg = '저장에 실패했습니다.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                            this.alert('저장에 실패했습니다.');
                            return;
                        }
                    }
                    //이미지 삭제
                    if(this.secondRemoveImgId.length >0){
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        let url = '/sendApi/api/file/fileUnUse';
                        let param = {
                            fileType : "InspectMngtImgSRVN",
                            fileQltArcvIds : this.secondRemoveImgId
                        };
                        try{
                            let imgDelRst = await sendPostApi(url, param).then((result) => {
                                this.lstFileRst = [];
                                return result.data;
                            }).catch((e) => {
                                // console.log(e);
                                return e.response.data;
                            });
                            // console.log(imgDelRst);
                        }catch(error){
                            yn = false;
                            this.saveYn = false;
                            this.detailObj = [];
                            // this.popMsg = '저장에 실패했습니다.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                            this.alert('저장에 실패했습니다.');
                            return;
                        }
                    }
                    //파일 저장
                    if(this.files != '' && typeof(this.files) != 'undefined'){
                        requestFileOptions.headers['Accept-Language'] = "ko";
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        this.fileConnectId = this.inptRequstDocFileId;
                        try{
                            let fileSaveRst = await sendFileApi(this.fileConnectId, "InspectMngtSRVN", this.files).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                console.log(e.response.data);
                                return e.response.data;
                            });
                            let fileRst = fileSaveRst.data; //저장된 데이터개수 받아오기
                            if(fileRst == ''){
                                yn = false;
                                this.saveYn = false;
                                this.detailObj = [];
                                // this.popMsg = '저장에 실패했습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }catch(error){
                            yn = false;
                            this.saveYn = false;
                            this.detailObj = [];
                            // this.popMsg = '저장에 실패했습니다.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                            this.alert('저장에 실패했습니다.');
                            return;
                        }
                    }
                    //이미지 저장
                    if((this.img != '' && typeof(this.img) != 'undefined') ||(this.copiedFileIds && this.copiedFileIds.length>0)){
                        requestFileOptions.headers['Accept-Language'] = "ko";
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        this.fileConnectId = this.inptRequstDocFileId;
                        try{
                            let imgSaveRst = await sendFileApi(this.fileConnectId, "InspectMngtImgSRVN", this.img, null, this.copiedFileIds).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                console.log(e.response.data);
                                return e.response.data;
                            });
                            // console.log(imgSaveRst);
                            let fileRst2 = imgSaveRst.data; //저장된 데이터개수 받아오기
                            if(fileRst2 == ''){
                                yn = false;
                                this.saveYn = false;
                                this.detailObj = [];
                                // this.popMsg = '저장에 실패했습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }catch(error){
                            yn = false;
                            this.saveYn = false;
                            this.detailObj = [];
                            // this.popMsg = '저장에 실패했습니다.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                            this.alert('저장에 실패했습니다.');
                            return;
                        }
                    }
                    if(yn){
                        // this.saveYn = true;
                        this.detailObj = [];
                        this.files = [];
                        this.img = [];
                        this.secondRemoveFileId = [];
                        this.secondRemoveImgId = [];
                        // this.popMsg = '저장되었습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                        this.alert('저장되었습니다.',this.loadView);
                        return;
                    }
                }else{
                    yn = false;
                    this.saveYn = false;
                    this.detailObj = [];
                    // this.popMsg = '저장에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                    this.alert('저장에 실패했습니다.');
                    return;
                }
            },
            finalSaveChk: function(){
                this.signYn = false;
                if(this.dspthSaveYn != 'Y'){
                    this.alert("검측 통보서 저장이 되지 않았습니다. \n통보서 저장 후 작성완료가 가능합니다.");
                    return;
                }
                //요청서가 작성되었는지 확인필요
                // this.popMsg = '작성완료하시겠습니까?';
                // this.confirmUse = true;
                // this.signYn = true;
                // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                this.confirm('작성완료하시겠습니까?', this.fnFinalSave);
            },
            fnFinalSave : async function(){
                this.signYn = false;
                this.saveYn = false;
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'inptOrder':this.inptOrder,
                    'siteInptDetailId':this.siteInptDetailId,
                    'copyInptSeq':this.copyInptSeq,
                    // 'progrsSttus':'APVL',
                    // 'progrsSttus':'APWT',
                };
                // console.log(param);
                let rst = await API.inspect.ntcdocCompt(param, {
                                headers:{
                                    'Authorization': this.$cookies.get("Authorization")
                                }
                });

                // console.log(rst);
                // if(rst.statusText == 'OK'){
                if(rst.status == 200){
                    // this.saveYn = true;
                    this.detailObj = [];
                    this.files = [];
                    this.img = [];
                    this.secondRemoveFileId = [];
                    this.secondRemoveImgId = [];
                    // this.popMsg = '작성완료되었습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                    this.alert('작성완료되었습니다.',this.loadView);
                    return;
                }else{
                    this.saveYn = false;
                    this.detailObj = [];
                    // this.popMsg = '작성완료에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                    this.alert('작성완료에 실패했습니다.');
                    return;
                }

            },
            fnBack: function(){
                // this.$router.go(-1);
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name:'InspectMngtListSheet'});
            },
            alertConfirmFn:function(){
                if(this.saveChkYn){
                    this.saveChkYn = false;
                    this.fnSave();
                }
                if(this.saveYn){
                    this.saveYn = false;
                    this.loadView();
                }
                if(this.signYn){
                    this.signYn = false;
                    this.fnFinalSave();
                }
                this.$root.$emit('bv::hide::modal', 'noticeWriteAlert');
            },
            closePop:function(){
                this.saveYn = false;
                this.saveChkYn = false;
                this.signYn = false;
                this.$root.$emit('bv::hide::modal', 'noticeWriteAlert');
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
                
                // console.log(fileCode);
                
                let element = document.createElement('a');
                element.setAttribute('href','/sendApi/api/fileCall/getMtMngtImgFile/'+fileCode);
                element.setAttribute('download',fileName);
                element.click();
                element.remove();
            },
            fileChanged(payload) {
                this.files = payload
                // console.log("this.files");
                // console.log(this.files);
            },
            fileRemoved(id) {
                this.secondRemoveFileId = id
                // console.log("fileRemoved"+this.secondRemoveFileId);
            },
            imageChanged(payload){
                this.img = payload.file;
                this.copiedFileIds = payload.copyIds;
                // this.img = payload
            },
            imageRemoved(id) {
                this.secondRemoveImgId = id
                // console.log("fileRemoved"+this.secondRemoveImgId);
            },
            formatBytes(bytes, decimals = 0) {//바이트 계산
                if (bytes === 0) return '0 MB';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
        }
   }
</script>