<template>
    <section id="SearchChecker">
        <b-modal
            :ref="refId"
            :id="refId"
            :title="modalTitle"

            footer-bg-variant="transparent"
            static
            no-close-on-esc
            no-close-on-backdrop

            size="lg"
            @shown="fn_onModal"
            @hidden="fn_offModal"
        >
            <template #default>
                <div class="pop_container">
                    <div class="lookup_box multi_line align_center">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="10%">
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>{{'점검자'}}</th>
                                    <td>
                                        <input
                                            v-model="search.insctrNm"
                                            type="text"
                                            class="form_control"
                                            :placeholder="'입력해주세요'"
                                            @keyup.enter="fn_fetchChecker(search, false)"
                                        />
                                    </td>
                                    <td class="ar">
                                        <button
                                            type="button"
                                            class="btn btn_sm btn_darkblue btn_radius btn_search"
                                            @click="fn_fetchChecker(search, false)"
                                        >
                                            {{'검색'}}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <div class="fr">
                            <button 
                                type="button"
                                class="btn btn_sm btn_darkgray"
                                @click="$bvModal.show(`${refId}_add`)"
                            >
                                {{'추가'}}
                            </button>

                        </div>
                    </div>

                    <div class="ib_wrap">
                        <div :id="`${refId}_sheet`" class="ibsheet_table" style="max-height: 337px;" />
                    </div>
                </div>
            </template>

            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_setChecker()"> {{'선택'}} </b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')"> {{'닫기'}} </b-button>
            </template>

        </b-modal>

        <b-modal
            :ref="`${refId}_add`"
            :id="`${refId}_add`"
            :title="addModalTitle"

            footer-bg-variant="transparent"
            no-close-on-esc
            no-close-on-backdrop

            size="md"

            @shown="fn_onAddModal"
        >
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="30%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">{{'점검 기관'}}</span></th>
                                    <td>
                                        <select v-model="add.extrnlInsttId" class="form_control">
                                            <option value="" disabled>{{'선택'}}</option>
                                            <option
                                                v-for="item in add.dlExtrnInstt"
                                                :key="item.extrnlInsttId"
                                                :value="item.extrnlInsttId"
                                            >
                                                {{ item.extrnlInsttNm }}
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{{'점검 부서'}}</th>
                                    <td>
                                        <input v-model="add.insctrDeptNm" type="text" class="form_control" maxlength="30" />
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="emp_red">{{'점검자'}}</span></th>
                                    <td>
                                        <input v-model="add.insctrNm" type="text" class="form_control" maxlength="30" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="table_message">{{'※ 감리단 점검인원 추가 시, 부서에 현장명을 기입바랍니다.'}}</p>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_addChecker">{{'등록'}}</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">{{'취소'}}</b-button>
            </template>
        </b-modal>

    </section>
</template>

<script>
import axios from 'axios'
import loader from '@ibsheet/loader'
import _ from 'lodash'

import { EXT_CHCK_CHECKER } from '@plugin/ibsheet/checkEdu/extCheck.js'

export default {
    name: 'SearchChecker',
    props: {
        refId: {
            type: String,
            default: 'SearchChecker'
        },
        modalTitle: {
            type: String,
            default: '점검 예정자 검색'
        },
        addModalTitle: {
            type: String,
            default: '점검 예정자 추가',
        },

        /** 점검 기관 ID */
        extrnlInsttId: {
            type: [String, Number],
            default: ''
        },
        /** 선택된 점검자 ID LIST */
        insctrId: {
            type: Array,
            default: () => {
                return []
            }
        }
    
    },
    methods: {
        // modal
        fn_onModal: function () {
            this.fn_fetchChecker()
            // this.fn_fetchInstitution()
        },
        fn_offModal: function () {
            // if (this.checker.sheet) {
            //     console.log('delete?')
            //     loader.removeSheet(this.checker.sheet.id)
            // }
        },
        fn_fetchChecker: function (_payload, init = true, callback) {
            const url = '/sendApi/api/extrnlChck/extrnlChckInsctrIncln/list'
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
                    this.checker.data = response.data.dlInsttInsctr
                                            .filter(item => item.extrnlInsttId === String(this.extrnlInsttId))

                    if(init) {
                        this.checker.options = EXT_CHCK_CHECKER.options

                        const insctrIdList = this.insctrId.map(item => String(item.insctrId))
                        this.checker.data.forEach(row => {
                            row.isChecked = insctrIdList.includes(String(row.insctrId))
                        })

                        this.checker.options.Events = {
                            onRenderFinish: () => {
                                if (callback) return callback()
                            },
                            onAfterClick: (event) => {
                                if (event.col !== 'isChecked') {
                                    event.sheet.setCheck(event.row, 'isChecked', !event.row.isChecked)
                                }
                            },
                        }

                        loader.createSheet({
                            el: `${this.refId}_sheet`,
                            data: this.checker.data,
                            options: this.checker.options
                        }).then(sheet => {
                            this.checker.sheet = sheet
                        })
                    } else {
                        this.checker.sheet.loadSearchData({
                            data: this.checker.data,
                        })

                        if (callback) return callback()
                    }
                    
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_setChecker: function (_payload) {
            const payload = _payload
                                ? _payload
                                : this.checker.sheet.getRowsByChecked('isChecked')
            // console.log(this.checker.sheet.getRowsByChecked('isChecked'))

            /**
             * deleted:  기존 대비 없는거
             * selected: 현재 선택된 거
             */
            this.$emit('set', {
                selected:   [...payload],
                deleted:    _.differenceBy(this.insctrId, payload, 'insctrId')
            })
            
            // this.$emit('set', _.cloneDeep(payload))
            this.$bvModal.hide(this.refId)
        },



        // addModal
        fn_onAddModal: function () {
            this.fn_initAddModal(() => {
                if(this.add.dlExtrnInstt.length === 0) {
                    this.fn_fetchInstitution()
                } 
            })
        },
        fn_fetchInstitution: function () {
            const url = '/sendApi/api/extrnlChck/extrnlChckInstt/list'
            const payload = {
                
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url,payload, options)
                .then(response => {
                    this.add.dlExtrnInstt = response.data.dlExtrnInstt
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_initAddModal: function (callback) {
            this.add.extrnlInsttId = ''
            this.add.insctrDeptNm = ''
            this.add.insctrNm = ''

            return callback()
        },
        fn_addChecker: function () {
            
            // added-list
            const url = '/sendApi/api/extrnlChck/extrnlChckInsttInsctr/write'
            const payload = {
                extrnlInsttId:      this.add.extrnlInsttId,
                extrnlInsttNm:      this.add.dlExtrnInstt.find(item => item.extrnlInsttId === this.add.extrnlInsttId)?.extrnlInsttNm,
                insctrNm:           this.add.insctrNm,
                insctrDeptNm:       this.add.insctrDeptNm,
                insctrRspofc:       ''
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then((response) => {
                    // console.log(payload)
                    // 재조회하지 않고 추가동륵한걸 재조회전까지 최상단으로 올림
                    this.checker.sheet.addRow({
                        next: this.checker.sheet.getFirstRow(),
                        init: {
                            ...payload,
                            insctrId: response.data.dmInsttInsctr.insctrId,
                            isChecked: true
                        }
                    })

                    /*

                    const checked = this.checker.sheet.getRowsByChecked('isChecked')
                                                        .map(item => String(item.insctrId))

                    
                    // id값을 전달하지 않기 때문에 새로 서치가 필요함
                    // 이번에 등록한건 어쩌지?
                    this.fn_fetchChecker(this.search, false, () => {
                        // console.log('callback-fecthChecker')
                        this.checker.sheet.getDataRows().forEach(row => {
                            if (checked.includes(String(row.insctrId))) {
                                row.isChecked = true
                                this.checker.sheet.refreshCell(row, 'isChecked')
                            }
                        })
                    })
                    */
                    
                })
                .catch(error => {
                    console.error(error)
                })
            
            this.$bvModal.hide(`${this.refId}_add`)
        }
    },
    data: function () {
        return {
            checker: {
                sheet: null,
                data: [],
                options: {}
            },
            search: {
                searchExtrnlInsttId: '',
                insctrNm: ''
            },
            add: {
                dlExtrnInstt: [],
                extrnlInsttId: '',
                insctrDeptNm: '',
                insctrNm: '',
            }
        }
    }
}
</script>