<template>
    <b-modal
        :ref="refId"
        :id="refId"
        :title="modalTitle"
        
        size="lg"
        footer-bg-variant="transparent"
        no-close-on-backdrop
        no-close-on-esc
        static
        @shown="fn_onModal"
        @hidden="fn_offModal"
    >
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <strong> {{'직원 타입'}} </strong>
                    <label class="input_radio" for="userType_HEC">
                        <input
                            v-model="userType"
                            type="radio"
                            id="userType_HEC"
                            value="HEC"                                    
                        />
                        <span class="label_text"> {{ '직원' }} </span>
                    </label>
                    <label class="input_radio" for="userType_PTNR">
                        <input
                            v-model="userType"
                            type="radio"
                            id="userType_PTNR"
                            value="PTNR"                                    
                        />
                        <span class="label_text"> {{ '협력사' }} </span>
                    </label>
                </div>
                <div class="lookup_box multi_line" v-show="userType === 'HEC'">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="84">
                            <col width="*">
                            <col width="84">
                            <col width="180">
                            <col width="100">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th> {{ '프로젝트명' }} </th>
                                <td>
                                    <input 
                                        v-model="search.employee.workLocNm"
                                        type="text" 
                                        class="form_control" 
                                        placeholder="입력해주세요"
                                        @keyup.enter="fn_clickSearch('employee')"
                                    />
                                </td>        
                                <th> {{ '사용자명' }} </th>
                                <td>
                                    <input
                                        v-model="search.employee.userNm"
                                        type="text" 
                                        class="form_control" 
                                        placeholder="입력해주세요"
                                        @keyup.enter="fn_clickSearch('employee')"
                                    />
                                </td>
                                <td class="ar">
                                    <button 
                                        type="button" 
                                        class="btn btn_sm btn_darkblue btn_radius btn_search" 
                                        @click="fn_clickSearch('employee')"
                                    >
                                        검색
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>               
                </div>
                <div class="lookup_box multi_line" v-show="userType === 'PTNR'">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="84">
                            <col width="*">
                            <col width="84">
                            <col width="180">
                            <col width="100">
                        </colgroup>
                        <tbody>
                            <tr>

                                <th> {{ '프로젝트명' }} </th>
                                <td>
                                    <input 
                                        v-model="search.partner.prjtNm" 
                                        type="text" 
                                        class="form_control" 
                                        placeholder="입력해주세요"
                                        @keyup.enter="fn_clickSearch('partner')"
                                    >
                                </td>        
                                <th> {{ '사용자명' }} </th>
                                <td>
                                    <input 
                                        v-model="search.partner.userNm" 
                                        type="text" 
                                        class="form_control" 
                                        placeholder="입력해주세요"
                                        @keyup.enter="fn_clickSearch('partner')"
                                    >
                                </td>
                                <td class="ar">
                                    <button 
                                        type="button" 
                                        class="btn btn_sm btn_darkblue btn_radius btn_search"
                                        @click="fn_clickSearch('partner')"
                                    >
                                        검색
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="move_box" v-show="userType === 'HEC'">
                    <div class="ib_wrap">
                        <div :id="`${refId}_employee`" class="ibsheet_table" style="height: 246px;"/>
                    </div>
                </div>
                <div class="move_box" v-show="userType === 'PTNR'">
                    <div class="ib_wrap">
                        <div :id="`${refId}_partner`" class="ibsheet_table" style="height: 246px;"/>
                    </div>
                </div>



            </div>
        </template>

        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_setApproveUser"> {{ '선택' }} </b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="hide('forget')"> {{ '취소' }} </b-button>
        </template>
        
    </b-modal>
</template>


<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import axios from 'axios'

import { APPRV_EMPLOYEE_LIST, APPRV_PARTNER_LIST } from '@plugin/ibsheet/myWork/approvedDoc.js'
import loader from '@ibsheet/loader'

export default {
    name: 'ApprovalLineChange',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'ApprovalLineChange'
        },
        modalTitle: {
            type: String,
            default: '결재라인 수정'
        },


        aprvInfoId: {
            type: String,
            require
        },
        siteMstrId: {
            type: String,
            require,
        },

        line: {
            type: Array,
            default: () => {
                return []
            }
        },
        drafterId: {
            type: String,
            default: ''
        },
        aprvOrder: {
            type: [Number, String],
            default: '',
        }
    },

    methods: {
        fn_onModal: function () {
            this.userType = 'HEC'
            this.search     = {
                                employee: {
                                    workLocNm: null,
                                    userNm: null
                                },
                                partner: {
                                    tradeType: '',
                                    prjtNm: null,
                                    userNm: null,
                                }
                            }

            this.fn_fetchEmployee()
            this.fn_fetchPartner()
        },
        fn_offModal: function () {
            if (this.user.employee.sheet)   loader.removeSheet(this.user.employee.sheet)
            if (this.user.partner.sheet)    loader.removeSheet(this.user.partner.sheet)
        },
        fn_setApproveUser: function() {

            const focused   = this.userType === 'HEC' 
                                ? this.user.employee.sheet.getFocusedRow()
                                : this.user.partner.sheet.getFocusedRow() 
            
            const url = '/sendApi/api/approv/aprvUserInfo/change'
            const payload = {
                dmApprvDoc: {
                    aprvInfoId: this.aprvInfoId,
                    siteMstrId: this.siteMstrId,
                },
                dlApprvUser: [
                    {
                        ...this.line[Number(this.aprvOrder)-1],
                        status:         'Changed',
                        aprvOrder:      this.aprvOrder,
                        
                        userType:       this.userType,
                        userId:         focused.userId,
                        userNm:         focused.userNm,
                        jobTitle:       this.userType === 'HEC' ? focused.jobTitle : focused.jobRoleNm,
                        tradeId:        this.userType === 'HEC' ? focused.workLocCd : focused.tradeId,
                        tradeNm:        this.userType === 'HEC' ? focused.workLocNm : focused.tradeNm,
                        tradeType:      this.userType === 'HEC' ? undefined : focused.tradeType,

                        fileSgnArcvId:  '',
                        aprvState:      undefined,                      
                        
                    }
                ],
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
                    if (response.status === 200) {

                        this.alert('결재자가 변경되었습니다.', () => {
                            this.$bvModal.hide(this.refId)
                            this.$emit('callback', response)
                        })
                    } else {
                        throw new Error('error')
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.alert('결재자 변경에 실패했습니다.')
                })

        },

        fn_clickSearch: function (type = 'employee') {
            // console.log('click search')
            switch (type) {
                case 'employee':
                    this.fn_fetchEmployee(this.search.employee, false)
                    break
                case 'partner':
                    this.fn_fetchPartner(this.search.partner, false)
                    break
            }
        },


        fn_fetchPartner: function (_payload, init = true) {
            const url = '/sendApi/api/popup/partnerUserSearch/list'
            const payload = {
                siteMstrId: this.siteMstrId,
                ..._payload,
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
                    // data-set
                    this.user.partner.data = response.data.datas.resultList
                    
                    if (init) {
                        // options-set
                        this.user.partner.options = APPRV_PARTNER_LIST.options
                        this.user.partner.options.Events = {
                            onDblClick: () => {
                                this.fn_setApproveUser()
                            },
                            onRenderFinish: (event) => {
                                const lineUser = this.line.map(item => item.userId)
                                // lineUser.push(this.drafterId)
                                event.sheet.getDataRows().forEach(row => {
                                    if (lineUser.includes(String(row.userId))) {
                                        event.sheet.hideRow(row)
                                    }
                                })
                            },
                        }

                        loader.createSheet({
                            el: `${this.refId}_partner`,
                            data: this.user.partner.data,
                            options: this.user.partner.options
                        }).then(sheet => {
                            this.user.partner.sheet = sheet
                        })
                    } else {
                        this.user.partner.sheet.loadSearchData({
                            data: this.user.partner.data,
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_fetchEmployee: function (_payload, init = true) {
            // Employee ib-sheet set
            const url = '/sendApi/api/popup/employeeSearch/list'
            const payload = {
                siteMstrId: this.siteMstrId,
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
                        // options-set
                        this.user.employee.options = APPRV_EMPLOYEE_LIST.options
                        this.user.employee.options.Events = {
                            onDblClick: () => {
                                this.fn_setApproveUser()
                            },
                            onRenderFinish: (event) => {
                                const lineUser = this.line.map(item => item.userId)

                                event.sheet.getDataRows().forEach(row => {
                                    if (lineUser.includes(String(row.userId))) {
                                        event.sheet.hideRow(row)
                                    }
                                })
                            },
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
    },
    data: function () {
        return {
            userType: 'HEC',
            search: {
                employee: {
                    workLocNm: null,
                    userNm: null
                },
                partner: {
                    tradeType: '',
                    prjtNm: null,
                    userNm: null,
                }
            },
            user: {
                employee: {
                    sheet: null,
                    data: [],
                    options: {},
                },
                partner: {
                    sheet: null,
                    data: [],
                    options: {},
                }
            },

        }
    }

}
</script>