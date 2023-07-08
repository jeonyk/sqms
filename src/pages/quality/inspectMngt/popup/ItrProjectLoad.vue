<template>
    <!-- 타 프로젝트 데이터 가져오기 (ITR),본사 ITR 복원 팝업 -->
    <b-modal id="ItrProjectLoad" v-bind:title="title" hide-footer
        modal-class="single_page" size="xl" @shown="resetSheet"
        :footer-bg-variant="footerBg" static>
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="tab_area submenu_on">
                        <div class="lookup_box" v-if="!loadTitle">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="80">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>프로젝트명</th>
                                        <td>
                                            <div class="search_area">
                                                <input type="text" placeholder="검색" class="form_control" id="focusOut" v-model="projectViewNm" v-b-modal.ItrSelectOtherProject>
                                                <button type="button" class="btn_search" v-b-modal.ItrSelectOtherProject>검색</button>
                                            </div>
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
                                <div class="button_box">
                                    <button type="button" class="btn btn_sm btn_excel" @click="insertAllChkYn">전체 가져오기</button>
                                    <button type="button" class="btn btn_sm btn_darkgray" @click="insertChkYn">선택 가져오기</button>
                                </div>
                                <!-- ibsheet -->
                                <div class="ib_wrap">
                                    <div id="itrProjectLoadPopsheetTable3" class="ibsheet_table"></div>
                                </div>
                                
                                <div class="button_box ac">
                                    <button type="button" class="btn btn_lg btn_outline btn_blue" @click="insertChkYn">선택</button>
                                    <button type="button" class="btn btn_lg btn_outline btn_darkgray"  @click="$bvModal.hide('ItrProjectLoad')">닫기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
                <!-- <ProjectSelect v-on:fn-choice="writeForm"  v-bind:project-id="''" v-bind:project-select-id="''"/> -->
                <CommonProjectSelect :all-bind-btn="'N'" v-bind:except-yn="'Y'" v-on:fn-other-project-choice="writeForm" v-bind:project-select-id="projectSelectId" v-bind:set-cookies="false"/>
            </div>
        </template>
    </b-modal>
</template>

<script>
    import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
    import ProjectSelect from '../../../common/popup/ProjectSelect.vue'
    import loader from '@ibsheet/loader'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import { ItrList2 } from '../../../common/data/PopupList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import API from '@/apis/'
    import CommonProjectSelect from '@/pages/common/popup/CommonProjectSelect.vue';
    // import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

    export default {
        name: 'ItrProjectLoad',
        mixins: [MsgBoxMixins],
        components: {
            TreeCategoryTab,
            PopAlert,
            ProjectSelect,
            CommonProjectSelect,
        },
        data() {
            return {
                footerBg: 'transparent',
                siteMstrId:'',
                mainCodeId:'',
                midCodeId:'',
                mounted:false,
                popMsg: '',                                 // 알림창 메세지
                confirmUse: false,                             // 알림창 버튼개수
                popId:'ItrPopAlert',                     // 알림창 Id
                itrLoadSheet:null,

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
                title:'',

                projectSelectId:'ItrSelectOtherProject',
                projectNm:'',
                projectViewNm:'',
                allChkYn: false,
                chkYn: false,
                saveYn:false,
                insertIds: [],
                otrSiteMstrId:'',
            }
        },
        props:{
            siteId:{
                type:String,
                default:'',
            },
            loadTitle:{
                type:Boolean,
                default:false,
            }
        },
        async mounted() {
            //tree tab menu[S]
            await this.getCategoryData();
            // this.sheetCreate();
            this.mounted = true;
            //tree tab menu[E]
        },
        watch:{
            "search.tab.data": {
                handler () {
                    // //console.log('search.tab.data changed')

                    if (this.mounted) {
                        //console.log(this.search.tab.data)
                        // loader.removeSheet('inspect1');
                        // loader.removeSheet('inspect2');
                        this.mainCodeId = this.search.tab.data.mainCodeId? this.search.tab.data.mainCodeId : '';
                        this.midCodeId = this.search.tab.data.midCodeId;
                        this.sheetLoad();
                    }
                },
                deep: true
            },
        },
        beforeDestroy() {
            // loader.removeSheet('itrLoadSheet');
        },
        methods:{
            resetSheet: function(){
                this.projectNm = '';
                this.projectViewNm = '';
                this.sheetLoad();
            },
            sheetLoad: async function() {
                // loader.removeSheet('itrLoadSheet');
                let param = {};
                let data = [];
                let options = ItrList2.options;
                if(this.loadTitle){
                    this.title = '본사 ITR 복원';

                    if(this.mainCodeId != null && this.mainCodeId != ''){
                        param['mainCodeId'] = this.mainCodeId;
                    }
                    if(this.midCodeId != null && this.midCodeId != ''){
                        param['midCodeId'] = this.midCodeId;
                    }
                    const headRst = await API.inspect.headITRChkTitleList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(headRst);
                    options.Cols = [
                        { Name: 'selectYn', Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center' }], Type: 'Bool', CanSort: 0, RelWidth: 5 },
                        { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 5,CanEdit:0 },
                        { Name: 'mainName', Header: [{ Value: '대공종' }], RelWidth: 10,CanEdit:0 },
                        { Name: 'midName', Header: [{ Value: '공종' }], RelWidth: 20,CanEdit:0 },
                        { Name: 'subName', Header: [{ Value: '세부공종' }], RelWidth: 20,CanEdit:0 },
                        { Name: 'chkTitle', Header: [{ Value: '체크리스트 이름' }], RelWidth: 30 ,CanEdit:0},
                        { Name: 'inUser', Header: [{ Value: '등록자' }], RelWidth: 8,CanEdit:0 },
                        { Name: 'registDate', Header: [{ Value: '등록일' }], RelWidth: 6,CanEdit:0 },
                    ];
                    if(headRst.data.rCode == '0000'){
                        data = headRst.data.datas.dlHeadItpChk;
                    }
                }else{
                    this.title = '타 프로젝트 데이터 가져오기 (ITR)';
                    if(this.projectNm != null && this.projectNm != ''){
                        param['projectNm'] = this.projectNm;

                        if(this.mainCodeId != null && this.mainCodeId != ''){
                            param['mainCodeId'] = this.mainCodeId;
                        }
                        if(this.midCodeId != null && this.midCodeId != ''){
                            param['midCodeId'] = this.midCodeId;
                        }
                        const othrRst = await API.inspect.getOtherSiteSetUpITRList(param,{
                            headers:{
                                'Authorization': this.$cookies.get("Authorization")
                            }
                        });
                        //console.log(othrRst);
                        if(othrRst.data.rCode == '0000'){
                            data = othrRst.data.datas.dlItpChk;
                            // this.otrSiteMstrId = data[0].otrSiteMstrId;
                        }
                    }
                }
                loader.createSheet({
                    el: 'itrProjectLoadPopsheetTable3',
                    // id:'itrLoadSheet',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.itrLoadSheet= sheet;
                })
                // 오픈시 메서드(팝업 띄워졌을때 프로젝트 선택이 안되어있다면 )
                // if(data.length == 0 && (this.projectNm == null||this.projectNm == '')){
                //     this.$root.$emit('bv::show::modal', 'projectSelectId');
                // }
            },
            insertAllChkYn:function(){
                this.allChkYn = false;
                this.insertIds = [];
                let rows =this.itrLoadSheet.getDataRows();

                if(!this.otrSiteMstrId && 0 >= rows.length){
                    // this.popMsg = '저장할 데이터가 없습니다.';
                    // this.confirmUse = false;
                    // this.chkYn = false;
                    // this.$root.$emit('bv::show::modal', 'ItrPopAlert');
                    this.alert('등록할 데이터가 없습니다.');
                    return;
                }

                // this.otrSiteMstrId = rows[0].otrSiteMstrId;
                // this.allChkYn = true;
                this.popMsg = `타 프로젝트 데이터를 가져올 시, \n 기존 데이터가 삭제됩니다. \n 데이터를 가져오시겠습니까?`;
                if(this.loadTitle){
                    this.popMsg = `기존 본사 ITR 데이터가 Reset 됩니다. \n 데이터를 복원하시겠습니까?`;
                }
                this.confirm(this.popMsg, this.insertAllChkLst);
                // this.confirmUse = true;
                // this.$root.$emit('bv::show::modal', 'ItrPopAlert');
            },
            insertAllChkLst: async function(){
                this.saveYn = false;
                let param = {
                    'otrSiteMstrId':this.otrSiteMstrId,
                    'siteMstrId':this.siteId,
                };
                let checkRstAll = {};
                if(!this.loadTitle){
                    checkRstAll = await API.inspect.writeOtherSiteSetUpITRListAll(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                }else{
                    checkRstAll = await API.inspect.headITRChkDataAllCopyWrite(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                }
                //console.log(checkRstAll);
                if(checkRstAll.status==200){
                    // this.popMsg = '저장되었습니다.';
                    // this.confirmUse = false;
                    // this.saveYn  = true;
                    // this.$root.$emit('bv::show::modal', 'ItrPopAlert');
                    this.alert('등록되었습니다.',()=>{
                        this.$emit('save-check',true);
                        this.$root.$emit('bv::hide::modal', 'ItrProjectLoad');
                    });
                }else{
                    this.alert('등록에 실패했습니다.');
                    return;
                }
            },
            insertChkYn:function(){
                this.chkYn = false;
                this.insertIds = [];
                let rows =this.itrLoadSheet.getRowsByChecked('selectYn');
                if(rows.length == 0){
                    // this.popMsg = '선택된 행이 없습니다.';
                    // this.confirmUse = false;
                    // this.chkYn = false;
                    // this.$root.$emit('bv::show::modal', 'ItrPopAlert');
                    this.alert('선택된 행이 없습니다.');
                    return;
                }
                for(let x = 0; x<rows.length; x++){
                    let temp = {};
                    temp['inptChkId'] = rows[x].inptChkId;
                    temp['chkTitle'] = rows[x].chkTitle;
                    temp['mainCodeId'] = rows[x].mainCodeId;
                    temp['midCodeId'] = rows[x].midCodeId;
                    temp['subCodeId'] = rows[x].subCodeId;
                    temp['siteInptChkId'] = rows[x].siteInptChkId;
                    this.insertIds.push(temp);
                }
                this.chkYn = true;
                if(this.chkYn){
                    // this.popMsg = '등록하시겠습니까?';
                    // this.confirmUse = true;
                    // this.chkYn = true;
                    // this.$root.$emit('bv::show::modal', 'ItrPopAlert');
                    this.confirm('등록하시겠습니까?',this.insertChkLst);
                    return;
                }
            },
            insertChkLst: async function(){
                this.saveYn = false;
                let checkRst = {'status':''};
                if(!this.loadTitle){ //타프로젝트 데이터
                    let param = {
                        'param':{
                            'otrSiteMstrId':this.otrSiteMstrId,
                            'siteMstrId':this.siteId,
                        },
                        'listData':this.insertIds,
                    };
                    checkRst = await API.inspect.writeOtherSiteSetUpITRList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                }else{
                    let param = {
                        'param':{
                            'siteMstrId':this.siteId,
                        },
                        'listData':this.insertIds,
                    };
                    checkRst = await API.inspect.headITRChkDataChoiceCopyWrite(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                }
                //console.log(checkRst);
                if(checkRst.status==200){
                    // this.popMsg = '저장되었습니다.';
                    // this.confirmUse = false;
                    // this.saveYn  = true;
                    // this.$root.$emit('bv::show::modal', 'ItrPopAlert');
                    this.alert('등록되었습니다.',()=>{
                        this.$emit('save-check',true);
                        this.$root.$emit('bv::hide::modal', 'ItrProjectLoad');
                    });
                }else{
                    // this.popMsg = '저장에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.saveYn  = true;
                    // this.$root.$emit('bv::show::modal', 'ItrPopAlert');
                    this.alert('등록에 실패했습니다.');
                    return;
                }
            },
            changedTabCheckedList (item) {
                this.search.tab.data = item
                //console.log(item);
                // event
            },
            async getCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/codeCategory/list';
                let param = { codeType: 'INPT' };
                
                try {
                    const { data } = await sendPostApi(url, param);
                    this.categoryData = data.list;
                } catch (error) {
                    //console.log(error.response.data)
                }
            },
            alertConfirmFn:function(){
                if(this.allChkYn){
                    this.allChkYn = false;
                    this.insertAllChkLst();
                }
                else if(this.chkYn){
                    this.chkYn = false;
                    this.insertChkLst();
                }else if(this.saveYn){
                    this.saveYn = false;
                    this.$emit('save-check',true);
                    this.$root.$emit('bv::hide::modal', 'ItrProjectLoad');
                }
                this.$root.$emit('bv::hide::modal', 'ItrPopAlert');
            },
            closePop:function(){
                this.allChkYn = false;
                this.chkYn = false;
                this.saveYn = false;
                this.$root.$emit('bv::hide::modal', 'ItrPopAlert');
            },
            writeForm : function(infoObj) {
                //console.log(infoObj);
                this.projectNm = infoObj.projectId;
                this.projectViewNm = infoObj.projectNm;
                this.otrSiteMstrId = infoObj.siteMstrId;
                this.$root.$emit('bv::hide::modal', this.projectSelectId);
                this.sheetLoad();
            },
        }
    }
</script>
