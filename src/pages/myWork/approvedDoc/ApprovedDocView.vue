<template>
    <section id="approvedDocView" class="tab_contents">
        <div class="inner">
            <h2 class="sub_title mb10">결재문서</h2>
            <div class="button_box">
                <div class="fl mt10">
                    <!-- <strong> {{ dmApprvDoc.aprvOptnNm }} </strong> -->
                     <strong>
                        <span
                            class="state"
                            :class="{'green': dmApprvDoc.aprvOptnType === 'ALLON', 'yellow': dmApprvDoc.aprvOptnType === 'HAFON', 'gray': dmApprvDoc.aprvOptnType === 'OFFLN'}"
                        />
                        {{`${dmApprvDoc.aprvOptnNm? dmApprvDoc.aprvOptnNm : ''} 결재`}} 
                    </strong>
                    
                </div>

                <!-- Buttons - default -->
                <div class="fr" :style="{'margin-left':'10px'}">
                    <button
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="$router.push({ name: 'ApprovedDocSheet' })"
                    >
                        목록
                    </button>
                </div>

                <div
                    v-if="aprvDoc.docType === 'dlMyDrft' && userChangable"
                    class="fr"
                >
                    <button 
                        v-if="true"
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        :class="{ 'disabled': dmApprvDoc.aprvOptnType === 'OFFLN' ? dmApprvDoc.finlAprvYn === 'Y' :  Number(dmApprvDoc.aprvOrder) !== 1 || dmApprvDoc.aprvProgrsState !== 'N' || dmApprvDoc.finlAprvYn === 'Y' }"
                        @click="confirm('기안 취소 하시겠습니까?', fn_clickDraftCancel)"
                    >
                        <!-- @click="alert('준비중입니다 ;ㅅ;')" -->
                        {{'기안 취소'}}
                    </button>

                    <button 
                        v-if="fn_isFinalApproveBtn()"
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        :class="{disabled: dmApprvDoc.finlAprvYn === 'Y' }"
                        @click="fn_beforeFinalProcess"
                    >
                        <!-- @click="confirm('최종승인하시겠습니까?', fn_finalProcess )" -->
                        <!-- :disabled="dmApprvDoc.finlAprvYn !== 'Y'" -->
                        {{'최종 승인'}}
                    </button>
                </div>

                <!-- Buttons - dlMyApprv -->
                <div
                    v-if="aprvDoc.docType === 'dlMyApprv' && userChangable"
                    class="fr"
                >
                    <!-- <button 
                        v-if="false"
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray" 
                        :disabled="false"
                    >
                        {{'결재라인 변경'}}
                    </button> -->
                    <button 
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray" 
                        :class="{disabled: dmApprvDoc.aprvProgrsState === 'Y' }"
                        :disabled="false"
                        @click="fn_processDoc"
                    >
                        {{'승인'}}
                    </button>
                    <button 
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray" 
                        :class="{disabled: dmApprvDoc.aprvProgrsState === 'Y' }"
                        :disabled="false"
                        @click="$bvModal.show('returnComment')"
                    >
                        {{'반려'}}
                    </button>
                </div>


                <!-- Buttons - dlCpmtApprv -->
                <div
                    v-else-if="aprvDoc.docType === 'dlCpmptApprv' && userChangable"
                    class="fr"
                >
                    <button
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="$bvModal.show('ApprovedDocView_share')"
                    >
                        {{'공유'}}
                    </button>
                </div>

                <!-- Buttons - dlHelpApprv -->
                <div
                    v-else-if="aprvDoc.docType === 'dlHelpApprv' && userChangable"
                    class="fr"
                >
                    <button
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        :class="{'disabled': dmApprvDoc.helpCheckYn === 'Y'}"
                        @click="fn_clickConfirm"
                    >
                        {{'확인'}}
                    </button>
                </div>

            </div>

            <div class="table_normal_list">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="7%">
                        <col width="*">

                        <col width="5%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>문서번호</th>
                            <td> {{ dmApprvDoc.docSeq }}</td>

                            <th rowspan="4" class="ac">결재</th>
                            <th 
                                v-for="aprv in dlApprvUser"
                                :key="`${aprv.userId}_${aprv.aprvOrder}`"
                                class="ac"                                
                            >
                                {{aprv.dtyNm}}
                            </th>
                            <th 
                                v-for="index in Array(5-dlApprvUser.length).fill().map((item, index) => index)"
                                :key="index"
                                class="ac"                                
                            >
                                {{''}}
                            </th>
                        </tr>

                        <tr>
                            <th>현장명</th>
                            <td> {{ dmApprvDoc.siteNm }} </td>


                            <!-- <td class="ac"><img :src="require('@assets/img/layout/admin_sign.png')" alt="서명"></td>
                            <td
                                v-for="index in Array(4).fill().map((item, index) => index) "
                                :key="index"
                                class="ac"
                            >
                                :class="{bg_gray: !(dlApprvUser[index] && dlApprvUser[index].aprvDttm)} "
                                <img
                                    v-if="dlApprvUser[index] && dlApprvUser[index].aprvDttm"
                                    :src="require(`@assets/img/layout/admin_sign${ index !== 0 ? (index+1 === 4 ? index : index+1 ) : '' }.png`)"
                                    alt="서명"
                                >

                            </td> -->
                            <td 
                                v-for="aprv in dlApprvUser"
                                :key="`${aprv.userId}_${aprv.aprvOrder}`"
                                class="ac"                                
                            >
                                <img
                                    v-if="aprv.aprvState === 'Y'"
                                    :src="aprv.fileSgnArcvId ? '/sendApi/api/fileCall/fileSgnImgFile/' + aprv.fileSgnArcvId : ''"
                                    style="max-width: 100%;"
                                    alt="서명"
                                />
                                <img
                                    v-else-if="aprv.aprvState === 'R'"
                                    src="@/assets/img/main/approve_reject_temp.png"
                                    style="max-width: 100%;"
                                />
                                    
                            </td>
                            <td 
                                v-for="index in Array(5-dlApprvUser.length).fill().map((item, index) => index)"
                                :key="index"
                                class="ac"                                
                            >
                                {{''}}
                            </td>
                        </tr>

                        <tr>
                            <th>제목</th>
                            <!-- <td v-html="fn_toHtml(title)">
                            </td> -->
                            <td><pre>{{dmApprvDoc.title}}</pre></td>

                            <!-- <td class="ac"> {{ drafterId }} </td>
                            <td
                                v-for="(index) in Array(4).fill().map((item,index) => index)"
                                :key="index"
                                class="ac"
                            >
                                :class="{bg_gray: !(dlApprvUser[index] && dlApprvUser[index].aprvUser)}"
                                {{ dlApprvUser[index] && dlApprvUser[index].aprvUser ? dlApprvUser[index].aprvUser : null}}
                            </td> -->

                            <td 
                                v-for="(aprv) in dlApprvUser"
                                :key="`${aprv.userId}_${aprv.aprvOrder}`"
                                class="ac"                                
                            >
                                <!-- {{ aprv.aprvstate === 'Y' ? (aprv.agncyAprvYn === 'Y' ? aprv.agncyUserNm :  aprv.userNm) :  (Number(dmApprvDoc.aprvOrder)+1 === Number(aprv.aprvOrder) ? userNm : aprv.aprvUserNm ) }}  -->
                                {{ aprv.agncyAprvYn === 'Y' ? aprv.agncyUserNm :  aprv.aprvUserNm}}
                                <!-- / {{aprv.agncyAprvYn}} -->
                                <button 
                                    v-if="aprvDoc.docType === 'dlMyApprv' && Number(dmApprvDoc.aprvOrder)+1 < Number(aprv.aprvOrder)" 
                                    class="fr btn_modify" 
                                    @click="fn_changeAprvUser(aprv.aprvOrder)"
                                >
                                    {{'ㅤ'}}
                                </button>
                            </td>
                            <td 
                                v-for="index in Array(5-dlApprvUser.length).fill().map((item, index) => index)"
                                :key="index"
                                class="ac"                                
                            >
                                {{''}}
                            </td>

                        </tr>

                        <tr>
                            <th>문서종류</th>
                            <td class="cell_division">
                                <ul>
                                    <li style="width: 20%;">{{dmApprvDoc.docTypeNm}}</li>
                                    <li> {{ dmApprvDoc.docName }} </li>
                                </ul>
                            </td>

                            <!-- <td class="ac"> {{ drafterDttm ? drafterDttm.split('T')[0] : '' }} </td>
                            <td
                                v-for="index in Array(4).fill().map((item, index) => index) "
                                :key="index"
                                class="ac"
                            >
                                :class="{bg_gray: !(dlApprvUser[index] && dlApprvUser[index].aprvDttm)} "
                                {{dlApprvUser[index] && dlApprvUser[index].aprvDttm ? dlApprvUser[index].aprvDttm.split(' ')[0] : null}}

                            </td> -->
                            <td 
                                v-for="aprv in dlApprvUser"
                                :key="`${aprv.userId}_${aprv.aprvOrder}`"
                                class="ac"                                
                            >
                                <!-- {{aprv.aprvDttm}} -->
                                {{ aprv.aprvState === 'Y' || aprv.aprvState === 'R' ? $moment(aprv.aprvDttm).format('YYYY-MM-DD') : '' }}
                            </td>
                            <td 
                                v-for="index in Array(5-dlApprvUser.length).fill().map((item, index) => index)"
                                :key="index"
                                class="ac"                                
                            >
                                {{''}}
                            </td>
                        </tr>

                        <tr>
                            <th>{{'참조'}}</th>
                            <td colspan="7">
                                <div class="label_item">
                                    <ul>
                                        <li
                                            v-for="helper in dlHelpUser"
                                            :key="helper.helpUserId"
                                            :class="{ blue: helper.chckYn === 'Y', gray: helper.chckYn !== 'Y' }"
                                        >
                                            <strong>
                                                {{helper.helpUserNm}}
                                            </strong>
                                            {{helper.chckYn === 'Y' ? helper.chckDttm : '미확인' }}
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="aprvDoc.docType === 'dlMyApprv'">
                            <th>{{'결재자 의견'}}</th>
                            <td colspan="7">
                                <div class="input_text">
                                    <textarea 
                                        v-model="dmApprvDoc.dtlComment" 
                                        class="form_control" 
                                        style="height: 60px;"
                                    />
                                    <div class="num"><strong class="count">{{String(dmApprvDoc.dtlComment).length}}</strong>/100</div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th>검토 의견</th>
                            <td colspan="7">
                                <div class="lst_comment">
                                    <!-- <ul v-for="(comment, index) in dlCmtList" :key="index">
                                        <li> <strong> {{comment.aprvUser}}/{{comment.aprvJobTitle}} </strong> <span> {{comment.dtlComment}}</span> ( {{ comment.aprvDttm ? comment.aprvDttm.split('.')[0] : '미확인' }} ) </li>
                                    </ul> -->

                                    <ul>
                                        <li
                                            v-for="cmt in dlCmtList.filter((cmtItm,cmtIdx) => cmtIdx !== 0 ).filter(cmtItm => cmtItm.aprvDttm)"
                                            :key="cmt.aprvUser"
                                        >
                                            <strong>{{cmt.aprvUserNm}} / {{cmt.userType === 'HEC' ? 'HEC' : '협력사' }}</strong>
                                            <span> {{ cmt.dtlComment }} </span>
                                            <!-- ( {{ cmt.aprvDttm ? $moment(cmt.aprvDttm).format('YYYY-MM-DD HH:mm:ss') : '미확인' }} ) -->
                                            ( {{ $moment(cmt.aprvDttm).format('YYYY-MM-DD HH:mm:ss') }} )
                                        </li>
                                        <!-- <li
                                            v-for="(aprvUser, aprvIdx) in dlApprvUser.filter((aprvItm, aprvIdx) => aprvIdx !== 0).filter(aprvItm => aprvItm.aprvState)"
                                            :key="`${aprvUser}_${aprvIdx}`"
                                        >
                                            <strong>{{dlCmtList[aprvIdx].aprvUserNm}} / {{dlCmtList[aprvIdx].userType === 'HEC' ? 'HEC' : '협력사' }}</strong>
                                            <span> {{aprvUser.aprvState === 'Y' ? dlCmtList[aprvIdx].dtlCommnet : dmApprvDoc.comment }} </span>
                                            ( {{ aprvUser.aprvState === 'Y' ? $moment(dlCmtList[aprvIdx].aprvDttm).format('YYYY-MM-DD HH:mm:ss') : $moment(dmApprvDoc.upDttm).format('YYYY-MM-DD HH:mm:ss') }} )
                                        </li> -->
                                    </ul>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th>첨부파일</th>
                            <td colspan="7">
                                <LstFile
                                    ref="attachments"
                                    :lst-file-rst="attachments.fileRegistered"
                                    :files="attachments.files"
                                    :second-remove-file-id="attachments.requestForDelete"
                                    @file-changed="(payload) => attachments.files = payload"
                                    @file-removed="(payload) => attachments.requestForDelete = payload"
                                    :uploadable="false"
                                    downloadable
                                />
                            </td>
                        </tr>

                        <tr v-if="except.docType.includes(dmApprvDoc.docType)">
                            <th>상세내용</th>
                            <td colspan="7">
                                <button
                                    type="button"
                                    class="btn btn_md btn_outline btn_darkgray"
                                    @click="fn_linkDetail"
                                >
                                    {{ '바로가기' }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- <template v-if="fn_isShowPredictDays()">
                <div class="button_box" >
                    <strong>{{'접수'}}</strong>
                </div>
                <div class="table_normal_list table_write" >
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="7%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span :class="{'emp_red': dmApprvDoc.finlAprvYn !== 'Y'}">{{'의뢰시험'}} <br> {{'(예정)소요일'}} </span></th>
                                <td>
                                    <input
                                        class="form_control w30"
                                        type="number"
                                        :value="testResult.rceptProgrsWaitDaycnt"
                                        :disabled="dmApprvDoc.finlAprvYn === 'Y'"
                                        @input="fn_pressKeyRceptProgrsWaitDaycnt($event, 'testResult.rceptProgrsWaitDaycnt', 3)"
                                    />
                                    <span class="label_text"> {{'일'}} </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template> -->

            <template v-if="fn_isFinalApprove() || (dmApprvDoc.finlAprvYn === 'Y' && (dmApprvDoc.finlAprvRst && dmApprvDoc.finlAprvRst !== '') )">
                <div class="button_box">
                    <strong>{{ dmApprvDoc.aprvOptnType === 'ALLON' ? '감리단 검토' : '최종 승인 처리'}}</strong> 
                </div>
                <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="7%">
                            <col width="*">
                            <col width="7%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span :class="{'emp_red': dmApprvDoc.finlAprvYn !== 'Y'}">{{'적합여부'}}</span></th>
                                <td class="cell_division ac" :colspan="dmApprvDoc.aprvOptnType === 'ALLON' ? 3 : 1">
                                    <ul>
                                        <li 
                                            v-for="state in advancedInfo.finlAprvRst"
                                            :key="state.codeVal"
                                        >
                                            <label :for="`apprResult_${state.codeVal}`" class="input_radio">
                                                <input 
                                                    :id="`apprResult_${state.codeVal}`"
                                                    v-model="dmApprvDoc.finlAprvRst"
                                                    :value="state.codeVal"
                                                    type="radio"
                                                    class="form_control"
                                                    :disabled="dmApprvDoc.finlAprvYn === 'Y'"
                                                />
                                                <span class="label_text">{{state.codeNameKr}}</span>
                                            </label>
                                        </li>
                                    </ul>
                                </td>
                                <th v-if="dmApprvDoc.aprvOptnType !== 'ALLON'" >
                                    <span :class="{'emp_red': dmApprvDoc.finlAprvYn !== 'Y'}">{{'완료 처리 일자'}}</span>
                                </th>
                                <td v-if="dmApprvDoc.aprvOptnType !== 'ALLON'">
                                    <datepicker
                                        v-model="dmApprvDoc.endDate"
                                        :input-style="{'max-width': '50%'}"
                                        :format="'YYYYMMDD'"
                                        :disabled="dmApprvDoc.finlAprvYn === 'Y'"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>{{'코멘트'}}</th> 
                                <td colspan="3">
                                    <textarea
                                        v-model="dmApprvDoc.comment"
                                        class="form_control"
                                        :placeholder="dmApprvDoc.finlAprvYn === 'Y'? '' : '코멘트를 입력하세요'"
                                        :disabled="dmApprvDoc.finlAprvYn === 'Y'"
                                    />
                                </td>
                            </tr>
                            <tr v-if="dmApprvDoc.aprvOptnType !== 'ALLON'">
                                <!-- <th><pre>{{'오프라인\n결재서류\n스캔본'}}</pre></th> -->
                                <th id="scan" v-html="'<span>오프라인<br>결재서류<br>스캔본</span>'"></th>
                                <td colspan="3">
                                    <LstFile
                                        ref="attachments"
                                        :lst-file-rst="finalApproval.fileRegistered"
                                        :files="finalApproval.files"
                                        @file-changed="(payload) => finalApproval.files = payload"
                                        :uploadable="dmApprvDoc.finlAprvYn !== 'Y'"
                                        :downloadable="dmApprvDoc.finlAprvYn !== 'Y'"
                                        :limit-total-file-size="1024*1024*300"
                                        :accept-extn="['pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'hwpx', 'png', 'gif', 'jpeg', 'jpg', 'bmp', 'txt', 'zip']"
                                    />
                                        <!-- :limit-file-count="20" -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>


            <iframe
                v-if="ozReport.src !== ''"
                class="w100 mt10 iframe-height"
                :src="ozReport.src"
            />


        </div>

        <!-- return modal -->
        <b-modal
            ref="returnComment"
            id="returnComment"
            :title="'반려사유 입력'"

            size="md"
            no-close-on-backdrop
            no-close-on-esc
            footer-bg-variant="transparent"
        >
            <!-- @shown="fn_onReturnModal" -->
            <template #default>
                <div class="pop_container">
                    <label style="form_control">반려사유</label>
                    <textarea
                        v-model="rtrn.retnResnCn"
                        class="form_control"
                        :placeholder="'반려 사유를 입력해주세요.'"
                    />
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_returnDoc">{{'반려'}}</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">{{'취소'}}</b-button>
            </template>
        </b-modal>

        <!-- sign-regist-modal -->
        <regist-approval-sign
            :ref-id="`ApprovedDocView_sign`"
            @callback="fn_addSignId"
        />
        <share-approval
            :ref-id="'ApprovedDocView_share'"
            :aprv-info-id="aprvDoc.aprvInfoId"
            :site-mstr-id="dmApprvDoc.siteMstrId"
            :project-id="dmApprvDoc.projectId"
            :project-nm="dmApprvDoc.projectNm"
            :doc-seq="dmApprvDoc.docSeq"
            @callback="$store.dispatch('tabInfo/setSavePage',$route.name); $router.push({ name: 'ApprovedDocSheet' })"
        />
        <approval-line-change
            :ref-id="'ApprovedDocView_lineChange'"
            :aprv-info-id="aprvDoc.aprvInfoId"
            :site-mstr-id="dmApprvDoc.siteMstrId"
            :line="dlApprvUser"
            :drafter-id="dmApprvDoc.drafterId"
            :aprv-order="aprvUserChange.aprvOrder"
            @callback="$store.dispatch('tabInfo/setSavePage',$route.name); fn_getAprrovedDoc()"
        />
        <report-wik-detail-pop
            v-if="dmApprvDoc.docType === 'WEKM'"
            ref-id="approvedDocView_reportWikDetailPop"
            :request-params="reportWik"
        />
        <review-detail-pop
            v-if="dmApprvDoc.docType === 'MNGT'"
            ref-id="approvedDocView_reviewDetailPop"
            :request-params="reviewMngt"
        />
        <self-quality-final-modal
            v-if="dmApprvDoc.docType === 'QISP'"
            ref-id="approvedDocView_selfQualityFinalModal"
            :site-mstr-id="dmApprvDoc.siteMstrId"
            :self-qlty-site-info-id="dmApprvDoc.aprvFileConnectId"
        />

    </section>
</template>


<script>
import LstFile from '@/pages/common/popup/LstFile'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import commonUtilMixns  from '@plugin/mixin/CommonUtil.js'
import Datepicker from '@component/common/DatePicker.vue'
import RegistApprovalSign from '@modal/myWork/RegistApprovalSign.vue'
import ShareApproval from '@modal/myWork/ShareApproval.vue'
import ApprovalLineChange from '@modal/myWork/ApprovalLineChange.vue'
import ReportWikDetailPop from '@/pages/stats/report/ReportWikDetailPop.vue'
import ReviewDetailPop from '@/pages/stats/review/ReviewDetailPop.vue'
import SelfQualityFinalModal from '@modal/checkEdu/SelfQualityFinalModal.vue'
// import VueFriendlyIframe from 'vue-friendly-iframe'

import { mapGetters } from 'vuex'
import axios from 'axios'
import _ from 'lodash'

export default {
    name: 'approvedDocView',
    mixins: [MsgBoxMixins, authCheckMixns, commonUtilMixns],
    components: {
        LstFile,
        Datepicker,
        RegistApprovalSign,
        ShareApproval,
        ApprovalLineChange,
        ReportWikDetailPop,
        ReviewDetailPop,
        SelfQualityFinalModal,
        // VueFriendlyIframe,
    },
    computed: {
        ...mapGetters({
            aprvDoc:    'myWork/getAprvDoc',
            userId:     'auth/getUserId',
            userNm:     'auth/getUserNm',
            projectId:  'auth/getProjectId',
            siteMstrId: 'auth/getSiteMstrId',
        }),
        userWritable: {
            get: function () {
                return this.checkUser(this.userId, 'write')
            },
        },
        userUnusable: {
            get: function () {
                return this.checkUser(this.userId, 'unuse')
            },
        },
        userChangable: {
            get: function () {
                return this.checkUser(this.userId, 'change')
            },
        },
        userDownloadable: {
            get: function () {
                return this.checkUser(this.userId, 'down')
            },
        },
    },
    mounted: function () {
        // console.log(this.aprvDoc)
        // this.fn_getAprrovedDoc()
        this.fn_fetchAdvancedInfo()
    },
    methods: {
        fn_fetchAdvancedInfo: function () {
            const urls = {
                masterCode: '/sendApi/api/common/masterCode/list',
            }
            const payload = {
                siteMstrId: this.$cookies.get('siteMstrId'),
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.all([
                    axios.post(urls.masterCode, {...payload, groupCode: 'APRV_OPTN_TYPE'}, options),
                    axios.post(urls.masterCode, {...payload, groupCode: 'DTY_CD'}, options),
                    axios.post(urls.masterCode, {...payload, groupCode: 'FINL_APRV_RST'}, options),
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.aprvOptnType  = response[0].data.data
                    this.advancedInfo.dtyCd         = response[1].data.data
                    this.advancedInfo.finlAprvRst   = response[2].data.data
                }))
                .then(() => {
                    this.fn_getAprrovedDoc()
                })
        },

        fn_toHtml: function (string) {
            return string ? string.split('\n').join('<br>') : ''
        },
        fn_getAprrovedDoc: function (inputPayload) {
            const url = '/sendApi/api/approv/approvedDoc/sheet'
            const payload = {
                ...inputPayload,
                // aprvInfoId: 'APRV_0000000396',
                aprvInfoId:         this.aprvDoc.aprvInfoId,
                aprvFileConnectId:  this.aprvDoc.aprvFileConnectId,
                fileType:           this.aprvDoc.fileType,
                // userId: this.aprvDoc.aprvUserId,
                // userId: this.userId
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)

                    this.dmApprvDoc     = response.data.datas.dmApprvDoc

                    this.dlHelpUser     = response.data.datas.dlHelpUser
                    this.dlCmtList      = response.data.datas.dlCmtList
                    this.dlApprvUser    = response.data.datas.dlApprvUser

                    this.attachments.fileRegistered = response.data.datas.dlAtchFile

                })
                .catch(error => {
                    console.error(error)
                    // throw new Error(error)
                })
                .then(() => {
                    /**  */

                    
                    this.dlApprvUser.forEach(user => {
                        user.dtyNm = this.advancedInfo.dtyCd.find(dty => dty.codeVal === user.dtyCd)?.codeNameKr
                    })

                    this.dmApprvDoc.dtyCd = this.dlApprvUser.find(user => Number(user.aprvOrder) === Number(this.dmApprvDoc.aprvProgrsOrder))?.dtyCd
                    this.dmApprvDoc.aprvState = !this.dlApprvUser.some(item => item.aprvState === 'N')

                    // this.dmApprvDoc.finlAprvType = 'PASS'
                    
                    if (this.aprvDoc.docType === 'dlHelpApprv') {
                        this.dmApprvDoc.helpCheckYn = this.dlHelpUser.find(user => user.helpUserId === this.userId).chckYn
                    }

                    this.dmApprvDoc.dtlComment = ''

                    // this.except.superVision.includes(this.dmApprvDoc.dtyCd)
                    this.dmApprvDoc.isInSuperVision = this.dlApprvUser.some(item => this.except.superVision.includes(item.dtyCd))
                    // this.dmApprvDoc.isInQualityTest = this.dlApprvUser.some(item => item.dtyCd === 'QLTY')

                    if (this.fn_isFinalApprove()) {
                        const payload = {
                            fileConnectId: this.dmApprvDoc.aprvInfoId,
                            fileType: 'FinalArcv'
                        }
                        this.fn_getFileList(payload, (data) => {
                            this.finalApproval.fileRegistered = data
                        })
                    }

                    // 예외처리 버튼 정보 입력

                    if (this.dmApprvDoc.docType === 'WEKM') {
                        this.reportWik = {
                            siteMstrId:     this.dmApprvDoc.siteMstrId,
                            reportWikId:    this.dmApprvDoc.aprvFileConnectId,
                        }
                    } else if (this.dmApprvDoc.docType === 'MNGT') {
                        this.reviewMngt = {
                            siteMstrId:     this.dmApprvDoc.siteMstrId,
                            reviewId:       this.dmApprvDoc.aprvFileConnectId,
                        }
                    } 
                    // else if (this.dmApprvDoc.docType === 'TEST'
                    //     && this.dmApprvDoc.codeType === 'TEST'
                    //     && this.dmApprvDoc.codeDtlType === 'REQT'
                    //     ) {

                    //     if (this.dmApprvDoc.aprvOptnType === 'ALLON') {

                    //     } else if (this.dmApprvDoc.aprvOptnType === 'HAFON'
                    //         || this.dmApprvDoc.aprvOptnType === 'OFFLN') {

                    //     }
                        
                    //     this.fn_fetchPredictDays()
                    // }

                    // if (this.fn_isShowPredictDays()) {
                    //     this.fn_fetchPredictDays()
                    // }

                    this.fn_setOzReport()                  
                    
                })

        },
        fn_getFileList: function (_payload, callback) {
            const url = '/sendApi/api/file/upFileList'
            const payload = {
                fileConnectId: this.dmApprvDoc.aprvFileConnectId,
                fileType: this.dmApprvDoc.fileType,
                ..._payload,
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)
                    if (callback) {
                        return callback(response.data.data)
                    } else {
                        this.attachments.fileRegistered = response.data.data
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },

        fn_processDoc: function () {
            //** validate */
            const aprvOrder = this.dmApprvDoc.nowAprvOrder || this.dmApprvDoc.aprvOrder


            // if(this.dlApprvUser.find(item => item.userId === this.userId)?.fileSgnArcvId ) {
            
                
            if (this.dmApprvDoc.aprvOptnType === 'ALLON' 
                && this.dmApprvDoc.docType === 'INPT'
                && this.dmApprvDoc.codeType === 'INPT'
                && this.dmApprvDoc.codeDtlType === 'CREQ'
                && this.except.superVision.includes(this.dlApprvUser[Number(aprvOrder)-1].dtyCd) ) {
                    
                this.fn_checkInspectStatus((result) => {
                    if (result) {
                        if(this.dlApprvUser[Number(aprvOrder) -1 ]?.fileSgnArcvId ) {
                            this.confirm('결재하시겠습니까?', () => {
                                this.fn_approveDoc()
                            })
                        } else {
                            // registAprovalSign
                            this.$bvModal.show('ApprovedDocView_sign')
                        }
                    } else {
                        this.alert('검측 통보서를 작성하셔야만 결재 승인이 가능합니다', () => {
                            this.fn_moveToInspection()
                        })
                        return
                    }
                })
            } else {
                if(this.dlApprvUser[Number(aprvOrder) -1 ]?.fileSgnArcvId ) {
                    this.confirm('결재하시겠습니까?', () => {
                        this.fn_approveDoc()
                    })
                } else {
                    // registAprovalSign
                    this.$bvModal.show('ApprovedDocView_sign')
                }

            }
            
        },
        fn_addSignId: function (fileSgnArcvId) {
            this.dlApprvUser[Number(this.dmApprvDoc.nowAprvOrder) -1].fileSgnArcvId = fileSgnArcvId
            // this.dlApprvUser.find(item => item.userId === this.userId).fileSgnArcvId = fileSgnArcvId
            // endState
            this.fn_approveDoc()
        },
        fn_approveDoc: function () {
            if (this.fn_isFinalApprove()) {
                if(!this.dmApprvDoc.finlAprvRst) {
                    this.alert('적합여부를 선택해주세요')
                    return
                }
            }
            const aprvOrder = this.dmApprvDoc.nowAprvOrder || this.dmApprvDoc.aprvOrder
            // console.log(aprvOrder)

            const url = '/sendApi/api/approv/approvedDoc/proc'
                const payload = {
                    ...this.dmApprvDoc,
                    aprvState:      'Y',
                    // finlAprvYn: 'Y',
                    aprvUserId:     this.$store.getters['auth/getUserId'],
                    userId:         this.dlApprvUser[Number(this.dmApprvDoc.nowAprvOrder) -1].userId,
                    aprvOrder:      Number(this.dmApprvDoc.aprvProgrsOrder)+1,
                    // aprvOrder, userId

                    comment:        this.dmApprvDoc.comment ? this.dmApprvDoc.comment : undefined,
                    finlAprvRst:    this.dmApprvDoc.finlAprvRst,
                    endDate:        this.dmApprvDoc.endDate,
                    // fileSgnArcvId:  this.dlApprvUser.find(item => item.userId === this.userId).fileSgnArcvId,
                    fileSgnArcvId:  this.dlApprvUser[Number(this.dmApprvDoc.nowAprvOrder) -1].fileSgnArcvId,

                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                // agncyAprvYn 대결여부
                // aprvOrder
                axios.post(url, payload, options)
                    .then(response => {
                        // console.log(response)
                        if (response.status === 200) {
                            // if (this.dmApprvDoc.aprvProgrsOrder === this.dmApprvDoc.finlManagerOrder && this.dmApprvDoc.aprvOptnType === 'ALLON') {
                            //     // fn_exterminateProcess
                            //     this.fn_exterminateProcess()
                            // } else {
                            //     this.alert('승인에 성공하셨습니다', () => {
                            //         // 성공 후 행동
                            //     })
                            // }

                            /** 통합알림 예외 케이스 */
                            // if (this.dmApprvDoc.docType === 'NCFM' 
                            //     && this.dmApprvDoc.codeType === 'NCFM'
                            //     && (this.dmApprvDoc.codeDtlType === 'CAR' || this.dmApprvDoc.codeDtlType === 'NCR') 
                            //     && (this.dlApprvUser[Number(aprvOrder)-1].dtyCd === 'HDCH')) {
                            //         this.fn_fetchNoCnfmInfoView ( (receiver) => {
                            //             if (receiver) {
                            //                 this.fn_sendMessage({
                            //                     messageCode:    'A036',
                            //                     reciveUserId:  receiver,
                            //                     userId:         this.dmApprvDoc.drafterId
                            //                 })
                            //             }
                            //         })
                            //     }

                            if (this.fn_isFinalApprove()) {
                                if (this.finalApproval.files.length > 0) {
                                    this.fn_setFiles(this.dmApprvDoc.aprvInfoId, this.finalApproval.files, 'FinalArcv', () => {
                                        // this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                                        // this.fn_exterminateProcess()
                                        this.fn_processDocFinal()
                                        // if (this.dmApprvDoc.finlManagerOrder === this.dmApprvDoc.nowAprvOrder) {
                                        //     this.fn_processDocFinal()
                                        // } else {
                                        //     this.fn_exterminateProcess()
                                        // }
                                    })

                                } else {
                                    // this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                                    // this.fn_exterminateProcess()
                                    // this.fn_processDocFinal()
                                    this.fn_processDocFinal()
                                    // if (this.dmApprvDoc.finlManagerOrder === this.dmApprvDoc.nowAprvOrder) {
                                    //     this.fn_processDocFinal()
                                    // } else {
                                    //     this.fn_exterminateProcess()
                                    // }
                                }
                                
                            } else {
                                if (this.except.docType.includes(this.dmApprvDoc.docType) 
                                    && this.aprvDoc.docType === 'dlMyApprv' 
                                    && this.dmApprvDoc.finlManagerOrder === aprvOrder) {
                                        this.fn_exterminateProcess()
                                    // && (this.dmApprvDoc.isInSuperVision 
                                    //     ? this.except.superVision.includes(this.dlApprvUser[Number(this.dmApprvDoc.nowAprvOrder) -1].dtyCd)
                                    //     : this.dmApprvDoc.finlManagerOrder === this.dmApprvDoc.nowAprvOrder)) {
                                    // this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                                    // this.fn_exterminateProcess()
                                    // this.fn_processDocFinal()
                                } else if ( this.dmApprvDoc.aprvOptnType === 'ALLON'
                                    && this.aprvDoc.docType === 'dlMyApprv' 
                                    && this.dmApprvDoc.finlManagerOrder === aprvOrder) {
                                    this.fn_exterminateProcess()
                                } else {
                                    this.alert('결재 완료했습니다.', () => {
                                        // 성공 후 행동
                                        this.fn_sendMessage({
                                            messageCode:    this.dmApprvDoc.aprvOptnType === 'HAFON' && this.dmApprvDoc.finlManagerOrder === aprvOrder
                                                                ? 'A070'
                                                                : 'A071',
                                            reciveUserId:   this.dmApprvDoc.finlManagerOrder === aprvOrder
                                                                ? this.dlApprvUser[0].userId
                                                                : this.dlApprvUser[Number(aprvOrder)].userId
                                        })

                                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name)
                                        this.$router.push({name: 'ApprovedDocSheet'})
                                    })
                                }
                                
                            }

                            // if (this.finalApproval.files.length > 0) {
                            //     this.fn_setFiles( , this.finalApproval.files, )
                            // }
                            
                            // if ( this.dmApprvDoc.aprvOptnType === 'ALLON' && this.dmApprvDoc.aprvProgrsOrder === this.dmApprvDoc.finlManagerOrder ) {
                            //     this.fn_exterminateProcess()
                            // } else {
                            //     this.alert('승인에 성공하셨습니다.' , () => {
                            //         this.$router.push({name: 'ApprovedDocSheet'})
                            //     })
                            // }

                        } 
                    })
                    .catch(() => {
                        this.alert('결재에 실패했습니다.')
                    })
                    // .finally(() => {
                    //     this.$store.dispatch('tabInfo/setSavePage',this.$route.name)
                    // })

            /** 검측인 경우 처리 */
            if (this.dmApprvDoc.docType === 'INPT'
                && this.dmApprvDoc.codeType === 'INPT'
                && this.userId === this.fn_getLastApproverDtyCd('HDCH')?.aprvUserId) {
                    this.fn_approveInspectManager()
                }
            
            /** 시험결과인 경우 처리 */
            // if (this.fn_isShowPredictDays()) {
            //     this.fn_setPredictDays()
            // }
        },

        fn_returnDoc: function () {
            this.confirm('반려하시겠습니까?', () => {
                if (!this.fn_isNotEmpty(this.rtrn.retnResnCn)) {
                    this.alert('결재자 의견을 작성해주세요.' )
                    return
                }

                const url = '/sendApi/api/approv/approvedDoc/retn'
                const payload = {
                    // ...this.dmApprvDoc,
                    ...this.dlApprvUser.findLast(item => item.aprvUserId === this.userId ),
                    retnResnCn: this.rtrn.retnResnCn,
                    aprvState: 'R'
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
    
                axios.post(url, payload, options)
                    .then(response => {
                        // console.log(response)
                        if (response.status === 200) {
                            // this.fn_exterminateProcess()
                            // this.alert('반려되었습니다.', () => {
                            //     this.$router.push({ name: 'ApprovedDocSheet' })
                            //     this.$bvModal.hide('rtrnComment')
                            // })
                            this.fn_exterminateProcess(undefined, 'R')
                        } else {
                            throw new Error('fn_returnDoc')
                        }
                    })
                    .catch(error => {
                        console.error(error)
                    })
                    // .finally(() => {
                    //     this.$store.dispatch('tabInfo/setSavePage',this.$route.name)
                    // })

            })
        },
        /** 최종승인 버튼 시 처리 */
        fn_beforeFinalProcess: function () {

            if (this.finalApproval.files.length + this.finalApproval.fileRegistered.length === 0) {
                this.alert('최종승인 전, 결재서류 스캔본 업로드를 해주세요')
                return
            }
            this.confirm('최종승인하시겠습니까?', this.fn_finalProcess )
        },

        fn_finalProcess: function () {
            if (this.finalApproval.files.length > 0)  {
                this.fn_setFiles(this.dmApprvDoc.aprvInfoId, this.finalApproval.files, 'FinalArcv', () => {
                    this.fn_processDocFinal()
                })
            } else {
                this.fn_processDocFinal()
            }
        },

        fn_processDocFinal: function () {
            // validate
            if (!this.dmApprvDoc.finlAprvRst) {
                this.alert('적합여부가 선택되지 않았습니다.')
                return
            }
            if (!this.dmApprvDoc.endDate && this.dmApprvDoc.aprvOptnType !== 'ALLON' ) {
                this.alert('완료 처리 일자가 선택되지 않았습니다.')
                return
            }
            
            
            const url = '/sendApi/api/approv/approvedDocFinl/proc'
            const payload = {
                aprvInfoId:     this.aprvDoc.aprvInfoId,
                finlAprvRst:    this.dmApprvDoc.finlAprvRst,
                comment:        this.dmApprvDoc.comment ? this.dmApprvDoc.comment : undefined,
                endDate:        this.dmApprvDoc.endDate ? this.dmApprvDoc.endDate : undefined,
                finlAprvYn:     this.dmApprvDoc.aprvOptnType === 'ALLON'  && (this.dmApprvDoc.finlManagerOrder !== this.dmApprvDoc.nowAprvOrder)
                                    ? 'N'
                                    : undefined
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(() => {
                    // finalApproval.files

                    if (this.dmApprvDoc.finlManagerOrder === this.dmApprvDoc.nowAprvOrder || this.dmApprvDoc.finlManagerOrder === this.dmApprvDoc.aprvOrder ) {
                        this.fn_exterminateProcess()
                    } else {
                        this.alert('결재 승인되었습니다.', () => {
                            
                            this.fn_sendMessage({
                                messageCode:    'A069',
                                reciveUserId:  this.dlApprvUser[Number(this.dmApprvDoc.nowAprvOrder)].userId
                            })
                            this.$store.dispatch('tabInfo/setSavePage',this.$route.name)
                            this.$router.push({ name: 'ApprovedDocSheet' })
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
            
            /** 시험 최종승인 - 예정일 변경요청(Half, Off) */
            // if (this.fn_isShowPredictDays()) {
            //     this.fn_setPredictDays()
            // }
        },

        fn_exterminateProcess: function (finlAprvYn = undefined, flag = undefined) {
            const url = '/sendApi/api/approved/final/change'
            const payload = {
                aprvInfoId:     this.aprvDoc.aprvInfoId,
                comment:        this.dmApprvDoc.comment,
                finlAprvRst:    this.dmApprvDoc.finlAprvRst,
                endDate:        this.dmApprvDoc.endDate ? this.dmApprvDoc.endDate : undefined,
                rejectFlag:     flag === 'C' ? 'R' : flag,
                finlAprvYn:     finlAprvYn,
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200 ) {
                        let alertMsg = ''
                        switch(flag) {
                            case 'R': 
                                alertMsg = '결재가 반려되었습니다.'
                                break
                            case 'C':
                                alertMsg = '기안이 취소되었습니다.'
                                break
                            default:
                                alertMsg = this.dmApprvDoc.aprvOptnType === 'ALLON'
                                            ? '결재 승인되었습니다.'
                                            : '결재 완료되었습니다.'
                                break
                        }

                        /** 부적합 통합알림 예외 케이스 */
                        if (this.dmApprvDoc.docType === 'NCFM'
                            && this.dmApprvDoc.codeType === 'NCFM'
                            && (this.dmApprvDoc.codeDtlType === 'CAR' || this.dmApprvDoc.codeDtlType === 'NCR')
                            && !['R', 'C'].includes(flag)) {
                                
                            this.fn_fetchNoCnfmInfoView((receiver) => {
                                if (receiver) {
                                    this.fn_sendMessage({
                                        messageCode:    'A036',
                                        reciveUserId:   receiver,
                                        userId:         this.dmApprvDoc.drafterId
                                    })
                                }
                            })
                        }

                        // const aprvOrder = this.dmApprvDoc.nowAprvOrder || this.dmApprvDoc.aprvOrder

                        /** 시험 품질의뢰서 등록시 메일처리 */
                        if (this.dmApprvDoc.docType === 'TEST'
                            && this.dmApprvDoc.codeType === 'TEST'
                            && this.dmApprvDoc.codeDtlType === 'REQT'
                            && !['R', 'C'].includes(flag)) {

                            this.fn_sendMessage({
                                messageCode: 'A076',
                                aprvInfoId:  this.aprvDoc.aprvInfoId
                            })
                        }


                        // this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                        this.alert(alertMsg, () => {
                            if ((this.dmApprvDoc.aprvOptnType === 'ALLON' || this.dmApprvDoc.aprvOptnType === 'HAFON') && flag !== 'C' ) {
                                const code      = flag === 'R'
                                                    ? 'A072'
                                                    : 'A071'
                                const receiver  = this.dmApprvDoc.drafterId
                                this.fn_sendMessage({
                                    messageCode:    code,
                                    reciveUserId:   receiver,
                                })
                            }
                            this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                            this.$router.push({ name: 'ApprovedDocSheet' })
                        })
                    } else {
                        throw new Error('fn_exterminateProcess')
                    }
                })
                .catch(error => {
                    console.error(error)
                    // this.alert(flag === 'R' ? '반려에 실패했습니다.' :'결재에 실패했습니다.')
                })
                // .finally(() => {
                //     this.$store.dispatch('tabInfo/setSavePage',this.$route.name)
                // })
        },
        fn_isFinalApproveBtn: function () {
            return  (this.dmApprvDoc.aprvOptnType === 'HAFON' 
                        && this.dmApprvDoc.lastAprvOrder === this.dmApprvDoc.aprvOrder 
                        && this.dmApprvDoc.aprvProgrsState !== 'R'
                    )
                    || (this.dmApprvDoc.aprvOptnType === 'OFFLN')
        },
        fn_clickConfirm: function () {
            // console.log('click confirm')

            const url = '/sendApi/api/approv/approvedDocHelp/proc'
            const payload = {
                aprvInfoDtlId: this.dlHelpUser.find(item => String(item.helpUserId) === String(this.userId)).aprvInfoDtlId
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200) {
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name)
                        this.$router.push({ name: 'ApprovedDocSheet' })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_clickDraftCancel: function () {

            const url = '/sendApi/api/approv/approvedDoc/delete'
            const payload = {
                dmApprvDoc:     this.dmApprvDoc,
                dlApprvUser:    this.dlApprvUser,
                dlHelpUser:     this.dlHelpUser
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    
                    if (response.status === 200) {
                        this.fn_exterminateProcess(undefined, 'C')
                    } else {
                        throw new Error('draftCancel_error')
                    }
                })
                .catch(error => {
                    console.error(error)
                    // alert
                })
        },

        fn_isFinalApprove: function () {
            if (this.dmApprvDoc.aprvProgrsState === 'R') {
                return false
            } else {
                if (this.dmApprvDoc.aprvOptnType === 'ALLON') {
                    // return  !(this.except.docType.includes(this.dmApprvDoc.docType))
                    //             && (this.aprvDoc.docType === 'dlMyApprv' 
                    //                 && (this.dmApprvDoc.isInSuperVision 
                    //                     ? this.except.superVision.includes(this.dlApprvUser[Number(this.dmApprvDoc.nowAprvOrder) -1].dtyCd)
                    //                     : this.dmApprvDoc.finlManagerOrder === this.dmApprvDoc.nowAprvOrder))

                    return  !(this.except.docType.includes(this.dmApprvDoc.docType))
                                && (this.aprvDoc.docType === 'dlMyApprv' 
                                    && (this.except.superVision.includes(this.dlApprvUser[Number(this.dmApprvDoc.nowAprvOrder) -1].dtyCd)))
                                        
                } else if (this.dmApprvDoc.aprvOptnType === 'HAFON') {
                    return  !(this.except.docType.includes(this.dmApprvDoc.docType))
                                && (this.aprvDoc.docType === 'dlMyDrft' && this.dmApprvDoc.aprvState)
                } else {    
                    return  !(this.except.docType.includes(this.dmApprvDoc.docType))
                                && (this.aprvDoc.docType === 'dlMyDrft' && this.dmApprvDoc.aprvState)
                }
            }

            // return  !(this.except.docType.includes(this.dmApprvDoc.docType))
            //             && (this.aprvDoc.docType === 'dlMyDrft' && this.dmApprvDoc.aprvState ) 
            //                 || (this.aprvDoc.docType === 'dlMyApprv' && this.except.superVision.includes(this.dmApprvDoc.dtyCd))
        },
        
        fn_isNotEmpty: function (obj) {
            return !(obj === null || obj === undefined || String(obj).trim() === '')
        },
        fn_getParamFromObj: function (obj) {
            return Object.keys(obj)
                        .filter(item => obj[item] !== null && obj[item] !== undefined)
                        .map(item => `${item}=${obj[item]}`)
                        .join('&')
        },
        fn_toPascalCase: function (str) {
            return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase())
        },
        fn_setFiles: function (fileConnectId, files, fileType, callback) {
            const url = '/sendApi/api/fileUp/fileUploads'

            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }
            const formData = new FormData()
            formData.append('fileConnectId', fileConnectId)
            formData.append('fileType', fileType)
            files.forEach(file => formData.append('file', file))
            
            axios.post(url, formData, options)
                .then(response => {
                    if(response.status === 200 ) {
                        if (callback) return callback()
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_linkDetail: function () {

            switch(this.dmApprvDoc.docType) {
                case 'QLTY': {
                    this.$store.dispatch('setInformation', {
                        siteMstrId: this.dmApprvDoc.siteMstrId,
                        hasYearList: true,
                    })
                    window.open(this.$router.resolve({ name : 'QualityPolicyAllSite', }).href,'_blank');
                    break
                }
                case 'QISP': {
                    // 모달 처리
                    this.$bvModal.show('approvedDocView_selfQualityFinalModal')
                    break
                }
                case 'MNGT': {
                    this.$bvModal.show('approvedDocView_reviewDetailPop')
                    break
                }
                case 'WEKM': {
                    this.$bvModal.show('approvedDocView_reportWikDetailPop')
                    break
                }
                default: 
                    break
            }
        },

        /** DtyCd Last 인원확인 */
        fn_getLastApproverDtyCd: function (dtyCd) {
            // const lastApprover      = this.dlApprvUser.sort((a, b) => Number(a.aprvOrder) - Number(b.aprvOrder))
            //                             .findLast(item => String(item.dtyCd) === String(dtyCd))
            const lastApprover  = _.sortBy(this.dlApprvUser, 'aprvOrder')
                                    .findLast(item => String(item.dtyCd) === String(dtyCd))
            
            return lastApprover
        },
        /** 검측확인 */
        fn_approveInspectManager: function () {
            const url = '/sendApi/api/inptMngt/inptSttus/inptSttusResultNtcdoc/change'
            const payload = {
                aprvInfoId: this.aprvDoc.aprvInfoId,
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }
            
            axios.post(url, payload, options)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('fn_approveInspectmanager')
                    }
                })
                .catch(() => {
                    // console.error(error)
                    // this.alert('')
                })
        },
        fn_checkInspectStatus: function (callback) {
            const url = '/sendApi/api/inptMngt/inptSttus/inptSttusResultNtcdoc/view'
            const payload = {
                aprvInfoId: this.aprvDoc.aprvInfoId,
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)
                    // 조건: 검측 / status / 감리
                    // if (response.status === 200
                    //     && response.data.datas.dmStatusChk.progrsSttus)
                    
                    if (response.status === 200) {
                        // if (response.data.datas.dmStatusChk?.progrsSttus === 'SVRV') {
                        //     if(callback) return callback(response)
                        // } 

                        if (callback) return callback(response.data.datas.dmStatusChk?.progrsSttus === 'APVL')
                        
                    } {
                        throw new Error('fn_checkInspectStatus')
                    }
                })
                .catch(error => {
                    console.error(error)
                })
                .finally(() => {

                })
        },
        fn_moveToInspection: function () {
            const inspectionUrl = '/view/inspectMngt/inspectMngt/info/sheet'

            if (this.siteMstrId === this.dmApprvDoc.siteMstrId) {
                this.goToPage(inspectionUrl)
            } else {
                this.confirm('프로젝트 변경이 필요합니다.', () => {
                    const projectListUrl = '/sendApi/api/popup/newMySitesProject/list'
                    const options = {
                        headers : {
                            'Authorization': this.$cookies.get('Authorization'),
                            'Content-Type': 'application/json',
                            'Accept-Language': 'ko'
                        },
                    }

                    axios.post(projectListUrl, {}, options)
                        .then(response => {
                            if (response.status === 200) {
                                const result = response.data.data.find(siteInfo => siteInfo.siteMstrId === this.dmApprvDoc.siteMstrId)
                                if (result) {
                                    const infoObj = {
                                        projectId:  result.projectId,
                                        projectNm:  result.projectNm,
                                        siteId:     result.siteId,
                                        siteNm:     result.siteNm,
                                        siteMstrId: result.siteMstrId,
                                        baseType:   result.baseType,
                                        baseTypeNm: result.baseTypeNm,
                                        csrtType:   result.csrtType,
                                        csrtTypeNm: result.csrtTypeNm,
                                    }

                                    this.$cookies.set('projectId',      result.projectId)
                                    this.$cookies.set('projectName',    result.projectName)
                                    this.$cookies.set('siteId',         result.siteId)
                                    this.$cookies.set('siteMstrId',     result.siteMstrId)
                                    
                                    this.$store.dispatch('ui/setProjectName', result.projectNm)
                                    this.$store.dispatch('auth/setProjectInfo', infoObj)

                                    this.$session.set('userInfo', this.$store.getters['auth/getAuth'])

                                    this.goToPage(inspectionUrl)
                                }
                            } else {
                                throw new Error('fn_moveToInspection')
                            }
                        })
                        .catch(error => {
                            console.log('fn_moveToInspection Error : %o', error)
                        })
                })
            }
        },
        /** 시험 */
        fn_fetchPredictDays: function () {
            const url = '/sendApi/api/testMngt/testResultMngt/rceptProgrsWaitDaycnt/view'
            const payload = {
                aprvInfoId: this.aprvDoc.aprvInfoId
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)
                    if (response.status === 200 && response.data?.dmData) {
                        this.testResult.rceptProgrsWaitDaycnt   = response.data.dmData.rceptProgrsWaitDaycnt 
                                                                    ? Number(response.data.dmData.rceptProgrsWaitDaycnt)
                                                                    : ''
                    } else {
                        throw new Error('fn_fetchPredictDays')
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_setPredictDays: function () {
            const url = '/sendApi/api/testMngt/testResultMngt/rceptProgrsWaitDaycnt/change'
            const payload = {
                aprvInfoId:             this.aprvDoc.aprvInfoId,
                rceptProgrsWaitDaycnt:  this.testResult.rceptProgrsWaitDaycnt,
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)
                    if (response.status !== 200) {
                        throw new Error('fn_setPredictDays')
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_pressKeyRceptProgrsWaitDaycnt: function (e, variable, maxlength) {
            const path = variable.split('.')
            const _variable = path.pop()
            let obj = this
            path.forEach(item => {
                obj = obj[item]
            })

            const before = obj[_variable]
            const value = String(e.target.value).replace(/[^0-9]/,'')
            if (value === '') {
                obj[_variable] = before
            } else {
                if (String(value).length <= maxlength) {
                    obj[_variable] = Number(value)
                }
            }
            this.$forceUpdate()
        },
        fn_isShowPredictDays: function () {
            if (this.dmApprvDoc.docType === 'TEST'
                && this.dmApprvDoc.codeType === 'TEST'
                && this.dmApprvDoc.codeDtlType === 'REQT') {

                if (this.dmApprvDoc.aprvOptnType === 'ALLON') {
                    return (this.aprvDoc.docType === 'dlMyDrft' && this.dlApprvUser.some(item => String(item.dtyCd) === 'QLTY'))
                        || (this.aprvDoc.docType === 'dlMyApprv' && this.dlApprvUser[Number(this.dmApprvDoc.nowAprvOrder) -1].dtyCd === 'QLTY')
                } else {
                    return (this.aprvDoc.docType === 'dlMyDrft' && this.dmApprvDoc.aprvState)
                }
            } else {
                return false
            }
        },

        /** Oz처리 */
        fn_setOzReport: function () {

            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }
            const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
            switch(this.dmApprvDoc.docType) {
                case 'MTRL' : {
                    switch(this.dmApprvDoc.codeType) {
                        case 'MTRL' : {
                            switch(this.dmApprvDoc.codeDtlType) {
                                case 'MREQ': {
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][6].jspNm
                                                            + [
                                                                `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                `mtrlSpApprId=${this.dmApprvDoc.aprvFileConnectId}`,
                                                            ]
                                                            .join('&')
                                    break
                                }
                                case 'TSAC': {
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][12].jspNm
                                                            + [
                                                                `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                `mtrlAccpTsId=${this.dmApprvDoc.aprvFileConnectId}`
                                                            ].join('&')
                                    break
                                }
                                case 'TSFC': {

                                    const ozPayload = {
                                        mtrlFtryTsId: this.dmApprvDoc.aprvFileConnectId,
                                        siteMstrId: this.dmApprvDoc.siteMstrId,
                                    }
                                    axios.post('/sendApi/api/quality/materialSiteCheck/factoryTest/view', ozPayload, options)
                                        .then(response => {
                                            // console.log(response)
                                            this.ozReport.src   =  (response.data.data.rmcYn === 'Y' 
                                                                        ? this.$store.getters['auth/getOzTypeList'][13].jspNm 
                                                                        : this.$store.getters['auth/getOzTypeList'][14].jspNm)
                                                                    + [
                                                                        `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                        `mtrlFtryTsId=${this.dmApprvDoc.aprvFileConnectId}`
                                                                    ].join('&')
                                        })
                                        .catch(error => {
                                            console.error(error)
                                        })


                                    break
                                }
                                default: {
                                    
                                    
                                    break
                                }

                            }


                            break
                        }
                        default: {
                            break
                        }
                    }
                    break
                }
                case 'CRCK': {
                    switch(this.dmApprvDoc.codeType) {
                        case 'CRCK': {
                            switch(this.dmApprvDoc.codeDtlType) {
                                case 'CRCK': {
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][25].jspNm
                                                            + [
                                                                `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                `aprvInfoId=${this.dmApprvDoc.aprvInfoId}`,
                                                                `crckMngtInfoId=${this.dmApprvDoc.aprvFileConnectId}`
                                                            ].join('&')
                                    break
                                }
                                default: {
                                    break
                                }
                            }
                            break
                        }
                        default: {
                            break
                        }
                    }

                    break
                }
                case 'CCRT': {
                    switch(this.dmApprvDoc.codeType) {
                        case 'CCRT': {
                            switch(this.dmApprvDoc.codeDtlType) {
                                case 'STRG': {
                                    const ozPayload = {
                                        concCompStrgLstId: this.dmApprvDoc.aprvFileConnectId
                                    }
                                    axios.post('/sendApi/api/concrete/strgMngt/type', ozPayload, options)
                                        .then(response => {
                                            this.ozReport.src   =   (
                                                                        ['7D', '28D'].includes(response.data.data.strgTestType) ? this.$store.getters['auth/getOzTypeList'][22].jspNm
                                                                            : ['91D'].includes(response.data.data.strgTestType) ? this.$store.getters['auth/getOzTypeList'][23].jspNm
                                                                            : ['VERTICAL', 'HORIZONTAL', 'FILLER_SUPPORT'].includes(response.data.data.strgTestType) ? this.$store.getters['auth/getOzTypeList'][24].jspNm
                                                                            : ''
                                                                    )
                                                                    + [
                                                                        `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                        `aprvInfoId=${this.dmApprvDoc.aprvInfoId}`,
                                                                        `concCompStrgLstId=${this.dmApprvDoc.aprvFileConnectId}`
                                                                    ].join('&')
                                        })
                                    
                                    break
                                }
                                case 'CONC': {
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][16].jspNm
                                                            + [
                                                                `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                `aprvInfoId=${this.dmApprvDoc.aprvInfoId}`,
                                                                `concPourDtlId=${this.dmApprvDoc.aprvFileConnectId}`
                                                            ].join('&')
                                    break
                                }
                                default: {
                                    break
                                }
                            }


                            break
                        }


                        default: {
                            break
                        }
                    }

                    break
                }
                case 'NCFM': {
                    switch(this.dmApprvDoc.codeType) {
                        case 'NCFM': {
                            switch(this.dmApprvDoc.codeDtlType) {
                                case 'CAR':
                                case 'NCR': {
                                    axios.post('/sendApi/api/noCnfmMngt/noCnfmInfo/view', {noCnfmInfoId: this.dmApprvDoc.aprvFileConnectId} ,options)
                                        .then(response => {
                                            // console.log(response)
                                            this.ozReport.src   = (this.dmApprvDoc.codeDtlType == 'CAR' ? 
                                                                        this.$store.getters['auth/getOzTypeList'][30].jspNm : 
                                                                        this.$store.getters['auth/getOzTypeList'][31].jspNm )
                                                                    + [
                                                                        `&noCnfmInfoId=${this.dmApprvDoc.aprvFileConnectId}`, 
                                                                        // `aprvInfoId=${this.dmApprvDoc.aprvInfoId}`, 
                                                                        `aprvInfoId=${response.data.view?.aprvInfoId !== null ? response.data.view.aprvInfoId : this.dmApprvDoc.aprvInfoId}`,
                                                                        `aprvInfoId2=${response.data.view?.aprvInfoId2 !== null ? response.data.view.aprvInfoId2 : ''}`,
                                                                        `siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                    ].join('&')
                                                                        
                                        })
                                        .catch(() => {
                                            // console.error(error)
                                        })
                                        
                                    break
                                }
                                default: {
                                    break
                                }
                            }

                            break
                        }
                    }
                    break
                }
                case 'TEST': {
                    switch(this.dmApprvDoc.codeType) {
                        case 'TEST': {
                            axios.post('/sendApi/api/testMngt/testResultMngt/testSubjectDetail/list', {testResultMngtSeq: this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0], siteMstrId: this.dmApprvDoc.siteMstrId} ,options)
                                .then(response => {
                                    const dmTestDetail = response.data.datas.dmTestDetail
                                    
                                    if (this.dmApprvDoc.codeDtlType === 'REQT' 
                                        &&  ((this.dmApprvDoc.aprvInfoId === dmTestDetail.rqstodcAprvInfoId)
                                            || (['RQPR', 'RQRP', 'RQRA', 'RQRE'].includes(String(dmTestDetail.resultProgrsStatus))
                                                && !['TTRG'].includes(String(dmTestDetail.resultProgrsStatus))))) {
                                        this.dmApprvDoc.docName = '품질검사 의뢰서'
                                        this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][5].jspNm
                                                                + [
                                                                    `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                    `userId=${this.dmApprvDoc.drafterId}`,
                                                                    `testResultMngtSeq=${this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0]}`,
                                                                    `aprvInfoId=${this.dmApprvDoc.aprvInfoId}`
                                                                ].join('&')
                                    } else if (this.dmApprvDoc.codeDtlType === 'SITE' 
                                        || this.dmApprvDoc.codeDtlType === 'FTRY' 
                                        || (this.dmApprvDoc.codeDtlType === 'REQT'
                                            && ((this.dmApprvDoc.aprvInfoId === dmTestDetail.resultAprvInfoId)
                                                || ['TTPR', 'RGPR', 'APRV', 'APRE'].includes(dmTestDetail.resultProgrsStatus)))) {
                                        this.dmApprvDoc.docName = '시험성과 대비표'
                                        this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][1].jspNm
                                                                + [
                                                                    `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                    // `userId=${this.dmApprvDoc.drafterId}`,
                                                                    `resultProgrsStatus=${dmTestDetail.resultProgrsStatus}`,
                                                                    `testResultMngtSeq=${this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0]}`
                                                                ].join('&')
                                    }
                                    

                                    // const resultProgrsStatus = response.data.datas.dmTestDetail.resultProgrsStatus
                                    // if (this.dmApprvDoc.codeDtlType === 'REQT' 
                                    //     && resultProgrsStatus !== 'TTPR' && resultProgrsStatus !== 'RGPR') {
                                    //         this.ozReport.src   = url
                                    //                                 + '/qulityTestRqstdoc.jsp?'
                                    //                                 + [
                                    //                                     `siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                    //                                     `userId=${this.dmApprvDoc.drafterId}`,
                                    //                                     `testResultMngtSeq=${this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0]}`
                                    //                                 ].join('&')

                                    // } else if (this.dmApprvDoc.codeDtlType === 'SITE' 
                                    //     || this.dmApprvDoc.codeDtlType === 'FTRY' 
                                    //     || (this.dmApprvDoc.codeDtlType === 'REQT' && (resultProgrsStatus === 'TTPR' || resultProgrsStatus === 'RGPR'))) {
                                    //         this.ozReport.src   = url
                                    //                                 + '/siteTestResultMngtPrepare.jsp?'
                                    //                                 + [
                                    //                                     `siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                    //                                     // `userId=${this.dmApprvDoc.drafterId}`,
                                    //                                     `resultProgrsStatus=${resultProgrsStatus}`,
                                    //                                     `testResultMngtSeq=${this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0]}`
                                    //                                 ].join('&')
                                    // }
                                })
                                .catch(error => {
                                    console.error(error)
                                })


                            // switch(this.dmApprvDoc.codeDtlType) {
                            //     case 'REQT': {
                            //         this.ozReport.src   = url
                            //                                 + '/qulityTestRqstdoc.jsp?'
                            //                                 + [
                            //                                     `siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                            //                                     `userId=${this.dmApprvDoc.drafterId}`,
                            //                                     `testResultMngtSeq=${this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0]}`
                            //                                 ].join('&')
                            //         break
                            //     }
                            //     case 'SITE':
                            //     case 'FTRY':
                            //         axios.post('/sendApi/api/testMngt/testResultMngt/testSubjectDetail/list', {testResultMngtSeq: this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0], siteMstrId: this.dmApprvDoc.siteMstrId} ,options)
                            //             .then(response => {
                            //                 console.log(response)
                            //                 this.ozReport.src   = url
                            //                                         + '/siteTestResultMngtPrepare.jsp?'
                            //                                         + [
                            //                                             `siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                            //                                             // `userId=${this.dmApprvDoc.drafterId}`,
                            //                                             `resultProgrsStatus=${response.data.datas.dmTestDetail.resultProgrsStatus}`,
                            //                                             `testResultMngtSeq=${this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0]}`
                            //                                         ].join('&')

                            //             })
                            //             .catch(error => {
                            //                 console.error(error)
                            //             })

                            //         break
                            //     default: {
                            //         break
                            //     }
                            // }
                            break
                        }
                        default: {
                            break
                        }
                    }
                    break
                }
                case 'INPT': {
                    switch(this.dmApprvDoc.codeType) {
                        case 'INPT': {
                            switch(this.dmApprvDoc.codeDtlType) {
                                default: {
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][27].jspNm
                                                            + [
                                                                `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                `siteInptDetailId=${this.dmApprvDoc.aprvFileConnectId}`,
                                                            ].join('&')
                                    break
                                }
                            }
                            break
                        }
                        default: {
                            break
                        }
                    }
                    break
                }
                case 'QLTY' :{
                    switch(this.codeType){
                        default: {
                            switch(this.codeDtlType) {
                                default: {
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][0].jspNm
                                                            + [
                                                                `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                `qltyPlcyInfoId=${this.dmApprvDoc.aprvFileConnectId}`,
                                                            ].join('&')
                                    break
                                }
                            }
                            break
                        }
                    }
                    break
                }
                default: {

                    break
                }
            }
        },

        fn_changeAprvUser: function (aprvOrder) {
            // console.log(user)
            this.aprvUserChange.aprvOrder = Number(aprvOrder)
            this.$bvModal.show('ApprovedDocView_lineChange')
            
        },

        /** 통합 메세지 */
        fn_sendMessage: function (_payload) {
            const url       = '/sendApi/api/messageMngt/message/send'
            const payload   = {
                                messageCode:    ''    ,
                                userId:         this.userId,
                                projectId:      this.dmApprvDoc.projectId,
                                projectName:    this.dmApprvDoc.projectNm,
                                siteMstrId:     this.dmApprvDoc.siteMstrId,
                                // reciveUserId:
                                // reciveuserIds:
                                docSeq:         this.dmApprvDoc.docSeq,

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
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('fn_sendMessage')
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.alert('발송에 실패했습니다.')
                })
                .finally(() => {
                })
        },
        /** 부적합 처리 */
        fn_fetchNoCnfmInfoView: function (callback) {
            const url       = '/sendApi/api/noCnfmMngt/noCnfmInfo/view'
            const payload   = {
                noCnfmInfoId: this.dmApprvDoc.aprvFileConnectId,
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200) {
                        if (callback) return callback(response.data.view.actnUser)
                    } else {
                        throw new Error('fn_fetchNoCnfmInfoView')
                    }
                })
                .catch(error => {
                    console.error(error)
                })

        },


    },
    data () {
        return {
            /** simple case */
            dmApprvDoc: {},
            dlHelpUser: [],
            dlCmtList: [],
            dlApprvUser: [],
            

            attachments: {
                fileRegistered: [],
                files: [],
                requestForDelete: [],
            },

            finalApproval: {
                date: null,
                comment: null,
                fileRegistered: [],
                files: [],
            },

            advancedInfo: {
                aprvOptnType: [],
                dtyCd: [],
                finlAprvRst: [],
            },

            rtrn: {
                retnResnCn: '',
            },

            ozReport: {
                src: ''
            },

            except: {
                superVision: [ 'SPRV', 'RPRV' ],
                // docType: ['WEKM', 'MNGT', 'QLTY', 'QISP']
                docType: ['WEKM', 'MNGT', 'QISP']
            },

            aprvUserChange: {
                aprvOrder: 0
            },

            // 주간업무보고
            reportWik: {},
            // 경영검토
            reviewMngt: {},
            // 검측
            testResult: {
                rceptProgrsWaitDaycnt: ''
            },
            
            

        }
    },
}
</script>

<style lang="scss" >
.iframe-height {
    height: 1000px;
}

 #scan {
    span {
        position: relative;
        display: inline-block;
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        &::after {
            content: "";
            display: inline-block;
            width: 4px;
            height: 4px;
            margin-top: 3px;
            margin-left: 4px;
            background: #FF5C5D;
            border-radius: 4px;
            vertical-align: top;
        }
    }
}

</style>