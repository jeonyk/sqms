<template>
    <section name="approvedDocSheet" class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="inner pb0">
            <div class="lookup_box search_form">
                <table>
                    <caption calss="sr_only"></caption>
                    <colgroup>
                        <col width="5%">
                        <col width="250">
                        <col width="5%">
                        <col width="250">
                        <col width="5%">
                        <col width="250">
                        <col width="5%">
                        <col width="250">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th colspan="9">
                                <h2 class="sub_title fl mb10">검색 필터</h2>
                                <div class="fr mb10">
                                    <button type="button" class="btn_set" @click="$router.push({name: 'ApprovedDocSet'})">결재설정</button>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th>프로젝트명</th>
                            <td>
                                <input 
                                    class="form_control" 
                                    type="text"  
                                    v-model="searchInfo.siteNm"
                                    @keyup.enter="fn_clickSearch(searchInfo)"
                                    placeholder="프로젝트 검색"
                                >
                            </td>
                            
                            <th>기안자</th>
                            <td>
                                <input 
                                    class="form_control" 
                                    type="text"  
                                    v-model="searchInfo.drafterNm"
                                    @keyup.enter="fn_clickSearch(searchInfo)"
                                    placeholder="기안자 검색"
                                >
                            </td>

                            <th>문서번호</th>
                            <td>
                                <input
                                    class="form_control"
                                    type="text"
                                    v-model="searchInfo.docSeq"
                                    @keyup.enter="fn_clickSearch(searchInfo)"
                                    placeholder="문서번호 검색"
                                >
                            </td>

                            <th>결재옵션</th>
                            <td>
                                <!-- <input
                                    class="form_control"
                                    type="text"
                                    v-model="searchInfo.docTypeNm"
                                    @keyup.enter="fn_clickSearch"
                                    placeholder="문서번호 검색"
                                > -->
                                <select
                                    v-model="searchInfo.aprvOptnType"
                                    class="form_control"
                                >
                                    <option value="">전체</option>
                                    <!-- <option value="APVL">진행 중</option>
                                    <option value="APRV">완료</option>
                                    <option value="RETN">반려</option> -->
                                    <option
                                        v-for="optnType in advancedInfo.aprvOptnType"
                                        :value="optnType.codeVal"
                                        :key="optnType.codeVal"
                                    >
                                        {{optnType.codeNameKr}}
                                    </option>
                                </select>
                            </td>

                            <td class="ar">
                                <button
                                    type="button"
                                    class="btn_reset"
                                    @click="fn_clickReset"
                                >
                                    초기화
                                </button>
                                <button 
                                    type='button' 
                                    class="btn btn_sm btn_darkblue btn_radius"
                                    @click="fn_clickSearch(searchInfo)"
                                >
                                    검색
                                </button>

                            </td>
                        </tr>

                        <tr>
                            <th>제목</th>
                            <td>
                                <input 
                                    class="form_control" 
                                    type="text"  
                                    v-model="searchInfo.title"
                                    @keyup.enter="fn_clickSearch(searchInfo)"
                                    placeholder="제목 검색"
                                >
                            </td>

                            
                            <th>문서종류</th>
                            <td>
                                <input
                                    class="form_control"
                                    type="text"
                                    v-model="searchInfo.docName"
                                    @keyup.enter="fn_clickSearch(searchInfo)"
                                    placeholder="문서종류 검색"
                                >
                            </td>

                            <th>기간</th>
                            <!-- datepickerRange -->
                            <td>
                                <date-picker-range
                                    v-model="searchInfo.date"
                                    :input-style="{'max-width': '230px'}"
                                    format="YYYYMMDD"
                                    limitable
                                />
                            </td>

                            <!-- <th>상태</th>
                            <td>
                                <select
                                    v-model="searchInfo.status"
                                    class="form_control"
                                >
                                    <option value="">전체</option>
                                    <option value="APVL">진행 중</option>
                                    <option value="APRV">완료</option>
                                    <option value="RETN">반려</option>
                                </select>
                            </td> -->

                        </tr>

                        <tr>
                            <th class="vat">문서종류</th>
                            <td colspan="7">
                                <div class="active_item">
                                    <input 
                                        class="all_select" 
                                        :class="{active: isActive}" 
                                        type="button" 
                                        value="전체선택"
                                        @input="isActive" 
                                        @click="allSelectEvt()"
                                    >
                                    <ul>
                                        <li v-for="(item, index) in advancedInfo.docType" :key="index">
                                            <a 
                                                href="javascript:void(0);"
                                                :class="item.class"
                                                @click="selectEvt(item)"
                                            >
                                                {{ item.codeNameKr }}
                                                <!-- {{ item.value }} -->
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Tab -->
        <div class="lst_tabs">
            <ul>
                <li 
                    :class="{active:tabs.current===index}" 
                    v-for="(tab, index) in tabs.order" 
                    :key="index"
                >
                    <a 
                        href="javascript:void(0);" 
                        @click="tabs.current=index; if(lazyMode) fn_loadSpecific(tabs.current)"
                    >
                        {{doc[tab].text}}<span>({{ doc[tab].data ? doc[tab].data.length : 0 }})</span>
                    </a>
                </li>
            </ul>
           
        </div>
        <!-- Tab Data -->
        <!-- <div class="tab_area" v-show="tabs.current === 0"> -->
        <div class="tab_area">
            <div class="inner">
                <div class="button_box">
                    <button 
                        v-if="isMultiApproval"
                        v-show="tabs.current === 1" 
                        type="button" 
                        class="btn btn_sm btn_darkblue"
                        @click="fn_clickBulkApproval"
                    >
                        일괄 승인
                    </button>

                    <div v-show="tabs.current === 0" class="fr">
                        <!-- <button class="btn_reset no_text"></button> -->
                        <span class="txt_sm">{{'최종승인 :'}}</span>
                        <label class="input_check" for="rescanInfo_statusApvl">
                            <input type="checkbox" id="rescanInfo_statusApvl" name="rescanInfo_statusApvl" v-model="rescanInfo.statusApvl">
                            <span class="label_text">{{'승인대기'}}</span>
                        </label>
                        <label class="input_check" for="rescanInfo_statusAprv">
                            <input type="checkbox" id="rescanInfo_statusAprv" name="rescanInfo_statusAprv" v-model="rescanInfo.statusAprv">
                            <span class="label_text">{{'승인완료'}}</span>
                        </label>
                        <span class="txt_sm ml20">{{'결재상태 :'}}</span>
                        <select v-model="rescanInfo.aprvState" class="form_control mywork_num">
                            <option value="">{{'전체'}}</option>
                            <option
                                v-for="state in advancedInfo.aprvState"
                                :key="state.codeVal"
                                :value="state.codeVal"
                            >
                                {{ state.codeNameKr }}
                            </option>
                        </select>
                        <button 
                            type="button" 
                            class="btn btn_sm btn_darkblue"
                            @click="fn_filterClientSide"
                        >
                            {{'적용'}}
                        </button>
                    </div>
                </div>

                <div 
                    class="ib_wrap"
                    v-for="(tab, index) in tabs.order"
                    :key="index"
                    v-show="tabs.current === index"
                    :style="{height: `calc(100vh - ${index === 0 ? 540 : 520}px)`}"
                >
                    <div :id="`approvalDocSheet_${tab}`" class="ibsheet_table" style="height: 100%;" />
                </div>


            </div>
        </div>
        


    </section>
</template>

<script>
import axios from 'axios'
import loader from '@ibsheet/loader'
import _ from 'lodash'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
import DatePickerRange from '@component/common/DatePickerRange.vue'
import { MY_APPRV, MY_DRFT, CPMPT_APPRV, RTRN_APPRV, HELP_APPRV, SHARE_APPRV } from '@plugin/ibsheet/myWork/approvedDoc.js'


export default {
    name: 'ApprovedDocSheet',
    mixins: [MsgBoxMixins],
    components: {
        DatePickerRange,
        Breadcrumb,
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
                        this.fn_getAprrovedDocList()
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    mounted: function () {
        // this.fn_clickReset()
        
        this.$nextTick(() => {
            if(this.$route.params.current){
                this.tabs.current = Number(this.$route.params.current)
            }
            this.fn_fetchAdvancedInfo()
        })
        
    },
    beforeDestroy: function () {
        this.tabs.order.forEach(item => {
            if (this.doc[item].sheet) this.doc[item].sheet.dispose()
        })
    },
    methods: {
        allSelectEvt: function() {
            var itemClass = '';

            this.isActive = !this.isActive;
            this.isActive ? itemClass = 'active' : ''; 
            // for(var i=0; i<this.docType.length; i++){
            //     this.docType[i].class = itemClass;
            // }

            this.advancedInfo.docType.forEach(item => {
                item.class = itemClass
            })
        },
        selectEvt: function(item) {
            if(item.class === ''){
                item.class = 'active';
                this.advancedInfo.docType.every( x => {
                    return (x.class != '') ? this.isActive = true : this.isActive = false;
                })
            }else{
                item.class = '';
                this.isActive = false;
            }
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
                    axios.post(urls.masterCode, {...payload, groupCode: 'APRV_STATE'}, options),
                    // axios.post(urls.masterCode, {...payload, groupCode: 'FINL_APRV_TYPE'}, options),
                    axios.post(urls.masterCode, {...payload, groupCode: 'DOC_TYPE'}, options),
                    axios.post(urls.masterCode, {...payload, groupCode: 'APRV_OPTN_TYPE'}, options),
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.aprvState     = response[0].data.data
                    // this.advancedInfo.finlAprvType  = response[1].data.data
                    this.advancedInfo.docType       = response[1].data.data.map(item => {
                                                                return {
                                                                    ...item,
                                                                    class: 'active',
                                                                }
                                                            })
                    this.advancedInfo.aprvOptnType  = response[2].data.data
                }))
                .then(() => {
                    this.fn_getAprrovedDocList()
                })
            
        },
        fn_clickReset: function () {
            // console.log('click reset')
            this.searchInfo = {
                siteNm: '',
                // docTypeNm: '',
                docTypes: [],
                drafterNm: '',
                drafter: '',
                docTitle: '',
                docSeq: '',
                status: '',
                aprvOptnType: '',
                date : [ null, null ]
            },

            this.isActive = true
            this.advancedInfo.docType.forEach(item => {
                item.class = 'active'
            })
        },
        fn_initializeSheet: function () {
            // set ibsheet_options
            this.doc.dlMyDrft.options       = MY_DRFT.options
            this.doc.dlMyApprv.options      = MY_APPRV.options
            this.doc.dlCpmptApprv.options   = CPMPT_APPRV.options
            this.doc.dlRtrnApprv.options    = RTRN_APPRV.options
            this.doc.dlHelpApprv.options    = HELP_APPRV.options
            this.doc.dlShareApprv.options   = SHARE_APPRV.options

            // 일괄결재 사용여부
            if (!this.isMultiApproval) this.doc.dlMyApprv.options.Cols = this.doc.dlMyApprv.options.Cols.filter(item => item.Name !== 'isChecked')

            this.tabs.order.forEach((item) => {
                // set pageLength
                // this.doc[item].options.Cfg.PageLength = this.doc[item].showRowLength
                // options.main.Enum = `${options.seperator}${options.mainData.map(item => item['main'.concat(options.value)]).join(options.seperator)}`
                // options.main.EnumKeys = `${options.seperator}${options.mainData.map(item => item['main'.concat(options.key)]).join(options.seperator)}`
                // aprvState
                if (this.doc[item].options.Cols.find(state => state.Name === 'aprvState')) {
                    this.doc[item].options.Cols.find(state => state.Name === 'aprvState').Enum     = `|${this.advancedInfo.aprvState.map(state => state.codeNameKr).join('|')}`
                    this.doc[item].options.Cols.find(state => state.Name === 'aprvState').EnumKeys = `|${this.advancedInfo.aprvState.map(state => state.codeVal).join('|')}`
                }
                // if (this.doc[item].options.Cols.find(state => state.Name === 'finlAprvType')) {
                //     this.doc[item].options.Cols.find(state => state.Name === 'finlAprvType').Enum     = `|${this.advancedInfo.finlAprvType.map(state => state.codeNameKr).join('|')}`
                //     this.doc[item].options.Cols.find(state => state.Name === 'finlAprvType').EnumKeys = `|${this.advancedInfo.finlAprvType.map(state => state.codeVal).join('|')}`
                // }
                // this.doc[item].options['aprvState'].EnumKeys = `|${this.advancedInfo.aprvState.map(state => state.codeVal).join('|')}`

                this.doc[item].options.Events = {
                    onDblClick: (event) => {
                        return this.fn_onDblClick(event, item)
                    },
                    onRenderFirstFinish: (event) => {
                        event.sheet.loadSearchData({
                            data: this.doc[item].data,
                        })
                    }
                }

                // temporary data set
                // this.doc[item].data = [{}]

                if (this.lazyMode) {
                    this.fn_loadSpecific(this.tabs.current)
                } else {
                    /** lastest */
                    loader.createSheet({
                        el: `approvalDocSheet_${item}`,
                        // data: this.doc[item].data,
                        data: [],
                        options: this.doc[item].options
                    }).then(sheet => {
                        this.doc[item].sheet = sheet
                    })

                }




            })
        },
        fn_loadSheet: function () {
            this.tabs.order.forEach((item) => {
                this.doc[item].sheet.loadSearchData({
                    data: this.doc[item].data,
                })
            })
        },

        fn_loadSpecific: function (idx) {
            const _idx = idx ? idx : this.tabs.current

            if (!this.doc[this.tabs.order[_idx]].latest) {
                if (this.doc[this.tabs.order[_idx]].sheet) {
                    this.doc[this.tabs.order[_idx]].sheet.loadSearchData({
                        data: this.doc[this.tabs.order[_idx]].data
                    })
                } else {
                    loader.createSheet({
                        el: `approvalDocSheet_${this.tabs.order[_idx]}`,
                        data: this.doc[this.tabs.order[_idx]].data,
                        options: this.doc[this.tabs.order[_idx]].options
                    }).then(sheet => {
                        this.doc[this.tabs.order[_idx]].sheet = sheet
                    })
                }
                this.doc[this.tabs.order[_idx]].latest = true
            }

        },
        fn_clickRefresh: function () {
            // temporary
            this.fn_clickSearch()
        },
        fn_clickApprovalOption: function () {
            // console.log('set approval options')
        },
        fn_clickBulkApproval: function () {
            // console.log('click bulk approval')

            // const checked = this.doc.dlMyDrft.sheet?.getRowsByChecked('isChecked')
            // console.log(checked)

            // const checked = this.doc[order].sheet.getRowsByChecked('isChecked')
            
        },
        fn_clickSearch: function () {
            /** setDocType */
            this.searchInfo.docTypes    = this.advancedInfo.docType
                                            .filter(item => item.class === 'active')
                                            .map(item => item.codeVal)
            if (this.searchInfo.docTypes.length === this.advancedInfo.docType.length) {
                this.searchInfo.docTypes = []
            }

            const payload = _.cloneDeep(this.searchInfo)
            delete payload.date
            if (payload.docTypes.length === 0) delete payload.docTypes
            if (this.searchInfo.date[0] !== null && this.searchInfo.date[1] !== null ) {
                payload.startDt = this.searchInfo.date[0]
                payload.endDt = this.searchInfo.date[1]
            }

            this.fn_getAprrovedDocList(payload, false)
        },
        fn_getAprrovedDocList: function (inputPayload, init = true) {
            const url = '/sendApi/api/approv/approvedDoc/list'
            const payload = {
                // siteMstrId: this.$cookies.get('siteMstrId'),
                userId: this.$store.getters['auth/getUserId'],
                ...inputPayload,
            }

            if (payload.date && !payload.date.some(date => date === null) ) {
                payload.startDt = payload.date[0]
                payload.endDt   = payload.date[1]
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
                    if (response.data?.datas) {
                        /** myApprv data set */
                        this.doc.dlMyApprv.data = response.data.datas.dlMyApprv
                        this.doc.dlMyApprv.data.forEach(item => {
                            item.aprvStatus = `${item.aprvProgrsOrder-1}/${item.finlManagerOrder}`

                            // aprvOrder
                        })
                        /** progrsApprv data set */
                        this.doc.dlMyDrft.data = response.data.datas.dlMyDrft
                        // this.doc.dlMyDrft.data.forEach(item => {
                        //     item.aprvStatus = `${item.aprvProgrsOrder}/${item.finlManagerOrder}`
                        //     item.upDttm = this.$moment(item.upDttm).format('YYYY-MM-DD')
                        // })
                        /** cpmptApprv data set */
                        this.doc.dlCpmptApprv.data = response.data.datas.dlCpmptApprv
                        // this.doc.dlCpmptApprv.data.forEach(item => {
                        //     item.aprvStatus = `${item.aprvProgrsOrder}/${item.finlManagerOrder}`
                        //     item.upDttm = this.$moment(item.upDttm).format('YYYY-MM-DD')
                        // })
                        /** rtrnApprv data set */
                        this.doc.dlRtrnApprv.data = response.data.datas.dlRtrnApprv
                        // this.doc.dlRtrnApprv.data.forEach(item => {
                        //     item.aprvStatus = `${item.aprvProgrsOrder}/${item.finlManagerOrder}`
                        // })

                        /** helpApprv data set */
                        this.doc.dlHelpApprv.data = response.data.datas.dlHelpApprv
                        // this.doc.dlHelpApprv.data.forEach(item => {
                        //     item.aprvStatus = `${item.aprvProgrsOrder}/${item.finlManagerOrder}`
                        //     item.upDttm = this.$moment(item.upDttm).format('YYYY-MM-DD')
                        // })

                        this.doc.dlShareApprv.data = response.data.datas.dlShareApprv
                        // this.doc.dlShareApprv.data.forEach(item => {
                        //     item.aprvStatus = `${item.aprvProgrsOrder}/${item.finlManagerOrder}`
                        //     item.inDttm = this.$moment(item.inDttm).format('YYYY-MM-DD')
                        // })

                        // filter 초기화
                        this.rescanInfo = {
                            aprvState: '',
                            statusApvl: false,
                            statusAprv: false,
                        }

                        // sheet-updated
                        if (init) {
                            this.fn_initializeSheet()
                        } else {
                            if (this.lazyMode) {
                                this.tabs.order.forEach(item => this.doc[item].latest = false)
                                this.fn_loadSpecific(this.tabs.current)
                            } else {
                                this.fn_loadSheet()
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error(error)
                })
            
        },
        fn_onDblClick: function (event, order) {
            // console.log(event)
            // console.log(order)
            switch(order) {
                case 'dlMyDrft':
                    break
                case 'dlMyApprv':
                    // set defaultInfo
                    break
                case 'dlHelpApprv':
                    break
                case 'dlCpmptApprv':
                    break
                case 'dlRtrnApprv':
                    break
                case 'dlShareApprv':
                    break
            }

            // console.log(event.sheet.getDataRows())
            // console.log(event.row.aprvInfoId)
            // console.log(event.row.aprvFileConnectId)
            this.$store.dispatch('myWork/setAprvDoc', {
                aprvInfoId: event.row.aprvInfoId,
                docType: order,
                fileType: event.row.fileType,
                aprvFileConnectId: event.row.aprvFileConnectId,
                aprvUserId: event.row.aprvUserId,
            })
            this.$router.push({
                name: 'ApprovedDocView'
            })
        },
        fn_filterClientSide: function () {
            // simple is best..

            this.doc.dlMyDrft.sheet.loadSearchData({
                data:   this.doc.dlMyDrft.data
                            .filter(item => this.rescanInfo.aprvState !== '' ? item.aprvState === this.rescanInfo.aprvState : true)
                            .filter(item => {

                                // maybe...
                                // console.log(item.aprvOptnType)

                                if (this.rescanInfo.statusApvl && this.rescanInfo.statusAprv) {
                                    return (['HAFON', 'OFFLN'].includes(item.aprvOptnType) 
                                            && item.aprvProgrsOrder === item.finlManagerOrder
                                            && item.aprvProgrsState !== 'R'
                                            && item.finlAprvYn !== 'Y')
                                        || item.finlAprvYn === 'Y'
                                } else if (this.rescanInfo.statusApvl && !this.rescanInfo.statusAprv) {
                                    return ['HAFON', 'OFFLN'].includes(item.aprvOptnType) 
                                        && item.aprvProgrsOrder === item.finlManagerOrder
                                        && item.aprvProgrsState !== 'R'
                                        && item.finlAprvYn !== 'Y'
                                    // return item.finlAprvYn !== 'Y'
                                } else if (!this.rescanInfo.statusApvl && this.rescanInfo.statusAprv) {
                                    return item.finlAprvYn === 'Y'
                                } else {
                                    return true
                                }
                            })
            })

            // this.doc.dlMyDrft.sheet.loadSearchData({
            //     data: this.doc.dlMyDrft.data.filter(item => item.)
            // })


        },
        // fn_setSheetCategory: function (key, categoryData, seperator = '|') {
        //     // const dataKey = ''
        //     // this.tabs.order.forEach(item => {
        //     //     if (item[key]) {
        //     //         this.doc[item].options[key].Enum = `${seperator}${categoryData.map(item => item[dataKey]).join(seperator)}`
        //     //         this.doc[item].options[key].Enum = `${seperator}${categoryData.map(item => item[`${dataKey}Nm`]).join(seperator)}`
        //     //     }
        //     // })

        //     this.tabs.order.forEach(item => {
        //         if(this.doc[item]) {
        //             this.doc[item].options[key]
        //         }
        //     })
        // },
    },
    data: function () {
        return { 
            isActive: true,
            isMultiApproval: false,

            lazyMode: false,

            advancedInfo: {
                aprvState: [],
                // finlAprvType: [],
                docType: [],
                aprvOptnType: [],
            },
            
            /** search options */
            searchInfo: {
                siteNm: '',
                // docTypeNm: '',
                docTypes: [],
                docName: '',
                drafterNm: '',
                drafter: '',
                title: '',
                docSeq: '',
                status: '',
                date : [ null, null ],

                // docTypeNm: '',
                aprvOptnType: '',
                
            },
            rescanInfo: {
                aprvState: '',
                statusAprv: false,
                statusApvl: false,
            },

            doc: {
                /** 내 결재함 */
                dlMyApprv: {
                    text: '결재',
                    data: [],
                    sheet: null,
                    options: null,
                    // re-scan flag
                    latest: false,
                },
                /** 기안함 */
                dlMyDrft: {
                    text: '기안',
                    data: [],
                    sheet: null,
                    options: null,
                    // re-scan flag
                    latest: false,
                },
    
                /** 완료함 */
                dlCpmptApprv: {
                    text: '완료',
                    data: [],
                    sheet: null,
                    options: null,
                    // re-scan flag
                    latest: false,
                },
    
                /** 반려함 */
                dlRtrnApprv: {
                    text: '반려',
                    data: [],
                    sheet: null,
                    options: null,
                    // re-scan flag
                    latest: false,
                },
    
                /** 참조함 */
                dlHelpApprv: {
                    text: '참조',
                    data: [],
                    sheet: null,
                    options: null,
                    // re-scan flag
                    latest: false,
                },
    
                /** 공람함 */
                dlShareApprv: {
                    text: '공람',
                    data: [],
                    sheet: null,
                    options: null,
                    // re-scan flag
                    latest: false,
                },
            },

            
            tabs: {
                /** tab ordering */
                order: [
                    'dlMyDrft',
                    'dlMyApprv',
                    'dlHelpApprv',
                    'dlCpmptApprv',
                    'dlRtrnApprv',
                    'dlShareApprv',
                ],
                current: 0
            },

        }
    }
}
</script>
