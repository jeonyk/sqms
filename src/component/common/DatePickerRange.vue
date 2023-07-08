<template>
    <Datepicker
        :ref="refId"
        :valueType="'date'"
        class="datepicker"
        :class="{ range: true }"
        input-class="form_control"
        :placeholder="'YYYY-MM-DD ~ YYYY-MM-DD'"
        :disabled="disabled"
        :style="inputStyle"
        :lang="lang"
        range
        :disabled-date="fn_disabledDate"
        :value="date"
        @pick="fn_pick"
        @change="fn_change"
        @clear="fn_clear"
    >
        <!-- :format="format" -->
        <!-- :formatter="formatDate" -->
        <!-- :placeholder="`${format} ~ ${format}`" -->
        <template #header v-if="!limitable">
            <div class="ar">
                <label for="useDeadline" class="input_check">
                    <input
                        v-model="useDeadline"
                        id="useDeadline"
                        type="checkbox"
                        class="form_control"
                    >
                    <span class="label_text"> 기한 없음 </span>
                </label>
            </div>
        </template>
    </Datepicker>
</template>

<script>
import Datepicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { datepickerSetoption } from '@assets/js/datepicker/setoption.js'

import _ from 'lodash'

export default {
    name: 'DatePickerRange',
    components: {
        Datepicker,
    },
    props: {
        value: Array,

        refId: {
            type: String,
            default: 'datepickerRange',
        },

        /** deateline Date */
        deadline: {
            type: [String, Date],
            default: function () {
                return new Date(2099, 11, 31)
            },
        },
        /** disabled */
        disabled: {
            type: Boolean,
            default: false,
        },
        /** style */
        inputStyle: {
            type: Object,
            default: function () {
                return {}
            }
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
        /** input 시에 - 삭제여부 */
        replaceable: {
            type: Boolean,
            default: false
        },
        limitable: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value: {
            handler: function (newValue) {
                // this.date = newValue !== [null, null] || this.value !== null
                this.date = newValue 
                    ? _.cloneDeep(newValue).map(date => {
                        return Object.prototype.toString.call(date) === '[object Date]'
                            ? date
                            : this.fn_parse(this.replaceable ? date.replaceAll('-','') : date)
                    })
                    : [null, null]
                
            },
            deep: true,
        },
    },
    mounted: function () {
        // this.date = this.value !== [null, null] || this.value !== null
        this.date = this.value 
            ? _.cloneDeep(this.value).map(date => {
                return Object.prototype.toString.call(date) === '[object Date]'
                    ? date
                    : this.fn_parse(this.replaceable ? date.replaceAll('-','') : date)
            })
            : [null, null]
    },
    methods: {
        fn_pick: function (payload) {
            this.pick = payload

            if (this.useDeadline) {
                this.date = [this.pick, this.deadline]
                this.fn_change(this.date)
                this.$refs[this.refId].closePopup()
            }
        },
        fn_change: function (payload) {
            this.$emit(
                'input', 
                payload.map(date => {
                    return Object.prototype.toString.call(date) === '[object Date]'
                        ? this.fn_stringify(date)
                        : date
                })
            )
        },
        fn_clear: function () {
            this.useDeadline = false
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
            /** date */
            date: null,
            pick: null,
            useDeadline: false,
            lang: datepickerSetoption,


            /** Formatter (date to string, string to date) */
            // formatDate: {
            //     stringify: (date) => {
            //         return date ? date.toISOString().split('T')[0] : null
            //     },
            //     parse: (string) => {
            //         return string ? new Date(string) : null
            //     }
            // }
        }
    }


}

</script>
