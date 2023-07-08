import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
// import VueCookies from 'vue-cookies'
import VueSession from 'vue-session'

const ls = new SecureLS({isCompression: false})

Vue.use(Vuex)
Vue.use(VueSession, {
    persist: true
})

import AuthStore from './modules/Auth.js'
import UIStore from './modules/UI.js'
import QualityStore from './modules/Quality.js'
import TestMngtStore from './modules/TestMngt.js'
import TempStore from './modules/Temp.js'
import TabInfoStore from './modules/TabInfo.js'
import MyWorkStore from './modules/MyWork.js'
import Concrete from './modules/Concrete.js'
import EtcStore from './modules/Etc.js'
import WorkerEdu from './modules/WorkerEdu.js'

const store = new Vuex.Store({
    
    modules: {
        auth: AuthStore,
        ui: UIStore,
        
        quality: QualityStore,
        testMngt: TestMngtStore,
        tabInfo: TabInfoStore,
        temp: TempStore,
        myWork: MyWorkStore,
        conc: Concrete,
        etc: EtcStore,
        workerEdu: WorkerEdu,
    },
    
    plugins: [
        // localStorage
        createPersistedState({
            key: 'sqms_ls',
            paths: [
                'temp', 
                // 'tabInfo', 
                'quality',
                'testMngt',
                'ui',
                'myWork',
                'conc',
            ],
            // secure-LS
            storage: {
                getItem: (key) => {
                    return ls.get(key)
                },
                setItem: (key, value) => {
                    return ls.set(key, value)
                },
                removeItem: (key) => {
                    return ls.remove(key)
                },
            },
            // reducer 확인해볼것
            // reducer (value) {
            //     console.log('persistedState == ', value)
            //     // if(!value) {
            //     //     return {}
            //     // }
            //     return value
            // },
        }),
        // sessionStorage
        createPersistedState({
            key: 'sqms_ss',
            storage: window.sessionStorage,
            // storage: {
            //     getItem: (key) => {
            //         return Vue.prototype.$session.get(key)
            //     },
            //     setItem: (key, value) => {
            //         return Vue.prototype.$session.set(key, value)
            //     },
            //     removeItem: (key) => {
            //         return Vue.prototype.$session.remove(key)
            //     },
            //},
            paths: ['auth','tabInfo','workerEdu']
        }),
    ],
    
    
})


export default store