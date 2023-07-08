<template>
    <div class="tab_contents">
        <h2 class="sub_title pb20">검측관리 > 검측현황</h2>

        <div class="tab_area">
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
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel()">엑셀 다운로드</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap" :style="{height: 'calc(100vh - 310px)'}">
                    <div id="sheetTable" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div>
        </div>

        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />

        <excel-download
            v-model="excelDownload.request"
            ref-id="InspectMngtListAllSite_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>
</template>

<script>
   import DatePickerRange from '@component/common/DatePickerRange.vue'
   import loader from '@ibsheet/loader'
   import { InptSttusMySiteHead } from '@/pages/common/data/InptOptnList'
   import API from '@/apis/'
   import { sendPostApi, requestOptions } from '@/apis/common'
   import PopAlert from '@/pages/common/popup/PopAlert.vue'
   import { mapGetters } from 'vuex'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
   import ExcelDownload from '@component/common/ExcelDownload.vue'

   export default {
        name: 'InspectMngtListAllSite',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            DatePickerRange,
            PopAlert,
            ExcelDownload,
        },
        data() {
            return {
                footerBg: 'transparent',
                categoryData: [],
                categoryDataSub:[],
                categoryList:[],
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
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
                mainCodeId:'',
                midCodeId:'',
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
                mngtType:'',
                detailObj:{},

                //엑셀다운로드
                excelDownload : {
                    request : false,
                    fileName :'',
                    downloadOption :'',
                    options : null,
                    data : [],
                },

                mainCodeCombo : [],
                midCodeCombo : [],
                subCodeCombo : [],
                mainCodeId : '',
                mainName   : '',
                midCodeId  : '',
                midName    : '',
                subCodeId  : '',
                subName    : '',
            }
        },
        computed:{
            ...mapGetters({
                'information': 'getInformation'
            })
        },
        async mounted() {
            await this.getCategoryData();
            this.mounted = true;
            this.filterReset();
            this.loadSheet();
        },
        beforeDestroy() {
            // loader.removeSheet('inspListSheetAll1');
        },
        watch:{
            currentTab:function(){
                // loader.removeSheet('inspListSheetAll1');
                this.loadSheet();
            },
            mainCodeId : function(){
                if (this.mounted) {
                    if(this.mainCodeId == '' || this.mainCodeId == null){
                        document.getElementById('midCode').setAttribute('disabled',true);
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
                        // this.filterReset();
                        this.loadSheet();
                    }

                }).catch((e) => {
                    // console.log(e);
                    return e.response;
                });
            }
        },
        methods: {
            loadSheet: async function(){
                // loader.removeSheet('inspListSheetAll1');
                // console.log(this.information.siteMstrId);
                this.siteMstrId = this.information.siteMstrId;

                let data = [];
                let options = InptSttusMySiteHead.options;
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'progrsSttus':'APRV',
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
                        data[x]['requireYn']= i==0?'0':'1';
                        data[x]['noticeYn'] = i<3?'2':(i==3?'0':'1');
                    }
                }

                loader.createSheet({
                    el: 'sheetTable',
                    // id:'inspListSheetAll1',
                    data: data,
                    options: {
                        Cfg: options.Cfg,
                        Cols: options.Cols,
                        Events: {
                            onDataLoad: this.progressEvt,
                            onAfterClick:this.fnClick,
                            ondblclick:this.fnDblClick,
                        }
                    },
                }).then((sheet) => {
                    this.inspListSheetMine = sheet;
                    sheet.hideCol('selectYn');
                });
                // console.log(this.information.siteMstrId);
            },
            progressEvt: function(evtParam) {
                var sheet = evtParam.sheet;
                var row = sheet.getFirstRow(); // 첫번째 row
                var sheetText = ''; 
                var sheetNum = 0, sheetClass = ''; // 1차
                var sheetNum2 = 0, sheetClass2 = ''; // 2차

                var sheetCell; 
                var itemArr = ['INRG','INVL','INWT','SVWT','SVRV','APVL','APRV'];
                // var itemArr = ['검측 등록', '시공사 검측중', '요청서 발송중', '감리단 검측대기', '감리단 검측중', '결재중', '완료'];
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
                    else{
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
                if(evt.col == 'viewYn'){//검측정보
                    let param = {
                        'siteMstrId' :evt.row.siteMstrId,
                        'siteInptDetailId':evt.row.siteInptDetailId,
                        'copyInptSeq':evt.row.copyInptSeq,
                        'allSiteYn':true,
                    };
                    this.$router.push({
                        name : 'InspectMngtInfoAllSite',
                        params: param,
                    });
                }
                if(evt.col == 'requireYn' && (evt.row.requireYn == '0' || evt.row.requireYn == '1')){//검측요청서
                    let param = {
                        'siteMstrId' :evt.row.siteMstrId,
                        'siteInptDetailId':evt.row.siteInptDetailId,
                        'copyInptSeq':evt.row.copyInptSeq,
                        'allSiteYn':true,
                    };
                    this.$router.push({
                        name : 'InspectMngtReqstAllSite',
                        params: param,
                    });
                }
                if(evt.col == 'noticeYn' && (evt.row.noticeYn == '0'|| evt.row.noticeYn == '1')){//검측통보서
                    let param = {
                        'siteMstrId' :evt.row.siteMstrId,
                        'siteInptDetailId':evt.row.siteInptDetailId,
                        'copyInptSeq':evt.row.copyInptSeq,
                        'allSiteYn':true,
                    };
                    this.$router.push({
                        name : 'InspectMngtNoticeAllSite',
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
                if(Object.keys(this.detailObj).length === 0 && JSON.stringify(this.detailObj) === JSON.stringify({})){
                    this.popMsg = '추가검측할 검측을 선택하세요.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'InptListAlert');
                }else{
                    // console.log('추가검측');
                }
            },
            copyInpt:async function(){
                if(Object.keys(this.detailObj).length === 0 && JSON.stringify(this.detailObj) === JSON.stringify({})){
                    this.popMsg = '복사할 검측을 선택하세요.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'InptListAlert');
                }else{
                    // console.log('검측복사');
                }
            },
            signChk: async function(){
                if(Object.keys(this.detailObj).length === 0 && JSON.stringify(this.detailObj) === JSON.stringify({})){
                    this.popMsg = '결재 상신할 검측을 선택하세요.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'InptListAlert');
                }else if(this.detailObj.progrsSttus =='INRG'||this.detailObj.progrsSttus =='SVWT'){
                    this.popMsg = '검측 결과가 입력되지 않았습니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'InptListAlert');
                }else if(this.detailObj.progrsSttus =='SDVL'||this.detailObj.progrsSttus =='APRV'||this.detailObj.progrsSttus =='APVL'){
                    this.popMsg = '결재중이거나 완료된 조사입니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'InptListAlert');
                }else{
                    // console.log('결재상신');
                }
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
                        'allSiteYn':true,
                    };
                    this.$router.push({
                        name : 'InspectMngtInfoAllSite',
                        params: param,
                    });
                }
            },
            selectChange: function(){
                if( type == 'main' ){
                    this.midCodeId = ''
                    this.subCodeId = ''
                } else if( type == 'mid' ){
                    this.subCodeId = ''
                }
                // let a = this.categoryList.indexOf(this.mainCodeId);
                // console.log(a);
                // if(a > -1){
                //     this.categoryDataSub = this.categoryData[a].midCodeList;
                //     this.midCodeId = ''
                // }else{
                //     this.categoryDataSub = []
                //     this.midCodeId = ''
                // }
                // console.log(this.categoryDataSub);
            },
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
            registInspect:function(){
                this.$router.push({name: 'InspectMngtInfoWrite'});
            },
            alertConfirmFn:function(){
                this.$root.$emit('bv::hide::modal', 'InptListAlert');
            },
            closePop:function(){
                this.$root.$emit('bv::hide::modal', 'InptListAlert');
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function () {
                let sheet = this.inspListSheetMine;
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['selectYn'].includes(item.Name) && !['viewYn'].includes(item.Name) && !['requireYn'].includes(item.Name) && !['noticeYn'].includes(item.Name)))
                }
                this.excelDownload.fileName  = `검측현황_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true;

                // this.inspListSheetMine.down2Excel({
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
                this.inspListSheetMine.doPrint();
            },
        }
   }
</script>