<template>
    <section id="approvalLine">

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
                    <!-- <div class="button_box">
                        <strong> {{ '결재라인 저장 및 불러오기' }} </strong>
                    </div>
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="84">
                                <col width="310">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th> {{ '결재라인명' }} </th>
                                    <td class="pr10">
                                        <input type="text" class="form_control w100" placeholder="입력해주세요">
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn_sm btn_darkgray" @click="confirm('저장하시겠습니까?', fn_saveApprovalLine)"> {{ '저장하기' }} </button>
                                        <button type="button" class="btn btn_sm btn_darkgray" @click="$bvModal.show(`${refId}_inner`)"> {{ '불러오기' }} </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->

                    <div class="button_box">
                        <strong> {{ '결재라인 직접 설정하기' }} </strong>
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
                        <div class="fr">
                            <strong> {{'자주 쓰는 결재라인 설정'}} </strong>
                            <!-- <button type="button" class="btn btn_sm btn_darkgray" @click="confirm('저장하시겠습니까?', fn_saveApprovalLine)"> {{ '저장하기' }} </button> -->
                            <button type="button" class="btn btn_sm btn_darkgray" @click="$bvModal.show(`${refId}_add`)"> {{ '저장하기' }} </button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="$bvModal.show(`${refId}_inner`)"> {{ '불러오기' }} </button>
                        </div>
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


                                <col width="90">
                                <col width="130">
                                <col width="84">
                                <col width="*">
                                <col width="84">
                                <col width="180">
                                <col width="100">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th> {{ '분야코드값' }} </th>
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
                                    </td>

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

                    <div class="table_data mt20">
                        <div class="move_box pr0" v-show="userType === 'HEC'">
                            <span class="label_text"><strong>{{'결재 라인 선택'}}</strong></span>
                            <div class="ib_wrap">
                                <div :id="`${refId}_employee`" class="ibsheet_table" style="height: 300px;"/>
                            </div>
                        </div>
                        <div class="move_box pl0" v-show="userType === 'PTNR'">
                            <span class="label_text"><strong>{{'결재 라인 선택'}}</strong></span>
                            <div class="ib_wrap">
                                <div :id="`${refId}_partner`" class="ibsheet_table" style="height: 300px;"/>
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
                            <span class="label_text"><strong>{{'결재라인'}}</strong></span>
                            <div class="ib_wrap">
                                <div :id="`${refId}_approval`" class="ibsheet_table" style="height: 246px;"/>
                            </div>
                        </div>
                    </div>

                </div>
            </template>

            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_clickChoice"> {{ '선택' }} </b-button>
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="hide('forget')"> {{ '취소' }} </b-button>
            </template>
        </b-modal>

        <b-modal
            :ref="`${refId}_inner`"
            :id="`${refId}_inner`"
            :title="innerModalTitle"

            size="lg"
            footer-bg-variant="transparent"
            no-close-on-backdrop
            no-close-on-esc
            static
            @shown="fn_onInnerModal"
        >
            <template #default>
                <div class="pop_container">
                    <div class="ib_wrap" style="height:337px;">
                        <div :id="`${refId}_inner_sheet`" class="ibsheet_table" style="height:100%;"/>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_choiceApprovalLine">{{'선택'}}</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">{{'취소'}}</b-button>
            </template>
        </b-modal>

        <b-modal
            :ref="`${refId}_add`"
            :id="`${refId}_add`"
            :title="addModalTitle"

            size="md"
            footer-bg-variant="transparent"
            no-close-on-backdrop
            no-close-on-esc
            static
            @shown="aprvLineNm = ''"
        >
            <template #default>
                <div class="pop_container">
                    <label style="form_control">결재라인명</label>
                    <input class="form_control" v-model="add.aprvLineNm" :placeholder="'입력해주세요'" maxlength="100" />
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="confirm('저장하시겠습니까?', fn_saveApprovalLine)">{{'저장'}}</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">{{'취소'}}</b-button>
            </template>
        </b-modal>
    </section>
</template>

<script>
import { APPRV_EMPLOYEE_LIST, APPRV_PARTNER_LIST, APPRV_LINE_LIST, APPRV_LINE_LOADED_LINE } from '@plugin/ibsheet/myWork/approvedDoc.js'
import loader from '@ibsheet/loader'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
// import _ from 'lodash'
import axios from 'axios'
import _ from 'lodash'

export default {
    name: 'ApprovalLine',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'ApprovalLine'
        },
        modalTitle: {
            type: String,
            default: '결재라인 설정'
        },
        
        /** siteMstrId */
        siteMstrId: {
            type: String,
        },       


        /** line 결제라인 */
        line: {
            type: Array,
            default: () => {
                return []
            }
        },
        /** help 참조자 */
        help: {
            type: Array,
            default: () => {
                return []
            }
        },
        /** drafter 기안자 */
        draft: {
            type: String,
            default: ''
        },

        /**approval-line modal */
        innerModalTitle: {
            type: String,
            default: '결재라인 불러오기'
        },


        /** add modal */
        addModalTitle: {
            type: String,
            default: '결재라인 등록'
        },


        


    },
    
    methods: {

        fn_onModal: function () {
            // console.log('onModal')

            this.search =  {
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
            this.fn_fetchApprovalLine()

            this.fn_fetchMasterCode({
                    groupCode: 'PATN_COMP_TYPE'
                },
                (response) => {
                    // console.log(response)
                    this.patnCompType = response.data.data

                }
            )
            
        },
        fn_closeModal: function () {
            // console.log('closeModal')

            if (this.user.employee.sheet) this.user.employee.sheet.dispose()
            if (this.user.partner.sheet) this.user.partner.sheet.dispose()
            if (this.approval.sheet) this.approval.sheet.dispose()
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
        fn_showUserList: function (id) {
            // console.log('show user list')

            // const exceptEmployee = this.user.employee.except.filter(item => item.userId === id)
            // console.log(exceptEmployee)
            // if (exceptEmployee.length > 0) {
            //     // console.log('employee')
            //     this.user.employee.sheet.showRow(exceptEmployee[0])
            //     _.remove(this.user.employee.except, item => item.userId === id)
            // }

            // const exceptPartner = this.user.partner.except.filter(item => item.userId === id)
            // if (exceptPartner.length > 0) {
            //     // console.log('partner')
            //     this.user.partner.sheet.showRow(exceptPartner[0])
            //     _.remove(this.user.partner.except, item => item.userId === id)
            // }

            const employee = this.user.employee.sheet
                                .getDataRows()
                                .filter(item => item.userId === id)

            // console.log(data)
            if (employee.length > 0) this.user.employee.sheet.showRow(employee[0])

            const partner = this.user.partner.sheet
                                .getDataRows()
                                .filter(item => item.userId === id)
            
            if (partner.length > 0) this.user.partner.sheet.showRow(partner[0])


        },
        fn_clickAddApprovalLine: function (userInfo = this.user.employee, approvalLine = this.approval.sheet) {
            // console.log('click add_approval')

            const right = approvalLine.getFocusedRow()
            if (right.userId) this.fn_showUserList(right.userId)
            
            
            if (this.userType === 'HEC') {
                const left = this.user.employee.sheet.getFocusedRow()

                right.userId        = left.userId
                right.userNm        = left.userNm
                right.tradeNm       = left.workLocNm
                right.tradeId       = left.workLocCd
                right.jobTitle      = left.jobTitle
                right.userType      = this.userType
                this.user.employee.sheet.hideRow(left)
                // userInfo.except.push(left)
                approvalLine.refreshRow(right)
            } else if (this.userType === 'PTNR') {

                const left = this.user.partner.sheet.getFocusedRow()

                right.userId        = left.userId
                right.userNm        = left.userNm
                right.jobTitle      = left.jobRoleNm
                right.tradeNm       = left.tradeNm
                // right.positionId    = left.tradeId

                right.tradeId       = left.tradeId
                // right.tradeNm       = left.tradeNm
                right.tradeType     = left.tradeType
                right.userType      = this.userType

                this.user.partner.sheet.hideRow(left)
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

        fn_clickChoice: function () {
            // console.log('choice click ')

            this.$emit(
                'choice', 
                _.cloneDeep(
                this.approval.sheet
                    .getDataRows()
                    .filter(item => item.userId && item.userId !== '')
                    .map(item => {
                        item.dtyNm = this.dtyCdList.find(code => item.dtyCd === code.codeVal)?.codeNameKr
                        return item
                    })
                )
            )
            this.$bvModal.hide(this.refId)
        },

        fn_fetchMasterCode: function (_payload, callback) {
            const url = '/sendApi/api/common/masterCode/list'
            const payload = {
                siteMstrId: this.siteMstrId,
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
                    return callback(response)
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_fetchPartner: function (_payload, init = true) {
            const url = '/sendApi/api/popup/partnerUserSearch/list'
            const payload = {
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
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
                            onRenderFinish: (event) => {
                                // const lineUser = this.line.map(item => item.userId)

                                const approval = this.approval.sheet.getDataRows().map(row => String(row.userId))

                                event.sheet.getDataRows().forEach(row => {
                                    //  || this.help.map(item => item.userId).includes(row.userId)

                                    if (
                                        approval.includes(String(row.userId))
                                        // || lineUser.includes(String(row.userId))
                                        || this.draft == row.userId) {
                                        event.sheet.hideRow(row)
                                    }
                                })
                            },
                            // onRenderFirstFinish: (event) => {
                            //     this.user.partner.sheet = event.sheet
                            // }
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
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
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
                            onRenderFinish: (event) => {
                                const lineUser = this.line.map(item => item.userId)
                                const helpUser = this.help.map(item => item.userId)

                                const approval = this.approval.sheet.getDataRows().map(row => String(row.userId))

                                event.sheet.getDataRows().forEach(row => {
                                    if (lineUser.includes(String(row.userId)) 
                                        || helpUser.includes(String(row.userId))
                                        || approval.includes(String(row.userId))
                                        || this.draft == row.userId) {
                                        event.sheet.hideRow(row)
                                    }
                                })
                            },
                            // onRenderFirstFinish: (event) => {
                            //     this.user.employee.sheet = event.sheet
                            // },
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
        fn_fetchApprovalLine: function () {
            // maybe axios module
            this.approval.options = APPRV_LINE_LIST.options

            this.fn_fetchMasterCode({
                groupCode: 'DTY_CD'
            }, (response) => {

                this.dtyCdList = response.data.data

                const dtyCdColumn       = this.approval.options.Cols[0]
                dtyCdColumn.Enum        = `|${this.dtyCdList.filter(item => item.codeVal !== 'DRFT').map(item => item.codeNameKr).join('|')}`
                dtyCdColumn.EnumKeys    = `|${this.dtyCdList.filter(item => item.codeVal !== 'DRFT').map(item => item.codeVal).join('|')}`

                this.approval.options.Events = {
                    onAfterClick: (event) => {
                        switch(event.col) {
                            case 'moveTo': {
                                const cellHeight = event.row.r1.clientHeight
                                if (event.y > cellHeight / 2) {
                                    if (event.row.nextSibling) {
                                        
                                        event.sheet.moveRow({
                                            row: event.row,
                                            next: event.row.nextSibling.nextSibling,
                                            focus: 0
                                        })
                                    }
                                } else {
                                    if (event.row.previousSibling) {
                                        event.sheet.moveRow({
                                            row: event.row,
                                            next: event.row.previousSibling,
                                            focus: 0
                                        })
                                    }
                                }
                                break
                            }
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
                    },
                    // onRenderFirstFinish: (event) => {
                    //     this.approval.sheet = event.sheet
                    // },

                }
                // this.line 처리
                this.approval.data = [
                    ...this.line.map(item => {
                        item.moveUp     = 0
                        item.moveDown   = 0
                        item.moveTo     = 0
                        return item
                    }),
                    ...Array(4 - this.line.length)
                        .fill()
                        .map((item, index) => index)
                        .map(() => {
                            return {
                                moveTo: 0,
                                moveUp: 0,
                                moveDown: 0,
                                userNm: null,
                                dtyCd: 'EXMN',
                            }
                        }
                    ),
                    
                ]

                loader.createSheet({
                    el: `${this.refId}_approval`,
                    data: this.approval.data,
                    options: this.approval.options
                }).then(sheet => {
                    this.approval.sheet = sheet
                })

            })
        },


        /** inner */
        fn_onInnerModal: function () {
            // onSheet
            // getData

            this.fn_innerInitialize()
        },
        fn_choiceApprovalLine: function () {
            const choosen = this.inner.sheet.getFocusedRow()
            // set
            const apprvLine     = Array(5).fill()
                                    .map((item, index) => index+1)
                                    .map(item => {
                                        return {
                                            userId:     choosen[`aprvUser${item}`],
                                            userType:   choosen[`aprvUserType${item}`],
                                            dtyCd:      choosen[`aprvDtyCd${item}`],
                                            userNm:     choosen[`aprvUserNm${item}`],
                                            jobTitle:   choosen[`aprvJobTitle${item}`],
                                            tradeId:    choosen[`aprvTradeId${item}`],
                                            tradeNm:    choosen[`aprvTradeNm${item}`],

                                            moveUp:     0,
                                            moveDown:   0,
                                        }
                                    })

            this.approval.data = apprvLine.filter((item,index) => index !== 0)

            this.approval.sheet.loadSearchData({
                data: this.approval.data
            })

            this.$bvModal.hide(`${this.refId}_inner`)
        },
        fn_innerInitialize: function () {
            this.inner.options = APPRV_LINE_LOADED_LINE.options

            this.inner.options.Events = {
                onRenderFirstFinish: (event) => {
                    // api
                    this.fn_fetchUserApprovalLine({},(response) => {
                        this.inner.data = response.data.datas.dlAprvLine

                        this.inner.data.forEach(item => {
                            item.aprvLineSample     = Array(5).fill()
                                                        .map((inner, idx) => idx+1)
                                                        .map(inner => {
                                                            const userId = item[`aprvUser${inner}`]
                                                            const userNm = item[`aprvUserNm${inner}`]
                                                            const dtyCd  = item[`aprvDtyCd${inner}`]
                                                            // return userNm === '' ? '' : `[${this.dtyCdList.find(item => item.codeVal === dtyCd).codeNameKr}] ${userNm}`
                                                            return userId === null ? null : `[${this.dtyCdList.find(item => item.codeVal === dtyCd)?.codeNameKr}] ${userNm}`
                                                        })
                                                        .filter(item => item !== null)
                                                        .join('→')
                        })


                        event.sheet.loadSearchData({
                            data: this.inner.data
                        })
                    })
                    this.inner.sheet = event.sheet
                },
                onDblClick: () => {
                    this.fn_choiceApprovalLine()
                }
            }

            loader.createSheet({
                el: `${this.refId}_inner_sheet`,
                data: [],
                options: this.inner.options
            })
        },
        
        fn_fetchUserApprovalLine: function (_payload, callback) {
            const url = '/sendApi/api/approv/userApprovLine/list'
            const payload = {
                userId: this.$store.getters['auth/getUserId'],
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

                    if (callback) return callback(response)
                })
                .catch(error => {
                    console.error(error)
                })
            
        },

        /** add */
        fn_saveApprovalLine: function () {
            // validate
            if (!this.add.aprvLineNm || this.add.aprvLineNm === '') {
                this.alert('결재라인 명이 없습니다.')
                return 
            }

            const sample    = this.approval.sheet.getSaveJson({ saveMode: 0}).data.filter(item => item.userId !== '')

            if (!sample.length === 0) {
                this.alert('결재라인이 없습니다.')
                return
            }
                            
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
                            this.$bvModal.hide(`${this.refId}_add`)
                        })
                    }

                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    data: function () {
        return {
            approval: {
                sheet: null,
                data: [],
                options: {},
            },
            userType: 'HEC',
            patnCompType: [],

            dtyCdList: [],

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
                    except: []
                },
                partner: {
                    sheet: null,
                    data: [],
                    options: {},
                    except: []
                }
            },
            
            /** 결재라인 리스트 모달 */
            inner: {
                data: [],
                options: {},
                sheet: null,
            },


            /** 결재라인 추가 모달 */
            add: {
                // APRV_LINE_NM
                aprvLineNm: ''
            },
        }
    }

}
</script>