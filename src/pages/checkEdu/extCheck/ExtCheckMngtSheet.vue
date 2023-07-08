<template>
    <section id="ExtCheckMngtSheet" class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul>
                <li
                    v-for="(item, index) in tab.list.filter((tabType) => (userType === 'PTNR' ? tabType.type === 'MY' : true ))"
                    :key="item.type"
                    :class="{active: tab.current === index}" >
                    <a
                        @click="tab.current = index" >
                        {{ item.text }}
                    </a>
                </li>
            </ul>
        </div>


        <div
            v-for="(currentTab, tabIndex) in tab.list" 
            :key="currentTab.type"
            v-show="tabIndex === tab.current"
            class="tab_area"
        >
            
            <div class="lookup_box multi_line">
                <div class="lst_tabs_round">
                    <ul>
                        <li 
                            v-for="(currentDtlTab, index) in dtlTab.list"
                            :key="currentDtlTab.type"
                            :class="{active: dtlTab[`current${currentTab.type}`] === index}" >
                            <a href="javascript:void(0);" @click="dtlTab[`current${currentTab.type}`] = index"> {{currentDtlTab.text}} </a>
                        </li>
                    </ul>

                    <div class="fr">
                        <button type="button" class="btn btn_sm btn_darkgray" @click="fn_downloadGuide"> {{ '대외점검 Guide 보기' }} </button>
                    </div>
                </div>

                <!-- <table v-show="dtlTab.current === 0"> -->
                <table v-show="currentTab.type === 'MY' ? dtlTab.currentMY === 0 : dtlTab.currentALL === 0 ">
                    <colgroup>
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="17%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr v-if="currentTab.type !== 'MY'">
                            <th> {{ '프로젝트명' }} </th>
                            <td colspan="7">
                                <div class="form_area">
                                    <select class="form_control">
                                        <option value="" > {{ '전체' }} </option>
                                        <option 
                                            v-for="projectType in advancedInfo.mngtType"
                                            :key="projectType.codeVal"
                                            :value="projectType.codeVal"
                                        >
                                            {{ projectType.codeNameKr }}
                                        </option>
                                    </select>
                                    <input type="text" class="form_control" placeholder="입력해주세요" />
                                </div>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="fn_clear(currentTab.type, 'extrnl')"> {{'초기화'}} </button>
                                <button 
                                    type="button" 
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                                    @click="fn_fetchExtrnl(search[currentTab.type].extrnl, currentTab.type)"
                                > 
                                    {{ '검색' }} 
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <th> {{ '점검 종류' }} </th>
                            <td> 
                                <!-- <input 
                                    v-model="search[currentTab.type].extrnl.chckKnd" 
                                    class="form_control size_sm_lg"
                                    @keyup.enter="fn_fetchExtrnl(search[currentTab.type].extrnl, currentTab.type)"
                                    />  -->
                                <select v-model="search[currentTab.type].extrnl.searchChckKnd" class="form_control size_sm_lg" >
                                    <option value=""> {{ '전체' }} </option>
                                    <option
                                        v-for="item in advancedInfo.chckKnd"
                                        :key="item.codeVal"
                                        :value="item.codeVal"
                                        :title="item.codeNameKr"
                                        >
                                        {{ item.codeNameKr }}
                                    </option>
                                </select>
                            </td>

                            <th> {{ '점검 기관' }} </th>
                            <td> 
                                <!-- select Type -->
                                <!-- <select 
                                    v-model="search[currentTab.type].extrnl.searchExtrnlInsttId" 
                                    class="form_control size_sm_lg"
                                    @change="search[currentTab.type].extrnl.searchInsctrId = ''"
                                > 
                                    <option value="">{{ '전체' }}</option>
                                    <option
                                        v-for="item in advancedInfo.dlExtrnInstt"
                                        :key="item.extrnlInsttId"
                                        :value="item.extrnlInsttId" 
                                        >
                                        {{ item.extrnlInsttNm }}
                                    </option>
                                </select> -->
                                <!-- input Type -->
                                <input
                                    v-model="search[currentTab.type].extrnl.searchExtrnlInsttNm"
                                    class="form_control size_md"
                                    @keyup.enter="fn_fetchExtrnl(search[currentTab.type].extrnl, currentTab.type)"
                                    placeholder="입력해주세요"
                                />
                            
                            </td>
                            <th> {{ '점검자' }} </th>
                            <td> 
                                <!-- select Type -->
                                <!-- <select v-model="search[currentTab.type].extrnl.searchInsctrId" class="form_control size_sm_lg"> 
                                    <option value="">{{ '전체' }}</option>
                                    <option 
                                        v-for="item in advancedInfo.dlInsttInsctr.filter(user => user.extrnlInsttId === search[currentTab.type].extrnl.searchExtrnlInsttId )"
                                        :key="item.insctrId"
                                        :value="item.insctrId" 
                                        >
                                        {{ item.insctrNm }}
                                    </option>
                                </select> -->
                                <!-- input Type -->
                                <input
                                    v-model="search[currentTab.type].extrnl.searchInsctrNm"
                                    class="form_control size_md"
                                    @keyup.enter="fn_fetchExtrnl(search[currentTab.type].extrnl, currentTab.type)"
                                    placeholder="입력해주세요"
                                />
                            
                            </td>
                            
                            <!-- <template v-if="currentTab.type !== 'MY'">
                                <th > {{ '점검 일자' }} </th>
                                <td>
                                    <datepicker-range
                                        v-model="search[currentTab.type].extrnl.date" 
                                        />
                                </td>
                            </template> -->
                            <!-- <template v-else> -->
                            <template>
                                <td/>
                                <td/>
                            </template>

                            <td class="ar" v-if="currentTab.type === 'MY'">
                                <button type="button" class="btn_reset" @click="fn_clear(currentTab.type, 'extrnl')">{{'초기화'}}</button>
                                <button 
                                    type="button" 
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                                    @click="fn_fetchExtrnl(search[currentTab.type].extrnl, currentTab.type)"
                                    > 
                                    {{ '검색' }} 
                                </button>
                            </td>
                        </tr>
                        <!-- <tr v-if="currentTab.type === 'MY'"> -->
                        <tr>
                            <th> {{ '점검 상태' }} </th>
                            <td> 
                                <select v-model="search[currentTab.type].extrnl.searchFinlCmpltYn" class="form_control size_sm_lg" >
                                    <option value=""> {{ '전체' }} </option>
                                    <option value="N"> {{ '등록' }} </option>
                                    <option value="Y"> {{ '완료' }} </option>                                    
                                </select>
                            </td>

                            <th> {{ '점검 일자' }} </th>
                            <td>
                                <datepicker-range
                                    v-model="search[currentTab.type].extrnl.date" 
                                    />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table v-show="currentTab.type === 'MY' ? dtlTab.currentMY === 1 : dtlTab.currentALL === 1 ">
                    <colgroup>
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="17%">
                        <col width="5%">
                        <col width="17%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr v-if="currentTab.type !== 'MY'">
                            <th> {{ '프로젝트명' }} </th>
                            <td colspan="7">
                                <div class="form_area">
                                    <select v-model="search[currentTab.type].pout.searchMngtType" class="form_control">
                                        <option value="" > {{ '전체' }} </option>
                                        <option 
                                            v-for="projectType in advancedInfo.mngtType"
                                            :key="projectType.codeVal"
                                            :value="projectType.codeVal"
                                            >
                                                {{ projectType.codeNameKr }}
                                        </option>
                                    </select>
                                    <input v-model="search[currentTab.type].pout.searchProjectNm" type="text" class="form_control" placeholder="입력해주세요" />
                                </div>
                            </td>
                            <td class="ar">
                                <button type="button" class="btn_reset" @click="fn_clear(currentTab.type, 'pout')"> {{ '초기화' }} </button>
                                <!-- <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search"> {{'검색'}} </button> -->
                                <button 
                                    type="button" 
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                                    @click="fn_fetchPout(search[currentTab.type].pout, currentTab.type)"
                                    > 
                                    {{ '검색' }} 
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th> {{'점검 일자'}} </th>
                            <td>
                                <datepicker-range
                                    v-model="search[currentTab.type].pout.date"
                                    />
                            </td>
                            <th> {{'점검 종류'}} </th>
                            <td> 
                                <!-- <input type="text" class="form_control size_md" />  -->
                                <select v-model="search[currentTab.type].pout.searchChckKnd" class="form_control size_md" >
                                    <option value=""> {{ '전체' }} </option>
                                    <option
                                        v-for="item in advancedInfo.chckKnd"
                                        :key="item.codeVal"
                                        :value="item.codeVal"
                                        :title="item.codeNameKr"
                                        >
                                        {{ item.codeNameKr }}
                                    </option>
                                </select>
                            </td>
                            <th> {{'점검 기관'}} </th>
                            <td> 
                                <!-- select Type -->
                                <!-- <select 
                                    v-model="search[currentTab.type].pout.searchExtrnlInsttId" 
                                    class="form_control size_md"
                                    @change="search[currentTab.type].pout.searchInsctrId = ''"
                                > 
                                    <option value="">{{ '전체' }}</option>
                                    <option
                                        v-for="item in advancedInfo.dlExtrnInstt"
                                        :key="item.extrnlInsttId"
                                        :value="item.extrnlInsttId" 
                                        >
                                        {{ item.extrnlInsttNm }}
                                    </option>
                                </select> -->
                                <!-- input Type -->
                                <input
                                    v-model="search[currentTab.type].pout.searchExtrnlInsttNm"
                                    class="form_control size_md"
                                    @keyup.enter="fn_fetchPout(search[currentTab.type].pout, currentTab.type)"
                                    placeholder="입력해주세요"
                                />

                            </td>
                            <th> {{'점검자'}} </th>
                            <td> 
                                <!-- select Type -->
                                <!-- <select v-model="search[currentTab.type].pout.searchInsctrId" class="form_control size_md"> 
                                    <option value="">{{ '전체' }}</option>
                                    <option 
                                        v-for="item in advancedInfo.dlInsttInsctr.filter(user => user.extrnlInsttId === search[currentTab.type].pout.searchExtrnlInsttId )"
                                        :key="item.insctrId"
                                        :value="item.insctrId" 
                                        >
                                        {{ item.insctrNm }}
                                    </option>
                                </select> -->
                                <!-- input Type -->
                                <input
                                    v-model="search[currentTab.type].pout.searchInsctrNm"
                                    class="form_control size_md"
                                    @keyup.enter="fn_fetchPout(search[currentTab.type].pout, currentTab.type)"
                                    placeholder="입력해주세요"
                                />
                            </td>

                            <td v-if="currentTab.type === 'MY'" class="ar">
                                <button type="button" class="btn_reset" @click="fn_clear(currentTab.type, 'pout')"> {{ '초기화' }} </button>
                                <button 
                                    type="button" 
                                    class="btn btn_sm btn_darkblue btn_radius btn_search"
                                    @click="fn_fetchPout(search[currentTab.type].pout, currentTab.type)"
                                    > 
                                    {{ '검색' }} 
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <th> {{'제목'}} </th>
                            <td> 
                                <input
                                    v-model="search[currentTab.type].pout.searchTitle"
                                    class="form_control size_md"
                                    @keyup.enter="fn_fetchPout(search[currentTab.type].pout, currentTab.type)"
                                    placeholder="입력해주세요"
                                />
                            </td>
                            <th> {{'지적 사항'}} </th>
                            <td> 
                                <!-- <input type="text" class="form_control size_md" />  -->
                                <select v-model="search[currentTab.type].pout.searchPoutMatterType" class="form_control size_md">
                                    <option value="">전체</option>
                                    <option
                                        v-for="item in advancedInfo.poutMatterType"
                                        :key="item.codeVal"
                                        :value="item.codeVal"
                                        :title="item.codeNameKr"
                                        >
                                        <!-- {{ item.codeNameKr + '('+ item.codeNameKr.length +')' }} -->
                                        {{ item.codeNameKr.length > 17 ? item.codeNameKr.substr(0, 17) + '...' : item.codeNameKr }}
                                    </option>
                                </select>
                            </td>
                            <th> {{'분야'}} </th>
                            <td> 
                                <!-- <input type="text" class="form_control size_md" />  -->
                                <select 
                                    v-model="search[currentTab.type].pout.searchCntrwkKnd" 
                                    class="form_control size_md"
                                    @change="search[currentTab.type].pout.searchCntrwkKndDtl = ''" 
                                >
                                    <option value="">전체</option>
                                    <option
                                        v-for="item in advancedInfo.mainCode"
                                        :key="item.mainCodeId"
                                        :value="item.mainCodeId"
                                    >
                                        {{ item.mainName }}
                                    </option>
                                </select>
                            </td>
                            <th> {{'대상 공종'}} </th>
                            <td> 
                                <!-- <input type="text" class="form_control size_md" />  -->
                                <select v-model="search[currentTab.type].pout.searchCntrwkKndDtl" class="form_control size_md">
                                    <option value="">전체</option>
                                    <option
                                        v-for="item in advancedInfo.midCode.filter(item => item.mainCodeId === search[currentTab.type].pout.searchCntrwkKnd)"
                                        :key="item.midCodeId"
                                        :value="item.midCodeId"
                                    >
                                        {{ item.midName }}
                                    </option>
                                        <!-- v-for="item in advancedInfo.midCode.filter(item => item.mainCodeId === poutDtl.cntrwkKnd)" -->
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <th> {{'확인서'}} </th>
                            <td>
                                <select v-model="search[currentTab.type].pout.searchCnfrmnWritngYn" class="form_control size_md">
                                    <option value="">전체</option>
                                    <option value="Y"> {{'YES'}} </option>
                                    <option value="N"> {{'NO'}} </option>
                                </select>
                            </td>
                            <th> {{'지적 유형'}} </th>
                            <td>
                                <select v-model="search[currentTab.type].pout.searchPoutType" class="form_control size_md">
                                    <option value="">전체</option>
                                    <!-- [Warn]: hardCoding -->
                                    <!-- <option value=""> {{'시정명령'}} </option>
                                    <option value=""> {{'현지시정'}} </option>
                                    <option value=""> {{'주의'}} </option> -->
                                    <option
                                        v-for="item in advancedInfo.poutType"
                                        :key="item.codeVal"
                                        :value="item.codeVal"
                                        :title="item.codeNameKr"
                                        >
                                        <!-- {{ item.codeNameKr + '('+ item.codeNameKr.length +')' }} -->
                                        {{ item.codeNameKr }}
                                    </option>
                                    
                                </select>
                            </td>
                            <th> {{'최종 벌점'}} </th>
                            <td>
                                <select v-model="search[currentTab.type].pout.searchDemDcsnYn" class="form_control size_md">
                                    <option value="">전체</option>
                                    <!-- <option
                                        v-for="item in advancedInfo.dem"
                                        :key="item.codeVal"
                                        :value="item.codeVal"
                                    >
                                        {{item.codeNameKr}}
                                    </option> -->
                                    <option value="Y"> {{'YES'}} </option>
                                    <option value="N"> {{'NO'}} </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                v-for="(currentDtlTab, index) in dtlTab.list"
                :key="currentDtlTab.type"
                v-show="currentTab.type === 'MY' ? dtlTab.currentMY === index : dtlTab.currentALL === index"
                class="tab_area_round"
            >
                <div class="inner">
                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel">엑셀 다운로드</button>
                        <div class="fr" v-show="tab.current === 0 && dtlTab[`current${currentTab.type}`] === 0">
                            <button 
                                v-if="userWritable "
                                type="button" 
                                class="btn btn_md btn_outline btn_darkgray"
                                @click="$store.dispatch('setExtCheckExtrnlChckId', null); $router.push({name: 'ExtCheckMngtView'});"
                            > 
                                {{ '등록' }} 
                            </button>
                            <button 
                                v-if="userUnusable"
                                type="button" 
                                class="btn btn_md btn_outline btn_darkgray"
                                @click="confirm('삭제하시겠습니까?', fn_remove)"
                            > 
                                <!-- @click="" -->
                                {{ '삭제' }} 
                            </button>
                        </div>
                        <!-- <div class="fr" v-show="tab.current === 0 &&  dtlTab[`current${currentTab.type}`] === 1">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray"> {{ '저장' }} </button>
                        </div> -->
                    </div>

                    <div class="ib_wrap" :style="{height: `calc(100vh - ${(currentTab.type === 'MY' ? 0 : 30) + (currentDtlTab.type === 'pout' ? 420 : 395 )}px)`}">
                        <div :id="`ExtCheckMngt_${currentTab.type}_${currentDtlTab.type}`" class="ibsheet_table" style="height:100%;"></div>
                    </div>
                </div>
            </div>
        </div>


        <file-download
            :refId="fileModal.refId"
            modal-title="파일 보기"
            :file-connect-id="fileModal.fileConnectId"
            :file-type="fileModal.fileType"
        />

        <excel-download
            v-model="excelDownload.request"
            :file-name="excelDownload.fileName"
            :download-option="excelDownload.downloadOption"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
            <!-- ref-id="" -->

    </section>
</template>

<script>

import DatepickerRange from '@component/common/DatePickerRange.vue'
import FileDownload from '@modal/common/FileDownloadModal.vue'
import ExcelDownload from '@component/common/ExcelDownload.vue'
import loader from '@ibsheet/loader'
import { EXT_CHECK_MNGT_MY_EXTRNL, EXT_CHECK_MNGT_ALL_EXTRNL, EXT_CHECK_MNGT_MY_POUT, EXT_CHECK_MNGT_ALL_POUT } from '@plugin/ibsheet/checkEdu/extCheck.js'

import axios from 'axios'
// import _ from 'lodash'

import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'


import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'ExtCheckMngtSheet',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        Breadcrumb,
        DatepickerRange,
        FileDownload,
        ExcelDownload,
    },
    computed: {
        ...mapGetters({
            projectId:  'auth/getProjectId',
            siteMstrId: 'auth/getSiteMstrId',
            userId:     'auth/getUserId',
            userType:   'auth/getUserType',
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
                        this.fn_fetchExtrnl('MY')
                        this.fn_fetchExtrnl('ALL')
                        this.fn_fetchPout('MY')
                        this.fn_fetchPout('ALL')
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
    mounted: function () {
        /** format: 없을 수도 있다. = create - append */

        this.$nextTick(()=>{
            this.fn_initialize()
        })

    },
    beforeDestroy: function () {
        this.tab.list.forEach(upper => {
            this.dtlTab.list.forEach(lower => {
                // if (this.data[upper.type][lower.type].sheet) this.data[upper.type][lower.type].sheet.dispose()
                if (this.data[upper.type][lower.type].sheet) loader.removeSheet(this.data[upper.type][lower.type].sheet)
                
            })
        })

    },
    methods: {
        
        fn_initialize: function () {
            this.fn_fetchAdvanceInfo()
            
            // this.fn_initSheet()
        },
        fn_initSheet: function () {
            this.data.MY.extrnl.options     = EXT_CHECK_MNGT_MY_EXTRNL.options
            this.data.ALL.extrnl.options    = EXT_CHECK_MNGT_ALL_EXTRNL.options
            this.data.MY.pout.options       = EXT_CHECK_MNGT_MY_POUT.options
            this.data.ALL.pout.options      = EXT_CHECK_MNGT_ALL_POUT.options

            /** My extrnl set */
            this.data.MY.extrnl.options.Cols[2].Enum = `|${this.advancedInfo.chckKnd.map(item => item.codeNameKr).join('|')}`
            this.data.MY.extrnl.options.Cols[2].EnumKeys = `|${this.advancedInfo.chckKnd.map(item => item.codeVal).join('|')}`
            this.data.MY.extrnl.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchExtrnl({ 
                        searchType: 'MY',  
                        searchMyProjectId: this.projectId 
                    })
                },
                onAfterClick: (event) => {
                    switch(event.col) {
                        case 'chckRslt': {
                            if (event.row[event.col] === 1) {
                                this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                                this.$store.dispatch('setExtCheckPoutDcsnDiv', event.row.poutDcsnDiv)
                                this.$router.push({ name : 'ExtCheckMngtView' })
                            }
                            break
                        }
                        case 'poutDcsnDiv': {
                            if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                                this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                                this.$router.push({ name : 'ExtCheckMngtDcsnView' })
                            }
                            break
                        }
                        case 'resultDlbrtCmitYn': {
                            if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                                this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                                this.$router.push({ name : 'ExtrnlChckDlbrtCmit' })
                            }
                            break
                        }
                        case 'demLastDcsnBtnYn': {
                            // ExtrnlChckDcsnLastDem
                            if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                                this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                                this.$router.push({ name : 'ExtrnlChckDcsnLastDem' })
                            }
                            break
                        }
                        case 'poutFileYn': {
                            if (event.row[event.col] === 0) {
                                // poutFileConnectId
                                this.fileModal.fileConnectId = event.row.poutFileConnectId
                                this.$bvModal.show(this.fileModal.refId)
                            }
                            break
                        }
                        case 'dcsnFileYn': {
                            if (event.row[event.col] === 0) {
                                // poutFileConnectId
                                this.fileModal.fileConnectId = event.row.dcsnFileConnectId
                                this.$bvModal.show(this.fileModal.refId)
                            }
                            break
                        }
                        default: 
                            break

                    }
                }
            }

            /** All extrnl set */
            this.data.ALL.extrnl.options.Cols[2].Enum = `|${this.advancedInfo.chckKnd.map(item => item.codeNameKr).join('|')}`
            this.data.ALL.extrnl.options.Cols[2].EnumKeys = `|${this.advancedInfo.chckKnd.map(item => item.codeVal).join('|')}`
            this.data.ALL.extrnl.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchExtrnl({ 
                        searchType: 'ALL',  
                        searchMyProjectId: this.projectId 
                    })
                },
                onDblClick: (event) => {
                    this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                    this.$store.dispatch('setExtCheckPoutDcsnDiv', event.row.poutDcsnDiv)
                    // this.$router.push({ name : 'ExtCheckMngtAllSite' })
                    window.open(this.$router.resolve({name: 'ExtCheckMngtAllSite'}).href, '_blank' )
                },
                // onAfterClick: (event) => {
                //     switch(event.col) {
                //         case 'chckRslt': {
                //             if (event.row[event.col] === 1) {
                //                 this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                //                 this.$store.dispatch('setExtCheckPoutDcsnDiv', event.row.poutDcsnDiv)
                //                 this.$router.push({ name : 'ExtCheckMngtView' })
                //             }
                //             break
                //         }
                //         case 'poutDcsnDiv': {
                //             if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                //                 this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                //                 this.$router.push({ name : 'ExtCheckMngtDcsnView' })
                //             }
                //             break
                //         }
                //         case 'resultDlbrtCmitYn': {
                //             if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                //                 this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                //                 this.$router.push({ name : 'ExtrnlChckDlbrtCmit' })
                //             }
                //             break
                //         }
                //         case 'demLastDcsnYn': {
                //             // ExtrnlChckDcsnLastDem
                //             if (event.row[event.col] === 0 || event.row[event.col] === 1) {
                //                 this.$store.dispatch('setExtCheckExtrnlChckId', event.row.extrnlChckId)
                //                 this.$router.push({ name : 'ExtrnlChckDcsnLastDem' })
                //             }
                //             break
                //         }
                //         case 'poutFileYn': {
                //             if (event.row[event.col] === 0) {
                //                 // poutFileConnectId
                //                 this.fileModal.fileConnectId = event.row.poutFileConnectId
                //                 this.$bvModal.show(this.fileModal.refId)
                //             }
                //             break
                //         }
                //         case 'rsltFileYn': {
                //             if (event.row[event.col] === 0) {
                //                 // poutFileConnectId
                //                 this.fileModal.fileConnectId = event.row.rsltFileConnectId
                //                 this.$bvModal.show(this.fileModal.refId)
                //             }
                //             break
                //         }
                        
                //         default:
                //             break

                //     }
                // }
            }

            /** My pout set */
            this.data.MY.pout.options.Cols[1].Enum = `|${this.advancedInfo.chckKnd.map(item => item.codeNameKr).join('|')}`
            this.data.MY.pout.options.Cols[1].EnumKeys = `|${this.advancedInfo.chckKnd.map(item => item.codeVal).join('|')}`
            this.data.MY.pout.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchPout({ 
                        searchType: 'MY',  
                        searchMyProjectId: this.projectId 
                    })
                },
                onAfterClick: (event) => {
                    switch(event.col) {
                        case 'dcsnFileYn': {
                            if (event.row[event.col] === 0) {
                                // poutFileConnectId
                                this.fileModal.fileConnectId = event.row.dcsnFileConnectId
                                this.$bvModal.show(this.fileModal.refId)
                            }
                            break
                        }
                        
                        default: 
                            break

                    }
                },
                // onSearchFinish: (event) => {
                //     const p = event.sheet.MainTag.parentNode
                //     const h = event.sheet.MainTag.clientHeight

                //     const hOtherRows = h - event.sheet.MainTable.tBodies[0].querySelector('.IBBodyMid').clientHeight - event.sheet.MainTable.tBodies[0].querySelector('.HeightSpace').parentNode.offsetheight

                //     p.style.clientHeight = 
                // },
            }
            
            /** All pout set */
            this.data.ALL.pout.options.Cols[2].Enum = `|${this.advancedInfo.chckKnd.map(item => item.codeNameKr).join('|')}`
            this.data.ALL.pout.options.Cols[2].EnumKeys = `|${this.advancedInfo.chckKnd.map(item => item.codeVal).join('|')}`
            this.data.ALL.pout.options.Events = {
                onRenderFirstFinish: () => {
                    this.fn_fetchPout({ 
                        searchType: 'ALL',  
                        searchMyProjectId: this.projectId 
                    })
                },
                onAfterClick: (event) => {
                    switch(event.col) {
                        case 'dcsnFileYn': {
                            if (event.row[event.col] === 0) {
                                // poutFileConnectId
                                this.fileModal.fileConnectId = event.row.dcsnFileConnectId
                                this.$bvModal.show(this.fileModal.refId)
                            }
                            break
                        }
                        
                        default: 
                            break

                    }
                },
            }

            this.tab.list.forEach(upper => {
                this.dtlTab.list.forEach(lower => {

                    loader.createSheet({
                        el: `ExtCheckMngt_${upper.type}_${lower.type}`,
                        data: [],
                        options: this.data[upper.type][lower.type].options
                    }).then(sheet => {
                        this.data[upper.type][lower.type].sheet = sheet

                    }).catch(error => {
                        console.error(error)
                    })
                })
            })

        },
        fn_fetchAdvanceInfo: function () {
            const institution = {
                url: '/sendApi/api/extrnlChck/extrnlChckInstt/list',
                payload: {

                }
            }
            const insctr = {
                url: '/sendApi/api/extrnlChck/extrnlChckInsctrIncln/list',
                payload: {
                    
                }
            }
            const masterCode = {
                url: '/sendApi/api/common/masterCode/list',
                payload: {
                    siteMstrId: this.$cookies.get('siteMstrId'),
                    // GroupCode
                }
            }
            const mainMidCode = {
                url: '/sendApi/api/common/mainMidCode/list',
                payload: {

                }
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios
                .all([
                    axios.post(institution.url, institution.payload, options),
                    axios.post(insctr.url, insctr.payload, options),
                    axios.post(masterCode.url, {...masterCode.payload, groupCode: 'MNGT_TYPE'}, options),
                    axios.post(masterCode.url, {...masterCode.payload, groupCode: 'POUT_MATTER_TYPE'}, options),
                    axios.post(masterCode.url, {...masterCode.payload, groupCode: 'CHCK_KND'}, options),
                    axios.post(mainMidCode.url, {...mainMidCode.payload, codeType: 'EXTN'}, options),
                    axios.post(masterCode.url, {...masterCode.payload, upperGroupCode: 'POUT_MATTER_TYPE'}, options),
                    axios.post(masterCode.url,  {...masterCode.payload, groupCode: 'POUT_TYPE'}, options)
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.dlExtrnInstt      = response[0].data.dlExtrnInstt
                    this.advancedInfo.dlInsttInsctr     = response[1].data.dlInsttInsctr
                    this.advancedInfo.mngtType          = response[2].data.data
                    this.advancedInfo.poutMatterType    = response[3].data.data
                    this.advancedInfo.chckKnd           = response[4].data.data
                    this.advancedInfo.mainCode          = response[5].data.dlMainCode
                    this.advancedInfo.midCode           = response[5].data.dlMidCode
                    this.advancedInfo.dem               = response[6].data.data
                    this.advancedInfo.poutType          = response[7].data.data

                }))
                .catch(error => {
                    console.error(error)
                })
                .then(() => {
                    /** after defaultDataInfo set  */
                    this.fn_initSheet()
                })
        },

        fn_fetchExtrnl: function (searchInfo, searchType = this.tab.list[this.tab.current].type) {

            const _searchType = searchInfo.searchType ? searchInfo.searchType : searchType

            const url = '/sendApi/api/extrnlChck/extrnlChckInfo/list'
            const payload = {
                // searchMyProjectId: this.projectId,
                searchMyProjectId:  this.projectId,
                searchSiteMasterId: this.siteMstrId,
                ...searchInfo,
                searchType:         _searchType,
            }

            if(_searchType == 'ALL'){
                payload['searchSiteMasterId'] = ''
            }

            if (payload.date && payload.date.filter(date => date != null).length > 0 ) {
                payload.searchStartDt = payload.date[0]
                payload.searchEndDt   = payload.date[1]
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

                    // this.data[_searchType].extrnl.data = _.uniqBy(response.data.dlExtrnChck, 'extrnlChckId')
                    this.data[_searchType].extrnl.data = response.data.dlExtrnChck

                    // set-item
                    this.data[_searchType].extrnl.data.forEach(item => {
                        item.chckde = item.chckde ? item.chckde : `${item.chckPlanBgnde} ~ ${item.chckPlanEndde}`
                        if (item.extrnlChckId) item.chckRslt = '1'
                        if (item.poutMatterYn === 'Y' && item.cnfrmnCnt > 0) {

                            item.poutDcsnDiv =  item.dcsnOfldcCnt > 0 ? '1' : (this.userWritable ? '0' : null)
                            
                            if (item.resultDlbrtCmitYn === 'Y') {
                                // item.resultDlbrtCmitYn = item.resultDlbrtCmitYn === 'Y' ? '1' : '0'
                                item.resultDlbrtCmitYn = item.resultDlbrtCmit ? '1' : (this.userWritable ? '0' : null)
                            } else {
                                item.resultDlbrtCmitYn = null
                            }

                            if (item.poutDcsnDiv !== '0') {
                                item.demLastDcsnBtnYn  = Number(item.dcsnOfldcCnt) === 0 
                                                        ? '1' 
                                                        : item.demLastDcsnYn === 'Y' 
                                                            ? '1' 
                                                            : (this.userWritable ? '0' : null)
                            } else {
                                item.demLastDcsnBtnYn = null
                            }
                        } else {
                            item.poutDcsnDiv = null
                            item.resultDlbrtCmitYn = null
                            item.demLastDcsnBtnYn = null
                        }

                        item.cnfrmnCnt = item.cnfrmnCnt ? item.cnfrmnCnt : 0
                        item.dcsnCnt = item.dcsnCnt ? item.dcsnCnt : 0
                        item.upDttm = item.upDttm ? this.$moment(item.upDttm).format('YYYY-MM-DD') : undefined

                        // item.poutFileYn = item.poutFileConnectId ? (this.userDownloadable ? '0' : null) : null
                        // item.rlstFileYn = item.rsltFileConnectId ? (this.userDownloadable ? '0' : null) : null

                        item.poutFileYn = item.poutFileConnectCnt && item.poutFileConnectCnt > 0 ? (this.userDownloadable ? '0' : null) : null
                        item.dcsnFileYn = item.dcsnFileConnectCnt && item.dcsnFileConnectCnt > 0 ? (this.userDownloadable ? '0' : null) : null
                        item.poutCnt = item.poutCnt ? item.poutCnt : 0
                    })

                    this.data[_searchType].extrnl.sheet.loadSearchData({
                        data: this.data[_searchType].extrnl.data
                    })

                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_fetchPout: function (searchInfo, searchType = this.tab.list[this.tab.current].type) {

            const _searchType = searchInfo.searchType ? searchInfo.searchType : searchType

            const url = '/sendApi/api/extrnlChck/extrnlChckPoutMatterResult/list'
            const payload = {
                searchMyProjectId:  this.projectId,
                searchSiteMasterId: this.siteMstrId,
                ...searchInfo,
                searchType:         _searchType,
            }

            if(_searchType == 'ALL'){
                payload['searchSiteMasterId'] = ''
            }

            if (payload.date && payload.date.filter(date => date != null).length > 0 ) {
                payload.searchStartDt = payload.date[0]
                payload.searchEndDt   = payload.date[1]
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
                    this.data[_searchType].pout.data = response.data.dlPoutMatter
                    this.data[_searchType].pout.data.forEach(item => {
                        item.chckde     = item.chckde ? item.chckde : `${item.chckPlanBgnde} ~ ${item.chckPlanEndde}`

                        item.dcsnFileYn = item.dcsnFileConnectCnt && item.dcsnFileConnectCnt > 0 ? '0' : null
                        item.dcsnDocDem = item.dcsnDocRecptnDe ? (item.dcsnDocDem ? item.dcsnDocDem : 0) : null
                    })

                    this.data[_searchType].pout.sheet.loadSearchData({
                        data: this.data[_searchType].pout.data
                    })
                })
                .catch(error => {
                    console.error(error)
                })
        },
        
        fn_fetchMasterCode: function (_payload, callback) {
            const url = '/sendApi/api/common/masterCode/list'
            const payload = {
                siteMstrId: this.$cookies.get('siteMstrId'),
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
                .then(response => {
                    return callback(response)
                })
                .catch(error => {
                    console.error(error)
                })
        },

        fn_clear: function (type, dtlType) {
            if (type === 'MY') {
                if (dtlType === 'extrnl') {
                    this.search[type][dtlType] = {
                        searchChckKnd: '',
                        searchExtrnlInsttId: '',
                        searchInsctrId: '',
                        searchExtrnlInsttNm: '',
                        searchInsctrNm: '',
                        date: [null, null],
                    }
                } else if (dtlType === 'pout') {
                    this.search[type][dtlType] = {
                        searchChckKnd: '',
                        searchExtrnlInsttId: '',
                        searchInsctrId: '',
                        searchExtrnlInsttNm: '',
                        searchInsctrNm: '',
                        date: [null, null],

                        searchTitle: '',
                        searchPoutMatterType: '',
                        searchCntrwkKnd: '',
                        searchCntrwkKndDtl: '',
                        searchCnfrmnWritngYn: '',
                        searchPoutType: '',
                        searchDemDcsnYn: '',
                    }
                }
            } else if (type === 'ALL') {
                if (dtlType === 'extrnl') {
                    this.search[type][dtlType] = {
                        searchChckKnd: '',
                        searchExtrnlInsttId: '',
                        searchInsctrId: '',
                        searchExtrnlInsttNm: '',
                        searchInsctrNm: '',
                        date: [null, null],

                        searchMngtType: '',
                        searchProjectNm: '',
                    }
                } else if (dtlType === 'pout') {
                    this.search[type][dtlType] = {
                        searchChckKnd: '',
                        searchExtrnlInsttId: '',
                        searchInsctrId: '',
                        searchExtrnlInsttNm: '',
                        searchInsctrNm: '',
                        date: [null, null],
                        
                        searchTitle: '',
                        searchPoutMatterType: '',
                        searchCntrwkKnd: '',
                        searchCntrwkKndDtl: '',
                        searchCnfrmnWritngYn: '',
                        searchPoutType: '',
                        searchDemDcsnYn: '',

                        searchMngtType: '',
                        searchProjectNm: '',
                    }
                }

            }
        },
        fn_remove: function () {
            const checked = this.data.MY.extrnl.sheet.getRowsByChecked('isChecked')

            if(checked.length === 0) {
                this.alert('선택된 항목이 없습니다.' )
                return
            }

            const url = '/sendApi/api/extrnlChck/extrnlChckInfoLst/unuse'
            const payload = {
                extrnlChckIds: checked.map(row => row.extrnlChckId)
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
                        this.alert('대외점검 내역을 삭제했습니다.', () => {
                            this.fn_fetchExtrnl({ 
                                searchType: 'MY',  
                                searchMyProjectId: this.projectId 
                            })
                        })
                    } else {
                        throw Error('fn_remove')
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.alert('대외점검 삭제에 실패했습니다.')
                })
        },
        fn_downloadGuide: function () {
            // const fileId = 'FEDU_00000000000393'
            // const url = '/sendApi/api/file/singleFileDownload'

            // const payload = {
            //     fileId: fileId
            // }

            // axios.post(url, payload, {
            //     headers: {
            //         'Accept-Language': 'ko',
            //         'Authorization': this.$cookies.get("Authorization"),
            //     },
            //     responseType: 'blob'
            // }).then(response => {
            //     const blob = new Blob([response.data])
            //     const fileName = '대외점검 Guide.zip'

            //     // Internet Explorer
            //     if (typeof window.navigator.msSaveBlob !== 'undefined') {
            //         window.navigator.msSaveOrOpenBlob(blob, fileName)
            //     // Other Browsers
            //     } else {
            //         const objectUrl = window.URL.createObjectURL(blob);
            //         const link = document.createElement('a')

            //         link.style.cssText = 'display:none'
            //         link.href = objectUrl
            //         link.setAttribute('download', fileName)

            //         if (typeof link.download === 'undefined') {
            //             link.setAttribute('target', '_blank')
            //         }

            //         document.body.appendChild(link)
            //         link.click()
            //         link.remove()
            //         window.URL.revokeObjectURL(objectUrl)

            //     }
            // }).catch(error => {
            //     console.error(error)
            //     throw new Error(error)
            // })
            const url = '/sendApi/api/file/guideFileDownload'
               const payload = {
                  codeVal: 'EXTERNAL'
               }
               const options = {
                  headers: {
                     'Authorization': this.$cookies.get('Authorization'),
                     'Content-Type': 'multipart/form-data; charset=utf-8;',
                     'Accept-Language': 'ko'
                  },
                  responseType: 'blob'
               }
               axios.post(url, payload, options)
                  .then(response => {
                     const blob = new Blob([response.data])
                     const fileName = '대외점검 Guide.zip'

                     // Internet Explorer
                     if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        window.navigator.msSaveOrOpenBlob(blob, fileName)
                     // Other Browsers
                     } else {
                        const objectUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement('a')

                        link.style.cssText = 'display:none'
                        link.href = objectUrl
                        link.setAttribute('download', fileName)

                        if (typeof link.download === 'undefined') {
                           link.setAttribute('target', '_blank')
                        }

                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        window.URL.revokeObjectURL(objectUrl)
                     }
                  })

        },
        /** 엑셀 다운로드 */
        // fn_exportExcel2: function () {
        //     this.data[this.tab.list[this.tab.current].type][this.dtlTab.list[this.dtlTab[`current${this.tab.list[this.tab.current].type}`]].type].sheet.down2Excel({
        //         merge:      1,                  // 머지된 내용 그대로 출력할 것인지
        //         // downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
        //         // downHeader: 0,
        //         // titleText:  '번호|점검종류|점검기관|상세점검목적|점검자|점검일|총\n지적\n건수|확인서작성||\r\n번호|점검종류|점검기관|상세점검목적|점검자|점검일|총\n지적\n건수|Total|완료|',
        //         // userMerge:  '0,0,2,1 0,1,2,1 0,2,2,1 0,3,2,1 0,4,2,1 0,5,2,1 0,6,2,1 0,7,1,2',
        //         downCols:   this.tab.current === 0 
        //                         ? this.dtlTab[`current${this.tab.list[this.tab.current].type}`] === 0
        //                             ? 'SEQ|chckKnd|extrnlInsttNm|chckPurpsCn|insctrNmDtls|chckde|poutCnt|cnfrmnCnt|dcsnCnt'
        //                             : 'SEQ|chckKnd|extrnlInsttNm|chckde|insctrNm|poutMatterTypeNm|cntrwkKndNm|title|chckPoutMatterCn|dem|cnfrmnWritngYn|poutTypeNm|dcsnDocDem|dcsnDocRecptnDe|dcsnResultManagtTrgetNm|dcsnResultManagtCn|demDcsnYn|lastDem'
        //                         : this.dtlTab[`current${this.tab.list[this.tab.current].type}`] === 0
        //                             ? 'SEQ|projectNm|chckKnd|extrnlInsttNm|chckPurpsCn|insctrNmDtls|demLastDcsnYn|chckde|poutCnt|cnfrmnCnt|dcsnCnt|upDttm'
        //                             : 'SEQ|projectNm|chckKnd|extrnlInsttNm|chckde|insctrNm|poutMatterTypeNm|cntrwkKndNm|title|chckPoutMatterCn|cnfrmnWritngYn|poutTypeNm|dcsnDocDem|dcsnDocRecptnDe|dcsnResultManagtTrgetNm|dcsnResultManagtCn|demDcsnYn|lastDem',
        //         reqHeader:  {
        //                         'Authorization': this.$cookies.get('Authorization'),
        //                         'Accept-Language': 'ko'
        //                     },
        //         fileName:   `대외점검_${this.dtlTab.list[this.dtlTab[`current${this.tab.list[this.tab.current].type}`]].text}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
        //     })
        // },

        fn_exportExcel: function () {

            this.excelDownload.options      = {
                Cfg: this.data[this.tab.list[this.tab.current].type][this.dtlTab.list[this.dtlTab[`current${this.tab.list[this.tab.current].type}`]].type].options.Cfg,
                // Cols: this.data[this.tab.list[this.tab.current].type][this.dtlTab.list[this.dtlTab[`current${this.tab.list[this.tab.current].type}`]].type].options.Cols
                Cols: this.tab.current === 0 
                    ? this.dtlTab.currentMY === 0 
                        ? this.data.MY.extrnl.options.Cols.filter(item => !['isChecked', 'chckRslt', 'poutDcsnDiv', 'resultDlbrtCmitYn', 'demLastDcsnBtnYn', 'poutFileYn', 'dcsnFileYn' ].includes(item.Name))
                        : this.data.MY.pout.options.Cols.filter(item => !['dcsnFileYn'].includes(item.Name))
                    : this.dtlTab.currentALL === 0 
                        ? this.data.ALL.extrnl.options.Cols.filter(item => !['poutFileYn', 'rsltFileYn'].includes(item.Name))
                        : this.data.ALL.pout.options.Cols.filter(item => !['dcsnFileYn'].includes(item.Name))
            }
            this.excelDownload.data         = this.data[this.tab.list[this.tab.current].type][this.dtlTab.list[this.dtlTab[`current${this.tab.list[this.tab.current].type}`]].type].data
            this.excelDownload.fileName     = `대외점검_${this.dtlTab.list[this.dtlTab[`current${this.tab.list[this.tab.current].type}`]].text}_${this.$moment().format('YYYYMMDD')}.xlsx`  // file명 : 현재화면 페이지 _현재 날짜
            this.excelDownload.request      = true
        },
    },
    data: function () {
        return {
            
            tab: {
                list: [ 
                    {
                        text: 'My site',
                        type: 'MY'
                    }, 
                    {
                        text: 'All sites',
                        type: 'ALL'
                    } 
                ],
                current: 0,
            },
            /** lower-tab */
            dtlTab: {
                list: [
                    {
                        text: '대외점검',
                        type: 'extrnl',
                    },
                    {
                        text: '지적사항',
                        type: 'pout',
                    },

                ],
                currentMY: 0,
                currentALL: 0,
            },

            advancedInfo: {
                dlExtrnInstt: [],
                dlInsttInsctr: [],
                mngtType: [],
                poutMatterType: [],
                chckKnd: [],
                advancedInfo: [],
                mainCode: [],
                midCode: [],
                dem: [],
                poutType: [],
            },

            /** searchInfo */
            search: {

                MY: {
                    extrnl: {
                        searchChckKnd: '',
                        searchExtrnlInsttId: '',
                        searchInsctrId: '',
                        searchExtrnlInsttNm: '',
                        searchInsctrNm: '',
                        date: [null, null],
                        searchFinlCmpltYn: '',
                    },
                    pout: {
                        searchChckKnd: '',
                        searchExtrnlInsttId: '',
                        searchInsctrId: '',
                        searchExtrnlInsttNm: '',
                        searchInsctrNm: '',
                        date: [null, null],

                        searchTitle: '',
                        searchPoutMatterType: '',
                        searchCntrwkKnd: '',
                        searchCntrwkKndDtl: '',
                        searchCnfrmnWritngYn: '',
                        searchPoutType: '',
                        searchDemDcsnYn: '',
                    },
                },
                ALL: {
                    extrnl: {
                        searchChckKnd: '',
                        searchExtrnlInsttId: '',
                        searchInsctrId: '',
                        searchExtrnlInsttNm: '',
                        searchInsctrNm: '',
                        date: [null, null],
                        searchFinlCmpltYn: '',

                        searchMngtType: '',
                        searchProjectNm: '',
                    },
                    pout: {
                        searchChckKnd: '',
                        searchExtrnlInsttId: '',
                        searchInsctrId: '',
                        searchExtrnlInsttNm: '',
                        searchInsctrNm: '',
                        date: [null, null],

                        searchTitle: '',
                        searchPoutMatterType: '',
                        searchCntrwkKnd: '',
                        searchCntrwkKndDtl: '',
                        searchCnfrmnWritngYn: '',
                        searchPoutType: '',
                        searchDemDcsnYn: '',

                        searchMngtType: '',
                        searchProjectNm: '',
                    },
                }
            },

            /** sheetData */
            data: {
                MY: {
                    extrnl: {
                        sheet: null,
                        data: [],
                        options: {}
                    },
                    pout: {
                        sheet: null,
                        data: [],
                        options: {}
                    },
                },
                ALL: {
                    extrnl: {
                        sheet: null,
                        data: [],
                        options: {}
                    },
                    pout: {
                        sheet: null,
                        data: [],
                        options: {}
                    },
                }
            },

            fileModal: {
                refId: 'ExtCheckMngtSheet_FileModal',
                fileConnectId: '',
                fileType: 'ExtCheck',
            },
            
            excelDownload: {
                request: false,
                fileName: '',
                options: {},
                data: [],
                downloadOption: {}
            },
            
        }
    },
}
</script>