
const auth = {
    namespaced: true,
    state: {
        userId: '',
        userNm: '',
        userType: '',

        jobTitle: '',
        jobRoleNm: '',
        email: '',    
        hp: '' ,

        currentIp : '',
        loginIp: '' ,
        finalLoginDttm: '' ,
        
        isOpen : false,
        isReflash : false,

        token: '',

        siteMstrId: '',
        projectId: '',
        projectNm: '',
        siteId :  '',
        siteNm : '',
        baseCd : '',
        baseType : '',
        baseTypeName : '',
        gongsaTypeCd : '',
        gongsaTypeNm : '',
        // 수정 내역
        baseTypeNm: '',
        csrtType:   '',
        csrtTypeNm: '',


        tradeId : '',
        tradeNm : '',
        tradeType: '',

        groupAuthInfoId : '',
        groupAuthDtlId : '',

        locale : '',

        workLocCd:'',

        //작업자교육관련 추가
        sex : '',                       //성별
        nationality : '',               //국적
        nationalityCd : '',             //국적코드
    },
    getters: {
        getUserId (state) {
            return state.userId
        },
        getUserNm (state) {
            return state.userNm
        },
        getUserType (state) {
            return state.userType
        },
        getJobTitle (state) {
            return state.jobTitle
        },
        getJobRoleNm (state) {
            return state.jobRoleNm
        },
        getEmail (state) {
            return state.email
        },
        getHp (state) {
            return state.hp
        },
        getToken (state) {
            return state.token
        },
        getIsOpen (state) {
            return state.isOpen
        },
        getIsReflash(state) {
            return state.isReflash
        },
        getSiteMstrId (state) {
            return state.siteMstrId
        },
        getProjectId (state) {
            return state.projectId
        },
        getProjectNm (state) {
            return state.projectNm
        },
        getSiteId (state) {
            return state.siteId
        },
        getSiteNm (state) {
            return state.siteNm
        },
        getBaseCd (state) {
            return state.baseCd
        },
        getBaseType (state) {
            return state.baseType
        },
        getBaseTypeName (state) {
            return state.baseTypeName
        },
        getGongsaTypeCd (state) {
            return state.gongsaTypeCd
        },
        getGongsaTypeNm (state) {
            return state.gongsaTypeNm
        },
        getBaseTypeNm (state) {
            return state.baseTypeNm
        },
        getCsrtType (state) {
            return state.csrtType
        },
        getCsrtTypeNm (state) {
            return state.csrtTypeNm
        },
        getTradeId (state) {
            return state.tradeId
        },
        getTradeNm (state) {
            return state.tradeNm
        },
        getTradeType (state) {
            return state.tradeType
        },
        getAuth (state){
            return state;
        },
        getCurrentIp (state) {
            return state.currentIp
        },
        getLoginIp (state) {
            return state.loginIp
        },
        getFinalLoginDttm (state) {
            return state.finalLoginDttm
        },
        getGroupAuthInfoId (state) {
            return state.groupAuthInfoId
        },
        getGroupAuthDtlId (state) {
            return state.groupAuthDtlId
        },
        getLoacale (state) {
            return state.locale
        },
        getWorkLocCd(state){
            return state.workLocCd
        },
        getSex (state) {
            return state.sex
        },
        getNationality (state) {
            return state.nationality
        },
        getNationalityCd (state) {
            return state.nationalityCd
        },
        getOzTypeList (state) {
            return state.ozTypeList
        }
    },
    mutations: {
        setUserId (state, payload) {
            state.userId = payload
        },
        setUserNm (state, payload) {
            state.userNm = payload
        },
        setUserType (state, payload) {
            state.userType = payload
        },
        setJobTitle (state, payload) {
            state.jobTitle = payload
        },
        setJobRoleNm (state, payload) {
            state.jobRoleNm = payload
        },
        setEmail (state, payload) {
            state.email = payload
        },
        setHp (state, payload) {
            state.hp = payload
        },
        setToken (state, payload) {
            state.token = payload
        },
        setIsOpen (state, payload) {
            state.isOpen = payload
        },
        setIsReflash (state, payload) {
            state.isReflash = payload
        },
        setSiteMstrId (state, payload) {
            state.siteMstrId = payload
        },
        setProjectId (state, payload) {
            state.projectId= payload
        },
        setProjectNm (state, payload) {
            state.projectNm = payload
        },
        setSiteId (state, payload) {
            state.siteId = payload
        },
        setSiteNm (state, payload) {
            state.siteNm = payload
        },
        setBaseCd (state, payload) {
            state.baseCd = payload
        },
        setBaseType (state, payload) {
            state.baseType = payload
        },
        setBaseTypeName (state, payload) {
            let baseTypeName = "";
            switch(payload) {
                case '4000' : 
                    baseTypeName = "건축"; 
                    break;
                case '1000' :
                    baseTypeName = "인프라"; 
                    break;
            }
            state.baseTypeName = baseTypeName
        },
        setBaseTypeNm (state, payload) {
            state.baseTypeNm = payload
        },
        setCsrtType (state, payload) {
            state.csrtType = payload
        },
        setCsrtTypeNm (state, payload) {
            state.csrtTypeNm = payload
        },
        setGongsaTypeCd (state, payload) {
            state.gongsaTypeCd = payload
        },
        setGongsaTypeNm (state, payload) {
            state.gongsaTypeNm = payload
        },
        setTradeId (state, payload) {
            state.tradeId = payload
        },
        setTradeNm (state, payload) {
            state.tradeNm = payload
        },         
        setTradeType (state, payload) {
            state.tradeType = payload
        },         
        setCurrentIp (state, payload) {
            state.currentIp = payload
        },
        setLoginIp (state, payload) {
            state.loginIp = payload
        },
        setFinalLoginDttm (state, payload) {
            state.finalLoginDttm = payload
        },
        setGroupAuthInfoId (state, payload) {
            state.groupAuthInfoId = payload
        },
        setGroupAuthDtlId (state, payload) {
            state.groupAuthDtlId = payload
        },
        setLoacale (state, payload) {
            state.locale = payload
        },
        setWorkLocCd(state, payload){
            state.workLocCd = payload
        },
        setSex (state, payload) {
            state.sex = payload
        },
        setNationality (state, payload) {
            state.nationality = payload
        },
        setNationalityCd (state, payload) {
            state.nationalityCd = payload
        },
        setOzTypeList (state, payload) {
            state.ozTypeList = payload
        },
    },
    actions: {
        setUserId ({ commit }, payload) {
            commit('setUserId', payload)
        },
        setUserNm ({ commit }, payload) {
            commit('setUserNm', payload)
        },
        setUserType ({ commit }, payload) {
            commit('setUserType', payload)
        },
        
        setJobTitle({ commit }, payload) {
            commit('setJobTitle', payload)
        },
        setJobRoleNm({ commit }, payload) {
            commit('setJobRoleNm', payload)
        },
        setEmail({ commit }, payload) {
            commit('setEmail', payload)
        },
        setHp({ commit }, payload) {
            commit('setHp', payload)
        },
        setToken ({ commit }, payload) {
            commit('setToken', payload)
        },
        setUserInfo({ commit }, payload) {
            commit('setUserId', payload.userId)
            commit('setUserNm', payload.userNm)
            commit('setUserType', payload.userType)
            commit('setJobTitle', payload.jobTitle)
            commit('setJobRoleNm', payload.jobRoleNm)
            commit('setEmail', payload.email)
            commit('setHp', payload.hp)
            commit('setTradeId', payload.tradeId)
            commit('setTradeNm', payload.tradeNm)
            commit('setTradeType', payload.tradeType)
            commit('setCurrentIp', payload.currentIp)
            commit('setLoginIp', payload.loginIp)
            commit('setFinalLoginDttm', payload.finalLoginDttm)
            commit('setGroupAuthInfoId', payload.groupAuthInfoId)
            commit('setGroupAuthDtlId', payload.groupAuthDtlId)
            commit('setSex', payload.sex)
            commit('setNationality', payload.nationality)
            commit('setNationalityCd', payload.nationalityCd)
            commit('setWorkLocCd', payload.workLocCd)
        },
        setIsOpen ({ commit }, payload) {
            commit('setIsOpen', payload)
        },
        setIsReflash ({ commit }, payload) {
            commit('setIsReflash', payload)
        },
        setInitData ({ commit }) {
            commit('setUserId', '');
            commit('setUserNm', '');
            commit('setUserType', '');
            commit('setJobTitle', '');
            commit('setJobRoleNm', '');
            commit('setEmail', '');
            commit('setHp', '');
            commit('setSiteMstrId', '');
            commit('setProjectId', '');
            commit('setProjectNm', '');            
            commit('setSiteId', '');
            commit('setSiteNm', '');
            commit('setBaseCd', '');
            commit('setBaseType', '');
            commit('setBaseTypeName', '');
            commit('setGongsaTypeCd', '');
            commit('setGongsaTypeNm', '');
            commit('setBaseTypeNm', '');
            commit('setCsrtType', '');
            commit('setCsrtTypeNm', '');
            commit('setTradeId', '');
            commit('setTradeNm', '');
            commit('setTradeType', '');

            commit('setIsOpen', false);
            commit('setIsReflash', false);

            commit('setCurrentIp', '')
            commit('setLoginIp', '')
            commit('setFinalLoginDttm', '')
            commit('setGroupAuthInfoId', '')
            commit('setGroupAuthDtlId', '')

            commit('setSex', '')
            commit('setNationality', '')
            commit('setNationalityCd', '')
        },
        setSiteMstrId({ commit }, payload) {
            commit('setSiteMstrId', payload)
        },
        setProjectId({ commit }, payload) {
            commit('setProjectId', payload)
        },
        setProjectNm({ commit }, payload) {
            commit('setProjectNm', payload)
        },
        setSiteId({ commit }, payload) {
            commit('setSiteId', payload)
        },
        setSiteNm({ commit }, payload) {
            commit('setSiteNm', payload)
        },
        setBaseCd({ commit }, payload) {
            commit('setBaseCd', payload)
        },
        setBaseType({ commit }, payload) {
            commit('setBaseType', payload)
        },
        setBaseTypeName({ commit }, payload) {
            commit('setBaseTypeName', payload)
        },
        setGongsaTypeCd({ commit }, payload) {
            commit('setGongsaTypeCd', payload)
        },
        setGongsaTypeNm({ commit }, payload) {
            commit('setGongsaTypeNm', payload)
        },
        setTradeId({ commit }, payload) {
            commit('setTradeId', payload)
        },
        setTradeNm({ commit }, payload) {
            commit('setTradeNm', payload)
        },
        setProjectInfo({ commit }, payload){
            commit('setSiteMstrId', payload.siteMstrId);
            commit('setProjectId', payload.projectId);
            commit('setProjectNm', payload.projectNm);
            commit('setSiteId', payload.siteId);
            commit('setSiteNm', payload.siteNm);
            commit('setBaseCd', payload.baseCd);
            commit('setBaseType', payload.baseType);
            // commit('setBaseTypeName', payload.baseTypeName);
            commit('setBaseTypeName', payload.baseType);
            commit('setGongsaTypeCd', payload.gongsaTypeCd);
            commit('setGongsaTypeNm', payload.gongsaTypeNm);
            commit('setBaseTypeNm', payload.baseTypeNm);
            commit('setCsrtType', payload.csrtType);
            commit('setCsrtTypeNm', payload.csrtTypeNm);
        },
        setInitProjectInfo({ commit }){
            commit('setSiteMstrId', '');
            commit('setProjectId', '');
            commit('setProjectNm', '');
            commit('setSiteId', '');
            commit('setSiteNm', '');
            commit('setBaseCd', '');
            commit('setBaseType', '');
            commit('setBaseTypeName', '');
            commit('setGongsaTypeCd', '');
            commit('setGongsaTypeNm', '');
            commit('setBaseTypeNm', '');
            commit('setCsrtType', '');
            commit('setCsrtTypeNm', '');
        },
        setLoacale({ commit }, payload) {
            commit('setLoacale', payload)
        },
        setOzTypeList({ commit }, payload) {
            commit('setOzTypeList', payload)
        }
    }
}

export default auth