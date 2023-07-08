<template>
  <div class="tab_contents">
    <h2 class="sub_title pb20">콘크리트 관리 > 타설관리</h2>
      <div class="lookup_box multi_line">
        <table>
          <caption class="sr_only" />
          <colgroup>
            <col width="5%">
            <col width="22%">
            <col width="5%">
            <col width="22%">
            <col width="5%">
            <col width="22%">
            <col width="*">
          </colgroup>
          <tbody>
            <tr>
              <th>타설번호</th>
              <td>
                <input
                  v-model="mySiteFiltering.docSeq"
                  type="text"
                  class="form_control"
                  placeholder="타설번호를 입력해주세요"
                  maxlength="50"
                  @keyup.enter="searchMySiteData(false)"
                >
              </td>
              <th>공급업체</th>
              <td>
                <select
                  v-model="mySiteFiltering.tradeNm"
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
              <th>진행상태</th>
              <td>
                <select
                  v-model="mySiteFiltering.pourProgress"
                  class="form_control"
                >
                  <option
                    v-for="option in pourProgressOptions"
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
                  @click="searchMySiteData(true)"
                >
                  초기화
                </button>
                <button
                  type="button"
                  class="btn btn_sm btn_darkblue btn_radius btn_search"
                  @click="searchMySiteData(false)"
                >
                  검색
                </button>
              </td>
            </tr>
            <tr>
              <th>배합규격</th>
              <td>
                <select
                  v-model="mySiteFiltering.concMixSd"
                  class="form_control"
                >
                  <option
                    v-for="option in conMixSdOptions"
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
                  v-model="mySiteFiltering.pourOption"
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
              <th>타설일</th>
              <td>
                <DatePickerRange 
                  v-model="mySiteFiltering.pourDt"
                />
              </td>
            </tr>
            <tr>
              <th>구조물명</th>
              <td>
                <input
                  v-model="mySiteFiltering.structure"
                  type="text"
                  class="form_control"
                  placeholder="구조물명을 입력해주세요"
                  maxlength="50"
                  @keyup.enter="searchMySiteData(false)"
                >
              </td>
              <th>타설부위</th>
              <td>
                <input
                  v-model="mySiteFiltering.pourPart"
                  type="text"
                  class="form_control"
                  placeholder="타설부위를 입력해주세요"
                  maxlength="50"
                  @keyup.enter="searchMySiteData(false)"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="inner">
        <sqms-grid
          id="pourManageGrid"
          :data="mySiteGridData"
          :columns="mySiteColumns"
          :inputStyle="{'height':'600px'}"
          :cfg="{
              NoDataMessage : 3,
              NoVScroll: false
          }"
          @dataLoad="mySiteDataLoad"
          @click="clickMySiteGrid"
          :header-checkbox-rowspan="2"
          use-radio
          @init="initSheet"
        >
          <template #button-prefix>
            <button
              type="button"
              class="btn btn_sm btn_darkgray"
              @click="selectConcPourPlan"
            >
              콘크리트 타설계획서
            </button>
            <button
              type="button"
              class="btn btn_sm btn_darkgray"
              @click="selectConcPourPrpt"
            >
              물성시험일지
            </button>
            <button
              type="button"
              class="btn btn_sm btn_darkgray"
              @click="selectConcPourSpcm"
            >
              공시체 확인지
            </button>
            <button
              type="button"
              class="btn btn_sm btn_darkgray"
              @click="selectHome"
            >
              타설관리 대장
            </button>
            <button
              type="button"
              class="btn btn_sm btn_darkgray"
              @click="selectQtrl"
            >
              레미콘 시공 품질 관리 점검표
            </button>
            <button
              type="button"
              class="btn btn_sm btn_darkgray"
              @click="selectConcreteList"
            >
              콘크리트 시험 성과표
            </button>
          </template>
        </sqms-grid>
      </div>
  </div>
</template>

<script>
import API from '@/apis/'
import loader from '@ibsheet/loader'
import _ from 'lodash'
import { ConcretePourstatusAllSite } from '@/pages/common/data/MaterialsList'
import DatePickerRange from '@component/common/DatePickerRange.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { mapGetters } from 'vuex'

let SHEET_ID = '';
export default {
  name: 'PourSetUpDetailPopUp',
	mixins: [MsgBoxMixins],
	components: {
		DatePickerRange
	},
    data() {
		return {
			footerBg: 'transparent',
			currentTab: 0, // 기본 current 값 지정
			tabs: ['My Site', 'All Sites'], // tab name

			// ==== My Site
			mySiteGridData: [],
			mySiteColumns: [],
			mySiteFiltering: {
				docSeq: null, // 타설 번호
				tradeNm: null, // 공급업체
				pourProgress: null, // 진행상태
				concMixSd: null, // 배합규격
				pourOption: null , // 타설옵션
				pourDt : [null, null], 
				structure: null, // 구조물명
				pourPart: null, // 타설부위
        siteMstrId : '',
			},
			spplierOptions: [], // 공급업체 목록
			conMixSdOptions: [], // 배합규격 목록
			pourQntmOptions: [  // 타설옵션 옵션
				{ label: '전체', value: null },
				{ label: '기초', value: 'BASIC' },
				{ label: '벽체', value: 'WALL' },
				{ label: '슬라브', value: 'SLAB' },
				{ label: '벽체&슬라브', value: 'WALL_SLAB' },
				{ label: '버림', value: 'BEOLIM' },
				{ label: '기타', value: 'ETC' }
			],
			pourProgressOptions: [
        { label: '전체', value: null },
				{ label: '타설등록', value: 'REGT' },
				{ label: '타설중', value: 'POURRING' },
				{ label: '타설완료', value: 'POUR_COMPL' },
				{ label: '결재중', value: 'APVL' },
				{ label: '완료', value: 'APRV' }
			],
      pourOptionNm : [
        { label: 'REGT', value: '타설등록' },
				{ label: 'POURRING', value: '타설중' },
				{ label: 'POUR_COMPL', value: '타설완료' },
				{ label: 'APVL', value: '결재중' },
				{ label: 'APRV', value: '완료' }
      ],
      searchObj: { // 타 프로젝트 조회 필터링 정보
          projectNm : undefined, // 프로젝트 명
          projectId : undefined, // 프로젝트 코드
          siteNm : undefined, // 현장 명
          siteCd : undefined, // 현장 코드
          csrtStartDt : undefined, // 공사기간 > 시작
          csrtEndDt : undefined, // 공사기간 > 종료
      },
      gridData: [],
      columns: [],
      isEditing : false,
      sheet: null,
			makeConcMixSd: (id) => {
				if (id.includes('-')) return id
				const result = id.slice(0, 2) + '-' + id.slice(2, -3) + '-' + id.slice(-3)
				return result
			}

			// ==== All Sites
		}
	},
  computed:{
      ...mapGetters({
          'information': 'getInformation'
      })
  },
	async created () {
    this.mySiteFiltering.siteMstrId = this.information.siteMstrId;
		this.mySiteColumns = ConcretePourstatusAllSite.options.Cols
		await this.initMySite() // My Site 초기 조회 세팅
	},
	beforeDestroy() {
		loader.removeSheet(SHEET_ID)
	},
	methods: {

    initSheet (sheet) {
        this.sheet = sheet
    },
		// ============================= My Site =============================
		async initMySite () {
			await this.getPourSelectData() // 공급업체 및 배합규격 조회
			await this.getPourStatusList() // 타설 조회
		},
		/**
		 * API: 타설 옵션 상단 검색 > 공급업체 및 배합규격 조회
		 */
		async getPourSelectData () {
      const payload = {
        siteMstrId : this.information.siteMstrId
      }
			try {
				const response = await API.concrete.getPourSelectData(payload)
				if(response?.data) {
					const all = { label: '전체', value: null }

					const allSupplier = response.data.map(item => {
						return { label: item.tradeNm, value: item.tradeNm, id: item.ptnrId }
					})

					const allConcMixSd = response.data.map(item => {
						return {
							label: this.makeConcMixSd(item.concMixSd),
							value: this.makeConcMixSd(item.concMixSd)
						}
					})

					this.spplierOptions = [all, ..._.uniqBy(allSupplier, 'value')]
					this.conMixSdOptions = [all, ..._.uniqBy(allConcMixSd, 'value')]

				}
			} catch (error) {
				console.error('공급업체 및 배합규격 옵션 조회 에러: ', error)
			}
		},
		/**
		 * API: 타설 목록 조회
		 */
		async getPourStatusList (payload = this.mySiteFiltering) {
      payload['pourStartDt'] = this.mySiteFiltering.pourDt[0]
      payload['pourEndDt'] = this.mySiteFiltering.pourDt[1]
			try {
				const response = await API.concrete.getPourStatusAllSiteList(payload)
				if(response?.data) {
					this.mySiteGridData = response.data.map(row => {
						return {
							...row,
              pourOption: this.pourOptionNm[row.pourOption],
							inDttm: row.inDttm.split('T')[0],
							pourDay: row.pourDay.split('T')[0],
							insertResult: ['REGT', 'POURRING'].includes(row.pourProgress) ? 0 : 1,
              concMixSd: row.concMixSd.replaceAll("-", "")
						}
					})
				} else {
          this.mySiteGridData = []
        }
			} catch (error) {
				console.error('타설 조회 에러: ', error)
			}
		},
		/**
		 * My Site > 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
		 * @param {Boolean} isReset 초기화 버튼 클릭인지?
		 */
		async searchMySiteData (isReset) {
			if (isReset) {
				this. mySiteFiltering = {
					docSeq: null, // 타설 번호
					tradeNm: null, // 공급업체
					concMixSd: null, // 배합규격
					pourOption: null , // 타설옵션
					pourProgress: null, // 진행상태
					pourDt : [null,null],
					structure: null, // 구조물명
					pourPart: null, // 타설부위
          siteMstrId : this.mySiteFiltering.siteMstrId
				}
			}
			return await this.getPourStatusList(this.filtering)

		},
    mySiteDataLoad (evt) {
			const rows = evt?.sheet?.getDataRows()
      const state = {
        REGT: { idx: 1, label: '타설 등록', class: '' },
        POURRING: { idx: 2, label: '타설 중', class: '' },
        POUR_COMPL: { idx: 3, label: '타설 완료', class: '' },
        APVL: { idx: 4, label: '결재 중', class: '' },
        APRV: { idx: 5, label: '완료', class: 'complete' }
      }

      rows.forEach(row => {
        const value = evt.sheet.getRowValue(row)
        row.pourProgress = `
          <div style='width:100%; height:30px' class="guage" >
            <span
              class="bar_wrap"
            >
              <span
                class="bar ${ state[value.pourProgress]?.class}"
                style='height:100%; width: ${20 * state[value.pourProgress]?.idx}%;'
              />
            </span>
            <span
              class="label"
              style="width: ${20 * state[value.pourProgress]?.idx}%;"
            >
              ${state[value.pourProgress]?.label}
            </span>
          </div>
        `
        evt.sheet.setMergeRange(row, 'pourProgress', row, 'case13')
      })
		},
		clickMySiteGrid (evt) {
			if(evt.col === 'insertResult') {
				if (evt.row.insertResult === 0) { // <입력> => 타설 입력 페이지로 이동
					this.$router.push({ 
						name: 'PourSetUpResultWrite',
						params: { concPourDtlId: evt.row.concPourDtlId }
					})
				} else { // <보기> => 타설 상세 페이지로 이동
          
					this.$router.push({
						name: 'PourSetUpResultDetail',
						params: { concPourDtlId: evt.row.concPourDtlId }
					})
				}
			}
		},
    //공시체
    selectConcPourSpcm(){

      const rows = this.sheet.getRowsByChecked('isChecked');

      if(!rows || 0 >= rows.length){
        return this.alert('선택된 행이 없습니다.');
      }
      else{
        const checkRow = rows[0];
        
        // if(checkRow.progress != 'APRV') {
        //   return this.alert('결재완료 처리된 타설만 조회 가능합니다.');
        // }
        let userNm = this.$store.getters['auth/getUserNm']  // 확인자명

        if(this.$store.getters['auth/getSiteMstrId'] == 'STMT_1000000001'){ // 문정동 현장일경우 공란
          userNm = ''  
        }

        let ozReport = {
          concPourDtlId : checkRow.concPourDtlId,
          aprvInfoId : checkRow.aprvInfoId,
          csrtType : checkRow.csrtType,
          src : '',
        }
        // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
        ozReport.src = this.$store.getters['auth/getOzTypeList'][17].jspNm
                      + `&concPourDtlId=` + ozReport.concPourDtlId
                      + `&siteMstrId=` + this.$store.getters['auth/getSiteMstrId'] // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
                      + `&userNm=`+ userNm
        window.open(ozReport.src, '_blank');
      }
    },
    
    //타설 계획서
    selectConcPourPlan(){

      const rows = this.sheet.getRowsByChecked('isChecked');

      if(!rows || 0 >= rows.length){
        return this.alert('선택된 행이 없습니다.');
      }
      else{
        const checkRow = rows[0];
        
        // if(checkRow.progress != 'APRV') {
        //   return this.alert('결재완료 처리된 타설만 조회 가능합니다.');
        // }

        let ozReport = {
          concPourDtlId : checkRow.concPourDtlId,
          aprvInfoId : checkRow.aprvInfoId,
          csrtType : checkRow.csrtType,
          src : '',
        }

        // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
        ozReport.src = this.$store.getters['auth/getOzTypeList'][15].jspNm
                      + `&concPourDtlId=` + ozReport.concPourDtlId
                      + `&siteMstrId=` + this.$store.getters['auth/getSiteMstrId'] // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
        window.open(ozReport.src, '_blank');
      }
    },
    // 공동주택
    selectHome(){
      const rows = this.sheet.getDataRows();

      let ozReport = {
        siteMstrId : rows[0].siteMstrId,
        csrtType : rows[0].csrtType,
        src : '',
      }

      if(ozReport.csrtType === 0){
        // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
        ozReport.src = this.$store.getters['auth/getOzTypeList'][18].jspNm
                      // + `concPourDtlId=` + ozReport.concPourDtlId
                      // + `&aprvInfoId=` + ozReport.aprvInfoId
                      + `&siteMstrId=` + this.$store.getters['auth/getSiteMstrId'] // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
        window.open(ozReport.src, '_blank');
      } else {
        const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
        ozReport.src = this.$store.getters['auth/getOzTypeList'][19].jspNm
                      // + `concPourDtlId=` + ozReport.concPourDtlId
                      // + `&aprvInfoId=` + ozReport.aprvInfoId
                      + `&siteMstrId=` + this.$store.getters['auth/getSiteMstrId'] // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
        window.open(ozReport.src, '_blank');
      }
    },
    //점검표
    selectQtrl(){

      const rows = this.sheet.getRowsByChecked('isChecked');

      if(!rows || 0 >= rows.length){
        return this.alert('선택된 행이 없습니다.');
      }
      else{
        const checkRow = rows[0];
        
        // if(checkRow.progress != 'APRV') {
        //   return this.alert('결재완료 처리된 타설만 조회 가능합니다.');
        // }

        let ozReport = {
          concPourDtlId : checkRow.concPourDtlId,
          aprvInfoId : checkRow.aprvInfoId,
          csrtType : checkRow.csrtType,
          src : '',
        }

        // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
        ozReport.src = this.$store.getters['auth/getOzTypeList'][20].jspNm
                      + `&concPourDtlId=` + ozReport.concPourDtlId
                      + `&siteMstrId=` + this.$store.getters['auth/getSiteMstrId'] // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
        window.open(ozReport.src, '_blank');
      }
    },
    //물성시험일지
    selectConcPourPrpt(){

      const rows = this.sheet.getRowsByChecked('isChecked');

      if(!rows || 0 >= rows.length){
        return this.alert('선택된 행이 없습니다.');
      }
      else{
        const checkRow = rows[0];
        
        // if(checkRow.progress != 'APRV') {
        //   return this.alert('결재완료 처리된 타설만 조회 가능합니다.');
        // }

        let ozReport = {
          concPourDtlId : checkRow.concPourDtlId,
          aprvInfoId : checkRow.aprvInfoId,
          csrtType : checkRow.csrtType,
          src : '',
        }

        // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
        ozReport.src = this.$store.getters['auth/getOzTypeList'][16].jspNm
                      + `&concPourDtlId=` + ozReport.concPourDtlId
                      + `&siteMstrId=` + this.$store.getters['auth/getSiteMstrId'] // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
        window.open(ozReport.src, '_blank');
        
      }
    },
    // 콘크리트 시험 성과표
    selectConcreteList(){
      const rows = this.sheet.getRowsByChecked('isChecked');

      if(!rows || 0 >= rows.length){
        return this.alert('선택된 행이 없습니다.');
      }
      else{
        const checkRow = rows[0];

        let ozReport = {
          concPourDtlId : checkRow.concPourDtlId,
          src : '',
        }
        // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
        ozReport.src = this.$store.getters['auth/getOzTypeList'][21].jspNm
                      + `&concPourDtlId=` + ozReport.concPourDtlId
                      + `&siteMstrId=` + this.$store.getters['auth/getSiteMstrId'] // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
        window.open(ozReport.src, '_blank');
        
      }
    },
	}
}
</script>