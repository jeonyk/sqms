<template>
    <div class="inner type2">
        <div class="button_box">
            <!-- <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel()">엑셀 다운로드</button> -->
            <div class="fr">
                <button v-if="checkUser(userId,'unuse')" type="button" class="btn btn_sm btn_darkgray" @click="delRow">삭제</button>
            </div>
        </div>

        <!-- ibsheet -->
        <div class="ib_wrap" style="height: calc(100vh - 310px)">
            <div id="itpListSheetTable2_1" class="ibsheet_table" style="height:100%"></div>
        </div>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
        <ExcelDownloadModal :pop-idx="'1'" :type="'INPT'" :title="detailObj.title"
            :ref-id="'siteInptExcelDownloadModal'" :detail-obj="detailObj"/>
    </div>
</template>
<script>
    import loader from '@ibsheet/loader'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    import { ItpList } from '@/pages/common/data/InptOptnList'
    import API from '@/apis/'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import ExcelDownloadModal from '@modal/common/ExcelDownloadModal.vue';
    export default {
        name: 'ItpList',
        mixins: [authCheckMixns,MsgBoxMixins],
        components: {
            PopAlert,
            ExcelDownloadModal,
        },
        data() {
            return {
                siteMstrId:'',
                // mainCodeId:'',
                // midCodeId:'',
                mounted:false,
                popMsg: '',                                 // 알림창 메세지
                confirmUse: false,                             // 알림창 버튼개수
                popId:'ItpListAlert',                     // 알림창 Id
                siteItpListSheet:null,
                delChkYn:false,
                saveChkYn:false,
                delIds:[],
                detailObj:{
                    title:'',
                    siteMstrId : '',
                    siteInptMngtId : '',
                    nextRevisionId : ''
                },
            }
        },
        props:{
            // mainId:{
            //     type:String,
            //     default:'',
            // },
            // midId:{
            //     type:String,
            //     default:'',
            // },
            userId:{
                type:String,
                default: '',
            }
        },
        mounted(){
            // this.sheetCreate();
            this.mounted = true;
            this.loadSheet();
        },
        // watch:{
        //     mainId : function(){
        //         if (this.mounted) {
        //             this.loadSheet();
        //         }
        //     },
        //     midId : function(){
        //         if (this.mounted) {
        //             this.loadSheet();
        //         }
        //     },
        // },
        methods:{
            loadSheet: async function(){
                this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
                if(this.siteMstrId!= null && this.siteMstrId!= ''){
                    let param ={
                        'siteMstrId':this.siteMstrId
                    };
                    let rst = await API.inspect.siteItpDataList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(rst);

                    /* ITP 리스트 */
                    let data = [];
                    let options = ItpList.options;
                    
                
                    options.Events = {
                        onAfterClick: this.fnClick,                        
                    };

                    if(rst.data.rCode == '0000'){
                        data = rst.data.datas.dlItp;
                        for(let i = 0; i<data.length; i++){
                            data[i]['downBtn'] = 0;                                    
                        }
                    }

                    loader.createSheet({
                        el: 'itpListSheetTable2_1',
                        // id: 'siteItpListSheet1',
                        data: data,
                        options: options,
                    }).then((sheet) => {
                        this.siteItpListSheet = sheet;
                    });
                }
            },
            delRow: function(){ //행삭제
                //console.log('dd');
                let sheet = this.siteItpListSheet;
                this.delChkYn = false;
                let rows = sheet.getRowsByChecked("selectYn");
                //console.log(rows);
                if(rows == []||rows.length == 0){
                    this.alert('선택된 행이 없습니다.');
                    return
                    // this.confirmUse = false;
                    // this.popMsg = '선택된 행이 없습니다.';
                    // this.$root.$emit('bv::show::modal', 'ItpListAlert');
                }else{
                    for(let i =0; i< rows.length; i++){
                        let id = {
                            // 'siteMstrId':this.siteMstrId,
                            'revisionId':rows[i].revisionId,
                            'codeType':rows[i].codeType,
                            'status':'Deleted',
                        };
                        if(id.revisionId != '' && id.revisionId != null){
                            this.delIds.push(id);
                        }
                    }
                    if(this.popMsg == ''){
                        this.confirm('삭제하시겠습니까?',()=>{
                            this.finalDel();
                        });
                        // this.confirmUse = true;
                        // this.popMsg = '삭제하시겠습니까?';
                        // this.delChkYn = true;
                        // this.$root.$emit('bv::show::modal', 'ItpListAlert');
                        // //console.log(this.delIds);
                        // return;
                    }
                }
            },
            finalDel: async function(){
                this.saveChkYn = false;
                let param ={
                    'param':{
                        'siteMstrId':this.siteMstrId,
                    },
                    'listData':this.delIds,
                };
                let rst = await API.inspect.siteItpDataDelete(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(rst);
                 if(rst.status==200){
                    this.alert('삭제되었습니다',()=>{
                        this.loadSheet();
                    });
                    return
                    // this.popMsg = '삭제되었습니다';
                    // this.delIds = [];
                    // this.confirmUse = false;
                    // this.saveChkYn  = true;
                    // this.$root.$emit('bv::show::modal', 'ItpListAlert');
                }else{
                    this.alert('삭제에 실패했습니다.');
                    // this.popMsg = '삭제에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.saveChkYn  = false;
                    // this.$root.$emit('bv::show::modal', 'ItpListAlert');
                }
            },
            alertConfirmFn:function(){
                if(this.delChkYn){
                    this.delChkYn = false;
                    this.finalDel();
                }
                if(this.saveChkYn){
                    this.saveChkYn = false;
                    this.loadSheet();
                    this.popMsg = '';
                }
                this.$root.$emit('bv::hide::modal', 'ItpListAlert');
            },
            closePop:function(){
                if(this.delChkYn){
                    this.delChkYn = false;
                }
                this.$root.$emit('bv::hide::modal', 'ItpListAlert');
            },
            excelDown: function(){
                this.alert('준비중입니다.');
            },
            excelUpload: function(){
                this.alert('준비중입니다');
            },

            /** 엑셀 다운로드 */
            fn_exportExcel: function () {
                this.detailObj = {title:'',};
                let rows = this.siteItpListSheet.getRowsByChecked('selectYn');
                if(rows.length == 0){
                    this.alert('선택된 행이 없습니다.');
                    return;
                }else if(rows.length>1){
                    this.alert('하나의 행만 선택해주세요.');
                    return;
                }else{
                    this.detailObj = {
                        'nextRevisionId':rows[0].revisionId,
                        'siteMstrId':rows[0].siteMstrId,
                        'title':rows[0].title,
                    }; 
                    // console.log(this.detailObj);
                    this.$root.$emit('bv::show::modal', 'siteInptExcelDownloadModal');
                }
                // sheet.down2Excel({
                //     merge:      2,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `ITPLIST_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            fnClick:function(evt){
                // console.log(evt.row);
                if(!this.checkUser(this.userId,'down')){
                    return;
                }
                if(evt.col == 'downBtn'){
                    


                    this.detailObj.title = evt.row.title;
                    
                    this.detailObj.itpNo = evt.row.itpNo;
                    this.detailObj.nextRevisionId = evt.row.revisionId;
                    this.detailObj.siteMstrId = this.siteMstrId;
                                        
                    this.$root.$emit('bv::show::modal', 'siteInptExcelDownloadModal');
                }
            }
        }
    }
</script>