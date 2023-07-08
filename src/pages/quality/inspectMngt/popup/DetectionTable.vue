<template>
    <b-modal :id="refId" title="검측 점검표 검색" 
        hide-backdrop size="lg" @shown="sheetLoad" 
        :footer-bg-variant="footerBg" static>
        <template #default>
            <div class="pop_container">
                <div class="lookup_box multi_line align_center mb20">
                    <table>
                        <caption class="sr_only"></caption>
                        <tbody>
                            <tr>
                                <th>공종</th>   
                                <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="mainNm" disabled></td>        
                                <th>세부 공종</th>
                                <td><input type="text" id="midCode" class="form_control" placeholder="입력해주세요" v-model="midNm" disabled></td>
                                <!-- <td class="ar">
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search">검색</button>
                                </td> -->
                            </tr>
                            <tr>
                                <th>세부 공종</th>
                                <td colspan="3"><input type="text" id="subCode" class="form_control" placeholder="입력해주세요" v-model="subNm" disabled></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="ib_wrap">
                    <div id="checkListPopsheetTable" class="ibsheet_table" style="max-height: 337px"></div>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="fnChoice">선택</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">취소</b-button>
        </template>
    </b-modal>
</template>
<script>
import { DetectionTable } from '../../../common/data/PopupList'
import API from '@/apis/'
import PopAlert from '@/pages/common/popup/PopAlert.vue' 
import loader from '@ibsheet/loader'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

export default {
    name: 'DetectionTable',
    mixins: [MsgBoxMixins],
    components: {
        PopAlert,
    },
    data() {
        return {
            footerBg: 'transparent',

            popMsg: '',                                 // 알림창 메세지
            confirmUse: false,                             // 알림창 버튼개수
            popId:'detectionAlert',                     // 알림창 Id
            siteMstrId:'',
            midName: '',
            popSheet:null,
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
        subId:{
            type:String,
            default:'',
        },
        mainNm:{
            type:String,
            default:'',
        },
        midNm:{
            type:String,
            default:'',
        },
        subNm:{
            type:String,
            default:'',
        },
        refId:{
            type:String,
            default:'DetectionTable',
        }
    },
    beforeDestroy(){
        // loader.removeSheet('DetectionTable1');
    },
    mounted(){
        this.siteMstrId = this.$cookies.get("siteMstrId");
    },
    methods:{
        sheetLoad: async function() {
            // this.midName = this.midNm=='선택'?'':(this.midId != '' && this.midId != null?this.midNm:'');
            // console.log(this.midName, this.midId);
            // loader.removeSheet('DetectionTable1');
            let param = {
                'siteMstrId' : this.siteMstrId,
                'mainCodeId' : this.mainId,
                'midCodeId' : this.midId,
                'subCodeId' : this.subId,
            };

            let rst = await API.inspect.getinptSiteSetUpITRList(param,{
                headers:{
                    'Authorization': this.$cookies.get("Authorization")
                }
            });
            //console.log(rst);

            let data = [];
            let options = DetectionTable.options;
            if(rst.data.rCode == '0000'){
                data = rst.data.datas.dlItpChk;
            }
            
            loader.createSheet({
                el: 'checkListPopsheetTable',
                // id:'DetectionTable1',
                data: data,
                options: {
                    Cfg: {
                        NoVScroll: 0,
                        NoDataMessage:3,
                        CanEdit:0,
                    },
                    Events:{
                        ondblclick:this.fnChoice,
                    },
                    Cols: options.Cols,
                }
            }).then((sheet) => {
                this.popSheet = sheet
                // sheet.hideCol('mtrlSpApprId');
            });
        },
        fnChoice:function(){
            //console.log(this.popSheet.getFocusedRow());
            if(typeof(this.popSheet.getFocusedRow()) =='undefined'){
                // this.popMsg = '선택된 행이 없습니다.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'detectionAlert');
                this.alert('선택된 행이 없습니다.');
                return;
            }else if(this.popSheet.getFocusedRow().siteInptChkId == '' ||this.popSheet.getFocusedRow().siteInptChkId == null){
                // this.popMsg = '선택된 행이 없습니다.';
                // this.confirmUse = false;
                // this.$root.$emit('bv::show::modal', 'detectionAlert');
                this.alert('선택된 행이 없습니다.');
                return;
            }else{
                let chkLst = {
                    'siteInptChkId':this.popSheet.getFocusedRow().siteInptChkId,
                    'chkTitle':this.popSheet.getFocusedRow().chkTitle,
                };
                this.$emit('fn-choice',chkLst);
                this.$root.$emit('bv::hide::modal',this.refId);
            }
        },
        alertConfirmFn:function(){
            this.$root.$emit('bv::hide::modal', 'detectionAlert');
        },
        closePop:function(){
            this.$root.$emit('bv::hide::modal', 'detectionAlert');
        },
    }
}
</script>