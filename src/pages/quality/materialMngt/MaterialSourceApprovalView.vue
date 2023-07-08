<template>
    <section class="tab_contents">
        <div class="inner type2">
            <h2 class="sub_title"> 자재공급원 승인
                <div 
                    v-if="$router.currentRoute.path.split('/').pop() !== 'allSite'"
                    class="fr"
                >
                    <button
                        v-if="!mtrlSpApprId && userWritable" 
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="clickSave"
                    >
                        등록
                    </button>
                    <!-- need disable -->
                    <button
                        v-if="disable"
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="$bvModal.show('MaterialSourceApprovalView_AprvView')"
                    >
                        결재보기
                    </button>
                    <button
                        v-if="userWritable"
                        :disabled="(disable || !mtrlSpApprId ) && userWritable"
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="clickApproval"
                    >
                        결재상신
                    </button>
                    <button
                        v-if="mtrlSpApprId && userChangable"
                        :disabled="disable"
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="clickSave"
                    >
                        수정
                    </button>
                    <button
                        v-if="mtrlSpApprId && userUnusable"
                        :disabled="disable"
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="clickDelete"
                    >
                        삭제
                    </button>
                    <button 
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="$router.push({name: 'MaterialSourceApprovalSheet'})"
                    >
                        목록
                    </button>

                </div>
            </h2>

            <!-- docSeq -->
            <div 
                v-if="docSeq"
                class="data_num"
            >
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="86">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>문서번호</th>
                            <td> {{docSeq}} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="lst_data">
                <div class="data_tit"><span class="emp_red">1. 발주TYPE</span></div>
                <div class="line_box">
                    <label class="input_radio"
                        v-for="(item, index) in orderType.list"
                        :for="`orderType_${index}`"
                        :key="item.id"
                    >
                        <input
                            v-model="orderType.current"
                            type="radio"
                            :disabled="disable"
                            :id="`orderType_${index}`"
                            :value="item.id"
                        >
                        <span class="label_text"> {{item.value}} </span>
                    </label>
                </div>

                <div class="data_tit"><span calss="emp_red">2. 자재정보</span></div>
                <div class="table_normal_list table_write align_center">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="7%">
                            <col width="15%">
                            <col width="15%">
                            <col width="15%">
                            <col width="22%">
                            <col width="*">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>공종</th>
                                <th>세부공종</th>
                                <th><span class="emp_red">품명</span></th>
                                <th><span class="emp_red">공급업체</span>(ERP연계)</th>
                                <th><span class="emp_red">제조업체</span></th>
                                <th>비고</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> {{ materialInfo.mainCode }} </td>
                                <td> {{ materialInfo.midCode }}</td>
                                <td>
                                    <div class="search_area">
                                        <input 
                                            v-model="materialInfo.prdtNm"
                                            type="text" 
                                            class="form_control" 
                                            placeholder="검색"
                                            disabled
                                        >
                                        <button 
                                            type=button 
                                            class="btn_search"
                                            v-b-modal="'MaterialSourceApprovalView_productSelectModal'"
                                            :disabled="disable"
                                        >
                                            검색
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div class="search_area">
                                        <input 
                                            v-model="materialInfo.spprNm"
                                            type="text" 
                                            class="form_control" 
                                            placeholder="검색"
                                            @click="$bvModal.show('MaterialSourceApprovalView_supplySelect')"
                                            disabled
                                        >
                                        <button 
                                            type=button 
                                            class="btn_search"
                                            v-b-modal="'MaterialSourceApprovalView_supplySelect'"
                                            :disabled="disable"
                                        >
                                            검색
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <input 
                                        v-model="materialInfo.mnft"
                                        type="text" 
                                        class="form_control"  
                                        :disabled="disable"
                                        :placeholder="mtrlSpApprId ? null : '입력해주세요'"
                                        :maxlength="200"
                                    >
                                </td>
                                <td>
                                    <input 
                                        v-model="materialInfo.comment"
                                        type="text" 
                                        class="form_control"  
                                        :disabled="disable"
                                        :placeholder="mtrlSpApprId ? null : '입력해주세요'"
                                        :maxlength="200"
                                    >
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="table_message ar">제조업체 구분은 (쉼표)로 입력해주세요.</p>

                <div class="data_tit"><span class="emp_red">3. 주소</span></div>
                <textarea
                    v-model="addr"
                    class="form_control textarea"
                    maxlength="100"
                    :disabled="disable"
                    placeholder="공급업체 주소를 입력해주세요."
                />
                <p class="table_message ar mt0">{{addr? addr.length : 0}} / {{this.addrMaxSize}}</p>

                <div class="data_tit"><span class="emp_red">4. 인증여부</span></div>
                <div class="line_box">
                    <div class="multi_form">
                        <label class="input_radio" for="ksCtfc_ks">
                            <input 
                                type="radio" 
                                v-model="ksCtfc.isCertified" 
                                id="ksCtfc_ks"
                                :value="true"
                                :disabled="disable"
                            >
                            <span class="label_text">KS</span>
                        </label>
                        <input 
                            v-model="ksCtfc.number"
                            type="text" 
                            class="form_control" 
                            placeholder="인증번호/규격번호"
                            :disabled="!ksCtfc.isCertified || disable"
                            :maxlength="45"
                        >
                    </div>
                    <label class="input_radio" for="ksCtfc_nks">
                        <input 
                            type="radio" 
                            v-model="ksCtfc.isCertified"
                            id="ksCtfc_nks"
                            :value="false"
                            :disabled="disable"
                            @change="ksCtfc.number = ''"
                        >
                        <span class="label_text">비 KS</span>
                    </label>
                </div>
                <div class="line_box check_area">
                    <label class="input_check">
                        <input 
                            v-model="ksCtfc.evntSignYn"
                            type="checkbox" 
                            :disabled="disable"
                        >
                        <span class="label_text">환경표지</span>
                    </label>
                    <label class="input_check">
                        <input 
                            v-model="ksCtfc.grCtfcYn"
                            type="checkbox" 
                            :disabled="disable"
                        >
                        <span class="label_text">GR인증</span>
                    </label>
                    <label class="input_check">
                        <input 
                            v-model="ksCtfc.hbCtfcYn"
                            type="checkbox" 
                            :disabled="disable"
                        >
                        <span class="label_text">HB인증</span>
                    </label>
                    <label class="input_check">
                        <input 
                            v-model="ksCtfc.etcCtfcYn"
                            type="checkbox" 
                            :disabled="disable"
                        >
                        <span class="label_text">기타</span>
                    </label>
                </div>

                <div class="data_tit"><span class="emp_red">5. 품명/ 규격/ 설계량</span>
                    <div 
                        v-if="$router.currentRoute.path.split('/').pop() !== 'allSite'"
                        class="fr"
                    >
                        <!-- ibsheet -->
                        <button
                            type="button"
                            class="btn btn_sm btn_darkgray"
                            @click="clickCopyRows()"
                            :disabled="disable"
                        >
                            행 복사
                        </button>

                        <div 
                            class="btn_number"
                            :class="{disabled:disable}"
                        >
                            <select
                                v-model="detailInfo.addCount"
                                class="form_control num"
                                :disabled="disable"
                            >
                                <option
                                    v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                    :key="count"
                                    :value="count"
                                >
                                    <!-- {{ String(count).padStart(3, '0') }} -->
                                    {{ String(count) }}
                                </option>    
                            </select>
                            <button
                                type="button"
                                class="btn btn_sm"
                                @click="clickAddRows()"
                            >
                                <!-- :disabled="disable" -->
                                행 추가
                            </button>
                        </div>

                        <button 
                            type="button" 
                            class="btn btn_sm btn_darkgray"
                            @click="clickDeleteRow()"
                            :disabled="disable"
                        >
                            행 삭제
                        </button>
                        
                    </div>
                </div>
                <div class="ib_wrap">
                    <div id="MaterialSourceApprovalWrite" class="ibsheet_table"></div>
                </div>

                <div class="data_tit">6. 시공자 의견</div>
                <textarea 
                    v-model="csrtOpn.contents"  
                    class="form_control textarea"
                    :maxLength="csrtOpn.maxSize"
                    @keydown="validateComment"
                    :disabled="disable"
                />
                <p class="table_message ar mt0">{{this.csrtOpn.contents? this.csrtOpn.contents.length : 0}} / {{this.csrtOpn.maxSize}}</p>

                <div class="data_tit">7. 특이사항</div>
                <textarea 
                    v-model="spct.contents"  
                    class="form_control textarea"
                    :maxLength="spct.maxSize"
                    @keydown="validateComment"
                    :disabled="disable"
                />
                <p class="table_message ar mt0">{{this.spct.contents? this.spct.contents.length : 0 }} / {{this.spct.maxSize}}</p>


                <div class="data_tit">8. 첨부파일</div>
                <div class="line_box check_area">
                    <div>
                        <label class="input_check">
                            <input 
                                v-model="attachments.qltCertYn"
                                type="checkbox" 
                                :disabled="disable"
                            >
                            <span class="label_text">품질인증서</span>
                        </label>
                        <label class="input_check">
                            <input 
                                v-model="attachments.bsnsRgstYn"
                                type="checkbox" 
                                :disabled="disable"
                            >
                            <span class="label_text">사업자등록증</span>
                        </label>
                        <label class="input_check">
                            <input 
                                v-model="attachments.catalogYn"
                                type="checkbox" 
                                :disabled="disable"
                            >
                            <span class="label_text">CATALOG</span>
                        </label>
                        <label class="input_check">
                            <input 
                                v-model="attachments.fctrRgstCertYn"
                                type="checkbox" 
                                :disabled="disable"
                            >
                            <span class="label_text">공장등록증</span>
                        </label>
                        <label class="input_check">
                            <input 
                                v-model="attachments.testReptYn"
                                type="checkbox" 
                                :disabled="disable"
                            >
                            <span class="label_text">시험성적서</span>
                        </label>
                        <div class="mt10">
                            <label class="input_check">
                                <input 
                                    v-model="attachments.dlvrPerfYn"
                                    type="checkbox" 
                                    :disabled="disable"
                                >
                                <span class="label_text">납품실적</span>
                            </label>
                            <label class="input_check">
                                <input 
                                    v-model="attachments.sampleYn"
                                    type="checkbox" 
                                    :disabled="disable"
                                >
                                <span class="label_text">견본</span>
                            </label>
                            <label class="input_check">
                                <input 
                                    v-model="attachments.etcYn"
                                    type="checkbox" 
                                    :disabled="disable"
                                >
                                <span class="label_text">기타</span>
                            </label>
                            <label class="input_check">
                                <input 
                                    v-model="attachments.taxCertYn"
                                    type="checkbox" 
                                    :disabled="disable"
                                >
                                <span class="label_text">국세/지방세 납부증명서</span>
                            </label>
                            <label class="input_check">
                                <input 
                                    v-model="attachments.testPerfYn"
                                    type="checkbox" 
                                    :disabled="disable"
                                >
                                <span class="label_text">시험성과 대비표</span>
                            </label>
                        </div>
                    </div>
                </div>

                <LstFile
                    :lst-file-rst="attachments.file.fileRegistered"
                    :files="attachments.file.files"
                    :second-remove-file-id="attachments.file.requestForDelete"
                    @file-changed="fileChanged"
                    @file-removed="fileRemoved"
                    :uploadable="!disable"
                    :downloadable="userDownloadable"
                    :limit-total-file-size="1024*1024*300"
                    :accept-extn="['pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'hwpx', 'png', 'gif', 'jpeg', 'jpg', 'bmp', 'txt']"
                 />
                    
                    <!-- :limit-file-count="20"
                    :except-extn="['jpg','jpeg','png','gif']" -->

                <div class="data_tit">9. 사진등록</div>
                <LstImg
                    :lst-file-rst="attachments.image.fileRegistered"
                    :files="attachments.image.files"
                    :copied-file-ids="attachments.image.copiedFileIds"
                    :second-remove-file-id="attachments.image.requestForDelete"
                    @file-changed="imageChanged"
                    @file-removed="imageRemoved"
                    @return-reset="attachments.image.resetCopyYn=false"
                    :uploadable="!disable"
                    :copyable="!disable"
                    :downloadable="userDownloadable"
                    :reset-copy-yn="attachments.image.resetCopyYn"
                    countable
                    :limit-total-file-size="1024*1024*300"
                    :accept-extn="['png', 'gif', 'jpeg', 'jpg', 'bmp']"
                    :file-type="'materialSourceViewQltyPicturePop'"
                 />

            </div>
        </div>

        <product-select-modal
            :id="'MaterialSourceApprovalView_productSelectModal'"
            :main-code-id="materialInfo.mainCodeId"
            :mid-code-id="materialInfo.midCodeId"
            :new-prdt-yn="materialInfo.newPrdtYn"
            :product-name="materialInfo.prdtNm"
            @selected="selectProduct"
        />
        <supply-select
            :ref-id="'MaterialSourceApprovalView_supplySelect'"
            @fn-supply-choice="selectSupplyOperation"
            :site-mstr-id="undefined"
        />
            <!-- :site-mstr-id="siteMstrId" -->

        <approve
            ref-id="MaterialSourceApprovalView_Approve"
            :code-type="approve.codeType"
            :code-dtl-type="approve.codeDtlType"
            :main-code-id="materialInfo.mainCodeId"
            :mid-code-id="materialInfo.midCodeId"
            :request-id="mtrlSpApprId"
            :doc-name="approve.docName"
            doc-type="MTRL"
            :doc-seq="docSeq"
            :file-type="approve.fileType"
            :site-mstr-id="approve.siteMstrId"
            @callback="fn_setSourceApproval"
            alertable
        />

        <approval-view
            ref-id="MaterialSourceApprovalView_AprvView"
            :aprv-info-id="aprvInfoId"
        />
    </section>
</template>


<script>
import LstFile from '@/pages/common/popup/LstFile'
import LstImg from '@/pages/common/popup/LstImg'
import ProductSelectModal from '@/pages/quality/materialMngt/component/ProductSelectModal'
import SupplySelect from '@/pages/common/popup/SupplySelect'
import Approve from '@modal/approval/Approve.vue'
import ApprovalView from '@modal/approval/ApprovalView.vue'

import API from '@/apis/'
import axios from 'axios'
import _ from 'lodash'

import { MaterialApproval } from '@/pages/common/data/MaterialsList'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

import loader from '@ibsheet/loader'
import { mapGetters } from 'vuex'

export default {
    name: 'MaterialSourceApprovalView',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        LstFile,
        LstImg,
        ProductSelectModal,
        SupplySelect,
        Approve,
        ApprovalView,
    },
    computed: {
        ...mapGetters({
            'mtrlSpApprId': 'quality/getMaterialMtrlSpApprId',
            userId:         'auth/getUserId',
            projectId:      'auth/getProjectId',
            projcetNm:      'auth/getProjectNm',
            // siteMstrId:     'auth/getSiteMstrId',
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
    watch: {
        mtrlSpApprId: {
            handler () {
                if (this.mounted) {
                    this.setDisable()
                }
            }
        }
    },

    mounted () {
        this.siteMstrId = this.$store.getters['auth/getSiteMstrId']

        this.$nextTick(async () => {
            await this.initializeGrid()
        })
        // this.siteMstrId = this.$cookies.get('siteMstrId')

        this.mounted = true
    },
    beforeDestroy () {
        if(this.detailInfo.sheet) this.detailInfo.sheet.dispose()
    },
    methods: {
        async initializeGrid () {
            this.detailInfo.options = MaterialApproval.options

            if(this.mtrlSpApprId) {
                await this.getData()

                this.detailInfo.options.Events = {
                    onRenderFinish: this.onRenderFinish,
                }
            }

            this.detailInfo.options.Events = {
                ...this.detailInfo.options.Events,
                onAfterChange: this.onAfterChange,
                onEndEdit: (event) => {
                    switch(event.col) {
                        case 'stnd': {
                            // if (this.remicons.)

                            


                            if (this.remicons.includes(event.row.prdtNm)) {
                                if(!(event.val?.length === 7)) {
                                    // const evt = event
                                    this.alert('콘크리트 배합규격을 7자리 숫자로 입력해주세요')
                                    return ''
                                }
                            }
                            break
                        }
                    }
                }
            }

            // set IBSheet Formula
            this.detailInfo.options.Cols[1].CanEditFormula = this.setFormula

            loader.createSheet({
                el: 'MaterialSourceApprovalWrite',
                data: this.mtrlSpApprId ? this.detailInfo.data : [{}],
                options: this.detailInfo.options
            }).then(sheet => {
                this.detailInfo.sheet = sheet

            })
        },
        fn_closeAlert: function () {
            this.$nextTick(() => {
                this.detailInfo.sheet.focus(this.detailInfo.sheet.getFocusedRow(), 'stnd')
            })
        },
        fileChanged (payload) {
            this.attachments.file.files = payload
        },
        fileRemoved (payload) {
            this.attachments.file.requestForDelete = payload
        },
        imageChanged (payload) {
            // this.attachments.image.files = payload
            this.attachments.image.file = payload.file;
            this.attachments.image.copiedFileIds = payload.copyIds;
        },
        imageRemoved (payload) {
            this.attachments.image.requestForDelete = payload
        },
        selectProduct (item) {
            this.materialInfo.mainCode      = item.mainName
            this.materialInfo.mainCodeId    = item.mainCodeId
            this.materialInfo.midCode       = item.midName
            this.materialInfo.midCodeId     = item.midCodeId
            this.materialInfo.mtrlPrjtDtlId = item.mtrlPrjtDtlId
            this.materialInfo.prdtNm        = item.productName
            this.materialInfo.newPrdtYn     = item.newPrdtYn
            
            this.setProductName()
        },
        selectSupplyOperation (item) {
            this.materialInfo.sppr = item.tradeId
            this.materialInfo.spprNm = item.tradeNm
        },
        clickCopyRows (sheet = this.detailInfo.sheet, checkColumn = this.detailInfo.options.Cols[0].Name) {
            const checkedRows = sheet.getRowsByChecked(checkColumn)
            if (checkedRows.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }
            const copiedRows = sheet.copyRows(checkedRows, sheet.getFirstRow())
            copiedRows.forEach(item => {
                item[checkColumn] = false
                sheet.refreshCell(item, checkColumn)
            })
        },
        clickAddRows () {
            Array(this.detailInfo.addCount).fill().forEach(() => {
                this.detailInfo.sheet.addRow({
                    init: {
                        prdtNm: this.materialInfo.prdtNm
                    }
                })
            })
        },
        clickDeleteRow () {
            const checkedRows = this.detailInfo.sheet.getRowsByChecked(this.detailInfo.options.Cols[0].Name)
            this.detailInfo.sheet.deleteRows(checkedRows)
            checkedRows.forEach(item => {
                this.detailInfo.sheet.hideRow({
                    row: item,
                    del: false,
                    norender: false
                })
            })
        },
        clickSave () {
            let validate = false

            if (this.orderType.current === null) {
                this.alert('발주 TYPE을 입력해주세요')
                validate = true
                return
            }
            if (this.checkVoid(this.materialInfo.prdtNm)) {
                this.alert('품명을 입력해주세요.')
                validate = true
                return
            }
            if (this.checkVoid(this.materialInfo.sppr)) {
                this.alert('공급업체를 입력해주세요.')
                validate = true
                return
            }
            if (this.checkVoid(this.materialInfo.mnft)) {
                this.alert('제조업체를 입력해주세요.')
                validate = true
                return
            }
            if (this.checkVoid(this.addr)) {
                this.alert('주소를 입력해주세요.')
                validate = true
                return
            }
            if (this.ksCtfc.isCertified === null || (this.ksCtfc.isCertified ? this.checkVoid(String(this.ksCtfc.number)) : false )) {
                this.alert('인증여부를 입력해주세요.')
                validate = true
                return
            }

            const data = this.detailInfo.sheet
                            .getDataRows()
                            .filter(item => !(item.STATUS === 'Deleted' || item.Deleted === true))
            // if (this.detailInfo.sheet.getSaveJson({ saveMode: 0}).data.length === 0) {
            if (data.length === 0) {
                this.alert('상세품명을 입력해주세요.')
                validate = true
                return
            }

            data.forEach(row => {
                this.detailInfo.sheet.setAttribute(row, null, 'Color', '#FFFFFF')
            })
            const dupList = this.detailInfo.sheet.getRowsByDup('prdtDtl,stnd', false, false, false, 'Deleted')
            if (dupList.length > 0) {
                this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.')
                dupList.forEach(upper => {
                    upper.forEach(row => {
                        this.detailInfo.sheet.setAttribute(row, null, 'Color', '#F96F6F')
                    })
                })
                validate = true
                return
            }

            data.some((row) => {
                
                this.detailInfo.options.Cols.slice(2,4).some( (col) => {
                    if (row[col.Name] === undefined || row[col.Name] === null || row[col.Name] === '' ) {
                    // if ( _.isEmpty(row[col.Name])) {
                        let alertMsg = ''
                        switch(col.Name) {
                            case 'prdtDtl': 
                                alertMsg = '5. 품명/ 규격/ 설계량 내 상세품명을 입력해주세요.'
                                break
                            case 'stnd':
                                alertMsg = '5. 품명/ 규격/ 설계량 내 규격을 입력해주세요.'
                                break
                            case 'designAmt':
                                alertMsg = '5. 품명/ 규격/ 설계량 내 설계량을 입력해주세요.'
                                break
                            case 'unit':
                                alertMsg = '5. 품명/ 규격/ 설계량 내 단위를 입력해주세요.'
                                break
                        }
                        validate = true
                        this.alert(alertMsg, ()=> {
                            return
                        })
                        return true
                    }
                })

                if (validate) return true
            })
            
  
            if(!validate) {
                // this.confirm(this.mtrlSpApprId ? '저장하시겠습니까?' : '수정하시겠습니까?' , () => {
                this.confirm(this.mtrlSpApprId ? '수정하시겠습니까?' : '저장하시겠습니까?' , () => {
                    if (!this.mtrlSpApprId && !this.docSeq) {
                        this.fn_fetchDocSeq()
                    } else {
                        this.setData()
                    }
                })
            }
        },
        clickDelete: function () {
            if (this.mtrlSpApprId && this.status.current ===  'REGT') {
                this.confirm('삭제하시겠습니까', () => {
                    const url = '/sendApi/api/quality/materialMngt/sourceApproval/unuse'
                    const payload = {
                        mtrlSpApprId:this.mtrlSpApprId,
                        status: 'REGT'
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
                            if(response?.status === 200) {
                                this.alert('삭제되었습니다', ()=> {
                                    // this.$store.dispatch('tabInfo/setSavePage',this.$router.name)
                                    this.$router.push({name: 'MaterialSourceApprovalSheet'})
                                })

                            }
                        })
                        .catch(error => {
                            console.error(error)
                        })
                        .finally(() => {
                            this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                        })
                })
            }
        },
        clickApproval () {

            // this.popup.msg = '결재상신하시겠습니까?'
            // this.$bvModal.show('approvalSaveAlert')

            this.approve.siteMstrId     = this.$cookies.get('siteMstrId')
            this.approve.docName        = '자재 공급원 승인 요청·결과통보 내용'

            this.$bvModal.show('MaterialSourceApprovalView_Approve')
        },
        fn_fetchDocSeq: function () {
            const ruleUrl   = '/sendApi/api/docNum/docNumSettList'
            const url       = '/sendApi/api/docNum/selectDocNumSeq'
            const payload   = {
                    siteMstrId:     this.$store.getters['auth/getSiteMstrId'],
                    codeType:       'MTRL',
                    codeDtlType:    'MREQ',
                    gjmcd:          this.materialInfo.mainCodeId,
                    gjscd:          this.materialInfo.midCodeId,
                }
            const options   = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

            axios.post(ruleUrl, {...payload, codeDtlType: 'MRES'}, options)
                .then(response => {
                    const requstSamenssYn   = response.data.datas.dlDocNum?.[0]?.requstSamenssYn
                    if (requstSamenssYn === 'Y') {
                        return axios.all([
                            axios.post(url, payload,                           options),
                        ])
                    } else {
                        return axios.all([
                            axios.post(url, payload,                           options),
                            axios.post(url, {...payload, codeDtlType: 'MRES'}, options),
                        ])
                    }
                })
                .then(axios.spread((...response) => {
                    if (response.length > 1) {
                        this.docSeq     = response[0].data
                        this.mresDocSeq = response[1].data
                    } else {
                        this.docSeq     = response[0].data
                        this.mresDocSeq = response[0].data
                    }
                }))
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    this.setData()
                })
            // axios.post(url, payload, options)
            //     .then(response => {
            //         this.docSeq = response.data

            //         this.setData()
            //     })
            //     .catch(error => {
            //         console.error(error)
            //     })
        },
        setProductName (prdtNm = this.materialInfo.prdtNm) {
            this.detailInfo.sheet.getDataRows().forEach(row => {
                row.prdtNm = prdtNm

                if (this.remicons.includes(prdtNm)) {
                    row.stnd = null
                }
                this.detailInfo.sheet.refreshRow(row)
            })
            this.detailInfo.sheet.calculate()
        },
        checkVoid(str) {
            return ( str === null || str === '' || str === undefined )
        },
        formatStnd(input) {
            const str = String(input)
            if(str && str.length === 7) {
                return `${str.slice(0,2)}-${str.slice(2,4)}-${str.slice(4)}`
            } else {
                return ''
            }
        },
        validateComment() {
            // if (this.getStringBtye(this.csrtOpn.contents) >= this.csrtOpn.maxByteSize) {
            //     // over maxByteSize 
            // }
        },
        onRenderFinish () {
            if (this.disable) {
                this.detailInfo.sheet.disable(true, true)
            }
        },
        onAfterChange (event) {
            switch(event.col) {
                case 'designAmt': {
                    if (event.row.designAmt <= 0) {
                        const evt = event
                        this.alert('설계량은 0이상의 값을 입력해주세요.', ()=> {
                            evt.row.designAmt = null
                            evt.sheet.refreshCell(evt.row, 'designAmt')
                        })
                    }
                    break
                }
            }
        },
        setFormula (event) {
            // initialize
            if (event.Col === this.detailInfo.options.Cols[1].Name) {
                event.Row[`${this.detailInfo.options.Cols[3].Name}EditMask`] = ''
                event.Row[`${this.detailInfo.options.Cols[3].Name}CustomFormat`] = ''
            }

            if (this.remicons.includes(event.Row[this.detailInfo.options.Cols[1].Name])) {
                event.Row[`${this.detailInfo.options.Cols[3].Name}EditMask`] = '^\\d{0,7}$'
                event.Row[`${this.detailInfo.options.Cols[3].Name}CustomFormat`] = '##-##-###'
            } 

            // switch (event.Row[this.detailInfo.options.Cols[1].Name]) {
            //     case '레미콘':
            //         event.Row[`${this.detailInfo.options.Cols[3].Name}EditMask`] = '^\\d{0,7}$'
            //         event.Row[`${this.detailInfo.options.Cols[3].Name}CustomFormat`] = '##-##-###'

            //         break
            //     case '아스콘':
            //         event.Row[`${this.detailInfo.options.Cols[3].Name}EditMask`] = '^\\d{0,7}$'
            //         event.Row[`${this.detailInfo.options.Cols[3].Name}CustomFormat`] = '##-##-###'

            //         break
            // }
        },
        setDisable () {
            if (this.$router.currentRoute.path.split('/').pop() === 'allSite') {
                this.disable = true
            } else {
                this.disable = this.mtrlSpApprId ? (this.status.current !== 'REGT') : false
            }
        },

        fn_setSourceApproval: function (payload) {
            const url = '/sendApi/api/quality/materialMngt/sourceApproval/change'
            const _payload = {
                ...payload,
                mtrlSpApprId: this.mtrlSpApprId,
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

                    // console.log(res)

                    if (this.materialInfo.newPrdtYn === 'Y') {
                        const newUrl = '/sendApi/api/quality/materialMngt/materailNewProductDetail/add'
                        const newPayload = {
                            ...res.data.data,
                        }                    
    
                        axios.post(newUrl, newPayload, options)
                            .then(() => {
                                // console.log('newProduct-Res : %o', newRes.data)
                                this.alert('결재 승인되었습니다.', () => {
                                    this.getData()
                                })
                            })
                            .catch(error => {
                                console.error(error)
                                // alert
                                this.alert('오류로 인해 결재상신이 완료되지 않았습니다.')
                            })
                        
                    } else {
                        this.alert('결재 상신되었습니다.', () => {
                            this.getData()
                        })
                    }

                })
                .catch(error => {
                    console.error(error)

                    // alert
                    this.alert('오류로 인해 결재상신이 완료되지 않았습니다.')
                })
        },

        async getData () {
            this.attachments.file = {
                fileRegistered: [],
                files: [],
                requestForDelete: []
            }
            this.attachments.image = {
                fileRegistered: [],
                files: [],
                requestForDelete: [],
                copiedFileIds : [],
                resetCopyYn : true,
            }

            const payload = {
                siteMstrId:     this.$router.currentRoute.path.split('/').pop() !== 'allSite' 
                                    ? this.$store.getters['auth/getSiteMstrId'] 
                                    : this.$store.getters['quality/getMaterialSiteMstrId'],
                mtrlSpApprId:   this.mtrlSpApprId
            }

            try {
                const response = await API.material.getSourceApproval(payload)

                // console.log(response)

                // getData
                this.aprvInfoId                 = response.data.data.aprvInfoId
                this.docSeq                     = response.data.data.docSeq
                this.mresDocSeq                 = response.data.data.mresDocSeq
                this.orderType.current          = response.data.data.orderType
                this.materialInfo.sppr          = response.data.data.sppr
                this.materialInfo.spprNm        = response.data.data.spprNm
                this.materialInfo.mnft          = response.data.data.mnft
                this.materialInfo.comment       = response.data.data.comment
                this.addr                       = response.data.data.addr
                this.ksCtfc.isCertified         = response.data.data.ksCtfcYn === 'Y' ? true : false
                this.ksCtfc.number              = response.data.data.ksCtfcNum
                this.ksCtfc.evntSignYn          = response.data.data.evntSignYn === 'Y' ? true : false
                this.ksCtfc.grCtfcYn            = response.data.data.grCtfcYn === 'Y' ? true : false
                this.ksCtfc.hbCtfcYn            = response.data.data.hbCtfcYn === 'Y' ? true : false
                this.ksCtfc.etcCtfcYn           = response.data.data.etcCtfcYn === 'Y' ? true : false
                this.csrtOpn.contents           = response.data.data.csrtOpn
                this.spct.contents              = response.data.data.spct

                this.attachments.qltCertYn      = response.data.data.qltCertYn === 'Y' ? true : false
                this.attachments.bsnsRgstYn     = response.data.data.bsnsRgstYn === 'Y' ? true : false
                this.attachments.categoryYn     = response.data.data.categoryYn === 'Y' ? true : false
                this.attachments.fctrRgstCertYn = response.data.data.fctrRgstCertYn === 'Y' ? true : false
                this.attachments.testReptYn     = response.data.data.testReptYn === 'Y' ? true : false
                this.attachments.dlvrPerfYn     = response.data.data.dlvrPerfYn === 'Y' ? true : false
                this.attachments.sampleYn       = response.data.data.sampleYn === 'Y' ? true : false
                this.attachments.etcYn          = response.data.data.etcYn === 'Y' ? true : false
                this.attachments.taxCertYn      = response.data.data.taxCertYn === 'Y' ? true : false
                this.attachments.testPerfYn     = response.data.data.testPerfYn === 'Y' ? true : false

                this.detailInfo.data            = response.data.data.sourceApprovalSub
                                                    .map(item => {
                                                        if (this.remicons.includes(response.data.data.prdtNm)) {
                                                            item.stnd = String(item.stnd).replaceAll('-','')
                                                        }
                                                        return item
                                                    })

                this.materialInfo.newPrdtYn     = response.data.data.newPrdtYn
                this.materialInfo.prdtNm        = response.data.data.prdtNm
                this.materialInfo.mainCode      = response.data.data.mainName
                this.materialInfo.mainCodeId    = response.data.data.mainCodeId
                this.materialInfo.midCode       = response.data.data.midName
                this.materialInfo.midCodeId     = response.data.data.midCodeId
                this.materialInfo.mtrlPrjtDtlId = response.data.data.mtrlPrjtDtlId

                this.status.current             = response.data.data.status

                const fileResponse = await API.material.getFileList({
                    fileConnectId: this.mtrlSpApprId
                })

                this.attachments.file.fileRegistered = fileResponse.data.data

                const imageResponse = await API.material.getFileList({
                    fileType: 'MeterialMngtImg',
                    fileConnectId: this.mtrlSpApprId
                })

                this.attachments.image.fileRegistered = imageResponse.data.data

                this.setDisable()
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        },

        async setData () {
            const alertWord = this.mtrlSpApprId ? '수정' : '등록'
            
            const payload = {
                // siteMstrId : this.$cookies.get("siteMstrId"),
                siteMstrId:         this.$store.getters['auth/getSiteMstrId'] ,

                docSeq:             this.docSeq,
                mresDocSeq:         this.mresDocSeq,
                orderType:          this.orderType.current,
                sppr:               this.materialInfo.sppr,
                spprNm:             this.materialInfo.spprNm,
                mnft:               this.materialInfo.mnft,
                comment:            this.materialInfo.comment,
                addr:               this.addr,
                ksCtfcYn:           this.ksCtfc.isCertified ? 'Y' : 'N',
                ksCtfcNum:          this.ksCtfc.isCertified ? this.ksCtfc.number : '',
                evntSignYn:         this.ksCtfc.evntSignYn ? 'Y' : 'N',
                grCtfcYn:           this.ksCtfc.grCtfcYn ? 'Y' : 'N',
                hbCtfcYn:           this.ksCtfc.hbCtfcYn ? 'Y' : 'N',
                etcCtfcYn:           this.ksCtfc.etcCtfcYn ? 'Y' : 'N',
                csrtOpn:            this.csrtOpn.contents,
                spct:               this.spct.contents,

                qltCertYn:          this.attachments.qltCertYn ? 'Y' : 'N',
                bsnsRgstYn:         this.attachments.bsnsRgstYn ? 'Y' : 'N',
                categoryYn:         this.attachments.catalogYn ? 'Y' : 'N',
                fctrRgstCertYn:     this.attachments.fctrRgstCertYn ? 'Y' : 'N',
                testReptYn:         this.attachments.testReptYn ? 'Y' : 'N',
                dlvrPerfYn:         this.attachments.dlvrPerfYn ? 'Y' : 'N',
                sampleYn:           this.attachments.sampleYn ? 'Y' : 'N',
                etcYn:              this.attachments.etcYn ? 'Y' : 'N',
                taxCertYn:          this.attachments.taxCertYn ? 'Y' : 'N',
                testPerfYn:         this.attachments.testPerfYn ? 'Y' : 'N',

                sourceApprovalSub:  this.detailInfo.sheet
                                        .getSaveJson({ saveMode: 0 })
                                        .data
                                        .filter(item => item.STATUS !== 'Deleted')
                                        .map(item => {
                                            if (this.remicons.includes(this.materialInfo.prdtNm)) {
                                                item.stnd = this.formatStnd(item.stnd)
                                            }
                                            return item
                                        }),

                newPrdtYn:          this.materialInfo.newPrdtYn,
                prdtNm:             this.materialInfo.prdtNm,
                mainCode:           this.materialInfo.mainCode,
                mainCodeId:         this.materialInfo.mainCodeId,
                midCode:            this.materialInfo.midCode,
                midCodeId:          this.materialInfo.midCodeId,
                mtrlPrjtDtlId:      this.materialInfo.mtrlPrjtDtlId,
            }
            if(this.mtrlSpApprId) payload.mtrlSpApprId = this.mtrlSpApprId

            let success = false
            try {
                const response = this.mtrlSpApprId 
                    ? await API.material.setSourceApproval(payload)
                    : await API.material.addSourceApproval(payload)

                if(response.status === 200 && response?.data) {
                    success = true
                    if (this.attachments.file.requestForDelete.length > 0) {
                        
                        const fileDelResponse = await API.material.delFile({
                            fileQltArcvIds: this.attachments.file.requestForDelete
                        })

                        if (fileDelResponse.status === 200 ){
                            success = true
                        } else {
                            success = false
                        }
                    }

                    if ( this.attachments.file.files.length > 0 ) {
                        const fileResponse = await API.material.setFile(response.data.data.mtrlSpApprId, this.attachments.file.files)
    
                        if (fileResponse.status === 200 && fileResponse?.data?.data > 0) {
                            // file upload 성공
                            success = true
                        } else {
                            success = false
                        }
                    }

                    if (this.attachments.image.requestForDelete.length > 0) {
                        const imgDelResponse = await API.material.delFile({
                            fileQltArcvIds: this.attachments.image.requestForDelete,
                            fileType: 'MeterialMngtImg',
                        })

                        if (imgDelResponse.status === 200 ){
                            success = true
                        } else {
                            success = false
                        }
                    }

                    if ((this.attachments.image.files && this.attachments.image.files.length > 0) || (this.attachments.image.copiedFileIds && this.attachments.image.copiedFileIds.length > 0)) {
                        const imageResponse = await API.material.setFile(response.data.data.mtrlSpApprId, this.attachments.image.files, 'MeterialMngtImg',this.attachments.image.copiedFileIds)

                        if (imageResponse.status === 200 && imageResponse?.data?.data > 0)  {
                            success = true
                        } else {
                            success = false
                        }
                    }

                    if (this.materialInfo.newPrdtYn === 'Y') {
                        this.fn_getUserInfo((dlUser) => {
                            this.fn_sendMessage({
                                messageCode:    'A008',
                                reciveUserIds:   dlUser.map(item => item.userId)
                            })
                        })

                    }


                }

                if (!this.mtrlSpApprId) {
                    this.status.current = 'REGT'
                    this.$store.dispatch('quality/setMaterialMtrlSpApprId', null)
                    this.$store.dispatch('quality/setMaterialMtrlSpApprId', response.data.data.mtrlSpApprId )

                }
                
            } catch (error) {
                console.error(error);
                console.error('addSourceApprovalList')
                success = false

            } finally {
                this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
            }

            
            if (success) {
                this.alert(`자재공급원 승인 ${alertWord}되었습니다.`, () => {
                    this.getData()
                })

                // this.$router.go(-1)
                
            } else {
                this.alert(`자재공급원 승인 ${alertWord}에 실패했습니다.`)
            }

        },

        /** 통합메세지 처리 */
        fn_sendMessage: function (_payload) {
            const url       = '/sendApi/api/messageMngt/message/send'
            const payload   = {
                                messageCode:    ''    ,
                                userId:         this.userId,
                                projectId:      this.projectId,
                                projectName:    this.projectNm,
                                siteMstrId:     this.siteMstrId,
                                // reciveUserId:
                                // reciveuserIds:
                                docSeq:         this.docSeq,

                                ..._payload,
                            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(() => {
                    // console.log(response)
                })
        },
        fn_getUserInfo: function (callback) {
            const url = '/sendApi/api/myWork/userMngt/userMngt/list'
            const payload = {
                groupAuthDtlId: 'GADT_0000000001'
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200) {
                        if (callback) {
                            return callback(response.data.datas.dlUser)
                        }
                    }
                })
                .catch(error => {
                    console.error(error)
                })

        },

    },
    data () {
        return {
            mounted: false,
            disable: false,
            siteMstrId:'',
            aprvInfoId: null,

            remicons: ['아스콘', '레미콘'],

            // information - by category
            docSeq: '',
            mresDocSeq: '',
            status: {
                list: [
                    {
                        id: 'REGT',
                        value: '등록',
                    },
                    {
                        id: 'APVL',
                        value: '결재중',
                    },
                    {
                        id: 'APRV',
                        value: '승인',
                    },

                ],
                current: '',
            },
            orderType: {
                list: [
                    {
                        id: 'HEC',
                        value: '당사지급'
                    },
                    {
                        id: 'ORDR',
                        value: '발주자'
                    },
                    {
                        id: 'PTNR',
                        value: '협력사'
                    },

                ],
                current: 'HEC'
            },
            materialInfo: {
                mainCode: null,
                mainCodeId: null,
                midCode: null,
                midCodeId: null,
                prdtNm: null,
                sppr: null,
                spprNm: null,
                mnft: null,
                comment: null,
                mtrlPrjtDtlId: null,
                newPrdtYn: 'N'
            },
            addr: null,
            addrMaxSize: 100,
            ksCtfc: {
                isCertified: true,
                number: '',
                evntSignYn: false,
                grCtfcYn: false,
                hbCtfcYn: false,
                etcCtfcYn: false,
            },
            detailInfo: {
                sheet: null,
                data: [],
                options: {},
                addCount: 1,
            },

            csrtOpn: {
                contents: '',
                maxSize: 500
            },
            spct: {
                contents: '',
                maxSize: 500
            },
            attachments: {
                qltCertYn: false,
                bsnsRgstYn: false,
                catalogYn: false,
                fctrRgstCertYn: false,
                testReptYn: false,
                dlvrPerfYn: false,
                sampleYn: false,
                etcYn: false,
                taxCertYn: false,
                testPerfYn: false,

                file: {
                    fileRegistered: [],
                    files: [],
                    requestForDelete: []
                },
                image: {
                    fileRegistered: [],
                    files: [],
                    requestForDelete: [],
                    copiedFileIds : [],
                    resetCopyYn:false,
                }
            },



            approve: {
                codeType: 'MTRL',
                codeDtlType: 'MREQ',
                docName: '',
                fileType: 'MeterialMngt',
                siteMstrId: ''
            }
            
        }
    }
}
</script>

