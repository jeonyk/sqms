<template>
    <!-- 타 프로젝트 데이터 가져오기 (ITP) 팝업 -->
    <b-modal id="ItpProjectLoad" title="타 프로젝트 데이터 가져오기 (ITP)" hide-footer
        modal-class="single_page" size="xl" @shown="resetSheet"
        :footer-bg-variant="footerBg" static>
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="tab_area submenu_on">
                        <div class="lookup_box">
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
                                                <input type="text" placeholder="검색" class="form_control" v-model="projectViewNm" v-b-modal.ItpSelectOtherProject>
                                                <button type="button" class="btn_search" v-b-modal.ItpSelectOtherProject>검색</button>
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
                                    <div id="itpProjectLoadPopsheetTable2" class="ibsheet_table"></div>
                                </div>
                                
                                <div class="button_box ac">
                                    <button type="button" class="btn btn_lg btn_outline btn_blue" @click="insertChkYn">선택</button>
                                    <button type="button" class="btn btn_lg btn_outline btn_darkgray"  @click="$bvModal.hide('ItpProjectLoad')">닫기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CommonProjectSelect v-on:fn-other-project-choice="writeForm" v-bind:project-select-id="projectSelectId" v-bind:set-cookies="false"/>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
            </div>
        </template>
    </b-modal>
</template>
<script>
    import TreeCategoryTab from "@/pages/quality/materialMngt/component/TreeCategoryTab"
    import loader from '@ibsheet/loader'
    // import ProjectSelect from '../../../common/popup/ProjectSelect.vue'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import { DetectionAdmin2 } from '../../../common/data/PopupList'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import CommonProjectSelect from '@/pages/common/popup/CommonProjectSelect.vue';
    import API from '@/apis/'

    export default {
        name: 'ItpProjectLoad',
        mixins: [MsgBoxMixins],
        components: {
            TreeCategoryTab,
            PopAlert,
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
                popId:'ItpPopAlert',                     // 알림창 Id
                itpLoadSheet:null,

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

                projectSelectId:'ItpSelectOtherProject',
                projectNm:'',
                projectViewNm:'',
                otrSiteMstrId:'',
                allChkYn: false,
                chkYn: false,
                saveYn:false,
                insertIds: [],
            }
        },
        props:{
            siteId:{
                type:String,
                default:'',
            },
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
                        this.sheetLoad2();
                    }
                },
                deep: true
            },
        },
        beforeDestroy() {
            // loader.removeSheet('itpLoadSheet');
        },
        methods:{
            resetSheet: function(){
                this.projectNm = '';
                this.projectViewNm = '';
                this.sheetLoad2();
            },
            sheetLoad2: async function() {
                // loader.removeSheet('itpLoadSheet');
                let param = {};
                let data = [];
                let options = DetectionAdmin2.options;
                if(this.projectNm != null && this.projectNm != ''){
                    param['otrSiteMstrId'] = this.otrSiteMstrId;
                }
                if(this.mainCodeId != null && this.mainCodeId != ''){
                    param['mainCodeId'] = this.mainCodeId;
                }
                if(this.midCodeId != null && this.midCodeId != ''){
                    param['midCodeId'] = this.midCodeId;
                }
                const othrRst = await API.inspect.otrPrjctDataList(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(othrRst);
                if(othrRst.status == '200'){
                    //console.log(othrRst);
                    data = othrRst.data.datas.dlPrjctData;
                }

                loader.createSheet({
                    el: 'itpProjectLoadPopsheetTable2',
                    // id:'itpLoadSheet',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.itpLoadSheet= sheet;
                })
            },
            //전체 가져오기 클릭
            insertAllChkYn:function(){
                this.allChkYn = false;
                this.insertIds = [];
                let rows =this.itpLoadSheet.getDataRows();
                if(0 >= rows.length){
                    return this.alert('선택된 행이 없습니다.');
                }
                else{
                    this.confirm('타 프로젝트 데이터를 가져올 시, 기존 데이터가 삭제됩니다. 데이터를 가져오시겠습니까?', async () => {
                    for(let x = 0; x<rows.length; x++){
                        let temp = {};
                        temp['siteInptMngtId'] = rows[x].siteInptMngtId;
                        temp['siteInptMngtId'] = rows[x].siteInptMngtId;
                        temp['mainCodeId'] = rows[x].mainCodeId;
                        temp['mainName'] = rows[x].mainName;
                        temp['midCodeId'] = rows[x].midCodeId;
                        temp['midName'] = rows[x].midName;
                        temp['inptMngtId'] = rows[x].inptMngtId;
                        temp['inptStep'] = rows[x].inptStep;
                        temp['inptIem'] = rows[x].inptIem;
                        temp['chkIem'] = rows[x].chkIem;
                        temp['chkFreq'] = rows[x].chkFreq;
                        temp['chkStd'] = rows[x].chkStd;
                        temp['chkMtd'] = rows[x].chkMtd;
                        temp['relateHis'] = rows[x].relateHis;
                        temp['ccpyTradeType'] = rows[x].ccpyTradeType;
                        temp['cnstrctTradeChrgType'] = rows[x].cnstrctTradeChrgType;
                        temp['cnstrctTradeRspnberType'] = rows[x].cnstrctTradeRspnberType;
                        temp['cnstrctTradeChkType'] = rows[x].cnstrctTradeChkType;
                        temp['spvsTradeType'] = rows[x].spvsTradeType;
                        temp['comment'] = rows[x].comment;
                        this.insertIds.push(temp);
                    }

                        this.$emit('allData', this.insertIds)
                        this.$bvModal.hide('ItpProjectLoad')
                    });
                }
            },
            // insertAllChkLst: async function(){
             
            //     this.saveYn = false;
            //     let param = {
            //         'otrSiteMstrId':this.otrSiteMstrId,
            //         'siteMstrId':this.siteId,
            //     };
            //     //전체 가져오기
            //     let checkRstAll = await API.inspect.otrPrjctDataAllWrite(param,{
            //         headers:{
            //             'Authorization': this.$cookies.get("Authorization")
            //         }
            //     });
            //     //console.log(checkRstAll);
            //     if(checkRstAll.status==200){
            //         this.alert('저장되었습니다.', () => {
            //             this.$bvModal.show('ItpPopAlert');
            //         });
            //     }else{
            //         return this.alert('저장에 실패했습니다.');
            //     }
            // },
            //선택 가져오기
            insertChkYn:function(){
                
                this.chkYn = false;
                this.insertIds = [];
                let rows =this.itpLoadSheet.getRowsByChecked('selectYn');
                // console.log(rows)
                if(rows.length == 0){
                    return this.alert('선택된 데이터가 없습니다.');
                }
                for(let x = 0; x<rows.length; x++){
                    let temp = {};
                    temp['siteInptMngtId'] = rows[x].siteInptMngtId;
                    temp['siteInptMngtId'] = rows[x].siteInptMngtId;
                    temp['mainCodeId'] = rows[x].mainCodeId;
                    temp['mainName'] = rows[x].mainName;
                    temp['midCodeId'] = rows[x].midCodeId;
                    temp['midName'] = rows[x].midName;
                    temp['inptMngtId'] = rows[x].inptMngtId;
                    temp['inptStep'] = rows[x].inptStep;
                    temp['inptIem'] = rows[x].inptIem;
                    temp['chkIem'] = rows[x].chkIem;
                    temp['chkFreq'] = rows[x].chkFreq;
                    temp['chkStd'] = rows[x].chkStd;
                    temp['chkMtd'] = rows[x].chkMtd;
                    temp['relateHis'] = rows[x].relateHis;
                    temp['ccpyTradeType'] = rows[x].ccpyTradeType;
                    temp['cnstrctTradeChrgType'] = rows[x].cnstrctTradeChrgType;
                    temp['cnstrctTradeRspnberType'] = rows[x].cnstrctTradeRspnberType;
                    temp['cnstrctTradeChkType'] = rows[x].cnstrctTradeChkType;
                    temp['spvsTradeType'] = rows[x].spvsTradeType;
                    temp['comment'] = rows[x].comment;
                    this.insertIds.push(temp);
                }
                this.confirm('데이터를 가져오시겠습니까?', async ()=> {
                    this.$emit('dataChoice', this.insertIds)
                    this.$bvModal.hide('ItpProjectLoad')
                });
            },
            // insertChkLst: async function(){
            //     this.saveYn = false;
            //     let checkRst = {'status':''};
            //     let param = {
            //         'param':{
            //             // 'otrSiteMstrId':this.otrSiteMstrId,
            //             'siteMstrId':this.siteId,
            //         },
            //         'listData':this.insertIds,
            //     };

            //     // 수정
            //     //선택 가져오기
            //     return alert('dd');
            //     checkRst = await API.inspect.otrPrjctDataChoiceWrite(param,{
            //         headers:{
            //             'Authorization': this.$cookies.get("Authorization")
            //         }
            //     });
            //     //console.log(checkRst);
            //     if(checkRst.status==200){
            //         // this.popMsg = '데이터 등록이 완료되었습니다';
            //         // this.confirmUse = false;
            //         // this.saveYn  = true;
            //         // this.$root.$emit('bv::show::modal', 'ItpPopAlert');
            //         this.alert('등록되었습니다.',()=>{
            //             this.$emit('fn-close',true);
            //             this.$root.$emit('bv::hide::modal', 'ItpProjectLoad');
            //         });
            //     }else{
            //         // this.popMsg = '오류로 인해 등록이 완료되지않았습니다.';
            //         // this.confirmUse = false;
            //         // this.saveYn  = true;
            //         // this.$root.$emit('bv::show::modal', 'ItpPopAlert');
            //         this.alert('등록에 실패했습니다.');
            //         return;
            //     }
            // },
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
                    this.$emit('fn-close',true);
                    this.$root.$emit('bv::hide::modal', 'ItpProjectLoad');
                }
                this.$root.$emit('bv::hide::modal', 'ItpPopAlert');
            },
            closePop:function(){
                this.allChkYn = false;
                this.chkYn = false;
                this.saveYn = false;
                this.$root.$emit('bv::hide::modal', 'ItpPopAlert');
            },
            writeForm : function(infoObj) {
                //console.log(infoObj);
                this.projectNm = infoObj.projectId;
                this.projectViewNm = infoObj.projectNm;
                this.otrSiteMstrId = infoObj.siteMstrId;
                this.$root.$emit('bv::hide::modal', this.projectSelectId);
                this.sheetLoad2();
            },
        }
    }
</script>
