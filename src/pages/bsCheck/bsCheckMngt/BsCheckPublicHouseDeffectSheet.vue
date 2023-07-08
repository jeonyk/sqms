<template> 
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <!-- <h2 class="sub_title">BS점검</h2> -->
        <!-- <div class="lst_tabs">
            <ul>
                <li 
                    v-for="(tab, index) in tabs" 
                    v-bind:class="[{active:currentTab===index}, {disabled:index===2}]" 
                    :key="index"
                >
                    <a 
                        href="javascript:void(0);" 
                        v-on:click="currentTabEvt(index)"
                    >
                        {{tab}}
                    </a>
                </li>
            </ul>
        </div> -->
        <div class="lookup_box multi_line mt10" style="margin-top: -1px;">
            <table>
                <colgroup>
                    <col width="5%">
                    <col width="17%">

                    <col width="6%">
                    <col width="16%">

                    <col width="5%">
                    <col width="5%">

                    <col width="5%">
                    <col width="*">
                    <col width="15%">
                </colgroup>
                <tbody>
                    <tr>
                        <th>동/층</th>
                        <td>
                            <select v-model="search.standDong" class="form_control" style="width: 78px;">                                
                                <option 
                                    v-for="option in dongList"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                {{ option.label }}
                                </option>
                            </select>
                            <input type="text" class="form_control ml10" style="width: 135px;" v-model="search.addrFloor" placeholder="입력해주세요" maxlength="10">
                        </td>
                        <th colspan="6" class="pr0">
                            <div class="multi_select">
                                <strong>공간/공종/세부공종/결함공종/결함유형</strong>
                                <select v-model="search.bsSpaceMngId" class="form_control ml10">                                    
                                    <option 
                                        v-for="option in spaceTypeList"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                    {{ option.label }}
                                    </option>
                                </select>
                                <select v-model="search.mainCodeId" class="form_control ml10">
                                    <option :value="''" > 전체 </option>
                                    <option 
                                        v-for="mainData in siteMainData" 
                                        :key="mainData.mainCodeId" 
                                        :value="mainData.mainCodeId"
                                    >   
                                        {{ mainData.mainName }} 
                                    </option>
                                </select>
                                <select v-model="search.midCodeId" class="form_control ml10">
                                    <option :value="''" > 전체 </option>
                                    <option 
                                        v-for="midData in siteMidData.filter(item => item.mainCodeId === search.mainCodeId)"  
                                        :key="midData.midCodeId" 
                                        :value="midData.midCodeId"
                                    >
                                        {{ midData.midName }}
                                    </option>
                                </select>
                                <select v-model="search.subCodeId" class="form_control ml10">
                                    <option :value="''" > 전체 </option>
                                    <option 
                                        v-for="subData in siteSubData.filter(item => item.midCodeId === search.midCodeId)"
                                        :key="subData.subCodeId" 
                                        :value="subData.subCodeId">
                                            {{ subData.subName }}
                                    </option>
                                </select>
                                <select v-model="search.defectTypeCode" class="form_control ml10">
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
                        </th>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th>배정상태</th>
                        <td>
                            <label for="" class="input_radio">
                                <input type="radio" class="form_control" name="bsAsignYnPublic" value="" v-model="search.bsAsignType">
                                <span class="label_text">전체</span>
                            </label>
                            <label for="" class="input_radio">
                                <input type="radio" class="form_control" name="bsAsignYnPublic" value="Y" v-model="search.bsAsignType">
                                <span class="label_text">배정</span>
                            </label>
                            <label for="" class="input_radio">
                                <input type="radio" class="form_control" name="bsAsignYnPublic" value="N" v-model="search.bsAsignType">
                                <span class="label_text">미배정</span>
                            </label>
                        </td>
                        <th>협력업체</th>
                        <td>
                            <input type="text" class="form_control size_md" v-model="search.tradeNm" placeholder="입력해주세요" maxlength="50">
                        </td>
                        <th>결함내용</th>
                        <td colspan="3"><input type="text" class="form_control w100" v-model="search.bsDefectConts" placeholder="입력해주세요" maxlength="100"></td>
                    </tr>
                    <tr>
                        <th>결과등급</th>
                        <td>
                            <select v-model="search.bsCnfmTypeCode" class="form_control size_sm">
                                <option :value="''">전체</option>
                                <option :value="'1'">양호</option>
                                <option :value="'2'">미흡</option>
                                <option :value="'3'">미조치</option>
                                <!-- <option 
                                    v-for="option in bsCnfmTypeList"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                {{ option.label }}
                                </option> -->
                            </select>
                        </td>
                        <th>기타</th>
                        <td>
                            <label for="chkBox0" class="input_check ml20">
                                <input type="checkbox" class="form_control" id="chkBox0" v-model="search.all" @click="allCheck($event)">
                                <span class="label_text">전체</span>
                            </label>
                            <label for="chkBox1" class="input_check ml20">
                                <input type="checkbox" class="form_control" id="chkBox1" v-model="search.bsInspEmgc" @click="checkChange($event)">
                                <span class="label_text">긴급</span>
                            </label>
                            <label for="chkBox2" class="input_check ml20">
                                <input type="checkbox" class="form_control" id="chkBox2" v-model="search.bsInspMtrl" @click="checkChange($event)">
                                <span class="label_text">자재</span>
                            </label>
                            <label for="chkBox3" class="input_check ml20">
                                <input type="checkbox" class="form_control" id="chkBox3" v-model="search.bsInspPop" @click="checkChange($event)">
                                <span class="label_text">POP</span>
                            </label>
                        </td>
                        <th></th>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <th>점검일</th>
                        <td><DatePickerRange ref="datepickerInspRange" v-model="search.bsInsp"/></td>
                        <th>처리완료일</th>
                        <td><DatePickerRange ref="datepickerPrcsRange" v-model="search.bsPrcs"/></td>
                        <th>확인점검일</th>
                        <td colspan="3"><DatePickerRange ref="datepickerCnfmRange" v-model="search.bsCnfm"/></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="right_content">
            <div class="inner">
                <div class="table_normal_list ac">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="*">
                            <col width="*">
                            <col width="*">
                            <col width="*">
                            <col width="*">
                            <col width="*">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>총 결함건수</th>
                                <th>처리건수</th>
                                <th>결함처리율</th>
                                <th>확인점검건수</th>
                                <th>확인점검률</th>
                                <th>잔여건수 (세대당)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ bsTotlCnt }} 건</td>
                                <td>{{ bsPrcsCnt }} 건</td>
                                <td>{{ bsPrcsRate }} %</td>
                                <td>{{ bsCnfmCnt }} 건</td>
                                <td>{{ bsCnfmRate }} %</td>
                                <td>{{ bsRemnCnt }} 건</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <section class="inner"> -->
                    <div class="button_box">
                        <strong class="txt_lg">결함목록 ( {{ count6 }} 건)</strong>
                        <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(itpSheet)">엑셀 다운로드</button>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="deleteBtn" v-if="checkUser(userId, 'unuse') && userType === 'HEC'">삭제</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="defectChangeBtn" v-if="checkUser(userId, 'change')">반환</button>
                            <button type="button" class="btn btn_sm btn_darkblue" @click="insertBtn" v-if="checkUser(userId, 'write')">결함등록</button>
                            <button type="button" class="btn btn_sm btn_darkblue" @click="deFectPopUpBtn" v-if="checkUser(userId, 'change') && tradeType === 'C'">결함처리</button>
                            <button type="button" class="btn btn_sm btn_darkblue" @click="deFectCnfmPopUpBtn" v-if="checkUser(userId, 'change') && tradeType !== 'C'">확인점검</button>
                        </div>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 500px)'}">
                        <div id="sheetTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                    <!-- ibsheet -->
                <!-- </section> -->
            </div>
        </div>

        <!-- 공용결함 등록 팝업 -->
        <b-modal id="WriteDefectP" title="공용결함 등록" hide-backdrop size="xl" @shown="createSheet">
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 등록자 정보</strong>
                    </div>
                    <div class="table_normal_list table_write mt0">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="175">
                                <col width="*">
                                <col width="175">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="">점검자</span></th>
                                    <td>{{ insert.bsInsprName }}</td>
                                    <th><span class="emp_red">점검일자</span></th>
                                    <td><Datepicker ref="datepickerInsertRange" v-model="insert.bsInspDt"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="button_box">
                        <strong>2. 결함 등록</strong>
                        <!-- <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(itrSheet, '결함등록')">엑셀 다운로드</button> -->
                        <!-- <button type="button" class="btn btn_sm btn_excel">엑셀 업로드</button> -->
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="copyRow">행 복사</button>
                            <div class="btn_number">
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
                                <button type="button" class="btn btn_sm" @click="addRow">행 추가</button>
                            </div>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="delRow">행 삭제</button>
                        </div>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 350px)'}">
                        <div id="popSheetTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                    <!-- ibsheet -->
                </div>
            </template>
            <template #modal-footer="{ }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="saveFlawData"> <!-- @click="ok" -->등록</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="onClose('WriteDefectP')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 공용결함 상세보기 팝업 -->
        <b-modal id="DetailDefectP" title="공용결함 상세보기" hide-backdrop size="xl" @shown="clickGridData" scrollable>
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 등록자 정보</strong>
                    </div>
                    <div class="table_normal_list align_center mt0">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="175">
                                <col width="*">
                                <col width="175">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="">점검자</span></th>
                                    <td>{{ bsDetail.bsInsprName }}</td>
                                    <th><span class="">점검일자</span></th>
                                    <td>{{ bsDetail.bsInspDt }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 대상 세대</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="175">
                                    <col width="394">
                                    <col width="175">
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th>동</th>
                                    <td>{{ Number(bsDetail.standDong) }}동</td>
                                    <th>층</th>
                                    <td>{{ bsDetail.addrFloor }}층</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>3. 결함 상세</strong>
                    </div>
                    <div class="table_normal_list ac mt0">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="120">
                                <col width="120">
                                <col width="120">
                                <col width="120">
                                <col width="120">
                                <col width="*">
                                <col width="190">
                                <col width="120">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colspan="8">결함 상세</th>
                                </tr>
                                <tr>
                                    <th>공간</th>
                                    <th>공종</th>
                                    <th>세부공종</th>
                                    <th>결함공종</th>
                                    <th>결함유형</th>
                                    <th>결함내용</th>
                                    <th>기타</th>
                                    <th>관련사진</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ bsDetail.bsSpaceMngName }}</td>
                                    <td>{{ bsDetail.mainName }}</td>
                                    <td>{{ bsDetail.midName }}</td>
                                    <td>{{ bsDetail.subName }}</td>
                                    <td>{{ bsDetail.defectTypeName }}</td>
                                    <td class="al">{{ bsDetail.bsDefectConts }}.</td>
                                    <td>
                                        <label class="input_check">
                                            <input type="checkbox" id="chkbox1" name="" :checked="bsDetail.bsInspEmgc == 'Y'? true : false" disabled>
                                            <span class="label_text">긴급</span>
                                        </label>
                                        <label class="input_check">
                                            <input type="checkbox" id="chkbox1" name="" :checked="bsDetail.bsInspMtrl == 'Y'? true : false" disabled>
                                            <span class="label_text">자재</span>
                                        </label>
                                        <label class="input_check">
                                            <input type="checkbox" id="chkbox1" name="" :checked="bsDetail.bsInspPop == 'Y'? true : false" disabled>
                                            <span class="label_text">POP</span>
                                        </label>
                                    </td>
                                    <td><button type='button' class='btn_view' @click="bsFlawDetailPhoto" v-if="bsFileInfo">보기</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table_normal_list ac mt0">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="120">
                                <col width="120">
                                <col width="120">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>배정상태</th>
                                    <th>협력업체</th>
                                    <th>배정일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ bsDetail.bsAsignType }}</td>
                                    <td>{{ bsDetail.tradeNm }}</td>
                                    <td>{{ bsDetail.bsAsignDt }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>4. 결함처리</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <!-- ibsheet -->
                        <div class="ib_wrap"> <!-- style="height: 100%;" -->
                            <div id="popSheetTable2" class="ibsheet_table" :style="{height: 'calc(100vh - 650px)'}"></div>
                        </div>
                        <!-- ibsheet -->
                        <!-- <sqms-grid
                            id="bsPublicFlawDetailProcessSheet"
                            :columns="flawProcessDetailColumns"
                            :data="flawProcessDetailGridData"
                            @init="flawProcessDetailInitSheet"
                            :cfg="{
                                NoVScroll: false,
                                NoDataMessage : 3,
                            }"
                            @click="flawProcessDetailClickGrid"
                            ref="bsPublicFlawDetailProcessSheetRef"
                        >
                        </sqms-grid> -->
                    </div>

                    <div class="button_box">
                        <strong>5. 확인점검</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <!-- ibsheet -->
                        <div class="ib_wrap"> <!-- style="height: 100%;" -->
                            <div id="popSheetTable3" class="ibsheet_table" :style="{height: 'calc(100vh - 650px)'}" ></div>
                        </div>
                        <!-- ibsheet -->
                        <!-- <sqms-grid
                            id="bsPublicFlawDetailConfirmSheet"
                            :columns="flawConfirmDetailColumns"
                            :data="flawConfirmDetailGridData"
                            @init="flawConfirmDetailInitSheet"
                            :cfg="{
                                NoVScroll: false,
                                NoDataMessage : 3,
                            }"
                            @click="flawConfirmDetailClickGrid"
                            ref="bsPublicFlawDetailConfirmSheetRef"
                        >
                        </sqms-grid> -->
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 결함처리 팝업 -->
        <b-modal id="processDefectP" title="결함처리"
            hide-backdrop size="lg"
        >
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 세대/공간정보</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="33%">
                                <col width="33%">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>동</th>
                                    <th>층</th>
                                    <th>공간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ processDefect.standDong }}동</td>
                                    <td>{{ processDefect.addrFloor }}층</td>
                                    <td>{{ processDefect.bsSpaceMngName }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 결함 정보</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="20%">
                                <col width="20%">
                                <col width="20%">
                                <col width="20%">
                                <col width="20%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>공종</th>
                                    <th>세부공종</th>
                                    <th>결함공종</th>
                                    <th>결함유형</th>
                                    <th>결함내용</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ processDefect.mainName }}</td>
                                    <td>{{ processDefect.midName }}</td>
                                    <td>{{ processDefect.subName }}</td>
                                    <td>{{ processDefect.defectTypeName }}</td>
                                    <td>{{ processDefect.bsDefectConts }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>3. 결함 처리</strong>
                    </div>
                    <div class="table_normal_list">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="175">
                                <col width="*">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">업체처리일</span></th>
                                    <td colspan="2">
                                        <Datepicker ref="datepickerProCessDefectRange" v-model="processDefect.bsPrcsDt" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="">관련사진</span></th>
                                    <td class="" style="border-right:0">
                                        {{ bsFlawPcptPhoto }}
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn btn_sm btn_darkgray" @click="bsFlawPcPtInsertBtn">사진 등록</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> 
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="defectInsertBtn">적용</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 확인점검 팝업 -->
        <b-modal id="processConfirmP" title="확인점검" hide-backdrop size="lg">
            <template #default >
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 세대/공간정보</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="33%">
                                <col width="33%">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>동</th>
                                    <th>층</th>
                                    <th>공간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ cnfm.standDong }}</td>
                                    <td>{{ cnfm.addrFloor }}</td>
                                    <td>{{ cnfm.bsSpaceMngName }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 결함 정보</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="20%">
                                <col width="20%">
                                <col width="20%">
                                <col width="20%">
                                <col width="20%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>공종</th>
                                    <th>세부공종</th>
                                    <th>결함공종</th>
                                    <th>결함유형</th>
                                    <th>결함내용</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ cnfm.mainName }}</td>
                                    <td>{{ cnfm.midName }}</td>
                                    <td>{{ cnfm.subName }}</td>
                                    <td>{{ cnfm.defectTypeName }}</td>
                                    <td>{{ cnfm.bsDefectConts }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>3. 결함 처리</strong>
                    </div>
                    <div class="table_normal_list">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="175">
                                <col width="*">
                                <col width="175">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="">업체처리일</span></th>
                                    <td>{{ cnfm.bsPrcsDt }}</td>
                                    <th><span class="">처리차수</span></th>
                                    <td>{{ cnfm.bsPrcsOrder }}</td>
                                </tr>
                                <tr>
                                    <th><span class="">협력업체</span></th>
                                    <td colspan="3">{{ cnfm.tradeNm }}</td>
                                </tr>
                                <tr>
                                    <th><span class="">관련사진</span></th>
                                    <td colspan="3">
                                        <ul v-for="(list, index) in fileList" :key="index">
                                            <li @click="download(fileList)">{{ list.orgFileName }}</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>4. 확인점검</strong>
                    </div>
                    <div class="table_normal_list">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="175">
                                <col width="*">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">확인점검일자</span></th>
                                    <td colspan="2">
                                        <Datepicker ref="datepickerConfirmDefectRange" v-model="cnfm.bsCnfmDt"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="emp_red">결과등급</span></th>
                                    <td colspan="2">
                                        <label class="input_radio" for="rdoSolar1">
                                            <input type="radio" id="rdoSolar1" name="birthday_type2" v-model="cnfm.bsCnfmTypeCode" value="1">
                                            <span class="label_text">양호</span>
                                        </label>
                                        <label class="input_radio" for="rdoSolar2">
                                            <input type="radio" id="rdoSolar2" name="birthday_type2" v-model="cnfm.bsCnfmTypeCode" value="2">
                                            <span class="label_text">미흡</span>
                                        </label>
                                        <label class="input_radio" for="rdoSolar3">
                                            <input type="radio" id="rdoSolar3" name="birthday_type2" v-model="cnfm.bsCnfmTypeCode" value="3">
                                            <span class="label_text">미조치</span>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="emp_red">점검내역</span></th>
                                    <td colspan="2">
                                        <textarea class="form_control" v-model="cnfm.bsCnfmConts" placeholder="내용을 입력해주세요." :maxLength="1000" @keyup="fn_inputCheck($event)" ></textarea>
                                        <p class="table_message ar mt0">{{ cnfm.bsCnfmConts.length }} / {{ 1000 }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="">관련사진</span></th>
                                    <td class="" style="border-right:0">{{ bsFlawCfptPhoto }}</td>
                                    <td class="ar">
                                        <button type="button" class="btn btn_sm btn_darkgray" @click="bsFlawCfptInsertBtn">사진 등록</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #modal-footer="{  }"> 
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="cnfmInsertBtn">적용</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="onClose('processConfirmP')">닫기</b-button>
            </template>
        </b-modal>
        <b-modal
            id="FileWrite"
            title="관련 사진 등록" 
            hide-backdrop
            size="lg"
        >
            <template #default>
                <div class="pop_container">
                <LstFile
                    :files="files"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    :limit-file-size="1024*1024*1024*3"
                />
                    <!-- :limit-file-count="100" -->
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_darkgray"
                @click="saveFile"
                >
                등록
                </b-button>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="saveFileClose"
                >
                닫기
                </b-button>
            </template>
        </b-modal>
        <b-modal
            id="FileWrite2"
            title="결함처리 관련 사진 등록" 
            hide-backdrop
            size="lg"
        >
            <template #default>
                <div class="pop_container">
                <LstFile
                    :files="filesProcessFlaw"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    :limit-file-size="1024*1024*1024*3"
                />
                    <!-- :limit-file-count="100" -->
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_darkgray"
                @click="saveFileProcessFlaw"
                >
                등록
                </b-button>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="saveFileProcessFlawClose"
                >
                닫기
                </b-button>
            </template>
        </b-modal>
        <b-modal
            id="FileWrite3"
            title="확인점검 관련 사진 등록" 
            hide-backdrop
            size="lg"
        >
            <template #default>
                <div class="pop_container">
                <LstFile
                    :files="filesConfirmFlaw"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    :limit-file-size="1024*1024*1024*3"
                />
                    <!-- :limit-file-count="100" -->
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_darkgray"
                @click="saveFileConfirmFlaw"
                >
                등록
                </b-button>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="saveFileConfirmFlawClose"
                >
                닫기
                </b-button>
            </template>
        </b-modal>
        <b-modal
            id="FileDetail"
            title="결함상세 관련 사진 보기" 
            hide-backdrop
            size="lg"
        >
            <template #default>
                <div class="pop_container">
                <LstFile
                    :downloadable="true"
                    :uploadable="false"
                    :lst-file-rst="lstFileRstDetail"
                />
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="detailClose"
                >
                닫기
                </b-button>
            </template>
        </b-modal>
        <b-modal
            id="FileProcessDetail"
            title="결함처리 관련 사진 보기" 
            hide-backdrop
            size="lg"
        >
            <template #default>
                <div class="pop_container">
                <LstFile
                    :downloadable="true"
                    :uploadable="false"
                    :lst-file-rst="lstFileRstDetail"
                />
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="detailProcessClose"
                >
                닫기
                </b-button>
            </template>
        </b-modal>
        <b-modal
            id="FileConfirmDetail"
            title="확인점검 관련 사진 보기" 
            hide-backdrop
            size="lg"
        >
            <template #default>
                <div class="pop_container">
                <LstFile
                    :downloadable="true"
                    :uploadable="false"
                    :lst-file-rst="lstFileRstDetail"
                />
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="detailConfirmClose"
                >
                닫기
                </b-button>
            </template>
        </b-modal>

        <excel-download
            v-model="excelDownload.request"
            ref-id="BsCheckPublicHouseDeffectSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />  
    </div>
</template>

<script>
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import Datepicker from '@component/common/DatePicker.vue'
    import API from '@/apis/'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import { InspectionPublicBsList7 } from '@/pages/common/data/InspectionBsList'
    import { PartnerWork, DetailDefect, ProcessPublicDefect, ConfirPublicmDefect, WritePublicDefect } from '@/pages/common/data/PopupList'
    import { PrdtOptions } from '@/pages/common/data/PopupList'
    import TreeCategoryTab from "@/pages/quality/testMngt/component/TreeCategoryTab";
    import _ from 'lodash'
    import LstFile from '@/pages/common/popup/LstFile';
    import { commonFn } from '@/script/commonFn.js';
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import loader from '@ibsheet/loader'
    import axios from 'axios'
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    export default {
        name: 'BsCheckPublicHouseDeffectSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            Breadcrumb,
            TreeCategoryTab,
            Datepicker,
            DatePickerRange,
            LstFile,
            ExcelDownload,
        },
        data: () => ({
            currentTab: 0, // 기본 current 값 지정 
            tabs:  ['공용결함'], // tab name

            userId : '',
            userType : '',
            siteMstrId : '',
            projectId : '',
            tradeId : '',
            tradeType : '',

            search : {
                standDong : '',
                addrFloor : '',
                spaceTypeCode : '',
                mainCodeId : '',
                midCodeId : '',
                subCodeId : '',
                defectTypeCode : '',
                bsAsignType : '',
                tradeNm : '',
                tradeId : '',
                bsDeffectConts : '',
                bsCnfmTypeCode : '',
                bsInspEmgc : false,
                bsInspMtrl : false,
                bsInspPop : false,
                all : true,
                bsInsp : [null, null],
                bsPrcs : [null, null],
                bsCnfm : [null, null],
                siteMstrId : '',
                bsDefectConts : '',
                bsSpaceMngId : '',
            },
            clear : false,
            bsTotlCnt : '0',    /* 총 결함건수 */   
            bsPrcsCnt : '0',    /* 처리건수 */
            bsPrcsRate : '0',   /* 결함처리율 */  
            bsCnfmCnt : '0',    /* 확인건수 */
            bsCnfmRate : '0',   /* 확인점검률 */
            bsRemnCnt : '0',    /* 잔여건수 */   
            count6 : '0',       /* 결함목록 count  */

            InspectionPublicBsList7 : {
                options: {
                    Cfg:{
                        NoVScroll : 0,
                        NoDataMessage:3,
                    },
                    Cols: [
                        { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], HRadio: 0, Type: 'Radio', CanSort: 0, RelWidth: 4 },
                        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4, CanEdit : 0 },
                        { Name: 'standDong', Header: [{ Value: '결함 등록', Span: 13 }, { Value: '동' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'addrFloor', Header: [{ }, { Value: '층' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsSpaceMngName', Header: [{ }, { Value: '공간' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'mainName', Header: [{ }, { Value: '공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'midName', Header: [{ }, { Value: '세부공종' }], RelWidth: 5, CanEdit : 0},
                        { Name: 'subName', Header: [{ }, { Value: '결함공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], EmptyValue : '입력하세요.', RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' }], RelWidth: 4, CanEdit : 0 },
                        { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' }], RelWidth: 4, CanEdit : 0 },
                        { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' }], RelWidth: 4, CanEdit : 0 },
                        { Name: 'bsInsprName', Header: [{ }, { Value: '점검자' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsInspStartDt', Header: [{ }, { Value: '점검일' }], RelWidth: 5, CanEdit : 0, Type: 'Date', Format: 'yyyy-MM-dd'},
                        { Name: 'bsAsignType', Header: [{ Value: '결함 처리', Span: 5 }, { Value: '배정상태' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'tradeNm', Header: [{ }, { Value: '협력업체' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsAsignDt', Header: [{ }, { Value: '배정일' }], RelWidth: 5, CanEdit : 0, Type: 'Date', Format: 'yyyy-MM-dd'},
                        { Name: 'bsPrcsOrder', Header: [{ }, { Value: '처리차수' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsPrcsDt', Header: [{ }, { Value: '처리완료일' }], RelWidth: 5, CanEdit : 0, Type: 'Date', Format: 'yyyy-MM-dd'},
                        { Name: 'bsCnfmTypeCode', Header: [{ Value: '확인점검', Span: 2 }, { Value: '결과등급' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsCnfmDt', Header: [{ }, { Value: '확검일' }], RelWidth: 5, CanEdit : 0, Type: 'Date', Format: 'yyyy-MM-dd'},
                        { Name: 'bsDefectRegMngId', Visible: '0' },
                        { Name: 'tradeId', Visible: '0' },
                        { Name: 'bsDefectProsCnfmId', Visible: '0' },
                        { Name: 'bsInsprId', Visible: '0' },
                    ]
                },
                data: [
                ],
            },

            itpSheet : null,
            dlDefectReg : [],


            /* BS점검 > 세대결함 > 결함등록 (팝업) – 공용결함 등록 */
            WritePublicDefect : {
                options: {
                    Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                    Cols: [
                        { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
                        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
                        { Name: 'standDong', Header: [{ Value: '결함 등록', Span: 13 }, { Value: '동' }], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
                        // { Name: 'addrHo', Header: [{ }, { Value: '호', Type: 'Html'}],  RelWidth: 5 },
                        { Name: 'addrFloor', Header: [{ }, { Value: '층', Type: 'Html'}], RelWidth: 5, Size: 3},
                        { Name: 'bsSpaceMngId', Header: [{ }, { Value: '공간'}], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5,Required: 1 },
                        { Name: 'mainCodeId', Header: [{ }, { Value: '<span class="emp_red">공종</span>', Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
                        { Name: 'midCodeId', Header: [{ }, { Value: '<span class="emp_red">세부공종</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5 },
                        { Name: 'subCodeId', Header: [{ }, { Value: '<span class="emp_red">결함공종</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5},
                        { Name: 'bsDefectMngId', Header: [{ }, { Value: '<span class="emp_red">결함유형</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5 },
                        // { Name: 'case8', Header: [{ }, { Value: '결함내용' }], Required: 1, RelWidth: 5 },
                        // { Name: 'case8', Header: [{ }, { Value: '결함내용' }], Format: {"1": "<select class='form_control d-inline-block' style='width:80px'><option value=''>선택</option></select><input type='text' class='form_control d-inline-block ml10' style='width:150px;height:28px' placeholder='입력해주세요'>"}, CanEdit: 0, Required: 1, RelWidth: 16 },
                        { Name: 'bsDefectSelet', Header: [{ }, { Value: '<span class="emp_red">결함내용</span>', Span : 2, Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 16, Size:15},
                        { Name: 'bsDefectConts', Header: [{ }, {}], EmptyValue: '입력하세요.', RelWidth: 16, CanEdit : 0 },
                        { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' },], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
                        { Name: 'bsInspMtrl', Header: [{}, { Value: '자재' } ], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
                        { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' } ], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
                        { Name: 'bsFileConnectId', Header: [{ }, { Value: '관련사진' }], Format: {"1": "<button type='button' class='btn_write'>등록</button>", "2": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
                        { Name: 'spaceTypeCode', Visible:0},
                        { Name: 'bsInsprType', Visible:0},
                        { Name: 'bsInsprName', Visible:0},
                        { Name: 'bsInspDt', Visible:0},
                        { Name: 'bsInsprType', Visible:0},
                        { Name: 'bsInsprId', Visible:0},
                        { Name: 'bsInsprName', Visible:0},
                        { Name: 'bsAsignType', Visible:0},
                        { Name: 'tradeId', Visible:0},
                        { Name: 'addIndex', Visible:0},
                    ]
                },
                data: [
                    { isCheck: '', standDong: '', addrHo: '', bsSpaceMngId: '1',  mainCodeId: '1', midCodeId: '1', subCodeId: '1', bsDefectMngId: '1', bsDefectSelet: '직접입력', bsDefectConts: '직접입력', bsInspEmgc: 'Y', bsInspMtrl: 'Y', bsInspPop: 'Y', bsFileConnectId: '1' },
                ],
            },
            
            itrSheet : null,
            spacedefectCntList : [],
            addIdx : '1',

            /** 결함상세  */

            paramBsDefectRegMngId : '',
            /* BS점검 > 세대결함 > 결함상세 > 결함처리 (팝업) */
            ProcessPublicDefect : {
                options: {
                    Cfg:{
                        NoVScroll : 0,
                        NoDataMessage:3,
                    },
                    Cols: [
                        { Name: 'bsPrcsOrder', Header: [{ Value: '처리차수' }], CanEdit: 0, RelWidth: 5 },
                        { Name: 'bsPrcsDt', Header: [{ Value: '처리완료일' }], CanEdit: 0,RelWidth: 16 },
                        { Name: 'bsDfpsFileConnectId', Header: [{ Value: '관련사진' }], Format: {"1":"<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
                        { Name: 'SEQ', Visible : 0 }
                    ]
                },
                data: [
                    { bsPrcsOrder: '', bsAsignYn: '', tradeNm: '', bsAsignDt: '', bsPrcsDt: '', bsDfpsFileConnectId: '1' },
                ],
            },

            itpdSheet : null,
            flawProcessDetailGridData : [],

            /* BS점검 > 세대결함 > 결함상세 > 확인 점검 (팝업) */
            ConfirPublicmDefect : {
                options: {
                    Cfg:{
                        NoVScroll : 0,
                        NoDataMessage:3,
                    },
                    Cols: [
                        { Name: 'bsPrcsOrder', Header: [{ Value: '처리차수' }], CanEdit: 0, RelWidth: 5 },
                        { Name: 'bsCnfmTypeCode', Header: [{ Value: '결괴등급' }], CanEdit: 0, RelWidth: 5 },
                        { Name: 'bsCnfmDt', Header: [{ Value: '확인점검일' }], CanEdit: 0, RelWidth: 5},
                        { Name: 'bsCnfmConts', Header: [{ Value: '점검내역' }], CanEdit: 0, RelWidth: 5 },
                        { Name: 'bsDfcfFileConnectId', Header: [ { Value: '관련사진' }], Format: {"1": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
                        { Name: 'SEQ', Visible : 0 }
                    ]
                },
                data: [
                    { bsPrcsOrder: '', bsCnfmTypeCode: '', bsCnfmDt: '건축', bsCnfmConts: '', bsDfcfFileConnectId: '1' },
                ],
            },

            itcdSheet : null,
            flawConfirmDetailGridData : [],
            lstFileRstDetail : [],
            files : [],
            fileUpload : [],
            fileIdex : 0,
            filesProcessFlaw : [],
            filesConfirmFlaw : [],
            bsFlawPcptPhoto : '미등록',
            bsFlawCfptPhoto : '미등록',
            //columns : [],
            //gridData : [],
            sheet : null,
            // detailSheet : null,
            // detailColumns : [],
            // detailGridData : [],
            //flawColumns : [],
            //flawGridData : [],
            //flawSheet : null,
            // dongHosuColumns : [],
            dongHosuGridData : [],
            // dongHosuSheet : null,
            // flawProcessDetailColumns : [],
            // flawProcessDetailGridData : [],
            // flawProcessDetailSheet : null,
            // flawConfirmDetailColumns : [],
            // flawConfirmDetailGridData : [],
            // flawConfirmDetailSheet : null,
            // flawAddRowData : { bsSpaceMngId: '', standDong: '', addrFloor : '', mainCodeId: '', midCodeId: '', subCodeId: '', bsDefectMngId: '', bsDefectSelet: '', bsDefectConts: '', bsInspEmgc: '', bsInspMtrl: '', bsInspPop: '', bsFileConnectId : '1'},
            categoryData: [],
            dongList : [],
            bsCnfmTypeList : [],
            spaceTypeList : [],
            siteMainData : [],      // 검색콤보 - 공종
            siteMidData : [],       // 검색콤보 - 세부공종
            siteSubData : [],       // 검색콤보 - 결함공종
            
            insert : {
                spaceTypeCode : '', //공간유형코드
                bsSpaceMngId : '', //BS공간관리 ID
                bsDefectMngId : '', //BS결함관리ID
                bsDefectConts : '', //BS결함내용
                standDong : '', //기준동
                addrFloor : '', //주소층
                bsInspDt : '', //BS점검일자
                bsInsprType : '', //BS점검자유형
                bsInsprId : '', //BS점검자ID
                bsInsprName : '', //BS점검자명
                bsInspEmgc : '', //BS점검긴급
                bsInspMtrl : '', //BS점검자재
                bsInspPop : '', //BS점검POP
                bsAsignType : '', //BS배정유형
                tradeId : '', //협력사ID
            },
            detail : {
                standDong : '',
                addrFloor : '',
                noSize : '',
            },
            dlSpaceDefectList : [],
            dongHosu : {
                standDong : '',
                cnt : 0
            },
            houseData : [],     //세대설정 층,
            stdHo : [],       //해당 동의 호
            addrFr : [],      //해당 동의 세대
            houseInfoMySiteData : [], //받아온 호
            isAllChecked: false,
            isAllDisabled: false,
            dongHoList : [],
            //결함처리
            processDefect : {
                standDong : '',
                addrFloor : '',
                bsSpaceMngName : '',
                mainName : '',
                midName : '',
                subName : '',
                defectTypeName : '',
                bsCnfmTypeName : '',
                bsPrcsDt : '',
                bsDefectRegMngId : '',
                tradeId : '',
                bsDefectConts : '',
                bsAsignDt : '',
                bsPrcsOrder : '',
            },
            cnfm : {
                standDong : '',
                addrFloor : '',
                bsSpaceMngName : '',
                mainName : '',
                midName : '',
                subName : '',
                defectTypeName : '',
                bsCnfmTypeName : '',
                bsCnfmDt : '',
                bsPrcsOrder : '',
                bsDefectRegMngId : '',
                tradeNm : '',
                bsCnfmTypeCode : '1',
                bsCnfmConts : '',
                bsPrcsDt : '',
                bsDefectProsCnfmId : '',
                bsDefectConts : '',
                tradeId : '',
            },
            bsDetail : {
                bsInsprName : '',
                bsInspDt : '',
                standDong : '',
                addrFloor : '',
                bsSpaceMngName : '',
                mainName : '',
                midName : '',
                subName : '',
                defectTypeName : '',
                bsDefectConts: '',
                bsInspEmgc : '',
                bsInspMtrl : '',
                bsInspPop : '',
                bsPrcsOrder : '',
                bsAsignType : '',
                tradeNm : '',
                bsAsignDt : '',
                bsPrcsDt : '',
                bsCnfmTypeName : '',
                bsCnfmDt : '',
                bsDefectConts : '',
                bsFileInfo : false,
            },

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
            'search.addrFloor' : {
                handler(NewVal) {
                    this.search.addrFloor = NewVal.replace(/[^0-9]/g, '');
                },
            },
            'search.spaceTypeCode' : {
                handler() {
                    this.search.mainCodeId = '';
                    this.search.midCodeId = '';
                    this.search.subCodeId = '';
                    this.search.defectTypeCode = '';
                },
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
        },
        mounted() {
             this.$bvModal

            //기본 정보 셋팅
            this.userId = this.$store.getters['auth/getUserId'];
            this.userType = this.$store.getters['auth/getUserType'];
            this.tradeId = this.$store.getters['auth/getTradeId'];
            this.tradeType = this.$store.getters['auth/getTradeType'];
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
            this.projectId = this.$store.getters['auth/getProjectId']; 
            //console.log(this.$store.getters['auth/getTradeType']);
            
            this.bsFileInfo = false;
            //this.flawGridData = WritePublicDefect.data
            this.insert.bsInsprName = this.$store.getters['auth/getUserNm'];
            //this.columns = InspectionPublicBsList7.options.Cols
            this.detailColumns = PrdtOptions.options.Cols
            //this.flawColumns = WritePublicDefect.options.Cols
            this.dongHosuColumns = PartnerWork.options.Cols
            //this.flawDetailColumns = DetailDefect.options.Cols
            //this.flawProcessDetailColumns = ProcessPublicDefect.options.Cols
            //this.flawConfirmDetailColumns = ConfirPublicmDefect.options.Cols
            this.search.siteMstrId = this.$store.getters['auth/getSiteMstrId'];

            this.getMasterList()
            this.getHouseInfoMySiteDongList()               // 현장 동정보 
            this.getBsDeffectMngList()                      // 검색콤보 - 본사 setup BS결함관리 정보                    
            this.getSpacedefectCntList()                    // 검색콤보 - 본사 setup 공용 공간 리스트
            this.getCateGoryData()                          // 시트 - 공간, 결함정보 select 정보

            this.getBsDeffectRegMngList(this.search)        // 공용 BS점검 리스트 
        },
        beforeDestroy() {
            //시트 초기화
            if(this.itpSheet) {
                this.itpSheet.dispose();
            }
            if(this.itrSheet) {
                this.itrSheet.dispose();
            }
            if(this.itpdSheet) {
                this.itpdSheet.dispose();
            }
            if(this.itcdSheet) {
                this.itcdSheet.dispose();
            }
        },
        methods: {
            
            processDefectClear() {
                this.processDefect.standDong = ''
                this.processDefect.addrFloor = ''
                this.processDefect.bsSpaceMngName = ''
                this.processDefect.mainName = ''
                this.processDefect.midName = ''
                this.processDefect.subName = ''
                this.processDefect.defectTypeName = ''
                this.processDefect.bsCnfmTypeName = ''
                this.processDefect.bsPrcsDt = ''
                this.processDefect.bsDefectRegMngId = ''
                this.processDefect.tradeId = ''
                this.processDefect.bsDefectConts = ''
                this.processDefect.bsAsignDt = ''
                this.processDefect.bsPrcsOrder = ''
            },
            cnfmClear() {
                this.cnfm.standDong = ''
                this.cnfm.addrFloor = ''
                this.cnfm.bsSpaceMngName = ''
                this.cnfm.mainName = ''
                this.cnfm.midName = ''
                this.cnfm.subName = ''
                this.cnfm.defectTypeName = ''
                this.cnfm.bsCnfmTypeName = ''
                this.cnfm.bsCnfmDt = ''
                this.cnfm.bsPrcsOrder = ''
                this.cnfm.bsDefectRegMngId = ''
                this.cnfm.tradeNm = ''
                this.cnfm.bsCnfmTypeCode = '1'
                this.cnfm.bsCnfmConts = ''
                this.cnfm.bsPrcsDt = ''
                this.cnfm.bsDefectProsCnfmId = ''
                this.cnfm.bsDefectConts = ''
                this.cnfm.tradeId = ''
            },
            // detailInitSheet(sheet) {
            //     this.detailSheet = sheet
            // },
            // flawInitSheet(sheet) {
            //     this.flawSheet = sheet
            // },
            // dongHosuInitSheet(sheet) {
            //     this.dongHosuSheet = sheet
            // },
            // flawProcessDetailInitSheet(sheet) {
            //     this.flawProcessDetailSheet = sheet
            // },
            // flawConfirmDetailInitSheet(sheet) {
            //     this.flawConfirmDetailSheet = sheet
            // },

            /**
             * 검색조건 세팅
             */
            setTopFilterOption (data) {
                const all = { label : '전체', value : ''}
                const allDongList = data.map(item => {
                    return {
                        label: parseInt(item)+'동',
                        value: parseInt(item),
                    }
                })
                this.dongList = [all,..._.uniqBy(allDongList, 'value')]
            },

            setMasterFilterOption (data) {
                const allMasterList = data.map(item => {
                    return {
                        label: item.codeNameKr,
                        value: item.codeVal,
                    }
                })
                this.bsCnfmTypeList = [..._.uniqBy(allMasterList, 'value')]
            },
            /**
             * 검색조건 불러오기 
             */
            async getHouseInfoMySiteDongList(){
                const payload = {
                    siteMstrId : this.siteMstrId
                }
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteDongList(payload)
                    if(result?.dlHouseDong){
                        this.setTopFilterOption(result.dlHouseDong)
                        this.dongHosuGridData = result.dlHouseDong.map(row=> {
                            return {
                                standDong: row
                            }
                        })
                        let imsiList = result.dlHouseDong

                        let imsi = imsiList.map(item => {return Number(item)})
                        let sImsi1 = '|전체|' + imsi.join('|')
                        
                        this.WritePublicDefect.options.Cols.find(col => col.Name === 'standDong').Enum = sImsi1
                        
                        
                        let imsi2 = imsiList.map(item => {return Number(item)})
                        let sImsi2 = '||' + imsi2.join('|')
                        this.WritePublicDefect.options.Cols.find(col => col.Name === 'standDong').EnumKeys = sImsi2
                        
                    }
                } catch (error) {
                    console.log('검색조건 동 리스트 불러오기 에러 : ', error)
                }
            },
            /**
             * 검색조건 공종, 세부공종, 결함공종, 결함유형 가져오기
             */
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

                        this.categoryData = result.dlDefectMng;                                 // 결함유형

                        this.siteMainData = _.uniqBy([...result.dlDefectMng], 'mainCodeId');    // 공종
                        this.siteMidData = _.uniqBy([...result.dlDefectMng], 'midCodeId');      // 세부공종
                        this.siteSubData = _.uniqBy([...result.dlDefectMng], 'subCodeId');      //
                    } 
                } catch (error) {
                    console.log('검색조건 공종, 세부공종, 결함공종, 결함유형 불러오기 에러 : ', error)
                }
            },
            /**
             * 검색콤보 공간 조회
             */
            async getSpacedefectCntList () {
                const payload = {
                    spaceTypeCode : 'P',
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const result = await API.bsCheck.getSpacedefectCntList(payload)

                    if(result) {
                        
                        const all = { label : '전체', value : ''}
                        const allSpcaeTypeList = result.dlSpaceDefectCnt.map(item => {
                            return {
                                label: item.bsSpaceMngName,
                                value: item.bsSpaceMngId,
                                spaceTypeCode : item.spaceTypeCod
                            }
                        })
                        this.spaceTypeList = [all, ..._.uniqBy(allSpcaeTypeList, 'value')]                    
                    }
                    
                } catch (error) {
                    console.log('검색콤보 공간 조회 조회 에러 : ', error)
                }
            },

            /**
             * 검색조건 결과등급 마스터코드 불러오기
             */
            async getMasterList() {
                const payload = {
                    siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                    groupCode: 'BS_CNFM_TYPE',
                }
                try {
                    const result = await API.bsCheck.getMasterList(payload)
                    if(result?.data){
                        this.bsCnfmTypeList = result.data
                    }
                } catch (error) {
                    console.log('마스터 코드 조회 에러 : ', error)
                }
            },
            /**
             * BS 점검 공용 결함 리스트 불러오기
             */
            async getBsDeffectRegMngList(){
                this.InspectionPublicBsList7.options.Events = {
	                onRenderFirstFinish: async (event) => {
                        let payload = {};
                        payload['spaceTypeCode'] = 'P'
                        payload['bsInspStartDt'] = this.search.bsInsp[0];
                        payload['bsInspEndDt'] = this.search.bsInsp[1];
                        payload['bsPrcsStartDt'] = this.search.bsPrcs[0];
                        payload['bsPrcsEndDt'] = this.search.bsPrcs[1];
                        payload['bsCnfmStartDt'] = this.search.bsCnfm[0];
                        payload['bsCnfmEndDt'] = this.search.bsCnfm[1];
                        if(!commonFn.methods.isEmpty(String(this.search.standDong))) {
                            payload['standDong'] = this.search.standDong
                        }
                        if(!commonFn.methods.isEmpty(String(this.search.addrFloor))) {
                            payload['addrFloor'] = this.search.addrFloor
                        }
                        if(!commonFn.methods.isEmpty(this.search.spaceTypeCode)) {
                            payload['spaceTypeCode'] = this.search.spaceTypeCode
                        }
                        if(!commonFn.methods.isEmpty(this.search.mainCodeId)) {
                            payload['mainCodeId'] = this.search.mainCodeId
                        }
                        if(!commonFn.methods.isEmpty(this.search.subCodeId)) {
                            payload['subCodeId'] = this.search.subCodeId
                        }
                        if(!commonFn.methods.isEmpty(this.search.defectTypeCode)) {
                            payload['defectTypeCode'] = this.search.defectTypeCode
                        }
                        if(!commonFn.methods.isEmpty(this.search.bsAsignType)) {
                            payload['bsAsignType'] = this.search.bsAsignType
                        }
                        if(!commonFn.methods.isEmpty(this.search.tradeNm)) {
                            payload['tradeNm'] = this.search.tradeNm
                        }
                        if(!commonFn.methods.isEmpty(this.search.bsDefectConts)) {
                            payload['bsDefectConts'] = this.search.bsDefectConts
                        }
                        if(!commonFn.methods.isEmpty(this.search.bsCnfmTypeCode)) {
                            payload['bsCnfmTypeCode'] = this.search.bsCnfmTypeCode
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
                        payload['siteMstrId'] = this.siteMstrId 

                        // 협력사 이고 시공업체인 경우 자기회사 BS결함만 보임처리
                        if(this.userType === 'PTNR' && this.tradeType == 'C') {  
                            //payload['siteMstrId'] = this.siteMstrId 
                            payload['tradeId'] = this.tradeId
                        }
                        try {
                            this.getBsInsptSummary()
                            const result = await API.bsCheck.getBsDeffectRegMngList(payload)
                            if(result){
                                this.dlDefectReg = result.dlDefectReg.map(row => {
                                    return {
                                        ...row,
                                        standDong : row.standDong ? Number(row.standDong) : '' ,
                                        addrFloor : row.addrFloor ? row.addrFloor : '' ,
                                        bsInspEmgc : row.bsInspEmgc === "Y"? "O" : "",
                                        bsInspMtrl : row.bsInspMtrl === "Y"? "O" : "",
                                        bsInspPop : row.bsInspPop === "Y"? "O" : "",
                                        bsAsignType : row.bsAsignType === "A"? "배정": row.bsAsignType === "R"? "반환" : "미배정",
                                        bsCnfmTypeCode : row.bsCnfmTypeCode === "1"? "양호": row.bsCnfmTypeCode === "2"? "미흡": row.bsCnfmTypeCode === "3" ? '미조치' : ""
                                    }
                                })
                                event.sheet.loadSearchData({
                                    data: this.dlDefectReg,
                                    append : false
                                })
                                this.itpSheet.getDataRows().forEach(item => {
                                    
                                    if(item.bsAsignType === '미배정'){
                                        this.itpSheet.setAttribute({row: item, col: 'bsAsignType', attr : 'TextColor', val : '#FF0000'})
                                    }
                                    if(item.bsCnfmTypeCode === '미흡') {
                                        this.itpSheet.setAttribute({row: item, col: 'bsCnfmTypeCode', attr : 'TextColor', val : '#FF0000'})
                                    }
                                    if(item.bsCnfmTypeCode === '미조치') {
                                        this.itpSheet.setAttribute({row: item, col: 'bsCnfmTypeCode', attr : 'TextColor', val : '#FF0000'})
                                    }
                                    this.itpSheet.refreshCell(item);
                                })
                                
                                this.count6 = result.dlDefectReg.length
                                
                            } else {
                                this.dlDefectReg = this.InspectionPublicBsList7.data
                                this.count6 = result.dlDefectReg.length
                            }
                        } catch (error) {
                            console.log('BS 점검 공용결함 리스트 불러오기 에러 : ', error)
                        }
                    },
                    onDblClick: this.clickGrid,
	                // onAfterChange: this.changeGrid,
                }
                let options = this.InspectionPublicBsList7.options;  
                loader.createSheet({
                    el: 'sheetTable',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itpSheet = sheet;
                })
            },
            /** 총 결함건수, 결함건수(세대당), 처리건수, 결함처리율, 잔여건수, 잔여건수 (세대당) */
            async getBsInsptSummary() {
                try {
                    let payload = {
                        spaceTypeCode : 'P',
                        siteMstrId : this.siteMstrId 
                    };
                    //payload['spaceTypeCode'] = 'P'
                    payload['siteMstrId'] = this.siteMstrId 
                    if(this.userType === 'PTNR' && this.tradeType === 'C') {  
                        //payload['siteMstrId'] = this.siteMstrId 
                        payload['tradeId'] = this.tradeId
                    }
                    const result = await API.bsCheck.getBsInsptSummary(payload)
                    
                    //console.log("@@@@@ getBsInsptSummary result : %o",result);
                    
                    if(result){

                        if(result.dlBsInspt.bsTotlCnt === '0' || result.dlBsInspt.bsTotlCnt === '0.0') {
                            this.bsTotlCnt = '0'
                        } else {
                            this.bsTotlCnt = result.dlBsInspt.bsTotlCnt
                        }
                        if(result.dlBsInspt.bsPrcsCnt === '0' || result.dlBsInspt.bsPrcsCnt === '0.0') {
                            this.bsPrcsCnt = '0'
                        } else {
                            this.bsPrcsCnt = result.dlBsInspt.bsPrcsCnt
                        }
                        if(result.dlBsInspt.bsPrcsRate === '0' || result.dlBsInspt.bsPrcsRate === '0.0') {
                            this.bsPrcsRate = '0.00'
                        } else {
                            this.bsPrcsRate = Number(result.dlBsInspt.bsPrcsRate).toFixed(2);
                        }
                        if(result.dlBsInspt.bsCnfmCnt === '0' || result.dlBsInspt.bsCnfmCnt === '0.0') {
                            this.bsCnfmCnt = '0'
                        } else {
                            this.bsCnfmCnt = result.dlBsInspt.bsCnfmCnt
                        }
                        if(result.dlBsInspt.bsCnfmRate === '0' || result.dlBsInspt.bsCnfmRate === '0.0') {
                            this.bsCnfmRate = '0.00'
                        } else {
                            this.bsCnfmRate = Number(result.dlBsInspt.bsCnfmRate).toFixed(2);
                        }
                        if(result.dlBsInspt.bsRemnCnt === '0' || result.dlBsInspt.bsRemnCnt === '0.0') {
                            this.bsRemnCnt = '0'
                        } else {
                            this.bsRemnCnt = result.dlBsInspt.bsRemnCnt
                        }
                    } else {
                        console.log('BS 점검 세대 결함 리스트 불러오기 에러')
                    }
                } catch (error) {
                    console.log('BS 점검 세대 결함 리스트 불러오기 에러 : ', error)
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
                        addrFloor : '',
                        spaceTypeCode : '',
                        mainCodeId : '',
                        midCodeId : '',
                        subCodeId : '',
                        defectTypeCode : '',
                        bsAsignType : '',
                        tradeId : '',
                        bsDeffectConts : '',
                        bsCnfmTypeCode : '',
                        bsInspEmgc : false,
                        bsInspMtrl : false,
                        bsInspPop : false,
                        all : true,
                        bsInsp: [null,null],
                        bsPrcs : [null,null],
                        bsCnfm : [null, null],
                    }
                }
                return await this.getBsDeffectRegMngList(this.search)
            },
            /** 
             * 그리드 클릭 이벤트
             */
            clickGrid(evt) {
                this.paramBsDefectRegMngId = evt.row.bsDefectRegMngId
                this.$bvModal.show('DetailDefectP')

            },
            async clickGridData() {
                let payload = {
                    bsDefectRegMngId : this.paramBsDefectRegMngId,
                    siteMstrId : this.siteMstrId
                }
                try {
                    const result = await API.bsCheck.getDefectRegView(payload)
                    if(result?.dmDefectReg){
                        this.bsDetail.bsInsprName = result.dmDefectReg.bsInsprName
                        this.bsDetail.bsInspDt = result.dmDefectReg.bsInspDt.slice(0,4) + '-' + result.dmDefectReg.bsInspDt.slice(4,6) + '-' + result.dmDefectReg.bsInspDt.slice(6,8)
                        this.bsDetail.standDong = result.dmDefectReg.standDong
                        this.bsDetail.addrFloor = result.dmDefectReg.addrFloor
                        this.bsDetail.bsSpaceMngName = result.dmDefectReg.bsSpaceMngName
                        this.bsDetail.mainName = result.dmDefectReg.mainName
                        this.bsDetail.midName = result.dmDefectReg.midName
                        this.bsDetail.subName = result.dmDefectReg.subName
                        this.bsDetail.defectTypeName = result.dmDefectReg.defectTypeName
                        this.bsDetail.bsDefectConts = result.dmDefectReg.bsDefectConts
                        this.bsDetail.bsInspEmgc = result.dmDefectReg.bsInspEmgc
                        this.bsDetail.bsInspMtrl = result.dmDefectReg.bsInspMtrl
                        this.bsDetail.bsInspPop = result.dmDefectReg.bsInspPop
                        this.bsDetail.bsAsignType = result.dmDefectReg.bsAsignType === 'Y' ? '배정':'미배정'
                        this.bsDetail.tradeNm = result.dmDefectReg.tradeNm
                        this.bsDetail.bsAsignDt = result.dmDefectReg.bsAsignDt != null && result.dmDefectReg.bsAsignDt != ''? result.dmDefectReg.bsAsignDt.slice(0,4) + '-' + result.dmDefectReg.bsAsignDt.slice(4,6) + '-' + result.dmDefectReg.bsAsignDt.slice(6,8) : ''
                    }
                    //공용결함 처리시 등록한 파일 가져오기
                    if(!commonFn.methods.isEmpty(result.dmDefectReg.bsDefectRegMngId)) {
                        let fileParam = {
                            fileConnectId : this.itpSheet.getFocusedRow().bsDefectRegMngId,
                            fileType : 'BSCheck',
                            fileSubType : 'defectReg'
                        }
                        try {
                            const resultFile = await API.bsCheck.loadFileInfo(fileParam)
                            if(resultFile?.data.length > 0){
                                this.bsFileInfo = true
                            } else {
                                this.bsFileInfo = false
                            }
                        } catch (error) {
                            console.error('파일 불러오기 에러 : ', error)
                        } 
                    } else {
                        this.bsFileInfo = false
                    }
                    
                    this.ProcessPublicDefect.options.Events = {
	                    onRenderFirstFinish: async (event) => {
                            const resultData = await API.bsCheck.getDefectProsCnfmList(payload)
                            if(resultData?.dlDefectProsCnfm) {
                                this.flawProcessDetailGridData = resultData.dlDefectProsCnfm.map(row => {
                                    if(row.bsPrcsDt) {
                                        return {
                                            ...row,
                                            bsDfpsFileConnectId : row.bsDfpsFileConnectId ? '1':'',
                                            bsAsignYn : row.tradeId === null ? '미배정' : '배정',
                                            bsAsignDt : row.bsAsignDt ? row.bsAsignDt.slice(0,4) + '-' + row.bsAsignDt.slice(4,6) + '-' + row.bsAsignDt.slice(6,8) : '',
                                            bsPrcsDt : row.bsPrcsDt ? row.bsPrcsDt.slice(0,4) + '-' + row.bsPrcsDt.slice(4,6) + '-' + row.bsPrcsDt.slice(6,8) : '',
                                        }
                                    }
                                })
                                event.sheet.loadSearchData({
                                    data: this.flawProcessDetailGridData,
                                    append : false
                                })
                            }
                        },
                        onAfterClick: this.flawProcessDetailClickGrid
                    }

                    let options = this.ProcessPublicDefect.options;  
                    loader.createSheet({
                        el: 'popSheetTable2',
                        data: [],
                        options: options,
                    }).then(sheet => {
                        this.itpdSheet = sheet;
                    })

                    this.ConfirPublicmDefect.options.Events = {
	                    onRenderFirstFinish: async (event) => {
                            const resultData2 = await API.bsCheck.getDefectProsCnfmList(payload)
                            if(resultData2?.dlDefectProsCnfm) {
                                this.flawConfirmDetailGridData = resultData2.dlDefectProsCnfm.map(row => {
                                    if(row.bsCnfmDt) {
                                        return {
                                            ...row,
                                            bsCnfmTypeCode : row.bsCnfmTypeCode === '1' && row.bsCnfmTypeCode ? '양호': row.bsCnfmTypeCode === '2'? '미흡':'미조치',
                                            bsCnfmDt : row.bsCnfmDt ? row.bsCnfmDt.slice(0,4) + '-' + row.bsCnfmDt.slice(4,6) + '-' + row.bsCnfmDt.slice(6,8) : '',
                                            bsDfcfFileConnectId : row.bsDfcfFileConnectId != null && row.bsDfcfFileConnectId ? '1':'',
                                        }
                                    }
                                })
                                event.sheet.loadSearchData({
                                    data: this.flawConfirmDetailGridData,
                                    append : false
                                })
                            }
                        },
                        onAfterClick: this.flawConfirmDetailClickGrid
                    }
                    let options1 = this.ConfirPublicmDefect.options;  
                    loader.createSheet({
                        el: 'popSheetTable3',
                        data: [],
                        options: options1,
                    }).then(sheet1 => {
                        this.itcdSheet = sheet1;
                    })



                    
                    // if(result2?.dlDefectProsCnfm) {
                    //     console.log('result2.dlDefectProsCnfm')
                    //     console.log(result2.dlDefectProsCnfm)
                    //     this.flawProcessDetailGridData = result2.dlDefectProsCnfm.map(row => {
                    //         return {
                    //         ...row,
                    //         bsDfpsFileConnectId : row.bsDfpsFileConnectId != null ? '1':'1',
                    //         bsAsignYn : row.tradeId === null ? '미배정' : '배정',
                    //         bsAsignDt : row.bsAsignDt = row.bsAsignDt.slice(0,4) + '-' + row.bsAsignDt.slice(4,6) + '-' + row.bsAsignDt.slice(6,8),
                    //         bsPrcsDt : row.bsPrcsDt = row.bsPrcsDt.slice(0,4) + '-' + row.bsPrcsDt.slice(4,6) + '-' + row.bsPrcsDt.slice(6,8),
                    //         }
                    //     })
                    //     this.flawConfirmDetailGridData = result2.dlDefectProsCnfm.map(row => {
                    //         return {
                    //         ...row,
                    //         bsCnfmTypeCode : row.bsCnfmTypeCode === '1'? '양호': row.bsCnfmTypeCode === '2'? '미흡':'미조치',
                    //         bsCnfmDt : row.bsCnfmDt = row.bsCnfmDt.slice(0,4) + '-' + row.bsCnfmDt.slice(4,6) + '-' + row.bsCnfmDt.slice(6,8),
                    //         bsDfcfFileConnectId : row.bsDfcfFileConnectId != null ? '1':'1',
                    //         }
                    //     })
                    // } else {
                    //     this.flawProcessDetailGridData = ProcessDefect.data
                    //     this.flawConfirmDetailGridData = ConfirmDefect.data
                    // }
                } catch (error) {
                    console.log('세대 결함 상세보기 에러 : ', error)
                }
            },


            /**
             * 결함등록 START
             */
            insertBtn() {
                //this.getSpacedefectCntList()
                this.$bvModal.show('WriteDefectP')
            },
            
            createSheet() {
                this.WritePublicDefect.options.Events = {
	                onRenderFirstFinish: async (event) => {
                        event.sheet.loadSearchData({
                            data: this.spacedefectCntList[0],
                            append : false
                        })
                        this.fileUpload = [];
                        this.addRow()
                    },
                    onAfterClick: this.flawClickGrid,
	                onAfterChange: this.flawAfterChange,
                }
                let options = this.WritePublicDefect.options;  
                loader.createSheet({
                    el: 'popSheetTable',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.itrSheet = sheet;
                })
            },
            /** 결함등록(팝업) 결함등록 */
            addRow () {
                let sheet = this.itrSheet;
                let checkRows = [];

                checkRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                if(checkRows.length === 0) {
                    if(checkRows.length === 0) {
                        for(let i=0; i<this.addIdx; i++) {
                            sheet.addRow({
                                count : this.addIdx,
                                init: { bsFileConnectId: '1'},
                                next: checkRows.length > 0 ? checkRows[0].nextSibling : null,
                            })
                        }
                    } else {
                        for(let i=0; i<this.addIdx; i++) {
                            sheet.addRow({
                                count : this.addIdx,
                                init: { bsFileConnectId: '1'},
                                next: checkRows.length > 0 ? checkRows[0].nextSibling : null,
                            })
                        }
                    }
                }
            },
            /** 결함등록(팝업) 행삭제 */
            delRow : function () {
                let sheet = this.itrSheet;
                let checkedRows = [];
                sheet = this.itrSheet;
                checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                if(checkedRows.length === 0) {
                    this.alert('삭제할 행을 선택해주세요.');
                    return;
                } else {
                    this.confirm('삭제하시겠습니까?' , async => {
                        sheet.deleteRows({rows : checkedRows })
                        checkedRows.forEach(item => {
                            sheet.removeRow({row: item,}) 
                        })
                    })
                }
                
            },
            /** 결함등록(팝업) 행 복사 */
            copyRow: function(){    //행복사
                let sheet = this.itrSheet;
                let checkedRows = [];
                let checkColumn = 'isChecked';
                checkedRows = sheet.getRowsByChecked(checkColumn);
                 
                if(checkedRows.length === 0) {
                    this.alert('복사할 행을 선택해주세요.');
                    return;
                }
                let copiedRows = sheet.copyRows(checkedRows, sheet.getFirstRow());
                copiedRows.forEach(item => {
                    item[checkColumn] = false;
                    sheet.refreshCell(item, checkColumn)
                })
            },
            /** 등록 팝업 공간 값이 바뀌면 공종 세부공종 결함공종 결함유형 바꾸기 */
            flawAfterChange(evt) {
                // evt.sheet.clear()
                if(evt.col === "bsSpaceMngId") {
                    evt.row.mainCodeId = ""
                    evt.row.midCodeId = ""
                    evt.row.subCodeId = ""
                    evt.row.bsDefectMngId = ""
                    
                    // maincode 셋팅
                    let imsiList = _.uniqBy([...this.dlSpaceDefectList.filter(item => item.bsSpaceMngId == evt.row.bsSpaceMngId)],'mainCodeId');
                    let imsi = imsiList.map(item => {return item.mainName});

                    let sImsi1 = '|' + imsi.join('|')
                    evt.sheet.setAttribute( evt.row, 'mainCodeId', 'Enum', sImsi1)
                    
                    let imsi2 = imsiList.map(item => {return item.mainCodeId})
                    let sImsi2 = '|' + imsi2.join('|')
                    evt.sheet.setAttribute( evt.row, 'mainCodeId', 'EnumKeys', sImsi2)

                    console.log("@@@@@ main evt.sheet :%o",evt.sheet);

                    evt.sheet.refreshRow(evt.row)
                }
                if(evt.col === 'mainCodeId') {
                    evt.row.midCodeId = ""
                    evt.row.subCodeId = ""
                    evt.row.bsDefectMngId = ""

                    let imsiList = _.uniqBy([...this.dlSpaceDefectList.filter( item => item.bsSpaceMngId == evt.row.bsSpaceMngId && item.mainCodeId == evt.row.mainCodeId)],'midCodeId')
                    let imsi = imsiList.map(item => {return item.midName})
                    let sImsi1 = '|' + imsi.join('|')
                    evt.sheet.setAttribute( evt.row, 'midCodeId', 'Enum', sImsi1)
                    
                    let imsi2 = imsiList.map(item => {return item.midCodeId})
                    let sImsi2 = '|' + imsi2.join('|')
                    evt.sheet.setAttribute( evt.row, 'midCodeId', 'EnumKeys', sImsi2)
                
                    evt.sheet.refreshRow(evt.row)
                }
                if(evt.col === 'midCodeId') {
                    evt.row.subCodeId = ""
                    evt.row.bsDefectMngId = ""

                    let imsiList = _.uniqBy(this.dlSpaceDefectList.filter( item => item.bsSpaceMngId == evt.row.bsSpaceMngId && item.mainCodeId == evt.row.mainCodeId && item.midCodeId == evt.row.midCodeId),'subCodeId')

                    let imsi = imsiList.map(item => {return item.subName})
                    let sImsi1 = '|' + imsi.join('|')
                    evt.sheet.setAttribute( evt.row, 'subCodeId', 'Enum', sImsi1)
                    
                    let imsi2 = imsiList.map(item => {return item.subCodeId})
                    let sImsi2 = '|' + imsi2.join('|')
                    evt.sheet.setAttribute( evt.row, 'subCodeId', 'EnumKeys', sImsi2)

                    evt.sheet.refreshRow(evt.row)
                }
                if(evt.col === 'subCodeId') {
                    evt.row.bsDefectMngId = ""
                    this.bsDefectMngIdList(evt)
                    this.getDefectCntsMngList(evt)
                    evt.sheet.refreshRow(evt.row)
                }
                if(!evt.row.bsDefectSelet) {
                    evt.sheet.setAttribute(evt.row, "bsDefectConts", "CanEdit", 1, 1)
                    //evt.sheet.setValue(evt.row, "bsDefectConts", '')
                } else {
                    evt.sheet.setAttribute(evt.row, "bsDefectConts", "CanEdit", 0, 1)
                    evt.sheet.setValue(evt.row, "bsDefectConts", evt.row.bsDefectSelet)
                }
            },
            /** 결함유형 불러오기 */
            async bsDefectMngIdList (evt) {
                const payload = {
                    mainCodeId : evt.row.mainCodeId,
                    midCodeId : evt.row.midCodeId,
                    subCodeId : evt.row.subCodeId,
                }
                try {
                    const result = await API.bsCheck.getDefectTypeList(payload)
                    
                    let imsiList = result.dlDefectType

                    let imsi = imsiList.map(item => {return item.defectTypeName})
                    let sImsi1 = '|' + imsi.join('|')
                  
                    evt.sheet.setAttribute( evt.row, 'bsDefectMngId', 'Enum', sImsi1)
                    
                    let imsi2 = imsiList.map(item => {return item.bsDefectMngId})

                    
                    let sImsi2 = '|' + imsi2.join('|')
                  
                    evt.sheet.setAttribute( evt.row, 'bsDefectMngId', 'EnumKeys', sImsi2)
                    evt.sheet.refreshRow(evt.row)
                } catch (error) {
                    console.log('결함 유형 불러오기 에러: ', error)
                }
            },
            /** 공종 세부공종 결함 공종  */
            async getCateGoryData () {
                const payload = {
                    spaceTypeCode : 'P',                   // 세대결함 : H  공용결함 : P
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const result = await API.bsCheck.getSpacedefectList(payload)
                    this.dlSpaceDefectList = result.dlSpaceDefect;
                    
                    console.log("@@@@ dlSpaceDefectList: %o",this.dlSpaceDefectList);

                    const columns = this.WritePublicDefect.options.Cols
                    const options = {
                        bsCodeIdData : _.uniqBy([...result.dlSpaceDefect], 'bsSpaceMngId'),
                        //mainCodeIdData: _.uniqBy([...result.dlSpaceDefect], 'mainCodeId'),
                        //midCodeIdData: _.uniqBy([...result.dlSpaceDefect], 'midCodeId'),
                        //subCodeIdData: _.uniqBy([...result.dlSpaceDefect], 'subCodeId'),
                        //bsCodeIdData : result.dlSpaceDefect,
                        //mainCodeIdData: result.dlSpaceDefect,                        
                        //midCodeIdData: result.dlSpaceDefect,
                        //subCodeIdData: result.dlSpaceDefect,
                        seperator: '|',
                        key:'CodeId',
                        value: 'Name',
                        bs : columns.find(col => col.Name === 'bsSpaceMngId'),
                        //main: columns.find(col => col.Name === 'mainCodeId'),
                        //mid: columns.find(col => col.Name === 'midCodeId'),
                        //sub : columns.find(col => col.Name === 'subCodeId'),
                    }
                    //f(!(options.main && options.mid && options.sub)) return
                    


                    
                    options.bs.Enum = `${options.seperator}${options.bsCodeIdData.map(item => item['bsSpaceMng'.concat(options.value)]).join(options.seperator)}`
                    options.bs.EnumKeys = `${options.seperator}${options.bsCodeIdData.map(item => item['bsSpaceMngId']).join(options.seperator)}`
                    
                    //options.bs.clear = options.main.Name
                    //options.main.Related = options.bs.Name

                    
                    // options.bsCodeIdData.forEach(item =>{
                    //     options.main[`Enum${item['bsSpaceMngId']}`] = `${options.seperator}${options.mainCodeIdData.filter(bsItem=> bsItem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['main'.concat(options.value)]).join(options.seperator)}`
                    //     options.main[`EnumKeys${item['bsSpaceMngId']}`] = `${options.seperator}${options.mainCodeIdData.filter(bsItem=> bsItem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['main'.concat(options.key)]).join(options.seperator)}`                        
                    // })
                    
                    // console.log("@@@@ options.main : %o",options.main);
                    
                    // options.main.clear = options.mid.Name
                    // options.mid.Related = options.main.Name

                    // options.mainCodeIdData.forEach(item => {
                    //     options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midCodeIdData.filter(miditem=> miditem.mainCodeId === item.mainCodeId && miditem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
                    //     options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midCodeIdData.filter(miditem=> miditem.mainCodeId === item.mainCodeId && miditem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
                    // })

                    // console.log("@@@@ options.mid : %o",options.mid);

                    // options.mid.clear = options.sub.Name
                    // options.sub.Related = options.mid.Name
                    
                    // options.midCodeIdData.forEach(item => {
                    //     options.sub[`Enum${item['mid'.concat(options.key)]}`] = `${options.seperator}${options.subCodeIdData.filter(subitem=> subitem.midCodeId === item.midCodeId && subitem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['sub'.concat(options.value)]).join(options.seperator)}`
                    //     options.sub[`EnumKeys${item['mid'.concat(options.key)]}`] = `${options.seperator}${options.subCodeIdData.filter(subitem=> subitem.midCodeId === item.midCodeId && subitem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['sub'.concat(options.key)]).join(options.seperator)}`
                        
                    // })

                    //console.log("@@@@ options.sub : %o",options.sub);

                } catch (error) {
                    console.log('공종 세부공종 결함공종 조회 에러 : ', error)
                }
            },
            /**
             * 결함 내용 불러오기
             */
            async getDefectCntsMngList (evt) {
                const payload = {
                    siteMstrId : this.siteMstrId,
                    useYn : 'Y',
                }
                try {   
                    
                    const result = await API.bsCheck.getDefectCntsMngList(payload)

                    let imsiList = result.dlDefectMng

                    let imsi = imsiList.map(item => {return item.bsDefectCnts})
                    let sImsi1 = '|직접입력|' + imsi.join('|')
                    
                    evt.sheet.setAttribute(evt.row, 'bsDefectSelet', 'Enum', sImsi1)
                    
                    let imsi2 = imsiList.map(item => {return item.bsDefectCnts})
                    let sImsi2 = '|0|' + imsi2.join('|')
                    
                    evt.sheet.setAttribute(evt.row, 'bsDefectSelet', 'EnumKeys', sImsi2)
                    evt.sheet.refreshRow(evt.row)
                } catch (error) {
                    console.log('결함 유형 불러오기 에러 : ', error)
                }
            },
            /** 등록 팝업 데이터 로드후에 이벤트 처리 */
            flawGridDataLoad (evt) {
            },
            flawClickGrid (evt) {
                if(evt.col === 'bsFileConnectId'){
                    this.files = [];
                    let index = evt.row.SEQ;
                    
                    // 기입력된 파일 정보 가져오기
                    if(this.fileUpload.length > 0){
                        for(let i = 0; i < this.fileUpload.length; i++){        
                            if(this.fileUpload[i].fileIndex == index){
                                this.files.push(this.fileUpload[i])
                            }
                        }                
                    }
                    this.$bvModal.show('FileWrite')
                }
            },
            /** 결함 등록 팝업 저장버튼 */
            saveFlawData () {
                const rowData = this.itrSheet.getDataRows()
                if(rowData.length === 0) {
                    this.alert('등록할 데이터가 존재하지 않습니다.')
                    return
                } else {

                    if(!this.insert.bsInspDt) {
                        this.alert('점검 일자를 선택해주세요.')
                        return 
                    }
                    let checkSaveFlag = true;
                    for(let idx=0; idx<rowData.length; idx++) {
                        if(commonFn.methods.isEmpty(rowData[idx].bsSpaceMngId)) {
                            this.alert(idx+1+'번째의 공간을 선택해주세요.')
                            checkSaveFlag = false;
                            return
                        }
                        if(commonFn.methods.isEmpty(rowData[idx].mainCodeId)) {
                            this.alert(idx+1+'번째의 공종을 선택해주세요.')
                            checkSaveFlag = false;
                            return
                        }
                        if(commonFn.methods.isEmpty(rowData[idx].midCodeId)) {
                            this.alert(idx+1+'번째의 세부공종을 선택해주세요.')
                            checkSaveFlag = false;
                            return
                        }
                        if(commonFn.methods.isEmpty(rowData[idx].subCodeId)) {
                            this.alert(idx+1+'번째의 결함공종을 선택해주세요.')
                            checkSaveFlag = false;
                            return
                        }
                        if(commonFn.methods.isEmpty(rowData[idx].bsDefectMngId)) {
                            this.alert(idx+1+'번째의 결함유형을 선택해주세요.')
                            checkSaveFlag = false;
                            return
                        }
                        if(commonFn.methods.isEmpty(String(rowData[idx].bsDefectConts))) {
                            this.alert(idx+1+'번째의 결함내용을 선택해주세요.')
                            checkSaveFlag = false;
                            return
                        }
                    }

                    if(checkSaveFlag) {
                        let sheetData = this.itrSheet.getSaveJson({saveMode: 3})
                        sheetData.data.forEach(item => {
                            item.addIndex = item.SEQ
                            if(item.STATUS === 'Deleted'){
                                // sheet index가져오기
                                const index = item.SEQ;
                                //기존 등록파일 다 제거
                                let size = this.fileUpload.length;
                                //인덱스 변경을 위한 처리
                                let delCnt = 0; 
                                for(let j = 0; j < size; j++){                                    
                                    if(this.fileUpload.length > 0 && this.fileUpload[j-delCnt].fileIndex == index){                                                
                                        this.fileUpload.splice(j-delCnt, 1);    // 해당 file정보 제거                      
                                        delCnt++;
                                    }
                                }
                            }
                        })  
                        let payload = this.itrSheet.getSaveJson({
                            saveMode: 3
                        })
                        payload.data.forEach((item, idx) => {
                                item.status = item.STATUS
                                item.siteMstrId = this.siteMstrId
                                item.bsSpaceMngId = item.bsSpaceMngId //공간관리 ID
                                item.mainCodeId = item.mainCodeId            // 대공종
                                item.midCodeId = item.midCodeId            // 주공종
                                item.subCodeId = item.subCodeId            // 결함공종
                                item.bsDefectMngId = item.bsDefectMngId //결함관리ID
                                item.bsDefectConts = item.bsDefectConts //결함내용
                                item.bsInspDt = this.insert.bsInspDt.replaceAll('-',''), //점검일자
                                item.bsInspEmgc = item.bsInspEmgc === "1" ? "Y" : "N"
                                item.bsInspMtrl = item.bsInspMtrl === "1" ? "Y" : "N"
                                item.bsInspPop = item.bsInspPop === "1" ? "Y" : "N"
                                item.addIndex = idx+1
                                item.standDong = Number(item.standDong)
                                item.addrFloor = item.addrFloor
                        })

                        console.log("@@@@@ payload : %o",payload);

                        if(payload.Message === 'NoTargetRows') {
                            this.alert('저장할 데이터가 없습니다.')
                            return
                        } else {
                            try {
                                this.confirm('결함을 등록 하시겠습니까?', async () => {
                                    let formData = new FormData()

                                    let defectRegData =  [
                                        ...payload.data
                                    ]

                                    let defectStandData = {
                                        siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                                        bsInspDt : this.insert.bsInspDt.replaceAll('-',''), //점검일자
                                        bsInsprType : this.$session.get('userInfo').userType, //점검자유형
                                        bsInsprId : this.$session.get('userInfo').userId, //점검자ID
                                        bsInsprName : this.insert.bsInsprName, //점검자명
                                        spaceTypeCode : 'P',  // 세대옵션 type
                                    }
                                    if(this.fileUpload.length > 0){
                                        formData.append('fileIndex', JSON.stringify(this.fileUpload));
                                    }
                                    this.fileUpload.forEach((file) => formData.append("file",file));
                                    formData.append('defectStandData', JSON.stringify(defectStandData))
                                    formData.append('defectRegData', JSON.stringify(defectRegData)) 

                                    const result = await API.bsCheck.getDefectRegWrite(formData)

                                    if(result?.count > 0) {
                                        this.alert('결함 등록이 완료되었습니다.')
                                        this.$bvModal.hide('WriteDefectP')
                                        this.getBsDeffectRegMngList(this.search)
                                    } else {
                                        this.alert('결함 등록에 실패하였습니다.')
                                    }
                                })
                            } catch (error) {
                                console.log('결함 등록에 실패하였습니다.', error)
                                this.alert('결함 등록에 실패하였습니다.')
                            }
                        }
                    }
                }
            },
            /**
             * 결함 등록 팝업 세대선택 팝업 오픈
             */
            selectDongHo () {
                this.$bvModal.show('SelectDongHo')
            },
            
            /** 결함처리 팝업 오픈 */
            deFectPopUpBtn () {
                this.processDefectClear();
                this.filesProcessFlaw = [];
                const checkData = this.itpSheet.getRowsByChecked('isChecked')
                if(checkData.length === 0) return this.alert('결함을 선택해주세요')
                if(checkData[0].bsAsignType === "미배정") return this.alert('배정 되지않은 결함입니다.')
                if(String(checkData[0].tradeId) !== String(this.tradeId)) return this.alert('배정된 업체가 아니면 결함처리를 할수 없습니다.')
                if(checkData[0].bsAsignType === "배정" && checkData[0].bsPrcsDt && checkData[0].bsCnfmTypeCode === '양호') return this.alert('처리한 결함입니다.')
                if(!checkData[0].bsCnfmTypeCode && !checkData[0].bsCnfmDt) {
                    if(checkData[0].bsPrcsOrder > 0 ) {
                        this.alert(checkData[0].bsPrcsOrder +'차 확인점검이 진행되지 않았습니다.')
                        return
                    }
                }
                if(checkData[0].bsAsignType === "반환") {
                    this.alert('반환 처리된 결함처리입니다.')
                    return
                }
                
                this.processDefect.standDong = checkData[0].standDong
                this.processDefect.addrFloor = checkData[0].addrFloor
                this.processDefect.bsSpaceMngName = checkData[0].bsSpaceMngName
                this.processDefect.mainName = checkData[0].mainName
                this.processDefect.midName = checkData[0].midName
                this.processDefect.subName = checkData[0].subName
                this.processDefect.bsDefectRegMngId = checkData[0].bsDefectRegMngId
                this.processDefect.tradeId = checkData[0].tradeId
                this.processDefect.defectTypeName = checkData[0].defectTypeName
                this.processDefect.bsDefectConts = checkData[0].bsDefectConts
                this.processDefect.bsAsignDt = checkData[0].bsAsignDt
                if(!commonFn.methods.isEmpty(String(checkData[0].bsPrcsOrder))) {
                    this.processDefect.bsPrcsOrder = checkData[0].bsPrcsOrder
                }
                //console.log(this.processDefect)
                this.$bvModal.show('processDefectP')
            },
            /** 결함처리 적용 버튼 */
            defectInsertBtn () {
                this.confirm('결함 처리 하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('결함 처리에 문제가 발생하였습니다.')
                    }

                    let formData = new FormData()
                    let defectProsData = {
                        siteMstrId : this.siteMstrId,
                        bsDefectRegMngId : this.processDefect.bsDefectRegMngId,
                        tradeId : this.processDefect.tradeId,
                        standDong : this.processDefect.standDong,
                        addrFloor : this.processDefect.addrFloor,
                        bsAsignDt : this.$moment(this.processDefect.bsAsignDt).format('YYYYMMDD'),
                        bsPrcsDt : this.processDefect.bsPrcsDt.replaceAll("-", ""),
                        inUser : this.userId
                    }
                    if(!commonFn.methods.isEmpty(String(this.processDefect.bsPrcsOrder))) {
                        defectProsData['bsPrcsOrder'] = this.processDefect.bsPrcsOrder
                    }
                    this.filesProcessFlaw.forEach((file) => formData.append("file",file));
                    formData.append('defectProsData',JSON.stringify(defectProsData))
                    try {
                        const result = await API.bsCheck.getDefecProsWrite(formData)
                        if(result.count > 0) {
                            this.confirm('결함 처리 되었습니다.', ()=> {
                                this.$bvModal.hide('processDefectP')
                                this.getBsDeffectRegMngList(this.search)
                            })
                        } else {
                            this.alert('결함 처리에 문제가 발생하였습니다.')
                            this.$bvModal.hide('processDefectP')
                        }
                    } catch (error) {
                        console.log('결함 처리 등록 에러 : ', error)
                        failSave()
                    }
                })
            },
            /**
             * 확인점검 팝업 오픈 
             */
            async deFectCnfmPopUpBtn () {
                if(this.userType === 'PTNR') {
                    this.alert('확인점검을 할수 없습니다.')
                    return
                } else {
                    this.cnfmClear()
		        	this.filesConfirmFlaw = [];
                    this.fileList = [];
                    let bsDefectProsCnfmId = this.itpSheet.getFocusedRow().bsDefectProsCnfmId
                    this.cnfm.bsDefectProsCnfmId = bsDefectProsCnfmId
                    const checkData = this.itpSheet.getRowsByChecked('isChecked')
                    if(checkData.length === 0) return this.alert('결함을 선택해주세요')
                    if(checkData.length > 1) return this.alert('하나의 결함만 선택해주세요')
                    if(!checkData[0].bsPrcsDt) return this.alert('결함처리 후 확인점검하실 수 있습니다.')
                    if(checkData[0].bsPrcsDt && checkData[0].bsCnfmTypeCode === '양호') return this.alert('처리한 확인점검입니다.')
                    this.cnfm.standDong = checkData[0].standDong
                    this.cnfm.addrFloor = checkData[0].addrFloor
                    this.cnfm.bsSpaceMngName = checkData[0].bsSpaceMngName
                    this.cnfm.mainName = checkData[0].mainName
                    this.cnfm.midName = checkData[0].midName
                    this.cnfm.subName = checkData[0].subName
                    this.cnfm.defectTypeName = checkData[0].defectTypeName
                    this.cnfm.bsCnfmTypeName = checkData[0].bsCnfmTypeName
                    this.cnfm.bsPrcsDt = checkData[0].bsPrcsDt
                    this.cnfm.bsPrcsOrder = checkData[0].bsPrcsOrder
                    this.cnfm.tradeNm = checkData[0].tradeNm
                    this.cnfm.bsDefectRegMngId = checkData[0].bsDefectRegMngId
                    this.cnfm.bsDefectConts = checkData[0].bsDefectConts
                    this.cnfm.tradeId = checkData[0].tradeId
                    let payload = {
                        fileConnectId : bsDefectProsCnfmId,
                        fileType : 'BSCheck',
                        fileSubTyep : 'defectPros'
                    }
                    try {
                        const result = await API.bsCheck.loadFileInfo(payload)
                        if(result?.data){
                            this.fileList = result.data
                        }
                    } catch (error) {
                        console.error('파일 불러오기 에러 : ', error)
                    }
                    this.$bvModal.show('processConfirmP')
                }   
                
            },
            /**
             * 확인 점검 적용 버튼
             */
            cnfmInsertBtn () {
                if(commonFn.methods.isEmpty(this.cnfm.bsCnfmDt)){
                    this.alert('확인점검일자를 선택해주세요.')
                    return 
                }
                if(commonFn.methods.isEmpty(this.cnfm.bsCnfmTypeCode)){
                    this.alert('결과등급을 선택해주세요.')
                    return 
                }
                if(commonFn.methods.isEmpty(this.cnfm.bsCnfmConts)) {
                    this.alert('점검내역을 입력해주세요.')
                    return
                }
                this.confirm('확인 점검 처리 하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('확인 점검 처리에 문제가 발생하였습니다.')
                    }
                    let formData1 = new FormData()
                    let defectCnfmData = {
                        siteMstrId : this.$store.getters['auth/getSiteMstrId'],
                        bsCnfmTypeCode : this.cnfm.bsCnfmTypeCode,
                        bsCnfmConts : this.cnfm.bsCnfmConts,
                        bsDefectRegMngId : this.cnfm.bsDefectRegMngId,
                        bsCnfmDt : this.cnfm.bsCnfmDt.replaceAll("-",""),
                        bsPrcsOrder : this.cnfm.bsPrcsOrder,
                        bsDefectProsCnfmId : this.cnfm.bsDefectProsCnfmId,
                    }
                    this.filesConfirmFlaw.forEach((file) => formData1.append("file",file));
                    formData1.append('defectCnfmData',JSON.stringify(defectCnfmData))

                    try {
                        const result = await API.bsCheck.getDefectCnfmWrite(formData1)
                        if(result.count > 0) {
                            this.confirm('확인 점검 처리 되었습니다.', ()=> {
                                if(this.cnfm.bsCnfmTypeCode !== '1') {
                                    this.sendSms(this.cnfm.tradeId, 'cnfm')
                                } else {
                                    this.$bvModal.hide('processConfirmP')
                                    this.getBsDeffectRegMngList(this.search)
                                }
                            })
                        } else {
                            this.alert('확인 점검 처리에 문제가 발생하였습니다.')
                            this.$bvModal.hide('processConfirmP')
                        }
                    } catch (error) {
                        console.log('확인 점검 처리 에러 : ', error)
                        failSave()
                    }
                })
            },
            /** 결함 삭제 */
            deleteBtn () {
                const checkData = this.itpSheet.getRowsByChecked('isChecked')[0]
                if(!checkData){
                    this.alert('결함을 선택해주세요.')
                    return
                } else {
                    if(checkData.bsPrcsDt){
                        this.alert('이미 처리된 결함은 삭제 하실수 없습니다.')
                        return
                    }
                    this.confirm('삭제하시겠습니까?', async () => {
                        const payload = {
                            siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                            bsDefectRegMngId : checkData.bsDefectRegMngId
                        }
                        try {
                            const result = await API.bsCheck.setDefectRegUnUsed(payload)
                            if(result?.count > 0) {
                                this.alert('삭제가 완료되었습니다.', async() => {
                                    this.getBsDeffectRegMngList(this.search)
                                })
                                
                            } else {
                                this.alert('삭제처리에 문제가 발생하였습니다.', async()=> {
                                    this.getBsDeffectRegMngList(this.search)
                                })
                            }
                        } catch (error) {
                            console.log('세대 결함 삭제 에러 : ', error)
                            this.alert('삭제처리에 문제가 발생하였습니다.')
                        }
                    })
                }
            },
            /** 반환 처리 */
            defectChangeBtn() {
                //반환시 해당 업체만 반환처리 될수있도록 진행?
                const checkData = this.itpSheet.getRowsByChecked('isChecked')[0]
                if(!checkData) {
                    this.alert('결함을 선택해주세요.')
                    return
                } else {
                    if(this.userType === 'PTNR') {
                        if(String(checkData.tradeId) !== String(this.tradeId)) {
                            this.alert('배정된 업체만 반환 하실수 있습니다.')
                            return
                        }
                    }
                    if(checkData.bsPrcsDt && checkData.bsPrcsOrder){
                        this.alert('이미 처리된 결함은 반환 하실수 없습니다.')
                        return
                    } else if(checkData.bsAsignType === 'R' || checkData.bsAsignType === '' || checkData.bsAsignType === '미배정'){
                        this.alert('미배정 결함은 반환 하실수 없습니다.')
                        return
                    } else {
                        this.confirm('반환 하시겠습니까?', async () => {
                            const payload = {
                                bsAsignType : 'R',
                                siteMstrId : this.siteMstrId, //현장 정보 ID
                                bsDefectRegMngId : checkData.bsDefectRegMngId
                            }
                            try {
                                const result = await API.bsCheck.setDefectPtnrChange(payload)
                                if(result.count > 0) {
                                    
                                    this.alert('반환이 완료되었습니다.',()=>{this.sendSms(checkData.bsInsprId, 'change')})
                                } else {
                                    this.alert('반환 처리에 문제가 발생하였습니다.')
                                    this.getBsDeffectRegMngList(this.search)
                                }
                            } catch (error) {
                                console.log('반환 처리 에러 : ',error)
                                this.alert('반환 처리에 문제가 발생하였습니다.')
                            }
                        })
                    }     
                }   
            },
            /** 결함 처리 */
            async flawProcessDetailClickGrid (evt) {
                //배정상태이면서, 확검일이 없을때 itpdSheet
                //혹은 확검일이 있는데 양호 상태가 아닐때 >> 이후 재 결함처리시 처리차수 가 ++ 되면서 결과등급 및 확검일이 클리어
                if(evt.col === 'bsDfpsFileConnectId') {
                    if(evt.row.bsDfpsFileConnectId === 1) {
                        const payload = {
                            fileConnectId : evt.row.bsDefectProsCnfmId,
                            fileType : 'BSCheck',
                            fileSubType : 'defectPros'
                        }
                        try {
                            const result = await API.bsCheck.loadFileInfo(payload)
                            if(result?.data){
                                this.lstFileRstDetail = result.data.filter(item => item.fileOrder = evt.row.SEQ)
                                this.$bvModal.show('FileProcessDetail')
                            }
                        } catch (error) {
                            console.error('파일 불러오기 에러 : ', error)
                        }
                    } else {
                        return
                    }
                }
            },
            /** 파일 업로드 */
            saveFile() {
                let index = this.itrSheet.getFocusedRow().SEQ;
                for(var i = 0; i < this.files.length; i++){          
                        this.files[i].fileIndex = index;     
                        // this.files[i].fileIndex = 0;     
                }

                if(this.fileUpload.length > 0){
                    
                    //기존 등록파일 다 제거
                    let size = this.fileUpload.length;                 
                    //인덱스 변경을 위한 처리
                    let delCnt = 0; 
                    for(let j = 0; j < size; j++){                                    
                        if(this.fileUpload.length > 0 && this.fileUpload[j-delCnt].fileIndex == index){                                                
                            this.fileUpload.splice(j-delCnt, 1);    // 해당 file정보 제거                      
                            delCnt++;
                        }
                    }

                    // 등록된 파일정보가 있는 경우
                    if(this.files.length > 0){
                        for(let j = 0; j < this.files.length; j++){
                            this.fileUpload.push(this.files[j]);
                        }
                    }
                    this.$bvModal.hide('FileWrite')
                }else{
                    // 최초 파일정보가 입력된 경우
                    Object.assign(this.fileUpload,this.files);
                    this.$bvModal.hide('FileWrite')
                }
            },
            saveFileClose () {
                this.$bvModal.hide('FileWrite')
            },
            
            /** 확인 점검 */
            async flawConfirmDetailClickGrid (evt) {
                if(evt.col === 'bsDfcfFileConnectId') {
                    if(evt.row.bsDfcfFileConnectId === 1) {
                        const payload = {
                            fileConnectId : evt.row.bsDefectProsCnfmId,
                            fileType : 'BSCheck',
                            fileSubType : 'defectCnfm'
                        }
                        try {
                            const result = await API.bsCheck.loadFileInfo(payload)
                            if(result?.data){
                                this.lstFileRstDetail = result.data.filter(item => item.fileOrder = evt.row.SEQ)
                                this.$bvModal.show('FileConfirmDetail')
                            }
                        } catch (error) {
                            console.error('파일 불러오기 에러 : ', error)
                        }
                    } else {
                        return
                    }
                    
                }
            },
            /** 결함 상세 팝업 사진 보기 버튼 */
            async bsFlawDetailPhoto () {
                //alert(this.itpSheet.getFocusedRow().bsDefectRegMngId)
                const payload = {
                    fileConnectId : this.itpSheet.getFocusedRow().bsDefectRegMngId,
                    fileType : 'BSCheck',
                    fileSubType : 'defectReg'
                }
                try {
                    const result = await API.bsCheck.loadFileInfo(payload)
                    if(result?.data){
                        this.lstFileRstDetail = result.data
                        this.$bvModal.show('FileDetail')
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },
            /** 파일 보기 팝업 닫기 이벤트 */
            detailClose () {
                this.lstFileRstDetail = []
                this.$bvModal.hide('FileDetail')
            },
            detailProcessClose () {
                this.lstFileRstDetail = []
                this.$bvModal.hide('FileProcessDetail')
            },
            detailConfirmClose () {
                this.lstFileRstDetail = []
                this.$bvModal.hide('FileConfirmDetail')
            },
            /** 결함처리 사진등록 버튼 */
            bsFlawPcPtInsertBtn () {
                this.$bvModal.show('FileWrite2')
            },
            /** 결함처리 사진등록 팝업 등록 버튼 */
            saveFileProcessFlaw () {
                if(this.filesProcessFlaw.length > 0){
                    this.bsFlawPcptPhoto = '등록'
                } else {
                    this.bsFlawPcptPhoto = '미등록'
                }
                this.$bvModal.hide('FileWrite2')
            },
            /** 결함처리 사진등록 팝업 닫기 버튼 */
            saveFileProcessFlawClose () {
                if(this.filesProcessFlaw.length > 0){
                    this.bsFlawPcptPhoto = '등록'
                } else {
                    this.filesProcessFlaw = []
                    this.bsFlawPcptPhoto = '미등록'
                }
                this.$bvModal.hide('FileWrite2')
            },
            /** 확인점검 사진등록 버튼 */
            bsFlawCfptInsertBtn () {
                this.$bvModal.show('FileWrite3')
            },
            /** 확인점검 사진팝업 등록버튼 */
            saveFileConfirmFlaw () {
                if(this.filesConfirmFlaw.length > 0) {
                    this.bsFlawCfptPhoto = '등록'
                } else {
                    this.filesConfirmFlaw = []
                    this.bsFlawCfptPhoto = '미등록'
                }
                this.$bvModal.hide('FileWrite3')
            },
            /** 확인점검 사진팝업 닫기버튼 */
            saveFileConfirmFlawClose () {
                if(this.filesConfirmFlaw.length > 0){
                    this.bsFlawCfptPhoto = '등록'
                } else {
                    this.filesConfirmFlaw = []
                    this.bsFlawCfptPhoto = '미등록'
                }
                this.$bvModal.hide('FileWrite3')
            },
            /** 기타 전체 선택 */
            allCheck(event) {
                if(event.target.checked) {
                    this.search.bsInspEmgc = false;
                    this.search.bsInspMtrl = false;
                    this.search.bsInspPop = false;
                    this.search.all = true;
                }
            },
            /**기타 개별 선택 */
            checkChange(event) {
                if(event.target.checked) {
                    this.search.all = false;
                }
            },
            //evt
            fn_inputCheck(evt){
                if(1000 >= evt.target.value.length){
                    this.cnfm.bsCnfmConts = evt.target.value;
                }
            },
            download(fileInfo) {
                if(this.checkUser(this.userId, 'down')) {
                    let fileId = fileInfo[0].fileChkBsArcvId
                    let orgFileName = fileInfo[0].orgFileName

                    const url = '/sendApi/api/file/singleFileDownload/'
                    let payload = {
                        fileId : fileId
                    }

                    axios.post(url, payload, {
                        headers: {
                            'Accept-Language': 'ko',
                            'Authorization': this.$cookies.get("Authorization"),
                        },
                        responseType: 'blob'
                    }).then(response => {
                        if (response.status === 200 ) {
                            const blob = new Blob([response.data])
                            const fileName = orgFileName
        
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
                        } else {
                            throw new Error('fileSingleDownload')
                        }
                        
                    }).catch(() => {
                        // console.error('error ?: %o', error)
                        this.alert('다운로드에 실패했습니다.')
                        // throw new Error(error)
                    })

                    // if(!commonFn.methods.isEmpty(fileId)){
                        

                    //     let btn = document.createElement('a');
                    //     btn.setAttribute('href', url+fileId);
                    //     btn.setAttribute('download',orgFileName);
                    //     btn.click();
                    //     console.log(btn)
                    // } else {
                    //     return false;
                    // }
                }
                
            },
            onClose(modalVal) {
                                
                if(modalVal === 'WriteDefectP') {
                    
                    let rows = this.itpSheet.getDataRows();

                    if(rows.length > 0) {
                        this.confirm('작성중인 내용이 있습니다. 취소하시겠습니까?', ()=>{
                            this.$bvModal.hide('WriteDefectP');
                        })
                    }else{
                        this.$bvModal.hide('WriteDefectP');
                    }
                } else if(modalVal === 'processConfirmP') {
                    if(this.cnfm.bsCnfmConts.length > 0) {
                        this.confirm('작성중인 내용이 있습니다. 취소하시겠습니까?', ()=>{
                            this.$bvModal.hide('processConfirmP');
                        })
                    } else {
                        this.confirm('취소하시겠습니까?', ()=>{
                            this.$bvModal.hide('processConfirmP');
                        })
                    }
                }
            },
            async sendSms(pTradeId, type) {
                const options = {
                    headers : {
                        'Authorization': this.siteMstrId,
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    },
                }

                let tId = pTradeId;
                let msgCode = '';

                if(type === 'change') {
                    //반환
                    msgCode = 'A063'
                    let url = '/sendApi/api/messageMngt/message/send';
                    let msgParam = {
                        messageCode : msgCode, // sqms_알림리스트 2.알림리스트 시트 알림번호 
                        userId : this.userId,
                        projectId : this.projectId,
                        reciveUserId  : tId,
                        //docSeq :this.docSeq,
                    }
                    axios.post(url, msgParam, options).then(result => {
                        if(result.status === 200) {
                            this.getBsDeffectRegMngList(this.search)
                        } else {
                            throw new Error('알림 발송 실패')
                        }
                    })
                    .catch(error => {
                        this.alert('발송에 실패했습니다.')
                        console.error(error)
                    })
                } else if(type === 'cnfm') {
                    //확인점검 불합격
                    msgCode = 'A066'
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
                                        //docSeq :this.docSeq,
                                    }
                                    axios.post(url, msgParam, options).then(result => {
                                        if(result.status === 200) {
                                            this.$bvModal.hide('processConfirmP')
                                            this.getBsDeffectRegMngList(this.search)
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
                        console.log('발송에 실패했습니다.')
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
                this.excelDownload.fileName  = `공용결함_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true

                // sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `공용결함_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },

        }
    }
</script>