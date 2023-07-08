
const temp = {
    namespace: true,
    state: {
        information: {},

        extCheck: {
            extrnlChckId: null,
            poutDcsnDiv: false,
            demLastDcsnYn: false,
            supportType: '',

            insctrId: '',
            extrnlInsttId: '',
        }
    },
    getters: {
        getInformation (state) {
            return state.information
        },
        getExtCheckExtrnlChckId (state) {
            return state.extCheck.extrnlChckId
        },
        getExtCheckPoutDcsnDiv (state) {
            return state.extCheck.poutDcsnDiv
        },
        getExtCheckDemLastDcsnYn (state) {
            return state.extCheck.demLastDcsnYn
        },
        getExtCheckInsctrId (state) {
            return state.extCheck.insctrId
        },
        getExtCheckExtrnlInsttId (state) {
            return state.extCheck.extrnlInsttId
        },
        getExtCheckSupportType (state) {
            return state.extCheck.supportType
        },
    },
    mutations: {
        setInformation (state, payload) {
            state.information = payload
        },
        setExtCheckExtrnlChckId (state, payload) {
            state.extCheck.extrnlChckId = payload
        },
        setExtCheckPoutDcsnDiv (state, payload) {
            state.extCheck.poutDcsnDiv = payload
        },
        setExtCheckDemLastDcsnYn (state, payload) {
            state.extCheck.demLastDcsnYn = payload
        },
        setExtCheckInsctrId (state, payload) {
            state.extCheck.insctrId = payload
        },
        setExtCheckExtrnlInsttId (state, payload) {
            state.extCheck.extrnlInsttId = payload
        },
        setExtCheckSupportType (state, payload) {
            state.extCheck.supportType = payload
        },
    },
    actions: {
        setInformation({ commit }, payload) {
            commit('setInformation', payload)
        },
        setExtCheckExtrnlChckId({ commit }, payload) {
            commit('setExtCheckExtrnlChckId', payload)
        },
        setExtCheckPoutDcsnDiv({ commit }, payload) {
            commit('setExtCheckPoutDcsnDiv', payload)
        },
        setExtCheckDemLastDcsnYn({ commit }, payload) {
            commit('setExtCheckDemLastDcsnYn', payload)
        },
        setExtCheckInsctrId({ commit }, payload) {
            commit('setExtCheckInsctrId', payload)
        },
        setExtCheckExtrnlInsttId({ commit }, payload) {
            commit('setExtCheckExtrnlInsttId', payload)
        },
        setExtCheckSupportType({ commit }, payload) {
            commit('setExtCheckSupportType', payload)
        },
        
        
    }
}

export default temp