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
                        <col width="80">
                        <col width="300">
                        <col width="80">
                        <col width="300">
                        <col width="80">
                        <col width="300">
                        <col width="80">
                        <col width="300">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>회신요구일</th>   
                            <td>
                            <DatePickerRange
                                v-model="mySite.list.input.inputDate"
                            />
                            </td>
                            <th>제목</th>   
                            <td><input type="text" v-model="mySite.list.input.title" class="form_control size_md" maxlength="100" @keyup.enter="fn_mySiteSearch"></td>
                            <th>현황</th>
                            <td>
                                <select name="" id="" v-model="mySite.list.input.selfQltyStatus" class="form_control size_md">
                                    <option value="">전체</option>
                                    <option v-for="( list, index ) in statusCodeList" :key="index" :value="list.codeVal">
                                        {{ list.codeNameKr }}
                                    </option>
                                </select>
                            </td>
                            <th>점검 유형</th>   
                            <td>
                                <select name="" id="" class="form_control" v-model="mySite.list.input.selfQltyType">
                                    <option v-for="( list, index ) in typeCodeList" :key="index" :value="list.codeVal">
                                        {{ list.codeNameKr }}
                                    </option>
                                </select>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="fn_mySiteSearch('reset')">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_mySiteSearch()">검색</button>
                            </td>
                        </tr>
                        <tr>
                            <th>협력업체</th>
                            <td colspan="8"><input type="text" class="form_control size_md" v-model="mySite.list.input.tradeNm" maxlength="50" @keyup.enter="fn_mySiteSearch"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(mySiteSheet)">엑셀 다운로드</button>
                    <div class="fr" v-if="userInfo.userType == 'HEC'">
                        <!-- <button type="button" class="btn btn_sm btn_darkgray">점검취소</button> -->
                        <button type="button" class="btn btn_sm btn_darkgray" v-if="checkUser(userInfo.userId,'write')" @click="fn_selfQualityWriteModalOpen">등록</button>
                        <button type="button" class="btn btn_sm btn_darkblue" @click="fn_selfQualityFinalApprove('list')"> 결재상신</button>
                    </div>
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap"  :style="{height: 'calc(100vh - 350px)'}">
                    <div id="selfSiteMySiteSheet" class="ibsheet_table"  style="height: 100%;" />
                </div>
            </div>
        </div>

        <div class="tab_area" v-show="currentTab == 1">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="80">
                        <col width="300">
                        <col width="80">
                        <col width="300">
                        <col width="80">
                        <col width="300">
                        <col width="80">
                        <col width="300">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>프로젝트명</th>
                            <td>
                                <div class="form_area">
                                    <select name="" id="" v-model="allSite.list.input.mngtType" class="form_control w50">
                                        <option value="">전체</option>
                                        <option v-for="( list, index ) in mngtTypeCodeList" :key="index" :value="list.codeVal">
                                            {{ list.codeNameKr }}
                                        </option>
                                    </select> 
                                    <input type="text" v-model="allSite.list.input.projectNm" class="form_control" placeholder="" maxlength="50" @keyup.enter="fn_allSiteSearch">
                                </div>    
                            </td>
                            <th>회신요구일</th>   
                            <td>
                            <DatePickerRange
                                v-model="allSite.list.input.inputDate"
                            />
                            </td>
                            <th>제목</th>   
                            <td><input type="text" v-model="allSite.list.input.title" class="form_control" maxlength="50" @keyup.enter="fn_allSiteSearch"></td>
                            <th>점검 유형</th>   
                            <td>
                                <select name="" id="" class="form_control" v-model="allSite.list.input.selfQltyType">
                                    <option v-for="( list, index ) in typeCodeList" :key="index" :value="list.codeVal">
                                        {{ list.codeNameKr }}
                                    </option>
                                </select>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="fn_allSiteSearch('reset')">초기화</button>
                                <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_allSiteSearch()">검색</button>
                            </td>
                        </tr>
                        <tr>
    <!--                                 <th>현황</th>   
                            <td>
                                <select name="" id="" class="form_control size_md">
                                    <option value="">전체</option>
                                </select>
                            </td> -->
                            <th>협력업체</th>
                            <td colspan="8"><input type="text" class="form_control size_md" v-model="allSite.list.input.tradeNm" maxlength="50" @keyup.enter="fn_allSiteSearch"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(allSiteSheet)">엑셀 다운로드</button>
                    <!-- <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray">자체품질점검 결과보고서</button>
                    </div> -->
                </div>

                <!-- ibsheet -->
                <div class="ib_wrap"  :style="{height: 'calc(100vh - 320px)'}">
                    <div id="selfSiteAllSiteSheet" class="ibsheet_table"  style="height: 100%;" />
                </div>
            </div>
        </div>

        <div class="tab_area" v-show="currentTab == 2">
            <div class="inner">
                <div class="button_box">
                    <div class="fr" v-if="userInfo.userType == 'HEC'">
                        <button type="button" class="btn btn_sm btn_darkgray" v-if="checkUser(userInfo.userId,'write')" @click="fn_checkListWriteModalOpen">추가</button>
                        <button type="button" class="btn btn_sm btn_gray" v-if="checkUser(userInfo.userId,'unuse')" @click="fn_checkListUnuse">삭제</button>
                    </div>
                </div>
                
                <!-- ibsheet -->
                <div class="ib_wrap"  :style="{height: 'calc(100vh - 280px)'}">
                    <div id="checkListSelfSiteSheet" class="ibsheet_table" style="height: 100%;" />
                </div>
            </div>
        </div>

    
        <!-- 점검 등록 팝업 -->
        <b-modal id="selfQualitySiteWriteModal" title="점검 등록" hide-backdrop size="lg" :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 기본 정보</strong>
                    </div>
                    <div class="table_normal_list table_write mt0">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="100">
                                <col width="*">
                                <col width="100">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">점검 유형</span></th>
                                    <td colspan="3">
                                        <select name="" id="" class="form_control" v-model="write.selfQltyType">
                                            <option v-for="( list, index ) in write.typeCodeList" :key="index" :value="list.codeVal">
                                                {{ list.codeNameKr }}
                                            </option>
                                        </select>
                                    </td>
<!--                                     <th><span class="emp_red">협력업체</span></th>
                                    <td>
                                        <div class="btn_wrap">
                                            <input type="text" id="" class="form_control" v-model="write.inputPartner.inputText" placeholder="검색해주세요" @click="fn_partnerSearch('write')" readonly :disabled="write.selfQltyType != 'PTNR' ? true:false"/>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_partnerSearch('write')" :disabled="write.selfQltyType != 'PTNR' ? true:false">검색</button>
                                        </div>
                                    </td> -->
                                </tr>
                                <tr>
                                    <th><span class="emp_red">제목</span></th>
                                    <td colspan="3"><input type="text" class="form_control" placeholder="입력해주세요" v-model="write.title"  maxlength="100" @keyup.enter="fn_selfQualityWrite"></td>
                                </tr>
                                
                                <tr>
                                    <th class="pr0"><span class="emp_red">점검 양식<br>(Check List)</span></th>
                                    <td>
                                        <div class="btn_wrap">
                                            <input type="text" id="" v-model="write.inputCheck.selfChkInfoTitle" class="form_control" placeholder="검색해주세요" @click="fn_checkListSearch('write')" readonly/>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_checkListSearch('write')">검색</button>
                                        </div>
                                    </td>
                                    <th><span class="emp_red">점검 완료<br>요청일</span></th>
                                    <td>
                                        <DatePicker v-model="write.inputDate" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 점검자 설정</strong>
                    </div>
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="110">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">점검자</span></th>
                                    <td>
                                        <div class="btn_wrap" v-if="write.selfQltyType == 'SITE'">
                                            <input type="text" id="" class="form_control" v-model="write.inputEmployee.userNames" placeholder="검색해주세요" @click="fn_employeeSearch('write')" readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_employeeSearch('write')">검색</button>
                                        </div>
                                        <div class="btn_wrap" v-else-if="write.selfQltyType == 'PTNR'">
                                            <input type="text" id="" class="form_control" v-model="write.inputPartner.inputText" placeholder="검색해주세요" @click="fn_partnerSearch('write')" readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_partnerSearch('write')">검색</button>
                                        </div>
                                        <div class="btn_wrap" v-else>
                                            <input type="text" id="" class="form_control" placeholder="점검 유형을 선택해주세요." readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" disabled>검색</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_selfQualityWrite"> <!-- @click="ok" -->등록</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 점검 보기 팝업 -->
        <b-modal id="selfQualityDetailModal" title="점검 보기" hide-backdrop size="lg" :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 기본 정보</strong>
                    </div>
                    <div class="table_normal_list table_write mt0">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="100">
                                <col width="*">
                                <col width="100">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="">점검 유형</span></th>
                                    <td colspan="3">
                                        {{ view.info.selfQltyTypeNm }}
                                    </td>
<!--                                     <th><span class="">협력업체</span></th>
                                    <td>
                                        {{ view.info.selfQltyType == 'PTNR' ?  view.info.tradeNm +' / '+ view.info.ptnrUserNm : '-'}}
                                    </td> -->
                                </tr>
                                <tr>
                                    <th><span class="">제목</span></th>
                                    <td colspan="3">{{ view.info.title }}</td>
                                </tr>
                                
                                <tr>
                                    <th class="pr0"><span class="">점검 양식<br>(Check List)</span></th>
                                    <td>
                                        {{ view.info.selfChkInfoTitle }}
                                    </td>
                                    <th><span class="">점검 완료<br>요청일</span></th>
                                    <td>
                                        {{ view.info.chkReqDt }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 점검자 설정</strong>
                    </div>
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="110">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="">점검자</span></th>
                                    <td v-if="view.info.selfQltyType == 'SITE'">
                                        {{ view.info.checkUserIdsNm }}
                                    </td>
                                    <td v-else-if="view.info.selfQltyType == 'PTNR'">
                                        {{ view.info.tradeNm +' / '+ view.info.ptnrUserNm }}
                                    </td>
                                    <td v-else-if="view.info.selfQltyType=='PRJT'">
                                        {{ view.info.prjtCheckUserIdsNm }}
                                    </td>
                                    <td v-else>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } --> 
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="view.info.selfQltyType != 'PRJT' && view.info.selfQltyStatus == 'REGT' && userInfo.userId == view.info.inUser" @click="fn_selfQualityDelete"> <!-- @click="ok" -->삭제</b-button>
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="view.info.selfQltyType != 'PRJT' && view.info.selfQltyStatus == 'REGT' && userInfo.userId == view.info.inUser" @click="fn_selfQualityDetailOpen(view.info, 'change')"> <!-- @click="ok" -->수정</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 점검 수정 팝업 -->
        <b-modal id="selfQualitySiteChangeModal" title="점검 수정" hide-backdrop size="lg" :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. 기본 정보</strong>
                    </div>
                    <div class="table_normal_list table_write mt0">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="100">
                                <col width="*">
                                <col width="100">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">점검 유형</span></th>
                                    <td colspan="3">
                                        <select name="" id="" class="form_control" v-model="view.selfQltyType">
                                            <option v-for="( list, index ) in view.typeCodeList" :key="index" :value="list.codeVal">
                                                {{ list.codeNameKr }}
                                            </option>
                                        </select>
                                    </td>
<!--                                     <th><span class="emp_red">협력업체</span></th>
                                    <td>
                                        <div class="btn_wrap">
                                            <input type="text" id="" class="form_control" v-model="view.inputPartner.inputText" placeholder="검색해주세요" readonly @click="fn_partnerSearch('change')" :disabled="view.selfQltyType != 'PTNR' ? true:false"/>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_partnerSearch('change')" :disabled="view.selfQltyType != 'PTNR' ? true:false">검색</button>
                                        </div>
                                    </td> -->
                                </tr>
                                <tr>
                                    <th><span class="emp_red">제목</span></th>
                                    <td colspan="3"><input type="text" class="form_control" placeholder="입력해주세요" v-model="view.title"  maxlength="100" @keyup.enter="fn_selfQualityChange"></td>
                                </tr>
                                
                                <tr>
                                    <th class="pr0"><span class="emp_red">점검 양식<br>(Check List)</span></th>
                                    <td>
                                        <div class="btn_wrap">
                                            <input type="text" id="" v-model="view.inputCheck.selfChkInfoTitle" class="form_control" placeholder="검색해주세요" @click="fn_checkListSearch('change')" readonly/>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_checkListSearch('change')">검색</button>
                                        </div>
                                    </td>
                                    <th><span class="emp_red">점검 완료<br>요청일</span></th>
                                    <td>
                                        <DatePicker v-model="view.inputDate" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>2. 점검자 설정</strong>
                    </div>
                    <div class="table_normal_list table_write">
                        <table>
                            <caption class="sr_only">제목</caption>
                            <colgroup>
                                <col width="110">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">점검자</span></th>
                                    <td>
<!--                                         <div class="btn_wrap">
                                            <input type="text" id="" class="form_control" v-model="view.inputEmployee.userNames" placeholder="검색해주세요" @click="fn_employeeSearch('change')" :disabled="view.selfQltyType != 'SITE' ? true:false">
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_employeeSearch('change')" :disabled="view.selfQltyType != 'SITE' ? true:false">검색</button>
                                        </div> -->
                                        <div class="btn_wrap" v-if="view.selfQltyType == 'SITE'">
                                            <input type="text" id="" class="form_control" v-model="view.inputEmployee.userNames" placeholder="검색해주세요" @click="fn_employeeSearch('view')" readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_employeeSearch('view')">검색</button>
                                        </div>
                                        <div class="btn_wrap" v-else-if="view.selfQltyType == 'PTNR'">
                                            <input type="text" id="" class="form_control" v-model="view.inputPartner.inputText" placeholder="검색해주세요" @click="fn_partnerSearch('view')" readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="fn_partnerSearch('view')">검색</button>
                                        </div>
                                        <div class="btn_wrap" v-else>
                                            <input type="text" id="" class="form_control" placeholder="점검 유형을 선택해주세요." readonly>
                                            <button type='button' class="btn btn_sm btn_darkblue btn_radius" disabled>검색</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_selfQualityChange"> <!-- @click="ok" -->수정</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 체크리스트 불러오기 팝업 --> 
        <b-modal id="checkListSearchModal" title="Check List 검색" 
        hide-backdrop size="lg"
        :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="button_box">
                        <strong>1. Check List 종류 체크</strong>
                    </div>
                    <div class="lookup_box multi_line ac">
                        <label class="input_radio" for="rdoSolar1">
                            <input type="radio" id="rdoSolar1" name="birthday_type2" @change="fn_checkListSearchModalSheet(siteMstrId)" checked="">
                            <span class="label_text">현장 체크리스트</span>
                        </label>
                        <label class="input_radio ml40" for="rdoSolar2">
                            <input type="radio" id="rdoSolar2" name="birthday_type2" @change="fn_checkListSearchModalSheet('ALL_SITE')">
                            <span class="label_text">본사 체크리스트</span>
                        </label>
                    </div>

                    <div class="ib_wrap"  :style="{height: 'calc(100vh - 500px)'}">
                        <div id="checkListSearchSheet" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_selectSearchCheckList()"> <!-- @click="ok" -->선택</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 체크리스트 상세 팝업 --> 
       <b-modal id="checkListDetailSiteModal" title="Check List 상세" 
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
                                    <td><input type="text" v-model="mySite.selectCheck.obj.selfChkInfoTitle" class="form_control" readonly></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap"  :style="{height: 'calc(100vh - 400px)'}">
                        <div id="checkListDetailSelfSiteSheet" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_checkListChange">수정</b-button> -->
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 결과 입력 팝업 -->
        <b-modal id="selfQualityResultModal" :title="result.info.chkRsltStatus != 'CHCK' ? '결과 입력':'결과 보기' " 
        size="xl" modal-class="single_page"
        :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="tab_contents">
                        <div class="inner">
                            <!-- <h2 class="sub_title">자체품질점검</h2> -->
                            <!-- <hr class="mb10"> -->
                            
                            <!-- <div class="button_box">
                                <strong>기본 정보</strong>
                            </div> -->
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="10%">
                                        <col width="*">
                                        <col width="10%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>점검 유형</th>
                                            <td>{{ result.info.selfQltyTypeNm }}{{ result.info.selfQltyType == 'PTNR'? '('+result.info.tradeNm+')' : '' }}</td>
                                            <th>점검 완료 요청일</th>
                                            <td>{{ result.info.chkReqDt }}</td>
                                        </tr>
                                        <tr>
                                            <th>제목</th>
                                            <td colspan="3">{{ result.info.title }}</td>
                                        </tr>
                                        <tr>
                                            <th>점검 양식 (Check List)</th>
                                            <td>{{ result.info.selfChkInfoTitle }}</td>
                                            <th>
                                                <span :class="result.info.chkRsltStatus != 'CHCK' ? 'emp_red':''">점검일</span>
                                            </th>
                                            <td class="input_write" v-if="result.info.chkRsltStatus != 'CHCK'">
                                                <DatePicker v-model="result.inputDate" :input-style="{width: '100%;'}" :format="'YYYY-MM-DD'"/>
                                            </td>
                                            <td v-else>
                                                {{ result.info.checkDt }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="button_box">
                                <strong>1. Check List</strong>
                            </div>

                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="resultCheckSheet" class="ibsheet_table"></div>
                            </div>

                            <div class="button_box">
                                <strong>2. 점검 결과</strong>
                            </div>
                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th><span :class="result.info.chkRsltStatus != 'CHCK' ? 'emp_red':''">자체품질점검 결과</span></th>
                                            <td v-if="result.info.chkRsltStatus != 'CHCK'">
                                                <input type="text" v-model="result.inputText" class="form_control"  maxlength="50" @keyup.enter="fn_selfQualityResultWrite">
                                            </td>
                                            <td v-else>{{ result.info.selfSiteContent }}</td>
                                        </tr>
                                        <tr v-if="result.info.chkRsltStatus != 'CHCK' || result.imgFileList.length > 0">
                                            <th><span :class="result.info.chkRsltStatus != 'CHCK' ? 'emp_red':''">점검사진</span></th>
                                            <td>
                                                <LstImg
                                                    :lst-file-rst="result.imgFileList"
                                                    :files="result.imgFiles"
                                                    :copied-file-ids="result.copiedFileIds"
                                                    :second-remove-file-id="result.imgDeleteFiles"
                                                    @file-changed="fn_resultImgFileChange"
                                                    @file-removed="fn_resultImgFileDelete"
                                                    @return-reset="result.resetCopyYn=false"
                                                    :uploadable="result.info.chkRsltStatus != 'CHCK'"
                                                    :copyable="result.info.chkRsltStatus != 'CHCK'"
                                                    :reset-copy-yn="result.resetCopyYn"
                                                    downloadable
                                                    :file-type="'selfQualitySiteQltyPicturePop'"
                                                />
                                            </td>
                                        </tr>
                                        <tr v-if="result.info.chkRsltStatus != 'CHCK' || result.fileList.length > 0">
                                            <th>첨부파일</th>
                                            <td>
                                                <LstFile
                                                    :lst-file-rst="result.fileList" 
                                                    :files="result.files"
                                                    :second-remove-file-id="result.deleteFiles"
                                                    @file-changed="fn_resultFileChange"
                                                    @file-removed="fn_resultFileDelete"
                                                    :uploadable="result.info.chkRsltStatus != 'CHCK'"
                                                    downloadable
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                             <!-- v-if="" -->
                            <div class="button_box" v-if="result.info.selfQltyType === 'SITE'">
                                <strong>3. Punch</strong>
                                <div class="fr">
                                    <button type="button" class="btn btn_sm btn_darkgray" v-if="result.info.chkRsltStatus != 'CHCK'" @click="selfQltyPunchDelete()">삭제</button>
                                    <button type="button" class="btn btn_sm btn_darkblue" v-if="result.info.chkRsltStatus != 'CHCK'" @click="selfQltyPunchWrite()">등록</button>
                                </div>

                                <div class="ib_wrap">
                                    <div id="punchListSheet" class="ibsheet_table" style="height:238px;"></div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="result.info.chkRsltStatus != 'CHCK'" @click="fn_selfQualityResultWrite">저장</b-button>
                <b-button class="btn btn_md btn_outline btn_darkblue" v-if="result.info.chkRsltStatus != 'CHCK'" @click="fn_selfQualityResultReply" :disabled="result.info.chkRsltStatus != null && result.info.chkRsltStatus != '' ? false:true">회신</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 최종 송부 팝업 -->
        <b-modal id="selfQualityFinalModal" title="최종 송부" 
        size="xl" modal-class="single_page"
        :footer-bg-variant="footerBg">
            <template #default>
                <div class="pop_container">
                    <div class="tab_contents">
                        <div class="inner">
                            <div class="table_normal_list">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="10%">
                                        <col width="*">
                                        <col width="10%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>점검 유형</th>
                                            <td>{{ final.info.selfQltyTypeNm }}{{ result.info.selfQltyType == 'PTNR'? '('+result.info.tradeNm+')' : '' }}</td>
                                            <th>점검 완료 요청일</th>
                                            <td>{{ final.info.chkReqDt }}</td>
                                        </tr>
                                        <tr>
                                            <th>제목</th>
                                            <td colspan="3">{{ final.info.title }}</td>
                                        </tr>
                                        <tr>
                                            <th>점검 양식 (Check List)</th>
                                            <td colspan="3">{{ final.info.selfChkInfoTitle }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="button_box">
                                <strong>점검자 선택</strong>
                            </div>
                            
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="checkUserSheet" class="ibsheet_table"></div>
                            </div>

                            <div class="button_box">
                                <strong>1. Check List</strong>
                            </div>

                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="finalCheckSheet" class="ibsheet_table"></div>
                            </div>

                            <div class="button_box">
                                <strong>2. 점검 결과</strong>
                            </div>
                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th><span>자체품질점검 결과</span></th>
                                            <td>{{ final.inputText }}</td>
                                        </tr>
                                        <tr v-if="final.imgFileList.length > 0">
                                            <th>점검사진</th>
                                            <td>
                                                <LstImg
                                                    :lst-file-rst="final.imgFileList"
                                                    :files="final.imgFiles"
                                                    :copied-file-ids="final.copiedFileIds"
                                                    :second-remove-file-id="final.imgDeleteFiles"
                                                    @file-changed="fn_finalImgFileChange"
                                                    @file-removed="fn_finalImgFileDelete"
                                                    @return-reset="final.resetCopyYn=false"
                                                    :uploadable="false"
                                                    :copyable="false"
                                                    :reset-copy-yn="final.resetCopyYn"
                                                    downloadable
                                                    :file-type="'selfQualitySiteQltyPicturePop2'"
                                                />
                                            </td>
                                        </tr>
                                        <tr v-if="final.fileList.length > 0">
                                            <th>첨부파일</th>
                                            <td>
                                                <LstFile
                                                    :lst-file-rst="final.fileList" 
                                                    :files="final.files"
                                                    :second-remove-file-id="final.deleteFiles"
                                                    @file-changed="fn_finalFileChange"
                                                    @file-removed="fn_finalFileDelete"
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
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="final.info.selfQltyStatus != 'APVL' && final.info.selfQltyStatus != 'APRV'" @click="fn_selfQualityFinalChange">저장</b-button>
                <b-button class="btn btn_md btn_outline btn_darkblue" v-if="final.info.selfQltyStatus != 'APVL' && final.info.selfQltyStatus != 'APRV'" :disabled="final.info.checkUserId == null || final.info.checkUserId == ''" @click="fn_selfQualityFinalApprove('view')">결재상신</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>

        <!-- 체크리스트 신규등록 팝업 --> 
        <b-modal id="checkListSelfSiteWriteModal" title="Check List 추가" 
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
                                    <th><span class="emp_red">제목</span></th>
                                    <td><input type="text" v-model="checkListObj.write.title" class="form_control"  maxlength="100" @keyup.enter="fn_checkListWrite"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(checkListWriteSelfSiteSheet)">엑셀 다운로드</button>
                        <button type="button" class="btn btn_sm btn_excel" slot="" @click="$bvModal.show('SelfQualitySiteSheet_ExcelUploadModal1')">엑셀 업로드</button>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_checkListCopyBtn(checkListWriteSelfSiteSheet)">행 복사</button>
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
                                <button type="button" class="btn btn_sm" @click="fn_checkListAddBtn(checkListWriteSelfSiteSheet, checkListObj.write)">행 추가</button>
                            </div>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_checkListDelBtn(checkListWriteSelfSiteSheet)">행 삭제</button>
                        </div>
                    </div>
                    <div class="ib_wrap"  :style="{height: 'calc(100vh - 400px)'}">
                        <div id="checkListWriteSelfSiteSheet" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_checkListWrite"> <!-- @click="ok" -->등록</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>

        <!-- 체크리스트 수정 팝업 --> 
       <b-modal id="checkListSelfSiteChangeModal" title="Check List 수정" 
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
                                    <th><span class="emp_red">제목</span></th>
                                    <td><input type="text" v-model="checkListObj.change.title" class="form_control"  maxlength="100" :readonly="!checkListAuth" @keyup.enter="fn_checkListChange"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(checkListChangeSelfSiteSheet)">엑셀 다운로드</button>
                        <button type="button" class="btn btn_sm btn_excel" slot="" @click="$bvModal.show('SelfQualitySiteSheet_ExcelUploadModal2')">엑셀 업로드</button>
                        <div class="fr" v-if="checkUser(userInfo.userId,'change')">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_checkListCopyBtn(checkListChangeSelfSiteSheet)">행 복사</button>
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
                                <button type="button" class="btn btn_sm" @click="fn_checkListAddBtn(checkListChangeSelfSiteSheet, checkListObj.change)">행 추가</button>
                            </div>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_checkListDelBtn(checkListChangeSelfSiteSheet)">행 삭제</button>
                            <!-- <button type="button" class="btn btn_sm btn_darkblue">저장</button> -->
                        </div>
                    </div>
                    <div class="ib_wrap"  :style="{height: 'calc(100vh - 400px)'}">
                        <div id="checkListChangeSelfSiteSheet" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
                
            </template>
            <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
                <b-button class="btn btn_md btn_outline btn_darkgray" v-if="checkUser(userInfo.userId,'change')" @click="fn_checkListChange"> <!-- @click="ok" -->수정</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
            </template>
        </b-modal>
        <PartnerUserSearch
            v-on:fn-partner-choice="fn_partnerSelect" v-bind:member-id-list="[]" :site-mstr-id="siteMstrId"/>
        <EmployeeSearch v-on:fn-multi-employee-choice="fn_employeeSelect"
           v-bind:site-code="siteId"
           :site-mstr-id="siteMstrId"
        />
        <Approve
            :ref-id="'approveModal'"
            :code-type="'SELF'"
            :doc-type="'QISP'"
            :doc-seq="''"
            :doc-name="'자체품질점검 결과보고서'"
            :file-type="'SelfQltyChk'"
            :request-id="approve.requestId"
            :site-mstr-id="approve.siteMstrId"
            @callback="fn_setSourceApproval"
            alertable
        />
        <excel-upload-modal
            ref-id="SelfQualitySiteSheet_ExcelUploadModal1"
            mode="CHECK"
            fileType="SELF"
            columnLength="0"
            @import="fn_importExcel"
        />

        <excel-upload-modal
            ref-id="SelfQualitySiteSheet_ExcelUploadModal2"
            mode="CHECK"
            fileType="SELF"
            columnLength="0"
            @import="fn_importChangeExcel"
        />

        <excel-download
            v-model="excelDownload.request"
            ref-id="SelfQualitySiteSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />

        <SelfQualitySitePunchModal
            v-bind:popId="popId"
            v-bind:viewType="viewType"
            v-bind:noCfrmType="noCfrmType"
            v-bind:siteMode="siteMode"
            v-bind:noCnfmInfoId="noCnfmInfoId"
            v-bind:selfQltySiteInfoId="selfQltySiteInfoId"
            v-bind:selfSiteChkRstId="selfSiteChkRstId"
            v-on:fn-self-quality-result-punch="fn_selfQualityResultPunch"
        />
        <!-- v-on:sheet-create="sheetCreate" -->
   </div>
</template>

<script>
    import { sendPostApi , sendFileApi, requestOptions, requestFileOptions} from '../../../apis/common';
    import loader from '@ibsheet/loader';
    import { commonFn } from '@/script/commonFn.js';
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import EmployeeSearch from '@/pages/common/popup/MultiEmployeeSearch.vue'
    import PartnerUserSearch from '@/pages/common/popup/PartnerUserSearch.vue'
    import { selfQualityMySiteList, selfQualityAllSiteList, selfQualityCheckList } from '@/pages/common/data/InspectionList'
    import { checkListSearch, checkListWriteList, siteCheckResultList, checkListDetailList, checkUserSelectList } from '../../common/data/PopupList'
    import Approve from '@modal/approval/Approve.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import LstImg from '@/pages/common/popup/LstImg'
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import DatePicker from '@component/common/DatePicker.vue'
    import _ from 'lodash'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ExcelUploadModal from '@modal/common/ExcelUploadModal.vue'
    import axios from 'axios'
    import ExcelDownload from '@component/common/ExcelDownload.vue'
    import SelfQualitySitePunchModal from '@/pages/common/popup/SelfQualitySitePunchModal.vue'
import { mapGetters } from 'vuex';

    let SHEET_ID = '';

    export default {
        name: 'SelfQualitySiteSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            LstFile,
            LstImg,
            PartnerUserSearch,
            DatePickerRange,
            DatePicker,
            EmployeeSearch,
            Breadcrumb,
            Approve,
            ExcelUploadModal,
            ExcelDownload,
            SelfQualitySitePunchModal,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites', '체크리스트'], // tab name
                sendUrl : '/sendApi/api/selfQltyChk',
                approve: {},
                // siteMstrId : '',
                siteId : '',
                userInfo : {},
                adminYn : '0',
                categoryData: {},
                statusCodeList : [],
                typeCodeList : [],
                mngtTypeCodeList : [],
                checkListSearchSheet : [], //체크리스트 검색 팝업 sheet
                mySiteSheet : [],
                allSiteSheet : [],
                checkListSheet: [],                 // 본사 checkList sheet
                checkListWriteSheet: [],            // 본사 checkList 등록 sheet
                checkListWriteSelfSiteSheet: [],       // checkList 등록 popup sheet
                checkListChangeSelfSiteSheet: [],      // checkList 수정 popup sheet
                checkListDetailSelfSiteSheet: [],      // checkList 상세 popup sheet
                mySite : { //mySite obj
                    list: {
                        input:{
                            inputDate : [null,null],
                            title : '',
                            tradeNm : '',
                            selfQltyStatus : '',
                            selfQltyType : "",
                        },
                        result:{
                            inputDate : [null,null],
                            title : '',
                            tradeNm : '',
                            selfQltyStatus : '',
                            selfQltyType : "",
                        }
                    },
                    selectCheck : {
                        obj : {},
                        key : "",
                    },
                    selectPartner : {
                        key : "",
                    },
                    selectEmployee : {
                        key : "",
                    },
                },
                allSite : { //allSite obj
                    list: {
                        input:{
                            mngtType : '0',
                            projectNm : '',
                            inputDate : [null,null],
                            title : '',
                            tradeNm : '',
                            selfQltyStatus : '',
                            selfQltyType : "",
                        },
                        result:{
                            mngtType : '0',
                            projectNm : '',
                            inputDate : [null,null],
                            title : '',
                            tradeNm : '',
                            selfQltyStatus : '',
                            selfQltyType : "",
                        }
                    },
                },
                write: {
                    inputCheck : {},
                    inputPartner : {},
                    selectCode : {},
                    inputEmployee : {},
                    typeCodeList : [],
                    selfQltyType : "",
                    title : "",
                    inputDate : '',
                },
                view: {
                    info : {}, // 상세 정보
                    inputCheck : {},
                    inputPartner : {},
                    selectCode : {},
                    inputEmployee : {},
                    typeCodeList : [],
                    selfQltyType : "",
                    title : "",
                    inputDate : '',
                },
                result: {
                    key : "",
                    inputDate : "",
                    inputText : "",
                    info : {},      //정보
                    checkSheet : [],    //checkList
                    punchSheet : [],    //punch
                    selectRow : {},     //select row
                    typeCodeList : [],
                    fileList : [],
                    files : [],
                    deleteFiles : [],
                    imgFileList : [],
                    imgFiles : [],
                    imgDeleteFiles : [],
                    copiedFileIds:[],
                    resetCopyYn:false,
                },
                final: {
                    key : "",
                    inputDate : "",
                    inputText : "",
                    info : {},      //정보
                    checkUserSheet : [],    //checkUser
                    checkSheet : [],    //checkList
                    punchSheet : [],    //punch
                    selectRow : {},     //select row
                    typeCodeList : [],
                    fileList : [],
                    files : [],
                    deleteFiles : [],
                    imgFileList : [],
                    imgFiles : [],
                    imgDeleteFiles : [],
                    copiedFileIds:[],
                    resetCopyYn:false,
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

                /**
                 * 결과입력 Punch 추가 시작
                 */
                InspectionResultWrite2 : {
                    options: {
                        Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 3 },
                            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 4 },
                            { Name: 'noCnfmStatusNm', Header: [{ Value: '진행 상황', RowSpan: 2 }], RelWidth: 5, CanEdit: 0 },
                            { Name: 'docSeq', Header: [{ Value: '부적합 번호', RowSpan: 2 }], RelWidth: 18, CanEdit: 0 },
                            { Name: 'mainName', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'midName', Header: [{ Value: '세부공종', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'actnComp', Header: [{ Value: '업체명', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'title', Header: [{ Value: '제목', RowSpan: 2 }], Class: 'al pl20 pr20', RelWidth: 25, CanEdit: 0 },
                            { Name: 'issueDt', Header: [{ Value: '발행일', RowSpan: 2 }], RelWidth: 7, CanEdit: 0 },
                            { Name: 'closeDt', Header: [{ Value: '요구일', RowSpan: 2 }], RelWidth: 7, CanEdit: 0 },
                            { Name: 'cnfmDt', Header: [{ Value: '완료일', RowSpan: 2 }], RelWidth: 7, CanEdit: 0 },
                            { Name: 'noCnfmInfoId', Visible:0},
                            { Name: 'selfQltySiteInfoId', Visible:0},
                            { Name: 'selfSiteChkRstId', Visible:0},
                            { Name: 'noCnfmStatus', Visible:0},
                            { Name: 'actnUser', Visible:0},
                        ]
                    },
                    data: [
                        { case1: '작성1', case2: 'WA10102–공종-시정조치-2021–1187', case3: '공통', case4: '철근콘크리트공사', case5: '보림철근', case6: '3층 바닥 C구간 철근 피복 미준수', case7: 'YYYY.MM.DD', case8: 'YYYY.MM.DD', case9: 'YYYY.MM.DD', case10: '' },
                    ],
                },

                sqphSheet : null,

                popId : 'SelfQualitySitePunchModal',
                viewType : '',  //punch 고정
                noCfrmType : '',
                noCnfmInfoId : '',
                siteMode : '',
                selfQltySiteInfoId : '',
                selfSiteChkRstId : '',

                deleteIds : [],

            }
        },
        computed: {
            ...mapGetters({
                siteMstrId: 'auth/getSiteMstrId',
            })
        },
        mounted() {
            this.adminYn = this.$store.getters['auth/getGroupAuthInfoId'] == "GRAT_0000000009" ? '1' : '0';
            this.siteId = this.$store.getters['auth/getSiteId'];
            // this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
            this.userInfo = this.$session.get('userInfo');
            this.fn_masterCodeList();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)

            //punch 시트 초기화
            if(this.sqphSheet) {
                this.sqphSheet.dispose();
            }
        },

        methods: {
            //tab
            fn_tab(idx){
                //점검요청 list function  
                this.currentTab = idx
                if(idx === 0){
                    this.fn_mySite();
                }
                else if(idx === 1){
                    this.fn_allSite();
                }
                ///checkList function 
                else if(idx === 2){
                    this.fn_checkList();
                }
                else{
                    // console.log('tab function error');
                }
            },

            //마스터 코드 조회
            async fn_masterCodeList() {

                //점검유형 코드
                let url = '/sendApi/api/common/masterCode/list';
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                let payload = {
                    groupCode : 'SELF_QLTY_TYPE'
                }
                let response = await sendPostApi(url, payload)

                if(response.status == '200'){
                    let searchCode = {
                        'codeVal':'',
                        'codeNameKr':'전체',
                    }
                    let inputCode = {
                        'codeVal':'',
                        'codeNameKr':'선택',
                    }
                    this.typeCodeList.push(searchCode);
                    this.write.typeCodeList.push(inputCode);
                    this.view.typeCodeList.push(inputCode);

                    response.data.data.forEach(item => {
                        this.typeCodeList.push(item);
                        if(item.codeVal != "PRJT"){
                            this.write.typeCodeList.push(item);
                            this.view.typeCodeList.push(item);
                        }
                    });
                }

                //현황 코드
                payload = {
                    groupCode : 'SELF_QLTY_STATUS'
                }
                response = await sendPostApi(url, payload)

                if(response.status == '200'){
                    response.data.data.forEach(item => {
                        //마스터 코드 지연 추가
                        this.statusCodeList.push(item);
                    })
                }

                //프로젝트 타입 코드
                payload = {
                    groupCode : 'MNGT_TYPE'
                }
                response = await sendPostApi(url, payload)

                if(response.status == '200'){
                    this.mngtTypeCodeList = response.data.data
                }

                this.fn_mySite();
            },

            //mySite 목록 조회
            async fn_mySite(){

                let data = []
                this.result.resetCopyYn = true;
                this.final.resetCopyYn = true;

                let resultData = {
                    ...this.mySite.list.result
                }

                let payload = {
                    siteMstrId : this.siteMstrId,
                    startDt : resultData.inputDate[0],
                    endDt : resultData.inputDate[1],
                    title : resultData.title,
                    tradeNm : resultData.tradeNm,
                    selfQltyStatus : resultData.selfQltyStatus,
                    selfQltyType : resultData.selfQltyType,
                }

                if(this.userInfo.userType != '' && this.userInfo.userType == 'PTNR'){
                    payload['tradeId'] = this.userInfo.tradeId
                }
                
                const url = this.sendUrl+'/site/checkReq/list';
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                const response = await sendPostApi(url, payload);

                if(response.status == '200'){
                    data = response.data.resultData
                    data.forEach((item, idx) => {

                        item['selfQltyStatusGraph'] = item.selfQltyStatus
                        item['resultBtn'] = '-'
                        item['finalBtn'] = '-'
                        item['chkDt'] = item.chkDt == null || item.chkDt == "" ? '-':item.chkDt
                        item['rplDt'] = item.rplDt == null || item.rplDt == "" ? '-':item.rplDt
                        item['selfQltyStatusArea'] = ''
                        item['case8'] = ''
                        item['case9'] = ''
                        item['infoBtn'] = '1'
                        item['inDttm'] = this.$moment(item.inDttm).format('YYYY-MM-DD') 


                        if(item.selfQltyStatus == 'REGT'){
                            if(item.resultInput == '1'){
                                item['resultBtn'] = '0'
                            }
                            /* item['punchYn'] = '-' */
                        }
                        else{
                            /* item['punchYn'] = Number(item.punchCnt) > 0 ? 'Y':'N' */
                            
                            //점검중
                            if(item.selfQltyStatus == 'CHCK'){
                                //지연 체크 코드  추가
                                const today = this.$moment().format("YYYY-MM-DD")
                                const dateChk = this.$moment(today).isAfter(item.chkReqDt)
                                if(dateChk){
                                    item['selfQltyStatusGraph'] = 'RATE'
                                }
                                
                                //점검자
                                if(item.resultInput == '1'){
                                    if(item.chkRsltStatus != null && item.chkRsltStatus != ''){
                                        item['resultBtn'] = '1'
                                    }
                                    else{
                                        item['resultBtn'] = '0'
                                    }
                                }

                                //결재상신 송부자
                                if(item.finalInput == '1'){
                                    if(item.checkUserId != null && item.checkUserId != ''){
                                        item['finalBtn'] = '1'
                                    }
                                    else{
                                        item['finalBtn'] = '0'
                                    }
                                }
                            }

                            if(item.selfQltyStatus == 'APVL'){
                                
                                //점검자
                                if(item.resultInput == '1'){
                                    if(item.chkRsltStatus != null && item.chkRsltStatus != ''){
                                        item['resultBtn'] = '1'
                                    }
                                    else{
                                        item['resultBtn'] = '0'
                                    }
                                }

                                //결재상신 송부자
                                if(item.finalInput == '1'){
                                    if(item.checkUserId != null && item.checkUserId != ''){
                                        item['finalBtn'] = '1'
                                    }
                                    else{
                                        item['finalBtn'] = '0'
                                    }
                                }
                            }


                            if(item.selfQltyStatus == 'APRV'){
                                item['resultBtn'] = '-'
                                item['finalBtn'] = '1'
                            }
                        }
                    })

                    this.fn_mySiteSheet(data);
                }

            },

            //mySite sheet 조회
            fn_mySiteSheet(data){
                let options = selfQualityMySiteList.options;

                options.Events = {
                    onClick: this.fn_selfQltySheetEvt,
                    onDataLoad : this.fn_selfQltyStatusGraph,
                    onRenderFirstFinish: async () => {
                        this.mySiteSheet.loadSearchData({
                            data: data,
                            append: false
                        })
                    },
                    onRenderFinish: this.fn_aprvBtnSelectChk, 
                }
                options.Cfg = {NoVScroll: 0,}
                loader.createSheet({
                    el: 'selfSiteMySiteSheet',
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.mySiteSheet = sheet
                })
            },

            //mySite 검색
            fn_mySiteSearch(type){
                if(type && type == 'reset'){
                    this.mySite.list.input.inputDate = [null,null]
                    this.mySite.list.input.title = ''
                    this.mySite.list.input.tradeNm = ''
                    this.mySite.list.input.selfQltyStatus = ''
                    this.mySite.list.input.selfQltyType = ''
                }
                this.mySite.list.result = {
                    ...this.mySite.list.input
                }
                this.fn_mySite();
            },

            //allSite 목록 조회
            async fn_allSite(){

                let resultData = {
                    ...this.allSite.list.result
                }

                let payload = {
                    startDt : resultData.inputDate[0],
                    endDt : resultData.inputDate[1],
                    title : resultData.title,
                    tradeNm : resultData.tradeNm,
                    mngtType : resultData.mngtType,
                    projectNm : resultData.projectNm,
                    selfQltyStatus : resultData.selfQltyStatus,
                    selfQltyType : resultData.selfQltyType,
                }

                if(this.userInfo.userType != '' && this.userInfo.userType == 'PTNR'){
                    payload['tradeId'] = this.userInfo.tradeId
                }
                
                const url = this.sendUrl+'/site/checkReqAll/list';
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                const response = await sendPostApi(url, payload);

                if(response.status == '200'){
                    let data = response.data.resultData

                    data.forEach((item, idx) => {

                        item['selfQltyStatusGraph'] = item.selfQltyStatus
                        item['resultBtn'] = '-'
                        item['finalBtn'] = '-'
                        item['chkDt'] = item.chkDt == null || item.chkDt == "" ? '-':item.chkDt
                        item['rplDt'] = item.rplDt == null || item.rplDt == "" ? '-':item.rplDt
                        item['selfQltyStatusArea'] = ''
                        item['case8'] = ''
                        item['case9'] = ''
                        item['infoBtn'] = '1'
                        item['inDttm'] = this.$moment(item.inDttm).format('YYYY-MM-DD') 
                        /* item['punchYn'] = Number(item.punchCnt) > 0 ? 'Y':'N' */
                        
                        item['resultBtn'] = '-'
                        item['finalBtn'] = '1'
                    })

                    this.fn_allSiteSheet(data);
                }

            },

            //allSite sheet 조회
            fn_allSiteSheet(data){

                let options = selfQualityAllSiteList.options;

                options.Events = {
                    onClick: this.fn_selfQltySheetEvt,
                    onDataLoad : this.fn_selfQltyStatusGraph,
                    onRenderFirstFinish: async () => {
                        this.allSiteSheet.loadSearchData({
                            data: data,
                            append: false
                        })
                    },
                }
                options.Cfg = {NoVScroll: 0,}
                loader.createSheet({
                    el: 'selfSiteAllSiteSheet',
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.allSiteSheet = sheet
                })
            },

            //allSite 검색
            fn_allSiteSearch(type){
                if(type && type == 'reset'){
                    this.allSite.list.input.mngtType = '0'
                    this.allSite.list.input.projectNm = ''
                    this.allSite.list.input.inputDate = [null,null]
                    this.allSite.list.input.title = ''
                    this.allSite.list.input.tradeNm = ''
                    this.allSite.list.input.selfQltyStatus = ''
                    this.allSite.list.input.selfQltyType = ''
                }
                this.allSite.list.result = {
                    ...this.allSite.list.input
                }
                this.fn_allSite();
            },

            //mySite 점검 등록 모달
            fn_selfQualityWriteModalOpen(){
                this.write.inputCheck = {};
                this.write.inputPartner = {};
                this.write.selectCode = {};
                this.write.selfQltyType = '';
                this.write.title = '';
                this.write.inputEmployee.userIds = '';
                this.write.inputEmployee.userNames = '';
                this.$bvModal.show('selfQualitySiteWriteModal');
            },

            //점검 등록
            fn_selfQualityWrite () {

                if(this.write.selfQltyType == ""){
                    this.alert('점검 유형을 선택해주세요.');
                    return;
                }
                else if(this.write.selfQltyType == "SITE"){
                    //점검자 ids 세팅
                    if(!this.write.inputEmployee.userIds){
                        this.alert('점검자를 선택해주세요.');
                        return;
                    }
                }
                else if(this.write.selfQltyType == "PTNR"){
                    if(!this.write.inputPartner.userId){
                        this.alert('협력업체를 선택해주세요.');
                        return;
                    }
                }

                if(this.write.title == ''){
                    this.alert('제목을 입력해주세요.');
                    return;
                }
                if(!this.write.inputCheck.selfChkInfoId){
                    this.alert('점검 양식(Check List)을 선택해주세요.');
                    return;
                }
                this.confirm('등록하시겠습니까?', async() => {

                    const payload = {
                        selfSiteChkInfoId : this.write.inputCheck.selfChkInfoId,
                        siteMstrId : this.siteMstrId,
                        selfQltyType : this.write.selfQltyType,
                        title : this.write.title,
                        chkReqDt : this.write.inputDate,
                        checkUserIds : this.write.selfQltyType == "SITE" ? this.write.inputEmployee.userIds : '',
                        ptnrUserId : this.write.selfQltyType == "PTNR" ? this.write.inputPartner.userId : '',
                    }

                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = this.sendUrl + '/site/checkReq/write';
                    const response = await sendPostApi(url, payload)
                    
                    if(response.status == '200'){
                        this.alert('저장되었습니다.', () => {
                            this.$bvModal.hide('selfQualitySiteWriteModal');
                            this.fn_mySite();

                            //메시지 발송  
                            let msgPayload = {}
                            if(payload.selfQltyType == 'SITE'){
                                msgPayload = {
                                      messageCode : 'A051'
                                    , userId : this.userInfo.userId
                                    , reciveUserIds : payload.checkUserIds.split(',')
                                    , docSeq : '현장자체점검이 등록되었습니다.'
                                }
                            }
                            else if(payload.selfQltyType == 'PTNR'){
                                msgPayload = {
                                      messageCode : 'A054'
                                    , userId : this.userInfo.userId
                                    , reciveUserId : payload.ptnrUserId
                                    , docSeq : '현장으로부터 점검요청이 도착했습니다.'
                                }
                            }
                            this.fn_sendMessaget(msgPayload);
                        });
                    }
                })
            },

            //점검 상세, 수정 모달
            async fn_selfQualityDetailOpen(obj, type){

                const payload = {
                    selfQltySiteInfoId : obj.selfQltySiteInfoId
                }

                const url = this.sendUrl + '/site/checkReq/view'
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                const response = await sendPostApi(url, payload);

                if(response.status == '200'){
                    //노출 정보
                    this.view.info = {
                        ...response.data.resultData
                    }
                    if(type == 'view'){
                        this.$bvModal.show('selfQualityDetailModal');
                    }
                    else{
                        //입력 정보
                        let inputObj = {
                            ...response.data.resultData
                        }
                        this.view.inputCheck = {
                            selfChkInfoId : inputObj.selfSiteChkInfoId,
                            selfChkInfoTitle : inputObj.selfChkInfoTitle
                        }
                        this.view.inputPartner = {
                            userId : inputObj.ptnrUserId,
                            userNm : inputObj.ptnrUserNm,
                            tradNm : inputObj.tradeNm,
                            inputText : inputObj.tradeNm != null && inputObj.ptnrUserNm != null ? inputObj.tradeNm + ' / ' + inputObj.ptnrUserNm : ''
                        }
                        this.view.inputEmployee = {
                            userIds : inputObj.checkUserIds,
                            userNames : inputObj.checkUserIdsNm
                        }
                        this.view.title = inputObj.title
                        this.view.inputDate = inputObj.chkReqDt
                        this.view.selfQltyType = inputObj.selfQltyType
                        this.$bvModal.show('selfQualitySiteChangeModal');
                    }
                }
            },

            //점검 수정
            fn_selfQualityChange () {

                if(this.view.selfQltyType == ""){
                    this.alert('점검 유형을 선택해주세요.');
                    return;
                }
                else if(this.view.selfQltyType == "SITE"){
                    //점검자 ids 세팅
                    if(!this.view.inputEmployee.userIds){
                        this.alert('점검자를 선택해주세요.');
                        return;
                    }
                }
                else if(this.view.selfQltyType == "PTNR"){
                    if(!this.view.inputPartner.userId){
                        this.alert('협력업체를 선택해주세요.');
                        return;
                    }
                }

                if(this.view.title == ''){
                    this.alert('제목을 입력해주세요.');
                    return;
                }
                if(!this.view.inputCheck.selfChkInfoId){
                    this.alert('점검 양식(Check List)을 선택해주세요.');
                    return;
                }
                this.confirm('수정하시겠습니까?', async() => {

                    const payload = {
                        selfQltySiteInfoId : this.view.info.selfQltySiteInfoId,
                        selfSiteChkInfoId : this.view.inputCheck.selfChkInfoId,
                        siteMstrId : this.siteMstrId,
                        selfQltyType : this.view.selfQltyType,
                        title : this.view.title,
                        chkReqDt : this.view.inputDate,
                        checkUserIds : this.view.selfQltyType == "SITE" ? this.view.inputEmployee.userIds : '',
                        ptnrUserId : this.view.selfQltyType == "PTNR" ? this.view.inputPartner.userId : '',
                    }

                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = this.sendUrl + '/site/checkReq/change';
                    const response = await sendPostApi(url, payload)
                    
                    if(response.status == '200'){
                        this.alert('수정되었습니다.', () => {
                            this.$bvModal.hide('selfQualitySiteChangeModal');
                            this.fn_selfQualityDetailOpen(this.view.info, 'view')
                            this.fn_mySite()
                        });
                    }
                })
            },

            //점검 삭제
            fn_selfQualityDelete(){

                this.confirm('삭제하시겠습니까?', async() => {

                    this.view.info.delYn = 'Y';
                    const payload = {
                        ...this.view.info,
                    }

                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let url = this.sendUrl + '/site/checkReq/unUse';
                    const response = await sendPostApi(url, payload)
                    
                    if(response.status == '200'){
                        this.alert('삭제되었습니다.');
                        this.$bvModal.hide('selfQualityDetailModal');
                        this.fn_mySite()
                    }
                })
            },

            //체크리스트 검색 버튼
            fn_checkListSearch(key) {
                this.mySite.selectCheck.key = key;
                this.fn_checkListSearchModalOpen();
            },

            /* 체크리스트 검색 팝업 */
            fn_checkListSearchModalOpen () {
                this.$bvModal.show('checkListSearchModal');
                this.fn_checkListSearchModalSheet(this.siteMstrId);
            },
            
            //checkList 선택 팝업
            async fn_checkListSearchModalSheet(siteType) {

                let payload = {
                    'siteMstrId' : siteType
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
                            this.checkListSearchSheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                    }

                    loader.createSheet({
                        el: 'checkListSearchSheet',
                        data: data, 
                        options: options
                    }).then(async sheet => {
                        this.checkListSearchSheet = sheet
                    })
                }
            },

            //체크리스트 선택
            fn_selectCheck (evtParam) {
                const selectRow = evtParam.row;
                this.mySite.selectCheck.obj = {
                    selfChkInfoId : selectRow.selfChkInfoId,
                    selfChkInfoTitle : selectRow.title,
                }
                if(evtParam.col == "detailBtn" && evtParam.event.target.tagName == "BUTTON"){ // infoBtn: 점검
                    this.fn_checkListDetailModalOpen(evtParam);
                }
            },

            //체크리스트 선택
            fn_selectCheckDbl (evtParam) {
                const selectRow = evtParam.row;
                let inputObj = {
                    selfChkInfoId : selectRow.selfChkInfoId,
                    selfChkInfoTitle : selectRow.title,
                };
                this.mySite.selectCheck.obj = {
                    ...inputObj
                }
                this.fn_selectSearchCheckList();
            },

            //체크 리스트검색 선택
            fn_selectSearchCheckList() {
                let inputData = {
                    ...this.mySite.selectCheck.obj
                }
                if(!inputData.selfChkInfoId && !inputData.selfChkInfoTitle){
                    this.alert('체크리스트를 선택해주세요.');
                    return;
                }
                else{
                    if(this.mySite.selectCheck.key == 'write'){
                        this.write.inputCheck = {
                            ...inputData
                        }
                    }
                    else{
                        this.view.inputCheck = {
                            ...inputData
                        }
                    }
                    this.$bvModal.hide('checkListSearchModal')
                    this.mySite.selectCheck.obj = {};
                }
            },

            async fn_checkListDetailModalOpen(evtParam){
                
                const selectRow = evtParam.row;
                if(selectRow.selfChkInfoId){
                    this.$bvModal.show('checkListDetailSiteModal');
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

                    let data = []
                    
                    if(sheetData && sheetData.length > 0){
                        data = sheetData
                    }

                    let options = checkListDetailList.options;

                    options.Events = {
                        onRenderFirstFinish: async () => {
                            this.checkListDetailSelfSiteSheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                    }

                    options.Cfg = {NoVScroll: 0,}

                    loader.createSheet({
                        el: 'checkListDetailSelfSiteSheet',
                        data: data, 
                        options: options
                    }).then(async sheet => {
                        this.checkListDetailSelfSiteSheet = sheet
                    })
                }
            },

            // 협력업체 유저 검색
            fn_partnerSearch(key){
                this.mySite.selectPartner.key = key
                this.$bvModal.show('PartnerUserSearch')
            },

            // 협력업체 유저 선택
            fn_partnerSelect (obj){
                if(this.mySite.selectPartner.key == 'write'){
                    this.write.inputPartner = {
                        ...obj,
                        inputText : obj.tradeNm + ' / ' + obj.userNm
                    }
                }
                else{
                    this.view.inputPartner = {
                        ...obj,
                        inputText : obj.tradeNm + ' / ' + obj.userNm
                    }
                }
                this.$bvModal.hide('PartnerUserSearch')
            },

            //점검자 검색
            fn_employeeSearch(key){
                this.mySite.selectEmployee.key = key
                this.$bvModal.show('MultiEmployeeSearch')
            },

            //점검자 검색 선택
            fn_employeeSelect(obj){
                let strUserIds = "";
                let strUserNames = "";

                //최대값 계산
                let checkLength = obj.userIds.length
                obj.userIds.forEach((item, idx) => {
                    strUserIds += item
                    if(checkLength > (idx+1)){
                        strUserIds += ","
                    }
                })
                obj.userNames.forEach((item, idx) => {
                    strUserNames += item
                    if(checkLength > (idx+1)){
                        strUserNames += ","
                    }
                })

                if(this.mySite.selectEmployee.key == 'write'){
                    this.write.inputEmployee = {
                        userIds : strUserIds,
                        userNames : strUserNames,
                    }
                }
                else {
                    this.view.inputEmployee = {
                        userIds : strUserIds,
                        userNames : strUserNames,
                    }
                }
            },

            /* 결과 입력/보기 팝업 hkp*/
            async fn_selfQualityResultOpen() {
                
                try {
                    const payload = {
                        siteMstrId : this.siteMstrId, 
                        selfQltySiteInfoId : this.result.selectRow.selfQltySiteInfoId,
                    } 
    
                    const url = this.sendUrl+'/site/checkRslt/view';
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
    
                    const response = await sendPostApi(url, payload);
    
                    if(response.status == '200'){
                        
                        this.$bvModal.show('selfQualityResultModal');

                        this.fn_selfQualityFileDataReset('result');
    
                        this.result.info = {
                            ...response.data.resultData
                        }
                        let resultData = {
                            ...response.data.resultData
                        }
                        
                        let fileUrl = '/sendApi/api/file/upFileList';
        
                        let param = {
                            fileType : "SelfQltyChkImg",
                            /* fileConnectId : resultData.selfQltySiteInfoId, */
                            fileConnectId : resultData.selfSiteChkRstId,
                        };
    
                        //이미지 파일
                        let imgFileRst = await sendPostApi(fileUrl, param)
    
                        if(imgFileRst.status == '200'){
                            if(imgFileRst.data.data.length > 0){
                                this.result.imgFileList = imgFileRst.data.data;
                            }
                        }
    
                        //첨부 파일
                        param['fileType'] = 'SelfQltyChk'
                        let fileRst = await sendPostApi(fileUrl, param)
    
                        if(fileRst.status == '200'){
                            if(fileRst.data.data.length > 0){
                                this.result.fileList = fileRst.data.data;
                            }
                        }
    
                        let checkData = []; //check sheet data
                        //결과 저장여부 key 체크
    
                        if(resultData.chkRsltStatus == 'CHCK' || resultData.chkRsltStatus == 'REGT'){
                            this.result.inputDate = resultData.checkDt ?  resultData.checkDt : this.$moment().format('YYYY-MM-DD')
                            this.result.inputText = resultData.selfSiteContent
                        }
                        else{
                            this.result.inputDate = this.$moment().format('YYYY-MM-DD');
                            this.result.inputText = '';
                        }

                        //console.log('resultData : ', resultData);
    
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

                        
                        this.fn_selfQualityResultSheet(checkData);
                        if(this.result.info.selfQltyType === 'SITE') {
                            this.fn_selfQualityResultPunch();
                        }
                        
                    }
                    
                } catch (error) {
                    console.error(error)
                }
            },

            fn_checkListClass(evtParam){
                evtParam.sheet.setAttribute(evtParam.sheet.getHeaderRows()[0], "pass", "Class", "", 1);
            },
            
            /* 결과 입력/보기 팝업 sheet */
            fn_selfQualityResultSheet(checkData) {
                
                let checkOptions = siteCheckResultList.options;

                //check sheet
                checkOptions.Cfg = {NoVScroll: 0,}
                checkOptions.Events = {
                    onRenderFirstFinish: async (event) => {
                        if(this.result.info.chkRsltStatus == 'CHCK'){
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
                            this.fn_checkListClass(event)
                        }
                        event.sheet.loadSearchData({
                            data: checkData,
                            append: false
                        })
                    }
                }

                loader.createSheet({
                    el: 'resultCheckSheet',
                    data: checkData, 
                    options: checkOptions
                }).then(async sheet => {
                    this.result.checkSheet = sheet
                })    

            },

            //펀치
            fn_selfQualityResultPunch() {
                /**PUNCH 리스트 셋팅 */
                let punchOptions = this.InspectionResultWrite2.options
                let punchData = [];
                punchOptions.Events = {
                    onRenderFirstFinish : async (event) => {
                        //Punch 조회
                        let punchUrl = '/sendApi/api/noCnfmMngt/noCnfmInfo/list'
                        let punchParam = {
                            siteMstrId : this.siteMstrId,
                            noCnfmType : 'Punch',
                            selfQltySiteInfoId : this.result.info.selfQltySiteInfoId,
                            selfSiteChkRstId : this.result.info.selfSiteChkRstId
                        }

                        let resultPunch = await sendPostApi(punchUrl, punchParam)
                        if(resultPunch.status === 200) {
                            
                            punchData = resultPunch.data.list.map(item => {
                                return {
                                    ...item,
                                    noCnfmStatusNm : item.noCnfmStatus === 'REGT' ? '작성 중' 
                                                   : item.noCnfmStatus === 'PRCS' ? '처리 중'
                                                   : item.noCnfmStatus === 'CHCK' && item.etc !== 'Y'  ? '확인 중'
                                                   : item.noCnfmStatus === 'APRV' ? '완료'
                                                   : item.noCnfmStatus === 'CHCK' && item.etc === 'Y' ? '지연' : ''
                                }
                            })
                        }

                        event.sheet.loadSearchData({
                            data: punchData,
                            append : false
                        })
                        event.sheet.getDataRows().forEach(row => {
                            event.sheet.refreshRow(row)
                        })
                    },
                    ondblclick : this.dbClickGrid,
                }
                loader.createSheet({
                    el: 'punchListSheet',
                    data: punchData,
                    options: punchOptions,
                }).then(sheet => {
                    this.sqphSheet = sheet;
                })
            },

            //파일 데이터 초기화
            fn_selfQualityFileDataReset(type){
                if(type == 'result'){
                    this.result.fileList = [];
                    this.result.files = [],
                    this.result.deleteFiles = [];
                    this.result.imgFileList = [];
                    this.result.imgFiles = [],
                    this.result.imgDeleteFiles = [];
                    this.result.copiedFileIds = [];
                }
                else{
                    this.final.fileList = [];
                    this.final.files = [],
                    this.final.deleteFiles = [];
                    this.final.imgFileList = [];
                    this.final.imgFiles = [],
                    this.final.imgDeleteFiles = [];
                    this.final.copiedFileIds = [];
                }

            },

            //첨부파일 추가
            fn_resultFileChange (files) {
                this.result.files = files
            },
            //첨부파일 삭제
            fn_resultFileDelete (files) {
                this.result.deleteFiles = files
            },

            //점검 사진 파일 추가
            fn_resultImgFileChange (files) {
                // this.result.imgFiles = files
                this.result.imgFiles = files.file;
                this.result.copiedFileIds = files.copyIds;
            },
            //점검 사진 파일 삭제
            fn_resultImgFileDelete (files) {
                this.result.imgDeleteFiles = files
            },

            //점검요청 결과 입력 저장
            fn_selfQualityResultWrite(){

                ///site/checkRslt/write
                const today = this.$moment().add(1,'days').format("YYYY-MM-DD")
                const dateChk = this.$moment(today).isAfter(this.result.inputDate)

                if(!dateChk){
                    this.alert('점검일은 오늘 이후 일자는 선택할 수 없습니다.\n다시 선택해주세요');
                    return;
                }
                if(!(this.result.inputText != null && this.result.inputText != "" && this.result.inputText.trim() != "")){
                    this.alert('자체품질점검 결과를 입력해주세요.');
                    return;
                }
                if(!(this.result.imgFiles.length > 0 || this.result.imgFileList.length > 0 || this.result.copiedFileIds.length > 0)){
                    this.alert('점검사진을 등록해주세요.');
                    return;
                }

                this.confirm('저장하시겠습니까?', async() => {
                    let checkRows = this.result.checkSheet.getDataRows();
                    let resultCheckList = [];

                    //체크리스트 결과값 세팅
                    checkRows.forEach(item => {
                        let checkedVal = '';
                        if(item.pass == "1"){
                            checkedVal = "PASS";
                        }
                        if(item.part == "1"){
                            checkedVal = "PART";
                        }
                        if(item.unpass == "1"){
                            checkedVal = "UNPASS";
                        }
                        if(item.none == "1"){
                            checkedVal = "NONE";
                        }
                        let paramObj = {
                            selfQltySiteInfoId : item.selfQltySiteInfoId,
                            selfSiteChkLstId : item.selfSiteChkLstId,
                            accpChkRslt : checkedVal,
                            comment : item.comment,
                        }
                        resultCheckList.push(paramObj)
                    })

                    let apiUrl = ''
                    //등록
                    if(this.result.info.selfSiteChkRstId == null || this.result.info.selfSiteChkRstId == ''){
                        apiUrl = '/site/checkRslt/write'
                    }
                    //수정
                    else{
                        apiUrl = '/site/checkRslt/change'
                    }

                    const url = this.sendUrl + apiUrl;
                    const payload = {
                        selfQltySiteInfoId : this.result.info.selfQltySiteInfoId,
                        selfSiteChkRstId : this.result.info.selfSiteChkRstId,
                        selfQltyStatus : this.result.info.selfQltyStatus,
                        checkDt : this.result.inputDate,
                        selfSiteContent : this.result.inputText,
                        chkRsltVO : resultCheckList,
                        chkRsltStatus : "REGT",
                    }
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                    const response = await sendPostApi(url, payload)

                    if(response.status == '200'){

                        //첨부파일 입력 체크
                        if((this.result.files && this.result.files.length > 0) 
                        || (this.result.deleteFiles && this.result.deleteFiles.length > 0)
                        || (this.result.imgFiles && this.result.imgFiles.length > 0)
                        || (this.result.imgDeleteFiles && this.result.imgDeleteFiles.length > 0)
                        || (this.result.copiedFileIds && this.result.copiedFileIds.length >0)
                        ){

                            let resultData = true;

                            //파일 connectid
                            //파일 전송 header 세팅
                            /* const fileConnectId = this.result.info.selfQltySiteInfoId; */
                            let fileConnectId = this.result.info.selfSiteChkRstId;

                            //insert 일경우
                            if(fileConnectId == null || fileConnectId == ''){
                                fileConnectId = response.data.resultData.selfSiteChkRstId
                            }
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                            requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                            //파일 등록 성공 여부 

                            //파일 추가
                            if(this.result.files && this.result.files.length > 0){

                                const subResponse = await sendFileApi(fileConnectId, "SelfQltyChk", this.result.files)
                                if(subResponse.status == '200'){
                                }
                                else{
                                    resultData = false;
                                }
                            }
                            //파일 삭제
                            if(this.result.deleteFiles && this.result.deleteFiles.length > 0){
                                let url = '/sendApi/api/file/fileUnUse';
                                let payload = {
                                    fileType : "SelfQltyChk",
                                    fileChkEduArcvIds : this.result.deleteFiles,
                                };

                                const subResponse = await sendPostApi(url, payload)
                                if(subResponse.status == '200'){
                                }
                                else{
                                    resultData = false;
                                }
                            }

                            //이미지 파일 추가
                            if((this.result.imgFiles && this.result.imgFiles.length > 0) ||(this.result.copiedFileIds && this.result.copiedFileIds.length > 0)){

                                const subResponse = await sendFileApi(fileConnectId, "SelfQltyChkImg", this.result.imgFiles, null, this.result.copiedFileIds)
                                if(subResponse.status == '200'){
                                }
                                else{
                                    resultData = false;
                                }
                            }
                            //이미지 파일 삭제
                            if(this.result.imgDeleteFiles && this.result.imgDeleteFiles.length > 0){
                                let url = '/sendApi/api/file/fileUnUse';
                                let payload = {
                                    fileType : "SelfQltyChkImg",
                                    fileChkEduArcvIds : this.result.imgDeleteFiles,
                                };

                                const subResponse = await sendPostApi(url, payload)
                                if(subResponse.status == '200'){
                                }
                                else{
                                    resultData = false;
                                }
                            }

                            if(!resultData){
                                this.alert('저장에 실패했습니다.');            
                            }
                        }

                        this.alert('저장되었습니다.', () => {
                            this.fn_selfQualityResultOpen();
                            this.fn_mySite();
                        });
                    }
                })
            },

            //점검요청 결과 입력 회신
            fn_selfQualityResultReply(){

                this.confirm('회신하시겠습니까?', async() => {
                    
                    let payload = {
                        selfQltySiteInfoId : this.result.info.selfQltySiteInfoId,
                        selfQltyType : this.result.info.selfQltyType,
                    }
                    if(this.result.info.selfQltyType === 'SITE') {
                        payload['selfSiteChkRstId'] = this.result.info.selfSiteChkRstId,
                        payload['siteMstrId'] = this.siteMstrId
                        payload['projectName'] = this.$store.getters['auth/getProjectNm']
                        payload['projectId'] = this.$store.getters['auth/getProjectId']
                    }
                    const url = this.sendUrl + '/site/checkRslt/reply';

                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                    const response = await sendPostApi(url, payload)

                    if(response.status == '200'){
                        this.alert('회신되었습니다.', () => {
                            //메시지 발송  
                            if(this.result.info.selfQltyType == 'SITE'){
                                let msgPayload = {
                                      messageCode : 'A052'
                                    , userId : this.userInfo.userId
                                    , reciveUserId : this.result.info.drafterUser
                                    , docSeq : '현장자체점검이 회신되었습니다.'
                                }
                                this.fn_sendMessaget(msgPayload);
                            }
                            else{
                                this.fn_mySite();
                                this.$bvModal.hide('selfQualityResultModal');
                            }
                        });
                    }
                })
            },

            /* 최종 송부 팝업 */
            async fn_selfQualityFinalOpen () {

                try {

                    const payload = {
                        siteMstrId : this.siteMstrId, 
                        selfQltySiteInfoId : this.final.selectRow.selfQltySiteInfoId,
                    } 

                    const url = this.sendUrl+'/site/checkFinl/view';
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                    const response = await sendPostApi(url, payload);

                    if(response.status == '200'){

                        this.$bvModal.show('selfQualityFinalModal')

                        let resultList = [];

                        this.fn_selfQualityFileDataReset('final');
                        this.final.inputText = ""
                        
                        this.final.info = {
                            ...response.data.resultData
                        }
    
                        let resultData = {
                            ...response.data.resultData
                        }

                        let chkIdx = 0;
                        let checkDataList = []; //check sheet data
                        let punchDataList = []; //punch sheet data

                        if(this.final.info.chkRslt.length > 0){
                            this.final.info.chkRslt.forEach(async(item, idx) => {

                                item['imgFileList'] = []
                                item['fileList'] = []

                                let fileUrl = '/sendApi/api/file/upFileList';
                
                                let param = {
                                    fileType : "SelfQltyChkImg",
                                    fileConnectId : item.selfSiteChkRstId,
                                };
            
                                //이미지 파일
                                let imgFileRst = await sendPostApi(fileUrl, param)
            
                                if(imgFileRst.status == '200'){
                                    if(imgFileRst.data.data && imgFileRst.data.data.length > 0){
                                        let imgFileList = []
                                        imgFileRst.data.data.forEach(item => {
                                            imgFileList.push(item)
                                        })
                                        item['imgFileList'] = imgFileList
                                    }
                                }
            
                                //첨부 파일
                                param['fileType'] = 'SelfQltyChk'
                                let fileRst = await sendPostApi(fileUrl, param)
            
                                if(fileRst.status == '200'){
                                    if(fileRst.data.data && fileRst.data.data.length > 0){
                                        let fileList = []
                                        fileRst.data.data.forEach(item => {
                                            fileList.push(item)
                                        })
                                        item['fileList'] = fileList
                                    }
                                }

                                let checkData = []; //check sheet data
                                let punchData = []; //punch sheet data

                                //체크리스트
                                if(item.chkRsltVO && item.chkRsltVO.length > 0){
                                    item.chkRsltVO.forEach(subItem => {
                                        subItem['pass'] = ''
                                        subItem['part'] = ''
                                        subItem['unpass'] = ''
                                        subItem['none'] = ''
                                        if(subItem.accpChkRslt == "PASS"){
                                            subItem['pass'] = '1'
                                        }
                                        else if(subItem.accpChkRslt == "PART"){
                                            subItem['part'] = '1'
                                        }
                                        else if(subItem.accpChkRslt == "UNPASS"){
                                            subItem['unpass'] = '1'
                                        }
                                        else if(subItem.accpChkRslt == "NONE"){
                                            subItem['none'] = '1'
                                        }
                                        checkData.push(subItem)
                                    })
                                }

                                const resultObj = {
                                    ...item
                                }

                                resultList.push(resultObj)
                                this.final.info.chkRslt = resultList

                                if(resultData.checkUserId != null && resultData.checkUserId != ''){
                                    if(item.inUser == resultData.checkUserId){
                                        chkIdx = chkIdx + 1;
                                        checkDataList = checkData
                                        punchDataList = punchData
                                        item['chk'] = '1'
                                        this.fn_selfQualityFinalSheet(checkDataList, punchDataList, resultData.chkRslt);
                                    }
                                }
                                else{
                                    if(0 >= chkIdx && (item.replyDt != null && item.replyDt != '' )){
                                        chkIdx = chkIdx + 1;
                                        checkDataList = checkData
                                        punchDataList = punchData
                                        item['chk'] = '1'
                                        this.fn_selfQualityFinalSheet(checkDataList, punchDataList, resultData.chkRslt);
                                    }
    
                                    if((idx+1) === resultData.chkRslt.length){
                                        
                                        if(0 >= chkIdx){
                                            this.fn_selfQualityFinalSheet(checkDataList, punchDataList, resultData.chkRslt);
                                        }
                                    }
                                } 
                            })
                        }
                        else{
                            this.fn_selfQualityFinalSheet(checkDataList, punchDataList, resultData.chkRslt);
                        }
                    }
                } catch (error) {
                    console.error(error)
                }
            },

            /* 최종 송부 팝업 Sheet */
            fn_selfQualityFinalSheet(checkData, punchData, checkUserData){

                if(checkUserData){
                    checkUserData.forEach((item) => {

                        if(item['chk'] && item['chk'] == '1'){
                            this.fn_selectCheckUser(item)
                        }
                        else{
                            item['chk'] = '0'
                        }

                        if(item.chkRsltStatus == null || item.chkRsltStatus == ''){
                            item['replyYn'] = ''
                        }
                        else if(item.chkRsltStatus == 'REGT'){
                            item['replyYn'] = '0'
                        }
                        else if(item.chkRsltStatus == 'CHCK'){
                            item['replyYn'] = '1'
                        }
                    })

                    //checkUser sheet
                    let checkUserOptions = checkUserSelectList.options;

                    checkUserOptions.Events = {
                        onClick: this.fn_checkUserSheetEvt,
                        onDataLoad : this.fn_selectCheckUserReplyChk,
                        onRenderFirstFinish: async () => {
                            this.final.checkUserSheet.loadSearchData({
                                data: checkUserData,
                                append: false
                            })
                        }
                    }
                    loader.createSheet({
                        el: 'checkUserSheet',
                        data: checkUserData, 
                        options: checkUserOptions
                    }).then(async sheet => {
                        this.final.checkUserSheet = sheet
                    })
                }

                let checkOptions = siteCheckResultList.options;

                //check sheet
                checkOptions.Cfg = {NoVScroll: 0,}
                checkOptions.Events = {
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
                            data: checkData,
                            append: false
                        })
                        this.fn_checkListClass(event)
                    }
                }

                loader.createSheet({
                    el: 'finalCheckSheet',
                    data: checkData, 
                    options: checkOptions
                }).then(async sheet => {
                    this.final.checkSheet = sheet
                })    
            },  

            //최종 송부 점검자 선택
            fn_selectCheckUser(obj){
                this.final.info.chkRslt.forEach(item => {
                    if(obj.selfSiteChkRstId == item.selfSiteChkRstId){
                        this.final.inputText = item.selfSiteContent
                        this.final.imgFileList = item.imgFileList
                        this.final.fileList = item.fileList
                    }
                })
            },

            //최종 송부 점검자 회신 여부 체크
            fn_selectCheckUserReplyChk(evtParam){
                let sheet = evtParam.sheet;
                let rows = sheet.getDataRows(); 
                rows.forEach(item => {
                    if(item.replyDt == null || item.replyDt == ""){
                        sheet.setAttribute(item, "chk", "CanEdit", 0, 1)
                        sheet.setAttribute(item, "chk", "Class", "disabled", 1);
                    }
                })
            },

            //최종 송부 저장
            fn_selfQualityFinalChange(){
                const selectRows = this.final.checkUserSheet.getRowsByChecked('chk');
                if(selectRows && selectRows.length > 0){
                    this.confirm('저장하시겠습니까?', async() => {
                        const payload = {
                            selfQltySiteInfoId : selectRows[0].selfQltySiteInfoId,
                            checkUserId : selectRows[0].inUser,
                        }
                        
                        const url = this.sendUrl+'/site/checkFinl/change';
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                        const response = await sendPostApi(url, payload);

                        if(response.status == '200'){
                            this.alert('저장되었습니다.', ()=> {
                                this.fn_mySite();
                                this.fn_selfQualityFinalOpen();
                            });
                        }
                    })
                }
                else{
                    this.alert('점검자를 선택해주세요.');
                    return;
                }
            },

            //결재 상신 팝업 호출
            fn_selfQualityFinalApprove(type){

                let selfQltySiteInfoId = "";
                
                if(type == 'list'){
                    let selectRow = this.mySiteSheet.getRowsByChecked('chk')
                    if(selectRow && selectRow.length > 0){
                        selfQltySiteInfoId = selectRow[0].selfQltySiteInfoId
                    }
                    else{
                        return this.alert("선택된 행이 없습니다.");
                    }
                }
                else{
                    selfQltySiteInfoId = this.final.info.selfQltySiteInfoId
                }

                this.approve = {
                    requestId : selfQltySiteInfoId,
                    siteMstrId : this.siteMstrId
                }

                this.$bvModal.show('approveModal');
            },

            //상신 후 상태값 update
            async fn_setSourceApproval(obj){

                if(obj){

                    const url = this.sendUrl + '/site/checkFinl/approve';

                    const payload = {
                        selfQltySiteInfoId : obj.aprvFileConnectId,
                        siteMstrId : this.siteMstrId,
                        selfQltyStatus : 'APVL',
                        aprvInfoId : obj.aprvInfoId,
                    }

                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                    const response = await sendPostApi(url, payload)

                    if(response.status == '200'){
                        this.alert('결재가 상신되었습니다.');
                        this.fn_mySite();
                        this.$bvModal.hide('selfQualityFinalModal');
                    }
                }
                else{
                    // console.log('approve error');
                }
            },

            //첨부파일 추가
            fn_finalFileChange (files) {
                this.final.files = files
            },
            //첨부파일 삭제
            fn_finalFileDelete (files) {
                this.final.deleteFiles = files
            },

            //점검 사진 파일 추가
            fn_finalImgFileChange (files) {
                // this.final.imgFiles = files
                this.final.imgFiles = files.file;
                this.final.copiedFileIds = files.copyIds;
            },
            //점검 사진 파일 삭제
            fn_finalImgFileDelete (files) {
                this.final.imgDeleteFiles = files
            },

            fn_selfQltySheetEvt: function(evtParam) {

                //선택 행
                let selectRow = evtParam.row

                if(evtParam.col == "infoBtn" && evtParam.event.target.tagName == "BUTTON"){ // infoBtn: 점검
                    if(evtParam.event.target.className == "btn_view") { // 점검 보기
                        return this.fn_selfQualityDetailOpen(selectRow, 'view');
                    }
                }
                if(evtParam.col == "resultBtn" && evtParam.event.target.tagName == "BUTTON"){ // resultBtn: 결과
                    if(evtParam.event.target.className == "btn_plus") { // 등록
                        this.result.key = 'write'
                        this.result.selectRow = {
                            ...selectRow
                        }
                    }
                    if(evtParam.event.target.className == "btn_view") { // 보기
                        this.result.key = 'view'
                        this.result.selectRow = {
                            ...selectRow
                        }
                    }
                    //파일 초기화
                    this.fn_selfQualityFileDataReset('result');

                    this.fn_selfQualityResultOpen();
                }
                if(evtParam.col == "finalBtn" && evtParam.event.target.tagName == "BUTTON"){ // finalBtn: 최종송부
                    if(evtParam.event.target.className == "btn_plus") { // 등록
                        this.final.key = 'write'
                        this.final.selectRow = {
                            ...selectRow
                        }
                    }
                    if(evtParam.event.target.className == "btn_view") { // 보기
                        this.final.key = 'view'
                        this.final.selectRow = {
                            ...selectRow
                        }
                    }
                    //파일 초기화
                    this.fn_selfQualityFileDataReset('final');
                    this.fn_selfQualityFinalOpen();
                }
            },

            fn_checkUserSheetEvt(evtParam){
                if(evtParam.col == "chk" && evtParam.row.chk == '0' && (evtParam.row.replyDt != null && evtParam.row.replyDt != '')){
                    let selectRow = {
                        ...evtParam.row
                    }
                    this.final.info.chkRslt.forEach(item => {
                        if(item.selfSiteChkRstId == selectRow.selfSiteChkRstId){
                            this.fn_selectCheckUser(item);
                            this.fn_selfQualityFinalSheet(item.chkRsltVO, []);
                        }
                    })
                }
            },

            //본사 checkList 메인
            fn_checkListSheet(data) {

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
                    el: 'checkListSelfSiteSheet',
                    data: data, 
                    options: options
                }).then(async sheet => {
                    this.checkListSheet = sheet;
                })

            },

            //checkList
            fn_checkListSheetEvt: function() {
                let ts = this;
                ts.$root.$emit('bv::show::modal', 'checklistEdit')
            },
            
            //상태값 그래프
            fn_selfQltyStatusGraph(evtParam) {
                var sheet = evtParam.sheet;
                var row = sheet.getFirstRow(); // 첫번째 row
                var sheetText = ''; 
                var sheetNum = 0, sheetClass = ''; // 등록, 회신, 확인
                var status;
                var statusList = []
                var numArr = [33, 52, 85, 100]; //상태값 길이



                this.statusCodeList.forEach((item, idx) => {
                    let copyObj = {
                        codeVal : item.codeVal,
                        codeNameKr : item.codeNameKr,
                        codeNameEn : item.codeNameEn,
                        num : numArr[idx],
                    }

                    statusList.push(copyObj)
                    //지연 추가
                    if(item.codeVal == 'CHCK'){
                        let rateStatus = {
                            codeVal : 'RATE',
                            codeNameKr : '점검중',
                            codeNameEn : '',
                            num : numArr[idx],
                        }
                        statusList.push(rateStatus)
                    } 
                })

                while (row != null) { // return row 반복
                    sheetNum = 0; 
                    statusList.forEach(function(item,idx) {
                        if(item.codeVal == row.selfQltyStatusGraph){
                            //지연일 경우 체크
                            if(row.selfQltyStatusGraph == 'RATE'){
                                status = 'warning';     
                            }
                            else if(row.selfQltyStatusGraph == 'APRV'){
                                status = 'complete';
                            }
                            else{
                                status = ''
                            }

                            sheetText = item.codeNameKr;
                            sheetNum = item.num;
                            sheetClass = status;

                            //반려 추가
                            if(row.selfQltyStatus == 'CHCK' && row.aprvInfoId){
                                sheetText = '반려';
                                sheetNum = (item.num + 16);
                            }
                        }
                    })

                    var itemEvt = function(item) {
                        (item === 1) ? item += 'px' : item += '%';
                        return item;
                    };
                    
                    var steps = 
                        '<div class="guage">'+
                            '<span class="bar_wrap">' +
                                '<span class=\'bar '+sheetClass+'\' style=\'width:'+itemEvt(sheetNum)+';\'></span>' + 
                            '</span>'+
                            '<span class="label" style=\'width:'+sheetNum+'%\'>'+sheetText+'</span>' +
                        '</div>'
                    row['selfQltyStatusArea'] = steps;
                    sheet.setMergeRange(row, "selfQltyStatusArea", row, "case9");
                    row = sheet.getNextRow(row); // 다음행 return
                }
            },

            //결재상신 버튼 chk
            fn_aprvBtnSelectChk(evtParam){
                let sheet = evtParam.sheet;
                let rows = sheet.getDataRows(); 
                rows.forEach(item => {
                    if(item.aprvInput == "0"){
                        sheet.setAttribute(item, "chk", "CanEdit", 0, 1)
                        sheet.setAttribute(item, "chk", "Class", "disabled", 1);
                    }
                })
            },

            async fn_checkList(){

                let data = [];

                let payload = {
                    'siteMstrId' : this.siteMstrId
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

                    this.fn_checkListSheet(data);
    
                } catch (error) {
                    console.error(error);
                }
                
            },

            //체크리스트 등록
            fn_checkListWrite(){
                
                let checkList = this.checkListWriteSelfSiteSheet.getShownRows(0)
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
                                siteMstrId : this.siteMstrId,
                                checkList : resultList,
                            }
                            let url = this.sendUrl + '/popup/checkList/write'
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")
            
                            const response = await sendPostApi(url, payload);

                            if(response.status == '200'){
                                this.alert('저장되었습니다.', ()=> {
                                    this.$bvModal.hide('checkListSelfSiteWriteModal');
                                    this.fn_checkList()
                                }); 
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    })
                }
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
                this.$bvModal.show('checkListSelfSiteWriteModal');
                this.checkListObj.write.addCount = 1;
                this.fn_checkListWriteSelfSiteSheet();
            },

            //본사 checkList 작성 팝업
            fn_checkListWriteSelfSiteSheet() {

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
                            this.checkListWriteSelfSiteSheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                    }

                    options.Cfg = {NoVScroll: 0,}

                    loader.createSheet({
                        el: 'checkListWriteSelfSiteSheet',
                        data: data, 
                        options: options
                    }).then(async sheet => {
                        this.checkListWriteSelfSiteSheet = sheet
                    })
                });
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
                this.fn_checkListChangeModalOpen();
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
                    this.$bvModal.show('checkListSelfSiteChangeModal')
                    let sheetData = response.data.data.checkList;
                    this.checkListObj.change = {
                        ...response.data.data,
                        addCount : 1
                    }
                    this.fn_checkListChangeSelfSiteSheet(sheetData);
                }
            },

            //본사 checkList 수정 팝업
            fn_checkListChangeSelfSiteSheet(setData) {

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
                            this.checkListChangeSelfSiteSheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                    }

                    options.Cols    =   this.checkListAuth
                                        ? options.Cols
                                        : options.Cols.filter(col => col.Name !== 'isChecked')

                    options.Cfg = {NoVScroll: 0,}

                    loader.createSheet({
                        el: 'checkListChangeSelfSiteSheet',
                        data: data, 
                        options: options
                    }).then(async sheet => {
                        this.checkListChangeSelfSiteSheet = sheet
                    })
                });
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

            //체크리스트 수정
            fn_checkListChange(){

                let checkList = this.checkListChangeSelfSiteSheet.getShownRows(0)
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
                                this.alert('수정되었습니다.', ()=> {
                                    this.$bvModal.hide('checkListSelfSiteChangeModal');
                                    this.fn_checkList()
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
                                    this.fn_checkList()
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
                this.checkListWriteSelfSiteSheet.loadSearchData({
                    data: data,
                    append: true,
                    next: this.checkListWriteSelfSiteSheet.getFirstRow()
                });
                this.$bvModal.hide('SelfQualitySiteSheet_ExcelUploadModal1');
            },
            fn_importChangeExcel: function (data) {
                // maybe..?
                this.checkListChangeSelfSiteSheet.loadSearchData({
                    data: data,
                    append: true,
                    next: this.checkListChangeSelfSiteSheet.getFirstRow()
                });
                this.$bvModal.hide('SelfQualitySiteSheet_ExcelUploadModal2');
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols: sheet.options.Cols.filter((item) => !['chk','isChecked','isCheck','selfQltyStatusArea','case8','case9','infoBtn','resultBtn','finalBtn'].includes(item.Name))
                }
                this.excelDownload.downloadOption = {
                    checkBoxOnValue:    'Y',
                    checkBoxOffValue:   'Y',
                }
                this.excelDownload.fileName  = `자체품질점검_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                this.excelDownload.data      = _.cloneDeep(sheet.getShownRows(0));
                this.excelDownload.request  = true;
            },

            /** 통합 메세지 */
            fn_sendMessaget(msgPayload) {
                const url       = '/sendApi/api/messageMngt/message/send'
                const payload = {
                    projectId:      this.$store.getters['auth/getProjectId'],
                    projectName:    this.$store.getters['auth/getProjectNm'],
                    siteMstrId:     this.siteMstrId,
                    ...msgPayload
                }
                const options = {
                    headers : {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    },
                }
                axios.post(url, payload, options).then(response => {
                    if (response.status !== 200) {
                        throw new Error('fn_sendMessage')
                    } else {
                        this.fn_mySite();
                        this.$bvModal.hide('selfQualityResultModal');
                    }
                }).catch(error => {
                    console.error(error)
                    this.alert('발송에 실패했습니다.')
                })
            },

            /**punch그리드 DB클릭 */
            dbClickGrid(evt){
                if(evt.row.noCnfmStatus === '') {
                    this.noCfrmType = 'write'
                    this.noCnfmInfoId = '';
                    this.selfQltySiteInfoId = this.result.info.selfQltySiteInfoId
                    this.selfSiteChkRstId = this.result.info.selfSiteChkRstId
                } else {
                    this.selfQltySiteInfoId = evt.row.selfQltySiteInfoId
                    this.selfSiteChkRstId = evt.row.selfSiteChkRstId
                    this.noCnfmInfoId = evt.row.noCnfmInfoId
                    this.noCfrmType = 'modify'
                }
                
                this.viewType = 'Punch'
                this.popId = 'SelfQualitySitePunchModal'
                this.$bvModal.show('PunchWrite');
            },

            /** 펀치 등록 */
            selfQltyPunchWrite() {
                this.noCnfmInfoId = '';
                this.noCfrmType = 'write'
                this.viewType = 'Punch'
                this.popId = 'SelfQualitySitePunchModal'
                this.selfQltySiteInfoId = this.result.info.selfQltySiteInfoId
                this.selfSiteChkRstId = this.result.info.selfSiteChkRstId
                this.$bvModal.show('PunchWrite');
                
            },

            /** 펀치 삭제 체크 */
            selfQltyPunchDelete() {
                let sheet = this.sqphSheet
                let checkedRows = [];
                let delRows = [];
                this.deleteIds = [];

                checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                if(checkedRows.length === 0) {
                    this.alert('선택된 행이 없습니다.');
                    return
                } else {
                    this.confirm('삭제하시겠습니까?', () => {
                        sheet.deleteRows({rows : checkedRows })
                        checkedRows.map((row, idx) => {
                            let item = {};
                            if(row.noCnfmStatus !== '' && row.noCnfmStatus !== 'REGT') {
                                this.alert(idx+1+'번째 행은 삭제 불가능합니다.')
                                return 
                            } else {
                                item['status'] = 'Deleted';
                                item['noCnfmInfoId'] = row.noCnfmInfoId
                                item['noCnfmType'] = row.noCnfmType
                                item['selfQltySiteInfoId'] = row.selfQltySiteInfoId
                                item['selfSiteChkRstId'] = row.selfSiteChkRstId
                                this.deleteIds.push(item)
                            }
                        })
                        // deleteIds.forEach(item => {
                        //     item['noCnfmId'] 
                        //     item['status'] = 'Deleted';
                        // })
                        if(this.deleteIds.length > 0) {
                            this.fn_selfPunchDelete()
                        }
                        
                    })

                }
            },

            /*
            * 펀치 삭제
            */
            async fn_selfPunchDelete() {
                let url = this.sendUrl+'/site/checkPunch/unUse';

                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                try { 
                    await sendPostApi(url, this.deleteIds).then((result) => {
                        if(result.status === 200) {
                            this.alert('삭제되었습니다.', () => {
                                this.fn_selfQualityResultPunch();
                            })
                        } else {
                            this.alert('삭제에 실패했습니다.', ()=>{
                                this.fn_selfQualityResultPunch();
                            })
                        }
                    }).catch((e) =>{
                        return e.response
                    })
                } catch(error) {
                    console.error('자체품질점검 펀치 삭제 실패:' + error)
                }
                
                
            }
        },
   }
</script>