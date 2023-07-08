import axios from 'axios'
import VueCookies from 'vue-cookies';

// const URL = 'http://61.251.164.137:8080'
const URL = '/sendApi/api'
const BS_CHECK_URL = '/bsCheck'
const SITE_INFO_URL = '/siteInfo'

const hd = {
  "Content-Type": "application/json",
  "Accept-Language": "ko",
  "Authorization": VueCookies.get("Authorization"),
}
const siteMstrId = VueCookies.get("siteMstrId")

export default {
  /**
   * BS 점검 > 세대 결함 (리스트 조회)
   */
  getBsDeffectRegMngList: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defectReg/list`,
        payload,  
      {
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * BS 점검 > 세대 결함 (검색조건 공종, 세부공종, 결함공종, 결함유형 조회)
   */
  getBsDeffectMngList: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defectMng/list`,
        payload,  
      {
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * 마스터 코드 불러오기 
   */
   getMasterList: async (payload) => {
    try {
      const { data } = await axios.post(URL + `/common/masterCode/list`,
        payload,  
      {
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * 공간 코드 불러오기 
   */
   getSpacedefectCntList: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL +`/spacedefectCnt/list`,
        payload,  
      {
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * 공종 리스트 불러오기 코드 불러오기 
   */
   getSpacedefectList: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL +`/spacedefect/list`,
        payload,  
      {
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * 결함 유형 리스트 불러오기 코드 불러오기 
   */
   getDefectTypeList: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL +`/defectType/list`,
        payload,  
      {
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /** 
   * 결함 문구 
   */
  getDefectCntsMngList: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL +`/defectCntsMng/list`,
        payload,  
      {
        headers:hd
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * 결함 등록
   */
  getDefectRegWrite: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defectReg/write`,
        payload
      ,{
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept-Language" : "ko",
        }
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * 결함 처리 등록
   */
  getDefecProsWrite: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defecPros/write`,
        payload
        ,{
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept-Language" : "ko",
        }
        })
        return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * 확인 점검 등록
   */
  getDefectCnfmWrite: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defecCnfm/write`,
        payload
      ,{
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept-Language" : "ko",
      }
      })
      return data
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  },
  /**
   * 결함등록 삭제
   */
  setDefectRegUnUsed: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defectReg/unUsed`,
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
  /**
   * 결함 등록 반환
   */
  setDefectPtnrChange: async (payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defectPtnr/change`,
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
  /**
   * 결함 상세보기
   */
  getDefectRegView : async(payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defectReg/view`,
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
    /**
   * 세대 결함 통계 상세보기
   */ 
     getBsInsptSummary : async(payload) => {
      try {
        const { data } = await axios.post(URL + BS_CHECK_URL + `/bsInsptSummary/list`,
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
  /** 결함 상세 (결함 처리, 확인점검 )*/
  getDefectProsCnfmList: async(payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defectProsCnfm/list`,
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
  /** 미배정 반환 리스트 불러오기 */
  getBsNoAssignList: async(payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/bsNoAssign/list`,
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
  /** 협력업체 리스트 불러오기 */
  getComPanySearchList: async(payload) => {
    try {
      const { data } = await axios.post(URL + `/popup/partnerCompanySearch/list`,
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
  /** 처리지연 리스트 불러오기 */
  getDefectDelayList: async(payload) => {
    try {
      const { data } = await axios.post(URL + BS_CHECK_URL + `/defectDelay/list`,
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
}