<template>
   <!-- Default Modal -->
   <b-modal v-model="modalShow" :id="id">
      <div class="popup modal_type2" style="white-space:pre-line">
         <h3 v-show="showIcon"><img :src="modalIcon" alt="icon"></h3>
         <h3> {{ subMsg }} </h3>
         <h2> <strong>{{ mainMsg }}</strong>{{ mainText }} </h2>
      </div>
      <template #modal-footer>
         <div :class="'modal_button_box ' + mClass">
            <a class="btn_cancel" @click=" $emit( 'modalHandler' )" v-show="( btnType )">{{ btnLeft }}</a>
            <a class="btn_ok" @click=" $emit( 'modalHandler' )">{{ btnRight }}</a>
         </div>
      </template>
   </b-modal>
</template>

<script>
   export default {
      name: "MobilePopup",
      props: {
            id : String,
            mainMsg : String,
            mainText : String,
            subMsg : String,
            btnLeft : String,
            btnRight : String,
            mClass : String,
            btnType : String,
            showIcon : Boolean,
            modalIcon : String
         },
      data() {
         return {
            modalShow: false,
         }
      }
   }
</script>