<template>
    <div class="inner type2">
        <div class="button_box">
            <div class="fr">
                <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" @click="title = false" v-b-modal.ItrProjectLoad>타 프로젝트 가져오기</button>
                <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" @click="title = true" v-b-modal.ItrProjectLoad>본사 ITR 복원</button>
                <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" v-on:click="insertCheckList">추가</button>
                <button v-if="checkUser(userId,'unuse')" type="button" class="btn btn_sm btn_darkgray" v-on:click="deleteCheckListChk">삭제</button>
            </div>
        </div>

        <!-- ibsheet -->
        <div class="ib_wrap" style="height: calc(100vh - 270px)">
            <div id="itrListSheetTable4" class="ibsheet_table" style="height: 100%"></div>
        </div>
        <ItrProjectLoad v-bind:site-id="siteMstrId" v-bind:load-title="title" @save-check="loadSheet"/>
        <ChecklistWrite :chk-pop-id="selectPopId" v-bind:siteChkId="siteInptChkId"  v-bind:chkId="''" v-bind:mainId="mainCodeId" v-bind:midId="midCodeId" v-bind:subId="subCodeId" v-on:insert="loadSheet"/>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
    </div>
</template>
<script>
    import loader from '@ibsheet/loader'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import { ItrList } from '@/pages/common/data/InptOptnList'
    import ItrProjectLoad from '@/pages/quality/inspectMngt/popup/ItrProjectLoad.vue'
    import API from '@/apis/'
    import ChecklistWrite from "@/pages/quality/inspectMngt/popup/InspectCheckListPop.vue"
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

    export default {
        name: 'ItpSelect',
        mixins: [authCheckMixns,MsgBoxMixins],
        components: {
            PopAlert,
            ItrProjectLoad,
            ChecklistWrite,
        },
        data() {
            return {
                popMsg: '',                                 // 알림창 메세지
                confirmUse: false,                             // 알림창 버튼개수
                popId:'ItrListAlert',                     // 알림창 Id
                siteMstrId:'',
                mainCodeId:'',
                midCodeId:'',
                subCodeId:'',
                mounted:false,
                itrSheet:null,

                siteInptChkId:'',
                delYn:false,
                saveChkYn:false,
                delIds:[],
                title:false,
                selectPopId: 'siteItpSelectPop',
            }
        },
        props:{
            mainId:{
                type:String,
                default:'',
            },
            midId:{
                type:String,
                default:'',
            },
            userId:{
                type:String,
                default: '',
            }
        },
        mounted(){
            // this.sheetCreate();
            this.mounted = true;
            this.siteMstrId = this.$cookies.get("siteMstrId");
            this.loadSheet();
        },
        beforeDestroy() {
            // loader.removeSheet('itrSheet');
        },
        watch:{
            mainId : function(){
                if (this.mounted) {
                    //console.log(this.mainId);
                    this.loadSheet();
                }
            },
            midId : function(){
                if (this.mounted) {
                    this.loadSheet();
                }
            },
        },
        methods:{
            loadSheet: async function(){
                if(this.siteMstrId!= null && this.siteMstrId!= ''){
                    // loader.removeSheet('itrSheet');
                    let param = {
                        'siteMstrId':this.siteMstrId,
                    };
                    if(this.mainId != '' && this.mainId != null){
                        param['mainCodeId'] = this.mainId;
                    }
                    if(this.midId != '' && this.midId != null){
                        param['midCodeId'] = this.midId;
                    }
                    let rst = await API.inspect.getinptSiteSetUpITRList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(rst);

                    let data = [];
                    let options = ItrList.options;
                    if(rst.data.rCode == '0000'){
                        data = rst.data.datas.dlItpChk;
                    }
                    
                    loader.createSheet({
                        el: 'itrListSheetTable4',
                        // id:'itrSheet',
                        data: data,
                        options: {
                            Cfg: {
                                NoVScroll: 0,
                                NoDataMessage:3,
                            },
                            Events:{
                                ondblclick: this.clickGrid,
                            },
                            Cols: options.Cols,
                        },
                    }).then((sheet) => {
                        this.itrSheet = sheet;
                    });
                }
            },
            deleteCheckListChk: function(){
                //console.log('dd');
                this.delIds = [];
                this.delYn = false;
                this.popMsg = '';
                let rows = this.itrSheet.getRowsByChecked('selectYn');
                if(rows.length == 0){
                    this.alert('선택된 행이 없습니다.');
                    // this.popMsg = '선택된 행이 없습니다.';
                    // this.delYn = false;
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'ItrListAlert');
                    return;            
                }
                for(let x = 0; x<rows.length; x++){
                    this.delIds.push({'siteInptChkId':rows[x].siteInptChkId});
                }
                if(this.popMsg == ''){
                    this.confirm('삭제하시겠습니까?',this.deleteCheckList);
                    // this.delYn = true;
                    // this.popMsg = '삭제하시겠습니까?';
                    // this.confirmUse = true;
                    // this.$root.$emit('bv::show::modal', 'ItrListAlert');    
                }
            },
            deleteCheckList: async function(){
                this.saveChkYn = false;
                let param = {
                    'param':{
                        'siteMstrId': this.siteMstrId,
                        'status': 'Deleted'
                    },
                    'listData':this.delIds,
                };
                const siteDelRst = await API.inspect.siteITPChkDataWrite(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(siteDelRst);
                if(siteDelRst.status==200){
                    // this.popMsg = '삭제되었습니다';
                    // this.confirmUse = false;
                    // this.saveChkYn  = true;
                    this.delIds = [];
                    // this.$root.$emit('bv::show::modal', 'ItrListAlert');
                    this.alert('삭제되었습니다.',this.loadSheet);
                }else{
                    // this.popMsg = '삭제에 실패했습니다..';
                    // this.confirmUse = false;
                    // this.saveChkYn  = false;
                    // this.$root.$emit('bv::show::modal', 'ItrListAlert');
                    this.alert('삭제에 실패했습니다.');
                }
            },
            clickGrid:function(evt){
                if(!this.checkUser(this.userId,'change')){
                    return;
                }
                //console.log(evt.row);
                if(evt.col!= "selectYn"){
                    this.siteInptChkId = evt.row.siteInptChkId;
                    // this.mainName = evt.row.mainName;
                    // this.midName = evt.row.midName;
                    this.mainCodeId = evt.row.mainCodeId;
                    this.midCodeId = evt.row.midCodeId;
                    this.subCodeId = evt.row.subCodeId;
                    this.$root.$emit('bv::show::modal', this.selectPopId);
                }
            },
            insertCheckList:function(){
                this.siteInptChkId = 'default';
                this.$root.$emit('bv::show::modal', this.selectPopId);
            },
            alertConfirmFn:function(){
                if(this.delYn){
                    this.delYn = false;
                    this.deleteCheckList();
                    this.$root.$emit('bv::hide::modal', 'ItrListAlert');
                    return;
                }else if(this.saveChkYn){
                    this.saveChkYn = false;
                    this.$root.$emit('bv::hide::modal', 'ItrListAlert');
                    this.loadSheet();
                    return;
                }
                this.$root.$emit('bv::hide::modal', 'ItrListAlert');
            },
            closePop:function(){
                if(this.saveChkYn){
                    this.saveChkYn = false;
                }
                this.$root.$emit('bv::hide::modal', 'ItrListAlert');
            },
        }
    }
</script>