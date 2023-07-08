<template>
    <!-- 협력사 공종 연결 팝업 defectCompanyPopId -->
    <b-modal id="defectCompanyPopId" title="협력사 공종 연결"  
        modal-class="single_page" size="xl" @shown="sheetLoad"
        :footer-bg-variant="footerBg" no-close-on-backdrop>
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="inner">
                        <div class="table_data small_tab_list" ref="selectOne">
                            <div class="write_box">
                                <h3>Step 1. 결함공종 선택</h3>
                                <div class="contents">
                                    <div class="content_inner">
                                        <div class="search_area">
                                            <input type="text" class="form_control" placeholder="입력해주세요" v-model="search.subName" >
                                            <button type="button" class="btn_search" v-on:click="clickSearch('Defect')">검색</button>
                                        </div>
                                        <div class="link_area">
                                            <ul class="sub_1depth">
                                                <li ref="defectChoise" class="" v-for="(item) in defectData" :key="item.midCodeId" :value="item.midCodeId" @click="openEvt">
                                                    <div class="title">
                                                        <a href="javascript:void(0)">{{item.midName}}</a>
                                                    </div>
                                                    <ul class="sub_2depth" v-for="(item1) in item.subCodeList" :key="item1.subCodeId" :value="item1.subCodeId">
                                                        <li :data-mainCodeId="item.mainCodeId"  
                                                            :data-midCodeId="item.midCodeId" 
                                                            :data-midName="item.midName"
                                                            :data-subCodeId="item1.subCodeId" 
                                                            :data-subName="item1.subName" 
                                                            id="defect"
                                                        ><a :class="{on : selectCode === item1.subCodeId}" href="javascript:void(0)" v-on:click="defectClass(item1.subCodeId, item.midCodeId, item.mainCodeId)">{{item1.subName}}</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="write_box">
                                <h3>Step 2. 협력업체 선택</h3>
                                <div class="contents">
                                    <div class="content_inner">
                                        <div class="search_area">
                                            <input type="text" class="form_control" placeholder="입력해주세요" v-model="search.tradeNm">
                                            <button type="button" class="btn_search" v-on:click="clickSearch('Partner')">검색</button>
                                        </div>
                                        <div class="link_area">
                                            <ul class="sub_1depth" v-if="companyList.length !== 0">
                                                <li class="on" @click="openEvt">
                                                    <div class="title" >
                                                        <a href="javascript:void(0)">{{companyList.length === 0 ? '' : companyList[0].tradeTypeNm}}</a>
                                                    </div>
                                                    <ul class="sub_2depth" v-for="(item) in companyList.filter(item=> item.tradeTypeNm)" :key="item.tradeId" :value="item.tradeId">
                                                        <li :data-tradeTypeNm="item.tradeTypeNm"  
                                                            :data-tradeId="item.tradeId" 
                                                            :data-tradeNm="item.tradeNm"
                                                            :class="{on : selectTradeId === item.tradeId}"
                                                            id="partner"
                                                        ><a href="javascript:void(0)" v-on:click="ptrClass(item.tradeId) ">{{item.tradeNm}}</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul class="sub_1depth" v-if="companyList.length === 0">
                                                <li class="">
                                                    <div class="title">
                                                        조회된 데이터가 없습니다.
                                                    </div>
                                                </li>
                                                <!-- {{조회된 데이터가 없습니다.}} -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="write_box" style="max-width: 892px;" id="dongHoSelect">
                                <h3>
                                    {{step3Tiltle}}
                                    <label 
                                        v-show="radioMh === 'P' ? false : true"
                                        class="input_check form_lg ml30" 
                                        for="isAllChecked" 
                                        @change="selectChkAll" 
                                    >
                                        <!-- @click="selectChkAll" -->
                                        <input type="checkbox" id="isAllChecked" v-model="isAllChecked" :disabled="isAllDisabled">
                                        <!-- ref="AllChk" -->
                                        <span class="label_text">전체 선택</span>
                                    </label>
                                    <div class="fr">
                                        <label class="input_radio" for="radioMh_H">
                                            <input type="radio" id="radioMh_H"  @change="changeSpaceType($event)" v-model="radioMh" value="H">
                                            <span class="label_text">세대</span>
                                        </label>
                                        <label class="input_radio" for="radioMh_P">
                                            <input type="radio" id="radioMh_P" @change="changeSpaceType($event)" v-model="radioMh" value="P">
                                            <span class="label_text">공용</span>
                                        </label>
                                    </div>
                                </h3>
                                <div class="scroll_area" v-show="radioMh === 'H' ? false : true">
                                    <div class="ib_wrap" style="display: inline-block; width: 812px;">
                                        <div id="popsheetTable1" class="ibsheet_table"></div>
                                    </div>
                                </div>
                                <div class="scroll_area" v-show="radioMh === 'P' ? false : true">
                                    <div class="ib_wrap mt15" style="display: inline-block; width: 200px;">
                                        <div id="popsheetTable" class="ibsheet_table"></div>
                                    </div>
                                    <div class="table_normal_list fixedContainer mt15" style="max-height:478px" >
                                        <table ref="stdtable">
                                            <thead>
                                                <tr>
                                                    <template v-for="(item) in stdHo">
                                                        <!-- eslint-disable-next-line -->
                                                        <!-- <th>
                                                            <label class="input_check pop_notext" @change="selectHoChk(item)">
                                                            <input type="checkbox" :name="item" id="frStdHo"
                                                                :data-standHo="item"
                                                            >
                                                                <span class="label_text"></span>
                                                            </label>
                                                        </th> -->
                                                        <!-- eslint-disable-next-line -->
                                                        <th>
                                                            <label class="input_check pop_notext" @change="selectHoChk(item)">
                                                            <input type="checkbox" v-model="item.checked" :disabled="item.disabled">
                                                                <span class="label_text" />
                                                            </label>
                                                        </th>
                                                        <!-- eslint-disable-next-line -->
                                                        <th>{{`${item.standHo}호`}}</th>
                                                    </template>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item,index) in addrFr" :key="index">
                                                    <!-- eslint-disable-next-line -->
                                                    <template v-for="(inItem) in item">
                                                        <!-- eslint-disable-next-line -->
                                                        <td>
                                                            <label class="input_check pop_notext">
                                                                    <!-- :value="inItem.checked" -->
                                                                <input 
                                                                    v-model="inItem.checked"
                                                                    type="checkbox"
                                                                    :disabled="Object.keys(inItem).length === 0  || inItem.disabled"
                                                                    @change="fn_click(inItem)"
                                                                />
                                                                <span class="label_text" />
                                                            </label>
                                                        </td>
                                                        <!-- eslint-disable-next-line -->
                                                        <td>{{inItem.addrHo ? Number(inItem.addrHo)+'호' : ''}}</td>
                                                    </template>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_lg btn_outline btn_darkgray" @click="saveCheck(addrFr)" v-if="checkUser(userId,'write')">연결</b-button>
            <b-button class="btn btn_lg btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
    import DatepickerRange from '@component/common/DatePickerRange.vue'
    import loader from '@ibsheet/loader'
    import API from '@/apis/'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { sendPostApi, requestOptions } from '@/apis/common'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import { commonFn } from '@/script/commonFn.js';
    import _ from 'lodash'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

    export default {
        name: 'dataMngtDefectCompanyWrite',
        mixins: [MsgBoxMixins,authCheckMixns],
        components: {
            DatepickerRange,
            loader,
            sendPostApi,
            requestOptions,
            Breadcrumb,
        },
        data() {
            return {
                siteMstrId : '',
                userId : '',
                footerBg : 'transparent',
                
                dongSheet : null,           // 세대 동정보 sheet 
                publicSpaceSheet : null,    // 공용 공간 정보 sheet

                radioMh : 'H',          //세대 공용 라디오 버튼
                categoryData : {        //결함공종 및 유형 조회
                    dlMainCode : [],    //공종 조회
                    dlMidCode : [],     //세부공종 조회
                    dlSubCode : [],     //결함공종 조회
                },
                search : {
                    subName : '',
                    tradeNm : '',
                    standDong : '',
                },  
                
                dongOptions : [],   //동정보
                houseInfoMySiteData : [], //받아온 호
                defectData : [],    //공종
                companyList : [],   //협력업체 
                houseData : [],     //세대설정 층,
                isAllChecked: false,
                isAllDisabled: false,
                stdHo : [],       //해당 동의 호
                addrFr : [],      //해당 동의 세대
                selectCode : '',        //선택된 결함공종 subCodeId
                selectMidCode : '',     //선택된 결함공종 midCodeId
                selectMainCode : '',   //선택된 결함공종 mainCodeId
                selectTradeId : '', //선택된 협력업체 
                spaceDta : [],      //공용공간
                bsSpaceMngId : '',  //공간ID
                defectPntrData : [],
                saveDataList : [], //저장 사용
                defectPntrDataPtype : [],

                step3Tiltle : 'Step 3. 동/호수 선택',

                /* 동 정보 sheet  */
                houseDongSheet : {
                    options: {
                        Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'label', Header: [{ Value: '동' }], CanEdit: 0, RelWidth: 100 },
                            { Name: 'value', Visible:0},
                        ]
                    },
                    data: [
                        { case1: '101동' , case2: '0101'},
                    ],
                },

                /* InspectionBsList1: 공간 */
                InspectionBsList1 : {
                    options: {
                        Cfg:{
                            NoVScroll : 0,
                            NoDataMessage:3,
                        },
                        Cols: [
                            { Name: 'chk', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
                            //{ Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5 },
                            { Name: 'spaceTypeCode', Visible:0},
                            { Name: 'bsSpaceMngName', Header: [{ Value: '공간' }], RelWidth: 30, CanEdit : 0 },
                            { Name: 'bsSpaceMngId', Visible:0 },
                            { Name: 'inUser', Visible:0},
                            { Name: 'bsDefectPntrMngId', Visible:0},
                            { Name: 'chkValue', Visible:0},
                            { Name: 'disValue', Visible:0},
                        ]
                    },
                },
            }
        },
        beforeDestroy() {
            //시트 초기화
            if(this.dongSheet) {
                //this.itpSheet.dispose();
                this.dongSheet.dispose();                
            }
            if(this.publicSpaceSheet) {
                this.publicSpaceSheet.dispose();
            }
        },
        //watch : {
            // 'search.standDong' : {
            //     deep : true,
            //     handler() {
            //         if(this.radioMh === 'P') {
            //             this.getDefectPntrList();
            //         }
            //     }
            // },
            // 'selectTradeId' : {
            //     deep : true,
            //     handler() {
            //         this.getDefectPntrList();
            //     }
            // },
        //},
        methods: {
            /*****************************************
            * 공통 메소드 
            ******************************************/

            //협력사 공종연결 팝업 
            sheetLoad: function() {

                this.dongSheet = null               // 세대 동정보 sheet 초기화
                this.publicSpaceSheet = null;       // 공용공간 정보 sheet 초기화
                
                this.radioMh = 'H'          // 라디오 버튼 기본값 ( H : 세대 )  
                
                // 본사 set - 결함관리 정보
                this.categoryData = {        
                    dlMainCode : [],    
                    dlMidCode : [],     
                    dlSubCode : [],     
                },

                // 검색 조건
                this.search = {
                    subName : '',       //결함공종
                    tradeNm : '',       //협력사
                    standDong : '',     //동
                },  
                
                // 관련 정보 초기화
                this.dongOptions = []  
                this.houseInfoMySiteData = []
                this.defectData = []    
                this.companyList = []  
                this.houseData = []   
                this.stdHo = []       
                this.addrFr = []
                this.isAllChecked = false,
                this.isAllDisabled= false,     
                this.selectCode = ''    
                this.selectTradeId = '' 
                this.spaceDta = []    
                this.bsSpaceMngId = ''
                this.defectPntrData = []
                this.defectPntrDataPtype = []

                this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
                this.userId = this.$store.getters['auth/getUserId'];
                                
                this.getDefectChoise();                         //공종 선택 조회
                this.getPartnerData();                          //협력 업체 조회
                this.getHouseInfoMySiteDongList();              //세대정보(검색조건 (동)) 조회
            },

            /**
             * 공간타입별 결함공종 정보 조회
             */
            async getDefectChoise() {                
                let url = '/sendApi/api/bsCheck/spacedefect/list';
                let param = {
                    siteMstrId : this.siteMstrId,
                    spaceTypeCode : this.radioMh
                };

                try {
                    const response = await sendPostApi(url, param);
                    
                    if (response.status === 200 && response.data) {

                        let SpaceDefectIfo = response.data.dlSpaceDefect; 

                        let codeList = null;
                        let codeObj = null;                        

                        SpaceDefectIfo.forEach(item => {
                            
                            if(codeList == null){
                                //최초 등록시
                                codeList = [];
                                codeObj = new Object();

                                codeObj.mainCodeId = item.mainCodeId;
                                codeObj.midCodeId = item.midCodeId;
                                codeObj.midName = item.midName;
                                codeObj.subCodeList = [];

                                let subObj = new Object();
                                subObj.subCodeId = item.subCodeId;
                                subObj.subName = item.subName;

                                codeObj.subCodeList.push(subObj);

                                codeList.push(codeObj);

                            }else{
                                let isMidCode = false;  //세부공종 존재여부

                                codeList.forEach( miditem => {                                                                                                    
                                    // 기존 존재시
                                    if(item.mainCodeId == miditem.mainCodeId && item.midCodeId == miditem.midCodeId){
                                                                                
                                        let isSubCode = false;      // 같은 결함공종 존재여부
                                        miditem.subCodeList.some( subitem =>{
                                            if(subitem.subCodeId == item.subCodeId){
                                                isSubCode = true;
                                                return;
                                            }

                                        })

                                        // 같은 결함공종이 없을 경우
                                        if(!isSubCode){
                                            let subObj = new Object();
                                            subObj.subCodeId = item.subCodeId;
                                            subObj.subName = item.subName;

                                            miditem.subCodeList.push(subObj);
                                        }

                                        isMidCode = true;
                                    }                                                                        
                                })

                                // 기존 미존재시 
                                if(!isMidCode){
                                    
                                    codeObj = new Object();

                                    codeObj.mainCodeId = item.mainCodeId;
                                    codeObj.midCodeId = item.midCodeId;
                                    codeObj.midName = item.midName;
                                    codeObj.subCodeList = [];

                                    let subObj = new Object();
                                    subObj.subCodeId = item.subCodeId;
                                    subObj.subName = item.subName;

                                    codeObj.subCodeList.push(subObj);

                                    codeList.push(codeObj);
                                }
                            }
                            
                        })

                        this.defectData = codeList;  
                        
                    } else {
                        // console.log('협력사 공종연결등록 팝업 결함공종 리스트 조회 실패');
                    }
                } catch (error) {
                    console.error('협력사 공종연결등록 팝업 결함공종 리스트 조회 실패 :' + error)
                }
            },
            
            // 협력업체 조회 API             
            async getPartnerData() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/popup/partnerCompanySearch/list';
                let param = {
                    tradeType : 'C',                // 협력사가 시공업체인 경우
                    siteMstrId:this.siteMstrId,
                };
                if(!commonFn.methods.isEmpty(this.search.tradeNm)) {
                    param['searchValue'] = this.search.tradeNm;
                }
                try {
                    const response = await sendPostApi(url, param);
                    if (response.status === 200 && response.data) {
                           this.companyList = response.data.datas.resultList
                    } else {
                        // console.log('협력사 공종연결등록 팝업 협력업체 리스트 조회 실패');
                    }
                } catch (error) {
                    console.error('협력사 공종연결등록 팝업 협력업체 리스트 조회 실패 :' + error)
                }
            },

            // 공간유형 변경시
            changeSpaceType(e){                

                //선택된 정보 초기화
                this.selectMainCode = "";               // 공종 
                this.selectMidCode = "";                // 세부공종 
                this.selectCode = "";                   // 결함공종
                this.selectTradeId = "";                // 선택업체

                // 결함공종 선택 트리 닫기
                let liList = this.$refs.defectChoise;
                liList.forEach(item =>{
                    item.classList.remove('on');
                })
                
                //sub_1depth
                //let ptrObj = this.$refs.selectOne.querySelectorAll("#partner")      //협력업체

                if(this.radioMh === 'P') {
                    this.step3Tiltle = "Step 3. 공간선택";
                    this.getDefectChoise();                 //결함공종 리스트 재조회
                    this.initPubilcSpaceShhet();            //공간선택 sheet 초기화
                    //this.getDefectSpace();                  //선택된 공간 정보        
                    //this.getDefectPntrList();               //선택정보 조회처리
                    
                }else{
                    this.step3Tiltle = "Step 3. 동/호수 선택";                        
                    this.getDefectChoise();         //결함공종 리스트 재조회
                } 
            },

            // 결함공종 선택시
            defectClass(subCodeId,midCodeId, mainCodeId) {
                this.selectCode = subCodeId;
                this.selectMidCode = midCodeId;
                this.selectMainCode = mainCodeId;                

                if(this.radioMh === 'H') {

                    if(this.selectTradeId != null && this.selectTradeId != ""){
                        this.addrFr.forEach(floor => {
                            floor.forEach(room => {
                                if (Object.keys(room).length > 0) {
                                    room.checked            = false
                                    room.disabled           = false
                                    if(this.radioMh === 'H') {
                                        delete room.bsDefectPntrMngId
                                    }
                                }
                            })
                        })
                        this.stdHo.forEach(ho => {
                            ho.checked  = false
                            ho.disabled = false
                        })

                        this.fn_fetchDefectPntr({}, 'code')
                    }  
                } else if(this.radioMh === 'P') {
                    
                    // 공간 결함 연결 정보 가져오기
                    this.getDefectSpace();                    
                    // 협력사 결함 정보 확인
                    this.getDefectPntrList();
                }
            },
            
            //협력업체 선택시
            ptrClass(chkItem) {
                this.selectTradeId = chkItem

                if(this.radioMh === 'H') {    
                    this.fn_fetchDefectPntr({}, 'trade')    
                } else if(this.radioMh === 'P') {
                    this.getDefectPntrList()
                }
            },

            //API : 협력사 공종연결 
            async saveData() {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/bsCheck/defectPntr/write';
                
                try {
                    const response = await sendPostApi(url, this.saveDataList).then((result) => {
                        if(result.status === 200) {
                            if(this.radioMh === 'H') {
                                this.confirm('공종과 협력사가 연결되었습니다 추가 연결하시겠습니까?', this.fn_fetchDefectPntr, this.hide);
                            } else {
                                this.confirm('공종과 협력사가 연결되었습니다 추가 연결하시겠습니까?', this.getDefectPntrList, this.hide);
                            }
                            
                        } else {
                            this.alert('협력사 연결에 실패했습니다.');
                        }
                    }).catch((e) => {
                        return e.response
                    });
                } catch (error) {
                    console.error('협력사 공종연결 저장 실패 : '+error)
                }
            },

            /************************************************* 
             * 세대 정보 관련 메소드 
             *************************************************/
            
            // 동정보 sheet 초기화 및 세대정보 검색조건(동) 조회
            async getHouseInfoMySiteDongList() {
                
                const payload = {
                    siteMstrId : this.siteMstrId
                }
                
                try {
                    
                    // 현장 동 정보를 조회
                    const result = await API.houseOptn.getHouseInfoMySiteDongList(payload)
                    
                    if(result?.dlHouseDong){

                        // 동 정보 가공처리 (dongOptions 정보셋팅)
                        this.setTopFilterOption(result.dlHouseDong)
                                      
                        this.houseDongSheet.options.Events ={
                            onRenderFirstFinish: async (event) => {

                            },
                            onAfterClick: this.clickGrid,
                            //onAfterChange: this.changeGrid,               //없음
                        }
                        let options = this.houseDongSheet.options;  
                        loader.createSheet({
                            el: 'popsheetTable',
                            data: this.dongOptions,
                            options: options,
                        }).then(sheet => {                    
                            this.dongSheet = sheet;
                        })

                        if(commonFn.methods.isEmpty(this.search.standDong)) {
                            this.search.standDong = this.dongOptions[0].value       // 동검색 기본 셋팅
                            this.getHouseInfoMySiteList();                          // 세대정보 조회
                            this.getHouseOptnList();
                            
                        }
                        
                    }
                } catch (error) {
                    console.error('검색조건(동) 리스트 조회 실패 : ', error)
                }
            },

            //세대정보 검색조건(동) 세팅
            setTopFilterOption (data) {
                const allDongList = data.map(item => {
                    return {
                        label: Number(item)+'동',
                        value: item,
                    }
                })
                this.dongOptions = allDongList
            },

            //세대 정보 조회
            async getHouseInfoMySiteList() {
                let payload = {
                   siteMstrId : this.siteMstrId,
                };
                if(!commonFn.methods.isEmpty(String(this.search.standDong))) {
                    payload['standDong'] = this.search.standDong
                }
                try {
                    const result = await API.houseOptn.getHouseInfoMySiteList(payload)
                    if(result?.dlHouseDetail){
                        this.houseInfoMySiteData = result.dlHouseDetail     // 세대정보 상세정보                        
                        this.fnGetFloor();                                  // 동의 세대정보 계산
                    }
                } catch (error) {
                    console.error('세대정보 리스트 조회 실패 : ', error)
                }
            },

            //동의 세대계산
            fnGetFloor() { 
                let tmp = [];
                let frTmpMid = [];
                this.addrFr = [];
                
                this.isAllChecked = false
                this.isAllDisabled = false
                this.stdHo.forEach(item => {
                    item.checked = false
                    item.disabled = false
                })

                const maxRoomNum = _.maxBy(this.houseInfoMySiteData, o => Number(o.standHo))        // 최대 호
                const minRoomNum = _.minBy(this.houseInfoMySiteData, o => Number(o.standHo))        // 최소 호
                const maxFloor = _.maxBy(this.houseInfoMySiteData, o => Number(o.addrFloor))        // 최대 층
                const minFloor = _.minBy(this.houseInfoMySiteData, o => Number(o.addrFloor))        // 최소 층
                for(let i=minFloor; i<=maxFloor; i++) {
                    frTmpMid = this.houseInfoMySiteData.filter(item=> {
                        return Number(item.addrFloor) === Number(i) 
                    })
                    tmp.push(frTmpMid);
                }
                let refine = [];

                for(let i=Number(minFloor.addrFloor); i<Number(maxFloor.addrFloor) + 1; i++) {
                    const tempFloor = []
                    for (let l = Number(minRoomNum.standHo); l < Number(maxRoomNum.standHo) +1; l++) {
                        const temp = _.cloneDeep(this.houseInfoMySiteData.filter(room => Number(room.addrFloor) === i).find(room => Number(room.standHo) === l))
                        if (temp) {
                            temp.checked = false
                            temp.disabled = false
                        }
                        tempFloor.push(temp ? temp : {})
                    }
                    refine.push(tempFloor)
                }
                this.addrFr = refine;
            },

            // 세대설정 정보 : 층 가져오기            
            async getHouseOptnList() {
                try {
                    let url = '/sendApi/api/siteInfo/houseOptn/houseSet/list';
                    let payload = {
                        siteMstrId : this.siteMstrId
                    }
                    if(!commonFn.methods.isEmpty(String(this.search.standDong))) {
                        payload['standDong'] = this.search.standDong
                    }
                    const resultList = await sendPostApi(url, payload);
                    if (resultList.status === 200 && resultList.data) {
                        if(resultList.data?.dlHouseSet) {
                            this.houseData = resultList.data.dlHouseSet     // 세대 설정정보
                            this.fnGetHo();                                 // 동의 호정보 처리
                        } 
                    }
                } catch (error) {
                    console.error('세대설정 리스트 조회 실패 : ', error)
                }
            },

            //동의 호 계산
            fnGetHo() {
                this.stdHo = [];
                let standHo = [];
                this.houseData.forEach(item => {
                    standHo.push({
                        standHo: item.standHo,
                        checked: false,
                        disabled: false,
                    })
                })
                this.stdHo = standHo
            },

            // 세대 동선택  또는 공용 선택시
            clickGrid(event) {
                switch(event.col) {
                    case this.houseDongSheet.options.Cols[0].Name : {  //동선택시
                        if(event.row.value === 'value') {
                            return false;
                        } else {
                            this.search.standDong = event.row.value;
                            this.addrFr = [];
                            this.getHouseOptnList();
                            this.getHouseInfoMySiteList();
                            this.fn_fetchDefectPntr({}, 'code')

                        }
                        break
                    }
                    case this.InspectionBsList1.options.Cols[0].Name : {    //공용 공간 라디오버튼 선택시

                        if(commonFn.methods.isEmpty(event.row.bsSpaceMngId)) {
                            return false;
                        } else {
                            this.bsSpaceMngId = event.row.bsSpaceMngId
                        }
                        break
                    }
                }
            },

            // 세대별 결함공종과 매칭된 협력사조회
            fn_fetchDefectPntr: async function (_payload, type = 'code') {

                if(this.selectCode != null && this.selectCode != ""){
                    const url =  '/sendApi/api/bsCheck/defectPntr/list'
                    const payload = {
                        siteMstrId : this.siteMstrId,
                        mainCodeId : this.selectMainCode,
                        midCodeId : this.selectMidCode,
                        subCodeId : this.selectCode,
                        ..._payload,
                    }
                    if (type === 'trade') payload.tradeId = this.selectTradeId

                    try {
                        const response = await sendPostApi(url, payload)
                        this.defectPntrData = [];
                        if (response.status === 200 && response.data) {
                            this.defectPntrData = response.data.dlSpaceDefectCnt
                            this.fn_setAddrFr(type)
                        }
                    
                    } catch (error) {
                        console.error('세대별 결함공종과 매칭된 협력사 조회 실패 :'+error)
                    }
                }
            },

            // 세대별 협력사 매칭 체크
            fn_setAddrFr: function (type = 'code') {
                this.addrFr.forEach(floor => {
                    floor.forEach(room => {
                        if (Object.keys(room).length > 0) {
                            if (type === 'code') {
                                //if(room.linkYn === 'Y') {
                                    room.checked = false 
                                    room.disabled = false
                                //} else {
                                //    room.checked = false 
                                //    room.disabled = true
                                //}
                            }
                            if (type === 'trade' && room.checked) {
                                //if(room.linkYn === 'Y') {
                                    room.disabled = true
                                //} else {
                                //    room.checked = false 
                                //    room.disabled = true
                                //}
                            }
                            
                            const found = _.find(this.defectPntrData, {standDong: room.standDong, addrFloor: room.addrFloor, addrHo: room.addrHo})
                  
                            if (found) {
                                const clone = _.cloneDeep(found)
                                Object.keys(clone).forEach(key => {
                                    if(!clone[key]) delete clone[key]
                                })
                                Object.assign(room, clone, {
                                    checked: true,
                                    disabled: type === 'code' ? true : false
                                })                   
                            } 
                        }
                    })
                })

                if (type === 'code' && !commonFn.methods.isEmpty(this.selectTradeId)) {
                    //console.log(type)
                    this.fn_fetchDefectPntr({}, 'trade')
                }

                this.stdHo.forEach(item => {
                    let roomChecked = true
                    this.addrFr
                        .map(floor => {
                            return floor.find(room => room.standHo === item.standHo)
                        })
                        .filter(item => item != undefined)
                        .filter(item => !item.disabled)
                        .some(item => {
                            if (!item.disabled && !item.checked) {
                                roomChecked = false
                                return true
                            }
                        })
                    item.checked = roomChecked

                    let roomDisabled = true
                    this.addrFr
                        .map(floor => {
                            return floor.find(room => room.standHo === item.standHo)
                        })
                        .filter(item => item != undefined)
                        .some(item => {
                            if(!item.disabled) {
                                roomDisabled = false
                                return true
                            }
                        })
                    item.disabled = roomDisabled
                })

                let isChecked = true
                this.stdHo.some(item => {
                    if (!item.disabled && !item.checked) {
                        isChecked = false
                        return true
                    }
                })
                this.isAllChecked = isChecked  

                let isDisabled = true
                this.stdHo.some(item => {
                    if (!item.disabled) {
                        isDisabled = false
                        return true
                    }
                })
                this.isAllDisabled = isDisabled 
            },

            /*****************************************
             *공용정보 메소드 
             *****************************************/    

            // 공용 공간 시트 초기화
            initPubilcSpaceShhet(){

                this.InspectionBsList1.options.Events ={
                    onAfterClick: this.clickGrid,
                    //onAfterChange: this.changeGrid,               //없음
                }

                loader.createSheet({
                    el: 'popsheetTable1',
                    data: [],
                    options: this.InspectionBsList1.options
                }).then(sheet => {
                    this.publicSpaceSheet = sheet;
                })
            },

            // 결함공종과 매칭된 공용공간 정보 조회
            async getDefectSpace(){
                let url = '/sendApi/api/bsCheck/spacedefect/list';
 
                let param = {
                    siteMstrId : this.siteMstrId,                   // 현장정보
                    mainCodeId : this.selectMainCode,               // 공종 
                    midCodeId : this.selectMidCode,                 // 세부공종 
                    subCodeId : this.selectCode                     // 결함공종
                };

                try {
                    const response = await sendPostApi(url, param);
                    if (response.status === 200 && response.data) {
                        this.spaceCodeData = response.data.dlSpaceDefect;
                        
                        // 그리드 데이터 셋팅
                        this.publicSpaceSheet.loadSearchData({
                            data: this.spaceCodeData,
                            append: false
                        });
                                            
                    }
                } catch (error) {
                    console.error('결함공종과 매칭된 공용공간 정보 조회 조회 실패 : '+error)
                }
            },
            // 공용공간 협력사 매칭 정보
            async getDefectPntrList() {

                    this.defectPntrData = [];
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    //'API 요청 Method'
                    let url = '/sendApi/api/bsCheck/defectPntr/list';
                    let param = {
                        siteMstrId : this.siteMstrId,
                        mainCodeId : this.selectMainCode,
                        midCodeId : this.selectMidCode,
                        subCodeId : this.selectCode,
                        spaceTypeCode : 'P'
                    }    

                    try {
                        const response = await sendPostApi(url, param);
                        if (response.status === 200 && response.data) {
                            this.defectPntrDataPtype = []
                            this.defectPntrDataPtype = response.data.dlSpaceDefectCnt;
                            this.fn_Ptype();
                        }
                    } catch (error) {
                        console.error('공용공간 협력사 매칭 정보 조회 실패 :'+error)
                    }
                
            },

            /*****************************************
             * EVENT
             *****************************************/   

            /* 공통 */
            getEventTarget: function(e) {
                e = e || window.event;
                return e.target || e.srcElement; 
            },
            openEvt: function(e) {
                var target = this.getEventTarget(e);
                
                if(target.parentElement.className == "title"){
                    target.parentElement.parentElement.classList.toggle('on')
                }
            },
            hide() {
                this.$emit('fn-defect-company-write');
                this.$bvModal.hide('defectCompanyPopId');
            },
            //검색
            clickSearch(param) {
                if(param === 'Defect') {
                    this.getDefectChoise();
                } else if(param === 'Partner') {
                    this.getPartnerData();
                } else if('DongHo') {
                    this.getHouseInfoMySiteList();
                }
            },
            
            /* 세대 EVENT */

            //세대 전체 선택
            selectChkAll() {
                // headerChecked
                // console.log(this.isAllChecked)
                this.stdHo.forEach(item => {
                    if (!item.disabled) {
                        item.checked = this.isAllChecked
                    }
                })
                // inTableChecked
                this.addrFr.forEach(floor => {
                    floor.forEach(room => {
                        if (Object.keys(room).length > 0) {
                            if (!room.disabled ) {
                                room.checked = this.isAllChecked
                            }
                        }
                    })
                })
            },
            //호 전체 선택
            selectHoChk(standHo) {
                // headerColumnsChecked
                this.addrFr.forEach(floor => {
                    floor.forEach(room => {
                        if (!room.disabled &&room.standHo === standHo.standHo) room.checked = standHo.checked
                    })
                })
                // 호수 전체 체크안될 시 전체선택 해제 혹은 전체 선택시 check
                let isChecked = true
                this.stdHo.some(item => {
                    if (!item.disabled && !item.checked) {
                        isChecked = false
                        return true
                    }
                })
                this.isAllChecked = isChecked

                let isDisabled = true
                this.stdHo.some(item => {
                    if (!item.disabled) {
                        isDisabled = false
                        return true
                    }
                })
                this.isAllDisabled = isDisabled
                
            },
            //세대별 체크 박스 이벤트
            selectChk(standHo, addrHo) {
                let tmpData = [];
                tmpData = this.houseInfoMySiteData.filter(item=> {
                    return Number(item.standHo) === Number(standHo) 
                })
                let tdMaxFloor = _.maxBy(tmpData, 'addrFloor')
                let tmfr = tdMaxFloor.addrFloor
                
                let thObj = this.$refs.stdtable.querySelectorAll("#frStdHo")
                let tdObj = this.$refs.stdtable.querySelectorAll("#frStdDongHo")

                let cnt = 0;
                let disCnt = 0;
                tdObj.forEach(item => {
                    if(item.dataset.addrho === addrHo) {            
                        if(item.checked) {
                            item.checked = true;
                        } else {
                            item.checked = false;
                            this.$refs.AllChk.checked = false;
                        }
                    }
                    if(item.dataset.standho === standHo) {
                        if(item.checked) {
                            cnt++
                        }
                    }
                    if(Number(tmfr) === cnt) {
                        this.$refs.AllChk.checked = true;
                        thObj.forEach(item => {
                            if(item.dataset.standho === standHo){
                                item.checked = true;
                                //item.disabled = true;
                            }
                        })
                    } else {
                        thObj.forEach(item => {
                            if(item.dataset.standho === standHo){
                                item.checked = false;
                                this.$refs.AllChk.checked = false;
                            }
                        })
                    }
                }) 
            },
            // 세대 추가 
            fn_click: function (payload) {

                let roomChecked = true
                this.addrFr
                    .map(floor => {
                        return floor.find(room => room.standHo === payload.standHo)
                    })
                    .filter(item => item != undefined)
                    .filter(item => !item.disabled)
                    .some(item => {
                        if (!item.checked) {
                            roomChecked = false
                            return true
                        }
                    })
                this.stdHo.find(item => item.standHo === payload.standHo).checked = roomChecked

                let isChecked = true
                this.stdHo.some(item => {
                    if (!item.disabled && !item.checked) {
                        isChecked = false
                        return true
                    }
                })
                this.isAllChecked = isChecked               

            },

            /* 공용 EVENT */
            
            fn_Ptype() {
                let sheet = this.publicSpaceSheet

                // console.log("@@@@@ defectPntrDataPtype : %o",this.defectPntrDataPtype);
                //매칭된 공용공간 협력사 정보가 있으면
                if(this.defectPntrDataPtype.length > 0) {
                    sheet.getDataRows().forEach(row => {
                        let tmp = _.find(this.defectPntrDataPtype, {bsSpaceMngId: row.bsSpaceMngId})    //공간의 ID 가 같은거만 찾아옴
                        if(tmp) {
                            // 매칭된 협력사가 자사인 경우
                            if(tmp.tradeId === this.selectTradeId){
                                sheet.setCheck({row: row, col: 'chk', val : true})
                                sheet.setAttribute({row: row, col: 'chk', attr : 'CanEdit', val : true, render : 1}) 
                                sheet.setAttribute({row: row, attr: 'Color', val: ''})
                                sheet.setAttribute({row : row, col:'chkValue', val: 'N'})
                                sheet.setAttribute({row : row, col:'disValue', val: 'N'})
                                if(tmp.bsDefectPntrMngId) {
                                     sheet.setAttribute({row : row, col:'bsDefectPntrMngId', val: tmp.bsDefectPntrMngId})
                                 }
                            } else {
                                // 매칭된 협력사가 타사인 경우
                                sheet.setCheck({row: row, col: 'chk', val : true})
                                sheet.setAttribute({row: row, col: 'chk', attr : 'CanEdit', val : false, render : 1}) 
                                sheet.setAttribute({row: row, col: 'bsSpaceMngName', attr : 'CanEdit', val : false, render : 1}) 
                                sheet.setAttribute({row: row, attr: 'Color', val: '#f96f6f'})
                                sheet.setAttribute({row : row, col:'chkValue', val: 'Y'})
                                sheet.setAttribute({row : row, col:'disValue', val: 'Y'})
                                 if(tmp.bsDefectPntrMngId) {
                                     sheet.setAttribute({row : row, col:'bsDefectPntrMngId', val: tmp.bsDefectPntrMngId})
                                 }
                            }
                        }else{
                            sheet.setAttribute({row : row, col:'bsDefectPntrMngId', val: ""})
                        } 
                    }) 
                } 
            },

            //save 연결 val check
            saveCheck (item) {
                
                if(commonFn.methods.isEmpty(this.selectCode)) {
                    this.alert('결함공종을 선택해주세요.');
                    return
                    }
                if(commonFn.methods.isEmpty(this.selectTradeId)) {
                    this.alert('협력업체를 선택해주세요.');
                    return
                }
                let defectObj = this.$refs.selectOne.querySelectorAll("#defect")    //결함공종
                let ptrObj = this.$refs.selectOne.querySelectorAll("#partner")      //협력업체
                
                let selectMainCodeId = '';
                let selectMidCodeId = '';
                let selectSubCodeId = '';
                this.saveDataList = [];

                defectObj.forEach(item => {
                    if(item.dataset.subcodeid === this.selectCode){
                        selectMainCodeId = item.dataset.maincodeid
                        selectMidCodeId = item.dataset.midcodeid
                        selectSubCodeId = item.dataset.subcodeid
                    }
                })
                
                // console.log("@@@@ defectObj : %o",defectObj);

                let selecTradeId = '';
                ptrObj.forEach(item => {
                    if(item.dataset.tradeid === this.selectTradeId){
                        selecTradeId = this.selectTradeId
                    }
                })


                if(this.radioMh === 'H') {
                    item.forEach(inItem => {
                        inItem.forEach(innerItem => {
                            //console.log(innerItem.bsDefectPntrMngId)
                            if(innerItem.checked && !innerItem.disabled && commonFn.methods.isEmpty(innerItem.bsDefectPntrMngId)) {
                                let selectData = {
                                    status : "Added",
                                    siteMstrId : this.siteMstrId,
                                    mainCodeId : selectMainCodeId,
                                    midCodeId : selectMidCodeId,
                                    subCodeId : selectSubCodeId,
                                    tradeId : selecTradeId,
                                    standDong : innerItem.standDong,
                                    addrHo : innerItem.addrHo,
                                    addrFloor : innerItem.addrFloor,
                                    spaceTypeCode : this.radioMh,
                                    inUser : this.userId,
                                }
                                this.saveDataList.push(selectData)
                            } else if(!innerItem.checked && !innerItem.disabled && !commonFn.methods.isEmpty(innerItem.bsDefectPntrMngId)) {
                                //console.log(innerItem.chk + '/' + innerItem.bsDefectPntrMngId)
                                let selectData = {
                                    status : "Deleted",
                                    siteMstrId : this.siteMstrId,
                                    mainCodeId : selectMainCodeId,
                                    midCodeId : selectMidCodeId,
                                    subCodeId : selectSubCodeId,
                                    tradeId : selecTradeId,
                                    standDong : innerItem.standDong,
                                    addrHo : innerItem.addrHo,
                                    addrFloor : innerItem.addrFloor,
                                    spaceTypeCode : this.radioMh,
                                    bsDefectPntrMngId : innerItem.bsDefectPntrMngId,
                                    inUser : this.userId,
                                }
                                this.saveDataList.push(selectData)
                            } else {
                                return;
                            }
                            
                        })
                    })
                } else if(this.radioMh === 'P') {
                    
                    if(commonFn.methods.isEmpty(this.bsSpaceMngId)) {
                        this.alert('공간을 선택해주세요.');
                        return
                    }

                    let sheet = this.publicSpaceSheet;
                    let checkedRows = [];

                    checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);

                    // console.log("@@@@ checkedRows : %o",checkedRows);

                    checkedRows.forEach(row => {
                        // console.log("@@@ row.Color : %o",row.Color);
                        // console.log("@@@ row.bsDefectPntrMngId : %o",row.bsDefectPntrMngId);
                        // console.log("@@@ isEmpty bsDefectPntrMngId : %o",commonFn.methods.isEmpty(row.bsDefectPntrMngId));
                        //if(commonFn.methods.isEmpty(row.bsDefectPntrMngId)) {
                        if((row.Color == null || row.Color == undefined ||row.Color == "") && commonFn.methods.isEmpty(row.bsDefectPntrMngId)){
                            let selectData = {
                                status : "Added",
                                siteMstrId : this.siteMstrId,
                                mainCodeId : selectMainCodeId,
                                midCodeId : selectMidCodeId,
                                subCodeId : selectSubCodeId,
                                tradeId : selecTradeId,
                                bsSpaceMngId : row.bsSpaceMngId,
                                spaceTypeCode : this.radioMh,
                                inUser : this.userId,
                            }
                            this.saveDataList.push(selectData)
                        }
                    })
                    sheet.getDataRows().forEach(row => {
                        //console.log(row.chk + '/' + row.bsDefectPntrMngId)
                        //if(!commonFn.methods.isEmpty(row.bsDefectPntrMngId) && row.chkValue === 'N' && row.disValue === 'N' && row.chk === 0) {
                        if((row.Color == null || row.Color == undefined ||row.Color == "") && row.chkValue === 'N' && row.disValue === 'N' && row.chk === 0) {   
                            let selectData = {
                                status : "Deleted",
                                siteMstrId : this.siteMstrId,
                                mainCodeId : selectMainCodeId,
                                midCodeId : selectMidCodeId,
                                subCodeId : selectSubCodeId,
                                tradeId : selecTradeId,
                                bsSpaceMngId : row.bsSpaceMngId,
                                spaceTypeCode : this.radioMh,
                                inUser : this.userId,
                                bsDefectPntrMngId: row.bsDefectPntrMngId,
                            }
                            this.saveDataList.push(selectData)
                            row.bsDefectPntrMngId = "";
                        }
                    })
                }
                //console.log(this.saveDataList)
                //연결 진행
                if(this.saveDataList.length !== 0) {                    
                    this.confirm('연결하시겠습니까?', this.saveData);
                } else {
                    this.alert('연결할 데이터가 없습니다.')
                }
            },
        }
    }
</script>