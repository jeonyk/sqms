<template>
    <!-- 공장검사 신규 등록 팝업 -->
    <b-modal :id="refId" title="공장검사 신규 등록" hide-footer v-on:shown="showThenReset"
        size="xxl" scrollable
        :footer-bg-variant="footerBg">
        <template #default>
            <div class="pop_container" style="margin: 0; padding: 0;">
                <div class="tab_contents">
                    <div class="tab_area" :class="{ 'submenu_on': popcurrentTabRound === 0 }">
                        <div class="lookup_box multi_line">
                            <div class="lst_tabs_round">
                                <ul class="">
                                    <li v-for="(tab, index) in tabsRound" v-bind:class="{active:popcurrentTabRound===index}" :key="index"><a href="javascript:void(0);" v-on:click="popcurrentTabRound=index">{{tab}}</a></li>
                                </ul>
                            </div>
                            <table v-show="popcurrentTabRound == 0">
                                <colgroup>
                                    <col width="6%">
                                    <col width="12%">
                                    <col width="5%">
                                    <col width="12%">
                                    <col width="4%">
                                    <col width="12%">
                                    <col width="5%">
                                    <col width="12%">
                                    <col width="5%">
                                    <col width="12%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th><span class="emp_red">검사 예정일</span></th>
                                        <td>
                                            <!-- <input type="text" class="form_control datepicker" placeholder="YYYY-MM-DD"> -->
                                            <!-- <Datepicker ref="datapicker" v-on:value-change="dateChange" /> -->
                                            <DatePicker v-model="ftryExDt" :format="'YYYY-MM-DD'"/>
                                        </td>
                                        <th>세부공종</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subMidName" :maxlength="100" @keyup.enter="refreshWritePop">
                                        </td>
                                        <th>품명</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subPrdt" :maxlength="100" @keyup.enter="refreshWritePop">
                                        </td>
                                        <!-- <th>규격</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subStnd">
                                        </td> -->
                                        <th>공급업체</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subSppr" :maxlength="100" @keyup.enter="refreshWritePop">
                                        </td>
                                        <th>제조업체</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subMnft" :maxlength="100" @keyup.enter="refreshWritePop">
                                        </td>
                                        <td class="ar">
                                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="refreshWritePop">검색</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table v-show="popcurrentTabRound == 1">
                                <colgroup>
                                    <col width="6%">
                                    <col width="12%">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th><span class="emp_red">검사 예정일</span></th>
                                        <td>
                                            <!-- <input type="text" class="form_control datepicker" placeholder="YYYY-MM-DD"> -->
                                            <!-- <Datepicker ref="datepickerPreRegister" @value-change="dateChange"/> -->
                                            <DatePicker v-model="ftryExDt" :format="'YYYY-MM-DD'"/>
                                        </td>
                                        <!-- <td class="ar">
                                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search">검색</button>
                                        </td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <tree-category-tab
                            v-show="popcurrentTabRound === 0"
                            :category-data="categoryData"
                            :use-check-box="false"
                            @changed-checked-list="changedTabCheckedList"
                        />
                        <div class="right_content">
                            <div class="tab_area_round" v-show="popcurrentTabRound == 0">
                                <div class="inner">
                                    <span>※ 체크리스트 미등록 자재는 등록하실 수 없습니다.</span>
                                    <!-- ibsheet -->
                                    <div class="ib_wrap">
                                        <div id="etcPopsheetTable" class="ibsheet_table"></div>
                                    </div>
                                </div>
                                </div>

                            <div class="tab_area_round" v-show="popcurrentTabRound == 1">
                                <div class="inner">
                                    <div class="lst_data mt0">
                                        <div class="data_tit"><span class="emp_red">1. 자재 정보</span></div>
                                        <div class="table_normal_list table_write align_center">
                                            <table>
                                                <caption class="sr_only"></caption>
                                                <colgroup>
                                                    <col width="7%">
                                                    <col width="15%">
                                                    <col width="15%">
                                                    <col width="15%">
                                                    <col width="22%">
                                                    <col width="*">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>공종</th>
                                                        <th>세부공종</th>
                                                        <th><span class="emp_red">품명</span></th>
                                                        <th><span class="emp_red">공급업체</span></th>
                                                        <th>제조업체</th>
                                                        <th>비고</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{{materialInfo.prdt.current.mainName}}</td>
                                                        <td>{{materialInfo.prdt.current.midName}}</td>
                                                        <td>
                                                            <select 
                                                                v-model="materialInfo.prdt.current" 
                                                                class="form_control"
                                                                @click="fn_clickPrdtNm"
                                                            >
                                                                <!-- @change="changeProduct" -->
                                                                <!-- <option value="">전체</option> -->
                                                                <option :value="{}" disabled hidden>선택해주세요</option>
                                                                <option
                                                                    v-for="item in materialInfo.prdt.list"
                                                                    :key="item.mtrlPrjtDtlId"
                                                                    :value="item"
                                                                >
                                                                    {{ item.prdtNm }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <div class="search_area">
                                                                <input 
                                                                    v-model="materialInfo.spprNm"
                                                                    type="text" 
                                                                    class="form_control" 
                                                                    placeholder="검색"
                                                                    disabled
                                                                >
                                                                <button type="button" class="btn_search" v-b-modal="'ftry_supplySelect'">검색</button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input v-model="materialInfo.mnft" type="text" class="form_control" placeholder="입력해주세요" :maxlength="100">
                                                        </td>
                                                        <td>
                                                            <input v-model="materialInfo.comment" type="text" class="form_control" placeholder="입력해주세요" :maxlength="100">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        <div class="data_tit">2. 주소</div>
                                        <textarea class="form_control textarea" placeholder="공급업체 주소를 입력해주세요." :maxlength="100" :value="addr" @keyup="fn_inputCheck"></textarea>
                                        <p class="table_message ar mt0">{{ addr == null?0:addr.length }} / {{ 100 }}</p>

                                        <div class="data_tit">3. 인증여부</div>
                                        <div class="line_box">
                                            <div class="multi_form">
                                                <label class="input_radio" for="ksCtfc_ks">
                                                    <input 
                                                        type="radio"
                                                        id="ksCtfc_ks"
                                                        v-model="ksCtfc.isCertified" 
                                                        :value="true"
                                                    >
                                                    <span class="label_text">KS</span>
                                                </label>
                                                <input 
                                                    v-model="ksCtfc.number"
                                                    type="text" 
                                                    class="form_control" 
                                                    placeholder="인증번호/규격번호"
                                                    maxlength="50"
                                                    :disabled="!ksCtfc.isCertified"
                                                >
                                            </div>
                                            <label class="input_radio" for="ksCtfc_nks">
                                                <input 
                                                    type="radio" 
                                                    v-model="ksCtfc.isCertified" 
                                                    id="ksCtfc_nks"
                                                    :value="false"
                                                    @change="ksCtfc.number = ''"
                                                >
                                                <span class="label_text">비 KS</span>
                                            </label>
                                        </div>
                                        <div class="line_box check_area">
                                            <label class="input_check">
                                                <input v-model="ksCtfc.evntSignYn" type="checkbox" >
                                                <span class="label_text">환경표지</span>
                                            </label>
                                            <label class="input_check">
                                                <input v-model="ksCtfc.grCtfcYn" type="checkbox" >
                                                <span class="label_text">GR인증</span>
                                            </label>
                                            <label class="input_check">
                                                <input v-model="ksCtfc.hbCtfcYn" type="checkbox" >
                                                <span class="label_text">HB인증</span>
                                            </label>
                                            <label class="input_check">
                                                <input v-model="ksCtfc.etcCtfcYn" type="checkbox" >
                                                <span class="label_text">기타</span>
                                            </label>
                                        </div>

                                        <div class="data_tit"><span class="emp_red">4. 품명/ 규격/ 설계량</span>
                                            <div class="fr">
                                                <button
                                                    type="button"
                                                    class="btn btn_sm btn_darkgray"
                                                    @click="clickCopyRows()"
                                                >
                                                    행 복사
                                                </button>

                                                <div 
                                                    class="btn_number"
                                                >
                                                    <select
                                                        v-model="detailInfo.addCount"
                                                        class="form_control num"
                                                    >
                                                        <option
                                                            v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                                            :key="count"
                                                            :value="count"
                                                        >
                                                            {{ String(count).padStart(3, '0') }}
                                                        </option>    
                                                    </select>
                                                    <button
                                                        type="button"
                                                        class="btn btn_sm"
                                                        @click="clickAddRows()"
                                                    >
                                                        행 추가
                                                    </button>
                                                </div>

                                                <button 
                                                    type="button" 
                                                    class="btn btn_sm btn_darkgray"
                                                    @click="clickDeleteRow()"
                                                >
                                                    행 삭제
                                                </button>
                                            </div>
                                        
                                        </div>
                                        <!-- ibsheet -->
                                        <div class="ib_wrap">
                                            <div id="rmcPopsheetTable2" class="ibsheet_table"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button_box ac mt0 mb20">
                                <button type="button" class="btn btn_lg btn_outline btn_darkgray" @click="insertCheck" :disabled="popcurrentTabRound === 0 ? false : !hasChecklist">등록</button>
                                <button type="button" class="btn btn_lg btn_outline btn_gray"  @click="closeWritePop">닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId" v-bind:btn-name="{first : '확인'}"
                    v-on:first-btn-fn="closePop"
                />
                <supply-select
                    :ref-id="'ftry_supplySelect'"
                    @fn-supply-choice="selectSupplyOperation" site-mstr-id="siteMstrId"
                />
                <b-modal
                    :id="`${popId}_simpleAlert`"
                    title="알림"
                    hide-backdrop
                    size="sm"
                    footer-bg-variant="transparents"
                    @shown="$refs.alertConfirm.focus()"
                    @hidden="fn_closeModal"
                >
                    <!-- @close="fn_closeModal" -->
                    <template #default>
                        <div class="pop_container">
                            <div class="message_table">
                                <p class="msg">
                                    {{ popMsg }}
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #modal-footer>
                        <b-button
                            ref="alertConfirm"
                            class="btn btn_lg btn_outline btn_blue"
                            @click="$bvModal.hide(`${popId}_simpleAlert`)"
                            @keyup.enter="$bvModal.hide(`${popId}_simpleAlert`)"
                            @keyup.space="$bvModal.hide(`${popId}_simpleAlert`)"
                        >
                            {{ '확인' }}
                        </b-button>
                    </template>
                </b-modal>


            </div>
        </template>

        <!-- <template #modal-footer>
            <div class="button_box ac mt0 mb20">
                <button type="button" class="btn btn_lg btn_outline btn_darkgray" @click="insertCheck" :disabled="popcurrentTabRound === 0 ? false : !hasChecklist">등록</button>
                <button type="button" class="btn btn_lg btn_outline btn_gray"  @click="closeWritePop">닫기</button>
            </div>
        </template> -->
    </b-modal>
</template>
<script>
// import {sendPostApi, requestOptions }  from '../../../apis/common';
import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
import API from '@/apis/'
// import Datepicker from '@/pages/common/popup/Datepicker.vue'
import PopAlert from '@/pages/common/popup/PopAlert.vue' 
import { CompanySelect, FactoryWrite } from '../../common/data/PopupList'
import loader from '@ibsheet/loader'
import SupplySelect from '@/pages/common/popup/SupplySelect'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import DatePicker from '@component/common/DatePicker.vue'

import axios from 'axios'

import _ from 'lodash'

let factSheet = '';

export default {
    name:'NewFactoryTestPop',
    mixins: [MsgBoxMixins],
    components:{
        PopAlert,
        // Datepicker,
        TreeCategoryTab,
        SupplySelect,
        DatePicker,
    },
    data(){
        return {
            footerBg: 'transparent',
            popcurrentTab: 0, // 기본 current 값 지정 
            tabs2: ['갑지(레미콘/아스콘 外)', '갑지(레미콘/아스콘)', '을지(공통)'], // tab name
            tabsRound: ['일반등록', '레미콘 사전등록'], // tab name
            popcurrentTabRound: 0, // 기본 current 값 지정

            mounted: false,

            //tree tab menu[S]
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
            
            popMsg:'',                                      //알림창 메세지
            confirmUse:'',                                  //알림창 버튼개수
            popId:'factPopAlert',                           //알림창 Id
            siteMstrId:'',                                  //현장정보Id
            
            ftryExDt:'',                //검사예정일
            subSppr:'',                 //팝업용 공급업체 id
            // subStnd:'',                 //팝업용 규격
            subMnft:'',                 //팝업용 제조업체
            subPrdt:'',                 //팝업용 품명
            subMidName:'',              //팝업용 세부공종
            mainCodeId:'',              //공종 Id
            midCodeId:'',               //세부공종 Id

            selectedAccpId: [],         //체크된 자재공급원승인 id
            selectedCodeId:[],
            // selectedAccpSubId: [],      //체크된 정보
            frtyInsertCheck: false,     //리스트 내 검사결과

            insertClose: false,         //닫는건지 확인
            selectedId: '',             //선택된 등록복사용 id 

            hasChecklist : false,
            // 레미콘 아스콘 등록 메뉴
            orderType: {
                list: [
                    {
                        id: 'HEC',
                        value: '당사지급'
                    },
                    {
                        id: 'ORDR',
                        value: '발주자'
                    },
                    {
                        id: 'PTNR',
                        value: '협력자'
                    },

                ],
                current: 'HEC'
            },
            docSeq: null,
            mresDocSeq: '',
            materialInfo: {
                mainCode: null,
                mainCodeId: null,
                midCode: null,
                midCodeId: null,
                prdtNm: null,
                spprNm: null,
                mnft: null,
                comment: null,

                newPrdtYn: 'N',
                mtrlPrjtDtlId: null,
                prdt: {
                    list: [],
                    current: {}
                }
            },
            addr: null,
            ksCtfc: {
                isCertified: true,
                number: '',
                evntSignYn: false,
                grCtfcYn: false,
                hbCtfcYn: false,
                etcCtfcYn: false

            },
            detailInfo: {
                sheet: null,
                data: [],
                options: {},
                addCount: 1,
            },
            showYn:false,
        }
    },
    props:{
        detailObj:{
            type: Array,
            default: () => []
        },
        aprvType:{
            type:String,
            default:'',
        },
        refId:{
            type:String,
            default:'NewFactoryTestPop',
        }
    },
    async mounted(){
        //tree tab menu[S]
        await this.getCategoryData();

        // await this.getProductData();
        
        this.mounted = true;
        //tree tab menu[E]
        
    },
    async created(){
        // await this.getProductData();
    },
    beforeDestroy() {
        // loader.removeSheet(factSheet);
        if(this.detailInfo.sheet) this.detailInfo.sheet.dispose()
    },
    watch: {
        "search.tab.data": {
            handler () {
                // //console.log('search.tab.data changed')

                if (this.mounted) {
                    //console.log(this.search.tab.data)
                    // this.getGridData({
                    //     productName: '',
                    //     mainNameId: this.search.tab.data.mainNameId,
                    //     midNameId: this.search.tab.data.midNameId,
                    // })
                    this.mainCodeId = this.search.tab.data.mainCodeId;
                    this.midCodeId = this.search.tab.data.midCodeId;
                    this.subMidName = this.search.tab.data.midName;
                    this.refreshWritePop();
                }
            },
            deep: true
        },
        popcurrentTabRound: function(){
            
            this.dataReset();
            this.refreshWritePop();

        },
        "materialInfo.prdt.current": {
            handler () {
                if (this.mounted) {
                    this.setProductName()
                }
            },
            deep: true
        },
    },
    methods:{
        showThenReset(){
            this.showYn = true;
            this.dataReset();
            this.refreshWritePop();
            
            this.getProductData()
            this.fn_initRemicons()
        },
        async getCategoryData () {
            const response = await API.material.getCategoryData();
            // //console.log(response)
            if (response.status === 200 && response.data) {
                // temporary
                this.categoryData = response.data.list
                
            }
        },
        changedTabCheckedList (item) {
            this.search.tab.data = item
            // event
        },
        refreshWritePop: async function(){//자재공급원승인 가져오기
            this.siteMstrId = this.$cookies.get("siteMstrId");
            this.selectedAccpId=[];   //선택리스트 초기화
            this.selectedCodeId = [];
            let chkCnt = 0;
            //console.log(this.ftryExDt);
            if(this.ftryExDt == '' ){
                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth() +1;
                let date = today.getDate();
                let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);
                this.ftryExDt = dateFormat;
            }
            // this.$refs.datapicker.valueChange(this.ftryExDt);
            // this.$refs.datepickerPreRegister.valueChange(this.ftryExDt);
            if(this.popcurrentTabRound == 0){
                let param = {
                    "siteMstrId": this.siteMstrId,
                    "status" :'APRV',       //진행상태: 승인
                    "chkType": 'FTRY'       //공장검사
                };
                if(this.subSppr != ''){
                    param['sppr'] = this.subSppr;
                }
                // if(this.subStnd != ''){
                //     param['stnd'] = this.subStnd;
                // }
                if(this.subMnft != ''){
                    param['mnft'] = this.subMnft;
                }
                if(this.subPrdt != ''){
                    param['prdtNm'] = this.subPrdt;
                }
                if(this.midCodeId != '' ){
                    param['midCodeId'] = this.midCodeId;
                }
                if(this.mainCodeId != '' ){
                    param['mainCodeId'] = this.mainCodeId;
                }
                if(this.subMidName != ''){
                    param['midName'] = this.subMidName;
                }
                //console.log(param);

                const rst = await API.material.getSourceApprovalList(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });

                // //console.log(rst);

                let options = FactoryWrite.options;
                options.Events = {
                    onAfterClick: this.fn_click,
                    //ondblclick : this.fn_company_choice
                };
                let data = [];
                let scroll = 1;

                if(typeof(rst.data.data) != 'undefined' && rst.data.data.length != 0){
                    // this.subRst = rst;
                    // dataMerge = 0;
                    let array = rst.data.data;
                    // let mtrlSpApprSubIds  = [];
                    let beforeId = '';
                    if(array.length<10){
                        scroll = 1;
                        // document.getElementById('multiEmpTable2').parentElement.style.height = "";
                    }else{
                        scroll = 0;
                        // document.getElementById('multiEmpTable2').parentElement.style.height = "337px";
                    }
                    for(let  a = 0; a<array.length; a++){
                        if(array[a].mtrlSpApprId != beforeId){
                            beforeId = array[a].mtrlSpApprId;
                            array[a].cnt=(array[a].cnt>0?true:false);
                            array[a].ksCtfcYn=array[a].ksCtfcYn==='N'?'0':'1';
                            if(Object.keys(this.detailObj).length !== 0){
                                if(array[a].mtrlSpApprId == this.detailObj[0].mtrlSpApprId && this.detailObj.clickYn){
                                    this.selectedAccpId[0] = array[a].mtrlSpApprId;
                                    this.selectedCodeId[0] = {
                                        'mainCodeId':array[a].mainCodeId,
                                        'midCodeId':array[a].midCodeId,
                                        // 'rmcYn':(array[a].mtrlPrjtDtlId.toString()=='320'||array[a].mtrlPrjtDtlId.toString()=='370'?'Y':'N'),
                                        rmcYn: ['R', 'A'].includes(array[a].raFlag) ? 'Y' : 'N',
                                    };
                                    // mtrlSpApprSubIds.push(array[a].mtrlSpApprSubId);
                                    // this.selectedAccpSubId[0] = mtrlSpApprSubIds;
                                    // if(array[a].mtrlSpApprSubId == this.detailObj[0].mtrlSpApprSubId ){
                                        //console.log('true');
                                        array[a]['selectYnType'] = 'Bool';//타입은 체크박스로
                                        array[a]['selectYn'] = 1;
                                        chkCnt++;
                                        // this.rowIndex = a;//몇번째에 포커스해야하는지 저장
                                    // }
                                }
                            }
                            if(array[a].cnt == 0){//체크리스트 없을시
                                array[a]['selectYnType'] = 'Text';//타입은 텍스트로
                                array[a]['selectYn']='';//빈칸표시
                                array[a]['selectYnCanEdit']=0;//수정불가
                            }else{
                                array[a]['selectYnType'] = 'Bool';//타입은 체크박스로
                            }
                            data.push(array[a]);                    
                        }
                    }
                }else{
                    data = [];
                    scroll= 1;
                }
                options.Cfg['NoVScroll']=scroll;

                loader.createSheet({
                    el: 'etcPopsheetTable',
                        data: [],
                        options:options,
                }).then((sheet) => {
                    // factSheet = sheet.id;
                    // sheet.doSort("mtrlSpApprId");
                    sheet.loadSearchData({
                        data: data,
                        append: false
                    })
                    sheet.bind("onRenderFinish",function(evt){
                        evt.sheet.hideCol('mtrlSpApprId');
                        evt.sheet.blur(0);
                    })
                });
                if(this.showYn && chkCnt==0 && Object.keys(this.detailObj).length !== 0){
                    this.alert(`레미콘 사전등록으로 등록되고 \n 공급원 승인이 되지 않았다면 \n 등록 복사가 되지 않습니다.`,()=>{
                        this.showYn = false;
                    });
                }
                this.heightChange(scroll,'etcPopsheetTable');
            }else{
                //래미콘 사전등록
                // let data2 = CompanySelect.data;
                this.detailInfo.options = CompanySelect.options;

                this.detailInfo.options.Events = {
                    onEndEdit: (event) => {
                        switch(event.col) {
                            case 'stnd': {
                                // if (this.remicons.)
                                    if(!(event.val?.length === 7)) {
                                        // const evt = event
                                        this.alert('콘크리트 배합규격을 7자리 숫자로 입력해주세요')
                                        return ''
                                    }
                                break
                            }
                        }
                    },
                    onBlur: (event) => {
                        //console.log('onBlur: %o', event)
                    },
                    onAfterChange:this.fnIsCopy,
                }

                loader.createSheet({
                    el: 'rmcPopsheetTable2',    
                    data: [{}],
                    options: this.detailInfo.options,
                }).then((sheet) => {
                    // listSheet = sheet.id
                    this.detailInfo.sheet = sheet
                    
                });
            }
        },
        fn_click: function(evtParams){//셀 클릭할때마다
            //console.log(evtParams.row);
            if(evtParams.sheet.getFocusedCol() == 'selectYn'){
                if(evtParams.row.Kind == 'Header'){
                    if(evtParams.row.selectYnChecked == '1'){//모두체크시
                        const allRow = evtParams.sheet.getDataRows();//모든열 가져오기
                        for(let x = 0; x<allRow.length; x++){
                            if(allRow[x].cnt== true && !this.selectedAccpId.includes(allRow[x].mtrlSpApprId)){
                                //mtrlSpApprSubId 구하기
                                // let start = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(allRow[x],'mtrlSpApprId')[0]);
                                // let end = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(allRow[x],'mtrlSpApprId')[2]);
                                // let mtrlSpApprSubIds  = [];
                                // for(start;start<=end;start++){
                                //     mtrlSpApprSubIds.push(evtParams.sheet.getRowByIndex(start).mtrlSpApprSubId);
                                // }
                                // this.selectedAccpSubId.push(mtrlSpApprSubIds);
                                this.selectedAccpId.push(allRow[x].mtrlSpApprId);
                                this.selectedCodeId.push({
                                    'mainCodeId':allRow[x].mainCodeId,
                                    'midCodeId':allRow[x].midCodeId,
                                    // 'rmcYn':(allRow[x].mtrlPrjtDtlId.toString()=='320'||allRow[x].mtrlPrjtDtlId.toString()=='370'?'Y':'N'),
                                    rmcYn: ['R', 'A'].includes(allRow[x].raFlag) ? 'Y' : 'N',
                                });
                            }
                        }
                    }else if(evtParams.row.selectYnChecked == '0'){//체크해제시
                        // this.selectedAccpSubId = [];//초기화
                        this.selectedAccpId = [];//초기화
                        this.selectedCodeId = [];
                    }
                    //console.log(this.selectedAccpId);
                }else{
                    if(evtParams.row.selectYn == 1 && !this.selectedAccpId.includes(evtParams.row.mtrlSpApprId)){
                        
                        //mtrlSpApprSubId 구하기
                        // let start = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(evtParams.row,'mtrlSpApprId')[0]);
                        // let end = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(evtParams.row,'mtrlSpApprId')[2]);
                        // let mtrlSpApprSubIds  = [];
                        // for(start;start<=end;start++){
                        //     mtrlSpApprSubIds.push(evtParams.sheet.getRowByIndex(start).mtrlSpApprSubId);
                        // }
                        // this.selectedAccpSubId.push(mtrlSpApprSubIds);
                        this.selectedAccpId.push(evtParams.row.mtrlSpApprId);
                        this.selectedCodeId.push({
                            'mainCodeId':evtParams.row.mainCodeId,
                            'midCodeId':evtParams.row.midCodeId,
                            // 'rmcYn':(evtParams.row.mtrlPrjtDtlId.toString()=='320'||evtParams.row.mtrlPrjtDtlId.toString()=='370'?'Y':'N'),
                            rmcYn: ['R', 'A'].includes(evtParams.row.raFlag) ? 'Y' : 'N',
                        });

                        //console.log(this.selectedAccpId);
                        // //console.log(this.selectedAccpSubId);
                    }else if(evtParams.row.selectYn != 1 && this.selectedAccpId.includes(evtParams.row.mtrlSpApprId)){
                        // let start = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(evtParams.row,'mtrlSpApprId')[0]);
                        // let end = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(evtParams.row,'mtrlSpApprId')[2]);
                        // let cnt = false;
                        // for(start;start<=end;start++){
                        //     if(evtParams.sheet.getRowByIndex(start).selectYn == 1){
                        //         cnt = true;
                        //     }
                        // }
                        // if(!cnt){
                            let index = this.selectedAccpId.indexOf(evtParams.row.mtrlSpApprId);//자재공급원 승인 id
                            this.selectedAccpId.splice(index,1);
                            this.selectedCodeId.splice(index,1);
                            // this.selectedAccpSubId.splice(index,1);
                        // }
                        //console.log(this.selectedAccpId);
                        // //console.log(this.selectedAccpSubId);
                    }
                }
            }
        },
        dateChange : async function(param) { //date-picker value change event
            this.ftryExDt = param;
        },
        dataReset : function(){
            this.selectedAccpId=[];   //선택리스트 초기화
            this.selectedCodeId=[];
            // this.selectedAccpSubId = [];
            this.ftryExDt = '';
            this.subSppr='';
            this.subStnd='';
            this.subMnft='';
            this.subPrdt='';
            this.subMidName='';
            this.midCodeId='';
            this.mainCodeId='';
            // loader.removeSheet(factSheet);
            if (this.popcurrentTabRound === 1) {
                if(this.detailInfo.sheet) this.detailInfo.sheet.dispose()
            }

        },
        insertCheck: function(){
            // console.log(this.popcurrentTabRound);
            if (this.popcurrentTabRound === 0) {
                this.frtyInsertCheck = false;
                this.popMsg = '';
                //console.log(this.ftryExDt);
                if(this.selectedAccpId.length == 0 ||typeof(this.selectedAccpId)!='object'){
                    //console.log('here');
                    this.popMsg = '자재를 선택해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'factPopAlert');
                    this.alert('자재를 선택해주세요.');
                    return;
                }
                if(this.ftryExDt == ''|| typeof(this.ftryExDt) == 'undefined' || this.ftryExDt == null){
                    this.popMsg = '검사예정일을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'factPopAlert');
                    this.alert('검사예정일을 입력해주세요.');
                    return;
                }
                if(this.popMsg == ''){
                    // this.frtyInsertCheck = true;
                    this.confirm('등록하시겠습니까?',this.insertList);
                    // this.insertList();
                }
            } else if (this.popcurrentTabRound === 1) {
                // validate
                let validate = false

                if(this.ftryExDt == ''|| typeof(this.ftryExDt) == 'undefined' || this.ftryExDt == null){
                    validate = true
                    // this.popMsg = '검사예정일을 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'factPopAlert');
                    this.alert('검사 예정일을 입력해주세요.')
                    return
                }

                // if( this.orderType.current === null 
                //     || this.checkVoid(String(this.materialInfo.prdtNm).trim())              // materialInfo
                //     || this.checkVoid(String(this.addr).trim()) 
                //     || this.ksCtfc.isCertified === null
                //     || this.checkVoid(String(this.materialInfo.sppr).trim())
                //     || this.checkVoid(String(this.materialInfo.mnft).trim())
                //     || this.detailInfo.sheet.getSaveJson({ saveMode: 0}).data.length === 0
                //     || (this.ksCtfc.isCertified ? this.checkVoid(String(this.ksCtfc.number).trim()) : false )
                //     ) {
                    
                //     validate = true
                //     this.popMsg = '필수항목을 모두 입력해주세요'
                //     this.confirmUse = false
                //     this.$root.$emit('bv::show::modal', 'factPopAlert')
                //     return
                // }
                if (this.checkVoid(this.materialInfo.prdt.current)) {
                    validate = true
                    // this.popMsg = '품명을 선택해주세요.'
                    // this.confirmUse = false
                    // this.$root.$emit('bv::show::modal', 'factPopAlert')
                    this.alert('품명을 입력해주세요.')
                    return
                }
                if (this.checkVoid(this.materialInfo.sppr)) {
                    validate = true
                    // this.popMsg = '공급업체를 선택해주세요.'
                    // this.confirmUse = false
                    // this.$root.$emit('bv::show::modal', 'factPopAlert')
                    this.alert('공급업체를 입력해주세요.')
                    return
                }

                let data = this.detailInfo.sheet
                                .getDataRows()
                                .filter(item => item.STATUS !== 'Deleted')
                // if (this.detailInfo.sheet.getSaveJson({ saveMode: 0}).data.length === 0) {
                // console.log(data);
                if (data.length === 0) {
                    validate = true
                    // this.popMsg = '상세품명을 선택해주세요.'
                    // this.confirmUse = false
                    // this.$root.$emit('bv::show::modal', 'factPopAlert')
                    this.alert('상세품명을 선택해주세요.')
                    return
                }else{
                    let cnt = 0;
                    for(let x = 0; x<data.length; x++){
                        if(data[x].Deleted){
                            cnt++;
                        }
                    }
                    if(cnt >0){
                        validate = true
                        this.alert('상세품명을 선택해주세요.')
                        return;
                    }
                }

                // const data = this.detailInfo.sheet.getDataRows()
                // if (data.length > 1 && data.length !== _.uniqWith(data, (data1, data2) => data1.prdtDtl === data2.prdtDtl && data1.stnd === data2.stnd) ) {
                //     validate = true
                //     this.popMsg = '동일한 상세 품명과 규격이 존재합니다.'
                //     this.confirmUse = false
                //     this.$root.$emit('bv::show::modal', 'factPopAlert')
                //     return
                // }
                let duplicate = []
                const result = _.uniqWith(data, (data1, data2) => {
                    if (data1.prdtDtl === data2.prdtDtl && data1.stnd === data2.stnd) {
                        duplicate.push({
                            prdtDtl: data1.prdtDtl,
                            stnd: data1.stnd
                        })
                        return true
                    }
                })
                
                if (data.length > 1 && data.length !== result.length ) {
                    // this.alert('동일한 상세 품명 & 규격이 존재합니다.')
                    this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.')

                    data.forEach(row => {
                        duplicate.forEach(dup => {
                            if (dup.prdtDtl === row.prdtDtl && dup.stnd === row.stnd) {
                                this.detailInfo.sheet.setAttribute(row, null, 'Color', '#F96F6F')
                            }
                        })
                    })

                    validate = true
                    return
                }

                // let nullValidate = false
                // let nullColumns = ''
                data.some(row => {
                    this.detailInfo.options.Cols.slice(2,4).some(col => {
                        if (!row[col.Name]) {
                            // nullValidate = true
                            // nullColumns = col
                            let alertMsg = ''
                            switch(col.Name) {
                                case 'prdtDtl': 
                                    alertMsg = '상세품명을 입력해주세요.'
                                    break
                                case 'stnd':
                                    alertMsg = '규격을 입력해주세요.'
                                    break
                                case 'designAmt':
                                    alertMsg = '설계량을 입력해주세요.'
                                    break
                                case 'unit':
                                    alertMsg = '단위를 입력해주세요.'
                                    break
                            }
                            validate = true
                            // this.alert(alertMsg, ()=> {
                            //     return
                            // })
                            // this.popMsg = alertMsg
                            // this.confirmUse = false
                            // this.$root.$emit('bv::show::modal', 'factPopAlert')
                            this.alert(alertMsg)
                            return true
                        }
                    })
                })


                if(!validate){
                    this.confirm('등록하시겠습니까?',this.fn_fetchDocSeq);
                }
                // this.fn_fetchDocSeq()
            }
        },
        insertList: async function(){
            this.insertClose = false;
            let paramLst = [];
            let list = [];
            let url = '/sendApi/api/docNum/selectDocNumSeq';
            let count = 0;
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            // for(let start=0;start<this.selectedAccpId.length;start++){
            //     let param = {
            //         siteMstrId: this.siteMstrId,
            //         codeType: 'MTRL',
            //         codeDtlType: 'FTRY',
            //         gjmcd: this.selectedCodeId[start]['mainCodeId'],
            //         gjscd: this.selectedCodeId[start]['midCodeId'],
            //         aprvOptnType: this.aprvType,
            //         docType: '',
            //     };
            //     //console.log('all')
            //     const url = '/sendApi/api/docNum/selectDocNumSeq'
            //     try {
            //         let rst= await sendPostApi(url, param, options).then((result) => {
            //             return result.data;
            //         }).catch((e) => {
            //             return e.response.data;
            //         });
            //         //console.log(rst.data);
            //     } catch (error) {
            //         throw new Error(error)
            //     }
            // }
            
            for(let start=0;start<this.selectedAccpId.length;start++){
                list.push({
                    siteMstrId: this.siteMstrId,
                    codeType: 'MTRL',
                    codeDtlType: 'TSFC',
                    gjmcd: this.selectedCodeId[start]['mainCodeId'],
                    gjscd: this.selectedCodeId[start]['midCodeId'],
                    aprvOptnType: this.aprvType,
                    docType: '',
                });
                
                // let seq = '';
                // axios.post(docSeq, payload, options)
                // .then(response => {
                //     //console.log("response",response);
                //     seq = response.data;
                //     // insertLst['siteMstrId']=this.siteMstrId;            //현장정보Id
                //     // insertLst['mtrlSpApprId']=this.selectedAccpId[start];   //자재공급원승인 id
                //     // insertLst['ftryExDt']=this.ftryExDt;                //검사예정일
                //     // insertLst['rmcYn'] = 'N';
                //     // insertLst['docSeq'] = response.data;
                //     // insertLst['mtrlSpApprSubIds']=this.selectedAccpSubId[start];         //자재공급원승인 sub id
                // }).catch(error => {
                //     // throw new Error(error)
                //     //console.error(error);
                //     this.popMsg = '오류로 인해 등록이 완료되지 않았습니다.';
                //     this.confirmUse = false;
                //     this.$root.$emit('bv::show::modal', 'factPopAlert');
                //     return;
                // })
                // if(seq != ''){
                //     let insertLst = {
                //         'siteMstrId':this.siteMstrId,
                //         'mtrlSpApprId':this.selectedAccpId[start],
                //         'ftryExDt':this.ftryExDt,
                //         'rmcYn':'N',
                //         'docSeq':seq,
                //     };
                //     paramLst.push(insertLst);
                // }
            }
            const requests = [];
            _.forEach(list, (value) => {
                requests.push(axios.post(url, value, options))
            })
            await axios.all(requests)
            .then(axios.spread((...response) => {
                response.forEach(item => {
                    paramLst.push({
                        'siteMstrId':this.siteMstrId,
                        'mtrlSpApprId':this.selectedAccpId[count],
                        'ftryExDt':this.ftryExDt,
                        'rmcYn':this.selectedCodeId[count].rmcYn,
                        'docSeq':item.data,
                    });
                    count++;
                })
            })).catch(error => {
                //console.error(error)
                // this.popMsg = '등록에 실패했습니다.';
                // this.confirmUse = false;
                // this.insertClose = false;
                // this.$root.$emit('bv::show::modal', 'factPopAlert');
                this.alert('등록에 실패했습니다.');
                return;
            })

            //console.log(paramLst);
            if(paramLst.length>0){
                const resultData = await API.material.addFactoryTestWrite(paramLst);
                //console.log(resultData);
                if(typeof(resultData.data.data) != 'undefined' && resultData.data.data == '0000'){
                    // this.popMsg = '등록되었습니다.';
                    // this.confirmUse = false;
                    // this.insertClose = true;
                    // this.$root.$emit('bv::show::modal', 'factPopAlert');
                    this.alert('등록되었습니다.',()=>{
                        this.dataReset();
                        this.$emit('add-factory', this.insertClose);
                    });
                }else{
                    // this.popMsg = '등록에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'factPopAlert');
                    this.alert('등록에 실패했습니다.');
                    return;
                }
            }else{
                // this.popMsg = '등록에 실패했습니다.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'factPopAlert');
                this.alert('등록에 실패했습니다.');
                return;
            }
        },
        alertConfirmFn: function(){
            //console.log('confirm');
        },
        closePop: function(){
            if(!this.insertClose){
                this.$root.$emit('bv::hide::modal', 'factPopAlert');
            }else{
                //console.log('close');
                this.dataReset();
                this.$root.$emit('bv::hide::modal', 'factPopAlert');
                this.$emit('add-factory', this.insertClose);
                // this.$root.$emit('bv::hide::modal', 'AcceptanceWrite');
            }
        },
        cancelbtn: function(){
            if(this.popcurrentTab == 1){
                this.confirm("작성중인 내용이 있습니다. 취소하시겠습니까?",() => {
                    this.closeWritePop();
                });
            }else{
                this.closeWritePop();
            }
        },
        closeWritePop: function(){
            //console.log('here');
            this.dataReset();
            this.$root.$emit('bv::hide::modal', 'factPopAlert');
            this.$emit('add-factory', this.insertClose);
        },

        // pre-register 
        checkVoid(str) {
            return ( str === null || str === '' || str === undefined )
        },
        setProductName (sheet = this.detailInfo.sheet, prdtNm = this.materialInfo.prdt.current?.prdtNm) {
            if (sheet) {
                sheet.getDataRows().forEach(row => {
                    row.prdtNm = prdtNm
                    sheet.refreshRow(row)
                })
            }
        },
        selectSupplyOperation (item) {
            this.materialInfo.sppr = item.tradeId
            this.materialInfo.spprNm = item.tradeNm
        },
        clickAddRows(sheet = this.detailInfo.sheet, addCount = this.detailInfo.addCount) {
            Array(addCount).fill().forEach(() => {
                sheet.addRow({
                    init: {
                        prdtNm: this.materialInfo.prdt.current.prdtNm
                    }
                })
            })
        },
        clickDeleteRow () {
            const checkedRows = this.detailInfo.sheet.getRowsByChecked(this.detailInfo.options.Cols[0].Name)
            if(checkedRows.length == 0){
                this.alert('선택된 행이 없습니다.');
                return;
            }
            this.detailInfo.sheet.removeRows(checkedRows)
            // this.detailInfo.sheet.deleteRows(checkedRows)
            // checkedRows.forEach(item => {
            //     this.detailInfo.sheet.hideRow({
            //         row: item,
            //         del: false,
            //         norender: false
            //     })
            // })
        },
        clickCopyRows () {
            const checkedRows = this.detailInfo.sheet.getRowsByChecked(this.detailInfo.options.Cols[0].Name)
            if(checkedRows.length == 0){
                this.alert('선택된 행이 없습니다.');
                return;
            }
            const copiedRows = this.detailInfo.sheet.copyRows(checkedRows, this.detailInfo.sheet.getFirstRow())
            copiedRows.forEach(item => {
                item[this.detailInfo.options.Cols[0].Name] = false
                this.detailInfo.sheet.refreshCell(item, this.detailInfo.options.Cols[0].Name)
            })
        },
        fn_initRemicons: function () {
            this.popcurrentTabRound     = 0
            this.hasChecklist           = false
            this.orderType              = {
                                            list: [
                                                {
                                                    id: 'HEC',
                                                    value: '당사지급'
                                                },
                                                {
                                                    id: 'ORDR',
                                                    value: '발주자'
                                                },
                                                {
                                                    id: 'PTNR',
                                                    value: '협력자'
                                                },

                                            ],
                                            current: 'HEC'
                                        }
            this.docSeq                 = null,
            this.mresDocSeq             = '',
            this.materialInfo           =  {
                                            mainCode: null,
                                            mainCodeId: null,
                                            midCode: null,
                                            midCodeId: null,
                                            prdtNm: null,
                                            spprNm: null,
                                            mnft: null,
                                            comment: null,

                                            newPrdtYn: 'N',
                                            mtrlPrjtDtlId: null,
                                            prdt: {
                                                list: [],
                                                current: {}
                                            }
                                        }
            this.addr                   = null,
            this.ksCtfc                 = {
                                            isCertified: true,
                                            number: '',
                                            evntSignYn: false,
                                            grCtfcYn: false,
                                            hbCtfcYn: false,
                                            etcCtfcYn: false

                                        }
            this.detailInfo             = {
                                            sheet: null,
                                            data: [],
                                            options: {},
                                            addCount: 1,
                                        }
        },
        fn_fetchDocSeq: function () {
            const ruleUrl   = '/sendApi/api/docNum/docNumSettList'
            const url       = '/sendApi/api/docNum/selectDocNumSeq'
            const payload   = {
                    siteMstrId:     this.$store.getters['auth/getSiteMstrId'],
                    codeType:       'MTRL',
                    codeDtlType:    'MREQ',
                    gjmcd:          this.materialInfo.prdt.current.mainCodeId,
                    gjscd:          this.materialInfo.prdt.current.midCodeId,
                }
            const options   = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

            axios.post(ruleUrl, {...payload, codeDtlType: 'MRES'}, options)
                .then(response => {
                    const requstSamenssYn   = response.data.datas.dlDocNum?.[0]?.requstSamenssYn
                    if (requstSamenssYn === 'Y') {
                        return axios.all([
                            axios.post(url, payload,                           options),
                        ])
                    } else {
                        return axios.all([
                            axios.post(url, payload,                           options),
                            axios.post(url, {...payload, codeDtlType: 'MRES'}, options),
                        ])
                    }
                })
                .then(axios.spread((...response) => {
                    if (response.length > 1) {
                        this.docSeq     = response[0].data
                        this.mresDocSeq = response[1].data
                    } else {
                        this.docSeq     = response[0].data
                        this.mresDocSeq = response[0].data
                    }
                }))
                .catch(error => {
                    //console.error(error)
                })
                .then(() => {
                    // this.setData()
                    this.addPreRegister()
                })
            // const url = '/sendApi/api/docNum/selectDocNumSeq'
            // const payload = {
            //     siteMstrId: this.$cookies.get('siteMstrId'),
            //     codeType: 'MTRL',
            //     codeDtlType: 'MREQ',
            //     gjmcd: this.materialInfo.prdt.current.mainCodeId,
            //     gjscd: this.materialInfo.prdt.current.midCodeId,
            // }
            // const options = {
            //     headers: {
            //         'Authorization': this.$cookies.get('Authorization'),
            //         'Content-Type': 'application/json',
            //         'Accept-Language': 'ko'
            //     }
            // }

            // axios.post(url, payload, options)
            //     .then(response => {
            //         this.docSeq = response.data

            //         this.addPreRegister()
            //     })
            //     .catch(error => {
            //         //console.error(error)
            //     })
        },
        async addPreRegister () {
            const payload = {
                // 
                docSeq:             this.docSeq,
                mresDocSeq:         this.mresDocSeq,
                orderType:          this.orderType.current,
                sppr:               this.materialInfo.sppr,
                spprNm:             this.materialInfo.spprNm,
                mnft:               this.materialInfo.mnft,
                comment:            this.materialInfo.comment,
                addr:               this.addr,
                ksCtfcYn:           this.ksCtfc.isCertified ? 'Y' : 'N',
                ksCtfcNum:          this.ksCtfc.isCertified ? this.ksCtfc.number : '',
                evntSignYn:         this.ksCtfc.evntSignYn ? 'Y' : 'N',
                grCtfcYn:           this.ksCtfc.grCtfcYn ? 'Y' : 'N',
                hbCtfcYn:           this.ksCtfc.hbCtfcYn ? 'Y' : 'N',
                etcCtfcYn:          this.ksCtfc.etcCtfcYn ? 'Y' : 'N',

                sourceApprovalSub:  this.detailInfo.sheet
                                        .getSaveJson({saveMode: 0})
                                        .data
                                        .filter(item => item.STATUS !== 'Deleted')
                                        .map(item => {
                                            item.stnd = this.fn_formatStnd(item.stnd)
                                            return item
                                        }),

                newPrdtYn:          this.materialInfo.newPrdtYn,
                prdtNm:             this.materialInfo.prdt.current.prdtNm,
                mainCode:           this.materialInfo.prdt.current.mainCode,
                mainCodeId:         this.materialInfo.prdt.current.mainCodeId,
                midCode:            this.materialInfo.prdt.current.midCode,
                midCodeId :         this.materialInfo.prdt.current.midCodeId,
                mtrlPrjtDtlId:      this.materialInfo.prdt.current.mtrlPrjtDtlId,

                siteMstrId:         this.siteMstrId,

            }

            try {
                // //console.log(payload)
                // //console.log(this.materialInfo.prdt.current)
                const response = await API.material.addSourceApproval(payload)

                // //console.log(response)

                if (response.status === 200 ) {
                    const testPayload = {
                        docSeq: this.docSeq,
                        siteMstrId: this.siteMstrId,
                        mtrlSpApprId: response.data.data.mtrlSpApprId,
                        ftryExDt: this.ftryExDt,
                        rmcYn: 'Y'
                    }
    
                    const testResponse = await API.material.addFactoryTestWrite([testPayload])

                    if(typeof(testResponse.data.data) != 'undefined' && testResponse.data.data == '0000'){
                        this.popMsg = '등록되었습니다.';
                        this.confirmUse = false;
                        this.insertClose = true;
                        // this.$root.$emit('bv::show::modal', 'factPopAlert');
                        // this.$root.$emit('bv::show::modal', this.popId);
                        this.$bvModal.show(`${this.popId}_simpleAlert`)
                        // this.$root.$emit('bv::show::modal', `${this.popId}_simpleAlert` )
                    }else{
                        this.alert('등록에 실패했습니다.');
                        // this.popMsg = '등록에 실패했습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'factPopAlert');
                        // this.$root.$emit('bv::show::modal', this.popId);
                    }

                }


                // after function
            } catch (error) {
                // error popup??
                throw new Error(error)
            }
        },
        fn_formatStnd(input) {
            const str = String(input)
            if(str && str.length === 7) {
                return `${str.slice(0,2)}-${str.slice(2,4)}-${str.slice(4)}`
            } else {
                return ''
            }
        },
        fn_closeModal: function () {
            // this.insertClose = true

            if (this.insertClose) {
                this.closePop()
            } else {
                this.$nextTick(() => {
                    this.detailInfo.sheet.focus(this.detailInfo.sheet.getFocusedRow(), 'stnd')
                })
            }
        },
        async getProductData () {
            try {
                let param = {
                    'siteMstrId':this.siteMstrId,
                }
                const response = await API.material.getRemiconCode(param);
                
                if (response.status === 200) {
                    // this.materiprdt.list = response.data.data
                    this.materialInfo.prdt.list = response.data.data
                    // this.materialInfo.prdt.current = response.data.data[0]
                    // this.setProductName()

                }
                //console.log(response)
            } catch (error) {
                throw new Error(error)
            }
        },
        heightChange:function(scroll,div){
            if(scroll == 0){
               document.getElementById(div).parentElement.style.height = "495px";
            }else{
               document.getElementById(div).parentElement.style.height = "";
            }
            document.getElementById(div).style.height = "100%";
        },

        fn_clickPrdtNm: function (event) {
            if (event.button === -1) {

                const url = '/sendApi/api/quality/materialSiteCheck/factoryTest/checkListCnt'
                const payload = {
                    siteMstrId:this.siteMstrId,
                    mtrlPrjtDtlId: this.materialInfo.prdt.current.mtrlPrjtDtlId
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
                        // //console.log(response)

                        if (response.data.data.cnt > 0 ) {
                            this.hasChecklist = true
                        } else {
                            this.hasChecklist = false
                            this.materialInfo.prdt.current = {}
                            
                            // this.popMsg = '공장검사 Check List를 등록해야 합니다.';
                            // this.confirmUse = false
                            // this.$bvModal.show('factPopAlert')
                            this.alert('공장검사 Check List를 등록해야 합니다.');
                        }
                    })
                    .catch(error => {
                        //console.error(error)
                        throw new Error(error)
                    })

            }
        },
        fn_inputCheck:function(event){
            if(100 >= event.target.value.length){
               this.addr = event.target.value;
            }
        },
        fnIsCopy: function(evt){
            if(evt.col == 'prdtDtl'||evt.col == 'stnd'){
                let dup = evt.sheet.getRowsByDup('prdtDtl,stnd', false, false,false,"Deleted");
                let yn = false;
                for(let x = 0;x<dup.length; x++){
                    for(let y = 0; y<dup[x].length;y++){
                        if(evt.sheet.getRowIndex(dup[x][y])==evt.sheet.getRowIndex(evt.row)){
                            // evt.row[evt.col] = '';
                            // evt.sheet.setAttribute(evt.row,evt.col,'Color','#f96f6f');
                            // // evt.sheet.setAttribute({
                            // //     row: evt.row,
                            // //     attr: 'Color',
                            // //     val: '#f96f6f'
                            // // })
                            // evt.sheet.refreshRow(evt.row);
                            yn = true;
                        }
                    }
                }
                if(!yn){
                    evt.sheet.setAttribute(evt.row,evt.col,'Color',null);
                    evt.sheet.setAttribute({
                        row: evt.row,
                        attr: 'Color',
                        val: null
                    })
                }
            }else if(evt.col == 'designAmt'){
                let replaceVal = evt.val.toString().replaceAll('.','').replaceAll(',','');
                if(isNaN(replaceVal) || replaceVal == '' || replaceVal < 0){
                    evt.row[evt.col] = ''
                }
                evt.sheet.refreshRow(evt.row);
            }
        },
    }
}
</script>