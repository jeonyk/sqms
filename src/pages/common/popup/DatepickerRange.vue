<!-- Datepicker.vue -->
<template>
    <date-picker v-model="datepicker_range" :lang="lang" range valueType="date" class="datepicker range" input-class="form_control" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" key=""
     ref="datepicker" 
     @pick="startDate"
     @clear="clearDate"
     v-on:change="valueChange"     
     >
       <template v-slot:header>
         <div class="ar">
            <label for="check_deadline" class="input_check">
               <input id="check_deadline" type="checkbox" class="form_control" v-model="checked" @change="changeInput">
               <span class="label_text">기한 없음</span>
            </label>
         </div>
       </template>
    </date-picker>
      
</template>
<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import { datepickerSetoption } from '../data/datepicker_setoption';

   export default {
      name: "DatePickerRange",
      props: {
         additionalInfo: {
            type: Boolean,
            default: false
         }
      },
      data() {
         return {
            datepicker_range: null,
            lang: datepickerSetoption,
            checked: false,
            start_date: null,
         } 
      },
      components: {
          DatePicker
      },
      methods: {
         startDate(date) {
            // console.log('pick')
            this.start_date = date;

            if(this.checked != false) {
               this.datepicker_range = [this.start_date, new Date(2099, 11, 31)];
            }
         },
         changeInput() {
            if(this.checked != false) {
               if(this.datepicker_range != null) {
                  this.datepicker_range = [this.datepicker_range[0], new Date(2099, 11, 31)];
               }else{
                  this.datepicker_range = [this.start_date, new Date(2099, 11, 31)];
               }
            }else{
               this.start_date = null;
               this.datepicker_range = null;
            }
         },
         clearDate() {
            this.start_date = null;
            this.datepicker_range = null;
            this.checked = false;
         },
         valueChange : function(param) {
            // console.log(param)
            // console.log(param[0] === null && param[1] === null)
            if(param != '') {
               this.datepicker_range = this.stringToDate(param);
            }
            
            // if(this.datepickerRange != null) {
               // console.log(this.additionalInfo? {unlimited: this.checked, date: this.dateToString(this.datepicker_range)} : (param == [null] ? [null, null] :this.dateToString(this.datepicker_range)))
               this.$emit('value-change', this.additionalInfo? {unlimited: this.checked, date: this.dateToString(this.datepicker_range)} : (param[0] === null && param[1] === null ? [null, null] :this.dateToString(this.datepicker_range)));
            // }
         },
         valueReset : function() {
            this.datepicker_range = null;
         },
         dateToString: function (list) {
            return list.map(date => {
               return date.toISOString().split('T')[0]
            })
         },
         stringToDate: function (list) {
            return list.map(string => {
                  return new Date(string)
               })
         }
      }
   };
</script>