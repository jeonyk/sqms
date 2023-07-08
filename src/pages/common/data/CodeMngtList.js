/* ------------------------------------------- */
/* 코드관리                                     */
/* ------------------------------------------- */

/*  */
export  const codeTypeComboList = [
            { codeTypeCd : 'MENU', codeTypeNm : '메뉴' },
            { codeTypeCd : 'TEST', codeTypeNm : '시험관리' },
            { codeTypeCd : 'MTRL', codeTypeNm : '자재관리' },
            { codeTypeCd : 'ITP', codeTypeNm : '검측관리-ITP' },
            { codeTypeCd : 'INPT', codeTypeNm : '검측관리' },
            { codeTypeCd : 'NCFM', codeTypeNm : '부적합관리' },
            { codeTypeCd : 'EDU',  codeTypeNm : '교육관리' },
            { codeTypeCd : 'EXTN', codeTypeNm : '대외점검' },
            { codeTypeCd : 'SELF', codeTypeNm : '자체품질점검' },
            { codeTypeCd : 'BS',   codeTypeNm : 'BS점검' },
            { codeTypeCd : 'EQPM', codeTypeNm : '시험/검사 장비' },
        ]


/* 메뉴관리 */
/* codeMngtSheet : My Work > 코드관리 > 1Depth 관리  */
export const menu1DepthSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
    },
    Cols: [
      // { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1},
      { Name: 'menuNmKr', Header: [{ Value: '메뉴(1 DEPTH) 한글명' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuNmEn', Header: [{ Value: '영문명' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuType', Header: [{ Value: '메뉴유형' }], Type: "Enum", Enum: "|메뉴|화면", EnumKeys: "|MENU|VIEW", RelWidth: 2 },
      { Name: 'pageCode', Header: [{ Value: 'Page Code' }], RelWidth: 2 },
      { Name: 'scrinUrl', Header: [{ Value: '화면 URL' }], Align: "Left", RelWidth: 10 },
      { Name: 'routerName', Header: [{ Value: 'ROUTOR' }], Align: "Left", RelWidth: 3 },
      { Name: 'layoutType', Header: [{ Value: 'LAYOUT' }], Align: "Left", RelWidth: 3 },
      { Name: 'sortOrder', Header: [{ Value: '정렬순서' }], RelWidth: 2 },
      { Name: 'creatDt', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'useYn', Header: [{ Value: '사용여부' }], Type: "Enum", Enum: "|사용|미사용", EnumKeys: "|Y|N", RelWidth: 2 },
      { Name: 'comment', Header: [{ Value: '비고' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuMngtId', Visible: '0' },
      { Name: 'menuLevel', Visible: '0' },
     ]
  },
  data: [
  ],
}

/* codeMngtSheet : My Work > 코드관리 > 2Depth 관리  */
export const menu2DepthSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
    },
    Cols: [
      // { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1},
      { Name: 'mainCodeId', Header: [{ Value: '메뉴(1 DEPTH)' }], Type: "Enum", RelWidth: 4 },
      { Name: 'menuNmKr', Header: [{ Value: '메뉴(2 DEPTH) 한글명' }], Align: "Left", RelWidth: 4 },
      { Name: 'menuNmEn', Header: [{ Value: '영문명' }], Align: "Left", RelWidth: 4 },
      { Name: 'menuType', Header: [{ Value: '메뉴유형' }], Type: "Enum", Enum: "|메뉴|화면", EnumKeys: "|MENU|VIEW", RelWidth: 2 },
      { Name: 'pageCode', Header: [{ Value: 'Page Code' }], RelWidth: 2 },
      { Name: 'scrinUrl', Header: [{ Value: '화면 URL' }], Align: "Left", RelWidth: 8 },
      { Name: 'routerName', Header: [{ Value: 'ROUTOR' }], Align: "Left", RelWidth: 4 },
      { Name: 'layoutType', Header: [{ Value: 'LAYOUT' }], Align: "Left", RelWidth: 3 },
      { Name: 'sortOrder', Header: [{ Value: '정렬순서' }], RelWidth: 2 },
      { Name: 'creatDt', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'useYn', Header: [{ Value: '사용여부' }], Type: "Enum", Enum: "|사용|미사용", EnumKeys: "|Y|N", RelWidth: 2 },
      { Name: 'comment', Header: [{ Value: '비고' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuMngtId', Visible: '0' },
      { Name: 'menuLevel', Visible: '0' },
     ]
  },
  data: [
  ],
}

/* codeMngtSheet : My Work > 코드관리 > 3Depth 관리 */
export const menu3DepthSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
    },
    Cols: [
      // { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1},
      { Name: 'mainCodeId', Header: [{ Value: '메뉴(1 DEPTH)' }], Type: "Enum", RelWidth: 4 },
      { Name: 'midCodeId', Header: [{ Value: '메뉴(2 DEPTH)' }], Type: "Enum", RelWidth: 4 },
      { Name: 'menuNmKr', Header: [{ Value: '메뉴(3 DEPTH) 한글명' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuNmEn', Header: [{ Value: '영문명' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuType', Header: [{ Value: '메뉴유형' }], Type: "Enum", Enum: "|메뉴|화면", EnumKeys: "|MENU|VIEW", RelWidth: 2 },
      { Name: 'pageCode', Header: [{ Value: 'Page Code' }], RelWidth: 2 },
      { Name: 'scrinUrl', Header: [{ Value: '화면 URL' }], Align: "Left", RelWidth: 8 },
      { Name: 'routerName', Header: [{ Value: 'ROUTOR' }], Align: "Left", RelWidth: 4 },
      { Name: 'layoutType', Header: [{ Value: 'LAYOUT' }], Align: "Left", RelWidth: 3 },
      { Name: 'sortOrder', Header: [{ Value: '정렬순서' }], RelWidth: 2 },
      { Name: 'creatDt', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'useYn', Header: [{ Value: '사용여부' }], Type: "Enum", Enum: "|사용|미사용", EnumKeys: "|Y|N", RelWidth: 2 },
      { Name: 'comment', Header: [{ Value: '비고' }], Align: "Left", RelWidth: 3 },
      { Name: 'menuMngtId', Visible: '0' },
      { Name: 'menuLevel', Visible: '0' },
     ]
  },
  data: [
  ],
}

/* codeMngtSheet : My Work > 코드관리 > 공통코드 */
export const code1DepthSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
    },
    Cols: [
      // { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1},
      { Name: 'mainCodeId', Header: [{ Value: '메뉴(1 DEPTH)' }], Type: "Enum", RelWidth: 5 },
      { Name: 'midCodeId', Header: [{ Value: '메뉴(2 DEPTH)' }], Type: "Enum", RelWidth: 5 },
      { Name: 'menuNmKr', Header: [{ Value: '메뉴(3 DEPTH) 한글명' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuNmEn', Header: [{ Value: '영문명' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuType', Header: [{ Value: '메뉴유형' }], Type: "Enum", Enum: "|메뉴|화면", EnumKeys: "|MENU|VIEW", RelWidth: 2 },
      { Name: 'pageCode', Header: [{ Value: 'Page Code' }], RelWidth: 2 },
      { Name: 'scrinUrl', Header: [{ Value: '화면 URL' }], Align: "Left", RelWidth: 10 },
      { Name: 'routerName', Header: [{ Value: 'ROUTOR' }], Align: "Left", RelWidth: 3 },
      { Name: 'layoutType', Header: [{ Value: 'LAYOUT' }], Align: "Left", RelWidth: 3 },
      { Name: 'sortOrder', Header: [{ Value: '정렬순서' }], RelWidth: 2 },
      { Name: 'creatDt', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'useYn', Header: [{ Value: '사용여부' }], Type: "Enum", Enum: "|사용|미사용", EnumKeys: "|Y|N", RelWidth: 2 },
      { Name: 'comment', Header: [{ Value: '비고' }], Align: "Left", RelWidth: 5 },
      { Name: 'menuMngtId', Visible: '0' },
      { Name: 'menuLevel', Visible: '0' },
     ]
  },
  data: [
  ],
}

/* codeMngtSheet : My Work > 코드관리 > 대분류 코드 */
export const mainCodeSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
    },
    Cols: [
      // { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1},
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 1 },
      { Name: 'codeType', Header: [{ Value: '공종분류' }], Type: "Enum", RelWidth: 5 },
      { Name: 'mainName', Header: [{ Value: '대분류 명(국문)' }], Align: "Left", RelWidth: 5 },
      { Name: 'mainNameEn', Header: [{ Value: '대분류 명(영문)' }], Align: "Left", RelWidth: 5 },
      { Name: 'creatDt', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'useYn', Header: [{ Value: '사용여부' }], Type: "Enum", Enum: "|사용|미사용", EnumKeys: "|Y|N", RelWidth: 2 },
      { Name: 'comment', Header: [{ Value: '비고' }], Align: "Left", RelWidth: 5 },
      { Name: 'mainCodeId', Visible: '0' },
     ]
  },
  data: [
  ],
}

/* codeMngtSheet : My Work > 코드관리 > 중분류 코드 */
export const midCodeSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 1 },
      { Name: 'codeType', Header: [{ Value: '공종분류' }], Type: "Enum", RelWidth: 5 },
      { Name: 'mainCodeId', Header: [{ Value: '대분류' }], Type: "Enum", Align: "Left", Indent: 2, RelWidth: 5 },
      { Name: 'midName', Header: [{ Value: '중분류 명(국문)' }], Align: "Left", RelWidth: 5 },
      { Name: 'midNameEn', Header: [{ Value: '중분류 명(영문)' }], Align: "Left", RelWidth: 5 },
      { Name: 'creatDt', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'useYn', Header: [{ Value: '사용여부' }], Type: "Enum", Enum: "|사용|미사용", EnumKeys: "|Y|N", RelWidth: 2 },
      { Name: 'comment', Header: [{ Value: '비고' }], Align: "Left", RelWidth: 5 },
      { Name: 'midCodeId', Visible: '0' },
     ]
  },
  data: [
  ],
}

/* codeMngtSheet : My Work > 코드관리 > 소분류 코드 */
export const subCodeSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 1 },
      { Name: 'codeType', Header: [{ Value: '공종분류' }], Type: "Enum", RelWidth: 5 },
      { Name: 'mainCodeId', Header: [{ Value: '대분류' }], Type: "Enum", Align: "Left", Indent: 2, RelWidth: 5 },
      { Name: 'midCodeId', Header: [{ Value: '중분류' }], Type: "Enum", Align: "Left", Indent: 2, RelWidth: 5 },
      { Name: 'subName', Header: [{ Value: '소분류 명(국문)' }], Align: "Left", RelWidth: 5 },
      { Name: 'subNameEn', Header: [{ Value: '소분류 명(영문)' }], Align: "Left", RelWidth: 5 },
      { Name: 'creatDt', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'useYn', Header: [{ Value: '사용여부' }], Type: "Enum", Enum: "|사용|미사용", EnumKeys: "|Y|N", RelWidth: 2 },
      { Name: 'sortOrder', Header: [{ Value: '순서' }], RelWidth: 2, CanEdit: 1 },
      { Name: 'comment', Header: [{ Value: '비고' }], Align: "Left", RelWidth: 5 },
      { Name: 'subCodeId', Visible: '0' },
     ]
  },
  data: [
  ],
}

