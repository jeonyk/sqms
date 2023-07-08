<template>
    <section class="tab_area_in">
        <div class="inner type2">

            <div class="button_box">
                <h2> {{ title }} Numbering 
                    <label 
                        v-if="useSameAsRequest"
                        class="input_check vat ml20"
                        for="sameAsRequestChecked" 
                    >
                        <input 
                            v-model="sameAsRequest" 
                            id="sameAsRequestChecked"
                            type="checkbox"
                            @click="alert('저장 버튼을 눌러야만 요청과 동일하게 적용됩니다.')"
                        >
                        <span class="label_text"> 요청과 동일하게 적용 </span>
                    </label>

                </h2>
                <div class="fr">
                    <button
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        :class="{disabled: !checkUser(userId, 'write')}"
                        @click="confirm('저장하시겠습니까?', clickSave)"
                    >
                        저장
                    </button>
                </div>
            </div>

            <div class="button_box mt10">
                <span>Sequence Digit</span>
                <select
                    :disabled="sameAsRequest"
                    v-model="sequenceDigit"
                    class="form_control num"
                >
                    <option
                        v-for="count in Array(5).fill().map((item, index) => { return index + 3 })"
                        :key="count"
                        :value="count"
                    >
                        {{ String(count) }}
                    </option>
                </select>
                <span class="numbering_tit">
                    Preview : 
                        <span 
                            class="point_color txt_ellipsis" 
                            v-b-tooltip.hover 
                            :title="previewNumberingSequence"
                        > 
                            {{ previewNumberingSequence }} 
                        </span>
                </span>
                <div class="fr">

                    <button
                        :disabled="sameAsRequest"
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="clickAddRow()"
                    >
                        행 추가
                    </button>

                    <button 
                        :disabled="sameAsRequest"
                        type="button" 
                        class="btn btn_sm btn_darkgray"
                        @click="clickDeleteRow()"
                    >
                        행 삭제
                    </button>
                </div>
            </div>

            <div class="ib_wrap">
                <div id="combinationSheet" class="ibsheet_table" />
            </div>
            <p class="table_message">
                * Sequence 구분 체크 시 체크된 항목 기준으로 Sequence Number가 Counting됩니다.
            </p>

            <div class="button_box">
                <h2>Numbering 히스토리</h2>
            </div>

            <div class="ib_wrap">
                <div id="historySheet" class="ibsheet_table" />
                <!--  :style="{height: 'calc(50vh - 200px)'}" style="height: 100%;" -->
            </div>

        </div>


    </section>
</template>

<script>
import { Material4, Material5 } from '@/pages/common/data/MaterialsList'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

import loader from '@ibsheet/loader'
import API from '@/apis/'
import { mapGetters } from 'vuex'

// import _ from 'lodash'

export default {
    name: 'Numbering',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
    },
    props: {
        id: {
            type: String,
            default: '',
        },
        /** 요청과 동일한 문서번호 사용 여부 */
        useSameAsRequest: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        /** 코드타입(CODE_TYPE) */
        codeType: {
            type: String,
            require: true
        },
        /** 코드상세타입(CODE_DTL_TYPE) */
        codeDtlType: {
            type: String,
            require: true,
        },
        /** 예외된 Type내역(예외용 코드 추가) */
        exceptList: {
            type: Array,
            default: () => {
                return ['GJGCD']
            }
        }
    },
    computed: {
        ...mapGetters({
            userId: 'auth/getUserId'
        })
    },
    watch: {
        sequenceDigit: {
            handler () {
                if (this.mounted) {
                    this.sequenceRow.numrDesc = String(1).padStart(this.sequenceDigit, '0')
                    this.combination.sheet.refreshRow(this.sequenceRow)
                    
                    this.setPreviewText()
                }
            },
            deep: true
        },
        sameAsRequest: {
            handler (newValue) {
                if (this.mounted) {
                    if (newValue) {
                        this.$nextTick(() => {
                            if (this.combination.sheet) {
                                this.combination.sheet.disable(true, true)
                            }
                        })
                    } else {
                        // openPopup - and confirmed
                        // popup set 1,2 (saveOk, s)
                        this.$nextTick(() => {
                            if (this.combination.sheet) {
                                this.combination.sheet.enable()
                            }
                        })
                    }
                }
            },
        }
    },
    mounted () {

        this.$nextTick( async () => {
            await this.initialize()
        })

        this.mounted = true
    },
    beforeDestroy () {
        if(this.combination.sheet) this.combination.sheet.dispose()
        if(this.history.sheet) this.history.sheet.dispose()
    },
    methods: {
        async initialize () {
            this.combination.options = Material4.options
            this.history.options = Material5.options

            // combination enum and formula setting
            this.combination.options.Cols[2].Enum = `|${this.category.filter(item => !this.exceptList.includes(item.key)).map(item => item.value).join('|')}`
            this.combination.options.Cols[2].EnumKeys = `|${this.category.filter(item => !this.exceptList.includes(item.key)).map(item => item.key).join('|')}`
            this.combination.options.Cols[2].CanEditFormula = this.numrDescFormula

            await this.getGridData()

            this.combination.options.Events = {
                // rendering event
                onRenderFinish: this.combinationRenderFinish,
                // dragging event
                onDragFinish: this.combinationDragFinish,
                // onStartDrag: this.combinationDragStart,
                onEndDrag: this.combinationEndDrag,

                // click event(checkBox)
                onAfterClick: this.combinationAfterClick,
                onClick: this.combinationClick,
                onAfterChange: this.combinationAfterChange,
            }

            // combination sheet
            loader.createSheet({
                el: 'combinationSheet',
                data: this.combination.data,
                options: this.combination.options,
            }).then(sheet => {
                this.combination.sheet = sheet
            })

            // render Finsih event
            this.history.options.Events = {
                onRenderFinish: () => { this.setNumberingOrder(this.history.sheet) }
            }
            // history sheet
            loader.createSheet({
                el: 'historySheet',
                data: this.history.data,
                options: this.history.options,
            }).then(sheet => {
                this.history.sheet = sheet
            })

        },
        async getGridData () {
            const payload = {
                siteMstrId: this.$cookies.get('siteMstrId'),
                codeType: this.codeType,
                codeDtlType: this.codeDtlType,
            }

            const response = await API.numbering.getDocNumSettList(payload)

            this.combination.data = response.data.datas.dlDocNum
            this.combination.data.forEach((item, index) => {
                if (this.combination.data.length !== index+1) {
                    item.draggable= '0'
                    item.moveUp = '0'
                    item.moveDown = '0'
                    item.seqResetupYn = item.seqResetupYn === 'Y' ? true : false
                }
            })
            
            this.sameAsRequest = this.combination.data?.[0]?.requstSamenssYn === 'Y' ? true : false


            // this.combination.data = _.sortBy(this.combination.data, 'sortSeq')
            // console.log(_.sortBy(this.combination.data, 'sortSeq'))
            this.history.data = response.data.datas.dlDocHist

            // console.log(response)
        },
        async fetchHistoryData () {
            const payload = {
                siteMstrId: this.$cookies.get('siteMstrId'),
                codeType: this.codeType,
                codeDtlType: this.codeDtlType,
            }
            const response = await API.numbering.getDocNumSettList(payload)

            this.history.data = response.data.datas.dlDocHist

            this.history.sheet.loadSearchData({
                data: this.history.data
            })
        },
        async clickSave () {
            
            const listData = this.combination.sheet.getSaveJson({
                saveMode: 0
            }).data

            // validate
            const validate = listData.filter(item => item.STATUS !== 'Deleted')
            if (validate.some(item => !item.numrType)) {
                this.alert('Type을 선택해 주세요.')
                return
            }

            if (validate.some(item => (item.numrType === 'HWRKM' && (item.numrDesc === undefined || item.numrDesc === null || item.numrDesc === '')))) {
                this.alert('수기입력 내용을 입력해주세요.')
                return 
            }

            listData.forEach(item => {
                item.status = item.STATUS === 'Deleted' ? item.STATUS : "Added"
                delete item.STATUS
                item.yearType = item.yearType === 'Y' ? 'Y' : 'N'
                item.seqResetupYn = item.seqResetupYn === '1' ? 'Y' : 'N'

            })

            const mainData = {
                siteMstrId: this.$cookies.get('siteMstrId'),
                codeType: this.codeType,
                codeDtlType: this.codeDtlType,
                numbCode: this.sequenceDigit,
                requstSamenssYn : this.useSameAsRequest && this.sameAsRequest ? 'Y' : 'N'
            }

            const payload = {
                mainData,
                listData
            }
            try {
                const response = await API.numbering.setDocNumSett(payload)
                if (response.status === 200 ) {
                    this.alert('적용되었습니다.', () => {
                        this.fetchHistoryData()
                    })
                } else {
                    throw new Error('fn_numbering')
                }
            } catch(error) {
                console.error(error)
                this.alert('적용에 실패했습니다.')
            }

        },
        clickAddRow() {
            const current = this.combination.sheet.getDataRows()

            if(current.filter(item => !item.Deleted ).length > 9) return

            const initRowInfo = {
                isChecked: 0,
                draggable: '0',
                moveUp: '0',
                moveDown: '0',
            }

            this.combination.sheet.addRow({
                next: this.combination.sheet.getLastRow(),
                init: initRowInfo
            })

            this.setNumberingOrder()
        },
        setNumberingOrder (sheet = this.combination.sheet) {
            let idx = 1
            sheet.getDataRows().forEach(item => {
                if(!item.Deleted) {
                    item.sortSeq = idx
                    sheet.refreshRow(item)
                    idx++
                }
            })
            this.setPreviewText()
        },
        clickDeleteRow () {
            const checkedRows = this.combination.sheet.getRowsByChecked(this.combination.options.Cols[0].Name)
            this.combination.sheet.deleteRows(checkedRows)
            checkedRows.forEach(item => {
                this.combination.sheet.hideRow({
                    row: item,
                    del: false,
                    norender: false
                })
            })

            this.setNumberingOrder()
        },

        combinationRenderFinish () {
            // thresh 한 코드 처리
            if(this.sameAsRequest) {
                this.$nextTick(() => {
                    this.combination.sheet.disable(true, true)
                })
            }

            // set sequence row
            if(this.combination.sheet.getDataRows().length === 0)  {
                this.combination.sheet.addRow({
                    init: {
                        numrType: this.category[this.category.length-1].key,
                        numrTypeNm: this.category[this.category.length-1].value,
                        numbCode: this.sequenceDigit = 4
                    }
                })

            }

            this.sequenceRow = this.combination.sheet.getLastRow()
            
            if(this.sequenceRow) {

                this.sequenceRow.CanDrag = 0
                this.sequenceRow.CanEdit = 0
                // digit value 처리해야할거

                this.sequenceDigit = this.sequenceRow.numbCode
                this.sequenceRow.numrDesc = String(1).padStart(this.sequenceDigit, '0')
            }

            this.setNumberingOrder()
        },
        combinationDragFinish () {
            this.setNumberingOrder()
        },
        combinationDragStart (event) {
            if(event.col !== 'draggable') return true
        },
        combinationEndDrag (event) {
            if (event.torow === this.sequenceRow) {
                return true
            }
            if(event.sheet !== event.tosheet) {
                return false
            }
            this.setPreviewText()
        },
        combinationAfterClick (event) {

            if (event.row !== this.sequenceRow) {
                switch (event.col) {
                    case this.combination.options.Cols[3].Name: {
                        if (event.row[this.combination.options.Cols[2].Name] === this.category[4].key) {
                            event.row[this.combination.options.Cols[8].Name] = event.row[this.combination.options.Cols[8].Name] === 'Y' ? 'N' : 'Y'
                            event.row[`${this.combination.options.Cols[3].Name}HtmlPostfix`] = this.getCheckBoxHtml(event.row[this.combination.options.Cols[8].Name])
                            this.combination.sheet.refreshRow(event.row)
                            this.setPreviewText()
                        }
                        break
                    }
    
                    case this.combination.options.Cols[5].Name: {
                        if (event.row.previousSibling) {
                            event.sheet.moveRow({
                                row: event.row,
                                next: event.row.previousSibling,
                                focus: 0,
                            })
                            this.setNumberingOrder()
                        }
                        break
                    }
                    case this.combination.options.Cols[6].Name: {
                        if (event.row.nextSibling && event.row.nextSibling !== this.sequenceRow) {
                            event.sheet.moveRow({
                                row: event.row,
                                next: event.row.nextSibling.nextSibling,
                                focus: 0
                            })
                            this.setNumberingOrder()
    
                        }
                        break
                    }
                    default:
                        break
                }
            }

        },
        combinationAfterChange (event) {
            switch(event.col) {
                case this.combination.options.Cols[2].Name: {
                    if (event.row[this.combination.options.Cols[2].Name] === this.category[5].key) {
                        event.row[this.combination.options.Cols[3].Name] = null
                        this.combination.sheet.refreshRow(event.row)
                    }
                    break
                }
            }
        },
        combinationClick (event) {
            switch (event.col) {
                case this.combination.options.Cols[2].Name: {

                    this.includesType = []
                    this.combination.sheet
                        .getDataRows()
                        .filter(item=> !item.Deleted)
                        .forEach(item => {
                            if (item.numrType !== this.category[5].key) {
                                this.includesType.push(item.numrType)
                            }
                    })
                    this.combination.sheet.setAttribute(event.row, event.col, 'Enum', `|${this.category.filter(item => !this.exceptList.includes(item.key)).filter(item => !this.includesType.filter(type => type !== event.row[event.col]).includes(item.key)).map(item => item.value).join('|')}`)
                    this.combination.sheet.setAttribute(event.row, event.col, 'EnumKeys', `|${this.category.filter(item => !this.exceptList.includes(item.key)).filter(item => !this.includesType.filter(type => type !== event.row[event.col]).includes(item.key)).map(item => item.key).join('|')}`)

                    break
                }
            }
        },

        numrDescFormula (event) {
            if (event.Col === this.combination.options.Cols[2].Name) {
                // initialize
                event.Row[`${this.combination.options.Cols[3].Name}HtmlPostfix`] =''
                event.Row[`${this.combination.options.Cols[3].Name}CanEdit`] = 0
                event.Row[`${this.combination.options.Cols[4].Name}CanEdit`] = 0
                
                if (event.Row[event.Col] !== '') {
                    event.Row[this.combination.options.Cols[7].Name] = this.category.filter(item => !this.exceptList.includes(item.key)).filter(item => item.key === event.Row[event.Col])[0].value
                }
            }
            switch(event.Row[this.combination.options.Cols[2].Name]) {
                
                case this.category[0].key: {
                    event.Row[this.combination.options.Cols[3].Name] = this.$cookies.get('projectId')
                    event.Row[this.combination.options.Cols[4].Name] = 0

                    break
                }
                case this.category[1].key: {
                    // maybe deleted category
                    break
                }
                case this.category[2].key: {
                    event.Row[this.combination.options.Cols[3].Name] = '공종'
                    event.Row[`${this.combination.options.Cols[4].Name}CanEdit`] = 1

                    break
                }
                case this.category[3].key: {
                    event.Row[this.combination.options.Cols[3].Name] = '세부공종'
                    event.Row[`${this.combination.options.Cols[4].Name}CanEdit`] = 1

                    break
                }
                case this.category[4].key: {
                    // event.Row[this.combination.options.Cols[3].Name] = event.Row[this.combination.options.Cols[3].Name] === '' ? new Date().getFullYear() : event.Row[this.combination.options.Cols[3].Name]
                    event.Row[this.combination.options.Cols[3].Name] = new Date().getFullYear()

                    event.Row[`${this.combination.options.Cols[3].Name}HtmlPostfix`] = this.getCheckBoxHtml(event.Row[this.combination.options.Cols[8].Name])
                    event.Row[`${this.combination.options.Cols[4].Name}CanEdit`] = 1

                    break
                }
                case this.category[5].key: {
                    event.Row[this.combination.options.Cols[4].Name] = 0
                    event.Row[`${this.combination.options.Cols[3].Name}CanEdit`] = 1
                    
                    break
                }
                case this.category[6].key: {
                    event.Row[this.combination.options.Cols[4].Name] = 0

                    break
                }
                // default:
                //     console.error('not category key')
                //     break
                
            }
            if (event.Row !== null && this.combination.sheet !== null) { 
                this.combination.sheet.refreshRow(event.Row)
            }
            this.setPreviewText()
        },
        getCheckBoxHtml(checked, text = '2자리') {
            return `<label class="input_check"><input type="checkbox" ${checked === 'Y' ? 'checked' : ''}> <span class="label_text"> ${text} </span></label>`
        },
        setPreviewText () {
            const descList = []
            this.combination.sheet
                .getDataRows()
                .filter(item => !item.Deleted )
                .forEach(item => {
                    if (item[this.combination.options.Cols[2].Name] === this.category[4].key) {
                        const year = item[this.combination.options.Cols[8].Name] === 'Y' 
                                ? String(item[this.combination.options.Cols[3].Name]).substr(2) 
                                : item[this.combination.options.Cols[3].Name]
                        descList.push(year)
                    } else {
                        descList.push(item[this.combination.options.Cols[3].Name])
                    }
                })

            this.previewNumberingSequence = descList.join('-')
        },

        setEnums () {

        },
    },
    data () {
        return {
            mounted: false,

            sameAsRequest: false,
            sequenceDigit: 4,
            sequenceData: 1,
            previewNumberingSequence: '',

            includesType: [],

            combination: {
                sheet: null,
                options: {},
                data: [],
                sequenceRow: null,

            },

            history: {
                sheet: null,
                options: {},
                data: [],
            },

            category: [
                {
                    key: 'PJTCD',
                    value: '프로젝트 코드',
                },
                {
                    key: 'GJGCD',
                    value: '대공종',
                },
                {
                    key: 'GJMCD',
                    value: '공종',
                },
                {
                    key: 'GJSCD',
                    value: '세부공종',
                },
                {
                    key: 'NUMYY',
                    value: '발생년도',
                },
                {
                    key: 'HWRKM',
                    value: '수기입력',
                },
                {
                    key: 'SEQNO',
                    value: 'Sequence',
                }
            ],

            popup: {
                msg: ''
            }

        }
    }



}
</script>
