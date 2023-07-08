<template>
    <section id="ExtCheckMngtDscnView" class="tab_contents">
        <div class="tab_area">
            <div class="inner type2">
                <h2 class="sub_title">
                    {{'대외 점검 관리 > 확정공문 작성'}}
                    <div class="fr" v-if="(editYn==true)">
                        <button
                            type="button"
                            class="btn btn_md btn_outline btn_darkgray"
                            :disabled="false"
                            :class="{disabled: dmExtrnChckInfo.finlCmpltYn === 'Y'}"
                            @click="fnSave()"
                        >
                            {{'저장'}}
                        </button>
                        <button v-if="step == 'POUT'"
                            type="button"
                            class="btn btn_md btn_outline btn_darkgray"
                            @click="$router.push({ name: 'ExtCheckMngtSheet'})"
                        >
                            {{'목록'}}
                        </button>
                        <button v-else
                            type="button"
                            class="btn btn_md btn_outline btn_darkgray"
                            @click=" editYn = false , fn_fetchAdvancedInfo() "
                        >
                            {{'취소'}}
                        </button>
                    </div>
                    <div class="fr" v-else>
                        <button
                            type="button"
                            class="btn btn_md btn_outline btn_darkgray"
                            :class="{disabled: dmExtrnChckInfo.finlCmpltYn === 'Y' || step == 'LAST' }"
                            @click="editYn=true;"
                        >
                            <!-- :class="{disabled: defaultInfo.dmExtrnChckInfo.finlCmpltYn === 'Y' || step == 'LAST' }" -->
                            <!-- :class="step == 'LAST' ? 'disabled' : ''" -->
                            {{'수정'}}
                        </button>
                        <button
                            type="button"
                            class="btn btn_md btn_outline btn_darkgray"
                            @click="$router.push({ name: 'ExtCheckMngtSheet'})"
                        >
                            {{'목록'}}
                        </button>
                    </div>

                </h2>
                <!-- prevent -->
                <div class="lst_tabs_round single">
                    <ul v-if="editYn && show">
                        <li :class="{active : allDcsnOfldcYn == 'Y'}" @click="fn_allDcsnOfldcYn('Y')">
                            <a href="javascript:void(0);">{{'전체 확정공문 있음'}}</a>
                        </li>
                        <li :class="{active : allDcsnOfldcYn == 'N'}" @click="fn_allDcsnOfldcYn('N')">
                            <a href="javascript:void(0);">{{'전체 확정공문 없음'}}</a>
                        </li>
                    </ul>
                </div>

                <div class="button_box mt10">
                    <strong>1. 확정공문</strong>
                </div>

                <div class="table_normal_list" :class="{ 'table_write': true }">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="7%">
                            <col width="15%">
                            <col width="*">
                            <col width="15%">
                            <col width="*">
                        </colgroup>
                        <thead>
                            <tr>
                                <th class="ac"> NO </th>
                                <th colspan="4"> {{'지적사항 상세 내역'}} </th>
                            </tr>
                        </thead>
                        <tbody v-for="(poutDtl, index) in dcsnDetail.dlDcsnResult" :key="index">
                            <tr>
                                <td rowspan="12" class="ac"> {{ index+1 }} </td>
                                <th> {{'지적사항'}} </th>
                                <!-- <td colspan="3">
                                    {{ `${poutDtl.poutMatterTypeNm}` + (poutDtl.dem ? `/ ${poutDtl.dem}` : ``) }}
                                </td> -->
                                <td>
                                    {{ poutDtl.poutMatterTypeNm}}
                                </td>
                                <th> {{'벌점'}} </th>
                                <td>
                                    {{ poutDtl.dem}}
                                </td>
                            </tr>     
                            <tr>
                                <th> {{'분야/대상 공종'}} </th>
                                <td colspan="3">
                                    <!-- {{`${poutDtl.cntrwkKndNm} / ${poutDtl.cntrwkKndDtlNm}` }} -->
                                    {{poutDtl.cntrwkKndNm}} <s>/</s> {{poutDtl.cntrwkKndDtlNm}}
                                </td>
                            </tr>  
                            <tr>
                                <th> {{'점검자'}} </th>
                                <td>
                                    {{poutDtl.insctrNm}}
                                </td>
                                <th> {{'확인서 작성 여부'}} </th>
                                <td>
                                    {{ poutDtl.cnfrmnWritngYn === 'Y' ? 'YES' : 'NO' }}
                                </td>
                            </tr>
                            <tr>
                                <th> {{'제목'}} </th>
                                <td colspan="3">
                                    {{ poutDtl.title }}
                                </td>
                            </tr>  
                            <tr>
                                <th> {{'상세 내용'}} </th>
                                <td colspan="3">
                                    <pre class="form_control">{{poutDtl.chckPoutMatterCn}}</pre>
                                </td>
                            </tr>
                            <tr>
                                <th> {{'조치 사항'}} </th>
                                <td colspan="3">
                                    <pre class="form_control">{{poutDtl.chckManagtCn}}</pre>
                                </td>
                            </tr>
                            <tr>
                                <th> {{'조치 전 사진'}} </th>
                                <td colspan="3">
                                    <LstImg
                                        :lst-file-rst="poutDtl.poutList" 
                                        :uploadable="false"
                                        :copyable="false"
                                        :downloadable="!editYn"
                                        countable
                                        :file-type="'extCheckMngtDcsnQltyPicturePop'"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th> {{'조치 후 사진'}} </th>
                                <td colspan="3">
                                    <LstImg
                                        :lst-file-rst="poutDtl.rsltList" 
                                        :uploadable="false"
                                        :copyable="false"
                                        :downloadable="!editYn"
                                        countable
                                        :file-type="'extCheckMngtDcsnQltyPicturePop2'"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th><span :class="{'emp_red':fn_disabled()}">{{'확정공문 여부'}}</span></th>
                                <td v-if="editYn" colspan="3">
                                    <label class="input_radio" :for="`dcsnOfldcYn_${index}_Y`">
                                        <input type="radio" value="Y" :id="`dcsnOfldcYn_${index}_Y`" v-model="poutDtl.dcsnOfldcYn">
                                        <span class="label_text">{{'확정공문 있음'}}</span>
                                    </label>
                                    <label class="input_radio" :for="`dcsnOfldcYn_${index}_N`" @click="poutDtl.poutType=null">
                                        <input type="radio" value="N" :id="`dcsnOfldcYn_${index}_N`" v-model="poutDtl.dcsnOfldcYn">
                                        <span class="label_text">{{'확정공문 없음'}}</span>
                                    </label>
                                </td>
                                <td v-else colspan="3">
                                    {{poutDtl.dcsnOfldcYn == 'Y' ? '확정공문 있음' : '확정공문 없음'}}
                                </td>
                            </tr>
                            <template v-if="editYn">
                                <tr>
                                    <th><span :class="{'emp_red':fn_disabled()}">{{'지적 유형'}}</span></th>
                                    <td>
                                        <select class="form_control" v-model="poutDtl.poutType" :disabled="poutDtl.dcsnOfldcYn=='N'">
                                            <option value="" disabled> {{'선택'}} </option>
                                            <option value="P01" > {{'시정명령'}} </option>
                                            <option value="P02" > {{'현지시정'}} </option>
                                            <option value="P03" > {{'주의'}} </option>
                                        </select>
                                    </td>
                                    
                                    <th><span :class="{'emp_red':fn_disabled()}"> {{'수신 날짜'}}</span></th>
                                    <td>
                                        <datepicker
                                            :input-style="{ 'max-width': '100%'}"
                                            :disabled="poutDtl.dcsnOfldcYn=='N'"
                                            v-model="poutDtl.dcsnDocRecptnDe"
                                            format="YYYYMMDD"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><span :class="{'emp_red':fn_disabled()}">{{'벌점 (확정공문)'}}</span></th>
                                    <td>
                                        <input type="number" class="form_control w50 fl" v-model="poutDtl.dcsnDocDem" :disabled="poutDtl.dcsnDocDemYn == 'N' || poutDtl.dcsnOfldcYn=='N'" max="99" min="0" @keyup="poutDtl.dcsnDocDem >= 100 ? poutDtl.dcsnDocDem = 99 : (poutDtl.dcsnDocDem <= 0 ? poutDtl.dcsnDocDem = 0 : poutDtl.dcsnDocDem )">
                                        <!-- <b-form-input type="number" class="form_control w50 fl" v-model.number="poutDtl.dcsnDocDem" :disabled="poutDtl.dcsnDocDemYn == 'N' || poutDtl.dcsnOfldcYn=='N'" max="9" min="0"  /> -->
                                        <label class="input_check">
                                            <input type="checkbox" v-model="poutDtl.dcsnDocDemYn" true-value="N" false-value="Y" :disabled="poutDtl.dcsnOfldcYn=='N'"  >
                                            <span class="label_text">{{'N/A'}} </span> 
                                        </label>
                                    </td>
                                    <th><span :class="{'emp_red':fn_disabled()}">{{'조치 대상'}}</span></th>
                                    <td v-if="editYn">
                                        <label class="input_radio">
                                            <input type="radio" value="H"  v-model="poutDtl.dcsnResultManagtTrget" :disabled="poutDtl.dcsnOfldcYn=='N'">
                                            <span class="label_text">{{'HEC'}}</span>
                                        </label>
                                        <label class="input_radio">
                                            <input type="radio" value="O"  v-model="poutDtl.dcsnResultManagtTrget" :disabled="poutDtl.dcsnOfldcYn=='N'">
                                            <span class="label_text">{{'공동도급사'}}</span>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span :class="{'emp_red':fn_disabled()}">{{'조치 내용'}}</span></th> 
                                    <td colspan="3">
                                        <textarea
                                            class="form_control"
                                            v-model="poutDtl.dcsnResultManagtCn"
                                            :disabled="poutDtl.dcsnOfldcYn=='N'"
                                            maxlength="1000"
                                        />
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <th><span :class="{'emp_red':fn_disabled()}">{{'지적 유형'}}</span></th>
                                    <td>{{poutDtl.dcsnOfldcYn == 'Y' ? poutDtl.poutTypeNm : '-'}} </td> 
                                    <th> {{'수신 날짜'}}</th>
                                    <td>{{poutDtl.dcsnOfldcYn == 'Y' ? poutDtl.dcsnDocRecptnDe : '-' }}</td>
                                </tr>
                                <tr>
                                    <th><span :class="{'emp_red':fn_disabled()}">{{'벌점 (확정공문)'}}</span></th>
                                    <td>{{poutDtl.dcsnOfldcYn == 'Y' ? poutDtl.dcsnDocDemYn == 'N' ? 'N/A' : poutDtl.dcsnDocDem : '-'}}</td>
                                    <th><span :class="{'emp_red':fn_disabled()}">{{'조치 대상'}}</span></th>
                                    <td>{{poutDtl.dcsnOfldcYn == 'Y' ? poutDtl.dcsnResultManagtTrgetNm : '-'}}</td>
                                </tr>
                                <tr>
                                    <th><span :class="{'emp_red':fn_disabled()}">{{'조치 내용'}}</span></th> 
                                    <td colspan="3" style="word-break:break-all">
                                        {{poutDtl.dcsnResultManagtCn ? poutDtl.dcsnResultManagtCn : '-'}}
                                    </td>
                                </tr>
                            </template>
                            
                        </tbody>
                    </table>
                </div>

                <p class="table_message mt20">※ 확인서를 포함한 관련 자료입니다.</p>
                <!-- <div class="lst_file w100">
                </div> -->
                <LstFile    
                    v-bind:lst-file-rst="lstFileRst.Pout"
                    :uploadable="false"
                    :downloadable="!editYn" 
                    ref="LstFile"
                />

                <p class="table_message mt30">※ 확정공문을 포함한 관련 자료를 등록해주세요.</p>
                <LstFile    
                    v-bind:lst-file-rst="lstFileRst.DCSN"
                    v-bind:files="files.DCSN"
                    v-bind:second-remove-file-id="secondRemoveFileId.DCSN"
                    v-on:file-changed="fileChanged($event,'DCSN')"
                    v-on:file-removed="fileRemoved($event,'DCSN')"
                    :uploadable="editYn"
                    :downloadable="!editYn"
                    :limit-total-file-size="1024*1024*300"
                    ref="LstFile"
                />
                    <!-- :limit-file-count="20" -->
                
                <div class="button_box mt30">
                    <strong>2. 심의위원회</strong>
                </div>
                
                <div class="table_normal_list table_write w50">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="15%">
                            <col width="20%">
                        </colgroup>
                        <tbody>   
                            <tr>
                                <th><span class="emp_red">진행 여부</span></th>
                                <td v-if="editYn">
                                    <select class="form_control" v-model="dcsnDetail.dmExtrnChckInfo.resultDlbrtCmitYn">
                                        <option value="" disabled> {{'선택'}} </option>
                                        <option value="Y" > {{'진행'}} </option>
                                        <option value="N" > {{'미진행'}} </option>
                                    </select>
                                </td>
                                <td v-else>
                                    {{dcsnDetail.dmExtrnChckInfo.resultDlbrtCmitYn === 'Y' ? '진행' : '미진행' }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box mt30">
                    <strong>3. 지원요청서</strong>
                    <div class="fr">
                        <div class="lst_tabs_round single">
                            <!-- v-if="(progrsState == '대기중') && (dcsnDetail.dmExtrnChckInfo.resultSportRequstYn == 'N')" -->
                            <ul class="" v-if="editYn && (step === 'DCSN' ? dcsnDetail.dmExtrnChckInfo.resultSportRequstYn === 'N' : true)">
                                <li v-bind:class="{active:currentTabRound===0}"><a href="javascript:void(0);" v-on:click="fn_onSupportRequest">ON</a></li>
                                <li v-bind:class="{active:currentTabRound===1}"><a href="javascript:void(0);" v-on:click="sportCancel()">OFF</a></li>
                            </ul>
                            <ul class="" v-else>
                                <li v-for="(tab, index) in tabsRound" v-bind:class="{active:currentTabRound===index}" :key="index"><a style="cursor: default"  href="javascript:void(0);">{{tab}}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <b-overlay
                    :show="currentTabRound === 1"
                    :opacity="0.3"
                    :variant="'dark'"
                    spinner-type="none"
                >
                    <!-- <template #overlay>
                        <div />
                    </template> -->
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="15%">
                                <col width="*">
                                <col width="15%">
                                <col width="*">
                            </colgroup>
                            <tbody v-if="editYn">
                                <tr>
                                    <th>요청자</th>
                                    <td>{{dcsnDetail.dmExtrnChckInfo.resultSportRqesterNm}}</td>
                                    <th><span :class="{'emp_red':fn_disabled()}">수신자 (HEC)</span></th>
                                    <td>
                                        <div class="btn_wrap">
                                            <input type="text" id="" class="form_control" :value="(dcsnDetail.dmExtrnChckInfo.resultSportRcverId !== null && dcsnDetail.dmExtrnChckInfo.resultSportRcverNm  !== '') ? `${dcsnDetail.dmExtrnChckInfo.resultSportRecptnDeptNm} / ${dcsnDetail.dmExtrnChckInfo.resultSportRcverNm}` : ''" readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius"
                                            @click="$bvModal.show('ExtCheckMngtView_EmployeeSearch')"
                                            :disabled="(step === 'DCSN' ? dcsnDetail.dmExtrnChckInfo.resultSportRequstYn === 'Y' : false)"
                                            >검색</button>  
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span :class="{'emp_red':fn_disabled()}">제목</span></th>
                                    <td colspan="3"><input type="text" v-model="dcsnDetail.dmExtrnChckInfo.resultSportRequstTitle" class="form_control" :disabled="step === 'DCSN' ? dcsnDetail.dmExtrnChckInfo.resultSportRequstYn === 'Y' : false" maxlength="90"></td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td colspan="3"><textarea name="" id="" class="form_control" v-model="dcsnDetail.dmExtrnChckInfo.resultSportRequstCn" :disabled="step === 'DCSN' ? dcsnDetail.dmExtrnChckInfo.resultSportRequstYn === 'Y' : false" maxlength="1000"></textarea></td>
                                </tr>
                                    
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <th>요청자</th>
                                    <td>{{dcsnDetail.dmExtrnChckInfo.resultSportRqesterNm}}</td>
                                    <th><span :class="{'emp_red':fn_disabled()}">수신자 (HEC)</span></th>   
                                    <td>
                                        {{(dcsnDetail.dmExtrnChckInfo.resultSportRcverId !== null && dcsnDetail.dmExtrnChckInfo.resultSportRcverId  !== '') ? `${dcsnDetail.dmExtrnChckInfo.resultSportRecptnDeptNm} / ${dcsnDetail.dmExtrnChckInfo.resultSportRcverNm}` : '-'}}
                                    </td>
                                </tr>
                                <tr>
                                    <th><span :class="{'emp_red':fn_disabled()}">제목</span></th>
                                    <td colspan="3">
                                        {{dcsnDetail.dmExtrnChckInfo.resultSportRequstTitle ? dcsnDetail.dmExtrnChckInfo.resultSportRequstTitle : '-'}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td colspan="3">
                                        {{dcsnDetail.dmExtrnChckInfo.resultSportRequstCn ? dcsnDetail.dmExtrnChckInfo.resultSportRequstCn : '-'}}
                                    </td>
                                </tr>
                                    
                            </tbody>
                        </table>
                    </div>
                
                    <p class="table_message mt30">※ 지원 요청 관련 자료를 등록하여 주세요.</p>
                    <LstFile    
                        v-bind:lst-file-rst="lstFileRst.Rqest"
                        v-bind:files="files.Rqest"
                        v-bind:second-remove-file-id="secondRemoveFileId.Rqest"
                        v-on:file-changed="fileChanged($event,'Rqest')"
                        v-on:file-removed="fileRemoved($event,'Rqest')"
                        :uploadable="editYn && (step === 'DCSN' ? dcsnDetail.dmExtrnChckInfo.resultSportRequstYn === 'N' : true)"
                        :downloadable="!editYn"
                        ref="LstFile"
                    /> 
                </b-overlay>

                <employee-search
                    empl-pop-id="ExtCheckMngtView_EmployeeSearch"
                    :site-mstr-id="siteMstrId"
                    @fn-employee-choice="fn_setReceiver"
                />
            </div>
        </div>
    </section>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import Datepicker from '@component/common/DatePicker.vue'
import LstFile from '@/pages/common/popup/LstFile'
import LstImg from '@/pages/common/popup/LstImg.vue'
import { mapGetters } from 'vuex'
import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'
import { sendPostApi, sendFileApi, requestOptions, requestFileOptions } from '@/apis/common'
import { commonFn } from '@/script/commonFn.js'

import axios from 'axios'

export default {
    name: 'ExtCheckMngtDscnView',
    mixins: [MsgBoxMixins],
    components: {
        Datepicker,
        LstFile,
        LstImg,
        EmployeeSearch,
    },
    computed: {
        ...mapGetters({
            extrnlChckId: 'getExtCheckExtrnlChckId',
            siteMstrId:   'auth/getSiteMstrId',
            projectId:    'auth/getProjectId',
            projectNm:    'auth/getProjectNm',
        }),
    },
    mounted: function () {
        // this.pout.list.push({})
        this.fn_fetchAdvancedInfo()
    },
    created(){
        this.dcsnDetail.dlDcsnResult = {...this.defaultInfo.dlDcsnResult}
        this.dcsnDetail.dmExtrnChckInfo = {...this.dmExtrnChckInfo}
    },
    methods: {    
        fn_disabled: function () {
            return this.editYn
        },
        sportCancel() {
             this.confirm('지원 요청을 취소하시겠습니까?', () => {
                this.currentTabRound=1
             })
        },
        fileChanged(payload, type) {
            this.files[type] = payload
        },
        fileRemoved(id, type) {
            this.secondRemoveFileId[type] = id
        },
        fn_fileSize(data) {         // 파일 크기 계산
            this.totalCnt = 0;        // 총 파일 갯수
            this.totalSize = '0 KB';  // 총 파일 크기
            let inputFileSize = 0;

            if(data.length>0){
                for(let i = 0; i< data.length;i++){
                    this.totalCnt++;
                    inputFileSize += parseInt(data[i].fileSize); //총파일크기
                    data[i].fileSize = this.$refs.LstFile.formatBytes(parseInt(data[i].fileSize), 2) //각각의 파일크기
                    // data[i].fileSize = this.formatBytes(parseInt(data[i].fileSize), 2); 
                }
                if(inputFileSize > 0){
                    this.totalSize = this.$refs.LstFile.formatBytes(inputFileSize, 2)
                }
            }
        },
        fn_setReceiver: function (payload) {
            this.dcsnDetail.dmExtrnChckInfo.resultSportRcverId = payload.userId
            this.dcsnDetail.dmExtrnChckInfo.resultSportRcverNm = payload.userNm
            this.dcsnDetail.dmExtrnChckInfo.resultSportRecptnDeptCd = payload.workLocCd
            this.dcsnDetail.dmExtrnChckInfo.resultSportRecptnDeptNm = payload.workLocNm
            this.dcsnDetail.dmExtrnChckInfo.resultSportRcverRspofc = payload.jobTitle
        },
        fn_allDcsnOfldcYn(Yn){   // 확정공문 여부 전체 선택
            this.allDcsnOfldcYn = Yn
            this.dcsnDetail.dlDcsnResult.forEach(item => {
                item.dcsnOfldcYn = Yn       // 확정 공문 여부
                item.poutType = null          // 지적 유형 초기화    
                // item.dcsnDocDemYn = Yn == 'N' ? 'Y' : 'N'   // 벌점 N/A 여부
            })
        },
        async fn_fetchAdvancedInfo(){   // 리스트 조회
            this.show = false

            // 파일 초기화
            this.lstFileRst = {        // 파일 리스트   
                Pout : [],        // 확인서 파일
                DCSN : [],          // 확정공문 파일
                Rqest : [],         // 요청서 파일   
            }
            this.files = {             // 파일 변경 리스트(등록)
                Pout : [],        // 확인서 파일
                DCSN : [],          // 확정공문 파일
                Rqest : [],         // 요청서 파일   
            }
            this.secondRemoveFileId= {  // 파일 아이디 (삭제)
                Pout : [],        // 확인서 파일
                DCSN : [],          // 확정공문 파일
                Rqest : [],         // 요청서 파일   
            }

            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            const extrnInfo = {
                url: '/sendApi/api/extrnlChck/extrnlChckDcsnResult/view',   // 대외점검 확정결과 상세조회
                payload: {
                    extrnlChckId : this.extrnlChckId
                }
            }

            await sendPostApi(extrnInfo.url, extrnInfo.payload).then((result) => {
                let rstList = result.data
                rstList.dlDcsnResult  = rstList.dlDcsnResult.filter(item => item.cnfrmnWritngYn=='Y') // 확인서 작성 여부 N 제거 
                
                this.currentTabRound = rstList.dmExtrnChckInfo.resultSportRequstYn == 'Y' ? 0 : 1   // 지원요청 여부 on (0) / off(1) 
                // this.defaultInfo.dmExtrnChckInfo.finlCmpltYn  = rstList.dmExtrnChckInfo.finlCmpltYn ? rstList.dmExtrnChckInfo.finlCmpltYn : 'N'
                this.dmExtrnChckInfo.finlCmpltYn  = rstList.dmExtrnChckInfo.finlCmpltYn ? rstList.dmExtrnChckInfo.finlCmpltYn : 'N'
                
                // 진행상태
                if(!commonFn.methods.isEmpty(rstList.dmExtrnChckInfo.demLastDcsnYn)){       
                    this.editYn = false
                    this.step = 'LAST'  // 벌점 최종 확정
                }
                else if(commonFn.methods.isEmpty(rstList.dmExtrnChckInfo.resultSportRequstYn)){
                    this.editYn = true
                    // this.editable = 'EDITABLE'
                    rstList.dmExtrnChckInfo.resultDlbrtCmitYn = ''  // 심의 위원회 여부 초기값
                    rstList.dmExtrnChckInfo.resultSportRqesterId = this.$store.getters['auth/getUserId']
                    rstList.dmExtrnChckInfo.resultSportRqesterNm = this.$store.getters['auth/getUserNm']
                    this.step = 'POUT'  // 확정공문 등록 전
                }else{
                    this.editYn = false
                    this.step = 'DCSN'  // 확정공문 등록 후
                }

                // 첨부파일

                this.lstFileRst.Pout = [...rstList.dlPoutMatterFile]
                this.lstFileRst.DCSN = [...rstList.dlDcsnResultFile]
                this.lstFileRst.Rqest = [...rstList.dlSportReqstFile]

                // 지적사항 조치 전 / 후 사진 조회
                let chkIdx = rstList.dlDcsnResult.length   // 조치사항 개수
                rstList.dlDcsnResult.forEach((item, idx) => {
                    this.fn_getFiles(
                        item
                    , (rtnObj) => {
                        item['poutList'] = rtnObj.poutList
                        item['rsltList'] = rtnObj.rsltList
                        if(chkIdx === (idx + 1)){
                            this.dcsnDetail = {...result.data}
                            this.show = true
                        }
                    });
                })

            })
        },
        async fn_getFiles(item, callback) {   // 조치 전 / 후 파일 조회
                let url = '/sendApi/api/file/upFileList';
                let param = {
                    'pout' : { // 조치 전
                        'fileConnectId' : item.poutPhotoFileConnectId,
                        'fileType' : 'ExtCheck',
                    },
                    'rslt' : { // 조치 후
                        'fileConnectId' : item.rsltPhotoFileConnectId,   
                        'fileType' : 'ExtCheck',
                    }
                };
                let returnObj = {} 

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                await sendPostApi(url, param.pout).then(async poutRst =>{
                    if(poutRst.status == '200'){
                        await sendPostApi(url, param.rslt).then(rsltRst =>{
                            if(rsltRst.status == '200'){
                                returnObj['poutList'] = poutRst.data.data.length > 0 ? poutRst.data.data : []; // 조치 전 파일 리스트
                                returnObj['rsltList'] = rsltRst.data.data.length > 0 ? rsltRst.data.data : []; // 조치 후 파일 리스트
                                return callback(returnObj)
                            }else{
                                returnObj['rsltList'] = []
                                return callback(returnObj)
                            }
                        })
                    }else{   // 파일 조회 오류시
                        returnObj['poutList'] = []
                        returnObj['rsltList'] = []
                        return callback(returnObj)
                    }
                })
        },

        fnSave : async function() {
            let dcsnObj = {...this.dcsnDetail}
            let fileObj = {...this.files}

            const dscnCheck = dcsnObj.dlDcsnResult.some( (item, index) => {            // 지적사항 상세 내역
                
                 if(commonFn.methods.isEmpty(item.dcsnOfldcYn)){
                    this.alert("NO."+(index+1)+" 확정공문 여부를 선택해주세요")
                        return true
                 }

                if(item.dcsnOfldcYn == 'Y'){   // 확정공문 여부
                    if(commonFn.methods.isEmpty(item.poutType)){
                        this.alert("NO."+(index+1)+" 지적유형을 선택해주세요")
                        return true
                    }
                    if(commonFn.methods.isEmpty(item.dcsnDocRecptnDe)){
                        this.alert("NO."+(index+1)+" 수신 날짜를 선택해주세요")
                        return true
                    }
                    item.dcsnDocRecptnDe = item.dcsnDocRecptnDe.replaceAll('-','')
                    if((item.dcsnDocDemYn == 'Y')){   // 벌점 N/A 여부
                       if(commonFn.methods.isEmpty(item.dcsnDocDem)){
                            this.alert("NO."+(index+1)+" 벌점을 입력해주세요")
                            return true
                        }
                    }else{
                        item.dcsnDocDem = ''
                        item.dcsnDocDemYn = 'N'
                    }
                    if(commonFn.methods.isEmpty(item.dcsnResultManagtTrget)){
                        this.alert("NO."+(index+1)+" 조치대상을 선택해주세요")
                        return true
                    }
                    if(commonFn.methods.isEmpty(item.dcsnResultManagtCn)){
                        this.alert("NO."+(index+1)+" 조치내용을 입력해주세요")
                        return true
                    }
                }
            })
                
            if(dscnCheck){
                return
            }

            if(commonFn.methods.isEmpty(dcsnObj.dmExtrnChckInfo.resultDlbrtCmitYn)){       // 심의 위원회
                this.alert("심의위원회 진행여부를 선택해주세요")
                return
            }

            if(this.currentTabRound == 0){                                                 // 지원 요청시
                if(commonFn.methods.isEmpty(dcsnObj.dmExtrnChckInfo.resultSportRcverNm)){
                    this.alert("지원요청서 수신자를 선택해주세요")
                    return
                }
                if(commonFn.methods.isEmpty(dcsnObj.dmExtrnChckInfo.resultSportRequstTitle)){
                    this.alert("지원요청서 제목을 입력해주세요")
                    return
                }
            }else{
                fileObj.Rqest = []   // 지원요청여부 N 일경우 파일 등록 x
            }



            dcsnObj.dmExtrnChckInfo.resultSportRequstYn = this.currentTabRound == 0 ? "Y" : "N"   // 지원서 작성 여부
            this.confirm('저장하시겠습니까?', async() => {
                dcsnObj.dmExtrnChckInfo.dcsnFileConnectId   = 'DSN_'+dcsnObj.dmExtrnChckInfo.extrnlChckId     // 확정공문 첨부파일 ID
                dcsnObj.dmExtrnChckInfo.requstFileConnectId = 'REQ_'+dcsnObj.dmExtrnChckInfo.extrnlChckId     // 확정공문 지원요청 첨부파일 ID
                dcsnObj.dmExtrnChckInfo.dlbrtFileConnectId = 'DLB_'+dcsnObj.dmExtrnChckInfo.extrnlChckId    // 심의위원회 첨부파일 ID
                
                // 날짜 포맷 수정 
                dcsnObj.dmExtrnChckInfo.chckPlanBgnde = dcsnObj.dmExtrnChckInfo.chckPlanBgnde ? dcsnObj.dmExtrnChckInfo.chckPlanBgnde.replaceAll('-','') : ''            // 점검계획시작일
                dcsnObj.dmExtrnChckInfo.chckPlanEndde = dcsnObj.dmExtrnChckInfo.chckPlanEndde ? dcsnObj.dmExtrnChckInfo.chckPlanEndde.replaceAll('-','') : ''            // 점검계획종료일
                dcsnObj.dmExtrnChckInfo.frstChckde = dcsnObj.dmExtrnChckInfo.frstChckde ? dcsnObj.dmExtrnChckInfo.frstChckde.replaceAll('-','') : ''                     // 최초점검일
                dcsnObj.dmExtrnChckInfo.chckde = dcsnObj.dmExtrnChckInfo.chckde ? dcsnObj.dmExtrnChckInfo.chckde.replaceAll('-','') : ''                                 // 점검일
                dcsnObj.dmExtrnChckInfo.sportRequstBgnde = dcsnObj.dmExtrnChckInfo.sportRequstBgnde ? dcsnObj.dmExtrnChckInfo.sportRequstBgnde.replaceAll('-','') : ''   // 지원요청시작일
                dcsnObj.dmExtrnChckInfo.sportRequstEndde = dcsnObj.dmExtrnChckInfo.sportRequstEndde ? dcsnObj.dmExtrnChckInfo.sportRequstEndde.replaceAll('-','') : ''   // 지원요청종료일

                try {
                    let dcsn = {        // 확정공문 여부 수정
                        url : '/sendApi/api/extrnlChck/extrnlExtrnlChckDcsnResult/change' ,
                        payload : dcsnObj
                    }
                    let dlbrt = {       // 심의위원회
                        url : '/sendApi/api/extrnlChck/extrnlExtrnlChckDcsnDlbrt/change',   
                        payload : {
                            'dmChckDcsnDlbrt' : {...dcsnObj.dmExtrnChckInfo} ,
                            'dlbrtFileConnectId' : dcsnObj.dmExtrnChckInfo.dlbrtFileConnectId,
                        }
                    }
                    let sportRequst = {  // 지원요청서
                        payload : {
                            'dmDcsnSportReq' : { ... dcsnObj.dmExtrnChckInfo},
                            'resultSportRequstYn' : dcsnObj.dmExtrnChckInfo.resultSportRequstYn ,
                            'dcsnFileConnectId' : dcsnObj.dmExtrnChckInfo.dcsnFileConnectId ,
                        },
                        url : '/sendApi/api/extrnlChck/extrnlExtrnlChckDcsnSportReq/change',
                    }   

                    await sendPostApi(dcsn.url, dcsn.payload).then((dcsnRst) => {  // 확정공문
                        if(dcsnRst.data == 'Y'){
                            sendPostApi(dlbrt.url, dlbrt.payload).then(dlbrtRst => {  // 심의위원회
                                if(dlbrtRst.data > 0){
                                    sendPostApi(sportRequst.url, sportRequst.payload).then( async (sportRst) => {  // 지원요청서
                                        if(sportRst.status == 200){
                                            let resultData = true;

                                            /** 통합알림 */
                                            if (this.step === 'DCSN' ? this.dcsnDetail.dmExtrnChckInfo.resultSportRequstYn !== 'Y' : true) {
                                                if(this.dcsnDetail.dmExtrnChckInfo.resultSportRcverId != null){
                                                    this.fn_sendMessage({
                                                        messageCode:    'A049',
                                                        siteMstrId: dcsnObj.dmExtrnChckInfo.siteMstrId,
                                                        reciveUserId: this.dcsnDetail.dmExtrnChckInfo.resultSportRcverId,
                                                        userId: this.dcsnDetail.dmExtrnChckInfo.resultSportRqesterId,
                                                    })
                                                }
                                            }

                                            for(var i of Object.keys(this.files)){     // 파일 등록
                                                let files = fileObj[i]
                                                let secondRemoveFileId = this.secondRemoveFileId[i]

                                                //파일 수정 여부 체크
                                                if(files.length > 0 || secondRemoveFileId.length > 0){
                                                    let connetId = i == 'DCSN' ? dcsnObj.dmExtrnChckInfo.dcsnFileConnectId :  dcsnObj.dmExtrnChckInfo.requstFileConnectId

                                                    //파일 추가
                                                    if(files && files.length > 0){
                                                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                                        const subResponse = await sendFileApi(connetId, "ExtCheck", files)
                                                        
                                                        if(subResponse.status == '200'){
                                                        }
                                                        else{
                                                            resultData = false;
                                                        }
                                                    }
                                                    //파일 삭제
                                                    if(secondRemoveFileId && secondRemoveFileId.length > 0){
                                                        let url = '/sendApi/api/file/fileUnUse';
                                                        let payload = {
                                                            fileType : "ExtCheck",
                                                            fileComArcvIds : secondRemoveFileId,
                                                        };
                                                        requestOptions.headers['Accept-Language'] = "ko";
                                                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                                                        const subResponse = await sendPostApi(url, payload)
                                                        if(subResponse.status == '200'){
                                                        }
                                                        else{
                                                            resultData = false;
                                                        }
                                                    }
                                                }
                                            }

                                            // 파일 저장 여부 확인
                                            if(resultData){
                                                this.alert('저장되었습니다.');
                                                this.fn_fetchAdvancedInfo()
                                                
                                                // set-keepAlive Activated 
                                                this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                                            }
                                            else{
                                                this.alert('오류로 인해 파일이 저장되지 않았습니다.');
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }).catch((e) => {
                         console.error(e)
                        this.alert("오류로 인해 저장되지 않았습니다.")
                    });
                } catch (e) {
                    console.error(e).
                    this.alert("오류로 인해 저장되지 않았습니다.")
                }
            })
        },

        fn_onSupportRequest: function () {
            if (this.currentTabRound === 1) {
                this.currentTabRound = 0
                this.fn_setSupportRequest()
            }
        },
        fn_setSupportRequest: function () {
            this.dcsnDetail.dmExtrnChckInfo.resultSportRqesterId = this.$store.getters['auth/getUserId']
            this.dcsnDetail.dmExtrnChckInfo.resultSportRqesterNm = this.$store.getters['auth/getUserNm']
        },

        /** 통합메세지 처리 */
        fn_sendMessage: function (_payload) {
            const url       = '/sendApi/api/messageMngt/message/send'
            const payload   = {
                                messageCode:    ''    ,
                                userId:         this.userId,
                                projectId:      this.projectId,
                                projectName:    this.projectNm,
                                // reciveUserId:
                                // reciveuserIds:
                                docSeq:         this.docSeq,
                                siteMstrId:     this.siteMstrId,

                                ..._payload,
                            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(() => {
                    // console.log(response)
                })
        },
        
    },
    data: function () {
        return {
            pout: {
                list: [],
            },
            show : false,
            editYn : false ,
            // editable: 'FIXED',    // 지원요청서 수정여부 - FIXED: 수정불가, ONLY_ON: 온만가능, EDITABLE: 수정가능
            step : "POUT" ,   // POUT 대외점검 등록 상태, DCSN 확정공문 등록 상태 , LAST 최종 벌점 완료 상태
            
            allDcsnOfldcYn: 'Y',            // 전체 확정공문
            tabsRound: ['ON', 'OFF'],       // 지원요청서 on / off
            currentTabRound: 0,             // 지원 요청서 on (0) / off (1)

            //파일 리스트및 삭제
            lstFileRst : {       // 파일 리스트   
                Pout : [],         // 지적사항 파일
                DCSN : [],         // 확정공문 파일
                Rqest : [],        // 요청서 파일   
            },
            files : {            // 파일 변경 리스트(등록)
                DCSN : [],          // 확정공문 파일
                Rqest : [],         // 요청서 파일   
            },
            secondRemoveFileId:{  // 파일 아이디 (삭제)
                DCSN : [],          // 확정공문 파일
                Rqest : [],         // 요청서 파일   
            },

            //파일 추가
            fileConnectId: 0,
            tempFileLst : [],                           //등록된 파일 데이터
            tempFiles : [],                             //등록되지않은 파일 임시데이터
            totalCnt:0,
            totalSize:0,
            bytes:"KB",

            dcsnDetail : {
                dlDcsnResult : [],
                dmExtrnChckInfo : [],
            },
            defaultInfo : {     // 기본값
                dlDcsnResult : [   // 지적사항 상세 내역
                    {
                        userNm : '',                    // 사용자명
                        poutMatterTypeNm : '',          // 지적사항 
                        dem : '',                       // 벌점    
                        cntrwkKndNm : '',               // 공종      
                        cntrwkKndDtlNm : '',            // 세부공종      
                        insctrNm : '',                  // 점검자        
                        cnfrmnWritngYn : '',            // 확인서 작성 여부
                        title : '',                     // 제목
                        chckPoutMatterCn : '',          // 상세 내용
                        chckManagtCn : '',              // 조치 사항
                        dcsnOfldcYn : '',               // 확정공문 여부
                        poutType : '',                  // 지적유형
                        dcsnDocRecptnDe : '',           // 수신 날짜
                        dcsnDocDem : '',                // 벌점 (확정공문)
                        dcsnDocDemYn : 'N',                // 벌점 N/A 여부
                        dcsnResultManagtTrget : '',     // 조치대상
                        dcsnResultManagtCn : '',        // 조치내용
                        
                    }
                ],  
            },
            dmExtrnChckInfo : {  // 대외점검 정보
                // 심의위원회
                resultDlbrtCmitYn : 'N',                  // 심의위원회 여부
                
                // 지원요청
                resultSportRequstYn : 'Y',                // 지원요청 여부

                resultSportRqesterId : '',               // 요청자 ID
                resultSportRqesterNm : '',               // 요청자명
                resultSportRequstTitle: '',              // 요청서 제목  
                resultSportRequstCn: '',                 // 요청서 내용
                requstFileConnectId: '',                 // 요청 첨부파일 ID
                resultSportRcverId : '',                   // 수신자 ID
                resultSportRcverNm: '',                    // 수신자 명
                resultSportRecptnDeptCd: '',               // 수신자 부서 코드
                resultSportRecptnDeptNm: '',               // 수신자 부서명
                resultSportRcverRspofc: '',                // 수신자 직책,

                finlCmpltYn: 'N',                           // 최종완료 여부
                
            },     
        }
    }
}
</script>
