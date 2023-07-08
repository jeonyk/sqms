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
        inptHead: '/sendApi/api/inptMngt/headSetUp',
        inptSite:'/sendApi/api/inptMngt/siteSetUp',
        inpt:'/sendApi/api/inptMngt/inptSttus',
        file: '/sendApi/api/fileCall',
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
    //head setup
    getHeadSetupItpList: async (payload, options) => {
        const url = '/inptMngtITP/list'
        console.log(payload);
        try {
            return await postApi('inptHead', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setHeadSetupItpList: async (payload, options) => {
        const url = '/inptMngtITP/write'
        console.log(payload);
        try {
            return await postApi('inptHead', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getHeadSetupItrList: async (payload, options) => {
        const url = '/inptMngtITPChk/list'
        console.log(payload);
        try {
            return await postApi('inptHead', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getHeadSetupItrDtl: async (payload, options) => {
        const url = '/inptMngtITPChkInfo/list'
        console.log(payload);
        try {
            return await postApi('inptHead', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    writeHeadSetupItrDtl: async (payload, options) => {
        const url = '/inptMngtITPChk/write'
        console.log(payload);
        try {
            return await postApi('inptHead', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setHeadSetupItrDtl: async (payload, options) => {
        const url = '/inptMngtITPChk/change'
        console.log(payload);
        try {
            return await postApi('inptHead', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    delHeadSetupItrCheckList: async (payload, options) => {
        const url = '/inptMngtITPChk/delete'
        console.log(payload);
        try {
            return await postApi('inptHead', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //site: itpSelect
    getinptSiteSetUpITPList: async (payload, options) => {
        const url = '/inptITP/list'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setinptSiteSetUpITPList: async (payload, options) => {
        const url = '/inptITP/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //site: itpWrite
    inptITPWritngList: async (payload, options) => {
        const url = '/inptITPWritng/list'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptITPWritngWrite: async (payload, options) => {
        const url = '/inptITPWritng/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptITPWritngLastWrite: async (payload, options) => {
        const url = '/inptITPWritngLast/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    otrPrjctDataList: async (payload, options) => {
        const url = '/otrPrjctData/list'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    otrPrjctDataChoiceWrite: async (payload, options) => {
        const url = '/otrPrjctDataChoice/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    otrPrjctDataAllWrite: async (payload, options) => {
        const url = '/otrPrjctDataAll/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //site: itpList
    siteItpDataList: async (payload, options) => {
        const url = '/siteItpData/list'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    siteItpDataDelete: async (payload, options) => {
        const url = '/siteItpData/delete'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //site: itrList
    getinptSiteSetUpITRList: async (payload, options) => {
        const url = '/siteItpChkTitle/list'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    headITRChkTitleList: async (payload, options) => {
        const url = '/headItpChkTitle/list'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    headITRChkDataChoiceCopyWrite: async (payload, options) => {
        const url = '/headItpChkDataChoice/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
   headITRChkDataAllCopyWrite: async (payload, options) => {
        const url = '/headItpChkDataAll/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getOtherSiteSetUpITRList: async (payload, options) => {
        const url = '/otrItpChkTitle/list'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    writeOtherSiteSetUpITRList: async (payload, options) => {
        const url = '/otrItpChkDataChoice/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    writeOtherSiteSetUpITRListAll: async (payload, options) => {
        const url = '/otrItpChkDataAll/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    siteITPChkDataWrite: async (payload, options) => {
        const url = '/siteItpChkData/write'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    siteITPChkDataDtl: async (payload, options) => {
        const url = '/siteItpChkData/list'
        console.log(payload);
        try {
            return await postApi('inptSite', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //현황 - list
    inptSttusMySiteList: async (payload, options) => {
        const url = '/inptSttusMy/list'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptSttusAditWrite: async (payload, options) => {//추가검측
        const url = '/inptSttusAdit/write'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptSttusInptCopyWrite: async (payload, options) => {//검측복사
        const url = '/inptSttusInptCopy/write'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptSttusWrite: async (payload, options) => {
        const url = '/inptSttus/write'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptSttusDetailView: async (payload, options) => {
        const url = '/inptSttusDetail/view'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptSttusChange: async (payload, options) => {
        const url = '/inptSttus/change'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptSttusDelete: async (payload, options) => {
        const url = '/inptSttus/delete'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },

    //요청서
    inptSttusRequstDocList: async (payload, options) => {
        const url = '/inptSttusRequstDoc/list'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptSttusRequstDocWrite: async (payload, options) => {
        const url = '/inptSttusRequstDoc/write'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    requstDocAprvRecomWrite: async (payload, options) => {
        const url = '/requstDocAprvRecom/write'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    /* 통보서 작성완료 */
    ntcdocCompt : async (payload, options) => {
        const url = '/inptSttusNtcdocCompt/write'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    
    //통보서
    inptSttusResultNtcdocList: async (payload, options) => {//통보상세
        const url = '/inptSttusResultNtcdoc/list'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    inptSttusResultNtcdocWrite: async (payload, options) => {
        const url = '/inptSttusResultNtcdoc/write'
        console.log(payload);
        try {
            return await postApi('inpt', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
}