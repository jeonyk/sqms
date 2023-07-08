<!--
  * 콘크리트 관리 > 타설관리 > 결과 입력 > 기본/시험 정보관리
 -->
<template>
<div>
  <div
    class="fr"        
  >
    <button
      type="button"
      class="btn btn_md btn_outline btn_darkgray"
      v-if="isEditable"
      @click="saveData"
    >
      저장
    </button>
  </div>
  <div
    class="lst_data"
    v-if="data"
  >
    <div class="data_tit">
      1. 타설등록 정보
    </div>
    <div class="table_normal_list">
      <table>
        <caption class="sr_only" />
        <colgroup>
          <col width="15%">
          <col width="*">
          <col width="15%">
          <col width="*">
          <col width="15%">
          <col width="*">
        </colgroup>
        <tbody>
          <tr>
            <th>타설일(예정)</th>
            <td v-if="pourInfo.pourProgress === 'POURRING' || pourInfo.pourProgress === 'REGT'">
              <DatePicker v-model="pourInfo.pourDay" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
            <td v-else>{{pourInfo.pourDay}}</td>
            <th>타설방법</th>
            <td>
              <input
                v-model="pourInfo.pourProcess"
                type="text"
                class="form_control"
                :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
                :maxLength="50"
              >
            </td>
            <th>협력업체</th>
            <td>
              <div class="search_area" v-if="pourInfo.pourProgress != 'POUR_COMPL' || pourInfo.pourProgress != 'APVL' || pourInfo.pourProgress != 'APRV'">
                <input
                  v-model="pourInfo.materialNm"
                  type="text"
                  class="form_control"
                  :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
                  readonly
                  @click="() => {
                    $root.$emit('bv::show::modal', 'PartnerCompanySearch');
                  }"
                >
                <button
                  type="button"
                  class="btn_search"
                  :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
                  @click="() => {
                    $root.$emit('bv::show::modal', 'PartnerCompanySearch');
                  }"
                >
                  검색
                </button>
              </div>
              <div class="search_area" v-else>
                {{ pourInfo.materialNm }}
              </div>
            </td>
          </tr>
          <tr>
            <th>구조물</th>
            <td>
              <input
                v-model="pourInfo.structure"
                type="text"
                class="form_control"
               :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
               :maxLength="50"
              >
            </td>
            <th>타설부위</th>
            <td>
              <input
                v-model="pourInfo.pourPart"
                type="text"
                class="form_control"
                :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
                :maxLength="50"
              >
            </td>
            <th>타설물량(예정) ㎥</th>
            <!-- <td>{{ pourInfo.pourSupply }}</td> -->
            <td>
              <input 
                v-model="pourInfo.pourSupply"
                type="text"
                class="form_control"
                :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
                maxLength="4"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="data_tit">
      2. 시험장비
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
            <td>{{ testEquipLabels.clidDevice }}</td>
            <td>{{ testEquipLabels.tempDevice }}</td>
            <td>{{ testEquipLabels.airDevice }}</td>
            <td>{{ testEquipLabels.slmpDevice }}</td>
            <td>{{ testEquipLabels.deviceDevice }}</td>
            <td>{{ testEquipLabels.compDevice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table_normal_list mt10">
      <table>
        <caption class="sr_only" />
        <colgroup>
          <col width="15%">
          <col width="*">
          <col width="15%">
          <col width="*">
          <col width="15%">
          <col width="*">
        </colgroup>
        <tbody>
          <tr>
            <th><span>시공장비</span></th>
            <td>
            TYPE{{ cmcdTypeNum }}
            </td>
            <th><span>원재료</span></th>
            <td>
            TYPE{{ cmpdTypeNum }}
            </td>
            <th><span>타설계획서 정보</span></th>
            <td>
            TYPE{{ cmrdTypeNum }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="data_tit">
      시공장비 정보
    </div>
    <div class="ib_wrap">
        <div id="pourInfoTable1" class="ibsheet_table" :style="{height: 'calc(100vh - 350px)'}"></div>
    </div>

    <div class="data_tit">
      원재료 정보
    </div>
    <div class="ib_wrap">
        <div id="pourInfoTable2" class="ibsheet_table" :style="{height: 'calc(100vh - 350px)'}"></div>
    </div>
    
    <div class="data_tit">
      타설계획서 정보
    </div>
    <div class="ib_wrap">
        <div id="pourInfoTable3" class="ibsheet_table" :style="{height: 'calc(100vh - 350px)'}"></div>
    </div>

    <div class="data_tit">
      3. 시방배합 & 타설옵션
    </div>
    <div class="table_normal_list">
      <table>
        <caption class="sr_only" />
        <colgroup>
          <col width="15%">
          <col width="*">
          <col width="15%">
          <col width="*">
        </colgroup>
        <tbody>
          <tr>
            <th>공급업체</th>
            <td>
              {{ pourInfo.tradeNm }}
            </td>
            <th>콘크리트 종류</th>
            <td>{{ concTypes[pourInfo.concType] }}</td>
          </tr>
          <tr>
            <th>배합규격</th>
            <td>
              {{ pourInfo.concMixSd }}
            </td>
            <th>배합 기간별 종류</th>
            <td>{{ concCpPrTypes[pourInfo.concCpPrType] }}</td>
          </tr>
          <tr>
            <th>타설옵션</th>
            <td>
              {{ pourInfo.pourOptionNm }}
            </td>
            <th>압축강도 시험빈도</th>
            <td>{{ pourInfo.testCompStrgFreq }}</td>
          </tr>
          <tr>
            <th>압축강도 시험체크</th>
            <td>
              <label class="input_check">
                <input
                  id="input_check1"
                  type="checkbox"
                  class="form_control"
                  v-model="testCompStrgChk7d"
                  :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
                  
                />
                <span class="label_text">7일</span>
              </label>
              <label class="input_check">
                <input
                  id="input_check2"
                  type="checkbox"
                  class="form_control"
                  v-model="testCompStrgChk28d"
                  :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
                  
                />
                <span class="label_text">28일</span>
              </label>
              <label class="input_check">
                <input
                  id="input_check3"
                  type="checkbox"
                  class="form_control"
                  v-model="testCompStrgChk91d"
                  :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false"
                  
                />
                <span class="label_text">91일</span>
              </label>
            </td>
            <th>물성 시험빈도</th>
            <td>{{ pourInfo.pcalFreq }}</td>
          </tr>
        </tbody>
      </table>
      <div class="data_tit">
        4. 거푸집 및 동바리 해체강도 시험일정 세팅
      </div>
      <div
        class="table_normal_list table_write"
        style="position: relative;"
      >
        <table>
          <caption class="sr_only" />
          <colgroup>
            <col width="*">
            <col width="*">
            <col width="*">
          </colgroup>
          <thead>
            <tr>
              <th>수직부재 시험체크</th>
              <th>수평부재 시험체크</th>
              <th>Filler Support <br>시험 체크</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  v-model="pourInfo.verticalMaterialChk"
                  class="form_control"
                >
                  <!-- :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false" -->
                  <option :value="null">
                    N/A
                  </option>
                  <option
                    v-for="freq in 28"
                    :key="freq"
                    :value="freq"
                  >
                    {{ freq }}일
                  </option>
                </select>
              </td>
              <td>
                <select
                  v-model="pourInfo.horizontalMaterialChk"
                  class="form_control"
                >
                  <!-- :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false" -->
                  <option :value="null">
                    N/A
                  </option>
                  <option
                    v-for="freq in 28"
                    :key="freq"
                    :value="freq"
                  >
                    {{ freq }}일
                  </option>
                </select>
              </td>
              <td>
                <select
                  v-model="pourInfo.fillerSupportMaterialChk"
                  class="form_control"
                >
                  <!-- :disabled="pourInfo.pourProgress === 'POUR_COMPL'? true:false || pourInfo.pourProgress === 'APVL'? true:false || pourInfo.pourProgress === 'APRV'? true:false" -->
                  <option :value="null">
                    N/A
                  </option>
                  <option
                    v-for="freq in 28"
                    :key="freq"
                    :value="freq"
                  >
                    {{ freq }}일
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- 협력사 선택 모달 -->
  <pour-partner-company-search @fn-company-choice="selectPartnerCompany" />
</div>
</template>

<script>
import API from '@/apis/'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import PourPartnerCompanySearch from '@/pages/common/popup/PourPartnerCompanySearch.vue'
import DatePicker from '@component/common/DatePicker.vue'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import { PourConcreteInfo, PourConcreteInfo2, PourConcreteInfo3 } from '@/pages/common/data/MaterialsList'
import _ from 'lodash'
import loader from '@ibsheet/loader'

export default {
	name: 'PourSetUpManageDefaultForm',
  mixins : [MsgBoxMixins, authCheckMixns],
  components : {
      DatePicker,
      PourPartnerCompanySearch,
  },
	props: {
		data: {
			type: Object,
			default: {}
		},
    isEditable : {
      type : Boolean,
      default : true
    },
    change: { // 편집 가능한 지?
      type: Boolean,
      default: false
    },
    unuse: { // 편집 가능한 지?
      type: Boolean,
      default: false
    },
    down: { // 편집 가능한 지?
      type: Boolean,
      default: false
    },
	},
	data: () => ({
		concPourDtlId: '',
		pourOption: {
			BASIC: '기초',
			WALL: '벽체',
			SLAB: '슬라브',
			WALL_SLAB: '벽체&슬라브',
			BEOLIM: '버림',
			ETC: '기타'
		},
		concTypes: {
			NMCONC: '보통 콘크리트',
			LWCONC: '경량 콘크리트',
			PKCONC: '포장 콘크리트',
			HSCONC: '고강도 콘크리트',
			SRCONC: '숏크리트',
			ETC: '기타'
		},
    concCpPrTypes : { //배합기간별 종류
      STDR: '표준(간절기)',
      SMSS: '하절기',
      WTSS: '동절기',
      MALF: 'MAT배합(저발열)',
      ETC: '기타'
    },
		testEquipLabels: { // 시험장비 이름
			clidDevice: '', // 염화물
			tempDevice: '', // 온도
			airDevice: '', // 공기량
			slmpDevice: '', // 슬럼프
			deviceDevice: '', // 측정기
			compDevice: '' // 압축강도
		},
    pourInfo : {},
		ctemOptions: [], // 시험장비 > 시공장비 목록
		rawMaterialOptions: [], // 시험장비 > 원재료 목록
		pourPlanOptions: [], // 시험장비 > 타설 계획서 목록
    selectPartnerModalView: false, // 협력사 선택 모달 Handler
    material : '',
		partnerName : '',
    isDisabled: false,
    cmcdTypeNum : '',
    cmpdTypeNum : '',
    cmrdTypeNum : '',
    testCompStrgChk7d : true,
    testCompStrgChk28d :  true,
    testCompStrgChk91d : true,
    sheetCtemInfo : null,
    sheetRwmtInfo : null,
    sheetPrpnInfo : null,
    concMritCtemDtlId : '',
    concMritRwmtDtlId : '',
    concMritPrpnDtlId : '',
	}),
	mounted () {
    this.getPourStatusView();
    this.getMritCtemDtlInfo(this.concMritCtemDtlId)
    this.getMritRwmtDtlInfo(this.concMritRwmtDtlId)
    this.getMritPrpnDtlInfo(this.concMritPrpnDtlId)
	},
  watch : {
    'pourInfo.pourSupply' : {
      handler(val) {
        this.pourInfo.pourSupply = Number(String(val).replace(/[^0-9]/g, ''));
      }
    },
  },
	methods: {

    /** 타설관리 상세 조회 */
    getPourStatusView(){
      this.pourInfo = {...this.data};
      this.concMritCtemDtlId = this.data.concMritCtemDtlId
      this.concMritRwmtDtlId = this.data.concMritRwmtDtlId
      this.concMritPrpnDtlId = this.data.concMritPrpnDtlId
      this.testEquipLabels.clidDevice = this.pourInfo.clidDeviceNm // 염화물
      this.testEquipLabels.tempDevice = this.pourInfo.tempDeviceNm // 온도
      this.testEquipLabels.airDevice = this.pourInfo.airDeviceNm // 공기량
      this.testEquipLabels.slmpDevice = this.pourInfo.slmpDeviceNm // 슬럼프
      this.testEquipLabels.deviceDevice = this.pourInfo.deviceDeviceNm // 측정기
      this.testEquipLabels.compDevice = this.pourInfo.compDeviceNm // 압축강도
      this.cmcdTypeNum = this.pourInfo.cmcdTypeNum
      this.cmpdTypeNum = this.pourInfo.cmpdTypeNum
      this.cmrdTypeNum = this.pourInfo.cmrdTypeNum
      this.testCompStrgChk7d = this.pourInfo.testCompStrgChk7d === 'Y' ? true : false
      this.testCompStrgChk28d = this.pourInfo.testCompStrgChk28d === 'Y' ? true : false
      this.testCompStrgChk91d = this.pourInfo.testCompStrgChk91d === 'Y' ? true : false
/*       const payload = {
        concPourDtlId : this.concPourDtlId
      } */


/*       try {
        const result = await API.concrete.getPourStatusView(payload)
        console.log('result : ',);
        if(result?.data) {
          console.log('getPourStatusView : ', result.data);
          const resultData = {...result.data}
          // 시험장비 이름
					this.testEquipLabels.clidDevice = resultData.clidDeviceNm // 염화물
					this.testEquipLabels.tempDevice = resultData.tempDeviceNm // 온도
					this.testEquipLabels.airDevice = resultData.airDeviceNm // 공기량
					this.testEquipLabels.slmpDevice = resultData.slmpDeviceNm // 슬럼프
					this.testEquipLabels.deviceDevice = resultData.deviceDeviceNm // 측정기
					this.testEquipLabels.compDevice = resultData.compDeviceNm // 압축강도
          this.cmcdTypeNum = resultData.cmcdTypeNum
          this.cmpdTypeNum = resultData.cmpdTypeNum
          this.cmrdTypeNum = resultData.cmrdTypeNum
          this.testCompStrgChk7d = resultData.testCompStrgChk7d === 'Y' ? true : false
          this.testCompStrgChk28d = resultData.testCompStrgChk28d === 'Y' ? true : false
          this.testCompStrgChk91d = resultData.testCompStrgChk91d === 'Y' ? true : false
				}
      } catch (error) {
        console.error('타설관리 상세 조회 에러: ', error)
      } */
    },

    /**
     * API: 시공장비 정보 조회
     */
    async getMritCtemDtlInfo (param) {
      let options = PourConcreteInfo.options
      options.Events = {
        onRenderFirstFinish: async () => {
          const payload = {
            concMritCtemDtlId : param
          }
          try {
            const response = await API.concrete.getMritCtemDtlInfo(payload)
            if(response?.data){
              response.data['typeNum'] = 'TYPE'+response.data.typeNum;
              this.sheetCtemInfo.loadSearchData({
                data: [response.data]
              })
            }
          } catch (error) {
            console.error('시공장비 정보 조회 에러', error)
          }
        }
      }
      loader.createSheet({
        el: 'pourInfoTable1',
        data : [],
        options : options
      }).then(sheet => {
        this.sheetCtemInfo = sheet
      })
    },
    /**
     * API: 원재료 정보 조회
     */
    async getMritRwmtDtlInfo (param) {
      let options = PourConcreteInfo2.options
      options.Events = {
        onRenderFirstFinish: async () => {
          const payload = {
            concMritRwmtDtlId : param
          }
          try {
            const response = await API.concrete.getMritRwmtDtlInfo(payload)
            if(response?.data){
              response.data['typeNum'] = 'TYPE'+response.data.typeNum;
              this.sheetRwmtInfo.loadSearchData({
                data: [response.data]
              })
            }
          } catch (error) {
            console.error('시공장비 정보 조회 에러', error)
          }
        }
      }
      loader.createSheet({
        el: 'pourInfoTable2',
        data : [],
        options : options
      }).then(sheet => {
        this.sheetRwmtInfo = sheet
      })
      
    },

    /**
     * API: 타설계획서 정보 조회
     */
    async getMritPrpnDtlInfo (param) {
      let options = PourConcreteInfo3.options
      options.Events = {
        onRenderFirstFinish: async () => {
          const payload = {
            concMritPrpnDtlId : param
          }
          try {
            const response = await API.concrete.getMritPrpnDtlInfo(payload)
            if(response?.data){
              response.data['typeNum'] = 'TYPE'+response.data.typeNum;
              this.sheetPrpnInfo.loadSearchData({
                data: [response.data]
              })
            }
          } catch (error) {
            console.error('시공장비 정보 조회 에러', error)
          }
        }
      }
      loader.createSheet({
        el: 'pourInfoTable3',
        data : [],
        options : options
      }).then(sheet => {
        this.sheetPrpnInfo = sheet
      })
    },

		/**
     * API: 시공장비 목록 조회
     */
		async getCtemList (payload) {
			try {
				const response = await API.concrete.getCtemList(payload)
				if(response?.data) {
					this.ctemOptions = response.data.map((item, index) => {
						return { label: 'TYPE' + (index + 1), value: item.concMritCtemDtlId}
					})
				}
			} catch (error) {
				console.error('시공장비 등록 리스트 조회 에러: ', error)
			}
        },
		/**
     * API: 원재료 목록 조회
     */
		async getRawMaterialList (payload) {
			try {
				const response = await API.concrete.getRawMaterialList(payload)
				if(response?.data) {
					this.rawMaterialOptions = response.data.map((item, index) => {
						return { label: 'TYPE' + (index + 1), value: item.concMritRwmtDtlId}
					})
				}
			} catch (error) {
				console.error('원재료 등록 리스트 조회 에러: ', error)
			}
        },
		/**
         * API: 타설계획서 목록 조회
         */
		async getPourPlanList (payload) {
            try {
				const response = await API.concrete.getPourPlanList(payload)
				if(response?.data) {
                    this.pourPlanOptions = response.data.map((item, index) => {
						return { label: 'TYPE' + (index + 1), value: item.concMritPrpnDtlId}
					})
                }
			} catch (error) {
				console.error('타설계획서 리스트 조회 에러: ', error)
			}
        },
		/**
		 * 리스트에서 id와 동일한 친구를 찾아 그 친구의 label을 리턴합니다.
		 * @param {Array} options 
		 * @param {String} id 
		 * @param {String} key id로 설정할 key
		 */
		findLabelById (options, id, key = 'value') {
			const item = options.find(item => item[key] === id)
			return item ? item.label : ''
		},
    /**
		 * 협력업체 선택
		 */
		selectPartnerCompany (param) {
			this.pourInfo.materialNm = param.tradeNm
			this.pourInfo.partnerName = param.tradeNm
			this.pourInfo.material = param.tradeId
		},
    async saveData(){
      this.pourInfo.testCompStrgChk7d = this.testCompStrgChk7d === true? 'Y' : 'N'
      this.pourInfo.testCompStrgChk28d = this.testCompStrgChk28d === true? 'Y' : 'N'
      this.pourInfo.testCompStrgChk91d = this.testCompStrgChk91d === true? 'Y' : 'N'

      if(this.pourInfo.pourProcess === ''){
        return this.alert('타설방법을 입력해주세요.');
      } 
      if(this.pourInfo.material === '' && this.data.partnerName === ''){
        return this.alert('협력업체 선택해주세요.');
      }
      if(this.pourInfo.structure === ''){
        return this.alert('구조물을 입력해주세요.');
      }
      if(this.pourInfo.pourPart === ''){
        return this.alert('타설부위를 입력해주세요.');
      }
      if(this.pourInfo.pourSupply === ''){
        return this.alert('타설물량를 입력해주세요.');
      }
      if(this.pourInfo.testCompStrgChk7d === 'N' && this.pourInfo.testCompStrgChk28d === 'N' && this.pourInfo.testCompStrgChk91d === 'N'){
        return this.alert('타설 옵션에서 표준(양생) 압축강도 시험 체크를 설정해주세요.');
      }
      
        const payload = {
          ...this.pourInfo,
        }
      try {
          this.confirm('저장하시겠습니까?', async ()=> {
          const result = await API.concrete.updatePourDetail(payload)
          if(result.count > 0){
            this.alert('저장되었습니다.', async () => {
              this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
              this.$parent.getPourStatusView(0);
            })
          }else{
            this.alert('수정에 실패했습니다.')
          }
        })
      } catch (error) {
        console.error('수정에 실패했습니다.', error)
      }
    },
	}
}
 </script>

 <style lang="scss" scoped>

 </style>