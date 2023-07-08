<template>
    <section id="ExtCheckSupportRequestView" class="tab_contents">
        <div class="tab_area">
            <div class="inner type2">

                <h2 class="sub_title">지원 요청 > 지원 요청 상세
                    <div class="fr">
                        <button 
                            type="button" 
                            class="btn btn_md btn_outline btn_darkgray"
                            @click="$router.push({name: 'ExtCheckSupportRequestSheet'})"
                        >
                            {{'목록'}}
                        </button>
                    </div>
                </h2>

                <div class="button_box">
                    <strong>1. 점검정보</strong>
                </div>
                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="13%">
                            <col width="13%">
                            <col width="19%">
                            <col width="8%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th class="ac">{{'점검 종류'}}</th>
                                <th class="ac">{{'점검 기관'}}</th>
                                <th class="ac">{{'점검일'}}</th>
                                <th class="ac">{{'점검자'}}</th>
                                <th class="ac">{{'제목'}}</th>
                            </tr>
                            <tr>
                                <td class="ac">{{checkInfo.chckKndNm}}</td>
                                <td class="ac">{{checkInfo.extrnlInsttNm}}</td>
                                <td class="ac">{{ checkInfo.chckde }}</td>
                                <td class="ac">{{checkInfo.insctrNmDtls}}</td>
                                <td>{{checkInfo.chckPurpsCn}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>2. 지원요청 정보</strong>
                </div>

                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="10%">
                            <col width="20%">
                            <col width="10%">
                            <col width="20%">
                        </colgroup>
                        <tbody>
                            <tr v-if="supportType === 'hedofcBsrp'">
                                <th>구분</th>
                                <td colspan="3">본사 출장</td>
                            </tr>
                            <tr>
                                <th v-if="supportType !== 'hedofcBsrp'">구분</th>
                                <td v-if="supportType !== 'hedofcBsrp'">이의신청</td>
                                <th>수신자(HEC)</th>
                                <td>{{`${supportReq.recptnDeptNm} / ${supportReq.rcverNm} `}}</td>
                                <th v-if="supportType === 'hedofcBsrp'">출장 요청 기간</th>
                                <td v-if="supportType === 'hedofcBsrp'">{{`${supportReq.sportRequstBgnde} ~ ${supportReq.sportRequstEndde}`}}</td>
                            </tr>
                            <tr>
                                <th>요청자</th>
                                <td>{{supportReq.rqesterNm}}</td>
                                <th>요청일</th>
                                <td>{{$moment(supportReq.upDttm).format('YYYY-MM-DD')}}</td>
                            </tr>
                            <tr v-if="supportType === 'objcAply'">
                                <th>제목</th>
                                <td colspan="3">{{supportReq.sportRequstTitle}}</td>
                            </tr>
                            <tr>
                                <th>요청내용</th>
                                <td colspan="3"><pre class="form_control">{{ supportReq.sportRequstCn }}</pre></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="table_message mt20" v-if="attachments.requstFileConnectId ">※ 지원 요청 관련 자료입니다.</p>
                <LstFile
                    v-if="attachments.requstFileConnectId"
                    :lst-file-rst="attachments.fileRegistered"
                    :uploadable="false"
                    downloadable
                />
            </div>
        </div>
    </section>
</template>

<script>
import LstFile from '@/pages/common/popup/LstFile'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'ExtCheckSupportRequestView',
    components: {
        LstFile,
    },
    computed: {
        ...mapGetters({
            extrnlChckId:   'getExtCheckExtrnlChckId',
            supportType:    'getExtCheckSupportType',
        })
    },
    mounted: function () {
        this.fn_fetchData()
    },
    methods: {
        fn_fetchData: function () {
            const url   = this.supportType === 'hedofcBsrp'
                            ? '/sendApi/api/extrnlChck/extrnlExtrnlChckHedofcSportReq/view'
                            : '/sendApi/api/extrnlChck/extrnlExtrnlChckDcsnResultSportReq/view'
            const payload = {
                extrnlChckId: this.extrnlChckId
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
                    // console.log(response)
                    // response.data.dmHedofcSportReq

                    const data                          = this.supportType === 'hedofcBsrp'
                                                            ? response.data.dmHedofcSportReq
                                                            : response.data.dmDcsnSportReq

                    this.checkInfo.chckKnd              = data.chckKnd
                    this.checkInfo.chckKndNm            = data.chckKndNm
                    this.checkInfo.extrnlInsttId        = data.extrnlInsttId
                    this.checkInfo.extrnlInsttNm        = data.extrnlInsttNm
                    this.checkInfo.insctrNmDtls         = data.insctrNmDtls
                    this.checkInfo.chckPurpsCn          = data.chckPurpsCn
                    this.checkInfo.chckde               = data.chckde
                    this.supportReq.rcverId             = data.rcverId
                                                            || data.resultSportRcverId
                    this.supportReq.rcverNm             = data.rcverNm
                                                            || data.resultSportRcverNm
                    this.supportReq.recptnDeptCd        = data.recptnDeptCd
                                                            || data.resultSportRecptnDeptCd
                    this.supportReq.recptnDeptNm        = data.recptnDeptNm
                                                            || data.resultSportRecptnDeptNm
                    this.supportReq.rqesterId           = data.rqesterId
                                                            || data.resultSportRqesterId
                    this.supportReq.rqesterNm           = data.rqesterNm
                                                            || data.resultSportRqesterNm
                    this.supportReq.upDttm              = data.upDttm
                    this.supportReq.sportRequstTitle    = data.sportRequstTitle
                                                            || data.resultSportRequstTitle
                    this.supportReq.sportRequstCn       = data.sportRequstCn 
                                                            || data.resultSportRequstCn
                    this.supportReq.sportRequstBgnde    = data.sportRequstBgnde
                    this.supportReq.sportRequstEndde    = data.sportRequstEndde

                    this.attachments.fileYn             = data.requstFileYn
                    this.attachments.requstFileConnectId= data.requstFileConnectId

                })
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    // file 존재시
                    if (this.attachments.requstFileConnectId ) {
                        const url = '/sendApi/api/file/upFileList'
                        const payload = {
                            fileConnectId: this.attachments.requstFileConnectId,
                            fileType: 'ExtCheck'
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
                                this.attachments.fileRegistered = response.data.data
                            })
                    }
                })
        },
    },
    data: function () {
        return {
            // 1. 점검 정보
            checkInfo: {
                chckKnd: '',
                chckKndNm: '',

                chckde: '',

                extrnlInsttId: '',
                extrnlInsttNm: '',

                insctrNmDtls: '',
                chckPurpsCn: '',
            },

            // 2. 지원요청 정보
            supportReq: {
                
                rcverId: '',
                rcverNm: '',
                recptnDeptCd: '',
                recptnDeptNm: '',
                
                rqesterId: '',
                rqesterNm: '',

                upDttm: '',

                // brspDate: '',
                sportRequstTitle: '',
                sportRequstCn: '',
                sportRequstBgnde: '',
                sportRequstEndde: '',
            },

            // 첨부파일
            attachments: {
                fileYn: 'N',
                requstFileConnectId: '',
                fileRegistered: [],
            }
        }
    }
}
</script>
