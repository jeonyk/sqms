import Vue from 'vue'
import _ from 'lodash'

export default Vue.extend({
    methods: {
        goToPage: function(link, closeTab, params){
                
            let tabInfo =  this.$store.getters['tabInfo/getTabs']
            let routerPath = this.$router.resolve(link);

            let chkTab = false;
            let tabInx = 0;
            for(let i = 0; i < tabInfo.list.length; i++){
                if(tabInfo.list[i].path == routerPath.href){
                    chkTab = true;
                    tabInx = i;              
                }
            }


            if(chkTab){
                // 기존 창으로 이동

                if (tabInfo.current !== tabInx || routerPath== "/main") {
                    tabInfo.current = tabInx
                    tabInfo.currentMenuId = tabInfo.list[tabInx].menuMngtId;
                    tabInfo.writeYn = tabInfo.list[tabInx].writeYn;
                    tabInfo.changeYn = tabInfo.list[tabInx].changeYn;
                    tabInfo.unuseYn = tabInfo.list[tabInx].unuseYn;
                    tabInfo.viewYn = tabInfo.list[tabInx].viewYn;
                    tabInfo.downYn = tabInfo.list[tabInx].downYn;
                                        
                    
                    this.$router.push({
                        name:   tabInfo.list[tabInx].routerName,
                        params: params ? params : undefined,
                    })                    
                } 
            }else{

                if (closeTab) {
                    this.$store.dispatch('tabInfo/allTabClose')
                }

                // 새창으로 띄우기
                let menuInfo = this.$store.getters['tabInfo/getMenuList']
                let tabItem = new Object();

                menuInfo.some(main => {
                    main.children.some(mid => {
                        if (mid.path === routerPath.href) {
                                // tabItem = sub
                                tabItem = _.cloneDeep(mid)
                                tabItem.upperName = main.name                                    
                                return true
                        }

                        mid.children.some(sub => {
                            if (sub.path === routerPath.href) {
                                // tabItem = sub
                                tabItem = _.cloneDeep(sub)
                                tabItem.upperName = mid.name
                                return true
                            }
                        })
                    })
                })
                
                if(tabItem.viewYn == "Y"){
                    this.$store.dispatch('tabInfo/pushTabsList',tabItem);
                    tabItem.current = closeTab ? 0 : tabInfo.list.length-1;
                    this.$store.dispatch('tabInfo/setTabInfo',tabItem);

                    // router 이동방식 변경
                    // this.$router.push(routerPath.href)
                    this.$router.push({
                        name:   tabItem.routerName,
                        params: params ? params : undefined,
                    })
                }else{
                    this.alert("권한이 없는 페이지입니다.");
                }
            }
        },

        fn_getFileIcons: function (fileName) {
            const extn = String(fileName)?.split('.').reverse()?.[0].toLowerCase()

            if (process.env.VUE_APP_FILE_EXTENSION_IMAGE.split(',').includes(extn)) {
                return 'file_image'
            } else if (process.env.VUE_APP_FILE_EXTENSION_EXCEL.split(',').includes(extn)) {
                return 'file_excel'
            } else if (process.env.VUE_APP_FILE_EXTENSION_PPT.split(',').includes(extn)) {
                return 'file_ppt'
            } else if (process.env.VUE_APP_FILE_EXTENSION_WORD.split(',').includes(extn)) {
                return 'file_word'
            } else if (process.env.VUE_APP_FILE_EXTENSION_PDF.split(',').includes(extn)) {
                return 'file_pdf'
            } else if (process.env.VUE_APP_FILE_EXTENSION_HWP.split(',').includes(extn)) {
                return 'file_hwp'
            } else if (process.env.VUE_APP_FILE_EXTENSION_ZIP.split(',').includes(extn)) {
                return 'file_zips'
            } else {
                return 'file_etc'
            }
        }


    }
})