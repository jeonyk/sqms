<template>
    <section name="ApprovedDocSet" class="tab_contents">
        <div class="inner type2">
            <div class="button_box">
                <div class="fr" :style="{'margin-left':'10px'}">
                    <button
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="$router.push({ name: 'ApprovedDocSheet' })"
                    >
                        목록
                    </button>
                </div>
            </div>
            <div class="button_box">
                <strong> {{'전자서명 설정'}} </strong>
            </div>

            <div class="file_box">
                <div class="img_wrap">
                    <div class="img_area">
                        <!-- IMG -->
                        <img
                            :src="sign.image"
                            style="max-width: 100%;"
                            alt="서명"
                        />
                    </div>
                </div>

                <div class="files">

                    <div>
                        <button 
                            type="button" 
                            class="btn btn_sm btn_darkblue ml20" 
                            @click="$bvModal.show(`ApprovedDocSet_sign`)"
                        >
                            {{'그리기'}}
                        </button>
                    </div>
                    <p class="table_message">파일 선택: 00*00 Pixel / gif, jpg, jpeg, png 가능</p>
                    <button type="button" class="btn_del" @click="confirm('삭제하시겠습니까?',fn_removeSign)">삭제</button>
                </div>
            </div>

            <div class="button_box mt30">
                <strong> {{'자주 쓰는 결재라인'}} </strong>
                <div class="fr">
                    <button
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="$bvModal.show('ApprovedDocSet_line_modal')"
                    >
                        <!-- addedModal -->
                        {{'추가'}}
                    </button>
                </div>
            </div>

            <div class="ib_wrap" style="height: calc(50vh - 280px)">
                <div id="ApprovedDocSet_line" class="ibsheet_table" style="height:100%" />
            </div>

            <div class="button_box mt30" >
                <strong>{{'대결(부재/위임) 설정'}}</strong>
                <div class="fr">
                    <button
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="$bvModal.show('ApprovedDocSet_agncy')"
                    >
                        <!-- @click="" -->
                        {{'대결 등록'}}
                    </button>
                </div>
            </div>

            <div class="ib_wrap" style="height: calc(50vh - 280px)">
                <div id="ApprovedDocSet_agncy" class="ibsheet_table" style="height:100%" />
            </div>



        </div>

        <!-- modal -->
        <regist-approval-sign
            :ref-id="`ApprovedDocSet_sign`"
            @callback="fn_fetchSign"
        />

        <regist-approval-agncy
            :ref-id="'ApprovedDocSet_agncy'"
            @callback="fn_fetchAgncyAprvInfo()"

        />

        <approval-line-add
            :ref-id="`ApprovedDocSet_line_modal`"
        />
    </section>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { mapGetters } from 'vuex'
import loader from '@ibsheet/loader'
import axios from 'axios'

import RegistApprovalSign from '@modal/myWork/RegistApprovalSign.vue'
import RegistApprovalAgncy from '@modal/myWork/RegistApprovalAgncy.vue'
import ApprovalLineAdd from '@modal/approval/ApprovalLineAdd.vue'

import { APPRV_LINE_LOADED_LINE, APPRV_LINE_AGNCY } from '@plugin/ibsheet/myWork/approvedDoc.js'

export default {
    name: "ApprovedDocSet",
    mixins: [MsgBoxMixins],
    components: {
        RegistApprovalSign,
        RegistApprovalAgncy,
        ApprovalLineAdd,
    },
    computed: {
        ...mapGetters({
            userId: 'auth/getUserId'
        })
    },
    mounted: function () {
        this.fn_fetchSign()
        // this.fn_initialize()
        this.fn_fetchAdvancedInfo()
    },
    beforeDestroy: function () {

    },
    methods: {

        fn_initialize: function () {

            // set-line

            this.line.options  = APPRV_LINE_LOADED_LINE.options


            this.line.options.Cols.push(
                // { Name: 'manage', Header: [{ Value: '관리' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_modify'>수정</button> <button type='button' class='btn_del'>삭제</button>"}, RelWidth: 20 },
                { Name: 'manage', Header: [{ Value: '관리' }], CanEdit: 0, Format: {"0": "<button type='button' class='btn_del'>삭제</button>"}, RelWidth: 20 },
            )

            this.line.options.Events = {
                onRenderFirstFinish: (event) => {
                    this.fn_fetchUserApprovalLine({},(response) => {
                        this.line.data = response.data.datas.dlAprvLine

                        this.line.data.forEach(item => {
                            item.aprvLineSample     = Array(5).fill()
                                                        .map((inner, idx) => idx+1)
                                                        .map(inner => {
                                                            const userId = item[`aprvUser${inner}`]
                                                            const userNm = item[`aprvUserNm${inner}`]
                                                            const dtyCd  = item[`aprvDtyCd${inner}`]
                                                            // return userNm === '' ? '' : `[${this.dtyCdList.find(item => item.codeVal === dtyCd).codeNameKr}] ${userNm}`
                                                            return userId === null ? null : `[${this.advancedInfo.dtyCd.find(item => item.codeVal === dtyCd)?.codeNameKr}] ${userNm}`
                                                        })
                                                        .filter(item => item !== null)
                                                        .join('→')

                            item.manage = '0'
                        })
                        
                        event.sheet.loadSearchData({
                            data: this.line.data
                        })

                        this.line.sheet = event.sheet
                    })
                },
                onAfterClick: (event) => {
                    switch(event.col) {
                        case 'manage': {
                            this.confirm('삭제하시겠습니까?', () => {
                                this.fn_deleteApprovalLine(event)
                            })
                            break
                        }

                        default:
                            break
                    }
                },
            }

            loader.createSheet({
                el: 'ApprovedDocSet_line',
                data: this.line.data,
                options: this.line.options
            })


            // set-agncy
            this.agncy.options = APPRV_LINE_AGNCY.options

            this.agncy.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchAgncyAprvInfo()
                },
                onAfterClick: (event) => {
                    switch(event.col) {
                        case 'manage': {
                            this.confirm('삭제하시겠습니까?', () => {
                                this.fn_deleteAgncy({
                                        userId:      this.userId,
                                        aprvStartDt: event.row.aprvStartDt,
                                        agncyUserId: event.row.agncyUserId,
                                    } , () => {
                                        // event.sheet.loadSearchData({
                                        //     data: []
                                        // })
                                        this.fn_fetchAgncyAprvInfo()
                                    })
                            })

                            break
                        }
                        default:
                            break
                    }
                }
            }


            loader.createSheet({
                el: 'ApprovedDocSet_agncy',
                data: this.agncy.data,
                options: this.agncy.options
            }).then(sheet => {
                this.agncy.sheet = sheet
            })
            

        },

        fn_fetchAdvancedInfo: function () {
            const urls = {
                masterCode: '/sendApi/api/common/masterCode/list',
            }
            const payload = {
                siteMstrId: this.$cookies.get('siteMstrId'),
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.all([
                    axios.post(urls.masterCode, {...payload, groupCode: 'DTY_CD'}, options),
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.dtyCd     = response[0].data.data
                }))
                .then(() => {
                    this.fn_initialize()
                })

        },

        fn_fetchUserApprovalLine: function (_payload, callback) {
            const url = '/sendApi/api/approv/userApprovLine/list'
            const payload = {
                userId: this.$store.getters['auth/getUserId'],
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
                    // console.log(response)

                    if (callback) return callback(response)
                })
                .catch(error => {
                    console.error(error)
                })
            
        },
        fn_deleteApprovalLine: function (event) {
            const url = '/sendApi/api/approv/userApprovLine/unuse'
            const payload = {
                aprvLineId: event.row.aprvLineId
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
                    if (response.status === 200) {
                        this.fn_fetchUserApprovalLine({}, (response) => {
                            this.line.data = response.data.datas.dlAprvLine

                            this.line.data.forEach(item => {
                                item.aprvLineSample     = Array(5).fill()
                                                            .map((inner, idx) => idx+1)
                                                            .map(inner => {
                                                                const userId = item[`aprvUser${inner}`]
                                                                const userNm = item[`aprvUserNm${inner}`]
                                                                const dtyCd  = item[`aprvDtyCd${inner}`]
                                                                // return userNm === '' ? '' : `[${this.dtyCdList.find(item => item.codeVal === dtyCd).codeNameKr}] ${userNm}`
                                                                return userId === null 
                                                                        ? null 
                                                                        : `[${this.advancedInfo.dtyCd.find(item => item.codeVal === dtyCd)?.codeNameKr}] ${userNm}`
                                                            })
                                                            .filter(item => item !== null)
                                                            .join('→')

                                item.manage = '0'
                            })
                            
                            event.sheet.loadSearchData({
                                data: this.line.data
                            })
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },

        fn_fetchAgncyAprvInfo: function (_payload, callback) {
            const url = '/sendApi/api/approv/agncyAprvInfo/list'
            const payload = {
                userId: this.userId,
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
                    // console.log(response)

                    if (callback) {
                        return callback(response)
                    } else {
                        this.agncy.data = response.data.datas.dlAgncyAprv

                        this.agncy.data.forEach(item => {
                            item.manage = '0'
                        })
                        this.agncy.sheet.loadSearchData({
                            data: this.agncy.data
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_deleteAgncy: function (_payload, callback) {
            const url = '/sendApi/api/approv/agncyAprvUserInfo/unuse'
            // const url = '/sendApi/api/approv/agncyAprvInfo/delete'
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
                    // console.log(response)

                    if(callback) return callback(response)
                })
                .catch(error => {
                    console.error(error)
                })
        },

        fn_fetchSign: function () {
            const url = '/sendApi/api/approv/userSgnArcv/view'
            const payload = {
                fileConnectId: this.userId
            }
            const options = {
                headers : {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }
            // 서명시 fileConnectedId = userID
            axios.post(url, payload, options)
                .then(response => {
                    // console.log(response)
                    // /sendApi/api/fileCall/fileSgnImgFile/' + aprv.fileSgnArcvId
                    this.sign.fileSgnArcvId = response.data.datas.dmSgnArcv.fileSgnArcvId
                    
                    this.sign.image = this.sign.fileSgnArcvId ? '/sendApi/api/fileCall/fileSgnImgFile/' + this.sign.fileSgnArcvId : ''
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_removeSign: function () {
            const url = '/sendApi/api/approv/userSgnArcv/delete'
            const payload = {
                fileSgnArcvId: this.sign.fileSgnArcvId,
                fileConnectId: this.userId,
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
                    // console.log(response)
                    if(response.status === 200 && response.data.rCode === '0000') {
                        this.sign.image = null
                        this.sign.fileSgnArcvId = ''
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    data: function () {
        return {
            default: {
                // image: require('@asset/img/layout/file_box_disabled.png')
            },

            advancedInfo: {
                dtyCd: []
            },

            sign: {
                image: null,
                fileSgnArcvId: '',
            },


            line: {
                id: '',

                sheet: null,
                data: [],
                options: {},
            },
            agncy: {
                sheet: null,
                data: [],
                options: {},
            },
        }
    }
}

</script>
