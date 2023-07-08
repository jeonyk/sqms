
const quality = {
    namespaced: true,
    state: {
        material: {
            checkList: {
                type: '',
            },
            projectCheckList: {},
            siteCheckList: {},
            mtrlSpApprId: '',
            siteMstrId: ''
        }
    },
    getters: {
        getMaterialCheckList(state) {
            return state.material.checkList
        },
        getMaterialProjectCheckList(state) {
            return state.material.projectCheckList
        },
        getMaterialSiteCheckList(state) {
            return state.material.siteCheckList
        },
        getMaterialMtrlSpApprId(state) {
            return state.material.mtrlSpApprId
        },
        getMaterialSiteMstrId(state) {
            return state.material.siteMstrId
        },
    },
    mutations: {
        setMaterialCheckList(state, payload) {
            state.material.checkList = payload
        },
        setMaterialProjectCheckList(state, payload) {
            state.material.projectCheckList = payload
        },
        setMaterialSiteCheckList(state, payload) {
            state.material.siteCheckList = payload
        },
        setMaterialMtrlSpApprId(state, payload) {
            state.material.mtrlSpApprId = payload
        },
        setMaterialSiteMstrId(state, payload) {
            state.material.siteMstrId = payload
        },
    },
    actions: {
        setMaterialCheckList({ commit }, payload) {
            commit('setMaterialCheckList', payload)
        },
        setMaterialProjectCheckList({ commit }, payload) {
            commit('setMaterialProjectCheckList', payload)
        },
        setMaterialSiteCheckList({ commit }, payload) {
            commit('setMaterialSiteCheckList', payload)
        },
        setMaterialMtrlSpApprId({ commit }, payload) {
            commit('setMaterialMtrlSpApprId', payload)
        },
        setMaterialSiteMstrId({ commit }, payload) {
            commit('setMaterialSiteMstrId', payload)
        },
    }
}

export default quality