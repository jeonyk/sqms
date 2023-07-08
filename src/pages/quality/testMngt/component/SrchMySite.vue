<template>
    <div class="lookup_box multi_line">
        <table>
            <colgroup>
                <col width="5%">
                <col width="16%">
                <col width="5%">
                <col width="16%">
                <col width="4%">
                <col width="16%">
                <col width="5%">
                <col width="16%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr v-if="currentTab === 1">
                    <th>프로젝트명</th>
                    <td>
                        <div class="form_area">
                            <select class="form_control" @change="mngtTypeHandler" v-model="srchOptions.mngtType">
                                <option value="전체">전체</option>
                                <option value="0">관리</option>
                                <option value="1">비관리</option>
                                <option value="2" >준공</option>
                            </select>
                            <input type="text" class="form_control" placeholder="입력해주세요" v-model="srchOptions.projNm" @keyup.enter="srchTestData" maxlength="150">
                        </div>    
                    </td> 
                    <td colspan="7" class="ar">
                        <button type="button" class="btn_reset" @click="resetSrch">초기화</button>
                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="srchTestData">검색</button>
                    </td>
                </tr>
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
                    <th>종별</th>
                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="srchOptions.subName" @keyup.enter="srchTestData" maxlength="30"></td>
                    <th>진행상황</th>
                    <td>
                        <select class="form_control size_md" v-model="srchOptions.resultProgrsStatus">
                            <option value="" > {{ '전체' }} </option>
                            <option v-for="(data, idx) in progrsStatusCombo" :key="idx" :value="data.codeVal">{{ data.codeNameKr }}</option>
                        </select>
                    </td>
                    <td class="ar" v-if="currentTab === 0">
                        <button type="button" class="btn_reset" @click="resetSrch">초기화</button>
                        <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="srchTestData">검색</button>
                    </td>
                </tr>

                <tr>
                    <th>시험종목</th>
                    <td><input type="text" class="form_control size_md" placeholder="입력해주세요" v-model="srchOptions.tstSbjDtlName" @keyup.enter="srchTestData" maxlength="100"></td>                 
                    <th>시험 TYPE</th>    
                    <td>
                        <select class="form_control size_md" v-model="srchOptions.testType">
                            <option value="" > {{ '전체' }} </option>
                            <option v-for="item in testTypeCombo" :key="item.codeVal" :value="item.codeVal">
                                {{ item.codeNameKr }}
                            </option>
                            <!-- <option v-for="(testType, idx) in testTypes" :key="idx">{{ testType }}</option> -->
                        </select>
                    </td>       
                    <th>시험일</th>
                    <td>
                        <!-- <DatepickerRange v-model="srchOptions.testDate" /> -->
                        <!-- <DatepickerRange ref="datepickerRange" @value-change="dateRangeChange" @value-reset="dateRangeReset" /> -->
                        <date-picker-range v-model="srchOptions.testDateForm" />
                    </td>   
                    <th>시험기관</th>    
                    <td>
                        <select name="" id="" class="form_control size_md" v-model="srchOptions.testInstt">
                            <option value="" > {{ '전체' }} </option>
                            <option v-for="item in testInsttCombo" :key="item.testInsttId" :value="item.testInsttId">
                            {{ item.testInsttName }}
                            </option>
                        </select>
                    </td>      
                </tr>
            </tbody>
        </table>
    </div>  <!-- lookup_box -->
</template>

<script>
//import DatepickerRange from '@/pages/common/popup/DatepickerRange.vue'
import DatePickerRange from '@component/common/DatePickerRange.vue'
import { sendPostApi, requestOptions } from '@/apis/common';

export default {
    name: 'SearchMySite',
    props: {
        currentTab: {
            type: Number,
            default: 1
        },
        categoryData: {
            type: Array
        }
    },
    data() {
        return {
            midCodeList: [],
            testTypeCombo : [],
            testInsttCombo : [],
            progrsStatusCombo : [],
            
            // 검색 옵션
            srchOptions : {
                mngtType: '0',
                projNm: '',          // 프로젝트명
                mainName: '전체',    // 구분
                midName: '전체',     // 공종
                subName: '',         // 종별
                resultProgrsStatus : '', //시험진행상황            
                tstSbjDtlName: '',   // 시험종목
                testType: '',        // 시험TYPE
                testDateForm : [],
                testDateFr: '',      // 시험일
                testDateTo: '',      // 시험일
                testInstt: '',       // 시험기관
                mainCodeId : '',
                midCodeId : '',
            },
        }
    },
    components: {
        DatePickerRange,
    },
    watch: {
        currentTab: {
            deep: true,
            handler() {
                this.resetSrch()
            }
        }
    },
    created() {
        this.getTestTypeCombo();
        this.getTestCombo();
        this.getProgrsStatusCombo();
    },
    mounted () {
    },
    methods: {
        mainCodeHandler(evt) {
            if(evt.target.value !== '전체') {
                this.midCodeList = this.categoryData.filter(item => item.mainCodeId === evt.target.value)[0].midCodeList;
                this.srchOptions.mainCodeId = evt.target.value;

                if(this.midCodeList.length === 0) {
                    this.srchOptions.midName = '전체';
                }
            } else {
                this.srchOptions.mainCodeId = '';
                this.srchOptions.midCodeId = '';
                this.srchOptions.midName = '전체';
            }
        },
        midCodeHandler(evt) {
            this.srchOptions.midCodeId = evt.target.value;
        },
        mngtTypeHandler(evt) {
            this.srchOptions.mngtType = evt.target.value;
        },
        resetSrch() {   // 초기화
            this.srchOptions = {          // 검색 옵션
                mngtType: '0',
                projNm: '',         // 프로젝트명
                mainName: '전체',   // 구분
                mainCodeId: '',
                midName: '전체',    // 공종
                midCodeId: '',
                subName: '',        // 종별
                resultProgrsStatus : '',    //진행사항                
                tstSbjDtlName: '',  // 시험종목
                ksStd: '전체',      // 시험방법
                testDateForm : [],
                testDateFr: '',      // 시험일 시작
                testDateTo: '',        // 시험일 종료
                testInstt: '',    // 시험기관
                testType : ''       //시험 TYPE
            }
            
            //this.dateRangeReset();
        },
        srchTestData() {    // 검색
            let srchItem = {};

            for( let item in this.srchOptions) {
                let val = this.srchOptions[item];
                if(val === '전체') {
                    srchItem[item] = '';
                } else {
                    srchItem[item] = val;
                }
                
            }

            if(this.srchOptions.testDateForm !== null && this.srchOptions.testDateForm !== '' && this.srchOptions.testDateForm !== undefined && this.srchOptions.testDateForm.length > 0) {
                srchItem['testDateFr'] = this.$moment(this.srchOptions.testDateForm[0]).format('YYYYMMDD') 
                srchItem['testDateTo'] = this.$moment(this.srchOptions.testDateForm[1]).format('YYYYMMDD') 

            } else {
                srchItem['testDateFr'] = ""
                srchItem['testDateTo'] = ""
            }
            let items = srchItem;
            this.$emit('srchTestData', items);
        },
        dateRangeChange(evt) {
            this.srchOptions.testDateFr = evt[0].split('-').join('');
            this.srchOptions.testDateTo = evt[1].split('-').join('');
        },
        dateRangeReset(){
            this.srchOptions.testDateFr = null;
            this.srchOptions.testDateTo = null;
            this.$refs.datepickerRange.valueReset(); //DatepickerRange valueReset 함수 호출
        },
        async getTestTypeCombo() { /* 시험 방법 COMBO */
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            
            let url   = '/sendApi/api/common/masterCode/list';
            let param = { groupCode: 'TEST_TYPE' };
            
            try {
                const testTypeData = await sendPostApi(url, param);
                this.testTypeCombo = testTypeData.data.data;
            } catch (error) {
                console.log(error.response.data)
            }
        },
        async getTestCombo(param) {  // sheet data load /* 시험기관 COMBO */
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            // let url='/sendApi/api/testMngt/testResultMngt/testInsttCombo/list';
            let url='/sendApi/api/testMngt/siteSetUp/qltyTestInstt/list';
            
            let payload = { 
                ...param,
                siteMstrId: this.$cookies.get('siteMstrId'),
            };

            try {
                const { data } = await sendPostApi(url, payload);
                const lst = data.datas.dlTestInstt;
                
                this.testInsttCombo = lst;

            } catch (error) {
                console.log(error.response.data);
            }
            
        },
        async getProgrsStatusCombo() { /* 시험 방법 COMBO */
            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            
            let url   = '/sendApi/api/common/masterCode/list';
            let param = { groupCode: 'RESULT_PROGRS_STATUS' };
            
            try {
                const progrsStatusData = await sendPostApi(url, param);
                this.progrsStatusCombo = progrsStatusData.data.data;

            } catch (error) {
                console.log(error.response.data)
            }
        },
    },
}
</script>

<style>

</style>