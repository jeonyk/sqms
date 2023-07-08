<template>
        <div class="tab_contents">
           <Breadcrumb :currentPath="$route.fullPath" />
            <div class="lst_tabs">
                <ul class="">
                    <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                </ul>
            </div>

            <!-- 결함공종 및 유형 -->
            <div class="tab_area" v-show="currentTab == 0">
                <div class="lookup_box multi_line">
                    <table>
                        <colgroup>
                            <col width="5%">
                            <col width="24%">
                            <col width="4%">
                            <col width="24%">
                            <col width="5%">
                            <col width="24%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>공종</th>
                                <td>
                                    <select v-model="search.box.mainCodeId" class="form_control"> <!--  v-model="mySiteFiltering.tradeNm" -->
                                        <option :value="''" > 전체 </option>
                                        <option v-for="mainData in categoryData.dlMainCode" :key="mainData.mainCodeId" :value="mainData.mainCodeId"> {{ mainData.mainName }} </option>
                                    </select>
                                </td>
                                <th>세부공종</th>
                                <td>
                                    <select v-model="search.box.midCodeId" class="form_control">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="midData in categoryData.dlMidCode.filter(item => item.mainCodeId === search.box.mainCodeId)" 
                                            :key="midData.midCodeId" 
                                            :value="midData.midCodeId">{{ midData.midName }}
                                        </option>
                                    </select>
                                </td>
                                <th>결함공종</th>
                                <td>
                                    <select v-model="search.box.subCodeId" class="form_control">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="subData in categoryData.dlSubCode.filter(item => item.midCodeId === search.box.midCodeId)" 
                                            :key="subData.subCodeId" 
                                            :value="subData.subCodeId">{{ subData.subName }}</option>
                                    </select>
                                </td>
                                <td class="ar">
                                    <button type="button" class="btn_reset" v-on:click="clearOption">초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="clickSearch">검색</button>
                                </td>
                            </tr>
                            <tr>
                                <th>결함유형</th>
                                <td><input type="text" v-model="search.box.codeNameKr" class="form_control size_lg" placeholder="입력해주세요" maxlength="100"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="inner">
                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" @click="importExcel" v-if="this.checkUser(this.inUser,'write')">엑셀 업로드</button>
                        <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(itpSheet)" v-if="this.checkUser(this.inUser,'down')">엑셀 다운로드</button>                    
                        <div class="fr">
                            <!-- <button type="button" class="btn btn_sm btn_darkgray" v-on:click="copyRow">행 복사</button> -->
                            <div class="btn_number" v-if="this.checkUser(this.inUser,'write')">
                                <select name="" id="selectBox" class="form_control num" v-model="addIdx">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <button type="button" class="btn btn_sm" v-on:click="addRow">행 추가</button>
                            </div>
                            <button type="button" class="btn btn_sm btn_darkgray" v-on:click="delRow" v-if="this.checkUser(this.inUser,'unuse')">행 삭제</button>
                            <button type="button" class="btn btn_sm btn_darkblue" v-on:click="saveCheck" v-if="this.checkUser(this.inUser,'write')">저장</button>
                        </div>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 350px)'}">
                        <div id="inspectSheetTable" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>

            <!-- 공간 -->
            <div class="tab_area" v-show="currentTab == 1">
                <div class="lookup_box multi_line">
                    <table>
                        <colgroup>
                            <col width="4%">
                            <col width="24%">
                            <col width="4%">
                            <col width="24%">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>구분</th>
                                <td>
                                    <select v-model="search1.box.spaceTypeCode" class="form_control">
                                        <option :value="''" > 전체 </option>
                                        <option 
                                            v-for="spaceData in spaceCodeData" 
                                            :key="spaceData.codeVal" 
                                            :value="spaceData.codeVal">{{ spaceData.codeNameKr }}
                                        </option>
                                    </select>
                                </td>
                                <th>공간</th>
                                <td><input type="text" v-model="search1.box.bsSpaceMngName" class="form_control size_lg" placeholder="입력해주세요" maxlength="50"></td>
                                <td class="ar">
                                    <button type="button" class="btn_reset" v-on:click="clearOption">초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="clickSearch">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="inner">
                    <div class="button_box">
                        <button type="button" class="btn btn_sm btn_excel" @click="importExcel" v-if="this.checkUser(this.inUser,'write')">엑셀 업로드</button>
                        <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(itrSheet)" v-if="this.checkUser(this.inUser,'down')">엑셀 다운로드</button>
                        <div class="fr">
                            <button type="button" class="btn btn_sm btn_darkgray" v-on:click="copyRow">행 복사</button>
                            <div class="btn_number" v-if="this.checkUser(this.inUser,'write')">
                                <select name="" id="" class="form_control num" v-model="addIdx1">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <button type="button" class="btn btn_sm" v-on:click="addRow">행 추가</button>
                            </div>
                            <button type="button" class="btn btn_sm btn_darkgray" v-on:click="delRow" v-if="this.checkUser(this.inUser,'unuse')">행 삭제</button>
                            <button type="button" class="btn btn_sm btn_darkblue" v-on:click="saveCheck" v-if="this.checkUser(this.inUser,'write')">저장</button>
                        </div>
                    </div>

                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 320px)'}">
                        <div id="inspectSheetTable1" class="ibsheet_table" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
            <MasterCodeSearch
                v-on:fn-master-code-search="fnMasterCodeSearch" 
                v-bind:code-name-kr="codeNameKr" v-bind:code-val="codeVal"
                v-bind:master-code-id="masterCodeId" v-bind:title-name="titleName"
                v-bind:group-code="groupCode"
            />
            <!-- v-on : 자식 > 부모  emit 명 : 받을 함수명 -->
            <!-- v-bind : 부모 > 자식 props 명 : 부모에서 사용하고 있는 변수명 -->
            <excel-download
                v-model="excelDownload.request"
                ref-id="dataMngtHeadSetupSheet_ExcelDownload"
                :file-name="excelDownload.fileName"
                :options="excelDownload.options"
                :data="excelDownload.data"
            />
        </div>
</template>

<script>
    import DatepickerRange from '@component/common/DatePickerRange.vue'
    import API from '@/apis/'
    import loader from '@ibsheet/loader'
    import { commonFn } from '@/script/commonFn.js';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { sendPostApi, requestOptions } from '@/apis/common'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import MasterCodeSearch from '@/pages/common/popup/MasterCodeSearch.vue'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'
    
    export default {
        name: 'BsCheckdataMngtHeadSetUpSheet',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            Breadcrumb,
            DatepickerRange,
            API,
            sendPostApi,
            MasterCodeSearch,
            ExcelDownload,
        },
        data() {
            return {
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['결함공종 및 유형', '공간'], // tab name
                inUser:'',
                itpSheet:null,
                itrSheet:null,
                addIdx:'1',
                addIdx1:'1',
                saveCheckYn:false,
                categoryData : {        //결함공종 및 유형 조회
                    dlMainCode : [],    //공종 조회
                    dlMidCode : [],     //세부공종 조회
                    dlSubCode : [],     //결함공종 조회
                },
                defectData : [],        //결함유형 조회
                spaceCodeData : [],     //공간코드 조회
                spaceDta : [],          //공간조회 
                insertIds:[],           //저장시 사용
                search : {
                    box : {
                        mainCodeId : '',        //공종
                        midCodeId : '',         //세부공종
                        subCodeId : '',         //결함공종
                        defectTypeCode : '',    //결함유형
                        codeNameKr : '',        //결함유형codeNameKr
                    }   
                },
                search1 : {
                    box : {
                        spaceTypeCode : '',     //구분
                        bsSpaceMngName : '',     //공간
                    }   
                },
                codeNameKr : '',
                codeVal : '',
                masterCodeId : 'MasterCodeSearch',
                titleName : '결함유형 검색',
                groupCode : 'DEFECT_TYPE',
                
                /* InspectionBsList: 본사 Set-up > BS점검 > 결함공종 및 유형 */
                InspectionBsList : {
                    options: {
                        Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 6 },
                            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 6 },
                            { Name: 'mainCodeId', Header: [{ Value: '공종(Level. 1)' }], Type: 'Enum',RelWidth: 22 },
                            { Name: 'midCodeId', Header: [{ Value: '세부공종(Level. 2)' }], Type: 'Enum', RelWidth: 22 },
                            { Name: 'subCodeId', Header: [{ Value: '결함공종(Level. 3)' }], Type: 'Enum', RelWidth: 22 },
                            { Name: 'codeNameKr', Header: [{ Value: '결함유형(Level. 4)' ,Type: 'Html'}],  CanEdit: 0, Format: {"0": "<button type='button' class='btn_add'>검색</button>"}, RelWidth: 22 }, //, "1": "<div class='search_area'><p class='txt_area'></p></div>"
                            { Name: 'defectTypeCode', Header: [{ Value: '결함코드(Level. 4)' ,Type: 'Html'}], Visible: 0},
                            { Name: 'bsDefectMngId', Visible:0},
                            { Name: 'inUser', Visible:0},
                        ]
                    },
                    data: [
                    ],
                },

                /* InspectionBsList1: 본사 Set-up > BS점검 > 공간 */
                InspectionBsList1 : {
                    options: {
                        Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
                            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5 },
                            { Name: 'spaceTypeCode', Header: [{ Value: '구분' }], Type: 'Enum', RelWidth: 40 },
                            { Name: 'bsSpaceMngName', Header: [{ Value: '공간' }], RelWidth: 60, Size: 50},
                            { Name: 'bsSpaceMngId', Visible:0 },
                            { Name: 'inUser', Visible:0},
                        ]
                    },
                },

                //엑셀다운로드
                excelDownload : {
                    request : false,
                    fileName :'',
                    downloadOption :'',
                    options : null,
                    data : [],
                }
            }
        },
        mounted() {
            this.inUser = this.$session.get('userInfo').userId
            this.getCategoryData();
            this.getDefectData();
            this.getSpaceCodeData();
        },
        beforeDestroy() {
            //시트 초기화
            if(this.itpSheet) {
                this.itpSheet.dispose();
            }
            if(this.itrSheet) {
                this.itrSheet.dispose();
            }
        },
        watch : {
            'search.box.mainCodeId': {
                handler() {
                    this.search.box.midCodeId = '';
                    this.search.box.subCodeId = '';
                },
            },
            'search.box.midCodeId': {
                handler() {
                    this.search.box.subCodeId = '';
                },
            }
        },
        methods: {
            /**
             * API 
             */
            //공종 교재 공종 및 세부 공종 셀렉트 옵션 데이터 세팅
            async getCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/mainMidCode/list';
                let param = { codeType: 'BS' };

                try {
                    const response = await sendPostApi(url, param);
                    if (response.status === 200 && response.data) {
                        this.categoryData = response.data
                        const columns2 = this.InspectionBsList.options.Cols
                        this.setCategoryList({
                            main: columns2.find(col => col.Name === 'mainCodeId'),
                            mid: columns2.find(col => col.Name === 'midCodeId'),
                            sub : columns2.find(col => col.Name === 'subCodeId'),
                        })
                        this.getBsDefectMngView();
                    }
                } catch (error) {
                    console.error('공종,세부공종,결함공종 코드 리스트 조회 실패 : '+error)
                }
            },
            //API : 결함유형 조회
            async getDefectData() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/masterCode/list';
                let param = { codeType: 'DEFECT_TYPE' };

                try {
                    const response = await sendPostApi(url, param);
                    if (response.status === 200 && response.data) {
                        this.defectData = response.data.data;
                    }
                } catch (error) {
                    console.error('결함유형 리스트 조회 실패 : ' +error)
                }
            }, 
            //API : 결함공종 및 유형 조회
            async getBsDefectMngView() {
                this.InspectionBsList.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        try {
                            //'API 요청 Method'
                            let url = '/sendApi/api/bsCheck/defectMng/list';
                            let param = {};
                            if(!commonFn.methods.isEmpty(this.search.box.mainCodeId)) {
                                param['mainCodeId'] = this.search.box.mainCodeId;
                            }
                            if(!commonFn.methods.isEmpty(this.search.box.midCodeId)) {
                                param['midCodeId'] = this.search.box.midCodeId;
                            }
                            if(!commonFn.methods.isEmpty(this.search.box.subCodeId)) {
                                param['subCodeId'] = this.search.box.subCodeId;
                            }
                            if(!commonFn.methods.isEmpty(this.search.box.defectTypeCode)) {
                                param['defectTypeCode'] = this.search.box.defectTypeCode;
                            }
                            if(!commonFn.methods.isEmpty(this.search.box.codeNameKr)) {
                                param['codeNameKr'] = this.search.box.codeNameKr;
                            }
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            const response = await sendPostApi(url, param);
                            if (response.status === 200 && response.data) {
                                this.InspectionBsList.data = response.data.dlDefectMng;
                                this.InspectionBsList.data.forEach(item => {
                                    if(item.codeNameKr) {
                                        item.codeNameKr = item.codeNameKr ? item.codeNameKr : '0'   
                                    } else {
                                        item.codeNameKr = '0';
                                    }
                                })
                                event.sheet.loadSearchData({
                                    data: this.InspectionBsList.data,
                                    append : false // false : 데이터 클리어 후 reload 느낌 : 검색조건 붙었을때 
                                })
                                event.sheet.getDataRows().forEach(row => {
                                    row.CanEdit = 0;
                                    event.sheet.refreshRow(row)
                                })
                            }
                        } catch (error) {
                            console.error('결함공종 및 유형 리스트 조회 실패 :'+error)
                        }
                    },
                    onAfterClick: this.clickGrid,
                    onAfterChange: this.changeGrid,
                }

                let data = this.InspectionBsList.data;
                let options = this.InspectionBsList.options;  
                loader.createSheet({
                    el: 'inspectSheetTable',
                    data: data,
                    options: options,
                }).then(sheet => {
                    this.itpSheet = sheet;
                })
            },
            setCategoryList(payload) {
                const options = {
                    mainData: this.categoryData.dlMainCode,
                    midData: this.categoryData.dlMidCode,
                    subData: this.categoryData.dlSubCode,
                    seperator: '|',
                    key:'CodeId',
                    value: 'Name',
                    ...payload
                }
                if(!(options.main && options.mid && options.sub)) return
                
                options.main.Enum = `${options.seperator}${options.mainData.map(item => item['main'.concat(options.value)]).join(options.seperator)}`
                options.main.EnumKeys = `${options.seperator}${options.mainData.map(item => item['main'.concat(options.key)]).join(options.seperator)}`
                
                options.main.clear = options.mid.Name
                options.mid.Related = options.main.Name

                options.mainData.forEach(item => {
                    options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
                    options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
                })

                options.mid.clear = options.sub.Name
                options.sub.Related = options.mid.Name
                
                options.midData.forEach(item => {
                    options.sub[`Enum${item['mid'.concat(options.key)]}`] = `${options.seperator}${options.subData.filter(subitem=> subitem.midCodeId === item.midCodeId).map(inner => inner['sub'.concat(options.value)]).join(options.seperator)}`
                    options.sub[`EnumKeys${item['mid'.concat(options.key)]}`] = `${options.seperator}${options.subData.filter(subitem=> subitem.midCodeId === item.midCodeId).map(inner => inner['sub'.concat(options.key)]).join(options.seperator)}`
                    
                })
                
            },
            //공간 > 구분 코드 조회
            async getSpaceCodeData() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/masterCode/list';
                let param = { groupCode: 'BS_SPACE' };

                try {
                    const response = await sendPostApi(url, param);
                    if (response.status === 200 && response.data) {
                        this.spaceCodeData = response.data.data;
                        const columns2 = this.InspectionBsList1.options.Cols
                        this.setSpaceCodeList({
                            spaceTypeCode: columns2.find(col => col.Name === 'spaceTypeCode'),
                        })
                        this.getSpaceCodeDataView();
                    }
                } catch (error) {
                    console.error('공간 코드 조회 실패 : '+error)
                }
            },
            setSpaceCodeList(payload) {
                const options = {
                    codeData: this.spaceCodeData,
                    seperator: '|',
                    key:'Val',
                    value: 'NameKr',
                    ...payload
                }
                if(!options.spaceTypeCode) return

                options.spaceTypeCode.Enum = `${options.seperator}${options.codeData.map(item => item['code'.concat(options.value)]).join(options.seperator)}`
                options.spaceTypeCode.EnumKeys = `${options.seperator}${options.codeData.map(item => item['code'.concat(options.key)]).join(options.seperator)}`
            },
            //API : 공간 조회 
            async getSpaceCodeDataView() {
                this.InspectionBsList1.options.Events = {
                    onRenderFirstFinish: async (event) => {
                        try {
                            //'API 요청 Method'
                            let url = '/sendApi/api/bsCheck/spaceMng/list';
                            let param = {};

                            if(!commonFn.methods.isEmpty(this.search1.box.spaceTypeCode)) {
                                param['spaceTypeCode'] = this.search1.box.spaceTypeCode;
                            }
                            if(!commonFn.methods.isEmpty(this.search1.box.bsSpaceMngName)) {
                                param['bsSpaceMngName'] = this.search1.box.bsSpaceMngName;
                            }

                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                            
                            const response = await sendPostApi(url, param);
                            if (response.status === 200 && response.data) {
                                this.spaceDta = response.data.dlSpaceMng;
                                this.itrSheet.loadSearchData({
                                    data: this.spaceDta,
                                    append : false // false : 데이터 클리어 후 reload 느낌 : 검색조건 붙었을때 
                                })
                                event.sheet.getDataRows().forEach(row => {
                                    row.CanEdit = 0;
                                    event.sheet.refreshRow(row)
                                })
                            }
                        } catch (error) {
                            console.error('공간 리스트 조회 실패 : '+error)
                        }
                    },
                    onAfterClick: this.clickGrid,
                }
                loader.createSheet({
                    el: 'inspectSheetTable1',
                    data: [],
                    options: this.InspectionBsList1.options
                }).then(sheet => {
                    this.itrSheet = sheet;
                })
            },
            //API : 저장 및 수정
            dataMngtSave: async function() {
                let sheet = this.itpSheet;
                let changedInfoToJson = [];
                if(this.currentTab === 0) {
                    changedInfoToJson = sheet.getSaveJson({saveMode: 3})

                    changedInfoToJson.data.forEach((item) => {
                        item.status = item.STATUS;
                        item.mainCodeId = sheet.getRowById(item.id).mainCodeId;
                        item.midCodeId = sheet.getRowById(item.id).midCodeId;
                        item.subCodeId = sheet.getRowById(item.id).subCodeId;
                        item.defectTypeCode = sheet.getRowById(item.id).defectTypeCode;
                        item.inUser = this.inUser;
                        item.upUser = this.upUser;
                    })
                    if(changedInfoToJson.Message === 'NoTargetRows') {
                        this.alert('저장할 데이터가 없습니다.')
                        return
                    } else {
                        try {
                            //'API 요청 Method'
                            let url = '/sendApi/api/bsCheck/defectMng/write';
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                            const response = await sendPostApi(url, changedInfoToJson.data.reverse()).then((result) => {
                                this.alert('저장되었습니다.', async => {
                                     this.getBsDefectMngView();
                                })
                            }).catch((e) => {
                                // console.log(e);
                                return e.response
                            });
                        } catch (error) {
                            console.error('결함공종 및 유형 저장 실패 : '+error)
                        }
                    }
                } else if(this.currentTab === 1) {
                    sheet = this.itrSheet;
                    changedInfoToJson = sheet.getSaveJson({saveMode: 3})

                    changedInfoToJson.data.forEach((item) => {
                        item.status = item.STATUS;
                        item.spaceTypeCode = sheet.getRowById(item.id).spaceTypeCode;
                        item.bsSpaceMngName = sheet.getRowById(item.id).bsSpaceMngName;
                        item.inUser = this.inUser;
                        item.upUser = this.upUser;
                    })
                    if(changedInfoToJson.Message === 'NoTargetRows') {
                        this.alert('저장할 데이터가 없습니다.')
                        return;
                    } else {
                        try {
                            //'API 요청 Method'
                            let url = '/sendApi/api/bsCheck/spaceMng/write';
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");

                            const response = await sendPostApi(url, changedInfoToJson.data.reverse()).then((result) => {
                                this.alert('저장되었습니다.', async => {
                                     this.getSpaceCodeDataView();
                                })
                                // this.alert('저장이 완료되었습니다.')
                                // this.getSpaceCodeDataView();
                            }).catch((e) => {
                                // console.log(e);
                                return e.response
                            });
                        } catch (error) {
                            console.error('공간 저장 실패 : ' + error)
                        }
                    }
                }
            },
            /**
             * EVENT
             */
            addRow : function() {      //행추가
                let sheet = this.itpSheet;
                let checkRows = [];
                if(this.currentTab === 0) {
                    checkRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                    if(checkRows.length === 0) {
                        for(let i=0; i<this.addIdx; i++) {
                            sheet.addRow({
                                count : this.addIdx,
                                init: { codeNameKr: '0'},
                                next: checkRows.length > 0 ? checkRows[0].nextSibling : sheet.getFirstRow()
                               
                            })
                        }
                    } else {
                        for(let i=0; i<this.addIdx; i++) {
                            sheet.addRow({
                                count : this.addIdx,
                                init: { codeNameKr: '0'},
                                // next: checkRows.length > 0 ? checkRows[0].nextSibling : null,
                                next: checkRows.length > 0 ? checkRows[0].nextSibling : sheet.getFirstRow()
                            })
                        }
                    }
                } else {
                    sheet = this.itrSheet;
                    checkRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                    if(checkRows.length === 0) {
                        sheet.addRows({
                            count : this.addIdx1,
                            next: checkRows.length > 0 ? checkRows[0].nextSibling : sheet.getFirstRow()
                        })
                    } else {
                        sheet.addRows({
                            count : this.addIdx1,
                            next: checkRows.length > 0 ? checkRows[0].nextSibling : sheet.getFirstRow()
                        })
                    }
                }
            },
            delRow : function () {     //행삭제
                this.saveCheckYn = false;

                let sheet = this.itpSheet;
                let checkedRows = [];
                let delNotCount = 0;
                if(this.currentTab === 0) {
                    checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                    if(checkedRows.length === 0) {
                        this.alert('삭제할 행을 선택해주세요.');
                        return;
                    } else {
                        this.confirm('삭제하시겠습니까?' , async => {
                            sheet.deleteRows({rows : checkedRows })
                            checkedRows.forEach(item=> {
                                if(!commonFn.methods.isEmpty(item.bsDefectMngId)) {
                                    delNotCount++;
                                }
                            })
                            if(delNotCount > 0) {
                                this.alert('저장되지 않은 행만 삭제 가능합니다.');
                                return;
                            } else {
                                checkedRows.forEach(item => {
                                    sheet.removeRow({row: item,}) 
                                })
                            } 
                        })
                    }
                } else {
                    sheet = this.itrSheet;
                    checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);
                    if(checkedRows.length === 0) {
                        this.alert('삭제할 행을 선택해주세요.');
                        return;
                    } else {
                        this.confirm('삭제하시겠습니까?' , async => {
                            checkedRows.forEach(item => {
                                sheet.removeRow({row: item,}) 
                            })
                        })
                    }
                }
            },
            copyRow: function(){    //행복사
                let sheet = this.itpSheet;
                let checkedRows = [];
                let checkColumn = 'chk';
                if(this.currentTab === 0) {
                    checkedRows = sheet.getRowsByChecked(checkColumn);
                } else {
                    sheet = this.itrSheet;
                    checkedRows = sheet.getRowsByChecked(checkColumn);
                } 
                if(checkedRows.length === 0) {
                    this.alert('복사할 행을 선택해주세요.');
                    return;
                }
                let copiedRows = sheet.copyRows(checkedRows, sheet.getFirstRow());
                copiedRows.forEach(item => {
                    if(this.currentTab === 0) {
                        this.itpSheet.setAttribute({row: item, col: 'mainCodeId', attr : 'CanEdit', val : '1' ,})
                        this.itpSheet.setAttribute({row: item, col: 'midCodeId', attr : 'CanEdit', val : '1' ,})
                        this.itpSheet.setAttribute({row: item, col: 'subCodeId', attr : 'CanEdit', val : '1' ,})
                        this.itpSheet.setAttribute({row: item, col: 'codeNameKr', attr : 'CanEdit', val : '1' ,})
                        this.itpSheet.setAttribute({row: item, col: 'bsDefectMngId', val : null})
                    } else {
                        this.itrSheet.setAttribute({row: item, col: 'spaceTypeCode', attr : 'CanEdit', val : '1' ,})
                        this.itrSheet.setAttribute({row: item, col: 'bsSpaceMngName', attr : 'CanEdit', val : '1' ,})
                        this.itpSheet.setAttribute({row: item, col: 'bsSpaceMngId', val : null})
                    }
                   
                    item[checkColumn] = false;
                    sheet.refreshCell(item, checkColumn)
                })
            },
            importExcel () {
                const options = {
                    append: 1,                  // 새로로드할지, 뒤에 붙일지 여부
                    fileExt: 'xls|xlsx|csv',    // 가용 확장자
                    mode: 'HeaderMatch'         // column 명 매칭해서 처리
                }
                
                if(this.currentTab === 0) {
                    this.itpSheet.importData(options)
                } else {
                    this.itrSheet.importData(options)
                }
            },
            exportExcel () {
                // export Data options
                // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
                const options = {};
                if(this.currentTab === 0) {
                    options['fileName'] =  `bsCheckHeadSetUpDefect_${'date'}.xlsx`,
                    this.itpSheet.exportData(options)
                } else {
                    options['fileName'] =  `bsCheckHeadSetUpSpace_${'date'}.xlsx`,
                    this.itrSheet.exportData(options)
                }
            },
            //저장 유효성 검사 
            saveCheck: function() {
                this.saveCheckYn = false;
                let rows = [];
                let dup = [];
                if(this.currentTab === 0 ) {
                    this.insertIds = [];
                    rows = this.itpSheet.getDataRows();
                    dup = this.itpSheet.getRowsByDup('mainCodeId,midCodeId,subCodeId,codeNameKr', false, false, false, "Deleted");
                    if(dup.length>0){
                        for(let x = 0; x< dup.length; x++){
                            for(let y = 1;y<dup[x].length; y++){
                                this.itpSheet.setAttribute({
                                    row: dup[x][y],
                                    attr: 'Color',
                                    val: '#f96f6f'
                                })
                            }
                        }
                        this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.');
                        return;
                    } else {
                        for(let x = 0; x<rows.length; x++){
                            let row = {};
                            if(rows[x].mainCodeId == ''||rows[x].mainCodeId == null){
                                this.alert(x+`번째의 공종을 선택해주세요.`);
                                return;
                            }
                            if(rows[x].midCodeId == ''||rows[x].midCodeId == null){
                                this.alert(x+'번째의 세부공종을 선택해주세요.');
                                return;
                            }
                            if(rows[x].subCodeId == ''||rows[x].subCodeId == null){
                                this.alert(x+'번째의 결함공종을 선택해주세요.');
                                return;
                            }
                            if(rows[x].defectTypeCode == ''||rows[x].defectTypeCode == null){
                                this.alert(x+'번째의 결함유형을 선택해주세요.');
                                return; 
                            }
                            row['status'] = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':(rows[x].Changed?'Changed':''));
                            row['mainCodeId'] = rows[x].mainCodeId;
                            row['midCodeId'] = rows[x].midCodeId;
                            row['subCodeId'] = rows[x].subCodeId;
                            row['defectTypeCode'] = rows[x].defectTypeCode;
                            this.insertIds.push(row);
                        }
                        
                        if(this.insertIds.length > 0) {
                            this.confirm('저장하시겠습니까?', this.dataMngtSave);
                            this.saveCheckYn = true;
                        }
                    }
                    
                } else {
                    this.insertIds = [];
                    rows = this.itrSheet.getDataRows();
                    dup = this.itrSheet.getRowsByDup('spaceTypeCode,bsSpaceMngName', false, false, false, "Deleted");
                    
                    if(dup.length>0){
                        for(let x = 0; x< dup.length; x++){
                            for(let y = 1;y<dup[x].length; y++){
                                this.itrSheet.setAttribute({
                                    row: dup[x][y],
                                    attr: 'Color',
                                    val: '#f96f6f'
                                })
                            }
                        }
                        this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.');
                        return;
                    } else {
                        for(let x = 0; x<rows.length; x++){
                            let row = {};
                            if(rows[x].spaceTypeCode == ''||rows[x].spaceTypeCode == null){
                                this.alert('구분을 선택해주세요.');
                                return;
                            }
                            if(rows[x].bsSpaceMngName == ''||rows[x].bsSpaceMngName == null){
                                this.alert('공간을 입력해주세요.');
                                return;
                            }

                            row['status'] = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':(rows[x].Changed?'Changed':''));
                            row['spaceTypeCode'] = rows[x].mainCode;
                            row['bsSpaceMngName'] = rows[x].mainName;
                            this.insertIds.push(row);
                        }

                        if(this.insertIds.length > 0) {
                            this.confirm('저장하시겠습니까?', this.dataMngtSave);
                            this.saveCheckYn = true;
                        }
                    }
                }
            },
            //검색
            clickSearch() {
                if(this.currentTab === 0 ) {    //결함공종 및 유형 검색
                    this.getBsDefectMngView();
                } else {    
                    this.getSpaceCodeDataView();
                }
            },
            //검색 조건 초기화
            clearOption() { 
                if(this.currentTab === 0 ) {    //결함공종 및 유형 검색
                    this.search.box.mainCodeId = '';
                    this.search.box.midCodeId = '';
                    this.search.box.subCodeId = '';
                    this.search.box.defectTypeCode = '';
                    this.search.box.codeNameKr = '';
                } else {     //공간 검색
                    this.search1.box.spaceTypeCode = '';
                    this.search1.box.bsSpaceMngName = '';
                }
            },
            //결함유형 검색 
            clickGrid(event) {
                switch(event.col) {
                    case this.InspectionBsList.options.Cols[5].Name : {
                        if(event.row.codeNameKr !== 0 && !commonFn.methods.isEmpty(event.row.bsDefectMngId)) {
                            return
                        } else if(commonFn.methods.isEmpty(event.row.bsDefectMngId)) {
                            this.codeVal = event.row.codeVal
                            this.$bvModal.show(this.masterCodeId);
                        }
                    }
                }
            },
            /**
             * 결함유형 검색후 call back
             */
            fnMasterCodeSearch(codeParam) {
                let sheet = this.itpSheet;
                const tmpRow = sheet.getFocusedRow()
                
                tmpRow.defectTypeCode = codeParam.codeVal
                tmpRow.codeNameKr = codeParam.codeNameKr

                sheet.refreshCell(tmpRow, 'codeNameKr');
                
            },

            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols.filter((item => !['chk'].includes(item.Name)))
                }
                // this.excelDownload.downloadOption = {
                // }
                this.excelDownload.fileName  = `${['결함공종_및_유형','공간'][this.currentTab]}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
            },
        }
    }
</script>