<template>
    <div class="ib_wrap" style="display: none;">
        <div :id="divId" class="ibsheet_table"/>
    </div>
</template>


<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import sheetOption from '@plugin/ibsheet/common/excelDownload.js'

import loader from '@ibsheet/loader'
import _ from 'lodash'

export default {
    name: 'ExcelDownload',
    mixins: [MsgBoxMixins],
    props: {
        /** v-modelType */
        value: {
            type: Boolean,
            default: false,
        },
        
        /** component basedId */
        refId: {
            type: String,
            default: 'ExcelDownload',
        },

        /** fileName */
        fileName: {
            type: String,
            default: 'Excel_Download.xlsx'
        },
        /** download optional */
        downloadOption: {
            type: Object,
            default: () => {
                return {}
            },
        },

        /** optionsCode 로 들어올경우 */
        optionsCode: {
            type: String,
            default: null,
        },
        /** options */
        options: {
            type: Object,
            default: () => {
                return {}
            },
        },
        /** data */
        data: {
            type: Array,
            default: () => {
                return []
            },
        },

        /** Excel Width */
        width: {
            type: [String, Number],
            default: 1920,
            validator: (value) => {
                return _.isNumber(Number(value))
            }
        }

    },
    computed: {
        divId: {
            get: function () {
                return `${this.refId}_down2Excel_divId`
            },
        },
        sheetId: {
            get: function () {
                return `${this.refId}_down2Excel_sheetId`
            },
        },
    },
    watch: {
        value: {
            handler: function (newValue) {
                if (newValue) {
                    this.fn_createSheet()
                }
            },
        },
    },
    methods: {
        fn_createSheet: function () {
            const _options = {
                ...this.optionsCode
                    ? {
                        ...sheetOption[this.optionsCode].options,
                        Cols: _.cloneDeep(sheetOption[this.optionsCode].options.Cols)
                    }
                    : {
                        Cfg: this.options.Cfg,
                        Cols: _.cloneDeep(this.options.Cols)
                    },
            }           
            const sumOfRelWidth = _options.Cols.reduce((sum, itm) => sum + itm.RelWidth, 0)
            _options.Cols.forEach(item => {
                /** set RelWidth */
                if (item.RelWidth) {
                    item.width = (item.RelWidth / sumOfRelWidth) * Number(this.width)
                    delete item.RelWidth
                }

                /** set Header */
                if (item.Header && _.isArray(item.Header)) {
                    item.Header.forEach(h => {
                        if (h.Type === 'Html') {
                            h.Value = h.Value.replaceAll(/<[^>]*>?/g, '')
                            delete h.Type
                        }
                    })

                }

                /** set Required */
                delete item.Required

            })

            loader.createSheet({
                id: this.sheetId,
                el: this.divId,
                options: {
                    ..._options,
                    Events: {
                        onRenderFirstFinish: (evt) => {
                            evt.sheet.down2Excel({
                                downCols:   'Visible',
                                reqHeader:  {
                                                'Authorization': this.$cookies.get('Authorization'),
                                                // 'Content-Type': 'application/json',
                                                'Accept-Language': 'ko'
                                            },
                                ...this.downloadOption,
                                fileName:   this.fileName,
                            })

                            /* onExportFinish Hook에서 못잡아옴  */
                            // if (evt.sheet) {
                            //     evt.sheet.dispose()
                            //     loader.removeSheet(this.sheetId)
                            // }
                            // this.$emit('input', false)
                        },
                        onExportFinish: (evt) => {
                            if (evt.sheet) {
                                evt.sheet.dispose()
                                loader.removeSheet(this.sheetId)
                            }
                            this.$emit('input', false)
                        },
                    },
                },
                data: this.data
            })
        },
    },
    data: function () {
        return {
            /** sheet object: not used */
            sheet: null,
        }
    },
}
</script>
