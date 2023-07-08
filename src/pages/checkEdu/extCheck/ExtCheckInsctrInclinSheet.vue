<template>
    <section id="ExtCheckInsctrInclinSheet" class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />

        <div class="tab_area">
            <div class="lookup_box multi_line mt15">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="5%">
                        <col width="20%">
                        <col width="5%">
                        <col width="20%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>{{'점검 기관'}}</th>
                            <td>
                                <input 
                                    v-model="search.extrnlInsttNm"
                                    class="form_control size_md"
                                    type="text"
                                    :placeholder="'입력해주세요'"
                                    @keyup.enter="fn_fetchInsctr(search)"
                                />
                            </td>
                            <th>{{'점검자'}}</th>
                            <td>
                                <input 
                                    v-model="search.insctrNm"
                                    class="form_control size_md"
                                    type="text"
                                    :placeholder="'입력해주세요'"
                                    @keyup.enter="fn_fetchInsctr(search)"
                                />
                            </td>
                            <td class="ar">
                                <button 
                                    type="button" 
                                    class="btn_reset"
                                    @click="search = {extrnlInsttNm: '', insctrNm: ''}"
                                >
                                    {{'초기화'}}
                                </button>
                                <button 
                                    type="button" 
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                                    @click="fn_fetchInsctr(search)"
                                >
                                    {{'검색'}}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner">
                <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel">엑셀 다운로드</button>
                    <!-- <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray">등록</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray">삭제</button> 
                    </div> -->
                </div>

                <div class="ib_wrap" style="height: calc(100vh - 270px)">
                    <div :id="`ExtCheckInsctrInclinSheet_sheet`" class="ibsheet_table" style="height: 100%" />
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
import loader from '@ibsheet/loader'
import axios from 'axios'

import { EXT_CHCK_INSCTR_INCLINATION } from '@plugin/ibsheet/checkEdu/extCheck.js'

export default {
    name: 'ExtCheckInsctrInclinSheet',
    mixins: [MsgBoxMixins],
    components: {
        Breadcrumb,
    },
    mounted: function () {
        this.$nextTick(() => {
            this.fn_initialize()
        })
    },
    methods: {
        fn_initialize: function () {
            this.insctrInclin.options = EXT_CHCK_INSCTR_INCLINATION.options


            this.insctrInclin.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchInsctr()
                },
                onDblClick: (event) => {
                    this.$store.dispatch('setExtCheckInsctrId', event.row.insctrId)
                    this.$store.dispatch('setExtCheckExtrnlInsttId', event.row.extrnlInsttId)
                    this.$router.push({
                        name: 'ExtCheckInsctrInclinView'
                    })
                },
            }

            loader.createSheet({
                el: `ExtCheckInsctrInclinSheet_sheet`,
                data: this.insctrInclin.data,
                options: this.insctrInclin.options
            }).then(sheet => {
                this.insctrInclin.sheet = sheet
            })

            
        },

        fn_fetchInsctr: function (_payload) {
            const url = '/sendApi/api/extrnlChck/extrnlChckInsttInsctrIncln/list'
            const payload = {
                ..._payload,
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
                    this.insctrInclin.data = response.data.dlInsctrIncln

                    this.insctrInclin.sheet.loadSearchData({
                        data: this.insctrInclin.data
                    })
                })
                .catch(error => {
                    console.error(error)
                })
        },

        /** 엑셀 다운로드 */
        fn_exportExcel: function () {
            this.insctrInclin.sheet.down2Excel({
                merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                reqHeader:  {
                                'Authorization': this.$cookies.get('Authorization'),
                                'Accept-Language': 'ko'
                            },
                fileName:   `대외점검_점검기관_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
            })
        },
    },
    data: function () {
        return {
            search: {
                extrnlInsttNm: '',
                insctrNm: '',
            },
            insctrInclin: {
                options: null,
                data: [],
                sheet: null,
            }
        }
    }
}

</script>
