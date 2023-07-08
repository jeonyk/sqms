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
        material: '/sendApi/api/quality/materialMngt',
        materialSiteCheck: '/sendApi/api/quality/materialSiteCheck',
        file: '/sendApi/api',
        null :'/sendApi',
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
    getCategoryData: async () => {
        const url = '/codeCategory/list'
        try {
            return await postApi('material', url)
        } catch (error) {
            throw new Error(error)
        }
    },
    getProjectDetailList: async (payload, options) => {
        const url = '/projectDetail/list'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setProjectDetailList: async (payload, options) => {
        const url = '/projectDetail/change'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getNewProductList: async (payload, options) => {
        const url = '/materialNewProduct/list'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    addNewProductList: async (payload, options) => {
        const url = '/materialNewProduct/add'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    delNewProductList: async (payload, options) => {
        const url = '/materialNewProduct/unUse'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    mapNewProductList: async (payload, options) => {
        const url = '/materialNewProduct/mapping'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    
    getProjectCheckList: async (payload, options) => {
        const url = '/projectCheckList/list'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setProjectCheckList: async (payload, options) => {
        const url = '/projectCheckList/change'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getSiteDetailList: async (payload, options) => {
        const url = '/siteDetail/list'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setSiteDetailList: async (payload, options) => {
        const url = '/siteDetail/change'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getSiteCheckList: async (payload, options) => {
        const url = '/siteCheckList/list'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    addSiteCheckList: async (payload, options) => {
        const url = '/siteCheckList/write'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setSiteCheckList: async (payload, options) => {
        const url = '/siteCheckList/change'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getSourceApprovalList: async (payload, options) => {
        const url = '/sourceApproval/list'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getSourceApprovalAllList: async (payload, options) => {
        console.log('all')
        const url = '/sourceApprovalAll/list'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getSourceApproval: async (payload, options) => {
        const url = '/sourceApproval/view'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    addSourceApproval: async (payload, options) => {
        const url = '/sourceApproval/write'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setSourceApproval: async (payload, options) => {
        const url = '/sourceApproval/change'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    delSourceApproval: async (payload, options) => {
        const url = '/sourceApproval/unuse'
        try {
            return await postApi('material', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    addAcceptTestList: async (payload, options) => {
        const url = '/acceptTest/write'
        console.log(payload);
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getAccptTestList: async (payload, options) => {
        const url = '/acceptTest/list'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getAccptTestDtl: async (payload, options) => {
        const url = '/acceptTest/view'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setAcceptTestChange: async (payload, options) => {
        const url = '/acceptTest/change'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getDocSeq: async (payload, options) => {//문서번호 가져오기(자재 공통)
        const url = '/api/docNum/selectDocNumSeq'
        try {
            return await postApi('null', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setAccpSignInsert: async (payload, options) => {
        const url = '/acceptTest/approval'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    acceptTestSubHisDtl: async (payload, options) => {
        const url = '/acceptTestSubHis/view'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setAcceptTestSubHisChange: async (payload, options) => {
        const url = '/acceptTestSubHis/change'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getFactoryTestList: async (payload, options) => {
        const url = '/factoryTest/list'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    addFactoryTestWrite: async (payload, options) => {
        const url = '/factoryTest/write'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getFactoryTestView: async (payload, options) => {
        const url = '/factoryTest/view'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setFactoryTestChange: async (payload, options) => {
        const url = '/factoryTest/change'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setFtrySignInsert: async (payload, options) => {
        const url = '/acceptTest/approval'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getRemiconCode: async (payload, options) => {
        const url = '/factoryTest/remiconCode'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getFileList: async (payload, options) => {
        const url = '/file/upFileList'
        try {
            return await postApi('file', url, {
                fileType: 'MeterialMngt',
                ...payload
            }, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setFile: async (fileConnectId, files = null, fileType = 'MeterialMngt' , copiedFileIds = null ,options) => {
        const url = '/fileUp/fileUploads'
        const formData = new FormData()
        formData.append('fileConnectId', fileConnectId)
        formData.append('fileType', fileType)
        if(files){
            files.forEach(file => formData.append('file', file))
        }
        if (copiedFileIds) {
            // console.log('copied',copiedFileIds.toString());
            formData.append("fileCopyIds", copiedFileIds.toString())
        };
        try {
            return await postApi('file', url, formData, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    delFile: async (payload, options) => {
        const url = '/file/fileUnUse'
        try {
            return await postApi('file', url, {
                fileType: 'MeterialMngt',
                ...payload,
            }, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    getApprovalOption: async (payload, options) => {
        const url ='/apvlOptn/approvalOption/view'
        try {
            return await postApi('file', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    setApprovalOption: async (payload, options) => {
        const url ='/apvlOptn/approvalOption/change'
        try {
            return await postApi('file', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    acceptTestUnuse: async (payload, options) => {
        const url ='/acceptTest/unuse'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    factoryTestUnuse: async (payload, options) => {
        const url ='/factoryTest/unuse'
        try {
            return await postApi('materialSiteCheck', url, payload, options)
        } catch (error) {
            throw new Error(error)
        }
    },
    
}