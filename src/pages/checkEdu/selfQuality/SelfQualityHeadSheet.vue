<template>
   
    <div class="tab_contents">

        <Breadcrumb :currentPath="$route.fullPath" />
        
        <div class="lst_tabs">
            <ul>
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a
                            href="javascript:void(0);" @click="fn_tab(index)">{{tab}}</a></li>
            </ul>
        </div>
        <div class="tab_area" v-show="currentTab == 0">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="3%">
                        <col width="20%">
                        <col width="3%">
                        <col width="30%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>년도</th>   
                            <td>
                                <select name="" id="" v-model="selfQualityObj.search.input.year" class="form_control size_sm">
                                    <option v-for="( list, index ) in selfQualityObj.yearOptionList" :key="index" :value="list.val">
                                        {{ list.key }}
                                    </option>
                                </select>
                            </td>
                            <th>제목</th>
                            <td><input type="text" class="form_control size_xlg" v-model="selfQualityObj.search.input.title" placeholder="제목을 입력해주세요" maxlength="50" @keyup.enter="fn_selfQualitySearch"></td>       
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="fn_selfQualitySearch('reset')">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_selfQualitySearch('search')">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(selfQualitySheet)">엑셀 다운로드</button>
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray" v-if="checkUser(userInfo.userId,'unuse')" @click="fn_selfQualityUnuse('list')">삭제</button>
                        <button type="button" class="btn btn_sm btn_darkblue" v-if="checkUser(userInfo.userId,'write')" v-b-modal.selfQualityHeadWriteModal>등록</button>
                        <button type="button" class="btn btn_sm btn_darkgray" v-if="checkUser(userInfo.userId,'write')" @click="fn_sendSite('list')">현장송부</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap"  :style="{height: 'calc(100vh - 320px)'}">
                    <div id="selfQualitySheet" class="ibsheet_table" style="height: 100%;" />
                </div>
            </div>
        </div>

        <div class="tab_area" v-show="currentTab == 1">
            <div class="inner">
                <div class="button_box">
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray" v-if="checkUser(userInfo.userId,'write')" v-b-modal.checkListSelfHeadWriteModal>추가</button>
                        <button type="button" class="btn btn_sm btn_gray" v-if="checkUser(userInfo.userId,'unuse')" @click="fn_checkListUnuse">삭제</button>
                    </div>
                </div>
                <div class="ib_wrap"  :style="{height: 'calc(100vh - 280px)'}">
                    <div id="checkListSelfHeadSheet" class="ibsheet_table" style="height: 100%;" />
                </div>
            </div>
        </div>

        <!-- 점검 등록 팝업 -->
        <b-modal id="selfQualityHeadWriteModal" title="점검 등록" hide-backdrop size="xxl" @shown="fn_selfQualityWriteOpen('_write')" :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 기본 정보</strong>
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
                                    <th><span class="emp_red">제목</span></th>
                                    <td colspan="3"><input type="text" v-model="chkInfoObj.inputTitle" class="form_control" placeholder="" maxlength="100" @keyup.enter="fn_selfQualityWrite"></td>
                                </tr>
                                <tr>
                                    <th><span class="emp_red">점검 양식(Check List)</span></th>
                                    <td>
                                        <div class="btn_wrap">
                                            <input type="text" id="" v-model="chkInfoObj.showCheckListTitle" class="form_control" placeholder="선택해주세요" readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" v-b-modal.checkListModal>검색</button>
                                        </div>
                                    </td>
                                    <th><span class="emp_red">점검 완료 요청일</span></th>
                                    <td>
                                        <DatePicker v-model="chkInfoObj.inputDate" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 대상 프로젝트 설정</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="270">
                                    <col width="*">
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th rowspan="2">대상 프로젝트</th>
                                    <th>건축</th>
                                    <th>인프라</th>
                                    <!-- <th>대상 설정</th> -->
                                </tr>
                                <tr>
                                    <td>{{ chkInfoObj.constructCnt }}</td>
                                    <td>{{ chkInfoObj.infraCnt }}</td>
                                    <!-- <td><button type="button" class="btn_set" v-b-modal.projectListSheet>설정</button></td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="lookup_box multi_line mt30">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="100">
                                <col width="400">
                                <col width="60">
                                <col width="300">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>   
                                    <td>
                                        <div class="form_area">
                                            <select name="" id="" v-model="chkInfoObj.projSearch.mngtType" class="form_control w50">
                                                <option value="">전체</option>
                                                <option v-for="( list, index ) in mngtTypeCodeList" :key="index" :value="list.codeVal">
                                                    {{ list.codeNameKr }}
                                                </option>
                                            </select> 
                                            <input type="text" v-model="chkInfoObj.projSearch.projectNm" class="form_control" placeholder=""  maxlength="50" @keyup.enter="fn_projectSearch('_write')">
                                        </div>    
                                    </td>
                                    <th>유형</th>   
                                    <td>
                                        <div class="form_area">
                                            <select name="" id="" v-model="chkInfoObj.projSearch.baseType" class="form_control w50">
                                                <option value="">선택</option>
                                                <option v-for="( list, index ) in baseTypeCodeList" :key="index" :value="list.codeVal">
                                                    {{ list.codeNameKr }}
                                                </option>
                                            </select> 
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_projectSearchReset('_write')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_projectSearch('_write')">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="table_data mt30">
                        <div class="move_box">
                            <div class="move_box_inner">
                                <div class="data_tit pl0">All Sites</div>
                                <!-- ibsheet -->
                                <div class="ib_wrap">
                                    <div id="projectSheet_write" class="ibsheet_table" style="height:440px"></div>
                                </div>
                            </div>
                        </div>
                        <div class="move_box arrow">
                            <button type="button" class="ico_data_prev" @click="fn_deleteRows">이전 영역으로 이동</button>
                            <button type="button" class="ico_data_next" @click="fn_copyRows">다음 영역으로 이동</button>
                        </div>
                        <div class="move_box">
                            <div class="move_box_inner">
                                <div class="data_tit pl0">대상 프로젝트</div>
                                <!-- ibsheet -->
                                <div class="ib_wrap">
                                    <div id="selectProjectSheet_write" class="ibsheet_table" style="height:440px"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_selfQualityWrite"> <!-- @click="ok" -->등록</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 점검 수정 팝업 -->
        <b-modal id="selfQualityHeadChangeModal" title="점검 수정" hide-backdrop size="xxl" :footer-bg-variant="footerBg" @shown="fn_selfQualityChangeOpen('_change')">
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 기본 정보</strong>
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
                                    <th><span class="emp_red">제목</span></th>
                                    <td colspan="3"><input type="text" v-model="chkInfoObj.inputTitle" class="form_control" placeholder="입력해주세요"  maxlength="100" @keyup.enter="fn_selfQualityChange"></td>
                                </tr>
                                <tr>
                                    <th><span class="emp_red">점검 양식(Check List)</span></th>
                                    <td>
                                        <div class="btn_wrap">
                                            <input type="text" id="" v-model="chkInfoObj.showCheckListTitle" class="form_control" placeholder="선택해주세요" readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" v-b-modal.checkListModal>검색</button>
                                        </div>
                                    </td>
                                    <th><span class="emp_red">점검 완료 요청일</span></th>
                                    <td>
                                        <DatePicker v-model="chkInfoObj.inputDate" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 대상 프로젝트 설정</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="270">
                                    <col width="*">
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th rowspan="2">대상 프로젝트</th>
                                    <th>건축</th>
                                    <th>인프라</th>
                                    <!-- <th>대상 설정</th> -->
                                </tr>
                                <tr>
                                    <td>{{ chkInfoObj.constructCnt }}</td>
                                    <td>{{ chkInfoObj.infraCnt }}</td>
                                    <!-- <td><button type="button" class="btn_set" v-b-modal.projectListSheet>설정</button></td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="lookup_box multi_line mt30">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="100">
                                <col width="400">
                                <col width="60">
                                <col width="300">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>프로젝트명</th>   
                                    <td>
                                        <div class="form_area">
                                            <select name="" id="" v-model="chkInfoObj.projSearch.mngtType" class="form_control w50">
                                                <option value="">전체</option>
                                                <option v-for="( list, index ) in mngtTypeCodeList" :key="index" :value="list.codeVal">
                                                    {{ list.codeNameKr }}
                                                </option>
                                            </select> 
                                            <input type="text" v-model="chkInfoObj.projSearch.projectNm" class="form_control" placeholder="입력해주세요"  maxlength="50" @keyup.enter="fn_projectSearch('_change')">
                                        </div>    
                                    </td>
                                    <th>유형</th>   
                                    <td>
                                        <div class="form_area">
                                            <select name="" id="" v-model="chkInfoObj.projSearch.baseType" class="form_control w50">
                                                <option value="">선택</option>
                                                <option v-for="( list, index ) in baseTypeCodeList" :key="index" :value="list.codeVal">
                                                    {{ list.codeNameKr }}
                                                </option>
                                            </select> 
                                        </div>
                                    </td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_projectSearchReset('_change')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_projectSearch('_change')">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="table_data mt30">
                        <div class="move_box">
                            <div class="move_box_inner">
                                <div class="data_tit pl0">All Sites</div>
                                <!-- ibsheet -->
                                <div class="ib_wrap">
                                    <div id="projectSheet_change" class="ibsheet_table" style="height:440px"></div>
                                </div>
                            </div>
                        </div>
                        <div class="move_box arrow">
                            <button type="button" class="ico_data_prev" @click="fn_deleteRows">이전 영역으로 이동</button>
                            <button type="button" class="ico_data_next" @click="fn_copyRows">다음 영역으로 이동</button>
                        </div>
                        <div class="move_box">
                            <div class="move_box_inner">
                                <div class="data_tit pl0">대상 프로젝트</div>
                                <!-- ibsheet -->
                                <div class="ib_wrap">
                                    <div id="selectProjectSheet_change" class="ibsheet_table" style="height:440px"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_selfQualityChange"> <!-- @click="ok" -->저장</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 본사 체크리스트 불러오기 팝업 --> 
        <b-modal id="checkListModal" title="Check List 검색" hide-backdrop size="lg" @shown="fn_checkListModalOpen"
            :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="ib_wrap mt0">
                        <div id="checkListModalSheet" class="ibsheet_table" style="height:336px"></div>
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_selectCheckList"> <!-- @click="ok" -->선택</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 점검 상세 팝업 -->
        <b-modal id="selfQualityHeadDetailModal" title="점검 상세" hide-backdrop size="xxl" :footer-bg-variant="footerBg" @shown="fn_selfQualityDetailOpen">
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 기본 정보</strong>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" v-if="chkInfoObj.view.inUser == userInfo.userId && chkInfoObj.view.siteSendYn == 'N'" @click="fn_sendSite('detail')">현장송부</button>
                        </div>
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
                                    <th><span class="">제목</span></th>
                                    <td colspan="3">{{ chkInfoObj.view.title }}</td>
                                </tr>
                                <tr>
                                    <th><span class="">점검 양식(Check List)</span></th>
                                    <td>
                                        {{ chkInfoObj.view.checkTitle }}
                                    </td>
                                    <th><span class="">점검 완료 요청일</span></th>
                                    <td>
                                        {{ chkInfoObj.view.checkDt }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 대상 프로젝트</strong>
                    </div>
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="270">
                                    <col width="*">
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th rowspan="2">대상 프로젝트</th>
                                    <th>건축</th>
                                    <th>인프라</th>
                                    <!-- <th>대상 설정</th> -->
                                </tr>
                                <tr>
                                    <td>{{ chkInfoObj.view.constructCnt }}</td>
                                    <td>{{ chkInfoObj.view.infraCnt }}</td>
                                    <!-- <td><button type="button" class="btn_set" v-b-modal.projectListSheet>설정</button></td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- ibsheet -->
                    <div class="ib_wrap mt30">
                        <div id="selfQualityDetailSheet" class="ibsheet_table" style="height:337px"></div>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="chkInfoObj.view.inUser == userInfo.userId && chkInfoObj.view.siteSendYn == 'N'" @click="fn_selfQualityUnuse('detail')"> <!-- @click="ok" -->삭제</b-button>
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="chkInfoObj.view.inUser == userInfo.userId && chkInfoObj.view.siteSendYn == 'N'" @click="fn_selfQualityChangeModalOpen"> <!-- @click="ok" -->수정</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 체크리스트 신규등록 팝업 --> 
        <b-modal id="checkListSelfHeadWriteModal" title="Check List 추가" 
        hide-backdrop size="xxl" @shown="fn_checkListWriteModalOpen"
        :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list mt0">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="130">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">제목</span></th>
                                    <td><input type="text" v-model="checkListObj.write.title" class="form_control"  maxlength="100" @keyup.enter="fn_checkListWrite"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(checkListWriteSelfHeadSheet)">엑셀 다운로드</button>
                        <button type="button" class="btn btn_sm btn_excel" @click="$bvModal.show('SelfQualityHeadSheet_ExcelUploadModal1')">엑셀 업로드</button>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_checkListCopyBtn(checkListWriteSelfHeadSheet)">행 복사</button>
                            <div class="btn_number">
                                <select
                                    v-model="checkListObj.write.addCount"
                                    class="form_control num"
                                >
                                    <option
                                        v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                        :key="count"
                                        :value="count"
                                    >
                                        {{ String(count) }}
                                    </option>    
                                </select>
                                <button type="button" class="btn btn_sm" @click="fn_checkListAddBtn(checkListWriteSelfHeadSheet, checkListObj.write)">행 추가</button>
                            </div>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_checkListDelBtn(checkListWriteSelfHeadSheet)">행 삭제</button>
                            <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                        </div>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap"  :style="{height: 'calc(100vh - 400px)'}">
                        <div id="checkListWriteSelfHeadSheet" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_checkListWrite"> <!-- @click="ok" -->등록</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 체크리스트 상세 팝업 --> 
       <b-modal id="checkListDetailModal" title="Check List 상세" 
            hide-backdrop size="xxl"
            :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list mt0">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="130">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span>제목</span></th>
                                    <td><input type="text" v-model="chkInfoObj.testSelfChkInfo.selfChkInfoTitle" class="form_control" readonly></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap"  :style="{height: 'calc(100vh - 400px)'}">
                        <div id="checkListDetailSelfHeadSheet" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_checkListChange">수정</b-button> -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 체크리스트 수정 팝업 --> 
       <b-modal id="checkListSelfHeadChangeModal" title="Check List 수정" 
            hide-backdrop size="xxl"
            :footer-bg-variant="footerBg"
            @shown="fn_checkListChangeModalOpen">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list mt0">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="130">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">제목</span></th>
                                    <td><input type="text" v-model="checkListObj.change.title" class="form_control"  maxlength="100" :readonly="!checkListAuth" @keyup.enter="fn_checkListChange"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(checkListChangeSelfHeadSheet)">엑셀 다운로드</button>
                        <button type="button" class="btn btn_sm btn_excel" @click="$bvModal.show('SelfQualityHeadSheet_ExcelUploadModal2')">엑셀 업로드</button>
                        <div class="fr" v-if="checkUser(userInfo.userId,'change')">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_checkListCopyBtn(checkListChangeSelfHeadSheet)">행 복사</button>
                            <div class="btn_number">
                                <select
                                    v-model="checkListObj.change.addCount"
                                    class="form_control num"
                                >
                                    <option
                                        v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                        :key="count"
                                        :value="count"
                                    >
                                        {{ String(count) }}
                                    </option>    
                                </select>
                                <button type="button" class="btn btn_sm" @click="fn_checkListAddBtn(checkListChangeSelfHeadSheet, checkListObj.change)">행 추가</button>
                            </div>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_checkListDelBtn(checkListChangeSelfHeadSheet)">행 삭제</button>
                            <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                        </div>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap"  :style="{height: 'calc(100vh - 400px)'}">
                        <div id="checkListChangeSelfHeadSheet" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="checkUser(userInfo.userId,'change')" @click="fn_checkListChange"> <!-- @click="ok" -->수정</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>
        
        <!-- 회신현황 보기 팝업 -->
         <b-modal id="selfQualityReplyModal" title="회신현황 보기" 
            hide-backdrop size="xxl" @shown="fn_selfQualityReply"
            :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list align_center">
                        <table>
                            <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="270">
                                    <col width="*">
                                    <col width="*">
                                </colgroup>
                            <tbody>
                                <tr>
                                    <th rowspan="2">대상 프로젝트</th>
                                    <th>건축</th>
                                    <th>인프라</th>
                                </tr>
                                <tr>
                                    <td>{{ selfQualityReply.view.constructCnt }}</td>
                                    <td>{{ selfQualityReply.view.infraCnt }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="lookup_box multi_line mt30">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="50">
                                <col width="240">
                                <col width="80">
                                <col width="240">
                                <col width="100">
                                <col width="240">
                                <col width="90">
                                <col width="240">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>본부</th>   
                                    <td>
                                        <select name="" id="" v-model="selfQualityReply.search.baseType" class="form_control size_sm_lg" @change="fn_selfQualityReplySearchOption">
                                            <option value="">전체</option>
                                            <option v-for="( list, index ) in baseTypeCodeList" :key="index" :value="list.codeVal">
                                                {{ list.codeNameKr }}
                                            </option>
                                        </select> 
                                    </td>
                                    <th>공사유형</th>   
                                    <td>
                                        <select name="" v-model="selfQualityReply.search.csrtType" id="" class="form_control size_sm_lg" :disabled="selfQualityReply.search.baseType != '4000'">
                                            <option v-for="( list, index ) in selfQualityReply.search.csrtTypeCodeList" :key="index" :value="list.codeVal">
                                                {{ list.codeNameKr }}
                                            </option>
                                        </select> 
                                    </td>
                                    <th>프로젝트 코드</th>
                                    <td><input type="text" v-model="selfQualityReply.search.projectId" class="form_control size_sm_lg" placeholder=""  maxlength="50" @keyup.enter="fn_selfQualityReplySearch('')"></td>
                                    <th>프로젝트 명</th>
                                    <td><input type="text" v-model="selfQualityReply.search.projectNm" class="form_control size_sm_lg" placeholder=""  maxlength="50" @keyup.enter="fn_selfQualityReplySearch('')"></td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="fn_selfQualityReplySearch('reset')">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_selfQualityReplySearch('')">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap mt30">
                        <div id="selfQualityReplySheet" class="ibsheet_table" style="height: 340px;"></div>
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">등록</b-button> -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>
        
        <!-- 회신현황 상세보기 팝업 -->
        <b-modal id="selfQualityReplyDetailModal" title="회신 현황 상세 보기"
            size="xl" modal-class="single_page" @shown="fn_selfQualityReplyDetailOpen"
            :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="tab_contents">
                        <div class="inner">
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="390">
                                        <col width="*">
                                        <col width="390">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>현장명</th>
                                            <td colspan="3">[{{ selfQualityReply.detail.info.siteId }}] {{ selfQualityReply.detail.info.siteNm }}</td>
                                        </tr>
                                        <tr>
                                            <th>프로젝트명</th>
                                            <td colspan="3">[{{ selfQualityReply.detail.info.projectId }}] {{ selfQualityReply.detail.info.projectNm }}</td>
                                        </tr>
                                        <tr>
                                            <th>본부</th>
                                            <td>{{ selfQualityReply.detail.info.baseTypeNm }}</td>
                                            <th>공사 유형</th>
                                            <td>{{ selfQualityReply.detail.info.csrtTypeNm }}</td>
                                        </tr>
                                        <tr>
                                            <th>점검 일자</th>
                                            <td>{{ selfQualityReply.detail.info.checkDt }}</td>
                                            <th>회신 현황</th>
                                            <td>{{ selfQualityReply.detail.info.selfQltyStatusNm }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="button_box mt30"><strong>1. Check List</strong></div>
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="replyDetailCheckListSheet" class="ibsheet_table" style="height:475px"></div>
                            </div>

                            <div class="button_box mt30"><strong>2. 점검 결과</strong></div>
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>자체품질점검 결과</th>
                                            <td>{{ selfQualityReply.detail.info.selfSiteContent }}</td>
                                        </tr>
                                        <tr v-if="selfQualityReply.detail.imgFileList.length > 0">
                                            <th>점검사진</th>
                                            <td>
                                                <LstImg
                                                    :lst-file-rst="selfQualityReply.detail.imgFileList"
                                                    :uploadable="false"
                                                    :copyable="false"
                                                    downloadable
                                                    :file-type="'selfQualityHeadQltyPicturePop'"
                                                />
                                            </td>
                                        </tr>
                                        <tr v-if="selfQualityReply.detail.fileList.length > 0">
                                            <th>첨부파일</th>
                                            <td>
                                                <LstFile
                                                    :lst-file-rst="selfQualityReply.detail.fileList" 
                                                    :uploadable="false"
                                                    downloadable
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <!-- <b-button class="btn btn_lg btn_outline btn_darkgray" @click="ok">등록</b-button> -->
                <b-button class="btn btn_lg btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <excel-upload-modal
            ref-id="SelfQualityHeadSheet_ExcelUploadModal1"
            mode="CHECK"
            fileType="SELF"
            columnLength="0"
            @import="fn_importExcel"
        />

        <excel-upload-modal
            ref-id="SelfQualityHeadSheet_ExcelUploadModal2"
            mode="CHECK"
            fileType="SELF"
            columnLength="0"
            @import="fn_importChangeExcel"
        />

        <excel-download
            v-model="excelDownload.request"
            ref-id="SelfQualityHeadSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
   </div>
</template>


<script>
    import API from '@/apis/'
    import loader from '@ibsheet/loader'
    import { commonFn } from '@/script/commonFn.js';
    import { sendPostApi , sendFileApi, requestOptions, requestFileOptions} from '../../../apis/common';
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import DatePicker from '@component/common/DatePicker.vue'
    import { selfQualityList, selfQualityCheckList } from '@/pages/common/data/InspectionList'
    import { checkListSearch, projectListSheet, selfQualityDetailSheet, checkListWriteList, checkListDetailList, selfQualityReplyList, siteCheckResultList, replyDetailPunchList } from '../../common/data/PopupList'
    import LstImg from '@/pages/common/popup/LstImg'
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import _ from 'lodash'
    import ExcelUploadModal from '@modal/common/ExcelUploadModal.vue'
    import ExcelDownload from '@component/common/ExcelDownload.vue'
    import axios from 'axios'

    let SHEET_ID = '';

    export default {
        name: 'SelfQualityHeadSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            LstFile,
            LstImg,
            DatePickerRange,
            DatePicker, // 단일 
            Breadcrumb,
            ExcelUploadModal,
            ExcelDownload,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['점검요청', 'Check List'], // tab name
                sendUrl : '/sendApi/api/selfQltyChk',
                adminYn : '0',
                userInfo : {},
                baseTypeCodeList: [],
                mngtTypeCodeList: [],
                csrtTypeCodeList: [],
                categoryData: {},
                selfQualitySheet: [],               // 점검요청 sheet
                checkListSheet: [],                 // 본사 checkList sheet
                checkListWriteSheet: [],            // 본사 checkList 등록 sheet
                checkListWriteSelfHeadSheet: [],       // checkList 등록 popup sheet
                checkListChangeSelfHeadSheet: [],      // checkList 수정 popup sheet
                projectSheet: [],                   // 프로젝트 sheet
                selectProjectSheet: [],             // 선택 project sheet
                selfQualityDetailSheet: [],         // 점검요청 상세 sheet
                selfQualityChangeSheet: [],         // 점검요청 상세 sheet
                selfQualityReplySheet: [],          // 점검요청 회신현황 sheet
                replyDetailCheckListSheet: [],      // 점검요청 회신현황 상세 checkList sheet
                replyDetailPunchSheet: [],          // 점검요청 회신현황 상세 punch sheet
                selfQualityObj : {
                    yearOptionList:[],
                    search: {
                        input:{ // input value
                            title:'',
                            year:'',
                        },
                        result:{ // 저장 value
                            title:'',
                            year:'',
                        },
                    }
                },
                selfQualityReply : {                //회신현황 obj
                    selfQltyPrjtInfoId : '',
                    csrtTypeCodeList : [],
                    search: {
                        baseType : '',
                        csrtType : '',
                        projectId : '',
                        projectNm : '',
                    },
                    view : {},
                    detail : {
                        param : {},
                        info : {},
                        fileList : [],
                        imgFileList : [],
                        copiedFileIds:[],
                    },
                },
                chkInfoObj: {                       // 점검요청 obejct param
                    constructCnt: 0,                // 건축 현장 수
                    infraCnt: 0,                    // 인프라 현장 수
                    inputTitle:'',
                    showCheckListTitle:'',
                    inputDate : '',
                    checkTitle : '',                // 체크리스트 제목
                    selfChkInfo : {},
                    testSelfChkInfo : {},           // 임시 데이터
                    projSearch:{
                        projectNm:'',
                        baseType:'',
                        mngtType:'0',
                    },
                    write:{},
                    view:{},
                    change:{},
                },
                checkListObj : {                    // 체크 list object param
                    write:{
                        title: '',
                        addCount: 1,
                    },
                    change:{
                        title: '',
                        addCount: 1,
                    },
                },
                checkListAuth : false, // checkList 권한 체크
                excelDownload : { //엑셀 다운로드
                    options : {},
                    downloadOption : {},
                    fileName : "",
                    data : [],
                    request : false,
                },
            }
        },
        mounted() {
            this.adminYn = this.$store.getters['auth/getGroupAuthInfoId'] == "GRAT_0000000009" ? '1' : '0';
            // console.log("this.$session.get('userInfo') : ", this.$session.get('userInfo'));
            this.userInfo = {
                ...this.$session.get('userInfo')    
            };
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
            this.fn_selfQualityList(0, this.selfQualityObj.search.result);
            this.fn_projectCodeList();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },

        methods: {

            //tab
            fn_tab(idx){
                //점검요청 list function  
                this.currentTab = idx
                if(idx === 0){
                    this.fn_selfQualityList(idx, this.selfQualityObj.search.result);
                }
                ///checkList function 
                else if(idx === 1){
                    this.fn_checkList(idx);
                }
                else{
                    consol.log('tab function error');
                }
            },

            //점검자 체크박스 체크
            fn_checkUserCheck(evtParam){
                let sheet = evtParam.sheet;
                let rows = sheet.getDataRows(); 
                rows.forEach(item => {
                    if(item.checkYn == "0" || item.siteSendYn == 'Y'){
                        sheet.setAttribute(item, "isChecked", "CanEdit", 0, 1)
                        sheet.setAttribute(item, "isChecked", "Class", "disabled", 1);
                    }
                })
            },
               
            /*
                sheet 영역 function 
            */
            //본사 메인
            fn_selfQualitySheet(setData) {

                let data = [];

                if(setData && setData.length > 0){
                    data = setData;
                }
                
                let options = selfQualityList.options;
                options.Cfg = {NoVScroll: 0,}
                options.Events = {
                    onClick: this.fn_selfQualityDetailClick,
                    onDataLoad : this.fn_checkUserCheck,
                    onRenderFirstFinish: async () => {
                        this.selfQualitySheet.loadSearchData({
                            data: data,
                            append: false
                        })
                    },
                }

                options.Cols    =   this.checkUser(this.userInfo.userId, 'write') || this.checkUser(this.userInfo.userId, 'unuse')
                                    ? options.Cols
                                    : options.Cols.filter(col => col.Name !== 'isChecked')

                loader.createSheet({
                    el: 'selfQualitySheet',
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.selfQualitySheet = sheet
                })

            },

            //본사 checkList 메인
            fn_checkListSheet(setData) {

                //checkList
                let data = []

                if(setData){
                    data = setData
                }

                let options = selfQualityCheckList.options;

                options.Events = {
                    onDblClick: this.fn_selectCheckChangeOpen,
                    onRenderFirstFinish: async () => {
                        this.checkListSheet.loadSearchData({
                            data: data,
                            append: false
                        })
                    },
                }

                options.Cols    =   this.checkUser(this.userInfo.userId, 'unuse')
                                    ? options.Cols
                                    : options.Cols.filter(col => col.Name !== 'isChecked')
                options.Cfg = {NoVScroll: 0,}
                loader.createSheet({
                    el: 'checkListSelfHeadSheet',
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.checkListSheet = sheet
                })
            },
            
            //본사 checkList 선택 팝업
            async fn_checkListModalSheet() {
                this.chkInfoObj.testSelfChkInfo = {};

                let payload = {
                    'siteMstrId' : 'ALL_SITE'
                };
                
                let url = this.sendUrl+'/popup/checkList/list';

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                const response = await sendPostApi(url, payload);

                let data = [];

                if(response.status == '200'){

                    if(response.data.data && response.data.data.length){
                        data = response.data.data
                        data.forEach(item => {
                            item['detailBtn'] = '0';
                        });
                    }

                    let options = checkListSearch.options;

                    options.Cfg = {NoVScroll: 0,}
                    options.Events = {
                        onClick: this.fn_selectCheck,
                        onDblClick: this.fn_selectCheckDbl,
                        onRenderFirstFinish: async () => {
                            this.checkListModalSheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                        onRenderFinish: this.fn_aprvBtnSelectChk, 
                    }

                    loader.createSheet({
                        el: 'checkListModalSheet',
                        data: data, 
                        options: options
                    }).then(async sheet => {
                        this.checkListModalSheet = sheet
                    })
                }
            },

            //체크리스트 선택
            fn_selectCheck (evtParam) {
                const selectRow = evtParam.row;
                this.chkInfoObj.testSelfChkInfo = {
                    selfChkInfoId : selectRow.selfChkInfoId,
                    selfChkInfoTitle : selectRow.title,
                }
                if(evtParam.col == "detailBtn" && evtParam.event.target.tagName == "BUTTON"){ // infoBtn: 점검
                    this.fn_checkListDetailModalOpen(evtParam);
                }
            },


            //체크리스트 dbl 선택
            fn_selectCheckDbl (evtParam) {
                const selectRow = evtParam.row;
                let inputObj = {
                    selfChkInfoId : selectRow.selfChkInfoId,
                    selfChkInfoTitle : selectRow.title,
                };
                this.chkInfoObj.testSelfChkInfo = {
                    ...inputObj
                }
                this.fn_selectCheckList();
            },

            //체크리스트 선택
            fn_selectCheckList() {
                let inputData = {
                    ...this.chkInfoObj.testSelfChkInfo
                }
                if(!inputData.selfChkInfoId && !inputData.selfChkInfoTitle){
                    this.alert('체크리스트를 선택해주세요.');
                    return;
                }
                else{

                    this.chkInfoObj.selfChkInfo = {
                        ...inputData
                    }
                    this.chkInfoObj.showCheckListTitle = inputData.selfChkInfoTitle;
                    this.$bvModal.hide('checkListModal')
                    this.chkInfoObj.testSelfChkInfo = {};
                }
            },
            
            async fn_checkListDetailModalOpen(evtParam){
                
                const selectRow = evtParam.row;
                if(selectRow.selfChkInfoId){
                    this.$bvModal.show('checkListDetailModal');
                }
                else{
                    return;
                }

                let payload = {
                    selfChkInfoId : selectRow.selfChkInfoId,
                };
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = this.sendUrl + '/popup/checkList/view';
                const response = await sendPostApi(url, payload)

                if(response.status == '200'){
                    let sheetData = response.data.data.checkList;
                    this.checkListObj.change = response.data.data;

                    let data = []
                    
                    if(sheetData && sheetData.length > 0){
                        data = sheetData
                    }

                    let options = checkListDetailList.options;

                    options.Events = {
                        onRenderFirstFinish: async () => {
                            this.checkListChangeSelfHeadSheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                    }

                    options.Cfg = {NoVScroll: 0,}

                    loader.createSheet({
                        el: 'checkListDetailSelfHeadSheet',
                        data: data, 
                        options: options
                    }).then(async sheet => {
                        this.checkListChangeSelfHeadSheet = sheet
                    })
                }
            },

            //본사 checkList 작성 팝업
            fn_checkListWriteSelfHeadSheet() {

                let data = checkListWriteList.data;
                let options = checkListWriteList.options;

                //제목 초기화
                this.checkListObj.write.title = '';
                
                this.fn_getCategoryData({
                    main: options.Cols[2],
                    mid: options.Cols[3]
                }, () => {
                    options.Events = {
                        onRenderFirstFinish: async () => {
                            this.checkListWriteSelfHeadSheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                    }

                    options.Cfg = {NoVScroll: 0,}

                    loader.createSheet({
                        el: 'checkListWriteSelfHeadSheet',
                        data: data, 
                        options: options
                    }).then(async sheet => {
                        this.checkListWriteSelfHeadSheet = sheet
                    })
                });
            },

            //본사 checkList 수정 팝업
            fn_checkListChangeSelfHeadSheet(setData) {

                let data = []
                
                if(setData){
                    data = setData
                }
                
                let options = {};
                if(this.checkListAuth){
                    options = checkListWriteList.options;
                }
                else{
                    options = checkListDetailList.options;
                }

                this.fn_getCategoryData({
                    main: options.Cols[2],
                    mid: options.Cols[3]
                }, () => {
                    options.Events = {
                        onRenderFirstFinish: async () => {
                            this.checkListChangeSelfHeadSheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                    }

                    options.Cfg = {NoVScroll: 0,}

                    loader.createSheet({
                        el: 'checkListChangeSelfHeadSheet',
                        data: data, 
                        options: options
                    }).then(async sheet => {
                        this.checkListChangeSelfHeadSheet = sheet
                    })
                });
            },
            
            //프로젝트 list sheet << 
            /**
             * searchObj : 검색 조건 obj
             * areaType : sheet 영역
             * setData : selectProject data
             */
            async fn_projectSheet(searchObj, areaType, setData, callback) {

                try {
                    
                    let payload = {}

                    if(searchObj && null != searchObj){
                        payload = {
                            ...searchObj
                        }
                    }
                    else{ 
                        payload['mngtType'] = '0'
                    }

                    //프로젝트 list 호출
                    let url = '/sendApi/api/popup/allSitesProject/list';
    
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
    
                    const response = await sendPostApi(url, payload);

                    if(response.status == '200'){
                        let data = [];

                        let projectList = response.data.data

                        if(projectList.length > 0){
                            if(setData && setData != null && setData.length > 0){
                                projectList.forEach(item => {
                                    if(!setData.includes(item.siteMstrId)){
                                        data.push(item)
                                    }
                                })
                            }
                            else{
                               data = projectList
                            }
                        }

                        let options = projectListSheet.options;

                        options.Cfg = {NoVScroll: 0,}
                        
                        options.Events = {
                            onDblClick: this.fn_copyRow,
                            onRenderFirstFinish: async () => {
                                this.projectSheet.loadSearchData({
                                    data: data,
                                    append: false
                                })
                            },
                        }

                        loader.createSheet({
                            el: 'projectSheet'+areaType,
                            data: data, 
                            options: options
                        }).then(async sheet => {
                            this.projectSheet = sheet
                        })
                    }

                    if(callback){
                        return callback()
                    }

                } catch (error) {
                    console.error(error);
                }
            },

            //프로젝트 검색 리셋
            fn_projectSearchReset(areaType){

                let siteList = this.selectProjectSheet.getShownRows(0)

                let data = []
                if(siteList.length > 0){
                    siteList.forEach(item => {
                        data.push(item.siteMstrId)
                    })
                }

                this.chkInfoObj.projSearch.projectNm = ''
                this.chkInfoObj.projSearch.baseType = ''
                this.chkInfoObj.projSearch.mngtType = '0'
                this.fn_projectSheet(null, areaType, data);
            },

            //프로젝트 검색
            fn_projectSearch(areaType){ 
                let siteList = this.selectProjectSheet.getShownRows(0)
                const searchObj = {
                    ...this.chkInfoObj.projSearch
                }
                let data = []
                if(siteList.length > 0){
                    siteList.forEach(item => {
                        data.push(item.siteMstrId)
                    })
                }
                this.fn_projectSheet(searchObj, areaType, data);
            },

            //프로젝트 선택 sheet
            fn_selectProjectSheet(setData, areaType) {

                let data = [];

                if(setData && setData.length > 0){
                    data = setData
                }

                let options = projectListSheet.options;

                options.Events = {
                    onDblClick: this.fn_deleteRow,
                    onRenderFirstFinish: async () => {
                        this.selectProjectSheet.loadSearchData({
                            data: data,
                            append: false
                        })
                    },
                }

                options.Cfg = {NoVScroll: 0,}

                loader.createSheet({
                    el: 'selectProjectSheet'+areaType,
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.selectProjectSheet = sheet
                })
            },
            
            //점검 상세 sheet
            fn_selfQualityDetailSheet(setData) {
                let data = []
                if(setData && setData.length > 0){
                    data = setData
                }

                let options = selfQualityDetailSheet.options;

                options.Cfg = {NoVScroll: 0,}
                options.Events = {
                    onRenderFirstFinish: async () => {
                        this.selfQualityDetailSheet.loadSearchData({
                            data: data,
                            append: false
                        })
                    }
                }
                loader.createSheet({
                    el: 'selfQualityDetailSheet',
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.selfQualityDetailSheet = sheet
                })
            },

            async fn_selfQualityReply(){

                let payload = {
                    ...this.selfQualityReply.search
                }        

                payload['selfQltyPrjtInfoId'] = this.selfQualityReply.selfQltyPrjtInfoId,

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = this.sendUrl + '/head/checkReq/recvSite';
                const response = await sendPostApi(url, payload)

                let data = []

                if(response.status == '200'){

                    let constructCnt = 0;
                    let infraCnt = 0;
                    let result = {
                        ...response.data.data
                    }
                    //sheet data
                    data = response.data.mySite
                    data.forEach(item => {
                        if(item.baseType == '4000'){//건축
                            constructCnt++;
                        }
                        else if(item.baseType == '1000'){//인프라
                            infraCnt++;
                        }
                        if(item.siteRecvYn == 'Y' && item.selfQltyStatus == 'APRV'){
                            item['replyTxt'] = '완료'
                            item['replyBtn'] = '1'
                        }
                        else{
                            item['replyTxt'] = '<span class="inCount">미완료</span>'
                            item['replyBtn'] = '-'
                        }
                    })

                    result['constructCnt'] = constructCnt
                    result['infraCnt'] = infraCnt

                    this.selfQualityReply.view = {
                        ...result
                    }

                    this.fn_selfQualityReplySheet(data);
                }
            },
            
            //회신현황 List sheet
            fn_selfQualityReplySheet(data) {

                let options = selfQualityReplyList.options;

                options.Events = {
                    onClick: this.fn_selfQualityReplyDetail,
                    onRenderFirstFinish: async () => {
                        this.selfQualityReplySheet.loadSearchData({
                            data: data,
                            append: false
                        })
                    },
                }

                loader.createSheet({
                    el: 'selfQualityReplySheet',
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.selfQualityReplySheet = sheet;
                })
            },

            //회신 현황 검색
            fn_selfQualityReplySearch(type){
                if(type && type == 'reset'){
                    this.selfQualityReply.search = {
                        baseType : '',
                        csrtType : '',
                        projectId : '',
                        projectNm : '',
                    }
                }
                let obj = {
                    ...this.selfQualityReply.search
                }

                this.fn_selfQualityReply(obj);
            },

            //회신현황 검색 코드값 세팅
            fn_selfQualityReplySearchOption(event){

                const selectVal = event.target.value
                let chkList = []
                let chkIdx = 0

                this.csrtTypeCodeList.forEach((item, idx) => {
                    if(selectVal == ''){
                    }
                    else if(selectVal == '0'){
                        if(item.codeVal != '3'){
                            const defaultCode = {
                                'codeVal':'',
                                'codeNameKr':'선택',
                                'codeNameEn':'select',
                            }
                            if(0 >= chkIdx){
                                chkIdx++;
                                chkList.push(defaultCode)    
                            }
                            chkList.push(item)
                        }
                    }
                    else if(selectVal == '1'){
                        if(item.codeVal == '3'){
                            chkList.push(item)
                        }
                    }
                })

                if(selectVal == '' || selectVal == '0'){
                    this.selfQualityReply.search.csrtType = ''
                }
                else if(selectVal == '1'){
                    this.selfQualityReply.search.csrtType = '3' 
                }

                this.selfQualityReply.search.csrtTypeCodeList = chkList;

            },

            //회신현황 상세 open btn
            fn_selfQualityReplyDetail(evtParam){
                if(evtParam.col == "replyBtn" && evtParam.event.target.tagName == "BUTTON"){ // infoBtn: 점검
                    this.selfQualityReply.detail.param = {
                        ...evtParam.row
                    }
                    this.selfQualityReply.detail.fileList = []
                    this.selfQualityReply.detail.imgFileList = []
                    this.selfQualityReply.detail.info = {}
                    this.$bvModal.show('selfQualityReplyDetailModal');
                }
            },

            //회신현황 상세 shown event
            async fn_selfQualityReplyDetailOpen(){
                
                try {

                    const payload = {
                        siteMstrId : this.siteMstrId, 
                        selfQltyPrjtInfoId : this.selfQualityReply.detail.param.selfQltyPrjtInfoId,
                        selfQltySiteInfoId : this.selfQualityReply.detail.param.selfQltySiteInfoId,
                        checkUserId : this.selfQualityReply.detail.param.checkUserId,
                    } 

                    const url = this.sendUrl+'/head/checkRslt/view';
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                    const response = await sendPostApi(url, payload);

                    if(response.status == '200'){
                        
                        this.selfQualityReply.detail.info = {
                            ...response.data.resultData
                        }
                        let resultData = {
                            ...response.data.resultData
                        }

                        // console.log('this.selfQualityReply.detail.info : ', this.selfQualityReply.detail.info);
    
                        let fileUrl = '/sendApi/api/file/upFileList';
        
                        let param = {
                            fileType : "SelfQltyChkImg",
                            fileConnectId : resultData.selfSiteChkRstId,
                        };
    
                        //이미지 파일
                        let imgFileRst = await sendPostApi(fileUrl, param)
    
                        if(imgFileRst.status == '200'){
                            if(imgFileRst.data.data.length > 0){
                                this.selfQualityReply.detail.imgFileList = imgFileRst.data.data;
                            }
                        }
    
                        //첨부 파일
                        param['fileType'] = 'SelfQltyChk'
                        let fileRst = await sendPostApi(fileUrl, param)
    
                        if(fileRst.status == '200'){
                            if(fileRst.data.data.length > 0){
                                this.selfQualityReply.detail.fileList = fileRst.data.data;
                            }
                        }
    
                        let checkData = []; //check sheet data
                        let punchData = []; //punch sheet data
    
                        //체크리스트
                        //입력
                        resultData.chkRsltVO.forEach(item => {
                            item['pass'] = ''
                            item['part'] = ''
                            item['unpass'] = ''
                            item['none'] = ''
                            if(item.accpChkRslt == null || item.accpChkRslt == ""){
                                item['pass'] = '1'
                            }
                            else{
                                if(item.accpChkRslt == "PASS"){
                                    item['pass'] = '1'
                                }
                                else if(item.accpChkRslt == "PART"){
                                    item['part'] = '1'
                                }
                                else if(item.accpChkRslt == "UNPASS"){
                                    item['unpass'] = '1'
                                }
                                else if(item.accpChkRslt == "NONE"){
                                    item['none'] = '1'
                                }
                            }
                            checkData.push(item)
                        })

                        this.fn_replyDetailCheckListSheet(checkData);
                    }
                    
                } catch (error) {
                    console.error(error)
                }
                
            },

            fn_checkListClass(evtParam){
                /* console.log('sheet.getHeaderRows()[0] : ', sheet.getHeaderRows()[0]) */
                evtParam.sheet.setAttribute(evtParam.sheet.getHeaderRows()[0], "pass", "Class", "", 1);
                // sheet.setAttribute(sheet.getHeaderRows()[0], "pass", "Requried", 0, 1);
            },
            
            //회신 상세 checklist sheet
            fn_replyDetailCheckListSheet(data) {

                let options = siteCheckResultList.options;

                //check sheet
                options.Cfg = {NoVScroll: 0,}

                options.Events = {
                    /* onRenderFinish: this.fn_checkListClass, */
                    onRenderFirstFinish: async (event) => {
                        event.sheet.setAttribute(null, "pass", "CanEdit", 0, 1);
                        event.sheet.setAttribute(null, "part", "CanEdit", 0, 1);
                        event.sheet.setAttribute(null, "unpass", "CanEdit", 0, 1);
                        event.sheet.setAttribute(null, "none", "CanEdit", 0, 1);
                        event.sheet.setAttribute(null, "comment", "CanEdit", 0, 1);
                        event.sheet.setAttribute(null, "pass", "Class", "disabled", 1);
                        event.sheet.setAttribute(null, "part", "Class", "disabled", 1);
                        event.sheet.setAttribute(null, "unpass", "Class", "disabled", 1);
                        event.sheet.setAttribute(null, "none", "Class", "disabled", 1);
                        event.sheet.setAttribute(null, "comment", "Class", "disabled", 1);
                        event.sheet.loadSearchData({
                            data: data,
                            append: false
                        })
                        this.fn_checkListClass(event)
                    },
                }

                loader.createSheet({
                    el: 'replyDetailCheckListSheet',
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.replyDetailCheckListSheet = sheet
                })
            },

            
            //본사 list
            async fn_selfQualityList(idx, searchObj){

                let payload = {};

                this.selfQualityObj.search.result = {
                    ...searchObj
                }

                payload = {
                    ...this.selfQualityObj.search.result
                }
                
                let url = this.sendUrl+'/head/checkReq/list';

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                const response = await sendPostApi(url, payload);

                let data = [];

                if(response.status == '200'){
                    if(response.data.data && response.data.data.length > 0){
                        let yearList = [];
                        let resultObj = response.data.data;
                        resultObj.forEach(item => {
                            //list 조건 처리
                            let allCnt = item.cstrtAllCnt + item.infraAllCnt
                            let allChkCnt = item.cstrtChkCnt + item.infraChkCnt
                            
                            if(allCnt == allChkCnt){
                                item['allChk'] = item.siteSendYn == 'Y' ? allChkCnt + '/' + allCnt : allCnt;
                            }
                            else{
                                item['allChk'] = item.siteSendYn == 'Y' ? '<span class="inCount">' + allChkCnt + '</span>/<span class="totalCount">' + allCnt + '</span>' : allCnt
                            }

                            if(item.cstrtAllCnt == item.cstrtChkCnt){
                                item['constructChk'] = item.siteSendYn == 'Y' ? item.cstrtChkCnt + '/' + item.cstrtAllCnt : item.cstrtAllCnt;
                            }
                            else{
                                item['constructChk'] = item.siteSendYn == 'Y' ? '<span class="inCount">' + item.cstrtChkCnt + '</span>/<span class="totalCount">' + item.cstrtAllCnt + '</span>' : item.cstrtAllCnt
                            }
                            if(item.infraAllCnt == item.infraChkCnt){
                                item['infraChk'] = item.siteSendYn == 'Y' ? item.infraChkCnt + '/' + item.infraAllCnt : item.infraAllCnt;
                            }
                            else{
                                item['infraChk'] = item.siteSendYn == 'Y' ? '<span class="inCount">' + item.infraChkCnt + '</span>/<span class="totalCount">' + item.infraAllCnt + '</span>' : item.infraAllCnt
                            }

                            item['detailInfo'] = '0'
                            item['siteSendYnNm'] = item.siteSendYn == 'Y' ? '발송 완료' : '발송 전';
                            item['siteSendDt'] = item.siteSendYn == 'Y' ? item.siteSendDt : '-'
                            item['replyStatus'] = item.siteSendYn == 'Y' ? '0':'-'

                            if(item.inUser == this.userInfo.userId){
                                item['checkYn'] = '1'
                            }
                            else{
                                item['checkYn'] = '0'
                            }

                            if(this.selfQualityObj.search.result.title == '' && this.selfQualityObj.search.result.year == ''){
                                //검색 option
                                let year = this.$moment(item.inDttm).format('yyyy');
                                if(!yearList.includes(year)){
                                    yearList.push(year);
                                }
                            }
                        })

                        //검색 년도 list
                        if(yearList.length > 0){
                            yearList = yearList.sort(function(a, b)  {
                                return b - a;
                            });
    
                            let yearOptionList = [];
    
                            //default
                            yearOptionList.push(
                                {
                                    key : '전체',
                                    val : ''
                                }
                            );
    
                            yearList.forEach(item => {
                                let inputObj = {
                                    'key' : item+'년',
                                    'val' : item
                                }
                                yearOptionList.push(inputObj);
                            })
                            
                            this.selfQualityObj.yearOptionList = yearOptionList;
                        }
                        data = resultObj
                    }
                }

                this.fn_selfQualitySheet(data);
                this.currentTab = idx;
            },
            
            //점검요청 검색
            fn_selfQualitySearch(type) {
                let searchObj = {}
                if(type == 'reset'){
                    this.selfQualityObj.search.input.title = ''
                    this.selfQualityObj.search.input.year = ''
                }
                searchObj = {
                    'title' : this.selfQualityObj.search.input.title,
                    'year' : this.selfQualityObj.search.input.year,
                }
                this.fn_selfQualityList(this.currentTab, searchObj)
            },

            //check list
            async fn_checkList(idx){

                let data = [];

                let payload = {
                    'siteMstrId' : 'ALL_SITE'
                };

                try {
                    let url = this.sendUrl+'/popup/checkList/list';
    
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
    
                    const response = await sendPostApi(url, payload);
    
                    if(response.status == '200'){
                        if(response.data.data && response.data.data.length > 0){
                            data = response.data.data
                        }
                    }
    
                } catch (error) {
                    console.error(error);
                }
                
                this.fn_checkListSheet(data);
                this.currentTab = idx;
            },

            //점검요청 등록 모달
            fn_selfQualityWriteOpen(areaType){

                //value 초기화
                this.chkInfoObj.inputDate = this.$moment().format("YYYY-MM-DD")
                this.chkInfoObj.constructCnt = 0
                this.chkInfoObj.infraCnt = 0
                this.chkInfoObj.inputTitle = ''
                this.chkInfoObj.showCheckListTitle = ''
                this.chkInfoObj.projSearch.projectNm = ''
                this.chkInfoObj.projSearch.mngtType = '0'
                this.chkInfoObj.projSearch.baseType = ''
                this.chkInfoObj.selfChkInfo = {}
                this.fn_projectSheet(null, areaType, null ,() => {
                    this.fn_selectProjectSheet([], areaType);
                });
            },

            //점검요청 등록
            fn_selfQualityWrite(){
                // console.log(this.chkInfoObj.selfChkInfo)
                let resultSiteList = [];
                let siteList = this.selectProjectSheet.getShownRows(0)

                if(commonFn.methods.isEmpty(this.chkInfoObj.inputTitle)){  
                    this.alert('제목을 입력해주세요.');
                    return;
                }

                if(commonFn.methods.isEmpty(this.chkInfoObj.selfChkInfo.selfChkInfoId)){  
                    this.alert('점검 양식을 선택해주세요.');
                    return;
                }

                const today = this.$moment().format("YYYY-MM-DD")
                const dateChk = this.$moment(today).isAfter(this.chkInfoObj.inputDate)
                if(dateChk){
                    this.alert('점검 완료 요청일은 오늘 이전 일자는 선택할 수 없습니다. 다시 선택해주세요');
                    return;
                }

                if(0 >= siteList.length){
                    this.alert('대상 프로젝트을 선택해주세요.');
                    return;
                }
                else{
                    siteList.forEach(item => {
                        let inputObj = {
                            'siteMstrId' : item.siteMstrId,
                        }
                        resultSiteList.push(inputObj);
                    })
                }

                this.confirm('등록하시겠습니까?', async() => {
                    const payload = {
                        'title' : this.chkInfoObj.inputTitle,
                        'checkTitle' : this.chkInfoObj.selfChkInfo.selfChkInfoTitle,
                        'checkDt' : this.chkInfoObj.inputDate,
                        'selfChkInfoId' : this.chkInfoObj.selfChkInfo.selfChkInfoId,
                        'siteList' : resultSiteList,
                    }
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = this.sendUrl + '/head/checkReq/write';
                    const response = await sendPostApi(url, payload)
                    
                    if(response.status == '200'){
                        this.alert('저장되었습니다.', ()=> {
                            this.$bvModal.hide('selfQualityHeadWriteModal');
                            this.fn_selfQualityList(this.currentTab, this.selfQualityObj.search.result)
                        });
                    }
                })

            },

            //점검요청 수정 모달
            fn_selfQualityChangeModalOpen() {
                if(this.chkInfoObj.view.siteSendYn != 'N'){
                    this.alert('이미 송부된 점검 요청은 \n수정할 수 없습니다.');
                    return;
                }
                else{
                    this.$bvModal.show('selfQualityHeadChangeModal');
                }
            },

            //점검요청 수정
            fn_selfQualityChange(){

                let resultSiteList = [];
                let siteList = this.selectProjectSheet.getShownRows(0)

                if(commonFn.methods.isEmpty(this.chkInfoObj.inputTitle)){  
                    this.alert('제목을 입력해주세요.');
                    return;
                }

                if(commonFn.methods.isEmpty(this.chkInfoObj.selfChkInfo.selfChkInfoId)){  
                    this.alert('점검 양식을 선택해주세요.');
                    return;
                }

                if(commonFn.methods.isEmpty(this.chkInfoObj.inputDate)){  
                    this.alert('점검 완료 요청일을 선택해주세요.');
                    return;
                }

                if(0 >= siteList.length){
                    this.alert('대상 프로젝트을 선택해주세요.');
                    return;
                }
                else{
                    siteList.forEach(item => {
                        let inputObj = {
                            'siteMstrId' : item.siteMstrId,
                        }
                        resultSiteList.push(inputObj);
                    })
                }

                this.confirm('저장하시겠습니까?', async() => {
                    const payload = {
                        'selfQltyPrjtInfoId' : this.chkInfoObj.change.selfQltyPrjtInfoId,
                        'title' : this.chkInfoObj.inputTitle,
                        'checkTitle' : this.chkInfoObj.selfChkInfo.selfChkInfoTitle,
                        'checkDt' : this.chkInfoObj.inputDate,
                        'selfChkInfoId' : this.chkInfoObj.selfChkInfo.selfChkInfoId,
                        'siteList' : resultSiteList,
                    }
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = this.sendUrl + '/head/checkReq/change';
                    const response = await sendPostApi(url, payload)
                    
                    if(response.status == '200'){
                        this.alert('저장되었습니다.', () => {
                            this.$bvModal.hide('selfQualityHeadChangeModal');
                            this.fn_selfQualityDetailOpen();
                            this.fn_selfQualityList(this.currentTab, this.selfQualityObj.search.result);
                        });
                    }
                })

            },

            //점검요청 수정
            fn_selfQualityUnuse(type){
                let resultData = {};

                if(type == 'list'){
                    const selectRows = this.selfQualitySheet.getRowsByChecked('isChecked');
                    if(selectRows.length === 0) {
                        return this.alert("선택된 행이 없습니다.");
                    }

                    let data = [];
                    let siteSendCheck = true;

                    selectRows.forEach(item => {
                        if(item.siteSendYn == 'Y'){
                            siteSendCheck = false;
                        }
                        data.push(
                            item.selfQltyPrjtInfoId,
                        )
                    });

                    if(siteSendCheck){
                        resultData = {
                            'selfQltyPrjtInfoIds' : data
                        }
                    }
                    else{
                        this.alert('이미 송부된 점검 요청은 \n삭제할 수 없습니다.');
                        return;
                    }
                }
                //단일
                else{
                    if(this.chkInfoObj.view.siteSendYn != 'N'){
                        this.alert('이미 송부된 점검 요청은 \n삭제할 수 없습니다.');
                        return;
                    }
                    else{
                        resultData = {
                            'selfQltyPrjtInfoId' : this.chkInfoObj.view.selfQltyPrjtInfoId
                        }
                    }
                }

                this.confirm('삭제하시겠습니까?', async() => {
                    try {
    
                        let url = this.sendUrl + '/head/checkReq/unUse'
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                        let payload = {
                            ...resultData
                        };

                        const response = await sendPostApi(url, payload);

                        if(response.status == '200'){
                            this.alert('삭제되었습니다.', () => {
                                if(type == 'detail'){
                                    this.$bvModal.hide('selfQualityHeadDetailModal');
                                }
                                this.fn_selfQualityList(this.currentTab, this.selfQualityObj.search.result);
                            }); 
                        }
                    } catch (error) {
                        console.error(error);
                    }
                });
            },

            //현장송부 btn
            fn_sendSite(type){

                let resultData = {}

                //송부여부 체크
                if(type == 'list'){
                    const selectRows = this.selfQualitySheet.getRowsByChecked('isChecked');

                    if(!selectRows || 0 >= selectRows.length){
                        return this.alert("선택된 행이 없습니다.");
                    }
                    let siteSendCheck = true;
                    let data = [];

                    selectRows.forEach(item => {
                        if(item.siteSendYn == 'Y'){
                            siteSendCheck = false;
                        }
                        data.push(
                            item.selfQltyPrjtInfoId,
                        )
                    });

                    if(siteSendCheck){
                        resultData = {
                            'selfQltyPrjtInfoIds' : data
                        }
                    }
                    else{
                        this.alert('이미 송부된 점검 요청은 \n송부할 수 없습니다.');
                        return;
                    }
                }
                //단일
                else{
                    resultData = {
                        'selfQltyPrjtInfoId' : this.chkInfoObj.view.selfQltyPrjtInfoId
                    }
                }

                this.confirm('현장으로 송부하시겠습니까?', async() => {
                    try {
    
                        let url = this.sendUrl + '/head/checkReq/sendSite'
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                        let payload = {
                            ...resultData,
                            siteSendDt : this.$moment().format('YYYY-MM-DD')
                        };

                        const response = await sendPostApi(url, payload);

                        if(response.status == '200'){
                            this.alert('송부되었습니다.', () => {
                                if(response.data.resultData && response.data.resultData.length > 0){
                                    const msgUrl = '/sendApi/api/messageMngt/message/send'
                                    const options = {
                                        headers : {
                                            'Authorization': this.$cookies.get('Authorization'),
                                            'Content-Type': 'application/json',
                                            'Accept-Language': 'ko'
                                        },
                                    }
                                    let msgList = response.data.resultData;
                                    let result = true;
                                    for(let item of msgList){
                                        const msgPayload = {
                                              messageCode :   'A050'
                                            , userId :        this.userInfo.userId
                                            , reciveUserIds : item.reciveUserIds
                                            , docSeq :        '자체품질점검 본사요청이 도착했습니다.'
                                            , projectId:      item.projectId
                                            , projectName:    item.projectNm
                                            , siteMstrId:     item.siteMstrId
                                        }
                                        axios.post(msgUrl, msgPayload, options).then(res => {
                                            if (res.status !== 200) {
                                                throw new Error('fn_sendMessage')
                                            }
                                        }).catch(error => {
                                            result = false;
                                            console.error(error)
                                        })
                                    }
                                    if(!result){
                                        this.alert('발송에 실패했습니다.');
                                    }
                                }
                                
                                if(type == 'detail'){
                                    this.$bvModal.hide('selfQualityHeadDetailModal');
                                    // this.fn_selfQualityDetailOpen();
                                }
                                this.fn_selfQualityList(this.currentTab, this.selfQualityObj.search.result);
                            }); 
                        }
                        else{
                            this.alert('송부를 실패했습니다.'); 
                            // console.log('에러 : ', response);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                });
            },

            //check list 검색 팝업 열기
            fn_checkListModalOpen(){
                this.fn_checkListModalSheet();
            },

            /* 점검상세 팝업 버튼 클릭*/
            fn_selfQualityDetailClick(evtParam){
                const selectRow = {
                    ...evtParam.row
                }
                if(evtParam.col == "detailInfo" && evtParam.event.target.tagName == "BUTTON"){
                    this.chkInfoObj.view = {
                        'selfQltyPrjtInfoId' : selectRow.selfQltyPrjtInfoId
                    }
                    this.$bvModal.show('selfQualityHeadDetailModal')
                }
                else if(evtParam.col == "replyStatus" && evtParam.event.target.tagName == "BUTTON"){
                    this.selfQualityReply.selfQltyPrjtInfoId = selectRow.selfQltyPrjtInfoId
                    this.selfQualityReply.search = {
                        baseType : '',
                        csrtType : '',
                        projectId : '',
                        projectNm : '',
                    },
                    this.$bvModal.show('selfQualityReplyModal')
                }
            },

            //단일
            fn_copyRow(evt){

                let clickRow = evt.row;

                if(clickRow){

                    if(!clickRow.siteMstrId){
                        return;
                    }

                    let copiedRow = this.selectProjectSheet.copyRow({row:clickRow, next:this.selectProjectSheet.getFirstRow()});

                    // this.projectSheet.deleteRow(clickRow);
                    clickRow.isChecked = 0;
                    this.projectSheet.hideRow({
                        row: clickRow,
                        norender: false
                    });

                    clickRow = null;
                    copiedRow['isChecked'] = false
                    this.selectProjectSheet.refreshCell(copiedRow, 'isChecked')

                    if(!this.projectSheet.getShownRows(0) 
                        || 0 >= this.projectSheet.getShownRows(0).length){
                        this.projectSheet.loadSearchData({}, 0 );
                    }
                    this.fn_cntCheck();
                }
            },

            fn_copyRows () {   // 선택된 데이터로 이동

                let checkedRows = this.projectSheet.getRowsByChecked('isCheck');

                if(checkedRows.length === 0) {
                    this.alert('프로젝트를 선택해주세요');
                    return;
                }
                const copiedRows = this.selectProjectSheet.copyRows(checkedRows, this.selectProjectSheet.getFirstRow());
                // this.projectSheet.deleteRows(checkedRows);
                checkedRows.forEach(item => {
                    item.isChecked = 0;   // 체크 초기화
                    this.projectSheet.hideRow({
                        row: item,
                        /* del: false, */
                        norender: false
                    });
                });
                checkedRows = null;
                copiedRows.forEach(item => {
                    item['isChecked'] = false
                    this.selectProjectSheet.refreshCell(item, 'isChecked')
                })

                if(!this.projectSheet.getShownRows(0) 
                    || 0 >= this.projectSheet.getShownRows(0).length){
                    this.projectSheet.loadSearchData({}, 0 );
                }
                this.fn_cntCheck();
            },

            //단일
            fn_deleteRow(evt) {  // 본사 Set-up 데이터로 이동
                let clickRow = evt.row;

                if(clickRow){

                    if(!clickRow.siteMstrId){
                        return;
                    }

                    let copiedRow = this.projectSheet.copyRow({row:clickRow, next:this.projectSheet.getFirstRow()});

                    // this.selectProjectSheet.deleteRow(clickRow);
                    clickRow.isChecked = 0;
                    this.selectProjectSheet.hideRow({
                        row: clickRow,
                        norender: false
                    });

                    clickRow = null;
                    copiedRow['isChecked'] = false
                    this.projectSheet.refreshCell(copiedRow, 'isChecked')

                    if(!this.selectProjectSheet.getShownRows(0) 
                        || 0 >= this.selectProjectSheet.getShownRows(0).length){
                        this.selectProjectSheet.loadSearchData({}, 0 );
                    }
                    this.fn_cntCheck();
                }
            },

            fn_deleteRows() {  // 본사 Set-up 데이터로 이동

                let checkedRows = this.selectProjectSheet.getRowsByChecked('isCheck');
                if(checkedRows.length === 0) {
                    this.alert('프로젝트를 선택해주세요');
                    return;
                }
                const copiedRows = this.projectSheet.copyRows(checkedRows, this.projectSheet.getFirstRow());
                // this.selectProjectSheet.removeRows(checkedRows);
                checkedRows.forEach(item => {
                    item.isChecked = 0;   // 체크 초기화
                    this.selectProjectSheet.hideRow({
                        row: item,
                        del: false,
                        norender: false
                    });
                });
                checkedRows = null;
                copiedRows.forEach(item => {
                    item['isChecked'] = false
                    this.projectSheet.refreshCell(item, 'isChecked')
                })

                if(0 >= this.selectProjectSheet.getShownRows(0).length){
                    this.selectProjectSheet.loadSearchData({}, 0 );
                }

                this.fn_cntCheck();
            },

            fn_cntCheck(){
                let rows = this.selectProjectSheet.getShownRows(0);
                let constructCnt = 0;
                let infraCnt = 0;

                this.projectSheet.rerender();
                this.selectProjectSheet.rerender();

                rows.forEach(item => {
                    if(item.baseType == '4000'){
                        constructCnt++
                    }
                    else{
                        infraCnt++
                    }
                })
                this.chkInfoObj.constructCnt = constructCnt
                this.chkInfoObj.infraCnt = infraCnt
                /* let checkList = this.checkListChangeSelfHeadSheet.getRowsByStatus("Added,Changed,Deleted") */
            },

            /* 점검상세 팝업 */
            async fn_selfQualityDetailOpen(){
                
                const payload = {
                    'selfQltyPrjtInfoId' : this.chkInfoObj.view.selfQltyPrjtInfoId,
                }

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = this.sendUrl + '/head/checkReq/view';
                const response = await sendPostApi(url, payload)

                let data = []

                if(response.status == '200'){
                    let constructCnt = 0;
                    let infraCnt = 0;

                    this.chkInfoObj.view = {
                        ...response.data.data
                    }
                    data = response.data.mySite
                    data.forEach(item => {
                        if(item.baseType == '4000'){
                            constructCnt++;
                        }
                        else if(item.baseType == '1000'){
                            infraCnt++;
                        }
                    })
                    this.chkInfoObj.view['constructCnt'] = constructCnt
                    this.chkInfoObj.view['infraCnt'] = infraCnt
                }
                this.fn_selfQualityDetailSheet(data);
            },

            //점검수정 팝업
            async fn_selfQualityChangeOpen(areaType){

                const payload = {
                    'selfQltyPrjtInfoId' : this.chkInfoObj.view.selfQltyPrjtInfoId,
                }

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = this.sendUrl + '/head/checkReq/view';
                const response = await sendPostApi(url, payload)

                let data = []
                let selectData = []
                
                if(response.status == '200'){
                    let checkObj = response.data.data;
                    let checkList = response.data.mySite;
                    this.chkInfoObj.inputDate = checkObj.checkDt
                    this.chkInfoObj.inputTitle = checkObj.title
                    this.chkInfoObj.showCheckListTitle = checkObj.selfChkInfoTitle
                    this.chkInfoObj.projSearch.projectNm = ''
                    this.chkInfoObj.projSearch.baseType = ''
                    this.chkInfoObj.selfChkInfo = {
                        selfChkInfoId : checkObj.selfChkInfoId,
                        selfChkInfoTitle : checkObj.selfChkInfoTitle
                    }
                    this.chkInfoObj.change = {
                        ...checkObj
                    }
                    if(checkList.length > 0){
                        let constructCnt = 0
                        let infraCnt = 0
                        //select project
                        selectData = checkList;
                        checkList.forEach(item => {
                            //비교값
                            data.push(item.siteMstrId)

                            if(item.baseType == '4000'){
                                constructCnt ++;
                            }
                            else if(item.baseType == '1000'){
                                infraCnt++;
                            }
                        })
                        this.chkInfoObj.constructCnt = constructCnt
                        this.chkInfoObj.infraCnt = infraCnt
                    }
                }

                this.fn_projectSheet(null, areaType, data, () => {
                    this.fn_selectProjectSheet(selectData, areaType);
                });
            },

            //마스터 코드 조회
            fn_projectCodeList(){

                let codeValArr = ['BASE_TYPE','MNGT_TYPE','CSRT_TYPE']
                const url = '/sendApi/api/common/masterCode/list';
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                
                codeValArr.forEach( async item => {
                    const payload = {
                        groupCode : item
                    }
                    const response = await sendPostApi(url, payload)
    
                    if(response.status == '200'){
                        let codeList = [];
    
                        response.data.data.forEach(item => {
                            codeList.push(item);
                        });

                        if(item == 'BASE_TYPE'){
                            this.baseTypeCodeList = codeList;
                        }
                        else if(item == 'MNGT_TYPE'){
                            
                            this.mngtTypeCodeList = codeList;
                        }
                        else{
                            this.csrtTypeCodeList = codeList;
                        }
                    }
                })
            },

            //카테고리 selectbox 조회
            async fn_getCategoryData(payload, callback) {

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'SELF' };
                try {

                    const { data } = await sendPostApi(url, param);

                    const options = {
                        categoryData: data.list,
                        seperator: '|',
                        key:'CodeId',
                        value: 'Name',
                        innerObjectKey: 'midCodeList',
                        ...payload
                    }

                    if(!(options.main && options.mid)) return

                    options.main.Enum = `${options.seperator}${options.categoryData.map(item => item['main'.concat(options.value)]).join(options.seperator)}`
                    options.main.EnumKeys = `${options.seperator}${options.categoryData.map(item => item['main'.concat(options.key)]).join(options.seperator)}`
                    options.main.clear = options.mid.Name

                    options.mid.Related = options.main.Name
                    options.categoryData.forEach(item => {
                        options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${item[options.innerObjectKey].map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
                        options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${item[options.innerObjectKey].map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
                    })

                    return callback()

                } catch (error) {
                    console.error(error.response.data)
                }
            },

            //체크리스트 등록 모달 열기
            fn_checkListWriteModalOpen(){
                this.checkListObj.write.addCount = 1;
                this.fn_checkListWriteSelfHeadSheet();
            },

            //체크리스트 수정 모달
            fn_selectCheckChangeOpen: function(evtParam) {

                if(!evtParam.row || !evtParam.row.selfChkInfoId){
                    return;
                }


                this.checkListObj.change = {
                    ...evtParam.row
                }

                const authCheck = this.checkUser(this.userInfo.userId, 'change');
                if(authCheck){
                    this.checkListAuth = true;
                }
                else{
                    this.checkListAuth = false;
                }
                this.$root.$emit('bv::show::modal', 'checkListSelfHeadChangeModal')
            },

            //체크리스트 수정 모달 열기
            async fn_checkListChangeModalOpen(){

                const payload = {
                    'selfChkInfoId' : this.checkListObj.change.selfChkInfoId,
                }

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = this.sendUrl + '/popup/checkList/view';
                const response = await sendPostApi(url, payload)

                if(response.status == '200'){
                    let sheetData = response.data.data.checkList;
                    this.checkListObj.change = {
                        ...response.data.data,
                        addCount : 1
                    }
                    this.fn_checkListChangeSelfHeadSheet(sheetData);
                }

            },

            fn_checkListAddBtn(sheetId, target) { //행추가
                /* sheetId.addRow({ next : sheetId.getFirstRow()}); */
                
                Array(target.addCount).fill().forEach(() => {
                    sheetId.addRow({
                        next : sheetId.getFirstRow()
                    })
                })
            },
            
            fn_checkListDelBtn(sheetId) {//행삭제
                const checkedRows = sheetId.getRowsByChecked('isChecked');
                if(checkedRows.length === 0 || checkedRows[0].nullSheet && checkedRows[0].nullSheet === "1") {
                    return this.alert("선택된 행이 없습니다.");
                }

                sheetId.removeRows(checkedRows);
                if(0 >= sheetId.getShownRows(0).length){
                    sheetId.loadSearchData({}, 0 );
                }
            },

            fn_checkListCopyBtn(sheetId) {
                const copyRows = sheetId.getRowsByChecked('isChecked');
                if(copyRows.length === 0) {
                    return this.alert("선택된 행이 없습니다.");
                }
                else{
                    sheetId.copyRows({rows:copyRows});
                }
            },

            //체크리스트 등록
            fn_checkListWrite(){
                
                let checkList = this.checkListWriteSelfHeadSheet.getShownRows(0)
                let resultList = [];
                let listCheck = true;

                if(0 >= checkList.length){
                    this.alert('저장할 데이터가 없습니다.');
                    return;
                }

                if(commonFn.methods.isEmpty(this.checkListObj.write.title)){  
                    this.alert('제목을 입력해주세요.');
                    return;
                }

                for(const item of checkList) {
                    if(commonFn.methods.isEmpty(item.mainCodeId)){
                        listCheck = false;
                        this.alert('공종을 선택해주세요.');
                        break;
                    }
                    if(commonFn.methods.isEmpty(item.midCodeId)){
                        listCheck = false;
                        this.alert('세부 공종을 선택해주세요.');
                        break;
                    }
                    if(commonFn.methods.isEmpty(item.chkContent)){
                        listCheck = false;
                        this.alert('점검내용을 입력해주세요.');
                        break;
                    }

                    let checkListObj = {
                        mainCodeId: item.mainCodeId,
                        midCodeId: item.midCodeId,
                        chkStd: item.chkStd,
                        chkContent: item.chkContent,
                    }

                    resultList.push(checkListObj);
                }

                if(!listCheck){
                    return;
                }
                else{
                    this.confirm('등록하시겠습니까?', async() => {
                        try {
                            const payload = {
                                title : this.checkListObj.write.title,
                                siteMstrId : 'ALL_SITE',
                                checkList : resultList,
                            }
                            let url = this.sendUrl + '/popup/checkList/write'
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
            
                            const response = await sendPostApi(url, payload);

                            if(response.status == '200'){
                                this.alert('저장되었습니다.', () => {
                                    this.$bvModal.hide('checkListSelfHeadWriteModal');
                                    this.fn_checkList(this.currentTab)
                                }); 
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    })
                }
            },

            //체크리스트 수정
            fn_checkListChange(){

                let checkList = this.checkListChangeSelfHeadSheet.getShownRows(0)
                let resultList = [];
                let listCheck = true;

                if(0 >= checkList.length){
                    this.alert('수정할 데이터가 없습니다.');
                    return;
                }

                if(commonFn.methods.isEmpty(this.checkListObj.change.title)){  
                    this.alert('제목을 입력해주세요.');
                    return;
                }

                for(const item of checkList) {
                    if(commonFn.methods.isEmpty(item.mainCodeId)){
                        listCheck = false;
                        this.alert('공종을 선택해주세요.');
                        break;
                    }
                    if(commonFn.methods.isEmpty(item.midCodeId)){
                        listCheck = false;
                        this.alert('세부 공종을 선택해주세요.');
                        break;
                    }
                    if(commonFn.methods.isEmpty(item.chkContent)){
                        listCheck = false;
                        this.alert('점검내용을 입력해주세요.');
                        break;
                    }

                    let checkListObj = {
                        mainCodeId: item.mainCodeId,
                        midCodeId: item.midCodeId,
                        chkStd: item.chkStd,
                        chkContent: item.chkContent,
                    }

                    resultList.push(checkListObj);
                }

                if(!listCheck){
                    return;
                }
                else{
                    this.confirm('수정하시겠습니까?', async() => {
                        try {
                            const payload = {
                                selfChkInfoId : this.checkListObj.change.selfChkInfoId,
                                title : this.checkListObj.change.title,
                                checkList : resultList,
                            }
                            let url = this.sendUrl + '/popup/checkList/change'
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
            
                            const response = await sendPostApi(url, payload);

                            if(response.status == '200'){
                                this.alert('수정되었습니다.', () => {
                                    this.$bvModal.hide('checkListSelfHeadChangeModal');
                                    this.fn_checkList(this.currentTab)
                                }); 
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    })
                }
            },

            //체크리스트 삭제
            fn_checkListUnuse(){
                const selectRows = this.checkListSheet.getRowsByChecked('isChecked');
                if(selectRows.length === 0) {
                    return this.alert("선택된 행이 없습니다.");
                }
                else{
                    this.confirm('삭제하시겠습니까?', async() => {
                        try {
                            let resultList = []
                            selectRows.forEach(item => {
                                resultList.push(
                                    item.selfChkInfoId,
                                )
                            });
        
                            let url = this.sendUrl + '/popup/checkList/unUse'
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                            let payload = {
                                'selfChkInfoIds' : resultList,
                                'delYn' : 'Y'
                            };
        
                            const response = await sendPostApi(url, payload);
                            if(response.status == '200'){
                                this.alert('삭제되었습니다.', () => {
                                    this.fn_checkList(this.currentTab)
                                }); 
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    });
                }
            },
            fn_importExcel: function (data) {
                // maybe..?
                this.checkListWriteSelfHeadSheet.loadSearchData({
                    data: data,
                    append: true,
                    next: this.checkListWriteSelfHeadSheet.getFirstRow()
                });
                this.$bvModal.hide('SelfQualityHeadSheet_ExcelUploadModal1');
            },
            fn_importChangeExcel: function (data) {
                // maybe..?
                this.checkListChangeSelfHeadSheet.loadSearchData({
                    data: data,
                    append: true,
                    next: this.checkListChangeSelfHeadSheet.getFirstRow()
                });
                this.$bvModal.hide('SelfQualityHeadSheet_ExcelUploadModal2');
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols: sheet.options.Cols.filter((item) => !['isChecked','isCheck','detailInfo','replyStatus'].includes(item.Name))
                }
                this.excelDownload.downloadOption = {
                    checkBoxOnValue:    'Y',
                    checkBoxOffValue:   'Y',
                }
                this.excelDownload.fileName  = `자체품질점검_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                this.excelDownload.data      = _.cloneDeep(sheet.getShownRows(0));
                this.excelDownload.request  = true;
            },
        },
        
   }
</script>