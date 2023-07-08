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
                        <th>동/호수</th>
                        <td>
                            <select v-model="search.standDong" class="form_control" style="width: 78px;">
                                <option :value="null">전체</option>
                                <option 
                                    v-for="option in dongList"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                {{ option.label }}
                                </option>
                            </select>
                            <select v-model="search.addrHo" class="form_control ml10" style="width: 78px;">
                                <option :value="''">전체</option>
                                <option 
                                    v-for="option in addrHoList"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                {{ option.label }}
                                </option>
                            </select>
                            <!-- <input type="text" class="form_control ml10" style="width: 78px;" v-model="search.addrHo" placeholder="입력해주세요"> -->
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
                                    {{ option.label}}
                                    </option>
                                </select>
                                <select v-model="search.mainCodeId" class="form_control ml10">
                                    <option value="" > 전체 </option>
                                    <option 
                                        v-for="mainData in  siteMainData"  
                                        :key="mainData.mainCodeId" 
                                        :value="mainData.mainCodeId"
                                    >   
                                        {{ mainData.mainName }} 
                                    </option>
                                </select>
                                <select v-model="search.midCodeId" class="form_control ml10">
                                    <option value="" > 전체 </option>
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
                                <input type="radio" class="form_control" name="bsAsignYnHouse" value="" v-model="search.bsAsignType">
                                <span class="label_text">전체</span>
                            </label>
                            <label for="" class="input_radio">
                                <input type="radio" class="form_control" name="bsAsignYnHouse" value="A" v-model="search.bsAsignType">
                                <span class="label_text">배정</span>
                            </label>
                            <label for="" class="input_radio">
                                <input type="radio" class="form_control" name="bsAsignYnHouse" value="N" v-model="search.bsAsignType">
                                <span class="label_text">미배정</span>
                            </label>
                            <label for="" class="input_radio">
                                <input type="radio" class="form_control" name="bsAsignYnHouse" value="R" v-model="search.bsAsignType">
                                <span class="label_text">반환</span>
                            </label>
                        </td>
                        <th>협력업체</th>
                        <td>
                            <input type="text" class="form_control size_md" v-model="search.tradeNm" placeholder="입력해주세요">
                        </td>
                        <th>결함내용</th>
                        <td colspan="3"><input type="text" class="form_control w100" v-model="search.bsDefectConts" placeholder="입력해주세요"></td>
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
                            <label class="input_check ml20">
                                <input type="checkbox" class="form_control" id="chkBox0" v-model="search.all" @click="allCheck($event)">
                                <span class="label_text">전체</span>
                            </label>
                            <label class="input_check ml20">
                                <input type="checkbox" class="form_control" id="chkBox1" v-model="search.bsInspEmgc" @click="checkChange($event)">
                                <span class="label_text">긴급</span>
                            </label>
                            <label class="input_check ml20">
                                <input type="checkbox" class="form_control" id="chkBox2" v-model="search.bsInspMtrl" @click="checkChange($event)">
                                <span class="label_text">자재</span>
                            </label>
                            <label class="input_check ml20">
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
                <div class="table_normal_list">
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
                                <th>결함건수 (세대당)</th>
                                <th>처리건수</th>
                                <th>결함처리율</th>
                                <th>확인점검건수</th>
                                <th>확인점검률</th>
                                <th>잔여건수</th>
                                <th>잔여건수 (세대당)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ bsTotlCnt }} 건</td>
                                <td>{{ hoCnfmCnt }} 건</td>
                                <td>{{ bsPrcsCnt }} 건</td>
                                <td>{{ bsPrcsRate }} % </td>
                                <td>{{ bsCnfmCnt }} 건 </td>
                                <td>{{ bsCnfmRate }} % </td>
                                <td>{{ bsRemnCnt }} 건</td>
                                <td>{{ hoRemnCnt }} 건</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="button_box">
                    <strong class="txt_lg">결함목록 ( {{ count6 }} 건)</strong>
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(sheet)">엑셀 다운로드</button>
                    <div class="fr">                      
                        <button type="button" class="btn btn_sm btn_darkgray" @click="deleteBtn" v-if="checkUser(userId, 'unuse')">삭제</button>
                        <button type="button" class="btn btn_sm btn_darkgray" @click="defectChangeBtn" v-if="checkUser(userId, 'change')">반환</button>
                        <button type="button" class="btn btn_sm btn_darkblue" @click="insertBtn" v-if="checkUser(userId, 'write') ">결함등록</button>
                        <button type="button" class="btn btn_sm btn_darkblue" @click="deFectPopUpBtn" v-if="checkUser(userId, 'change') && tradeType === 'C'">결함처리</button>
                        <button type="button" class="btn btn_sm btn_darkblue" @click="deFectCnfmPopUpBtn" v-if="checkUser(userId, 'change') && tradeType !== 'C'">확인점검</button>
                    </div>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" :style="{height: 'calc(100vh - 500px)'}">
                    <div id="bsCheckDeffectSheet" class="ibsheet_table" style="height: 100%;" ></div><!-- {height: 'calc(100vh - 350px)'} -->
                </div>
            </div>
        </div>

        <!-- 세대결함 등록 팝업 -->
        <b-modal id="WriteDefect" title="세대결함 등록" hide-backdrop size="xl" @shown="popSheet">
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
                        <strong>2. 단일/다수 등록선택</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="175">
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th>등록선택</th>
                                    <td>
                                        <label class="input_radio">
                                            <input type="radio" id="rdoSolar1" name="selectType" v-model="selectType" value="S" checked>
                                            <span class="label_text">단일 세대</span>
                                        </label>
                                        <label class="input_radio">
                                            <input type="radio" id="rdoSolar2" name="selectType" v-model="selectType" value="M">
                                            <span class="label_text">다수 세대</span>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>3. 대상 세대</strong>
                    </div>
                    <div class="table_normal_list">
                        <table v-if="selectType === 'S'">
                            <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="175">
                                    <col width="*">
                                    <col width="175">
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">동</span></th>
                                    <td>
                                        <select v-model="insert.standDong" class="form_control">
                                            <option :value="''">전체</option>
                                            <option 
                                                v-for="option in dongList"
                                                :key="option.value"
                                                :value="option.value"
                                            >
                                            {{ option.label }}
                                            </option>
                                        </select>
                                    </td>
                                    <th><span class="emp_red">호</span></th>
                                    <td>
                                        <div class="btn_wrap" style="padding-right:110px">
                                            <select v-model="insert.addrHo" class="form_control">
                                                <option :value="''">전체</option>
                                                <option 
                                                    v-for="option in addrHoList"
                                                    :key="option.value"
                                                    :value="option.value"
                                                >
                                                {{ option.label }}
                                                </option>
                                            </select>
                                            <!-- <input type="text" v-model="insert.addrHo" class="form_control" placeholder="입력해주세요"> -->
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="houseOptnView">세대옵션 보기</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table v-if="selectType === 'M'">
                            <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="175">
                                    <col width="*">
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th>선택 세대 수</th>
                                    <td style="border-right:0">
                                        {{ dongHosu.cnt }}세대
                                    </td>
                                    <td class="ar">
                                         <button type="button" class="btn btn_sm btn_darkgray" @click="selectDongHo">세대 선택</button>
                                         <button type="button" class="btn btn_sm btn_gray" @click="dongHosuClear">선택세대 초기화</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>4. 결함 등록</strong>
                        <div class="fr">
                            <!-- <button type="button" class="btn btn_sm btn_excel">Excel Export</button>-->
                            <!-- <button type="button" class="btn btn_sm btn_excel">엑셀 업로드</button> -->
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
                    <div class="ib_wrap">
                        <div id="popSheetTable" class="ibsheet_table" :style="{'height':'230px'}"></div><!-- {height: 'calc(100vh - 350px)'} -->
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="checkUser(userId, 'write')" @click="saveFlawData"><!-- @click="ok" -->등록</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 세대결함 상세보기 팝업 -->
        <b-modal id="DetailDefect" title="세대결함 상세보기" hide-backdrop size="xl" >
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
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th>동</th>
                                    <td>
                                        {{ bsDetail.standDong }}
                                    </td>
                                    <th>호</th>
                                    <td style="border-right:0;">
                                        {{ bsDetail.addrHo }}
                                    </td>
                                    <td class="ar">
                                        <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="dtlHsPopUpBtn">세대옵션 보기</button>
                                    </td>
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
                                            <input type="checkbox" id="chkbox1" :checked="bsDetail.bsInspEmgc == 'Y'? true : false" disabled>
                                            <!-- v-model="bsDetail.bsInspEmgc" -->
                                            <!--   -->
                                            <span class="label_text">긴급</span>
                                        </label>
                                        <label class="input_check">
                                            <input type="checkbox" id="chkbox1" :checked="bsDetail.bsInspMtrl == 'Y'? true : false" disabled>
                                            <span class="label_text">자재</span>
                                        </label>
                                        <label class="input_check">
                                            <input type="checkbox" id="chkbox1" :checked="bsDetail.bsInspPop == 'Y'? true : false" disabled>
                                            <span class="label_text">POP</span>
                                        </label>
                                    </td>
                                    <td><button type='button' class='btn_view' @click="bsFlawDetailPhoto">보기</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>4. 결함처리</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <!-- <div class="ib_wrap">
                            <div id="bsFlawDetailProcessSheet" class="ibsheet_table" :style="{'height':'250px'}"></div>
                        </div> -->
                        <sqms-grid
                            id="bsFlawDetailProcessSheet"
                            :columns="flawProcessDetailColumns"
                            :data="flawProcessDetailGridData"
                            :inputStyle="{'height':'250px'}"
                            @init="flawProcessDetailInitSheet"
                            :cfg="{
                                NoVScroll: false,
                                NoDataMessage : 3,
                            }"
                            @click="flawProcessDetailClickGrid"
                            ref="bsFlawDetailProcessSheetRef"
                        >
                        </sqms-grid>
                    </div>

                    <div class="button_box">
                        <strong>5. 확인점검</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <!-- <div class="ib_wrap">
                            <div id="bsFlawDetailConfirmSheet" class="ibsheet_table" :style="{'height':'250px'}"></div>
                        </div> -->
                        <sqms-grid
                            id="bsFlawDetailConfirmSheet"
                            :columns="flawConfirmDetailColumns"
                            :data="flawConfirmDetailGridData"
                            :inputStyle="{'height':'250px'}"
                            @init="flawConfirmDetailInitSheet"
                            :cfg="{
                                NoVScroll: false,
                                NoDataMessage : 3,
                            }"
                            @click="flawConfirmDetailClickGrid"
                            ref="bsFlawDetailConfirmSheetRef"
                        >
                        </sqms-grid>
                    </div>
                </div>
            </template>
            <template #modal-footer> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="closeBtn">닫기</b-button>
            </template>
        </b-modal>

        <!-- 동/호수 선택 팝업 -->
        <b-modal id="SelectDongHo" title="동/호수 선택" 
            modal-class="single_page" size="xlg" @shown="dongHosuPop"
        >
            <template #default>
                <div class="pop_container">
                    <div class="tab_contents">
                            <div class="write_box" style="max-width: 892px;">
                                <div>
                                    <div class="ib_wrap mt15" style="display: inline-block; width: 200px;">
                                        <!-- ibsheet -->
                                        <!-- <div class="ib_wrap">
                                            <div id="dongHosuSheet" class="ibsheet_table" :style="{'height':'250px'}"></div>
                                        </div> -->
                                        <sqms-grid
                                            id="dongHosuSheet"
                                            :columns="dongHosuColumns"
                                            :data="dongHosuGridData"
                                            @init="dongHosuInitSheet"
                                            :inputStyle="{'height' : 'auto'}"
                                            :cfg="{
                                                NoVScroll: false,
                                                NoDataMessage : 3,
                                            }"
                                            @click="dongHosuClickGrid"
                                            ref="dongHosuSheetRef"
                                        >
                                        </sqms-grid>
                                    </div>
                                    <div class="table_normal_list fixedContainer" style="max-height:470px">
                                        <table ref="stdtable">
                                            <thead>
                                                <tr>
                                                    <template v-for="(item) in stdHo">
                                                        <!-- eslint-disable-next-line -->
                                                        <th>
                                                            <label class="input_check pop_notext" @change="selectHoChk(item)">
                                                            <input type="checkbox" v-model="item.checked" :disabled="item.disabled">
                                                                <span class="label_text" />
                                                            </label>
                                                        </th>
                                                        <!-- eslint-disable-next-line -->
                                                        <th>{{`${item.standHo}호`}}</th>
                                                    </template>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item,index) in addrFr" :key="index">
                                                    <!-- eslint-disable-next-line -->
                                                    <template v-for="(inItem) in item">
                                                        <!-- eslint-disable-next-line -->
                                                        <td>
                                                            <label class="input_check pop_notext">
                                                                    <!-- :value="inItem.checked" -->
                                                                <input 
                                                                    v-model="inItem.checked"
                                                                    type="checkbox"
                                                                    :disabled="Object.keys(inItem).length === 0  || inItem.disabled"
                                                                    @change="fn_click(inItem)"
                                                                />
                                                                <span class="label_text" />
                                                            </label>
                                                        </td>
                                                        <!-- eslint-disable-next-line -->
                                                        <td>{{inItem.addrHo ? Number(inItem.addrHo)+'호' : ''}}</td>
                                                    </template>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                           
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide }" -->
                <b-button class="btn btn_lg btn_outline btn_darkgray" @click="saveDongHosu(addrFr)">선택</b-button>
                <b-button class="btn btn_lg btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 세대옵션 정보 팝업 -->
        <b-modal id="BsCheckHoldOption" title="세대옵션 정보"
            hide-backdrop size="lg" @shown="houseOptInfo"
        >
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong class="fl txt_md">1. 세대정보</strong>
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="qrPrint">QR코드</button>
                        </div>
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
                                    <th>호수</th>
                                    <th>평형정보</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ detail.standDong  }}</td>
                                    <td>{{ detail.addrHo }}</td>
                                    <td>{{ detail.noSize }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong class="txt_md">2. 세대옵션 품목</strong>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap">
                        <div id="houseDefectTable" class="ibsheet_table" :style="{'height':'250px'}"></div>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> 
                <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">확인</b-button> -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>
        

        <!-- 결함처리 팝업 -->
        <b-modal id="processDefect" title="결함처리"
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
                                    <th>호수</th>
                                    <th>공간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ processDefect.standDong }}</td>
                                    <td>{{ processDefect.addrHo }}</td>
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
                                        <Datepicker ref="datepickerProCessDefectRange" v-model="processDefect.bsPrcsDt"/>
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
        <b-modal id="processConfirm" title="확인점검"
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
                                    <th>호수</th>
                                    <th>공간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ cnfm.standDong }}</td>
                                    <td>{{ cnfm.addrHo }}</td>
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
                                    <td>{{ cnfm.bsCnfmTypeName }}</td>
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
                                    <td>
                                        {{ cnfm.bsPrcsDt }}
                                    </td>
                                    <th><span class="">처리차수</span></th>
                                    <td>
                                        {{ cnfm.bsPrcsOrder }}
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="">협력업체</span></th>
                                    <td colspan="3">
                                        {{ cnfm.tradeNm }}
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="">관련사진</span></th>
                                    <!-- <td colspan="3">
                                        <ul 
                                            v-for="(list, index) in fileList"
                                            :key="index"
                                        >
                                         <li>{{ list.orgFileName }}</li>
                                        </ul>
                                    </td>    -->
                                    <td colspan="3" class="">
                                        {{ bsFlawPcptPhoto }}
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
                                            <input type="radio" id="rdoSolar1" name="birthday_type2" v-model="cnfm.bsCnfmTypeCode" value="1" checked>
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
                                        <textarea class="form_control" v-model="cnfm.bsCnfmConts"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span class="">관련사진</span></th>
                                    <td class="" style="border-right:0">
                                        {{ bsFlawCfptPhoto }}
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn btn_sm btn_darkgray" @click="bsFlawCfptInsertBtn">사진 등록</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> 
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="cnfmInsertBtn">적용</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>
        <b-modal
            id="FileWriteH"
            title="관련 사진 등록" 
            hide-backdrop
            size="lg"
            static
        >
            <template #default>
                <div class="pop_container">
                <LstImg
                    :files="tmpFile"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    :limit-file-size="1024*1024*1024*3"
                    :file-type="'FileWriteHPopupQltyPicturePop'"
                    :copyable="false"
                />
                    <!-- :limit-file-count="100" -->
                <!-- <LstImg
                    :files="tmpFile"
                    :copied-file-ids="tmpCopiedFileIds"
				    :copied-files="tmpCopiedFiles"
                    @file-changed="(payload) => {tmpFile = payload.file;}"
                    @copied-file-changed="(payload) => {tmpCopiedFileIds = payload.copyIds; tmpCopiedFiles = payload.copy;}"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    :limit-file-size="1024*1024*1024*3"
                    :limit-file-count="100"
                    :file-type="'FileWriteHPopupQltyPicturePop'"
                    :set-style="'margin: 0 5px 5px 0;'"
                /> -->
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
            id="FileWriteH2"
            title="결함처리 관련 사진 등록" 
            hide-backdrop
            size="lg"
            static
        >
            <template #default>
                <div class="pop_container">
                <LstImg
                    :files="tmpFile"
                    @file-changed="(payload) => {tmpFile = payload.file, copiedFileIds = payload.copyIds}"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    :limit-file-size="1024*1024*1024*3"
                    :file-type="'FileWriteH2PopupQltyPicturePop'"
                    :copyable="false"
                />
                    <!-- :limit-file-count="100" -->
                <!-- <LstImg
                    :files="tmpFile"
                    :copied-file-ids="tmpCopiedFileIds"
				    :copied-files="tmpCopiedFiles"
                    @file-changed="(payload) => {tmpFile = payload.file;}"
                    @copied-file-changed="(payload) => {copiedFileIds = payload.copyIds; copiedFiles = payload.copy;}"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    :limit-file-size="1024*1024*1024*3"
                    :limit-file-count="100"
                    :file-type="'FileWriteH2PopupQltyPicturePop'"
                    :set-style="'margin: 0 5px 5px 0;'"
                /> -->
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
            id="FileWriteH3"
            title="확인점검 관련 사진 등록" 
            hide-backdrop
            size="lg"
            static
        >
            <template #default>
                <div class="pop_container">
                <LstImg
                    :files="tmpFile"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    @file-changed="(payload) => {tmpFile = payload.file, copiedFileIds = payload.copyIds}"
                    :limit-file-size="1024*1024*1024*3"
                    :uploadable="true"
                    :file-type="'FileWriteH3PopupQltyPicturePop'"
                    :copyable="false"
                />
                    <!-- :limit-file-count="100" -->

                <!-- <LstImg
                    :files="tmpFile"
                    :copied-file-ids="tmpCopiedFileIds"
				    :copied-files="tmpCopiedFiles"
                    :except-extn="['xlsx', 'pptx', 'hwp', 'zip', 'pdf', 'exe']"
                    :accept-extn="['jpeg', 'jpg', 'png']"
                    @file-changed="(payload) => {tmpFile = payload.file;}"
                    @copied-file-changed="(payload) => {copiedFileIds = payload.copyIds; copiedFiles = payload.copy;}"
                    :limit-file-size="1024*1024*1024*3"
                    :limit-file-count="100"
                    :uploadable="true"
                    :file-type="'FileWriteH3PopupQltyPicturePop'"
                    :set-style="'margin: 0 5px 5px 0;'"
                /> -->
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
            static
        >
            <template #default>
                <div class="pop_container">
                <LstImg
                    :downloadable="true"
                    :uploadable="false"
                    :copyable="false"
                    :lst-file-rst="lstFileRstDetail"
                    :file-type="'FileDetailQltyPicturePop'"
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
            static
        >
            <template #default>
                <div class="pop_container">
                <LstImg
                    :downloadable="true"
                    :uploadable="false"
                    :copyable="false"
                    :lst-file-rst="lstFileRstDetail"
                    :file-type="'FileProcessDetailQltyPicturePop'"
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
            static
        >
            <template #default>
                <div class="pop_container">
                <LstImg
                    :downloadable="true"
                    :uploadable="false"
                    :copyable="false"
                    :lst-file-rst="lstFileRstDetail"
                    :file-type="'FileConfirmDetailQltyPicturePop'"
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
            ref-id="BsCheckHouseDeffectSheet_ExcelDownload"
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
    import { sendPostApi, requestOptions } from '@/apis/common';
    import { InspectionBsList7 } from '@/pages/common/data/InspectionBsList'
    import { WriteDefect, PartnerWork, DetailDefect, ProcessDefect, ConfirmDefect } from '@/pages/common/data/PopupList'
    import { PrdtOptions } from '@/pages/common/data/PopupList'
    import TreeCategoryTab from "@/pages/quality/testMngt/component/TreeCategoryTab";
    import { commonFn } from '@/script/commonFn.js';
    import _ from 'lodash'
    import LstImg from '@/pages/common/popup/LstImg';
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import loader from '@ibsheet/loader'
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    export default {
        name: 'BsCheckHouseDeffectSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            Breadcrumb,
            TreeCategoryTab,
            Datepicker,
            DatePickerRange,
            LstImg,
            ExcelDownload,
        },
        data: () => ({
            currentTab: 0, // 기본 current 값 지정 
            tabs:  ['세대결함'], // tab name
            userId : '',
            unuse : false,
            write : false,
            selectRow : '',
            lstFileRstDetail : [],
            files : [],
            fileUpload : {},  // 상세
            fileIdex : 0,
            tmpFile : [],
            tmpCopiedFileIds:[],
            tmpCopiedFiles:[],
            copiedFileIds:[],
            copiedFiles:[],
            filesProcessFlaw : [],  // 결함처리
            filesConfirmFlaw : [],  // 확인점검
            bsFlawPcptPhoto : '미등록',
            bsFlawCfptPhoto : '미등록',
            columns : [],
            gridData : [],
            dongHosuColumns : [],
            dongHosuGridData : [],
            sheet : null,
            detailSheet : null,
            flawSheet : null,
            dongHosuSheet : null,
            flawProcessDetailColumns : [],
            flawProcessDetailGridData : [],
            flawProcessDetailSheet : null,
            flawConfirmDetailColumns : [],
            flawConfirmDetailGridData : [],
            flawConfirmDetailSheet : null,
            flawAddRowData : { bsSpaceMngId: '', mainCodeId: '', midCodeId: '', subCodeId: '', bsDefectMngId: '', bsDefectSelet: '', bsDefectConts: '', bsInspEmgc: '', bsInspMtrl: '', bsInspPop: '', bsFileConnectId : '1'},
            
            // 콤보박스 데이터
            siteSpaceData : [],         // 공간 데이터
            siteMainData : [],          // 공종 데이터
            siteMidData : [],           // 세부공종 데이터
            siteSubData : [],           // 결함공종 데이터
            categoryData: [],           // 결함유형 데이터

            siteDefectData: [],         // 현장 등록가능 BS점검 정보

            dongList : [],
            bsCnfmTypeList : [],
            spaceTypeList : [],
            spacedefectCntList : [],
            bsTotlCnt : '',  // 총 결함건수
            hoCnfmCnt : '',  // 결함건수(세대당)
            bsPrcsCnt : '',  // 처리건수
            bsPrcsRate : '', // 결함처리율
            bsCnfmCnt : '',  // 확인점검건수
            bsCnfmRate : '', // 확인점검율
            bsRemnCnt : '',  // 잔여건수
            hoRemnCnt : '',  // 잔여건수(세대당)
            addIdx : '1',
            userType : '',
            siteMstrId : '',
            search : {
                all : true,
                standDong : null,
                addrHo : '',
                bsSpaceMngId : '',
                spaceTypeCode : 'H',
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
                bsInsp : [null, null],
                bsPrcs : [null, null],
                bsCnfm : [null, null],
                siteMstrId : '',
                tradeNm : '',
            },
            clear : false,
            count6 : '',
            selectType : 'S',
            insert : {
                spaceTypeCode : '', //공간유형코드
                bsSpaceMngId : '', //BS공간관리 ID
                bsDefectMngId : '', //BS결함관리ID
                bsDefectConts : '', //BS결함내용
                standDong : '', //기준동
                addrHo : '', //주소호
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
                addrHo : '',
                noSize : '',
            },
            dlSpaceDefectList : [],
            dongHosu : {
                standDong : '',
                cnt : 0
            },
            dlHouseOption : [], //세대옵션 시트 정보 담기
            houseData : [],     //세대설정 층,
            stdHo : [],       //해당 동의 호
            addrFr : [],      //해당 동의 세대
            houseInfoMySiteData : [], //받아온 호
            isAllChecked: false,
            isAllDisabled: false,
            dongHoList : [],
            processDefect : {
                standDong : '',
                addrHo : '',
                bsSpaceMngName : '',
                mainName : '',
                midName : '',
                subName : '',
                defectTypeName : '',
                bsCnfmTypeName : '',
                bsPrcsDt : '',
                bsDefectRegMngId : '',
                tradeId : '',
            },
            cnfm : {
                standDong : '',
                addrHo : '',
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
                bsCnfmTypeCode : '',
                bsCnfmConts : '',
                bsPrcsDt : '',
                bsDefectProsCnfmId : '',
                bsFlawPcptPhoto : '미등록',
                bsFlawCfptPhoto : '미등록',
            },
            bsDetail : {
                bsInsprName : '',
                bsInspDt : '',
                standDong : '',
                addrHo : '',
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
            },
            ozReport:{src : '',},
            /** not defined error */
            tradeType: null,


            /** 결함등록 시트 */
            WriteDefect : {
                options: {
                    Cfg:{
                        NoVScroll : 0,
                        NoDataMessage:3,
                    },
                    Cols: [
                    { Name: 'isChecked', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
                    { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4 },
                    { Name: 'bsSpaceMngId', Header: [{ Value: '결함 등록', Span: 12 }, { Value: '<span class="emp_red">공간</span>', Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
                    { Name: 'mainCodeId', Header: [{ }, { Value: '<span class="emp_red">공종</span>', RowSpan : 2, Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "",  RelWidth: 5 },
                    { Name: 'midCodeId', Header: [{ }, { Value: '<span class="emp_red">세부공종</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5 },
                    { Name: 'subCodeId', Header: [{ }, { Value: '<span class="emp_red">결함공종</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5},
                    { Name: 'bsDefectMngId', Header: [{ }, { Value: '<span class="emp_red">결함유형</span>', Type: 'Html' }], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 5 },
                    // { Name: 'case8', Header: [{ }, { Value: '결함내용' }], Required: 1, RelWidth: 5 },
                    // { Name: 'case8', Header: [{ }, { Value: '결함내용' }], Format: {"1": "<select class='form_control d-inline-block' style='width:80px'><option value=''>선택</option></select><input type='text' class='form_control d-inline-block ml10' style='width:150px;height:28px' placeholder='입력해주세요'>"}, CanEdit: 0, Required: 1, RelWidth: 16 },
                    { Name: 'bsDefectSelet', Header: [{ }, { Value: '<span class="emp_red">결함내용</span>', Span : 2, Type: 'Html'}], Type: 'Enum', Enum: "", EnumKeys: "", RelWidth: 16 },
                    { Name: 'bsDefectConts', Header: [{ }, {}], EmptyValue: '입력하세요.', RelWidth: 16 },
                    { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' },], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
                    { Name: 'bsInspMtrl', Header: [{}, { Value: '자재' } ], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
                    { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' } ], Type: 'Bool', CanSort: 0, CanEdit: 1, RelWidth: 4 },
                    { Name: 'bsFileConnectId', Header: [{ }, { Value: '관련사진' }], Format: {"1": "<button type='button' class='btn_write'>등록</button>", "2": "<button type='button' class='btn_view'>보기</button>"}, CanEdit: 0, RelWidth: 5 },
                    { Name: 'spaceTypeCode', Visible:0},
                    { Name: 'bsInsprType', Visible:0},
                    { Name: 'bsInsprName', Visible:0},
                    { Name: 'standDong', Visible:0},
                    { Name: 'addrHo', Visible:0},
                    { Name: 'addrFloor', Visible:0},
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
                    { isChecked: '', bsSpaceMngId: '1', mainCodeId: '1', midCodeId: '1', subCodeId: '1', bsDefectMngId: '1', bsDefectSelet: '직접입력', bsDefectConts: '직접입력', bsInspEmgc: 'Y', bsInspMtrl: 'Y', bsInspPop: 'Y', bsFileConnectId: '1' },
                ],
            },
            InspectionBsList7 : {
                options: {
                    Cfg : {
                        NoDataMessage : 3,
                        NoVScroll: false,
                    },
                    Cols: [
                        { Name: 'isChecked', Header: [{ Value: '', RowSpan: 2 }], Type: 'Radio', HRadio: 0, RelWidth: 4 },
                        { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4, CanEdit : 0 },
                        { Name: 'standDong', Header: [{ Value: '결함 등록', Span: 13 }, { Value: '동' }],Type: "Int", Format: "####", RelWidth: 5, CanEdit : 0 },
                        { Name: 'addrHo', Header: [{ }, { Value: '호수' }],Type: "Int",Format: "####", RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsSpaceMngName', Header: [{ }, { Value: '공간' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'mainName', Header: [{ }, { Value: '공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'midName', Header: [{ }, { Value: '세부공종' }], RelWidth: 5, CanEdit : 0},
                        { Name: 'subName', Header: [{ }, { Value: '결함공종' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'defectTypeName', Header: [{ }, { Value: '결함유형' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsDefectConts', Header: [{ }, { Value: '결함내용' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsInspEmgc', Header: [{ }, { Value: '긴급' }], RelWidth: 4, CanEdit : 0 },
                        { Name: 'bsInspMtrl', Header: [{ }, { Value: '자재' }], RelWidth: 4, CanEdit : 0 },
                        { Name: 'bsInspPop', Header: [{ }, { Value: 'POP' }], RelWidth: 4, CanEdit : 0 },
                        { Name: 'bsInsprName', Header: [{ }, { Value: '점검자' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsInspDt', Header: [{ }, { Value: '점검일' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsAsignType', Header: [{ Value: '결함 처리', Span: 4 }, { Value: '배정상태' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'tradeNm', Header: [{ }, { Value: '협력업체' }], RelWidth: 5, CanEdit : 0 },
                        // { Name: 'bsAsignDt', Header: [{ }, { Value: '배정일' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsPrcsOrderView', Header: [{ }, { Value: '처리차수' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsPrcsDt', Header: [{ }, { Value: '처리완료일' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsCnfmTypeCode', Header: [{ Value: '확인점검', Span: 2 }, { Value: '결과등급' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsCnfmDt', Header: [{ }, { Value: '확검일' }], RelWidth: 5, CanEdit : 0 },
                        { Name: 'bsDefectRegMngId', Visible: '0' },
                        { Name: 'tradeId', Visible: '0' },
                        { Name: 'bsDefectProsCnfmId', Visible: '0' },
                    ]
                },
                data: [
                    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
                    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
                    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
                    { case1: '', case2: '101', case3: '3', case4: '1', case5: '2', case6: '22' },    
                ],
            },
            tradeId : '',

            //엑셀다운로드
            excelDownload : {
                request : false,
                fileName :'',
                downloadOption :'',
                options : null,
                data : [],
            },
            addrHoList : []
        }),
        watch : {
            'insert.standDong' : {
                handler() {
                    this.getSelectAddrHoList(this.insert.standDong)
                }
            },
            'search.standDong' : {
                handler() {
                    this.getSelectAddrHoList(this.search.standDong)
                }
            },
        },
        created () {
            this.insert.bsInsprName = this.$store.getters['auth/getUserNm']
            this.dongHosuColumns = PartnerWork.options.Cols
            this.flawProcessDetailColumns = ProcessDefect.options.Cols
            this.flawConfirmDetailColumns = ConfirmDefect.options.Cols
            this.getMasterList()
            this.getHouseInfoMySiteDongList()           // 현장 동 정보 
            this.getBsDeffectMngList()                  // 검색용 - 본사 BS결함관리 정보                         
            this.getSpacedefectCntList()                // 검색용 - 등록된 공간별 결함 리스트
            this.getCateGoryData()            
        },
        mounted(){
            this.getBsDeffectRegMngList()
            this.userId = this.$store.getters['auth/getUserId']
            this.userType = this.$store.getters['auth/getUserType'] 
            this.tradeId = this.$store.getters['auth/getTradeId']
            this.tradeType = this.$store.getters['auth/getTradeType'];  
        },
        methods: {
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
            dongHosuInitSheet(sheet) {
                this.dongHosuSheet = sheet
            },
            flawProcessDetailInitSheet(sheet) {
                this.flawProcessDetailSheet = sheet
            },
            flawConfirmDetailInitSheet(sheet) {
                this.flawConfirmDetailSheet = sheet
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
            setTopFilterAddrOption (data) {
                const allAddrHoList = data.map(item => {
                    return {
                        label: parseInt(item.addrHo),
                        value: parseInt(item.addrHo),
                    }
                })
                this.addrHoList = [..._.uniqBy(allAddrHoList, 'value')]
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
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
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
                    }
                } catch (error) {
                    console.error('검색조건 동 리스트 불러오기 에러 : ', error)
                }
            },
            /** 결함 등록 팝업 중 세대선택 층 호수 시트 그리기 */
            dongHosuPop(){
                let options = PartnerWork.options
                options.Events = {
                    onAfterClick: (evt) => {
                        this.dongHosuClickGrid(evt)
                    }
                }
                loader.createSheet({
                    el: 'dongHosuSheet',
                    data : this.dongHosuGridData,
                    options : options
                }).then(sheet => {
                    this.dongHosuSheet = sheet
                })
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
                        
                        this.categoryData = result.dlDefectMng;

                        this.siteMainData = _.uniqBy([...result.dlDefectMng], 'mainCodeId');
                        this.siteMidData = _.uniqBy([...result.dlDefectMng], 'midCodeId');
                        this.siteSubData = _.uniqBy([...result.dlDefectMng], 'subCodeId');

                    } 
                } catch (error) {
                    console.error('검색조건 공종, 세부공종, 결함공종, 결함유형 불러오기 에러 : ', error)
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
                    console.error('마스터 코드 조회 에러 : ', error)
                }
            },
            /**
             * BS 점검 세대 결함 통계 불러오기
             */
            async fn_bsInsptSummary(){   // 통계 요약
                let payload = {
                    spaceTypeCode : 'H',
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                };
                //payload['spaceTypeCode'] = 'P'
                if(this.userType === 'PTNR' && this.tradeType === 'C') {  
                    // payload['siteMstrId'] = this.siteMstrId 
                    payload['tradeId'] = this.tradeId
                }
                try {
                await API.bsCheck.getBsInsptSummary(payload).then(rst =>{

                    if(typeof rst.dlBsInspt != 'undefined'){
                        let dlBsInspt = rst.dlBsInspt
                        this.bsTotlCnt = dlBsInspt.bsTotlCnt  // 총 결함건수
                        this.hoCnfmCnt =  Math.floor(dlBsInspt.hoCnfmCnt)  // 결함건수(세대당)
                        this.bsPrcsCnt =  dlBsInspt.bsPrcsCnt  // 처리건수  
                        this.bsPrcsRate =  Number(dlBsInspt.bsPrcsRate).toFixed(2) // 결함처리율
                        this.bsCnfmCnt =  dlBsInspt.bsCnfmCnt   // 환인점검 건수
                        this.bsCnfmRate =  Number(dlBsInspt.bsCnfmRate).toFixed(2) // 확인점검률
                        this.bsRemnCnt =  dlBsInspt.bsRemnCnt  // 잔여건수
                        this.hoRemnCnt =  Math.floor(dlBsInspt.hoRemnCnt)  // 잔여건수(세대당)
                        // this.remnCnt = dlBsInspt.bsRemnCnt  // 처리대기
                    }
                })
                } catch (e) {
                    this.alert('데이터 조회에 실패했습니다.')
                }
            },

            /**
             * BS 점검 세대 결함 리스트 불러오기
             */
            getBsDeffectRegMngList(){
            /** 세대결함리스트 시트 */
            let options = this.InspectionBsList7.options
            options.Events = {
                onRenderFirstFinish: async (evt) => {
                    let payload = {};
                    payload['spaceTypeCode'] = 'H'
                    payload['bsInspStartDt'] = this.search.bsInsp[0];
                    payload['bsInspEndDt'] = this.search.bsInsp[1];
                    payload['bsPrcsStartDt'] = this.search.bsPrcs[0];
                    payload['bsPrcsEndDt'] = this.search.bsPrcs[1];
                    payload['bsCnfmStartDt'] = this.search.bsCnfm[0];
                    payload['bsCnfmEndDt'] = this.search.bsCnfm[1];
                    if(!commonFn.methods.isEmpty(this.search.standDong)) {
                        payload['standDong'] = this.search.standDong
                    }
                    if(!commonFn.methods.isEmpty(this.search.addrHo)) {
                        payload['addrHo'] = this.search.addrHo
                    }
                    if(!commonFn.methods.isEmpty(this.search.bsSpaceMngId)) {
                        payload['bsSpaceMngId'] = this.search.bsSpaceMngId
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
                    if(!commonFn.methods.isEmpty(this.search.bsAsignType)) {
                        payload['bsAsignType'] = this.search.bsAsignType
                    }
                    if(!commonFn.methods.isEmpty(this.search.bsDeffectConts)) {
                        payload['bsDeffectConts'] = this.search.bsDeffectConts
                    }
                    if(!commonFn.methods.isEmpty(this.search.bsCnfmTypeCode)) {
                        payload['bsCnfmTypeCode'] = this.search.bsCnfmTypeCode
                    }
                    payload['siteMstrId'] = this.$store.getters['auth/getSiteMstrId']
                    if(!commonFn.methods.isEmpty(this.search.tradeNm)) {
                        payload['tradeNm'] = this.search.tradeNm
                    }
                    // 협력사이고 시공업체인 경우 본인 회사 BS점검만 보이도록 처리
                    if(this.userType === 'PTNR' && this.tradeType === 'C') {  
                        //payload['siteMstrId'] = this.search.siteMstrId 
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
                    this.fileUpload = {}
                    try {
                        this.fn_bsInsptSummary()
                        const result = await API.bsCheck.getBsDeffectRegMngList(payload)
                        if(result){
                            result.dlDefectReg.forEach( row => {

                                if( row.bsPrcsDt ) {                // 차수 있음
                                    row.bsPrcsYn = true                      // 반환 불가능 여부

                                    if(row.bsCnfmTypeCode){          // 확인점검 완료시
                                        row.bsCnfmYn = true                   // 확인점검 완료 여부
                                        
                                        if(row.bsCnfmTypeCode == 1){  // 완료상태 양호인 경우
                                            row.defecProsYn = true             // 결함처리 완료 여부
                                        }
                                    }else{  // 확인 점검중인경우
                                        row.defecProsYn = true                // 결함처리 완료 여부
                                    }
                                }

                                // if(row.bsCnfmYn && !row.defecProsYn){
                                //     row.bsPrcsOrderView = ''
                                //     row.bsPrcsDt = ''
                                // }

                                // if(row.defecProsYn && !row.bsCnfmYn){
                                //     row.bsCnfmTypeCode = ''
                                //     row.bsCnfmDt = ''
                                // }
                                if(row.bsInspDt != null){
                                    row.bsInspDt = this.$moment(row.bsInspDt).format('YYYY-MM-DD')
                                }
                                if(row.bsPrcsDt != null){
                                    row.bsPrcsDt = this.$moment(row.bsPrcsDt).format('YYYY-MM-DD')
                                }
                                if(row.bsCnfmDt != null){
                                    row.bsCnfmDt = this.$moment(row.bsCnfmDt).format('YYYY-MM-DD')
                                }
                                row.bsPrcsOrderView = row.bsPrcsOrder
                                row.bsInspEmgc = row.bsInspEmgc === "1"? "O" : "",
                                row.bsInspMtrl = row.bsInspMtrl === "1"? "O" : "",
                                row.bsInspPop = row.bsInspPop === "1"? "O" : "",
                                row.bsAsignType = row.bsAsignType === "A"? "배정": row.bsAsignType === "R"? "반환" : "미배정",
                                row.bsCnfmTypeCode = row.bsCnfmTypeCode === "1"? "양호": row.bsCnfmTypeCode === "2"? "미흡": row.bsCnfmTypeCode === "3"? "미조치" : ''
                            })
                            evt.sheet.loadSearchData({
                                data: result.dlDefectReg
                            })
                            this.count6 = result.dlDefectReg.length
                            let rows = this.sheet.getDataRows()
                            if(rows.length > 0){
                                rows.forEach(row => {
                                    if(row.bsAsignType != "배정"){
                                        this.sheet.setAttribute(row, "bsAsignType", "TextColor", "#FF0000", 1)      // 미배정 / 반환 글자색 변경
                                    }
                                })
                            }
                        }
                    } catch (error) {
                        console.error('BS 점검 세대 결함 리스트 불러오기 에러 : ', error)
                    }
                },
                onDblClick : (evt) => {
                    this.clickGrid(evt)
                },
            }
            loader.createSheet({
                el: 'bsCheckDeffectSheet',
                data : [],
                options : options
            }).then(sheet => {
                this.sheet = sheet
            })
                
            },
            /**
             * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData (isReset) {
                if (isReset) {
                    this.search = {
                        standDong : null,
                        addrHo : '',
                        spaceTypeCode : 'H',
                        bsSpaceMngId : '',
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
                return await this.getBsDeffectRegMngList()
            },
            /** 
             * 그리드 클릭 이벤트
             */
            async clickGrid(evt) {
                // console.log(evt.row);
                const payload = {
                    bsDefectRegMngId : evt.row.bsDefectRegMngId,
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }

                try {
                    const result = await API.bsCheck.getDefectRegView(payload)
                    if(result?.dmDefectReg){
                        this.bsDetail.bsInsprName = result.dmDefectReg.bsInsprName
                        this.bsDetail.bsInspDt = result.dmDefectReg.bsInspDt.slice(0,4) + '-' + result.dmDefectReg.bsInspDt.slice(4,6) + '-' + result.dmDefectReg.bsInspDt.slice(6,8)
                        this.bsDetail.standDong = Number(result.dmDefectReg.standDong)
                        this.bsDetail.addrHo = Number(result.dmDefectReg.addrHo)
                        this.bsDetail.bsSpaceMngName = result.dmDefectReg.bsSpaceMngName
                        this.bsDetail.mainName = result.dmDefectReg.mainName
                        this.bsDetail.midName = result.dmDefectReg.midName
                        this.bsDetail.subName = result.dmDefectReg.subName
                        this.bsDetail.defectTypeName = result.dmDefectReg.defectTypeName
                        this.bsDetail.bsDefectConts = result.dmDefectReg.bsDefectConts
                        this.bsDetail.bsInspEmgc = result.dmDefectReg.bsInspEmgc === '1'? 'Y' : 'N'
                        this.bsDetail.bsInspMtrl = result.dmDefectReg.bsInspMtrl === '1'? 'Y' : 'N'
                        this.bsDetail.bsInspPop = result.dmDefectReg.bsInspPop === '1'? 'Y' : 'N'
                    }
                    const result2 = await API.bsCheck.getDefectProsCnfmList(payload)
                    if(result2?.dlDefectProsCnfm) {        // 결함처리 / 확인점검 여부 확인
                        let ProcessDefect = []
                        let ConfirmDefect = []
                        
                        await result2.dlDefectProsCnfm.filter( row => {
                            row.bsDfpsId = _.clone(row.bsDfpsFileConnectId)
                            row.bsDfpsFileConnectId = row.bsDfpsFileConnectId != null ? '1':''
                            row.bsAsignYn = row.tradeId === null ? '미배정' : '배정'
                            row.bsAsignDt = row.bsAsignDt != null? row.bsAsignDt.slice(0,4) + '-' + row.bsAsignDt.slice(4,6) + '-' + row.bsAsignDt.slice(6,8) : ''
                            row.bsPrcsDt = row.bsPrcsDt != null? row.bsPrcsDt.slice(0,4) + '-' + row.bsPrcsDt.slice(4,6) + '-' + row.bsPrcsDt.slice(6,8):''
                            if(row.bsCnfmTypeCode){
                                row.bsCnfmTypeCode = row.bsCnfmTypeCode === '1'? '양호': row.bsCnfmTypeCode === '2'? '미흡':'미조치'
                                row.bsCnfmDt = row.bsCnfmDt != null? row.bsCnfmDt.slice(0,4) + '-' + row.bsCnfmDt.slice(4,6) + '-' + row.bsCnfmDt.slice(6,8) : ''
                                row.bsCnfmId = _.clone(row.bsDfcfFileConnectId)
                                row.bsDfcfFileConnectId = row.bsDfcfFileConnectId != null ? '1':''
                                ConfirmDefect.push(row)  // 확인점검 추가
                            }
                            ProcessDefect.push(row)  // 결함처리 추가
                        })

                        this.flawProcessDetailGridData = ProcessDefect
                        this.flawConfirmDetailGridData = ConfirmDefect

                    } else {
                        this.flawProcessDetailGridData = ProcessDefect
                        this.flawConfirmDetailGridData = ConfirmDefect
                    }
                } catch (error) {
                    console.error('세대 결함 상세보기 에러 : ', error)
                }
                this.$bvModal.show('DetailDefect')
            },
            closeBtn () {
                this.$bvModal.hide('DetailDefect')
            },
            /**
             * 세대결함 상세 세대옵션 보기 버튼
             */
            async dtlHsPopUpBtn () {
                const payload = {
                    standDong : this.bsDetail.standDong,
                    addrHo : this.bsDetail.addrHo,
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }

                try {
                    const result = await API.houseOptn.getHouseInfoMySiteDetail(payload)
                    if(result?.dlHouseOption){
                        this.detail.standDong = Number(result.dlHouseOption[0].standDong)
                        this.detail.addrHo = Number(result.dlHouseOption[0].addrHo)
                        this.detail.noSize = result.dlHouseOption[0].noSize

                        if(result.dlHouseOption[0].noSize){
                            this.dlHouseOption = result.dlHouseOption
                        }else{
                           this.dlHouseOption = []
                        }

                        this.$bvModal.show('BsCheckHoldOption')
                    }else{
                        return this.alert('조회된 정보가 없습니다.')
                    }

                } catch (error) {
                    console.error('세대옵션 보기 에러 : ', error)
                }
            },
            /**
             * 등록버튼 클릭시 등록 팝업 오픈
             */
            insertBtn() {
                this.insert = {   // 데이터 초기화
                    spaceTypeCode : '', //공간유형코드
                    bsSpaceMngId : '', //BS공간관리 ID
                    bsDefectMngId : '', //BS결함관리ID
                    bsDefectConts : '', //BS결함내용
                    standDong : '', //기준동
                    addrHo : '', //주소호
                    addrFloor : '', //주소층
                    bsInspDt : '', //BS점검일자
                    bsInsprType : '', //BS점검자유형
                    bsInsprId : '', //BS점검자ID
                    bsInsprName : this.$store.getters['auth/getUserNm'], //BS점검자명
                    bsInspEmgc : '', //BS점검긴급
                    bsInspMtrl : '', //BS점검자재
                    bsInspPop : '', //BS점검POP
                    bsAsignType : '', //BS배정유형
                    tradeId : '', //협력사ID
                },

                this.addrFr = []
                this.houseData = []     //세대설정 층,
                this.stdHo = []       //해당 동의 호
                this.houseInfoMySiteData = [] //받아온 호
                this.dongHosu.cnt = 0
                this.fileUpload = {}
                this.$bvModal.show('WriteDefect')
                
            },
            popSheet(){
                /** 결함등록 시트 */
                this.WriteDefect.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        event.sheet.loadSearchData({
                            data: this.spacedefectCntList[0],
                            append : false
                        })
                        this.fileUpload = [];
                        this.addRow()
                    },
                    onAfterClick: (evt) => {
                        this.flawClickGrid(evt)
                    },
                    onAfterChange: (evt) => {
                        this.flawAfterChange(evt)
                    }
                }
                let options = this.WriteDefect.options
                loader.createSheet({
                    el: 'popSheetTable',
                    data: [],
                    options: options,
                }).then(sheet => {
                    this.flawSheet = sheet;
                })
            },
            /**
             * 세대옵션 보기 버튼
             */
            async houseOptnView() {
                if(!this.insert.standDong || !this.insert.addrHo){
                    this.alert('동/호수를 입력해 주세요.')
                } else {
                    const payload = {
                        standDong : this.insert.standDong,
                        addrHo : this.insert.addrHo,
                        siteMstrId : this.$store.getters['auth/getSiteMstrId']
                    }
                    try {
                        const result = await API.houseOptn.getHouseInfoMySiteDetail(payload)
                        if(result?.dlHouseOption){
                            /** 세대옵션 정보 보기 팝업 시트 */
                            if(result.dlHouseOption.length > 0){
                                this.detail.standDong = Number(result.dlHouseOption[0].standDong)
                                this.detail.addrHo = Number(result.dlHouseOption[0].addrHo)
                                this.detail.noSize = result.dlHouseOption[0].noSize
                                this.dlHouseOption = result.dlHouseOption
                            } else {
                                return this.alert('조회된 정보가 없습니다.')
                            }
                            this.$bvModal.show('BsCheckHoldOption')
                        }

                    } catch (error) {
                        console.error('세대옵션 보기 에러 : ', error)
                    }
                }
            },
            houseOptInfo(){
                let options = PrdtOptions.options
                loader.createSheet({
                    el: 'houseDefectTable',
                    data: this.dlHouseOption,
                    options: options,
                }).then(sheet => {
                    this.detailSheet = sheet;
                })
            },
            /**
             * 검색콤보 공간 조회
             */
            async getSpacedefectCntList () {
                const payload = {
                    spaceTypeCode : 'H',
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const result = await API.bsCheck.getSpacedefectCntList(payload)

                    if(result) {
                        this.getBsDeffectRegMngList(this.search)
                        const all = { label : '전체', value : ''}
                        const allSpcaeTypeList = result.dlSpaceDefectCnt.map(item => {
                            return {
                                label: item.bsSpaceMngName,
                                value: item.bsSpaceMngId,
                            }
                        })
                        this.spaceTypeList = [all, ..._.uniqBy(allSpcaeTypeList, 'value')]                    
                    }
                    
                } catch (error) {
                    console.error('등록 팝업 공간 셀렉트 옵션 조회 에러 : ', error)
                }
            },
            flawAfterChange (evt) {
                // // evt.sheet.clear()
                if(evt.col === "bsSpaceMngId") {
                    evt.row.mainCodeId = ""
                    evt.row.midCodeId = ""
                    evt.row.subCodeId = ""
                    evt.row.bsDefectMngId = ""
                    
                    let imsiList = _.uniqBy([...this.dlSpaceDefectList.filter(item => item.bsSpaceMngId == evt.row.bsSpaceMngId)],'mainCodeId');

                    let imsi = imsiList.map(item => {return item.mainName})
                    let sImsi1 = '|' + imsi.join('|')
                    evt.sheet.setAttribute( evt.row, 'mainCodeId', 'Enum', sImsi1)
                    
                    let imsi2 = imsiList.map(item => {return item.mainCodeId})
                    let sImsi2 = '|' + imsi2.join('|')
                    evt.sheet.setAttribute( evt.row, 'mainCodeId', 'EnumKeys', sImsi2)

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
                if(evt.row.bsDefectSelet === 0) {
                    evt.sheet.setAttribute(evt.row, "bsDefectConts", "CanEdit", 1, 1)
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
                    console.error('결함 유형 불러오기 에러: ', error)
                }
            },
            /** 공종 세부공종 결함 공종  */
            async getCateGoryData () {

                const payload = {
                    spaceTypeCode : 'H',                   // 세대결함 : H
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const result = await API.bsCheck.getSpacedefectList(payload)

                    this.dlSpaceDefectList = result.dlSpaceDefect;
                    

                    const columns = this.WriteDefect.options.Cols
                    const options = {
                        bsCodeIdData : _.uniqBy([...this.dlSpaceDefectList], 'bsSpaceMngId'),
                        //mainCodeIdData: _.uniqBy([...this.dlSpaceDefectList], 'mainCodeId'),
                        //midCodeIdData: _.uniqBy([...this.dlSpaceDefectList], 'midCodeId'),
                        //subCodeIdData: _.uniqBy([...this.dlSpaceDefectList], 'subCodeId'),
                        seperator: '|',
                        key:'CodeId',
                        value: 'Name',
                        bs : columns.find(col => col.Name === 'bsSpaceMngId'),
                        //main: columns.find(col => col.Name === 'mainCodeId'),
                        //mid: columns.find(col => col.Name === 'midCodeId'),
                        //sub : columns.find(col => col.Name === 'subCodeId'),
                    }

                    //if(!(options.main && options.mid && options.sub)) return
                    
                    options.bs.Enum = `${options.seperator}${options.bsCodeIdData.map(item => item['bsSpaceMng'.concat(options.value)]).join(options.seperator)}`
                    options.bs.EnumKeys = `${options.seperator}${options.bsCodeIdData.map(item => item['bsSpaceMngId']).join(options.seperator)}`
                    
                    //options.bs.clear = options.main.Name
                    //options.main.Related = options.bs.Name

                    //options.bsCodeIdData.forEach(item =>{
                    //     options.main[`Enum${item['bsSpaceMngId']}`] = `${options.seperator}${options.mainCodeIdData.filter(bsItem=> bsItem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['main'.concat(options.value)]).join(options.seperator)}`
                    //     options.main[`EnumKeys${item['bsSpaceMngId']}`] = `${options.seperator}${options.mainCodeIdData.filter(bsItem=> bsItem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['main'.concat(options.key)]).join(options.seperator)}`
                    // })

                    
                    // options.main.clear = options.mid.Name
                    // options.mid.Related = options.main.Name

                    // options.mainCodeIdData.forEach(item => {
                    //     options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midCodeIdData.filter(miditem=> miditem.mainCodeId === item.mainCodeId && miditem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
                    //     options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midCodeIdData.filter(miditem=> miditem.mainCodeId === item.mainCodeId && miditem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
                    // })

                    // options.mid.clear = options.sub.Name
                    // options.sub.Related = options.mid.Name
                    
                    // options.midCodeIdData.forEach(item => {
                    //     options.sub[`Enum${item['mid'.concat(options.key)]}`] = `${options.seperator}${options.subCodeIdData.filter(subitem=> subitem.midCodeId === item.midCodeId && subitem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['sub'.concat(options.value)]).join(options.seperator)}`
                    //     options.sub[`EnumKeys${item['mid'.concat(options.key)]}`] = `${options.seperator}${options.subCodeIdData.filter(subitem=> subitem.midCodeId === item.midCodeId && subitem.bsSpaceMngId === item.bsSpaceMngId).map(inner => inner['sub'.concat(options.key)]).join(options.seperator)}`
                        
                    // })

                } catch (error) {
                    console.error('공종 세부공종 결함공종 조회 에러 : ', error)
                }
            },
            /**
             * 결함 내용 불러오기
             */
            async getDefectCntsMngList (evt) {
                const payload = {
                    siteMstrId : this.$store.getters['auth/getSiteMstrId'],
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
                    console.error('결함 유형 불러오기 에러 : ', error)
                }
            },
            /** 결함 등록 클릭 이벤트 */
            flawClickGrid (evt) {
                if(evt.col === 'bsFileConnectId'){
                    let index = evt.row.SEQ;
                    this.tmpFile = _.clone(this.fileUpload[index])
                    this.$bvModal.show('FileWriteH')
                }
            },
            /** 결함등록(팝업) 결함등록 */
            addRow () {

                let sheet = this.flawSheet;
                let checkRows = [];

                checkRows = sheet.getRowsByChecked('isChecked');
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
                let sheet = this.flawSheet;
                let checkedRows = [];
                checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                if(checkedRows.length === 0) {
                    this.alert('삭제할 행을 선택해주세요.');
                    return;
                } else {
                    this.confirm('삭제하시겠습니까?' , async ()=> {
                        sheet.deleteRows({rows : checkedRows })

                        checkedRows.forEach(item => {
                            sheet.removeRow({row: item,}) 
                            this.$delete(this.fileUpload, item.OrgIndex)
                        })
                    })
                }
                
            },
            /** 결함등록(팝업) 행 복사 */
            copyRow: function(){    //행복사
                let sheet = this.flawSheet;
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
            /** 결함 등록 팝업 저장버튼 */
            saveFlawData () {
                const rowData = this.flawSheet.getDataRows()

                if (!this.insert.bsInspDt) return this.alert('점검 일자를 선택하여주세요.')
                if (this.selectType === 'S')  {
                    if(!this.insert.standDong) return this.alert('대상 세대 동을 입력하여주세요.')
                    if(!this.insert.addrHo) return this.alert('대상 세대 호를 입력하여주세요.')
                }
                if(this.selectType === 'M') {
                    if(this.dongHoList.length === 0) return this.alert('세대를 선택하여 주세요.')
                }

                let idx = 0

                for(let row of rowData){
                    if(!row.bsSpaceMngId) return this.alert(idx+1+'번째의 공간을 선택하여주세요.')
                    if(!row.mainCodeId) return this.alert(idx+1+'번째의 공종을 선택하여주세요.')
                    if(!row.midCodeId) return this.alert(idx+1+'번째의 세부공종을 선택하여주세요.')
                    if(!row.subCodeId) return this.alert(idx+1+'번째의 결함공종을 선택하여주세요.')
                    if(!row.bsDefectMngId) return this.alert(idx+1+'번째의 결함유형을 선택하여주세요.')
                    if(!row.bsDefectConts) return this.alert(idx+1+'번째의 결함내용을 선택하여주세요.')
                    idx++
                }
                
                // rowData.forEach((row,idx) => {
                    
                //     if(!row.bsSpaceMngId) return this.alert(idx+1+'번째의 공간을 선택하여주세요.')
                //     if(!row.mainCodeId) return this.alert(idx+1+'번째의 공종을 선택하여주세요.')
                //     if(!row.midCodeId) return this.alert(idx+1+'번째의 세부공종을 선택하여주세요.')
                //     if(!row.subCodeId) return this.alert(idx+1+'번째의 결함공종을 선택하여주세요.')
                //     if(!row.bsDefectMngId) return this.alert(idx+1+'번째의 결함유형을 선택하여주세요.')
                //     if(!row.bsDefectConts) return this.alert(idx+1+'번째의 결함내용을 선택하여주세요.')
                // })   

                const sheetData = this.flawSheet.getSaveJson({
                    saveMode: 3
                })

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
                              
                this.confirm('저장 하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('저장에 실패했습니다.')
                    }
                    try {
                        if(!this.flawSheet) return this.alert('sheet 정보 없음!')
                        const payload = this.flawSheet.getSaveJson({
                            saveMode: 3
                        })
                        payload.data.forEach((item, idx) => {
                            item.status = item.STATUS
                                item.siteMstrId = this.$store.getters['auth/getSiteMstrId']
                                item.mainCodeId = item.mainCodeId          // 대공종
                                item.midCodeId = item.midCodeId            // 주공종
                                item.subCodeId = item.subCodeId            // 결함공종
                                item.bsDefectMngId = item.bsDefectMngId    // 결함관리ID
                                item.bsDefectConts = item.bsDefectConts    // 결함내용
                                item.bsInspDt = this.insert.bsInspDt       // 점검일자
                                item.bsInspEmgc = item.bsInspEmgc 
                                item.bsInspMtrl = item.bsInspMtrl
                                item.bsInspPop = item.bsInspPop
                                item.addIndex = idx
                        })

                        let fileLst = []

                        for(let i of Object.keys(this.fileUpload)){
                           fileLst.push(...this.fileUpload[i])
                        }

                        let formData = new FormData()

                        let defectRegData =  [
                            ...payload.data
                        ]
                        
                        if(this.selectType === 'S'){
                            let defectStandData = {
                                siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                                bsInspDt : this.insert.bsInspDt.replaceAll('-',''), //점검일자
                                bsInsprType : this.$session.get('userInfo').userType, //점검자유형
                                bsInsprId : this.$session.get('userInfo').userId, //점검자ID
                                bsInsprName : this.insert.bsInsprName, //점검자명
                                spaceTypeCode : 'H',  // 세대옵션 type
                                houseHoldType : 'S', // 세대 Type
                                standDong : this.insert.standDong, //기준동
                                addrHo : this.insert.addrHo, //주소호
                            }
                            if(fileLst.length > 0){
                                formData.append('fileIndex', JSON.stringify(fileLst));
                            }
                            
                            await fileLst.forEach((file) => formData.append("file",file));
                            formData.append('defectStandData', JSON.stringify(defectStandData))
                            formData.append('defectRegData', JSON.stringify(defectRegData)) 
                        }
                        if(this.selectType === 'M'){
                            let defectStandData = {
                                siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                                bsInspDt : this.insert.bsInspDt.replaceAll('-',''), //점검일자
                                bsInsprType : this.$session.get('userInfo').userType, //점검자유형
                                bsInsprId : this.$session.get('userInfo').userId, //점검자ID
                                bsInsprName : this.insert.bsInsprName, //점검자명
                                spaceTypeCode : 'H',  // 세대옵션 type
                                houseHoldType : 'M', // 세대 Type
                                dongHoList : this.dongHoList
                            }

                            if(fileLst.length > 0){
                                formData.append('fileIndex', JSON.stringify(fileLst));
                            }
                           
                            await fileLst.forEach((file) =>formData.append("file",file));

                            formData.append('defectStandData', JSON.stringify(defectStandData))
                            formData.append('defectRegData', JSON.stringify(defectRegData))
                        }
                        const result = await API.bsCheck.getDefectRegWrite(formData)

                        if(result?.count > 0) {
                            this.alert('저장되었습니다.', async ()=>{
                                this.$bvModal.hide('WriteDefect')
                                this.getBsDeffectRegMngList()
                            })
                        } else {
                            failSave()
                        }
                    } catch (error) {
                        console.error('결함등록에 실패하였습니다.', error)
                        failSave()
                    }
                })
            },
            /**
             * 결함 등록 팝업 세대선택 팝업 오픈
             */
            selectDongHo () {
                this.$bvModal.show('SelectDongHo')
            },
            /** 선택한 동의 층과 호수 가져오기 */
            dongHosuClickGrid (evt) {
                if(evt.row.standDong.toString().length < 4){
                    this.dongHosu.standDong = evt.row.standDong.toString().padStart(4,'0')
                } else {
                    this.dongHosu.standDong = evt.row.standDong
                }
                this.getHouseOptnList()
                this.getHouseInfoMySiteList()
            },
            /**
             * 세대정보 : 층 가져오기
             */
            async getHouseOptnList() {
                try {
                    let url = '/sendApi/api/siteInfo/houseOptn/houseSet/list';
                    let payload = {
                        siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                    }
                    // if(!commonFn.methods.isEmpty(this.dongHosu.standDong)) {
                    //     payload['standDong'] = this.dongHosu.standDong
                    // }
                    
                    if(this.dongHosu.standDong != '' || this.dongHosu.standDong != null) {
                        payload['standDong'] = String(this.dongHosu.standDong)
                    }

                    const resultList = await sendPostApi(url, payload);
                    if (resultList.status === 200 && resultList.data) {
                        if(resultList.data?.dlHouseSet) {
                            this.houseData = resultList.data.dlHouseSet
                            this.fnGetHo();
                        } 
                    }
                } catch (error) {
                    console.error('세대설정 리스트 조회 실패 : ', error)
                }
            },
            //세대 정보 조회
            async getHouseInfoMySiteList() {
                let payload = {
                   siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                };
                
                if(this.dongHosu.standDong != '' || this.dongHosu.standDong != null) {
                    payload['standDong'] = this.dongHosu.standDong
                }
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteList(payload)
                    if(result?.dlHouseDetail){
                        this.houseInfoMySiteData = result.dlHouseDetail
                        this.fnGetFloor();
                    }
                } catch (error) {
                    console.error('세대정보 리스트 조회 실패 : ', error)
                }
            },
            //동의 호 계산
            fnGetHo() {
                this.stdHo = [];
                let standHo = [];
                this.houseData.forEach(item => {
                    standHo.push({
                        standHo: item.standHo,
                        checked: false,
                        disabled: false,
                    })
                })
                this.stdHo = standHo
            },
            //동의 세대계산
            fnGetFloor() { 
                let tmp = [];
                let frTmpMid = [];
                this.addrFr = [];
                
                this.isAllChecked = false
                this.isAllDisabled = false
                this.stdHo.forEach(item => {
                    item.checked = false
                    item.disabled = false
                })

                const maxRoomNum = _.maxBy(this.houseInfoMySiteData, 'standHo')
                const minRoomNum = _.minBy(this.houseInfoMySiteData, 'standHo')
                const maxFloor = _.maxBy(this.houseInfoMySiteData, 'addrFloor')
                const minFloor = _.minBy(this.houseInfoMySiteData, 'addrFloor')
                for(let i=minFloor; i<=maxFloor; i++) {
                    frTmpMid = this.houseInfoMySiteData.filter(item=> {
                        return Number(item.addrFloor) === Number(i) 
                    })
                    tmp.push(frTmpMid);
                }
                let refine = [];
                
                for(let i=Number(minFloor.addrFloor); i<Number(maxFloor.addrFloor) + 1; i++) {
                    const tempFloor = []
                    for (let l = Number(minRoomNum.standHo); l < Number(maxRoomNum.standHo) +1; l++) {
                        const temp = _.cloneDeep(this.houseInfoMySiteData.filter(room => Number(room.addrFloor) === i).find(room => Number(room.standHo) === l))
                        if (temp) {
                            temp.checked = false
                            temp.disabled = false
                        }
                        tempFloor.push(temp ? temp : {})
                    }
                    refine.push(tempFloor)
                }
                this.addrFr = refine;
            },
            //세대 전체 선택
            selectChkAll() {
                this.stdHo.forEach(item => {
                    if (!item.disabled) {
                        item.checked = this.isAllChecked
                    }
                })
                this.addrFr.forEach(floor => {
                    floor.forEach(room => {
                        if (Object.keys(room).length > 0) {
                            if (!room.disabled ) {
                                room.checked = this.isAllChecked
                            }
                        }
                    })
                })
            },
            //호 전체 선택
            selectHoChk(standHo) {
                // headerColumnsChecked
                this.addrFr.forEach(floor => {
                    floor.forEach(room => {
                        if (!room.disabled &&room.standHo === standHo.standHo) room.checked = standHo.checked
                    })
                })
                // 호수 전체 체크안될 시 전체선택 해제 혹은 전체 선택시 check
                let isChecked = true
                this.stdHo.some(item => {
                    if (!item.disabled && !item.checked) {
                        isChecked = false
                        return true
                    }
                })
                this.isAllChecked = isChecked

                let isDisabled = true
                this.stdHo.some(item => {
                    if (!item.disabled) {
                        isDisabled = false
                        return true
                    }
                })
                this.isAllDisabled = isDisabled
                
            },
            //세대별 체크 박스 이벤트
            selectChk(standHo, addrHo) {
                let tmpData = [];
                tmpData = this.houseInfoMySiteData.filter(item=> {
                    return Number(item.standHo) === Number(standHo) 
                })
                let tdMaxFloor = _.maxBy(tmpData, 'addrFloor')
                let tmfr = tdMaxFloor.addrFloor
                
                let thObj = this.$refs.stdtable.querySelectorAll("#frStdHo")
                let tdObj = this.$refs.stdtable.querySelectorAll("#frStdDongHo")

                let cnt = 0;
                let disCnt = 0;
                tdObj.forEach(item => {
                    if(item.dataset.addrho === addrHo) {            
                        if(item.checked) {
                            item.checked = true;
                        } else {
                            item.checked = false;
                            this.$refs.AllChk.checked = false;
                        }
                    }
                    if(item.dataset.standho === standHo) {
                        if(item.checked) {
                            cnt++
                        }
                    }
                    if(Number(tmfr) === cnt) {
                        this.$refs.AllChk.checked = true;
                        thObj.forEach(item => {
                            if(item.dataset.standho === standHo){
                                item.checked = true;
                                //item.disabled = true;
                            }
                        })
                    } else {
                        thObj.forEach(item => {
                            if(item.dataset.standho === standHo){
                                item.checked = false;
                                this.$refs.AllChk.checked = false;
                            }
                        })
                    }
                })
                this.dongHosu.cnt = cnt 
            },
            fn_click: function (payload) {

                let roomChecked = true
                this.addrFr
                    .map(floor => {
                        return floor.find(room => room.standHo === payload.standHo)
                    })
                    .filter(item => item != undefined)
                    .filter(item => !item.disabled)
                    .some(item => {
                        if (!item.checked) {
                            roomChecked = false
                            return true
                        }
                    })
                this.stdHo.find(item => item.standHo === payload.standHo).checked = roomChecked

                let isChecked = true
                this.stdHo.some(item => {
                    if (!item.disabled && !item.checked) {
                        isChecked = false
                        return true
                    }
                })
                this.isAllChecked = isChecked               

            },
            /** 선택된 동/ 호수 선택해제 */
            dongHosuClear() {
                this.addrFr = []
                this.houseData = []     //세대설정 층,
                this.stdHo = []       //해당 동의 호
                this.houseInfoMySiteData = [] //받아온 호
                this.dongHosu.cnt = 0
            },
            /** 선택 버튼 클릭시 이벤트 */
            saveDongHosu (item) {
                this.dongHoList = []
                let dongObj = new Object();
                let key = {
                    standDong : []
                }
                let value = { addrHo : []}
                let count = 0
                item.forEach(inItem => {
                    inItem.forEach(innerItem => {
                        if(innerItem.checked && !innerItem.disabled) {
                            key.standDong.push(innerItem.standDong)
                            value.addrHo.push(innerItem.addrHo)
                            count++
                            return;
                        }
                    })
                })


                dongObj[_.uniqBy([...key.standDong])] = value.addrHo;
                this.dongHoList.push(dongObj)
                this.dongHosu.cnt = count
                this.$bvModal.hide('SelectDongHo')
            },
            /** 결함처리 팝업 오픈 */
            deFectPopUpBtn () {
                
                const checkData = this.sheet.getRowsByChecked('isChecked')
                if(checkData.length === 0) return this.alert('결함을 선택해주세요')
                if(checkData.length > 1) return this.alert('하나의 결함만 선택해주세요')
                if(checkData[0].bsAsignType === "미배정") return this.alert('배정 되지않은 결함입니다.')
                if(String(checkData[0].tradeId) !== String(this.tradeId)) return this.alert('배정된 업체가 아니면 결함처리를 할수 없습니다.')
                if(checkData[0].bsAsignType === "배정" && checkData[0].bsPrcsDt && checkData[0].bsCnfmTypeCode === '양호') return this.alert('처리한 결함입니다.')
                if(!checkData[0].bsCnfmTypeCode && !checkData[0].bsCnfmDt) {
                    if(checkData[0].bsPrcsOrder > 0 ) {
                        return this.alert(checkData[0].bsPrcsOrder +'차 확인점검이 진행되지 않았습니다.')
                    }
                }
                if(checkData[0].bsAsignType === "반환") {
                    this.alert('반환 처리된 결함처리입니다.')
                    return
                }
                this.processDefect.standDong = checkData[0].standDong
                this.processDefect.addrHo = checkData[0].addrHo
                this.processDefect.bsSpaceMngName = checkData[0].bsSpaceMngName
                this.processDefect.mainName = checkData[0].mainName
                this.processDefect.midName = checkData[0].midName
                this.processDefect.subName = checkData[0].subName
                this.processDefect.bsDefectRegMngId = checkData[0].bsDefectRegMngId
                this.processDefect.tradeId = checkData[0].tradeId
                this.processDefect.defectTypeName = checkData[0].defectTypeName
                this.processDefect.bsDefectConts = checkData[0].bsDefectConts
                this.processDefect.bsPrcsOrder = checkData[0].bsPrcsOrder
                this.processDefect.bsPrcsDt = this.$moment().format('YYYY-MM-DD')
                this.tmpFile = []
                this.copiedFileIds = [];
                this.filesProcessFlaw = []
                this.bsFlawPcptPhoto = '미등록'
                

                this.$bvModal.show('processDefect')
            },
            /** 결함처리 적용 버튼 */
            defectInsertBtn () {
                this.confirm('결함 처리 하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('결함 처리에 문제가 발생하였습니다.')
                    }
                    let formData = new FormData()
                    let defectProsData = {
                        standDong : this.processDefect.standDong,
                        addrHo : this.processDefect.addrHo,
                        siteMstrId : this.$store.getters['auth/getSiteMstrId'],
                        bsDefectRegMngId : this.processDefect.bsDefectRegMngId,
                        bsPrcsDt : this.processDefect.bsPrcsDt.replaceAll("-", ""),
                        tradeId : this.processDefect.tradeId,
                        bsPrcsOrder : this.processDefect.bsPrcsOrder,
                    }

                    this.filesProcessFlaw.forEach((file) => formData.append("file",file));
                    formData.append('defectProsData',JSON.stringify(defectProsData))
                    try {
                        const result = await API.bsCheck.getDefecProsWrite(formData)
                        if(result.count > 0) {
                            this.alert('결함 처리 되었습니다.')
                            this.$bvModal.hide('processDefect')
                            this.getBsDeffectRegMngList()
                        } else {
                            this.alert('결함 처리에 문제가 발생하였습니다.')
                            this.$bvModal.hide('processDefect')
                        }
                    } catch (error) {
                        console.error('결함 처리 등록 에러 : ', error)
                        failSave()
                    }
                })
            },
            /**
             * 확인점검 팝업 오픈 
             */
            async deFectCnfmPopUpBtn () {
                this.cnfm.bsCnfmTypeCode = '1'
                this.cnfm.bsCnfmConts = ''
                const bsDefectProsCnfmId = this.sheet.getFocusedRow().bsDefectProsCnfmId
                this.cnfm.bsDefectProsCnfmId = bsDefectProsCnfmId
                const checkData = this.sheet.getRowsByChecked('isChecked')
                if(checkData.length === 0) return this.alert('결함을 선택해주세요')
                if(checkData.length > 1) return this.alert('하나의 결함만 선택해주세요')
                if(!checkData[0].bsPrcsDt) return this.alert('결함처리 후 확인점검하실 수 있습니다.')
                if(checkData[0].bsCnfmDt) return this.alert('처리한 확인점검입니다.')
                if(checkData[0].bsPrcsDt && checkData[0].bsCnfmTypeCode === '양호') return this.alert('처리한 확인점검입니다.')
                this.cnfm.standDong = checkData[0].standDong
                this.cnfm.addrHo = checkData[0].addrHo
                this.cnfm.bsSpaceMngName = checkData[0].bsSpaceMngName
                this.cnfm.mainName = checkData[0].mainName
                this.cnfm.midName = checkData[0].midName
                this.cnfm.subName = checkData[0].subName
                this.cnfm.defectTypeName = checkData[0].defectTypeName
                this.cnfm.bsCnfmTypeName = checkData[0].bsDefectConts
                this.cnfm.bsPrcsDt = checkData[0].bsPrcsDt
                this.cnfm.bsPrcsOrder = checkData[0].bsPrcsOrder
                this.cnfm.tradeNm = checkData[0].tradeNm
                this.cnfm.bsDefectRegMngId = checkData[0].bsDefectRegMngId
                this.cnfm.bsCnfmDt = this.$moment().format('YYYY-MM-DD')
                this.tmpFile = []
                this.copiedFileIds = [];
                this.filesConfirmFlaw = []
                this.bsFlawCfptPhoto = '미등록'

                const payload = {  
                    fileConnectId : checkData[0].bsDefectProsCnfmId,
                    fileType : 'BSCheck',
                    fileSubType : 'defectPros'
                }
                try {
                    const result = await API.bsCheck.loadFileInfo(payload)
                    if(result?.data.length > 0){
                        this.bsFlawPcptPhoto = '등록'
                    } else {
                        this.bsFlawPcptPhoto = '미등록'
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }

                this.$bvModal.show('processConfirm')
            },
            /**
             * 확인 점검 적용 버튼
             */
            cnfmInsertBtn () {
                if(!this.cnfm.bsCnfmTypeCode){
                    return this.alert('결과등급을 선택하여주세요.')
                }
                if(!this.cnfm.bsCnfmConts){
                    return this.alert('점검내역을 입력하여주세요.')
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
                            this.alert('확인 점검 처리 되었습니다.')
                            this.$bvModal.hide('processConfirm')
                            this.getBsDeffectRegMngList()
                        } else {
                            this.alert('확인 점검 처리에 문제가 발생하였습니다.')
                            this.$bvModal.hide('processConfirm')
                        }
                    } catch (error) {
                        console.error('확인 점검 처리 에러 : ', error)
                        failSave()
                    }
                })
            },
            /** 결함 삭제 */
            deleteBtn () {
                const checkData = this.sheet.getRowsByChecked('isChecked')
                if(checkData[0].bsPrcsDt){
                    return this.alert('이미 처리된 결함은 삭제 하실수 없습니다.')
                }
                this.confirm('세대 결함을 삭제하시겠습니까?', async () => {
                    const payload = {
                        siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                        bsDefectRegMngId : checkData[0].bsDefectRegMngId
                    }
                    try {
                        const result = await API.bsCheck.setDefectRegUnUsed(payload)
                        if(result?.count > 0) {
                            this.alert('결함이 삭제처리 되었습니다.')
                            this.getBsDeffectRegMngList()
                        } else {
                            this.alert('결함 삭제처리에 문제가 발생하였습니다.')
                            this.getBsDeffectRegMngList()
                        }
                    } catch (error) {
                        console.error('세대 결함 삭제 에러 : ', error)
                        this.alert('결함 삭제처리에 문제가 발생하였습니다.')
                    }
                })
            },
            /** 반환 처리 */
            defectChangeBtn() {
                const checkData = this.sheet.getRowsByChecked('isChecked')

                if(commonFn.methods.isEmpty(checkData[0].tradeId)){
                    return this.alert('배정 되지않은 결함입니다.')
                }

                if(checkData[0].bsPrcsDt && checkData[0].bsPrcsOrder){
                    return this.alert('이미 처리된 결함은 반환 하실수 없습니다.')
                }
                this.confirm('반환 처리를 하시겠습니까?', async () => {
                    const payload = {
                        bsAsignType : 'R',
                        siteMstrId : this.$store.getters['auth/getSiteMstrId'], //현장 정보 ID
                        bsDefectRegMngId : checkData[0].bsDefectRegMngId
                    }
                    try {
                        const result = await API.bsCheck.setDefectPtnrChange(payload)
                        if(result.count > 0) {
                            this.alert('반환 처리 되었습니다.')
                            this.getBsDeffectRegMngList()
                        } else {
                            this.alert('반환 처리에 문제가 발생하였습니다.')
                            this.getBsDeffectRegMngList()
                        }
                    } catch (error) {
                        console.error('반환 처리 에러 : ',error)
                        this.alert('반환 처리에 문제가 발생하였습니다.')
                    }
                })
            },
            /** 상세 파일 업로드 */
            saveFile() {
                let index = this.flawSheet.getFocusedRow().SEQ;
                this.fileUpload[index] = _.clone(this.tmpFile)

                if(this.tmpFile.length > 0){
                    this.flawSheet.setValue(this.flawSheet.getFocusedRow(), 'bsFileConnectId', '2')
                }else{
                    this.flawSheet.setValue(this.flawSheet.getFocusedRow(), 'bsFileConnectId', '1')
                }

                for(var i = 0; i < this.fileUpload[index].length; i++){          
                    this.fileUpload[index][i].fileIndex = index-1;     
                }

                // if(this.fileUpload.length > 0){
                    
                //     //기존 등록파일 다 제거
                //     let size = this.fileUpload.length;                 
                //     //인덱스 변경을 위한 처리
                //     let delCnt = 0; 
                //     for(let j = 0; j < size; j++){                                    
                //         if(this.fileUpload.length > 0 && this.fileUpload[j-delCnt].fileIndex == index){                                                
                //             this.fileUpload.splice(j-delCnt, 1);    // 해당 file정보 제거                      
                //             delCnt++;
                //         }
                //     }

                //     // 등록된 파일정보가 있는 경우
                //     if(this.files.length > 0){
                //         for(let j = 0; j < this.files.length; j++){
                //             this.fileUpload.push(this.files[j]);
                //         }
                //     }
                //     this.$bvModal.hide('FileWriteH')
                // }else{
                //     // 최초 파일정보가 입력된 경우
                //     Object.assign(this.fileUpload,this.files);
                    
                // }
                this.$bvModal.hide('FileWriteH')
            },
            saveFileClose () {
                this.tmpFile = []
                this.copiedFileIds = [];
                this.$bvModal.hide('FileWriteH')
            },
            /** 결함 처리 */
            async flawProcessDetailClickGrid (evt) {
                const rowData = evt.sheet.getRowValue(evt.row)
                if(evt.col === 'bsDfpsFileConnectId' && rowData.bsDfpsFileConnectId === '1') {
                    this.lstFileRstDetail = []
                    const payload = {  
                        fileConnectId : evt.row.bsDfpsId,
                        fileType : 'BSCheck',
                        fileSubType : 'defectPros'
                    }
                    try {
                        const result = await API.bsCheck.loadFileInfo(payload)
                        if(result?.data){
                            this.lstFileRstDetail = result.data
                            this.$bvModal.show('FileProcessDetail')
                        }
                    } catch (error) {
                        console.error('파일 불러오기 에러 : ', error)
                    }
                }
            },
            /** 확인 점검 */
            async flawConfirmDetailClickGrid (evt) {
                const rowData = evt.sheet.getRowValue(evt.row)
                if(evt.col === 'bsDfcfFileConnectId' && rowData.bsDfcfFileConnectId === '1') {
                    this.lstFileRstDetail = []
                    const payload = {
                        fileConnectId : evt.row.bsCnfmId,
                        fileType : 'BSCheck',
                        fileSubType : 'defectCnfm'
                    }
                    try {
                        const result = await API.bsCheck.loadFileInfo(payload)
                        if(result?.data){
                            this.lstFileRstDetail = result.data
                            this.$bvModal.show('FileConfirmDetail')
                        }
                    } catch (error) {
                        console.error('파일 불러오기 에러 : ', error)
                    }
                }
            },
            /** 결함 상세 팝업 사진 보기 버튼 */
            async bsFlawDetailPhoto () {
                const payload = {
                    fileConnectId : this.sheet.getFocusedRow().bsDefectRegMngId,
                    fileType : 'BSCheck',
                }
                try {
                    const result = await API.bsCheck.loadFileInfo(payload)
                    if(result?.data){
                        this.lstFileRstDetail = result.data

                        if(this.lstFileRstDetail.length > 0){
                            this.$bvModal.show('FileDetail')
                        }else{
                            this.alert('등록된 사진이 없습니다.')
                        }
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
            /** 결함처리 사진등록 버튼(view) */
            bsFlawPcPtInsertBtn () {
                this.$bvModal.show('FileWriteH2')
            },
            /** 결함처리 사진등록 팝업 등록 버튼(save) */
            saveFileProcessFlaw () {

                this.tmpFile.forEach(file=>{
                    file.fileIndex = 0
                })

                this.filesProcessFlaw = _.clone(this.tmpFile)                
                
                if(this.filesProcessFlaw.length > 0){
                    this.bsFlawPcptPhoto = '등록'
                } else {
                    this.bsFlawPcptPhoto = '미등록'
                }
                console.log(this.filesProcessFlaw)
                this.$bvModal.hide('FileWriteH2')
            },
            /** 결함처리 사진등록 팝업 닫기 버튼 */
            saveFileProcessFlawClose () {
                this.$bvModal.hide('FileWriteH2')
                this.tmpFile = _.clone(this.filesProcessFlaw)
            },
            /** 확인점검 사진등록 버튼(view) */
            bsFlawCfptInsertBtn () {
                this.$bvModal.show('FileWriteH3')
            },
            /** 확인점검 사진팝업 등록버튼(save) */
            saveFileConfirmFlaw () {                
                this.tmpFile.forEach(file=>{
                    file.fileIndex = 0
                })

                this.filesConfirmFlaw = _.clone(this.tmpFile)
                if(this.filesConfirmFlaw.length > 0) {
                    this.bsFlawCfptPhoto = '등록'
                } else {
                    this.filesConfirmFlaw = []
                    this.bsFlawCfptPhoto = '미등록'
                }
                this.$bvModal.hide('FileWriteH3')
            },
            /** 확인점검 사진팝업 닫기버튼 */
            saveFileConfirmFlawClose () { 
                this.$bvModal.hide('FileWriteH3')
                this.tmpFile = _.clone(this.filesConfirmFlaw)
            },
            qrPrint () {
                /** 개별 Qr코드 */
                let options = 'N';
                // if(this.linkYn === '연동') options = 'Y';
                /*
                var popUrl = "http://61.251.164.137:8080/oz80/sample/viewer/houseOption.jsp?STAND_DONG="+this.standDong+"&ADDR_HO="+ this.addrHo +"&LINK_YN="+options+"&SITE_MSTR_ID=" + this.$cookies.get("siteMstrId");
                var popOption = "top=10, left=10, width=1000, height=600, status=no, menubar=no, toolbar=no, resizable=no";
                window.open(popUrl, "HOUSE_OPTION", popOption);
                */
                const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][41].jspNm
                + '&STAND_DONG=' + this.detail.standDong
                + '&ADDR_HO='+ this.detail.addrHo 
                + "&LINK_YN=Y"
                + "&SITE_MSTR_ID=" + this.$store.getters['auth/getSiteMstrId'];

                window.open(this.ozReport.src, '_blank')
            },
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['isChecked'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `세대결함_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
                // this.sheet.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `BS점검_세대결함_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            async getSelectAddrHoList(param) {
                const payload = {
                    siteMstrId : this.$store.getters['auth/getSiteMstrId'],
                    standDong : param
                }
                try {
                    const response = await API.houseOptn.getAddrHoList(payload)
                    if(response?.addrHoList.length > 0){
                        this.setTopFilterAddrOption(response.addrHoList)
                    }
                } catch (error) {
                    console.error('호수 불러오기 에러 : ', error)
                }
            }
        }
    }
</script>