<template>
    <section id="SearchInstitution">
        <b-modal
            :ref="refId"
            :id="refId"
            :title="modalTitle"

            footer-bg-variant="transparent"
            no-close-on-esc
            static
            size="lg"
            @shown="fn_onModal"
        >
            <template #default>
                <div class="pop_container">
                    <div class="lookup_box multi_line align_center">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="15%">
                                <col width="*">
                                <col width="15%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th> {{'점검 기관'}} </th>
                                    <td>
                                        <input 
                                            v-model="search.extrnlInsttNm"
                                            type="text" 
                                            class="form_control" 
                                            :placeholder="'입력해주세요'" 
                                            @keyup.enter="fn_fetchInstitution(search, false)"
                                        />
                                    </td>
                                    <td class="ar">
                                        <button 
                                            type="button" 
                                            class="btn btn_sm btn_darkblue btn_radius btn_search"
                                            @click="fn_fetchInstitution(search, false)"
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
                                @click="fn_showDetail(false)"
                            >
                                {{'추가'}}
                            </button>

                            <button
                                type="button"
                                class="btn btn_sm btn_darkgray"
                                @click="fn_showDetail(true)"
                            >
                                {{'수정'}}
                            </button>
                        </div>
                    </div>

                    <div class="ib_wrap">
                        <div :id="`${refId}_sheet`" class="ibsheet_table" style="max-height: 337px;" />
                        <!-- <div id="ExtCheckMngtView_SearchInstitution_sheet" class="ibsheet_table" style="height: 337px; max-height: 337px;"></div> -->
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_setInstitution()"> {{'선택'}} </b-button>
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
                            <caption class="sr_only"/>
                            <colgroup>
                                <col width="30%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">{{'점검 기관 명'}}</span></th>
                                    <td>
                                        <input 
                                            v-model="add.extrnlInsttNm" 
                                            type="text" 
                                            class="form_control" 
                                            maxlength="50" 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>{{'점검 기관 설명'}}</th>
                                    <td>
                                        <textarea 
                                            v-model="add.extrnlInsttDc" 
                                            type="text" 
                                            class="form_control" 
                                            maxlength="200" 
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_addInstitution">{{ add.updatable ? '수정' : '등록'}}</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">{{'취소'}}</b-button>
            </template>
        </b-modal>
    </section>    
</template>

<script>
import axios from 'axios'
import loader from '@ibsheet/loader'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

import { EXT_CHCK_INSTITUTION } from '@plugin/ibsheet/checkEdu/extCheck.js'

export default {
    name: 'SearchInstitution',
    mixins: [MsgBoxMixins, authCheckMixns],
    props: {
        refId: {
            type: String,
            default: 'SearchInstitution',
        },
        modalTitle: {
            type: String,
            default: '점검 기관 검색',
        },
        addModalTitle: {
            type: String,
            default: '점검 기관 추가'
        },
        /** 점검기관 아이디 */
        extrnlInsttId: {
            type: String,
            default: '',
        }

    },
    components: {

    },
    methods: {
        fn_onModal: function () {
            this.fn_fetchInstitution()
        },
        fn_fetchInstitution: function (_payload, init = true) {
            const url = '/sendApi/api/extrnlChck/extrnlChckInstt/list'
            const payload = {
                ..._payload
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
                    this.institution.data = response.data.dlExtrnInstt

                    if(init) {

                        this.institution.options = EXT_CHCK_INSTITUTION.options

                        this.institution.options.Events = {
                            onDblClick: (event) => {
                                this.fn_setInstitution(event.row)
                            },
                            onAfterClick: (event) => {
                                event.sheet.setCheck(event.row, 'isSelected', true)
                            },
                            onRenderFirstFinish: (event) => {
                                event.sheet.getDataRows().forEach(row => {
                                    if (row.extrnlInsttId === this.extrnlInsttId) {
                                        event.sheet.setCheck (row, 'isSelected', true)
                                    }
                                })
                            },
                        }

                        loader.createSheet({
                            el: `${this.refId}_sheet`,
                            data: this.institution.data,
                            options: this.institution.options
                        }).then(sheet => {
                            this.institution.sheet = sheet
                        })
                    } else {
                        this.institution.sheet.loadSearchData({
                            data: this.institution.data,
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_setInstitution: function (_payload) {
            const payload = _payload 
                            ? _payload
                            : this.institution.sheet.getFocusedRow()

            this.$emit('set', {...payload})
            this.$bvModal.hide(this.refId)
        },

        fn_showDetail: function (updatable) {
            this.add.updatable = updatable

            this.add.selectedRow = this.institution.sheet.getRowsByChecked('isSelected')
            if (this.add.updatable && this.add.selectedRow.length === 0) {
                this.alert('행을 선택해주세요')
                return
            }

            this.add.extrnlInsttNm = this.add.updatable ? this.add.selectedRow[0].extrnlInsttNm : ''
            this.add.extrnlInsttDc = this.add.updatable ? this.add.selectedRow[0].extrnlInsttDc : ''
            this.add.extrnlInsttId = this.add.updatable ? this.add.selectedRow[0].extrnlInsttId : ''
            
            this.$bvModal.show(`${this.refId}_add`)

        },

        // addModal - 수정으로 인해 
        fn_onAddModal: function () {
            // this.add    =  {
            //                 extrnlInsttNm: '',
            //                 extrnlInsttDc: '',
            //             }
        },
        fn_addInstitution: function () {

            // validate
            if (!this.add.extrnlInsttNm || this.add.extrnlInsttNm === '') {
                this.alert('점검 기관 명을 입력해주세요')
                return
            }


            const url       = this.add.updatable 
                                ? '/sendApi/api/extrnlChck/extrnlChckInsttInfo/change'
                                : '/sendApi/api/extrnlChck/extrnlChckInsttInfo/write'
            const payload   = {
                extrnlInsttNm: this.add.extrnlInsttNm,
                extrnlInsttDc: this.add.extrnlInsttDc,
                extrnlInsttId: this.add.updatable ? this.add.extrnlInsttId : undefined,
                useYn:         this.add.updatable ? 'Y'                    : undefined,
                sortOrder:     0,
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
                        if (this.add.updatable) {
                            this.institution.sheet.getDataRows().forEach(row => {
                                if (row.extrnlInsttId === this.add.selectedRow[0].extrnlInsttId) {
                                    row.extrnlInsttNm = this.add.extrnlInsttNm
                                    row.extrnlInsttDc = this.add.extrnlInsttDc

                                    this.institution.sheet.refreshRow(row)
                                }
                            })
                        } else {
                            this.institution.sheet.addRow({
                                next: this.institution.sheet.getFirstRow(),
                                init: {
                                    ...payload,
                                    extrnlInsttId: response.data.dmExtrnInstt.extrnlInsttId
                                }
                            })
                        }
                    } else {
                        throw new Error('fn_addInstitution')
                    }
                })
                .catch(() => {
                    this.alert( this.add.updatable ? '수정에 실패했습니다.' :'등록에 실패했습니다.')
                })
                .finally(() => {
                    this.$bvModal.hide(`${this.refId}_add`)
                })
            
        },
    },
    data: function () {
        return {
            institution: {
                sheet: null,
                data: [],
                options: {}
            },
            search: {
                extrnlInsttNm: ''
            },
            add: {
                updatable: false,
                extrnlInsttNm: '',
                extrnlInsttDc: '',
                extrnlInsttId: '',

                selectedRow: null,
            },
        }
    }


}
</script>