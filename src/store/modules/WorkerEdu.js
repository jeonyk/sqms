
const workerEdu = {
    namespaced: true,
    state: {
        mainCode : '',
        midCode : '',
        langCode : '',        
        workerEduMtrlId : '',
        projectId : ''
    },
    getters: {
        getMainCode(state) {
            return state.mainCode
        },
        getMidCode(state) {
            return state.midCode
        },
        getLangCode(state) {
            return state.langCode
        },
        getWorkerEduMtrlId(state) {
            return state.workerEduMtrlId
        },
        getWorkerEdu(state){
            return state;
        },
        getProjectId(state){
            return state.projectId;
        },

    },
    mutations: {
        setMainCode(state, payload) {
            state.mainCode = payload
        },
        setMidCode(state, payload) {
            state.midCode = payload
        },
        setLangCode(state, payload) {
            state.langCode = payload
        },
        setWorkerEduMtrlId(state, payload) {
            state.workerEduMtrlId = payload
        },
        setProjectId(state, payload) {
            state.projectId = payload
        },
    },
    actions: {
        setMainCode({ commit }, payload) {
            commit('setMainCode', payload)
        },
        setMidCode({ commit }, payload) {
            commit('setMidCode', payload)
        },
        setLangCode({ commit }, payload) {
            commit('setLangCode', payload)
        },
        setWorkerEduMtrlId({ commit }, payload) {
            commit('setWorkerEduMtrlId', payload)
        },
        setWokerEduInit({ commit }) {
            commit('setMainCode', '');
            commit('setMidCode', '');
            commit('setLangCode', '');
            commit('setProjectId', '');
            commit('setWorkerEduMtrlId', '');
        },
        setWorkerEduinfo({ commit }, payload) {
            commit('setMainCode', payload.mainCode);
            commit('setMidCode', payload.mainCode);
            commit('setLangCode', payload.langCode);
            commit('setProjectId', payload.projectId);
            commit('setWorkerEduMtrlId', payload.workerEduMtrlId);
        },
        setProjectId({ commit }, payload) {
            commit('setProjectId', payload)
        },
    }
}

export default workerEdu