<template>
    <div class="tab_contents">
        <!-- <h2 class="sub_title">시험/검사 장비</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul>
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a
                            href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>
        <div class="tab_area" v-show="currentTab == 0">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                    <col width="5%">
                    <col width="14%">
                    <col width="6%">
                    <col width="14%">
                    <col width="5%">
                    <col width="16%">
                    <col width="6%">
                    <col width="14%">
                    <col width="*">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>보유업체</th>
                        <td><input type="text" class="form_control size_sm_lg" placeholder="입력해주세요" v-model="holdingCompany" @keyup.enter="sheetLoad" :maxlength="100"></td>              
                        <th>공종</th>
                        <td>
                            <select name="" id="" class="form_control size_sm_lg" v-model="confinal">
                                <option value="">전체</option>
                                <option v-for="(item, idx) in mainCodeList" :key="idx" :value="item.mainCodeId">{{ item.mainName }}</option>
                            </select>
                        </td>
                        <th>계측기명</th>                           
                        <td><input type="text" class="form_control size_sm_lg" placeholder="입력해주세요" v-model="deviceNm" @keyup.enter="sheetLoad" :maxlength="100"></td>              
                        <th>교정대상여부</th>
                        <td>
                            <select name="" id="" class="form_control size_sm_lg" v-model="correctYn">
                                <option value="">전체</option>
                                <option value="Y">대상</option>
                                <option value="N">대상아님</option>
                            </select>
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetLoad">검색</button>
                        </td>
                    </tr>

                    <tr>
                        <th>상태</th>
                        <td>
                            <select name="" id="" class="form_control size_sm_lg" v-model="status">
                                <option value="">전체</option>
                                <option value="Y">보유</option>
                                <option value="N">반출</option>
                            </select>
                        </td>
                        <th>검교정상태</th>
                        <td>
                            <select name="" id="" class="form_control size_sm_lg" v-model="remain">
                                <option value="0">전체</option>
                                <option value="1">양호</option>
                                <option value="2">지연</option>
                            </select>
                        </td>
                        <th>사용여부</th>                
                        <td>
                            <select name="" id="" class="form_control size_sm_lg" v-model="useYn">
                                <option value="">전체</option>
                                <option value="Y">사용</option>
                                <option value="N">미사용</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>교정일자</th>                
                        <td>
                            <date-picker-range v-model="selectDate"/>
                        </td>

                        <th>차기 교정일자</th>                
                        <td>
                            <date-picker-range v-model="selectDate2"/>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>

            <div class="inner">
                <div class="button_box">
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel">엑셀 다운로드</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_darkgray" @click="ozDown">계측기 교정 대장</button>
                    <div class="fr">
                        <button v-if="checkUser(this.userId,'write')" type="button" class="btn btn_sm btn_darkgray" v-b-modal.TestDevice_CorrectionWrite>등록</button>
                        <button v-if="checkUser(this.userId,'unuse')" type="button" class="btn btn_sm btn_darkgray" v-on:click="changeUnuseChk">삭제</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap" style="height: calc(100vh - 380px)">
                    <div id="listSheetTable" class="ibsheet_table" style="height: 100%"></div>
                </div>
            </div>
        </div>

        <div class="tab_area" v-show="currentTab == 1">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="6%">
                        <col width="22%">
                        <col width="5%">
                        <col width="22%">
                        <col width="6%">
                        <col width="22%">
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
                                    <input type="text" class="form_control" placeholder="입력해주세요" v-model="subProjNm" @keyup.enter="sheetLoad" :maxlength="100">
                                </div>    
                            </td>              
                            <th>현장명</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="subSiteNm" @keyup.enter="sheetLoad" :maxlength="100"></td>                                
                            <th>프로젝트코드</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="subProjId" @keyup.enter="sheetLoad" :maxlength="30"></td>                                
                            <td class="ar">
                                <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetLoad">검색</button>
                            </td>
                        </tr>

                        <tr>
                            <th>현장코드</th>
                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="subSiteId" @keyup.enter="sheetLoad" :maxlength="30"></td>                 
                            <th>공사기간</th>
                            <td>
                                <date-picker-range v-model="selectDate"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="inner">
                <div class="button_box">
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel">엑셀 다운로드</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet">출력</button>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" style="height: calc(100vh - 300px)">
                    <div id="listSheetTable2" class="ibsheet_table" style="height: 100%"></div>
                </div>
            </div>
        </div>
        <CorrectionPop :id="testDeviceInfoId" :ref-id="'TestDevice_CorrectionPop'" :my-site-yn="'Y'"
                       :site-id="siteMstrId" :main-code-list="mainCodeList" 
                       v-on:close="sheetLoad"/>
        <CorrectionWrite v-bind:site-id="siteMstrId" :ref-id="'TestDevice_CorrectionWrite'" v-bind:main-code-list="mainCodeList" v-on:close-write="sheetLoad"/>
        <PopAlert
            v-bind:msg="popMsg" v-bind:pop-id="popId" v-bind:confirm-use="confirmUse"
            v-on:first-btn-fn="confirmBtn" v-on:second-btn-fn="closePop"
        />
        <excel-download
            v-model="excelDownload.request"
            ref-id="TestDeviceSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>
</template>

<script>
    import loader from '@ibsheet/loader'
    import axios from 'axios'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import CorrectionWrite from '@/pages/checkEdu/testDevice/testDeviceWritePop.vue'
    import CorrectionPop from '@/pages/checkEdu/testDevice/testDevicePop.vue'
    import { EquipmentList } from '../../common/data/InspectionList'
    import { ConcretePourstatus2 } from '../../common/data/MaterialsList'
    import API from '@/apis/'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'
    
    // import { CorrectionWrite, CooperationSearch } from '../../common/data/PopupList'

   let listSheetId = '';
   let listSheetId2 = '';

   export default {
        name: 'TestDeviceSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            PopAlert,
            DatePickerRange,
            CorrectionWrite,
            CorrectionPop,
            Breadcrumb,
            ExcelDownload,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
                popMsg: '',
                popId: 'sheetAlert',
                confirmUse: false,
                siteMstrId:'',
                listSheet:null,
                listSheet2:null,
                isCheck: false,
                changeFinish:false,

                testDeviceInfoId:'',                            // 아이디
                deviceNm:'',                                    // 계측기명
                deviceId:'',                                    // 계측기 관리번호
                productCompany:'',                              // 제작사
                correctYn:'',                                   // 교정대상여부
                deviceNum:'',                                   // 기기번호
                holdingCompany:'',                              // 보유업체
                confinal:'',                                    // 공종
                userId:'',                                      // 협력업체 직원Id
                allowance:'',                                   // 허용오차
                holdingPlace:'',                                // 보유장소
                correctTerm:'',                                 // 교정주기
                status:'',                                      // 상태
                useYn:'',
                remain:0,
                selectDate:[],
                selectDate2:[],

                //전체현장 검색조건
                mngtType:'0',
                subProjNm:'',
                subProjId:'',
                subSiteNm:'',
                subSiteId:'',

                mainCodeList:[],
                userId:'',
                userType:'',

                searchObj: {
                    'testDeviceInfoId':'',
                    'holdingCompany':'',
                    'deviceNm':'',
                    'correctYn':'',
                    'confinal':'',
                    'status':'',
                    'useYn':'',
                    'remain':'',
                    'selectDate':'',
                    'selectDate2':'',
                },

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
                this.tabs= ['My Site'];
            }else{
                this.tabs= ['My Site', 'All Sites'];
            }
            this.sheetLoad();
        },
        beforeDestroy() {
            // loader.removeSheet(listSheetId);
            // loader.removeSheet(listSheetId2);
        },
        watch:{
            currentTab:function(){
                this.filterReset();
                this.sheetLoad();
            }
        },
        methods: {
            sheetLoad: async function(){
                this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];

                if(this.siteMstrId == null){
                    this.alert(`현장정보 아이디가 없습니다.\n 다시 로그인해주세요`, () => {
                        this.$router.push({name: 'Login'});
                    })  
                    return;
                }
                this.searchObj= {
                    'testDeviceInfoId':'',
                    'holdingCompany':this.holdingCompany,
                    'deviceNm':this.deviceNm,
                    'correctYn':this.correctYn,
                    'confinal':this.confinal,
                    'status':this.status,
                    'useYn':this.useYn,
                    'remain':this.remain,
                    'selectDate':this.selectDate,
                    'selectDate2':this.selectDate2,
                };

                let param = {};
                if(this.currentTab == 0){
                    param['siteMstrId'] = this.siteMstrId;
                    
                    if(this.holdingCompany != ''){
                        param['holdingCompany'] = this.holdingCompany;
                    }
                    if(this.deviceNm != ''){
                        param['deviceNm'] = this.deviceNm;
                    }
                    if(this.correctYn != ''){
                        param['correctYn'] = this.correctYn;
                    }
                    if(this.confinal != ''){
                        param['confinal'] = this.confinal;
                    }
                    if(this.status != ''){
                        param['status'] = this.status;
                    }
                    if(this.useYn != ''){
                        param['useYn'] = this.useYn;
                    }
                    if(this.remain != 0){
                        param['remain'] = this.remain;
                    }
                    if(this.selectDate && this.selectDate.length){
                        param['startDate'] = this.selectDate[0];
                        param['endDate'] = this.selectDate[1];
                    }
                    if(this.selectDate2 && this.selectDate2.length){
                        param['startDate2'] = this.selectDate2[0];
                        param['endDate2'] = this.selectDate2[1];
                    }
                    let resData = null;
                    try{
                        resData =  await API.testDevice.getTestDeviceList(param,{
                            headers:{
                                'Authorization': this.$cookies.get("Authorization")
                            }
                        });
                        //console.log(resData);
                    }catch(error){
                        //console.log(error);
                    }

                    let data = [];
                    let options = EquipmentList.options;

                    this.mainCodeList = resData.mainCodeList;
                    //console.log(this.mainCodeList);
                    
                    if(typeof(resData)!='undefined' && resData.data.length>0){
                        data = resData.data;
                        for(let x = 0; x<data.length; x++){
                            data[x]['delayYn']='양호';
                            if(data[x].nextDate!=null&&data[x].nextDate!=''&&data[x].remain<0){//지연일경우
                                data[x]['remain']=data[x].remain; 
                                data[x]['remainTextColor']='#FF0000';
                                data[x]['delayYn']='지연';
                            }else if(data[x].status != 'Y' && data[x]['useYn']!='Y'){
                                data[x]['remain'] = '-';
                                data[x]['delayYn'] = '-';
                                data[x]['nextDate'] = '-';
                            }
                            data[x].statusNm = data[x].status=='Y'?'보유':'반출';
                            data[x].bforRst = data[x].bforRst=='PASS'?'합격':(data[x].bforRst=='UNPASS'?'불합격':'-');
                            data[x].aftrRst = data[x].aftrRst=='PASS'?'합격':(data[x].aftrRst=='UNPASS'?'불합격':'-');
                            data[x]['fileYn'] = data[x].cnt>0?'1':'0';
                            data[x]['useYn'] = data[x]['useYn']=='Y'?'사용':'미사용';
                            if(data[x].nextDate==null||data[x].nextDate==''){//차기일자없을경우
                                data[x]['remain'] = '';
                                data[x]['delayYn']='-';
                            }
                        }
                        options.Events = {
                            onAfterClick: this.fnClick,
                            ondblclick: this.fnDblClick,
                        };
                    }

                    loader.createSheet({
                        el: 'listSheetTable',
                        data: data,
                        options: options,
                    }).then((sheet) => {
                        listSheetId = sheet.id
                        this.listSheet = sheet;
                        sheet.blur();
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
                    if(this.selectDate && this.selectDate.length){
                        param['csrtStartDt'] = this.selectDate[0];
                        param['csrtEndDt'] = this.selectDate[1];
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
                    if (resData2.status === 200 && data2.length > 0) {
                        options2.Events = {
                            onAfterClick: this.fnSecondClick,
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
                        el: 'listSheetTable2', //All Site
                        data: data2,
                        options: options2,
                    }).then((sheet)=>{
                        listSheetId2 = sheet.id
                        this.listSheet2 = sheet;
                        sheet.blur();
                    });
                }
            },
            fnClick:function(evt){
                if(!this.checkUser(this.userId,'down')){
                    return;
                }
                //첨부파일 클릭시
                if(evt.col == 'fileYn' && evt.row.fileYn == '1'){
                    if(parseInt(evt.row.cnt) ==1){//1개일경우
                        let file ={
                            'fileChkEduArcvId':evt.row.fileChkEduArcvId,
                            'orgFileName':evt.row.orgFileName,
                        };
                        this.download(file);
                    }else{//2개이상일경우
                        this.testDeviceInfoId = evt.row.testDeviceInfoId;
                        this.$root.$emit('bv::show::modal', 'TestDevice_CorrectionPop'); 
                    }
                }
            },
            download: function(fileInfo) {
                let element = document.createElement('a');
                element.setAttribute('href','/sendApi/api/fileCall/getSelfQltyChkImgFile/'+fileInfo.fileChkEduArcvId);
                element.setAttribute('download',fileInfo.orgFileName);
                element.click();
                element.remove();

                // const fileId = fileInfo.fileId
                //     || fileInfo.fileChkBsArcvId 
                //     || fileInfo.fileChkEduArcvId
                //     || fileInfo.fileComArcvId
                //     || fileInfo.fileQltArcvId
                //     || fileInfo.fileQltImgArcvId

                // let url = ''

                // const url = '/sendApi/api/file/singleFileDownload'
                

                // const payload = {
                //     fileId: fileId
                // }

                // axios.post(url, payload, {
                //     headers: {
                //         'Accept-Language': 'ko',
                //         'Authorization': this.$cookies.get("Authorization"),
                //     },
                //     responseType: 'blob'
                // }).then(response => {
                //     const blob = new Blob([response.data])
                //     const fileName = fileInfo.orgFileName

                //     // Internet Explorer
                //     if (typeof window.navigator.msSaveBlob !== 'undefined') {
                //         window.navigator.msSaveOrOpenBlob(blob, fileName)
                //     // Other Browsers
                //     } else {
                //         const objectUrl = window.URL.createObjectURL(blob);
                //         const link = document.createElement('a')

                //         link.style.cssText = 'display:none'
                //         link.href = objectUrl
                //         link.setAttribute('download', fileName)

                //         if (typeof link.download === 'undefined') {
                //             link.setAttribute('target', '_blank')
                //         }

                //         document.body.appendChild(link)
                //         link.click()
                //         link.remove()
                //         window.URL.revokeObjectURL(objectUrl)

                //     }
                // }).catch(error => {
                //     //console.error(error)
                //     throw new Error(error)
                // })
            },
            fnDblClick:function(evt){
                if(!this.checkUser(this.userId,'view') || evt.row.Kind != 'Data'){
                    return;
                }
                this.testDeviceInfoId = evt.row.testDeviceInfoId;
                this.$root.$emit('bv::show::modal', 'TestDevice_CorrectionPop'); 
            },
            fnSecondClick: function(evt){
                this.focusSiteMstrId = evt.row.siteMstrId;
                this.$store.dispatch('setInformation', {
                    siteMstrId: this.focusSiteMstrId,
                })

                let blankTemp = this.$router.resolve({
                    name : 'TestDeviceAllSite',
                });
                window.open(blankTemp.href,'_blank');
            },
            filterReset: function(){
                this.holdingCompany = '';
                this.deviceNm = '';
                this.confinal = '';
                this.correctYn = '';
                this.status = '';
                this.remain = 0;
                this.useYn = '';
                this.selectDate = [];
                this.selectDate2 = [];
                this.mngtType = '0';
                this.subProjNm = '';
                this.subProjId = '';
                this.subSiteNm = '';
                this.subSiteId = '';
                // this.searchObj= {
                //     'testDeviceInfoId':'',
                //     'holdingCompany':'',
                //     'deviceNm':'',
                //     'correctYn':'',
                //     'confinal':'',
                //     'status':'',
                //     'useYn':'',
                //     'remain':'',
                //     'selectDate':'',
                //     'selectDate2':'',
                // }
                // this.sheetLoad();
            },
            changeUnuseChk:function(){
                let rows = this.listSheet.getRowsByChecked("checkYn");
                if(rows.length == 0){
                    // this.popMsg = '선택된 행이 없습니다.';
                    // this.confirmUse = false;
                    // this.isCheck = false;
                    // this.$root.$emit('bv::show::modal', 'sheetAlert');
                    this.alert('선택된 행이 없습니다.');
                    return;
                }else{
                    // this.popMsg = '선택항목을 변경하시겠습니까?';
                    // this.confirmUse = true;
                    // this.isCheck = true;
                    // this.$root.$emit('bv::show::modal', 'sheetAlert');
                    this.confirm('선택항목을 삭제하시겠습니까?',this.changeUnuse);
                    return;
                }
            },
            changeUnuse: async function(){
                this.changeFinish = false;
                let rows = this.listSheet.getRowsByChecked("checkYn");
                let ids = [];
                for(let x = 0; x<rows.length; x++){
                    ids.push(rows[x].testDeviceInfoId);
                }
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'testDeviceIds':ids,
                };

                let resData2 = null;
                try{
                    resData2 =  await API.testDevice.setTestDeviceUnuse(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(resData2);
                }catch(error){
                    //console.log(error);
                    // this.changeFinish = false;
                    // this.popMsg = '오류로 인해 변경이 완료되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'sheetAlert');
                    this.alert('삭제에 실패했습니다.');
                    return;
                }
                if(typeof(resData2)!='undefined' && resData2.data != 0){
                    // this.changeFinish = true;
                    // this.popMsg = '변경이 완료되었습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'sheetAlert');
                    this.alert('삭제되었습니다.',this.sheetLoad);
                    return;
                }else{
                    // this.changeFinish = false;
                    // this.popMsg = '오류로 인해 변경이 완료되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'sheetAlert');
                    this.alert('삭제에 실패했습니다.');
                    return;
                }
            },
            confirmBtn:function(){
                if(this.isCheck){
                    this.isCheck = false;
                    this.changeUnuse();
                }
                if(this.changeFinish){
                    this.changeFinish = false;
                    this.sheetLoad();
                }
                this.$root.$emit('bv::hide::modal', 'sheetAlert'); 
            },
            closePop:function(){
                this.$root.$emit('bv::hide::modal', 'sheetAlert'); 
            },

            /** 엑셀 다운로드 */
            fn_exportExcel: function () {
                let sheet = this.currentTab == 0?this.listSheet:this.listSheet2;
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['checkYn'].includes(item.Name) && !['fileYn'].includes(item.Name)))
                }
                this.excelDownload.fileName  = `시험검사장비_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true;
                // this.listSheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `시험검사장비_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            ozDown:function(){
                // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                let oz = this.$store.getters['auth/getOzTypeList'][33].jspNm
                + '&testDeviceInfoId='+''
                + '&siteMstrId='+ this.siteMstrId
                + '&holdingCompany='+ this.searchObj.holdingCompany
                + '&deviceNm='+ this.searchObj.deviceNm
                + '&correctYn='+ this.searchObj.correctYn
                + '&confinal='+ this.searchObj.confinal
                + '&status='+ this.searchObj.status
                + '&useYn='+ this.searchObj.useYn
                + '&remain='+ this.searchObj.remain
                + '&startDate='+ (this.searchObj.selectDate.length==0?'':this.searchObj.selectDate[0])
                + '&startDate2='+ (this.searchObj.selectDate2.length==0?'':this.searchObj.selectDate2[0])
                + '&endDate='+ (this.searchObj.selectDate.length==0?'':this.searchObj.selectDate[1])
                + '&endDate2='+ (this.searchObj.selectDate2.length==0?'':this.searchObj.selectDate2[1])
                + '&lang=' + 'ko';
                // + '&lang=' + this.$store.getters['auth/getLocale'];
                window.open(oz, '_blank')
            },
            printSheet:function(){
                let sheet = this.currentTab == 0?this.listSheet:this.listSheet2;
                sheet.doPrint();
            },

        }
   }
</script>