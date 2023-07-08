<template>
    <section class="tab_contents">
        <!-- <h2 class="sub_title">자재관리 > 자재공급원 승인</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li
                    v-for="(item, index) in tab.list.filter((tabType) => (userType === 'PTNR' ? tabType === 'My Site' : true ))"
                    :class="{active: tab.current === index}"
                    :key="index"
                >
                    <a
                        @click="tab.current = index"
                    >
                        {{ item }}
                    </a>
                </li>
            </ul>
        </div>

        <!-- My Site -->
        <div class="tab_area submenu_on" >
            <div class="lookup_box multi_line">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="6%">
                        <col width="16%">
                        <col width="5%">
                        <col width="16%">
                        <col width="5%">
                        <col width="16%">
                        <col width="5%">
                        <col width="16%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr
                            v-if="tab.current === 1"
                        >
                            <th>프로젝트명</th>
                            <td colspan="7">
                                <div class="form_area">
                                    <select
                                        v-model="search.box.manageCd"
                                        class="form_control"
                                    >
                                        <option :value="''">전체</option>
                                        <option :value="'0'">관리</option>
                                        <option :value="'1'">비관리</option>
                                        <option :value="'2'">준공</option>
                                        
                                    </select>

                                    <input
                                        v-model="search.box.projNm"
                                        class="form_control"
                                        type="text"
                                        placeholder="입력해주세요"
                                        @keyup.enter="clickSearchBox"
                                    />
                                </div>
                            </td>

                            <td class="ar vat" rowspan="3">
                                <button 
                                    type="button" 
                                    class="btn_reset"
                                    @click="clickResetSearchBox"
                                >
                                    초기화
                                </button>
                                <button 
                                    type="button" 
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"    
                                    @click="clickSearchBox"
                                >
                                    검색
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <th>품명</th>
                            <td>
                                <input 
                                    v-model="search.box.prdtNm"
                                    class="form_control size_md" 
                                    type="text"
                                    placeholder="입력해주세요"
                                    @keyup.enter="clickSearchBox"
                                />
                            </td>

                            <th>공종</th>   
                            <td>
                                <select
                                    v-model="search.box.mainCodeId"
                                    class="form_control size_md"
                                >
                                    <!-- <option value="" selected>공종</option> -->
                                    <option v-if="categoryData.length === 0" disabled > Empty selected </option>
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
                            <th>세부 공종</th>
                            <td>
                                <select
                                    v-model="search.box.midCodeId"
                                    class="form_control size_md"
                                >
                                    <!-- <option value="" selected>세부 공종</option> -->
                                    <!-- <option v-if=" categoryData.filter(item => item.id === search.mainCode).inner.length === 0" disabled > Empty selected </option> -->
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

                            <th v-if="tab.current === 0" >현황</th>
                            <td v-if="tab.current === 0" >
                                <select
                                    v-model="search.box.status"
                                    class="form_control size_md"
                                >
                                    <option value="">전체</option>
                                    <option value="APRV">승인</option>
                                    <option value="APVL">결재 중</option>
                                    <option value="REGT">등록</option>
                                </select>
                            </td>

                            <td 
                                v-if="tab.current === 0"                            
                                class="ar"
                            >
                                <button 
                                    type="button" 
                                    class="btn_reset"
                                    @click="clickResetSearchBox"
                                >
                                    초기화
                                </button>
                                <button 
                                    type="button" 
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"    
                                    @click="clickSearchBox"
                                >
                                    검색
                                </button>
                            </td>
                        </tr>
                        
                        <tr>
                            <th> 규격 </th>
                            <td>
                                <input 
                                    v-model="search.box.stnd"
                                    class="form_control size_md" 
                                    type="text"
                                    placeholder="입력해주세요"
                                    @keyup.enter="clickSearchBox"
                                />
                            </td>

                            <th> 공급업체 </th>
                            <td>
                                <input 
                                    v-model="search.box.sppr"
                                    class="form_control size_md" 
                                    type="text"
                                    placeholder="입력해주세요"
                                    @keyup.enter="clickSearchBox"
                                />
                            </td>

                            <th> 제조업체 </th>
                            <td>
                                <input 
                                    v-model="search.box.mnft"
                                    class="form_control size_md" 
                                    type="text"
                                    placeholder="입력해주세요"
                                    @keyup.enter="clickSearchBox"
                                />
                            </td>

                            <th>승인결과</th>
                            <td>
                                <select
                                    v-model="search.box.apprResult"
                                    class="form_control size_md"
                                >
                                    <option value="">전체</option>
                                    <option value="PASS">적합</option>
                                    <option value="UNPASS">부적합</option>
                                    <option value="PART">조건부 적합</option>
                                </select>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
            

            <tree-category-tab
                :category-data="categoryData"
                :use-check-box="search.tab.useCheckBox"
                @changed-checked-list="changedTabCheckedList"
            />

            <div class="right_content">
                <div class="inner">
                    <div class="button_box">
                        <button
                            type="button"
                            class="btn btn_sm btn_excel"
                            @click="fn_exportExcel"
                        >
                            엑셀 다운로드
                        </button>
                        
                        <button
                            v-if="userDownloadable"
                            type="button"
                            class="btn btn_sm btn_outline btn_darkgray btn_print"
                            @click="print"
                        >
                            {{'출력'}}
                        </button>
                        <button
                            v-if="tab.current === 0 && userDownloadable"
                            type="button"
                            class="btn btn_sm btn_darkgray"
                            @click="fn_clickOzreport"
                        >
                            {{'요청,결과통보내용'}}
                        </button>
                        <label for="hiddenCol" class="input_check">
                            <input type="checkbox" id="hiddenCol" class="form_control" @change="hiddenCol" v-model="hiddenCheck">
                            <span class="label_text">목록 숨기기</span>
                        </label>
                        <!-- <b-button
                            type="button"
                            @click="$bvModal.show('MaterialSourceApprovalSheet_AprvView')"
                        >
                            테스트
                        </b-button> -->

                        <div class="fr" v-if="tab.current === 0" >
                            <button
                                v-if="userWritable"
                                type="button"
                                class="btn btn_sm btn_darkgray"
                                @click="clickRegister"
                            >
                                신규등록
                            </button>
                            <button
                                v-if="userWritable"
                                type="button"
                                class="btn btn_sm btn_darkblue"
                                @click="clickApproval"
                            >
                                결재상신
                            </button>

                        </div>
                    </div>

                    <div class="ib_wrap"  :style="{height: 'calc(100vh - 370px)'}">
                        <div id="MaterialSpApprSheet" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>

            </div>
        </div>



        <pop-alert
            pop-id="approvalSimpleAlert"
            :msg="popup.msg"
            :btn-name="{first: '확인'}"
            @first-btn-fn="$bvModal.hide('approvalSimpleAlert')"
        />

        <pop-alert
            pop-id="approvalSaveAlert"
            :msg="popup.msg"
            confirm-use
            :btn-name="{first : '확인', second : '취소'}"
            @first-btn-fn="saveApprovalData"
            @second-btn-fn="$bvModal.hide('approvalSaveAlert')"
        />

        <approve
            ref-id="MaterialSourceApprovalSheet_Approve"
            :code-type="approve.codeType"
            :code-dtl-type="approve.codeDtlType"
            :main-code-id="approve.mainCodeId"
            :mid-code-id="approve.midCodeId"
            :request-id="approve.requestId"
            :doc-name="approve.docName"
            doc-type="MTRL"
            :doc-seq="approve.docSeq"
            :file-type="approve.fileType"
            :site-mstr-id="approve.siteMstrId"
            @callback="fn_setSourceApproval"
            alertable
        />

        <approval-view
            ref-id="MaterialSourceApprovalSheet_AprvView"
            :aprv-info-id="approvalViewId"
        />

        <excel-download
            v-model="excelDownload.request"
            ref-id="MaterialProjectCheckListView_ExcelDownload"
            :file-name="excelDownload.fileName"
            :download-option="excelDownload.downloadOption"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />

    </section>
</template>

<script>
import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
// import API from '@/pages/quality/materialMngt/apis/material'
import PopAlert from '@/pages/common/popup/PopAlert.vue'
import Approve from '@modal/approval/Approve.vue'
import ApprovalView from '@modal/approval/ApprovalView.vue'
import ExcelDownload from '@component/common/ExcelDownload.vue'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import API from '@/apis/'

import axios from 'axios'
// import axios from '@plugin/apis/instance'

import { Material6, Material6_2 } from '@/pages/common/data/MaterialsList'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

import loader from '@ibsheet/loader'
import { mapGetters } from 'vuex'
// import _ from 'lodash'

export default {
    name: 'MaterialSourceApprovalSheet',
    components: {
        TreeCategoryTab,
        PopAlert,
        Approve,
        ApprovalView,
        Breadcrumb,
        ExcelDownload,
    },
    mixins: [MsgBoxMixins, authCheckMixns],
    watch: {
        // "search.tab.data": {
        //     handler () {
        //         // console.log('search.tab.data changed')

        //         if (this.mounted) {
        //             // console.log(this.search.tab.data)
        //             this.getGridData({
        //                 mainCodeId: this.search.tab.data.mainCodeId,
        //                 midCodeId: this.search.tab.data.midCodeId
        //             })
        //         }
        //     },
        //     deep: true
        // },
        "tab.current": {
            handler () {
                if (this.mounted) {
                    if (this.grid.grid) this.grid.grid.dispose()
                    this.initializeGrid()

                }
            },
        }
    },
    computed: {
        ...mapGetters({
            'mtrlSpApprId': 'quality/getMaterialMtrlSpApprId',
            userId: 'auth/getUserId',
            userType: 'auth/getUserType',
        }),
        userWritable: {
            get: function () {
                return this.checkUser(this.userId, 'write')
            },
        },
        userUnusable: {
            get: function () {
                return this.checkUser(this.userId, 'unuse')
            },
        },
        userChangable: {
            get: function () {
                return this.checkUser(this.userId, 'change')
            },
        },
        userDownloadable: {
            get: function () {
                return this.checkUser(this.userId, 'down')
            },
        },
    },
    activated: function () {
        const savePage = this.$store.getters['tabInfo/getSavePage']

        if (savePage.length > 0) {
            const menuId = this.$store.getters['tabInfo/getCurrentMenuId']
            const url = '/sendApi/api/programMngt/menuChildProgram/list'
            const payload = {
                menuMngtId: menuId
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {

                    const fetchable = response.data.dlprogram.some(program => {
                        const pageInfo = savePage.find(page => page == program.routerName)
                        if (pageInfo) {
                            this.$store.dispatch('tabInfo/reMoveSavePage', pageInfo)
                            return true
                        }
                    })
                    if (fetchable) {
                        this.getGridData()
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    async mounted () {
        // await this.getCategoryData()

        // this.initializeGrid()
        this.$nextTick(async () => {
            await this.getCategoryData()

            if (this.$route.params.status){
                this.search.box.status = this.$route.params.status
                this.initializeGrid({
                    status: this.search.box.status
                })
            } else {
                this.initializeGrid()
            }
        })

        this.mounted = true
    },
    beforeDestroy () {
        if(this.grid.grid) this.grid.grid.dispose()
        loader.removeSheet(this.grid.grid.id)
    },
    methods: {
        fn_awaitRender: async function () {
            // await this.$nextTick()

            this.$nextTick(async () => {
                await this.getCategoryData()
    
                this.initializeGrid()
            })

        },

        changedTabCheckedList (item) {
            this.search.tab.data = item
            this.getGridData({
                mainCodeId: this.search.tab.data.mainCodeId,
                midCodeId: this.search.tab.data.midCodeId
            })
        },
        async getCategoryData () {
            try {
                const response = await API.material.getCategoryData()

                if(response?.status === 200 && response?.data) {
                    this.categoryData = response.data.list
                }

            } catch (error) {
                console.error('getCategory Error', error)
            }
        },
        async getGridData (param) {
            const payload = {
                // siteMstrId: this.$cookies.get('siteMstrId'),
                siteMstrId: this.$store.getters['auth/getSiteMstrId'],                
                ...param
            }


            try {

                // console.log(payload)
                const response = this.tab.current === 0 
                    ? await API.material.getSourceApprovalList(payload)
                    : await API.material.getSourceApprovalAllList(payload)
                // console.log(response)

                if(response.status === 200 && response?.data) {
                    this.grid.data = response.data.data
                    this.grid.data.forEach(item => {
                        item.ksCtfcYn = item.ksCtfcYn === 'N' ? '0' : '1'
                        item.statusOrigin = item.status
                    })

                    if(this.hiddenCheck){   // 목록 숨김 여부
                        this.grid.data = _.uniqBy(this.grid.data, 'docSeq')
                        this.grid.grid.hideCol("stnd")      // 규격
                        this.grid.grid.hideCol("ksCtfcYn")  // KS 인증여부
                        this.grid.grid.hideCol("ksCtfcNum") // KS 인증번호
                    }else{
                        this.grid.grid.showCol("stnd")      // 규격
                        this.grid.grid.showCol("ksCtfcYn")  // KS 인증여부
                        this.grid.grid.showCol("ksCtfcNum") // KS 인증번호
                    }

                    if (this.grid.grid) {
                        this.grid.grid.loadSearchData({
                            data: this.grid.data,
                        })
                    }


                }

            } catch(error) {
                console.error('material source Approval Sheet error : ', error)
            }


        },
        initializeGrid (params = undefined) {
            this.grid = {
                grid: null,
                data: [],
                options: {},
            }

            switch(this.tab.current)  {
                case 0: {

                    this.grid.options = Material6.options

                    this.grid.options.Events = {
                        onDataLoad: this.drawProgressBar,
                        onRenderFinish: this.mergeProgressBar,
                        // onSearchFinish: this.mergeProgressBar,
                        onAfterSort: this.mergeProgressBar,
                        // onDataLoad: this.drawProgressBar
                        onDblClick: this.doubleClickSheet,
                        onRenderFirstFinish: async () => {
                            await this.getGridData(params)
                        }
                    }
                    break
                }
                case 1: {

                    this.grid.options = Material6_2.options

                    this.grid.options.Events = {
                        onDataLoad: this.drawProgressBar,
                        onRenderFinish: this.mergeProgressBar,

                        onDblClick: this.doubleClickSheet,
                        onRenderFirstFinish: async () => {
                            await this.getGridData(params)
                        }
                    }

                    break
                }
            }

            loader.createSheet({
                el: 'MaterialSpApprSheet',
                data: this.grid.data,
                options: this.grid.options
            }).then(async sheet => {
                this.grid.grid = sheet 
                
                // await this.getGridData()
            })
        },
        clickRegister () {
            // console.log('click register')

            this.$store.dispatch('quality/setMaterialMtrlSpApprId', null)
            // this.$store.dispatch('quality/setMaterialMetaLayout', null)
            
            // this.grid.grid.setMergeRange(this.grid.grid.getFirstRow(), 'status', this.grid.grid.getLastRow(), 'statusSub')
            this.$router.push({
                name: 'MaterialSourceApprovalView'
            })

        },
        clickApproval () {
            // console.log('click approval')

            const row = this.grid.grid.getRowsByChecked('isSelected')[0]

            if(!row) {
                this.popup.msg = '선택된 항목이 없습니다.'
                this.$bvModal.show('approvalSimpleAlert')
                return
            }

            if(row.statusOrigin === 'APVL') {
                // this.popup.msg = '결재가 완료된 문서입니다.'
                // this.$bvModal.show('approvalSimpleAlert')
                this.alert('결재 중인 문서입니다.')
                return
            } else if (row.statusOrigin === 'APRV') {
                this.alert('결재 완료 된 문서입니다.')
                return

            } else {
                // this.popup.msg = '결재상신하시겠습니까?'
                // this.$bvModal.show('approvalSaveAlert')

                this.approve.mainCodeId     = row.mainCodeId
                this.approve.midCodeId      = row.midCodeId
                this.approve.docSeq         = row.docSeq
                this.approve.siteMstrId     = row.siteMstrId ? row.siteMstrId : null

                this.approve.requestId      = row.mtrlSpApprId
                this.approve.fileType       = 'MeterialMngt'


                // temporary
                this.approve.docName        = '자재 공급원 승인 요청·결과통보 내용'

                this.$bvModal.show('MaterialSourceApprovalSheet_Approve')
            }
            
            // popup 결재상신
            // result =  APRV_INFO_ID(결재정보id)
            // ㄴ> result
            // 임시 결재 정보 ID 대신 문서번호..
            // 자재공급원 결재 완료 처리.(param=>APRV_INFO_ID)

            
            
        },
        // setSourceApprovalData(payload) {
        //     const url = '/sendApi/api/quality/materialMngt/sourceApproval/change'
        //     const _payload = {
        //         ...payload,

        //     }
        //     const options = {
        //         headers: {
        //             'Authorization': this.$cookies.get('Authorization'),
        //             'Content-Type': 'application/json',
        //             'Accept-Language': 'ko'
        //         }
        //     }

        //     axios.post(url, _payload, options)
        //         .then(response => {

        //         })
        //         .catch(error => {
        //             console.error(error)
        //         })
        // },
        async saveApprovalData() {
            this.$bvModal.hide('approvalSaveAlert')
            const row = this.grid.grid.getRowsByChecked('isSelected')[0]

            const docSeqUrl = '/sendApi/api/docNum/selectDocNumSeq'
            const approveDocUrl = '/sendApi/api/approv/approvedDoc/write'
            const changeMaterialApprovalUrl = '/sendApi/api/quality/materialMngt/sourceApproval/change'
            const addNewProductUrl = '/sendApi/api/quality/materialMngt/materailNewProductDetail/add'
            const docSeqPayload = {
                siteMstrId: this.$cookies.get('siteMstrId'),
                codeType: 'MTRL',
                codeDtlType: 'MREQ',
                gjmcd: row.mainCodeId,
                gjscd: row.midCodeId,
                // aprvOptnType: '',
                docType: '',
                
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            // axios.post(docSeqUrl, docSeqPayload)
            axios.post(docSeqUrl, docSeqPayload, options)
                .then(response => {

                    // status === 200
                    const approveDocPayload = {
                        dmApprvDoc: {
                            ...docSeqPayload,
                            docSeq: response.data,
                        },
                    }

                    // console.log(response)

                    // axios.post(approveDocUrl, approveDocPayload)
                    axios.post(approveDocUrl, approveDocPayload, options)
                        .then(approveRes => {

                            const changeMaterialApprovalPayload = {
                                ...docSeqPayload,
                                ...approveRes.data.dmApprvDoc,
                                docSeq: approveDocPayload.dmApprvDoc.docSeq,
                                mtrlSpApprId: row.mtrlSpApprId,
                                status: 'APRV',
                                apprResult: 'PASS',
                            }

                            // axios.post(changeMaterialApprovalUrl, changeMaterialApprovalPayload)
                            axios.post(changeMaterialApprovalUrl, changeMaterialApprovalPayload, options )
                                .then(changeRes => {
                                    // console.log(changeRes)

                                    if (row.newPrdtYn === 'Y') {
                                        const newProductPayload = {
                                            ...changeRes.data.data
                                        }

                                        // axios.post(addNewProductUrl, newProductPayload)
                                        axios.post(addNewProductUrl, newProductPayload, options)
                                            .then(newProductRes => {
                                                // console.log(newProductRes)
    
                                                if(newProductRes.status === 200) {
    
                                                    this.popup.msg = '결재 승인되었습니다.'
                                                    this.$bvModal.show('approvalSimpleAlert')
                                                    this.getData()
                                                }
                                            })
                                    } else {
                                        if(changeRes.status === 200) {
                                            this.popup.msg = '결재 승인되었습니다.'
                                            this.$bvModal.show('approvalSimpleAlert')
                                            this.getGridData()
                                        }
                                    }
                                })
                                .catch(error => {
                                    throw new Error(error)
                                })

                        })
                        .catch(error => {
                            throw new Error(error)
                        })

                })
                .catch(error => {
                    console.error(error)
                    this.popup.msg = '오류로 인해 결재상신이 완료되지 않았습니다.'
                    this.$bvModal.show('approvalSimpleAlert')
                    // throw new Error(error)
                })


        },
        drawProgressBar (params) {
            const options = {
                status: 'status',
                statusSub: 'statusSub',
                ...params
            }

            const itemEvt = item => {
                return item === 1 ? `${item}px` : `${item}%`
            }

            // console.log(this.grid.grid.getDataRows())
            if(this.grid.grid) {
                this.grid.grid.getDataRows().forEach(row => {
                    if (row[options.status]) {
                        
                        const status =  this.default.progressBar.filter(item => item.id === row[options.status])[0]
                        const className = status.complete ? 'complete' : ''
                        const htmlTag = '<div class="guage">'+
                            '<span class="bar_wrap">' +
                                '<span class=\'bar '+className+'\' style=\'width:'+itemEvt(status.size)+';\'></span>' + 
                            '</span>'+
                            '<span class="label" style=\'width:'+status.size+'%\'>'+status.text+'</span>' +
                        '</div>'
    
                        row[options.status] = htmlTag
                    }
    
                    this.grid.grid.setMergeRange(row, options.status, row, options.statusSub)
                })
            }
            // focus out
            this.$nextTick(()=> {
                // console.log('setAttribute')
                
                this.grid.grid.blur()
            })
        },
        mergeProgressBar () {
            const options = {
                key: 'mtrlSpApprId',
                startColumnName: 'status',
                endColumnName: 'statusSub',

            }
            
            const allRows = this.grid.grid.getDataRows()

            let compare = allRows[0]
            for (let i = 0; i < allRows.length; i++) {
                if (compare[options.key] !== allRows[i][options.key]) {
                    this.grid.grid.setMergeRange(compare, options.startColumnName, allRows[i-1], options.endColumnName)
                    compare = allRows[i]

                }

                if (i === allRows.length -1 ) {
                    this.grid.grid.setMergeRange(compare, options.startColumnName, allRows[i], options.endColumnName)

                }
            }

            // this.grid.grid.setMergeRange(this.grid.grid.getFirstRow(), options.startColumnName, this.grid.grid.getLastRow(), options.endColumnName)
            
            // this.$nextTick(() => {
            //     this.grid.grid.setAttribute({
            //         // row: this.grid.grid.getFirstRow(),
            //         col: 'docSeq',
            //         attr: 'CanEdit',
            //         val: '1',
            //         render: 1
            //     })


            //     this.grid.grid.blur()
            // })
            
        },
        clickResetSearchBox () {
            this.search.box = {
                manageCd: '0',
                projNm: '',
                prdtNm: '',
                mainCodeId: '',
                midCodeId: '',
                status: '',
                stnd: '',
                sppr: '',
                mnft: '',
                apprResult: '',
            }
        },
        clickSearchBox () {
            // console.log('search')
            this.getGridData(this.search.box)
        },
        getMidCategoryList () {
            const selectedCategoryData = this.categoryData.filter(item => item.mainCodeId === this.search.box.mainCodeId)[0]
            return selectedCategoryData ? selectedCategoryData.midCodeList : []
        },
        doubleClickSheet (event) {
            
            // if (event.col === 'docSeq' ) {
            //     if (event.row.statusOrigin === 'REGT') {
            //         this.alert('결재 상신되지 않았습니다.')
            //         return
            //     } 

            //     this.approvalViewId = event.row.aprvInfoId
            //     this.$bvModal.show('MaterialSourceApprovalSheet_AprvView')
            // } else {
            //     }

            this.$store.dispatch('quality/setMaterialMtrlSpApprId', null)
            this.$store.dispatch('quality/setMaterialMtrlSpApprId', event.row.mtrlSpApprId)
            this.$store.dispatch('quality/setMaterialSiteMstrId', event.row.siteMstrId)

            switch(this.tab.current) {
                case 0:
                    // console.log(this.$router)
                    // this.$store!.dispatch('quality/setMaterialMetaLayout', null)
                    this.$router.push({
                        name: 'MaterialSourceApprovalView'
                    })
                    break
                case 1:
                    
                
                    window.open(
                        this.$router
                            .resolve({
                                name: 'MaterialSourceApprovalAllView'
                            }).href
                            , '_blank'
                    )
                    break
            }

        },

        exportExcel () {
            // this.sampleHeight = `${height[0].clientHeight - 68}px;`
            

        },
        print () {

            this.grid.grid.doPrint({
                pagePostfix: '[ %3 / %6 ]',
            })
            // this.grid.grid.doPrint({
            //     menu: 2,
            // });
        },

        fn_setSourceApproval: function (payload) {
            // console.log(payload)
            const row = this.grid.grid.getRowsByChecked('isSelected')[0]

            const url = '/sendApi/api/quality/materialMngt/sourceApproval/change'
            const _payload = {
                ...payload,
                mtrlSpApprId: row.mtrlSpApprId,
                status: 'APVL',
                apprResult: '',
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

                    if (row.newPrdtYn === 'Y') {
                        const newUrl = '/sendApi/api/quality/materialMngt/materailNewProductDetail/add'
                        const newPayload = {
                            ...res.data.data,
                        }                    
    
                        axios.post(newUrl, newPayload, options)
                            .then(() => {
                                // console.log('newProduct-Res : %o', newRes.data)
                                this.alert('결재 승인되었습니다.', () => {
                                    this.getGridData()
                                })
                            })
                            .catch(error => {
                                console.error(error)
                                // alert
                                this.alert('오류로 인해 결재상신이 완료되지 않았습니다.')
                            })
                        
                    } else {
                        this.alert('결재 승인되었습니다.', () => {
                            this.getGridData()
                        } )
                    }

                })
                .catch(error => {
                    console.error(error)

                    // alert
                    this.alert('오류로 인해 결재상신이 완료되지 않았습니다.')
                })
        },


        fn_clickOzreport: function() {

            let row
            if (this.tab.current === 0) {
                row = this.grid.grid.getRowsByChecked('isSelected')[0]
                if(!row ) {
                    this.alert('선택된 행이 없습니다.')
                    return
                }
                if(row.statusOrigin !== 'APRV') {
                    this.alert('결재가 완료된 문서만 확인할 수 있습니다.')
                    return
                }
            } else {
                row = this.grid.grid.getFocusedRow()
            }

            // const domainPath = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
            window.open(this.$store.getters['auth/getOzTypeList'][6].jspNm+`&siteMstrId=${this.$store.getters['auth/getSiteMstrId']}&mtrlSpApprId=${row.mtrlSpApprId}`, '_blank')
        },
        fn_exportExcel: function () {
            this.excelDownload.options   = {
                Cfg: this.grid.options.Cfg,
                Cols: this.tab.current === 0 
                    ? this.grid.options.Cols.filter((item) => !['status','statusSub','isSelected'].includes(item.Name))
                    : this.grid.options.Cols.filter((item) => !['status','statusSub','isSelected'].includes(item.Name))
            }
            this.excelDownload.downloadOption = {
                checkBoxOnValue:    'Y',
                checkBoxOffValue:   'N',
            }
            this.excelDownload.fileName  = `자재공급원승인_${this.$moment().format('YYYYMMDD')}.xlsx`
            this.excelDownload.data      = this.grid.data
            this.excelDownload.request   = true
        },
        hiddenCol(e){
            let param = {...this.search.box}
            this.hiddenCheck = e.target.checked

            this.getGridData(param)
        }   
    },
    data () {
        return {
            grid: {
                grid: null,
                data: [],
                options: {},
            },
            mounted: false,
            hiddenCheck: true,
            tab: {
                current: 0,
                list: ['My Site', 'All Sites'],
            },
            categoryData: [],
            
            search: {
                tab: {
                    useCheckBox: false,
                    data: null
                },
                box: {
                    manageCd: '0',
                    projNm: '',
                    prdtNm: '',
                    mainCodeId: '',
                    midCodeId: '',
                    status: '',
                    stnd: '',
                    sppr: '',
                    mnft: '',
                    apprResult: '',
                }
            },

            approve: {
                codeType: 'MTRL',
                codeDtlType: 'MREQ',
                mainCodeId: '',
                midCodeId: '',
                docSeq: null,
                docName: '',
                docNameId: null,
                requestId: null,
                fileType: null,
                siteMstrId: null,
            },

            approvalViewId: '',
            
            default: {
                progressBar: [
                    {
                        id: 'REGT',
                        text: '등록',
                        size: 1
                    },
                    {
                        id: 'APVL',
                        text: '결재 중',
                        size: 50
                    },
                    {
                        id: 'APRV',
                        text: '승인',
                        size: 100,
                        complete: true
                    },

                ],
            },

            popup: {
                msg: ''
            },

            sampleHeight: '590px',

            // aprvInfoId: '',
            /** excel */
            excelDownload: {
                request: false,
                fileName: '',
                options: {},
                data: [],
                downloadOption: {}
            },
        }
    }
}

</script>


<style lang="scss" scoped>
.IBSolidRow {
    // background: #fff;
    background: none;
}
</style>