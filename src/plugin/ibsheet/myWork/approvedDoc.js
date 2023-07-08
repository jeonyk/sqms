
/** 기안함 myDrft */
export const MY_DRFT = {
    options: {
        Cfg: {
            // SearchMode: 1,
            NoVScroll: false,
            CanEdit: false,
            NoDataMessage: 3,
            // ShowFilter: true,
        },
        Cols: [
            // showColumns
            { Name: 'siteNm', Header: [{ Value: '프로젝트명' }], RelWidth: 25, CanEdit: 0 },
            { Name: 'docSeq', Header: [{ Value: '문서번호' }], RelWidth: 25, CanEdit: 0 },
            { Name: 'docTypeNm', Header: [{ Value: '업무분류' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'docName', Header: [{ Value: '문서종류' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'title', Header: [{ Value: '제목' }], class: 'pl20 pr20 al', RelWidth: 30, CanEdit: 0 },
            { Name: 'aprvOptnNm', Header: [{ Value: '결재옵션' }], RelWidth: 8, CanEdit: 0 },
            { Name: 'aprvStatus', Header: [{ Value: '결재현황' }], RelWidth: 5, CanEdit: 0 },
            { Name: 'drftDttm', Header: [{ Value: '기안일' }], RelWidth: 8, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'drafterNm', Header: [{ Value: '기안자' }], RelWidth: 8, CanEdit: 0 },
            { Name: 'aprvDttm', Header: [{ Value: '결재일' }], RelWidth: 8, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'nextAprvUserNm', Header: [{ Value: '결재자' }], RelWidth: 8, CanEdit: 0 },
            { Name: 'aprvState', Header: [{ Value: '결재진행상태' }], Type: 'Enum', RelWidth: 10, CanEdit: 0 },
            // { Name: 'endDate', Header: [{ Value: '최종승인일' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'strUpDttm', Header: [{ Value: '최종승인일' }], RelWidth: 8, CanEdit: 0},
            // { Name: 'finlAprvType', Header: [{ Value: '최종승인상태' }], Type:'Enum', RelWidth: 10, CanEdit: 0 },
            { Name: 'finlAprvYn', Header: [{ Value: '최종승인상태' }], Type: 'Enum', Enum: '|승인| ', EnumKeys: '|Y|N',  RelWidth: 10, CanEdit: 0 },

            // { Name: 'retnDttm', Header: [{ Value: '반려일' }], RelWidth: 10, CanEdit: 0 },
            // { Name: 'retnUserNm', Header: [{ Value: '반려자' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'retnResnCn', Header: [{ Value: '반려사유' }], RelWidth: 15, CanEdit: 0 },

            // hideColumns
            { Name: 'aprvInfoId', Visible: 0 },
            { Name: 'aprvOptn', Visible: 0 },
            { Name: 'drafterId', Visible: 0 },
            { Name: 'aprvUserId', Visible: 0 },
            { Name: 'docType', Visible: 0 },
            { Name: 'aprvOptnType', Visible: 0 },
            { Name: 'aprvFileConnectId', Visible: 0},
            { Name: 'fileType', Visible: 0 },
            // { Name: 'finlAprvYn', Visible: 0},
            { Name: 'finlAprvType', Visible: 0 },
        ],
    }
}

/** 결재함 myApprv */
export const MY_APPRV = {
    options: {
        Cfg: {
            // SearchMode: 1,
            NoVScroll: false,
            CanEdit: false,
            NoDataMessage: 3,
        },
        Cols: [
            // showColumns
            { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, class: 'chk_notext', IconAlign: 'Center'}], Type: 'Bool', CanSort: 0,  RelWidth: 5 },
            { Name: 'siteNm', Header: [{ Value: '프로젝트명' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'docSeq', Header: [{ Value: '문서번호' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'docTypeNm', Header: [{ Value: '업무분류' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'docName', Header: [{ Value: '문서종류' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'title', Header: [{ Value: '제목' }], class: 'pl20 pr20 al', RelWidth: 30, CanEdit: 0 },
            { Name: 'aprvOptnNm', Header: [{ Value: '결재옵션' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'aprvStatus', Header: [{ Value: '결재현황' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'drftDttm', Header: [{ Value: '기안일' }], RelWidth: 10, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'drafterNm', Header: [{ Value: '기안자' }], RelWidth: 10, CanEdit: 0 },
            // hideColumns
            { Name: 'aprvInfoId', Visible: 0 },
            { Name: 'siteMstrId', Visible: 0 },
            { Name: 'aprvOptnType', Visible: 0 },
            { Name: 'docType', Visible: 0 },
            { Name: 'drafterId', Visible: 0 },
            { Name: 'fileType', Visible: 0 },
        ],
    },
    data: [
        // { siteNm: '화)TD전개 합리화공사', docTypeNm:  }
    ]
    
}

/** 참조함 helpApprv  --- 재확인 필요 */ 
export const HELP_APPRV = {
    options: {
        Cfg: {
            // SearchMode: 1,
            NoVScroll: false,
            CanEdit: false,
            NoDataMessage: 3,
        },
        Cols: [
            // showColumns
            { Name: 'chckYn', Header: [{ Value: '확인여부' }], RelWidth: 5, Format: {"Y": "<span class='state green'></span>","N": "<span class='state red'></span>"}, CanEdit: 0 },
            { Name: 'siteNm', Header: [{ Value: '프로젝트명' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'docSeq', Header: [{ Value: '문서번호' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'docTypeNm', Header: [{ Value: '업무분류' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'docName', Header: [{ Value: '문서종류' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'title', Header: [{ Value: '제목' }], class: 'pl20 pr20 al', RelWidth: 30, CanEdit: 0 },
            { Name: 'aprvOptnNm', Header: [{ Value: '결재옵션' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'aprvStatus', Header: [{ Value: '결재현황' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'drftDttm', Header: [{ Value: '기안일' }], RelWidth: 10, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'drafterNm', Header: [{ Value: '기안자' }], RelWidth: 10, CanEdit: 0 },

            { Name: 'endDate', Header: [{ Value: '최종결재일' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'finlAprvUserNm', Header: [{ Value: '최종결재자' }], RelWidth: 10, CanEdit: 0 },
            // hideColumns
            { Name: 'aprvInfoId', Visible: 0 },
            { Name: 'aprvOptn', Visible: 0 },
            { Name: 'docType', Visible: 0 },
            { Name: 'drafterId', Visible: 0 },
            { Name: 'finlAprvUser', Visible: 0 },

        ],
    }
}

/** 완료함 cpmptApprv */
export const CPMPT_APPRV = {
    options: {
        Cfg: {
            NoVScroll: false,
            CanEdit: false,
            NoDataMessage: 3,
        },
        Cols: [
            // showColumns
            { Name: 'siteNm', Header: [{ Value: '프로젝트명' }], RelWidth: 22, CanEdit: 0 },
            { Name: 'docSeq', Header: [{ Value: '문서번호' }], RelWidth: 23, CanEdit: 0 },
            { Name: 'docTypeNm', Header: [{ Value: '업무분류' }], RelWidth: 7, CanEdit: 0 },
            { Name: 'docName', Header: [{ Value: '문서종류' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'title', Header: [{ Value: '제목' }], class: 'pl20 pr20 al', RelWidth: 35, CanEdit: 0 },
            { Name: 'aprvOptnNm', Header: [{ Value: '결재옵션' }], RelWidth: 7, CanEdit: 0 },
            { Name: 'aprvStatus', Header: [{ Value: '결재현황' }], RelWidth: 4, CanEdit: 0 },
            { Name: 'drftDttm', Header: [{ Value: '기안일' }], RelWidth: 7, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'drafterNm', Header: [{ Value: '기안자' }], RelWidth: 7, CanEdit: 0 },
            { Name: 'finlAprvYn', Header: [{ Value: '최종승인상태' }], Type: 'Enum', Enum: '|승인| ', EnumKeys: '|Y|N',  RelWidth: 10, CanEdit: 0 },
            { Name: 'strUpDttm', Header: [{ Value: '최종결재일' }], RelWidth: 7, CanEdit: 0 },
            { Name: 'finlAprvUserNm', Header: [{ Value: '최종결재자' }], RelWidth: 7, CanEdit: 0 },

            // hideColumns
            { Name: 'aprvInfoId', Visible: 0 },
            { Name: 'aprvOptn', Visible: 0 },
            { Name: 'docType', Visible: 0 },
            { Name: 'drafterId', Visible: 0 },
            { Name: 'finlAprvUser', Visible: 0 },

        ],
    }
}

/** 반려함 rtrnApprv */
export const RTRN_APPRV = {
    options: {
        Cfg: {
            NoVScroll: false,
            CanEdit: false,
            NoDataMessage: 3,
        },
        Cols: [
            // showColumns
            { Name: 'siteNm', Header: [{ Value: '프로젝트명' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'docSeq', Header: [{ Value: '문서번호' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'docTypeNm', Header: [{ Value: '업무분류' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'docName', Header: [{ Value: '문서종류' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'title', Header: [{ Value: '제목' }], class: 'pl20 pr20 al', RelWidth: 30, CanEdit: 0 },
            { Name: 'aprvOptnNm', Header: [{ Value: '결재옵션' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'aprvStatus', Header: [{ Value: '결재현황' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'drftDttm', Header: [{ Value: '기안일' }], RelWidth: 10, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'drafterNm', Header: [{ Value: '기안자' }], RelWidth: 10, CanEdit: 0 },
            // APRV_USER_ID
            { Name: 'aprvUserNm', Header: [{ Value: '반려자' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'aprvDttm', Header: [{ Value: '반려일' }], RelWidth: 10, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'retnResnCn', Header: [{ Value: '반려사유' }], RelWidth: 10, CanEdit: 0, },
            // hideColumns
            { Name: 'aprvInfoId', Visible: 0 },
            { Name: 'aprvOptn', Visible: 0 },
            { Name: 'docType', Visible: 0 },
            { Name: 'drafterId', Visible: 0 },
            { Name: 'finlAprvUser', Visible: 0 },
            { Name: 'retnUserId', Visible: 0 },

        ],
    }
}


/** 공람함 shareApprv */
export const SHARE_APPRV = {
    options: {
        Cfg: {
            NoVScroll: false,
            CanEdit: false,
            NoDataMessage: 3,
        },
        Cols: [
            { Name: 'siteNm', Header: [{ Value: '프로젝트명' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'docSeq', Header: [{ Value: '문서번호' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'docTypeNm', Header: [{ Value: '업무분류' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'docName', Header: [{ Value: '문서종류' }], RelWidth: 20, CanEdit: 0 },
            { Name: 'title', Header: [{ Value: '제목' }], class: 'pl20 pr20 al', RelWidth: 30, CanEdit: 0 },
            { Name: 'aprvOptnNm', Header: [{ Value: '결재옵션' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'aprvStatus', Header: [{ Value: '결재현황' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'drftDttm', Header: [{ Value: '기안일' }], RelWidth: 10, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'drafterNm', Header: [{ Value: '기안자' }], RelWidth: 10, CanEdit: 0 },

            { Name: 'finlAprvUserNm', Header: [{ Value: '최종결재자' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'endDate', Header: [{ Value: '최종결재일' }], RelWidth: 10, CanEdit: 0, EditMask: '^\\d{0,8}$', CustomFormat: '####-##-##', },
            { Name: 'strInDttm', Header: [{ Value: '공유일' }], RelWidth: 10, CanEdit: 0 },
            { Name: 'shareUserNm', Header: [{ Value: '공유자' }], RelWidth: 10, CanEdit: 0 },
            
            { Name: 'aprvInfoId', Visible: 0 },
            { Name: 'docType', Visible: 0 },
            { Name: 'drafterId', Visible: 0 },
            // { Name: 'lastAprvUserId', Visible: 0 },
            { Name: 'finlAprvUserId', Visible: 0 },
        ],
    },
}



/** 결재라인 변경  */
export const APPRV_LINE_LIST = {
    options: {
        Cfg: {
            // MultiRecord: true,\
            CanSort: false,
            CanDrag: true,
        },
        Def: {
            Row: {
                Height: 52,
                MaxHeight: 52,

            },
        },
        Cols: [
            // { Name: 'aprvOrder', Header: { Value : '결재순서'}, CanSort: 0, RecordRowSpan: 2, RelWidth: 20 },
            { Name: 'dtyCd', Header: { Value : '직무분야'}, Type:'Enum', CanSort: 0, CanEdit: 1, RelWidth: 8 },
            { Name: 'userNm', Header: { Value: '이름' }, CanSort: 0, CanEdit: 0, RelWidth: 5 },
            { Name: 'tradeNm', Header: { Value: '소속' }, CanSort: 0, CanEdit: 0, RelWidth: 20 },
            { Name: 'jobTitle', Header: { Value: '직급' }, CanSort: 0, CanEdit: 0, RelWidth: 8 },
            // { Name: 'moveTo', Header: { Value: '이동'}, CanSort: 0, CanEdit: 0, Type: 'Html', Format: {'0': "<div class='cell_btn_move'><button type='button' style='width:100%;' class='btn_arrow_up'>up</button><button type='button' style='margin: 0; width: 100%;' class='btn_arrow_down'>down</button></div>"}, Class:'p0', RelWidth: 3 },
            { Name: 'moveUp', Header: { Value: '이동', Span: 2,}, CanSort: 0, CanEdit: 0, Type: 'Html', Format: {'0': "<div class='cell_btn_move'><button type='button' style='width:100%;' class='btn_arrow_up'>up</button></div>"}, Class:'p0', RelWidth: 3 },
            { Name: 'moveDown', Header: {}, CanSort: 0, CanEdit: 0, Type: 'Html', Format: {'0': "<div class='cell_btn_move'><button type='button' style='margin: 0; width: 100%;' class='btn_arrow_down'>down</button></div>"}, Class:'p0', RelWidth: 3 },

            { Name: 'userId', Visible: 0},
            { Name: 'userType', Visible: 0 },

            { Name: 'tradeId', Visible: 0 }, 
            { Name: 'tradeType', Visible: 0 },           
            // { Name: 'tradeNm', Visible: 0 },            

        ]
    }
}

/** 결재용 - 직원목록 */
export const APPRV_EMPLOYEE_LIST = {
    options: {
        Cfg: {
            CanSort: false,
            CanEdit: false,
            NoVScroll: false,
        },
        Cols: [
            { Name: 'workLocCd', Visible: 0},
            { Name: 'userId', Header: { Value: '사번'}, CustomFormat: (v) => { return '****' + (v.length > 3 ? v.substr(v.length-3) : v) }, RelWidth: 8},
            { Name: 'workLocNm', Header: { Value: '소속'}, RelWidth: 20},
            { Name: 'userNm', Header: { Value: '사용자명'}, RelWidth: 5},
            { Name: 'jobTitle', Header: { Value: '직급'}, RelWidth: 8},

            { Name: 'JobRoleNm', Visible: 0},
        ]
    }
}

/** 결재용 - 협력사 목록  */
export const APPRV_PARTNER_LIST = {
    options: {
        Cfg: {
            CanSort: false,
            CanEdit: false,
            NoVScroll: false,
        },
        Cols: [
            { Name: 'userId', Visible: 0},
            { Name: 'tradeType', Visible: 0 },
            { Name: 'tradeTypeNm', Header: { Value: '분야코드값'}, RelWidth: 8 },
            { Name: 'tradeNm', Header: { Value: '소속'}, RelWidth: 20},
            { Name: 'userNm', Header: { Value: '사용자명'}, RelWidth: 5},
            { Name: 'jobRoleNm', Header: { Value: '직급'}, RelWidth: 8},

            { Name: 'tradeId', Visible: 0 }, 
            { Name: 'tradeNm', Visible: 0 }, 
            { Name: 'hp', Visible: 0 }, 

        ]
    }
}

/** 결재라인 */
export const APPRV_LINE_LOADED_LINE = {
    options: {
        Cfg: {
            CanSort: false,
            CanEdit: false,
            NoVScroll: false,
        },
        Cols: [
            { Name: 'SEQ', Header: { Value: 'NO' }, RelWidth: 5 },
            { Name: 'aprvLineNm', Header: { Value: '결재라인명' }, RelWidth: 15 },
            { Name: 'aprvLineSample', Header: { Value: '사용 결재라인' }, RelWidth: 50 },
            

            { Name: 'aprvLineId', Visible: false, },
            { Name: 'userId', Visible: false, },
            { Name: 'siteMstrId', Visible: false, },
            { Name: 'aprvLineId', Visible: false, },

            // 결재자1
            { Name: 'aprvUser1', Visible: false, },
            { Name: 'aprvUserType1', Visible: false, },
            { Name: 'aprvDtyCd1', Visible: false, },
            { Name: 'aprvUserNm1', Visible: false, },
            { Name: 'aprvJobTitle1', Visible: false, },
            { Name: 'aprvTradeId1', Visible: false, },
            { Name: 'aprvTradeNm1', Visible: false, },
            // 결재자2
            { Name: 'aprvUser2', Visible: false, },
            { Name: 'aprvUserType2', Visible: false, },
            { Name: 'aprvDtyCd2', Visible: false, },
            { Name: 'aprvUserNm2', Visible: false, },
            { Name: 'aprvJobTitle2', Visible: false, },
            { Name: 'aprvTradeId2', Visible: false, },
            { Name: 'aprvTradeNm2', Visible: false, },
            // 결재자3
            { Name: 'aprvUser3', Visible: false, },
            { Name: 'aprvUserType3', Visible: false, },
            { Name: 'aprvDtyCd3', Visible: false, },
            { Name: 'aprvUserNm3', Visible: false, },
            { Name: 'aprvJobTitle3', Visible: false, },
            { Name: 'aprvTradeId3', Visible: false, },
            { Name: 'aprvTradeNm3', Visible: false, },
            // 결재자4
            { Name: 'aprvUser4', Visible: false, },
            { Name: 'aprvUserType4', Visible: false, },
            { Name: 'aprvDtyCd4', Visible: false, },
            { Name: 'aprvUserNm4', Visible: false, },
            { Name: 'aprvJobTitle4', Visible: false, },
            { Name: 'aprvTradeId4', Visible: false, },
            { Name: 'aprvTradeNm4', Visible: false, },
            // 결재자5
            { Name: 'aprvUser5', Visible: false, },
            { Name: 'aprvUserType5', Visible: false, },
            { Name: 'aprvDtyCd5', Visible: false, },
            { Name: 'aprvUserNm5', Visible: false, },
            { Name: 'aprvJobTitle5', Visible: false, },
            { Name: 'aprvTradeId5', Visible: false, },
            { Name: 'aprvTradeNm5', Visible: false, },
        ]
    }
}

/** 결재라인 */
export const APPRV_LINE_AGNCY = {
    options: {
        Cfg: {
            CanSort: false,
            CanEdit: false,
            NoVScroll: false,
        },
        Cols: [
            // { Name: 'SEQ', Header: { Value: 'NO' }, RelWidth: 5 },
            // { Name: 'aprvLineNm', Header: { Value: '결재라인명' }, RelWidth: 15 },
            // { Name: 'aprvLineSample', Header: { Value: '사용 결재라인' }, RelWidth: 50 },

            { Name: 'aprvStartDt', Header: [{ Value: '시작일' }], CanEdit: 0, RelWidth: 10 },
            { Name: 'aprvEndDt', Header: [{ Value: '종료일' }], CanEdit: 0, RelWidth: 10 },
            { Name: 'agncyUserNm', Header: [{ Value: '대결자' }], CanEdit: 0, RelWidth: 15 },
            { Name: 'agncyAprvResn', Header: [{ Value: '부재사유' }], CanEdit: 0, RelWidth: 35 },
            // { Name: 'case5', Header: [{ Value: '사용' }], CanEdit: 0, RelWidth: 10 },
            // { Name: 'manage', Header: [{ Value: '관리' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_modify'>수정</button> <button type='button' class='btn_del'>삭제</button>"}, RelWidth: 20 },
            { Name: 'manage', Header: [{ Value: '관리' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_del'>삭제</button>"}, RelWidth: 20 },
            

            { Name: 'userId', Visible: false, },
            { Name: 'agnyUserId', Visible: false, },
            { Name: 'aprvLineId', Visible: false, },
        ]
    }
}

