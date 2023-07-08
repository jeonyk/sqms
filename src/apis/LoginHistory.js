import axios from 'axios'
import VueCookies from 'vue-cookies';

const hd = {
    "Content-Type": "application/json",
    "Accept-Language": "ko",
    "Authorization": VueCookies.get("Authorization"),
}

export default {
    /**
     * 접속기록 조회 리스트 불러오기
     */
    getLoginHistoryList : async(payload) => {
        try {
            const { data } = await axios.post(`/sendApi/api/myWork/userMngt/loginHistory/historyList`,
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