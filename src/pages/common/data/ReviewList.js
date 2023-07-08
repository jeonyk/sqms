/* ------------------------------------------- */
/* 품질활동                                     */
/* ------------------------------------------- */

/* 경영검토 */
/* 
  reviewMySiteSheet: 통계분석 > 경영검토 > 보고서 리스트 (My Site) 
  reviewAllSitesSheet: 통계분석 > 경영검토 > 보고서 리스트 (All Sites)
*/

 /* reviewMySiteSheet : SQMS_WS02_001 통계분석 > 경영검토 > 보고서 리스트 (My Site) */
export const reviewMySiteSheet = {
  options: {
    Cfg: {
      NoVScroll: false,
      CanEdit: 1,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1},
      { Name: 'dataDt', Header: [{ Value: '데이터 기준' }], RowMerge: 0, RelWidth: 5, CanEdit: 0 },
      { Name: 'reviewTitle', Header: [{ Value: '제목' }], RowMerge: 0, RelWidth: 10, CanEdit: 0 },
      { Name: 'progrsTxt', Header: [{ Value: '현황' }], Format: {"0": "<button type='button' class='btn_write'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'reviewId', Visible: '0' },
      { Name: 'progrsStatus', Visible: '0' },
      { Name: 'finlAprvYn', Visible: '0' },
     ]
  },
  data: [
  ],
}

/* reviewAllSitesSheet : SQMS_WS02_001 통계분석 > 경영검토 > 보고서 리스트 (All Sites) */
export const reviewAllSitesSheet = {
  options: {
    Cfg: {
      NoVScroll: false,
      CanEdit: 0
    },
    Cols: [
      { Name: 'projNm', Header: [{ Value: '현장명', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'dataDt', Header: [{ Value: '데이터 기준', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'reviewTitle', Header: [{ Value: '제목', RowSpan: 3 }], ColMerge: 1, RelWidth: 10 },
      { Name: 'progrsTxt', Header: [{ Value: '현황', RowSpan: 2 }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: { "1" : 1 }, RelWidth: 4 },
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'reviewId', Visible: '0' },
      { Name: 'progrsStatus', Visible: '0' },
      { Name: 'finlAprvYn', Visible: '0' },
    ]
  },
  data: [
  ],
}

/* reviewIsuueSheet : 내/외부 이슈  */
export const reviewIssueSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
      MaxVScroll: '250px',
    },
    Cols: [
      { Name: 'issueTypeNm', Header: [{ Value: '이슈 TYPE' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'risk', Header: [{ Value: 'Risk' }], RelWidth: 5, Align: 'left', CanEdit: 1 },
      { Name: 'legacyMngt', Header: [{ Value: '기존의 관리' }], RelWidth: 5, Align: 'left', CanEdit: 1 },
      { Name: 'aditAct', Header: [{ Value: '필요한 추가 활동' }], RelWidth: 5, Align: 'left', CanEdit: 1 },
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'reviewId', Visible: '0' },
      { Name: 'issueSeq', Visible: '0' },
    ]
  },
  data: [
  ],
}

/* reviewSiteImprvmMatterSheet : 현장별 개선 필요사항  */
export const reviewSiteImprvmMatterSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,  
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, Width: 80},
      { Name: 'cn', Header: [{ Value: '내용' }], RelWidth: 9, Align: 'left' },
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'reviewId', Visible: '0' },
      { Name: 'cnSeq', Visible: '0' },
    ]
  },
  data: [
  ],
}
