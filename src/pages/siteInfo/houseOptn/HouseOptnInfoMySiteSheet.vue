<template>
<div>
    <div class="lookup_box multi_line">
        <div class="lst_tabs_round">
            <ul class="">
                <li v-for="(tab, index) in tabsRound" v-bind:class="{active:currentTabRound===index}" :key="index">
                    <a href="javascript:void(0);" v-on:click="currentTabRound=index">{{tab}}</a>
                </li>
            </ul>
        </div>
        <table v-show="currentTabRound == 0">
            <colgroup>
                <col width="5%">
                <col width="24%">
                <col width="4%">
                <col width="24%">
                <col width="4%">
                <col width="24%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>동</th>
                    <td>
                        <select v-model="search.standDong" class="form_control size_lg">
                            <option :value="''">전체</option>
                            <option v-for="option in dongOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>
                    </td>
                    <th>호수</th>
                    <td>
                        <input type="text" class="form_control" v-model="search.addrHo" placeholder="입력해주세요" @keyup.enter="searchData(false)">
                    </td>
                    <th>연동유무</th>
                    <td>
                        <select v-model="search.linkYn" class="form_control size_lg"> 
                            <option :value="''" >전체</option>
                            <option :value="'Y'">연동</option>
                            <option :value="'N'">미연동</option>
                        </select>
                    </td>
                    <td class="ar">
                        <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <table v-show="currentTabRound == 1">
            <colgroup>
                <col width="4%">
                <col width="27%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>옵션선택</th>
                    <td>
                        <input type="text" class="form_control" v-model="dsItem" placeholder="입력해주세요" @keyup.enter="searchData2(false)">
                    </td>
                    <td class="ar">
                        <button type="button" class="btn_reset" @click="searchData2(true)">초기화</button>
                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData2(false)">검색</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="tab_area_round" v-show="currentTabRound == 0">
        <div class="inner">
            <div class="button_box">
                <strong class="txt_lg">세대정보({{ cnt }}건)</strong>
                <button type="button" class="btn btn_md btn_excel" @click="excelDown">엑셀 다운로드</button>
                <div class="fr">
                    <label for="UseOptn" class="input_check">
                        <input v-model="useOptn" type="checkbox" id="UseOptn" class="form_control">
                        <span class="label_text">옵션 있음</span>
                    </label>
                    <!--
                    <label
                        for="UseNoOptn"
                        class="input_check"
                    >
                        <input
                            v-model="useNoOptn"
                            type="checkbox"
                            id="UseNoOptn"
                            class="form_control"
                        >
                        <span class="label_text">옵션 없음</span>
                    </label>
                    -->
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="qrCodeBtn">QR코드</button>
                    <!-- <button type="button" class="btn btn_sm btn_excel">Excel Export</button> -->
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" v-if="checkUser(this.userId, 'write') || checkUser(this.userId, 'change')" @click="saveBtn">저장</button>
                    <!-- <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="deleteBtn">삭제</button> -->
                </div>
            </div>
            <!-- ibsheet -->
            <div class="ib_wrap" :style="{height: 'calc(100vh - 380px)'}">
                <div id="houseOptnInfoMySiteTable" class="ibsheet_table" style="height: 100%"></div>
            </div>
        </div>
    </div>
    
    <div class="tab_area_round" v-show="currentTabRound == 1">
        <div class="inner">
                <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" @click="elevationExcelDown">엑셀 다운로드</button>
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="elevationPrint">입면도 출력</button>
                    </div>
                </div>
                <!-- ibsheet -->
                <sqms-grid
                    id="houseElevationTable"
                    :columns="columns2"
                    :data="gridData2"
                    :upperStyle="{'height':'calc(100vh - 380px)'}"
                    :inputStyle="{'height':'100%'}"
                    :cfg="{
                        NoDataMessage : 3,
                        NoVScroll: false
                    }"
                    @init="initSheet2"
                    @renderFirstFinish="renderFirstFinish2"
                    @dataLoad="dataLoad"
                    ref="houseElevationTableRef"
                >
                </sqms-grid>
        </div>
    </div>

    <!-- 세대옵션 정보 팝업 -->
    <b-modal id="HoldOption" title="세대옵션 정보"
        hide-backdrop size="lg" @shown="popSheet"
        scrollable
    >
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <strong class="fl txt_md">1. 세대정보</strong>
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="detailQrCodeBtn">QR코드</button>
                    </div>
                </div>
                <div class="table_normal_list align_center">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="20%">
                            <col width="20%">
                            <col width="20%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>동</th>
                                <th>호수</th>
                                <th>평형정보</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ detail.standDong }}</td>
                                <td>{{ detail.addrHo }}</td>
                                <td>{{ detail.noSize }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong class="txt_md">2. 세대옵션 품목</strong>
                </div>
                <div style="display:flex;">
                    <div class="ib_wrap" :style="{height: '500px', flex : 1}">
                        <div id="houseDetailTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                    <!-- <div class="ib_wrap" :style="{height: 'calc(100vh - 450px)', flex : 1}"> -->
                    <div class="ib_wrap" :style="{height: '500px', flex : 1}">
                        <div id="houseDetail2Table" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
        </template>
        <template #modal-footer> 
            <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">확인</b-button> -->
            <b-button class="btn btn_md btn_outline btn_gray" @click="detailCloseBtn">닫기</b-button>
        </template>
    </b-modal>

    <excel-download
        v-model="excelDownload.request"
        ref-id="houseOptnInfoMySiteSheet_ExcelDownload"
        :file-name="excelDownload.fileName"
        :download-option="excelDownload.downloadOption"
        :options="excelDownload.options"
        :data="excelDownload.data"
    />
</div>
</template>

<script>
    import API from '@/apis/'
    import axios from 'axios'
    import _ from 'lodash'
    import loader from '@ibsheet/loader'
    import { HoldOption, HoldOption2, QualityState, HoldOption3 } from '@/pages/common/data/LocusList'
    import { HoldinfoList, PrdtOptions, PrdtOptions2 } from '@/pages/common/data/PopupList'
    import Datepicker from '@component/common/DatePicker.vue'
    import DatepickerRange from '@component/common/DatePickerRange.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'
    
    export default {
        name: 'HouseOptnInfoMySiteSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            Datepicker, 
            DatepickerRange,
            ExcelDownload,
        },
        data:() => ({
            currentTabRound: 0, // 기본 current 값 지정 
            tabsRound: ['세대정보', '입면도'],
            tabsRound2: ['옵션있음', '옵션없음'],
            popcurrentTabRound2: 0, // 기본 current 값 지정
            
            sheet : null,
            columns : [],
            gridData : [],
            sheet2: null,
            columns2 : [],
            gridData2 : [],
            gridData2Cnt : 0,
            detailSheet : null,
            detailSheet2 : null,
            detailColumns : [],
            detailGridData : [],
            detailGridData2 : [],
            search : {
                standDong : '',
                addrHo : '',
                linkYn : '',
                siteMstrId : '',
            },
            search2 : {
                selOption: '',
            },
            dongOptions : [],
            hosuOptions : [],
            houseTypeOptions : [] ,
            connectingOptions : [],
            selOptions : [],
            siteMstrId : '',
            houseOptnDtlList : [],

            // 세대옵션 정보 팝업 파람
            standDong: '',
            addrHo: '',
            linkYn : '',

            detail : {
                standDong : '',
                addrHo : '',
                noSize : '',
                projectNm : '',
            },

            dsItem : '',
            cnt : 0,
            useOptn : false,
            useNoOptn : false,
            ozReport:{src : '',},
            userId : '',
            /** excel */
            excelDownload: {
                request: false,
                fileName: '',
                options: {},
                data: [],
                downloadOption: {}
            },
        }),
        created () {
            this.userId = this.$store.getters['auth/getUserId']
            this.search.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.columns2 = HoldOption2.options.Cols
            this.getHouseInfoMySiteDongList()
            this.getHouseElevationList()
        },
        mounted () {
            this.getHouseInfoMySiteList()
        },
        methods: {
            initSheet2 (sheet) {
                this.sheet2 = sheet
            },
            /**
             * 검색조건 세팅
             */
            setTopFilterOption (data) {
                const allDongList = data.map(item => {
                    return {
                        label: parseInt(item),
                        value: parseInt(item),
                    }
                })
                this.dongOptions = [..._.uniqBy(allDongList, 'value')]
            },
            /**
             * 검색조건 불러오기 
             */
            async getHouseInfoMySiteDongList(){
                const payload = {
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteDongList(payload)
                    if(result?.dlHouseDong){
                        this.setTopFilterOption(result.dlHouseDong)
                    }
                } catch (error) {
                    console.log('검색조건 동 리스트 불러오기 에러 : ', error)
                }
            },
            /**
             * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData (isReset) {
                if (isReset) {
                    this.search = {
                        standDong : '',
                        addrHo : '',
                        linkYn : '',
                    }
                }
                return await this.getHouseInfoMySiteList(this.search)
            },
            /**
             * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData2 (isReset) {
                if (isReset) {
                    this.dsItem =  ''
                }

                return await this.getHouseElevationList()
            },
            /**
             *  세대정보 리스트 불러오기
             */
            async getHouseInfoMySiteList(payload = this.search){ 
                payload['siteMstrId'] = this.$store.getters['auth/getSiteMstrId']
                let options = HoldOption.options
                options.Events = {
                    onRenderFirstFinish : async () => {
                        try {
                            const result = await API.houseOptn.getHouseInfoMySiteList(payload)
                            this.cnt = result.dlHouseDetail.length
                            if(result?.dlHouseDetail.length > 0){
                                this.gridData = result.dlHouseDetail.map(row =>{
                                    return {
                                        ...row,
                                        linkYn : row.linkYn === 'Y'? '연동': '미연동'
                                    }
                                })
                                this.sheet.loadSearchData({
                                    data : this.gridData
                                })
                            }
                        } catch (error) {
                            console.log('세대정보 리스트 불러오기 에러 : ', error)
                        }         
                    },
                    // onAfterClick : (evt) => {
                    //     this.clickGrid(evt)
                    // },
                    onDblClick: (evt) => {
                        this.clickGrid(evt)
                    },
                }

                loader.createSheet({
                    el: 'houseOptnInfoMySiteTable',
                    data : [],
                    options : options
                }).then(sheet => {
                    this.sheet = sheet
                })
            },
            /**
             * 세대정보 - 상세 세대옵션 정보 팝업
             */
            // async getHouseInfoMySiteDetail(){
            popSheet(){
                let options = PrdtOptions.options
                options.Events = {
                    onRenderFirstFinish : (evt) => {
                        evt.sheet.loadSearchData({
                            data : this.detailGridData
                        })
                    }
                }
                loader.createSheet({
                    el: 'houseDetailTable',
                    data : [],
                    options : options
                }).then(sheet => {
                    this.detailSheet = sheet
                })

                let options2 = PrdtOptions2.options
                options2.Events = {
                    onRenderFirstFinish : (evt) => {
                        evt.sheet.loadSearchData({
                            data : this.detailGridData2
                        })
                    }
                }

                loader.createSheet({
                    el: 'houseDetail2Table',
                    data : [],
                    options : options2
                }).then(sheet2 => {
                    this.detailSheet2 = sheet2
                })
            },
            async getHouseInfoMySiteDetail(callback){
                const payload = {
                    standDong : this.standDong,
                    addrHo : this.addrHo,
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteDetail(payload)
                    if(result?.dlHouseOption.length > 0 && result?.dlHouseOption[0].dsItem != null){
                        this.detailGridData = result.dlHouseOption
                    }
                    if (callback) return callback(true)
                } catch (error) {
                    console.log('세대옵션 상세 정보 불러오기 에러 : ', error)
                } 
            },
            async getHouseInfoMySiteDetailAfter(callback){
                const payload = {
                    standDong : this.standDong,
                    addrHo : this.addrHo,
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteDetailAfter(payload)
                    if(result?.dlHouseAfterOption.length > 0 && result.dlHouseAfterOption[0].dsItem != null){
                        this.detailGridData2 = result.dlHouseAfterOption
                    } 
                    if (callback) return callback(true)
                } catch (error) {
                    console.log('세대옵션 상세 정보 불러오기 에러 : ', error)
                }
            },
            /**
             * 그리드 클릭 이벤트
             */
            clickGrid (evt) {
                if(evt.kind != 'Header'){
                    if(evt.col === 'linkYn' || evt.col === 'standDong' || evt.col === 'addrHo' || evt.col === 'addrFloor' || evt.col === 'noSize'){
                        this.standDong = evt.row.standDong
                        this.addrHo = evt.row.addrHo
                        this.linkYn = evt.row.linkYn
                        this.detail.standDong = evt.row.standDong
                        this.detail.addrHo = evt.row.addrHo
                        this.detail.noSize = evt.row.noSize
                        this.detail.projectNm = this.$session.get('userInfo').projectNm
                        // this.getHouseInfoMySiteDetail()
                        // this.getHouseInfoMySiteDetailAfter()
                        // this.$bvModal.show('HoldOption')

                        /** promise.all */
                        Promise.all([
                            new Promise((resolve) => this.getHouseInfoMySiteDetail(() => resolve())),
                            new Promise((resolve) => this.getHouseInfoMySiteDetailAfter(() => resolve())),
                        ])
                        .then(() => {
                            this.$bvModal.show('HoldOption')
                        })
                    }
                }
            },
            /**
             * 그리드 상단 QR코드 버튼 클릭
             */
            qrCodeBtn () {
                /*
                if(this.useOptn === true && this.useNoOptn === true){
                    this.alert('하나만 선택해 주세요.')
                } else {

                }
                */
                //let options = 'N';
            
                var popUrl = "";
                
                let param = "";
                if(this.search.standDong != null || this.search.standDong != ''){
                    param += "&STAND_DONG="+this.search.standDong;
                }
                if(this.search.addrHo != null || this.search.addrHo != ''){
                    param += "&ADDR_HO="+this.search.standDong;
                }
                if(this.search.linkYn != null || this.search.linkYn != ''){
                    param += "&LINK_YN="+this.search.linkYn;
                } 
                if(this.useOptn === true){
                    const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                    this.ozReport.src = this.$store.getters['auth/getOzTypeList'][39].jspNm
                    + '&SITE_MSTR_ID=' + this.$store.getters['auth/getSiteMstrId']+param;
                    window.open(this.ozReport.src, '_blank')
                } else {
                    const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                    this.ozReport.src = this.$store.getters['auth/getOzTypeList'][40].jspNm
                    + '&SITE_MSTR_ID=' + this.$store.getters['auth/getSiteMstrId']+param;
                    window.open(this.ozReport.src, '_blank')
                }

                // 옵션있음 처리 - 추후 추가필요
                //if(this.useOptn === true){
                //    param += "&LINK_YN=Y";
                //}
                /*
                popUrl = "http://61.251.164.137:8080/oz80/sample/viewer/houseOption.jsp?SITE_MSTR_ID=" + this.$store.getters['auth/getSiteMstrId']+param;
                var popOption = "top=10, left=10, width=1000, height=600, status=no, menubar=no, toolbar=no, resizable=no";
                window.open(popUrl, "HOUSE_OPTION", popOption);
                */
                
            },
            /** 개별 Qr코드 */
            detailQrCodeBtn () {
                let options = 'N';
                if(this.linkYn === '연동') options = 'Y';
                /*
                var popUrl = "http://61.251.164.137:8080/oz80/sample/viewer/houseOption.jsp?STAND_DONG="+this.standDong+"&ADDR_HO="+ this.addrHo +"&LINK_YN="+options+"&SITE_MSTR_ID=" + this.$cookies.get("siteMstrId");
                var popOption = "top=10, left=10, width=1000, height=600, status=no, menubar=no, toolbar=no, resizable=no";
                window.open(popUrl, "HOUSE_OPTION", popOption);
                */
                const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][44].jspNm
                + '&STAND_DONG=' + this.standDong
                + '&ADDR_HO='+ this.addrHo 
                + "&LINK_YN="+options
                + "&SITE_MSTR_ID=" + this.$store.getters['auth/getSiteMstrId'];

                window.open(this.ozReport.src, '_blank')
            },
            /**
             * 저장 버튼 클릭시 이벤트
             */
            async saveBtn () {
                this.confirm('저장하시겠습니까?', async ()=> {
                    const failSave = () => {
                        return this.alert('저장에 실패했습니다.')
                    }
                    try {
                        const sheetData = this.sheet.getSaveJson({
                            saveMode: 3
                        })
                        const payload = sheetData.data.map(item => {
                            return {
                                status : item.STATUS,
                                standDong : item.standDong,
                                addrHo: item.addrHo,
                                remark : item.remark,
                                siteMstrId : this.search.siteMstrId
                            }
                        })
                        const result = await API.houseOptn.setHouseRemarkChange(payload)
                        if(result?.count > 0){
                            this.alert('저장되었습니다.')
                            this.getHouseInfoMySiteList(this.search)
                        } else {
                            if(!sheetData.length){
                                return this.alert('변경된 정보가 없습니다.')
                            } else {
                                this.alert('저장에 실패했습니다.')
                            }
                        }
                    } catch (error) {
                        console.log('세대정보 저장 에러 : ', error)
                        failSave()
                    }
                })
            },
            /**
             * 삭제 버튼 클릭시 이벤트
             */
            async deleteBtn() {

            },
            /**
             * 세대옵션 정보 상세팝업 닫기 버튼
             */
            detailCloseBtn () {
                this.$bvModal.hide('HoldOption')
            },
            renderFirstFinish2(){

            },
            /**
             * 세대옵션 입면도 리스트 조회
             */
            async getHouseElevationList(){
                const payload = {
                    dsItem : this.dsItem,
                    projectId : this.$session.get('userInfo').projectId
                }
                //try {
                    const result = await API.houseOptn.getHouseElevationList(payload)
                    if(result?.dlElevation.length > 0){
                        this.gridData2 = result.dlElevation
                        this.gridData2Cnt = result.dlElevation.length
                    }else{
                        this.gridData2 = []
                        this.gridData2Cnt = 0
                    }
                //} catch (error) {
                    //console.log('입면도 리스트 조회 에러 : ' , error)
                //}
            },
            /**
             * 입면도 옵션끼리 열 병합 뭐지
             */
            dataLoad (evt) {
                const options = {
                    key: 'dsItem',
                    startColumnName: 'dsItem',
                    endColumnName: 'dsItem',
                }

                const allRows = evt.sheet.getDataRows()
                let compare = allRows[0]
                for(let i = 0; i < allRows.length; i++){
                    if(compare[options.key] !== allRows[i][options.key]) {
                        evt.sheet.setMergeRange(compare, options.startColumnName, allRows[i-1], options.endColumnName)
                        compare = allRows[i]
                    }

                    if(i === allRows.length-1) {
                        evt.sheet.setMergeRange(compare, options.startColumnName, allRows[i], options.endColumnName)
                    }
                }
            },
            /** 엑셀 임포트 익스포트 */
            importExcel () {
                const options = {
                    append: 1,                  // 새로로드할지, 뒤에 붙일지 여부
                    fileExt: 'xls|xlsx|csv',    // 가용 확장자
                    mode: 'HeaderMatch'         // column 명 매칭해서 처리
                }

                // this.gridData.grid.importData(options)
            },
            excelDown: function () {
                if(this.cnt <= 0) {
                    return this.alert("등록된 세대정보가 없어 엑셀다운로드를 할 수 없습니다.")
                }
                this.excelDownload.options   = {
                    Cfg: HoldOption.options.Cfg,
                    // Cols: ConcreteMix.options.Cols.filter((item) => !['isChecked'].includes(item.Name))
                    Cols: HoldOption.options.Cols.filter(item => !['isChecked'].includes(item.Name)),
                    }
                this.excelDownload.fileName  = `세대정보_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data      = this.gridData
                this.excelDownload.request   = true
            },
            elevationExcelDown (){
                if(this.gridData2Cnt <= 0) {
                    return this.alert("등록된 세대정보가 없어 엑셀다운로드를 할 수 없습니다.")
                }
                this.sheet2.down2Excel({
                    merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                    downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                    reqHeader:  {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Accept-Language': 'ko'
                                },
                    fileName:`입면도_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                })
            },
            elevationPrint : async function() {
                if(this.gridData2Cnt <= 0) {
                    return this.alert("등록된 세대정보가 없어 입면도를 출력할 수 없습니다.")
                }

                let url = '/sendApi/api/siteInfo/houseOptn/elevationPrint/write';
                // let url = '/sendApi/api/siteInfo/houseOptn/elevationPrintTest/write';
                
                const payload = {
                    dsItem : this.dsItem,
                    projectId : this.$store.getters['auth/getProjectId'],
                    projectName : this.$store.getters['auth/getProjectNm']
                }

                axios.post(url, payload, {
                    headers: {
                        'Accept-Language': 'ko',
                        'Authorization': this.$cookies.get("Authorization"),
                    },
                    responseType: 'blob'
                }).then(response => {
                    const blob = new Blob([response.data]); //'/ELEVATION_TEMP/'
                    const fileName = '입면도.xlsx'

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
            }
        }
    }
</script>