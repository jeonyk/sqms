<!-- Datepicker.vue -->
<template>
    <date-picker v-model="datepicker" :lang="lang" valueType="format" class="datepicker" input-class="form_control" placeholder="YYYY-MM-DD"></date-picker>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import { datepickerSetoption } from '../data/datepicker_setoption';

    export default {
        name: "",
        data() {
            return {
                datepicker: null,
                lang: datepickerSetoption,
            } 
        },
        components: {
            DatePicker
        }
    };
</script>