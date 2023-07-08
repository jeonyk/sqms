<template>
  <!-- <section id="app"> -->
    <the-layout>
      <router-view />
    </the-layout>
    <!-- <global-overlay/>
  </section> -->
</template>

<script>
  import TheLayout from "@/pages/layout/layoutView.vue";
  import loader from '@ibsheet/loader'
  //import { mapGetters } from 'vuex';
  // import GlobalOverlay from '@component/common/GlobalOverlay.vue'
  
  loader.config({
    registry: [{
      name: 'ibsheet',
      // baseUrl: '/ibsheet',
      baseUrl: '/ibsheet',
      plugins: ["common", 'excel', 'dialog'],
      // license: 'W2FtSztPKCFzZDYwYjJxbn9NNREsGXUpdXI/NnInYjxhNFhlBnRSOnx2d2wtLGMiYHYlTzxcN1onImZnLns4bGVzLx1EfBZxBwxFTAp4YCZ1JyEzdUk7UyQX'
      license: process.env.VUE_APP_IBSHEET_LICENSE ? process.env.VUE_APP_IBSHEET_LICENSE : ''
    }]
  })

  export default {
    name: 'App',
    components: {
      TheLayout,
      // GlobalOverlay,
    },
    data() {
      return {
        reflash : false
      }
    },
    // computed: {
    //     ...mapGetters({
    //         siteMstrId: 'auth/getSiteMstrId',
    //         userId: 'auth/getUserId',
    //      }),
    // },
    // watch : {
    //   siteMstrId (value){
    //     console.log("@@@@ siteMstrId 변경");
    //   },
    //   userId (value){
    //     console.log("@@@@ userId 변경");
    //   }
    // },
    beforeCreate: function() {

      // 세션정보가 있으면 vuex에 이동
      if ((this.$session.get('userInfo') != null || this.$session.get('userInfo') != undefined) && this.$store.getters['auth/getIsOpen']){
        
        const isOpen = this.$store.getters['auth/getIsOpen'];
        this.$store.dispatch('auth/setUserInfo', this.$session.get('userInfo'));        
        this.$store.dispatch('auth/setProjectInfo', this.$session.get('userInfo'));
        this.$store.dispatch('auth/setIsOpen', isOpen);                   
      }
      

        // 쿠키에 토큰이 없는 경우, login 페이지로 이동
        // if(this.$router.currentRoute.path.indexOf('/SSOLogin') < 0 && this.$router.currentRoute.path.indexOf('/testLogin') < 0 && this.$router.currentRoute.path.indexOf('/workerEdu/mobile/') < 0 && this.$router.currentRoute.path.indexOf('download') < 0 && this.$router.currentRoute.path.indexOf('downPrivacy') < 0 && this.$router.currentRoute.path.indexOf('passwdChg') < 0 && (this.$cookies.get('Authorization') == "" || this.$cookies.get('Authorization') == null)){
        //   console.log("@@@@@ beforeCreate");
        //   this.$router.push({name: 'Login'}).catch(()=>{});
        // }
      

    },
    updated: function() {
      // 쿠키에 토큰이 없는 경우, login 페이지로 이동
      // if(this.$router.currentRoute.path.indexOf('/SSOLogin') < 0 &&this.$router.currentRoute.path.indexOf('/SSOLogin') < 0 && this.$router.currentRoute.path.indexOf('/testLogin') < 0 && this.$router.currentRoute.path.indexOf('/workerEdu/mobile/') < 0 && this.$router.currentRoute.path.indexOf('download') < 0 && this.$router.currentRoute.path.indexOf('downPrivacy') < 0 && this.$router.currentRoute.path.indexOf('passwdChg') < 0 && (this.$cookies.get('Authorization') == "" || this.$cookies.get('Authorization') == null)){
      //   console.log("@@@@@ update");
      //   this.$router.push({name: 'Login'}).catch(()=>{});
      // }
    },
    mounted(){
      
      // 이벤트를 등록
      window.addEventListener('beforeunload', this.unLoadEvent);    // 화면 unload 이벤트
      //window.addEventListener('keydown', this.detectReflash);
      
      // 뒤로가기
      window.addEventListener('popstate', this.preventGoBack);    // 브라우저 뒤로가기

      // 창 오픈 여부 
      this.$store.dispatch('auth/setIsOpen', true);      
  
    },
    beforedestroyed() {
      // 창이 닫힐 경우 이벤트 호출      
      window.removeEventListener('beforeunload', this.unLoadEvent);
    },
    methods: {
      unLoadEvent: function (event) {                  
             
            let cnt = Number(localStorage.getItem("viewCnt"));
            cnt = cnt - 1; 
                      
            if(cnt <= 0){
              // 모든 창이 닫치는 경우 초기화 
              localStorage.removeItem("viewCnt");          
              this.$session.destroy();
              //localStorage.clear();          
            }else{
              //현재 유지되는 창 카운트 셋팅
              localStorage.setItem("viewCnt",cnt);
            }

            this.$store.dispatch('auth/setIsReflash',false);

            // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
            event.preventDefault();

      },
      preventGoBack: function (event) {
        // console.log("@@@@ preventGoBack");
        //뒤로가기 이벤트  
        let currentPath = this.$router.currentRoute.path;

        // console.log("@@@@ preventGoBack path : "+currentPath);

          // sheet 페이지가 아닌경우 모두 빽처리
          if(currentPath.indexOf("sheet") == -1){            
            // tab 이동이력을 체크한다.
            let tabHistory = _.cloneDeep(this.$store.getters['tabInfo/getTabHistory']);

            let isParam = false; 
            for(let i = tabHistory.length; i > 0 ; i--){              
              if( tabHistory[i-1].routerPath == currentPath){
                if(tabHistory[i-1].param != null){
                  // 파라미터가 있게 이동한 경우
                  isParam = true;
                }
              }
            }
            
            if(!isParam){
              // 뒤로가기로 왔을 경우 param이 존재하지 않음. 그경우 해당 메뉴로 이동처리
              let menulist = this.$store.getters['tabInfo/getMenuList'];
              let menuId = this.$store.getters['tabInfo/getCurrentMenuId'];
              let movePath= "";

              //메뉴 정보에서 해당 메뉴ID의 최상위 sheet 페이지 정보를 찾는다
              menulist.forEach(item => {             
              if(item.hasOwnProperty('children')){
                item['children'].forEach( (item1,index) => {
                    if(item1.hasOwnProperty('children')){
                      if(item1.children.length > 0){
                        item1['children'].forEach( (item2,index) => {
                          if(item2.menuMngtId == menuId){
                            movePath = item1.path;
                            return;
                          }
                        })    
                      }else{
                        if(item1.menuMngtId == menuId){
                          movePath = item1.path;
                          return;
                        }
                      }
                    }                  
                })
              }
            });

            // 리스트 페이지로 이동
            this.$router.push(movePath);
            }
          }else{
            
            
            // tab 이동이력을 체크한다.
            let tabHistory = _.cloneDeep(this.$store.getters['tabInfo/getTabHistory']);

            // let isParam = false; 
            // for(let i = tabHistory.length; i > 0 ; i--){              
            //   if( tabHistory[i-1].routerPath == currentPath){
            //       // 파라미터가 있게 이동한 경우
            //       isParam = true;
            //   }
            // }

            //이동이력이 없으면
            let isHistory = false; 
            for(let i = tabHistory.length; i > 0 ; i--){              
              if( tabHistory[i-1].routerPath == currentPath){
                  // 파라미터가 있게 이동한 경우
                  isHistory = true;
              }
            }


            // 뒤로가기로 왔을 경우 param이 존재하지 않음. 그경우 해당 메뉴로 이동처리
            let menulist = this.$store.getters['tabInfo/getMenuList'];
            let menuId = this.$store.getters['tabInfo/getCurrentMenuId'];            
            let chkMenu = true; 
            let pathMeneId = "";

            //메뉴 정보에서 해당 메뉴ID의 최상위 sheet 페이지 정보를 찾는다
            menulist.forEach(item => {             
              if(item.hasOwnProperty('children')){
                item['children'].forEach( (item1,index) => {
                    if(item1.hasOwnProperty('children')){
                      if(item1.children.length > 0){
                        item1['children'].forEach( (item2,index) => {
                          if(item2.path == currentPath){
                            pathMeneId = item2.menuMngtId;
                            return;
                          }
                        })    
                      }else{
                        if(item1.path == currentPath){
                          pathMeneId = item1.menuMngtId;
                          return;
                        }
                      }
                    }                  
                })
              }
            })

            if(menuId != pathMeneId){
              chkMenu = false;
            }

            // console.log("@@@@@ isHistory : "+isHistory);
            // console.log("@@@@@ chkMenu : "+chkMenu);

            if(!isHistory || !chkMenu){
              history.back();
            }
          }
      }
    }
  }
</script>
<!--
<style scoped>
#app {
  height: 100%;
}
</style>
-->