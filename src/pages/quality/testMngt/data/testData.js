/* ------------------------------------------- */
/* 품질활동                                     */
/* ------------------------------------------- */

 /* testData: SQMS_WS02_001 품질활동 > 시험관리 > 본사 Set-up (품질시험 Data) */
export const testDataShow = {
  options: {
    Cfg : {
      // SearchMode:2,
      CanEdit : 0,
      DataMerge : 4,
      FixPrevColumnMerge: 'tstSbjDtlId',
      PrevColumnMergeMode: 1,
      PageLength: 30,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'mainName', Header: [{ Value: '구분', RowSpan: 2 }], Type: "Text", ColMerge: 1, RowMerge: 0, RelWidth: 5 },
      { Name: 'midName', Header: [{ Value: '공종[중분류]', RowSpan: 2 }], Type: "Text", ColMerge: 1, RowMerge: 0, RelWidth: 7 },
      { Name: 'subName', Header: [{ Value: '종별[소분류]', RowSpan: 2 }], Type: "Lines", ColMerge: 1, RelWidth: 10 },
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 2, Span: 2 }], ColMerge: 1, Type: "Text", RowMerge: 1, RelWidth: 7 },
      { Name: 'tstSbjNameLvl1', Type: "Text", RowMerge: 1, ColMerge: 1, RelWidth: 7 },
      { Name: 'ksStd', Header: [{ Value: '시험방법', RowSpan: 2 }], Type: "Text", RelWidth: 5 },
      { Name: 'testFreq', Header: [{ Value: '시험빈도', RowSpan: 2 }], Type: "Lines", Class: 'al', RelWidth: 10},
      { Name: 'tstSbjDtlId', Visible: '0' },
      { Name: 'minValue', Header: [{ Value: '시험기준', Span: 5 }, { Value: '최소값'}], Type: "Text", RowMerge: 1, RelWidth: 4 },
      { Name: 'minRangeName', Header: [{}, { Value: '범위' }], Type: "Text", RowMerge: 1, RelWidth: 4 },
      { Name: 'maxValue', Header: [{}, { Value: '최대값' }], Type: "Text", RowMerge: 1, RelWidth: 4 },
      { Name: 'maxRangeName', Header: [{}, { Value: '범위' }], Type: "Text", RowMerge: 1, RelWidth: 4 },
      { Name: 'testUnit', Header: [{}, { Value: '단위' }], Type: "Text", RowMerge: 1, RelWidth: 4 },
    ]
  },
  data: [
  ],
}
export const testDataEdit = {
  options: {
    Cfg : {
      SearchMode:2,
      CanEdit : 1,
      PageLength: 30,
      ShowFilter: true,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' , RowSpan: 2 }],Type: 'Bool', CanSort: 0, RelWidth: 3 },
      { Name: 'mainCodeId', Header: [{ Value: '구분', RowSpan: 2 }], Type: "Enum", RelWidth: 5 },
      { Name: 'midCodeId', Header: [{ Value: '공종[중분류]', RowSpan: 2 }], Type: "Enum", RelWidth: 7 },
      { Name: 'subName', Header: [{ Value: '종별[소분류]', RowSpan: 2 }], Type: "Lines", RelWidth: 10 },
      // { Name: 'standard', Header: [{ Value: '규격', RowSpan: 2 }], Type: "Text", RelWidth: 7 },
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 2, Span: 2 }], ColMerge: 1, Type: "Text", RelWidth: 7 },
      { Name: 'tstSbjNameLvl1', Type: "Text", RelWidth: 7 },
      { Name: 'ksStd', Header: [{ Value: '시험방법', RowSpan: 2 }], Type: "Text", RelWidth: 5 },
      { Name: 'testFreq', Header: [{ Value: '시험빈도', RowSpan: 2 }], Type: "Lines", Class: 'al', RelWidth: 10},
      { Name: 'minValue', Header: [{ Value: '시험기준', Span: 5 }, { Value: '최소값'}], RelWidth: 4 },
      // { Name: 'minRange', Header: [{}, { Value: '범위' }], Type: "Enum", Enum: "|이상|초과|이하|미만|이상유무", EnumKeys: "|AB|EX|BE|UN|YN", RelWidth: 4 },
      { Name: 'minRange', Header: [{}, { Value: '범위' }], Type: "Enum", Enum: "|없음|이상|초과|이하|미만|이상유무", EnumKeys: "||AB|EX|BE|UN|YN", RelWidth: 4 },
      { Name: 'maxValue', Header: [{}, { Value: '최대값' }], RelWidth: 4 },
      // { Name: 'maxRange', Header: [{}, { Value: '범위' }], Type: "Enum", Enum: "|이상|초과|이하|미만|이상유무", EnumKeys: "|AB|EX|BE|UN|YN", RelWidth: 4 },
      { Name: 'maxRange', Header: [{}, { Value: '범위' }], Type: "Enum", Enum: "|없음|이하|미만|이상유무", EnumKeys: "||BE|UN|YN", RelWidth: 4 },
      { Name: 'testUnit', Header: [{}, { Value: '단위' }], Type: "Text", RelWidth: 4 },
      { Name: 'testType', Header: [{ Value: '시험 Type', RowSpan: 2 }], Type: 'Enum', Enum: "|현장시험|의뢰시험|공장시험|성적서 대체", EnumKeys: "|0001|0002|0003|0004",  RelWidth: 5, Visible: '0'},
      { Name: 'tstSbjDtlId', Visible: '0' },
    ]
  },
  data: [
  ],
}

/* testExpense: SQMS_WS02_001 품질활동 > 시험관리 > 본사 Set-up (품질시험비용) */
export const testExpense = {
  options: {
    Cfg : {
      SearchMode:2,
      CanEdit : 1,
      // DataMerge : 1,
      DataMerge : 5,
      ShowFilter: true,
      FixPrevColumnMerge: 'subName',
      PrevColumnMergeMode: 1,
      PageLength: 30,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 3 }], Type: 'Enum', ColMerge: 1, RelWidth: 5, CanEdit: 0 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 3 }], Type: 'Enum', ColMerge: 1, RelWidth: 10, CanEdit: 0 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 3 }], Type: "Lines", ColMerge: 1, RelWidth: 5, CanEdit: 0 },
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 3, Span: 2 }], RowMerge:1, RelWidth: 7, CanEdit: 0 },
      { Name: 'tstSbjNameLvl1', Type: "Text", RowMerge: 1, RelWidth: 7, CanEdit: 0 },
      { Name: 'ksStd', Header: [{ Value: '시험 방법', RowSpan: 3 }], RelWidth: 5, CanEdit: 0 },
      //{ Name: 'testFreq', Header: [{ Value: '시험 빈도', RowSpan: 3 }], Type: "Lines", ColMerge: 1, RelWidth: 15, CanEdit: 0 },
      { Name: 'mngeExpr', Header: [{ Value: '인력(시간)', Span: 6 }, { Value: '시험관리', Span: 2 }, { Value: '특급' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
      { Name: 'mngeAdvc', Header: [{}, {}, { Value: '중급' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
      { Name: 'expr', Header: [{}, { Value: '시험', Span: 4 }, { Value: '특급' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
      { Name: 'advc', Header: [{}, {}, { Value: '고급' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
      { Name: 'midl', Header: [{}, {}, { Value: '중급' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
      { Name: 'bgin', Header: [{}, {}, { Value: '초급' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
      { Name: 'elec', Header: [{ Value: '공공요금', Span: 3 }, { Value: '전기' }, { Value: 'Kwh' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
      { Name: 'water', Header: [{}, { Value: '상수도' }, { Value: 'm³' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
      { Name: 'gas', Header: [{}, { Value: '가스' }, { Value: 'm³' }], Type: "Float", Format:"#,##0.0", ColMerge: 0, RelWidth: 5 },
    ]
  },
  data: [
    { case1: '공통', case2: '토공 및 기초공사1', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: 'testExpense', case7: '', case8: '', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '' },
    { case1: '공통', case2: '토공 및 기초공사2', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: 'testExpense', case7: '', case8: '', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '' },
    { case1: '공통', case2: '토공 및 기초공사3', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: 'testExpense', case7: '', case8: '', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '' },
    { case1: '공통', case2: '토공 및 기초공사4', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: 'testExpense', case7: '', case8: '', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '' },
    { case1: '공통', case2: '토공 및 기초공사5', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: 'testExpense', case7: '', case8: '', case9: '', case10: '', case11: '', case12: '', case13: '', case14: '', case15: '' },
  ],
}

/* testAgency: SQMS_WS02_001_01 품질활동 > 시험관리 > 현장 Set-up (품질시험기관) */
export const testAgency = {
  options: {
    Cfg : {
      CanEdit : 1,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 3 },
      { Name: 'SEQ', Header: [{ Value: '번호' }], CanEdit : 0, RelWidth: 4 },
      { Name: 'testInsttName', Header: [{ Value: '시험기관명' }], CanEdit : 0, RelWidth: 24 },
      { Name: 'userNm', Header: [{ Value: '담당자명' }], CanEdit : 0, RelWidth: 24 },
      { Name: 'email', Header: [{ Value: 'E-mail' }], CanEdit : 0, RelWidth: 24 },
      { Name: 'cttpc', Header: [{ Value: '연락처' }], CanEdit : 0, RelWidth: 24 },
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'testInsttId', Visible: '0' },
    ]
  },
  data: [],
}

/* testSelect: SQMS_WS02_001_02 품질활동 > 시험관리 > 품질시험계획서(시험종목 선택) */
export const testSelect = {
  options: {
    Cfg : {
      SearchMode:2,
      NoVScroll: 0,
      CanEdit : 1,
      // DataMerge : 1,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', ColMerge: 0, CanSort: 0, RelWidth: 10 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]' }], ColMerge: 1, CanEdit: 0, RelWidth: 15 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]' }], ColMerge: 1, CanEdit: 0, RelWidth: 15 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]' }], Type: 'Lines', ColMerge: 1, CanEdit: 0, RelWidth: 20 },
      { Name: 'mainCodeId', Visible: '0' },
      { Name: 'midCodeId', Visible: '0' },
      { Name: 'subCodeId', Visible: '0' },
      { Name: 'revisionId', Visible: '0' },
      { Name: 'cratYn', Visible: '0' },
    ]
  },
  data: [
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '터파기', case5: '', case6: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '지반조사 (연약지반 등)', case5: '', case6: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '되메우기 및 구조물 뒷채움', case5: '', case6: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '말뚝', case5: '콘크리트 널 말뚝', case6: '' },
  ],
}

/* testPlanWrite: SQMS_WS02_001_02 품질활동 > 시험관리 > 품질시험계획서(시험계획서작성) */
export const testPlanWriteShow = {
  options: {
    Cfg : {
      SearchMode : 2,
      DataMerge : 3,
      NoVScroll : 0,
    },
    Cols: [
      // { Name: 'testResultMngtSeq', Header: [{ Value: '', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 },
      // { Name: 'chk', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, CanEdit: 1, RelWidth: 2 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 3 }], ColMerge: 1, CanEdit: 0, RelWidth: 8 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 3 }], ColMerge: 1, CanEdit: 0, RelWidth: 8 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 3 }], ColMerge: 1, CanEdit: 0, RelWidth: 8 },
      // { Name: 'standard', Header: [{ Value: '규격', RowSpan: 3 }], ColMerge: 1, CanEdit: 0, RelWidth: 6 },
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 3, Span: 2 }], RowMerge: 1, ColMerge: 1, CanEdit: 0, RelWidth: 8 },
      { Name: 'tstSbjNameLvl1', Type: "Text", RowMerge: 1, CanEdit: 0, RelWidth: 7 },
      { Name: 'ksStd', Header: [{ Value: '시험 방법', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testFreq', Header: [{ Value: '시험 빈도', RowSpan: 3 }], Type: "Lines", ColMerge: 1, CanEdit: 0, RelWidth: 8 },
      // { Name: 'testPlanVolm', Header: [{ Value: '시험 \n 계획 \n 물량', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 , Type:'Int' ,Format:"#,##0" },
      { Name: 'seperator', Visible: 0},
      // { Name: 'unit', Header: [{ Value: '단위', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'unit', Header: [{ Value: '시험 \n 계획 \n 물량', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testSum', Header: [{ Value: '시험계획 횟수', Span: 5 }, { Value: '합계', RowSpan: 2 }], Type: 'Int', ColMerge: 0, CanEdit: 0, Required: 1, RelWidth: 6 },
      { Name: 'testTypeSpt', Header: [{}, { Value: '시험 Type', Span: 3 }, { Value: '현장' }], Type: 'Int', ColMerge: 0, CanEdit: 0,  RelWidth: 6 },
      { Name: 'testTypeReqest', Header: [{}, {}, { Value: '의뢰' }], Type: 'Int', ColMerge: 0, CanEdit: 0,  RelWidth: 6 },
      { Name: 'testTypeFctry',  Header: [{}, {}, { Value: '공장' }], Type: 'Int', ColMerge: 0, CanEdit: 0, RelWidth: 6 },
      // { Name: 'testScreAltrtv', Header: [{}, { Value: '성적서 대체', RowSpan: 2 }], type: 'Int', ColMerge: 0, CanEdit: 0,   RelWidth: 6 },
      { Name: 'testScreAltrtv', Header: [{}, { Value: '성적서 대체', RowSpan: 2 }], Type: 'Bool',  ColMerge: 0, CanEdit: 0, TrueValue: 1, FalseValue: 0, RelWidth: 6 },
      { Name: 'usgstt', Header: [{ Value: '상태', RowSpan: 3 }], ColMerge: 0, CanEdit: 0, RelWidth: 6 },
    ]
  },
  data: [
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '', case16: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '입도', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '', case16: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '세립토 비율', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '', case16: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '밀도', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '', case16: '' },
  ],
}

/* testPlanWrite: SQMS_WS02_001_02 품질활동 > 시험관리 > 품질시험계획서(시험계획서작성) */
export const testPlanWriteEdit = {
  options: {
    Cfg : {
      NoVScroll : 0,
      CanEdit: 1,
    },
    Cols: [
      // { Name: 'testResultMngtSeq', Header: [{ Value: '', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 },
      // { Name: 'chk', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, CanEdit: 1, RelWidth: 2 },
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 6 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 3 }], CanEdit: 0, RelWidth: 8 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 3 }], CanEdit: 0, RelWidth: 8 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 3 }], CanEdit: 0, RelWidth: 8 },
      // { Name: 'standard', Header: [{ Value: '규격', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 3, Span: 2 }], RowMerge: 1, CanEdit: 0, RelWidth: 8 },
      { Name: 'tstSbjNameLvl1', Type: "Text", RowMerge: 1, CanEdit: 0, RelWidth: 7 },
      { Name: 'ksStd', Header: [{ Value: '시험 방법', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testFreq', Header: [{ Value: '시험 빈도', RowSpan: 3 }], Type: "Lines", CanEdit: 0, RelWidth: 8 },
      // { Name: 'testPlanVolm', Header: [{ Value: '시험 \n 계획 \n 물량', RowSpan: 3 }], CanEdit: 1, RelWidth: 6 , Type:'Int',Format:"#,##0"},
      // { Name: 'unit', Header: [{ Value: '단위', RowSpan: 3 }], CanEdit: 1, RelWidth: 6 },
      { Name: 'unit', Header: [{ Value: '시험 \n 계획 \n 물량', RowSpan: 3 }], CanEdit: 1, RelWidth: 6 },
      { Name: 'testSum', Header: [{ Value: '시험계획 횟수', Span: 5 }, { Value: '합계', RowSpan: 2 }], Type: 'Int', ColMerge: 0, CanEdit: 0, Required: 1, RelWidth: 6 },
      { Name: 'testTypeSpt', Header: [{}, { Value: '시험 Type', Span: 3 }, { Value: '현장' }], Type: 'Int', ColMerge: 0, CanEdit: 1,  RelWidth: 6 },
      { Name: 'testTypeReqest', Header: [{}, {}, { Value: '의뢰' }], Type: 'Int', ColMerge: 0, CanEdit: 1,  RelWidth: 6 },
      { Name: 'testTypeFctry',  Header: [{}, {}, { Value: '공장' }], Type: 'Int', ColMerge: 0, CanEdit: 1, RelWidth: 6 },
      // { Name: 'testScreAltrtv', Header: [{}, { Value: '성적서 대체', RowSpan: 2 }], type: 'Int',  ColMerge: 0, CanEdit: 1,   RelWidth: 6 },
      { Name: 'testScreAltrtv', Header: [{}, { Value: '성적서 대체', RowSpan: 2 }], Type: 'Bool',  ColMerge: 0, CanEdit: 1, TrueValue: 1, FalseValue: 0, RelWidth: 6 },
      { Name: 'usgstt', Header: [{ Value: '상태', RowSpan: 3 }], ColMerge: 0, CanEdit: 0, RelWidth: 6 },
      { Name: 'mainCodeId', Visible: '0' },
      { Name: 'midCodeId', Visible: '0' },
      { Name: 'subCodeId', Visible: '0' },
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'siteTstSbjDtlId', Visible: '0' },
      
    ]
  },
  data: [
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '함수비', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '', case16: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '입도', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '', case16: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '세립토 비율', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '', case16: '' },
    // { case1: '', case2: '공통', case3: '토공 및 기초공사', case4: '성토용 흙', case5: '', case6: '밀도', case7: 'KS F 2306', case8: '토취장 마다 재질변화시마다', case9: '', case10: '', case11: '0', case12: '', case13: '', case14: '', case15: '', case16: '' },
  ],
}

/* HistoryLoad: SQMS_WS02_001_02 품질활동 > 시험관리 > 품질시험계획서 > History 불러오기 팝업 */
export const HistoryLoad = { 
  options: {
    Cfg: {
      CanEdit: 0,
      NoVScroll: 0,
    },
    Cols: [
      { Name: 'revisionId', Header: [{ Value: '번호' }], RelWidth: 10 },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 30 },
      { Name: 'upUser', Header: [{ Value: '수정한 사람' }], RelWidth: 20 },
      { Name: 'upDttm', Header: [{ Value: '수정 일시' }], CustomFormat: function(v) {
        let today = new Date(v);
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let dateString = year + '-' + month  + '-' + day;
        let hours = ('0' + today.getHours()).slice(-2); 
        let minutes = ('0' + today.getMinutes()).slice(-2);
        let seconds = ('0' + today.getSeconds()).slice(-2); 
        let timeString = hours + ':' + minutes  + ':' + seconds;
        return `${dateString} ${timeString}`;
      }, RelWidth: 20 },
      { Name: 'comment', Header: [{ Value: '비고' }], RelWidth: 20 },
    ]
    // inDttm: "2022-03-29T00:47:25.000+00:00"
  },
  data: [
    { case1: '1', case2: '성토용 흙 / 지반조사 등록', case3: '김현대', case4: '2021-11-14 11:23:40', case5: '' },
    { case1: '2', case2: '성토용 흙 / 지반조사 등록', case3: '김현대', case4: '2021-11-14 11:23:40', case5: '' },
    { case1: '3', case2: '성토용 흙 / 지반조사 등록', case3: '김현대', case4: '2021-11-14 11:23:40', case5: '' },
  ],
}

/* TestPlanDetail: SQMS_WS02_001_02_01 품질활동 > 시험관리 > 품질시험계획서(타 프로젝트 데이터 가져오기) */
export const TestPlanDetail = {
  options: {
    Cfg: {
      NoVScroll: 0,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 3 }], Type: 'Bool', CanEdit: 1, CanSort: 0, RelWidth: 6 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 3 }], ColMerge: 1,  CanEdit: 0, RelWidth: 8 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 3 }], ColMerge: 1, CanEdit: 0, RelWidth: 8 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 3 }], ColMerge: 1, CanEdit: 0, RelWidth: 8 },
      { Name: 'standard', Header: [{ Value: '규격', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 3, Span: 2 }], CanEdit: 0, RelWidth: 8 },
      { Name: 'tstSbjNameLvl1', Type: "Text", CanEdit: 0, RelWidth: 7 },
      { Name: 'ksStd', Header: [{ Value: '시험 방법', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testFreq', Header: [{ Value: '시험 빈도', RowSpan: 3 }], CanEdit: 0, ColMerge: 1, RelWidth: 8 },
      { Name: 'testPlanVolm', Header: [{ Value: '시험 \n 계획 \n 물량', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'unit', Header: [{ Value: '단위', RowSpan: 3 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testSum', Header: [{ Value: '시험계획 횟수', Span: 5 }, { Value: '합계', RowSpan: 2 }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testTypeSpt', Header: [{}, { Value: '시험 Type', Span: 3 }, { Value: '현장' }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testTypeReqest', Header: [{}, {}, { Value: '의뢰' }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testTypeFctry', Header: [{}, {}, { Value: '공장' }], CanEdit: 0, RelWidth: 6 },
      { Name: 'testScreAltrtv', Header: [{}, { Value: '성적서 대체', RowSpan: 2 }], CanEdit: 0, RelWidth: 6 },
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
  ],
}

/* testResult: SQMS_WS02_001_03 품질활동 > 시험관리 > 시험결과관리 > My Site */
export const testResult = {
  options: {
    Cfg: {
      NoVScroll: false,
      DataMerge: 5,
      FixPrevColumnMerge: 'testResultMngtSeq',   // 열조건 단위 머지
      // NoDataMessage:3,
    },
    Cols: [
      { Name: 'testResultMngtSeq', Header: [{ Value: '', RowSpan: 2 }], CanEdit: 0, RelWidth: 5, Visible: '0'},
      { Name: 'chk', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, CanEdit: 1, RelWidth: 2 },
      { Name: 'docNo', Header: [{ Value: '문서번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 9 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'standard', Header: [{ Value: '규격', RowSpan: 2 }], ColMerge: 0, CanEdit: 0, RelWidth: 4 , Visible: '0'},
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 2 , Span: 2}] ,RowMerge : 1 , ColMerge: 1, CanEdit: 0, RelWidth: 4 },
      { Name: 'tstSbjNameLvl1', Header: [{ Value: '시험 종목', RowSpan: 2}] ,RowMerge : 1, ColMerge: 1, CanEdit: 0, RelWidth: 4 },
      { Name: 'testTypeName', Header: [{ Value: '시험 TYPE', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'registDate', Header: [{ Value: '등록일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'case1', Visible: '0' },
      //{ Name: 'rceptDate', Header: [{ Value: '의뢰시험 \n 접수일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'case2', Visible: '0' },
      { Name: 'testDate', Header: [{ Value: '시험일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'case3', Visible: '0' },
      { Name: 'comptDate', Header: [{ Value: '완료일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'sploreCo', Header: [{ Value: '시험 결과 판정', Span: 3 }, { Value: '시료 \n 개수' }], CanEdit: 0, RelWidth: 3 },
      { Name: 'testPsexam', Header: [{}, { Value: '합격 \n 시료(수)' }], ColMerge: 0, CanEdit: 0, RelWidth: 3 },
      { Name: 'testDsqlfc', Header: [{}, { Value: '불합격 \n 시료(수)' }], ColMerge: 0, CanEdit: 0, RelWidth: 3 },
      // { Name: 'case17', Header: [{}, { Value: '최종 \n 합부' }], RelWidth: 3 },
      

      { Name: 'registStatus', Header: [{ Value: '진행 상황', Span: 4 }, { Value: '등록' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'reqestStatus', Header: [{}, { Value: '의뢰/접수' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'testStatus', Header: [{}, { Value: '시험' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'setleStatus', Header: [{}, { Value: '결재' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },


      { Name: 'testInfo', Header: [{ Value: '시험 \n 정보', RowSpan: 2 }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'processStatus', Visible: '0' },
      { Name: 'rqstdoc', Header: [{ Value: '의뢰서', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_write'>작성</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'realProgrsStatus', Visible: '0' },
      { Name: 'resultDetail', Header: [{ Value: '결과 \n 상세', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'resultRecomDocNo', Visible: '0' },
      { Name: 'splorePhoto', Header: [{ Value: '시료 \n 사진', RowSpan: 2 }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'rqstdocRecomDocNo', Visible: '0' },
      { Name: 'screDoc', Header: [{ Value: '성적서', RowSpan: 2 }], Format: {"1": "<button type='button' class='btn_file no_text'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
    ]
  },
  data: [
    {
      delYn: null, inUser: null, inDttm: null, upUser: null, upDttm: null, inUserName: null, upUserName: null, loginId: null, searchValue: null, searchName: null, searchStartDt: null, searchEndDt: null, siteMstrId: null, codeType: null, lang: null, status: null, tabStatus: null, projNm: "화)TD전개 합리화공사", testSubject: null, testDateFr: null, testDateTo: null, tstSbjDtlId: null, testResultMngtSeq: "1", nextTestResultMngtSeq: null, testSubjectSeq: null, rqstdocRecomDocNo: null, resultRecomDocNo: null, docNo: 'aaa-bbb-ccc', mainCodeId: "MNCD_0000000004", mainName: "공통", midCodeId: "MDCD_0000000001", midName: "토공 및 기초공사", subCodeId: "SBCD_0000000010", subName: "성토용 흙", standard: "0", tstSbjDtlName: "입도", tstSbjNameLvl1: "입도", tstSbjNameLvl2: "입도", tstSbjNameLvl3: "입도", ksStd: "KS F 2331", testType: null, testTypeName: null, makrName: null, pickDate: null, makrNation: null, pickPsitn: null, pickChrgJob: null, pickName: null, sprvisnPsitn: null, sprvisnChrgJob: null, sprvisnName: null, place: null, stdr: null, usePurps: null, cmcqRm: null, registDate: "2022-04-08", rceptDate: null, testDate: null, comptDate: null, testPsexam: "0", testDsqlfc: "0", lastJdgmnt: "판정중", registStatus: "S", reqestStatus: null, testStatus: null, setleStatus: null, resultProgrsStatus: "TTRG", testInfo: "S", rqstdoc: null, resultDetail: null, splorePhoto: "", screDoc: "", testInstt: null, testInsttName: null, sploreCo: 3, sploreQy: 0, apnrtCnstrctQy: 0, useYn: null, userId: null, listData: null
    },
    {
      delYn: null, inUser: null, inDttm: null, upUser: null, upDttm: null, inUserName: null, upUserName: null, loginId: null, searchValue: null, searchName: null, searchStartDt: null, searchEndDt: null, siteMstrId: null, codeType: null, lang: null, status: null, tabStatus: null, projNm: "화)TD전개 합리화공사", testSubject: null, testDateFr: null, testDateTo: null, tstSbjDtlId: null, testResultMngtSeq: "2", nextTestResultMngtSeq: null, testSubjectSeq: null, rqstdocRecomDocNo: null, resultRecomDocNo: null, docNo: 'aaa-bbb-ccc', mainCodeId: "MNCD_0000000004", mainName: "공통", midCodeId: "MDCD_0000000001", midName: "토공 및 기초공사", subCodeId: "SBCD_0000000011", subName: "성토용 흙", standard: "0", tstSbjDtlName: "입도", tstSbjNameLvl1: "입도", tstSbjNameLvl2: "입도", tstSbjNameLvl3: "입도", ksStd: "KS F 2331", testType: null, testTypeName: null, makrName: null, pickDate: null, makrNation: null, pickPsitn: null, pickChrgJob: null, pickName: null, sprvisnPsitn: null, sprvisnChrgJob: null, sprvisnName: null, place: null, stdr: null, usePurps: null, cmcqRm: null, registDate: "2022-04-08", rceptDate: null, testDate: null, comptDate: null, testPsexam: "0", testDsqlfc: "0", lastJdgmnt: "판정중", registStatus: "S", reqestStatus: null, testStatus: null, setleStatus: null, resultProgrsStatus: "RQPR", testInfo: "S", rqstdoc: null, resultDetail: null, splorePhoto: "", screDoc: "", testInstt: null, testInsttName: null, sploreCo: 3, sploreQy: 0, apnrtCnstrctQy: 0, useYn: null, userId: null, listData: null
    },
    {
      delYn: null, inUser: null, inDttm: null, upUser: null, upDttm: null, inUserName: null, upUserName: null, loginId: null, searchValue: null, searchName: null, searchStartDt: null, searchEndDt: null, siteMstrId: null, codeType: null, lang: null, status: null, tabStatus: null, projNm: "화)TD전개 합리화공사", testSubject: null, testDateFr: null, testDateTo: null, tstSbjDtlId: null, testResultMngtSeq: "3", nextTestResultMngtSeq: null, testSubjectSeq: null, rqstdocRecomDocNo: null, resultRecomDocNo: null, docNo: 'aaa-bbb-ccc', mainCodeId: "MNCD_0000000004", mainName: "공통", midCodeId: "MDCD_0000000001", midName: "토공 및 기초공사", subCodeId: "SBCD_0000000012", subName: "성토용 흙", standard: "0", tstSbjDtlName: "입도", tstSbjNameLvl1: "입도", tstSbjNameLvl2: "입도", tstSbjNameLvl3: "입도", ksStd: "KS F 2331", testType: null, testTypeName: null, makrName: null, pickDate: null, makrNation: null, pickPsitn: null, pickChrgJob: null, pickName: null, sprvisnPsitn: null, sprvisnChrgJob: null, sprvisnName: null, place: null, stdr: null, usePurps: null, cmcqRm: null, registDate: "2022-04-08", rceptDate: null, testDate: '2022-04-12', comptDate: null, testPsexam: "0", testDsqlfc: "0", lastJdgmnt: "판정중", registStatus: "S", reqestStatus: null, testStatus: null, setleStatus: null, resultProgrsStatus: "TTRG", testInfo: "S", rqstdoc: null, resultDetail: null, splorePhoto: "", screDoc: "", testInstt: null, testInsttName: null, sploreCo: 3, sploreQy: 0, apnrtCnstrctQy: 0, useYn: null, userId: null, listData: null
    },
    {
      delYn: null, inUser: null, inDttm: null, upUser: null, upDttm: null, inUserName: null, upUserName: null, loginId: null, searchValue: null, searchName: null, searchStartDt: null, searchEndDt: null, siteMstrId: null, codeType: null, lang: null, status: null, tabStatus: null, projNm: "화)TD전개 합리화공사", testSubject: null, testDateFr: null, testDateTo: null, tstSbjDtlId: null, testResultMngtSeq: "4", nextTestResultMngtSeq: null, testSubjectSeq: null, rqstdocRecomDocNo: null, resultRecomDocNo: null, docNo: 'aaa-bbb-ccc', mainCodeId: "MNCD_0000000004", mainName: "공통", midCodeId: "MDCD_0000000001", midName: "토공 및 기초공사", subCodeId: "SBCD_0000000013", subName: "성토용 흙", standard: "0", tstSbjDtlName: "입도", tstSbjNameLvl1: "입도", tstSbjNameLvl2: "입도", tstSbjNameLvl3: "입도", ksStd: "KS F 2331", testType: null, testTypeName: null, makrName: null, pickDate: null, makrNation: null, pickPsitn: null, pickChrgJob: null, pickName: null, sprvisnPsitn: null, sprvisnChrgJob: null, sprvisnName: null, place: null, stdr: null, usePurps: null, cmcqRm: null, registDate: "2022-04-08", rceptDate: null, testDate: '2022-04-12', comptDate: null, testPsexam: "0", testDsqlfc: "0", lastJdgmnt: "판정중", registStatus: "S", reqestStatus: null, testStatus: null, setleStatus: null, resultProgrsStatus: "RQRP", testInfo: "S", rqstdoc: null, resultDetail: null, splorePhoto: "", screDoc: "", testInstt: null, testInsttName: null, sploreCo: 3, sploreQy: 0, apnrtCnstrctQy: 0, useYn: null, userId: null, listData: null
    },
    {
      delYn: null, inUser: null, inDttm: null, upUser: null, upDttm: null, inUserName: null, upUserName: null, loginId: null, searchValue: null, searchName: null, searchStartDt: null, searchEndDt: null, siteMstrId: null, codeType: null, lang: null, status: null, tabStatus: null, projNm: "화)TD전개 합리화공사", testSubject: null, testDateFr: null, testDateTo: null, tstSbjDtlId: null, testResultMngtSeq: "8", nextTestResultMngtSeq: null, testSubjectSeq: null, rqstdocRecomDocNo: null, resultRecomDocNo: null, docNo: 'aaa-bbb-ccc', mainCodeId: "MNCD_0000000004", mainName: "공통", midCodeId: "MDCD_0000000001", midName: "토공 및 기초공사", subCodeId: "SBCD_0000000014", subName: "성토용 흙", standard: "0", tstSbjDtlName: "입도", tstSbjNameLvl1: "입도", tstSbjNameLvl2: "입도", tstSbjNameLvl3: "입도", ksStd: "KS F 2331", testType: null, testTypeName: null, makrName: null, pickDate: null, makrNation: null, pickPsitn: null, pickChrgJob: null, pickName: null, sprvisnPsitn: null, sprvisnChrgJob: null, sprvisnName: null, place: null, stdr: null, usePurps: null, cmcqRm: null, registDate: "2022-04-08", rceptDate: null, testDate: '2022-04-12', comptDate: null, testPsexam: "0", testDsqlfc: "0", lastJdgmnt: "판정중", registStatus: "S", reqestStatus: null, testStatus: null, setleStatus: null, resultProgrsStatus: "RQRA", testInfo: "S", rqstdoc: null, resultDetail: null, splorePhoto: "", screDoc: "", testInstt: null, testInsttName: null, sploreCo: 3, sploreQy: 0, apnrtCnstrctQy: 0, useYn: null, userId: null, listData: null
    },
    {
      delYn: null, inUser: null, inDttm: null, upUser: null, upDttm: null, inUserName: null, upUserName: null, loginId: null, searchValue: null, searchName: null, searchStartDt: null, searchEndDt: null, siteMstrId: null, codeType: null, lang: null, status: null, tabStatus: null, projNm: "화)TD전개 합리화공사", testSubject: null, testDateFr: null, testDateTo: null, tstSbjDtlId: null, testResultMngtSeq: "6", nextTestResultMngtSeq: null, testSubjectSeq: null, rqstdocRecomDocNo: null, resultRecomDocNo: null, docNo: 'aaa-bbb-ccc', mainCodeId: "MNCD_0000000004", mainName: "공통", midCodeId: "MDCD_0000000001", midName: "토공 및 기초공사", subCodeId: "SBCD_0000000015", subName: "성토용 흙", standard: "0", tstSbjDtlName: "입도", tstSbjNameLvl1: "입도", tstSbjNameLvl2: "입도", tstSbjNameLvl3: "입도", ksStd: "KS F 2331", testType: null, testTypeName: null, makrName: null, pickDate: null, makrNation: null, pickPsitn: null, pickChrgJob: null, pickName: null, sprvisnPsitn: null, sprvisnChrgJob: null, sprvisnName: null, place: null, stdr: null, usePurps: null, cmcqRm: null, registDate: "2022-04-08", rceptDate: null, testDate: null, comptDate: null, testPsexam: "0", testDsqlfc: "0", lastJdgmnt: "판정중", registStatus: "S", reqestStatus: null, testStatus: null, setleStatus: null, resultProgrsStatus: "TTPR", testInfo: "S", rqstdoc: null, resultDetail: null, splorePhoto: "", screDoc: "", testInstt: null, testInsttName: null, sploreCo: 3, sploreQy: 0, apnrtCnstrctQy: 0, useYn: null, userId: null, listData: null
    },
    {
      delYn: null, inUser: null, inDttm: null, upUser: null, upDttm: null, inUserName: null, upUserName: null, loginId: null, searchValue: null, searchName: null, searchStartDt: null, searchEndDt: null, siteMstrId: null, codeType: null, lang: null, status: null, tabStatus: null, projNm: "화)TD전개 합리화공사", testSubject: null, testDateFr: null, testDateTo: null, tstSbjDtlId: null, testResultMngtSeq: "7", nextTestResultMngtSeq: null, testSubjectSeq: null, rqstdocRecomDocNo: null, resultRecomDocNo: null, docNo: 'aaa-bbb-ccc', mainCodeId: "MNCD_0000000004", mainName: "공통", midCodeId: "MDCD_0000000001", midName: "토공 및 기초공사", subCodeId: "SBCD_0000000016", subName: "성토용 흙", standard: "0", tstSbjDtlName: "입도", tstSbjNameLvl1: "입도", tstSbjNameLvl2: "입도", tstSbjNameLvl3: "입도", ksStd: "KS F 2331", testType: null, testTypeName: null, makrName: null, pickDate: null, makrNation: null, pickPsitn: null, pickChrgJob: null, pickName: null, sprvisnPsitn: null, sprvisnChrgJob: null, sprvisnName: null, place: null, stdr: null, usePurps: null, cmcqRm: null, registDate: "2022-04-08", rceptDate: null, testDate: null, comptDate: null, testPsexam: "0", testDsqlfc: "0", lastJdgmnt: "판정중", registStatus: "S", reqestStatus: null, testStatus: null, setleStatus: null, resultProgrsStatus: "RGPR", testInfo: "S", rqstdoc: null, resultDetail: null, splorePhoto: "", screDoc: "", testInstt: null, testInsttName: null, sploreCo: 3, sploreQy: 0, apnrtCnstrctQy: 0, useYn: null, userId: null, listData: null
    },
    {
      delYn: null, inUser: null, inDttm: null, upUser: null, upDttm: null, inUserName: null, upUserName: null, loginId: null, searchValue: null, searchName: null, searchStartDt: null, searchEndDt: null, siteMstrId: null, codeType: null, lang: null, status: null, tabStatus: null, projNm: "화)TD전개 합리화공사", testSubject: null, testDateFr: null, testDateTo: null, tstSbjDtlId: null, testResultMngtSeq: "8", nextTestResultMngtSeq: null, testSubjectSeq: null, rqstdocRecomDocNo: null, resultRecomDocNo: null, docNo: 'aaa-bbb-ccc', mainCodeId: "MNCD_0000000004", mainName: "공통", midCodeId: "MDCD_0000000001", midName: "토공 및 기초공사", subCodeId: "SBCD_0000000017", subName: "성토용 흙", standard: "0", tstSbjDtlName: "입도", tstSbjNameLvl1: "입도", tstSbjNameLvl2: "입도", tstSbjNameLvl3: "입도", ksStd: "KS F 2331", testType: null, testTypeName: null, makrName: null, pickDate: null, makrNation: null, pickPsitn: null, pickChrgJob: null, pickName: null, sprvisnPsitn: null, sprvisnChrgJob: null, sprvisnName: null, place: null, stdr: null, usePurps: null, cmcqRm: null, registDate: "2022-04-08", rceptDate: null, testDate: "2022-04-08", comptDate: null, testPsexam: "0", testDsqlfc: "0", lastJdgmnt: "판정중", registStatus: "S", reqestStatus: null, testStatus: null, setleStatus: null, resultProgrsStatus: "APRV", testInfo: "S", rqstdoc: null, resultDetail: null, splorePhoto: "", screDoc: "", testInstt: null, testInsttName: null, sploreCo: 3, sploreQy: 0, apnrtCnstrctQy: 0, useYn: null, userId: null, listData: null
    },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0005', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관1', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '시험 등록', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0015', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관1', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '시험 등록', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0008', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관1', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '시험 등록', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0005', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관2', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '의뢰 중', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0025', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관2', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '의뢰 중', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0035', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관3', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '의뢰서 접수 중', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0045', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관4', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '의뢰서접수완료', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0105', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관4', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '의뢰서접수완료', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0205', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관4', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '의뢰서접수완료', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-1105', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '완료', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0305', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    // { case1: '', case2: 'CUKR1303-의뢰-2021-0025', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: '의뢰시험', case9: '2021-12-01', case10: '', case11: '', case12: '', case13: '', case14: '2', case15: '', case16: '', /* case17: '', */ case18: '', case19: '', case20: '', case21: '', case22: '1', case23: '0', case24: '0', case25: '1', case26: '1' },
    
  ],
}

/* testResult: SQMS_WS02_001_03 품질활동 > 시험관리 > 시험결과관리 > My Site */
export const testResultHidden = {
  options: {
    Cfg: {
      NoVScroll: false,
      DataMerge: 5,
      FixPrevColumnMerge: 'testResultMngtSeq',   // 열조건 단위 머지
      // NoDataMessage:3,
    },
    Cols: [
      { Name: 'testResultMngtSeq', Header: [{ Value: '', RowSpan: 2 }], CanEdit: 0, RelWidth: 5, Visible: '0'},
      { Name: 'chk', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, CanEdit: 1, RelWidth: 2 },
      { Name: 'docNo', Header: [{ Value: '문서번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 9 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'standard', Header: [{ Value: '규격', RowSpan: 2 }], ColMerge: 0, CanEdit: 0, RelWidth: 4 , Visible: '0'},
      // { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 2 , Span: 2}] ,RowMerge : 1 , ColMerge: 1, CanEdit: 0, RelWidth: 4 },
      // { Name: 'tstSbjNameLvl1', Header: [{ Value: '시험 종목', RowSpan: 2}] ,RowMerge : 1, ColMerge: 1, CanEdit: 0, RelWidth: 4 },
      { Name: 'testTypeName', Header: [{ Value: '시험 TYPE', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'registDate', Header: [{ Value: '등록일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'case1', Visible: '0' },
      //{ Name: 'rceptDate', Header: [{ Value: '의뢰시험 \n 접수일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'case2', Visible: '0' },
      { Name: 'testDate', Header: [{ Value: '시험일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'case3', Visible: '0' },
      { Name: 'comptDate', Header: [{ Value: '완료일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      // { Name: 'sploreCo', Header: [{ Value: '시험 결과 판정', Span: 3 }, { Value: '시료 \n 개수' }], CanEdit: 0, RelWidth: 3 },
      // { Name: 'testPsexam', Header: [{}, { Value: '합격 \n 시료(수)' }], ColMerge: 0, CanEdit: 0, RelWidth: 3 },
      // { Name: 'testDsqlfc', Header: [{}, { Value: '불합격 \n 시료(수)' }], ColMerge: 0, CanEdit: 0, RelWidth: 3 },
      // { Name: 'case17', Header: [{}, { Value: '최종 \n 합부' }], RelWidth: 3 },
      

      { Name: 'registStatus', Header: [{ Value: '진행 상황', Span: 4 }, { Value: '등록' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'reqestStatus', Header: [{}, { Value: '의뢰/접수' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'testStatus', Header: [{}, { Value: '시험' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'setleStatus', Header: [{}, { Value: '결재' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },


      { Name: 'testInfo', Header: [{ Value: '시험 \n 정보', RowSpan: 2 }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'processStatus', Visible: '0' },
      { Name: 'rqstdoc', Header: [{ Value: '의뢰서', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_write'>작성</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'realProgrsStatus', Visible: '0' },
      { Name: 'resultDetail', Header: [{ Value: '결과 \n 상세', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'resultRecomDocNo', Visible: '0' },
      { Name: 'splorePhoto', Header: [{ Value: '시료 \n 사진', RowSpan: 2 }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'rqstdocRecomDocNo', Visible: '0' },
      { Name: 'screDoc', Header: [{ Value: '성적서', RowSpan: 2 }], Format: {"1": "<button type='button' class='btn_file no_text'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
    ]
  },
  data: []
}


/* testResult2: SQMS_WS02_001_03 품질활동 > 시험관리 > 시험결과관리 > All Sites */
export const testResult2 = {
  options: {
    Cfg: {
      NoVScroll: false,
      DataMerge: 1,
      FixPrevColumnMerge: 'testResultMngtSeq',   // 열조건 단위 머지
      // NoDataMessage:3,
    },
    Cols: [
      { Name: 'testResultMngtSeq', Header: [{ Value: '번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 },
      //{ Name: 'chk', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, ColMerge: 1, CanEdit: 1, RelWidth: 2 },
      { Name: 'projNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], CanEdit: 0, RelWidth: 8 },
      { Name: 'docNo', Header: [{ Value: '문서번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 7 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'standard', Header: [{ Value: '규격', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 , Visible: '0'},
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'testTypeName', Header: [{ Value: '시험 TYPE', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'registDate', Header: [{ Value: '등록일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      //{ Name: 'rceptDate', Header: [{ Value: '의뢰시험 \n 접수일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'testDate', Header: [{ Value: '시험일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      // { Name: 'case13', Header: [{ Value: '등록일', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'sploreCo', Header: [{ Value: '시험 결과 판정', Span: 3 }, { Value: '시료 \n 개수' }], CanEdit: 0, RelWidth: 3 },
      { Name: 'testPsexam', Header: [{}, { Value: '합격 \n 시료(수)' }], CanEdit: 0, RelWidth: 3 },
      { Name: 'testDsqlfc', Header: [{}, { Value: '불합격 \n 시료(수)' }], CanEdit: 0, RelWidth: 3 },
      // { Name: 'case17', Header: [{}, { Value: '최종 \n 합부' }], RelWidth: 3 },
      { Name: 'registStatus', Header: [{ Value: '진행 상황', Span: 4 }, { Value: '등록' }], CanEdit: 0, Type: 'Html', RelWidth: 4 },
      { Name: 'reqestStatus', Header: [{}, { Value: '의뢰/접수' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'testStatus', Header: [{}, { Value: '시험' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'setleStatus', Header: [{}, { Value: '결재' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'testInfo', Header: [{ Value: '시험 \n 정보', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 4 },
      { Name: 'rqstdoc', Header: [{ Value: '의뢰서', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 4 },
      { Name: 'resultDetail', Header: [{ Value: '결과 \n 상세', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 4 },
      { Name: 'splorePhoto', Header: [{ Value: '시료 \n 사진', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"},  RelWidth: 4 },
      { Name: 'screDoc', Header: [{ Value: '성적서', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_file no_text'>보기</button>"},  RelWidth: 4 },
    ]
  },
  data: [
    // { case1: '', case2: '고양 덕은 복합시설 공사', case3: 'CUKR1303-의뢰-2021-0005', case4: '공통', case5: '가설기자재', case6: '강관비계용 부재', case7: '비계용 강관', case8: '인장하중', case9: '의뢰시험', case10: '2021-12-01', case11: '2021-12-12', case12: '2021-12-12', case13: '2021-12-12', case14: '2', case15: '2', case16: '0', /* case17: '합격', */ case18: '완료', case19: '', case20: '', case21: '', case22: '1', case23: '1', case24: '1', case25: '1', case26: '1' },
    // { case1: '', case2: '고양 덕은 복합시설 공사', case3: 'CUKR1303-의뢰-2021-0005', case4: '공통', case5: '가설기자재', case6: '강관비계용 부재', case7: '비계용 강관', case8: '인장하중', case9: '의뢰시험', case10: '2021-12-01', case11: '2021-12-12', case12: '2021-12-12', case13: '2021-12-12', case14: '2', case15: '2', case16: '0', /* case17: '합격', */ case18: '완료', case19: '', case20: '', case21: '', case22: '1', case23: '1', case24: '1', case25: '1', case26: '1' },
    // { case1: '', case2: '고양 덕은 복합시설 공사', case3: 'CUKR1303-의뢰-2021-0005', case4: '공통', case5: '가설기자재', case6: '강관비계용 부재', case7: '비계용 강관', case8: '인장하중', case9: '의뢰시험', case10: '2021-12-01', case11: '2021-12-12', case12: '2021-12-12', case13: '2021-12-12', case14: '2', case15: '2', case16: '0', /* case17: '합격', */ case18: '완료', case19: '', case20: '', case21: '', case22: '1', case23: '1', case24: '1', case25: '1', case26: '1' },
    // { case1: '', case2: '고양 덕은 복합시설 공사', case3: 'CUKR1303-의뢰-2021-0005', case4: '공통', case5: '가설기자재', case6: '강관비계용 부재', case7: '비계용 강관', case8: '인장하중', case9: '의뢰시험', case10: '2021-12-01', case11: '2021-12-12', case12: '2021-12-12', case13: '2021-12-12', case14: '2', case15: '2', case16: '0', /* case17: '합격', */ case18: '완료', case19: '', case20: '', case21: '', case22: '1', case23: '1', case24: '1', case25: '1', case26: '1' },
    // { case1: '', case2: '고양 덕은 복합시설 공사', case3: 'CUKR1303-의뢰-2021-0005', case4: '공통', case5: '가설기자재', case6: '강관비계용 부재', case7: '비계용 강관', case8: '인장하중', case9: '의뢰시험', case10: '2021-12-01', case11: '2021-12-12', case12: '2021-12-12', case13: '2021-12-12', case14: '2', case15: '2', case16: '0', /* case17: '합격', */ case18: '완료', case19: '', case20: '', case21: '', case22: '1', case23: '1', case24: '1', case25: '1', case26: '1' },
    // { case1: '', case2: '고양 덕은 복합시설 공사', case3: 'CUKR1303-의뢰-2021-0005', case4: '공통', case5: '가설기자재', case6: '강관비계용 부재', case7: '비계용 강관', case8: '인장하중', case9: '의뢰시험', case10: '2021-12-01', case11: '2021-12-12', case12: '2021-12-12', case13: '2021-12-12', case14: '2', case15: '2', case16: '0', /* case17: '합격', */ case18: '완료', case19: '', case20: '', case21: '', case22: '1', case23: '1', case24: '1', case25: '1', case26: '1' },
    
  ],
}

/* testResult2: SQMS_WS02_001_03 품질활동 > 시험관리 > 시험결과관리 > All Sites */
export const testResult2Hidden = {
  options: {
    Cfg: {
      NoVScroll: false,
      DataMerge: 1,
      FixPrevColumnMerge: 'testResultMngtSeq',   // 열조건 단위 머지
      // NoDataMessage:3,
    },
    Cols: [
      { Name: 'testResultMngtSeq', Header: [{ Value: '번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 },
      //{ Name: 'chk', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, ColMerge: 1, CanEdit: 1, RelWidth: 2 },
      { Name: 'projNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], CanEdit: 0, RelWidth: 8 },
      { Name: 'docNo', Header: [{ Value: '문서번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 7 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'standard', Header: [{ Value: '규격', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 , Visible: '0'},
      // { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'testTypeName', Header: [{ Value: '시험 TYPE', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'registDate', Header: [{ Value: '등록일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      //{ Name: 'rceptDate', Header: [{ Value: '의뢰시험 \n 접수일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      { Name: 'testDate', Header: [{ Value: '시험일', RowSpan: 2 }], CanEdit: 0, RelWidth: 4 },
      // { Name: 'case13', Header: [{ Value: '등록일', RowSpan: 2 }], RelWidth: 4 },
      // { Name: 'sploreCo', Header: [{ Value: '시험 결과 판정', Span: 3 }, { Value: '시료 \n 개수' }], CanEdit: 0, RelWidth: 3 },
      // { Name: 'testPsexam', Header: [{}, { Value: '합격 \n 시료(수)' }], CanEdit: 0, RelWidth: 3 },
      // { Name: 'testDsqlfc', Header: [{}, { Value: '불합격 \n 시료(수)' }], CanEdit: 0, RelWidth: 3 },
      // { Name: 'case17', Header: [{}, { Value: '최종 \n 합부' }], RelWidth: 3 },
      { Name: 'registStatus', Header: [{ Value: '진행 상황', Span: 4 }, { Value: '등록' }], CanEdit: 0, Type: 'Html', RelWidth: 4 },
      { Name: 'reqestStatus', Header: [{}, { Value: '의뢰/접수' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'testStatus', Header: [{}, { Value: '시험' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'setleStatus', Header: [{}, { Value: '결재' }], Type: 'Html', CanEdit: 0, RelWidth: 4 },
      { Name: 'testInfo', Header: [{ Value: '시험 \n 정보', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 4 },
      { Name: 'rqstdoc', Header: [{ Value: '의뢰서', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 4 },
      { Name: 'resultDetail', Header: [{ Value: '결과 \n 상세', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 4 },
      { Name: 'splorePhoto', Header: [{ Value: '시료 \n 사진', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"},  RelWidth: 4 },
      { Name: 'screDoc', Header: [{ Value: '성적서', RowSpan: 2 }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_file no_text'>보기</button>"},  RelWidth: 4 },
    ]
  },
  data: [],
}

/* testWrite: SQMS_WS02_001_04 품질활동 > 시험관리 > 시험결과관리 > 시험 등록 */
export const testWrite = {
  options: {
    Cfg: {
      NoVScroll: false,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', ColMerge: 0, CanSort: 0, CanEdit: 1, RelWidth: 5 },
      { Name: 'mainName', Header: [{ Value: '구분' }], CanEdit: 0, RelWidth: 15 },
      { Name: 'midName', Header: [{ Value: '공종' }], CanEdit: 0, RelWidth: 15 },
      { Name: 'subName', Header: [{ Value: '종별' }], CanEdit: 0, RelWidth: 20 },
      { Name: 'standard', Header: [{ Value: '규격' }], CanEdit: 0, RelWidth: 15 , Visible: '0'},
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', Span: 2 }], CanEdit: 0, RelWidth: 15 },
      { Name: 'tstSbjNameLvl1', CanEdit: 0, RelWidth: 15 },
      { Name: 'testTypeName', Header: [{ Value: '시험 Type' }], Visible: '0', CanEdit: 0, RelWidth: 15 ,ColMerge: 0},
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'testResultMngtSeq', Visible: '0' },
      { Name: 'testSubjectSeq', Visible: '0' },
      { Name: 'subCodeId', Visible: '0' },
      { Name: 'siteTstSbjDtlId', Visible: '0' },
      { Name: 'testType', Header: [{ Value: '시험 Type' }], Visible: '0' , CanEdit: 1, ColMerge: 0},      
      { Name: 'revisionId', Header: [{ Value: 'Rev' }], Visible: '0',RelWidth: 10},
      // { Name: 'tstSbjNameLvl1', Visible: '0' },
      { Name: 'tstSbjNameLvl2', Visible: '0' },
      { Name: 'tstSbjNameLvl3', Visible: '0' },
      { Name: 'testTypeSpt', Visible: '0' },
      { Name: 'testTypeReqest', Visible: '0' },
      { Name: 'testTypeFctry', Visible: '0' },
      { Name: 'mainCodeId', Visible: '0' },
      { Name: 'midCodeId', Visible: '0' },
    ]
  },
  data: [
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
  ],
}

/* testDetail: SQMS_WS02_001_05 품질활동 > 시험관리 > 시험결과관리 > 시험 상세 */
export const testDetail = {
  options: {
    Cfg: {
      DataMerge : 2,
      CanEdit: 0,
    },
    Cols: [
      { Name: 'SEQ', Header: [{ Value: ''  }],  RelWidth: 5 },
      { Name: 'mainName', Header: [{ Value: '구분 [대분류]' }], RelWidth: 15 },
      { Name: 'midName', Header: [{ Value: '공종 [중분류]' }], RelWidth: 15 },
      { Name: 'subName', Header: [{ Value: '종별 [소분류]' }], RelWidth: 20 },
      //{ Name: 'standard', Header: [{ Value: '규격' }], RelWidth: 15 },
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목' , Span: 2}], RelWidth: 15 },
      { Name: 'tstSbjNameLvl1', Header: [{ Value: '시험 종목' }], RelWidth: 15 },
      { Name: 'testTypeName', Header: [{ Value: '시험 Type' }], RelWidth: 15 },
    ]
  },
  data: [
    { case1: '1', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '2', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
    { case1: '3', case2: '공통', case3: '가설기자재', case4: '강관비계용 부재', case5: '비계용 강관', case6: '인장하중', case7: '의뢰시험' },
  ],
}

/* testResultWrite: SQMS_WS02_001_06 품질활동 > 시험관리 > 시험결과관리 > 결과 입력 */
export const testResultWrite = {
  options: {
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, CanEdit: 0, ColMerge: 0, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '', RowSpan: 2 }], ColMerge: 0, RelWidth: 4 },
      { Name: 'mainName', Header: [{ Value: '구분 \n [대분류]', RowSpan: 2 }],CanEdit: 0, ColMerge: 0, RelWidth: 6 },
      { Name: 'midName', Header: [{ Value: '공종 \n [중분류]', RowSpan: 2 }], CanEdit: 0, ColMerge: 0, RelWidth: 6 },
      { Name: 'subName', Header: [{ Value: '종별 \n [소분류]', RowSpan: 2 }], CanEdit: 0, ColMerge: 0, RelWidth: 16 },
      { Name: 'standard', Header: [{ Value: '규격', RowSpan: 2 }], CanEdit: 0, RelWidth: 6 ,Visible: '0'},
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험 종목', RowSpan: 2 , Span: 2, RowMerge : 1}], CanEdit: 0, RowMerge: 1, RelWidth: 14 },
      { Name: 'tstSbjNameLvl1', Header: [{ Value: '시험 종목', RowSpan: 2 }], CanEdit: 0, RowMerge: 1, RelWidth: 14},
      { Name: 'ksStd', Header: [{ Value: '시험 방법', RowSpan: 2 }], CanEdit: 0, ColMerge: 0, RelWidth: 6 },
      { Name: 'minValue', Header: [{ Value: '시험 기준', Span: 5 }, { Value: '최소값' }], RelWidth: 4, },
      { Name: 'minRange', Header: [{}, { Value: '범위' }], Type: "Enum", Enum: "|이상|초과|이하|미만|이상유무|기타", EnumKeys: "|AB|EX|BE|UN|YN|ETC", RelWidth: 5 ,},
      { Name: 'maxValue', Header: [{}, { Value: '최대값' }], RelWidth: 4 ,},
      { Name: 'maxRange', Header: [{}, { Value: '범위' }], Type: "Enum", Enum: "|이상|초과|이하|미만|이상유무|기타", EnumKeys: "|AB|EX|BE|UN|YN|ETC", RelWidth: 5 ,},
      { Name: 'testUnit', Header: [{}, { Value: '단위' }], RelWidth: 4 ,},
      { Name: 'testResult', Header: [{ Value: '시험 결과', RowSpan: 2 }],  Required: 1, RelWidth: 8 , ColMerge: 0 },
      { Name: 'testResultJdgmnt', Header: [{ Value: '시험 결과 판정', RowSpan: 2 }],  Required: 1, CanEdit: 0, RelWidth: 8 ,ColMerge : 0},
      { Name: 'testCost', Header: [{ Value: '시험 비용 (VAT 제외)', RowSpan: 2 }], RelWidth: 10 ,ColMerge : 0},
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'testResultMngtSeq', Visible: '0' },
      { Name: 'testSubjectSeq', Visible: '0' },
      { Name: 'revisionId', Visible: '0' },
      { Name: 'subCodeId', Visible: '0' },
      { Name: 'siteTstSbjDtlId', Visible: '0' },
    ]
  },
  data: [
    { case1: '', case2: '1', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
    { case1: '', case2: '2', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
    { case1: '', case2: '3', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
    { case1: '', case2: '4', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
    { case1: '', case2: '5', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
  ],
}

/* TestSearch: SQMS_WS02_001_06 품질활동 > 시험관리 > 시험결과관리 > 결과 입력 > 시험 종목 검색 팝업 */
export const TestSearch = { 
  options: {
    Cfg: {
      NoVScroll: 0,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 10 },
      { Name: 'mainName', Header: [{ Value: '구분 [대분류]' }], CanEdit: 0, RelWidth: 15 },
      { Name: 'midName', Header: [{ Value: '공종 [중분류]' }], CanEdit: 0, RelWidth: 15 },
      { Name: 'subName', Header: [{ Value: '종별 [소분류]' }], CanEdit: 0, RelWidth: 15 },
      // { Name: 'standard', Header: [{ Value: '규격' }], CanEdit: 0, RelWidth: 15 },
      { Name: 'tstSbjDtlName', Header: [{ Value: '시험종목' }], CanEdit: 0, RelWidth: 15 },
      { Name: 'testTypeName', Header: [{ Value: '시험 Type' }], CanEdit: 0, RelWidth: 15 },
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

/* testResultDetail: SQMS_WS02_001_06 품질활동 > 시험관리 > 시험결과관리 > 결과 상세 */
export const testResultDetail = {
  options: {
    Cols: [
      { Name: 'case2', Header: [{ Value: '', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'case3', Header: [{ Value: '구분 \n [대분류]', RowSpan: 2 }], RelWidth: 6 },
      { Name: 'case4', Header: [{ Value: '공종 \n [중분류]', RowSpan: 2 }], RelWidth: 6 },
      { Name: 'case5', Header: [{ Value: '종별 \n [소분류]', RowSpan: 2 }], RelWidth: 20 },
      { Name: 'case6', Header: [{ Value: '규격', RowSpan: 2 }], RelWidth: 6 },
      { Name: 'case7', Header: [{ Value: '시험 종목', RowSpan: 2 }], RelWidth: 6 },
      { Name: 'case8', Header: [{ Value: '시험 방법', RowSpan: 2 }], RelWidth: 6 },
      { Name: 'case9', Header: [{ Value: '시험 기준', Span: 5 }, { Value: '최소값' }], RelWidth: 4 },
      { Name: 'case10', Header: [{}, { Value: '범위' }], RelWidth: 4 },
      { Name: 'case11', Header: [{}, { Value: '최대값' }], RelWidth: 4 },
      { Name: 'case12', Header: [{}, { Value: '범위' }], RelWidth: 4 },
      { Name: 'case13', Header: [{}, { Value: '단위' }], RelWidth: 4 },
      { Name: 'case14', Header: [{ Value: '시험 결과', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case15', Header: [{ Value: '시험 결과 판정', RowSpan: 2 }], RelWidth: 10 },
      { Name: 'case16', Header: [{ Value: '시험 비용', RowSpan: 2 }], RelWidth: 10 },
    ]
  },
  data: [
    { case1: '', case2: '1', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
    { case1: '', case2: '2', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
    { case1: '', case2: '3', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
    { case1: '', case2: '4', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
    { case1: '', case2: '5', case3: '공통', case4: '가설기자재', case5: '강관비계용 부재', case6: '비계용 강관', case7: '인장하중', case8: 'KS F 8002', case9: '18000', case10: '이상', case11: '-', case12: '-', case13: 'N', case14: '', case15: '', case16: '' },
  ],
}

/* testExpense2: SQMS_WS02_001_08 품질활동 > 시험관리 > 현장 Set-up > My Site (품질시험비용) */
export const testExpense2 = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '구분 \n [대분류]', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'case2', Header: [{ Value: '공종 \n [중분류]', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'case3', Header: [{ Value: '종별 \n [소분류]', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'case4', Header: [{ Value: '시험 종목', RowSpan: 3 }], RelWidth: 5 },
      { Name: 'case5', Header: [{ Value: '시험 방법', RowSpan: 3 }], RelWidth: 5 },
      { Name: 'case6', Header: [{ Value: '시험 빈도', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'case7', Header: [{ Value: '비고', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'case8', Header: [{ Value: '인력(시간)', Span: 4 }, { Value: '시험', Span: 4 }, { Value: '특급' }], RelWidth: 5 },
      { Name: 'case9', Header: [{}, {}, { Value: '고급' }], RelWidth: 5 },
      { Name: 'case10', Header: [{}, {}, { Value: '중급' }], RelWidth: 5 },
      { Name: 'case11', Header: [{}, {}, { Value: '초급' }], RelWidth: 5 },
      { Name: 'case12', Header: [{ Value: '공공요금', Span: 3 }, { Value: '전기' }, { Value: 'Kwh' }], RelWidth: 5 },
      { Name: 'case13', Header: [{}, { Value: '상수도' }, { Value: 'm³' }], RelWidth: 5 },
      { Name: 'case14', Header: [{}, { Value: '가스' }, { Value: 'm³' }], RelWidth: 5 },
      { Name: 'case15', Header: [{ Value: '노무비' }, { Value: '회당 \n 인건비', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'case16', Header: [{ Value: '경비' }, { Value: '회당 \n 공공 \n 요금', RowSpan: 2 }], RelWidth: 5 },
      { Name: 'case17', Header: [{ Value: '종목별 \n 품질시험비', RowSpan: 3 }], RelWidth: 5 },
      { Name: 'case18', Header: [{ Value: '전체 \n 시험 \n 횟수', RowSpan: 3 }], RelWidth: 5 },
      { Name: 'case19', Header: [{ Value: '합계', RowSpan: 3 }], RelWidth: 5 },
    ]
  },
  data: [
    { case1: '공통', case2: '토공 및 기초공사', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: '토취장 마다 재질변화시마다', case7: '', case8: '3.4', case9: '', case10: '4.4', case11: '', case12: '204.5', case13: '0.7', case14: '', case15: '109,212', case16: '17,605', case17: '126,817', case18: '1', case19: '253,634' },
    { case1: '공통', case2: '토공 및 기초공사', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: '토취장 마다 재질변화시마다', case7: '', case8: '3.4', case9: '', case10: '4.4', case11: '', case12: '204.5', case13: '0.7', case14: '', case15: '109,212', case16: '17,605', case17: '126,817', case18: '1', case19: '253,634' },
    { case1: '공통', case2: '토공 및 기초공사', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: '토취장 마다 재질변화시마다', case7: '', case8: '3.4', case9: '', case10: '4.4', case11: '', case12: '204.5', case13: '0.7', case14: '', case15: '109,212', case16: '17,605', case17: '126,817', case18: '1', case19: '253,634' },
    { case1: '공통', case2: '토공 및 기초공사', case3: '성토용 흙', case4: '함수비', case5: 'KS F 2306', case6: '토취장 마다 재질변화시마다', case7: '', case8: '3.4', case9: '', case10: '4.4', case11: '', case12: '204.5', case13: '0.7', case14: '', case15: '109,212', case16: '17,605', case17: '126,817', case18: '1', case19: '253,634' },
  ],
}

/* testReport: SQMS_WS02_001_08 품질활동 > 시험관리 > 현장 Set-up > My Site (Report) */
export const testReport = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 5 },
      { Name: 'case2', Header: [{ Value: '제목' }], RelWidth: 25 },
      { Name: 'case3', Header: [{ Value: '비고' }], RelWidth: 25 },
      { Name: 'case4', Header: [{ Value: '작성자' }], RelWidth: 10 },
      { Name: 'case5', Header: [{ Value: '작성일시' }], RelWidth: 25 },
      { Name: 'case6', Header: [{ Value: '다운로드' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_download no_text'>다운로드</button>"}, RelWidth: 10 },
    ]
  },
  data: [
    { case1: '1', case2: '품질관리비 산출', case3: '11월 성토용 흙 품질관리비 등록', case4: '이현대', case5: '2021-11-24 14:20:29', case6: '0' },
    { case1: '1', case2: '품질관리비 산출', case3: '11월 성토용 흙 품질관리비 등록', case4: '이현대', case5: '2021-11-24 14:20:29', case6: '0' },
    { case1: '1', case2: '품질관리비 산출', case3: '11월 성토용 흙 품질관리비 등록', case4: '이현대', case5: '2021-11-24 14:20:29', case6: '' },
  ],
}