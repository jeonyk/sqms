<!--
  * 타 프로젝트 데이터 가져오기 팝업
 -->
<template>
  <!-- :id="id" -->
  <b-modal
    v-if="isActive"
    v-model="isActive"
    :title="title"
    hide-footer
    modal-class="single_page"
    size="xl"
    @shown="init"
    @hide="close"
    footer-bg-variant="transparent"
  >
    <template #default>
      <div class="pop_container">
        <div class="tab_contents">
          <div class="tab_area">
            <div class="lookup_box multi_line">
              <slot name="search" />
            </div>
            <div class="inner">
              <div class="button_box">
                <button
                  type="button"
                  class="btn btn_sm btn_excel"
                  @click="selectData(true)"
                >
                  전체 가져오기
                </button>
                <button
                  type="button"
                  class="btn btn_sm btn_darkgray"
                  @click="selectData(false)"
                >
                  선택 가져오기
                </button>
              </div>

              <sqms-grid
                id="selectOtherProjectDataPop"
                :columns="columns"
                :data="data"
                :cfg="{
                  NoVScroll: false
                }"
                @init="sheet => { sheet = sheet }"
              />
            </div>
          </div>
        </div>
      </div>

      <pop-alert
        msg="선택한 데이터가 없습니다."
        :btn-name="{ first : '확인' }"
        @first-btn-fn="$root.$emit('bv::hide::modal', 'popAlert');"
      />
    </template>
    <template #modal-footer>
      <!-- #modal-footer="{ ok, hide }" -->
      <b-button
        class="btn btn_lg btn_outline btn_blue"
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
	import PopAlert from '@/pages/common/popup/PopAlert.vue'

    export default {
        name: 'SelectOtherProjectDataPopUp',
		components: {
			PopAlert
		},
        props: {
            id: { // 모달 ID (필수값)
                type: String,
                default: 'SelectOtherProjectDataPopUp',
                require: true
            },
			active: {
				type: Boolean,
				default: false
			},
            title: {
                type: String,
                default: '타 프로젝트 데이터 가져오기'
            },
            columns: {
                type: Array,
                default: () => []
            },
            data: {
                type: Array,
                default: () => []
            }
        },
		watch: {
			active (newVal) {
				this.isActive = newVal
			}
		},
        methods: {
            /**
             * popup 오픈시, 이벤트
             */
            init () {
				this.$emit('shown')
            },
            close () {
				this.$emit('close')
                // this.$root.$emit('bv::hide::modal', this.id)
            },
            /**
             * 전체 가져오기 / 선택 가져오기
             * @param {Boolean} isAll '전체 가져오기'인지?
             */
            selectData (isAll) {
				let payload = []
				if(isAll) {
					payload = this.data
				} else {
					const checkedData = this.data.filter(row => row.isChecked)
					if(!checkedData?.length) return this.$bvModal.show('popAlert')
					payload = checkedData
				}

				this.$emit('save', payload)
				this.close()
            }
        },
        data: (root) => ({
            sheet: null,
			isActive: root.active || false
        })
    }
</script>