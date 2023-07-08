const myWork = {
    namespaced: true,
    state: {
        aprvInfoId: '',
        aprvDoc: {},
        admin: {},    // 사용자 관리
    },
    getters: {
        getAprvInfoId (state) {
            return state.aprvInfoId
        },
        getAprvDoc (state) {
            return state.aprvDoc
        },
        getAdmin (state) {
            return state.admin
        },
    },
    mutations: {
        setAprvInfoId (state, payload) {
            state.aprvInfoId = payload
        },
        setAprvDoc (state, payload) {
            state.aprvDoc = payload
        },
        setAdmin (state, payload) {
            state.admin = payload
        },
    },
    actions: {
        setAprvInfoId ({commit}, payload) {
            commit('setAprvInfoId', payload)
        },
        setAprvDoc ({commit}, payload) {
            commit('setAprvDoc', payload)
        },
        setAdmin ({commit}, payload) {
            commit('setAdmin', payload)
        },
    },

}

export default myWork