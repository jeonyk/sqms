<template>
    <b-modal id="RequestformWrite" :title="popupTitle" hide-backdrop size="lg" :footer-bg-variant="footerBg" @shown="loadPopup">
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-if="requestParams.realProgrsStatus !== 'TTRG' &&requestParams.realProgrsStatus !== 'RQPR' && requestParams.realProgrsStatus !== 'RQRP'" @click="reportPrint(requestParams)" >보고서</button>
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" v-if="requestParams.realProgrsStatus !== 'TTRG' &&requestParams.realProgrsStatus !== 'RQPR'" @click="aprvDtl()">결재보기</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" v-print="'printArea'">출력</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="requestSaveForm" v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">저장</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="requestDocConfirm" :disabled="!requestParams.formDataStatus" v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">결재상신</button>
                    </div>
                </div>

                <div id="printArea">
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="15%">
                                <col width="*">
                                <col width="15%">
                                <col width="*">
                                <col width="15%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>문서번호</th>
                                    <td colspan="5">{{ lstData.rqstdocRecomDocNo }}</td>
                                </tr>
                                <tr>
                                    <th>구분 <br> [대분류]</th>
                                    <td>{{ lstData.mainName }}</td>
                                    <th>공종 <br> [중분류]</th>
                                    <td>{{ lstData.midName }}</td>
                                    <th>종별 <br> [소분류]</th>
                                    <td>{{ lstData.subName }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="7%">
                                <col width="8%">
                                <col width="*">
                                <col width="15%">
                                <col width="*">
                                <col width="15%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th colspan="2">시험 · 검사종목</th>
                                    <td colspan="5">
                                        <p>{{ lstData.testInspctItem }}</p>
                                        * 
                                        <template v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">
                                            <input type="text" class="form_control form_sm" placeholder="제조사를 입력해주세요" v-model="lstData.makrName" maxlength="50">
                                        </template>
                                        <template v-else>
                                            {{ lstData.makrName }}
                                        </template>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="2">시료명</th>
                                    <td colspan="2">{{ lstData.subName }}</td>
                                    <th><span class="emp_red">시료량</span></th>
                                    <td colspan="2">
                                        {{ lstData.sploreQy }}<span class="ml30 mr10">채취일:</span>
                                        <template v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">
                                            <Datepicker v-model="lstData.pickDate" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'" v-show="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'" v-on:value-change="registDateChange"/>
                                            <!-- <Datepicker ref="sploreDatepicker" v-model="lstData.pickDate" v-show="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'" v-on:value-change="registDateChange" v-on:value-reset="registDateReset" /> -->
                                        </template>
                                        <template v-else>
                                            {{ $moment(lstData.pickDate).format('YYYY-MM-DD') }}
                                        </template>
                                        <!-- <Datepicker ref="sploreDatepicker" v-show="requestParams.resultProgrsStatus === 'TTRG'" v-on:value-change="registDateChange" v-on:value-reset="registDateReset" /> -->

                                        <!-- <span v-if="requestParams.resultProgrsStatus !== 'TTRG'">{{ lstData.pickDate }}</span> -->
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="2"><span class="emp_red">시료 또는 자재 생산국 </span></th>
                                    <td colspan="2">
                                        <template v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">
                                            <input type="text" class="form_control" placeholder="제조사를 입력해주세요" v-model="lstData.makrNation" maxlength="25">
                                        </template>
                                        <template v-else>
                                            {{ lstData.makrNation }}
                                        </template>
                                    </td>
                                    <th>시료 채취 장소</th>
                                    <td colspan="2">
                                        <template v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">
                                            <input type="text" class="form_control" v-model="lstData.place" maxlength="50">
                                        </template>
                                        <template v-else>
                                            {{ lstData.place }}
                                        </template>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="2">시료 채취자</th>
                                    <td colspan="5" :class="requestParams.resultProgrsStatus !== 'TTRG' && requestParams.resultProgrsStatus !== 'RQPR' ? 'cell_division' : ''">
                                        <ul v-if="requestParams.resultProgrsStatus !== 'TTRG' && requestParams.resultProgrsStatus !== 'RQPR'">
                                            <li>
                                                <strong>소속</strong>
                                                <span>{{ lstData.pickPsitn }}</span>
                                            </li>
                                            <li>
                                                <strong>담당업무</strong>
                                                <span>{{ lstData.pickChrgJob }}</span>
                                            </li>
                                            <li>
                                                <strong>성명</strong>
                                                <span>{{ lstData.pickName }}</span>
                                            </li>
                                        </ul>
                                        <ul v-else><li>결재라인의 기안자로 자동 입력됩니다.</li></ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="2">입회자</th>
                                    <td colspan="5" v-if="aprvOptnType === 'ALLON'" :class="aprvOptnType === 'ALLON' && requestParams.resultProgrsStatus !== 'TTRG' && requestParams.resultProgrsStatus !== 'RQPR' ? 'cell_division' : ''">
                                        <ul v-if="aprvOptnType === 'ALLON' && requestParams.resultProgrsStatus !== 'TTRG' && requestParams.resultProgrsStatus !== 'RQPR'">
                                            <li>
                                                <strong>소속</strong>
                                                <span>{{ lstData.sprvisnPsitn }}</span>
                                            </li>
                                            <li>
                                                <strong>담당업무</strong>
                                                <span>{{ lstData.sprvisnChrgJob }}</span>
                                            </li>
                                            <li>
                                                <strong>성명</strong>
                                                <span>{{ lstData.sprvisnName }}</span>
                                            </li>
                                        </ul>
                                        <ul v-else-if="aprvOptnType === 'ALLON' && (requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR')">
                                            결재라인의 담당감리 또는 책임감리로 자동 입력됩니다.
                                        </ul>
                                    </td>
                                    <td colspan="5" v-else class="cell_division">
                                        <ul>
                                            <li>
                                                <strong>소속</strong>
                                                <span></span>
                                            </li>
                                            <li>
                                                <strong>담당업무</strong>
                                                <span></span>
                                            </li>
                                            <li>
                                                <strong>성명</strong>
                                                <span></span>
                                            </li>
                                        </ul>
                                    </td>

                                </tr>
                                <tr>
                                    <th colspan="2"><span class="emp_red">시험 및 시방기준</span></th>
                                    <td colspan="5">
                                        <template v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">
                                            <input type="text" class="form_control" v-model="lstData.stdr" maxlength="50">
                                        </template>
                                        <template v-else>
                                            {{ lstData.stdr }}
                                        </template>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="2"><span class="emp_red">성과 이용 목적</span></th>
                                    <td colspan="5">
                                        <template v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">
                                            <input type="text" class="form_control" v-model="lstData.usePurps" maxlength="50">
                                        </template>
                                        <template v-else>
                                            {{ lstData.usePurps }}
                                        </template>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <th rowspan="3" colspan="2">공사개요</th>
                                    <th>공사명</th>
                                    <td colspan="4">{{ lstData.cntrwkName }}</td>
                                </tr>
                                <tr>
                                    <th>착공일</th>
                                    <td colspan="4">{{ lstData.csrtStartDt }}</td>
                                </tr>
                                <tr>
                                    <th>준공예정일</th>
                                    <td colspan="4">{{ lstData.csrtEndDt }}</td>
                                </tr>
                                <tr>
                                    <th colspan="2">발주자</th>
                                    <td colspan="2">{{ lstData.orderPlace }}</td>
                                    <th>시공자</th>
                                    <td colspan="2">{{ lstData.cnstrctEntrprs }}</td>
                                </tr>
                                <tr>
                                    <th colspan="2">국가중요시설 여부</th>
                                    <td colspan="5">
                                        <template v-if="requestParams.resultProgrsStatus === 'TTRG' || requestParams.resultProgrsStatus === 'RQPR'">
                                            <input type="text" class="form_control form_sm" v-model="lstData.cmcqRm" maxlength="5">
                                        </template>
                                        <template v-else>
                                            {{ lstData.cmcqRm }}
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <approval-view
                    ref-id="RequestformWritePop_AprvView"
                    :aprv-info-id="aprvInfoIdData.aprvInfoId"
                    :request-id="requestId"
                    :optional="{docType: 'request'}"
                />

                <!-- 접수증 -->
                <template v-if="requestParams.resultProgrsStatus === 'RQRA none'">   <!-- 의뢰서 접수 완료 상태 접수증 추가 -->
                    <p class="ac mt20">================================= 자르는 선 =================================</p>
                    <div class="receipt">
                        <h3>접수증</h3>
                        <ul>
                            <li>1. 접수일 : 2021-12-01</li>
                            <li>2. 의뢰 시험 · 검사 종목 : {{ lstData.testInspctItem }}</li>
                            <li>3. 시료명 및 시료량 : {{ lstData.subName }} / {{ lstData.sploreQy }}</li>
                            <li>귀하께서 의뢰한 시험 · 검사 요청 건은 접수일부터 약 <input type="text" class="form_control num"> 일이 걸릴 예정임을 알려드리며 이 접수증을 발급합니다.</li>
                        </ul>
                        <div class="signature">
                            <p>접수자 : 김현대 <span>(건설엔지니어링 사업자)</span></p>
                            <p>성명 : 홍길동 <span>(서명 또는 인)</span></p>
                        </div>
                    </div>
                </template>
                <template v-if="requestParams.resultProgrsStatus === 'TTPR none'">   <!-- 의뢰서 접수 완료 이후 상태 접수증 추가 -->
                    <p class="ac mt20">================================= 자르는 선 =================================</p>
                    <div class="receipt">
                        <h3>접수증</h3>
                        <ul>
                            <li>1. 접수일 : 2021-12-01</li>
                            <li>2. 의뢰 시험 · 검사 종목 : {{ lstData.testInspctItem }}</li>
                            <li>3. 시료명 및 시료량 : {{ lstData.subName }} / {{ lstData.sploreQy }}</li>
                            <li>귀하께서 의뢰한 시험 · 검사 요청 건은 접수일부터 약 <b>10</b> 일이 걸릴 예정임을 알려드리며 이 접수증을 발급합니다.</li>
                        </ul>
                        <div class="signature">
                            <p>접수자 : 김현대 <span>(건설엔지니어링 사업자)</span></p>
                            <p>성명 : 홍길동 <span>(서명 또는 인)</span></p>
                        </div>
                    </div>
                </template>
            </div>
            
        </template>
        <template #modal-footer="{ }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="confirmDoc" v-if="requestParams.resultProgrsStatus === 'RQRA none'">승인</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="closePop">닫기</b-button>
        </template>

        
    </b-modal>
    
</template>

<script>
import Datepicker from '@component/common/DatePicker.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import { sendPostApi, requestOptions } from '@/apis/common';
import ApprovalView from '@modal/approval/ApprovalView.vue'

export default {
    name: 'RequestformWrite',
    mixins: [MsgBoxMixins, authCheckMixns],
    props: {
        requestParams: {
            type: Object,
            default: null
        },
    },
    computed: {
        popupTitle() {
            return this.requestParams.resultProgrsStatus === 'TTRG' ? '의뢰서 작성' : '의뢰서 보기';
        }
    },
    data() {
        return {
            footerBg: 'transparent',
            lstData: {},    // list data
            // saveStatus: false, // state save
            userinfo: {},
            ozReport : {
                src : '',
            },
            aprvInfoId : '',
            aprvInfoIdData : {
                aprvInfoId : ''
            },
            requestId: '',
            aprvOptnType : '', //결재 옵션 100%, 50% , OFF
        }
    },
    components: {
        Datepicker,
        ApprovalView,
    },
    mounted () {
        
    },
    methods: {
        loadPopup() {   // popup shown
            this.userinfo = this.$session.get('userInfo');
            this.setFormData();
            this.fn_getAprvOptnType()
        },
        async setFormData() {   // 의뢰서작성 조회
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/testMngt/testResultMngt/rqstdocWritng/list';
            let payload = this.requestParams;

            try {
                const { data } = await sendPostApi(url, payload);
                this.lstData = data.datas.dmTestDetail; 

                if(this.lstData.cmcqRm === null || this.lstData.cmcqRm === '') {
                    this.lstData.cmcqRm = '해당없음';
                }
                
                if(this.lstData.makrNation === null || this.lstData.makrNation === '') {
                    this.lstData.makrNation = '대한민국';
                }

                if(this.lstData.usePurps === null || this.lstData.usePurps === '') {
                    this.lstData.usePurps = '품질관리(시험)';
                }

                // if(this.lstData.pickPsitn === null || this.lstData.pickPsitn === '') {    // 소속
                //     this.lstData.pickPsitn = this.userinfo.userType;
                // }

                // //if(this.lstData.pickChrgJob === null || this.lstData.pickChrgJob === '') {  // 담당업무
                //     this.lstData.pickChrgJob = '공사'
                // //}
                // if(this.lstData.pickName === null || this.lstData.pickName === '') {  // 성명
                //     this.lstData.pickName = this.userinfo.userNm;
                // }
                     // pickName // 성명
                     // pickPsitn // 소속
                     // pickChrgJob 담당업무
                if(this.lstData.pickDate === null || this.lstData.pickDate === '' || this.lstData.pickDate === undefined){
                    // this.$refs.sploreDatepicker.valueChange(this.formatDate(this.lstData.pickDate));
                    this.lstData.pickDate = new Date().toISOString().split('T')[0];
                } 
                
                if(this.lstData.rqstdocAprvInfoId !== null && this.lstData.rqstdocAprvInfoId !== '' && this.lstData.rqstdocAprvInfoId !== undefined) {
                    this.aprvInfoId = this.lstData.rqstdocAprvInfoId
                }
                /*
                <li>
                    <strong>소속</strong>
                    <span>{{ lstData.pickName }}</span>
                </li>
                <li>
                    <strong>담당업무</strong>
                    <span>{{ lstData.pickChrgJob }}</span>
                </li>
                <li>
                    <strong>성명</strong>
                    <span>{{ lstData.pickPsitn }}</span>
                </li>
                */
            } catch (error) {
                console.log(error.response);
            }
        },
        //결재 옵션조회 100%,50%,off
        async fn_getAprvOptnType() {
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let payload = {
                siteMstrId : this.$session.get('userInfo').siteMstrId,
                codeType : 'TEST'
            }
            let url = '/sendApi/api/apvlOptn/approvalOption/view';
            try {
                const response = await sendPostApi(url, payload);
                if (response.status === 200 && response.data) {
                    this.aprvOptnType = response.data.data.aprvOptnType;
                } else {
                    // console.log('결재 옵션 조회 실패: ', response)
                }

            } catch(error) {
                console.log('결재 옵션 조회 실패:' + error)
            }
        },
        requestSaveForm() {
            if(this.lstData.makrNation === null || this.lstData.makrNation === "" || this.lstData.makrNation === undefined) {
                this.alert('시료 또는 자재 생산국을 입력해주세요.')
                return 
            } 
            if(this.lstData.stdr === null || this.lstData.stdr === "" || this.lstData.stdr === undefined) {
                this.alert('시험 및 시방기준을 입력해주세요.')
                return
            }
            if(this.lstData.usePurps === null || this.lstData.usePurps === "" || this.lstData.usePurps === undefined) {
                this.alert('성과 이용 목적을 입력해주세요.')
                return
            }
            this.confirm('저장하시겠습니까?', ()=> {
                //this.$bvModal.hide('RequestformWrite')
                this.$emit('requestSaveForm', this.lstData);
            })
            
        },
        requestDocConfirm() {
            this.$emit('requestDocConfirm');
        },
        
        confirmDoc() {  // 승인

        },

        registDateChange : async function(param) { //date-picker value change event
            if(this.lstData.pickDate) {

            } else {
                //this.lstData.pickDate = param;
            }
            
        },
        registDateReset : function() { //date-picker valueReset 함수 호출
            if(!this.lstData.pickDate) {
                this.registInfo.registDate = null;
                this.$refs.sploreDatepicker.valueReset();
            } else {
                this.$refs.sploreDatepicker = this.lstData.pickDate
                this.lstData.pickDate = this.lstData.pickDate
            }
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
        reportPrint(param) {
            // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
            this.ozReport.src = this.$store.getters['auth/getOzTypeList'][5].jspNm
            + `&siteMstrId=`     + this.$session.get('userInfo').siteMstrId
            + `&testResultMngtSeq=` + param.testResultMngtSeq
            + `&userId=`        + this.$session.get('userInfo').userId
            + `&aprvInfoId=`        + this.aprvInfoId
            window.open(this.ozReport.src, '_blank')
            // siteMstrId
            // testResultMngtSeq
            // userId
        },
        closePop() {
            this.$bvModal.hide('RequestformWrite')
            //this.$emit('fnChange', true)
            //this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
        },
        aprvDtl() {
            this.aprvInfoIdData.aprvInfoId = this.aprvInfoId
            this.requestId = `${this.$session.get('siteMstrId')}_${this.lstData.testResultMngtSeq}`;
            this.$bvModal.show('RequestformWritePop_AprvView')
        }
    },
}
</script>

<style>

</style>