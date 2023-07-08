<template>
    <section id="RegistApprovalAgncy_div">
        <b-modal
            :ref="refId"
            :id="refId"
            :title="modalTitle"

            size="lg"
            no-close-on-backdrop
            no-close-on-esc
            static
            footer-bg-variant="transparent"
            @shown="fn_onModal"
            @hidden="fn_hideModal"
        >
            <template #default>
                <div class="pop_container">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="120">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th> <span class="emp_red"> {{'대리 결재자'}}</span></th>
                                    <td>
                                        <input
                                            class="form_control"
                                            style="max-width: 288px;"
                                            :value="data.user.userNm ? data.user.userNm : ''"
                                            readonly
                                        />
                                        <button
                                            type="button"
                                            class="btn btn_sm btn_darkblue ml10"
                                            v-b-modal.RegistApprovalAgncy_employee
                                        >
                                            <!-- @click="$bvModal.show('EmployeeSearch')" -->
                                            {{'검색'}}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="emp_red"> {{'대리 결재기간'}}</span> </th> 
                                    <td>
                                        <datepicker
                                            v-model="data.aprvStartDt"
                                            format="YYYYMMDD"
                                            :disabled-before-date="$moment().toDate()"
                                        />
                                        ~ 
                                        <datepicker
                                            v-model="data.aprvEndDt"
                                            format="YYYYMMDD"
                                            :disabled-before-date="$moment().toDate()"
                                        />
                                                                                
                                    </td>
                                </tr>
                                <tr>
                                    <th>{{'사유'}}</th>
                                    <td>
                                        <!-- <div class="input_text">
                                            <textarea  class="form_control" placeholder="입력해주세요"></textarea>
                                            <div class="num"><strong class="count">187</strong>/200</div>
                                        </div> -->
                                        <div class="input_text">
                                    <textarea 
                                        v-model="data.agncyAprvResn" class="form_control" :maxlength="defaultInfo.maxLength"></textarea>
                                    <div class="num"><strong class="count">{{String(data.agncyAprvResn).length}}</strong>/{{defaultInfo.maxLength}}</div>
                                </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_clickSave">{{'저장'}}</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">{{'취소'}}</b-button>
            </template>
        </b-modal>
        <employee-search
            :empl-pop-id="'RegistApprovalAgncy_employee'"
            :site-mstr-id="siteMstrId"
            @fn-employee-choice="(payload) => { data.user = payload}"
        />
    </section>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import Datepicker from '@component/common/DatePicker.vue'
import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'RegistApprovalAgncy',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'RegistApprovalAgncy'
        },
        modalTitle: {
            type: String,
            default: '대결(부재/위임) 추가'
        },
    },
    components: {
        Datepicker,
        EmployeeSearch
    },
    computed: {
        ...mapGetters({
            userId:     'auth/getUserId',
            siteMstrId: 'auth/getSiteMstrId',
        })
    },
    methods: {

        fn_onModal: function () {
            // console.log('onModal')
            this.data.aprvStartDt   = this.$moment().add(1 ,'days').format('YYYYMMDD')
            this.data.aprvEndDt     = this.$moment().add(1 ,'days').format('YYYYMMDD')
        },
        fn_hideModal: function () {
            this.data   = {
                            aprvStartDt: this.$moment().add(1 ,'days').format('YYYYMMDD'),
                            aprvEndDt: this.$moment().add(1 ,'days').format('YYYYMMDD'),
                            agncyAprvResn: '',
                            user : {},
                        }
        },
        fn_setAgncy: function () {
            const url = '/sendApi/api/approv/agncyAprvInfo/write'
            const payload = {
                ...this.data,
                userId:             this.userId,
                agncyUserId:        this.data.user.userId,
                agncyUserType:      'HEC',
                agncyUserNm:        this.data.user.userNm,
                agncyJobTitle:      this.data.user.jobTitle,
                agncyJobRoleNm:     this.data.user.jobRoleNm,
                agncyTradeId:       this.data.user.workLocCd,
                agncyTradeNm:       this.data.user.workLocNm,
                agncyTradeType:     '',
                agncyTradeTypeNm:   '',
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
                        this.$bvModal.hide(this.refId)
                        this.$emit('callback', true)
                    }
                })
                .catch(error => {
                    console.error(error)
                })  
            
        },
        fn_clickSave: function () {
            if(!this.data.user.userId) {
                this.alert('대리 결재자를 지정해주세요')
            }
            if(this.data.aprvStartDt === null || this.data.aprvEndDt === null) {
                this.alert('대결 기간을 설정해주세요')
            }


            this.confirm('기존 대리 결재자 설정을 삭제하고 등록합니다.', () => {
                this.fn_setAgncy()
            })
        },
    },
    data: function () {
        return {
            data: {
                aprvStartDt: null,
                aprvEndDt: null,
                agncyAprvResn: '',
                user : {},
            },

            defaultInfo: {
                maxLength: 100

            },

            
        }
    }

}
</script>
