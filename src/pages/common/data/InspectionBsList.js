/* 
    InspectionBsList: SQMS_BS_DATA_001 BS점검 > Set-up > 세대정보 
    InspectionBsList2: SQMS_BS_DATA_001 BS점검 > Set-up > 결함공종 및 유형 
    InspectionBsList3: SQMS_BS_DATA_001 BS점검 > Set-up > 공간
    InspectionBsList4: SQMS_BS_DATA_001 BS점검 > Set-up > 공간/공종 연결
    InspectionBsList5: SQMS_BS_DATA_001 BS점검 > Set-up > 일정관리 
    HoldOption3: SQMS_BS_DATA_001 BS점검 > Set-up > 세대설정
    InspectionBsList6: SQMS_BS_DATA_001 BS점검 > Set-up > 일정관리
    InspectionBsList7: BS점검 > BS점검 실시 > 세대결함
*/

/* InspectionBsList: SQMS_BS_DATA_001 BS점검 > Set-up > 세대정보 */
export const InspectionBsList = {
    options: {
        Cfg: {
          CanEdit: 0
        },
        Cols: [
            { Name: 'case1', Header: [{ Value: '연동유무' }], RelWidth: 3 },
            { Name: 'case2', Header: [{ Value: '동' }], RelWidth: 3 },
            { Name: 'case3', Header: [{ Value: '호수' }], RelWidth: 3 },
            { Name: 'case4', Header: [{ Value: '층' }], RelWidth: 2 },
            { Name: 'case5', Header: [{ Value: '평형정보' }], RelWidth: 3 },
            { Name: 'case6', Header: [{ Value: '추가정보' }], Class: 'al pl20 pr20', RelWidth: 10 },
        ]
    },
    data: [
        { case1: '연동', case2: '101동', case3: '101호', case4: '1', case5: '49.2617(F)', case6: '' },
        { case1: '미연동', case2: '101동', case3: '101호', case4: '1', case5: '49.2617(F)', case6: '' },
        { case1: '연동', case2: '101동', case3: '101호', case4: '1', case5: '49.2617(F)', case6: '' },
        { case1: '미연동', case2: '101동', case3: '101호', case4: '1', case5: '49.2617(F)', case6: '' },
        { case1: '연동', case2: '101동', case3: '101호', case4: '1', case5: '49.2617(F)', case6: '' },
        { case1: '미연동', case2: '101동', case3: '101호', case4: '1', case5: '49.2617(F)', case6: '' },
    ],
}

/* InspectionBsList2: SQMS_BS_DATA_001 BS점검 > Set-up > 결함공종 및 유형 */
export const InspectionBsList2 = {
    options: {
      Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 6 },
        { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 6 },
        { Name: 'case3', Header: [{ Value: '대공종(Level. 1)' }], RelWidth: 22 },
        { Name: 'case4', Header: [{ Value: '주공종(Level. 2)' }], RelWidth: 22 },
        { Name: 'case5', Header: [{ Value: '결함공종(Level. 3)' }], RelWidth: 22 },
        { Name: 'case6', Header: [{ Value: '결함유형(Level. 4)' }], RelWidth: 22 },
      ]
    },
    data: [
        { case1: '', case2: '1', case3: '건축', case4: '가구/가전 공사', case5: '가스렌지', case6: '미시공' },
        { case1: '', case2: '2', case3: '건축', case4: '가구/가전 공사', case5: '가스렌지', case6: '미시공' },
        { case1: '', case2: '3', case3: '건축', case4: '가구/가전 공사', case5: '가스렌지', case6: '미시공' },
        { case1: '', case2: '4', case3: '건축', case4: '가구/가전 공사', case5: '가스렌지', case6: '미시공' },
    ],
  }

/* InspectionBsList3: SQMS_BS_DATA_001 BS점검 > Set-up > 공간 */
export const InspectionBsList3 = {
    options: {
      Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 5 },
        { Name: 'case3', Header: [{ Value: '구분' }], RelWidth: 60 },
        { Name: 'case4', Header: [{ Value: '공간' }], RelWidth: 30 },
      ]
    },
    data: [
        { case1: '', case2: '1', case3: '세대', case4: '가족실' },
        { case1: '', case2: '2', case3: '세대', case4: '가족실' },
        { case1: '', case2: '3', case3: '세대', case4: '가족실' },
        { case1: '', case2: '4', case3: '세대', case4: '가족실' },
    ],
  }

/* InspectionBsList5: SQMS_BS_DATA_001 BS점검 > Set-up > 일정관리 */
export const InspectionBsList5 = {
    options: {
      Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 2 },
        { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 2 },
        { Name: 'case3', Header: [{ Value: '공종' }], RelWidth: 5 },
        { Name: 'case4', Header: [{ Value: '결함공종' }], RelWidth: 5 },
        { Name: 'case5', Header: [{ Value: '동' }], RelWidth: 5 },
        { Name: 'case6', Header: [{ Value: '호' }], RelWidth: 5 },
        { Name: 'case7', Header: [{ Value: '협력업체' }], RelWidth: 5 },
        { Name: 'case8', Header: [{ Value: '등록일' }], RelWidth: 5 },
      ]
    },
    data: [
        { case1: '', case2: '1', case3: '거실', case4: '붙박이장', case5: '110', case6: '302', case7: '㈜리밧흐', case8: '2021-11-02' },
        { case1: '', case2: '1', case3: '거실', case4: '붙박이장', case5: '110', case6: '302', case7: '㈜리밧흐', case8: '2021-11-02' },
        { case1: '', case2: '1', case3: '거실', case4: '붙박이장', case5: '110', case6: '302', case7: '㈜리밧흐', case8: '2021-11-02' },
        { case1: '', case2: '1', case3: '거실', case4: '붙박이장', case5: '110', case6: '302', case7: '㈜리밧흐', case8: '2021-11-02' },
        { case1: '', case2: '1', case3: '거실', case4: '붙박이장', case5: '110', case6: '302', case7: '㈜리밧흐', case8: '2021-11-02' },
    ],
  }

/* InspectionBsList4: SQMS_BS_DATA_001 BS점검 > Set-up > 공간/공종 연결 */
export const InspectionBsList4 = {
    options: {
      Cfg: {
        NoVScroll: 0,
      },
      Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
        { Name: 'case2', Header: [{ Value: '주공종' }], RelWidth: 30 },
        { Name: 'case3', Header: [{ Value: '결함공종' }], RelWidth: 60 },
      ]
    },
    data: [
        { case1: '', case2: '가구/가전공사', case3: '신발장'},
        { case1: '', case2: '가구/가전공사', case3: '가스오븐'},
        { case1: '', case2: '가구/가전공사', case3: '김치냉장고'},
        { case1: '', case2: '가구/가전공사', case3: '신발장'},
        { case1: '', case2: '가구/가전공사', case3: '신발장'},
        { case1: '', case2: '가구/가전공사', case3: '가스오븐'},
        { case1: '', case2: '가구/가전공사', case3: '가스오븐'},
        { case1: '', case2: '가구/가전공사', case3: '가스오븐'},
        { case1: '', case2: '가구/가전공사', case3: '가스오븐'},
        { case1: '', case2: '가구/가전공사', case3: '가스오븐'},
    ],
  }

/* InspectionBsList6: SQMS_BS_DATA_001 BS점검 > Set-up > 일정관리 */
export const InspectionBsList6 = {
    options: {
      Cols: [
        { Name: 'case1', Header: [{ Value: '구분', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '2021', Span: 5 }, { Value: '8' }], RelWidth: 5 },
        { Name: 'case3', Header: [{}, { Value: '9' }], RelWidth: 5 },
        { Name: 'case4', Header: [{}, { Value: '10' }], RelWidth: 5 },
        { Name: 'case5', Header: [{}, { Value: '11' }], RelWidth: 5 },
        { Name: 'case6', Header: [{}, { Value: '12' }], RelWidth: 5 },
        { Name: 'case7', Header: [{ Value: '2020', Span: 12 }, { Value: '1' }], RelWidth: 5 },
        { Name: 'case8', Header: [{}, { Value: '2' }], RelWidth: 5 },
        { Name: 'case9', Header: [{}, { Value: '3' }], RelWidth: 5 },
        { Name: 'case10', Header: [{}, { Value: '4' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case11', Header: [{}, { Value: '5' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case12', Header: [{}, { Value: '6' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case13', Header: [{}, { Value: '7' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case14', Header: [{}, { Value: '8' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case15', Header: [{}, { Value: '9' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case16', Header: [{}, { Value: '10' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case17', Header: [{}, { Value: '11' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case18', Header: [{}, { Value: '12' }], Type: 'Html', RelWidth: 5 },
        { Name: 'case19', Header: [{ Value: '진행상태', RowSpan: 2 }], RelWidth: 10 },
      ]
    },
    data: [
        { case1: 'BS점검' },
        { case1: '마일스톤' },
    ],
  }

  /* HoldOption3: SQMS_BS_DATA_001 BS점검 > Set-up > 세대설정 */
export const HoldOption3 = {
  options: {
    Cols: [
      { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
      { Name: 'case2', Header: [{ Value: '동' }], Required: 1, RelWidth: 16 },
      { Name: 'case3', Header: [{ Value: '라인' }], Required: 1, RelWidth: 20 },
      { Name: 'case4', Header: [{ Value: '호수' }], Required: 1, RelWidth: 20 },
      { Name: 'case5', Header: [{ Value: '첫 층수' }], Required: 1, RelWidth: 20 },
      { Name: 'case6', Header: [{ Value: '마지막 층수' }], Required: 1, RelWidth: 20 },
    ]
  },
  data: [
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
  ],
}

/* InspectionBsList7: BS점검 > BS점검 실시 > 세대결함 */
export const InspectionBsList7 = {
  options: {
    Cfg : {
      NoDataMessage : 3,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'isChecked', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4, CanEdit : 0 },
      { Name: 'standDong', Header: [{ Value: '결함 등록', Span: 13 }, { Value: '동' }],Type: "Int", RelWidth: 5, CanEdit : 0 },
      { Name: 'addrHo', Header: [{ }, { Value: '호수' }],Type: "Int", RelWidth: 5, CanEdit : 0 },
      { Name: 'bsSpaceMngName', Header: [{ }, { Value: '공간' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'mainName', Header: [{ }, { Value: '공종' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'midName', Header: [{ }, { Value: '세부공종' }], RelWidth: 5, CanEdit : 0},
      { Name: 'subName', Header: [{ }, { Value: '결함공종' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' }], RelWidth: 4, CanEdit : 0 },
      { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' }], RelWidth: 4, CanEdit : 0 },
      { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' }], RelWidth: 4, CanEdit : 0 },
      { Name: 'bsInsprName', Header: [{ }, { Value: '점검자' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsInspDt', Header: [{ }, { Value: '점검일' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsAsignType', Header: [{ Value: '결함 처리', Span: 4 }, { Value: '배정상태' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'tradeNm', Header: [{ }, { Value: '협력업체' }], RelWidth: 5, CanEdit : 0 },
      // { Name: 'bsAsignDt', Header: [{ }, { Value: '배정일' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsPrcsOrderView', Header: [{ }, { Value: '처리차수' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsPrcsDt', Header: [{ }, { Value: '처리완료일' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsCnfmTypeCode', Header: [{ Value: '확인점검', Span: 2 }, { Value: '결과등급' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsCnfmDt', Header: [{ }, { Value: '확검일' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsDefectRegMngId', Visible: '0' },
      { Name: 'tradeId', Visible: '0' },
      { Name: 'bsDefectProsCnfmId', Visible: '0' },
    ]
  },
  data: [
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
  ],
}
export const InspectionPublicBsList7 = {
  options: {
    Cols: [
      // { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4, CanEdit : 0 },
      { Name: 'standDong', Header: [{ Value: '결함 등록', Span: 13 }, { Value: '동' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'addrFloor', Header: [{ }, { Value: '층' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsSpaceMngName', Header: [{ }, { Value: '공간' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'mainName', Header: [{ }, { Value: '공종' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'midName', Header: [{ }, { Value: '세부공종' }], RelWidth: 5, CanEdit : 0},
      { Name: 'subName', Header: [{ }, { Value: '결함공종' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], EmptyValue : '입력하세요.', RelWidth: 5, CanEdit : 0 },
      { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' }], RelWidth: 4, CanEdit : 0 },
      { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' }], RelWidth: 4, CanEdit : 0 },
      { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' }], RelWidth: 4, CanEdit : 0 },
      { Name: 'bsInsprName', Header: [{ }, { Value: '점검자' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsInspStartDt', Header: [{ }, { Value: '점검일' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsAsignType', Header: [{ Value: '결함 처리', Span: 5 }, { Value: '배정상태' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'tradeNm', Header: [{ }, { Value: '협력업체' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsAsignDt', Header: [{ }, { Value: '배정일' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsPrcsOrder', Header: [{ }, { Value: '처리차수' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsPrcsDt', Header: [{ }, { Value: '처리완료일' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsCnfmTypeCode', Header: [{ Value: '확인점검', Span: 2 }, { Value: '결과등급' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsCnfmDt', Header: [{ }, { Value: '확검일' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsDefectRegMngId', Visible: '0' },
      { Name: 'tradeId', Visible: '0' },
      { Name: 'bsDefectProsCnfmId', Visible: '0' },
    ]
  },
  data: [
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
  ],
}

/*InspectionBsList8 : BS점검 > BS점검 실시 > 협력업체 배정(반환 및 미배정 결함) */
export const InspectionBsList8 = {
  options: {
    Cols: [
      // { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'bsAsignType', Header: [{ Value: '업체배정 상태 \n (반환 협력업체)', Span: 2, RowSpan:2 }], ColMerge: 1,RelWidth: 5, CanEdit : 0, TextColor: "#ff0000" },
      { Name: 'tradeNm', Header: [{ }], ColMerge: 1, RelWidth: 5, CanEdit: 0  },
      { Name: 'spaceCodeType', Header: [{ Value: '결함 등록', Span: 15 }, { Value: '구분' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'standDong', Header: [{ }, { Value: '동' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'addrHo', Header: [{ }, { Value: '호수' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'addrFloor', Header: [{ }, { Value: '층' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsSpaceMngName', Header: [{ }, { Value: '공간' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'mainName', Header: [{ }, { Value: '공종' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'midName', Header: [{ }, { Value: '세부공종' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'subName', Header: [{ }, { Value: '결함공종' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], RelWidth: 10, CanEdit : 0 },
      { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' }], RelWidth: 3, CanEdit : 0 },
      { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' }], RelWidth: 3, CanEdit : 0 },
      { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' }], RelWidth: 3, CanEdit : 0 },
      { Name: 'bsInsprName', Header: [{ }, { Value: '점검자' }], RelWidth: 5, CanEdit : 0 },
      { Name: 'bsInspDt', Header: [{ }, { Value: '점검일' }], RelWidth: 5, CanEdit : 0,  Type: 'Date', Format: 'yyyy-MM-dd'},
    ]
  },
  data: [
    { case1: '', case2: '미배정', case3: 'OO가구', case4: '세대', case5: '102', case6: '102', case7: '', case8: '주방', case9: '건축', case10: '가구/가전공사', case11: '가스렌지', case12: '흠집', case13: '10cm 흠집', case14: '', case15: '', case16: 'O', case17: '김점검', case18: '2021-11-25'},  
    { case1: '', case2: '배정', case3: 'OO가구', case4: '세대', case5: '102', case6: '102', case7: '', case8: '주방', case9: '건축', case10: '가구/가전공사', case11: '가스렌지', case12: '흠집', case13: '10cm 흠집', case14: '', case15: '', case16: 'O', case17: '김점검', case18: '2021-11-25'},  
    { case1: '', case2: '반환', case3: 'OO가구', case4: '세대', case5: '102', case6: '102', case7: '', case8: '주방', case9: '건축', case10: '가구/가전공사', case11: '가스렌지', case12: '흠집', case13: '10cm 흠집', case14: '', case15: '', case16: 'O', case17: '김점검', case18: '2021-11-25'},  
    { case1: '', case2: '미배정', case3: 'OO가구', case4: '세대', case5: '102', case6: '102', case7: '', case8: '주방', case9: '건축', case10: '가구/가전공사', case11: '가스렌지', case12: '흠집', case13: '10cm 흠집', case14: '', case15: '', case16: 'O', case17: '김점검', case18: '2021-11-25'},  
    { case1: '', case2: '미배정', case3: 'OO가구', case4: '세대', case5: '102', case6: '102', case7: '', case8: '주방', case9: '건축', case10: '가구/가전공사', case11: '가스렌지', case12: '흠집', case13: '10cm 흠집', case14: '', case15: '', case16: 'O', case17: '김점검', case18: '2021-11-25'},  

  ],
}

/*InspectionBsList8 : BS점검 > BS점검 실시 > 협력업체 배정(반환 및 미배정 결함) - 처리지연*/
export const InspectionBsList9 = {
  options: {
    Cols: [
      // { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
      { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
      { Name: 'spaceTypeName', Header: [{ Value: '결함 등록', Span: 15 }, { Value: '구분' }], RelWidth: 5 },
      { Name: 'standDong', Header: [{ }, { Value: '동' }], RelWidth: 5 },
      { Name: 'addrHo', Header: [{ }, { Value: '호수' }], RelWidth: 5 },
      { Name: 'addrFloor', Header: [{ }, { Value: '층' }], RelWidth: 5 },
      { Name: 'bsSpaceMngName', Header: [{ }, { Value: '공간' }], RelWidth: 5 },
      { Name: 'mainName', Header: [{ }, { Value: '공종' }], RelWidth: 5 },
      { Name: 'midName', Header: [{ }, { Value: '세부공종' }], RelWidth: 5 },
      { Name: 'subName', Header: [{ }, { Value: '결함공종' }], RelWidth: 5 },
      { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], RelWidth: 5 },
      { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], RelWidth: 10 },
      { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' }], RelWidth: 3 },
      { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' }], RelWidth: 3 },
      { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' }], RelWidth: 3 },
      { Name: 'bsInsprName', Header: [{ }, { Value: '점검자' }], RelWidth: 5 },
      { Name: 'bsInspStartDt', Header: [{ }, { Value: '점검일' }], RelWidth: 5 },
      { Name: 'delayDay', Header: [{ Value: '지연정보', Span: 4 }, { Value: '지연일수' }], RelWidth: 5 },
      { Name: 'tradeNm', Header: [{ }, { Value: '협력업체' }], RelWidth: 5 },
      { Name: 'bsPrcsOrder', Header: [{ }, { Value: '처리차수' }], RelWidth: 5 },
      { Name: 'bsAsignDt', Header: [{ }, { Value: '배정일' }], RelWidth: 5 },
      { Name: 'bsDefectRegMngId', Visible: '0' },
      { Name: 'tradeId', Visible: '0' },
      { Name: 'spaceTypeCode', Visible: '0' },
    ]
  },
  data: [
    { case1: '', case2: '세대', case3: '102', case4: '102', case5: '', case6: '주방', case7: '건축', case8: '가구/가전공사', case9: '가스렌지', case10: '흠집', case11: '10cm 흠집',  case12: '', case13: 'O', case14:'',  case15: '김점검', case16: '2021-11-25', case17:'7', case18:'(주)리밧흐', case19:'1차', case20:'2021-04-01'},  
    { case1: '', case2: '세대', case3: '102', case4: '102', case5: '', case6: '주방', case7: '건축', case8: '가구/가전공사', case9: '가스렌지', case10: '흠집', case11: '10cm 흠집',  case12: '', case13: 'O', case14:'',  case15: '김점검', case16: '2021-11-25', case17:'7', case18:'(주)리밧흐', case19:'1차', case20:'2021-04-01'},  
    { case1: '', case2: '세대', case3: '102', case4: '102', case5: '', case6: '주방', case7: '건축', case8: '가구/가전공사', case9: '가스렌지', case10: '흠집', case11: '10cm 흠집',  case12: '', case13: 'O', case14:'',  case15: '김점검', case16: '2021-11-25', case17:'7', case18:'(주)리밧흐', case19:'1차', case20:'2021-04-01'},  
    { case1: '', case2: '세대', case3: '102', case4: '102', case5: '', case6: '주방', case7: '건축', case8: '가구/가전공사', case9: '가스렌지', case10: '흠집', case11: '10cm 흠집',  case12: '', case13: 'O', case14:'',  case15: '김점검', case16: '2021-11-25', case17:'7', case18:'(주)리밧흐', case19:'1차', case20:'2021-04-01'},  
    { case1: '', case2: '세대', case3: '102', case4: '102', case5: '', case6: '주방', case7: '건축', case8: '가구/가전공사', case9: '가스렌지', case10: '흠집', case11: '10cm 흠집',  case12: '', case13: 'O', case14:'',  case15: '김점검', case16: '2021-11-25', case17:'7', case18:'(주)리밧흐', case19:'1차', case20:'2021-04-01'},  
  ],
}