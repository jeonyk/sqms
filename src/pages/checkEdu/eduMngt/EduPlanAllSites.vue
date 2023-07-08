<template>
<div>
    <div class="lookup_box multi_line">
        <table>
            <colgroup>
                <col width="6%">
                <col width="18%">
                <col width="4%">
                <col width="14%">
                <col width="5%">
                <col width="23%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>프로젝트명</th>
                    <td>
                        <div class="form_area">
                            <select v-model="filtering.mngtType" class="form_control">
                                <option 
                                v-for="option in mngtTypeOptions"
                                :key="option.value"
                                :value="option.value"
                            >   
                                {{ option.label }}
                            </option>
                            </select>
                            <input type="text" v-model="filtering.projectNm" class="form_control" placeholder="입력해주세요">
                        </div> 
                    </td>
                    <th>프로젝트 코드</th>
                    <td colspan="5">
                        <!-- <div class="form_area"> -->
                            <input type="text" class="form_control size_sm_lg ml20" v-model="filtering.projectCd" placeholder="입력해주세요">
                        <!-- </div> -->
                    </td>
                    <td class="ar">
                        <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                    </td>
                </tr>
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
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>교육 과정명</th>
                    <td><input type="text" v-model="filtering.eduCourseName" class="form_control size_sm_lg"></td>
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
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="inner">
        <div class="button_box">
            <!-- <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel">엑셀 다운로드</button> -->
        </div>
        <sqms-grid
            id="eduPlanAllSites"
            :columns="columns"
            :data="gridData"
            @init="initSheet"
            :upperStyle="{'height':'calc(100vh - 360px)'}"
            :inputStyle="{'height':'100%'}"
            :cfg="{
                NoVScroll: false,
            }"
            @click="clickGrid"
            ref="eduPlanAllSitesRef"
            :excelFileName="`교육훈련계획_${$moment().format('YYYYMMDD')}.xlsx`"
            downloadable

        >
        </sqms-grid>
    </div>


    <!-- 교육 훈련 계획/실시 상세 팝업 -->
    <b-modal id="EduplanWrite3" title="교육 훈련 계획/실시 상세" 
        hide-backdrop size="lg">
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
                                <th>계획 일자</th>
                                <td>{{ detail.eduPlanStartDt }} ~ {{ detail.eduPlanEndDt }}</td>
                            </tr>
                            <tr>
                                <th>교육 대상</th>
                                <td colspan="3">
                                    <label for="" class="input_radio">
                                        <input type="radio" name="eduTargetType" value="1" v-model="detail.eduTargetType" disabled>
                                        <span class="label_text">관리자</span>
                                    </label>
                                    <label for="" class="input_radio">
                                        <input type="radio" name="eduTargetType" value="2" v-model="detail.eduTargetType" disabled>
                                        <span class="label_text">작업자</span>
                                    </label>
                                    <label for="" class="input_radio">
                                        <input type="radio" name="eduTargetType" value="3" v-model="detail.eduTargetType" disabled>
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
                                <th>실시일자</th>
                                <td>{{ detail.eduInspStartDt }} ~ {{ detail.eduInspEndDt }}</td>
                                <th>대상/참석</th>
                                <td>{{ detail.eduTargetNum }}명 / {{ detail.eduAtdrnNum }}명</td>
                            </tr>
                            <tr>
                                <th>장소/시간</th>
                                <td>{{ detail.eduPlace }} / {{ detail.eduTime }}</td>
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
                <LstFile 
                    :downloadable="true"
                    :lstFileRst="files"
                    :uploadable="false"
                />
                <!-- <div class="lst_file w100" v-for="(file, index) in files" :key="index">
                    <h3>첨부파일 2개 (6.2MB)</h3>
                    <ul>
                        <li><a href="javascript:void(0);"><i class="ico_file file_jpg">{{ file.orgFileName }} {{ (file.fileSize) }}</i></a></li>
                    </ul>
                </div> -->

                <div class="button_box">
                    <strong>기타 자료 업로드</strong>
                </div>
                <hr>
                
                <LstFile 
                    :downloadable="true"
                    :lstFileRst="subfiles"
                    :uploadable="false"
                />
                <!-- <div class="lst_file w100" v-for="(file, index) in subfiles" :key="index">
                    <h3>첨부파일 2개 (6.2MB)</h3>
                    <ul>
                        <li><a href="javascript:void(0);"><i class="ico_file file_jpg">{{ file.orgFileName }} {{ (file.fileSize) }}</i></a></li>
                    </ul>
                </div> -->

            </div>
        </template>
        <template #modal-footer="{ ok }">
            <b-button class="btn btn_md btn_outline btn_gray" @click="ok">닫기</b-button>
        </template>
    </b-modal>
</div>
</template>

<script>
   import API from '@/apis/'
   import _ from 'lodash'
   import { EduplanList2 } from '@/pages/common/data/InspectionList'
   import DatepickerRange from '@/pages/common/popup/DatepickerRange.vue'
   import LstFile from '@/pages/common/popup/LstFile'

   export default {
        name: 'EduPlanAllSites',
        components: {
            LstFile,
            DatepickerRange
        },
        data: () => ({
            files : [],
            fileCnt : 0,
            subfiles : [],
            subFileCnt : 0,
            columns: [], // 그리드 컬럼
		    gridData: [], // 그리드 데이터
            sheet: null, // 그리드 시트
            //현장정보 파람
            siteId: '',
            siteNm: '',
            projectId: '',
            projectNm: '',
            baseTypeNm: '',
            csrtTypeNm: '',
            //검색조건
            filtering : {
                gjCode: null,
                kindCode: null,
                eduTargetType: null,
                eduYear: new Date().getFullYear(),
                eduCourseName: '',
                allSiteYn : 'Y',
                mngtType : '0',
                inspStatus : '',
                eduTargetComment: '',
                siteMstrId : '',
                projectCd : '',
                projectNm : '',
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
            isCheck: false,
            gubunCodePopupOptions: [],
            mngtTypeOptions: [
                { label : '전체', value: null },
                { label : '관리', value: '0' },
                { label : '비관리', value: '1' },
                { label : '준공', value: '2' },
            ],
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
            },
        }),
        watch : {
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
        async created(){
            this.columns = EduplanList2.options.Cols
            this.filtering.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            await this.getEduPlanListData(this.filtering)
            this.getGjCodeList()
            this.getKindCodeList()
            this.getGubunCodeList()
            this.getSiteInfoView()
        },
        methods: {
            initSheet (sheet) {
                this.sheet = sheet
            },
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
                        this.filtering.projectNm = response.datas.result.projectNm,
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
                    groupCode : 'EDU_GJ',
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
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
                    groupCode : 'EDU_KIND',
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
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
                    groupCode : 'EDU_TYPE',
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
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
             * API : 교육관리 리스트를 조회합니다.
             */
            async getEduPlanListData(payload = this.filtering) {

                try {
                    const response = await API.eduTraining.getAllEduMngInfoList({
                        ...payload,
                    })
                    if(response?.dlEduMng){
                        this.gridData = this.mappingInitGridData(response.dlEduMng)
                    }
                } catch (error) {
                    console.error('교육관리 리스트 조회 에러: ', error)
                }
            },
            /**
             * 교육정보 상세를 조회합니다.
             */
            async getEduMngInfoView(param) {
                const payload = {
                    eduMngId : param
                }
                try {
                    const response = await API.eduTraining.getEduMngInfoView(payload)
                    if(response?.dmEduMng) {
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
                    if(row.eduTargetType === '1'){
                        row.eduTargetType = '관리자'
                    }
                    if(row.eduTargetType === '2'){
                        row.eduTargetType = '작업자'
                    }
                    if(row.eduTargetType === '3'){
                        if(row.eduTargetComment === '' || row.eduTargetComment === null || row.eduTargetComment === undefined){
                            row.eduTargetType = '기타'
                        }else{
                            row.eduTargetType = row.eduTargetComment
                        }
                    } 
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
             * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData (isReset) {
                if (isReset) {
                    this.filtering = {
                        gjCode: null, 
                        kindCode: null, 
                        eduTargetType: null,
                        eduYear : new Date().getFullYear(),
                        inspStatus : '',
                        mngtType : '0',
                        allSiteYn : 'Y',
                        projectCd : '',
                    }
                }

                return await this.getEduPlanListData(this.filtering)
            },
            /**
             * 그리드 클릭 이벤트
             */
            async clickGrid(evt) {
                const rowData = evt.sheet.getRowValue(evt.row)
                this.eduMngId = rowData.eduMngId
                this.getEduMngInfoView(rowData.eduMngId)
                this.getFileInfoList()
                this.$bvModal.show('EduplanWrite3')
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
                        this.files = result.data
                        this.fileCnt = result.data.length
                    }
                    if(resultSub?.data){
                        this.subfiles = resultSub.data
                        this.subFileCnt = resultSub.data.length
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },
            exportExcel () {
                // export Data options
                // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
                var today = new Date();
                var year = today.getFullYear();
                const options = {
                    fileName: `HouseOptionAllSite_${year}.xlsx`,
                    downRows : 'Visible'
                }
                this.sheet.exportData(options)
            }
        }
   }
</script>