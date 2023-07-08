<template>
    <div class="tab_contents">
        <div class="inner pb0">
            <h2 class="sub_title">{{subTitle}}
                <div class="fr" v-if="!allSiteYn">
                    <template v-if="progrsSttus == 'INRG'">
                        <!-- <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fnTossChk" v-bind:class="{disabled:progrsSttus!='APRV'}">2차실시</button> -->
                        <button type="button" v-if="checkUser(userId,'write')" class="btn btn_md btn_outline btn_darkgray" @click="fnSaveChk" v-bind:class="{disabled:progrsSttus!='INRG' && progrsSttus!='INVL'}">저장</button>
                    </template>
                    <template v-else>
                        <button type="button" v-if="checkUser(userId,'write')" class="btn btn_md btn_outline btn_darkgray" @click="fnSaveChk" v-bind:class="{disabled:progrsSttus!='INRG' && progrsSttus!='INVL'}">저장</button>
                    </template>
                    <!-- <button type="button" v-if="checkUser(userId,'write')" class="btn btn_md btn_outline btn_darkgray" @click="fnSignChk" v-bind:class="{disabled:progrsSttus!='INVL' || hasUnPass}">결재상신</button> -->
                    <button type="button" v-if="checkUser(userId,'change') && (progrsSttus=='INRG' || progrsSttus=='INVL')" class="btn btn_md btn_outline btn_darkgray" @click="fnSignChk" v-bind:class="{disabled : progrsSttus!='INVL'}">결재상신</button>
                    <button type="button" v-if="progrsSttus!='INRG' && progrsSttus!='INVL'" class="btn btn_md btn_outline btn_darkgray" @click="viewAprv">결재보기</button>
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
                        <tr v-if="progrsSttus == 'INRG' || progrsSttus == 'INVL'">
                            <th><span class="emp_red">검측 등록일(실시일)</span></th>
                            <td v-if="inptOrder == 1|| inptOrder == '1'">
                                <Datepicker v-model="inptRegistDate01" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                            </td>
                            <td v-if="inptOrder != 1 && inptOrder != '1'">
                                <Datepicker v-model="inptRegistDate02" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                            </td>
                            <th><span class="emp_red">검측 요구일</span></th>
                            <td v-if="inptOrder == 1|| inptOrder == '1'">
                                <Datepicker v-model="inptDemandDate01" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                            </td>
                            <td v-if="inptOrder != 1 && inptOrder != '1'">
                                <Datepicker v-model="inptDemandDate02" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                            </td>
                        </tr>
                        <tr v-else>
                            <th><span class="emp_red">검측 등록일(실시일)</span></th>
                            <td>{{inptOrder == 1|| inptOrder == '1'?inptRegistDate01:inptRegistDate02}}</td>
                            <th><span class="emp_red">검측 요구일</span></th>
                            <td>{{inptOrder == 1|| inptOrder == '1'?inptDemandDate01:inptDemandDate02}}</td>
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
                <div id="reqstSheetTable" class="ibsheet_table"></div>
            </div>

            <div class="button_box">
                <strong>2. 사진 대지</strong>
            </div>
            <div class="lst_img" v-if="progrsSttus!='INRG' && progrsSttus != 'INVL'">
                <ul v-if="checkUser(userId,'down')">
                    <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex">
                        <div class="img_wrap" v-if="mngrImgRst.fileQltArcvId != null && mngrImgRst.fileQltArcvId != ''">
                            <p class="img_area"><img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrImgRst.fileQltArcvId"></p>
                        </div>
                        <a href="javascript:void(0);" v-on:click="orgFileDown('img',mIndex)">
                            <i class="ico_file" :class="fn_getFileIcons(mngrImgRst.orgFileName)">{{mngrImgRst.orgFileName}}</i>
                        </a>
                    </li>
                </ul>
                <ul v-else>
                    <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex">
                        <div class="img_wrap" v-if="mngrImgRst.fileQltArcvId != null && mngrImgRst.fileQltArcvId != ''">
                            <p class="img_area"><img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrImgRst.fileQltArcvId"></p>
                        </div>
                        <a href="javascript:void(0);">
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
                v-if="progrsSttus == 'INRG' || progrsSttus == 'INVL'"
                :downloadable="checkUser(userId,'down')"
                :file-type="'inspectReqstQltyPicturePop'"
                :copied-file-ids="copiedFileIds"
                :reset-copy-yn="resetCopyYn"
            />

            <div class="button_box">
                <strong>3. 첨부파일</strong>
            </div>
            <div class="lst_file" v-if="progrsSttus!='INRG' && progrsSttus != 'INVL'">
                <div class="line_box check_area" style="padding: 12px 16px; line-height: 16px; border: 1px solid #c8c8c8;">
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="inptChkYn" disabled>
                        <span class="label_text">검측체크리스트</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="drwYn" disabled>
                        <span class="label_text">도면 및 상세도</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="csrtUserYn" disabled>
                        <span class="label_text">공사참여자(기능공포함)</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="photoYn" disabled>
                        <span class="label_text">사진대지</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" id="" name="" checked="" v-model="etcYn" disabled>
                        <span class="label_text">기타</span>
                    </label>
                </div>
                <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                <ul v-if="checkUser(userId,'down')">
                    <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                        <a href="javascript:void(0); " v-on:click="orgFileDown('file',index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                    </li>
                </ul>
                <ul v-else>
                    <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                        <a href="javascript:void(0); " v-on:click="orgFileDown('file',index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                    </li>
                </ul>
            </div>
            <div v-if="progrsSttus == 'INRG' || progrsSttus == 'INVL'">
                <div class="line_box check_area" style="padding: 12px 16px; line-height: 16px; border: 1px solid #c8c8c8;">
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
                </div>
                <LstFile
                    v-bind:lst-file-rst="lstFileRst"
                    v-bind:files="files"
                    v-bind:second-remove-file-id="secondRemoveFileId"
                    v-on:file-changed="fileChanged"
                    v-on:file-removed="fileRemoved"
                    :downloadable="checkUser(userId,'down')"
                />
            </div>
            <!-- <LstFile
                v-bind:lst-file-rst="lstFileRst"
                v-bind:files="files"
                v-bind:second-remove-file-id="secondRemoveFileId"
                :acceptExtn="videoFileTypes"
                v-bind:file-type="type"
                v-on:file-changed="fileChanged"
                v-on:file-removed="fileRemoved"
                :limitFileSize="videoFileSize"
                :limitFileSizeStr="videoFileSizeStr"
                v-if="progrsSttus == 'INRG' || progrsSttus == 'INVL'"
                :downloadable="checkUser(userId,'down')"
            /> -->
        </div>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
        <approve
            ref-id="inptWriteApproveModal"
            doc-type="INPT"
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
            ref-id="InspectMngtReqstWrite_AprvView"
            :aprv-info-id="aprvInfoId"
        />
    </div>
</template>

<script>
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import LstImg from '@/pages/common/popup/LstImg.vue'
    import Datepicker from '@component/common/DatePicker.vue'
    import loader from '@ibsheet/loader'
    import { InspectionRequestWrite } from '@/pages/common/data/InptOptnList'
    import API from '@/apis/'
    import { sendPostApi, requestOptions } from '@/apis/common'
    import { sendFileApi, requestFileOptions } from '../../../apis/common';
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import axios from 'axios'
    import Approve from '@modal/approval/Approve.vue'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import commonUtilMixins from '@plugin/mixin/CommonUtil.js'
    import ApprovalView from '@modal/approval/ApprovalView.vue'

    let SHEET_ID = '';

    export default {
        name: 'InspectMngtReqstWrite',
        components: {
            Datepicker,
            LstFile,
            LstImg,
            PopAlert,
            Approve,
            ApprovalView,
        },
        mixins: [authCheckMixns,MsgBoxMixins, commonUtilMixins],
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['1차 검측', '2차 검측'], // tab name
                mounted: false,
                popMsg:'',
                confirmUse: false,                             // 알림창 버튼개수
                popId:'ReqstWriteAlert',                     // 알림창 Id
                reqstWriteSheet:null,

                saveYn:false,                               //저장여부
                saveChkYn: false,
                signYn:false,
                // listYn: false,                              //목록버튼 여부

                subTitle:'검측 요청서 작성',
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
                inptDoc:'',
                progrsSttus:'',
                inptOrder:'',
                msrs:'',
                inptRequstDocFileId:'',
                hasUnPass:false,
                requstSaveYn:'',
                dspthSaveYn:'',
                detailObj:[],
                aprvInfoId:'',

                //파일 리스트및 삭제
                lstFileRst : [],
                lstImgRst : [],
                files : [],
                img : [],
                copiedFileIds:[],
                resetCopyYn:false,
                secondRemoveImgId:[],                       //이미지용 삭제 Id
                totalCnt:0,
                totalSize:0,
                bytes:"KB",

                //파일 추가
                fileConnectId: 0,
                videoFileTypes:['avi','mp4','wbm','webm'],  //동영상 확장자
                videoFileSize : 3221225472,                 // 3GB
                videoFileSizeStr : '3GB',
                type:'InspectMngtCNST',

                tempFileLst : [],                           //등록된 파일 데이터
                secondRemoveFileId:[],                      //등록된 파일 데이터 아이디
                tempFiles : [],                             //등록되지않은 파일 임시데이터
                //
                approve: {
                    codeType: 'INPT',
                    codeDtlType: 'CREQ',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: '',
                },
                userId:'',

                inptChkYn:false,
                drwYn:false,
                csrtUserYn:false,
                photoYn:false,
                etcYn:false,
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
            // if(this.siteMstrId == this.$cookies.get('siteMstrId')){
            //     this.listYn = true;
            // }else{
            //     this.listYn = false;
            // }
            this.userId = this.$store.getters['auth/getUserId'];
            await this.loadView();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },
        watch:{
            // inptDemandDate01:function(){
            //     console.log('inptDemandDate01',this.$moment(this.inptDemandDate01,'YYYY-MM-DD').toDate()<=this.$moment(this.inptRegistDate01,'YYYY-MM-DD').toDate());
            //     if(this.mounted && this.inptOrder.toString()== '1' &&this.$moment(this.inptDemandDate01,'YYYY-MM-DD').toDate()<=this.$moment(this.inptRegistDate01,'YYYY-MM-DD').toDate()){
            //         this.inptDemandDate01 = '';
            //     }
            // },
        },
        methods: {
            loadView: async function(){
                if(this.siteInptDetailId == '' || this.siteInptDetailId == null){
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name:'InspectMngtListSheet'});
                    return;
                }
                this.approve.siteMstrId = this.siteMstrId;
                this.approve.requestId = this.siteInptDetailId;
                this.copiedFileIds = [];
                this.resetCopyYn=true;

                // var itemArr = ['INRG','INVL','SDVL','SVWT','SVVL','APVL','APRV'];
                // var itemArr = ['검측 등록', '시공사 검측중', '요청서 발송중', '감리단 검측대기', '감리단 검측중', '결재중', '완료'];
                this.hasUnPass = false;
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'siteInptDetailId':this.siteInptDetailId,
                    'copyInptSeq':this.copyInptSeq,
                };
                let rst = await API.inspect.inptSttusRequstDocList(param,{
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
                            { Name: 'chkIem', Header: [{ Value: '검사항목', RowSpan: 3 }], Align: 'left', RelWidth: 20, CanEdit:0 , Type: "Lines",AcceptEnters: 3,},
                            { Name: 'stndrd', Header: [{ Value: '규격 및 기준', RowSpan: 3 }], Align: 'Left', RelWidth: 33, CanEdit:0 , Type: "Lines",AcceptEnters: 3,},
                            { Name: 'cnst1JdgmntResult', Header: [{ Value: '검사결과', Span: 4 }, { Value: '1차', Span: 2 }, { Value: ' 시공사' }], Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE", RelWidth: 15 },
                            { Name: 'srvn1JdgmntResult', Header: [{}, {}, { Value: ' 건설사업관리단' }], RelWidth: 15, Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE" },
                            { Name: 'cnst2JdgmntResult', Header: [{}, { Value: '2차', Span: 2 }, { Value: ' 시공사' }], RelWidth: 15, Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE" },
                            { Name: 'srvn2JdgmntResult', Header: [{}, {}, { Value: ' 건설사업관리단' }], RelWidth: 15,CanEdit:0, Type: 'Text', CanEdit:0,},
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
                    this.inptDoc=dtl.inptDoc;
                    this.progrsSttus = dtl.progrsSttus;
                    this.inptOrder = dtl.inptOrder;
                    this.aprvOptnType = dtl.aprvOptnType;
                    this.inptRequstDocFileId = dtl.inptRequstDocFileId;
                    // console.log(this.inptRequstDocFileId);
                    this.aprvInfoId = dtl.dspthAprvInfoId == '' || dtl.dspthAprvInfoId == null? dtl.requstAprvInfoId:dtl.dspthAprvInfoId;
                    this.requstSaveYn = dtl.requstSaveYn;
                    this.dspthSaveYn = dtl.dspthSaveYn;
                    if(this.inptOrder.toString() == '1'){
                        options.Cols[4]['Type']="Text";
                        options.Cols[5]['Type']="Text";
                        if(this.inptRegistDate01 == null|| this.inptRegistDate01 == ''){
                            this.inptDemandDate01 =this.$moment(new Date(), 'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
                        }
                    } else {
                        options.Cols[4]['Type']="Radio";
                        options.Cols[5]['Type']="Radio";
                        if(this.inptRegistDate02 == null|| this.inptRegistDate02 == ''){
                            this.inptRegistDate02 = this.inptRegistDate01;
                            this.inptDemandDate02 = this.inptDemandDate01;
                            // this.inptDemandDate02 =this.$moment(new Date(), 'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
                        }
                    }
                    // console.log(this.progrsSttus);
                    if(this.progrsSttus =='INRG' || this.progrsSttus =='INVL'){
                        this.subTitle = '검측 요청서 작성';
                        options.Cols[3]['CanEdit']=(this.inptOrder.toString() == '1'?1:0);
                        options.Cols[4]['CanEdit']=0;
                        options.Cols[5]['CanEdit']=(this.inptOrder.toString() == '1'?0:1);
                        options.Cols[7]['CanEdit']=1;
                        options.Cfg['CanEdit'] = 1;
                    }else{
                        this.subTitle = '검측 요청서 상세';
                        options.Cfg['CanEdit'] = 0;
                    }
                    this.inptChkYn = dtl.inptChkYn == 'Y'? true:false;
                    this.drwYn = dtl.drwYn == 'Y'? true:false;
                    this.csrtUserYn = dtl.csrtUserYn == 'Y'? true:false;
                    this.photoYn = dtl.photoYn == 'Y'? true:false;
                    this.etcYn = dtl.etcYn == 'Y'? true:false;

                    for(let i = 0; i<chkList.length; i++){
                        if(this.inptOrder.toString() == '2'){
                            // chkList[i].cnst1JdgmntResult = (chkList[i].cnst1JdgmntResult==null||chkList[i].cnst1JdgmntResult=='')?'PASS':chkList[i].cnst1JdgmntResult;
                            // chkList[i].srvn1JdgmntResult = '';
                            chkList[i].cnst2JdgmntResult = (chkList[i].cnst2JdgmntResult==null||chkList[i].cnst2JdgmntResult=='')?'PASS':chkList[i].cnst2JdgmntResult;
                            if(chkList[i].cnst2JdgmntResult == 'UNPASS'){
                                this.hasUnPass = true;
                            }
                        } else {
                            chkList[i].cnst1JdgmntResult = (chkList[i].cnst1JdgmntResult==null||chkList[i].cnst1JdgmntResult=='')?'PASS':chkList[i].cnst1JdgmntResult;
                            chkList[i].srvn1JdgmntResult = '';
                            chkList[i].cnst2JdgmntResult = '';
                            if(chkList[i].cnst1JdgmntResult == 'UNPASS'){
                                this.hasUnPass = true;
                            }
                        }
                        chkList[i].srvn2JdgmntResult = '';
                    }

                    loader.createSheet({
                        el: 'reqstSheetTable',
                        data: data,
                        options: options,
                    }).then((sheet) => {
                        // console.log(options);
                        this.reqstWriteSheet = sheet;
                    });

                    //첨부파일 가져오기
                    let url = '/sendApi/api/file/upFileList';
                    let param = {
                        fileType : "InspectMngtCNST",
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
                        fileType : "InspectMngtImgCNST",
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
                if(this.progrsSttus != 'INRG' && this.progrsSttus != 'INVL'){
                    return;
                }
                if(this.inptOrder.toString() == '1' &&(this.inptRegistDate01 == ''|| this.inptRegistDate01 == null)){
                    // this.popMsg = '검측 등록일을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.saveYn = false;
                    // this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                    this.alert('검측 등록일을 입력해주세요.');
                    return;
                }
                if(this.inptOrder.toString() == '1' &&(this.inptDemandDate01 == ''|| this.inptDemandDate01 == null)){
                    // this.popMsg = '검측 요구일을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.saveYn = false;
                    // this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                    this.alert('검측 요구일을 입력해주세요.');
                    return;
                }
                if(this.inptOrder.toString() == '2' &&(this.inptRegistDate02 == ''|| this.inptRegistDate02 == null)){
                    // this.popMsg = '검측 등록일을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.saveYn = false;
                    // this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                    this.alert('검측 등록일을 입력해주세요.');
                    return;
                }
                if(this.inptOrder.toString() == '2' &&(this.inptDemandDate02 == ''|| this.inptDemandDate02 == null)){
                    // this.popMsg = '검측 요구일을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.saveYn = false;
                    // this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                    this.alert('검측 요구일을 입력해주세요.');
                    return;
                }
                // if((this.inptOrder.toString()== '1' &&this.$moment(this.inptDemandDate01,'YYYY-MM-DD').toDate()<=this.$moment(this.inptRegistDate01,'YYYY-MM-DD').toDate())
                //   || (this.inptOrder.toString()== '2' &&this.$moment(this.inptDemandDate02,'YYYY-MM-DD').toDate()<=this.$moment(this.inptRegistDate02,'YYYY-MM-DD').toDate())){
                //     this.popMsg = '검측 요구일은 검측 등록일보다 작거나 같을 수 없습니다.';
                //     this.confirmUse = false;
                //     this.saveYn = false;
                //     this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                //     return;
                // }
                let rows = this.reqstWriteSheet.getDataRows();
                for(let i = 0; i< rows.length; i++){
                    if(this.inptOrder.toString() == '1'&&(rows[i].cnst1JdgmntResult == ''||rows[i].cnst1JdgmntResult == null)){
                        // this.popMsg = '검사 결과를 입력해주세요.';
                        // this.confirmUse = false;
                        // this.saveYn = false;
                        // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                        this.alert('검사 결과를 입력해주세요.');
                        return;
                    }
                    if(this.inptOrder.toString() == '2'&&(rows[i].cnst2JdgmntResult == ''||rows[i].cnst2JdgmntResult == null)){
                        // this.popMsg = '검사 결과를 입력해주세요.';
                        // this.confirmUse = false;
                        // this.saveYn = false;
                        // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                        this.alert('검사 결과를 입력해주세요.');
                        return;
                    }
                    let temp = {
                        'siteInptChkId':rows[i].siteInptChkId,
                        'siteInptDetailId':rows[i].siteInptDetailId,
                        'siteDetailIemSeq':rows[i].siteDetailIemSeq,
                        'msrs':rows[i].msrs,
                    };

                    temp['cnst1JdgmntResult'] = this.inptOrder.toString() == '1'?rows[i].cnst1JdgmntResult:'';
                    temp['cnst2JdgmntResult'] = this.inptOrder.toString() == '2'?rows[i].cnst2JdgmntResult:'';
                    temp['insttType'] = 'CNST';
                    this.detailObj.push(temp);
                }
                if(this.popMsg == ''){
                    // this.saveChkYn = true;
                    // this.popMsg = '저장하시겠습니까?';
                    // this.confirmUse = true;
                    // this.$root.$emit('bv::show::modal', 'noticeWriteAlert');
                    this.confirm('저장하시겠습니까?',this.fnSave);
                    return;
                }
            },
            fnSave: async function(){
                this.saveYn = false;
                let yn = true;
                let param = {
                    'param':{
                        'siteMstrId':this.siteMstrId,
                        'inptOrder':this.inptOrder,
                        'inptRegistDate':this.inptOrder.toString() == '1'?this.inptRegistDate01:this.inptRegistDate02,
                        'inptDemandDate':this.inptOrder.toString() == '1'?this.inptDemandDate01:this.inptDemandDate02,
                        'siteInptDetailId':this.siteInptDetailId,
                        'siteInptChkTitle':this.siteInptChkTitle,
                        'copyInptSeq':this.copyInptSeq,
                        'progrsSttus':'INVL',
                        'inptChkYn':this.inptChkYn == true?'Y':'N',
                        'drwYn':this.drwYn == true?'Y':'N',
                        'csrtUserYn':this.csrtUserYn == true?'Y':'N',
                        'photoYn':this.photoYn == true?'Y':'N',
                        'etcYn':this.etcYn == true?'Y':'N',
                    },
                    'listData':this.detailObj,
                };
                // console.log(param);
                let rst = await API.inspect.inptSttusRequstDocWrite(param,{
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
                            fileType : "InspectMngtCNST",
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
                            fileType : "InspectMngtImgCNST",
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
                            let fileSaveRst = await sendFileApi(this.fileConnectId, "InspectMngtCNST", this.files).then((result) => {
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
                    // 이미지 저장
                    if((this.img != '' && typeof(this.img) != 'undefined') || (this.copiedFileIds && this.copiedFileIds.length>0)){
                        requestFileOptions.headers['Accept-Language'] = "ko";
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        this.fileConnectId = this.inptRequstDocFileId;
                        try{
                            let imgSaveRst = await sendFileApi(this.fileConnectId, "InspectMngtImgCNST", this.img, null, this.copiedFileIds).then((result) => {
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
            fnSignChk:function(){
                this.signYn = false;
                // if(this.progrsSttus != 'INVL' || this.hasUnPass){
                if(this.requstSaveYn != 'Y'){
                    this.alert("검측 요청서 저장되지 않았습니다.");
                    return;
                }
                this.approve.mainCodeId     = this.mainCodeId;
                this.approve.midCodeId      = this.midCodeId;
                this.approve.docSeq         = this.inptDoc;
                // this.approve.siteMstrId     = this.siteMstrId ? this.siteMstrId : null;

                // this.approve.requestId      = this.siteInptDetailId;
                this.approve.fileType       = 'InspectMngtCNST';
                this.approve.docName        = this.inptOrder.toString() == '1'?'1차 검측요청서':'2차 검측요청서';

                this.$bvModal.show('inptWriteApproveModal');
                // this.popMsg = '결재상신하시겠습니까?';
                // this.confirmUse = true;
                // this.signYn = true;
                // this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                // return;
            },
            fnSign: async function(){
                this.saveYn = false;
                let approveDoc= '/sendApi/api/approv/approvedDoc/write';
                let requstDocAprvRecomWrite = '/sendApi/api/inptMngt/inptSttus/requstDocAprvRecom/write';
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
                const payload = {
                    siteMstrId: this.siteMstrId,
                    codeType: 'INPT',
                    codeDtlType: 'CREQ',
                    gjmcd: this.mainCodeId,
                    gjscd: this.midCodeId,
                    aprvOptnType: this.aprvOptnType,
                    docType: '',
                }

                axios.post(
                    approveDoc, 
                    {
                        dmApprvDoc: {
                            ...payload,
                            docSeq: this.inptDoc,
                        },
                    }, 
                    options)
                    .then(aprvRes => {
                        // console.log(aprvRes)
                        axios.post(
                            requstDocAprvRecomWrite,
                            {
                                ...payload,
                                inptDoc: this.inptDoc,
                                ...aprvRes.data.datas.dmApprvDoc,
                                //
                                'siteMstrId':this.siteMstrId,
                                'copyInptSeq':this.copyInptSeq,
                                'siteInptDetailId':this.siteInptDetailId,
                                'requstAprvInfoId':aprvRes.data.datas.dmApprvDoc.aprvInfoId,
                            },
                            options                                    
                            )
                            .then(setCrackInfoRes => {
                                
                                // console.log(setCrackInfoRes)
                                
                                this.saveYn = true;
                                // this.detailObj = [];
                                this.popMsg = '결재상신 되었습니다.';
                                this.confirmUse = false;
                                this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                                return;
                            })
                            .catch(error => {
                                console.error(error)

                                this.saveYn = false;
                                // this.detailObj = [];
                                this.popMsg = '결재상신에 실패했습니다.';
                                this.confirmUse = false;
                                this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                                return;
                            })

                    })
                    .catch(error => {
                        // throw new Error(error)
                        console.error(error)

                        this.saveYn = false;
                        // this.detailObj = [];
                        this.popMsg = '결재상신에 실패했습니다.';
                        this.confirmUse = false;
                        this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                        return;
                    })

                // let rst = await API.inspect.requstDocAprvRecomWrite(param,{
                //     headers:{
                //         'Authorization': this.$cookies.get("Authorization")
                //     }
                // });
                // console.log(rst);
                // if(rst.data.count>0){
                //     this.saveYn = true;
                //     // this.detailObj = [];
                //     this.popMsg = '결재상신 되었습니다.';
                //     this.confirmUse = false;
                //     this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                //     return;
                // }else{
                //     this.saveYn = false;
                //     // this.detailObj = [];
                //     this.popMsg = '오류로 인해 결재상신이 완료되지 않았습니다.';
                //     this.confirmUse = false;
                //     this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                //     return;
                // }
            },
            fn_setSourceApproval: function (payload) {
                // console.log(payload)
                this.signYn =false;//초기화
                this.copyYn = false;

                const url = '/sendApi/api/inptMngt/inptSttus/requstDocAprvRecom/write';
                const _payload = {
                    ...payload,
                    inptDoc: this.inptDoc,
                    // ...payload.data.datas.dmApprvDoc,
                    'siteMstrId':this.siteMstrId,
                    'copyInptSeq':this.copyInptSeq,
                    'siteInptDetailId':this.siteInptDetailId,
                    'requstAprvInfoId':this.inptOrder.toString() == '1'?payload.aprvInfoId:'',
                    'dspthAprvInfoId':this.inptOrder.toString() == '1'?'':payload.aprvInfoId,
                    'sanctnMthd' : payload.aprvOptnType,
                    'progrsSttus':'',
                    // 'progrsSttus':'APVL',
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
                    // console.log(res)
                                        
                    this.saveYn = true;
                    // this.detailObj = [];
                    this.popMsg = '결재상신 되었습니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                    return;
                })
                .catch(error => {
                    console.error(error)
                    
                    this.saveYn = false;
                    // this.detailObj = [];
                    this.popMsg = '결재상신에 실패했습니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'ReqstWriteAlert');
                    return;
                })
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
                    this.fnSign();
                }
                this.$root.$emit('bv::hide::modal', 'ReqstWriteAlert');
            },
            closePop:function(){
                this.saveYn = false;
                this.saveChkYn = false;
                this.signYn = false;
                this.$root.$emit('bv::hide::modal', 'ReqstWriteAlert');
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
                // console.log("this.img");
                // console.log(this.img);
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
            viewAprv: function(){
                this.$root.$emit('bv::show::modal', 'InspectMngtReqstWrite_AprvView');
            }
        }
   }
</script>