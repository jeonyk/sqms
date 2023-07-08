<template>
    <section id="ExtCheckInsctrInclinView" class="tab_contents">
        <!-- <Breadcrumb :currentPath="$route.fullPath" /> -->
        <h2 class="sub_title">{{'점검자 별 성향 > 점검자 별 성향 상세'}}
            <div class="fr">
                <button 
                    type="button" 
                    class="btn btn_md btn_outline btn_gray"
                    @click="$router.push({name: 'ExtCheckInsctrInclinSheet'})"
                >
                    이전
                </button>
            </div>
        </h2>

        <div class="tab_area">
            <div class="inner">
                <!-- <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel">엑셀 다운로드</button>
                </div> -->

                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="30%">
                            <col width="*">
                            <col width="15%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>점검기관 (부서)</th>
                                <td>{{defaultInfo.extrnlInsttNm}}</td>
                                <th>점검자</th>
                                <td>{{defaultInfo.insctrNm}}</td>
                            </tr>
                            <tr>
                                <th><s>지적사항 건수 (총 / </s>{{defaultInfo.projectCnt}}<s>개 현장 평균)</s></th>
                                <td>{{defaultInfo.poutMatterCnt}}<s>건 / </s>{{defaultInfo.poutMatterAvg}}<s>건</s></td>
                                <th>벌점 누계</th>
                                <td>{{defaultInfo.lastDemSum}}<s>점</s></td>
                            </tr>
                            <tr>
                                <th>점검자 분석 점수</th>
                                <td colspan="3"><s>우호도 : </s>{{defaultInfo.mmnyFrndsp}}<s>점 / 적극성 : </s>{{defaultInfo.chckIntatv}}<s>점 / 협의 가능성 : </s>{{defaultInfo.dscssPosbl}}<s>점</s></td>
                            </tr>
                            <tr>
                                <th>점검 현장</th>
                                <td colspan="3">
                                    {{defaultInfo.projectNm}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                        <strong>1. 점검자 이력(평가결과)</strong>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div :id="`ExtCheckInsctrInclinView_evaluation`" class="ibsheet_table" style="max-height: 371px"></div>
                </div>

                <div class="button_box">
                        <strong>2. 점검자 이력(지적사항)</strong>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div :id="`ExtCheckInsctrInclinView_pointOut`" class="ibsheet_table" style="max-height: 337px"></div>
                </div>
            </div>
        </div>

        <file-download
            :ref-id="'ExtCheckInsctrInclinView_fileDownload'"
            modal-title="파일보기"
            :file-connect-id="pointOut.fileConnectId"
            file-type="ExtCheck"
        />

        
    </section>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import loader from '@ibsheet/loader'
import axios from 'axios'

import FileDownload from '@modal/common/FileDownloadModal.vue'

import { EXT_CHCK_INSCTR_EVALUATION, EXT_CHCK_INSCTR_POINTOUT } from '@plugin/ibsheet/checkEdu/extCheck.js'
import { mapGetters } from 'vuex'

export default {
    name: 'ExtCheckInsctrInclinView',
    mixins: [MsgBoxMixins],
    components: {
        FileDownload,
    },
    computed: {
        ...mapGetters({
            insctrId:       'getExtCheckInsctrId',
            extrnlInsttId:  'getExtCheckExtrnlInsttId',
        }),
    },
    mounted: function () {
        this.$nextTick(() => {
            this.fn_initialize()
            this.fn_fetchDefault()
        })
    },
    methods: {
        fn_initialize: function () {

            /** 평가결과 */
            this.evaluation.options = EXT_CHCK_INSCTR_EVALUATION.options
            this.evaluation.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchEvaluation()
                },

            }

            loader.createSheet({
                el: `ExtCheckInsctrInclinView_evaluation`,
                data: this.evaluation.data,
                options: this.evaluation.options
            }).then(sheet => {
                this.evaluation.sheet = sheet
            })


            /** 지적사항 */
            this.pointOut.options = EXT_CHCK_INSCTR_POINTOUT.options
            this.pointOut.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchPointOut()
                },
                onAfterClick: event => {
                    if (event.col === 'dcsnFileYn' && event.row.dcsnFileYn === 0) {
                        this.pointOut.fileConnectId = event.row.dcsnFileConnectId

                        this.$bvModal.show('ExtCheckInsctrInclinView_fileDownload')
                    }
                }

            }
            loader.createSheet({
                el: `ExtCheckInsctrInclinView_pointOut`,
                data: this.pointOut.data,
                options: this.pointOut.options,
            }).then(sheet => {
                this.pointOut.sheet = sheet
            })

        },

        fn_fetchDefault: function () {
            const url = '/sendApi/api/extrnlChck/extrnlChckInsttInsctrInclnDtl/view'
            const payload = {
                searchExtrnlInsttId:    String(this.extrnlInsttId),
                insctrId:               this.insctrId,
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
                   
                    this.defaultInfo.extrnlInsttNm      = response.data.dmInsctrIncln.extrnlInsttNm
                    this.defaultInfo.insctrNm           = response.data.dmInsctrIncln.insctrNm
                    this.defaultInfo.poutMatterCnt      = response.data.dmInsctrIncln.poutMatterCnt
                    this.defaultInfo.poutMatterAvg      = response.data.dmInsctrIncln.poutMatterAvg
                    this.defaultInfo.lastDemSum         = response.data.dmInsctrIncln.lastDemSum
                    this.defaultInfo.mmnyFrndsp         = response.data.dmInsctrIncln.mmnyFrndsp
                    this.defaultInfo.chckIntatv         = response.data.dmInsctrIncln.chckIntatv
                    this.defaultInfo.dscssPosbl         = response.data.dmInsctrIncln.dscssPosbl
                    this.defaultInfo.projectNm          = response.data.dmInsctrIncln.projectNm
                    this.defaultInfo.projectCnt         = response.data.dmInsctrIncln.projectCnt
                })
                .catch(() => {
                    // 없는 사람 정보를 조회해오는걸 돌려야할듯
                })
        },
        fn_fetchEvaluation: function () {
            const url = '/sendApi/api/extrnlChck/extrnlChckInsttInsctrInclnDtl/list'
            const payload = {
                searchExtrnlInsttId:    this.extrnlInsttId,
                insctrId:               this.insctrId,
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
                    if (this.evaluation.sheet) {
                        this.evaluation.data = response.data.dlInsctrInclnDtl
                        this.evaluation.sheet.loadSearchData({
                            data: this.evaluation.data,
                        })
                    }
                })
        },
        fn_fetchPointOut: function () {
            const url = '/sendApi/api/extrnlChck/extrnlChckInsttInsctrPoutMatterDtl/list'
            const payload = {
                searchExtrnlInsttId:    this.extrnlInsttId,
                insctrId:               this.insctrId,
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

                    if (this.pointOut.sheet) {
                        this.pointOut.data  = response.data.dlInsctrPout.map(item => {
                                                    item.dcsnFileYn = Number(item.dcsnFileConnectCnt) > 0 ? '0' : null

                                                    return item
                                                })
                        this.pointOut.sheet.loadSearchData({
                            data: this.pointOut.data,
                        })
                    }
                })
        },
        
        fn_download: function () {

        }
    },
    data: function () {
        return {

            /** 기본정보 */
            defaultInfo: {
                extrnlInsttId: '',
                extrnlInsttNm: '',
                insctrId: '',
                insctrNm: '',
                insctrDeptNm: '',
                insctrRspofc: '',
                projectNm: '',
                projectCnt: 0,
                poutMatterCnt: 0,
                mmnyFrndsp: 0,
                chckIntatv: 0,
                dscssPosbl: 0,
                poutMatterAvg: 0,
                lastDemSum: 0,
            },


            evaluation: {
                options: null,
                data: [],
                sheet: null,
            },
            pointOut: {
                options: null,
                data: [],
                sheet: null,

                fileConnectId: '',
            },
        }
    }
}
</script>
