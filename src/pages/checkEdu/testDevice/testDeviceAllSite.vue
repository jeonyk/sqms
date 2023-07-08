<template>
    <div class="tab_contents">
        <h2 class="sub_title pb20">시험/검사 장비</h2>
        <!-- <div class="lst_tabs">
            <ul>
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a
                            href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div> -->
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
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel">엑셀 다운로드</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                    <!-- <button type="button" class="btn btn_sm btn_excel">Report</button> -->
                    <!-- <button type="button" class="btn btn_sm btn_darkgray">교정이력카드</button> -->
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap" :style="{height: 'calc(100vh - 310px)'}">
                    <div id="allListSheetTable" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div>
        </div>
        <CorrectionPop :id="testDeviceInfoId" :ref-id="'TestDevice_AllSite_CorrectionPop'" :my-site-yn="'N'"
                       :site-id="siteMstrId"/>
        <CorrectionWrite v-bind:site-id="siteMstrId" :ref-id="'TestDevice_AllSite_CorrectionWrite'"/>
        <PopAlert
            v-bind:msg="popMsg" v-bind:pop-id="popId" v-bind:confirm-use="confirmUse"
            v-on:first-btn-fn="confirmBtn" v-on:second-btn-fn="closePop"
        />
        <excel-download
            v-model="excelDownload.request"
            ref-id="TestDeviceSheetAll_ExcelDownload"
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
    import { mapGetters } from 'vuex'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'
    // import { CorrectionWrite, CooperationSearch } from '../../common/data/PopupList'

   let listSheetId = '';
   let listSheetId2 = '';

   export default {
        name: 'TestDeviceAllSite',
        mixins: [MsgBoxMixins],
        components: {
            PopAlert,
            DatePickerRange,
            CorrectionWrite,
            CorrectionPop,
            ExcelDownload,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site'], // tab name
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

                mainCodeList:[],

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
            this.sheetLoad();
        },
        beforeDestroy() {
            // loader.removeSheet(listSheetId);
            // loader.removeSheet(listSheetId2);
        },
        computed:{
            ...mapGetters({
                'information': 'getInformation'
            })
        },
        methods: {
            sheetLoad: async function(){
                this.siteMstrId = this.information.siteMstrId;

                if(this.siteMstrId == null){
                    this.alert(`현장정보 아이디가 없습니다.\n 다시 로그인해주세요`, () => {
                        this.$router.push({name: 'Login'});
                    })  
                    return;
                }

                let param = {
                    'siteMstrId': this.siteMstrId,
                };
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
                    resData =  await API.testDevice.getTestDeviceListAll(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    // console.log(resData);
                }catch(error){
                    console.error(error);
                }

                let data = [];
                let options = EquipmentList.options;
                
                this.mainCodeList = resData.mainCodeList;
                // console.log(this.mainCodeList);
                
                if(typeof(resData)!='undefined' && resData.data.length>0){
                    data = resData.data;
                    for(let x = 0; x<data.length; x++){
                        data[x].statusNm = data[x].status=='Y'?'보유':'반출';
                        data[x].bforRst = data[x].bforRst=='PASS'?'합격':(data[x].bforRst=='UNPASS'?'불합격':'-');
                        data[x].aftrRst = data[x].aftrRst=='PASS'?'합격':(data[x].aftrRst=='UNPASS'?'불합격':'-');
                        data[x]['fileYn'] = data[x].cnt>0?'1':'0';
                        data[x]['useYn'] = data[x]['useYn']=='Y'?'사용':'미사용';
                        data[x]['delayYn']='양호';
                        if(data[x].nextDate!=null&&data[x].nextDate!=''&&data[x].remain<0){//지연일경우
                            data[x]['remainTextColor']='#FF0000';
                            data[x]['delayYn']='지연';
                        }
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
                    el: 'allListSheetTable',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    listSheetId = sheet.id
                    this.listSheet = sheet;
                    sheet.hideCol('checkYn');
                    sheet.blur();
                });
            },
            fnClick:function(evt){
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
                        this.$root.$emit('bv::show::modal', 'TestDevice_AllSite_CorrectionPop'); 
                    }
                }
            },
            download: function(fileInfo) {

                const fileId = fileInfo.fileId
                    || fileInfo.fileChkBsArcvId 
                    || fileInfo.fileChkEduArcvId
                    || fileInfo.fileComArcvId
                    || fileInfo.fileQltArcvId
                    || fileInfo.fileQltImgArcvId

                const url = '/sendApi/api/file/singleFileDownload'

                const payload = {
                    fileId: fileId
                }

                axios.post(url, payload, {
                    headers: {
                        'Accept-Language': 'ko',
                        'Authorization': this.$cookies.get("Authorization"),
                    },
                    responseType: 'blob'
                }).then(response => {
                    const blob = new Blob([response.data])
                    const fileName = fileInfo.orgFileName

                    // Internet Explorer
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        window.navigator.msSaveOrOpenBlob(blob, fileName)
                    // Other Browsers
                    } else {
                        const objectUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement('a')

                        link.style.cssText = 'display:none'
                        link.href = objectUrl
                        link.setAttribute('download', fileName)

                        if (typeof link.download === 'undefined') {
                            link.setAttribute('target', '_blank')
                        }

                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        window.URL.revokeObjectURL(objectUrl)

                    }
                }).catch(error => {
                    console.error(error)
                    throw new Error(error)
                })
            },
            fnDblClick:function(evt){
                this.testDeviceInfoId = evt.row.testDeviceInfoId;
                this.$root.$emit('bv::show::modal', 'TestDevice_AllSite_CorrectionPop'); 
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

                // this.sheetLoad();
            },
            changeUnuseChk:function(){
                let rows = this.listSheet.getRowsByChecked("checkYn");
                if(rows.length == 0){
                    this.popMsg = '미사용할 장비를 선택해주세요.';
                    this.confirmUse = false;
                    this.isCheck = false;
                    this.$root.$emit('bv::show::modal', 'sheetAlert');
                    return;
                }else{
                    this.popMsg = '선택항목을 변경하시겠습니까?';
                    this.confirmUse = true;
                    this.isCheck = true;
                    this.$root.$emit('bv::show::modal', 'sheetAlert');
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
                    // console.log(resData2);
                }catch(error){
                    console.error(error);
                    this.changeFinish = false;
                    this.popMsg = '오류로 인해 변경이 완료되지 않았습니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'sheetAlert');
                    return;
                }
                if(typeof(resData2)!='undefined' && resData2.data != 0){
                    this.changeFinish = true;
                    this.popMsg = '변경이 완료되었습니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'sheetAlert');
                    return;
                }else{
                    this.changeFinish = false;
                    this.popMsg = '오류로 인해 변경이 완료되지 않았습니다.';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'sheetAlert');
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
                let sheet = this.listSheet;
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['checkYn'].includes(item.Name) &&!['fileYn'].includes(item.Name)))
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
            printSheet:function(){
                this.listSheet.doPrint();
            },
        }
   }
</script>