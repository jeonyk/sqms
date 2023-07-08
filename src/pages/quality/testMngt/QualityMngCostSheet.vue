<template>
            <div class="tab_contents">
                <!-- <h2 class="sub_title">시험관리 > 품질관리비</h2> -->
                <Breadcrumb :currentPath="$route.fullPath" />

                <div class="lst_tabs">
                    <ul class="">
                        <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
                    </ul>
                </div>
                <div class="tab_area submenu_on" v-show="currentTab == 0">
                    <tree-category-tab
                        :category-data="categoryData"
                        :use-check-box="search.tab.useCheckBox"
                        @changed-checked-list="changedTabCheckedList"
                    />
                    <div class="right_content">
                        <div class="inner">
                            <div class="button_box">
                                <span class="mr10">인건비기준</span>
                                <select name="" id="" class="form_control" v-model="switchData" v-on:change="switchSelect">
                                    <option value="한국엔지니어링협회">한국엔지니어링협회</option>
                                    <option value="대한건설협회">대한건설협회</option>
                                </select>
                                 <button type="button" class="btn btn_sm btn_excel" id="excelBtn" @click="excelDown()">엑셀 다운로드</button>
                                <div class="fr">
                                   
                                    <!-- <button type="button" class="btn btn_sm btn_excel">Excel Import</button> -->
                                    <button v-if="checkUser(this.userId,'write')" type="button" class="btn btn_sm btn_darkblue" :class="{disabled :(mainCodeId != '' && mainCodeId != null)}" @click="writeQltyCost">저장</button>
                                </div>
                            </div>
                            <!-- ibsheet -->
                            <div class="ib_wrap" style="height: calc(100vh - 270px)">
                                <div id="qualityCostSheetTable" class="ibsheet_table" style="height: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab_area" v-show="currentTab == 1">
                    <div class="inner">
                        <!-- ibsheet -->
                        <div class="ib_wrap" style="height: calc(100vh - 230px)">
                            <div id="qualityCostSheetTable2" class="ibsheet_table" style="height: 100%;"></div>
                        </div>
                    </div>
                    <ExcelDownloadModal v-if="currentTab == 1" :id="siteQltyCostHisId" :site-mstr-id="siteMstrId" 
                    :pop-idx="'0'" :type="'COST'" :title="title"
                    :ref-id="'qltyCostExcelDownloadModal'"/>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId" v-bind:btn-name="{first : '확인'}"
                    v-on:first-btn-fn="closePop"
                />
                <QualityCostWrite v-bind:ib-sheet="sheetRows" v-bind:site-mstr-id="siteMstrId" v-on:fn-save="fnSave" v-bind:list="personCostList"/>
                <QualityCalculationPop v-bind:site-qlty-cost-his-id="siteQltyCostHisId"/>
            </div>
</template>

<script>
    import loader from '@ibsheet/loader'
    import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
    import { testExpense2, testReport } from '../../common/data/MaterialsList'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import API from '@/apis/'
    import QualityCostWrite from '@/pages/quality/testMngt/QualityCostWrite.vue'
    import QualityCalculationPop from '@/pages/quality/testMngt/QualityCalculationPop.vue'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js';
    import ExcelDownloadModal from '@modal/common/ExcelDownloadModal.vue';

    let qualityCostSheetId = '';
    let qualityCostSheetId2 = '';

    export default {
        name: 'QualityMngCostSheet',
        mixins: [MsgBoxMixins,authCheckMixns],
        components: {
            TreeCategoryTab,
            PopAlert,
            QualityCostWrite,
            QualityCalculationPop,
            Breadcrumb,
            ExcelDownloadModal,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['품질시험비용', 'Report'], // tab name
                userId:'',
                
                //tree tab menu[S]
                mounted: false,

                search: {
                    tab: {
                        useCheckBox: false,
                        data: null
                    },
                    box: {}
                },

                categoryData: [],
                category: {
                    data: []
                },
                //tree tab menu[E]

                popMsg:'',                                                        // 알림창 메세지
                confirmUse:false,                                                 // 알림창 버튼개수
                popId:'testLstAlert',                                             // 알림창 Id
                siteMstrId:'',                                                    // 현장정보Id
                mainCodeId:'',
                midCodeId:'',
                siteMstrIdYn: false,                                              // 현장정보 ID 여부
                excelYn:false,

                switchData: '한국엔지니어링협회',                                 // 드롭다운용 데이터
                mainName: '',
                midName: '',
                subName: '',
                expr: '',
                advc: '',
                midl: '',
                bgin: '',
                elec: '',
                water: '',
                gas: '',
                laborCost: '',
                utilityCharges: '',
                qualityCost: '',
                testCnt: '',
                total: '',
                sheetRows:[],                                                     // 시트 저장용
                siteQltyCostHisId:'',                                             // 시트 히스토리 아이디
                allYn: true,
                personCostList: [0,0,0,0],
                costSheet: null,
                title:'',
            }
        },
        async mounted() {
            //tree tab menu[S]
            this.userId = this.$store.getters['auth/getUserId'];
            await this.getCategoryData();
            this.mounted = true;
            //tree tab menu[E]
            this.loadSheet();
        },
        beforeDestroy() {
            // loader.removeSheet(qualityCostSheetId);
            // loader.removeSheet(qualityCostSheetId2)
        },
        watch: {
            "search.tab.data": {
                handler () {
                    // console.log('search.tab.data changed');

                    if (this.mounted) {
                        // console.log(this.search.tab.data);
                        this.mainCodeId = this.search.tab.data.mainCodeId;
                        this.midCodeId = this.search.tab.data.midCodeId;
                        this.loadSheet();
                        // this.subMidName = this.search.tab.data.midName;
                        // this.getGridData();
                    }
                },
                deep: true
            },
            currentTab: function(){
                this.loadSheet();
            },
        },
        methods: {
            switchSelect: function(){
                if(!this.checkUser(this.userId,'view')){
                    return;
                }else{
                    this.loadSheet();
                }
            },
            async loadSheet(){
                this.allYn = true;
                // console.log('change');
                
                if(this.$cookies.get("siteMstrId") == null){
                    // this.popMsg = `현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.`;
                    // this.siteMstrIdYn = true;
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'testLstAlert');
                    this.alert(`현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.`,()=>{
                        this.$cookies.remove('Authorization');
                        this.$cookies.remove('projectId');
                        this.$cookies.remove('siteId');
                        this.$cookies.remove('siteMstrId');
                        this.$router.push({name: 'login'}) 
                    });
                }else{
                    this.siteMstrId = this.$cookies.get("siteMstrId");
                    let param = {
                        "siteMstrId" : this.siteMstrId,
                    };
                    
                    if(this.currentTab == 0){//조회탭인경우
                        if(this.mainCodeId != null && this.mainCodeId != ''){
                            param['mainCodeId'] = this.mainCodeId;
                            this.allYn = false;
                        }
                        if(this.midCodeId != null && this.midCodeId != ''){
                            param['midCodeId'] = this.midCodeId;
                            this.allYn = false;
                        }
                        try{
                            const rst = await API.crack.getSiteQltyCostData(param,{
                                headers:{
                                    'Authorization': this.$cookies.get("Authorization")
                                }
                            });
                            let data = [];
                            let options = testExpense2.options;
                            // console.log(rst);

                            // if(rst.statusText == 'OK'){
                            if(rst.status == 200){
                                // param['switchData'] = this.switchData;// 인건비 기준
                                let index = 0;
                                let personCost = 0;
                                let gasCost = 0;
                                let waterCost = 0;
                                let elecCost = 0;
                                data = rst.data.data;
                                // console.log(data);

                                //인건비기준, 공공요금 기준 가져오기
                                let param2 ={
                                    "siteMstrId" : this.siteMstrId,
                                };
                                const rst2 = await API.crack.getSiteQltyCostStandard(param2,{
                                    headers:{
                                        'Authorization': this.$cookies.get("Authorization")
                                    }
                                });
                                // console.log(rst2);
                                // console.log(this.switchData);
                                if(this.switchData == rst2.data.Costlist[0].basePriceType){
                                    let prsnStndrd = rst2.data.Costlist[0];
                                    this.personCostList[0] = prsnStndrd.bgin;
                                    this.personCostList[1] = prsnStndrd.midl;
                                    this.personCostList[2] = prsnStndrd.advc;
                                    this.personCostList[3] = prsnStndrd.expr;
                                }else if(this.switchData == rst2.data.Costlist[1].basePriceType){
                                    let prsnStndrd = rst2.data.Costlist[1];
                                    this.personCostList[0] = prsnStndrd.bgin;
                                    this.personCostList[1] = prsnStndrd.midl;
                                    this.personCostList[2] = prsnStndrd.advc;
                                    this.personCostList[3] = prsnStndrd.expr;
                                }
                                // console.log(this.personCostList);

                                gasCost = rst2.data.utilPrc.gas;
                                elecCost = rst2.data.utilPrc.elec;
                                waterCost = rst2.data.utilPrc.water;

                                for(let i = 0; i<data.length;i++){
                                    //회당 공공요금
                                    data[i]['utilCost'] = (data[i].gas*gasCost)+(data[i].elec*elecCost)+(data[i].water*waterCost);
                                    
                                    //회당 인건비
                                    data[i]['manCost'] = 0;
                                    if(data[i].bgin>0){
                                        // personCost = data[i].bgin;
                                        personCost = data[i].bgin /8;
                                        index = 0;
                                    }else if(data[i].midl>0){
                                        // personCost = data[i].midl;
                                        personCost = data[i].midl /8;
                                        index = 1;
                                    }else if(data[i].advc>0){
                                        // personCost = data[i].advc;
                                        personCost = data[i].advc /8;
                                        index = 2;
                                    }else if(data[i].expr>0){
                                        // personCost = data[i].advc;
                                        personCost = data[i].expr /8;
                                        index = 3;
                                    }else{
                                        personCost = 0;
                                        index = 0;
                                    }
                                    data[i]['manCost'] = personCost*this.personCostList[index];
                                    
                                    //종목별 품질시험비 
                                    data[i]['qltyCost']= data[i].manCost+data[i].utilCost;

                                    //합계
                                    data[i]['sum']=data[i].qltyCost*data[i].testCnt;

                                    if(this.allYn){
                                        this.sheetRows.push(data[i]);//아이비시트저장용
                                    }
                                }
                            }else{//에러
                                data = [];
                            }
                            loader.createSheet({
                                el: 'qualityCostSheetTable',
                                data: data,
                                options: options,
                            }).then((sheet) => {
                                this.costSheet = sheet;
                                // qualityCostSheetId = sheet.id
                            });//시트 불러오기

                            // if(data == []|| data.length <=0){//버튼 이벤트
                            //     document.getElementById('saveBtn').setAttribute('disabled',true);
                            // }else{
                            //     document.getElementById('saveBtn').removeAttribute('disabled');
                            // }
                        }catch(error){
                            // console.log(error);
                            // this.popMsg = '조회에 실패했습니다.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'testLstAlert');
                            this.alert('조회에 실패했습니다.');
                        }
                    }else{//리포트 탭인경우
                        let data2 = [];
                        let options2 = testReport.options;
                        options2.Events = {
                            onAfterClick: this.fnClick,
                            ondblclick : this.fnSecondClick
                        };
                        try{
                            let param3 = {
                                "siteMstrId": this.siteMstrId,
                            };
                            const rst3  = await API.crack.getAdmQltyCostReportList(param3,{
                                headers:{
                                    'Authorization': this.$cookies.get("Authorization")
                                }
                            });
                            // console.log(rst3.data.list);

                            // if(rst3.statusText == 'OK'){
                            if(rst3.status == 200){
                                data2 = rst3.data.list;
                                for(let i = 0; i<data2.length; i++){
                                    data2[i]['downBtn'] = 0;
                                    // let date = data2[i].inDttm.substring(0,data2[i].inDttm.indexOf('.')).replace("T"," ");
                                    // data2[i]['inDttm'] = date;
                                }
                            }
                        }catch(error){
                            // console.log(error);
                            // this.popMsg = '조회에 실패했습니다.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'testLstAlert');
                            this.alert('조회에 실패했습니다.');
                        }
                        loader.createSheet({
                            el: 'qualityCostSheetTable2',
                            data: data2,
                            options: options2,
                        }).then((sheet) => {
                            // qualityCostSheetId2 = sheet.id
                        });
                    }
                }
            },
            fnSave : function(id){
                this.$root.$emit('bv::hide::modal', 'QualityCostWrite');
                this.siteQltyCostHisId = id;
                this.excelYn = true;
                // console.log(id);
                // document.getElementById('excelBtn').removeAttribute('disabled');
            },
            fnSecondClick: function(evtParam){
                if(!this.checkUser(this.userId,'view')){
                    return;
                }
                // console.log(evtParam);
                this.siteQltyCostHisId = evtParam.row.siteQltyCostHisId;
                return this.$root.$emit('bv::show::modal', 'QualityCalculationPop');
            },
            async getCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'TEST' };
                
                try {
                    const { data } = await sendPostApi(url, param);
                    this.categoryData = data.list;
                } catch (error) {
                    // console.log(error.response.data)
                }
            },
            changedTabCheckedList (item) {
                this.search.tab.data = item
                // event
            },
            closePop: function(){
                if(this.siteMstrIdYn){
                    this.$cookies.remove('Authorization');
                    this.$cookies.remove('projectId');
                    this.$cookies.remove('siteId');
                    this.$cookies.remove('siteMstrId');
                    this.$router.push({name: 'login'})
                }
                this.$root.$emit('bv::hide::modal', 'testLstAlert');
            },
            writeQltyCost:function(){
                if(!this.checkUser(this.userId,'write')){
                    return;
                }
                let rows = this.costSheet.getDataRows();
                if(rows.length == 0){
                    this.alert('저장할 데이터가 없습니다.');
                    return;
                }
                this.$root.$emit('bv::show::modal', 'QualityCostWrite');
            },
            excelDown: function(){
                // console.log('본문');
                if(!this.checkUser(this.userId,'down')){
                    return;
                }
                 this.costSheet.down2Excel({
                    merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                    downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                    reqHeader:  {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Accept-Language': 'ko'
                    },
                    fileName:   `품질관리비산출_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                })
                return;
                // this.alert('준비중입니다.');
            },
            fnClick:function(evt){
                // console.log(evt.row);
                if(!this.checkUser(this.userId,'down')){
                    return;
                }
                if(evt.col == 'downBtn'){
                    this.title = evt.row.title;
                    this.siteQltyCostHisId = evt.row.siteQltyCostHisId;
                    this.$root.$emit('bv::show::modal', 'qltyCostExcelDownloadModal');
                }
            }
        }
    }
</script>