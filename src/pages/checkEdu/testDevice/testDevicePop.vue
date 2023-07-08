<template>
    <!-- 시험/검사장비 교정 현황 상세/수정 팝업 -->
    <b-modal :id="refId" static v-bind:title="title" 
        hide-backdrop size="lg" @shown="loadReset"
        :footer-bg-variant="footerBg" no-close-on-backdrop>
        <template #default>
            <div class="pop_container">
                <!-- <button type="button" class="btn btn_sm btnZ_excel">Report</button> -->
                <button v-if="!changeYn" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="print">출력</button>
                <button v-if="!changeYn" type="button" class="btn btn_sm btn_darkgray" @click="ozDown">Report</button>
                <!-- <div class="button_box">
                    <div class="fr" v-if="!changeYn">
                    </div>
                </div> -->
                <div id="device_area" class="a4">
                    <button v-if="!changeYn" type="button" id="printBtn" style="display: flex;visibility: hidden;height: 0px;padding: 0;border: none;" v-print="'#device_area'">출력</button>
                    <div class="table_normal_list">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="130">
                                <col width="*">
                                <col width="110">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>현장명</th>
                                    <td colspan="3">{{siteNm}}</td>
                                </tr>
                                <tr>
                                    <th>프로젝트명</th>
                                    <td colspan="3">{{projNm}}</td>
                                </tr>
                                <tr>
                                    <th>본부</th>
                                    <td>{{baseType}}</td>
                                    <th>공사유형</th>
                                    <td>{{csrtType}}</td>
                                </tr>
                                <tr>
                                    <th>계측기 관리번호</th>
                                    <!-- <td colspan="3">{{testDeviceInfoId}}</td> -->
                                    <td colspan="3">{{deviceId}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>기본정보</strong>
                    </div>
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="130">
                                <col width="*">
                                <col width="110">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr v-if="changeYn">
                                    <th><span class="emp_red">계측기명</span></th>
                                    <td><input type="text" class="form_control" v-model="deviceNm" :maxlength="100"></td>
                                    <th>제작사</th>
                                    <td><input type="text" class="form_control" v-model="productCompany" :maxlength="30"></td>
                                    <!-- <th>계측기 관리번호</th>
                                    <td><input type="text" class="form_control"></td> -->
                                </tr>
                                <tr v-else>
                                    <th><span class="emp_red">계측기명</span></th>
                                    <td>{{deviceNm}}</td>
                                    <th>제작사</th>
                                    <td>{{productCompany}}</td>
                                    <!-- <th>계측기 관리번호</th>
                                    <td><input type="text" class="form_control"></td> -->
                                </tr>
                                <tr v-if="changeYn">
                                    <th><span class="emp_red">교정대상 여부</span></th>
                                    <td>
                                        <select name="" id="" class="form_control medium" v-model="correctYn">
                                            <option value="">선택</option>
                                            <option value="Y">대상</option>
                                            <option value="N">대상아님</option>
                                        </select>
                                    </td>
                                    <th><span class="emp_red">보유업체</span></th>
                                    <td>
                                        <label for="radio1" class="input_radio">
                                            <input id= "radio1" type="radio" v-model="holdingCompany" value="HEC">
                                            <span class="label_text">HEC</span>
                                        </label>
                                        <label for="radio2" class="input_radio">
                                            <input id= "radio2" type="radio" v-model="holdingCompany" value="PTNR">
                                            <span class="label_text">협력업체</span>
                                        </label>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <th><span class="emp_red">교정대상 여부</span></th>
                                    <td>
                                        {{correctYn=='Y'?'대상':'대상아님'}}
                                    </td>
                                    <th><span class="emp_red">보유업체</span></th>
                                    <td>{{holdingCompany == 'HEC'?'HEC':'협력업체'}}</td>
                                </tr>
                                <tr v-if="changeYn">
                                    <th><span class="emp_red">기기번호</span></th>
                                    <td><input type="text" class="form_control" v-model="deviceNum" :maxlength="30"></td>
                                    <th><span class="emp_red">협력업체명</span></th>
                                    <td>
                                        <div class="form_input">
                                            <div>
                                                <input type="text" id="text1" class="form_control" readonly v-model="tradeNm" v-bind:disabled="holdingCompany=='HEC'">
                                                <input type="text" id="text2" class="form_control" readonly v-model="ptnrNm" v-bind:disabled="holdingCompany=='HEC'">
                                            </div>
                                            <button type="button" class="btn btn_sm btn_darkblue btn_radius" v-bind:disabled="holdingCompany=='HEC'" v-b-modal.TestDevicePop_CooperationSearch>검색</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <th><span class="emp_red">기기번호</span></th>
                                    <td>{{deviceNum}}</td>
                                    <th><span class="emp_red">협력업체명</span></th>
                                    <td>
                                        <div class="form_input">
                                            <div>
                                                <span>{{holdingCompany == 'HEC'?'없음':tradeNm}}</span>
                                                <br/>
                                                <span>{{ptnrNm}}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="changeYn">
                                    <th><span class="emp_red">공종</span></th>
                                    <td>
                                        <select name="" id="" class="form_control medium" v-model="confinal">
                                            <option value="">선택</option>
                                            <option v-for="(item, idx) in mainCodeList" :key="idx" :value="item.mainCodeId">{{ item.mainName }}</option>
                                        </select>
                                    </td>  
                                    <th><span class="emp_red">허용오차</span></th>
                                    <td><input type="text" class="form_control" v-model="allowance" :maxlength="25"></td>
                                </tr>
                                <tr v-else>
                                    <th><span class="emp_red">공종</span></th>
                                    <td>
                                        {{confinalNm}}
                                    </td>  
                                    <th><span class="emp_red">허용오차</span></th>
                                    <td>{{allowance}}</td>
                                </tr>
                                <tr v-if="changeYn">    
                                    <th>보유장소</th>
                                    <td><input type="text" class="form_control" v-model="holdingPlace" :maxlength="30"></td>
                                    <th><span class="emp_red">교정주기</span></th>
                                    <td>
                                        <select name="" id="" class="form_control medium" v-model="correctTerm" @change="changeTerm" :disabled="status == 'N' && useYn == 'N'">
                                            <option value="">선택</option>
                                            <option value="MONTH">매월</option>
                                            <option value="QUARTER">분기</option>
                                            <option value="HALF_YEAR">반기</option>
                                            <!-- <option value="6_MONTH">반년</option> -->
                                            <option value="1_YEAR">1년</option>
                                            <option value="2_YEAR">2년</option>
                                            <option value="3_YEAR">3년</option>
                                            <option value="4_YEAR">4년</option>
                                            <option value="5_YEAR">5년</option>
                                            <option value="NONE">N/A</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr v-else>    
                                    <th>보유장소</th>
                                    <td>{{holdingPlace}}</td>
                                    <th><span class="emp_red">교정주기</span></th>
                                    <td>
                                        {{correctTermNm}}
                                    </td>
                                </tr>
                                <tr v-if="changeYn">
                                    <th><span class="emp_red">상태</span></th>
                                    <td>
                                        <select name="" id="" class="form_control medium" v-model="status">
                                            <option value="Y">보유</option>
                                            <option value="N">반출</option>
                                        </select>
                                    </td>
                                    <th><span class="emp_red">사용여부</span></th>
                                    <td>
                                        <select name="" id="" class="form_control medium" v-model="useYn" :disabled="status == 'N' && useYn == 'N'">
                                            <option value="Y">사용</option>
                                            <option value="N">미사용</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <th><span class="emp_red">상태</span></th>
                                    <td>
                                        {{status == 'Y'?'보유':'반출'}}
                                    </td>
                                    <th><span class="emp_red">사용여부</span></th>
                                    <td>
                                        {{useYn == 'Y'?'사용':'미사용'}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>교정정보</strong>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" v-if="changeYn">
                        <div id="dtlPopTable" class="ibsheet_table"></div>
                    </div>

                    <div class="table_normal_list align_center" v-if="!changeYn">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="20%"> 
                                <col width="10%">
                                <col width="10%">
                                <col width="20%"> 
                                <col width="20%"> 
                                <col width="20%"> 
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowspan="2"><span class="emp_red">교정일자</span></th>
                                    <th colspan="2">교정결과</th>
                                    <th rowspan="2">차기 교정일자</th>
                                    <th rowspan="2"><span class="emp_red">교정자/대행기관</span></th>
                                    <th rowspan="2">담당자</th>
                                </tr>
                                <tr>
                                    <th>교정 전</th>
                                    <th>교정 후</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{correctDate}}</td>
                                    <td>{{bforRst == 'PASS'?'합격':(bforRst == 'UNPASS'?'불합격':'-')}}</td>
                                    <td>{{aftrRst == 'PASS'?'합격':(aftrRst == 'UNPASS'?'불합격':'-')}}</td>
                                    <td>{{nextDate}}</td>
                                    <td>{{correctCompany}}</td>
                                    <td>{{userNm}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="changeYn">
                    <LstFile v-bind:lst-file-rst="lstFileRst"
                        v-bind:files="files"
                        v-bind:second-remove-file-id="secondRemoveFileId"
                        v-on:file-changed="fileChanged"
                        v-on:file-removed="fileRemoved"
                    />
                </div>
                <div v-else>
                    <div class="lst_file">
                        <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                        <ul>
                            <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                                <a href="javascript:void(0); " v-on:click="download(mngrFileRst)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <CooperationSearch v-on:fn-partner-choice="partnerChoice" :site-mstr-id="siteMstrId" :ref-id="'TestDevicePop_CooperationSearch'" :pop-idx="'2'"/>
                <!-- <PartnerUserSearch
                    v-on:fn-partner-choice="partnerChoice" v-bind:member-id-list="[]"
                /> -->
                <PopAlert
                    v-bind:msg="popMsg" v-bind:pop-id="popId" v-bind:confirm-use="confirmUse"
                    v-on:first-btn-fn="confirmBtn" v-on:second-btn-fn="closePop"
                />
                <EmployeeSearch 
                    v-on:fn-employee-choice="employeeChoice"
                    :empl-pop-id="'TestDevicePop_EmployeeSearch'"
                    v-bind:insert-site-name="siteNm" 
                    v-bind:site-code="siteCd" 
                    :site-mstr-id="siteMstrId"
                    :pop-idx="'5'"/>
            </div>
        </template>
        <template #modal-footer="{ }">
            <b-button class="btn btn_md btn_outline btn_darkgray" v-if="!changeYn && (mySiteYn == 'Y')" @click="changePop">수정</b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" v-if="!changeYn" @click="sendClose">닫기</b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" v-if="changeYn" @click="saveChangeChk">저장</b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" v-if="changeYn" @click="cancelBtn">취소</b-button>
        </template>
    </b-modal>
</template>

<script>
import axios from 'axios'
import { CorrectionWrite } from '../../common/data/PopupList'
import { sendFileApi, requestFileOptions } from '../../../apis/common';
import { sendPostApi, requestOptions } from '../../../apis/common';
import API from '@/apis/'
import LstFile from '@/pages/common/popup/LstFile'
import PartnerUserSearch from '@/pages/common/popup/PartnerUserSearch.vue'
import loader from '@ibsheet/loader'
import CooperationSearch from '@/pages/checkEdu/testDevice/cooperationSearch.vue'
import PopAlert from '@/pages/common/popup/PopAlert.vue'
import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import commonUtilMixins from '@plugin/mixin/CommonUtil.js'

let dtlPopId = '';

export default {
    name: 'CorrectionPop',
    mixins: [MsgBoxMixins, commonUtilMixins],
    components: {
        LstFile,
        CooperationSearch,
        PopAlert,
        PartnerUserSearch,
        EmployeeSearch,
    },
    data() {
        return{
            footerBg: 'transparent',
            title:'시험/검사장비 교정 현황',
            popMsg: '',
            popId: 'changeAlert',
            confirmUse: false,
            dtlSheet:null,
            siteMstrId:'',
            siteNm: '',
            siteCd:'',
            projNm:'',
            baseType:'',
            csrtType:'',
            data:[],

            changeYn:false,//수정,상세 구분용
            changeFinishYn:false,
            checkYn:false,//필수요소검사 확인용

            testDeviceInfoId:'',                            // 아이디
            deviceNm:'',                                    // 계측기명
            deviceId:'',                                    // 계측기 관리번호
            productCompany:'',                              // 제작사
            correctYn:'',                                   // 교정대상여부
            deviceNum:'',                                   // 기기번호
            holdingCompany:'',                              // 보유업체
            confinal:'',                                    // 공종
            confinalNm:'',
            userId:'',                                      // 협력업체 직원Id
            userNm:'',
            tradeId:'',
            tradeNm:'',
            ptnrId:'',
            ptnrNm:'',
            allowance:'',                                   // 허용오차
            holdingPlace:'',                                // 보유장소
            correctTerm:'',                                 // 교정주기
            correctTermNm:'',
            status:'',                                      // 상태
            correctCompany:'',
            correctDate:'',
            nextDate:'',
            bforRst:'',
            aftrRst:'',
            useYn:'',

            lstFileRst : [],
            files : [],
            fileConnectId: 0,
            tempFileLst : [],                           //등록된 파일 데이터
            secondRemoveFileId:[],                      //등록된 파일 데이터 아이디
            tempFiles : [],                             //등록되지않은 파일 임시데이터

            totalCnt:0,
            totalSize:0,
            bytes:"KB",
        }
    },
    props:{
        id:{
            type:String,
            default:'',
        },
        siteId:{
            type:String,
            default:'',
        },
        mainCodeList:{
            type: Array,
            default: () => {
                return []
            }
        },
        refId:{
            type:String,
            default:'CorrectionPop',
        },
        mySiteYn:{
            type:String,
            default:'Y',
        }
    },
    watch:{
        holdingCompany: function(){
            //console.log('dd');
            if(this.changeYn && this.holdingCompany == 'HEC'){
                document.getElementById('text1').setAttribute('disabled','true');
                document.getElementById('text2').setAttribute('disabled','true');
                this.tradeId = '';
                this.tradeNm = '';
                this.ptnrId = '';
                this.ptnrNm = '';
            }else if(this.changeYn && this.holdingCompany == 'PTNR'){
                document.getElementById('text1').removeAttribute('disabled');
                document.getElementById('text2').removeAttribute('disabled');
            }
        },
        changeYn: function(){
            if(this.changeYn){
                this.title = '시험/검사장비 교정 현황 수정';
            }else{
                this.title = '시험/검사장비 교정 현황';
            }
        },
        status:function(){
            let row = this.dtlSheet.getRowByIndex(1);
            if(this.status == 'N'){
                this.useYn = 'N';
                this.correctTerm = 'NONE';
                this.nextDate = '';
                row.nextDate = '';
                row.nextDateCanEdit = 0;
                this.dtlSheet.refreshRow(row);
            }else{
                row.nextDateCanEdit = 1;
                this.dtlSheet.refreshRow(row);
            }
        }
    },
    mounted(){
        this.changeYn = false;
    },
    beforeDestroy(){
        // loader.removeSheet(dtlPopId)
    },
    methods:{
        sheetLoad: async function() {
            this.testDeviceInfoId = this.id;
            this.siteMstrId = this.siteId;
            if(this.siteMstrId == '' || this.siteMstrId == null){
                // //console.log(error);
                // this.popMsg = '오류로 인해 데이터가 조회되지 않았습니다.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'changeAlert');
                this.alert('조회에 실패했습니다.');
                return;
            }
            let param = {
                'testDeviceInfoId':this.id,
                'siteMstrId':this.siteMstrId,
            };

            let resData = null;
            try{
                resData =  await API.testDevice.getTestDeviceDtl(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(resData);
            }catch(error){
                //console.log(error);
            }

            let data = [];
            let options = CorrectionWrite.options;
            options.Events = {
                onAfterClick:this.fnClick,
            };

            if(typeof(resData)!='undefined'){
                this.siteMstrId = resData.data.siteMstrId;
                this.csrtType = parseInt(resData.data.baseType) == '1000'?'인프라':(parseInt(resData.data.csrtType) == 0?'공동주택':(parseInt(resData.data.csrtType) == 1?'일반건축':'공장'));
                this.baseType = parseInt(resData.data.baseType) == '4000'?'건축':'인프라';
                this.siteNm = resData.data.siteNm;
                this.siteCd = resData.data.siteCd;
                this.projNm = resData.data.projNm;
                this.deviceNm = resData.data.deviceNm;
                this.deviceId = resData.data.deviceId;
                this.productCompany = resData.data.productCompany;
                this.correctYn = resData.data.correctYn==null?'':resData.data.correctYn;
                this.deviceNum = resData.data.deviceNum;
                this.holdingCompany = resData.data.holdingCompany;
                this.confinal = resData.data.confinal;
                this.confinalNm = resData.data.confinalNm;
                this.allowance = resData.data.allowance;
                this.holdingPlace = resData.data.holdingPlace;
                this.correctTerm = resData.data.correctTerm;
                this.correctTermNm = resData.data.correctTermNm;
                this.correctDate= resData.data.correctDate;
                this.correctCompany= resData.data.correctCompany;
                this.nextDate= resData.data.nextDate;
                this.bforRst= resData.data.bforRst;
                this.aftrRst= resData.data.aftrRst;
                this.userId= resData.data.userId;
                this.userNm = resData.data.userNm;

                this.status = resData.data.status;
                this.useYn=resData.data.useYn;
                if(this.holdingCompany != 'HEC'){
                    this.tradeId=resData.data.tradeId;
                    this.tradeNm=resData.data.tradeNm;
                    this.ptnrId=resData.data.ptnrId;
                    this.ptnrNm=resData.data.ptnrNm;
                }else{
                    this.tradeId='';
                    this.tradeNm='';
                    this.ptnrId='';
                    this.ptnrNm='';
                }

                let row = {};
                if(this.changeYn){
                    row['correctDate'] = resData.data.correctDate;
                    row['correctCompany'] = resData.data.correctCompany;
                    row['nextDate'] = resData.data.nextDate;
                    row['bforRst'] = resData.data.bforRst;
                    row['aftrRst'] = resData.data.aftrRst;
                    row['userId']= resData.data.userId;

                    let today = new Date();
                    let year = today.getFullYear();
                    let month = today.getMonth() +1;
                    let date = today.getDate();
                    let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);

                    row['correctDate'] = resData.data.correctDate == null? dateFormat:(resData.data.correctDate == ''?dateFormat:resData.data.correctDate);
                    row['nextDate'] = resData.data.nextDate == null? dateFormat:(resData.data.nextDate == ''?dateFormat:resData.data.nextDate);
                    let user = resData.data.userNm == null?'':resData.data.userNm;
                    row['userEdit']='<div class="btn_wrap" style = "display: flex;justify-content: space-around;align-items: center;"> <span>'+user+'</span> <button type="button" class="btn btn_sm btn_darkblue btn_radius">검색</button> </div>';
                    options.Cfg['CanEdit'] = 1;
                }else{
                    row['userEdit']= resData.data.userNm;
                    options.Cfg['CanEdit'] = 0;
                }
                data.push(row);

                //첨부파일 가져오기
                //console.log('파일');
                let url = '/sendApi/api/file/upFileList';
                let param = {
                    fileType : "TestDevice",
                    fileConnectId : this.testDeviceInfoId,
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
            }
            if(this.changeYn){
                loader.createSheet({
                    el: 'dtlPopTable',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    dtlPopId = sheet.id
                    this.dtlSheet = sheet;
                    sheet.blur();
                });
            }
        },
        saveChangeChk:function(){
            this.checkYn = false;
            this.popMsg = '';
            this.confirmUse = false;

            if(this.deviceNm ==''||this.deviceNm ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '계측기명을 입력해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('계측기명을 입력해주세요.');
                return;
            }
            if(this.correctYn ==''||this.correctYn ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '교정대상여부를 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('교정대상여부를 선택해주세요.');
                return;
            }
            if(this.holdingCompany ==''||this.holdingCompany ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '보유업체를 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('보유업체를 선택해주세요.');
                return;
            }
            if(this.holdingCompany !='HEC' &&(this.ptnrId == null||this.ptnrId == '')){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '협력업체명을 입력해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('협력업체명을 입력해주세요.');
                return;
            }
            if(this.confinal ==''||this.confinal ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '공종을 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('공종을 선택해주세요.');
                return;
            }
            if(this.deviceNum ==''||this.deviceNum ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '기기번호를 입력해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('기기번호를 입력해주세요.');
                return;
            }
            if(this.allowance ==''||this.allowance ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '허용오차를 입력해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('허용오차를 입력해주세요.');
                return;
            }
            if(this.correctTerm ==''||this.correctTerm ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '교정주기를 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('교정주기를 선택해주세요.');
                return;
            }
            if(this.status ==''||this.status ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '상태를 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('상태를 선택해주세요.');
                return;
            }
            if(this.useYn ==''||this.useYn ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '사용여부를 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('사용여부를 선택해주세요.');
                return;
            }
            let row = this.dtlSheet.getFirstRow();
            //console.log(row);
            if(row.correctDate ==''||row.correctDate ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '교정일자를 입력해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');  
                this.alert('교정일자를 입력해주세요.');
                return;
            }
            if(row.correctCompany ==''||row.correctCompany ==null){
                // this.checkYn = false;
                // this.confirmUse = false;
                this.popMsg = '교정자/대행기관을 입력해주세요.';
                // this.$root.$emit('bv::show::modal', 'changeAlert');
                this.alert('교정자/대행기관을 입력해주세요.');  
                return;
            }

            if(this.popMsg == ''){
                this.popMsg = '';
                this.checkYn = true;
                this.confirm('저장하시겠습니까?',this.saveChange);
                // this.saveChange();
            }
        },
        saveChange: async function(){
            this.changeFinishYn = false;
            let docSeq = '/sendApi/api/docNum/selectDocNumSeq';
            let payload = {
                siteMstrId: this.siteMstrId,
                codeType: 'EQPM',
                codeDtlType: 'EQPM',
                gjmcd:  this.confinal,
                gjscd: '',
                aprvOptnType: '',
                docType: 'EQPM',
            };
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            let row = this.dtlSheet.getFirstRow();
            let param = {
                'siteMstrId':this.siteMstrId,
                'testDeviceInfoId':this.testDeviceInfoId,
                'deviceNm':this.deviceNm,
                'deviceNum':this.deviceNum,
                'holdingCompany':this.holdingCompany,
                'correctYn':this.correctYn,
                'confinal':this.confinal,
                'allowance':this.allowance,
                'correctTerm':this.correctTerm,
                'useYn':this.useYn,
                'status':this.status,
                'correctDate':IBSheet.dateToString(row.correctDate,"yyyy-MM-dd"),
                'correctCompany':row.correctCompany,
            };
            if(this.correctYn!='HEC'){
                param['ptnrId'] = this.ptnrId;
            }
            if(this.correctYn=='HEC'){
                param['ptnrId'] = '';
            }
            if(this.productCompany != ''){
                param['productCompany'] = this.productCompany;
            }
            if(this.holdingPlace != ''){
                param['holdingPlace'] = this.holdingPlace;
            }
            if(row.bforRst != ''){
                param['bforRst'] = row.bforRst;
            }
            if(row.aftrRst != ''){
                param['aftrRst'] = row.aftrRst;
            }
            if(this.userId != ''){
                param['userId'] = this.userId;
            }
            param['nextDate'] = IBSheet.dateToString(row.nextDate,"yyyy-MM-dd");
            // if(row.userId != ''){
            //     param['productCompany'] = row.userId;
            // }

            axios.post(docSeq, payload, options).then(docResponse => {
                //console.log(docResponse);
                param['deviceId'] = docResponse.data;
                axios.post('/sendApi/api/testDevice/testDeviceInfo/change', param, options)
                .then(async response => {
                    //console.log(response);
                    if(typeof(response)!='undefined' && response.data != 0){
                        //파일 삭제
                        if(this.secondRemoveFileId.length >0){
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            let url = '/sendApi/api/file/fileUnUse';
                            let param = {
                                fileType : "TestDevice",
                                fileChkEduArcvIds : this.secondRemoveFileId
                            };
                            try{
                                const resData3 = await sendPostApi(url, param).then((result) => {
                                this.lstFileRst = [];
                                return result.data;
                                }).catch((e) => {
                                    // //console.log(e);
                                    return e.response.data;
                                });
                                //console.log(resData3);
                            }catch(error){
                                // this.changeFinishYn = false;
                                // this.popMsg = '오류로 인해 수정이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'changeAlert');
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }
                        //파일 저장
                        //console.log('삭제완료');
                        if(this.files != '' && typeof(this.files) != 'undefined'){
                            //console.log(this.files);
                            requestFileOptions.headers['Accept-Language'] = "ko";
                            requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            this.fileConnectId = this.testDeviceInfoId;
                            try{
                                const resData4 = await sendFileApi(this.fileConnectId, "TestDevice", this.files).then((result) => {
                                return result.data;
                                }).catch((e) => {
                                    //console.log(e.response.data);
                                    return e.response.data;
                                });
                                let fileRst = resData4.data; //저장된 데이터개수 받아오기
                                if(fileRst == ''){
                                    // this.changeFinishYn = false;
                                    // this.popMsg = '오류로 인해 수정이 완료되지 않았습니다.';
                                    // this.confirmUse = false;
                                    // this.$root.$emit('bv::show::modal', 'changeAlert');
                                    this.alert('저장에 실패했습니다.');
                                    return;
                                }
                            }catch(error){
                                // this.changeFinishYn = false;
                                // this.popMsg = '오류로 인해 수정이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'changeAlert');
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }

                        // this.changeFinishYn = true;
                        // this.checkYn = false;
                        // this.popMsg = '수정이 완료되었습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'changeAlert');
                        this.alert('저장되었습니다.',this.loadReset);
                        return;
                    }else{
                        //console.log(error);
                        // this.changeFinishYn = false;
                        // this.checkYn = false;
                        // this.popMsg = '오류로 인해 수정이 완료되지않았습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'changeAlert');
                        this.alert('저장에 실패했습니다.');
                        return;
                    }
                }).catch(error => {
                    //console.error(error);

                    // this.changeFinishYn = false;
                    // this.checkYn = false;
                    // this.popMsg = '오류로 인해 수정이 완료되지않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'changeAlert');
                    this.alert('저장에 실패했습니다.');
                    return;
                })

            }).catch(error => {
                //console.error(error);

                // this.writeFinishYn = false;
                // this.checkYn = false;
                // this.popMsg = '오류로 인해 등록이 완료되지않았습니다.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'writeAlert');
                this.alert('저장에 실패했습니다.');
                return;
            })

            // let resData = null;
            
            // try{
            //     resData =  await API.testDevice.setTestDeviceChange(param,{
            //         headers:{
            //             'Authorization': this.$cookies.get("Authorization")
            //         }
            //     });
            //     //console.log(resData);
            // }catch(error){
            //     //console.log(error);
            //     this.changeFinishYn = false;
            //     this.checkYn = false;
            //     this.popMsg = '오류로 인해 수정이 완료되지않았습니다.';
            //     this.confirmUse = false;
            //     this.$root.$emit('bv::show::modal', 'changeAlert');   
            // }
            // if(typeof(resData)!='undefined' && resData.data != 0){
            //     //파일 삭제
            //     if(this.secondRemoveFileId.length >0){
            //         requestOptions.headers['Accept-Language'] = "ko";
            //         requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            //         let url = '/sendApi/api/file/fileUnUse';
            //         let param = {
            //             fileType : "TestDevice",
            //             fileChkEduArcvIds : this.secondRemoveFileId
            //         };
            //         try{
            //             const resData3 = await sendPostApi(url, param).then((result) => {
            //             this.lstFileRst = [];
            //             return result.data;
            //             }).catch((e) => {
            //                 // //console.log(e);
            //                 return e.response.data;
            //             });
            //             //console.log(resData3);
            //         }catch(error){
            //             this.changeFinishYn = false;
            //             this.popMsg = '오류로 인해 수정이 완료되지 않았습니다.';
            //             this.confirmUse = false;
            //             this.$root.$emit('bv::show::modal', 'changeAlert');
            //             return;
            //         }
            //     }
            //     //파일 저장
            //     //console.log('삭제완료');
            //     if(this.files != '' && typeof(this.files) != 'undefined'){
            //         //console.log(this.files);
            //         requestFileOptions.headers['Accept-Language'] = "ko";
            //         requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            //         this.fileConnectId = this.testDeviceInfoId;
            //         try{
            //             const resData4 = await sendFileApi(this.fileConnectId, "TestDevice", this.files).then((result) => {
            //             return result.data;
            //             }).catch((e) => {
            //                 //console.log(e.response.data);
            //                 return e.response.data;
            //             });
            //             let fileRst = resData4.data; //저장된 데이터개수 받아오기
            //             if(fileRst == ''){
            //                 this.changeFinishYn = false;
            //                 this.popMsg = '오류로 인해 수정이 완료되지 않았습니다.';
            //                 this.confirmUse = false;
            //                 this.$root.$emit('bv::show::modal', 'changeAlert');
            //                 return;
            //             }
            //         }catch(error){
            //             this.changeFinishYn = false;
            //             this.popMsg = '오류로 인해 수정이 완료되지 않았습니다.';
            //             this.confirmUse = false;
            //             this.$root.$emit('bv::show::modal', 'changeAlert');
            //             return;
            //         }
            //     }

            //     this.changeFinishYn = true;
            //     this.checkYn = false;
            //     this.popMsg = '수정이 완료되었습니다.';
            //     this.confirmUse = false;
            //     this.$root.$emit('bv::show::modal', 'changeAlert');  
            // }else{
            //     this.changeFinishYn = false;
            //     this.checkYn = false;
            //     this.popMsg = '오류로 인해 수정이 완료되지않았습니다.';
            //     this.confirmUse = false;
            //     this.$root.$emit('bv::show::modal', 'changeAlert');  
            // }
        },
        cancelBtn:function(){
            this.confirm(`수정중인 내용이 있습니다.\n 취소하시겠습니까?`,()=>{
                // this.dtlSheet.dispose();
                this.loadReset();
            });
        },
        loadReset: function(){
            this.changeYn = false;
            this.sheetLoad();
        },
        changePop:function(){
            this.changeYn = true;
            this.sheetLoad();
        },
        changeTerm: function(){
            let temp = new Date(this.dtlSheet.getFirstRow().correctDate);

            switch(this.correctTerm){
                case 'MONTH': 
                    temp.setMonth(temp.getMonth()+1);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case 'QUARTER':
                    temp.setMonth(temp.getMonth()+3);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case 'HALF_YEAR':                    
                    temp.setMonth(temp.getMonth()+6);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case '6_MONTH':
                    temp.setMonth(temp.getMonth()+6);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case '1_YEAR': 
                    temp.setFullYear(temp.getFullYear()+1);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case '2_YEAR':                     
                    temp.setFullYear(temp.getFullYear()+2);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case '3_YEAR':                     
                    temp.setFullYear(temp.getFullYear()+3);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case '4_YEAR':                    
                    temp.setFullYear(temp.getFullYear()+4);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case '5_YEAR':                     
                    temp.setFullYear(temp.getFullYear()+5);
                    this.dtlSheet.getFirstRow()['nextDate'] = temp;
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                case 'NONE': 
                    this.dtlSheet.getFirstRow()['nextDate'] = '';
                    this.dtlSheet.refreshRow(this.dtlSheet.getFirstRow());
                    break;
                default: 
                    break;
            }
        },
        fnClick:function(evt){
            //console.log(evt.row);
            if(evt.sheet.getFocusedCol() == 'userEdit' && this.changeYn && evt.row.Kind!='Header'){
                this.$root.$emit('bv::show::modal', 'TestDevicePop_EmployeeSearch');  
            }
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
        download: function(fileInfo) {

            const fileId = fileInfo.fileId
                || fileInfo.fileChkBsArcvId 
                || fileInfo.fileChkEduArcvId
                || fileInfo.fileComArcvId
                || fileInfo.fileQltArcvId
                || fileInfo.fileQltImgArcvId

            const url = '/sendApi/api/file/singleFileDownload'

            const payload = {
                fileId: fileId
            }

            axios.post(url, payload, {
                headers: {
                    'Accept-Language': 'ko',
                    'Authorization': this.$cookies.get("Authorization"),
                },
                responseType: 'blob'
            }).then(response => {
                const blob = new Blob([response.data])
                const fileName = fileInfo.orgFileName

                // Internet Explorer
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    window.navigator.msSaveOrOpenBlob(blob, fileName)
                // Other Browsers
                } else {
                    const objectUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a')

                    link.style.cssText = 'display:none'
                    link.href = objectUrl
                    link.setAttribute('download', fileName)

                    if (typeof link.download === 'undefined') {
                        link.setAttribute('target', '_blank')
                    }

                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                    window.URL.revokeObjectURL(objectUrl)

                }
            }).catch(error => {
                //console.error(error)
                throw new Error(error)
            })
        },
        formatBytes(bytes, decimals = 0) {//바이트 계산
            if (bytes === 0) return '0 MB';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        partnerChoice : function(infoPartner){ //협력사 사원검색 후 event
            this.ptnrNm = infoPartner.userNm;
            this.ptnrId = infoPartner.userId;
            this.tradeNm = infoPartner.tradeNm;
            this.tradeId = infoPartner.tradeId;
        },
        employeeChoice : function(infoEmployee){ //점검자 가져오기
            //console.log(this.ispt);
            this.userNm = infoEmployee.userNm;
            this.userId = infoEmployee.userId.toString();
            let row = this.dtlSheet.getFirstRow();
            row['userEdit']='<div class="btn_wrap" style = "display: flex;justify-content: space-around;align-items: center;"> <span>'+this.userNm+'</span> <button type="button" class="btn btn_sm btn_darkblue btn_radius">검색</button> </div>';
            this.dtlSheet.refreshRow(row);
        },
        sendClose:function(){
            this.$root.$emit('bv::hide::modal', this.refId);  
            this.$emit('close', true);
        },
        confirmBtn:function(){
            if(this.changeFinishYn){
                this.changeFinishYn = false;
                this.loadReset();
            }
            this.$root.$emit('bv::hide::modal', 'changeAlert');  
        },
        closePop:function(){
            this.$root.$emit('bv::hide::modal', 'changeAlert');  
        },
        print:function(){
            let btn = document.getElementById('printBtn');
            btn.click();
        },
        ozDown:function(){
            // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
            let oz = this.$store.getters['auth/getOzTypeList'][34].jspNm
            + '&testDeviceInfoId='+this.testDeviceInfoId
            + '&siteMstrId='+ this.siteMstrId
            + '&lang=' + 'ko';
            // + '&lang=' + this.$store.getters['auth/getLocale'];
            window.open(oz, '_blank')
        },
    }
}
</script>