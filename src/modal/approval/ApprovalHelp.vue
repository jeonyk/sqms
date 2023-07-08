<template>
    <section id="approvalHelp">
        <b-modal
            :ref="refId"
            :id="refId"
            :title="modalTitle"

            size="xl"
            footer-bg-variant="transparent"
            no-close-on-backdrop
            no-close-on-esc
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
                                            @click="fn_fetchEmployee(search, false)"
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
                        <span class="label_text"><strong>{{'참조 대상 선택'}}</strong></span>
                            <div class="ib_wrap">
                                <div :id="`${refId}_employee`" class="ibsheet_table" style="height: 246px;"></div>
                            </div>
                        </div>

                        <div class="move_box w50 pl10">
                            <span class="label_text"><strong>{{'참조 명단'}}</strong></span>
                            <div class="user_table" style="height: 246px;">
                                <div class="label_item radius">
                                    <ul>
                                        <li
                                            v-for="(help, index) in helper"
                                            class="blue"
                                            :key="help.userId"
                                        >
                                            <strong> {{ help.userNm }} </strong>
                                            <span class="delete" @click="fn_delHelp(help, index)"> {{ '삭제' }} </span>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            
            <template #modal-footer=" { hide } ">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_clickChoice"> {{ '선택' }} </b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')"> {{ '취소' }} </b-button>
            </template>
        </b-modal>
    </section>
</template>

<script>
import { APPRV_EMPLOYEE_LIST } from '@plugin/ibsheet/myWork/approvedDoc.js'
import loader from '@ibsheet/loader'
import axios from 'axios'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
// import _ from 'lodash'

export default {
    name: 'ApprovalHelp',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'ApprovalLine'
        },
        modalTitle: {
            type: String,
            default: ' 대상 선택',
        },

        /** v-model helper */
        /** helper 참조자 */
        help: {
            type: Array,
            default: () => {
                return []
            }
        },
        /** line 결제라인 */
        line: {
            type: Array,
            default: () => {
                return []
            }
        },
        draft: {
            type: String,
            default: ''
        },
        


    },
    mounted: function () {

    },
    methods: {


        fn_onModal: function () {
            // console.log('onModal')

            this.fn_fetchEmployee()

            this.helper = [...this.help]

        },
        fn_closeModal: function () {
            // console.log('closeModal')

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
                                this.fn_addHelp(event.sheet)
                            },
                            onRenderFinish: (event) => {
                                // console.log('onRenderFinish')
                                const lineUser = this.line.map(item => item.userId)
                                const helpUser = this.help.map(item => item.userId)
                                const current  = this.helper.map(item => item.userId)
                                // in helper list
                                event.sheet.getDataRows().forEach(row => {
                                    if (lineUser.includes(row.userId) 
                                        || helpUser.includes(row.userId)
                                        || current.includes(row.userId)
                                        || this.draft == row.userId) {
                                        event.sheet.hideRow(row)
                                    }
                                })
                                // in line list
                                
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
        fn_addHelp: function (sheet = this.user.employee.sheet) {

            if (this.helper.length >= this.maxLength) {
                this.alert(`${this.maxLength}명 초과한 인원은 등록할 수 없습니다.`)
                return
            }

            const select = sheet.getFocusedRow()
            

            sheet.hideRow(select)
            this.helper.push(select)
        },
        fn_delHelp: function (help, index) {
            this.user.employee.sheet.showRow(help)
            this.helper.splice(index, 1)
        },
        fn_clickChoice: function () {
            
            this.$emit('choice', [...this.helper])
            this.$bvModal.hide(this.refId)
        }

    },
    data: function () {
        return {
            search: {
                userNm: '',
                workLocNm : '',
            },
            helper: [],
            maxLength: 10,

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
