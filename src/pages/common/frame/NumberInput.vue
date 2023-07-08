<template>
   <input type="text" v-bind:class="className" v-bind:value="value" v-on:input="numberCheck" />
</template>

<script>
   import { commonFn } from '@/script/commonFn.js';

   export default {
      name: "NumberInput",
      data() {
         return {
         } 
      },
      props : {
         className : {
            type : String,
            default : 'form_control'
         },
         value : {
            type: String,
            default : ''
         }
      },
      methods : {
         numberCheck : function(e) {
            let temp = e.target.value;
            temp = temp.replace(/[^0-9]/gi, '');
            this.$emit('input', commonFn.methods.addCommas(temp))
         }
      }
   };
</script>