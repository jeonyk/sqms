const concrete = {
    namespaced: true,
  
    state: {
        compStrg: {},    // 강도관리 ID's
    },
  
    getters: {
        getCompStrg (state) {
            return state.compStrg
        },
    },
  
    mutations: {
        setCompStrg (state, payload) {
            state.compStrg = payload
        },
    },
    
    actions: {
        setCompStrg ({commit}, payload) {
            commit('setCompStrg', payload)
        },
    },
  }

export default concrete