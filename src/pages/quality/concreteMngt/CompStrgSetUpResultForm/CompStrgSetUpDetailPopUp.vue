<template>
    <div class="tab_contents">
        <h2 class="sub_title pb20">콘크리트 타설 현황(강도관리) 상세보기</h2>
        <div class="tab_area">
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="5%">
                        <col width="22%">
                        <col width="11%">
                        <col width="22%">
                        <col width="7%">
                        <col width="22%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>타설 번호</th>   
                            <td>
                                <input
                                    v-model="mySiteFiltering.pourSeq"
                                    type="text"
                                    class="form_control"
                                    placeholder="입력해주세요"
                                    @keyup.enter="searchProject()"
                                >
                            </td>    
                            <th>공급업체</th>
                            <td>
                                <input 
                                    v-model="mySiteFiltering.ptnr" 
                                    type="text"
                                    class="form_control"
                                    placeholder="입력해주세요"
                                    @keyup.enter="searchProject()"
                                >
                            </td>
                            <th>배합규격</th>
                            <td>
                                <input
                                    v-model="mySiteFiltering.concMixSd"
                                    type="text"
                                    class="form_control"
                                    placeholder="입력해주세요"
                                    @keyup.enter="searchProject()"
                                >
                            </td>
                            <td class="ar">
                                <button
                                    type="button"
                                    class="btn_reset"
                                    @click="searchMySiteData(true)"
                                >
                                    초기화
                                </button>
                                <button
                                    type="button"
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                                    @click="searchMySiteData(false)"
                                >
                                    검색
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th>타설옵션</th>
                            <td>
                                <input
                                    v-model="mySiteFiltering.pourOptionNm"
                                    type="text"
                                    class="form_control"
                                    placeholder="입력해주세요"
                                    @keyup.enter="searchProject()"
                                >
                            </td>
                            <th>구조물명 또는 타설부위</th>
                            <td>
                                <input
                                    v-model="mySiteFiltering.pourPart"
                                    type="text"
                                    class="form_control"
                                    placeholder="입력해주세요"
                                    @keyup.enter="searchProject()"
                                >
                            </td>
                            <th>강도시험종류</th>
                            <!-- <td>
                                <input 
                                    v-model="mySiteFiltering.strgTestType"
                                    type="text" 
                                    class="form_control"
                                    placeholder="입력해주세요"
                                    @keyup.enter="searchProject()"
                                >
                            </td> -->
                            <td>
                                <select class="form_control" v-model="mySiteFiltering.strgTestType">
                                    <option 
                                        v-for="option in strgTestTypeList"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>진행상태</th>
                            <td>
                                <select 
                                    v-model="mySiteFiltering.strgTestStatus" 
                                    class="form_control"
                                >
                                    <option 
                                        v-for="option in strgTestStatus"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </td>
                            <th>타설일</th>
                            <td>
                                <DatePickerRange ref="datePickerAllsiteCompStrgPourDayRange" v-model="pourDay"/>
                            </td>
                            <th>시험일</th>
                            <td>
                                <DatePickerRange ref="datePickerAllsiteCompStrgTestDayRange" v-model="testDay"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <!-- <div class="button_box">
                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray">압축강도 시험일지</button>
                        <button type="button" class="btn btn_sm btn_darkgray">복수 입력</button>
                    </div>
                </div> -->

                <!-- ibsheet -->
                <!-- <sqms-grid
                    id="compStrgSetUpDetailPopUpSheet"
                    :columns="columns"
                    :data="gridData"
                    :inputStyle="{'height':'600px'}"
                    @click="clickMySiteGrid"
                    @init="initSheet"
                >
                </sqms-grid> -->
                <div class="ib_wrap" style="height: calc(100vh - 400px)">
                <div id="compStrgAllsiteDetailSheet" class="ibsheet_table" style="height:100%"></div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import API from '@/apis/'
    import _ from 'lodash'
    import { ConcretePourstatus4 } from '@/pages/common/data/MaterialsList';
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import { mapGetters } from 'vuex'
    import { sendPostApi, requestOptions } from '@/apis/common'
    import { ConcretePourstatus3 } from '@/pages/common/data/MaterialsList';
    import loader from '@ibsheet/loader'

    export default {
        name: 'CompStrgSetUpDetailPopUp',
        components: {
            DatePickerRange
        },
        data() {
            return {
                columns: [], // 그리드 컬럼
        		gridData: [], // 그리드 데이터
                sheet: null,
                siteMstrId : null,
                mySiteFiltering: {
                    pourSeq: null, // 타설 번호
                    ptnr: null, // 공급업체
                    strgTestStatus: '', // 진행상태
                    concMixSd: null, // 배합규격
                    pourOptionNm: null , // 타설옵션
                    pourPart: null, // 구조물명 및 타설부위
                    strgTestType: '', // 강도 시험종류
                    testYn: 'Y', //시험여부
			    },
                pourDay : [null, null],
                testDay : [null, null],
                strgTestStatus: [
                    // { label: '전체', value: null },
                    // { label: '시험등록', value: 'REGT' },
                    // { label: '지연', value: 'RATE' },
                    // { label: '시험검사', value: 'CHECK' },
                    // { label: '결재중', value: 'APVL' },
                    // { label: '완료', value: 'APRV' }
                ],
                strgTestTypeList: [],
            }
        },
        computed:{
            ...mapGetters({
                'information': 'getInformation'
            })
        },
        async created () {
            this.columns = ConcretePourstatus4.options.Cols.map(col => { return { ...col, CanEdit: 0 }})
            this.siteMstrId = this.information.siteMstrId
            await this.getStrgMngtList() // 강도관리 리스트 조회
            this.getStrgTestStatusList()
            this.getStrgTestTypeList()
        },
        methods: {
            initSheet (sheet) {
                this.sheet = sheet
            },
            /** 진행상태 셀렉트 옵션 불러오기 */
            async getStrgTestStatusList(){
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        
                let url = '/sendApi/api/common/masterCode/list';
                const payload = {
                    groupCode: 'STRG_TEST_STATUS',
                    useYn : 'USE_YN'
                }
                
                try {
                    const response = await sendPostApi(url, payload);
                    if (response.status === 200 && response.data) {
                    this.setTopFilterStrgTestStatusOptions(response.data.data)
                    }
                } catch (error) {
                    console.error('진행상태 종류 불러오기 에러: ',error)
                }
            },
            setTopFilterStrgTestStatusOptions(data){
                const all = { label : '전체', value: ''}
                const allStrgTestStatus = data.map(item => {
                    return {
                        label: item.codeNameKr,
                        value: item.codeVal,
                    }
                })
                this.strgTestStatus = [all, ..._.uniqBy(allStrgTestStatus, 'value')]
            },
            /** 강도시험 종류 셀렉트 옵션 불러오기 */
            async getStrgTestTypeList(){
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        
                let url = '/sendApi/api/common/masterCode/list';
                const payload = {
                    groupCode: 'STRG_TEST_TYPE',
                    useYn : 'USE_YN'
                }
                
                try {
                    const response = await sendPostApi(url, payload);
                    if (response.status === 200 && response.data) {
                    this.setTopFilterStrgTestTypeOptions(response.data.data)
                    }
                } catch (error) {
                    console.error('진행상태 종류 불러오기 에러: ',error)
                }
            },
            setTopFilterStrgTestTypeOptions(data){
                const all = { label : '전체', value: ''}
                const allStrgTestType = data.map(item => {
                    return {
                        label: item.codeNameKr,
                        value: item.codeVal,
                    }
                })
                this.strgTestTypeList = [all, ..._.uniqBy(allStrgTestType, 'value')]
            },
            /**
             * API: 강도관리 목록 조회
             */
            async getStrgMngtList (payload = this.mySiteFiltering) {
                let options = ConcretePourstatus3.options
                options.Events = {
                    onRenderFirstFinish: async() => {
                        payload['siteMstrId'] = this.siteMstrId
                        if(this.pourDay[0] != null && this.pourDay[1] != null){
                            payload['startPourDay'] = this.pourDay[0]
                            payload['endPourDay'] = this.pourDay[1]
                        }
                        if(this.testDay[0] != null && this.testDay[1] != null){
                            payload['startTestDay'] = this.testDay[0]
                            payload['endTestDay'] = this.testDay[1]
                        }
                        try {
                            const response = await API.concrete.getStrgMngtList(payload)
                            if(response?.data.length > 0) {
                                response.data.forEach(row => {
                                    row.concMixSd = row.concMixSd.replaceAll("-", "")
                                    row.testYn = (row.testYn === 'Y' ? 1 : 0)
                                })
                                this.sheet.loadSearchData({
                                    data: response.data,  // strgListSheet 데이터 세팅
                                })
                            }
                        } catch (error) {
                            console.error('강도 관리 조회 에러: ', error)
                        }
                    },
                    onDataLoad: async(evt) => {
                        this.mySiteDataLoad(evt)
                    },
                    onAfterClick: (evt) => {
                        this.clickMySiteGrid(evt)
                    }
                }
                
                loader.createSheet({
                    el: 'compStrgAllsiteDetailSheet',
                    data : [],
                    options : options
                }).then(sheet => {
                    this.sheet = sheet
                })
            },
            mySiteDataLoad () {
                const rows = this.sheet.getDataRows()
                const state = {
                    REGT: { idx: 1, label: '시험등록', class: '' },
                    RATE: { idx: 2, label: '지연', class: '' },
                    CHECK: { idx: 3, label: '시험검사', class: '' },
                    APVL: { idx: 4, label: '결재중', class: '' },
                    APRV: { idx: 5, label: '완료', class: 'complete' }
                }

                rows.forEach(row => {
                    const value = this.sheet.getRowValue(row)
                    row.strgTestStatus = `
                        <div style='width:100%; height:30px' class="guage" >
                            <span
                                class="bar_wrap"
                            >
                                <span
                                    class="bar ${ state[value.strgTestStatus]?.class}"
                                    style='height:100%; width: ${20 * state[value.strgTestStatus]?.idx}%;'
                                />
                            </span>
                            <span
                                class="label"
                                style="width: ${20 * state[value.strgTestStatus]?.idx}%;"
                            >
                                ${state[value.strgTestStatus]?.label}
                            </span>
                        </div>
                    `
                    this.sheet.setMergeRange(row, 'strgTestStatus', row, 'case14')
                })
            },
            /**
             * My Site > 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchMySiteData (isReset) {
                if (isReset) {
                    this. mySiteFiltering = {
                        pourSeq: null, // 타설 번호
                        ptnr: null, // 공급업체
                        strgTestStatus: '', // 진행상태
                        concMixSd: null, // 배합규격
                        pourOptionNm: null , // 타설옵션
                        pourPart: null, // 구조물명 및 타설부위
                        strgTestType: '', // 강도 시험종류
                    },
                    this.pourDay = [null,null]
                    this.testDay = [null,null]
                }
                return await this.getStrgMngtList(this.mySiteFiltering)
            },
            clickMySiteGrid (evt) {
                // 결과입력 (0: 입력, 1: 보기)
                var temp = []
                temp.push(evt.row.concCompStrgLstId)
                if(evt.col === 'testYn') {
                    if (evt.row.testYn === 1) { // <입력> => 강도 관리 입력 페이지로 이동
                        this.$router.push({
                            name: 'CompStrgSetUpView',
                            params: { concCompStrgLstIds: temp }
                        })
                    } else { // <보기> => 강도 관리 상세 페이지로 이동
                        this.$router.push({
                            name: 'CompStrgSetUpView',
                            params: { concCompStrgLstIds: temp }
                        })
                    }
                }
		    },
        }
    }
</script>