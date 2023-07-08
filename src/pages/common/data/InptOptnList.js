/* ------------------------------------------- */
/* 품질활동                                     */
/* ------------------------------------------- */

/* 검측 관리 */
/* 
  InptHeadSetupShow : SQMS_WS02_005 품질활동 > 검측관리 > 본사 Set-up(뷰모드)
  InptHeadSetupEdit : SQMS_WS02_005 품질활동 > 검측관리 > 본사 Set-up(수정모드)
  InptItrChk : SQMS_WS02_005 품질활동 > 검측관리 > 본사 Set-up > ITR(Check List)
  ItpSelect : SQMS_WS02_005_01 품질활동 > 검측관리 > 현장 Set-up > ITP > ITP 선택
  ItpWrite : SQMS_WS02_006 품질활동 > 검측관리 > 현장 Set-up > ITP > ITP 작성
  ItrList : SQMS_WS02_005_01 품질활동 > 검측관리 > 현장 Set-up > ITR(Check List) 
  InptSttusMySiteHead : SQMS_WS02_005_02 품질활동 > 검측관리 > 검측현황(시공사)
  InptSttusAllSiteHead : SQMS_WS02_005_02 품질활동 > 검측관리 > 검측현황(시공사) > All Sites(새창)
  InspectionRequestWrite : SQ_ACT_DTEC_W_025 품질활동 > 검측관리 > 검측현황(시공사) > 검측 요청서 작성
  InspectionRequestDetail : SQ_ACT_DTEC_W_025 품질활동 > 검측관리 > 검측현황(시공사) > 검측 요청서 상세
*/

/* InptHeadSetupShow: SQMS_WS02_005 품질활동 > 검측관리 > 본사 Set-up > ITP */
export const InptHeadSetupShow = {
  options: {
    Cfg : {
      NoVScroll : false,
      CanEdit:0,
      NoDataMessage:3,
      DataMerge:5,
      // FixPrevColumnMerge: 'inptMngtId',   // 열조건 단위 머지
      FixPrevColumnMerge: 'subName',   // 열조건 단위 머지
      // ShowFilter: true,
      // PrevColumnMergeMode: 1,
      prevColumnMerge: 1,
    },
    Cols: [
      { Name: 'mainName', Header: [{ Value: '대공종', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'midName', Header: [{ Value: '공종', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'subName', Header: [{ Value: '세부 공종', RowSpan: 3 }], RelWidth: 6 },
      // { Name: 'inptStep', Header: [{ Value: '단계', RowSpan: 3 }], RelWidth: 6 },
      // { Name: 'inptIem', Header: [{ Value: '항목', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'chkIem', Header: [{ Value: '검사항목', Span: 3, RowSpan: 3 }], Align: 'left', Indent: 1, ColMerge:1, RelWidth: 6 },
      { Name: 'chkIem01', Header: [{ Value: '검사항목', RowSpan: 3 }],Align: 'left', ColMerge:1, RelWidth: 6 },
      { Name: 'chkIem02', Header: [{ Value: '검사항목', RowSpan: 3 }], Align: 'left',ColMerge:1, RelWidth: 6 },
      { Name: 'chkEra', Header: [{ Value: '시기 및 빈도', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'chkStd', Header: [{ Value: '기 준', RowSpan: 3 }], Type: 'Lines', RelWidth: 17, Align: 'left', Indent: 1 },
      { Name: 'chkMtd', Header: [{ Value: '검사 방법', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'inptMngtId', Visible: '0' },
      { Name: 'relateHis', Header: [{ Value: '결과물', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'ccpyTradeType', Header: [{ Value: '검 사 점', Span: 4 }, { Value: '협력업체', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', ColMerge:0, RelWidth: 6 },
      { Name: 'cnstrctTradeChrgType', Header: [{}, { Value: '시공사', Span: 2 }, { Value: '담당/책임' }], Type: 'Enum', ColMerge:0, RelWidth: 6 },
      { Name: 'cnstrctTradeChkType', Header: [{},{},{ Value: '검사점'}], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', ColMerge:0, RelWidth: 6 },
      { Name: 'spvsTradeType', Header: [{},{ Value: '건설사업 \n 관리단', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', ColMerge:0,  RelWidth: 6 },
      { Name: 'comment', Header: [{ Value: '비고', RowSpan: 3 }], RelWidth: 6, ColMerge: 0, },
    ]
  },
  data : [],
}

export const InptHeadSetupEdit = {
  options: {
    Cfg : {
      NoVScroll : false,
      NoDataMessage:3,
      CanEdit:1,
      ShowFilter: true,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'mainCodeId', Header: [{ Value: '대공종', RowSpan: 3 }], RelWidth: 6, Type: 'Enum',Required:1, },
      { Name: 'midCodeId', Header: [{ Value: '공종', RowSpan: 3 }], RelWidth: 6, Type: 'Enum',Required:1, },
      { Name: 'subCodeId', Header: [{ Value: '세부 공종', RowSpan: 3 }], RelWidth: 6, Type: 'Enum',Required:1, },
      // { Name: 'inptStep', Header: [{ Value: '단계', RowSpan: 3 }], RelWidth: 6,Required:1, },
      // { Name: 'inptIem', Header: [{ Value: '항목', RowSpan: 3 }], RelWidth: 6,Required:1, },
      { Name: 'chkIem', Header: [{ Value: '검사항목', Span: 3, RowSpan: 3 }], Type: 'Lines', RelWidth: 6,Required:1, },
      { Name: 'chkIem01', Header: [{ Value: '검사항목', RowSpan: 3 }], Type: 'Lines', ColMerge:1, RelWidth: 6 },
      { Name: 'chkIem02', Header: [{ Value: '검사항목', RowSpan: 3 }], Type: 'Lines', ColMerge:1, RelWidth: 6 },
      { Name: 'chkEra', Header: [{ Value: '시기 및 빈도', RowSpan: 3 }], RelWidth: 6,Required:1, },
      { Name: 'chkStd', Header: [{ Value: '기 준', RowSpan: 3 }], Type: 'Lines', RelWidth: 17 },
      { Name: 'chkMtd', Header: [{ Value: '검사 방법', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'relateHis', Header: [{ Value: '결과물', RowSpan: 3 }], RelWidth: 6 },
      { Name: 'ccpyTradeType', Header: [{ Value: '검 사 점', Span: 4 }, { Value: '협력업체', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
      { Name: 'cnstrctTradeChrgType', Header: [{}, { Value: '시공사', Span: 2 }, { Value: '담당/책임' }], Type: 'Enum', RelWidth: 6 },
      // { Name: 'cnstrctTradeRspnberType', Header: [{},{}, { Value: '검사점' }], Type: 'Enum', Enum: '|공무|공사|공사/품질|품질', EnumKeys: '|001|002|003|004', RelWidth: 6 },
      { Name: 'cnstrctTradeChkType', Header: [{},{},{ Value: '검사점' }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
      // { Name: 'cnstrctTradeChkType', Header: [{},{ Value: '검사점', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
      { Name: 'spvsTradeType', Header: [{},{ Value: '건설사업 \n 관리단', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M',  RelWidth: 6 },
      { Name: 'comment', Header: [{ Value: '비고', RowSpan: 3 }], RelWidth: 6 },
    ]
  },
  data : [],
}

/* InptItrChk : SQMS_WS02_005 품질활동 > 검측관리 > 본사 Set-up > ITR(Check List) */
export const InptItrChk = {
  options: {
    Cfg : {
      NoVScroll : false,
      NoDataMessage:3,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5, CanEdit:0 },
      { Name: 'mainName', Header: [{ Value: '대공종' }], RelWidth: 15, CanEdit:0 },
      { Name: 'midName', Header: [{ Value: '공종' }], RelWidth: 15, CanEdit:0 },
      { Name: 'subName', Header: [{ Value: '세부 공종' }], RelWidth: 15, CanEdit:0 },
      { Name: 'chkTitle', Header: [{ Value: '체크리스트 이름' }], Align: 'left', Indent: 1, RelWidth: 40, CanEdit:0 },
      { Name: 'registDate', Header: [{ Value: '등록일' }], RelWidth: 10,CanEdit:0 },
    ]
  },
  data : [],
}

/* DetectionAdmin3: SQMS_WS02_005_01 품질활동 > 검측관리 > 본사 Set-up > ITP 작성 */
export const DetectionAdmin3 = {
  options: {
    Cfg:{
      NoDataMessage:3,
      NoVScroll: false,
      DataMerge:5,
      FixPrevColumnMerge: 'subName',   // 열조건 단위 머지
      // PrevColumnMergeMode: 1,
      prevColumnMerge: 1,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0,ColMerge:0, RelWidth: 5 },
      { Name: 'mainName', Header: [{ Value: '대공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0,ColMerge:1 },
      { Name: 'midName', Header: [{ Value: '공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0,ColMerge:1 },
      { Name: 'subName', Header: [{ Value: '세부 공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0,ColMerge:1 },
      // { Name: 'inptStep', Header: [{ Value: '단계', RowSpan: 3 }], RelWidth: 6, CanEdit:0,ColMerge:1  },
      // { Name: 'inptIem', Header: [{ Value: '항목', RowSpan: 3 }], RelWidth: 6 , CanEdit:0,ColMerge:1 },
      { Name: 'chkIem', Header: [{ Value: '검사항목', RowSpan: 3,Span: 3,}], Type: 'Lines', RelWidth: 6, CanEdit:0, Align: 'left', Indent: 1,  },
      { Name: 'chkIem01', Header: [{ Value: '검사항목', RowSpan: 3 }], Type: 'Lines', RelWidth: 6, CanEdit:0, Align: 'left', Indent: 1,  },
      { Name: 'chkIem02', Header: [{ Value: '검사항목', RowSpan: 3 }], Type: 'Lines', RelWidth: 6, CanEdit:0, Align: 'left', Indent: 1,  },
      { Name: 'chkEra', Header: [{ Value: '시기 및 빈도', RowSpan: 3 }], RelWidth: 6 , CanEdit:0, ColMerge:0, Align: 'left', Indent: 1 },
      { Name: 'chkStd', Header: [{ Value: '기 준', RowSpan: 3 }], Type: 'Lines', RelWidth: 20, CanEdit:0,ColMerge:0, Align: 'left', Indent: 1  },
      { Name: 'chkMtd', Header: [{ Value: '검사 방법', RowSpan: 3 }], RelWidth: 6, CanEdit:0,ColMerge:0, Align: 'left', Indent: 1  },
      { Name: 'inptMngtId', Visible: 0},
      { Name: 'relateHis', Header: [{ Value: '결과물', RowSpan: 3 }], RelWidth: 6 , CanEdit:0 ,ColMerge:0},
      { Name: 'ccpyTradeType', Header: [{ Value: '검 사 점', Span: 4 }, { Value: '협력업체', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6, CanEdit:0,ColMerge:0  },
      { Name: 'cnstrctTradeChrgType', Header: [{}, { Value: '시공사', Span: 2 }, { Value: '담당/책임' }], Type: 'Enum', RelWidth: 6, CanEdit:0,ColMerge:0  },
      // { Name: 'cnstrctTradeRspnberType', Header: [{},{}, { Value: '검사점' }], Type: 'Enum', Enum: '|공무|공사|공사/품질|품질', EnumKeys: '|001|002|003|004', RelWidth: 6, CanEdit:0,ColMerge:0  },
      { Name: 'cnstrctTradeChkType', Header: [{}, {},{ Value: '검사점'}], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6, CanEdit:0,ColMerge:0  },
      // { Name: 'cnstrctTradeChkType', Header: [{},{ Value: '검사점', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6, CanEdit:0,ColMerge:0  },
      { Name: 'spvsTradeType', Header: [{}, { Value: '건설사업 \n 관리단', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M',  RelWidth: 6 , CanEdit:0,ColMerge:0 },
      { Name: 'comment', Header: [{ Value: '비고', RowSpan: 3 }], RelWidth: 6, CanEdit:0,ColMerge:0  },
    ]
  },
  data : [],
}

/* ItpSelect: SQMS_WS02_005_01 품질활동 > 검측관리 > 현장 Set-up > ITP > ITP 선택 */
export const ItpSelect = {
  options: {
    Cfg:{
      NoDataMessage : 3,
      NoVScroll : false,
      DataMerge:2,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10,CanEdit:1 },
      { Name: 'mainName', Header: [{ Value: '대공종' }], ColMerge: 0, RelWidth: 15,CanEdit:0 },
      { Name: 'midName', Header: [{ Value: '공종' }], ColMerge: 0, RelWidth: 15,CanEdit:0 },
      { Name: 'subName', Header: [{ Value: '세부 공종' }], ColMerge: 0, RelWidth: 25,CanEdit:0 },
      // { Name: 'inptStep', Header: [{ Value: '단계' }], ColMerge: 0, RelWidth: 15,CanEdit:0 },
      // { Name: 'inptIem', Header: [{ Value: '항목' }], ColMerge: 0, RelWidth: 15,CanEdit:0 },
      { Name: 'chkIem', Header: [{ Value: '검사항목', Span: 3}], Align: 'left', Indent: 1, ColMerge: 1, RelWidth: 15,CanEdit:0 },
      { Name: 'chkIem01', Header: [{ Value: '검사항목1' }], Align: 'left', Indent: 1, ColMerge: 1, RelWidth: 15,CanEdit:0 },
      { Name: 'chkIem02', Header: [{ Value: '검사항목2' }], Align: 'left', Indent: 1, ColMerge: 1, RelWidth: 15,CanEdit:0 },
    ]
  },
  data : [],
}

/* ItpWrite: SQ-ACT-DTEC-W-006 품질활동 > 검측관리 > 현장 Set-up > ITP 작성 */
export const ItpWrite = {
  options: {
    Cfg:{
      NoDataMessage:3,
      NoVScroll:0,
      DataMerge:5,
      FixPrevColumnMerge: 'subName',   // 열조건 단위 머지
      // PrevColumnMergeMode: 1,
      prevColumnMerge: 1,
    },
    Cols: [
        { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
        { Name: 'mainName', Header: [{ Value: '대공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0 ,Required:1,},
        { Name: 'midName', Header: [{ Value: '공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0,Required:1, },
        { Name: 'subName', Header: [{ Value: '세부 공종', RowSpan: 3 }], RelWidth: 6, CanEdit:0,Required:1, },
        // { Name: 'inptStep', Header: [{ Value: '단계', RowSpan: 3 }], RelWidth: 6, CanEdit:0,Required:1,  },
        // { Name: 'inptIem', Header: [{ Value: '항목', RowSpan: 3 }], RelWidth: 6,Required:1, },
        { Name: 'chkIem', Header: [{ Value: '검사항목', Span: 3, RowSpan: 3 }], Type: 'Lines', RelWidth: 6 ,Required:1, },
        { Name: 'chkIem01', Header: [{ Value: '검사항목', RowSpan: 3 }], Type: 'Lines', RelWidth: 6  },
        { Name: 'chkIem02', Header: [{ Value: '검사항목', RowSpan: 3 }], Type: 'Lines', RelWidth: 6  },
        { Name: 'chkEra', Header: [{ Value: '시기 및 빈도', RowSpan: 3 }], RelWidth: 6,Required:1, },
        { Name: 'chkStd', Header: [{ Value: '기 준', RowSpan: 3 }], Type: 'Lines', RelWidth: 17  },
        { Name: 'chkMtd', Header: [{ Value: '검사 방법', RowSpan: 3 }], RelWidth: 6 },
        { Name: 'inptMngtId', Visible: 0},
        { Name: 'relateHis', Header: [{ Value: '결과물', RowSpan: 3 }], RelWidth: 6},
        { Name: 'ccpyTradeType', Header: [{ Value: '검 사 점', Span: 4 }, { Value: '협력업체', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
        { Name: 'cnstrctTradeChrgType', Header: [{}, { Value: '시공사', Span: 2 }, { Value: '담당/책임' }], Type: 'Enum', Enum: '|공무|공사|공사/품질|품질', EnumKeys: '|001|002|003|004', RelWidth: 6 },
        // { Name: 'cnstrctTradeRspnberType', Header: [{},{}, { Value: '검사점' }], Type: 'Enum', Enum: '|공무|공사|공사/품질|품질', EnumKeys: '|001|002|003|004', RelWidth: 6 },
        { Name: 'cnstrctTradeChkType', Header: [{}, {},{ Value: '검사점'}], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
        // { Name: 'cnstrctTradeChkType', Header: [{}, { Value: '검사점', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M', RelWidth: 6 },
        { Name: 'spvsTradeType', Header: [{}, { Value: '건설사업 \n 관리단', RowSpan: 2 }], Type: 'Enum', Enum: '|W|H|R|S.W|M', EnumKeys: '|W|H|R|SW|M',  RelWidth: 6 },
        { Name: 'comment', Header: [{ Value: '비고', RowSpan: 3 }], ColMerge: 0, RelWidth: 6  },
    ]
  },
  data : [],
}

/* ItpList: SQMS_WS02_005_01 품질활동 > 검측관리 > 현장 Set-up > ITP 리스트 */
export const ItpList = {
  options: {
    Cfg:{
      NoDataMessage:3,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10,CanEdit:0, },
      { Name: 'itpNo', Header: [{ Value: 'ITP NO' }], RelWidth: 30,CanEdit:0, },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 20,CanEdit:0, },
      { Name: 'userNm', Header: [{ Value: '등록자' }], RelWidth: 10,CanEdit:0, },
      { Name: 'registDate', Header: [{ Value: '등록일' }], RelWidth: 10,CanEdit:0, },
      { Name: 'comment', Header: [{ Value: '비고' }], RelWidth: 15,CanEdit:0, },
      { Name: 'downBtn', Header: [{ Value: '다운로드' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_download no_text'>다운로드</button>"}, RelWidth: 10 },
      { Name: 'revisionId', Header: [{ Value: 'revisionId' }], Visible : 0},
    ]
  },
  data : [],
}

/* ItrList: SQMS_WS02_005_01 품질활동 > 검측관리 > 현장 Set-up > ITR(Check List) */
export const ItrList = {
  options: {
    Cfg:{
      NoDataMessage:3,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5,CanEdit:1 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 7,CanEdit:0 },
      { Name: 'mainName', Header: [{ Value: '대공종' }], RelWidth: 10,CanEdit:0 },
      { Name: 'midName', Header: [{ Value: '공종' }], RelWidth: 15,CanEdit:0 },
      { Name: 'subName', Header: [{ Value: '세부공종' }], RelWidth: 15,CanEdit:0 },
      { Name: 'chkTitle', Header: [{ Value: '체크리스트 이름' }], RelWidth: 30,CanEdit:0 },
      { Name: 'inUser', Header: [{ Value: '등록자' }], RelWidth: 15,CanEdit:0 },
      { Name: 'registDate', Header: [{ Value: '등록일' }], RelWidth: 9 ,CanEdit:0},
    ]
  },
  data : [],
}

/* InptSttusMySiteHead: SQMS_WS02_005_02 품질활동 > 검측관리 > 검측현황(시공사) > My Sites */
export const InptSttusMySiteHead = {
  options: {
    Cfg:{
      NoDataMessage:3,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'selectYn', Header: [{ Value: '선택', HeaderCheck: 1, RowSpan: 2 }], Type: 'Radio', HRadio: 0, RelWidth: 2 },
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 3,CanEdit:0 },
      { Name: 'inptDoc', Header: [{ Value: '검측번호', RowSpan: 2 }], RelWidth: 10,CanEdit:0 },
      { Name: 'inptOrder', Header: [{ Value: '차수', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'mainName', Header: [{ Value: '대공종', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'midName', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'subName', Header: [{ Value: '세부공종', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'inptLc', Header: [{ Value: '위치 및 \n 검측 부위', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'drw', Header: [{ Value: '도면', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'inptCn', Header: [{ Value: '검측 내용', RowSpan: 2 }], Align: 'left', RelWidth: 13,CanEdit:0 },
      { Name: 'ccpyName', Header: [{ Value: '협력 업체', RowSpan: 2 }], RelWidth: 5 ,CanEdit:0},
      { Name: 'inptRegistDate', Header: [{ Value: '검측 등록일', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'inptDemandDate', Header: [{ Value: '검측 요구일', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'inptDate', Header: [{ Value: '검측일', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'inptDspthDate', Header: [{ Value: '검측 통보일', RowSpan: 2 }], RelWidth: 5,CanEdit:0 },
      { Name: 'progrsSttusNm', Header: [{ Value: '진행상황', Span: 2 }, { Value: '1차' }], Type: 'Html', RelWidth: 9 },
      { Name: 'progrsSttusNm2', Header: [{}, { Value: '2차' }], Type: 'Html', RelWidth: 9 },
      { Name: 'viewYn', Header: [{ Value: '검측 \n 정보', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
      { Name: 'requireYn', Header: [{ Value: '검측 \n 요청서', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_write'>작성</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
      { Name: 'noticeYn', Header: [{ Value: '검측결과 \n 통보서', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_write'>작성</button>","1": "<button type='button' class='btn_view'>보기</button>","2":"-"}, RelWidth: 5 },
    ]
  },
  data : [],
}

/* InptSttusAllSiteHead: SQMS_WS02_005_02 품질활동 > 검측관리 > 검측현황(시공사) > All Sites(새창) */
export const InptSttusAllSiteHead = {
  options: {
    Cfg : {
      NoDataMessage:3,
      NoVScroll: false,
    },
    Cols : [
      { Name: 'SEQ', Header: [{ Value: 'No', RowSpan: 2 }], RelWidth: 4, CanEdit: 0 },
      { Name: 'baseTypeNm', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
      { Name: 'csrtTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
      { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
      { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 15, CanEdit: 0 },
      { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
      { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 15, CanEdit: 0 },
      { Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작' }], RelWidth: 10, CanEdit: 0 },
      { Name: 'csrtEndDt', Header: [{}, { Value: '종료' }], RelWidth: 10, CanEdit: 0 },
      { Name: 'csrtMngrNm', Header: [{ Value: '현장소장', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
    ]
  },
  data : [],
}

/* InspectionRequestWrite: SQ_ACT_DTEC_W_025 품질활동 > 검측관리 > 검측현황(시공사) > 검측 요청서 작성 */
export const InspectionRequestWrite = {
  options: {
    Cfg:{
      NoDataMessage:3,
      NoVScroll : false,
      MaxVScroll: 500,
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: 'NO', RowSpan: 3 }], RelWidth: 5, CanEdit:0, },
      { Name: 'chkIem', Header: [{ Value: '검사항목', RowSpan: 3 }], Align: 'left', RelWidth: 20, CanEdit:0 },
      { Name: 'stndrd', Header: [{ Value: '규격 및 기준', RowSpan: 3 }], RelWidth: 10,CanEdit:0 },
      { Name: 'cnst1JdgmntResult', Header: [{ Value: '검사결과', Span: 4 }, { Value: '1차', Span: 2 }, { Value: ' 시공사' }], Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE", RelWidth: 15 },
      { Name: 'srvn1JdgmntResult', Header: [{}, {}, { Value: ' 건설사업관리단' }], RelWidth: 15, Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE" },
      { Name: 'cnst2JdgmntResult', Header: [{}, { Value: '2차', Span: 2 }, { Value: ' 시공사' }], RelWidth: 15, Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE" },
      { Name: 'srvn2JdgmntResult', Header: [{}, {}, { Value: ' 건설사업관리단' }], RelWidth: 15,CanEdit:0, Type: 'Radio', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE" },
      { Name: 'msrs', Header: [{ Value: '조치사항', RowSpan: 3 }], RelWidth: 10 },
    ]
  },
  data : [],
}

/* InspectionRequestDetail: SQ_ACT_DTEC_W_025 품질활동 > 검측관리 > 검측현황(시공사) > 검측 요청서 상세 */
export const InspectionRequestDetail = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호', RowSpan: 3 }], RelWidth: 5 },
      { Name: 'case2', Header: [{ Value: '검사항목', RowSpan: 3 }], Align: 'left', RelWidth: 20 },
      { Name: 'case3', Header: [{ Value: '규격 및 기준', RowSpan: 3 }], RelWidth: 10 },
      { Name: 'case4', Header: [{ Value: '검사결과', Span: 4 }, { Value: '1차', Span: 2 }, { Value: ' 시공사' }], CanEdit:  0, "Format": {"1": "적합", "2": "<span class='txt_warning'>부적합</span>", "3": '-'}, RelWidth: 15 },
      { Name: 'case5', Header: [{}, {}, { Value: ' 건설사업관리단' }], CanEdit:  0, "Format": {"1": "적합", "2": "<span class='txt_warning'>부적합</span>", "3": '-'}, RelWidth: 15 },
      { Name: 'case6', Header: [{}, { Value: '2차', Span: 2 }, { Value: ' 시공사' }], CanEdit:  0, "Format": {"1": "적합", "2": "<span class='txt_warning'>부적합</span>", "3": '-'}, RelWidth: 15 },
      { Name: 'case7', Header: [{}, {}, { Value: ' 건설사업관리단' }], CanEdit:  0, "Format": {"1": "적합", "2": "<span class='txt_warning'>부적합</span>", "3": '-'}, RelWidth: 15 },
      { Name: 'case8', Header: [{ Value: '조치사항', RowSpan: 3 }], RelWidth: 10 },
    ]
  },
  data : [],
}
