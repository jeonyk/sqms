<template>
    <div class="tab_contents">
        <!-- <h2 class="sub_title">품질관리비</h2> -->
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area submenu_on" v-show="currentTab == 0">
            <div class="left_content">
                <div class="link_area">
                    <ul class="sub_1depth">
                        <li class="on">
                            <div class="title">
                                <a href="javascript:void(0)">노임단가 적용 기준일</a>
                            </div>
                            <ul class="sub_2depth" style="max-height:620px;overflow-y:auto;">
                                <li v-for="(item, index) in kencaData" :key="index"><a href="javascript:void(0)" @click="setKencaInfo(item)" >{{item.efctDtTitle}}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right_content">
                <div class="inner type2">
                    <div class="button_box ar">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="saveValidate" v-if="kencaInfo.qltyCostId === ''">등록</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="delChk" v-if="kencaInfo.qltyCostId !== ''">삭제</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="changeChk" v-if="kencaInfo.qltyCostId !== ''">수정</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="clearSet('KENCA')"  v-if="kencaInfo.qltyCostId !== ''">이전</button>
                    </div>

                    <div class="table_normal_list table_write">
                        <table>
                            <colgroup>
                                <col width="12%">
                                <col width="*">
                                <col width="12%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>평균 근무일수</th>
                                    <td >{{kencaInfo.workDay}} 일</td>
                                    <th>적용 일자</th>
                                    <td><DatePicker v-model="kencaInfo.efctDt" :input-style="{width: '100%;'}" :format="'YYYYMMDD'" :disabled="kencaInfo.qltyCostId !== ''"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="button_box">
                        <strong>관리인력의 노임단가 요금</strong>
                    </div>

                    <div class="table_normal_list table_write">
                        <table>
                            <colgroup>
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>구분</th>
                                    <th>기술자 노임단가(원)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="ac">기술사</td>
                                    <td><input type="text" v-model="kencaInfo.technician" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">특급 기술자</td>
                                    <td><input type="text" v-model="kencaInfo.suprEgnr" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">고급 기술자</td>
                                    <td><input type="text" v-model="kencaInfo.exprEgnr" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">중급 기술자</td>
                                    <td><input type="text" v-model="kencaInfo.midEgnr" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">초급 기술자</td>
                                    <td><input type="text" v-model="kencaInfo.bginEgnr" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">고급 숙련기술자</td>
                                    <td><input type="text" v-model="kencaInfo.exprSkilTech" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">중급 숙련기술자</td>
                                    <td><input type="text" v-model="kencaInfo.midlSkilTech" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">초급 숙련기술자</td>
                                    <td><input type="text" v-model="kencaInfo.bginSkilTech" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="table_message ar">※ 한국엔지니어링협회의 노임단가 적용</p>
                </div>
            </div>
        </div>
        
        <div class="tab_area submenu_on" v-show="currentTab == 1">
            <div class="left_content">
                <div class="link_area">
                    <ul class="sub_1depth">
                        <li class="on">
                            <div class="title">
                                <a href="javascript:void(0)">노임단가 적용 기준일</a>
                            </div>
                            <ul class="sub_2depth" style="max-height:620px;overflow-y:auto;">
                                <li v-for="(item, index) in cakData" :key="index"><a href="javascript:void(0)" @click="setCakData(item)">{{item.efctDtTitle}}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right_content">
                <div class="inner type2">
                    <div class="button_box ar">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="saveValidate" v-if="cakInfo.qltyCostId === ''">등록</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="delChk" v-if="cakInfo.qltyCostId !== ''">삭제</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="changeChk" v-if="cakInfo.qltyCostId !== ''">수정</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="clearSet('CAK')"  v-if="cakInfo.qltyCostId !== ''">이전</button>
                    </div>

                    <div class="table_normal_list table_write">
                        <table>
                            <colgroup>
                                <col width="12%">
                                <col width="*">
                                <col width="12%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>평균 근무일수</th>
                                    <td>{{cakInfo.workDay}}일</td>
                                    <th>적용 일자</th>
                                    <td><DatePicker v-model="cakInfo.efctDt" :input-style="{width: '100%;'}" :format="'YYYYMMDD'" :disabled="cakInfo.qltyCostId !== ''"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>시험인력의 노임단가 요금</strong>
                    </div>
                    
                    <div class="table_normal_list table_write">
                        <table>
                            <colgroup>
                                <col width="50%">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>구분</th>
                                    <th>시험인력 노임단가(원)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="ac">특급품질관리원</td>
                                    <td><input type="text" v-model="cakInfo.exprQltyMngr" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">고급품질관리원</td>
                                    <td><input type="text" v-model="cakInfo.advcQltyMngr" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">중급품질관리원</td>
                                    <td><input type="text" v-model="cakInfo.midlQltyMngr" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                                <tr>
                                    <td class="ac">초급품질관리원</td>
                                    <td><input type="text" v-model="cakInfo.bginQltyMngr" placeholder="입력해주세요" class="form_control form_md"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="table_message ar">※ 대한건설협회의 노임단가 적용</p>
                </div>
            </div>
        </div>

        <div class="tab_area submenu_on" v-show="currentTab == 2">
            <div class="left_content">
                <div class="link_area">
                    <ul class="sub_1depth">
                        <li class="on">
                            <div class="title">
                                <a href="javascript:void(0)">공공요금 적용 기준일</a>
                            </div>
                            <ul class="sub_2depth" style="max-height:620px;overflow-y:auto;">
                                <li v-for="(item, index) in publicData" :key="index"><a href="javascript:void(0)" @click="setPublicData(item)">{{item.efctDtTitle}}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right_content">
                <div class="inner type2">
                    <div class="button_box ar">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="saveValidate" v-if="publicInfo.qltyCostUtilId === ''">등록</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="delChk" v-if="publicInfo.qltyCostUtilId !== ''">삭제</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="changeChk" v-if="publicInfo.qltyCostUtilId !== ''">수정</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="clearSet('PUB')" v-if="publicInfo.qltyCostUtilId !== ''">이전</button>
                    </div>
                
                    <div class="table_normal_list table_write">
                        <table>
                            <colgroup>
                                <col width="12%">
                                <col width="*">
                                <col width="12%">
                                <col width="*">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>적용 일자</th>
                                    <td colspan="3"><DatePicker v-model="publicInfo.efctDt" :input-style="{width: '100%;'}" :format="'YYYYMMDD'" :disabled="publicInfo.qltyCostUtilId !== ''"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="button_box">
                        <strong>공공요금</strong>
                    </div>

                    <div class="table_normal_list">
                        <table>
                            <colgroup>
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                            <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>구분</th>
                                    <th>전기요금(원/Kwh)</th>
                                    <th>수도요금(원/m³)</th>
                                    <th>가스요금(원/㎥)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>공공요금 단가</td>
                                    <td>{{publicInfo.elecCostTotalAvg}}</td>
                                    <td>{{publicInfo.waterCostTotalAvg}}</td>
                                    <td>{{publicInfo.gasCostTotalAvg}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table_data mt20">
                        <div class="move_box">
                            <div class="move_box_inner">
                                <div class="data_tit pl0">전력요금 단가</div>
                                <div class="table_normal_list table_write align_center">
                                    <table>
                                        <colgroup>
                                            <col width="*">
                                            <col width="*">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>전력량 요금(원.Kwh)</th>
                                                <th>저압전력</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>여름철(6~8월)</td>
                                                <td><input type="text" v-model="elecInfo.elecPrice01" placeholder="입력해주세요" class="form_control"></td>
                                            </tr>
                                            <tr>
                                                <td>봄, 가을철(3~5, 9~10월)</td>
                                                <td><input type="text" v-model="elecInfo.elecPrice02" placeholder="입력해주세요" class="form_control"></td>
                                            </tr>
                                            <tr>
                                                <td>겨울철(11~12월)</td>
                                                <td><input type="text" v-model="elecInfo.elecPrice03" placeholder="입력해주세요" class="form_control"></td>
                                            </tr>
                                            <tr>
                                                <td>적용(평균값)</td>
                                                <td>{{elecCostTotalAvg}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="move_box_inner">
                                <div class="data_tit pl0">가스요금 단가</div>
                                <div class="table_normal_list table_write align_center">
                                    <table>
                                        <colgroup>
                                            <col width="20%">
                                            <col width="20%">
                                            <col width="20%">
                                            <col width="20%">
                                            <col width="*">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th rowspan="2">지자체</th>
                                                <th colspan="4">적용 단가(원/MJ)</th>
                                            </tr>
                                            <tr>
                                                <th>동절기(12~3월)</th>
                                                <th>하절기(6~9월)</th>
                                                <th>기타(4~5, 10~11월)</th>
                                                <th>평균</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in gasInfo" :key="index">
                                                <td>{{item.areaNm}}</td>
                                                <td><input type="text" v-model="item.gasPrice01" placeholder="입력해주세요" class="form_control"></td>
                                                <td><input type="text" v-model="item.gasPrice02" placeholder="입력해주세요" class="form_control"></td>
                                                <td><input type="text" v-model="item.gasPrice03" placeholder="입력해주세요" class="form_control"></td>
                                                <td>{{ item.gasCostAvg = ((Number(item.gasPrice01) + Number(item.gasPrice02) + Number(item.gasPrice03)) / 3).toFixed(4) }}</td>
                                            </tr>
                                            <tr>
                                                <td>합계</td>
                                                <td>{{gasPrice01Sum}}</td>
                                                <td>{{gasPrice02Sum}}</td>
                                                <td>{{gasPrice03Sum}}</td>
                                                <td>{{gasCostTotalSum}}</td>
                                            </tr>
                                            <tr>
                                                <td>적용(평균값)</td>
                                                <td colspan="4">{{gasCostTotalAvg}}</td>
                                            </tr>
                                            <tr>
                                                <td>계수(MJ/㎥)</td>
                                                <td colspan="4"><input type="text" v-model="publicInfo.gasCostCalc" placeholder="입력해주세요" class="form_control"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="move_box">
                            <div class="move_box_inner">
                                <div class="data_tit pl0">수도요금 단가</div>
                                <div class="table_normal_list table_write align_center">
                                    <table>
                                        <colgroup>
                                            <col width="25%">
                                            <col width="25%">
                                            <col width="25%">
                                            <col width="*">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th rowspan="2">지자체</th>
                                                <th colspan="3">적용 단가(원/m³)</th>
                                            </tr>
                                            <tr>
                                                <th>상수도</th>
                                                <th>하수도</th>
                                                <th>합계</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in waterInfo" :key="index">
                                                <td>{{item.areaNm}}</td>
                                                <td><input type="text" v-model="item.waterPrice01" placeholder="입력해주세요" class="form_control"></td>
                                                <td><input type="text" v-model="item.waterPrice02" placeholder="입력해주세요" class="form_control"></td>
                                                <td>{{ item.waterCostSum = Number(item.waterPrice01) + Number(item.waterPrice02)}}</td>
                                            </tr>
                                            <tr>
                                                <td>합계</td>
                                                <td>{{waterPrice01Sum}}</td>
                                                <td>{{waterPrice02Sum}}</td>
                                                <td>{{waterCostTotalSum}}</td>
                                            </tr>
                                            <tr>
                                                <td>적용(평균값)</td>
                                                <td colspan="3">{{waterCostTotalAvg}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import DatePicker from '@component/common/DatePicker.vue';
import { sendPostApi } from '@/apis/common';
import _ from 'lodash';
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue';

    export default {
        name: 'QltyMngtCostSheet',
        mixins: [MsgBoxMixins],
        components: {
            DatePicker,
            Breadcrumb
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['한국엔지니어링협회', '대한건설협회', '공공요금'], // tab name

                kencaData : [],
                cakData : [],
                publicData : [],
                elecData : {
                    elecPrice01 : '',
                    elecPrice02 : '',
                    elecPrice03 : '',
                },
                waterData : {
                },
                gasData : {
                },
                tab1:0,
                tab2:0,
                kencaInfo : {
                    qltyCostId : '',
                    basePriceType:'KENCA',
                    workDay:'22',
                    efctDt:'',
                    technician:'',
                    suprEgnr:'',
                    exprEgnr:'',
                    midEgnr:'',
                    bginEgnr:'',
                    exprSkilTech:'',
                    midlSkilTech:'',
                    bginSkilTech:'',
                },
                kencaClear : {
                    qltyCostId : '',
                    basePriceType:'KENCA',
                    workDay:'22',
                    efctDt:'',
                    technician:'',
                    suprEgnr:'',
                    exprEgnr:'',
                    midEgnr:'',
                    bginEgnr:'',
                    exprSkilTech:'',
                    midlSkilTech:'',
                    bginSkilTech:'',
                },
                cakInfo : {
                    qltyCostId : '',
                    basePriceType:'CAK',
                    workDay:'22',
                    efctDt:'',
                    exprQltyMngr:'',
                    advcQltyMngr:'',
                    midlQltyMngr:'',
                    bginQltyMngr:'',
                },
                cakClear : {
                    qltyCostId : '',
                    basePriceType:'CAK',
                    workDay:'22',
                    efctDt:'',
                    exprQltyMngr:'',
                    advcQltyMngr:'',
                    midlQltyMngr:'',
                    bginQltyMngr:'',
                },
                publicInfo : { 
                    qltyCostUtilId : '',
                    basePriceType : 'PUB',
                    workDay : '22',
                    efctDt : '',
                    elecCostTotalSum : '',
                    elecCostTotalAvg : '',
                    waterCostTotalSum : '',
                    waterCostTotalAvg : '',
                    gasCostTotalSum : '',
                    gasCostTotalAvg : '',
                    gasCostCalc : '',
                },
                publicClear : { 
                    qltyCostUtilId : '',
                    basePriceType : 'PUB',
                    workDay : '22',
                    elecCostTotalSum : '',
                    elecCostTotalAvg : '',
                    waterCostTotalSum : '',
                    waterCostTotalAvg : '',
                    gasCostTotalSum : '',
                    gasCostTotalAvg : '',
                    gasCostCalc : '',
                },
                elecInfo : {},
                waterInfo : [],
                gasInfo : [],

            }
        },
        mounted() {
            this.getSearchData('KENCA');
        },
        beforeDestroy() {
        },
        computed : {
            elecCostTotalAvg : function () {
                let avg = 0;
                let sum = 0;

                sum = Number(this.elecInfo.elecPrice01) + Number(this.elecInfo.elecPrice02) + Number(this.elecInfo.elecPrice03);
                avg =  Math.floor((Number(this.elecInfo.elecPrice01) + Number(this.elecInfo.elecPrice02) + Number(this.elecInfo.elecPrice03)) / 3); // 소수점 절삭
                
                this.publicInfo.elecCostTotalSum = sum;
                this.publicInfo.elecCostTotalAvg = avg;
                return avg;
            },
            waterPrice01Sum : function () {
                let sum = 0;
                sum = this.waterInfo.reduce( (acc, item) => {
                            return acc + Number(item.waterPrice01);
                        }, 0)
                return sum;
            },
            waterPrice02Sum : function () {
                let sum = 0;
                sum = this.waterInfo.reduce( (acc, item) => {
                            return acc + Number(item.waterPrice02);
                        }, 0)
                return sum;
            },
            waterCostTotalSum : function () {
                let sum = 0;
                sum = this.waterInfo.reduce( (acc, item) => {
                                return acc + ( Number(item.waterPrice01) + Number(item.waterPrice02) );
                            }, 0);
                this.publicInfo.waterCostTotalSum = sum;
                return sum;
            },
            waterCostTotalAvg : function () {
                let sum = 0;
                let cnt = this.waterInfo.length;
                let avg = 0;

                sum = this.waterInfo.reduce( (acc, item) => {
                                return acc + ( Number(item.waterPrice01) + Number(item.waterPrice02) );
                            }, 0);

                avg = Math.floor(sum / cnt);    // 소수점 절삭

                this.publicInfo.waterCostTotalAvg = avg;

                return avg;
            },
            gasPrice01Sum : function () {
                let sum = 0;
                sum = this.gasInfo.reduce( (acc, item) => {
                                return acc + Number(item.gasPrice01);
                            }, 0);
                return sum.toFixed(4);
            },
            gasPrice02Sum : function () {
                let sum = 0;
                sum = this.gasInfo.reduce( (acc, item) => {
                                return acc + Number(item.gasPrice02);
                            }, 0);
                return sum.toFixed(4);
            },
            gasPrice03Sum : function () {
                let sum = 0;
                sum = this.gasInfo.reduce( (acc, item) => {
                                return acc + Number(item.gasPrice03);
                            }, 0);
                return sum.toFixed(4);
            },
            gasCostTotalSum : function () {
                let sum = 0;
                sum = this.gasInfo.reduce( (acc, item) => {
                                return acc + Number(item.gasCostAvg) ;
                            }, 0)
                sum = sum.toFixed(4);

                this.publicInfo.gasCostTotalSum = sum;

                return sum;
            },
            gasCostTotalAvg : function () {
                let sum = 0;
                let cnt = this.waterInfo.length;
                let avg = 0;

                sum = this.gasInfo.reduce( (acc, item) => {
                                return acc + Number(item.gasCostAvg);
                            }, 0);
                avg = (sum/cnt).toFixed(4);

                this.publicInfo.gasCostTotalAvg = avg * Number(this.publicInfo.gasCostCalc);

                return avg;
            },
        },        
        watch: {
            "currentTab" : {
                handler () {
                    if ( this.currentTab === 1 && this.tab1 === 0){
                        this.tab1 = 1;  // 최초 조회만 실행
                        this.getSearchData('CAK');
                    } else if ( this.currentTab === 2 && this.tab2 === 0 ){
                        this.tab2 = 1;  // 최초 조회만 실행
                        this.getSearchData('PUB');
                    }
                }
            },
        },        

        methods: {
            getSearchData : async function(basePriceTypeSe) {
                // console.log("getSearchData : %o", basePriceTypeSe)
                let url = '/sendApi/api/myWork/qltyMngtCost/qltyCost/list';

                if ( 'PUB' === basePriceTypeSe ) {
                    url = '/sendApi/api/myWork/qltyMngtCost/publicCost/list';
                }

                let payload = {
                    basePriceType : basePriceTypeSe
                };

                try {
                    await sendPostApi(url, payload)
                            .then((data) => {
                                if( basePriceTypeSe == "KENCA" ){
                                    this.kencaData  = data.data.datas.dlKencaData;
                                } else if( basePriceTypeSe == "CAK" ){
                                    this.cakData  = data.data.datas.dlKencaData;
                                } else if( basePriceTypeSe == "PUB" ){
                                    this.publicData  = data.data.datas.dlPublicTitle;
                                    this.initlData();
                                }
                                this.clearSet(basePriceTypeSe);
                            });
                } catch (error) {
                    console.log(error);
                }
            },
            initlData : async function() {
                let url = '/sendApi/api/myWork/qltyMngtCost/qltyCostClear/list';
                let payload = {};

                try {
                    await sendPostApi(url, payload)
                            .then((data) => {
                                this.elecInfo  = _.cloneDeep(this.elecData);
                                this.waterInfo = data.data.datas.dlWaterCost;
                                this.gasInfo   = data.data.datas.dlGasCost;
                            });
                } catch (error) {
                    console.log(error);
                }
            }, 
            setKencaInfo : function(itm) {
                this.kencaInfo = itm;
            },
            setCakData : function(itm) {
                this.cakInfo = itm;
            },
            setPublicData : function(itm) {
                this.publicInfo = itm;
                this.searchPublicDetail();
            },
            searchPublicDetail : async function() {
                let url = '/sendApi/api/myWork/qltyMngtCost/publicCostDetail/list';
                let payload = {
                    ...this.publicInfo,
                };

                try {
                    await sendPostApi(url, payload)
                            .then((data) => {
                                this.elecInfo  = data.data.datas.dmElecCost;
                                this.waterInfo = data.data.datas.dlWaterCost;
                                this.gasInfo   = data.data.datas.dlGasCost;
                            });
                } catch (error) {
                    console.log(error);
                }
            }, 
            saveValidate : function() {
                if( this.currentTab === 0 ){
                    if( this.kencaInfo.efctDt == null || this.kencaInfo.efctDt == '' ) {
                        this.alert("적용 일자는 필수 입력 사항입니다.", null);
                        return;
                    }
                    this.confirm("적용일자 기준으로 등록됩니다.\n등록하시겠습니까?", this.saveKencaData, null);
                } else if( this.currentTab === 1 ){
                    if( this.cakInfo.efctDt == null || this.cakInfo.efctDt == '' ) {
                        this.alert("적용 일자는 필수 입력 사항입니다.", null);
                        return;
                    }
                    this.confirm("적용일자 기준으로 등록됩니다.\n등록하시겠습니까?", this.saveCakData, null);
                } else if( this.currentTab === 2 ){
                    if( this.publicInfo.efctDt == null || this.publicInfo.efctDt == '' ) {
                        this.alert("적용 일자는 필수 입력 사항입니다.", null);
                        return;
                    }
                    this.confirm("적용일자 기준으로 등록됩니다.\n등록하시겠습니까?", this.savePublicData, null);
                }
            },
            changeChk : function (){
                if( this.currentTab === 2 ){
                    this.confirm("수정하시겠습니까?", this.savePublicChangeData, null);
                } else {
                    this.confirm("수정하시겠습니까?", this.saveChangeData, null);
                }
            },
            delChk : function (){
                if( this.currentTab === 2 ){
                    this.confirm("삭제하시겠습니까?", this.saveDelPublicData, null);
                } else {
                    this.confirm("삭제하시겠습니까?", this.saveDelData, null);
                }
            },
            saveKencaData : async function() {
                let url = '/sendApi/api/myWork/qltyMngtCost/qltyCost/write';
                let payload = {
                    ...this.kencaInfo,
                };
                // console.log("payload : %o", payload);

                const data = await sendPostApi(url, payload)
                                    .then((data) => {
                                        this.resutData = data.data.datas;
                                        // console.log("END Data : %o", data.data.datas);
                                        if( this.resutData.rcode === 'S'){
                                            this.alert(this.resutData.rmsg);
                                            this.getSearchData('KENCA');
                                        } else {
                                            this.alert(this.resutData.rmsg);
                                        }
                                    });
            },
            saveCakData : async function() {
                let url = '/sendApi/api/myWork/qltyMngtCost/qltyCost/write';
                let payload = {
                    ...this.cakInfo,
                };
                // console.log("payload : %o", payload);

                const data = await sendPostApi(url, payload)
                                    .then((data) => {
                                        this.resutData = data.data.datas;
                                        // console.log("END Data : %o", data.data.datas);
                                        if( this.resutData.rcode === 'S'){
                                            this.alert(this.resutData.rmsg);
                                            this.getSearchData('CAK');
                                        } else {
                                            this.alert(this.resutData.rmsg);
                                        }
                                    });
            },
            savePublicData : async function() {
                let url = '/sendApi/api/myWork/qltyMngtCost/publicCost/writr';
                let payload = {
                    publicInfo : this.publicInfo,
                    elecData : this.elecInfo,
                    waterList : this.waterInfo,
                    gasList : this.gasInfo,
                };
                // console.log("payload : %o", payload);

                const data = await sendPostApi(url, payload)
                                    .then((data) => {
                                        //console.log("END Data : %o", data.data.datas);
                                        this.resutData = data.data.datas;
                                        if( this.resutData.rcode === 'S'){
                                            this.alert(this.resutData.rmsg);
                                        } else {
                                            this.alert(this.resutData.rmsg);
                                        }
                                        this.getSearchData('PUB');
                                    });
            },
            saveChangeData : async function() {
                let url = '/sendApi/api/myWork/qltyMngtCost/qltyCost/change';
                let param = null;

                if( this.currentTab === 0 ){
                    param = this.kencaInfo;
                } else if( this.currentTab === 1 ){
                    param = this.cakInfo;
                }

                //console.log("change Data : %o", param);
                let payload = {
                    ...param
                };

                const data = await sendPostApi(url, payload)
                                    .then((data) => {
                                        this.alert("수정되었습니다.");
                                        // console.log("Update END Data : %o", data);
                                    });

                if( this.currentTab === 0 ){
                    this.getSearchData('CAK');
                } else if( this.currentTab === 1 ){
                    this.getSearchData('PUB');
                }
            },
            savePublicChangeData : async function() {
                let url = '/sendApi/api/myWork/qltyMngtCost/publicCost/change';
                let payload = {
                    publicInfo : this.publicInfo,
                    elecData : this.elecInfo,
                    waterList : this.waterInfo,
                    gasList : this.gasInfo,
                };
                // console.log("payload : %o", payload);

                const data = await sendPostApi(url, payload)
                                    .then((data) => {
                                        this.alert("수정되었습니다.");
                                        // console.log("Update END Data : %o", data);
                                        this.getSearchData('PUB');
                                    });
            },
            saveDelData : async function() {
                let url   = '/sendApi/api/myWork/qltyMngtCost/qltyCost/unuse';
                let param = null;

                if( this.currentTab === 0 ){
                    param = this.kencaInfo;
                } else if( this.currentTab === 1 ){
                    param = this.cakInfo;
                }

                let payload = {
                    ...param
                };

                // console.log("delete Data : %o", payload);
                const data = await sendPostApi(url, payload)
                                    .then((data) => {
                                        // console.log("Delete END Data : %o", data.data.datas);
                                        this.alert("삭제되었습니다.");
                                        if( this.currentTab === 0 ){
                                            this.getSearchData('KENCA');
                                        } else if( this.currentTab === 1 ){
                                            this.getSearchData('CAK');
                                        }
                                    });
            },
            saveDelPublicData : async function() {
                let url   = '/sendApi/api/myWork/qltyMngtCost/publicCost/unuse';
                let payload = {
                    ...this.publicInfo
                };

                // console.log("delete Data : %o", payload);
                const data = await sendPostApi(url, payload)
                                    .then((data) => {
                                        // console.log("Delete END Data : %o", data.data.datas);
                                        this.alert("삭제되었습니다.");
                                        this.getSearchData("PUB");
                                    });
            },
            clearSet : function(clearSe) {
                if( clearSe === 'KENCA' ){
                    // this.kencaInfo = this.kencaClear;
                    this.kencaInfo = _.cloneDeep(this.kencaClear);
                } else if( clearSe === 'CAK' ){
                    // this.cakInfo = this.cakClear;
                    this.cakInfo = _.cloneDeep(this.cakClear);
                } else if( clearSe === 'PUB' ){
                    // this.cakInfo = this.cakClear;
                    this.publicInfo = _.cloneDeep(this.publicClear);
                    this.initlData();   // 상세 초기화 정보 조회
                }
            },
        }
    }
</script>