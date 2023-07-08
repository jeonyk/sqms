/* ------------------------------------------- */
/* 사용자관리                                   */
/* ------------------------------------------- */

/* 사용자 */
/* UserDataSheet : My Work > 사용자관리 > 사용자  */
export const UserDataSheet = {
  options: {
    Cfg : {
      NoVScroll: false,
    },
    Cols : [
        { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1 },
        { Name: 'userId', Header: [{ Value: '사번' }], RelWidth: 3, CanEdit: 0 },
        { Name: 'userNm', Header: [{ Value: '사용자명' }], RelWidth: 3, CanEdit: 0 },
        { Name: 'jobTitle', Header: [{ Value: '직급(직책)' }], RelWidth: 3, CanEdit: 0 },
        { Name: 'workLocCd', Header: [{ Value: '부서코드' }], RelWidth: 3, CanEdit: 0 },
        { Name: 'workLocNm', Header: [{ Value: '부서명' }], RelWidth: 3, CanEdit: 0 },
        { Name: 'email', Header: [{ Value: '이메일' }], RelWidth: 3, CanEdit: 0 },
        { Name: 'hp', Header: [{ Value: '휴대폰' }], RelWidth: 3, CanEdit: 0 , CustomFormat: (v) => { return v == null ? '' : v.length < 4 ? v : v.length < 7 ? v.substring(0,3)+'-****' : v.substring(0,3)+'-****-'+v.substring(7,v.length) }},
        { Name: 'finalLoginDttm', Header: [{ Value: '최종 로그인' }], RelWidth: 3, CanEdit: 0 ,},
        { Name: 'loginFailCnt', Header: [{ Value: '비밀번호 \n 실패' }], RelWidth: 1, CanEdit: 0 },
        { Name: 'dormantYn', Header: [{ Value: '휴면 여부' }], 'Format': {'Y' : '휴면', 'N' : ''}, RelWidth: 1, CanEdit: 0 },
        { Name: 'disableYn', Header: [{ Value: '비활성화' }],'Format': {'Y' : '비활성화', 'N' : ''}, RelWidth: 1, CanEdit: 0 },
        { Name: 'groupAuthNm', Header: [{ Value: '권한그룹' }], RelWidth: 3, CanEdit: 0 },
        { Name: 'admUserMngtId', Visible: '0', CanEdit: 0 },
        { Name: 'groupAuthDtlId', Visible: '0', CanEdit: 0 },
      ]
  },
  data: [],
}

/* ProjectMapping: ADMIN_USER_MENU_001 프로젝트매핑> 프로젝트 */
export const PrjctMapng = {
  options: {
    Cfg : {
      NoVScroll: false,
      CanEdit: 0,
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 4 },
      { Name: 'baseTypeName', Header: [{ Value: '본부' }], RelWidth: 10 },
      { Name: 'csrtTypeNm', Header: [{ Value: '공사유형' }], RelWidth: 10 },
      { Name: 'projectId', Header: [{ Value: '프로젝트 코드' }], RelWidth: 10 },
      { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], Align:"Left", RelWidth: 20 },
      { Name: 'siteId', Visible: '0', CanEdit: 0 },
      { Name: 'baseType', Visible : false },
    ]
  },
  data: [
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
    // { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
  ],
}

/* ProjectMappingUser: ADMIN_USER_MENU_001 프로젝트매핑> 프로젝트 사용자*/
export const PrjctMapngUser = {
  options: {
    Cfg : {
      NoVScroll: false,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5  },
      { Name: 'userId', Header: [{ Value: '사번' }], RelWidth: 10, CanEdit: 0 },
      { Name: 'userNm', Header: [{ Value: '사용자명' }], RelWidth: 10, CanEdit: 0 },
      { Name: 'jobTitle', Header: [{ Value: '직급(직책)' }], RelWidth: 10, CanEdit: 0 },
      { Name: 'workLocCd', Header: [{ Value: '부서코드' }], RelWidth: 10, CanEdit: 0 },
      { Name: 'workLocNm', Header: [{ Value: '부서명' }], RelWidth: 20, CanEdit: 0 },
      { Name: 'admSiteMapId', Visible : false },
      { Name: 'siteMstrId', Visible : false },
      { Name: 'delPosblYn', Visible : false },
    ]
  },
  data: [
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
    // { case1: '', case2: '211***1', case3: '김현대', case4: '매니저', case5: 'WA793434' , case6: '품질경영팀' },
  ],
}

export const EmployeeSearch = {
  options: {
    Cfg : {
      NoVScroll: false,
      CanEdit: 0,
    },
    Cols: [
        { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 10 },
        { Name: 'case2', Header: [{ Value: '사원번호' }], RelWidth: 20 },
        { Name: 'case3', Header: [{ Value: '사원명' }], RelWidth: 10 },
        { Name: 'case4', Header: [{ Value: '직급' }], RelWidth: 30 },
        { Name: 'case5', Header: [{ Value: '근무지명(현장명)' }], RelWidth: 30 },
    ]
  },
  data: [
      // { case1: '1', case2: '202032315', case3: '이현대', case4: '매니저', case5: '고양 덕은 복합시설 공사'},
      // { case1: '2', case2: '202032315', case3: '이현대', case4: '책임 매니저', case5: '고양 덕은 복합시설 공사'},
      // { case1: '3', case2: '202032315', case3: '이현대', case4: '책임 매니저', case5: '고양 덕은 복합시설 공사'},
  ],
}
  export const BatchList = {
    options: {
      Cfg : {
        NoVScroll: false,
      },
      Cols : [
          { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 4 },
          { Name: 'batchName', Header: [{ Value: '배치명' }], RelWidth: 3},
          { Name: 'cronExpression', Header: [{ Value: '주기'}], RelWidth: 3},
          { Name: 'lastExecDttm', Header: [{ Value: '최근 실행 일시' }], RelWidth: 3, CanEdit: 0 },
          { Name: 'status', Header: [{ Value: '상태' }], RelWidth: 3, CanEdit: 0 },
          { Name: 'execution', Header: [{ Value: '실행' }], RelWidth: 1, CanEdit: 0, Format: {"0": "<button type='button' class='btn_add'>실행</button>"}},
          { Name: 'inDttm', Header: [{ Value: '등록일시' }], RelWidth: 3, CanEdit: 0 },
          { Name: 'upDttm', Header: [{ Value: '수정일시' }], RelWidth: 3, CanEdit: 0 },
          { Name: 'schedulerId', Visible : false},
        ]
    },
    data: [],
}

export const LoginHistory = {
  options: {
    Cfg : {
      NoVScroll: false,
      CanEdit: 0,
    },
    Cols: [
        { Name: 'SEQ', Header: [{ Value: 'No' }], RelWidth: 10 },
        { Name: 'loginDttm', Header: [{ Value: '로그인 일시' }], RelWidth: 20 },
        { Name: 'userType', Header: [{ Value: '구분' }], RelWidth: 10 },
        { Name: 'userId', Header: [{ Value: 'ID' }], RelWidth: 30 },
        { Name: 'userNm', Header: [{ Value: '이름' }], RelWidth: 30 },
        { Name: 'loginIp', Header: [{ Value: '로그인 IP' }], RelWidth: 30 },
        { Name: 'userPath', Header: [{ Value: '로그인 위치' }], RelWidth: 30 },
    ]
  },
  data: [
      // { case1: '1', case2: '202032315', case3: '이현대', case4: '매니저', case5: '고양 덕은 복합시설 공사'},
      // { case1: '2', case2: '202032315', case3: '이현대', case4: '책임 매니저', case5: '고양 덕은 복합시설 공사'},
      // { case1: '3', case2: '202032315', case3: '이현대', case4: '책임 매니저', case5: '고양 덕은 복합시설 공사'},
  ],
}

export const OzdocType = {
  options: {
    Cfg : {
      NoVScroll: false,
      // CanEdit: 0,
    },
    Cols: [
        { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool',CanEdit: 1, CanSort: 0, RelWidth: 1 },
        { Name: 'menuNm', Header: [{ Value: '메뉴명', RowSpan: 6}], CanEdit: false, RelWidth: 6, Type: 'Enum', Enum: '' },
        // { Name: 'menuNm', Header: [{ Value: '메뉴명' }], RelWidth: 6 ,CanEdit: 0},
        { Name: 'btnNm', Header: [{ Value: '버튼명' }], RelWidth: 6 ,CanEdit: 0},
        { Name: 'docNm', Header: [{ Value: '문서명' }], RelWidth: 6 ,CanEdit: 0},
        { Name: 'type', Header: [{ Value: 'TYPE명' }], RelWidth: 6 ,CanEdit: 0},
        { Name: 'jspNm', Header: [{ Value: 'JSP 파일명' }], RelWidth: 6 ,CanEdit: 0},
        { Name: 'ozrNm', Header: [{ Value: 'OZR 파일명' }], RelWidth: 6 ,CanEdit: 0},
        { Name: 'fileYn', Header: [{ Value: '샘플사진' }], RelWidth: 2, CanEdit: 0, Format: {"0": "<button type='button' class='btn_add'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}},
        { Name: 'regDttm', Header: [{ Value: '등록일시' }], RelWidth: 3 ,CanEdit: 0, },
    ]
  },
  data: [],
}

export const OzdocTypeSiteSetUp = {
  options: {
    Cfg : {
      NoVScroll: false,
      // CanEdit: 0,
    },
    Cols: [
        { Name: 'menuNm', Header: [{ Value: '메뉴명' }], RelWidth: 6 ,CanEdit: 0,},
        { Name: 'btnNm', Header: [{ Value: '버튼명' }], RelWidth: 6 ,CanEdit: 0,},
        { Name: 'docNm', Header: [{ Value: '문서명' }], RelWidth: 6 ,CanEdit: 0, },
        { Name: 'type', Header: [{ Value: 'TYPE' }], RelWidth: 6 ,CanEdit: 1 , Type : 'Enum'}, 
        { Name: 'fileYn', Header: [{ Value: '샘플사진' }], RelWidth: 2, CanEdit: 0, Format: {"0": "-","1": "<button type='button' class='btn_view'>보기</button>"}},
    ]
  },
  data: [],
}
