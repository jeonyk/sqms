/* 현장정보 및 QA */
/* 
  LocusInfo: SQMS_WS01_001_01 현장정보 및 QA > 현장정보(내현장) 
  QualityAdmin: SQMS_WS01_002_01 현장정보 및 QA > 품질관리자(My Site)
  QualityAdmin: SQMS_WS01_002_01 현장정보 및 QA > 품질관리자(All Sites)
  QualityState: SQMS_WS01_003_01  현장정보 및 QA > 현장품질방침/목표(All Sites)
  HoldOption: SQMS_WS01_006 세대옵션>세대정보(My Site)
  HoldOption2: SQMS_WS01_006 세대옵션>입면도(My Site)

  SystemAdmin: SQMS_WS01_004 현장정보 및 QA > 품질시스템 관리(My Site) - 건설공사 품질관리 업무지침
  SystemAdmin2: SQMS_WS01_004 현장정보 및 QA > 품질시스템 관리(My Site) - 관련문서 Upload
*/

// import { CommonSet_CanEdit } from './ibsheet-setoption' 

/* LocusInfo: SQMS_WS01_001_01 현장정보 및 QA > 현장정보(내현장) */
export const LocusInfo = {
  options: {
    Cfg:{
      NoVScroll: false,
    },
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'case2', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'case3', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'case4', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case5', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case6', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case7', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case8', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작' }], RelWidth: 8 },
      { Name: 'case9', Header: [{}, { Value: '종료' }], RelWidth: 8 },
      { Name: 'case10', Header: [{ Value: '현장소장', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'case11', Header: [{ Value: '현장등급', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'case12', Header: [{ Value: '품질관리자 현황', Span: 4 }, { Value: '특급' }], RelWidth: 5 },
      { Name: 'case13', Header: [{}, { Value: '고급' }], RelWidth: 5 },
      { Name: 'case14', Header: [{}, { Value: '중급' }], RelWidth: 5 },
      { Name: 'case15', Header: [{}, { Value: '초급' }], RelWidth: 5 },

    ]
  },
  data: [
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장', case11: '특급', case12:'1', case13:'1', case14:'1', case15:'1' },
    { case1: '2', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장', case11: '특급', case12:'1', case13:'1', case14:'1', case15:'1' },
    { case1: '3', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장', case11: '특급', case12:'1', case13:'1', case14:'1', case15:'1' },
    { case1: '4', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장', case11: '특급', case12:'1', case13:'1', case14:'1', case15:'1' },
    { case1: '5', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장', case11: '특급', case12:'1', case13:'1', case14:'1', case15:'1' },
  ],
}

/* QualityAdmin: SQMS_WS01_002_01 현장정보 및 QA > 품질관리자(My Site) */
export const QualityAdmin = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
      { Name: 'case2', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'case3', Header: [{ Value: '성명', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case4', Header: [{ Value: '직급', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case5', Header: [{ Value: '등급', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case6', Header: [{ Value: '법정 교육 이수', RowSpan: 2 }], RelWidth: 16 },
      { Name: 'case7', Header: [{ Value: '배치일자', Span: 2 }, { Value: '실제 배치일' }], RelWidth: 10 },
      { Name: 'case8', Header: [{}, { Value: '배치/변경 신고일 \n (인∙허가 기관)' }], RelWidth: 10 },
      { Name: 'case9', Header: [{ Value: '비고', RowSpan: 2 }], RelWidth: 16 },
      { Name: 'case10', Header: [{ Value: '첨부파일', RowSpan: 2 }], RelWidth: 10 },

    ]
  },
  data: [
    { case1: '', case2: '1', case3: '이현대', case4: '책임 매니저', case5: '특급', case6: '이수 완료', case7: '2021-04-30', case8:'2021-04-30', case9: '', case10: '' },
    { case1: '', case2: '2', case3: '이현대', case4: '책임 매니저', case5: '특급', case6: '이수 완료', case7: '2021-04-30', case8:'2021-04-30', case9: '', case10: '' },
    { case1: '', case2: '3', case3: '이현대', case4: '책임 매니저', case5: '특급', case6: '이수 완료', case7: '2021-04-30', case8:'2021-04-30', case9: '', case10: '' },
    { case1: '', case2: '4', case3: '이현대', case4: '책임 매니저', case5: '특급', case6: '이수 완료', case7: '2021-04-30', case8:'2021-04-30', case9: '', case10: '' },
  ],
}

/* QualityAdmin: SQMS_WS01_002_01 현장정보 및 QA > 품질관리자(All Sites) */
export const QualityAdmin2 = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'case2', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 16 },
      { Name: 'case3', Header: [{ Value: '성명', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case4', Header: [{ Value: '직급', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case5', Header: [{ Value: '등급', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case6', Header: [{ Value: '법정 교육 이수', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case7', Header: [{ Value: '배치일자', Span: 2 }, { Value: '실제 배치일' }], RelWidth: 10 },
      { Name: 'case8', Header: [{}, { Value: '배치/변경 신고일 \n (인∙허가 기관)' }], RelWidth: 10 },
      { Name: 'case9', Header: [{ Value: '비고', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case10', Header: [{ Value: '첨부파일', RowSpan: 2 }], RelWidth: 10 },

    ]
  },
  data: [
    { case1: '1', case2: '고양 덕은 복합시설 공사', case3: '이현대', case4: '책임 매니저', case5: '특급', case6: '이수 완료', case7:'2021-04-30', case8: '2021-04-30', case9: '', case10: '' },
    { case1: '2', case2: '고양 덕은 복합시설 공사', case3: '이현대', case4: '책임 매니저', case5: '특급', case6: '이수 완료', case7:'2021-04-30', case8: '2021-04-30', case9: '', case10: '' },
    { case1: '3', case2: '고양 덕은 복합시설 공사', case3: '이현대', case4: '책임 매니저', case5: '특급', case6: '이수 완료', case7:'2021-04-30', case8: '2021-04-30', case9: '', case10: '' },
    { case1: '4', case2: '고양 덕은 복합시설 공사', case3: '이현대', case4: '책임 매니저', case5: '특급', case6: '이수 완료', case7:'2021-04-30', case8: '2021-04-30', case9: '', case10: '' },
  ],
}

/* QualityState: SQMS_WS01_003_01  현장정보 및 QA > 현장품질방침/목표(All Sites) */
export const QualityState = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'case2', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case3', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case4', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case5', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 15 },
      { Name: 'case6', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case7', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 15 },
      { Name: 'case8', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작' }], RelWidth: 10 },
      { Name: 'case9', Header: [{}, { Value: '종료' }], RelWidth: 10 },
      { Name: 'case10', Header: [{ Value: '현장소장', RowSpan: 2 }], RelWidth: 10 },
    ]
  },
  data: [
    { case1: '1', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장' },
    { case1: '2', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장' },
    { case1: '3', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장' },
    { case1: '4', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장' },
    { case1: '5', case2: '건축', case3: '공장', case4: 'CUKR1303', case5: '고양 덕은 복합시설 공사', case6: 'WAMCQ16668', case7: '고양 덕은 복합시설 공사', case8:'2021-04-30', case9: '2021-04-30', case10: '김현대 소장' },
  ],
}

/* HoldOption: SQMS_WS01_006 세대옵션>세대정보(My Site) */
export const HoldOption = {
  options: {
    Cfg:{
      NoDataMessage : 3,
      NoVScroll: false,
    },
    Cols: [
      // { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 1 },
      { Name: 'linkYn', Header: [{ Value: '연동유무' }], RelWidth: 2, CanEdit : 0 },
      { Name: 'standDong', Header: [{ Value: '동' }],Type : 'Float', Format : '####', RelWidth: 2, CanEdit : 0 },
      { Name: 'addrHo', Header: [{ Value: '호수' }],Type : 'Float', Format : '####', RelWidth: 2, CanEdit : 0 },
      { Name: 'addrFloor', Header: [{ Value: '층' }], RelWidth: 2, CanEdit : 0 },
      { Name: 'noSize', Header: [{ Value: '평형정보' }], RelWidth: 2, CanEdit : 0 },
      { Name: 'remark', Header: [{ Value: '추가정보' }], RelWidth: 10 },
      { Name: 'siteMstrId', Header: [{ Value: '현장정보ID' }], Visible: 0},
      { Name: 'standHo', Header: [{ Value: '호' }], Visible: 0},
    ]
  },
  data: [
    { case1: '', case2: '연동', case3: '101동', case4: '101호', case5: '1', case6: '2', case7: '59 Type', case8:'58.6605', case9: '1', case10: '2020-01-30', case11: '' },
    { case1: '', case2: '미연동', case3: '101동', case4: '101호', case5: '1', case6: '2', case7: '59 Type', case8:'58.6605', case9: '-', case10: '2020-01-30', case11: '' },
    { case1: '', case2: '미연동', case3: '101동', case4: '101호', case5: '1', case6: '2', case7: '59 Type', case8:'58.6605', case9: '-', case10: '2020-01-30', case11: '' },
  ],
}
export const HoldOptionAllSite = {
  options: {
    Cfg:{
      NoDataMessage : 3,
      NoVScroll: false,
    },
    Cols: [
      // { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 2 },
      { Name: 'linkYn', Header: [{ Value: '연동유무' }], RelWidth: 12, CanEdit : 0 },
      { Name: 'standDong', Header: [{ Value: '동' }],Type : 'Float', Format : '####', RelWidth: 4, CanEdit : 0 },
      { Name: 'addrHo', Header: [{ Value: '호수' }],Type : 'Float', Format : '####', RelWidth: 4, CanEdit : 0 },
      { Name: 'addrFloor', Header: [{ Value: '층' }], RelWidth: 4, CanEdit : 0 },
      { Name: 'noSize', Header: [{ Value: '평형정보' }], RelWidth: 10, CanEdit : 0 },
      { Name: 'remark', Header: [{ Value: '추가정보' }], RelWidth: 10, CanEdit : 0 },
      { Name: 'standHo', Visible: 0},
    ]
  },
  data: [
    { case1: '', case2: '연동', case3: '101동', case4: '101호', case5: '1', case6: '2', case7: '59 Type', case8:'58.6605', case9: '1', case10: '2020-01-30', case11: '' },
    { case1: '', case2: '미연동', case3: '101동', case4: '101호', case5: '1', case6: '2', case7: '59 Type', case8:'58.6605', case9: '-', case10: '2020-01-30', case11: '' },
    { case1: '', case2: '미연동', case3: '101동', case4: '101호', case5: '1', case6: '2', case7: '59 Type', case8:'58.6605', case9: '-', case10: '2020-01-30', case11: '' },
  ],
}

/* HoldOption2: SQMS_WS01_006 세대옵션>입면도(My Site) */
export const HoldOption2 = {
  options: {
    Cfg:{
      NoDataMessage : 3,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], ColMerge: 1, RelWidth: 10, CanEdit : 0 },
      { Name: 'dsItem', Header: [{ Value: '옵션' }], RelWidth: 50, ColMerge:0 , CanEdit : 0},
      { Name: 'noSize', Header: [{ Value: '주택형' }], RelWidth: 20, CanEdit : 0 },
      { Name: 'houseCnt', Header: [{ Value: '선택 세대 수' }], RelWidth: 20, CanEdit : 0 },
    ]
  },
  data: [
    { SEQ: '1', dsItem: '조회된 데이터가 없습니다', noSize: '조회된 데이터가 없습니다', houseCnt: '조회된 데이터가 없습니다' },
  ],
}

/* HoldOption3: SQMS_WS01_006 세대옵션>세대설정 */
export const HoldOption3 = {
  options: {
    Cfg:{
      NoDataMessage:3,
      NoVScroll : false,
    },
    Cols: [
      { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
      { Name: 'standDong', Header: [{ Value: '<span class="emp_red">동</span>', Type: 'Html' }],Type : 'Float', Format : '####', RelWidth: 16, EditMask: '^\\d{0,4}$' },
      { Name: 'line', Header: [{ Value: '<span class="emp_red">라인</span>', Type: 'Html' }], RelWidth: 20, EditMask: '^\\d{0,2}$'},
      { Name: 'standHo', Header: [{ Value: '<span class="emp_red">호수</span>', Type: 'Html' }], RelWidth: 20, EditMask: '^\\d{0,2}$' },
      { Name: 'firstFloor', Header: [{ Value: '<span class="emp_red">첫 층수</span>', Type: 'Html' }], RelWidth: 20, EditMask: '^\\d{0,2}$' },
      { Name: 'lastFloor', Header: [{ Value: '<span class="emp_red">마지막 층수</span>', Type: 'Html' }], RelWidth: 20, EditMask: '^\\d{0,2}$' },
    ] 
  },
  data: [
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
  ],
}


/* SystemAdmin: SQMS_WS01_004 현장정보 및 QA > 품질시스템 관리(My Site) - 관련문서 Upload */
export const SystemAdmin = {
  options: {
    Cfg:{
      NoDataMessage: 3,
    },
    Cols: [
      { Name: 'checkYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 6, CanEdit:1},
      { Name: 'SEQ', Header: [{ Value: '번호' }], ColMerge: 1, RelWidth: 9, CanEdit:0 },
      { Name: 'title', Header: [{ Value: '문서 제목' }], RelWidth: 40, CanEdit:0 },
      { Name: 'fileName', Header: [{ Value: '참고문서 /Link' }], Type: "Lines", RelWidth: 45, CanEdit:0 ,AcceptEnters: 3},
    ]
  },
  data: [
    { case1: '1', case2: '설계도서 관리대장', case3: 'test.xlsx', case4: '0', case5: 'test.xlsx' },    
    { case1: '2', case2: '설계도서 관리대장', case3: 'test.xlsx', case4: '1', case5: 'test.xlsx' },    
    { case1: '3', case2: '설계도서 관리대장', case3: 'test.xlsx', case4: '1', case5: 'test.xlsx' },    
  ],
}