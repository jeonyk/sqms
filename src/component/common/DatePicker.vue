<template>
    <Datepicker
        :ref="refId"
        :valueType="type === 'date' ? 'date' : 'format' "
        class="datepicker"
        input-class="form_control"
        :disabled="disabled"
        :style="inputStyle"
        :lang="lang"
        :type="type"
        :placeholder="placeholder"
        :format="type === 'date' ? 'YYYY-MM-DD' : format"
        :time-picker-options="type === 'date' ? null : timeOptions"
        :value="date"
        :clearable="clearable"
        :disabled-date="fn_disabledDate"
        @change="fn_change"
    />
</template>


<script>
import Datepicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { datepickerSetoption } from '@assets/js/datepicker/setoption.js'

import _ from 'lodash'

export default {
    name: 'DatePicker',
    components: {
        Datepicker,
    },
    props: {
        value: [String, Date],

        refId: {
            type: String,
            default: 'datepicker'
        },
        type: {
            type: String,
            default: 'date',
            validator: function (value) {
                return ['date', 'time'].includes(value)
            }
        },
        placeholder: {
            type: String,
            default: null
        },
        

        /** noValue */
        noValue: {
            type: Boolean,
            default: false
        },
        /** disabled */
        disabled: {
            type: Boolean,
            default: false
        },
        /** style */
        inputStyle: {
            type: Object,
            default: function () {
                return {}
            },
        },
        /** clearable 초기화 가능 여부 */
        clearable: {
            type: Boolean,
            default: false
        },
        /** date-format */
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        /** 특정 일 기준 이전 disable */
        disabledBeforeDate: {
            type: Date,
            default: null,
        },
        /** 특정 일 기준 이후 disable */
        disabledAfterDate: {
            type: Date,
            default: null,
        },
        // formatable: {
        //     type: Boolean,
        //     default: false,
        // },

        /** input 시에 - 삭제여부 */
        replaceable: {
            type: Boolean,
            default: false
        },
        timeOptions: {
            type: Object,
            default: function () {
                return null
            },
        },
    },
    watch: {
        value: {
            handler: function (newValue) {
                const date = _.cloneDeep(newValue)
                switch(this.type) {
                    case 'date': {
                        this.date = date
                            ? ( Object.prototype.toString.call(date) === '[object Date]'
                                ? date
                                : this.fn_parse(this.replaceable ? date.replaceAll('-','') : date)
                            )
                            : null
                        break
                    }
                    case 'time': {
                        this.date = date
                        break
                    }
                }
                    
            }
        }
    },
    mounted: function () {
        if(!this.noValue){
            const date = _.cloneDeep(this.value)
            switch(this.type) {
                case 'date': {
                    this.date = date
                        ? ( Object.prototype.toString.call(date) === '[object Date]'
                            ? date
                            : this.fn_parse(this.replaceable ? date.replaceAll('-','') : date)
                        )
                        // : this.fn_parse(this.initValue)
                        : new Date()
                    break
                }
                case 'time': {
                    this.date = date
                    break
                }
            }
        }

        this.fn_change(this.date)
    },
    methods: {
        fn_change: function(payload) {
            this.$emit(
                'input',
                Object.prototype.toString.call(payload) === '[object Date]'
                    ? this.fn_stringify(payload)
                    : payload
            )
        },
        fn_stringify: function (payload) {
            // return payload ? new Date(payload.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0] : null
            return payload ? this.$moment(payload).format(this.format) : null
        },
        fn_parse: function (payload) {
            // return payload ? new Date(payload) : null
            return payload ? this.$moment(payload, this.format).toDate() : null
        },
        fn_disabledDate: function (date) {
            return (this.disabledBeforeDate ? date < this.disabledBeforeDate : false)
                    || (this.disabledAfterDate  ? date > this.disabledAfterDate : false)
        },

        /** ref-methods */
        focus: function () {
            this.$refs[this.refId].focus()
        },
    },
    data: function () {
        return {
            date: null,
            lang: datepickerSetoption,
        }
    }
}

</script>
