<template>
    <b-modal
        :ref="refId"
        :id="refId"
        :title="modalTitle"

        size="xxl"
        footer-bg-variant="transparent"
        scrollable
        no-close-on-backdrop
        no-close-on-esc
        hide-footer

        @shown="fn_onModal"
        @hidden="fn_hiddenModal"
    >
        <template #default>
            <div class="pop_container">
                <div cass="button_box">
                    <div class="fl mb10">
                        <!-- <strong> {{ dmApprvDoc.aprvOptnNm }} </strong> -->
                        <strong>
                            <span
                                class="state"
                                :class="{'green': dmApprvDoc.aprvOptnType === 'ALLON', 'yellow': dmApprvDoc.aprvOptnType === 'HAFON', 'gray': dmApprvDoc.aprvOptnType === 'OFFLN'}"
                            />
                            {{`${dmApprvDoc.aprvOptnNm? dmApprvDoc.aprvOptnNm : ''} 결재`}} 
                        </strong>
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
                                <th>{{'문서번호'}}</th>
                                <td>{{dmApprvDoc.docSeq}}</td>

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
                                <th>{{'현장명'}}</th>
                                <td>{{ dmApprvDoc.siteNm }}</td>

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
                                <th> {{'제목'}} </th>
                                <td><pre>{{dmApprvDoc.title}}</pre></td>

                                <td 
                                    v-for="(aprv) in dlApprvUser"
                                    :key="`${aprv.userId}_${aprv.aprvOrder}`"
                                    class="ac"                                
                                >
                                    {{ aprv.agncyAprvYn === 'Y' ? aprv.agncyUserNm :  aprv.aprvUserNm}}
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
                                <th>{{'문서종류'}}</th>
                                <td class="cell_division">
                                    <ul>
                                        <li style="width: 20%;">{{dmApprvDoc.docTypeNm}}</li>
                                        <li> {{ dmApprvDoc.docName }} </li>
                                    </ul>
                                </td>

                                <td 
                                    v-for="aprv in dlApprvUser"
                                    :key="`${aprv.userId}_${aprv.aprvOrder}`"
                                    class="ac"                                
                                >
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

                            <tr>
                                <th>{{'검토 의견'}}</th>
                                <td colspan="7">
                                    <div class="lst_comment">
                                        <ul>
                                            <li
                                                v-for="cmt in dlCmtList.filter((cmtItm,cmtIdx) => cmtIdx !== 0 ).filter(cmtItm => cmtItm.aprvDttm)"
                                                :key="cmt.aprvUser"
                                            >
                                                <strong>{{cmt.aprvUserNm}} / {{cmt.userType === 'HEC' ? 'HEC' : '협력사' }}</strong>
                                                <span> {{ cmt.dtlComment }} </span>
                                                ( {{ $moment(cmt.aprvDttm).format('YYYY-MM-DD HH:mm:ss') }} )
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <th>첨부파일</th>
                                <td colspan="7">
                                    <LstFile
                                        ref="attachments"
                                        :lst-file-rst="files.attachment"
                                        :uploadable="false"
                                        downloadable
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box" v-if="dmApprvDoc.finlAprvYn === 'Y' && (dmApprvDoc.finlAprvRst && dmApprvDoc.finlAprvRst !== '')">
                    <strong>{{ dmApprvDoc.aprvOptnType === 'ALLON' ? '감리단 검토' : '최종 승인 처리'}}</strong> 
                </div>
                <div class="table_normal_list table_write" v-if="dmApprvDoc.finlAprvYn === 'Y' && (dmApprvDoc.finlAprvRst && dmApprvDoc.finlAprvRst !== '')">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="9%">
                            <col width="*">
                            <col width="9%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span>{{'적합여부'}}</span></th>
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
                                    <span>{{'완료 처리 일자'}}</span>
                                </th>
                                <td v-if="dmApprvDoc.aprvOptnType !== 'ALLON'">
                                    <datepicker
                                        v-model="dmApprvDoc.endDate"
                                        :input-style="{'max-width': '50%'}"
                                        :format="'YYYYMMDD'"
                                        disabled
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th>{{'코멘트'}}</th> 
                                <td colspan="3"><pre>{{dmApprvDoc.comment}}</pre></td>
                            </tr>

                            <tr v-if="dmApprvDoc.aprvOptnType !== 'ALLON'" >
                                <th id="scan" v-html="'<span>오프라인<br>결재서류<br>스캔본</span>'"></th>
                                <td colspan="3">
                                    <LstFile
                                        :lst-file-rst="files.finalApproval"
                                        :uploadable="false"
                                        downloadable
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <iframe
                    v-if="ozReportSrc !== ''"
                    class="w100"
                    style="height: 1372px"
                    :src="ozReportSrc"
                />
            </div>
        </template>
        
        <!-- <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">{{'확인'}}</b-button>
        </template> -->
    </b-modal>
</template>

<script>

import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import LstFile from '@/pages/common/popup/LstFile'
import Datepicker from '@component/common/DatePicker.vue'

import axios from 'axios'
import _ from 'lodash'

export default {
    name: 'ApprovalView',
    mixins: [MsgBoxMixins, authCheckMixns],
    props: {
        refId: {
            type: String,
            default: 'ApprovalView'
        },
        modalTitle: {
            type: String,
            default: '결재 보기'
        },

        /** 결재 아이디 */
        aprvInfoId: {
            type: String,
            require
        },
        requestId: {
            type: String,
            default: undefined
        },
        fileType: {
            type: String,
            default: undefined
        },

        optional: {
            type: Object,
            default: null,
        },


    },
    components: {
        LstFile,
        Datepicker,
    },
    methods: {
        fn_onModal: function () {
            if (_.isEmpty(this.aprvInfoId)) {
                this.alert('결재상신이 되지 않았습니다.', () => {
                    this.$bvModal.hide(this.refId)
                })
            } else {
                this.fn_fetchAdvancedInfo()
            }
        },
        fn_hiddenModal: function () {

            this.dmApprvDoc     = {}
            this.dlHelpUser     = []
            this.dlCmtList      = []
            this.dlApprvUser    = []

            /** advanced Info */
            this.advancedInfo   = {
                                    aprvOptnType: [],
                                    dtyCd: [],
                                    finlAprvRst: [],
                                }

            this.files          = {
                                    attachment: [],
                                    finalApproval: [],
                                }

            this.ozReportSrc    = ''
        },
        fn_fetchAdvancedInfo: function () {
            const urlMasterCode = '/sendApi/api/common/masterCode/list'

            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.all([
                    axios.post(urlMasterCode, {groupCode: 'APRV_OPTN_TYPE'}, options),
                    axios.post(urlMasterCode, {groupCode: 'DTY_CD'},         options),
                    axios.post(urlMasterCode, {groupCode: 'FINL_APRV_RST'},  options),
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.aprvOptnType  = response[0].data.data
                    this.advancedInfo.dtyCd         = response[1].data.data
                    this.advancedInfo.finlAprvRst   = response[2].data.data

                    return this.fn_fetchData()
                }))

        },
        fn_fetchData: function () {
            const url = '/sendApi/api/approv/approvedDoc/sheet'

            const payload = {
                aprvInfoId:         this.aprvInfoId,
                aprvFileConnectId:  this.requestId,
                fileType:           this.fileType,                
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
                    if (response.status === 200 && !_.isEmpty(response.data.datas.dmApprvDoc)) {
                        this.dmApprvDoc         = response.data.datas.dmApprvDoc
                        this.dlHelpUser         = response.data.datas.dlHelpUser
                        this.dlCmtList          = response.data.datas.dlCmtList
                        this.dlApprvUser        = response.data.datas.dlApprvUser

                    } else {
                        throw new Error('APRV_VIEW > fn_fetchData')
                    }
                    return response
                })
                .catch(error => {
                    console.error(error)
                    this.$bvModal.hide(this.refId)
                })
                .then((response) => {
                    /** user dtyCd 설정 */
                    this.dlApprvUser.forEach(user => {
                        user.dtyNm = this.advancedInfo.dtyCd.find(dty => dty.codeVal === user.dtyCd)?.codeNameKr
                    })
                    /** requestId, fileType emptyCase */
                    if ( _.isEmpty(this.requestId) || _.isEmpty(this.fileType)) {
                        const payload = {
                            fileConnectId: this.dmApprvDoc.aprvFileConnectId,
                            fileType: this.dmApprvDoc.fileType,
                        }
                        this.fn_getFileList(payload, (data) => {
                            this.files.attachment = data
                        })
                    } else {
                        this.files.attachment = response.data.datas.dlAtchFile
                    }

                    /** empty data... */
                    if (this.dmApprvDoc.finlAprvYn === 'Y' 
                        && (this.dmApprvDoc.finlAprvRst && this.dmApprvDoc.finlAprvRst !== '')) {
                            const payload = {
                                fileConnectId: this.dmApprvDoc.aprvInfoId,
                                fileType: 'FinalArcv'
                            }
                            this.fn_getFileList(payload, (data) => {
                                this.files.finalApproval = data
                            })
                    }

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
                    if (response.status === 200) {
                        if (callback) {
                            return callback(response.data.data)
                        }
                    } else {
                        throw new Error('APRV_VIEW > fn_getFileList')
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_toPascalCase: function (str) {
            return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase())
        },

        /** Ozreport */
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
                                    this.ozReportSrc    = this.$store.getters['auth/getOzTypeList'][6].jspNm
                                                            + [
                                                                `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                `mtrlSpApprId=${this.dmApprvDoc.aprvFileConnectId}`,
                                                            ]
                                                            .join('&')
                                    break
                                }
                                case 'TSAC': {
                                    this.ozReportSrc    = this.$store.getters['auth/getOzTypeList'][12].jspNm
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
                                            this.ozReportSrc    =  (response.data.data.rmcYn === 'Y' 
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
                                    this.ozReportSrc    = this.$store.getters['auth/getOzTypeList'][25].jspNm
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
                                            this.ozReportSrc    =    (
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
                                    this.ozReportSrc    = this.$store.getters['auth/getOzTypeList'][16].jspNm
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
                                            this.ozReportSrc    = (this.dmApprvDoc.codeDtlType == 'CAR' ? 
                                                                        this.$store.getters['auth/getOzTypeList'][30].jspNm : 
                                                                        this.$store.getters['auth/getOzTypeList'][31].jspNm)
                                                                    + [
                                                                        `&noCnfmInfoId=${this.dmApprvDoc.aprvFileConnectId}`, 
                                                                        // `aprvInfoId=${this.dmApprvDoc.aprvInfoId}`, 
                                                                        `aprvInfoId=${response.data.view?.aprvInfoId !== null ? response.data.view.aprvInfoId : this.dmApprvDoc.aprvInfoId}`,
                                                                        `aprvInfoId2=${response.data.view?.aprvInfoId2 !== null ? response.data.view.aprvInfoId2 : ''}`,
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
                    }
                    break
                }
                case 'TEST': {
                    switch(this.dmApprvDoc.codeType) {
                        case 'TEST': {
                            axios.post('/sendApi/api/testMngt/testResultMngt/testSubjectDetail/list', {testResultMngtSeq: this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0], siteMstrId: this.dmApprvDoc.siteMstrId} ,options)
                                .then(response => {
                                    const dmTestDetail = response.data.datas.dmTestDetail

                                    let docType = ''

                                    if (this.optional && this.optional.docType) {
                                        docType     = this.optional.docType === 'request' 
                                                        ? 'request' 
                                                        : this.optional.docType === 'compare'
                                                            ? 'compare'
                                                            : ''
                                    } else {
                                        if (this.dmApprvDoc.codeDtlType === 'REQT' 
                                            &&  ((this.dmApprvDoc.aprvInfoId === dmTestDetail.rqstodcAprvInfoId)
                                                || (['RQPR', 'RQRP', 'RQRA', 'RQRE'].includes(String(dmTestDetail.resultProgrsStatus))
                                                    && !['TTRG'].includes(String(dmTestDetail.resultProgrsStatus))))) {
    
                                            docType = 'request'
                                        } else if (this.dmApprvDoc.codeDtlType === 'SITE' 
                                            || this.dmApprvDoc.codeDtlType === 'FTRY' 
                                            || (this.dmApprvDoc.codeDtlType === 'REQT'
                                                && ((this.dmApprvDoc.aprvInfoId === dmTestDetail.resultAprvInfoId)
                                                    || ['TTPR', 'RGPR', 'APRV', 'APRE'].includes(dmTestDetail.resultProgrsStatus)))) {
                                            docType = 'compare'
                                        }

                                    }
                                    

                                    if (docType === 'request') {
                                        this.dmApprvDoc.docName = '품질검사 의뢰서'
                                        this.ozReportSrc    = this.$store.getters['auth/getOzTypeList'][5].jspNm
                                                                + [
                                                                    `&siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                                                    `userId=${this.dmApprvDoc.drafterId}`,
                                                                    `testResultMngtSeq=${this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0]}`,
                                                                    `aprvInfoId=${this.dmApprvDoc.aprvInfoId}`,
                                                                ].join('&')
                                    } else if (docType === 'compare') {
                                        this.dmApprvDoc.docName = '시험성과 대비표'
                                        this.ozReportSrc    = this.$store.getters['auth/getOzTypeList'][1].jspNm
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
                                    //         this.ozReportSrc    = url
                                    //                                 + '/qulityTestRqstdoc.jsp?'
                                    //                                 + [
                                    //                                     `siteMstrId=${this.dmApprvDoc.siteMstrId}`,
                                    //                                     `userId=${this.dmApprvDoc.drafterId}`,
                                    //                                     `testResultMngtSeq=${this.dmApprvDoc.aprvFileConnectId?.split('_').reverse()[0]}`
                                    //                                 ].join('&')

                                    // } else if (this.dmApprvDoc.codeDtlType === 'SITE' 
                                    //     || this.dmApprvDoc.codeDtlType === 'FTRY' 
                                    //     || (this.dmApprvDoc.codeDtlType === 'REQT' && (resultProgrsStatus === 'TTPR' || resultProgrsStatus === 'RGPR'))) {
                                    //         this.ozReportSrc    = url
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
                                    this.ozReportSrc    = this.$store.getters['auth/getOzTypeList'][27].jspNm
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
                    switch(this.dmApprvDoc.codeType){
                        default: {
                            switch(this.dmApprvDoc.codeDtlType) {
                                default: {
                                    this.ozReportSrc    = this.$store.getters['auth/getOzTypeList'][0].jspNm
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

    },
    data: function () {
        return {
            /** default Info */
            dmApprvDoc: {},
            dlHelpUser: [],
            dlCmtList: [],
            dlApprvUser: [],

            /** advanced Info */
            advancedInfo: {
                aprvOptnType: [],
                dtyCd: [],
                finlAprvRst: [],
            },

            files: {
                attachment: [],
                finalApproval: [],
            },

            ozReportSrc: '',


        }
    },

}
</script>

<style lang="scss" >
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