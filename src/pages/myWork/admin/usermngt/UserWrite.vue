<template>
    <div class="wrap">

        <div class="lnb_container on">

            <div class="tab_contents">
                <h2 class="sub_title">사용자 등록</h2>
                <div class="inner type2">
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="148">
                                <col width="*">
                                <col width="148">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">사번</span></th>
                                    <td>
                                        <div class="btn_wrap">
                                            <input type="text" v-model="infoData.userId" class="form_control" placeholder="검색해주세요" disabled="false">
                                            <button type="button" class="btn btn_sm btn_darkblue btn_radius" @click="popupSearchUser()">검색</button>
                                        </div>
                                    </td>
                                    <th><span class="emp_red">사용기간</span></th>
                                    <td>
                                        <date-picker-range v-model="infoData.date" :format="'YYYYMMDD'" />
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>사용자명</span></th>
                                    <td>{{infoData.userNm ? infoData.userNm : '-'}}</td>
                                    <!-- <td><input type="text" v-model="infoData.userNm" class="form_control" disabled></td> -->
                                    <th><span>직책</span></th>
                                    <td>{{infoData.jobTitle ? infoData.jobTitle : '-'}}</td>
                                    <!-- <td><input type="text" v-model="infoData.jobTitle" class="form_control w100" disabled/></td> -->
                                </tr>
                                <tr>
                                    <th><span>현장코드</span></th>
                                    <td>{{infoData.workLocCd ? infoData.workLocCd : '-'}}</td>
                                    <!-- <td><input type="text" v-model="infoData.workLocCd" class="form_control w100" disabled/></td> -->
                                    <th><span>현장명</span></th>
                                    <td>{{infoData.workLocNm ? infoData.workLocNm : '-'}}</td>
                                    <!-- <td><input type="text" v-model="infoData.workLocNm" class="form_control w100" disabled/></td> -->
                                </tr>
                                <tr>
                                    <th><span>이메일</span></th>
                                    <td>{{infoData.email ? infoData.email : '-'}}</td>
                                    <!-- <td><input type="text" v-model="infoData.email" class="form_control w100" disabled/></td> -->
                                    <th><span>휴대폰</span></th>
                                    <td>{{infoData.hp ? infoData.hp : '-'}}</td>
                                    <!-- <td><input type="text" v-model="infoData.hp" class="form_control w100" disabled/></td> -->
                                </tr>
                                <tr>
                                    <th><span class="emp_red">권한그룹</span></th>
                                    <td colspan="3">
                                       <div class="btn_wrap">
                                        <input type="text" v-model="infoData.groupAuthNm" class="form_control" placeholder="검색 등록해주세요" disabled="false">
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius" @click="addAuthGroup()"> 검색</button>
                                       </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> <!-- // table_normal_list table_write -->
                    <div class="project_box">
                        <div class="button_box">
                            <div class="fl">
                                <strong class="emp_red">프로젝트 매핑</strong>
                            </div>
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkgray" @click="addSite()">프로젝트 선택</button>
                            </div>
                        </div>
                        <div class="project_list">
                            <span class="project_text" v-if="authSiteData.length == 0 && infoData.authAllSiteChk != 'ALL_SITE'">프로젝트를 추가해주세요</span>
                            <div  class="label_project">
                                <ul>
                                    <li class="black" v-if="authSiteData.indexOf('ALL_SITE') > -1">
                                        <strong>전체 프로젝트</strong>
                                    </li>
                                    <li class="blue" v-for="item in authSiteDataNm" :key="item" :value="item" v-else>
                                        <strong>{{item}}</strong>
                                        <!-- <span class="delete_black" @click="delSite(item)">삭제</span> -->
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div class="submit_area pt20 ac">
                        <button class="btn btn_md btn_outline btn_darkgray" @click="saveData()">등록</button>
                        <button type="button" class="btn btn_md btn_outline btn_gray" @click="goPage()">취소</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 사원검색 팝업 -->
        <EmployeeSearch
            v-bind:reg-user-not-chk="'Y'"
            v-on:fn-employee-choice="employeeChoice"
            :empl-pop-id="'UserWrite_EmployeeSearch'"
            :pop-idx="'6'"
        />

        <!-- 권한그룹 조회 팝업-->
        <auth-group-search
            v-on:fn-authgroup-choice="authGroupChoiceCallback"
        />

        <!-- 프로젝트 설정 팝업 -->
        <MultiProjectSelect @fnProjectChoice="fn_projectChoice" :selectInfo="authSiteData ? authSiteData : []" ref="multiProjectSelect"/>

    </div>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { sendPostApi, requestOptions } from '@/apis/common';
import DatePickerRange from '@component/common/DatePickerRange.vue'
import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'
import CommonProjectSelect from '@/pages/common/popup/CommonProjectSelect.vue';
import AuthGroupSearch from '@/pages/common/popup/AuthGroupSearch.vue' 
import { commonFn } from '@/script/commonFn.js';
import  MultiProjectSelect from '@/pages/common/popup/MultiProjectSelect.vue'     /* 프로젝트 추가 팝업 */

    export default {
        name: 'UserWrite',
        mixins: [MsgBoxMixins],
        components: {
            DatePickerRange,
            EmployeeSearch,
            CommonProjectSelect,
            AuthGroupSearch,
            MultiProjectSelect,
        },
        data() {
            return {
                footerBg: 'transparent',
                infoData : {
                    admUserMngtId : '',
                    userId : '',
                    useStartDt : '',
                    useEndDt : '',
                    userNm : '',
                    jobTitle : '',
                    jobRoleNm : '',
                    workLocCd : '',
                    workLocNm : '',
                    email : '',
                    hp : '',
                    groupAuthDtlId : '',
                    groupAuthNm : '',
                    authAllSiteChk : '',
                    date : [ null, null ]
                },
                authSiteData : [],
                authSiteDataNm : [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        methods: {
            popupSearchUser : function(){
                this.$root.$emit('bv::show::modal', 'UserWrite_EmployeeSearch');
            },
            employeeChoice : async function (infoEmployee) { //사원검색 Callback
                // this.csrtMngrNm = infoEmployee.userNm;
                // this.csrtMngr = infoEmployee.userId;
                // this.choosePerson = '';
                this.infoData.userId     = infoEmployee.userId
                this.infoData.userNm     = infoEmployee.userNm
                this.infoData.jobTitle   = infoEmployee.jobTitle
                this.infoData.jobRoleNm  = infoEmployee.jobRoleNm
                this.infoData.workLocCd  = infoEmployee.workLocCd
                this.infoData.workLocNm  = infoEmployee.workLocNm
                this.infoData.email      = infoEmployee.email

                 // 휴대폰 형식 변환
                if(!commonFn.methods.isEmpty(infoEmployee.hp)){
                    let hpLen = infoEmployee.hp.length
                    let hp = infoEmployee.hp.replaceAll('-','')

                    this.infoData.hp  = hpLen < 4 ? hp : hpLen < 8 ? hp.substring(0,3)+'-****' : hp.substring(0,3)+'-****-'+ hp.substring(7, hpLen)
                }else{
                    infoEmployee.hp = '-'
                }

                // 현장코드 프로젝트 가져오기
                let url = '/sendApi/api/myWork/userMngt/userInfo/projList'
                let param = {
                    paramInfo : { workLocCd : infoEmployee.workLocCd}
                }

                await sendPostApi(url, param).then((data) => {
                    if(typeof data.data.list != 'undefined' && data.data.list.length > 0){
                        this.authSiteData = data.data.list.map(item => item.siteMstrId)
                        this.authSiteDataNm = data.data.list.map(item => item.projectNm)
                    }else{
                        this.authSiteData = []
                        this.authSiteDataNm = []
                    }
                });
            },

            /* 리스트 페이지 이동 */
            goPage : function() { 
                this.$router.push({name: 'UserMngtTab'});
            },

            /* 권한그룹 검색 팝업 */
            addAuthGroup : function() { 
                this.$root.$emit('bv::show::modal', 'AuthGroupSearch');
            },

            /* 권한그룹 선택시 */
            authGroupChoiceCallback : function(infoAuthGroup) {
                this.infoData.groupAuthNm    = infoAuthGroup.groupAuthNm;
                this.infoData.groupAuthDtlId = infoAuthGroup.groupAuthDtlId;
            },

            /* 프로젝트 선택 모달 */
            addSite : function() {
                this.$root.$emit('bv::show::modal', 'MultiProjectSelect');
            },

            /* 프로젝트 선택시 */
            fn_projectChoice(data){
                if(data. indexOf('ALL_SITE') > -1){
                    this.authSiteData =  ['ALL_SITE']
                }else{
                    this.authSiteData =  data.map(item => item.siteMstrId)
                    this.authSiteDataNm =  data.map(item => item.projectNm)
                }
            },

            delSite : function(siteId) {
                this.authSiteData = this.authSiteData.filter(item => item.siteMstrId != siteId);
            },

            /* 사용자 등록 */
            saveData : function() { 
                if(commonFn.methods.isEmpty(this.infoData.userId)) {
                    this.alert("사번이 입력되지 않았습니다.");
                    return;
                }
                if(commonFn.methods.isEmpty(this.infoData.date[0])) {
                    this.alert("사용기간 시작일을 선택해주세요");
                    return;
                }
                if(commonFn.methods.isEmpty(this.infoData.date[1])) {
                    this.alert("사용기간 종료일을 선택해주세요");
                    return;
                }
                if(commonFn.methods.isEmpty(this.infoData.userNm)) {
                    this.alert("사용자명이 입력되지 않았습니다.");
                    return;
                }
                if(commonFn.methods.isEmpty(this.infoData.groupAuthDtlId)) {
                    this.alert("권한그룹이 선택되지 않았습니다.");
                    return;
                }
                if( this.authSiteData.length == 0 && this.infoData.authAllSiteChk != 'ALL_SITE') {
                    this.alert("프로젝트를 선택해주세요");
                    return;
                }

                this.confirm("등록 하시겠습니까?", async () => {
                    this.infoData.useStartDt = this.infoData.date[0];
                    this.infoData.useEndDt = this.infoData.date[1];

                    let url = '/sendApi/api/myWork/userMngt/userInfo/write'
                    let param = {
                        paramInfo : this.infoData,
                        userPrjctList : this.authSiteData
                    }

                    try {
                        await sendPostApi(url, param).then((data) => {
                            if(typeof data.data.count != 'undefined'){
                                if(data.data.count > 0){
                                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                    this.alert("등록되었습니다.", () => {
                                        return this.goPage()
                                    });
                                }else if(data.data.count = -9999){
                                    return this.alert('등록된 직원은 추가할 수 없습니다.')
                                }else{
                                    return this.alert('등록에 실패했습니다.');
                                }
                            }else{
                                return this.alert('등록에 실패했습니다.');
                            }
                        });
                    } catch (error) {
                        return this.alert('등록에 실패했습니다.');
                    }
                })
            }, 

            
        },
        
   }
</script>