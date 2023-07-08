<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="5%">
                    <col width="22%">
                    <col width="5%">
                    <col width="22%">
                    <col width="5%">
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
                                @keyup.enter="searchMySiteData(false)"
                            >
                        </td>    
                        <th>공급업체</th>
                        <td>
                            <!-- <input 
                                v-model="mySiteFiltering.ptnr" 
                                type="text"
                                class="form_control"
                                placeholder="입력해주세요"
                                @keyup.enter="searchMySiteData(false)"
                            > -->
                            <select
                            v-model="mySiteFiltering.ptnr"
                            class="form_control"
                            >
                                <option value="" > 전체 </option>
                                <option
                                    v-for="option in categoryData"
                                    :key="option.tradeNm"
                                    :value="option.tradeNm"
                                >
                                    {{ option.tradeNm }}
                                </option>
                            </select>
                        </td>
                        <th>배합규격</th>
                        <td>
                            <!-- <input
                                v-model="mySiteFiltering.concMixSd"
                                type="text"
                                class="form_control"
                                placeholder="입력해주세요"
                                @keyup.enter="searchMySiteData(false)"
                            > -->
                            <select 
                                v-model="mySiteFiltering.concMixSd"
                                class="form_control"
                            >
                                <option value="" > 전체 </option>
                                <option
                                    v-for="option in categoryData2.filter(item => item.tradeNm === mySiteFiltering.ptnr)"
                                    :key="option.stnd"
                                    :value="option.stnd"
                                >
                                    {{ option.stnd }}
                                </option>
                            </select>
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
                                @keyup.enter="searchMySiteData(false)"
                            >
                        </td>
                        <th>구조물명<br>또는 타설부위</th>
                        <td>
                            <input
                                v-model="mySiteFiltering.pourPart"
                                type="text"
                                class="form_control"
                                placeholder="입력해주세요"
                                @keyup.enter="searchMySiteData(false)"
                            >
                        </td>
                        <th>강도시험종류</th>
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
                            <DatePickerRange ref="datepickerCompStrgPourDayRange"
                                v-model="pourDay"
                            />
                        </td>
                        <th>시험일</th>
                        <td>
                            <DatePickerRange 
                                ref="datepickerCompStrgTestDayRange"
                                v-model="testDay"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
        <!-- ibsheet --> 
            <div class="button_box">
                <div class="fl">
                    <button
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="compTestLog"
                        v-if="checkUser(userId,'down')"
                    >
                        압축강도 시험일지
                    </button>
                </div>
                <div class="fr">
                    <button
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="compTestList"
                    >
                    복수입력
                    </button>
                </div>
            </div>

            <div class="ib_wrap" style="height: calc(100vh - 400px)">
                <div id="compStrgMysiteSheet" class="ibsheet_table" style="height:100%"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import API from '@/apis/'
    import _ from 'lodash'
    import { ConcretePourstatus3 } from '@/pages/common/data/MaterialsList';
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { sendPostApi, requestOptions } from '@/apis/common'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import loader from '@ibsheet/loader';

    export default {
        name: 'CompStrgMySite',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            DatePickerRange
        },
        props: {
            isEditing: { // 편집 가능 모드인지? (초기 Settiing > True, 타설관리 > 타설옵션 선택 > False)
                type: Boolean,
                default: true
            },
            paramStrgTestStatus: {
                type: String,
            }
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name

                mySiteFiltering: {
                    pourSeq: null, // 타설 번호
                    ptnr: '', // 공급업체
                    strgTestStatus: '', // 진행상태
                    concMixSd: '', // 배합규격
                    pourOptionNm: null , // 타설옵션
                    pourPart: null, // 구조물명 및 타설부위
                    strgTestType: '', // 강도 시험종류
			    },
                pourDay : [null,null],
                testDay : [null, null],
                spplierOptions: [], // 공급업체 목록
                conMixSdOptions: [], // 배합규격 목록
                concMixSdOptionsByConcNm: {}, // 콘크리트 : [배합규격 목록...]
                pourQntmOptions: [  // 타설옵션 옵션
                    { label: '전체', value: null },
                    { label: '기초', value: 'BASIC' },
                    { label: '벽체', value: 'WALL' },
                    { label: '슬라브', value: 'SLAB' },
                    { label: '벽체&슬라브', value: 'WALL_SLAB' },
                    { label: '버림', value: 'BEOLIM' },
                    { label: '기타', value: 'ETC' }
                ],
                strgTestStatus: [
                    // { label: '시험 등록', value: 'REGT' },
                    // { label: '지연', value: 'RATE' },
                    // { label: '시험검사', value: 'CHECK' },
                    // { label: '결재 중', value: 'APVL' },
                    // { label: '완료', value: 'APRV' }
                ],
                strgTestTypeList: [],
                loading: {
                    isGetPourList: false, // 타설옵션 리스트 조회
                    isGetTopOptions: false // 상단 옵션 리스트 조회
                },
        		gridData: [], // 그리드 데이터
                strgListSheet: null,
                userId : '',
                concCompStrgLstIds : [], //강도관리 리스트 ID
                commonParams: {
                    // projectId : null,
                    // siteId : null,
                    siteMstrId : null
                },
                categoryData : [],
                categoryData2 : [],
                makeConcMixSd: (id) => {
                    if (id.includes('-')) return id
                    const result = id.slice(0, 2) + '-' + id.slice(2, -3) + '-' + id.slice(-3)
                    return result
                }
            }
        },
        activated(){
            // keepAlive 재조회 처리
            if(this.$store.getters['tabInfo/getSavePage'].length > 0){
                //keepAlive 재조회 처리
                let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
                let url="/sendApi/api/programMngt/menuChildProgram/list"
                let reSearch = false;
                let param = {"menuMngtId":menuid};
                // sdave정보가 있는지 체크하여 처리
                sendPostApi(url, param).then(async (result) => {
                    // 하부 페이지 정보
                    for (let i = 0; i < result.data.dlprogram.length ; i++){
                        // 저장 페이지 정보와 비교
                        for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                            if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                                this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);
                                reSearch = true;
                                break;
                            }
                        }
                        if(reSearch){
                            break;
                        }
                    }
                    if(reSearch){
                        // 화면 재조회 메소드 입력	
                        await this.initMySite() // My Site 초기 조회 세팅
                        this.createSheetLst()   // 시트 생성
                    }
                }).catch((e) => {
                    // console.log(e);
                    return e.response;
                });
            }
        },
        watch : {
            'mySiteFiltering.ptnr' : {
                handler(){
                    this.mySiteFiltering.concMixSd = ''
                }
            }
        },
        async created () {
            this.userId = this.$store.getters['auth/getUserId']
            this.commonParams = {
                siteMstrId: this.$store.getters['auth/getSiteMstrId']
            }

            if (this.paramStrgTestStatus) {
                this.mySiteFiltering.strgTestStatus = this.paramStrgTestStatus
            }
            await this.initMySite() // My Site 초기 조회 세팅
            this.createSheetLst()   // 시트 생성
        },

        beforeDestroy() {
            /* 시트 삭제 */
            if (this.strgListSheet)  loader.removeSheet(this.strgListSheet)
        },

        methods: {
            createSheetLst(){
                loader.createSheet({
                    el: 'compStrgMysiteSheet',
                    data: [],
                    options: {
                        Cols : ConcretePourstatus3.options.Cols,
                        Cfg: {
                            NoDataMessage : 3,
                            NoVScroll: false
                        },
                        Events: {
                            onAfterClick : this.clickMySiteGrid,
                            onDblClick : (evt) => {
                                this.dbClick(evt)
                            },
                            onRenderFirstFinish: () => {
                                this.getStrgMngtList() // 강도관리 리스트 조회
                            },
                        }
                    }
                }).then((sheet) => {
                    this.strgListSheet = sheet
                });
            },
            initSheet (sheet) {
                this.strgListSheet = sheet
            },
            // ============================= My Site =============================
            async initMySite () {
                await this.getPourSelectData() // 공급업체 및 배합규격 조회
                await this.setCategoryList()// 검색조건 공급업체 및 배합규격조회
                this.getStrgTestStatusList()
                this.getStrgTestTypeList()
            },
            /** 공급업체 및 배합규격 셀렉트 옵션 불러오기 */
            async setCategoryList(){
                const param = {
                    projectId : this.$session.get('userInfo').projectId,
                    siteId :this.$session.get('userInfo').siteId,
                    siteMstrId : this.$store.getters['auth/getSiteMstrId']
                }
                try {
                    const response = await API.concrete.getSupplierSelectOptView(param)
                    if(response?.data){
                        this.categoryData = _.uniqBy([...response.data], 'tradeNm')
                        this.categoryData2 = response.data
                    }
                } catch (error) {
                    console.error('공급 업체 조회 에러: ', error)
                }
            },
            /**
             * 상단 검색 조건 공급업체 및 배합 규격 세팅
             */
            setTopFilterOptions (data) {
                const all = { label: '전체', value: null }

                const allSupplier = data.map(item => {
                    return { label: item.tradeNm, value: item.tradeNm, id: item.ptnrId }
                })

                const allConcMixSd = data.map(item => {
                    return {
                        label: this.makeConcMixSd(item.concMixSd),
                        value: this.makeConcMixSd(item.concMixSd)
                    }
                })

                this.spplierOptions = [all, ..._.uniqBy(allSupplier, 'value')]
			    this.conMixSdOptions = [all, ..._.uniqBy(allConcMixSd, 'value')]

                const columns = ConcretePourstatus3.options.Cols
                if(columns?.length) {
                    const tradeNmCol = columns.find(col => col.Name === 'tradeNm')
                    const supplierCodes = allSupplier.map(item => item.label)
                    const supplierEnum = '|' + supplierCodes.join('|')
                    tradeNmCol.EnumKeys = supplierEnum
                    tradeNmCol.Enum = supplierEnum
                }

                this.columns = this.isEditing ? columns : columns.map(col => { return { ...col, CanEdit: 0 } })
            },
            /**
             * API : 상단 검색 조건 공급업체 및 배합규격 불러오기
             */
            async getPourSelectData () {
                try {
                    this.loading.isGetTopOptions = true
                    const response = await API.concrete.getPourSelectData(this.commonParams)
                    if(response?.data) {
                        const datas = _.groupBy(response.data, 'tradeNm')
                        for (const [key, value] of Object.entries(datas)) {
                            this.concMixSdOptionsByConcNm[key] = value.map(item => this.makeConcMixSd(item.concMixSd))
                        }

                        this.setTopFilterOptions(response.data)
                    }
                } catch (error) {
                    console.error('공급업체 및 배합규격 옵션 조회 에러: ', error)
                } finally {
                    this.loading.isGetTopOptions = false
                }
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
             * My Site > 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchMySiteData (isReset) {
                if (isReset) {
                    this.mySiteFiltering = {
                        pourSeq: null, // 타설 번호
                        ptnr: '', // 공급업체
                        strgTestStatus: '', // 진행상태
                        concMixSd: '', // 배합규격
                        pourOptionNm: null , // 타설옵션
                        pourPart: null, // 구조물명 및 타설부위
                        strgTestType: '', // 강도 시험종류
                    }
                    this.pourDay = [null,null]
                    this.testDay = [null,null]
                }
                return await this.getStrgMngtList(this.mySiteFiltering)
            },
            /**
             * API: 강도관리 목록 조회
             */
            async getStrgMngtList (payload = this.mySiteFiltering) {
                payload['siteMstrId'] = this.$store.getters['auth/getSiteMstrId']

                if(this.pourDay[0] != null && this.pourDay[1] != null){
                    payload['startPourDay'] = this.pourDay[0]
                    payload['endPourDay'] = this.pourDay[1]
                }
                if(this.testDay[0] != null && this.testDay[1] != null){
                    payload['startTestDay'] = this.testDay[0]
                    payload['endTestDay'] = this.testDay[1]
                }
                try {
                    await API.concrete.getStrgMngtList(payload).then(async response => {
                        if(response?.data.length > 0) {
                            await response.data.forEach(row => {
                                row.concMixSd = row.concMixSd.replaceAll("-", "")
                                row.testYn = (row.testYn === 'Y' ? 1 : 0)
                            })

                            this.strgListSheet.loadSearchData({
                                data: response.data,  // strgListSheet 데이터 세팅
                            })

                            this.mySiteDataLoad()
                        } else {
                            this.strgListSheet.loadSearchData({
                                data: [],        // strgListSheet 데이터 세팅
                            })
                        }
                    })
                    
                } catch (error) {
                    console.log( 'error : ', error)
                }
            },
            mySiteDataLoad () {
                const rows = this.strgListSheet.getDataRows()
                const state = {
                    REGT: { idx: 1, label: '시험등록', class: '' },
                    RATE: { idx: 2, label: '지연', class: '' },
                    CHECK: { idx: 3, label: '시험검사', class: '' },
                    APVL: { idx: 4, label: '결재중', class: '' },
                    APRV: { idx: 5, label: '완료', class: 'complete' }
                }

                rows.forEach(row => {
                    const value = this.strgListSheet.getRowValue(row)
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
                    this.strgListSheet.setMergeRange(row, 'strgTestStatus', row, 'case14')
                })
            },
            clickMySiteGrid (evt) {
                // 결과입력 (0: 입력, 1: 보기)
                var temp = []
                temp.push(evt.row.concCompStrgLstId)
                if(evt.col === 'testYn') {
                    if (evt.row.testYn === 0) { // <입력> => 강도 관리 입력 페이지로 이동
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);

                        this.$store.dispatch('conc/setCompStrg',{ 
                            'concCompStrgLstIds': temp ,'compTest' : true
                        });

                        this.$router.push({ 
                            name: 'CompStrgSetupWrite',
                        })
                    } else { // <보기> => 강도 관리 상세 페이지로 이동
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                        this.$store.dispatch('conc/setCompStrg',{
                            'concCompStrgLstIds': temp ,'compTest' : false
                        });

                        this.$router.push({
                            name: 'CompStrgSetupWrite'
                        })
                    }
                }
		    },
            dbClick (evt) {
                var temp = []
                temp.push(evt.row.concCompStrgLstId)
                if (evt.row.testYn === 0) { // <입력> => 강도 관리 입력 페이지로 이동
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);

                    this.$store.dispatch('conc/setCompStrg',{ 
                        'concCompStrgLstIds': temp ,'compTest' : true
                    });

                    this.$router.push({ 
                        name: 'CompStrgSetupWrite',
                    })
                } else { // <보기> => 강도 관리 상세 페이지로 이동
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$store.dispatch('conc/setCompStrg',{
                        'concCompStrgLstIds': temp ,'compTest' : false
                    });

                    this.$router.push({
                        name: 'CompStrgSetupWrite'
                    })
                }
            },
            compTestList(){
                const imsi = this.strgListSheet.getRowsByChecked('isCheck')
                if(!imsi || 0 >= imsi.length){
                    return this.alert('선택된 행이 없습니다.');
                }
                else{
                    const imsi2= imsi.filter(row => row.strgTestStt !== 'APRV' && row.strgTestStt !== 'APVL').map(item => item.concCompStrgLstId)
                    if(imsi.length === imsi2.length) {
                        this.$store.dispatch('conc/setCompStrg',{
                            'concCompStrgLstIds': imsi2 ,'compTest' : true
                        });

                        this.$router.push({ 
                            name: 'CompStrgSetupWrite'
                        })
                    } else {
                        return this.alert('결재중, 결재완료된 시험은 입력하실 수 없습니다.');
                    }
                }
            },
            async compTestLog(){
                
                let row = this.strgListSheet.getRowsByChecked('isCheck');
                if(row.length === 0){
                    this.alert(`선택된 행이 없습니다.`);
                    return;
                }
                if(row.length > 1){
                    this.alert(`하나의 행만 선택해주세요.`);
                    return;
                }

                if(!row) {
                    this.alert(`선택된 행이 없습니다.`);
                    return;
                } else if(row[0].strgTestStt != 'APRV'){
                    this.alert(`결재 완료 되지 않은 항목은 \n 출력이 불가능합니다.`);
                    return;
                }else{
                    let url = '/sendApi/api/concrete/strgMngt/type'
                    let payload = {
                        'concCompStrgLstId' : row[0].concCompStrgLstId
                    }

                    await sendPostApi(url, payload).then(rst => {
                        // let ozUrl = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH 
                        let ozUrl = ''

                        let type = rst.data.data.strgTestType

                        if(['7D', '28D'].includes(type)){
                            ozUrl += this.$store.getters['auth/getOzTypeList'][22].jspNm+'&concCompStrgLstId='+row[0].concCompStrgLstId + '&aprvInfoId='+row[0].aprvInfoId
                        }else if(['91D'].includes(type)){
                            ozUrl += this.$store.getters['auth/getOzTypeList'][23].jspNm+'&concCompStrgLstId='+row[0].concCompStrgLstId + '&aprvInfoId='+row[0].aprvInfoId
                        }else{
                            ozUrl += this.$store.getters['auth/getOzTypeList'][24].jspNm+'&concCompStrgLstId='+row[0].concCompStrgLstId + '&aprvInfoId='+row[0].aprvInfoId
                        }
                        
                        window.open(ozUrl, '_blank')
                    })
                }
            },
        }
    }
</script>