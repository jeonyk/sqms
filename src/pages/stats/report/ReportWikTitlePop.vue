<!--
    업무 : 주간업무보고
    2022.05.07
 -->
<template>
        <!-- 보고서 생성 팝업 -->
         <b-modal id="ReportWrite" title="보고서 생성" modal-footer no-close-on-backdrop size="lg" :footer-bg-variant="footerBg" @shown="loadPopup">
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
                                    <td><input type="text"  v-model="registInfo.reportTitle" ref="reportTitle" class="form_control"></td>
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
                <!-- alert popup -->
                <wrapped-alert
                    refs="alertPopup"
                    :ref-id="popup.refId"
                    :title="popup.title"
                    :is-show.sync="popup.isShow"
                    :message="popup.message"
                    :purpose="popup.purpose"
                    :use-cancel-button="popup.useCancelButton"
                    @click-confirm="clickPopupConfirm"
                    @click-cancel="clickPopupCancel"
                />
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="reportTitleSave()">확인</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')"> 닫기</b-button>
            </template>
        </b-modal> 

</template>

<script>
import Datepicker from '@component/common/DatePicker.vue'
import DatePickerRange from '@component/common/DatePickerRange.vue'
import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";

import { sendPostApi, requestOptions } from '@/apis/common';
    
    export default {
        name: 'WikReportSheet',
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
                    reportTitle : '',
                    dateStr : [null, null]
                },
                resultParam :{},
                popup: {
                    title: '',
                    isShow: false,
                    message: '',
                    useCancelButton: false,
                    buttonName: {},
                    refId: 'reportTitleAlert',
                    purpose: '',
                },
                default: {
                    popup: {
                        saveConfrim: {
                            title: '알림',
                            message: '보고서를 생성하시겠습니까?',
                            purpose: 'wikReportWrite',
                            useCancelButton: true,
                            buttonName: {
                                confirm: '확인',
                                cancel: '취소'
                            }
                        },
                        validataTitle: {
                            title: '알림',
                            message: '제목은 필수 입력 항목입니다.',
                            purpose: 'validataTitle',
                            useCancelButton: false,
                            buttonName: {
                                confirm: '확인',
                            }
                        },
                        validataFormDate: {
                            title: '알림',
                            message: '데이터 기준 기간 선택은 필수 항목 입니다.',
                            purpose: 'validataFormDate',
                            useCancelButton: false,
                            buttonName: {
                                confirm: '확인',
                            }
                        },
                        successMsg: {
                            title: '알림',
                            message: '보고서가 정상적으로 생성되었습니다.',
                            purpose: 'saveResponseFormData',
                            useCancelButton: false,
                            buttonName: {
                                confirm: '확인',
                            }
                        },
                    }
                },
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
                this.registInfo.reportTitle = "";
                this.registInfo.dateStr = [null, null];
            },
            reportTitleSave : function() {
                let validata = this.validataChk();

                if( validata ) {
                    this.openPopup('saveConfrim');
                }
            },
            wikReportWrite : async function() {
                let url   = '/sendApi/api/stats/report/reportWikTitle/write';
                let param = { 
                    siteMstrId : this.$cookies.get('siteMstrId'),
                    reportTitle : this.registInfo.reportTitle,
                    dataStartDt : this.registInfo.dateStr[0],
                    dataEndDt : this.registInfo.dateStr[1]
                 };

                try {
                    const detailData = await sendPostApi(url, param);

                    // console.log("data ==> %o", detailData.data.datas.dmWikData);
                    // console.log("data ==> %o", detailData.data) ;
                    if( detailData.data.rCode == "0000" ){
                        this.resultParam = detailData.data.datas.dmWikData;
                        this.openPopup ('successMsg');  // "보고서 생성에 성공하였습니다."
                    }
                } catch (error) {
                    console.log("ERROE:"+error)
                }
            },
            validataChk : function(){
                if(!this.registInfo.reportTitle){
                    this.openPopup('validataTitle');
                    this.$refs.reportTitle.focus();
                    return false;
                }
                if(!this.registInfo.dateStr[0]){
                    this.openPopup('validataFormDate');
                    this.$refs.dateStr.focus();
                    return false;
                }
                return true;
            },

            /** alert popup */ 
            openPopup (type) {
                this.popup = {
                    ...this.popup,
                    ...this.default.popup[type],
                }
                this.popup.isShow = true
            }, 
            clickPopupConfirm (purpose) {
                this.popup.isShow = false;
                // console.log(purpose)
                switch(purpose) {
                    case 'wikReportWrite':
                        this.wikReportWrite();
                    break;
                    case 'saveResponseFormData':
                        this.$emit('responseTitleSaveForm', this.resultParam);
                    break;
                }
            },
            clickPopupCancel (purpose) {
                this.popup.isShow = false;
                switch(purpose) {
                    case '':
                    break
                }
            },

        }
    }
</script>