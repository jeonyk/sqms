/* ------------------------------------------- */
/* 품질활동                                     */
/* ------------------------------------------- */

/* 주간업무보고 */
/* 
  reportWikMySiteSheet: 통계분석 > 주간업무보고 > 주간업무보고 (My Site) 
  reportWikAllSitesSheet: 통계분석 > 주간업무보고 > 주간업무보고 (All Sites)
*/

 /* testData: SQMS_WS02_001 품질활동 > 시험관리 > 본사 Set-up (품질시험 Data) */
export const reportWikMySiteSheet = {
  options: {
    Cfg: {
      CanEdit: 1,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1},
      { Name: 'dataDt', Header: [{ Value: '데이터 기준' }], RowMerge: 0, RelWidth: 5, CanEdit: 0 },
      { Name: 'reportTitle', Header: [{ Value: '제목' }], RowMerge: 0, RelWidth: 10, CanEdit: 0 },
      { Name: 'progrsTxt', Header: [{ Value: '현황' }], Format: {"0": "<button type='button' class='btn_write'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 4 },
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'reportWikId', Visible: '0' },
      { Name: 'progrsStatus', Visible: '0' },
      { Name: 'finlAprvYn', Visible: '0' },
     ]
  },
  data: [
  ],
}

/* testExpense: SQMS_WS02_001 품질활동 > 시험관리 > 본사 Set-up (품질시험비용) */
export const reportWikAllSitesSheet = {
  options: {
    Cfg: {
      CanEdit: 0,
      NoVScroll: false,
    },
    Cols: [
      { Name: 'projNm', Header: [{ Value: '현장명', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'dataDt', Header: [{ Value: '데이터 기준', RowSpan: 3 }], ColMerge: 1, RelWidth: 5 },
      { Name: 'reportTitle', Header: [{ Value: '제목', RowSpan: 3 }], ColMerge: 1, RelWidth: 10 },
      { Name: 'progrsTxt', Header: [{ Value: '현황', RowSpan: 2 }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: { "1" : 1 }, RelWidth: 4 },
      { Name: 'siteMstrId', Visible: '0' },
      { Name: 'reportWikId', Visible: '0' },
      { Name: 'progrsStatus', Visible: '0' },
      { Name: 'finlAprvYn', Visible: '0' },
    ]
  },
  data: [
  ],
}
