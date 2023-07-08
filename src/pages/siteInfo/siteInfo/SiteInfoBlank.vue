<template>
    <div class="tab_contents">
        <h2 class="sub_title">{{subTitle}}
            <div class="fr">
                <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" v-print="'#siteinfo_blank_print_area'">출력</button>
            </div>
        </h2>
        
        <div class="tab_area" id="siteinfo_blank_print_area">     
            <div class="inner">
                <div class="table_normal_list mt0">
                    <table class="top_table">
                        <colgroup>
                            <col width="148">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span>현장명</span> </th>
                                <td><span>[{{siteId}}] {{siteName}}</span></td>
                            </tr>
                            <tr>
                                <th><span>프로젝트명</span></th>
                                <td><span>[{{projectId}}] {{projectName}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table_normal_list">
                <table class="w50">
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="148">
                        <col width="*">
                        <col width="148">
                        <col width="*">
                    </colgroup>
                    <thead>
                        <tr>
                            <th colspan="4">공사개요</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>민간/공공</th>
                            <td>{{publicType == 0 ? '민간 공사' : '공공 공사'}}</td>
                            <th>{{publicType == 0 ? '사업 승인 일자' : '입찰 공고 일자'}}</th>
                            <td>{{publicType == 0 ? busiApDt : bddgNtcDt}}</td>
                        </tr>
                        <tr>
                            <th>관리여부</th>
                            <td colspan="3">{{mngtType == 0? '관리':(mngtType == 1? '비관리' : (mngtType == 2?'준공':''))}}</td>
                        </tr>
                        <tr>
                            <th>본부</th>
                            <td colspan="3">{{baseType == '4000'? '건축' : '인프라'}}</td>
                        </tr>
                        <tr>
                            <th>공사유형</th>
                            <td colspan="3">{{csrtType == 0 ? '공동주택':(csrtType == 1? '일반건축': (csrtType == 2?'공장':'인프라'))}}</td>
                        </tr>
                        <tr>
                            <th>공사기간</th>
                            <td colspan="3">{{csrtStartDt}} ~ {{csrtEndDt}}</td>
                        </tr>
                        <tr>
                            <th>계약금액</th>
                            <td colspan="3">{{ctrtAmt != '' ? ctrtAmt : 0}} {{ctrtType}}</td>
                        </tr>
                        <tr>
                            <th>공사규모</th>
                            <td colspan="3">{{csrtSize}}</td>
                        </tr>
                        <tr>
                            <th>구조</th>
                            <td colspan="3">{{strc}}</td>
                        </tr>
                        <tr>
                            <th>주요마감</th>
                            <td colspan="3">{{mainClose}}</td>
                        </tr>
                        <tr>
                            <th>연면적(m²)</th>
                            <td colspan="3">{{totalArea}}</td>
                        </tr>
                        <tr>
                            <th>대지면적(m²)</th>
                            <td colspan="3">{{landArea}}</td>
                        </tr>
                        <tr>
                            <th>발주처</th>
                            <td colspan="3">{{orderPlace}}</td>
                        </tr>
                        <tr>
                            <th>설계사</th>
                            <td colspan="3">{{design}}</td>
                        </tr>
                        <tr>
                            <th>감리</th>
                            <td colspan="3">{{spvs}}</td>
                        </tr>
                        <tr>
                            <th>현장소장</th>
                            <td colspan="3">{{csrtMngr}}</td>
                        </tr>
                        <tr>
                            <th>현장공무</th>
                            <td colspan="3">{{csrtBusi}}</td>
                        </tr>
                        <tr>
                            <th>현장관리</th>
                            <td colspan="3">{{csrtMngt}}</td>
                        </tr>
                        <tr>
                            <th>현장등급</th>
                            <td colspan="3">{{csrtLevel == 'EXPR' ? '특급' :
                                              csrtLevel == 'ADVC' ? '고급' : 
                                              csrtLevel == 'MIDL' ? '중급' : '초급' }}</td>
                        </tr>
                        <tr>
                            <th>품질관리자</th>
                            <td colspan="3">
                            <div class="table_normal_list add_table">
                                <table class="">
                                    <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="35%">
                                        <col width="25%">
                                        <col width="25%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>성명</th>
                                            <th>직급</th>
                                            <th>등급</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="" v-on:click="qultDetail(item.memberId)" v-for="(item, index) in qultList" v-bind:key="item.memberId">
                                            <td>{{index+1}}</td>
                                            <td>{{item.memberName}}</td>
                                            <td>{{item.jobTitle}}</td>
                                            <td>
                                                {{item.level == 'EXPR' ? '특급' : 
                                                    item.level == 'ADVC' ? '고급' : 
                                                    item.level == 'MIDL' ? '중급' : 
                                                    item.level == 'BGIN' ? '초급' : '없음'}}
                                            </td>
                                        </tr>
                                        <tr v-if="qultList.length == 0">
                                            <td colspan="5" class="disabled">데이터가 없습니다.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <table class="w50">
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="148">
                        <col width="*">
                        <col width="148">
                        <col width="*">
                    </colgroup>
                    <thead>
                        <tr>
                            <th colspan="4">조감도</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="4">
                                <div class="img_blank">
                                    <img v-bind:src="vmFileId != '' ? '/sendApi/api/fileCall/getSiteInfoImgFile/' + vmFileId : require('@/assets/img/layout/img_blank.png')" alt="">
                                    
                                    <div v-if="vmFileId !='' && checkUser(userId,'down')">
                                        <a href="javascript:void(0);" v-bind:download="projectName" class="btn_img_download" id="downBtn" v-on:click="download"></a>
                                    </div>
                                </div>
                                <input type="hidden" v-model="vmFileId"/>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colspan="3">
                            <pre class="textarea">{{addr}}</pre>
                            </td>
                        </tr>
                        <tr>
                            <th>특이사항</th>
                            <td colspan="3">
                            <pre class="textarea">{{spcMt}}</pre>
                            </td>
                        </tr>

                    </tbody>
                </table>
                </div>
            </div> <!-- // inner -->
        </div>

        <AdminDetail 
            v-bind:change-btn="false" v-bind:detail-obj="qultDetailObj" 
            v-bind:project-id="projectId" v-bind:site-id="siteId" :refId="'siteInfoBlankAdminDetail'"
        />
    </div>
</template>

<script>
    import AdminDetail from '@/pages/common/popup/AdminDetail.vue' 
    import loader from '@ibsheet/loader';
    import { mapGetters } from 'vuex'
    import { commonFn } from '@/script/commonFn.js';
    import { sendPostApi, requestOptions } from '../../../apis/common'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

    let sheetId = '';

    export default {
        name: 'SiteInfoBlank',
        mixins: [authCheckMixns,MsgBoxMixins],
        components: {
            AdminDetail,
        },
        props : {
        },
        data() {
            return {
                subTitle: '현장 정보 상세',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name,
                openPopup: false,
                projectSelectId : 'siteProjectSelect',

                siteMstrId : '',
                projectName : '',                    //프로젝트 name
                projectId : '',
                siteName : '',                       //현장 name
                siteId : '',
                publicType : '0',                  //민간/공공
                baseType : '0',                    //본부
                mngtType : '0',                    //관리여부
                csrtType : '0',                    //공사유형
                busiApDt : null,                  //사업승인일자
                bddgNtcDt : null,                 //입찰공고일자
                csrtStartDt : null,               //공사기간 시작일
                csrtEndDt : null,                 //공사기간 종료일
                ctrtAmt : '',                      //계약금액
                ctrtType : 'KRW',                  //계약금액 단위
                csrtSize : '',                     //공사규모
                strc : '',                          //구조
                mainClose : '',                    //주요마감
                totalArea : '',                    //연면적
                landArea : '',                     //대지면서
                orderPlace : '',                   //발주처
                design : '',                        //설계
                spvs : '',                          //감리
                csrtMngr : '',                     //현장소장
                csrtBusi : '',                     //현장공무
                csrtMngt : '',                     //현장관리
                csrtLevel : '',                    //현장등급
                addr : '',                          //주소
                spcMt : '',                        //특이사항
                vmFileId : '',                    //조감도 파일 id
                qultList : [],                     //품질관리자 list

                popMsg : '',
                confirmUse : true,
                
                qultDetailObj : {},

                siteListData : [],

                searchObj : {
                    mngtType : '',
                    projectNm : '',
                    projectId : '',
                    siteNm: '',
                    siteId : '',
                    csrtStartDt : '',
                    csrtEndDt : '',
                },
                userId:'',
            }
        },

        beforeDestroy() {
            loader.removeSheet(sheetId);
        },

        mounted() {
            //console.log(this.information);
            this.userId = this.$store.getters['auth/getUserId'];
            this.projectId = this.$route.query.projectId;
            this.siteId = this.$route.query.siteId;
            this.siteMstrId = this.$route.query.siteMstrId;
            if(this.projectId != '' && this.siteId != '' && this.siteMstrId != '') {
                this.detailInfo();
            }
        },
        created() {
            //console.log("file"+this.vmFileId);
        },
        computed:{
            ...mapGetters({
                'information': 'getInformation'
            })
        },
        methods: {
            detailInfo : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/siteInfo/view';
                this.siteId = this.information.siteId;
                this.projectId = this.information.projectId;
                this.siteMstrId = this.information.siteMstrId;
                let param = {
                    "projectId" : this.projectId,
                    "siteId" : this.siteId,
                    "siteMstrId" : this.siteMstrId
                };

                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });
                
                if(resData.rCode == "0000") {
                    let detail = resData.datas.result;
                    
                    if(detail != null) {
                        this.siteMasterId = detail.siteMstrId;
                        this.projectName = detail.projectNm;
                        this.siteName = detail.siteNm;
                        this.publicType = detail.publicType;
                        this.busiApDt = detail.busiApDt;
                        this.bddgNtcDt = detail.bddgNtcDt;
                        this.mngtType = detail.mngtType;
                        this.baseType = detail.baseType;
                        this.csrtType = detail.csrtType;
                        this.csrtStartDt = detail.csrtStartDt;
                        this.csrtEndDt = detail.csrtEndDt;

                        let today = commonFn.methods.getToday().replace(/-/gi, '');
                        let from = this.csrtEndDt.replace(/-/gi, '');
                        
                        if(from < today) {
                            this.mngtType = 2;
                        }else if(today <= from && this.mngtType == '1') {
                            this.mngtType = 1;
                        }else if(today <= from && this.mngtType == '0') {
                            this.mngtType = 0;
                        }
                        this.ctrtAmt = commonFn.methods.addCommas(detail.ctrtAmt);
                        this.ctrtType = detail.ctrtType;
                        this.csrtSize = detail.csrtSize;
                        this.strc = detail.strc;
                        this.mainClose = detail.mainClose;
                        this.totalArea = commonFn.methods.addCommas(detail.totalArea);
                        this.landArea = commonFn.methods.addCommas(detail.landArea);
                        this.orderPlace = detail.orderPlace;
                        this.design = detail.design;
                        // this.spvs = detail.spvsNm;
                        this.spvs = detail.spvs;
                        this.csrtMngr = detail.csrtMngrNm; 
                        this.csrtBusi = detail.csrtBusiNm;
                        this.csrtMngt = detail.csrtMngtNm;
                        this.csrtLevel = detail.csrtLevel;
                        this.addr = detail.addr;
                        this.spcMt = detail.spcMt;
                        this.qultList = detail.qultList;
                        this.vmFileId = detail.vmFileId;
                        
                        if(this.vmFileId == null){
                            this.vmFileId = '';
                        }
                        return;
                    }
                }else {
                    // this.confirmUse = false;
                    // this.popMsg = '조회에 실패했습니다.';
                    // this.$root.$emit('bv::show::modal', 'popAlert');
                    this.alert('조회에 실패했습니다.');
                    return;
                }
            },
            siteImg : async function(siteMstrId) {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/file/upFileList';
                let param = {
                    fileType : "SiteInfo",
                    fileConnectId : siteMstrId
                };
                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });
                //console.log(resData);
                resData.data.forEach(data => {
                    this.LstImgRst.push(data);
                })
                return resData;
            },
            qultDetail : function(memberId) {
                // if(!this.checkUser(this.$store.getters['auth/getUserId'],'view')){
                //     return;
                // }
                for(let i=0; i<this.qultList.length; i++) {
                    if(memberId == this.qultList[i].memberId) {
                        this.qultDetailObj = this.qultList[i];
                    }
                }
                this.$root.$emit('bv::show::modal', 'siteInfoBlankAdminDetail');
            },
            download: function(){
                if(this.vmFileId != ''){
                    let btn = document.getElementById('downBtn');
                    btn.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/' + this.vmFileId);
                }
            }
        },

    }
</script>