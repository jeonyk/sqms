import axios from 'axios'
import VueCookies from 'vue-cookies';

// const URL = 'http://61.251.164.137:8080'
const URL = '/sendApi/api'
const CONCRETE_URL = '/concrete'
const SITE_INFO_URL = '/siteInfo'

const hd = {
  "Content-Type": "application/json",
  "Accept-Language": "ko",
  "Authorization": VueCookies.get("Authorization"),
}
const siteMstrId = VueCookies.get("siteMstrId")


export default {
   // ========== 초기 세팅 > 공급 업체 ============
  getSupplierList: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/supplier/view`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
   
  // ========== 초기 세팅 > 시방배합 셀렉트 옵션 공급 업체 ============
  getSupplierSelectOptView: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/supplier/selectOptView`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  // ========== 초기 세팅 > 시방 배합 ============
  getSpecificFomlList: async (payload) => { // 시방배합 목록 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/spfc/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  // ========== 시방 배합 저장 ============
  insertSpecificFoml: async (payload) =>{
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/spfc/write`,
      payload,{
      headers: hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },

  // ========== 초기 세팅 > 시방 배합  파일등록============
  getSpecificFomlFileChange: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/spfc/fileChange`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  // ========== 초기 세팅 > 시방 배합  파일등록============
  getSpecificFomlMultiFileChange: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/spfc/multiFileChange`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  // ========== 초기 세팅 > 타설 옵션 ============
  getPourSelectData: async (payload) => { // 타설 옵션 상단 검색 > 공급업체 및 배합규격 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourOption/searchView`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getPourOptionList: async (payload) => { // 타설 옵션 리스트 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourOption/view`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updatePourOptionList: async (payload) => { // 타설 옵션 리스트  업데이트 (등록/수정/삭제)
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourOption/write`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getSpfcPopUpData: async(payload) => { // 타설 옵션 > 툴팁 > 시방배합 정보
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/spfcPop/view`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  // ========== 초기 세팅 > 시험 장비 ============
  getTestEquipList: async (payload) => { // 시험 장비 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/testEquid/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  saveTestEquipList: async (payload) => { // 시험 장비 수정
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/testEquid/tseqChange`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

   // ========== 초기 세팅 > 시공 장비 ============
  getCtemList: async (payload) => { // 시공 장비 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/testEquid/ctemList`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getOtherCtemList: async (payload) => { // 타 프로젝트 시공 장비 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/testEquid/ctemOther`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updateCtemList: async (payload) => { // 시공 장비 수정
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/testEquid/ctemWrite`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

   // ========== 초기 세팅 > 원재료 ============
  getRawMaterialList: async (payload) => { // 원재료 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/rawMaterial/list`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getOtherRawMaterialList: async (payload) => { // 타 프로젝트 원재료 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/rawMaterial/other`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updateRawMaterialList: async (payload) => { // 원재료 수정
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/rawMaterial/write`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  getPourPlanList: async (payload) => { // 타설계획서 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourPlan/list`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getOtherPourPlanList: async (payload) => { // 타 프로젝트 타설계획서 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourPlan/other`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updatePourPlanList: async (payload) => { // 타설계획서 수정
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourPlan/write`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  // ========== 타설 관리 > My Site ============
  getPourStatusList: async (payload) => { // 타설 리스트 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/list`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  // ========== 타설 관리 > All Site ============
  getPourStatusAllSiteList: async (payload) => { // 타설 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/list`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  deletePourStatusList: async (payload) => { // 타설 삭제
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/unUse`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  addPourStatus: async (payload) => { // 타설 등록
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/write`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getPourStatusView: async (payload) => { // 타설 상세 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/view`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getPourOptionPartInfo: async (payload) => { // 물성시험관리 부분(헤더) 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourOption/partView`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updatePourOptionPartInfo: async (payload) => { // 물성시험관리 부분(헤더) 업데이트
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pcPcal/change`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getPrptTestList: async (payload) => { // 물성시험관리 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/prptTtmg/view`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updatePrptTestList: async (payload) => { // 물성시험관리 업데이트
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/prptTtmg/write`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  changePrptTestFile: async(payload) => { // 물성시험관리 파일 변경
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/fileChange`,
        payload,{
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getDisposeSupplyList: async (payload) => { // 타설 입력 > 폐기 및 물량 리스트 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/dispSupl/list`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getDisposeConcreteSupplyInfo: async (payload) => { // 타설 입력 > 폐기 및 물량 콘크리트 물량 조회 (타설물량, 합격물량, 폐기물량)
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/dispSupl/view`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updateDisposeSupplyList: async (payload) => { // 타설 입력 > 폐기 및 물량 리스트 업데이트
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/dispSupl/change`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  changeDisposeSupplyFile: async (payload) => { // 폐기 및 물량 파일 업로드
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/DispfileChange`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getFinalPourInfo: async (payload) => { // 타설 입력 > 최종 타설 정보 조회
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/finalPourInfo/view`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updateFinalPourInfo: async (payload) => { // 타설 입력 > 최종 타설 정보 저장
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/finalSuplInfo/write`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  changePourProgress: async (payload) => { // 타설 입력 > 타설완료 > 진행상황 업데이트
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/progress/change`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  // ~~~~~~~~~~ concrete 이외 URL (임시) => siteMstrId 필수 ~~~~~~~~~~
  getOtherProjectList: async (payload) => { // 타 프로젝트 조회
    try {
      const { data } = await axios.post(URL + SITE_INFO_URL + `/popup/project/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getOtherPartnerList: async (payload) => {
    try {
      const { data } = await axios.post(URL + `/popup/partnerCompanySearch/list`,
        payload, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getImageFile: async (fileQltImgArcvId, seq) => { // 이미지 단건 조회
    try {
      const { data } = await axios.post(URL + `/fileUp/getConcMngtImgFile`,
        {
          siteMstrId,
          fileQltImgArcvId
        }, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  loadFileInfo: async (payload) => { // 파일 조회
    try {
      const { data } = await axios.post(URL + '/file/upFileList',
        {
          ...payload
        }, {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getTestFreq: async (payload) => { //시험빈도 설정 조회
    try{
      const { data } = await axios.post(URL+ CONCRETE_URL + `/testEquid/testFreq`,
        payload
        , {
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  saveTestFreq : async(payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/testEquid/testChange`,
      payload
      , {
        headers: hd
      })
      return data
    } catch (error) {
      throw new Error(error)
    }
  },
  getStrgMngtList: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/strgMngt/list`,
      payload
      ,{
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  getStrgMngtDetail: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/strgMngtDtl/list`,
      payload,{
      headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updateCompStrgInfo: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/strgMngtDtl/change`,
      payload,{
      headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updateCompStrgFileChange: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/strgMngtDtl/fileChange`,
        payload,{
        headers:hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updataPrptFileStatus: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/prptFileStsUpdate`,
      payload,{
        headers: hd
      })
      return data
    }catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updateDispFileStatus: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/dispFileStsUpdate`,
      payload,{
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updateFinalFileStatus: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/finalFileChange`,
      payload,{
        headers: hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  selectDocNumSeq: async (payload) => {
    try {
      const { data } = await axios.post(URL + `/docNum/selectDocNumSeq`,
        payload,{
        headers:hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updatePourDetail: async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/pourDetailUpdate`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  updatePourUseUnitChange : async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/useUnit/change`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  concretePourProgressChange : async (payload) => {  // 타설 결재상신 업데이트
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/progressChange`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },

  concreteCompStatusInfoChange : async (payload) => {  // 강도 결재상신 업데이트
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/strgMngtDtl/statusChange`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
/*   concretePourDetailInfo : async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/detail`,
      {
        siteMstrId,
        ...payload
      },{
        headers:hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }, */
  setFileUnuse : async (payload) => {
    try {
      const { data } = await axios.post(URL + `/file/fileUnUse`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
  /** 시공장비 정보 조회 */
  getMritCtemDtlInfo : async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/mritCtemDtlInfo`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /** 원재료 정보 조회 */
  getMritRwmtDtlInfo : async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/mritRwmtDtlInfo`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /** 타설계획서 정보 조회 */
  getMritPrpnDtlInfo : async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/pourStatus/mritPrpnDtlInfo`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /** 마스터코드 정보 조회 */
  getMasterCodeList : async (payload) => {
    try {
      const { data } = await axios.post(URL + `/common/masterCode/list`,
      payload
      ,{
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /** 타설옵션 검색조건 불러오기 */
  getSelectPourOptnCategory : async (payload) => {
    try {
      const { data } = await axios.post(URL + CONCRETE_URL + `/select/pourOptn`,
      payload,{
      headers: hd
      })
      return data 
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}