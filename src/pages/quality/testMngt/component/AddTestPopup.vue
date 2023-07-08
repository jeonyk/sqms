<template>
    <b-modal id="TestSearch" title="시험 추가" 
        hide-backdrop size="lg" @shown="sheetLoad" @hide="removeSheet"
        :footer-bg-variant="footerBg">
        <template #default>
            <div class="pop_container">
                <div class="lookup_box multi_line align_center">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="11%">
                            <col width="*">
                            <col width="13%">
                            <col width="*">
                            <col width="11%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>구분</th>   
                                <td>
                                    <select class="form_control size_md" @change="mainCodeHandler" v-model="srchOptions.mainName">
                                        <option value="전체" selected>전체</option>
                                        <option v-for="(data, idx) in categoryData" :key="idx" :value="data.mainCodeId">{{ data.mainName }}</option>
                                    </select>
                                </td>        
                                <th>공종</th>   
                                <td>
                                    <select class="form_control size_md" @change="midCodeHandler" v-model="srchOptions.midName" :disabled="srchOptions.mainName === '전체'">
                                        <option value="전체" selected>전체</option>
                                        <option v-for="(data, idx) in midCodeList" :key="idx" :value="data.midCodeId">{{ data.midName }}</option>
                                    </select>
                                </td>        
                                <td class="ar">
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="srchTestData">검색</button>
                                </td>
                            </tr>
                            <tr>
                                <th>종별</th>   
                                <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="srchOptions.subName" @keyup.enter="srchTestData"></td>
                                <th>시험종목</th>
                                <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="srchOptions.tstSbjDtlName" @keyup.enter="srchTestData"></td>
                                <!-- <th>규격</th>
                                <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="srchOptions.standard"></td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <strong>시료 개수</strong>
                    <span>{{ testDetail.sploreCo }}</span>
                    <!-- <select class="form_control num" v-model="sploreCo">
                        <option
                            v-for="count in Array(10).fill().map((item, index) => {return index+1})" :key="count" :value="count">
                            {{ count }}
                        </option>
                    </select> -->
                </div>
                <div class="ib_wrap">
                    <div id="AddTestSheet" class="ibsheet_table" style="height:478px"></div>
                </div>
            </div>
        </template>
        <template #modal-footer="{ hide }"> <!-- #modal-footer="{ ok, hide }" -->
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="selectAddTest">선택</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
import loader from '@ibsheet/loader'
import { TestSearch } from '@/pages/quality/testMngt/data/testData';
import { sendPostApi, requestOptions } from '@/apis/common';

export default {
    props: {
        testDetail: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            footerBg: 'transparent',

            grid: { // ibsheet
                sheetEl: [],
                sheetId: [],
                data: [],
                options: {},
            },

            search: {
                data: {}
            },

            categoryData: [],
            midCodeList: [],
            srchOptions: {          // 검색 옵션
                mainName: '전체',   // 구분
                mainCodeId: '',
                midName: '전체',        // 공종
                midCodeId: '',
                subName: '',        // 종별
                standard: '',       // 규격
                tstSbjDtlName: '',  // 시험종목
            },
        }
    },
    destroyed () {
        this.removeSheet();
    },
    methods: {
        sheetLoad: function() {
            this.getCategoryData();
            this.grid = { // ibsheet
                sheetEl: [],
                sheetId: [],
                data: [],
                options: {},
            };

            this.grid.options = TestSearch.options;
            this.grid.options.Events = {
                ondblclick : this.dbclickAddTest
            }

            loader.createSheet({
                el: 'AddTestSheet',
                id: 'AddTest',
                options: this.grid.options,
                data: this.grid.data,
            }).then((sheet) => {
                this.grid.sheetEl['AddTestSheet'] = sheet;
                // this.grid.sheetId.push(sheet.id);
                this.getTestData();
            });
        },
        mainCodeHandler(evt) {
            // console.log(evt.target.value)
            if(evt.target.value !== '전체') {
                this.midCodeList = this.categoryData.filter(item => item.mainCodeId === evt.target.value)[0].midCodeList;
                this.srchOptions.mainCodeId = evt.target.value;

                if(this.midCodeList.length === 0) {
                    this.srchOptions.midName = '전체';
                }
            } else {
                this.srchOptions.midName = '전체';
            }
        },
        midCodeHandler(evt) {
            this.srchOptions.midCodeId = evt.target.value;
        },
        async getCategoryData () {
            // console.log('getCategoryData')
            // requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            
            let url = '/sendApi/api/common/codeCategory/list';
            let param = { codeType: 'TEST' };
            
            try {
                const { data } = await sendPostApi(url, param);
                this.categoryData = data.list;
                // console.log(data.list)
            } catch (error) {
                console.log(error.response.data)
            }
        },
        async getTestData(param) {    // 데이타 가져오기
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/testMngt/testResultMngt/testResultAdit/list';
            let payload = { 
                ...param,
                siteMstrId: this.$cookies.get('siteMstrId'),
                testType : this.testDetail.testType,
            };

            try {
                const { data } = await sendPostApi(url, payload);
                this.grid.data = data.datas.dlTestSubject;
                
                this.grid.sheetEl['AddTestSheet'].loadSearchData({
                    data: this.grid.data,
                    append: false
                });
            } catch (error) {
               console.log(error.response);
            }
        },
        // closePopup() {
        //     this.$root.$emit('bv::hide::modal', 'HistoryLoad');
        // },
        removeSheet() {
            if(this.grid.sheetEl['AddTestSheet']){
                // console.log('removeSheet');
                this.grid.sheetEl['AddTestSheet'].dispose();
            }
        },
        srchTestData() {    // 검색
            let srchItem = {};
            for( let item in this.srchOptions) {
                
                let val = this.srchOptions[item];
                
                if(val === '전체' || val === null || val === undefined || val === '') {
                    srchItem[item] = '';
                } else {
                    srchItem[item] = val;
                }
                // console.log(val)
            }
            let item = srchItem;
            // console.log(item);

            
            // let searchItems = this.grid.data.filter(data => data.mainName.includes(item.mainName) && data.midName.includes(item.midName) && data.subName.includes(item.subName) && data.tstSbjDtlName.includes(item.tstSbjDtlName) && data.standard.includes(item.standard));

            // this.search.data = searchItems;
            // this.grid.sheetEl['AddTestSheet'].loadSearchData({
            //     data: this.search.data,
            //     append: false
            // })

            let param = item;

            this.getTestData(param);
        },
        async dbclickAddTest(info) {   // 선택
            let selectedData = [{
                STATUS: info.row.STATUS,
                chk: info.row.chk,
                id: info.row.id,
                mainName: info.row.mainName,
                midName: info.row.midName,
                standard: info.row.standard,
                subName: info.row.subName,
                testTypeName: info.row.testTypeName,
                tstSbjDtlId: info.row.tstSbjDtlId,
                tstSbjDtlName: info.row.tstSbjDtlName
            }];

            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/testMngt/testResultMngt/testResultAdit/write';
        
            // console.log('selectAddTest :', this.testDetail);
            let param = {
                param: {
                    testResultMngtSeq: this.testDetail.testResultMngtSeq,
                    sploreCo: this.testDetail.sploreCo,
                    siteMstrId: this.$cookies.get('siteMstrId'),
                },
                listData: selectedData
            }

            try {
                await sendPostApi(url, param);
                
            } catch (error) {
                console.log(error.response);
            }

            this.$emit('selectTestData', selectedData);

            
        },
        async selectAddTest() {   // 선택
            let changedInfoToJson = this.grid.sheetEl['AddTestSheet'].getSaveJson({
                saveMode: 3
            });
            
            

            if(changedInfoToJson.data.length > 0) {
                changedInfoToJson.data.forEach((item) => {
                    item.tstSbjDtlId = this.grid.sheetEl['AddTestSheet'].getRowById(item.id).tstSbjDtlId;
                    // item.sploreCo = this.grid.sheetEl['AddTestSheet'].getRowById(item.id).sploreCo;
                })

                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/testMngt/testResultMngt/testResultAdit/write';
            
                // console.log('selectAddTest :', this.testDetail);
                let param = {
                    param: {
                        testResultMngtSeq: this.testDetail.testResultMngtSeq,
                        sploreCo: this.testDetail.sploreCo,
                        siteMstrId: this.$cookies.get('siteMstrId'),
                    },
                    listData: changedInfoToJson.data
                }

                try {
                    await sendPostApi(url, param);
                    
                } catch (error) {
                    console.log(error.response);
                }
            }

            // console.log(changedInfoToJson.data)
            this.$emit('selectTestData', changedInfoToJson.data);

            
        },
    }
}
</script>

<style>

</style>