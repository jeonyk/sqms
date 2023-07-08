<template>
    <section id="ExtCheckHelpRequestSheet" class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />

        <div class="lookup_box multi_line mt10">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="4%">
                    <col width="17%">
                    <col width="4%">
                    <col width="17%">
                    <col width="4%">
                    <col width="17%">
                    <col width="4%">
                    <col width="17%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>{{'요청일'}}</th>
                        <td>
                            <datepicker
                                v-model="search.sportRequstDe"
                                :input-style="{'max-width': '290px'}"
                                :format="'YYYYMMDD'"
                            />
                        </td>
                        <th>{{'요청자'}}</th>
                        <td>
                            <input 
                                v-model="search.rqesterNm"
                                type="text" 
                                class="form_control"
                                @keyup.enter="fn_fetchData(search)"
                            />
                        </td>
                        <th>{{'점검 기관'}}</th>
                        <td>
                            <input 
                                v-model="search.searchExtrnlInsttNm"
                                type="text" 
                                class="form_control"
                                @keyup.enter="fn_fetchData(search)"
                            />
                        </td>
                        <th>{{'점검자'}}</th>
                        <td>
                            <input 
                                v-model="search.searchInsctrNm"
                                type="text" 
                                class="form_control"
                                @keyup.enter="fn_fetchData(search)"
                            />
                        </td>
                        <td class="ar">
                            <button 
                                type="button" 
                                class="btn_reset"
                                @click="() => {search.rqesterNm = ''; search.sportRequstDe = null; search.searchExtrnlInsttNm = ''; search.searchInsctrNm = ''; search.searchSportRequstTitle = ''; search.searchRecptnDeptNm = '' }"
                            >
                                {{'초기화'}}
                            </button>
                            <button 
                                type="button" 
                                class="btn btn_sm btn_darkblue btn_radius btn_search"
                                @click="fn_fetchData(search)"
                            >
                                검색
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input 
                                v-model="search.searchSportRequstTitle"
                                type="text" 
                                class="form_control"
                                @keyup.enter="fn_fetchData(search)"
                            />
                        </td>
                        <th>{{'수신자'}}</th>
                        <td>
                            <input 
                                v-model="search.searchRcverNm"
                                type="text" 
                                class="form_control"
                                @keyup.enter="fn_fetchData(search)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table> 
        </div>

        <div class="inner">
            <div class="lst_tabs_round">
                <ul>
                    <li
                        v-for="(item, index) in tab.list"
                        :key="item.type"
                        :class="{active: tab.current === index}" 
                    >
                        <a href="javascript:void(0);" @click="tab.current = index" >
                            {{ item.text }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="button_box">
                <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel" >엑셀 다운로드</button>
            </div>

            <div 
                v-for="(currentTab, tabIndex) in tab.list"
                :key="currentTab.type"
                v-show="tabIndex === tab.current"
                class="ib_wrap"
                style="height: calc(100vh - 390px)"
            >
                <div :id="`ExtCheckSupportRequestSheet_${currentTab.type}`" class="ibsheet_table" style="height:100%;" />
            </div>
        </div>

        <file-download
            :refId="fileModal.refId"
            modal-title="파일 보기"
            :file-connect-id="fileModal.fileConnectId"
            :file-type="fileModal.fileType"
        />
    
        
    </section>
</template>


<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import Datepicker from '@component/common/DatePicker.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
import FileDownload from '@modal/common/FileDownloadModal.vue'
import loader from '@ibsheet/loader'
import axios from 'axios'

import { EXT_CHCK_SUPPORT_REQUEST_HEDOFC_BSRP, EXT_CHCK_SUPPORT_REQUEST_OBJC_APLY  } from '@plugin/ibsheet/checkEdu/extCheck.js'
import { mapGetters } from 'vuex'

export default {
    name: 'ExtCheckSupportRequestSheet',
    mixins: [MsgBoxMixins],
    components: {
        Breadcrumb,
        Datepicker,
        FileDownload,
    },
    computed: {
        ...mapGetters({
            userId: 'auth/getUserId',
        })
    },
    mounted: function () {
        // this.fn_fetchData()
        this.$nextTick(() => {
            this.fn_initialize()
        })
    },
    beforeDestroy: function () {
        this.tab.list.forEach(tab => {
            if (this.data[tab.type].sheet) loader.removeSheet(this.data[tab.type].sheet)
        })
    },
    methods: {
        fn_initialize: function () {
            
            this.data.hedofcBsrp.options    = EXT_CHCK_SUPPORT_REQUEST_HEDOFC_BSRP.options
            this.data.objcAply.options      = EXT_CHCK_SUPPORT_REQUEST_OBJC_APLY.options

            this.data.hedofcBsrp.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchData({})
                },
                onDblClick: (event) => {
                    this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                    this.$store.dispatch('setExtCheckSupportType',  'hedofcBsrp')
                    this.$router.push({name: 'ExtCheckSupportRequestView'})
                }
            }

            this.data.objcAply.options.Events = {
                // 뒷화면은 한번에 받는 것
                // onRenderFirstFinish: (event) => {
                //     this.data.objcAply.sheet = event.sheet
                // }
                onDblClick: (event) => {
                    if (event.col !== 'requstFileYn') {
                        this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                        this.$store.dispatch('setExtCheckSupportType',  'objcAply')
                        this.$router.push({name: 'ExtCheckSupportRequestView'})
                    }
                },
                onAfterClick: (event) => {
                    if (event.col === 'requstFileYn' && event.row[event.col] === 0) {
                        this.fileModal.fileConnectId = event.row.requstFileConnectId
                        this.$bvModal.show(this.fileModal.refId)
                    }
                },
            }

            
            loader.createSheet({
                el: 'ExtCheckSupportRequestSheet_hedofcBsrp',
                data: [],
                options: this.data.hedofcBsrp.options,
            }).then(sheet => {
                this.data.hedofcBsrp.sheet = sheet
            })
            loader.createSheet({
                el: 'ExtCheckSupportRequestSheet_objcAply',
                data: [],
                options: this.data.objcAply.options,
            }).then(sheet => {
                this.data.objcAply.sheet = sheet
            })

        },
        fn_fetchData: function (_payload, callback) {
            const url = '/sendApi/api/extrnlChck/extrnlExtrnlChckSportReq/list'
            const payload = {
                userId: this.userId,
                ..._payload,
            }
            if (payload.sportRequstDe) {
                payload.searchStartDt = payload.sportRequstDe
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

                    if (callback) {
                        return callback(response)
                    } else {
                        this.data.hedofcBsrp.data   = response.data.dlHedofcSportReq
                        this.data.objcAply.data     = response.data.dlDcsnSportReq

                        this.data.hedofcBsrp.data.forEach(item => {
                            item.chckde          = `${item.chckPlanBgnde} ~ ${item.chckPlanEndde}`
                            item.sportRequstDe   = `${item.sportRequstBgnde} ~ ${item.sportRequstEndde}`
                            item.rcverNm         = `${item.recptnDeptNm} / ${item.rcverNm}`
                        })
                        this.data.objcAply.data.forEach(item => {
                            item.chckde                 = `${item.chckPlanBgnde} ~ ${item.chckPlanEndde}`
                            item.resultSportRcverNm     = item.resultSportRcverNm ? `${item.resultSportRecptnDeptNm} / ${item.resultSportRcverNm}` : ''
                            item.requstFileYn           = item.requstFileConnectCnt && item.requstFileConnectCnt > 0? '0' : null
                            item.resultSportRequstDttm  = item.resultSportRequstDttm || this.$moment(item.upDttm).format('YYYY-MM-DD')
                        })

                        this.data.hedofcBsrp.sheet.loadSearchData({
                            data: this.data.hedofcBsrp.data
                        })
                        this.data.objcAply.sheet.loadSearchData({
                            data: this.data.objcAply.data
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        /** 엑셀 다운로드 */
        fn_exportExcel: function () {
            this.data[this.tab.list[this.tab.current].type].sheet.down2Excel({
                merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                reqHeader:  {
                                'Authorization': this.$cookies.get('Authorization'),
                                'Accept-Language': 'ko'
                            },
                fileName:   `지원요청_${this.tab.list[this.tab.current].text}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
            })
        },

    },
    data: function () {
        return {

            // tab-info
            tab: {
                list: [ 
                    {
                        text: '본사 출장 지원',
                        type: 'hedofcBsrp'
                    }, 
                    {
                        text: '이의 신청 지원',
                        type: 'objcAply'
                    } 
                ],
                current: 0,
            },

            // search-box
            search: {
                rqesterNm: '',
                sportRequstDe: null,
                searchExtrnlInsttNm: '',
                searchInsctrNm: '',
                searchSportRequstTitle: '',
                // searchRecptnDeptNm: '',
                searchRcverNm: '',
            },

            // data
            data: {
                hedofcBsrp: {
                    sheet: null,
                    data: [],
                    options: null,
                },
                objcAply: {
                    sheet: null,
                    data: [],
                    options: null,
                }
            },

            // fileDownloadModal
            fileModal: {
                refId: 'ExtCheckSupportRequestSheet_fileDown',
                fileConnectId: '',
                fileType: 'ExtCheck'
            }


        }
    }
}
</script>
