import axios from 'axios'
import VueCookies from 'vue-cookies';

const hd = {
    "Content-Type": "application/json",
    "Accept-Language": "ko",
    "Authorization": VueCookies.get("Authorization"),
}

export default {
    /**
     * 배치 관리 리스트 불러오기
     */
    getSelectBatchList : async(payload) => {
        try {
            const { data } = await axios.post(`/sendApi/api/sqmsBatch/batch/batchList`,
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
     * 배치 주기 및 정보변경
     */
     updateSchedulerInfo : async (payload) => {
        try {
            const { data } = await axios.post(`/sendApi/api/sqmsBatch/batch/updateBatch`,
            payload
            ,{
            headers:hd
            })
            return data
        } catch (error) {
            throw new Error(error)
        }
     },
    /**
     * 세대옵션 배치 수동실행
     */
    houseOptionBatchApi : async () => {
        try {
            const { data } = await axios.get(`/sendApi/api/sqmsBatch/house/houseOptnBatchBtn`
            ,{
            headers: hd
            })
            return data
        } catch (error) {
            throw new Error(error)
        }
    },
     /**
      * 현장 정보별 본사 직원, 협력사 직원 추가 배치 수동실행
      */
    siteInsertUserBatchApi : async () => {
        try {
            const { data } = await axios.get(`/sendApi/api/sqmsBatch/siteInfo/insertUserBatchBtn`,
            {
            headers: hd
            })
            return data
        } catch (error) {
            throw new Error(error)
        }
    },
    testRrqstMtrlAccpTestExDateApi : async () => {
        try {
            const { data } = await axios.get(`/sendApi/api/sqmsBatch/msg/reqtTestBtn`,
            {
            headers: hd
            })
            return data 
        } catch (error) {
            throw new Error(error)
        }
    },
    concMngtCrckMngtMesgTrgtListApi : async () => {
        try {
            const { data } = await axios.get(`/sendApi/api/sqmsBatch/msg/concCrckMngtMesgBtn`,
            {
            headers: hd
            })
            return data
        } catch (error) {
            throw new Error(error)
        }
    },
    bscheckDefectPrcsDelyNotiMesgTrgtListApi : async () => {
        try {
            const { data } = await axios.get(`/sendApi/api/sqmsBatch/msg/bscheckDefectPrcsBtn`,
            {
            headers: hd
            })
            return data 
        } catch (error) {
            throw new Error(error)
        }
    },
    dvicCorctDelyEduPlanDtApi : async () => {
        try {
            const { data } = await axios.get(`/sendApi/api/sqmsBatch/msg/dvicCorctDelyEduPlanDtBtn`,
            {
            headers: hd
            })
            return data
        } catch (error) {
            throw new Error(error)
        }
    },
    ptnrPswdExprMesgTrgApi : async () => {
        try {
            const { data } = await axios.get(`/sendApi/api/sqmsBatch/msg/ptnrPswdExprMesgTrgBtn`,
            {
            headers: hd
            })
            return data
        } catch (error) {
            throw new Error(error)
        }
    },
    extrnSelfMesgTrgApi : async () => {
        try {
            const { data } = await axios.get(`/sendApi/api/sqmsBatch/msg/extrnSelfMesgTrgBtn`,
            {
            headers: hd
            })
            return data
        } catch (error) {
            throw new Error(error)
        }
    },
    
}