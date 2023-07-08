<!--
  * 콘크리트 관리 > 초기 Setting> 타설옵션 페이지
 -->
<template>
  <div>
    <section class="lookup_box multi_line">
      <table>
        <caption class="sr_only" />
        <colgroup>
          <col width="5%">
          <col width="24%">
          <col width="5%">
          <col width="24%">
          <col width="5%">
          <col width="24%">
          <col width="*">
        </colgroup>
        <tbody>
          <tr>
            <th>공급업체</th>
            <td>
              <select
                v-model="filtering.tradeNm"
                class="form_control"
              >
			 	<option value="" > 전체 </option>
                <option
                  v-for="option in categoryData"
                  :key="option.tradeNm"
                  :value="option.tradeNm"
                >
                  {{ option.tradeNm }}
                </option>
              </select>
            </td>
            <th>배합규격</th>
            <td>
              <select
                v-model="filtering.concMixSd"
                class="form_control"
              >
                <option value="" > 전체 </option>
				<option
					v-for="option in categoryData2.filter(item => item.tradeNm === filtering.tradeNm)"
					:key="option.stnd"
					:value="option.stnd"
				>
					{{ option.stnd }}
				</option>
			</select>
			  <!-- <input type="text" v-model="filtering.concMixSd" class="form_control" placeholder="입력해주세요" onKeyup="this.value=this.value.replace(/[^-0-9]/g,'');" maxlength="9" @keyup.enter="searchData(false)"> -->
            </td>
            <th>타설옵션</th>
            <td>
              <select
                v-model="filtering.pourQntm"
                name=""
                id=""
                class="form_control"
              >
                <option
                  v-for="option in pourQntmOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </td>
            <td class="ar">
              <button
                type="button"
                class="btn_reset"
                @click="searchData(true)"
              >
                초기화
              </button>
              <button
                type="button"
                class="btn btn_sm btn_darkblue btn_radius btn_search"
                @click="searchData(false)"
              >
                검색
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <!-- 상단 필터링 영역 -->

    <!-- <section class="inner">
      <sqms-grid
        id="pourOptionSheet"
        :columns="columns"
        :data="gridData"
        :header-checkbox-rowspan="3"
        :storable="isEditing && write"
        :deletable="isEditing && write||unuse"
        :addable="isEditing && write"
        :copyable="isEditing && write"
        :use-checkbox="isEditing"
        :save-mode="3"
        :save-validation="saveGridValid"
        :add-row-data="addRowData"
		:upperStyle="{'height':'calc(100vh - 300px)'}"
		:inputStyle="{'height':'100%'}"
        :cfg="{
          NoVScroll: false,
		  NoDataMessage : 3
        }"
        @save="saveGridData"
        @init="initSheet"
        @afterChange="afterCellChange"
        @rowAdd="rowAdd"
        @click="clickGrid"
		@dataLoad="dataLoad"
        @mouseOver="mouseOverGrid"
        ref="pourOptionRef"
      >
        <template #button-prefix>
          <label
            v-if="isEditing"
            for="UseUnit"
            class="input_check"
          >
            <input
              v-model="useUnit"
              type="checkbox"
              id="UseUnit"
              class="form_control"
			  @click="updateUseUnit"
            >
            <span class="label_text">단위수량 사용</span>
          </label>
		  ※ 단위수량 사용 체크 후 등록한 타설은 물성시험에서 단위수량 시험이 필수입니다.
        </template> -->

        <!-- <template #button-suffix>
          <button
            v-if="isEditing"
            type="button"
            class="btn btn_sm btn_darkgray"
            v-b-modal.ProjectSelect
            @click="openOtherProjectPopup"
          >
            타 프로젝트 불러오기
          </button>
        </template> -->
      <!-- </sqms-grid>
    </section> -->
    <!-- 그리드 영역 -->
	<div class="inner">
		<div class="button_box">
			<button type="button" class="btn btn_sm btn_excel" @click="excelDown">엑셀 다운로드</button>
			<label
				v-if="isEditing"
				for="UseUnit"
				class="input_check"
			>
				
			</label>
			<div class="fr">
				<!-- <button type="button" class="btn btn_sm btn_darkgray" v-b-modal.ProjectLoad2>타 프로젝트 불러오기</button> -->
				<button type="button" class="btn btn_sm btn_darkgray" @click="copyRow" v-if="checkUser(this.inUser,'write')">행 복사</button>
				<div class="btn_number">
					<select
                        v-if="maxAddRowCnt"
						v-model="addRowsCount"
						class="form_control num"
					>
						<option
							v-for="count in maxAddRowCnt"
							:key="count"
							:value="count"
						>
							{{ count }}
						</option>    
					</select>
					<button type="button" class="btn btn_sm" @click="addRow" v-if="checkUser(this.inUser,'write')">행 추가</button>
				</div>
				<button type="button" class="btn btn_sm btn_darkgray" @click="deleteRow" v-if="checkUser(this.inUser,'unuse')">행 삭제</button>
				<button type="button" class="btn btn_sm btn_darkblue" @click="saveBtn" v-if="checkUser(this.inUser,'write')">저장</button>
			</div>
		</div>

		<!-- ibsheet -->
		<div class="ib_wrap">
			<div id="pourOptionSheetTable" class="ibsheet_table" :style="{height:'calc(100vh - 310px)'}"></div>
		</div>
	</div>
    <!-- 팝업 -->
    <!-- 타 프로젝트 불러오기 모달 -->
    <select-other-project-pop-up
      :active="isOtherProjectModal"
      @close="isOtherProjectModal = false"
      :data="[]"
      :columns="columns"
      @select="selectOtherProject"
    />

    <!-- 타 프로젝트 데이터 가져오기 -->
    <select-other-project-data-pop-up
      :active="isOtherDataModal"
      @close="isOtherDataModal = false"
    >
      <template #search>
        <table>
          <caption class="sr_only" />
          <colgroup>
            <col width="5%">
            <col width="20%">
            <col width="5%">
            <col width="15%">
            <col width="5%">
            <col width="15%">
            <col width="5%">
            <col width="15%">
            <col width="*">
          </colgroup>
          <tbody>
            <tr>
              <th>프로젝트명</th>
              <td>
                <div class="search_area">
                  <input
                    v-model="otherDataFiltering.projectNm"
                    type="text"
                    class="form_control w100"
                    placeholder="검색"
                  >
                  <button
                    type="button"
                    class="btn_search"
                  >
                    검색
                  </button>
                </div>
              </td>
              <th>공급업체</th>
              <td>
                <select
                  v-model="otherDataFiltering.tradeNm"
                  class="form_control"
                >
                  <option
                    v-for="option in spplierOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </td>
              <th>배합규격</th>
              <td>
                <select
                  v-model="otherDataFiltering.concMixSd"
                  name=""
                  id=""
                  class="form_control"
                >
                  <option
                    v-for="option in blendStandardOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </td>
              <th>타설옵션</th>
              <td>
                <select
                  v-model="otherDataFiltering.pourQntm"
                  name=""
                  id=""
                  class="form_control"
                >
                  <option
                    v-for="option in pourQntmOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </td>
              <td class="ar">
                <button
                  type="button"
                  class="btn_reset"
                >
                  초기화
                </button>
                <button
                  type="button"
                  class="btn btn_sm btn_darkblue btn_radius btn_search"
                >
                  검색
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </select-other-project-data-pop-up>

    <select-grid-modal
      title="시방배합(배합규격) 선택"
      :active="selectGridModal"
      :columns="specificFomlColumns"
      :data="specificFomlList"
      @close="selectGridModal = false"
      @save="saveSpecificFomlInfo"
    />
  </div>
</template>

<script>
import API from '@/apis/'
import _ from 'lodash'
import loader from '@ibsheet/loader'
import { ConcretePour, ConcreteMix } from '@/pages/common/data/MaterialsList'
import SelectOtherProjectPopUp from './component/SelectOtherProjectPopUp.vue'
import SelectOtherProjectDataPopUp from './component/SelectOtherProjectDataPopUp.vue'
import SelectGridModal from './component/SelectGridModal.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import { sendPostApi, requestOptions } from '../../../apis/common'

export default {
	name: 'PourOptionWriteForm',
	mixins: [MsgBoxMixins, authCheckMixns],
	components: {
		SelectOtherProjectPopUp,
		SelectOtherProjectDataPopUp,
		SelectGridModal
	},
	props: {
		isEditing: { // 편집 가능 모드인지? (초기 Settiing > True, 타설관리 > 타설옵션 선택 > False)
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		projectId: '',
		timer: null,
		sheet: null,
		isOtherProjectModal: false, // 타프로젝트 불러오기 모달 Handler
		isOtherDataModal: false, // 타프로젝트 데이터 가져오기 모달 Handler
		selectGridModal: false, // 그리드 선택 모달 Handler (시방배합 선택)

		useUnit: true,
		useUnitItem: '',
		concMixSdOptionsByConcNm: {}, // 콘크리트 : [배합규격 목록...]
		spplierOptions: [], // 공급업체 옵션
		blendStandardOptions: [], // 배합규격 옵션
		pourQntmOptions: [
			// { label: '전체', value: null },
			// { label: '기초', value: 'BASIC' },
			// { label: '벽체', value: 'WALL' },
			// { label: '슬라브', value: 'SLAB' },
			// { label: '벽체&슬라브', value: 'WALL_SLAB' },
			// { label: '버림', value: 'BEOLIM' },
			// { label: '기타', value: 'ETC' }
		], // 타설옵션 옵션
    	addRowData: { concPoursAmt: 6, pcPcalAirMin : 0, pcPcalAirMax : 0, pcPcalSlmpMin : 0, pcPcalSlmpMax : 0, csTestFreq: 0, prptTestFreq: 0, curing28d: true },

		columns: [], // 그리드 컬럼
		gridData: [], // 그리드 데이터

		loading: {
			isGetPourList: false, // 타설옵션 리스트 조회
			isGetTopOptions: false // 상단 옵션 리스트 조회
		},
		commonParams: {
			// projectId : null,
			// siteId : null,
			siteMstrId : null
		},
		filtering: {// 그리드 상단 필터링
			tradeNm: '', // 공급업체
			concMixSd: '', // 배합규격
			pourQntm: '', // 타설 옵션
			siteMstrId : '',
		},
    	otherDataFiltering: {// 타 프로젝트 데이터 가져오기 > 그리드 상단 필터링
			projectNm: null, // 프로젝트명
			tradeNm: null, // 공급업체
			concMixSd: null, // 배합규격
			pourQntm: '' // 타설 옵션
		},
		specificFomlColumns: [], // 시방배합 컬럼
		specificFomlList: [], // 시방배합 그리드 데이터
		editingRow: null, // 수정 중인 행
		concTypes: {
			NMCONC: '보통 콘크리트',
			LWCONC: '경량 콘크리트',
			PKCONC: '포장 콘크리트',
			HSCONC: '고강도 콘크리트',
			SRCONC: '숏크리트',
			ETC: '기타'
		},
		concCpPrTypes: {
			STDR: '표준(간절기)',
			SMSS: '하절기',
			WTSS: '동절기',
			MALF: 'MAT배합(저발열)',
			ETC: '기타'
		},
		makeConcMixSd: (id) => {
			if (id.includes('-')) return id
			const result = id.slice(0, 2) + '-' + id.slice(2, -3) + '-' + id.slice(-3)
			return result
		},
		down : true,
		unuse : true,
		write : true,
		tooltipBool: true,
		categoryData: [],
		categoryData2: [],
		inUser: '',
		addRowsCount : 1,
		maxAddRowCnt : 10,
		dataLength : 0,
	}),
	async created () {
		this.down = this.checkUser(this.$store.getters['auth/getUserId'],'down')
		this.write = this.checkUser(this.$store.getters['auth/getUserId'],'write')
		this.unuse = this.checkUser(this.$store.getters['auth/getUserId'],'unuse')
		this.inUser = this.$session.get('userInfo').userId
		this.commonParams = {
			siteMstrId : this.$store.getters['auth/getSiteMstrId']
		}
		this.columns = ConcretePour.options.Cols
    	await this.getPourSelectData() // grid 공급업체 및 배합규격 조회
		this.setCategoryList()
		await this.getPourOptionList() // 타설 옵션 리스트를 조회
		this.getSelectPourOptnList() //타설옵션 상단 검색옵션 불러오기
		this.getTestFreq() // 추가정보 물성시험 빈도 압축강도 시험 빈도 불러오기


		this.specificFomlColumns = ConcreteMix.options.Cols.filter(col => col.Name !== 'isCheck')
			.map(item => {
				return {
					...item,
					CanEdit: 0,
				}
			})
		this.specificFomlColumns[0] = { Name: 'tradeNm', Header: [{ Value: '공급업체', RowSpan: 2 }], Width: 100, CanEdit: 0 }
		this.specificFomlColumns.push({ Name: 'ptnrId', Visible : '0'})
		this.specificFomlColumns.push({ Name: 'concMixFileId', Visible : '0'})
	},
	watch:{		
		'useUnit' : function () {
			if(this.useUnit === true){
				this.useUnitItem = 'N'
			} 
			if(this.useUnit === false){
				this.useUnitItem = 'Y'
			}
		},
		'filtering.tradeNm' : {
			handler(){
				this.filtering.concMixSd = ''
			}
		}
	},
	methods: {
		initSheet (sheet) {
			this.sheet = sheet
		},
		/**
		 * 시험빈도 설정 조회
		 */
		async getTestFreq(){
			try {
				const response = await API.concrete.getTestFreq(this.commonParams)
				if(response?.data){
					const {
					compDmldVal,
					pcPcalDmldVal,
					} = response.data
					// this.formDmldYn = formDmldYn,
					// this.formDmldVal = formDmldVal,
					this.addRowData.csTestFreq = compDmldVal
					this.addRowData.prptTestFreq = pcPcalDmldVal
				}
			} catch (error) {
				onsole.error('시험빈도 초기 조회 에러: ', error)
			}
		},
		/**
		 * 그리드 상단 셀렉트 옵션 데이터를 세팅합니다.
		 * 공겁업체, 배합규격
		 */
		setTopFilterOptions (data) {
			const all = { label: '전체', value: null }

			const allSupplier = data.map(item => {
				return { label: item.tradeNm, value: item.tradeNm, id: item.ptnrId }
			})

			const allConcMixSd = data.map(item => {
				return {
					label: this.makeConcMixSd(item.concMixSd),
					value: this.makeConcMixSd(item.concMixSd)
				}
			})

			this.spplierOptions = [all, ..._.uniqBy(allSupplier, 'value')]
			this.blendStandardOptions = [all, ..._.uniqBy(allConcMixSd, 'value')]

			const columns = ConcretePour.options.Cols
			if(columns?.length) {
				// 공급업체 셀렉트 옵션 리스트 세팅
				const tradeNmCol = columns.find(col => col.Name === 'tradeNm')
				const supplierCodes = allSupplier
				const supplierEnum = '|' + _.uniqBy([...supplierCodes], 'id').map(item => item.label).join('|')
				tradeNmCol.EnumKeys = supplierEnum
				tradeNmCol.Enum = supplierEnum
			}

			this.columns = this.isEditing ? columns : columns.map(col => { return { ...col, CanEdit: 0 } })
		},
		/**
		 * API: 타설 옵션 리스트를 조회합니다.
		 */
		async getPourOptionList (payload = this.filtering) {
			let options = ConcretePour.options
			options.Events = {
				onRenderFirstFinish : async () => {
					try {
						const response = await API.concrete.getPourOptionList({
							...payload,
							concMixSd: payload.concMixSd,
							...this.commonParams
						})
						if(response?.data.length > 0) {
							this.dataLength = response.data.length
							this.sheet.loadSearchData({
								data: this.mappingInitGridData(response.data)
							})
							this.useUnit = response.data[0].useUnit === 'Y'? true : false
						} 
					} catch (error) {
						console.error('타설옵션 리스트 조회 에러: ', error)
					}
				},
				onAfterClick: (evt) => {
					this.clickGrid(evt)
				},
				onAfterChange: (evt) => {
					this.afterCellChange(evt)
				},
				onDataLoad: (evt) => {
					this.dataLoad(evt)
				},
				onMouseOver: (evt) => {
					this.mouseOverGrid(evt)
				},
			}
			loader.createSheet({
				el: 'pourOptionSheetTable',
				data : [],
				options : options
			}).then(sheet => {
				this.sheet = sheet
			})
		},
		/** 행복사 이벤트 */
		copyRow(){
			let sheet = this.sheet;
			let checkedRows = [];
			let checkColumn = 'isChecked';
			
			checkedRows = sheet.getRowsByChecked(checkColumn);
			if(checkedRows.length === 0) {
				return this.alert('복사할 행을 선택해주세요.');
			}
			let copiedRows = sheet.copyRows(checkedRows, sheet.getFirstRow());
			copiedRows.forEach(item => {
				item['isChecked'] = 0;
				sheet.refreshCell(item, checkColumn)
				sheet.setAttribute(item, 'tradeNm', 'CanEdit', 1, 1)
				sheet.setAttribute(item, 'pourQntm', 'CanEdit', 1, 1)
			})
		},
		/** 행추가 이벤트 */
		addRow(){
			this.sheet.getRowsByChecked(ConcretePour.options.Cols[0].Name)
			for(let i = 0; i < this.addRowsCount; i++){
				this.sheet.addRow({ next: this.sheet.getFirstRow(), init: this.addRowData})
			}
		},
		/** 행삭제 이벤트 */
		deleteRow(){
			const checkedRows = this.sheet.getRowsByChecked(ConcretePour.options.Cols[0].Name)
			if(checkedRows.length === 0) {
				return this.alert('삭제할 행을 선택해주세요.');
			}
			this.sheet.deleteRows(checkedRows)
			checkedRows.forEach(item => {
				this.sheet.hideRow({
					row: item,
					del: false,
					norender: false
				})
				item['isChecked'] = 0;
			})
		},
		/**
		 * API: 타설 옵션 상단 검색 > 공급업체 및 배합규격 조회
		 */
		async getPourSelectData () {
			try {
				this.loading.isGetTopOptions = true
				const response = await API.concrete.getPourSelectData(this.commonParams)
				if(response?.data) {
					const datas = _.groupBy(response.data, 'tradeNm')
					for (const [key, value] of Object.entries(datas)) {
						this.concMixSdOptionsByConcNm[key] = value.map(item => this.makeConcMixSd(item.concMixSd))
					}
					this.setTopFilterOptions(response.data)
				}
			} catch (error) {
				console.error('공급업체 및 배합규격 옵션 조회 에러: ', error)
			} finally {
				this.loading.isGetTopOptions = false
			}
		},
		/** 공급업체 및 배합규격 셀렉트 옵션 불러오기 */
		async setCategoryList(){
			const param = {
				projectId : this.$session.get('userInfo').projectId,
				siteId :this.$session.get('userInfo').siteId,
				siteMstrId : this.$store.getters['auth/getSiteMstrId']
			}
			try {
				const response = await API.concrete.getSupplierSelectOptView(param)
				if(response?.data){
					this.categoryData = _.uniqBy([...response.data], 'tradeNm')
					this.categoryData2 = response.data
				}
			} catch (error) {
				console.error('공급 업체 조회 에러: ', error)
			}
		},
		/** 타설옵션 셀렉트 옵션 불러오기 */
		async getSelectPourOptnList(){
			requestOptions.headers['Accept-Language'] = "ko";
			requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
					
			let url = '/sendApi/api/common/masterCode/list';
			const payload = {
				groupCode: 'POUR_OPTION',
				useYn : 'USE_YN'
			}
			
			try {
				const response = await sendPostApi(url, payload);
				if (response.status === 200 && response.data) {
				this.setTopFilterPourOptions(response.data.data)
				}
			} catch (error) {
				console.error('타설옵션 종류 불러오기 에러: ',error)
			}
		},
		setTopFilterPourOptions(data) {
			const all = { label : '전체', value: ''}
			const allPourOption = data.map(item => {
				return {
					label: item.codeNameKr,
					value: item.codeVal,
				}
			})
			this.pourQntmOptions = [all, ..._.uniqBy(allPourOption, 'value')]

			const columns = ConcretePour.options.Cols
			if(columns?.length) {
				// 공급업체 셀렉트 옵션 리스트 세팅
				let pourTypeCol = columns.find(col => col.Name === 'pourQntm')
				let pourTypelabel = allPourOption.map(item => item.label)
				let pourTypeCodes = allPourOption.map(item => item.value)
				let pourTypeEnum = '|' + pourTypelabel.join('|')
				let pourTypeEnumKeys = '|' + pourTypeCodes.join('|')
				pourTypeCol.EnumKeys = pourTypeEnumKeys
				pourTypeCol.Enum = pourTypeEnum
			}
		},
		/**
		 * API: 시방배합 조회
		 */
		async getSpecificFomlList (tradeNm) {
			try {
				const response = await API.concrete.getSpecificFomlList({
					projectId: this.$session.get('userInfo').projectId,
					siteId: this.$session.get('userInfo').siteId,
					siteMstrId : this.$store.getters['auth/getSiteMstrId'],
					tradeNm : tradeNm
				})
				if(response?.datas) {
					this.specificFomlList = response.datas.map(row => {
						row.inDttm = row.inDttm.split('T')[0]
						row.upDttm = row.upDttm.split('T')[0]
						return {
							...row,
						}
					})
					// .filter(foml => foml.tradeNm === tradeNm)
						// .map(item => {
						// 	return {
						// 		...item,
						// 		tradeNm: this.findTradeNm(item.ptnrId),
						// 	}
						// })
				}
			} catch (error) {
				console.error('시방배합 옵션 조회 에러: ', error)
			}
		},
		/**
		 * API: 툴팁 > 시방배합 정보 조회
		 */
		async getSpfcPopUpData (payload) {
			try {
				const response = await API.concrete.getSpfcPopUpData(payload)
				if(response?.data) {
					return response.data
				}
			} catch (error) {
				console.error('툴팁 > 시방배합 정보 조회 에러: ', error)
			}
		},
		/**
		 * 초기 그리드 데이터를 가공합니다.
		 */
		mappingInitGridData (data) {
			if(!data) return []
			const mappedData = data.map(row => {
				let inDttm, upDttm
				if(row.inDttm) inDttm = row.inDttm.split('T')[0]
				if(row.upDttm) upDttm = row.upDttm.split('T')[0]
				row.concMixSd = this.makeConcMixSd(row.concMixSd)
				const startUpdateDate = inDttm + (upDttm ? ' ' + '/' + upDttm : '')

				return {
					...row,
					curing7d: row.curing7d == 'Y'? true:false,
					curing28d: row.curing28d == 'Y'? true:false,
					curing91d: row.curing91d == 'Y'? true:false,
					concPoursAmtTip: null,
					startUpdateDate
				}
			})
			return mappedData
		},
		/**
		 * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
		 * @param {Boolean} isReset 초기화 버튼 클릭인지?
		 */
		async searchData (isReset) {
			if (isReset) {
				this.filtering = {
					tradeNm: '', // 공급업체
					concMixSd: '', // 배합규격
					pourQntm: ''
				}
			}

			return await this.getPourOptionList(this.filtering)
		},
		/**
		 * 타 프로젝트 불러오기 버튼 클릭시 발생 이벤트
		 */
		openOtherProjectPopup () {
			// this.$root.$emit('bv::show::modal', 'selectOtherProjectPop')
			// this.$bvModal.show('selectOtherProjectPop')
			this.isOtherProjectModal = true
		},
		/**
		 * 타 프로젝트 선택 후 이벤트
		 */
		selectOtherProject (params) {
			this.otherDataFiltering.projectNm = params.projectNm
			this.selectedProject = params
			this.isOtherDataModal = true
		},
		/**
		 * 그리드 > [저장] 버튼 클릭 시 발생 이벤트
		 */
		async saveBtn () {
			/** 수정 또는 추가 된 데이터가 있는지 확인 */
			const sheetData = this.sheet.getSaveJson({
				saveMode : 2
			})
			if(sheetData.data.length === 0){
				return this.alert('저장할 데이터가 없습니다.')
			}
			/**
			 * 저장전 유효성 체크
			 */
			const valiData = this.sheet.getSaveJson({
				saveMode : 1
			})
			let data = valiData.data
			for(let i = 0; i < data.length; i++) {
				if(!data[i].tradeNm){
					return this.alert(`${i+1} 번째 행의 공급업체를 선택해주세요.`)
				}
				if (!data[i].concMixSd) {
					return this.alert(`${i+1} 번째 행의 배합규격을 선택해주세요.`)

				}
				if (!data[i].pourQntm) {
					return this.alert(`${i+1} 번째 행의 타설옵션을 선택해주세요.`)
				}
			}
			const dupli1 = this.sheet.getRowsByDup("tradeNm,concMixSd,concTypeNm,concCpPrTypeNm,pourQntm", false, false,false, "Deleted")
			if(dupli1.length > 0 ){
				return this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.')
			}
			this.confirm('저장하시겠습니까?', async () => {
				const failSave = () => {
					return this.alert('저장에 실패하였습니다.')
				}
				try {
					let payload = sheetData.data.map(row => {
						delete row.startUpdateDate
						return {
							...row,
							status : row.STATUS,
							siteMstrId : this.$store.getters['auth/getSiteMstrId'],
							curing7d: row.curing7d == 1? 'Y' : 'N',
							curing28d: row.curing28d == 1? 'Y' : 'N',
							curing91d: row.curing91d == 1? 'Y' : 'N',
							concPourOptDtlId: Number(row.concPourOptDtlId),
							ptnrId: this.findPtnrId(row.tradeNm),
						}
					})
					const result = await API.concrete.updatePourOptionList(payload)
	
					if(result?.count > 0) {
						this.alert('저장되었습니다.')
						await this.getPourOptionList()
					} else {
						failSave()
					}
				} catch (error) {
					console.error(error)
					failSave()
				}
			})
		},
		/**
		 * 공급업체명(tradeNm)로 ptnrId를 조회
		 */
		findPtnrId (tradeNm) {
			const data = this.spplierOptions.find(sp => sp.label === tradeNm)
			return data ? data.id : ''
		},
		/**
		 * ptnrId 로 공급업체명(tradeNm)를 조회
		 */
		findTradeNm (ptnrId) {
			const data = this.spplierOptions.find(sp => sp.id === ptnrId)
			return data ? data.label : ''
		},
		/**
		 * row 추가 발생 이벤트
		 */
		rowAdd (evt) {
			const sheet = evt.sheet
			const rowId = evt.row?.id

			sheet.setAttribute(sheet.getRowById(rowId), 'concMixSd', 'Disabled', 1)
		},
		/**
		 * 셀 정보 바뀐 다음 발생 이벤트
		 */
		afterCellChange (evt) {
			// const sheet = evt.sheet
			const rowId = evt.row?.id

			if(evt?.col === 'tradeNm' && rowId) { // 공급업체일 때..
				evt.sheet.setValue(evt.row, 'concMixSd', null)
			}
		},
		/**
		 * 그리드 클릭 이벤트
		 */
		async clickGrid (evt) {
			// evt.sheet.focus(evt.row)
            this.editingRow = evt.row
			// if (!this.isEditing) {
			// 	const selectedRowData = evt.sheet.getRowValue(evt.row)
			// 	return this.$emit('select', selectedRowData)
			// }
			if(evt.kind === 'Data' && evt.col === 'concMixSd' && evt.row.concMixSd === null) {
				if(!evt.row.tradeNm) return this.alert('공급업체를 선택해주세요.')
				await this.getSpecificFomlList(evt.row.tradeNm)
				this.selectGridModal = true
			}
		},
		/**dataLoad */
		dataLoad (evt) {
			let rowData = evt.sheet.getDataRows()
			rowData.forEach(row => {
				evt.sheet.setAttribute(row, 'tradeNm', 'CanEdit', 0, 1)
				evt.sheet.setAttribute(row, 'concMixSd', 'CanEdit', 0, 1)
				evt.sheet.setAttribute(row, 'pourQntm', 'CanEdit', 0, 1)
				evt.sheet.setValue(row, 'edit', '1', 1)
			})

			if(this.tooltipBool) {
				var element = document.getElementsByTagName('body')[0];
				var tooltip = element.appendChild(document.createElement('div'))
				tooltip.classList.add('tooltip_layout');

				this.tooltipBool = false;
			}
		},
		/**
		 * 마우스 오버 이벤트 => 쓰로틀링 적용
		 */
		async mouseOverGrid (evtParam) {
			var row = evtParam.row;
			var tooltip = document.querySelector('.tooltip_layout');
			// console.log(tooltip);
			if(evtParam.col == "concMixSd"){
				if(row != null && row.Kind != "Header"){
					var page_x = evtParam.event.clientX;
					var page_y = evtParam.event.clientY;
					var outline_check = window.innerWidth - tooltip.offsetWidth; // win width - tooltip width
					if(page_x > outline_check) {
						page_x = page_x - tooltip.offsetWidth;
					}
					const rowInfo = evtParam.sheet.getRowValue(evtParam.row)
					if(!rowInfo.concMixSd) return
		
		/*             const result = await this.getSpfcPopUpData({
					ptnrId: rowInfo.ptnrId,
					concMixSd: this.makeConcMixSd(rowInfo.concMixSd),
					concSpfcFomlId: rowInfo.concSpfcFomlId
					}) */
		
					tooltip.classList.add('on');
					tooltip.innerHTML = "<div class='tooltips'>"
						+ "<h3>시방배합 정보"+row.HasIndex+"</h3><ul>"
						+ `<li><span>공급업체</span><strong>${rowInfo.tradeNm}</strong></li>`
						+ `<li><span>배합규격</span><strong>${this.makeConcMixSd(rowInfo.concMixSd)}</strong></li>`
						+ `<li><span>콘크리트의 종류</span><strong>${rowInfo.concTypeNm}</strong></li>`
						+ `<li><span>배합기간별 종류</span><strong>${rowInfo.concCpPrTypeNm}</strong></li>`
						+ "</ul></div>"
					tooltip.style.left = (page_x  + 10) + 'px';
					tooltip.style.top = (page_y + 10) + 'px';
				}
			} else if(evtParam.col == "csTestFreq"){
				if(row != null && row.Kind != "Header"){
					var page_x = evtParam.event.clientX;
					var page_y = evtParam.event.clientY;
					var outline_check = window.innerWidth - tooltip.offsetWidth; // win width - tooltip width
					if(page_x > outline_check) {
						page_x = page_x - tooltip.offsetWidth;
					}
					const rowInfo = evtParam.sheet.getRowValue(evtParam.row)
					if(!rowInfo.csTestFreq) return
		
		/*             const result = await this.getSpfcPopUpData({
					ptnrId: rowInfo.ptnrId,
					concMixSd: this.makeConcMixSd(rowInfo.concMixSd),
					concSpfcFomlId: rowInfo.concSpfcFomlId
					}) */
		
					tooltip.classList.add('on');
					tooltip.innerHTML = "<div class='tooltips'>"
						+ "<h3>추가정보 탭의 시험빈도 설정 값입니다.</h3>"
						+ "</div>"
					tooltip.style.left = (page_x  + 10) + 'px';
					tooltip.style.top = (page_y + 10) + 'px';
				}
			} else if(evtParam.col == "prptTestFreq"){
				if(row != null && row.Kind != "Header"){
					var page_x = evtParam.event.clientX;
					var page_y = evtParam.event.clientY;
					var outline_check = window.innerWidth - tooltip.offsetWidth; // win width - tooltip width
					if(page_x > outline_check) {
						page_x = page_x - tooltip.offsetWidth;
					}
					const rowInfo = evtParam.sheet.getRowValue(evtParam.row)
					if(!rowInfo.prptTestFreq) return
		
		/*             const result = await this.getSpfcPopUpData({
					ptnrId: rowInfo.ptnrId,
					concMixSd: this.makeConcMixSd(rowInfo.concMixSd),
					concSpfcFomlId: rowInfo.concSpfcFomlId
					}) */
		
					tooltip.classList.add('on');
					tooltip.innerHTML = "<div class='tooltips'>"
						+ "<h3>추가정보 탭의 시험빈도 설정 값입니다.</h3>"
						+ "</div>"
					tooltip.style.left = (page_x  + 10) + 'px';
					tooltip.style.top = (page_y + 10) + 'px';
				}
			} else {
				if(tooltip){
					tooltip.classList.remove('on');
				}
			}
		},
		async saveSpecificFomlInfo (param) {
			const concMixsd = this.makeConcMixSd(param.concMixSd)
			let pcComp7d = Number(concMixsd.slice(3,5)) * 0.7
			this.sheet.setValue(this.editingRow, 'concMixSd', concMixsd)
			this.sheet.setValue(this.editingRow, 'concSpfcFomlId', param.concSpfcFomlId)
			this.sheet.setValue(this.editingRow, 'pcPcalSlmpMin', Number(concMixsd.slice(6,9)) - 25)
			this.sheet.setValue(this.editingRow, 'pcPcalSlmpMax', Number(concMixsd.slice(6,9)) + 25)
			if(Number(param.w1) + Number(param.w2) - 20 < 0){
				this.sheet.setValue(this.editingRow, 'pcPcalUnitMin', 0)
			} else {
				this.sheet.setValue(this.editingRow, 'pcPcalUnitMin', Number(param.w1) + Number(param.w2) - 20)
			}
			this.sheet.setValue(this.editingRow, 'pcPcalUnitMax', Number(param.w1) + Number(param.w2) + 20)
			this.sheet.setValue(this.editingRow, 'pcComp7d', pcComp7d.toFixed(2))
			this.sheet.setValue(this.editingRow, 'pcComp28d', concMixsd.slice(3,5))
			this.sheet.setValue(this.editingRow, 'pcComp91d', concMixsd.slice(3,5))
			this.sheet.setValue(this.editingRow, 'pcFormDmldPerp', 5)
			this.sheet.setValue(this.editingRow, 'pcFormDmldHori', 14)
			this.sheet.setValue(this.editingRow, 'pcFormDmldEtc', concMixsd.slice(3,5))
			this.sheet.setValue(this.editingRow, 'crtnFctr', "0.97")
			this.sheet.setValue(this.editingRow, 'concTypeNm', param.concTypeNm)
			this.sheet.setValue(this.editingRow, 'concCpPrTypeNm', param.concCpPrTypeNm)
		},
		updateUseUnit (evt){
			if(this.dataLength === 0) {
				return this.alert('타설옵션 데이터가 있을 때만 적용이 가능합니다.')
			}
			//디폴트값
			evt.target.checked = !evt.target.checked;
			let msg
			if(evt.target.checked === false){
				msg = '단위수량 사용을 적용하시겠습니까?'
			} else {
				msg = '단위수량 사용을 해제하시겠습니까?'
			}
			this.confirm(msg, async () => {
				try {
					const payload = {
						useUnit : this.useUnitItem,
						siteMstrId : this.$store.getters['auth/getSiteMstrId']
					}
					const result = await API.concrete.updatePourUseUnitChange(payload)
					if(result?.count > 0){
						evt.target.checked = !evt.target.checked;
						this.alert('저장되었습니다.')
					} else {
						this.alert('저장에 실패했습니다.')
					}
				} catch (error) {
					console.error('단위수량 사용 업데이트 에러 발생 : ', error)
				}
			})
		},
		/** 엑셀 다운로드 */
		excelDown(){
			this.sheet.down2Excel({
				merge:      1,                  // 머지된 내용 그대로 출력할 것인지
				downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
				reqHeader:  {
								'Authorization': this.$cookies.get('Authorization'),
								'Accept-Language': 'ko'
							},
				fileName:   `타설옵션_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
			})
		},
	}
}
</script>

// <style lang="scss" scoped>
// 	.tooltip-table {
// 		background-color: red;
// 		border-collapse: collapse;
// 		border-spacing: 0;
// 		table-layout: fixed;
// 		th, td { border: 1px solid #ddd; }
// 	}
// </style>