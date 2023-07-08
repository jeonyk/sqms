<template>
    <b-modal :id="refId" title="엑셀 다운로드"
        size="xl" @shown="sheetLoad"
        :footer-bg-variant="footerBg" static>
        <template #default>
            <div class="pop_container">
                <div class="ib_wrap">
                    <div :id="`excelDownloadModal_${popIdx}`" class="ibsheet_table" style="max-height: 337px;"></div>
                </div>
            </div>
        </template>
        <template #modal-footer="{ }">
            <b-button class="btn btn_md btn_outline btn_gray" v-on:click="closePop">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
import { testExpense2} from '@/pages/common/data/MaterialsList'
import { DetectionAdmin3 } from '@/pages/common/data/InptOptnList'
import { sendPostApi, requestOptions } from '@/apis/common';
import API from '@/apis/'
import loader from '@ibsheet/loader'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
export default {
    name: 'ExcelDownloadModal',
    mixins: [MsgBoxMixins],
    components: {

    },
    data() {
        return {
            footerBg: 'transparent',
            excelSheet:null,
            sheetId:'',
        }
    },
    props:{
        siteMstrId:{
            type:String,
            default:'',
        },
        id:{
            type:String,
            default:'',
        },
        type:{
            type:String,
            default: '',
        },
        popIdx:{
            type:String,
            default: '0',
        },
        refId:{
            type:String,
            default: 'ExcelDownloadModal',
        },
        title:{
            type:String,
            default: '',
        },
        detailObj:{
            type: Object,
            default: function () {
                return {}
            }
        },
    },
    mounted(){

    },
    methods:{
        sheetLoad : async function(){
            let siteRst = null;
            let param = {};
            if(this.type == 'COST'){
                param['siteMstrId'] = this.siteMstrId;
                param['siteQltyCostHisId'] = this.id;
                siteRst = await API.crack.getCostIbsheetView(param,{
                    headers:{
                        //'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log(siteRst);
                if(siteRst.status == 200){
                    let data = siteRst.data.resultList;
                    let options = testExpense2.options;
                    // console.log(data.length);
                    options.Events = {
                        onRenderFirstFinish:this.excelDownload,
                    };
                    loader.createSheet({
                        el: `excelDownloadModal_${this.popIdx}`,
                        data: data,
                        options: options,
                    }).then((sheet) => {
                        this.excelSheet = sheet;
                        this.sheetId = sheet.id;//필수
                    });//시트 불러오기
                }
            }else if(this.type == 'INPT'){
                
                param['nextRevisionId'] = this.detailObj.nextRevisionId;
                param['itpNo'] = this.detailObj.itpNo;
                param['siteMstrId'] = this.detailObj.siteMstrId;

                siteRst = await API.inspect.inptITPWritngList(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log(siteRst);
                if(siteRst.data.rCode == '0000'){
                    let data = siteRst.data.datas.dlWritng;
                    let options = DetectionAdmin3.options;
                    options.Events = {
                        onRenderFirstFinish:this.excelDownload,
                    };
                    loader.createSheet({
                        el: `excelDownloadModal_${this.popIdx}`,
                        data: data,
                        options: options,
                    }).then((sheet) => {
                        sheet.hideCol("selectYn");
                        this.excelSheet = sheet;
                        this.sheetId = sheet.id;//필수
                    });//시트 불러오기
                }
            }
        },
        closePop: function(){
            this.$root.$emit('bv::hide::modal', this.refId);
        },
        excelDownload: function(evt){
            if(this.sheetId != evt.sheet.id){
                // console.log('old',this.sheetId,'new',evt.sheet.id);
                return;
            }
            evt.sheet.down2Excel({
                merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                reqHeader:  {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Accept-Language': 'ko'
                },
                fileName:   `${this.title}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
            })

            return;
            // this.alert('준비중입니다.');
        },
    }
}
</script>