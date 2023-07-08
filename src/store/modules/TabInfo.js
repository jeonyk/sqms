const tabInfo = {
    namespaced: true,
    state: {
        // tabList Info
        tabs: {
            list: [],
            currentMenuId: null,
            current: null,
            before : null,
            writeYn : null,
            changeYn : null,
            unuseYn : null,
            viewYn : null,
            downYn : null
        },
        
        moveTab : null,
        moveMenu : null,

        // tabList Datas
        data: [],
        tabHistory : [],
        keepAliveList : [],
        savePage : [],
        menuList : [],
    },
    getters: {
        getTabs(state) {
            return state.tabs
        },
        getTabsList(state) {
            return state.tabs.list
        },
        getCurrentMenuId(state) {
            return state.tabs.currentMenuId; 
        },
        getbefore(state) {
            return state.tabs.before;
        },
        getData(state) {
            return state.data
        },
        getIsKeepAlive(state) {
            return state.isKeepAlive
        },
        getKeepAliveList(state) {
            return state.keepAliveList
        },
        getTabHistory(state) {
            return state.tabHistory
        },
        getSavePage(state) {
            return state.savePage
        },
        getMenuList(state) {
            return state.menuList
        },
        getMoveTab(state) {
            return state.moveTab
        },
        getMoveMenu(state) {
            return state.moveMenu
        }

    },
    mutations: {
        setTabs(state, payload) {
            state.tabs = payload
        },
        setBefore(state, payload) {
            state.tabs.before = payload
        },
        setData(state, payload) {
            state.data = payload
        },
        setIsKeepAlive(state, payload) {
            state.isKeepAlive = payload
        },
        setKeepAliveList(state, payload) {
            
            const idx = state.keepAliveList.indexOf(payload);

            if (idx == -1) { 
                state.keepAliveList.push(payload)
            }
        },
        removeKeepAliveList(state, payload) {
            
            const idx = state.keepAliveList.indexOf(payload);
            if (idx > -1) { 
                state.keepAliveList.splice(idx, 1);
            }
        },
        setChangePath(state, payload){
            state.tabs.list[payload.index].path = payload.path;
        },
        setTabHistory(state, payload) {
            state.tabHistory.push(payload)
        },
        removeTabHistory(state, payload) {
            for(let i = state.tabHistory.length-1; i >= 0  ; i--){
                if(state.tabHistory[i].routerName ==  payload){                            
                    state.tabHistory.splice(i, 1);
                }       
            }
        },
        setCloseTab(state, payload) {
            let tabRemove = 0;
            
            // 닫히는 텝의 히스토리, keepAlive 제거처리
            for(let i = state.tabHistory.length-1; i >= 0  ; i--){
                if(state.tabHistory[i].name ==  payload){
                    const idx = state.keepAliveList.indexOf(state.tabHistory[i].routerName);
                    
                    if (idx > -1) { 
                        state.keepAliveList.splice(idx, 1);
                    }                    
                    state.tabHistory.splice(i, 1);
                    tabRemove = i;
                }
                
            }

            //중간에 텝을 삭제되는 경우 처리
            for(let j = 0 ; j < state.tabHistory.length  ; j++){
                if(state.tabHistory[j].tabIndex > tabRemove) {                    
                    state.tabHistory[j].tabIndex = state.tabHistory[j].tabIndex - 1;
                }
            }
        },
        allTabClose(state) {
            state.tabs = {
                list: [],
                currentMenuId: null,
                current: null,
                before : null,
                writeYn : null,
                changeYn : null,
                unuseYn : null,
                viewYn : null,
                downYn : null
            };

            state.moveTab = null;
            state.tabHistory = [];
            state.keepAliveList = [];
            state.savePage = [];
        },
        otherTabClose( state, payload ) {
            const tmpTabHistory = state.tabHistory.find(tab => tab.routerName === payload)
            const tmpTabsList   = state.tabs.find(tab => tab.routerName === payload)

            state.tabs = {
                list:           [tmpTabsList],
                currentMenuId:  tmpTabsList.menuMngtId,
                current:        0,
                before:         0,
                writeYn:        tmpTabsList.writeYn,
                changeYn:       tmpTabsList.changeYn,
                unuseYn:        tmpTabsList.unuseYn,
                viewYn:         tmpTabsList.viewYn,
                downYn:         tmpTabsList.downYn 
            }
            state.moveTab       = null
            state.tabHistory    = []
            state.keepAliveList = []
            state.savePage      = [payload]
            
        },
        setSavePage(state ,payload) {

            let idx = state.savePage.indexOf(payload); 

            if(idx == -1){
                state.savePage.push(payload)
            }
        },
        reMoveSavePage(state ,payload) {

            let idx = state.savePage.indexOf(payload); 

            if(idx != -1){
                state.savePage.splice(idx, 1);
            }
        },
        setMenuList(state, payload) {
            state.menuList = payload;
        },
        pushTabsList(state, payload) {
            state.tabs.list.push(payload)
        },
        setTabInfo(state, payload) {
            state.tabs.currentMenuId = payload.currentMenuId,
            state.tabs.current = payload.current,
            state.tabs.writeYn = payload.writeYn,
            state.tabs.changeYn = payload.changeYn,
            state.tabs.unuseYn = payload.unuseYn,
            state.tabs.viewYn = payload.viewYn,
            state.tabs.downYn = payload.downYn
        },
        setMoveTab(state, payload) {
            state.moveTab = payload;
        },
        setMoveMenu(state, payload) {
            state.moveMenu = payload;
        }
    },
    actions: {
        setTabs({commit}, payload) {
            commit('setTabs', payload)
        },
        setBefore({commit}, payload) {
            commit('setBefore', payload)
        },
        setData({commit}, payload) {
            commit('setData', payload)
        },
        setIsKeepAlive({commit}, payload) {
            commit('setIsKeepAlive', payload)
        },
        setKeepAliveList({commit}, payload) {
            commit('setKeepAliveList', payload)
        },
        removeKeepAliveList({commit}, payload) {
            commit('removeKeepAliveList', payload)
        },
        setChangePath({commit}, payload) {
            commit('setChangePath', payload)
        },
        setTabHistory({commit}, payload) {
            commit('setTabHistory', payload)
        },
        setCloseTab({commit}, payload) {
            commit('setCloseTab', payload)
        },
        allTabClose({commit}) {
            commit('allTabClose')
        },
        otherTabClose({commit}, payload) {
            commit('otherTabClose', payload)
        },
        setSavePage({commit}, payload) {
            commit('setSavePage', payload)
        },
        reMoveSavePage({commit}, payload) {
            commit('reMoveSavePage', payload)
        },
        setMenuList({commit}, payload) {
            commit('setMenuList', payload)
        },
        pushTabsList({commit}, payload) {
            commit('pushTabsList', payload)
        },
        setTabInfo({commit}, payload) {
            commit('setTabInfo', payload)
        },
        setMoveTab({commit}, payload) {
            commit('setMoveTab', payload)
        },
        removeTabHistory({commit}, payload) {
            commit('removeTabHistory', payload)
        },
        setMoveMenu({commit}, payload) {
            commit('setMoveMenu', payload)
        }
    }
}

export default tabInfo