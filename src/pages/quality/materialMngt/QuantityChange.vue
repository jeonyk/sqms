<!-- 인수검사 물량변경 팝업 -->
<template>
    <b-modal :id="refId" title="인수검사 물량변경" hide-footer
        modal-class="single_page" size="xl" @shown="quantityChangePop"
        :footer-bg-variant="footerBg" static>
        <template #default>
            <div class="pop_container">
                <div class="tab_contents">
                    <div class="inner">
                        <div class="data_num">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="86">
                                    <col width="*">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>신청번호</th>
                                        <td>{{docSeq}}
                                            <span class="ico_state yellow">{{status=="APVL"?"결재중":"완료"}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="lst_data">
                            <div class="data_tit">1. 물량변경</div>

                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="quantityChangePopsheetTable2" class="ibsheet_table"></div>
                            </div>

                            <div class="table_normal_list table_write">
                                <table>
                                    <caption class="sr_only"></caption>
                                    <colgroup>
                                        <col width="20%">
                                        <col width="*">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th><span class="emp_red">변경 사유</span></th>
                                            <td><input type="text" class="form_control" placeholder="최소 10자 이상 입력해야 합니다." v-model="chgRsn"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="data_tit">2. 히스토리</div>
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="quantityHistoryPopsheetTable3" class="ibsheet_table" style="height: 221px;"></div>
                            </div>
                        </div>

                        <div class="button_box ac">
                            <button type="button" class="btn btn_lg btn_outline btn_darkgray" @click="beforeInsertChange" v-if="btnYn">변경</button>
                            <button type="button" class="btn btn_lg btn_outline btn_darkgray disabled" v-else>변경</button>
                            <button type="button" class="btn btn_lg btn_outline btn_gray" @click="closeChange">취소</button>
                        </div> 
                    </div>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId" v-bind:btn-name="{first : '확인'}"
                    v-on:first-btn-fn="closePop"
                />
            </div>
        </template>
    </b-modal>
</template>
<script>
    import loader from '@ibsheet/loader'
    import { Quantitychange, Quantitychange2 } from '../../common/data/PopupList'
    import API from '@/apis/'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

    
    let firstSheetId = '';
    let secondSheetId = '';

    export default{
        name: 'QuantityChange',
        mixins: [MsgBoxMixins],
        components: {
            PopAlert,
        },
        data() {
            return {
                btnYn : false,                              // 등록 버튼 활성화 여부
                firstSheet :null,                           // 아이비시트 첫번째
                secondSheet : null,                         // 아이비시트 두번째
                footerBg: 'transparent',
                popMsg: '',                                 // 알림창 메세지
                confirmUse: '',                             // 알림창 버튼개수
                popId:'changeAlert',                        // 알림창 Id
                siteMstrId: '',                             // 현장정보Id

                mtrlSpApprId : '',                          // 자재공급원승인Id
                // mtrlAccpTsId : '',                       // 인수검사 Id
                // testStatus: '',                          // 현황
                // docSeq: '',                              // 문서번호
                prdtNm : '',                                // 품명
                prdtDtl : '',                               // 상세품명
                stnd : '',                                  // 규격
                spprNm : '',                                // 공급업체명
                mnft : '',                                  // 제조업체명
                designAmt : '',                             // 설계량
                unit: '',                                   // 단위
                total : '',                                 // 누계
                rcvAmt : 0,                                 // 입고량
                brAmt : 0,                                  // 반입량
                rjtAmt : 0,                                 // 불합격량
                shmtDt : '',                                // 출고일
                bfRcvAmt : '',                              // 변경전 입고량
                bfBrAmt : '',                               // 변경전 반입량
                bfRjtAmt : '',                              // 변경전 불합격량
                afRcvAmt : '',                              // 변경후 입고량
                afBrAmt : '',                               // 변경후 반입량
                afRjtAmt : '',                              // 변경후 불합격량
                chgRsn : '',                                // 변경사유
                paramData : [],                             // param용
                
                changeChkYn: false,                         //검사 여부
            }
        },
        props: {
            // mtrlSpApprId: {
            //     type: String,
            //     default : ''
            // },
            mtrlAccpTsId: {
                type: String,
                default : ''
            },
            docSeq: {
                type: String,
                default : ''
            },
            status : {
                type: String,
                default : ''
            },
            refId:{
                type:String,
                default: 'QuantityChange',
            }
        },
        mounted(){
        },
        beforeDestroy() {
            // loader.removeSheet(firstSheetId);
            // loader.removeSheet(secondSheetId);
        },
        methods:{
            quantityChangePop: async function() {
                this.siteMstrId = this.$cookies.get("siteMstrId");
                this.chgRsn = '';
                if(this.mtrlAccpTsId == '' || this.mtrlAccpTsId  == null ||typeof(this.mtrlAccpTsId) == 'undefined'){
                    // console.log('alert');
                }else{
                    let param = {
                        "siteMstrId": this.siteMstrId,
                        "mtrlAccpTsId":this.mtrlAccpTsId,
                    };
                    try{
                        const rst = await API.material.acceptTestSubHisDtl(param,{
                            headers:{
                                'Authorization': this.$cookies.get("Authorization")
                            }
                        });
                        // console.log(rst);
                        if(rst.status === 200){
                            let data = rst.data.data;
                            let options = Quantitychange.options;
                            options['Events'] = {
                                onAfterChange: this.fnChange,
                            };

                            for(let start = 0; start<data.length;start++){
                                data[start]['bfRcvAmt'] = data[start].rcvAmt;
                                data[start]['afRcvAmt'] = data[start].rcvAmt;
                                data[start]['bfBrAmt'] = data[start].brAmt;
                                data[start]['afBrAmt'] = data[start].brAmt;
                                data[start]['bfRjtAmt'] = data[start].rjtAmt;
                                data[start]['afRjtAmt'] = data[start].rjtAmt;
                            }
                            
                            /* 팝업 아이비시트 */
                            loader.createSheet({
                                el: 'quantityChangePopsheetTable2',
                                options: options,
                                data: data
                            }).then((sheet) =>{
                                // firstSheetId = sheet.id;
                                this.firstSheet = sheet;
                                this.$nextTick(() => {
                                    sheet.blur(0);
                                })
                            })
                             
                            let data2 = rst.data.history;
                            let options2 = Quantitychange2.options;

                            if(data2.length>0){
                                if(data2.length<5){
                                    options2.Cfg['NoVScroll']= true;
                                }
                                else{
                                    options2.Cfg['NoVScroll']= false;
                                }
                                for(let start2 = 0; start2<data2.length;start2++){
                                    data2[start2]['orgUpDttm'] = data2[start2].upDttm.substring(0,data2[start2].upDttm.indexOf('.'));
                                    let dateNum = data2[start2].upDttm.indexOf('T');
                                    // console.log(dateNum);
                                    let date = data2[start2].upDttm.toString();
                                    date = date.substring(0,dateNum);
                                    // console.log(date);
                                    data2[start2]['upDttm'] = date;
                                }
                            }else{
                                data2 = [];
                            }
                            
                            /* 팝업 아이비시트 */
                            loader.createSheet({
                                el: 'quantityHistoryPopsheetTable3',
                                options: options2,
                                data: data2
                            }).then((sheet) =>{
                                // secondSheetId = sheet.id;
                                this.secondSheet = sheet;
                                this.$nextTick(() => {
                                    sheet.hideCol('orgUpDttm');
                                    sheet.blur(0);
                                })
                            })
                        }else{
                            throw new Error('something went wrong');
                        }
                    }catch(error){
                        // this.popMsg = '오류로 인해 정보를 불러올 수 없습니다.';
                        // this.confirmUse = false;
                        // this.changeChkYn = true;
                        // this.$root.$emit('bv::show::modal', 'changeAlert');
                        this.alert('조회에 실패했습니다.',()=>{
                            this.$emit('change-amount-close',true);
                        });
                    }
                }
            },
            beforeInsertChange: function(){
                this.changeChkYn = false;
                this.popMsg = '';
                this.paramData = [];
                let cnt = 0;
                const sheetRows = this.firstSheet.getDataRows();

                if(this.chgRsn == '' || this.chgRsn == null || typeof(this.chgRsn) == 'undefined'){
                    // this.popMsg = '변경 사유를 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'changeAlert');
                    this.alert('변경 사유 입력이 필요합니다.');
                    return;
                }
                if(this.chgRsn.length<10){
                    // this.popMsg = '변경 사유를 10자 이상 입력해주세요.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'changeAlert');
                    this.alert('변경 사유를 10자 이상 입력해주세요.');
                    return;
                }
                for(let x = 0; x<sheetRows.length; x++){
                    let tempData = {};
                    if(sheetRows[x].afRcvAmt == '' || sheetRows[x].afRcvAmt == null){
                        if(sheetRows[x].afRcvAmt !==0){
                            // this.popMsg = '입고량을 모두 입력해주세요.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'changeAlert');
                            this.alert('입고량을 입력해주세요.');
                            return;
                        }
                    }
                    if(sheetRows[x].afBrAmt == '' || sheetRows[x].afBrAmt == null){
                        if(sheetRows[x].afBrAmt !== 0){
                            // this.popMsg = '반입량을 모두 입력해주세요.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'changeAlert');
                            this.alert('반입량을 입력해주세요.');
                            return;
                        }
                    }
                    if(sheetRows[x].afRjtAmt == '' || sheetRows[x].afRjtAmt == null){
                        if(sheetRows[x].afRjtAmt !==0){
                            // this.popMsg = '불합격량을 모두 입력해주세요.';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'changeAlert');
                            this.alert('불합격량을 입력해주세요.');
                            return;
                        }
                    }
                    // if(sheetRows[x].afRcvAmt>sheetRows[x].designAmt){
                    //     this.popMsg = '설계량을 초과한 입고량이 있습니다.';
                    //     this.confirmUse = false;
                    //     this.$root.$emit('bv::show::modal', 'changeAlert');
                    //     return;
                    // }
                    if(sheetRows[x].afRcvAmt<0){
                        // this.popMsg = '입고량이 올바르지 않습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'changeAlert');
                        this.alert('입고량을 확인해주세요.');
                        return;
                    }
                    if(sheetRows[x].afRjtAmt>sheetRows[x].afRcvAmt){
                        // this.popMsg = '입고량을 초과한 불합격량이 있습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'changeAlert');
                        this.alert('불합격량을 확인해주세요.');
                        return;
                    }
                    if(sheetRows[x].afRjtAmt<0){
                        // this.popMsg = '불합격량이 올바르지 않습니다.';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'changeAlert');
                        this.alert('불합격량을 확인해주세요.');
                        return;
                    }
                    if((sheetRows[x].afRjtAmt == sheetRows[x].bfRjtAmt)&&(sheetRows[x].afRcvAmt == sheetRows[x].bfRcvAmt)){
                        cnt++;
                    }
                    if((sheetRows[x].bfRjtAmt != sheetRows[x].afRjtAmt)||(sheetRows[x].bfRcvAmt != sheetRows[x].afRcvAmt)){
                        tempData['bfRcvAmt'] = sheetRows[x].bfRcvAmt;
                        tempData['afRcvAmt'] = sheetRows[x].afRcvAmt;
                        tempData['bfRjtAmt'] = sheetRows[x].bfRjtAmt;
                        tempData['afRjtAmt'] = sheetRows[x].afRjtAmt;
                        tempData['bfBrAmt'] = sheetRows[x].bfBrAmt;
                        tempData['afBrAmt'] = sheetRows[x].afBrAmt;
                        tempData['mtrlSpApprSubId'] = sheetRows[x].mtrlSpApprSubId;
                        tempData['mtrlAccpTsSubId'] = sheetRows[x].mtrlAccpTsSubId;
                        tempData['chgRsn'] = this.chgRsn;
                        this.paramData.push(tempData);
                    }
                }
                if(cnt == sheetRows.length){
                    // this.popMsg = '변경 전과 동일합니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'changeAlert');
                    this.alert('변경 전과 동일합니다.');
                    return;
                }
                if(this.popMsg == ''){
                    this.changeChkYn = true;
                    this.confirm('변경하시겠습니까?',() => {this.insertChange()});
                    // this.insertChange();
                }
            },
            insertChange: async function(){
                try{
                    // console.log(this.paramData);
                    const change1 = await API.material.setAcceptTestSubHisChange(this.paramData,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    // if(change1.statusText=="OK"){
                    if(change1.status==200){
                        // this.popMsg = '변경이 완료되었습니다.';
                        // this.confirmUse = false;
                        // this.changeChkYn = true;
                        // this.$root.$emit('bv::show::modal', 'changeAlert');
                        this.alert('변경이 완료되었습니다.',()=>{
                            this.$emit('change-amount-close',true);
                        });
                    }else{
                        throw new Error('something went wrong');
                    }
                }catch(error){
                    // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다.';
                    // this.confirmUse = false;
                    // this.changeChkYn = false;
                    // this.$root.$emit('bv::show::modal', 'changeAlert');
                    this.alert('변경에 실패했습니다.');
                }
            },
            closeChange:function(){
                // loader.removeSheet(firstSheetId);
                // loader.removeSheet(secondSheetId);
                this.confirm(`수정중인 내용이 있습니다.\n 취소하시겠습니까?`,()=>{
                    this.$emit('change-amount-close',true);
                });
                // this.$root.$emit('bv::hide::modal', 'changeAlert');
                // this.$emit('change-amount-close',true);
            },
            closePop: function(){
                this.$root.$emit('bv::hide::modal', 'changeAlert');
                if(this.changeChkYn){
                    // loader.removeSheet(firstSheetId);
                    // loader.removeSheet(secondSheetId);
                    this.$emit('change-amount-close',true);
                }
            },
            fnChange:function(evt){
                // console.log(evt.col);
                if(evt.col == 'afRcvAmt' || evt.col == 'afRjtAmt'){
                    let replaceVal = evt.val.toString().replaceAll('.','').replaceAll(',','')
                    if(isNaN(replaceVal) || replaceVal == '' || replaceVal < 0){
                        evt.row[evt.col] = ''
                    }
                    evt.row['afBrAmt'] = evt.row['afRcvAmt']-evt.row['afRjtAmt'];
                    evt.sheet.refreshRow(evt.row);
                }
            },
        }
    }

</script>