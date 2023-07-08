<!--
    업무 : 경영검토
    2022.06.02
 -->
<template>
        <!-- 보고서 생성 팝업 -->
         <b-modal id="ReviewWrite" title="보고서 생성" modal-footer no-close-on-backdrop size="lg" :footer-bg-variant="footerBg" @shown="loadPopup">
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list table_write mt0">
                        <table>
                            <caption class="sr_only"></caption>
                            <colgroup>
                                <col width="15%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><span class="emp_red">보고서 제목</span></th>
                                    <td><input type="text"  v-model="registInfo.reviewTitle" ref="reviewTitle" class="form_control"></td>
                                </tr>
                                <tr>
                                    <th><span class="emp_red">데이터 기준</span></th>
                                    <td>
                                        <date-picker-range ref="dateStr" v-model="registInfo.dateStr" :format="'YYYYMMDD'" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="reviewTitleSave()">확인</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')"> 닫기</b-button>
            </template>
        </b-modal> 

</template>

<script>
import Datepicker from '@component/common/DatePicker.vue'
import DatePickerRange from '@component/common/DatePickerRange.vue'
import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
import { commonFn } from '@/script/commonFn.js';
import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'

import { sendPostApi, requestOptions } from '@/apis/common';
    
    export default {
        name: 'ReviewSheet',
        mixins: [MsgBoxMixins],
        components: {
            Datepicker,
            DatePickerRange,
            WrappedAlert
        },
        data() {
            return {
                categoryData : [],
                footerBg: 'transparent',
                registInfo: {
                    reviewTitle : '',
                    dateStr : [null, null]
                },
                resultParam :{},
                popup: {
                    title: '',
                    isShow: false,
                    message: '',
                    useCancelButton: false,
                    buttonName: {},
                    refId: 'reviewTitleAlert',
                    purpose: '',
                },
                default: {},
            }
        },
        created() {
        },
        mounted() {
        },
        beforeDestroy() {
        },
        methods: {
            loadPopup() {   // popup shown
                // 초기화
                this.registInfo.reviewTitle = "";
                this.registInfo.dateStr = [null, null];
            },
            reviewTitleSave : function() {
                if(!this.registInfo.reviewTitle){
                    this.alert('제목은 필수 입력 항목입니다.')
                    return
                }
                if(!this.registInfo.dateStr[0]){
                    this.alert('데이터 기준 기간 선택은 필수 항목 입니다.')
                    return
                }
                
                this.confirm('보고서를 생성하시겠습니까?', () => {
                    this.reviewWrite();
                })
                
            },
            reviewWrite : async function() {
                let url   = '/sendApi/api/stats/review/reviewTitle/write';
                let param = { 
                    siteMstrId : this.$cookies.get('siteMstrId'),
                    reviewTitle : this.registInfo.reviewTitle,
                    dataStartDt : this.registInfo.dateStr[0],
                    dataEndDt : this.registInfo.dateStr[1]
                 };

                try {
                    await sendPostApi(url, param).then(detailData => {
                        if( detailData.data.rCode == "0000" ){
                            this.resultParam = detailData.data.datas.dmReviewData;
                            this.alert('보고서 생성에 성공하였습니다.',()=>{
                                this.$emit('responseTitleSaveForm', this.resultParam);
                            })
                        }
                    })
                    
                } catch (error) {
                    console.log("ERROE:"+error)
                }
            },
        }
    }
</script>