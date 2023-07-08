<template>
            <div class="tab_contents">
                <div class="inner type2">
                    <h2 class="sub_title" v-if="testStatus != 'APVL' && testStatus != 'APRV'">공장검사
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="beforeInsertCheck" v-if="checkUser(userId,'change')">저장</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="beforeDeleteCheck" v-if="checkUser(userId,'unuse')">삭제</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" v-bind:class="{disabled:testStatus==='REGT'}" v-on:click="insertSign" v-if="checkUser(userId,'write')">결재상신</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="goList">목록</button>
                        </div>
                    </h2>
                    <h2 class="sub_title" v-else>공장검사 상세보기
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="viewAprv" v-if="checkUser(userId,'view')">결재보기</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" v-on:click="goList">목록</button>
                        </div>
                    </h2>
                    <div class="data_num">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="86">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>신청번호</th>
                                    <td>{{docSeq}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="lst_tabs">
                        <ul class="">
                            <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index, disabled:removeTab===index}" v-bind:id="index" :key="index"><a href="javascript:void(0);" v-on:click="tabClick(index)">{{tab}}</a></li>
                        </ul>
                    </div>

                     <div class="tab_area" v-if="rmcYn == 'N'" v-show="currentTab == 0">
                        <div class="lst_data">
                            <div class="data_tit">1. 공장검사 정보</div>
                            <div class="table_normal_list table_write align_center">
                                <table v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>제조업체</th>
                                            <th><span class="emp_red">검사 실시일</span></th>
                                            <th><span class="emp_red">장소</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{mnft}}</td>
                                            <td>
                                                {{ftryInspDt}}
                                            </td>
                                            <td>
                                                {{addr}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table v-else>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>제조업체</th>
                                            <th><span class="emp_red">검사 실시일</span></th>
                                            <th><span class="emp_red">장소</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{mnft}}</td>
                                            <td>
                                                <date-picker
                                                    v-model="ftryInspDt"
                                                    tabindex="1"
                                                />
                                                <!-- <Datepicker ref="datapicker" v-on:value-change="dateChange" /> -->
                                            </td>
                                            <td>
                                                <input type="text" class="form_control" placeholder="입력해주세요" v-model="addr" :maxlength="100">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="data_tit">2. 주요 검사 내용 및 특이사항</div>
                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>구분</th>
                                            <th>내용</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                        <tr>
                                            <th><span class="emp_red">주요 검사 내용</span></th>
                                            <td>
                                                <div class="input_text">
                                                    {{tstDtl}}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>특이사항</th>
                                            <td>
                                                <div class="input_text">
                                                    {{spct}}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <th><span class="emp_red">주요 검사 내용</span></th>
                                            <td>
                                                <div class="input_text">
                                                    <textarea name="" id="" class="form_control" v-model="tstDtl" style="height: 60px;"></textarea>
                                                    <div class="num"><strong class="count">{{tstDtl!=null?tstDtl.length:0}}</strong>/500</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>특이사항</th>
                                            <td>
                                                <div class="input_text">
                                                    <textarea name="" id="" class="form_control" v-model="spct" style="height: 60px;"></textarea>
                                                    <div class="num"><strong class="count">{{spct!=null?spct.length:0}}</strong>/500</div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="data_tit">3. 점검자</div>
                            <div class="table_normal_list table_write align_center">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="*">
                                        <col width="*">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th><span class="emp_red">(점검자) 공사 감독자</span></th>
                                            <th><span class="emp_red">(점검자) 시공자</span></th> 
                                            <th><span>(점검자) 공장 관계자</span></th> 
                                        </tr>
                                    </thead>
                                    <tbody v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                        <tr>
                                            <td style="white-space:pre-line;word-break:break-all;">
                                                {{csrtDirtViewNm.toString()}}
                                            </td>
                                            <td style="white-space:pre-line;word-break:break-all;">
                                                {{csrtViewNm.toString()}}
                                            </td>
                                            <td style="white-space:pre-line;word-break:break-all;">
                                                {{ftryStffNm}}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td>
                                                <div class="search_area">
                                                    <input type="text" class="form_control" placeholder="검색" v-model="csrtDirtViewNm" v-on:click="multiPartnerClick" readonly tabindex="25">
                                                    <button type="button" class="btn_search" v-on:click="multiPartnerClick">검색</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="search_area">
                                                    <input type="text" class="form_control" placeholder="검색" v-model="csrtViewNm" v-on:click="multiUserClick" readonly tabindex="26">
                                                    <button type="button" class="btn_search" v-on:click="multiUserClick">검색</button>
                                                </div>
                                            </td>
                                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="ftryStffNm" :maxlength="20" tabindex="27"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th><span class="emp_red">점검자</span></th>
                                            <td v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                                <div class="search_area form_sm">
                                                    {{isptNm}}
                                                </div>
                                            </td>
                                            <td v-else>
                                                <div class="search_area form_sm">
                                                    <input type="text" placeholder="검색" v-model="isptNm" class="form_control" v-b-modal.FtryWrite_EmployeeSearch readonly>
                                                    <button type="button" class="btn_search" v-b-modal.FtryWrite_EmployeeSearch>검색</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> -->
                        </div>
                    </div>

            

                    <div class="tab_area"  v-if="rmcYn == 'Y'" v-show="currentTab == 1">
                    <!-- <div class="tab_area"  v-show="currentTab == 1"> -->
                        <div class="lst_data">
                            <div class="data_tit">1. 공장검사 정보</div>
                            <div class="table_normal_list table_write align_center">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="*">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>제조업체</th>
                                            <th><span class="emp_red">검사 실시일</span></th>
                                            <th><span class="emp_red">장소</span></th>
                                            <th><span class="emp_red">공장대표</span></th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                        <tr>
                                            <td>{{mnft}}</td>
                                            <td>
                                                {{ftryInspDt}}
                                            </td>
                                            <td>
                                                {{addr}}
                                            </td>
                                            <td>{{ftryCeo}}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td>{{mnft}}</td>
                                            <td>
                                                <!-- <Datepicker ref="datapicker" v-on:value-change="dateChange" tabindex="1"/> -->
                                                <date-picker
                                                    v-model="ftryInspDt"
                                                    tabindex="1"
                                                />
                                            </td>
                                            <td>
                                                <input type="text" class="form_control" placeholder="입력해주세요" v-model="addr" :maxlength="100" tabindex="2">
                                            </td>
                                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="ftryCeo" :maxlength="20" tabindex="3"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="data_tit">2. 공장 정보</div>
                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="15%">
                                        <col width="10%">
                                        <col width="*">
                                        <col width="15%">
                                        <col width="12%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                        <tr>
                                            <th><span class="emp_red">운반가능시간</span></th>
                                            <td colspan="2">
                                                {{tsptKm}} <span class="ml10 mr30">Km</span>
                                                {{tsptTime}} <span class="ml10 mr10">분</span>
                                            </td>
                                            <th><span class="emp_red">KS인증</span></th>
                                            <td colspan="2">
                                                <label class="input_radio mr30">
                                                    <input type="radio" id="" name="" checked="checked" v-model="ksYn" value= "Y" disabled>
                                                    <span class="label_text">인증</span>
                                                </label>
                                                <label class="input_radio">
                                                    <input type="radio" id="" name="" v-model="ksYn" value= "N" disabled>
                                                    <span class="label_text">미인증</span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><span class="emp_red">일 최대 생산량</span></th>
                                            <td colspan="2">{{maxPrdtDay}}</td>
                                            <th><span class="emp_red">전년도 생산량</span></th>
                                            <td colspan="2">{{prdtLsYear}}</td>
                                        </tr>
                                        <tr>
                                            <th rowspan="3"><span class="emp_red">운반시설</span></th>
                                            <td class="pl20 pr20">형식</td>
                                            <td>{{tsptType}}</td>
                                            <th rowspan="2"><span class="emp_red">폐 자제 재생설비</span></th>
                                            <td colspan="2">
                                                <label class="input_radio mr30">
                                                    <input type="radio" id="" name="" checked="checked" v-model="rgntEqpmYn" value="Y" disabled>
                                                    <span class="label_text">구비</span>
                                                </label>
                                                <label class="input_radio">
                                                    <input type="radio" id="" name="" v-model="rgntEqpmYn" value="N" disabled>
                                                    <span class="label_text">미구비</span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl20 pr20">용량</td>
                                            <td>{{tsptCpc}}</td>
                                            <td class="pl20 pr20">미구비 사유</td>
                                            <td>{{rgntEqpmRsn}}</td>
                                        </tr>
                                        <tr>
                                            <td class="pl20 pr20">대수</td>
                                            <td>{{tsptAb}}</td>
                                            <th rowspan="5"><span class="emp_red">품질 시험 기술인</span></th>
                                            <td class="pl20 pr20">성명</td>
                                            <td>{{qltyNm}}</td>
                                        </tr>
                                        <tr>
                                            <th rowspan="4"><span class="emp_red">중요시험설비 <br>비치 및 관리 상태</span></th>
                                            <td class="pl20 pr20">적정</td>
                                            <td>
                                                <label class="input_radio pop_notext">
                                                    <input type="radio" id="" name="" checked="checked" v-model="factMngStatus" value="Y" disabled>
                                                    <span class="label_text"></span>
                                                </label>
                                            </td>
                                            <td class="pl20 pr20">자격 보유종목</td>
                                            <td>{{qltyQlftList}}</td>
                                        </tr>
                                        <tr>
                                            <td class="pl20 pr20">부적정</td>
                                            <td>
                                                <label class="input_radio pop_notext">
                                                    <input type="radio" id="" name="" v-model="factMngStatus" value="N" disabled>
                                                    <span class="label_text"></span>
                                                </label>
                                            </td>
                                            <td class="pl20 pr20">이수교육명</td>
                                            <td>{{qltyTrnNm}}</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2" class="pl20 pr20">부적정 사유</td>
                                            <td rowspan="2">
                                            {{factMngRsn}}
                                            </td>
                                            <td class="pl20 pr20">교육기관</td>
                                            <td>{{qltyEduNm}}</td>
                                        </tr>
                                        <tr>
                                            <td class="pl20 pr20">교육기간</td>
                                            <td>{{qltyEduTerm}}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <th><span class="emp_red">운반가능시간</span></th>
                                            <td colspan="2">
                                                <input type="text" class="form_control small" v-model="tsptKm" :maxlength="5" tabindex="4"> <span class="ml10 mr30">Km</span>
                                                <input type="text" class="form_control small" v-model="tsptTime" :maxlength="5" tabindex="5"> <span class="ml10 mr10">분</span>
                                            </td>
                                            <th><span class="emp_red">KS인증</span></th>
                                            <td colspan="2">
                                                <label class="input_radio mr30">
                                                    <input type="radio" id="" name="" checked="checked" v-model="ksYn" value= "Y" tabindex="13">
                                                    <span class="label_text">인증</span>
                                                </label>
                                                <label class="input_radio">
                                                    <input type="radio" id="" name="" v-model="ksYn" value= "N" tabindex="14">
                                                    <span class="label_text">미인증</span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><span class="emp_red">일 최대 생산량</span></th>
                                            <td colspan="2"><input type="text" class="form_control" v-model="maxPrdtDay" :maxlength="20" tabindex="6"></td>
                                            <th><span class="emp_red">전년도 생산량</span></th>
                                            <td colspan="2"><input type="text" class="form_control" v-model="prdtLsYear" :maxlength="20" tabindex="15"></td>
                                        </tr>
                                        <tr>
                                            <th rowspan="3"><span class="emp_red">운반시설</span></th>
                                            <td class="pl20 pr20">형식</td>
                                            <td><input type="text" class="form_control" v-model="tsptType" :maxlength="20" tabindex="7"></td>
                                            <th rowspan="2"><span class="emp_red">폐 자제 재생설비</span></th>
                                            <td colspan="2">
                                                <label class="input_radio mr30">
                                                    <input type="radio" id="" name="" checked="checked" v-model="rgntEqpmYn" value="Y" tabindex="16">
                                                    <span class="label_text">구비</span>
                                                </label>
                                                <label class="input_radio">
                                                    <input type="radio" id="" name="" v-model="rgntEqpmYn" value="N" tabindex="17">
                                                    <span class="label_text">미구비</span>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="pl20 pr20">용량</td>
                                            <td><input type="text" class="form_control" v-model="tsptCpc" :maxlength="5" tabindex="8"></td>
                                            <td class="pl20 pr20">미구비 사유</td>
                                            <td><input type="text" class="form_control" v-model="rgntEqpmRsn" :maxlength="100" tabindex="18" :disabled="rgntEqpmYn == 'Y'"></td>
                                        </tr>
                                        <tr>
                                            <td class="pl20 pr20">대수</td>
                                            <td><input type="text" class="form_control" v-model="tsptAb" :maxlength="5" tabindex="9"></td>
                                            <th rowspan="5"><span class="emp_red">품질 시험 기술인</span></th>
                                            <td class="pl20 pr20">성명</td>
                                            <td><input type="text" class="form_control" v-model="qltyNm" :maxlength="20" tabindex="19"></td>
                                        </tr>
                                        <tr>
                                            <th rowspan="4"><span class="emp_red">중요시험설비 <br>비치 및 관리 상태</span></th>
                                            <td class="pl20 pr20">적정</td>
                                            <td>
                                                <label class="input_radio pop_notext">
                                                    <input type="radio" id="" name="" checked="checked" v-model="factMngStatus" value="Y" tabindex="10">
                                                    <span class="label_text"></span>
                                                </label>
                                            </td>
                                            <td class="pl20 pr20">자격 보유종목</td>
                                            <td><input type="text" class="form_control" v-model="qltyQlftList" :maxlength="100" tabindex="20"></td>
                                        </tr>
                                        <tr>
                                            <td class="pl20 pr20">부적정</td>
                                            <td>
                                                <label class="input_radio pop_notext">
                                                    <input type="radio" id="" name="" v-model="factMngStatus" value="N" tabindex="11">
                                                    <span class="label_text"></span>
                                                </label>
                                            </td>
                                            <td class="pl20 pr20">이수교육명</td>
                                            <td><input type="text" class="form_control" v-model="qltyTrnNm" :maxlength="100" tabindex="21"></td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2" class="pl20 pr20">부적정 사유</td>
                                            <td rowspan="2">
                                                <textarea name="" id="" class="form_control" v-model="factMngRsn" :maxlength="100" tabindex="12" :disabled="factMngStatus == 'Y'"></textarea>
                                            </td>
                                            <td class="pl20 pr20">교육기관</td>
                                            <td><input type="text" class="form_control" v-model="qltyEduNm" :maxlength="100" tabindex="22"></td>
                                        </tr>
                                        <tr>
                                            <td class="pl20 pr20">교육기간</td>
                                            <td><input type="text" class="form_control" v-model="qltyEduTerm" :maxlength="100" tabindex="23"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="data_tit">3. 점검자</div>
                            <div class="table_normal_list table_write align_center">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="*">
                                        <col width="*">
                                        <col width="*">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>(점검자) 발주청관계자</th>
                                            <th><span class="emp_red">(점검자) 공사 감독자</span></th>
                                            <th><span class="emp_red">(점검자) 시공자</span></th> 
                                            <th><span>(점검자) 공장 관계자</span></th> 
                                        </tr>
                                    </thead>
                                    <tbody v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                        <tr>
                                            <td style="white-space:pre-line;word-break:break-all;">
                                                {{ofcOdrStffNm}}
                                            </td>
                                            <td style="white-space:pre-line;word-break:break-all;">
                                                {{csrtDirtViewNm.toString()}}
                                            </td>
                                            <td style="white-space:pre-line;word-break:break-all;">
                                                {{csrtViewNm.toString()}}
                                            </td>
                                            <td style="white-space:pre-line;word-break:break-all;">
                                                {{ftryStffNm}}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="ofcOdrStffNm" :maxlength="20" tabindex="24"></td>
                                            <td>
                                                <div class="search_area">
                                                    <input type="text" class="form_control" placeholder="검색" v-model="csrtDirtViewNm" v-on:click="multiPartnerClick" readonly tabindex="25">
                                                    <button type="button" class="btn_search" v-on:click="multiPartnerClick">검색</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="search_area">
                                                    <input type="text" class="form_control" placeholder="검색" v-model="csrtViewNm" v-on:click="multiUserClick" readonly tabindex="26">
                                                    <button type="button" class="btn_search" v-on:click="multiUserClick">검색</button>
                                                </div>
                                            </td>
                                            <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="ftryStffNm" :maxlength="20" tabindex="27"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="tab_area"  v-show="currentTab == 2">
                        <div class="lst_data">
                            <div class="data_tit"><span class="emp_red">1. 종합 의견</span></div>
                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th><span class="emp_red">종합 의견</span></th>
                                            <td v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                                <div class="input_text">
                                                    {{totalOpn}}
                                                </div>
                                            </td>
                                            <td v-else>
                                                <div class="input_text">
                                                    <textarea name="" id="" class="form_control" style="height: 60px;" v-model="totalOpn"></textarea>
                                                    <div class="num"><strong class="count">{{totalOpn!=null?totalOpn.length:0}}</strong>/500</div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="data_tit"><span class="emp_red">2. 공장검사 Check List</span> </div>
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="checkSheetTable" class="ibsheet_table"></div>
                            </div>
                            <div class="table_normal_list table_write mt10">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody v-if="testStatus == 'APVL' || testStatus == 'APRV'">
                                        <tr>
                                            <th>체크리스트 종합 검토 의견</th>
                                            <td>
                                                <div class="input_text">
                                                    {{chkListOpn}}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>체크리스트 요청사항</th>
                                            <td>
                                                <div class="input_text">
                                                    {{chkReqOpn}}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <th>체크리스트 종합 검토 의견</th>
                                            <td>
                                                <div class="input_text">
                                                    <textarea name="" id="" class="form_control" style="height: 60px;" v-model="chkListOpn"></textarea>
                                                    <div class="num"><strong class="count">{{chkListOpn!=null?chkListOpn.length:0}}</strong>/500</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>체크리스트 요청사항</th>
                                            <td>
                                                <div class="input_text">
                                                    <textarea name="" id="" class="form_control" style="height: 60px;" v-model="chkReqOpn"></textarea>
                                                    <div class="num"><strong class="count">{{chkReqOpn!=null?chkReqOpn.length:0 }}</strong>/500</div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div v-if="testStatus == 'REGT' || testStatus == 'CHECK'">
                                <div class="data_tit">3. 첨부파일</div>
                                <LstFile v-bind:lst-file-rst="lstFileRst"
                                    v-bind:files="files"
                                    v-bind:second-remove-file-id="secondRemoveFileId"
                                    v-on:file-changed="fileChanged"
                                    v-on:file-removed="fileRemoved"
                                    :downloadable="checkUser(userId,'down')"
                                />
                                <div class="data_tit">4. 사진등록</div>  
                                <LstImg v-bind:lst-file-rst="lstImgRst"
                                    :files="img"
                                    :copied-file-ids="copiedFileIds"
                                    :copied-files="copiedFiles"
                                    @file-changed="imageChanged"
                                    @file-removed="imageRemoved" 
                                    @return-reset="resetCopyYn=false"
                                    :downloadable="checkUser(userId,'down')"
                                    :file-type="'ftryQltyPicturePop'"
                                    :reset-copy-yn="resetCopyYn"
                                />
                            </div>
                            <div v-else>
                                <div class="data_tit">3. 첨부파일</div>
                                <div class="lst_file">
                                    <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                                    <ul v-if="checkUser(userId,'down')">
                                        <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                                            <a href="javascript:void(0); " v-on:click="orgFileDown('file',index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                                            <a href="javascript:void(0); "><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="data_tit">4. 사진</div>
                                <div class="lst_img">
                                    <ul v-if="checkUser(userId,'down')">
                                        <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex">
                                            <div class="img_wrap" v-if="mngrImgRst.fileQltArcvId != null && mngrImgRst.fileQltArcvId != ''">
                                                <p class="img_area"><img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrImgRst.fileQltArcvId"></p>
                                            </div>
                                            <a href="javascript:void(0);" v-on:click="orgFileDown('img',mIndex)">
                                                <i class="ico_file" :class="fn_getFileIcons(mngrImgRst.orgFileName)">{{mngrImgRst.orgFileName}}</i>
                                            </a>
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex">
                                            <div class="img_wrap" v-if="mngrImgRst.fileQltArcvId != null && mngrImgRst.fileQltArcvId != ''">
                                                <p class="img_area"><img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrImgRst.fileQltArcvId"></p>
                                            </div>
                                            <a href="javascript:void(0);">
                                                <i class="ico_file" :class="fn_getFileIcons(mngrImgRst.orgFileName)">{{mngrImgRst.orgFileName}}</i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
                <!-- <Footer /> -->

                <!-- 사원 검색 팝업 -->
                <MultiEmployeeSearch :pop-idx="'2'" :ref-id="'FtryWrite_MultiEmployeeSearch'" v-on:fn-multi-employee-choice="fnMultiEmployeeChoice"
                    v-bind:insert-site-name="siteNm" v-bind:site-code="siteId" v-bind:member-list-id = "listId" v-bind:member-list-nm = "listNm"
                    :site-mstr-id="siteMstrId"/>
                <EmployeeSearch :pop-idx="'3'" v-on:fn-employee-choice="employeeChoice" :empl-pop-id="'FtryWrite_EmployeeSearch'"
                    v-bind:insert-site-name="siteNm" v-bind:site-code="siteId" :site-mstr-id="siteMstrId"/>

                <!-- 협력사 직원 검색 팝업 -->
                <MultiPartnerUserSearch :pop-idx="'1'" :ref-id="'FtryWrite_MultiPartnerUserSearch'"  v-bind:member-list-id = "listId" v-bind:member-list-nm = "listNm" :site-mstr-id="siteMstrId"
                    v-on:fn-multi-partner-choice="fnMultiPartnerChoice"/>

                <!-- <PopAlert
                    pop-id="factoryTestApprovalAlert"
                    :msg="popMsg"
                    :btn-name="{first : '확인', second : '취소'}"
                    confirm-use
                    @first-btn-fn="saveApprovalData"
                    @second-btn-fn="$bvModal.hide('factoryTestApprovalAlert')"
                />     -->
                <approve
                    ref-id="factoryWriteApproveModal"
                    doc-type="MTRL"
                    :code-type="approve.codeType"
                    :code-dtl-type="approve.codeDtlType"
                    :main-code-id="approve.mainCodeId"
                    :mid-code-id="approve.midCodeId"
                    :request-id="approve.requestId"
                    :doc-name="approve.docName"
                    :doc-seq="approve.docSeq"
                    :file-type="approve.fileType"
                    :site-mstr-id="approve.siteMstrId"
                    @callback="fn_setSourceApproval"
                    alertable
                />
                <approval-view
                    ref-id="FactoryTestResultWrite_AprvView"
                    :aprv-info-id="approvalViewId"
                />
            </div>
</template>

<script>
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import LstImg from '@/pages/common/popup/LstImg.vue'
    import DatePicker from '@component/common/DatePicker.vue'
    import loader from '@ibsheet/loader'
    import API from '@/apis/'
    import axios from 'axios'
    import MultiEmployeeSearch from '@/pages/common/popup/MultiEmployeeSearch.vue'
    import EmployeeSearch from '@/pages/common/popup/EmployeeSearch.vue'
    import MultiPartnerUserSearch from '@/pages/common/popup/MultiPartnerUserSearch.vue'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import { MaterialChecklist3 } from '../../common/data/MaterialsList'
    import { sendFileApi, requestFileOptions } from '../../../apis/common';
    import { sendPostApi, requestOptions } from '../../../apis/common';
    import Approve from '@modal/approval/Approve.vue'
    import ApprovalView from '@modal/approval/ApprovalView.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import commonUtilMixins from '@plugin/mixin/CommonUtil.js'
    import { commonFn } from '@/script/commonFn.js';
    
    let checkListId = '';

    export default {
        name: 'FactoryTestResultWrite',
        mixins: [MsgBoxMixins, authCheckMixns, commonUtilMixins],
        components: {
            LstFile,
            LstImg,
            DatePicker,
            MultiEmployeeSearch,
            EmployeeSearch,
            PopAlert,
            MultiPartnerUserSearch,
            Approve,
            ApprovalView,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0,                                                         // 기본 current 값 지정 
                removeTab: 1,
                tabs: ['갑지(레미콘/아스콘 外)', '갑지(레미콘/아스콘)', '을지(공통)'], // tab name
                siteMstrId : '',
            
                popMsg: '',                                                            // 알림창 메세지
                confirmUse: '',                                                        // 알림창 버튼개수
                popId: 'writeAlert',                                                   // 알림창 Id
                mtrlFtryTsSubId: '',                                                   // 공장검사 상세 Id
                siteNm: '',
                siteId: '',
                detailYn: false,                                                       // 상세값 가져오기 실패여부
                insertCheckYn: false,                                                  // 체크검사 유무
                updateYn: false,                                                       //  업데이트 성공 유무
                insertSignYn: false,
                chkLstSheet: null,
                chkListData: [],
                rmcYn: '',
                listId: [],
                listNm: [],
                inUser:'',                                                             // 등록자

                docSeq:'',                                                             // 문서번호
                addr:'',                                                               // 주소
                // mainCodeId: '',                                                        // 공종 Id
                // midCodeId: '',                                                         // 세부공종 Id
                midName: '',                                                           // 세부공종명
                detailObj: [],                                                         // 등록복사용
                newYn: false,                                                          // 등록확인용
                prdtNm: '',                                                            // 품명 
                prdt: '',                                                              // 품명id                     
                // mainCodeId: '',                                                        // 공종                  
                // midCodeId: '',                                                         // 세부공종
                midName: '',                                                           // 세부공종명
                testStatus: '',                                                        // 현황
                stnd: '',                                                              // 규격
                sppr: '',                                                              // 공급업체
                spprNm: '',                                                            // 공급업체명
                mnft: '',                                                              // 제조업체
                mnftNm: '',                                                            // 제조업체명
                startDate: '',                                                         // 검색필터-시작일
                endDate: '',                                                           // 검색필터-종료일
                ftryJdmt: '',                                                          // 결과
                mtrlMainYn: '',                                                        // 자재type
                ftryExDt:'',                                                           // 검사예정일
                ftryInspDt:'',                                                         // 검사실시일
                ftryEndtDt:'',                                                         // 검사완료일
                tstDtl:'',                                                             // 주요검사내용
                spct:'',                                                               // 특이사항
                ispt:'',                                                               // 점검자Id
                isptNm:'',                                                             // 점검자명
                ftryCeo:'',                                                            // 공장대표
                tsptTime:'',                                                           // 운반가능시간
                tsptKm:'',                                                             // 운반가능거리
                ksYn:'',                                                               // ks인증
                maxPrdtDay:'',                                                         // 일최대 생산량
                prdtLsYear:'',                                                         // 전년도 생산량
                tsptType:'',                                                           // 운반시설 형식
                tsptCpc:'',                                                            // 운반시설 용량
                tsptAb:'',                                                             // 운반시설 대수
                rgntEqpmYn:'',                                                         // 폐자재 재생설비 구비여부
                rgntEqpmRsn:'',                                                        // 미구비 사유
                factMngStatus:'',                                                      // 중요시험 설비 비치 및 관리상태 적정여부
                factMngRsn:'',                                                         // 부적정 사유
                qltyNm:'',                                                             // 품질시험 기술인-성명
                qltyQlftList:'',                                                       // 품질시험 기술인-자격보유목록
                qltyTrnNm:'',                                                          // 품질시험 기술인-이수교육명
                qltyEduNm:'',                                                          // 품질시험 기술인-교육기관
                qltyEduTerm:'',                                                        // 품질시험 기술인-교육기간
                ofcOdrStffNm:'',                                                       // 발주청 관계자
                csrtDirtNm:[],                                                         // 공사 감독자
                csrtDirtViewNm:[],
                csrtNm:[],                                                             // 시공자
                csrtViewNm:[],
                ftryStffNm:'',                                                         // 공장 관계자
                totalOpn:'',                                                           // 종합의견
                chkListOpn:'',                                                         // 체크리스트 종합 검토의견
                chkReqOpn:'',                                                          // 체크리스트 요청사항
                aprvOptnType:'',
                //파일 리스트및 삭제
                lstFileRst : [],
                lstImgRst : [],
                files : [],
                img : [],
                copiedFileIds : [],
                copiedFiles: [],
                resetCopyYn:[],
                secondRemoveImgId:[],                       //이미지용 삭제 Id
                totalCnt:0,
                totalSize:0,
                bytes:"KB",

                //파일 추가
                fileConnectId: 0,

                tempFileLst : [],                           //등록된 파일 데이터
                secondRemoveFileId:[],                      //등록된 파일 데이터 아이디
                tempFiles : [],                             //등록되지않은 파일 임시데이터
                approve: {
                    codeType: 'MTRL',
                    codeDtlType: 'TSFC',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: null,
                },
                saveYn : false,
                delYn : false,
                userId: '',
                approvalViewId:'',

                rmcCol:[
                    { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5 },
                    { Name: 'chkMtd', Header: [{ Value: '검사방법'}], RelWidth: 15, CanEdit:0, Type:'Lines',AcceptEnters:3, Align: 'Left', },
                    { Name: 'chkContent', Header: [{ Value: '검사 내용' }], RelWidth: 20, CanEdit:0, Type:'Lines',AcceptEnters:3, Align: 'Left', },
                    { Name: 'ftryChkSiteRslt', Header: [{ Value: '점검 결과' }],  RelWidth: 10,Size: 100, Required:1, },
                    { Name: 'msrs', Header: [{ Value: '조치 및 결과' }], RelWidth: 10,Size: 100 },
                ],
                etcCol:[
                    { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 3 }], RelWidth: 5 },
                    { Name: 'chkMtd', Header: [{ Value: '검사방법', RowSpan: 3 }], RelWidth: 15, CanEdit:0, Type:'Lines',AcceptEnters:3, Align: 'Left', },
                    { Name: 'chkContent', Header: [{ Value: '검사 내용', RowSpan: 3 }], RelWidth: 20, CanEdit:0, Type:'Lines',AcceptEnters:3, Align: 'Left', },
                    { Name: 'chkStd', Header: [{ Value: '검사 기준', RowSpan: 3 }], RelWidth: 15, CanEdit:0, Type:'Lines',AcceptEnters:3, Align: 'Left', },
                    { Name: 'pass', Header: [{ Value: '현장담당', Span: 3 }, { Value: '적합여부', Span: 3 }, { Value: '적합' }], Type: 'Radio', HRadio: 1, Radio:1, RelWidth: 5 },
                    { Name: 'unPass', Header: [{}, {}, { Value: '부적합' }], Type: 'Radio', HRadio: 1, Radio:1, RelWidth: 5 },
                    { Name: 'none', Header: [{}, {}, { Value: '해당없음' }], Type: 'Radio', HRadio: 1, Radio:1, RelWidth: 5 },
                    { Name: 'pass2', Header: [{ Value: '감리단', Span: 3 }, { Value: '적합여부', Span: 3 }, { Value: '적합' }], Type: 'Radio', HRadio: 1, Radio:2, RelWidth: 5 },
                    { Name: 'unPass2', Header: [{}, {}, { Value: '부적합' }], Type: 'Radio', HRadio: 1, Radio:2, RelWidth: 5 },
                    { Name: 'none2', Header: [{}, {}, { Value: '해당없음' }], Type: 'Radio', HRadio: 1, Radio:2, RelWidth: 5 },
                    { Name: 'msrs', Header: [{ Value: '조치 및 결과', RowSpan: 3 }], RelWidth: 15,Size: 100 },
                ]
            }
        },
        props: {
            mtrlSpApprId: {
                type: String,
                default: '',
            },
            mtrlFtryTsId: {
                type: String,
                default: '',
            },
            mySiteYn: {
                type: Boolean,
                default: false,
            },
            status: {
                type: String,
                default: '',
            },
            mainCodeId:{
                type: String,
                default : ''
            },
            midCodeId:{
                type: String,
                default : ''
            },
        },
        mounted() {
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.userId = this.$store.getters['auth/getUserId'];
            if(this.status != '' && this.status != null){
                this.testStatus = this.status;
            }
            if(this.rmcYn == 'Y'){
                this.currentTab = 1;
                this.removeTab = 0;
            }else{
                this.currentTab = 0;
                this.removeTab = 1;
            }
            if(this.mySiteYn){
                this.sheetLoad();
            }else{
                // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                // this.$router.go(-1);
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name: 'FactoryTestListSheet'});
                return;
            }
        },
        beforeDestroy() {
            // loader.removeSheet(checkListId)
        },
        watch:{
            rmcYn: function(){
                if(this.rmcYn == 'Y'){
                    this.currentTab = 1;
                    this.removeTab = 0;
                }else if(this.rmcYn =='N'){
                    this.currentTab = 0;
                    this.removeTab = 1;
                }else{
                    // this.popMsg = '오류로 인해 조회가 되지 않습니다.';
                    // this.confirmUse = false;
                    // this.detailYn = true;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('조회에 실패했습니다.',()=>{
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                        this.$router.push({name: 'FactoryTestListSheet'});
                    });
                    return;
                }
            },
            tstDtl:function(){
                if(this.tstDtl != null){
                    if(this.tstDtl.length>500){
                        this.tstDtl=this.tstDtl.slice(0,500);
                    }
                }
            },
            spct:function(){
                if(this.spct != null){
                    if(this.spct.length>500){
                        this.spct=this.spct.slice(0,500);
                    }
                }
            },
            totalOpn:function(){
                if(this.totalOpn != null){
                    if(this.totalOpn.length>500){
                        this.totalOpn=this.totalOpn.slice(0,500);
                    }
                }
            },
            chkListOpn:function(){
                if(this.chkListOpn != null){
                    if(this.chkListOpn.length>500){
                        this.chkListOpn=this.chkListOpn.slice(0,500);
                    }
                }
            },
            chkReqOpn:function(){
                if(this.chkReqOpn != null){
                    if(this.chkReqOpn.length>500){
                        this.chkReqOpn=this.chkReqOpn.slice(0,500);
                    }
                }
            },
            tsptTime: function(){
                if(this.tsptTime != null && this.tsptTime != ''){
                    this.tsptTime = this.tsptTime.toString();
                    if(this.tsptTime.length >1 && this.tsptTime.substring(0,1) == 0 ){
                        this.tsptTime = this.tsptTime.substring(1,this.tsptTime.length);
                    }
                    this.tsptTime =this.tsptTime.replace(/[^0-9]/g, '');
                    this.tsptTime = commonFn.methods.addCommas(this.tsptTime);
                }
            },
            tsptKm: function(){
                if(this.tsptKm != null && this.tsptKm != ''){
                    this.tsptKm = this.tsptKm.toString();
                    if(this.tsptKm.length >1 && this.tsptKm.substring(0,1) == 0 ){
                        this.tsptKm = this.tsptKm.substring(1,this.tsptKm.length);
                    }
                    this.tsptKm =this.tsptKm.replace(/[^0-9]/g, '');
                    this.tsptKm = commonFn.methods.addCommas(this.tsptKm);
                }
            },
            tsptAb:function(){
                if(this.tsptAb != null && this.tsptAb != ''){
                    this.tsptAb = this.tsptAb.toString();
                    if(this.tsptAb.length >1 && this.tsptAb.substring(0,1) == 0 ){
                        this.tsptAb = this.tsptAb.substring(1,this.tsptAb.length);
                    }
                    this.tsptAb =this.tsptAb.replace(/[^0-9]/g, '');
                    this.tsptAb = commonFn.methods.addCommas(this.tsptAb);
                }
            },
            tsptCpc:function(){
                if(this.tsptCpc != null && this.tsptCpc != ''){
                    this.tsptCpc = this.tsptCpc.toString();
                    if(this.tsptCpc.length >1 && this.tsptCpc.substring(0,1) == 0 && this.tsptCpc.substring(1,2) != '.'){
                        this.tsptCpc = this.tsptCpc.substring(1,this.tsptCpc.length);
                    }
                    this.tsptCpc =this.tsptCpc.replace(/[^0-9.]/g, '');
                    this.tsptCpc = commonFn.methods.addCommas(this.tsptCpc);
                }
            },
            rgntEqpmYn:function(){
                if(this.rgntEqpmYn == 'Y'){
                    this.rgntEqpmRsn = '';
                }
            },
            factMngStatus:function(){
                if(this.factMngStatus == 'Y'){
                    this.factMngRsn = '';
                }
            },
            maxPrdtDay:function(){
                if(this.maxPrdtDay != null && this.maxPrdtDay != ''){
                    this.maxPrdtDay = this.maxPrdtDay.replace(/[^0-9]/gi, '');
                    this.maxPrdtDay = this.maxPrdtDay.replace(/^0+/, '');
                    this.maxPrdtDay = commonFn.methods.addCommas(this.maxPrdtDay);
                }
            },
            prdtLsYear:function(){
                if(this.prdtLsYear != null && this.prdtLsYear != ''){
                    this.prdtLsYear = this.prdtLsYear.replace(/[^0-9]/gi, '');
                    this.prdtLsYear = this.prdtLsYear.replace(/^0+/, '');
                    this.prdtLsYear = commonFn.methods.addCommas(this.prdtLsYear);
                }
            },
        },
        methods: {
            sheetLoad: async function() {
                // //console.log(this.mySiteYn);
                // if(this.mySiteYn == '' || this.mySiteYn  == null ||typeof(this.mySiteYn) == 'undefined'){
                //     //console.log(this.mySiteYn);
                //     this.$router.push({name: 'FactoryTestList'});
                //     return;
                // }
                this.lstFileRst = []
                this.lstImgRst = []
                this.img = []
                this.copiedFileIds = [];
                this.copiedFiles = [];
                
                this.secondRemoveImgId = [];
                this.resetCopyYn = true;
                let param = {
                    'siteMstrId' : this.siteMstrId,
                    'mtrlSpApprId' : this.mtrlSpApprId,
                    'mtrlFtryTsId' : this.mtrlFtryTsId,
                };

                //console.log(param);
                try{
                    const result = await API.material.getFactoryTestView(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(result);
                    //console.log(result.data.data);

                    let data = [];
                    let options = MaterialChecklist3.options;
                    if(result.status === 200){
                        if(result.data.data.siteMstrId != null&&result.data.data.siteMstrId != ''){
                            let rst = result.data.data;
                            this.inUser = rst.inUser;
                            //갑지 레미콘/아스콘 외
                            this.aprvOptnType = rst.aprvOptnType;
                            this.siteNm = rst.siteNm;
                            this.siteId = rst.siteId;
                            this.addr = rst.addr;
                            this.sppr = rst.sppr;
                            this.spprNm = rst.spprNm;
                            this.mnft = rst.mnft;
                            this.rmcYn = rst.rmcYn;
                            this.testStatus = rst.testStatus;
                            this.tstDtl = rst.tstDtl;
                            this.spct = rst.spct;
                            this.ispt = rst.ispt==null?'':rst.ispt; 
                            this.isptNm = rst.isptNm==null?'':rst.isptNm;

                            //갑지 레미콘/아스콘
                            this.ftryCeo = rst.ftryCeo;
                            this.tsptTime = rst.tsptTime;
                            this.tsptKm = rst.tsptKm;
                            this.ksYn =(this.testStatus == 'REGT' && this.rmcYn == 'Y')?'Y': rst.ksYn;

                            this.maxPrdtDay = rst.maxPrdtDay;
                            this.prdtLsYear = rst.prdtLsYear;
                            this.tsptType = rst.tsptType;
                            this.tsptCpc = rst.tsptCpc;
                            this.tsptAb = rst.tsptAb;
                            this.rgntEqpmYn = (this.testStatus == 'REGT' && this.rmcYn == 'Y')?'Y':rst.rgntEqpmYn;
                            this.rgntEqpmRsn = rst.rgntEqpmRsn;
                            this.factMngStatus=(this.testStatus == 'REGT' && this.rmcYn == 'Y')?'Y':rst.factMngStatus;
                            this.factMngRsn=rst.factMngRsn;
                            this.qltyNm=rst.qltyNm;
                            this.qltyQlftList=rst.qltyQlftList;                                    
                            this.qltyTrnNm=rst.qltyTrnNm;                                      
                            this.qltyEduNm=rst.qltyEduNm;                                                   
                            this.qltyEduTerm=rst.qltyEduTerm;                                          
                            this.ofcOdrStffNm=rst.ofcOdrStffNm==null?'':rst.ofcOdrStffNm;
                            this.csrtDirtNm=rst.csrtDirtNm==null?[]:rst.csrtDirtNm.split(',');                                    
                            this.csrtDirtViewNm=rst.csrtDirtViewNm==null?[]:rst.csrtDirtViewNm.split(',');                                           
                            this.csrtNm=rst.csrtNm==null?[]:rst.csrtNm.split(',');                                                          
                            this.csrtViewNm=rst.csrtViewNm==null?[]:rst.csrtViewNm.split(',');
                            this.ftryStffNm=rst.ftryStffNm==null?'':rst.ftryStffNm;                                  

                            //console.log(this.csrtDirtViewNm);
                            //console.log(typeof(this.csrtDirtViewNm));
                            //console.log(this.csrtDirtNm);
                            //을지
                            this.totalOpn = rst.totalOpn;
                            this.chkListOpn = rst.chkListOpn;
                            this.chkReqOpn = rst.chkReqOpn;
                            this.docSeq = rst.docSeq;

                            this.approvalViewId = rst.aprvInfoId;

                            this.ftryInspDt = rst.ftryInspDt;
                            if(this.ftryInspDt == '' || this.ftryInspDt == null){
                                let today = new Date();
                                let year = today.getFullYear();
                                let month = today.getMonth() +1;
                                let date = today.getDate();
                                let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);
                                this.ftryInspDt = dateFormat;
                            }
                            //console.log(this.testStatus);
                            //console.log(this.ftryInspDt);

                            data = rst.checkListData;//체크리스트 데이터
                            if(data == null){
                                data = [];
                            }else{
                                if(data.length>0){
                                    for(let start = 0; start<data.length;start++){
                                        if(data[start]['ftryChkSiteRslt'] == 'PASS'){
                                            data[start]['pass'] = true;
                                        }else if(data[start]['ftryChkSiteRslt'] == 'UNPASS'){
                                            data[start]['unPass'] = true;
                                        }else{
                                            data[start]['none'] = true;
                                        }
                                        if(data[start]['ftryChkFtryRslt'] == 'PASS'){
                                            data[start]['pass2'] = true;
                                        }else if(data[start]['ftryChkFtryRslt'] == 'UNPASS'){
                                            data[start]['unPass2'] = true;
                                        }else{
                                            data[start]['none2'] = true;
                                        }
                                        if(this.testStatus == 'APRV' || this.testStatus == 'APVL'){
                                            data[start]['passCanEdit'] = 2;
                                            data[start]['unPassCanEdit'] = 2;
                                            data[start]['noneCanEdit'] = 2;
                                            data[start]['msrsCanEdit'] = 0;
                                            data[start]['pass2CanEdit'] = 2;
                                            data[start]['unPass2CanEdit'] = 2;
                                            data[start]['none2CanEdit'] = 2;
                                            data[start]['ftryChkSiteRsltCanEdit'] = 2;
                                        }
                                        
                                        // 처음으로 작성하는 경우
                                        if(rst.testStatus ==  'REGT' && this.rmcYn == 'Y'){
                                            data[start]['ftryChkSiteRslt'] = '';
                                        }
                                    }
                                }
                            }

                            //레미콘, 아스콘일 경우 아이비시트 컬럼 변경
                            options.Cols = this.rmcYn == 'Y'?this.rmcCol:this.etcCol;

                            loader.createSheet({//체크리스트 테이블
                                el: 'checkSheetTable',
                                data: data,
                                options: options,
                            }).then((sheet) =>{
                                // checkListId = sheet.id;
                                this.chkLstSheet = sheet;
                                this.$nextTick(() => {
                                    sheet.blur(0);
                                })
                            });

                            //첨부파일 가져오기
                            //console.log('파일');
                            let url = '/sendApi/api/file/upFileList';
                            let param = {
                                fileType : "MeterialMngt",
                                fileConnectId : this.mtrlFtryTsId,
                            };
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            const fileRst = await sendPostApi(url, param).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                // //console.log(e);
                                return e.response.data;
                            });
                            this.lstFileRst = fileRst.data;

                            //계산식
                            this.totalCnt = 0; //파일갯수
                            this.totalSize = '0 KB';

                            if(this.lstFileRst.length>0){
                                let inputFileSize = 0;
                                for(let i = 0; i< this.lstFileRst.length;i++){
                                    this.totalCnt++;
                                    inputFileSize += parseInt(this.lstFileRst[i].fileSize); //총파일크기
                                    this.lstFileRst[i].fileSize = this.formatBytes(parseInt(this.lstFileRst[i].fileSize), 2); //각각의 파일크기
                                }
                                if(inputFileSize > 0){
                                    this.totalSize = this.formatBytes(inputFileSize,2);
                                }
                            }
                            
                            //이미지 가져오기
                            param = {
                                fileType : "MeterialMngtImg",
                                fileConnectId : this.mtrlFtryTsId,
                            };
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            const imgRst = await sendPostApi(url, param).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                // //console.log(e);
                                return e.response.data;
                            });
                            //console.log(imgRst);
                            this.lstImgRst = imgRst.data;
                        }else{//데이터가 없을경우
                            // throw new Error('something went wrong');
                        }
                    }else{//에러난경우
                        throw new Error('something went wrong');
                    }
                }catch(error){
                    // this.popMsg = '오류로 인해 정보를 불러올 수 없습니다.';
                    // this.detailYn = true;
                    // this.confirmUse = false;
                    // //console.log(error);
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    console.log(error)
                    this.alert('조회에 실패했습니다.',()=>{
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                        this.$router.push({name: 'FactoryTestListSheet'});
                    });
                    return;
                }
                // if(this.testStatus == 'REGT' || this.testStatus == 'CHECK'){
                //     this.$refs.datapicker.valueChange(this.ftryInspDt);
                // }
            },
            beforeInsertCheck: function(){
                this.popMsg = '';
                this.insertCheckYn = false;
                if(this.ftryInspDt == '' || this.ftryInspDt == null){
                    this.currentTab = this.rmcYn == 'N'?0:1;
                    // this.popMsg = '검사 실시일을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('검사 실시일을 입력해주세요.');
                    return;
                }
                if(this.addr == '' || this.addr == null){
                    this.currentTab = this.rmcYn == 'N'?0:1;
                    // this.popMsg = '장소를 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('장소를 입력해주세요.');
                    return;
                }
                if(this.rmcYn == 'N'){//레미콘 아스콘 외
                    if(this.tstDtl == null || this.tstDtl == ''){
                        this.currentTab=0;
                        // this.popMsg = '주요 검사 내용을 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('주요 검사 내용을 입력해주세요.');
                        return;
                    }
                    // if(this.ispt == null || this.ispt == ''){
                    //     this.currentTab=0;
                    //     // this.popMsg = '점검자를 입력해주세요.';
                    //     // this.confirmUse = false;
                    //     // this.$root.$emit('bv::show::modal', 'writeAlert');
                    //     this.alert('점검자를 입력해주세요.');
                    //     return;
                    // }
                }else{//레미콘 아스콘
                    if(this.ftryCeo == null || this.ftryCeo == ''){
                        this.currentTab=1;
                        // this.popMsg = '공장대표를 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('공장대표를 입력해주세요.');
                        return;
                    }
                    if(this.tsptTime == null || this.tsptTime == ''){
                        this.currentTab=1;
                        // this.popMsg = '운반가능시간을 모두 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('운반가능시간을 모두 입력해주세요.');
                        return;
                    }
                    if(this.tsptKm == null || this.tsptKm == ''){
                        this.currentTab=1;
                        // this.popMsg = '운반가능시간을 모두 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('운반가능시간을 모두 입력해주세요.');
                        return;
                    }
                    if(this.maxPrdtDay == null || this.maxPrdtDay == ''){
                        this.currentTab=1;
                        // this.popMsg = '일 최대 생산량을 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('일 최대 생산량을 입력해주세요.');
                        return;
                    }
                    if(this.prdtLsYear == null || this.prdtLsYear == ''){
                        this.currentTab=1;
                        // this.popMsg = '전년도 생산량을 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('전년도 생산량을 입력해주세요.');
                        return;
                    }
                    if(this.tsptType == null || this.tsptType == ''){
                        this.currentTab=1;
                        // this.popMsg = '운반시설 형식을 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('운반시설 형식을 입력해주세요.');
                        return;
                    }
                    if(this.tsptCpc == null || this.tsptCpc == ''){
                        this.currentTab=1;
                        // this.popMsg = '운반시설 용량을 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('운반시설 용량을 입력해주세요.');
                        return;
                    }
                    if(this.tsptAb == null || this.tsptAb == ''){
                        this.currentTab=1;
                        // this.popMsg = '운반시설 대수를 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('운반시설 대수를 입력해주세요.');
                        return;
                    }
                    if(this.rgntEqpmYn == 'N' &&(this.rgntEqpmRsn == null || this.rgntEqpmRsn == '')){
                        this.currentTab=1;
                        // this.popMsg = '미구비 사유를 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('미구비 사유를 입력해주세요.');
                        return;
                    }
                    if(this.factMngStatus == 'N' &&(this.factMngRsn == null || this.factMngRsn == '')){
                        this.currentTab=1;
                        // this.popMsg = '부적정 사유를 입력해주세요.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'writeAlert');
                        this.alert('부적정 사유를 입력해주세요.');
                        return;
                    }
                    if(commonFn.methods.isEmpty(this.qltyNm)) {
                        this.currentTab=1;
                        this.alert('품질 시험 기술인 성명을 입력해주세요.');
                        return;
                    }
                    if(commonFn.methods.isEmpty(this.qltyQlftList)) {
                        this.currentTab=1;
                        this.alert('품질 시험 기술인 자격 보유종목을 입력해주세요.');
                        return;
                    }
                    if(commonFn.methods.isEmpty(this.qltyTrnNm)) {
                        this.currentTab=1;
                        this.alert('품질 시험 기술인 이수교육명을 입력해주세요.');
                        return;
                    }
                    if(commonFn.methods.isEmpty(this.qltyEduNm)) {
                        this.currentTab=1;
                        this.alert('품질 시험 기술인 교육기관을 입력해주세요.');
                        return;
                    }
                    if(commonFn.methods.isEmpty(this.qltyEduTerm)) {
                        this.currentTab=1;
                        this.alert('품질 시험 기술인 교육기간을 입력해주세요.');
                        return;
                    }
                    // if(this.ofcOdrStffNm == null || this.ofcOdrStffNm == ''){
                    //     this.popMsg = '발주청관계자를 입력해주세요.';
                    //     this.confirmUse = false;
                    //     this.$root.$emit('bv::show::modal', 'writeAlert');
                    //     return;
                    // }
                    // if(this.ftryStffNm == null || this.ftryStffNm == ''){
                    //     this.currentTab=1;
                    //     // this.popMsg = '공장 관계자를 입력해주세요.';
                    //     // this.confirmUse = false;
                    //     // this.$root.$emit('bv::show::modal', 'writeAlert');
                    //     this.alert('공장 관계자를 입력해주세요.');
                    //     return;
                    // }
                    
                }

                //을지
                if(this.csrtDirtNm == null || this.csrtDirtNm == ''){
                    this.currentTab=(this.rmcYn == 'Y'?1:0);
                    // this.popMsg = '공사 감독자를 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('공사 감독자를 입력해주세요.');
                    return;
                }
                if(this.csrtNm == null || this.csrtNm == ''){
                    this.currentTab=(this.rmcYn == 'Y'?1:0);
                    // this.popMsg = '시공자를 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('시공자를 입력해주세요.');
                    return;
                }
                if(this.totalOpn == null || this.totalOpn == ''){
                    this.currentTab=2;
                    // this.popMsg = '종합 의견을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('종합 의견을 입력해주세요.');
                    return;
                }
                const sheetRows = this.chkLstSheet.getDataRows();
                this.chkListData = [];
                for(let y = 0; y<sheetRows.length; y++){
                    let dtlLst = {};
                    //console.log(sheetRows[y]);
                    
                    //레미콘, 아스콘이 아닐경우 시공사, 감리단 적합여부
                    if(this.rmcYn == 'N'){
                        dtlLst['ftryChkSiteRslt'] = (sheetRows[y].pass?'PASS':(sheetRows[y].unPass?'UNPASS':'NONE'));
                        dtlLst['ftryChkFtryRslt'] = (sheetRows[y].pass2?'PASS':(sheetRows[y].unPass2?'UNPASS':'NONE'));
                    }else{
                    //레미콘, 아스콘일 경우 text
                        // console.log(sheetRows[y].ftryChkSiteRslt);
                        if(sheetRows[y].ftryChkSiteRslt == '' || sheetRows[y].ftryChkSiteRslt == null){
                            this.currentTab=2;
                            this.alert('점검 결과를 입력해주세요.');
                            return;
                        }
                        dtlLst['ftryChkSiteRslt'] = sheetRows[y].ftryChkSiteRslt;
                    }
                    
                    dtlLst['msrs'] = sheetRows[y].msrs;
                    dtlLst['ftryChkListId'] = sheetRows[y].ftryChkListId;
                    this.chkListData.push(dtlLst);
                }
                if(this.popMsg == ''){
                    this.confirm('저장하시겠습니까?',this.updateFtryTest);
                    // this.insertCheckYn = true;
                    //console.log(this.chkListData);
                    // this.updateFtryTest();
                    return;
                }
            },
            updateFtryTest : async function(){
                this.updateYn= false;
                this.saveYn = false;
                let updateData = {};
                //기본정보 및 을지
                updateData['mtrlFtryTsId']=this.mtrlFtryTsId;
                updateData['siteMstrId']=this.siteMstrId;
                updateData['ftryInspDt']=this.ftryInspDt;
                updateData['addr']=this.addr;
                updateData['totalOpn']=this.totalOpn;
                updateData['checkListData']=this.chkListData;
                updateData['chkListOpn']=this.chkListOpn;
                updateData['chkReqOpn']=this.chkReqOpn;
                updateData['testStatus']='CHECK';
                updateData['rmcYn']=this.rmcYn;
                updateData['csrtDirtNm']=this.csrtDirtNm.toString();
                updateData['csrtNm']=this.csrtNm.toString();
                updateData['ftryStffNm']=this.ftryStffNm;

                if(this.rmcYn == 'N'){//갑지(외)
                    updateData['tstDtl']=this.tstDtl;
                    updateData['ispt']=this.ispt;
                    updateData['spct']=this.spct;
                }else{//갑지(레미콘아스콘)
                    updateData['ftryCeo']=this.ftryCeo;
                    updateData['tsptTime']=this.tsptTime.replace(',','');
                    updateData['tsptKm']=this.tsptKm.replace(',','');
                    updateData['ksYn']=this.ksYn;
                    updateData['maxPrdtDay']=this.maxPrdtDay;
                    updateData['prdtLsYear']=this.prdtLsYear;
                    updateData['tsptType']=this.tsptType;
                    updateData['tsptCpc']=this.tsptCpc.replace(',','');
                    updateData['tsptAb']=this.tsptAb.replace(',','');
                    updateData['rgntEqpmYn']=this.rgntEqpmYn;
                    updateData['rgntEqpmRsn']=this.rgntEqpmRsn;
                    updateData['factMngStatus']=this.factMngStatus;
                    updateData['factMngRsn']=this.factMngRsn;
                    updateData['qltyNm']=this.qltyNm;
                    updateData['qltyQlftList']=this.qltyQlftList;
                    updateData['qltyTrnNm']=this.qltyTrnNm;
                    updateData['qltyEduNm']=this.qltyEduNm;
                    updateData['qltyEduTerm']=this.qltyEduTerm;
                    updateData['ofcOdrStffNm']=this.ofcOdrStffNm;
                }
                //console.log(updateData);
                try{
                    const change1 = await API.material.setFactoryTestChange(updateData,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    console.log(change1.data.data.rCode);
                    // if(change1.statusText =='OK'){
                    if(change1.data.data.rCode === '0000'){
                        //console.log('okm');
                        //파일 삭제
                        if(this.secondRemoveFileId.length >0){
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            let url = '/sendApi/api/file/fileUnUse';
                            let param = {
                                fileType : "MeterialMngt",
                                fileQltArcvIds : this.secondRemoveFileId
                            };
                            try{
                                const res_data = await sendPostApi(url, param).then((result) => {
                                this.lstFileRst = [];
                                return result.data;
                                }).catch((e) => {
                                    // //console.log(e);
                                    return e.response.data;
                                });
                                //console.log(res_data);
                            }catch(error){
                                // this.updateYn = true;
                                // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'writeAlert');
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }
                        //이미지 삭제
                        if(this.secondRemoveImgId.length >0){
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            let url = '/sendApi/api/file/fileUnUse';
                            let param = {
                                fileType : "MeterialMngtImg",
                                fileQltArcvIds : this.secondRemoveImgId
                            };
                            try{
                                const res_data = await sendPostApi(url, param).then((result) => {
                                this.lstFileRst = [];
                                return result.data;
                                }).catch((e) => {
                                    // //console.log(e);
                                    return e.response.data;
                                });
                                //console.log(res_data);
                            }catch(error){
                                // this.updateYn = true;
                                // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'writeAlert');
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }
                        //파일 저장
                        //console.log('삭제완료');
                        if(this.files != '' && typeof(this.files) != 'undefined'){
                            //console.log(this.files);
                            requestFileOptions.headers['Accept-Language'] = "ko";
                            requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            this.fileConnectId = this.mtrlFtryTsId;
                            try{
                                const res_data2 = await sendFileApi(this.fileConnectId, "MeterialMngt", this.files).then((result) => {
                                return result.data;
                                }).catch((e) => {
                                    //console.log(e.response.data);
                                    return e.response.data;
                                });
                                let fileRst = res_data2.data; //저장된 데이터개수 받아오기
                                if(fileRst == ''){
                                    // this.updateYn = true;
                                    // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                    // this.confirmUse = false;
                                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                                    this.alert('저장에 실패했습니다.');
                                    return;
                                }
                            }catch(error){
                                // this.updateYn = true;
                                // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'writeAlert');
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }
                        //이미지 저장
                        if((this.img != '' && typeof(this.img) != 'undefined')||(this.copiedFileIds && this.copiedFileIds.length>0)){
                            requestFileOptions.headers['Accept-Language'] = "ko";
                            requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            this.fileConnectId = this.mtrlFtryTsId;
                            try{
                                const res_data3 = await sendFileApi(this.fileConnectId, "MeterialMngtImg", this.img, null, this.copiedFileIds).then((result) => {
                                return result.data;
                                }).catch((e) => {
                                    //console.log(e.response.data);
                                    return e.response.data;
                                });
                                let fileRst2 = res_data3.data; //저장된 데이터개수 받아오기
                                if(fileRst2 == ''){
                                    // this.updateYn = true;
                                    // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                    // this.confirmUse = false;
                                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                                    this.alert('저장에 실패했습니다.');
                                    return;
                                }
                            }catch(error){
                                // this.updateYn = true;
                                // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                                // this.confirmUse = false;
                                // this.$root.$emit('bv::show::modal', 'writeAlert');
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }
                        if(!this.updateYn){
                            this.testStatus = 'CHECK';
                            // this.popMsg = '저장되었습니다.';
                            // this.confirmUse = false;
                            // this.saveYn = true;
                            this.alert('저장되었습니다.',this.sheetLoad);
                            this.files = [];
                            this.img = [];
                            this.chkListData = [];
                            // this.$root.$emit('bv::show::modal', 'writeAlert');
                            return;
                        }
                        // this.goList()
                    }
                }catch(error){
                    // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                    // this.updateYn = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('저장에 실패했습니다.');
                    return;
                }
            },
            insertSign :function(){
                this.popMsg = '';
                if(this.testStatus == 'REGT'){
                    // this.popMsg = '검사 결과가 입력되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('검사 결과가 입력되지 않았습니다.');
                    return;
                }
                if(this.testStatus == 'APRV'||this.testStatus == 'APVL'){
                    // this.popMsg = '결재중이거나 결재가 완료된 검사입니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    this.alert('결재중이거나 결재가 완료된 검사입니다.');
                    return;
                }
                //console.log(this.popMsg);
                if(this.popMsg == ''){
                    this.approve.mainCodeId     = this.mainCodeId;
                    this.approve.midCodeId      = this.midCodeId;
                    this.approve.docSeq         = this.docSeq;
                    this.approve.siteMstrId     = this.siteMstrId ? this.siteMstrId : null;

                    this.approve.requestId      = this.mtrlFtryTsId;
                    this.approve.fileType       = 'MeterialMngt';
                    // temporary
                    this.approve.docName        = '공장검사';
                    this.$bvModal.show('factoryWriteApproveModal');
                    // this.popMsg = '결재상신하시겠습니까?';
                    // this.signYn = true;
                    // this.confirmUse = true
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                }
            },
            saveApprovalData: function() {
                this.signFinal()
                this.$root.$emit('bv::hide::modal', 'factoryTestApprovalAlert');
            },
            fn_setSourceApproval: function (payload) {
                //console.log(payload)

                const url = '/sendApi/api/quality/materialSiteCheck/factoryTest/change';
                const _payload = {
                    ...payload,
                    mtrlFtryTsId: this.mtrlFtryTsId,
                    testStatus: 'APVL',
                    apprJdmt: 'PASS',
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(url, _payload, options)
                .then(res => {
                    //console.log(res)

                    this.alert('결재상신 되었습니다.',this.sheetLoad);
                    // this.popMsg = '결재상신 되었습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = true;
                    // this.signYn = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                })
                .catch(error => {
                    //console.error(error)
                    this.alert('결재상신에 실패했습니다.');
                    // this.popMsg = '오류로 인해 결재상신이 완료되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.insertSignYn = false;
                    // this.$root.$emit('bv::show::modal', 'writeAlert');
                    return;
                })
            },
            beforeDeleteCheck: function(){
                if(this.testStatus != 'APVL' && this.testStatus != 'APRV'){
                    this.detailYn = false;
                    this.confirm("삭제하시겠습니까?", async() =>{
                        let param = {
                            'mtrlFtryTsId':this.mtrlFtryTsId,
                        };
                        let delRst = await API.material.factoryTestUnuse(param);
                        //console.log(delRst);
                        if(delRst.data.data>0){
                            // this.popMsg = '삭제되었습니다.';
                            // this.confirmUse = false;
                            // this.detailYn = true;
                            // this.$root.$emit('bv::show::modal', 'writeAlert');
                            this.alert('삭제되었습니다.',()=>{
                                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                this.$router.push({name: 'FactoryTestListSheet'});
                            });
                            return;
                        }else{
                            this.alert('삭제에 실패했습니다.');
                        }
                    });
                }
            },
            multiPartnerClick :function(){ //공사 감독자
                this.listId = this.csrtDirtNm;
                this.listNm = this.csrtDirtViewNm;
                this.$root.$emit('bv::show::modal', 'FtryWrite_MultiPartnerUserSearch');
            },
            multiUserClick :function(){ //시공자
                this.listId = this.csrtNm;
                this.listNm = this.csrtViewNm;
                this.$root.$emit('bv::show::modal', 'FtryWrite_MultiEmployeeSearch');
            },
            employeeChoice : function(infoEmployee){ //점검자 가져오기
                //console.log(this.ispt);
                this.isptNm = infoEmployee.userNm;
                this.ispt = infoEmployee.userId.toString();
            },
            fnMultiEmployeeChoice : function(infoEmployee){ //시공자 가져오기
                //console.log(infoEmployee);
                this.csrtViewNm = infoEmployee.userNames;
                this.csrtNm = infoEmployee.userIds;
                //console.log(this.csrtNm);
            },
            fnMultiPartnerChoice : function(infoPartner){ //공사 감독자 가져오기
                //console.log(infoPartner);
                this.csrtDirtViewNm = infoPartner.userNames;
                this.csrtDirtNm = infoPartner.userIds;
                //console.log(this.csrtDirtNm);
                // this.memberIdList = infoPartner.memberIdList;
            },
            dateChange : async function(param) { //date-picker value change event
                this.ftryInspDt = param;
                //console.log(this.ftryInspDt);
            },
            fileChanged(payload) {
                this.files = payload
                //console.log("this.files");
                //console.log(this.files);
            },
            fileRemoved(id) {
                this.secondRemoveFileId = id
                //console.log("fileRemoved"+this.secondRemoveFileId);
            },
            imageChanged(payload){
                this.img = payload.file;
                this.copiedFileIds = payload.copyIds;  
                //console.log("this.img");
                //console.log(this.img);
            },
            imageRemoved(id) {
                this.secondRemoveImgId = id
                //console.log("fileRemoved"+this.secondRemoveImgId);
            },
            orgFileDown: function(type,index){//데이터 등록된 파일'
                let fileCode = '';
                let fileName = '';
                if(type == 'file'){
                    fileCode = this.lstFileRst[index].fileQltArcvId;
                    fileName = this.lstFileRst[index].orgFileName;
                }else if (type == 'img'){
                    fileCode = this.lstImgRst[index].fileQltArcvId;
                    fileName = this.lstImgRst[index].orgFileName;
                }
                
                // //console.log(fileCode);
                
                let element = document.createElement('a');
                element.setAttribute('href','/sendApi/api/fileCall/getMtMngtImgFile/'+fileCode);
                element.setAttribute('download',fileName);
                element.click();
                element.remove();
            },
            formatBytes(bytes, decimals = 0) {//바이트 계산
                if (bytes === 0) return '0 MB';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
            tabClick: function(idx){
                if(idx == 0 && this.rmcYn == 'N'){
                    this.currentTab = 0;
                }else if(idx == 1 && this.rmcYn == 'Y'){
                // }else if(idx == 1){
                    this.currentTab = 1;
                }else if(idx == 2){
                    this.currentTab = 2;
                }
            },
            closePop : function(){
                this.$root.$emit('bv::hide::modal', 'writeAlert');
                if(this.detailYn){
                    this.detailYn = false;
                    // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    // this.$router.go(-1);
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name: 'FactoryTestListSheet'});
                }
            },
            alertConfirmFn: function(){
                if(this.detailYn){
                    this.detailYn = false;
                    // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    // this.$router.go(-1);
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name: 'FactoryTestListSheet'});
                }
                if(this.signYn){
                    this.$root.$emit('bv::hide::modal', 'writeAlert');
                    this.signFinal();
                }
                if(!this.signYn && this.insertSignYn){
                    // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    // this.$router.go(-1);
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name: 'FactoryTestListSheet'});
                }else if((this.updateYn && this.insertSignYn) ||this.saveYn){
                    this.updateYn = false;
                    this.insertSignYn = false;
                    this.saveYn = false;
                    this.sheetLoad();
                }
                if(this.updateYn){
                    this.updateYn = false;
                }
                this.$root.$emit('bv::hide::modal', 'writeAlert');
            },
            goList : function(){
                // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                // this.$router.go(-1);
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name: 'FactoryTestListSheet'});
            },
            viewAprv: function(){
                this.$root.$emit('bv::show::modal', 'FactoryTestResultWrite_AprvView');
            }
        }
    }
</script>