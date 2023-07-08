<template>
<div class="">            
    <div class="lookup_box multi_line">
        <table>
            <caption class="sr_only"></caption>
            <colgroup>
                <col width="6%">
                <col width="14%">
                <col width="4%">
                <col width="14%">
                <col width="5%">
                <col width="23%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>공종</th>
                    <td>
                        <select v-model="filtering.gjCode" class="form_control size_sm_lg">
                            <option 
                                v-for="option in gjCodeOptions"
                                :key="option.value"
                                :value="option.value"
                            >   
                                {{ option.label }}
                            </option>
                        </select>
                    </td>
                    <th>종류</th>
                    <td>
                        <select v-model="filtering.kindCode" class="form_control size_sm_lg">
                            <option 
                                v-for="option in kindCodeOptions"
                                :key="option.value"
                                :value="option.value"
                            >   
                                {{ option.label }}
                            </option>
                        </select>
                    </td>
                    <th>대상</th>
                    <td>
                        <select v-model="filtering.eduTargetType" class="form_control size_sm_lg">
                            <option 
                                v-for="option in eduTargetTypeOptions"
                                :key="option.value"
                                :value="option.value"
                            >   
                                {{ option.label }}
                            </option>
                        </select>
                        <input type="text" class="form_control size_sm_lg ml10" v-model="filtering.eduTargetComment" :disabled="isCheck">
                    </td>
                    <th>
                    </th>
                    <!-- 교육 계획일자 -->
                    <td>
                        <!-- <DatepickerRange /> -->
                    </td>
                    <td class="ar">
                        <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                    </td>
                </tr>
                <tr>
                    <th>교육 과정명</th>
                    <td><input type="text" v-model="filtering.eduCourseName" class="form_control size_sm_lg" placeholder="입력해주세요" @keyup.enter="searchData(false)"></td>
                    <th>년도</th>
                    <td>
                        <select v-model="filtering.eduYear" class="form_control size_sm_lg">
                            <option 
                                v-for="option in yeondoOptions"
                                :key="option.value"
                                :value="option.value"
                            >   
                                {{ option.label }}
                            </option>
                        </select>
                    </td>
                    <th>실시 현황</th>
                    <td>
                        <select v-model="filtering.inspStatus" class="form_control size_sm_lg">
                            <option 
                                v-for="option in statusOptions"
                                :key="option.value"
                                :value="option.value"
                            >   
                                {{ option.label }}
                            </option>
                        </select>
                    </td>
                    <th></th>
                    <!-- 교육 실시일자 -->
                    <td>
                        <!-- <DatepickerRange /> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="inner">
        <div class="button_box">
            <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(sheet)">엑셀 다운로드</button>

            <button type="button" class="btn btn_sm btn_excel" @click="reportBtn">Report</button>
            <div class="fr">
                <button type="button" class="btn btn_md btn_darkblue btn_outline" v-if="write" @click="writeBtn">등록</button>
                <button type="button" class="btn btn_md btn_darkgray btn_outline" v-if="unuse" @click="deleteBtn">삭제</button>
            </div>
        </div>
        <div class="ib_wrap" :style="{height: 'calc(100vh - 350px)'}">
            <div id="eduPlanListSheet" class="ibsheet_table" style="height: 100%"></div>
        </div>        
    </div>

    <!-- 교육 훈련 계획 등록 팝업 -->
    <b-modal id="EduplanWrite" title="교육 훈련 계획 등록" 
        hide-backdrop size="lg" scrollable
    >
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <strong>{{filtering.eduYear}}년 교육훈련</strong>
                </div>
                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>현장명</th>
                                <td colspan="3">[{{ siteId }}]{{ siteNm }}</td>
                            </tr>
                            <tr>
                                <th>프로젝트명</th>
                                <td colspan="3">[{{ projectId }}]{{ projectNm }}</td>
                            </tr>
                            <tr>
                                <th>본부</th>
                                <td>{{ baseTypeNm }}</td>
                                <th>공사유형</th>
                                <td>{{csrtTypeNm}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>계획</strong>
                </div>
                <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">공종/종류</span></th>
                                <td>
                                    <div class="form_select">
                                        <select v-model="popup.gjCode" class="form_control num">
                                            <option 
                                                v-for="option in gjCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                        <select v-model="popup.kindCode" class="form_control">
                                            <option 
                                                v-for="option in kindCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <th><span class="emp_red">구분</span></th>
                                <td>
                                    <select v-model="popup.eduType" class="form_control num">
                                        <option 
                                            v-for="option in gubunCodePopupOptions"
                                            :key="option.value"
                                            :value="option.value"
                                        >   
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육 과정명</span></th>
                                <td><input type="text" class="form_control" v-model="eduCourseName"></td>
                                <th><span class="emp_red">강사</span></th>
                                <td>
                                    <!-- <div class="btn_wrap">
                                        <input type="text" class="form_control" placeholder="외부 강사일 경우 텍스트 입력하세요">
                                        <button class="btn btn_sm btn_radius btn_darkblue">검색</button>
                                    </div> -->
                                    <div class="form_select">
                                        <select v-model="eduMainType" class="form_control num">
                                            <option value="1">내부</option>
                                            <option value="2">외부</option>
                                        </select>
                                        <div class="search_area" v-if="eduMainType === '1'">
                                            <input type="text" placeholder="검색" class="form_control" v-model="eduTcher">
                                            <button type="button" class="btn_search" @click="employeeClick">검색</button>
                                        </div>
                                        <div class="search_area" v-else-if="eduMainType === '2'">
                                            <input type="text" class="form_control" v-model="eduTcher" placeholder="외부 강사일 경우 텍스트 입력하세요"/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육 목적</span></th>
                                <td><input type="text" class="form_control" v-model="eduPurps"></td>
                                <th><span class="emp_red">계획일자</span></th>
                                <td>
                                    <DatePickerRange ref="datepicker_plan_range" v-model="datePlanDt" :format="'YYYYMMDD'"/>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육 대상</span></th>
                                <td colspan="3">
                                    <label for="rBox1" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox1" value="1" v-model="eduTargetType">
                                        <span class="label_text">관리자</span>
                                    </label>
                                    <label for="rBox2" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox2" value="2" v-model="eduTargetType">
                                        <span class="label_text">작업자</span>
                                    </label>
                                    <label for="rBox3" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox3" value="3" v-model="eduTargetType">
                                        <span class="label_text">기타</span>
                                    </label>

                                    <input type="text" class="form_control num ml20" v-model="eduTargetComment" :disabled="isEditing">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>실적</strong>
                </div>
                    <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>실시일자</th>
                                <td v-if="isEdit === true">
                                    <input type="text" class="form_control" :disabled="isEdit"/>
                                </td>
                                <td v-else>
                                    <DatePickerRange ref="datepicker_insp_range" v-model="dateInspDt" :format="'YYYYMMDD'"/>
                                </td>
                                <th>대상/참석</th>
                                <td>
                                    <input type="text" class="form_control small" v-model="eduTargetNum" :disabled="isEdit"><small>명</small>
                                    <input type="text" class="form_control small" v-model="eduAtdrnNum" :disabled="isEdit"><small>명</small>
                                </td>
                            </tr>
                            <tr>
                                <th>장소/시간</th>
                                <td>
                                    <input type="text" class="form_control medium" v-model="eduPlace" :disabled="isEdit"><small>/</small>
                                    <input type="text" class="form_control small" v-model="eduTime" :disabled="isEdit"><small>시간</small>
                                </td>
                                <th>소요M/H</th>
                                <td>
                                    <input type="text" class="form_control" v-model="eduReqreNum" :disabled="isEdit">
                                </td>
                            </tr>
                            <tr>
                                <th>교육내용</th>
                                <td colspan="3">
                                    <textarea class="form_control" v-model="eduContent" :disabled="isEdit"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>교육결과/ <br> 기대효과</th>
                                <td colspan="3">
                                    <textarea class="form_control" v-model="eduEffect" :disabled="isEdit"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>교육 교재 업로드</strong>
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkblue" @click="textBookAdd">타프로젝트 교육교재 검색</button>
                    </div>
                </div>

                <LstFile 
                    :downloadable="true"
                    :files="files"
                    :lstFileRst="lstFiles"
                    :secondRemoveFileId="secondRemoveFileId"
                    :limit-total-file-size="1024*1024*300"
                    @file-removed="removed"
                />

                <div class="button_box">
                    <strong>기타 자료 업로드 (참석자 명단, 설문지 등)</strong>
                </div>

                <LstFile 
                    :downloadable="true"
                    :files="subFiles"
                    :secondRemoveFileId="secondRemoveFileId"
                    :limit-total-file-size="1024*1024*300"
                    @file-removed="removed"
                />
            </div>
        </template>
        <template #modal-footer>
            <b-button class="btn btn_md btn_outline btn_darkgray" v-if="write" @click="eduPlanWriteBtn">등록</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="closeBtn">취소</b-button>
        </template>
    </b-modal>

    <!-- 교육 훈련 실시 등록 팝업 -->
    <b-modal id="EduplanWrite2" title="교육 훈련 실시 등록" 
        hide-backdrop size="lg" scrollable
    >
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <strong>교육훈련</strong>
                </div>
                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>현장명</th>
                                <td colspan="3">[{{ siteId }}]{{ siteNm }}</td>
                            </tr>
                            <tr>
                                <th>프로젝트명</th>
                                <td colspan="3">[{{ projectId }}]{{ projectNm }}</td>
                            </tr>
                            <tr>
                                <th>본부</th>
                                <td>{{ baseTypeNm }}</td>
                                <th>공사유형</th>
                                <td>{{ csrtTypeNm }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>계획</strong>
                </div>
                <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>공종/종류</th>
                                <td>
                                    <div class="form_select">
                                        <select v-model="detail.gjCode" class="form_control num" disabled>
                                            <option 
                                                v-for="option in gjCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                        <select v-model="detail.kindCode" class="form_control" disabled>
                                            <option 
                                                v-for="option in kindCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <th>구분</th>
                                <td>
                                    <select v-model="detail.eduType" class="form_control num" disabled>
                                        <option 
                                            v-for="option in gubunCodePopupOptions"
                                            :key="option.value"
                                            :value="option.value"
                                        >   
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>교육 과정명</th>
                                <td>{{ detail.eduCourseName }}</td>
                                <th>강사</th>
                                <td>
                                    <div class="form_select">
                                        <select v-model="detail.eduMainType" class="form_control num" disabled>
                                            <option value="1">내부</option>
                                            <option value="2">외부</option>
                                        </select>
                                        <div class="search_area" v-if="detail.eduMainType === '1'">
                                            <input type="text" placeholder="검색" class="form_control" v-model="detail.eduTcher" disabled>
                                        </div>
                                        <div class="search_area" v-else-if="detail.eduMainType === '2'">
                                            <input type="text" class="form_control" v-model="detail.eduTcher" placeholder="외부 강사일 경우 텍스트 입력하세요" disabled/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>교육 목적</th>
                                <td>{{ detail.eduPurps }}</td>
                                <th>계획일자</th>
                                <td>
                                    {{ detail.eduPlanStartDt }} ~ {{ detail.eduPlanEndDt }}
                                </td>
                            </tr>
                            <tr>
                                <th>교육 대상</th>
                                <td colspan="3">
                                    <label for="rBox1" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox1" value="1" v-model="detail.eduTargetType" disabled>
                                        <span class="label_text">관리자</span>
                                    </label>
                                    <label for="rBox2" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox2" value="2" v-model="detail.eduTargetType" disabled>
                                        <span class="label_text">작업자</span>
                                    </label>
                                    <label for="rBox3" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox3" value="3" v-model="detail.eduTargetType" disabled>
                                        <span class="label_text">기타</span>
                                    </label>

                                    <input type="text" class="form_control num ml20" v-model="detail.eduTargetComment" disabled>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>실적</strong>
                </div>
                    <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">실시일자</span></th>
                                <td>
                                    <DatePickerRange ref="datepicker_insp_range" v-model="dateInspDt" :format="'YYYYMMDD'"/>
                                </td>
                                <th><span class="emp_red">대상/참석</span></th>
                                <td>
                                    <input type="text" class="form_control small" v-model="eduTargetNum"><small>명</small>
                                    <input type="text" class="form_control small" v-model="eduAtdrnNum"><small>명</small>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">장소/시간</span></th>
                                <td>
                                    <input type="text" class="form_control medium" v-model="eduPlace"><small>/</small>
                                    <input type="text" class="form_control small" v-model="eduTime"><small>시간</small>
                                </td>
                                <th>소요M/H</th>
                                <td>
                                    <input type="text" class="form_control" v-model="eduReqreNum">
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육내용</span></th>
                                <td colspan="3">
                                    <textarea class="form_control" v-model="eduContent"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육결과/ <br> 기대효과</span></th>
                                <td colspan="3">
                                    <textarea class="form_control" v-model="eduEffect"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>교육 교재 업로드</strong>
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkblue" @click="textBookAdd">타프로젝트 교육교재 검색</button>
                    </div>
                </div>

                <LstFile 
                    :downloadable="true"
                    :files="files"
                    :lstFileRst="uploadFiles"
                    :secondRemoveFileId="secondRemoveFileId"
                    :limit-total-file-size="1024*1024*300"
                    @file-removed="removed"
                />

                <div class="button_box">
                    <strong>기타 자료 업로드 (참석자 명단, 설문지 등) </strong>
                </div>

                <LstFile 
                    :downloadable="true"
                    :files="subFiles"
                    :lstFileRst="uploadSubFiles"
                    :secondRemoveFileId="secondRemoveFileId"
                    :limit-total-file-size="1024*1024*300"
                    @file-removed="removed"
                />
            </div>
        </template>
        <template #modal-footer>
            <b-button class="btn btn_md btn_outline btn_darkgray" v-if="write" @click="eduActiveChangeBtn">등록</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="closeBtn">취소</b-button>
        </template>
    </b-modal>

    <!-- 교육 훈련 계획/실시 상세 팝업 -->
    <b-modal id="EduplanWrite3" title="교육 훈련 계획/실시 상세" 
        hide-backdrop size="lg" scrollable
    >
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <strong>{{filtering.eduYear}}년 교육훈련</strong>
                </div>
                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>현장명</th>
                                <td colspan="3">[{{ siteId }}]{{ siteNm }}</td>
                            </tr>
                            <tr>
                                <th>프로젝트명</th>
                                <td colspan="3">[{{ projectId }}]{{ projectNm }}</td>
                            </tr>
                            <tr>
                                <th>본부</th>
                                <td>{{ baseTypeNm }}</td>
                                <th>공사유형</th>
                                <td>{{csrtTypeNm}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>계획</strong>
                </div>
                <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>공종/종류</th>
                                <td>
                                    <div class="form_select" >
                                        <select v-model="detail.gjCode" class="form_control num" :disabled="true">
                                            <option 
                                                v-for="option in gjCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                        <select v-model="detail.kindCode" class="form_control" :disabled="true">
                                            <option 
                                                v-for="option in kindCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <th>구분</th>
                                <td>
                                    <select v-model="detail.eduType" class="form_control num" :disabled="true">
                                        <option 
                                            v-for="option in gubunCodePopupOptions"
                                            :key="option.value"
                                            :value="option.value"
                                        >   
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>교육 과정명</th>
                                <td>{{ detail.eduCourseName }}</td>
                                <th>강사</th>
                                <td>
                                    <!-- <div class="btn_wrap">
                                        <input type="text" class="form_control" placeholder="외부 강사일 경우 텍스트 입력하세요">
                                        <button class="btn btn_sm btn_radius btn_darkblue">검색</button>
                                    </div> -->
                                    <div class="form_select">
                                        <select v-model="detail.eduMainType" class="form_control num" :disabled="true">
                                            <option value="1">내부</option>
                                            <option value="2">외부</option>
                                        </select>
                                        <input type="text" class="form_control" v-model="detail.eduTcher" placeholder="외부 강사일 경우 텍스트 입력하세요" :disabled="isDisabled"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>교육 목적</th>
                                <td>{{ detail.eduPurps }}</td>
                                <th>계획일자</th>
                                <td>{{ detail.eduPlanStartDt }} ~ {{ detail.eduPlanEndDt }}</td>
                            </tr>
                            <tr>
                                <th>교육 대상</th>
                                <td colspan="3">
                                    <label for="" class="input_radio">
                                        <input type="radio" name="eduTargetType" value="1" v-model="detail.eduTargetType" :disabled="true">
                                        <span class="label_text">관리자</span>
                                    </label>
                                    <label for="" class="input_radio">
                                        <input type="radio" name="eduTargetType" value="2" v-model="detail.eduTargetType" :disabled="true">
                                        <span class="label_text">작업자</span>
                                    </label>
                                    <label for="" class="input_radio">
                                        <input type="radio" name="eduTargetType" value="3" v-model="detail.eduTargetType" :disabled="true">
                                        <span class="label_text">기타</span>
                                    </label>

                                    <input type="text" class="form_control num ml20" v-model="detail.eduTargetComment" :disabled="true">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>실적</strong>
                </div>
                    <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>실시일자</th>
                                <td>{{ detail.eduInspStartDt }} ~ {{ detail.eduInspEndDt }}</td>
                                <th>대상/참석</th>
                                <td>{{ detail.eduTargetNum }}명 / {{ detail.eduAtdrnNum }}명</td>
                            </tr>
                            <tr>
                                <th>장소/시간</th>
                                <td>{{ detail.eduPlace }} / {{ detail.eduTime }}시간</td>
                                <th>소요M/H</th>
                                <td>{{ detail.eduReqreNum }}</td>
                            </tr>
                            <tr>
                                <th>교육내용</th>
                                <td colspan="3">
                                    <pre class="form_control">{{ detail.eduContent }}</pre>
                                </td>
                            </tr>
                            <tr>
                                <th>교육결과/ <br> 기대효과</th>
                                <td colspan="3"><pre class="form_control">{{ detail.eduEffect }}</pre></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>교육 교재 업로드</strong>
                    <!-- <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkblue" v-b-modal.TextbookAdd>타프로젝트 교육교재 추가</button>
                    </div> -->
                </div>
                <hr>

                <!-- <div class="lst_file w100">
                    <h3>첨부파일 2개 (6.2MB)</h3>
                    <ul>
                        <li><a href="javascript:void(0);"><i class="ico_file file_jpg">교육교재.jpg (3.1MB)</i></a></li>
                    </ul>
                </div> -->

                <LstFile 
                    :downloadable="true"
                    :lstFileRst="uploadFiles"
                    :uploadable="false"
                />

                <div class="button_box">
                    <strong>기타 자료 업로드 (참석자 명단, 설문지 등)</strong>
                </div>  
                <hr>

                <!-- <div class="lst_file w100">
                    <h3>첨부파일 2개 (6.2MB)</h3>
                    <ul>
                        <li><a href="javascript:void(0);"><i class="ico_file file_jpg">교육교재.jpg (3.1MB)</i></a></li>
                    </ul>
                </div> -->

                <LstFile 
                    :downloadable="true"
                    :lstFileRst="uploadSubFiles"
                    :uploadable="false"
                />

            </div>
        </template>
        <template #modal-footer>
            <b-button class="btn btn_md btn_outline btn_darkgray" v-if="write" @click="updateModalOpen">수정</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="closeBtn">닫기</b-button>
        </template>
    </b-modal>
    <!-- 교육 훈련 계획 수정팝업 -->

    <b-modal id="EduplanUpdate" title="교육 훈련 계획/실시 수정" 
        hide-backdrop size="lg"
    >
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <strong>{{filtering.eduYear}}년 교육훈련</strong>
                </div>
                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>현장명</th>
                                <td colspan="3">[{{ siteId }}]{{ siteNm }}</td>
                            </tr>
                            <tr>
                                <th>프로젝트명</th>
                                <td colspan="3">[{{ projectId }}]{{ projectNm }}</td>
                            </tr>
                            <tr>
                                <th>본부</th>
                                <td>{{ baseTypeNm }}</td>
                                <th>공사유형</th>
                                <td>{{csrtTypeNm}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>계획</strong>
                </div>
                <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">공종/종류</span></th>
                                <td v-if="isChanged">
                                    <div class="form_select" >
                                        <select v-model="detail.gjCode" class="form_control num">
                                            <option 
                                                v-for="option in gjCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                        <select v-model="detail.kindCode" class="form_control">
                                            <option 
                                                v-for="option in kindCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td v-else>
                                    <div class="form_select" >
                                        <select v-model="detail.gjCode" class="form_control num" :disabled="true">
                                            <option 
                                                v-for="option in gjCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                        <select v-model="detail.kindCode" class="form_control" :disabled="true">
                                            <option 
                                                v-for="option in kindCodePopupOptions"
                                                :key="option.value"
                                                :value="option.value"
                                            >   
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <th><span class="emp_red">구분</span></th>
                                <td v-if="isChanged">
                                    <select v-model="detail.eduType" class="form_control num">
                                        <option 
                                            v-for="option in gubunCodePopupOptions"
                                            :key="option.value"
                                            :value="option.value"
                                        >   
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                                <td v-else>
                                    <select v-model="detail.eduType" class="form_control num" :disabled="true">
                                        <option 
                                            v-for="option in gubunCodePopupOptions"
                                            :key="option.value"
                                            :value="option.value"
                                        >   
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red" >교육 과정명</span></th>
                                <td v-if="isChanged"><input type="text" class="form_control" v-model="detail.eduCourseName"></td>
                                <td v-else> {{ detail.eduCourseName }} </td>
                                <th><span class="emp_red">강사</span></th>
                                <td v-if="isChanged">
                                    <!-- <div class="btn_wrap">
                                        <input type="text" class="form_control" placeholder="외부 강사일 경우 텍스트 입력하세요">
                                        <button class="btn btn_sm btn_radius btn_darkblue">검색</button>
                                    </div> -->
                                    <div class="form_select">
                                        <select v-model="detail.eduMainType" class="form_control num">
                                            <option value="1">내부</option>
                                            <option value="2">외부</option>
                                        </select>
                                        <div class="search_area" v-if="detail.eduMainType === '1'">
                                            <input type="text" placeholder="검색" class="form_control" v-model="detail.eduTcher">
                                            <button type="button" class="btn_search" @click="employeeClick">검색</button>
                                        </div>
                                        <div class="search_area" v-else-if="detail.eduMainType === '2'">
                                            <input type="text" class="form_control" v-model="detail.eduTcher" placeholder="외부 강사일 경우 텍스트 입력하세요" />
                                        </div>
                                    </div>
                                </td>
                                <td v-else>{{ detail.eduTcher }}</td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육 목적</span></th>
                                <td v-if="isChanged"><input type="text" class="form_control" v-model="detail.eduPurps"></td>
                                <td v-else>{{ detail.eduPurps }}</td>
                                <th><span class="emp_red">계획일자</span></th>
                                <td v-if="isChanged">
                                    <DatePickerRange ref="datepicker_plan_range" v-model="datePlanDt" :format="'YYYYMMDD'"/>
                                </td>
                                <td v-else> {{ detail.eduPlanStartDt }} ~ {{ detail.eduPlanEndDt }} </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육 대상</span></th>
                                <td colspan="3" v-if="isChanged">
                                    <label for="rBox1" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox1" value="1" v-model="detail.eduTargetType">
                                        <span class="label_text">관리자</span>
                                    </label>
                                    <label for="rBox2" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox2" value="2" v-model="detail.eduTargetType">
                                        <span class="label_text">작업자</span>
                                    </label>
                                    <label for="rBox3" class="input_radio">
                                        <input type="radio" name="eduTargetType" id="rBox3" value="3" v-model="detail.eduTargetType">
                                        <span class="label_text">기타</span>
                                    </label>

                                    <input type="text" class="form_control num ml20" v-model="detail.eduTargetComment" :disabled="isEditing">
                                </td>
                                <td colspan="3" v-else>{{ detail.eduTargetType }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>실적</strong>
                </div>
                    <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">실시일자</span></th>
                                <td v-if="!isChanged">
                                    <DatePickerRange ref="datepicker_insp_range" v-model="dateInspDt" :format="'YYYYMMDD'"/>
                                </td>
                                <td v-else>
                                    {{ detail.eduInspStartDt }} ~ {{ detail.eduInspEndDt }}
                                </td>
                                <th><span class="emp_red">대상/참석</span></th>
                                <td v-if="!isChanged">
                                    <input type="text" class="form_control small" v-model="detail.eduTargetNum"><small>명</small>
                                    <input type="text" class="form_control small" v-model="detail.eduAtdrnNum"><small>명</small>
                                </td>
                                <td v-else>{{ detail.eduTargetNum }}명 / {{ detail.eduAtdrnNum }}명</td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">장소/시간</span></th>
                                <td v-if="!isChanged">
                                    <input type="text" class="form_control medium" v-model="detail.eduPlace"><small>/</small>
                                    <input type="text" class="form_control small" v-model="detail.eduTime"><small>시간</small>
                                </td>
                                <td v-else>{{ detail.eduPlace }} / {{ detail.eduTime }}시간</td>
                                <th>소요M/H</th>
                                <td v-if="!isChanged">
                                    <input type="text" class="form_control" v-model="detail.eduReqreNum">
                                </td>
                                <td v-else>{{ detail.eduReqreNum }}</td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육내용</span></th>
                                <td colspan="3" v-if="!isChanged">
                                    <textarea class="form_control" v-model="detail.eduContent"></textarea>
                                </td>
                                <td colspan="3" v-else>
                                    <pre class="form_control">{{ detail.eduContent }}</pre>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">교육결과/ <br> 기대효과</span></th>
                                <td colspan="3" v-if="!isChanged">
                                    <textarea class="form_control" v-model="detail.eduEffect"></textarea>
                                </td>
                                <td colspan="3" v-else><pre class="form_control">{{ detail.eduEffect }}</pre></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>교육 교재 업로드</strong>
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkblue" @click="textBookAdd">타프로젝트 교육교재 검색</button>
                    </div>
                </div>

                <LstFile 
                    :downloadable="true"
                    :files="files"
                    :lstFileRst="uploadFiles"
                    :secondRemoveFileId="secondRemoveFileId"
                    :limit-total-file-size="1024*1024*300"
                    @file-removed="removed"
                />

                <div class="button_box">
                    <strong>기타 자료 업로드 (참석자 명단, 설문지 등)</strong>
                </div>

                <LstFile 
                    :downloadable="true"
                    :files="subFiles"
                    :lstFileRst="uploadSubFiles"
                    :secondRemoveFileId="secondRemoveFileId"
                    :limit-total-file-size="1024*1024*300"
                    @file-removed="removed"
                />
            </div>
        </template>
        <template #modal-footer>
            <b-button class="btn btn_md btn_outline btn_darkgray" v-if="isChanged && change" @click="eduPlanUpdateBtn">수정</b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" v-else-if="change" @click="eduActiveUpdateBtn">수정</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="closeBtn">취소</b-button>
        </template>
    </b-modal>

    <!-- 타프로젝트 교육교재 팝업 -->
    <b-modal id="TextbookAdd" title="타프로젝트 교육교재 추가" 
    hide-backdrop size="lg" scrollable
    >
        <template #default>
            <div class="pop_container">
                <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="6%">
                        <col width="20%">
                        <col width="12%">
                        <col width="20%">
                        <col width="6%">
                        <col width="20%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>본부</th>   
                            <td>
                                <select name="" id="" class="form_control">
                                    <option value="">전체</option>
                                </select>
                            </td>        
                            <th>프로젝트명</th>
                            <td><input type="text" class="form_control" v-model="popUp.projectNm" placeholder="입력해주세요" @keyup.enter="searchPjData(false)"></td>
                            <th>공종</th>   
                            <td class="p0">
                                <select v-model="popUp.gjCode" class="form_control">
                                    <option 
                                        v-for="option in gjCodeOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >   
                                        {{ option.label }}
                                    </option>
                                </select>
                            </td>    
                            <td class="ar">
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchPjData(false)">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>종류</th>   
                            <td>
                                <select v-model="popUp.kindCode" class="form_control">
                                    <option 
                                        v-for="option in kindCodeOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >   
                                        {{ option.label }}
                                    </option>
                                </select>
                            </td>        
                            <th>교육과정명</th>
                            <td><input type="text" class="form_control" v-model="popUp.eduCourseName" placeholder="입력해주세요" @keyup.enter="searchPjData(false)"></td>
                            <th>대상</th>
                            <td>
                                <select v-model="popUp.eduTargetType" class="form_control size_sm_lg">
                                    <option 
                                        v-for="option in eduTargetTypeOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >   
                                        {{ option.label }}
                                    </option>
                                </select>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="searchPjData(true)">초기화</button>
                            </td> 
                        </tr>

                    </tbody>
                </table>
                </div>
                <sqms-grid
                    id="eduTextBookAddSheet"
                    :columns="textBookColumns"
                    :data="textBookAddGridData"
                    :upperStyle="{'height':'calc(100vh - 360px)'}"
                    :inputStyle="{'height':'100%'}"
                    :cfg="{
                        NoVScroll: false,
                    }"
                    @init="textBookAddInitSheet"
                    @dbClick="dbClick"
                    ref="eduTextBookAddSheetRef"
                >
                </sqms-grid>
                <!-- ibsheet -->
                <!-- <div class="ib_wrap">
                    <div id="popsheetTable" class="ibsheet_table" style="max-height: 337px;"></div>
                </div> -->
            </div>
        </template>
        <template #modal-footer>
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="chooseBtn">선택</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="closePopUpBtn">닫기</b-button>
        </template>
    </b-modal>
    <EmployeeSearch
        v-on:fn-employee-choice="employeeChoice" v-bind:emplo-name="userNm"
        v-bind:insert-site-name="siteNm" v-bind:site-code="siteId"
        v-bind:empl-pop-id="emplPopId" v-bind:choose-person="choosePerson"
        v-bind:site-mstr-id=" siteMstrId"
    />
</div>
</template>

<script>
   import LstFile from '@/pages/common/popup/LstFile'
   import API from '@/apis/'
   import _ from 'lodash'
   import { EduplanList } from '@/pages/common/data/InspectionList'
   import { TextbookAdd } from '@/pages/common/data/PopupList'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import DatePickerRange from '@component/common/DatePickerRange.vue'
   import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'
   import { requestFileOptions, sendFileApi, sendPostApi } from '../../../apis/common'
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
   import loader from '@ibsheet/loader'

   export default {
        name: 'EduPlanSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            LstFile,
            DatePickerRange,
            EmployeeSearch,
        },
        data: () => ({
            columns: [], // 그리드 컬럼
		    gridData: [], // 그리드 데이터
            sheet: null, // 그리드 시트
            textBookColumns : [],
            textBookAddGridData : [],
            textBookAddSheet: null,
            isEditing: true,
            isDisabled: true,
            siteMstrId: '',
            filtering : {
                gjCode: null,
                kindCode: null,
                eduTargetType: null,
                eduYear: new Date().getFullYear(),
                eduCourseName: '',
                eduTargetComment : '',
                inspStatus : '',
                siteMstrId : '',
            },
            popup : {
                gjCode: null,
                kindCode: null,
                gubun: null,
                eduType : null
            },
            gjCodeOptions: [],
            gjCodePopupOptions: [],
            kindCodeOptions: [],
            kindCodePopupOptions: [],
            eduTargetTypeOptions: [
                { label : '전체', value: null },
                { label : '관리자', value: '1' },
                { label : '작업자', value: '2' },
                { label : '기타', value: '3' },
            ],
            gubunCodePopupOptions: [],
            statusOptions: [
                { label : '전체', value: '' },
                { label : '예정', value: 'P' },
                { label : '지연', value: 'D' },
                { label : '완료', value: 'C' },
            ],
            yeondoOptions: [
                { label : '2012', value: '2012' },
                { label : '2013', value: '2013' },
                { label : '2014', value: '2014' },
                { label : '2015', value: '2015' },
                { label : '2016', value: '2016' },
                { label : '2017', value: '2017' },
                { label : '2018', value: '2018' },
                { label : '2019', value: '2019' },
                { label : '2020', value: '2020' },
                { label : '2021', value: '2021' },
                { label : '2022', value: '2022' },
                { label : '2023', value: '2023' },
                { label : '2024', value: '2024' },
                { label : '2025', value: '2025' },
                { label : '2026', value: '2026' },
                { label : '2027', value: '2027' },
                { label : '2028', value: '2028' },
                { label : '2029', value: '2029' },
                { label : '2030', value: '2030' },
                { label : '2031', value: '2031' },
            ],
            eduMngId: '',    //교육ID
            eduMngIdList : [],
            //현장정보 파람
            siteId: '',
            siteNm: '',
            projectId: '',
            projectNm: '',
            baseTypeNm: '',
            csrtTypeNm: '',

            //등록팝업
            eduCourseName: '', //교육과정명
            eduPurps: '', //교육 목적
            eduPlanStartDt: '', //계획일자(시작)
            eduPlanEndDt: '', //계획일자(시작)
            eduTargetType: '', //1:관리자 2: 작업자 3:기타 (기타일때 isEditing false)
            eduTargetComment: '',
            eduInspStartDt: '', //실지일자(시작)
            eduInspEndDt: '', //실지일자(시작)
            eduTargetNum: '', //대상 명
            eduAtdrnNum: '', //참석 명
            eduPlace: '', //장소
            eduTime: '', //시간
            eduReqreNum: '', //소요M/H
            eduContent: '', //교육내용
            eduEffect: '', //교육결과/ 기대효과
            eduTcher: '', //강사
            eduMainType: '1',
            datePlanDt:[null,null],
            dateInspDt:[null,null],
            //상세팝업
            detail: {
                eduCourseName: '', //교육과정명
                eduPurps: '', //교육 목적
                eduPlanStartDt: '', //계획일자(시작)
                eduPlanEndDt: '', //계획일자(시작)
                eduTargetType: '', //1:관리자 2: 작업자 3:기타 (기타일때 isEditing false)
                eduTargetComment: '',
                eduInspStartDt: '', //실지일자(시작)
                eduInspEndDt: '', //실지일자(시작)
                eduTargetNum: '', //대상 명
                eduAtdrnNum: '', //참석 명
                eduPlace: '', //장소
                eduTime: '', //시간
                eduReqreNum: '', //소요M/H
                eduContent: '', //교육내용
                eduEffect: '', //교육결과/ 기대효과
                eduTcher: '', //강사
                eduMainType: '1',
                gjCode : '',
                kindCode : '',
                eduType : '',
            },
            isChanged: true,
            isEdit: true,
            isCheck : true,
            emplPopId: 'siteInfoPop',          // 팝업 선택 아이디
            userNm : '',                       //사원검색, 협력사검색
            choosePerson: '',                  //사람선택

            //파일
            files : [],
            subFiles : [],
            copyFiles : [],
            lstFileRst : [],
            uploadFiles : [],
            uploadSubFiles : [],
            lstFiles : [],
            //타프로젝트 교육교재 조회
            popUp : {
                eduCourseName: '', //교육과정명
                eduTargetType: null, //1:관리자 2: 작업자 3:기타
                eduTargetComment : '', //기타일때
                gjCode : null, //공종 코드
                kindCode : null, // 종류
                projectNm : '', //프로젝트 명
                siteMstrId : '',
            },
            ozReport:{src : '',},
            userId : '',
            unuse : false,
            write : false,
            change : false,
            down : false,
            secondRemoveFileId : [],
        }),
        watch:{
            eduTargetType: function(){
                if(this.eduTargetType === '3'){
                    this.isEditing = false
                }else{
                    this.isEditing = true
                }
            },
            'detail.eduTargetType': {
                handler: function () {
                    if(this.detail.eduTargetType === '3'){
                        this.isEditing = false
                    }else{
                        this.isEditing = true
                    }
                },
            },
           'filtering.eduTargetType':{
               handler: function() {
                   if(this.filtering.eduTargetType === '3'){
                       this.isCheck = false
                   }else{
                       this.isCheck = true
                   }
               }
           }
        },
        mounted(){
            this.userId = this.$store.getters['auth/getUserId']
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.filtering.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.popUp.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.unuse = this.checkUser(this.userId,'unuse')
            this.write = this.checkUser(this.userId,'write')
            this.change = this.checkUser(this.userId,'change')
            this.down = this.checkUser(this.userId,'down')

            this.textBookColumns = TextbookAdd.options.Cols
            this.getEduPlanListData(this.filtering)
            this.getGjCodeList()
            this.getKindCodeList()
            this.getGubunCodeList()
            this.getSiteInfoView()
        },
        methods: {
            textBookAddInitSheet (sheet){
                this.textBookAddSheet = sheet
            },
            /**
             * 타프로젝트 교육교재 추가 선택이벤트
             */
            async chooseBtn() {
                const row = this.textBookAddSheet.getFocusedRow()
                const payload = {
                    fileConnectId : item.eduMngId,
                    fileType : 'EduMngt',
                    fileSubType : 'EduMngtMtrl'
                }
                try {
                    const result = await API.concrete.loadFileInfo(payload)
                    if(result?.data){
                        // this.files.push(result.data)

                        this.lstFiles = [
                            ...result.data,
                        ]
                        this.uploadFiles = [
                            ...result.data,
                        ]
                        // this.copyFiles = {
                        //     ...result.data.fileChkEduArcvId,
                        // }

                        let temp = []
                        result.data.map(item =>{
                            temp.push(item.fileChkEduArcvId)
                        }),
                        this.copyFiles = temp
                        return this.$bvModal.hide('TextbookAdd')
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },
            /**
             * 타프로젝트 교육교재 추가 더블클릭이벤트
             */
            async dbClick(evt){
                const payload = {
                    fileConnectId : evt.row.eduMngId,
                    fileType : 'EduMngt',
                    fileSubType : 'EduMngtMtrl'
                }
                try {
                    const result = await API.concrete.loadFileInfo(payload)
                    if(result?.data){
                        // this.files.push(result.data)
                        
                        this.lstFiles = [
                            ...result.data,
                        ]
                        this.uploadFiles = [
                            ...result.data,
                        ]
                        let temp = []
                        result.data.map(item =>{
                            temp.push(item.fileChkEduArcvId)
                        }),
                        this.copyFiles = temp
                        return this.$bvModal.hide('TextbookAdd')
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },
            /**
             * 타 프로젝트 교육교재 추가 팝업
             */
            async textBookAdd() {
                this.$bvModal.show('TextbookAdd')
                this.getOtherProjectList()
            },
            async getOtherProjectList(payload = this.popUp) {
                try {
                    const response = await API.eduTraining.getOtherProjectEdu(payload)
                    if(response?.dlEduMng){
                        this.textBookAddGridData = response.dlEduMng.map(item => {
                            if(item.eduTargetType == '1'){
                                item.eduTargetType = '관리자'
                            } else if(item.eduTargetType == '2') {
                                item.eduTargetType = '작업자'
                            } else {
                                item.eduTargetType = '기타'
                            }

                            return {
                                ...item
                            }
                        }) 
                    }
                } catch (error) {
                    console.error('타 프로젝트 교육교재 조회 오류 : ', error)
                }
            },
            /**
             * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchPjData (isReset) {
                if (isReset) {
                    //타프로젝트 교육교재 조회
                    this.popUp = {
                        eduCourseName: '', //교육과정명
                        eduTargetType: null, //1:관리자 2: 작업자 3:기타
                        eduTargetComment : '', //기타일때
                        gjCode : null, //공종 코드
                        kindCode : null, // 종류
                        projectNm : '', //프로젝트 명
                    }
                }
                return await this.getOtherProjectList(this.popUp)
            },
            /**
             * 현장정보 조회
             */
            async getSiteInfoView() {
                const payload = {
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const response = await API.eduTraining.getSiteInfoView(payload)
                    if(response?.datas){
                        this.siteId = response.datas.result.siteId,
                        this.siteNm = response.datas.result.siteNm,
                        this.projectId = response.datas.result.projectId,
                        this.projectNm = response.datas.result.projectNm,
                        this.baseTypeNm = response.datas.result.baseTypeNm,
                        this.csrtTypeNm = response.datas.result.csrtTypeNm
                    }
                } catch (error) {
                    console.error('현장정보 조회 에러: ', error)
                }
            },
            /**
             * 공종 검색조건 세팅
             */
            setGjTopFilterOptions (data){
                const all = { label: '선택', value: null }
                const code = data.map(item => {
                    return {
                        label: item.codeNameKr,
                        value: item.codeVal
                    }
                })
                this.gjCodeOptions = [all, ..._.uniqBy(code, 'value')]
                this.gjCodePopupOptions = [all, ..._.uniqBy(code, 'value')]
            },
            /**
             * 종류 검색조건 세팅
             */
            setKindTopFilterOptions (data){
                const all = { label: '선택', value: null }
                const code = data.map(item => {
                    return {
                        label: item.codeNameKr,
                        value: item.codeVal
                    }
                })
                this.kindCodeOptions = [all, ..._.uniqBy(code, 'value')]
                this.kindCodePopupOptions = [all, ..._.uniqBy(code, 'value')]
            },
            /**
             * 구분 검색조건 세팅
             */
            setGubunTopFilterOptions (data){
                const all = { label: '선택', value: null }
                const code = data.map(item => {
                    return {
                        label: item.codeNameKr,
                        value: item.codeVal
                    }
                })
                this.gubunCodePopupOptions = [all, ..._.uniqBy(code, 'value')]
            },
            /**
             * 공종 검색조건 검색
             */
            async getGjCodeList() {
                const payload = {
                    groupCode : 'EDU_GJ'
                }
                try {
                    const response = await API.eduTraining.getMasterCodeList(payload)
                    if(response?.data){
                        this.setGjTopFilterOptions(response.data)
                    }
                } catch (error) {
                    console.error('공종 옵션 조회 에러: ', error)
                }
            },
            /**
             * 종류 검색조건 검색
             */
            async getKindCodeList() {
                const payload = {
                    groupCode : 'EDU_KIND'
                }
                try {
                    const response = await API.eduTraining.getMasterCodeList(payload)
                    if(response?.data){
                        this.setKindTopFilterOptions(response.data)
                    }
                } catch (error) {
                    console.error('종류 옵션 조회 에러: ', error)
                }
            },
            /**
             * 구분 검색조건 검색
             */
            async getGubunCodeList() {
                const payload = {
                    groupCode : 'EDU_TYPE'
                }
                try {
                    const response = await API.eduTraining.getMasterCodeList(payload)
                    if(response?.data){
                        this.setGubunTopFilterOptions(response.data)
                    }
                } catch (error) {
                    console.error('종류 옵션 조회 에러: ', error)
                }
            },
            /**
             * 사원 검색
             */
            employeeClick : function(){
                this.$root.$emit('bv::show::modal', 'siteInfoPop');
            },
            /**
             * 사원검색 후 이벤트
             */
            employeeChoice: function(infoEmployee) {
                this.eduTcher = infoEmployee.userNm
                this.detail.eduTcher = infoEmployee.userNm
                infoEmployee.choosePerson = ''
                return;
            },
            /**
             * API : 교육관리 리스트를 조회합니다.
             */
            async getEduPlanListData(payload = this.filtering) {
                let options = EduplanList.options
                options.Events = {
                    onRenderFirstFinish: async () => {
                        try {
                            const response = await API.eduTraining.getEduMngInfoList({
                                ...payload,
                            })
                            if(response?.dlEduMng.length > 0){
                                this.sheet.loadSearchData({
                                    data: this.mappingInitGridData(response.dlEduMng)
                                })
                            }
                        } catch (error) {
                            console.error('교육관리 리스트 조회 에러: ', error)
                        }
                    },
                    onRenderFinish: (evt) => {
                        this.renderFinish(evt)
                    },
                    // onAfterClick: (evt) => {
                    //     this.clickGrid(evt)
                    // },
                    onDblClick: () => {
                        return
                    },
                    onAfterClick: this.clickGrid,   
                }
                loader.createSheet({
                    el: 'eduPlanListSheet',
                    data : [],
                    options : options
                }).then(sheet => {
                    this.sheet = sheet
                })
            },
            /**
             * 교육정보 상세를 조회합니다.
             */
            async getEduMngInfoView(payload) {
                const param = {
                    eduMngId : payload
                }
                try {
                    const response = await API.eduTraining.getEduMngInfoView(param)
                    if(response?.dmEduMng) {
                        this.dateInspDt[0] = response.dmEduMng.eduPlanStartDt
                        this.dateInspDt[1] = response.dmEduMng.eduPlanEndDt
                        this.detail = response.dmEduMng
                        this.detail.eduPlanStartDt = response.dmEduMng.eduPlanStartDt.slice(0,4) + '-' + response.dmEduMng.eduPlanStartDt.slice(4,6) + '-' + response.dmEduMng.eduPlanStartDt.slice(6,8)
                        this.detail.eduPlanEndDt = response.dmEduMng.eduPlanEndDt.slice(0,4) + '-' + response.dmEduMng.eduPlanEndDt.slice(4,6) + '-' + response.dmEduMng.eduPlanEndDt.slice(6,8)
                        if(response?.dmEduMng.eduInspStartDt && response?.dmEduMng.eduInspEndDt){
                            this.detail.eduInspStartDt = response.dmEduMng.eduInspStartDt.slice(0,4) + '-' + response.dmEduMng.eduInspStartDt.slice(4,6) + '-' + response.dmEduMng.eduInspStartDt.slice(6,8)
                            this.detail.eduInspEndDt = response.dmEduMng.eduInspEndDt.slice(0,4) + '-' + response.dmEduMng.eduInspEndDt.slice(4,6) + '-' + response.dmEduMng.eduInspEndDt.slice(6,8)
                        }
                    }
                } catch (error) {
                    console.error('교육관리 상세 조회 에러: ', error)
                }
            },
            /**
             * 초기 그리드를 가공합니다.
             */
            mappingInitGridData(data){
                if(!data) return []

                const mappedData = data.map(row => {
                    const eduPlanDay = (
                                        row.eduPlanStartDt? 
                                        row.eduPlanStartDt.slice(2,4) + '-' + row.eduPlanStartDt.slice(4,6) + '-' + row.eduPlanStartDt.slice(6,8) : '') 
                                        + ' ~ ' + 
                                        (
                                        row.eduPlanEndDt? 
                                        row.eduPlanEndDt.slice(2,4) + '-' + row.eduPlanEndDt.slice(4,6) + '-' + row.eduPlanEndDt.slice(6,8) : '')
                    const eduInspDay = (
                                        row.eduInspStartDt? 
                                        row.eduInspStartDt.slice(2,4) + '-' + row.eduInspStartDt.slice(4,6) + '-' + row.eduInspStartDt.slice(6,8) : '') 
                                        + ' ~ ' + 
                                        (
                                        row.eduInspEndDt?
                                        row.eduInspEndDt.slice(2,4) + '-' + row.eduInspEndDt.slice(4,6) + '-' + row.eduInspEndDt.slice(6,8) : '')

                    row.eduTargetType = row.eduTargetType === '1'? '관리자' : row.eduTargetType === '2'? '작업자' : row.eduTargetComment 
                    row.eduType = row.eduType === '1'? '온라인' : '오프라인'
                    const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0].replaceAll('-','')
                    if(row.eduPlanStartDt != null && row.eduInspStartDt != null){
                        row.inspStatus = '완료'
                    }
                    if(row.eduPlanStartDt != null && row.eduInspStartDt == null){
                        row.inspStatus = '예정'
                    }
                    if(Number(row.eduPlanEndDt) < Number(today) && !row.eduInspStartDt){
                        row.inspStatus = '지연'
                    }
                    return {
                        ...row,
                        eduPlanDay,
                        eduInspDay,
                    }
                })
                return mappedData
            },
            /**
             * 그리드 로드후 이벤트
             */
            renderFinish(evt) {
                const headers = evt.sheet.getHeaderRows()
                evt.sheet.setMergeRange(headers[0], 'up1', headers[0], 'up12')

                const rows = evt.sheet.getDataRows()
                rows.forEach(row => {
                    evt.sheet.setValue(row, 'plan', '계획')
                    evt.sheet.setValue(row, 'active', '실시')
                    const rowData = evt.sheet.getRowValue(row)
                    // 교육 계획 표시
                    if(rowData.eduPlanStartDt.slice(4,6) === '01'){
                        evt.sheet.setValue(row, 'up1', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '02'){
                        evt.sheet.setValue(row, 'up2', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '03'){
                        evt.sheet.setValue(row, 'up3', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '04'){
                        evt.sheet.setValue(row, 'up4', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '05'){
                        evt.sheet.setValue(row, 'up5', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '06'){
                        evt.sheet.setValue(row, 'up6', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '07'){
                        evt.sheet.setValue(row, 'up7', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '08'){
                        evt.sheet.setValue(row, 'up8', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '09'){
                        evt.sheet.setValue(row, 'up9', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '10'){
                        evt.sheet.setValue(row, 'up10', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '11'){
                        evt.sheet.setValue(row, 'up11', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '12'){
                        evt.sheet.setValue(row, 'up12', rowData.eduPlanStartDt.slice(2,4) + '-' + rowData.eduPlanStartDt.slice(4,6) + '-' + rowData.eduPlanStartDt.slice(6,8))
                    }

                    //교육 실시 표시
                    if(rowData.eduInspStartDt.slice(4,6) === '01'){
                        evt.sheet.setValue(row, 'dw1', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '02'){
                        evt.sheet.setValue(row, 'dw2', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '03'){
                        evt.sheet.setValue(row, 'dw3', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '04'){
                        evt.sheet.setValue(row, 'dw4', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '05'){
                        evt.sheet.setValue(row, 'dw5', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '06'){
                        evt.sheet.setValue(row, 'dw6', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '07'){
                        evt.sheet.setValue(row, 'dw7', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '08'){
                        evt.sheet.setValue(row, 'dw8', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '09'){
                        evt.sheet.setValue(row, 'dw9', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '10'){
                        evt.sheet.setValue(row, 'dw10', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '11'){
                        evt.sheet.setValue(row, 'dw11', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '12'){
                        evt.sheet.setValue(row, 'dw12', rowData.eduInspStartDt.slice(2,4) + '-' + rowData.eduInspStartDt.slice(4,6) + '-' + rowData.eduInspStartDt.slice(6,8))
                    }
                    
                    if(rowData.eduPlanStartDt && !rowData.eduInspStartDt){
                       if(rowData.eduPlanStartDt.slice(4,6) === '01'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw1', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '02'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw2', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '03'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw3', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '04'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw4', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '05'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw5', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '06'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw6', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '07'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw7', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '08'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw8', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '09'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw9', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '10'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw10', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '11'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw11', '등록')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '12'){
                            if(this.write === true){
                                evt.sheet.setValue(row, 'dw12', '등록')
                            }
                        }
                    }

                    evt.sheet.refreshRow(row)  
                })
            },
            /**
             * 그리드 클릭 이벤트
             */
            async clickGrid(evt) {
                const rowData = evt.sheet.getRowValue(evt.row)
                //계획 이벤트
                if(rowData?.eduPlanStartDt) {
                    if(rowData.eduPlanStartDt.slice(4,6) === '01'){
                        if(evt.col === 'up1'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '02'){
                        if(evt.col === 'up2'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '03'){
                       if(evt.col === 'up3'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '04'){
                       if(evt.col === 'up4'){
                            this.isChanged = true   
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '05'){
                        if(evt.col === 'up5'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '06'){
                        if(evt.col === 'up6'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '07'){
                        if(evt.col === 'up7'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '08'){
                        if(evt.col === 'up8'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '09'){
                        if(evt.col === 'up9'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '10'){
                        if(evt.col === 'up10'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '11'){
                        if(evt.col === 'up11'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduPlanStartDt.slice(4,6) === '12'){
                        if(evt.col === 'up12'){
                            this.isChanged = true
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                }

                //실시 이벤트
                if(rowData?.eduInspStartDt){
                    if(rowData.eduInspStartDt.slice(4,6) === '01'){
                        if(evt.col === 'dw1'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '02'){
                        if(evt.col === 'dw2'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '03'){
                       if(evt.col === 'dw3'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '04'){
                       if(evt.col === 'dw4'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '05'){
                       if(evt.col === 'dw5'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '06'){
                        if(evt.col === 'dw6'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '07'){
                        if(evt.col === 'dw7'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '08'){
                        if(evt.col === 'dw8'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '09'){
                        if(evt.col === 'dw9'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '10'){
                        if(evt.col === 'dw10'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '11'){
                        if(evt.col === 'dw11'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                    if(rowData.eduInspStartDt.slice(4,6) === '12'){
                        if(evt.col === 'dw12'){
                            this.isChanged = false
                            this.eduMngId = rowData.eduMngId
                            this.getEduMngInfoView(rowData.eduMngId)
                            this.getFileInfoList()
                            this.$bvModal.show('EduplanWrite3')
                        }
                    }
                }else{
                    if(this.write === true){
                        if(rowData.eduPlanStartDt.slice(4,6) === '01' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw1'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '02' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw2'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '03' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw3'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '04' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw4'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '05' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw5'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '06' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw6'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '07' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw7'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '08' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw8'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '09' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw9'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '10' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw10'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '11' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw11'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                        if(rowData.eduPlanStartDt.slice(4,6) === '12' && !rowData.eduInspStartDt){
                            if(evt.col === 'dw12'){
                                this.dateInspDt[0] = rowData.eduPlanStartDt
                                this.dateInspDt[1] = rowData.eduPlanEndDt
                                this.eduMngId = rowData.eduMngId
                                this.getEduMngInfoView(rowData.eduMngId)
                                this.getFileInfoList()
                                this.$bvModal.show('EduplanWrite2')
                            }
                        }
                    }
                }


            },
            /**
             * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData (isReset) {
                if (isReset) {
                    this.filtering = {
                        gjCode: null,
                        kindCode: null, 
                        eduTargetType: null,
                        eduTargetComment : '',
                        eduYear : new Date().getFullYear(),
                        inspStatus : '',
                    }
                }

                return await this.getEduPlanListData(this.filtering)
            },
            /**
             * 등록버튼 클릭시 등록팝업 호출
             */
            async writeBtn() {
                /**
                 * 현장정보 불러오기
                 */
                this.files = []
                this.subFiles = []
                this.popup.gjCode = null
                this.popup.kindCode = null
                this.popup.gubun = null
                this.eduCourseName = ''
                this.eduMainType = '1'
                this.eduTcher = ''
                this.eduPurps = ''
                this.datePlanDt = [null,null]
                this.eduTargetType = ''
                this.$bvModal.show('EduplanWrite')


            },
            async deleteBtn() {
                const checkedRows = this.sheet.getRowsByChecked('isCheck')

                if(!checkedRows?.length) return this.alert('삭제할 교육을 선택해주세요.')
                checkedRows.map(row => {
                    this.eduMngIdList.push(row.eduMngId)
                })
                
                this.confirm('선택한 교육을 삭제하시겠습니까?', async () => {

                    const payload = {
                        eduMngIds : this.eduMngIdList
                    }
                    try {
                        const result = await API.eduTraining.getEduMngInfoListUnuse(
                            payload
                        )
                        if(result.count > 0){
                            this.alert('삭제하였습니다')
                            this.eduMngIdList = []
                            return this.getEduPlanListData(this.filtering)
                        }else{
                            this.alert('삭제를 실패하였습니다')
                        }
                    } catch (error) {
                        console.error(error)
                        this.eduMngIdList = []
                        return this.alert('교육 삭제에 실패하였습니다.')
                    }
                })
            },
            async eduPlanWriteBtn() {
                if(this.popup.gjCode === null || this.popup.gjCode == '') {
                    return this.alert("공종을 선택하여주세요.")
                }else if(this.popup.kindCode === null || this.popup.kindCode == '') {
                    return this.alert("종류를 선택하여주세요.")
                }else if(this.popup.eduType === null || this.popup.eduType == '') {
                    return this.alert("구분을 선택하여주세요")
                }else if(this.eduCourseName === '' || this.eduCourseName == null) {
                    return this.alert("교육과정명을 입력하여주세요.")
                }else if(this.eduTcher === '' || this.eduTcher == null) {
                    return this.alert("강사명을 입력하여주세요.")
                }else if(this.eduPurps === '' || this.eduPurps == null) {
                    return this.alert("교육목적을 입력하여주세요.")
                }else if((this.datePlanDt[0] === null || this.datePlanDt[0] == '')&& (this.datePlanDt[1] === null || this.datePlanDt[1] == '')) {
                    return this.alert("계획일자를 선택하여주세요.")
                }else if(this.eduTargetType === '' || this.eduTargetType == null) {
                    return this.alert("교육대상을 선택하여주세요.")
                }
                const payload = {
                    ...this.popup,
                    eduCourseName: this.eduCourseName, //교육과정명
                    eduPurps: this.eduPurps, //교육 목적
                    eduPlanStartDt: this.$moment(this.datePlanDt[0]).format('YYYYMMDD'), //계획일자(시작)
                    eduPlanEndDt: this.$moment(this.datePlanDt[1]).format('YYYYMMDD'), //계획일자(시작)
                    eduTargetType: this.eduTargetType, //1:관리자 2: 작업자 3:기타 (기타일때 isEditing false)
                    eduTargetComment: this.eduTargetComment,
                    eduInspStartDt: this.$moment(this.dateInspDt[0]).format('YYYYMMDD'), //실지일자(시작)
                    eduInspEndDt: this.$moment(this.dateInspDt[1]).format('YYYYMMDD'), //실지일자(시작)
                    eduTargetNum: this.eduTargetNum, //대상 명
                    eduAtdrnNum: this.eduAtdrnNum, //참석 명
                    eduPlace: this.eduPlace, //장소
                    eduTime: this.eduTime, //시간
                    eduReqreNum: this.eduReqreNum, //소요M/H
                    eduContent: this.eduContent, //교육내용
                    eduEffect: this.eduEffect, //교육결과/ 기대효과
                    eduTcher: this.eduTcher, //강사
                    eduMainType: this.eduMainType,
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                this.confirm('교육 훈련 계획을 등록하시겠습니까?', async () => {
                    try {
                        const result = await API.eduTraining.getEduMngPlanWrite(payload)
                        if(result.count > 0){
                            if(this.copyFiles.length > 0) {
                                let fileChkEduArcvIds = {
                                    fileChkEduArcvIds : this.copyFiles,
                                    fileConnectId : result.eduMngId
                                }
                                const cFiles = await API.eduTraining.copyFiles(fileChkEduArcvIds)
                                if(cFiles.count > 0){
                                    const sPayload = {
                                        eduMngId: result.eduMngId,
                                        tchmtrFileConnectId: result.eduMngId,
                                    }
                                    await API.eduTraining.getEduMngPlanChange(sPayload)
                                }
                            }
                            if(this.files.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                const resultFile = await sendFileApi(
                                    result.eduMngId, // fileConnectId
                                    'EduMngt', // fileType
                                    this.files, // files
                                    'EduMngtMtrl'
                                )
                                if(resultFile.status === 200){
                                    const sPayload = {
                                        eduMngId: result.eduMngId,
                                        tchmtrFileConnectId: result.eduMngId,
                                    }
                                    await API.eduTraining.getEduMngPlanChange(sPayload)
                                }
                            }

                            if(this.subFiles.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                const resultFile = await sendFileApi(
                                    result.eduMngId, // fileConnectId
                                    'EduMngt', // fileType
                                    this.subFiles, // files
                                    'EduMngtEtc'
                                )
                                if(resultFile.status === 200){
                                    const sPayload = {
                                        eduMngId:result.eduMngId,
                                        etcFileConnectId: result.eduMngId,
                                    }
                                    await API.eduTraining.getEduMngPlanChange(sPayload)
                                }
                            }
                            this.$bvModal.hide('EduplanWrite')
                            this.getEduPlanListData(this.filtering)
                            this.copyFiles = []
                            this.files = []
                            this.subFiles = []
                            return this.alert("교육 훈련 계획을 등록하였습니다.")
                        }else{
                            this.alert("교육 훈련 계획을 등록에 실패하였습니다.")
                        }
                    } catch (error) {
                        console.error(error)
                        return this.alert('교육 훈련 계획을 등록에 실패하였습니다.')
                    }
                })
            },
            async eduActiveChangeBtn() {
                
                //validation check 추가
                if((this.dateInspDt[0] === null || this.dateInspDt[0] == '')&& (this.dateInspDt[1] === null|| this.dateInspDt[1] == '')) {
                    return this.alert("교육 실시일자를 선택하여주세요.")
                }else if(this.eduTargetNum == null || this.eduTargetNum == ''){
                    return this.alert("대상자 수를 입력해주세요")    
                }else if(this.eduAtdrnNum == null || this.eduAtdrnNum == ''){
                    return this.alert("참석자 수를 입력해주세요")    
                }else if(this.eduPlace == null || this.eduPlace == ''){
                    return this.alert("장소를 입력해주세요")    
                }else if(this.eduTime == null || this.eduTime == ''){
                    return this.alert("시간을 입력해주세요")    
                }else if(this.eduContent == null || this.eduContent == ''){
                    return this.alert("교육내용을 입력해주세요")    
                }else if(this.eduEffect == null || this.eduEffect == ''){
                    return this.alert("교육결과/기대효과를 입력해주세요")    
                }

                const payload = {
                    eduMngId : this.eduMngId,
                    eduInspStartDt: this.$moment(this.dateInspDt[0]).format('YYYYMMDD'), //실지일자(시작)
                    eduInspEndDt: this.$moment(this.dateInspDt[1]).format('YYYYMMDD'), //실지일자(시작)
                    eduTargetNum: this.eduTargetNum, //대상 명
                    eduAtdrnNum: this.eduAtdrnNum, //참석 명
                    eduPlace: this.eduPlace, //장소
                    eduTime: this.eduTime, //시간
                    eduReqreNum: this.eduReqreNum, //소요M/H
                    eduContent: this.eduContent, //교육내용
                    eduEffect: this.eduEffect, //교육결과/ 기대효과
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                this.confirm('교육 훈련 실시를 등록하시겠습니까?', async () => {
                    try {
                        const result = await API.eduTraining.getEduMngInspChange(payload)
                        if(result.count > 0){

                            if(this.copyFiles.length > 0) {
                                let fileChkEduArcvIds = {
                                    fileChkEduArcvIds : this.copyFiles,
                                    fileConnectId : result.eduMngId
                                }
                                await API.eduTraining.copyFiles(fileChkEduArcvIds)
                            }
                            if(this.files.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                await sendFileApi(
                                    result.eduMngId, // fileConnectId
                                    'EduMngt', // fileType
                                    this.files, // files
                                    'EduMngtMtrl'
                                )
                            }

                            if(this.subFiles.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                await sendFileApi(
                                    result.eduMngId, // fileConnectId
                                    'EduMngt', // fileType
                                    this.subFiles, // files
                                    'EduMngtEtc'
                                )
                            }
                            this.copyFiles = []
                            this.files = []
                            this.subFiles = []
                            this.uploadFiles = []
                            this.uploadSubFiles = []
                            this.eduMngId = '',
                            this.eduInspStartDt = '', //실지일자(시작)
                            this.eduInspEndDt = '', //실지일자(시작)
                            this.eduTargetNum = '', //대상 명
                            this.eduAtdrnNum = '', //참석 명
                            this.eduPlace = '', //장소
                            this.eduTime = '', //시간
                            this.eduReqreNum = '', //소요M/H
                            this.eduContent = '', //교육내용
                            this.eduEffect = '' //교육결과/ 기대효과

                            this.$bvModal.hide('EduplanWrite2')
                            this.alert("교육 훈련 실시를 등록하였습니다.")
                            return this.getEduPlanListData(this.filtering)
                        }else{
                            this.alert("교육 훈련 실시 등록에 실패하였습니다.")
                        }
                    } catch (error) {
                        console.error(error)
                        return this.alert('교육 훈련 실시 등록에 실패하였습니다.')
                    }
                })
            },

            async updateModalOpen() {
                this.getFileInfoList()
                this.datePlanDt[0] = this.detail.eduPlanStartDt
                this.datePlanDt[1] = this.detail.eduPlanEndDt
                this.dateInspDt[0] = this.detail.eduInspStartDt
                this.dateInspDt[1] = this.detail.eduInspEndDt
                this.$bvModal.show('EduplanUpdate')
                this.$bvModal.hide('EduplanWrite3')
            },
            async eduPlanUpdateBtn(){
                if(this.detail.gjCode === null) {
                    return this.alert("공종을 선택하여주세요.")
                }else if(this.detail.kindCode === null) {
                    return this.alert("종류를 선택하여주세요.")
                }else if(this.detail.eduType === null) {
                    return this.alert("구분을 선택하여주세요")
                }else if(this.detail.eduCourseName === '') {
                    return this.alert("교육과정명을 입력하여주세요.")
                }else if(this.detail.eduMainType === '1' || this.detail.eduMainType === '2') {
                    if(this.detail.eduTcher === '') return this.alert("강사명을 입력하여주세요.")
                }else if(this.detail.eduPurps === '') {
                    return this.alert("교육목적을 입력하여주세요.")
                }else if(this.datePlanDt[0] === null && this.datePlanDt[1] === null) {
                    return this.alert("계획일자를 선택하여주세요.")
                }else if(this.detail.eduTargetType === '') {
                    return this.alert("교육대상을 선택하여주세요.")
                }
                const payload = {
                    ...this.detail,
                    eduMngId : this.eduMngId,
                    eduCourseName: this.detail.eduCourseName, //교육과정명
                    eduPurps: this.detail.eduPurps, //교육 목적
                    eduPlanStartDt: this.$moment(this.datePlanDt[0]).format('YYYYMMDD'), //계획일자(시작)
                    eduPlanEndDt: this.$moment(this.datePlanDt[1]).format('YYYYMMDD'), //계획일자(시작)
                    eduTargetType: this.detail.eduTargetType, //1:관리자 2: 작업자 3:기타 (기타일때 isEditing false)
                    eduTargetComment: this.detail.eduTargetComment,
                    eduTcher: this.detail.eduTcher, //강사
                    eduMainType: this.detail.eduMainType,
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                this.confirm('교육 훈련 계획을 수정하시겠습니까?', async () => {
                    try {
                        const response = await API.eduTraining.getEduMngPlanChange(payload)
                        if(response.count > 0) {

                            if(this.secondRemoveFileId.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                const payload = { fileType : "EduMngt", fileChkEduArcvIds : this.secondRemoveFileId}
                                await sendPostApi('/sendApi/api/file/fileUnUse', payload)
                            }

                            if(this.copyFiles.length > 0) {
                                let fileChkEduArcvIds = {
                                    fileChkEduArcvIds : this.copyFiles,
                                    fileConnectId : response.eduMngId
                                }
                                await API.eduTraining.copyFiles(fileChkEduArcvIds)

                            }
                            if(this.files.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                await sendFileApi(
                                    response.eduMngId, // fileConnectId
                                    'EduMngt', // fileType
                                    this.files, // files
                                    'EduMngtMtrl'
                                )
                            }

                            if(this.subFiles.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                await sendFileApi(
                                    response.eduMngId, // fileConnectId
                                    'EduMngt', // fileType
                                    this.subFiles, // files
                                    'EduMngtEtc'
                                )
                            }
                            this.copyFiles = []
                            this.files = []
                            this.subFiles = []
                            this.uploadFiles = []
                            this.uploadSubFiles = []
                            this.secondRemoveFileId = []
                            this.eduMngId = ''
                            this.detail.eduCourseName = '' //교육과정명
                            this.detail.eduPurps = '' //교육 목적
                            this.eduPlanStartDt = '' //계획일자(시작)
                            this.eduPlanEndDt = '' //계획일자(시작)
                            this.detail.eduTargetType = '' //1:관리자 2: 작업자 3:기타 (기타일때 isEditing false)
                            this.detail.eduTargetComment = ''
                            this.detail.eduMainType = '' 
                            this.detail.eduTcher = '' //강사
                            this.alert("교육 훈련 계획을 수정하였습니다.")
                            this.$bvModal.hide('EduplanUpdate')
                            return this.getEduPlanListData(this.filtering)
                        }else{
                            this.alert("교육 훈련 계획 수정에 실패하였습니다.")
                        }
                    } catch (error) {
                        console.error(error)
                        return this.alert('교육 훈련 계획을 수정에 실패하였습니다.')
                    }
                })
            },
            async eduActiveUpdateBtn(){

                //validation check 추가
                if((this.dateInspDt[0] === null || this.dateInspDt[0] == '')&& (this.dateInspDt[1] === null|| this.dateInspDt[1] == '')) {
                    return this.alert("교육 실시일자를 선택하여주세요.")
                }else if(this.detail.eduTargetNum == null || this.detail.eduTargetNum == ''){
                    return this.alert("대상자 수를 입력해주세요")    
                }else if(this.detail.eduAtdrnNum == null || this.detail.eduAtdrnNum == ''){
                    return this.alert("참석자 수를 입력해주세요")    
                }else if(this.detail.eduPlace == null || this.detail.eduPlace == ''){
                    return this.alert("장소를 입력해주세요")    
                }else if(this.detail.eduTime == null || this.detail.eduTime == ''){
                    return this.alert("시간을 입력해주세요")    
                }else if(this.detail.eduContent == null || this.detail.eduContent == ''){
                    return this.alert("교육내용을 입력해주세요")    
                }else if(this.detail.eduEffect == null || this.detail.eduEffect == ''){
                    return this.alert("교육결과/기대효과를 입력해주세요")    
                }

                const payload = {
                    ...this.detail,
                    eduMngId : this.eduMngId,
                    eduInspStartDt: this.$moment(this.dateInspDt[0]).format('YYYYMMDD'), //실지일자(시작)
                    eduInspEndDt: this.$moment(this.dateInspDt[1]).format('YYYYMMDD'), //실지일자(시작)
                    eduTargetNum: this.detail.eduTargetNum, //대상 명
                    eduAtdrnNum: this.detail.eduAtdrnNum, //참석 명
                    eduPlace: this.detail.eduPlace, //장소
                    eduTime: this.detail.eduTime, //시간
                    eduReqreNum: this.detail.eduReqreNum, //소요M/H
                    eduContent: this.detail.eduContent, //교육내용
                    eduEffect: this.detail.eduEffect, //교육결과/ 기대효과
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                this.confirm('교육 훈련 실시를 수정하시겠습니까?', async () => {
                    try {
                        const result = await API.eduTraining.getEduMngInspChange(payload)
                        if(result.count > 0){

                            if(this.secondRemoveFileId.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                const payload = { fileType : "EduMngt", fileChkEduArcvIds : this.secondRemoveFileId}
                                await sendPostApi('/sendApi/api/file/fileUnUse', payload)
                            }

                            if(this.copyFiles.length > 0) {
                                let fileChkEduArcvIds = {
                                    fileChkEduArcvIds : this.copyFiles,
                                    fileConnectId : result.eduMngId
                                }
                                await API.eduTraining.copyFiles(fileChkEduArcvIds)

                            }
                            if(this.files.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                await sendFileApi(
                                    result.eduMngId, // fileConnectId
                                    'EduMngt', // fileType
                                    this.files, // files
                                    'EduMngtMtrl'
                                )
                            }

                            if(this.subFiles.length > 0){
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                await sendFileApi(
                                    result.eduMngId, // fileConnectId
                                    'EduMngt', // fileType
                                    this.subFiles, // files
                                    'EduMngtEtc'
                                )
                            }

                            this.copyFiles = []
                            this.files = []
                            this.subFiles = []
                            this.uploadFiles = []
                            this.uploadSubFiles = []
                            this.secondRemoveFileId = []
                            this.eduMngId = '',
                            this.eduInspStartDt = '', //실지일자(시작)
                            this.eduInspEndDt = '', //실지일자(시작)
                            this.detail.eduTargetNum = '', //대상 명
                            this.detail.eduAtdrnNum = '', //참석 명
                            this.detail.eduPlace = '', //장소
                            this.detail.eduTime = '', //시간
                            this.detail.eduReqreNum = '', //소요M/H
                            this.detail.eduContent = '', //교육내용
                            this.detail.eduEffect = '' //교육결과/ 기대효과
                            this.$bvModal.hide('EduplanUpdate')
                            this.alert("교육 훈련 실시를 수정하였습니다.")
                            return this.getEduPlanListData()
                        }else{
                            this.alert("교육 훈련 실시 수정에 실패하였습니다.")
                        }
                    } catch (error) {
                        console.error(error)
                        return this.alert('교육 훈련 실시 수정에 실패하였습니다.')
                    }
                })
            },
            /**
             * 파일 삭제
             */
            removed(id) {
                this.secondRemoveFileId = id   
            },     
            /**
             * 파일불러오기
             */
            async getFileInfoList() {
                const payload = {
                    fileConnectId : this.eduMngId,
                    fileType : 'EduMngt',
                    fileSubType : 'EduMngtMtrl',
                }
                const sPayload = {
                    fileConnectId : this.eduMngId,
                    fileType : 'EduMngt',
                    fileSubType : 'EduMngtEtc',
                }
                try {
                    const result = await API.concrete.loadFileInfo(payload)
                    const resultSub = await API.concrete.loadFileInfo(sPayload)
                    if(result?.data){
                        this.uploadFiles = [...result.data]
                    }
                    if(resultSub?.data){
                        this.uploadSubFiles = [...resultSub.data]
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },
            closeBtn(){
                this.files = []
                this.lstFileRst = []
                this.copyFiles = []
                this.uploadFiles = []
                this.uploadSubFiles = []
                this.subFiles = []
                this.$bvModal.hide('EduplanWrite')
                this.$bvModal.hide('EduplanWrite2')
                this.$bvModal.hide('EduplanWrite3')
                this.$bvModal.hide('EduplanUpdate')
            },
            closePopUpBtn(){
                //타프로젝트 교육교재 조회
                this.popUp.eduCourseName = '' //교육과정명
                this.popUp.eduTargetType = null //1:관리자 2: 작업자 3:기타
                this.popUp.eduTargetComment = '' //기타일때
                this.popUp.gjCode = null //공종 코드
                this.popUp.kindCode = null // 종류
                this.popUp.projectNm = '' //프로젝트 명
                this.$bvModal.hide('TextbookAdd')
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                sheet.down2Excel({
                    merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                    downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                    reqHeader:  {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Accept-Language': 'ko'
                                },
                    fileName:   `교육훈련계획_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                })
            },
            /** Report 버튼 클릭시 oz리포트 창 띄우기 */
            reportBtn () {
                // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][32].jspNm
                + '&siteMstrId='+ this.$store.getters['auth/getSiteMstrId']               
                window.open(this.ozReport.src, '_blank')
                
            },
        }
   }
</script>