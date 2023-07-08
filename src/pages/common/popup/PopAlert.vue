<template>
  <b-modal
    :id="popId"
    title="알림"
    hide-backdrop
    size="sm"
    :footer-bg-variant="footerBg"
    v-on:shown="focus"
    v-on:keyup="enterEvent"
  >
    <template #default>
      <div class="pop_container">
        <div class="message_table">
          <p
            class="msg"
            v-if="dangerouslyUseHtmlString"
            v-html="msg"
          />
          <p
            class="msg"
            v-else
          >
            {{ msg }}
          </p>
        </div>
      </div>
    </template>
    <template #modal-footer> 
      <b-button
        class="btn btn_lg btn_outline btn_blue"
        id="focusBtn"
        @click="firstBtnFn"
      >
        {{ btnName.first }}
      </b-button>
      <b-button
        v-if="confirmUse"
        class="btn btn_lg btn_outline btn_darkgray"
        @click="secondBtnFn"
      >
        {{ btnName.second }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>

   export default {
      name: 'PopAlert',
      data() {
         return {
            footerBg: 'transparent'
         }
      },
      props: {
         msg : { //팝업 메세지
            type: String,
            default : ''
         },
         confirmUse : { //취소버튼 사용 여부
            type : Boolean,
            default: false
         },
         btnName : { //버튼명 이름 변경 원할 시
            type: Object,
            default : function() {
               return {
                  first : '확인',
                  second : '닫기'
               }
            }
         },
         popId : {
            type: String,
            default : 'popAlert'
         },
         dangerouslyUseHtmlString: { // True: 메세지 태그처럼 사용 가능
            type: Boolean,
            default: true
         }
      },      
      methods: {
         firstBtnFn : function() { //첫번째 버튼 event
            this.$emit('first-btn-fn');
         },
         secondBtnFn : function() { //첫번째 버튼 event
            this.$emit('second-btn-fn');
         },
         focus : function(){
            document.getElementById('focusBtn').focus();
         },
         enterEvent : function(e) { //검색조건 enter event
            if(e.keyCode == 13||e.keyCode == 32) {//enter, space
               if(this.confirmUse == false){
                  this.$emit('first-btn-fn');
               }else{
                  this.$emit('second-btn-fn');
               }
            }else if(e.keyCode == 27){//esc
               if(this.confirmUse == false){
                  this.$root.$emit('bv::hide::modal', this.popId);
               }else{
                  this.$emit('second-btn-fn');
               }
            }
         },
      },
   }
</script>