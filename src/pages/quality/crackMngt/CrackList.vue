<template>
        <div class="tab_contents" @keyup.enter="sheetCreate">
            <!-- <h2 class="sub_title">균열관리 > 균열관리</h2>-->
            <Breadcrumb :currentPath="$route.fullPath" />
            <div class="lst_tabs">
                <ul>
                    <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" v-bind:key="index"><a
                                href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                </ul>
            </div>
            <div class="tab_area" v-show="currentTab == 0" v-on:shown="sheetCreate">
                <div class="lookup_box multi_line">
                    <table>
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
                                <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="docSeq" :maxlength="30"></td>
                                <th>구조물 및 타설부위</th>
                                <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="pourPart" :maxlength="100"></td>
                                <th>차수</th>
                                <td>
                                    <select name="" id="" class="form_control size_md" v-model="progressOrder">
                                        <option value="">전체</option>
                                        <option value="1ST">1차</option>
                                        <option value="2ND">2차</option>
                                        <option value="3RD">3차</option>
                                        <option value="REPR">보수</option>
                                        <option value="4TH">4차</option>
                                    </select>
                                </td>
                                <td class="ar">
                                    <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                                </td>
                            </tr>
                            <tr>
                                <th>진행상황</th>
                                <td>
                                    <select name="" id="" class="form_control size_md" v-model="crckStatus">
                                        <option value="">전체</option>
                                        <option value="REDY">조사대기</option>
                                        <option value="DELAY">지연</option>
                                        <option value="NONE">균열없음</option>
                                        <option value="RSCH">조사중</option>
                                        <option value="APVL">결재중</option>
                                        <option value="REPR_NONE">등록대기</option>
                                        <option value="REPR_REDY">보수/보강대기</option>
                                        <option value="END">종결</option>
                                    </select>
                                </td>
                                <th>이전조사일</th>
                                <td>
                                    <date-picker-range v-model="date"/>
                                    <!-- <DatepickerRange ref="datepickerRange" v-on:value-change="dateRangeChange" v-on:value-reset="dateRangeReset"/> -->
                                </td>
                                <th>차기조사일</th>
                                <td>
                                    <date-picker-range v-model="date2"/>
                                    <!-- <DatepickerRange ref="datepickerRange2" v-on:value-change="dateRangeChange2" v-on:value-reset="dateRangeReset2"/> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="inner">
                    <div class="button_box">
                        <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel(mySheet)">엑셀 다운로드</button>
                        <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                        <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="fn_showCrackMngtText">균열관리대장</button>
                        <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="qrCodeBtn">QR코드 일괄출력</button>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" v-on:click="fnCopyRow">타설복사</button>
                        </div>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 350px)'}">
                        <div id="crackListSheetTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>

            <div class="tab_area" v-show="currentTab == 1">
                <div class="lookup_box multi_line">
                    <table>
                        <colgroup>
                            <col width="6%">
                            <col width="24%">
                            <col width="6%">
                            <col width="24%">
                            <col width="5%">
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
                                    <input type="text" class="form_control" placeholder="입력해주세요" v-model="subProjNm" @keyup.enter="createSheetLst" :maxlength="100">
                                </div>    
                            </td>  
                            <th>프로젝트코드</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="subProjId" :maxlength="30"></td>                                
                            <th>공사기간</th>
                            <td>
                                <date-picker-range v-model="date3"/>
                                <!-- <DatepickerRange ref="datepickerRange3" v-on:value-change="dateRangeChange3" v-on:value-reset="dateRangeReset3"/> -->
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                            </td>
                            </tr>

                            <tr>
                            <th>현장명</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="subSiteNm" @keyup.enter="createSheetLst" :maxlength="100"></td>                 
                            <th>현장코드</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="subSiteId" @keyup.enter="createSheetLst" :maxlength="30"></td>                  
                            </tr>
                        </tbody>
                    </table>
               </div>
                <div class="inner">
                    <div class="button_box">
                        <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel(allSheet)">엑셀 다운로드</button>
                        <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 310px)'}">
                        <div id="crackListSheetTable2" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
            <!--
            <PartnerUserSearch 
                v-on:fn-partner-choice="partnerChoice" v-bind:member-id-list="memberIdList" 
            />
            <PartnerCompanySearch  v-on:fn-company-choice="companyChoice" v-bind:trade-type-name="tradeType"/>
            <SupplySelect  v-on:fn-supply-choice="supplyChoice"/>
            -->
            <PopAlert
                v-bind:msg="popMsg" v-bind:popId="popId" v-bind:confirm-use="confirmUse"
                v-on:first-btn-fn="closePop"
            />
            <excel-download
                v-model="excelDownload.request"
                ref-id="CrackList_ExcelDownload"
                :file-name="excelDownload.fileName"
                :options="excelDownload.options"
                :data="excelDownload.data"
            />
        </div>
</template>

<script>
    import loader from '@ibsheet/loader'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import API from '@/apis/'
    import { CrackList, ConcretePourstatus2 } from '../../common/data/MaterialsList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    // import DatepickerRange from '../../common/popup/DatepickerRange.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'

    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'
    
    let mySheet = '';
    let allSheet='';

    // import SupplySelect from '@/pages/common/popup/SupplySelect.vue' 
    // import PartnerUserSearch from '@/pages/common/popup/PartnerUserSearch.vue'
    // import PartnerCompanySearch from '@/pages/common/popup/PartnerCompanySearch.vue'

    export default {
        name: 'CrackList',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            // DatepickerRange,
            PopAlert,
            Breadcrumb,
            DatePickerRange,
            ExcelDownload,
            // SupplySelect,
            // PartnerUserSearch,
            // PartnerCompanySearch
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
                popMsg: '',
                popId: 'listAlert',
                confirmUse: false,
                siteMstrIdYn:false,                             //현장정보 ID 있는지확인
                insertLstYn:false,                              //타설복사용
                mySheet: null,
                allSheet:null,

                concPourDtlId: '',                              // 타설번호
                focusSiteMstrId : '',                           // 선택한 현장정보 Id
                focusCrckMngtInfoId: '',                        // 선택한 균열관리 id
                focusConcPourDtlId: '',                         // 선택한 타설번호
                focusConcPourSubNum: 0,                         // 선택한 타설 sub num
                selectedRow: null,                              // 선택된 열
                detailObj:[],                                   // 담는용

                // crackList: [],

                //검색조건
                docSeq: '',                                     // 문서번호
                structure: '',                                  // 구조물위치
                pourPart: '',                                   // 타설부위
                progressOrder: '',                              // 차수
                crckStatus: '',                                 // 진행상황
                subProjNm: '',                                  // 프로젝트명
                subProjId: '',                                  // 프로젝트 코드
                subSiteNm: '',                                  // 현장명
                subSiteId: '',                                  // 현장코드
                startDate: '',                                  // 시작일
                endDate: '',                                    // 종료일
                startDate2: '',                                  // 시작일
                endDate2: '',                                    // 종료일
                startDate3: '',                                  // 시작일
                endDate3: '',                                    // 종료일
                mngtType:'0',
                ozReport:{src : '',},
                date:[],
                date2:[],
                date3:[],
                userId:'',
                userType:'',

                //엑셀다운로드
                excelDownload : {
                    request : false,
                    fileName :'',
                    downloadOption :'',
                    options : null,
                    data : [],
                }

                // checkRow: false,
                // checkCrack: false,
                
                //memberIdList: [], // 선택한 사원 리스트
                // userId:'', // 선택한 사원 id
                // userNm:'', // 선택한 사원 name

                // tradeId:'',
                // tradeNm:'',
                // tradeType:'',

                // supplyId:'', //선택한 공급업체 id
                // supplyNm:'', //선택한 공급업체 name
            }
        },
        props: {
            // memberIdList : { //협력사 직원용
            //     type : Array,
            //     default : function() {
            //     return [];
            //     }
            // },
        },
        mounted() {
            this.userId = this.$store.getters['auth/getUserId'];
            this.userType = this.$store.getters['auth/getUserType'];
            if(this.userType == 'PTNR'){
                this.tabs= ['My Site'];
            }else{
                this.tabs= ['My Site', 'All Sites'];
            }
            this.sheetCreate();
        },
        beforeDestroy() {
            // loader.removeSheet(mySheet);
            // loader.removeSheet(allSheet);
        },
        watch:{
            currentTab:function(){
                this.filterReset();
                this.sheetCreate();
            }
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
                        this.sheetCreate();
                    }

                }).catch((e) => {
                    // //console.log(e);
                    return e.response;
                });
            }
        },
        methods: {
            sheetCreate: async function() {
                this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
                if(this.siteMstrId == null){
                    this.siteMstrIdYn = true;
                    // this.popMsg = '현장정보 아이디가 없습니다.\n 다시 로그인해주세요';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'listAlert');
                    this.alert(`현장정보 아이디가 없습니다.\n 다시 로그인해주세요.`,()=>{
                        this.$router.push({name: 'Login'});
                    });
                    return;
                }else{
                    this.focusCrckMngtInfoId = '';
                    /* 임시용 */
                    // requestOptions.headers['Accept-Language'] = "kr";
                    // requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                    //

                    // let url = '/sendApi/api/crackMngt/info/list';
                    
                    let param = {};

                    if(this.currentTab == 0){
                        param['siteMstrId'] = this.siteMstrId;

                        if(this.crckStatus !=''){//진행상태
                            param['crckStatus']=this.crckStatus;
                        }
                        if(this.progressOrder !=''){//차수
                            param['progressOrder']=this.progressOrder;
                        }
                        if(this.docSeq !=''){//타설번호
                            param['docSeq']=this.docSeq;
                        }
                        if(this.structure !=''){//구조물
                            param['structure']=this.structure;
                        }
                        if(this.pourPart !=''){//타설 부위
                            param['pourPart']=this.pourPart;
                        }
                        if(this.date.length>0){
                            param['startDate']=this.date[0];
                            param['endDate']=this.date[1];
                        }
                        if(this.date2.length>0){
                            param['startDate2']=this.date2[0];
                            param['endDate2']=this.date2[1];
                        }
                        // if(this.startDate !=''){//시작일1
                        //     param['startDate']=this.startDate;
                        // }
                        // if(this.endDate !=''){//종료일1
                        //     param['endDate']=this.endDate;
                        // }
                        // if(this.startDate2 !=''){//시작일2
                        //     param['startDate2']=this.startDate2;
                        // }
                        // if(this.endDate2 !=''){//종료일2
                        //     param['endDate2']=this.endDate2;
                        // }
                        // //console.log(this.startDate2);

                        const resData =  await API.crack.getcrackList(param,{
                            headers:{
                                'Authorization': this.$cookies.get("Authorization")
                            }
                        });

                        // const resData = await sendPostApi(url, param).then((result) => {
                        //     return result;
                        // }).catch((e) => {
                        //     return e.response.data;
                        // });
                        // //console.log(resData.data.resultList);

                        let data = resData.data.resultList;
                        let options = CrackList.options;
                        
                        //언어가 kr일때만, en일때는 추후 수정

                        // if(resData.statusText == 'OK' && data.length >0){
                        if(resData.status == 200 && data.length >0){
                            for(let x=0; x<data.length; x++){
                                data[x]['progressOrderNm']=((data[x]['progressOrder']=='1ST'&&data[x]['crckStatus']=='NONE')?'균열없음':(data[x]['progressOrder']=='1ST'?'1차':(data[x]['progressOrder']=='2ND'?'2차':(data[x]['progressOrder']=='3RD'?'3차':(data[x]['progressOrder']=='4TH'?(data[x]['crckStatus']=='END'?'-':'4차'):'보수')))));
                                // data[x]['rsltInsert'] = data[x].crckStatus == 'APVL'?'1':(data[x].crckStatus == 'REDY'?'0':(data[x].crckStatus == 'REPR_NONE'?'0':(data[x].crckStatus == 'NONE'?'':'1')));
                                data[x]['rsltInsert'] = data[x].crckStatus == 'APVL'?'1':(data[x].crckStatus == 'REDY'?'0':(data[x].crckStatus == 'REPR_NONE'?'0':'1'));
                            }

                            //맨 윗줄 값 가져오기
                            this.focusCrckMngtInfoId=data[0].crckMngtInfoId;
                            options.Events = {
                                onAfterClick: this.fnClick,
                                onDataLoad: this.progressBar,
                                ondblclick : this.fnDblClick,
                            };

                            // data[0].selectYn = 'Y'; //가장첫열 선택
                        }else{
                            data = [];
                            this.focusCrckMngtInfoId= '';
                        }
                        
                        loader.createSheet({
                            el: 'crackListSheetTable',
                            data: data,
                            options: options,
                        }).then((sheet) => {
                            // mySheet = sheet.id;
                            this.mySheet = sheet;
                            
                        });
                    }else{
                        if(this.mngtType != ''){
                            param['mngtType'] = this.mngtType;
                        }
                        if(this.subProjNm !=''){//프로젝트명
                            param['projectNm']=this.subProjNm;
                        }
                        if(this.subProjId !=''){//프로젝트코드
                            param['projectId']=this.subProjId;
                        }
                        if(this.subSiteNm !=''){//현장명
                            param['siteNm']=this.subSiteNm;
                        }
                        if(this.subSiteId !=''){//현장코드
                            param['siteId']=this.subSiteId;
                        }
                        // if(this.startDate3 !=''){//시작일
                        //     param['csrtStartDt']=this.startDate3;
                        // }
                        // if(this.endDate3 !=''){//종료일
                        //     param['csrtEndDt']=this.endDate3;
                        // }
                        if(this.date3.length>0){
                            param['csrtStartDt']=this.date3[0];
                            param['csrtEndDt']=this.date3[1];
                        }
                    
                        const resData2 =  await API.crack.getsiteList(param, {
                            headers:{
                                'Authorization': this.$cookies.get("Authorization")
                            }
                        });
                        // //console.log(resData2.statusText);
                        let data2 = resData2.data.datas.resultList;
                        let options2 = ConcretePourstatus2.options;

                        // if(resData2.statusText == 'OK' && data2.length >0){
                        if(resData2.status == 200 && data2.length >0){
                            options2.Events = {
                                onDblClick: this.fnSecondClick,
                                // onDataLoad: this.progressBar,
                            };
                            options2.Cols = [
                                { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4, CanEdit: 0 },
                                { Name: 'baseTypeNm', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                                { Name: 'csrtTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                                { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                                { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 15, CanEdit: 0 },
                                { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                                { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 15, CanEdit: 0 },
                                { Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작' }], RelWidth: 10, CanEdit: 0 },
                                { Name: 'csrtEndDt', Header: [{}, { Value: '종료' }], RelWidth: 10, CanEdit: 0 },
                                { Name: 'csrtMngrNm', Header: [{ Value: '현장소장', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                            ];
                            options2.Cfg = {
                                NoDataMessage:3,
                                NoVScroll: false,
                            };
                        }else{
                            data2 = [];
                            this.focusCrckMngtInfoId= '';
                        }

                        loader.createSheet({
                            el: 'crackListSheetTable2', //All Site
                            data: data2,
                            options: options2,
                        }).then((sheet)=>{
                            this.allSheet=sheet;
                        });
                    }
                }
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
                // if(evtParams.col == "rsltInsert" && evtParams.row.progressOrderNm!='균열없음'){
                if(evtParams.col == "rsltInsert"){
                    let param = {
                        'siteMstrId' :evtParams.row.siteMstrId,
                        'concPourDtlId': evtParams.row.concPourDtlId,
                        'concPourSubNum': evtParams.row.concPourSubNum,
                        'crckMngtInfoId': evtParams.row.crckMngtInfoId.toString(),
                    };
                    this.$router.push({
                        name : 'CrackInfoWrite',
                        params: param,
                    });
                }
                //// //console.log(this.focusCrckMngtInfoId);
                // if(evtParams.sheet.hasChangedData()){
                //     this.selectedRow = evtParams.row;
                //     // //console.log(evtParams.sheet.getChangedData());
                // }
                //this.focusPartnerName = evtParams.row.partnerNm;
                //// //console.log(evtParams);
                //evtParams.sheet.setValue(evtParams.row,'selectYn','Y');
            },
            fnDblClick: function(evtParam){
                // if(evtParam.col != "selectYn" && evtParam.row.progressOrderNm!='균열없음'){
                if(evtParam.col != "selectYn"){
                    let param = {
                        'siteMstrId' :evtParam.row.siteMstrId,
                        'concPourDtlId': evtParam.row.concPourDtlId,
                        'concPourSubNum': evtParam.row.concPourSubNum,
                        'crckMngtInfoId': evtParam.row.crckMngtInfoId.toString(),
                    };
                    this.$router.push({
                        name : 'CrackInfoWrite',
                        params: param,
                    });
                }
            },
            fnSecondClick: function(evt){
                this.focusSiteMstrId = evt.row.siteMstrId;
                this.$store.dispatch('setInformation', {
                    siteMstrId: this.focusSiteMstrId,
                })

                let blankTemp = this.$router.resolve({
                    name : 'CrackListAllSite',
                });
                window.open(blankTemp.href,'_blank');
            },
            fnCopyRow: async function(){
                this.popMsg = '';

                if(this.detailObj.length == 0){
                    // this.popMsg = '타설번호를 선택해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'listAlert');
                    this.alert('타설번호를 선택해주세요.');
                    return;
                }else{
                    // //console.log('dd');
                    let param = {};
                    param['concPourDtlId'] = this.detailObj[0].concPourDtlId;
                    param['siteMstrId'] = this.detailObj[0].siteMstrId;
                    param['concPourSubNum'] = this.detailObj[0].concPourSubNum;
                    try{
                        const rst = await API.crack.addCrackList(param);
                        // //console.log(rst.data.rCode);
                        if(rst.data.rCode == '0000'){
                            // this.popMsg = '타설복사가 완료되었습니다.';
                            // this.confirmUse = false;
                            // this.insertLstYn = true;
                            // this.$root.$emit('bv::show::modal', 'listAlert');
                            this.alert('타설복사가 완료되었습니다.',this.sheetCreate);
                            this.detailObj = [];
                            return;
                        }else{
                            throw new Error('something went wrong');
                        }
                    }catch(error){
                        // this.popMsg = '타설복사에 실패했습니다.';
                        // this.confirmUse = false;
                        // this.insertLstYn = false;
                        // this.$root.$emit('bv::show::modal', 'listAlert');
                        this.alert('타설복사에 실패했습니다.');
                    }
                    // this.mySheet.addRow(this.mySheet.getFirstRow());
                     /* 임시용 */
                    // requestOptions.headers['Accept-Language'] = "kr";
                    // requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                    // //
                    // var subNum = this.mySheet.getValue(this.selectedRow,"concPourSubNum");
                    // subNum = parseInt(subNum)+1;
                    // let url = '/sendApi/api/crackMngt/info/write';
                    // let param = {
                    //     "siteMstrId" : this.$cookies.get("siteMstrId"),
                    //     "concPourDtlId" : this.mySheet.getValue(this.selectedRow,"concPourDtlId"),
                    //     "concPourSubNum" : subNum,
                    // };
                    // const resData = await sendPostApi(url, param).then((result) => {
                    //     return result.data;
                    // }).catch((e) => {
                    //     // // //console.log(e);
                    //     return e.response.data;
                    // });

                    // if(resData.rCode == "0000") {
                    //     this.mySheet.renderBody();
                    //     //this.confirmUse = false;
                    //     //this.popMsg = '결재옵션이 적용되었습니다';
                    // }else {
                    //     this.confirmUse = false;
                    //     this.popMsg = resData.rMsg;
                    //     this.$root.$emit('bv::show::modal', 'setupAlert');
                    // }

                    // var row = this.mySheet.copyRow({row:this.mySheet.getRowById(this.selectedRow),next:this.mySheet.getRowById(this.selectedRow)});
                    // row["Visible"] = 1;
                    // this.mySheet.renderBody();
                }
                //// //console.log(this.mySheet.getFocusedRow());
            },
            fnCrackDtlView: function(){
                // //console.log('ddddd');
            },
            // fnCrackAccountBook: function(){
            //     if(this.checkRow === true && this.checkCrack === false){
            //         this.popMsg = '균열없음으로 처리된 타설입니다.';
            //         this.confirmUse = false;
            //         this.$root.$emit('bv::show::modal', 'popAlert');
            //     }
            //     if(this.checkRow === false && this.checkCrack === false){
            //         this.popMsg = '타설번호를 선택해주세요.';
            //         this.confirmUse = false;
            //         this.$root.$emit('bv::show::modal', 'popAlert');
            //     }
            //     if(this.checkRow === true && this.checkCrack === true){
            //         // //console.log('균열관리대장');
            //     }
            // },
            filterReset: function(){
                this.docSeq= '';
                this.structure= '';
                this.pourPart= '';
                this.progressOrder= '';
                this.crckStatus= '';
                this.subProjNm = '';
                this.subProjId = '';
                this.subSiteNm = '';
                this.subSiteId = '';
                this.mngtType = '0';
                this.date = [];
                this.date2 = [];
                this.date3 = [];
                // this.dateRangeReset();
                // this.dateRangeReset2();
                // this.dateRangeReset3();
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
                var orderArr = ['1ST', '2ND', '3RD', 'REPR', '4TH'];
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
                                }else if((sheetCell === 'REDY' || sheetCell === 'REPR_NONE') && new Date()>new Date(row.nextDt)){ // 지연일경우(임시)
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
                    // //console.log('텍스트'+sheetText);


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

                    row.crckStatusOrg = row.crckStatus

                    row.crckStatus = steps;

                    sheet.setMergeRange(row, "crckStatus", row, "crckStatus4"); // case10
                    row = sheet.getNextRow(row); // 다음행 return
                }
            },
            closePop : function() { //기본 팝업 닫기 event
                if(this.siteMstrIdYn){
                    this.$router.push({name: 'Login'});
                    return;
                }
                if(this.insertLstYn){
                    this.sheetCreate();
                }
                this.$root.$emit('bv::hide::modal', 'listAlert');
            },
            dateRangeChange: function(param){
                //console.log(param)
                this.startDate = param[0];
                this.endDate = param[1];
            },
            dateRangeReset: function(){
                this.startDate = null;
                this.endDate = null;
                this.$refs.datepickerRange.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            dateRangeChange2: function(param){
                this.startDate2 = param[0];
                this.endDate2 = param[1];
            },
            dateRangeReset2: function(){
                this.startDate2 = null;
                this.endDate2 = null;
                this.$refs.datepickerRange2.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            dateRangeChange3: function(param){
                this.startDate3 = param[0];
                this.endDate3 = param[1];
            },
            dateRangeReset3: function(){
                this.startDate3 = null;
                this.endDate3 = null;
                this.$refs.datepickerRange3.valueReset(); //DatepickerRange valueReset 함수 호출
            },
            partnerChoice : function(infoPartner){ //협력사 사원검색 후 event
                this.userNm = infoPartner.userNm;
                this.userId = infoPartner.userId;
                this.memberIdList = infoPartner.memberIdList;
            },
            companyChoice : function(infoCompany){ //협력사 검색 후 event
                this.tradeId = infoCompany.tradeId;
                this.tradeNm = infoCompany.tradeNm;
            },
            supplyChoice : function(infoSupply){ //공급업체 검색 후 event
                this.tradeId = infoSupply.tradeId;
                this.tradeNm = infoSupply.tradeNm;
            },
            qrCodeBtn() {
                /*
                var popUrl = "http://61.251.164.137:8080/oz80/sample/viewer/sample.jsp?SITE_MSTR_ID=" + this.$cookies.get("siteMstrId");
                var popOption = "top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no";
                window.open(popUrl, "CRACK_QR_ALL", popOption);
                */
                const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][37].jspNm
                + '&SITE_MSTR_ID=' + this.$store.getters['auth/getSiteMstrId'];
                //console.log(this.ozReport)
                window.open(this.ozReport.src, '_blank')
            },


            // 균열관리대장 문서
            fn_showCrackMngtText: function () {
                const selected = this.mySheet?.getRowsByChecked('selectYn')
                // validate
                if (selected.length === 0) {
                    this.alert('선택된 행이 없습니다.')
                    return
                }
                if ( selected[0].crckStatusOrg === 'NONE' || (selected[0].progressOrder === '1ST' && selected[0].crckStatusOrg === 'REDY') ) { 
                    this.alert(`균열 저장 이후부터 출력이 가능합니다.`)
                    return
                }

                // const ozUrl = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                let url     = this.$store.getters['auth/getOzTypeList'][25].jspNm
                            + '&siteMstrId=' + this.$store.getters['auth/getSiteMstrId']
                            + '&aprvInfoId=' + (selected[0].aprvInfoId ? selected[0].aprvInfoId : '')
                            + '&crckMngtInfoId=' + selected[0].crckMngtInfoId

                window.open(url, '_blank')    
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['selectYn'].includes(item.Name) && !['rsltInsert'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `균열관리_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true;

                // let sheet = this.currentTab == 0? this.mySheet:this.allSheet;
                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `균열관리${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            printSheet:function(){
                let sheet = this.currentTab == 0? this.mySheet:this.allSheet;
                sheet.doPrint();
            }
            
        }
    }
</script>