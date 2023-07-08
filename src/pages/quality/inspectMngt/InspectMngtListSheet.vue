<template>
    <div class="tab_contents">
        <!-- <h2 class="sub_title">검측관리 > 검측현황</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul>
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index">
                    <a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a>
                </li>
            </ul>
        </div>
        <div class="tab_area" v-show="currentTab == 0">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="6%">
                        <col width="20%">
                        <col width="9%">
                        <col width="20%">
                        <col width="9%">
                        <col width="20%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>검측 번호</th>   
                            <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="inptDoc" @keyup.enter="loadSheet" :maxlength="30"></td>
                            <th>검측내용/검측사항</th>
                            <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="inptCn" @keyup.enter="loadSheet" :maxlength="100"></td>
                            <th>위치 및 검측 부위</th>   
                            <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="inptLc" @keyup.enter="loadSheet" :maxlength="100"></td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="filterReset">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="loadSheet">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>대공종</th>
                            <td>
                                <select name="" id="" class="form_control size_md" v-model="mainCodeId" v-on:change="selectChange('main')">
                                    <option value="">전체</option>
                                    <option v-for="(item, oneIndex) in mainCodeCombo" v-bind:key="oneIndex" v-bind:value="item.mainCodeId">
                                        {{item.mainName}}
                                    </option>
                                </select>
                            </td>
                            <th>공종</th>
                            <td><select name="" id="midCode" class="form_control size_md" v-model="midCodeId" v-on:change="selectChange('mid')" :disabled="mainCodeId == '' || mainCodeId == null ? true : false">
                                    <option value="" selected>전체</option>
                                    <option v-for="(midItem, twoIndex) in midCodeCombo.filter(item => item.mainCodeId === mainCodeId)" v-bind:key="twoIndex" v-bind:value="midItem.midCodeId">
                                        {{midItem.midName}}
                                    </option>
                                </select>
                            </td>
                            <th>세부 공종</th>
                            <td><select name="" id="subCode" class="form_control size_md" v-model="subCodeId" :disabled="midCodeId == '' || midCodeId == null ? true : false">
                                    <option value="" selected>전체</option>
                                    <option v-for="(subItem, index) in subCodeCombo.filter(item => item.midCodeId === midCodeId)" v-bind:key="index" v-bind:value="subItem.subCodeId">
                                        {{subItem.subName}}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>검측 등록일</th>
                            <td>
                                <date-picker-range v-model="inptRegistDate"/>
                            </td>
                            <th>검측 요구일</th>
                            <td>
                                <date-picker-range v-model="inptDemandDate"/>
                            </td>
                            <th>검측일</th>
                            <td>
                                <date-picker-range v-model="inptDate"/>
                            </td>
                        </tr>
                        <tr>
                            <th>검측 통보일</th>
                            <td>
                                <date-picker-range v-model="inptDspthDate"/>
                            </td>
                            <th>진행상황</th>
                            <td>
                                <select name="" id="" class="form_control size_md" v-model="progrsSttus">
                                    <option value="">전체</option>
                                    <option v-for="(stts,lIndex) in status" :key="lIndex" :value="stts.value">{{stts.key}}</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel(inspListSheetMine)">엑셀 다운로드</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="ozReport1">검측대장</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="ozReport2">검측 요청, 결과 통보내용</button>
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray" @click="addInpt" v-b-tooltip.hover title="실시된 검측 사이에 넘버링을 끼워 넣을 경우 기능을 사용하세요" v-if="checkUser(userId,'write')">추가 검측</button>
                        <button type="button" class="btn btn_sm btn_darkgray" @click="copyInpt" v-b-tooltip.hover title="동일한 검측을 복사할 경우 기능을 사용하세요" v-if="checkUser(userId,'write')">검측 복사</button>
                        <button type="button" class="btn btn_sm btn_darkgray" @click="registInspect" v-if="checkUser(userId,'write')">등록</button>
                        <button type="button" class="btn btn_sm btn_darkblue" @click="signChk" v-if="checkUser(userId,'write')">결재 상신</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap" :style="{height: 'calc(100vh - 410px)'}">
                    <div id="sheetTable" class="ibsheet_table" style="height: 100%;" />
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
                                <input type="text" class="form_control" placeholder="입력해주세요" v-model="projNm" @keyup.enter="loadSheet" :maxlength="100">
                            </div>    
                        </td>  
                        <th>프로젝트코드</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="projId" @keyup.enter="loadSheet" :maxlength="30"></td>                                
                        <th>공사기간</th>
                        <td>
                            <date-picker-range v-model="date"/>
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="loadSheet">검색</button>
                        </td>
                        </tr>

                        <tr>
                        <th>현장명</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteNm" @keyup.enter="loadSheet" :maxlength="100"></td>                 
                        <th>현장코드</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteId" @keyup.enter="loadSheet" :maxlength="30"></td>                  
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel(inspListSheetAll)">엑셀 다운로드</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" :style="{height: 'calc(100vh - 310px)'}">
                    <div id="sheetTable2" class="ibsheet_table" style="height: 100%;" />
                </div>
            </div>
        </div>
        <PopAlert
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
        <approve
            ref-id="inptApproveModal"
            doc-type="INPT"
            :code-type="approve.codeType"
            :code-dtl-type="approve.codeDtlType"
            :main-code-id="approve.mainCodeId"
            :mid-code-id="approve.midCodeId"
            :request-id="approve.requestId"
            :doc-name="approve.docName"
            :doc-seq="approve.docSeq"
            :file-type="approve.fileType"
            :site-mstr-id="approve.siteMstrId"
            @callback="fn_setSourceApproval"
            alertable
        />
        <excel-download
            v-model="excelDownload.request"
            ref-id="InspectMngtListSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>
</template>

<script>
   import DatePickerRange from '@component/common/DatePickerRange.vue'
   import loader from '@ibsheet/loader'
   import { InptSttusMySiteHead, InptSttusAllSiteHead } from '@/pages/common/data/InptOptnList'
   import API from '@/apis/'
   import { sendPostApi, requestOptions } from '@/apis/common'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'
   import axios from 'axios'
   import Approve from '@modal/approval/Approve.vue'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
   import ExcelDownload from '@component/common/ExcelDownload.vue'

   export default {
        name: 'InspectMngtListSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            DatePickerRange,
            PopAlert,
            Approve,
            Breadcrumb,
            ExcelDownload,
        },
        data() {
            return {
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
                footerBg: 'transparent',
                categoryData: [],
                categoryDataSub:[],
                categoryList:[],
                
                mainCodeCombo : [],
                midCodeCombo : [],
                subCodeCombo : [],
                mainCodeId : '',
                mainName   : '',
                midCodeId  : '',
                midName    : '',
                subCodeId  : '',
                subName    : '',

                mounted: false,
                popMsg:'',
                confirmUse: false,                             // 알림창 버튼개수
                popId:'InptListAlert',                     // 알림창 Id
                inspListSheetMine:null,
                inspListSheetAll:null,
                siteMstrId:'',
                inptDoc:'',
                inptCn:'',
                inptLc:'',
                inptRegistDate:[],
                inptDemandDate:[],
                inptDate:[],
                inptDspthDate:[],
                inptRegistDateFr:'',
                inptRegistDateTo:'',
                inptDemandDateFr:'',
                inptDemandDateTo:'',
                inptDateFr:'',
                inptDateTo:'',
                inptDspthDateFr:'',
                inptDspthDateTo:'',
                progrsSttus:'',
                status: [
                    {'value':'INRG','key':'검측등록',},
                    {'value':'INVL','key':'시공사 검측 중',},
                    {'value':'INWT','key':'결재 중(요청서)',},
                    {'value':'SVWT','key':'통보서 작성대기',},
                    {'value':'SVRV','key':'통보서 작성완료',},
                    {'value':'APVL','key':'결재 중(통보서)',},
                    {'value':'APRV','key':'완료',},
                ],

                projNm: '',                                     // 프로젝트명
                projId: '',                                     // 프로젝트 코드
                siteNm: '',                                     // 현장명
                siteId: '',                                     // 현장코드
                date:[],
                mngtType:'0',
                detailObj:{},
                focusSiteMstrId:'',
                chkYn:false,
                copyYn:false,
                approve: {
                    codeType: 'INPT',
                    codeDtlType: 'CREQ',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: null,
                },
                ozValue:{
                    siteMstrId:'',
                    siteInptDetailId:'',
                    inptDoc:'',
                    inptCn:'',
                    inptLc:'',
                    mainCodeId:'',
                    midCodeId:'',
                    midName:'',
                    inptRegistDateFr:'',
                    inptRegistDateTo:'',
                    inptDemandDateFr:'',
                    inptDemandDateTo:'',
                    inptDateFr:'',
                    inptDateTo:'',
                    inptDspthDateFr:'',
                    inptDspthDateTo:'',
                    subCodeId:'',
                },
                ozReport:{src : '',},
                ozData : [],
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
            }
        },
        async mounted() {
            await this.getCategoryData();
            this.mounted = true;
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];

            this.userId = this.$store.getters['auth/getUserId'];
            this.userType = this.$store.getters['auth/getUserType'];
            if(this.userType == 'PTNR'){
                this.tabs= ['My Site'];
            }else{
                this.tabs= ['My Site', 'All Sites'];
            }
            this.filterReset();
            if (this.$route.params.progrsSttus){
                this.progrsSttus = this.$route.params.progrsSttus
            }
            this.loadSheet();
        },
        beforeDestroy() {
            // loader.removeSheet('inspListSheet1');
            // loader.removeSheet('inspListSheet2');
        },
        watch:{
            currentTab:function(){
                // loader.removeSheet('inspListSheet1');
                // loader.removeSheet('inspListSheet2');
                this.loadSheet();
            },
            mainCodeId : function(){
                if (this.mounted) {
                    if(this.mainCodeId == '' || this.mainCodeId == null){
                        document.getElementById('midCode').setAttribute('disabled', true);
                    }else{
                        document.getElementById('midCode').removeAttribute('disabled');
                    }
                }
            },
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
                        this.mounted = true;
                        this.siteMstrId = this.$cookies.get('siteMstrId');
                        this.filterReset();
                        this.loadSheet();
                    }

                }).catch((e) => {
                    // console.log(e);
                    return e.response;
                });
            }
        },
        methods: {
            async getCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                // let url = '/sendApi/api/common/codeCategory/list';
                let url = '/sendApi/api/common/cntrwkType/list';
                let param = { codeType: 'INPT' };
                
                try {
                    const data = await sendPostApi(url, param);
                    // this.categoryData = data.list;
                    // for(let x = 0; x<this.categoryData.length; x++){
                    //     this.categoryList.push(this.categoryData[x].mainCodeId);
                    // }
                    if( data.status == '200' ) {
                        this.mainCodeCombo = data.data.dlMainCode;
                        this.midCodeCombo  = data.data.dlMidCode;
                        this.subCodeCombo  = data.data.dlSubCode;
                    }
                } catch (error) {
                    console.log(error.response.data)
                }
            },
            loadSheet: async function(){
                // loader.removeSheet('inspListSheet1');
                // loader.removeSheet('inspListSheet2');
                if(this.currentTab == 0){
                    let data = [];
                    let options = InptSttusMySiteHead.options;

                    options.Cfg = {NoVScroll: 0, NoDataMessage: 3,}

                    this.ozValue = {
                        siteMstrId:this.siteMstrId,
                        siteInptDetailId:this.siteInptDetailId,
                        inptDoc:this.inptDoc,
                        inptCn:this.inptCn,
                        inptLc:this.inptLc,
                        mainCodeId:this.mainCodeId,
                        midCodeId:this.midCodeId,
                        midName:'',
                        inptRegistDateFr:this.inptRegistDate[0],
                        inptRegistDateTo:this.inptRegistDate[1],
                        inptDemandDateFr:this.inptDemandDate[0],
                        inptDemandDateTo:this.inptDemandDate[1],
                        inptDateFr:this.inptDate[0],
                        inptDateTo:this.inptDate[1],
                        inptDspthDateFr:this.inptDspthDate[0],
                        inptDspthDateTo:this.inptDspthDate[1],
                        subCodeId:this.subCodeId,
                    };
                    let param = {
                        'siteMstrId':this.siteMstrId,
                    };
                    if(this.inptDoc != null&& this.inptDoc != ''){
                        param['inptDoc'] = this.inptDoc;
                    }
                    if(this.inptCn != null&& this.inptCn != ''){
                        param['inptCn'] = this.inptCn;
                    }
                    if(this.inptLc != null&& this.inptLc != ''){
                        param['inptLc'] = this.inptLc;
                    }
                    if(this.mainCodeId != null&& this.mainCodeId != ''){
                        param['mainCodeId'] =this.mainCodeId;
                    }
                    if(this.midCodeId != null&& this.midCodeId != ''){
                        param['midCodeId'] = this.midCodeId;
                    }
                    if(this.subCodeId != null&& this.subCodeId != ''){
                        param['subCodeId'] = this.subCodeId;
                    }
                    if(this.progrsSttus != null&& this.progrsSttus != ''){
                        param['progrsSttus'] = this.progrsSttus;
                    }
                    if(this.inptRegistDate.length>0){
                        param['inptRegistDateFr'] = this.inptRegistDate[0];
                        param['inptRegistDateTo'] = this.inptRegistDate[1];
                    }
                    if(this.inptDemandDate.length>0){
                        param['inptDemandDateFr'] = this.inptDemandDate[0];
                        param['inptDemandDateTo'] = this.inptDemandDate[1];
                    }
                    if(this.inptDate.length>0){
                        param['inptDateFr'] = this.inptDate[0];
                        param['inptDateTo'] = this.inptDate[1];
                    }
                    if(this.inptDspthDate.length>0){
                        param['inptDspthDateFr'] = this.inptDspthDate[0];
                        param['inptDspthDateTo'] = this.inptDspthDate[1];
                    }

                    let rst = await API.inspect.inptSttusMySiteList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    // console.log(rst);
                    if(rst.data.rCode == '0000'){
                        data = rst.data.datas.dlMySite;
                        var itemArr = ['INRG','INVL','INWT','SVWT','SVRV','APVL','APRV'];
                        for(let x = 0; x<data.length; x++){
                            let i = itemArr.indexOf(data[x].progrsSttus);
                            // console.log(data[x].progrsSttus);
                            // console.log(i);
                            data[x]['viewYn'] = '1';
                            data[x]['requireYn'] = i==0?'0':'1';
                            data[x]['noticeYn'] = i<3?'2':(i==3?'0':'1');
                            // if( data[x].progrsSttus == 'INRG' || data[x].progrsSttus == 'INVL'){
                            //     data[x]['noticeYn'] = (i>0 && data[x].dspthSaveYn == 'Y')?'1':'2';
                            // } else {
                            //     data[x]['noticeYn'] = (i>0 && data[x].dspthSaveYn == 'Y')?'1':'0';
                            // }
                        }
                    }


                    loader.createSheet({
                        el: 'sheetTable',
                        // id:'inspListSheet1',
                        data: data,
                        options: {
                            Cfg: options.Cfg,
                            Cols: options.Cols,
                            Events: {
                                onDataLoad: this.progressEvt,
                                onAfterClick:this.fnClick,
                                onDblClick: this.fnDblClick,
                            }
                        },
                    }).then((sheet) => {
                        this.inspListSheetMine = sheet;
                    });
                } else {
                    let param = {};
                    if(this.mngtType != ''){
                        param['mngtType'] = this.mngtType;
                    }
                    if(this.projNm !=''){//프로젝트명
                        param['projectNm']=this.projNm;
                    }
                    if(this.projId !=''){//프로젝트코드
                        param['projectId']=this.projId;
                    }
                    if(this.siteNm !=''){//현장명
                        param['siteNm']=this.siteNm;
                    }
                    if(this.siteId !=''){//현장코드
                        param['siteId']=this.siteId;
                    }
                    if(this.date.length>0){
                        param['csrtStartDt']=this.date[0];
                        param['csrtEndDt']=this.date[1];
                    }
                    const resData2 =  await API.crack.getsiteList(param, {
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });

                    let data2 = resData2.data.datas.resultList;
                    let options2 = InptSttusAllSiteHead.options;

                    // if(resData2.statusText == 'OK' && data2.length >0){
                    if(resData2.status == 200 && data2.length >0){
                        options2.Events = {
                            onDblClick: this.fnSecondClick,
                            // onDataLoad: this.progressBar,
                        };
                    } else {
                        data2 = [];
                    }

                    loader.createSheet({
                        el: 'sheetTable2',
                        // id:'inspListSheet2',
                        data: data2,
                        options: options2
                    }).then((sheet) => {
                        this.inspListSheetAll = sheet;
                    });
                }
            },
            progressEvt: function(evtParam) {
                // console.log('dd');
                var sheet = evtParam.sheet;
                var row = sheet.getFirstRow(); // 첫번째 row
                var sheetText = ''; 
                var sheetNum = 0, sheetClass = ''; // 1차
                var sheetNum2 = 0, sheetClass2 = ''; // 2차

                var sheetCell; 
                // var itemArr = ['INRG','INVL','SDVL','SVWT','SVVL','APVL','APRV'];
                var itemArr = ['INRG','INVL','INWT','SVWT','SVRV','APVL','APRV'];
                // var itemArr = ['검측 등록', '검측 중', '상신 대기', '결재 중', '결재반려', '완료'];
                var numArr = [6, 13, 23, 32, 40, 45, 50];
                
                while (row != null) { // return row 반복
                    sheetNum, sheetNum2 = 0; 
                    
                    if(row.progrsSttus) {
                        sheetCell = row.progrsSttus;
                        
                        itemArr.forEach(function(val, idx) {
                            if(sheetCell === val) { // cell 값 일치할 경우
                                sheetText = row.progrsSttusName;
                                if(parseInt(row.inptOrder) == 2){
                                    sheetNum = 50;
                                    sheetNum2 = numArr[idx];
                                    sheetClass = 'complete';
                                    sheetClass2 = (sheetCell === 'APRV'?'complete':'');
                                }else{
                                    sheetNum = numArr[idx];
                                    sheetNum2 = 0;
                                    sheetClass = (sheetCell === 'APRV'?'complete':'');
                                    sheetClass2 = '';
                                }
                                // sheetNum = numArr[idx];

                                // if(idx === (numArr.length - 1)) { // itemArr[last] 일 경우
                                //     sheetClass = 'complete';
                                //     sheetClass2 = '';
                                // }else { 
                                //     sheetClass = '';
                                //     sheetClass2 = '';
                                // }
                            }
                        })
                    }
                    // else if(row.progrsSttus2 && parseInt(row.inptOrder) == 2) {
                    //     sheetCell = row.progrsSttus;

                    //     itemArr.forEach(function(val, idx) {
                    //         if(sheetCell === val) { // cell 값 일치할 경우
                    //             sheetText = val;
                    //             sheetNum = 50;
                    //             sheetNum2 = numArr[idx];

                    //             if(idx === (numArr.length - 1)) { // itemArr[last] 일 경우
                    //                 sheetClass = 'complete';
                    //                 sheetClass2 = 'complete';
                    //             }else { 
                    //                 sheetClass = '';
                    //                 sheetClass2 = '';
                    //             }
                    //         }
                    //     })
                    // }
                    else {
                        sheetText = '';
                        sheetNum = '', sheetClass = '';
                        sheetNum2 = '', sheetClass2 = '';
                    }


                    var itemEvt = function(item) {
                        (item === 1) ? item += 'px' : item += '%';
                        return item;
                    };
                    
                    var steps = '<div class="guage">'+
                        '<span class="bar_wrap">' +
                            '<span class=\'bar '+sheetClass+'\' style=\'width:'+itemEvt(sheetNum)+';\'></span>' + 
                            '<span class=\'bar '+sheetClass2+'\' style=\'width:'+itemEvt(sheetNum2)+';\'></span>' + 
                        '</span>'+
                        '<span class="label" style=\'width:'+(sheetNum + sheetNum2)+'%\'>'+sheetText+'</span>' +
                    '</div>'

                    row['progrsSttusNm'] = steps;
                

                    sheet.setMergeRange(row, "progrsSttusNm", row, "progrsSttusNm2"); // case14: 1차, case15: 2차
                    row = sheet.getNextRow(row); // 다음행 return
                }
            },
            fnClick:function(evt){
                // console.log(evt.row);
                this.$store.dispatch('setInformation', {})
                if(evt.col == 'selectYn'){//라디오버튼
                    this.detailObj = {
                        'siteMstrId' : evt.row.siteMstrId,
                        'siteInptDetailId' : evt.row.siteInptDetailId,
                        'copyInptSeq' : evt.row.copyInptSeq,
                        'inptOrder' : evt.row.inptOrder,
                        'progrsSttus' : evt.row.progrsSttus,
                        'inptDoc' : evt.row.inptDoc,
                        'dspthInptDoc' : evt.row.dspthInptDoc,
                        'mainCodeId' : evt.row.mainCodeId,
                        'midCodeId' : evt.row.midCodeId,
                        'aprvOptnType' : evt.row.aprvOptnType,
                        'orgnSiteInptDetailId' : evt.row.orgnSiteInptDetailId,
                        'inptRequstDocFileId' : evt.row.inptRequstDocFileId,
                        'siteInptChkTitle' : evt.row.siteInptChkTitle,
                    };
                }
                if(evt.col == 'viewYn'){//검측정보
                    if(!this.checkUser(this.userId,'view')){
                        return;
                    }
                    let param = {
                        'siteMstrId' :evt.row.siteMstrId,
                        'siteInptDetailId':evt.row.siteInptDetailId,
                        'copyInptSeq':evt.row.copyInptSeq,
                    };
                    this.$router.push({
                        name : 'InspectMngtInfoView',
                        params: param,
                    });
                }
                if(evt.col == 'requireYn' && (evt.row.requireYn == '0' || evt.row.requireYn == '1')){//검측요청서
                    if(evt.row.requireYn == '0' && !this.checkUser(this.userId,'write')){
                        return;
                    }else if(evt.row.requireYn == '1' && !this.checkUser(this.userId,'view')){
                        return;
                    }
                    let param = {
                        'siteMstrId' :evt.row.siteMstrId,
                        'siteInptDetailId':evt.row.siteInptDetailId,
                        'copyInptSeq':evt.row.copyInptSeq,
                    };
                    this.$router.push({
                        name : 'InspectMngtReqstWrite',
                        params: param,
                    });
                }
                if(evt.col == 'noticeYn' && (evt.row.noticeYn == '0'|| evt.row.noticeYn == '1')){//검측통보서
                    if(evt.row.requireYn == '0' && !this.checkUser(this.userId,'write')){
                        return;
                    }else if(evt.row.requireYn == '1' && !this.checkUser(this.userId,'view')){
                        return;
                    }
                    let param = {
                        'siteMstrId' :evt.row.siteMstrId,
                        'siteInptDetailId':evt.row.siteInptDetailId,
                        'copyInptSeq':evt.row.copyInptSeq,
                    };
                    this.$router.push({
                        name : 'InspectMngtNoticeWrite',
                        params: param,
                    });
                }
            },
            filterReset: function(){
                this.inptDoc='';
                this.inptCn='';
                this.inptLc='';
                this.mainCodeId='';
                this.midCodeId='';
                this.subCodeId= '';
                this.inptRegistDate=[];
                this.inptDemandDate=[];
                this.inptDate=[];
                this.inptDspthDate=[];
                this.inptRegistDateFr='';
                this.inptRegistDateTo='';
                this.inptDemandDateFr='';
                this.inptDemandDateTo='';
                this.inptDateFr='';
                this.inptDateTo='';
                this.inptDspthDateFr='';
                this.inptDspthDateTo='';
                this.progrsSttus='';

                this.projNm= '';
                this.projId= '';
                this.siteNm= '';
                this.siteId= '';  
                this.date=[];
                this.mngtType='0';
            },
            addInpt:async function(){
                this.copyYn = false;
                let row = this.inspListSheetMine.getRowsByChecked('selectYn')[0];
                // console.log("row = ", row.copyInptSeq);
                //if(Object.keys(this.detailObj).length === 0 && JSON.stringify(this.detailObj) === JSON.stringify({})){
                if(!row) {
                    // this.copyYn = false;
                    // this.popMsg = '선택된 행이 없습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'InptListAlert');
                    this.alert('선택된 행이 없습니다.');
                    return;
                } else if(parseInt(row.copyInptSeq) > 0){
                    // this.popMsg = '추가 검측번호는 추가검측할 수 없습니다.';
                    // this.confirmUse = false;
                    // this.copyYn = false;
                    // this.$root.$emit('bv::show::modal', 'InptListAlert');
                    this.alert('추가 검측번호는 추가검측할 수 없습니다.');
                    return;
                } else {
                    // console.log(parseInt(this.detailObj.copyInptSeq));
                    let copyData =  await API.inspect.inptSttusAditWrite(this.detailObj, {
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    // console.log(copyData);
                    if(copyData.data.count >0){
                        // this.popMsg = '검측을 추가하였습니다.';
                        // this.confirmUse = false;
                        // this.copyYn = true;
                        // this.$root.$emit('bv::show::modal', 'InptListAlert');
                        this.alert('추가검측하였습니다.',this.loadSheet);
                        return;
                    }else{
                        // this.popMsg = '오류로 인해 검측이 추가되지 않았습니다.';
                        // this.confirmUse = false;
                        // this.copyYn = false;
                        // this.$root.$emit('bv::show::modal', 'InptListAlert');
                        this.alert('추가검측에 실패했습니다.');
                        return;
                    }
                }
            },
            copyInpt:async function(){
                let row = this.inspListSheetMine.getRowsByChecked('selectYn')[0];
                //if(Object.keys(this.detailObj).length === 0 && JSON.stringify(this.detailObj) === JSON.stringify({})){
                if(!row) {
                    // this.popMsg = '선택된 행이 없습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'InptListAlert');
                    this.alert('선택된 행이 없습니다.');
                    return;
                } else {
                    this.detailObj['copyYn'] = true;
                    // console.log(this.detailObj);
                    this.$router.push({
                        name : 'InspectMngtInfoWrite',
                        params: {'detailObj':this.detailObj},
                    });

                    // let docSeq = '/sendApi/api/docNum/selectDocNumSeq';
                    // let write = '/sendApi/api/inptMngt/inptSttus/inptSttusInptCopy/write';
                    // let payload = {
                    //     siteMstrId: this.siteMstrId,
                    //     codeType: 'INPT',
                    //     codeDtlType: 'CREQ',
                    //     gjmcd:  this.detailObj.mainCodeId,
                    //     gjscd: this.detailObj.midCodeId,
                    //     aprvOptnType: this.detailObj.aprvOptnType,
                    //     docType: '',
                    // };
                    // const options = {
                    //     headers: {
                    //         'Authorization': this.$cookies.get('Authorization'),
                    //         'Content-Type': 'application/json',
                    //         'Accept-Language': 'ko'
                    //     }
                    // }
                    // axios.post(docSeq, payload, options)
                    // .then(response => {
                    //     axios.post(
                    //         write,
                    //         {
                    //             ...payload,
                    //             siteMstrId:this.detailObj.siteMstrId,
                    //             copyInptSeq:this.detailObj.copyInptSeq,
                    //             inptOrder:this.detailObj.inptOrder,
                    //             siteInptDetailId:this.detailObj.siteInptDetailId,
                    //             inptDoc: response.data,
                    //             // siteMstrId:this.siteMstrId,
                    //             // mainCodeId:this.mainCodeId,
                    //             // midCodeId:this.midCodeId,
                    //             // inptLc:this.inptLc,
                    //             // inptCn:this.inptCn,
                    //             // ccpyId:this.ccpyId,
                    //             // ccpyName:this.ccpyName,
                    //             // siteInptChkId:this.siteInptChkId,
                    //             // drw:this.drw,
                    //         }, 
                    //         options)
                    //         .then(writeRes => {
                    //             console.log(writeRes)
                    //             if(writeRes.data.count >0){
                    //                 this.popMsg = '검측을 복사하였습니다.';
                    //                 this.copyYn = true;
                    //                 this.confirmUse = false;
                    //                 this.$root.$emit('bv::show::modal', 'InptListAlert');
                    //                 return;
                    //             }else{
                    //                 throw new Error(error)
                    //             }
                    //         })
                    //         .catch(error => {
                    //             // throw new Error(error)
                    //             console.error(error);

                    //             this.popMsg = '오류로 인해 검측이 복사되지 않았습니다.';
                    //             this.confirmUse = false;
                    //             this.copyYn = false;
                    //             this.$root.$emit('bv::show::modal', 'InptListAlert');
                    //             return;
                    //         })
                    // })
                    // .catch(error => {
                    //     console.error(error);

                    //     this.copyYn = false;
                    //     this.popMsg = '오류로 인해 검측이 복사되지 않았습니다.';
                    //     this.confirmUse = false;
                    //     this.$root.$emit('bv::show::modal', 'InptListAlert');
                    //     return;
                    // })

                    //
                    // let copyData2 =  await API.inspect.inptSttusInptCopyWrite(this.detailObj, {
                    //     headers:{
                    //         'Authorization': this.$cookies.get("Authorization")
                    //     }
                    // });
                    // console.log(copyData2);
                    // if(copyData2.data.count >0){
                    //     this.popMsg = '검측을 추가하였습니다.';
                    //     this.confirmUse = false;
                    //     this.copyYn = true;
                    //     this.$root.$emit('bv::show::modal', 'InptListAlert');
                    // }else{
                    //     this.popMsg = '오류로 인해 검측이 추가되지 않았습니다.';
                    //     this.confirmUse = false;
                    //     this.copyYn = false;
                    //     this.$root.$emit('bv::show::modal', 'InptListAlert');
                    // }
                }
            },
            signChk: function(){
                const row = this.inspListSheetMine.getRowsByChecked('selectYn')[0];
                
                if( !row ) {
                    this.alert('선택된 행이 없습니다.');
                    return;
                } else if(row.progrsSttus == 'INRG') {
                    this.alert('검측 요청서가 작성이 되지 않았습니다.');
                    return;
                } else if(row.progrsSttus == 'INWT' || row.progrsSttus == 'SVWT' || row.progrsSttus == 'SVRV' || row.progrsSttus == 'APVL' || row.progrsSttus == 'APRV') {
                    this.alert('결재상신 중이거나 완료 상태 입니다.');
                    return;
                // } else if(row.progrsSttus == 'INRG' || row.progrsSttus == 'INVL') {
                //     this.alert('검측 통보서 작성이 되지 않았습니다.');
                //     return;
                // } else if(row.progrsSttus == 'APRV' || row.progrsSttus == 'APVL') {
                //     this.alert('결재중이거나 완료된 조사입니다.');
                //     return;
                } else {
                    //console.log(this.detailObj.progrsSttus);
                    this.approve.mainCodeId     = this.detailObj.mainCodeId;
                    this.approve.midCodeId      = this.detailObj.midCodeId;
                    this.approve.docSeq         = this.detailObj.inptDoc;
                    this.approve.siteMstrId     = this.detailObj.siteMstrId ? this.detailObj.siteMstrId : null;

                    this.approve.requestId      = this.detailObj.inptRequstDocFileId;
                    this.approve.fileType       = 'InspectMngt';

                    if(this.detailObj.inptOrder.toString() == '1'){
                        // if(this.detailObj.progrsSttus == 'INVL'){
                            this.approve.codeDtlType = 'CREQ';
                            this.approve.docName = '1차 검측요청, 통보서';
                        // }else{
                        //     this.approve.codeDtlType = 'CRES';
                        //     this.approve.docName = '1차 검측통보서';
                        // }
                    } else {
                        // if(this.detailObj.progrsSttus == 'INVL'){
                            this.approve.codeDtlType = 'CREQ';
                            this.approve.docName = '2차 검측요청서, 통보서';
                        // }else{
                        //     this.approve.codeDtlType = 'CRES';
                        //     this.approve.docName = '2차 검측통보서';
                        // }
                    }
                    this.$bvModal.show('inptApproveModal');
                    // this.chkYn = true;
                    // this.popMsg = '결재상신하시겠습니까?';
                    // this.confirmUse = true;
                    // this.$root.$emit('bv::show::modal', 'InptListAlert');
                }
            },
            fnSign: async function(){
                // console.log('결재상신');
                this.copyYn = false;
                let approveDoc= '/sendApi/api/approv/approvedDoc/write';
                let requstDocAprvRecomWrite = '/sendApi/api/inptMngt/inptSttus/requstDocAprvRecom/write';
                // 통보서
                
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }
                const payload = {
                    siteMstrId: this.siteMstrId,
                    codeType: 'INPT',
                    codeDtlType: 'CREQ',
                    gjmcd: this.detailObj.mainCodeId,
                    gjscd: this.detailObj.midCodeId,
                    aprvOptnType: this.detailObj.aprvOptnType,
                    docType: '',
                }
                let url = '';
                // if(this.detailObj.progrsSttus == 'INVL'){
                    url = requstDocAprvRecomWrite;
                    payload['codeDtlType'] = 'CREQ';
                // }else if(this.detailObj.progrsSttus == 'SVVL'){
                //     console.log('통보');
                //     payload['codeDtlType'] = 'CRES';
                // }

                axios.post(
                    approveDoc, 
                    {
                        dmApprvDoc: {
                            ...payload,
                            docSeq: this.inptDoc,
                        },
                    }, 
                    options)
                    .then(aprvRes => {
                        // console.log(aprvRes)
                        axios.post(
                            url,
                            {
                                ...payload,
                                inptDoc: this.detailObj.inptDoc,
                                ...aprvRes.data.datas.dmApprvDoc,
                                //
                                'siteMstrId':this.detailObj.siteMstrId,
                                'copyInptSeq':this.detailObj.copyInptSeq,
                                'siteInptDetailId':this.detailObj.siteInptDetailId,
                                'requstAprvInfoId':aprvRes.data.datas.dmApprvDoc.aprvInfoId,
                                'dspthAprvInfoId':aprvRes.data.datas.dmApprvDoc.aprvInfoId,
                            },
                            options                                    
                            )
                            .then(setCrackInfoRes => {
                                
                                // console.log(setCrackInfoRes)
                                
                                // this.copyYn = true;
                                // this.detailObj = [];
                                // this.popMsg = '결재상신 되었습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'InptListAlert');
                                this.alert('결재상신 되었습니다.',this.loadSheet);
                                return;
                            })
                            .catch(error => {
                                console.error(error)

                                // this.copyYn = false;
                                // // this.detailObj = [];
                                // this.popMsg = '결재상신에 실패했습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'InptListAlert');
                                this.alert('결재상신에 실패했습니다.');
                                return;
                            })

                })
                .catch(error => {
                    // throw new Error(error)
                    console.error(error)

                    // this.copyYn = false;
                    // // this.detailObj = [];
                    // this.popMsg = '결재상신에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'InptListAlert');
                    this.alert('결재상신에 실패했습니다.');
                    return;
                })
            },
            fn_setSourceApproval: function (payload) {
                // console.log(payload)
                this.signYn =false;//초기화
                this.copyYn = false;

                const url = '/sendApi/api/inptMngt/inptSttus/requstDocAprvRecom/write';
                const _payload = {
                    ...payload,
                    inptDoc: this.detailObj.inptDoc,
                    // ...payload.data.datas.dmApprvDoc,
                    'progrsSttus':'',
                    'siteMstrId':this.detailObj.siteMstrId,
                    'copyInptSeq':this.detailObj.copyInptSeq,
                    'siteInptDetailId':this.detailObj.siteInptDetailId,
                    'requstAprvInfoId':this.detailObj.inptOrder.toString() == '1'?payload.aprvInfoId:'',
                    'dspthAprvInfoId':this.detailObj.inptOrder.toString() == '1'?'':payload.aprvInfoId,
                    'sanctnMthd' : payload.aprvOptnType
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(url, _payload, options)
                .then(res => {
                    // console.log(res)
                                        
                    // this.copyYn = true;
                    // this.detailObj = [];
                    // this.popMsg = '결재상신 되었습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'InptListAlert');
                    this.alert('결재상신 되었습니다.',this.loadSheet);
                    return;
                })
                .catch(error => {
                    console.error(error)
                    
                    // this.copyYn = false;
                    // // this.detailObj = [];
                    // this.popMsg = '결재상신에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'InptListAlert');
                    this.alert('결재상신에 실패했습니다.');
                    return;
                })
            },
            fnSecondClick: function(evt){
                this.focusSiteMstrId = evt.row.siteMstrId;
                this.$store.dispatch('setInformation', {
                    siteMstrId: this.focusSiteMstrId,
                })

                let blankTemp = this.$router.resolve({
                    name : 'InspectMngtListAllSite',
                });
                window.open(blankTemp.href,'_blank');
            },
            fnDblClick:function(evt){
                if(evt.col != 'selectYn'&& evt.col !='noticeYn'&& evt.col !='viewYn'&&evt.col !='requireYn'){//라디오버튼
                    if(!this.checkUser(this.userId,'view')){
                        return;
                    }
                    let param = {
                        'siteMstrId' :evt.row.siteMstrId,
                        'siteInptDetailId':evt.row.siteInptDetailId,
                        'copyInptSeq':evt.row.copyInptSeq,
                    };
                    this.$router.push({
                        name : 'InspectMngtInfoView',
                        params: param,
                    });
                }
            },
            selectChange: function(type){
                if( type == 'main' ){
                    this.midCodeId = ''
                    this.subCodeId = ''
                } else if( type == 'mid' ){
                    this.subCodeId = ''
                }
                // let a = this.categoryList.indexOf(this.mainCodeId);
                
                // if(a > -1){
                //     this.categoryDataSub = this.categoryData[a].midCodeList;
                //     this.midCodeId = ''
                // }else{
                //     this.categoryDataSub = []
                //     this.midCodeId = ''
                // }
            },
            registInspect:function(){
                this.$router.push({name: 'InspectMngtInfoWrite'});
            },
            alertConfirmFn:function(){
                if(this.copyYn){
                    this.copyYn = false;
                    this.loadSheet();
                }
                else if(this.chkYn){
                    this.chkYn = false;
                    this.fnSign();
                }
                this.$root.$emit('bv::hide::modal', 'InptListAlert');
            },
            closePop:function(){
                this.chkYn = false;
                this.$root.$emit('bv::hide::modal', 'InptListAlert');
            },
            ozReport1: function(){
                // console.log(this.ozValue);
                this.ozValue.siteInptDetailId = typeof(this.ozValue.siteInptDetailId) == 'undefined'?'':this.ozValue.siteInptDetailId;
                this.ozValue.inptDoc = typeof(this.ozValue.inptDoc) == 'undefined'?'':this.ozValue.inptDoc;
                this.ozValue.inptCn = typeof(this.ozValue.inptCn) == 'undefined'?'':this.ozValue.inptCn;
                this.ozValue.inptLc = typeof(this.ozValue.inptLc) == 'undefined'?'':this.ozValue.inptLc;
                this.ozValue.mainCodeId = typeof(this.ozValue.mainCodeId) == 'undefined'?'':this.ozValue.mainCodeId;
                this.ozValue.midCodeId = typeof(this.ozValue.midCodeId) == 'undefined'?'':this.ozValue.midCodeId;
                this.ozValue.midName = typeof(this.ozValue.midName) == 'undefined'?'':this.ozValue.midName;
                this.ozValue.inptRegistDateFr = typeof(this.ozValue.inptRegistDateFr) == 'undefined'?'':this.ozValue.inptRegistDateFr;
                this.ozValue.inptRegistDateTo = typeof(this.ozValue.inptRegistDateTo) == 'undefined'?'':this.ozValue.inptRegistDateTo;
                this.ozValue.inptDemandDateFr = typeof(this.ozValue.inptDemandDateFr) == 'undefined'?'':this.ozValue.inptDemandDateFr;
                this.ozValue.inptDemandDateTo = typeof(this.ozValue.inptDemandDateTo) == 'undefined'?'':this.ozValue.inptDemandDateTo;
                this.ozValue.inptDateFr = typeof(this.ozValue.inptDateFr) == 'undefined'?'':this.ozValue.inptDateFr;
                this.ozValue.inptDateTo = typeof(this.ozValue.inptDateTo) == 'undefined'?'':this.ozValue.inptDateTo;
                this.ozValue.inptDspthDateFr = typeof(this.ozValue.inptDspthDateFr) == 'undefined'?'':this.ozValue.inptDspthDateFr;
                this.ozValue.inptDspthDateTo = typeof(this.ozValue.inptDspthDateTo) == 'undefined'?'':this.ozValue.inptDspthDateTo;
                this.ozValue.subCodeId = typeof(this.ozValue.subCodeId) == 'undefined'?'':this.ozValue.subCodeId;
                
                // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH;
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][26].jspNm
                + '&siteMstrId=' + this.ozValue.siteMstrId
                + '&siteInptDetailId=' + this.ozValue.siteInptDetailId
                + '&inptDoc=' + this.ozValue.inptDoc
                + '&inptCn=' + this.ozValue.inptCn
                + '&inptLc=' + this.ozValue.inptLc
                + '&mainCodeId=' + this.ozValue.mainCodeId
                + '&midCodeId=' + this.ozValue.midCodeId
                + '&midName=' + this.ozValue.midName
                + '&inptRegistDateFr=' + this.ozValue.inptRegistDateFr
                + '&inptRegistDateTo=' + this.ozValue.inptRegistDateTo
                + '&inptDemandDateFr=' + this.ozValue.inptDemandDateFr
                + '&inptDemandDateTo=' + this.ozValue.inptDemandDateTo
                + '&inptDateFr=' + this.ozValue.inptDateFr
                + '&inptDateTo=' + this.ozValue.inptDateTo
                + '&inptDspthDateFr=' + this.ozValue.inptDspthDateFr
                + '&inptDspthDateTo=' + this.ozValue.inptDspthDateTo
                + '&subCodeId=' + this.ozValue.subCodeId;
                
                // console.log(this.ozReport)
                window.open(this.ozReport.src, '_blank')
                
                // this.alert('준비중입니다.');
            },
            ozReport2:function(){
                let row = this.inspListSheetMine.getRowsByChecked('selectYn')[0];
                if(!row) {
                    // this.copyYn = false;
                    this.alert('선택된 행이 없습니다.');
                    return;
                }else if(row.progrsSttus != 'APRV'){
                    this.alert(`결재 완료 되지 않은 항목은 \n 출력이 불가능합니다.`);
                    return;
                }else{
                    let url = this.$store.getters['auth/getOzTypeList'][27].jspNm
                            + '&siteMstrId='+this.siteMstrId
                            + '&siteInptDetailId='+row.siteInptDetailId;
                    window.open(url, '_blank')
                }
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['selectYn'].includes(item.Name) && !['viewYn'].includes(item.Name) && !['requireYn'].includes(item.Name) && !['noticeYn'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `검측현황_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true

                // let sheet = this.currentTab == 0?this.inspListSheetMine:this.inspListSheetAll;
                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `검측현황_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            printSheet:function(){
                let sheet = this.currentTab == 0?this.inspListSheetMine:this.inspListSheetAll;
                sheet.doPrint();
            }
        }
   }
</script>