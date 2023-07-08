export default [
{
   name: '현장정보 및 QA',
   children: [{
         name: '현장정보',
         children: [{
            name: '현장정보',
            path: '/view/siteInfo/view',
         }]
      },
      {
         name: '품질관리자',
         children: [{
            name: '품질관리자',
            path: '/view/qualityMngr/list',
         }]
      },
      {
         name: '현장품질방침/목표',
         children: [{
            name: '현장품질방침/목표',
            path: '/view/qualityPolicy/info',
         }]
      },
      {
         name: '품질시스템 관리',
         children: [{
            name: '품질시스템 관리',
            path: '/view/quailtyMngt/view',
         }]
      },
      {
         name: '품질문서',
         children: [{
            name: '품질문서',
            path: '/viewSQMS_WS01_001_01',
         }]
      },
      {
         name: '세대옵션',
         children: [{
            name: '세대옵션',
            path: '/view/siteInfo/houseOptn/view',
         }]
      },
   ],
},
{
   name: '품질활동',
   children: [{
         name: '시험관리',
         children: [
            {
               name: '품질시험 계획서',
               path: '/view/testMngt/qualityTestPlan/sheet'
            },
            {
               name: '시험결과관리',
               path: '/view/testMngt/testResultMngt/sheet'
            },
            {
               name: '품질관리비',
               path: '/view/testMngt/qualityMngCost/sheet'
            },
         ],
      },
      {
         name: '자재관리',
         children: [
            {
               name: '자재공급원승인',
               path: '/view/materialMngt/materialSpAppr/sheet'
            },
            {
               name: '인수검사',
               path: '/view/materialMngt/acceptTestList/sheet'
            },
            {
               name: '공장검사',
               path: '/view/materialMngt/factoryTestList/sheet'
            },
         ],
      },
      {
         name: '콘크리트 관리',
         children: [
            {
               name: '타설관리',
               path: '/view/concreteMngt/pourSetUp/view'
            },
            {
               name: '강도관리',
               path: '/view/concreteMngt/compSetUp/view'
            },
         ],
      },
      {
         name: '균열 관리',
         children: [
            {
               name: '균열관리',
               path: '/view/crackMngt/CrackList/sheet'
            },
         ],
      },
      {
         name: '검측 관리',
         children: [
            {
               name: '검측현황',
               path: '/view/inspectMngt/inspectMngt/info/sheet'
            },
         ],
      },
      {
         name: '부적합관리',
         children: [
            {
               name: '부적합 List',
               path: '/view/noConfirmMngt/noConfirmList/sheet'
            },
         ],
      },
   ],
},
{
   name: '점검 및 교육',
   children: [{
         name: '대외점검',
         children: [{
               name: '대외 점검 관리',
               path: '/view/extCheck/extCheckMngt/sheet'
            },
            {
               name: '점검일정',
               path: '/view/extCheck/extCheckSchedule/sheet'
            },
            {
               name: '점검자별 성향',
               path: '/view/extCheck/extCheckInsctrInclin/sheet'
            },
            {
               name: '지원요청',
               path: '/view/extCheck/ExtCheckSupportRequest/sheet'
            },
         ],
      },
      {
         name: '자체품질 점검',
         children: [{
               name: '본사',
               path: '/view/checkEdu/selfQualityHead/sheet'
            },
            {
               name: '현장',
               path: '/view/checkEdu/selfQualitySite/sheet'
            },
            {
               name: '자체품질 점검(구)',
               path: '/view'
            },
         ],
      },
      {
         name: '교육관리',
         children: [{
               name: '자체교육 현황 계획/실시',
               path: '/view/checkEdu/eduPlan/view'
            },
            {
               name: '신규 근로자 교육 현황 현황',
               path: '/view/workerEdu/workerStatus/view'
            },
         ],
      },
      {
         name: '시험/검사 장비',
         children: [
            {
               name: '시험검사/장비 교정현황',
               path: '/view/checkEdu/testDevice/sheet'
            },
         ],
      },
   ],
},
{
   name: 'BS점검',
   children: [
      {
         name: 'BS점검 실시',
         children: [{
               name: '세대결함',
               path: '/view/bsCheck/bsChkHouseDefect/sheet'
            },
            {
               name: '공용결함',
               path: '/view/bsCheck/bsChkPublicHouseDefect/sheet'
            },
            {
               name: '미배정/처리지연',
               path: '/view/bsCheck/BsCheckPrCUnSignDelaySheet/sheet'
            },
         ],
      },
   ],
},
{
   name: '통계분석',
   children: [{
         name: '통계분석',
         children: [{
               name: '시험관리',
               path: '/view/testStats/TestStats/view'
            },
            {
               name: '콘크리트관리',
               path: '/view/concreteStats/ConcreteStats/view'
            },
            {
               name: '자재관리',
               path: '/view/meterialStats/MaterialStats/view'
            },
            {
               name: '부적합관리',
               path: '/view/noConfirmStats/NonConfirmStats/view'
            },
            {
               name: '대외점검',
               path: '/view/extrnlChck/ExtrnlChckStats/view'
            },
            {
               name: 'BS점검',
               path: '/view/bSChkStats/BsChkStats/view'
            },
            {
               name: '교육훈련',
               path: '/view/eduTraining/EduTrainingStats/view'
            },
            {
               name: 'IT활용도',
               path: '/view/itUtil/ItUtilStats/view'
            },
            {
               name: 'PQI',
               path: '/view/pqi/PqiStatsInfo/view'
            },
            {
               name: '주간업무보고',
               path: '/view/stats/reportWik/sheet'
            },
            {
               name: '경영검토',
               path: '/view/stats/review/sheet'
            },
         ],
      },
   ],
},
{
   name: '커뮤니티',
   children: [{
         name: '공지사항',
         children: [{
               name: '공지사항',
               path: '/view/community/notice/sheet'
            },
         ],
      },
      // {
      //    name: '자료실',
      //    children: [{
      //          name: '자료실',
      //          path: '/view/community/dataArchive/list'
      //       },
      //    ],
      // },
      {
         name: '품질사진',
         children: [{
               name: '품질사진',
               path: '/view/community/QualityImage/sheet'
            },
         ],
      },
      {
         name: '자유게시판',
         children: [{
               name: '자유게시판',
               path: '/view/community/freeBoard/sheet'
            },
         ],
      },
      {
         name: '문서양식 변경요청',
         children: [{
               name: '문서양식 변경요청',
               path: '/view/community/docChange/sheet'
            },
         ],
      },
   ],
},
{  // 건축/인프라사업본부
   name: '자료실',
   children: [{
         name: '품질관리',
         children: [{
               name: '품질관리/시험계획서',
               path: '/view/community/dataArchive/list'
            },
            {
               name: 'ITP',
               path: '/view'
            },
            {
               name: 'CheckList',
               path: '/view'
            },
            {
               name: 'Code & Spec. Requirement',
               path: '/view'
            },
         ],
      },
      {
         name: '참고자료',
         children: [{
               name: '품질제도 안내',
               path: '/view'
            },
            {
               name: 'Guide',
               path: '/view'
            },
            {
               name: '사례집',
               path: '/view'
            },
            {
               name: '서식',
               path: '/view'
            },
            {
               name: '화상회의 자료',
               path: '/view'
            },
            {
               name: '특별점검 보고서',
               path: '/view'
            },
            {
               name: '기타',
               path: '/view'
            },
            {
               name: '품질입찰DB',
               path: '/view'
            },
         ],
      },
   ],
},
/*
{  // 플랜트사업본부
   name: '자료실',
   children: [{
         name: '품질관리',
         children: [{
               name: 'PQP, Procedure',
               path: '/view'
            },
            {
               name: 'ITP/ITR',
               path: '/view'
            },
            {
               name: 'WPS/PQR',
               path: '/view'
            },
            {
               name: 'Code & Spec. Requirement',
               path: '/view'
            },
         ],
      },
      {
         name: '참고자료',
         children: [{
               name: '품질제도 안내',
               path: '/view'
            },
            {
               name: 'Quality Package',
               path: '/view'
            },
            {
               name: '사례집',
               path: '/view'
            },
            {
               name: 'Others',
               path: '/view'
            },
            {
               name: '품질입찰DB',
               path: '/view'
            },
         ],
      },
   ],
},
*/
{
   name: 'Set-up',
   children: [{
         name: '본사 Set-up',
         children: [{
               name: '시험관리',
               path: '/view/testMngt/headSetUp/sheet'
            },
            {
               name: '자재관리',
               path: '/view/materialMngt/headSetUp/sheet',
            },
            {
               name: '검측관리',
               path: '/view/inspectMngt/inspectSetup/head/sheet'
            },
            {
               name: 'BS점검',
               path: '/view/dataMngt/dataMngtHeadSetUp/sheet'
            },
            {
               name: '신규 근로자 교육 현황',
               path: '/view/workerEdu/workerTraining/view'
            },
            
         ],
      },
      {
         name: '현장 Set-up',
         children: [{
               name: '시험관리',
               path: '/view/testMngt/siteSetUp/sheet'
            },
            {
               name: '자재관리',
               path: '/view/materialMngt/siteSetUp/sheet'
            },
            {
               name: '콘크리트관리',
               path: '/view/concreteMngt/concrete/view'
            },
            {
               name: '균열관리',
               path: '/view/crackMngt/CrackSetup/sheet'
            },
            {
               name: '검측관리',
               path: '/view/inspectMngt/inspectSetup/site/sheet'
            },
           
            {
               name: '부적합관리',
               path: '/view/noConfirmMngt/noConfirmSetup/sheet'
            },
            {
               name: '신규 근로자 교육 현황',
               path: '/view/workerEdu/workerTraining/siteSetUpview'
            },
            {
               name: '시험/검사장비',
               path: '/view/checkEdu/testDeviceSetUp/sheet'
            },
            {
               name: 'BS점검',
               path: '/view/dataMngt/dataMngtSiteSetUp/sheet'
            },
         ],
      },
   ],
},
// {
//    name: '',
//    children: [{
//       },
//    ],
// },
{
   name: 'My Work',
   children: [{
         name: '결재함',
         children: [{
               name: '결재함',
               path: '/view/myWork/ApprovedDoc/sheet'
            },
         ],
      },
      {
         name: '나의 할일',
         children: [{
               name: '나의 할일',
               path: '/view/myWork/myJob/list'
            },
         ],
      },
      {
         name: '캘린더',
         children: [{
               name: '캘린더',
               path: '/view/myWork/calender/schedule'
            },
         ],
      },
      {
         name: 'Admin',
         children: [{
               name: '품질관리비',
               path: '/view/myWork/qltyMngtCost/sheet'
            },
            {
               name: '코드관리',
               path: '/view/myWork/codeMngt/sheet'
            },
            {
               name: '사용자 관리',
               path: '/view/myWork/userMngt/sheet'
            },
            {
               name: '권한그룹',
               path: '/view/myWork/authGroup/sheet'
            },
            {
               name: '품질시스템 관리',
               path: '/view/quailtyMngt/adm'
            },
         ],
      },
   ],
},
// {
//    name: '신규 근로자 교육 현황 모바일',
//    children: [{
//          name: '신규 근로자 교육 현황 모바일',
//          children: [{
//                name: '로그인',
//                path: '/view/workerEdu/mobile/eduCationLogin'
//             },
//             {
//                name: '동영상 시청',
//                path: '/view/workerEdu/mobile/eduCationView'
//             },
//             {
//                name: '교육 이수 완료',
//                path: '/view/workerEdu/mobile/eduCationPledge'
//             },
//          ],
//       },
//    ],
// },
]