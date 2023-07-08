<template>
<div>
    <div class="lookup_box multi_line">
        <table>
            <caption class="sr_only"></caption>
            <colgroup>
                <col width="7%">
                <col width="20%">
                <col width="5%">
                <col width="20%">
                <col width="7%">
                <col width="20%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>프로젝트명</th>
                    <td>
                        <div class="form_area">
                            <select v-model="search.mngtType" class="form_control">
                                <option value="">전체</option>
                                <option value="0">관리</option>
                                <option value="1">비관리</option>
                                <option value="2">준공</option>
                            </select>
                            <input type="text" class="form_control" placeholder="입력해주세요" v-model="search.projectNm" @keyup.enter="searchData(false)">
                        </div>    
                    </td>    
                    <th>현장명</th>
                    <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search.siteNm" @keyup.enter="searchData(false)"></td>    
                    <th>프로젝트코드</th>
                    <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search.projectId" @keyup.enter="searchData(false)"></td>    
                    <td class="ar">
                        <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                    </td>
                </tr>
                <tr>
                    <th>현장코드</th>
                    <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="search.siteId" @keyup.enter="searchData(false)"></td>    
                    <th>공사기간</th>
                    <td>
                        <DatePickerRange ref="datapickerRange" v-model="dateChangeDt"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="inner">
        <sqms-grid
            id="houseOptnInfoAllSiteTable"
            :columns="columns"
            :data="gridData"
            :save-mode="3"
            :upperStyle="{'height':'calc(100vh - 310px)'}"
            :inputStyle="{'height':'100%'}"
            :cfg="{
                NoDataMessage : 3,
                NoVScroll: false
            }"
            @init="initSheet"
            @click="clickGrid"
            ref="houseOptnInfoAllSiteTableRef"
        >
        </sqms-grid>
    </div>
    <!-- 세대정보 상세보기 팝업 -->
    <b-modal id="HoldinfoList" title="세대정보 상세보기"
        hide-backdrop size="lg"
    >
    <template #default>
        <div class="pop_container">
            <h2 class="sub_title">{{ projectNm}}</h2>
            <div class="lookup_box multi_line mt15">
                <div class="lst_tabs_round">
                    <ul class="">
                        <li v-for="(tab, index) in tabsRound" v-bind:class="{active:popcurrentTabRound===index}" :key="index"><a href="javascript:void(0);" v-on:click="popcurrentTabRound=index">{{tab}}</a></li>
                    </ul>
                </div>

                <table v-show="popcurrentTabRound == 0">
                    <colgroup>
                        <col width="57">
                        <col width="*">
                        <col width="67">
                        <col width="*">
                        <col width="80">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>동</th>
                            <td>
                                <select v-model="detail.standDong" class="form_control">
                                    <option :value="''">전체</option>
                                    <option 
                                        v-for="option in dongOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                    {{ option.label }}
                                    </option>
                                </select>
                            </td>    
                            <th>호수</th>
                            <td>
                                <input type="text" class="form_control" v-model="detail.addrHo" placeholder="입력해주세요">
                            </td>    
                            <td rowspan="3" class="ar vat">
                                <button type="button" class="btn_reset" @click="searchDtl(true)">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search mt15" @click="searchDtl(false)">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>연동유무</th>
                            <td class="pr20">
                                <select v-model="detail.linkYn" class="form_control size_lg"> 
                                    <option :value="''">전체</option>
                                    <option :value="'Y'">연동</option>
                                    <option :value="'N'">미연동</option>
                                </select>
                            </td> 
                            <th></th>
                            <td>
                                <!-- <select name="" id="" class="form_control">
                                    <option value="" selected>전체</option>
                                </select> -->
                            </td>  
                        </tr>
                        <!-- <tr>
                            <th>변동일</th>
                            <td><Datepicker ref="datapickerDtlRange" @value-change="date_Dtl_change"/></td>
                        </tr> -->
                    </tbody>
                </table>

                <table v-show="popcurrentTabRound == 1">
                    <colgroup>
                        <col width="10%">
                        <col width="27%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>옵션선택</th>
                            <td>
                                <input type="text" class="form_control" v-model="dsItem" placeholder="입력해주세요">
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="searchData2(true)">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData2(false)">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="tab_area_round" v-show="popcurrentTabRound == 0">
                <div class="inner">
                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" @click="exportExcel">엑셀 다운로드</button>
                        <div class="fr">
                            <!-- <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="print">출력</button> -->
                        </div>
                    </div>

                    <sqms-grid
                        id="houseOptnInfoAllSiteDtlTable"
                        :columns="columns2"
                        :data="gridData2"
                        :useRadio="false"
                        :inputStyle="{'height':'250px'}"
                        :cfg="{
                            NoDataMessage : 3,
                            NoVScroll: false,
                        }"
                        @init="initSheet2"
                        @click="clickGrid2"
                        ref="houseOptnInfoAllSiteDtlTableRef"
                    >
                    </sqms-grid>
                </div>
            </div>

            <div class="tab_area_round" v-show="popcurrentTabRound == 1">
                <div class="inner">
                    <!-- <div class="button_box"> -->
                        <button type="button" class="btn btn_sm btn_excel" @click="elevationExcelDown">엑셀 다운로드</button> 
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="elevationPrint">입면도 출력</button> <!-- 20220801 주석처리-->
                        </div>
                    <!-- </div> -->
                    <!-- ibsheet -->
                    <sqms-grid
                        id="houseOptnInfoAllSiteDtl2Table"
                        :columns="columns3"
                        :data="gridData3"
                        :inputStyle="{'height':'250px'}"
                        :cfg="{
                            NoDataMessage : 3,
                            NoVScroll: false
                        }"
                        @init="initSheet3"
                        @dataLoad="dataLoad"
                        ref="houseOptnInfoAllSiteDtl2TableRef"
                    >
                    </sqms-grid>
                </div>
            </div>
            
        </div>
    </template>
        <template #modal-footer="{ }"> 
        <!-- <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="ok">확인</button> -->
        <button type="button" class="btn btn_md btn_outline btn_gray" @click="closeBtn">닫기</button>
        <!-- <b-button class="btn btn_lg btn_outline btn_blue" @click="hide('forget')">닫기</b-button> -->
    </template>
</b-modal>
<!-- 세대옵션 정보 팝업 -->
<b-modal id="HoldOption" title="세대옵션 정보"
    hide-backdrop size="lg"
>
    <template #default>
        <div class="pop_container">
            <div class="button_box">
                <strong class="fl txt_md">1. 세대정보</strong>
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
                            <td>{{ standDong }}</td>
                            <td>{{ addrHo }}</td>
                            <td>{{ noSize }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="button_box">
                <strong class="txt_md">2. 세대옵션 품목</strong>
            </div>
            <sqms-grid
                id="houseAllSiteDetail2Table"
                :columns="columns4"
                :data="gridData4"
                :inputStyle="{'height':'250px'}"
                :cfg="{
                    NoVScroll: false,
                    NoDataMessage : 3,
                }"
                ref="houseAllSiteDetail2TableRef"
            >
            </sqms-grid>
        </div>
    </template>
    <template #modal-footer="{ ok }"> 
        <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">확인</b-button>
        <b-button class="btn btn_md btn_outline btn_gray" @click="detailCloseBtn">닫기</b-button>
    </template>
</b-modal>
</div>
</template>

<script>
    import { HoldOptionAllSite, HoldOption2, QualityState, HoldOption3 } from '@/pages/common/data/LocusList'
    import { HoldinfoList, PrdtOptions } from '@/pages/common/data/PopupList'
    import { houseOptnProjectSelect } from '@/pages/common/data/PopupList'
    import API from '@/apis/'
    import _ from 'lodash'
    import Datepicker from '@component/common/DatePicker.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import axios from 'axios'

    export default {
        name: 'HouseOptnInfoAllSiteView',
        mixins: [MsgBoxMixins],
        components: {
            Datepicker,
            DatePickerRange
        },
        data:()=> ({
            tabsRound: ['세대정보', '입면도'],
            popcurrentTabRound: 0, // 기본 current 값 지정 
            tabsRound2: ['옵션있음', '옵션없음'],
            sheet : null,
            sheet2 : null,
            sheet3 : null,
            columns : [],
            gridData : [],
            columns2 : [],
            gridData2 : [],
            columns3 : [],
            gridData3 : [],
            gridData3Cnt : 0,
            columns4 : [],
            gridData4 : [],
            dateChangeDt: [null,null],
            search : {
                projectNm: '',
                siteNm : '',
                projectId : '',
                siteId : '',
                csrtStartDt : '',
                csrtEndDt : '',
                mngtType : '0',
            },

            detail : {
                standDong : '',
                addrHo : '',
                noSize : '',
                linkYn : '',
                siteMstrId : '',
            },
            siteMstrId : '',
            projectNm : '',
            standDong : '',
            addrHo : '',
            noSize : '',
            projectId : '',
            dongOptions: [],
            dsItem : '',
            gridData2Cnt : 0,
        }),
        async created(){
            this.columns = houseOptnProjectSelect.options.Cols
            this.columns2 = HoldOptionAllSite.options.Cols
            this.columns3 = HoldOption2.options.Cols
            this.columns4 = PrdtOptions.options.Cols
            this.getOtherProjectList()
        },
        methods: {
            initSheet (sheet) {
                this.sheet = sheet
            },
            initSheet2 (sheet) {
                this.sheet2 = sheet
            },
            initSheet3 (sheet) {
                this.sheet3 = sheet
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
                    siteMstrId : this.detail.siteMstrId
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
                        projectNm: '',
                        siteNm : '',
                        projectId : '',
                        siteId : '',
                        mngtType : '0',
                    }
                    this.dateChangeDt = [null,null]
                }

                return await this.getOtherProjectList(this.search)
            },
            /** 상세보기 팝업
             * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchDtl (isReset) {
                if (isReset) {
                    this.detail = {
                        standDong : '',
                        addrHo : '',
                        noSize : '',
                        linkYn : '',
                    }
                }

                return await this.getHouseInfoMySiteList(this.detail)
            },
            /** 입면도  검색 */
            async searchData2 (isReset) {
                if (isReset) {
                    this.dsItem =  ''
                }

                return await this.getHouseElevationList()
            },

            async enterEvent(payload = this.search){
                this.getOtherProjectList(payload)
            },
            async getOtherProjectList(payload = this.search) {
                payload['csrtStartDt'] = this.dateChangeDt[0]
                payload['csrtEndDt'] = this.dateChangeDt[1]
                payload['siteMstrId'] = this.$store.getters['auth/getSiteMstrId']
                try {
                    const response = await API.houseOptn.getOtherProjectList({
                        ...payload,
                    })
                    if(response?.datas) {
                        this.gridData = response.datas?.resultList.map(row => {
                            return {
                                ...row,
                                baseType: row.baseType === '1000'? '인프라':'건축'
                            }
                        })
                    }
                } catch (error) {
                    console.error('프로젝트 리스트 조회 에러: ', error)
                }
            },
            clickGrid (evt) {
                if(evt.kind != 'Header') {
                    if(evt.kind === 'Data' && evt.col === 'baseType' || evt.col === 'csrtTypeNm' || evt.col === 'projectId' || evt.col === 'projectNm' || evt.col === 'siteId' || evt.col === 'siteNm' || evt.col === 'csrtStartDt' || evt.col === 'csrtEndDt' || evt.col === 'csrtMngrNm'){
                        this.siteMstrId = evt.row.siteMstrId
                        this.detail.siteMstrId = evt.row.siteMstrId
                        this.projectNm = evt.row.projectNm
                        this.projectId = evt.row.projectId
                        this.getHouseInfoMySiteDongList()
                        this.getHouseInfoMySiteList()
                        this.getHouseElevationList()
                        this.$bvModal.show('HoldinfoList')
                    }
                }
            },
            clickGrid2 (evt) {
                if(evt.kind != 'Header') {
                    this.standDong = evt.row.standDong
                    this.addrHo = evt.row.addrHo
                    this.noSize = evt.row.noSize
                    this.getHouseInfoMySiteDetail()
                    this.$bvModal.show('HoldOption')
                }
            },

            /**
             *  세대정보 리스트 불러오기
             */
            async getHouseInfoMySiteList(payload = this.detail){ 
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteList(payload)
                    this.gridData2Cnt = result.dlHouseDetail.length
                    if(result?.dlHouseDetail.length > 0){
                        this.gridData2 = result.dlHouseDetail.map(row =>{
                            return {
                                ...row,
                                linkYn : row.linkYn === 'Y'? '연동': '미연동'
                            }
                        })
                    } else {
                        this.gridData2 = []
                    }
                } catch (error) {
                console.log('세대정보 리스트 불러오기 에러 : ', error)
                }  
            },
            /**
             * 세대정보 - 상세 세대옵션 정보 팝업
             */
            async getHouseInfoMySiteDetail(){
                const payload = {
                    standDong : this.standDong,
                    addrHo : this.addrHo,
                    siteMstrId : this.detail.siteMstrId
                }
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteDetail(payload)
                    if(result?.dlHouseOption.length > 0){
                        if(result.dlHouseOption[0].dsItem != null){
                            this.gridData4 = result.dlHouseOption
                        } else {
                            this.gridData4 = []
                        }
                    } 
                } catch (error) {
                    console.log('세대옵션 상세 정보 불러오기 에러 : ', error)
                }
            },
            closeBtn () {
                this.$bvModal.hide('HoldinfoList')
            },
            detailCloseBtn () {
                this.$bvModal.hide('HoldOption')
            },
            /**
             * 세대옵션 입면도 리스트 조회
             */
            async getHouseElevationList(){
                const payload = {
                    dsItem : this.dsItem,
                    projectId : this.projectId
                }
                try {
                    const result = await API.houseOptn.getHouseElevationList(payload)
                    if(result?.dlElevation.length > 0){
                        this.gridData3 = result.dlElevation
                        this.gridData3Cnt = result.dlElevation.length
                    }
                } catch (error) {
                    console.log('입면도 리스트 조회 에러 : ' , error)
                }
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
            // gridData2Cnt
            exportExcel(){
                if(this.gridData2Cnt <= 0) {
                    return this.alert("등록된 세대정보가 없어 엑셀다운로드를 할 수 없습니다.")
                }
                var today = new Date();
                var year = today.getFullYear();
                var month = ('0' + (today.getMonth() + 1)).slice(-2);
                var day = ('0' + today.getDate()).slice(-2);
                var dateString = year+ month+ day;
                this.sheet2.down2Excel({
                    merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                    downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                    reqHeader:  {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Accept-Language': 'ko'
                                },
                    fileName:`세대정보_${dateString}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                })
            },
            elevationExcelDown (){
                if(this.gridData3Cnt <= 0) {
                    return this.alert("등록된 세대정보가 없어 엑셀다운로드를 할 수 없습니다.")
                }
                var today = new Date();
                var year = today.getFullYear();
                var month = ('0' + (today.getMonth() + 1)).slice(-2);
                var day = ('0' + today.getDate()).slice(-2);
                var dateString = year+ month+ day;
                this.sheet3.down2Excel({
                    merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                    downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                    reqHeader:  {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Accept-Language': 'ko'
                                },
                    fileName:`입면도_${dateString}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                })
            },
            elevationPrint : async function() {
                if(this.gridData3Cnt <= 0) {
                    return this.alert("등록된 세대정보가 없어 입면도를 출력할 수 없습니다.")
                }
                let url = '/sendApi/api/siteInfo/houseOptn/elevationPrint/write';
                // let url = '/sendApi/api/siteInfo/houseOptn/elevationPrintTest/write';
                
                const payload = {
                    dsItem : this.dsItem,
                    projectId : this.projectId
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
            },
        }
    }
</script>