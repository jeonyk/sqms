/* 점검 및 교육 */

/* 자체품질점검 */
/* 
    selfQualityList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List
    selfQualityCheckList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 > 체크리스트
    selfQualityList2: SQ_SPEC_INTN_W_014 자체품질점검 >현장 >점검현황 List 
    PartnersSearch2: SQ_SPEC_INTN_W_014 자체품질점검 > 현장 > 점검현황 List>등록 > 협력업체 검색
    selfQualityCheckList2: SQ_SPEC_INTN_W_014 자체품질점검 >현장 > 체크리스트
    InspectionStatusList: SQ_SPEC_INTN_W_014 자체품질점검 >현장 >점검현황 List > My Site
    InspectionStatusList2: SQ_SPEC_INTN_W_014 자체품질점검 >현장 >점검현황 List > All Sites
*/

/* 교육관리 */
/* 
    InspectionList: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외 점검 관리(My Site) - 대외점검
    InspectionList2: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외 점검 관리(My Site) - 지적사항
    InspectionList3: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외 점검 관리(All Sites) - 대외점검
    InspectionList4: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외 점검 관리(All Sites) - 지적사항
    InspectionPenalty: SQ_SPEC_EXTN_W_012 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 대외 점검(toggle) > 최종 벌점 작성
    InspectionList5: SQ_SPEC_EXTN_W_033 점검 및 교육 > 대외 점검 > 점검자별 성향
    InspectionTendency: SQ_SPEC_EXTN_W_020 점검자 별 성향 > 점검자 별 성향 상세 - 점검자이력 (평가결과)
    InspectionTendency2: SQ_SPEC_EXTN_W_020 점검자 별 성향 > 점검자 별 성향 상세 - 점검자이력 (지적사항)
    InspectionList6: SQ_SPEC_EXTN_W_034 점검 및 교육 > 대외 점검 > 지원요청 - 현장
    InspectionList7: SQ_SPEC_EXTN_W_040 점검 및 교육 > 대외 점검 > 지원요청 - 본사 
    EduplanList: SQMS_WS03_003 점검 및 교육 > 교육관리 > 교육 훈련 계획/실시(My Site)
    EduplanList2: SQMS_WS03_003 점검 및 교육 > 교육관리 > 교육 훈련 계획/실시(All Sites)
    EquipmentList: SQMS_WS03_003_01 점검 및 교육 > 교육관리 > All Sites
*/

/* 신규 근로자 교육 현황 */
/* 
    WorkerTrainingList: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(공종/세부공종)
    WorkerTrainingList2: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(언어 설정) 
    WorkerTrainingList3: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(언어 번역) 
    WorkerTrainingList4: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(교재 등록)
    WorkerTrainingList5: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(공통 교재) 
    EducationStatusList: SQ_SPEC_WKEDU_W_010 점검 및 교육 > 신규 근로자 교육 현황 > 교육현황(내현장)
    EducationStatusList2: SQ_SPEC_WKEDU_W_010 점검 및 교육 > 신규 근로자 교육 현황 > 교육현황(전체현장)
 */

// import { CommonSet } from './ibsheet-setoption' 

/* selfQualityList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 >점검요청 List */
export const selfQualityList = {
    options: {
        Cols: [ 
            { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'siteSendYnNm', Header: [{ Value: '상태', RowSpan: 2 }], RelWidth: 10 , CanEdit: 0},
            { Name: 'title', Header: [{ Value: '제목', RowSpan: 2 }], Class: 'al pl20', RelWidth: 35, CanEdit: 0},
            { Name: 'checkDt', Header: [{ Value: '요청일', RowSpan: 2 }], RelWidth: 10 , CanEdit: 0},
            { Name: 'siteSendDt', Header: [{ Value: '송부일', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
            { Name: 'allChk', Header: [{ Value: '회신 현황', Span: 3 }, { Value: '전체' }], Type: 'Html', RelWidth: 10 , CanEdit: 0},
            { Name: 'constructChk', Header: [{}, { Value: '건축' }], Type: 'Html', RelWidth: 10 , CanEdit: 0},
            { Name: 'infraChk', Header: [{}, { Value: '인프라',}], Type: 'Html', RelWidth: 10 , CanEdit: 0},
            { Name: 'detailInfo', Header: [{ Value: '점검정보', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_view'>보기</button>","1": "<button type='button' class='btn_set'>설정</button>"}, RelWidth: 10},
            { Name: 'replyStatus', Header: [{ Value: '회신현황', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_view'>보기</button>","1": "<button type='button' class='btn_set'>설정</button>"}, RelWidth: 10},
            { Name: 'inUserName', Header: [{ Value: '등록자', RowSpan: 2}], RelWidth: 10 , CanEdit: 0},
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '-', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: '발송 전', case6: '19', case7: '20', case8: '-', case9: '-', case10: '1', case11: '0' },
        { case1: '', case2: '1', case3: '-', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: '발송 전', case6: '19', case7: '20', case8: '-', case9: '-', case10: '1', case11: '0' },
        { case1: '', case2: '1', case3: '-', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: '발송 전', case6: '19', case7: '20', case8: '-', case9: '-', case10: '1', case11: '0' },
        { case1: '', case2: '1', case3: '-', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: '발송 전', case6: '19', case7: '20', case8: '-', case9: '-', case10: '0', case11: '0' },
        { case1: '', case2: '1', case3: '-', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: '발송 전', case6: '19', case7: '20', case8: '-', case9: '-', case10: '0', case11: '0' },
        { case1: '', case2: '1', case3: '-', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: '발송 전', case6: '19', case7: '20', case8: '-', case9: '-', case10: '0', case11: '0' },
    ],
}

/* selfQualityCheckList: SQ_SPEC_INTN_W_001 자체품질점검 >본사 > 체크리스트 */
export const selfQualityCheckList = {
    options: {
        Cols: [
            { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 5 },
            { Name: 'SEQ', Header: [{ Value: '번호' }], CanEdit: 0, RelWidth: 5 },
            { Name: 'title', Header: [{ Value: '제목' }], Class: 'al pl20', CanEdit: 0, RelWidth: 70 },
            { Name: 'regDt', Header: [{ Value: '작성일' }], CanEdit: 0, RelWidth: 20 },
            { Name: 'selfChkInfoId', Visible : 0},
        ]
    },
    data: [],
}

/* InspectionStatusList: SQ_SPEC_INTN_W_014 자체품질점검 >현장 >점검현황 List > My Site */
export const selfQualityMySiteList = {
    options: {
        Cols: [
            { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, IconAlign: 'Center', RowSpan: 2 }], Type: 'Radio', HRadio: 0, CanSort: 0, CanEdit: 1, RelWidth: 4 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 },
            { Name: 'selfQltySiteInfoId', Visible : 0},
            { Name: 'selfQltyTypeNm', Header: [{ Value: '점검 유형', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '협력업체', RowSpan: 2 }], CanEdit: 0, RelWidth: 12 },
            { Name: 'title', Header: [{ Value: '제목', RowSpan: 2 }], CanEdit: 0, Class: 'al pl20 pr20', RelWidth: 40 },
            { Name: 'inDttm', Header: [{ Value: '등록일', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'chkReqDt', Header: [{ Value: '점검 완료 요청일', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'chkDt', Header: [{ Value: '점검일', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'rplDt', Header: [{ Value: '회신일', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'selfQltyStatus', Visible : 0},
            { Name: 'selfQltyStatusArea', Header: [{ Value: '진행 상황', Span:3 }, { Value: '등록' }], Type: 'Html', CanEdit: 0, RelWidth: 10 },
            { Name: 'case8', Header: [{}, { Value: '점검' }], Type: 'Html', CanEdit: 0, RelWidth: 10 },
            { Name: 'case9', Header: [{}, { Value: '최종확인' }], Type: 'Html', CanEdit: 0, RelWidth: 10 },

            { Name: 'infoBtn', Header: [{ Value: '점검정보', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_plus'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 10 },
            { Name: 'resultBtn', Header: [{ Value: '결과입력', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_plus'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 10 },
            { Name: 'finalBtn', Header: [{ Value: '최종송부', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_plus'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 10 },
            /* { Name: 'punchYn', Header: [{ Value: 'Punch \n 등록여부', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 }, */
        ]
    },
    data: [
        { chk: 1, case1: '1', case2: '본사 요청', case3: '㈜동성동성도장', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: 'YYYY-MM-DD', case6: 'YYYY-MM-DD', case7: 'case1', case8: '', case9: '', case10: '1', case11: '0', case12: '-', case13: '-' },
        { chk: 0, case1: '1', case2: '본사 요청', case3: '㈜동성동성도장', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: 'YYYY-MM-DD', case6: 'YYYY-MM-DD', case7: 'case2', case8: '', case9: '', case10: '1', case11: '1', case12: '0', case13: 'N' },
        { chk: 0, case1: '1', case2: '본사 요청', case3: '㈜동성동성도장', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: 'YYYY-MM-DD', case6: 'YYYY-MM-DD', case7: 'case3', case8: '', case9: '', case10: '1', case11: '1', case12: '0', case13: 'Y' },
        { chk: 0, case1: '1', case2: '본사 요청', case3: '㈜동성동성도장', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: 'YYYY-MM-DD', case6: 'YYYY-MM-DD', case7: 'case4', case8: '', case9: '', case10: '1', case11: '1', case12: '1', case13: 'N' },
        { chk: 0, case1: '1', case2: '본사 요청', case3: '㈜동성동성도장', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: 'YYYY-MM-DD', case6: 'YYYY-MM-DD', case7: 'case5', case8: '', case9: '', case10: '1', case11: '1', case12: '1', case13: 'N' },
    ],
}
/* InspectionStatusList2: SQ_SPEC_INTN_W_014 자체품질점검 >현장 >점검현황 List > All Sites */
export const selfQualityAllSiteList = {
    options: {
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 },
            { Name: 'selfQltySiteInfoId', Visible : 0},
            { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], CanEdit: 0, RelWidth: 30 },
            { Name: 'selfQltyTypeNm', Header: [{ Value: '점검 유형', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '협력업체', RowSpan: 2 }], CanEdit: 0, RelWidth: 12 },
            { Name: 'title', Header: [{ Value: '제목', RowSpan: 2 }], CanEdit: 0, Class: 'al pl20 pr20', RelWidth: 40 },
            { Name: 'inDttm', Header: [{ Value: '등록일', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'chkReqDt', Header: [{ Value: '점검 완료 요청일', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'chkDt', Header: [{ Value: '점검일', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'rplDt', Header: [{ Value: '회신일', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'selfQltyStatus', Visible : 0},
            { Name: 'selfQltyStatusArea', Header: [{ Value: '진행 상황', Span:3 }, { Value: '등록' }], Type: 'Html', CanEdit: 0, RelWidth: 10 },
            { Name: 'case8', Header: [{}, { Value: '점검' }], Type: 'Html', CanEdit: 0, RelWidth: 10 },
            { Name: 'case9', Header: [{}, { Value: '최종확인' }], Type: 'Html', CanEdit: 0, RelWidth: 10 },

            { Name: 'infoBtn', Header: [{ Value: '점검정보', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_plus'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 10 },
            { Name: 'resultBtn', Header: [{ Value: '결과입력', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_plus'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 10 },
            { Name: 'finalBtn', Header: [{ Value: '최종송부', RowSpan: 2 }], Format: {"0": "<button type='button' class='btn_plus'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 10 },
            /* { Name: 'punchYn', Header: [{ Value: 'Punch \n 등록여부', RowSpan: 2 }], CanEdit: 0, RelWidth: 5 }, */
        ]
    },
    data: [
        {case1: '고양 덕은 복합시설 공사', case2: '본사 요청', case3: '㈜동성동성도장', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: 'YYYY-MM-DD', case6: 'YYYY-MM-DD', case7: 'case5', case8: '', case9: '', case10: '1', case11: '1', case12: '1', case13: 'N' },
        {case1: '고양 덕은 복합시설 공사', case2: '본사 요청', case3: '㈜동성동성도장', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: 'YYYY-MM-DD', case6: 'YYYY-MM-DD', case7: 'case5', case8: '', case9: '', case10: '1', case11: '1', case12: '1', case13: 'N' },
        {case1: '고양 덕은 복합시설 공사', case2: '본사 요청', case3: '㈜동성동성도장', case4: '12월 국토부 품질관리 강화안에 따른 점검 요청', case5: 'YYYY-MM-DD', case6: 'YYYY-MM-DD', case7: 'case5', case8: '', case9: '', case10: '1', case11: '1', case12: '1', case13: 'N' },
    ],
}

/* InspectionChecklist2: SQ_SPEC_INTN_W_014 자체품질점검 >현장 > 체크리스트 */
export const InspectionChecklist2 = {
    options: {
      Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanEdit: 1, CanSort: 0, RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '번호' }], CanEdit: 0, RelWidth: 5 },
        { Name: 'case3', Header: [{ Value: '제목' }], CanEdit: 0, Class: 'al pl20 pr20', RelWidth: 65 },
        { Name: 'case4', Header: [{ Value: '작성일' }], CanEdit: 0, RelWidth: 20 },
        // { Name: 'case5', Header: [{ Value: '상세' }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"},  RelWidth: 5 },
      ]
    },
    data: [
      { case1: '', case2: '1', case3: '12월 국토부용 체크리스트', case4: '2022-11-20' },
      { case1: '', case2: '2', case3: '12월 국토부용 체크리스트', case4: '2022-11-20' },
      { case1: '', case2: '3', case3: '10월 행정안전부용 체크리스트', case4: '2022-11-20' },
      { case1: '', case2: '4', case3: '9월 국토부용 체크리스트', case4: '2022-11-20' },
      { case1: '', case2: '5', case3: '8월 국토부용 체크리스트', case4: '2022-11-20' },
    ],
}

/* PartnersSearch2: SQ_SPEC_INTN_W_014 자체품질점검 > 현장 > 점검현황 List>등록 > 협력업체 검색 */
export const PartnersSearch2 = {
    options: {
        Cols: [ 
            { Name: 'case1', Header: [{ Value: '협력사 유형' }], RelWidth: 5 },
            { Name: 'case2', Header: [{ Value: '협력사 ID \n (사업자번호)' }], RelWidth: 10 },
            { Name: 'case3', Header: [{ Value: '협력사명' }], RelWidth: 10 },
            { Name: 'case4', Header: [{ Value: '등록시스템' }], RelWidth: 10 },
            { Name: 'case5', Header: [{ Value: '등록일자' }], RelWidth: 10 },
        ]
    },
    data: [
        { case1: '시공/자재', case2: '112-11-113321', case3: 'ㅇㅇ시멘트', case4: 'NHSE', case5: 'YYYY-MM-DD' },
        { case1: '시공/자재', case2: '112-11-113321', case3: 'ㅇㅇ시멘트', case4: 'NHSE', case5: 'YYYY-MM-DD' },
        { case1: '시공/자재', case2: '112-11-113321', case3: 'ㅇㅇ시멘트', case4: 'SQMS', case5: 'YYYY-MM-DD' },
        { case1: '시공/자재', case2: '112-11-113321', case3: 'ㅇㅇ시멘트', case4: 'SQMS', case5: 'YYYY-MM-DD' },
        { case1: '시공/자재', case2: '112-11-113321', case3: 'ㅇㅇ시멘트', case4: 'SQMS', case5: 'YYYY-MM-DD' },
    ],
}

/* selfQualityCheckList2: SQ_SPEC_INTN_W_014 자체품질점검 >현장 > 체크리스트 */
export const selfQualityCheckList2 = {
    options: {
      Cols: [
        { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 5 },
        { Name: 'case3', Header: [{ Value: '체크리스트 제목' }], RelWidth: 65 },
        { Name: 'case4', Header: [{ Value: '작성일' }], RelWidth: 20 },
        { Name: 'case5', Header: [{ Value: '상세' }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"},  RelWidth: 5 },
      ]
    },
    data: [
      { case1: '', case2: '1', case3: '12월 국토부용 체크리스트', case4: '2022-11-20', case5: '1' },
      { case1: '', case2: '2', case3: '12월 국토부용 체크리스트', case4: '2022-11-20', case5: '1' },
      { case1: '', case2: '3', case3: '10월 행정안전부용 체크리스트', case4: '2022-11-20', case5: '1' },
      { case1: '', case2: '4', case3: '9월 국토부용 체크리스트', case4: '2022-11-20', case5: '1' },
      { case1: '', case2: '5', case3: '8월 국토부용 체크리스트', case4: '2022-11-20', case5: '1' },
    ],
}


/* InspectionList: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외 점검 관리(My Site) - 대외점검 */
export const InspectionList = {
    options: {
        Cols: [ 
            { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
            { Name: 'case2', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'case3', Header: [{ Value: '점검종류', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case4', Header: [{ Value: '점검기관', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case5', Header: [{ Value: '상세점검목적', RowSpan: 2 }], Class: 'al pl20 pr20', RelWidth: 20 },
            { Name: 'case6', Header: [{ Value: '점검자', RowSpan: 2 }], RelWidth: 5, },
            { Name: 'case7', Header: [{ Value: '점검일', RowSpan: 2 }], RelWidth: 10 },
            // { Name: 'case8', Header: [{ Value: '점검정보', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
            { Name: 'case9', Header: [{ Value: '점검결과', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
            { Name: 'case10', Header: [{ Value: '확정공문', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
            { Name: 'case11', Header: [{ Value: '최종벌점', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
            // { Name: 'case12', Header: [{ Value: '실시일자', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case13', Header: [{ Value: '총 지적 \n 건수', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'case14', Header: [{ Value: '확인서작성', Span: 2 }, { Value: 'Total' }], RelWidth: 4 },
            { Name: 'case15', Header: [{}, { Value: '완료' }], RelWidth: 4 },
            { Name: 'case16', Header: [{ Value: '첨부파일', Span: 2 }, { Value: '점검 \n 결과' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 5 },
            { Name: 'case17', Header: [{}, { Value: '확정 \n 결과' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 5 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '품질수단점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '2021-11-01 ~ 2021-11-01', /* case8: '1', */ case9: '0', case10: '0', case11: '0', /* case12: '2021-11-01 ~ 2021-11-01', */ case13: '0', case14: '0', case15: '0', case16: '0', case17: '0' },
        { case1: '', case2: '1', case3: '품질수단점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '2021-11-01 ~ 2021-11-01', /* case8: '1', */ case9: '1', case10: '1', case11: '0', /* case12: '2021-11-01 ~ 2021-11-01', */ case13: '0', case14: '0', case15: '0', case16: '', case17: '' },
        { case1: '', case2: '1', case3: '품질수단점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '2021-11-01 ~ 2021-11-01', /* case8: '1', */ case9: '1', case10: '1', case11: '0', /* case12: '2021-11-01 ~ 2021-11-01', */ case13: '0', case14: '0', case15: '0', case16: '', case17: '' },
        { case1: '', case2: '1', case3: '품질수단점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '2021-11-01 ~ 2021-11-01', /* case8: '1', */ case9: '1', case10: '1', case11: '0', /* case12: '2021-11-01 ~ 2021-11-01', */ case13: '0', case14: '0', case15: '0', case16: '', case17: '' },
        { case1: '', case2: '1', case3: '품질수단점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '2021-11-01 ~ 2021-11-01', /* case8: '1', */ case9: '1', case10: '1', case11: '0', /* case12: '2021-11-01 ~ 2021-11-01', */ case13: '0', case14: '0', case15: '0', case16: '', case17: '' },
        { case1: '', case2: '1', case3: '품질수단점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '2021-11-01 ~ 2021-11-01', /* case8: '1', */ case9: '1', case10: '1', case11: '0', /* case12: '2021-11-01 ~ 2021-11-01', */ case13: '0', case14: '0', case15: '0', case16: '', case17: '' },
    ],
}

/* InspectionList2: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외 점검 관리(My Site) - 지적사항 */
export const InspectionList2 = {
    options: {
        Cols: [ 
            // { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 2 },
            { Name: 'case2', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 3 },
            { Name: 'case3', Header: [{ Value: '점검 종류', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'case4', Header: [{ Value: '점검 기관', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'case5', Header: [{ Value: '점검일', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case6', Header: [{ Value: '점검 결과', Span: 6 }, { Value: '점검자' }], RelWidth: 4 },
            { Name: 'case7', Header: [{}, { Value: '분야' }], RelWidth: 6 },
            { Name: 'case8', Header: [{}, { Value: '대상 공종' }], RelWidth: 4 },
            { Name: 'case9', Header: [{}, { Value: '제목' }], RelWidth: 10 },
            { Name: 'case10', Header: [{}, { Value: '내용' }], RelWidth: 10 },
            { Name: 'case11', Header: [{}, { Value: '확인서' }], RelWidth: 5 },
            { Name: 'case12', Header: [{ Value: '확정 공문', Span: 6 }, { Value: '지적 유형' }], RelWidth: 4 },
            { Name: 'case13', Header: [{}, { Value: '벌점' }], RelWidth: 3 },
            { Name: 'case14', Header: [{}, { Value: '확정일' }], RelWidth: 4 },
            { Name: 'case15', Header: [{}, { Value: '조치 대상' }], RelWidth: 4 },
            { Name: 'case16', Header: [{}, { Value: '조치 내용' }], RelWidth: 10 },
            { Name: 'case17', Header: [{}, { Value: '첨부 파일' }], RelWidth: 4 },
            { Name: 'case18', Header: [{ Value: '최종 벌점', Span: 2 }, { Value: '확정 여부' }], Type: 'Enum', Enum: '|N/A|벌점확정|벌점취소', EnumKeys: '|1|2|3', RelWidth: 4 },
            { Name: 'case19', Header: [{}, { Value: '확정 벌점' }], RelWidth: 4 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
        { case1: '', case2: '1', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
        { case1: '', case2: '1', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
        { case1: '', case2: '1', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
        { case1: '', case2: '1', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
    ],
}

/* InspectionList3: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외 점검 관리(All Sites) - 대외점검 */
export const InspectionList3 = {
    options: {
      Cols: [
        { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 15 },
        { Name: 'case3', Header: [{ Value: '점검종류', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case4', Header: [{ Value: '점검기관', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case5', Header: [{ Value: '상세점검목적', RowSpan: 2 }], RelWidth: 15, },
        { Name: 'case6', Header: [{ Value: '점검자', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case7', Header: [{ Value: '진행 \n 상태', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case8', Header: [{ Value: '점검일', RowSpan: 2 }], RelWidth: 10 },
        // { Name: 'case9', Header: [{ Value: '실시일자', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'case10', Header: [{ Value: '총 지적 \n 건수', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case11', Header: [{ Value: '확인서 작성', Span: 2 }, { Value: 'Total' }], RelWidth: 5 },
        { Name: 'case12', Header: [{}, { Value: '완료' }], RelWidth: 5 },
        // { Name: 'case13', Header: [{ Value: '최종 \n 벌점', RowSpan: 2 }], RelWidth: 5 },
        { Name: 'case14', Header: [{ Value: '첨부 \n 파일', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 5 },
        { Name: 'case15', Header: [{ Value: '점검결과 \n 입력일자', RowSpan: 2 }], RelWidth: 5 },
      ]
    },
    data: [
        { case1: '1', case2: '남양주 덕은지구 복합시설 신축공사', case3: '품질검수단 점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '완료', case8: '2021-11-01 ~ 2021-11-01', /* case9: '2021-1128 ~ 2021-11-28', */ case10: '0', case11: '0', case12: '0', /* case13: 'N/A', */ case14: '0', case15: '2021-11-26' },
        { case1: '1', case2: '남양주 덕은지구 복합시설 신축공사', case3: '품질검수단 점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '완료', case8: '2021-11-01 ~ 2021-11-01', /* case9: '2021-1128 ~ 2021-11-28', */ case10: '0', case11: '0', case12: '0', /* case13: 'N/A', */ case14: '', case15: '2021-11-26' },
        { case1: '1', case2: '남양주 덕은지구 복합시설 신축공사', case3: '품질검수단 점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '완료', case8: '2021-11-01 ~ 2021-11-01', /* case9: '2021-1128 ~ 2021-11-28', */ case10: '0', case11: '0', case12: '0', /* case13: 'N/A', */ case14: '', case15: '2021-11-26' },
        { case1: '1', case2: '남양주 덕은지구 복합시설 신축공사', case3: '품질검수단 점검', case4: '경기도청', case5: '특별안전점검', case6: '이현대', case7: '완료', case8: '2021-11-01 ~ 2021-11-01', /* case9: '2021-1128 ~ 2021-11-28', */ case10: '0', case11: '0', case12: '0', /* case13: 'N/A', */ case14: '', case15: '2021-11-26' },
    ],
}


/* InspectionList4: SQMS_WS03_001 점검 및 교육 > 대외 점검 > 대외 점검 관리(All Sites) - 지적사항 */
export const InspectionList4 = {
    options: {
        Cols: [ 
            { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 2 },
            { Name: 'case2', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 11 },
            { Name: 'case3', Header: [{ Value: '점검종류', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'case4', Header: [{ Value: '점검기관', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'case5', Header: [{ Value: '점검일', RowSpan: 2 }], RelWidth: 8 },
            { Name: 'case6', Header: [{ Value: '점검 결과', Span: 6 }, { Value: '점검자' }], RelWidth: 4 },
            { Name: 'case7', Header: [{}, { Value: '분야' }], RelWidth: 6 },
            { Name: 'case8', Header: [{}, { Value: '대상 공종' }], RelWidth: 4 },
            { Name: 'case9', Header: [{}, { Value: '제목' }], RelWidth: 8 },
            { Name: 'case10', Header: [{}, { Value: '내용' }], RelWidth: 8 },
            { Name: 'case11', Header: [{}, { Value: '확인서' }], RelWidth: 5 },
            { Name: 'case12', Header: [{ Value: '확정공문', Span: 6 }, { Value: '지적유형' }], RelWidth: 4 },
            { Name: 'case13', Header: [{}, { Value: '벌점' }], RelWidth: 3 },
            { Name: 'case14', Header: [{}, { Value: '확정일' }], RelWidth: 4 },
            { Name: 'case15', Header: [{}, { Value: '조치 대상' }], RelWidth: 4 },
            { Name: 'case16', Header: [{}, { Value: '내용' }], RelWidth: 8 },
            { Name: 'case17', Header: [{}, { Value: '첨부 파일' }], RelWidth: 4 },
            { Name: 'case18', Header: [{ Value: '최종 벌점', Span: 2 }, { Value: '확정 여부' }], Type: 'Enum', Enum: '|N/A|벌점확정|벌점취소', EnumKeys: '|1|2|3', RelWidth: 4 },
            { Name: 'case19', Header: [{}, { Value: '확정 벌점' }], RelWidth: 4 },
        ]
    },
    data: [
        { case1: '1', case2: '고양시 덕은지구 복합시설 신축공사', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
        { case1: '1', case2: '고양시 덕은지구 복합시설 신축공사', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
        { case1: '1', case2: '고양시 덕은지구 복합시설 신축공사', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
        { case1: '1', case2: '고양시 덕은지구 복합시설 신축공사', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
        { case1: '1', case2: '고양시 덕은지구 복합시설 신축공사', case3: '정기점검(기타)', case4: '국토교통부', case5: '2021-11-01 ~ 2021-11-01', case6: '최현대', case7: '기타(안전 포함)', case8: '인천', case9: '피난안전구역 창문 고정상태 유지 확인', case10: '25층 피난안전구역 창문은 고정상태 유지여부 확인', case11: 'N', case12: '주의', case13: '1', case14: '2021-11-26', case15: 'HEC', case16: '조치 내용입니다.', case17: '', case18: '1', case19: '3' },
    ],
}

/* InspectionPenalty: SQ_SPEC_EXTN_W_012 점검 및 교육 > 대외 점검 > 대외점검 관리(My Site) > 대외 점검(toggle) > 최종 벌점 작성 */
export const InspectionPenalty = {
    options: {
        Cols: [ 
            { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'case2', Header: [{ Value: '분야', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case3', Header: [{ Value: '제목', RowSpan: 2 }], Class: 'al pl20 pr20', RelWidth: 30 },
            { Name: 'case4', Header: [{ Value: '지적 유형', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case5', Header: [{ Value: '최초 벌점', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'case6', Header: [{ Value: '확정일', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case7', Header: [{ Value: '조치 대상', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case8', Header: [{ Value: '<span class="emp_red">최종 벌점</span>', Span: 2, Type: 'Html' }, { Value: '확정 여부' }], Type: 'Enum', Enum: "|선택|벌점확정|벌점취소", EnumKeys: "|1|2|3", RelWidth: 10 },
            { Name: 'case9', Header: [{}, { Value: '확정 벌점' }], RelWidth: 10 },
        ]
    },
    data: [
        { case1: '1', case2: '기타(안전포함)', case3: '피난안전구역 창문 고정 상태 유지 확인', case4: '시정명령', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
        { case1: '2', case2: '품질시스템/환경', case3: '단열재 양생 후 시공', case4: '현지시정', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
        { case1: '3', case2: '건축', case3: '방수 레벨 확인', case4: '시정명령', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
        { case1: '4', case2: '건축', case3: '방수 레벨 확인', case4: '시정명령', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
        { case1: '5', case2: '건축', case3: '방수 레벨 확인', case4: '시정명령', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
        { case1: '6', case2: '건축', case3: '방수 레벨 확인', case4: '시정명령', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
        { case1: '7', case2: '건축', case3: '방수 레벨 확인', case4: '시정명령', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
        { case1: '8', case2: '건축', case3: '방수 레벨 확인', case4: '시정명령', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
        { case1: '9', case2: '건축', case3: '방수 레벨 확인', case4: '시정명령', case5: '1', case6: '2021-11-26', case7: 'HEC', case8: '1', case9: '' },
    ],
}

/* InspectionList5: SQ_SPEC_EXTN_W_032 점검 및 교육 > 대외 점검 > 점검자별 성향 */
export const InspectionList5 = {
    options: {
        Cols: [ 
            { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'case2', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'case3', Header: [{ Value: '점검기관', RowSpan: 2 }], RelWidth: 15 },
            { Name: 'case4', Header: [{ Value: '부서', RowSpan: 2 }], RelWidth: 15 },
            { Name: 'case5', Header: [{ Value: '점검자', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case6', Header: [{ Value: '점검 현장 수', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'case7', Header: [{ Value: '점검자 분석 점수', Span: 3 }, { Value: '우호도' }], RelWidth: 10 },
            { Name: 'case8', Header: [{}, { Value: '적극성' }], RelWidth: 10 },
            { Name: 'case9', Header: [{}, { Value: '협의가능성' }], RelWidth: 10 },
            { Name: 'case10', Header: [{ Value: '벌점 누계', RowSpan: 2 }], RelWidth: 10 },
        ]
    },
    data: [
        { case1: '0', case2: '1', case3: '국토교통부', case4: '서울지방국토청', case5: '이현대', case6: '0', case7: '0', case8: '0', case9: '0', case10: '0' },
        { case1: '0', case2: '1', case3: '국토교통부', case4: '서울지방국토청', case5: '이현대', case6: '0', case7: '0', case8: '0', case9: '0', case10: '0' },
        { case1: '0', case2: '1', case3: '국토교통부', case4: '서울지방국토청', case5: '이현대', case6: '0', case7: '0', case8: '0', case9: '0', case10: '0' },
        { case1: '0', case2: '1', case3: '국토교통부', case4: '서울지방국토청', case5: '이현대', case6: '0', case7: '0', case8: '0', case9: '0', case10: '0' },
    ],
}

/* InspectionTendency: SQ_SPEC_EXTN_W_020 점검자 별 성향 > 점검자 별 성향 상세 - 점검자이력 (평가결과) */
export const InspectionTendency = {
    options: {
        Cfg: {
            NoVScroll: 0,
        },
        Cols: [ 
            { Name: 'case1', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'case2', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 50 },
            { Name: 'case3', Header: [{ Value: '점검자 분석 점수', Span: 4 }, { Value: '우호도' }], RelWidth: 10 },
            { Name: 'case4', Header: [{}, { Value: '적극성' }], RelWidth: 10 },
            { Name: 'case5', Header: [{}, { Value: '협의가능성' }], RelWidth: 10 },
            { Name: 'case6', Header: [{}, { Value: '점검자 의견' }], RelWidth: 15 },
        ]
    },
    data: [
        { case1: '1', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '2', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '3', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '4', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '5', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '6', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '7', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '8', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '9', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '10', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
        { case1: '10', case2: '오산역 복합시설 현장', case3: '4', case4: '5', case5: '4', case6: '꼼꼼하게 보는 감독관' },
    ],
}

/* InspectionTendency2: SQ_SPEC_EXTN_W_020 점검자 별 성향 > 점검자 별 성향 상세 - 점검자이력 (지적사항) */
export const InspectionTendency2 = {
    options: {
        Cfg: {
            NoVScroll: 0,
        },
        Cols: [ 
            { Name: 'case1', Header: [{ Value: '번호' }], RelWidth: 4 },
            { Name: 'case2', Header: [{ Value: '프로젝트명' }], RelWidth: 14 },
            { Name: 'case3', Header: [{ Value: '분야' }], RelWidth: 10 },
            { Name: 'case4', Header: [{ Value: '대상 공종' }], RelWidth: 10 },
            { Name: 'case5', Header: [{ Value: '제목' }], RelWidth: 14 },
            { Name: 'case6', Header: [{ Value: '내용' }], RelWidth: 14 },
            { Name: 'case7', Header: [{ Value: '확인서' }], RelWidth: 4 },
            { Name: 'case8', Header: [{ Value: '지적 유형' }], RelWidth: 4 },
            { Name: 'case9', Header: [{ Value: '벌점' }], RelWidth: 4 },
            { Name: 'case10', Header: [{ Value: '확정일' }], RelWidth: 10 },
            { Name: 'case11', Header: [{ Value: '조치 대상' }], RelWidth: 4 },
            { Name: 'case12', Header: [{ Value: '조치 내용' }], RelWidth: 10 },
            { Name: 'case13', Header: [{ Value: '첨부 파일' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 4 },
            { Name: 'case14', Header: [{ Value: '최종 벌점' }], RelWidth: 4 },
        ]
    },
    data: [
        { case1: '1', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        { case1: '2', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        { case1: '3', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        { case1: '4', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        { case1: '5', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        { case1: '6', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        { case1: '7', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        { case1: '8', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        // { case1: '9', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        // { case1: '10', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
        // { case1: '10', case2: '오산역 복합시설 현장', case3: '품질시스템/환경', case4: '품질관리(품질계획수립/실시)', case5: '품질관리계획서 배포대장 작성 필요', case6: '품질관리계획서 배포대장 작성 필요', case7: 'N', case8: '주의', case9: '0', case10: '2021-10-10', case11: 'HEC', case12: '', case13: '0', case14: '0' },
    ],
}

/* InspectionList6: SQ_SPEC_EXTN_W_034 점검 및 교육 > 대외 점검 > 지원요청 - 현장 */
export const InspectionList6 = {
    options: {
        Cols: [ 
            // { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 5 },
            { Name: 'case3', Header: [{ Value: '상태' }], RelWidth: 20 },
            { Name: 'case4', Header: [{ Value: '수신 부서' }], RelWidth: 50 },
            { Name: 'case5', Header: [{ Value: '요청자' }], RelWidth: 10 },
            { Name: 'case6', Header: [{ Value: '요청일' }], RelWidth: 10 },
            { Name: 'case7', Header: [{ Value: '첨부 \n 파일' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"},  RelWidth: 10 },
            { Name: 'case8', Header: [{ Value: '심의 \n 위원회' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_write'>작성</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 10 },
        ]
    },
    data: [
        { /* case1: '', */ case2: '1', case3: '출장 지원', case4: '경영DI팀', case5: '이현대', case6: '2021-11-27', case7: '0', case8: '0' },
        { /* case1: '', */ case2: '2', case3: '출장 지원', case4: '경영DI팀', case5: '이현대', case6: '2021-11-27', case7: '0', case8: '0' },
        { /* case1: '', */ case2: '3', case3: '출장 지원 / 이의신청', case4: '경영DI팀', case5: '이현대', case6: '2021-11-27', case7: '0', case8: '1' },
        { /* case1: '', */ case2: '4', case3: '출장 지원 / 이의신청', case4: '경영DI팀', case5: '이현대', case6: '2021-11-27', case7: '0', case8: '1' },
        { /* case1: '', */ case2: '5', case3: '출장 지원 / 이의신청', case4: '경영DI팀', case5: '이현대', case6: '2021-11-27', case7: '0', case8: '1' },
    ],
}

/* InspectionList7: SQ_SPEC_EXTN_W_040 점검 및 교육 > 대외 점검 > 지원요청 - 본사 */
export const InspectionList7 = {
    options: {
        Cols: [ 
            { Name: 'case1', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'case2', Header: [{ Value: '번호' }], RelWidth: 5 },
            { Name: 'case3', Header: [{ Value: '프로젝트명' }], RelWidth: 20 },
            { Name: 'case4', Header: [{ Value: '상태' }], RelWidth: 15 },
            { Name: 'case5', Header: [{ Value: '수신 부서' }], RelWidth: 35 },
            { Name: 'case6', Header: [{ Value: '요청자' }], RelWidth: 10 },
            { Name: 'case7', Header: [{ Value: '요청일' }], RelWidth: 10 },
            { Name: 'case8', Header: [{ Value: '첨부 \n 파일' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"},  RelWidth: 5 },
            { Name: 'case9', Header: [{ Value: '심의 \n 위원회' }], CanEdit: 0, Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '신도림동 오피스텔 신축사업', case4: '출장 지원', case5: '경영DI팀', case6: '이현대', case7: '2021-11-27', case8: '0', case9: '' },
        { case1: '', case2: '2', case3: '신도림동 오피스텔 신축사업', case4: '출장 지원', case5: '경영DI팀', case6: '이현대', case7: '2021-11-27', case8: '0', case9: '' },
        { case1: '', case2: '4', case3: '신도림동 오피스텔 신축사업', case4: '출장 지원 / 이의신청', case5: '경영DI팀', case6: '이현대', case7: '2021-11-27', case8: '0', case9: '1' },
        { case1: '', case2: '3', case3: '신도림동 오피스텔 신축사업', case4: '출장 지원 / 이의신청', case5: '경영DI팀', case6: '이현대', case7: '2021-11-27', case8: '0', case9: '1' },
        { case1: '', case2: '5', case3: '신도림동 오피스텔 신축사업', case4: '출장 지원 / 이의신청', case5: '경영DI팀', case6: '이현대', case7: '2021-11-27', case8: '0', case9: '1' },
    ],
}
  

/* EduplanList: SQMS_WS03_003 점검 및 교육 > 교육관리 > 교육 훈련 계획/실시(내현장) */
export const EduplanList = {
    options: {
        Cfg:{
            NoVScroll: 0,
            NoDataMessage : 3,
            MultiRecord: true,
        },
        Cols: [
            [
            { Name: 'isCheck', Header: { Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center'}, Type: 'Bool', CanSort: 0, Width: 30, RecordRowSpan: 2 },
            { Name: 'gjName', Header: { Value: '공종' }, CanEdit: 0, Width: 40 , RecordRowSpan: 2 },
            { Name: 'kindName', Header: { Value: '종류'}, CanEdit: 0, Width: 110, RecordRowSpan: 2 },
            { Name: 'eduTargetType', Header: { Value: '대상' }, CanEdit: 0, Width: 100, RecordRowSpan: 2 },
            { Name: 'eduType', Header: { Value: '구분' }, CanEdit: 0, Width: 100, RecordRowSpan: 2 },
            { Name: 'eduCourseName', Header: { Value: '교육 과정명' }, CanEdit: 0, Width: 100, RecordRowSpan: 2 },
            { Name: 'eduTcher', Header: { Value: '강사'}, CanEdit: 0, Width: 100, RecordRowSpan: 2 },
            // { Name: 'eduPlanDay', Header: { Value: '교육 \n 계획일자' }, CanEdit: 0, Width: 122, RecordRowSpan: 2 },
            // { Name: 'eduInspDay', Header: { Value: '교육 \n 실시일자' }, CanEdit: 0, Width: 122, RecordRowSpan: 2 }, 
            { Name: 'inspStatus', Header: { Value: '실시 \n 현황' }, CanEdit: 0, Width: 35, RecordRowSpan: 2 },
            { Name: 'plan', Header: { Value: '계획' }, CanEdit: 0, Width: 35},
            { Name: 'up1', Header: { Value: '월간 교육 훈련 계획' }, Type: 'Html', Width: 100 },
            { Name: 'up2', Header: { Value: '2' }, Type: 'Html', Width: 100 },
            { Name: 'up3', Header: { Value: '3' }, Type: 'Html', Width: 100 },
            { Name: 'up4', Header: { Value: '4' }, Type: 'Html', Width: 100 },
            { Name: 'up5', Header: { Value: '5' }, Type: 'Html', Width: 100 },
            { Name: 'up6', Header: { Value: '6' }, Type: 'Html', Width: 100 },
            { Name: 'up7', Header: { Value: '7' }, Type: 'Html', Width: 100 },
            { Name: 'up8', Header: { Value: '8' }, Type: 'Html', Width: 100 },
            { Name: 'up9', Header: { Value: '9' }, Type: 'Html', Width: 100 },
            { Name: 'up10', Header: { Value: '10' }, Type: 'Html', Width: 100 },
            { Name: 'up11', Header: { Value: '11' }, Type: 'Html', Width: 100 },
            { Name: 'up12', Header: { Value: '12' }, Type: 'Html', Width: 100 },
            { Name: 'eduPlanStartDt', RecordRowSpan: 2, Visible: 0},
            { Name: 'eduPlanEndDt', RecordRowSpan: 2, Visible: 0},
            { Name: 'eduInspStartDt', RecordRowSpan: 2, Visible: 0},
            { Name: 'eduInspEndDt', RecordRowSpan: 2, Visible: 0},
            { Name: 'eduMngId', RecordRowSpan: 2, Visible: 0}
            ],
            [
            { Header: ''  , Width: 10},
            { Header: '공종' },
            { Header: '종류' },
            { Header: '대상' },
            { Header: '구분' },
            { Header: '교육 과정명' },
            { Header: '강사' },
            // { Header: '교육 \n 계획일자' },
            // { Header: '교육 \n 실시일자' },
            { Header: '실시 \n 현황' },                    
            // { Header: '실시' },                    
            { Name: 'active', Header: { Value: '실시' }, CanEdit: 0,  Width: 35 },
            { Name: 'dw1', Header: { Value: '1' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw2', Header: { Value: '2' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw3', Header: { Value: '3' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw4', Header: { Value: '4' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw5', Header: { Value: '5' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw6', Header: { Value: '6' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw7', Header: { Value: '7' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw8', Header: { Value: '8' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw9', Header: { Value: '9' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw10', Header: { Value: '10' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw11', Header: { Value: '11' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Name: 'dw12', Header: { Value: '12' }, CanEdit: 0, Type: 'Html', Width: 100 },
            { Header: 'eduPlanStartDt', Visible: 0},
            { Header: 'eduPlanEndDt', Visible: 0},
            { Header: 'eduInspStartDt', Visible: 0},
            { Header: 'eduInspEndDt', Visible: 0},
            { Header: 'eduMngId', Visible: 0}
            ]
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '건축', case4: 'IT', case5: '현장구성원', case6: '온라인', case7: 'BIM 교육', case8: '방현대 책임', case9: '2021-1128 ~ 2021-11-28', case10: '2021-1128 ~ 2021-11-28', case11: '예정', case12: '계획', case13: '', case14: '', case15: '', case16: '', case17: '', case18: '', case19: '', case20: '', case21: '', case22: '<a href="javascript:void(0);" class="point_color">실시등록</a>', case23: '', case24: '' },
        // { case1: '', case2: '1', case3: '건축', case4: 'IT', case5: '현장구성원', case6: '온라인', case7: 'BIM 교육', case8: '방현대 책임', case9: '2021-1128 ~ 2021-11-28', case10: '2021-1128 ~ 2021-11-28', case11: '예정', case12: '계획', case13: '', case14: '', case15: '', case16: '', case17: '', case18: '', case19: '', case20: '', case21: '', case22: '', case23: '', case24: '' },
        // { case1: '', case2: '1', case3: '건축', case4: 'IT', case5: '현장구성원', case6: '온라인', case7: 'BIM 교육', case8: '방현대 책임', case9: '2021-1128 ~ 2021-11-28', case10: '2021-1128 ~ 2021-11-28', case11: '예정', case12: '계획', case13: '', case14: '', case15: '', case16: '', case17: '', case18: '', case19: '', case20: '', case21: '', case22: '', case23: '', case24: '' },
    ],
  }
  
/* EduplanList2: SQMS_WS03_003 점검 및 교육 > 교육관리 > 교육 훈련 계획/실시(내현장) */
export const EduplanList2 = {
    options: {
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호' }], CanEdit: 0, RelWidth: 5 },
            { Name: 'csrtTypeNm', Header: [{ Value: '공사 유형' }], CanEdit: 0, RelWidth: 15 },
            { Name: 'projectCd', Header: [{ Value: '프로젝트 코드' }], CanEdit: 0, RelWidth: 15 },
            { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], CanEdit: 0, RelWidth: 15 },
            { Name: 'gjName', Header: [{ Value: '공종' }], CanEdit: 0, RelWidth: 5 },
            { Name: 'kindName', Header: [{ Value: '종류' }], CanEdit: 0, RelWidth: 10 },
            { Name: 'eduTargetType', Header: [{ Value: '대상' }], CanEdit: 0, RelWidth: 10 },
            { Name: 'eduCourseName', Header: [{ Value: '교육 과정명' }], CanEdit: 0, RelWidth: 15 },
            { Name: 'eduTcher', Header: [{ Value: '강사' }], CanEdit: 0, RelWidth: 10 },
            // { Name: 'eduPlanDay', Header: [{ Value: '교육 계획일자' }], CanEdit: 0, RelWidth: 15 },
            // { Name: 'eduInspDay', Header: [{ Value: '교육 실시일자' }], CanEdit: 0, RelWidth: 15 },
            { Name: 'inspStatus', Header: [{ Value: '실시현황' }], CanEdit: 0, RelWidth: 10 },
            { Name: 'eduPlanStartDt', Visible: 0},
            { Name: 'eduInspStartDt', Visible: 0},
            { Name: 'eduMngId', Visible: 0},
        ]
    },
    data: [
        { case1: '1', case2: '플랜트(화공)', case3: '신도림동 오피스텔 신축사업', case4: '건축', case5: 'IT', case6: '현장구성원', case7: 'BIM 교육', case8: '방현대 책임', case9: '완료' },
        // { case1: '1', case2: '플랜트(화공)', case3: '신도림동 오피스텔 신축사업', case4: '건축', case5: 'IT', case6: '현장구성원', case7: 'BIM 교육', case8: '방현대 책임', case9: '2021-1128 ~ 2021-11-28', case10: '2021-1128 ~ 2021-11-28', case11: '완료' },
        // { case1: '1', case2: '플랜트(화공)', case3: '신도림동 오피스텔 신축사업', case4: '건축', case5: 'IT', case6: '현장구성원', case7: 'BIM 교육', case8: '방현대 책임', case9: '2021-1128 ~ 2021-11-28', case10: '2021-1128 ~ 2021-11-28', case11: '완료' },
    ],
}

/* EquipmentList: SQMS_WS03_003_01 점검 및 교육 > 교육관리 > All Sites */
export const EquipmentList = {
    options: {
        Cfg:{
            NoDataMessage:3,
            NoVScroll: false,
        },
        Cols: [
            { Name: 'checkYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 , CanEdit: 0},
            { Name: 'holdingCompany', Header: [{ Value: '보유업체', RowSpan: 2 }], RelWidth: 5, CanEdit: 0 },
            { Name: 'confinalNm', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 5 , CanEdit: 0},
            { Name: 'deviceNm', Header: [{ Value: '계측기명', RowSpan: 2 }], RelWidth: 15 , CanEdit: 0},
            { Name: 'correctTerm', Header: [{ Value: '교정주기', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
            { Name: 'deviceNum', Header: [{ Value: '기기번호', RowSpan: 2 }], RelWidth: 10 , CanEdit: 0},
            { Name: 'correctDate', Header: [{ Value: '교정상태', Span: 3 }, { Value: '교정 일자' }], RelWidth: 5 , CanEdit: 0},
            { Name: 'bforRst', Header: [{}, { Value: '교정 전' }], RelWidth: 5 , CanEdit: 0},
            { Name: 'aftrRst', Header: [{}, { Value: '교정 후' }], RelWidth: 5 , CanEdit: 0},
            { Name: 'nextDate', Header: [{ Value: '차기 검교정일자', Span: 2 }, { Value: 'Date' }], RelWidth: 5, CanEdit: 0 },
            { Name: 'remain', Header: [{}, { Value: 'Remain' }], RelWidth: 5, CanEdit: 0 },
            { Name: 'statusNm', Header: [{ Value: '보유/반출 상태', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
            { Name: 'delayYn', Header: [{ Value: '검교정 상태', RowSpan: 2 }], RelWidth: 5, CanEdit: 0 },
            { Name: 'useYn', Header: [{ Value: '사용여부', RowSpan: 2 }], RelWidth: 5, CanEdit: 0 },
            { Name: 'fileYn', Header: [{ Value: '첨부파일', RowSpan: 2 }], RelWidth: 5 , CanEdit: 0, Format: {"0": "","1": "<button type='button' class='btn_file no_text'>파일</button>"}},
        ]
    },
    data: [
        { case1: '', case2: '1', case3: 'HEC', case4: '공통', case5: '콘크리트 압축강도 시험기', case6: '1년', case7: '1711252', case8: '2020-06-30', case9: '합격', case10: '합격', case11: '2019-01-02', case12: '-1054', case13: '반출', case14: 'N/A', case15: '' },
        { case1: '', case2: '1', case3: 'HEC', case4: '공통', case5: '콘크리트 압축강도 시험기', case6: '1년', case7: '1711252', case8: '2020-06-30', case9: '합격', case10: '합격', case11: '2019-01-02', case12: '-1054', case13: '반출', case14: 'N/A', case15: '' },
        { case1: '', case2: '1', case3: 'HEC', case4: '공통', case5: '콘크리트 압축강도 시험기', case6: '1년', case7: '1711252', case8: '2020-06-30', case9: '합격', case10: '합격', case11: '2019-01-02', case12: '-1054', case13: '반출', case14: 'N/A', case15: '' },
    ],
}

/* WorkerTrainingList: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(공종/세부공종) */
export const WorkerTrainingList = {
    options: {
        Cols: [
            { Name: 'isCheck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'langName', Header: [{ Value: '언어' }], RelWidth: 70, CanEdit: 0 },
            { Name: 'langCode', Visible: 0},
            { Name: 'workerEduLangId', Visible: 0},
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '건축', case4: '가설공사' },
        { case1: '', case2: '1', case3: '건축', case4: '가설공사' },
        { case1: '', case2: '1', case3: '건축', case4: '가설공사' },
    ],
}

/* WorkerTrainingList2: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(언어 설정) */
export const WorkerTrainingList2 = {
    options: {
        Cols: [
            { Name: 'isCheck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
            { Name: 'codeNameKr', Header: [{ Value: '언어' }], RelWidth: 80, CanEdit:0 },
            { Name: 'codeVal', Visible: 0 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '영어' },
        { case1: '', case2: '1', case3: '한국어' },
        { case1: '', case2: '1', case3: '중국어' },
    ],
}

/* WorkerTrainingList3: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(언어 번역) */
export const WorkerTrainingList3 = {
    options: {
        Cols: [
            { Name: 'isCheck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
            { Name: 'code', Header: [{ Value: '코드' }], RelWidth: 30, CanEdit: 0 },
            { Name: 'codeType', Header: [{ Value: '교육구분' }], RelWidth: 15, CanEdit: 0 },
            { Name: 'codeName', Header: [{ Value: '코드명' }], RelWidth: 55, CanEdit: 0 },
            { Name: 'transCodeName', Header: [{ Value: '번역' }], RelWidth: 55 },
            { Name: 'codeMultiLangId',  Visible: 0 },
            { Name: 'langCode',  Visible: 0 },
            { Name: 'codeSubType',  Visible: 0 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '건축', case4: 'Architecture' },
        { case1: '', case2: '1', case3: '가설공사', case4: 'Temporary Construction' },
        { case1: '', case2: '1', case3: '거푸집공사', case4: 'Formwork' },
    ],
}

/* WorkerTrainingList3: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(언어 번역) */
export const WorkerEduTranSlantion = {
    options: {
        Cols: [
            // { Name: 'isCheck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5 },
            { Name: 'contsPage', Header: [{ Value: '페이지번호' }], RelWidth: 10 },
            { Name: 'contsType', Header: [{ Value: 'TYPE' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'korean', Header: [{ Value: '한국어' }], RelWidth: 55, CanEdit: 0 },
            { Name: 'transContsName', Header: [{ Value: '번역' }], RelWidth: 55 },
            { Name: 'contsMultiLangId',  Visible: 0 },
            { Name: 'contsPage',  Visible: 0 },
            { Name: 'contsPageName',  Visible: 0 },
            { Name: 'contsLoc',  Visible: 0 },
        ]
    },
    data: [
        { contsLoc : '1', contsPage: '0', contsType: 'PLACEHOLDER', korean: '성명', transContsName: '', contsPageName: '로그인'},
        { contsLoc : '2', contsPage: '0', contsType: 'PLACEHOLDER', korean: '휴대전화번호(번호만 입력해주세요)', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '3', contsPage: '0', contsType: 'BUTTON', korean: '인증요청', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '4', contsPage: '0', contsType: 'PLACEHOLDER', korean: '인증번호', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '5', contsPage: '0', contsType: 'BUTTON', korean: '확인', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '6', contsPage: '0', contsType: 'TEXT', korean: '인증안내', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '7', contsPage: '0', contsType: 'TEXT', korean: '본인의 휴대전화번호를 입력후 "인증요청" 버튼을 눌러주십시오.', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '8', contsPage: '0', contsType: 'TEXT', korean: '받은 인증번호를 입력후 "확인" 버튼을 누르십시오.', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '9', contsPage: '0', contsType: 'MESSAGE', korean: '사용자 정보가 존재하지 않습니다.', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '10', contsPage: '0', contsType: 'MESSAGE', korean: '이름을 입력해주세요.', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '11', contsPage: '0', contsType: 'MESSAGE', korean: '휴대전화번호를 입력해주세요.', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '12', contsPage: '0', contsType: 'MESSAGE', korean: '인증요청 해주세요.', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '13', contsPage: '0', contsType: 'MESSAGE', korean: '인증번호가 일치하지 않습니다. 인증번호를 재전송하세요.', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '14', contsPage: '0', contsType: 'MESSAGE', korean: '남은시간', transContsName: '', contsPageName: '로그인' },
        { contsLoc : '1', contsPage: '1', contsType: 'TEXT', korean: '공종선택', transContsName: '', contsPageName: '공종선택' },
        { contsLoc : '2', contsPage: '1', contsType: 'TEXT', korean: '공통', transContsName: '', contsPageName: '공종선택' },
        { contsLoc : '3', contsPage: '1', contsType: 'TEXT', korean: '품질교육', transContsName: '', contsPageName: '공종선택' },
        { contsLoc : '1', contsPage: '2', contsType: 'TEXT', korean: '교육진행', transContsName: '', contsPageName: '교육진행' },
        { contsLoc : '2', contsPage: '2', contsType: 'BUTTON', korean: '교육이수 인증', transContsName: '', contsPageName: '교육진행' },
        { contsLoc : '3', contsPage: '2', contsType: 'TEXT', korean: '교육자료', transContsName: '', contsPageName: '교육진행' },
        { contsLoc : '4', contsPage: '2', contsType: 'TEXT', korean: '교육을 완료하신 후, 반드시 상단의 교육 이수인증 버튼을 눌러 이수 인증 및 품질서약서를 작성하여 주세요.', transContsName: '', contsPageName: '교육진행' },
        { contsLoc : '5', contsPage: '2', contsType: 'TEXT', korean: '영상을 끝까지 시청하지 않으면 이수 완료되지 않습니다.', transContsName: '', contsPageName: '교육진행' },
        { contsLoc : '6', contsPage: '2', contsType: 'MESSAGE', korean: '교육 영상을 끝까지 시청하셔야 이수 인증이 됩니다.', transContsName: '', contsPageName: '교육진행' },
        { contsLoc : '7', contsPage: '2', contsType: 'BUTTON', korean: '확인', transContsName: '', contsPageName: '교육진행' },
        { contsLoc : '1', contsPage: '3', contsType: 'TEXT', korean: '품질서약서', transContsName: '', contsPageName: '품질서약서' },
        { contsLoc : '2', contsPage: '3', contsType: 'TEXT', korean: '품질서약서를 읽어주시고, 동의하여 주시기 바랍니다.', transContsName: '', contsPageName: '품질서약서' },
        { contsLoc : '3', contsPage: '3', contsType: 'TEXT', korean: '나는 품질교육을 충실히 이수하였기에 서명하고,교육 내용과 작업 절차를 지켜 하자 예비와 품질향상을 위해 앞장 서겠습니다.', transContsName: '', contsPageName: '품질서약서' },
        { contsLoc : '4', contsPage: '3', contsType: 'TEXT', korean: '동의합니다.', transContsName: '', contsPageName: '품질서약서' },
        { contsLoc : '5', contsPage: '3', contsType: 'BUTTON', korean: '교육이수 완료', transContsName: '', contsPageName: '품질서약서' },
        { contsLoc : '6', contsPage: '3', contsType: 'MESSAGE', korean: '품질서약서에 동의에 체크해주세요.', transContsName: '', contsPageName: '품질서약서' },
        { contsLoc : '7', contsPage: '3', contsType: 'BUTTON', korean: '확인', transContsName: '', contsPageName: '품질서약서' },
        { contsLoc : '8', contsPage: '3', contsType: 'MESSAGE', korean: '교육 이수를 완료 하였습니다.', transContsName: '', contsPageName: '품질서약서' },
        { contsLoc : '9', contsPage: '3', contsType: 'MESSAGE', korean: '교육 이수에 실패했습니다.', transContsName: '', contsPageName: '품질서약서' },
    ],
}

/* WorkerTrainingList4: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(교재 등록) */
export const WorkerTrainingList4 = {
    options: {
        Cfg: {
            NoVScroll: false,
            // MaxVScroll : false,            
            NoDataMessage: 3,
        },
        Cols: [
            { Name: 'isCheck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'gubun', Header: [{ Value: '분류', RowSpan: 2 }], CanEdit: 0, RelWidth: 20 },
            { Name: 'langName', Header: [{ Value: '언어', RowSpan: 2 }], Type: 'Enum', Enum: "|선택|선택2", EnumKeys: "|1|2", Required: 1, RelWidth: 20 },
            { Name: 'mtrlName', Header: [{ Value: '교육명', RowSpan: 2 }], Required: 1, RelWidth: 70 },
            { Name: 'regDate', Header: [{ Value: '등록일', RowSpan: 2 }], Required: 0, RelWidth: 15 , CanEdit: 0},
            { Name: 'videoFileConnectId', Header: [{ Value: '첨부파일', Span: 2, Type: 'Html' }, { Value: '동영상' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_plus'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 12 },
            { Name: 'pdfFileConnectId', Header: [{}, { Value: 'PDF' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_plus'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 12 },
            { Name: 'workerEduMtrlId',  Visible: 0 },
            { Name: 'langCode',  Visible: 0 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '1', case4: '1', case5: '0', case6: '1' },
        { case1: '', case2: '2', case3: '1', case4: '1', case5: '0', case6: '1' },
        { case1: '', case2: '3', case3: '1', case4: '1', case5: '0', case6: '1' },
    ],
}
export const WorkerTrainingSiteSetUp4 = {
    options: {
        Cfg: {
            NoVScroll: false,
            // MaxVScroll : '250px',
            NoDataMessage: 3,
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], CanEdit: 0, RelWidth: 10 },
            { Name: 'gubun', Header: [{ Value: '분류', RowSpan: 2 }], CanEdit: 0, RelWidth: 20 },
            { Name: 'langName', Header: [{ Value: '언어', RowSpan: 2 }], CanEdit: 0, RelWidth: 20 }, //Type: 'Enum', Enum: "|선택|선택2", EnumKeys: "|1|2",
            { Name: 'mtrlName', Header: [{ Value: '교육명', RowSpan: 2 }], CanEdit: 0, RelWidth: 70 },
            { Name: 'regDate', Header: [{ Value: '등록일', RowSpan: 2 }], CanEdit: 0, RelWidth: 20 },
            { Name: 'videoFileConnectYn', Header: [{ Value: '첨부파일', Span: 2, Type: 'Html' }, { Value: '동영상' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_plus'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 10 },
            { Name: 'pdfFileConnectYn', Header: [{}, { Value: 'PDF' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_plus'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 10 },
            { Name: 'videoFileConnectId', Visible: 0 },
            { Name: 'pdfFileConnectId', Visible: 0 },
            { Name: 'workerEduMtrlId',  Visible: 0 },
            { Name: 'langCode',  Visible: 0 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '1', case4: '1', case5: '0', case6: '1' },
        { case1: '', case2: '2', case3: '1', case4: '1', case5: '0', case6: '1' },
        { case1: '', case2: '3', case3: '1', case4: '1', case5: '0', case6: '1' },
    ],
}

/* WorkerTrainingList5: SQ_SPEC_WKEDU_W_001 점검 및 교육 > 신규 근로자 교육 현황 > 본사 Set-up(공통 교재) */
export const WorkerTrainingList5 = {
    options: {
        Cfg: {
            NoVScroll: false,
            // MaxVScroll : '250px',
            // MaxVScroll: false,
            NoDataMessage: 3,
        },
        Cols: [
            { Name: 'isCheck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'mainCodeId', Header: [{ Value: '공종', RowSpan: 2 }], Type: 'Enum', Enum: "|선택|선택2", EnumKeys: "|1|2", RelWidth: 15 ,Required: 1},
            { Name: 'midCodeId', Header: [{ Value: '세부 공종', RowSpan: 2 }], Type: 'Enum', Enum: "|선택|선택2", EnumKeys: "|1|2", RelWidth: 25 ,Required: 1},
            { Name: 'langName', Header: [{ Value: '언어', RowSpan: 2 }], Type: 'Enum', Enum: "|선택|선택2", EnumKeys: "|1|2", Required: 1, RelWidth: 20 },//
            { Name: 'mtrlName', Header: [{ Value: '교육명', RowSpan: 2 }], RelWidth: 60 ,Required: 1},
            { Name: 'regDate', Header: [{ Value: '등록일', RowSpan: 2 }], RelWidth: 15 ,Required: 0, CanEdit: 0},
            { Name: 'videoFileConnectId', Header: [{ Value: '첨부파일', Span: 2, Type: 'Html' }, { Value: '동영상' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_plus'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 12 },
            { Name: 'pdfFileConnectId', Header: [{}, { Value: 'PDF' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_plus'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 12 },
            { Name: 'workerEduMtrlId',  Visible: 0 },
            { Name: 'langCode',  Visible: 0 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '1', case4: '1', case5: '1', case6: '1', case7: '0' },
        { case1: '', case2: '2', case3: '1', case4: '1', case5: '1', case6: '1', case7: '0' },
        { case1: '', case2: '3', case3: '1', case4: '1', case5: '1', case6: '1', case7: '0' },
    ],
}
export const WorkerTrainingSiteSetUp5 = {
    options: {
        Cfg: {
            NoVScroll: false,
            // MaxVScroll : '250px',
            NoDataMessage: 3,
        },
        Cols: [
            { Name: 'isCheck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
            { Name: 'mainCodeId', Header: [{ Value: '공종', RowSpan: 2 }], Type: 'Enum', RelWidth: 15, CanEdit: 0 },//Type: 'Enum', Enum: "|선택|선택2", EnumKeys: "|1|2",
            { Name: 'midCodeId', Header: [{ Value: '세부 공종', RowSpan: 2 }], Type: 'Enum', RelWidth: 25, CanEdit: 0 }, //Type: 'Enum', Enum: "|선택|선택2", EnumKeys: "|1|2",
            { Name: 'langName', Header: [{ Value: '언어', RowSpan: 2 }], RelWidth: 20, CanEdit: 0 },//Type: 'Enum', Enum: "|선택|선택2", EnumKeys: "|1|2", 
            { Name: 'mtrlName', Header: [{ Value: '교육명', RowSpan: 2 }], RelWidth: 60, CanEdit: 0 },
            { Name: 'regDate', Header: [{ Value: '등록일', RowSpan: 2 }], RelWidth: 15 ,Required: 0, CanEdit: 0},
            { Name: 'videoFileConnectYn', Header: [{ Value: '첨부파일', Span: 2, Type: 'Html' }, { Value: '동영상' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_plus'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 12 },
            { Name: 'pdfFileConnectYn', Header: [{}, { Value: 'PDF' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_plus'>등록</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 12 },
            { Name: 'workerEduMtrlId',  Visible: 0 },
            { Name: 'videoFileConnectId',  Visible: 0 },
            { Name: 'pdfFileConnectId',  Visible: 0 },
            { Name: 'langCode',  Visible: 0 },
            { Name: 'mainName',  Visible: 0 },
            { Name: 'midName',  Visible: 0 },
        ]
    },
    data: [
        { case1: '', case2: '1', case3: '1', case4: '1', case5: '1', case6: '1', case7: '0' },
        { case1: '', case2: '2', case3: '1', case4: '1', case5: '1', case6: '1', case7: '0' },
        { case1: '', case2: '3', case3: '1', case4: '1', case5: '1', case6: '1', case7: '0' },
    ],
}

/* EducationStatusList: SQ_SPEC_WKEDU_W_010 점검 및 교육 > 신규 근로자 교육 현황 > 교육현황(내현장) */
export const EducationStatusList = {
    options: {
        Cfg: {
            NoVScroll: false,
            // MaxVScroll : '250px',
            NoDataMessage: 3,
        },
        Cols: [
            { Name: 'partnrName', Header: [{ Value: '협력사' }], RelWidth: 24, CanEdit: 0 },
            { Name: 'workerEduType', Header: [{ Value: '교육구분' }], RelWidth: 24, CanEdit: 0 },
            { Name: 'mainName', Header: [{ Value: '공종' }], CanEdit: 0 , RelWidth: 22 },
            { Name: 'midName', Header: [{ Value: '상세공종' }], CanEdit: 0, RelWidth: 22 },
            { Name: 'cmptCnt', Header: [{ Value: '이수자' }], CanEdit: 0, RelWidth: 22 },
            { Name: 'detailBtn', Header: [{ Value: '상세 보기' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 10 },
            { Name: 'workerEduMtrlId',  Visible: 0 },
            { Name: 'partnrId',  Visible: 0 },
            { Name: 'projectId',  Visible: 0 },
            { Name: 'mainCodeId',  Visible: 0 },
            { Name: 'midCodeId',  Visible: 0 },
            { Name: 'mtrlName',  Visible: 0 },
        ]
    },
    data: [
        { case1: 'ㅇㅇ토건', case2: '건축', case3: '건축', case4: '102명', case5: '0' },
        { case1: 'ㅇㅇ토건', case2: '건축', case3: '가설공사', case4: '56명', case5: '0' },
        { case1: 'ㅇㅇ토건', case2: '건축', case3: '거푸집공사', case4: '24명', case5: '0' },
    ],
}


/* EducationStatusList2: SQ_SPEC_WKEDU_W_010 점검 및 교육 > 신규 근로자 교육 현황 > 교육현황(전체현장) */
export const EducationStatusList2 = {
    options: {
        Cfg: {
            NoVScroll: false,
            // MaxVScroll : '250px',
            NoDataMessage: 3,
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5 },
            { Name: 'baseTypeName', Header: [{ Value: '공사유형', Span: 2 }], CanEdit: 0, RelWidth: 5 },
            { Name: 'csrtTypeNm', Header: [{}], CanEdit: 0 , RelWidth: 5 },
            { Name: 'projNm', Header: [{ Value: '프로젝트명' }], CanEdit: 0 , RelWidth: 30 },
            { Name: 'partnrName', Header: [{ Value: '협력사' }], CanEdit: 0 , RelWidth: 10 },
            { Name: 'workerEduType', Header: [{ Value: '교육구분' }], RelWidth: 5 },
            { Name: 'mainName', Header: [{ Value: '공종' }], CanEdit: 0 , RelWidth: 10 },
            { Name: 'midName', Header: [{ Value: '상세공종' }], CanEdit: 0 , RelWidth: 10 },
            { Name: 'cmptCnt', Header: [{ Value: '이수자' }], CanEdit: 0, RelWidth: 10 },
            { Name: 'detailBtn', Header: [{ Value: '상세보기' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 10 },
            { Name: 'workerEduMtrlId',  Visible: 0 },
            { Name: 'partnrId',  Visible: 0 },
            { Name: 'projectId',  Visible: 0 },
            { Name: 'mainCodeId',  Visible: 0 },
            { Name: 'midCodeId',  Visible: 0 },
            { Name: 'mtrlName',  Visible: 0 },
        ]
    },
    data: [
        { case1: '1', case2: '건축', case3: '공동주택', case4: '고양시 덕은지구 복합시설 신축공사', case5: 'ㅇㅇ토건', case6: '건축', case7: '가설공사', case8: '102명', case9: '0' },
        { case1: '2', case2: '건축', case3: '-', case4: '고양시 덕은지구 복합시설 신축공사', case5: 'ㅇㅇ토건', case6: '건축', case7: '가설공사', case8: '102명', case9: '0' },
        { case1: '3', case2: '건축', case3: '-', case4: '고양시 덕은지구 복합시설 신축공사', case5: 'ㅇㅇ토건', case6: '건축', case7: '가설공사', case8: '102명', case9: '0' },
        { case1: '4', case2: '건축', case3: '-', case4: '고양시 덕은지구 복합시설 신축공사', case5: 'ㅇㅇ토건', case6: '건축', case7: '가설공사', case8: '102명', case9: '0' },
        { case1: '5', case2: '건축', case3: '-', case4: '고양시 덕은지구 복합시설 신축공사', case5: 'ㅇㅇ토건', case6: '건축', case7: '가설공사', case8: '102명', case9: '0' },
    ],
}
