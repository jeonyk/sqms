import axios from 'axios'
import VueCookies from 'vue-cookies';

// const URL = 'http://61.251.164.137:8080'
const URL = '/sendApi/api'
const EDU_URL = '/checkEdu/eduMng'
const SITE_INFO_URL = '/siteInfo'

const hd = {
  "Content-Type": "application/json",
  "Accept-Language": "ko",
  "Authorization": VueCookies.get("Authorization"),
}
const siteMstrId = VueCookies.get("siteMstrId")

export default {
    // 현장정보 불러오기
    getSiteInfoView: async (payload) => {
        try {
            const { data } = await axios.post(URL + SITE_INFO_URL + `/view`,
            payload,{
            headers:hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    // ================= 마스터코드 리스트 =================
    getMasterCodeList: async (payload) => {
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
    // ================= 교육정보 리스트 =================
    // 파람 : mainCodeId, midCodeId, eduTargetType, eduCourseName, eduYear, inspStatus
    getEduMngInfoList: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngInfo/list`,
                payload,{
                headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    getAllEduMngInfoList: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngInfo/list`,
                payload,{
                headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    // ================= 교육정보 상세 =================
    // 필수값 (eduMngId)
    getEduMngInfoView: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngInfo/view`,
            payload,
            {
            headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    // ================= 교육훈련계획 등록 =================
    //siteMstrId, mainCodeId, midCodeId, eduType, eduCourseName, eduTargetType, eduTargetComment, eduPurps, eduPlanStartDt, eduPlanEndDt, eduTcher, eduMainType, tchmtrFileConnectId, etcFileConnectId
    getEduMngPlanWrite: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngPlan/write`,
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
    // ================= 교육훈련 계획 수정 =================
    //siteMstrId, mainCodeId, midCodeId, eduType, eduCourseName, eduTargetType, eduTargetComment, eduPurps, eduPlanStartDt, eduPlanEndDt, eduTcher, eduMainType, tchmtrFileConnectId, etcFileConnectId
    getEduMngPlanChange: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngPlan/change`,
            payload,{
            headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    // ================= 교육훈련 실시 등록 =================
    //siteMstrId, mainCodeId, midCodeId, eduType, eduCourseName, eduTargetType, eduTargetComment, eduPurps, eduPlanStartDt, eduPlanEndDt, eduTcher, eduMainType, tchmtrFileConnectId, etcFileConnectId
    getEduMngInspChange: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngInsp/change`,
            payload,{
            headers: hd
            })
            return data 
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    // ================= 교육정보 단건삭제 =================
    // eduMngId
    getEduMngInfoUnuse: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngInfo/unuse`,
            payload,{
            headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    // ================= 교육정보 다건삭제 =================
    // eduMngId
    getEduMngInfoListUnuse: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngInfo/unuseMulty`,
            payload,{
            headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    // ================= 타 프로젝트 교육교재 조회 =================
    getOtherProjectEdu: async (payload) => {
        try {
            const { data } = await axios.post(URL + EDU_URL + `/eduMngInfo/otherProject/list`,
            payload,{
            headers:hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    copyFiles: async (payload) => {
        try {
            const { data } = await axios.post(`/sendApi/api/file/copyFiles`,
            payload
            ,{
                headers:hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    } 
}