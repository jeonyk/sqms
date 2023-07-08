<template>
    <section id="final_approved">
        <b-modal
            :ref="refId"
            :id="refId"
            :title="title"
            size="xl"
            footer-bg-variant="transparent"

        >
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list table_write" >
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="9%">
                                <col width="*">
                                <col width="12%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">적합여부</span></th>
                                    <td class="cell_division ac">
                                        <ul>
                                            <!-- temporary -->
                                            <li>
                                                <label for="aprvResult_pass" class="input_radio">
                                                    <input
                                                        v-model="aprvResult"
                                                        type="radio" 
                                                        id="aprvResult_pass"
                                                        name="aprvResult" 
                                                        class="form_control"
                                                        :value="'PASS'"
                                                    >
                                                    <span class="label_text">적합</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label for="aprvResult_part" class="input_radio">
                                                    <input
                                                        v-model="aprvResult"
                                                        type="radio" 
                                                        id="aprvResult_part"
                                                        name="aprvResult" 
                                                        class="form_control"
                                                        :value="'PART'"
                                                    >
                                                    <span class="label_text">조건부 적합</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label for="aprvResult_unpass" class="input_radio">
                                                    <input
                                                        v-model="aprvResult"
                                                        type="radio" 
                                                        id="aprvResult_unpass"
                                                        name="aprvResult" 
                                                        class="form_control"
                                                        :value="'UNPASS'"
                                                    >
                                                    <span class="label_text">부적합</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </td>

                                    <th><span class="emp_red">완료 처리 일자</span></th>
                                    <td>
                                        <date-picker
                                            v-model="date"
                                            :input-style="{'max-width':'100%'}"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>코멘트</th>
                                    <td colspan="3">
                                        <textarea
                                            v-model="comment"
                                            class="form_control"
                                            placeholder="코멘트를 입력하세요"
                                            :maxlength="500"
                                        />
                                        <p class="table_message ar">{{ comment? comment.length : 0}} / {{'500'}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th v-html="fn_toHtml('오프라인\n결재서류\n(스캔본)')"></th>
                                    <td colspan="3">
                                        <LstFile
                                            ref="finalApproval"
                                            :files="files"
                                            @file-changed="fn_fileChanged"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button
                    class="btn btn_md btn_outline btn_darkgray"
                    @click="fn_clickInput"
                >
                    입력
                </b-button>
                <b-button
                     class="btn btn_md btn_outline btn_gray"
                     @click="hide('forget')"
                >
                    취소
                </b-button>
            </template>
        </b-modal>
    </section>
</template>

<script>
import LstFile from '@/pages/common/popup/LstFile'
import DatePicker from '@component/common/DatePicker.vue'

import axios from 'axios'

export default {
    name: 'FinalApproved',
    components: {
        LstFile,
        DatePicker,
    },
    props: {
        refId: {
            type: String,
            default: 'finalApproved',
        },
        title: {
            type: String,
            default: '최종승인 처리',
        },
        aprvInfoId: {
            type: String,
            require: true
        },

    },
    mounted: function () {

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
                    axios.post(urls.masterCode, {...payload, groupCode: 'APPR_RESULT'}, options),
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.aprvResult     = response[0].data.data
                }))
                .then(() => {
                    this.fn_initialize()
                })

        },



        fn_toHtml: function (string) {
            return string ? string.split('\n').join('<br>') : ''
        },
        fn_fileChanged: function (payload) {
            this.files = payload
        },

        fn_clickInput: function () {
            // console.log('click input')
        },
        fn_setFinalApproval: function () {
            // need to API
            const url = ''
            const payload = {
                aprvInfoId: this.aprvInfoId,
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
                    // prepare the next
                })
                .catch(error => {
                    console.error(error)
                    throw new Error(error)
                })
        }
    },
    data: function () {
        return {

            advancedInfo: {
                aprvResult: [],
            },

            aprvResult: null,
            date: null,
            comment: null,
            files: [],
        }
    },
}
</script>
