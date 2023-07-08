<template>
    <b-modal :id="refId" title="공급업체 선택" hide-backdrop size="lg" v-bind:footer-bg-variant="footerBg" v-on:shown="searchReset" static>
        <template #default>
            <div class="pop_container">
                <div class="lookup_box multi_line align_center">
                    <table>
                        <tbody>
                            <tr>
                                <th>업체명</th>   
                                <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="searchValue" v-on:keyup="enterEvent"></td>        
                                <td class="ar">
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="sheetCreate">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div id="supplyPopsheetTable3" class="ibsheet_table" style="height: 337px;"></div>
                </div>

                <PopAlert
                    v-bind:msg="popMsg" v-bind:pop-id="popId"
                    v-on:first-btn-fn="closePop"
                />
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" v-on:click="fnSupplyChoice">선택하기</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" v-on:click="hide('forget')">취소</b-button>
        </template>
    </b-modal>
</template>

<script>
    import { SupplySelect } from '../data/PopupList'
    import PopAlert from '@/pages/common/popup/PopAlert.vue'
    
    import loader from '@ibsheet/loader'
    import {requestOptions, sendPostApi }  from '../../../apis/common';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

    let sheetId = '';

    export default {
        name: 'SupplySelect',
        mixins: [MsgBoxMixins],
        components: {
            PopAlert
        },
        data() {
            return{
                footerBg: 'transparent',

                focusTradeNm: '', //선택한 공급업체명
                focusTradeId: '', //선택한 공급업체id
                focusTradeType: '', //선택한 공급업체 타입

                supplyList : [],

                //검색어
                searchValue: '', //공급업체명
                
                //alert pop
                popMsg: '',
                popId: 'supplyAlert'
            }
        },
        props: {
            // searchValue: {
            //     type: String,
            //     default: ''
            // }
            refId: {
                type: String,
                default: 'SupplySelect',
            },
            siteMstrId:{
                type:String,
                default: '',
            },
        },
        beforeDestroy() {
        //  loader.removeSheet(sheetId)
        },

        mounted() {
      
        },

        created() {
         this.focusTradeId = this.tradeId;
        },

        methods: {
            enterEvent : function(e) { //검색조건 enter event
                if(e.keyCode == 13) {
                    this.sheetCreate();
                }
            },
            searchReset: function(){
                this.searchValue = '';
                this.sheetCreate();
            },
            sheetCreate: async function() {
                /* 임시용 */
                requestOptions.headers['Accept-Language'] = "kr";
                requestOptions.headers['Authorization'] = this.$cookies.get('Authorization');
                //
                let url = '/sendApi/api/popup/partnerCompanySearch/list';
                let param = {};

                if(this.searchValue != '') {
                    param['searchValue'] = this.searchValue;
                }
                if(this.siteMstrId != ''){
                    param['siteMstrId'] = this.siteMstrId;
                }

                const resData = await sendPostApi(url, param).then((result) => {
                return result.data;
                }).catch((e) => {
                return e.response.data;
                });

                let options = SupplySelect.options;
                let data = this.supplyList;

                let cols = [
                    { Name: 'tradeNm', Header: [{ Value: '업체명' }], RelWidth: 65 },
                    { Name: 'tradeId', Header: [{ Value: '사업자번호' }], RelWidth: 35 },
                ]

                options.Cols = cols;
                let canEdit = 0; //ibsheet 수정불가
                let dataMerge = 0;
                let scroll = 1;

                if(resData.rCode == "0000" && resData.datas.resultList.length != 0){
                    this.supplyList = resData.datas.resultList;

                    data = this.supplyList;
                    if(data.length<10){
                        scroll = 1;
                        // document.getElementById('multiEmpTable2').parentElement.style.height = "";
                    }else{
                        scroll = 0;
                        // document.getElementById('multiEmpTable2').parentElement.style.height = "337px";
                    }
                    dataMerge = 0; //병합 X

                    //맨 윗줄 값 가져오기
                    this.focusTradeId = data[0].tradeId;
                    this.focusTradeNm = data[0].tradeNm;
                    this.focusTradeType = data[0].tradeType;
                }else {
                    dataMerge = 2; //행 기준 병합
                    scroll = 1;
                    data = [];
                    this.focusTradeId = '';
                    this.focusTradeNm = '';
                    this.focusTradeType = '';
                }

                loader.createSheet({
                    el: 'supplyPopsheetTable3',
                    data: data,
                    options: {
                        Cfg : {
                            CanEdit : canEdit,
                            DataMerge : dataMerge,
                            NoVScroll: scroll,
                            NoDataMessage:3,
                        },
                        Cols : cols,
                        Events : {
                            onClick: this.fnClick,
                            ondblclick : this.fnDblClick
                        }
                    },
                }).then((sheet) => {
                    sheetId = sheet.id
                });
                this.heightChange(scroll,'supplyPopsheetTable3');
            },
            fnDblClick:function(evt){
                if(evt.row.Kind != 'Data'){
                return;
                }
                this.fnSupplyChoice();
            },
            fnSupplyChoice: function(){//선택 버튼 누를때 event
                if(this.focusTradeId == '') {
                    // this.popMsg = '공급업체를 선택해주세요';
                    // this.$root.$emit('bv::show::modal', 'supplyAlert');
                    this.alert('공급업체를 선택해주세요');
                    return;
                }
                let infoSupply = {
                    tradeId: this.focusTradeId,
                    tradeNm: this.focusTradeNm,
                    tradeType:this.focusTradeType,
                }
                this.$emit('fn-supply-choice', infoSupply);
                this.focusTradeNm = '';
                this.focusTradeId = '';
                this.focusTradeType = '';

                this.searchValue = '';

                this.$root.$emit('bv::hide::modal', this.refId);
            },
            fnClick: function(evtParams){//셀 클릭할때마다
                this.focusTradeNm = evtParams.row.tradeNm;
                this.focusTradeId = evtParams.row.tradeId;
                this.focusTradeType = evtParams.row.tradeType;
            },
            closePop: function() {
                this.$root.$emit('bv::hide::modal', 'SupplyAlert');
            },
            heightChange:function(scroll,div){
                if(scroll == 0){
                document.getElementById(div).parentElement.style.height = "337px";
                }else{
                document.getElementById(div).parentElement.style.height = "";
                }
                document.getElementById(div).style.height = "100%";
            }
        }
    }
</script>