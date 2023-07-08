<!--
  * 타 프로젝트 데이터 가져오기 팝업
 -->
<template>
  <!-- :id="id" -->
  <b-modal
    v-if="isActive"
    v-model="isActive"
    :title="title"
    modal-class="single_page"
    size="xl"
    @shown="init"
    @hide="close"
    footer-bg-variant="transparent"
  >
    <template #default>
      <div class="pop_container">
        <div class="tab_contents">
          <pour-option-write-form
            ref="pourOptionListRef"
            :is-editing="false"
            @select="selectPourOptionRow"
          />
        </div>
      </div>
    </template>
    <template #modal-footer>
      <!-- #modal-footer="{ ok, hide }" -->
      <b-button
        class="btn btn_lg btn_outline btn_darkgray"
        @click="save"
      >
        선택
      </b-button>
      <b-button
        class="btn btn_lg btn_outline btn_gray"
        @click="close()"
      >
        닫기
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import MsgBoxMixins from './MsgBox.mixins'
import PourOptionWriteForm from '../PourOptionWriteForm.vue'
export default {
    name: 'SelectOtherProjectDataPopUp',
    mixins: [MsgBoxMixins],
    components: {
		PourOptionWriteForm
    },
    props: {
        active: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '타설옵션 선택'
        }
    },
    watch: {
        async active (newVal) {
            this.isActive = newVal
        }
    },
    methods: {
        /**
         * popup 오픈시, 이벤트
         */
        async init () {
			this.$nextTick(function(){
				if(this.$refs.pourOptionListRef) {
					this.selectedRow = this.$refs.pourOptionListRef.gridData[0]
				}
			})
        },
        /**
         * 타설옵션 선택 모달 > row 클릭 이벤트
         */
        selectPourOptionRow (selected) {
            this.selectedRow = selected
            this.$emit('save', this.selectedRow)
            this.close()
        },
        close () {
            this.$emit('close')
        },
        /**
         * 전체 가져오기 / 선택 가져오기
         * @param {Boolean} isAll '전체 가져오기'인지?
         */
        save () {
            if(!this.selectedRow) return this.alert('타설옵션을 선택해주세요.')
            this.$emit('save', this.selectedRow)
            this.close()
        }
    },
    data: (root) => ({
        gridData: [],
        columns: [],
        sheet: null,
        selectedRow: null,
        isActive: root.active || false
    })
}
</script>