<!--
  * 타 프로젝트 불러오기 팝업 (시방배합 페이지 참고해서 API 연동까지 완료했습니다.)
 -->

<template>
  <!-- :id="id" -->
  <b-modal
    v-if="isActive"
    v-model="isActive"
    title="타 프로젝트 선택"
    modal-class="single_page"
    size="xl"
    footer-bg-variant="transparent"
    @shown="init"
    @hide="closeModal"
  >
    <template #default>
      <div class="pop_container">
        <div class="tab_contents">
          <div class="lookup_box multi_line">
            <table>
              <caption class="sr_only" />
              <colgroup>
                <col width="6%">
                <col width="24%">
                <col width="6%">
                <col width="24%">
                <col width="5%">
                <col width="24%">
                <col width="*">
              </colgroup>
              <tbody>
                <tr>
                  <th>프로젝트명</th>
                  <td>
                    <div class="form_area">
                      <input
                        type="text"
                        class="form_control"
                        placeholder="입력해주세요"
                        v-model="searchObj.projectNm"
                        @keyup.enter="searchProject()"
                      >
                    </div>
                  </td>
                  <th>프로젝트코드</th>
                  <td>
                    <input
                      type="text"
                      class="form_control"
                      placeholder="입력해주세요"
                      v-model="searchObj.projectId"
                      @keyup.enter="searchProject()"
                    >
                  </td>
                  <th>공사기간</th>
                  <td>
                    <DatepickerRange
                      ref="datapickerPopupRange"
                      @value-change="date_popup_change"
                    />
                  </td>
                  <td class="ar">
                    <button
                      type="button"
                      class="btn_reset"
                      @click="reset"
                    >
                      초기화
                    </button>
                    <button
                      type="button"
                      class="btn btn_sm btn_darkblue btn_radius btn_search"
                      @click="searchProject()"
                    >
                      검색
                    </button>
                  </td>
                </tr>

                <tr>
                  <th>현장명</th>
                  <td>
                    <input
                      type="text"
                      class="form_control"
                      placeholder="입력해주세요"
                      v-model="searchObj.siteNm"
                      @keyup.enter="searchProject()"
                    >
                  </td>
                  <th>현장코드</th>
                  <td>
                    <input
                      type="text"
                      class="form_control"
                      placeholder="입력해주세요"
                      v-model="searchObj.siteCd"
                      @keyup.enter="searchProject()"
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- id="selectOtherProjectPop" -->
          <sqms-grid
            id="otherProjectGrid"
            :columns="columns"
            :data="projectList"
            @click="selectRow"
            @dbClick="row => {
              selectRow(row)
              save()
            }"
            @init="sheet => { sheet = sheet }"
            :cfg="{
              NoVScroll: false
            }"
          />
        </div>
      </div>

      <PopAlert
        :msg="alertMsg"
        confirm_use
        :btn-name="{first : '확인', second : '취소'}"
        pop-id="selectProjectAlert"
        @first-btn-fn="confirmPopAlert"
        @second-btn-fn="$bvModal.hide('selectProjectAlert')"
      />
    </template>
    <template #modal-footer>
      <!-- #modal-footer="{ ok, hide }" -->
      <b-button
        class="btn btn_md btn_outline btn_darkgray"
        @click="save"
      >
        선택
      </b-button>
      <b-button
        class="btn btn_md btn_outline btn_gray"
        @click="closeModal"
      >
        닫기
      </b-button>
    </template>
  </b-modal>
</template>

<script>
  import API from '@/apis/'
  import PopAlert from '@/pages/common/popup/PopAlert.vue'

  import DatepickerRange from '@/pages/common/popup/DatepickerRange.vue'

  export default {
	name: 'SelectOtherProjectPopUp',
	components: {
		DatepickerRange,
		PopAlert
	},
	data () {
		return {
			  isActive: this.active || false,
        alertMsg: '',
        projectList : [], //프로젝트 목록
        searchObj: { // 타 프로젝트 조회 필터링 정보
          projectNm : undefined, // 프로젝트 명
          projectId : undefined, // 프로젝트 코드
          siteNm : undefined, // 현장 명
          siteCd : undefined, // 현장 코드
          csrtStartDt : undefined, // 공사기간 > 시작
          csrtEndDt : undefined, // 공사기간 > 종료
        },
			  sheet: null,
        selectedProject: null, // 선택 row
        columns: [
				{ Name: 'SEQ', Header: [{ Value: 'No', RowSpan: 2 }], Type: "Int", RelWidth: 4, CanEdit: 0 },
				{ Name: 'baseTypeNm', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 5, CanEdit: 0 },
				{ Name: 'csrtTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 5, CanEdit: 0 },
				{ Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 5, CanEdit: 0 },
				{ Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
				{ Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
				{ Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
				{ Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작' }], RelWidth: 8, CanEdit: 0 },
				{ Name: 'csrtEndDt', Header: [{}, { Value: '종료' }], RelWidth: 8, CanEdit: 0 },
				{ Name: 'csrtMngr', Header: [{ Value: '현장소장', RowSpan: 2 }], RelWidth: 5, CanEdit: 0 },
				{ Name: 'siteMstrId', Visible : '0' }
         	]
        }
	},
  props: {
    id: {
            type: String,
            default: 'selectOtherProjectPop'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    active (newVal) {
      this.isActive = newVal
    }
  },
  methods: {
    async init () {
      await this.searchProject()
      this.selectedProject = this.projectList.length ? this.projectList[0] : null
    },
    /**
     * 타 프로젝트 목록 조회
     */
    async getOtherProjectList (payload) {
      try {
      // const projectId = this.$cookies.get("projectId")
      const siteId = this.$cookies.get("siteId")
      const siteMstrId = this.$cookies.get("siteMstrId")

      const response = await API.concrete.getOtherProjectList({
        ...payload,
        siteId,
        siteMstrId
      })
      if(response?.datas) {
        this.projectList = response.datas?.resultList

      }

      } catch (error) {
      console.error('프로젝트 리스트 조회 에러: ', error)
      }
    },
    /**
     * 프로젝트 [선택] Event
     */
    save () {
      if(!this.selectedProject) {
          this.alertMsg = '프로젝트를 선택해주세요';
          return this.$root.$emit('bv::show::modal', 'selectProjectAlert')
      }

      this.$emit('select', this.selectedProject)
      // this.$root.$emit('bv::hide::modal', this.id)
      this.closeModal()
    },
    /**
     * 프로젝트 [닫기] Event
     */
    closeModal () {
      // this.$bvModal.hide(id)
      this.$emit('close')
    },
    /**
    * row 클릭 이벤트
    */
    selectRow (evtParams) {
      evtParams.sheet.focus(evtParams.row)

      const selected = evtParams.sheet.getRowValue(evtParams.row)
      this.selectedProject = selected
    },
    /**
    * 공사기간 변경 이벤트
    */
    date_popup_change (param) {
        this.searchObj.csrtStartDt = param[0]
        this.searchObj.csrtEndDt = param[1]
    },
    /**
    * 초기화 버튼
    */
    reset () {
      this.searchObj = {
          projectNm : undefined,
          projectId : undefined,
          siteNm : undefined,
          siteCd : undefined,
          csrtStartDt : undefined,
          csrtEndDt : undefined
      }
      this.searchProject()
    },
    /**
    * 프로젝트 검색
    */
    async searchProject (payload = this.searchObj) {
        await this.getOtherProjectList(payload)
    },
    // ========== PopAlert ============
    /**
    * alert > 확인
    */
    confirmPopAlert () {
      this.$nextTick(function(){
          this.closePop()
      })
    },
    /**
    * alert > 취소
    */
    closePop () { //기본 팝업 닫기 event
      this.$root.$emit('bv::hide::modal', 'selectProjectAlert')
    }
  },
}
</script>