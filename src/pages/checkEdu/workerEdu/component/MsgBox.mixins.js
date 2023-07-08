import Vue from 'vue'
export default Vue.extend({
  methods: {
    alert (msg, callBack) {
      this.$bvModal.msgBoxOk(this.msgBoxContents(msg), this.msgBoxOptions)
        .then(value => {
          if(value && callBack) return callBack()
        })
        .catch(err => {
          return false
        })
    },
    confirm (msg, callBack, cancelCallBack) {
      this.$bvModal.msgBoxConfirm(this.msgBoxContents(msg), this.msgBoxOptions)
        .then(value => {
          if (value && callBack) return callBack() // 확인
          else if (cancelCallBack) return cancelCallBack() // 취소
        })
        .catch(err => {
          return false
        })
    }
  },
  data: (root) => ({
    msgBoxOptions: {
      modalClass: 'modal-msg-box',
      footerClass: 'modal-msg-box-footer',
      title: '알림',
      size: 'sm',
      buttonSize: 'lg',
      okVariant: 'secondary btn_blue btn_lg btn_outline',
      cancelVariant: 'secondary btn_darkgray btn_lg btn_outline',
      contentClass: ' pop_container',
      okTitle: '확인',
      cancelTitle: '취소',
      footerBgVariant: 'transparent',
      hideBackdrop: true,
      static: true
    },
    msgBoxContents: (msg) => {
      const h = root.$createElement

      const contents = h(
        'div',
        { class: 'pop_container' },
        [
          h(
            'span',
            { class: 'message_table' },
            [
              h(
                'pre',
                { class: 'msg' },
                msg
              )
            ]
          )
        ]
      )
      return contents
    }
  })
})
