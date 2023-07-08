<template>
    <div class="wrap">

        <div class="lnb_container on">

            <div class="tab_contents">
                <h2 class="sub_title">사용자 상세</h2>
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
                                    <th><span>사번</span></th>
                                    <td>{{infoData.userId ? infoData.userId : '-'}}</td>
                                    <th><span>사용기간</span></th>
                                    <td>
                                        <date-picker-range v-model="rageDates" :format="'YYYYMMDD'" :disabled="paramData.pageMode != 'U'"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>사용자명</span></th>
                                    <td>{{infoData.userNm ? infoData.userNm : '-'}}</td>
                                    <th><span>직책</span></th>
                                    <td>{{ infoData.jobTitle ? infoData.jobTitle : '-'}}</td>
                                    <!-- <td v-if="paramData.pageMode != 'U'">{{infoData.jobTitle}}</td>
                                    <td v-if="paramData.pageMode == 'U'"><input type="text" v-model="infoData.jobTitle" class="form_control w100"/></td> -->
                                </tr>
                                <tr>
                                    <th><span>현장코드</span></th>
                                    <td>{{ infoData.workLocCd ? infoData.workLocCd : '-'}}</td>
                                    <!-- <td v-if="paramData.pageMode != 'U'">{{infoData.workLocCd}}</td>
                                    <td v-if="paramData.pageMode == 'U'"><input type="text" v-model="infoData.workLocCd" class="form_control w100"/></td> -->
                                    <th><span>현장명</span></th>
                                    <td>{{ infoData.workLocNm ? infoData.workLocNm : '-'}}</td>
                                    <!-- <td v-if="paramData.pageMode != 'U'">{{infoData.workLocNm}}</td>
                                    <td v-if="paramData.pageMode == 'U'"><input type="text" v-model="infoData.workLocNm" class="form_control w100"/></td> -->
                                </tr>
                                <tr>
                                    <th><span>이메일</span></th>
                                    <td>{{ infoData.email ? infoData.email : '-'}}</td>
                                    <!-- <td v-if="paramData.pageMode != 'U'">{{infoData.email}}</td>
                                    <td v-if="paramData.pageMode == 'U'"><input type="text" v-model="infoData.email" class="form_control w100"/></td> -->
                                    <th><span>휴대폰</span></th>
                                    <td>{{ infoData.hp ? infoData.hp : '-'}}</td>
                                    <!-- <td v-if="paramData.pageMode == 'U'"><input type="text" v-model="infoData.hp" class="form_control w100"/></td> -->
                                </tr>
                                <tr>
                                    <th><span>권한그룹</span></th>
                                    <td colspan="3" v-if="paramData.pageMode != 'U'">{{infoData.groupAuthNm ? infoData.groupAuthNm : '-'}}</td>
                                    <td colspan="3" v-if="paramData.pageMode == 'U'">
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
                                <strong>프로젝트 매핑</strong>
                            </div>
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkgray" @click="addSite()" v-if="paramData.pageMode == 'U'">프로젝트 추가</button>
                            </div>
                        </div>
                        <div class="project_list">
                            <div  class="label_project">
                                <ul>
                                    <li class="black" v-if="authSiteData.indexOf('ALL_SITE') > -1">
                                        <strong>전체 프로젝트</strong>
                                    </li>
                                    <li class="blue" v-for="item in authSiteDataNm" :key="item" :value="item" v-else>
                                        <strong>{{item}}</strong>
                                        <!-- <span class="delete_black" @click="delSite(item)">삭제</span> -->
                                    </li>
                                    <!--<li class="blue">
                                        <strong>가산 테라 자산센터 구축 현장</strong>
                                    </li>
                                    <li class="gray">
                                        <strong>가산 테라 자산센터 구축 현장</strong>
                                    </li> -->
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="submit_area pt20 ac">
                        <!-- 수정 페이지 -->
                        <button class="btn btn_md btn_outline btn_darkgray" @click="saveData()" v-if="paramData.pageMode == 'U'">저장</button>
                        <button type="button" class="btn btn_md btn_outline btn_gray" @click="changeCancel()" v-if="paramData.pageMode == 'U'">취소</button>
                        <!-- 상세 페이지 -->
                        <button class="btn btn_md btn_outline btn_darkgray" @click="paramData.pageMode = 'U'" v-if="paramData.pageMode != 'U'">수정</button>
                        <button type="button" class="btn btn_md btn_outline btn_gray" @click="goListPage()" v-if="paramData.pageMode != 'U'">목록</button>
                    </div>
                </div>
            </div>
        </div>

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
import CommonProjectSelect from '@/pages/common/popup/CommonProjectSelect.vue';
import AuthGroupSearch from '@/pages/common/popup/AuthGroupSearch.vue' 
import MultiProjectSelect from '@/pages/common/popup/MultiProjectSelect.vue'     /* 프로젝트 추가 팝업 */
import { commonFn } from '@/script/commonFn.js';
import { mapGetters } from 'vuex';


    export default {
        name: 'UserView',
        mixins: [MsgBoxMixins],
        components: {
            DatePickerRange,
            CommonProjectSelect,
            AuthGroupSearch,
            MultiProjectSelect,
        },
        computed:{
            ...mapGetters({
                'adminInfo': 'myWork/getAdmin'
            })
        },
        data() {
            return {
                footerBg: 'transparent',
                paramData : {
                    pageMode : '',
                    admUserMngtId : '',
                    userId : ''
                },
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
                },
                rageDates : [ null, null ],
                authSiteData : [],
                authSiteDataNm : [],
                /* BACKUP */
                tmpBack : {
                    orgInfoData : {},
                    orgRageDates : [],
                    orgAuthSiteData : [],
                    orgAuthSiteDataNm : [],
                }
            }
        },
        mounted(){
            this.paramData.admUserMngtId = this.adminInfo.admUserMngtId;
            this.paramData.userId        = this.adminInfo.userId;
            this.searchDetail();
        },
        methods: {
            /* 상세 데이터 조회 */
            searchDetail : async function() {
                let url = '/sendApi/api/myWork/userMngt/userDetail/view'
                let param = {
                    ...this.paramData
                }
                this.paramData.pageMode = ''

                await sendPostApi(url, param).then((data) => {
                    this.infoData     = data.data.datas.dmUserDetail;

                    // 휴대폰 형식 변환
                    if(!commonFn.methods.isEmpty(this.infoData.hp)){
                        let hp = this.infoData.hp.replaceAll('-','')
                        let hpLen = data.data.datas.dmUserDetail.hp.length

                        this.infoData.hp = hpLen < 4 ? hp : hpLen < 7 ? hp.substring(0,3)+'-****' : hp.substring(0,3)+'-****-'+ hp.substring(7, hpLen)
                    }else{
                        this.infoData.hp = '-'
                    }
                    

                    // 프로젝트 정보 
                    if(!commonFn.methods.isEmpty(this.infoData.siteMstrIds)){
                        this.authSiteData = this.infoData.siteMstrIds.split(',')
                    }
                    
                    if(!commonFn.methods.isEmpty(this.infoData.projNms)){
                        this.authSiteDataNm = this.infoData.projNms.split(',')
                    }

                    // 시작일 종료일 (사용기간)
                    this.rageDates = [ this.infoData.useStartDt, this.infoData.useEndDt ]
                    
                    // 데이터 백업
                    this.tmpBack.orgInfoData       = _.cloneDeep(this.infoData)         // 상세 정보
                    this.tmpBack.orgRageDates      = _.cloneDeep(this.rageDates)        // 사용가간
                    this.tmpBack.orgAuthSiteData   = _.cloneDeep(this.authSiteData)     // 프로젝트 목록
                    this.tmpBack.orgAuthSiteDataNm = _.cloneDeep(this.authSiteDataNm)   // 프로젝트명 목록
                });
            },

            /* 리스트 페이지 이동 */
            goListPage : function() {
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

            /* 수정 취소 */
            changeCancel : function() {
                this.paramData.pageMode = 'R';

                // 백업 데이터 불러오기
                this.infoData       = _.cloneDeep(this.tmpBack.orgInfoData)         // 상세 정보
                this.rageDates      = _.cloneDeep(this.tmpBack.orgRageDates)        // 사용가간
                this.authSiteData   = _.cloneDeep(this.tmpBack.orgAuthSiteData)     // 프로젝트 목록
                this.authSiteDataNm = _.cloneDeep(this.tmpBack.orgAuthSiteDataNm)   // 프로젝트명 목록
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

            /* 사용자 등록 */
            saveData : function() {
                if(commonFn.methods.isEmpty(this.rageDates[0])) {
                    this.alert("사용기간 시작일을 선택해주세요");
                    return;
                }
                if(commonFn.methods.isEmpty(this.rageDates[1])) {
                    this.alert("사용기간 종료일을 선택해주세요");
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

                this.confirm("저장 하시겠습니까?", async() => {
                    try {
                        // 사용기간
                        this.infoData.useStartDt = this.rageDates[0];  // 시작일
                        this.infoData.useEndDt = this.rageDates[1];    // 종료일

                        let url = '/sendApi/api/myWork/userMngt/userInfo/change'
                        let param = {
                            paramInfo : this.infoData,
                            userPrjctList : this.authSiteData
                        }

                        await sendPostApi(url, param).then((data) => {
                            if(typeof data.data.count != 'undefined' && data.data.count > 0){
                                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                this.alert("저장 되었습니다.", ()=>{
                                    this.searchDetail()
                                });
                            }else{
                                return this.alert('저장에 실패했습니다.');
                            }
                        });
                    } catch (error) {
                         return this.alert('저장에 실패했습니다.');
                    }
                });
            },
        },
        
   }
</script>