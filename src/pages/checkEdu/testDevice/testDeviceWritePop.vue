<template>
    <!-- 시험/검사장비 교정 현황 등록 팝업 -->
    <b-modal :id="refId" title="시험/검사장비 교정 현황 등록" static
        hide-backdrop size="lg" @shown="resetForm"
        :footer-bg-variant="footerBg" no-close-on-backdrop>
        <template #default>
            <div class="pop_container">
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
                            <!-- <tr>
                                <th>계측기 관리번호</th>
                                <td colspan="3">{{deviceId}}</td>
                            </tr> -->
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
                            <tr>
                                <th><span class="emp_red">계측기명</span></th>
                                <td><input type="text" class="form_control" v-model="deviceNm" :maxlength="100"></td>
                                <th>제작사</th>
                                <td><input type="text" class="form_control" v-model="productCompany" :maxlength="30"></td>
                                <!-- <th>계측기 관리번호</th>
                                <td><input type="text" class="form_control"></td> -->
                            </tr>
                            <tr>
                                
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
                            <tr>
                                <th><span class="emp_red">기기번호</span></th>
                                <td><input type="text" class="form_control" v-model="deviceNum" :maxlength="30"></td>
                                <th><span class="emp_red">협력업체명</span></th>
                                <td>
                                    <div class="form_input">
                                        <div>
                                            <input type="text" id="text1" class="form_control" readonly disabled v-model="tradeId">
                                            <input type="text" id="text2" class="form_control" readonly disabled v-model="ptnrNm">
                                        </div>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius" v-bind:disabled="holdingCompany=='HEC'" v-b-modal.TestDeviceWrite_CooperationSearch>검색</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
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
                            <tr>    
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
                            <tr>
                                <th><span class="emp_red">상태</span></th>
                                <td>
                                    <select name="" id="" class="form_control medium" v-model="status">
                                        <option value="">선택</option>
                                        <option value="Y">보유</option>
                                        <option value="N">반출</option>
                                    </select>
                                </td>
                                <th><span class="emp_red">사용여부</span></th>
                                <td>
                                    <select name="" id="" class="form_control medium" v-model="useYn" :disabled="status == 'N' && useYn == 'N'">
                                        <option value="">선택</option>
                                        <option value="Y">사용</option>
                                        <option value="N">미사용</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>교정정보</strong>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div id="deviceWritePopSheetTable" class="ibsheet_table"></div>
                </div>

                <LstFile v-bind:lst-file-rst="lstFileRst"
                    v-bind:files="files"
                    v-bind:second-remove-file-id="secondRemoveFileId"
                    v-on:file-changed="fileChanged"
                    v-on:file-removed="fileRemoved"
                />
                <CooperationSearch v-on:fn-partner-choice="partnerChoice" :site-mstr-id="siteMstrId" :ref-id="'TestDeviceWrite_CooperationSearch'" :pop-idx="'1'"/>
                <!-- <PartnerUserSearch
                    v-on:fn-partner-choice="partnerChoice" v-bind:member-id-list="[]"
                /> -->
                <EmployeeSearch v-on:fn-employee-choice="employeeChoice"
                    :empl-pop-id="'TestDeviceWrite_EmployeeSearch'"
                    v-bind:insert-site-name="siteNm"
                    v-bind:site-code="siteCd"
                    :site-mstr-id="siteMstrId"
                    :pop-idx="'4'"/>
                <PopAlert
                    v-bind:msg="popMsg" v-bind:pop-id="popId" v-bind:confirm-use="confirmUse"
                    v-on:first-btn-fn="confirmBtn" v-on:second-btn-fn="closePop"
                />
            </div>
        </template>
        <template #modal-footer="{ }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="writeCheck">등록</b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="cancelBtn">취소</b-button>
        </template>
    </b-modal>
</template>

<script>
import { CorrectionWrite } from '../../common/data/PopupList'
import { sendFileApi, requestFileOptions } from '../../../apis/common';
import API from '@/apis/'
import LstFile from '@/pages/common/popup/LstFile'
import loader from '@ibsheet/loader'
import CooperationSearch from '@/pages/checkEdu/testDevice/cooperationSearch.vue'
import PopAlert from '@/pages/common/popup/PopAlert.vue'
import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'
import PartnerUserSearch from '@/pages/common/popup/PartnerUserSearch.vue'
import axios from 'axios'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

let writePopId = '';

export default {
    name: 'CorrectionWrite',
    mixins: [MsgBoxMixins],
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
            popMsg: '',
            popId: 'writeAlert',
            confirmUse: false,
            writeSheet:null,
            siteMstrId:'',
            siteCd:'',
            siteNm: '',
            projNm:'',
            baseType:'',
            csrtType:0,
            data:[],

            changeYn:false,//수정,상세 구분용
            writeFinishYn:false,
            checkYn:false,//필수요소검사 확인용

            testDeviceInfoId:'',                            // 아이디
            deviceNm:'',                                    // 계측기명
            deviceId:'',                                    // 계측기 관리번호
            productCompany:'',                              // 제작사
            correctYn:'',                                   // 교정대상여부
            deviceNum:'',                                   // 기기번호
            holdingCompany:'',                              // 보유업체
            confinal:'',                                    // 공종
            userId:'',                                      // 협력업체 직원Id
            userNm:'',
            tradeId:'',
            tradeNm:'',
            ptnrId:'',
            ptnrNm:'',
            allowance:'',                                   // 허용오차
            holdingPlace:'',                                // 보유장소
            correctTerm:'',                                 // 교정주기
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
        }
    },
    props:{
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
            default:'CorrectionWrite',
        }
    },
    watch:{
        holdingCompany:function(){
            if(this.holdingCompany == 'HEC'){
                document.getElementById('text1').setAttribute('disabled','true');
                document.getElementById('text2').setAttribute('disabled','true');
            }else if(this.holdingCompany == 'PTNR'){
                document.getElementById('text1').removeAttribute('disabled');
                document.getElementById('text2').removeAttribute('disabled');
            }
        },
        status:function(){
            let row = this.writeSheet.getRowByIndex(1);
            if(this.status == 'N'){
                this.useYn = 'N';
                this.correctTerm = 'NONE';
                this.nextDate = '';
                row.nextDate = '';
                row.nextDateCanEdit = 0;
                this.writeSheet.refreshRow(row);
            }else{
                row.nextDateCanEdit = 1;
                this.writeSheet.refreshRow(row);
            }
        },
    },
    mounted(){

    },
    beforeDestroy(){
        // loader.removeSheet(writePopId)
    },
    methods:{
        resetForm: function(){
            this.confinal = '';
            this.deviceNm = '';
            this.deviceNum = '';
            this.productCompany = '';
            this.holdingPlace = '';
            this.ptnrId = '';
            this.ptnrNm = '';
            this.tradeId = '';
            this.tradeNm = '';
            this.allowance = '';
            this.correctYn = '';
            this.correctTerm = '';
            this.correctCompany = '';
            this.correctDate = '';
            this.status = '';
            this.useYn = '';
            this.lstFileRst = [];
            this.files = [];
            this.sheetLoad();
        },
        sheetLoad: async function() {
            this.siteMstrId = this.siteId;
            let param = {
                'siteMstrId':this.siteMstrId,
            };

            let resData = null;
            try{
                resData =  await API.crack.getsiteList(param, {
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(resData.data.datas.resultList[0]);
            }catch(error){
                //console.log(error);
            }

            let row = {};
            if(typeof(resData)!='undefined' && resData.data.datas.resultList.length>0){
                let site = resData.data.datas.resultList[0];

                this.siteMstrId = site.siteMstrId;
                this.csrtType = parseInt(site.baseType) == 1000?'인프라':(parseInt(site.csrtType) == 0?'공동주택':(parseInt(site.csrtType) == 1?'일반건축':'공장'));
                this.baseType = parseInt(site.baseType) == 4000?'건축':'인프라';
                this.siteCd = site.siteId;
                this.siteNm = site.siteNm;
                this.projNm = site.projectNm;
                this.holdingCompany = 'HEC';

                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth() +1;
                let date = today.getDate();
                let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);

                row['correctDate'] = dateFormat;
                row['nextDate'] = dateFormat;
                row['bforRst'] = '';
                row['aftrRst'] = '';
                row['correctCompany'] = '';
                row['userEdit']='<div class="btn_wrap" style = "display: flex;justify-content: space-around;align-items: center;"> <span></span> <button type="button" class="btn btn_sm btn_darkblue btn_radius">검색</button> </div>';
            
                // let url = '/sendApi/api/file/upFileList';
                // let param = {
                //     fileType : "CrackMngt",
                //     fileConnectId : this.exFiles.fileConnectId,
                // };
                // requestOptions.headers['Accept-Language'] = "ko";
                // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                // const imgRst = await sendPostApi(url, param).then((result) => {
                //     return result.data;
                // }).catch((e) => {
                //     // //console.log(e);
                //     return e.response.data;
                // });
                // //console.log(imgRst.data);
            }

            let data = [];
            data.push(row);
            let options = CorrectionWrite.options;
            options.Events = {
                onAfterClick:this.fnClick,
            };
            options.Cfg = {
                'NoDataMessage':3,
                'CanEdit':1,
            };

            loader.createSheet({
                el: 'deviceWritePopSheetTable',
                data: data,
                options: options,
            }).then((sheet) => {
                writePopId = sheet.id
                this.writeSheet = sheet;
                sheet.blur();
            });
            
        },
        writeCheck: function(){
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
            let row = this.writeSheet.getFirstRow();
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
                this.confirm('등록하시겠습니까?',this.finalWrite);
                // this.finalWrite();
            }
        },
        finalWrite: async function(){
            this.writeFinishYn = false;
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

            let row = this.writeSheet.getFirstRow();
            let param = {
                'siteMstrId':this.siteMstrId,
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
            if(row.nextDate != ''){
                param['nextDate'] = IBSheet.dateToString(row.nextDate,"yyyy-MM-dd");
            }

            axios.post(docSeq, payload, options).then(docResponse => {
                //console.log(docResponse);
                param['deviceId'] = docResponse.data;
                axios.post('/sendApi/api/testDevice/testDeviceInfo/write', param, options)
                .then(response => {
                    //console.log(response);
                    if(typeof(response)!='undefined' && response.data != ''&&this.files.length>0){
                        //console.log('파일등록시작');
                        this.testDeviceInfoId = response.data.data;
                        requestFileOptions.headers['Accept-Language'] = "ko";
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        try{
                            const result = sendFileApi(this.testDeviceInfoId, "TestDevice", this.files).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                //console.log(e.response.data);
                                return e.response.data;
                            });
                            let fileRst2 = result.data; //저장된 데이터개수 받아오기
                            if(fileRst2 == ''){
                                // this.writeFinishYn = false;
                                // this.confirmUse = false;
                                // this.popMsg = '오류로 인해 등록이 완료되지 않았습니다.';
                                // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                this.alert('등록에 실패했습니다.');
                                return;
                            }
                        }catch(error){
                            // this.writeFinishYn = false;
                            // this.confirmUse = false;
                            // this.popMsg = '오류로 인해 등록이 완료되지 않았습니다.';
                            // this.$root.$emit('bv::show::modal', 'writeAlert');  
                            this.alert('등록에 실패했습니다.');
                            return;
                        }
                    }
                    // this.writeFinishYn = true;
                    // this.checkYn = false;
                    // this.popMsg = '등록이 완료되었습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');  
                    this.alert('등록되었습니다.',()=>{
                        this.$emit('close-write', true);
                        this.$root.$emit('bv::hide::modal', this.refId);  
                    });
                    return;
                }).catch(error => {
                    //console.error(error);

                    // this.writeFinishYn = false;
                    // this.checkYn = false;
                    // this.popMsg = '오류로 인해 등록이 완료되지않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('등록에 실패했습니다.');
                    return;
                })

                // let resData2 = null;
                // try{
                //     resData2 = API.testDevice.setTestDeviceWrite(param,{
                //         headers:{
                //             'Authorization': this.$cookies.get("Authorization")
                //         }
                //     });
                //     //console.log(resData2);
                // }catch(error){
                //     //console.log(error);
                //     this.writeFinishYn = false;
                //     this.checkYn = false;
                //     this.popMsg = '오류로 인해 등록이 완료되지않았습니다.';
                //     this.confirmUse = false;
                //     this.$root.$emit('bv::show::modal', 'writeAlert');
                //     return;
                // }
                // //파일 등록
                // if(typeof(resData2)!='undefined' && resData2.data != ''){
                //     //console.log('파일등록시작');
                //     this.testDeviceInfoId = resData2.data;
                //     requestFileOptions.headers['Accept-Language'] = "ko";
                //     requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                //     try{
                //         const result = sendFileApi(this.testDeviceInfoId, "TestDevice", this.files).then((result) => {
                //             return result.data;
                //         }).catch((e) => {
                //             //console.log(e.response.data);
                //             return e.response.data;
                //         });
                //         let fileRst2 = result.data; //저장된 데이터개수 받아오기
                //         if(fileRst2 == ''){
                //             this.writeFinishYn = false;
                //             this.popMsg = '오류로 인해 등록이 완료되지 않았습니다.';
                //             this.$root.$emit('bv::show::modal', 'writeAlert');  
                //             return;
                //         }
                //     }catch(error){
                //         this.writeFinishYn = false;
                //         this.popMsg = '오류로 인해 등록이 완료되지 않았습니다.';
                //         this.$root.$emit('bv::show::modal', 'writeAlert');  
                //         return;
                //     }

                //     this.writeFinishYn = true;
                //     this.checkYn = false;
                //     this.popMsg = '등록이 완료되었습니다.';
                //     this.confirmUse = false;
                //     this.$root.$emit('bv::show::modal', 'writeAlert');  
                // }else{
                //     this.writeFinishYn = false;
                //     this.checkYn = false;
                //     this.popMsg = '오류로 인해 등록이 완료되지않았습니다.';
                //     this.confirmUse = false;
                //     this.$root.$emit('bv::show::modal', 'writeAlert');  
                // }

            }).catch(error => {
                //console.error(error);

                // this.writeFinishYn = false;
                // this.checkYn = false;
                // this.popMsg = '오류로 인해 등록이 완료되지않았습니다.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'writeAlert');
                this.alert('등록에 실패했습니다.');
                return;
            })
        },
        changeTerm: function(){
            let temp = new Date(this.writeSheet.getFirstRow().correctDate);

            switch(this.correctTerm){
                case 'MONTH': 
                    temp.setMonth(temp.getMonth()+1);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case 'QUARTER':
                    temp.setMonth(temp.getMonth()+3);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case 'HALF_YEAR':                    
                    temp.setMonth(temp.getMonth()+6);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case '6_MONTH':
                    temp.setMonth(temp.getMonth()+6);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case '1_YEAR': 
                    temp.setFullYear(temp.getFullYear()+1);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case '2_YEAR':                     
                    temp.setFullYear(temp.getFullYear()+2);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case '3_YEAR':                     
                    temp.setFullYear(temp.getFullYear()+3);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case '4_YEAR':                    
                    temp.setFullYear(temp.getFullYear()+4);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case '5_YEAR':                     
                    temp.setFullYear(temp.getFullYear()+5);
                    this.writeSheet.getFirstRow()['nextDate'] = temp;
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                case 'NONE': 
                    this.writeSheet.getFirstRow()['nextDate'] = '';
                    this.writeSheet.refreshRow(this.writeSheet.getFirstRow());
                    break;
                default: 
                    break;
            }
        },
        fnClick:function(evt){
            if(evt.sheet.getFocusedCol() == 'userEdit'){
                this.$root.$emit('bv::show::modal', 'TestDeviceWrite_EmployeeSearch');  
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
            let row = this.writeSheet.getFirstRow();
            row['userEdit']='<div class="btn_wrap" style = "display: flex;justify-content: space-around;align-items: center;"> <span>'+this.userNm+'</span> <button type="button" class="btn btn_sm btn_darkblue btn_radius">검색</button> </div>';
            this.writeSheet.refreshRow(row);
        },
        confirmBtn:function(){
            if(this.writeFinishYn){
                this.writeFinishYn = false;
                this.$emit('close-write', true);
                this.$root.$emit('bv::hide::modal', this.refId);  
            }
            this.$root.$emit('bv::hide::modal', 'writeAlert');  
        },
        closePop:function(){
            this.$root.$emit('bv::hide::modal', 'writeAlert');  
        },
        cancelBtn:function(){
            this.confirm('취소하시겠습니까?',()=>{
                this.$root.$emit('bv::hide::modal', this.refId);  
            });
        }
    }
}
</script>