<!-- HeaderComponent.vue -->
<template>
<div>
   <div class="header_wrap">
      <header>
         <div class="l_layout">
            <!-- <router-link tag="h1" id="logo" v-bind:to="{name: 'Main'}" style="cursor: pointer;">
               <img src="@/assets/img/layout/logo2.png" alt="">
            </router-link> -->
            <a tag="h1" id="logo" @click="fn_mainLogo" style="cursor: pointer;">
               <img src="@/assets/img/layout/logo2.png" alt="">
            </a>
            <div class="search_box">
               <!-- <input type="text" name="search" ref="headerProjectName" :value="projectNm" v-b-modal.CommonProjectSelect> -->
               <input type="text" name="search" ref="headerProjectName" :value="projectNm" v-b-modal.NewProjectSelect>
               <!-- <button type="button" v-b-modal.CommonProjectSelect></button> -->
               <button type="button" v-b-modal.NewProjectSelect></button>
            </div>
            <div class="page_code">
               <label for="pagecode">Page Code</label>
               <input type="text" name="pagecode" @input="fn_inputPageCode" @keyup.enter="fn_movePageCode" :value="pageCode" autocomplete="off">
               <div class="autocomplete" :class="{'on': openBox}">
                  <a href="javascript:void(0)" class="btn_close"></a>
                  <div class="scroll_area">
                     <table>
                        <colgroup>
                           <col width="75%">
                           <col width="*">
                        </colgroup>
                        <tbody>
                           <tr v-for="(item, index) in pageCodeList" :key="index" @click="fn_clickPageCode(item.pageCode)">
                              <td>{{item.name}}</td>
                              <td>{{item.pageCode}}</td>
                           </tr>                             
                        </tbody>
                     </table>
                  </div>
               </div>
         </div>
         </div>
         <ul class="r_layout">
               <li v-for="( topMenuIcon, i ) in topMenuIconList" v-bind:key="i">
                
                  <a href="javascript:void(0);" @click="mainNoticeToggle">
                     <div class="icon" v-bind:class="topMenuIconList[i].classNames">
                           <p class="badge">{{ topMenuIconList[i].badge }}</p>
                     </div>
                     <p>{{ topMenuIconList[i].iconName }}</p>
                  </a>
               </li>
         </ul>
      </header>

      <nav id="gnb">
         
         <ul class="list"><!-- v-on:mouseenter="noticeEnterHander" v-on:mouseleave="noticeOutHander">-->
            <li v-for="(item, index) in gnbMenuList" v-bind:key="index" :class="{'column': item.dep3}">
               <a href="javascript:void(0);" class="dp1" @click="clickGnbMenu"> {{ item.name }}</a>
               <ul class="dp2">
                  <li v-for="(item2, index2) in item.children" v-bind:key="index2">
                     <!--<router-link v-bind:to="item2.path">{{ item2.name }}</router-link>-->
                     
                     <a href="javascript:void(0);" v-if="item2.path == '' || item2.path == 'undefinded' || item2.path == null" > {{ item2.name }} </a>
                     <a href="javascript:void(0);" v-if="item2.path != '' && item2.path != 'undefinded' && item2.path != null" @click="fn_clickToPath(item2, item.name)">{{ item2.name }} </a>

                     <ul class="dp3">
                        <li v-for="(item3, index3) in item2.children" v-bind:key="index3" @click="fn_clickToPath(item3, item2.name)">
                           <!-- <router-link v-bind:to="item3.path">{{ item3.name }}</router-link> -->
                           <a href="javascript:void(0);" > {{ item3.name }} </a>
                        </li>
                     </ul>
                  </li>
               </ul>
            </li>
         </ul>

          <!-- :class="{'column': item.dep3}" -->

         <!-- <ul class="list" v-if="authType == 'GRAT_0000000009'">
            <li v-for="(item, index) in GnbMenuList" v-bind:key="index" :class="{'column': false}" >
               <a href="javascript:void(0);" class="dp1" @click="clickGnbMenu"> {{ item.name }}</a>
               <ul class="dp2">
                  <li v-for="(item2, index2) in item.children" v-bind:key="index2" >
                     <a href="javascript:void(0);"> {{ item2.name }}</a>
                     <ul class="dp3">
                        <li v-for="(item3, index3) in item2.children" v-bind:key="index3">
                           <a href="javascript:void(0);" @click="fn_clickToPath(item3, item2.name)"> {{ item3.name }} </a>
                        </li>
                     </ul>
                  </li>
               </ul>
            </li>
         </ul>
         <ul class="list" v-if="authType != 'GRAT_0000000009'">
            <li v-for="(item, index) in GnbMenuList2" v-bind:key="index" :class="{'column': false}" >
               <a href="javascript:void(0);" class="dp1" @click="clickGnbMenu"> {{ item.name }}</a>
               <ul class="dp2">
                  <li v-for="(item2, index2) in item.children" v-bind:key="index2">
                     <a href="javascript:void(0);"> {{ item2.name }}</a>
                     <ul class="dp3">
                        <li v-for="(item3, index3) in item2.children" v-bind:key="index3">
                           <a href="javascript:void(0);" @click="fn_clickToPath(item3, item2.name)"> {{ item3.name }} </a>
                        </li>
                     </ul>
                  </li>
               </ul>
            </li>
         </ul> -->

         <div class="user_info_desc">
            <!-- <p>{{ `${$moment().format('YYYY년 MM월 DD일')} ${userNm} (${userId})` }}님 환영합니다.</p> -->
            <p>
               {{$moment().format('YYYY년 MM월 DD일')}} {{userNm}} <s> ( </s> {{userId}} <s>)님 환영합니다.</s>
            </p>
         </div>
         <div class="notice">
            <!--
            <a href="javascript:void(0);" class="ico_toggle" v-on:click="toggleHandler" v-show="headerCurrentTab != null">lnb toggle</a>
            -->
            <a href="javascript:void(0);" class="ico_toggle" v-on:click="toggleHandler">lnb toggle</a>
            <a href="javascript:void(0);" class="ico_home" v-on:click="clickHeaderTabs(null)">home</a>

            <div class="lst_tabs">
               <ul>
                  <!--vue x 적용 후 작업 필요
                  <li v-for="(tab, index) in headerTabs" v-bind:class="{active:headerCurrentTab===index}" :key="index">
                        <a href="javascript:void(0);" v-on:click="clickHeaderTabs(index)">{{tab}}</a>
                        <span class="ico_close">닫기</span>
                  </li>
                  vue x 적용 후 작업 필요-->
                  <li v-for="(tab, index) in tabs.list" v-bind:class="{ active: tabs.current===index }" :key="index">
                        <a href="javascript:void(0);" v-if="tab.upperName === tab.name" v-on:click="fn_clickTab(index)" v-b-tooltip.hover.bottom.v-primary :title="tab.name" > {{tab.name}} </a>
                        <a href="javascript:void(0);" v-else v-on:click="fn_clickTab(index)" style="font-size:12px;" v-b-tooltip.hover.bottom.v-primary :title="`${tab.upperName} > ${tab.name}`" > {{tab.upperName}} &gt; {{tab.name}} </a>
                        <!-- <a href="javascript:void(0);" v-on:click="fn_clickTab(index)"> {{tab? tab.name : ''}} </a> -->
                        <span class="ico_close" @click="fn_clickClose(index)">닫기</span>
                  </li>
               </ul>
               <!--vue x 적용 후 작업 필요
               <div class="right_area">
                  <a href="javascript:void(0);" class="ico_all_close" @click="removeAllTabs" v-show="allCloseDisplay">모든 탭 닫기</a>
               </div>
               -->
               <div class="right_area" @click="fn_clickRemoveTab" v-show="tabs.list.length > 0">
                  <!-- <a href="javascript:void(0);" class="ico_all_close" >모든 탭 닫기</a> -->
                  <a href="javascript:void(0);" class="ico_all_close" style="padding-right: 0px; padding-left: 0px; min-width: 75px;" >전체 닫기</a>
               </div>
            </div>
         </div>
      </nav>
      

      <!-- <CommonProjectSelect v-on:fn-choice="siteChoice" set-cookies /> -->
      <NewProjectSelect v-on:fn-choice="siteChoice" set-cookies />
   </div>
   <!-- 통합알림, 내 정보 -->
   <MainNotice v-on:fn-reCount="fn_unConfirmMsgCnt"/>

   <!-- App Store -->
   <app-store />

</div>
</template>
<script>
   // import CommonProjectSelect from '@/pages/common/popup/CommonProjectSelect.vue';
   import NewProjectSelect from '@/pages/common/popup/NewProjectSelect.vue';
   import AppStore from '@/pages/common/popup/MainAppstore.vue';
   import MainNotice from '../frame/MainNotice.vue';
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import _ from 'lodash';
   import { mapGetters } from 'vuex';
   import { sendPostApi }  from '@/apis/common';
   import axios from 'axios'
   import { commonFn } from '@/script/commonFn.js';

   let _tg;

   export default {
      name: "Header",
      mixins: [MsgBoxMixins],
      components: {
         // CommonProjectSelect,
         MainNotice,
         NewProjectSelect,
         AppStore 
      },
      computed: {
         ...mapGetters({
            projectNm: 'auth/getProjectNm',
            userNm: 'auth/getUserNm',
            userId: 'auth/getUserId',
            tabs : 'tabInfo/getTabs',
            authType : 'auth/getGroupAuthInfoId',
            gnbMenuList : 'tabInfo/getMenuList',
            moveTab : 'tabInfo/getMoveTab',
            moveMenu : 'tabInfo/getMoveMenu',
            siteMstrId: 'auth/getSiteMstrId'
         }),

         // projectName: {
         //    get () {
         //       return this.$store.getters['ui/getProjectName']
         //    },
         //    set (payload) {
         //       this.$store.dispatch('ui/setProjectName', payload)
         //    },
         // }
      },
       watch : {
         siteMstrId(val){
            if(!commonFn.methods.isEmpty(val)){
               this.fn_siteHistory(val);
            }
         },
         moveTab (newValue) {
            if(newValue != null){
            this.fn_moveTab(newValue);
            this.$store.dispatch('tabInfo/setMoveTab', null); 
            }
         },
         moveMenu (newValue) {
            if(newValue != null){
            this.fn_clickToPath(newValue.item, newValue.upperName, newValue.params ? newValue.params : undefined);
            this.$store.dispatch('tabInfo/setMoveMenu', null); 
            }
         },
         pageCode (newValue){            
         // 한글/영문/특수문자 정규식
         const replaceExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;

         if(replaceExp.exec(newValue)!==null) this.pageCode = newValue.replace(/[^0-9]/g,'');

         this.fn_makePAgeInfo();
         }
       },
      data() {
         return {            
            // userName: '김현대',
            // userNumber: '123456',
            noticeMainText: '안녕하세요. 앞으로 현대엔지니어링 현장품질관리시스템 메인 화면에 공지 문구가 조회될 예정입니다. 감사합니다. 관리자',
            topMenuIconList: [
               // {
               //    image: require('../../../assets/img/typeB/icon_search.png'),
               //    iconName: 'Search',
               //    classNames: 'ico_search',
               //    routepath: "",
               // },
               {
                  image: require('../../../assets/img/typeB/icon_download_cloud.png'),
                  iconName: 'AppStore',
                  classNames: 'icon_download_cloud',
                  routepath: "",
               },
               // {
               //    image: require('../../../assets/img/typeB/icon_bookmark.png'),
               //    iconName: 'User Guide',
               //    classNames: 'icon_bookmark',
               //    routepath: "",
               // },
               // {
               //    image: require('../../../assets/img/typeB/icon_cog.png'),
               //    iconName: 'SET UP',
               //    classNames: 'icon_cog',
               //    routepath: "",
               // },
               {
                  image: require('../../../assets/img/typeB/icon_question.png'),
                  iconName: 'HELP',
                  classNames: 'icon_question',
                  routepath: "",
               },
               {
                  image: require('../../../assets/img/typeB/icon_alarm.png'),
                  badge: null, // or Numbering
                  classNames: 'icon_alarm',
                  routepath: "",
               },
               {
                  image: require('../../../assets/img/typeB/icon_user.png'),
                  classNames: 'icon_user',
                  routepath: "",
               }
            ],
            // projectName:'',
            project_id : '',
            headerCurrentTab: null, // 기본 current 값 지정 
            headerTabs: ['현장정보', '품질관리자'], // tab name
            allCloseDisplay: false, // 모든 탭 닫기 show&hide
            mainNoticeAnimated: true,

            /** tab 연결시 불필요 */
            // tabs: {
            //    list: [],
            //    current: null,
            // },

            statusGnbMenu: false,
            statusGnbLeave: false,

            pageCode : '',
            pageCodeList : [],
            openBox : false
         }
      },
      async created () {
      },
      mounted () {
         // this.projectName = this.$cookies.get('projectName')

         document.addEventListener("click", function(){
            if(_tg.statusGnbMenu && _tg.statusGnbLeave) {
               let depth1 = document.querySelectorAll('#gnb > ul > li');
               for ( let i = 0; i < depth1.length; i++){ 
                  depth1[i].classList.remove('on');
               }
               _tg.statusGnbMenu = false;
               _tg.statusGnbLeave = false;
            }
         });

         let gnb = document.querySelector('#gnb');
         gnb.addEventListener('mouseleave', function() {
            _tg.statusGnbLeave = true;
         });
         
         this.fn_unConfirmMsgCnt();
         this.fn_menuData();
      },
      methods: {
         async fn_menuData(){
            
            // this.projectName = this.$cookies.get('projectName')
            
            // console.log(this._data)
            _tg = this;

            // 사용자별 메뉴 가져오기
            let url = '/sendApi/api/myWork/codeMngt/userMenuStrct/list';
            let param = {"userId":this.userId};

            const menuData = await sendPostApi(url, param).then((result) => {

               if(!this.$store.getters['auth/getSiteMstrId']){

                  const defaultRouteList = [
                     'SiteInfoView',
                     'ApprovedDocSheet',
                     'MyJobSheet',
                     'QltyMngtCostSheet',
                     'CodeMngtTab',
                     'UserMngtTab',
                     'TradeMngtTab',
                     'AuthGroupTab',
                     'QualityMngtAdm',
                  ]

                  let data = [];
                  let resultData = [];
                  let resultList = result.data.datas.dlMenuStrct;

                  resultList.forEach(x => {
                     if(defaultRouteList.includes(x.routerName)){
                        resultData.push(x.menuMngtId);
                        if(x.upperMenuMngtId){
                           resultList.filter(item => x.upperMenuMngtId == item.menuMngtId).forEach(y => {
                              if(x.upperMenuMngtId == y.menuMngtId){
                                 if(!resultData.includes(y.menuMngtId)){
                                    resultData.push(y.menuMngtId);
                                    if(y.upperMenuMngtId){
                                       resultList.filter(item => y.upperMenuMngtId == item.menuMngtId).forEach(z => {
                                          if(!resultData.includes(z.menuMngtId)){
                                             resultData.push(z.menuMngtId);
                                          }
                                       });
                                    }
                                 }
                              }
                           });
                        }
                     }
                  });

                  result.data.datas.dlMenuStrct.forEach(item => {
                     if(resultData.includes(item.menuMngtId)){
                        data.push(item);
                     }
                  })

                  return data;
               }
               else{
                  return result.data.datas.dlMenuStrct;
               }

            });

            // menu data set 만들기
            const menuList = menuData
               .filter(lv1 => lv1.menuLevel == "1")
               .map(lv1 => {
                     let dep3 = true;
                     lv1.children   = menuData.filter(lv2 => lv2.menuLevel == 2 && lv2.upperMenuMngtId == lv1.menuMngtId)
                                    .map(lv2 => {
                                       lv2.children = menuData.filter(lv3 => lv3.menuLevel == 3 && lv3.upperMenuMngtId == lv2.menuMngtId)
                                                               .map(lv3=> { 
                  
                                                                  let obj = new Object();
                                                                  obj.name = lv3.menuNmKr;                                                                 
                                                                  if(lv3.scrinUrl != ''){
                                                                     obj.path = "/view"+lv3.scrinUrl;                                                                  
                                                                  }
                                                                  obj.menuMngtId = lv3.menuMngtId;
                                                                  obj.writeYn = lv3.writeYn;
                                                                  obj.changeYn = lv3.changeYn;
                                                                  obj.unuseYn = lv3.unuseYn;
                                                                  obj.viewYn = lv3.viewYn;
                                                                  obj.downYn = lv3.downYn;
                                                                  
                                                                  obj.adminIpYn = lv3.adminIpYn
                                                                  obj.routerName = lv3.routerName
                                                                  obj.pageCode = lv3.pageCode
                                                                  
                                                                  dep3 = false;
                                                                  return obj 
                                                               })
                                                               
                                       let obj = new Object();
                                       obj.name = lv2.menuNmKr;                                    
                                       if(lv2.scrinUrl != ''){
                                          obj.path = "/view"+lv2.scrinUrl;                                                                  
                                       }
                                       obj.children = lv2.children;
                                       obj.menuMngtId = lv2.menuMngtId;                                    
                                       obj.writeYn = lv2.writeYn;
                                       obj.changeYn = lv2.changeYn;
                                       obj.unuseYn = lv2.unuseYn;
                                       obj.viewYn = lv2.viewYn;
                                       obj.downYn = lv2.downYn;

                                       obj.routerName = lv2.routerName
                                       obj.adminIpYn = lv2.adminIpYn
                                       obj.pageCode = lv2.pageCode

                                       return obj                                                                                                       
                                    })

                     let obj = new Object();
                     obj.name = lv1.menuNmKr;
                     obj.children = lv1.children;
                     obj.dep3 = dep3;
                     return obj
               });

            this.$store.dispatch('tabInfo/setMenuList', menuList);
            
            // find 
            if (this.$router.currentRoute?.path !== '/main') {
               let tabItem = null
               this.gnbMenuList.some(main => {
                  main.children.some(mid => {
                     mid.children.some(sub => {
                        if (sub.path === this.$router.currentRoute.path) {
                           // tabItem = sub
                           tabItem = _.cloneDeep(sub)
                           tabItem.upperName = mid.name
                           return true
                        }
                     })
                  })
               })
               
               if (tabItem !== null) {
                  let existIndex = -1 
                  this.tabs.list.some((tab, index) => {
                     if (tab.path === tabItem.path) {
                        existIndex = index
                        return true
                     }
                  })
         
                  // new Index
                  if (existIndex === -1) {
                     this.tabs.list.push(tabItem)
                     existIndex = this.tabs.list.length -1
                  } 
                  this.tabs.current = existIndex;
                  this.tabs.currentMenuId = tabItem.menuMngtId;
                  this.tabs.writeYn = tabItem.writeYn;
                  this.tabs.changeYn = tabItem.changeYn;
                  this.tabs.unuseYn = tabItem.unuseYn;
                  this.tabs.viewYn = tabItem.viewYn;
                  this.tabs.downYn = tabItem.downYn;

                  this.tabs.adminIpYn = tabItem.adminIpYn
               }
      
            }

         },
         async fn_siteHistory(site) {
            let url = '/sendApi/api/common/siteHistory/write';
            let param = {
               siteMstrId : site,
               "userId": this.$store.getters['auth/getUserId'],
               "userType": this.$store.getters['auth/getUserType'],
               "userPath": 'web',
            }

            await sendPostApi(url, param)
         },
         noticeEnterHander: function () {
            let noticeText = document.querySelector('.notice')
            noticeText.classList.add('on')
         },
         noticeOutHander: function () {
            let noticeText = document.querySelector('.notice')
            noticeText.classList.remove('on')
         },
         siteChoice : async function(infoObj) {
            let url = '/sendApi/api/myWork/userMngt/OzReportInfoList/list';
            let param = {
               siteMstrId : this.$store.getters['auth/getSiteMstrId']
            }

            await sendPostApi(url, param).then((data) => {
               if(typeof data.data.datas.setUpOzInfo != 'undefined'){
                  let infoList = data.data.datas.setUpOzInfo.map(item => {return{
                     seq : item.seq ,
                     menuNm : item.menuNm ,
                     btnNm : item.btnNm ,
                     docNm : item.docNm ,
                     jspNm : item.jspNm ,
                  }})
                  this.$store.dispatch('auth/setOzTypeList', infoList);                  
               }
            });
            // this.projectName = infoObj.projectName;

            // console.log(this.projectName)
            // this.$cooies.set('projectName', this.projectName)
            
            // 쿠키에 프로젝트 id, 현장 id 담기
            // this.$cookies.set("projectId", infoObj.project_id);
            // this.$cookies.set("siteId", infoObj.site_id);

            // this.$root.$emit('bv::hide::modal', 'CommonProjectSelect'); 
            
            this.$root.$emit('bv::hide::modal', 'NewProjectSelect');
            if (this.$route.name !== 'Main') {
               this.$router.push("/main");         
            }else{
               this.$router.go(this.$route.currentRoute);
            }
         },
         clickGnbMenu(evt) {  // show gnb menu
            let depth1 = document.querySelectorAll('#gnb > ul > li');
            for ( let i = 0; i < depth1.length; i++){ 
               depth1[i].classList.remove('on');
               this.statusGnbMenu = false;
            }
            if (evt.target.tagName === 'LI') {
               evt.target.classList.add('on')
            } else if (evt.target.tagName === 'A') {
               evt.target.parentElement.classList.add('on')
            }
            // evt.target.parentElement.classList.add('on');
            this.statusGnbMenu = true;
            this.statusGnbLeave = false;
         },
         clickHeaderTabs(idx) { // headerCurrentTab 전달
            this.headerCurrentTab = idx;
            this.$emit("change-header-tabs", this.headerCurrentTab);

            // temporary
            if(!idx) this.$router.push({ name: 'Main'})
         },
         removeAllTabs() { // lst_tabs 모두 삭제
            this.headerTabs = [];
            this.headerCurrentTab = null;
            this.allCloseDisplay = false;

            this.$emit("change-header-tabs", this.headerCurrentTab);
         }, 
         toggleHandler() { // lnb on & off
            document.querySelector('#gnb .notice .ico_toggle').classList.toggle('on');
            document.querySelector('.lnb_container').classList.toggle('on');
         }, 
         mainNoticeToggle(e) { 
            let target = e.currentTarget;
            let targetClass = target.firstChild._prevClass;

            let mainNotice = document.querySelector('.main_notice');
            let notice = mainNotice.querySelector('.notice_area');
            let profile = mainNotice.querySelector('.profile_area');

            /* 통합알림 */
            if(targetClass == 'icon icon_alarm'){ 
               if(notice.className == 'notice_area on'){
                  mainNotice.classList.remove('on');
                  notice.classList.remove('on');
               }else if(notice.className == 'notice_area'){
                  mainNotice.classList.add('on');
                  profile.classList.remove('on');
                  notice.classList.add('on');
               }
            }
            /* 내 정보 */
            if(targetClass == 'icon icon_user'){
               if(profile.className == 'profile_area on'){
                  mainNotice.classList.remove('on');
                  profile.classList.remove('on');
               }else if(profile.className == 'profile_area'){
                  mainNotice.classList.add('on');
                  notice.classList.remove('on');
                  profile.classList.add('on');
               }
            }

            if( targetClass == 'icon icon_question' ) {
               // return this.alert('준비중입니다.')
               const url = '/sendApi/api/file/guideFileDownload'
               const payload = {
                  codeVal: 'MANUAL'
               }
               const options = {
                  headers: {
                     'Authorization': this.$cookies.get('Authorization'),
                     'Content-Type': 'multipart/form-data; charset=utf-8;',
                     'Accept-Language': 'ko'
                  },
                  responseType: 'blob'
               }
               axios.post(url, payload, options)
                  .then(response => {
                     const blob = new Blob([response.data])
                     const fileName = 'MANUAL_SQMS.zip'

                     // Internet Explorer
                     if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        window.navigator.msSaveOrOpenBlob(blob, fileName)
                     // Other Browsers
                     } else {
                        const objectUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement('a')

                        link.style.cssText = 'display:none'
                        link.href = objectUrl
                        link.setAttribute('download', fileName)

                        if (typeof link.download === 'undefined') {
                           link.setAttribute('target', '_blank')
                        }

                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        window.URL.revokeObjectURL(objectUrl)
                     }
                  })
            }

            /* App Store */
            if( targetClass == 'icon icon_download_cloud' ) {
               // console.log("App Store ~~~~ GO ")
               this.$root.$emit('bv::show::modal', 'pop_app_store');
            }
         },

         // click to path
         fn_clickToPath (item, upperName, params = undefined) {            

/*             if(upperName == 'Admin'){
               this.alert('접근이 허용된 IP주소가 아닙니다.', () => {
                  return;
               });
            } */

            if(item.path === "/view/qualityDoc") {
               // const url = "https://webdisk.hec.co.kr/addon/sso/hec/web.php?node_id=D_56f1679ef323d3bd2f2d1aa86583b4bb_00"
               // const url = `https://webdisk.hec.co.kr/addon/sso/hec/web.php?group_id=${this.$store.getters['auth/getWorkLocCd']}`
               const url = 'https://webdisk.hec.co.kr/addon/sso/hec/web.php?node_id=D_2da18bd2815b3e42628649908cb1a5c1_02'
               window.open(url, '_blank');
               return;
            }
            // console.log(item, upperName)
            this.fn_checkAccessible(item, 'else', () => {

               if(this.tabs.list.length < 8){
                  let depth1 = document.querySelectorAll('#gnb > ul > li');
                  for ( let i = 0; i < depth1.length; i++){ 
                     depth1[i].classList.remove('on');
                     this.statusGnbMenu = false;
                     this.statusGnbLeave = false;
                  }
                  //validate...pushed?
                  item.upperName = upperName
                  
                  let existIndex = -1 
   
                  // 메뉴가 tab에 열려있는지 체크
                  this.tabs.list.some((tab, index) => {
                     //if (tab.path === item.path) {
                     if(tab.menuMngtId == item.menuMngtId){
                        existIndex = index
                        return true
                     }
                  })
   
                  // new Index
                  if (existIndex === -1) {
                     let cloneItem = _.cloneDeep(item);
                     this.tabs.list.push(cloneItem);
                        
                     existIndex = this.tabs.list.length -1
   
                     this.tabs.current = existIndex
                     this.tabs.currentMenuId = item.menuMngtId;
                     this.tabs.writeYn = item.writeYn;
                     this.tabs.changeYn = item.changeYn;
                     this.tabs.unuseYn = item.unuseYn;
                     this.tabs.viewYn = item.viewYn;
                     this.tabs.downYn = item.downYn;
   
                     this.tabs.adminIpYn = item.adminIpYn
   
                     if (this.$router.currentRoute.path !== item.path) {
   
                        // this.$router.push({
                        //    path: item.path,
                        //    query: query,
                        // })
                        this.$router.push({
                           name: item.routerName,
                           params: params,
                        })
                     }
                  }else{
                     // 열린 tab 페이지로 이동
                     this.fn_clickTab(existIndex, params);
                  }
               }else{
                  
                  let existIndex = -1 
   
                  // 메뉴가 tab에 열려있는지 체크
                  this.tabs.list.some((tab, index) => {
                     //if (tab.path === item.path) {
                     if(tab.menuMngtId == item.menuMngtId){
                        existIndex = index
                        return true
                     }
                  })

                  // 현재 tab에 열린 메뉴이면
                  if(existIndex != -1){

                     // 메뉴 클릭 닫기
                     let depth1 = document.querySelectorAll('#gnb > ul > li');
                     for ( let i = 0; i < depth1.length; i++){ 
                        depth1[i].classList.remove('on');                  
                     }

                     // 열린 tab 페이지로 이동
                     this.fn_clickTab(existIndex, params);                     
                  }else{
                     this.alert('탭은 8개까지만 가능합니다.\n 탭을 닫아주세요');
                  }                  
               }

            })

         },
         fn_clickTab (index, params = undefined) {
            // 탭이 다르거나 메인 페이지가 아닌경우
            if (this.tabs.current !== index || this.$router.currentRoute.path == "/main") {
               this.tabs.current = index
               this.tabs.currentMenuId = this.tabs.list[index].menuMngtId;
               this.tabs.writeYn = this.tabs.list[index].writeYn;
               this.tabs.changeYn = this.tabs.list[index].changeYn;
               this.tabs.unuseYn = this.tabs.list[index].unuseYn;
               this.tabs.viewYn = this.tabs.list[index].viewYn;
               this.tabs.downYn = this.tabs.list[index].downYn;

               this.tabs.adminIpYn = this.tabs.list[index].adminIpYn
               
               // 텝 현재의 경로로 처리 (KEEPALIVE 유지)
               this.$router.push(this.tabs.list[index].path);                
               
               /*
               this.$router.push({
                  name: this.tabs.list[index].routerName,
                  params: params,
               })
               */
            }
         },
         fn_moveByIndex (index) {
            if (this.$router.currentRoute.path !== this.tabs.list[index].path) {
               
               // 텝 현재의 경로로 처리 (KEEPALIVE 유지)
               this.$router.push(this.tabs.list[index].path)
               /*
               this.$router.push({
                  name: this.tabs.list[index].routerName
               })
               */
            }
         },
         fn_clickClose (index) {
            
            let rname = this.tabs.list[index].name;
            this.$store.dispatch('tabInfo/setCloseTab', rname); 

            if (this.tabs.current === index) {
               this.tabs.list.splice(index, 1)
               if (this.tabs.list.length > 0) {
                  this.tabs.current = 0
                  this.$router.push(this.tabs.list[this.tabs.current].path)
               } else {
                  this.tabs.current = null
                  if (this.$router.currentRoute.name !== 'Main') {
                     this.$router.push({name: 'Main'})
                  }
               }
            } else {
               this.tabs.current = this.tabs.current > index ? this.tabs.current -1 : this.tabs.current
               this.tabs.list.splice(index, 1)
            }

         },
         fn_clickRemoveTab () {            
            this.$store.dispatch('tabInfo/allTabClose');
            this.$router.push('/main');
         },
         fn_unConfirmMsgCnt (){

            // 미확인 통합알림 확인
            let url = '/sendApi/api/common/publicMessage/unConfirmCnt';
            let param = {"reciveUserId":this.userId};

            sendPostApi(url, param).then((result) => {                        
                  if(result.data.unConfirmCnt > 0){
                     this.topMenuIconList.forEach(object =>{
                        if(object.classNames == "icon_alarm"){                           
                           object.badge = result.data.unConfirmCnt;
                           return;
                        }
                     });
                  }else{
                     this.topMenuIconList.forEach(object =>{
                        if(object.classNames == "icon_alarm"){                           
                           object.badge = null;
                           return;
                        }
                     });
                  }
            });
         },
         fn_moveTab (index) {
            this.tabs.current = index
            this.tabs.currentMenuId = this.tabs.list[index].menuMngtId;
            this.tabs.writeYn = this.tabs.list[index].writeYn;
            this.tabs.changeYn = this.tabs.list[index].changeYn;
            this.tabs.unuseYn = this.tabs.list[index].unuseYn;
            this.tabs.viewYn = this.tabs.list[index].viewYn;
            this.tabs.downYn = this.tabs.list[index].downYn;
            this.tabs.adminIpYn = this.tabs.list[index].adminIpYn;
         },
         fn_checkAccessible (item, type, callback) {
            const adminIp = [
               'MUMI_0000000120',
               'MUMI_0000000121',
               'MUMI_0000000122',
               'MUMI_0000000123',
               'MUMI_0000000124',
            ]
            if (type === 'now') {
               if (adminIp.includes(item.menuMngtId)) {
                  const url = '/sendApi/api/myWork/codeMngt/adminAccessible/view'
                  const options = {
                     headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                     },
                  }

                  axios.post(url, {}, options)
                     .then(response => {
                        // console.log(response)
                        
                        if (response.data.datas.dmAdminAccessible.adminIpYn === 'Y') {
                           return callback(item)
                        } else {
                           this.alert('접근이 허용된 IP주소가 아닙니다.')
                           return 
                        }
                     })
                     .catch(error => {
                        console.error(error)
                     })
               } else {
                  return callback(item)
               }
            } else if (type === 'login') {
               if (item.adminIpYn === 'N' && adminIp.includes(item.menuMngtId)) {
                  this.alert('접근이 허용된 IP주소가 아닙니다.')
                  return
               }
            } else {
               return callback(item)
            }
            
         },
         // pagecode로 인한 이동
         fn_makePAgeInfo(){
            // console.log("@@@@ fn_inputPageCode : "+this.pageCode);
                           
            let menuInfo = this.$store.getters['tabInfo/getMenuList'];
            
            let pageList = [];
            //메뉴 정보에서 해당 메뉴ID의 최상위 sheet 페이지 정보를 찾는다
            menuInfo.forEach(item => {             
               if(item.hasOwnProperty('children')){
                  item['children'].forEach( (item1,index) => {
                     if(item1.hasOwnProperty('children')){
                        if(item1.children.length > 0){
                        item1['children'].forEach( (item2,index) => {
                           if(item2.pageCode != null && item2.pageCode != ''){
                              item2.upperName = item1.name;
                              pageList.push(item2);                           
                           }
                        })    
                        }else{
                        if(item1.pageCode !=null && item1.pageCode != ''){
                              item1.upperName = item.name;
                              pageList.push(item1);
                           }
                        }
                     }                  
                  })
               }
            });
            
            // pageCode 관련 이동 페이지 정보 셋팅
            if(this.pageCode != null && this.pageCode != ''){
               this.openBox = true;
               this.pageCodeList =  pageList.filter(item => item.pageCode.includes(this.pageCode) == true);
               
               if(this.pageCodeList.length == 0){
                  this.openBox = false;
               }
               
            }else{
               this.pageCodeList = [];
               this.openBox = false;
            }
         },
         fn_inputPageCode(e){
            if(e.key != "Enter"){               
               this.pageCode = e.target.value;
            }
         },
         fn_clickPageCode(code){
            this.pageCode = code;
            this.openBox = false;
            this.fn_movePageCode();
         },
         fn_movePageCode(){         
            let movePageInfo = this.pageCodeList.filter(item => item.pageCode == this.pageCode);
            if(movePageInfo.length > 0){               
               this.fn_clickToPath(movePageInfo[0], movePageInfo[0].upperName);
               this.pageCode = "";
            }           
         },
         fn_mainLogo(){
            this.$router.push({ name: 'Main'});
         },
      }
   };
</script>