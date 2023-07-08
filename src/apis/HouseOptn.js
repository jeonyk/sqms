import axios from 'axios'
import VueCookies from 'vue-cookies';

// const URL = 'http://61.251.164.137:8080'
const URL = '/sendApi/api'
const HOUSE_OPTN_URL = '/siteInfo/houseOptn'
const SITE_INFO_URL = '/siteInfo'
const hd = {
  "Content-Type": "application/json",
  "Accept-Language": "ko",
  "Authorization": VueCookies.get("Authorization"),
}

export default {
    /**
     * 세대옵션 설정 리스트 가져오기
     */
    getHouseOptnList : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseSet/list`,
            payload,{
            headers: hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * 세대옵션 설정 등록
     */
    setHouseOptnWrite : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseSet/write`,
            payload,{
                headers: hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * 세대옵션 설정 삭제
     */
    setHouseOptnDelete : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseSet/delete`,
            payload,{
            headers: hd
            })
            return data 
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * Mysite 세대정보 검색조건 dong 불러오기 
     */
    getHouseInfoMySiteDongList : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseDong/list`, 
                payload
            ,{
                headers : hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * Mysite 세대정보 리스트 불러오기
     */
    getHouseInfoMySiteList : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseDetail/list`,{
                ...payload,
            },{
                headers: hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    /**
     * Mysite 세대정보 상세 세대옵션 정보 팝업
     */
    getHouseInfoMySiteDetail : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseOption/list`,
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
     * Mysite 세대정보 상세 세대옵션 정보 팝업
     */
    getHouseInfoMySiteDetailAfter : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseOption/AfterList`,
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
     * 입면도 리스트
     */
    getHouseElevationList : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/elevation/list`,
            payload,{
            headers:hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    getOtherProjectList: async (payload) => { // 타 프로젝트 조회
        try {
            const { data } = await axios.post(URL + `/popup/project/list`,
            payload, {
            headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    setHouseRemarkChange : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseRemark/change`,
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
    getbatchTest : async () => {
        try {
            const { data } = await axios.post(`/sendApi/api/sqmsBatch/house/houseOptnBatch`,
            {
            headers:hd
            })
            return data
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },
    getAddrHoList : async (payload) => {
        try {
            const { data } = await axios.post(URL + HOUSE_OPTN_URL + `/houseOption/selectAddrHo`,
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