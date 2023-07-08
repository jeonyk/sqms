import Vue from 'vue'

export default Vue.extend({
    methods: {
        /* chkUserId : 처리가 필요한 userId*/
        checkUser(chkUserId, chkProcess){
            
            //슈퍼관리자인경우 체크 제외 
            if(this.$store.getters['auth/getGroupAuthInfoId'] != "GRAT_0000000009"){
                // 처리가 필요한 userId가 나와 같지 않으면
                if(chkUserId != this.$store.getters['auth/getUserId']){
                    return false;
                }
            }

            //현재 page권힌
            let auth = this.$store.getters['tabInfo/getTabs']
            let authPass = true;

            // 기능에 권한이 있는지 체크
            switch (chkProcess) {
                case "write":
                    if(auth.writeYn != "Y"){
                        authPass = false;
                    }
                    break;
                case "change":
                    if(auth.changeYn != "Y"){
                        authPass = false;
                    }
                    break;
                case "unuse":
                    if(auth.unuseYn != "Y"){
                        authPass = false;
                    }
                    break;
                case "view":
                    if(auth.viewYn != "Y"){
                        authPass = false;
                    }
                    break;
                case "down":
                    if(auth.downYn != "Y"){
                        authPass = false;
                    }
                    break;                                
                default:
                    break;
            }

            return authPass;

        },
        /* checkMultiUser : 처리가 필요한 userId array */
        checkMultiUser(checkMultiUser, chkProcess){
            
            let authPass = true;
            
            if(this.$store.getters['auth/getGroupAuthInfoId'] != "GRAT_0000000009"){
                authPass = false;
                for(let i = 0; i < checkMultiUser.length;i++){  
                    // 처리가 필요한 userId가 나와 같지 않으면
                    if(checkMultiUser[i] == this.$store.getters['auth/getUserId']){
                        authPass = true;
                        break;
                    }
                }
            }

            if(!authPass){
                return authPass;
            }else{
                authPass = true;
                //현재 page권힌
                let auth = this.$store.getters['tabInfo/getTabs']
                
                // 기능에 권한이 있는지 체크
                switch (chkProcess) {
                    case "write":
                        if(auth.writeYn != "Y"){
                            authPass = false;
                        }
                        break;
                    case "change":
                        if(auth.changeYn != "Y"){
                            authPass = false;
                        }
                        break;
                    case "unuse":
                        if(auth.unuseYn != "Y"){
                            authPass = false;
                        }
                        break;
                    case "view":
                        if(auth.viewYn != "Y"){
                            authPass = false;
                        }
                        break;
                    case "down":
                        if(auth.downYn != "Y"){
                            authPass = false;
                        }
                        break;                                
                    default:
                        break;
                }

                return authPass;
            }
        },
        /* checkUserAuth : 처리가 필요한 권한그룹 */
        checkUserAuth(checkUserAuth, chkProcess){
            
            let authPass = true;

            // console.log(checkUserAuth)
            // console.log(this.$store.getters['auth/getGroupAuthInfoId'])
            
            if(this.$store.getters['auth/getGroupAuthInfoId'] != "GRAT_0000000009"){
                if(checkUserAuth != this.$store.getters['auth/getGroupAuthInfoId']){
                    authPass = false;
                }
                
            }

            if(!authPass){
                return authPass;
            }else{
                authPass = true;
                //현재 page권힌
                let auth = this.$store.getters['tabInfo/getTabs']
                
                // 기능에 권한이 있는지 체크
                switch (chkProcess) {
                    case "write":
                        if(auth.writeYn != "Y"){
                            authPass = false;
                        }
                        break;
                    case "change":
                        if(auth.changeYn != "Y"){
                            authPass = false;
                        }
                        break;
                    case "unuse":
                        if(auth.unuseYn != "Y"){
                            authPass = false;
                        }
                        break;
                    case "view":
                        if(auth.viewYn != "Y"){
                            authPass = false;
                        }
                        break;
                    case "down":
                        if(auth.downYn != "Y"){
                            authPass = false;
                        }
                        break;                                
                    default:
                        break;
                }

                return authPass;
            }    
        }
    }
})