import axios from 'axios'
import VueCookies from 'vue-cookies';

// const URL = 'http://61.251.164.137:8080'
const URL = '/sendApi/api'
const WORKER_EDU_URL = '/checkEdu/workerEdu'
const SITE_INFO_URL = '/siteInfo'

const hd = {
  "Content-Type": "application/json",
  "Accept-Language": "ko",
  "Authorization": VueCookies.get("Authorization"),
}
const siteMstrId = VueCookies.get("siteMstrId")

export default {
    /**
     * 신규 근로자 교육 현황 언어 리스트
     */
    getWorkerEduLangList: async () => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/language/list`,
            {},{
            headers:hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * 신규 근로자 교육 현황 언어 저장
     */
    getWorkerEduLangChange: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/language/change`,
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
     * 신규 근로자 교육 현황 코드다국어 리스트
     */
    getWorkerEduCodeLangList: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/codeMultiLanguage/list`,
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
     * 신규 근로자 교육 현황 코드 다국어 저장
     */
    getWorkerEduCodeLangChange: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/codeMultiLanguage/change`,
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
     * 언어번역 리스트 조회
     */
    getWorkerEduTranSlation: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/contentsMultiLanguage/list`,
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
     * 언어 번역 저장
     */
    getWorkerEduTranSlationChange: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/contsMultiLanguage/change`,
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
     * 신규 근로자 교육 현황 교재 리스트
     */
    getEduCationList: async () => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/material/list`,
            {},{
            headers:hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * 신규 근로자 교육 현황 교재 저장
     */
    getEduCationChange: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/material/change`,
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
     * 신규 근로자 교육 현황 현황 리스트
     */
    getEduCationStatusList: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/eduCurrentState/list`,
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
     * 신규 근로자 교육 현황자 저장
     */
    getEduCationStatusChange: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/eduWorker/write`,
            payload
            )
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * 신규 근로자 교육 현황자 이수처리
     */
    getEduCatorComplete: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/eduWorker/change`,
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
     * 신규 근로자 교육 현황 이수자 리스트
     */
    getEduCatorCompleteList: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/eduCmptWorker/list`,
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
     * 신규 근로자 교육 현황 파일 변경
     */
    setEduMtrlFileChange: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/eduMtrlFile/change`,
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
     * 신규 근로자 교육 현황 파일 전부 삭제
     */
         setEduMtrlFileUnuse: async (payload) => {
            try {
                const { data } = await axios.post(URL + WORKER_EDU_URL + `/eduMtrlFile/unuse`,
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
     * 신규 근로자 교육 현황 공종 및 교육 불러오기
     */ 
    getMaterialList: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/material/list`,
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
     * 신규 근로자 교육 현황 공종 및 세부공종 불러오기
     */
    getCategoryData: async (payload) => {
        try {
            const { data } = await axios.post(URL + `/common/codeCategory/list`,
            payload,{
                headers:hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * 신규 근로자 교육 현황 모바일 공종 및 교육 불러오기
     */
    getSelectMaterialList: async (payload) => {
        try {
            const { data } = await axios.post(URL + WORKER_EDU_URL + `/material/selectList`,
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
     * 신규 근로자 교육 현황 모바일 컨텐츠 다국어 리스트
     */
    getMobileContensLangList: async (payload) => {
        try {
            const { data } = await axios.post(`/sendApi/api/mobile/workerEdu/loginLanguage/list`,
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
     * 모바일 로그인 인증번호 생성
     */
    setMakeCertiNumber : async (payload) => {
        try {
            const { data } = await axios.post(`/sendApi/api/login/cert/checkNum/write`,
                payload
            ,{
                headers:hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}