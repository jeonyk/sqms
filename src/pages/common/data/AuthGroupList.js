/*권한그룹*/

/* GroupSelect : ADMIN_USER_GROUP_001 권한그룹>권한그룹*/
export const AuthGroupDetailSheet = {
  options: {
    Cfg: {
      NoVScroll: false,
    },
    Cols: [
      { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 3 },
      { Name: 'rowcnt', Header: [{ Value: '번호' }], CanEdit: 0, RelWidth: 3 },
      { Name: 'groupTypeNm', Header: [{ Value: '그룹유형' }], CanEdit: 0, RelWidth: 10 },
      { Name: 'groupAuthNm', Header: [{ Value: '권한그룹' }], CanEdit: 0, RelWidth: 10 },
      { Name: 'groupAuthDtlId', Header: [{ Value: '그룹코드' }], CanEdit: 0, RelWidth: 10 },
    ]
  },
  data: [],
}

/* GroupDetail : ADMIN_USER_GROUP_001 권한그룹>권한상세설정*/
export const AuthDetailMenuSheet = {
  options: {
    Cfg: {
      MainCol: "menuNmKr",
      NoVScroll: false,
    },
    Cols: [
      {Name: "menuNmKr", Header: [{ Value: '메뉴'}], CanEdit: 0, Align: "Left", RelWidth: 30, CanEdit: 1},
      {Name: "viewYn", Header:  [{ Value: '조회' }],Type: "Bool", TrueValue:"Y", FalseValue:"N", RelWidth: 5},
      {Name: "writeYn", Header:  [{ Value: '등록' }],Type: "Bool", TrueValue:"Y", FalseValue:"N",  RelWidth: 5},
      {Name: "changeYn", Header: [{ Value: '수정' }],Type: "Bool", TrueValue:"Y", FalseValue:"N", RelWidth: 5},
      {Name: "unuseYn", Header: [{ Value: '삭제' }],Type: "Bool", TrueValue:"Y", FalseValue:"N", RelWidth: 5},
      {Name: "downYn",Header: [{ Value: '다운로드' }],Type: "Bool", TrueValue:"Y", FalseValue:"N",  RelWidth: 5},
      { Name: 'menuGroupAuthInfoId', Visible: '0' },
      { Name: 'groupAuthDtlId', Visible: '0' },
      { Name: 'menuMngtId', Visible: '0' },
    ]
  },

  data : [
    //   {
    //     case1: '현장정보 및 QA', case2: '',  case3: '', case4: '', case5: '', case6: '',
    //     Items: [
    //       {
    //         case1: '현장정보', case2: '', case3: '', case4: '', case5: '', case6:'',
    //         Items: [
    //           {case1: 'My Site', case2: '', case3: '', case4: '', case5: '', case6: '',},
    //           {case1: 'All Site', case2: '', case3: '', case4: '', case5: '', case6: '',}
    //         ]
    //       },
    //       {
    //         case1: '품질관리자', case2: '', case3: '', case4: '', case5: '', case6:''
    //       }
    //     ]
    //   },
    //   {
    //     case1: '시험관리', case2: '',  case3: '', case4: '', case5: '', case6: '',
    //     Items: [
    //             {
    //               case1: '현장정보', case2: '', case3: '', case4: '', case5: '', case6:'',
    //               Items: [
    //                       {case1: 'My Site', case2: '', case3: '', case4: '', case5: '', case6: '',},
    //                       {case1: 'All Site', case2: '', case3: '', case4: '', case5: '', case6: '',}
    //               ]
    //             },
    //     ]
    //   }
    ]
}

/*Partners : ADMIN_USER_PARTNER_001 협력사*/
export const AuthGroupTypeSheet = {
    options: {
      Cfg: {
        CanEdit: 1,
        NoVScroll: false,
      },
      Cols: [
        { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 1 },
        { Name: 'rowcnt', Header: [{ Value: '번호' }], CanEdit: 0, RelWidth: 1 },
        { Name: 'groupTypeNm', Header: [{ Value: '그룹유형' }], CanEdit: 0, RelWidth: 10 },
        { Name: 'groupAuthInfoId', Header: [{ Value: '유형코드' }], CanEdit: 0, RelWidth: 10 },
      ]
    },
    data: [],
}

export const PopAuthGroupSheet = {
  options: {
    Cols: [
      { Name: 'SEQ', Header: [{ Value: '번호' }], CanEdit: 0, RelWidth: 3 },
      { Name: 'groupTypeNm', Header: [{ Value: '그룹유형' }], CanEdit: 0, RelWidth: 10 },
      { Name: 'groupAuthNm', Header: [{ Value: '권한그룹' }], CanEdit: 0, RelWidth: 10 },
      { Name: 'groupAuthDtlId', Header: [{ Value: '그룹코드' }], CanEdit: 0, RelWidth: 10 },
    ]
  },
  data: [],
}
