import axios from 'axios'
import VueCookies from 'vue-cookies';

const URL = ''
const TEST_DEVICE_URL = '/sendApi/api/testDevice'

const hd = {
    // "Content-Type": "application/json",
    "Accept-Language": "ko",
    "Authorization": VueCookies.get("Authorization")
}

const siteMstrId = VueCookies.get("siteMstrId")

export default {
    getTestDeviceList: async (payload) => { // 시험 검사 장비 조회
        try {
            const { data } = await axios.post(URL + TEST_DEVICE_URL + `/testDeviceInfo/list`,
                { siteMstrId, ...payload }, {
                headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },

    getTestDeviceListAll: async (payload) => { // 시험 검사 장비 조회(AllSite)
        try {
            const { data } = await axios.post(URL + TEST_DEVICE_URL + `/testDeviceInfo/list`,
                { ...payload }, {
                headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },

    getTestDeviceDtl: async (payload) => { // 시험 검사 장비 상세조회
        try {
            const { data } = await axios.post(URL + TEST_DEVICE_URL + `/testDeviceInfo/dtl`,
                { ...payload }, {
                headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    
    setTestDeviceChange: async (payload) => { // 시험 검사 장비 수정
        try {
            const { data } = await axios.post(URL + TEST_DEVICE_URL + `/testDeviceInfo/change`,
                { ...payload }, {
                headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },

    setTestDeviceUnuse: async (payload) => { // 시험 검사 장비 미사용변경
        try {
            const { data } = await axios.post(URL + TEST_DEVICE_URL + `/testDeviceInfo/unuse`,
                { ...payload }, {
                headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },

    setTestDeviceWrite: async (payload) => { // 시험 검사 장비 미사용변경
        try {
            const { data } = await axios.post(URL + TEST_DEVICE_URL + `/testDeviceInfo/write`,
                { ...payload }, {
                headers: hd
            })
            return data
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}