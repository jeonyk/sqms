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
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="3%">
                            <col width="20%">
                            <col width="4%">
                            <col width="20%">
                            <col width="4%">
                            <col width="20%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>유형</th>   
                                <td>
                                    <select name="" id="" class="form_control" v-model="partnerSearch.tradeType" @keyup.enter="fn_partnersList()">
                                        <option value="">전체</option>
                                        <!-- <option value="Q">품질시험기관</option> -->
                                        <option value="B">BS점검</option>
                                        <option value="I">감리단</option>
                                        <option value="R">레미콘</option>
                                        <option value="C">시공/자재</option>
                                    </select>
                                </td>
                                <th>협력사명</th>
                                <td>
                                    <input type="text" class="form_control size_lg" placeholder="입력해주세요" v-model="partnerSearch.tradeNm" @keyup.enter="fn_partnersList()">
                                </td>
                                <th>협력사ID</th>
                                <td>
                                    <input type="text" class="form_control size_lg" placeholder="입력해주세요" v-model="partnerSearch.tradeId" @keyup.enter="fn_partnersList()" maxlength="10">
                                </td>
                                <td class="ar">
                                    <button type="button" class="btn_reset" @click="fn_clear('partnerSearch')" >초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_partnersList()">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="inner">
                    <div class="button_box">
                        <div class="fl">
                            <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(0)">엑셀 다운로드</button>
                        </div>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" v-b-modal.TradePartner>협력사 등록</button>
                            <!-- <button type="button" class="btn btn_sm btn_darkgray" v-b-modal.TradePartner>업체 삭제</button> -->
                        </div>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap" style="height: calc(100vh - 320px)">
                        <div id="ptnSheetTable" class="ibsheet_table" style="height:100%"></div>
                    </div>

                </div>   <!-- // inner -->
            </div>  <!-- // tab_area -->

            <div class="tab_area" v-show="currentTab == 1">
                <div class="lookup_box multi_line">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="5%">
                            <col width="20%">
                            <col width="3%">
                            <col width="20%">
                            <col width="4%">
                            <col width="20%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>협력사유형</th>   
                                <td>
                                    <select class="form_control" v-model="employeeSearch.tradeType">
                                        <option value="">전체</option>
                                        <!-- <option value="Q">품질시험기관</option> -->
                                        <option value="B">BS점검</option>
                                        <option value="I">감리단</option>
                                        <option value="R">레미콘</option>
                                        <option value="C">시공/자재</option>
                                    </select>
                                </td>
                                <th>사원명</th>
                                <td>
                                    <input type="text" class="form_control" placeholder="입력해주세요" v-model="employeeSearch.userNm" @keyup.enter="fn_partnerUserList()">
                                </td>
                                <th>협력사명</th>
                                <td>
                                    <input type="text" class="form_control" placeholder="입력해주세요" v-model="employeeSearch.tradeNm" @keyup.enter="fn_partnerUserList()">
                                </td>
                                <td class="ar">
                                    <button type="button" class="btn_reset" @click="fn_clear('employeeSearch')" >초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_partnerUserList()">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="inner">
                    <div class="button_box">
                        <div class="fl"> 
                            <!-- <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(1)">엑셀 다운로드</button> -->
                        </div>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_ptnEmployeePwChange()">비밀번호 초기화</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_ptnEmployeeChange('lockYn')">비밀번호 실패 초기화</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_ptnEmployeeChange('dormantYn')">휴면 해제</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_ptnEmployeeChange('disableY')">계정 활성화</button>
                            <button type="button" class="btn btn_sm btn_darkgray" @click="fn_ptnEmployeeChange('disableN')">계정 비활성화</button>
                            <div class="btn_number">
                                <select v-model="addRowsCount" class="form_control num">
                                    <option v-for="count in 10" :key="count" :value="count">
                                        {{ String(count) }}
                                    </option>    
                                </select>
                                <button type="button" class="btn btn_sm" @click="fn_clickAddRows()">행 추가 </button>
                            </div>
                            <button type="button" class="btn btn_sm btn_gray" @click="fn_clickDeleteRow()">행 삭제</button>
                            <button type="button" class="btn btn_sm btn_darkblue" @click="fn_ptnEmployeeSave()">저장</button>
                        </div>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" style="height: calc(100vh - 320px)">
                        <div id="ptnEmployeeSheetTable" class="ibsheet_table" style="height:100%"></div>
                    </div>
                </div><!--  inner    -->
     
            </div>  <!-- // tab_area -->

            <div class="tab_area" v-show="currentTab == 2">
                <div class="lookup_box multi_line">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="4%">
                            <col width="25%">
                            <col width="6%">
                            <col width="25%">
                            <col width="*%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>프로젝트</th>   
                                <td>
                                    <select class="form_control size_sm mr10" v-model="projectSearch.mngtType">
                                        <option value="" selected>전체</option>
                                        <option value="0">관리</option>
                                        <option value="1">비관리</option>
                                        <option value="2" >준공</option>
                                    </select>
                                    <input type="text" v-model="projectSearch.projectNm" class="form_control size_lg" placeholder="입력해주세요" @keyup.enter="fn_projectList()">
                                </td>
                                <th>프로젝트 코드</th>
                                <td>
                                    <input type="text" v-model="projectSearch.projectId" class="form_control size_lg" placeholder="입력해주세요" @keyup.enter="fn_projectList()">
                                </td>
                                <td class="ar">
                                    <button type="button" class="btn_reset" @click="fn_clear('projectSearch')">초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_projectList()">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="inner">
                    <div class="table_data">
                        <div class="move_box w50">
                            <div class="move_box_inner">
                                <div class="data_tit">프로젝트</div>
                                <!-- ibsheet -->
                                <div class="ib_wrap" style="height: calc(100vh - 320px)">
                                    <div id="projectMapSheetTable" class="ibsheet_table" style="height:100%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="move_box w50">
                            <div class="move_box_inner">
                                <div class="data_tit">
                                    프로젝트 매핑 협력사 직원
                                    <!-- <span class="total">총 <b>20</b>개의 프로젝트</span> -->
                                    <div class="fr"> 
                                        <button type="button" class="btn btn_sm btn_darkgray" @click="fn_partnerUserProjectWrite">등록</button>
                                        <button type="button" class="btn btn_sm btn_gray" @click="fn_partnerUserProjectDelete">삭제</button>
                                    </div>
                                </div>
                                <!-- ibsheet -->
                                <div class="ib_wrap" style="height: calc(100vh - 320px)">
                                    <div id="projectPtnSheetTable" class="ibsheet_table"  style="height:100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
            
    
    <Footer />

    <!-- 협력사등록 팝업 -->
    <b-modal 
        id="TradePartner"
        title="협력사 등록" 
        size="lg" 
        hide-backdrop 
        :footer-bg-variant="footerBg"
        no-close-on-backdrop
        no-close-on-esc
        static
    >
      <template #default>
         <div class="pop_container">
            <div class="table_normal_list table_write">
               <table>
                  <caption class="sr_only">권한그룹추가</caption>
                  <colgroup> 
                        <col width="125">
                        <col width="*">
                        <col width="125">
                        <col width="*">
                  </colgroup>
                  <tbody>  
                        <tr>
                           <th><span class="emp_red">협력사 유형</span></th>   
                           <td>
                              <select class="form_control" v-model="partnerReg.tradeType">
                                <option value>유형을 선택하세요</option>
                                <!-- <option value="Q">품질시험기관</option> -->
                                <option value="B">BS점검</option>
                                <option value="I">감리단</option>
                                <option value="R">레미콘</option>
                                <option value="C">시공/자재</option>
                              </select>
                           </td>
                           <th>
                                <span class="emp_red">협력사ID</span>
                                <p>(사업자 번호)</p>
                            </th>   
                           <td>
                              <input type="text" class="form_control" placeholder="사업자번호 입력" v-model="partnerReg.tradeId" maxlength="10">
                           </td>
                        </tr>   
                        <tr>
                            <th><span class="emp_red">협력사명</span></th>   
                           <td colspan="3">
                              <input type="text" class="form_control" placeholder="입력해주세요" v-model="partnerReg.tradeNm">
                           </td>
                        </tr>  
                        <tr>
                            <th>등록일</th>   
                            <td colspan="3">{{partnerReg.regDate}}</td>
                        </tr>  
                  </tbody>
               </table>
            </div>
         </div>
      </template>
      <template #modal-footer="{ hide }">
         <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_partnersWrite()">등록</b-button>
         <b-button class="btn btn_md btn_outline btn_gray" @click="hide(fn_clear('partnerReg'))">취소</b-button>
      </template>
    </b-modal>
    <!-- 협력사 정보 보기 / 수정 팝업 -->
    <b-modal 
        id="TradePartnerInfo"
        title="협력사 정보 보기" 
        size="lg" 
        hide-backdrop 
        :footer-bg-variant="footerBg"
        no-close-on-backdrop
        no-close-on-esc
        static
    >
      <template #default>
         <div class="pop_container">
            <div class="table_normal_list table_write">
               <table v-if="!editYn">
                  <caption class="sr_only">협력사 정보 보기</caption>
                  <colgroup> 
                        <col width="125">
                        <col width="*">
                        <col width="125">
                        <col width="*">
                  </colgroup>
                  <tbody>  
                        <tr>
                           <th><span>협력사 유형</span></th>   
                           <td>{{ partnerInfo.tradeTypeNm }}</td>
                           <th>
                                <span>협력사ID</span>
                                <p>(사업자 번호)</p>
                            </th>   
                           <td>{{ partnerInfo.tradeId }}</td>
                        </tr>   
                        <tr>
                            <th><span>협력사명</span></th>   
                           <td colspan="3">{{ partnerInfo.tradeNm }}</td>
                        </tr>  
                        <tr>
                            <th>등록일</th>   
                            <td colspan="3">{{ partnerInfo.regDate }}</td>
                        </tr>  
                  </tbody>
               </table>
               <table v-else>
                  <caption class="sr_only">협력사 정보 수정</caption>
                  <colgroup> 
                        <col width="125">
                        <col width="*">
                        <col width="125">
                        <col width="*">
                  </colgroup>
                  <tbody>  
                        <tr>
                           <th><span class="emp_red">협력사 유형</span></th>   
                           <td>{{ partnerInfo.tradeTypeNm }}</td>
                           <th>
                                <span class="emp_red">협력사ID</span>
                                <p>(사업자 번호)</p>
                            </th>   
                           <td>{{ partnerInfo.tradeId }}</td>
                        </tr>  
                        <tr>
                            <th><span class="emp_red">협력사명</span></th>   
                           <td colspan="3"><input type="text" class="form_control" v-model="partnerUpdate.tradeNm"></td>
                        </tr>  
                        <tr>
                            <th>등록일</th>   
                            <td colspan="3">{{ partnerUpdate.regDate }}</td>
                        </tr>  
                  </tbody>
               </table>
            </div>
         </div>
      </template>
      <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide } -->
         <template v-if="!editYn">
            <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_partnersDelete()" v-if="partnerInfo.createSys == 'SQMS'">삭제</b-button> -->
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_PartnerUpdateModal()" v-if="partnerInfo.createSys == 'SQMS'">수정</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide(fn_clear('partnerInfo'))">닫기</b-button>
         </template>
         <template v-else>
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_partnersUpdate()" v-if="partnerInfo.createSys == 'SQMS'">저장</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="(editYn=false, fn_clear('partnerUpdate'))">취소</b-button>
         </template>
      </template>
    </b-modal>
    
    <!-- 프로젝트 설정 팝업 -->
    <MultiProjectSelect @fnProjectChoice="fn_projectChoice" :selectInfo="this.selectSiteMstrIds ? this.selectSiteMstrIds : []" ref="multiProjectSelect"/>
    <!-- <MultiEmployeeSearch ref="MultiEmployeeSearch" @employeeInfo="fn_setCsrt"  :employeeInfo="this.factoryDetail.csrtNm ? this.factoryDetail.csrtNm.split(',') : []" title="시공자 선택" /> -->
    <!--  권한그룹 설정  팝업 -->
    <UserGroup @fnAuthGroupChoice="fn_authGroupChoice"/>
    <!-- 협력사 직원 추가 팝업 -->
    <AdmPartnerUserSearch @fnPartnerChoice="fn_partnerChoice"/>
    <!-- 협력사 직원 프로젝트 추가 팝업 -->
    <TradeEmployeeSearch ref="TradeEmployeeSearch" refId="TradeEmployeeSearch" :maxlength="9999" :headerCheck="1" :sqmsPartner="true" :emitCloseYn="false" :siteMstrId="projectSearch.siteMstrId" @fn-multi-partner-choice="fn_partnerProjectChoice" btnNm="등록"/>

    </div>
</template>


<script>
    import loader from '@ibsheet/loader';
    import {Partners, PartnersEmployee, ProjectPartners, ProjectMapping} from '@/pages/common/data/TradeMngtList'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
    import  UserGroup from '@/pages/common/popup/UserGroup.vue'                        /* 권한그룹 팝업 */
    import  MultiProjectSelect from '@/pages/common/popup/MultiProjectSelect.vue'      /* 프로젝트 추가 팝업 */
    import  AdmPartnerUserSearch from '@/pages/common/popup/AdmPartnerUserSearch.vue'  /* 협력사 직원 추가 팝업 */
    import  TradeEmployeeSearch from '@/pages/common/popup/MultiPartnerUserSearch.vue' /* 협력사 직원 추가 팝업 */
    import { sendPostApi, requestOptions } from '@/apis/common'
    import { commonFn } from '@/script/commonFn.js';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

    // let NoticeSheet = null;

    export default {
        name: 'TradeMngtTab',
        components: {
            UserGroup,
            MultiProjectSelect,
            AdmPartnerUserSearch,
            TradeEmployeeSearch,
            Breadcrumb
        },
        mixins : [MsgBoxMixins],
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0,                                    // tab num
                tabs: ['협력사', '협력사 직원', '프로젝트 매핑'],   // tab name
                employeeList: [],            // 협력사 직원 리스트
                
                /* 시트 */
                ptnSheet : null,             // 협력사
                ptnEmployeeSheet : null,     // 협력사 직원 
                projectPtnSheet : null,      // 프로젝트 매핑 - 협력사
                projectMapSheet : null,      // 프로젝트 매핑 - 매핑 프로젝트
                
               
                /* Tab - 협력사 */
                editYn : false,              // 협력사 편집여부(등록 / 수정)

                partnerSearch : {         // 협력사 검색
                    tradeType : '',          // 협력사 유형
                    tradeNm : '',            // 협력사명
                    tradeId : '',            // 협력사 ID
                },

                partnerInfo : {           // 협력사 정보
                    tradeType : '',          // 협력사 유형
                    tradeId : '',            // 협력사 ID
                    tradeNm : '',            // 협력사명
                    regDate : '',            // 등록일
                    createSys : '',          // 등록시스템
                },

                partnerReg : {            // 협력사 등록
                    tradeType : '',          // 협력사 유형
                    tradeId : '',            // 협력사 ID
                    tradeNm : '',            // 협력사명
                    regDate : this.$moment().format('YYYY-MM-DD'),      // 등록일
                },


                partnerUpdate : {         // 협력사 수정
                    tradeNm : '',            // 협력사명
                    regDate : this.$moment().format('YYYY-MM-DD'),      // 등록일
                },
                
                
                /* Tab - 협력사 직원 */
                addRowsCount : 1,            // 행추가 Num
                selectRow : {},              // 선택한 행 (프로젝트 / 권한 변경시)
                selectSiteMstrIds : '',      // 선택한 행 프로젝트 ids
                deleteIds : [],              //  행 삭제 ids

                employeeSearch : {        // 협력사 직원 검색 
                    tradeType : '',          // 협력사 유형
                    userNm : '',             // 사원명
                    tradeNm : '',            // 협력사명
                },

                /* Tab - 프로젝트 매핑  */
                projectSearch : {         // 프로젝트 검색
                    siteMstrId : '',         // 현장 id
                    mngtType : '0',           // 프로젝트 유형
                    projectNm : '',          // 프로젝트명
                    projectId : '',        // 프로젝트 코드
                },

                
            }
        },

        mounted() {
            /* 시트 생성 */
            this.createSheetLst()
        },

        beforeDestroy() {
            /* 시트 삭제 */
            if (this.ptnSheet)  loader.removeSheet(this.ptnSheet)
            if (this.ptnEmployeeSheet) loader.removeSheet(this.ptnEmployeeSheet)
            if (this.projectPtnSheet) loader.removeSheet(this.projectPtnSheet)
            if (this.projectMapSheet) loader.removeSheet(this.projectMapSheet)
        },
        
        watch : {
            'partnerReg.tradeId' : function(){  // 협력사 등록 - 사업자번호 형식 변환
                if(this.partnerReg.tradeId != '' || this.partnerReg.tradeId != null){
                    this.partnerReg.tradeId = this.partnerReg.tradeId.toString().replace(/[^0-9]/g, '')
                    
                    if(this.partnerReg.tradeId.length == 10){
                        this.partnerReg.tradeId = this.partnerReg.tradeId.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
                    }
                }
            },

            'partnerSearch.tradeId': function(){  // 협력사 검색 - 사업자번호 형식 변환
                if(this.partnerSearch.tradeId != '' || this.partnerSearch.tradeId != null){
                    this.partnerSearch.tradeId = this.partnerSearch.tradeId.toString().replace(/[^0-9]/g, '')
                    
                    if(this.partnerSearch.tradeId.length == 10){
                        this.partnerSearch.tradeId = this.partnerSearch.tradeId.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
                    }
                }
            },

            "currentTab": {    // 탭 변경시 리스트 리로드
                handler () {
                    switch(this.currentTab) {
                        case 0:
                            this.fn_clear('partnerSearch')   // 협력사 검색 초기화
                            this.fn_partnersList()           // 1번 Tab - 협력사
                            break ; 
                        case 1:
                            this.fn_clear('employeeSearch')  // 협력사 직원 검색 초기화
                            this.fn_partnerUserList()        // 2번 Tab - 협력사 직원
                            break ; 
                        case 2:
                            this.projectSearch.mngtType = 0   // 관리

                            this.projectPtnSheet.loadSearchData({
                                data: [],  // projectPtnSheet 데이터 초기화
                            })
                            this.fn_clear('projectSearch')   // 프로젝트 검색
                            this.fn_projectList()            // 3번 Tab - 협력사 프로젝트 매핑
                            break ; 
                    }
                }
            }
        },

        methods: {
            /* 초기화 버튼 */
            fn_clear(type){    

                /* 검색어 (협력사) */
                if(type == 'partnerSearch'){
                    this.partnerSearch = {              
                        tradeType : '',    // 협력사 유형
                        tradeNm : '',      // 협력사명
                        tradeId : '',      // 협력사 ID
                    }
                }

                /* 검색어 (협력사 직원) */
                if(type == 'employeeSearch'){
                    this.employeeSearch = {              
                        tradeType : '',    // 협력사 유형
                        userNm : '',       // 사원명
                        tradeNm : '',      // 협력사명
                    }
                }

                /* 협력사 정보 */
                if(type == 'partnerInfo'){
                    this.partnerInfo = {              
                        tradeType : '',    // 협력사 유형
                        tradeId : '',      // 협력사 ID
                        tradeNm : '',      // 협력사명
                        regDate : '',      // 등록일
                        createSys : '',    // 등록시스템
                    }
                }
                
                /* 협력사 등록 */
                if(type == 'partnerInfo'){
                    this.partnerReg = {              
                        tradeType : '',                                 // 협력사 유형
                        tradeId : '',                                   // 협력사 ID
                        tradeNm : '',                                   // 협력사명
                        regDate : this.$moment().format('YYYY-MM-DD'),  // 등록일
                    }
                }
                
                /* 협력사 수정 */
                if(type == 'partnerInfo'){
                    this.partnerUpdate = {              
                        tradeNm : '',                                   // 협력사명
                        regDate : this.$moment().format('YYYY-MM-DD'),  // 등록일
                    }
                }

                 /* 프로젝트 매핑 검색 */
                if(type == 'projectSearch'){
                    this.projectSearch = {
                        siteMstrId : '',    // 현장 id
                        mngtType : '0',      // 프로젝트 유형
                        projectNm : '',     // 프로젝트명
                        projectId : '',   // 프로젝트 코드
                    }
                }
                
            },

            /* 행 추가 */
            fn_clickAddRows(){
                this.ptnEmployeeSheet.addRows({                // 행추가
                    count: this.addRowsCount,                  // 추가 행 개수
                    next: this.ptnEmployeeSheet.getFirstRow()  // 추가 행 위치
                })

                this.ptnEmployeeSheet.blur()
                this.ptnEmployeeSheet.focus(this.ptnEmployeeSheet.getFirstRow())
            },
            
            /* 행 삭제 */
            fn_clickDeleteRow(){
                // changed 기록엔 남아있음
                const checkedRows = this.ptnEmployeeSheet.getRowsByChecked('isChecked')

                this.ptnEmployeeSheet.deleteRows(checkedRows)
                checkedRows.forEach(item => {
                    let idx = this.employeeList.indexOf(item.tradeId+'_'+item.userNm)

                    if(idx > -1){
                        this.employeeList.splice(idx, 1)
                    }

                    if(item.Added == 1){
                        this.ptnEmployeeSheet.removeRow(item)
                    }else{
                        this.deleteIds.push(item.userId)
                        this.ptnEmployeeSheet.removeRow(item)
                    }
                })
            },

            /* 시트생성 */
            createSheetLst(){      
                
                /* 협력사 시트 */
                loader.createSheet({
                    el: 'ptnSheetTable',
                    data: [],
                    options: {
                        Cols : Partners.options.Cols,
                        Cfg: {
                            NoVScroll: 0,
                            NoDataMessage:3,
                        },
                        Events: {
                            onAfterClick : this.fn_ptnDbClick,
                            onRenderFirstFinish: () => {
                                this.fn_partnersList() // 협력사 리스트 조회
                            },
                        }
                    }
                }).then((sheet) => {
                    this.ptnSheet = sheet
                });

                /* 협력사 직원 시트 */
                loader.createSheet({
                    el: 'ptnEmployeeSheetTable',
                    data: [],
                    options: {
                        Cols : PartnersEmployee.options.Cols,
                        Cfg: {
                            NoVScroll: 0,
                            NoDataMessage:3,
                        },
                        Events: {
                            onAfterClick : this.fn_ptnEmployeeClick,
                            onAfterChange : this.fn_ptnEmployeeChg,
                            onDblClick : this.fn_ptnEmployeeDbClick,
                            onRenderFirstFinish: () => {
                                this.fn_partnerUserList('create') // 협력사 직원 리스트 조회
                            },
                        }
                    }
                }).then((sheet) => {
                    this.ptnEmployeeSheet = sheet
                });
                
                /* 프로젝트 매핑 - 프로젝트 시트 */
                loader.createSheet({
                    el: 'projectMapSheetTable',
                    data: [],
                    options: {
                        Cols : ProjectMapping.options.Cols,
                        Cfg: {
                            NoVScroll: 0,
                            NoDataMessage:3,
                        },
                        Events: {
                            onAfterClick : this.fn_projectClick,
                            // onDblClick : this.fn_projectDbClick,
                            onRenderFirstFinish: () => {
                                this.fn_projectList() // 프로젝트 리스트 조회
                            },
                        }
                    }
                }).then((sheet) => {
                    this.projectMapSheet = sheet
                });

                /* 프로젝트 매핑 - 협력사 직원 시트 */
                loader.createSheet({
                    el: 'projectPtnSheetTable',
                    data: [],
                    options: {
                        Cols : ProjectPartners.options.Cols,
                        Cfg: {
                            NoVScroll: 0,
                            NoDataMessage:3,
                        },
                        Events: {
                            onAfterClick : this.fn_projectPtnClick,
                            // onDblClick : this.fn_projectDbClick,
                        }
                    }
                }).then((sheet) => {
                    this.projectPtnSheet = sheet
                });
            },
            
            /* 협력사 리스트 조회 */
            async fn_partnersList(){  
                let url = '/sendApi/api/popup/partnerCompanySearch/list'
                let param = {        // 검색값 
                    tradeType : this.partnerSearch.tradeType,                              // 유형
                    searchValue : this.partnerSearch.tradeNm,                              // 협력사명
                    tradeId : (this.partnerSearch.tradeId).toString().replaceAll('-',''),  // 협력사ID (사업자 번호)
                }

                await sendPostApi(url, param).then(async result => {
                    if(typeof result.data.datas.resultList != 'undefined'){ 
                        let ptnList = result.data.datas.resultList

                        await ptnList.forEach(row =>{
                            row.tradeId = (row.tradeId).toString().replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')  // 사업자 번호 형식 변환
                        }) 
                        
                        this.ptnSheet.loadSearchData({
                            data: result.data.datas.resultList,  // ptnSheet 데이터 세팅
                        })
                    }
                    // return result.data;
                }).catch((e) => {
                    return this.alert('조회에 실패했습니다.');
                });
            },

            /* 협력사 등록 버튼 */
            async fn_partnersWrite(){ 
                if(commonFn.methods.isEmpty(this.partnerReg.tradeType)){  
                    this.alert('협력사 유형을 선택해주세요.');
                    return;
                }

                let tradeId = (this.partnerReg.tradeId).toString().replaceAll('-','')
                
                if(commonFn.methods.isEmpty(this.partnerReg.tradeId) || (tradeId.length < 10)){  
                    this.alert('협력사 ID(사업자 번호)를 입력해주세요.');
                    return;
                }

                if(commonFn.methods.isEmpty(this.partnerReg.tradeNm)){  
                    this.alert('협력사명을 입력해주세요.');
                    return;
                }

                this.confirm('등록하시겠습니까?', async () =>  {
                    try {
                        /* 사업자번호 조회(중복체크) */
                        let url = '/sendApi/api/popup/partnerCompanySearch/list'
                        let param = {
                            tradeId : (this.partnerReg.tradeId).toString().replaceAll('-',''),  // 협력사ID (사업자 번호)
                        }

                        await sendPostApi(url, param).then(async searchRst => {
                            if(typeof searchRst.data.datas.resultList != 'undefined'){ 
                                
                                if((searchRst.data.datas.resultList).length > 0){
                                    return this.alert('이미 등록된 사업자 번호입니다.');
                                }else{
                                    /* 등록 */
                                    url = '/sendApi/api/adminPtnr/trade/write' 
                                    param = {
                                        ...this.partnerReg,
                                        tradeId : tradeId,                  
                                    }

                                    await sendPostApi(url, param).then(async writeRst => {
                                        if(writeRst.status == '200'){
                                            return this.alert('등록되었습니다.',async() => {
                                                this.$root.$emit('bv::hide::modal', 'TradePartner');
                                                this.fn_partnersList()
                                            });
                                        }else{
                                            return this.alert('등록에 실패했습니다.');
                                        }
                                    }).catch((e) => {
                                        return this.alert('등록에 실패했습니다.');
                                    });  
                                } // tradeWrite
                            }
                        })  // partnerCompanySearch
                    } catch (error) {
                        return this.alert('등록에 실패했습니다.');
                    }
                })
            },

            /* 협력사 DbClick 이벤트 */
            fn_ptnDbClick(evt){     
                    if(evt.col != 'isChecked'){     // 체크가 아닌 col 선택시 협력사 정보 open
                        let tradeType = '' 

                        /* 협력사 분류 */
                        switch (evt.row.tradeType) {
                            case 'Q':
                                tradeType = '품질시험기관'
                                break;
                            case 'B':
                                tradeType = 'BS점검업체'
                                break;
                            case 'I':
                                tradeType = '감리단'
                                break;
                            case 'R':
                                tradeType = '레미콘'
                                break;
                            case 'C':
                                tradeType = '시공/자재'
                                break;
                        }

                        /* 협력사 정보 */
                        this.partnerInfo = {              
                            tradeType : evt.row.tradeType,  // 협력사 유형
                            tradeTypeNm : tradeType,        // 협력사 유형
                            tradeId : evt.row.tradeId,      // 협력사 ID (사업자번호 형식)
                            tradeNm : evt.row.tradeNm,      // 협력사명
                            regDate : evt.row.regDate,      // 등록일
                            createSys : evt.row.createSys,  // 등록시스템
                        }

                        this.$root.$emit('bv::show::modal', 'TradePartnerInfo')  // 협력사 정보 modal show
                    }
            },

            /* 협력사 정보 수정 modal */
            fn_PartnerUpdateModal(){
                this.partnerUpdate = {
                    ...this.partnerInfo,
                    tradeId : (this.partnerInfo.tradeId).toString().replaceAll('-',''),  // 협력사 ID
                    regDate : this.$moment().format('YYYY-MM-DD'),                       // 등록일
                }
                
                this.editYn = true
            },

            /* 협력사 수정 버튼 */
            async fn_partnersUpdate(){ 

                if(commonFn.methods.isEmpty(this.partnerUpdate.tradeNm)){  
                    this.alert('협력사명을 입력해주세요.');
                    return;
                }

                this.confirm('저장하시겠습니까?', async () =>  {
                    try {
                        /* 수정 */
                        let url = '/sendApi/api/adminPtnr/trade/change' 
                        let param = {
                            ...this.partnerInfo,
                            tradeId : (this.partnerInfo.tradeId).toString().replaceAll('-',''),  // 사업자 번호
                            tradeNm : this.partnerUpdate.tradeNm                                 // 수정할 협력사명
                        }

                        await sendPostApi(url, param).then(async upRst => {
                            if(upRst.status == '200'){
                                return this.alert('저장되었습니다.',async() => {
                                    this.editYn = false
                                    this.$root.$emit('bv::hide::modal', 'TradePartnerInfo');
                                    this.fn_partnersList()
                                });
                            }else{
                                return this.alert('저장에 실패했습니다.');
                            }
                        })
                    } catch (error) {
                        return this.alert('저장에 실패했습니다.');
                    }
                })
            },

            /* 협력사 삭제 버튼 */
            async fn_partnersDelete(){ 

                if(this.partnerInfo.createSys != 'SQMS'){
                    return this.alert('등록시스템을 확인해주세요.')
                }

                this.confirm('삭제하시겠습니까?', async () =>  {
                    try {
                        /* 삭제 */
                        let url = '/sendApi/api/adminPtnr/trade/delete' 
                        let param = {
                            tradeType : this.partnerInfo.tradeType,                              // 협력사 유형
                            tradeId : (this.partnerInfo.tradeId).toString().replaceAll('-',''),  // 사업자 번호
                        }

                        await sendPostApi(url, param).then(async delRst => {
                            if(delRst.status == '200'){
                                return this.alert('삭제되었습니다.',async() => {
                                    this.$root.$emit('bv::hide::modal', 'TradePartnerInfo');
                                    this.fn_partnersList()
                                });
                            }else{
                                return this.alert('삭제에 실패했습니다.');
                            }
                        })
                    } catch (error) {
                        return this.alert('삭제에 실패했습니다.');
                    }
                })
            },

            /* 협력사 직원 리스트 조회 */
            async fn_partnerUserList(type){   
                this.deleteIds = []
                let url = '/sendApi/api/adminPtnr/tradeUser/list'
                let param = {        // 검색값 
                    ...this.employeeSearch
                }

                await sendPostApi(url, param).then(async result => {
                    if(typeof result.data.resultList != 'undefined'){ 
                      
                        this.ptnEmployeeSheet.loadSearchData({
                            data: result.data.resultList,  // ptnEmployeeSheet 데이터 세팅
                        })

                        if(type == 'create'){
                            this.employeeList = result.data.resultList.map(row =>  row.tradeId+'_'+row.userNm)
                        }
                    }
                    // return result.data;
                }).catch((e) => {
                    return this.alert('조회에 실패했습니다.');
                });
            },

            /* 협력사 직원 click */
            fn_ptnEmployeeClick(evt){
                if(evt.col == 'projectIcon' && evt.kind == 'Data' && evt.row.projectIcon != ''){  // 프로젝트 선택 modal
                    this.selectRow = evt.sheet.getRowIndex(evt.row)
                    let selectSiteMstrIds = this.ptnEmployeeSheet.getRowByIndex(this.selectRow).siteMstrIds

                    if(!commonFn.methods.isEmpty(selectSiteMstrIds)){
                        this.selectSiteMstrIds = selectSiteMstrIds.split(',')
                    }
                    
                    this.$refs.multiProjectSelect.selectList = []
                    return this.$root.$emit('bv::show::modal', 'MultiProjectSelect') 
                }

                if(evt.col == 'authIcon' && evt.kind == 'Data' && evt.row.authIcon != ''){        // 권한그룹 선택 modal
                    this.selectRow = evt.sheet.getRowIndex(evt.row)
                    return this.$root.$emit('bv::show::modal', 'UserGroup')
                }
            },

            /* 협력사 직원 hp 입력시 */
            fn_ptnEmployeeChg(evt){
                if(evt.col == 'hp' &&  evt.val != ''){ 
                    if(isNaN(evt.val)){
                        evt.sheet.setValue(evt.row, 'hp', '')    
                    }else{
                        evt.sheet.setValue(evt.row, 'hp', (evt.val).toString().replaceAll('-',''))
                    }
                }

                if(['jobTitle','jobRoleNm','email','hp'].includes(evt.col) && !evt.row.Added){
                    evt.row.Changed = 1
                }
            },

            /* 협력사 직원 Dbclick */
            fn_ptnEmployeeDbClick(evt){
                if(evt.col != 'isChecked'){
                    if(evt.row.Added){
                        this.selectRow = evt.sheet.getRowIndex(evt.row)
                        this.$root.$emit('bv::show::modal', 'AdmPartnerUserSearch')
                    }
                }
            },

            /* 신규 협력사 직원 추가시 */
            async fn_partnerChoice(data){  
                let rows = this.employeeList
                let row = this.ptnEmployeeSheet.getRowByIndex(this.selectRow)

                row['tradeId'] = data.tradeId
                row['tradeNm'] = data.tradeNm
                row['tradeType'] = data.tradeType
                row['tradeTypeNm'] = data.tradeTypeNm
                row['userId'] = data.userId
                row['userNm'] = data.userNm
                row['jobRoleNm'] = data.jobRoleNm
                
                if(!commonFn.methods.isEmpty(data.siteMstrId)){
                    row['siteMstrIds'] = data.siteMstrId
                    row['siteMstrCnt'] = (data.siteMstrId.split(',')).length
                }else{
                    row['siteMstrIds'] = ''
                    row['siteMstrCnt'] = 0
                }
                
                if(data.hp){
                    data.hp = (data.hp).replaceAll('-','')
                }

                row['hp'] = data.hp
                row['email'] = data.email
                row['jobTitle'] = data.jobTitle
                row['useNewable'] = data.useNewable
                row['projectIcon'] = 'Y'
                // row['groupAuthNm'] = '미지정'
                row['authIcon'] = 'Y'

                if(data){
                    let checkNm = data.tradeId+'_'+data.userNm

                    if (rows.indexOf(checkNm) > -1) {
                        this.alert('중복된 사용자가 있습니다.')
                        row['tradeId'] = ''
                        row['tradeNm'] = ''
                        row['tradeType'] = ''
                        row['tradeTypeNm'] = ''
                        row['userId'] = ''
                        row['userNm'] = ''
                        row['jobRoleNm'] = ''
                        row['hp'] = ''
                        row['email'] = ''
                        row['jobTitle'] = ''
                        row['useNewable'] = ''
                        row['siteMstrCnt'] = 0
                        row['projectIcon'] = ''
                        row['authIcon'] = ''
                        return
                    }else{
                        rows.push(checkNm)
                    }
                }
                if(data.useNewable){
                    this.ptnEmployeeSheet.setAttribute(row, "jobTitle","CanEdit", 1,  1)
                    this.ptnEmployeeSheet.setAttribute(row, "jobRoleNm","CanEdit", 1,  1)
                    this.ptnEmployeeSheet.setAttribute(row, "email","CanEdit", 1,  1)
                    this.ptnEmployeeSheet.setAttribute(row, "hp","CanEdit", 1,  1)
                }

                this.ptnEmployeeSheet.refreshRow(row);

                this.$root.$emit('bv::hide::modal', 'AdmPartnerUserSearch');
            },
            
            /*  협력사 직원 - 프로젝트 선택시 */
            fn_projectChoice(data){
                let row = this.ptnEmployeeSheet.getRowByIndex(this.selectRow)
                if(data. indexOf('ALL_SITE') > -1){
                    row['siteMstrCnt'] =  'ALL'
                    row['siteMstrIds'] =  'ALL_SITE'
                }else{
                    row['siteMstrCnt'] =  data.length
                    row['siteMstrIds'] =  data.map(item => item.siteMstrId).join(',')
                }

                if(!row.Added){
                    row.Changed = 1
                }
                this.ptnEmployeeSheet.refreshRow(row);
            },

            /*  협력사 직원 - 권한 그룹 선택시 */
            fn_authGroupChoice(data){  
                let row = this.ptnEmployeeSheet.getRowByIndex(this.selectRow)

                row['groupTypeNm'] = data.groupTypeNm
                row['groupAuthNm'] = data.groupAuthNm
                row['groupAuthDtlId'] = data.groupAuthDtlId

                if(!row.Added){
                    row.Changed = 1
                }

                this.ptnEmployeeSheet.refreshRow(row);
            },

            /* 협력사 직원 - 등록 / 수정 / 삭제 */
            async fn_ptnEmployeeSave(){
                let url = ''
                let param = {}
                
                let dataRows = this.ptnEmployeeSheet.getDataRows()
                let addRows = dataRows.filter(item => item.Added == 1).map(row => {   // 신규 협력사 직원 추가
                    return {
                        'email' : row.email ? row.email : '' ,               // 이메일
                        'groupAuthDtlId' : row.groupAuthDtlId ? row.groupAuthDtlId : '' , // 권한그룹 ID
                        'groupAuthNm' : row.groupAuthNm ? row.groupAuthNm : '' ,   // 권한그룹명
                        'groupTypeNm' : row.groupTypeNm ? row.groupTypeNm : '' ,   // 권한 유형
                        'hp' : row.hp ? row.hp : '' ,                     // 핸드폰
                        'jobRoleNm' : row.jobRoleNm ? row.jobRoleNm : '' ,       // 직책
                        'siteMstrIds' : row.siteMstrIds ? row.siteMstrIds : '' ,   // 프로젝트 Ids
                        'tradeId' : row.tradeId ,           // 협력사 ID
                        'tradeNm' : row.tradeNm ,           // 협력사명
                        'tradeType' : row.tradeType ,       // 협력사 유형
                        'tradeTypeNm' : row.tradeTypeNm ,   // 협력사 유형명
                        'userId' : row.userId ,             // 협력사 직원 ID
                        'userNm' : row.userNm ,             // 협력사 직원명
                        'jobTitle' : row.jobTitle ? row.jobTitle : '' ,         // 호칭
                        'useStartDt' : row.useStartDt ? this.$moment(row.useStartDt).format('YYYYMMDD') : '' ,  // 시작일
                        'useEndDt' : row.useEndDt ? this.$moment(row.useEndDt).format('YYYYMMDD') : '',         // 종료일
                        'userType' : 'PTNR'
                    }
                })

                let chgRows = dataRows.filter(item => item.Added != 1 && item.Changed == 1).map(row => {  // 기존 협력사 직원 수정
                    return {
                        'email' : row.email ,               // 이메일
                        'groupAuthDtlId' : row.groupAuthDtlId , // 권한그룹 ID
                        'groupAuthNm' : row.groupAuthNm ,   // 권한그룹명
                        'groupTypeNm' : row.groupTypeNm ,   // 권한 유형
                        'hp' : row.hp ,                     // 핸드폰
                        'jobRoleNm' : row.jobRoleNm ,       // 직책
                        'siteMstrIds' : row.siteMstrIds ? row.siteMstrIds : '' ,   // 프로젝트 Ids
                        'tradeId' : row.tradeId ,           // 협력사 ID
                        'tradeNm' : row.tradeNm ,           // 협력사명
                        'tradeType' : row.tradeType ,       // 협력사 유형
                        'tradeTypeNm' : row.tradeTypeNm ,   // 협력사 유형명
                        'userId' : row.userId ,             // 협력사 직원 ID
                        'userNm' : row.userNm ,             // 협력사 직원명
                        'jobTitle' : row.jobTitle ,         // 호칭
                        'useStartDt' : row.useStartDt ? this.$moment(row.useStartDt).format('YYYYMMDD') : '' ,  // 시작일
                        'useEndDt' : row.useEndDt ? this.$moment(row.useEndDt).format('YYYYMMDD') : '',         // 종료일
                        'userType' : 'PTNR'
                    }
                })

                if(addRows.filter(item => (item.userNm == '')).length > 0){
                    return this.alert('협력사 직원을 선택해주세요.')
                }

                if(addRows.filter(item => (item.jobTitle == '')).length > 0){
                    return this.alert('호칭을 입력해주세요.')
                }

                if(addRows.filter(item => (item.jobRoleNm == '')).length > 0){
                    return this.alert('직책명을 입력해주세요')
                }

                if(addRows.filter(item => (item.email == '')).length > 0){
                    return this.alert('이메일을 입력해주세요')
                }

                if(addRows.filter(item => (item.hp == '')).length > 0){
                    return this.alert('핸드폰을 입력해주세요')
                }

                if(addRows.filter(item => (item.useStartDt == '')).length > 0){
                    return this.alert('시작일을 입력해주세요.')
                }

                if(addRows.filter(item => (item.useEndDt == '')).length > 0){
                    return this.alert('종료일을 입력해주세요.')
                }

                let names = addRows.map(row => row.tradeId +'_'+ row.userNm)  // 추가 등록 인원

                if((addRows.length + chgRows.length + this.deleteIds.length) < 1){
                    return this.alert('저장할 데이터가 없습니다.')
                }

                if(chgRows.filter(item => (item.jobTitle == '')).length > 0){
                    return this.alert('호칭을 입력해주세요.')
                }

                if(chgRows.filter(item => (item.jobRoleNm == '')).length > 0){
                    return this.alert('직책명을 입력해주세요')
                }

                if(chgRows.filter(item => (item.email == '')).length > 0){
                    return this.alert('이메일을 입력해주세요')
                }

                if(chgRows.filter(item => (item.hp == '')).length > 0){
                    return this.alert('핸드폰을 입력해주세요')
                }

                try {
                    if(addRows.length > 0) {  // 추가 등록 인원이 있는경우 중복여부 체크
                        url = '/sendApi/api/adminPtnr/tradeUser/list'; 
                        param = {
                            'names' : names
                        };

                        await sendPostApi(url, param).then(async (result) => {
                            if(typeof result.data.resultList != 'undefined'){
                                if(result.data.resultList.length > 0){
                                    let rstNams = result.data.resultList.map(item => item.tradeId+'_'+item.userNm)

                                    await dataRows.forEach(row => {
                                        if(this.deleteIds.indexOf(row.userId) < 0 && rstNams.indexOf(row.tradeId+'_'+row.userNm) > -1){
                                            this.ptnEmployeeSheet.setAttribute(row, null, 'Color', '#f96f6f')
                                        }else{
                                            this.ptnEmployeeSheet.setAttribute(row, null, 'Color', '')
                                        }
                                    })
                                   
                                    return this.alert('등록된 직원은 추가할 수 없습니다.')
                                }else{
                                    dataRows.forEach(row => { this.ptnEmployeeSheet.setAttribute(row, null, 'Color', '')})

                                    this.confirm('저장하시겠습니까?', async () => {
                                        url = '/sendApi/api/adminPtnr/tradeUser/write';
                                        param = {
                                            'addList' : addRows,
                                            'chgList' : chgRows,
                                            'deleteList' : this.deleteIds
                                        };

                                        await sendPostApi(url, param).then(async rstWrite => {
                                            if(typeof rstWrite.data.result != 'undefined'){
                                                if(rstWrite.data.result == 'clear'){
                                                    return this.alert('저장되었습니다.',()=>{
                                                        this.fn_partnerUserList()
                                                    })
                                                }else{
                                                    return this.alert('저장에 실패했습니다.')
                                                }
                                            }else{
                                                return this.alert('저장에 실패했습니다.')
                                            }
                                        })
                                    })
                                }
                            }
                        }).catch((e) => {
                            return this.alert('저장에 실패했습니다.')
                        });
                    }else{  // 추가 인원 없는경우
                        this.confirm('저장하시겠습니까?', async () => {
                            url = '/sendApi/api/adminPtnr/tradeUser/write';
                            param = {
                                'chgList' : chgRows,
                                'deleteList' : this.deleteIds
                            };
                            
                            await sendPostApi(url, param).then(async rstWrite => {
                                if(rstWrite.data.result == 'clear'){
                                    return this.alert('저장되었습니다.',()=>{
                                        this.fn_partnerUserList()
                                    })
                                }else{
                                    return this.alert('저장에 실패했습니다.')
                                }
                            })
                        })
                    }
                } catch (error) {
                    return this.alert('저장에 실패했습니다.')
                }

            },

             /* 협력사 직원 - 계정 활성화 / 비활성화 / 비밀번호 실패 초기화  */
            async fn_ptnEmployeeChange(type){    
                let url = '/sendApi/api/adminPtnr/tradeUser/change';
                let text = ''
                let checkedRows = this.ptnEmployeeSheet.getRowsByChecked('isChecked')

                if(checkedRows.length < 1){
                    return this.alert('협력사 직원을 선택해주세요.')
                }

                if(type ==  'lockYn'){  // 로그인 잠금 해제 (비밀번호 실패 초기화)
                    text = '비밀번호 실패 초기화를 하시겠습니까?'

                    checkedRows = this.ptnEmployeeSheet.getRowsByChecked('isChecked').map(row => {
                        return {
                            userId : row.userId,
                            'lockYn' : 'N',
                        }
                    })
                }

                if(type ==  'dormantYn'){  // 휴면계정 해제 (비밀번호 실패 초기화)
                    text = '휴면계정 해제를 하시겠습니까?'

                    checkedRows = this.ptnEmployeeSheet.getRowsByChecked('isChecked').map(row => {
                        return {
                            userId : row.userId,
                            'dormantYn' : 'N',
                        }
                    })
                }

                if(type ==  'disableY'){   // 계정 활성화
                    text = '계정 활성화를 하시겠습니까?'

                    checkedRows = this.ptnEmployeeSheet.getRowsByChecked('isChecked').map(row => {
                        return {
                            userId : row.userId,
                            'disableYn' : 'N',
                        }
                    })
                }

                if(type ==  'disableN'){   // 계정 비활성화
                    text = '계정 비활성화를 하시겠습니까?'

                    checkedRows = this.ptnEmployeeSheet.getRowsByChecked('isChecked').map(row => {
                        return {
                            userId : row.userId,
                            'disableYn' : 'Y',
                        }
                    })
                }
              
                this.confirm(text, async ()=>{
                    try {
                        await sendPostApi(url, { chgList : checkedRows }).then(result => {
                            if(typeof result.data.result != 'undefined'){
                                if(result.data.result == 'clear'){
                                    return this.alert('변경되었습니다.',()=>{
                                        this.fn_partnerUserList()
                                    })
                                }else{
                                    return this.alert('변경에 실패했습니다.')
                                }
                            }else{
                                return this.alert('변경에 실패했습니다.')
                            }
                        }).catch((e) => {
                            return this.alert('변경에 실패했습니다.');
                        });
                    } catch (error) {
                        return this.alert('변경에 실패했습니다.');
                    }
                })
            },

             /* 협력사 직원 - 비밀번호 초기화  */
            async fn_ptnEmployeePwChange(){     
                let url = '/sendApi/api/adminPtnr/tradeUserPwInitReq/change';
                let checkedRows = this.ptnEmployeeSheet.getRowsByChecked('isChecked').map(row => {
                        return {
                            'userId' : row.userId,
                            'userNm' : row.userNm,
                            'tradeId' : row.tradeId,
                            'tradeType' : row.tradeType,
                            'hp' : row.hp,
                            'pwInitYn' : 'Y',
                            'lockYn' : 'N',
                        }
                    })

                if(checkedRows.length < 1){
                    return this.alert('협력사 직원을 선택해주세요.')
                }

                this.confirm('비밀번호 초기화를 하시겠습니까?', async ()=>{
                    try {
                        await sendPostApi(url, { chgList : checkedRows }).then(result => {
                            if(typeof result.data.result != 'undefined'){
                                if(result.data.result == 0){
                                    return this.alert('변경되었습니다.',()=>{
                                        this.fn_partnerUserList()
                                    })
                                }else{
                                    return this.alert('변경에 실패했습니다.')
                                }
                            }else{
                                return this.alert('변경에 실패했습니다.')
                            }
                        }).catch((e) => {
                            return this.alert('변경에 실패했습니다.');
                        });
                    } catch (error) {
                        return this.alert('변경에 실패했습니다.');
                    }
                })
            },

            /* 프로젝트 매핑 - 프로젝트 조회 */
            async fn_projectList(){   
                let url = '/sendApi/api/popup/project/list';
                let param = {
                    ...this.projectSearch
                }

                this.projectSearch.siteMstrId = ''

                await sendPostApi(url, param).then(async (result) => {
                    if(typeof result.data.datas.resultList != 'undefined'){
                        let list = result.data.datas.resultList
                        this.projectMapSheet.loadSearchData({
                            data: list,  // projectMapSheet 데이터 세팅
                        })

                        if(list.length > 0){
                            this.projectSearch.siteMstrId = list[0].siteMstrId
                            this.fn_UserMapngList(this.projectSearch.siteMstrId)
                        }else{
                            this.projectPtnSheet.loadSearchData({
                                data: [],  // projectPtnSheet 데이터 세팅
                            })
                        }
                    }
                }).catch((e) => {
                    return this.alert('조회에 실패했습니다.');
                });
            },
            
            /* 프로젝트 매핑 - 협력사 직원 조회 */
            async fn_UserMapngList(id){    
                let url = '/sendApi/api/adminPtnr/prjctUserMapng/list';
                let param = {
                    'siteMstrId' : id,
                }

                await sendPostApi(url, param).then(async (result) => {
                    if(typeof result.data.resultList != 'undefined'){

                        this.projectPtnSheet.loadSearchData({
                            data: result.data.resultList,  // projectPtnSheet 데이터 세팅
                        })

                        let list = this.projectPtnSheet.getDataRows()
                        list.forEach(row => {
                            if(row.delPosblYn == 'Y'){
                                this.projectPtnSheet.setAttribute(row, "isChecked","CanEdit", 1,  0)
                            }
                        })
                    }
                }).catch((e) => {
                    return this.alert('조회에 실패했습니다.');
                });
            },

            /* 프로젝트 매핑 - 프로젝트 선택(click) */
            fn_projectClick(evt){  
                if(evt.kind == 'Data'){
                    this.projectSearch.siteMstrId = evt.row.siteMstrId
                    this.fn_UserMapngList(this.projectSearch.siteMstrId)
                }
            },

            /* 프로젝트 매핑 - 협력사 직원 선택(click) */
            fn_projectPtnClick(evt){
                if(evt.kind == 'Data' && evt.row.delPosblYn == 'N' && evt.col == 'isChecked'){
                    return this.alert('프로젝트 매핑 삭제 불가 사용자 입니다.');
                }
            },

            /* 프로젝트 매핑 - 등록창 오픈 */
            fn_partnerUserProjectWrite(){   
                if(commonFn.methods.isEmpty(this.projectSearch.siteMstrId)){  
                    this.alert('프로젝트를 선택해주세요.');
                    return;
                }

                return this.$root.$emit('bv::show::modal', 'TradeEmployeeSearch')
            },

            /* 프로젝트 매핑 삭제 */
            async fn_partnerUserProjectDelete(){
                let checkedRows = this.projectPtnSheet.getRowsByChecked('isChecked').map(row => {
                    return{
                        userId : row.userId ,
                        siteMstrId : this.projectSearch.siteMstrId
                    }
                })

                if(checkedRows.length < 1){
                    return this.alert('협력사 직원을 선택해주세요.')
                }
                    
                this.confirm('삭제하시겠습니까?', async()=>{
                    let url = '/sendApi/api/adminPtnr/prjctUserMapng/delete';
                    let param = {
                        'chgList' : checkedRows
                    }

                    await sendPostApi(url, param).then(async (result) => {
                        if(typeof result.data.result != 'undefined'){
                            if(result.data.result == 'clear'){
                                return this.alert('삭제되었습니다.',()=>{
                                    this.fn_UserMapngList(this.projectSearch.siteMstrId)
                                })
                            }else{
                                return this.alert('삭제에 실패했습니다.')
                            }
                        }else{
                            return this.alert('삭제에 실패했습니다.')
                        }
                    }).catch((e) => {
                        return this.alert('삭제에 실패했습니다.');
                    });
                })
            },

            /* 프로젝트 매핑 등록 */
            async fn_partnerProjectChoice(data){  // 
                this.confirm('등록하시겠습니까?', async ()=>{
                    let list = []
    
                    await data.userIds.forEach( (row, index) => {
                        list.push({
                            'userId' : row,
                            'userType' : 'PTNR',
                            'userNm' : data.userNames[index],
                            'siteMstrId' : this.projectSearch.siteMstrId
                        }) 
                    })
    
                    let url = '/sendApi/api/adminPtnr/prjctUserMapng/write';
                    let param = {
                        'chgList' : list
                    }
    
                    await sendPostApi(url, param).then(async (result) => {
                        if(typeof result.data.result != 'undefined'){
                            if(result.data.result == 'clear'){
                                return this.alert('등록되었습니다.',()=>{
                                    // 모달 초기화
                                    this.$refs.TradeEmployeeSearch.emploName = '';
                                    this.$refs.TradeEmployeeSearch.companyName = '';
                                    this.$refs.TradeEmployeeSearch.userIds = [];
                                    this.$refs.TradeEmployeeSearch.userNames = [];
    
                                    this.$root.$emit('bv::hide::modal', 'TradeEmployeeSearch')
    
                                    this.fn_UserMapngList(this.projectSearch.siteMstrId)
                                })
                            }else{
                                return this.alert('등록에 실패했습니다.')
                            }
                        }else{
                            return this.alert('등록에 실패했습니다.')
                        }
                    }).catch((e) => {
                        return this.alert('등록에 실패했습니다.');
                    });
                })
            },

            /* 엑셀 다운로드 */
            fn_exportExcel: function (sheetNum) {
                let sheet = (sheetNum == 0) ? this.ptnSheet : this.ptnEmployeeSheet
                let name = this.tabs[sheetNum]

                sheet.down2Excel({
                    merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                    downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                    reqHeader:  {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Accept-Language': 'ko'
                                },
                    fileName:   name+`_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                })
            },
        },
        
   }
</script>