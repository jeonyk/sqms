<!--
  * 콘크리트 관리 > 타설관리
 -->

<template>
  <div class="tab_contents">
    <Breadcrumb :currentPath="$route.fullPath" />
    <div class="lst_tabs">
      <ul class="">
        <li
          v-for="(tab, index) in tabs"
          :class="{active:currentTab===index}"
          :key="index"
        >
          <a
            href="javascript:void(0);"
            @click="currentTab=index"
          >{{ tab }}</a>
        </li>
      </ul>
    </div>

    <section
      class="tab_area"
      v-show="currentTab == 0"
    >
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
                  <option value="">전체</option>
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
                  v-model="mySiteFiltering.concMixSd"
                  class="form_control"
                >
                  <option value="">전체</option>
                  <option
                    v-for="option in categoryData2.filter(item => item.tradeNm === mySiteFiltering.tradeNm)"
                    :key="option.stnd"
                    :value="option.stnd"
                  >
                    {{ option.stnd }}
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
          :sheet="mySiteSheet"
          :cfg="{
              NoDataMessage : 3,
              NoVScroll: false
          }"
          :upperStyle="{'height':'calc(100vh - 370px)'}"
          :inputStyle="{'height':'100%'}"
          @dataLoad="mySiteDataLoad"
          @click="clickMySiteGrid"
          @dbClick="dbClickMySiteGrid"
          @init="initSheet"
          :header-checkbox-rowspan="2"
          use-radio
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
          <template #button-suffix="props">
            <!--<button
              type="button"
              class="btn btn_sm btn_darkgray"
              v-if="unuse"
              @click="deleteRow(props.sheet)"
            >
              삭제
            </button>-->
            <button
              type="button"
              class="btn btn_sm btn_darkgray"
              v-if="write"
              @click="$router.push({ name: 'PourSetUpWrite' })"
            >
              타설등록
            </button>
            <button
              type="button"
              class="btn btn_sm btn_darkblue"
              v-if="write"
              @click="activeApproveBtn(props.sheet)"
            >
              결재상신
            </button>
          </template>
        </sqms-grid>
      </div>
    </section>
    <!-- My Site -->

    <section
      class="tab_area"
      v-show="currentTab == 1"
    >
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
                  <DatePickerRange
                    ref="datapickerPopupRange"
                    v-model="searchObj.allSitePourDt"
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

      <div class="inner">
          <sqms-grid
              id="pourSetUpViewSheet"
              :columns="columns"
              :data="gridData"
              :upperStyle="{'height':'calc(100vh - 320px)'}"
              :inputStyle="{'height':'100%'}"
              @click="selectRow"
              @init="sheet => { sheet = sheet }"
              :cfg="{
                  NoVScroll: false
              }"
          />
      </div>      
    </section>

    <Approve
        ref-id="ApproveModalPourSetUpView"
        :code-type="approve.codeType"
        :code-dtl-type="approve.codeDtlType"
        :doc-seq="approve.docSeq"
        :doc-name="approve.docName"
        :doc-type="approve.docType"
        :main-code-id="approve.mainCodeId"
        :mid-code-id="approve.midCodeId"
        :request-id="approve.requestId"
        :file-type="approve.fileType"
        :site-mstr-id="approve.siteMstrId"
        @callback="fn_setSourceApproval"
        alertable
    />
  </div>
</template>
<script>
import API from '@/apis/'
import loader from '@ibsheet/loader'
import _ from 'lodash'
import { ConcretePourstatus, ConcretePourstatus2 } from '@/pages/common/data/MaterialsList'
import DatePickerRange from '@component/common/DatePickerRange.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import Approve from '@modal/approval/Approve.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
import { sendPostApi, requestOptions } from '../../../apis/common';
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

let SHEET_ID = '';

export default {
	name: 'PourSetUpSheet',
	mixins: [MsgBoxMixins, authCheckMixns],
	components: {
    Breadcrumb,
		DatePickerRange,
    Approve
	},
	data() {
		return {
			footerBg: 'transparent',
			currentTab: 0, // 기본 current 값 지정
			tabs: ['My Site', 'All Sites'], // tab name
      approve: {},  // 결재상신 정보
			// ==== My Site
      sheet : null,
      mySiteSheet : [],
			mySiteGridData: [],
			mySiteColumns: [],
			mySiteFiltering: {
				docSeq: null, // 타설 번호
				tradeNm: '', // 공급업체
				pourProgress: '', // 진행상태
				concMixSd: '', // 배합규격
				pourOption: '' , // 타설옵션
				pourStartDt: null, // 타설일 > 시작
				pourEndDt: null, // 타설일 > 끝
				structure: null, // 구조물명
				pourPart: null, // 타설부위
        pourDt: [null,null],
        siteMstrId : null
			},
			spplierOptions: [], // 공급업체 목록
			conMixSdOptions: [], // 배합규격 목록
			pourQntmOptions: [  // 타설옵션 옵션
				// { label: '전체', value: null },
				// { label: '기초', value: 'BASIC' },
				// { label: '벽체', value: 'WALL' },
				// { label: '슬라브', value: 'SLAB' },
				// { label: '벽체&슬라브', value: 'WALL_SLAB' },
				// { label: '버림', value: 'BEOLIM' },
				// { label: '기타', value: 'ETC' }
			],
			pourProgressOptions: [
				// { label: '타설등록', value: 'REGT' },
				// { label: '타설중', value: 'POURRING' },
				// { label: '타설완료', value: 'POUR_COMPL' },
				// { label: '결재중', value: 'APVL' },
				// { label: '완료', value: 'APRV' }
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
          allSitePourDt : [null,null]
      },
      gridData: [],
      columns: [],
      isEditing : false,
			makeConcMixSd: (id) => {
				if (id.includes('-')) return id
				const result = id.slice(0, 2) + '-' + id.slice(2, -3) + '-' + id.slice(-3)
				return result
			},
      userId : '',
      unuse : false,
      write : false,
      categoryData : [],
      categoryData2 : [],
			// ==== All Sites
		}
	},
  watch : {
    'mySiteFiltering.tradeNm' : {
      handler(){
        this.mySiteFiltering.concMixSd = ''
      }
    }
  },
	mounted() {
    this.userId = this.$store.getters['auth/getUserId']
    this.unuse = this.checkUser(this.userId,'unuse')
    this.write = this.checkUser(this.userId,'write')
		this.mySiteColumns = ConcretePourstatus.options.Cols
    this.columns = this.isEditing ? ConcretePourstatus2.options.Cols : ConcretePourstatus2.options.Cols.map(col => { return { ...col, CanEdit: 0 }})
    
    // mySiteFiltering.pourProgress
    if (this.$route.params.pourProgress){
        this.mySiteFiltering.pourProgress = this.$route.params.pourProgress
    }

    Promise.all([
      this.setCategoryList(),
      this.getPourStatusList(),
      this.searchProject(),
      this.getSelectPourOptnList(),
      this.getPourProgressList()
    ])
	},
	beforeDestroy() {
		loader.removeSheet(SHEET_ID)
	},
  activated(){
        // keepAlive 재조회 처리
        if(this.$store.getters['tabInfo/getSavePage'].length > 0){
            
            //keepAlive 재조회 처리
            let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
            let url="/sendApi/api/programMngt/menuChildProgram/list"
            let reSearch = false;
            let param = {"menuMngtId":menuid}; 
            
            // sdave정보가 있는지 체크하여 처리
            sendPostApi(url, param).then((result) => {
                // 하부 페이지 정보
                for (let i = 0; i < result.data.dlprogram.length ; i++){
                    // 저장 페이지 정보와 비교
                    for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                        if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                            this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);

                            reSearch = true;
                            break;
                        }
                    }

                    if(reSearch){
                        break;
                    }
                }

                if(reSearch){
                    this.getPourStatusList();
                }

            }).catch((e) => {
                // console.log(e);
                return e.response;
            });
        }
    },
	  methods: {
      initSheet (sheet) {
          this.sheet = sheet
      },
    /**
		 * API: 타설 옵션 상단 검색 > 공급업체 및 배합규격 조회
		 */
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
				console.error('콘크리트 종류 불러오기 에러: ',error)
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
		},
    /** 진행상태 셀렉트 옵션 불러오기 */
    async getPourProgressList(){
      requestOptions.headers['Accept-Language'] = "ko";
			requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
					
			let url = '/sendApi/api/common/masterCode/list';
			const payload = {
				groupCode: 'PROGRESS',
				useYn : 'USE_YN'
			}
			
			try {
				const response = await sendPostApi(url, payload);
				if (response.status === 200 && response.data) {
				this.setTopFilterPourProgressOptions(response.data.data)
				}
			} catch (error) {
				console.error('진행상태 종류 불러오기 에러: ',error)
			}
    },
    setTopFilterPourProgressOptions(data){
      const all = { label : '전체', value: ''}
			const allPourProgress = data.map(item => {
				return {
					label: item.codeNameKr,
					value: item.codeVal,
				}
			})
			this.pourProgressOptions = [all, ..._.uniqBy(allPourProgress, 'value')]
    },
		/**
		 * API: 타설 목록 조회
		 */
		async getPourStatusList (payload = this.mySiteFiltering) {
      payload['pourStartDt'] = this.mySiteFiltering.pourDt[0]
      payload['pourEndDt'] = this.mySiteFiltering.pourDt[1]
      payload['siteMstrId'] = this.$store.getters['auth/getSiteMstrId']
      // console.log('payload : %o ', payload)
			try {
				const response = await API.concrete.getPourStatusList(payload)
				if(response?.data.length > 0) {
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
        console.log( 'error : ', error)
			}
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
		/**
		 * My Site > 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
		 * @param {Boolean} isReset 초기화 버튼 클릭인지?
		 */
		async searchMySiteData (isReset) {
			if (isReset) {
				this. mySiteFiltering = {
					docSeq: null, // 타설 번호
					tradeNm: '', // 공급업체
					concMixSd: '', // 배합규격
					pourOption: '' , // 타설옵션
					pourProgress: '', // 진행상태
					pourStartDt: null, // 타설일 > 시작
					pourEndDt: null, // 타설일 > 끝
					structure: null, // 구조물명
					pourPart: null, // 타설부위
          pourDt : [null,null]
				}
			}
			return await this.getPourStatusList(this.filtering)

		},
		clickMySiteGrid (evt) {
			if(evt.col === 'insertResult') {
        // if (evt.row.insertResult === 0) { // <입력> => 타설 입력 페이지로 이동
        this.$router.push({ 
          name: 'PourSetUpView',
          params: { concPourDtlId: evt.row.concPourDtlId }
        });
				// } else { // <보기> => 타설 상세 페이지로 이동
          
				// 	this.$router.push({
				// 		name: 'PourSetUpResultDetail',
				// 		params: { concPourDtlId: evt.row.concPourDtlId }
				// 	})
				// }
			}
		},
    dbClickMySiteGrid (evt) {
      // if (evt.row.insertResult === 0) { // <입력> => 타설 입력 페이지로 이동
      this.$router.push({ 
        name: 'PourSetUpView',
        params: { concPourDtlId: evt.row.concPourDtlId }
      });
      // } else { // <보기> => 타설 상세 페이지로 이동
        
      // 	this.$router.push({
      // 		name: 'PourSetUpResultDetail',
      // 		params: { concPourDtlId: evt.row.concPourDtlId }
      // 	})
      // }
    },
		/**
		 * 타설 삭제
		 */
		deleteRow (sheet) {
			const checkedRows = sheet.getRowsByChecked('isChecked')

			if(0 >= checkedRows.length){
        return this.alert('선택된 행이 없습니다.')
      } 

			const rowData = sheet.getRowValue(checkedRows[0])

			if(rowData.progress === 'POUR_COMPL' || rowData.progress === 'APVL' || rowData.progress === 'APRV') {
        return this.alert('타설완료 및 결재 처리된 타설은\n삭제할 수 없습니다.')
      }

			this.confirm ('삭제하시겠습니까?', async () => {
				try {
					if (!rowData) return this.alert('삭제에 실패했습니다.')

					const result = await API.concrete.deletePourStatusList({
						concPourDtlId: rowData.concPourDtlId
					})

					if(result?.json?.rCode === '0000') {
						this.alert('삭제되었습니다', () => {
              return this.getPourStatusList();
            });
					} else {
						let failMsg = result?.json?.rMsg ? result.json.rMsg : '삭제에 실패했습니다.'
						return this.alert(failMsg)
					}
				} catch (err) {
					console.error(err)
					return this.alert('삭제에 실패했습니다.')
				}
			})

		},
		// ===================================================================
    /**
     * 프로젝트 검색
     */
    async searchProject (payload = this.searchObj) {
      payload['csrtStartDt'] = this.searchObj.allSitePourDt[0]
      payload['csrtEndDt'] = this.searchObj.allSitePourDt[1]
        await this.getOtherProjectList(payload)
    },
    async getOtherProjectList(payload) {
        try {
        // const projectId = this.$cookies.get("projectId")
        const siteId = this.$cookies.get("siteId")
        const siteMstrId = this.$store.getters['auth/getSiteMstrId']

        const response = await API.concrete.getOtherProjectList({
            ...payload,
        })
        if(response?.datas) {
            this.gridData = response.datas?.resultList

        }

        } catch (error) {
        console.error('프로젝트 리스트 조회 에러: ', error)
        }
    },
    /**
     * row 클릭 이벤트
     */
    selectRow(evt){
        this.$store.dispatch('setInformation', {
            siteMstrId: evt.row.siteMstrId,
        })

        window.open(this.$router.resolve({name: 'PourSetUpDetailPopUp' }).href , '_blank' )

        
        // this.$store.dispatch('setInformation', {
        //     siteMstrId: evt.row.siteMstrId,
        // })
        // let blankTemp = this.$router.resolve({
        //     name : 'PourSetUpDetailPopUp',
        // });
        // window.open(blankTemp.href,'');
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
          allSitePourDt : [null,null]
      }
      this.searchProject()
    },
    async activeApproveBtn(sheet){
      const checkedRows = sheet.getRowsByChecked('isChecked')  // 선택한 건

      if(!checkedRows || !checkedRows[0]){
        this.alert('선택된 행이 없습니다.');
        return;
      }

      if(checkedRows[0].progress != 'POUR_COMPL'){   // 타설 완료가 아닌경우
        if(checkedRows[0].progress == 'APVL'){  // 결재상태 확인
          return this.alert('결재 중인 문서입니다.');
        }
        else if(checkedRows[0].progress == 'APRV'){
          return this.alert('결재 완료된 문서입니다.');
        }
        else{
          this.alert('완료되지 않은 타설입니다.')
          return;
        }
      }  

      this.approve = {
        requestId : checkedRows[0].concPourDtlId,
        fileType : 'ConcreteMngt',
        siteMstrId : checkedRows[0].siteMstrId,
        mainCodeId : '',
        midCodeId : '',
        codeType : 'CCRT',
        codeDtlType : 'CONC', 
        docSeq : checkedRows[0].docSeq,
        docName :"구조물별 콘크리트 타설 관리대장",   // 임시
        docType : "CCRT"
      }

      this.$bvModal.show('ApproveModalPourSetUpView')
    },

    async fn_setSourceApproval(obj){
      let payload = {
        'concPourDtlId' : this.approve.requestId ,   // 타설 ID
        'aprvInfoId' : obj.aprvInfoId ,              // 결재 ID
        // docSeq : obj.docSeq,                    // 문서 번호 
        'pourProgress' : 'APVL'                      // 결재중
      }

      try {
        const response = await API.concrete.concretePourProgressChange(payload)
        if(response.resultCode == '0000'){
              this.alert('결재가 상신되었습니다.',()=>{
                this.getPourStatusList()
                this.$bvModal.hide('ApproveModalPourSetUpView');
              });
          } else {
            return this.alert('결재 상신에 실패했습니다.')
          }
          
      } catch (error) {
        console.error('타설 결재상신 수정 오류: ', error)
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
        
/*         if(checkRow.progress != 'APRV') {
          return this.alert('결재완료 처리된 타설만 조회 가능합니다.');
        } */

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
        
/*         if(checkRow.progress != 'APRV') {
          return this.alert('결재완료 처리된 타설만 조회 가능합니다.');
        } */

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

      const rows = this.sheet.getRowsByChecked('isChecked');

      if(!rows || 0 >= rows.length){
        return this.alert('선택된 행이 없습니다.');
      }
      else{
        const checkRow = rows[0];

        let ozReport = {
          siteMstrId : checkRow.siteMstrId,
          concPourDtlId : checkRow.concPourDtlId,
          csrtType : checkRow.csrtType,
          src : '',
        }
        if(ozReport.csrtType === 0){
          // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
          ozReport.src = this.$store.getters['auth/getOzTypeList'][18].jspNm
                        + `&concPourDtlId=` + ozReport.concPourDtlId
                        // + `&aprvInfoId=` + ozReport.aprvInfoId
                        + `&siteMstrId=` + ozReport.siteMstrId // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
          window.open(ozReport.src, '_blank');
        } else {
          // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
          ozReport.src = this.$store.getters['auth/getOzTypeList'][19].jspNm
                        + `&concPourDtlId=` + ozReport.concPourDtlId
                        // + `&aprvInfoId=` + ozReport.aprvInfoId
                        + `&siteMstrId=` + ozReport.siteMstrId // 2번째 파라미터 존재시 앞에 &붙인후 전달 파라미터 담기
          window.open(ozReport.src, '_blank');
        }
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
        // console.log(ozReport)
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
