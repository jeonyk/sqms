<!--
  * 콘크리트 관리 > 초기 Setting > 추가정보
 -->
<template>
  <div>
    <div class="inner type2">
      <div class="button_box">
          <strong>시험빈도 설정</strong>
          <div class="fr">
              <button type="button" class="btn btn_sm btn_darkblue" @click="saveTestFreq" v-if="write">저장</button>
        </div>
      </div>
      <div class="table_normal_list align_center">
          <table>
              <caption class="sr_only"></caption>
              <colgroup>
                  <col width="17%">
                  <col width="*">
                  <col width="*">
              </colgroup>
              <thead>
                  <tr>
                      <th>구분</th>
                      <th>시험 빈도 사용 여부</th>
                      <th>시험 빈도 설정</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <th>거푸집 및 동바리 해체강도</th>
                      <td>
                        <input type="text" class="form_control small" v-model="formDmldVal"><span>㎥</span>
                      </td>
                      <td>
                        <label class="input_radio">
                            <input type="radio" class="form_control" id="formDmldY" name="formDmld" value="Y" v-model="formDmldYn">
                            <span class="label_text">Y</span>
                        </label>
                        <label class="input_radio">
                            <input type="radio" class="form_control" id="formDmldN" name="formDmld" value="N" v-model="formDmldYn">
                            <span class="label_text">N</span>
                        </label>
                      </td>
                  </tr>
                  <tr>
                      <th>표준압축강도</th>
                      <td>
                        <input type="text" class="form_control small" v-model="compDmldVal"><span>㎥</span>
                      </td>
                      <td>
                        <label class="input_radio">
                            <input type="radio" class="form_control" name="compDmld" value="Y" v-model="compDmldYn">
                            <span class="label_text">Y</span>
                        </label>
                        <label class="input_radio">
                            <input type="radio" class="form_control" name="compDmld" value="N" v-model="compDmldYn">
                            <span class="label_text">N</span>
                        </label>
                      </td>
                  </tr>
                  <tr>
                      <th>물성시험빈도</th>
                      <td>
                        <input type="text" class="form_control small" v-model="pcPcalDmldVal"><span>㎥</span>
                      </td>
                      <td>
                          <label class="input_radio">
                              <input type="radio" class="form_control" name="pcPcalDmld" value="Y" v-model="pcPcalDmldYn">
                              <span class="label_text">Y</span>
                          </label>
                          <label class="input_radio">
                              <input type="radio" class="form_control" name="pcPcalDmld" value="N" v-model="pcPcalDmldYn">
                              <span class="label_text">N</span>
                          </label>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      <div class="button_box">
        <strong>시험 장비 등록</strong>
      </div>

      <div class="table_normal_list align_center">
        <table>
          <caption class="sr_only" />
          <colgroup>
            <col width="*">
            <col width="*">
            <col width="*">
            <col width="*">
            <col width="*">
            <col width="*">
          </colgroup>
          <thead>
            <tr>
              <th>염화물</th>
              <th>온도</th>
              <th>공기량</th>
              <th>슬럼프 또는 슬럼프 플로</th>
              <th>측정기</th>
              <th>압축강도</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-for="key in Object.keys(testEquip)"
                :key="key"
              >
                <div class="search_area">
                  <p 
                    class="txt_area"
                    @click="e => {
                      activeTestEquip = key
                      $bvModal.show('testDeviceInfoId')
                    }"
                  >
                    {{ testEquip[key].label }}
                  </p>
                  <button
                    type="button"
                    class="btn_search"
                    @click="e => {
                      activeTestEquip = key
                      $bvModal.show('testDeviceInfoId')
                    }"
                  >
                    검색
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <!-- 시공장비 등록 -->
      <div class="button_box">
          <strong>시공 장비 등록</strong>
          <div class="fr">
              <button type="button" class="btn btn_sm btn_darkgray" @click="ctemCopyRow">행 복사</button>
              <div class="btn_number">
                  <select
                      v-model="addRowsCount"
                      class="form_control num"
                  >
                      <option
                          v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                          :key="count"
                          :value="count"
                      >
                          {{ count }}
                          <!-- {{ String(count).padStart(3, '0') }} -->
                      </option>    
                  </select>
                  <button type="button" class="btn btn_sm" @click="ctemAddRow">행 추가</button>
              </div>
              <button type="button" class="btn btn_sm btn_darkgray" @click="ctemDeleteRow">행 삭제</button>
              <button type="button" class="btn btn_sm btn_darkblue" @click="ctemSave">저장</button>
          </div>
      </div>

      <div class="ib_wrap">
          <div id="ctemGrid" class="ibsheet_table"></div>
      </div>

      <!-- 원재료 등록 -->
      <div class="button_box">
          <strong>원재료 등록</strong>
          <div class="fr">
              <button type="button" class="btn btn_sm btn_darkgray" @click="rawMaterialCopyRow">행 복사</button>
              <div class="btn_number">
                  <select
                      v-model="addRowsCount"
                      class="form_control num"
                  >
                      <option
                          v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                          :key="count"
                          :value="count"
                      >
                          {{ count }}
                          <!-- {{ String(count).padStart(3, '0') }} -->
                      </option>    
                  </select>
                  <button type="button" class="btn btn_sm" @click="rawMaterialAddRow">행 추가</button>
              </div>
              <button type="button" class="btn btn_sm btn_darkgray" @click="rawMaterialDeleteRow">행 삭제</button>
              <button type="button" class="btn btn_sm btn_darkblue" @click="rawMaterialSave">저장</button>
          </div>
      </div>

      <div class="ib_wrap">
          <div id="rawMaterialGrid" class="ibsheet_table"></div>
      </div>

      <div class="info-form">
        <sqms-grid
          id="pourPlanGrid"
          :data="pourPlanGridData"
          :columns="pourPlanColumns"
          :header-checkbox-rowspan="2"
          :storable="write"
          :deletable="write || unuse"
          :removable="true"
          :addable="write"
          :copyable="write"
          :use-checkbox="true"
          :inputStyle="{'height':'250px'}"
          :cfg="{
              NoDataMessage : 3,
              NoVScroll: false
          }"
          add-row-position="end"
          :save-mode="0"
          @save="saveGridData(...arguments, 'pourPlan')"
          ref="pourPlanGridRef"
        >
          <template #button-prefix>
            <strong>타설계획서 정보 입력</strong>
          </template>
          <!-- <template #button-suffix>
            <button
              type="button"
              class="btn btn_sm btn_darkgray"
              @click="openOtherProjectData('pourPlan')"
            >
              타 프로젝트 불러오기
            </button>
          </template> -->
        </sqms-grid>
      </div>
    </div>
    <!-- 타설계획서 정보 입력 -->

    <!-- 시험장비 선택 팝업 -->
    <select-test-equip-modal
      :id="'testDeviceInfoId'"
      :remain="3"
      status="Y"
      :init-device-name="testEquip[activeTestEquip].label"
      @save="saveTestEquip"
      ref="testEquipModalRef"
    />

    <!-- 팝업 -->
    <!-- 타 프로젝트 선택 모달 -->
    <select-other-project-pop-up
      :active="isOtherProjectModal"
      @close="isOtherProjectModal = false"
      @select="selectOtherProject"
    />
    <!-- 타 프로젝트 데이터 가져오기 -->
    <select-other-project-data-pop-up
      :active="isOtherDataModal"
      @close="isOtherDataModal = false"
      :title="{
        ctem: '타 프로젝트 데이터 가져오기 (시공 장비)',
        rawMaterial: '타 프로젝트 데이터 가져오기 (원재료)',
        pourOption: '타 프로젝트 데이터 가져오기 (타설계획서)',
      }[activeOtherProjectField]"
      :columns="otherProjectDataColumns"
      :data="otherProjectData"
      @save="saveOtherData"
      @shown="resetProjectCondition()"
    >
      <template #search>
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
                <div class="search_area">
                  <input
                    type="text"
                    class="form_control"
                    placeholder="입력해주세요"
                    v-model="searchObj.projectNm"
                    @keyup.enter="searchProjectData()"
                  >
                  <button
                    type="button"
                    class="btn_search"
                    @click="searchOtherProject"
                  >
                    검색
                  </button>
                </div>
              </td>
              <th>프로젝트코드</th>
              <td>
                <input
                  type="text"
                  class="form_control"
                  placeholder="입력해주세요"
                  v-model="searchObj.projectId"
                  @keyup.enter="searchProjectData()"
                >
              </td>
              <th>공사기간</th>
              <td>
                <DatepickerRange @value-change="date_popup_change" />
              </td>
              <td class="ar">
                <button
                  type="button"
                  class="btn_reset"
                  @click="resetProjectCondition"
                >
                  초기화
                </button>
                <button
                  type="button"
                  class="btn btn_sm btn_darkblue btn_radius btn_search"
                  @click="searchProjectData()"
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
                  @keyup.enter="searchProjectData()"
                >
              </td>
              <th>현장코드</th>
              <td>
                <input
                  type="text"
                  class="form_control"
                  placeholder="입력해주세요"
                  v-model="searchObj.siteId"
                  @keyup.enter="searchProjectData()"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </select-other-project-data-pop-up>

    <!-- Alert -->
    <pop-alert
      :msg="popAlert.msg"
      :btn-name="{first : '확인'}"
      @first-btn-fn="$root.$emit('bv::hide::modal', 'popAlert')"
      @second-btn-fn="$root.$emit('bv::hide::modal', 'popAlert')"
    />
  </div>
</template>

<script>
import API from '@/apis/'
import loader from '@ibsheet/loader'
import SQMSGrid from '@/pages/common/grid/SQMSGrid'
import { EquipmentSelect } from '@/pages/common/data/PopupList'
import DatepickerRange from '@/pages/common/popup/DatepickerRange.vue';
import { ConcreteInfo, ConcreteInfo2, ConcreteInfo3 } from '@/pages/common/data/MaterialsList'
import SelectTestEquipModal from './component/SelectTestEquipModal.vue'
import SelectOtherProjectPopUp from './component/SelectOtherProjectPopUp.vue'
import PopAlert from '@/pages/common/popup/PopAlert.vue'
import SelectOtherProjectDataPopUp from './component/SelectOtherProjectDataPopUp.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import {sendPostApi} from '@/apis/common'

export default {
    name: 'TestDeviceInfoForm',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        'sqms-grid': SQMSGrid,
        SelectTestEquipModal,
        SelectOtherProjectPopUp,
        SelectOtherProjectDataPopUp,
        PopAlert,
        DatepickerRange
    },
    data: () => ({
        selectEquipPop: {
            columns: [],
            data: [],
            searchDevice: ''
        },
		popAlert: {
			msg: '',
			useCancelBtn: true
		},
		isOtherProjectModal: false, // 타프로젝트 불러오기 모달 Handler
		isOtherDataModal: false, // 타프로젝트 데이터 가져오기 모달 Handler
    formDmldYn : '',
    compDmldYn : '',
    formDmldVal : '',
    compDmldVal : '',
    pcPcalDmldYn : '',
    pcPcalDmldVal : '',
		// 그리드 데이터
		ctemGridData: [], // 시공 장비
		rawMaterialGridData: [], // 원재료
		pourPlanGridData: [], // 타설계획서

		//그리드 컬럼
		columns: {
			ctem: [], // 시공 장비
			rawMaterial: [], // 원재료
			pourPlan: [] // 타설계획서
		},

		ctemSheet: null, // 시공 장비
		materialSheet: null, // 원재료
		pourPlanSheet: null, // 타설계획서

		testEquip: {
			clidDevice: { label: '', value: '' }, // 염화물
			tempDevice: { label: '', value: '' }, // 온도
			airDevice: { label: '', value: '' }, // 공기량
			slmpDevice: { label: '', value: '' }, // 슬럼프
			deviceDevice: { label: '', value: '' }, // 측정기
			compDevice: { label: '', value: '' } // 압축강도
		},
		activeTestEquip: 'clidDevice',
		concMritDtlId: '',

		// 타 프로젝트 데이터 가져오기 상단 필터링
		searchObj: {
			projectNm : undefined, // 프로젝트 이름
			projectId : undefined, // 프로젝트 ID
			siteNm : undefined, // 현장 이름
			siteId : undefined, // 현장 ID
			csrtStartDt : undefined, // 공사기간 - 시작
			csrtEndDt : undefined // 공사기간 - 종료
		},
		otherProjectDataColumns: [],
		otherProjectData: [],
		activeOtherProjectField: 'ctem', // 타 프로젝트 데이터 조회 영역 [ctem, rawMaterial, pourPlan]
    write : true,
    unuser : true,
    inUser : '',
    addRowsCount : 1
    }),
    async created () {
      this.inUser = this.$session.get('userInfo').userId
      this.write = this.checkUser(this.inUser,'write')
      this.unuse = this.checkUser(this.inUser,'unuse')
      this.selectEquipPop.columns = EquipmentSelect.options.Cols
      this.pourPlanColumns = ConcreteInfo3.options.Cols
    },
    mounted () {
      this.getAllData() // 전체 정보 조회
    },
    methods: {
      /**
       * 시험빈도 설정 저장
       */
      async saveTestFreq(){
        const payload = { 
                          concMritDtlId: this.concMritDtlId
                        , formDmldYn: this.formDmldYn
                        , compDmldYn: this.compDmldYn
                        , formDmldVal: this.formDmldVal
                        , compDmldVal: this.compDmldVal
                        , pcPcalDmldYn: this.pcPcalDmldYn
                        , pcPcalDmldVal: this.pcPcalDmldVal
                        , siteMstrId : this.$store.getters['auth/getSiteMstrId']
                        }
        try {
          this.confirm('시험빈도 설정을 저장하시겠습니까?', async () => {
            const result =  await API.concrete.saveTestFreq(payload)
            if(result?.json?.rCode === '0000') {
              this.alert('등록되었습니다.')
            }
          })
        } catch (err) {
          console.error('시험빈도 설정 저장에 문제가 발생했습니다.', err)
        }
      },
      /**
       * 시험빈도 설정 조회
       */
      async getTestFreq(){
        const payload = {
          siteMstrId : this.$store.getters['auth/getSiteMstrId']
        }
        try {
          const response = await API.concrete.getTestFreq(payload)
          if(response?.data){
            const {
              formDmldYn,
              formDmldVal,
              compDmldYn,
              compDmldVal,
              pcPcalDmldYn,
              pcPcalDmldVal,
            } = response.data
            this.formDmldYn = formDmldYn,
            this.formDmldVal = formDmldVal,
            this.compDmldYn = compDmldYn,
            this.compDmldVal = compDmldVal,
            this.pcPcalDmldYn = pcPcalDmldYn,
            this.pcPcalDmldVal = pcPcalDmldVal
          }
        } catch (error) {
          console.error('시험빈도 초기 조회 에러: ', error)
        }
      },
      /**
       * 전체 데이터 조회
       */
      async getAllData () {
        await this.getTestEquipList() // 시험장비
        await this.getTestFreq() //시험빈도 설정
        if (this.concMritDtlId) {
          const payload = { concMritDtlId: this.concMritDtlId, siteMstrId : this.$store.getters['auth/getSiteMstrId']}
          Promise.all([
            this.getCtemList(payload), // 시공 장비
            this.getRawMaterialList(payload), // 원재료
            this.getPourPlanList(payload) // 타설계획서
          ])
        }
      },
      /**
       * API: 시험장비 초기 조회
       */
      async getTestEquipList () {
        try {
          let url = '/sendApi/api/concrete/testEquid/listCheck'
          let payload = {
            siteMstrId: this.$store.getters['auth/getSiteMstrId'],
          }

          await sendPostApi(url, payload).then(rst => {
            let response = rst.data
            if(response?.data?.length) {
              const {
                concMritDtlId,
                clidDeviceNum, clidDeviceNm, // 염화물
                tempDeviceNm, tempDeviceNum, // 온도
                airDeviceNm, airDeviceNum, // 공기량
                slmpDeviceNm, slmpDeviceNum, // 슬럼프
                deviceDeviceNm, deviceDeviceNum, // 측정기
                compDeviceNm, compDeviceNum // 압축 강도
              } = response.data[0]

              this.testEquip = {
                clidDevice: { value: clidDeviceNum, label: clidDeviceNm},
                tempDevice: { value: tempDeviceNum, label: tempDeviceNm},
                airDevice: { value: airDeviceNum, label: airDeviceNm},
                slmpDevice: { value: slmpDeviceNum, label: slmpDeviceNm},
                deviceDevice: { value: deviceDeviceNum, label: deviceDeviceNm},
                compDevice: { value: compDeviceNum, label: compDeviceNm}
              }

              this.concMritDtlId = concMritDtlId
            }
          })
          
        } catch (error) {
          console.error('시험장비 초기 조회 에러: ', error)
        }
          },
      /**
       * API: 시공장비 목록 조회
       */
      getCtemList (payload) {
        /** 시공장비 그리드 */
        let options = ConcreteInfo.options
        options.Events = {
          onRenderFirstFinish: async () => {
            try {
              const response = await API.concrete.getCtemList(payload)
              if(response?.data) {
                this.ctemSheet.loadSearchData({
                  data: response.data
                })
                // this.ctemGridData = response.data
              }
            } catch (error) {
              console.error('시공장비 등록 리스트 조회 에러: ', error)
            }
          }
        }
        loader.createSheet({
          el: 'ctemGrid',
          data : [],
          options : options
        }).then(sheet => {
          this.ctemSheet = sheet
        }) 
      },
      /** 시공장비 행 복사 */
      ctemCopyRow(){
        let sheet = this.ctemSheet;
        let checkedRows = [];
        let checkColumn = 'isChecked';
        
        checkedRows = sheet.getRowsByChecked(checkColumn);
        if(checkedRows.length === 0) {
            return this.alert('복사할 행을 선택해주세요.');
        }
        let copiedRows = sheet.copyRows(checkedRows);
        copiedRows.forEach(item => {
            item['isChecked'] = 0;
            sheet.refreshCell(item, checkColumn)
        })          
      },
      /** 시공장비 행 추가 */
      ctemAddRow(){
        this.ctemSheet.getRowsByChecked(ConcreteInfo.options.Cols[0].Name)
        this.ctemSheet.addRows({
            count: this.addRowsCount,
            next: null
            // next: checkedRows.length > 0 ? checkedRows[0].nextSibling : null
        })
      },
      /** 시공장비 행 삭제 */
      ctemDeleteRow(){
        const checkedRows = this.ctemSheet.getRowsByChecked(ConcreteInfo.options.Cols[0].Name)
        if(checkedRows.length === 0) {
            return this.alert('삭제할 행을 선택해주세요.');
        }
        this.ctemSheet.removeRows(checkedRows)
        checkedRows.forEach(item => {
            this.ctemSheet.hideRow({
                row: item,
                del: false,
                norender: false
            })
            item['isChecked'] = 0;
        })
      },
      /** 시공장비 저장 */
      async ctemSave(){
        const checkData = this.ctemSheet.getSaveJson({
          saveMode: 3
        })
        if(checkData.data.length > 0){
          this.confirm('저장하시겠습니까?', async () => {
            try {
              const sheetData = this.ctemSheet.getSaveJson({
                saveMode: 0
              })
              
            const saveData = sheetData?.data.map(item => {
              delete item.id
              delete item.SEQ
              delete item.concMritCtemDtlId
              delete item.isChecked
    
              return {
                ...item,
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                concMritDtlId: this.concMritDtlId,
                STATUS: 'Added',
                status: 'Added'
              }
            })
    
            const payload = {
              concMritDtlId: this.concMritDtlId,
              siteMstrId: this.$store.getters['auth/getSiteMstrId'],
              data: saveData
            }
    
            const result = await API.concrete.updateCtemList(payload)
    
            if(result?.data?.length) {
              this.popAlert = {
                useCancelBtn: false,
                msg: '저장되었습니다.'
              }
            } else {
              this.popAlert = {
                useCancelBtn: false,
                msg: '저장 실패했습니다.'
              }
            }
            this.$bvModal.show('popAlert')
            } catch (error) {
              console.error('시공장비 등록 에러 : %o', error)
              this.alert('저장에 실패하였습니다.')
            }
          })
        } else {
          this.alert('저장할 데이터가 없습니다.')
        }
      },
      /**
       * API: 원재료 목록 조회
       */
      getRawMaterialList (payload) {
        /** 원재료 그리드 */
        let options2 = ConcreteInfo2.options
        options2.Events = {
          onRenderFirstFinish: async () => {
            try {
              const response = await API.concrete.getRawMaterialList(payload)
              if(response?.data) {
                this.materialSheet.loadSearchData({
                  data: response.data
                })
              }
            } catch (error) {
              console.error('원재료 등록 리스트 조회 에러: ', error)
            }
          }
        }
        loader.createSheet({
          el: 'rawMaterialGrid',
          data : [],
          options : options2
        }).then(sheet => {
          this.materialSheet = sheet
        })
      },
      /** 원재료 행 복사 */
      rawMaterialCopyRow(){
        let sheet = this.materialSheet;
        let checkedRows = [];
        let checkColumn = 'isChecked';
        
        checkedRows = sheet.getRowsByChecked(checkColumn);
        if(checkedRows.length === 0) {
            return this.alert('복사할 행을 선택해주세요.');
        }
        let copiedRows = sheet.copyRows(checkedRows);
        copiedRows.forEach(item => {
            item['isChecked'] = 0;
            sheet.refreshCell(item, checkColumn)
        })
      },
      /** 원재료 행 추가 */
      rawMaterialAddRow(){
        this.materialSheet.getRowsByChecked(ConcreteInfo.options.Cols[0].Name)
        this.materialSheet.addRows({
            count: this.addRowsCount,
            next: null
            // next: checkedRows.length > 0 ? checkedRows[0].nextSibling : null
        })
      },
      /** 원재료 행 삭제 */
      rawMaterialDeleteRow(){
        const checkedRows = this.materialSheet.getRowsByChecked(ConcreteInfo.options.Cols[0].Name)
        if(checkedRows.length === 0) {
            return this.alert('삭제할 행을 선택해주세요.');
        }
        this.materialSheet.removeRows(checkedRows)
        checkedRows.forEach(item => {
            this.materialSheet.hideRow({
                row: item,
                del: false,
                norender: false
            })
            item['isChecked'] = 0;
        })
      },
      /** 원재료 저장 */
      rawMaterialSave(){
        const checkData = this.materialSheet.getSaveJson({
          saveMode: 3
        })
        if(checkData.data.length > 0){
           this.confirm('저장하시겠습니까?', async () => {
            try {
              const sheetData = this.materialSheet.getSaveJson({
                saveMode: 0
              })
  
            const saveData = sheetData?.data.map(item => {
              delete item.id
              delete item.SEQ
              delete item.concMritCtemDtlId
              delete item.isChecked
    
              return {
                ...item,
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                concMritDtlId: this.concMritDtlId,
                STATUS: 'Added',
                status: 'Added'
              }
            })
    
            const payload = {
              concMritDtlId: this.concMritDtlId,
              data: saveData
            }
    
            const result = await API.concrete.updateRawMaterialList(payload)
    
            if(result?.data?.length) {
              this.popAlert = {
                useCancelBtn: false,
                msg: '저장되었습니다.'
              }
            } else {
              this.popAlert = {
                useCancelBtn: false,
                msg: '저장 실패했습니다.'
              }
            }
            this.$bvModal.show('popAlert')
            } catch (error) {
              console.error('시공장비 등록 에러 : %o', error)
              this.alert('저장에 실패하였습니다.')
            }
          })
        } else {
         this.alert('저장할 데이터가 없습니다.')
        }
      },
      /**
       * API: 타설계획서 목록 조회
       */
      async getPourPlanList (payload) {
              try {
          const response = await API.concrete.getPourPlanList(payload)
          if(response?.data) {
              this.pourPlanGridData = response.data
          }
        } catch (error) {
          console.error('타설계획서 리스트 조회 에러: ', error)
        }
      },
      /**
       * 시험 장비 선택 모달 오픈
       */
      openTestEquipModal () {
        this.$bvModal.show('testDeviceInfoId')
      },
      /**
       * 시험 장비 저장
       */
      async saveTestEquip (params) {
        let payload = {
          'concMritDtlId' : this.concMritDtlId,
        }

        switch (this.activeTestEquip) {
          case 'clidDevice':
            payload['testEqmtClid'] = params.testDeviceInfoId
            break;
          case 'tempDevice':
            payload['testEqmtTemp'] = params.testDeviceInfoId
            break;
          case 'airDevice':
            payload['testEqmtAir'] = params.testDeviceInfoId
            break;
          case 'slmpDevice':
            payload['testEqmtSlmp'] = params.testDeviceInfoId
            break;
          case 'deviceDevice':
            payload['testEqmtDevice'] = params.testDeviceInfoId
            break;
          case 'compDevice':
            payload['testEqmtComp'] = params.testDeviceInfoId
            break;
        }

        const { deviceNm, testDeviceInfoId } = params
        this.testEquip = {...this.testEquip}
        this.testEquip[this.activeTestEquip] = { label: deviceNm, value: testDeviceInfoId }

        this.$forceUpdate() 

        // 시험 장비 업데이트
        // const { clidDevice, tempDevice, airDevice, slmpDevice, deviceDevice, compDevice } = this.testEquip
        const result = await API.concrete.saveTestEquipList(payload)

        if(result) {
          // await this.getAllData()
        }
      },
      /**
       * 그리드 > 업데이트
       */
      async saveGridData ({ data }, field) {

        try {
          const editedArr = data.map(item => {
            delete item.id
            delete item.SEQ
            delete item.concMritCtemDtlId
            delete item.isChecked

            return {
              ...item,
              concMritDtlId: this.concMritDtlId,
              // concMritDtlId: 'CNMT_0000000001',
              STATUS: 'Added',
              status: 'Added'
            }
          })
          const payload = {
            concMritDtlId: this.concMritDtlId,
            // concMritDtlId: 'CNMT_0000000001',
            data: editedArr
          }
          const sendApi = {
            ctem : async () => await API.concrete.updateCtemList(payload),
            rawMaterial : async () => await API.concrete.updateRawMaterialList(payload),
            pourPlan : async () => await API.concrete.updatePourPlanList(payload)
          }
          const result = await sendApi[field]()
          if(result?.data?.length) {
            this.popAlert = {
              useCancelBtn: false,
              msg: '저장되었습니다.'
            }
          } else {
            this.popAlert = {
              useCancelBtn: false,
              msg: '저장 실패했습니다.'
            }
          }
          this.$bvModal.show('popAlert')

        } catch (error) {
          console.error('원재료 리스트 업데이트 에러: ', error)
          this.failSave()
        }
      },
      /**
       * 저장 실패 (공통)
       */
      failSave () {
        this.popAlert={
          useCancelBtn: false,
          msg: '저장에 실패하였습니다.'
        }
        return this.$bvModal.show('popAlert')
      },

      // ============ 타 프로젝트 선택 ================
      /**
       * 티 프로젝트 데이터 조회
       */
      async getOtherProjectData (payload = this.searchObj) {
        try {
          const field = this.activeOtherProjectField

          payload.concMritDtlId = this.concMritDtlId

          // payload.projectId = this.$cookies.get("projectId")
          // payload.siteId = this.$cookies.get("siteId")

          const ctemPayload = {
            pumpStdr: '',
            pumpUnit: '',
            vbrtStdr: '',
            vbrtUnit: '',
            crProdStdr: '',
            crProdUnit: '',
            etcStdr: '',
            etcUnit: '',
            comment: ''
          }
          const sendApi = {
            ctem: async () => await API.concrete.getOtherCtemList({
              ...ctemPayload, ...payload
              }), // 시공 장비
            rawMaterial : async () => await API.concrete.getOtherRawMaterialList(payload), // 원재료
            pourPlan: async () => await API.concrete.getOtherPourPlanList(payload) // 타설계획서
          }
          const result = await sendApi[field]()

          this.otherProjectData = result?.data ? result.data : []
        } catch (error) {
          console.error ('타 프로젝트 데이터 조회 에러 : ', this.activeOtherProjectField)
        }

      },
      /**
       * 프로젝트 검색 버튼 클릭시 발생 이벤트
       */
      searchOtherProject () {
        this.isOtherProjectModal = true
      },
      /**
       * 타 프로젝트 선택 후 이벤트
       */
      selectOtherProject (params) {

        this.searchObj = {
          projectNm: params.projectNm,
          projectId: params.projectId,
          siteNm: params.siteNm,
          siteId: params.siteId,
          csrtStartDt: params.csrtStartDt,
          csrtEndDt: params.csrtEndDt
        }
        this.searchProjectData()
        // this.$root.$emit('bv::show::modal', 'otherDataPop')
      },
      afterRowDelete (evt) {
        evt.sheet.removeRow(evt.row)
      },
      /**
       * 타 프로젝트 데이터 가져오기 클릭 발생 이벤트
       * @param {String} field [ctem, rawMaterial, pourPlan]
       */
      async openOtherProjectData (field) {
        this.activeOtherProjectField = field
        this.otherProjectDataColumns = this.columns[field].map(col => {
          return {
            ...col,
            CanEdit: !!(col.Name === 'isChecked')
          }
        })
        this.otherProjectData = await this.getOtherProjectData()

        this.isOtherDataModal = true
      },
      /**
       * 타 프로젝트 > 데이터 가져오기
       */
      saveOtherData (data) {
        const gridData = this[this.activeOtherProjectField + 'GridData']
        gridData.concat([...data])
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
      resetProjectCondition () {
              this.searchObj = {
                projectNm : undefined,
                projectId : undefined,
                siteNm : undefined,
                siteId : undefined,
                csrtStartDt : undefined,
                csrtEndDt : undefined
              }
              this.searchProjectData()
      },
      /**
        * 타 프로젝트 데이터 검색
        */
      async searchProjectData (payload = this.searchObj) {
              await this.getOtherProjectData(payload)
      },
    },
}
</script>

<style lang="scss" scoped>
.info-form { margin-top: 30px; }
</style>