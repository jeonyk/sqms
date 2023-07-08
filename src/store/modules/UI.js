
const ui = {
    namespaced: true,
    state: {
        language: '',
        timeZone: '',
        dateFormat: '',
        theme: '',

        projectName: '',

    },
    getters: {
        getLanguage (state) {
            return state.language
        },
        getTimeZone (state) {
            return state.timeZone
        },
        getDateFormat (state) {
            return state.dateFormat
        },
        getTheme (state) {
            return state.theme
        },

        getProjectName (state) {
            return state.projectName
        },
    },
    mutations: {
        setLanguage (state, payload) {
            state.language = payload
        },
        setTimeZone (state, payload) {
            state.timeZone = payload
        },
        setDateFormat (state, payload) {
            state.dateFormat = payload
        },
        setTheme (state, payload) {
            state.theme = payload
        },

        setProjectName(state, payload) {
            state.projectName = payload
        },
    },
    actions: {
        setLanguage({ commit }, payload) {
            commit('setLanguage', payload)
        },
        setTimeZone({ commit }, payload) {
            commit('setTimeZone', payload)
        },
        setDateFormat({ commit }, payload) {
            commit('setDateFormat', payload)
        },
        setTheme({ commit }, payload) {
            commit('setTheme', payload)
        },
        
        setProjectName({ commit }, payload) {
            commit('setProjectName', payload)
        },
    }
}


export default ui