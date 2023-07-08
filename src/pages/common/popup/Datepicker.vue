<!-- Datepicker.vue -->
<template>
    <date-picker v-on:change="valueChange" v-model="datepicker" v-bind:lang="lang" valueType="format" class="datepicker" input-class="form_control" placeholder="YYYY-MM-DD" :default-value="new Date()"></date-picker>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import { datepickerSetoption } from '../data/datepicker_setoption';

    export default {
        name: "",
        data() {
            return {
                datepicker: new Date().toISOString().split('T')[0],
                lang: datepickerSetoption,
            } 
        },
        components: {
            DatePicker
        },
        created () {
            // console.log("dd");
            this.$emit('value-change', this.datepicker)
        },
        methods : {
            valueChange : function(param) {
                if(param != '') {
                    this.datepicker = param;
                }
                // console.log(param);
                // if(this.datepicker != null) {
                    this.$emit('value-change', this.datepicker);
                // }
            },
            valueReset : function() {
                this.datepicker = null;
            },
            valueResetDefault : function () {
                this.datepicker = new Date().toISOString().split('T')[0]
            }
        }
    };
</script>