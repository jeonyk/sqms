<!--
  * 콘크리트 관리 > 타설관리
 -->

<template>
    <div class="tab_contents">
      <div class="inner type2">
        <h2 class="sub_title">
          타설등록
          <div class="fr">
            <button
              type="button"
              class="btn btn_md btn_outline btn_darkgray"
              @click="saveData"
            >
              등록
            </button>
            <button
              type="button"
              class="btn btn_md btn_outline btn_darkgray"
              @click="routeToList"
            >
            목록
          </button>
          </div>
        </h2>
        <!-- <div class="data_num">
          <table>
            <caption class="sr_only" />
            <colgroup>
              <col width="86">
              <col width="*">
            </colgroup>
            <tbody>
              <tr>
                <th>시험번호</th>
                <td>WA2101-공통-공장검사-2021–2187</td>
              </tr>
            </tbody>
          </table>
        </div> -->
        <section class="lst_data">
          <div class="data_tit">
            1. 타설등록 정보
          </div>
          <div class="table_normal_list table_write">
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
                  <th><span class="emp_red">타설일(예정)</span></th>
                  <td>
                    <DatePicker v-model="pourInfo.pourDay" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                  </td>
                  <th><span class="emp_red">타설방법</span></th>
                  <td>
                    <input
                      v-model="pourInfo.pourProcess"
                      type="text"
                      class="form_control"
                      :maxlength="50"
                      placeholder="입력해주세요."
                    >
                  </td>
                  <th><span class="emp_red">시공협력업체</span></th>
                  <td>
                    <div class="search_area">
                      <input
                        v-model="pourInfo.partnerName"
                        type="text"
                        class="form_control"
                        placeholder="선택해주세요."
                        readonly
                        @click="() => {
                          $root.$emit('bv::show::modal', 'PartnerCompanySearch');
                        }"
                      >
                      <button
                        type="button"
                        class="btn_search"
                        v-b-modal.PartnersSearch
                        @click="() => {
                          $root.$emit('bv::show::modal', 'PartnerCompanySearch');
                        }"
                      >
                        검색
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th><span class="emp_red">구조물</span></th>
                  <td>
                    <input
                      v-model="pourInfo.structure"
                      type="text"
                      class="form_control"
                      :maxlength="50"
                      placeholder="입력해주세요"
                    >
                  </td>
                  <th><span class="emp_red">타설부위</span></th>
                  <td>
                    <input
                      v-model="pourInfo.pourPart"
                      type="text"
                      class="form_control"
                      :maxlength="50"
                      placeholder="입력해주세요"
                    >
                  </td>
                  <th><span class="emp_red">타설물량(예정) ㎥</span></th>
                  <td>
                    <input
                      v-model="pourInfo.pourSupply"
                      type="text"
                      maxlength="4"
                      class="form_control"
                      placeholder="입력해주세요"
                    >
                      <!-- :min="0"
                      :max="10000"
                      @keydown="e => {
                        const invalid = ['i','+','e','-']
                        if(invalid.includes(e.key)) e.preventDefault()
                      }" -->
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
                  <th><span class="emp_red">염화물</span></th>
                  <th><span class="emp_red">온도</span></th>
                  <th><span class="emp_red">공기량</span></th>
                  <th><span class="emp_red">슬럼프 또는 슬럼프 플로</span></th>
                  <th><span class="emp_red">측정기</span></th>
                  <th><span class="emp_red">압축강도</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    v-for="key in Object.keys(testInfo.testEquip)"
                    :key="key"
                  >
                    <div class="search_area">
                      <p class="txt_area" @click="popUpOpenBtn(activeTestEquip = key)">
                        {{ testInfo.testEquip[key].label }}
                      </p>
                      <button
                        type="button"
                        class="btn_search"
                        @click="popUpOpenBtn(activeTestEquip = key)"
                      >
                        검색
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table_normal_list table_write mt10">
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
                  <th><span class="emp_red">시공장비</span></th>
                  <td>
                    <select
                      v-model="testInfo.concMritCtemDtlId"
                      class="form_control"
                    >
                      <option
                        v-for="option in ctemOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </td>
                  <th><span class="emp_red">원재료</span></th>
                  <td>
                    <select
                      v-model="testInfo.concMritRwmtDtlId"
                      class="form_control"
                    >
                      <option
                        v-for="option in rawMaterialOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </td>
                  <th><span class="emp_red">타설계획서 정보</span></th>
                  <td>
                    <select
                      v-model="testInfo.concMritPrpnDtlId"
                      class="form_control"
                    >
                      <option
                        v-for="option in pourPlanOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="data_tit">
            시공장비 정보
          </div>
          <div class="ib_wrap">
              <div id="pourInfoCtemTable" class="ibsheet_table" :style="{height: 'calc(100vh - 350px)'}"></div>
          </div>

          <div class="data_tit">
            원재료 정보
          </div>
          <div class="ib_wrap">
              <div id="pourInfoRwmtTable" class="ibsheet_table" :style="{height: 'calc(100vh - 350px)'}"></div>
          </div>
          
          <div class="data_tit">
            타설계획서 정보
          </div>
          <div class="ib_wrap">
              <div id="pourInfoPrpnTable" class="ibsheet_table" :style="{height: 'calc(100vh - 350px)'}"></div>
          </div>

          <div class="data_tit">
            3. 시방배합 & 타설옵션
          </div>
          <div
            class="table_normal_list table_write"
            style="position: relative;"
          >
            <div class="fr">
              <button
                type="button"
                class="btn btn_sm btn_darkgray"
                style="position: absolute; top:-40px; right: 0; margin-bottom: 5px;"
                @click="openPourOptionModal "
              >
                타설옵션 선택
              </button>
            </div>
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
                  <th><span>공급업체</span></th>
                  <td>
                    {{ specificInfo.tradeNm || specificInfo.ptnrId || '타설옵션을 선택하세요.' }}
                  </td>
                  <th>콘크리트 종류</th>
                  <td>{{ specificInfo.concMixSd ? concTypes[specificInfo.concType] : '타설옵션을 선택하세요.' }}</td>
                </tr>
                <tr>
                  <th><span>배합규격</span></th>
                  <td>
                    {{ specificInfo.concMixSd || '타설옵션을 선택하세요.' }}
                  </td>
                  <th><span>배합 기간별 종류</span></th>
                  <td>
                    {{ specificInfo.concMixSd ? concCpPrTypes[specificInfo.concCpPrType] : '타설옵션을 선택하세요.' }}
                  </td>
                </tr>
                <tr>
                  <th><span>타설옵션</span></th>
                  <td>
                    {{ specificInfo.concMixSd ? pourOption[specificInfo.pourOption] : '타설옵션을 선택하세요.' }}
                  </td>
                  <th>압축강도 시험빈도</th>
                  <td>{{ specificInfo.concMixSd ? specificInfo.testCompStrgFreq : '타설옵션을 선택하세요.' }}</td>
                  <!-- <th><span>레미콘당 타설량</span></th>
                  <td>
                    {{ specificInfo.concMixSd ? specificInfo.concPoursAmt : '타설옵션을 선택하세요.' }}
                  </td> -->
                </tr>
                <tr>
                  <th>압축강도 시험체크</th>
                  <td>
                    <label
                      class="input_check"
                      v-for="k in Object.keys(specificInfo.compStrengthCheck)"
                      :key="k"
                    >
                      <input
                        v-model="specificInfo.compStrengthCheck[k]"
                        type="checkbox"
                        class="form_control"
                      >
                      <span class="label_text">{{
                        {
                          "testCompStrgChk7d": '7일',
                          "testCompStrgChk28d": '28일',
                          "testCompStrgChk91d": '91일'
                        }[k]
                      }}</span>
                    </label>
                  </td>
                  <th>물성시험빈도</th>
                  <td>{{ specificInfo.concMixSd ? specificInfo.pcalFreq : '타설옵션을 선택하세요.' }}</td>  
                </tr>
              </tbody>
            </table>
          </div>
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
                  <th>Filler Support 시험 체크</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      v-model="specificInfo.verticalMaterialChk"
                      class="form_control"
                    >
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
                      v-model="specificInfo.horizontalMaterialChk"
                      class="form_control"
                    >
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
                      v-model="specificInfo.fillerSupportMaterialChk"
                      class="form_control"
                    >
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
        </section>
      </div>
    <!-- 모달 -->
    <!-- 협력사 선택 모달 -->
    <pour-partner-company-search @fn-company-choice="selectPartnerCompany" />
    <!-- 시험장비 선택 팝업 -->
    <select-test-equip-modal
      :id="'pourSetUpWriteId'"
      :remain="3"
      status="Y"
      :init-device-name="testInfo.testEquip[activeTestEquip].label"
      @save="saveTestEquip"
    />
    <!-- 타설 옵션 선택 모달 -->
    <!-- <select-pour-option-list-modal
      :active="selectPourOptionModal"
      @save="savePourOption"
      @close="selectPourOptionModal = false"
    /> -->
    <b-modal 
      id="pop_concrete_option" 
      title="타설옵션 선택"
      size="xxl"
      scrollable
    >
      <!-- modal-class="single_page"  -->
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="5%">
                                <col width="24%">
                                <col width="7%">
                                <col width="24%">
                                <col width="5%">
                                <col width="24%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>공급업체</th>   
                                    <!-- <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="popUp.tradeNm" @keyup.enter="popUpSearch(false)"></td> -->
                                    <td>
                                        <select
                                          v-model="popUp.tradeNm"
                                          class="form_control"
                                          @change="fn_optionSelect('tradeNm')"
                                        >
                                          <option value=""> 전체 </option>
                                          <option
                                          v-for="option in categoryData"
                                          :key="option.tradeNm"
                                          :value="option.tradeNm"
                                          >
                                            {{ option.tradeNm }}
                                          </option>
                                        </select>
                                    </td>
                                    <th>배합기간별종류</th>
                                    <td>
                                        <select v-model="popUp.concCpPrType" id="" class="form_control" @change="fn_optionSelect('concCpPrType')">
                                            <option 
                                                v-for="option in concMixSdOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >
                                            {{ option.label }}
                                            </option>
                                        </select>
                                    </td>
                                    <th>배합규격</th>
                                    <!-- <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="popUp.concMixSd" @keyup.enter="popUpSearch(false)"></td> -->
                                    <!-- <td>
                                      <select
                                          v-model="popUp.concMixSd"
                                          class="form_control"
                                        >
                                          <option value=""> 전체 </option>
                                          <option
                                            v-for="option in categoryData2.filter(item => item.tradeNm === popUp.tradeNm)"
                                            :key="option.stnd"
                                            :value="option.stnd"
                                          >
                                            {{ option.stnd }}
                                          </option>
                                        </select>
                                    </td> -->
                                    <td>
                                      <select
                                          v-model="popUp.concMixSd"
                                          class="form_control"
                                          :disabled="popUp.tradeNm == '' || popUp.concCpPrType == '' ? true:false"
                                        >
                                          <option value=""> 전체 </option>
                                          <option
                                            v-for="option in concMixSdList"
                                            :key="option.concMixSd"
                                            :value="option.concMixSd"
                                          >
                                            {{ option.concMixSd }}
                                          </option>
                                        </select>
                                    </td>
                                    <!-- <th>타설옵션</th>
                                    <td>
                                      <select
                                        v-model="popUp.pourQntm"
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
                                    </td> -->
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="popUpSearch(true)">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="popUpSearch(false)">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 320px)'}">
                        <div id="popUpPourOption" class="ibsheet_table" style="height: 100%"></div>
                    </div>
                </div>
            </div>
        </template>
        <template #modal-footer>
            <b-button class="btn btn_lg btn_outline btn_darkgray" @click="selectPouOption">선택</b-button>
            <b-button class="btn btn_lg btn_outline btn_gray" @click="closePourOptionBtn">닫기</b-button>
        </template>
      </b-modal>
    </div>
</template>

<script>
import API from '@/apis/'
import DatePicker from '@component/common/DatePicker.vue'
import PourPartnerCompanySearch from '@/pages/common/popup/PourPartnerCompanySearch.vue'
import SelectTestEquipModal from './component/SelectTestEquipModal.vue'
import SelectPourOptionListModal from './component/SelectPourOptionListModal.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { ConcretePourPopUp, PourConcreteInfo, PourConcreteInfo2, PourConcreteInfo3 } from '@/pages/common/data/MaterialsList'
import loader from '@ibsheet/loader'
import { sendPostApi, requestOptions } from '../../../apis/common'
import { commonFn } from '@/script/commonFn.js';

export default {
	name: 'PourSetUpWrite',
	mixins: [MsgBoxMixins],
	components: {
		DatePicker,
		PourPartnerCompanySearch,
		SelectTestEquipModal,
		SelectPourOptionListModal
	},
	data() {
		return {
			selectPartnerModalView: false, // 협력사 선택 모달 Handler
			selectPourOptionModal: false, // 타설옵션 선택 모달 Handler
			activeTestEquip: 'clidDevice', // active 시험장비 영역
			ctemOptions: [], // 시험장비 > 시공장비 옵션 목록
			rawMaterialOptions: [], // 시험장비 > 원재료 옵션 목록
			pourPlanOptions: [], // 시험장비 > 타설 계획서 옵션 목록

			// form > 타설등록 정보
			pourInfo: {
				pourDay: null, // 타설일*
				pourProcess: '펌프카 타설', // 타설방법*
				material: null, // 시공협력업체*
				structure: '', // 구조물*
				partnerName: '', // 시공, 자재업체 이름
				pourPart: '', // 타설부위*
				pourSupply: 0, // 타설 용량*
        siteMstrId : '',
			},

			// form > 시험장비
			testInfo: {
				testEquip: {
					clidDevice: { label: '', value: '' }, // 염화물*
					tempDevice: { label: '', value: '' }, // 온도*
					airDevice: { label: '', value: '' }, // 공기량*
					slmpDevice: { label: '', value: '' }, // 슬럼프*
					deviceDevice: { label: '', value: '' }, // 측정기*
					compDevice: { label: '', value: '' } // 압축강도*
				},
				concMritDtlId: null, // 시험 장비 ID
				concMritCtemDtlId: null, // 시공장비*
				concMritRwmtDtlId: null, // 원재료*
				concMritPrpnDtlId: null // 타설계획서 정보*
			},

			// form > 시방배합 & 타설옵션
			specificInfo: {
				ptnrId: null, // 공급업체*
				tradeNm: null,
				concSpfcFomlId: null, // 시방배합*
				concMixSd: null, // 배합규격
        concCpPrType : null,
				pourOption: null, // 타설옵션*
				testFormStrgChk: null, // 물성강도 시험체크
				concType: 'NMCONC', // 콘크리트 종류
				pcalFreq: null, // 물성시험빈도
				testCompStrgFreq: null, // 압축강도 시험빈도
				compStrengthCheck: { // 압축강도 시험체크
					testCompStrgChk7d: false,
					testCompStrgChk28d: false,
					testCompStrgChk91d: false
				},
        verticalMaterialChk: null, // 수직부재 시험 체크 String(this.specificInfo.testFormStrgChk)
        horizontalMaterialChk : null, //수평부재 시험체크
        fillerSupportMaterialChk : null,
			},
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
      selectPourOption : { //선택한 타설옵션
        pcFormDmldPerp : null,
        pcFormDmldHori : null,
        pcFormDmldEtc : null,
        pcComp7d : null,
        pcComp28d : null,
        pcComp91d : null,
        curing7d : null,
        curing28d : null,
        curing91d : null,
        ags : null,
        useUnit : null,
      },
      makeConcMixSd: (id) => {
          if (id.includes('-')) return id
          const result = id.slice(0, 2) + '-' + id.slice(2, -3) + '-' + id.slice(-3)
          return result
      },
      popUp : {
        tradeNm : '',
        concMixSd : '',
        pourQntm : '',
        siteMstrId : '',
        concCpPrType : '',
      },
      siteMstrId : '',
      pourQntmOptions: [  // 타설옵션 옵션
				// { label: '전체', value: '' },
				// { label: '기초', value: 'BASIC' },
				// { label: '벽체', value: 'WALL' },
				// { label: '슬라브', value: 'SLAB' },
				// { label: '벽체&슬라브', value: 'WALL_SLAB' },
				// { label: '버림', value: 'BEOLIM' },
				// { label: '기타', value: 'ETC' }
			],
      sheet : null,
      tooltipBool: true,
      sheetCtemInfo : null,
      sheetRwmtInfo : null,
      sheetPrpnInfo : null,
      categoryData : [],
      categoryData2 : [],
      concMixSdOptions : [],
      concMixSdList : [], //배합규격 select box 
		}
	},
  watch : {
    'pourInfo.pourSupply' : {
      handler(val) {
        this.pourInfo.pourSupply = Number(String(val).replace(/[^0-9]/g, ''));
      }
    },
    'testInfo.concMritCtemDtlId' : {
      handler(val){
        this.getMritCtemDtlInfo(val)
      }
    },
    'testInfo.concMritRwmtDtlId' : {
      handler(val){
        this.getMritRwmtDtlInfo(val)
      }
    },
    'testInfo.concMritPrpnDtlId' : {
      handler(val){
        this.getMritPrpnDtlInfo(val)
      }
    },
    'popUp.tradeNm' : {
      handler(){
        this.popUp.concMixSd = ''
      }
    }
  },
  mounted(){
    this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
    this.popUp.siteMstrId = this.$store.getters['auth/getSiteMstrId']
    this.pourInfo.siteMstrId = this.$store.getters['auth/getSiteMstrId']
		this.getTestEquipList() // 시험장비 조회
    this.getMritCtemDtlInfo(this.testInfo.concMritCtemDtlId)
    this.getMritRwmtDtlInfo(this.testInfo.concMritRwmtDtlId)
    this.getMritPrpnDtlInfo(this.testInfo.concMritPrpnDtlId)
    this.setCategoryList()
    this.getSelectPourOptnCategory()
    this.getSelectPourOptnList()
    this.setConcreteMixCategory()
  },
	methods: {
    
/*     compStrengChk(param){
      if(!param || param) return !param || param
    }, */
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
					// this.categoryData2 = response.data
				}
			} catch (error) {
				console.error('공급 업체 조회 에러: ', error)
			}
		},
    fn_optionSelect(key){
      if(key == 'tradeNm'){
        this.popUp.concMixSd = ''
      }
      else if(key == 'concCpPrType'){
        this.popUp.concMixSd = ''
      }

      if(this.popUp.tradeNm != '' && this.popUp.concCpPrType != ''){
          let concMixSdList = [];
          let checkList = [];
          this.categoryData2.forEach(item => {
            if(item.tradeNm == this.popUp.tradeNm && this.popUp.concCpPrType && item.concCpPrType){
              if(!checkList.includes(item.concMixSd)){
                checkList.push(item.concMixSd);
                concMixSdList.push(item);
              }
            }
          });
          this.concMixSdList = concMixSdList;
      }
      else{
        this.popUp.concMixSd = '';
      }
    },
    /** 타설옵션 선택 배합규격 불러오기 */
    async getSelectPourOptnCategory (){
      const payload = {
        siteMstrId : this.$store.getters['auth/getSiteMstrId']
      }
      try {
        const response = await API.concrete.getSelectPourOptnCategory(payload)
        if(response?.data.length > 0){
          this.categoryData2 = response.data;
        }
      } catch (error) {
        console.log('배합규격 조회 에러 :', error)
      }
    },
    /** 검색 옵션 콘크리트 종류 설정 */
    setTopFilterConcreteMixOptions ( data ) {
        const all = { label : '전체', value: ''}
        const allConcreteOption = data.map(item => {
            return {
                label: item.codeNameKr,
                value: item.codeVal,
            }
        })
        this.concMixSdOptions = [all, ..._.uniqBy(allConcreteOption, 'value')]
    },
    /** 타설옵션 선택 배합기간별 종류 불러오기 */
    async setConcreteMixCategory() {
        requestOptions.headers['Accept-Language'] = "ko";
        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
              
          let url = '/sendApi/api/common/masterCode/list';
          const payload = {
                groupCode: 'CONC_MIX_OPTN',
                useYn : 'USE_YN'
            }
          
          try {
              const response = await sendPostApi(url, payload);
              if (response.status === 200 && response.data) {
                this.setTopFilterConcreteMixOptions(response.data.data)
              }
          } catch (error) {
              console.error('배합기간별 종류 불러오기 에러 : ',error)
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
		},
    /**
     * API: 시공장비 정보 조회
     */
    async getMritCtemDtlInfo (param) {
      let options = PourConcreteInfo.options
      options.Events = {
        onRenderFirstFinish: async () => {
          const payload = {
            concMritCtemDtlId : param,
            siteMstrId : this.$store.getters['auth/getSiteMstrId']
          }
          try {
            const response = await API.concrete.getMritCtemDtlInfo(payload)
            if(response?.data){
              response.data.typeNum = 'TYPE'+response.data.typeNum;
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
        el: 'pourInfoCtemTable',
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
            concMritRwmtDtlId : param,
            siteMstrId : this.$store.getters['auth/getSiteMstrId']
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
        el: 'pourInfoRwmtTable',
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
            concMritPrpnDtlId : param,
            siteMstrId : this.$store.getters['auth/getSiteMstrId']
          }
          try {
            const response = await API.concrete.getMritPrpnDtlInfo(payload)
            if(response?.data){
              response.data.typeNum = 'TYPE'+response.data.typeNum;
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
        el: 'pourInfoPrpnTable',
        data : [],
        options : options
      }).then(sheet => {
        this.sheetPrpnInfo = sheet
      })
    },

		/**
		 * API: 시험장비 초기 조회
		 */
		async getTestEquipList () {
			try {
        const payload = {
          siteMstrId : this.$store.getters['auth/getSiteMstrId']
        }
				const response = await API.concrete.getTestEquipList(payload)
				if(response?.data?.length) {
					const {
						concMritDtlId,
						testEqmtClid, clidDeviceNm, // 염화물
						tempDeviceNm, testEqmtTemp, // 온도
						airDeviceNm, testEqmtAir, // 공기량
						slmpDeviceNm, testEqmtSlmp, // 슬럼프
						deviceDeviceNm, testEqmtDevice, // 측정기
						compDeviceNm, testEqmtComp // 압축 강도
					} = response.data[0]

					this.testInfo.testEquip = {
						clidDevice: { value: testEqmtClid, label: clidDeviceNm},
						tempDevice: { value: testEqmtTemp, label: tempDeviceNm},
						airDevice: { value: testEqmtAir, label: airDeviceNm},
						slmpDevice: { value: testEqmtSlmp, label: slmpDeviceNm},
						deviceDevice: { value: testEqmtDevice, label: deviceDeviceNm},
						compDevice: { value: testEqmtComp, label: compDeviceNm}
					}

					if (concMritDtlId) {
						this.testInfo.concMritDtlId = concMritDtlId
            const payload = { concMritDtlId, siteMstrId : this.$store.getters['auth/getSiteMstrId'] }
            Promise.all([
              this.getCtemList(payload), // 시공 장비
              this.getRawMaterialList(payload), // 원재료
              this.getPourPlanList(payload) // 타설계획서
            ])
          }
				}
			} catch (error) {
				console.error('시험장비 초기 조회 에러: ', error)
			}
		},
		/**
		 * 시공협력업체 선택
		 */
		selectPartnerCompany (param) {
			this.pourInfo.material = param.tradeId
			this.pourInfo.partnerName = param.tradeNm
		},
		/**
		 * 시험 장비 저장
		 */
		async saveTestEquip (params) {
			const { deviceNm, testDeviceInfoId } = params
			this.testInfo.testEquip = {...this.testInfo.testEquip}
			this.testInfo.testEquip[this.activeTestEquip] = { label: deviceNm, value: testDeviceInfoId }
			this.$forceUpdate()
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
            this.testInfo.concMritCtemDtlId = response.data[0].concMritCtemDtlId
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
          this.testInfo.concMritRwmtDtlId = response.data[0].concMritRwmtDtlId
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
          this.testInfo.concMritPrpnDtlId = response.data[0].concMritPrpnDtlId
        }
			} catch (error) {
				console.error('타설계획서 리스트 조회 에러: ', error)
			}
        },
		/**
		 * 시방배합 & 타설옵션 선택
		 */
		savePourOption (params) {
			const { ptnrId, tradeNm, concSpfcFomlId, concMixSd, concPoursAmt, pourQntm, csTestFreq, prptTestFreq, concPourOptnId, concCpPrType} = params
      this.selectPourOption = {
        pcFormDmldPerp : params.pcFormDmldPerp,
        pcFormDmldHori : params.pcFormDmldHori,
        pcFormDmldEtc : params.pcFormDmldEtc,
        pcComp7d : params.pcComp7d,
        pcComp28d : params.pcComp28d,
        pcComp91d : params.pcComp91d,
        curing7d : params.curing7d,
        curing28d : params.curing28d,
        curing91d : params.curing91d,
        verticalMaterialChk: params.verticalMaterialChk,
        horizontalMaterialChk: params.horizontalMaterialChk,
        fillerSupportMaterialChk: params.fillerSupportMaterialChk,
        ags : params.ags,
        useUnit: params.useUnit,
      }

			this.specificInfo = {
				...this.specificInfo,
				concPourOptnId,
				ptnrId, // 공급업체
				tradeNm,
				concSpfcFomlId, // 시방배합
				concMixSd : this.makeConcMixSd(concMixSd), // 배합규격
				concCpPrType : concCpPrType, // 배합 기간별 종류
				concPoursAmt, // 레미콘당 타설량
				pourOption: pourQntm, // 타설옵션
				pcalFreq: prptTestFreq, // 물성시험 빈도
				testCompStrgFreq: csTestFreq, // 압축강도 시험 빈도
        
			}
      this.specificInfo.verticalMaterialChk = params.verticalMaterialChk ? params.verticalMaterialChk : null,
      this.specificInfo.horizontalMaterialChk = params.horizontalMaterialChk ? params.horizontalMaterialChk : null,
      this.specificInfo.fillerSupportMaterialChk = params.fillerSupportMaterialChk ? params.fillerSupportMaterialChk : null,
      this.specificInfo.compStrengthCheck.testCompStrgChk7d = params.curing7d == 1? true : false
      this.specificInfo.compStrengthCheck.testCompStrgChk28d = params.curing28d == 1? true : false
      this.specificInfo.compStrengthCheck.testCompStrgChk91d = params.curing91d == 1? true : false
		},
		/**
		 * [등록]
		 */
		async saveData () {
			const payload = {
				...this.pourInfo,
				...this.testInfo,
				...this.specificInfo,
        ...this.selectPourOption,
				verticalMaterialChk: this.specificInfo.verticalMaterialChk, // 수직부재 시험 체크 String(this.specificInfo.testFormStrgChk)
        horizontalMaterialChk : this.specificInfo.horizontalMaterialChk, //수평부재 시험체크
        fillerSupportMaterialChk : this.specificInfo.fillerSupportMaterialChk, //filler support 시험체크
				testEqmtClid: this.testInfo.testEquip.clidDevice.value, // 염화물
				testEqmtTemp: this.testInfo.testEquip.tempDevice.value, // 온도
				testEqmtAir: this.testInfo.testEquip.airDevice.value, // 공기량
				testEqmtSlmp: this.testInfo.testEquip.slmpDevice.value, // 슬럼프
				testEqmtDevice: this.testInfo.testEquip.deviceDevice.value, // 측정기
				testEqmtComp: this.testInfo.testEquip.compDevice.value, // 압축강도

				testCompStrgChk7d: this.specificInfo.compStrengthCheck.testCompStrgChk7d ? 'Y' : 'N',
				testCompStrgChk28d: this.specificInfo.compStrengthCheck.testCompStrgChk28d ? 'Y' : 'N',
				testCompStrgChk91d: this.specificInfo.compStrengthCheck.testCompStrgChk91d ? 'Y' : 'N'
			}
			// delete payload.testEquip
			delete payload.compStrengthCheck

      if(!payload['pourDay'] || payload['pourDay'] == "" || payload['pourDay'] == null){
        return this.alert('타설일을 선택해주세요.');
      }
      if(!payload['pourProcess'] || payload['pourProcess'] == "" || payload['pourProcess'] == null){
        return this.alert('타설방법을 입력해주세요.');
      }
      if(!payload['material'] || payload['material'] == "" || payload['material'] == null){
        return this.alert('시공협력업체 선택해주세요.');
      }
      if(!payload['structure'] || payload['structure'] == "" || payload['structure'] == null){
        return this.alert('구조물을 입력해주세요.');
      }
      if(!payload['pourPart'] || payload['pourPart'] == "" || payload['pourPart'] == null){
        return this.alert('타설부위를 입력해주세요.');
      }
      if(!payload['pourSupply'] || 0 >= Number(payload['pourSupply'])){
        return this.alert('타설물량을 입력해주세요.');
      }
      if(commonFn.methods.isEmpty(payload['testEqmtClid'])) {
          return this.alert('시험장비(염화물)를 선택해주세요.');
      }
      if(commonFn.methods.isEmpty(payload['testEqmtTemp'])) {
          return this.alert('시험장비(온도)를 선택해주세요.');
      }
      if(commonFn.methods.isEmpty(payload['testEqmtAir'])) {
          return this.alert('시험장비(공기량)를 선택해주세요.');
      }
      if(commonFn.methods.isEmpty(payload['testEqmtSlmp'])) {
          return this.alert('시험장비(슬럼프)를 선택해주세요.');
      }
      if(commonFn.methods.isEmpty(payload['testEqmtDevice'])) {
          return this.alert('시험장비(측정기)를 선택해주세요.');
      }
      if(commonFn.methods.isEmpty(payload['testEqmtComp'])) {
          return this.alert('시험장비(압축강도)를 선택해주세요.');
      }
      if(!payload['concMritCtemDtlId'] || payload['concMritCtemDtlId'] == "" || payload['concMritCtemDtlId'] == null){
        return this.alert('시공장비를 선택해주세요.');
      }
      if(!payload['concMritRwmtDtlId'] || payload['concMritRwmtDtlId'] == "" || payload['concMritRwmtDtlId'] == null){
        return this.alert('원재료를 선택해주세요.');
      }
      if(!payload['concMritPrpnDtlId'] || payload['concMritPrpnDtlId'] == "" || payload['concMritPrpnDtlId'] == null){
        return this.alert('타설계획서 정보를 선택해주세요.');
      }
      if(!payload['pourOption'] || payload['pourOption'] == "" || payload['pourOption'] == null){
        return this.alert('타설 옵션을 선택해주세요.');
      }
      if(!payload['ptnrId'] || payload['ptnrId'] == "" || payload['ptnrId'] == null){
        return this.alert('타설 옵션에서 공급업체를 설정해주세요.');
      }
      if(!payload['concSpfcFomlId'] || payload['concSpfcFomlId'] == "" || payload['concSpfcFomlId'] == null){
        return this.alert('타설 옵션에서 시방배합을 설정해주세요.');
      }
      if(payload['curing7d'] == 0 && payload['curing28d'] == 0 && payload['curing91d'] == 0) {
        return this.alert('타설 옵션에서 표준(양생) 압축강도 시험 체크를 설정해주세요.');
      }

			try {
				this.confirm('등록하시겠습니까?', async () => {
          const docPayload = {
            'codeType':'CCRT',
            'codeDtlType':'CONC',
            'gjmcd':'',
            'gjscd':'',
            'siteMstrId' : this.siteMstrId
          }
          const docResult = await API.concrete.selectDocNumSeq(docPayload)
          const finalPayload = {
            ...payload,
            docSeq: docResult
          }
          const result =  await API.concrete.addPourStatus(finalPayload)
          if(result?.json?.rCode === '0000') {
            this.alert('등록되었습니다.', async () => {
              this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
              this.$router.push({ name: 'PourSetUpSheet' })
            })
          }else{
            this.alert('등록에 실패했습니다.')
          }
				})
			} catch (err) {
				console.error('등록에 실패했습니다.', err)
			}
		},
    /**
     * 목록 버튼
     */
    routeToList () {
        this.$router.push({
            name: 'PourSetUpSheet'
        })
    },
    /**
     * 시공장비 팝업 버튼
     */
    popUpOpenBtn () {
      this.$bvModal.show('pourSetUpWriteId')
    },
    openPourOptionModal(){
      this.$bvModal.show('pop_concrete_option')
      this.getPourOptionList(this.popUp)
    },
    /** 타설옵션 리스트를 검색합니다 */
    async getPourOptionList (payload = this.popUp) {
			try {
				const response = await API.concrete.getPourOptionList({
					...payload,
				})
          //타설옵션 그리드 옵션
          let options = ConcretePourPopUp.options
          options.Events = {
            onDblClick : (evt) => {
              this.dbClickData(evt)
            },
            onMouseOver: (evt) => {
              this.tooltipOver(evt)
            },
            onDataLoad: this.tooltipCreate,
            onScroll: this.tooltipScroll,
          }

          loader.createSheet({
              el : 'popUpPourOption',
              data : this.mappingInitGridData(response.data),
              options : options
          }).then(sheet => {
              this.sheet = sheet
          })

			} catch (error) {
				console.error('타설옵션 리스트 조회 에러: ', error)
			}
		},
    /** 시방배합 툴팁 */
    tooltipCreate: function() {
      if(this.tooltipBool) {
          var element = document.getElementsByTagName('body')[0];
          var tooltip = element.appendChild(document.createElement('div'))
          tooltip.classList.add('tooltip_layout');

          this.tooltipBool = false;
      }
    },
    tooltipOver(evtParam) {
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
        }else{
          tooltip.classList.remove('on');
        }
      } else {
        tooltip.classList.remove('on');
      }
    },
    /**
		 * 타설옵션 초기 그리드 데이터를 가공합니다.
		 */
		mappingInitGridData (data) {
			if(!data) return []
			const mappedData = data.map(row => {
				let inDttm, upDttm
				if(row.inDttm) inDttm = row.inDttm.split('T')[0]
				if(row.upDttm) upDttm = row.upDttm.split('T')[0]
				row.concMixSd = this.makeConcMixSd(row.concMixSd)

				const startUpdateDate = inDttm + (upDttm ? ' ' + upDttm : '')

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
    dbClickData (evt) {
      const { ptnrId, tradeNm, concSpfcFomlId, concMixSd, concPoursAmt, pourQntm, csTestFreq, prptTestFreq, concPourOptnId, concCpPrType} = evt.row
      this.selectPourOption = {
        pcFormDmldPerp : evt.row.pcFormDmldPerp,
        pcFormDmldHori : evt.row.pcFormDmldHori,
        pcFormDmldEtc : evt.row.pcFormDmldEtc,
        pcComp7d : evt.row.pcComp7d,
        pcComp28d : evt.row.pcComp28d,
        pcComp91d : evt.row.pcComp91d,
        curing7d : evt.row.curing7d,
        curing28d : evt.row.curing28d,
        curing91d : evt.row.curing91d,
        verticalMaterialChk: evt.row.verticalMaterialChk,
        horizontalMaterialChk: evt.row.horizontalMaterialChk,
        fillerSupportMaterialChk: evt.row.fillerSupportMaterialChk,
        ags : evt.row.ags,
        useUnit: evt.row.useUnit,
        w1: evt.row.w1,
        w2: evt.row.w2,
      }

			this.specificInfo = {
				...this.specificInfo,
				concPourOptnId,
				ptnrId, // 공급업체
				tradeNm,
				concSpfcFomlId, // 시방배합
				concMixSd : this.makeConcMixSd(concMixSd), // 배합규격
				concCpPrType : concCpPrType, // 배합 기간별 종류
				concPoursAmt, // 레미콘당 타설량
				pourOption: pourQntm, // 타설옵션
				pcalFreq: prptTestFreq, // 물성시험 빈도
				testCompStrgFreq: csTestFreq, // 압축강도 시험 빈도
        
			}
      this.specificInfo.verticalMaterialChk = evt.row.verticalMaterialChk ? evt.row.verticalMaterialChk : null,
      this.specificInfo.horizontalMaterialChk = evt.row.horizontalMaterialChk ? evt.row.horizontalMaterialChk : null,
      this.specificInfo.fillerSupportMaterialChk = evt.row.fillerSupportMaterialChk ? evt.row.fillerSupportMaterialChk : null,
      this.specificInfo.compStrengthCheck.testCompStrgChk7d = evt.row.curing7d == 1? true : false
      this.specificInfo.compStrengthCheck.testCompStrgChk28d = evt.row.curing28d == 1? true : false
      this.specificInfo.compStrengthCheck.testCompStrgChk91d = evt.row.curing91d == 1? true : false
      
      this.popUp.tradeNm = '',
      this.popUp.concMixSd = '',
      this.popUp.concCpPrType = '',
      
      this.$bvModal.hide('pop_concrete_option')
    },
    /** 타설옵션 리스트 검색 */
    async popUpSearch(isReset){
      if (isReset) {
				this.popUp = {
					tradeNm: '', // 공급업체
					concMixSd: '', // 배합규격
					pourQntm: '',
          concCpPrType : '',
          siteMstrId : this.$store.getters['auth/getSiteMstrId'],
				}
			}

			return await this.getPourOptionList(this.popUp)
    },
    selectPouOption (){
      let params = this.sheet.getFocusedRow()
      const { ptnrId, tradeNm, concSpfcFomlId, concMixSd, concPoursAmt, pourQntm, csTestFreq, prptTestFreq, concPourOptnId, concCpPrType} = params
      this.selectPourOption = {
        pcFormDmldPerp : params.pcFormDmldPerp,
        pcFormDmldHori : params.pcFormDmldHori,
        pcFormDmldEtc : params.pcFormDmldEtc,
        pcComp7d : params.pcComp7d,
        pcComp28d : params.pcComp28d,
        pcComp91d : params.pcComp91d,
        curing7d : params.curing7d,
        curing28d : params.curing28d,
        curing91d : params.curing91d,
        verticalMaterialChk: params.verticalMaterialChk,
        horizontalMaterialChk: params.horizontalMaterialChk,
        fillerSupportMaterialChk: params.fillerSupportMaterialChk,
        ags : params.ags,
        useUnit: params.useUnit,
      }

			this.specificInfo = {
				...this.specificInfo,
				concPourOptnId,
				ptnrId, // 공급업체
				tradeNm,
				concSpfcFomlId, // 시방배합
				concMixSd : this.makeConcMixSd(concMixSd), // 배합규격
				concCpPrType : concCpPrType, // 배합 기간별 종류
				concPoursAmt, // 레미콘당 타설량
				pourOption: pourQntm, // 타설옵션
				pcalFreq: csTestFreq, // 물성시험 빈도
				testCompStrgFreq: prptTestFreq, // 압축강도 시험 빈도
        
			}
      this.specificInfo.verticalMaterialChk = params.verticalMaterialChk ? params.verticalMaterialChk : null,
      this.specificInfo.horizontalMaterialChk = params.horizontalMaterialChk ? params.horizontalMaterialChk : null,
      this.specificInfo.fillerSupportMaterialChk = params.fillerSupportMaterialChk ? params.fillerSupportMaterialChk : null,
      this.specificInfo.compStrengthCheck.testCompStrgChk7d = params.curing7d == 1? true : false
      this.specificInfo.compStrengthCheck.testCompStrgChk28d = params.curing28d == 1? true : false
      this.specificInfo.compStrengthCheck.testCompStrgChk91d = params.curing91d == 1? true : false
      this.popUp.tradeNm = '',
      this.popUp.concMixSd = '',
      this.popUp.concCpPrType = '',
      this.$bvModal.hide('pop_concrete_option')
    },
    closePourOptionBtn () {
      this.popUp.tradeNm = '',
      this.popUp.concMixSd = '',
      this.popUp.concCpPrType = '',
      this.$bvModal.hide('pop_concrete_option')
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
	}
}
</script>