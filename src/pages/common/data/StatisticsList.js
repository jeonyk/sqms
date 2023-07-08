/* ------------------------------------------- */
/* 통계분석                                     */
/* ------------------------------------------- */

/* 통계분석 */
// import { CommonSet } from './ibsheet-setoption' 

/* TestCtgryFail:  통계분석>시험관리>불합격시험 */
export const TestCtgryFail = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
        { Name: 'mainName', Header: [{ Value: '구분' }], RelWidth: 15 },
        { Name: 'midName', Header: [{ Value: '공종' }], RelWidth: 15 },
        { Name: 'subName', Header: [{ Value: '종별' }], RelWidth: 30 },
        { Name: 'rsltCnt', Header: [{ Value: '불합격 건수(건)' }], RelWidth: 15 },
        { Name: 'avgCntLbl', Header: [{ Value: '불합격 비중(%)' }], RelWidth: 15 },
        ]
    },
    data: [
    ],
}

/* TestPjtReqCost: 통계분석>시험관리>프로젝트 별 의뢰시험 비용 분석 */
export const TestPjtReqCost = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 5 },
        { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], RelWidth: 55 },
        { Name: 'testCnt', Header: [{ Value: '총 의뢰수(건)' }], RelWidth: 20 },
        { Name: 'costSum', Header: [{ Value: '누적비용(원)' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* TestPjtReqCost: 통계분석>시험관리>공종별 의뢰시험 비용 분석 */
export const TestConReqCost = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 5 },
            { Name: 'mainName', Header: [{ Value: '구분' }], RelWidth: 15 },
            { Name: 'midName', Header: [{ Value: '공종' }], RelWidth: 25 },
            { Name: 'subName', Header: [{ Value: '종별' }], RelWidth: 25 },
            { Name: 'testCnt', Header: [{ Value: '의뢰수(건)' }], RelWidth: 15 },
            { Name: 'costSum', Header: [{ Value: '누적비용(원)' }], RelWidth: 15 }
        ]
    },
    data: [
    ],
}

/* TestInsttReq:  통계분석>시험관리>시험기관 */
export const TestInsttReq = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 5 },
            { Name: 'testInsttNm', Header: [{ Value: '시험기관' }], RelWidth: 20 },
            { Name: 'testCnt', Header: [{ Value: '의뢰시험 수행(건)' }], RelWidth: 25 },
            { Name: 'avgDay', Header: [{ Value: '평균 소요기간(일)' }], RelWidth: 25 },
            { Name: 'testRateLbl', Header: [{ Value: '시험 수행 비중(%)' }], RelWidth: 25 },
        ]
    },
    data: [
    ],
}

/* TestTypeCond: 통계분석>시험관리>시험TYPE비중 */
export const TestTypeCond = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 5 },
            { Name: 'testTypeNm', Header: [{ Value: '시험 TYPE' }], RelWidth: 20 },
            { Name: 'testCnt', Header: [{ Value: '시험 수행(건)' }], RelWidth: 25 },
            { Name: 'avgDay', Header: [{ Value: '평균 소요기간(일)' }], RelWidth: 25 },
            { Name: 'testRateLbl', Header: [{ Value: '수행 비중(%)' }], RelWidth: 25 },
        ]
    },
    data: [
    ],
}


/* =================================================================================================== */

 /* ConcreteTradePhysical: 통계분석>콘크리트관리>불량레미콘업체(물량) */
export const ConcreteTradePhysical = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '레미콘업체', RowSpan: 2 }], RelWidth: 25 },
            { Name: 'totlCnt', Header: [{ Value: '전체시험 \n Fail 횟수(건)', RowSpan: 2 }], RelWidth: 25 },
            { Name: 'tempCnt', Header: [{ Value: '시험 TYPE별 Fail 횟수(건)', Span: 4 }, { Value: '온도' }], RelWidth: 10 },
            { Name: 'slumpCnt', Header: [{}, { Value: '슬럼프' }], RelWidth: 10 },
            { Name: 'airCnt', Header: [{}, { Value: '공기량' }], RelWidth: 10 },
            { Name: 'densityCnt', Header: [{}, { Value: '염화물' }], RelWidth: 10 },
        ]
    },
    data: [
    ],
}

/* ConcreteTradeStrngth: 통계분석>콘크리트관리>불량레미콘업체(강도) */
export const ConcreteTradeStrngth = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위', RowSpan: 2 }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '레미콘업체', RowSpan: 2 }], RelWidth: 15 },
            { Name: 'totlCnt', Header: [{ Value: '전체시험 \n Fail 횟수(건)', RowSpan: 2 }], RelWidth: 15 },
            { Name: 't7DCnt', Header: [{ Value: '시험 TYPE별 Fail 횟수(건)', Span: 6 }, { Value: '7일' }], RelWidth: 10 },
            { Name: 't28DCnt', Header: [{}, { Value: '28일' }], RelWidth: 10 },
            { Name: 't91DCnt', Header: [{}, { Value: '91일' }], RelWidth: 10 },
            { Name: 'vertCnt', Header: [{}, { Value: '수직부재' }], RelWidth: 10 },
            { Name: 'hrznCnt', Header: [{}, { Value: '수평부재' }], RelWidth: 10 },
            { Name: 'fillCnt', Header: [{}, { Value: 'Filler \n Support' }], RelWidth: 10 },
        ]
    },
    data: [
    ],
}

/* ConcreteTradePnumb: 통계분석>콘크리트관리>물량비중 */
export const ConcreteTradePnumb = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '레미콘업체' }], RelWidth: 45 },
            { Name: 'dnstRateLbl', Header: [{ Value: '타설 물량 비중' }], RelWidth: 45 },
        ]
    },
    data: [
    ],
}


/* =================================================================================================== */

 /* MaterialBase:  통계분석>자재관리>불량 다발 자재 */
export const MaterialBase = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'prdtDtlNm', Header: [{ Value: '품명' }], RelWidth: 45 },
            { Name: 'rjctCnt', Header: [{ Value: '불합격 자재 개수(EA)' }], RelWidth: 45 },
        ]
    },
    data: [
    ],
}

/* MaterialCmpny:  통계분석>자재관리>불량 다발 업체 */
export const MaterialCmpny = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '품명' }], RelWidth: 45 },
            { Name: 'rjctCnt', Header: [{ Value: '불합격 자재 개수(EA)' }], RelWidth: 45 },
        ]
    },
    data: [
    ],
}


/* =================================================================================================== */
 
/* 통계분석>부적합관리>부적합 다발 시공업체 */

/* NonConfirmIssuCompPun: 부적합(Punch) 발행 분류별 상위 10개 업체 목록 */
export const NonConfirmIssuCompPun = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '업체' }], RelWidth: 45 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 45 },
        ]
    },
    data: [
    ],
}

/* NonConfirmIssuCompNcr: 부적합(NCR) 발행 분류별 상위 10개 업체 목록 */
export const NonConfirmIssuCompNcr = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '업체' }], RelWidth: 45 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 45 },
        ]
    },
    data: [
    ],
}

/* NonConfirmIssuCompCar: 부적합(CAR) 발행 분류별 상위 10개 업체 목록 */
export const NonConfirmIssuCompCar = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '업체' }], RelWidth: 45 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 45 },
        ]
    },
    data: [
    ],
}

/* NonConfirmIssuCausePun : 부적합(Punch) 발행 원인별 상위 10개 목록 */
export const NonConfirmIssuCausePun = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'causeNm', Header: [{ Value: '발행원인(분류)' }], RelWidth: 30 },
            { Name: 'causeDtlNm', Header: [{ Value: '원인' }], RelWidth: 30 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 30 },
        ]
    },
    data: [
    ],
}

/* NonConfirmIssuCauseNcr : 부적합(NCR) 발행 원인별 상위 10개 목록 */
export const NonConfirmIssuCauseNcr = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'causeNm', Header: [{ Value: '발행원인(분류)' }], RelWidth: 30 },
            { Name: 'causeDtlNm', Header: [{ Value: '원인' }], RelWidth: 30 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 30 },
        ]
    },
    data: [
    ],
}

/* NonConfirmIssuCauseCar : 부적합(CAR) 발행 원인별 상위 10개 목록 */
export const NonConfirmIssuCauseCar = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'causeNm', Header: [{ Value: '발행원인(분류)' }], RelWidth: 30 },
            { Name: 'causeDtlNm', Header: [{ Value: '원인' }], RelWidth: 30 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 30 },
        ]
    },
    data: [
    ],
}


/* 통계분석>부적합관리>부적합 회신지연 시공업체 */

/* NonConfirmDelyCompPun : 부적합(Punch) 지연 상위 10개 업체 목록 */
export const NonConfirmDelyCompPun = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '업체' }], RelWidth: 30 },
            { Name: 'dnstCnt', Header: [{ Value: '발행 건수(건)' }], RelWidth: 20 },
            { Name: 'delayCnt', Header: [{ Value: '지연 건수(건)' }], RelWidth: 20 },
            { Name: 'dnstRateLbl', Header: [{ Value: '비중(%)' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* NonConfirmDelyCompNcr : 부적합(NCR) 지연 상위 10개 업체 목록 */
export const NonConfirmDelyCompNcr = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '업체' }], RelWidth: 30 },
            { Name: 'dnstCnt', Header: [{ Value: '발행 건수(건)' }], RelWidth: 20 },
            { Name: 'delayCnt', Header: [{ Value: '지연 건수(건)' }], RelWidth: 20 },
            { Name: 'dnstRateLbl', Header: [{ Value: '비중(%)' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* NonConfirmDelyCompCar : 부적합(CAR) 지연 상위 10개 업체 목록 */
export const NonConfirmDelyCompCar = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'tradeNm', Header: [{ Value: '업체' }], RelWidth: 30 },
            { Name: 'dnstCnt', Header: [{ Value: '발행 건수(건)' }], RelWidth: 20 },
            { Name: 'delayCnt', Header: [{ Value: '지연 건수(건)' }], RelWidth: 20 },
            { Name: 'dnstRateLbl', Header: [{ Value: '비중(%)' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* NonConfirmDelyCausePun: 부적합(Punch) 발생 원인별 지연 상위 10개 업체 목록 */
export const NonConfirmDelyCausePun = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'causeNm', Header: [{ Value: '발행원인(분류)' }], RelWidth: 20 },
            { Name: 'causeDtlNm', Header: [{ Value: '원인' }], RelWidth: 20 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 15 },
            { Name: 'delayCnt', Header: [{ Value: '지연건수(건수)' }], RelWidth: 15 },
            { Name: 'dnstRateLbl', Header: [{ Value: '비중(%)' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* NonConfirmDelyCausePun: 부적합(NCR) 발생 원인별 지연 상위 10개 업체 목록 */
export const NonConfirmDelyCauseNcr = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'causeNm', Header: [{ Value: '발행원인(분류)' }], RelWidth: 20 },
            { Name: 'causeDtlNm', Header: [{ Value: '원인' }], RelWidth: 20 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 15 },
            { Name: 'delayCnt', Header: [{ Value: '지연건수(건수)' }], RelWidth: 15 },
            { Name: 'dnstRateLbl', Header: [{ Value: '비중(%)' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* NonConfirmDelyCausePun: 부적합(CAR) 발생 원인별 지연 상위 10개 업체 목록 */
export const NonConfirmDelyCauseCar = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'causeNm', Header: [{ Value: '발행원인(분류)' }], RelWidth: 20 },
            { Name: 'causeDtlNm', Header: [{ Value: '원인' }], RelWidth: 20 },
            { Name: 'dnstCnt', Header: [{ Value: '부적합 발행 건수(건)' }], RelWidth: 15 },
            { Name: 'delayCnt', Header: [{ Value: '지연건수(건수)' }], RelWidth: 15 },
            { Name: 'dnstRateLbl', Header: [{ Value: '비중(%)' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}


/* 통계분석>부적합관리>부적합관리(현장) */

/* NonConfirmSiteAll: 부적합현황(전체) 목록 */
export const NonConfirmSiteAll = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'issueMonth', Header: [{ Value: '' }], RelWidth: 20 },
            { Name: 'issueCnt', Header: [{ Value: 'Issue' }], RelWidth: 20 },
            { Name: 'openCnt', Header: [{ Value: 'Open' }], RelWidth: 20 },
            { Name: 'closeCnt', Header: [{ Value: 'Closed' }], RelWidth: 20 },
            { Name: 'openRateLbl', Header: [{ Value: 'OpenRate' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* NonConfirmSitePun: 부적합 분류별 (Punch) 목록 */
export const NonConfirmSitePun = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'issueMonth', Header: [{ Value: '' }], RelWidth: 20 },
            { Name: 'issueCnt', Header: [{ Value: 'Issue' }], RelWidth: 20 },
            { Name: 'openCnt', Header: [{ Value: 'Open' }], RelWidth: 20 },
            { Name: 'closeCnt', Header: [{ Value: 'Closed' }], RelWidth: 20 },
            { Name: 'openRateLbl', Header: [{ Value: 'OpenRate' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* NonConfirmSiteNcr: 부적합 분류별 (NCR) 목록 */
export const NonConfirmSiteNcr = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'issueMonth', Header: [{ Value: '' }], RelWidth: 20 },
            { Name: 'issueCnt', Header: [{ Value: 'Issue' }], RelWidth: 20 },
            { Name: 'openCnt', Header: [{ Value: 'Open' }], RelWidth: 20 },
            { Name: 'closeCnt', Header: [{ Value: 'Closed' }], RelWidth: 20 },
            { Name: 'openRateLbl', Header: [{ Value: 'OpenRate' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* NonConfirmSiteCar: 부적합 분류별 (CAR) 목록 */
export const NonConfirmSiteCar = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'issueMonth', Header: [{ Value: '' }], RelWidth: 20 },
            { Name: 'issueCnt', Header: [{ Value: 'Issue' }], RelWidth: 20 },
            { Name: 'openCnt', Header: [{ Value: 'Open' }], RelWidth: 20 },
            { Name: 'closeCnt', Header: [{ Value: 'Closed' }], RelWidth: 20 },
            { Name: 'openRateLbl', Header: [{ Value: 'OpenRate' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}


/* 통계분석>부적합관리>부적합관리(전사) */

/* NonConfirmAllSitHec: 부적합현황(자체발행) 목록 */
export const NonConfirmAllSitHec = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'csrtTypeNm', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 25 },
            { Name: 'totlCnt', Header: [{ Value: '자체', Span: 3 }, { Value: '발행건수' }], RelWidth: 25 },
            { Name: 'openCnt', Header: [{}, { Value: 'Open건수' }], RelWidth: 25 },
            { Name: 'openRateLbl', Header: [{}, { Value: 'Open비율' }], RelWidth: 25 },
        ]
    },
    data: [
    ],
}
/* NonConfirmAllSitPun: 부적합 분류별(CAR) 목록 */
export const NonConfirmAllSitCar = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'csrtTypeNm', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 25 },
            { Name: 'totlCnt', Header: [{ Value: 'CAR', Span: 3 }, { Value: '발행건수' }], RelWidth: 25 },
            { Name: 'openCnt', Header: [{}, { Value: 'Open건수' }], RelWidth: 25 },
            { Name: 'openRateLbl', Header: [{}, { Value: 'Open비율' }], RelWidth: 25 },
        ]
    },
    data: [
    ],
}

/* NonConfirmAllSitNcr: 부적합 분류별(NCR) 목록 */
export const NonConfirmAllSitNcr = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'csrtTypeNm', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 25 },
            { Name: 'totlCnt', Header: [{ Value: 'NCR', Span: 3 }, { Value: '발행건수' }], RelWidth: 25 },
            { Name: 'openCnt', Header: [{}, { Value: 'Open건수' }], RelWidth: 25 },
            { Name: 'openRateLbl', Header: [{}, { Value: 'Open비율' }], RelWidth: 25 },
        ]
    },
    data: [
    ],
}

/* NonConfirmAllSitPun: 부적합 분류별(Punch) 목록 */
export const NonConfirmAllSitPun = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'csrtTypeNm', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 25 },
            { Name: 'totlCnt', Header: [{ Value: 'Punch', Span: 3 }, { Value: '발행건수' }], RelWidth: 25 },
            { Name: 'openCnt', Header: [{}, { Value: 'Open건수' }], RelWidth: 25 },
            { Name: 'openRateLbl', Header: [{}, { Value: 'Open비율' }], RelWidth: 25 },
        ]
    },
    data: [
    ],
}

/* NonConfirmAllSiteCause: 발생원인별 현황 목록 */
export const NonConfirmAllSiteCause = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'causeNm', Header: [{ Value: '', RowSpan: 2 }], RelWidth: 30 },
            { Name: 'dnstCnt', Header: [{ Value: '자체', Span: 3 }, { Value: '발행건수' }], RelWidth: 35 },
            { Name: 'dnstRateLbl', Header: [{}, { Value: '비율' }], RelWidth: 35 },
        ]
    },
    data: [
    ],
}

/* NonConfirmAllSiteTime: 부적합 평균처리시간(일) 목록 */
export const NonConfirmAllSiteTime = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'noCnfmTypeNm', Header: [{ Value: '' }], RelWidth: 25 },
            { Name: 'totlAvg', Header: [{ Value: '전체' }], RelWidth: 15 },
            { Name: 'apartAvg', Header: [{ Value: '공동주택' }], RelWidth: 15 },
            { Name: 'normlAvg', Header: [{ Value: '일반건축' }], RelWidth: 15 },
            { Name: 'factrAvg', Header: [{ Value: '공장' }], RelWidth: 15 },
            { Name: 'infraAvg', Header: [{ Value: '인프라' }], RelWidth: 15 },
        ]
    },
    data: [
    ],
}


/* =================================================================================================== */
 
/* ExtrnlChckInsttFreqRate: 통계분석>대외점검>점검기관 분석 */
export const ExtrnlChckInsttFreqRate = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
        { Name: 'extrnlInsttNm', Header: [{ Value: '점검기관' }], RelWidth: 30 },
        { Name: 'insttCnt', Header: [{ Value: '점검횟수(건)' }], RelWidth: 30 },
        { Name: 'dnstRateLbl', Header: [{ Value: '비율(%)' }], RelWidth: 30 },
        ]
    },
    data: [
    ],
}

/* ExtrnlChckPoutMatrTotl: 통계분석>대외점검>지적사항/벌점분석 */
export const ExtrnlChckPoutMatrTotl = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
            { Name: 'projectNm', Header: [{ Value: '프로젝트명' }], RelWidth: 30 },
            { Name: 'insttCnt', Header: [{ Value: '확인서발행건수(건)' }], RelWidth: 30 },
            { Name: 'lastDem', Header: [{ Value: '벌점집계' }], RelWidth: 30 },
        ]
    },
    data: [
    ],
}

/* ExtrnlChckPoutMatrDem:  통계분석>대외점검>지적사항/벌점분석 */
export const ExtrnlChckPoutMatrDem = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '순위' }], RelWidth: 10 },
        { Name: 'poutMatterNm', Header: [{ Value: '지적사항 분류체계' }], RelWidth: 30 },
        { Name: 'poutMatterCnt', Header: [{ Value: '확인서발행건수(건)' }], RelWidth: 15 },
        { Name: 'poutMatterRateLbl', Header: [{ Value: '발행비중' }], RelWidth: 15 },
        { Name: 'lastDem', Header: [{ Value: '벌점집계' }], RelWidth: 15 },
        { Name: 'lastDemRateLbl', Header: [{ Value: '벌점비중' }], RelWidth: 15 },
        ]
    },
    data: [
    ],
}


/* =================================================================================================== */
 
/* bsDefectsPrcsStatus: 통계분석>BS점검 현황> 결함처리현황 */
export const BsDefectsPrcsStatus = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1,
        },
        Cols: [
            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10, FormulaRow: '계' },
            { Name: 'midName', Header: [{ Value: '분석공종' }], Type: 'Text', Align:'Left', RelWidth: 25, FormulaRow: ''},
            { Name: 'tradeNm', Header: [{ Value: '협력업체' }], Type: 'Text', Align:'Left', RelWidth: 25 },
            { Name: 'bsTotlCnt', Header: [{ Value: '결함건수' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum'},
            { Name: 'bsPrcsCnt', Header: [{ Value: '처리건수' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'bsRemnCnt', Header: [{ Value: '잔여건수' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'bsPrcsRate', Header: [{ Value: '결함처리율' }], Type: 'Float', RelWidth: 10, Formula: 'bsPrcsRate/100', Format: '##0.## \\%', FormulaRow: 'Avg' },
            { Name: 'bsPrcsRateLbl', Header: [{ Value: '결함처리율' }], Type: 'Text', RelWidth: 10, Visible: 0},
        ],
    },
    data: [
    ],
}

/* bsPartnerCurStatus: 통계분석>BS점검 현황> 협력업체별 */
export const BsPartnerCurStatus = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 10 },
        { Name: 'tradeNm', Header: [{ Value: '협력업체', RowSpan: 2 }], RelWidth: 40 },
        { Name: 'bsTotlCnt', Header: [{ Value: '세대', Span: 5 }, { Value: '결함건수' }], RelWidth: 10 },
        { Name: 'bsPrcsCnt', Header: [{}, { Value: '처리건수' }], RelWidth: 10 },
        { Name: 'bsPrcsRateLbl', Header: [{}, { Value: '결함처리율' }], RelWidth: 10 },
        { Name: 'prcsAvgDay', Header: [{}, { Value: '평균소요일/건' }], RelWidth: 10 },
        { Name: 'bsRemnCnt', Header: [{}, { Value: '잔여건수' }], RelWidth: 10 },
        ]
    },
    data: [
    ],
}

/* StatisticsBs3: 통계분석>BS점검 현황> 공종별 현황 */
export const BsWorkTypeCurStatus = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10, FormulaRow: '계' },
        { Name: 'midName', Header: [{ Value: '주공종' }], RelWidth: 40, FormulaRow: '' },
        { Name: 'bsTotlCnt', Header: [{ Value: '결함건수' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum' },
        { Name: 'bsPrcsCnt', Header: [{ Value: '처리건수' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum' },
        { Name: 'bsPrcsRate', Header: [{ Value: '결함처리율' }], Type: 'Float', RelWidth: 10, Formula: 'bsPrcsRate/100', Format: '##0.## \\%', FormulaRow: 'Avg' },
        { Name: 'prcsAvgDay', Header: [{ Value: '평균소요일/건' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum' },
        { Name: 'bsRemnCnt', Header: [{ Value: '잔여건수' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum' },
        ]
    },
    data: [
    ],
}

/* StatisticsBs4: 통계분석>BS점검 현황> 주요 6대 공종 */
export const BsMajorWorkCurStatus = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10 },
        { Name: 'midName', Header: [{ Value: '주공종' }], RelWidth: 40 },
        { Name: 'midCodeId', Visible: 0},
        { Name: 'bsTotlCnt', Header: [{ Value: '결함건수' }], RelWidth: 10 },
        { Name: 'bsPrcsCnt', Header: [{ Value: '처리건수' }], RelWidth: 10 },
        { Name: 'bsPrcsRateLbl', Header: [{ Value: '결함처리율' }], RelWidth: 10 },
        { Name: 'bsRemnCnt', Header: [{ Value: '잔여건수' }], RelWidth: 10 },
        { Name: 'midCodeId', Visible: 0 },
        ]
    },
    data: [
    ],
}

/* StatisticsBs4: 통계분석>BS점검 현황> 주요 6대 공종 > 주요공종별 결함유형현황 */
export const BsMajorWorkDeftCur = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 10, FormulaRow: '계'  },
        { Name: 'midCodeId', Visible: 0 },
        { Name: 'midName', Header: [{ Value: '결함유형' }], RelWidth: 40, FormulaRow: ''  },
        { Name: 'itmTotlCnt', Header: [{ Value: '결함건수' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum'},
        { Name: 'itmRemnCnt', Header: [{ Value: '잔여건수' }], Type: 'Int', RelWidth: 10, Format: '#,##0', FormulaRow: 'Sum'},
        { Name: 'itmPrcsRate', Header: [{ Value: '발생비율' }], Type: 'Float', RelWidth: 10, Formula: 'itmPrcsRate/100', Format: '##0.## \\%', FormulaRow: 'Avg' },
        ]
    },
    data: [
    ],
}


/* =================================================================================================== */

 /* MySiteEduStatusInfo: 통계분석>교육훈련>My Site */
export const MySiteEduStatusInfo= {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'typeNm', Header: [{ Value: '' }], RelWidth: 30 },
        { Name: 'eduCnt', Header: [{ Value: '총교육건수' }], RelWidth: 35 },
        { Name: 'eduAvg', Header: [{ Value: '월평균교육횟수' }], RelWidth: 35 },
        ]
    },
    data: [
    ],
}

/* HecEduTypeCurentStatus: 통계분석>교육훈련>HEC */
export const HecEduTypeCurentStatus = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'csrtTypeNm', Header: [{ Value: '' }], RelWidth: 20 },
        { Name: 'eduSiteCnt', Header: [{ Value: '현장수' }], RelWidth: 20 },
        { Name: 'eduCsrtCnt', Header: [{ Value: '총교육건수' }], RelWidth: 20 },
        { Name: 'eduSiteAvg', Header: [{ Value: '평균교육횟수' }], RelWidth: 20 },
        { Name: 'eduMonthAvg', Header: [{ Value: '월평균교육횟수' }], RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* HecEduTrgtCurentStatus: 통계분석>교육훈련>HEC */
export const HecEduTrgtCurentStatus = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'csrtTypeNm', Header: [{ Value: '' }], RelWidth: 16 },
        { Name: 'janEduAvg', Header: [{ Value: '1월' }], RelWidth: 7 },
        { Name: 'febEduAvg', Header: [{ Value: '2월' }], RelWidth: 7 },
        { Name: 'marEduAvg', Header: [{ Value: '3월' }], RelWidth: 7 },
        { Name: 'aprEduAvg', Header: [{ Value: '4월' }], RelWidth: 7 },
        { Name: 'mayEduAvg', Header: [{ Value: '5월' }], RelWidth: 7 },
        { Name: 'junEduAvg', Header: [{ Value: '6월' }], RelWidth: 7 },
        { Name: 'julEduAvg', Header: [{ Value: '7월' }], RelWidth: 7 },
        { Name: 'augEduAvg', Header: [{ Value: '8월' }], RelWidth: 7 },
        { Name: 'sepEduAvg', Header: [{ Value: '9월' }], RelWidth: 7 },
        { Name: 'octEduAvg', Header: [{ Value: '10월' }], RelWidth: 7 },
        { Name: 'novEduAvg', Header: [{ Value: '11월' }], RelWidth: 7 },
        { Name: 'decEduAvg', Header: [{ Value: '12월' }], RelWidth: 7 },
        ]
    },
    data: [
    ],
}


/* =================================================================================================== */

/* PQIMySiteList1: SQ-STATS-PQI-W-001 1. PQI 점수 */
export const PQIMySiteList1 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'maeplseq', Header: [{ Value: '차수' }], RelWidth: 12, FormulaRow: '평균' },
            { Name: 'maepljum1', Header: [{ Value: '품질시스템' }], Type: 'Float', RelWidth: 12, Formula: 'maepljum1/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'maepljum2', Header: [{ Value: '시공품질' }], Type: 'Float', RelWidth: 12, Formula: 'maepljum2/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'maepljum6', Header: [{ Value: '품질RISK' }], Type: 'Float', RelWidth: 12, Formula: 'maepljum6/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'maepljum4', Header: [{ Value: 'IT시스템활용도' }], Type: 'Float', RelWidth: 12, Formula: 'maepljum4/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'maepljum3', Header: [{ Value: '고객만족도' }], Type: 'Float', RelWidth: 12, Formula: 'maepljum3/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'totalpoint', Header: [{ Value: 'PQI점수' }], Type: 'Float', RelWidth: 12, Formula: 'totalpoint/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'commVal', Header: [{ Value: '등급' }], Type: 'Text', RelWidth: 12 },
        ]
    },
    data: [
    ],
}

/* PQIMySiteList2: SQ-STATS-PQI-W-001 2. 사업본부 및 현장 평균 비교 >  */
export const PQIMySiteList2 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'baseNm', Header: [{ Value: '구분' }], RelWidth: 12 },
            { Name: 'maepljum1', Header: [{ Value: '품질시스템' }], RelWidth: 12 },
            { Name: 'maepljum2', Header: [{ Value: '시공품질' }], RelWidth: 12 },
            { Name: 'maepljum6', Header: [{ Value: '품질RISK' }], RelWidth: 12 },
            { Name: 'maepljum4', Header: [{ Value: 'IT시스템활용도' }], RelWidth: 12 },
            { Name: 'maepljum3', Header: [{ Value: '고객만족도' }], RelWidth: 12 },
            { Name: 'totalpoint', Header: [{ Value: 'PQI점수' }], RelWidth: 12 },
        ]
    },
    data: [
    ],
}

/* PQIMySiteList3: SQ-STATS-PQI-W-001 3. 지적사항 조치  */
export const PQIMySiteList3 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'gongjongNm', Header: [{ Value: '구분' }], RelWidth: 12, FormulaRow: '총 발행 건 수' },
            { Name: 'totalCnt', Header: [{ Value: '총지적건수' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'fixedCnt', Header: [{ Value: '조치완료건수' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'errorCnt', Header: [{ Value: '미조치건수' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'notyetRate', Header: [{ Value: '미조치비율(%)' }], Type: 'Float', RelWidth: 12, Formula: 'notyetRate/100', Format: '##0.##', FormulaRow: 'Avg' },
        ]
    },
    data: [
    ],
}


/* =================================================================================================== */

/* PQIHecSiteList1: SQ-STATS-PQI-W-001 2. 평가영역별 분석 */
export const PQIHecSiteList1 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'baseNm', Header: [{ Value: '본부명' }], RelWidth: 12, FormulaRow: '전체' },
            { Name: 'average', Header: [{ Value: '평균' }], Type: 'Float', RelWidth: 12, Formula: 'average/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'totalcount', Header: [{ Value: '평가횟수' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointS', Header: [{ Value: 'S등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointA', Header: [{ Value: 'A등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointB', Header: [{ Value: 'B등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointC', Header: [{ Value: 'C등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointD', Header: [{ Value: 'D등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
        ]
    },
    data: [
    ],
}

/* PQIHecSiteList2: SQ-STATS-PQI-W-001 2. 평가영역별 분석 */
export const PQIHecSiteList2 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'baseNm', Header: [{ Value: '본부명' }], RelWidth: 16, FormulaRow: '전사' },
            // { Name: 'maepljum1', Header: [{ Value: '품질시스템' }], Type: 'Float', RelWidth: 16, Formula: 'maepljum1/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'maepljum1', Header: [{ Value: '품질시스템' }], Type: 'Int', RelWidth: 16, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'maepljum2', Header: [{ Value: '시공품질' }], Type: 'Int', RelWidth: 16, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'maepljum6', Header: [{ Value: '품질RISK' }], Type: 'Int', RelWidth: 16, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'maepljum4', Header: [{ Value: 'IT시스템활용도' }], Type: 'Int', RelWidth: 16, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'maepljum3', Header: [{ Value: '고객만족도' }], Type: 'Int', RelWidth: 16, Format: '#,##0', FormulaRow: 'Sum' },
        ]
    },
    data: [
    ],
}

/* PQIHecSiteList3: SQ-STATS-PQI-W-001 공사유형별 PQI추이 - 본부별 */
export const PQIHecSiteList3 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'baseNm', Header: [{ Value: '본부명' }], RelWidth: 16, FormulaRow: '전사' },
            { Name: 'before4pnt', Header: [{ Value: '2018년' }], Type: 'Float', RelWidth: 16, Formula: 'before4pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before3pnt', Header: [{ Value: '2019년' }], Type: 'Float', RelWidth: 16, Formula: 'before3pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before2pnt', Header: [{ Value: '2020년' }], Type: 'Float', RelWidth: 16, Formula: 'before2pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before1pnt', Header: [{ Value: '2021년' }], Type: 'Float', RelWidth: 16, Formula: 'before1pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before0pnt', Header: [{ Value: '2022년' }], Type: 'Float', RelWidth: 16, Formula: 'before0pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
        ]
    },
    data: [
    ],
}

/* PQIHecSiteList4: SQ-STATS-PQI-W-001 공사유형별 PQI추이 - 화공플랜 */
export const PQIHecSiteList4 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'maepljumNm', Header: [{ Value: '공사유형' }], RelWidth: 16, FormulaRow: '전체' },
            { Name: 'before4', Header: [{ Value: '2018년' }], Type: 'Float', RelWidth: 16, Formula: 'before4pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before3', Header: [{ Value: '2019년' }], Type: 'Float', RelWidth: 16, Formula: 'before3pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before2', Header: [{ Value: '2020년' }], Type: 'Float', RelWidth: 16, Formula: 'before2pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before1', Header: [{ Value: '2021년' }], Type: 'Float', RelWidth: 16, Formula: 'before1pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before0', Header: [{ Value: '2022년' }], Type: 'Float', RelWidth: 16, Formula: 'before0pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
        ]
    },
    data: [
    ],
}

/* PQIHecSiteList4: SQ-STATS-PQI-W-001 공사유형별 PQI추이 - 전력플랜 */
export const PQIHecSiteList5 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'maepljumNm', Header: [{ Value: '공사유형' }], RelWidth: 16, FormulaRow: '전체' },
            { Name: 'before4', Header: [{ Value: '2018년' }], Type: 'Float', RelWidth: 16, Formula: 'before4pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before3', Header: [{ Value: '2019년' }], Type: 'Float', RelWidth: 16, Formula: 'before3pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before2', Header: [{ Value: '2020년' }], Type: 'Float', RelWidth: 16, Formula: 'before2pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before1', Header: [{ Value: '2021년' }], Type: 'Float', RelWidth: 16, Formula: 'before1pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before0', Header: [{ Value: '2022년' }], Type: 'Float', RelWidth: 16, Formula: 'before0pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
        ]
    },
    data: [
    ],
}

/* PQIHecSiteList4: SQ-STATS-PQI-W-001 공사유형별 PQI추이 - 인프라 */
export const PQIHecSiteList6 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'maepljumNm', Header: [{ Value: '공사유형' }], RelWidth: 16, FormulaRow: '전체' },
            { Name: 'before4', Header: [{ Value: '2018년' }], Type: 'Float', RelWidth: 16, Formula: 'before4pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before3', Header: [{ Value: '2019년' }], Type: 'Float', RelWidth: 16, Formula: 'before3pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before2', Header: [{ Value: '2020년' }], Type: 'Float', RelWidth: 16, Formula: 'before2pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before1', Header: [{ Value: '2021년' }], Type: 'Float', RelWidth: 16, Formula: 'before1pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before0', Header: [{ Value: '2022년' }], Type: 'Float', RelWidth: 16, Formula: 'before0pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
        ]
    },
    data: [
    ],
}

/* PQIHecSiteList4: SQ-STATS-PQI-W-001 공사유형별 PQI추이 - 건축 */
export const PQIHecSiteList7 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'maepljumNm', Header: [{ Value: '공사유형' }], RelWidth: 16, FormulaRow: '전체' },
            { Name: 'before4', Header: [{ Value: '2018년' }], Type: 'Float', RelWidth: 16, Formula: 'before4pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before3', Header: [{ Value: '2019년' }], Type: 'Float', RelWidth: 16, Formula: 'before3pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before2', Header: [{ Value: '2020년' }], Type: 'Float', RelWidth: 16, Formula: 'before2pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before1', Header: [{ Value: '2021년' }], Type: 'Float', RelWidth: 16, Formula: 'before1pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'before0', Header: [{ Value: '2022년' }], Type: 'Float', RelWidth: 16, Formula: 'before0pnt/100', Format: '##0.##', FormulaRow: 'Avg' },
        ]
    },
    data: [
    ],
}

/* PQIHecSiteList5: SQ-STATS-PQI-W-001 사업유형별 분석 */
export const PQIHecSiteList8 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'csrtTypeNm', Header: [{ Value: '공사유형' }], RelWidth: 12, FormulaRow: '전체' },
            { Name: 'average', Header: [{ Value: '평균' }], Type: 'Float', RelWidth: 12, Formula: 'average/100', Format: '##0.##', FormulaRow: 'Avg' },
            { Name: 'totalcount', Header: [{ Value: '평가횟수' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointS', Header: [{ Value: 'S등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointA', Header: [{ Value: 'A등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointB', Header: [{ Value: 'B등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointC', Header: [{ Value: 'C등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'pointD', Header: [{ Value: 'D등급' }], Type: 'Int', RelWidth: 12, Format: '#,##0', FormulaRow: 'Sum' },
        ]
    },
    data: [
    ],
}

/* PQIHecSiteList6: SQ-STATS-PQI-W-001 본부별 조치율 */
export const PQIHecSiteList9 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'baseNm', Header: [{ Value: '구분' }], RelWidth: 16, FormulaRow: '전사' },
            { Name: 'totalCnt', Header: [{ Value: '총지적건수' }], Type: 'Int', RelWidth: 16, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'fixedCnt', Header: [{ Value: '조치완료건수' }], Type: 'Int', RelWidth: 16, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'errorCnt', Header: [{ Value: '미조치건수' }], Type: 'Int', RelWidth: 16, Format: '#,##0', FormulaRow: 'Sum' },
            { Name: 'notyetRate', Header: [{ Value: '미조치비율(%)' }], Type: 'Float', RelWidth: 16, Formula: 'notyetRate/100', Format: '##0.## \\%', FormulaRow: 'Avg' },
        ]
    },
    data: [
    ],
}

/* =================================================================================================== */

 /* StatisticsItuses: SQ_STATS_IT_W_001 통계분석>IT활용도 */

 export const StatisticsItuses = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1,
            NoVScroll: false,
        },
        Cols: [
            { Name: 'baseTypeNm', Header: [{ Value: '본부',RowSpan: 2 }], RelWidth: 5 },
            { Name: 'csrtTypeNm', Header: [{ Value: '공사유형',RowSpan: 2 }], RelWidth: 5 },
            { Name: 'projectNm', Header: [{ Value: '프로젝트명',RowSpan: 2 }], RelWidth: 15 },
            { Name: 'siteNm', Header: [{ Value: '현장명',RowSpan: 2 }], RelWidth: 10 },
            { Name: 'ctrtAmt', Header: [{ Value: '공사금액', Span:2 }, {Value: '금액'}], Type: 'Float', Format: '#,###', },
            { Name: 'ctrtType', Header: [{}, { Value: '단위'}],Type: 'Html', RelWidth: 5 },
            { Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span:3}, {Value: '착공일'}], Type: 'Html', RelWidth: 5 },
            { Name: 'csrtEndDt', Header: [{}, { Value: '준공일'}],Type: 'Html', RelWidth: 5 },
            { Name: 'csrtDt', Header: [{}, { Value: '기간'}],Type: 'Html', RelWidth:5 },
            { Name: 'memberName', Header: [{ Value: '품질관리자',RowSpan: 2 }], RelWidth: 5 },
            { Name: 'csrtBusiNm', Header: [{ Value: '공무관리자',RowSpan: 2 }], RelWidth: 5 },
        ]
    },
    data: [
    ],
  }

   /* StatisticsItuses2: SQ_STATS_IT_W_001 통계분석>IT활용도2 */
  export const StatisticsItuses2 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'case1', Header: [{ Value: '현장정보' }], RelWidth: 5 },
            { Name: 'case2', Header: [{ Value: '품질관리자'}], RelWidth: 5 },
            { Name: 'case3', Header: [{ Value: '현장 품질방침/목표'}], RelWidth: 5 },
            { Name: 'case4', Header: [{ Value: '품질시스템 관리'}], RelWidth: 5 },
            { Name: 'case5', Header: [{ Value: '시험 결과 관리'}], RelWidth: 5 },
            { Name: 'case6', Header: [{ Value: '자재 공급원 승인'}], RelWidth: 5 },
            { Name: 'case7', Header: [{ Value: '인수 검사'}], RelWidth: 5 },
            { Name: 'case8', Header: [{ Value: '공장 검사'}], RelWidth: 5 },
            { Name: 'case9', Header: [{ Value: '타설 관리'}], RelWidth: 5 },
            { Name: 'case10', Header: [{ Value: '강도 관리'}], RelWidth: 5 },
          ],
    },
    data: [
        {case1 : 0, case2 : 0, case3 : 0, case4 : 0, case5 : 0, case6 : 0, case7 : 0, case8 : 0, case9 : 0, case10 : 0}
    ],
  }
  
  /* StatisticsItuses2: SQ_STATS_IT_W_001 통계분석>IT활용도2 */
  export const StatisticsItuses3 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
            { Name: 'case1', Header: [{ Value: ' 균열관리' }], RelWidth: 5 },
            { Name: 'case2', Header: [{ Value: '검측 현황'}], RelWidth: 5 },
            { Name: 'case3', Header: [{ Value: '부적합 List'}], RelWidth: 5 },
            { Name: 'case4', Header: [{ Value: '대외 점검 관리'}], RelWidth: 5 },
            { Name: 'case5', Header: [{ Value: '자체 품질 점검'}], RelWidth: 5 },
            { Name: 'case6', Header: [{ Value: '자체 교육훈련 계획, 결과'}], RelWidth: 5 },
            { Name: 'case7', Header: [{ Value: '시험검사/장비 교정현황'}], RelWidth: 5 },
            { Name: 'case8', Header: [{ Value: '주간 업무 보고'}], RelWidth: 5 },
            { Name: 'case9', Header: [{ Value: '경영 검토'}], RelWidth: 5 },
            { Name: 'cnt', Header: [{ Value: '로그인'}], RelWidth: 5 },
          ],
    },
    data: [
        {case1 : 0, case2 : 0, case3 : 0, case4 : 0, case5 : 0, case6 : 0, case7 : 0, case8 : 0, case9 : 0, cnt : 0}
    ],
  }

  /* StatisticsItuses2: SQ_STATS_IT_W_001 통계분석>IT활용도2 */
  export const StatisticsItuses4 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1,
        },
        Cols: [
            { Name: 'case1', Header: [{ Value: '전체 메뉴 활용도(50점)', Span:4 }, {Value: ' 활용 메뉴 \n (건수)'}], RelWidth: 5 },
            { Name: 'case2', Header: [{}, { Value: '전체 메뉴 \n (건수)'}], RelWidth: 5 },
            { Name: 'case3', Header: [{}, { Value: '활용도 \n (%)'}], RelWidth: 5 },
            { Name: 'case4', Header: [{}, { Value: '취득 점수 \n (점)'}], RelWidth: 5 },
            { Name: 'case5', Header: [{ Value: '누적 입력 건수(5점)', Span:2 }, {Value: ' 누적 \n 합계'}], RelWidth: 5 },
            { Name: 'case6', Header: [{}, { Value: '취득 점수 \n (점)'}], RelWidth: 5 },
            { Name: 'case7', Header: [{ Value: '최근 3개월 활용 실적(30점)', Span:6 }, {Value: '3개월 전 \n 입력 건수'}], RelWidth: 5 },
            { Name: 'case8', Header: [{}, { Value: '취득 점수 \n (점)'}], RelWidth: 5 },
            { Name: 'case9', Header: [{}, { Value: '2개월 전 \n 입력 건수'}], RelWidth: 5 },
            { Name: 'case10', Header: [{}, { Value: '취득 점수 \n (점)'}], RelWidth: 5 },
            { Name: 'case11', Header: [{}, { Value: '1개월 전 \n 입력 건수'}], RelWidth: 5 },
            { Name: 'case12', Header: [{}, { Value: '취득 점수 \n (점)'}], RelWidth: 5 },
            { Name: 'case13', Header: [{ Value: 'IPT활용도 \n (ITP : 10점)', Span:2 }, {Value: '입력 \n 건수'}], RelWidth: 5 },
            { Name: 'case14', Header: [{ }, {Value: '취득 점수 \n (점)'}], RelWidth: 5 },
            { Name: 'case15', Header: [{ Value: 'IPT활용도 \n (공장 검사: 5점)', Span:2 }, {Value: '입력 \n 건수'}], RelWidth: 5 },
            { Name: 'case16', Header: [{ }, {Value: '취득 점수 \n (점)'}], RelWidth: 5 },
            { Name: 'case17', Header: [{Value: '총점 \n (점)', RowSpan: 2}], RelWidth: 5 },
          ],
    },
    data: [
        {case1 : 0, case2 : 0, case3 : 0, case4 : 0, case5 : 0, case6 : 0, case7 : 0, case8 : 0, case9 : 0, case10 : 0, case11 : 0, case12 : 0, case13 : 0, case14 : 0, case15 : 0, case16 : 0, case17 : 0}
    ],
  }

    /* StatisticsItuses2: SQ_STATS_IT_W_001 통계분석>저장자료 탭 */
    export const StatisticsItuses5 = {
        options: {
            Cols: [
                { Name: 'SEQ', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan:2 }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
                { Name: 'case2', Header: [{ Value: '등록일', RowSpan:2}], RelWidth: 5 },
                { Name: 'case3', Header: [{ Value: '메뉴(건수)', Span:17 }, {Value: ' 현장정보'}], RelWidth: 5 },
                { Name: 'case4', Header: [{}, { Value: '품질관리자'}], RelWidth: 5 },
                { Name: 'case5', Header: [{}, { Value: '현장 품질 \n 방침/목표'}], RelWidth: 5 },
                { Name: 'case6', Header: [{}, { Value: '품질시스템 \n 관리'}], RelWidth: 5 },
                { Name: 'case7', Header: [{}, { Value: '시험 결과 \n 관리'}], RelWidth: 5 },
                { Name: 'case8', Header: [{}, { Value: '자재공급원 \n 승인'}], RelWidth: 5 },
                { Name: 'case9', Header: [{}, { Value: '인수 검사'}], RelWidth: 5 },
                { Name: 'case10', Header: [{}, { Value: '공장 검사'}], RelWidth: 5 },
                { Name: 'case11', Header: [{}, { Value: '타설 관리'}], RelWidth: 5 },
                { Name: 'case12', Header: [{}, { Value: '강도 관리'}], RelWidth: 5 },
                { Name: 'case13', Header: [{}, { Value: '균열 관리'}], RelWidth: 5 },
                { Name: 'case14', Header: [{}, { Value: '검측 현황'}], RelWidth: 5 },
                { Name: 'case15', Header: [{}, { Value: '부적합 List'}], RelWidth: 5 },
                { Name: 'case16', Header: [{}, { Value: '대외 점검 \n 관리'}], RelWidth: 5 },
                { Name: 'case17', Header: [{}, { Value: '자체 품질 \n 관리'}], RelWidth: 5 },
                { Name: 'case18', Header: [{}, { Value: '자체 교육훈련 \n 계획,결과'}], RelWidth: 5 },
                { Name: 'case19', Header: [{}, { Value: '시험검사/장비 \n 교정현황'}], RelWidth: 5 },
              ],
        },
    data: [
    ],
    }

/* =================================================================================================== */

/* ManagementList: SQ_STATS_YREP_W_002 경영검토>보고서 리스트(My Site) */
export const ManagementList = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
        { Name: 'case2', Header: [{ Value: '데이터 기준' }], RelWidth: 35 },
        { Name: 'case3', Header: [{ Value: '제목' }], RelWidth: 40 },
        { Name: 'case4', Header: [{ Value: '현황' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 20 },
        ]
    },
    data: [
    ],
}

/* ManagementList2: SQ_STATS_YREP_W_002 경영검토>보고서 리스트(All Sites) */
export const ManagementList2 = {
    options: {
        Cfg: {
            CanEdit:0,
            IgnoreFocused : 1
        },
        Cols: [
        { Name: 'SEQ', Header: [{ Value: '현장명' }], RelWidth: 20 },
        { Name: 'case2', Header: [{ Value: '데이터 기준' }], RelWidth: 20 },
        { Name: 'case3', Header: [{ Value: '제목' }], RelWidth: 40 },
        { Name: 'case4', Header: [{ Value: '현황' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 10 },
        ]
    },
    data: [
    ],
}
