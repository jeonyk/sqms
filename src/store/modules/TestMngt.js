
const testMngt = {
    namespaced: true,
    state: {
        testMngt: {
            checkList: {
                type: '',
            },
            mtrlSpApprId: '',
        }
    },
    getters: {
        getTestMngtCheckList(state) {
            return state.testMngt.checkList
        },
        getTestMngtMtrlSpApprId(state) {
            return state.testMngt.mtrlSpApprId
        },
    },
    mutations: {
        setTestMngtCheckList(state, payload) {
            state.testMngt.checkList = payload
        },
        setTestMngtMtrlSpApprId(state, payload) {
            state.testMngt.mtrlSpApprId = payload
        },
    },
    actions: {
        setTestMngtCheckList({ commit }, payload) {
            commit('setTestMngtCheckList', payload)
        },
        setTestMngtMtrlSpApprId({ commit }, payload) {
            commit('setTestMngtMtrlSpApprId', payload)
        },
    }
}

export default testMngt