
export const CommonSet = { 
  Def: {
    Row: {
      Wrap:1, //전체 데이터 행에 대해 줄넘김 허용.
    }, // 모든 데이터 행의 공통 기능 설정
    Col: { // 모든 데이터 열의 공통 기능 설정
      Spanned: true, // 특정 열에 속한 셀들에 대해서 위/아래로 병합할 지 여부
      Align: 'center', // 문자열 정렬
      Type: 'Text', // 종류 정의
      NoColor: 2, // 열의 기본 적용된 배경색이 무시됩니다. [0: 기능 사용 안함(default), 1: 모든 배경색 무시(단 Class속성을 통해 설정한 배경색을 적용), 2: 상태에 대한 색상만 무시] 
      // ColMerge: 0,
    },
    Header: {}, // 헤더 행의 공통 기능 설정
    CustomID: {}, // 임의의 행에 대한 설정
    ormulaRow: {}, // Formula 행에 대한 설정
  },
  Cfg: { // 시트 전역 기능 설정
    CanSort: true, // 정렬 기능 사용 유무
    SortIcons: 1,
    SearchMode: 2, // 시트의 데이터 조회 모드를 설정 [0: FastLoad 모드, 1: ClientPaging, 2: LazyLoad(default), 3: ScrollAppend, 4: ServerPaging]
    NoVScroll: true, //시트에 세로스크롤바를 표시하지 않고 전체 데이터 양에 따라 높이 자동 조절
    HoverScope: 1, // 헤더 영역에 Hover 동작하지 않음  
    Hover: "2", // 셀단위 Hover 동작처리 [0: Hover 동작 안함, 1: 셀단위 Hover, 2: 행단위 Hover (default)]
    InEditMode: 1, //클릭시 즉시 편집상태로 전환
    CanDrag: false,
    MaxSort: 3, // 헤더 클릭을 이용한 연계 소팅의 최대 개수를 설정
    FitWidth: true, // 마지막 컬럼 뒤에 더미 컬럼을 두어 세로 스크롤바를 우측 끝에 붙게
    // NoHScroll: true,  //시트 내에 가로스크롤을 표시하지 않고, 너비를 조절함
    // HeaderCheck: 1, // 헤더 체크 박스 생성
    // HeaderMerge: 0,// 셀 값을 기준으로 병합할지 여부 및 병합 종류를 설정 [0: 병합 안함 (default), 1: 열 기준 병합, 2:	행 기준 병합, 3: 열 우선 병합, 4: 행 우선 병합, 5: 	열 우선 사방 병합, 6: 행 우선 사방 병합]
    DataMerge: 0, // 데이터 영역에서 셀 값을 기준으로 병합할지 여부 및 병합 종류를 설정 [0: 병합 안함(default), ] 
    RequiredPosition: "Right", // Required가 보여질 위치를 설정합니다.
    Export: { // 파일 경로
      FilePath: "/src/assets/document/",
      Url: "/src/assets/document/",
    },
  },
}

export const CommonSet_AddDrag = { 
  Def: {
    Row: {
      Wrap:1, //전체 데이터 행에 대해 줄넘김 허용.
    }, // 모든 데이터 행의 공통 기능 설정
    Col: { // 모든 데이터 열의 공통 기능 설정
      Spanned: true, // 특정 열에 속한 셀들에 대해서 위/아래로 병합할 지 여부
      Align: 'center', // 문자열 정렬
      Type: 'Text', // 종류 정의
      NoColor: 2, // 열의 기본 적용된 배경색이 무시됩니다. [0: 기능 사용 안함(default), 1: 모든 배경색 무시(단 Class속성을 통해 설정한 배경색을 적용), 2: 상태에 대한 색상만 무시] 
      // ColMerge: 0,
    },
    Header: {}, // 헤더 행의 공통 기능 설정
    CustomID: {}, // 임의의 행에 대한 설정
    ormulaRow: {}, // Formula 행에 대한 설정
  },
  Cfg: { // 시트 전역 기능 설정
    CanSort: true, // 정렬 기능 사용 유무
    SortIcons: 1,
    SearchMode: 2, // 시트의 데이터 조회 모드를 설정 [0: FastLoad 모드, 1: ClientPaging, 2: LazyLoad(default), 3: ScrollAppend, 4: ServerPaging]
    NoVScroll: true, //시트에 세로스크롤바를 표시하지 않고 전체 데이터 양에 따라 높이 자동 조절
    HoverScope: 1, // 헤더 영역에 Hover 동작하지 않음  
    Hover: "2", // 셀단위 Hover 동작처리 [0: Hover 동작 안함, 1: 셀단위 Hover, 2: 행단위 Hover (default)]
    InEditMode: 1, //클릭시 즉시 편집상태로 전환
    CanDrag: true,
    MaxSort: 3, // 헤더 클릭을 이용한 연계 소팅의 최대 개수를 설정
    FitWidth: true, // 마지막 컬럼 뒤에 더미 컬럼을 두어 세로 스크롤바를 우측 끝에 붙게
    // NoHScroll: true,  //시트 내에 가로스크롤을 표시하지 않고, 너비를 조절함
    // HeaderCheck: 1, // 헤더 체크 박스 생성
    // HeaderMerge: 0,// 셀 값을 기준으로 병합할지 여부 및 병합 종류를 설정 [0: 병합 안함 (default), 1: 열 기준 병합, 2:	행 기준 병합, 3: 열 우선 병합, 4: 행 우선 병합, 5: 	열 우선 사방 병합, 6: 행 우선 사방 병합]
    DataMerge: 0,
    RequiredPosition: "Right", // Required가 보여질 위치를 설정합니다.
    Export: { // 파일 경로
      FilePath: "/src/assets/document/",
      Url: "/src/assets/document/",
    },
  },
}


export const CommonSet_CanEdit = { 
  Def: {
    Row: {
      Wrap:1, //전체 데이터 행에 대해 줄넘김 허용.
    }, // 모든 데이터 행의 공통 기능 설정
    Col: { // 모든 데이터 열의 공통 기능 설정
      Spanned: true, // 특정 열에 속한 셀들에 대해서 위/아래로 병합할 지 여부
      Align: 'center', // 문자열 정렬
      Type: 'Text', // 종류 정의
      NoColor: 2, // 열의 기본 적용된 배경색이 무시됩니다. [0: 기능 사용 안함(default), 1: 모든 배경색 무시(단 Class속성을 통해 설정한 배경색을 적용), 2: 상태에 대한 색상만 무시] 
      // ColMerge: 0,
    },
    Header: {}, // 헤더 행의 공통 기능 설정
    CustomID: {}, // 임의의 행에 대한 설정
    ormulaRow: {}, // Formula 행에 대한 설정
  },
  Cfg: { // 시트 전역 기능 설정
    CanSort: true, // 정렬 기능 사용 유무
    SortIcons: 1,
    SearchMode: 2, // 시트의 데이터 조회 모드를 설정 [0: FastLoad 모드, 1: ClientPaging, 2: LazyLoad(default), 3: ScrollAppend, 4: ServerPaging]
    NoVScroll: true, //시트에 세로스크롤바를 표시하지 않고 전체 데이터 양에 따라 높이 자동 조절
    HoverScope: 1, // 헤더 영역에 Hover 동작하지 않음  
    Hover: "2", // 셀단위 Hover 동작처리 [0: Hover 동작 안함, 1: 셀단위 Hover, 2: 행단위 Hover (default)]
    InEditMode: 1, //클릭시 즉시 편집상태로 전환
    CanDrag: true,
    MaxSort: 3, // 헤더 클릭을 이용한 연계 소팅의 최대 개수를 설정
    FitWidth: true, // 마지막 컬럼 뒤에 더미 컬럼을 두어 세로 스크롤바를 우측 끝에 붙게
    // NoHScroll: true,  //시트 내에 가로스크롤을 표시하지 않고, 너비를 조절함
    // HeaderCheck: 1, // 헤더 체크 박스 생성
    // HeaderMerge: 0,// 셀 값을 기준으로 병합할지 여부 및 병합 종류를 설정 [0: 병합 안함 (default), 1: 열 기준 병합, 2:	행 기준 병합, 3: 열 우선 병합, 4: 행 우선 병합, 5: 	열 우선 사방 병합, 6: 행 우선 사방 병합]
    DataMerge: 0,
    CanEdit: 0,
    RequiredPosition: "Right", // Required가 보여질 위치를 설정합니다.
    Export: { // 파일 경로
      FilePath: "/src/assets/document/",
      Url: "/src/assets/document/",
    },
  },
}



export const CommonSet_FullPopup = { 
  Def: {
    Row: {
      Wrap:1, //전체 데이터 행에 대해 줄넘김 허용.
    }, // 모든 데이터 행의 공통 기능 설정
    Col: { // 모든 데이터 열의 공통 기능 설정
      Spanned: true, // 특정 열에 속한 셀들에 대해서 위/아래로 병합할 지 여부
      Align: 'center', // 문자열 정렬
      Type: 'Text', // 종류 정의
      NoColor: 2, // 열의 기본 적용된 배경색이 무시됩니다. [0: 기능 사용 안함(default), 1: 모든 배경색 무시(단 Class속성을 통해 설정한 배경색을 적용), 2: 상태에 대한 색상만 무시] 
      // ColMerge: 0,
    },
    Header: {}, // 헤더 행의 공통 기능 설정
    CustomID: {}, // 임의의 행에 대한 설정
    ormulaRow: {}, // Formula 행에 대한 설정
  },
  Cfg: { // 시트 전역 기능 설정
    CanSort: true, // 정렬 기능 사용 유무
    SortIcons: 1,
    SearchMode: 2, // 시트의 데이터 조회 모드를 설정 [0: FastLoad 모드, 1: ClientPaging, 2: LazyLoad(default), 3: ScrollAppend, 4: ServerPaging]
    // NoVScroll: true, //시트에 세로스크롤바를 표시하지 않고 전체 데이터 양에 따라 높이 자동 조절
    HoverScope: 1, // 헤더 영역에 Hover 동작하지 않음  
    Hover: "2", // 셀단위 Hover 동작처리 [0: Hover 동작 안함, 1: 셀단위 Hover, 2: 행단위 Hover (default)]
    InEditMode: 1, //클릭시 즉시 편집상태로 전환
    CanDrag: true,
    MaxSort: 3, // 헤더 클릭을 이용한 연계 소팅의 최대 개수를 설정
    FitWidth: true, // 마지막 컬럼 뒤에 더미 컬럼을 두어 세로 스크롤바를 우측 끝에 붙게
    // NoHScroll: true,  //시트 내에 가로스크롤을 표시하지 않고, 너비를 조절함
    // HeaderCheck: 1, // 헤더 체크 박스 생성
    // HeaderMerge: 0,// 셀 값을 기준으로 병합할지 여부 및 병합 종류를 설정 [0: 병합 안함 (default), 1: 열 기준 병합, 2:	행 기준 병합, 3: 열 우선 병합, 4: 행 우선 병합, 5: 	열 우선 사방 병합, 6: 행 우선 사방 병합]
    DataMerge: 0,
    CanEdit: 0,
    RequiredPosition: "Right", // Required가 보여질 위치를 설정합니다.
    Export: { // 파일 경로
      FilePath: "/src/assets/document/",
      Url: "/src/assets/document/",
    },
  },
}
