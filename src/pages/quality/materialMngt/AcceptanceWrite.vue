<template>
    <!-- 인수검사 신규 등록 팝업 -->
    <b-modal :id="refId" title="인수검사 신규 등록" hide-footer static
        modal-class="single_page" size="xl" @shown="resetFilter"
        :footer-bg-variant="footerBg">
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="tab_area submenu_on">
                        <div class="lookup_box multi_line">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="6%">
                                    <col width="12%">
                                    <col width="5%">
                                    <col width="12%">
                                    <col width="3%">
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
                                            <DatePicker v-model="accpExDt" :format="'YYYY-MM-DD'"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>세부공종</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subMidName" :maxlength="30" @keyup.enter="refreshWritePop">
                                        </td>
                                        <th>품명</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subPrdt" :maxlength="100" @keyup.enter="refreshWritePop">
                                        </td>
                                        <th>규격</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subStnd" :maxlength="30" @keyup.enter="refreshWritePop">
                                        </td>
                                        <th>공급업체</th>
                                        <td>
                                            <input type="text" class="form_control size_sm" placeholder="" v-model="subSppr" :maxlength="100" @keyup.enter="refreshWritePop">
                                            <!-- <select name="" id="" class="form_control" v-model="subSppr">
                                                <option value="">전체</option>
                                                <option v-for="(subItem,oneIndex) in tradeList" v-bind:key="oneIndex" v-bind:value="subItem.sppr">
                                                    {{subItem.tradeNm}}
                                                </option>
                                            </select> -->
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
                        </div>
                        <tree-category-tab
                            :category-data="categoryData"
                            :use-check-box="false"
                            @changed-checked-list="changedTabCheckedList"
                        />
                        <div class="right_content">
                            <div class="inner">
                                <span>※ 체크리스트 미등록 자재는 등록하실 수 없습니다.</span>
                                <!-- ibsheet -->
                                <div class="ib_wrap">
                                    <div id="acceptanceWritePopsheetTable" class="ibsheet_table"></div>
                                </div>
                                
                                <div class="button_box ac">
                                    <button type="button" class="btn btn_lg btn_outline btn_darkgray" @click="insertCheck">등록</button>
                                    <button type="button" class="btn btn_lg btn_outline btn_gray"  @click="closeWritePop">닫기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId" v-bind:btn-name="{first : '확인'}"
                    v-on:first-btn-fn="closePop"
                />
            </div>
        </template>
    </b-modal>
</template>

<script>
// import {sendPostApi, requestOptions }  from '../../../apis/common';
import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
import API from '@/apis/'
// import Datepicker from '@/pages/common/popup/Datepicker.vue'
import PopAlert from '@/pages/common/popup/PopAlert.vue' 
import { AcceptanceWrite } from '../../common/data/PopupList'
import loader from '@ibsheet/loader'
import axios from 'axios'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import DatePicker from '@component/common/DatePicker.vue'

let accpSheet = '';

export default {
    name:'AcceptanceWrite',
    mixins: [MsgBoxMixins],
    components:{
        PopAlert,
        // Datepicker,
        DatePicker,
        TreeCategoryTab,
    },
    data(){
        return {
            footerBg: 'transparent',
            //tree tab menu[S]
            // grid: {
            //     grid: null,
            //     data: [],
            //     options: {},
            //     addRowsCount: 1,
            //     focus: {
            //         row: null,
            //         col: null
            //     }
            // },

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
            
            popMsg:'',                                      //알림창 메세지
            confirmUse:'',                                  //알림창 버튼개수
            popId:'accpPopAlert',                           //알림창 Id
            siteMstrId:'',                                  //현장정보Id
            
            accpExDt:'',                //검사예정일
            subSppr:'',                 //팝업용 공급업체 id
            subStnd:'',                 //팝업용 규격
            subMnft:'',                 //팝업용 제조업체
            subPrdt:'',                 //팝업용 품명
            subMidName:'',              //팝업용 세부공종
            mainCodeId:'',              //공종 Id
            midCodeId:'',               //세부공종 Id

            selectedAccpId: [],         //체크된 자재공급원승인 id
            selectedAccpSubId: [],      //체크된 정보
            selectedCodeId:[],
            accpInsertCheck: false,     //리스트 내 검사결과

            insertClose: false,         //닫는건지 확인
            selectedId: '',             //선택된 등록복사용 id 
            accpSheet:null,
        }
    },
    props:{
        // subSppr:{       //팝업용 공급업체 id
        //     type : String,
        //     default : ''
        // },
        // subStnd:{       //팝업용 규격
        //     type : String,
        //     default : ''
        // },
        // subMnft:{       //팝업용 제조업체
        //     type : String,
        //     default : ''
        // },
        // subPrdt:{     //팝업용 품명
        //     type : String,
        //     default : ''
        // },
        // subMidName:{    //팝업용 세부공종
        //     type : String,
        //     default : ''
        // },
        // tradeList:{     //공급업체 selectbox
        //     type: Array,
        //     default: () => []
        // },
        detailObj:{
            type: Array,
            default: () => []
        },
        refId:{
            type:String,
            default:'AcceptanceWrite',
        }
    },
    async mounted(){
        //tree tab menu[S]
        await this.getCategoryData();
        
        this.mounted = true;
        //tree tab menu[E]
        
    },
    created(){
    },
    beforeDestroy() {
        // loader.removeSheet(accpSheet);
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
    },
    methods:{
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
        resetFilter: function(){
            this.selectedAccpId = [];
            this.selectedAccpSubId = [];
            this.selectedCodeId = [];
            this.subSppr = '';
            this.subStnd = '';
            this.subMnft = '';
            this.subPrdt = '';
            this.subMidName = '';
            this.mainCodeId = '';
            this.midCodeId = '';
            this.accpExDt = '';
            this.refreshWritePop();
        },
        refreshWritePop: async function(){//자재공급원승인 가져오기
            this.siteMstrId = this.$cookies.get("siteMstrId");
            this.selectedAccpId=[];   //선택리스트 초기화
            this.selectedAccpSubId = [];
            this.selectedCodeId = [];

            if(this.accpExDt == '' ){
                let today = new Date();
                let year = today.getFullYear();
                let month = today.getMonth() +1;
                let date = today.getDate();
                let dateFormat = year+'-'+(month>=10?month:'0'+month)+'-'+(date>=10?date:'0'+date);
                this.accpExDt = dateFormat;
            }
            // this.$refs.datapicker.valueChange(this.accpExDt);
            let param = {
                "siteMstrId": this.siteMstrId,
                "status" :'APRV',       //진행상태: 승인
                "chkType": 'ACCP'       //인수검사
            };
            if(this.subSppr != ''){
                param['sppr'] = this.subSppr;
            }
            if(this.subStnd != ''){
                param['stnd'] = this.subStnd;
            }
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

            // const rst = await sendPostApi(url, param).then((result) => {
            //     return result.data;
            // }).catch((e) => {
            //     // //console.log(e);
            //     return e.response.data;
            // });
            //console.log(rst);

            let options = AcceptanceWrite.options;
            let scroll = 1;
            options.Events = {
                onAfterClick: this.fnClick,
                //ondblclick : this.fn_company_choice
            };
            let data = rst.data.data;

            // let cols= [
            //     { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: 2 }], Type: 'Bool', CanSort: 0, RelWidth: 5, CanEdit:1},
            //     { Name: 'docSeq', Header: [{ Value: '문서번호', RowSpan: 2 }], RelWidth: 15, CanEdit:0 },
            //     { Name: 'mainName', Header: [{ Value: '공종', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
            //     { Name: 'midName', Header: [{ Value: '세부공종', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
            //     { Name: 'prdt', Header: [{ Value: '품명', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
            //     { Name: 'stnd', Header: [{ Value: '규격', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
            //     { Name: 'ksCtfcYn', Header: [{ Value: 'KS인증', Span: 2 }, { Value: '인증여부' }], Type: 'Bool', RelWidth: 10, CanEdit:0 },
            //     { Name: 'kszCtfcNum', Header: [{}, { Value: '인증번호' }], RelWidth: 10, CanEdit:0 },
            //     { Name: 'spprNm', Header: [{ Value: '공급업체', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
            //     { Name: 'mnft', Header: [{ Value: '제조업체', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
            //     { Name: 'apprDt', Header: [{ Value: '승인일', RowSpan: 2 }], RelWidth: 10, CanEdit:0 },
            // ];
            // options.Cols = cols;
            // let dataMerge = 0;

            if(typeof(rst.data.data) != 'undefined' && rst.data.data.length != 0){
                // this.subRst = rst;
                // dataMerge = 0;
                let array = rst.data.data;
                let mtrlSpApprSubIds  = [];
                if(array.length<10){
                  scroll = 1;
                  // document.getElementById('multiEmpTable2').parentElement.style.height = "";
                }else{
                    scroll = 0;
                    // document.getElementById('multiEmpTable2').parentElement.style.height = "337px";
                }
                //console.log('detailObj',this.detailObj);
                for(let  a = 0; a<array.length; a++) {
                    array[a].cnt=(array[a].cnt>0?true:false);
                    array[a].ksCtfcYn=array[a].ksCtfcYn==='N'?'0':'1';
                    if(Object.keys(this.detailObj).length !== 0){
                        if(array[a].mtrlSpApprId == this.detailObj[0].mtrlSpApprId && this.detailObj.clickYn){
                            this.selectedAccpId[0] = array[a].mtrlSpApprId;
                            this.selectedCodeId[0] = {
                                'mainCodeId':array[a].mainCodeId,
                                'midCodeId':array[a].midCodeId,
                            }
                            for(let b = 0; b<this.detailObj[0].mtrlSpApprSubIds.length; b++){
                                if(array[a].mtrlSpApprSubId == this.detailObj[0].mtrlSpApprSubIds[b]){
                                    //console.log('true');
                                    array[a]['selectYnType'] = 'Bool';//타입은 체크박스로
                                    array[a]['selectYn'] = 1;
                                    mtrlSpApprSubIds.push(array[a].mtrlSpApprSubId);
                                }
                            }
                            
                            // this.selectedAccpSubId[0] = this.detailObj[0].mtrlSpApprSubIds
                            // if(array[a].mtrlSpApprSubId == this.detailObj[0].mtrlSpApprSubId ){
                                // //console.log('true');
                                // array[a]['selectYnType'] = 'Bool';//타입은 체크박스로
                                // array[a]['selectYn'] = 1;
                                // this.rowIndex = a;//몇번째에 포커스해야하는지 저장
                            // }
                        }
                        // else{
                        //     mtrlSpApprSubIds  = [];
                        // }
                    }
                    if(array[a].cnt == 0){//체크리스트 없을시
                        array[a]['selectYnType'] = 'Text';//타입은 텍스트로
                        array[a]['selectYn']='';//빈칸표시
                        array[a]['selectYnCanEdit']=0;//수정불가
                    }else{
                        array[a]['selectYnType'] = 'Bool';//타입은 체크박스로
                    }                    
                }
                if(mtrlSpApprSubIds.length>0){
                    this.selectedAccpSubId[0] = mtrlSpApprSubIds;
                    //console.log(this.selectedAccpSubId);
                }
            }else{
                data = [];
                scroll= 1;
            }

            options.Cfg['NoVScroll']=scroll;

            loader.createSheet({
                    el: 'acceptanceWritePopsheetTable',
                    data: [],
                    options:options,
                    // options: {
                    //     Cfg : {
                    //         DataMerge : dataMerge
                    //     },
                    //     Cols : cols,
                    //     Events : {
                    //         onAfterClick: this.fnClick,
                    //         //ondblclick : this.fn_company_choice
                    //     }
                    // },
            }).then((sheet) => {
                this.accpSheet = sheet;
                // accpSheet = sheet.id;
                // sheet.doSort("mtrlSpApprId");
                sheet.loadSearchData({
                    data: data,
                    append: false
                })
                sheet.bind("onRenderFinish",function(evt){
                    // if(typeof(this.detailObj) != 'undefined'){
                    //     //console.log('ddd');
                    //     if(this.detailObj.clickYn){
                    //         evt.sheet.focus(getRowByIndex(rowIndex));
                    //         //console.log('ddd');
                    //     }else{
                    //         evt.sheet.blur(0);
                    //     }
                    // }else{
                        evt.sheet.hideCol('mtrlSpApprId');
                        evt.sheet.blur(0);
                    // }
                })
            });
            this.heightChange(scroll,'acceptanceWritePopsheetTable');
        },
        fnClick: function(evtParams){//셀 클릭할때마다
            // //console.log(evtParams.row);
            //console.log('before',this.selectedAccpSubId);
            if(evtParams.sheet.getFocusedCol() == 'selectYn'){
                //전체선택 클릭시
                if(evtParams.row.Kind == 'Header'){
                    //모두체크시
                    if(evtParams.row.selectYnChecked == '1'){
                        this.selectedAccpId = [];
                        this.selectedAccpSubId = [];
                        this.selectedCodeId = [];

                        const allRow = evtParams.sheet.getDataRows();//모든열 가져오기
                        for(let x = 0; x<allRow.length; x++){
                            if(allRow[x].cnt== true && !this.selectedAccpId.includes(allRow[x].mtrlSpApprId)){
                                //mtrlSpApprSubId 구하기
                                let start = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(allRow[x],'mtrlSpApprId')[0]);
                                let end = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(allRow[x],'mtrlSpApprId')[2]);
                                let mtrlSpApprSubIds  = [];
                                for(start;start<=end;start++){
                                    mtrlSpApprSubIds.push(evtParams.sheet.getRowByIndex(start).mtrlSpApprSubId);
                                }
                                this.selectedAccpSubId.push(mtrlSpApprSubIds);
                                this.selectedAccpId.push(allRow[x].mtrlSpApprId);
                                this.selectedCodeId.push({
                                    'mainCodeId':allRow[x].mainCodeId,
                                    'midCodeId':allRow[x].midCodeId,
                                });
                            }
                        }
                        // //console.log(this.selectedAccpId);
                        // //console.log(this.selectedAccpSubId);
                    //모두체크해제시
                    }else if(evtParams.row.selectYnChecked == '0'){
                        this.selectedAccpSubId = [];//초기화
                        this.selectedAccpId = [];//초기화
                        this.selectedCodeId = [];
                    }
                }else{
                    //선택하고, 자재공급원 ID가 없을경우
                    if(evtParams.row.selectYn == 1 && !this.selectedAccpId.includes(evtParams.row.mtrlSpApprId)){
                        
                        //mtrlSpApprSubId 구하기
                        // let start = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(evtParams.row,'mtrlSpApprId')[0]);
                        // let end = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(evtParams.row,'mtrlSpApprId')[2]);
                        let mtrlSpApprSubIds  = [];
                        // for(start;start<=end;start++){
                        //     mtrlSpApprSubIds.push(evtParams.sheet.getRowByIndex(start).mtrlSpApprSubId);
                        // }
                        mtrlSpApprSubIds.push(evtParams.row.mtrlSpApprSubId);
                        this.selectedAccpSubId.push(mtrlSpApprSubIds);
                        this.selectedAccpId.push(evtParams.row.mtrlSpApprId);
                        this.selectedCodeId.push({
                            'mainCodeId':evtParams.row.mainCodeId,
                            'midCodeId':evtParams.row.midCodeId,
                        });

                        // //console.log(this.selectedAccpId);
                        // //console.log(this.selectedAccpSubId);
                    
                    //선택하고, 자재공급원 Id가 있을경우
                    }else if(evtParams.row.selectYn == 1 && this.selectedAccpId.includes(evtParams.row.mtrlSpApprId)){
                        let mtrlSpApprSubIds  = [];
                        let index = this.selectedAccpId.indexOf(evtParams.row.mtrlSpApprId);//자재공급원 승인 id
                        // //console.log("++++++++index"+index);
                        // //console.log(this.selectedAccpSubId[index]);
                        mtrlSpApprSubIds =this.selectedAccpSubId[index];
                        // //console.log(mtrlSpApprSubIds);
                        mtrlSpApprSubIds.push(evtParams.row.mtrlSpApprSubId);
                        this.selectedAccpSubId[index] = mtrlSpApprSubIds;
                        // this.selectedAccpSubId.push(mtrlSpApprSubIds);
                        // //console.log(this.selectedAccpId);
                        // //console.log(this.selectedAccpSubId);

                    //선택해제하고, 자재공급원 Id가 있을경우
                    }else if(evtParams.row.selectYn != 1 && this.selectedAccpId.includes(evtParams.row.mtrlSpApprId)){
                        let start = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(evtParams.row,'mtrlSpApprId')[0]);
                        let end = evtParams.sheet.getRowIndex(evtParams.sheet.getMergeRange(evtParams.row,'mtrlSpApprId')[2]);
                        let subCnt = false;
                        let mtrlSpApprSubIds  = [];
                        for(start;start<=end;start++){
                            if(evtParams.sheet.getRowByIndex(start).selectYn == 1){
                                subCnt = true;
                            }
                        }

                        let index = this.selectedAccpId.indexOf(evtParams.row.mtrlSpApprId);//자재공급원 승인 id
                        //같은 자재공급원 Id중 남은 선택이 없을경우
                        if(!subCnt){
                            this.selectedAccpId.splice(index,1);
                            this.selectedAccpSubId.splice(index,1);
                            this.selectedCodeId.splice(index,1);
                        //같은 자재공급원 Id중 아직 남은 선택이 있을경우
                        }else{
                            mtrlSpApprSubIds = this.selectedAccpSubId[index];
                            mtrlSpApprSubIds.splice(mtrlSpApprSubIds.indexOf(evtParams.row.mtrlSpApprSubId),1);
                            this.selectedAccpSubId[index] = mtrlSpApprSubIds;
                        }
                        // //console.log(this.selectedAccpId);
                        // //console.log(this.selectedAccpSubId);
                    }
                }
            }
            //console.log('after',this.selectedAccpId);
            //console.log('after',this.selectedAccpSubId);
            //console.log('after',this.selectedCodeId);
            //this.focus_partner_name = evtParams.row.partner_nm;
            ////console.log(evtParams);
            //evtParams.sheet.setValue(evtParams.row,'selectYn','Y');
        },
        dateChange : async function(param) { //date-picker value change event
            this.accpExDt = param;
            //console.log(this.accpExDt);
        },
        dataReset : function(){
            this.selectedAccpId=[];   //선택리스트 초기화
            this.selectedAccpSubId=[];
            this.selectedCodeId=[];
            this.accpExDt = '';
            this.subSppr='';
            this.subStnd='';
            this.subMnft='';
            this.subPrdt='';
            this.subMidName='';
            this.midCodeId='';
            this.mainCodeId='';
            // loader.removeSheet(accpSheet);
        },
        insertCheck: function(){
            this.accpInsertCheck = false;
            this.popMsg = '';
            //console.log(this.accpExDt);
            if(this.selectedAccpId.length == 0 ||typeof(this.selectedAccpId)!='object'){
                // //console.log('here');
                // this.popMsg = '자재를 선택해주세요.';
                // this.confirmUse = false;
                // this.accpInsertCheck = false;
                // this.$root.$emit('bv::show::modal', 'accpPopAlert');
                this.alert('자재를 선택해주세요.');
                return;
            }
            if(this.accpExDt == ''|| typeof(this.accpExDt) == 'undefined' || this.accpExDt == null){
                // this.popMsg = '검사예정일을 입력해주세요.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'accpPopAlert');
                this.alert('검사예정일을 입력해주세요.');
                return;
            }
            // if(this.popMsg == ''){
                this.confirm('등록하시겠습니까?',this.insertList);
                // this.accpInsertCheck = true;
                // this.insertList();
            // }
        },
        insertList: async function(){
            let paramLst = [];
            let list = [];
            this.insertClose = false;
            let url = '/sendApi/api/docNum/selectDocNumSeq';
            let count = 0;
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            for(let start=0;start<this.selectedAccpId.length;start++){
                list.push({
                    siteMstrId: this.siteMstrId,
                    codeType: 'MTRL',
                    codeDtlType: 'TSAC',
                    gjmcd: this.selectedCodeId[start]['mainCodeId'],
                    gjscd: this.selectedCodeId[start]['midCodeId'],
                    aprvOptnType: this.aprvType,
                    docType: '',
                });

                // let insertLst = {};
                // insertLst['siteMstrId']=this.siteMstrId;            //현장정보Id
                // insertLst['mtrlSpApprId']=this.selectedAccpId[start];   //자재공급원승인 id
                // insertLst['accpExDt']=this.accpExDt;                //검사예정일   
                // insertLst['mtrlSpApprSubIds']=this.selectedAccpSubId[start];         //자재공급원승인 sub id
                // paramLst.push(insertLst);
            }
            //console.log(paramLst);
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
                        'mtrlSpApprSubIds':this.selectedAccpSubId[count],
                        'accpExDt':this.accpExDt,
                        'docSeq':item.data,
                        //'rmcYn':'N',
                    });
                    count++;
                })
            })).catch(error => {
                //console.error(error)
                // this.popMsg = '오류로 인해 등록이 완료되지 않았습니다.';
                // this.confirmUse = false;
                // this.insertClose = false;
                // this.$root.$emit('bv::show::modal', 'accpPopAlert');
                this.alert('등록에 실패했습니다.');
                return;
            })

            // requestOptions.headers['Accept-Language'] = "ko";
            // requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            // let url = '/sendApi/api/quality/materialSiteCheck/acceptTest/write';
    
            // const resultData = await sendPostApi(url, paramLst).then((result) => {
            //     return result.data;
            // }).catch((e) => {
            //     // //console.log(e);
            //     return e.response.data;
            // });
            const resultData = await API.material.addAcceptTestList(paramLst);
            if(typeof(resultData.data.data) != 'undefined' && resultData.data.data == '0000'){
                // this.popMsg = '등록되었습니다.';
                // this.confirmUse = false;
                // this.insertClose = true;
                // this.$root.$emit('bv::show::modal', 'accpPopAlert');
                this.alert('등록되었습니다.', this.writeFinish);
                return;
            }else{
                this.alert('등록에 실패했습니다.');
                // this.popMsg = '오류로 인해 등록이 완료되지 않았습니다.';
                // this.confirmUse = false;
                // this.insertClose = false;
                // this.$root.$emit('bv::show::modal', 'accpPopAlert');
            }
        },
        alertConfirmFn: function(){
            //console.log('confirm');
        },
        closePop: function(){
            if(!this.insertClose){
                this.$root.$emit('bv::hide::modal', 'accpPopAlert');
            }else{
                //console.log('close');
                this.dataReset();
                this.$root.$emit('bv::hide::modal', 'accpPopAlert');
                this.$emit('add-acceptance', this.insertClose);
                // this.$root.$emit('bv::hide::modal', 'AcceptanceWrite');
            }
        },
        writeFinish:function(){
            this.dataReset();
            this.$root.$emit('bv::hide::modal', 'accpPopAlert');
            this.$emit('add-acceptance', this.insertClose);
        },
        closeWritePop: function(){
            //console.log('here');
            this.dataReset();
            this.$root.$emit('bv::hide::modal', 'accpPopAlert');
            // this.$emit('add-acceptance', this.insertClose);
            this.$root.$emit('bv::hide::modal', this.refId);
            
            // this.$bvModal.hide('AcceptanceWrite')
        },
        heightChange:function(scroll,div){
            if(scroll == 0){
               document.getElementById(div).parentElement.style.height = "495px";
            }else{
               document.getElementById(div).parentElement.style.height = "";
            }
            document.getElementById(div).style.height = "100%";
        }
        // async getGridData (param) {
        //     const payload = {
        //         ...param
        //     }
            
        //     const response = await API.getProjectDetailList(payload)
        //     // //console.log(response)

        //     if (response.status === 200 && response.data) {

        //         this.grid.data = response.data.data

        //         this.grid.data.forEach(item => {
        //             item.acceptCheckListYn = item.acceptCheckListCount > 0 ? '1' : '0'
        //             item.factoryCheckListYn = item.factoryCheckListCount > 0 ? '1' : '0'
        //         })
                
        //         this.grid.grid.loadSearchData({
        //             data: this.grid.data,
        //             append: false
        //         })
        //     }

        //     this.grid.grid.blur()

        // },
    }
}
</script>
