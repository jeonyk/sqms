<template>
        <div class="tab_contents">
            <div class="inner type2">
                <h2 class="sub_title">기본정보
                    <div class="fr" v-if="!allSiteYn">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-if="checkUser(userId,'update')" v-on:click="writeCheck" v-bind:class="{disabled:crckStatus == 'APVL'||crckStatus == 'END'}">저장</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-if="progressOrder=='REPR' && checkUser(userId,'update')" v-bind:class="{disabled:crckStatus!=='REPR_REDY'}" v-on:click="fnFinishCheck">완료</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-if="progressOrder!='REPR' && checkUser(userId,'update') &&(crckStatus != 'APVL' && crckStatus != 'END')" v-bind:class="{disabled:crckStatus!=='RSCH'}" v-on:click="insertSign">결재상신</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-if="checkUser(userId,'view') && (crckStatus == 'APVL' ||crckStatus == 'END')" v-on:click="viewAprv">결재보기</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="goList">목록</button>
                    </div>
                </h2>
                <div class="data_num">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="86">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>타설 No.</th>
                                <td>{{docSeq}}
                                    <button type="button" class="btn btn_sm btn_darkgray ml10" @click="qrCodeBtn" v-if="qrYn == '0'">QR코드 일괄출력</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pt20" v-if="(crckStatus == 'REDY' || crckStatus == 'RSCH'|| crckStatus == 'NONE') && (progressOrder == '1ST')">
                    <label class="input_radio" for="rdoSolar">
                        <input type="radio" id="rdoSolar" name="crack" checked="" value = "Y" v-model="crckYn">
                        <span class="label_text">균열 있음</span>
                    </label>
                    <label class="input_radio" for="rdoLunar">
                        <input type="radio" id="rdoLunar" name="crack" value = "N" v-model="crckYn">
                        <span class="label_text">균열 없음</span>
                    </label>
                </div>
                <div class="pt20" v-else>
                    <label class="input_radio" for="rdoSolar">
                        <input type="radio" id="rdoSolar" name="crack" checked="" value = "Y" v-model="crckYn" v-on:click="false" disabled>
                        <span class="label_text">균열 있음</span>
                    </label>
                    <label class="input_radio" for="rdoLunar">
                        <input type="radio" id="rdoLunar" name="crack" value = "N" v-model="crckYn" v-on:click="false" disabled>
                        <span class="label_text">균열 없음</span>
                    </label>
                </div>
                

                <div class="lst_tabs">
                    <ul>
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index, disabled: index>disableIndex}" :key="index"><a href="javascript:void(0);" v-on:click="tabClick(index)">{{tab}}</a></li>
                    </ul>
                </div>

                <div class="tab_area" v-show="currentTab == 0">
                    <div class="inner">
                        <div class="table_normal_list table_write">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="12%">
                                    <col width="*">
                                </colgroup>
                                <tbody v-if="(crckStatus == 'REDY' || crckStatus == 'RSCH'|| crckStatus == 'NONE') &&(progressOrder == '1ST')">
                                    <tr>
                                        <th><span class="emp_red">주요 원인</span></th>
                                        <td>
                                            <input type="text" class="form_control form_lg" id="cause" v-model="cause">
                                            <select name="" id="causeOption" class="form_control form_sm ml10" v-model="causeOption" disabled>
                                                <option value="">직접입력</option>
                                                <option value="건조 수축">건조 수축</option>
                                                <option value="온도 균열">온도 균열</option>
                                                <option value="부등 침하">부등 침하</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>관리 방법</th>
                                        <td>
                                            <div class="input_text">
                                                <textarea name="" id="careMethod" class="form_control" v-model="careMethod" :maxlength="200"></textarea>
                                                <div class="num"><strong class="count">{{careMethod!=null?careMethod.length:0}}</strong>/200</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <th><span class="emp_red">주요 원인</span></th>
                                        <td>
                                            <input type="text" class="form_control form_lg" id="cause" v-model="cause" readonly>
                                            <select name="" id="causeOption" class="form_control form_sm ml10" v-model="causeOption" disabled>
                                                <option value="">직접입력</option>
                                                <option value="건조 수축">건조 수축</option>
                                                <option value="온도 균열">온도 균열</option>
                                                <option value="부등 침하">부등 침하</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>관리 방법</th>
                                        <td>
                                            <textarea name="" id="careMethod" class="form_control" v-model="careMethod" readonly></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="button_box">
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkgray" v-bind:disabled="crckYn=='N'||progressOrder!='1ST'|| crckStatus == 'APVL'" v-on:click="copyRow">행 복사</button>
                                <div class="btn_number" v-bind:class="{disabled:crckYn=='N'||progressOrder!='1ST'|| crckStatus == 'APVL'}">
                                    <select name="" id="selectBox" class="form_control num" v-model="addIdx">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <button type="button" class="btn btn_sm" v-on:click="addRow">행 추가</button>
                                </div>
                                <button type="button" class="btn btn_sm btn_darkgray" v-bind:disabled="crckYn=='N'||progressOrder!='1ST'|| crckStatus == 'APVL'" v-on:click="delRow">행 삭제</button>
                            </div>
                        </div>

                        <!-- ibsheet -->
                        <div class="ib_wrap" v-show="crckYn=='Y'">
                            <div id="crackSheetTable" class="ibsheet_table"></div>
                        </div>
                        <div class="ib_wrap" v-show="crckYn=='N'">
                            <div id="crackSheetSubTable" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 1">
                    <div class="inner">
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="crackSheetTable2" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 2">
                    <div class="inner">
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="crackSheetTable3" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 3">
                    <div class="inner">
                        <!-- ibsheet -->
                        <!-- <div class="ib_wrap">
                            <div id="crackSheetTable4" class="ibsheet_table"></div>
                        </div> -->
                        <div class="table_normal_list align_center">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="5%">
                                    <col width="8%">
                                    <col width="22%">
                                    <col width="22%">
                                    <col width="25%">
                                    <col width="10%">
                                    <col width="10%">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th rowspan="2">균열번호</th>
                                        <th rowspan="2">균열종류</th>
                                        <th colspan="3">보수/보강 현황</th>
                                        <th rowspan="2">사진</th>
                                        <th rowspan="2">QR코드</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span class="emp_red">보수기간</span>
                                            <button type="button" class="btn btn_sm btn_darkgray ml10" v-if="progressOrder=='REPR'" v-on:click="sameDate">보수기간 동일</button>
                                        </th>
                                        <th>
                                            <span class="emp_red">보수업체</span>
                                            <button type="button" class="btn btn_sm btn_darkgray ml10" v-if="progressOrder=='REPR'" v-on:click="sameTrade">보수업체 동일</button>
                                        </th>
                                        <th><span class="emp_red">보수방법</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in data4 " v-bind:key="index">
                                        <td>{{data.crckNum}}</td>
                                        <td>{{data.crackType==1?'선형균열':'망상균열'}}</td>
                                        <td v-if="progressOrder=='REPR'"><date-picker-range v-model="data.date"/></td>
                                        <td v-else>{{data.startDate+' ~ '+data.endDate}}</td>
                                        <td v-if="progressOrder=='REPR'">
                                            <div class="search_area">
                                                <input type="text" placeholder="검색" class="form_control" readOnly v-model="data.tradeNm" v-on:click="openPop(index);"/>
                                                <button type="button" class="btn_search" v-on:click="openPop(index);">검색</button>
                                            </div>
                                        </td>
                                        <td v-else>{{data.tradeNm}}</td>
                                        <td>
                                            <select name="" id="" class="form_control" v-model="data.repairMethod" v-if="progressOrder!='REPR'" disabled>
                                                <option value="">선택</option>
                                                <option value="1">표면처리공법</option>
                                                <option value="2">주입공법(에폭시 등)</option>
                                                <option value="3">충전공법</option>
                                                <option value="4">강판접착공법(주입공법, 압착공법)</option>
                                                <option value="5">프리스트레싱공법</option>
                                                <option value="6">단면증강공법</option>
                                                <option value="7">부재의 증설공법</option>
                                            </select>
                                            <select name="" id="" class="form_control" v-model="data.repairMethod" v-else>
                                                <option value="">선택</option>
                                                <option value="1">표면처리공법</option>
                                                <option value="2">주입공법(에폭시 등)</option>
                                                <option value="3">충전공법</option>
                                                <option value="4">강판접착공법(주입공법, 압착공법)</option>
                                                <option value="5">프리스트레싱공법</option>
                                                <option value="6">단면증강공법</option>
                                                <option value="7">부재의 증설공법</option>
                                            </select>
                                        </td>
                                        <td v-if="data.fileYn=='0'"><button type="button" class="btn" v-on:click="fnClick2('file',data)"><button type='button' class='btn_plus'>등록</button></button></td>
                                        <td v-if="data.fileYn=='1'"><button type="button" class="btn" v-on:click="fnClick2('file',data)"><button type='button' class='btn_view'>보기</button></button></td>
                                        <td v-if="data.fileYn==''"></td>
                                        <td><button type='button' class='btn_qrcord' v-on:click="fnClick2('qr',data)">QR코드</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="table_normal_list table_write">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="12%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>특이사항</th>
                                        <td>
                                            <div class="input_text">
                                                <textarea name="" id="" class="form_control" v-model="remark" v-if="progressOrder!='REPR'" readonly></textarea>
                                                <textarea name="" id="" class="form_control" v-model="remark" v-else></textarea>
                                                <div class="num" v-if="progressOrder=='REPR'"><strong class="count">{{remark!=null?remark.length:0}}</strong>/500</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 4">
                    <div class="inner">
                        <!-- ibsheet -->
                        <div class="ib_wrap">
                            <div id="crackSheetTable5" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>
            </div>
            <PartnerCompanySearch  v-on:fn-company-choice="companyChoice" v-bind:trade-type-name="tradeType" :site-mstr-id="siteMstrId"/>
            <PopAlert
                v-bind:msg="popMsg" v-bind:pop-id="popId" v-bind:confirm-use="confirmUse"
                v-on:first-btn-fn="confirmBtn" v-on:second-btn-fn="closePop"
            />
            <CrackPhotoWritePop v-bind:ex-files="fileObj" v-on:file-insert="fileInsert"/>
            <approve
                ref-id="crackWriteApproveModal"
                :code-type="approve.codeType"
                doc-type="CRCK"
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
                ref-id="CrackInfoWrite_AprvView"
                :aprv-info-id="aprvInfoId"
            />
        </div>
</template>

<script>
    import loader from '@ibsheet/loader'
    import axios from 'axios'
    import API from '@/apis/'
    import { CrackDetail, CrackDetail3 } from '../../common/data/MaterialsList'
    import { sendFileApi, requestFileOptions } from '../../../apis/common';
    import { sendPostApi, requestOptions } from '../../../apis/common';
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import PartnerCompanySearch from '@/pages/common/popup/PartnerCompanySearch.vue'
    import CrackPhotoWritePop from '@/pages/quality/crackMngt/CrackPhotoWritePop.vue'
    import Approve from '@modal/approval/Approve.vue'
    import ApprovalView from '@modal/approval/ApprovalView.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { commonFn } from '@/script/commonFn.js';
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

    // let crackSheetIdSub = '';
    // let crackSheetId1 = '';
    // let crackSheetId2 = '';
    // let crackSheetId3 = '';
    // let crackSheetId4 = '';
    // let crackSheetId5 = '';

    export default {
        name: 'CrackInfoWrite',
        components: {
            PartnerCompanySearch,
            PopAlert,
            DatePickerRange,
            CrackPhotoWritePop,
            Approve,
            ApprovalView,
        },
        mixins: [MsgBoxMixins, authCheckMixns],
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['1차 조사', '2차 조사', '3차 조사', '보수/보강', '4차 조사'], // tab name
                popMsg: '',
                popId: 'writeAlert',
                confirmUse: false,

                disableIndex: '',                                               // 탭 막기용 번호
                aprvDt: '',                                                     // 결재일자
                crckStatus: '',                                                 // 진행상태 
                progressOrder: '',                                              // 진행차수
                crckMngtQr: '',                                                 // QR
                crckMngtQrUrl: '',                                              // QR URL
                crckYn: '',                                                     // 균열 유무
                cause: '',                                                      // 주요원인
                causeOption:'',                                                 // 부등 침하
                careMethod: '',                                                 // 관리방법
                remark: '',                                                     // 특이사항
                crckMngtDtlId: '',                                              // 균열 상세 ID
                testOrder: '',                                                  // 균열 상세 진행차수
                crackType: '',                                                  // 균열종류
                startDate: '',                                                  // 조사시작기간
                endDate: '',                                                    // 조사마감기간
                dateIdx:0,
                crackWidth: '',                                                 // 균열넓이
                crackLength : '',                                               // 균열길이
                tradeId: '',                                                    // 협력사 Id
                tradeNm:'',
                tradeType:'',
                tradeIdx:0,
                userId: '',                                                     // 협력사 직원 Id
                // ivtgAprvYn: '',                                                 // 조사자 확인
                // sptdAprvYn: '',                                                 // 감리 확인
                docSeq: '',
                repairMethod:'',
                aprvOptnType:'',

                sheetLoadYn: false,                                             // 아이비시트 로드 여부
                writeCheckYn: false,                                            // 게시글 작성 검사 여부
                signYn:false,                                                   // 결재상신 체크여부
                insertSignYn:false,                                             // 결재상신 여부
                qrYn : '0',                                                     // qr 여부 0 : true / 1 : false

                //시트
                sheet1: null,
                sheet2: null,
                sheet3: null,
                sheet4: null,
                sheet5: null,
                sheetSub: null,

                //보수용 데이터
                data4:[],

                //저장용
                detailObj: [],
                crckMngtDtlIds : [],                                                    // 지울 Id
                addIdx:1,                                                       // 추가할 행 갯수
                // dateFormat:'',
                fileConnectId: '',
                fileObj: null,
                selectedSheet:null,
                selectedRow:null,
                secondRemoveImgId:[],
                reprFileYn: false,
                approve: {
                    codeType: 'CRCK',
                    codeDtlType: 'CRCK',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: null,
                },
                ozReport:{src : '',},
                userId:'',
                aprvInfoId:'',
            }
        },
        props : {
            siteMstrId : {
                type: String,
                default: ''
            },
            concPourDtlId : {
                type: String,
                default: ''
            },
            concPourSubNum : {
                type: Number,
                default: 0
            },
            crckMngtInfoId :{
                type: String,
                default: ''
            },
            allSiteYn:{
                type: Boolean,
                default: false,
            }
        },
        mounted() {
            this.userId = this.$store.getters['auth/getUserId'];
            //let ts = this;
            if(this.siteMstrId == null|| this.siteMstrId == ''){
                // //console.log(this.crckMngtInfoId);
                this.$router.push({name: 'CrackList'});
                return;
            }else{
                this.sheetLoad();
            }
        },
        beforeDestroy() {
            // loader.removeSheet(this.sheet1.id);
            // loader.removeSheet(this.sheet2.id);
            // loader.removeSheet(this.sheet3.id);
            // loader.removeSheet(this.sheet5.id);
            // loader.removeSheet(this.sheetSub.id);
        },
        watch: {
            crckYn: function(){
                if(this.crckYn == 'N' && this.sheetLoadYn && ((this.crckStatus == 'REDY'||this.crckStatus == 'RSCH'|| this.crckStatus == 'NONE')&&(this.progressOrder == '1ST'))){//균열없음일때
                    document.getElementById('cause').setAttribute('disabled','true');
                    document.getElementById('careMethod').setAttribute('disabled','true');
                    document.getElementById('causeOption').setAttribute('disabled','true');
                    document.getElementById('selectBox').setAttribute('disabled','true');

                    // let rows = this.sheet1.getDataRows();
                    // for(let i = 1; i<=rows.length; i++){//감추기
                    //     let row = this.sheet1.getRowByIndex(i);
                    //     this.sheet1.hideRow({'row':row,'norender':1});
                    // }
                    // this.sheet1.renderBody();
                }else if(this.crckYn =='Y' && this.sheetLoadYn&& ((this.crckStatus == 'REDY'||this.crckStatus == 'RSCH'|| this.crckStatus == 'NONE')&&(this.progressOrder == '1ST'))){//균열있음일때
                    document.getElementById('cause').removeAttribute('disabled');
                    document.getElementById('careMethod').removeAttribute('disabled');
                    document.getElementById('causeOption').removeAttribute('disabled');
                    document.getElementById('selectBox').removeAttribute('disabled');
                    
                    // let rows = this.sheet1.getDataRows();
                    // // //console.log(rows);
                    // for(let i = 0; i<rows.length; i++){//감추기
                    //     // let row = this.sheet1.getRowByIndex(i);
                    //     // // //console.log(row);
                    //     this.sheet1.showRow({'row':rows[i],'norender':1});
                    // }
                    // this.sheet1.renderBody();
                }
            },
            causeOption: function(){
                if(this.crckYn == 'Y'){
                    if(this.causeOption != ''){
                        document.getElementById('cause').setAttribute('readOnly','true');
                        this.cause = this.causeOption;
                    }else{
                        this.cause = '';
                        document.getElementById('cause').removeAttribute('readOnly');
                    }
                }
            },
            remark: function(){
                if(this.remark != null){
                    if(this.remark.length>200){
                        this.remark=this.remark.slice(0,500);
                    }
                }
            },
            careMethod: function(){
                if(this.careMethod != null){
                    if(this.careMethod.length>200){
                        this.careMethod=this.careMethod.slice(0,200);
                    }
                }
            },
            data4:function(){
                //console.log('dd');
                //console.log(this.data4);
            }
        },
        methods: {
            sheetLoad: async function(){
                /**추가 */
                if(this.siteMstrId == ''||this.siteMstrId == null){
                    this.$router.push({name: 'CrackList'});
                    return;
                }
                //console.log(this.crckMngtInfoId);
                /**추가 */
                
                let param = {
                    'siteMstrId': this.siteMstrId,
                    'concPourDtlId': this.concPourDtlId,
                    'crckMngtInfoId':this.crckMngtInfoId,
                };
                const rst = await API.crack.getCrackInfoView(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // //console.log(rst);
                let data = [];
                let data2 = [];
                let data3 = [];
                this.data4 = [];
                let data5 = [];
                

                // if(rst.statusText == 'OK'){
                if (rst.status === 200) {
                    let info = rst.data.data;
                    // console.log(rst.data.data)  // progressOrder 차수 ,  crckStatus 상태 
                    this.aprvDt= info.aprvDt;
                    this.crckStatus= info.crckStatus;
                    this.progressOrder= info.progressOrder;
                    this.crckMngtQr= info.crckMngtQr;
                    this.crckMngtQrUrl= info.crckMngtQrUrl;
                    this.crckYn= info.crckYn;
                    this.cause= info.cause;
                    this.causeOption = (info.cause == '건조 수축'?'건조 수축':(info.cause == '온도 균열'?'온도 균열':(info.cause == '부등 침하'?'부등 침하':'')));
                    this.careMethod= info.careMethod;
                    this.remark= info.remark;
                    this.docSeq = info.docSeq;
                    this.aprvOptnType = info.aprvOptnType;
                    this.aprvInfoId = this.progressOrder== '1ST'?info.aprvInfoIdNo1
                                      :this.progressOrder== '2ND'?info.aprvInfoIdNo2
                                      :this.progressOrder== '3RD'?info.aprvInfoIdNo3
                                      :this.progressOrder== 'REPR'?info.aprvInfoIdNo3
                                      :info.aprvInfoIdNo4;
                    // console.log(this.aprvInfoId);
                    this.sheetLoadYn = true;
                    
                    //오늘날짜계산
                    let today = new Date();
                    let year = today.getFullYear();
                    let month = today.getMonth() +1;
                    let date = today.getDate();
                    let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);

                    //아이비시트 데이터
                    let temp = rst.data.list;

                    this.qrYn = '0' 

                    if((this.progressOrder == '1ST' && this.crckStatus == 'REDY') 
                    || (this.progressOrder == '1ST' && this.crckStatus == 'NONE') 
                    || (this.progressOrder == '1ST' && this.crckStatus == 'RSCH')){
                        this.qrYn = '1'
                    }
                    
                    if((temp.length == 0 || temp == null)&&((this.progressOrder=='1ST'&&(this.crckStatus=='REDY' || this.crckStatus=='NONE')))){
                        data = [
                            // {checkYn:'',crackType:'',startDate:dateFormat,crackWidth:'',crackLength:'',ivtgAprvYn:'-',sptdAprvYn:'-',fileYn:'0', qr:'0',crckMngtDtlId:'',testOrder:'1ST',},
                            // {checkYn:'',crackType:'',startDate:dateFormat,crackWidth:'',crackLength:'',ivtgAprvYn:'-',sptdAprvYn:'-',fileYn:'0', qr:'0',crckMngtDtlId:'',testOrder:'1ST',},
                            // {checkYn:'',crackType:'',startDate:dateFormat,crackWidth:'',crackLength:'',ivtgAprvYn:'-',sptdAprvYn:'-',fileYn:'0', qr:'0',crckMngtDtlId:'',testOrder:'1ST',}
                            {checkYn:'',crackType:'',startDate:dateFormat,crackWidth:'',crackLength:'', fileYn:'0', qr: this.qrYn, crckMngtDtlId:'',testOrder:'1ST',},
                            {checkYn:'',crackType:'',startDate:dateFormat,crackWidth:'',crackLength:'', fileYn:'0', qr: this.qrYn, crckMngtDtlId:'',testOrder:'1ST',},
                            {checkYn:'',crackType:'',startDate:dateFormat,crackWidth:'',crackLength:'', fileYn:'0', qr: this.qrYn, crckMngtDtlId:'',testOrder:'1ST',}
                        ];
                    }
                    if(temp.length >0){
                        for(let x = 0; x<temp.length; x++){
                            temp[x]['crackTypeNm'] = temp[x]['crackType']==1?'선형균열':'망상균열';
                            temp[x]['repairMethod'] = temp[x]['repairMethod']==null?'':temp[x]['repairMethod'];
                            // temp[x]['ivtgAprvYn'] = temp[x]['ivtgAprvYn']=='Y'?'결재완료':'-';
                            // temp[x]['sptdAprvYn'] = temp[x]['sptdAprvYn']=='Y'?'결재완료':'-';
                            temp[x]['startDate'] = (temp[x]['startDate']==''||temp[x]['startDate']==null)?dateFormat:temp[x]['startDate'];
                            temp[x]['endDate'] = (temp[x]['endDate']==''||temp[x]['endDate']==null)?dateFormat:temp[x]['endDate'];
                            temp[x]['date'] = [temp[x]['startDate'],temp[x]['endDate']];
                            temp[x]['img'] = [];
                            temp[x]['secondRemoveImgId']=[];
                            temp[x]['copiedFileIds']=[];
                            temp[x]['copiedFiles']=[];
                            temp[x]['lstImgRst']=[];
                            temp[x]['crackWidth'] = temp[x]['crackWidth'] != null && temp[x]['crackWidth'].indexOf('.')<0?commonFn.methods.addCommas(temp[x]['crackWidth']):temp[x]['crackWidth'];
                            temp[x]['crackLength'] = temp[x]['crackLength'] != null && temp[x]['crackLength'].indexOf('.')<0?commonFn.methods.addCommas(temp[x]['crackLength']):temp[x]['crackLength'];

                            if(this.progressOrder != temp[x]['testOrder']||this.crckStatus =='END'||this.crckStatus == 'NONE'|| this.crckStatus == 'APVL'){//완료상태일때
                                temp[x]['fileYn'] = temp[x]['cnt'] ==0?'':'1';
                            }else{
                                temp[x]['fileYn'] = temp[x]['cnt'] ==0?'0':'1';
                            }
                            temp[x]['qr']= this.qrYn;//qr코드
                            if(temp[x].testOrder == '1ST'){
                                data.push(temp[x]);
                            }else if(temp[x].testOrder == '2ND'){
                                data2.push(temp[x]);
                            }else if(temp[x].testOrder == '3RD'){
                                data3.push(temp[x]);
                            }else if(temp[x].testOrder == '4TH'){
                                data5.push(temp[x]);
                            }else{//보수
                                this.data4.push(temp[x]);
                            }
                        }
                    }
                    //탭계산
                    let order = ['1ST','2ND','3RD','REPR','4TH'];
                    this.currentTab = order.indexOf(this.progressOrder);
                    this.disableIndex = order.indexOf(this.progressOrder);
                    //console.log(this.currentTab);
                    // //console.log(this.progressOrder);

                    //1차
                    let options = CrackDetail.options.Cfg;
                    let cols = CrackDetail.options.Cols;
                    //console.log(this.progressOrder!= '1ST');
                    //console.log(options['CanEdit']);

                    if(this.progressOrder != '1ST' || this.crckStatus == 'APVL'){//1차가 아닐경우 체크박스 제거
                        cols = CrackDetail3.options.Cols;
                        cols[2].Header[0].Value = '1차(최초) 조사';
                        options['CanEdit'] = 0;
                    }else{
                        options['CanEdit'] = 1;
                    }
                    let events = {
                        onAfterClick: this.fnClick,
                        onAfterChange: this.fnChange,
                    };
                    loader.createSheet({//1차
                        el: 'crackSheetTable',
                        options: {
                            Cfg:options,
                            Cols:cols,
                            Events: events,
                        },
                        data: data,
                    }).then((sheet) => {
                        // crackSheetId1 = sheet.id
                        this.sheet1 = sheet;
                        sheet.blur();
                    });
                    //console.log(options['CanEdit']);
                    loader.createSheet({//1차 빈공간용
                        el: 'crackSheetSubTable',
                        options: {
                            Cfg:options,
                            Cols:cols,
                        },
                        data: [],
                    }).then((sheet) => {
                        // crackSheetIdSub = sheet.id
                        this.sheetSub = sheet;
                        sheet.blur();
                    });

                    //2차
                    let options3 = CrackDetail3.options;
                    if(this.progressOrder != '2ND' || this.crckStatus == 'APVL'){//2차가 아닐경우
                        options3.Cfg['CanEdit'] = 0;
                    }else{
                        options3.Cfg['CanEdit'] = 1;
                    }
                    options3.Cols[2].Header[0].Value = '2차 조사';
                    options3.Events = {
                        onAfterClick: this.fnClick,
                        onAfterChange: this.fnChange,
                    };
                    loader.createSheet({//2차
                        el: 'crackSheetTable2',
                        options: options3,
                        data: data2
                    }).then((sheet) => {
                        // crackSheetId2 = sheet.id
                        this.sheet2 = sheet;
                    });

                    //3차
                    let options4 = CrackDetail3.options;
                    if(this.progressOrder != '3RD' || this.crckStatus == 'APVL'){//3차가 아닐경우
                        options4.Cfg['CanEdit'] = 0;
                    }else{
                        options4.Cfg['CanEdit'] = 1;
                    }
                    options4.Cols[2].Header[0].Value = '3차 조사';
                    options4.Events = {
                        onAfterClick: this.fnClick,
                        onAfterChange: this.fnChange,
                    };
                    loader.createSheet({//3차
                        el: 'crackSheetTable3',
                        options: options4,
                        data: data3
                    }).then((sheet) => {
                        // crackSheetId3 = sheet.id
                        this.sheet3 = sheet;
                    });

                    //4차
                    let options5 = CrackDetail3.options;
                    if((this.progressOrder != '4TH')||(this.progressOrder == '4TH'&&(this.crckStatus=='APVL'||this.crckStatus=='END'))){//4차가 아닐경우, 결재상신이후일경우
                        options5.Cfg['CanEdit'] = 0;
                    }else{
                        options5.Cfg['CanEdit'] = 1;
                    }
                    options5.Cols[2].Header[0].Value = '4차 조사';
                    options5.Events = {
                        onAfterClick: this.fnClick,
                        onAfterChange: this.fnChange,
                    };
                    loader.createSheet({//4차
                        el: 'crackSheetTable5',
                        options: options5,
                        data: data5
                    }).then((sheet) => {
                        // crackSheetId5 = sheet.id
                        this.sheet5 = sheet;
                    });

                    //보수
                    // let options2 = CrackDetail2.options;
                    // options2.Events = {
                    //     onAfterClick: this.fnClick,
                    // };  
                    // loader.createSheet({//보수
                    //     el: 'crackSheetTable4',
                    //     options: options2,
                    //     data: this.data4
                    // }).then((sheet) => {
                    //     crackSheetId4 = sheet.id
                    //     sheet.bind("onClick", function(evtParam) {
                    //         if(evtParam.col == "case4" && evtParam.event.target.tagName == "BUTTON"){ // case4: 보수업체
                    //             // ts.$root.$emit('bv::show::modal', 'CompanySelect')

                    //             // let data = CompanySelect.data;
                    //             // let options = CompanySelect.options;

                    //             setTimeout(function() {
                    //                 loader.createSheet({
                    //                     el: 'popcrackSheetTable',
                    //                     options: options,
                    //                     data: data
                    //                 }).then((sheet) => {
                    //                     crackSheetId = sheet.id
                    //                     this.sheet4 = sheet;
                    //                 })
                    //             }, 100)
                    //         }
                    //     })
                    // });

                    // this.hideRow();
                }
                if(this.progressOrder == '1ST'&&this.crckStatus == 'REDY'){
                    this.crckYn = 'Y';
                }
            },
            writeCheck: function(){
                if(this.crckStatus == 'APVL'||this.crckStatus == 'END'){
                    return;
                }

                this.popMsg = '';
                this.confirmUse = false;
                let order = ['1ST','2ND','3RD','REPR','4TH'];
                let index = order.indexOf(this.progressOrder);

                // //console.log(this.crckYn);
                if(this.crckYn == 'Y'){
                    if(this.progressOrder == 'REPR'){//보수일때
                        // //console.log(this.data4);
                        for(let x=0;x<this.data4.length;x++){
                            // //console.log(this.data4[x]);
                            // if(this.data4[x].startDate == ''|| this.data4[x].startDate == null){
                            //     this.writeCheckYn = false;
                            //     this.popMsg = '보수기간을 입력해주세요.';
                            //     this.$root.$emit('bv::show::modal', 'writeAlert');  
                            //     return;
                            // }
                            // if(this.data4[x].endDate == ''|| this.data4[x].endDate == null){
                            //     this.writeCheckYn = false;
                            //     this.popMsg = '보수기간을 입력해주세요.';
                            //     this.$root.$emit('bv::show::modal', 'writeAlert');  
                            //     return;
                            // }
                            if(this.data4[x].tradeId == ''|| this.data4[x].tradeId == null){
                                this.writeCheckYn = false;
                                // this.popMsg = '보수업체를 선택해주세요.';
                                // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                this.alert('보수업체를 선택해주세요.');
                                this.currentTab = index;
                                return;
                            }
                            if(this.data4[x].repairMethod == ''|| this.data4[x].repairMethod == null){
                                this.writeCheckYn = false;
                                // this.popMsg = '보수방법을 선택해주세요.';
                                // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                this.alert('보수방법을 선택해주세요.');
                                this.currentTab = index;
                                return;
                            }
                        }
                    }else{//1차,2차,3차,4차일때
                        //1차일 때
                        if(this.progressOrder == '1ST'&&(this.cause == '' || this.cause == null)){
                            this.writeCheckYn = false;
                            // this.popMsg = '주요 원인을 입력해주세요.';
                            // this.$root.$emit('bv::show::modal', 'writeAlert');  
                            this.alert('주요 원인을 입력해주세요.');
                            this.currentTab = index;
                            return;
                        }
                        this.detailObj = [];
                        let selectSheet = null;
                        switch(this.progressOrder){
                            case '1ST':
                                selectSheet = this.sheet1;
                                break;
                            case '2ND':
                                selectSheet = this.sheet2;
                                break;
                            case '3RD':
                                selectSheet = this.sheet3;
                                break;
                            case '4TH':
                                selectSheet = this.sheet5;
                                break;
                        }
                        let rows = selectSheet.getDataRows();

                        if(rows != null && rows.length >0){
                            for(let i = rows.length; i>=1; i--){
                                let row = selectSheet.getRowByIndex(i);
                                if(row.crackType == '' || row.crackType == null){
                                    // this.writeCheckYn = false;
                                    // this.popMsg = '균열 종류를 선택해주세요.';
                                    // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                    this.alert('균열 종류를 선택해주세요.');
                                    this.currentTab = index;
                                    return;
                                }
                                if(row.startDate == '' || row.startDate == null){
                                    // this.writeCheckYn = false;
                                    // this.popMsg = '조사일을 선택해주세요.';
                                    // this.$root.$emit('bv::show::modal', 'writeAlert'); 
                                    this.alert('조사일을 선택해주세요.');
                                    this.currentTab = index; 
                                    return;
                                }
                                if((row.crackWidth.toString() == '' || row.crackWidth == null)){
                                    // this.writeCheckYn = false;
                                    // this.popMsg = '균열폭을 입력해주세요.';
                                    // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                    this.alert('균열폭을 선택해주세요.');
                                    this.currentTab = index;
                                    return;
                                }
                                if((row.crackLength.toString() == '' || row.crackLength == null)){
                                    // this.writeCheckYn = false;
                                    // this.popMsg = '균열길이를 입력해주세요.';
                                    // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                    this.alert('균열길이를 입력해주세요.');
                                    this.currentTab = index;
                                    return;
                                }
                                
                                
                                let tempObj = {};
                                if(row.crckMngtDtlId != '' && row.crckMngtDtlId != null){
                                    tempObj['crckMngtDtlId']= row.crckMngtDtlId;
                                    tempObj['status']= 'change';
                                }else{
                                    tempObj['crckMngtDtlId']= '';
                                    tempObj['status']= 'add';
                                }
                                // console.log(row.crackWidth);
                                tempObj['startDate']= IBSheet.dateToString(row.startDate,"yyyy-MM-dd");
                                tempObj['crackType']= row.crackType;
                                tempObj['crackWidth']=row.crackWidth.toString().indexOf(',') >-1 ? row.crackWidth.replaceAll(',',''):row.crackWidth;
                                tempObj['crackLength']=row.crackLength.toString().indexOf(',') >-1? row.crackLength.replaceAll(',',''):row.crackLength;
                                tempObj['crckNum']=row.SEQ;
                                tempObj['secondRemoveImgId']=row.secondRemoveImgId;
                                tempObj['img']=row.img;
                                tempObj['copiedFileIds'] = row.copiedFileIds;
                                tempObj['copiedFiles'] = row.copiedFiles;

                                this.detailObj.push(tempObj);
                            }
                            // //console.log(this.detailObj);
                        }else{
                            // this.writeCheckYn = false;
                            // this.popMsg = '균열을 1개이상 등록해주세요.';
                            // this.$root.$emit('bv::show::modal', 'writeAlert');  
                            this.alert('균열을 입력해주세요.');
                            this.currentTab = index;
                            return;
                        }
                    }

                    //체크후 이상없을시
                    if(this.popMsg == ''&&this.progressOrder == 'REPR'){ // 보수일때
                        // // //console.log(this.detailObj);
                        this.detailObj = this.data4;
                        this.writeCheckYn = true;
                        // //console.log('dd');
                        this.confirm('저장하시겠습니까?', async() => {
                            this.finalWrite();
                        })
                        return;
                    }else if(this.popMsg == ''){//아닐때
                        // //console.log(this.detailObj);
                        this.writeCheckYn = true;
                        // //console.log('dd');
                        this.confirm('저장하시겠습니까?', async() => {
                            this.finalWrite();
                        })
                        return;
                    }
                }else{//균열없음일때
                    this.writeCheckYn = true;
                    // //console.log('ff');
                    this.confirm('저장하시겠습니까?', async() => {
                        this.finalWrite();
                    })
                    return;
                }
            },
            finalWrite : async function(){
                //균열관리 수정, 균열관리 상세 삭제
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'crckMngtInfoId':this.crckMngtInfoId,
                    'crckYn':this.crckYn,
                    'progressOrder':this.progressOrder,
                    // 'remark':this.remark,
                    // 'cause':this.cause,
                    // 'careMethod':this.careMethod,
                    // 'detailObj': this.detailObj,
                    'crckMngtDtlIds':this.crckMngtDtlIds,
                };
                if(this.progressOrder == '1ST'){
                    param['cause'] = this.cause;
                    param['careMethod'] = this.careMethod;
                }else if(this.progressOrder == 'REPR'){
                    param['remark'] = this.remark;
                }

                if(this.crckYn == 'Y'&& this.progressOrder !='REPR'){
                    param['crckStatus'] = 'RSCH';
                }else if(this.crckYn == 'Y'&& this.progressOrder =='REPR'){
                    param['crckStatus'] = 'REPR_REDY';
                }else{
                    param['crckStatus'] = 'NONE';
                    param['cause'] = '';
                    param['careMethod'] = '';
                }
                //console.log(param);
                //console.log(this.crckYn);
                
                const rst = await API.crack.setCrackInfo(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                
                // //console.log(rst);

                // if(rst.statusText == 'OK' && this.crckYn=='Y'){
                if(rst.status == 200 && this.crckYn=='Y'){
                    //console.log('ok');
                    //균열관리 상세 수정
                    for(let i = 0; i<this.detailObj.length; i++){
                        let param2={
                            'siteMstrId':this.siteMstrId,
                            'crckMngtInfoId':this.crckMngtInfoId,
                        };
                        // //console.log(this.detailObj[i]);
                        param2['crckMngtDtlId'] = this.detailObj[i].crckMngtDtlId;
                        param2['status'] = this.detailObj[i].status;
                        param2['crackType'] = this.detailObj[i].crackType;
                        param2['crackWidth'] = this.detailObj[i].crackWidth;
                        param2['crackLength'] = this.detailObj[i].crackLength;
                        // param2['ivtgAprvYn'] = 'N';
                        // param2['sptdAprvYn'] = 'N';
                        param2['testOrder'] = this.progressOrder;
                        param2['startDate'] = this.detailObj[i].startDate;

                        if(this.progressOrder == '1ST'){
                            param2['crckNum'] = this.detailObj[i].crckNum;
                        }
                        if(this.progressOrder == 'REPR'){
                            param2['startDate']=this.detailObj[i].date[0];
                            param2['endDate'] = this.detailObj[i].date[1];
                            param2['tradeId'] = this.detailObj[i].tradeId;
                            param2['repairMethod'] = this.detailObj[i].repairMethod;
                        }

                        const rst2 = await API.crack.setCrackDtl(param2,{
                            headers:{
                                'Authorization': this.$cookies.get("Authorization")
                            }
                        });
                        // //console.log(rst2);
                        if(rst2.data.data != '0000'){
                            this.writeCheckYn = false;
                            // this.popMsg = '저장에 실패했습니다.';
                            // this.$root.$emit('bv::show::modal', 'writeAlert');  
                            this.alert('저장에 실패했습니다.');
                            return;
                        }else{//성공시
                            //이미지 삭제
                            if(typeof(this.detailObj[i].secondRemoveImgId) != 'undefined' && this.detailObj[i].secondRemoveImgId.length>0){
                                requestOptions.headers['Accept-Language'] = "ko";
                                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                let url = '/sendApi/api/file/fileUnUse';
                                let param = {
                                    fileType : "CrackMngt",
                                    fileQltArcvIds : this.detailObj[i].secondRemoveImgId
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
                                    this.writeCheckYn = false;
                                    // this.popMsg = '저장에 실패했습니다.';
                                    // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                    this.alert('저장에 실패했습니다.');
                                    return;
                                }
                            }
                            //console.log('삭제완료');
                            
                            //이미지 등록
                            if((typeof(this.detailObj[i].img) != 'undefined' && this.detailObj[i].img.length>0)||(this.detailObj[i].copiedFileIds && this.detailObj[i].copiedFileIds.length>0)){
                                //console.log('이미지등록시작');
                                requestFileOptions.headers['Accept-Language'] = "ko";
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                                let id = this.crckMngtInfoId+'_'+rst2.data.id;
                                //console.log(id);
                                try{
                                    const res_data2 = await sendFileApi(id, "CrackMngt", this.detailObj[i].img, null, this.detailObj[i].copiedFileIds).then((result) => {
                                    return result.data;
                                    }).catch((e) => {
                                        //console.log(e.response.data);
                                        return e.response.data;
                                    });
                                    let fileRst2 = res_data2.data; //저장된 데이터개수 받아오기
                                    if(fileRst2 == ''){
                                        this.writeCheckYn = false;
                                        // this.popMsg = '저장에 실패했습니다.';
                                        // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                        this.alert('저장에 실패했습니다.');
                                        return;
                                    }
                                }catch(error){
                                    this.writeCheckYn = false;
                                    // this.popMsg = '저장에 실패했습니다.';
                                    // this.$root.$emit('bv::show::modal', 'writeAlert');  
                                    this.alert('저장에 실패했습니다.');
                                    return;
                                }
                            }
                        }
                    }
                    if(this.writeCheckYn){
                        // this.writeCheckYn = true;
                        this.crckMngtDtlIds = [];
                        // this.popMsg = '저장되었습니다.';    
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('저장되었습니다.',this.sheetLoad);  
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                        return;
                    }
                // }else if(rst.statusText == 'OK' && this.crckYn == 'N'){
                }else if(rst.status == 200 && this.crckYn == 'N'){
                    // this.writeCheckYn = true;
                    this.crckMngtDtlIds = [];
                    // this.popMsg = '저장되었습니다.';    
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('저장되었습니다.',this.sheetLoad);
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    return;
                }else{
                    this.writeCheckYn = false;
                    // this.popMsg = '저장에 실패했습니다.';
                    // this.$root.$emit('bv::show::modal', 'writeAlert');  
                    this.alert('저장에 실패했습니다.');
                    return;
                }
            },
            fnFinishCheck: function(){//보수보강 체크
                this.popMsg = '';
                this.signYn = false;
                if(this.crckStatus == 'REDY'||this.crckStatus == 'REPR_NONE'||this.crckStatus =='NONE'){
                    // this.popMsg = '조사 결과가 입력되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('조사 결과가 입력되지 않았습니다.');
                    return;
                }
                if(this.crckStatus != 'RSCH' && this.crckStatus != 'REPR_REDY'){
                    // this.popMsg = '완료된 조사입니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('완료된 조사입니다.');
                    return;
                }
                // //console.log(this.popMsg);
                if(this.popMsg == ''){
                    this.popMsg = '완료하시겠습니까?';
                    // this.signYn = true;
                    // this.confirmUse = true;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.confirm('완료하시겠습니까?',this.fnFinish);
                }
            },
            fnFinish: async function(){//보수보강 완료버튼
                this.signYn =false;//초기화

                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth() +1;
                let date = today.getDate();
                let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);

                let param3 ={
                    'siteMstrId':this.siteMstrId,
                    'crckMngtInfoId':this.crckMngtInfoId,
                    'progressOrder':'REPR',
                    'afterOrder':'4TH',
                    'crckStatus':'REDY',
                    'startDate2':dateFormat,
                };

                try{
                    const rst3 = await API.crack.setCrackInfo(param3,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    if(rst3.data.rCode == '0000'){
                        this.crckMngtDtlIds = [];
                        this.alert('완료되었습니다.',this.sheetLoad);
                        // this.popMsg = '완료되었습니다.';
                        // this.confirmUse = false;
                        // this.insertSignYn = true;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                    }else{
                        // this.popMsg = '완료에 실패했습니다.';
                        // this.confirmUse = false;
                        // this.insertSignYn = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('완료에 실패했습니다.');
                        return;
                    }
                }catch(error){
                    // this.popMsg = '완료에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('완료에 실패했습니다.');
                    return;
                }
            },
            insertSign: function(){//결재상신체크
                this.popMsg = '';
                this.signYn = false;
                if(this.crckStatus == 'REDY'||this.crckStatus == 'REPR_NONE'||this.crckStatus =='NONE'){
                    // this.popMsg = '조사 결과가 입력되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('조사 결과가 입력되지 않았습니다.');
                    return;
                }
                if(this.crckStatus != 'RSCH' && this.crckStatus != 'REPR_REDY'){
                    // this.popMsg = '결재중이거나 완료된 조사입니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('결재중이거나 완료된 조사입니다.');
                    return;
                }
                // //console.log(this.popMsg);
                if(this.popMsg == ''){
                    this.approve.mainCodeId     = '';
                    this.approve.midCodeId      = '';
                    this.approve.docSeq         = this.docSeq;
                    this.approve.siteMstrId     = this.siteMstrId ? this.siteMstrId : null;

                    this.approve.requestId      = this.crckMngtInfoId;
                    this.approve.fileType       = 'CrackMngt';
                    // temporary
                    this.approve.docName        = '균열관리';
                    this.$bvModal.show('crackWriteApproveModal');
                    // this.popMsg = '결재상신하시겠습니까?';
                    // this.signYn = true;
                    // this.confirmUse = true;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                }
            },
            fn_setApproval: function () {
                this.signYn =false;//초기화

                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth() +1;
                let date = today.getDate();
                let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);

                const urls = {
                    docSeq: '/sendApi/api/docNum/selectDocNumSeq',
                    approveDoc: '/sendApi/api/approv/approvedDoc/write',
                    setCrackInfo: '/sendApi/api/quality/crackMngt/info/change',
                }
                const payload = {
                    siteMstrId: this.siteMstrId,
                    codeType: 'CRCK',
                    codeDtlType: 'CRCK',
                    gjmcd: '',
                    gjscd: '',
                    aprvOptnType: this.aprvOptnType,
                    docType: 'CRCK',
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
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
                                    urls.setCrackInfo,
                                    {
                                        ...payload,
                                        docSeq: this.docSeq,
                                        ...aprvRes.data.datas.dmApprvDoc,
                                        //
                                        crckMngtInfoId : this.crckMngtInfoId,
                                        // crckStatus : (this.progressOrder == '4TH'?'END':(this.progressOrder == '3RD'?'REPR_NONE':'REDY')),
                                        crckStatus : 'APVL',
                                        progressOrder : this.progressOrder,
                                        startDate2: dateFormat,
                                        crckMngtDtlIds: this.crckMngtDtlIds,
                                    },
                                    options                                    
                                    )
                                    .then(setCrackInfoRes => {
                                        
                                        //console.log(setCrackInfoRes)
                                        
                                        // this.popMsg = '결재상신되었습니다.';
                                        // this.confirmUse = false;
                                        // this.insertSignYn = true;
                                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                                        this.crckMngtDtlIds = [];
                                        this.alert('결재가 상신되었습니다.',this.sheetLoad());
                                        return;
                                    })
                                    .catch(error => {
                                        //console.error(error)

                                        // this.popMsg = '결재 상신에 실패했습니다.';
                                        // this.confirmUse = false;
                                        // this.insertSignYn = false;
                                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                                        this.alert('결재 상신에 실패했습니다.');
                                        return;
                                    })

                            })
                            .catch(error => {
                                // throw new Error(error)
                                //console.error(error)

                                // this.popMsg = '결재 상신에 실패했습니다.';
                                // this.confirmUse = false;
                                // this.insertSignYn = false;
                                // this.$root.$emit('bv::show::modal', 'writeAlert');
                                this.alert('결재상신에 실패했습니다.');
                                return;
                            })
            },
            fn_setSourceApproval: function (payload) {
                //console.log(payload)
                this.signYn =false;//초기화

                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth() +1;
                let date = today.getDate();
                let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);

                const url = '/sendApi/api/quality/crackMngt/info/change';
                const _payload = {
                    ...payload,
                    crckMngtInfoId: this.crckMngtInfoId,
                    // crckStatus : (this.progressOrder == '4TH'?'END':(this.progressOrder == '3RD'?'REPR_NONE':'REDY')),
                    crckStatus : 'APVL',
                    progressOrder : this.progressOrder,
                    startDate2: dateFormat,
                    crckMngtDtlIds: this.crckMngtDtlIds,
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
                // //console.log('payload',_payload);

                axios.post(url, _payload, options)
                .then(res => {
                    //console.log(res)
                                        
                    this.crckMngtDtlIds = [];
                    // this.popMsg = ' 결재가 상신되었습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = true;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('결재가 상신되었습니다.',this.sheetLoad());
                    return;
                })
                .catch(error => {
                    //console.error(error)
                    
                    // this.popMsg = '결재 상신에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('결재 상신에 실패했습니다.');
                    return;
                })
            },
            fnChange:function(evt){ // 균열폭 / 균열 길이 유효성 체크
                if(evt.col == 'crackWidth' || evt.col == 'crackLength'){
                    let replaceVal = evt.val.toString().replaceAll('.','').replaceAll(',','')

                    if(isNaN(replaceVal) || replaceVal == '' || replaceVal < 0){
                        evt.row[evt.col] = ''
                    }else{
                        let val = evt.val.toString().replaceAll(',','')

                        if(replaceVal.length > 4){ 
                            val = evt.val.toString().slice(0, -1)
                            evt.row[evt.col] = parseFloat(val).toLocaleString('en')
                        }else{
                            evt.row[evt.col] = parseFloat(val).toLocaleString('en')
                        }
                    }
                    evt.sheet.refreshRow(evt.row);
                }
            },
            fnClick:function(evt){//아이비시트 클릭
                // console.log(evt.row)
                if(evt.kind == "Header"){
                    return
                }

                this.fileObj = {};

                if(evt.sheet.getFocusedCol() == 'fileYn' && (evt.row.fileYn).toString() != ''){
                    this.selectedSheet = evt.sheet;
                    this.selectedRow = evt.row;
                    let writeYn = false;
                    if((this.progressOrder==evt.row.testOrder)&&(this.crckStatus!='APVL'&&this.crckStatus!='END')){
                        writeYn = true;
                    }
                    this.fileObj = {
                        'fileConnectId':this.crckMngtInfoId+'_'+evt.row.crckMngtDtlId,
                        'img':evt.row['img'],
                        'lstImgRst':evt.row['lstImgRst'],
                        'copiedFileIds':evt.row['copiedFileIds'],
                        'copiedFiles':evt.row['copiedFiles'],
                        // 'secondRemoveImgId':evt.row['secondRemoveImgId'],
                        'writeYn':writeYn,
                    }
                    // console.log('fileObj',this.fileObj);
                    //console.log(this.fileObj);
                    if(evt.row.crckMngtDtlId != 'crckMngtDtlId'){
                        this.$root.$emit('bv::show::modal', 'CrackPhotoWritePop');
                    }
                    return;
                }
                
                if(evt.sheet.getFocusedCol() == 'qr' && evt.row.qr == '0'){
                    this.qrCodeBtnDtl(evt.row.crckMngtDtlId);
                    return;
                }
            },
            fnClick2:function(type,row){//표 클릭
                // //console.log(row);
                // //console.log('dd');
                let writeYn = false;
                if(type == 'file'){
                    if((this.progressOrder==row.testOrder)&&(this.crckStatus!='APVL'&&this.crckStatus!='NONE'&&this.crckStatus!='END')){
                        writeYn = true;
                    }
                    this.fileObj = {
                        'fileConnectId':this.crckMngtInfoId+'_'+row.crckMngtDtlId,
                        'img':row['img'],
                        'lstImgRst':row['lstImgRst'],
                        'copiedFileIds':row['copiedFileIds'],
                        'copiedFiles':row['copiedFiles'],
                        // 'secondRemoveImgId':row['secondRemoveImgId'],
                        'writeYn':writeYn,
                    }
                    // //console.log(this.fileObj);
                    this.reprFileYn = true;
                    this.selectedRow = row;
                    this.$root.$emit('bv::show::modal', 'CrackPhotoWritePop');
                    return;
                }else{
                    // //console.log(row);
                    this.qrCodeBtnDtl(row.crckMngtDtlId);
                    return;
                }
            },
            fileInsert: function(insertFile){
                console.log(insertFile);
                this.selectedRow['img'] = insertFile.img;
                this.selectedRow['copiedFileIds'] = insertFile.copiedFileIds;
                this.selectedRow['copiedFiles'] = insertFile.copiedFiles;
                let array = [];
                if(typeof(this.selectedRow['secondRemoveImgId'])=='undefined' || this.selectedRow['secondRemoveImgId'].length==0){
                    this.selectedRow['secondRemoveImgId'] = [];
                }
                if(typeof(insertFile.secondRemoveImgId)=='undefined' || insertFile.secondRemoveImgId.length==0){
                    insertFile.secondRemoveImgId = [];
                }
                array = this.selectedRow['secondRemoveImgId'].concat(insertFile.secondRemoveImgId);
                
                for(let x = 0; x<array.length;x++){
                    if(typeof(insertFile.lstImgRst)!='undefined' && insertFile.lstImgRst.length>0 && insertFile.lstImgRst.includes(array[x])){
                        let num = insertFile.lstImgRst.indexOf(array[x]);
                        insertFile.lstImgRst.splice(num,1);
                    }
                }
                this.selectedRow['secondRemoveImgId'] = array;
                this.selectedRow['lstImgRst'] = insertFile.lstImgRst;
                if(insertFile.lstImgRst.length>0 || insertFile.img.length>0 || insertFile.copiedFileIds.length>0){
                    this.selectedRow['fileYn'] = '1';
                }else{
                    this.selectedRow['fileYn'] = '0';
                }
                //console.log(array);
                if(!this.reprFileYn){
                    this.selectedSheet.refreshRow(this.selectedRow);
                    this.selectedSheet = null;
                }
                //console.log(this.selectedRow);
                this.$root.$emit('bv::hide::modal', 'CrackPhotoWritePop');
                this.selectedRow = null;
                this.fileObj= null;
                this.reprFileYn = false;
            },
            // fstFnClick: function(evt){
            //     if(evt.sheet.getFocusedCol() == 'checkYn'){
            //         if(evt.row.Kind == 'Header'){//Header일때
            //             this.selectIds = [];
            //             if(evt.row.checkYnChecked == true){//모두체크시
            //                 let rows = this.sheet1.getDataRows();
            //                 for(let i = 1; i<=rows.length;i++){
            //                     let id = this.sheet1.getRowByIndex(i).crckMngtDtlId;
            //                     if(id !='' && id != null){
            //                         this.selectIds.push(id);
            //                     }
            //                 }
            //             }
            //         }else{
            //             let id = evt.row.crckMngtDtlId;
            //             if(evt.row.checkYnChecked == true){
            //                 this.selectIds.push(id);
            //                 // //console.log(this.selectIds);
            //             }else{
            //                 let idx = this.selectIds.indexOf(id);
            //                 // //console.log(idx);
            //                 if(idx != -1){
            //                     this.selectIds.splice(idx,1);
            //                 }
            //             }
            //         }
            //     }
            // },
            delRow: function(){ //행삭제
                if(this.crckYn == 'Y'){
                    let rows = this.sheet1.getRowsByChecked("checkYn");
                    if(rows == []||rows.length == 0){
                        // this.confirmUse = false;
                        // this.popMsg = '선택된 행이 없습니다.';
                        // this.$root.$emit('bv::show::modal', 'writeAlert');      
                        this.alert('선택된 행이 없습니다.');       
                        return; 
                    }else{
                        for(let i =0; i< rows.length; i++){
                            let id = rows[i].crckMngtDtlId;
                            if(id != '' && id != null){
                                this.crckMngtDtlIds.push(id);
                            }
                        }
                        this.sheet1.removeRows(rows);
                        // //console.log(this.crckMngtDtlIds);
                    }
                }
            },
            copyRow: function(){    //행복사
                if(this.crckYn == 'Y'){
                    let rows = this.sheet1.getRowsByChecked("checkYn");
                    // //console.log(this.sheet1.getRowsByChecked("checkYn"));
                    if(rows == []||rows.length == 0){
                        // this.confirmUse = false;
                        // this.popMsg = '선택된 행이 없습니다.';
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('선택된 행이 없습니다.');   
                        return;
                    }else{
                        // this.sheet1.copyRows({rows:rows,next:this.sheet1.getFirstRow()});
                        for(let i = 0;i <rows.length; i++){
                            let focusRow = rows[i];
                            let idx = this.sheet1.getRowIndex(focusRow)+1;
                            this.sheet1.copyRow({row:focusRow,next:this.sheet1.getNextRow(focusRow)});
                            let selectRow = this.sheet1.getRowByIndex(idx);
                            selectRow['checkYn'] = 0;
                            selectRow['crckMngtDtlId'] = '';
                            this.sheet1.refreshRow(selectRow);
                        }
                    }   
                }
            },
            addRow:function(){  //행추가
                if(this.crckYn == 'Y'){

                    let today = new Date();
                    let year = today.getFullYear();
                    let month = today.getMonth() +1;
                    let date = today.getDate();
                    let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);
                    let index = this.sheet1.getDataRows().length;
                    this.sheet1.addRows({"count":this.addIdx,"next":this.sheet1.getRowByIndex(index+1)});

                    for(let i = 1; i<= this.addIdx;i++){
                        let selectRow = this.sheet1.getRowByIndex(index+i);
                        //console.log(index);
                        //console.log(index+i);
                        // //console.log(selectRow);
                        selectRow['startDate']=IBSheet.stringToDate(dateFormat,'yyyy-MM-dd');
                        // selectRow['ivtgAprvYn'] = '-';
                        // selectRow['sptdAprvYn'] = '-';
                        selectRow['fileYn'] = '0';
                        selectRow['qr'] = '1';
                        selectRow['checkYn'] = 0;
                        selectRow['status'] = 'add';
                        selectRow['testOrder']='1ST';
                        
                        this.sheet1.refreshRow(selectRow);
                        // console.log(selectRow.startDate);
                    }
                    this.mergeRange();
                    // this.sheet1.refreshPage({page:this.sheet1.getFocusedPage()});
                }
            },
            mergeRange:function(){
                if(this.crckYn == 'Y'){
                    let first = this.sheet1.getFirstRow();
                    let last = this.sheet1.getLastRow();
                    // this.sheet1.setMergeRange(first,'ivtgAprvYn',last,'ivtgAprvYn');
                    // this.sheet1.setMergeRange(first,'sptdAprvYn',last,'sptdAprvYn');
                }
            },
            sameDate: function(){//보수기간 동일버튼
                //console.log(this.data4);
                let sDate = this.data4[0].date[0];
                let eDate = this.data4[0].date[1];
                //console.log(sDate+eDate);
                for(let x= 0; x<this.data4.length;x++){
                    this.data4[x]['startDate']=sDate;
                    this.data4[x]['endDate']=eDate;
                    this.data4[x]['date']=[this.data4[x]['startDate'],this.data4[x]['endDate']];
                }
            },
            sameTrade: function(){//보수업체 동일버튼
                let id = this.data4[0].tradeId;
                let nm = this.data4[0].tradeNm;
                for(let x= 0; x<this.data4.length;x++){
                    this.data4[x]['tradeId']=id;
                    this.data4[x]['tradeNm']=nm;
                }
            },
            // dateRangeChange: function(param){//기간 변경
            //     // //console.log(this.dateIdx);
            //     this.data4[this.dateIdx]['startDate'] = param[0];
            //     this.data4[this.dateIdx]['endDate'] = param[1];
            //     // //console.log(this.data4[this.dateIdx]['startDate']+","+this.data4[this.dateIdx]['endDate']);
            // },
            // dateRangeReset: function(param){//기간 초기화
            //     let id = 'datepickerRange_'+index
            //     this.data4[index]['startDate'] = null;
            //     this.data4[index]['endDate'] = null;
            //     // this.startDate = null;
            //     // this.endDate = null;
            //     this.$refs.id.valueReset(); //DatepickerRange valueReset 함수 호출
            // },
            openPop: function(idx){
                this.tradeIdx = idx;
                this.$root.$emit('bv::show::modal', 'PartnerCompanySearch');
            },
            companyChoice : function(infoCompany){ //협력사 검색 후 event
                this.data4[this.tradeIdx]['tradeId'] = infoCompany.tradeId;
                this.data4[this.tradeIdx]['tradeNm'] = infoCompany.tradeNm;
            },
            // hideRow: function(){
            //     if(this.crckYn == 'N'){
            //         let rows = 3;
            //         if(this.sheet1 != null){
            //             rows = this.sheet1.getDataRows().length;
            //         }
            //         for(let i = 1; i<=rows; i++){//감추기
            //             let row = this.sheet1.getRowByIndex(i);
            //             this.sheet1.hideRow({'row':row,'norender':1});
            //         }
            //         this.sheet1.renderBody();
            //     }
            // },
            goList : function(){//목록버튼
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name: 'CrackList'});
            },
            confirmBtn: function(){//알림창 확인버튼
                //console.log(0);
                if(this.signYn && this.progressOrder != 'REPR'){
                    //console.log(1);
                    // this.finalSign();
                    this.fn_setApproval()
                    this.$root.$emit('bv::hide::modal', 'writeAlert');
                    return;
                }
                if(this.signYn && this.progressOrder == 'REPR'){
                    //console.log(2);
                    this.fnFinish();
                    this.$root.$emit('bv::hide::modal', 'writeAlert');
                    return;
                }
                // if((this.writeCheckYn||this.insertSignYn) && this.crckYn == 'Y' && this.crckStatus != 'NONE'){
                if((this.writeCheckYn||this.insertSignYn) && this.crckYn == 'Y'){
                    this.writeCheckYn = false;
                    this.insertSignYn = false;
                    //console.log(3);
                    this.sheetLoad();
                    this.$root.$emit('bv::hide::modal', 'writeAlert');
                    return;
                // }else if((this.writeCheckYn||this.insertSignYn) && this.crckYn == 'N' && this.crckStatus == 'NONE'){
                }
                if((this.writeCheckYn||this.insertSignYn) && this.crckYn == 'N'){
                    //console.log(4);
                    // this.$router.push({name: 'CrackList'});
                    this.sheetLoad();
                    this.$root.$emit('bv::hide::modal', 'writeAlert');
                    return;
                }
                if(this.writeCheckYn||this.insertSignYn){
                    //console.log(5);
                    this.writeCheckYn = false;
                    this.insertSignYn = false;
                    this.sheetLoad();
                    this.$root.$emit('bv::hide::modal', 'writeAlert');
                    return;
                }
                this.$root.$emit('bv::hide::modal', 'writeAlert');
                return;
            },
            closePop: function(){//알림창 닫기버튼
                this.$root.$emit('bv::hide::modal', 'writeAlert');
            },
            tabClick: function(index){//탭클릭시
                if(index<=this.disableIndex){
                    this.currentTab = index;
                }
            },
            qrCodeBtn() {
                const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][35].jspNm
                + '&siteMstrId=' + this.siteMstrId
                + '&crckMngtInfoId=' + this.crckMngtInfoId
                + '&crckMngtDtlId=' + ''
                //console.log(this.ozReport)
                window.open(this.ozReport.src, '_blank')

            },
            qrCodeBtnDtl(crckMngtDtlId) {
                const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][36].jspNm
                + '&siteMstrId=' + this.siteMstrId
                + '&crckMngtInfoId=' + this.crckMngtInfoId
                + '&crckMngtDtlId=' + crckMngtDtlId
                //console.log(this.ozReport)
                window.open(this.ozReport.src, '_blank')

            },
            viewAprv:function(){
                this.$root.$emit('bv::show::modal', 'CrackInfoWrite_AprvView');
            }
        }
    }
</script>