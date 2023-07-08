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
        crack: '/sendApi/api/quality/crackMngt',
        test:'/sendApi/api/testMngt/cost',
        file: '/sendApi/api/fileCall',
        site: '/sendApi/api/siteInfo',
        menu:'/sendApi/api/myWork/codeMngt',
        masterCode: '/sendApi/api/common/masterCode'
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
    getcrackList: async (payload, options) => {
        const url = '/info/list'
        try {
            return await postApi('crack', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    addCrackList: async (payload, options) => {
        const url = '/info/write'
        console.log(payload);
        try {
            return await postApi('crack', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getCrackInfoView: async (payload, options) => {
        const url = '/info/view'
        console.log(payload);
        try {
            return await postApi('crack', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setCrackInfo: async (payload, options) => {
        const url = '/info/change'
        console.log(payload);
        try {
            return await postApi('crack', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    setCrackDtl: async (payload, options) => {
        const url = '/dtl/change'
        console.log(payload);
        try {
            return await postApi('crack', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //품질관리비
    getSiteQltyCostData: async (payload, options) => {
        const url = '/list'
        console.log(payload);
        try {
            return await postApi('test', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getSiteQltyCostStandard: async (payload, options) => {
        const url = '/costList'
        console.log(payload);
        try {
            return await postApi('test', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    addCostHis: async (payload, options) => {
        const url = '/write'
        console.log(payload);
        try {
            return await postApi('test', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getAdmQltyCostReportList: async (payload, options) => {
        const url = '/report/list'
        console.log(payload);
        try {
            return await postApi('test', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getCostReportView: async (payload, options) => {
        const url = '/report/view'
        console.log(payload);
        try {
            return await postApi('test', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getCostIbsheetView: async (payload, options) => {
        const url = '/report/ibsheet/view'
        console.log(payload);
        try {
            return await postApi('test', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //현장정보
    getsiteList: async (payload, options) => {
        const url = '/popup/project/list'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //현장품질점검
    siteQltyPolicyInfoList: async (payload, options) => {
        const url = '/qltyPolicy/info/list'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    selectSiteQltyPolicyYear: async (payload, options) => {
        const url = '/qltyPolicy/info/year'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    selectSingleGoalList: async (payload, options) => {
        const url = '/qltyPolicy/info/goal'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    selectSingleInfoList: async (payload, options) => {
        const url = '/qltyPolicy/info/infoOnly'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    siteQltyPolicyInfoUpdate: async (payload, options) => {
        const url = '/qltyPolicy/info/infoUpdate'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    siteQltyPolicyGoalUpdate: async (payload, options) => {
        const url = '/qltyPolicy/info/goalUpdate'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    siteQltyPolicyGoalUnuse: async (payload, options) => {
        const url = '/qltyPolicy/info/goalUnuse'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //코드관리
    menuDepthStrctList: async (payload, options) => {
        const url = '/menuDepthStrct/list'
        try {
            return await postApi('menu', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    selectMenu: async (payload, options) => {
        const url = '/qltyMngt/selectMenu'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //품질시스템
    selectSiteQltyMngtName: async (payload, options) => {
        const url = '/qltyMngt/selectSite'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    selectSiteQltyMngtList: async (payload, options) => {
        const url = '/qltyMngt/list'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    siteQltyMngtUpdate: async (payload, options) => {
        const url = '/qltyMngt/update'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    siteQltyMngtUnuse: async (payload, options) => {
        const url = '/qltyMngt/unuse'
        try {
            return await postApi('site', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //코드관리
    masterCodeWrite: async (payload, options) => {
        const url = '/write'
        try {
            return await postApi('masterCode', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    selectMasterCode: async (payload, options) => {
        const url = '/view'
        try {
            return await postApi('masterCode', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    masterCodeChange: async (payload, options) => {
        const url = '/update'
        try {
            return await postApi('masterCode', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    // addAcceptTest: async (payload, options) => {
    //     const url = '/acceptTest/write'
    //     console.log(payload);
    //     try {
    //         return await postApi('materialSiteCheck', url, payload, options)
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // },
    // getAccptTestDtl: async (payload, options) => {
    //     const url = '/acceptTest/view'
    //     try {
    //         return await postApi('materialSiteCheck', url, payload, options)
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // },
    // setAcceptTestChange: async (payload, options) => {
    //     const url = '/acceptTest/change'
    //     try {
    //         return await postApi('materialSiteCheck', url, payload, options)
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // },
    // setSignInsert: async (payload, options) => {
    //     const url = '/acceptTest/approval'
    //     try {
    //         return await postApi('materialSiteCheck', url, payload, options)
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // },
    // setFile: async (fileConnectId, files, fileType = 'MeterialMngt' , options) => {
    //     const url = '/fileUploads'
    //     const formData = new FormData()
    //     formData.append('fileConnectId', fileConnectId)
    //     formData.append('fileType', fileType)
    //     files.forEach(file => formData.append('file', file))

    //     try {
    //         return await postApi('file', url, formData, options)
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // },
    
}