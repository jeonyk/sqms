import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

// import VueCookies from 'vue-cookies'

import Login from '../pages/login/Login';
import Root from '../pages/login/SSOLogin';
import SSOLogin from '../pages/login/SSOLogin';
import TestLogin from '@/pages/login/TestLogin.vue';

import PasswdChg from '../pages/login/PasswdChg';
import Main from '../pages/main/Main';

import download from '../pages/download/download.vue';
import downPrivacy from '../pages/download/downPrivacy.vue'
//현장정보
import SiteInfoView from '../pages/siteInfo/siteInfo/SiteInfoView';
import SiteInfoBlank from '../pages/siteInfo/siteInfo/SiteInfoBlank';
import SiteInfoChange from '../pages/siteInfo/siteInfo/SiteInfoChange';
import SiteInfoWrite from '../pages/siteInfo/siteInfo/SiteInfoWrite';
//품질관리자
import QualityMngrList from '../pages/siteInfo/qualityMngr/QuailtyMngrList.vue'
//현장품질방침/목표
import QualityPolicyInfo from '../pages/siteInfo/qualityPolicy/qualityPolicyInfo.vue'
import QualityPolicyAllSite from '../pages/siteInfo/qualityPolicy/qualityPolicyAllSite.vue'

//품질시스템관리
import QualityMngtView from '../pages/siteInfo/qualityMngt/QualityMngtView.vue'
import QualityMngtAdm from '../pages/siteInfo/qualityMngt/QualityMngtAdm.vue'
import QualityMngtAllSite from '../pages/siteInfo/qualityMngt/QualityMngtAllSite.vue'

import HouseOptnCurrentTab from '../pages/siteInfo/houseOptn/component/HouseOptnCurrentTab.vue'
import HouseOptnInfoMySiteSheet from '../pages/siteInfo/houseOptn/HouseOptnInfoMySiteSheet.vue'
import HouseOptnInfoAllSiteView from '../pages/siteInfo/houseOptn/HouseOptnInfoAllSiteView.vue'
import HouseOptnInfoSheet from '../pages/siteInfo/houseOptn/HouseOptnInfoSheet.vue'

// 시험관리
// import common from '../apis/common.js';
import TestMngtHeadSetUpSheet from '../pages/quality/testMngt/TestMngtHeadSetUpSheet.vue';
import TestMngtSiteSetUpSheet from '../pages/quality/testMngt/TestMngtSiteSetUpSheet.vue';
import QualityTestPlanSheet from '../pages/quality/testMngt/QualityTestPlanSheet.vue';
import QualityMngCostSheet from '../pages/quality/testMngt/QualityMngCostSheet.vue';
import TestResultMngtSheet from '../pages/quality/testMngt/TestResultMngtSheet.vue';
import TestResultMngtWrite from '../pages/quality/testMngt/TestResultMngtWrite.vue';
import TestResultMngtDetail from '../pages/quality/testMngt/TestResultMngtDetail.vue';
import TestResultMngtInput from '../pages/quality/testMngt/TestResultMngtInput.vue';
import TestResultMngtUpdate from '../pages/quality/testMngt/TestResultMngtUpdate.vue';
// import StatusManagrSheet from '';

//자재관리
import MaterialHeadSetUpSheet from '../pages/quality/materialMngt/MaterialHeadSetUpSheet';
import MaterialCheckListSheet from '../pages/quality/materialMngt/MaterialCheckListSheet'
import MaterialSiteSetUpSheet from '../pages/quality/materialMngt/MaterialSiteSetUpSheet';
import MaterialSourceApprovalSheet from '../pages/quality/materialMngt/MaterialSourceApprovalSheet';
// import MaterialSourceApprovalWrite from '../pages/quality/materialMngt/MaterialSourceApprovalWrite';
import MaterialSourceApprovalView from '../pages/quality/materialMngt/MaterialSourceApprovalView';

import MeterialSpApprView from '../pages/quality/materialMngt/MeterialSpApprView';

import MaterialTestSheet from '../pages/quality/materialMngt/TestSheet.vue'

import AcceptTestResultWrite from '../pages/quality/materialMngt/AcceptTestResultWrite.vue';
import AcceptTestResultAllSite from '../pages/quality/materialMngt/AcceptTestResultAllSite.vue';
import FactoryTestListSheet from '../pages/quality/materialMngt/FactoryTestListSheet.vue';
import FactoryTestResultWrite from '../pages/quality/materialMngt/FactoryTestResultWrite.vue';
import FactoryTestResultAllSite from '../pages/quality/materialMngt/FactoryTestResultAllSite.vue';

//콘크리트 관리
import SelectCurrentTab from '../pages/quality/concreteMngt/component/SelectCurrentTab';
import PourSetUpSheet from '../pages/quality/concreteMngt/PourSetUpSheet';
import PourSetUpWrite from '../pages/quality/concreteMngt/PourSetUpWrite';
import PourSetUpView from '../pages/quality/concreteMngt/PourSetUpView';
import SelectCurrentStrgTab from '../pages/quality/concreteMngt/component/SelectCurrentStrgTab';
import CompStrgSetUpWrite from '../pages/quality/concreteMngt/CompStrgSetUpResultForm/CompStrgSetUpWrite.vue'
import CompStrgSetUpView from '../pages/quality/concreteMngt/CompStrgSetUpResultForm/CompStrgSetUpView.vue'
import CompStrgSetUpDetailPopUp from '../pages/quality/concreteMngt/CompStrgSetUpResultForm/CompStrgSetUpDetailPopUp.vue'
import PourSetUpDetailPopUp from '../pages/quality/concreteMngt/PourSetUpResultWriteForm/PourSetUpDetailPopUp.vue'
// import ConcreteAPITest from '../pages/quality/concreteMngt/APITestSheet'

//균열 관리
import CrackSetupSheet from '../pages/quality/crackMngt/CrackSetup.vue';
import CrackList from '../pages/quality/crackMngt/CrackList.vue';
import CrackListAllSite from '../pages/quality/crackMngt/CrackListAllSite.vue';
import CrackAccountBook from '../pages/quality/crackMngt/CrackAccountBook.vue'
import CrackInfoWrite from '../pages/quality/crackMngt/CrackInfoWrite.vue'
// import CrackInfoBlank from '../pages/quality/crackMngt/CrackInfoBlank.vue'

//검측관리
import InspectHeadSetupSheet from '../pages/quality/inspectMngt/InspectHeadSetupSheet.vue'
import InspectSiteSetupSheet from '../pages/quality/inspectMngt/InspectSiteSetupSheet.vue'
import InspectMngtListSheet from '../pages/quality/inspectMngt/InspectMngtListSheet.vue'
import InspectMngtInfoWrite from '../pages/quality/inspectMngt/InspectMngtInfoWrite.vue'
import InspectMngtInfoView from '../pages/quality/inspectMngt/InspectMngtInfoView.vue'
import InspectMngtListAllSite from '../pages/quality/inspectMngt/InspectMngtListAllSite.vue'
import InspectMngtReqstWrite from '../pages/quality/inspectMngt/InspectMngtReqstWrite.vue'
import InspectMngtNoticeWrite from '../pages/quality/inspectMngt/InspectMngtNoticeWrite.vue'

//품질사진
import QualityImageSheet from '../pages/community/qualityImage/QualityImageSheet.vue'

// 결재함
import MyWorkApprovedDocSheet from '../pages/myWork/approvedDoc/ApprovedDocSheet.vue'
import MyWorkApprovedDocView from '../pages/myWork/approvedDoc/ApprovedDocView.vue'
import MyWorkApprovedDocSet from '../pages/myWork/approvedDoc/ApprovedDocSet.vue'

// 나의 할일
import MyJobSheet from '../pages/myWork/myJob/MyJobSheet.vue'

// 점검및 교육
// 시험/검사장비
import TestDeviceSetUpSheet from '../pages/checkEdu/testDevice/testDeviceSetUpSheet.vue'
import TestDeviceSheet from '../pages/checkEdu/testDevice/testDeviceSheet.vue'
import TestDeviceAllSite from '../pages/checkEdu/testDevice/testDeviceAllSite.vue'

//교육훈련
import EduPlanSheet from '../pages/checkEdu/eduMngt/EduPlanSheet.vue'
import EduCurrentTab from '../pages/checkEdu/eduMngt/component/EduCurrentTab.vue'

//자체품질점검
import SelfQualityHeadSheet from '../pages/checkEdu/selfQuality/SelfQualityHeadSheet.vue'
import SelfQualitySiteSheet from '../pages/checkEdu/selfQuality/SelfQualitySiteSheet.vue'

//신규 근로자 교육 현황
import WorkerEduLangSheet from '../pages/checkEdu/workerEdu/WorkerEduLangSheet.vue'
import WorkerEduCodeSheet from '../pages/checkEdu/workerEdu/WorkerEduCodeSheet.vue'
import WorkerEduTranSlationSheet from '../pages/checkEdu/workerEdu/WorkerEduTranSlationSheet.vue'
import WorkerEduTextBookSheet from '../pages/checkEdu/workerEdu/WorkerEduTextBookSheet.vue'
import WorkerEduCurrentTab from '../pages/checkEdu/workerEdu/component/WorkerEduCurrentTab.vue'
import WorkerEduStatusSiteTab from '../pages/checkEdu/workerEdu/component/WorkerEduStatusSiteTab.vue'
import WorkerEduStatusMySite from '../pages/checkEdu/workerEdu/WorkerEduStatusMySite.vue'
import WorkerEduStatusAllSite from '../pages/checkEdu/workerEdu/WorkerEduStatusAllSite.vue'
import WorkerEduSiteSetUpView from '../pages/checkEdu/workerEdu/WorkerEduSiteSetUpView.vue'
import WorkerEduCationMobileLogin from '../pages/checkEdu/workerEdu/WorkerEduCationMobileLogin.vue'
import WorkerEduCationMobileSelect from '../pages/checkEdu/workerEdu/WorkerEduCationMobileSelect.vue'
import WorkerEduCationMobileView from '../pages/checkEdu/workerEdu/WorkerEduCationMobileView.vue'
import WorkerEduCationMobilePledge from '../pages/checkEdu/workerEdu/WorkerEduCationMobilePledge.vue'

//커뮤니티 - 공지사항
import NoticeSheet from '../pages/community/notice/NoticeSheet.vue'
import NoticeWrite from '../pages/community/notice/NoticeWrite.vue'
import NoticeView from '../pages/community/notice/NoticeView.vue'
 
//커뮤니티 - 자료실
/* import DataArchiveList from '../pages/community/dataArchive/DataArchiveList.vue'
import DataArchiveWrite from '../pages/community/dataArchive/DataArchiveWrite.vue'
import DataArchiveView from '../pages/community/dataArchive/DataArchiveView.vue' */

//커뮤니티 - 자유게시판
import FreeBoardSheet from '../pages/community/freeBoard/FreeBoardSheet.vue'
import FreeBoardWrite from '../pages/community/freeBoard/FreeBoardWrite.vue'
import FreeBoardView from '../pages/community/freeBoard/FreeBoardView.vue'

//커뮤니티 - 자유게시판
import DocChangeSheet from '../pages/community/docChange/DocChangeSheet.vue'
import DocChangeWrite from '../pages/community/docChange/DocChangeWrite.vue'
import DocChangeView from '../pages/community/docChange/DocChangeView.vue'

// 통계분석
import TestStatsView from '../pages/stats/testStats/TestStatsView.vue'
import ConcreteStatsView from '../pages/stats/concreteStats/ConcreteStatsView.vue'
import MaterialStatsView from '../pages/stats/meterialStats/MaterialStatsView.vue'
import NonConfirmStatsView from '../pages/stats/noConfirmStats/NonConfirmStatsView.vue'
import ExtrnlChckStatsView from '../pages/stats/extrnlChck/ExtrnlChckStatsView.vue'
import BsChkStatsView from '../pages/stats/bSChkStats/BsChkStatsView.vue'
import EduTrainingStatsView from '../pages/stats/eduTraining/EduTrainingStatsView.vue'
import ItUtilStatsList from '../pages/stats/itUtil/ItUtilStatsList.vue'
import PqiStatsInfoView from '../pages/stats/pqi/PqiStatsInfoView.vue'

// 주간업무보고
import ReportWikSheet from '../pages/stats/report/ReportWikSheet.vue'

// 경영검토
import ReviewSheet from '../pages/stats/review/ReviewSheet.vue'

/* Admin */
// 품질관리비
import QltyMngtCostSheet from '../pages/myWork/admin/quality/QltyMngtCostSheet.vue'

// 코드관리
import CodeMngtTab from '../pages/myWork/admin/codemngt/CodeMngtTab.vue'
import CodeMngtWrite from '../pages/myWork/admin/codemngt/CodeMngtWrite.vue'
import CodeMngtView from '../pages/myWork/admin/codemngt/CodeMngtView.vue'

// 사용자 관리
import UserMngtTab from '../pages/myWork/admin/usermngt/UserMngtTab.vue'
import UserWrite from '../pages/myWork/admin/usermngt/UserWrite.vue'
import UserView from '../pages/myWork/admin/usermngt/UserView.vue'
import SqmsBatchSheet from '../pages/myWork/admin/usermngt/SqmsBatchSheet.vue'
import LoginHistoryView from '../pages/myWork/admin/usermngt/LoginHistoryView.vue'
import OzDocTypeSiteSetUpSheet from '../pages/myWork/admin/usermngt/OzDocTypeSiteSetUpSheet.vue'

// 협력사 관리
import TradeMngtTab from '../pages/myWork/admin/trademngt/TradeMngtTab.vue'

// 권한그룹
import AuthGroupTab from '../pages/myWork/admin/auth/AuthGroupTab.vue'

//파일업로드 테스트용
import FileTest from '../pages/community/freeBoard/FileTest.vue'

import NoConfirmSiteSetUpSheet from '../pages/quality/noConfirmMngt/NoConfirmSiteSetUpSheet.vue'
import NoConfirmMngtSheet from '../pages/quality/noConfirmMngt/NoConfirmMngtSheet.vue'

//BS점검
import BsCheckdataMngtHeadSetUpSheet from '../pages/bsCheck/dataMngt/dataMngtHeadSetUpSheet.vue'
import BsCheckdataMngtSiteSetUpSheet from '../pages/bsCheck/dataMngt/dataMngtSiteSetUpSheet.vue'
import BsCheckHouseDeffectSheet from '../pages/bsCheck/bsCheckMngt/BsCheckHouseDeffectSheet.vue'
import BsCheckPublicHouseDeffectSheet from '../pages/bsCheck/bsCheckMngt/BsCheckPublicHouseDeffectSheet.vue'
import BsCheckProCessingUnSignDelaySheet from '../pages/bsCheck/bsCheckMngt/BsCheckProCessingUnSignDelaySheet.vue'

//my work
//캘린더
import Calender from '../pages/myWork/calender/Calender.vue'

//자료실

import QltyTstPArchiveSheet from '../pages/dataArchive/qltyTstP/QltyTstPArchiveSheet.vue'
import QltyTstPArchiveWrite from '../pages/dataArchive/qltyTstP/QltyTstPArchiveWrite.vue'
import QltyTstPArchiveView from '../pages/dataArchive/qltyTstP/QltyTstPArchiveView.vue'

import ItpArchiveSheet from '../pages/dataArchive/itp/ItpArchiveSheet.vue'
import ItpArchiveWrite from '../pages/dataArchive/itp/ItpArchiveWrite.vue'
import ItpArchiveView from '../pages/dataArchive/itp/ItpArchiveView.vue'

import ChkLstArchiveSheet from '../pages/dataArchive/chkLst/ChkLstArchiveSheet.vue'
import ChkLstArchiveWrite from '../pages/dataArchive/chkLst/ChkLstArchiveWrite.vue'
import ChkLstArchiveView from '../pages/dataArchive/chkLst/ChkLstArchiveView.vue'

import CodeSpcArchiveSheet from '../pages/dataArchive/codeSpc/CodeSpcArchiveSheet.vue'
import CodeSpcArchiveWrite from '../pages/dataArchive/codeSpc/CodeSpcArchiveWrite.vue'
import CodeSpcArchiveView from '../pages/dataArchive/codeSpc/CodeSpcArchiveView.vue'

import QltySstArchiveSheet from '../pages/dataArchive/qltySst/QltySstArchiveSheet.vue'
import QltySstArchiveWrite from '../pages/dataArchive/qltySst/QltySstArchiveWrite.vue'
import QltySstArchiveView from '../pages/dataArchive/qltySst/QltySstArchiveView.vue'

import GuideArchiveSheet from '../pages/dataArchive/guide/GuideArchiveSheet.vue'
import GuideArchiveWrite from '../pages/dataArchive/guide/GuideArchiveWrite.vue'
import GuideArchiveView from '../pages/dataArchive/guide/GuideArchiveView.vue'

import CsbkArchiveSheet from '../pages/dataArchive/csbk/CsbkArchiveSheet.vue'
import CsbkArchiveWrite from '../pages/dataArchive/csbk/CsbkArchiveWrite.vue'
import CsbkArchiveView from '../pages/dataArchive/csbk/CsbkArchiveView.vue'

import IhbtArchiveSheet from '../pages/dataArchive/ihbt/IhbtArchiveSheet.vue'
import IhbtArchiveWrite from '../pages/dataArchive/ihbt/IhbtArchiveWrite.vue'
import IhbtArchiveView from '../pages/dataArchive/ihbt/IhbtArchiveView.vue'

import VdoConfArchiveSheet from '../pages/dataArchive/vdoConf/VdoConfArchiveSheet.vue'
import VdoConfArchiveWrite from '../pages/dataArchive/vdoConf/VdoConfArchiveWrite.vue'
import VdoConfArchiveView from '../pages/dataArchive/vdoConf/VdoConfArchiveView.vue'

import SpcIsptArchiveSheet from '../pages/dataArchive/spcIspt/SpcIsptArchiveSheet.vue'
import SpcIsptArchiveWrite from '../pages/dataArchive/spcIspt/SpcIsptArchiveWrite.vue'
import SpcIsptArchiveView from '../pages/dataArchive/spcIspt/SpcIsptArchiveView.vue'

import EtcArchiveSheet from '../pages/dataArchive/etc/EtcArchiveSheet.vue'
import EtcArchiveWrite from '../pages/dataArchive/etc/EtcArchiveWrite.vue'
import EtcArchiveView from '../pages/dataArchive/etc/EtcArchiveView.vue'

import QltyBidArchiveSheet from '../pages/dataArchive/qltyBid/QltyBidArchiveSheet.vue'
import QltyBidArchiveWrite from '../pages/dataArchive/qltyBid/QltyBidArchiveWrite.vue'
import QltyBidArchiveView from '../pages/dataArchive/qltyBid/QltyBidArchiveView.vue'

import CstrHbArchiveSheet from '../pages/dataArchive/cstrHb/CstrHbArchiveSheet.vue'
import CstrHbArchiveWrite from '../pages/dataArchive/cstrHb/CstrHbArchiveWrite.vue'
import CstrHbArchiveView from '../pages/dataArchive/cstrHb/CstrHbArchiveView.vue'

import _ from 'lodash'

// import sampleIbsheet from '../pages/sample/sample_ibsheet.vue'
Vue.use(Vuex);
Vue.use(VueRouter);
// Vue.use(common);


const route = [

    //sample
    // {path: '/sampleIbsheet', name:'sampleIbsheet', component: sampleIbsheet, meta: { layout: "noType" }},

    /* main */
    {path: '/', name:'Root', component: Root, meta: { layout: "noType" }},
    {path: '/main', name:'Main', component: Main, meta: { layout: "mainLayout" }},
    
    /* login */
    {path: '/sqmsLogin', name:'Login', component: Login, meta: { layout: "login" }},
    {path: '/SSOLogin', name:'SSOLogin', component: SSOLogin, meta: { layout: "noType" }},
    {path: '/testLogin', name: 'TestLogin', component: TestLogin, meta: { layout: "login" }},

    /*download */
    {path: '/view/download', name:'Download', component: download, meta: { layout: "noType" }},
    {path: '/view/downPrivacy', name:'DownPrivacy', component: downPrivacy, meta: { layout: "noType" }},


    /* passwdChg */
    {path: '/view/passwdChg', name:'PasswdChg', component: PasswdChg, meta: { layout: "login" }},


    /* 현장정보 및 QA */
    // 1. 현장정보
    {path: '/view/siteInfo/view', name: 'SiteInfoView', component: SiteInfoView, props:true}, //mysite 현장정보 detail
    {path: '/view/siteInfo/allsiteBlank', name: 'SiteInfoBlank', component: SiteInfoBlank, props:true, meta: { layout: "noType"}}, //allsite 현장정보 detail
    {path: '/view/siteInfo/write', name: 'SiteInfoWrite', component: SiteInfoWrite, props:true}, //현장정보 등록
    {path: '/view/siteInfo/change', name: 'SiteInfoChange', component: SiteInfoChange, props: true}, //현장정보 수정
    //2.품질관리자
    {path: '/view/qualityMngr/list', name: 'QualityMngrList', component: QualityMngrList, props: true}, //품질관리자 리스트
    //3.현장품질방침/목표
    {path: '/view/qualityPolicy/info', name: 'QualityPolicyInfo', component: QualityPolicyInfo, props: true}, //현장품질방침
    {path: '/view/qualityPolicy/allSite', name: 'QualityPolicyAllSite', component: QualityPolicyAllSite, props: true, meta: { layout: "noType"}}, //현장품질방침

    //4.품질시스템관리
    {path: '/view/quailtyMngt/view', name: 'QualityMngtView', component: QualityMngtView, props: true}, //품질시스템 관리 view
    {path: '/view/quailtyMngt/adm', name: 'QualityMngtAdm', component: QualityMngtAdm, props: true}, //품질시스템 관리 adm
    {path: '/view/quailtyMngt/allSite', name: 'QualityMngtAllSite', component: QualityMngtAllSite, props: true, meta: { layout: "noType"}}, //품질시스템 관리 상세 새창
    
    //5.세대옵션
    {path: '/view/siteInfo/houseOptn/view', name: 'HouseOptnCurrentTab', component: HouseOptnCurrentTab, props: true},
    {path: '/view/siteInfo/houseOptnMySite/sheet', name: 'HouseOptnInfoMySiteSheet', component: HouseOptnInfoMySiteSheet, props: true},
    {path: '/view/siteInfo/houseOptnAllSite/view', name: 'HouseOptnInfoAllSiteView', component: HouseOptnInfoAllSiteView, props: true},
    {path: '/view/siteInfo/houseOptn/sheet', name: 'HouseOptnInfoSheet', component: HouseOptnInfoSheet, props: true},

    /* 품질활동 */
    // 1. 시험관리
    {path: '/view/testMngt/headSetUp/sheet', name: 'TestMngtHeadSetUpSheet', component: TestMngtHeadSetUpSheet, props: true},        // 본사 Set-up
    {path: '/view/testMngt/siteSetUp/sheet', name: 'TestMngtSiteSetUpSheet', component: TestMngtSiteSetUpSheet, props: true},        // 현장 Set-up
    {path: '/view/testMngt/qualityTestPlan/sheet', name: 'QualityTestPlanSheet', component: QualityTestPlanSheet, props: true},      // 품질시험계획서
    {path: '/view/testMngt/qualityMngCost/sheet', name: 'QualityMngCostSheet', component: QualityMngCostSheet, props: true},         // 품질관리비
    {path: '/view/testMngt/testResultMngt/sheet', name: 'TestResultMngtSheet', component: TestResultMngtSheet, props: true},          // 품질시험
    {path: '/view/testMngt/testResultMngt/write', name: 'TestResultMngtWrite', component: TestResultMngtWrite, props: true},          // 시험등록
    {path: '/view/testMngt/testResultMngt/detail', name: 'TestResultMngtDetail', component: TestResultMngtDetail, props: true},          // 시험상세
    {path: '/view/testMngt/testResultMngt/input', name: 'TestResultMngtInput', component: TestResultMngtInput, props: true},          // 시험결과상세
    {path: '/view/testMngt/testResultMngt/update', name: 'TestResultMngtUpdate', component: TestResultMngtUpdate, props: true},          // 시험결과상세
    // {path: '/testMngt/statusManagr/sheet', name: 'statusManagrSheet', component: StatusManagrSheet, props: true},            // 현황관리대장
    
    // 2. 자재관리
    {path: '/view/materialMngt/headSetUp/sheet', name: 'MaterialHeadSetUpSheet', component: MaterialHeadSetUpSheet, props: true},    // 본사 Set-up
    {path: '/view/materialMngt/projectChecklist/view', name: 'MaterialProjectCheckListView', component: () => import('@/pages/quality/materialMngt/MaterialProjectCheckListView.vue'), props: true }, // 본사 checklist
    {path: '/view/materialMngt/siteChecklist/view', name: 'MaterialSiteCheckListView', component: () => import('@/pages/quality/materialMngt/MaterialSiteCheckListView.vue'), props: true }, // 현장 checklist
    {path: '/view/materialMngt/checkList/view', name: 'MaterialCheckListSheet', component: MaterialCheckListSheet, props: true},    // 글로벌 checkList
    {path: '/view/materialMngt/siteSetUp/sheet', name: 'MaterialSiteSetUpSheet', component: MaterialSiteSetUpSheet, props: true},    // 현장 Set-up
    {path: '/view/materialMngt/materialSpAppr/sheet', name: 'MaterialSourceApprovalSheet', component: MaterialSourceApprovalSheet, props: true},    // 자재공급원 승인 list
    // {path: '/materialMngt/materialSpAppr/write', name: 'MaterialSourceApprovalWrite', component: MaterialSourceApprovalWrite, props: true},    // 자재공급원 승인 list
    {path: '/view/materialMngt/materialSpAppr/view', name: 'MaterialSourceApprovalView', component: MaterialSourceApprovalView, props: true, },    // 자재공급원 승인 list
    {path: '/view/materialMngt/materialSpAppr/allSite', name: 'MaterialSourceApprovalAllView', component: MaterialSourceApprovalView, props: true, meta: { layout: 'noType' }},    // 자재공급원 승인 list


    {path: '/view/materialMngt/materialSpAppr/detailBlank', name: 'MeterialSpApprView', component: MeterialSpApprView, props: true, meta: { layout: "noType"}},    // 자재공급원 승인 상세

    // {path: '/view/materialMngt/testSheet/sheet', name: 'TestSheet', component: MaterialTestSheet, props: true},

    {path: '/view/materialMngt/acceptTestList/sheet', name: 'AcceptTestList', component: () => import('@/pages/quality/materialMngt/AcceptTestListSheet.vue'), props: true},   //인수검사 리스트
    {path: '/view/materialMngt/acceptTestList/write', name: 'AcceptTestResultWrite', component: AcceptTestResultWrite, props: true},    // 인수검사 결과 등록
    {path: '/view/materialMngt/acceptTestList/allSite', name: 'AcceptTestResultAllSite', component: AcceptTestResultAllSite, props:true, meta: { layout: "noType"}}, //allsite 인수검사 상세
    {path: '/view/materialMngt/factoryTestList/sheet', name: 'FactoryTestListSheet', component: FactoryTestListSheet, props: true},   //공장검사 리스트
    {path: '/view/materialMngt/factoryTestList/write', name: 'FactoryTestResultWrite', component: FactoryTestResultWrite, props: true},   //공장검사 리스트
    {path: '/view/materialMngt/factoryTestList/allSite', name: 'FactoryTestResultAllSite', component: FactoryTestResultAllSite, props: true, meta: { layout: "noType"}},   //공장검사 리스트

    // 2. 콘크리트 관리
    {path: '/view/concreteMngt/concrete/view', name:'SelectCurrentTab', component: SelectCurrentTab, props: true},     // 초기 Setting
    {path: '/view/concreteMngt/pourSetUp/sheet', name: 'PourSetUpSheet', component: PourSetUpSheet, props: true}, // 타설 관리
    {path: '/view/concreteMngt/pourSetUp/write', name: 'PourSetUpWrite', component: PourSetUpWrite, props: true}, // 타설 등록
    {path: '/view/concreteMngt/pourSetUp/view', name: 'PourSetUpView', component: PourSetUpView, props: true}, // 타설 상세
    {path: '/view/concreteMngt/compSetUp/sheet', name:'SelectCurrentStrgTab', component : SelectCurrentStrgTab, props: true},
    {path: '/view/concreteMngt/compSetUp/write', name:'CompStrgSetupWrite', component: CompStrgSetUpWrite, props: true},
    {path: '/view/concreteMngt/compSetUp/detail', name:'CompStrgSetUpView', component: CompStrgSetUpView, props: true},
    {path: '/view/concreteMngt/compSetUp/allsite', name:'CompStrgSetUpDetailPopUp', component: CompStrgSetUpDetailPopUp, props: true, meta: { layout: "noType"}},
    {path: '/view/concreteMngt/pourSetUp/allSite', name:'PourSetUpDetailPopUp', component: PourSetUpDetailPopUp, props: true, meta: { layout: "noType"}},
    /*{path: '/concreteMngt/', name:'', component:, props: true},*/

    // {path: '/concreteMngt/APITest/sheet', name:'ConcreteAPITest', component: ConcreteAPITest, props: true},     // 균열관리 Setup


    // 2. 균열 관리
    {path: '/view/crackMngt/CrackSetup/sheet', name:'CrackSetupSheet', component: CrackSetupSheet, props: true},                                                                  // 균열관리 Setup
    {path: '/view/crackMngt/CrackList/sheet', name:'CrackList', component: CrackList, props: true},                                                                      // 균열관리 List
    // {path: '/crackMngt/CrackList/AccountBook/sheet', name:'crackAccountBook', component: CrackAccountBook, props: true},                                            // 균열관리대장
    {path: '/view/crackMngt/CrackList/InfoWrite', name:'CrackInfoWrite', component: CrackInfoWrite, props: true},                                                        // 균열관리 등록
    {path: '/view/crackMngt/CrackList/allSite', name:'CrackListAllSite', component: CrackListAllSite, props: true , meta: { layout: "noType"}},                          // 균열관리 list 새창
    {path: '/view/crackMngt/CrackList/detailBlank', name:'CrackDetailBlank', component: CrackInfoWrite, props: true, meta: { layout: "noType"}},                         // 균열관리 상세 새창

    // 2. 검측관리
    {path: '/view/inspectMngt/inspectSetup/head/sheet', name:'InspectHeadSetupSheet', component: InspectHeadSetupSheet, props: true},                                    // 검측관리 본사 Setup
    {path: '/view/inspectMngt/inspectSetup/site/sheet', name:'InspectSiteSetupSheet', component: InspectSiteSetupSheet, props: true},                                    // 검측관리 현장 Setup
    {path: '/view/inspectMngt/inspectMngt/info/sheet', name:'InspectMngtListSheet', component: InspectMngtListSheet, props: true},                                       // 검측관리 리스트
    {path: '/view/inspectMngt/inspectMngt/info/write', name:'InspectMngtInfoWrite', component: InspectMngtInfoWrite, props: true},                                       // 검측관리 검측등록
    {path: '/view/inspectMngt/inspectMngt/info/view', name:'InspectMngtInfoView', component: InspectMngtInfoView, props: true},                                          // 검측관리 검측상세                                    // 검측관리 검측상세
    {path: '/view/inspectMngt/inspectMngt/info/allSite', name:'InspectMngtListAllSite', component: InspectMngtListAllSite, props: true , meta: { layout: "noType"}},     // 검측관리 list 새창
    {path: '/view/inspectMngt/inspectMngt/info/viewAllSite', name:'InspectMngtInfoAllSite', component: InspectMngtInfoView, props: true, meta: { layout: "noType"}}, // 검측관리 상세 새창
    {path: '/view/inspectMngt/inspectMngt/info/reqst/write', name:'InspectMngtReqstWrite', component: InspectMngtReqstWrite, props: true},                               // 검측관리 요청서 작성
    {path: '/view/inspectMngt/inspectMngt/info/reqst/allSite', name:'InspectMngtReqstAllSite', component: InspectMngtReqstWrite, props: true , meta: { layout: "noType"}},                               // 검측관리 요청서 작성
    {path: '/view/inspectMngt/inspectMngt/info/notice/write', name:'InspectMngtNoticeWrite', component: InspectMngtNoticeWrite, props: true},                               // 검측관리 요청서 작성
    {path: '/view/inspectMngt/inspectMngt/info/notice/allSite', name:'InspectMngtNoticeAllSite', component: InspectMngtNoticeWrite, props: true , meta: { layout: "noType"}},                               // 검측관리 요청서 작성
    

    // 6. 품질사진
    {path: '/view/community/QualityImage/sheet', name:'QualityImageSheet', component: QualityImageSheet, props: true},     // 균열사진 list

    

    // 점검및 교육
    //자체품질 점검
    {path: '/view/checkEdu/selfQualityHead/sheet', name: 'SelfQualityHeadSheet', component: SelfQualityHeadSheet, props: true },
    {path: '/view/checkEdu/selfQualitySite/sheet', name: 'SelfQualitySiteSheet', component: SelfQualitySiteSheet, props: true },
    // 시험/검사장비
    {path: '/view/checkEdu/testDeviceSetUp/sheet', name: 'TestDeviceSetUpSheet', component: TestDeviceSetUpSheet, props: true },
    {path: '/view/checkEdu/testDevice/sheet', name: 'TestDeviceSheet', component: TestDeviceSheet, props: true },
    {path: '/view/checkEdu/testDevice/allSite', name: 'TestDeviceAllSite', component: TestDeviceAllSite, props: true, meta: { layout: "noType"} },
    
    //교육관리
    {path: '/view/checkEdu/eduPlan/sheet', name: 'EduCurrentTab', component: EduCurrentTab, props: true },
    //{path: '/view/checkEdu/eduPlan/sheet', name: 'EduPlanSheet', component: EduPlanSheet, props: true },
    
    
    //신규 근로자 교육 현황
    {path: '/view/workerEdu/workerEduLang/sheet', name: 'WorkerEduLangSheet', component: WorkerEduLangSheet, props: true },
    {path: '/view/workerEdu/workerEduCode/sheet', name: 'WorkerEduCodeSheet', component: WorkerEduCodeSheet, props: true },
    {path: '/view/workerEdu/workerEduTranSlation/sheet', name: 'WorkerEduTranSlationSheet', component: WorkerEduTranSlationSheet, props: true },
    {path: '/view/workerEdu/workerEduTextBook/sheet', name: 'WorkerEduTextBookSheet', component: WorkerEduTextBookSheet, props: true },
    {path: '/view/workerEdu/workerTraining/view', name: 'WorkerEduCurrentTab', component: WorkerEduCurrentTab, props: true },
    {path: '/view/workerEdu/workerStatus/sheet', name: 'WorkerEduStatusSiteTab', component: WorkerEduStatusSiteTab, props: true },
    {path: '/view/workerEdu/workerEduStatusMySite/view', name: 'WorkerEduStatusMySite', component: WorkerEduStatusMySite, props: true },
    {path: '/view/workerEdu/workerEduStatusAllSite/view', name: 'WorkerEduStatusAllSite', component: WorkerEduStatusAllSite, props: true },
    {path: '/view/workerEdu/workerTraining/siteSetUpview', name: 'WorkerEduSiteSetUpView', component: WorkerEduSiteSetUpView, props: true },

    //신규 근로자 교육 현황 모바일 로그인 페이지
    {path: '/view/workerEdu/mobile/eduCationLogin', name: 'WorkerEduCationMobileLogin', component: WorkerEduCationMobileLogin, props: true, meta: { layout: "noType"} },
    //신규 근로자 교육 현황 모바일 로그인 후 상세 페이지
    {path: '/view/workerEdu/mobile/eduCationSelect', name: 'WorkerEduCationMobileSelect', component: WorkerEduCationMobileSelect, props: true, meta: { layout: "noType"} },
    {path: '/view/workerEdu/mobile/eduCationView', name: 'WorkerEduCationMobileView', component: WorkerEduCationMobileView, props: true, meta: { layout: "noType"} },
    {path: '/view/workerEdu/mobile/eduCationPledge', name: 'WorkerEduCationMobilePledge', component: WorkerEduCationMobilePledge, props: true, meta: { layout: "noType"} },

    /** 대외점검 extCheck */
    {path: '/view/extCheck/extCheckMngt/sheet', name: 'ExtCheckMngtSheet', component: () => import('@/pages/checkEdu/extCheck/ExtCheckMngtSheet.vue'), props: true},
    {path: '/view/extCheck/extCheckMngt/view', name: 'ExtCheckMngtView', component: () => import('@/pages/checkEdu/extCheck/ExtCheckMngtView.vue'), props: true},
    {path: '/view/extCheck/extCheckMngt/allSite', name: 'ExtCheckMngtAllSite', component: () => import('@/pages/checkEdu/extCheck/ExtCheckMngtView.vue'), props: true, meta: { layout: "noType"} },
    {path: '/view/extCheck/ExtCheckMngtDcsn/view', name: 'ExtCheckMngtDcsnView', component: () => import('@/pages/checkEdu/extCheck/ExtCheckMngtDcsnView.vue'), props: true},
    {path: '/view/extCheck/ExtrnlChckDcsnLastDem/view', name: 'ExtrnlChckDcsnLastDem', component: () => import('@/pages/checkEdu/extCheck/ExtrnlChckDcsnLastDem.vue'), props: true},
    {path: '/view/extCheck/ExtrnlChckDlbrtCmit/view', name: 'ExtrnlChckDlbrtCmit', component: () => import('@/pages/checkEdu/extCheck/ExtrnlChckDlbrtCmit.vue'), props: true},
    
    {path: '/view/extCheck/extCheckSchedule/sheet', name: 'ExtCheckScheduleSheet', component: () => import('@/pages/checkEdu/extCheck/ExtCheckScheduleSheet.vue'), props: true},
    
    {path: '/view/extCheck/extCheckInsctrInclin/sheet', name: 'ExtCheckInsctrInclinSheet', component: () => import('@/pages/checkEdu/extCheck/ExtCheckInsctrInclinSheet.vue'), props: true},
    {path: '/view/extCheck/extCheckInsctrInclin/view', name: 'ExtCheckInsctrInclinView', component: () => import('@/pages/checkEdu/extCheck/ExtCheckInsctrInclinView.vue'), props: true},
    
    {path: '/view/extCheck/ExtCheckSupportRequest/sheet', name: 'ExtCheckSupportRequestSheet', component: () => import('@/pages/checkEdu/extCheck/ExtCheckSupportRequestSheet.vue'), props: true},
    {path: '/view/extCheck/ExtCheckSupportRequest/view', name: 'ExtCheckSupportRequestView', component: () => import('@/pages/checkEdu/extCheck/ExtCheckSupportRequestView.vue'), props: true},

    /* BS점검 */
    // 1. DATA 관리
    {path: '/view/dataMngt/dataMngtHeadSetUp/sheet', name: 'BsCheckdataMngtHeadSetUpSheet', component: BsCheckdataMngtHeadSetUpSheet, props: true}, //BS점검 본사 Set-up
    {path: '/view/dataMngt/dataMngtSiteSetUp/sheet', name: 'BsCheckdataMngtSiteSetUpSheet', component: BsCheckdataMngtSiteSetUpSheet, props: true}, //BS점검 현장 Set-up
    
    // 2. BS점검 실시
    
    // 3. BS점검 세대결함
    {path: '/view/bsCheck/bsChkHouseDefect/sheet', name: 'BsCheckHouseDeffectSheet', component: BsCheckHouseDeffectSheet, props: true}, //BS점검 세대결함
    {path: '/view/bsCheck/bsChkPublicHouseDefect/sheet', name: 'BsCheckPublicHouseDeffectSheet', component: BsCheckPublicHouseDeffectSheet, props: true}, //BS점검 공용결함
    {path: '/view/bsCheck/BsCheckPrCUnSignDelaySheet/sheet', name: 'BsCheckProCessingUnSignDelaySheet', component: BsCheckProCessingUnSignDelaySheet, props: true}, //BS점검 미배정/처리지연


    /* 통계분석 */
    // 1. 통계분석
    {path: '/view/testStats/TestStats/view', name: 'TestStatsView', component: TestStatsView, props: true}, //시험관리 통계
    {path: '/view/concreteStats/ConcreteStats/view', name: 'ConcreteStatsView', component: ConcreteStatsView, props: true}, //콘크리트관리 통계
    {path: '/view/meterialStats/MaterialStats/view', name: 'MaterialStatsView', component: MaterialStatsView, props: true}, //자재관리 통계
    {path: '/view/noConfirmStats/NonConfirmStats/view', name: 'NonConfirmStatsView', component: NonConfirmStatsView, props: true}, //부적합관리 통계
    {path: '/view/extrnlChck/ExtrnlChckStats/view', name: 'ExtrnlChckStatsView', component: ExtrnlChckStatsView, props: true}, //대외점검 통계
    {path: '/view/bSChkStats/BsChkStats/view', name: 'BsChkStatsView', component: BsChkStatsView, props: true}, //BS점검 현황 통계
    {path: '/view/eduTraining/EduTrainingStats/view', name: 'EduTrainingStatsView', component: EduTrainingStatsView, props: true}, //교육훈련 통계
    {path: '/view/itUtil/ItUtilStats/view', name: 'ItUtilStatsList', component: ItUtilStatsList, props: true}, //IT활용도 통계
    {path: '/view/pqi/PqiStatsInfo/view', name: 'PqiStatsInfoView', component: PqiStatsInfoView, props: true}, //PQI 통계
    // 2. IT활용도

    // 3. PQI

    // 4. QRI

    // 5. 주간업무보고
    {path: '/view/stats/reportWik/sheet', name: 'ReportWikSheet', component: ReportWikSheet, props: true },
    
    // 6. 경영검토
    {path: '/view/stats/review/sheet', name: 'ReviewSheet', component: ReviewSheet, props: true },
        
    /* 커뮤니티 */
    // 공지사항
    {path: '/view/community/notice/sheet', name: 'NoticeSheet', component: NoticeSheet, props: true },
    {path: '/view/community/notice/write', name: 'NoticeWrite', component: NoticeWrite, props: true },
    {path: '/view/community/notice/view', name: 'NoticeView', component: NoticeView, props: true },

/*     // 자료실
    {path: '/view/community/dataArchive/list', name: 'DataArchiveList', component: DataArchiveList, props: true },
    {path: '/view/community/dataArchive/write', name: 'DataArchiveWrite', component: DataArchiveWrite, props: true },
    {path: '/view/community/dataArchive/view', name: 'DataArchiveView', component: DataArchiveView, props: true },
 */
    // 품질사진
    
    // 자유게시판
    {path: '/view/community/freeBoard/sheet', name: 'FreeBoardSheet', component: FreeBoardSheet, props: true },
    {path: '/view/community/freeBoard/write', name: 'FreeBoardWrite', component: FreeBoardWrite, props: true },
    {path: '/view/community/freeBoard/view', name: 'FreeBoardView', component: FreeBoardView, props: true },
    
    // 문서양식 변경요청
    {path: '/view/community/docChange/sheet', name: 'DocChangeSheet', component: DocChangeSheet, props: true },
    {path: '/view/community/docChange/write', name: 'DocChangeWrite', component: DocChangeWrite, props: true },
    {path: '/view/community/docChange/view', name: 'DocChangeView', component: DocChangeView, props: true },
    
    /* My Work */
    // 결제함
    {path: '/view/myWork/ApprovedDoc/sheet', name: 'ApprovedDocSheet', component: MyWorkApprovedDocSheet, props: true },
    {path: '/view/myWork/ApprovedDoc/view', name: 'ApprovedDocView', component: MyWorkApprovedDocView, props: true },
    {path: '/view/myWork/ApprovedDoc/set', name: 'ApprovedDocSet', component: MyWorkApprovedDocSet, props: true },

    // 나의 할일
    {path: '/view/myWork/myJob/sheet', name: 'MyJobSheet', component: MyJobSheet, props: true },
    // 캘린더
    {path: '/view/myWork/calender/schedule', name: 'Calender', component: Calender, props: true},
    // Admin
    // 1. 품질관리비
    {path: '/view/myWork/qltyMngtCost/sheet', name: 'QltyMngtCostSheet', component: QltyMngtCostSheet, props: true },

    // 2. 코드관리
    {path: '/view/myWork/codeMngt/sheet', name: 'CodeMngtTab', component: CodeMngtTab, props: true },
    {path: '/view/myWork/codeMngt/write', name: 'CodeMngtWrite', component: CodeMngtWrite, props: true },
    {path: '/myWork/codeMngt/view', name: 'CodeMngtView', component: CodeMngtView, props: true },

    // 3. 사용자 관리
    {path: '/view/myWork/userMngt/sheet', name: 'UserMngtTab', component: UserMngtTab, props: true },
    {path: '/view/myWork/userMngt/write', name: 'UserWrite', component: UserWrite, props: true },
    {path: '/view/myWork/userMngt/view', name: 'UserView', component: UserView, props: true },
    {path: '/view/batch/sqmsBatch/sheet', name: 'SqmsBatchSheet', component: SqmsBatchSheet, props: true },
    {path: '/view/history/historyList/view', name: 'LoginHistoryView', component: LoginHistoryView, props: true },
    {path: '/view/myWork/OzDocTypeSiteSetUp/sheet', name: 'OzDocTypeSiteSetUpSheet', component: OzDocTypeSiteSetUpSheet, props: true },

    // 4. 협력사 관리
    {path: '/view/myWork/tradeMngt/sheet', name: 'TradeMngtTab', component: TradeMngtTab, props: true },

    // 5. 권한그룹
    {path: '/view/myWork/authGroup/sheet', name: 'AuthGroupTab', component: AuthGroupTab, props: true },

    // 파일 업로드 테스트용
    {path: '/view/community/fileUpload/write', name:'FileTest', component: FileTest, props: true},     // 테스트 파일 업로드

    // 부적합관리
    {path: '/view/noConfirmMngt/noConfirmSetup/sheet', name:'NoConfirmSiteSetUpSheet', component: NoConfirmSiteSetUpSheet, props: true},     // 부적합관리 현장 Setup
    {path: '/view/noConfirmMngt/noConfirmList/sheet', name:'NoConfirmMngtSheet', component: NoConfirmMngtSheet, props: true},     // 부적합관리 리스트

    /* 자료실 */
    // 품질관리/시험계획서
    {path: '/view/dataArchive/qltyTstP/sheet', name: 'QltyTstPArchiveSheet', component: QltyTstPArchiveSheet, props: true },
    {path: '/view/dataArchive/qltyTstP/write', name: 'QltyTstPArchiveWrite', component: QltyTstPArchiveWrite, props: true },
    {path: '/view/dataArchive/qltyTstP/view', name: 'QltyTstPArchiveView', component: QltyTstPArchiveView, props: true },
    // ITP
    {path: '/view/dataArchive/itp/sheet', name: 'ItpArchiveSheet', component: ItpArchiveSheet, props: true },
    {path: '/view/dataArchive/itp/write', name: 'ItpArchiveWrite', component: ItpArchiveWrite, props: true },
    {path: '/view/dataArchive/itp/view', name: 'ItpArchiveView', component: ItpArchiveView, props: true },
    // CheckList
    {path: '/view/dataArchive/chkLst/sheet', name: 'ChkLstArchiveSheet', component: ChkLstArchiveSheet, props: true },
    {path: '/view/dataArchive/chkLst/write', name: 'ChkLstArchiveWrite', component: ChkLstArchiveWrite, props: true },
    {path: '/view/dataArchive/chkLst/view', name: 'ChkLstArchiveView', component: ChkLstArchiveView, props: true },
    // Code & Spec, Requirement
    {path: '/view/dataArchive/codeSpc/sheet', name: 'CodeSpcArchiveSheet', component: CodeSpcArchiveSheet, props: true },
    {path: '/view/dataArchive/codeSpc/write', name: 'CodeSpcArchiveWrite', component: CodeSpcArchiveWrite, props: true },
    {path: '/view/dataArchive/codeSpc/view', name: 'CodeSpcArchiveView', component: CodeSpcArchiveView, props: true },
    // 품질제도
    {path: '/view/dataArchive/qltySst/sheet', name: 'QltySstArchiveSheet', component: QltySstArchiveSheet, props: true },
    {path: '/view/dataArchive/qltySst/write', name: 'QltySstArchiveWrite', component: QltySstArchiveWrite, props: true },
    {path: '/view/dataArchive/qltySst/view', name: 'QltySstArchiveView', component: QltySstArchiveView, props: true },
    // Guide
    {path: '/view/dataArchive/guide/sheet', name: 'GuideArchiveSheet', component: GuideArchiveSheet, props: true },
    {path: '/view/dataArchive/guide/write', name: 'GuideArchiveWrite', component: GuideArchiveWrite, props: true },
    {path: '/view/dataArchive/guide/view', name: 'GuideArchiveView', component: GuideArchiveView, props: true },
    // 사례집
    {path: '/view/dataArchive/csbk/sheet', name: 'CsbkArchiveSheet', component: CsbkArchiveSheet, props: true },
    {path: '/view/dataArchive/csbk/write', name: 'CsbkArchiveWrite', component: CsbkArchiveWrite, props: true },
    {path: '/view/dataArchive/csbk/view', name: 'CsbkArchiveView', component: CsbkArchiveView, props: true },
    // 서식
    {path: '/view/dataArchive/ihbt/sheet', name: 'IhbtArchiveSheet', component: IhbtArchiveSheet, props: true },
    {path: '/view/dataArchive/ihbt/write', name: 'IhbtArchiveWrite', component: IhbtArchiveWrite, props: true },
    {path: '/view/dataArchive/ihbt/view', name: 'IhbtArchiveView', component: IhbtArchiveView, props: true },
    // 화상회의
    {path: '/view/dataArchive/vdoConf/sheet', name: 'VdoConfArchiveSheet', component: VdoConfArchiveSheet, props: true },
    {path: '/view/dataArchive/vdoConf/write', name: 'VdoConfArchiveWrite', component: VdoConfArchiveWrite, props: true },
    {path: '/view/dataArchive/vdoConf/view', name: 'VdoConfArchiveView', component: VdoConfArchiveView, props: true },
    // 특별점검
    {path: '/view/dataArchive/spcIspt/sheet', name: 'SpcIsptArchiveSheet', component: SpcIsptArchiveSheet, props: true },
    {path: '/view/dataArchive/spcIspt/write', name: 'SpcIsptArchiveWrite', component: SpcIsptArchiveWrite, props: true },
    {path: '/view/dataArchive/spcIspt/view', name: 'SpcIsptArchiveView', component: SpcIsptArchiveView, props: true },
    // 기타
    {path: '/view/dataArchive/etc/sheet', name: 'EtcArchiveSheet', component: EtcArchiveSheet, props: true },
    {path: '/view/dataArchive/etc/write', name: 'EtcArchiveWrite', component: EtcArchiveWrite, props: true },
    {path: '/view/dataArchive/etc/view', name: 'EtcArchiveView', component: EtcArchiveView, props: true },
    // 품질입찰
    {path: '/view/dataArchive/qltyBid/sheet', name: 'QltyBidArchiveSheet', component: QltyBidArchiveSheet, props: true },
    {path: '/view/dataArchive/qltyBid/write', name: 'QltyBidArchiveWrite', component: QltyBidArchiveWrite, props: true },
    {path: '/view/dataArchive/qltyBid/view', name: 'QltyBidArchiveView', component: QltyBidArchiveView, props: true },
    // 시공핸드북
    {path: '/view/dataArchive/cstrHb/sheet', name: 'CstrHbArchiveSheet', component: CstrHbArchiveSheet, props: true },
    {path: '/view/dataArchive/cstrHb/write', name: 'CstrHbArchiveWrite', component: CstrHbArchiveWrite, props: true },
    {path: '/view/dataArchive/cstrHb/view', name: 'CstrHbArchiveView', component: CstrHbArchiveView, props: true },

    {path: '/queryMode', name: 'DynamicQueryExcution', component: () => import('@/pages/sample/DynamicQueryExcution.vue'), props: true, meta: { layout: "noType"} },

    // 라우터에 없는 모든 URL에 대해 반응하겠다.
    {
        path: "*", 
        name: "NoPage",
        component: () => import("@/pages/common/frame/Nopage.vue")
    },
    {
        path: "/notSupport", 
        name: "NotSupport",
        component: () => import("@/pages/common/frame/NotSupport.vue")
    },
];
const router = new VueRouter({
    // mode: 'abstract',
    mode: 'history',
    // local dist file open  
    routes: route 
});

import store from '../store'
import { isNull } from 'lodash';
// import loader from '@ibsheet/loader'

router.beforeEach((to, from, next) => {

    //console.log("@@@@@ router 이동처리 : "+to.name);
    //console.log("@@@@@ to.path : %o",to.path);

    if (to.name === 'DynamicQueryExcution') {
        return next()
        
    }

    if(to.path.indexOf('/workerEdu/mobile') >= 0)  {
        //신규 근로자 교육 현황 모바일인 경우 처리
        next();
    }else if (to.name == 'TestLogin' || to.name == 'NotSupport' || to.name == 'NoPage'){
        //부하처리용 로그인화면
        next();
    }else{
        
        // reflash 일경우
        if((to.name != "Login" && to.path != "/sqmsLogin") && from.name == null){
                    
            // 새로 창이 열리고, 세션정보가 있으면
            if(!store.getters['auth/getIsOpen'] && (Vue.prototype.$session.get('userInfo') == null || Vue.prototype.$session.get('userInfo') == undefined)){
                    // 열린 창(텝) 카운트 로컬 스토리지에 저장
                    let cnt = Number(localStorage.getItem("viewCnt"));
                    cnt = cnt + 1;
                // // 화면 카운팅 처리          
                    localStorage.setItem("viewCnt",cnt);
            }else if(!store.getters['auth/getIsOpen'] && !(Vue.prototype.$session.get('userInfo') == null || Vue.prototype.$session.get('userInfo') == undefined)){

                // 열린 창(텝) 카운트 로컬 스토리지에 저장
                    let cnt = Number(localStorage.getItem("viewCnt"));
                    cnt = cnt + 1;
                // // 화면 카운팅 처리          
                    localStorage.setItem("viewCnt",cnt);
                //window session 정보를 vue session으로 이동            
                //Vue.prototype.$session.set('userInfo',store.state['auth']); 
                store.dispatch('auth/setUserInfo', Vue.prototype.$session.get('userInfo'));        
                store.dispatch('auth/setProjectInfo', Vue.prototype.$session.get('userInfo'));            
            }else{
                //reflash 시
                // 열린 창(텝) 카운트 로컬 스토리지에 저장
                let cnt = Number(localStorage.getItem("viewCnt"));
                cnt = cnt + 1;
                // // 화면 카운팅 처리          
                localStorage.setItem("viewCnt",cnt);

                Vue.prototype.$session.set('userInfo',store.state['auth']);
            }
        }else if((to.name == "Login" || to.path == "/sqmsLogin") && from.name == null){
            // 새로 로그인 창이 열렸을 경우
            if(!store.getters['auth/getIsOpen']){
                let cnt = Number(localStorage.getItem("viewCnt"));
                cnt = cnt + 1;
                // 화면 카운팅 처리          
                localStorage.setItem("viewCnt",cnt);
            }        
        }

        // ibsheet allClear
        // if (loader.getIBSheetStatic()) loader.getIBSheetStatic().disposeAll()
        if(to.name == 'Login' || to.name == 'Download' || to.name == "DownPrivacy" || to.name == 'SSOLogin' || to.name == 'Root'){
            next();
        }else if ((Vue.prototype.$session.get('userInfo') == null || Vue.prototype.$session.get('userInfo') == undefined) && (to.name !== 'Login' && to.path != "/sqmsLogin")) {    
            //로그인 화면으로 이동
            next({name:'Login'})
        } else {
            
            // 현제 텝 인덱스
            let currentIdx = store.getters['tabInfo/getTabs'].current;

            // 메인 페이지 이외의 화면에 대한 경우 적용
            if(to.name != 'Main' && to.name != ''){         
                
                //현재 텝에 있는 url일경우
                let list = _.cloneDeep(store.getters['tabInfo/getTabsList']); 

                // 메뉴 열림 확인 ( 이동하려는 페이지가 텝에 존재여부)
                let openPage = false;
                for(let i = 0; i < list.length; i++){
                    // tab 정보에 열려있는지 체크
                    if(list[i].path == to.path){                                        
                        openPage = true;                                           
                        break;
                    }                
                }
                
                // 기존 tab 히스토리에 정보가 있는 경우 제외처리
                let saveHistory = false;
                let hitoryTabIdx = null;
                for(let i = 0; i < store.getters['tabInfo/getTabHistory'].length; i++){
                    if(store.getters['tabInfo/getTabHistory'][i].routerName == to.name){                        
                        saveHistory = true;
                        hitoryTabIdx = store.getters['tabInfo/getTabHistory'][i].tabIndex;                            
                        break;
                    }                
                }
                
                // 이동주소가 다른 Tab의 주소인 경우 tab 변경 처리
                if(hitoryTabIdx != null && currentIdx != hitoryTabIdx){
                    store.dispatch('tabInfo/setMoveTab', hitoryTabIdx); 
                    currentIdx = hitoryTabIdx;
                }
   
                /******* KeepAlive 관련 처리  ********/
                if(openPage && !saveHistory){
                    
                    /******** 텝에서 처음 페이지 이동시  ********/
                    
                    //let currentIdx = store.getters['tabInfo/getTabs'].current;
                    let keepAlivePass = true;
       
                    // 이력 저장될 정보 셋팅
                    let history = new Object();                    
                    history.name = store.getters['tabInfo/getTabs'].list[currentIdx].name;                                        
                    history.tabIndex = currentIdx;
                    history.menuId = store.getters['tabInfo/getCurrentMenuId'];
                    history.routerName = to.name;
                    history.routerPath = to.path;

                    if(!saveHistory){
                        //이동이력 정보저장
                        store.dispatch('tabInfo/setTabHistory', history);               
                    }
                
                    //keepAlive 화면 셋팅
                    if(keepAlivePass){
                        store.dispatch('tabInfo/setKeepAliveList', to.name);   
                    }
                    
                    store.dispatch('tabInfo/setBefore', currentIdx);
           
                     
                }else if(!openPage && saveHistory){

                    /******  열린 텝은 없고 이동이력은 있는 경우 *******/
                    let keepAlivePass = true;
                    
                    //sheet페이지로 이동인 경우
                    if(to.path.indexOf("sheet") != -1){
                        let obj = new Object();
                        obj.index = currentIdx;
                        obj.path = to.path;
                        
                        // 현재 tab lsit path 변경
                        store.dispatch('tabInfo/setChangePath', obj); 

                        // 이전페이지 정보가 있는 경우(리로드 제외)
                        if(from.path != "undefined" && from.path != "/sqmsLogin" && from.path != "/main"){
                            // 이동전 화면이 리스트화면이 아닌경우 keepAlive제외
                            if(from.path.indexOf("sheet") == -1){
                                        
                                store.dispatch('tabInfo/removeKeepAliveList', from.name);
                                
                                if(to.path.indexOf("sheet") != -1){
                                    //store.dispatch('tabInfo/reMoveSavePage', from.name);
                                    //store.dispatch('tabInfo/removeKeepAliveList', from.name);
                                    // 기존에 정보가 있으므로 패스
                                    store.dispatch('tabInfo/removeTabHistory', from.name);
                                    keepAlivePass = false;
                                }
                            }
                        }
                    }else{

                        /******  리스트 페이지에서 상세 페이지도 이동하는 경우 *******/

                        // 상세페이지 이동(이전 페이지가 sheet 페이지) 
                        if(from.path.indexOf("sheet") != -1){
                                                  
                            let obj = new Object();
                            obj.index = currentIdx;
                            obj.path = to.path;
                        
                            // 현재 tab lsit path 변경
                            store.dispatch('tabInfo/setChangePath', obj); 
                        }else{                            
                            /** shhet(list)페이지가 아닌 상세에서 상세페이지로 이동하는 경우 */
                            // 예외처리 ( 현장학습인 경우 sheet 페이지가 없는 경우) 
                            if(to.name === "SiteInfoView" && (from.name === "SiteInfoWrite" || from.name === "SiteInfoChange" || from.name === "SiteInfoBlank")){
                                let obj = new Object();
                                obj.index = currentIdx;
                                obj.path = to.path;
                            
                                // 현재 tab lsit path 변경
                                store.dispatch('tabInfo/setChangePath', obj);
                                
                                store.dispatch('tabInfo/removeKeepAliveList', from.name);

                                store.dispatch('tabInfo/removeTabHistory', from.name);

                                keepAlivePass = false;
                            }
                        }
         
                    }
                    
                    //keepAlive 화면 셋팅
                    if(keepAlivePass){
                        //keepAlive 추가처리
                        store.dispatch('tabInfo/setKeepAliveList', to.name);   
                    }
                    
                    // 이동텝 동기화 처리
                    store.dispatch('tabInfo/setBefore', currentIdx);

                }else if(!openPage && !saveHistory){
                    

                    // 현재 메뉴정보
                    let menuId = store.getters['tabInfo/getCurrentMenuId'];
                    let menuOpen = false;

                    // 메뉴 열림 확인 (현제 페이지가 텝에 존재여부)
                    for(let i = 0; i < list.length; i++){
                        // 해당 메뉴가 열려있는지 확인
                        if(list[i].menuMngtId == menuId){                                        
                            menuOpen = true;                                           
                            break;
                        }                
                    }

                    if(menuOpen){
                            
                        // 최초 상세페이지 이동인 경우
                        let keepAlivePass = true;
                        // tab에 path정보가 있는 경우
                        // 변경 path 정보 
                        let obj = new Object();
                        obj.index = currentIdx;
                        obj.path = to.path;
                        
                        // 현재 tab list path 변경
                        store.dispatch('tabInfo/setChangePath', obj);
                        
                        // 이력 저장될 정보 셋팅
                        let history = new Object();                    
                        history.name = store.getters['tabInfo/getTabs'].list[currentIdx].name;                                        
                        history.tabIndex = currentIdx;
                        history.menuId = store.getters['tabInfo/getCurrentMenuId'];
                        history.routerName = to.name;
                        history.routerPath = to.path;
                        
                        if(router.history.pending.params != null){
                            history.param = router.history.pending.params;
                        }else{
                            history.param = null;
                        }

                        if(!saveHistory){
                            //이동이력 정보저장
                            store.dispatch('tabInfo/setTabHistory', history);               
                        }
                        

                        //keepAlive 화면 셋팅
                        if(keepAlivePass){
                            store.dispatch('tabInfo/setKeepAliveList', to.name);   
                        }
                        
                        store.dispatch('tabInfo/setBefore', currentIdx);
                    }else{
                        // sheet화면이 아니고 열리지 않은 메뉴(tab에 없음)의 이력일 경우(뒤로가기로 온경우)
                        history.back();
                        return;
                    }                    
                }else{
                    // 뒤로가기 이동으로 기존 상세페이지를 여는 경우
                    if(to.path.indexOf("sheet") == -1){
                        store.dispatch('tabInfo/setKeepAliveList', to.name);  
                    }
                }            
            }

            next();
    
        }
    }
})

export default router;