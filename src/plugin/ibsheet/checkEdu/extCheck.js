/** 대외점검 IBSheet Data */

/**  대외점검 관리 */


export const EXT_CHECK_MNGT_MY_EXTRNL = {
    options: {
        Cfg: {
            // CanEdit: false,
            NoVScroll: false,
        },
        Cols: [
            { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 2 },
            { Name: 'SEQ', Header: [{ Value: 'NO', RowSpan: 2 }], CanEdit: false, RelWidth: 3 },
            { Name: 'chckKnd', Header: [{ Value: '점검종류', RowSpan: 2 }], CanEdit: false, RelWidth: 10, Type: 'Enum'},
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검기관', RowSpan: 2 }], CanEdit: false, RelWidth: 7 },
            { Name: 'chckPurpsCn', Header: [{ Value: '상세점검목적', RowSpan: 2 }], Class: 'al pl20 pr20', CanEdit: false, RelWidth: 20 },
            { Name: 'insctrNmDtls', Header: [{ Value: '점검자', RowSpan: 2 }], CanEdit: false, RelWidth: 4, },
            { Name: 'chckde', Header: [{ Value: '점검일', RowSpan: 2 }], CanEdit: false, RelWidth: 5 },
            { Name: 'finlCmpltYn', Header: [{ Value: '점검\n상태', RowSpan: 2}], CanEdit: false, RelWidth: 2, Type: 'Enum', Enum: '|완료|등록|등록|등록', EnumKeys: '|Y|N||null' },
            // { Name: 'case8', Header: [{ Value: '점검정보', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
            { Name: 'chckRslt', Header: [{ Value: '점검결과', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>", "2":"N/A"}, RelWidth: 4 },
            { Name: 'poutDcsnDiv', Header: [{ Value: '확정공문', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>", "2":"N/A"}, RelWidth: 4 },
            { Name: 'resultDlbrtCmitYn', Header: [{ Value: '심의위원회', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>", "2":"N/A"}, RelWidth: 4 },
            { Name: 'demLastDcsnBtnYn', Header: [{ Value: '최종벌점', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>", "2":"N/A"}, RelWidth: 4 },
            // { Name: 'case12', Header: [{ Value: '실시일자', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'poutCnt', Header: [{ Value: '총\n 지적 \n 건수', RowSpan: 2 }], CanEdit: false, RelWidth: 3 },
            { Name: 'cnfrmnCnt', Header: [{ Value: '확인서 작성', Span: 2 }, { Value: 'Total' }], CanEdit: false, RelWidth: 3 },
            { Name: 'dcsnCnt', Header: [{}, { Value: '완료' }], CanEdit: false, RelWidth: 3 },
            { Name: 'poutFileYn', Header: [{ Value: '첨부파일', Span: 2 }, { Value: '점검 \n 결과' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 3 },
            { Name: 'dcsnFileYn', Header: [{}, { Value: '확정 \n 결과' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 3 },

            { Name: 'insctrIdDtls', Visible: 0 },
            { Name: 'extrnlInsttId', Visible: 0 },
            { Name: 'extrnlChckId', Visible: 0 },
            { Name: 'dcsnOfldcYn', Visible: 0 },
            { Name: 'poutFileConnectId', Visible: 0 },
            { Name: 'dcsnFileConnectId', Visible: 0 },
            { Name: 'demLastDcsnYn', Visible: 0 },
            // { Name: 'chckKnd', Visible: 0 },

        ]
    }
}

export const EXT_CHECK_MNGT_ALL_EXTRNL = {
    options: {
        Cfg: {
            CanEdit: false,
            NoVScroll: false,
        },
        Cols: [
            // { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2}], RelWidth: 15 },
            { Name: 'chckKnd', Header: [{ Value: '점검종류', RowSpan: 2 }], Type: 'Enum', RelWidth: 15 },
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검기관', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'chckPurpsCn', Header: [{ Value: '상세점검목적', RowSpan: 2 }], Class: 'al pl20 pr20', RelWidth: 20 },
            { Name: 'insctrNmDtls', Header: [{ Value: '점검자', RowSpan: 2 }], RelWidth: 5, },
            // { Name: 'demLastDcsnYn', Header: [{ Value: '진행 \n상태', RowSpan: 2 }], Type: 'Enum', EnumKeys: '|Y| |', Enum:'|완료|점검 예정|점검 예정',  RelWidth: 5, },
            { Name: 'finlCmpltYn', Header: [{ Value: '점검\n상태', RowSpan: 2}], CanEdit: false, RelWidth: 3, Type: 'Enum', Enum: '|완료|등록|등록|등록', EnumKeys: '|Y|N||null' },
            { Name: 'chckde', Header: [{ Value: '점검일', RowSpan: 2 }], RelWidth: 10 },
            // { Name: 'chckde', Header: [{ Value: '점검일', RowSpan: 2 }], CanEdit: false, RelWidth: 5 },
            // { Name: 'case8', Header: [{ Value: '점검정보', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
            // { Name: 'pout', Header: [{ Value: '점검결과', RowSpan: 2 }], CanEdit: 0,  RelWidth: 5 },
            // { Name: 'dcsnOfldcYn', Header: [{ Value: '확정공문', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
            // { Name: 'lastDem', Header: [{ Value: '최종벌점', RowSpan: 2 }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 5 },
            // { Name: 'case12', Header: [{ Value: '실시일자', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'poutCnt', Header: [{ Value: '총 지적 \n 건수', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'cnfrmnCnt', Header: [{ Value: '확인서작성', Span: 2 }, { Value: 'Total' }], RelWidth: 4 },
            { Name: 'dcsnCnt', Header: [{}, { Value: '완료' }], RelWidth: 4 },
            { Name: 'poutFileYn', Header: [{ Value: '첨부파일', Span: 2 }, { Value: '점검 \n 결과' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 5 },
            { Name: 'rsltFileYn', Header: [{}, { Value: '확정 \n 결과' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 5 },
            { Name: 'upDttm', Header: [{ Value: '점검결과\n입력일자', RowSpan: 2 }], RelWidth: 7 },

            { Name: 'insctrIdDtls', Visible: 0 },
            { Name: 'extrnlInsttId', Visible: 0 },
            { Name: 'extrnlChckId', Visible: 0 },
            { Name: 'dcsnOfldcYn', Visible: 0 },
            { Name: 'poutFileConnectId', Visible: 0 },
        ]
    }
}

/** 지적사항 */
export const EXT_CHECK_MNGT_MY_POUT = {
    options: {
        Cfg: {
            CanEdit: false,
            NoVScroll: false,
        },
        Cols: [ 
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 2 },
            { Name: 'chckKnd', Header: [{ Value: '점검 종류', RowSpan: 2 }], Type: 'Enum', RelWidth: 7 },
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검 기관', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'chckde', Header: [{ Value: '점검일', RowSpan: 2 }], RelWidth: 8 },
            { Name: 'insctrNm', Header: [{ Value: '점검 결과', Span: 7 }, { Value: '점검자' }], RelWidth: 3 },
            { Name: 'poutMatterTypeNm', Header: [{}, { Value: '분야' }], RelWidth: 9 },
            { Name: 'cntrwkKndNm', Header: [{}, { Value: '대상 공종' }], RelWidth: 4 },
            { Name: 'title', Header: [{}, { Value: '제목' }], RelWidth: 10 },
            { Name: 'chckPoutMatterCn', Header: [{}, { Value: '내용' }], RelWidth: 10 },
            { Name: 'dem', Header: [{}, { Value: '벌점' }], RelWidth: 2 },
            { Name: 'cnfrmnWritngYn', Header: [{}, { Value: '확인서' }], RelWidth: 2 },
            { Name: 'poutTypeNm', Header: [{ Value: '확정 공문', Span: 6 }, { Value: '지적 유형' }], RelWidth: 4 },
            { Name: 'dcsnDocDem', Header: [{}, { Value: '벌점' }], RelWidth: 2 },
            { Name: 'dcsnDocRecptnDe', Header: [{}, { Value: '확정일' }], RelWidth: 4 },
            { Name: 'dcsnResultManagtTrgetNm', Header: [{}, { Value: '조치 대상' }], RelWidth: 3 },
            { Name: 'dcsnResultManagtCn', Header: [{}, { Value: '조치 내용' }], RelWidth: 10 },
            { Name: 'dcsnFileYn', Header: [{}, { Value: '첨부 \n파일' }], Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 2 },
            { Name: 'demDcsnYn', Header: [{ Value: '최종 벌점', Span: 2 }, { Value: '확정 여부' }], Type: 'Enum', Enum: '|벌점확정|벌점취소', EnumKeys: '|Y|N', RelWidth: 3 },
            { Name: 'lastDem', Header: [{}, { Value: '확정 \n벌점' }], RelWidth: 2 },

            { Name: 'extrnlInsttId', Visible: 0 },
            { Name: 'poutMatterType', Visible: 0 },
            { Name: 'poutType', Visible: 0 },
            { Name: 'cntrwkKnd', Visible: 0 },
            { Name: 'dcsnResultManagtTrget', Visible: 0 },
            { Name: 'insctrId', Visible: 0 },
            { Name: 'dcsnFileConnectId', Visible: 0 },
        ]
    },
}

export const EXT_CHECK_MNGT_ALL_POUT = {
    options: {
        Cfg: {
            CanEdit: false,
            NoVScroll: false,
        },
        Cols: [ 
            // { Name: 'poutMatterSeq', Header: [{ Value: 'NO', RowSpan: 2 }], RelWidth: 2 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 1.5 },
            { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 7 },
            { Name: 'chckKnd', Header: [{ Value: '점검종류', RowSpan: 2 }], Type: 'Enum', RelWidth: 4 },
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검기관', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'chckde', Header: [{ Value: '점검일', RowSpan: 2 }], RelWidth: 4 },
            { Name: 'insctrNm', Header: [{ Value: '점검 결과', Span: 6 }, { Value: '점검자' }], RelWidth: 3 },
            { Name: 'poutMatterTypeNm', Header: [{}, { Value: '분야' }], RelWidth: 6 },
            { Name: 'cntrwkKndNm', Header: [{}, { Value: '대상 공종' }], RelWidth: 4.5 },
            { Name: 'title', Header: [{}, { Value: '제목' }], RelWidth: 8 },
            { Name: 'chckPoutMatterCn', Header: [{}, { Value: '내용' }], RelWidth: 12 },
            { Name: 'cnfrmnWritngYn', Header: [{}, { Value: '확인서' }], RelWidth: 1.5 },
            { Name: 'poutTypeNm', Header: [{ Value: '확정공문', Span: 6 }, { Value: '지적유형' }], RelWidth: 3 },
            { Name: 'dcsnDocDem', Header: [{}, { Value: '벌점' }], RelWidth: 1.5 },
            { Name: 'dcsnDocRecptnDe', Header: [{}, { Value: '확정일' }], RelWidth: 3.5 },
            { Name: 'dcsnResultManagtTrgetNm', Header: [{}, { Value: '조치 대상' }], RelWidth: 3.5 },
            { Name: 'dcsnResultManagtCn', Header: [{}, { Value: '내용' }], RelWidth: 8 },
            { Name: 'dcsnFileYn', Header: [{}, { Value: '첨부 \n파일' }], Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 1.5 },
            { Name: 'demDcsnYn', Header: [{ Value: '최종 \n벌점', Span: 2 }, { Value: '확정 여부' }], Type: 'Enum', Enum: '|벌점확정|벌점취소', EnumKeys: '|Y|N', RelWidth: 3 },
            { Name: 'lastDem', Header: [{}, { Value: '확정 \n벌점' }], RelWidth: 1.5 },

            { Name: 'poutMatterType', Visible: 0 },
            { Name: 'cntrwkKnd', Visible: 0 },
            { Name: 'poutType', Visible: 0 },
            { Name: 'dcsnResultManagtTrget', Visible: 0 },
            { Name: 'insctrId', Visible: 0 },
        ]
    },
}

export const EXT_CHCK_INSTITUTION = {
    options: {
        Cfg: {
            // CanEdit: false,
            CanEdit: true,
            CanSort: false,
            NoVScroll: false,
        },
        Cols: [
            { Name: 'isSelected', Header: [{ Value: '선택' }], Type: 'Radio', HRadio: 0, RelWidth: 10 },
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10, CanEdit: false, },
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검기관' }], RelWidth: 90, CanEdit: false, },
            { Name: 'extrnlInsttId', Visible: false },
            { Name: 'extrnlInsttDc', Visible: false },
        ]
    }
}

export const EXT_CHCK_CHECKER = {
    options: {
        Cfg: {
            // CanEdit: false,
            CanSort: false,
            NoVScroll: false,
        },
        Cols: [
            { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 0, Class: 'chk_notext', IconAlign: 'Center'}], Type: 'Bool',  RelWidth: 10 },
            { Name: 'SEQ', Header: [{ Value: '번호' }], CanEdit: false, RelWidth: 10 },
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검 기관' }], CanEdit: false, RelWidth: 50 },
            { Name: 'insctrDeptNm', Header: [{ Value: '점검 부서' }], CanEdit: false, RelWidth: 15 },
            { Name: 'insctrNm', Header: [{ Value: '점검자' }], CanEdit: false, RelWidth: 15 },

            { Name: 'extrnlInsttId', Visible: false} ,
            { Name: 'insctrId', Visible: false} ,
            { Name: 'insctrRspofc', Visible: false},

        ]
    }
}

/** 최종벌점 */
export const EXT_CHCK_PENALTY = {
    options: {
        Cols: [ 
            { Name: 'poutMatterSeq', Header: [{ Value: '번호', RowSpan: 2 }],CanEdit: 0, RelWidth: 5 },
            { Name: 'cntrwkKndNm', Header: [{ Value: '분야', RowSpan: 2 }],CanEdit: 0, RelWidth: 10 },
            { Name: 'title', Header: [{ Value: '제목', RowSpan: 2 }],CanEdit: 0, Class: 'al pl20 pr20', RelWidth: 30 },
            { Name: 'poutTypeNm', Header: [{ Value: '지적 유형', RowSpan: 2 }],CanEdit: 0, RelWidth: 10 },
            { Name: 'dem', Header: [{ Value: '최초 벌점', RowSpan: 2 }],CanEdit: 0, RelWidth: 5 },
            { Name: 'demInDttm', Header: [{ Value: '최초 벌점일', RowSpan: 2 }],CanEdit: 0, RelWidth: 10 },
            { Name: 'dcsnResultManagtTrgetNm', Header: [{ Value: '조치 대상', RowSpan: 2 }],CanEdit: 0, RelWidth: 10 },
            { Name: 'demDcsnYn', Header: [{ Value: '<span class="emp_red">최종 벌점</span>', Span: 2, Type: 'Html' }, { Value: '확정 여부' }], Type: 'Enum', CanEdit:0, Enum: "|선택|벌점확정|벌점취소", EnumKeys: "||Y|N", RelWidth: 10 },
            { Name: 'lastDem', Header: [{}, { Value: '확정 벌점' }], Size: '2', CanEdit:0, Type: 'Float', RelWidth: 10 },
        ]
    }
}



/** 점검자별 성향 */
export const EXT_CHCK_INSCTR_INCLINATION = {
    options: {
        Cfg: {
            NoVScroll: false,
            CanEdit: false,
            CanSort: false,
        },
        Cols: [ 
            // { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검기관', RowSpan: 2 }], RelWidth: 15 },
            { Name: 'insctrDeptNm', Header: [{ Value: '부서', RowSpan: 2 }], RelWidth: 15 },
            { Name: 'insctrNm', Header: [{ Value: '점검자', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'projectCnt', Header: [{ Value: '점검 현장 수', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'mmnyFrndsp', Header: [{ Value: '점검자 분석 점수', Span: 3 }, { Value: '우호도' }], RelWidth: 10 },
            { Name: 'chckIntatv', Header: [{}, { Value: '적극성' }], RelWidth: 10 },
            { Name: 'dscssPosbl', Header: [{}, { Value: '협의가능성' }], RelWidth: 10 },
            { Name: 'lastDemSum', Header: [{ Value: '벌점 누계', RowSpan: 2 }], RelWidth: 10 },

            { Name: 'extrnlInsttId', Visible: false},
            { Name: 'insctrId', Visible: false},
        ]
    }
}

/** 점검자별 성향 - 상세 - 점검자 이력(평가결과) */
export const EXT_CHCK_INSCTR_EVALUATION = {
    options: {
        Cfg: {
            NoVScroll: false,
            CanEdit: false,
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 5 },
            { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 50 },
            { Name: 'mmnyFrndsp', Header: [{ Value: '점검자 분석 점수', Span: 4 }, { Value: '우호도' }], RelWidth: 10 },
            { Name: 'chckIntatv', Header: [{}, { Value: '적극성' }], RelWidth: 10 },
            { Name: 'dscssPosbl', Header: [{}, { Value: '협의가능성' }], RelWidth: 10 },
            { Name: 'opinionCn', Header: [{}, { Value: '점검자 의견' }], RelWidth: 15 },
        ]
    }
}

/** 점검자별 성향 - 상세 - 점검자 이력(지적사항) */
export const EXT_CHCK_INSCTR_POINTOUT = {
    options: {
        Cfg: {
            NoVScroll: false,
            CanEdit: false,
        },
        Cols: [ 
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 4 },
            { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], RelWidth: 14 },
            { Name: 'cntrwkKndNm', Header: [{ Value: '분야' }], RelWidth: 10 },
            { Name: 'cntrwkKndDtlNm', Header: [{ Value: '대상 공종' }], RelWidth: 10 },
            { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 14 },
            { Name: 'chckPoutMatterCn', Header: [{ Value: '내용' }], RelWidth: 14 },
            { Name: 'cnfrmnWritngYn', Header: [{ Value: '확인서' }], RelWidth: 4 },
            { Name: 'poutTypeNm', Header: [{ Value: '지적 유형' }], RelWidth: 4 },
            { Name: 'dem', Header: [{ Value: '벌점' }], RelWidth: 4 },
            { Name: 'demDcsnDe', Header: [{ Value: '확정일' }], RelWidth: 10 },
            { Name: 'dcsnResultManagtTrget', Header: [{ Value: '조치 대상' }], RelWidth: 4 },
            { Name: 'dcsnResultManagtCn', Header: [{ Value: '조치 내용' }], RelWidth: 10 },
            { Name: 'dcsnFileYn', Header: [{ Value: '첨부 파일' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"}, RelWidth: 4 },
            { Name: 'lastDem', Header: [{ Value: '최종 벌점' }], RelWidth: 4 },

            { Name: 'cntrwkKnd', Visible: false, },
            { Name: 'cntrwkKndDtl', Visible: false, },
            { Name: 'poutType', Visible: false, },
            { Name: 'dcsnFileConnectId', Visible: false, },
        ]
    }
}


/** 지원요청 - 본사 출장 여부 */
export const EXT_CHCK_SUPPORT_REQUEST_HEDOFC_BSRP = {
    options: {
        Cfg: {
            NoVScroll: false,
            CanEdit: false,
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 3 },
            { Name: 'chckKndNm', Header: [{ Value: '점검 종류' }], RelWidth: 15 },
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검 기관' }], RelWidth: 10 },
            { Name: 'chckde', Header: [{ Value: '점검일' }], RelWidth: 15 },
            { Name: 'insctrNmDtls', Header: [{ Value: '점검자' }], RelWidth: 10 },
            // { Name: 'poutMatterTypeNm', Header: [{ Value: '분야' }], RelWidth: 10 },
            // { Name: 'cntrwkKndNm', Header: [{ Value: '대상 공종' }], RelWidth: 10 },
            // { Name: 'sportRequstTitle', Header: [{ Value: '제목' }], RelWidth: 30 },
            { Name: 'sportRequstCn', Header: [{ Value: '내용' }], RelWidth: 50 },
            { Name: 'rcverNm', Header: [{ Value: '수신자' }], RelWidth: 20 },
            { Name: 'rqesterNm', Header: [{ Value: '요청자' }], RelWidth: 7 },
            { Name: 'sportRequstDe', Header: [{ Value: '요청일' }], RelWidth: 15 },

            { Name: 'extrnlChckId', Visible: false, },
            { Name: 'siteMstrId', Visible: false, },
            { Name: 'chckKnd', Visible: false, },
            { Name: 'insctrIdDtls', Visible: false, },
            { Name: 'rcverId', Visible: false, },
            { Name: 'rqesterId', Visible: false, },
        ]
    }
}

/** 지원요청 - 이의 신청  */
export const EXT_CHCK_SUPPORT_REQUEST_OBJC_APLY = {
    options: {
        Cfg: {
            NoVScroll: false,
            CanEdit: false,
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 3 },
            { Name: 'chckKndNm', Header: [{ Value: '점검 종류' }], RelWidth: 20 },
            { Name: 'extrnlInsttNm', Header: [{ Value: '점검 기관' }], RelWidth: 10 },
            { Name: 'chckde', Header: [{ Value: '점검일' }], RelWidth: 15 },
            { Name: 'insctrNmDtls', Header: [{ Value: '점검자' }], RelWidth: 10 },
            // { Name: 'poutMatterTypeNm', Header: [{ Value: '분야' }], RelWidth: 10 },
            // { Name: 'cntrwkKndNm', Header: [{ Value: '대상 공종' }], RelWidth: 10 },
            { Name: 'resultSportRequstTitle', Header: [{ Value: '제목' }], RelWidth: 30 },
            { Name: 'resultSportRequstCn', Header: [{ Value: '내용' }], RelWidth: 50 },
            { Name: 'resultSportRcverNm', Header: [{ Value: '수신자' }], RelWidth: 15 },
            { Name: 'resultSportRqesterNm', Header: [{ Value: '요청자' }], RelWidth: 7 },
            { Name: 'resultSportRequstDttm', Header: [{ Value: '요청일' }], RelWidth: 15 },
            { Name: 'requstFileYn', Header: [{ Value: '첨부 파일' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"},  RelWidth: 8 },

            { Name: 'extrnlChckId', Visible: false, },
            { Name: 'siteMstrId', Visible: false, },
            { Name: 'chckKnd', Visible: false, },
            { Name: 'insctrIdDtls', Visible: false, },
            { Name: 'rcverId', Visible: false, },
            { Name: 'rqesterId', Visible: false, },
            { Name: '', Visible: false, },
            
        ]
    }
}