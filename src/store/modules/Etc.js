const etc = {
    namespaced: true,
    state: {
        loading: false,
    },
    getters: {
        getLoading (state) {
            return state.loading
        }
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        }
    },
    actions: {
        setLoading({commit}, payload) {
            commit('setLoading', payload)
        }
    },

}

export default etc