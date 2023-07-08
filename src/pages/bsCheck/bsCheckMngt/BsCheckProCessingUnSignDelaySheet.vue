<template>
    <div class="tab_contents">
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
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="14%">
                        <col width="5%">
                        <col width="15%">
                        <col width="5%">
                        <col width="15%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>세대구분</th>
                            <td>
                                <select name="" id="" v-model="search.spaceTypeCode" class="form_control">
                                    <option :value="''">전체</option>
                                    <option :value="'H'">세대</option>
                                    <option :value="'P'">공용</option>
                                </select>
                            </td>
                            <th>동/호/층</th>
                            <td colspan="5">
                                <div class="multi_select">
                                    <select v-model="search.standDong" class="form_control" style="width: 78px;">
                                        <option :value="''">전체</option>
                                        <option 
                                            v-for="option in dongList"
                                            :key="option.value"
                                            :value="option.value"
                                        >
                                        {{ option.label }}
                                        </option>
                                    </select>
                                    <input type="text" class="form_control ml10" v-model="search.addrHo" placeholder="호수 입력" maxlength="10">
                                    <input type="text" class="form_control ml10" v-model="search.addrFloor" placeholder="층 입력" maxlength="10">
                                </div>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>배정상태</th>
                            <td>
                                <label for="rBox0" class="input_radio">
                                    <input type="radio" class="form_control" id="rBox0" name="bsAsignYnPro" value="" v-model="search.bsAsignType" :checked="true">
                                    <span class="label_text">전체</span>
                                </label>
                                <label for="rBox1" class="input_radio">
                                    <input type="radio" class="form_control" id="rBox1" name="bsAsignYnPro" value="N" v-model="search.bsAsignType" :checked="false">
                                    <span class="label_text">미배정</span>
                                </label>
                                <label for="rBox2" class="input_radio">
                                    <input type="radio" class="form_control" id="rBox2" name="bsAsignYnPro" value="R" v-model="search.bsAsignType" :checked="false">
                                    <span class="label_text">반환</span>
                                </label>
                                <!-- <label for="rBox1" class="input_check ml20">
                                    <input type="checkbox" class="form_control" id="rBox1" v-model="search.bsAsignType" value="N" :checked="true">
                                    <span class="label_text">미배정</span>
                                </label>
                                <label for="rBox2" class="input_check ml20">
                                    <input type="checkbox" class="form_control" id="rBox2" v-model="search.bsAsignType" value="R" :checked="true">
                                    <span class="label_text">반환</span>
                                </label> -->
                            </td>
                            <th colspan="2">공간/공종/세부공종/결함공종/결함유형</th>
                            <td colspan="4">
                                <div class="multi_select">
                                    <select v-model="search.bsSpaceMngId" class="form_control ml10" :disabled="disabled">
                                        <option :value="''">전체 </option>
                                        <option 
                                            v-for="option in spaceTypeList.filter(item => item.spaceTypeCode === search.spaceTypeCode)"
                                            :key="option.value"
                                            :value="option.value"
                                        >
                                        {{ option.label }}
                                        </option>
                                    </select>
                                    <select v-model="search.mainCodeId" class="form_control ml10" :disabled="disabled">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="mainData in categoryData" 
                                            :key="mainData.mainCodeId" 
                                            :value="mainData.mainCodeId"
                                        >   
                                            {{ mainData.mainName }} 
                                        </option>
                                    </select>
                                    <select v-model="search.midCodeId" class="form_control ml10" :disabled="disabled">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="midData in categoryData.filter(item => item.mainCodeId === search.mainCodeId)" 
                                            :key="midData.midCodeId" 
                                            :value="midData.midCodeId"
                                        >
                                            {{ midData.midName }}
                                        </option>
                                    </select>
                                    <select v-model="search.subCodeId" class="form_control ml10" :disabled="disabled">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="subData in categoryData.filter(item => item.midCodeId === search.midCodeId)" 
                                            :key="subData.subCodeId" 
                                            :value="subData.subCodeId">
                                                {{ subData.subName }}
                                        </option>
                                    </select>
                                    <select v-model="search.defectTypeCode" class="form_control ml10" :disabled="disabled">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="defectTypeCodeData in categoryData.filter(item => item.subCodeId === search.subCodeId)" 
                                            :key="defectTypeCodeData.defectTypeCode" 
                                            :value="defectTypeCodeData.defectTypeCode"
                                        >
                                            {{ defectTypeCodeData.codeNameKr }}
                                        </option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>협력업체</th>
                            <td><input type="text" class="form_control" v-model="search.tradeNm" placeholder="입력해주세요" maxlength="50"></td>
                            <th>기타</th>
                            <td>
                                <label for="chkBox0" class="input_check">
                                    <input type="checkbox" class="form_control" id="chkBox0" v-model="search.all" @click="allCheck($event, 'search')">
                                    <span class="label_text">전체</span>
                                </label>
                                <label for="chkBox1" class="input_check ml20">
                                    <input type="checkbox" class="form_control" id="chkBox1" v-model="search.bsInspEmgc" @click="checkChange($event, 'search')">
                                    <span class="label_text">긴급</span>
                                </label>
                                <label for="chkBox2" class="input_check ml20">
                                    <input type="checkbox" class="form_control" id="chkBox2" v-model="search.bsInspMtrl" @click="checkChange($event, 'search')">
                                    <span class="label_text">자재</span>
                                </label>
                                <label for="chkBox3" class="input_check ml20">
                                    <input type="checkbox" class="form_control" id="chkBox3" v-model="search.bsInspPop" @click="checkChange($event, 'search')">
                                    <span class="label_text">POP</span>
                                </label>
                            </td>
                            <th>점검일</th>
                            <td colspan="2">
                                <DatePickerRange ref="datepickerInspRange" v-model="search.bsInsp"/>
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>
            <div class="inner">
                <div class="button_box">
                    <strong class="txt_lg">결함목록({{totalCount}}건)</strong>
                        <button type="button" class="btn btn_sm btn_excel" v-if="checkUser(this.userId,'down')" @click="fn_exportExcel(itpSheet)">엑셀 다운로드</button>
                        <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray" @click="diRectAssign" v-if="this.userType === 'HEC' && checkUser(this.userId,'write')">직접배정</button>
                        </div>
                </div>
                <div class="ib_wrap" :style="{height: 'calc(100vh - 380px)'}">
                    <div id="sheetTable" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div> <!-- // inner -->
        </div>  <!-- // tab_area -->

        <div class="tab_area" v-show="currentTab == 1">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="12%">
                        <col width="5%">
                        <col width="15%">
                        <col width="5%">
                        <col width="15%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>세대구분</th>
                            <td>
                                <select name="" id="" v-model="search2.spaceTypeCode" class="form_control">
                                    <option :value="''">전체</option>
                                    <option :value="'H'">세대</option>
                                    <option :value="'P'">공용</option>
                                </select>
                            </td>
                            <th>동/호/층</th>
                            <td colspan="5">
                                <div class="multi_select">
                                    <select v-model="search2.standDong" class="form_control" style="width: 78px;">
                                        <option :value="''">전체</option>
                                        <option 
                                            v-for="option in dongList"
                                            :key="option.value"
                                            :value="option.value"
                                        >
                                        {{ option.label }}
                                        </option>
                                    </select>
                                    <input type="text" class="form_control ml10" v-model="search2.addrHo" placeholder="호수 입력" maxlength="10">
                                    <input type="text" class="form_control ml10" v-model="search2.addrFloor" placeholder="층 입력" maxlength="10">
                                </div>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="searchData2(true)">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData2(false)">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>협력업체</th>
                            <td>
                                <input type="text" class="form_control" v-model="search2.tradeNm" placeholder="입력해주세요">
                            </td>
                            <th colspan="2">공간/공종/세부공종/결함공종/결함유형</th>
                            <td colspan="4">
                                <div class="multi_select">
                                    <select v-model="search2.bsSpaceMngId" class="form_control ml10" :disabled="disabled2">
                                        <option :value="''">전체</option>
                                        <option 
                                            v-for="option in spaceTypeList2.filter(item => item.spaceTypeCode === search2.spaceTypeCode)"
                                            :key="option.value"
                                            :value="option.value"
                                        >
                                        {{ option.label }}
                                        </option>
                                    </select>
                                    <select v-model="search2.mainCodeId" class="form_control ml10" :disabled="disabled2">
                                        <option :value="''" >전체</option>
                                        <option 
                                            v-for="mainData in categoryData2" 
                                            :key="mainData.mainCodeId" 
                                            :value="mainData.mainCodeId"
                                        >   
                                            {{ mainData.mainName }} 
                                        </option>
                                    </select>
                                    <select v-model="search2.midCodeId" class="form_control ml10" :disabled="disabled2">
                                        <option :value="''" >전체</option>
                                        <option 
                                            v-for="midData in categoryData2.filter(item => item.mainCodeId === search2.mainCodeId)" 
                                            :key="midData.midCodeId" 
                                            :value="midData.midCodeId"
                                        >
                                            {{ midData.midName }}
                                        </option>
                                    </select>
                                    <select v-model="search2.subCodeId" class="form_control ml10" :disabled="disabled2">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="subData in categoryData2.filter(item => item.midCodeId === search2.midCodeId)" 
                                            :key="subData.subCodeId" 
                                            :value="subData.subCodeId">
                                                {{ subData.subName }}
                                        </option>
                                    </select>
                                    <select v-model="search2.defectTypeCode" class="form_control ml10" :disabled="disabled2">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="defectTypeCodeData in categoryData2.filter(item => item.subCodeId === search2.subCodeId)" 
                                            :key="defectTypeCodeData.defectTypeCode" 
                                            :value="defectTypeCodeData.defectTypeCode"
                                        >
                                            {{ defectTypeCodeData.codeNameKr }}
                                        </option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>기타</th>
                            <td>
                                <label for="chkBox2_0" class="input_check">
                                    <input type="checkbox" class="form_control" id="chkBox2_0" v-model="search2.all" @click="allCheck($event, 'search2')">
                                    <span class="label_text">전체</span>
                                </label>
                                <label for="chkBox2_1" class="input_check ml20">
                                    <input type="checkbox" class="form_control" id="chkBox2_1" v-model="search2.bsInspEmgc" @click="checkChange($event, 'search2')">
                                    <span class="label_text">긴급</span>
                                </label>
                                <label for="chkBox2_2" class="input_check ml20">
                                    <input type="checkbox" class="form_control" id="chkBox2_2" v-model="search2.bsInspMtrl" @click="checkChange($event, 'search2')">
                                    <span class="label_text">자재</span>
                                </label>
                                <label for="chkBox2_3" class="input_check ml20">
                                    <input type="checkbox" class="form_control" id="chkBox2_3" v-model="search2.bsInspPop" @click="checkChange($event, 'search2')">
                                    <span class="label_text">POP</span>
                                </label>
                            </td>
                            <th>점검</th>
                            <td colspan="2">
                                <DatePickerRange ref="datepickerInsp2Range" v-model="search2.bsInsp"/>
                            </td>
                            <th></th>
                            <td></td>
                        </tr>
                    </tbody>
                </table> 
            </div>
            <div class="inner">
                <div class="button_box">
                    <strong class="txt_lg">결함목록({{totalCount2}}건) (※ 처리지연 : 경과일수 5일 초과)</strong>
                    <button type="button" class="btn btn_sm btn_excel" v-if="checkUser(this.userId,'down')" @click="fn_exportExcel(itqSheet)">엑셀 다운로드</button>
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray" @click="sendSms()" v-if="this.userType === 'HEC' && checkUser(this.userId,'write')">알림발송</button>
                    </div>
                </div>
                <div class="ib_wrap" :style="{height: 'calc(100vh - 380px)'}">
                    <div id="sheetTable2" class="ibsheet_table" style="height: 100%;"></div>
                </div>
            </div> <!-- // inner -->
        </div>  <!-- // tab_area -->
        <!-- 직접배정 팝업 -->
        <b-modal id="DirectAssignmentPop" title="직접배정" hide-backdrop size="md" @shown="comPanySearchBtn">
            <template #default>
                <div class="pop_container">
                    <div class="lookup_box multi_line align_center">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup> 
                                <col width="55">
                                <col width="220">
                                <col width="80">
                            </colgroup>
                            <tbody>
                                <tr>
                                <th>협력업체</th>   
                                <td><input type="text" class="form_control" v-model="searchValue" placeholder="입력해주세요"></td>        
                                <td class="ar">
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="comPanySearchBtn">검색</button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 450px)'}">
                        <div id="sheetTable1" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </template>
            <template #modal-footer>
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="companyInsertBtn">배정</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="noComPantInsertBtn">닫기</b-button>
            </template>
        </b-modal>
        <excel-download
            v-model="excelDownload.request"
            ref-id="BsCheckProCessingUnSignDelaySheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>  <!-- // tab_contents -->
</template>

<script>
    //import { InspectionBsList8, InspectionBsList9 } from '@/pages/common/data/InspectionBsList'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    //import { DirectAssignment } from '@/pages/common/data/PopupList'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import API from '@/apis/'
    import _ from 'lodash'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import loader from '@ibsheet/loader'
    import { commonFn } from '@/script/commonFn.js';
    import axios from 'axios'
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    export default {
        name: 'BsCheckProCessingUnSignDelaySheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            Breadcrumb,
            DatePickerRange,
            ExcelDownload,
        },
        data:() => ({            
            footerBg: 'transparent',
            currentTab: 0, // 기본 current 값 지정 
            tabs: ['협력업체 배정', '처리 지연'], // tab name
            userId : '',
            userType : '',
            siteMstrId : '',
            tradeId : '',
            projectId : '',
            /* BS점검 미배정/처리지연 */
            InspectionBsList8 : {
                options: {
                    Cfg:{
                        NoVScroll : 0,
                        NoDataMessage:3,
                    },
                    Cols: [
                        { Name: 'isChecked', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, RelWidth: 2 },
                        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 3 },
                        { Name: 'bsAsignType', Header: [{ Value: '업체배정 상태 \n (반환 협력업체)', Span: 2, RowSpan:2 }], ColMerge: 1,RelWidth: 5, CanEdit : 0, TextColor: "#ff0000" },
                        { Name: 'tradeNm', Header: [{ }], ColMerge: 1, RelWidth: 5, CanEdit: 0  },
                        { Name: 'spaceCodeType', Header: [{ Value: '결함 등록', Span: 15 }, { Value: '구분' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'standDong', Header: [{ }, { Value: '동' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'addrHo', Header: [{ }, { Value: '호수' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'addrFloor', Header: [{ }, { Value: '층' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsSpaceMngName', Header: [{ }, { Value: '공간' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'mainName', Header: [{ }, { Value: '공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'midName', Header: [{ }, { Value: '세부공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'subName', Header: [{ }, { Value: '결함공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], RelWidth: 10, CanEdit : 0 },
                        { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' }], RelWidth: 3, CanEdit : 0 },
                        { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' }], RelWidth: 3, CanEdit : 0 },
                        { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' }], RelWidth: 3, CanEdit : 0 },
                        { Name: 'bsInsprName', Header: [{ }, { Value: '점검자' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsInspDt', Header: [{ }, { Value: '점검일' }], RelWidth: 5, CanEdit : 0, Type: 'Date', Format: 'yyyy-MM-dd'},
                    ]
                },
                data: [
                    //{ case1: '', case2: '미배정', case3: 'OO가구', case4: '세대', case5: '102', case6: '102', case7: '', case8: '주방', case9: '건축', case10: '가구/가전공사', case11: '가스렌지', case12: '흠집', case13: '10cm 흠집', case14: '', case15: '', case16: 'O', case17: '김점검', case18: '2021-11-25'},  
                ],
            },

            /*DirectAssignment : BS점검 > BS점검 실시 > 협력업체 배정(반환 및 미배정 결함) */
            DirectAssignment : {
                options: {
                    Cfg:{
                        NoVScroll : 0,
                        NoDataMessage:3,
                    },
                    Cols: [
                        { Name: 'tradeNm', Header: [{ Value: ' 협력업체'}], RelWidth: 5, CanEdit : 0 },
                    ],
                },
                data: [
                    { tradeNm: '협력업체가 없습니다' },
                    
                ],
            },

            itpSheet : null,
            itrSheet : null,
            disabled : true,
            totalCount : 0,
            categoryData : [],
            spaceTypeList : [],
            bsCheckPrCUnsignDelay : [],
            directAssignmentData : [],
            search : {
                spaceTypeCode : '',
                spaceCodeType : '',
                standDong : '',
                addrHo : '',
                addrFloor : '',
                bsAsignType : '',
                mainCodeId : '',
                midCodeId : '',
                subCodeId : '',
                defectTypeCode : '',
                all : true,
                bsInspEmgc : false,
                bsInspMtrl : false,
                bsInspPop : false,
                bsInsp : [null, null],
                tradeNm : '',
                bsSpaceMngId : '',
            },

            /*InspectionBsList9 : BS점검 > BS점검 실시 > 협력업체 배정(반환 및 미배정 결함) - 처리지연*/
            InspectionBsList9 : {
                options: {
                    Cfg:{
                        NoVScroll : 0,
                        NoDataMessage:3,
                    },
                    Cols: [
                        { Name: 'isChecked', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, RelWidth: 2 },
                        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 3 },
                        { Name: 'spaceTypeName', Header: [{ Value: '결함 등록', Span: 15 }, { Value: '구분' }], RelWidth: 5, CanEdit : 0},
                        { Name: 'standDong', Header: [{ }, { Value: '동' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'addrHo', Header: [{ }, { Value: '호수' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'addrFloor', Header: [{ }, { Value: '층' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsSpaceMngName', Header: [{ }, { Value: '공간' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'mainName', Header: [{ }, { Value: '공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'midName', Header: [{ }, { Value: '세부공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'subName', Header: [{ }, { Value: '결함공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], RelWidth: 10, CanEdit : 0 },
                        { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' }], RelWidth: 3, CanEdit : 0 },
                        { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' }], RelWidth: 3, CanEdit : 0 },
                        { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' }], RelWidth: 3, CanEdit : 0 },
                        { Name: 'bsInsprName', Header: [{ }, { Value: '점검자' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsInspStartDt', Header: [{ }, { Value: '점검일' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'delayDay', Header: [{ Value: '지연정보', Span: 4 }, { Value: '지연일수' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'tradeNm', Header: [{ }, { Value: '협력업체' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsPrcsOrder', Header: [{ }, { Value: '처리차수' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsAsignDt', Header: [{ }, { Value: '배정일' }], RelWidth: 5, Type: 'Date', Format: 'yyyy-MM-dd', CanEdit : 0 },
                        { Name: 'bsDefectRegMngId', Visible: '0', CanEdit : 0 },
                        { Name: 'tradeId', Visible: '0', CanEdit : 0 },
                        { Name: 'spaceTypeCode', Visible: '0', CanEdit : 0 },
                    ]
                },
                data: [
                    //{ case1: '', case2: '세대', case3: '102', case4: '102', case5: '', case6: '주방', case7: '건축', case8: '가구/가전공사', case9: '가스렌지', case10: '흠집', case11: '10cm 흠집',  case12: '', case13: 'O', case14:'',  case15: '김점검', case16: '2021-11-25', case17:'7', case18:'(주)리밧흐', case19:'1차', case20:'2021-04-01'},  
                ],
            },
            
            itqSheet : null,
            categoryData2 : [],
            spaceTypeList2 : [],
            disabled2 : true,
            totalCount2 : 0,
            search2 : {
                spaceTypeCode : '',
                spaceCodeType : '',
                standDong : '',
                addrHo : '',
                addrFloor : '',
                bsAsignType : '',
                mainCodeId : '',
                midCodeId : '',
                subCodeId : '',
                defectTypeCode : '',
                all : true,
                bsInspEmgc : false,
                bsInspMtrl : false,
                bsInspPop : false,
                bsInsp : [null, null],
                tradeNm : '',
                bsSpaceMngId : '',
            },

            columns : [],
            comPanyColumns : [],
            delayColumns : [],
            gridData : [],
            comPanyGridData : [],
            delayGridData : [],
            sheet : null,
            companySheet : null,
            delaySheet : null,
            dongList : [],
            searchValue : '',
            bsDefectRegMngId : '',

            //엑셀다운로드
            excelDownload : {
                request : false,
                fileName :'',
                downloadOption :'',
                options : null,
                data : [],
            }
        }),
        watch : {
            'search.spaceTypeCode' : {
                handler: function () {
                    if(this.search.spaceTypeCode === ''){
                        this.search.bsSpaceMngId = '';
                        this.disabled = true
                    } else {
                        this.search.bsSpaceMngId = '';
                        this.disabled = false
                        this.getSpacedefectCntList()
                    }
                }
            },
            'search.addrHo' : {
                handler(NewVal) {
                    this.search.addrHo = NewVal.replace(/[^0-9]/g, '');
                },
            },
            'search.addrFloor' : {
                handler(NewVal) {
                    this.search.addrFloor = NewVal.replace(/[^0-9]/g, '');
                },
            },
            'search.bsSpaceMngId' : {
                handler() {
                    this.search.mainCodeId = '';
                    this.search.midCodeId = '';
                    this.search.subCodeId = '';
                    this.search.defectTypeCode = '';
                }
            },
            'search.mainCodeId': {
                handler() {
                    this.search.midCodeId = '';
                    this.search.subCodeId = '';
                    this.search.defectTypeCode = '';
                },
            },
            'search.midCodeId': {
                handler() {
                    this.search.subCodeId = '';
                    this.search.defectTypeCode = '';
                },
            },
            'search.subCodeId': {
                handler() {
                    this.search.defectTypeCode = '';
                },
            },
            'search2.spaceTypeCode' : {
                handler: function () {
                    if(this.search2.spaceTypeCode === ''){
                        this.search2.bsSpaceMngId = '';
                        this.disabled2 = true
                    } else {
                        this.search2.bsSpaceMngId = '';
                        this.disabled2 = false
                        this.getSpacedefectCntList2()
                    }
                }
            },
            'search2.addrHo' : {
                handler(NewVal) {
                    this.search2.addrHo = NewVal.replace(/[^0-9]/g, '');
                },
            },
            'search2.addrFloor' : {
                handler(NewVal) {
                    this.search2.addrFloor = NewVal.replace(/[^0-9]/g, '');
                },
            },
            'search2.bsSpaceMngId' : {
                handler() {
                    this.search2.mainCodeId = '';
                    this.search2.midCodeId = '';
                    this.search2.subCodeId = '';
                    this.search2.defectTypeCode = '';
                }
            },
            'search2.mainCodeId': {
                handler() {
                    this.search2.midCodeId = '';
                    this.search2.subCodeId = '';
                    this.search2.defectTypeCode = '';
                },
            },
            'search2.midCodeId': {
                handler() {
                    this.search2.subCodeId = '';
                    this.search2.defectTypeCode = '';
                },
            },
            'search2.subCodeId': {
                handler() {
                    this.search2.defectTypeCode = '';
                },
            },
        },
        mounted(){
            this.userId = this.$session.get('userInfo').userId;
            this.userType = this.$session.get('userInfo').userType;
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
            this.tradeId = this.$session.get('userInfo').tradeId;
            this.projectId = this.$session.get('userInfo').projectId;
            //this.columns = InspectionBsList8.options.Cols
            //this.delayColumns = InspectionBsList9.options.Cols
            this.getHouseInfoMySiteDongList()
            this.getBsDeffectMngList()
            this.getBsNoAssignList()
            this.getDefectDelayList()
        },
        beforeDestroy() {
            //시트 초기화
            if(this.itpSheet) {
                this.itpSheet.dispose();
            }
            if(this.itrSheet) {
                this.itrSheet.dispose();
            }
            if(this.itqSheet) {
                this.itqSheet.dispose();
            }
        },
        methods: {
            initSheet(sheet) {
                this.sheet = sheet
            },
            comPanyInitSheet(sheet) {
                this.companySheet = sheet
            },
            delayInitSheet(sheet) {
                this.delaySheet = sheet
            },
            /**
             * 검색조건 세팅
             */
            setTopFilterOption (data) {
                const allDongList = data.map(item => {
                    return {
                        label: parseInt(item)+'동',
                        value: parseInt(item),
                    }
                })
                this.dongList = [..._.uniqBy(allDongList, 'value')]
            },
            /**
             * 검색조건 세팅
             */
            setTopFilterSpaceOption (data) {
                const allSpcaeTypeList = data.map(item => {
                    return {
                        label: item.bsSpaceMngName,
                        value: item.bsSpaceMngId,
                        spaceTypeCode : item.spaceTypeCode
                    }
                })
                this.spaceTypeList = [..._.uniqBy(allSpcaeTypeList, 'value')]                
            },
            /**
             * 검색조건 세팅
             */
            setTopFilterSpaceOption2 (data) {
                const allSpcaeTypeList = data.map(item => {
                    return {
                        label: item.bsSpaceMngName,
                        value: item.bsSpaceMngId,
                        spaceTypeCode : item.spaceTypeCode
                    }
                })
                this.spaceTypeList2 = [..._.uniqBy(allSpcaeTypeList, 'value')]
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
                    console.error('검색조건 동 리스트 불러오기 에러 : ', error)
                }
            },
            async getBsDeffectMngList() {
                const payload = {
                    mainCodeId : this.search.mainCodeId,
                    midCodeId : this.search.midCodeId,
                    subCodeId : this.search.subCodeId,
                    defectTypeCode : this.search.defectTypeCode,
                }
                try {
                    const result = await API.bsCheck.getBsDeffectMngList(payload)
                    if(result?.dlDefectMng){
                        this.categoryData = _.uniqBy([...result.dlDefectMng], 'mainName')
                        this.categoryData2 = _.uniqBy([...result.dlDefectMng], 'mainName')
                    } 
                } catch (error) {
                    console.error('검색조건 공종, 세부공종, 결함공종, 결함유형 불러오기 에러 : ', error)
                }
            },
            /**
             * 공간 셀렉트 옵션 설정 조회 (세대 구분의 따라 조건 다르게) / 미배정
             */
            async getSpacedefectCntList () {
                const payload = {
                    spaceTypeCode : this.search.spaceTypeCode
                }
                try {
                    const result = await API.bsCheck.getSpacedefectCntList(payload)
                    this.setTopFilterSpaceOption(result.dlSpaceDefectCnt.filter(row => {return row.assignDefectCnt > 0}))
                    
                } catch (error) {
                    console.error('등록 팝업 공간 셀렉트 옵션 조회 에러 : ', error)
                }
            },
            /**
             * 공간 셀렉트 옵션 설정 조회 (세대 구분의 따라 조건 다르게) / 처리 지연
             */
            async getSpacedefectCntList2 () {
                const payload = {
                    spaceTypeCode : this.search2.spaceTypeCode
                }
                try {
                    const result = await API.bsCheck.getSpacedefectCntList(payload)
                    this.setTopFilterSpaceOption2(result.dlSpaceDefectCnt.filter(row => {return row.assignDefectCnt > 0}))
                    
                } catch (error) {
                    console.error('등록 팝업 공간 셀렉트 옵션 조회 에러 : ', error)
                }
            },
            /**
             * BS 점검 미배정 / 처리 지연 리스트 불러오기
             */
            async getBsNoAssignList(){
                this.InspectionBsList8.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        let payload = {};
                        payload['bsInspStartDt'] = this.search.bsInsp[0];
                        payload['bsInspEndDt'] = this.search.bsInsp[1];
                        if(this.userType === 'PTNR') {
                            payload['siteMstrId'] = this.siteMstrId 
                            payload['tradeId'] = this.tradeId
                        }
                        if(!this.search.all) {
                            if(this.search.bsInspEmgc) {
                                payload['bsInspEmgc'] = 'Y'
                            } else {
                                payload['bsInspEmgc'] = 'N'
                            }
                            if(this.search.bsInspMtrl) {
                                payload['bsInspMtrl'] = 'Y'
                            } else {
                                payload['bsInspMtrl'] = 'N'
                            }
                            if(this.search.bsInspPop) {
                                payload['bsInspPop'] = 'Y'
                            } else {
                                payload['bsInspPop'] = 'N'
                            }
                        }
                        
                        if(!commonFn.methods.isEmpty(this.search.spaceTypeCode)) {
                            payload['spaceTypeCode'] = this.search.spaceTypeCode
                        }
                        if(!commonFn.methods.isEmpty(String(this.search.standDong))) {
                            payload['standDong'] = String(this.search.standDong)
                        }
                        if(!commonFn.methods.isEmpty(this.search.addrHo)) {
                            payload['addrHo'] = this.search.addrHo
                        }
                        if(!commonFn.methods.isEmpty(this.search.addrFloor)) {
                            payload['addrFloor'] = this.search.addrFloor
                        }
                        if(!commonFn.methods.isEmpty(this.search.bsAsignType)) {
                            payload['bsAsignType'] = this.search.bsAsignType
                        }
                        if(!commonFn.methods.isEmpty(this.search.mainCodeId)) {
                            payload['mainCodeId'] = this.search.mainCodeId
                        }
                        if(!commonFn.methods.isEmpty(this.search.midCodeId)) {
                            payload['midCodeId'] = this.search.midCodeId
                        }
                        if(!commonFn.methods.isEmpty(this.search.subCodeId)) {
                            payload['subCodeId'] = this.search.subCodeId
                        }
                        if(!commonFn.methods.isEmpty(this.search.defectTypeCode)) {
                            payload['defectTypeCode'] = this.search.defectTypeCode
                        }
                        if(!commonFn.methods.isEmpty(this.search.tradeNm)) {
                            payload['tradeNm'] = this.search.tradeNm
                        }
                        if(!commonFn.methods.isEmpty(this.search.bsSpaceMngId)) {
                            payload['bsSpaceMngId'] = this.search.bsSpaceMngId
                        }
                        try { 
                            const result = await API.bsCheck.getBsNoAssignList(payload)
                            if(result){
                                this.bsCheckPrCUnsignDelay = result.dlNoAssign.map(row => {
                                    return {
                                        ...row,
                                        standDong : Number(row.standDong) ? Number(row.standDong) : "-",
                                        addrHo : Number(row.addrHo) ? Number(row.addrHo) : "-",
                                        addrFloor : Number(row.addrFloor) ? Number(row.addrFloor) : "-",
                                        bsInspEmgc : row.bsInspEmgc === "Y"? "O" : "",
                                        bsInspMtrl : row.bsInspMtrl === "Y"? "O" : "",
                                        bsInspPop : row.bsInspPop === "Y"? "O" : "",
                                        bsAsignType : row.bsAsignType === "A"? "배정": row.bsAsignType === "R"? "반환" : "미배정",
                                        tradeNm : row.tradeNm ? row.tradeNm : '-',
                                        spaceCodeType: row.spaceTypeCode === 'H' ? '세대' : row.spaceTypeCode === 'P' ? '공용' : '-',
                                        bsCnfmTypeCode : row.bsCnfmTypeCode === "1"? "양호": row.bsCnfmTypeCode === "2"? "미흡": "미조치"
                                    }
                                })
                                event.sheet.loadSearchData({
                                    data: this.bsCheckPrCUnsignDelay,
                                    append : false
                                })
                                this.totalCount = event.sheet.getTotalRowCount();
                            } else {
                                this.bsCheckPrCUnsignDelay = this.InspectionBsList8.data
                            }
                        } catch (error) {
                            console.error('협력업체 배정 불러오기 : ', error)
                        }
                    },
                    onAfterClick: this.clickGrid,
                    onAfterChange: this.changeGrid,
                }
                let options = this.InspectionBsList8.options;  
                loader.createSheet({
                    el: 'sheetTable',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itpSheet = sheet;
                })
            },
            /**
             * 그리드 상단 필터링 > 미배정 탭 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData (isReset) {
                if (isReset) {
                    this.search = {
                        spaceTypeCode : '',
                        spaceCodeType : '',
                        standDong : '',
                        addrHo : '',
                        addrFloor : '',
                        bsAsignType : '',
                        mainCodeId : '',
                        midCodeId : '',
                        subCodeId : '',
                        defectTypeCode : '',
                        bsInspEmgc : '',
                        bsInspMtrl : '',
                        bsInspPop : '',
                        bsInsp : [null, null],
                        bsSpaceMngId : '',
                    }
                }
                return await this.getBsNoAssignList(this.search)
            },
            /**
             * 그리드 상단 필터링 > 처리 지연 탭 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData2 (isReset) {
                if (isReset) {
                    this.search2 = {
                        spaceTypeCode : '',
                        spaceCodeType : '',
                        standDong : '',
                        addrHo : '',
                        addrFloor : '',
                        bsAsignType : '',
                        mainCodeId : '',
                        midCodeId : '',
                        subCodeId : '',
                        defectTypeCode : '',
                        bsInspEmgc : '',
                        bsInspMtrl : '',
                        bsInspPop : '',
                        bsInsp : [null, null],
                        bsSpaceMngId : '',
                    }
                }
                return await this.getDefectDelayList(this.search2)
            },
            /**
             * 리스트 직접 배정 버튼 클릭 팝업 오픈이벤트
             */
            async diRectAssign(){
                const checkData = this.itpSheet.getRowsByChecked('isChecked')[0];
                if(!checkData) {
                    this.alert('결함을 선택해주세요.')
                    return 
                } else {
                    this.bsDefectRegMngId = checkData.bsDefectRegMngId
                    this.$bvModal.show('DirectAssignmentPop')
                }
            },
            /**
             * 리스트 직접 배정 업체 조회
             */
            async comPanySearchBtn () {
                this.DirectAssignment.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        let payload = {
                            searchValue : this.searchValue,
                            tradeType : 'C',
                            siteMstrId : this.siteMstrId
                        }
                        try {
                            const result = await API.bsCheck.getComPanySearchList(payload)
                            if(result?.datas?.resultList.length > 0 && result.rCode === '0000'){
                                this.directAssignmentData = result.datas.resultList
                            } else {
                                this.directAssignmentData = [];    
                            }
                            event.sheet.loadSearchData({
                                data: this.directAssignmentData,
                                append : false
                            })
                        } catch (error) {
                            console.error('협력업체 불러오기 에러 : ',error)
                        }
                    },
                    onDblClick: this.dbClick,
                }
                let options = this.DirectAssignment.options;  
                loader.createSheet({
                    el: 'sheetTable1',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itrSheet = sheet;
                })
            },
            /**
             * 협력업체 팝업 닫기 버튼
             */
            async noComPantInsertBtn () {
                this.$bvModal.hide('DirectAssignmentPop')
            },

            /**
             * 협력업체 팝업 배정 버튼
             */
            companyInsertBtn () {
                if(this.itrSheet.getFocusedRow()) {
                    const row = this.itrSheet.getFocusedRow()
                    var today = new Date();
                    var year = today.getFullYear();
                    var month = ('0' + (today.getMonth() + 1)).slice(-2);
                    var day = ('0' + today.getDate()).slice(-2);
                    var dateString = year+ month+ day;
                    
                    this.confirm('협력업체를 배정 하시겠습니까?', async () => {
                        const payload = {
                            bsAsignType : 'A',
                            tradeId : row.tradeId,
                            siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                            bsDefectRegMngId : this.bsDefectRegMngId,
                            bsAsignDt : dateString
                        }
                        try {
                            const result = await API.bsCheck.setDefectPtnrChange(payload)
                                if(result.count > 0) {
                                    this.alert('협력업체가 배정 되었습니다.', ()=>{this.sendSms(row.tradeId)})
                                } else {
                                    this.alert('협력업체 배정 처리에 문제가 발생하였습니다.')
                                }
                        } catch (error) {
                            console.error('협력 업체 배정 처리 에러 : ', error)
                        }
                    })
                } else {
                    this.alert('협력업체를 선택해주세요.')
                }
            },
            async dbClick (evt) {
                var today = new Date();
                var year = today.getFullYear();
                var month = ('0' + (today.getMonth() + 1)).slice(-2);
                var day = ('0' + today.getDate()).slice(-2);
                var dateString = year+ month+ day;
                this.confirm('협력업체를 배정 하시겠습니까?', async () => {
                    const payload = {
                        bsAsignType : 'A',
                        tradeId : evt.row.tradeId,
                        siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                        bsDefectRegMngId : this.bsDefectRegMngId,
                        bsAsignDt : dateString
                    }
                    try {
                        const result = await API.bsCheck.setDefectPtnrChange(payload)
                            if(result.count > 0) {
                                //this.$bvModal.hide('DirectAssignmentPop')
                                //this.alert('협력업체가 배정 되었습니다.', async () => {
                                    this.alert('협력업체가 배정 되었습니다.', ()=>{this.sendSms(evt.row.tradeId)})
                                //})
                            } else {
                                this.alert('협력업체 배정 처리에 문제가 발생하였습니다.')
                            }
                    } catch (error) {
                        console.error('협력 업체 배정 처리 에러 : ', error)
                    }
                })
            },
            /** 처리지연 리스트 불러오기 */
            async getDefectDelayList () {
                this.InspectionBsList9.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        let payload = {};
                        payload['bsInspStartDt'] = this.search2.bsInsp[0];
                        payload['bsInspEndDt'] = this.search2.bsInsp[1];
                        try {
                            if(this.userType === 'PTNR') {
                                payload['siteMstrId'] = this.siteMstrId 
                                payload['tradeId'] = this.tradeId
                            }
                            if(!this.search2.all) {
                                if(this.search2.bsInspEmgc) {
                                    payload['bsInspEmgc'] = 'Y'
                                } else {
                                    payload['bsInspEmgc'] = 'N'
                                }
                                if(this.search2.bsInspMtrl) {
                                    payload['bsInspMtrl'] = 'Y'
                                } else {
                                    payload['bsInspMtrl'] = 'N'
                                }
                                if(this.search2.bsInspPop) {
                                    payload['bsInspPop'] = 'Y'
                                } else {
                                    payload['bsInspPop'] = 'N'
                                }
                            }
                            
                            if(!commonFn.methods.isEmpty(this.search2.spaceTypeCode)) {
                                payload['spaceTypeCode'] = this.search2.spaceTypeCode
                            }
                            if(!commonFn.methods.isEmpty(String(this.search2.standDong))) {
                                payload['standDong'] = String(this.search2.standDong)
                            }
                            if(!commonFn.methods.isEmpty(this.search2.addrHo)) {
                                payload['addrHo'] = this.search2.addrHo
                            }
                            if(!commonFn.methods.isEmpty(this.search2.addrFloor)) {
                                payload['addrFloor'] = this.search2.addrFloor
                            }
                            if(!commonFn.methods.isEmpty(this.search2.bsAsignType)) {
                                payload['bsAsignType'] = this.search2.bsAsignType
                            }
                            if(!commonFn.methods.isEmpty(this.search2.mainCodeId)) {
                                payload['mainCodeId'] = this.search2.mainCodeId
                            }
                            if(!commonFn.methods.isEmpty(this.search2.midCodeId)) {
                                payload['midCodeId'] = this.search2.midCodeId
                            }
                            if(!commonFn.methods.isEmpty(this.search2.subCodeId)) {
                                payload['subCodeId'] = this.search2.subCodeId
                            }
                            if(!commonFn.methods.isEmpty(this.search2.defectTypeCode)) {
                                payload['defectTypeCode'] = this.search2.defectTypeCode
                            }
                            if(!commonFn.methods.isEmpty(this.search2.tradeNm)) {
                                payload['tradeNm'] = this.search2.tradeNm
                            }
                            if(!commonFn.methods.isEmpty(this.search2.bsSpaceMngId)) {
                                payload['bsSpaceMngId'] = this.search2.bsSpaceMngId
                            }
                            const result = await API.bsCheck.getDefectDelayList(payload)
                            if(result?.dlDefectDelay){
                                this.delayGridData = result.dlDefectDelay.map(row => {
                                    return {
                                        ...row,
                                        standDong : Number(row.standDong) ? Number(row.standDong) : "-",
                                        addrHo : Number(row.addrHo) ? Number(row.addrHo) : "-",
                                        addrFloor : Number(row.addrFloor) ? Number(row.addrFloor) : "-",
                                        bsInspEmgc : row.bsInspEmgc === "Y"? "O" : "",
                                        bsInspMtrl : row.bsInspMtrl === "Y"? "O" : "",
                                        bsInspPop : row.bsInspPop === "Y"? "O" : "",
                                        bsAsignType : row.bsAsignType === "A"? "배정": row.bsAsignType === "R"? "반환" : "미배정",
                                        spaceCodeType: row.spaceTypeCode === 'H' ? '세대' : row.spaceTypeCode === 'P' ? '공용' : '-',
                                    }
                                })
                                event.sheet.loadSearchData({
                                    data: this.delayGridData,
                                    append : false
                                })
                                this.totalCount2 = event.sheet.getTotalRowCount();
                            } else {
                                    this.delayGridData = this.InspectionBsList9.data
                            }
                        } catch (error) {
                            
                        }
                    },
                    //onAfterClick: this.clickGrid,
                    //onAfterChange: this.changeGrid,
                }
                let options = this.InspectionBsList9.options;  
                loader.createSheet({
                    el: 'sheetTable2',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itqSheet = sheet;
                })
            },
            async sendSms(pTradeId) {
                let tId = '';
                let msgCode = '';
                if(this.currentTab === 0) {
                    let checkData = this.itpSheet.getRowsByChecked('isChecked')[0];
                    if(checkData.spaceCodeType === '세대') {
                        msgCode = 'A060'
                    } else if(checkData.spaceCodeType === '공용'){
                        msgCode = 'A064'
                    }
                    tId = pTradeId
                } else if(this.currentTab === 1) {
                    let checkData = this.itqSheet.getRowsByChecked('isChecked')[0];
                    if(!checkData) {
                        this.alert('결함을 선택해주세요.')
                        //this.alert('준비중입니다.')
                        return 
                    } else {
                        if(commonFn.methods.isEmpty(checkData.tradeId)) {
                            this.alert('배정된 협력업체가 없습니다.')
                            return
                        } else {
                            tId = checkData.tradeId
                            if(checkData.spaceTypeCode === 'H') {
                                msgCode = 'A067'
                            } else if(checkData.spaceTypeCode === 'P') {
                                msgCode = 'A067'
                            }
                            
                        }
                        
                    }
                }

                const options = {
                    headers : {
                        'Authorization': this.siteMstrId,
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    },
                }
                
                try {
                    let userUrl = '/sendApi/api/adminPtnr/tradeUser/list';
                    let userParam = {
                        tradeId : tId,
                        tradeType : 'B'
                    }
                    axios.post(userUrl, userParam, options).then(response => {
                        if(response.status === 200) {
                            let resultData = response.data.resultList
                            if(!resultData) {
                                this.alert('수신자가 없습니다.')
                                return false
                            } else {
                                let reciverUserId = [];
                                resultData.forEach(item => {
                                    reciverUserId.push(item.userId)
                                });

                                let url = '/sendApi/api/messageMngt/message/send';
                                let msgParam = {
                                    messageCode : msgCode, // sqms_알림리스트 2.알림리스트 시트 알림번호 
                                    userId : this.userId,
                                    projectId : this.projectId,
                                    reciveUserIds : reciverUserId,
                                    docSeq :this.docSeq,
                                }
                                axios.post(url, msgParam, options).then(result => {
                                    if(result.status === 200) {
                                        if(this.currentTab === 0) {
                                            this.getBsNoAssignList()
                                            this.$bvModal.hide('DirectAssignmentPop')
                                        } else if(this.currentTab === 1) {
                                            this.alert('발송되었습니다.')
                                        }
                                    } else {
                                        throw new Error('알림 발송 실패')
                                    }
                                })
                                .catch(error => {
                                    this.alert('발송에 실패했습니다.')
                                    console.error(error)
                                })
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error)
                    })
                } catch (error) {
                    console.error('발송에 실패했습니다.')
                }

                
            },
            allCheck(event, id) {
                if(event.target.checked) {
                    if(id === 'search') {
                        this.search.bsInspEmgc = false;
                        this.search.bsInspMtrl = false;
                        this.search.bsInspPop = false;
                        this.search.all = true;
                    } else if(id === 'search2') {
                        this.search2.bsInspEmgc = false;
                        this.search2.bsInspMtrl = false;
                        this.search2.bsInspPop = false;
                        this.search2.all = true;
                    }
                }
            },
            checkChange(event, id) {
                if(event.target.checked) {
                    if(id === 'search') {
                        this.search.all = false;
                    } else if(id === 'search2') { 
                        this.search2.all = false;
                    }
                }
            },
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['isChecked'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `${['협력업체_배정','처리_지연'][this.currentTab]}_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true

                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `미배정_처리지연_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
        },
   }
</script>