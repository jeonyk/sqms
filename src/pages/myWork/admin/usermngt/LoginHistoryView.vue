<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only">제목</caption>
                <colgroup>
                    <col width="5%">
                    <col width="22%">
                    <col width="5%">
                    <col width="22%">
                    <col width="2%">
                    <col width="22%">
                </colgroup>
                <tbody>
                    <tr>
                        <th>구분</th>   
                        <td>
                            <select
                                v-model="search.userType"
                                class="form_control"
                                >
                                <option
                                    v-for="option in categoryData"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </option>
                            </select>
                        </td>
                        <th>성명</th>
                        <td>
                            <input type="text" v-model="search.userNm" class="form_control size_lg" placeholder="이름을 입력해주세요." @keyup.enter="searchData(false)">
                        </td>
                        <th>ID</th>
                        <td>
                            <input type="text" v-model="search.userId" class="form_control size_lg" placeholder="ID를 입력해주세요." @keyup.enter="searchData(false)">
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th>로그인 위치</th>
                        <td>
                            <select
                                v-model="search.userPath"
                                class="form_control"
                                >
                                <option
                                    v-for="option in categoryData2"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </option>
                            </select>
                        </td>
                        <th>로그인 일시</th>
                        <td>
                            <DatePickerRange v-model="search.loginHistoryDt"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="ib_wrap mt0" style="height: calc(100vh - 320px)">
                <div id="ibsheet_loginHistory" class="ibsheet_table" style="height: 100%;"></div>
            </div>
        </div>   <!-- // inner -->
        <!-- ibsheet -->
    </div>
</template>

<script>
import API from '@/apis/'
import _ from 'lodash'
import axios from 'axios'
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { LoginHistory } from '@/pages/common/data/UserMngtList'
import DatePickerRange from '@component/common/DatePickerRange.vue'

export default {
    name: 'LoginHistoryView',
    mixins: [MsgBoxMixins],
    components: {
        DatePickerRange,
    },
    data: () => ({
        footerBg: 'transparent',
        sheet : null,
        sheetData : null,
        search : {
            userType : '',
            userNm : '',
            userId : '',
            loginHistoryDt : [null, null],
            userPath : '',
        },
        categoryData : [
            { label : '전체', value: ''},
            { label : 'HEC', value: 'HEC'},
            { label : '협력사', value: 'PTNR'},
        ],
        categoryData2 : [
            { label : '전체', value: ''},
            { label : 'Web', value: 'web'},
            { label : 'Mobile', value: 'mobile'},
        ]            
    }),
    mounted() {
        // this.init()
    },
    methods: {
        /**
         * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
         * @param {Boolean} isReset 초기화 버튼 클릭인지?
         */

        init(){
            let options = LoginHistory.options

            // options.Events = {
            //     onRenderFirstFinish: async () => {
            //         this.getLoginHistoryList()
            //     }
            // }

            loader.createSheet({
                el: 'ibsheet_loginHistory',
                data: [],
                options : options
            }).then(sheet => {
                this.sheet = sheet
            })
        },

        async searchData(isReset) {
            if(isReset){
                this.search = {
                    userType : '',
                    userNm : '',
                    userId : '',
                    loginHistoryDt : [null, null],
                    userPath : '',
                }
            }else{
                return await this.getLoginHistoryList(this.search)
            }
        },
        /**
         * 초기 그리드 데이터를 가공합니다
         */
        mappingInitGridData(data){
            if(!data) return []

            const mappedData = data.map(row => {
                row.userType = row.userType === 'HEC'? 'HEC' : '협력사'
                row.userPath = row.userPath === 'web'? 'WEB' : 'MOBILE'
                return {
                    ...row,
                }
            })
            return mappedData
        },
        async getLoginHistoryList(payload = this.search) {
            payload['historyStartDt'] = this.search.loginHistoryDt[0]
            payload['historyEndDt'] = this.search.loginHistoryDt[1]
            
            // options.Events = {
            //     onRenderFirstFinish: async () => {
                    try {
                        const response = await API.loginHistory.getLoginHistoryList(payload)
                        if(response?.lResult.length > 0) {
                            this.sheetData = this.mappingInitGridData(response.lResult)
                            this.sheet.loadSearchData({
                                data : this.sheetData
                            })
                        }else{
                            this.sheet.loadSearchData({
                                data : []
                            })
                        }
                    } catch (error) {
                        console.error(error)
                    }
            //     }
            // }
        },
    },
}
</script>