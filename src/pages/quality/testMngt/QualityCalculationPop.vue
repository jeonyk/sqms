<template>
    <!-- 품질관리비 산출 팝업 -->
    <b-modal id="QualityCalculationPop" title="품질관리비 산출" v-on:shown="tableLoad"
        hide-backdrop size="lg"
        :footer-bg-variant="footerBg" scrollable static>
        <template #default>
            <div class="fr" style="margin-top:10px; margin-right:35px;">
                <!-- <button type="button" class="btn btn_sm btn_excel" @click="excelDown">엑셀 다운로드</button> -->
                <button type="button" class="btn btn_md btn_outline btn_darkgray btn_print" v-print="'#mysite_area'">출력</button>
            </div>
            <div class="pop_container" id="mysite_area" style="z-index:-100;">
                <strong>품질시험비</strong>
                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="*">
                            <col width="30%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>품질시험인건비</td>
                                <td class="ar">{{no1}}</td>
                            </tr>
                            <tr>
                                <td>공공요금</td>
                                <td class="ar">{{no2}}</td>
                            </tr>
                            <tr>
                                <td>재료비</td>
                                <td class="ar">{{no3}}</td>
                            </tr>
                            <tr>
                                <td>장비손료</td>
                                <td class="ar">{{no4}}</td>
                            </tr>
                            <tr>
                                <td>소계</td>
                                <td class="ar">{{no5}}</td>
                            </tr>
                            <tr>
                                <td>품질시험시설비용, 시험 및 검사기구 검정·교정비</td>
                                <td class="ar">{{no6}}</td>
                            </tr>
                            <tr>
                                <td>품질시험에 필요한 차량의 감가상각비, 유류비, 보험료 등 (실비 계산)</td>
                                <td class="ar">{{no7}}</td>
                            </tr>
                            <tr>
                                <td>외부의뢰시험비 (품지리험비 한도 내에서 실시, 건설사업관리용역업자와 협의 후 결정)</td>
                                <td class="ar">{{no8}}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><strong>품질시험비 합계</strong></td>
                                <td class="ar"><strong class="point_color">{{no9}}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="button_box">
                    <strong>품질관리활동비</strong>
                </div>

                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="*">
                            <col width="12%">
                            <col width="12%">
                            <col width="10%">
                            <col width="12%">
                            <col width="10%">
                            <col width="24%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>등급</th>
                                <th>단가</th>
                                <th>일수</th>
                                <th>인</th>
                                <th>개월</th>
                                <th>계</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="5">품질관리자 인건비</td>
                                <td>특급</td>
                                <td class="ar">{{no1301}}</td>
                                <td class="ar">22</td>
                                <td class="ar">{{no1302}}</td>
                                <td class="ar">{{monthCnt}}</td>
                                <td class="ar">{{no1303}}</td>
                            </tr>
                            <tr>
                                <td>고급</td>
                                <td class="ar">{{no1201}}</td>
                                <td class="ar">22</td>
                                <td class="ar">{{no1202}}</td>
                                <td class="ar">{{monthCnt}}</td>
                                <td class="ar">{{no1203}}</td>
                            </tr>
                            <tr>
                                <td>중급</td>
                                <td class="ar">{{no1101}}</td>
                                <td class="ar">22</td>
                                <td class="ar">{{no1102}}</td>
                                <td class="ar">{{monthCnt}}</td>
                                <td class="ar">{{no1103}}</td>
                            </tr>
                            <tr>
                                <td>초급</td>
                                <td class="ar">{{no1001}}</td>
                                <td class="ar">22</td>
                                <td class="ar">{{no1002}}</td>
                                <td class="ar">{{monthCnt}}</td>
                                <td class="ar">{{no1003}}</td>
                            </tr>
                            <tr>
                                <td>계</td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar">{{no14}}</td>
                            </tr>
                            <tr>
                                <td>품질문서 작성비</td>
                                <td></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar">{{no15}}</td>
                            </tr>
                            <tr>
                                <td>품질교육훈련비</td>
                                <td></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar">{{no16}}</td>
                            </tr>
                            <tr>
                                <td>품질검사비</td>
                                <td></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar">{{no17}}</td>
                            </tr>
                            <tr>
                                <td>그 밖의 비용</td>
                                <td></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar">{{no18}}</td>
                            </tr>
                            <tr>
                                <td>품질관리활동비 합계</td>
                                <td></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar"></td>
                                <td class="ar">{{no19}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table_normal_list">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="*">
                            <col width="20%">
                        </colgroup>
                        <tfoot>
                            <tr>
                                <td><strong>품질관리비 합계</strong></td>
                                <td class="ar"><strong class="point_color">{{no20}}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId" v-bind:btn-name="{first : '확인'}"
                    v-on:first-btn-fn="closePop"
                />
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <!-- <b-button class="btn btn_md btn_outline btn_darkgray" @click="ok">선택</b-button> -->
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>
</template>
<script>
import PopAlert from '@/pages/common/popup/PopAlert.vue' 
import API from '@/apis/'
import { commonFn } from '@/script/commonFn.js';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import authCheckMixns  from '@plugin/mixin/AuthCheck.js';

export default {
    name:'QualityCalculationPop',
    mixins: [MsgBoxMixins,authCheckMixns],
    components:{
        PopAlert,
    },
    data(){
        return {
            footerBg: 'transparent',
            popMsg:'',                                      //알림창 메세지
            confirmUse:'',                                  //알림창 버튼개수
            popId:'calculationPopAlert',                           //알림창 Id
            siteMstrId:'',                                  //현장정보Id
            no1:0,
            no2:0,
            no3:0,
            no4:0,
            no5:0,
            no6:0,
            no7:0,
            no8:0,
            no9:0,
            no1001:0,                                       // 초급
            no1002:0,
            no1003:0,
            no1101:0,                                       // 중급
            no1102:0,
            no1103:0,
            no1201:0,                                       // 고급
            no1202:0,
            no1203:0,
            no1301:0,                                       // 특급
            no1302:0,
            no1303:0,
            no14:0,
            no15:0,
            no16:0,
            no17:0,
            no18:0,
            no19:0,
            no20:0,
            monthCnt:0,
        }
    },
    props:{
        siteQltyCostHisId:{
            type: String,
            default: '',
        },
    },
    created(){
    },
    watch: {

    },
    methods:{
        tableLoad: async function(){
            let param = {
               'siteQltyCostHisId' : this.siteQltyCostHisId,
            };
            const rst = await API.crack.getCostReportView(param,{
                headers:{
                    'Authorization': this.$cookies.get("Authorization")
                }
            });
            // console.log(rst);
            let table1 = rst.data.siteQltyCost;
            let table2 = rst.data.siteQltyMngtCost;
            this.no1 = commonFn.methods.addCommas(table1.no1);
            this.no2 = commonFn.methods.addCommas(table1.no2);
            this.no3 = commonFn.methods.addCommas(table1.no3);
            this.no4 = commonFn.methods.addCommas(table1.no4);
            this.no5 = commonFn.methods.addCommas(table1.no5);
            this.no6 = commonFn.methods.addCommas(table1.no6);
            this.no7 = commonFn.methods.addCommas(table1.no7);
            this.no8 = commonFn.methods.addCommas(table1.no8);
            this.no9 = commonFn.methods.addCommas(table1.no9);
            this.no1001 = commonFn.methods.addCommas(table2.no1001);
            this.no1002 = table2.no1002;
            this.no1003 = commonFn.methods.addCommas(table2.no1003);
            this.no1101 = commonFn.methods.addCommas(table2.no1101);
            this.no1102 = table2.no1102;
            this.no1103 = commonFn.methods.addCommas(table2.no1103);
            this.no1201 = commonFn.methods.addCommas(table2.no1201);
            this.no1202 = table2.no1202;
            this.no1203 = commonFn.methods.addCommas(table2.no1203);
            this.no1301 = commonFn.methods.addCommas(table2.no1301);
            this.no1302 = table2.no1302;
            this.no1303 = commonFn.methods.addCommas(table2.no1303);
            this.no14 = commonFn.methods.addCommas(table2.no14);
            this.no15 = commonFn.methods.addCommas(table2.no15);
            this.no16 = commonFn.methods.addCommas(table2.no16);
            this.no17 = commonFn.methods.addCommas(table2.no17 * 0.01);
            this.no18 = commonFn.methods.addCommas(table2.no18);
            this.no19 = commonFn.methods.addCommas(table2.no19);
            this.no20 = commonFn.methods.addCommas((table1.no9) + table2.no19);
            this.monthCnt = table2.monthCnt;
        },
        closePop : function(){
            this.$root.$emit('bv::show::modal','calculationPopAlert');
        },
        excelDown: function(){
            this.alert('준비중입니다.');
        },
    }
}
</script>