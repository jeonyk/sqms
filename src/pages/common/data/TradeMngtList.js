/* ------------------------------------------- */
/* 협력사 관리                                   */
/* ------------------------------------------- */

/* 협력사 */
/* UserDataSheet : My Work > 협력사 관리 > 협력사  */
export const Partners = {
  options: {
      Cols: [
          // { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5, CanEdit: 0  },
          { Name: 'tradeTypeNm', Header: [{ Value: '유형' }], RelWidth: 10, CanEdit: 0 },
          { Name: 'tradeId', Header: [{ Value: '협력사ID(사업자 번호)' }], RelWidth: 10, CanEdit: 0,},
          { Name: 'tradeNm', Header: [{ Value: '협력사명' }], RelWidth: 10, CanEdit: 0 },
          { Name: 'createSys', Header: [{ Value: '등록시스템' }], RelWidth: 10, CanEdit: 0 },
          { Name: 'regDate', Header: [{ Value: '등록일자' }], RelWidth: 10, CanEdit: 0 },
      ]
  },
  data: [
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
      { case1: '', case2: '품질시험기관', case3: '112-11-113322', case4: '건설사업단', case5: 'NHSE', case6: 'YYYY-MM-DD', case7: '사용',},
  ]
}

/* 협력사 직원 */
/* UserDataSheet : My Work > 협력사 관리 > 협력사 직원 */
export const PartnersEmployee = {
  options: {
      Cols: [
          { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center',  }], Type: 'Bool', CanSort: 0, RelWidth: 3 },
          { Name: 'projNm', Header: [{ Value: '프로젝트명' }], RelWidth: 10, CanEdit: 0 },
          { Name: 'tradeTypeNm', Header: [{ Value: '협력사 유형' }], RelWidth: 5, CanEdit: 0 },
          { Name: 'tradeNm', Header: [{ Value: '협력사명' }], RelWidth: 7, CanEdit: 0 },
          { Name: 'userId', Header: [{ Value: '사용자ID' }], RelWidth: 6, CanEdit: 0 },
          { Name: 'userNm', Header: [{ Value: '사용자명' }], RelWidth: 5, CanEdit: 0 },
          { Name: 'jobTitle', Header: [{ Value: '호칭' }], RelWidth: 5, CanEdit: 1 },
          { Name: 'jobRoleNm', Header: [{ Value: '직책명' }], RelWidth: 5, CanEdit: 1 },
          { Name: 'email', Header: [{ Value: '이메일' }], RelWidth: 10, CanEdit: 1 },
          { Name: 'hp', Header: [{ Value: '핸드폰' }],Type: "Text" , CustomFormat: (v) => { return v.length > 3 ? v.substring(0,3)+'-****-'+v.substring(7,v.length) : v}, RelWidth: 6, CanEdit: 1 ,Size: 11,},
          // { Name: 'pwChgDate', Header: [{ Value: '비밀번호 \n 변경일자' }], RelWidth: 5, CanEdit: 0 ,Type: 'Date', "Format": "yyyy-MM-dd"},
          { Name: 'finalLoginDttm', Header: [{ Value: '최종 로그인' }], RelWidth: 5, CanEdit: 0 ,},
          // { Name: 'lockYn', Header: [{ Value: '로그인잠금' }], 'Format': {'Y' : '잠김', 'N' : ''} , RelWidth: 4, CanEdit: 0 },
          { Name: 'loginFailCnt', Header: [{ Value: '비밀번호 \n 실패' }], RelWidth: 4, CanEdit: 0 },
          { Name: 'dormantYn', Header: [{ Value: '휴면 여부' }], 'Format': {'Y' : '휴면', 'N' : ''}, RelWidth: 4, CanEdit: 0 },
          { Name: 'disableYn', Header: [{ Value: '비활성화' }],'Format': {'Y' : '비활성화', 'N' : ''}, RelWidth: 4, CanEdit: 0 },
          { Name: 'regDate', Header: [{ Value: '사용자 \n 등록일시' }], RelWidth: 5, CanEdit: 0 },
          { Name: 'useStartDt', Header: [{ Value: '시작일' }],Type: 'Date', "Format": "yyyy-MM-dd", "DataFormat": "yyyyMMdd", "EditFormat": "yyyyMMdd", RelWidth: 6.5, CanEdit: 1},
          { Name: 'useEndDt', Header: [{ Value: '종료일' }],Type: 'Date', "Format": "yyyy-MM-dd", "DataFormat": "yyyyMMdd", "EditFormat": "yyyyMMdd", RelWidth: 6.5, CanEdit: 1},
          { Name: 'groupAuthNm', Header: [{ Value: '권한그룹', Span:2 }], ColMerge: 1, RelWidth: 5, CanEdit: 0 },
          { Name: 'authIcon', Header: [{  }], ColMerge: 1, 'Format': {'Y' : "<button type='button' class='btn_set'>설정</button>"}, RelWidth: 5, CanEdit: 0},
          { Name: 'siteMstrCnt', Header: [{ Value: '프로젝트', Span: 2 }],ColMerge: 1,RelWidth: 5 , CanEdit: 0},
          { Name: 'projectIcon', Header: [{ }], ColMerge: 1, 'Format': {'Y' : "<button type='button' class='btn_set'>설정</button>"}, RelWidth: 5, CanEdit: 0},
      ]
  },
  data: [
        { case1: '', case2: '품질시험기관', case3: 'OO시험', case4: '2117900', case5: '홍길동', case6: '홍대표', case7: '사장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'잠김', case14:'휴면', case15:'비활성화', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
        {case1: '', case2: 'BS점검', case3: 'OO점검', case4: '2117900', case5: '홍길동', case6: '임부장', case7: '부장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'-', case14:'휴면', case15:'비활성화', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
        {case1: '', case2: '감리단', case3: '건설사업단', case4: '2117900', case5: '김철수', case6: '책임', case7: '차장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'-', case14:'휴면', case15:'비활성화', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
        { case1: '', case2: '품질시험기관', case3: 'OO시험', case4: '2117900', case5: '홍길동', case6: '홍대표', case7: '사장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'잠김', case14:'휴면', case15:'비활성화', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
        {case1: '', case2: 'BS점검', case3: 'OO점검', case4: '2117900', case5: '홍길동', case6: '임부장', case7: '부장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'-', case14:'휴면', case15:'비활성화', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
        {case1: '', case2: '감리단', case3: '건설사업단', case4: '2117900', case5: '김철수', case6: '책임', case7: '차장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'-', case14:'휴면', case15:'비활성화', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
        { case1: '', case2: '품질시험기관', case3: 'OO시험', case4: '2117900', case5: '홍길동', case6: '홍대표', case7: '사장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'잠김', case14:'-', case15:'비활성화', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
        {case1: '', case2: 'BS점검', case3: 'OO점검', case4: '2117900', case5: '홍길동', case6: '임부장', case7: '부장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'-', case14:'-', case15:'-', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
        {case1: '', case2: '감리단', case3: '건설사업단', case4: '2117900', case5: '김철수', case6: '책임', case7: '차장',case8: '', case9: 'abcd@partner.com', case10:'010-3000-4000', case11:'2022-00-00', case12:'2022-11-11 00:00:00', case13:'-', case14:'휴면', case15:'-', case16:'NESE', case17:'2022-00-00 00:00:00', case18:'1', case19:'0', case20:'기본권한',  case21:'0'},
  ]
}

/* 프로젝트 매핑 - 협력사 */
/* UserDataSheet : My Work > 협력사 관리 > 프로젝트 매핑 - 협력사 */
export const  ProjectPartners = {
  options: {
    Cols: [
      { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1 ,CanEdit: 0},
      { Name: 'userId', Header: [{ Value: '사번' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'userNm', Header: [{ Value: '사용자명' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'jobTitle', Header: [{ Value: '직급(직책)' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'tradeId', Header: [{ Value: '부서코드' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'tradeNm', Header: [{ Value: '부서명' }], RelWidth: 3, CanEdit: 0 },
      // { Name: 'email', Header: [{ Value: '이메일' }], RelWidth: 3, CanEdit: 0 },
      // { Name: 'hp', Header: [{ Value: '휴대폰' }], RelWidth: 3, CanEdit: 0 },
      // { Name: 'groupAuthNm', Header: [{ Value: '권한그룹' }], RelWidth: 3, CanEdit: 0 },
    ]
  },
  data: [
    { case1: '1', case2: '품질시험기관', case3: '112-11-113321', case4: 'OO시험', case5:'사용' },
  ],
}

/* 프로젝트 매핑 - 매핑된 프로젝트 */
/* UserDataSheet : My Work > 협력사 관리 > 프로젝트 매핑 - 매핑된 프로젝트 */
export const  ProjectMapping = {
  options: {
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호'}], RelWidth: 5, CanEdit: 0 },
      { Name: 'baseTypeNm', Header: [{ Value: '본부' }], RelWidth: 10, CanEdit: 0 },
      { Name: 'csrtTypeNm', Header: [{ Value: '공사유형'}], RelWidth: 10, CanEdit: 0 },
      { Name: 'projectId', Header: [{ Value: '프로젝트코드'}], RelWidth: 20, CanEdit: 0 },
      { Name: 'projectNm', Header: [{ Value: '프로젝트명'}], RelWidth: 20, CanEdit: 0,},
    ]
  },
  data: [
    { case1: '', case2: '건축', case3: '공장', case4: 'CUKR1303', case5:'고양 덕은 복합시설 공사' },
  ],
}