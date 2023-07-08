<template>
    <b-modal
        :ref="refId"
        :id="refId"
        :title="modalTitle"

        size="xl"
        no-close-on-backdrop
        no-close-on-esc
        footer-bg-variant="transparent"
        @shown="fn_onModal"
        @hidden="fn_closeModal"
    >
        <template #default>
                <div class="pop_container">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="70">
                                <col width="*">
                                <col width="113">
                                <col width="*">
                                <col width="80">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th> {{ '사용자명' }} </th>
                                    <td>
                                        <input
                                            v-model="search.userNm"
                                            type="text"
                                            class="form_control"
                                            placeholder="입력해주세요"
                                            @keyup.enter="fn_fetchEmployee(search, false)"
                                        />
                                    </td>
                                    <th> {{ '근무지명(현장명)' }} </th>
                                    <td>
                                        <input
                                            v-model="search.workLocNm"
                                            type="text"
                                            class="form_control"
                                            placeholder="입력해주세요"
                                            @keyup.enter="fn_fetchEmployee(search, false)"
                                        />
                                    </td>
                                    <td class="ar">
                                        <button
                                            type="button"
                                            class="btn btn_sm btn_darkblue btn_radius btn_search"
                                            @keyup.enter="fn_fetchEmployee(search, false)"
                                        >
                                            검색
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table_data mt20">
                        <div class="move_box w50 pr10">
                            <div class="ib_wrap">
                                <div :id="`${refId}_employee`" class="ibsheet_table" style="height: 246px;"></div>
                            </div>
                        </div>

                        <div class="move_box w50 pl10">
                            <div class="user_table" style="height; 246px;">
                                <div class="label_item radius">
                                    <ul>
                                        <li
                                            v-for="(share, index) in shareUser"
                                            class="blue"
                                            :key="share.userId"
                                        >
                                            <strong> {{ share.userNm }} </strong>
                                            <span class="delete" @click="fn_delShare(share, index)"> {{ '삭제' }} </span>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            
            <template #modal-footer=" { hide } ">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_clickShare"> {{ '공유하기' }} </b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')"> {{ '취소' }} </b-button>
            </template>
    </b-modal>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { APPRV_EMPLOYEE_LIST } from '@plugin/ibsheet/myWork/approvedDoc.js'
import loader from '@ibsheet/loader'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name : 'ShareApproval',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'ShareApproval'
        },
        modalTitle: {
            type: String,
            default: '공유 대상 선택',
        },
        aprvInfoId: {
            type: String,
        },
        siteMstrId: {
            type: String,
        },
        projectId: {
            type: String,
        },
        projectNm: {
            type: String,
        },
        docSeq: {
            type: String,
        }
    },
    computed: {
        ...mapGetters({
            userId:     'auth/getUserId',
        })
    },
    methods: {

        fn_onModal: function () {
            this.fn_fetchEmployee()
        },
        fn_closeModal: function () {
            if (this.user.employee.sheet) this.user.employee.sheet.dispose()
        },

        fn_fetchEmployee: function (_payload, init = true) {
            const url = '/sendApi/api/popup/employeeSearch/list'
            const payload = {
                siteMstrId: this.$cookies.get('siteMstrId'),
                ..._payload
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)
                    // data-set
                    this.user.employee.data = response.data.datas.resultList

                    if (init) {
                        this.user.employee.options = APPRV_EMPLOYEE_LIST.options
                        this.user.employee.options.Events = {
                            onDblClick: (event) => {
                                this.fn_addShare(event.sheet)
                            },
                            onRenderFinish: (event) => {
                                /** 일단 본인만 제외 */
                                event.sheet.getDataRows().forEach(row => {
                                    if (row.userId == this.userId) {
                                        event.sheet.hideRow(row)
                                    }
                                })
                            }
                        }
                        loader.createSheet({
                            el: `${this.refId}_employee`,
                            data: this.user.employee.data,
                            options: this.user.employee.options
                        }).then(sheet => {
                            this.user.employee.sheet = sheet
                        })
                    } else {
                        this.user.employee.sheet.loadSearchData({
                            data: this.user.employee.data,
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_addShare: function (sheet = this.user.employee.sheet) {

            if (this.shareUser.length > this.maxLength) {
                return
            }

            const select = sheet.getFocusedRow()
            
            sheet.hideRow(select)
            this.shareUser.push(select)
        },
        fn_delShare: function (help, index) {
            this.user.employee.sheet.showRow(help)
            this.shareUser.splice(index, 1)
        },
        fn_clickShare: function () {
            // this.$emit('choice', [...this.helper])
            const url = '/sendApi/api/approv/aprvShareUser/write'
            const payload = {
                dmApprvDoc: {
                    aprvInfoId: this.aprvInfoId,
                    siteMstrId: this.siteMstrId,
                },
                dlShareUser: this.shareUser.map(item => {
                    return {
                        status:          'Added',
                        userDiv:         'SHARE',
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
                })
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200 ) {
                        this.alert('공유되었습니다. ', () => {
                            this.fn_sendMessage({
                                messageCode:    'A074',
                                siteMstrId:     this.siteMstrId,
                                reciveUserIds: this.shareUser.map(item => item.userId)
                            })

                            this.$emit('callback', true)
                            this.$bvModal.hide(this.refId)
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })


        },

        /** 통합 메세지 */
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
            search: {
                userNm: '',
                workLocNm : '',
            },
            maxLength: 10,
            shareUser: [],

            user: {
                employee: {
                    sheet: null,
                    data: [],
                    options: {},
                }
            }
        }
    }

}
</script>
