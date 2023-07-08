<template>
    <!-- 내 정보, 통합알림 -->
    <div class="main_notice" > <!-- on -->
        <a href="javascript:void(0)" class="ico_close" @click="mainNoticeClose">닫기</a>
        <div class="notice_area">
            <h2 class="sub_title">통합알림</h2>
            <div class="lst_tabs">
                <ul>
                    <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="tabChange(index)">{{tab}}</a></li>
                </ul>
                <div class="right_area mt10">
                    <a href="javascript:void(0);" @click="allconfirmMsg()">모두 읽음</a>
                </div>
            </div>
            <div class="tab_area" v-show="currentTab == 0">
                <div class="form_search">
                    <input type="text" class="form_control" placeholder="미확인 알림 검색">
                </div>

                <ul class="lst_notice">

                    <li v-for="(item, index) in messageList" v-bind:key="index">
                        <a href="javascript:void(0);" @click="confirmMsg(item.publicMessageMngId,  item.scrinUrl, item)">
                            <!-- <p class="notice_tit">[ {{item.projectId == 'ALL_SITE' && item.siteMstrId == 'ALL_SITE'?'전체 프로젝트':item.projectName}} ]</p> -->
                            <p class="notice_tit">{{ !item.projectName || item.projectName === '' ? '' : `[ ${item.projectId == 'ALL_SITE' && item.siteMstrId == 'ALL_SITE'?'전체 프로젝트':item.projectName} ]`}}</p>
                            <!-- <p class="notice_desc"><span class="ico_file">{{item.pubicNoticeMessage}}</span></p> -->
                            <p class="notice_desc">{{item.pubicNoticeMessage}}</p>
                            <p class="notice_info">                                
                                <span class="ico_time">{{item.sendDttm}}</span>
                            </p>
                        </a>
                    </li>

                </ul>
            </div>
            <div class="tab_area" v-show="currentTab == 1">
                <div class="form_search">
                    <input type="text" class="form_control" placeholder="미확인 알림 검색">
                </div>

                <ul class="lst_notice">
                    <li v-for="(item, index) in messageList" v-bind:key="index">
                        <a href="javascript:void(0);" @click="confirmMsg(item.publicMessageMngId, item.scrinUrl, item)">
                            <!-- <p class="notice_tit">[ {{item.projectName}} ]</p> -->
                            <p class="notice_tit">{{ !item.projectName || item.projectName === '' ? '' : `[ ${item.projectId == 'ALL_SITE' && item.siteMstrId == 'ALL_SITE'?'전체 프로젝트':item.projectName} ]`}}</p>
                            <!-- <p class="notice_desc"><span class="ico_file">{{item.pubicNoticeMessage}}</span></p> -->
                            <p class="notice_desc">{{item.pubicNoticeMessage}}</p>
                            <p class="notice_info">                                
                                <span class="ico_time">{{item.sendDttm}}</span>
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="profile_area">
            <div class="user">
                <p class="user_profile"><img src="../../../assets/img/main/main_notice_profile.png" alt="유저 프로필"></p>
                <p class="user_name">{{ userInfo.jobTitle ? userInfo.jobTitle +' '+  userInfo.userNm : userInfo.userNm}}</p>
                <p class="user_division">{{ userInfo.userType == 'HEC'? userInfo.userTypeNm : userInfo.tradeNm ? userInfo.userTypeNm +' '+ userInfo.tradeNm : userInfo.userTypeNm }}</p>
            </div>
            <div class="myinfo">
                <p class="myinfo_tit"><b>내 정보</b></p>
                <div class="myinfo_detail">
                    <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="50%">
                        <col width="50%">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>언어설정</th>
                            <td>
                                <select class="form_control">
                                <option value="KR">Korean</option>
                                <option value="EN">English</option>
                                </select>
                            </td>
                        </tr>
<!--                         <tr>
                            <th>타임존 설정</th>
                            <td>
                                <select class="form_control">
                                <option value="">서울(대한민국)(UTC +09:00)</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>날짜포맷설정</th>
                            <td>
                                <select class="form_control">
                                <option value="">yyyy-MM-dd</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>초기화면 설정</th>
                            <td>
                                <select class="form_control">
                                <option value="">Tab1</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>색상 설정</th>
                            <td>
                                <select class="form_control">
                                <option value="">■ Default</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>개인업무 탭 추가</th>
                            <td>
                                <div class="slide_toggle">
                                <img src="../../../assets/img/main/slide_toggle_temp.png" alt="" style="cursor: pointer">
                                <span class="ml10">비활성</span>
                                </div>
                            </td>
                        </tr> -->
                    </tbody>
                    </table>
                    <div class="option">
                    <!-- <p><a href="javascript:void(0)">알림세팅</a></p> -->
                    <p><a href="javascript:void(0)" v-on:click="fn_passwdChg">비밀번호변경</a></p>
                    </div>
                </div>

                <div class="myinfo_detail">
                    <button type="button" class="btn btn_sm btn_radius btn_logout" @click="fn_logout">로그아웃</button>
                </div>
            </div>

        </div>

        <password-change-modal
            :ref-id="passwordChangeModal"
        />

    </div>
</template>

<script>
import { sendPostApi, requestOptions }  from '@/apis/common';
import commonUtil  from '@plugin/mixin/CommonUtil.js'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import PasswordChangeModal from '@/pages/login/PasswordChangeModal.vue'
import { mapGetters } from 'vuex'

import _ from 'lodash'

    export default{
        mixins: [commonUtil, MsgBoxMixins],
        components: {
            PasswordChangeModal,
        },
        data() {
            return{
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['미확인알림', '전체알림'], // tab name
                userInfo : {},
                messageList : [],

                passwordChangeModal: 'MainNotice_PasswordChange'
            }
        },
        computed: {
            ...mapGetters({
                siteMstrId: 'auth/getSiteMstrId',
                menuList:   'tabInfo/getMenuList',
            }),
        },
        created() {
            var userInfo = this.$session.get('userInfo');
            var userTypeNm = ''
            // console.log('userInfo : ', userInfo);
            if(userInfo.userType == 'HEC'){
                userTypeNm = '본사'
            }
            else if(userInfo.userType == 'PTNR'){
                userTypeNm = '협력사'
            }
            userInfo['userTypeNm'] = userTypeNm
            this.userInfo = {
                ...userInfo
            }
            this.fn_getMessage();
        },
        methods: {
            mainNoticeClose() {
                let mainNotice = document.querySelector('.main_notice');
                let profile = mainNotice.querySelector('.profile_area');
                let notice = mainNotice.querySelector('.notice_area');

                mainNotice.classList.remove('on');
                profile.classList.remove('on');
                notice.classList.remove('on');
            },
            fn_logout: function() {    // 로그아웃
                // 쿠키 삭제
                this.$cookies.remove('Authorization');
                this.$cookies.remove('projectId');
                this.$cookies.remove('siteId');
                
                // vuex정보 초기화
                this.$store.dispatch('auth/setInitData');
                this.$store.dispatch('tabInfo/allTabClose');            

                this.$router.push({name: 'Login'});
            },
            fn_passwdChg(){
                //오토웨이 비빌번호 변경화면 호출
                if (this.$store.getters['auth/getUserType'] === 'HEC') {
                    window.open("https://imsso.hec.co.kr:7443/im/profile/nonecert/userpwd/reset/",'_blank',"width=1000, height=700");
                } else {
                    this.$bvModal.show(this.passwordChangeModal)
                }
            },
            fn_getMessage(){
                // 미확인 통합알림 확인
                let url = '/sendApi/api/common/publicMessage/view';

                let confirmYn = "";
                if(this.currentTab == 0){
                    confirmYn = 'N';
                }else{
                    confirmYn = '';
                }

                let param = {
                    "reciveUserId":this.userInfo['userId'],
                    "messageCnfmYn" : confirmYn
                    };

                sendPostApi(url, param).then((result) => {                     
                    this.messageList = result.data.dlPublicMsg ;
                });
            },
            tabChange(index){        
                this.currentTab = index;        
                this.fn_getMessage();
            },
            async confirmMsg(publicMessageMngId, scrinUrl, msgItem){
                
                //결재코드 current object
                const aprvMsgCodeObj = {
                    'A069': 1, 
                    'A070': 0, 
                    'A071': 0, 
                    'A072': 0, 
                    'A073': 2, 
                    'A074': 5, 
                };
                
                if ( msgItem.siteMstrId !== null 
                    && msgItem.siteMstrId !== undefined
                    && msgItem.siteMstrId !== this.siteMstrId) {

                    this.confirm('프로젝트 변경이 필요합니다. 프로젝트 변경 시 열려 있는 탭이 모두 닫힙니다. 프로젝트를 변경 하시겠습니까?', async () => {
                        // siteMstrId 있는지 조회
                        // 있으면 프로젝트 바꿔서 보내줌
                        // 아니면 그냥 alert

                        // // 미확인 통합알림 확인
                        let url = '/sendApi/api/common/publicMessage/change';
                        let param = {
                            "publicMessageMngId" : publicMessageMngId,
                            "reciveUserId":this.userInfo['userId'],
                            "messageCnfmYn" : "Y"
                            };

                        await sendPostApi(url, param);

                        // 메세지 재조회
                        this.fn_getMessage()

                        // 미확인 카운트 재조회
                        this.$emit('fn-reCount');
        
                        const projectListUrl = '/sendApi/api/popup/newMySitesProject/list'
                        const params = {}
                        requestOptions.headers['Accept-Language'] = "kr"
                        requestOptions.headers['Authorization'] = this.$cookies.get('Authorization')

                        const response = await sendPostApi(projectListUrl, params)
                        if (response.status === 200) {
                            const result = response.data.data.find(siteInfo => siteInfo.siteMstrId === msgItem.siteMstrId)
                            // console.log(result)
                            if (result) {
                                const infoObj = {
                                    projectId:  result.projectId,
                                    projectNm:  result.projectNm,
                                    siteId:     result.siteId,
                                    siteNm:     result.siteNm,
                                    siteMstrId: result.siteMstrId,
                                    baseType:   result.baseType,
                                    baseTypeNm: result.baseTypeNm,
                                    csrtType:   result.csrtType,
                                    csrtTypeNm: result.csrtTypeNm,
                                }

                                this.$cookies.set('projectId',      result.projectId)
                                this.$cookies.set('projectName',    result.projectName)
                                this.$cookies.set('siteId',         result.siteId)
                                this.$cookies.set('siteMstrId',     result.siteMstrId)
                                
                                this.$store.dispatch('ui/setProjectName', result.projectNm)
                                this.$store.dispatch('auth/setProjectInfo', infoObj)

                                this.$session.set('userInfo', this.$store.getters['auth/getAuth'])

                                /** oz문서 처리 */
                                const ozDataUrl = '/sendApi/api/myWork/userMngt/OzReportInfoList/list'
                                const ozDataParams = {
                                    siteMstrId: result.siteMstrId
                                }
                                const ozDataResponse = await sendPostApi(ozDataUrl, ozDataParams)
                                if (typeof ozDataResponse.data.datas.setUpOzInfo != 'undefined') {
                                    this.$store.dispatch('auth/setOzTypeList', ozDataResponse.data.datas.setUpOzInfo.map(item => {
                                        return {
                                            seq: item.seq,
                                            menuNm: item.menuNm,
                                            btnNm: item.btnNm,
                                            docNm: item.docNm,
                                            jspNm: item.jspNm,
                                        }}) 
                                    )
                                }
                                
                                this.$store.dispatch('tabInfo/allTabClose')
                                // 텝 이동
                                
                                if (this.$router.currentRoute.path === '/main') {
                                    if( msgItem.menuMngtId == 'MUMI_0000000117'){

                                        let current = 1;

                                        if(msgItem.messageCode != null){
                                            current = aprvMsgCodeObj[msgItem.messageCode];
                                        }

                                        this.goToPage(scrinUrl, true, { current: current });
                                        // 결재함의 탭안의 결재 탭으로 가야함
                                    } else {
                                        this.goToPage(scrinUrl, true);
                                    }
                                } else {
                                    if( msgItem.menuMngtId == 'MUMI_0000000117'){
                                        
                                        let current = 1;

                                        if(msgItem.messageCode != null){
                                            current = aprvMsgCodeObj[msgItem.messageCode];
                                        }

                                        // this.goToPage(scrinUrl, true, { current: 1 });
                                        this.$router.push({
                                            name: 'Main',
                                            params: {
                                                next: {
                                                    url: scrinUrl,
                                                    params: {
                                                        current: current
                                                    }
                                                },
                                            }
                                        })
                                        // 결재함의 탭안의 결재 탭으로 가야함
                                    } else {
                                        // this.goToPage(scrinUrl, true);
                                        this.$router.push({
                                            name: 'Main',
                                            params: {
                                                next: {
                                                    url: scrinUrl
                                                },
                                            }
                                        })
                                    }

                                }

                                //메세지 확인 창 닫기 
                                this.mainNoticeClose();        

                            } else {
                                this.alert('프로젝트 매핑이 되지 않아 이동할 수 없습니다', () => {
                                    this.mainNoticeClose()
                                })

                            }
                            
                        }

                        //메세지 확인 창 닫기 
                        // this.mainNoticeClose();                        

                    })
                } else {
                    // // 미확인 통합알림 확인
                    let url = '/sendApi/api/common/publicMessage/change';
                    let param = {
                        "publicMessageMngId" : publicMessageMngId,
                        "reciveUserId":this.userInfo['userId'],
                        "messageCnfmYn" : "Y"
                        };

                    await sendPostApi(url, param);

                    // 메세지 재조회
                    this.fn_getMessage();

                    // 텝 이동
                    if( msgItem.menuMngtId == 'MUMI_0000000117'){
                        let current = 1;

                        if(msgItem.messageCode != null){
                            current = aprvMsgCodeObj[msgItem.messageCode];
                        }

                        this.goToPage(scrinUrl, false, { current: current } );
                        // 결재함의 탭안의 결재 탭으로 가야함
                    } else {
                        this.goToPage(scrinUrl);
                    }
    
                    // 미확인 카운트 재조회
                    this.$emit('fn-reCount');
    
                    //메세지 확인 창 닫기 
                    this.mainNoticeClose();
                }

            },
            async allconfirmMsg(){

                // console.log("@@@ all");
                // 미확인 통합알림 모두확인
                let url = '/sendApi/api/common/publicMessage/change';
                let param = {
                    "reciveUserId":this.userInfo['userId'],
                    "messageCnfmYn" : "Y"
                    };

                await sendPostApi(url, param);

                // 메세지 재조회
                this.fn_getMessage();

                // 미확인 카운트 재조회
                this.$emit('fn-reCount');
            }
        }
    }
</script>