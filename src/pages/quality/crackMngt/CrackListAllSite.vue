<template>
        <div class="tab_contents"  v-on:shown="createSheet"  @keyup.enter="createSheet">
            <h2 class="sub_title pb20">균열 리스트</h2>
            <div class="tab_area">
                <div class="lookup_box multi_line">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="5%">
                            <col width="22%">
                            <col width="9%">
                            <col width="22%">
                            <col width="6%">
                            <col width="22%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>타설번호</th>   
                                <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="subDocSeq" :maxlength="30"></td>
                                <th>구조물 및 타설부위</th>
                                <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="subPourPart"  :maxlength="100"></td>
                                <th></th>
                                <td></td>
                                <!-- <th>차수</th>
                                <td>
                                    <select name="" id="" class="form_control size_md" v-model="subProgressOrder">
                                        <option value="">전체</option>
                                        <option value="1차">1차</option>
                                        <option value="2차">2차</option>
                                        <option value="3차">3차</option>
                                        <option value="보수/보강">보수</option>
                                        <option value="4차">4차</option>
                                    </select>
                                </td> -->
                                <td class="ar">
                                    <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="createSheet">검색</button>
                                </td>
                            </tr>
                            <!-- <tr>
                                <th>진행상황</th>
                                <td>
                                    <select name="" id="" class="form_control size_md" v-model="subCrckStatus">
                                        <option value="">전체</option>
                                        <option value="REDY">조사대기</option>
                                        <option value="DELAY">지연</option>
                                        <option value="NONE">균열없음</option>
                                        <option value="RSCH">조사중</option>
                                        <option value="APRV">결재중</option>
                                        <option value="REPR_NONE">등록대기</option>
                                        <option value="REPR_REDY">보수/보강대기</option>
                                        <option value="END">종결</option>
                                    </select>
                                </td>
                                <th>이전조사일</th>
                                <td>
                                    <DatepickerRange />
                                </td>
                                <th>차기조사일</th>
                                <td>
                                    <DatepickerRange />
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>

                <div class="inner">
                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel(allSiteSheet)">엑셀 다운로드</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 310px)'}">
                        <div id="allSiteSheetTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
            <PopAlert
                v-bind:msg="popMsg" v-bind:popId="popId" v-bind:confirm-use="confirmUse"
                v-on:first-btn-fn="closePop"
            />
            <excel-download
                v-model="excelDownload.request"
                ref-id="CrackListAllSite_ExcelDownload"
                :file-name="excelDownload.fileName"
                :options="excelDownload.options"
                :data="excelDownload.data"
            />
        </div>
</template>

<script>
   import loader from '@ibsheet/loader'
   import { CrackList2 } from '../../common/data/MaterialsList'
   import { mapGetters } from 'vuex'
   import API from '@/apis/'
//    import DatepickerRange from '../../common/popup/DatepickerRange.vue'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import ExcelDownload from '@component/common/ExcelDownload.vue'

   let allSiteSheetId = '';

   export default {
        name: 'CrackListAllSite',
        mixins: [MsgBoxMixins],
        components: {
            PopAlert,
            ExcelDownload,
            // DatepickerRange,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0,                              // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'],             // tab name
                popMsg: '',
                popId: 'allSiteAlert',
                confirmUse: false,
                allSiteSheet:null,                          // 시트명
                siteMstrId:'',                              // 현장정보 Id
                focusCrckMngtInfoId:'',                     //선택된 Id

                //검색조건
                subDocSeq: '',                              // 타설번호
                subStructure: '',                                  // 구조물위치
                subPourPart: '',                                   // 타설부위
                subProgressOrder: '',                              // 차수
                subCrckStatus: '',                                 // 진행상황

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
            this.createSheet();
        },
        beforeDestroy() {
            // loader.removeSheet(allSiteSheetId);
        },
        computed:{
            ...mapGetters({
                'information': 'getInformation'
            })
        },
        activated(){
            // keepAlive 재조회 처리
            if(this.$store.getters['tabInfo/getSavePage'].length > 0){
                
                //keepAlive 재조회 처리
                let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
                let url="/sendApi/api/programMngt/menuChildProgram/list"
                let reSearch = false;
                let param = {"menuMngtId":menuid}; 
                
                // sdave정보가 있는지 체크하여 처리
                sendPostApi(url, param).then((result) => {
                    // 하부 페이지 정보
                    for (let i = 0; i < result.data.dlprogram.length ; i++){
                        // 저장 페이지 정보와 비교
                        for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                            if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                                this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);

                                reSearch = true;
                                break;
                            }
                        }

                        if(reSearch){
                            break;
                        }
                    }

                    if(reSearch){
                        this.createSheet();
                    }

                }).catch((e) => {
                    // //console.log(e);
                    return e.response;
                });
            }
        },
        methods: {
            createSheet: async function(){
                //console.log(this.information.siteMstrId);
                this.siteMstrId = this.information.siteMstrId;

                let param ={};
                param['siteMstrId'] = this.siteMstrId;
                param['progressOrder']='4TH';
                param['crckStatus']='END';
                
                // if(this.subCrckStatus !=''){//진행상태
                //     param['crckStatus']=this.subCrckStatus;
                // }
                // if(this.subProgressOrder !=''){//차수
                //     param['progressOrder']=this.subProgressOrder;
                // }
                if(this.subDocSeq !=''){//타설번호
                    param['docSeq']=this.subDocSeq;
                }
                if(this.subStructure !=''){//구조물
                    param['structure']=this.subStructure;
                }
                if(this.subPourPart !=''){//타설 부위
                    param['pourPart']=this.subPourPart;
                }

                const resData =  await API.crack.getcrackList(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                let data = resData.data.resultList;
                let options = CrackList2.options;
                // if(resData.statusText == 'OK' && resData.data.resultList.length>0){
                if(resData.status == 200 && resData.data.resultList.length>0){
                    for(let x =0; x<data.length;x++){
                        //console.log(data[x].crckStatus);
                        data[x]['progressOrderNm']=((data[x]['progressOrder']=='1ST'&&data[x]['crckStatus']=='NONE')?'균열없음':(data[x]['progressOrder']=='1ST'?'1차':(data[x]['progressOrder']=='2ND'?'2차':(data[x]['progressOrder']=='3RD'?'3차':(data[x]['progressOrder']=='4TH'?(data[x]['crckStatus']=='END'?'-':'4차'):'보수')))));
                        data[x]['rsltInsert'] = data[x].crckStatus == 'APVL'?'1':(data[x].crckStatus == 'END'?'1':(data[x].crckStatus == 'NONE'?'1':''));
                    }
                    //맨 윗줄 값 가져오기
                    this.focusCrckMngtInfoId=data[0].crckMngtInfoId;
                    options.Events = {
                        onAfterClick: this.fnClick,
                        // onDataLoad: this.progressBar,
                        ondblclick : this.fnDblClick
                    };
                }else{
                    data = [];
                    this.focusCrckMngtInfoId='';
                }
                loader.createSheet({
                    el: 'allSiteSheetTable',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    // allSiteSheetId = sheet.id;
                    this.allSiteSheet = sheet;
                });
            },
            fnClick: function(evtParams){//셀 클릭할때마다
                let tempLst = {};
                if(evtParams.col == 'selectYn'){
                    this.focusCrckMngtInfoId = evtParams.row.crckMngtInfoId;
                    tempLst['crckMngtInfoId'] = evtParams.row.crckMngtInfoId;
                    tempLst['concPourDtlId'] = evtParams.row.concPourDtlId;
                    tempLst['siteMstrId'] = evtParams.row.siteMstrId;
                    tempLst['concPourSubNum'] = evtParams.row.concPourSubNum+1;
                    this.detailObj[0] = tempLst;
                }
                // //console.log(evtParams.row.crckStatus);
                if(evtParams.col == "rsltInsert" && evtParams.row.progressOrderNm!='균열없음'){
                    let param = {
                        'siteMstrId' :evtParams.row.siteMstrId,
                        'concPourDtlId': evtParams.row.concPourDtlId,
                        'concPourSubNum': evtParams.row.concPourSubNum,
                        'crckMngtInfoId': evtParams.row.crckMngtInfoId.toString(),
                        'allSiteYn':true,
                    };
                    this.$router.push({
                        name : 'CrackDetailBlank',
                        params: param,
                    });
                }
            },
            fnDblClick: function(evtParams){//셀 클릭할때마다
                let param = {
                    'siteMstrId' :evtParams.row.siteMstrId,
                    'concPourDtlId': evtParams.row.concPourDtlId,
                    'concPourSubNum': evtParams.row.concPourSubNum,
                    'crckMngtInfoId': evtParams.row.crckMngtInfoId.toString(),
                    'allSiteYn':true,
                };
                this.$router.push({
                    name : 'CrackDetailBlank',
                    params: param,
                });
            },
            progressBar: function(evtParam){
                var sheet = evtParam.sheet;
                var row = sheet.getFirstRow(); // 첫번째 row
                var sheetText = ''; 
                var sheetNum = 0; 
                var sheetClass = ''; // 등록, 회신, 확인

                var sheetCell; 
                var itemArr = ['REDY', 'REPR_NONE', 'RSCH', 'REPR_REDY', 'APVL', 'NONE', 'END'];
                var nameArr = ['조사 대기', '등록 대기', '조사 중', '보수/보강 대기', '결재 중', '균열 없음', '종결'];
                var orderArr = ['1차', '2차', '3차', '보수/보강', '4차'];
                var itemNumArr = [3, 3, 9, 9, 16, 0, 20];
                var orderNumArr = [0,20,40,60,80];
                
                while (row != null) { // return row 반복
                    sheetNum = 0;

                    if(row.crckStatus) {
                        sheetCell = row.crckStatus;

                        orderArr.forEach(function(val, idx) {
                            if(row.progressOrder === val) { // cell 값 일치할 경우
                                sheetNum = orderNumArr[idx];//차수 기준 등록
                                itemArr.forEach(function(sVal,sIdx){
                                    if(sheetCell === sVal){
                                        sheetText = nameArr[sIdx];
                                        sheetNum += itemNumArr[sIdx];
                                    }
                                })

                                if(sheetCell === 'END') { // itemArr[last] 일 경우
                                    sheetClass = 'complete';
                                }else if((sheetCell === 'REDY' || sheetCell === 'REPR_NONE') && new Date()>=new Date(row.nextDt)){ // 지연일경우(임시)
                                    sheetClass = 'warning';
                                    sheetText = '지연';
                                }else { 
                                    sheetClass = '';
                                }
                            }
                        })
                    }else{
                        sheetText = '';
                        sheetNum = '', sheetClass = '';
                    }


                    var itemEvt = function(item) {
                        (item === 1) ? item += 'px' : item += '%';
                        return item;
                    };
                    
                    var steps = '<div class="guage">'+
                        '<span class="bar_wrap">' +
                            '<span class=\'bar '+sheetClass+'\' style=\'width:'+itemEvt(sheetNum)+';\'></span>' + 
                        '</span>'+
                        '<span class="label" style=\'width:'+sheetNum+'%\'>'+sheetText+'</span>' +
                    '</div>'

                    row.crckStatus = steps;

                    // sheet.setMergeRange(row, "crckStatus", row, "crckStatus4"); // case10
                    row = sheet.getNextRow(row); // 다음행 return
                }
            },
            filterReset: function(){
                this.subDocSeq= '';
                this.subStructure= '';
                this.subPourPart= '';
                this.subProgressOrder= '';
                this.subCrckStatus= '';
                this.dateRangeReset();
            },
            closePop : function() { //기본 팝업 닫기 event
                this.$root.$emit('bv::hide::modal', 'allSiteAlert');
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['selectYn'].includes(item.Name) && !['rsltInsert'].includes(item.Name)))
                }
                this.excelDownload.fileName  = `균열관리_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true;
                
                // this.allSiteSheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `균열관리_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            printSheet:function(){
                this.allSiteSheet.doPrint();
            }
        }
   }
</script>