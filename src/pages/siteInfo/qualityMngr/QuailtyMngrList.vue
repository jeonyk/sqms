<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <!-- <h2 class="sub_title">{{subTitle}}</h2> -->
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index" v-on:click="currentData"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area" v-show="currentTab == 0">
            <div class="inner">
                <div class="button_box">
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel(sheet)">엑셀 다운로드</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet(sheet)">출력</button>
                    <div class="fr">
                        <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" v-on:click="qultWrite">등록</button>
                        <button v-if="checkUser(userId,'unuse')" type="button" class="btn btn_sm btn_darkgray" v-on:click="qultDeleteChk">삭제</button>
                    </div>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" style="height: calc(100vh - 280px)">
                    <div id="qltyMngrSheetTable_mysite" class="ibsheet_table" style="height: 100%"></div>
                </div>
            </div>
        </div>

        <div class="tab_area" v-show="currentTab == 1">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="6%">
                        <col width="24%">
                        <col width="4%">
                        <col width="24%">
                        <col width="4%">
                        <col width="24%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>프로젝트명</th>
                            <td>
                                <div class="form_area">
                                    <select name="" id="" class="form_control" v-model="mngtType">
                                        <option value="">전체</option>
                                        <option value="0">관리</option>
                                        <option value="1">비관리</option>
                                        <option value="2">준공</option>
                                    </select>
                                    <input type="text" class="form_control" placeholder="입력해주세요" v-model="projectName" @keyup.enter="allsiteList" :maxlength="100">
                                </div>    
                            </td>    
                            <th>성명</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="memberName" @keyup.enter="allsiteList" :maxlength="30"></td>    
                            <th>등급</th>
                            <td>
                                <select name="" id="" class="form_control" v-model="level">
                                    <option value="">전체</option>
                                    <option value="EXPR">특급</option>
                                    <option value="ADVC">고급</option>
                                    <option value="MIDL">중급</option>
                                    <option value="BGIN">초급</option>
                                    <option value="NONE">없음</option>
                                </select>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" v-on:click="searchReset">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="allsiteList">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="inner">
                <div v-if="checkUser(userId,'down')" class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(sheetAll)">엑셀 다운로드</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet(sheetAll)">출력</button>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" style="height: calc(100vh - 280px)">
                    <div id="qltyMngrSheetTable_allsite" class="ibsheet_table" style="height: 100%"></div>
                </div>
            </div>
        </div>

        <AdminDetail 
            v-bind:project-id="qultDetailObj.projectId" v-bind:site-id="qultDetailObj.siteId"
            v-bind:detail-obj="qultDetailObj"
            v-bind:change-btn="changeBtn"
            v-on:end-detail="endDetail" :ref-id="'qltyMngrAdminDetail'"
        />
        <AdminWrite 
            v-bind:project-id="projectId" v-bind:site-id="siteId"  v-bind:site-mstr-id="siteMstrId"
            v-bind:member-id-list="qultIdList" v-bind:detail-obj="qultDetailObj"
            v-on:final-close="qultWriteClose" :ref-id="'qltyMngrAdminWrite'"/>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:btn-name="btnNm" :pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
        <excel-download
            v-model="excelDownload.request"
            ref-id="qltyMngrList_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>
</template>

<script>
   import PopAlert from '@/pages/common/popup/PopAlert.vue' 
   import AdminDetail from '@/pages/common/popup/AdminDetail.vue' 
   import AdminWrite from '@/pages/common/popup/AdminWrite.vue'
   import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

   import { QualityAdmin, QualityAdmin2 } from '@/pages/common/data/LocusList'
   import { sendPostApi, sendPutApi, requestOptions } from '@/apis/common'
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import ExcelDownload from '@component/common/ExcelDownload.vue'

   import loader from '@ibsheet/loader'

   let sheetIdL = '';
   let sheetIdT = '';

   export default { 
        name: 'QuailtyMngrList',
        mixins: [authCheckMixns,MsgBoxMixins],
        components: {
            PopAlert,
            AdminDetail,
            AdminWrite,
            Breadcrumb,
            ExcelDownload,
        },
        data() {
            return {
                footerBg: 'transparent',
                subTitle: '품질관리자',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name

                popMsg: '',
                confirmUse : true,
                popId: 'qltyMngrAlert',
                btnNm : {first : '확인', second : '취소'},
                changeBtn : true,

                projectId : '',                //프로젝트 id
                siteId : '',                   //현장 id
                siteMstrId : '',              //

                mysite : [],               //my site list data
                allsite : [],              //all site list data

                //search
                memberName : '',
                majorName : '',
                level : '',
                mngtType : '0',
                projectName : '',

                qultIdList : [],                  // 품질관리자 팝업에서 동일인물 등록 불가하게 만들 id 변수
                qultDeleteList : [],              // 삭제할 품질관리자 list
                qultDetailObj : {},               // 클릭한 품질관리자 정보
                deleteYn : false,                // 삭제여부일시 alert function 변경
                
                fileCnt : 0,                     // 파일갯수
                fileComArcvId : '',              // 파일 아이디
                orgFileName: '',                //본파일명
                sheet:null,
                sheetAll:null,
                userType :'',
                userId :'',

                //엑셀다운로드
                excelDownload : {
                    request : false,
                    fileName :'',
                    downloadOption :'',
                    options : null,
                    data : [],
                }
            }
        },
        mounted() {
            this.userId = this.$store.getters['auth/getUserId'];
            this.userType = this.$store.getters['auth/getUserType'];
            if(this.userType == 'PTNR'){
                this.tabs = ['My Site'];
            }
            this.siteMstrId = this.$cookies.get("siteMstrId");
            if(this.sitrMstrId == '' || this.siteMstrId == null){
                this.alert('현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.',async()=>{
                    this.$router.push({name: 'Login'});
                })
                return;
            }
            if(this.$cookies.get("projectId") && this.$cookies.get("siteId") && this.currentTab == 0) {
                this.projectId = this.$cookies.get("projectId");
                this.siteId = this.$cookies.get("siteId");
                this.mysiteList();
            }else {
                this.allsiteList();
            }

        },
        beforeDestroy() {
            loader.removeSheet(sheetIdL);
            loader.removeSheet(sheetIdT);
        },

        methods: {
            currentData : function() {
                this.searchReset();
                if(this.currentTab == 0) {
                    this.mysiteList();
                }else {
                    this.allsiteList();
                }
            },
            alertConfirmFn : function() { //commonAlert 팝업에서 확인 버튼 누를 경우 상황에 따른 event 주입
                if (this.deleteYn == true){
                    this.qultDelete();
                }else{
                    this.closePop();
                }
            },
            closePop : function() { //기본 팝업 닫기 event
                this.deleteYn = false;
                this.$root.$emit('bv::hide::modal', 'qltyMngrAlert');
            },
            searchReset : function() {
                this.memberName = '';
                this.majorName = '';
                this.level = '';
                this.mngtType = '0';
                this.projectName = '';
            },
            mysiteList : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/quailtyMngr/list';
                let param = {
                    "projectId" : this.projectId,
                    "siteId" : this.siteId,
                    "siteMstrId" : this.siteMstrId,
                    "memberName" : this.memberName,
                    "majorName" : this.majorName,
                    "level" : this.level,
                };

                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });

                let data = [];
                let options = QualityAdmin.options;

                let cols = [
                    { Name: 'chkBox', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 4 },
                    { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4, CanEdit: 0 },
                    { Name: 'memberName', Header: [{ Value: '성명', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                    { Name: 'jobPostOrdNo', Header: [{ Value: '직급', RowSpan: 2 }], RelWidth: 10, CanEdit: 0  },
                    { Name: 'levelName', Header: [{ Value: '등급', RowSpan: 2 }], RelWidth: 10, CanEdit: 0  },
                    { Name: 'leglEduYnName', Header: [{ Value: '법정 교육 이수', RowSpan: 2 }], RelWidth: 5, CanEdit: 0  },
                    { Name: 'dpmtDt', Header: [{ Value: '배치일자', Span: 2 }, { Value: '실제 배치일' }], RelWidth: 10, CanEdit: 0  },
                    { Name: 'dpmtChangeDt', Header: [{}, { Value: '배치/변경 신고일 \n (인∙허가 기관)' }], RelWidth: 10, CanEdit: 0  },
                    { Name: 'comment', Header: [{ Value: '비고', RowSpan: 2 }], RelWidth: 16, CanEdit: 0  },
                    { Name: 'qultToolYnName', Header: [{ Value: '품질공구장', RowSpan: 2 }], RelWidth: 4, CanEdit: 0  },
                    { Name: 'file', Header: [{ Value: '첨부파일', RowSpan: 2 }], RelWidth: 10, CanEdit: 0, Format: {"0": "","1": "<button type='button' class='btn_file no_text'>파일</button>"} },
                ]

                options.Cols = cols;
                let dataMerge = 0;
                if(resData.rCode == "0000") {
                    this.mysite = resData.datas.resultList;
                    // options.Cfg['CanEdit'] = 1; //ibsheet 수정불가
                    if(this.mysite.length == 0) {
                        dataMerge = 2; //행 기준 병합
                        // data = [
                        //     {
                        //         'prjectName' : '조회된 데이터가 없습니다.',
                        //         'memberName' : '조회된 데이터가 없습니다.',
                        //         'jobPostOrdNo' : '조회된 데이터가 없습니다.',
                        //         'levelName' : '조회된 데이터가 없습니다.',
                        //         'leglEduYnName' : '조회된 데이터가 없습니다.',
                        //         'dpmtDt' : '조회된 데이터가 없습니다.',
                        //         'dpmtChangeDt' : '조회된 데이터가 없습니다.',
                        //         'comment' : '조회된 데이터가 없습니다.',
                        //         'qultToolYnName' : '조회된 데이터가 없습니다.',
                        //         'file' : '조회된 데이터가 없습니다.',
                        //     },
                        // ];
                    }else {
                        this.changeBtn = true;
                        this.qultIdList = [];
                        for(let i=0; i < this.mysite.length; i++) {
                            this.mysite[i]['levelName'] = this.mysite[i].level == 'EXPR' ? "특급" :
                                                            this.mysite[i].level == 'ADVC' ? "고급" :
                                                            this.mysite[i].level == 'MIDL' ? "중급" :
                                                            this.mysite[i].level == 'BGIN' ? "초급" :
                                                            this.mysite[i].level == 'NONE' ? "없음" : "";
                            this.mysite[i]['leglEduYnName'] = this.mysite[i].leglEduYn == "Y" ? "이수 완료" : "미 이수";
                            this.mysite[i]['qultToolYnName'] = this.mysite[i].qultToolYn == "Y" ? "O" : "";
                            this.mysite[i]['file']=this.mysite[i].fileCnt >0?"1":"0";
                            this.mysite[i]['jobPostOrdNo']=this.mysite[i]['jobTitle'];
                            this.qultIdList.push(this.mysite[i].memberId);
                        }
                        this.siteMstrId = this.mysite[0].siteMstrId;
                        data = this.mysite;
                        dataMerge = 0; //병합 X
                    }

                }else {
                    dataMerge = 2; //행 기준 병합
                    // data = [
                    //     {
                    //         'prjectName' : '조회된 데이터가 없습니다.',
                    //         'memberName' : '조회된 데이터가 없습니다.',
                    //         'jobPostOrdNo' : '조회된 데이터가 없습니다.',
                    //         'levelName' : '조회된 데이터가 없습니다.',
                    //         'leglEduYnName' : '조회된 데이터가 없습니다.',
                    //         'dpmtDt' : '조회된 데이터가 없습니다.',
                    //         'dpmtChangeDt' : '조회된 데이터가 없습니다.',
                    //         'comment' : '조회된 데이터가 없습니다.',
                    //         'qultToolYnName' : '조회된 데이터가 없습니다.',
                    //         'file' : '조회된 데이터가 없습니다.',
                    //     },
                    // ];
                }

                loader.createSheet({
                    el: 'qltyMngrSheetTable_mysite',
                    data: data,
                    options: {
                        Cfg : {
                            //CanEdit : 0,
                            DataMerge : dataMerge,
                            NoDataMessage:3,
                            NoVScroll: false,
                        },
                        Cols : cols,
                        Events : {
                            onAfterClick : this.fnCheck,
                            ondblclick : this.fnChoice
                        }
                    },
                }).then((sheet) => {
                    this.sheet = sheet
                });
            },
            allsiteList : async function() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/quailtyMngr/list';
                let param = {
                    "mngtType" : this.mngtType,
                    "projectName" : this.projectName,
                    "memberName" : this.memberName,
                    "majorName" : this.majorName,
                    "level" : this.level
                };

                const resData = await sendPostApi(url, param).then((result) => {
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });

                let data = [];
                let options = QualityAdmin2.options;

                let cols = [
                    { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
                    { Name: 'prjectName', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 16 },
                    { Name: 'memberName', Header: [{ Value: '성명', RowSpan: 2 }], RelWidth: 10 },
                    { Name: 'jobPostOrdNo', Header: [{ Value: '직급', RowSpan: 2 }], RelWidth: 10 },
                    { Name: 'levelName', Header: [{ Value: '등급', RowSpan: 2 }], RelWidth: 10 },
                    { Name: 'leglEduYnName', Header: [{ Value: '법정 교육 이수', RowSpan: 2 }], RelWidth: 6 },
                    { Name: 'dpmtDt', Header: [{ Value: '배치일자', Span: 2 }, { Value: '실제 배치일' }], RelWidth: 10 },
                    { Name: 'dpmtChangeDt', Header: [{}, { Value: '배치/변경 신고일 \n (인∙허가 기관)' }], RelWidth: 10 },
                    { Name: 'comment', Header: [{ Value: '비고', RowSpan: 2 }], RelWidth: 16 },
                    { Name: 'qultToolYnName', Header: [{ Value: '품질공구장', RowSpan: 2 }], RelWidth: 4 },
                    { Name: 'file', Header: [{ Value: '첨부파일', RowSpan: 2 }], RelWidth: 10, Format: {"0": "","1": "<button type='button' class='btn_file no_text'>파일</button>"}},
                ]

                options.Cols = cols;
                let dataMerge = 0;
                if(resData.rCode == "0000") {
                    this.mysite = resData.datas.resultList;

                    if(this.mysite.length == 0) {
                        dataMerge = 2; //행 기준 병합
                        data = [];
                    }else {
                        this.changeBtn = false;
                        for(let i=0; i < this.mysite.length; i++) {
                            this.mysite[i]['levelName'] = this.mysite[i].level == 'EXPR' ? "특급" :
                                                            this.mysite[i].level == 'ADVC' ? "고급" :
                                                            this.mysite[i].level == 'MIDL' ? "중급" :
                                                            this.mysite[i].level == 'BGIN' ? "초급" :
                                                            this.mysite[i].level == 'NONE' ? "없음" : "";
                            this.mysite[i]['leglEduYnName'] = this.mysite[i].leglEduYn == "Y" ? "이수 완료" : "미 이수";
                            this.mysite[i]['qultToolYnName'] = this.mysite[i].qultToolYn == "Y" ? "O" : "";
                            this.mysite[i]['file']=this.mysite[i].fileCnt >0?"1":"0";
                            this.mysite[i]['jobPostOrdNo']=this.mysite[i]['jobTitle'];
                            // this.qultIdList.push(this.mysite[i].memberId);
                        }
                        data = this.mysite;
                        dataMerge = 0; //병합 X
                    }

                }else {
                    dataMerge = 2; //행 기준 병합
                    data = [];
                }
                
                loader.createSheet({
                    el: 'qltyMngrSheetTable_allsite',
                    data: data,
                    options: {
                        Cfg : {
                            CanEdit : 0,
                            DataMerge : dataMerge,
                            NoDataMessage:3,
                            NoVScroll: false,
                        },
                        Cols : cols,
                        Events : {
                            onAfterClick : this.fnCheckAllSite,
                            ondblclick : this.fnChoice
                        }
                    },
                }).then((sheet) => {
                    this.sheetAll = sheet
                }); 
            },
            fnCheck : function(evtParam) { //ibsheet checkbox event
                if(evtParam.col == "chkBox") {
                    let chkBoxList = evtParam.sheet.getRowsByChecked("chkBox");
                    this.qultDeleteList = [];   

                    if(chkBoxList.length != 0) {
                        for(let i=0; i<chkBoxList.length; i++) {
                            let idx = chkBoxList[i].HasIndex - 1;
                            this.qultDeleteList.push(this.mysite[idx]);
                        }
                    }
                }
                if(evtParam.col =="file" && evtParam.row.file == 1){
                    if(!this.checkUser(this.userId,'down')){
                        return;
                    }
                    if(parseInt(evtParam.row.fileCnt)>1){
                        this.fnChoice(evtParam);
                    }else{
                        let element = document.createElement('a');
                        element.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/'+evtParam.row.fileComArcvId);
                        element.setAttribute('download',evtParam.row.orgFileName);
                        element.click();
                        element.remove();
                    }
                }
                // console.log(evtParam.row);
                // console.log(evtParam.row.fileCnt);
            },
            fnCheckAllSite : function(evtParam) { //ibsheet checkbox event
                if(evtParam.col =="file" && evtParam.row.file == 1){
                    if(parseInt(evtParam.row.fileCnt)>1){
                        this.fnChoice(evtParam);
                    }else{
                        let element = document.createElement('a');
                        element.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/'+evtParam.row.fileComArcvId);
                        element.setAttribute('download',evtParam.row.orgFileName);
                        element.click();
                        element.remove();
                    }
                }
                // console.log(evtParam.row);
                // console.log(evtParam.row.fileCnt);
            },
            fnChoice : function(evtParam) { //ibsheet click event
                if(this.currentTab == 0 && !this.checkUser(this.userId,'view')){
                    return;
                }
                let idx = evtParam.row.HasIndex - 1;
                // console.log('idx',idx);
                if(this.currentTab == 0){
                    this.qultDetailObj = this.mysite[idx];
                    // console.log(this.qultDetailObj);
                    this.qultDetailObj['changeChk'] = true;
                    // console.log(this.qultDetailObj);
                }else{
                    this.qultDetailObj = {
                        'siteMstrId':evtParam.row.siteMstrId,
                        'projectId':evtParam.row.projectId,
                        'siteId':evtParam.row.siteId,
                        'qultMngrId':evtParam.row.qultMngrId,
                        'memberId':evtParam.row.memberId,
                        'fileQltFileArcvId':evtParam.row.fileQltFileArcvId,
                        'majorId':evtParam.row.majorId,
                        'qultToolYn':evtParam.row.qultToolYn,
                        'memberName':evtParam.row.memberName,
                        'majorName':evtParam.row.majorName,
                        'level':evtParam.row.level,
                        'ovCsrtExp':evtParam.row.ovCsrtExp,
                        'leglEduYn':evtParam.row.leglEduYn,
                        'dpmtDt':evtParam.row.dpmtDt,
                        'dpmtChangeDt':evtParam.row.dpmtChangeDt,
                        'comment':evtParam.row.comment,
                        'files':evtParam.row.files,
                        'changeChk':false,
                    };
                }
                this.$root.$emit('bv::show::modal', 'qltyMngrAdminDetail');
            },
            endDetail : function(infoQult) { // 상세 팝업 닫기
                // console.log('changeBtn'+this.changeBtn+'changeChk'+infoQult['changeChk']);
                if(this.changeBtn && !infoQult['changeChk']) {
                    this.mysiteList();
                }else if(infoQult['changeCnt'] !=0 && this.currentTab != 1){
                    this.mysiteList();
                }
            },
            qultDeleteChk : function () {
                if(this.sheet.getRowsByChecked('chkBox').length == 0) {
                    // this.popMsg = "삭제할 품질관리자를 선택해주세요.";
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'qltyMngrAlert');
                    this.alert('선택된 행이 없습니다.');
                    return;
                }else{
                    // this.popMsg = "삭제하시겠습니까?";
                    this.confirmUse = false;
                    // this.deleteYn = true;
                    // this.$root.$emit('bv::show::modal', 'qltyMngrAlert');
                    this.confirm('삭제하시겠습니까?',this.qultDelete);
                    return;
                }
            },
            qultDelete : async function() { // 삭제 버튼 누를경우
                // console.log(123);
                this.deleteYn = false;
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/quailtyMngr/unuse';
                let param = {
                    "qultList" : this.qultDeleteList
                };

                const resData = await sendPostApi(url, param).then((result) => {
                    // console.log(result);
                    return result.data;
                }).catch((e) => {
                    // console.log(e);
                    return e.response.data;
                });

                if(resData.rCode == "0000") {
                    // this.popMsg = '삭제되었습니다.';
                    this.alert('삭제되었습니다.',()=>{
                        this.qultDeleteList = [];
                        this.mysiteList();
                    });
                }else{
                    // this.popMsg = '오류로 인해 삭제가 완료되지 않았습니다.';
                    this.alert('삭제에 실패했습니다.');
                    return;
                }
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'qltyMngrAlert');
            },
            qultWrite : function(){ // 등록 버튼 눌렀을 경우
                this.qultDetailObj = {};
                this.qultDetailObj['saveChk'] = true;
                this.$root.$emit('bv::show::modal', 'qltyMngrAdminWrite');
            },
            qultWriteClose : function() { //등록 팝업 닫기    djflakjdl;k
                this.$root.$emit('bv::hide::modal', 'qltyMngrAdminWrite'); 
                loader.removeSheet(sheetIdL);
                this.mysiteList();
            },
            excelDown : function() {
                this.alert('준비중입니다.');
                // let sheet = this.currentTab ==0 ?this.sheet:this.sheetAll;

                // sheet.down2Excel({
                //     SheetDesign: 1,
                //     // merge: 1,
                //     fileName: 'test.xlsx'
                // });
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['chkBox'].includes(item.Name) && !['file'].includes(item.Name)))
                }
                this.excelDownload.fileName  = `품질관리자_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true;
                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `품질관리자_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            printSheet:function(sheet){
                sheet.doPrint();
            }
        }
   }
</script>