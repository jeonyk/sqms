<template>
    <div class="inner">
        <div class="table_data">
            <div class="move_box">
                <div class="move_box_inner">
                    <div class="data_tit">본사 Set-up 데이터</div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 338px)'}">
                        <div id="itpSelectSheetTable" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
            </div>
            <div class="move_box arrow">
                <button v-if="checkUser(userId,'write')" type="button" class="ico_data_prev" @click="prevClick">이전 영역으로 이동</button>
                <button v-if="checkUser(userId,'write')" type="button" class="ico_data_next" @click="nextClick">다음 영역으로 이동</button>
            </div>
            <div class="move_box">
                <div class="move_box_inner">
                    <div class="data_tit">선택된 데이터
                        <div class="fr">
                            <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkblue" @click="saveChk">저장</button>
                        </div>
                    </div>
                    <!-- ibsheet -->
                    <div class="ib_wrap" :style="{height: 'calc(100vh - 338px)'}">
                        <div id="itpSelectSheetTable2" class="ibsheet_table" style="height: 100%;" />
                    </div>
                </div>
            </div>
        </div>
<!--         <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        /> -->
    </div>
</template>
<script>
    import _ from 'lodash';
    import loader from '@ibsheet/loader'
    /* import PopAlert from '@/pages/common/popup/PopAlert.vue' */
    import { ItpSelect } from '@/pages/common/data/InptOptnList'
    import API from '@/apis/'
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    

    export default {
        name: 'ItpSelect',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            /* PopAlert, */
        },
        data() {
            return {
                siteMstrId:'',
                // mainCodeId:'',
                // midCodeId:'',
                mounted:false,
                // popMsg: '',                                 // 알림창 메세지
                // confirmUse: false,                             // 알림창 버튼개수
                // popId:'ItpSelectAlert',                     // 알림창 Id
                siteItpSelectSheet : null,
                headItpSelectSheet : null,
                selectIds: [],
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
            revId:{
                type:Number,
                default:'',
            },
            userId:{
                type:String,
                default: '',
            }
        },
        mounted(){
            // this.sheetCreate();
            this.initGrid();
            // this.loadSheet();
        },
        watch:{
            mainId : function(){
                if (this.mounted) {
                    // console.log("1 midId : %o", this.mainId);
                    // this.hideRow();
                }
            },
            midId : function(){
                if (this.mounted) {
                    // this.hideRow();
                    this.searchIPTSelData('head');
                }
            },
        },
        methods:{
            initGrid : function(){
                // console.log("init Grid");
                /* 본사 Set-up 데이터 GRID */
                let data    = _.cloneDeep(ItpSelect.data);
                let options = _.cloneDeep(ItpSelect.options);

                options.Events = {
                    onAfterClick: this.fnClick,
                    onDblClick: this.fn_copyRow,
                }

                options.Cfg.ShowFilter = true

                loader.createSheet({
                    el: 'itpSelectSheetTable',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.headItpSelectSheet = sheet;
                });

                /* 선택된 데이터 GRID */
                let choiceData    = _.cloneDeep(ItpSelect.data);
                let choiceOptions = _.cloneDeep(ItpSelect.options);

                choiceOptions.Events = {
                    onDblClick : this.fn_deleteRow,
                    onRenderFirstFinish: this.searchIPTSelData
                };

                loader.createSheet({
                    el: 'itpSelectSheetTable2',
                    data: choiceData,
                    options: choiceOptions,
                }).then((sheet) => {
                    this.siteItpSelectSheet = sheet;
                });
            },
            searchIPTSelData : async function(type){
                this.mounted = true;
                // console.log("searchIPTData")
                this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];

                let param = {
                    'siteMstrId' : this.siteMstrId,
                    'mainCodeId' : this.mainId,
                    'midCodeId' : this.midId,
                    'nextRevisionId' : this.revId
                };

                const rst = await API.inspect.getinptSiteSetUpITPList(param);
                // console.log("rst : %o", rst)

                if(rst.status == '200'){
                    this.headItpSelectSheet.loadSearchData({
                        data: rst.data.datas.dlHead,
                    })
                    if(type != 'head'){
                        this.siteItpSelectSheet.loadSearchData({
                            data: rst.data.datas.dlSite,
                        })
                    }
                }
            },
            loadSheet: async function(){
                // console.log("IPT Select")
                this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
                if(this.siteMstrId!= null && this.siteMstrId!= ''){
                    let param = {
                        'siteMstrId':this.siteMstrId,
                    };
                    if(this.mainId != '' && this.mainId != null){
                        param['mainCodeId'] = this.mainId;
                    }
                    if(this.midId != '' && this.midId != null){
                        param['midCodeId'] = this.midId;
                    }
                    if(this.revId != '' && this.revId != null && parseInt(this.revId) != 0){
                        param['nextRevisionId'] = this.revId;
                    }
                    // let rst = await API.inspect.getHeadSetupItpList(param,{
                    //     headers:{
                    //         'Authorization': this.$cookies.get("Authorization")
                    //     }
                    // });
                    let rst = await API.inspect.getinptSiteSetUpITPList(param);
                    // console.log(rst);

                    let headData = [];
                    let siteData = [];

                    let options = {...ItpSelect.options};
                    let options2 = {...ItpSelect.options};

                    if(rst.status == '200'){
                        headData = rst.data.datas.dlHead;
                        // headData = rst.data.datas.dlITPData;
                        siteData = rst.data.datas.dlSite; //-> 노출시 현장 itp가 있어야할경우
                    }

                    options.Cfg = {NoVScroll: 0,}

                    options.Events = {
                        onAfterClick: this.fnClick,
                        onDblClick: this.fn_copyRow,
                        onRenderFirstFinish: async () => {
                            this.headItpSelectSheet.loadSearchData({
                                data: headData,
                                append: false
                            })
                        },
                    }

                    loader.createSheet({
                        el: 'itpSelectSheetTable',
                        data: headData,
                        options: options,
                    }).then((sheet) => {
                        this.headItpSelectSheet = sheet;
                    });

                    options2.Cfg = {NoVScroll: 0,}

                    options2.Events = {
                        onDblClick: this.fn_deleteRow,
                        onRenderFirstFinish: async () => {
                            this.siteItpSelectSheet.loadSearchData({
                                data: siteData,
                                append: false
                            })
                        },
                    }
                    loader.createSheet({
                        el: 'itpSelectSheetTable2',
                        data: siteData,
                        options: options2,
                    }).then((sheet) => {
                        this.siteItpSelectSheet = sheet;
                    });
                }
            },
            saveChk: function(){
                let sheet = this.siteItpSelectSheet.getShownRows(0);
                let siteInsertIds = this.selectIds;
                sheet.forEach(item => {
                    // 신규 추가 인경우
                    if(!item.siteInptMngtId){
                        const obj = {
                            inptMngtId : item.inptMngtId,
                            status : 'Added',
                        }
                        siteInsertIds.push(obj);
                    }
                });
                // console.log("siteInsertIds : %o", siteInsertIds);

                if( siteInsertIds.length == 0 ){
                    this.alert('저장할 데이터가 없습니다.');
                    return;
                }
                else{
                    this.confirm('저장하시겠습니까?', async() => {
                            let param = {
                                'param':{
                                    'siteMstrId':this.siteMstrId,
                                },
                                'listData':siteInsertIds,
                            };
                            // console.log('param',param);

                            try{
                                const response = await API.inspect.setinptSiteSetUpITPList(param,{
                                    headers:{
                                        'Authorization': this.$cookies.get("Authorization")
                                    }
                                });
                                //console.log('response', response);
                                if(response.status == '200'){
                                    this.alert('저장되었습니다.', () => {
                                        this.selectIds = [];
                                        this.searchIPTSelData();
                                    });
                                }
                                else{
                                    return this.alert('저장에 실패했습니다.');    
                                }
                            }catch(error){
                                return this.alert('저장에 실패했습니다.');
                            }
                    });
                }
            },
            hideRow:function(){
                let sheet = this.headItpSelectSheet;
                let rows = sheet.getDataRows();
                let count = 0;
                //console.log(rows.length);
                for(let i = 0; i <rows.length; i++){
                    //console.log(rows[i].mainCodeId,this.mainId);
                    if(this.mainId == '' || this.mainId == null){
                        sheet.showRow(rows[i]);
                        count++;
                    }else{
                        if(rows[i].mainCodeId == this.mainId){
                            if(this.midId == '' || this.midId == null){
                                sheet.showRow(rows[i]);
                                count++;
                            }else{
                                if(rows[i].midCodeId == this.midId){
                                    sheet.showRow(rows[i]);
                                    count++;
                                }else{
                                    sheet.hideRow(rows[i]);
                                }
                            }
                        }else{
                            sheet.hideRow(rows[i]);
                        }
                    }
                }
            },
            prevClick:function(){
                let sheet = this.siteItpSelectSheet;
                let rows = sheet.getRowsByChecked("selectYn");
                if(rows == []||rows.length == 0){
                    return this.alert('선택된 행이 없습니다.');
                } else {
                    for(let i = 0;i <rows.length; i++){
                        rows[i]['selectYn'] = 0;
                        if(rows[i]['siteInptMngtId'] != null && rows[i]['siteInptMngtId'] != ''){
                            this.selectIds.push({
                                inptMngtId : rows[i]['inptMngtId'],
                                siteInptMngtId : rows[i]['siteInptMngtId'],
                                status : 'Deleted',
                            });
                        }
                    }
                    
                    this.headItpSelectSheet.copyRows({rows:rows,next:this.headItpSelectSheet.getFirstRow()});
                    sheet.removeRows(rows);
                    if(sheet.getDataRows().length == 0){
                        sheet.loadSearchData({}, 0 );
                    }
                }
            },
            nextClick:function(){
                let sheet = this.headItpSelectSheet;
                let rows = sheet.getRowsByChecked("selectYn");
                if(rows == []||rows.length == 0){
                    return this.alert('선택된 행이 없습니다.');
                }else{
                    for(let i = 0;i <rows.length; i++){
                        rows[i]['selectYn'] = 0;
                    }
                    this.siteItpSelectSheet.copyRows({rows:rows,next:this.siteItpSelectSheet.getFirstRow()});
                    sheet.removeRows(rows);
                    if(sheet.getDataRows().length == 0){
                        sheet.loadSearchData({}, 0 );
                    }
                }
            },
            fn_copyRow(evt){
                let clickRow = evt.row;
                if(clickRow){
                    if(!clickRow.inptMngtId){
                        return;
                    }

                    this.siteItpSelectSheet.copyRow({row:clickRow, next:this.siteItpSelectSheet.getFirstRow()});

                    // this.headItpSelectSheet.deleteRow(clickRow);
                    this.headItpSelectSheet.hideRow({
                        row: clickRow,
                        norender: false
                    });

                    clickRow = null;
                    // copiedRow['isChecked'] = false
                    // this.selectProjectSheet.refreshCell(copiedRow, 'selectYn')
                    if(!this.headItpSelectSheet.getShownRows(0) 
                        || 0 >= this.headItpSelectSheet.getShownRows(0).length){
                        this.headItpSelectSheet.loadSearchData({}, 0 );
                    }
                }
            },
            fn_deleteRow(evt){
                let clickRow = evt.row;
                if(clickRow){
                    if(!clickRow.inptMngtId){
                        return;
                    }

                    this.headItpSelectSheet.copyRow({row:clickRow, next:this.headItpSelectSheet.getFirstRow()});

                    // this.siteItpSelectSheet.deleteRow(clickRow);
                    this.selectIds.push({
                        inptMngtId : clickRow.inptMngtId,
                        siteInptMngtId : clickRow.siteInptMngtId,
                        status : 'Deleted',
                    });
                    this.siteItpSelectSheet.hideRow({
                        row: clickRow,
                        del: false,
                        norender: false
                    });

                    clickRow = null;
                    // copiedRow['isChecked'] = false
                    // this.selectProjectSheet.refreshCell(copiedRow, 'selectYn')

                    if(!this.siteItpSelectSheet.getShownRows(0) 
                        || 0 >= this.siteItpSelectSheet.getShownRows(0).length){
                        this.siteItpSelectSheet.loadSearchData({}, 0 );
                    }
                }
            },
            fnClick:function(evt){
                // console.log(evt.row);
            },
        }
    }
</script>
