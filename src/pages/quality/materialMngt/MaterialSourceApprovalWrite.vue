<template>
    <section class="tab_contents">
        <div class="inner type2">
            <h2 class="sub_title"> 자재공급원 승인
                <div class="fr">
                    <button 
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="clickRegister"
                    >
                        등록
                    </button>
                    <button 
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                    >
                        결재상신
                    </button>
                    <button 
                        type="button" 
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="$router.go(-1)"
                    >
                        목록
                    </button>
                </div>
            </h2>

            <div class="lst_data mt0">
                <div class="data_tit"><span class="emp_red">1. 발주TYPE</span></div>
                <div class="line_box">
                    <label class="input_radio"
                        v-for="(item, index) in orderType.list"
                        :for="`orderType_${index}`"
                        :key="item.id"
                    >
                        <input
                            type="radio"
                            v-model="orderType.current"
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
                                            v-b-modal="'productSelectModal'"
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
                                            disabled
                                        >
                                        <button 
                                            type=button 
                                            class="btn_search"
                                            v-b-modal="'SupplySelect'"
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
                                        placeholder="입력해주세요"
                                    >
                                </td>
                                <td>
                                    <input 
                                        v-model="materialInfo.comment"
                                        type="text" 
                                        class="form_control"  
                                        placeholder="입력해주세요"
                                    >
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="table_message ar">제조업체 구분은 (쉼표)로 입력해주세요.</p>

                <div class="data_tit"><span class="emp_red">3. 주소</span></div>
                <textarea
                    v-model="address"
                    class="form_control textarea"
                    placeholder="공급업체 주소를 입력해주세요."
                />

                <div class="data_tit"><span class="emp_red">4. 인증여부</span></div>
                <div class="line_box">
                    <div class="multi_form">
                        <label class="input_radio" for="">
                            <input 
                                type="radio" 
                                v-model="ksCtfc.isCertified" 
                                :value="true"
                            >
                            <span class="label_text">KS</span>
                        </label>
                        <input 
                            v-model="ksCtfc.number"
                            type="text" 
                            class="form_control" 
                            placeholder="인증번호/규격번호"
                            :disabled="!ksCtfc.isCertified"
                        >
                    </div>
                    <label class="input_radio" for="">
                        <input 
                            type="radio" 
                            v-model="ksCtfc.isCertified" 
                            :value="false"
                        >
                        <span class="label_text">비 KS</span>
                    </label>
                </div>
                <div class="line_box check_area">
                    <label class="input_check">
                        <input type="checkbox" v-model="ksCtfc.evntSignYn">
                        <span class="label_text">환경표지</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" v-model="ksCtfc.grCtfcYn">
                        <span class="label_text">GR인증</span>
                    </label>
                    <label class="input_check">
                        <input type="checkbox" v-model="ksCtfc.hbCtfcYn">
                        <span class="label_text">HB인증</span>
                    </label>
                </div>

                <div class="data_tit">5. 품명/ 규격/ 설계량
                    <div class="fr">
                        <!-- ibsheet -->
                        <button
                            type="button"
                            class="btn btn_sm btn_darkgray"
                            @click="clickCopyRows()"
                        >
                            행 복사
                        </button>

                        <div 
                            class="btn_number"
                        >
                            <select
                                v-model="detailInfo.addCount"
                                class="form_control num"
                            >
                                <option
                                    v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                    :key="count"
                                    :value="count"
                                >
                                    {{ String(count).padStart(3, '0') }}
                                </option>    
                            </select>
                            <button
                                type="button"
                                class="btn btn_sm"
                                @click="clickAddRows()"
                            >
                                행 추가
                            </button>
                        </div>

                        <button 
                            type="button" 
                            class="btn btn_sm btn_darkgray"
                            @click="clickDeleteRow()"
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
                    @keydown="validateComment"
                />
                <p class="table_message ar">{{this.csrtOpn.contents.length}} / {{this.csrtOpn.maxSize}}</p>

                <div class="data_tit">7. 특이사항</div>
                <textarea 
                    v-model="spct.contents"  
                    class="form_control textarea"
                    @keydown="validateComment"
                />
                <p class="table_message ar">{{this.spct.contents.length}} / {{this.spct.maxSize}}</p>


                <div class="data_tit">8. 첨부파일</div>
                <div class="line_box check_area">
                    <div>
                        <label class="input_check">
                            <input type="checkbox" v-model="attachments.qltCertYn">
                            <span class="label_text">품질인증서</span>
                        </label>
                        <label class="input_check">
                            <input type="checkbox" v-model="attachments.bsnsRgstYn">
                            <span class="label_text">사업자등록증</span>
                        </label>
                        <label class="input_check">
                            <input type="checkbox" v-model="attachments.catalogYn">
                            <span class="label_text">CATALOG</span>
                        </label>
                        <label class="input_check">
                            <input type="checkbox" v-model="attachments.fctrRgstCertYn">
                            <span class="label_text">공장등록증</span>
                        </label>
                        <label class="input_check">
                            <input type="checkbox" v-model="attachments.testReptYn">
                            <span class="label_text">시험성적서</span>
                        </label>
                        <div class="mt10">
                            <label class="input_check">
                                <input type="checkbox" v-model="attachments.dlvrPerfYn">
                                <span class="label_text">납품실적</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" v-model="attachments.sampleYn">
                                <span class="label_text">견본</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" v-model="attachments.etcYn">
                                <span class="label_text">기타</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" v-model="attachments.taxCertYn">
                                <span class="label_text">국세/지방세 납부증명서</span>
                            </label>
                            <label class="input_check">
                                <input type="checkbox" v-model="attachments.testPerfYn">
                                <span class="label_text">시험성과 대비표</span>
                            </label>
                        </div>
                    </div>
                </div>

                <LstFile
                    :files="attachments.file.files"
                    @file-changed="fileChanged"
                    @file-removed="fileRemoved"
                 />

                <div class="data_tit">9. 사진등록</div>
                <LstImg
                    :files="attachments.image.files"
                    :copied-file-ids="attachments.image.copiedFileIds"
                    @file-changed="imageChanged"
                    @file-removed="imageRemoved"
                    :file-type="'materialSourceWriteQltyPicturePop'"
                 />

            </div>
        </div>

        <product-select-modal
            :id="'productSelectModal'"
            :main-code-id="materialInfo.mainCodeId"
            :mid-code-id="materialInfo.midCodeId"
            :new-prdt-yn="materialInfo.newPrdtYn"
            :product-name="materialInfo.prdtNm"
            @selected="selectProduct"
        />
        <supply-select
            @fn-supply-choice="selectSupplyOperation"
            :site-mstr-id="siteMstrId"
        />

        <wrapped-alert
            :id="popup.alert.id"
            refs="alertPopup"
            :is-show.sync="popup.alert.isShow"
            :message="popup.alert.message"
            @click-confirm="$bvModal.hide(popup.alert.id)"
        />

    </section>
</template>

<script>

import LstFile from '@/pages/common/popup/LstFile'
import LstImg from '@/pages/common/popup/LstImg'
import ProductSelectModal from '@/pages/quality/materialMngt/component/ProductSelectModal'
import SupplySelect from '@/pages/common/popup/SupplySelect'
import WrappedAlert from "@/pages/quality/materialMngt/component/WrappedAlert"
// import API from '@/pages/quality/materialMngt/apis/material'
import API from '@/apis/'

import { MaterialApproval } from '@/pages/common/data/MaterialsList'

import loader from '@ibsheet/loader'

export default {
    name: 'MaterialSourceApprovalWrite',
    components: {
        LstFile,
        LstImg,
        ProductSelectModal,
        SupplySelect,
        WrappedAlert,
    },
    watch: {
        'orderType.current': {
            handler () {
                // console.log(this.orderType.current)
            },
            deep: true
        },
        'attachments.file.files': {
            handler () {
                // console.log(this.attachments.file.files)
            }
        }
    },

    mounted () {
        this.initializeGrid()
        
        this.mounted = true

        this.siteMstrId = this.$cookies.get("siteMstrId");
    },
    beforeDestroy () {
        if(this.detailInfo.sheet) this.detailInfo.sheet.dispose()
    },
    methods: {
        validateComment() {
            if (this.getStringBtye(this.csrtOpn.contents) >= this.csrtOpn.maxByteSize) {
                // over maxByteSize 
            }
        },
        getStringBtye (str) {
            return str.split('').map(s => s.charCodeAt(0)).reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0)
        },
        fileChanged (payload) {
            this.attachments.file.files = payload
        },
        fileRemoved (payload) {
            this.attachments.file.requestForDelete = payload
        },
        imageChanged (payload) {
            // console.log(payload)
            this.attachments.image.files = payload.file;
            this.attachments.image.copiedFileIds = payload.copyIds;
        },
        imageRemoved (payload) {
            // console.log(payload)
            this.attachments.image.requestForDelete = payload
        },
        selectProduct (item) {
            // console.log(item)
            this.materialInfo.mainCode = item.mainName
            this.materialInfo.mainCodeId = item.mainCodeId
            this.materialInfo.midCode = item.midName
            this.materialInfo.midCodeId = item.midCodeId
            this.materialInfo.mtrlPrjtDtlId = item.mtrlPrjtDtlId
            this.materialInfo.prdtNm = item.productName
            this.materialInfo.newPrdtYn = item.newPrdtYn
            
            this.setProductName()
        },
        selectSupplyOperation (item) {
            // console.log(item)
            this.materialInfo.sppr = item.tradeId
            this.materialInfo.spprNm = item.tradeNm

        },
        initializeGrid () {

            this.detailInfo.options = MaterialApproval.options

            loader.createSheet({
                el: 'MaterialSourceApprovalWrite',
                data: [{}],
                options: this.detailInfo.options
            }).then(sheet => {
                this.detailInfo.sheet = sheet
            })
        },
        clickCopyRows () {
            const checkedRows = this.detailInfo.sheet.getRowsByChecked(this.detailInfo.options.Cols[0].Name)
            this.detailInfo.sheet.copyRows(checkedRows, this.detailInfo.sheet.getFirstRow())
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
        clickRegister () {
            // console.log('click register')

            let validate = false

            // 품명/규격/설계량 제외 빈값체크
            if( this.orderType.current === null 
                || this.checkVoid(String(this.materialInfo.prdtNm).trim())              // materialInfo
                || this.checkVoid(String(this.address).trim()) 
                || this.ksCtfc.isCertified === null
                || this.checkVoid(String(this.materialInfo.sppr).trim())
                || this.checkVoid(String(this.materialInfo.mnft).trim())
                || this.detailInfo.sheet.getSaveJson({ saveMode: 3}).data.length === 0
                ) {
                
                validate = true
                this.openAlertPopup('필수 입력 항목이 누락되었습니다.')
            }

            // validate = true
            if(!validate) this.writeData()
        },
        async writeData () {
            const payload = {
                siteMstrId : this.$cookies.get("siteMstrId"),

                orderType: this.orderType.current,
                sppr: this.materialInfo.sppr,
                spprNm: this.materialInfo.spprNm,
                mnft: this.materialInfo.mnft,
                comment: this.materialInfo.comment,
                addr: this.address,
                ksCtfcYn: this.ksCtfc.isCertified ? 'Y' : 'N',
                ksCtfcNum: this.ksCtfc.number,
                evntSignYn: this.ksCtfc.evntSignYn ? 'Y' : 'N',
                grCtfcYn: this.ksCtfc.grCtfcYn ? 'Y' : 'N',
                hbCtfcYn : this.ksCtfc.hbCtfcYn ? 'Y' : 'N',
                csrtOpn : this.csrtOpn.contents,
                spct: this.spct.contents,

                qltCertYn: this.attachments.qltCertYn ? 'Y' : 'N',
                bsnsRgstYn: this.attachments.bsnsRgstYn ? 'Y' : 'N',
                categoryYn : this.attachments.catalogYn ? 'Y' : 'N',
                fctrRgstCertYn : this.attachments.fctrRgstCertYn ? 'Y' : 'N',
                testReptYn : this.attachments.testReptYn ? 'Y' : 'N',
                dlvrPerfYn : this.attachments.dlvrPerfYn ? 'Y' : 'N',
                sampleYn : this.attachments.sampleYn ? 'Y' : 'N',
                etcYn : this.attachments.etcYn ? 'Y' : 'N',
                taxCertYn : this.attachments.taxCertYn ? 'Y' : 'N',
                testPerfYn : this.attachments.testPerfYn ? 'Y' : 'N',

                sourceApprovalSub: this.detailInfo.sheet.getSaveJson({
                    saveMode: 3
                }).data.filter(item => item.STATUS !== 'Deleted'),

                newPrdtYn: this.materialInfo.newPrdtYn,
                prdtNm: this.materialInfo.prdtNm,
                mainCode: this.materialInfo.mainCode,
                mainCodeId: this.materialInfo.mainCodeId,
                midCode: this.materialInfo.midCode,
                midCodeId : this.materialInfo.midCodeId,
                mtrlPrjtDtlId: this.materialInfo.mtrlPrjtDtlId

            }

            let success = false

            try {
                const response = await API.material.addSourceApproval(payload)

                if(response.status === 200 && response?.data) {
                    // console.log('@approval save successed')
                    // 파일처리

                    // console.log('@files upload start')
                    success = true

                    if ( this.attachments.file.files.length > 0 ) {
                        const fileResponse = await API.material.setFile(response.data.data.mtrlSpApprId, this.attachments.file.files)
    
                        if (fileResponse.status === 200 && fileResponse?.data?.data > 0) {
                            // file upload 성공
                            success = true
                        } else {
                            success = false
                        }

                    }

                    if (this.attachments.image.files.length > 0 || this.attachments.image.copiedFileIds.length > 0) {
                        const imageResponse = await API.material.setFile(response.data.data.mtrlSpApprId, this.attachments.image.files, 'MeterialMngtImg',this.attachments.image.copiedFileIds)

                        if (imageResponse.status === 200 && imageResponse?.data?.data > 0)  {
                            success = true
                        } else {
                            success = false
                        }
                    }

                } 
                
            } catch (error) {
                console.error('addSourceApprovalList')
                success = false

            }

            // write 절차 종료후 alert popup
            if (success) {
                this.openAlertPopup('자재공급원 승인이 등록되었습니다.')
                this.$router.go(-1)
            } else {
                this.openAlertPopup('자재공급원 승인 등록에 실패했습니다.')
            }
        },
        openAlertPopup (message) {
            this.popup.alert.message = message
            // this.popup.alert.isShow = true
            this.$bvModal.show(this.popup.alert.id)
        },
        checkVoid(str) {
            return ( str === null || str === '')
        },
        setProductName (prdtNm = this.materialInfo.prdtNm) {
            this.detailInfo.sheet.getDataRows().forEach(row => {
                row.prdtNm = prdtNm
                this.detailInfo.sheet.refreshRow(row)
            })

        }

    },
    data () {
        return {
            mounted: false,
            siteMstrId: '',
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
                        value: '협력자'
                    },

                ],
                current: null
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
            address: null,
            ksCtfc: {
                isCertified: null,
                number: '',
                evntSignYn: false,
                grCtfcYn: false,
                hbCtfcYn: false,
            },
            detailInfo: {
                sheet: null,
                options: {},
                addCount: 1
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
                qltCertYn: true,
                bsnsRgstYn: true,
                catalogYn: true,
                fctrRgstCertYn: true,
                testReptYn: true,
                dlvrPerfYn: true,
                sampleYn: true,
                etcYn: true,
                taxCertYn: true,
                testPerfYn: true,

                file: {
                    fileRegistered: [],
                    files: [],
                    requestForDelete: []
                },
                image: {
                    fileRegistered: [],
                    files: [],
                    copiedFileIds : [],
                    requestForDelete: []
                }
            },
            popup: {
                productSelect: {
                },
                alert: {
                    id: 'sourceApprovalSheetAlert',
                    isShow: false,
                    message: ''
                }
            }
        }
    }

}
</script>
