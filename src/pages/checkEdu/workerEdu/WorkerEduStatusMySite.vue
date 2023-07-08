<template>
<div>
    <div class="lookup_box multi_line">
        <table>
        <caption class="sr_only"></caption>
            <colgroup>
                <col width="6%">
                <col width="22%">
                <col width="5%">
                <col width="22%">
                <col width="5%">
                <col width="22%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>협력사</th>
                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="search.partnrName"></td>              
                    <th>기간</th>
                    <td colspan="3">
                        <DatePickerRange ref="datePicker_range" v-model="search.workerDt" :format="'YYYYMMDD'"/>
                    </td>
                    <td class="ar">
                        <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                    </td>
                </tr>

                <tr>
                    <th>교육구분</th>
                    <td>
                        <select class="form_control size_md" v-model="search.workerEduType">
                            <option
                                v-for="option in workerEduTypeOptions"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </td>
                    <th>공종</th>
                    <td>
                        <select class="form_control size_md"  v-if="search.workerEduType === '1' || search.workerEduType === null || search.workerEduType === ''" disabled>
                            <option value="''"  > 전체 </option>
                        </select>
                        <select class="form_control size_md" v-model="search.mainCodeId" v-else>
                            <option v-if="categoryData.length === 0"> Empty selected </option>
                            <option v-else :value="''"  > 전체 </option>
                            <option
                                v-for="category in categoryData"
                                :key="category.mainCodeId"
                                :value="category.mainCodeId"
                            >
                                {{ category.mainName }}
                            </option>
                        </select>
                    </td>
                    <th>상세공종</th>
                    <td colspan="3">
                        <select class="form_control size_md"  v-if="search.workerEduType === '1' || search.workerEduType === null || search.workerEduType === ''" disabled>
                            <option value="''"  > 전체 </option>
                        </select>
                        <select class="form_control size_md" v-model="search.midCodeId" v-else>
                            <option :value="''" > 전체 </option>
                            <option
                                v-for="category in getMidCategoryList()"
                                :key="category.midCodeId"
                                :value="category.midCodeId"
                            >
                                {{ category.midName }}
                            </option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>

    <div class="inner">
        <div class="button_box">
            <button type="button" class="btn btn_sm btn_excel" @click="exportExcel(sheet)">엑셀 다운로드</button>
            <div class="fr" v-if="subTotal === '0'">
                <button type="button" class="btn btn_sm btn_darkgray" @click="subTotalView">소계 보기</button>
            </div>
            <div class="fr" v-else>
                <button type="button" class="btn btn_sm btn_darkgray" @click="subTotalDelete">기본 보기</button>
            </div>
        </div>

        <!-- ibsheet -->
        <!-- <div class="ib_wrap">
            <div id="workerEduStatusMySite" class="ibsheet_table" :style="{'height' : '250px'}"></div>
        </div> -->
        <!-- ibsheet -->
        <sqms-grid
            id="workerEduStatusMySite"
            :columns="columns"
            :data="gridData"
            :cfg="{
                NoVScroll: false,
                NoDataMessage : 3,
            }"
            :inputStyle="{'height':'610px'}"
            @renderFinish="renderFinish"
            @click="clickgridData"
            @init="initSheet"
            ref="workerEduStatusMySiteRef"
        >  
        </sqms-grid>
    </div>
    <!-- 교육 현황 상세 팝업 -->
    <b-modal id="EducationStatusDetail" title="교육 현황 상세" 
        hide-backdrop size="lg"
    >
        <template #default>
            <div class="pop_container">
                <div class="button_box">
                    <h2>▣협력사 정보</h2>
                </div>
                <div class="lst_data">
                    <div class="line_box">{{ partnrName }}</div>
                </div>

                <div class="button_box">
                    <h2>▣이수한 종목 정보</h2>
                </div>
                <div class="table_normal_list mt20 ac">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>교육구분</th>
                                <th>공종</th>
                                <th>세부 공종</th>
                                <th>교육명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>                                
                                <td>{{workerEduType}}</td>
                                <td>{{ mainName }}</td>
                                <td>{{ midName }}</td>
                                <td>{{ mtrlName }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt20">
                    <div class="button_box">
                        <h2>▣이수자 정보</h2>
                        <div class="fr">
                            <span class="txt_sm"><strong>{{ cpmtCnt }}</strong></span>
                        </div>
                    </div>
                    
                    <div class="lookup_box multi_line">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="*">
                                <col width="140">
                                <col width="*">
                                <col width="240">
                                <col width="160">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>이수자명</th>
                                    <td><input type="text" class="form_control" v-model="searchDtl.workerName"></td>
                                    <th>국적</th>
                                    <td><input type="text" class="form_control" v-model="searchDtl.workerNtnlName"></td>
                                    <td class="ar">
                                        <button type="button" class="btn_reset" @click="searchDataDtl(true)">초기화</button>
                                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchDataDtl(false)">검색</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- ibsheet -->
                    <sqms-grid
                        id="workerEduStatusMySiteDetail2"
                        :columns="columnsDetail2"
                        :data="gridDataDetail2"
                        :cfg="{
                            NoVScroll: false
                        }"
                        :inputStyle="{'height':'250px'}"
                        @init="initSheetDetail2"
                        ref="workerEduStatusMySiteDetail2Ref">  
                    >
                    </sqms-grid>
                </div>

            </div>
        </template>
        <template #modal-footer="{ hide }">
            <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">등록</b-button> -->
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>

    <excel-download
        v-model="excelDownload.request"
        ref-id="WorkerEduStatusMySite_ExcelDownload"
        :file-name="excelDownload.fileName"
        :options="excelDownload.options"
        :data="excelDownload.data"
    />
</div>
</template>

<script>
   import { EducationStatusList} from '@/pages/common/data/InspectionList'
   import { EducationStatusDetail2 } from '@/pages/common/data/PopupList'
   import DatePickerRange from '@component/common/DatePickerRange.vue'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import API from '@/apis/'
   import _ from 'lodash'
   import ExcelDownload from '@component/common/ExcelDownload.vue'
   

   export default {
        name: 'WorkerEduStatusMySite',
        mixins: [MsgBoxMixins],
        components: {
            DatePickerRange,
            ExcelDownload,
        },
        data: () => ({
            columns: [], // 그리드 컬럼
            columnsDetail : [],
            columnsDetail2 : [],
		    gridData: [], // 그리드 데이터
            gridDataDetail : [],
            gridDataDetail2 : [],
            sheet: null, // 그리드 시트
            sheetDetail: null, // 그리드 시트
            sheetDetail2: null, // 그리드 시트
            search: {                                       //검색조건
                partnrName : '',
                workerEduType : '',
                mainCodeId : '',
                midCodeId : '',
                projectId : '',
                allSiteYn : 'N',
                workerDt : [null,null],
                siteMstrId : '',
            },
            workerEduTypeOptions : [
                { label : '전체', value: '' },
                { label : '공통', value: '1' },
                { label : '공종', value: '2' },
            ],
            mainCodeIdOptions : [],
            midCodeIdOptions : [],
            partnrName : '', //협력사 이름
            workerEduType : '', //교육구분
            mainName : '', //대분류명
            midName : '', //중분류명
            mtrlName : '', //교육명
            cpmtCnt : '', //이수자 정보 몇명
            searchDtl : {
                workerName : '', //작업자 이름
                workerNtnlName : '', //국적명
                workerEduMtrlId : '',
                projectId : '',
                partnrId : '',
                siteMstrId : '',
            },
            categoryData : [],
            subTotal: '0',

             //엑셀다운로드
            excelDownload : {
                request : false,
                fileName :'',
                downloadOption :'',
                options : null,
                data : [],
            }
        }),
        async created() {
            
            // 기본 셋팅
            this.search.projectId = this.$store.getters['auth/getProjectId'];
            this.search.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.searchDtl.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            this.columns = EducationStatusList.options.Cols
            this.columnsDetail2 = EducationStatusDetail2.options.Cols
        },
        async mounted() {
            await this.getCategoryData();
            
            await this.getEduCationStatusList(this.search);
        },
        methods: {
            initSheet(sheet) {
                this.sheet = sheet
            },
            initSheetDetail(sheet) {
                this.sheetDetail = sheet
            },
            initSheetDetail2(sheet) {
                this.sheetDetail2 = sheet
            },
            /**
             * 이수기간 세팅
             */
            dataRangeChange(){
                this.search.cmptStartDt = param[0];
                this.search.cmptEndDt = param[1];
            },
            /**
             * 리스트 화면 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData (isReset) {
                if (isReset) {
                    this.search = {
                        partnrName : '',
                        workerEduType : '',
                        mainCodeId : '',
                        midCodeId : '',
                        projectId : this.$store.getters['auth/getProjectId'],
                        allSiteYn : 'N',
                        workerDt : [null,null]
                    }
                }
                return await this.getEduCationStatusList(this.search)
            },
            async clickgridData (evt) {
                // const rowData = evt.sheet.getRowValue(evt.row)
                if(evt.col === 'detailBtn'){
                    this.$bvModal.show('EducationStatusDetail')
                    this.partnrName = evt.row.partnrName
                    this.workerEduType = evt.row.workerEduType
                    this.mainName = evt.row.mainName
                    this.midName = evt.row.midName
                    this.mtrlName = evt.row.mtrlName
                    this.searchDtl.workerEduMtrlId = evt.row.workerEduMtrlId
                    this.searchDtl.partnrId = evt.row.partnrId
                    this.searchDtl.projectId = evt.row.projectId
                    // this.searchDtl.workerEduType = evt.row.projectId

                    return await this.getEduCatorCompleteList(this.searchDtl)
                }
            },
            /**
             * 상세 화면 검색 버튼 클릭 시 발생 이벤트
             * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchDataDtl (isReset) {
                if (isReset) {
                    this.searchDtl.workerName = '' //작업자 이름
                    this.searchDtl.workerNtnlName = '' //국적명
                }
                return await this.getEduCatorCompleteList(this.searchDtl)
            },
            /**
             * 신규 근로자 교육 현황 > 교육현황(내현장) 리스트 조회
             */
            async getEduCationStatusList(payload = this.search) {
                
                payload['cmptStartDt'] = this.search.workerDt[0]
                payload['cmptEndDt'] = this.search.workerDt[1]

                try {
                    const response = await API.workerEdu.getEduCationStatusList(payload)
                    if(response?.dlCurrentState){
                        this.gridData = response.dlCurrentState.map(item => {
                            item.workerEduType = item.workerEduType === '1' ? '공통':'공종'
                            return {
                                ...item,
                            }
                        })
                        this.gridDataDetail2 = response.dlCurrentState
                    }
                } catch (error) {
                    console.error('작업자 현황 > 교육현황(내현장) 리스트 조회 에러 : ', error)
                }
            },
            /**
             * 신규 근로자 교육 현황 > 교육현황(내현장) 작업자 이수 상세리스트 조회
             */
            async getEduCatorCompleteList(payload) {
                try {
                    const response = await API.workerEdu.getEduCatorCompleteList(payload)
                    if(response?.dlCurrentState){
                        this.gridDataDetail2 = response.dlCurrentState.map(item => {
                            item.workerGender = item.workerGender === 'M' ? '남' : '여'
                            item.eduCmptDt = item.eduCmptDt.slice(0,4) + '-' + item.eduCmptDt.slice(4,6) + '-' + item.eduCmptDt.slice(6,8)
                            return{
                                ...item,
                            }
                        })
                    }
                } catch (error) {
                    console.error('작업자 현황 > 교육현황(내현장) 작업자 이수 리스트 조회 에러 : ', error)
                }
            },
            /**
             * 공종 및 세부공종 검색 조건 세팅
             */
            async getCategoryData () {
                try {
                    
                    //여기 수정해야 함
                    const payload = {
                        codeType : 'EDU'
                    }
                    const response = await API.workerEdu.getCategoryData(payload)
                    if(response.list.length > 0) {
                        this.categoryData = response.list
                        this.setCategoryList({
                            main: this.columns.find(col => col.Name === 'mainCodeId'),
                            mid: this.columns.find(col => col.Name === 'midCodeId')
                        })
                    }

                } catch (error) {
                    console.error('getCategory Error', error)
                }
            },
            getMidCategoryList () {
                const selectedCategoryData = this.categoryData.filter(item => item.mainCodeId === this.search.mainCodeId)[0]
                return selectedCategoryData ? selectedCategoryData.midCodeList : []
            },
            setCategoryList(payload) {
                const options = {
                    categoryData: this.categoryData,
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
            },
            /**
             * 그리드 로드후 데이터 세팅
             */
            renderFinish(evt) {
                const rows = evt.sheet.getDataRows()
                rows.forEach(row => {
                    evt.sheet.setValue(row, 'detailBtn', '0')
                })
            },
            subTotalView() {
                const rowData = this.sheet.getDataRows()
                rowData.map(row => {
                    this.sheet.setAttribute(row, "cmptCnt", "CanEdit", 0, 1)
                })
                this.sheet.hideCol("detailBtn")
                this.subTotal = '1'
                this.sheet.makeSubTotal([
                    {
                        stdCol: 'partnrName',
                        sumCols: 'cmptCnt',
                        position: 'bottom',
                    },
                    {
                        stdCol: 'mainName',
                        sumCols: 'cmptCnt',
                        captionCol: [
                            {
                                col: 'mainName',
                                val: '%s: %col',
                            }
                        ],
                        //showCumulate: 1,
                        position: 'bottom',
                        color: '#6F8CB3'
                    }
                ])
                // rowData.map(row=>{
                //     row.makeSubTotal([
                //         {
                //             stdCol: row.partnrName
                //         }
                //     ])
                // })
            },
            subTotalDelete(){
                this.subTotal = '0'
                this.sheet.removeSubTotal();
                this.sheet.showCol("detailBtn")
            },
            exportExcel (sheet) {
                // export Data options
                // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
                // var today = new Date();
                // var year = today.getFullYear();
                // var month = ('0' + (today.getMonth() + 1)).slice(-2);
                // var day = ('0' + today.getDate()).slice(-2);
                // var dateString = year+ month+ day;
                // const options = {
                //     fileName: `WorkerEduStatusMySite_${dateString}.xlsx`,
                //     downRows : 'Visible',
                //     downCols : 'Visible'
                // }
                // this.sheet.exportData(options)
                 this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['detailBtn'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `신규_근로자_교육_현황${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
            }
        }
   }
</script>