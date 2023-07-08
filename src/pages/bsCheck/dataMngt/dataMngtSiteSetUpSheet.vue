<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area" v-show="currentTab == 0">
            <div class="lookup_box multi_line">
                <table>
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
                                    <option v-for="option in dongOptions" :key="option.value" :value="option.value">{{ option.value }}</option>
                                </select>
                            </td>
                            <th>호수</th>
                            <td>
                                <input type="text" class="form_control" v-model="search.addrHo" placeholder="입력해주세요" maxlength="10" @keyup.enter="clickSearch()">
                            </td>
                            <th>연동유무</th>
                            <td>
                                <select v-model="search.linkYn" class="form_control size_lg">
                                    <option :value="''">전체</option>
                                    <option :value="'Y'">연동</option>
                                    <option :value="'N'">미연동</option>
                                </select>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" v-on:click="clearOption">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="clickSearch()">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <strong class="txt_lg">세대정보({{totalCount}})</strong>
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(itpSheet)" v-on:click="clickSearch()" v-if="this.checkUser(this.userId,'down')">엑셀 다운로드</button>
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="qrCodeBtn" v-on:click="clickSearch()">QR코드</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap" :style="{height: 'calc(100vh - 320px)'}">
                    <div id="sheetTable" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div>
        </div>

        <!-- 공간/공종 연결 -->
        <div class="tab_area" v-show="currentTab == 1">
            <div class="inner">
                <div class="table_data small_tab_list">
                    <div class="write_box pb0" style="max-width: 900px;">
                        <h3>Step 1. 공간 선택
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkblue" v-on:click="saveCheck" v-if="this.checkUser(this.userId,'write')">저장</button>
                            </div>
                        </h3>
                        <div class="contents">
                            <div class="content_inner">
                                <div class="search_area">
                                    <input type="text" class="form_control" v-model="search1.bsSpaceMngName" placeholder="공간 명" maxlength="50" @keyup.enter="clickSearch('Space')">
                                    <button type="button" class="btn_search" v-on:click="clickSearch('Space')">검색</button>
                                </div>
                                <div class="link_area">
                                    <ul class="sub_1depth" @click="openEvt">
                                        <li class="on" v-show="spaceDefectData.filter(item => item.spaceTypeCode ==='H').length > 0">
                                            <div class="title">
                                                <a href="javascript:void(0)">세대</a>
                                                <div class="right_area">연결건수</div>
                                            </div>
                                            <ul class="sub_2depth">
                                                <li v-for="(item) in spaceDefectData.filter(item => item.spaceTypeCode ==='H')" :key="item.bsSpaceMngId" :value="item.bsSpaceMngId" :class="{on:depthIdx2 == item}" @click="depthIdx2 = item">
                                                    <a :class="{on : selectSpace === item.bsSpaceMngId}" href="javascript:void(0)" v-on:click="AssignCatergoryList(item.bsSpaceMngId)" >{{item.bsSpaceMngName}}</a>
                                                    <div class="right_area">{{item.assignDefectCnt}}</div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="on" v-show="spaceDefectData.filter(item => item.spaceTypeCode ==='P').length > 0">
                                            <div class="title">
                                                <a href="javascript:void(0)">공용</a>
                                                <div class="right_area">연결건수</div>
                                            </div>
                                            <ul class="sub_2depth">
                                                <li class="" v-for="(item) in spaceDefectData.filter(item => item.spaceTypeCode ==='P')" :key="item.bsSpaceMngId" :value="item.bsSpaceMngId" :class="{on:depthIdx2 == item}" @click="depthIdx2 = item">
                                                    <a :class="{on : selectSpace === item.bsSpaceMngId}" href="javascript:void(0)" v-on:click="AssignCatergoryList(item.bsSpaceMngId)">{{item.bsSpaceMngName}}</a>
                                                    <div class="right_area">{{item.assignDefectCnt}}</div>
                                                </li>
                                            </ul>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                            <div class="content_inner">
                                <p class="content_inner_tit">배정 공종</p>
                                <!-- ibsheet -->
                                <div class="ib_wrap" style="width: 485px;">
                                    <div id="sheetTable1" class="ibsheet_table" style="height:400px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="write_box arrow">
                        <button type="button" class="ico_data_prev" v-on:click="assignPrev">이전 영역으로 이동</button>
                        <button type="button" class="ico_data_next" v-on:click="assignNext">다음 영역으로 이동</button>
                    </div>
                    
                    <div class="write_box" style="max-width: 100%;">
                        <h3>Step 2. 공종 선택</h3>
                        <div class="contents">
                            <div class="content_inner">
                                <div class="search_area">
                                    <input type="text" class="form_control" v-model="search1.subName" placeholder="결함공종 명"  maxlength="50" @keyup.enter="clickSearch('Defect')">
                                    <button type="button" class="btn_search" v-on:click="clickSearch('Defect')">검색</button>
                                </div>
                                <div class="check_area" id="selctDefect">
                                    <div class="scroll_area">
                                        <ul class="sub_1depth" v-for="(item, index) in defectData" :key="item.midCodeId" :value="item.midCodeId" @click="openEvt">
                                            <li class="">
                                                <div class="title">
                                                    <a href="javascript:void(0)" class="txt_none"></a>
                                                    <label class="input_check">
                                                        <input type="checkbox" :id="item.midCodeId" :name="item.midCodeId" v-on:click="allChkAssignCatergory(item.midCodeId)">
                                                        <span class="label_text">{{item.midName}}</span>
                                                    </label>
                                                    <div class="right_area" v-show="index === 0">결함공종</div>
                                                    <div class="right_area" v-show="index !== 0"></div>
                                                </div>
                                                <ul class="sub_2depth">
                                                    <!-- .filter(item1 => item1.case2Code === item.case1) -->
                                                    <li v-for="(item1) in item.subInfo" :key="item1.subCodeId" :value="item1.subCodeId" @click="openEvt" >
                                                        <label class="input_check">
                                                            <input type="checkbox" :id="item.midCodeId" name="" v-on:change="selected(item.midCodeId)"
                                                            :data-mainCodeId="item.mainCodeId"  
                                                            :data-midCodeId="item.midCodeId" 
                                                            :data-midName="item.midName"
                                                            :data-subCodeId="item1.subCodeId" 
                                                            :data-subName="item1.subName" 
                                                            >
                                                            <span class="label_text">{{item.midName}}</span>
                                                        </label>
                                                        <div class="right_area">{{item1.subName}}</div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 협력사 공종연결 -->
        <div class="tab_area" v-show="currentTab == 2">
            <div class="lookup_box multi_line">
                <table>
                    <colgroup>
                        <col width="4%">
                        <col width="17%">
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="10%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>세부공종</th>
                            <td>
                                <select v-model="search2.midCodeId" class="form_control">
                                    <option :value="''" > 전체 </option>
                                    <option v-for="midData in categoryData.dlMidCode" :key="midData.midCodeId" :value="midData.midCodeId">{{ midData.midName }}
                                    </option>
                                </select>
                            </td>
                            <th>결함공종</th>
                            <td>
                                <select v-model="search2.subCodeId" class="form_control">
                                    <option :value="''" > 전체 </option>
                                    <option v-for="subData in categoryData.dlSubCode.filter(item => item.midCodeId === search2.midCodeId)" :key="subData.subCodeId" :value="subData.subCodeId">{{ subData.subName }}</option>
                                </select>
                            </td>
                            <th>협력업체</th>
                            <td><input type="text" class="form_control size_lg" v-model="search2.tradeNm" placeholder="입력해주세요" maxlength="50" @keyup.enter="clickSearch"></td>
                            <th></th>
                            <td>
                                <label class="input_radio" for="rdoSolar1">
                                    <input type="radio" id="rdoSolar1" name="" v-model="search2.spaceType" value="">
                                    <span class="label_text">전체</span>
                                </label>
                                <label class="input_radio" for="rdoSolar2">
                                    <input type="radio" id="rdoSolar2" name="" v-model="search2.spaceType" value="H">
                                    <span class="label_text">세대</span>
                                </label>
                                <label class="input_radio" for="rdoSolar3">
                                    <input type="radio" id="rdoSolar3" name="" v-model="search2.spaceType" value="P">
                                    <span class="label_text">공용</span>
                                </label>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" v-on:click="clearOption">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="clickSearch" v-if="this.checkUser(this.userId,'view')">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>동</th>
                            <td>
                                <select v-model="search2.standDong" class="form_control size_lg">
                                    <option :value="''">전체</option>
                                    <option v-for="option in dongOptions" :key="option.value" :value="option.value">{{ option.value }}</option>
                                </select>
                            </td>
                            <th>호</th>
                            <td><input type="text" class="form_control size_lg" v-model="search2.standHo" placeholder="입력해주세요" maxlength="10" @keyup.enter="clickSearch"></td>
                            <th>공용 공간</th>
                            <td>
                                <select v-model="search2.bsSpaceMngId" class="form_control">
                                    <option :value="''" > 전체 </option>
                                    <option v-for="spaceDefectData in spaceDefectData.filter(item => item.spaceTypeCode ==='P')" :key="spaceDefectData.bsSpaceMngId" :value="spaceDefectData.bsSpaceMngId">{{ spaceDefectData.bsSpaceMngName }}</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <!-- <button type="button" class="btn btn_sm btn_excel" v-if="this.checkUser(this.userId,'write')">엑셀 업로드</button> -->
                    <button type="button" class="btn btn_sm btn_excel" v-if="this.checkUser(this.userId,'down')" @click="fn_exportExcel(itqSheet)">엑셀 다운로드</button>
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_darkgray" @click="openPop" v-if="this.checkUser(this.userId,'write')">연결등록</button>
                        <button type="button" class="btn btn_md btn_darkgray" @click="deleteChk" v-if="this.checkUser(this.userId,'unuse')">삭제</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap" :style="{height: 'calc(100vh - 350px)'}">
                    <div id="sheetTable2" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div>
        </div>

        <!-- 결함내용문구 -->
        <div class="tab_area" v-show="currentTab == 3">
            <div class="lookup_box multi_line">
                <table>
                    <colgroup>
                        <col width="8%">
                        <col width="25%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>결함내용 문구</th>
                            <td><input type="text" class="form_control size_lg" v-model="search3.bsDefectCnts" placeholder="입력해주세요" maxlength="100" @keyup.enter="clickSearch"></td>
                            <td class="ar">
                                <button type="button" class="btn_reset" v-on:click="clearOption">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="clickSearch">검색</button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" v-if="this.checkUser(this.userId,'write')">엑셀 업로드</button>
                    <button type="button" class="btn btn_sm btn_excel" v-if="this.checkUser(this.userId,'down')" @click="fn_exportExcel(ituSheet)">엑셀 다운로드</button>
                    <div class="fr">
                        <div class="btn_number" v-if="this.checkUser(this.userId,'write')">
                            <select name="" id="" class="form_control num" v-model="addIdx"> 
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            <button type="button" class="btn btn_sm" v-on:click="addRow">행 추가</button>
                        </div>
                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="delRow">행 삭제</button>
                        <button type="button" class="btn btn_sm btn_darkblue" v-on:click="saveCheck" v-if="this.checkUser(this.userId,'write')">저장</button>
                    </div>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" :style="{height: 'calc(100vh - 320px)'}">
                    <div id="sheetTable3" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div>
        </div>
        <dataMngtDefectCompanyWrite
            v-on:fn-defect-company-write="fnDefectCompanyWrite"
        />
        <!-- v-on : 자식 > 부모  emit 명 : 받을 함수명 -->
        <!-- v-bind : 부모 > 자식 props 명 : 부모에서 사용하고 있는 변수명 -->
        <excel-download
            v-model="excelDownload.request"
            ref-id="dataMngtSiteSetupSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />

        <!-- 세대옵션 정보 팝업 -->
        <b-modal id="dataHoldOption" title="세대옵션 정보" hide-backdrop size="lg" @shown="getHouseInfoMySiteDetail">
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
                                    <td>{{Number(detail.standDong)}}</td>
                                    <!--  -->
                                    <td>{{Number(detail.addrHo)}}</td>
                                    <!--  -->
                                    <td>{{detail.noSize}}</td>
                                    <!--  -->
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong class="txt_md">2. 세대옵션 품목</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <div class="ib_wrap">
                             <!-- :style="{height: 'calc(100vh - 390px)'}" -->
                            <div id="sheetPopTable" class="ibsheet_table" style="height: 100%;"></div>
                        </div>
                     </div>
                </div>
            </template>
            <template #modal-footer> 
                <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">확인</b-button> -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="detailCloseBtn">닫기</b-button>
            </template>
        </b-modal>

        <Footer />
    </div>
    
</template>

<script>
    import DatepickerRange from '@component/common/DatePickerRange.vue'
    import loader from '@ibsheet/loader'
    import API from '@/apis/'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { sendPostApi, requestOptions } from '@/apis/common'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import { commonFn } from '@/script/commonFn.js';
    import dataMngtDefectCompanyWrite from '@/pages/bsCheck/dataMngt/dataMngtDefectCompanyWrite.vue'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'
    
    export default {
        name: 'BsCheckdataMngtSiteSetUpSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            DatepickerRange,
            loader,
            sendPostApi,
            requestOptions,
            Breadcrumb,
            dataMngtDefectCompanyWrite,
            ExcelDownload,
        },
        data() {
            return {
                /**
                 * 공통 data
                 */
                siteMstrId : '',
                userId : '',
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['세대정보', '공간/공종 연결', '협력사 공종연결', '결함내용문구'], // tab name

                /**
                 * 세대정보 data
                 */
                itpSheet : null,   
                dongOptions : [],
                houseInfoMySiteData : [],
                dlHouseOptionData : [],
                totalCount : 0,
                search : {
                    standDong : '',
                    standHo : '',
                    addrHo : '',
                    linkYn : '',
                    noSize : '',
                    siteMstrId : '',
                },

                 // 세대옵션 정보 팝업 파람
                itoSheet : null,
                standDong: '',
                addrHo: '',
                linkYn : '',
                detail : {
                    standDong : '',
                    standHo : '',
                    addrHo : '',
                    linkYn : '',
                    noSize : '',
                    siteMstrId : '',
                    projectNm : '',
                },

                ozReport:{src : '',},

                /* InspectionBsList: SQMS_BS_DATA_001 BS점검 > Set-up > 세대정보 */
                InspectionBsList : {
                    options: {
                        Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'linkYn', Header: [{ Value: '연동유무' }], RelWidth: 12 },
                            { Name: 'standDong', Header: [{ Value: '동' }], RelWidth: 4 },
                            { Name: 'addrHo', Header: [{ Value: '호수' }], RelWidth: 4 , Type : 'Float', Format : '####' },
                            { Name: 'addrFloor', Header: [{ Value: '층' }], RelWidth: 4 },
                            { Name: 'noSize', Header: [{ Value: '평형' }], RelWidth: 10 },
                            { Name: 'remark', Header: [{ Value: '추가정보' }], RelWidth: 16 },
                        ]
                    },
                    data: [
                        { linkYn: '연동', standDong: '101동', standHo: '101호', addrFloor: '1', Name:'58.6605', reMark: '',},
                    ],
                },

                /* HoldOption3: SQMS_WS01_006 세대옵션 정보 > 2. 세대옵션 품목 */
                PrdtOptions :{
                    options: {
                        Cfg: {
                            NoVScroll: 0,
                            CanEdit: 0,
                            NoDataMessage : 3,
                        },
                        Cols: [
                            { Name: 'dsItem', Header: [{ Value: '계약된 품목' }], RelWidth: 70 },
                            { Name: 'dtContract', Header: [{ Value: '계약일자' }], RelWidth: 30 },
                        ]
                    },
                    data: [
                        // { dsItem: '세대 옵션 정보가 없습니다.', dtContract: '세대 옵션 정보가 없습니다.' },  
                    ],
                },

                /**
                 * 공간/공증연결 data
                 */
                itrSheet : null,
                spaceDefectData : [],
                defectData : [],
                insertIds : [], //저장시 사용
                selectSpace : '', //선택된 공간 key
                search1 : {
                    bsSpaceMngName : '', // 공간      
                    subName : '',        // 결함공종명               
                },
                on : '',
                depthIdx2 : '',

                /* BS점검 > Set-up > 공간/공종 연결 */
                InspectionBsList1 : {
                    options: {
                        Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 10 },
                            { Name: 'midName', Header: [{ Value: '세부공종' }], RelWidth: 30, CanEdit:0},
                            { Name: 'subName', Header: [{ Value: '결함공종' }], RelWidth: 60, CanEdit:0 },
                            { Name: 'bsSpaceMngId', Visible:0},
                            { Name: 'midCodeId', Visible:0},
                            { Name: 'subCodeId', Visible:0},
                            { Name: 'mainCodeId', Visible:0},
                            { Name: 'bsSpaceDefectMngId', Visible:0},
                        ]
                    },
                    data: [
                        { case1: '', case2: '가구/가전공사', case3: '신발장'},
                    ],
                },

                /**
                 * 협력사 공종연결 data
                 */
                itqSheet : null,
                categoryData : {        //결함공종 및 유형 조회
                    dlMainCode : [],    //공종 조회
                    dlMidCode : [],     //세부공종 조회
                    dlSubCode : [],     //결함공종 조회
                },
                popSheet : null,    //협력사 공종 연결 팝업 동 : sheet
                popSheet1 : null,   //협력사 공종 연결 팝업 층/호 : sheet
                search2 : {
                    midCodeId : '',
                    subCodeId : '',
                    standDong : '',
                    standHo : '',
                    tradeNm : '',
                    spaceType : '',
                    bsSpaceMngId : '',
                }, 
                defectCompanyPopId : 'defectCompanyPopId',
                deleteIds : [],
                /* BS점검 > Set-up > 협력사 공종연결 */
                InspectionBsList2 : {
                    options: {
                        Cfg:{
                            NoVScroll : false,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
                            { Name: 'bsDefectPntrMngId', Visible:0},
                            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5, CanEdit:0},
                            { Name: 'midName', Header: [{ Value: '세부공종' }], RelWidth: 10, CanEdit:0},
                            { Name: 'subName', Header: [{ Value: '결함공종' }], RelWidth: 10, CanEdit:0},
                            { Name: 'tradeNm', Header: [{ Value: '협력업체' }], RelWidth: 10, CanEdit:0},
                            { Name: 'spaceTypeCode', Header: [{ Value: '구분' }], RelWidth: 10, CanEdit:0},
                            { Name: 'standDong', Header: [{ Value: '동' }], RelWidth: 10, CanEdit:0},
                            { Name: 'addrHo', Header: [{ Value: '호' }], RelWidth: 10, CanEdit:0},
                            { Name: 'bsSpaceMngName', Header: [{ Value: '공용공간' }], RelWidth: 10, CanEdit:0},
                            { Name: 'regDt', Header: [{ Value: '등록일' }], RelWidth: 10, CanEdit:0},
                        ]
                    },
                    data: [
                        { case1: '', case2: '1', case3: '거실', case4: '거실', case5: '붙박이장', case6: '110', case7: '302', case8: '㈜리밧흐', case9: '공통', case10: '2021-11-02', case11: '배정' },
                    ],
                },
                /**
                 * 결함내용문구 data
                 */
                ituSheet : null,
                search3 : {
                    bsDefectCnts : '',
                },
                addIdx : 1,
                deleteRow : [],
                /* BS점검 > Set-up > 결함내용문구 */
                /* InspectionBsList3: 현장Set-up > BS점건 > 결함내용문구 */
                InspectionBsList3 : {
                    options: {
                        Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
                            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 15 },
                            { Name: 'bsDefectCnts', Header: [{ Value: '결함내용 문구' }],  RelWidth: 35, Size:250 },
                            { Name: 'bsDefrctCntsMngId', Visible:0},
                        ]
                    },
                    data: [
                        { case1: '', case2: '결함내용 문구 입니다.', case3: ''},
                    ],
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
            this.siteMstrId = this.$session.get('userInfo').siteMstrId;
            this.userId = this.$session.get('userInfo').userId;
            //세대정보
            this.getHouseInfoMySiteDongList(); //세대정보(검색조건 (동)) 조회
            this.getHouseInfoMySiteList(); //세대정보 조회
        },
        beforeDestroy() {
            //시트 초기화
            if(this.itpSheet) {
                this.itpSheet.dispose();
            }
            if(this.itrSheet) {
                this.itrSheet.dispose();
            }
            if(this.itoSheet) {
                this.itoSheet.dispose();
            }
        },
        watch : {
            'currentTab' : {
                handler(newVal) {
                    if(newVal === 0) {
                        //세대정보
                        this.getHouseInfoMySiteDongList(); //세대정보(검색조건 (동)) 조회
                        this.getHouseInfoMySiteList(); //세대정보 조회
                    } else if(newVal === 1) {
                        //공간,공증 연결
                        this.getSpaceDefect();  //공간 선택 조회
                        this.getDefectChoise(); //공종 선택 조회
                        this.getSpacedefectList(); //배정 공종 조회
                    } else if(newVal === 2) {
                        //협력사 공종연결 리스트
                        this.getCategoryData(); //공종,세부공종 셀렉트
                        this.getDefectPntrList();
                        this.getSpaceDefect();
                    } else if(newVal === 3) {
                        //결함문구내용 
                        this.getDerctCntsMng();
                    }
                }
            },
            'search2.midCodeId': {
                handler() {
                    this.search2.subCodeId = '';
                },
            },
            'search2.spaceType': {
                handler(NewVal) {
                    this.search2.spaceType = NewVal
                },
            },
            'search.standHo' : {
                handler(NewVal) {
                    this.search.standHo = NewVal.replace(/[^0-9]/g, '');
                },
            },
            'search2.standHo' : {
                handler(NewVal) {
                    this.search2.standHo = NewVal.replace(/[^0-9]/g, '');
                },
            }
        },
        methods: {
            //세대정보 검색조건(동) 조회
            async getHouseInfoMySiteDongList() {
                const payload = {
                    siteMstrId : this.siteMstrId
                }
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteDongList(payload)
                    if(result?.dlHouseDong){
                        this.setTopFilterOption(result.dlHouseDong)
                    }
                } catch (error) {
                    console.error('검색조건(동) 리스트 조회 실패 : ', error)
                }
            },
             /**
             * 세대정보 검색조건(동) 세팅
             */
            setTopFilterOption (data) {
                const allDongList = data.map(item => {
                    return {
                        label: item,
                        value: Number(item),
                    }
                })
                this.dongOptions = [..._.uniqBy(allDongList, 'value')]
            },
            //세대 정보 조회
            async getHouseInfoMySiteList() {
                this.InspectionBsList.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        this.search.siteMstrId = this.siteMstrId
                        let payload = {};
                        if(!commonFn.methods.isEmpty(String(this.search.standDong))) {
                            payload['standDong'] = String(this.search.standDong)
                        }
                        if(!commonFn.methods.isEmpty(this.search.addrHo)) {
                            payload['addrHo'] = this.search.addrHo
                        }
                        if(!commonFn.methods.isEmpty(this.search.linkYn)) {
                            payload['linkYn'] = this.search.linkYn
                        }
                        if(!commonFn.methods.isEmpty(this.search.siteMstrId)) {
                            payload['siteMstrId'] = this.search.siteMstrId
                        }
                        try {
                            const result = await API.houseOptn.getHouseInfoMySiteList(payload)
                            if(result?.dlHouseDetail){
                                this.houseInfoMySiteData = result.dlHouseDetail.map(row =>{
                                    return {
                                        ...row,
                                        linkYn : row.linkYn === 'Y'? '연동': '미연동',
                                        standDong : Number(row.standDong)
                                    }
                                })
                            }
                            event.sheet.loadSearchData({
                                data: this.houseInfoMySiteData,
                                append : false
                            })
                            event.sheet.getDataRows().forEach(row => {
                                row.CanEdit = 0;
                                event.sheet.refreshRow(row)
                            })
                            this.totalCount = event.sheet.getTotalRowCount();
                        } catch (error) {
                            console.error('세대정보 리스트 조회 실패 : ', error)
                        }  
                    },
                    ondblclick : this.dbClickGrid
                }

                let options = this.InspectionBsList.options;  
                loader.createSheet({
                    el: 'sheetTable',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itpSheet = sheet;
                })
            },
            /**
             * 공간 조회 API
             */
            async getSpaceDefect() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/bsCheck/spacedefectCnt/list';
                let param = {
                    siteMstrId : this.siteMstrId
                };
                if(!commonFn.methods.isEmpty(this.search1.bsSpaceMngName)) {
                    param['bsSpaceMngName'] = this.search1.bsSpaceMngName;
                    
                }
                try {
                    const response = await sendPostApi(url, param);
                    if (response.status === 200 && response.data) {
                        this.spaceDefectData = response.data.dlSpaceDefectCnt;
                    } else {
                        // console.log('공간 리스트 조회 실패');
                    }
                } catch (error) {
                    console.error('공간 리스트 조회 실패 :' + error)
                }
            },
            /**
             * 공종 조회 API 
             */
            async getDefectChoise() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/bsCheck/defectChoise/list';
                let param = {};
                if(!commonFn.methods.isEmpty(this.search1.subName)) {
                    param['subName'] = this.search1.subName;
                }
                try {
                    const response = await sendPostApi(url, param);
                    if (response.status === 200 && response.data) {
                        this.defectData = response.data.dmDefectSelect;
                    } else {
                        // console.log('공종 리스트 조회 실패');
                    }
                } catch (error) {
                    console.error('공종 리스트 조회 실패 :' + error)
                }
            },
            /**
             * 배정공종 리스트 조회 API
             */
            async getSpacedefectList() {
                this.InspectionBsList1.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        if(!commonFn.methods.isEmpty(this.selectSpace)) {
                            try {
                                //'API 요청 Method'
                                let url = '/sendApi/api/bsCheck/spacedefect/list';
                                let param = {
                                    siteMstrId : this.siteMstrId,
                                }
                                if(!commonFn.methods.isEmpty(this.selectSpace)) {
                                    param['bsSpaceMngId'] = this.selectSpace;
                                }
                                
                                requestOptions.headers['Accept-Language'] = "ko";
                                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                                const response = await sendPostApi(url, param);
                                if (response.status === 200 && response.data) {
                                    this.InspectionBsList1.data = response.data.dlSpaceDefect;
                                    event.sheet.loadSearchData({
                                        data: this.InspectionBsList1.data,
                                        append : false // false : 데이터 클리어 후 reload 느낌 : 검색조건 붙었을때 
                                    })
                                }
                            } catch (error) {
                                console.error('결함공종 및 유형 리스트 조회 실패 :'+error)
                            }
                        }
                    },
                    onAfterClick: this.clickGrid,
                    onAfterChange: this.changeGrid,
                }

                let options = this.InspectionBsList1.options;  
                loader.createSheet({
                    el: 'sheetTable1',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itrSheet = sheet;
                })
            },
            //공종 교재 공종 및 세부 공종 셀렉트 옵션 데이터 세팅 API 
            async getCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/mainMidCode/list';
                let param = { codeType: 'BS' };

                try {
                    const response = await sendPostApi(url, param);
                    if (response.status === 200 && response.data) {
                        this.categoryData = response.data
                    }
                } catch (error) {
                    console.error('공종,세부공종,결함공종 코드 리스트 조회 실패 : '+error)
                }
            },
            /**
             * 공간/공종 연결 저장 API
             */
            async spaceDefectWrite() {
                let sheet = this.itrSheet;
                let changedInfoToJson = [];
                if(this.currentTab === 1) {
                    changedInfoToJson = sheet.getSaveJson({saveMode: 3})
                    changedInfoToJson.data.forEach((item) => {
                        item.status = item.STATUS;
                        item.bsSpaceMngId = this.selectSpace;
                        item.mainCodeId = sheet.getRowById(item.id).mainCodeId;
                        item.midCodeId = sheet.getRowById(item.id).midCodeId;
                        item.subCodeId = sheet.getRowById(item.id).subCodeId;
                        item.siteMstrId = this.siteMstrId;
                        item.inUser = this.siteMstrId;
                    })

                    if(changedInfoToJson.Message === 'NoTargetRows') {
                        this.alert('저장할 데이터가 없습니다.')
                        return;
                    } else {
                        try {
                            //'API 요청 Method'
                            let url = '/sendApi/api/bsCheck/spacedefect/write';
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                            const response = await sendPostApi(url, changedInfoToJson.data.reverse()).then((result) => {
                                if(result.status === 200) {
                                    this.alert('공간/공종 연결정보가 저장되었습니다.', ()=> {
                                        this.getSpacedefectList();
                                        this.getSpaceDefect();
                                    })
                                    // this.alert('공간/공종 연결정보가 저장되었습니다.');
                                    // this.getSpacedefectList();
                                    // this.getSpaceDefect();
                                } else {
                                    this.alert('공간/공종 연결정보 저장에 실패했습니다.')
                                }
                            }).catch((e) => {
                                return e.response
                            });
                        } catch (error) {
                            console.error('공간/공종 연결 저장 실패 : '+error)
                        }
                    }
                } else if(this.currentTab === 2) {
                    
                }
            },
            //협력사 공종연결 리스트 조회 API
            async getDefectPntrList() {
                this.InspectionBsList2.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        try {
                            //'API 요청 Method'
                            let url = '/sendApi/api/bsCheck/defectPntr/list';
                            let param = {
                                siteMstrId : this.siteMstrId,
                            }
                            if(!commonFn.methods.isEmpty(this.search2.midCodeId)) {
                                param['midCodeId'] = this.search2.midCodeId  
                            }
                            if(!commonFn.methods.isEmpty(this.search2.subCodeId)) {
                                param['subCodeId'] = this.search2.subCodeId 
                            }
                            if(!commonFn.methods.isEmpty(String(this.search2.standDong))) {
                                param['standDong'] = String(this.search2.standDong) 
                            }
                            if(!commonFn.methods.isEmpty(this.search2.standHo)) {
                                param['standHo'] = String(this.search2.standHo)
                                param['addrHo'] = String(this.search2.standHo)
                            }
                            if(!commonFn.methods.isEmpty(this.search2.tradeNm)) {
                                param['tradeNm'] = this.search2.tradeNm
                            }
                            if(!commonFn.methods.isEmpty(this.search2.spaceType)) {
                                param['spaceTypeCode'] = this.search2.spaceType
                            }
                            if(!commonFn.methods.isEmpty(this.search2.bsSpaceMngId)) {
                                param['bsSpaceMngId'] = this.search2.bsSpaceMngId
                            }
                            
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                            const response = await sendPostApi(url, param);
                            if (response.status === 200 && response.data) {
                                this.InspectionBsList2.data = response.data.dlSpaceDefectCnt;
                                this.InspectionBsList2.data.forEach(item => {
                                    if(commonFn.methods.isEmpty(item.bsSpaceMngName)) {
                                        item.bsSpaceMngName = '-';
                                    }
                                    if(!commonFn.methods.isEmpty(item.spaceTypeCode)) {
                                        if(item.spaceTypeCode === 'H') {
                                            item.spaceTypeCode = '세대';
                                            item.standDong = Number(item.standDong)
                                            item.addrHo = Number(item.addrHo)
                                        } else if(item.spaceTypeCode === 'P') {
                                            item.spaceTypeCode = '공용';
                                            item.standDong = '-';
                                            item.addrHo = '-';
                                        }
                                    }
                                    
                                })
                                event.sheet.loadSearchData({
                                    data: this.InspectionBsList2.data,
                                    append : false // false : 데이터 클리어 후 reload 느낌 : 검색조건 붙었을때 
                                })
                                
                            }
                        } catch (error) {
                            console.error('결함공종 및 유형 리스트 조회 실패 :'+error)
                        }
                    },
                    onAfterClick: this.clickGrid,
                    onAfterChange: this.changeGrid,
                }

                let options = this.InspectionBsList2.options;  
                loader.createSheet({
                    el: 'sheetTable2',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itqSheet = sheet;
                })
            },
            //삭제
            async deleteSave() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/bsCheck/defectPntr/write';
                try {
                    const response = await sendPostApi(url, this.deleteIds).then((result) => {
                        if(result.status === 200) {
                            this.saveCheckYn = true;
                            this.alert('삭제되었습니다.', async => {
                                this.getDefectPntrList();
                            })
                            // this.alert('삭제가 완료되었습니다.');
                            // this.getDefectPntrList();
                        } else {
                            this.alert('삭제에 실패했습니다.', async => {
                                this.getDefectPntrList();
                            })
                        }
                        
                    }).catch((e) => {
                        return e.response
                    });
                } catch (error) {
                    console.error('협력사 공종연결 리스트 삭제 실패 : '+error)
                }
            },
            //결함내용문구
            async getDerctCntsMng() {
                this.InspectionBsList3.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        try {
                            //'API 요청 Method'
                            let url = '/sendApi/api/bsCheck/defectCntsMng/list';
                            let param = {
                                siteMstrId : this.siteMstrId,
                            }

                            if (this.search3.bsDefectCnts) {
                                param.bsDefectCnts = this.search3.bsDefectCnts
                            }
                            
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                            const response = await sendPostApi(url, param);
                            if (response.status === 200 && response.data) {
                                this.InspectionBsList3.data = response.data.dlDefectMng;
                                event.sheet.loadSearchData({
                                    data: this.InspectionBsList3.data,
                                    append : false // false : 데이터 클리어 후 reload 느낌 : 검색조건 붙었을때 
                                })
                                event.sheet.getDataRows().forEach(row => {
                                    row.CanEdit = 0;
                                    event.sheet.refreshRow(row)
                                })                  
                            }
                        } catch (error) {
                            console.error('결함내용문구 리스트 조회 실패 :'+error)
                        }
                    },
                    onAfterClick: this.clickGrid,
                    onAfterChange: this.changeGrid,
                }

                let options = this.InspectionBsList3.options;  
                loader.createSheet({
                    el: 'sheetTable3',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.ituSheet = sheet;
                })
            },
            //결함내용 문구 저장
            async defectCntsWrite() {
                let sheet = this.ituSheet;
                let changedInfoToJson = [];
                changedInfoToJson = sheet.getSaveJson({saveMode: 3})
                changedInfoToJson.data.forEach((item) => {
                    item.status = item.STATUS;
                    item.bsDefectCnts = this.bsDefectCnts;
                    item.bsDefrctCntsMngId = sheet.getRowById(item.id).bsDefrctCntsMngId;
                    item.siteMstrId = this.siteMstrId;
                    item.inUser = this.siteMstrId;
                })
                // console.log('1')
                // console.log(changedInfoToJson)
                // console.log(this.insertIds)
                if(changedInfoToJson.Message === 'NoTargetRows' && this.insertIds.length === 0) {
                    this.alert('저장할 데이터가 없습니다.')
                    return;
                } else {
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    
                    let url = '/sendApi/api/bsCheck/defectCntsMng/write';
                    try {
                        const response = await sendPostApi(url, this.insertIds).then((result) => {
                            if(result.status === 200) {
                                this.saveCheckYn = true;
                                this.alert('저장되었습니다.', () => {
                                    this.getDefectPntrList();
                                })
                                // this.alert('저장이 완료되었습니다.');
                                // this.getDefectPntrList();
                            } else {
                                this.alert('저장에 실패했습니다.', () => {
                                    this.getDefectPntrList();
                                })
                                //this.alert('저장에 실패하였습니다.');
                            }
                            
                        }).catch((e) => {
                            return e.response
                        });
                    } catch (error) {
                        console.error('결함내용 문구 저장 실패 : '+error)
                    }
                }
            },
            /**
             * EVENT
             */
            //검색
            clickSearch(param) {
                if(this.currentTab === 0 ) {    //결함공종 및 유형 검색
                    this.getHouseInfoMySiteList();
                } else if(this.currentTab === 1){     //공간/공종 연결 검색
                    if(param === 'Space') { //공간검색
                        this.getSpaceDefect();
                    } else if(param === 'Defect') { // 공종검색
                        this.getDefectChoise();
                    }
                } else if(this.currentTab === 2) { // 협력사 공종연결 검색
                    this.getDefectPntrList();
                } else if(this.currentTab === 3) {
                    this.getDerctCntsMng();
                }
            },
            //초기화
            clearOption() {
                if(this.currentTab === 0) { // 세대정보 초기화
                    this.search.standDong = '';
                    this.search.standHo = '';
                    this.search.noSize = '';
                    this.search.linkYn = '';
                } else if(this.currentTab === 2) { // 협력사 공종연결 초기화
                    this.search2.midCodeId = '';
                    this.search2.subCodeId = '';
                    this.search2.standDong = '';
                    this.search2.standHo = '';
                    this.search2.tradeNm = '';
                    this.search2.spaceType = '';
                    this.search2.bsSpaceMngId = '';
                } else if(this.currentTab ===3) {
                    this.search3.bsDefectCnts = '';
                }
            },
            //저장 체크
            saveCheck() {
                this.saveCheckYn = false;
                let rows = [];
                this.insertIds = [];
                let sheet = this.itrSheet
                if(this.currentTab === 1) { // 공간/공종 연결
                    rows = sheet.getDataRows();
                    let dup = sheet.getRowsByDup('mideCodeId,subCodeId', false, false, false, "Deleted");
                    if(dup.length>0){
                        for(let x = 0; x< dup.length; x++){
                            for(let y = 1;y<dup[x].length; y++){
                                sheet.setAttribute({
                                    row: dup[x][y],
                                    attr: 'Color',
                                    val: '#f96f6f'
                                })
                            }
                        }
                        this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.');
                        return;
                    }
                    if(rows.length === 0) {
                        if(commonFn.methods.isEmpty(this.selectSpace)) {
                            this.alert('공간을 선택해주세요.')
                            return;
                        } else {
                            this.alert('공종을 선택해주세요.')
                            return;
                        }
                    } else {
                        if(commonFn.methods.isEmpty(this.selectSpace)) {
                            this.alert('공간을 선택해주세요.')
                            return;
                        }
                    }
                    for(let x = 0; x<rows.length; x++){
                        let row = {};
                        if(commonFn.methods.isEmpty(rows[x].midCodeId)) {
                            this.alert('세부공종을 선택해주세요.');
                            return;
                        }
                        if(commonFn.methods.isEmpty(rows[x].subCodeId)){
                            this.alert('결함공종을 선택해주세요.');
                            return;
                        }
                        
                        row['status'] = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':(rows[x].Changed?'Changed':''));
                        row['bsSpaceDefectMngId'] = this.selectSpace;
                        row['mainCodeId'] = rows[x].mainCodeId;
                        row['midCodeId'] = rows[x].midCodeId;
                        row['subCodeId'] = rows[x].subCodeId;
                        this.insertIds.push(row);  
                    }   
                    
                    if(this.insertIds.length > 0) {
                        this.confirm('저장하시겠습니까?', this.spaceDefectWrite);
                        this.saveCheckYn = true;
                    }
                } else if(this.currentTab === 2) { //협력사 공종연결 등록
                    
                } else if(this.currentTab === 3) { //결함내용문구
                    if(this.ituSheet.getSaveJson({ saveMode: 3}).length === 0 && this.deleteRows.length === 0) {
                        this.alert('수정된 내용이 없습니다.')
                        return
                    }
                    this.insertIds = [];
                    //rows = 
                    let valChek = true
                    this.ituSheet.getDataRows().filter(row => !row.Deleted).some(row => {
                        if(row.bsDefectCnts === '' || row.bsDefectCnts === null) {
                            this.alert(`${row.SEQ}번 결함내용 문구를 입력해주세요.`)
                            valChek = false;
                            return true
                        }
                    });
                    if(valChek) {
                        // for(let x = 0; x<rows.length; x++){
                        //     let row = {};
                        //     row['status'] = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':(rows[x].Changed?'Changed':''));
                        //     row['bsDefectCnts'] = rows[x].bsDefectCnts;
                        //     row['bsDefrctCntsMngId'] = rows[x].bsDefrctCntsMngId;
                        //     row['siteMstrId'] = this.siteMstrId
                        //     this.insertIds.push(row);
                        // }
                        this.ituSheet.getSaveJson({saveMode: 3}).data.map(row => {
                            row.status = row.STATUS
                            row.bsDefectCnts = row.bsDefectCnts
                            row.bsDefrctCntsMngId =row.bsDefrctCntsMngId
                            row.siteMstrId = this.siteMstrId
                            this.insertIds.push(row);
                        })

                        for(let l=0; l<this.deleteRow.length; l++) {
                            this.insertIds.push(this.deleteRow[l])
                        }
                    }
                    // console.log('this.insertIds')
                    //     console.log(this.insertIds)
                    if(this.insertIds.length > 0) {
                        this.confirm('저장하시겠습니까?', this.defectCntsWrite);
                        this.saveCheckYn = true;
                    }
                }
            },
            deleteChk() {
                this.saveCheckYn = false;
                let sheet = this.itqSheet;
                if(this.currentTab === 2) { //협력사 공종연결 list 삭제 
                    let checkedRows = [];
                    
                    checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                    if(checkedRows.length === 0) {
                        this.alert('삭제할 행을 선택해주세요.');
                        return;
                    } else {
                        sheet.deleteRows({rows : checkedRows })
                        this.deleteIds = [];
                        let rows = [];
                        rows = this.itqSheet.getDataRows();
                        for(let x = 0; x<rows.length; x++){
                            let row = {};
                            row['status'] = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':(rows[x].Changed?'Changed':''));
                            row['bsDefectPntrMngId'] = rows[x].bsDefectPntrMngId;
                            row['bsSpaceMngId'] = rows[x].bsSpaceMngId;
                            row['standDong'] = rows[x].standDong;
                            row['addrHo'] = rows[x].addrHo;
                            row['addrFloor'] = rows[x].addrFloor;
                            row['siteMstrId'] = this.siteMstrId;
                            this.deleteIds.push(row);
                        }

                        if(this.deleteIds.length > 0) {
                            this.confirm('삭제하시겠습니까?', this.deleteSave);
                        }
                    }
                }
            },
            getEventTarget: function(e) {
                e = e || window.event;
                return e.target || e.srcElement; 
            },
            openEvt: function(e) {
                var target = this.getEventTarget(e);
                if(target.parentElement.className == "title"){
                    target.parentElement.parentElement.classList.toggle('on')
                }
            },
            importExcel () {
                const options = {
                    append: 1,                  // 새로로드할지, 뒤에 붙일지 여부
                    fileExt: 'xls|xlsx|csv',    // 가용 확장자
                    mode: 'HeaderMatch'         // column 명 매칭해서 처리
                }
                if(this.currentTab === 0) {
                    this.itpSheet.importData(options)
                }
            },
            exportExcel () {
                // export Data options
                // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
                const options = {};
                if(this.currentTab === 0) {
                    options['fileName'] = `bsCheckSiteSetUpHoseOtpnInfo_${'date'}.xlsx`,
                    this.itpSheet.exportData(options)
                }
            },
            /**
             * 공간/공종 연결 EVENT
             */
            //공간에 따른 배정 공증 리스트 가져오기
            AssignCatergoryList(spaceItem){
                this.selectSpace = spaceItem;
                this.getSpacedefectList();
            },
            //공종 전체 체크박스 선택
            allChkAssignCatergory(chkId) {
                //console.log(chkId);
                //console.log("@@ element : %o",this.$el.querySelectorAll("#selctDefect ul.sub_1depth"));
                //let ulObj = this.$el.querySelectorAll("#selctDefect ul.sub_1depth input[type='checkbox'] #"+chkId)

                let ulObj = this.$el.querySelectorAll("#selctDefect ul.sub_2depth #"+chkId)

                ulObj.forEach(item => {
                    if(item.checked) {
                        item.checked = false;
                    } else {
                        item.checked = true;
                    }
                })
            },
            
            //공종 부분 체크박스 선택
            selected(chkId) {
                let ulObj = this.$el.querySelectorAll("#selctDefect ul.sub_2depth #"+chkId)
                let ulObj2 = this.$el.querySelectorAll("#selctDefect input[name="+chkId+"]")
                //체크 박스 event
                let chkLength = 0;
                ulObj.forEach(item => {
                    if(item.checked) {
                        item.checked = true;
                        chkLength++;
                    } else {
                        item.checked = false;
                    }
                })
                ulObj2.forEach(item => {
                    if(ulObj.length === chkLength) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                })
            },
            //공종선택 :  < 옮기기
            assignPrev() {
                let sheet = this.itrSheet;
                let cnt = 0;
                let chkObj = this.$el.querySelectorAll("#selctDefect ul.sub_2depth input[type='checkbox']:checked");

                for(let i=0; i<chkObj.length; i++) {
                    let selectData = {
                            chk : '',
                            midName : chkObj[i].dataset.midname,
                            subName : chkObj[i].dataset.subname,
                            midCodeId : chkObj[i].dataset.midcodeid,
                            subCodeId : chkObj[i].dataset.subcodeid,
                            mainCodeId : chkObj[i].dataset.maincodeid,
                    }
                    sheet.addRow({"next":sheet.getFirstRow(),"init": selectData})
                    cnt++;
                }
                if(cnt === 0) {
                    this.alert('공종을 선택해주세요.');
                    return
                } else {
                    //console.log(this.$el.querySelectorAll("#selctDefect ul.sub_2depth input[type='checkbox']:checked"));
                    let chkedObj = this.$el.querySelectorAll("#selctDefect ul.sub_2depth input[type='checkbox']:checked ")
                    for(let i=0; i<chkedObj.length; i++) {
                        let ulObj = this.$el.querySelectorAll("#selctDefect ul.sub_2depth #"+chkedObj[i].dataset.midcodeid)
                        let ulObj2 = this.$el.querySelectorAll("#selctDefect input[name="+chkedObj[i].dataset.midcodeid+"]")
                        ulObj.forEach(item => {
                            item.checked = false;
                        })
                        ulObj2.forEach(item => {
                            item.checked = false;
                        })
                    }
                }

                let dup = sheet.getRowsByDup('mideCodeId,subCodeId', false, false, false, "Deleted");
                if(dup.length>0){
                    for(let x = 0; x< dup.length; x++){
                        for(let y = 1;y<dup[x].length; y++){
                            sheet.setAttribute({
                                row: dup[x][y],
                                attr: 'Color',
                                val: '#f96f6f'
                            })
                        }
                    }
                    this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.');
                    return;
                }
            },
            //공종선택 :  > 빼기
            assignNext() {
                let sheet = this.itrSheet;
                let checkedRows = [];
                checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);

                if(checkedRows.length === 0) {
                    this.alert('배정 공종을 선택해주세요.');
                    return;
                } else {
                    sheet.deleteRows({rows : checkedRows })
                    checkedRows.forEach(item => {
                        sheet.hideRow({
                            row: item,
                            del: false,
                            norender: false
                        })
                    })
                    checkedRows.forEach(item => {
                        item['chk'] = false
                        sheet.refreshCell(item, 'chk')
                    })
                }
            },

            //협력사 공종연결 팝업 
            openPop() {
                this.$bvModal.show(this.defectCompanyPopId);
            },
            fnDefectCompanyWrite() {
                this.getDefectPntrList();
            },
            addRow : function() {      //행추가
                let sheet = this.ituSheet;
                let checkRows = [];

                checkRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                if(checkRows.length === 0) {
                    sheet.addRows({
                        count : this.addIdx,
                        next : checkRows.length > 0 ? checkRows[0].nextSibling : null,
                    })
                } else {
                    sheet.addRows({
                        count : this.addIdx,
                        next : checkRows.length > 0 ? checkRows[0].nextSibling : null,
                    })
                }
            },
            delRow : function () {     //행삭제
                this.saveCheckYn = false;

                let sheet = this.ituSheet;
                let checkedRows = [];

                checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                if(checkedRows.length === 0) {
                    this.alert('선택된 행이 없습니다.');
                    return;
                } else {

                    sheet.deleteRows({rows : checkedRows })
                    checkedRows.forEach(row => {
                        if(row.bsDefrctCntsMngId != null && row.bsDefrctCntsMngId.toString().length>0){
                            row['status']                      = 'Deleted';
                            row['bsDefrctCntsMngId']           = row.bsDefrctCntsMngId
                            this.deleteRow.push(row);
                        }
                    })

                    sheet.removeRows(checkedRows);
                    //this.confirm('삭제하시겠습니까?', async=> {
                        // this.deleteRow = sheet.deleteRows({rows : checkedRows })
                        // checkedRows.forEach(item => {
                        //     sheet.hideRow({
                        //         row: item,
                        //         del: false,
                        //         norender: false
                        //     }) 
                        // })
                        // checkedRows.forEach(item => {
                        //     item['chk'] = false
                        //     sheet.refreshCell(item, 'chk')
                        // })
                        // console.log(this.deleteRow)
                    //})
                }
            },
            /**
             * QR코드 버튼 클릭
             */
            qrCodeBtn () {
                const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                let options = 'N';
                let urlParam = '';
                if(!commonFn.methods.isEmpty(String(this.search.standDong))) {
                    urlParam += "&STAND_DONG="+Number(this.search.standDong)
                }
                if(!commonFn.methods.isEmpty(this.search.standHo)) {
                    urlParam += "&ADDR_HO="+this.search.standHo
                }
                if(!commonFn.methods.isEmpty(this.search.linkYn)) {
                    urlParam += "&LINK_YN="+this.search.linkYn
                }
                
                var popUrl = this.$store.getters['auth/getOzTypeList'][43].jspNm+"&OPT_YN=+options"+"&SITE_MSTR_ID=" + this.siteMstrId+urlParam;
                window.open(popUrl, '_blank')
            },
            /**
             * 세대정보 - 상세 세대옵션 정보 팝업
             */
            async getHouseInfoMySiteDetail(){
                this.PrdtOptions.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        let payload = {
                            standDong : this.standDong,
                            addrHo : this.addrHo,
                            siteMstrId : this.$session.get('userInfo').siteMstrId
                        }
                        try {
                            const result = await API.houseOptn.getHouseInfoMySiteDetail(payload)
                            if(result?.dlHouseOption){
                                
                                //if(result.dlHouseOption[0].dsItem !== null || result.dlHouseOption[0].dtContract !== null){
                                    this.dlHouseOptionData = [];
                                    this.dlHouseOptionData = result.dlHouseOption
                                    
                                    event.sheet.loadSearchData({
                                        data: this.dlHouseOptionData,
                                        append : false
                                    })
                                //}
                                // this.detailGridData = result.dlHouseOption
                                // if(result.dlHouseOption[0].dsItem === null || result.dlHouseOption[0].dtContract === null){
                                //     this.detailGridData = PrdtOptions.data
                                // }
                            } else {
                               this.dlHouseOptionData = this.PrdtOptions.data[0]
                            }
                        } catch (error) {
                            console.error('세대옵션 상세 정보 불러오기 에러 : ', error)
                        }
                    },
                }
                let options = this.PrdtOptions.options;  
                loader.createSheet({
                    el: 'sheetPopTable',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itoSheet = sheet;
                })
            },
            /**
             * 세대 옵션 상세 이동
             */
            dbClickGrid(evt) {
                if(evt.col === 'linkYn' || evt.col === 'standDong' || evt.col === 'addrHo' || evt.col === 'addrFloor' || evt.col === 'noSize'){
                    this.standDong = evt.row.standDong
                    this.addrHo = evt.row.addrHo
                    this.linkYn = evt.row.linkYn
                    this.detail.standDong = evt.row.standDong
                    this.detail.addrHo = evt.row.addrHo
                    this.detail.noSize = evt.row.noSize
                    this.detail.projectNm = this.$session.get('userInfo').projectNm
                    //this.()
                    this.$bvModal.show('dataHoldOption')
                }
            },
            detailCloseBtn () {
                this.$bvModal.hide('dataHoldOption')
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
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][45].jspNm
                + '&STAND_DONG=' + this.standDong
                + '&ADDR_HO='+ this.addrHo 
                + "&LINK_YN="+options
                + "&SITE_MSTR_ID=" + this.$cookies.get("siteMstrId");

                window.open(this.ozReport.src, '_blank')
            },

            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {

                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['chk'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `${['세대정보','', '협렵사_공종연결', '결함내용문구'][this.currentTab]}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
                
                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `${['세대정보','', '협렵사_공종연결', '결함내용문구'][this.currentTab]}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            
        }
    }
</script>