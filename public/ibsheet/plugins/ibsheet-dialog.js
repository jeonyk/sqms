/**
 * 제 품: IBSheet8 - Dialog Plugin
 * 버 전: v0.0.6-DEV.1 (20220118-1003)
 * 회 사: (주)아이비리더스
 * 주 소: https://www.ibsheet.com
 * 전 화: (02) 2621-2288~9
 */
(function(window, document) {
/*
 * ibsheet 내에 다이얼로그 (피봇,찾기,상세보기 등)
 * 해당 파일은 반드시 ibsheet.js 파일보다 뒤에 include 되어야 합니다.
 */
var _IBSheet = window['IBSheet'];
if (_IBSheet == null) {
  throw new Error('[ibsheet-dialog] undefined global object: IBSheet');
}

// IBSheet Plugins Object
var Fn = _IBSheet['Plugins'];

if (!Fn.PluginVers) Fn.PluginVers = {};
Fn.PluginVers.ibdialog = {
  name: 'ibdialog',
  version: '0.0.6-20220118-1003-DEV-1'
};

/* 드래그 관리 객체 */
function DragObject() {
  this.dx = null;
  this.dy = null;
  this.dialogLeft = null;
  this.dialogTop = null;
  this.tag = null;
  this.orgTag = null;
}

var DOP = DragObject.prototype;

var drag = new DragObject();

/* 드래그 태그를 지움 */
DOP.ClearDragObj = function (org) {
  if (this.tag) {
    this.dx = null;
    this.dy = null;
    if (this.tag.parentNode) {
      this.tag.parentNode.removeChild(this.tag);
      this.tag = null;
    }

    if (org && this.orgTag && this.orgTag.parentNode && this.orgTag.parentNode) {
      var parent = this.orgTag.parentNode;
      parent.removeChild(this.orgTag);
      if (parent.childNodes.length == 0) {
        parent.innerHTML = "<i class='CellsInfo' style='color:gray;font-size:12px;'>이곳으로 대상 컬럼을 끌어놓으십시오.</i>"
      }
      this.orgTag = null;
    }
  }
};

/* 드래그 태그를 생성 */
DOP.MakeDragObj = function (object, ev) {
  this.ClearDragObj();

  this.dx = object.offsetWidth / 2;
  this.dy = parseInt(getComputedStyle(object.firstChild).marginBottom) / 2;

  var div = document.createElement('div');
  div.id = "myDragObj"

  div.appendChild(object.cloneNode(true));
  div.style.position = "absolute";
  div.style.left = (ev.clientX - this.dialogLeft - this.dx) + "px"
  div.style.top = (ev.clientY - this.dialogTop + this.dy) + "px"

  this.tag = div;
  this.orgTag = object;
  document.getElementById('DragTags').appendChild(div);
};
/* 드래그시 태그를 같이 움직임 */
DOP.MoveDragObj = function (ev) {
  if (this.tag) {
    this.tag.style.left = (ev.clientX - this.dialogLeft - this.dx) + "px";
    this.tag.style.top = (ev.clientY - this.dialogTop + this.dy) + "px";
  }
};

//컬럼정보설정 시트에 보여질 데이터
Fn.makeConfigSheetData = function(headerIndex){
  var DATA = [],
  headerRows = [],
  cols = this.getCols(),
  title = [];
  if (headerIndex != null && typeof headerIndex === 'number' && headerIndex >= 0) {
    headerRows.push(this.getHeaderRows()[headerIndex] );
  }else{
    headerRows = this.getHeaderRows();
  }

  for(var c=0;c<cols.length;c++){
    if(this.getAttribute({col:cols[c],attr:"Visible"}) || this.Cols[cols[c]].UserHidden ){
      title.length = 0;
      for(var r=0;r<headerRows.length;r++){
        title.push( this.getValue(headerRows[r], cols[c] ) );
      }
      DATA.push({"HTitle":title.join("/"),"Show":!(this.Cols[cols[c]].UserHidden),ColName:cols[c]});
    }
  }
  return DATA;
}

/* 컬럼 정보 설정 다이얼로그 */
Fn.showConfigDialog = function(width,height,headerIndex,name){
  /* step 1 start
   * 현재 시트가 사용 불가능이거나 편집종료되지 못하는 경우 띄우지 않는다.
   */
  if (this.endEdit(true) == -1) return;

  // 스타일이 중복 되었을때 스타일을 제거한다.
  if (this._stylesConfigDialog && this._stylesConfigDialog.parentNode) {
    this._stylesConfigDialog.parentNode.removeChild(this._stylesConfigDialog);
    delete this._stylesConfigDialog;
  }

  var classDlg = "ConfigPopup";
  var themePrefix = this.Style;
  width = width && typeof width === "number" ? width : 300;
  height = height && typeof height === "number" ? height : 300;
  name = name && typeof name === "string" ? name : ("configSheet_" + this.id);

  var styles = document.createElement("style");
  styles.innerHTML = '.' + themePrefix + classDlg + 'Outer {' +
    '  padding: 10px 50px ;' +
    '  border: 3px solid #37acff;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Close {' +
    '  background-color: #000;' +
    '  width: 17px;' +
    '  height: 17px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Head, .' + themePrefix + classDlg + 'Foot {' +
    '  background-color:white;' +
    '  border-top:0px' +
    '} ' +
    '.' + themePrefix + classDlg + 'Head .' + themePrefix + classDlg + 'HeadText >div:last-child {' +
    '  text-align: center;' +
    '  color: #000;' +
    '  font-size: 25px;' +
    '  margin-bottom: 5px;' +
    '  font-weight: 600;' +
    '  height:35px;' +
    '  line-height: normal;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Btns {' +
    '  text-align:center;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Btns > button {' +
    '  color: #fff;' +
    '  font-family: "NotoSans_Medium";' +
    '  font-size: 18px;' +
    '  display: inline-block;' +
    '  text-align: center;' +
    '  vertical-align: middle;' +
    '  border-radius: 3px;' +
    '  background-color: #37acff;' +
    '  border: 1px solid #37acff;' +
    '  padding: 5px 10px;' +
    '  margin-left: 5px;' +
    '  cursor: pointer;' +
    '}';

  document.body.appendChild(styles);

  this._stylesConfigDialog = styles;

  /* step 2 start
   * 임시로 컬럼 보임 여부가 보여질 시트div 생성(생성된 다이얼로그로 아래에서 옮김).
   */
  var tmpSheetTag = document.createElement("div");
  tmpSheetTag.className = "SheetTmpTag";
  tmpSheetTag.style.width = "300px";
  tmpSheetTag.style.height = "300px";
  document.body.appendChild(tmpSheetTag);
  /* step 2 end */

  /* step 3 start
   * 띄워져있는 다이얼로그나 팁을 제거.
   */
  this.closeDialog();
  this.hideTip();
  /* step 3 end */

  /* step 4 start
   * 컬럼정보설정 시트에 대한 옵션 설정(컬럼정보설정 시트를 띄운 시트의 옵션을 따라간다.) 및 컬럼정보설정 시트 생성
   */
  var data = this.makeConfigSheetData(headerIndex);
  var ConfigSheet = _IBSheet.create(name, tmpSheetTag, {
    Cfg:{InfoRowConfig:{Visible:0},CanSort:0,HeaderCheck:1,CanDrag:1},
    Def:{Row:{CanDrag:1}},
    Cols:[
      {Header:"헤더타이틀",Type:"Text",Name:"HTitle",RelWidth:1,Hint:1,CanEdit:0,CanSelect:0,CanFocus:0,NoColor:1},
      {Header:"보임",Type:"Bool",Name:"Show",Width:90,NoColor:1},
      {Header:"컬럼명",Type:"Text",Name:"ColName",Visible:0},
    ]
  } ,data);
  /* step 4 end */

  /* step 5 start
   * 컬럼정보 시트가 띄워질 다이얼로그 창에 대한 설정 및 다이얼로그 생성
   */
  var dialogOpt = {},
    pos = {};
  this.initPopupDialog(dialogOpt, pos, ConfigSheet, {
    cssClass: classDlg
  });

  dialogOpt.Head = "<div>컬럼 정보 저장</div>";
  dialogOpt.Foot = "<div class='" + themePrefix + classDlg + "Btns'>" +
    "  <button id='" + name + "_OkEditDialog'>확인</button>" +
    "  <button id='" + name + "_CancelEditDialog'>취소</button>" +
    "</div>";
  dialogOpt.Body = "<div id='" + name + "_ConfigDialogBody' style='width:" + width + "px;height:" + height + "px;overflow:hidden;'></div>"
  dialogOpt = _IBSheet.showDialog(dialogOpt, pos, this);
  /* step 5 end */

  /* step 6 start
   * 다이얼로그 창의 Body에 컬럼정보설정 시트를 옮김 */
  var ConfigDlgBody = document.getElementById(name + "_ConfigDialogBody");
  ConfigDlgBody.innerHTML = "";
  for (var elem = tmpSheetTag.firstChild; elem; elem = tmpSheetTag.firstChild) ConfigDlgBody.appendChild(elem);
  ConfigSheet.MainTag = ConfigDlgBody;
  tmpSheetTag.parentNode.removeChild(tmpSheetTag);
  /* step 6 end */

  /* step 7 start
   * 버튼 클릭시 및 다이얼로그의 시트가 아닌 부분을 클릭했을 때
   */
  var btnOk = document.getElementById(name + "_OkEditDialog");
  var btnCancel = document.getElementById(name + "_CancelEditDialog");
  var myArea = ConfigSheet.getElementsByClassName(dialogOpt.Tag, themePrefix + classDlg + "HeadText")[0];
  var self = this;
  myArea.onclick = function () {
    if (self.ARow == null) {
      ConfigSheet.blur();
    }
  }

  var myArea2 = ConfigSheet.getElementsByClassName(dialogOpt.Tag, themePrefix + classDlg + "Foot")[0]
  myArea2.onclick = function () {
    if (self.ARow == null) {
      ConfigSheet.blur();
    }
  }
  btnOk.onclick = function () {
    var rows = ConfigSheet.getDataRows();
    for(var r=0;r<rows.length;r++){
        self.setAttribute( {col:rows[r]["ColName"]  , attr:"Visible" ,val :rows[r]["Show"] , render: 0});
        self.setAttribute( {col:rows[r]["ColName"]  , attr:"Hidden" ,val :!(rows[r]["Show"]) , render: 0});
        if(rows[r]["Show"]){
          delete self.Cols[rows[r]["ColName"]]["UserHidden"];
        }else{
          self.Cols[rows[r]["ColName"]]["UserHidden"] = true;
        }
    }
    self.saveCurrentInfo (); //현재상태 저장
    self.rerender(); //화면 렌더링

    ConfigSheet.dispose();
    self.closeDialog();
    // 버튼을 닫을때 스타일을 제거한다.
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
      delete self._stylesConfigDialog;
    }
  }
  btnCancel.onclick = function () {
    ConfigSheet.dispose();
    self.closeDialog();
    // 버튼을 닫을때 스타일을 제거한다.
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
      delete self._stylesConfigDialog;
    }
  }
  /* step 7 end */
}
// makeEditSheetOpt로 편집 다이얼로그 내에서 띄워질 시트에 대한 기본 옵션을 설정
Fn.makeEditSheetOpt = function (row, headerIndex) {
  var cols;

  if (Array.prototype.filter) {
    cols = this.getCols().filter(function (col) {
      return col != "SEQ";
    });
  } else {
    cols = [];
    var arr = this.getCols()
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== "SEQ") cols.push(arr[i]);
    }
  }

  // 편집 다이얼로그 옵션
  var option = new Object();
  option.Cfg = {
    "CustomScroll": this.CustomScroll,
    "UsePivot": false,
    "DialogSheet": true,
    "InfoRowConfig": {
      "Visible": false
    }
  };

  option.Cols = [{
    "Type": "Text",
    "Name": "Explain",
    "Color": "#EEEEEE",
    "Align": "Center",
    "CanFocus": 0,
    "RelWidth": 1,
    "CanSort": 0,
    "TextStyle": 1
  }, {
    "Type": "Text",
    "Name": "Target",
    "EditFormat": "",
    "RelWidth": 1,
    "CanSort": 0
  }];
  option.Header = {
    "Visible": false
  };

  var header = [];
  if (headerIndex != null && typeof headerIndex === 'number' && headerIndex >= 0) {
    header = this.getHeaderRows();
    if (header.length < headerIndex) headerIndex = header.length - 1;
  } else {
    var headerRows = this.getHeaderRows();
    for (var j = 0; j < cols.length; j++) {
      var headerString = "";
      for (var i = 0; i < headerRows.length; i++) {
        if (headerRows[i][cols[j]] != null && headerRows[i][cols[j]] !== "" && headerRows[i][cols[j] + "RowSpan"] !== 0) {
          headerString += headerRows[i][cols[j]] + "/";
        }
      }
      if (headerString.substr(headerString.length - 1, headerString.length) === "/") {
        headerString = headerString.substr(0, headerString.length - 1);
      }
      header.push(headerString);
    }
  }

  option.Body = [];

  // 편집 다이얼로그의 셀에 설정될 옵션들(기존 컬럼에서 가지고옴).
  var checkPoint = ["CanEdit", "Enum", "EnumKeys", "Type", "EditFormat", "DateFormat", "DataFormat", "Format", "CustomFormat", "Align"];
  var Body = [];
  for (var i = 0; i < cols.length; i++) {

    var obj = {};
    obj["Explain"] = headerIndex != null ? header[headerIndex][cols[i]] : header[i];

    for (var key = 0; key < checkPoint.length; key++) {
      var getAttr = this.getAttribute(row, cols[i], checkPoint[key]);
      if (getAttr != null) {
        obj["Target" + checkPoint[key]] = getAttr;
      }
    }

    // Formula가 설정된 컬럼은 제외
    if (this.getAttribute(row, cols[i], "Formula")) {
      // continue;
      obj["TargetCanEdit"] = 0;
    }

    if (this.getType(row, cols[i]) == "Lines") {
      obj["Target" + "AcceptEnters"] = 2;
      if (this.getRowHeight(row) == this.RowHeight) obj["Height"] = this.RowHeight * 2;
    }
    // 관계형 Enum 대응
    if (this.getType(row, cols[i]) == "Enum") {
      if (this.getAttribute(row, cols[i], "Related")) {
        var v = row[cols[i]];
        var keyArr = Object.keys(this.Cols[cols[i]]);
        for (var x = 0; x < keyArr.length; x++) {
          if (keyArr[x] != "EnumKeys" && keyArr[x].indexOf("EnumKeys") > -1) {
            var emkey = this.Cols[cols[i]][keyArr[x]]
            var emkeyArr = emkey.split(emkey.substring(0, 1));
            if (emkeyArr.indexOf(v) > -1) {
              obj["TargetEnum"] = this.Cols[cols[i]]["Enum" + keyArr[x].substring(8)];
              obj["TargetEnumKeys"] = emkey;
              obj["TargetCanEdit"] = 0;
            }
          }
        }
      }
    }

    obj["ColName"] = cols[i];
    obj["Target"] = row[cols[i]];
    Body.push(obj);
  }
  option.Body.push(Body);

  return option;
};

/*
  편집(상세보기) 다이얼로그
  showEditDialog 호출 시 편집 다이얼로그를 생성 후 화면에 띄운다.
*/
Fn.showEditDialog = function (row, width, height, headerIndex, name) {
  if (!row) return false;

  /* step 1 start
   * 현재 시트가 사용 불가능이거나 편집종료되지 못하는 경우 띄우지 않는다.
   */
  if (this.endEdit(true) == -1) return;
  /* step 1 end */

  // 스타일이 중복 되었을때 스타일을 제거한다.
  if (this._stylesEditDialog && this._stylesEditDialog.parentNode) {
    this._stylesEditDialog.parentNode.removeChild(this._stylesEditDialog);
    delete this._stylesEditDialog;
  }

  var classDlg = "EditPopup";
  var themePrefix = this.Style;

  if (typeof row == "object") {
    var editTemp = row;
    if (editTemp.row != null) row = editTemp.row;
    if (editTemp.width != null) width = editTemp.width;
    if (editTemp.height != null) height = editTemp.height;
    if (editTemp.headerIndex != null) headerIndex = editTemp.headerIndex;
    if (editTemp.name != null) name = editTemp.name;
  }

  width = typeof width == "number" ? width : 500;
  height = typeof height == "number" ? height : 500;
  name = typeof name == "string" ? name : ("editSheet_" + this.id);

  var styles = document.createElement("style");
  styles.innerHTML = '.' + themePrefix + classDlg + 'Outer {' +
    '  padding: 10px 50px ;' +
    '  border: 3px solid #37acff;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Close {' +
    '  background-color: #000;' +
    '  width: 17px;' +
    '  height: 17px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Head, .' + themePrefix + classDlg + 'Foot {' +
    '  background-color:white;' +
    '  border-top:0px' +
    '} ' +
    '.' + themePrefix + classDlg + 'Head .' + themePrefix + classDlg + 'HeadText >div:last-child {' +
    '  text-align: center;' +
    '  color: #000;' +
    '  font-size: 25px;' +
    '  margin-bottom: 5px;' +
    '  font-weight: 600;' +
    '  height:35px;' +
    '  line-height: normal;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Btns {' +
    '  text-align:center;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Btns > button {' +
    '  color: #fff;' +
    '  font-family: "NotoSans_Medium";' +
    '  font-size: 18px;' +
    '  display: inline-block;' +
    '  text-align: center;' +
    '  vertical-align: middle;' +
    '  border-radius: 3px;' +
    '  background-color: #37acff;' +
    '  border: 1px solid #37acff;' +
    '  padding: 5px 10px;' +
    '  margin-left: 5px;' +
    '  cursor: pointer;' +
    '}';

  document.body.appendChild(styles);

  this._stylesEditDialog = styles;

  /* step 2 start
   * 임시로 상세보기 시트가 들어갈 div 생성(생성된 다이얼로그로 아래에서 옮김).
   */
  var tmpSheetTag = document.createElement("div");
  tmpSheetTag.className = "SheetTmpTag";
  tmpSheetTag.style.width = "300px";
  tmpSheetTag.style.height = "100px";
  document.body.appendChild(tmpSheetTag);
  /* step 2 end */

  /* step 3 start
   * 띄워져있는 다이얼로그나 팁을 제거.
   */
  this.closeDialog();
  this.hideTip();
  /* step 3 end */

  /* step 4 start
   * 상세보기 시트에 대한 옵션 설정(상세보기 시트를 띄운 시트의 옵션을 따라간다.) 및 상세보기 시트 생성
   */
  var opts = this.makeEditSheetOpt(row, headerIndex);
  var EditSheet = _IBSheet.create(name, tmpSheetTag, opts);
  /* step 4 end */

  /* step 5 start
   * 상세보기 시트가 띄워질 다이얼로그 창에 대한 설정 및 다이얼로그 생성
   */
  var dialogOpt = {},
    pos = {};
  this.initPopupDialog(dialogOpt, pos, EditSheet, {
    cssClass: classDlg
  });

  dialogOpt.Head = "<div>편집 다이얼로그</div>";
  dialogOpt.Foot = "<div class='" + themePrefix + classDlg + "Btns'>" +
    "  <button id='" + name + "_OkEditDialog'>확인</button>" +
    "  <button id='" + name + "_CancelEditDialog'>취소</button>" +
    "</div>";
  dialogOpt.Body = "<div id='" + name + "_EditDialogBody' style='width:" + width + "px;height:" + height + "px;overflow:hidden;'></div>"
  dialogOpt = _IBSheet.showDialog(dialogOpt, pos, this);
  /* step 5 end */

  /* step 6 start
   * 다이얼로그 창의 Body에 상세보기 시트를 옮김 */
  var EditDlgBody = document.getElementById(name + "_EditDialogBody");
  EditDlgBody.innerHTML = "";
  for (var elem = tmpSheetTag.firstChild; elem; elem = tmpSheetTag.firstChild) EditDlgBody.appendChild(elem);
  EditSheet.MainTag = EditDlgBody;
  tmpSheetTag.parentNode.removeChild(tmpSheetTag);
  /* step 6 end */

  /* step 7 start
   * 버튼 클릭시 및 다이얼로그의 시트가 아닌 부분을 클릭했을 때
   */
  var btnOk = document.getElementById(name + "_OkEditDialog");
  var btnCancel = document.getElementById(name + "_CancelEditDialog");
  var myArea = EditSheet.getElementsByClassName(dialogOpt.Tag, themePrefix + classDlg + "HeadText")[0];
  var self = this;
  myArea.onclick = function () {
    if (self.ARow == null) {
      EditSheet.blur();
    }
  }

  var myArea2 = EditSheet.getElementsByClassName(dialogOpt.Tag, themePrefix + classDlg + "Foot")[0]
  myArea2.onclick = function () {
    if (self.ARow == null) {
      EditSheet.blur();
    }
  }
  btnOk.onclick = function () {
    EditSheet.endEdit(1);
    var prow = EditSheet.getFirstRow();
    while (prow) {
      self.setValue(row, prow["ColName"], prow["Target"], 1);
      prow = EditSheet.getNextRow(prow);
    }

    EditSheet.dispose();
    self.closeDialog();
    // 버튼을 닫을때 스타일을 제거한다.
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
      delete self._stylesEditDialog;
    }
  }
  btnCancel.onclick = function () {
    EditSheet.dispose();
    self.closeDialog();
    // 버튼을 닫을때 스타일을 제거한다.
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
      delete self._stylesEditDialog;
    }
  }
  /* step 7 end */

  _IBSheet.Focused = EditSheet;
};

// 멀티레코드 코드 정리해주는 코드
Fn.collectColsByMultiRecord = function (cols) {
    var tempCols = [];
    for (var i = 0; i < cols.length; i++) {
        for (var j = 0; j < cols[i].length; j++) {
            if (cols[i][j]) {
                if (typeof cols[i][j].Name == "undefined") continue;
                tempCols[tempCols.length] = cols[i][j];
            }
        }
    }
    return tempCols;
}
// getDataRows로 가져온 Row들에 대한 DeepCopy
Fn.deepCopyRows = function () {
    var dataRows = IBSheet.__.clone(this.getDataRows());
    var copyRows = [];

    for (var i = 0; i < dataRows.length; i++) {
        copyRows.push(IBSheet.__.clone(dataRows[i]));
    }

    return copyRows;
}
//다이얼로그에 올라갈 시트 생성(업로드시 데이터가 임시로 올라갈 곳)
Fn.initImportSheet = function (uploadType, width, height, name, colCount) {
  if(IBSheet[name]) IBSheet[name].dispose();

  var tmpSheetDiv = document.createElement("div");
  tmpSheetDiv.id = "tmpSheetid";
  tmpSheetDiv.style.width = "100%";
  tmpSheetDiv.style.height = "100%";
  tmpSheetDiv.style.position = "absolute";
  tmpSheetDiv.style.top = "-10000px";
  tmpSheetDiv.style.zIndex = "-9999";
  document.body.appendChild(tmpSheetDiv);

  var sheetOpts = this.getUserOptions(1);
  var sheetHeaderRows = this.getHeaderRows();
  var headerValue = "";
  var headerEnumString = "";
  var colsEnum = {};
  var seqHeader = [];
  var leftChk = [];
  var colsEnumKeys = "";
  var columnMapping = [];
  sheetOpts.Def = {};
  sheetOpts.Def.Row = {};
  var calcName = "";
  var seqIndex = -1;
  var sheetColslength = 0;

  // 시트의 이벤트를 그대로 가져오므로, 이벤트를 삭제 합니다.
  delete sheetOpts.Events;

  if (sheetOpts.Cfg["HeaderCheck"] > 0) {
    delete sheetOpts.Cfg.HeaderCheck;
  }

  if (sheetOpts.LeftCols && sheetOpts.LeftCols instanceof Array) {
    sheetOpts.Cols = sheetOpts.LeftCols.concat(sheetOpts.Cols);
    delete sheetOpts.LeftCols;
  }

  if (sheetOpts.RightCols && sheetOpts.RightCols instanceof Array) {
    sheetOpts.Cols = sheetOpts.Cols.concat(sheetOpts.RightCols);
    delete sheetOpts.RigthCols;
  }

  if (this.MultiRecord) {
    delete sheetOpts.Cfg.MultiRecord;
    sheetOpts.Cols = this.collectColsByMultiRecord(sheetOpts.Cols);
  }

  sheetColslength = sheetOpts.Cols.length + colCount;

  for (var i = 0; i < sheetColslength; i++) {

    if (sheetOpts.Cols[i]) {
      sheetOpts.Cols[i].Visible = !sheetOpts.Cols[i].Visible ? (sheetOpts.Cols[i].Visible == null ? 1 : 0) : 1;

      sheetOpts.Cols[i] = IBSheet.__.extend(sheetOpts.Cols[i], {
        Header: {Value : sheetOpts.Cols[i].Name},
        Name: "EXTRACOL" + i,
        Visible: sheetOpts.Cols[i].Visible
      });

      if (sheetOpts.Cols[i].RecordRowSpan) {
        delete sheetOpts.Cols[i].RecordRowSpan;
      }

      if (sheetOpts.Cols[i].RecordColSpan) {
        delete sheetOpts.Cols[i].RecordColSpan;
      }

      if (sheetOpts.Cols[i].RecordHColSpan) {
        delete sheetOpts.Cols[i].RecordHColSpan;
      }

      if (sheetOpts.Cols[i].RecordHColTitle) {
        delete sheetOpts.Cols[i].RecordHColTitle;
      }
    }

    if (!sheetOpts.Cols[i]) {
      sheetOpts.Cols[i] = {
        Type: "Text",
        Name: "EXTRACOL" + i
      }
    }

    if (sheetOpts.Cols[i].Visible) {
      for (var j = 0; j < sheetHeaderRows.length; j++) {
        headerEnumString = headerEnumString.concat((j > 0 ? "/" : "") + (sheetOpts.Cols[i].Required == 1 ? (sheetHeaderRows[j][sheetOpts.Cols[i].Header.Value] + "(필수)") : sheetHeaderRows[j][sheetOpts.Cols[i].Header.Value]));
      }
      headerValue = headerValue.concat("|" + headerEnumString);
      headerEnumString = "";
      colsEnumKeys = colsEnumKeys.concat("|",sheetOpts.Cols[i].Header.Value);
      sheetOpts.Cols[i].Align = "Center";
      sheetOpts.Cols[i].Width = 150;
      delete sheetOpts.Cols[i].DefaultValue;
      delete sheetOpts.Cols[i].RelWidth;
      delete sheetOpts.Cols[i].MinWidth;
      delete sheetOpts.Cols[i].MaxWidth;
      delete sheetOpts.Cols[i].EditEnum;
      delete sheetOpts.Cols[i].Range;
      delete sheetOpts.Cols[i].Button;
      delete sheetOpts.Cols[i].Icon;
      sheetOpts.Cols[i].CanEdit = true;
      sheetOpts.Cols[i].CanFocus = true;
    }
    calcName = calcName.concat(",",sheetOpts.Cols[i].Name + "Color");

    columnMapping.push(i+1);

  }

  sheetOpts.Def.Row = {CanFormula:1, CalcOrder: calcName};

  for (var i = 0; i < sheetOpts.Cols.length; i++) {
    if (sheetOpts.Cols[i] && (typeof sheetOpts.Cols[i].Name == "undefined" || sheetOpts.Cols[i].Name == "" || sheetOpts.Cols[i].Name == null)) {
      if (sheetOpts.Cols[i].Header instanceof Array && sheetOpts.Cols[i].Header.length > 1) {
        for (var j = 1; j < sheetOpts.Cols[i].Header.length; j++) {
          sheetOpts.Cols[i].Header.splice(1, j);
        }
      }
      seqIndex = i;
      continue;
    }

    if (sheetOpts.Cols[i].Required) {
      sheetOpts.Cols[i].RequiredField = 1;
      delete sheetOpts.Cols[i].Required;
    }

    sheetOpts.Cols[i].ColorFormula = function(fr) {
      var colorError = "#FFFF00";
      if (fr.Sheet.Sheet.Cols[fr.HeadRow[fr.Col]]) {
        var isRequired = fr.Sheet.Sheet.Cols[fr.HeadRow[fr.Col]].Required;
        var type = fr.Sheet.Sheet.Cols[fr.HeadRow[fr.Col]].Type;
        var valueTrue = fr.Sheet.Sheet.Cols[fr.HeadRow[fr.Col]].TrueValue || 1;
        var valueFalse = fr.Sheet.Sheet.Cols[fr.HeadRow[fr.Col]].FalseValue || 0;
      }
      var enumValue = new Array();

      if (type === "Int") {
        if (isRequired) {
          if (fr.Value == null || (_IBSheet.__.isString(fr.Value) && fr.Value == "")) {
            return colorError;
          } else {
            return _IBSheet.__.isNumeric(fr.Value) ?  "" : colorError;
          }
        } else {
          return _IBSheet.__.isNumeric(fr.Value) ?  "" : colorError;
        }
      }

      if (type === "Bool") {
        if (isRequired) {
          if (fr.Value == null || (_IBSheet.__.isString(fr.Value) && fr.Value == "")) {
            return colorError;
          }
        } else {
          return (fr.Value == valueTrue || fr.Value == valueFalse) ? "" : colorError;
        }
      }

      if (type === "Text") {
        if (isRequired) {
          if (fr.Value == null || (_IBSheet.__.isString(fr.Value) && fr.Value == "")) {
            return colorError;
          }
        }
      }

      if (type === "Enum") {
        enumValue = fr.Sheet.Sheet.Cols[fr.HeadRow[fr.Col]].Enum.split("|");
        if (isRequired) {
          if (fr.Value == null || (_IBSheet.__.isString(fr.Value) && fr.Value == "")) {
            for (var i = 1; i < enumValue.length; i++) {
              if (fr.Value === enumValue[i]) {
                return;
              }
            }
            return colorError;
          }
        } else {
          for (var i = 1; i < enumValue.length; i++) {
            if (fr.Value === enumValue[i]) {
              return;
            }
          }
          return colorError;
        }
      }

      if (type === "Date") {
        var maskedDate = _IBSheet.stringToDate("" + fr.Value, fr.Sheet.Sheet.Cols[fr.HeadRow[fr.Col]].DataFormat);
        if (isRequired) {
          if (fr.Value == null || (_IBSheet.__.isString(fr.Value) && fr.Value == "")) {
            return colorError;
          }
        }
        else{
          return _IBSheet.__.isDate(maskedDate) ? "" : colorError;
        }
      }
    }

    colsEnum[sheetOpts.Cols[i].Name] = {
      "Type": "Enum",
      "Enum": "|"+headerValue,
      "CanEdit": 1,
      "Value": (!sheetOpts.Cols[i].Header ? "": sheetOpts.Cols[i].Header.Value),
      "EnumKeys": "|"+colsEnumKeys
    }
    sheetOpts.Cols[i].Header = (function (arr, idx) {
      arr.push({
        Value: "컬럼" + idx
      });
      return arr;
    })([], i);

    if (i == seqIndex + 1  && (uploadType === "txt" || uploadType === "csv")) {
      sheetOpts.Cols[i].RelWidth = 1;
    }

    if (i > seqIndex + 1 && (uploadType === "txt" || uploadType === "csv")) {
      sheetOpts.Cols[i].Visible = false;
    }
  }

  colsEnum.id = "HeadRow";
  colsEnum.Kind = "Head";

  sheetOpts.Head = [colsEnum];
  var cellHeader = this.getCell(this.Header, sheetOpts.Head[0][sheetOpts.Cols[1].Name].Value);

  if (cellHeader) {
    var style = getComputedStyle(cellHeader);
    sheetOpts.Head[0].Color = style.backgroundColor;
    sheetOpts.Head[0].TextColor = style.color;
  }

  sheetOpts.Head[0].SEQ = {
    Type: "Text",
    CanEdit: false,
    CanFocus: false,
    Color: sheetOpts.Head[0].Color,
    TextColor: sheetOpts.Head[0].TextColor,
    Visible: false
  }

  sheetOpts.Head[0].chkBool = {
    Type: "Text",
    CanEdit: false,
    CanFocus: false
  }

  seqHeader[0] = {
    Value: "No"
  }
  leftChk[0] = {
    Value: "체크",
    HeaderCheck: 1
  }

  // 다이얼로그 전용 컬럼.
  sheetOpts.LeftCols = [
  {
    Header: seqHeader,
    Name: "SEQ",
    Visible: 1
  },
  {
    Header: leftChk,
    Type: "Bool",
    Name: "chkBool",
    Visible: 1,
    CanEmpty: 3,
    CanEdit: 1,
    ColMerge: 0,
    Align: "Center",
    VAlign: "Middle"
  }];

  sheetOpts.Cfg.FitWidth = 0;

  var opts = {
    Def: sheetOpts.Def,
    Cfg: sheetOpts.Cfg,
    Cols: sheetOpts.Cols,
    LeftCols: uploadType === "excel" ? sheetOpts.LeftCols : [],
    RightCols: (uploadType === "txt" || uploadType === "csv") ? [sheetOpts.LeftCols[1]] : [],
    Head: sheetOpts.Head,
    Events: {
      onRenderFirstFinish: function (evtParams) {
        var sheetCols = evtParams.sheet.getCols();
        var colsMap = "";
        for (var i = columnMapping.length; i < sheetCols.length; i++) {
          colsMap += "|";
        }
        colsMap += columnMapping.join("|");

        if (uploadType === "excel") {
          evtParams.sheet.loadExcel({mode: "NoHeader", columnMapping: colsMap});
        }
        else if (uploadType === "txt" || uploadType === "csv") {
          evtParams.sheet.loadText({mode: "NoHeader", colSeparator: " !  @  ", fileExt: uploadType === "csv" ? "csv" : ""});
        }
      },
      onImportFinish: function (evtParams) {
        var sheetCols = evtParams.sheet.getCols();
        var dataLength = Object.keys(evtParams.data[0]).length;
        if (uploadType === "excel") {
          for (var i = dataLength; i < sheetOpts.Cols.length; i++) {
            if (!evtParams.data[0][sheetOpts.Cols[i].Name]) {
              evtParams.sheet.hideCol("EXTRACOL"+i);
            }
          }
        }

        evtParams.sheet.Sheet.makeUploadDialog(width, height, name, evtParams.sheet, calcName, uploadType, sheetHeaderRows);

        for (var i = 0; i < sheetCols.length; i++) {
          if (sheetCols[i] == "chkBool") continue;
          evtParams.sheet.Cols[sheetCols[i]].MasterType = evtParams.sheet.Cols[sheetCols[i]].Type || "Text";
          evtParams.sheet.Cols[sheetCols[i]].Type = "Text";
          evtParams.sheet.Cols[sheetCols[i]].Format = "";
          evtParams.sheet.Cols[sheetCols[i]].DataFormat = "";
          evtParams.sheet.Cols[sheetCols[i]].EditFormat = "";
        }

        if (uploadType === "txt" || uploadType === "csv") {
          var headerRows = evtParams.sheet.getHeaderRows();
          var selectOptsValue = document.getElementById(name + "_UploadTextSep").value;
          var startCol = sheetCols.indexOf("SEQ") == 0 ? 1 : 0;
          if (evtParams.data.length && evtParams.data[0][sheetCols[startCol]].indexOf(selectOptsValue) > -1) {
            var tmpRow = {};
            if (!evtParams.sheet.OrgLoadTextDataValue) evtParams.sheet.OrgLoadTextDataValue = [];
            for (var i = 0; i < evtParams.data.length; i++) {
              tmpRow = {};
              var sepContents = evtParams.sheet.OrgLoadTextDataValue[i] ? evtParams.sheet.OrgLoadTextDataValue[i].split(selectOptsValue) : (evtParams.data[i][sheetCols[startCol]] && evtParams.data[i][sheetCols[startCol]].split(selectOptsValue));
              if (!evtParams.sheet.OrgLoadTextDataValue[i]) evtParams.sheet.OrgLoadTextDataValue[i] = evtParams.data[i][sheetCols[startCol]];
              for (var j = startCol; j < sheetCols.length; j++) {
                if (j != startCol) evtParams.sheet.showCol(sheetCols[j]);
                else {
                  evtParams.sheet.Cols[sheetCols[j]].Width = 150;
                  evtParams.sheet.Cols[sheetCols[j]].RelWidth = 0;
                }
                tmpRow[sheetCols[j]] = sepContents[j-1];
              }
              evtParams.data[i] = tmpRow;
            }
          }
          headerRows[0].SEQ = "No";
          headerRows[0].SEQAlign = "Center";
          evtParams.sheet.showCol("SEQ");
          evtParams.sheet.moveCol("chkBool", "SEQ", 1, 1);
          for (var i = 0; i < sheetOpts.Cols.length; i++) {
            if (evtParams.data[0][sheetOpts.Cols[i].Name] == null) {
              evtParams.sheet.hideCol("EXTRACOL"+i);
            }
          }
        }

        if (evtParams.data && evtParams.data.length) {
          for (var i = 0; i < evtParams.data.length; i++) {
            evtParams.data[i]["chkBool"] = (i < sheetHeaderRows.length) ? 0 : 1;
          }
        }
      },
      onBeforeChange: function (evtParams) {
        if (evtParams.row && evtParams.row.id === "HeadRow") {
          if (evtParams.val == evtParams.oldval) return evtParams.val;
          var sheetCols = evtParams.sheet.getCols();

          var listConvert = [
            {Name: "Size", OrgName: "Size"},
            {Name: "EditMask", OrgName: "EditMask"},
            {Name: "ResultMask", OrgName: "ResultMask"},
            {Name: "ResultText", OrgName: "ResultText"},
            {Name: "ResultMessage", OrgName: "ResultMessage"},
            {Name: "EmptyValue", OrgName: "EmptyValue"},
            {Name: "RequiredField", OrgName: "Required"}
          ];

          for (var i = 2; i < sheetCols.length; i++) {
            if (evtParams.val && evtParams.row[sheetCols[i]] == evtParams.val && sheetCols[i] != evtParams.col) {
              evtParams.row[sheetCols[i]] = evtParams.oldval;
            }
            if (evtParams.row[sheetCols[i]] == evtParams.oldval) {
              for (var j = 0; j < listConvert.length; j++) {
                evtParams.sheet.Cols[evtParams.col][listConvert[j]["Name"]] = !evtParams.val ? "" : evtParams.sheet.Sheet.Cols[evtParams.val][listConvert[j]["OrgName"]];
                if (evtParams.col !== sheetCols[i]) evtParams.sheet.Cols[sheetCols[i]][listConvert[j]["Name"]] = !evtParams.oldval ? "" : evtParams.sheet.Sheet.Cols[evtParams.oldval][listConvert[j]["OrgName"]];
              }
            }
          }
          evtParams.sheet.refreshRow(evtParams.row);
        }
      },
      onAfterChange: function (evtParams) {
        if (evtParams.row.id == "HeadRow") {
          evtParams.sheet.calculate(true);
        }
      },
      onBeforeDataLoad: function (evtParams) {
        if (evtParams.sheet.textSepApply && (uploadType === "txt" || uploadType === "csv")) {
          for (var i = 0; i < sheetOpts.Cols.length; i++) {
            if (evtParams.data[0][sheetOpts.Cols[i].Name] == null) {
              evtParams.sheet.hideCol("EXTRACOL"+i);
            }
          }
          delete evtParams.sheet.textSepApply;
        }
      }
    }
  };

  var UploadSheet = _IBSheet.create({
    id: name,
    el: "tmpSheetid",
    options: opts
  });
  UploadSheet.Sheet = this;
}
//업로드 다이얼로그 만들기
Fn.makeUploadDialog = function (width, height, name, uploadSheet, calcName, uploadType, sheetHeaderRows) {
  var classDlg = "ExcelUpLoadPopup";
  var themePrefix = this.Style;

  var styles = document.createElement("style");
  styles.innerHTML = '.' + themePrefix + classDlg + 'Outer {' +
    '  padding: 5px ;' +
    '  border: 3px solid #37acff;' +
    '  padding-left: 50px; padding-right: 50px' +
    '} ' +
    '.' + themePrefix + classDlg + 'Body .' + themePrefix + classDlg + 'Title {' +
    '  width:100%;height:30px;margin-bottom:2px;border-top:1px solid #C3C3C3;padding-top:10px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Body .' + themePrefix + classDlg + 'Title > div:last-child > div:first-child > label {' +
    '  text-align:left !important;font-size:16px;color:#444444;font-family:"NotoSans_Bold"; font-weight:600;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Body .' + themePrefix + classDlg + 'Foot {' +
    '  width:100%;' +
    '  margin-top:10px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Foot ul li {' +
    '  list-style-type : none;' +
    '  height : 32px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Foot label {' +
    '  color : #666666;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Close {' +
    '  background-color: black;' +
    '  width: 17px;' +
    '  height: 17px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Head, .' + themePrefix + classDlg + 'Foot {' +
    '  background-color:white;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Head .' + themePrefix + classDlg + 'HeadText >div:last-child {' +
    '  text-align: center;' +
    '  color: black;' +
    '  font-size: 25px;' +
    '  margin-bottom: 5px;' +
    '  font-weight: 600;' +
    '  height:35px;' +
    '  line-height: normal;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Btns {' +
    '  text-align:center;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Btns > button {' +
    '  color: #fff;' +
    '  font-family: "NotoSans_Medium";' +
    '  font-size: 18px;' +
    '  display: inline-block;' +
    '  text-align: center;' +
    '  vertical-align: middle;' +
    '  border-radius: 3px;' +
    '  background-color: #37acff;' +
    '  border: 1px solid #37acff;' +
    '  padding: 5px;' +
    '  margin-left: 2px;' +
    '  cursor: pointer;' +
    '}' +
    '.' + name + '_Btn {' +
    '   background-color: white;' +
    '   border: 1px solid gray;' +
    '   cursor: pointer;' +
    '   text-align: center;' +
    '   margin-right: 5px;'
    '}';

  document.body.appendChild(styles);

  var dialogOpt = {},
  pos = {};
  this.initPopupDialog(dialogOpt, pos, uploadSheet, {
    cssClass: classDlg
  });

  dialogOpt.Head = "<div>파일 업로드</div>";
  dialogOpt.Foot = "<div class='" + themePrefix + classDlg + "Btns'>" +
    "  <button id='" + name + "_ExcuteExcelUpLoad'>확인</button>" +
    "  <button id='" + name + "_CancelExcelUpLoad'>취소</button>" +
    "</div>";

  if (uploadType === "excel") {
    dialogOpt.Body = "<div class='" + themePrefix + classDlg + "Title' ><div></div>" +
    "  <div>" +
    "    <div style='float:left;'><label >데이터 미리보기</label></div>" +
    "    <div style='float:right;'><button type='button' id='add_Btn' class='" + name + "_Btn'>행추가</button><button type='button' id='delete_Btn' class='"+name+"_Btn'>행삭제</button><button type='button' id='rule_Btn' class='"+name+"_Btn'>설명보기</button></div>" +
    "  </div>" +
    "</div>" +
    "<div style='width:" + width + "px;display: none;' id='" + name + "dialogRule'>" +
    "   <p>오류건에는 노란색 배경이 입혀집니다. 오류건이 있으면 데이터 로드가 되지 않으므로 삭제하거나 수정 후 사용하시기 바랍니다.</p>"+
    "   <p>업로드 다이얼로그는 mode가 NoHeader로 지정되어있고 헤더행이 없다고 가정하고 첫행부터 순서대로 각 열에 대입합니다.</p>"+
    "   <p>Type이 Int인 경우 숫자 입력이 가능합니다.</p>" +
    "   <p>Type이 Enum인 경우 Enum에 입력한 데이터만 입력이 가능합니다.</p>" +
    "   <p>Type이 Bool인 경우 기본적으로 0과 1만을 사용하고 TrueValue, FalseValue를 사용하여 해당 값들을 변경할 수 있습니다.</p>" +
    "</div>" +
    "<div id='" + name + "_ExcelUpLoadPopupBody' style='width:" + width + "px;height:" + height + "px;overflow:hidden;'></div>";
  }

  if (uploadType === "txt" || uploadType === "csv") {
    dialogOpt.Body = "<div class='" + themePrefix + classDlg + "Title' ><div></div>" +
    "  <div>" +
    "    <div style='float:left;'><label >데이터 미리보기</label></div>" +
    "    <div style='float:right;'><button type='button' id='add_Btn' class='" + name + "_Btn'>행추가</button><button type='button' id='delete_Btn' class='"+name+"_Btn'>행삭제</button><button type='button' id='rule_Btn' class='"+name+"_Btn'>설명보기</button></div>" +
    "  </div>" +
    "</div>" +
    "<div style='width:" + width + "px;display: none;' id='" + name + "dialogRule'>" +
    "   <p>오류건에는 노란색 배경이 입혀집니다. 오류건이 있으면 데이터 로드가 되지 않으므로 삭제하거나 수정 후 사용하시기 바랍니다.</p>" +
    "   <p>업로드 다이얼로그는 mode가 NoHeader로 지정되어있고 헤더행이 없다고 가정하고 첫행부터 순서대로 각 열에 대입합니다.</p>"+
    "   <p>Type이 Int인 경우 숫자 입력이 가능합니다.</p>" +
    "   <p>Type이 Enum인 경우 Enum에 입력한 데이터만 입력이 가능합니다.</p>" +
    "   <p>Type이 Bool인 경우 기본적으로 0과 1만을 사용하고 TrueValue, FalseValue를 사용하여 해당 값들을 변경할 수 있습니다.</p>" +
    "   <p>구분자 설정 적용시 다른 구분자로 적용할 경우 시트의 데이터가 올바르게 나오지 않습니다. 입력된 구분자로 적용 하시면 데이터가 올바르게 적용되는 것을 확인 할 수 있습니다.</p>" +
    "</div>" +
    "<div id='" + name + "_ExcelUpLoadPopupBody' style='width:" + width + "px;height:" + height + "px;overflow:hidden;'></div>" +
    "<div class='" + themePrefix + classDlg + "Foot'>" +
    "  <div>" +
    "    <ul class=''>" +
    "      <li>" +
    "          <label for='" + name + "_UploadTextSep' style='font-size:15px;font-weight:bold;'>구분자 설정</label>" +
    "          <select id='" + name + "_UploadTextSep' style='margin-left: 3px;font-size:15px;height:25px;'>" +
    "            <option value=','>,</option>" +
    "            <option value='\\t' selected>Tab</option>" +
    "            <option value='|'>|</option>" +
    "            <option value='.'>.</option>" +
    "            <option value=' '>Space</option>" +
    "          </select>" +
    "          <span style ='float:right;padding-right:109px;'><button id='textSepApply'>적용</button></span>" +
    "      </li>" +
    "    </ul>" +
    "  </div>" +
    "</div>";
  }
  dialogOpt = _IBSheet.showDialog(dialogOpt, pos, this);

  var self = this;
  var excelUpLoadBody = document.getElementById(name + "_ExcelUpLoadPopupBody");
  uploadSheet.MainTag = excelUpLoadBody;

  if (document.getElementById("textSepApply")) {
    var textSepApply = document.getElementById("textSepApply");
    textSepApply.onclick = function () {
      var selectOptsValue = document.getElementById(name + "_UploadTextSep").value;
      var dataRows = uploadSheet.getDataRows();
      var cols = self.getCols();
      var sheetCols = uploadSheet.getCols();
      var data = [];
      var tmpRow = {};
      var startCol = cols.indexOf("SEQ") === 0 ? 1 : 0;

      if (!uploadSheet.OrgLoadTextDataValue) uploadSheet.OrgLoadTextDataValue = [];
      for (var i = 0; i < dataRows.length; i++) {
        tmpRow = {};
        var sepContents = uploadSheet.OrgLoadTextDataValue[i] ? uploadSheet.OrgLoadTextDataValue[i].split(selectOptsValue) : (dataRows[i][sheetCols[startCol+1]] && dataRows[i][sheetCols[startCol+1]].split(selectOptsValue));
        if (!uploadSheet.OrgLoadTextDataValue[i]) uploadSheet.OrgLoadTextDataValue[i] = dataRows[i][sheetCols[startCol+1]];
        for (var j = startCol+1; j < sheetCols.length; j++) {
          if (j != startCol+1) uploadSheet.showCol(sheetCols[j]);
          else {
            uploadSheet.Cols[sheetCols[j]].Width = 150;
            uploadSheet.Cols[sheetCols[j]].RelWidth = 0;
          }
          tmpRow[sheetCols[j]] = sepContents[j-1];
        }
        data.push(tmpRow);
      }
      if (data && data.length) {
        for (var i = 0; i < data.length; i++) {
          data[i]["chkBool"] = (i < sheetHeaderRows.length) ? 0 : 1
        }
      }
      uploadSheet.textSepApply = true;
      uploadSheet.loadSearchData({data: data});
    }
  }

  var btnUpload = document.getElementById(name + "_ExcuteExcelUpLoad");
  btnUpload.onclick = function () {
    var chkRows = uploadSheet.getRowsByChecked("chkBool");
    if (chkRows && chkRows.length === 0) {
      uploadSheet.showMessageTime("로드할 행을 선택해주세요.");
      return uploadSheet.selectCol("chkBool", 1);
    }

    var data = {data:[]};
    var hr = uploadSheet.Rows.HeadRow;
    var cols = uploadSheet.getCols("Visible");
    for (var i = 0; i < chkRows.length; i++) {
      for (var j = 0; j < cols.length; j++) {
        if (!data.data[i]) data.data[i] = {};
        if (cols[j] != "SEQ" && cols[j] != "chkBool" && chkRows[i][cols[j]] != null) {
          if (!hr[cols[j]]) data.data[i][hr[cols[j]]] = "";
          else data.data[i][hr[cols[j]]] = "" + chkRows[i][cols[j]];
        } else {
          data.data[i][hr[cols[j]]] = "";
        }
        if (chkRows[i][cols[j] + "Color"] === "#FFFF00") {
          uploadSheet.showMessageTime("현재 오류건(노란색)이 있습니다. 노란색으로 표시된 부분을 확인 후 삭제 및 수정하시거나 파일을 다시 수정 후 등록하시기 바랍니다.");
          return uploadSheet.startEdit(chkRows[i], cols[j]);
        }
      }
    }

    self.loadSearchData(data);
    uploadSheet.dispose();
    self.closeDialog();
  }

  var btnCancel = document.getElementById(name + "_CancelExcelUpLoad");
  btnCancel.onclick = function () {
    uploadSheet.dispose();
    self.closeDialog();
  }

  var btnAdd = document.getElementById("add_Btn");
  btnAdd.onclick = function () {
    uploadSheet.addRow({"init" : {"chkBool" : 0}});
  }

  var btnDelete = document.getElementById("delete_Btn");
  btnDelete.onclick = function () {
    var chkRows = uploadSheet.getRowsByChecked("chkBool");
    if (chkRows.length == 0) {
      uploadSheet.showMessageTime("삭제할 행을 선택해주세요");
    }
    else{
      for (var i = 0; i < chkRows.length; i++) {
        uploadSheet.removeRow({row: chkRows[i]});
      }
    }
  }

  var btnRule = document.getElementById("rule_Btn");
  btnRule.onclick = function () {
    var dialogRule = document.getElementById(name + "dialogRule");
    if (dialogRule.style.display === "none") {
      dialogRule.style.display = "block";
    } else {
      dialogRule.style.display = "none";
    }
  }
}
/*
  엑셀 다운로드 다이얼로그
  showExcelDownloadDialog 호출 시 엑셀 다운로드 다이얼로그를 생성 후 화면에 띄운다.
  다운로드 다이얼로그 인자 추가 - downParams
*/
Fn.showExcelDownloadDialog = function (width, height, name, rowchk, title, downParams) {
  /* step 1 start
   * 현재 시트가 사용 불가능이거나 편집종료되지 못하는 경우 띄우지 않는다.
   */
  if (this.endEdit(true) == -1) return;
  /* step 1 end */

  // 스타일이 중복 되었을때 스타일을 제거한다.
  if (this._stylesExcelDownloadDialog && this._stylesExcelDownloadDialog.parentNode) {
    this._stylesExcelDownloadDialog.parentNode.removeChild(this._stylesExcelDownloadDialog);
    delete this._stylesExcelDownloadDialog;
  }

  var classDlg = "ExcelDownLoadPopup";
  var themePrefix = this.Style;

  if (typeof width == "object") {
    var downTemp = width;
    if (downTemp.width != null) width = downTemp.width;
    if (downTemp.height != null) height = downTemp.height;
    if (downTemp.name != null) name = downTemp.name;
    if (downTemp.rowchk != null) rowchk = downTemp.rowchk;
    if (downTemp.title != null) title = downTemp.title;
    if (downTemp.titleText != null) titleText = downTemp.titleText;
    if (downTemp.userMerge != null) userMerge = downTemp.userMerge;
    if (downTemp.downParams != null) downParams = downTemp.downParams;
  }

  width = typeof width == "number" ? width : 700;
  height = typeof height == "number" ? height : 400;
  name = typeof name == "string" ? name : ("excelDownloadSheet_" + this.id);
  rowchk = typeof rowchk == "number" ? rowchk : 1;
  title = typeof title == "string" ? title : "파일 다운로드";
  // downParma.fileName 인자가 있을 때 다이얼로그에 보여지는 fileName 처리
  if(downParams && downParams.fileName) {
    var fileName = downParams.fileName;
  } else {
    var fileName = _IBSheet.dateToString(new Date(), "yyyy-MM-dd HH:mm") + "_" + (this.Name ? this.Name : this.id);
  }

  var styles = document.createElement("style");
  styles.innerHTML = '.' + themePrefix + classDlg + 'Outer {' +
    '  padding: 5px ;' +
    '  border: 3px solid #37acff;' +
    '  padding-left: 50px; padding-right: 50px' +
    '} ' +
    '.' + themePrefix + classDlg + 'Body .' + themePrefix + classDlg + 'Title {' +
    '  width:100%;height:30px;margin-bottom:2px;border-top:1px solid #C3C3C3;padding-top:10px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Body .' + themePrefix + classDlg + 'Title > div:last-child > div {' +
    '  float:left!important;width:50%;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Body .' + themePrefix + classDlg + 'Title > div:last-child > div:first-child > label {' +
    '  text-align:left !important;font-size:16px;color:#444444;font-family:"NotoSans_Bold"; font-weight:600;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Body .' + themePrefix + classDlg + 'Foot {' +
    '  width:100%;' +
    '  margin-top:10px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Foot ul li {' +
    '  list-style-type : none;' +
    '  height : 32px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Foot label {' +
    '  color : #666666;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Close {' +
    '  background-color: black;' +
    '  width: 17px;' +
    '  height: 17px;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Head, .' + themePrefix + classDlg + 'Foot {' +
    '  background-color:white;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Head .' + themePrefix + classDlg + 'HeadText >div:last-child {' +
    '  text-align: center;' +
    '  color: black;' +
    '  font-size: 25px;' +
    '  margin-bottom: 5px;' +
    '  font-weight: 600;' +
    '  height:35px;' +
    '  line-height: normal;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Btns {' +
    '  text-align:center;' +
    '} ' +
    '.' + themePrefix + classDlg + 'Btns > button {' +
    '  color: #fff;' +
    '  font-family: "NotoSans_Medium";' +
    '  font-size: 18px;' +
    '  display: inline-block;' +
    '  text-align: center;' +
    '  vertical-align: middle;' +
    '  border-radius: 3px;' +
    '  background-color: #37acff;' +
    '  border: 1px solid #37acff;' +
    '  padding: 5px;' +
    '  margin-left: 2px;' +
    '  cursor: pointer;' +
    '}';

  document.body.appendChild(styles);

  this._stylesExcelDownloadDialog = styles;

  /* step 2 start
   * 임시로 다운로드 시트가 들어갈 div 생성(생성된 다이얼로그로 아래에서 옮김).
   */
  var tmpSheetTag = document.createElement("div");
  tmpSheetTag.className = "SheetTmpTag";
  tmpSheetTag.style.width = "300px";
  tmpSheetTag.style.height = "100px";
  document.body.appendChild(tmpSheetTag);
  /* step 2 end */

  /* step 3 start
   * 띄워져있는 다이얼로그나 팁을 제거. */
  this.closeDialog();
  this.hideTip();
  /* step 3 end */

  /* step 4 start
   * 다운로드 시트에 대한 옵션 설정(다운로드 시트를 띄운 시트의 옵션을 따라간다.) 및 다운로드 시트 생성
   */
  var opts = this.getUserOptions(1);
  // 시트의 이벤트를 그대로 가져오므로, 이벤트를 삭제 합니다.
  delete opts.Events;

  if (opts.Cfg && opts.Cfg.UsePivot) opts.Cfg.UsePivot = false;
  if (this.InfoRow && this.InfoRow.Visible) {
    if (opts.Cfg) {
      opts.Cfg.InfoRowConfig.Visible = false;
    }
  }

  //부모의 CanEdit가 0이나 3일때
  if (opts.Cfg.CanEdit === 0 || opts.Cfg.CanEdit === 3) {
      opts.Cfg.CanEdit = 1;
      opts.Def = opts.Def || {};
      opts.Def.Col = opts.Def.Col || {};
      opts.Def.Col.CanEdit = 0;
  }

  // 시트에 Foot과 Solid가 존재하면 제거합니다.
  if (opts.Foot) delete opts.Foot;
  if (opts.Solid) delete opts.Solid;

  if (!opts.Head) opts.Head = [];
  opts.Head.push({
    "id": "downCheckHeader",
    "Kind": "Header",
    "CanEdit": true,
    "RowMerge": false
  });

  // MultiRecord 사용하는 시트에서 엑셀 다운로드 다이얼로그를 사용 할 수 있도록 기능개선
  if(opts.Cfg.MultiRecord == 1){
    delete opts.Cfg.MultiRecord;
    var tmpCols = opts.Cols;
    opts.Cols = new Array();
    for(var i = 0; i < tmpCols.length; i++){
      var colsLen = tmpCols[i].length * i;
      for(var j = 0; j < tmpCols[i].length; j++){
        opts.Cols[j + colsLen] = new Array();
        opts.Cols[j + colsLen] = tmpCols[i][j];
      }
    }
  }

  var self = this;
  var chkHeader = [];
  // rowchk 이 있을 경우 동작되는 작업들.
  if (rowchk) {
    var headerRows = self.getHeaderRows();
    opts.LeftCols = (opts.LeftCols != null) ? opts.LeftCols : [];
    for (var i = 0, j = headerRows; i < j.length; i++) {
      chkHeader[i] = {
        Value: "체크",
        HeaderCheck: 1
      }
    }
    // 다이얼로그 전용 컬럼. LeftCols 가장 앞에 넣는다.
    opts.LeftCols.unshift({
      Header: chkHeader,
      Type: "Bool",
      Name: "chkBool",
      Visible: 1,
      CanEmpty: 3,
      CanEdit: 1,
      ColMerge: 0,
      Align: "Center",
      VAlign: "Middle"
    });

    opts.Head[opts.Head.length - 1].chkBool = "";

    // downParams.downRows 인자를 사용할 때 chkBool 처리
    if(downParams && downParams.downRows) {
      var chkrows = "|"+ downParams.downRows +"|";
    } else {
      var chkrows = "|";
      for(var i = 0, j = self.getDataRows(); i < j.length; i++){
        chkrows = chkrows + i +"|";
      }
    }

    opts.Events = {
      onDataLoad: function (evtParams) {
        for (var i = 0, j = self.getDataRows(), k = evtParams.sheet.getDataRows(); i < j.length; i++) {
          if (chkrows.indexOf("|"+ i +"|") != -1) {
            k[i].chkBool = k[i].Visible = j[i].Visible;
          } else {
            k[i].chkBool = 0;
          }
        }
        evtParams.sheet.syncHeaderCheck();
      }
    }
  }

  // downParams.downCols 인자와 다이얼로그 헤더체크 처리
  // LeftCols, RightCols 에 대한 대응.
  var sec = ["LeftCols", "Cols", "RightCols"];
  if (!downParams || (downParams && downParams.downCols == "Visible")) {
    var chkcols = "|";
    for (var s = 0; s < sec.length; s++) {
      if (opts[sec[s]]) {
        for(var i = 0; i < opts[sec[s]].length; i++){
          if (sec[s] == "LeftCols" && opts[sec[s]][i] && opts[sec[s]][i].Name == "chkBool") continue;
          chkcols = chkcols + opts[sec[s]][i].Name + "|";
        }
      }
    }
  } else if (downParams && downParams.downCols) {
    var chkcols = "|"+ downParams.downCols + "|";
  }

  var C = this.Cols;

  for (var s = 0; s < sec.length; s++) {
    if (opts[sec[s]]) {
      opts[sec[s]].forEach(function (col) {
        if (sec[s] == "LeftCols" && col && col.Name == "chkBool") return;
        delete col.Required;
        delete col.FormulaRow;
        delete col.RelWidth;
        col.Visible = 1;

        if (downParams && downParams.downCols == "Visible" && C[col.Name] && !C[col.Name].Visible) col.Visible = 0;
        opts.Head[opts.Head.length - 1][col.Name] = {
          Type: "Bool",
          Value: (chkcols.indexOf("|"+ col.Name +"|") != -1 && C[col.Name] && C[col.Name].CanExport) ? 1 : 0,
          CanEdit: C[col.Name] && C[col.Name].CanExport ? true : false
        };
      });
    }
  }

  opts.Head[opts.Head.length - 1].SEQ = "선택";

  var DownSheet = _IBSheet.create(name, tmpSheetTag, opts, self.deepCopyRows());
  /* step 4 end */

  /* step 5 start
   * 다운로드 시트가 띄워질 다이얼로그 창에 대한 설정 및 다이얼로그 생성
   */
  var dialogOpt = {},
    pos = {};
  this.initPopupDialog(dialogOpt, pos, DownSheet, {
    cssClass: classDlg
  });

  dialogOpt.Head = "<div>"+ title +"</div>";
  dialogOpt.Foot = "<div class='" + themePrefix + classDlg + "Btns'>" +
    "  <button id='" + name + "_ExcuteExcelDownLoad'>다운로드</button>" +
    "  <button id='" + name + "_CancelExcelDownLoad'>취소</button>" +
    "</div>";
  dialogOpt.Body = "<div class='" + themePrefix + classDlg + "Title' ><div></div>" +
    "  <div>" +
    "    <div><label >데이터 미리보기</label></div>" +
    "    <div style='text-align:right;'>" +
    "      <!--<label for='" + name + "_DownloadSelectSave' style='display:inline-block'>다운로드 항목 저장</label>" +
    "      <input type='checkbox' id='" + name + "_DownloadSelectSave' name='DownloadSelectSave' style='display:inline-block'> -->" +
    "    </div>" +
    "  </div>" +
    "</div>" +
    "<div id='" + name + "_ExcelDownPopupBody' style='width:" + width + "px;height:" + height + "px;overflow:hidden;'></div>" +
    "<div class='" + themePrefix + classDlg + "Foot'>" +
    "  <div>" +
    "    <ul class=''>" +
    "      <li>" +
    "        <span>" +
    "          <input type='radio' id='" + name + "_DownloadExcel' name='DownloadType' value='1' checked='checked' style='margin-left:0px;'>" +
    "          <label for='" + name + "_DownloadExcel'>엑셀파일 다운로드</label>" +
    "        </span>" +
    "        <span>" +
    "          <input type='radio' id='" + name + "_DownloadText' name='DownloadType' value='2'>" +
    "          <label for='" + name + "_DownloadText'>텍스트파일 다운로드</label>" +
    "        </span>" +
    "        <span style='margin-left: 15px;display:none'>" +
    "          <label for='" + name + "_DownloadTextSep'>구분자 설정</label>" +
    "          <select id='" + name + "_DownloadTextSep'>" +
    "            <option value=','>,</option>" +
    "            <option value='\t' selected>Tab</option>" +
    "            <option value='|'>|</option>" +
    "            <option value='.'>.</option>" +
    "            <option value=' '>Space</option>" +
    "          </select>" +
    "        </span>" +
    "      </li>" +
    "      <li>" +
    "        <span style='height:65px;display:inline'>" +
    "          <label for='" + name + "_DownloadFileName' style='display:inherit;font-size:15px;font-family:'NotoSans_Bold''>파일 명</label>" +
    "          <input type='text' id='" + name + "_DownloadFileName' name='DownloadFileName' style='display:inherit;margin-left: 3px;font-size:15px;width:75%;text-align:left;height:25px' value='" + fileName + "'>" +
    "        </span>" +
    "      </li>" +
    "    </ul>" +
    "  </div>" +
    "</div>";

  dialogOpt = _IBSheet.showDialog(dialogOpt, pos, this);
  /* step 5 end */

  /* step 6 start
   * 다이얼로그 창의 Body에 다운로드 시트를 옮김
   */
  var ExcelDownDlgBody = document.getElementById(name + "_ExcelDownPopupBody");
  ExcelDownDlgBody.innerHTML = "";
  for (var elem = tmpSheetTag.firstChild; elem; elem = tmpSheetTag.firstChild) ExcelDownDlgBody.appendChild(elem);
  DownSheet.MainTag = ExcelDownDlgBody;
  tmpSheetTag.parentNode.removeChild(tmpSheetTag);
  /* step 6 end */

  /* step 7 start
   * 버튼 클릭시 및 다이얼로그의 시트가 아닌 부분을 클릭했을 때
   */
  var btnDownload = document.getElementById(name + "_ExcuteExcelDownLoad");
  var btnCancel = document.getElementById(name + "_CancelExcelDownLoad");
  var myArea = DownSheet.getElementsByClassName(dialogOpt.Tag, themePrefix + classDlg + "HeadText")[0];

  myArea.onclick = function () {
    if (self.ARow == null) {
      DownSheet.blur();
    }
  }

  var myArea2 = DownSheet.getElementsByClassName(dialogOpt.Tag, themePrefix + classDlg + "Foot")[0]
  myArea2.onclick = function () {
    if (self.ARow == null) {
      DownSheet.blur();
    }
  }

  var txtSep = document.getElementById(name + "_DownloadTextSep");

  btnDownload.onclick = function () {
    var fileName = document.getElementById(name + "_DownloadFileName").value ? document.getElementById(name + "_DownloadFileName").value : "sheet";
    var checkHeader = DownSheet.getRowById("downCheckHeader");
    var cols = DownSheet.getCols();
    var str = cols.filter(function (col) {
      return col === 'SEQ' ? DownSheet.Cols[col].Visible : !(checkHeader[col + "Visible"] == 0 || checkHeader[col + "Type"] != "Bool") && checkHeader[col] === 1 && DownSheet.getAttribute(null, col, "Visible")
    });
    var rows = [];
    var rowStr = "";

    if (rowchk) {
      for (var i = 0, j = cols; i < j.length; i++) {
        if (j[i] == "chkBool") {
          rows = DownSheet.getRowsByChecked("chkBool");
          rowStr = (rows.length == 0) ? "|" : "";
          break;
        }
      }

      for (var i = 0, j = rows; i < j.length; i++) {
        rowStr = rowStr.concat(DownSheet.getRowIndex(j[i]), "|");
      }
    }

    if (document.getElementById(name + "_DownloadExcel").checked) {
      try {
        if (fileName.lastIndexOf(".") > -1) {
          var ext = fileName.substring(fileName.lastIndexOf("."));
          if (ext == ".xls") {
            fileName += "x";
          } else if (ext != ".xlsx") {
            fileName += ".xlsx";
          }
        } else {
          fileName += ".xlsx";
        }

        // downParams 인자로 다이얼로그에서 down2Excel의 옵션 사용할 수 있도록 수정
        var paramObj = {
          sheetDesign : 1
        };
        paramObj = IBSheet.__.extend(downParams ? downParams : paramObj, {
          fileName: fileName,
          downRows: rowStr,
          downCols: str.join("|"),
        });

        self.down2Excel(paramObj);
      } catch (e) {
        if (e.message.indexOf("down2Excel is not a function") > -1) {
          console.log("%c 경고", "color:#FF0000", " : ibsheet-excel.js 파일이 필요합니다.");
        }
      }
    } else {
      try {
        self.down2Text({
          fileName: fileName,
          downRows: rowStr,
          downCols: str.join("\|"),
          colDelim: txtSep.value
        });
      } catch (e) {
        if (e.message.indexOf("down2Text is not a function") > -1) {
          console.log("%c 경고", "color:#FF0000", " : ibsheet-excel.js 파일이 필요합니다.");
        }
      }
    }

    DownSheet.dispose();
    self.closeDialog();

    // 버튼을 닫을때 스타일을 제거한다.
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
      delete self._stylesExcelDownloadDialog;
    }
  }
  btnCancel.onclick = function () {
    DownSheet.dispose();
    self.closeDialog();
    // 버튼을 닫을때 스타일을 제거한다.
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
      delete self._stylesExcelDownloadDialog;
    }
  }
  /* step 7 end */

  //var txtBtn = document.getElementById(name + "_DownloadText");
  var txtBtn = document.getElementsByName("DownloadType");

  for (var i = 0; i < txtBtn.length; i++) {
    txtBtn[i].onclick = function (ev) {
      if (ev.srcElement.value == "2") {
        txtSep.parentNode.style.display = "inline-block";
      } else {
        txtSep.parentNode.style.display = "none";
      }
    }
  }

  _IBSheet.Focused = DownSheet;
};

// showDownloadDialog로도 호출 가능하게끔 수정.
Fn.showDownloadDialog = Fn.showExcelDownloadDialog;
/*
엑셀 업로드 다이얼로그
showUploadDialog 호출 시 엑셀 업로드 다이얼로그를 생성 후 화면에 띄움.
*/
Fn.showUploadDialog = function (uploadType ,width, height, name, colCount) {
  var minWidth = 700;
  var minHeight = 400;
  var count = 20;

  if (!uploadType) return false;

  if (this.endEdit(true) == -1) {
    return;
  }

  if (typeof uploadType == "object") {
    var uploadTemp = uploadType;
    if (uploadTemp.uploadType != null) uploadType = uploadTemp.uploadType;
    if (uploadTemp.width != null) width = uploadTemp.width;
    if (uploadTemp.height != null) height = uploadTemp.height;
    if (uploadTemp.name != null) name = uploadTemp.name;
    if (uploadTemp.colCount != null) colCount = uploadTemp.colCount;
  }

  width = parseInt(width);
  if (!width) width = minWidth;
  else if (width < minWidth) width = minWidth;
  height = parseInt(height);
  if (!height) height = minHeight;
  else if (height < minHeight) height = minHeight;
  name = typeof name == "string" ? name : ("excelUploadSheet_"+ this.id);
  colCount = parseInt(colCount);
  if (!colCount) colCount = count;

  this.initImportSheet(uploadType ,Math.abs(width), Math.abs(height), name, Math.abs(colCount));

};
/*
 * 시트내 찾기 Ctrl+Shift+F
 * 다이얼로그 기능
 */
Fn.findDlgFunc = function (work, evt) {
  var sheetid = this.id;
  //ESC 클릭시 닫기
  if (work == "outKeyUp") {
    if (evt.keyCode == 27) {
      window[sheetid + "_FindDlg"].Close();
    }
    return;
  }
  this.SearchExpression = document.getElementById(sheetid + "_FindTxt").value;
  switch (work) {
    case "Find": //검색
    case "FindPrev": //이전 검색
    case "Mark": //강조
    case "Select": //선택
    case "Clear": //취소
      this.findRows(work);
      break;

    case "FindKeyUp": //검색 창 입력
      if (evt.keyCode == 13) {
        this.findRows("Find");
      } else {
        return;
      }
      break;
    case "ChgCaseSense": //대소문자 구분
      //시트 생성시 cfg에 설정한 대소문자 구분 설정을 기억해 둔다.
      this.SearchCaseSensitiveOld = this.SearchCaseSensitive;
      if (evt.srcElement.checked) {
        this.SearchCaseSensitive = 1;
      } else {
        this.SearchCaseSensitive = 0;
      }
      break;
  }
  //검색 된 행/건수 표시
  if (this.SearchCount) {
    window[sheetid + "_FindDlg"].Tag.getElementsByTagName("span")[0].innerText = this.SearchCount + "건";
  } else {
    window[sheetid + "_FindDlg"].Tag.getElementsByTagName("span")[0].innerText = "";
  }
  //클릭 객체에게 다시 포커스 부여
  evt.srcElement.focus();
  _IBSheet.Focused = null;
};

Fn.showFindDialog = function () {
  if (this.getTotalRowCount() == 0) {
    this.showMessageTime("검색할 데이터가 없습니다.");
    return;
  }

  var sheetId = this.id;
  var dlgName = sheetId + "_FindDlg";
  var self = this;
  var checked = this.SearchCaseSensitive ? "checked" : "";
  // 기존에 열린 창이 있는지 확인.
  if (window[dlgName]) return;

  var themePrefix = this.Style;
  var btnClass = themePrefix + "DialogButton";
  var DLGBODY = "<div class='" + themePrefix + "FindDlgTop' onkeyup='" + sheetId + ".findDlgFunc(\"outKeyUp\", event)'>" +
    "<div><input type='text' style='border:0px' id='" + sheetId + "_FindTxt' onkeyup='" + sheetId + ".findDlgFunc(\"FindKeyUp\", event)' title='검색어 입력'/><span></span></div>" +
    "<div><button type='button' class='" + btnClass + "' onclick='" + sheetId + ".findDlgFunc(\"FindPrev\", event)' title='이전 찾기'>˂</button>" +
    "<button type='button' class='" + btnClass + "' onclick='" + sheetId + ".findDlgFunc( \"Find\", event)' title='다음 찾기'>˃</button></div></div>" +
    "<div style='clear:both;'></div>" +
    "<div class='" + themePrefix + "FindDlgBottom'  onkeyup='" + sheetId + ".findDlgFunc(\"outKeyUp\", event)'><div class='" + themePrefix + "S_FIND_CASE'>" +
    "<input type='checkbox' id='" + sheetId + "_FindChk' " + checked + " onchange='" + sheetId + ".findDlgFunc(\"ChgCaseSense\", event)' /><label for='" + sheetId + "_FindChk'>대/소문자 구분</label>" +
    "</div><div class='" + themePrefix + "S_FIND_BTN'>" +
    "<button type='button' class='" + btnClass + "' onclick='" + sheetId + ".findDlgFunc(\"Mark\", event)'>강조</button>" +
    "<button type='button' class='" + btnClass + "' onclick='" + sheetId + ".findDlgFunc(\"Select\", event)'>선택</button>" +
    "<button type='button' class='" + btnClass + "' onclick='" + sheetId + ".findDlgFunc(\"Clear\", event)'>취소</button></div><div style='clear:both;'></div></div>";
  var dlg = {
    "Head": "IBSheet 검색",
    "Body": DLGBODY,
    "Modal": false,
    "MinWidth": 260,
    "MinHeight": 300,
    "Shadow": false,
    "HeadDrag": true,
    "ZIndex": this.ZIndex ? (this.ZIndex + 20) : 270,
    "OnClose": function () {
      self.SearchExpression = window[dlgName].Tag.getElementsByTagName("input")[0].value;
      _IBSheet.Focused = self;
      // 기존 창을 제거
      window[dlgName] = null;
    }
  };

  window[dlgName] = _IBSheet.showDialog(
    dlg,
    {
      Align: "center middle",
      Tag: (this.PivotSheet ? this.PivotSheet.MainTag : this.MainTag)
    }
  );
  if (this.SearchExpression) {
    window[dlgName].Tag.getElementsByTagName("input")[0].value = this.SearchExpression;
  }
  setTimeout(function () {
    window[dlgName].Tag.getElementsByTagName("input")[0].focus();
  }, 50);
  _IBSheet.Focused = null;
};

/* 피벗 시트에서 원래 시트로 돌릴때 사용하는 메소드(초기화) */
Fn.clearPivotSheet = function () {
  if (this.PivotMaster) {
    this.dispose();
    this.switchPivotSheet(0);
    IBSheet[this.PivotMaster].PivotSheet = null;
    IBSheet[this.PivotMaster].PivotDetail = null;
  }
};

/* 피벗 다이얼로그 삭제 메소드(키보드 사용)*/
Fn.closePivotDialog = function (ev) {
  if (ev.keyCode == 27) {
    for (var i = 0; i < Dialogs.length; i++) {
      if (Dialogs[i].PivotDialog) {
        this.beforePivotActiveElemen.focus();
        Dialogs[i].Close();
      }
    }
  }
};

/* 피벗 다이얼로그 생성 메소드*/
Fn.createPivotDialog = function (width, height, name) {
  // 스타일이 중복 되었을때 스타일을 제거한다.
  if (this._stylesPivotDialog && this._stylesPivotDialog.parentNode) {
    this._stylesPivotDialog.parentNode.removeChild(this._stylesPivotDialog);
    delete this._stylesPivotDialog;
  }

  this.endEdit();

  if (typeof width == "object") {
    var pivotTemp = width;
    if (pivotTemp.width != null) width = pivotTemp.width;
    if (pivotTemp.height != null) height = pivotTemp.height;
    if (pivotTemp.name != null) name = pivotTemp.name;
  }

  width = typeof width == "number" ? width : 500;
  height = typeof height == "number" ? height : 500;
  name = typeof name == "string" ? name : ("pivotDialog" + this.id);

  var classDlg = "pivotPopup";
  var themePrefix = this.Style;
  var styles = document.createElement("style");
  styles.innerHTML = "" +
    ".box {  " +
    "  display:inline-block; " +
    "  border: 1px solid #586980; " +
    "  border-radius:2px;" +
    "  padding: 3px 8px 3px 8px; " +
    "  white-space: nowrap; " +
    "  margin-right: 5px; " +
    "  margin-left: 5px; " +
    "  margin-bottom: 5px; " +
    "  font-size: 12px; " +
    "  cursor: pointer; " +
    "  color: #586980; " +
    "  background-color: #FFFFFF; " +
    "} " +
    "." + name + "_table { " +
    "  display: block; " +
    "  float: left; " +
    "  width:calc(50% - 7px); " +
    "  height:100%; " +
    "  border:1px solid #c5c5c5; " +
    "} " +
    "." + name + "_btns { " +
    "  text-align:right; " +
    "  background-color: #e4f5fd; " +
    "  padding-top: 15px; " +
    "} " +
    "." + name + "_btns > button { " +
    "  color: #fff; " +
    "  font-family: 'NotoSans_Medium'; " +
    "  font-size: 12px; " +
    "  display: inline-block; " +
    "  text-align: center; " +
    "  vertical-align: middle; " +
    "  border-radius: 3px; " +
    "  background-color: #37acff; " +
    "  border: 1px solid #37acff; " +
    "  padding: 5px; " +
    "  margin-left: 2px; " +
    "  cursor: pointer; " +
    "} " +
    "." + name + "_table > div > div:first-child { " +
    "  text-align:center; " +
    "  background-color:#d9ecea; " +
    "  height: 30px; " +
    "  line-height: 30px; " +
    "  font-size: 15px; " +
    "} " +
    "." + themePrefix + classDlg + " { " +
    "  border:15px solid #e4f5fd; " +
    "  background-color:#e4f5fd; " +
    "} " +
    "." + themePrefix + classDlg + " > div:first-child { " +
    "  height: 90% " +
    "} " +
    "." + themePrefix + classDlg + " > div:nth-child(2) { " +
    "  height: 10% " +
    "} "

  document.body.appendChild(styles)

  this._stylesPivotDialog = styles;

  var dialogOpt = {};
  var Pos = {
    Align: "center middle",
    Tag: (this.PivotSheet ? this.PivotSheet.MainTag : this.MainTag)
  }

  dialogOpt.Modal = 1;
  dialogOpt.Head = "<div>피벗 테이블 설정</div>";

  var self = this;
  if (this.PivotMaster) {
    self = IBSheet[this.PivotMaster];
  }
  var pivotCols = self.producePivotColumn();

  dialogOpt.Body = "<div class='" + themePrefix + classDlg + "' style='width:" + width + "px;height:" + height + "px;' onmousedown='return false' onkeyup='" + this.id + ".closePivotDialog(event)' onmouseup='" + this.id + ".PivotDragMouseUp(event)' onmousemove='" + this.id + ".PivotDragMouseMove(event)'>" +
    "<div>" +
    "<div id='DragTags' style='left: 0px; top: 0px; width: 0px; height: 0px; visibility: visible;'></div>" +
    "<div class='" + name + "_table' style='margin-right:10px'>" +
    "<div style='height:50%'>" +
    "<div style='border-bottom: 1px solid #c5c5c5;'>대상 컬럼(일반)</div>" +
    "<div style='overflow-y:auto; height:180px;padding:7px;background-color:#FFFFFF' onselectstart='return false;' onmouseup='" + this.id + ".PivotDragSetItem(this,event)' ontouchstart='return false'> " +
    pivotCols[0] +
    "</div>" +
    "</div>" +
    "<div style='height:50%'>" +
    "<div style='border-bottom: 1px solid #c5c5c5;border-top: 1px solid #c5c5c5;'>대상 컬럼(숫자형)</div>" +
    "<div style='overflow-y:auto; height:179px;padding:7px;background-color:#FFFFFF' onselectstart='return false;' onmouseup='" + this.id + ".PivotDragSetItem(this,event)' ontouchstart='return false'> " +
    pivotCols[1] +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='" + name + "_table'>" +
    "<div style='height:33%'>" +
    "<div style='border-bottom: 1px solid #c5c5c5;'>가로행 기준</div>" +
    "<div id='" + name + "_PivotRow' class='" + name + "_PivotStandards' style='height:107px;padding:7px; overflow-y: auto;background-color:#FFFFFF;' onmouseup='" + this.id + ".PivotDragSetItem(this,event,1)'>" +
    (pivotCols[2] ? pivotCols[2] : "<i class='CellsInfo' style='color:gray;font-size:12px;'>이곳으로 대상 컬럼을 끌어놓으십시오.</i>") +
    "</div>" +
    "</div>" +
    "<div style='height:33%'>" +
    "<div style='border-bottom: 1px solid #c5c5c5;border-top: 1px solid #c5c5c5;'>세로행 기준</div>" +
    "<div id='" + name + "_PivotCol' class='" + name + "_PivotStandards' style='height:107px;padding:7px; overflow-y: auto;background-color:#FFFFFF;' onmouseup='" + this.id + ".PivotDragSetItem(this,event,1)'>" +
    (pivotCols[3] ? pivotCols[3] : "<i class='CellsInfo' style='color:gray;font-size:12px;'>이곳으로 대상 컬럼을 끌어놓으십시오.</i>") +
    "</div>" +
    "</div>" +
    "<div style='height:33%'>" +
    "<div style='border-bottom: 1px solid #c5c5c5;border-top: 1px solid #c5c5c5;'>데이터 값</div>" +
    "<div id='" + name + "_PivotData' class='" + name + "_PivotStandards' style='height:107px;padding:7px; overflow-y: auto;background-color:#FFFFFF;' onmouseup='" + this.id + ".PivotDragSetItem(this,event,2)'>" +
    (pivotCols[4] ? pivotCols[4] : "<i class='CellsInfo' style='color:gray;font-size:12px;'>이곳으로 대상 컬럼을 끌어놓으십시오.</i>") +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='" + name + "_btns'><button id='" + name + "_clearPivotBtn'>초기화</button><button id='" + name + "_createPivotBtn'>피벗 테이블 생성</button><button id='" + name + "_cancelBtn'>취소</button></div>" +
    "</div>";

  var result = _IBSheet.showDialog(dialogOpt, Pos);
  result.PivotDialog = 1;
  drag.dialogLeft = result.Tag.offsetLeft;
  drag.dialogTop = result.Tag.offsetTop;

  var btnCancel = document.getElementById(name + "_cancelBtn");
  var btnCreate = document.getElementById(name + "_createPivotBtn");
  var btnClear = document.getElementById(name + "_clearPivotBtn");

  btnCreate.onclick = function () {
    function findChildren(node) {
      var child = node.firstChild;
      var str = [];
      while (child) {
        if (child.tagName && child.tagName.toLowerCase() == "span") {
          str.push(child.firstChild.getAttribute("colname"));
        }

        child = child.nextSibling;
      }
      return str;
    }

    var targetPRow = findChildren(document.getElementById(name + "_PivotRow"));
    var targetPCol = findChildren(document.getElementById(name + "_PivotCol"));
    var targetPData = findChildren(document.getElementById(name + "_PivotData"));
    var cols = self.findPivotColumn();

    if (cols.common.length === 0 || cols.number.length === 0) {
      alert("가능한 대상 컬럼이 없습니다.");
      return false;
    }
    if (targetPRow.length === 0 || targetPCol.length === 0 || targetPData.length === 0) {
      alert("피벗 설정이 완료되지 않았습니다.");
      return false;
    }

    setTimeout(function () {

      var criterias = {
        row: cols.common.reduce(function (arr, curVal) {
          arr.push(curVal.Name);
          return arr;
        }, []).join(","),
        col: cols.common.reduce(function (arr, curVal) {
          arr.push(curVal.Name);
          return arr;
        }, []).join(","),
        data: cols.number.reduce(function (arr, curVal) {
          arr.push(curVal.Name);
          return arr;
        }, []).join(",")
      }

      var init = {
        row: targetPRow.join(","),
        col: targetPCol.join(","),
        data: targetPData.join(",")
      }
      self.makePivotTable(criterias, init);
    }, 10)
    result.Close();

  }
  var tmpSheet = this;
  btnClear.onclick = function () {
    setTimeout(function () {
      delete tmpSheet.PivotRows;
      delete tmpSheet.PivotCols;
      delete tmpSheet.PivotData;
      tmpSheet.PivotSheet && tmpSheet.PivotSheet.clearPivotSheet();
    }, 10)
    result.Close();
    // 버튼을 닫을때 스타일을 제거한다.
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
      delete self._stylesPivotDialog;
    }
  }

  btnCancel.onclick = function () {
    result.Close();
    // 버튼을 닫을때 스타일을 제거한다.
    if (styles && styles.parentNode) {
      styles.parentNode.removeChild(styles);
      delete self._stylesPivotDialog;
    }
  }
  this.beforePivotActiveElemen = document.activeElement;
  btnCreate.focus();
};
/* 시트에서 피벗 다이얼로그에 사용될 컬럼 중 일반과 숫자형을 나눠서 반환 */
Fn.findPivotColumn = function () {
  var res = {};
  res.common = [];
  res.number = [];
  var header = this.getHeaderRows()[0];
  var cols = this.getCols().filter(function (col) {
    return col !== "SEQ";
  });


  for (var i = 0; i < cols.length; i++) {
    (this.Cols[cols[i]].Type == "Int" || this.Cols[cols[i]].Type == "Float") ? res.number.push({
      Name: cols[i],
      Value: header[cols[i]]
    }): res.common.push({
      Name: cols[i],
      Value: header[cols[i]]
    });
  }

  return res;
};

/* 드래그된 아이템이 일반이냐 숫자형이냐에 따라 가로행 기준, 세로행 기준, 데이터 값에 들어갈 수 있는지 유무를 판별한다. */
Fn.PivotDragExactTarget = function (target, group) {
  return group.filter(function (col) {
    return target.indexOf(col.Name) > -1
  }).length == target.length;
};

/* 드래그 움직임을 캐치하는 이벤트 */
Fn.PivotDragMouseMove = function (ev) {
  drag.MoveDragObj(ev)
};

/* 드래그로 아이템을 옮겼을때 발생하는 이벤트(아이템 삭제) */
Fn.PivotDragMouseUp = function (ev) {
  if (drag.tag) {
    drag.ClearDragObj();
  }
};

/* 드래그로 아이템을 옮겼을때 발생하는 이벤트(아이템 생성) */
Fn.PivotDragSetItem = function (object, ev) {
  if (drag.tag) {
    if (object.className.indexOf("_PivotStandards") > -1) {
      var self = this;

      if (this.PivotMaster) {
        self = IBSheet[this.PivotMaster];
      }

      var cols = self.findPivotColumn();
      var group;
      if (object.id.indexOf("_PivotData") > -1) {
        group = cols.number;
      } else {
        group = cols.common;
      }

      if (!this.PivotDragExactTarget([drag.tag.firstChild.firstChild.getAttribute("colname")], group)) {
        alert("데이터 값에는 숫자형이, 가로행/세로행 기준에는 그 외의 값이 들어가야합니다.");
        drag.ClearDragObj();
        return false;
      }
    }

    var copy = drag.tag.firstChild.cloneNode(true);
    if (object.firstChild && object.firstChild.className === "CellsInfo") {
      object.removeChild(object.firstChild);
    }
    object.appendChild(copy);
    drag.ClearDragObj(1);
    _IBSheet.cancelEvent(ev, 2);
  }
};

/* 클릭시 드래그 태그 생성하는 이벤트 */
Fn.PivotItemClick = function (tag, ev) {
  for (var i = 0; i < Dialogs.length; i++) {
    if (Dialogs[i].PivotDialog) {
      drag.dialogLeft = Dialogs[i].Tag.offsetLeft;
      drag.dialogTop = Dialogs[i].Tag.offsetTop;
    }
  }

  drag.MakeDragObj(tag, ev)
  document.documentElement.style.cursor = "default";
  _IBSheet.cancelEvent(ev, 2);
};

/* 대상 컬럼에 들어갈 셀들을 생성하는 메소드 */
Fn.producePivotColumn = function () {
  var cols = this.findPivotColumn();
  var res = [];
  var strCommon = "",
    strNum = "",
    strPivotRows = "",
    strPivotCols = "",
    strPivotData = "";

  if (cols.common && cols.common.length > 0) {
    for (var i = 0; i < cols.common.length; i++) {
      var strCols = "<span onmousedown='" + this.id + ".PivotItemClick(this,event);' ontouchstart='" + this.id + ".PivotItemClick(this,event);'><b class='box' colName='" + cols.common[i].Name + "'>" + cols.common[i].Value + "</b></span>";

      if ((this.PivotRows && this.PivotRows.indexOf(cols.common[i].Name) > -1) || (!this.PivotRows && this.InitPivotRows && this.InitPivotRows.indexOf(cols.common[i].Name) > -1)) {
        strPivotRows += strCols;
      } else if ((this.PivotCols && this.PivotCols.indexOf(cols.common[i].Name) > -1) || (!this.PivotCols && this.InitPivotCols && this.InitPivotCols.indexOf(cols.common[i].Name) > -1)) {
        strPivotCols += strCols;
      } else {
        strCommon += strCols;
      }
    }
  }

  if (cols.number && cols.number.length > 0) {
    for (var i = 0; i < cols.number.length; i++) {
      var strCols = "<span onmousedown='" + this.id + ".PivotItemClick(this,event);' ontouchstart='" + this.id + ".PivotItemClick(this,event);'><b class='box' colName='" + cols.number[i].Name + "'>" + cols.number[i].Value + "</b></span>";
      if ((this.PivotData && this.PivotData.indexOf(cols.number[i].Name) > -1) || (!this.PivotData && this.InitPivotData && this.InitPivotData.indexOf(cols.number[i].Name) > -1)) {
        strPivotData += strCols;
      } else {
        strNum += strCols;
      }
    }
  }

  res.push(strCommon);
  res.push(strNum);
  res.push(strPivotRows);
  res.push(strPivotCols);
  res.push(strPivotData);
  return res;
};
}(window, document));
