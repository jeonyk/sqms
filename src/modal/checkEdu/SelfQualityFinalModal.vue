<template>
    <section id="SelfQualityFinalModal">
        <b-modal
            :ref="refId"
            :id="refId"
            :title="modalTitle"

            size="xxl"
            footer-bg-variant="transparent"
            no-close-on-backdrop
            no-close-on-esc
            scrollable 

            @shown="fn_onModal"
            @hidden="fn_hiddenModal"
        >
            <template #default>
                <div class="pop_container">
                    <div class="tab_contents">
                        <div class="table_normal_list">
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
                                        <th>점검 유형</th>
                                        <!-- <td>{{ final.info.selfQltyTypeNm }}{{ result.info.selfQltyType == 'PTNR'? '('+result.info.tradeNm+')' : '' }}</td> -->
                                        <td>{{ resultData.selfQltyTypeNm }}</td>
                                        <th>점검 완료 요청일</th>
                                        <td>{{ resultData.chkReqDt }}</td>
                                    </tr>
                                    <tr>
                                        <th>제목</th>
                                        <td colspan="3">{{ resultData.title }}</td>
                                    </tr>
                                    <tr>
                                        <th>점검 양식 (Check List)</th>
                                        <td colspan="3">{{ resultData.selfChkInfoTitle }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="button_box">
                            <strong>점검자 선택</strong>
                        </div>
                        <div class="ib_wrap" style="height: calc(50vh - 300px)">
                            <div :id="`${refId}_checkUser`" class="ibsheet_table" style="height: 100%;"></div>
                        </div>

                        <div class="button_box">
                            <strong>1. Check List</strong>
                        </div>
                        <div class="ib_wrap" style="height: calc(50vh - 120px)">
                            <div :id="`${refId}_finalCheckSheet`" class="ibsheet_table" style="height: 100%;"></div>
                        </div>

                        <div class="button_box">
                            <strong>2. 점검 결과</strong>
                        </div>

                        <div class="table_normal_list table_write">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="15%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th><span>자체품질점검 결과</span></th>
                                        <td>{{ current.result }}</td>
                                    </tr>
                                    <tr v-if="current.attachment.images && current.attachment.images.length > 0">
                                        <th>점검사진</th>
                                        <td>
                                            <LstImg
                                                :lst-file-rst="current.attachment.images"
                                                :uploadable="false"
                                                :copyable="false"
                                                downloadable
                                                :file-type="'accpQltyPicturePop'"
                                            />
                                        </td>
                                    </tr>
                                    <tr v-if="current.attachment.files && current.attachment.files.length > 0">
                                        <th>첨부파일</th>
                                        <td>
                                            <LstFile
                                                :lst-file-rst="current.attachment.files" 
                                                :uploadable="false"
                                                downloadable
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>

        </b-modal>
    </section>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import axios from 'axios'
import loader from '@ibsheet/loader'
import LstImg from '@/pages/common/popup/LstImg'
import LstFile from '@/pages/common/popup/LstFile.vue'

import { siteCheckResultList, checkUserSelectList } from '@/pages/common/data/PopupList'

export default {
    name: 'SelfQualityFinalModal',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'SelfQualityFinalModal'
        },
        modalTitle: {
            type: String,
            default: '최종 송부'
        },

        siteMstrId: {
            type: String,
            default: function () {
                return this.$store.getters['auth/getSiteMstrId']
            }
        },
        selfQltySiteInfoId: {
            type: String,
            default: ''
        },
    },
    components: {
        LstImg,
        LstFile,
    },
    methods: {
        fn_onModal: function () {

            this.fn_fetchData()
        },
        fn_hiddenModal: function () {
            if(this.checkUserSheet) this.checkUserSheet.dispose()
            if(this.checkListSheet) this.checkListSheet.dispose()

        },
        fn_fetchData: function () {
            const url = '/sendApi/api/selfQltyChk/site/checkFinl/view'
            const payload = {
                siteMstrId:         this.siteMstrId,
                selfQltySiteInfoId: this.selfQltySiteInfoId,
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
                    if (response.status === 200 ) {
                        this.resultData         = response.data.resultData

                        const checkUserOptions  = {
                            ...checkUserSelectList.options
                        }
                        checkUserOptions.Cfg    = {
                            NoVScroll: false,
                        }

                        this.resultData.chkRslt.forEach((item) => {
                            
                            if (item.chkRsltVO) {
                                item.chkRsltVO.forEach(subItm => {
                                    subItm.pass   = subItm.accpChkRslt === 'PASS'     ? '1' : ''
                                    subItm.part   = subItm.accpChkRslt === 'PART'     ? '1' : ''
                                    subItm.unpass = subItm.accpChkRslt === 'UNPASS'   ? '1' : ''
                                    subItm.none   = subItm.accpChkRslt === 'NONE'     ? '1' : ''
                                })
                            }

                            item.replyYn    = item.chkRsltStatus === 'REGT'
                                                ? '0'
                                                : item.chkRsltStatus === 'CHCK'
                                                    ? '1'
                                                    : ''
                            if (item.chkRsltStatus === 'CHCK') {
                                this.fn_getFileList({
                                    fileType:       'SelfQltyChkImg',
                                    fileConnectId:  item.selfSiteChkRstId,
                                },
                                (res) => {
                                    item.images     = res
                                })
                                this.fn_getFileList({
                                    fileType:       'SelfQltyChk',
                                    fileConnectId:  item.selfSiteChkRstId,
                                },
                                (res) => {
                                    item.files     = res
                                })
                            }
                        })

                        // Event 처리
                        checkUserOptions.Events = {
                            onAfterClick: (event) => {
                                if (event.col === 'chk' && event.row.replyYn === 1 && event.row.inUser !== this.current.user) {
                                    this.checkListSheet.loadSearchData({
                                        data: this.resultData.chkRslt[event.row.SEQ - 1].chkRsltVO
                                    })
                                    this.current.user = event.row.inUser
                                    //set-user
                                    this.current.result              = this.resultData.chkRslt[event.row.SEQ - 1].selfSiteContent
                                    this.current.attachment.images   = this.resultData.chkRslt[event.row.SEQ - 1].images
                                    this.current.attachment.files    = this.resultData.chkRslt[event.row.SEQ - 1].files
                                }
                            },
                            onRenderFinish: (event) => {
                                event.sheet.getDataRows().forEach(row => {
                                    if (row.replyYn === '') {
                                        event.sheet.setAttribute(row, 'chk', 'CanEdit', false)
                                        event.sheet.setAttribute(row, null, 'Class', 'disabled')
                                    }
                                })
                            },
                        }

                        loader.createSheet({
                            el: `${this.refId}_checkUser`,
                            data: this.resultData.chkRslt,
                            options: checkUserOptions,
                        }).then(sheet => {
                            this.checkUserSheet = sheet
                        })

                        const checkListOptions  = { ...siteCheckResultList.options }
                        checkListOptions.Cols[5].Header[0].Class = ''
                        checkListOptions.Cfg    = {
                            CanEdit: false,
                            NoVScroll: false,
                        }
                        checkListOptions.Events = {
                            onRenderFirstFinish: (event) => {
                                let row
                                this.checkUserSheet.getDataRows().some(item => {
                                    if(item.replyYn === 1) {
                                        row = item
                                        return true
                                    }
                                })
                                this.checkUserSheet.setCheck(row, 'chk', true)
                                this.current.user = row.inUser
                                event.sheet.loadSearchData({
                                    data: this.resultData.chkRslt[row.SEQ - 1].chkRsltVO
                                })
                                //set-user
                                    this.current.result              = this.resultData.chkRslt[row.SEQ - 1].selfSiteContent
                                    this.current.attachment.images   = this.resultData.chkRslt[row.SEQ - 1].images
                                    this.current.attachment.files    = this.resultData.chkRslt[row.SEQ - 1].files
                            }
                        }

                        loader.createSheet({
                            el: `${this.refId}_finalCheckSheet`,
                            data: [],
                            options: checkListOptions
                        }).then(sheet => {
                            this.checkListSheet = sheet
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },


        // util api
        fn_getFileList: function (_payload, callback) {
            const url = '/sendApi/api/file/upFileList'
            const payload = {
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
                    if (callback) {
                        return callback(response.data.data)
                    } else {
                        throw new Error('fn_getFileList')
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },

    },
    data: function () {
        return {
            resultData: {},

            checkUserSheet: null,
            checkListSheet: null,


            current: {
                user: null,
                result: '',
                attachment: {
                    files:  [],
                    images: [],
                    copiedFileIds:[],
                },
            },

        }
    }

}
</script>
