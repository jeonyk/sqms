
import axios from 'axios'

const config = {
    options: {
        headers: {
            "Content-Type": "application/json;",
            "Accept-Language": "ko",
        }
    },
    material: {
        url: '/sendApi/api/quality/materialMngt'
    }
}

export async function sendPostApi(callUrl, payload, options) {
    return await axios.post(
        `${config.material.url}${callUrl}`,
        payload,
        options ? options : config.options
    )
}

export default {
    async getCategoryData () {
        const url = '/codeCategory/list'
        return sendPostApi(url, null)
    },
    async getProjectDetailList (payload, options) {
        const url = '/projectDetail/list'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async setProjectDetailList (payload, options) {
        const url = '/projectDetail/change'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async getProjectCheckList (payload, options) {
        const url = '/projectCheckList/list'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async setProjectCheckList (payload, options) {
        const url = '/projectCheckList/change'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async getSiteDetailList (payload, options) {
        const url = '/siteDetail/list'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async setSiteDetailList (payload, options) {
        const url = '/siteDetail/change'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async getSiteCheckList (payload, options) {
        const url = '/siteCheckList/list'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async insertSiteCheckList (payload, options) {
        const url = '/siteCheckList/write'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async setSiteCheckList (payload, options) {
        const url = '/siteCheckList/change'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async getSourceApprovalList (payload, options) {
        const url = '/sourceApproval/list'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async getSourceApprovalView (payload, options) {
        const url = '/sourceApproval/view'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async insertSourceApprovalList (payload, options) {
        const url = '/sourceApproval/write'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
    async setSourceApprovalList (payload, options) {
        const url = '/sourceApproval/change'
        return sendPostApi(url, payload, {
            ...config.options,
            ...options
        })
    },
}