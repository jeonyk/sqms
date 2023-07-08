/**
 * 제 품: IBSheet8 - Common Plugin
 * 버 전: v0.0.4-DEV.2 (20210805-1523)
 * 회 사: (주)아이비리더스
 * 주 소: https://www.ibsheet.com
 * 전 화: (02) 2621-2288~9
 */

(function(window, document) {
/*CommonOptions 설정
 * 모든 시트에 동일하게 적용하고자 하는 설정을 CommonOptions에 등록합니다.
 * 해당 파일은 반드시 ibsheet.js 파일보다 뒤에 include 되어야 합니다.
 */
var _IBSheet = window['IBSheet'];
if (_IBSheet == null) {
  throw new Error('[ibsheet-common] undefined global object: IBSheet');
}

// IBSheet Plugins Object
var Fn = _IBSheet['Plugins'];

if (!Fn.PluginVers) Fn.PluginVers = {};
Fn.PluginVers.ibcommon = {
  name: 'ibcommon',
  version: '0.0.4-20210805-1523-DEV-2'
};

/**
_IBSheet.onBeforeCreate = function (obj) {

  console.log('onBeforeCreate')

  
  obj.options.PageEvents = {}
  if (obj.options.Events.onBeforeDataLoad) {
    obj.options.PageEvents.onBeforeDataLoad = obj.options.Events.onBeforeDataLoad
  }
  obj.options.Events.onBeforeDataLoad = function (event) {
    console.log('onBeforeDataLoad: %o', event)
    
    if(event.sheet.options.PageEvents && event.sheet.options.PageEvents.onBeforeDataLoad) {
      return event.sheet.options.PageEvents.onBeforeDataLoad(event)
    }
  }

  if (obj.options.Events.onSearchCallback) {
    obj.options.PageEvents.onSearchCallback = obj.options.Events.onSearchCallback
  }
  obj.options.Events.onSearchCallback = function (event) {
    console.log('onSearchCallback: %o', event)

    if(event.sheet.options.PageEvents && event.sheet.options.PageEvents.onSearchCallback) {
      return event.sheet.options.PageEvents.onSearchCallback(event)
    }

  }
  
  return obj
}
*/

// _IBSheet.CommonOptions = {
//   Cfg: {
//     HeaderSortMode: 1,  // Header Sort: 다중 sort시 역순
//     MaxSort: 2,         // 다중 sort 최대 갯수
//     NoDataMessage: 3,
//     // NoVScroll: false,
//   },
//   Events: {
//     onBeforeCreate: function (obj) {

//       if (!obj.options.Events) obj.options.Events = {}

//       obj.options.PageEvent = {}

//       if (obj.options.Events.onBeforeDataLoad) obj.options.PageEvent.onBeforeDataLoad = obj.options.Events.onBeforeDataLoad
//       if (obj.options.Events.onAfterSave)      obj.options.PageEvent.onAfterSave = obj.options.Events.onAfterSave

//       obj.options.Events.onBeforeDataLoad = function (evtParam) {
//         if (evtParam.result < 0) {
//           console.log('evtParam result: %o',evtParam.result)
//         }


//         if (evtParam.sheet.options.PageEvnt && evtParam.sheet.options.PageEvent.onBeforeDataLoad) {
//           return evtParam.sheet.options.PageEvent.onBeforeDataLoad(evtParam)
//         }
//       }

      
//     },
//   }
// }

// _IBSheet.CommonOptions = {
//   Cfg: {
//     Export: {
//       Url: "../assets/ibsheet/jsp/"
//     }, // 엑셀다운 URL
//     Alternate: 2, // 홀짝 행에 대한 배경색 설정
//     InfoRowConfig: {
//       Visible: 1,
//       Layout: ["Count"],
//       Space: "Top"
//     }, // 건수 정보 표시
//     GroupFormat: " <span style='color:red'>{%s}</span> <span style='color:blue'>({%c}건)</span>", // 그룹핑 컬럼명은 빨강색, 건수는 파란색으로 표시
//     HeaderSortMode:1,
//     HeaderMerge: 1, // 헤더영역 자동 병합
//     PrevColumnMerge: 3, // 앞컬럼 기준 병합 사용 여부

//     SearchCells: 1, // 찾기 기능 셀단위/행단위 선택

//     ShowHint: 0, //마우스 hover시 hint 표시기능
    
//     MaxPages: 6, // SearchMode:2인 경우 한번에 갖고 있는 페이지 수(클수록 브라우져의 부담이 커짐)
//     MaxSort: 3, // 최대 소팅 가능 컬럼수(4개 이상인 경우 느려질 수 있음)

//     StorageSession: 1, // 개인화 기능(컬럼정보 저장) 사용 여부
//     StorageKeyPrefix: window["sampleName"] ? window["sampleName"] : location.href // 저장 키 prefix 설정
//   },
//   Def: {
//     Header: { //헤더 영역 행에 대한 설정
//       Menu: {
//         Items: [{
//             "Name": "컬럼 감추기"
//           },
//           {
//             "Name": "컬럼 감추기 취소"
//           },
//           {
//             "Name": "*-"
//           },
//           {
//             "Name": "컬럼 정보 저장"
//           },
//           {
//             "Name": "컬럼 정보 저장 취소"
//           },
//           {
//             "Name": "*-"
//           },
//           {
//             "Name": "필터행 생성"
//           },
//           {
//             "Name": "필터 감추기"
//           }
//         ],
//         "OnSave": function (item, data) {
//           switch (item.Name) {
//             case '컬럼 감추기':
//               var col = item.Owner.Col;
//               this.Sheet.hideCol(col, 1);
//               break;
//             case '컬럼 감추기 취소':
//               this.Sheet.showCol();
//               break;
//             case '컬럼 정보 저장':
//               this.Sheet.saveCurrentInfo();
//               break;
//             case '컬럼 정보 저장 취소':
//               this.Sheet.clearCurrentInfo();
//               this.Sheet.showMessageTime({
//                 message: "컬럼 정보를 삭제하였습니다.<br>새로고침하시면 초기 설정의 시트를 확인하실 수 있습니다."
//               });
//               break;
//             case '필터행 생성':
//               this.Sheet.showFilterRow();
//               break;
//             case '필터 감추기':
//               this.Sheet.hideFilterRow();
//               break;

//           }
//         }
//       }
//     },

//     Row: { //데이터 영역 모든 행에 대한 설정
//       // AlternateColor:"#F1F1F1",  //짝수행에 대한 배경색
//       // Menu:{ //마우스 우측버특 클릭시 보여지는 메뉴 설정 (메뉴얼에서 Appedix/Menu 참고)
//       //   "Items":[
//       //     {"Name":"다운로드","Caption":1},
//       //     {"Name":"Excel","Value":"xls"},
//       //     {"Name":"text","Value":"txt"},
//       //     {"Name":"pdf","Value":"pdf"},
//       //     // {"Name":"-"},
//       //     {"Name":"데이터 수정","Caption":1},
//       //     {"Name":"데이터 추가/제거",Menu:1,"Items":[
//       //       {"Name":"위로 행 추가","Value":"addAbove"},
//       //       {"Name":"아래로 행 추가","Value":"addBelow"},
//       //       {"Name":"행 삭제","Value":"del"}
//       //     ]},
//       //     {"Name":"데이터 이동",Menu:1,"Items":[
//       //       {"Name":"위로로 이동","Value":"moveAbove"},
//       //       {"Name":"아래로 이동","Value":"moveBelow"},
//       //     ]}

//       //   ],
//       //   "OnSave":function(item,data){//메뉴 선택시 발생 이벤트
//       //     switch(item.Value){
//       //       case 'xls':
//       //         try{
//       //           this.Sheet.down2Excel({FileName:"test.xlsx",SheetDesign:1});
//       //         }catch(e){
//       //           if(e.message.indexOf("down2Excel is not a function")>-1){
//       //               console.log("%c 경고","color:#FF0000"," : ibsheet-excel.js 파일이 필요합니다.");
//       //           }
//       //         }
//       //         break;
//       //       case 'txt':
//       //         try{
//       //           this.Sheet.down2Text();
//       //         }catch(e){
//       //           if(e.message.indexOf("down2Text is not a function")>-1){
//       //             console.log("%c 경고","color:#FF0000"," : ibsheet-excel.js 파일이 필요합니다.");
//       //           }
//       //         }
//       //         break;
//       //       case 'pdf':
//       //         try{
//       //           this.Sheet.down2Pdf();
//       //         }catch(e){
//       //           if(e.message.indexOf("down2Pdf is not a function")>-1){
//       //             console.log("%c 경고","color:#FF0000"," : ibsheet-excel.js 파일이 필요합니다.");
//       //           }
//       //         }
//       //         break;
//       //       case 'addAbove'://위로 추가
//       //         var nrow = item.Owner.Row;
//       //         this.Sheet.addRow({next:nrow});
//       //         break;
//       //       case 'addBelow'://아래추가
//       //         var nrow = this.Sheet.getNextRow(item.Owner.Row);
//       //         this.Sheet.addRow({next:nrow});
//       //         break;
//       //       case 'del'://삭제
//       //         var row = item.Owner.Row;
//       //         this.Sheet.deleteRow(row);
//       //         break;

//       //       case 'moveAbove'://위로 이동
//       //           var row = item.Owner.Row;
//       //           var nrow = this.Sheet.getPrevRow(item.Owner.Row);
//       //           this.Sheet.moveRow({row:row,next:nrow});
//       //         break;
//       //       case 'moveBelow'://아래로 이동
//       //           var row = item.Owner.Row;
//       //           var nrow = this.Sheet.getNextRow(this.Sheet.getNextRow(item.Owner.Row));
//       //           this.Sheet.moveRow({row:row,next:nrow});
//       //         break;
//       //     }
//       //   }
//       // }
//     }
//   },
//   Events: {
//     "onKeyDown": function (evtParam) {
//       // Ctrl+Shift+F 입력시 찾기 창 오픈
//       if (evtParam.prefix == "ShiftCtrl" && evtParam.key == 70) {
//         evtParam.sheet.showFindDialog();
//       } else if (evtParam.prefix == "CtrlAlt" && evtParam.key == 84) {
//         evtParam.sheet.createPivotDialog();
//       }
//     },
//   }
// };

_IBSheet.CommonOptions = {
  Def: {
    Row: {
      Wrap:1, //전체 데이터 행에 대해 줄넘김 허용.
      Tip: 1, //전체 데이터 행에 툴팁 설정
    }, // 모든 데이터 행의 공통 기능 설정
    Col: { // 모든 데이터 열의 공통 기능 설정
      Spanned: true, // 특정 열에 속한 셀들에 대해서 위/아래로 병합할 지 여부
      Align: 'center', // 문자열 정렬
      Type: 'Text', // 종류 정의
      NoColor: 2, // 열의 기본 적용된 배경색이 무시 [0: 기능 사용 안함(default), 1: 모든 배경색 무시(단 Class속성을 통해 설정한 배경색을 적용), 2: 상태에 대한 색상만 무시] 
      AcceptEnters: 3,
      // ColMerge: 0,
      // BoolIcon: 4,
      // RadioIcon: 4,

      // Flo's
    },
    Header: {}, // 헤더 행의 공통 기능 설정
    CustomID: {}, // 임의의 행에 대한 설정
    FormulaRow: {}, // Formula 행에 대한 설정
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
    NoDataMessage: 3,     // 빈데이터 빈데이터 표기
    HeaderSortMode: 1, // 헤더를 클릭시 소팅하는 순서를 변경
    MaxSort: 3, // 헤더 클릭을 이용한 연계 소팅의 최대 개수를 설정
    FitWidth: true, // 마지막 컬럼 뒤에 더미 컬럼을 두어 세로 스크롤바를 우측 끝에 붙게
    // NoHScroll: true,  //시트 내에 가로스크롤을 표시하지 않고, 너비를 조절함
    // HeaderCheck: 1, // 헤더 체크 박스 생성
    // HeaderMerge: 0,// 셀 값을 기준으로 병합할지 여부 및 병합 종류를 설정 [0: 병합 안함 (default), 1: 열 기준 병합, 2:	행 기준 병합, 3: 열 우선 병합, 4: 행 우선 병합, 5: 	열 우선 사방 병합, 6: 행 우선 사방 병합]
    DataMerge: 0, // 데이터 영역에서 셀 값을 기준으로 병합할지 여부 및 병합 종류를 설정 [0: 병합 안함(default), ] 
    RequiredPosition: "Right", // Required가 보여질 위치를 설정
    Export: { // 파일 경로
      // FilePath: "/src/assets/document/",
      // Url: "/sendApi/api/fileUp/excelExport",
      Down2ExcelUrl: "/sendApi/api/fileDown/excelExport",
    },
    UseHeaderSortCancel: 1, // 헤더클릭 정렬 순서가 오름차순, 내림차순, 정렬취소 순서로 정렬
    CanColMove: 0, // 사용자가 시트의 헤더셀을 드래그하여 열의 위치를 변경하는 기능을 허용할지 여부

    
    // flo's
    CreateException: true,  // 경고 메세지 alert => console.error 처리
    MaxVScroll: '0px',
    InfoRowConfig: {
      Visible: true,
      Layout: ['Count'],
      Format: '[BOTTOMDATAROW / VISIBLECOUNT]'
    },
    Down2ExcelConfig: {
      merge: 1,
    }
  },
};

/** gloabl events */
_IBSheet.onBeforeCreate = function (obj) {
  // console.log('onBeforeCreate : %o', obj)
  if (!obj.options.Events) obj.options.Events = {}

  obj.options.PageEvent = {}
  const returnKind = ['Space', 'NoData']

  /** onBeforeClick */
  if(obj.options.Events.onBeforeClick) {
    obj.options.PageEvent.onBeforeClick = obj.options.Events.onBeforeClick
  }
  obj.options.Events.onBeforeClick = (evt) => {
    if (returnKind.includes(evt.row.Kind)) {
      return
    }

    if(evt.sheet.options.PageEvent && evt.sheet.options.PageEvent.onBeforeClick) {
      return evt.sheet.options.PageEvent.onBeforeClick(evt)
    }
  }

  /** onClick */
  if(obj.options.Events.onClick) {
    obj.options.PageEvent.onClick = obj.options.Events.onClick
  }
  obj.options.Events.onClick = (evt) => {
    if (returnKind.includes(evt.row.Kind)) {
      return
    }

    if(evt.sheet.options.PageEvent && evt.sheet.options.PageEvent.onClick) {
      return evt.sheet.options.PageEvent.onClick(evt)
    }
  }

  /** onAfterClick */
  if(obj.options.Events.onAfterClick) {
    obj.options.PageEvent.onAfterClick = obj.options.Events.onAfterClick
  }
  obj.options.Events.onAfterClick = (evt) => {
    if (returnKind.includes(evt.row.Kind)) {
      return
    }

    if(evt.sheet.options.PageEvent && evt.sheet.options.PageEvent.onAfterClick) {
      return evt.sheet.options.PageEvent.onAfterClick(evt)
    }
  }

  /** onDblClick */
  if(obj.options.Events.onDblClick) {
    obj.options.PageEvent.onDblClick = obj.options.Events.onDblClick
  }
  obj.options.Events.onDblClick = (evt) => {
    if (returnKind.includes(evt.row.Kind)) {
      return
    }

    if(evt.sheet.options.PageEvent && evt.sheet.options.PageEvent.onDblClick) {
      return evt.sheet.options.PageEvent.onDblClick(evt)
    }
  }

  /** onBeforeDataLoad */
  if(obj.options.Events.onBeforeDataLoad) {
    obj.options.PageEvent.onBeforeDataLoad = obj.options.Events.onBeforeDataLoad
  }
  obj.options.Events.onBeforeDataLoad = (evt) => {
    if (evt.data.length === 0) {
      evt.sheet.FormulaRow.Visible = 0
    }

    if(evt.sheet.options.PageEvent && evt.sheet.options.PageEvent.onBeforeDataLoad) {
      return evt.sheet.options.PageEvent.onBeforeDataLoad(evt)
    }
  }
  
  return obj
}



window.IB_Preset = {
  // 날짜 시간 포멧
  "YMD": {
    Type: "Date",
    Align: "Center",
    Width: 110,
    Format: 'yyyy/MM/dd',
    DataFormat: 'yyyyMMdd',
    EditFormat: 'yyyyMMdd',
    Size: 8,
    EmptyValue: "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"
  },
  "YM": {
    Type: "Date",
    Align: "Center",
    Width: 80,
    Format: 'yyyy/MM',
    DataFormat: 'yyyyMM',
    EditFormat: 'yyyyMM',
    Size: 6,
    EmptyValue: "<span style='color:#AAA'>년,월 순으로 숫자만 입력해 주세요.</span>"
  },
  "MD": {
    Type: "Date",
    Align: "Center",
    Width: 60,
    Format: 'MM/dd',
    EditFormat: 'MMdd',
    DataFormat: 'MMdd',
    Size: 4,
    EmptyValue: "<span style='color:#AAA'>월,일 순으로 숫자만 입력해 주세요.</span>"
  },
  "HMS": {
    Type: "Date",
    Align: "Center",
    Width: 70,
    Format: 'HH:mm:ss',
    EditFormat: 'HHmmss',
    DataFormat: 'HHmmss',
    Size: 8,
    EmptyValue: "<span style='color:#AAA'>시,분,초 순으로 8개 숫자만 입력해 주세요.</span>"
  },
  "HM": {
    Type: "Date",
    Align: "Center",
    Width: 70,
    Format: 'HH:mm',
    EditFormat: 'HHmm',
    DataFormat: 'HHmm',
    Size: 6,
    EmptyValue: "<span style='color:#AAA'>시,분 순으로 4개 숫자만 입력해 주세요.</span>"
  },
  "YMDHMS": {
    Type: "Date",
    Align: "Center",
    Format: 'yyyy/MM/dd HH:mm:ss',
    Width: 150,
    EditFormat: 'yyyyMMddHHmmss',
    DataFormat: 'yyyyMMddHHmmss',
    Size: 14,
    EmptyValue: "<span style='color:#AAA'>숫자만 입력(ex:20190514153020)</span>"
  },
  "YMDHM": {
    Type: "Date",
    Align: "Center",
    Format: 'yyyy/MM/dd HH:mm',
    Width: 150,
    EditFormat: 'yyyyMMddHHmm',
    DataFormat: 'yyyyMMddHHmm',
    Size: 12,
    EmptyValue: "<span style='color:#AAA'>숫자만 입력(ex:201905141530)</span>"
  },
  "MDY": {
    Type: "Date",
    Align: "Center",
    Format: 'MM-dd-yyyy',
    Width: 110,
    EditFormat: 'MMddyyyy',
    DataFormat: 'yyyyMMdd',
    Size: 8,
    EmptyValue: "<span style='color:#AAA'>월,일,년 순으로 숫자만 입력해 주세요.</span>"
  },
  "DMY": {
    Type: "Date",
    Align: "Center",
    Format: 'dd-MM-yyyy',
    Width: 110,
    EditFormat: 'ddMMyyyy',
    DataFormat: 'yyyyMMdd',
    Size: 8,
    EmptyValue: "<span style='color:#AAA'>일,월,년 순으로 숫자만 입력해 주세요.</span>"
  },

  // 숫자 포멧
  "Integer": {
    Type: "Int",
    Align: "Right",
    Format: "#,##0",
    Width: 100
  },
  "NullInteger": {
    Type: "Int",
    Align: "Right",
    Format: "#,###",
    Width: 100
  },
  "Float": {
    Type: "Float",
    Align: "Right",
    Format: "#,##0.######",
    Width: 100
  },
  "NullFloat": {
    Type: "Float",
    Align: "Right",
    Format: "#,###.######",
    Width: 100
  },

  // 기타포멧
  "IdNo": {
    Type: "Text",
    Align: "Center",
    CustomFormat: "IdNo"
  },
  "SaupNo": {},
  "PostNo": {},
  "CardNo": {},
  "PhoneNo": {},
  "Number": {},

  // ibsheet7 migration
  // Popup,PopupEdit
  "Popup":{"Type": "Text","Width": 100,"Align": "Center","Button":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgNjQwIDY0MCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1Ij48ZGVmcz48cGF0aCBkPSJNMjc5LjczIDM0LjdMMjg5LjAxIDM1LjY0TDI5OC4xNyAzNi45NUwzMDcuMjIgMzguNjFMMzE2LjEzIDQwLjYyTDMyNC45MiA0Mi45OEwzMzMuNTYgNDUuNjZMMzQyLjA1IDQ4LjY4TDM1MC4zOCA1Mi4wMUwzNTguNTUgNTUuNjZMMzY2LjU1IDU5LjYxTDM3NC4zNyA2My44NkwzODIuMDEgNjguMzlMMzg5LjQ1IDczLjIxTDM5Ni42OCA3OC4zMUw0MDMuNzEgODMuNjdMNDEwLjUzIDg5LjNMNDE3LjEyIDk1LjE3TDQyMy40OCAxMDEuMjlMNDI5LjYgMTA3LjY1TDQzNS40OCAxMTQuMjRMNDQxLjEgMTIxLjA2TDQ0Ni40NiAxMjguMDlMNDUxLjU2IDEzNS4zM0w0NTYuMzggMTQyLjc3TDQ2MC45MiAxNTAuNEw0NjUuMTcgMTU4LjIyTDQ2OS4xMiAxNjYuMjJMNDcyLjc2IDE3NC4zOUw0NzYuMSAxODIuNzJMNDc5LjExIDE5MS4yMkw0ODEuOCAxOTkuODZMNDg0LjE1IDIwOC42NEw0ODYuMTYgMjE3LjU2TDQ4Ny44MiAyMjYuNkw0ODkuMTMgMjM1Ljc2TDQ5MC4wNyAyNDUuMDRMNDkwLjY0IDI1NC40Mkw0OTAuODMgMjYzLjlMNDkwLjY0IDI3My4zOEw0OTAuMDcgMjgyLjc2TDQ4OS4xMyAyOTIuMDRMNDg3LjgyIDMwMS4yTDQ4Ni4xNiAzMTAuMjVMNDg0LjE1IDMxOS4xNkw0ODEuOCAzMjcuOTVMNDc5LjExIDMzNi41OUw0NzYuMSAzNDUuMDhMNDcyLjc2IDM1My40MUw0NjkuMTIgMzYxLjU4TDQ2NS4xNyAzNjkuNThMNDYwLjkyIDM3Ny40TDQ1Ni4zOCAzODUuMDRMNDUxLjczIDM5Mi4yMkw1OTYuOTcgNTM3LjQ2TDUzNC40MyA2MDBMMzg5LjE5IDQ1NC43NkwzODIuMDEgNDU5LjQxTDM3NC4zNyA0NjMuOTVMMzY2LjU1IDQ2OC4yTDM1OC41NSA0NzIuMTVMMzUwLjM4IDQ3NS43OUwzNDIuMDUgNDc5LjEzTDMzMy41NiA0ODIuMTRMMzI0LjkyIDQ4NC44M0wzMTYuMTMgNDg3LjE4TDMwNy4yMiA0ODkuMTlMMjk4LjE3IDQ5MC44NUwyODkuMDEgNDkyLjE2TDI3OS43MyA0OTMuMUwyNzAuMzUgNDkzLjY3TDI2MC44NyA0OTMuODZMMjUxLjM5IDQ5My42N0wyNDIuMDEgNDkzLjFMMjMyLjczIDQ5Mi4xNkwyMjMuNTcgNDkwLjg1TDIxNC41MyA0ODkuMTlMMjA1LjYxIDQ4Ny4xOEwxOTYuODMgNDg0LjgzTDE4OC4xOSA0ODIuMTRMMTc5LjY5IDQ3OS4xM0wxNzEuMzYgNDc1Ljc5TDE2My4xOSA0NzIuMTVMMTU1LjE5IDQ2OC4yTDE0Ny4zNyA0NjMuOTVMMTM5Ljc0IDQ1OS40MUwxMzIuMyA0NTQuNTlMMTI1LjA2IDQ0OS40OUwxMTguMDMgNDQ0LjEzTDExMS4yMSA0MzguNTFMMTA0LjYyIDQzMi42M0w5OC4yNiA0MjYuNTFMOTIuMTQgNDIwLjE1TDg2LjI3IDQxMy41Nkw4MC42NCA0MDYuNzRMNzUuMjggMzk5LjcxTDcwLjE4IDM5Mi40OEw2NS4zNiAzODUuMDRMNjAuODIgMzc3LjRMNTYuNTggMzY5LjU4TDUyLjYzIDM2MS41OEw0OC45OCAzNTMuNDFMNDUuNjUgMzQ1LjA4TDQyLjYzIDMzNi41OUwzOS45NSAzMjcuOTVMMzcuNTkgMzE5LjE2TDM1LjU4IDMxMC4yNUwzMy45MiAzMDEuMkwzMi42MSAyOTIuMDRMMzEuNjcgMjgyLjc2TDMxLjEgMjczLjM4TDMwLjkxIDI2My45TDMxLjEgMjU0LjQyTDMxLjY3IDI0NS4wNEwzMi42MSAyMzUuNzZMMzMuOTIgMjI2LjZMMzUuNTggMjE3LjU2TDM3LjU5IDIwOC42NEwzOS45NSAxOTkuODZMNDIuNjMgMTkxLjIyTDQ1LjY1IDE4Mi43Mkw0OC45OCAxNzQuMzlMNTIuNjMgMTY2LjIyTDU2LjU4IDE1OC4yMkw2MC44MiAxNTAuNEw2NS4zNiAxNDIuNzdMNzAuMTggMTM1LjMzTDc1LjI4IDEyOC4wOUw4MC42NCAxMjEuMDZMODYuMjcgMTE0LjI0TDkyLjE0IDEwNy42NUw5OC4yNiAxMDEuMjlMMTA0LjYyIDk1LjE3TDExMS4yMSA4OS4zTDExOC4wMyA4My42N0wxMjUuMDYgNzguMzFMMTMyLjMgNzMuMjFMMTM5Ljc0IDY4LjM5TDE0Ny4zNyA2My44NkwxNTUuMTkgNTkuNjFMMTYzLjE5IDU1LjY2TDE3MS4zNiA1Mi4wMUwxNzkuNjkgNDguNjhMMTg4LjE5IDQ1LjY2TDE5Ni44MyA0Mi45OEwyMDUuNjEgNDAuNjJMMjE0LjUzIDM4LjYxTDIyMy41NyAzNi45NUwyMzIuNzMgMzUuNjRMMjQyLjAxIDM0LjdMMjUxLjM5IDM0LjEzTDI2MC44NyAzMy45NEwyNzAuMzUgMzQuMTNMMjc5LjczIDM0LjdaTTI0OS4yMyAxMjIuNDhMMjQzLjUxIDEyMy4wNkwyMzcuODYgMTIzLjg3TDIzMi4yOCAxMjQuODlMMjI2Ljc3IDEyNi4xM0wyMjEuMzUgMTI3LjU5TDIxNi4wMiAxMjkuMjRMMjEwLjc4IDEzMS4xTDIwNS42NCAxMzMuMTZMMjAwLjYgMTM1LjQxTDE5NS42NiAxMzcuODVMMTkwLjg0IDE0MC40N0wxODYuMTMgMTQzLjI3TDE4MS41NCAxNDYuMjRMMTc3LjA3IDE0OS4zOUwxNzIuNzMgMTUyLjdMMTY4LjUzIDE1Ni4xN0wxNjQuNDYgMTU5Ljc5TDE2MC41NCAxNjMuNTdMMTU2Ljc2IDE2Ny40OUwxNTMuMTQgMTcxLjU2TDE0OS42NyAxNzUuNzZMMTQ2LjM2IDE4MC4xTDE0My4yMSAxODQuNTdMMTQwLjI0IDE4OS4xNkwxMzcuNDQgMTkzLjg3TDEzNC44MiAxOTguNjlMMTMyLjM4IDIwMy42M0wxMzAuMTMgMjA4LjY3TDEyOC4wNyAyMTMuODFMMTI2LjIxIDIxOS4wNUwxMjQuNTYgMjI0LjM4TDEyMy4xIDIyOS44TDEyMS44NiAyMzUuMzFMMTIwLjg0IDI0MC44OUwxMjAuMDMgMjQ2LjU0TDExOS40NSAyNTIuMjZMMTE5LjEgMjU4LjA1TDExOC45OCAyNjMuOUwxMTkuMSAyNjkuNzVMMTE5LjQ1IDI3NS41NEwxMjAuMDMgMjgxLjI2TDEyMC44NCAyODYuOTJMMTIxLjg2IDI5Mi41TDEyMy4xIDI5OEwxMjQuNTYgMzAzLjQyTDEyNi4yMSAzMDguNzVMMTI4LjA3IDMxMy45OUwxMzAuMTMgMzE5LjEzTDEzMi4zOCAzMjQuMTdMMTM0LjgyIDMyOS4xMUwxMzcuNDQgMzMzLjkzTDE0MC4yNCAzMzguNjRMMTQzLjIxIDM0My4yM0wxNDYuMzYgMzQ3LjdMMTQ5LjY3IDM1Mi4wNEwxNTMuMTQgMzU2LjI0TDE1Ni43NiAzNjAuMzFMMTYwLjU0IDM2NC4yM0wxNjQuNDYgMzY4LjAxTDE2OC41MyAzNzEuNjRMMTcyLjczIDM3NS4xMUwxNzcuMDcgMzc4LjQyTDE4MS41NCAzODEuNTZMMTg2LjEzIDM4NC41M0wxOTAuODQgMzg3LjMzTDE5NS42NiAzODkuOTZMMjAwLjYgMzkyLjM5TDIwNS42NCAzOTQuNjRMMjEwLjc4IDM5Ni43TDIxNi4wMiAzOTguNTZMMjIxLjM1IDQwMC4yMkwyMjYuNzcgNDAxLjY3TDIzMi4yOCA0MDIuOTFMMjM3Ljg2IDQwMy45NEwyNDMuNTEgNDA0Ljc0TDI0OS4yMyA0MDUuMzJMMjU1LjAyIDQwNS42N0wyNjAuODcgNDA1Ljc5TDI2Ni43MiA0MDUuNjdMMjcyLjUxIDQwNS4zMkwyNzguMjMgNDA0Ljc0TDI4My44OSA0MDMuOTRMMjg5LjQ3IDQwMi45MUwyOTQuOTcgNDAxLjY3TDMwMC4zOSA0MDAuMjJMMzA1LjcyIDM5OC41NkwzMTAuOTYgMzk2LjdMMzE2LjEgMzk0LjY0TDMyMS4xNCAzOTIuMzlMMzI2LjA4IDM4OS45NkwzMzAuOSAzODcuMzNMMzM1LjYxIDM4NC41M0wzNDAuMiAzODEuNTZMMzQ0LjY3IDM3OC40MkwzNDkuMDEgMzc1LjExTDM1My4yMSAzNzEuNjRMMzU3LjI4IDM2OC4wMUwzNjEuMiAzNjQuMjNMMzY0Ljk4IDM2MC4zMUwzNjguNjEgMzU2LjI0TDM3Mi4wOCAzNTIuMDRMMzc1LjM5IDM0Ny43TDM3OC41MyAzNDMuMjNMMzgxLjUgMzM4LjY0TDM4NC4zIDMzMy45M0wzODYuOTMgMzI5LjExTDM4OS4zNiAzMjQuMTdMMzkxLjYxIDMxOS4xM0wzOTMuNjcgMzEzLjk5TDM5NS41MyAzMDguNzVMMzk3LjE5IDMwMy40MkwzOTguNjQgMjk4TDM5OS44OCAyOTIuNUw0MDAuOTEgMjg2LjkyTDQwMS43MSAyODEuMjZMNDAyLjI5IDI3NS41NEw0MDIuNjQgMjY5Ljc1TDQwMi43NiAyNjMuOUw0MDIuNjQgMjU4LjA1TDQwMi4yOSAyNTIuMjZMNDAxLjcxIDI0Ni41NEw0MDAuOTEgMjQwLjg5TDM5OS44OCAyMzUuMzFMMzk4LjY0IDIyOS44TDM5Ny4xOSAyMjQuMzhMMzk1LjUzIDIxOS4wNUwzOTMuNjcgMjEzLjgxTDM5MS42MSAyMDguNjdMMzg5LjM2IDIwMy42M0wzODYuOTMgMTk4LjY5TDM4NC4zIDE5My44N0wzODEuNSAxODkuMTZMMzc4LjUzIDE4NC41N0wzNzUuMzkgMTgwLjFMMzcyLjA4IDE3NS43NkwzNjguNjEgMTcxLjU2TDM2NC45OCAxNjcuNDlMMzYxLjIgMTYzLjU3TDM1Ny4yOCAxNTkuNzlMMzUzLjIxIDE1Ni4xN0wzNDkuMDEgMTUyLjdMMzQ0LjY3IDE0OS4zOUwzNDAuMiAxNDYuMjRMMzM1LjYxIDE0My4yN0wzMzAuOSAxNDAuNDdMMzI2LjA4IDEzNy44NUwzMjEuMTQgMTM1LjQxTDMxNi4xIDEzMy4xNkwzMTAuOTYgMTMxLjFMMzA1LjcyIDEyOS4yNEwzMDAuMzkgMTI3LjU5TDI5NC45NyAxMjYuMTNMMjg5LjQ3IDEyNC44OUwyODMuODkgMTIzLjg3TDI3OC4yMyAxMjMuMDZMMjcyLjUxIDEyMi40OEwyNjYuNzIgMTIyLjEzTDI2MC44NyAxMjIuMDFMMjU1LjAyIDEyMi4xM0wyNDkuMjMgMTIyLjQ4WiIgaWQ9ImJpVVlobFRwNiI+PC9wYXRoPjwvZGVmcz48Zz48Zz48Zz48dXNlIHhsaW5rOmhyZWY9IiNiaVVZaGxUcDYiIG9wYWNpdHk9IjEiIGZpbGw9IiM1OTU5NTkiIGZpbGwtb3BhY2l0eT0iMSI+PC91c2U+PC9nPjwvZz48L2c+PC9zdmc+"},
  // Status Type
  "STATUS": {
    Type: "Text",
    Align: "Center",
    Width: 50,
    Formula: "Row.Deleted ? 'D' : Row.Added ? 'I' : Row.Changed ? 'U' : 'R'",
    Format: {
      'I': '입력',
      'U': '수정',
      'D': '삭제',
      'R': ''
    }
  },
  // DelCheck Type
  "DelCheck": {
    Type: "Bool",
    Width: 50,
    OnClick: function(evtParam){
    	//부모가 체크되어 있는 경우 더 이상 진행하지 않는다.
    	var chked = !(evtParam.row[evtParam.col]);
    	var prows = evtParam.sheet.getParentRows( evtParam.row);
    	if(!chked && prows[0] && prows[0][evtParam.col]) return true;	
    },
    OnChange: function (evtParam) {
    	var chked = evtParam.row[evtParam.col];
    	//신규행에 대해서는 즉시 삭제한다.
      if (evtParam.row.Added) {
        setTimeout(function () {
          evtParam.sheet.removeRow(evtParam.row);
        }, 30);
      } else {
      	//행을 삭제 상태로 변경
        evtParam.sheet.deleteRow(evtParam.row, evtParam.row[evtParam.col]);
        //자식행 추출
        var rows = evtParam.sheet.getChildRows(evtParam.row);
        rows.push(evtParam.row);
        
        //모두 체크하고 편집 불가로 변경
        for(var i=0;i<rows.length;i++){
        	var row = rows[i];
        	evtParam.sheet.setValue (row ,evtParam.col, chked, 0 );
         	row.CanEdit = !evtParam.row[evtParam.col];
         	if (!row[evtParam.col+"CanEdit"]) {
		        row[evtParam.col+"CanEdit"] = true;
		      }
         	evtParam.sheet.refreshRow(row);	
        }
      }
    }
  }
};

function clone(obj) {
  if (obj === null || typeof (obj) !== 'object') return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = clone(obj[attr]);
    }
  }
  return copy;
}

/*
ibsheet7 migration functions
*/
if (!_IBSheet.v7) _IBSheet.v7 = {};

/*
 * ibsheet7 AcceptKey 속성 대응
 * param list
 * objColumn : 시트 생성시 Cols객체의 컬럼
 * str : ibsheet7 AcceptKeys에 정의했던 스트링
 */
_IBSheet.v7.convertAcceptKeys = function (objColumn, str) {
  // EditMask를 통해 AcceptKeys를 유사하게 구현
  var acceptKeyArr = str.split("|");
  var mask = "";

  for (var i = 0; i < acceptKeyArr.length; i++) {
    switch (acceptKeyArr[i]) {
      case "E":
        mask += "|\\w";
        break;
      case "N":
        mask += "|\\d";
        break;
      case "K":
        mask += "|\\u3131-\\u314e|\\u314f-\\u3163|\\uac00-\\ud7a3"
        break;
      default:
        if (acceptKeyArr[i].substring(0, 1) == "[" && acceptKeyArr[i].substring(acceptKeyArr[i].length - 1) == "]") {
          var otherKeys = acceptKeyArr[i].substring(1, acceptKeyArr[i].length - 1);
          for (var x = 0; x < otherKeys.length; x++) {
            if (otherKeys[x] == "." || otherKeys[x] == "-") {
              mask += "|\\" + otherKeys[x];
            } else {
              mask += "|" + otherKeys[x];
            }
          }
        }
        break;
    }
  }
  objColumn.EditMask = "^[" + mask.substring(1) + "]*$";
};

//Date Format migration
//exam)
/*
//데이터 로드 이벤트에서 호출합니다.
options.Events.onBeforeDataLoad:function(obj){
  //날짜포맷 컬럼의 값을 ibsheet8에 맞게 변경하여 로드시킴
  IBSheet.v7.convertDateFormat(obj);
}
*/
_IBSheet.v7.convertDateFormat = function (obj) {
  var cdata = obj.data;
  var changeCol = {};
  //날짜 컬럼에 대한 포맷을 별도로 저장
  var cols = obj.sheet.getCols();
  for (var i = 0; i < cols.length; i++) {
    var colName = cols[i];

    if (obj.sheet.Cols[colName].Type == "Date") {
      //DataFormat이 없으면 EditFormat 이나 포맷에서 알파벳만 추출
      var format = (obj.sheet.Cols[colName].DataFormat) ? obj.sheet.Cols[colName].DataFormat : (obj.sheet.Cols[colName].EditFormat) ? obj.sheet.Cols[colName].EditFormat : obj.sheet.Cols[colName].Format.replace(/([^A-Za-z])+/g, "");
      changeCol[colName] = {
        format: format,
        length: format.length
      };
    }
  }

  if (Object.keys(changeCol).length !== 0) {
    var changeColKeys = Object.keys(changeCol);

    //DataFormat의 길이만큼 문자열을 자름
    for (var row = 0; row < cdata.length; row++) {
      for (var colName in cdata[row]) {
        if (changeColKeys.indexOf(colName) > -1) {
          // 문자열만 처리
          if (typeof ((cdata[row])[colName]) == "string") {
            //실제 값
            var v = (cdata[row])[colName];
            //MMdd만 값이 8자리 이상이면 중간에 4자리만 pick
            if (changeCol[colName].format == "MMdd" && v.length != 4) {
              if (v.length > 7) {
                v = v.substr(4, 4);
              }
            } else {
              //일반적으로 모두 포맷의 문자열 길이만큼 자름
              v = v.substr(0, changeCol[colName].length);
            }
            //수정한 값을 원래 위치에 대입
            (cdata[row])[colName] = v;
          }
        }
      }
    }
  }
};

/* ibsheet7의 Tree 구조 Json 데이터를 ibsheet8 형식에 맞게 파싱해주는 메소드 */
_IBSheet.v7.convertTreeData = function (data7) {
    var targetArr;
    var toString = Object.prototype.toString;
    var startLevel = 0;
    switch (toString.call(data7)) {
      case "[object Object]":
        if (!(data7["data"] || data7["Data"]) ||
          toString.call((data7["data"] || data7["Data"])) !== "[object Array]")
          return false;
        targetArr = (data7["data"] || data7["Data"]);
        break;
      case "[object Array]":
        targetArr = data7;
        break;
      default:
        return false;
    }

    targetArr = targetArr.reduce(function (accum, currentVal, curretIndex, array) {
      var cloneObj = clone(currentVal);
      if (cloneObj["HaveChild"]) {
        cloneObj["Count"] = true;
        delete cloneObj["HaveChild"];
      }
      if (accum.length == 0) {
        startLevel = parseInt(cloneObj["Level"]);
        delete cloneObj["Level"];
        accum.push(cloneObj);
      } else if (currentVal["Level"] <= startLevel) {
        startLevel = parseInt(cloneObj["Level"]);
        delete cloneObj["Level"];
        accum.push(cloneObj);
      } else if (currentVal["Level"]) {
        var parent = accum[accum.length - 1];
        for (var i = startLevel; i < parseInt(currentVal["Level"]); i++) {
          if (i === parseInt(currentVal["Level"]) - 1) {
            if (!parent.Items) {
              parent.Items = [];
            }
            delete cloneObj["Level"];
            parent.Items.push(cloneObj);
          } else {
            parent = parent.Items[parent.Items.length - 1];
          }
        }
      }
      return accum;
    }, []);

    delete data7["Data"];
    data7["data"] = targetArr;

  return data7;
};

/*
 * 일반 달력 사용시 사용 함수
 * @param   : id          - from혹은 to 날짜가 표시될 input 객체
 * @param   : format      - 날짜 형태 YMD
 * @version : 1.0.0.0,
 *            
 * @sample1
 * <span>
 * <input  type="text" name="eDate" id="eDate" DATE='YMD'/>
 * <button class='calbtn' onclick='IBSheet.v7.IBS_Calendar("eDate","yyyy-MM-dd")'>달력</button>
 * </span>
 */
_IBSheet.v7.IBS_Calendar = function(id,format) {
    event.preventDefault();
    var opt = {
            Date:$("#"+id).val(),
            Format:format,
            OnButtonClick:function(evt){
                if(evt==2){ //지우기
                    $("#"+id).val("");            
                }
                calObj.Close();
            },
    };
    if(format=="yyyy-MM")opt.Buttons = 4;
    function calPickCallBack(v){
        $("#"+id).val(IBSheet.dateToString(parseInt(v), format) ); 
    }
    var calObj = IBSheet.showCalendar(opt,{Tag:id},calPickCallBack);
}
/**
 * 여러 개의 행을 한번에 hideRow하는 API
 * @method     hideRows
 * @param      {array[row objct]}    rows   데이터 로우 객체를 담고있는 배열
 * @return     none
*/
Fn.hideRows = function(rows) {
  if (!Array.isArray(rows)) return;

  for (var i = 0; i < rows.length; i++) {
    this.hideRow(rows[i], 0, 1, 1);
  }
  this.renderBody();
}

/**
 * 시트에서 보여지는 데이터 로우 객체만을 반환하는 API
 * @method     hideRows
 * @param      boolean   noSubTotal   소계/누계 행을 제외할지 여부
 * @return     array[row object]
*/
Fn.getDataVisibleRows = function (noSubTotal) {
  var rows = [], row = this.getFirstVisibleRow();

  while (row) {
    if (row.Kind === 'Data') {
      if ((noSubTotal && row.Name !== "SubSum") || !noSubTotal) {
        rows[rows.length] = row;
      }
    }
    row = this.getNextVisibleRow(row);
  }

  return rows;
}

/*------------------------------------------------------------------------------
method : IBS_CopyForm2Sheet()
desc  : Form객체에 있는 내용을 시트에 복사
param list
param : json 유형

param 내부 설정값
sheet : 값을 입력 받을 ibsheet 객체 (필수)
form : copy할 폼객체 (필수)
row : ibsheet 객체의 행 (default : 현재 선택된 행)
sheetPreFiex : 맵핑할 시트의 SavaName 앞에 PreFix 문자 (default : "")
formPreFiex : 맵핑할 폼객체의 이름 혹은 id 앞에  PreFix 문자 (default : "")
-------------------------------------------------------------------------------*/
_IBSheet.v7.IBS_CopyForm2Sheet = function(param) {
    var sheetobj,
        formobj,
        row,
        sheetPreFix,
        frmPreFix,
        col,
        colName,
        baseName,
        frmchild,
		fType,
		sType,
        sValue;

    if ((!param.sheet) || (typeof param.sheet.version != "function")) {
        _IBSheet.v7.IBS_ShowErrMsg("sheet 인자가 없거나 ibsheet객체가 아닙니다.");
        return false;
    }
    if (param.form == null || typeof param.form != "object" || param.form.tagName != "FORM") {
        _IBSheet.v7.IBS_ShowErrMsg("form 인자가 없거나 FORM 객체가 아닙니다.");
        return false;
    }

    sheetobj = param.sheet;
    formobj = param.form;
    row = param.row == null ? sheetobj.getFocusedRow() : param.row;
    sheetPreFix = param.sheetPreFix == null ? "" : param.sheetPreFix;
    frmPreFix = param.formPreFix == null ? "" : param.formPreFix;
    if (typeof row == "undefined") {
        _IBSheet.v7.IBS_ShowErrMsg("row 인자가 없고, 선택된 행이 존재하지 않습니다.");
        return;
    }

    //Sheet의 컬럼개수만큼 찾아서 HTML의 Form 각 Control에 값을 설정한다.
    //컬럼개수만큼 루프 실행
    cols = sheetobj.getCols();
    for (var col = 0; col < cols.length ; col++) {
        //컬럼의 별명을 문자열로 가져온다.
        colName = cols[col];

        //PreFix가 붙지 않은 형태의 SaveName을 가져온다.
        baseName = colName.substring(sheetPreFix.length);

        frmchild = null;
        try {
            //폼에 있는 해당 이름의 컨트롤을 가져온다.예)"frm_CardNo"
            frmchild = formobj[frmPreFix + baseName];
        } catch (e) {

        }

        //폼에 해당하는 이름의 컨트롤이 없는 경우는 계속 진행한다.
        if (frmchild == null) continue;

        fType = frmchild.type;
        sValue = "";

        //radio의 경우 frmchild가 배열형태가 되므로, frmchild.type으로는 타입을 알수 없다.
        if (typeof fType == "undefined" && frmchild.length > 0) {
            fType = frmchild[0].type;
        }
		sType = sheetobj.getType(row,colName);
		//일부 편집이 불가능한 타입의 컬럼은 건너뛰자.
		if(sType=="Button" || sType == "Link" || sType == "Img") continue;

        //타입별로 값을 설정한다.
        switch (fType) {
            case undefined:
            case "button":
            case "reset":
            case "submit":
                break;
            case "radio":
                for (var idx = 0; idx < frmchild.length; idx++) {
                    if (frmchild[idx].checked) {
                        sValue = frmchild[idx].value;
                        break;
                    }
                }
                break;
            case "checkbox":
                sValue = (frmchild.checked) ? 1 : 0;
                break;
            default:
                sValue = frmchild.value;
        } //end of switch
        sheetobj.setString(row, sheetPreFix + baseName, sValue, 0);
    } //end of for(col)
	sheetobj.refreshRow(row);
    //정상적인 처리완료
    return true;
}
/*----------------------------------------------------------------------------
method : IBS_CopySheet2Form()
desc : 시트의 한 행을 폼객체에 복사  (ibsheet7 ibsheetinfo.js 마이그레이션)

param list
param : json 유형

param 내부 설정값
sheet : 값을 입력 받을 ibsheet 객체 (필수)
form : copy할 폼객체 (필수)
row : ibsheet 객체의 행 (default : 현재 선택된 행)
sheetPreFix : 맵핑할 시트의 SavaName 앞에 PreFix 문자 (default : "")
formPreFix : 맵핑할 폼객체의 이름 혹은 id 앞에  PreFix 문자 (default : "")
-----------------------------------------------------------------------------*/
_IBSheet.v7.IBS_CopySheet2Form = function(param) {
    var sheetobj,
    formobj,
    row,
    sheetPreFix,
    frmPreFix,
    cols,
    col,
    rmax,
    colName,
    baseName,
    sheetvalue,
    sheetstring,
    frmchild,
    sType,
    fType,
    sValue;

    if ((!param.sheet) || (typeof param.sheet.version != "function")) {
        _IBSheet.v7.IBS_ShowErrMsg("sheet 인자가 없거나 ibsheet객체가 아닙니다.");
        return false;
    }

    if (param.form == null || typeof param.form != "object" || param.form.tagName != "FORM") {
        _IBSheet.v7.IBS_ShowErrMsg("form 인자가 없거나 FORM 객체가 아닙니다.");
        return false;
    }
    sheetobj = param.sheet;
    formobj = param.form;
    row = param.row == null ? sheetobj.getFocusedRow() : param.row;
    sheetPreFix = param.sheetPreFix == null ? "" : param.sheetPreFix;
    frmPreFix = param.formPreFix == null ? "" : param.formPreFix;

    if (typeof row == "undefined") {
        _IBSheet.v7.IBS_ShowErrMsg("row 인자가 없고, 선택된 행이 존재하지 않습니다.");
        return false;
    }

    //Sheet의 컬럼개수만큼 찾아서 HTML의 Form 각 Control에 값을 설정한다.
    //컬럼개수만큼 루프 실행
    cols = sheetobj.getCols();
    for (var col = 0; col < cols.length ; col++) {
        //컬럼의 이름을 가져온다.
        colName = cols[col];

        //PreFix가 붙지 않은 형태의 Name을 가져온다.
        baseName = colName.substring(sheetPreFix.length);

        sheetvalue = sheetobj.getValue(row, colName);

        frmchild = null;
        try {
            //폼에 있는 해당 이름의 컨트롤을 가져온다.예)"frm_CardNo"
            frmchild = formobj[frmPreFix + baseName];
        } catch (e) {

        }

        //폼에 해당하는 이름의 컨트롤이 없는 경우는 계속 진행한다.
        if (frmchild == null) {
            continue;
        }

        fType = frmchild.type;
        sValue = "";
        //radio의 경우 frmchild가 배열형태가 되므로, frmchild.type으로는 타입을 알수 없다.
        if (typeof fType == "undefined" && frmchild.length > 0) {
            fType = frmchild[0].type;
        }
        sType = sheetobj.getType(row,colName);
        
        //일부 편집이 불가능한 타입의 컬럼은 건너뛰자.
        if(sType=="Button" || sType == "Link" || sType == "Img") continue;
        

        //타입별로 값을 설정한다.
        switch (fType) {
            case undefined:
            case "button":
            case "reset":
            case "submit":
                break;
            case "select-one":
                frmchild.value = sheetvalue;
                break;
            case "radio":
                for (var idx = 0, rmax = frmchild.length; idx < rmax; idx++) {
                    if (frmchild[idx].value == sheetvalue) {
                        frmchild[idx].checked = true;
                        break;
                    }
                }
                break;
            case "checkbox":
                frmchild.checked = (sheetvalue == 1);
                break;
            default:
                sheetstring = sheetobj.getString(row, colName);
                //셀에 값이 없고, EmptyValue가 있는 경우, EmptyValue 값이 복사되는거 방지.
                if(sheetvalue==="" && sheetstring!==""){
                    sheetstring = "";
                }
                frmchild.value = sheetstring;
                break;
        } //end of switch
    } //end of for(col)

    //정상적인 처리완료
    return true;
}
//ibsheet7 에서 마이그레이션
/*
 * Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 
 * @param   : form          - form객체 혹은 form객체 id
 * @param   : checkRequired - 선택,필수입력 체크 여부 (boolean(default:true))
 * @param   : encoding      - 문자열 엔코딩 여부 (boolean(default:true))
 * @return  : String        - Form오브젝트 안에 elements을 QueryString으로 구성한 문자열
 *            undefined     - checkRequired인자가 true이고, 필수입력에 걸린경우 return 값
 * @version : 1.0.0.0,
 *            
 * @sample1
 *  var sCondParam=FormQueryString(document.frmSearch); //결과:"txtname=이경희&rdoYn=1&sltMoney=원화";
 * @sample2
 *  <input type="text" name="txtName" required="이름">        //필수 입력 항목이면 required="이름" 를 설정한다.
 *  var sCondParam = FormQueryString(document.mainForm, true);//필수입력까지 체크하며, 필수입력에 걸리면 리턴값은 undefined
 *  if (sCondParam==null) return;
 */
_IBSheet.v7.IBS_FormQueryString = function(form, checkRequired, encoding) {
    if(typeof form == "string") form = document.getElementById(form)||document[form];
    if (typeof form != "object" || form.tagName != "FORM") {
        _IBSheet.v7.IBS_ShowErrMsg("FormQueryString 함수의 인자는 FORM 태그가 아닙니다.");
        return;
    }
    //default setting
    if(typeof checkRequired == "undefined") checkRequired = true;
    if(typeof encoding == "undefined") encoding = true;

    var name = new Array(form.elements.length);
    var value = new Array(form.elements.length);
    var j = 0;
    var plain_text = "";

    //사용가능한 컨트롤을 배열로 생성한다.
    var len = form.elements.length;
    for (var i = 0; i < len; i++) {
        var prev_j = j;
        switch (form.elements[i].type) {
            case undefined:
            case "button":
            case "reset":
            case "submit":
                break;
            case "radio":
            case "checkbox":
                if (form.elements[i].checked == true) {
                    name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                    value[j] = form.elements[i].value;
                    j++;
                }
                break;
            case "select-one":
                name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                var ind = form.elements[i].selectedIndex;
                if (ind >= 0) {

                    value[j] = form.elements[i].options[ind].value;

                } else {
                    value[j] = "";
                }
                j++;
                break;
            case "select-multiple":
                name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                var llen = form.elements[i].length;
                var increased = 0;
                for (var k = 0; k < llen; k++) {
                    if (form.elements[i].options[k].selected) {
                        name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                        value[j] = form.elements[i].options[k].value;
                        j++;
                        increased++;
                    }
                }
                if (increased > 0) {
                    j--;
                } else {
                    value[j] = "";
                }
                j++;
                break;
            default:
                name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                value[j] = form.elements[i].value;
                j++;
        }

        if (checkRequired) {
            //html 컨트롤 태그에 required속성을 설정하면 필수입력을 확인할 수 있다.
            //<input type="text" name="txtName" required="이름">

            if (_IBSheet.v7.IBS_RequiredChk(form.elements[i]) && prev_j != j && value[prev_j] == "") {

                if (form.elements[i].getAttribute("required") == null ||
                    form.elements[i].getAttribute("required") == ""
                ) {
                    alert('"' + _IBSheet.v7.IBS_GetLabel(form.elements[i]) + '" 은 필수 입력 항목 입니다.' );
                } else {

                    alert('"' + form.elements[i].getAttribute("required") + '" 은 필수 입력 항목 입니다.');
                }
                //컨트롤이 숨겨져 있을수도 있으므로 에러 감싼다.
                try {
                    form.elements[i].focus();
                } catch (ee) {;
                }

                return;
            }
        }
    }
    //QueryString을 조합한다.
    for (var i = 0; i < j; i++) {
        if (name[i] != ''){
            if(encoding){
                plain_text += encodeURIComponent(name[i]) + "=" + encodeURIComponent(value[i]) + "&";
            }else{
                plain_text += name[i] + "=" + value[i] + "&";
            }
        } 
    }

    //마지막에 &를 없애기 위함
    if (plain_text != "") plain_text = plain_text.substr(0, plain_text.length - 1);

    return plain_text;
}
//ibsheet7 에서 마이그레이션
/*
 * Form오브젝트 안에 있는 컨트롤을 Json Object으로 구성한다. 
 * @param   : form          - form객체 혹은 form객체 id
 * @param   : checkRequired - 선택,필수입력 체크 여부 (boolean(default:true))
 * @param   : encoding      - 문자열 엔코딩 여부 (boolean(default:true))
 * @return  : String        - Form오브젝트 안에 elements을 QueryString으로 구성한 문자열
 *            undefined     - checkRequired인자가 true이고, 필수입력에 걸린경우 return 값
 * @version : 1.0.0.0,
 *            
 * @sample1
 *  var sCondParam=FormToJson(document.frmSearch); //결과: {txtname:"이경희" , "rdoYn":"on","sltMoney":"원화"};
 * @sample2
 *  <input type="text" name="txtName" required="이름">        //필수 입력 항목이면 required="이름" 를 설정한다.
 *  var sCondParam = FormToJson(document.mainForm, true);//필수입력까지 체크하며, 필수입력에 걸리면 리턴값은 undefined
 *  if (sCondParam==null) return;
 */
_IBSheet.v7.IBS_FormToJson = function(form, checkRequired, encoding) {
    if(typeof form == "string") form = document.getElementById(form)||document[form];
    if (typeof form != "object" || form.tagName != "FORM") {
        _IBSheet.v7.IBS_ShowErrMsg("FormToJson 함수의 인자는 FORM 태그가 아닙니다.");
        return;
    }
    //default setting
    if(typeof checkRequired == "undefined") checkRequired = true;
    if(typeof encoding == "undefined") encoding = true;

    var name = new Array(form.elements.length);
    var value = new Array(form.elements.length);
    var j = 0;
    var plain_obj = {};

    //사용가능한 컨트롤을 배열로 생성한다.
    var len = form.elements.length;
    for (var i = 0; i < len; i++) {
        var prev_j = j;
        switch (form.elements[i].type) {
            case undefined:
            case "button":
            case "reset":
            case "submit":
                break;
            case "radio":
            case "checkbox":
                if (form.elements[i].checked == true) {
                    name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                    value[j] = form.elements[i].value;
                    j++;
                }
                break;
            case "select-one":
                name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                var ind = form.elements[i].selectedIndex;
                if (ind >= 0) {
                    value[j] = form.elements[i].options[ind].value;
                } else {
                    value[j] = "";
                }
                j++;
                break;
            case "select-multiple":
                name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                var llen = form.elements[i].length;
                var increased = 0;
                for (var k = 0; k < llen; k++) {
                    if (form.elements[i].options[k].selected) {
                        name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                        value[j] = form.elements[i].options[k].value;
                        j++;
                        increased++;
                    }
                }
                if (increased > 0) {
                    j--;
                } else {
                    value[j] = "";
                }
                j++;
                break;
            default:
                name[j] = _IBSheet.v7.IBS_GetName(form.elements[i]);
                value[j] = form.elements[i].value;
                j++;
        }

        if (checkRequired) {
            //html 컨트롤 태그에 required속성을 설정하면 필수입력을 확인할 수 있다.
            //<input type="text" name="txtName" required="이름">

            if (_IBSheet.v7.IBS_RequiredChk(form.elements[i]) && prev_j != j && value[prev_j] == "") {

                if (form.elements[i].getAttribute("required") == null ||
                    form.elements[i].getAttribute("required") == ""
                ) {
                    alert('"' + _IBSheet.v7.IBS_GetLabel(form.elements[i]) + '" 은 필수 입력 항목 입니다.' );
                } else {

                    alert('"' + form.elements[i].getAttribute("required") + '" 은 필수 입력 항목 입니다.');
                }
                //컨트롤이 숨겨져 있을수도 있으므로 에러 감싼다.
                try {
                    form.elements[i].focus();
                } catch (ee) {;
                }

                return;
            }
        }
    }

    //JSON을 조합한다.

    var tname = "";
    var tvalue = "";
    for (var i = 0; i < j; i++) {
        if(encoding){
            tname = encodeURIComponent(name[i]);
            tvalue = encodeURIComponent(value[i])
        }else{
            tname = name[i];
            tvalue = value[i];
        }
        if (name[i] != ''){
                //이미 있다면 배열로 변경
                if(plain_obj[tname]){
                    //이미 배열인 경우
                    if( Array.isArray(plain_obj[tname]) ){
                        plain_obj[tname].push(tvalue);
                    }else{
                        plain_obj[tname] = [plain_obj[tname] , tvalue ];
                    }
                }else{
                    plain_obj[tname] = tvalue;
                }
            
        } 
    }
    

    return plain_obj;
}
/*
 * FromToCalendar 사용시 사용 함수
 * @param   : id          - from혹은 to 날짜가 표시될 input 객체
 * @param   : format      - 날짜 형태 YMD
 * @version : 1.0.0.0,
 *            
 * @sample1
 *  <span>
 *  <input type='text' name="fromID" id="fromID" DATE='FromYMD' DATE_REF="toID"/>
 *  <button class='calbtn' onclick='IBSheet.v7.IBS_FromToCalendar("fromID","yyyy-MM-dd")'>달력</button>
 *  ~ <input type='text' name="toID" id="toID" DATE='ToYMD' DATE_REF="fromID"/>
 *  <button class='calbtn' onclick='IBSheet.v7.IBS_FromToCalendar("toID","yyyy-MM-dd")'>달력</button>
 *  </span>
 */
_IBSheet.v7.IBS_FromToCalendar = function(id,format) {
    if(event!=null){
	    event.preventDefault();
    }
    var ele = document.getElementById(id);
    var isFrom = ele.getAttribute("DATE")=="FromYMD";
    var oppoID = ele.getAttribute("DATE_REF");
    var oppoValue = document.getElementById(oppoID).value; 
    var oppoValueTimeStamp = oppoValue!=""?IBSheet.stringToDate(oppoValue,format):null;
    var opt = {
            Format:format,
            RowsPrev:2,
            RowsNext:2,
            Buttons:6,
            Texts:{Ok:"닫기",Clear:"지우기"},
            OnCanEditDate:function(d){
              if(oppoValue!=""){
                  if(isFrom){
                      if(d>oppoValueTimeStamp) return false;     
                  }else{
                      if(d<oppoValueTimeStamp) return false;     
                  }
              }  
            },
            OnGetCalendarDate:function(d,dt,cls,r){
                var targetValue = document.getElementById(id).value;
                if(oppoValue=="" || targetValue =="") return;
                var targetValueTimeStamp = IBSheet.stringToDate(targetValue,format);
                if(isFrom){
                    if(d>=targetValueTimeStamp && d<=oppoValueTimeStamp)  return "<span style='color:orange'>"+dt+"</span>";     
                }else{
                    if(d<=targetValueTimeStamp && d>=oppoValueTimeStamp)  return "<span style='color:orange'>"+dt+"</span>";     
                }
            },
            OnButtonClick:function(evt){
                if(evt==2){ //지우기
                    $("#"+id).val("");            
                }
                fromtoCal.Close();
            }
    };
    //달력에서 일자 선택시 callback(반대편 달력을 띄운다.)
    function calPickCallBack(v){
        $("#"+id).val(IBSheet.dateToString(parseInt(v), format) );
        var ele = document.getElementById(id);
        var oppoID = ele.getAttribute("DATE_REF");
        var oppoValue = document.getElementById(oppoID).value; 
        if(oppoValue==""){
			if(event!=null){
                event.preventDefault();
            }
            _IBSheet.v7.IBS_FromToCalendar(oppoID,format);
        }
    }
    var fromtoCal = IBSheet.showCalendar(opt,{Tag:id},calPickCallBack.bind(id));
}
//ibsheet7 에서 마이그레이션
//시트의 각 컬럼 Name을 구분자 "|"연결한 string으로 리턴
//param : ibsheet 객체
_IBSheet.v7.IBS_ConcatSaveName = function(sheet) {
    return sheet.getCols().join("|");
}

/**
 * 에러메시지를 표시한다. IBS_ShowErrMsg 대신 이 함수를 사용해야 한다.
 * @param   : sMsg      - 메시지
 * @return  : 없음
 * @version : 3.4.0.50
 * @sample
 *  IBS_ShowErrMsg("에러가 발생했습니다.");
 */
_IBSheet.v7.IBS_ShowErrMsg = function(sMsg) {
    return alert("[ibsheet-common]\n" + sMsg);
}

//required 여부 확인
_IBSheet.v7.IBS_RequiredChk = function(obj) {
    return (obj.getAttribute("required") != null);
}
//객체의 id 혹은 name을 리턴
_IBSheet.v7.IBS_GetName = function(obj) {
    if (obj.name != "") {
        return obj.name;
    } else if (obj.id != "") {
        return obj.id;
    } else {
        return "";
    }
}

//객체의 label 혹은 id 혹은 name을 리턴
_IBSheet.v7.IBS_GetLabel = function(obj){
    if(obj.labels && obj.labels.length>0){
        return obj.labels[0].textContent;
    } else{
        return _IBSheet.v7.IBS_GetName(obj);
    }
}
}(window, document));
