<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li 
                    v-for="(tab, index) in tabs"
                    v-bind:class="{active:currentTab===index}" 
                    :key="index"
                >
                    <a 
                        href="javascript:void(0);" 
                        v-on:click="currentTab=index"
                    >
                        {{tab}}
                    </a>
                </li>
            </ul>
        </div>
        <div class="tab_area" v-if="currentTab == 0">
            <div class="inner type2">
                <div class="button_box">
                    <h2>공통 교육</h2>
                    <div class="fr">
                    </div>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" :style="{'height': 'calc(50vh - 185px)'}">
                    <div id="worker1Sheet" class="ibsheet_table" style="height: 100%"></div>
                </div>
                <!-- <sqms-grid
                    id="worker1Sheet"
                    :columns="columns"
                    :data="gridData"
                    :cfg="{
                        NoVScroll: false
                    }"
                    @click="clickgridData"
                    @init="initSheet"
                    @renderFinish="setRowDataChange"
                    ref="worker1Ref">
                </sqms-grid> -->

                <div class="button_box">
                    <h2>공종 교육</h2>
                    <div class="mt10">
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" @click="qrCodeBtn">QR코드 출력</button>
                            <!-- <button type="button" class="btn btn_sm btn_blue" @click="allQrCodeBtn">전체 QR코드 출력</button> -->
                        </div>
                    </div>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" :style="{'height': 'calc(50vh - 185px)'}">
                    <div id="worker2Sheet" class="ibsheet_table" style="height: 100%"></div>
                </div>
                <!-- <sqms-grid
                    id="worker2Sheet"
                    :columns="columns2"
                    :data="gridData2"
                    :cfg="{
                        NoVScroll: false
                    }"
                    @click="clickgridData"
                    @init="initSheet2"
                    ref="worker2Ref">
                </sqms-grid> -->
            </div>

            <file-download-modal
                ref-id="WorkerEduSiteSetUpView_fileDownload"
                modal-title="첨부파일(동영상, PDF)"
                :file-connect-id="data.fileConnectedId"
                file-type="WorkerEdu"
                :file-sub-type="data.fileSubType"
            />

            <!-- 기존 작업 코드 -->
            <!-- <b-modal
                id="FilelstDetail"
                title="첨부파일(동영상, PDF)" 
                hide-backdrop
                size="lg"
            >
            <template #default>
                <div class="pop_container">
                    <LstFile
                        :downloadable="true"
                        :uploadable="false"
                        :lst-file-rst="lstFileRst"
                        :files="files"
                    />
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="$bvModal.hide('FilelstDetail')"
                >
                닫기
                </b-button>
            </template>
            </b-modal> -->
            <!-- 신규 근로자 교육 현황 QR 코드 -->
            <b-modal 
                id="QrcordPrint" 
                title="신규 근로자 교육 현황 QR 코드" 
                hide-backdrop size="lg"
            >
                <template #default>
                    <div class="pop_container">
                        <div class="clearfix">
                            <h2 class="sub_title fl">{{ siteNm }}</h2>
                            <div class="fr">
                                <select v-model="selQrCodeView" class="form_control" style="width:120px" :disabled="disabled">
                                    <option :value="'one'">1 x 1</option>
                                    <option :value="'two'">1 x 2</option>
                                    <option :value="'three'">2 x 2</option>
                                    <option :value="'four'">4 x 4</option>
                                </select>
                            </div>
                        </div>
                        

                        <!-- 단일 QR코드 1x1 -->
                        <div class="lst_qrcord" v-if="selQrCodeView === 'one'">
                            <p class="qr_name mb0">
                                <img src="" alt="qrcord">
                                <strong>건축 / 철근공사</strong>
                            </p>
                        </div>

                        <!-- 리스트형 QR코드 1x2 -->
                        <div class="table_normal_list bdline_none lst_qrcord" v-else-if="selQrCodeView === 'two'">
                            <table>
                                <caption class="sr_only"></caption>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 철근공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>Architecture / Rebar Construction</strong>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- 리스트형 QR코드 2x2 -->
                        <div class="table_normal_list bdline_none lst_qrcord" v-else-if="selQrCodeView === 'three'">
                            <table>
                                <caption class="sr_only"></caption>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 철근공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>Architecture / Rebar Construction</strong>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 철근공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>Architecture / Rebar Construction</strong>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- 리스트형 QR코드 4x4 -->
                        <div class="table_normal_list bdline_none lst_qrcord" v-else>
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="25%">
                                    <col width="25%">
                                    <col width="25%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                        <td>
                                            <p class="qr_name">
                                                <img src="" alt="qrcord">
                                                <strong>건축 / 콘크리트 공사</strong>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
                <template #modal-footer="{ hide }">
                    <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">등록</b-button> -->
                    <b-button class="btn btn_md btn_outline btn_darkgray btn_print">출력</b-button>
                    <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash'
    // import LstFile from '@/pages/common/popup/LstFile';
    import FileDownloadModal from '@modal/common/FileDownloadModal.vue'
    import { commonFn } from '@/script/commonFn.js';
    import { WorkerTrainingSiteSetUp4, WorkerTrainingSiteSetUp5 } from '@/pages/common/data/InspectionList'
    import API from '@/apis/'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import loader from '@ibsheet/loader'
    import { mapGetters } from 'vuex'


    export default {
        name: 'WorkerEduSiteSetUpView',
        mixins: [MsgBoxMixins],
        components: {
            // LstFile,
            Breadcrumb,
            FileDownloadModal,
        },
        computed: {
            ...mapGetters({
                projectId: 'auth/getProjectId'
            })
        },
        data: () => ({
            tabs: ['QR코드 출력'], // tab name
            currentTab: 0, // 기본 current 값 지정 
            columns: [], // 그리드 컬럼
		    gridData: [], // 그리드 데이터
            sheet: null, // 그리드 시트
            columns2: [], // 그리드 컬럼
		    gridData2: [], // 그리드 데이터
            sheet2: null, // 그리드 시트
            files: [],
            lstFileRst : [],
            categoryData: [],
            workerEduMtrlId : '',
            fileSubType : '',
            siteNm: '',
            selQrCodeView : 'one',
            disabled: false,
            ozReport:{src : '',},

            // 사전정보
            advancedInfo: {
                dlWorkerEduLang: [],
                categoryData: [],
            },
            // sheet 정보
            data: {
                educationSheet: null,
                textbooxSheet: null,
                fileConnectedId: '',
                fileSubType: '',
            },
            
        }),
        async created(){
            // this.getCategoryData()
            // this.getWorkerEduLangList()
            // this.getEduCationList()
            // this.columns = WorkerTrainingSiteSetUp4.options.Cols.map(col => { return { ...col, CanEdit : 0 } })
            // this.columns2 = WorkerTrainingSiteSetUp5.options.Cols

            // this.fn_fetchWorkEduLangList()
            // this.fn_fetchCategoryData()
        },
        mounted: async function () {

            Promise.all([
                // new Promise(resolve => this.fn_fetchWorkEduLangList(() => { resolve() })),
                new Promise(resolve => this.fn_fetchCategoryData(() => { resolve() })),
            ]).then(() => {
                this.fn_fetchEduCationList(true)
            })
        },
        methods: {

            fn_fetchWorkEduLangList: async function (callback) {
                try {
                    const response = await API.workerEdu.getWorkerEduLangList()
                    this.advancedInfo.dlWorkerEduLang = response.dlWorkerEduLang

                    if (callback) return callback()
                } catch (error) {
                    console.error('언어 설정 초기 에러: ', error)
                } 
            },
            fn_fetchCategoryData: async function (callback) {
                try {
                    const payload = {
                        codeType: 'EDU'
                    }
                    const response = await await API.workerEdu.getCategoryData(payload)
                    this.advancedInfo.categoryData = response.list

                    if (callback) return callback()
                } catch (error) {
                    console.error('카테고리 설정 에러: ', error)
                }
            },
            fn_fetchEduCationList: async function (init = false) {
                try {
                    const response      = await API.workerEdu.getEduCationList()
                    const eductionData  = response.dlMaterial
                                            .filter(item => item.workerEduType === '1')
                                            .map(row => {
                                                row.gubun = '품질'
                                                row.videoFileConnectYn = row.videoFileConnectId ? '1' : undefined
                                                row.pdfFileConnectYn   = row.pdfFileConnectId ? '1' : undefined
                                                return row
                                            })
                    const textbooxData  = response.dlMaterial
                                            .filter(item => item.workerEduType === '2')
                                            .map(row => {
                                                row.videoFileConnectYn = row.videoFileConnectId ? '1' : undefined
                                                row.pdfFileConnectYn   = row.pdfFileConnectId ? '1' : undefined
                                                return row
                                            })

                    if (init) {
                        const eduOptions = WorkerTrainingSiteSetUp4.options
                        eduOptions.Events = {
                            onAfterClick: (event) => {

                                switch(event.col) {
                                    case 'videoFileConnectYn': {
                                        if (event.row[event.col]) {
                                            this.data.fileConnectedId = event.row.workerEduMtrlId
                                            this.data.fileSubType     = 'video'
                                            this.$bvModal.show('WorkerEduSiteSetUpView_fileDownload')
                                        }
                                        break
                                    }
                                    case 'pdfFileConnectYn': {
                                        if (event.row[event.col]) {
                                            this.data.fileConnectedId = event.row.workerEduMtrlId
                                            this.data.fileSubType     = 'pdf'
                                            this.$bvModal.show('WorkerEduSiteSetUpView_fileDownload')
                                        }
                                        break
                                    }
                                }
                            },
                        }

                        loader.createSheet({
                            el: 'worker1Sheet',
                            data: eductionData,
                            options: eduOptions,
                        }).then(sheet => {
                            this.data.educationSheet = sheet
                        })

                        const tbOptions = WorkerTrainingSiteSetUp5.options
                        const main      = tbOptions.Cols[2]
                        const mid       = tbOptions.Cols[3]
                        main.EnumKeys   = `|${this.advancedInfo.categoryData.map(item => item.mainCodeId).join('|')}`
                        main.Enum       = `|${this.advancedInfo.categoryData.map(item => item.mainName).join('|')}`
                        main.clear      = mid.Name

                        mid.Related     = main.Name
                        this.advancedInfo.categoryData.forEach(item => {
                            mid[`EnumKeys${item.mainCodeId}`] = `|${item.midCodeList.map(inner => inner.midCodeId).join('|')}`
                            mid[`Enum${item.mainCodeId}`] = `|${item.midCodeList.map(inner => inner.midName).join('|')}`
                        })
                        
                        tbOptions.Events = {
                            onAfterClick: event => {
                                switch(event.col) {
                                    case 'videoFileConnectYn': {
                                        if (event.row[event.col]) {
                                            this.data.fileConnectedId = event.row.workerEduMtrlId
                                            this.data.fileSubType     = 'video'
                                            this.$bvModal.show('WorkerEduSiteSetUpView_fileDownload')
                                        }
                                        break
                                    }
                                    case 'pdfFileConnectYn': {
                                        if (event.row[event.col]) {
                                            this.data.fileConnectedId = event.row.workerEduMtrlId
                                            this.data.fileSubType     = 'pdf'
                                            this.$bvModal.show('WorkerEduSiteSetUpView_fileDownload')
                                        }
                                        break
                                    }
                                }
                            }
                        }

                        loader.createSheet({
                            el: 'worker2Sheet',
                            data: textbooxData,
                            options: tbOptions,
                        }).then(sheet => {
                            this.data.textbooxSheet = sheet
                        })
                    } else {
                        if (this.educationSheet) {
                            this.educationSheet.loadSearchData({
                                data: eductionData
                            })
                        }
                        if (this.textbooxSheet) {
                            this.textbooxSheet.loadSearchData({
                                data: textbooxData
                            })
                        }
                    }
                    
                    // loadSearchData
                } catch (error) {
                    console.error('조회 에러: ', error)
                }
            },




            initSheet(sheet) {
                this.sheet = sheet
            },
            initSheet2(sheet) {
                this.sheet2 = sheet
            },
            /**
             * 언어설정 리스트 조회
             */
            async getWorkerEduLangList() {
                try {
                    const response = await API.workerEdu.getWorkerEduLangList()
                    if(response?.dlWorkerEduLang){
                        this.setTopFilterOptions(response.dlWorkerEduLang)
                    }
                } catch (error) {
                    console.error('언어 설정 초기 조회 에러 :', error)
                }
            },
             /**
             * 그리드 상단 셀렉트 옵션 데이터를 세팅합니다.
             * 언어 
             */
            setTopFilterOptions (data) {
                const columns = WorkerTrainingSiteSetUp4.options.Cols
                const columns2 = WorkerTrainingSiteSetUp5.options.Cols

                const allEduLangList = data.map(item => {
                    return {
                        label: item.langName,
                        value: item.langCode
                    }
                })
                if(this.columns?.length){
                    const langNameCol = columns.find(col => col.Name === 'langName')
                    const langNamelabel = allEduLangList.map(item => item.label)
                    const langNameCodes = allEduLangList.map(item => item.value)
                    const langNameEnum = '|' + langNamelabel.join('|')
                    const langNameEnumKeys = '|' + langNameCodes.join('|')
                    langNameCol.EnumKeys = langNameEnumKeys 
                    langNameCol.Enum = langNameEnum 
                }
                if(this.columns2?.length){
                    const langNameCol = columns2.find(col => col.Name === 'langName')
                    const langNamelabel = allEduLangList.map(item => item.label)
                    const langNameCodes = allEduLangList.map(item => item.value)
                    const langNameEnum = '|' + langNamelabel.join('|')
                    const langNameEnumKeys = '|' + langNameCodes.join('|')
                    langNameCol.EnumKeys = langNameEnumKeys 
                    langNameCol.Enum = langNameEnum 
                }
            },
            /**
             * 공종 교재 공종 및 세부 공종 셀렉트 옵션 데이터 세팅
             */
            async getCategoryData () {
                const response = await API.material.getCategoryData()
                if (response.status === 200 && response.data) {
                    // temporary
                    this.categoryData = response.data.list
                    const columns2 = WorkerTrainingSiteSetUp5.options.Cols
                    this.setCategoryList({
                        main: columns2.find(col => col.Name === 'mainCodeId'),
                        mid: columns2.find(col => col.Name === 'midCodeId')
                    })
                }
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
             * 공통 교육 및 공통 교재 불러오기
             */
            async getEduCationList(){
                try {
                    const response = await API.workerEdu.getEduCationList()
                    if(response.dlMaterial){
                        const options = WorkerTrainingSiteSetUp4.options
                        options.Events = {
                            onAfterClick : this.clickgridData,
                            onRenderFinish : this.setRowDataChange,
                        }
                        loader.createSheet({
                            el : 'worker1Sheet',
                            data : this.mappingInitGridData(_.cloneDeep(response.dlMaterial)),
                            options : options
                        }).then(sheet => {
                            this.sheet = sheet
                        })
                        const options2 = WorkerTrainingSiteSetUp5.options
                        options2.Events = {
                            onAfterClick : this.clickgridData,
                            onRenderFinish : this.setRowDataChange,
                        }
                        loader.createSheet({
                            el : 'worker2Sheet',
                            data : this.mappingInitGridData(_.cloneDeep(response.dlMaterial)),
                            options : options2
                        }).then(sheet => {
                            this.sheet2 = sheet
                            
                        })
                    }
                } catch (error) {
                    console.error('공통 교육 및 공통 교재 불러오기 에러 : ',error)
                }
            },
            /**
             * 초기 그리드를 데이터를 가공합니다.
             */
            mappingInitGridData (data) {
                if(!data) return []
                const mappedData = data.map(row => {
                    
                    row.videoFileConnectId = '1'
                    row.pdfFileConnectId = '1'
                    return {
                        ...row
                    }
                })
                return mappedData
            },
            /**
             * 그리드 로드후 데이터 강제 삽입
             */
            setRowDataChange(evt) {
                const rows = evt.sheet.getDataRows()
                rows.forEach(row => {
                    evt.sheet.setValue(row, 'gubun', '품질')
                })
            },
            /**
             * 그리드 첨부파일 동영상 PDF 보기 클릭시 이벤트
             */
            async clickgridData (evt) {
                if(evt.col === 'videoFileConnectId') {
                    this.workerEduMtrlId = evt.row.workerEduMtrlId
                    this.fileSubType = 'video'
                    this.getFileInfoList()
                    this.$bvModal.show('FilelstDetail')
                }
                if(evt.col === 'pdfFileConnectId') {
                    this.workerEduMtrlId = evt.row.workerEduMtrlId
                    this.fileSubType = 'pdf'
                    this.getFileInfoList()
                    this.$bvModal.show('FilelstDetail')
                }
                
            },
            /**
             * 첨부파일 불러오기
             */
            async getFileInfoList() {
                const payload = {
                    fileConnectId : this.workerEduMtrlId,
                    fileType : 'WorkerEdu', //video, pdf
                    fileSubType : this.fileSubType,
                }
                try {
                    const result = await API.concrete.loadFileInfo(payload)
                    if(result?.data){
                        this.lstFileRst = result.data
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },
            qrCodeBtn () {
                const rows = this.data.textbooxSheet.getRowsByChecked('isCheck')
                if(rows.length <= 0) {
                    this.alert('선택된 행이 없습니다.')
                    return
                } else {
                    let urlParam = '';
                    rows.forEach(item => {
                        //if(urlParam[0].length > 0) urlParam + ",";
                        urlParam += item.mainCodeId + "/" + item.midCodeId + "/" + item.langCode + ",";
                    });
                    // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                    this.ozReport.src = this.$store.getters['auth/getOzTypeList'][38].jspNm
                    + '&projectId=' + this.projectId
                    + '&urlParam='     + urlParam
                    window.open(this.ozReport.src, '_blank')
                }
            },
            allQrCodeBtn () {
                const rows = this.data.textbooxSheet.getDataRows();
                let urlParam = '';
                rows.forEach(item => {
                    //if(urlParam[0].length > 0) urlParam + ",";
                    urlParam += item.mainCodeId + "/" + item.midCodeId + "/" + item.langCode + ",";
                });
                /*
                var ozUrl = process.env.VUE_APP_OZ_DOMAIN ? process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH : 'http://61.251.164.137:8080/oz80/sample/viewer'
                var popUrl = ozUrl + "/eduWorker.jsp?urlParam=" + urlParam;
                var popOption = "top=10, left=10, width=1000, height=600, status=no, menubar=no, toolbar=no, resizable=no";
                window.open(popUrl, "WORKER_EDU", popOption);
                */
                // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][38].jspNm
                + '&urlParam='     + urlParam
                window.open(this.ozReport.src, '_blank')
            },
        }
   }
</script>