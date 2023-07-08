// import { CommonSet, CommonSet_CanEdit, CommonSet_FullPopup } from './ibsheet-setoption' 
/* 
    ProjectSelect: SQMS_WS01_001_01_P1 프로젝트 선택팝업
    EmployeeSearch: SQMS_WS01_001_02_P2 사원검색 팝업
    majorSearch: SQMS_WS01_001_02_P3 전공선택팝업 
    HoldinfoList: SQMS_WS01_006 세대옵션>세대옵션(All Sites)>상세>세대정보 List 팝업
    HistoryLoad: SQMS_WS02_001_02 품질활동 > 시험관리 > 품질시험계획서 > History 불러오기 팝업
    TestSearch: SQMS_WS02_001_06 품질활동 > 시험관리 > 시험결과관리 > 결과 입력 > 시험 종목 검색 팝업
    AcceptanceWrite: SQMS_WS02_002_05 자재관리>인수검사>신규등록 팝업 
    Quantitychange: SQMS_WS02_002_05 자재관리>인수검사>물량변경
    Quantitychange2: SQMS_WS02_002_05 자재관리>인수검사>물량변경
    MaterialProject: SQMS_WS02_002_04 자재관리>현장 Set-up>타 프로젝트 가져오기
    ProductDetail: SQMS_WS02_002_06 자재관리>자재공급원 승인요청>품명 선택
    ProductSelect: SQMS_WS02_002_06 자재관리>자재공급원 승인요청>품명 선택
    PartnersSearch: SQMS_WS02_002_11 자재관리>공장검사>검사결과 입력>갑지(레미콘/아스콘)2>협력사 직원 검색
    PartnersSearch2: SQMS_WS02_003_02 콘크리트관리>타설관리>타설등록>협력사 선택 팝업
    FormulaWrite: SQMS_WS02_003 콘크리트관리>초기 Setting>시방배합>배합표 일괄등록
    ProjectLoad: SQMS_WS02_003 콘크리트관리 > 초기 Setting > 시방배합 > 타 프로젝트 불러오기
    ProjectLoad2: SQMS_WS02_003 콘크리트관리 > 초기 Setting > 타설옵션 > 타 프로젝트 불러오기
    EquipmentSelect: SQMS_WS02_003 콘크리트관리>초기 Setting>시험장비>시공장비>시험장비 선택
    EquipmentSelect2: SQMS_WS02_003 콘크리트관리>초기 Setting>시험장비>시공장비>타 프로젝트 불러오기
    EquipmentSelect3: SQMS_WS02_003 콘크리트관리>초기 Setting>시험장비>원재료>타 프로젝트 불러오기
    EquipmentSelect4: SQMS_WS02_003 콘크리트관리>초기 Setting>시험장비>타설계획서>타 프로젝트 불러오기
    CompanySelect: SQMS_WS02_004_02 자재관리>공장검사>검사결과 입력>갑지(레미콘/아스콘)2>협력사 직원 검색 
    TextbookAdd: SQMS_WS03_003 점검 및 교육 > 교육관리 > 교육 훈련 계획/실시(내현장) > 계획 등록 > 타프로젝트 교육교재 추가 팝업
    CorrectionWrite: SQMS_WS03_005_01 점검 및 교육 > 시험/검사 장비 > 시험/검사장비 교정 현황 등록
    CooperationSearch: SQMS_WS03_005_01 점검 및 교육 > 시험/검사 장비 > 협력업체인력 조회
    TestPlanDetail: SQMS_WS02_001_02_01 품질활동 > 시험관리 > 품질시험계획서(타 프로젝트 데이터 가져오기)
    DetectionChecklist: SQMS_WS02_005_01 품질활동 > 검측관리 > 본사 Set-up > 체크리스트 추가
    DetectionAdmin2: SQMS_WS02_005_01 품질활동 > 검측관리 > 본사 Set-up > ITP
    ItrList2: SQMS_WS02_005_01 품질활동 > 검측관리 > 현장 Set-up > ITR(Check List)
    InspectionAgency: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 일정 등록 > 점검기관 검색
    InspectionManager: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 일정 등록 > 점검 예정자 검색
    RecipientSearch: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 일정 등록 > 수신자 검색
    FinalPenaltyWrite: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 최종벌점 작성
    CommitteeSearch: SQ_SPEC_EXTN_W_034 점검 및 교육 > 대외 점검 > 지원요청 – 현장 > 심의위원회 검색
    RecipientSelect: SQ_ACT_NCP_W_004 부적합관리>CAR>신규 등록>수신자 선택
    ReportDetailWrite: SQ_STATS_YREP_W_002 경영검토>보고서 작성>5.현장별 개선필요사항
    DetectionTable: SQMS_WS02_005_02 품질활동 > 검측관리 > 검측현황(시공사) > 검측 등록 > 검측 점검표 검색
    checkListWriteModal: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>체크리스트 설정>본사 불러오기
    projectListSheet: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List> 대상 현장 지정
    checklistWriteList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 > 체크리스트> 신규등록
    selfQualityReplyList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>회신현황 보기
    replyDetailCheckList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>회신현황 보기>상세보기1
    replyDetailPunchList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>회신현황 보기>상세보기2
    InspectionResultWrite: SQ_SPEC_INTN_W_014 자체품질점검 >현장 >점검현황 List>결과입력1
    EducationStatusDetail: SQ_SPEC_WKEDU_W_010 점검 및 교육 > 신규 근로자 교육 현황 > 교육현황(내현장) > 교육 수정 
    EducationStatusDetail2: SQ_SPEC_WKEDU_W_010 점검 및 교육 > 신규 근로자 교육 현황 > 교육현황(내현장) > 교육 수정
    PaymentLine: SQ_COMN_SIGN_W_002 결재함(내 결재함) > 결재문서 (승인/반려)> 결재라인 변경
    PaymentLine2: SQ_COMN_SIGN_W_002 결재함(내 결재함) > 결재문서 (승인/반려)> 결재라인 변경
    PaymentLine3: SQ_COMN_SIGN_W_017 결재함>설정>자주쓰는 결재라인 추가
    PaymentLine4: SQ_COMN_SIGN_W_017 결재함>설정>대결 추가
    PaymentLoad: SQ_COMN_SIGN_W_012 결재함>결재상신>결재라인 불러오기
    UserTarget: SQ_COMN_SIGN_W_012 결재함>결재상신>협조 대상 선택
    UserShare: SQ_COMN_SIGN_W_008 결재함(완료함)>결재문서 보기>공유하기
    NewMaterial: SQMS_WS02_002_01 자재관리>본사 Set-up>신규등록자재>신규 자재 매핑
    PartnerWork: SQMS_BS_DATA_001 BS점검 > Set-up > 협력사 공종 연결 > 협력업체 기준
    DetailedSchedule: SQMS_BS_DATA_001 BS점검 > Set-up > 일정관리> 상세일정관리
    PartnerWork2: SQMS_BS_DATA_001 BS점검 > Set-up > 협력사 공종 연결 > 협력업체 기준
*/

/* ProjectSelect: SQMS_WS01_001_01_P1 프로젝트 선택팝업(현장정보 등록되지않은 프로젝트용) */
export const ProjectSelect = {
  options: {
    Cfg: {
      NoVScroll: 0,
      CanEdit: 0,
      NoDataMessage : 3,
    },
    Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'baseType', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'gongsaTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 15, Wrap: 0 },
        { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 10, Wrap: 0 },
        { Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작'}], RelWidth: 10 },
        { Name: 'csrtEndDt', Header: [{}, { Value: '종료' }], RelWidth: 10 },
        { Name: 'csrtMngrNm', Header: [{ Value: '현장소장', RowSpan: 2 }], RelWidth: 10 },
    ]
  },
  data: [
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
  ],
}

/* MultiProjectSelect: 프로젝트 다중 선택 팝업 */
export const MultiProjectSelect = {
  options: {
    Cfg: {
      NoVScroll: 0,
      CanEdit: 0,
      NoDataMessage : 3,
    },
    Cols: [
      { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center',  }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'baseTypeNm', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'csrtTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 15, Wrap: 0 },
      { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 10, Wrap: 0 },
    ]
  },
  data: [
    { SEQ: '1', baseType: '건축', csrtTypeNm: '공장', projectId: 'CUKR1303',  projectNm: '고양 덕은 복합시설 공사', siteId: 'WAMCQ16668', siteNm: '고양 덕은 복합시설 공사' },
  ],
}

/* UserGroup:  권한그룹 검색 팝업 */
export const UserGroup = {
  options: {
      Cols: [
          { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10, CanEdit: 0},
          { Name: 'groupTypeNm', Header: [{ Value: '그룹유형' }], RelWidth: 20, CanEdit: 0},
          { Name: 'groupAuthNm', Header: [{ Value: '권한그룹' }], RelWidth: 20, CanEdit: 0},
          { Name: 'groupAuthDtlId', Header: [{ Value: '그룹코드' }], RelWidth: 20, CanEdit: 0 },
      ]
  },
  data: [
    { case1: '1', case2: '시스템관리자', case3: '시스템관리자', case4: 'GC0010',},
  ],
}

/* EmployeeSearch: SQMS_WS01_001_02_P2 사원검색 팝업 */
export const EmployeeSearch = {
    options: {
        Cols: [
            { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 10 },
            { Name: 'case2', Header: [{ Value: '사원번호' }], RelWidth: 20 },
            { Name: 'case3', Header: [{ Value: '사원명' }], RelWidth: 10 },
            { Name: 'case4', Header: [{ Value: '직급' }], RelWidth: 30 },
            { Name: 'case5', Header: [{ Value: '근무지명(현장명)' }], RelWidth: 30 },
        ]
    },
    data: [
        { case1: '1', case2: '202032315', case3: '이현대', case4: '매니저', case5: '고양 덕은 복합시설 공사'},
        { case1: '2', case2: '202032315', case3: '이현대', case4: '책임 매니저', case5: '고양 덕은 복합시설 공사'},
        { case1: '3', case2: '202032315', case3: '이현대', case4: '책임 매니저', case5: '고양 덕은 복합시설 공사'},
    ],
}
export const MultiEmployeeSearch = {
  options: {
      Cols: [
          { Name: 'case0', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
          { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 10,CanEdit:0 },
          { Name: 'case2', Header: [{ Value: '사원번호' }], RelWidth: 20,CanEdit:0 },
          { Name: 'case3', Header: [{ Value: '사원명' }], RelWidth: 10,CanEdit:0 },
          { Name: 'case4', Header: [{ Value: '직급' }], RelWidth: 30,CanEdit:0 },
          { Name: 'case5', Header: [{ Value: '근무지명(현장명)' }], RelWidth: 30,CanEdit:0 },
      ]
  },
  data: [
      { case0: false, case1: '1', case2: '202032315', case3: '이현대', case4: '매니저', case5: '고양 덕은 복합시설 공사'},
      { case0: false, case1: '2', case2: '202032315', case3: '이현대', case4: '책임 매니저', case5: '고양 덕은 복합시설 공사'},
      { case0: false, case1: '3', case2: '202032315', case3: '이현대', case4: '책임 매니저', case5: '고양 덕은 복합시설 공사'},
  ],
}

/* MajorSearch: SQMS_WS01_001_02_P3 전공선택팝업 */
export const MajorSearch = { 
    options: {
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 20 },
            { Name: 'majorKrNm', Header: [{ Value: '전공명' }], RelWidth: 40 },
            { Name: 'majorKrShrtNm', Header: [{ Value: '약칭' }], RelWidth: 40 },
        ]
    },
    data: [
        { case1: '1', case2: '건축', case3: '건축', },
        { case1: '1', case2: '건축', case3: '건축', },
        { case1: '1', case2: '건축', case3: '건축', },
        { case1: '1', case2: '건축', case3: '건축', },
        { case1: '1', case2: '건축', case3: '건축', },
    ],
}

/* HoldinfoList: SQMS_WS01_006 세대옵션>세대옵션(All Sites)>상세>세대정보 List 팝업 */
export const HoldinfoList = { 
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '연동유무' }], RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '동' }], RelWidth: 9 },
      { Name: 'case3', Header: [{ Value: '호수' }], RelWidth: 9 },
      { Name: 'case4', Header: [{ Value: '층' }], RelWidth: 9 },
      { Name: 'case5', Header: [{ Value: '라인' }], RelWidth: 9 },
      { Name: 'case6', Header: [{ Value: '주택형' }], RelWidth: 9 },
      { Name: 'case7', Header: [{ Value: '평형' }], RelWidth: 9 },
      { Name: 'case8', Header: [{ Value: '변동유무' }], RelWidth: 9 },
      { Name: 'case9', Header: [{ Value: '등록일' }], RelWidth: 9 },
      { Name: 'case10', Header: [{ Value: '수정일' }], RelWidth: 9 },
      { Name: 'case11', Header: [{ Value: '추가정보' }], RelWidth: 9 },
    ]
  },
  data: [
    { case1: '연동', case2: '101동', case3: '101호', case4: '1', case5: '2', case6: '59 Type', case7:'58.6605', case8: 'X', case9: '2020-01-30', case10: '2020-04-21', case11: '' },
    { case1: '미연동', case2: '101동', case3: '101호', case4: '1', case5: '2', case6: '59 Type', case7:'58.6605', case8: 'X', case9: '2020-01-30', case10: '2020-04-21', case11: '' },
    { case1: '미연동', case2: '101동', case3: '101호', case4: '1', case5: '2', case6: '59 Type', case7:'58.6605', case8: 'X', case9: '2020-01-30', case10: '2020-04-21', case11: '' },
  ],
}

/* HoldOption3: SQMS_WS01_006 세대옵션 정보 > 2. 세대옵션 품목 */
export const PrdtOptions = {
  options: {
    Cfg:{
      NoDataMessage : 3,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'dsItem', Header: [{ Value: '현재 계약된 품목' }], RelWidth: 70, CanEdit : 0 },
      { Name: 'dtContract', Header: [{ Value: '현재 계약일자' }], RelWidth: 30, CanEdit : 0 },
    ]
  },
  data: [
    { case1: '', case2: '' },  
  ],
}

/* HoldOption3: SQMS_WS01_006 세대옵션 정보 > 2. 세대옵션 품목 */
export const PrdtOptions2 = {
  options: {
    Cfg:{
      NoDataMessage : 3,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'dsItem', Header: [{ Value: '이전 계약된 품목' }], RelWidth: 70, CanEdit : 0 },
      { Name: 'dtContract', Header: [{ Value: '이전 계약일자' }], RelWidth: 30, CanEdit : 0 },
    ]
  },
  data: [
    { case: '', case2: '' },  
  ],
}

/* HistoryLoad: SQMS_WS02_001_02 품질활동 > 시험관리 > 품질시험계획서 > History 불러오기 팝업 */
export const HistoryLoad = { 
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '제목' }], RelWidth: 30 },
      { Name: 'case3', Header: [{ Value: '수정한 사람' }], RelWidth: 20 },
      { Name: 'case4', Header: [{ Value: '수정 일시' }], RelWidth: 20 },
      { Name: 'case5', Header: [{ Value: '비고' }], RelWidth: 20 },
    ]
  },
  data: [
    { case1: '1', case2: '성토용 흙 / 지반조사 등록', case3: '김현대', case4: '2021-11-14 11:23:40', case5: '' },
    { case1: '2', case2: '성토용 흙 / 지반조사 등록', case3: '김현대', case4: '2021-11-14 11:23:40', case5: '' },
    { case1: '3', case2: '성토용 흙 / 지반조사 등록', case3: '김현대', case4: '2021-11-14 11:23:40', case5: '' },
  ],
}

/* TestSearch: SQMS_WS02_001_06 품질활동 > 시험관리 > 시험결과관리 > 결과 입력 > 시험 종목 검색 팝업 */
export const TestSearch = { 
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '구분 [대분류]' }], RelWidth: 15 },
      { Name: 'case3', Header: [{ Value: '공종 [중분류]' }], RelWidth: 15 },
      { Name: 'case4', Header: [{ Value: '종별 [소분류]' }], RelWidth: 15 },
      { Name: 'case5', Header: [{ Value: '규격' }], RelWidth: 15 },
      { Name: 'case6', Header: [{ Value: '시험종목' }], RelWidth: 15 },
      { Name: 'case7', Header: [{ Value: '시험 Type' }], RelWidth: 15 },
    ]
  },
  data: [
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
  ],
}

/* AcceptanceWrite: SQMS_WS02_002_05 자재관리>인수검사>신규등록 팝업 */
export const AcceptanceWrite = { 
  options: {
    Cfg: {
      DataMerge: 1,                   // 열단위 머지여부
      FixPrevColumnMerge: 'docSeq',   // 열조건 단위 머지
      NoDataMessage:3,
    },
    Def: {
      Row: {
        CanFormula:1
      }
    },
    Cols: [
      { Name: 'mtrlSpApprId', Header: [{ Value: '', RowSpan: 2 }], RelWidth: 5, CanEdit:0 },
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], CanSort: 0, RelWidth: 5, CanEdit:1, ColMerge: false, Type:'Bool' },
      { Name: 'docSeq', Header: [{ Value: '문서번호', RowSpan: 2 }], RelWidth: 15, CanEdit:0 },
      { Name: 'mainName', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 6, CanEdit:0 },
      { Name: 'midName', Header: [{ Value: '세부공종', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'prdtNm', Header: [{ Value: '품명', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'prdtDtl', Header: [{ Value: '세부품명', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'stnd', Header: [{ Value: '규격', RowSpan: 2 }], RelWidth: 10, CanEdit:0, ColMerge: false },
      { Name: 'ksCtfcYn', Header: [{ Value: 'KS인증', Span: 2 }, { Value: '인증여부' }], Type: 'Bool', RelWidth: 6, CanEdit:2, ColMerge: false },
      { Name: 'ksCtfcNum', Header: [{}, { Value: '인증번호' }], RelWidth: 10, CanEdit:0, ColMerge: false },
      { Name: 'spprNm', Header: [{ Value: '공급업체', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'mnft', Header: [{ Value: '제조업체', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'cnt', Header: [{ Value: '체크리스트\n등록여부', RowSpan: 2 }], RelWidth: 6, CanEdit:2, Type: 'Bool' },
      { Name: 'apprDt', Header: [{ Value: '승인일', RowSpan: 2 }], RelWidth: 8, CanEdit:0 },
    ]
  },
  data: [
    // { case1: '', case2: 'WA10102 –건축- 자재승인-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '이형철근', case6: 'D13', case7: '1', case8: 'KSD3504', case9: 'ㅇㅇ건업', case10: 'ㅇㅇ제철', case11: 'YYYY-MM-DD' },
    // { case1: '', case2: 'WA10102 –건축- 자재승인-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '이형철근', case6: 'D13', case7: '1', case8: 'KSD3504', case9: 'ㅇㅇ건업', case10: 'ㅇㅇ제철', case11: 'YYYY-MM-DD' },
    // { case1: '', case2: 'WA10102 –건축- 자재승인-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '이형철근', case6: 'D13', case7: '1', case8: 'KSD3504', case9: 'ㅇㅇ건업', case10: 'ㅇㅇ제철', case11: 'YYYY-MM-DD' },
    // { case1: '', case2: 'WA10102 –건축- 자재승인-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '이형철근', case6: 'D13', case7: '1', case8: 'KSD3504', case9: 'ㅇㅇ건업', case10: 'ㅇㅇ제철', case11: 'YYYY-MM-DD' },
  ],
}

/* Quantitychange: SQMS_WS02_002_05 자재관리>인수검사>물량변경 */
export const Quantitychange = {
  options: {
    Cfg: {
      NoDataMessage:3,
    },
    Def:{
      Row:{
        "CanFormula" : 1,
        "CalcOrder" :"afBrAmt",
      },
    },
    Cols: [
      { Name: 'prdtNm', Header: [{ Value: '품명' }], RelWidth: 10, CanEdit:0,  },
      { Name: 'prdtDtl', Header: [{ Value: '상세품명' }], RelWidth: 10, CanEdit:0},
      { Name: 'stnd', Header: [{ Value: '규격' }], RelWidth: 10, CanEdit:0},
      { Name: 'spprNm', Header: [{ Value: '공급업체' }], RelWidth: 10, CanEdit:0 },
      { Name: 'mnft', Header: [{ Value: '제조업체' }], RelWidth: 10, CanEdit:0 },
      { Name: 'designAmt', Header: [{ Value: '설계량', Span: 2 }], RelWidth: 10, CanEdit:0 ,Type:'Int'},
      { Name: 'unit', Header: [{}], RelWidth: 5, CanEdit:0 },
      { Name: 'total', Header: [{ Value: '누계' }], RelWidth: 5, CanEdit:0,Type:'Int' },
      { Name: 'afRcvAmt', Header: [{ Value: '입고량' }], RelWidth: 10 ,Type:'Int', Size: 7,},
      { Name: 'afRjtAmt', Header: [{ Value: '불합격량' }], RelWidth: 10,Type:'Int',Size:7, },
      { Name: 'afBrAmt', Header: [{ Value: '반입량(합격)' }], RelWidth: 10, Formula:"afRcvAmt-afRjtAmt",Type:'Int' },
      { Name: 'shmtDt', Header: [{ Value: '출고일' }], Type: 'Date', "Format": "yyyy-MM-dd", "DataFormat": "yyyyMMdd", "EditFormat": "yyyyMMdd", RelWidth: 10, CanEdit:0 },
    ],
  },
  data: [
    { case1: '이형철근(SD400)', case2: 'D13', case3: 'ㅇㅇ건업', case4: '현대제철', case5: '1000', case6: 'ton', case7: '700', case8: '1000', case9: '', case10: '자동계산', case11: '' },
    { case1: '이형철근(SD400)', case2: 'D13', case3: 'ㅇㅇ건업', case4: '현대제철', case5: '1000', case6: 'ton', case7: '1000', case8: '600', case9: '', case10: '자동계산', case11: '' },
    { case1: '이형철근(SD400)', case2: 'D13', case3: 'ㅇㅇ건업', case4: '현대제철', case5: '1000', case6: 'ton', case7: '700', case8: '600', case9: '', case10: '자동계산', case11: '' },
  ],
}

/* Quantitychange: SQMS_WS02_002_05 자재관리>인수검사>물량변경 */
export const Quantitychange2 = {
  options: {
    Cfg: {
      DataMerge: 1,                   // 열단위 머지여부
      FixPrevColumnMerge: 'orgUpDttm',   // 열조건 단위 머지
      NoDataMessage:3,
    },
    Def:{
      Row:{
        // "CanFormula" : 1,
        // "CalcOrder" :"brAmt",
      },
    },
    Cols: [
      { Name: 'orgUpDttm', Header: [{ Value: '', RowSpan: 2 }], RelWidth: 12, CanEdit:0, },
      { Name: 'prdtNm', Header: [{ Value: '품명', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'prdtDtl', Header: [{ Value: '상세품명', RowSpan: 2 }], RelWidth: 10, CanEdit:0, ColMerge: false },
      { Name: 'stnd', Header: [{ Value: '규격', RowSpan: 2 }], RelWidth: 10, CanEdit:0, ColMerge: false },
      { Name: 'spprNm', Header: [{ Value: '공급업체', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'mnft', Header: [{ Value: '제조업체', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'bfRcvAmt', Header: [{ Value: '변경전', Span: 3 }, { Value: '입고량' }], RelWidth: 7, CanEdit:0, ColMerge: false },
      { Name: 'bfRjtAmt', Header: [{}, { Value: '불합격량' }], RelWidth: 7, CanEdit:0 , ColMerge: false},
      { Name: 'bfBrAmt', Header: [{}, { Value: '반입량' }], RelWidth: 7, CanEdit:0, ColMerge: false },
      { Name: 'afRcvAmt', Header: [{ Value: '변경후', Span: 3 }, { Value: '입고량' }], RelWidth: 7, CanEdit:0 , ColMerge: false},
      { Name: 'afRjtAmt', Header: [{}, { Value: '불합격량' }], RelWidth: 7, CanEdit:0, ColMerge: false },
      { Name: 'afBrAmt', Header: [{}, { Value: '반입량' }], RelWidth: 7, CanEdit:0, ColMerge: false },
      { Name: 'chgRsn', Header: [{ Value: '변경 사유', RowSpan: 2 }], RelWidth: 12, CanEdit:0 },
      { Name: 'upDttm', Header: [{ Value: '수정일', RowSpan: 2 }], RelWidth: 12, CanEdit:0, },
    ],
  },
  data: [
    { case1: '이형철근(SD400)', case2: 'D13', case3: 'ㅇㅇ건업', case4: '현대제철', case5: '1000', case6: '1000', case7: '1000', case8: '1000', case9: '1000', case10: '1000', case11: '추가불합격~' },
    { case1: '이형철근(SD400)', case2: 'D13', case3: 'ㅇㅇ건업', case4: '현대제철', case5: '1000', case6: '1000', case7: '1000', case8: '1000', case9: '1000', case10: '1000', case11: '추가불합격~' },
    { case1: '이형철근(SD400)', case2: 'D13', case3: 'ㅇㅇ건업', case4: '현대제철', case5: '1000', case6: '1000', case7: '1000', case8: '1000', case9: '1000', case10: '1000', case11: '추가불합격~' },
  ],
}

/* ProductDetail: SQMS_WS02_002_06 자재관리>자재공급원 승인요청>품명 선택 */
export const ProductDetail = { 
  options: {
    Cols: [
      { Name: 'mainCodeId', Header: [{ Value: '공종' }], RelWidth: 30 },
      { Name: 'midCodeId', Header: [{ Value: '세부공종' }], RelWidth: 35 },
      { Name: 'productName', Header: [{ Value: '품명' }], RelWidth: 35 },
      { Name: 'materialProjectDetailId', Visible: '0'},
    ]
  },
  data: [
    { mainCodeId: '공통', midCodeId: '철근콘크리트 공사', productName: '이형철근 (SD400)' },
    { mainCodeId: '공통', midCodeId: '철근콘크리트 공사', productName: '이형철근 (SD400)' },
    { mainCodeId: '공통', midCodeId: '철근콘크리트 공사', productName: '이형철근 (SD400)' },
    { mainCodeId: '공통', midCodeId: '철근콘크리트 공사', productName: '이형철근 (SD400)' },
    { mainCodeId: '공통', midCodeId: '철근콘크리트 공사', productName: '이형철근 (SD400)' },
    { mainCodeId: '공통', midCodeId: '철근콘크리트 공사', productName: '이형철근 (SD400)' },
  ],
}

/* ProductSelect: SQMS_WS02_002_06 자재관리>자재공급원 승인요청>품명 선택 */
export const ProductSelect = { 
  options: {
    Cols: [
      { Name: 'mainCodeId', Header: [{ Value: '공종' }], Type: 'Enum', RelWidth: 15 },
      { Name: 'midCodeId', Header: [{ Value: '세부공종' }], Type: 'Enum', RelWidth: 35 },
      { Name: 'productName', Header: [{ Value: '품명' }], RelWidth: 50 },
      { Name: 'materialProjectDetailId', Visible: '0'},
    ]
  },
  data: [
    { mainCodeId: '', midCodeId: '', productName: '' },
  ],
}

/* SupplySelect: SQMS_WS02_002_06 자재관리>자재공급원 승인요청>공급업체 선택 */
export const SupplySelect = { 
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '업체명' }], RelWidth: 30 },
      { Name: 'case2', Header: [{ Value: '주소' }], RelWidth: 35 },
      { Name: 'case3', Header: [{ Value: '사업자번호' }], RelWidth: 35 },
    ]
  },
  data: [
    { case1: 'ㅇㅇ건업', case2: '서울시 성북구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ건업', case2: '서울시 성북구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ건업', case2: '서울시 성북구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ건업', case2: '서울시 성북구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ건업', case2: '서울시 성북구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ건업', case2: '서울시 성북구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ건업', case2: '서울시 성북구', case3: '000-00-000000' },
  ],
}

/* MaterialProject: SQMS_WS02_002_04 자재관리>현장 Set-up>타 프로젝트 가져오기 */
export const MaterialProject = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }, {}], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'case2', Header: [{ Value: '공종', RowSpan: 2 }, {}], RelWidth: 5 },
      { Name: 'case3', Header: [{ Value: '세부공종', RowSpan: 2 }, {}], RelWidth: 10 },
      { Name: 'case4', Header: [{ Value: '품명', RowSpan: 2 }, {}], RelWidth: 15 },
      { Name: 'case5', Header: [{ Value: '품명메타', RowSpan: 2 }, {}], RelWidth: 10 },
      { Name: 'case6', Header: [{ Value: '주요자재\n여부', RowSpan: 2 }, {}], Type: 'Bool', RelWidth: 5 },
      { Name: 'case7', Header: [{ Value: '인수검사\n필수여부', RowSpan: 2 }, {}], Type: 'Bool', RelWidth: 5 },
      { Name: 'case8', Header: [{ Value: '공장검사\n필수여부', RowSpan: 2 }, {}], Type: 'Bool', RelWidth: 5 },
      { Name: 'case9', Header: [{ Value: '인수검사\nCheck List', Span: 2 }, { Value: '상태' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_add'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
      { Name: 'case10', Header: [{}, { Value: 'Rev No' }], RelWidth: 5 },
      { Name: 'case11', Header: [{ Value: '공장검사\nCheck List', Span: 2 }, { Value: '상태' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_add'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
      { Name: 'case12', Header:  [{}, { Value: '개정차수' }], RelWidth: 5 },
    ]
  },
  data: [
    { case1: '', case2: '건축', case3: '토공사및기초공사', case4: '가공철근', case5: '가공철근', case6: '', case7: '', case8: '', case9: '0', case10: 'Rev. 0', case11: '0', case12: '0' },
    { case1: '', case2: '건축', case3: '토공사및기초공사', case4: '가공철근', case5: '가공철근', case6: '', case7: '', case8: '', case9: '0', case10: 'Rev. 0', case11: '1', case12: '1' },
    { case1: '', case2: '건축', case3: '토공사및기초공사', case4: '가공철근', case5: '가공철근', case6: '', case7: '', case8: '', case9: '0', case10: 'Rev. 0', case11: '1', case12: '1' },
    { case1: '', case2: '건축', case3: '토공사및기초공사', case4: '가공철근', case5: '가공철근', case6: '', case7: '', case8: '', case9: '0', case10: 'Rev. 0', case11: '1', case12: '1' },
    { case1: '', case2: '건축', case3: '토공사및기초공사', case4: '가공철근', case5: '가공철근', case6: '', case7: '', case8: '', case9: '0', case10: 'Rev. 0', case11: '0', case12: '0' },
    { case1: '', case2: '건축', case3: '토공사및기초공사', case4: '가공철근', case5: '가공철근', case6: '', case7: '', case8: '', case9: '0', case10: 'Rev. 0', case11: '0', case12: '0' },
    { case1: '', case2: '건축', case3: '토공사및기초공사', case4: '가공철근', case5: '가공철근', case6: '', case7: '', case8: '', case9: '0', case10: 'Rev. 0', case11: '0', case12: '0' },
    { case1: '', case2: '건축', case3: '토공사및기초공사', case4: '가공철근', case5: '가공철근', case6: '', case7: '', case8: '', case9: '0', case10: 'Rev. 0', case11: '0', case12: '0' },
  ],
}

/* PartnersSearch: SQMS_WS02_002_11 자재관리>공장검사>검사결과 입력>갑지(레미콘/아스콘)2>협력사 직원 검색 */
export const PartnersSearch = { 
  options: { 
    Cfg: {
      NoVScroll: 0,
    },
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case3', Header: [{ Value: '사용자명' }], RelWidth: 20 },
      { Name: 'case4', Header: [{ Value: '직책명' }], RelWidth: 20 },
      { Name: 'case5', Header: [{ Value: '협력사명' }], RelWidth: 40 },
    ]
  },
  data: [
    { case1: '', case2: '1', case3: '김현대', case4: '책임감리', case5: 'ㅇㅇ 건설사업관리단' },
    { case1: '', case2: '2', case3: '김현대', case4: '책임감리', case5: 'ㅇㅇ 건설사업관리단' },
    { case1: '', case2: '3', case3: '김현대', case4: '책임감리', case5: 'ㅇㅇ 건설사업관리단' },
    { case1: '', case2: '4', case3: '김현대', case4: '책임감리', case5: 'ㅇㅇ 건설사업관리단' },
  ],
}

/* PartnersSearch2: SQMS_WS02_003_02 콘크리트관리>타설관리>타설등록>협력사 선택 팝업 */
export const PartnersSearch2 = { 
  options: { 
    Cfg: {
      NoVScroll: 0,
      NoDataMessage:3,
    },
    Cols: [
      { Name: 'case1', Header: [{ Value: '협력사유형' }], RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '협력사 ID \n (사업자번호)' }], RelWidth: 20 },
      { Name: 'case3', Header: [{ Value: '협력사명' }], RelWidth: 40 },
      { Name: 'case4', Header: [{ Value: '등록시스템' }], RelWidth: 15 },
      { Name: 'case5', Header: [{ Value: '등록일자' }], RelWidth: 15 },
    ]
  },
  data: [
    { case1: '시공/자재', case2: '112-11-11321', case3: 'ㅇㅇ건업', case4: 'NHSE', case5: 'YYYY-MM-DD' },
    { case1: '시공/자재', case2: '112-11-11321', case3: 'ㅇㅇ건업', case4: 'NHSE', case5: 'YYYY-MM-DD' },
    { case1: '시공/자재', case2: '112-11-11321', case3: 'ㅇㅇ건업', case4: 'NHSE', case5: 'YYYY-MM-DD' },
    { case1: '시공/자재', case2: '112-11-11321', case3: 'ㅇㅇ건업', case4: 'NHSE', case5: 'YYYY-MM-DD' },
  ],
}

/* FormulaWrite: SQMS_WS02_003 콘크리트관리>초기 Setting>시방배합>배합표 일괄등록 */
export const FormulaWrite = { 
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '공급업체' }], RelWidth: 50 },
      { Name: 'case2', Header: [{ Value: '배합규격' }], RelWidth: 50 },
    ]
  },
  data: [
    { case1: 'ㅇㅇ건업', case2: '00-00-000' },
    { case1: 'ㅇㅇ건업', case2: '00-00-000' },
    { case1: 'ㅇㅇ건업', case2: '00-00-000' },
    { case1: 'ㅇㅇ건업', case2: '00-00-000' },
    { case1: 'ㅇㅇ건업', case2: '00-00-000' },
  ],
}

/* ProjectLoad: SQMS_WS02_003 콘크리트관리 > 초기 Setting > 시방배합 > 타 프로젝트 불러오기 */
export const ProjectLoad = { 
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 2 },
      { Name: 'case2', Header: [{ Value: '공급업체', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'case3', Header: [{ Value: '배합규격', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'case4', Header: [{ Value: '콘크리트의 \n 종류', RowSpan: 2 }], Type: 'Enum', Enum: "|보통 콘크리트|경량 콘크리트|포장 콘크리트|고강도 콘크리트|숏크리트|기타", EnumKeys: "|1|2|3|4|5|6", RelWidth: 4 },
      { Name: 'case5', Header: [{ Value: '배합기간별 \n 종류', RowSpan: 2 }], Type: 'Enum', Enum: "|표준(간절기)|하절기|동절기|MAT배합(저발열)|기타", EnumKeys: "|1|2|3|4|5",  RelWidth: 4 },
      { Name: 'case6', Header: [{ Value: '물-결합재비 \n (W/B, %)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case7', Header: [{ Value: '잔골재율 \n (S/a, %)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case8', Header: [{ Value: '시멘트 \n (C1)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case9', Header: [{ Value: '저발열 \n 시멘트 \n (HSC)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case10', Header: [{ Value: '청수(W1)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case11', Header: [{ Value: '회수수(W2)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case12', Header: [{ Value: '잔골재 \n (S1)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case13', Header: [{ Value: '잔골재 \n (S2)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case14', Header: [{ Value: '잔골재 \n (S3)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case15', Header: [{ Value: '굵은골재 \n (G1)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case16', Header: [{ Value: '굵은골재 \n (G2)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case17', Header: [{ Value: '혼화재 \n (C2)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case18', Header: [{ Value: '혼화재 \n (C3)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case19', Header: [{ Value: '혼화재 \n (C4)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case20', Header: [{ Value: '혼화재 \n (AD1)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case21', Header: [{ Value: '혼화재 \n (AD2)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case22', Header: [{ Value: '혼화재 \n (AD3)', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'case23', Header: [{ Value: '밀도', Span: 15 }, { Value: '시멘트 \n (C1)' }], RelWidth: 2 },
      { Name: 'case24', Header: [{}, { Value: '저발열 \n 시멘트 \n (HSC)' }], RelWidth: 2 },
      { Name: 'case25', Header: [{}, { Value: '청수(W1)' }], RelWidth: 2 },
      { Name: 'case26', Header: [{}, { Value: '회수수(W2)' }], RelWidth: 2 },
      { Name: 'case27', Header: [{}, { Value: '잔골재 \n (S1)' }], RelWidth: 2 },
      { Name: 'case28', Header: [{}, { Value: '잔골재 \n (S2)' }], RelWidth: 2 },
      { Name: 'case29', Header: [{}, { Value: '잔골재 \n (S3)' }], RelWidth: 2 },
      { Name: 'case30', Header: [{}, { Value: '굵은골재 \n (G1)' }], RelWidth: 2 },
      { Name: 'case31', Header: [{}, { Value: '굵은골재 \n (G2)' }], RelWidth: 2 },
      { Name: 'case32', Header: [{}, { Value: '혼화재 \n (C2)' }], RelWidth: 2 },
      { Name: 'case33', Header: [{}, { Value: '혼화재 \n (C3)' }], RelWidth: 2 },
      { Name: 'case34', Header: [{}, { Value: '혼화재 \n (C4)' }], RelWidth: 2 },
      { Name: 'case35', Header: [{}, { Value: '혼화재 \n (AD1)' }], RelWidth: 2 },
      { Name: 'case36', Header: [{}, { Value: '혼화재 \n (AD2)' }], RelWidth: 2 },
      { Name: 'case37', Header: [{}, { Value: '혼화재 \n (AD3)' }], RelWidth: 2 },
      { Name: 'case38', Header: [{ Value: '골재수 \n 정계수', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'case39', Header: [{ Value: '배합표', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_add'>등록</button>","1": "<button type='button' class='btn_download'>다운로드</button>"}, RelWidth: 5 },
      { Name: 'case40', Header: [{ Value: '등록일', RowSpan: 2 }], Type: 'Date', "Format": "yyyy/MM/dd", "DataFormat": "yyyyMMdd", "EditFormat": "yyyyMMdd", RelWidth: 5 },
      { Name: 'case41', Header: [{ Value: '비고', RowSpan: 2 }], RelWidth: 4 },
    ]
  },
  data: [
    { case1: '', case2: '', case3: '', case4: '', case5: '', case6: '', case7: '', case8: '', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '', case16: '', case17: '', case18: '', case19: '', case20: '', case21: '', case22: '', case23: '', case24: '', case25: '', case26: '', case27: '', case28: '', case29: '', case30: '', case31: '', case32: '', case33: '', case34: '', case35: '', case36: '', case37: '', case38: '', case39: '0', case40: '', case41: '' },
    { case1: '', case2: '', case3: '', case4: '', case5: '', case6: '', case7: '', case8: '', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '', case16: '', case17: '', case18: '', case19: '', case20: '', case21: '', case22: '', case23: '', case24: '', case25: '', case26: '', case27: '', case28: '', case29: '', case30: '', case31: '', case32: '', case33: '', case34: '', case35: '', case36: '', case37: '', case38: '', case39: '1', case40: '', case41: '' },
  ],
}

/* ProjectLoad2: SQMS_WS02_003 콘크리트관리 > 초기 Setting > 타설옵션 > 타 프로젝트 불러오기 */
export const ProjectLoad2 = { 
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0, RelWidth: 2 },
      { Name: 'case2', Header: [{ Value: '공급업체', RowSpan: 3 }], RelWidth: 5 },
      { Name: 'case3', Header: [{ Value: '배합규격', RowSpan: 3 }], RelWidth: 5 },
      { Name: 'case4', Header: [{ Value: '타설옵션', RowSpan: 3 }], RelWidth: 5 },
      { Name: 'case5', Header: [{ Value: '레미콘 \n 당 \n 타설량', RowSpan: 3 }], RelWidth: 2 },
      { Name: 'case6', Header: [{ Value: '물성시험 \n 빈도(㎡)', RowSpan: 3 }], RelWidth: 3 },
      { Name: 'case7', Header: [{ Value: '압축강도 \n 시험빈도(㎥)', RowSpan: 3 }], RelWidth: 3 },
      { Name: 'case8', Header: [{ Value: ' 합격기준', Span: 18 }, { Value: '물성시험', Span: 9 }, { Value: '염화물 \n (kg/㎡)' }], RelWidth: 3 },
      { Name: 'case9', Header: [{}, {}, { Value: '온도(℃) \n (최저값~최대값)', Span: 2 }], RelWidth: 2 },
      { Name: 'case10', Header: [{}, {}, {}], RelWidth: 2 },
      { Name: 'case11', Header: [{}, {}, { Value: '공기량(%) \n (최저값~최대값)', Span: 2 }], RelWidth: 2 },
      { Name: 'case12', Header: [{}, {}, {}], RelWidth: 2 },
      { Name: 'case13', Header: [{}, {}, { Value: '슬럼프(㎜) \n (최저값~최대값)', Span: 2 }], RelWidth: 2 },
      { Name: 'case14', Header: [{}, {}, {}], RelWidth: 2 },
      { Name: 'case15', Header: [{}, {}, { Value: '단위수량(kg) \n (최저값~최대값)', Span: 2 }], RelWidth: 2 },
      { Name: 'case16', Header: [{}, {}, {}], RelWidth: 2 },
      { Name: 'case17', Header: [{}, { Value: '거푸집 탈형 압축강도', Span: 3 }, { Value: '탈형 \n (벽체)' }], RelWidth: 3 },
      { Name: 'case18', Header: [{}, {}, { Value: '탈형 \n (슬라브)' }], RelWidth: 3 },
      { Name: 'case19', Header: [{}, {}, { Value: '탈형 \n (기타)' }], RelWidth: 3 },
      { Name: 'case20', Header: [{}, { Value: '표준 압축강도', Span: 6 }, { Value: '3일 \n (MPa이상)' }], RelWidth: 3 },
      { Name: 'case21', Header: [{}, {}, { Value: '7일 \n (MPa이상)' }], RelWidth: 3 },
      { Name: 'case22', Header: [{}, {}, { Value: '14일 \n (MPa이상)' }], RelWidth: 3 },
      { Name: 'case23', Header: [{}, {}, { Value: '21일 \n (MPa이상)' }], RelWidth: 3 },
      { Name: 'case24', Header: [{}, {}, { Value: '28일 \n (MPa이상)' }], RelWidth: 3 },
      { Name: 'case25', Header: [{}, {}, { Value: '91일 \n (MPa이상)' }], RelWidth: 3 },
      { Name: 'case26', Header: [{ Value: '강도보정계수 \n (N/㎟)', RowSpan: 3 }], RelWidth: 3 },
      { Name: 'case27', Header: [{ Value: '압축강도 시험체크', Span: 9 }, { Value: '거푸집 탈형(대기) 압축강도', Span: 3 }, { Value: '탈형 \n (벽체)' }], RelWidth: 3 },
      { Name: 'case28', Header: [{}, {}, { Value: '탈형 \n (슬라브)' }], RelWidth: 3 },
      { Name: 'case29', Header: [{}, {}, { Value: '탈형 \n (기타)' }], RelWidth: 3 },
      { Name: 'case30', Header: [{}, { Value: '표준(양생) 압축강도', Span: 6 }, { Value: '3일' }], Type: 'Bool', RelWidth: 2 },
      { Name: 'case31', Header: [{}, {}, { Value: '7일' }], Type: 'Bool', RelWidth: 2 },
      { Name: 'case32', Header: [{}, {}, { Value: '14일' }], Type: 'Bool', RelWidth: 2 },
      { Name: 'case33', Header: [{}, {}, { Value: '21일' }], Type: 'Bool', RelWidth: 2 },
      { Name: 'case34', Header: [{}, {}, { Value: '28일' }], Type: 'Bool', RelWidth: 2 },
      { Name: 'case35', Header: [{}, {}, { Value: '91일' }], Type: 'Bool', RelWidth: 2 },
      { Name: 'case36', Header: [{ Value: '등록/수정일', RowSpan: 3 }], Type: 'Date', "Format": "yyyy/MM/dd", "DataFormat": "yyyyMMdd", "EditFormat": "yyyyMMdd", RelWidth: 5 },
    ]
  },
  data: [
    { case1: '', case2: '', case3: '', case4: '', case5: '', case6: '', case7: '', case8: '', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '', case16: '', case17: '', case18: '', case19: '', case20: '', case21: '', case22: '', case23: '', case24: '', case25: '', case26: '', case27: '', case28: '', case29: '', case30: '', case31: '', case32: '', case33: '', case34: '', case35: '', case36: '' },
  ],
}

/* EquipmentSelect: SQMS_WS02_003 콘크리트관리>초기 Setting>시험장비>시공장비>시험장비 선택 */
export const EquipmentSelect = { 
  options: { 
    Cols: [
      { Name: 'confinalNm', Header: [{ Value: '공종' }], RelWidth: 10 },
      { Name: 'deviceNm', Header: [{ Value: '계측기명' }], RelWidth: 30 },
      { Name: 'holdingCompany', Header: [{ Value: '보유업체' }], RelWidth: 20 },
      { Name: 'correctTerm', Header: [{ Value: '교정주기' }], RelWidth: 20 },
      { Name: 'status', Header: [{ Value: '보유/반출상태' }], RelWidth: 20 },
    ]
  },
  data: [
    { case1: '토목', case2: '염화물측트랜싯정기', case3: 'HEC', case4: '1년', case5: '보유' },
    { case1: '토목', case2: '염화물측트랜싯정기', case3: 'HEC', case4: '1년', case5: '보유' },
    { case1: '토목', case2: '염화물측트랜싯정기', case3: 'HEC', case4: '1년', case5: '보유' },
    { case1: '토목', case2: '염화물측트랜싯정기', case3: 'HEC', case4: '1년', case5: '보유' },
  ],
}

/* EquipmentSelect2: SQMS_WS02_003 콘크리트관리>초기 Setting>시험장비>시공장비>타 프로젝트 불러오기 */
export const EquipmentSelect2 = { 
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'case2', Header: [{ Value: 'Type', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'case3', Header: [{ Value: '펌프카', Span: 2 }, { Value: '규격' }], RelWidth: 10 },
      { Name: 'case4', Header: [{}, { Value: '사용대수' }], RelWidth: 10 },
      { Name: 'case5', Header: [{ Value: '진동기', Span: 2 }, { Value: '규격' }], RelWidth: 10 },
      { Name: 'case6', Header: [{}, { Value: '사용대수' }], RelWidth: 10 },
      { Name: 'case7', Header: [{ Value: '양생기', Span: 2 }, { Value: '규격' }], RelWidth: 10 },
      { Name: 'case8', Header: [{}, { Value: '사용대수' }], RelWidth: 10 },
      { Name: 'case9', Header: [{ Value: '기타', Span: 2 }, { Value: '규격' }], RelWidth: 10 },
      { Name: 'case10', Header: [{}, { Value: '사용대수' }], RelWidth: 10 },
      { Name: 'case11', Header: [{ Value: '비고', RowSpan: 2 }], RelWidth: 10 },
    ]
  },
  data: [
    { case1: '', case2: '', case3: '', case4: '', case5: '', case6: '', case7: '', case8: '', case9: '', case10: '', case11: '' },
  ],
}

/* EquipmentSelect3: SQMS_WS02_003 콘크리트관리>초기 Setting>시험장비>원재료>타 프로젝트 불러오기 */
export const EquipmentSelect3 = { 
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'case2', Header: [{ Value: 'Type' }], RelWidth: 10 },
      { Name: 'case3', Header: [{ Value: '시멘트 종류' }], RelWidth: 15 },
      { Name: 'case4', Header: [{ Value: '혼화제의 종류' }], RelWidth: 15 },
      { Name: 'case5', Header: [{ Value: '혼화재의 종류' }], RelWidth: 15 },
      { Name: 'case6', Header: [{ Value: '일일배합표 확인' }], RelWidth: 15 },
      { Name: 'case7', Header: [{ Value: '기타' }], RelWidth: 10 },
      { Name: 'case8', Header: [{ Value: '비고' }], RelWidth: 20 },
    ]
  },
  data: [
    { case1: '', case2: '', case3: '', case4: '', case5: '', case6: '', case7: '', case8: '' },
  ],
}

/* EquipmentSelect4: SQMS_WS02_003 콘크리트관리>초기 Setting>시험장비>타설계획서>타 프로젝트 불러오기 */
export const EquipmentSelect4 = { 
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'case2', Header: [{ Value: 'Type', RowSpan: 2 }], RelWidth: 7 },
      { Name: 'case3', Header: [{ Value: '인원현황', Span: 4 }, { Value: '콘크리트공' }], RelWidth: 8 },
      { Name: 'case4', Header: [{}, { Value: '형틀목공' }], RelWidth: 8 },
      { Name: 'case5', Header: [{}, { Value: '미장공' }], RelWidth: 8 },
      { Name: 'case6', Header: [{}, { Value: '양생공' }], RelWidth: 8 },
      { Name: 'case7', Header: [{ Value: '양생계획', Span: 7 }, { Value: '양생포' }], RelWidth: 8 },
      { Name: 'case8', Header: [{}, { Value: 'PE FILM' }], RelWidth: 8 },
      { Name: 'case9', Header: [{}, { Value: '살수장비' }], RelWidth: 8 },
      { Name: 'case10', Header: [{}, { Value: '살수일수' }], RelWidth: 8 },
      { Name: 'case11', Header: [{}, { Value: '진동, 충격금지 기간(일수)' }], RelWidth: 8 },
      { Name: 'case12', Header: [{}, { Value: '철근올리기 금지 기간(일수)' }], RelWidth: 8 },
      { Name: 'case13', Header: [{}, { Value: '거푸집 해체 금지 기간(일수)' }], RelWidth: 8 },
    ]
  },
  data: [
    { case1: '', case2: '', case3: '', case4: '', case5: '', case6: '', case7: '', case8: '' },
  ],
}

/* FactoryWrite: SQMS_WS02_002_05 자재관리>공장검사>신규등록 팝업 */
export const FactoryWrite = { 
  options: {
    Cfg: {
      NoDataMessage:3,
    },
    Def: {
      Row: {
        CanFormula:1
      }
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], CanSort: 0, RelWidth: 5, CanEdit:1, Type:'Bool' },
      { Name: 'docSeq', Header: [{ Value: '문서번호', RowSpan: 2 }], RelWidth: 15, CanEdit:0 },
      { Name: 'mainName', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'midName', Header: [{ Value: '세부공종', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'prdtNm', Header: [{ Value: '품명', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'ksCtfcYn', Header: [{ Value: 'KS인증', Span: 2 }, { Value: '인증여부' }], Type: 'Bool', RelWidth: 10, CanEdit:2, },
      { Name: 'ksCtfcNum', Header: [{}, { Value: '인증번호' }], RelWidth: 10, CanEdit:0, },
      { Name: 'spprNm', Header: [{ Value: '공급업체', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'mnft', Header: [{ Value: '제조업체', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
      { Name: 'cnt', Header: [{ Value: '체크리스트 등록여부', RowSpan: 2 }], RelWidth: 10, CanEdit:2, Type: 'Bool' },
      { Name: 'apprDt', Header: [{ Value: '승인일', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
    ]
  },
  data: [
    // { case1: '', case2: 'WA10102 –건축- 자재승인-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '이형철근', case6: 'D13', case7: '1', case8: 'KSD3504', case9: 'ㅇㅇ건업', case10: 'ㅇㅇ제철', case11: 'YYYY-MM-DD' },
    // { case1: '', case2: 'WA10102 –건축- 자재승인-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '이형철근', case6: 'D13', case7: '1', case8: 'KSD3504', case9: 'ㅇㅇ건업', case10: 'ㅇㅇ제철', case11: 'YYYY-MM-DD' },
    // { case1: '', case2: 'WA10102 –건축- 자재승인-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '이형철근', case6: 'D13', case7: '1', case8: 'KSD3504', case9: 'ㅇㅇ건업', case10: 'ㅇㅇ제철', case11: 'YYYY-MM-DD' },
    // { case1: '', case2: 'WA10102 –건축- 자재승인-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '이형철근', case6: 'D13', case7: '1', case8: 'KSD3504', case9: 'ㅇㅇ건업', case10: 'ㅇㅇ제철', case11: 'YYYY-MM-DD' },
  ],
}

/* CompanySelect: SQMS_WS02_004_02 자재관리>공장검사>검사결과 입력>갑지(레미콘/아스콘)2>협력사 직원 검색  */
export const CompanySelect = { 
  options: { 
    Cols: [
      { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      // { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'prdtNm', Header: [{ Value: '품명' }], Required: '1', CanEdit: 2, RelWidth: 25, Size: 50, },
      { Name: 'prdtDtl', Header: [{ Value: '상세품명' }], Required: '1', RelWidth: 25, Size: 100, },
      { Name: 'stnd', Header: [{ Value: '규격' }], Required: '1', RelWidth: 25, EditMask: '^\\d{0,7}$', CustomFormat: '##-##-###', Size: 20, },
      { Name: 'designAmt', Header: [{ Value: '설계량' }], RelWidth: 30, Type: 'Float', Format: '#,###.##', Size: 20 },
      { Name: 'unit', Header: [{ Value: '단위' }], RelWidth: 10, Size: 20 },
    ]
  },
  data: [
    { case1: 'ㅇㅇ 건업', case2: '서울시 성북구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ 건업', case2: '서울시 종로구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ 건업', case2: '서울시 강남구', case3: '000-00-000000' },
    { case1: 'ㅇㅇ 건업', case2: '서울시 성북구', case3: '000-00-000000' },
  ],
}

 /* TextbookAdd: SQMS_WS03_003 점검 및 교육 > 교육관리 > 교육 훈련 계획/실시(내현장) > 계획 등록 > 타프로젝트 교육교재 추가 팝업 */
 export const TextbookAdd = { 
  options: { 
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5, CanEdit : 0 },
      // { Name: 'case2', Header: [{ Value: '본부' }], RelWidth: 10 },
      { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], RelWidth: 20, CanEdit : 0 },
      { Name: 'gjName', Header: [{ Value: '공종' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'kindName', Header: [{ Value: '종류' }], RelWidth: 15, CanEdit : 0 },
      { Name: 'eduTargetType', Header: [{ Value: '대상' }], RelWidth: 15, CanEdit : 0 },
      { Name: 'eduCourseName', Header: [{ Value: '교육 과정명' }], RelWidth: 20, CanEdit : 0 },
      { Name: 'tchmtrFileCount', Header: [{ Value: '교육교재 \n 첨부파일' }], RelWidth: 10, CanEdit : 0 },
      { Name: 'eduMngId',  Visible: 0 },
    ]
  },
  data: [
    { case1: '1', case2: '플랜트(화공)', case3: '신도림동 오피스텔 신축사업', case4: '건축', case5: 'IT', case6: '현장구성원', case7: 'BIM 교육', case8: '1' },
    { case1: '1', case2: '플랜트(화공)', case3: '신도림동 오피스텔 신축사업', case4: '건축', case5: 'IT', case6: '현장구성원', case7: 'BIM 교육', case8: '1' },
    { case1: '1', case2: '플랜트(화공)', case3: '신도림동 오피스텔 신축사업', case4: '건축', case5: 'IT', case6: '현장구성원', case7: 'BIM 교육', case8: '2' },
    { case1: '1', case2: '플랜트(화공)', case3: '신도림동 오피스텔 신축사업', case4: '건축', case5: 'IT', case6: '현장구성원', case7: 'BIM 교육', case8: '2' },
  ],
}

/* CorrectionWrite: SQMS_WS03_005_01 점검 및 교육 > 시험/검사 장비 > 시험/검사장비 교정 현황 등록 */
export const CorrectionWrite = {
  options: {
    Cfg:{
      NoDataMessage:3,
    },
    Cols: [
      // { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'correctDate', Header: [{ Value: '교정일자', RowSpan: 2 }], Type: 'Date', "Format": "yyyy-MM-dd", "DataFormat": "yyyy-MM-dd", "EditFormat": "yyyyMMdd", Required: 1, RelWidth: 15 },
      { Name: 'bforRst', Header: [{ Value: '교정결과', Span: 2 }, { Value: '교정 전' }], Type: 'Enum', Enum: "|합격|불합격", EnumKeys: "|PASS|UNPASS", RelWidth: 10 },
      { Name: 'aftrRst', Header: [{}, { Value: '교정 후' }], Type: 'Enum', Enum: "|합격|불합격", EnumKeys: "|PASS|UNPASS", RelWidth: 10 },
      { Name: 'nextDate', Header: [{ Value: '차기 교정일자', RowSpan: 2 }], Type: 'Date', "Format": "yyyy-MM-dd", "DataFormat": "yyyy-MM-dd", "EditFormat": "yyyyMMdd", RelWidth: 15 },
      { Name: 'correctCompany', Header: [{ Value: '교정자/대행기관', RowSpan: 2 }], Required: 1, RelWidth: 15, Size:30, },
      { Name: 'userEdit', Header: [{ Value: '담당자', RowSpan: 2 }], Type: 'Html', RelWidth: 30 },
    ]
  },
  data: [
    { case1: '', case2: '', case3: '', case4: '', case5: '', case6: '', case7: '<div class="btn_wrap"> <span></span> <button type="button" class="btn btn_sm btn_darkblue btn_radius">검색</button> </div>' },
  ],
}

/* CooperationSearch: SQMS_WS03_005_01 점검 및 교육 > 시험/검사 장비 > 협력업체인력 조회 */
export const CooperationSearch = {
  options: { 
    Cols: [
      { Name: 'tradeId', Header: [{ Value: '협력업체 \n 코드' }], RelWidth: 15 },
      { Name: 'tradeNm', Header: [{ Value: '협력업체명' }], RelWidth: 15 },
      { Name: 'userId', Header: [{ Value: '협력업체직원ID' }], RelWidth: 15 },
      { Name: 'userNm', Header: [{ Value: '협력업체직원명' }], RelWidth: 15 },
      { Name: 'email', Header: [{ Value: '연락처' }], RelWidth: 15 },
      { Name: 'hp', Header: [{ Value: '이메일' }], RelWidth: 25 },
    ]
  },
  data: [
    { case1: '2028136156', case2: '㈜호호설비', case3: 'HSE211089', case4: '김호호', case5: '010-1234-5678', case6: 'kimhoho@gmail.com' },
  ],
}

/* TestPlanDetail: SQMS_WS02_001_02_01 품질활동 > 시험관리 > 품질시험계획서(타 프로젝트 데이터 가져오기) */
export const TestPlanDetail = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0, RelWidth: 6 },
      { Name: 'case2', Header: [{ Value: '구분 \n [대분류]', RowSpan: 3 }], ColMerge: 1, RelWidth: 8 },
      { Name: 'case3', Header: [{ Value: '공종 \n [중분류]', RowSpan: 3 }], ColMerge: 1, RelWidth: 8 },
      { Name: 'case4', Header: [{ Value: '종별 \n [소분류]', RowSpan: 3 }], ColMerge: 1, RelWidth: 8 },
      { Name: 'case5', Header: [{ Value: '규격', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'case6', Header: [{ Value: '시험 종목', RowSpan: 3 }], RelWidth: 8 },
      { Name: 'case7', Header: [{ Value: '시험 방법', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'case8', Header: [{ Value: '시험 빈도', RowSpan: 3 }], ColMerge: 1, RelWidth: 8 },
      { Name: 'case9', Header: [{ Value: '시험 \n 계획 \n 물량', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'case10', Header: [{ Value: '단위', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'case11', Header: [{ Value: '시험계획 횟수', Span: 5 }, { Value: '합계', RowSpan: 2 }], RelWidth: 6 },
      { Name: 'case12', Header: [{}, { Value: '시험 Type', Span: 3 }, { Value: '현장' }], RelWidth: 6 },
      { Name: 'case13', Header: [{}, {}, { Value: '의뢰' }], RelWidth: 6 },
      { Name: 'case14', Header: [{}, {}, { Value: '공장' }], RelWidth: 6 },
      { Name: 'case15', Header: [{}, { Value: '성적서 대체', RowSpan: 2 }], RelWidth: 6 },
    ]
  },
  data: [
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
    { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '' },
  ],
}

/* DetectionChecklist: SQMS_WS02_005_01 품질활동 > 검측관리 > 본사 Set-up > 체크리스트 추가 */
export const DetectionChecklist = {
  options: {
    Cfg:{
      NoDataMessage:3,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'chkIem', Header: [{ Value: '검사항목' }], Required: 1,Type: "Lines",AcceptEnters: 3, RelWidth: 40, Size:250, Align: 'left', Indent: 1 },
      { Name: 'stndrd', Header: [{ Value: '규격 및 기준' }], Required: 1,Type: "Lines",AcceptEnters: 3, RelWidth: 40, Size: 1200, Align: 'left', Indent: 1 },
    ]
  },
  data: [],
}

/* DetectionChecklist2: SQMS_WS02_005_01 품질활동 > 검측관리 > 현장 Set-up > 체크리스트 추가 */
export const DetectionChecklist2 = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case3', Header: [{ Value: '검사항목' }], RelWidth: 40 },
      { Name: 'case4', Header: [{ Value: '규격 및 기준' }], RelWidth: 40 },
    ]
  },
  data: [
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
    { case1: '', case2: '', case3: '', case4: '' },
  ],
}

/* DetectionAdmin2: SQMS_WS02_005_01 품질활동 > 검측관리 > 본사 Set-up > ITP */
export const DetectionAdmin2 = {
  options: {
    Cfg:{
      NoDataMessage:3,
      NoVScroll:0,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'mainName', Header: [{ Value: '대공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0 },
      { Name: 'midName', Header: [{ Value: '공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0 },
      { Name: 'subName', Header: [{ Value: '세부 공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0 },
      { Name: 'inptStep', Header: [{ Value: '단계', RowSpan: 3 }], RelWidth: 6, CanEdit:0  },
      { Name: 'inptIem', Header: [{ Value: '항목', RowSpan: 3 }], RelWidth: 6 , CanEdit:0 },
      { Name: 'chkIem', Header: [{ Value: '검사항목', RowSpan: 3 }], RelWidth: 6, CanEdit:0  },
      { Name: 'chkFreq', Header: [{ Value: '검사시기/ \n 빈도', RowSpan: 3 }], RelWidth: 6 , CanEdit:0 },
      { Name: 'chkStd', Header: [{ Value: '검사기준 및 \n 시험 기준', RowSpan: 3 }], RelWidth: 17, CanEdit:0  },
      { Name: 'chkMtd', Header: [{ Value: '검사방법', RowSpan: 3 }], RelWidth: 6, CanEdit:0  },
      { Name: 'relateHis', Header: [{ Value: '관련 기록', RowSpan: 3 }], RelWidth: 6 , CanEdit:0 },
      { Name: 'ccpyTradeType', Header: [{ Value: '시험 기준', Span: 5 }, { Value: '협력업체', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6, CanEdit:0  },
      { Name: 'cnstrctTradeChrgType', Header: [{}, { Value: '시공사', Span: 2 }, { Value: '담당/책임' }], Type: 'Enum', Enum: '|공사|공무|품질|안전', EnumKeys: '|001|002|003|004', RelWidth: 6, CanEdit:0  },
      { Name: 'cnstrctTradeRspnberType', Header: [{},{}, { Value: '책임' }], Type: 'Enum', Enum: '|공사|공무|품질|안전', EnumKeys: '|001|002|003|004', RelWidth: 6, CanEdit:0  },
      { Name: 'cnstrctTradeChkType', Header: [{}, { Value: '검사점', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6, CanEdit:0  },
      { Name: 'spvsTradeType', Header: [{}, { Value: '건설사업 \n 관리단', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M',  RelWidth: 6 , CanEdit:0 },
      { Name: 'comment', Header: [{ Value: '비고', RowSpan: 3 }], RelWidth: 6, CanEdit:0  },
    ]
  },
  data: [
    { case1: '', case2: '건축', case3: '철골공사', case4: '현장시공', case5: '용접', case6: '용접사 기량시험', case7: '용접 전', case8: '표준시방서 KCS 14 31 20 : 2016', case9: '방사선투과탐상법성적서(RT)', case10: '중점품질관리계획서자격자등록대장', case11: '', case12: '', case13: '', case14: '', case15: '' },    
    { case1: '', case2: '건축', case3: '철골공사', case4: '현장시공', case5: '용접', case6: '용접사 기량시험', case7: '용접 전', case8: '표준시방서 KCS 14 31 20 : 2016', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '' },    
    { case1: '', case2: '건축', case3: '철골공사', case4: '현장시공', case5: '용접', case6: '용접사 기량시험', case7: '용접 전', case8: '표준시방서 KCS 14 31 20 : 2016', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '' },    
  ],
}

/* ItrList2: SQMS_WS02_005_01 품질활동 > 검측관리 > 현장 Set-up > ITR(Check List) */
export const ItrList2 = {
  options: {
    Cfg:{
      NoVScroll:false,
      NoDataMessage:3,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5,CanEdit:0 },
      { Name: 'mainName', Header: [{ Value: '대공종' }], RelWidth: 10,CanEdit:0 },
      { Name: 'midName', Header: [{ Value: '공종' }], RelWidth: 10,CanEdit:0 },
      { Name: 'subName', Header: [{ Value: '세부공종' }], RelWidth: 10,CanEdit:0 },
      { Name: 'chkTitle', Header: [{ Value: '체크리스트 이름' }], RelWidth: 20 ,CanEdit:0},
      { Name: 'inUser', Header: [{ Value: '등록자' }], RelWidth: 5,CanEdit:0 },
      { Name: 'siteNm', Header: [{ Value: '현장명' }], RelWidth: 20,CanEdit:0 },
      { Name: 'projNm', Header: [{ Value: '프로젝트명' }], RelWidth: 20,CanEdit:0 },
      { Name: 'registDate', Header: [{ Value: '등록일' }], RelWidth: 5,CanEdit:0 },
    ]
  },
  data: [
    { case1: '', case2: '1', case3: 'A타입 체크리스트', case4: '본사', case5: '2021-12-01' },
    { case1: '', case2: '1', case3: 'A타입 체크리스트', case4: '본사', case5: '2021-12-01' },
    { case1: '', case2: '1', case3: 'A타입 체크리스트', case4: '본사', case5: '2021-12-01' },
    { case1: '', case2: '1', case3: 'A타입 체크리스트', case4: '본사', case5: '2021-12-01' },
    { case1: '', case2: '1', case3: 'A타입 체크리스트', case4: '본사', case5: '2021-12-01' },
  ],
}


/* InspectionAgency: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 일정 등록 > 점검기관 검색 */
export const InspectionAgency = {
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '점검기관' }], RelWidth: 90 },
    ]
  },
  data: [
    { case1: '1', case2: '국토교통부' },
    { case1: '2', case2: '대전지방국토청' },
    { case1: '3', case2: '부산지방국토청' },
    { case1: '4', case2: '서울지방국토청' },
    { case1: '5', case2: '원주지방국토청' },
  ],
}


/* InspectionManager: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 일정 등록 > 점검 예정자 검색 */
export const InspectionManager = {
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 0, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case3', Header: [{ Value: '점검 기관' }], RelWidth: 50 },
      { Name: 'case4', Header: [{ Value: '점검 부서' }], RelWidth: 15 },
      { Name: 'case5', Header: [{ Value: '점검자' }], RelWidth: 15 },
    ]
  },
  data: [
    { case1: '', case2: '1', case3: '국토교통부', case4: '-', case5: '이현대' },
    { case1: '', case2: '1', case3: '국토교통부', case4: '-', case5: '이현대' },
    { case1: '', case2: '1', case3: '국토교통부', case4: '-', case5: '이현대' },
    { case1: '', case2: '1', case3: '국토교통부', case4: '-', case5: '이현대' },
    { case1: '', case2: '1', case3: '국토교통부', case4: '-', case5: '이현대' },
    { case1: '', case2: '1', case3: '국토교통부', case4: '-', case5: '이현대' },
  ],
}

/* RecipientSearch: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 일정 등록 > 수신자 검색 */
export const RecipientSearch = {
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '부서명' }], RelWidth: 90 },
    ]
  },
  data: [
    { case1: '1', case2: '경영DI팀' },
    { case1: '2', case2: '품질경영팀' },
    { case1: '3', case2: '건축사업1팀' },
    { case1: '4', case2: '건축사업2팀' },
    { case1: '5', case2: '건축사업3팀' },
  ],
}

/* FinalPenaltyWrite: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 최종벌점 작성 */
export const FinalPenaltyWrite = {
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'case2', Header: [{ Value: '분야', RowSpan: 2 }], RelWidth: 15 },
      { Name: 'case3', Header: [{ Value: '제목', RowSpan: 2 }], RelWidth: 15 },
      { Name: 'case4', Header: [{ Value: '지적유형', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case5', Header: [{ Value: '최초벌점', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case6', Header: [{ Value: '확정일', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case7', Header: [{ Value: '조치대상', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case8', Header: [{ Value: '<span class="emp_red">최종벌점</span>', Span: 2, Type: 'Html' }, { Value: '확정여부' }], Type: 'Enum', Enum: '|선택|벌점확정|벌점취소', EnumKeys: '|1|2|3', RelWidth: 15 },
      { Name: 'case9', Header: [{}, { Value: '확정벌점' }], RelWidth: 10 },
    ]
  },
  data: [
    { case1: '1', case2: '기타(안전포함)', case3: '피난안전구역 창문', case4: '무효', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '0' },
    { case1: '1', case2: '기타(안전포함)', case3: '피난안전구역 창문', case4: '무효', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '2', case9: '0' },
    { case1: '1', case2: '기타(안전포함)', case3: '피난안전구역 창문', case4: '무효', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '3', case9: '0' },
  ],
}

/* CommitteeSearch: SQ_SPEC_EXTN_W_034 점검 및 교육 > 대외 점검 > 지원요청 – 현장 > 심의위원회 검색 */
export const CommitteeSearch = {
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 0, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case3', Header: [{ Value: '기관' }], RelWidth: 50 },
      { Name: 'case4', Header: [{ Value: '이름' }], RelWidth: 30 },
    ]
  },
  data: [
    { case1: '', case2: '1', case3: '통합심의위원회', case4: '이현대' },
    { case1: '', case2: '2', case3: '통합심의위원회', case4: '이현대' },
    { case1: '', case2: '3', case3: '통합심의위원회', case4: '이현대' },
    { case1: '', case2: '4', case3: '통합심의위원회', case4: '이현대' },
  ],
}

/* RecipientSelect: SQ_ACT_NCP_W_004 부적합관리>CAR>신규 등록>수신자 선택 */
export const RecipientSelect = {
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '협력사유형' }], RelWidth: 30 },
      { Name: 'case2', Header: [{ Value: '협력사명' }], RelWidth: 30 },
      { Name: 'case3', Header: [{ Value: '사용자ID' }], RelWidth: 20 },
      { Name: 'case4', Header: [{ Value: '사용자명' }], RelWidth: 20 },
    ]
  },
  data: [
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
    { case1: '시공/자재', case2: 'ㅁㅁ건업', case3: '2117900', case4: '홍길동' },
  ],
}

/* ReportDetailWrite: SQ_STATS_YREP_W_002 경영검토>보고서 작성>5.현장별 개선필요사항 */
export const ReportDetailWrite = {
  options: { 
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 0, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case3', Header: [{ Value: '내용' }], RelWidth: 80 },
    ]
  },
  data: [
    { case1: '', case2: '1', case3: '' },
    { case1: '', case2: '2', case3: '' },
    { case1: '', case2: '3', case3: '' },
    { case1: '', case2: '4', case3: '' },
    { case1: '', case2: '5', case3: '' },
    { case1: '', case2: '6', case3: '' },
    { case1: '', case2: '7', case3: '' },
    { case1: '', case2: '8', case3: '' },
    { case1: '', case2: '9', case3: '' },
    { case1: '', case2: '10', case3: '' },
  ],
}

/* DetectionTable: SQMS_WS02_005_02 품질활동 > 검측관리 > 검측현황(시공사) > 검측 등록 > 검측 점검표 검색 */
export const DetectionTable = {
  options: {
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'chkTitle', Header: [{ Value: '체크리스트 이름' }], RelWidth: 30 },
      { Name: 'inUser', Header: [{ Value: '등록자' }], RelWidth: 25 },
      { Name: 'registDate', Header: [{ Value: '등록일' }], RelWidth: 25 },
    ]
  },
  data: [
    { case1: '1', case2: 'A타입 체크리스트', case3: '본사', case4: '2021-12-01' },
    { case1: '1', case2: 'A타입 체크리스트', case3: '본사', case4: '2021-12-01' },
    { case1: '1', case2: 'A타입 체크리스트', case3: '본사', case4: '2021-12-01' },
    { case1: '1', case2: 'A타입 체크리스트', case3: '본사', case4: '2021-12-01' },
    { case1: '1', case2: 'A타입 체크리스트', case3: '본사', case4: '2021-12-01' },
  ],
}

/* ChecklistLoad: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>체크리스트 설정>본사 불러오기 */
export const ChecklistLoad = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'case2', Header: [{ Value: '제목' }], Class: 'al pl20 pr20', RelWidth: 70 },
      { Name: 'case3', Header: [{ Value: '작성일' }], RelWidth: 20 },
    ]
  },
  data: [
    { case1: '1', case2: '12월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '2', case2: '12월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '3', case2: '10월 행정안전부용 체크리스트', case3: '2022-11-20' },
    { case1: '4', case2: '9월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '5', case2: '8월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '6', case2: '12월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '7', case2: '12월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '8', case2: '10월 행정안전부용 체크리스트', case3: '2022-11-20' },
    { case1: '9', case2: '9월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '10', case2: '8월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '11', case2: '8월 국토부용 체크리스트', case3: '2022-11-20' },
    { case1: '12', case2: '8월 국토부용 체크리스트', case3: '2022-11-20' },
  ],
}

/* checkListWriteModal: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>체크리스트 설정>본사 불러오기 */
export const checkListSearch = {
  options: {
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 , CanEdit: 0},
      { Name: 'title', Header: [{ Value: '체크리스트 제목' }], RelWidth: 70 , CanEdit: 0},
      { Name: 'regDt', Header: [{ Value: '작성일' }], RelWidth: 20 , CanEdit: 0},
      { Name: 'detailBtn', Header: [{ Value: '내용' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 10 },
    ]
  },
  data: [],
}

/* projectListSheet: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List> 대상 현장 지정 */
export const projectListSheet = {
  options: {
    Cols: [
      { Name: 'isCheck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'baseTypeNm', Header: [{ Value: '유형' }], RelWidth: 20, CanEdit: 0},
      { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], RelWidth: 50, CanEdit: 0},
      { Name: 'csrtMngrNm', Header: [{ Value: '소장' }], RelWidth: 20, CanEdit: 0},
    ]
  },
  data: [],
}

export const selfQualityDetailSheet = {
  options: {
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 4 , CanEdit: 0},
      { Name: 'baseTypeNm', Header: [{ Value: '유형' }], RelWidth: 20 , CanEdit: 0},
      { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], RelWidth: 50 , CanEdit: 0},
      { Name: 'csrtMngrNm', Header: [{ Value: '소장' }], RelWidth: 20 , CanEdit: 0},
    ]
  },
  data: [
    { case1: '', case2: '건축', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '건축', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '건축', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '인프라', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '인프라', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '인프라', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '건축', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '건축', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '건축', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '인프라', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '인프라', case3: '프로젝트명', case4: '김현대' },
    { case1: '', case2: '인프라', case3: '프로젝트명', case4: '김현대' },
  ],
}


/* checklistWriteList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 > 체크리스트> 신규등록 */
export const checkListWriteList = {
  options: {
    Cols: [
      { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'mainCodeId', Header: [{ Value: '공종' }], Type: 'Enum', Required: 1, RelWidth: 15 },
      { Name: 'midCodeId', Header: [{ Value: '세부 공종' }], Type: 'Enum', Required: 1, RelWidth: 15 },
      { Name: 'chkStd', Header: [{ Value: '구분' }], RelWidth: 15 , Size: 50},
      { Name: 'chkContent', Header: [{ Value: '점검내용' }], Class: 'al pl20 pr20', Size: 100, Required: 1, RelWidth: 35 ,Type: "Lines",AcceptEnters: 3},
    ]
  },
  data: [
    { mainCodeId: '', midCodeId: '', chkStd: '', chkContent: ''},
  ],
}

/* checklistWriteList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 > 체크리스트> 신규등록 */
export const checkListDetailList = {
  options: {
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'mainName', Header: [{ Value: '공종' }], RelWidth: 15 , CanEdit: '0'},
      { Name: 'midName', Header: [{ Value: '세부 공종' }], RelWidth: 15 , CanEdit: '0'},
      { Name: 'chkStd', Header: [{ Value: '구분' }], RelWidth: 15 , CanEdit: '0'},
      { Name: 'chkContent', Header: [{ Value: '점검내용' }], Class: 'al pl20 pr20', RelWidth: 35 , CanEdit: '0' ,Type: "Lines",AcceptEnters: 3}, 
    ]
  },
  data: [
    { mainCodeId: '', midCodeId: '', chkStd: '', chkContent: ''},
  ],
}

/* selfQualityReplyList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>회신현황 보기 */
export const selfQualityReplyList = {
  options: {
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], CanEdit: 0,RelWidth: 5 },
      { Name: 'baseTypeNm', Header: [{ Value: '본부' }], CanEdit: 0,RelWidth: 10 },
      { Name: 'csrtTypeNm', Header: [{ Value: '공사유형' }], CanEdit: 0,RelWidth: 10 },
      { Name: 'projectId', Header: [{ Value: '프로젝트 코드' }], CanEdit: 0,RelWidth: 12 },
      { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], CanEdit: 0,RelWidth: 20 },
      { Name: 'csrtMngrNm', Header: [{ Value: '현장 소장' }],CanEdit: 0, RelWidth: 10 },
      // { Name: 'case7', Header: [{ Value: '품질관리자' }], RelWidth: 10 },
      { Name: 'replyTxt', Header: [{ Value: '회신현황' }],CanEdit: 0, Type: "Html", RelWidth: 10 },
      { Name: 'replyBtn', Header: [{ Value: 'Report' }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 10 },
    ]
  },
  data: [
    { case1: '12', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '완료', case9: '1' },
    { case1: '11', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '미완료', case9: '-' },
    { case1: '10', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '미완료', case9: '-' },
    { case1: '9', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '완료', case9: '1' },
    { case1: '8', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '완료', case9: '1' },
    { case1: '7', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '완료', case9: '1' },
    { case1: '6', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '미완료', case9: '-' },
    { case1: '5', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '완료', case9: '1' },
    { case1: '4', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '미완료', case9: '-' },
    { case1: '3', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '완료', case9: '1' },
    { case1: '2', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '완료', case9: '1' },
    { case1: '1', case2: '건축', case3: '일반건축', case4: 'CUKR1303', case5: '프로젝트명', case6: '김현대', case8: '완료', case9: '1' },
  ],
}

/* replyDetailCheckList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>회신현황 보기>상세보기1 */
export const replyDetailCheckList = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case3', Header: [{ Value: '구분', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case4', Header: [{ Value: '점검내용', RowSpan: 2 }], Class: 'al pl20 pr20', RelWidth: 50 },
        { Name: 'case5', Header: [{ Value: '점검 결과', Span: 2 }, { Value: '적합' }], Type: 'Radio', HRadio: 1, RelWidth: 5 },
        { Name: 'case6', Header: [{}, { Value: '부적합' }], Type: 'Radio', HRadio: 1, RelWidth: 5 },
        { Name: 'case7', Header: [{ Value: '비고', RowSpan: 2 }], RelWidth: 15 },
    ]
  },
  data: [
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: '', case6: '', case7: '' },
    { case1: '2', case2: '토공사', case3: '청소', case4: 'Column 흙제거 상태', case5: '', case6: '', case7: '' },
    { case1: '3', case2: '토공사', case3: '청소', case4: 'Column 흙제거 상태', case5: '', case6: '', case7: '' },
    { case1: '4', case2: '토공사', case3: '청소', case4: 'Column 흙제거 상태', case5: '', case6: '', case7: '' },
    { case1: '5', case2: '토공사', case3: '청소', case4: 'Column 흙제거 상태', case5: '', case6: '', case7: '' },
    { case1: '6', case2: '토공사', case3: '청소', case4: 'Column 흙제거 상태', case5: '', case6: '', case7: '' },
  ],
}

/* replyDetailPunchList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List>회신현황 보기>상세보기2 */
export const replyDetailPunchList = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '현황', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '문서번호', RowSpan: 2 }], RelWidth: 20 },
        { Name: 'case3', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case4', Header: [{ Value: '세부공종', RowSpan: 2 }], RelWidth: 15 },
        { Name: 'case5', Header: [{ Value: '업체명', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case6', Header: [{ Value: '제목', RowSpan: 2 }], Class: 'al pl20 pr20', RelWidth: 20 },
        { Name: 'case7', Header: [{ Value: '상태', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case8', Header: [{ Value: '발행일', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case9', Header: [{ Value: '요구일', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case10', Header: [{ Value: '완료일', RowSpan: 2 }], RelWidth: 5 },
    ]
  },
  data: [
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
  ],
}

/* InspectionResultWrite: SQ_SPEC_INTN_W_014 자체품질점검 >현장 >점검현황 List>결과입력1 */
export const siteCheckResultList = {
  options: {
    Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 , },
        { Name: 'mainName', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 12 , CanEdit: 0,},
        { Name: 'midName', Header: [{ Value: '세부 공종', RowSpan: 2 }], RelWidth: 12 , CanEdit: 0,},
        { Name: 'chkStd', Header: [{ Value: '구분', RowSpan: 2 }], RelWidth: 12 , CanEdit: 0,},
        { Name: 'chkContent', Header: [{ Value: '점검내용', RowSpan: 2 }], Class: 'al pl20 pr20', RelWidth: 45 ,CanEdit: 0,},
        { Name: 'pass', Header: [{ Value: '점검 결과', Span: 4, Class: 'required' }, { Value: '적합' }], Type: 'Radio', HRadio: 1, RelWidth: 5 },
        { Name: 'part', Header: [{}, { Value: '조건부 적합' }], Type: 'Radio', HRadio: 1, RelWidth: 5 },
        { Name: 'unpass', Header: [{}, { Value: '부적합' }], Type: 'Radio', HRadio: 1, RelWidth: 5 },
        { Name: 'none', Header: [{}, { Value: '해당 없음' }], Type: 'Radio', HRadio: 1, RelWidth: 5 },
        { Name: 'comment', Header: [{ Value: '비고', RowSpan: 2 }], RelWidth: 12 , Size:50, Type:"Lines",AcceptEnters: 3},
    ]
  },
  data: [
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
    { case1: '1', case2: 'Pile 공사', case3: '청소', case4: 'Column 흙제거 상태', case5: 'PILE 반입 시 검수는 실시하였는가?', case6: '1', case7: '', case8: '' },
  ],
}

export const sitePunchResultList = {
  options: {
    Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 4 },
        { Name: 'case1', Header: [{ Value: '진행 상황', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '부적합 번호', RowSpan: 2 }], RelWidth: 18 },
        { Name: 'case3', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case4', Header: [{ Value: '세부공종', RowSpan: 2 }], RelWidth: 15 },
        { Name: 'case5', Header: [{ Value: '업체명', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case6', Header: [{ Value: '제목', RowSpan: 2 }], Class: 'al pl20 pr20', RelWidth: 20 },
        { Name: 'case7', Header: [{ Value: '발행일', RowSpan: 2 }], RelWidth: 7 },
        { Name: 'case8', Header: [{ Value: '요구일', RowSpan: 2 }], RelWidth: 7 },
        { Name: 'case9', Header: [{ Value: '완료일', RowSpan: 2 }], RelWidth: 7 },
    ]
  },
  data: [
    { case1: '작성1', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: 'YYYY.MM.DD', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
    { case1: '작성', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: '-', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
  ],
}

/* 점검자 선택 */
export const checkUserSelectList = {
  options: {
    Cols: [
        { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, IconAlign: 'Center', RowSpan: 2 }], Type: 'Radio', HRadio: 0, CanSort: 0, CanEdit: 1, RelWidth: 4 },
        { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 2 },
        { Name: 'inUser', Visible : 0},
        { Name: 'userNm', Header: [{ Value: '점검자' }], CanEdit: 0, RelWidth: 10 },
        { Name: 'replyYn', Header: [{ Value: '진행 상황' }],  CanEdit: 0, Format: {"0": "작성 중","1": "완료"}, RelWidth: 10 },
        { Name: 'checkDt', Header: [{ Value: '점검일' }], CanEdit: 0, RelWidth: 10 },
        { Name: 'replyDt', Header: [{ Value: '회신일' }], CanEdit: 0, RelWidth: 10 },
        { Name: 'selfSiteChkRstId', Visible : 0},
    ]
  },
  data: [
    { chk: '1', case2: '건축', case3: '가설공사', case4: '홍길동' },
    { chk: '0', case2: '건축', case3: '가설공사', case4: '홍길동' },
    { chk: '0', case2: '건축', case3: '가설공사', case4: '홍길동' },
    { chk: '0', case2: '건축', case3: '가설공사', case4: '홍길동' },
    { chk: '0', case2: '건축', case3: '가설공사', case4: '홍길동' },
  ],
}

/* EducationStatusDetail: SQ_SPEC_WKEDU_W_010 점검 및 교육 > 신규 근로자 교육 현황 > 교육현황(내현장) > 교육 수정 */
export const EducationStatusDetail = {
  options: {
    Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'workerEduType', Header: [{ Value: '교육구분', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'mainName', Header: [{ Value: '공종명', RowSpan: 2 }], RelWidth: 45 },
        { Name: 'midName', Header: [{ Value: '상세 공종명', RowSpan: 2 }], RelWidth: 45 },
        { Name: 'mtrlName', Header: [{ Value: '교육명', RowSpan: 2 }], RelWidth: 45 },
    ]
  },
  data: [
    { case1: '1', case2: '건축', case3: '가설공사' },
    { case1: '2', case2: '건축', case3: '가설공사' },
    { case1: '3', case2: '건축', case3: '가설공사' },
  ],
}

/* EducationStatusDetail2: SQ_SPEC_WKEDU_W_010 점검 및 교육 > 신규 근로자 교육 현황 > 교육현황(내현장) > 교육 수정 */
export const EducationStatusDetail2 = {
  options: {
    Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
        { Name: 'workerName', Header: [{ Value: '이수자명', RowSpan: 2 }], CanEdit: 0, RelWidth: 30 },
        { Name: 'workerGender', Header: [{ Value: '성별', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
        { Name: 'workerNtnlName', Header: [{ Value: '국적', RowSpan: 2 }], CanEdit: 0, RelWidth: 25 },
        { Name: 'eduCmptDt', Header: [{ Value: '이수 일자', RowSpan: 2 }], CanEdit: 0, RelWidth: 25 },
    ]
  },
  data: [
    { case1: '1', case2: '홍길동', case3: '남', case4: '한국', case5: '2021-12-01' },
    { case1: '1', case2: '홍길동', case3: '남', case4: '한국', case5: '2021-12-01' },
    { case1: '1', case2: '홍길동', case3: '남', case4: '한국', case5: '2021-12-01' },
  ],
}

/* PaymentLine: SQ_COMN_SIGN_W_002 결재함(내 결재함) > 결재문서 (승인/반려)> 결재라인 변경 */
export const PaymentLine = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '소속' }], CanEdit: 0, RelWidth: 35 },
        { Name: 'case2', Header: [{ Value: '사용자명' }], CanEdit: 0, RelWidth: 35 },
        { Name: 'case3', Header: [{ Value: '직급' }], CanEdit: 0, RelWidth: 30 },
    ]
  },
  data: [
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
  ],
}

/* PaymentLine2: SQ_COMN_SIGN_W_002 결재함(내 결재함) > 결재문서 (승인/반려)> 결재라인 변경 */
export const PaymentLine2 = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '결재순서' }], CanEdit: 0, Class: 'bg_gray', RelWidth: 30 },
        { Name: 'case2', Header: [{ Value: '이름' }], CanEdit: 0, RelWidth: 30 },
        { Name: 'case3', Header: [{ Value: '소속/직급' }], CanEdit: 0, RelWidth: 30 },
        { Name: 'case4', Header: [{ Value: '이동' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_fill'>이동</button>"}, EditFormat: '', RelWidth: 10 },
    ]
  },
  data: [
    { case1: '결재1', case2: '김현대', case3: '매니저', case4: '' },
    { case1: '결재2', case2: '김현대', case3: '매니저', case4: '0' },
    { case1: '결재3', case2: '김현대', case3: '매니저', case4: '0' },
    { case1: '결재4', case2: '김현대', case3: '매니저', case4: '0' },
  ],
}

/* PaymentLine3: SQ_COMN_SIGN_W_017 결재함>설정>자주쓰는 결재라인 추가 */
export const PaymentLine3 = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
        { Name: 'case2', Header: [{ Value: '사원번호' }], CanEdit: 0, RelWidth: 45 },
        { Name: 'case3', Header: [{ Value: '00시험연구원' }], CanEdit: 0, RelWidth: 45 },
    ]
  },
  data: [
    { case1: '', case2: '******315', case3: '김현대' },
    { case1: '', case2: '******315', case3: '김현대' },
    { case1: '', case2: '******315', case3: '김현대' },
    { case1: '', case2: '******315', case3: '김현대' },
    { case1: '', case2: '******315', case3: '김현대' },
    { case1: '', case2: '******315', case3: '김현대' },
    { case1: '', case2: '******315', case3: '김현대' },
    { case1: '', case2: '******315', case3: '김현대' },
  ],
}

/* PaymentLine4: SQ_COMN_SIGN_W_017 결재함>설정>대결 추가 */
export const PaymentLine4 = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '번호' }], CanEdit: 0, RelWidth: 10 },
        { Name: 'case2', Header: [{ Value: '사원번호' }], CanEdit: 0, RelWidth: 15 },
        { Name: 'case3', Header: [{ Value: '사원명' }], CanEdit: 0, RelWidth: 15 },
        { Name: 'case4', Header: [{ Value: '직급' }], CanEdit: 0, RelWidth: 15 },
        { Name: 'case5', Header: [{ Value: '근무지명(프로젝트명)' }], CanEdit: 0, RelWidth: 45 },
    ]
  },
  data: [
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
    { case1: '1', case2: '******315', case3: '김현대', case4: '매니저', case5: '고양 덕은 복합시설 현장' },
  ],
}

/* PaymentLoad: SQ_COMN_SIGN_W_012 결재함>결재상신>결재라인 불러오기 */
export const PaymentLoad = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '등록 결재라인' }], CanEdit: 0, RelWidth: 30 },
        { Name: 'case2', Header: [{ Value: '' }], CanEdit: 0, RelWidth: 70 },
    ]
  },
  data: [
    { case1: '○○현장-검측요청서', case2: '기안 → 이현대 → 박현대 → 김소장 → 김감리' },
    { case1: '○○현장-검측요청서', case2: '기안 → 이현대 → 박현대 → 김소장 → 김감리' },
    { case1: '○○현장-검측요청서', case2: '기안 → 이현대 → 박현대 → 김소장 → 김감리' },
    { case1: '○○현장-검측요청서', case2: '기안 → 이현대 → 박현대 → 김소장 → 김감리' },
    { case1: '○○현장-검측요청서', case2: '기안 → 이현대 → 박현대 → 김소장 → 김감리' },
  ],
}

/* UserTarget: SQ_COMN_SIGN_W_012 결재함>결재상신>협조 대상 선택 */
export const UserTarget = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '소속' }], CanEdit: 0, RelWidth: 25 },
        { Name: 'case2', Header: [{ Value: '사번' }], CanEdit: 0, RelWidth: 25 },
        { Name: 'case3', Header: [{ Value: '사용자명' }], CanEdit: 0, RelWidth: 25 },
        { Name: 'case4', Header: [{ Value: '직급' }], CanEdit: 0, RelWidth: 25 },
    ]
  },
  data: [
    { case1: '00부서', case2: '******315', case3: '김현대', case4: '직급' },
    { case1: '00부서', case2: '******315', case3: '김현대', case4: '직급' },
    { case1: '00부서', case2: '******315', case3: '김현대', case4: '직급' },
    { case1: '00부서', case2: '******315', case3: '김현대', case4: '직급' },
  ],
}

/* UserShare: SQ_COMN_SIGN_W_008 결재함(완료함)>결재문서 보기>공유하기 */
export const UserShare = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '소속' }], CanEdit: 0, RelWidth: 35 },
        { Name: 'case2', Header: [{ Value: '사용자명' }], CanEdit: 0, RelWidth: 35 },
        { Name: 'case3', Header: [{ Value: '직급' }], CanEdit: 0, RelWidth: 30 },
    ]
  },
  data: [
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
    { case1: 'ㅇㅇ부서', case2: '김현대', case3: '매니저' },
  ],
}

/* NewMaterial: SQMS_WS02_002_01 자재관리>본사 Set-up>신규등록자재>신규 자재 매핑 */
export const NewMaterial = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '공종' }], CanEdit: 0, RelWidth: 25 },
        { Name: 'case2', Header: [{ Value: '세부공종' }], CanEdit: 0, RelWidth: 35 },
        { Name: 'case3', Header: [{ Value: '품명' }], CanEdit: 0, RelWidth: 40 },
    ]
  },
  data: [
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
    { case1: '공통', case2: '철근 콘크리트 공사', case3: '이형철근 (SD600)' },
  ],
}

/* PartnerWork: SQMS_BS_DATA_001 BS점검 > Set-up > 협력사 공종 연결 > 협력업체 기준 */
export const PartnerWork = {
  options: {
    Cols: [
        { Name: 'standDong', Header: [{ Value: '동' }], Type : "Int" , CanEdit: 0, RelWidth: 100 },
    ]
  },
  data: [
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
    { case1: '101동' },
  ],
}
/*  PartnerWork2: SQMS_BS_DATA_001 BS점검 > Set-up > 협력사 공종 연결 > 협력업체 기준 */
export const PartnerWork2 = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
        { Name: 'case2', Header: [{ Value: '1층' }], CanEdit: 0, RelWidth: 45 },
        { Name: 'case3', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
        { Name: 'case4', Header: [{ Value: '2층' }], CanEdit: 0, RelWidth: 45 },
        { Name: 'case5', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
        { Name: 'case6', Header: [{ Value: '3층' }], CanEdit: 0, RelWidth: 45 },
    ]
  },
  data: [
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
    { case1: '', case2: '101호', case3: '', case4: '201호', case5: '', case6: '301호' },
  ],
}


/* DetailedSchedule: SQMS_BS_DATA_001 BS점검 > Set-up > 일정관리> 상세일정관리 */
export const DetailedSchedule = {
  options: {
    Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
        { Name: 'case2', Header: [{ Value: 'D-day' }], CanEdit: 0, RelWidth: 15 },
        { Name: 'case3', Header: [{ Value: '예정일' }], Type: 'Date', "Format": "yyyy/MM/dd", "DataFormat": "yyyyMMdd", "EditFormat": "yyyyMMdd", RelWidth: 25 },
        { Name: 'case4', Header: [{ Value: '수행일' }], Type: 'Date', "Format": "yyyy/MM/dd", "DataFormat": "yyyyMMdd", "EditFormat": "yyyyMMdd", RelWidth: 25 },
        { Name: 'case5', Header: [{ Value: '비고' }], CanEdit: 0, RelWidth: 25 },
    ]
  },
  data: [
    { case1: '', case2: '100', case3: '', case4: '', case5: '100일' },
    { case1: '', case2: '100', case3: '', case4: '', case5: '100일' },
  ],
}
  /* PartnersSearch: SQMS_WS02_002_11 자재관리>공장검사>검사결과 입력>갑지(레미콘/아스콘)2>협력사 직원 검색 */
export const MasterCodeSearchList = { 
  options: { 
    Cfg: {
      NoVScroll: 0,
      CanEdit: 0,
    },
    Cols: [
      //{ Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10,},
      { Name: 'codeNameKr', Header: [{ Value: '검색유형' }], RelWidth: 40 },
      { Name: 'codeVal', Visible:0},
    ]
  },
  data: [
    { case1: '', case2: '1', case3: '김현대', case4: '책임감리', case5: 'ㅇㅇ 건설사업관리단' },
    { case1: '', case2: '2', case3: '김현대', case4: '책임감리', case5: 'ㅇㅇ 건설사업관리단' },
  ],
}
/* BS점검 > 세대결함 > 결함등록 (팝업) – 단일세대 방식 */
export const WriteDefect = {
  options: {
    Cfg:{
        NoVScroll : 0,
        NoDataMessage:3,
    },
    Cols: [
      { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'bsSpaceMngId', Header: [{ Value: '결함 등록', Span: 12 }, { Value: '<span class="emp_red">공간</span>', Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
      { Name: 'mainCodeId', Header: [{ }, { Value: '<span class="emp_red">공종</span>', RowSpan : 2, Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
      { Name: 'midCodeId', Header: [{ }, { Value: '<span class="emp_red">세부공종</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5 },
      { Name: 'subCodeId', Header: [{ }, { Value: '<span class="emp_red">결함공종</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5},
      { Name: 'bsDefectMngId', Header: [{ }, { Value: '<span class="emp_red">결함유형</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5 },
      // { Name: 'case8', Header: [{ }, { Value: '결함내용' }], Required: 1, RelWidth: 5 },
      // { Name: 'case8', Header: [{ }, { Value: '결함내용' }], Format: {"1": "<select class='form_control d-inline-block' style='width:80px'><option value=''>선택</option></select><input type='text' class='form_control d-inline-block ml10' style='width:150px;height:28px' placeholder='입력해주세요'>"}, CanEdit: 0, Required: 1, RelWidth: 16 },
      { Name: 'bsDefectSelet', Header: [{ }, { Value: '<span class="emp_red">결함내용</span>', Span : 2, Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 16 },
      { Name: 'bsDefectConts', Header: [{ }, {}], EmptyValue: '입력하세요.', RelWidth: 16 },
      { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' },], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
      { Name: 'bsInspMtrl', Header: [{}, { Value: '자재' } ], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
      { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' } ], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
      { Name: 'bsFileConnectId', Header: [{ }, { Value: '관련사진' }], Format: {"1": "<button type='button' class='btn_write'>등록</button>", "2": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
      { Name: 'spaceTypeCode', Visible:0},
      { Name: 'bsInsprType', Visible:0},
      { Name: 'bsInsprName', Visible:0},
      { Name: 'standDong', Visible:0},
      { Name: 'addrHo', Visible:0},
      { Name: 'addrFloor', Visible:0},
      { Name: 'bsInspDt', Visible:0},
      { Name: 'bsInsprType', Visible:0},
      { Name: 'bsInsprId', Visible:0},
      { Name: 'bsInsprName', Visible:0},
      { Name: 'bsAsignType', Visible:0},
      { Name: 'tradeId', Visible:0},
      { Name: 'addIndex', Visible:0},
    ]
  },
  data: [
    { isChecked: '', bsSpaceMngId: '1', mainCodeId: '1', midCodeId: '1', subCodeId: '1', bsDefectMngId: '1', bsDefectSelet: '직접입력', bsDefectConts: '직접입력', bsInspEmgc: 'Y', bsInspMtrl: 'Y', bsInspPop: 'Y', bsFileConnectId: '1' },
  ],
}
/* BS점검 > 세대결함 > 결함등록 (팝업) – 단일세대 방식 */
export const WritePublicDefect = {
  options: {
    Cols: [
      // { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'standDong', Header: [{ Value: '결함 등록', Span: 13 }, { Value: '동' }], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
      // { Name: 'addrHo', Header: [{ }, { Value: '호', Type: 'Html'}],  RelWidth: 5 },
      { Name: 'addrFloor', Header: [{ }, { Value: '층', Type: 'Html'}], RelWidth: 5 },
      { Name: 'bsSpaceMngId', Header: [{ }, { Value: '<span class="emp_red">공간</span>', Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
      { Name: 'mainCodeId', Header: [{ }, { Value: '<span class="emp_red">공종</span>', Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
      { Name: 'midCodeId', Header: [{ }, { Value: '<span class="emp_red">세부공종</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5 },
      { Name: 'subCodeId', Header: [{ }, { Value: '<span class="emp_red">결함공종</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5},
      { Name: 'bsDefectMngId', Header: [{ }, { Value: '<span class="emp_red">결함유형</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5 },
      // { Name: 'case8', Header: [{ }, { Value: '결함내용' }], Required: 1, RelWidth: 5 },
      // { Name: 'case8', Header: [{ }, { Value: '결함내용' }], Format: {"1": "<select class='form_control d-inline-block' style='width:80px'><option value=''>선택</option></select><input type='text' class='form_control d-inline-block ml10' style='width:150px;height:28px' placeholder='입력해주세요'>"}, CanEdit: 0, Required: 1, RelWidth: 16 },
      { Name: 'bsDefectSelet', Header: [{ }, { Value: '<span class="emp_red">결함내용</span>', Span : 2, Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 16 },
      { Name: 'bsDefectConts', Header: [{ }, {}], EmptyValue: '입력하세요.', RelWidth: 16 },
      { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' },], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
      { Name: 'bsInspMtrl', Header: [{}, { Value: '자재' } ], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
      { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' } ], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
      { Name: 'bsFileConnectId', Header: [{ }, { Value: '관련사진' }], Format: {"1": "<button type='button' class='btn_write'>등록</button>", "2": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
      { Name: 'spaceTypeCode', Visible:0},
      { Name: 'bsInsprType', Visible:0},
      { Name: 'bsInsprName', Visible:0},
      { Name: 'bsInspDt', Visible:0},
      { Name: 'bsInsprType', Visible:0},
      { Name: 'bsInsprId', Visible:0},
      { Name: 'bsInsprName', Visible:0},
      { Name: 'bsAsignType', Visible:0},
      { Name: 'tradeId', Visible:0},
      { Name: 'addIndex', Visible:0},
    ]
  },
  data: [
    { isCheck: '', standDong: '', addrHo: '', bsSpaceMngId: '1',  mainCodeId: '1', midCodeId: '1', subCodeId: '1', bsDefectMngId: '1', bsDefectSelet: '직접입력', bsDefectConts: '직접입력', bsInspEmgc: 'Y', bsInspMtrl: 'Y', bsInspPop: 'Y', bsFileConnectId: '1' },
  ],
}
/* BS점검 > 세대결함 > 결함상세 (팝업) */
export const DetailDefect = {
  options: {
    Cols: [
      { Name: 'bsSpaceMngName', Header: [{ Value: '결함 상세', Span: 10 }, { Value: '공간' }], CanEdit: 0,  RelWidth: 5 },
      { Name: 'mainName', Header: [{ }, { Value: '공종' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'midName', Header: [{ }, { Value: '세부공종' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'subName', Header: [{ }, { Value: '결함공종' }], CanEdit: 0, RelWidth: 5},
      { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], CanEdit: 0, RelWidth: 16 },
      { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급'}], Type: 'bool', CanEdit: 0, RelWidth: 4 },
      { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' } ], Type: 'bool' , CanEdit: 0, RelWidth: 4 },
      { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' } ], Type: 'bool',  CanEdit: 0, RelWidth: 4 },
      { Name: 'bsDefectRegId', Header: [{ }, { Value: '관련사진' }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
      { Name: 'bsDefectRegId', Visible:0},
    ]
  },
  data: [
    { bsSpaceMngName: '', mainName: '', midName: '', subName: '', defectTypeName: '', bsDefectConts: '', bsDefectConts: '누락되었습니다.', bsInspEmgc: 'Y', bsInspMtrl: 'Y', bsInspPop : 'Y', bsDefectRegId : '' },
  ],
}

/* BS점검 > 세대결함 > 결함상세 > 결함처리 (팝업) */
export const ProcessDefect = {
  options: {
    Cols: [
      { Name: 'bsPrcsOrder', Header: [{ Value: '처리차수' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsAsignYn', Header: [{ Value: '배정상태' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'tradeNm', Header: [{ Value: '협력업체' }], CanEdit: 0, RelWidth: 5},
      // { Name: 'bsAsignDt', Header: [{ Value: '배정일' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsPrcsDt', Header: [{ Value: '처리완료일' }], CanEdit: 0,RelWidth: 16 },
      { Name: 'bsDfpsFileConnectId', Header: [{ Value: '관련사진' }], Format: {"1":"<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
      { Name: 'SEQ', Visible : 0 }
    ]
  },
  data: [
    { bsPrcsOrder: '', bsAsignYn: '', tradeNm: '', bsAsignDt: '', bsPrcsDt: '', bsDfpsFileConnectId: '1' },
  ],
}

/* BS점검 > 세대결함 > 결함상세 > 확인 점검 (팝업) */
export const ConfirmDefect = {
  options: {
    Cols: [
      { Name: 'bsPrcsOrder', Header: [{ Value: '처리차수' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsCnfmTypeCode', Header: [{ Value: '결괴등급' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsCnfmDt', Header: [{ Value: '확인점검일' }], CanEdit: 0, RelWidth: 5},
      { Name: 'bsCnfmConts', Header: [{ Value: '점검내역' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsDfcfFileConnectId', Header: [ { Value: '관련사진' }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
      { Name: 'SEQ', Visible : 0 }
    ]
  },
  data: [
    { bsPrcsOrder: '', bsCnfmTypeCode: '', bsCnfmDt: '건축', bsCnfmConts: '', bsDfcfFileConnectId: '1' },
  ],
}
/* BS점검 > 세대결함 > 결함상세 > 결함처리 (팝업) */
export const ProcessPublicDefect = {
  options: {
    Cols: [
      { Name: 'bsPrcsOrder', Header: [{ Value: '처리차수' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsPrcsDt', Header: [{ Value: '처리완료일' }], CanEdit: 0,RelWidth: 16 },
      { Name: 'bsDfpsFileConnectId', Header: [{ Value: '관련사진' }], Format: {"1":"<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
      { Name: 'SEQ', Visible : 0 }
    ]
  },
  data: [
    { bsPrcsOrder: '', bsAsignYn: '', tradeNm: '', bsAsignDt: '', bsPrcsDt: '', bsDfpsFileConnectId: '1' },
  ],
}

/* BS점검 > 세대결함 > 결함상세 > 확인 점검 (팝업) */
export const ConfirPublicmDefect = {
  options: {
    Cols: [
      { Name: 'bsPrcsOrder', Header: [{ Value: '처리차수' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsCnfmTypeCode', Header: [{ Value: '결괴등급' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsCnfmDt', Header: [{ Value: '확인점검일' }], CanEdit: 0, RelWidth: 5},
      { Name: 'bsCnfmConts', Header: [{ Value: '점검내역' }], CanEdit: 0, RelWidth: 5 },
      { Name: 'bsDfcfFileConnectId', Header: [ { Value: '관련사진' }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
      { Name: 'SEQ', Visible : 0 }
    ]
  },
  data: [
    { bsPrcsOrder: '', bsCnfmTypeCode: '', bsCnfmDt: '건축', bsCnfmConts: '', bsDfcfFileConnectId: '1' },
  ],
}

/*DirectAssignment : BS점검 > BS점검 실시 > 협력업체 배정(반환 및 미배정 결함) */
export const DirectAssignment = {
  options: {
      Cols: [
          { Name: 'tradeNm', Header: [{ Value: ' 협력업체'}], RelWidth: 5, CanEdit : 0 },
        ],
  },
  data: [
    { tradeNm: '협력업체가 없습니다' },
    
  ],
}

export const houseOptnProjectSelect = {
  options: {
    Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 },
        { Name: 'baseType', Header: [{ Value: '본부', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
        { Name: 'csrtTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
        { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
        { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], CanEdit: 0, RelWidth: 15 },
        { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
        { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
        { Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작'}], CanEdit: 0, RelWidth: 10 },
        { Name: 'csrtEndDt', Header: [{}, { Value: '종료' }], CanEdit: 0, RelWidth: 10 },
        { Name: 'csrtMngrNm', Header: [{ Value: '현장소장', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
    ]
  },
  data: [
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303',  case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9:'2021-04-30', case10:'' },
  ],
}


/* =================================================================================================== */

 /* 주간업무보고>보고서 작성>2.품질시험/검측 > 품질시험 */
export const ReportWikStats21 = {
  options: {
      Cfg: {
          CanEdit:0,
          IgnoreFocused : 1
      },
      Cols: [
          { Name: 'testTypeNm', Header: [{ Value: '분류' }], RelWidth: 10, FormulaRow: '전체시험' },
          { Name: 'testCondCnt', Header: [{ Value: '등록' }], Type: 'Int', RelWidth: 10, Format: '##,##0', FormulaRow: 'Sum' },
          { Name: 'testCloseCnt', Header: [{ Value: '완료' }], Type: 'Int', RelWidth: 10, Format: '##,##0', FormulaRow: 'Sum' },
          { Name: 'testOpenCnt', Header: [{ Value: '미완료' }], Visible: 0 },
      ]
  },
  data: [
  ],
}

 /* 주간업무보고>보고서 작성>2.품질시험/검측 > 검측 */
 export const ReportWikStats22 = {
  options: {
      Cfg: {
          CanEdit:0,
          IgnoreFocused : 1
      },
      Cols: [
            { Name: 'mainCodeNm', Header: [{ Value: '분류' }], RelWidth: 10, FormulaRow: '전체시험' },
            { Name: 'inptRsltCnt', Header: [{ Value: '검측 진행 건수' }], Type: 'Int', RelWidth: 10, Format: '##,##0', FormulaRow: 'Sum' },
            { Name: 'inptRsltRate', Header: [{ Value: '진행 비중' }], Type: 'Float', RelWidth: 10, Formula: 'inspRate/100', Format: '##0.## \\%', FormulaRow: 'Sum' },
      ]
  },
  data: [
  ],
}

 /* 주간업무보고>보고서 작성>3.콘크리트/균열 */
 export const ReportWikStats31 = {
  options: {
    Cfg: {
      NoVScroll : false,
      CanEdit:0,
      IgnoreFocused : 1
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 2 },
      { Name: 'concDocSeq', Header: [{ Value: '타설번호' }], RelWidth: 10 },
      { Name: 'concTradeNm', Header: [{ Value: '공급업체' }], RelWidth: 10, Align:'Left' },
      { Name: 'casconcTypeNme3', Header: [{ Value: '콘크리트종류' }], RelWidth: 10, Align:'Left' },
      { Name: 'concPourOption', Header: [{ Value: '타설 옵션' }], RelWidth: 10 },
      { Name: 'structureNm', Header: [{ Value: '구조물' }], RelWidth: 5 },
      { Name: 'pourPart', Header: [{ Value: '타설 부위' }], RelWidth: 5 },
      { Name: 'pourSupply', Header: [{ Value: '타설물량(㎥)' }], RelWidth: 5 },
      { Name: 'pourDay', Header: [{ Value: '타설일' }], RelWidth: 10 },
      ]
  },
  data: [
  ],
}

 /* 주간업무보고>보고서 작성>4.자재관리 > 자재 승인 현황 */
 export const ReportWikStats41 = {
  options: {
    Cfg: {
      DataMerge: 1,
      FixPrevColumnMerge: ['mtrlSpApprId'],
      NoVScroll : false,
      CanEdit:0,
      IgnoreFocused : 1
    },
    Cols: [
      { Name: 'mtrlSpApprId', Header: [{ Value: ''}], RelWidth: 0, Visible: 0 },
      { Name: 'apprResult', Header: [{ Value: '결과' }], RelWidth: 5 },
      { Name: 'mtrlDocSeq', Header: [{ Value: '문서번호' }], RelWidth: 23, Align:'Left' },
      { Name: 'orderType', Header: [{ Value: '발주TYPE' }], ColMerge: false, RelWidth: 5 },
      { Name: 'mainName', Header: [{ Value: '공종' }], ColMerge: false, RelWidth: 5 },
      { Name: 'midName', Header: [{ Value: '세부공종' }], RelWidth: 10, Align:'Left' },
      { Name: 'prdtNm', Header: [{ Value: '품명' }], RelWidth: 10, Align:'Left' },
      { Name: 'prdtDtl', Header: [{ Value: '상세품명' }], ColMerge: false, RelWidth: 10, Align:'Left' },
      { Name: 'stnd', Header: [{ Value: '규격' }], ColMerge: false, RelWidth: 5 },
      { Name: 'spprNm', Header: [{ Value: '공급업체' }], RelWidth: 10, Align:'Left' },
      { Name: 'mnft', Header: [{ Value: '제조업체' }], RelWidth: 10, Align:'Left' },
      { Name: 'regDt', Header: [{ Value: '요청일' }], RelWidth: 7 },
      { Name: 'apprDt', Header: [{ Value: '승인일' }], RelWidth: 7 },
      ]
  },
  data: [
  ],
}

 /* 주간업무보고>보고서 작성>4.자재관리 > 공장검사 현황 */
 export const ReportWikStats42 = {
  options: {
    Cfg: {
      NoVScroll : false,
      CanEdit:0,
      IgnoreFocused : 1
    },
    Cols: [
      { Name: 'ftryDocSeq', Header: [{ Value: '문서번호' }], RelWidth: 18, Align:'Left' },
      { Name: 'mainName', Header: [{ Value: '공종' }], ColMerge: false, RelWidth: 5, Align:'Left' },
      { Name: 'midName', Header: [{ Value: '세부공종' }], RelWidth: 10, Align:'Left' },
      { Name: 'prdtNm', Header: [{ Value: '품명' }], RelWidth: 10, Align:'Left' },
      { Name: 'spprNm', Header: [{ Value: '공급업체' }], RelWidth: 10, Align:'Left' },
      { Name: 'mnft', Header: [{ Value: '제조업체' }], RelWidth: 10, Align:'Left' },
      { Name: 'ftryInspDt', Header: [{ Value: '검사실시일' }], RelWidth: 7 },
      { Name: 'ftryEndDt', Header: [{ Value: '완료일' }], RelWidth: 7 },
      ]
  },
  data: [
  ],
}

/* 주간업무보고>보고서 작성>4.자재관리 > 인수검사 현황 */
export const ReportWikStats43 = {
  options: {
    Cfg: {
      DataMerge: 1,
      FixPrevColumnMerge: 'mtrlAccpTsId',
      NoVScroll : false,
      CanEdit:0,
      IgnoreFocused : 1
    },
    Cols: [
      { Name: 'mtrlAccpTsId', Header: [{ Value: ''}], RelWidth: 0, Visible: 0 },
      { Name: 'apprJdmtNm', Header: [{ Value: '결과' }], RelWidth: 5 },
      { Name: 'accpDocSeq', Header: [{ Value: '문서번호' }], RelWidth: 20, Align:'Left' },
      { Name: 'mainName', Header: [{ Value: '공종' }], ColMerge: false, RelWidth: 5, Align:'Left' },
      { Name: 'midName', Header: [{ Value: '세부공종' }], RelWidth: 10, Align:'Left' },
      { Name: 'prdtNm', Header: [{ Value: '품명' }], RelWidth: 10, Align:'Left' },
      { Name: 'prdtDtl', Header: [{ Value: '상세품명' }], RelWidth: 10, Align:'Left' },
      { Name: 'mtrlMainNm', Header: [{ Value: '자재TYPE' }], RelWidth: 10 },
      { Name: 'spprNm', Header: [{ Value: '공급업체' }], RelWidth: 10, Align:'Left' },
      { Name: 'mnft', Header: [{ Value: '제조업체' }], RelWidth: 10, Align:'Left' },
      { Name: 'stnd', Header: [{ Value: '규격' }], ColMerge: false, RelWidth: 5 },
      { Name: 'designAmt', Header: [{ Value: '설계량' }], ColMerge: false, RelWidth: 5 },
      { Name: 'total', Header: [{ Value: '누계' }], ColMerge: false, RelWidth: 5 },
      { Name: 'brAmt', Header: [{ Value: '반입량' }], ColMerge: false, RelWidth: 5 },
      { Name: 'rjtAmt', Header: [{ Value: '불합격량' }], ColMerge: false, RelWidth: 5 },
      { Name: 'accpInspDt', Header: [{ Value: '검사 실시일' }], RelWidth: 7 },
      { Name: 'accpEndDt', Header: [{ Value: '완료일' }], RelWidth: 7 },
      ]
  },
  data: [
  ],
}

 /* 주간업무보고>보고서 작성>5.교육관리 > HEC/협력사 교육 이수 현황 */
 export const ReportWikStats51 = {
  options: {
    Cfg: {
      NoVScroll : false,
      CanEdit:0,
      IgnoreFocused : 1
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5 },
      { Name: 'gjName', Header: [{ Value: '공종' }], RelWidth: 5, Align:'Left' },
      { Name: 'kindName', Header: [{ Value: '종류' }], RelWidth: 10, Align:'Left' },
      { Name: 'targetTypeName', Header: [{ Value: '대상' }], RelWidth: 10 },
      { Name: 'eduTypeName', Header: [{ Value: '구분' }], RelWidth: 10 },
      { Name: 'eduCourseName', Header: [{ Value: '교육 과정 명' }], RelWidth: 10, Align:'Left' },
      { Name: 'eduAtdrnNum', Header: [{ Value: '참석자 수' }], RelWidth: 5 },
      { Name: 'eduTcher', Header: [{ Value: '강사' }], RelWidth: 10 },
      { Name: 'eduInspDt', Header: [{ Value: '교육 실시일자' }], RelWidth: 15 },
      ]
  },
  data: [
  ],
}

 /* 주간업무보고>보고서 작성>5.교육관리 > 작업자 동영상 교육 */
 export const ReportWikStats52 = {
  options: {
    Cfg: {
      NoVScroll : false,
      CanEdit:0,
      IgnoreFocused : 1
    },
    Cols: [
      { Name: 'eduCmptDate', Header: [{ Value: '일자' }], RelWidth: 10 },
      { Name: 'partnrName', Header: [{ Value: '협력업체' }], RelWidth: 10, Align:'Left' },
      { Name: 'cmptCnt', Header: [{ Value: '교육 이수자 수' }], RelWidth: 10 },
      ]
  },
  data: [
  ],
}

 /* 주간업무보고>보고서 작성>6.대외/자체점검 > 대외점검 */
 export const ReportWikStats61 = { 
  options: {
    Cfg: {
      CanEdit: false,
      NoVScroll: false,
      IgnoreFocused : 1
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 2 },
      { Name: 'chckKndNm', Header: [{ Value: '점검 종류', RowSpan: 2 }], RelWidth: 7 },
      { Name: 'extrnlInsttNm', Header: [{ Value: '점검 기관', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'chckde', Header: [{ Value: '점검일', RowSpan: 2 }], RelWidth: 8 },

      { Name: 'insctrNm', Header: [{ Value: '점검 결과', Span: 6 }, { Value: '점검자' }], RelWidth: 3 },
      { Name: 'poutMatterTypeNm', Header: [{}, { Value: '분야' }], RelWidth: 9 },
      { Name: 'cntrwkKndNm', Header: [{}, { Value: '대상 공종' }], RelWidth: 4 },
      { Name: 'title', Header: [{}, { Value: '제목' }], RelWidth: 10 },
      { Name: 'chckPoutMatterCn', Header: [{}, { Value: '내용' }], RelWidth: 10 },
      { Name: 'cnfrmnWritngYn', Header: [{}, { Value: '확인서' }], RelWidth: 2 },

      { Name: 'poutTypeNm', Header: [{ Value: '확정 공문', Span: 5 }, { Value: '지적 유형' }], RelWidth: 4 },
      { Name: 'dcsnDocDem', Header: [{}, { Value: '벌점' }], RelWidth: 2 },
      { Name: 'dcsnDocRecptnDe', Header: [{}, { Value: '확정일' }], RelWidth: 4 },
      { Name: 'dcsnResultManagtTrgetNm', Header: [{}, { Value: '조치 대상' }], RelWidth: 3 },
      { Name: 'dcsnResultManagtCn', Header: [{}, { Value: '조치 내용' }], RelWidth: 10 },

      { Name: 'demDcsnYn', Header: [{ Value: '최종 벌점', Span: 2 }, { Value: '확정 여부' }], RelWidth: 2 },
      { Name: 'lastDem', Header: [{}, { Value: '확정 벌점' }], RelWidth: 2 },
    ]
  },
  data: [
  ],
}

 /* 주간업무보고>보고서 작성>6.대외/자체점검 > 자체품질점검 실시 내용 */
export const ReportWikStats62 = {
  options: {
    Cfg: {
      NoVScroll : false,
      CanEdit:0,
      IgnoreFocused : 1
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5 },
      { Name: 'selfQltyTypeNm', Header: [{ Value: '점검 유형' }], RelWidth: 10 },
      { Name: 'tradeNm', Header: [{ Value: '협력업체' }], RelWidth: 10 },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 20, Align:'Left' },
      { Name: 'inDttmDt', Header: [{ Value: '등록일' }], RelWidth: 10 },
      { Name: 'chkReqDt', Header: [{ Value: '점검완료 요청일' }], RelWidth: 10 },
      { Name: 'chkDt', Header: [{ Value: '점검일' }], RelWidth: 10 },
      { Name: 'rplDt', Header: [{ Value: '회신일' }], RelWidth: 10 },
      ]
  },
  data: [
  ],
}