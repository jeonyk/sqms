<!--
  * 그리드 선택 모달
 -->

<template>
  <!-- :id="id" -->
  <b-modal
    v-if="isActive"
    v-model="isActive"
    id="SelectGridModal"
    :title="title"
    size="xl"
    footer-bg-variant="transparent"
    @shown="init"
  >
    <template #default>
      <div class="pop_container">
        <!-- <div class="lookup_box multi_line align_center"> -->
        <slot name="search" />
        <!-- <table>
            <caption class="sr_only" />
            <tbody>
              <tr>
                <th>유형</th>
                <td>
                  <select
                    v-model="searchObj.type"
                    class="form_control"
                  >
                    <option value="">
                      전체
                    </option>
                  </select>
                </td>
                <th>협력사명</th>
                <td>
                  <input
                    v-model="searchObj.partnerNm"
                    type="text"
                    class="form_control"
                    placeholder="입력해주세요"
                  >
                </td>
                <td class="ar">
                  <button
                    type="button"
                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                    @click="searchPartner()"
                  >
                    검색
                  </button>
                </td>
              </tr>
            </tbody>
          </table> -->
        <!-- </div> -->

        <sqms-grid
          id="selectPartnerModalGrid"
          :columns="columns"
          :data="data"
          @click="selectRow"
          @dbClick="row => {
            selectRow(row)
            save()
          }"
          @init="sheet => { sheet = sheet }"
          :cfg="{
            NoVScroll: true
          }"
        />
      </div>
    </template>
    <template #modal-footer>
      <b-button
        class="btn btn_md btn_outline btn_darkgray"
        @click="save()"
      >
        선택
      </b-button>
      <b-button
        class="btn btn_md btn_outline btn_gray"
        @click="closeModal()"
      >
        닫기
      </b-button>
    </template>
  </b-modal>
</template>

<script>
  import MsgBoxMixins from './MsgBox.mixins'

  export default {
	name: 'SelectParnerModal',
  mixins: [MsgBoxMixins],
	components: {
	},
	data () {
		return {
			isActive: this.active || false,
			sheet: null,
      selectedRow: null, // 선택 row
      makeConcMixSd: (id) => {
        if (id.includes('-')) return id
        const result = id.slice(0, 2) + '-' + id.slice(2, -3) + '-' + id.slice(-3)
        return result
      }
    }
	},
	props: {
		active: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '선택'
		},
		data: {
			type: Array,
			default: () => []
		},
		columns: {
			type: Array,
			default: () => []
		},
		emtyAlertMsg: {
			type: String,
			default: '선택한 행이 없습니다.'
		}
      },
	  watch: {
      active (newVal) {
        this.isActive = newVal
      }
	  },
    methods: {
        init () {
          this.$nextTick(function(){
            this.selectedRow = this.data.length ? this.data[0] : null
          })
        },
            /**
              * row 클릭 이벤트
              */
        selectRow (evtParams) {
          evtParams.sheet.focus(evtParams.row)

          const selected = evtParams.sheet.getRowValue(evtParams.row)
          this.selectedRow = selected
        },
        /**
         * 모달 > [선택] Event
         */
        save () {
          if(!this.selectedRow) {
            this.alert(this.emtyAlertMsg)
          }

          this.$emit('save', this.selectedRow)
          this.closeModal()
        },
        /**
         * 프로젝트 [닫기] Event
         */
        closeModal () {
          this.$emit('close')
        },
      }
   }
</script>