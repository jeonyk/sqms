<template>
    <section id="approve_modal">
        <!-- alert -->
        <b-modal
            :ref="modal.alertId"
            :id="modal.alertId"
            :title="alertModal.title"
            size="sm"
            footer-bg-variant="transparent"
            @shown="$refs.alertConfirm.focus()"
        >
            <template #default>
                <div class="pop_container">
                    <div class="message_table">
                        <p class="msg">
                            {{ alertModal.msg }}
                        </p>
                    </div>
                </div>
            </template>

            <template #modal-footer="{ hide }">
                <b-button
                    ref="alertConfirm"
                    class="btn btn_lg btn_outline btn_blue"
                    @click="fn_showApproveModal"
                    @keyup.enter="fn_showApproveModal"
                    @keyup.space="fn_showApproveModal"
                >
                    {{ alertModal.confirmBtn }}
                </b-button>
                <b-button
                    class="btn btn_lg btn_outline btn_darkgray"
                    @click="hide('forget')"
                >
                    {{ alertModal.cancelBtn }}
                </b-button>
            </template>
        </b-modal>

        <!-- approve -->
        <b-modal
            :ref="modal.approveId"
            :id="modal.approveId"
            :title="modalTitle"
            size="xxl"
            footer-bg-variant="transparent"
            hide-footer
            scrollable
            no-close-on-backdrop
            no-close-on-esc
            @shown="fn_onModal"
            @hidden="fn_closeModal"
        >
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <div class="fl mt10">
                            <strong>
                                <span
                                    class="state"
                                    :class="{'green': aprvOptnType === 'ALLON', 'yellow': aprvOptnType === 'HAFON', 'gray': aprvOptnType === 'OFFLN'}"
                                />
                                {{`${aprvOptnTypeNm ? aprvOptnTypeNm : ''} 결재`}} 
                            </strong>

                        </div>

                        <div class="fr">
                            <p v-if="guide.current !== ''" class="guide">
                                <strong class="ico_info">{{'결재라인 가이드'}}</strong>
                                <!-- <span v-html="guide.current"/> -->
                                <span>
                                    <template v-for="(item, index) in guide.current" >
                                        <b-icon 
                                            v-if="index > 0" 
                                            :key="`${item}_${index}`" 
                                            icon="chevron-right" 
                                        />
                                        {{item}}
                                    </template>
                                </span>
                            </p>

                            <button
                                type="button"
                                class="btn btn_md btn_outline btn_darkgray"
                                @click="fn_setHelper"
                            >
                                참조
                            </button>
                            <button
                                type="button"
                                class="btn btn_md btn_outline btn_darkgray"
                                @click="fn_setApprovalLine"
                                :disabled="aprvOptnType === 'OFFLN'"
                            >
                                결재라인
                            </button>
                            <button
                                type="button"
                                class="btn btn_md btn_outline btn_darkgray"
                                @click="fn_clickApprove"
                            >
                            <!-- this.drafterFileSgnArcvId -->
                                결재상신
                            </button>
                        </div>
                    </div>

                    <div class="table_normal_list">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="9%">
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
                                    <td v-if="!docSeqWritable"> {{ docSeq_ }} </td>
                                    <td v-else>
                                        <input
                                            v-model.trim="docSeq_"
                                            class="form_control"
                                            :maxlength="100"
                                        />
                                    </td>
                                    

                                    <th rowspan="4" class="ac">결재</th>
                                    <th class="ac">기안</th>
                                    <td
                                        v-for="(item, idx) in approvalLine"
                                        :key="`${item.userId}_${idx}`"
                                        class="ac"
                                    >
                                        {{ item.dtyNm }}
                                    </td>
                                    <td
                                        v-for="index in Array(4 - approvalLine.length).fill().map((item, index) => index)"
                                        :key="index"
                                        class="ac"
                                    >
                                        {{ approvalLine.length > 0 ? '' : '검토' }}
                                    </td>
                                    
                                   
                                </tr>

                                <tr>
                                    <th><span class="emp_red">제목</span></th>
                                    <!-- <td v-html="fn_toHtml(docTitle)"></td> -->
                                    <td>
                                        <textarea 
                                            v-model="docTitle_"
                                            type="textarea" 
                                            class="form_control"
                                            :maxlength="70"
                                        />
                                    </td>

                                    <td class="ac"></td>
                                    <td class="ac"></td>
                                    <td class="ac"></td>
                                    <td class="ac"></td>
                                    <td class="ac"></td>
                                </tr>

                                <tr>
                                    <!-- <th>제목</th>
                                    <td>
                                        <textarea 
                                            v-model="title"
                                            type="textarea" 
                                            class="form_control"
                                        />
                                    </td> -->
                                    <th>프로젝트명</th>
                                    <td> {{ projectNm }} </td>

                                    <td class="ac"> {{ userNm }} </td>
                                    <td
                                        v-for="(item, idx) in approvalLine"
                                        :key="`${item.userId}_${idx}`"
                                        class="ac"
                                    >
                                        {{ item.userNm }}
                                    </td>
                                    <td
                                        v-for="index in Array(4 - approvalLine.length).fill().map((item, index) => index)"
                                        :key="index"
                                        class="ac"
                                    >
                                    </td>
                                    
                                </tr>

                                <tr>
                                    <th>문서종류</th>
                                    <td class="cell_division">
                                        <ul>
                                            <li style="width: 25%;"> {{docTypeNm}} </li>
                                            <li> {{ docName_ }} </li>
                                        </ul>
                                    </td>

                                    <td class="ac"> {{ $moment().format('YYYY-MM-DD') }} </td>
                                    <td class="ac"></td>
                                    <td class="ac"></td>
                                    <td class="ac"></td>
                                    <td class="ac"></td>
                                </tr>

                                <tr>
                                    <th>{{'참조'}}</th>
                                    <td colspan="7">
                                        <div class="label_item radius">
                                            <ul >
                                                <li 
                                                    v-for="(helper, index) in dlHelpUser"
                                                    class="blue"
                                                    :key="index"
                                                >
                                                    <strong> {{helper.userNm}} </strong> 
                                                    <span class="delete" @click="dlHelpUser.splice(index, 1)">삭제</span>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th>첨부파일</th>
                                    <td colspan="7">
                                        <lst-file
                                            :lst-file-rst="attachments.fileRegistered"
                                            :files="attachments.files"
                                            :second-remove-file-id="attachments.requestForDelete"
                                            @file-changed="(payload) => { this.attachments.files = payload }"
                                            @file-removed="(payload) => { this.attachments.requestForDelete = payload }"
                                            :uploadable="false"
                                            downloadable
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- <vue-friendly-iframe
                        v-if="ozReport.src !== ''"
                        className="w100 modal-iframe-height"
                        :src="ozReport.src"
                        @iframe-load="fn_setOzReport"
                    /> -->

                    <iframe
                        v-if="ozReport.src !== ''"
                        class="w100"
                        style="height: 1372px"
                        :src="ozReport.src"
                    />


                        <!-- src="http://localhost:9999/oz80/sample/viewer/mtrlSpAppr.jsp?aprvInfoId=APRV_0000001265" -->
                </div>
            </template>
        </b-modal>

        <approval-line
            :ref-id="approvalLineId"
            :line="approvalLine"
            :help="dlHelpUser"
            :draft="userId"
            :site-mstr-id="siteMstrId"
            @choice="fn_callbackLineChoice"
        />

        <approval-help
            :ref-id="approvalHelpId"
            :help="dlHelpUser"
            :line="approvalLine"
            :draft="userId"
            @choice="fn_callbackHelpChoice"
        />

        <regist-approval-sign
            :ref-id="`${refId}_registApprovalSign`"
            @callback="fn_addSignId"
        />
    </section>
</template>

<script>
import LstFile from '@/pages/common/popup/LstFile.vue'
import ApprovalLine from '@modal/approval/ApprovalLine.vue'
import ApprovalHelp from '@modal/approval/ApprovalHelp.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import RegistApprovalSign from '@modal/myWork/RegistApprovalSign.vue'
// import axios from '@plugin/apis/instance'
// import VueFriendlyIframe from 'vue-friendly-iframe'
import axios from 'axios'
import _ from 'lodash'

import { mapGetters } from 'vuex'

export default {
    name: 'Approve',
    mixins: [MsgBoxMixins],
    props: {
        /** modal-ref,modal-id */
        refId: {
            type: String,
            default: 'ApproveModal',
        },
        /** modal-title */
        modalTitle: {
            type: String,
            default: '결재 상신하기',
        },

        // API parameter
        /** 결재상신을 요청한 페이지 타입 */
        codeType: {
            type: String,
            // required: true,
            default: null,
        },
        codeDtlType: {
            type: String,
            default: null,
        },

        /** 공종ID - main-code-id : need onModal-getDocSeq */
        mainCodeId: {
            type: String,
            default: null,
        },
        /** 세부공종ID - mid-code-id : need onModal-getDocSeq */
        midCodeId: {
            type: String,
            default: null,
        },
        /** 문서번호 - if-null: getDoc */
        docSeq: {
            type: String,
            default: '-'
        },
        /** 문서타입 */
        docType: {
            type: String,
            default: ''
        },

        /** 결재 제목 - string type: 부적합 데이터 연동 */
        docTitle: {
            type: String,
            default: '',
        },

        /** 문서 제목 - 문서제목 코드 */
        docName: {
            type: String,
            // default: null,
            
            // temporary
            default : '',
        },
        docNameId: {
            type: String,
        },

        /** 요청문서 아이디 */
        requestId: {
            type: String,
            // required: true,
        },
        /** 파일타입 - fileType */
        fileType: {
            type: String,
        },
        /** 사이트아이디 */
        siteMstrId: {
            type: String,
            default: null,
        },

        /** oz-report 파라미터 처리 */
        ozParam: {
            type: Object,
            default: function () {
                return {}
            }
        },

        /** exceptionCode = 특정 예외처리해야하는 코드 */
        exceptionCode: {
            type: Array,
            default: function () {
                return ['SELF']
            }
        },

        /** etc functions */
        /** use-alert-modal */
        alertable: {
            type: Boolean,
            default: false,
        },
        /** 없을시 자동으로 문서번호를 등록할 것인지 */
        registable: {
            type: Boolean,
            default: false,
        },
        /** 상신 후 모달 유지 여부  */
        keepAfter: {
            type: Boolean,
            default: false
        },


        
    },
    components: {
        LstFile,
        ApprovalLine,
        ApprovalHelp,
        RegistApprovalSign,
        // VueFriendlyIframe,
    },
    computed: {
        approvalLineId: {
            get: function () {
                return `${this.refId}_line`
            },
        },
        approvalHelpId: {
            get: function () {
                return `${this.refId}_help`
            },
            
        },
        ...mapGetters({
            userId: 'auth/getUserId',
            userNm:     'auth/getUserNm',        
        }),
        
    },
    watch: {
        alertable: {
            handler: function (newValue) {
                this.fn_setModalId(newValue)
            },
        },
        docSeq: {
            handler: function (newValue) {
                // prevent props mutation warnning
                this.docSeq_ = _.cloneDeep(newValue)

                if (newValue && newValue !== '') {
                    this.docSeq_ = _.cloneDeep(newValue)
                } else {
                    // this.docSeq_ = null
                    this.docSeqWritable = true
                }

            }
        },
        docTitle: {
            handler: function (newValue) {
                this.docTitle_ = _.cloneDeep(newValue)
            }
        },
        docName: {
            handler: function (newValue) {
                this.docName_ = _.cloneDeep(newValue)
            }
        },
    },
    mounted: function () {
        this.fn_setModalId(this.alertable)
        // this.docSeq_ = _.cloneDeep(this.docSeq)
        // this.docTitle_ = _.cloneDeep(this.docTitle)
    },
    beforeDestroy: function () {
    },
    methods: {
        /** MasterCode Search */

        fn_showApproveModal: function () {
            this.$bvModal.hide(this.modal.alertId)
            this.$bvModal.show(this.modal.approveId)

            this.fn_initialize()
        },
        fn_closeModal: function () {
            this.fn_initialize()
        },


        /** on-modal-shown */
        fn_onModal: function () {
            // console.log('onModal shown')
            this.fn_setModalId(this.alertable)
            if (this.docSeq && this.docSeq !== '') {
                this.docSeq_ = _.cloneDeep(this.docSeq)
                this.docSeqWritable = false
            } else {
                this.docSeqWritable = true
            }
            this.docTitle_ = _.cloneDeep(this.docTitle)
            this.docName_  = _.cloneDeep(this.docName)
            // APIS - 
            // this.fn_initialize()
            // files
            this.fn_fetchAdvancedInfo()
            this.fn_getFileList()
            this.fn_fetchUserSign()

            // this.fn_fetchRecentApproveLine()

            const rawCodeType = ['WEKM', 'MNGT', 'QLTY', 'QISP']
            if (!rawCodeType.includes(this.docType)) {
                this.fn_getAprvOptnType((aprvOptnType) => {
                    this.aprvOptnType = aprvOptnType
                    this.fn_fetchMasterCode(
                        { groupCode: 'APRV_OPTN_TYPE', },
                        (response) => {
                            this.aprvOptnTypeNm = response.data.data.find(item => item.codeVal === this.aprvOptnType)?.codeNameKr
                        },
                    )

                    if (this.aprvOptnType !== 'OFFLN') {
                        this.fn_fetchRecentApproveLine()
                    }
                    
    
                })
            } else {
                this.aprvOptnType   = 'ALLON'
                this.aprvOptnTypeNm = '온라인'

                this.fn_fetchRecentApproveLine()
            } 

            // oz-report

            // this.fn_setOzReport()

        },
        
        fn_initialize: function () {
            // initialize Sammple
            /** etc parameters */
            // this.aprvOptnType = ''
            // this.aprvOptnTypeNm = ''
            // this.projectNm = ''          
            // this.codeDtlTypeNm = ''
            // title: '',
            // this.docSeq_ =  ''
            this.docTitle_              = ''
            this.aprvOptnType           = ''
            this.aprvOptnTypeNm         = ''
            this.projectNm              = ''
            this.codeDtlTypeNm          = ''
            this.docSeq_                = ''
            this.docSeqWritable         = false
            this.docTitle_              = ''
            this.docName_               = ''
            this.docTypeNm              = ''
            this.drafterFileSgnArcvId   = ''
            this.guide.current          = ''

            this.ozReport.src           = ''

            // 참조자
            this.approvalLine = []
            this.dlHelpUser = []

            // this.approvalLine = []

            // // files
            this.attachments = {
                fileRegistered: [],
                files: [],
                requestForDelete: [],
            }


        },

        fn_fetchRecentApproveLine: function () {
            const url = '/sendApi/api/approv/recentApprovLine/list'
            const payload = {
                codeType:       this.codeType,
                codeDtlType:    this.codeDtlType,
                siteMstrId:     this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
                userId:         this.userId,
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
                    // console.log('fetchRecentApprove',response)
                    if (response.status === 200 && response.data.datas.dlAprvLine.length > 1 ) {
                        // this.approvalLine = response.data.datas.dlAprvLine.splice(1)
                        this.approvalLine = _.slice(response.data.datas.dlAprvLine, 1)
                    } else {
                        this.approvalLine = []
                    }


                })
                .catch(error => {
                    console.error(error)
                })

        },

        fn_fetchAdvancedInfo: function () {
            const urls = {
                masterCode : '/sendApi/api/common/masterCode/list',
                siteInfo: '/sendApi/api/siteInfo/view',
                aprvOptnType: '/sendApi/api/apvlOptn/approvalOption/view'
            }
            const payload = {
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.siteMstrId,
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.all([
                    axios.post(urls.masterCode,     {...payload, groupCode: 'DOC_TYPE'}, options),
                    axios.post(urls.siteInfo,       {siteMstrId: this.siteMstrId ? this.siteMstrId : this.$store.getters['auth/getSiteMstrId']}, options),
                    axios.post(urls.masterCode,     {...payload, groupCode: 'APRV_LINE_GUIDE'}, options),
                    // axios.post(urls.aprvOptnType,   {...payload, codeType: this.codeType}, options),
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.docType       = response[0].data.data
                    this.projectNm                  = response[1].data.datas.result.projectNm
                    this.advancedInfo.aprvLineGuide = response[2].data.data
                    // this.aprvOptnType               = response[2].data.data.aprvOptnType
                }))
                .then(() => {
                    this.docTypeNm     = this.advancedInfo.docType.find(item => item.codeVal === this.docType)?.codeNameKr
                    if (!(this.docType === 'MTRL' && this.codeType === 'MTRL' && this.codeDtlType === 'TSFC')) {
                        this.guide.current = this.advancedInfo.aprvLineGuide.find(itm => itm.codeVal === `${this.docType}_${this.codeType}_${this.codeDtlType}`)?.codeNameKr?.split(',')
                    }
                })
                .then(() => {
                    this.fn_setOzReport()
                })
        },

        fn_getDocSeq: function () {
            const url = '/sendApi/api/docNum/selectDocNumSeq'
            const payload = {
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
                codeType: this.codeType,
                codeDtlType: this.codeDtlType,
                gjmcd: this.mainCodeId, // 공종
                gjscd: this.midCodeId,  // 세부공종
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

                    this.docSeq_ = response.data

                    // approve
                    this.fn_addApprove()
                })
                .catch(error => {
                    console.error(error)
                    // if need show alert 
                })
        },
        fn_getAprvOptnType: function (callback) {
            const url = '/sendApi/api/apvlOptn/approvalOption/view'
            const payload = {
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
                codeType:   this.codeType,
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
                        // this.aprvOptnType = response.data.data.aprvOptnType
                        return callback(response.data.data.aprvOptnType)
                    }

                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_getSiteInfo: function () {
            const url = '/sendApi/api/siteInfo/view'
            const payload = {
                siteMstrId: this.siteMstrId ? this.siteMstrId : this.$store.getters['auth/getSiteMstrId'],
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
                    this.projectNm = response.data.datas.result.projectNm
                    // this.projectId = response.data.datas.result.projectId
                    
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_clickApprove: function () {
            // console.log('click approve - need validate')

            // validateList
            if (!this.docName_ || this.docName_ === '') {
                // empty docName msg
                // console.log('validate - docName')
                this.alert('문서제목이 입력되지 않았습니다.')
                return
            }

            if (!this.docTitle_ || this.docTitle_ === '') {
                this.alert('제목이 입력되지 않았습니다.')
                return
            }

            if (this.approvalLine.filter(item => item.userId).length === 0 && this.aprvOptnType !== 'OFFLN') {
                
                // console.log('validate - approvalLine')
                this.alert('결재라인이 지정되지 않았습니다.')
                return
            }

            this.confirm('결재상신하시겠습니까?', () => {
                if ( this.registable && this.docSeq === '-') {
                    this.fn_getDocSeq()
                } else {
                    if (this.drafterFileSgnArcvId) {
                        this.fn_addApprove()
                    } else {
                        this.$bvModal.show(`${this.refId}_registApprovalSign`)
                    }
                }
            })

        },
        fn_addApprove: function () {
            // console.log('checked docSeq : %o', this.docSeq_)
            const url = '/sendApi/api/approv/approvedDoc/write'
            const payload = {
                // 결재정보
                dmApprvDoc: {
                    siteMstrId:         this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
                    // siteId:             this.$cookies.get('projectId'),
                    // siteNm:             this.projectNm,
                    /** 결재타입 - 필수 */
                    aprvOptnType:       this.aprvOptnType,
                    /** 문서타입 - 필수 */
                    docType:            this.docType,
                    codeType:           this.codeType,
                    codeDtlType:        this.codeDtlType,
                    docSeq:             this.docSeq_,
                    docName:            this.docName_,
                    /** 제목 - 필수 */
                    title:              this.docTitle_,

                    aprvFileConnectId:  this.requestId,
                    fileType:           this.fileType,
                    // aprvFileType: this.fileType,

                    /** 기안자 정보  */
                    drafterId:          this.userId,
                    drafterNm:          this.userNm,

                    // 결재자인원수는 기안자 포함된 숫자임 - 필수
                    aprvNum:            1 + this.approvalLine.length,
                    // 상신시 1로 필수값 고정  - 필수
                    aprvOrder:          1,

                    /** 결재 진행 상태: char */
                    // aprvProgrsOrder: ,
                    aprvProgrsState: this.aprvOptnType === 'OFFLN' ? 'Y' : 'N',
                    /** 최종 결재 단계 - 필수 */
                    finlManagerOrder: this.aprvOptnType === 'OFFLN' ? 1 : this.approvalLine.length +1,
                    /** 최종 결재자 ID */
                    finlAprvUserId: this.approvalLine.length > 0 ? this.approvalLine[this.approvalLine.length -1].userId : this.userId,
                    /** 최종 결재자 Nm */
                    finlAprvUserNm: this.approvalLine.length > 0 ? this.approvalLine[this.approvalLine.length -1].userNm : this.userNm,

                    /** 최종 승인 상태 */
                    finlAprvType: '',
                    /** 최종 승인 결과 */
                    finlAprvRst: '',

                    /** 확정 여부 */
                    dcsnComptYn: 'N',
                    /** 최종 승인 여부 */
                    finlAprvYn: this.aprvOptnType === 'OFFLN' ? 'Y' : 'N',
                    /** 참조 여부  - 필수 */
                    helpYn: this.dlHelpUser.length > 0 ? 'Y' : 'N',
                    /** 공유 여부  - 필수 */
                    shareYn: 'N',
                    /** 오프라인 파일 구분 */
                    offlnFileType: '',
                    /** 오프라인 첨부파일ID */
                    offlnFileConnectId: '',
                    comment: '',
                    endDate: '',
                },
                // 결재자
                dlApprvUser: [],
                // 참조자 - 직원만 가능
                dlHelpUser: this.dlHelpUser.map((item) => {
                    return {
                        status:          'Added',
                        userDiv:         'HELP',
                        userId:          item.userId,
                        helpUserType:    'HEC',
                        helpUserNm:      item.userNm,
                        helpJobTitle:    item.jobTitle,
                        helpJobRoleNm:   item.jobRoleNm,
                        helpTradeId:     item.workLocCd,
                        helpTradeNm:     item.workLocNm,
                        helpTradeType:   '',
                        helpTradeTypeNm: '',
                    }
                }),
            }

            if(this.aprvOptnType !== 'OFFLN') {
                payload.dlApprvUser = this.approvalLine.map((item, index) => {
                    return {
                        status:         'Added',
                        aprvOrder:      index+2,
                        siteMstrId:     item.siteMstrId,
                        userType:       item.userType,
                        dtyCd:          item.dtyCd,
                        dtyNm:          item.dtyNm,
                        userId:         item.userId,
                        userNm:         item.userNm,
                        jobTitle:       item.jobTitle,
                        jobRoleNm:      item.jobRoleNm,
                        tradeNm:        item.tradeNm,
                        tradeId:        item.tradeId,
                        tradeType:      item.tradeType,
                        tradeTypeNm:    item.tradeTypeNm,
                    }
                })
    
                payload.dlApprvUser.unshift({
                    status:         'Added',
                    aprvOrder:      1,
                    siteMstrId:     this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
                    dtyNm:          '기안',
                    dtyCd:          'DRFT',
                    userId:         this.userId,
                    userNm:         this.userNm,
                    jobTitle:       this.$store.getters['auth/getJobTitle'],
                    tradeNm:        this.$store.getters['auth/getJobRoleNm'] 
                                        || this.$store.getters['auth/getTradeNm'] 
                                        || this.$store.getters['auth/getSiteNm'],
    
                    tradeId:        this.$store.getters['auth/getTradeId']
                                        || this.$store.getters['auth/getSiteId'],
                    tradeType:      this.$store.getters['auth/getTradeType'],
                    userType:       this.$store.getters['auth/getUserType'],
                    fileSgnArcvId:  this.drafterFileSgnArcvId

                })

                payload.dmApprvDoc.aprvNum          = 1 + this.approvalLine.length
                payload.dmApprvDoc.finlManagerOrder = this.approvalLine.length +1
                payload.dmApprvDoc.finlAprvUserId   = this.approvalLine.length > 0 ? this.approvalLine[this.approvalLine.length -1].userId : this.userId
                payload.dmApprvDoc.finlAprvUserNm   = this.approvalLine.length > 0 ? this.approvalLine[this.approvalLine.length -1].userNm : this.userNm
            } else {
                payload.dlApprvUser.unshift({
                    status:         'Added',
                    aprvOrder:      1,
                    siteMstrId:     this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
                    dtyNm:          '기안',
                    dtyCd:          'DRFT',
                    userId:         this.userId,
                    userNm:         this.userNm,
                    jobTitle:       this.$store.getters['auth/getJobTitle'],
                    tradeNm:        this.$store.getters['auth/getJobRoleNm'] 
                                        || this.$store.getters['auth/getTradeNm'] 
                                        || this.$store.getters['auth/getSiteNm'],

                    tradeId:        this.$store.getters['auth/getTradeId']
                                        || this.$store.getters['auth/getSiteId'],
                    tradeType:      this.$store.getters['auth/getTradeType'],
                    userType:       this.$store.getters['auth/getUserType'],
                    fileSgnArcvId:  this.drafterFileSgnArcvId
                })

                payload.dmApprvDoc.aprvNum          = 1 
                payload.dmApprvDoc.finlManagerOrder = 1
                payload.dmApprvDoc.finlAprvUserId   = this.userId
                payload.dmApprvDoc.finlAprvUserNm   = this.userNm
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
                    // console.log('axios : %o',response)
                    // callback?
                    if (response.status === 200 && response.data.rCode === '0000') {
                        this.$emit('callback', response.data.datas.dmApprvDoc)

                        if (this.aprvOptnType !== 'OFFLN' && payload.dlApprvUser.length > 1) {
                            this.fn_sendMessage({
                                messageCode:    'A069',
                                reciveUserId:  payload.dlApprvUser[1].userId
                            })
                        }
                        if (payload.dlHelpUser.length > 0) {
                            this.fn_sendMessage({
                                messageCode:    'A073',
                                reciveUserIds: payload.dlHelpUser.map(item => String(item.userId))
                            })
                        }

                        if(!this.keepAfter) this.$bvModal.hide(this.modal.approveId)
                    } else {
                        throw new Error('결재상신 실패')
                    }
                    // hide
                })
                .catch(error => {
                    console.error(error)
                    // error alert?
                    this.alert('오류로 인해 결재상신이 실패하였습니다.')
                })
                // .finally(() => {
                //     this.$bvModal.hide(this.modal.approveId)
                // })

                
        },
        // fn_getSignInfo: function () {
        //     const url = '/sendApi/api/'
        //     const payload = {

        //     }
        //     const options = {
        //         headers: {
        //             'Authorization': this.$cookies.get('Authorization'),
        //             'Content-Type': 'application/json',
        //             'Accept-Language': 'ko'
        //         }
        //     }

        //     axios.post(url, payload, options)
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(error => {
        //             console.error(error)
        //         })
        // },
        fn_addSignId: function (fileSgnArcvId) {
            this.drafterFileSgnArcvId = fileSgnArcvId
            this.fn_addApprove()
        },
        fn_getFileList: function () {
            const url = '/sendApi/api/file/upFileList'
            const payload = {
                fileConnectId: this.requestId,
                fileType: this.fileType,
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

                    this.attachments.fileRegistered = response.data.data
                })
                .catch(error => {
                    console.error(error)

                    // error alert
                })
        },
        // fn_getDocName: function () {
        //     const url = ''
        //     const payload = {

        //     }
        //     const options = {
        //         headers: {
        //             'Authorization': this.$cookies.get('Authorization'),
        //             'Content-Type': 'application/json',
        //             'Accept-Language': 'ko'
        //         }
        //     }

        //     axios.post(url, payload, options)
        //         .then(response => {
        //             console.log(response)


        //         })
        //         .catch(error => {
        //             console.error(error)
        //         })
        // },
        fn_fetchMasterCode: function (_payload, callback) {
            const url = '/sendApi/api/common/masterCode/list'
            const payload = {
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
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
                    // console.log(response.data.data)
                    return callback(response)
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_setModalId: function (fork) {
            if (fork) {
                this.modal.alertId = this.refId
                this.modal.approveId = `${this.refId}_approve`
            } else {
                this.modal.alertId = `${this.refId}_alert`
                this.modal.approveId = this.refId
            }
        },
        fn_fetchUserSign: function () {
            const url = '/sendApi/api/approv/userSgnArcv/list'
            const payload = {
                userId: this.userId,
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
                    if (response.status == 200) {
                        this.drafterFileSgnArcvId = response.data.datas.dlSgnArcv[0].fileSgnArcvId
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_setHelper: function () {
            // console.log('fn_setHelper')

            this.$bvModal.show(this.approvalHelpId)
        },
        fn_setApprovalLine: function () {
            // console.log('fn_setApprovalLine')

            this.$bvModal.show(this.approvalLineId)
        },
        fn_callbackLineChoice: function (payload) {
            // console.log(payload)
            this.approvalLine = payload
        },
        fn_callbackHelpChoice: function (payload) {
            this.dlHelpUser = payload
        },
        
        fn_toHtml: function (string) {
            return string ? string.split('\n').join('<br>') : ''
        },

        /** 검측 오프라인 처리 */
        // fn_approveInspectManager: function () {
        //     const url = '/sendApi/api/inptMngt/inptSttus/inptSttusResultNtcdoc/change'
        //     const payload = {
        //         aprvInfoId: this.aprvDoc.aprvInfoId,
        //     }
        //     const options = {
        //         headers : {
        //             'Authorization': this.$cookies.get('Authorization'),
        //             'Content-Type': 'application/json',
        //             'Accept-Language': 'ko'
        //         },
        //     }
            
        //     axios.post(url, payload, options)
        //         .then(response => {
        //             if (response.status !== 200) {
        //                 throw new Error('fn_approveInspectmanager')
        //             }
        //         })
        //         .catch(() => {
        //         })
        // },
        
        // oz-report
        fn_setOzReport: function () {

            // initialize
            this.ozReport.src = ''

            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }
            const domainPath = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH

            switch(this.docType) {
                case 'MTRL': {
                    switch(this.codeType) {
                        case 'MTRL': {
                            
                            switch(this.codeDtlType) {
                                case 'MREQ': {
                                    /** guide text */
                                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'full').text
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][6].jspNm
                                                            + [
                                                                `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                `mtrlSpApprId=${this.requestId}`,
                                                            ]
                                                            .join('&')
                                    break
                                }
                                case 'TSAC': {
                                    /** guide text */
                                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'full').text
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][12].jspNm
                                                            + [
                                                                `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                `mtrlAccpTsId=${this.requestId}`
                                                            ]
                                                            .concat(this.fn_getParamFromObj(this.ozParam))
                                                            .join('&')

                                    break
                                }
                                case 'TSFC': {
                                    const ozPayload = {
                                        mtrlFtryTsId: this.requestId,
                                        siteMstrId: this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
                                    }
                                    axios.post('/sendApi/api/quality/materialSiteCheck/factoryTest/view', ozPayload, options)
                                        .then(response => {
                                            /** guide text */
                                            // this.guide.current  = this.guide.list.find(itm => response.data.data.rmcYn === 'Y' ? itm.type === 'one-supervision' : itm.type === 'full').text
                                            const codeVal       = response.data.data.rmcYn === 'Y' ? `${this.docType}_${this.codeType}_${this.codeDtlType}_R` : `${this.docType}_${this.codeType}_${this.codeDtlType}`
                                            this.guide.current  = this.advancedInfo.aprvLineGuide.find(itm => itm.codeVal === codeVal)?.codeNameKr?.split(',')
                                            this.ozReport.src   = (response.data.data.rmcYn === 'Y' 
                                                                        ? this.$store.getters['auth/getOzTypeList'][13].jspNm 
                                                                        : this.$store.getters['auth/getOzTypeList'][14].jspNm)
                                                                    + [
                                                                        `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                        `mtrlFtryTsId=${this.requestId}`,
                                                                    ]
                                                                    .concat(this.fn_getParamFromObj(this.ozParam))
                                                                    .join('&')
                                                                        // ...this.fn_getParamFromObj(this.ozParam)
                                                                    // .push.apply(this.fn_getParamFromObj(this.ozParam))
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
                    switch(this.codeType) {
                        case 'CRCK': {
                            switch(this.codeDtlType) {
                                case 'CRCK': {
                                    /** guide text */
                                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'one-supervision').text
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][25].jspNm
                                                            + [
                                                                `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                `crckMngtInfoId=${this.requestId}`,
                                                                `aprvInfoId=`,
                                                            ]
                                                            .concat(this.fn_getParamFromObj(this.ozParam))
                                                            .join('&')
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
                    switch(this.codeType) {
                        case 'CCRT': {
                            switch(this.codeDtlType) {
                                case 'STRG': {
                                    /** guide text */
                                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'full').text
                                    const ozPayload = {
                                        concCompStrgLstId: this.requestId,
                                    }
                                    axios.post('/sendApi/api/concrete/strgMngt/type', ozPayload, options)
                                        .then(response => {
                                            this.ozReport.src   =      (
                                                                        ['7D', '28D'].includes(response.data.data.strgTestType) ? this.$store.getters['auth/getOzTypeList'][22].jspNm
                                                                            : ['91D'].includes(response.data.data.strgTestType) ? this.$store.getters['auth/getOzTypeList'][23].jspNm
                                                                            : ['VERTICAL', 'HORIZONTAL', 'FILLER_SUPPORT'].includes(response.data.data.strgTestType) ? this.$store.getters['auth/getOzTypeList'][24].jspNm
                                                                            : ''
                                                                        )
                                                                    + [
                                                                        `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                        `concCompStrgLstId=${this.requestId}`,
                                                                        `aprvInfoId=`,
                                                                    ]
                                                                    .concat(this.fn_getParamFromObj(this.ozParam))
                                                                    .join('&')

                                        })
                                    break
                                }
                                case 'CONC': {
                                    /** guide text */
                                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'one-supervision').text
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][16].jspNm
                                                            + [
                                                                `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                `concPourDtlId=${this.requestId}`,
                                                                `aprvInfoId=`,
                                                            ]
                                                            .concat(this.fn_getParamFromObj(this.ozParam))
                                                            .join('&')
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
                    switch(this.codeType) {
                        case 'NCFM': {
                            switch(this.codeDtlType) {
                                case 'CAR':
                                case 'NCR': {
                                    /** guide text */
                                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'half').text
                                    axios.post('/sendApi/api/noCnfmMngt/noCnfmInfo/view', {noCnfmInfoId: this.requestId} ,options)
                                        .then(response => {
                                            // console.log(response)
                                            if (!response.data.view) throw new Error('error')
                                            let noCnfmType = this.codeDtlType + (response.data.view.aprvInfoId === null && response.data.view.aprvInfoId2 === null ? 'Write' : '')

                                            this.ozReport.src   =   ( noCnfmType == 'CAR' ?  
                                                                    this.$store.getters['auth/getOzTypeList'][28].jspNm : noCnfmType == 'NCR' ?
                                                                    this.$store.getters['auth/getOzTypeList'][29].jspNm : noCnfmType == 'CARWrite' ?
                                                                    this.$store.getters['auth/getOzTypeList'][30].jspNm : noCnfmType == 'NCRWrite' ?
                                                                    this.$store.getters['auth/getOzTypeList'][31].jspNm : '')
                                                                    
                                                                    + [
                                                                        `&noCnfmInfoId=${this.requestId}`, 
                                                                        // `aprvInfoId=${response.data.view?.aprvInfoId !== null ? response.data.view.aprvInfoId : this.dmApprvDoc.aprvInfoId}`
                                                                        `aprvInfoId=${response.data.view.aprvInfoId === null ? '' : response.data.view.aprvInfoId}`, 
                                                                        `aprvInfoId2=${response.data.view.aprvInfoId2 === null ? '' : response.data.view.aprvInfoId2}`,
                                                                        `siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                    ]
                                                                    .concat(this.fn_getParamFromObj(this.ozParam))
                                                                    .join('&')
                                                                        
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
                case 'TEST': {
                    switch(this.codeType) {
                        case 'TEST': {
                            axios.post('/sendApi/api/testMngt/testResultMngt/testSubjectDetail/list', {testResultMngtSeq: this.requestId?.split('_').reverse()[0], siteMstrId: this.siteMstrId} ,options)
                                .then(response => {
                                    const dmTestDetail = response.data.datas.dmTestDetail
                                    
                                    if (this.codeDtlType === 'REQT' 
                                        &&  ((['RQPR', 'RQRP', 'RQRA', 'RQRE'].includes(String(dmTestDetail.resultProgrsStatus))
                                                && !['TTRG'].includes(String(dmTestDetail.resultProgrsStatus))))) {
                                        /** guide text */
                                        // this.guide.current  = this.guide.list.find(itm => itm.type === 'headNSupervision').text
                                        /** docName setted */
                                        this.docName_       = '품질검사 의뢰서'
                                        this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][5].jspNm
                                                                + [
                                                                    `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                    `userId=${this.userId}`,
                                                                    `testResultMngtSeq=${this.requestId?.split('_').reverse()[0]}`
                                                                ]
                                                                .concat(this.fn_getParamFromObj(this.ozParam))
                                                                .join('&')
                                    } else if (this.codeDtlType === 'SITE' 
                                        || this.codeDtlType === 'FTRY' 
                                        || (this.codeDtlType === 'REQT'
                                            && ['TTPR', 'RGPR', 'APRV', 'APRE'].includes(dmTestDetail.resultProgrsStatus))) {
                                        /** guide text */
                                        // this.guide.current  = this.guide.list.find(itm => itm.type === 'headNSupervision').text
                                        /** docName setted */
                                        this.docName_       = '시험성과 대비표'
                                        this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][1].jspNm
                                                                + [
                                                                    `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                    // `userId=${this.dmApprvDoc.drafterId}`,
                                                                    `resultProgrsStatus=${dmTestDetail.resultProgrsStatus}`,
                                                                    `testResultMngtSeq=${this.requestId?.split('_').reverse()[0]}`
                                                                ]
                                                                .concat(this.fn_getParamFromObj(this.ozParam))
                                                                .join('&')
                                    }


                                    // const resultProgrsStatus = response.data.datas.dmTestDetail.resultProgrsStatus
                                    // if (this.codeDtlType === 'REQT' 
                                    //     && resultProgrsStatus !== 'TTPR') {
                                    //         this.ozReport.src   = domainPath
                                    //                                 + '/qulityTestRqstdoc.jsp?'
                                    //                                 + [
                                    //                                     `siteMstrId=${this.siteMstrId}`,
                                    //                                     // `testResultMngtSeq=${this.requestId.split('_').pop()}`
                                    //                                     `userId=${this.userId}`,
                                    //                                     `testResultMngtSeq=${this.requestId?.split('_').reverse()[0]}`
                                    //                                 ].join('&')

                                    // } else if (this.codeDtlType === 'SITE' 
                                    //     || this.codeDtlType === 'FTRY' 
                                    //     || (this.codeDtlType === 'REQT' && resultProgrsStatus === 'TTPR')) {
                                    //         this.ozReport.src   = domainPath
                                    //                                 + '/siteTestResultMngtPrepare.jsp?'
                                    //                                 + [
                                    //                                     `siteMstrId=${this.siteMstrId}`,
                                    //                                     // `userId=${this.userId}`,
                                    //                                     `resultProgrsStatus=${resultProgrsStatus}`,
                                    //                                     `testResultMngtSeq=${this.requestId?.split('_').reverse()[0]}`
                                    //                                 ].join('&')
                                    // }
                                })
                                .catch(error => {
                                    console.error(error)
                                })

                            // switch(this.codeDtlType) {
                            //     case 'REQT': {
                            //         this.ozReport.src   = domainPath
                            //                                 + '/qulityTestRqstdoc.jsp?'
                            //                                 + [
                            //                                     `siteMstrId=${this.siteMstrId}`,
                            //                                     // `testResultMngtSeq=${this.requestId.split('_').pop()}`
                            //                                     `userId=${this.userId}`,
                            //                                     `testResultMngtSeq=${this.requestId?.split('_').reverse()[0]}`
                            //                                 ].join('&')
                            //         break
                            //     }
                            //     case 'SITE':
                            //     case 'FTRY':
                            //         axios.post('/sendApi/api/testMngt/testResultMngt/testSubjectDetail/list', {testResultMngtSeq: this.requestId?.split('_').reverse()[0], siteMstrId: this.siteMstrId} ,options)
                            //             .then(response => {
                            //                 // console.log(response)
                            //                 this.ozReport.src   = domainPath
                            //                                         + '/siteTestResultMngtPrepare.jsp?'
                            //                                         + [
                            //                                             `siteMstrId=${this.siteMstrId}`,
                            //                                             // `userId=${this.userId}`,
                            //                                             `resultProgrsStatus=${response.data.datas.dmTestDetail.resultProgrsStatus}`,
                            //                                             `testResultMngtSeq=${this.requestId?.split('_').reverse()[0]}`
                            //                                         ].join('&')

                            //             })
                            //             .catch(error => {
                            //                 console.error(error)
                            //             })

                            //         break
                            //     default: 
                            //         break
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
                    switch(this.codeType) {
                        case 'INPT': {
                            switch(this.codeDtlType) {
                                default: {
                                    /** guide text */
                                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'full').text
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][27].jspNm
                                                            + [
                                                                `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                `siteInptDetailId=${this.requestId}`,
                                                            ]
                                                            .concat(this.fn_getParamFromObj(this.ozParam))
                                                            .join('&')
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
                                    /** guide text */
                                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'half').text
                                    this.ozReport.src   = this.$store.getters['auth/getOzTypeList'][0].jspNm
                                                            + [
                                                                `&siteMstrId=${this.siteMstrId || this.$store.getters['auth/getSiteMstrId']}`,
                                                                `qltyPlcyInfoId=${this.requestId}`,
                                                            ]
                                                            .concat(this.fn_getParamFromObj(this.ozParam))
                                                            .join('&')
                                    break
                                }
                            }
                            break
                        }
                    }
                    break
                } 
                default: {
                    /** guide text - etc */
                    // this.guide.current  = this.guide.list.find(itm => itm.type === 'half').text
                    break
                }
            }
        },
        fn_getParamFromObj: function (obj) {
            return Object.keys(obj)
                        .filter(item => obj[item] !== null && obj[item] !== undefined)
                        .map(item => `${item}=${obj[item]}`)
        },
        fn_toPascalCase: function (str) {
            return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase())
        },

        /** 통합 메세지 */
        fn_sendMessage: function (_payload) {
            const url       = '/sendApi/api/messageMngt/message/send'
            const payload   = {
                                messageCode:    ''    ,
                                userId:         this.userId,
                                projectId:      this.$store.getters['auth/getProjectId'],
                                projectName:    this.$store.getters['auth/getProjectNm'],
                                siteMstrId:     this.siteMstrId || this.$store.getters['auth/getSiteMstrId'],
                                // reciveUserId:
                                // reciveuserIds:
                                docSeq:         this.docSeq_,

                                ..._payload,
                            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            // console.log(payload)

            axios.post(url, payload, options)
                .then(() => {
                    // console.log(response)
                })
                // .catch(error => {
                //     console.error(error)
                //     this.alert('발송에 실패했습니다.')
                // })
        },


    },
    data: function () {
        return {

            /** advancedInfo */
            advancedInfo: {
                docType: [],
                aprvOptnType: [],
                aprvLineGuide: [],
            },

            /** etc parameters */
            aprvOptnType: '',
            aprvOptnTypeNm: '',
            projectNm: '',            
            codeDtlTypeNm: '',
            // title: '',
            docSeq_: '',
            docSeqWritable: false,
            docTitle_: '',
            docName_: '',
            docTypeNm: '',
            
            drafterFileSgnArcvId: '',

            // 참조자
            dlHelpUser: [],

            // files
            attachments: {
                fileRegistered: [],
                files: [],
                requestForDelete: [],
            },

            approvalLine: [],

            alertModal: {
                title: '알림',
                msg: '결재상신하시겠습니까?',
                confirmBtn: '확인',
                cancelBtn: '취소',
            },
            modal: {
                alertId: '',
                approveId: '',
            },

            ozReport: {
                src: ''
            },
            
            guide: {
                list: [
                    {
                        type: 'full',
                        text: '검토 &gt; 현장대리인 &gt; 담당감리 &gt; 책임감리',
                    },
                    {
                        type: 'supervision',
                        text: 'ㅤㅤㅤ &gt; ㅤㅤㅤ &gt; 담당감리 &gt; 책임감리',
                    },
                    {
                        type: 'one-supervision',
                        text: '검토 &gt; 현장대리인 &gt; 담당감리 &gt; ㅤㅤㅤ',
                    },
                    {
                        type: 'half',
                        text: '검토 &gt; 현장대리인 &gt; ㅤㅤㅤ &gt; ㅤㅤㅤ',
                    },
                    {
                        type: 'headNSupervision',
                        text: 'ㅤㅤㅤ &gt; 현장대리인 &gt; 담당감리 &gt; 책임감리',
                    },
                ],
                current: [],
            },
            
        }
    }
}
</script>

<style lang="scss">
.modal-iframe-height {
    height: calc(100vh - 600px);
    // height: 500px;
}
</style>