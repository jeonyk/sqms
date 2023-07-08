/* 커뮤니티 */FreeBoardList

// import { CommonSet } from './ibsheet-setoption' 
import { i18n } from '@/plugin/i18n/i18n'

/* 커뮤니티 > 공지사항 */
export const NoticeList = {
  options: {
    Cols: [
      { Name: 'ischeck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 2, CanEdit: 1 },
      { Name: 'SEQ', Header: [{ Value: 'NO' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'title', Header: [{ Value: i18n.t('community.title') }], RelWidth: 12, Class: 'al pl20 pr20', CanEdit: 0 },
      { Name: 'inUserName', Header: [{ Value: i18n.t('community.regUser') }], RelWidth: 3, CanEdit: 0 },
      { Name: 'inDttm', Header: [{ Value: i18n.t('community.regDate')}], RelWidth: 4, CanEdit: 0 },
      { Name: 'views', Header: [{ Value: i18n.t('community.viewCnt') }], RelWidth: 3, CanEdit: 0 },
      { Name: 'fileYn', Header: [{ Value: i18n.t('community.attachFile') }], RelWidth: 3, CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"} },
      { Name: 'noticeId',  Visible: 0 },
      { Name: 'inUser',  Visible: 0 },
    ],
  },
  data: [],
}

/* 커뮤니티 > 자유게시판 */
export const FreeBoardList = {
  options: {
    Cols: [
      { Name: 'ischeck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 2, CanEdit: 1 },
      { Name: 'SEQ', Header: [{ Value: 'NO' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 12, Class: 'al pl20 pr20', CanEdit: 0 },
      { Name: 'inUserName', Header: [{ Value: '등록자' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'inDttm', Header: [{ Value: '등록일' }], RelWidth: 4, CanEdit: 0 },
      { Name: 'views', Header: [{ Value: '조회수' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'fileYn', Header: [{ Value: '첨부파일' }], RelWidth: 3, CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"} },
      { Name: 'freeBoardId',  Visible: 0 },
    ],
  },
  data: [
    { case1: '0', case2: '1', case3: '2022 HEC 커뮤니티 활성화 [3]', case4: '이현대', case5: '2021-11-27', case6: '17', case7: '0' },
    { case1: '0', case2: '2', case3: '동호회 모집합니다 [10]', case4: '이현대', case5: '2021-11-27', case6: '17', case7: '' },
    { case1: '0', case2: '3', case3: '스피킹 스터디 모집 (점심시간 활용 예정) [0]', case4: '이현대', case5: '2021-11-27', case6: '17', case7: '0' },
  ],
}

/* 커뮤니티 > 자유게시판 */
export const DataArchiveList = {
  options: {
    Cols: [
      { Name: 'ischeck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 2, CanEdit: 1 },
      { Name: 'SEQ', Header: [{ Value: 'NO' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 12, Class: 'al pl20 pr20', CanEdit: 0 },
      { Name: 'inUserName', Header: [{ Value: '등록자' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'inDttm', Header: [{ Value: '등록일' }], RelWidth: 4, CanEdit: 0 },
      { Name: 'views', Header: [{ Value: '조회수' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'fileYn', Header: [{ Value: '첨부파일' }], RelWidth: 3, CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"} },
      { Name: 'dataArchiveId',  Visible: 0 },
    ],
  },
}

/* 커뮤니티 > 자유게시판 code, spec */
export const DataArchiveCodeSpecList = {
  options: {
    Cols: [
      { Name: 'ischeck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1, CanEdit: 1 },
      { Name: 'SEQ', Header: [{ Value: 'NO' }], RelWidth: 1, CanEdit: 0 },
      { Name: 'diciplineNm', Header: [{ Value: 'Dicipline' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'itemNm', Header: [{ Value: 'Item' }], RelWidth: 5, CanEdit: 0 },
      { Name: 'sectionNm', Header: [{ Value: 'Section' }], RelWidth: 8, CanEdit: 0 },
      { Name: 'purposeNm', Header: [{ Value: 'Purpose' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 10, Class: 'al pl20 pr20', CanEdit: 0 },
      { Name: 'inUserName', Header: [{ Value: '등록자' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'inDttm', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'views', Header: [{ Value: '조회수' }], RelWidth: 1, CanEdit: 0 },
      { Name: 'fileYn', Header: [{ Value: '첨부파일' }], RelWidth: 2, CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"} },
      { Name: 'dataArchiveId',  Visible: 0 },
    ],
  },
}

/* 커뮤니티 > 자유게시판 품질DB */
export const DataArchiveQltyBddbList = {
  options: {
    Cols: [
      { Name: 'ischeck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1, CanEdit: 1 },
      { Name: 'SEQ', Header: [{ Value: 'NO' }], RelWidth: 1, CanEdit: 0 },
      { Name: 'csfcDataNm', Header: [{ Value: '자료구분' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'centralNm', Header: [{ Value: '본부' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'countryNm', Header: [{ Value: '국가' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'occurYearNm', Header: [{ Value: '발생년도' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'buyerNm', Header: [{ Value: '발주처' }], RelWidth: 11, CanEdit: 0 },
      { Name: 'dataProject', Header: [{ Value: '프로젝트' }], RelWidth: 5, CanEdit: 0 },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 11, Class: 'al pl20 pr20', CanEdit: 0 },
      { Name: 'inUserName', Header: [{ Value: '등록자' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'inDttm', Header: [{ Value: '등록일' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'views', Header: [{ Value: '조회수' }], RelWidth: 1, CanEdit: 0 },
      { Name: 'fileYn', Header: [{ Value: '첨부파일' }], RelWidth: 2, CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"} },
      { Name: 'dataArchiveId',  Visible: 0 },
    ],
  },
}

/* 커뮤니티 > 자유게시판 ITP,  */
export const DataArchiveQltyList = {
  options: {
    Cols: [
      { Name: 'ischeck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 1, CanEdit: 1 },
      { Name: 'SEQ', Header: [{ Value: 'NO' }], RelWidth: 1, CanEdit: 0 },
      { Name: 'csfcDataNm', Header: [{ Value: '자료구분' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 12, Class: 'al pl20 pr20', CanEdit: 0 },
      { Name: 'inUserName', Header: [{ Value: '등록자' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'inDttm', Header: [{ Value: '등록일' }], RelWidth: 4, CanEdit: 0 },
      { Name: 'views', Header: [{ Value: '조회수' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'fileYn', Header: [{ Value: '첨부파일' }], RelWidth: 3, CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"} },
      { Name: 'dataArchiveId',  Visible: 0 },
    ],
  },
}

/* 커뮤니티 > 문서양식 변경 요청게시판 */
export const DocChangeList = {
  options: {
    Cols: [
      { Name: 'ischeck', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 2, CanEdit: 1 },
      { Name: 'SEQ', Header: [{ Value: 'NO' }], RelWidth: 2, CanEdit: 0 },
      { Name: 'title', Header: [{ Value: '제목' }], RelWidth: 12, Class: 'al pl20 pr20', CanEdit: 0 },
      { Name: 'inUserName', Header: [{ Value: '등록자' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'inDttm', Header: [{ Value: '등록일' }], RelWidth: 4, CanEdit: 0 },
      { Name: 'views', Header: [{ Value: '조회수' }], RelWidth: 3, CanEdit: 0 },
      { Name: 'fileYn', Header: [{ Value: '첨부파일' }], RelWidth: 3, CanEdit: 0, Format: {"0": "<button type='button' class='btn_file no_text'>파일</button>"} },
      { Name: 'docChangeId',  Visible: 0 },
    ],
  },
  data: [
    { case1: '0', case2: '1', case3: '고양 덕은 복합시설 공사', case4: '인수검사 신청서 양식 변경 요청 [3]', case5: '이현대', case6: '2021-11-27', case7: '17', case8: '0' },
    { case1: '0', case2: '1', case3: '가산 지식산업센터 공사', case4: '균열 관리 대장 요청 [3]', case5: '이현대', case6: '2021-11-27', case7: '17', case8: '0' },
    { case1: '0', case2: '1', case3: '강릉 지식산업센터 공사', case4: '교육결과 보고서 양식 변경 [4]', case5: '이현대', case6: '2021-11-27', case7: '17', case8: '0' },
  ],
}