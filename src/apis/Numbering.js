import axios from 'axios'
import VueCookies from 'vue-cookies';

const config = {
    options: {
        headers: {
            "Content-Type": "application/json;",
            "Accept-Language": "ko",
            "Authorization": VueCookies.get("Authorization")
        }
    },
    url: {
        docNum: '/sendApi/api/docNum'
    },
    payload: {
        siteMstrId: VueCookies.get("siteMstrId")
    }
}

export async function postApi(defaultUrl, callUrl, payload, options) {
    try {
        return await axios.post(
            `${config.url.default? config.url.default : ''}${config.url[defaultUrl]}${callUrl}`,
            payload,
            {
                ...config.options,
                ...options,
            }
        )
    } catch (error) {
        throw new Error(error)
    }
}

export default {
    getDocNumSettList: async (payload, options) => {
        const url = '/docNumSettList'
        try {
            return await postApi('docNum', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getDocNumSettHistList: async (payload, options) => {
        const url = '/docNumSettHistList'
        try {
            return await postApi('docNum', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getDocNumSeq: async (payload, options) => {
        const url = '/selectDocNumSeq'
        try {
            return await postApi('docNum', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setDocNumSett: async (payload, options) => {
        const url = '/docNumSettwrite'
        try {
            return await postApi('docNum', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    // temporary
    setApproveTemp: (payload, additionalOptions) => {
        /*
        -- payload 형태, 
        payload = {
            url: '',
            payload: {
                siteMstrId: this.$cookies.get('siteMstrId'),
                codeType: '',
                codeDtlType: '',
                gjmcd: -mainCodeId,
                gjscd: -midCodeId,
                aprvOptnType: 'ALLON',
                docType: '',
            }
        }


        -- return 받을시 아래형태로 콜백형태로 사용할것
            .then(res => {

            })
            .catch(error => {
                console.error(error)
                throw new Error(error)
            })
        */
       
        const docSeqUrl = '/sendApi/api/docNum/selectDocNumSeq'
        const approveUrl = '/sendApi/api/approv/approvedDoc/write'
        const options = {
            headers: {
                'Authorization': VueCookies.get('Authorization'),
                'Content-Type': 'application/json',
                'Accept-Language': 'ko'
            },
            ...additionalOptions
        }

        axios.post(docSeqUrl, payload.payload, options)
            .then(docSeqRes => {
                const approvePayload = {
                    dmApprvDoc: {
                        ...payload.payload,
                        docSeq: docSeqRes.data,
                    }
                }
                axios.post(approveUrl, approvePayload, options)
                .then(approveRes => {
                    
                    const customPayload = {
                        ...payload.payload,
                        ...approveRes.data.datas.dmApprvDoc,
                    }
                        return axios.post(payload.url, customPayload ,options)
                    })
                    .catch(error => {
                        console.error(error)
                        throw new Error(error)
                    })
            })
            .catch(error => {
                console.error(error)
                throw new Error(error)
            })
    }
    
}