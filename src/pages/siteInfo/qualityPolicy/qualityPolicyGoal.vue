<template>
    <div class="write_box">
        <div v-show="!editYn">
            <h3 style="width: 100%; line-height: 28px; margin-bottom: 20px; font-size: 20px; font-weight: 700; color: #333;">품질목표 {{goalIndex+1}}
                <!-- <div class="fr">
                    <button :class="{disabled: aprvId != '' && aprvId != null}" type="button" class="btn btn_sm btn_darkgray" @click="edit">수정</button>
                    <button :class="{disabled: aprvId != '' && aprvId != null}" type="button" class="btn btn_sm btn_gray" @click="deleteGoal">삭제</button>
                </div> -->
                <div class="fr">
                    <button v-if="checkUser(userId,'change')" type="button" class="btn btn_sm btn_darkgray" @click="edit">수정</button>
                    <button v-if="checkUser(userId,'unuse')" type="button" class="btn btn_sm btn_gray" @click="deleteGoal">삭제</button>
                </div>
            </h3>
            <div>
                <span class="data_tit" style="display:inline-block">목표</span>
                <span style="padding-left:25px;font-size:14px;">{{detail.goal}}</span>
            </div>
            <div class="table_normal_list align_center">
                <table>
                        <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="33%"> 
                        <col width="33%"> 
                        <col width="*"> 
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span class="emp_red">측정지표</span></th>
                            <td style="white-space:pre-line;word-break:break-all;text-align:left;" colspan="2" class="al">{{detail.metrics}}</td>
                        </tr>
                        <tr>
                            <th rowspan="2"><span class="emp_red">현재수준</span></th>
                            <th colspan="2"><span class="emp_red">목표수준</span></th>
                        </tr>
                        <tr>
                            <th>{{year}}</th>
                            <th>사업종료시</th>
                        </tr>
                        <tr>
                            <td style="white-space:pre-line;word-break:break-all;text-align:left;">{{detail.crntLevel}}</td>
                            <td style="white-space:pre-line;word-break:break-all;text-align:left;">{{detail.nextLevel}}</td>
                            <td style="white-space:pre-line;word-break:break-all;text-align:left;">{{detail.endLevel}}</td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">달성효과</span></th>
                            <td style="white-space:pre-line;word-break:break-all;text-align:left;" colspan="2">{{detail.achvImpt}}</td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">모니터링 주기/방법</span></th>
                            <td style="white-space:pre-line;word-break:break-all;text-align:left;" colspan="2">{{detail.mntrMethod}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data_tit">실행계획</div>
            <div class="table_normal_list align_center">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="6%"> 
                        <col width="*"> 
                        <col width="10%"> 
                        <col width="15%"> 
                        <col width="15%"> 
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>실행계획</th>
                            <th>추진기간</th>
                            <th>책임자(정)</th>
                            <th>책임자(부)</th>
                        </tr>
                    </thead>
                    <tbody v-if="detail.planList.length == 0">
                        <tr>
                            <td colspan="5" class="disabled">검색된 데이터가 없습니다.</td>
                        </tr>
                    </tbody>
                    <tbody v-if="detail.planList.length > 0">
                        <tr v-for="(plan,index) in detail.planList" :key="index">
                            <td>{{index+1}}</td>
                            <td style="white-space:pre-line;word-break:break-all;text-align:left;">{{plan.actnPlan}}</td>
                            <td style="white-space:pre-line;word-break:break-all;text-align:left;">{{plan.prmtTerm}}</td>
                            <td>{{plan.mainPrsnNm? plan.mainPrsnNm.toString():''}}</td>
                            <td>{{plan.midPrsnNm? plan.midPrsnNm.toString():''}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data_tit">추진결과</div>
            <div class="table_normal_list">
                <table>
                        <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="10%"> 
                        <col width="*"> 
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>1분기</th>
                            <td>{{detail.rst1}}</td>
                        </tr>
                        <tr>
                            <th>2분기</th>
                            <td>{{detail.rst2}}</td>
                        </tr>
                        <tr>
                            <th>3분기</th>
                            <td>{{detail.rst3}}</td>
                        </tr>
                        <tr>
                            <th>4분기</th>
                            <td>{{detail.rst4}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data_tit">실적자료</div>
            <div class="lst_file">
                <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                <ul>
                    <li v-for="(mngrFileRst, index) in detail.fileList" v-bind:key="index" class="old">
                        <a href="javascript:void(0); " v-on:click="orgFileDown(index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                    </li>
                </ul>
                <!-- <p class="disabled">첨부파일이 없습니다.</p> -->
            </div>
        </div>

        <div v-show="editYn">
            <h3 style="width: 100%; line-height: 28px; margin-bottom: 20px; font-size: 20px; font-weight: 700; color: #333;">품질목표 {{goalIndex+1}}
                <!-- <div class="fr">
                    <button :class="{disabled: aprvId != '' && aprvId != null}" type="button" class="btn btn_sm btn_darkgray" @click="saveChange">저장</button>
                    <button :class="{disabled: aprvId != '' && aprvId != null}" type="button" class="btn btn_sm btn_gray" @click="cancelEdit">취소</button>
                </div> -->
                <div class="fr">
                    <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" @click="saveChange">저장</button>
                    <button type="button" class="btn btn_sm btn_gray" @click="cancelEdit">취소</button>
                </div>
            </h3>
            
            <div class="table_normal_list table_write">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="33%"> 
                        <col width="33%"> 
                        <col width="*"> 
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>목표</th>
                            <td colspan="2"><input type="text" class="form_control" v-model="detail.goal" :maxlength="50"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="table_normal_list table_write align_center">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="33%"> 
                        <col width="33%"> 
                        <col width="*"> 
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span class="emp_red">측정지표</span></th>
                            <td colspan="2" class="al">
                                <textarea name="" id="" cols="30" rows="10" class="form_control" :value="detail.metrics" :maxlength="500" @keyup="fn_inputCheck"></textarea>
                                <p class="table_message ar mt0">{{ detail.metrics.length }} / {{ 500 }}</p>
                            </td>
                        </tr>
                        <tr>
                            <th rowspan="2"><span class="emp_red">현재수준</span></th>
                            <th colspan="2"><span class="emp_red">목표수준</span></th>
                        </tr>
                        <tr>
                            <th>{{year}}</th>
                            <th>사업종료시</th>
                        </tr>
                        <tr>
                            <td>
                                <textarea name="" id="" cols="30" rows="10" class="form_control" :value="detail.crntLevel" :maxlength="500" @keyup="fn_inputCheck2"></textarea>
                                <p class="table_message ar mt0">{{ detail.crntLevel.length }} / {{ 500 }}</p>
                            </td>
                            <td>
                                <textarea name="" id="" cols="30" rows="10" class="form_control" :value="detail.nextLevel" :maxlength="500" @keyup="fn_inputCheck3"></textarea>
                                <p class="table_message ar mt0">{{ detail.nextLevel.length }} / {{ 500 }}</p>
                            </td>
                            <td>
                                <textarea name="" id="" cols="30" rows="10" class="form_control" :value="detail.endLevel" :maxlength="500" @keyup="fn_inputCheck4"></textarea>
                                <p class="table_message ar mt0">{{ detail.endLevel.length }} / {{ 500 }}</p>
                            </td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">달성효과</span></th>
                            <td colspan="2">
                                <textarea name="" id="" cols="30" rows="10" class="form_control" :value="detail.achvImpt" :maxlength="500" @keyup="fn_inputCheck5"></textarea>
                                <p class="table_message ar mt0">{{ detail.achvImpt.length }} / {{ 500 }}</p>
                            </td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">모니터링 주기/방법</span></th>
                            <td colspan="2"><input type="text" class="form_control" v-model="detail.mntrMethod" :maxlength="150"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="data_tit">
                실행계획
                <!-- <div class="fr">
                    <button :class="{disabled: aprvId != '' && aprvId != null}" type="button" class="btn_add" @click="addRow">추가</button>
                    <button :class="{disabled: aprvId != '' && aprvId != null}" type="button" class="btn_del" @click="delRow">삭제</button>
                </div> -->
                <div class="fr">
                    <button v-if="checkUser(userId,'write')" type="button" class="btn_add" @click="addRow">추가</button>
                    <button v-if="checkUser(userId,'unuse')" type="button" class="btn_del" @click="delRow">삭제</button>
                </div>
            </div>

            <!-- ibsheet -->
            <div class="ib_wrap mt0">
                <div :id="`goalTable${this.goalIndex}`" class="ibsheet_table"></div>
            </div>

            <!-- <div class="table_normal_list align_center">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="5%"> 
                        <col width="*"> 
                        <col width="10%"> 
                        <col width="15%"> 
                        <col width="15%"> 
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>실행계획</th>
                            <th>추진기간</th>
                            <th>책임자(정)</th>
                            <th>책임자(부)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" class="disabled">검색된 데이터가 없습니다.</td>
                        </tr>
                    </tbody>
                </table>
            </div> -->

            <div class="data_tit">추진결과</div>
            <div class="table_normal_list table_write">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="10%"> 
                        <col width="*"> 
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>1분기</th>
                            <td><input type="text" class="form_control" v-model="detail.rst1" :maxlength="150"></td>
                        </tr>
                        <tr>
                            <th>2분기</th>
                            <td><input type="text" class="form_control" v-model="detail.rst2" :maxlength="150"></td>
                        </tr>
                        <tr>
                            <th>3분기</th>
                            <td><input type="text" class="form_control" v-model="detail.rst3" :maxlength="150"></td>
                        </tr>
                        <tr>
                            <th>4분기</th>
                            <td><input type="text" class="form_control" v-model="detail.rst4" :maxlength="150"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="data_tit">실적자료</div>
            <div class="lst_file w100">
                <!-- <h3>첨부파일 2개 (6.2MB)</h3> -->
                <!-- <LstFile v-bind:lst-file-rst="lstFileRst"
                    v-bind:files="files"
                    v-bind:second-remove-file-id="secondRemoveFileId"
                    v-on:file-changed="fileChanged"
                    v-on:file-removed="fileRemoved"
                /> -->
                <LstFile
                    v-bind:lst-file-rst="lstFileRst"
                    v-bind:files="files"
                    v-bind:second-remove-file-id="secondRemoveFileId"
                    v-on:file-changed="fileChanged"
                    v-on:file-removed="fileRemoved"
                    :downloadable="checkUser(userId,'down')"  
                />
            </div>
        </div>
    </div>
</template>
<script>
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import loader from '@ibsheet/loader'
    
    import DatepickerRange from '../../common/popup/DatepickerRange.vue'
    import API from '@/apis/'
    import { sendFileApi, requestFileOptions } from '../../../apis/common';
    import { sendPostApi, requestOptions } from '../../../apis/common';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { commonFn } from '@/script/commonFn.js';
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import commonUtilMixins from '@plugin/mixin/CommonUtil.js'


    let SHEET_ID = '';

    export default {
        name: 'qualityPolicyGoal',
        mixins: [MsgBoxMixins,authCheckMixns, commonUtilMixins],
        components: {
            LstFile,
            DatepickerRange,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My site', 'All sites', 'HEC'], // tab name
                editYn:false,
                yearList:[],
                searchValue:0,
                focusRow:0,
                focusPrsn:'',
                listId:[],
                listNm:[],
                // delSeq: [],

                //파일 리스트및 삭제
                lstFileRst : [],
                files : [],
                totalCnt:0,
                totalSize:0,
                bytes:"KB",
                secondRemoveFileId:[],                      //등록된 파일 데이터 아이디

                info:{
                    qltyPlcyInfoId:'',  
                    title:'',
                    year:0,
                    qltyPlcyFrntFileId:'',
                    siteId:'',
                    siteNm:'',
                },
                detail:{
                    qltyPlcyGoalSeq:'',
                    goal:'',
                    metrics:'',
                    crntLevel:'',
                    nextLevel:'',
                    endLevel:'',
                    achvImpt:'',
                    mntrMethod:'',
                    rst1:'',
                    rst2:'',
                    rst3:'',
                    rst4:'',
                    editYn: false, 
                    planList: [
                        {
                            qltyPlcyPlanSeq:'',
                            actnPlan:'',
                            prmtTerm:'',
                            mainPrsnId:'',
                            midPrsnId:'',
                            mainPrsnNm:'',
                            midPrsnNm:'',
                            rowOrder:0,
                        }
                    ],
                    fileList:[],
                },
                /* PQIList: SQ-STATS-PQI-W-001 3. 지적사항 조치  */
                planData : {
                    options: {
                        Cfg: {
                            // CanEdit: 0,
                            IgnoreFocused : 1,
                            NoDataMessage: 3,
                        },
                        Cols: [
                            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 4 },
                            { Name: 'actnPlan', Header: [{ Value: '실행계획' }],Align:'LEFT',Type: "Lines",AcceptEnters: 3, RelWidth: 25, Size:500, },
                            { Name: 'prmtTerm', Header: [{ Value: '추진기간' }],Align:'LEFT',Type: "Lines",AcceptEnters: 3, RelWidth: 10, Size: 100, },
                            { Name: 'showMainPrsnNm', Header: [{ Value: '책임자(정)' }], Type: 'Html', RelWidth: 8 },
                            { Name: 'showMidPrsnNm', Header: [{ Value: '책임자(부)' }], Type: 'Html', RelWidth: 8 },
                        ]
                    },
                    data: [
                        { case1: '현장 패트롤 강화에 이은 공사 품질향상', case2: '3개월 분기별 점검(년 4회)', case3: '1', case4: '1' },
                    ],
                },
            }
        },
        props:{
            goal:{
                type:Object,
                default: function () {
                    return {}
                },
            },
            goalIndex:{
                type:Number,
                default: 0,
            },
            qltyPlcyInfoId:{
                type:String,
                default:'',
            },
            siteMstrId:{
                type:String,
                default:'',
            },
            year:{},
            aprvId:{},
            userId:{
                type:String,
                default: '',
            }
        },
        mounted() {
            this.detail = this.goal;
            // this.createSheet();
            if(this.goal.writeYn){
                this.editYn = true;
                // console.log(this.editYn);
                // this.detail['editYn'] = true;
            }else{
                // if(this.detail.fileList && this.detail['fileList'].length>0){
                //     let inputFileSize = 0;
                //     for(let i = 0; i< this.detail['fileList'].length;i++){
                //         this.totalCnt++;
                //         inputFileSize += parseInt(this.detail['fileList'][i].fileSize); //총파일크기
                //         this.detail['fileList'][i].fileSize = this.formatBytes(parseInt(this.detail['fileList'][i].fileSize), 2); //각각의 파일크기
                //     }
                //     if(inputFileSize > 0){
                //         this.totalSize = this.formatBytes(inputFileSize,2);
                //     }
                // }
            }

            // console.log('mounted-goalIndex: %o', this.goalIndex)
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },
        watch:{
            editYn:function(){
                // console.log(this.editYn);
                if(this.editYn &&typeof(this.detail['sheet']) == 'undefined'){
                    this.createSheet();
                }
            },
            detail: function(){
                this.totalCnt = 0;
                this.totlaSize = 0;
                if(this.detail.fileList && this.detail['fileList'].length>0){
                    let inputFileSize = 0;
                    for(let i = 0; i< this.detail['fileList'].length;i++){
                        this.totalCnt++;
                        inputFileSize += parseInt(this.detail['fileList'][i].fileSize); //총파일크기
                        this.detail['fileList'][i].fileSize = this.formatBytes(parseInt(this.detail['fileList'][i].fileSize), 2); //각각의 파일크기
                    }
                    if(inputFileSize > 0){
                        this.totalSize = this.formatBytes(inputFileSize,2);
                    }
                }
            },
        }, 
        methods: {
            edit: async function(){
                // if(this.aprvId != '' &&this.aprvId != null){
                //     return;
                // }
                // let data = [];
                // let options = QualityState.options;

                this.detail = this.goal;
                this.lstFileRst = this.detail.fileList;

                //console.log('sheetCreate',this.goal);
                if(this.detail.planList.length >0){
                    let row = this.detail.planList;
                    for(let i = 0; i<row.length; i++){
                        //console.log(row[i].mainPrsnNm);
                        // row[i].mainPrsnNm = (row[i].mainPrsnNm == null||row[i].mainPrsnNm == '')? []:row[i].mainPrsnNm.split(',');
                        // row[i].mainPrsnId = (row[i].mainPrsnId == null||row[i].mainPrsnId == '')? []:row[i].mainPrsnId.split(',');
                        let main = [];
                        let mid = [];
                        if(typeof(row[i].mainPrsnNm) != 'undefined'&&row[i].mainPrsnNm != null&&row[i].mainPrsnNm != ''&&row[i].mainPrsnNm.length !=0){
                            main = row[i].mainPrsnNm.split(',');
                            row[i].mainPrsnNm = row[i].mainPrsnNm.split(',');
                            row[i].mainPrsnId = row[i].mainPrsnId.split(',');
                        }
                        if(typeof(row[i].midPrsnNm) != 'undefined'&&row[i].midPrsnNm != null&&row[i].midPrsnNm != ''&&row[i].midPrsnNm.length !=0){
                            mid = row[i].midPrsnNm.split(',');
                            row[i].midPrsnNm = row[i].midPrsnNm.split(',');
                            row[i].midPrsnId = row[i].midPrsnId.split(',');
                        }
                        // row[i].midPrsnNm = (row[i].midPrsnNm == null||row[i].midPrsnNm == '')? []:row[i].midPrsnNm.split(',');
                        // row[i].midPrsnId = (row[i].midPrsnId == null||row[i].midPrsnId == '')? []:row[i].midPrsnId.split(',');
                        row[i]['showMainPrsnNm'] = '<div class="srch_user"> <span>'+main+'</span> <button type="button" class="btn_search">검색</button> </div>';
                        row[i]['showMidPrsnNm'] = '<div class="srch_user"> <span>'+mid+'</span> <button type="button" class="btn_search">검색</button> </div>';
                    }
                    this.$forceUpdate();
                }
                this.detail['sheet'] = null;

                this.editYn = true;
                // console.log(this.editYn);
                this.createSheet();
                // let fileId = this.qltyPlcyInfoId+"_"+this.detail.qltyPlcyGoalSeq;

                // //첨부파일 가져오기
                // let url = '/sendApi/api/file/upFileList';
                // let param = {
                //     fileType : "QualityPolicyGoal",
                //     fileConnectId : fileId,
                // };
                // requestOptions.headers['Accept-Language'] = "ko";
                // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                // let fileBringRst = await sendPostApi(url, param).then((result) => {
                //     return result.data;
                // }).catch((e) => {
                //     // console.log(e);
                //     return e.response.data;
                // });
                // this.lstFileRst = fileBringRst.data;
                // //계산식
                // this.totalCnt = 0; //파일갯수
                // this.totalSize = '0 KB';

                // if(this.lstFileRst.length>0){
                //     let inputFileSize = 0;
                //     for(let i = 0; i< this.lstFileRst.length;i++){
                //         this.totalCnt++;
                //         inputFileSize += parseInt(this.lstFileRst[i].fileSize); //총파일크기
                //         this.lstFileRst[i].fileSize = this.formatBytes(parseInt(this.lstFileRst[i].fileSize), 2); //각각의 파일크기
                //     }
                //     if(inputFileSize > 0){
                //         this.totalSize = this.formatBytes(inputFileSize,2);
                //     }
                // }
                
                // this.delSeq = [];
                // this.createSheet();
                // this.detail['editYn'] = true;
            
                // if(this.detail.planList.length>0){
                //     data = this.detail.planList;
                //     options['Events'] = {
                //         'onAfterClick':this.fnClick,
                //     };
                // }

                // loader.createSheet({
                //     el: `qltyPolicyGoal${this.goalIndex}`,
                //     options: options,
                //     data: data,
                // }).then((sheet) => {
                //     SHEET_ID = sheet.id
                //     this.detail['sheet'] = sheet;
                // });
            },
            createSheet:function(){
                this.secondRemoveFileId = [];
                loader.createSheet({
                    el: `goalTable${this.goalIndex}`,
                    data: this.detail.planList,
                    options: {
                        Cfg: this.planData.options.Cfg,
                        Cols: this.planData.options.Cols,
                        Events: {
                            // onDataLoad: this.setSrch,
                            onAfterClick: this.popopenEvt
                        }
                    } 
                }).then((sheet) => {
                    SHEET_ID = sheet.id;
                    this.detail['sheet'] = sheet;
                });
            },
            cancelEdit: function(){
                // if(this.aprvId != '' &&this.aprvId != null){
                //     return;
                // }
                // this.detail['editYn'] = false;
                let cancelChkFalg = false;
                if(!commonFn.methods.isEmpty(this.detail.metrics)) {
                    cancelChkFalg = true;
                }
                if(!commonFn.methods.isEmpty(this.detail.crntLevel)) {
                    cancelChkFalg = true;
                }
                if(!commonFn.methods.isEmpty(this.detail.nextLevel)) {
                    cancelChkFalg = true;
                }
                if(!commonFn.methods.isEmpty(this.detail.endLevel)) {
                    cancelChkFalg = true;
                }
                if(!commonFn.methods.isEmpty(this.detail.achvImpt)) {
                    cancelChkFalg = true;
                }
                if(!commonFn.methods.isEmpty(this.detail.mntrMethod)) {
                    cancelChkFalg = true;
                }

                let rows = this.detail['sheet'].getDataRows();
                if(rows.length>0){
                    cancelChkFalg = true;
                }

                if(!commonFn.methods.isEmpty(this.detail.rst1)) {
                    cancelChkFalg = true;
                }
                if(!commonFn.methods.isEmpty(this.detail.rst2)) {
                    cancelChkFalg = true;
                }
                if(!commonFn.methods.isEmpty(this.detail.rst3)) {
                    cancelChkFalg = true;
                }
                if(!commonFn.methods.isEmpty(this.detail.rst4)) {
                    cancelChkFalg = true;
                }
                this.confirm('취소하시겠습니까?',this.cancel);
                // if(cancelChkFalg) {
                //     this.confirm('작성중인 내용이 있습니다. 취소하시겠습니까?',this.cancel);
                // } else {
                //     this.cancel();
                // }
            },
            cancel: async function () {
                this.files = [];
                this.secondRemoveFileId = [];
                this.lstFileRst = [];

                let obj = {
                    'seq':this.detail.qltyPlcyGoalSeq,
                    'idx':this.goalIndex,
                    'detail':{},
                };

                if(this.detail.qltyPlcyGoalSeq != '' && this.detail.qltyPlcyGoalSeq != null){
                    let param = {
                        'siteMstrId':this.siteMstrId,
                        'qltyPlcyInfoId':this.qltyPlcyInfoId,
                        'qltyPlcyGoalSeq':this.detail.qltyPlcyGoalSeq,
                    };
                    let goalRst = await API.crack.selectSingleGoalList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    if(goalRst.data.rCode == '0000'){
                        //console.log(goalRst.data.datas.goalList);
                        this.detail = goalRst.data.datas.goalList[0];
                        //console.log(this.detail,this.goal);
                        this.$forceUpdate();
                    }
                    obj['detail'] = this.detail;
                }
                this.$emit('cancel-edit',obj);
                this.editYn = false;
            },
            loadData: async function (seq) {
                // console.log('loadData');
                this.files = [];
                this.secondRemoveFileId = [];
                this.lstFileRst = [];
                // this.editYn = false;
                // console.log(this.editYn);
                let obj = {
                    // 'seq':this.detail.qltyPlcyGoalSeq,
                    'seq':seq,
                    'idx':this.goalIndex,
                    'detail':{},
                };

                if(seq != '' && seq != null){
                    let param = {
                        'siteMstrId':this.siteMstrId,
                        'qltyPlcyInfoId':this.qltyPlcyInfoId,
                        'qltyPlcyGoalSeq':seq,
                    };
                    let goalRst = await API.crack.selectSingleGoalList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    if(goalRst.data.rCode == '0000'){
                        //console.log(goalRst.data.datas.goalList);
                        this.detail = goalRst.data.datas.goalList[0];
                        //console.log(this.detail,this.goal);
                        this.$forceUpdate();
                    }
                    obj['detail'] = this.detail;
                }
                this.editYn = false;
                // console.log(this.editYn);
                this.detail.qltyPlcyGoalSeq = seq;
                this.$emit('cancel-edit',obj);
            },
            setSrch: function(evtParam) {
                var sheet = evtParam.sheet;
                var row = sheet.getFirstRow(); // 첫번째 row
                
                while (row != null) { // return row 반복
                    var srch =  '<div class="srch_user">' + 
                                '<ul>' + 
                                    '<li>홍길동1</li>' +
                                    '<li>홍길동2</li>' +
                                '</ul>' +
                                '<button type="button" class="btn_search">검색</button>'
                                '</div>';

                    var plan =  'SQMS 시스템 활용도 100점 달성' +
                                '<ul class="lst_help">' +
                                    '<li>현장 패트롤 강화에 이은 공사 품질향상</li>' +
                                    '<li>공사,품질 담당직원 최소 주1회이상 부적합관리 발행 실적 목표</li>' +
                                '</ul>';

                    row.case1 = plan;
                    row.case3 = srch;
                    row.case4 = srch;
            
                    row = sheet.getNextRow(row); // 다음행 return
                }
            },
            popopenEvt: function(evt) {
                //console.log(evt.row.showMainPrsnNm);
                if(!this.checkUser(this.userId,'write')){
                    return;
                }
                if(evt.event.target.tagName == "BUTTON"){
                    this.focusRow = evt.sheet.getRowIndex(evt.row)-1;
                    this.focusPrsn = evt.col;
                    //console.log(this.focusRow, this.focusPrsn);

                    if(evt.col == 'showMainPrsnNm'){
                        this.listId = evt.row.mainPrsnId==null?'':evt.row.mainPrsnId;
                        this.listNm = evt.row.mainPrsnNm;
                    }else if(evt.col == 'showMidPrsnNm'){
                        this.listId = evt.row.midPrsnId==null?'':evt.row.midPrsnId;
                        this.listNm = evt.row.midPrsnNm;
                    }
                    let prsn = {
                        'focusRow' : this.focusRow,
                        'focusPrsn': this.focusPrsn,
                        'listId' : this.listId,
                        'listNm' : this.listNm,
                        'goalIndex':this.goalIndex,
                    };
                    this.$emit('open-multi-pop',prsn);
                    // return this.$root.$emit('bv::show::modal', 'MultiEmployeeSearch')
                }
            },
            addRow: function(){
                // if(this.aprvId != '' && this.aprvId != null){
                //     return;
                // }
                let sheet = this.detail['sheet'];
                let row = sheet.getFocusedRow();
                if(typeof(row) == 'undefined'){
                    //console.log('undefined');
                    sheet.addRow({"focus":1});
                    this.detail.planList.push(
                        {
                            qltyPlcyPlanSeq:0,
                            actnPlan:'',
                            prmtTerm:'',
                            mainPrsnId:'',
                            midPrsnId:'',
                            mainPrsnNm:'',
                            midPrsnNm:'',
                            rowOrder:0,
                            showMainPrsnNm:'<div class="srch_user"> <span></span> <button type="button" class="btn_search">검색</button> </div>',
                            showMidPrsnNm:'<div class="srch_user"> <span></span> <button type="button" class="btn_search">검색</button> </div>',
                        }
                    );
                }else{
                    //console.log('true');
                    let idx = sheet.getRowIndex(row);
                    let newRow = sheet.getRowByIndex(idx+1);
                    sheet.addRow({"next":newRow,"focus":1,});
                    this.detail.planList.splice(idx-1,0,{
                        qltyPlcyPlanSeq:0,
                        actnPlan:'',
                        prmtTerm:'',
                        mainPrsnId:'',
                        midPrsnId:'',
                        mainPrsnNm:'',
                        midPrsnNm:'',
                        rowOrder:0,
                        showMainPrsnNm:'<div class="srch_user"> <span></span> <button type="button" class="btn_search">검색</button> </div>',
                        showMidPrsnNm:'<div class="srch_user"> <span></span> <button type="button" class="btn_search">검색</button> </div>',
                    });
                }
                row = sheet.getFocusedRow();
                row['showMainPrsnNm'] = '<div class="srch_user"> <span></span> <button type="button" class="btn_search">검색</button> </div>';
                row['showMidPrsnNm'] = '<div class="srch_user"> <span></span> <button type="button" class="btn_search">검색</button> </div>';
                sheet.refreshRow(row);
                this.$forceUpdate();
            },
            delRow: function(){
                // if(this.aprvId != '' &&this.aprvId != null){
                //     return;
                // }
                let sheet = this.detail['sheet'];
                let row = sheet.getFocusedRow();
                if(typeof(row) == 'undefined'){
                    this.alert('선택된 행이 없습니다.');
                    return;
                }else{
                    let idx = sheet.getRowIndex(row);
                    // if(row.qltyPlcyPlanSeq != '' && row.qltyPlcyPlanSeq != null){
                    //     this.delSeq.push(row.qltyPlcyPlanSeq);
                    // }
                    this.detail.planList.splice(idx-1,0);
                    sheet.removeRow(row);
                }
                this.$forceUpdate();
            },
            saveChange: async function(){
                // if(this.aprvId != '' &&this.aprvId != null){
                //     return;
                // }
                // this 저장
                // const ts = this

                if(this.detail.metrics == '' || this.detail.metrics == null){
                    this.alert('측정지표를 입력해주세요.');
                    return;
                }
                if(this.detail.crntLevel == '' || this.detail.crntLevel == null){
                    this.alert('현재수준을 입력해주세요.');
                    return;
                }
                if(this.detail.nextLevel == '' || this.detail.nextLevel == null){
                    this.alert('올해수준을 입력해주세요.');
                    return;
                }
                if(this.detail.endLevel == '' || this.detail.endLevel == null){
                    this.alert('사업종료시 수준을 입력해주세요.');
                    return;
                }
                if(this.detail.achvImpt == '' || this.detail.achvImpt == null){
                    this.alert('달성효과를 입력해주세요.');
                    return;
                }
                if(this.detail.mntrMethod == '' || this.detail.mntrMethod == null){
                    this.alert('모니터링 주기/방법을 입력해주세요.');
                    return;
                }
                this.confirm('저장하시겠습니까?',this.finalChange);
            },
            finalChange: async function(){
                let rows = this.detail['sheet'].getDataRows();
                let plan = [];
                if(rows.length>0){
                    for(let x= 1; x<=rows.length;x++){
                        let row = this.detail['sheet'].getRowByIndex(x);
                        //console.log(x+'###',row);
                        //console.log(row.mainPrsnId,row.midPrsnId);
                        //console.log(typeof(row.mainPrsnNm));
                        let mainId = '';
                        let midId = '';
                        if(row.mainPrsnId != ''&&row.mainPrsnId != null&&typeof(row.mainPrsnId) != 'undefined'&&row.mainPrsnId.length>0){
                            mainId = row.mainPrsnId.toString();
                        }else if(typeof(row.mainPrsnId) == "string"||typeof(row.mainPrsnId) == "number"){
                            mainId = row.mainPrsnId;
                        }

                        if(row.midPrsnId != ''&&row.midPrsnId != null&&typeof(row.midPrsnId) != 'undefined'&&row.midPrsnId.length>0){
                            midId = row.midPrsnId.toString();
                        }else if(typeof(row.midPrsnId) == "string"||typeof(row.midPrsnId) == "number"){
                            midId = row.midPrsnId;
                        }
                        //console.log(mainId,midId);
                        let temp = {
                            'qltyPlcyPlanSeq':'', 
                            'actnPlan':row.actnPlan,
                            'prmtTerm':row.prmtTerm,
                            //'mainPrsnId':mainId,
                            // 'mainPrsnId':row.mainPrsnId,
                            //'midPrsnId':midId,
                            // 'midPrsnId':row.midPrsnId,
                            'rowOrder':x,
                        };
                        if(mainId != null && mainId != ''){
                            temp['mainPrsnId'] = mainId;
                        }
                        if(midId != null && midId != ''){
                            temp['midPrsnId'] = midId;
                        }
                        //console.log(temp);
                        plan.push(temp);
                    }
                }

                //목표/계획 수정, 추가
                let param = {
                    'qltyPlcyInfoId':this.qltyPlcyInfoId,
                    'qltyPlcyGoalSeq':this.detail.qltyPlcyGoalSeq,
                    'goal':this.detail.goal,
                    'metrics':this.detail.metrics,
                    'crntLevel':this.detail.crntLevel,
                    'nextLevel':this.detail.nextLevel,
                    'endLevel':this.detail.endLevel,
                    'achvImpt':this.detail.achvImpt,
                    'mntrMethod':this.detail.mntrMethod,
                    'rst1':this.detail.rst1,
                    'rst2':this.detail.rst2,
                    'rst3':this.detail.rst3,
                    'rst4':this.detail.rst4,
                    'planList': plan,
                };
                // console.log(param);

                let goalRst = await API.crack.siteQltyPolicyGoalUpdate(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                this.goal.writeYn = false;
                if(goalRst.data.rCode == '0000' && (rows== null || rows.length == 0 || goalRst.data.datas.cnt == rows.length)){
                    let seq = goalRst.data.datas.seq;
                    let id = this.qltyPlcyInfoId+'_'+seq;
                    // this.detail.qltyPlcyGoalSeq = goalRst.data.datas.seq;
                    // let id = this.qltyPlcyInfoId+'_'+this.detail.qltyPlcyGoalSeq;

                    //파일 삭제
                    let url = '/sendApi/api/file/fileUnUse';
                    if(typeof(this.secondRemoveFileId) != 'undefined' && this.secondRemoveFileId != null && this.secondRemoveFileId.length>0){
                        let delParam = {
                            fileType : " ",//빈란으로 넣어서 이미지, 파일 둘다 삭제
                            fileComArcvIds : this.secondRemoveFileId,
                        };
                        const delFileData = await sendPostApi(url, delParam).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        // console.log(delFileData);
                    }
                    //파일 등록
                    // if(!commonFn.methods.isEmpty(this.files)){
                    if ( this.files && this.files.length > 0) {
                        requestFileOptions.headers['Accept-Language'] = "ko";
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        try{
                            let fileSaveRst = await sendFileApi(id, "QualityPolicyGoal", this.files).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                // console.log(e.response.data);
                                return e.response.data;
                            });
                            let fileRst = fileSaveRst.data; //저장된 데이터개수 받아오기
                            if(fileRst == ''){
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                            // console.log('here11111');
                        }catch(error){
                            // console.log(error);
                            this.alert('저장에 실패했습니다.');
                            return;
                        }
                    }
                    this.alert('저장되었습니다.',()=>{
                        this.loadData(seq);
                    });
                    // this.goal.writeYn = false;
                    // this.alert('저장이 완료되었습니다.', () => {
                    //     this.editYn = false;
                    //     console.log(this.editYn);
                    //     this.loadData()
                    // } );
                    // console.log('here333333')
                    // return;
                }else{
                    this.alert('저장에 실패했습니다.');
                    return;
                }
            },
            deleteGoal:function(){
                // if(this.aprvId != '' &&this.aprvId != null){
                //     return;
                // }
                // console.log(this.detail.qltyPlcyGoalSeq);
                this.confirm('삭제하시겠습니까?', async()=>{
                    let param = {
                        'qltyPlcyGoalSeq':this.detail.qltyPlcyGoalSeq,
                        'qltyPlcyInfoId':this.qltyPlcyInfoId,
                    };
                    let updateRst = await API.crack.siteQltyPolicyGoalUnuse(param);
                    //console.log(updateRst);
                    if(updateRst.status == 200 && updateRst.data.datas.cnt>0){
                        // console.log(this.goalIndex);
                        this.$emit('delete-goal',this.goalIndex);
                        return;
                    }else{
                        this.alert('저장에 실패했습니다.');
                        return;
                    }
                    
                });
            },
            orgFileDown: function(index){//데이터 등록된 파일
                // console.log(this.detail.fileList);
                // console.log(this.lstFileRst);
                if(!this.checkUser(this.userId,'down')){
                    return;
                }
                let fileName = this.detail.fileList[index].orgFileName;
                let fileCode = this.detail.fileList[index].fileComArcvId;
                    
                // console.log(fileCode);
                
                let element = document.createElement('a');
                element.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/'+fileCode);
                element.setAttribute('download',fileName);
                element.click();
                element.remove();
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
            formatBytes(bytes, decimals = 0) {//바이트 계산
                if (bytes === 0) return '0 MB';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
            fn_inputCheck(evt){
                if(100 >= evt.target.value.length){
                    this.detail.metrics = evt.target.value;
                }
            },
            fn_inputCheck2(evt){
                if(100 >= evt.target.value.length){
                    this.detail.crntLevel = evt.target.value;
                }
            },
            fn_inputCheck3(evt){
                if(100 >= evt.target.value.length){
                    this.detail.nextLevel = evt.target.value;
                }
            },
            fn_inputCheck4(evt){
                if(100 >= evt.target.value.length){
                    this.detail.endLevel = evt.target.value;
                }
            },
            fn_inputCheck5(evt){
                if(500 >= evt.target.value.length){
                    this.detail.achvImpt = evt.target.value;
                }
            },
        }
    }
</script>
<style>
    .allignRow{
        text-align:left;
    }
</style>