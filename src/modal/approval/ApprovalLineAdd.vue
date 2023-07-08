<template>
    <b-modal
        :ref="refId"
        :id="refId"
        :title="modalTitle"
        
        size="xl"
        footer-bg-variant="transparent"
        no-close-on-backdrop
        no-close-on-esc
        static
        @shown="fn_onModal"
        @hidden="fn_offModal"
    >
        <template #default>
            <div class="pop_container">
                <!-- searchBox -->
                <div class="lookup_box multi_line align_center">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="84">
                            <col width="310">
                            <col width="80">
                        </colgroup>
                        <tbody> 
                            <tr>
                                <th>결재라인명</th>   
                                <td class="pr10">
                                    <!-- <input type="text" class="form_control w100" placeholder="입력해주세요"> -->
                                    <input class="form_control w100" v-model="add.aprvLineNm" :placeholder="'입력해주세요'" maxlength="100" />
                                </td>        
                                <!-- <td>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search">검색</button>
                                </td> -->
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div class="button_box">
                    <strong> {{ '결재라인 추가' }} </strong>
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
                            <!-- <col width="84">
                            <col width="*">
                            <col width="84">
                            <col width="180">
                            <col width="100"> -->


                            <!-- <col width="90">
                            <col width="130"> -->
                            <col width="84">
                            <col width="*">
                            <col width="84">
                            <col width="180">
                            <col width="100">
                        </colgroup>
                        <tbody>
                            <tr>
                                <!-- <th> {{ '분야코드값' }} </th>
                                <td>
                                    <select
                                        v-model="search.partner.tradeType"
                                        class="form_control"
                                    >
                                        <option value="" > {{ '전체' }} </option>
                                        <option
                                            v-for="item in patnCompType"
                                            :key="item.codeVal"
                                            :value="item.codeVal"
                                        >
                                            {{ item.codeNameKr }}
                                        </option>
                                    </select>
                                </td> -->

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




                <!-- ibsheet -->
                <div class="table_data mt20">
                    <div class="move_box pr0" v-show="userType === 'HEC'">
                        <div class="ib_wrap">
                            <div :id="`${refId}_employee`" class="ibsheet_table" style="height: 246px;"/>
                        </div>
                    </div>
                    <div class="move_box pl0" v-show="userType === 'PTNR'">
                        <div class="ib_wrap">
                            <div :id="`${refId}_partner`" class="ibsheet_table" style="height: 246px;"/>
                        </div>
                    </div>

                        <div class="move_box arrow">
                        <button 
                            type="button" 
                            class="ico_data_prev" 
                            @click="fn_clickDelApprovalLine()"
                        > 
                            <!-- @click="fn_clickDelApprovalLine(userType === 'HEC' ? user.employeee : user.partner)" -->
                            move prev
                        </button>
                        <button 
                            type="button" 
                            class="ico_data_next" 
                            @click="fn_clickAddApprovalLine()"
                        > 
                            move next 
                        </button>
                    </div>

                    <div class="move_box pl10">
                        <div class="ib_wrap">
                            <div :id="`${refId}_approval`" class="ibsheet_table" style="height: 246px;"/>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_saveApprovalLine"> {{ '선택' }} </b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="hide('forget')"> {{ '취소' }} </b-button>
        </template>

    </b-modal>
</template>


<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import axios from 'axios'

import { APPRV_EMPLOYEE_LIST, APPRV_PARTNER_LIST, APPRV_LINE_LIST } from '@plugin/ibsheet/myWork/approvedDoc.js'
import loader from '@ibsheet/loader'

export default {
    name: 'ApprovalLineAdd',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'ApprovalLineAdd'
        },
        modalTitle: {
            type: String,
            default: '결재라인 추가'
        },
    },
    methods: {
        fn_onModal: function () {
            this.fn_fetchAdvancedInfo()
            
        },
        fn_offModal: function () {
            if (this.user.employee.sheet) this.user.employee.sheet.dispose()
            if (this.user.partner.sheet) this.user.partner.sheet.dispose()
            if (this.approval.sheet) this.approval.sheet.dispose()

            // 초기화처리
            this.add.aprvLineNm         = ''
            this.search.partner.prjtNm  = ''
            this.search.partner.userNm  = ''
        },
        fn_initialize: function () {
            this.fn_fetchEmployee()
            this.fn_fetchPartner()
            this.fn_fetchApprovalLine()
        },

        fn_fetchAdvancedInfo: function () {
            const urls = {
                masterCode: '/sendApi/api/common/masterCode/list'
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

            axios
                .all([
                    axios.post(urls.masterCode,  {...payload, groupCode: 'DTY_CD'}, options),
                    
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.dtyCd          = response[0].data.data
                }))
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    this.fn_initialize()
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
        


        fn_fetchApprovalLine: function () {
            // maybe axios module
            this.approval.options = APPRV_LINE_LIST.options

            const dtyCdColumn       = this.approval.options.Cols[0]
            dtyCdColumn.Enum        = `|${this.advancedInfo.dtyCd.filter(item => item.codeVal !== 'DRFT').map(item => item.codeNameKr).join('|')}`
            dtyCdColumn.EnumKeys    = `|${this.advancedInfo.dtyCd.filter(item => item.codeVal !== 'DRFT').map(item => item.codeVal).join('|')}`

            this.approval.options.Events = {
                    onAfterClick: (event) => {
                        switch(event.col) {
                            case 'moveUp': {
                                if (event.row.previousSibling) {
                                    event.sheet.moveRow({
                                        row: event.row,
                                        next: event.row.previousSibling,
                                        focus: 0,
                                    })
                                }
                                break
                            }
                            case 'moveDown': {
                                if (event.row.nextSibling) {
                                    event.sheet.moveRow({
                                        row: event.row,
                                        next: event.row.nextSibling.nextSibling,
                                        focus: 0
                                    })

                                }
                                break
                            }
                            default: 
                                break
                        }
                    },
                    onDblClick: (event) => {
                        if (event.col === 'moveUp' || event.col === 'moveDown') {
                            return false
                        }
                        this.fn_clickDelApprovalLine(event.sheet)
                    },
                    onEndDrag: (event) => {
                        if(event.sheet !== event.tosheet) return false
                    }

                }
                this.approval.data = Array(4)
                                        .fill()
                                        .map((item, index) => index)
                                        .map(() => {
                                            return {
                                                moveTo: 0,
                                                moveUp: 0,
                                                moveDown: 0,
                                                userNm: null,
                                                dtyCd: 'EXMN',
                                            }})
                

                loader.createSheet({
                    el: `${this.refId}_approval`,
                    data: this.approval.data,
                    options: this.approval.options
                }).then(sheet => {
                    this.approval.sheet = sheet
                })

        },
        fn_fetchPartner: function (_payload, init = true) {
            const url = '/sendApi/api/popup/partnerUserSearch/list'
            const payload = {
                siteMstrId: this.$cookies.get('siteMstrId'),
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
                                this.fn_clickAddApprovalLine(this.user.partner)
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
                        // options-set
                        this.user.employee.options = APPRV_EMPLOYEE_LIST.options
                        this.user.employee.options.Events = {
                            onDblClick: () => {
                                this.fn_clickAddApprovalLine(this.user.employee)
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



        fn_clickAddApprovalLine: function (userInfo = this.user.employee, approvalLine = this.approval.sheet) {
            // console.log('click add_approval')

            const right = approvalLine.getFocusedRow()
            if (right.userId) this.fn_showUserList(right.userId)
            
            
            if (this.userType === 'HEC') {
                const left = userInfo.sheet.getFocusedRow()

                right.userId        = left.userId
                right.userNm        = left.userNm
                right.tradeNm       = left.workLocNm
                right.tradeId       = left.workLocCd
                right.jobTitle      = left.jobTitle
                right.userType      = this.userType
                userInfo.sheet.hideRow(left)
                // userInfo.except.push(left)
                approvalLine.refreshRow(right)
            } else if (this.userType === 'PTNR') {

                const left = userInfo.sheet.getFocusedRow()

                right.userId        = left.userId
                right.userNm        = left.userNm
                right.jobTitle      = left.jobRoleNm
                right.tradeNm       = left.tradeNm
                // right.positionId    = left.tradeId

                right.tradeId       = left.tradeId
                // right.tradeNm       = left.tradeNm
                right.tradeType     = left.tradeType
                right.userType      = this.userType

                userInfo.sheet.hideRow(left)
                // userInfo.except.push(left)
                approvalLine.refreshRow(right)
            }

            approvalLine.focus(right.nextSibling)
        },
        fn_clickDelApprovalLine: function (approvalLine = this.approval.sheet) {
            // console.log('click del_approval')

            const right = approvalLine.getFocusedRow()
            if (right.userId) this.fn_showUserList(right.userId)

            right.userId        = null
            right.userNm        = null
            right.jobTitle      = null
            // right.positionNm    = null
            // right.position      = null

            right.tradeId       = null
            right.tradeNm       = null
            right.tradeType     = null
            right.userType      = null

            approvalLine.refreshRow(right)
            
            
        },

        fn_saveApprovalLine: function () {
            const sample    = this.approval.sheet.getSaveJson({ saveMode: 0}).data.filter(item => item.userId !== '')
                                

            sample.unshift({
                userId:     this.$store.getters['auth/getUserId'],
                userNm:     this.$store.getters['auth/getUserNm'],
                jobTitle:   this.$store.getters['auth/getJobTitle'],
                tradeNm:    this.$store.getters['auth/getJobRoleNm'] 
                                || this.$store.getters['auth/getTradeNm'] 
                                || this.$store.getters['auth/getSiteNm'],
                dtyCd:      'DRFT',

                tradeId:    this.$store.getters['auth/getTradeId'],
                tradeType:  this.$store.getters['auth/getTradeType'],
                userType:   this.$store.getters['auth/getUserType'],
            })

            const url = '/sendApi/api/approv/userApprovLine/write'
            const payload = {
                userId: this.$store.getters['auth/getUserId'],
                siteMstrId: this.$cookies.get('siteMstrId'),
                aprvLineNm: this.add.aprvLineNm,
                
            }

            // flatten and renaming
            Array(sample.length).fill().map((item, idx) => idx+1)
                .forEach(item => {
                    // console.log(item)
                    payload[`aprvUser${item}`]          = sample[item-1].userId
                    payload[`aprvUserNm${item}`]        = sample[item-1].userNm
                    payload[`aprvJobTitle${item}`]      = sample[item-1].jobTitle
                    payload[`aprvDtyCd${item}`]         = sample[item-1].dtyCd
                    payload[`aprvTradeId${item}`]       = sample[item-1].tradeId
                    payload[`aprvTradeNm${item}`]       = sample[item-1].tradeNm
                    payload[`aprvUserType${item}`]      = sample[item-1].userType                    
                })

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
                    if (response.status === 200 && response.data.rCode === '0000') {
                        // `${refId}_add`

                        this.alert('저장되었습니다.', () => {
                            this.$bvModal.hide(this.refId)
                        })
                    } else {
                        this.alert('저장에 실패했습니다.')
                    }

                })
                .catch(error => {
                    console.error(error)
                })
        }

    },
    data: function () {
        return {
            userType: 'HEC',

            advancedInfo: {
                dtyCd: [],
            },

            add: {
                aprvLineNm: ''
            },
            
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

            approval: {
                sheet: null,
                data: [],
                options: {},
            },


        }
    }


}
</script>

