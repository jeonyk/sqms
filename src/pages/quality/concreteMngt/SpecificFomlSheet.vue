<template>
  <div>
    <!-- 시방배합 -->
        <div class="lookup_box multi_line">
            <table>
                <colgroup>
                    <col width="7%">
                    <col width="20%">
                    <col width="5%">
                    <col width="20%">
                    <col width="7%">
                    <col width="20%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>공급업체</th>
                        <!-- <td><input type="text" v-model="search_obj.tradeNm" class="form_control" placeholder="입력해주세요" @keyup.enter="searchData(false)"></td> -->
                        <td>
                            <select
                            v-model="search_obj.tradeNm"
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
                            <select 
                                v-model="search_obj.concMixSd"
                                class="form_control"
                            >
                                <option value="" > 전체 </option>
                                <option
                                    v-for="option in categoryData2.filter(item => item.tradeNm === search_obj.tradeNm)"
                                    :key="option.stnd"
                                    :value="option.stnd"
                                >
                                    {{ option.stnd }}
                                </option>
                            </select>
                            <!-- <input type="text" v-model="search_obj.concMixSd" class="form_control" placeholder="입력해주세요" onKeyup="this.value=this.value.replace(/[^-0-9]/g,'');"  maxlength="9" @keyup.enter="searchData(false)"> -->
                        </td>
                        <th>콘크리트 종류</th>
                        <td>
                            <select v-model="search_obj.concType" class="form_control">
                                <option 
                                    v-for="option in concTypeOptions"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                {{ option.label }}
                                </option>
                            </select>
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th>배합기간별 종류</th>
                        <td>
                            <select v-model="search_obj.concCpPrType" id="" class="form_control">
                                <option 
                                    v-for="option in concMixSdOptions"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                {{ option.label }}
                                </option>
                            </select>
                        </td>
                        <th>등록일</th>
                        <td>
                            <DatePickerRange ref="datapicker_range" v-model="inStartEndDt"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="inner">
            <div class="button_box">
                <button
                    type="button"
                    class="btn btn_sm btn_excel"
                    @click="$bvModal.show('SpecificFomlsheet_ExcelUploadModal')"
                >
                    엑셀 업로드
                </button>
                <button type="button" class="btn btn_sm btn_excel" @click="excelDown">엑셀 다운로드</button>
                <label for="HideDensity" class="input_check">
                    <input type="checkbox" name="" id="HideDensity" class="form_control" v-model="isChecked" @click="mildoHiding">
                    <span class="label_text">밀도 숨기기</span>
                </label>
                ※ 시방배합은 자재공급원 승인 완료 후 입력이 가능합니다.
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" @click="fileBatchReg" v-if="checkUser(this.inUser,'write')">첨부일괄등록</button>
                    <!-- <button type="button" class="btn btn_sm btn_darkgray" v-b-modal.ProjectLoad>타 프로젝트 불러오기</button> -->
                    <button type="button" class="btn btn_sm btn_darkgray" @click="copyRow" v-if="checkUser(this.inUser,'write')">행 복사</button>
                    <div class="btn_number">
                        <select
                        v-if="maxAddRowCnt"
                            v-model="addRowsCount"
                            class="form_control num"
                        >
                            <option
                                v-for="count in maxAddRowCnt"
                                :key="count"
                                :value="count"
                            >
                                {{ count }}
                            </option>    
                        </select>
                        <button type="button" class="btn btn_sm" @click="addRow" v-if="checkUser(this.inUser,'write')">행 추가</button>
                    </div>
                    <button type="button" class="btn btn_sm btn_darkgray" @click="deleteRow" v-if="checkUser(this.inUser,'unuse')">행 삭제</button>
                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveBtn" v-if="checkUser(this.inUser,'write')">저장</button>
                </div>
            </div>

            <div class="ib_wrap">
                <div id="spfcSheetTable" class="ibsheet_table" :style="{height: 'calc(100vh - 350px)'}"></div>
            </div>
        </div>
        <b-modal
            id="FileWrite2"
            title="배합표 파일 등록" 
            hide-backdrop
            size="lg"
        >
            <template #default>
            <div class="pop_container">
                <LstFile
                :files="files"
                />
            </div>
            </template>
            <template #modal-footer>
            <b-button
                class="btn btn_md btn_outline btn_darkgray"
                v-if="write"
                @click="saveFile"
            >
                등록
            </b-button>
            <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="$bvModal.hide('FileWrite2')"
            >
                닫기
            </b-button>
            </template>
        </b-modal>

        <!-- 배합표 파일 팝업 -->
        <b-modal
            id="FilelstDetail"
            title="배합표 파일" 
            hide-backdrop
            size="lg"
        >
            <template #default>
            <div class="pop_container">
                <LstFile
                    :downloadable="true"
                    :lst-file-rst="lstFileRst"
                    :files="files"
                    :secondRemoveFileId="secondRemoveFileId"
                    @file-changed="fileChanged"
                    @file-removed="removed"
                />
            </div>
            </template>
            <template #modal-footer>
            <b-button
                class="btn btn_md btn_outline btn_darkgray"
                v-if="write"
                @click="changeFile"
            >
                수정
            </b-button>
            <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="$bvModal.hide('FilelstDetail')"
            >
                닫기
            </b-button>
            </template>
        </b-modal>
        <!-- 배합표 일괄등록 팝업 -->
        <b-modal
            id="FileWrite"
            title="배합표 일괄등록" 
            hide-backdrop
            size="lg"
        >
            <template #default>
            <div class="pop_container">
                <!-- ibsheet -->
                <sqms-grid
                    id="spfcSheetFileBatchTable"
                    :columns="fileColumns"
                    :data="fileGridData"
                    :inputStyle="{'height':'250px'}"
                    :cfg="{
                        NoDataMessage : 3,
                        NoVScroll: false,
                        CanEdit: false,
                    }"
                    ref="spfcSheetFileBatchTableRef"
                >
                </sqms-grid>
                <p class="table_message">
                총 {{ cnt }}개의 배합규격이 선택되었습니다.
                </p>
                <LstFile
                :files="files"
                />
            </div>
            </template>
            <template #modal-footer>
            <b-button
                class="btn btn_md btn_outline btn_darkgray"
                v-if="write"
                @click="saveMultiFile"
            >
                등록
            </b-button>
            <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="$bvModal.hide('FileWrite')"
            >
                닫기
            </b-button>
            </template>
        </b-modal>

        <excel-upload-modal
            ref-id="SpecificFomlsheet_ExcelUploadModal"
            mode="SHEET"
            fileType="SIBANG"
            columnLength="40"
            @import="fn_importExcel"
        /> 

        <excel-download
            v-model="excelDownload.request"
            ref-id="SpecificFomlSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :download-option="excelDownload.downloadOption"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>
</template>
<script>
    import API from '@/apis/'
    import _ from 'lodash'
    import axios from 'axios'
    import loader from '@ibsheet/loader'
    import { ConcreteMix, ConcreteFile } from '@/pages/common/data/MaterialsList';
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import LstFile from '@/pages/common/popup/LstFile';
    import { sendPostApi, requestOptions, requestFileOptions, sendFileApi, sendMultiFileApi } from '../../../apis/common'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ExcelUploadModal from '@modal/common/ExcelUploadModal.vue'
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    export default {
        name: 'SpecificFomlSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            DatePickerRange,
            LstFile,
            PopAlert,
            ExcelUploadModal,
            ExcelDownload,
        },
        data: () => ({
            fileColumns : [],
            fileGridData : [],
            columns: [], // 그리드 컬럼
            gridData: [], // 그리드 데이터
            sheet : null, //그리드 시트
            sheetData: null,
            projectId : '',                    //프로젝트 id
            siteId : '',                       //현장 id
            siteMstrId : '',                   //현장정보id
            ptnrId : '',
            concSpfcFomlId : '',
            tradeNm : '',
            isChecked : false,
            search_obj : {
                tradeNm : '',
                concMixSd : '',
                concType : '',
                concCpPrType : '',
                siteMstrId : '',
            },
            inStartEndDt : [null,null],
            spfc_list_data : [],
            files : [],
            supplyList : [],
            changedList : [],
            fileUploadRow : null,
            concTypeOptions : [
                // { label: '전체', value: '' },
                // { label: '보통 콘크리트', value: 'NMCONC' },
                // { label: '경량 콘크리트', value: 'LWCONC' },
                // { label: '포장 콘크리트', value: 'PKCONC' },
                // { label: '고강도 콘크리트', value: 'HSCONC' },
                // { label: '숏크리트', value: 'SRCONC' },
                // { label: '기타', value: 'ETC' }
            ],
            concMixSdOptions: [
                // { label: '전체', value: '' },
                // { label: '표준(간절기)', value: 'STDR' },
                // { label: '하절기', value: 'SMSS' },
                // { label: '동절기', value: 'WTSS' },
                // { label: 'MAT(배합)저발열', value: 'MALF' },
                // { label: '기타', value: 'ETC' },
            ],
            lstFileRst : [],
            secondRemoveFileId: [],
            blendStandardOptions: [], // 배합규격 옵션
            tradeNmOptions : [], //공급업체 이름
            //행추가시 기본데이터
            addRowData: { ags: 0.2},
            makeConcMixSd: (id) => {
                if (id.includes('-')) return id
                const result = id.slice(0, 2) + '-' + id.slice(2, -3) + '-' + id.slice(-3)
                return result
            },
            cnt : 0,
            multiConcSpfcFomlId : [],
            inUser: '',
            write : true,
            unuse : true,
            down : true,
            addRowsCount : 1,
            maxAddRowCnt : 10,
            categoryData : [],
            categoryData2 : [],

            /** excel */
            excelDownload: {
                request: false,
                fileName: '',
                options: {},
                data: [],
                downloadOption: {}
            },
        }),
        watch : {
            'search_obj.tradeNm' : {
                handler() {
                    this.search_obj.concMixSd = ''
                }
            }
        },
        mounted(){
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
            // this.setConcreteTypeCategory()
            // this.setCategoryList()
            // this.setConcreteMixCategory((result) => {
            //      this.listView();
            // })

            // Promise
            //     .all([
            //         // 콘크리트 종류 불러오고, 검색옵션 콘크리트 종류 설정
            //         this.setConcreteTypeCategory(),
            //         // 배합규격 처리
            //         this.setCategoryList(),
            //         // 배합기간별 종류
            //         this.setConcreteMixCategory(),
            //     ])
            //     .then(() => {
            //         this.listView()
            //     })

            this.fn_initialize()
        },
        created (){
            this.inUser = this.$session.get('userInfo').userId
            this.down = this.checkUser(this.inUser,'down')
            this.write = this.checkUser(this.inUser,'write')
            this.unuse = this.checkUser(this.inUser,'unuse')
            this.fileColumns = ConcreteFile.options.Cols
            
        },
        methods: {
            /** 초기화 세팅  */
            fn_initialize: function () {
                const masterCodeUrl = '/sendApi/api/common/masterCode/list'
                const supplierOptUrl = '/sendApi/api/concrete/supplier/selectOptView'

                const payload = {
                    projectId: this.$store.getters['auth/getProjectId'],
                    siteId: this.$store.getters['auth/getSiteId'],
                    siteMstrId: this.$store.getters['auth/getSiteMstrId'],
                }
                
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.all([
                    axios.post(masterCodeUrl, {groupCode: 'CONC_TYPE_OPTN'}, options),
                    axios.post(masterCodeUrl, {groupCode: 'CONC_MIX_OPTN'}, options),
                    axios.post(supplierOptUrl, payload, options),
                ])
                .then(axios.spread((...response) => {
                    this.setTopFilterConcreteTypeOptions(response[0].data.data)
                    this.setTopFilterConcreteMixOptions(response[1].data.data)

                    if (response[2].data) {
                        this.categoryData  = _.uniqBy([...response[2].data.data], 'tradeNm')
                        this.categoryData2 = response[2].data.data

                        const data = _.uniqBy(this.categoryData2, 'sppr')
                        // console.log('data %o', data)

                        const ptnrId = ConcreteMix.options.Cols.find(col => col.Name === 'ptnrId')
                        const concMixSd = ConcreteMix.options.Cols.find(col => col.Name === 'concMixSd')

                        ptnrId.Enum = `|${data.map(item => item.tradeNm).join('|')}`
                        ptnrId.EnumKeys = `|${data.map(item => item.sppr).join('|')}`

                        ptnrId.Clear = concMixSd.Name
                        concMixSd.Related = ptnrId.Name

                        data.forEach(item => {
                            concMixSd[`Enum${item.sppr}`] = `|${response[2].data?.data?.filter(item2 => item2.sppr === item.sppr).map(inner => this.makeConcMixSd(inner['stnd'])).join('|')}`
                            concMixSd[`EnumKeys${item.sppr}`] = `|${response[2].data?.data?.filter(item2 => item2.sppr === item.sppr).map(inner => this.makeConcMixSd(inner['stnd'])).join('|')}`
                        })
                    }
                }))
                .catch(() => {
                })
                .then(() => {
                    this.listView()
                })
            },

            
            /** 검색조건 배합규격 - 3 , 6 자리에 들어가서 조회*/
            // setTopFilterOptions ( data ) {
            //     const all = { label: '전체', value: null }
            //     const allConcMixSd = data.map(item => {
            //         return {
            //             label: this.makeConcMixSd(item.concMixSd),
            //             value: this.makeConcMixSd(item.concMixSd),
            //         }
            //     })

            //     this.blendStandardOptions = [all, ..._.uniqBy(allConcMixSd, 'value')]
            // },
            /** 검색 옵션 콘크리트 종류 설정 */
            setTopFilterConcreteTypeOptions ( data ) {
                const all = { label : '전체', value: ''}
                const allConcreteOption = data.map(item => {
                    return {
                        label: item.codeNameKr,
                        value: item.codeVal,
                    }
                })
                this.concTypeOptions = [all, ..._.uniqBy(allConcreteOption, 'value')]

                const columns = ConcreteMix.options.Cols
                if(columns?.length) {
                    // 공급업체 셀렉트 옵션 리스트 세팅
                    let concTypeCol = columns.find(col => col.Name === 'concType')
                    let concTypelabel = allConcreteOption.map(item => item.label)
                    let concTypeCodes = allConcreteOption.map(item => item.value)
                    let concTypeEnum = '|' + concTypelabel.join('|')
                    let concTypeEnumKeys = '|' + concTypeCodes.join('|')
                    concTypeCol.EnumKeys = concTypeEnumKeys
                    concTypeCol.Enum = concTypeEnum
                }
            },
            /** 검색 옵션 콘크리트 종류 설정 */
            setTopFilterConcreteMixOptions ( data ) {
                const all = { label : '전체', value: ''}
                const allConcreteOption = data.map(item => {
                    return {
                        label: item.codeNameKr,
                        value: item.codeVal,
                    }
                })
                this.concMixSdOptions = [all, ..._.uniqBy(allConcreteOption, 'value')]

                const columns = ConcreteMix.options.Cols
                if(columns?.length) {
                    // 공급업체 셀렉트 옵션 리스트 세팅
                    let concTypeCol = columns.find(col => col.Name === 'concCpPrType')
                    let concTypelabel = allConcreteOption.map(item => item.label)
                    let concTypeCodes = allConcreteOption.map(item => item.value)
                    let concTypeEnum = '|' + concTypelabel.join('|')
                    let concTypeEnumKeys = '|' + concTypeCodes.join('|')
                    concTypeCol.EnumKeys = concTypeEnumKeys
                    concTypeCol.Enum = concTypeEnum
                }
            },
            /** 콘크리트 종류 불러오기 */
            async setConcreteTypeCategory() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                     
                  let url = '/sendApi/api/common/masterCode/list';
                  const payload = {
                        groupCode: 'CONC_TYPE_OPTN',
                        useYn : 'USE_YN'
                    }
                  
                  try {
                     const response = await sendPostApi(url, payload);
                     if (response.status === 200 && response.data) {
                        this.setTopFilterConcreteTypeOptions(response.data.data)
                     }
                  } catch (error) {
                     console.error('콘크리트 종류 불러오기 에러: ',error)
                  }
            },
            /** 배합기간별 종류 불러오기 */
            async setConcreteMixCategory(callback) {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                     
                  let url = '/sendApi/api/common/masterCode/list';
                  const payload = {
                        groupCode: 'CONC_MIX_OPTN',
                        useYn : 'USE_YN'
                    }
                  
                  try {
                     const response = await sendPostApi(url, payload);
                     if (response.status === 200 && response.data) {
                        this.setTopFilterConcreteMixOptions(response.data.data)
                     }
                     if (callback) return callback(true)
                  } catch (error) {
                     console.error('배합기간별 종류 불러오기 에러 : ',error)
                  }
            },
            /**
             * 공급업체 클릭시 공급업체의 맞는 배합규격 불러오기
             */
            async setCategoryList() {
                try {
                    const param = {
                        projectId : this.$session.get('userInfo').projectId,
                        siteId :this.$session.get('userInfo').siteId,
                        siteMstrId : this.$store.getters['auth/getSiteMstrId']
                    }
                    const response = await API.concrete.getSupplierSelectOptView(param)
                    if(response?.data){
                        this.categoryData = _.uniqBy([...response.data], 'tradeNm')
                        this.categoryData2 = response.data
                        // this.categoryData = _.uniqBy([...response.data], 'tradeNm')
                        const options = {
                            ptnrIdData: _.uniqBy([...response.data], 'sppr'),
                            concMixSdData : response.data,
                            seperator: '|',
                            key:'sppr',
                            value: 'stnd',
                            innerObjectKey: 'stnd',
                            main: ConcreteMix.options.Cols.find(col => col.Name === 'ptnrId'),
                            mid: ConcreteMix.options.Cols.find(col => col.Name === 'concMixSd'),
                        }
                        if(!(options.main && options.mid)) return callback(false);

                        options.main.Enum = `${options.seperator}${options.ptnrIdData.map(item => item.tradeNm).join(options.seperator)}`
                        options.main.EnumKeys = `${options.seperator}${options.ptnrIdData.map(item => item.sppr).join(options.seperator)}`
                        
                        options.main.clear = options.mid.Name
                        options.mid.Related = options.main.Name
                        options.ptnrIdData.forEach(item => {
                            options.mid[`Enum${item['sppr']}`] = `${options.seperator}${options.concMixSdData.filter(item2=> item2.sppr === item.sppr).map(inner => this.makeConcMixSd(inner['stnd'])).join(options.seperator)}`
                            options.mid[`EnumKeys${item['sppr']}`] = `${options.seperator}${options.concMixSdData.filter(item2=> item2.sppr === item.sppr).map(inner => this.makeConcMixSd(inner['stnd'])).join(options.seperator)}`
                        })
                    } 

                } catch (error) {
                    console.error('공급 업체 조회 에러: ', error)
                }
            },
            
            /**
             * 시방배합 리스트 조회
             */
            async listView(payload = this.search_obj) {
                let options = ConcreteMix.options
                options.Events = {
                    // onRenderFirstFinish: () => {
                    onRenderFirstFinish: async () => {
                        payload['siteMstrId'] = this.siteMstrId

                        if(this.inStartEndDt[0] != null && this.inStartEndDt[1] != null){
                            payload['inStartDt'] = this.inStartEndDt[0]
                            payload['inEndDt'] = this.inStartEndDt[1]
                            // payload['siteMstrId'] = this.$session.get('userInfo').siteMstrId
                        }
                        const sheetPayload = {
                            ...payload,
                            concMixSd: payload.concMixSd.replaceAll('-', ''),
                        }
                        try {
                            const response = await API.concrete.getSpecificFomlList(sheetPayload)
                            if(response?.datas.length > 0){
                                this.sheetData = this.mappingInitGridData(response.datas)
                                this.sheet.loadSearchData({
                                    // data: this.mappingInitGridData(response.datas)
                                    data: this.sheetData,
                                })
                                // this.setTopFilterOptions(response.datas)
                            } 
                        } catch (error) {
                            console.error('시방배합 조회 에러 : ', error)
                        }
                    },
                    onAfterClick: (evt) => {
                        this.clickGrid(evt)
                    },
                    onAfterChange: (evt) => {
                        this.dataChange(evt)
                    },
                    onDataLoad: (evt) => {
                        this.onDataLoad(evt)
                    },
                }

                loader.createSheet({
                    el: 'spfcSheetTable',
                    data : [],
                    options : options
                }).then(sheet => {
                    this.sheet = sheet
                })
            },
            /** 데이터 로드후 이벤트 */
            onDataLoad(evt) {

                // loadSearchData <= 이후에 발생
                let rowData = this.sheet.getDataRows()
                rowData.forEach(row => {
                    if(row.concSpfcFomlId != '' && row.concSpfcFomlId != null){
                        evt.sheet.setAttribute(row, 'ptnrId', 'CanEdit', 0, 1)
                        evt.sheet.setAttribute(row, 'concMixSd', 'CanEdit', 0, 1)
                        evt.sheet.setAttribute(row, 'concType', 'CanEdit', 0, 1)
                        evt.sheet.setAttribute(row, 'concCpPrType', 'CanEdit', 0, 1)
                    }
                })
            },
            /**
             * 초기 그리드 데이터를 가공합니다
             */
            mappingInitGridData (data) {
                if(!data) return []

                const mappedData = data.map(row => {
                    row.concMixFileId =  row.concMixFileId != null ? '1' : '0'
                    row.inDttm = row.inDttm.split('T')[0]
                    row.upDttm = row.upDttm.split('T')[0]
                    return {
                        ...row,
                    }
                })
                return mappedData
            },
            /**
             * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
		     * @param {Boolean} isReset 초기화 버튼 클릭인지?
             */
            async searchData(isReset) {
                if(isReset){
                    this.search_obj = {
                        tradeNm : '',
                        concMixSd : '',
                        concType : '',
                        concCpPrType : '',
                    }
                    this.inStartEndDt = [null,null]
                }
                return await this.listView(this.search_obj)
            },
            /** 행복사 이벤트 */
            copyRow(){
                let sheet = this.sheet;
                let checkedRows = [];
                let checkColumn = 'isChecked';
                
                checkedRows = sheet.getRowsByChecked(checkColumn);
                if(checkedRows.length === 0) {
                    return this.alert('복사할 행을 선택해주세요.');
                }
                let copiedRows = sheet.copyRows(checkedRows, sheet.getFirstRow());
                copiedRows.forEach(item => {
                    item['isChecked'] = 0;
                    sheet.refreshCell(item, checkColumn)
                    sheet.setAttribute(item, 'ptnrId', 'CanEdit', 1, 1)
                    sheet.setAttribute(item, 'concMixSd', 'CanEdit', 1, 1)
                    sheet.setAttribute(item, 'concType', 'CanEdit', 1, 1)
                    sheet.setAttribute(item, 'concCpPrType', 'CanEdit', 1, 1)
                })
            },
            /** 행추가 이벤트 */
            addRow(){
                this.sheet.getRowsByChecked(ConcreteMix.options.Cols[0].Name)
                for(let i = 0; i < this.addRowsCount; i++){
                    this.sheet.addRow({ next: this.sheet.getFirstRow(), init: this.addRowData})
                }
                // this.sheet.addRows({
                //     count: this.addRowsCount,
                //     next: this.sheet.getFirstRow()
                //     // next: checkedRows.length > 0 ? checkedRows[0].nextSibling : null
                // })
            },
            /** 행삭제 이벤트 */
            deleteRow(){
                const checkedRows = this.sheet.getRowsByChecked(ConcreteMix.options.Cols[0].Name)
                if(checkedRows.length === 0) {
                    return this.alert('삭제할 행을 선택해주세요.');
                }
                this.sheet.deleteRows(checkedRows)
                checkedRows.forEach(item => {
                    this.sheet.hideRow({
                        row: item,
                        del: false,
                        norender: false
                    })
                    item['isChecked'] = 0;
                })
            },
            /**
             * 그리드 클릭 이벤트
             */
            async clickGrid(evt) {
                const rowData = evt.sheet.getRowValue(evt.row)
                if(evt.col === 'concMixFileId') {
                    if (rowData.concMixFileId == '0') { // 등록
                        this.concSpfcFomlId = rowData.concSpfcFomlId
                        this.files = []
                        this.$bvModal.show('FileWrite2')
                    } else { // 보기
                        this.concSpfcFomlId = rowData.concSpfcFomlId
                        this.getFileInfoList()
                        this.$bvModal.show('FilelstDetail')
                    }
                }
            },
            dataChange(evt){
                if(evt.col === 'ptnrId'){
                    evt.row.concMixSd = ""
                    evt.row.concType = ""
                    evt.row.concCpPrType = ""
                    evt.sheet.refreshRow(evt.row)
                }
            },
            /**
             * 그리드 > [저장] 버튼 클릭 시 발생 이벤트
             */
            async saveBtn () {
                /** 수정 또는 추가 된 데이터가 있는지 확인 */
                const sheetData = this.sheet.getSaveJson({
                    saveMode : 2
                })
                if(sheetData.data.length === 0){
                    return this.alert('저장할 데이터가 없습니다.')
                }
                /**
                 * 저장전 유효성 체크
                 */
                const valiData = this.sheet.getSaveJson({
                    saveMode : 1
                })
                let data = valiData.data
                for (let i = 0; i < data.length; i++) {
                    if(!data[i].ptnrId){
                        return this.alert(`${i+1} 번째 행의 공급업체를 선택해주세요.`)
                    }
                    if(!data[i].concMixSd){
                        return this.alert(`${i+1} 번째 행의 배합규격을 선택해주세요.`)
                    }
                    if(!data[i].concType){
                        return this.alert(`${i+1} 번째 행의 콘크리트종류를 선택해주세요.`)
                    }
                    if(!data[i].concCpPrType){
                        return this.alert(`${i+1} 번째 행의 배합기간별 종류를 선택해주세요.`)
                    }
                    if(data[i].w10 === ''){
                        return this.alert(`${i+1} 번째 행의 청수(W1)를 입력해주세요.`)
                    }
                    if(data[i].w2 === ''){
                        return this.alert(`${i+1} 번째 행의 회수수(W2)를 입력해주세요.`)
                    }
                    if(data[i].ags === ''){
                        return this.alert(`${i+1} 번째 행의 골재 수정계수를 입력해주세요.`)
                    }
                }
                /** 중복된 데이터 검증 */
                const dupli1 = this.sheet.getRowsByDup("ptnrId,concMixSd,concType,concCpPrType", false, false,false, "Deleted")
                // const dupli2 = this.sheet.getRowsByDup("concMixSd", false, false,false, "Deleted")
                // const dupli3 = this.sheet.getRowsByDup("concType", false, false,false, "Deleted")
                // const dupli4 = this.sheet.getRowsByDup("concCpPrType", false, false,false, "Deleted")
                const dupli5 = this.sheet.getRowsByDup("w1", false, false,false, "Deleted")
                const dupli6 = this.sheet.getRowsByDup("w2", false, false,false, "Deleted")
                const dupli7 = this.sheet.getRowsByDup("ags", false, false,false, "Deleted")
                if(dupli1.length > 0 ){ //&& dupli5.length > 0 && dupli6.length > 0 && dupli7.length > 0 && dupli2.length > 0 && dupli3.length > 0 && dupli4.length > 0
                    return this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.')
                }
                /** 유효성 체크 끝 */
                /** 저장 시작 */
                this.confirm('저장하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('저장에 실패하였습니다.')
                    }
                    try {
                        let payload = sheetData.data.map(item => {
                            return {
                                ...item,
                                status : item.STATUS,
                                siteMstrId : this.$store.getters['auth/getSiteMstrId'],
                                concMixSd : this.makeConcMixSd(item.concMixSd)
                            }
                        })
                        const result = await API.concrete.insertSpecificFoml(payload)

                        if(result?.count > 0){
                            this.alert('저장되었습니다.')
                            await this.listView(this.search_obj)
                        } else {
                            failSave()
                        }
                    } catch (error) {
                        console.error('시방배합 저장에 실패하였습니다.', error)
                        failSave()
                    }
                })
            },
            /** 파일저장 이벤트 */
            saveFile() {
                if(this.down === false){
                    this.alert('권한이 없습니다.')
                } else {
                    if(!this.files.length){
                        this.alert('선택된 파일이 없습니다.')
                    } else {
                        this.confirm('저장하시겠습니까?', async () => {
                            try {
                                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                const result = await sendFileApi(
                                    this.concSpfcFomlId, // fileConnectId
                                    'ConcreteMngt', // fileType
                                    this.files // files
                                )
                                if(result?.data) {
                                    const insertFile = await API.concrete.getSpecificFomlFileChange({
                                        concMixFileId : this.concSpfcFomlId,
                                        concSpfcFomlId: this.concSpfcFomlId,
                                    })
                                    if (insertFile) {
                                        if (insertFile?.data.rCode === '0000') { // 성공
                                            this.files = []
                                            this.$bvModal.hide('FileWrite2')
                                            this.$bvModal.hide('FilelstDetail')
                                            this.alert('저장되었습니다.')
                                            return await this.listView() 
                                        } else {
                                            let failMsg = insertFile?.json?.rMsg ? insertFile.json.rMsg : '저장에 실패했습니다.'
                                            return this.alert(failMsg)
                                        }
                                    }
                                }else return this.alert('저장에 실패했습니다.')
                            } catch (error) {
                                console.error('시방배합 파일 변경 에러: ', error)
                                return this.alert('저장에 실패했습니다.')
                            }
                        })
                    }
                }
            },
            /** 파일 수정 이벤트 */
            async changeFile () {
                if(!this.files?.length && this.secondRemoveFileId.length === 0) return this.alert('수정된 파일이 없습니다.')
                this.confirm('수정하시겠습니까?', async () => {
                    if(this.secondRemoveFileId.length > 0 && this.files.length === 0){
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                        const payload = { fileType : "ConcreteMngt", fileQltArcvIds : this.secondRemoveFileId}
                        const deleteFile = await sendPostApi('/sendApi/api/file/fileUnUse', payload)
                        if(deleteFile?.status === 200){
                            const insertFile = await API.concrete.getSpecificFomlFileChange({
                            concMixFileId : this.concSpfcFomlId,
                            concSpfcFomlId: this.concSpfcFomlId,
                            })
                            if (insertFile) {
                                if (insertFile?.data.rCode === '0000') { // 성공
                                    this.$bvModal.hide('FileWrite2')
                                    this.$bvModal.hide('FilelstDetail')
                                    this.alert('수정되었습니다.')
                                    this.files = []
                                    return await this.listView() 
                                } else {
                                    let failMsg = insertFile?.json?.rMsg ? insertFile.json.rMsg : '수정에 실패했습니다.'
                                    return this.alert(failMsg)
                                }
                            }
                        } else {
                            this.alert('수정에 실패했습니다.') 
                            this.secondRemoveFileId = []
                        }
                    } else if(this.secondRemoveFileId.length > 0 && this.files.length > 0){
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                        const payload = { fileType : "ConcreteMngt", fileQltArcvIds : this.secondRemoveFileId}
                        const deleteFile = await sendPostApi('/sendApi/api/file/fileUnUse', payload)
                        if(deleteFile?.status === 200){
                            const result = await sendFileApi(
                            this.concSpfcFomlId, // fileConnectId
                            'ConcreteMngt', // fileType
                            this.files // files
                            )
                            if(result?.data) {
                                this.files = []
                                this.$bvModal.hide('FileWrite2')
                                this.$bvModal.hide('FilelstDetail')
                                this.alert('수정되었습니다.')
                                return await this.listView()
                            } else {
                                return this.alert('수정에 실패했습니다.')
                            }
                        } else {
                            this.alert('수정에 실패했습니다.') 
                            this.secondRemoveFileId = []
                        }
                    } else if(this.secondRemoveFileId.length === 0 && this.files.length > 0) {
                        const result = await sendFileApi(
                        this.concSpfcFomlId, // fileConnectId
                        'ConcreteMngt', // fileType
                        this.files // files
                        )
                        if(result?.data) {
                            this.files = []
                            this.$bvModal.hide('FileWrite2')
                            this.$bvModal.hide('FilelstDetail')
                            this.alert('수정되었습니다.')
                            return await this.listView()
                        } else {
                            return this.alert('수정에 실패했습니다.')
                        }
                    }
                })
            },
            /** 클릭된 파일불러오기 */
            async getFileInfoList() {
                const payload = {
                    fileConnectId : this.concSpfcFomlId,
                    fileType : 'ConcreteMngt',
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
            /** 파일 체인지 이벤트 */
            fileChanged(payload) {
                this.files = payload
            },
            /**
             * 파일 삭제
             */
            removed(id) {
                this.secondRemoveFileId = id   
            },
            /**
             * 파일 일괄등록
             */
            fileBatchReg () {
                const checkedRows = this.sheet.getRowsByChecked(ConcreteMix.options.Cols[0].Name)
                if(checkedRows.length === 0) {
                    return this.alert('선택된 행이 없습니다.');
                }
                this.fileGridData = checkedRows
                this.cnt = checkedRows.length
                this.multiConcSpfcFomlId = checkedRows.map(item => item.concSpfcFomlId)
                this.$bvModal.show('FileWrite')
            },
            /** 파일일괄등록 저장 이벤트 */
            saveMultiFile () {
                this.confirm('저장하시겠습니까?', async() => {
                    const result = await sendMultiFileApi(
                        this.multiConcSpfcFomlId, // fileConnectId
                        'ConcreteMngt', // fileType
                        this.files // files
                    )
                    if(result?.data) {
                        const insertFile = await API.concrete.getSpecificFomlMultiFileChange({
                            connectId :  this.multiConcSpfcFomlId
                        })
                        if(insertFile?.data.rCode === '0000'){
                            this.files = []
                            this.$bvModal.hide('FileWrite')
                            this.alert('저장되었습니다.')
                            return await this.listView() 
                        }
                    }else return this.alert('저장에 실패했습니다.')
                })
            },
            /** 밀도 숨기기 이벤트 */
            mildoHiding(){
                if(this.isChecked === true){
                    this.sheet.showCol('dsC1', 1)
                    this.sheet.showCol('dsHsc', 1)
                    this.sheet.showCol('dsW1', 1)
                    this.sheet.showCol('dsW2', 1)
                    this.sheet.showCol('dsS1', 1)
                    this.sheet.showCol('dsS2', 1)
                    this.sheet.showCol('dsS3', 1)
                    this.sheet.showCol('dsG1', 1)
                    this.sheet.showCol('dsG2', 1)
                    this.sheet.showCol('dsC2', 1)
                    this.sheet.showCol('dsC3', 1)
                    this.sheet.showCol('dsC4', 1)
                    this.sheet.showCol('dsAd1', 1)
                    this.sheet.showCol('dsAd2', 1)
                    this.sheet.showCol('dsAd3', 1)
                }else{
                    this.sheet.hideCol('dsC1', 1)
                    this.sheet.hideCol('dsHsc', 1)
                    this.sheet.hideCol('dsW1', 1)
                    this.sheet.hideCol('dsW2', 1)
                    this.sheet.hideCol('dsS1', 1)
                    this.sheet.hideCol('dsS2', 1)
                    this.sheet.hideCol('dsS3', 1)
                    this.sheet.hideCol('dsG1', 1)
                    this.sheet.hideCol('dsG2', 1)
                    this.sheet.hideCol('dsC2', 1)
                    this.sheet.hideCol('dsC3', 1)
                    this.sheet.hideCol('dsC4', 1)
                    this.sheet.hideCol('dsAd1', 1)
                    this.sheet.hideCol('dsAd2', 1)
                    this.sheet.hideCol('dsAd3', 1)
                }
            },
            /** excel upload modal */ 
            fn_importExcel: function (data) {
                this.sheet.loadSearchData({
                    data:data.map(item => {
                        item.Added = 1
                        return item
                    }),
                    append: true,
                    next:   this.sheet.getFirstRow()
                })
            },
            /** 엑셀 다운로드 */
            fn_excelDown(){
                this.sheet.down2Excel({
                    merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                    downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                    reqHeader:  {
                                    'Authorization': this.$cookies.get('Authorization'),
                                    'Accept-Language': 'ko'
                                },
                    fileName:   `시방배합_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                })
            },

            excelDown: function () {
                this.excelDownload.options   = {
                    Cfg: ConcreteMix.options.Cfg,
                    // Cols: ConcreteMix.options.Cols.filter((item) => !['isChecked'].includes(item.Name))
                    Cols: ConcreteMix.options.Cols.filter(item => !['isChecked','concMixFileId'].includes(item.Name)),
                }
                this.excelDownload.fileName  = `시방배합_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data      = this.sheetData
                this.excelDownload.request   = true
            },
            async batchTest() {
            console.log('배치시작1')
            try {
                console.log('배치시작2')
                const response = await API.houseOptn.getbatchTest()
                console.log(response)
            } catch (error) {
                
            }
        }
        }
    }
</script>