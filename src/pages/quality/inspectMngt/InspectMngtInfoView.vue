<template>
    <div class="tab_contents">
        <div class="inner pb0">
            <div class="button_box">
                <h2>검측 상세</h2>
                <div class="fr" v-if="!allSiteYn">
                    <template v-if="editYn">
                        <button type="button" v-if="inptOrder == 1 && (progrsSttus ==  'INRG'||progrsSttus == 'INVL')" class="btn btn_md btn_outline btn_darkgray" @click="saveChk">저장</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="cancelBtn">취소</button>
                    </template>
                    <template v-else>
                        <button type="button" v-if="checkUser(userId,'write')"  class="btn btn_md btn_outline btn_darkgray" v-bind:class="{disabled: inptOrder == 2 || progrsSttus != 'APRV' || dsqlfcResultCnt == 0}" @click="fnTossChk">2차 실시</button>
                        <button type="button" v-if="checkUser(userId,'change')" v-bind:class="{disabled: inptOrder == 2 || (progrsSttus !=  'INRG'&&progrsSttus != 'INVL')}" class="btn btn_md btn_outline btn_darkgray" @click="editYn = true">수정</button>
                        <button type="button" v-if="checkUser(userId,'unuse')"  v-bind:class="{disabled: inptOrder == 2 || (progrsSttus !=  'INRG'&&progrsSttus != 'INVL')}" class="btn btn_md btn_outline btn_darkgray" @click="fnDelYn">삭제</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fnBack">목록</button>
                    </template>
                </div>
            </div>
            <div class="table_normal_list" v-if="!editYn">
                <table>
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="100">
                        <col width="*">
                        <col width="100">
                        <col width="*"> 
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>검측번호</th>
                            <td>{{inptDoc}}</td>
                            <th>등록일</th>
                            <td>{{inptRegistDate}}</td>
                        </tr>
                        <tr>
                            <th>대공종</th>
                            <td>{{mainName}}</td>
                            <th>공종</th>
                            <td>{{midName}}</td>
                        </tr>
                        <tr>
                            <th>세부공종</th>
                            <td colspan="3">{{subName}}</td>
                        </tr>
                        <tr>
                            <th>위치 및 <br> 검측 부위</th>
                            <td>{{inptLc}}</td>
                            <th>도면</th>
                            <td>{{drw}}</td>
                        </tr>
                        <tr>
                            <th>검측내용</th>
                            <td colspan="3">{{inptCn}}</td>
                        </tr>
                        <tr>
                            <th>협력업체</th>
                            <td>{{ccpyName}}</td>
                            <th>검측 <br> 점검표</th>
                            <td>{{siteInptChkTitle}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table_normal_list table_write" v-if="editYn">
                <table>
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="100">
                        <col width="*">
                        <col width="100">
                        <col width="*"> 
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>검측번호</th>
                            <td>{{inptDoc}}</td>
                            <th>등록일</th>
                            <td>{{inptRegistDate}}</td>
                        </tr>
                        <tr>
                            <th>대공종</th>
                            <td>{{mainName}}</td>
                            <th>공종</th>
                            <td>{{midName}}</td>
                        </tr>
                        <tr>
                            <th>세부공종</th>
                            <td colspan="3">{{subName}}</td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">위치 및 <br> 검측 부위</span></th>
                            <td><input type="text" class="form_control" v-model="inptLc" maxlength="50"></td>
                            <th>도면</th>
                            <td><input type="text" class="form_control" v-model="drw" maxlength="50"></td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">검측내용</span></th>
                            <td colspan="3"><input type="text" class="form_control" v-model="inptCn" maxlength="150"></td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">협력업체</span></th>
                            <td>
                                <div class="btn_wrap">
                                    <input type="text" id="" class="form_control" readonly v-model="ccpyName" v-b-modal.PartnerCompanySearch>
                                    <button type='button' class="btn btn_sm btn_darkblue btn_radius" v-b-modal.PartnerCompanySearch>검색</button>
                                </div>
                            </td>
                            <th>검측 <br> 점검표</th>
                            <td>{{siteInptChkTitle}}</td>
                            <!-- <th><span class="emp_red">검측 <br> 점검표</span></th>
                            <td>
                                <div class="btn_wrap">
                                    <input type="text" id="" class="form_control" readonly v-model="chkTitle" v-b-modal.DetectionTable>
                                    <button type='button' class="btn btn_sm btn_darkblue btn_radius" v-b-modal.DetectionTable>검색</button>
                                </div>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="padding-top:2%">
                <div class="ib_wrap">
                    <div id="infoSheetTable" class="ibsheet_table"></div>
                </div>
            </div>
        </div>
        <PartnerCompanySearch  v-on:fn-company-choice="companyChoice" v-bind:trade-type-name="tradeType" :site-mstr-id="siteMstrId"/>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
        <DetectionTable :main-id="mainCodeId" :mid-id="midCodeId" :main-nm="mainName" :mid-nm="midName" @fn-choice="fnChoice"/>
    </div>
</template>

<script>
    import API from '@/apis/'
    import PartnerCompanySearch from '@/pages/common/popup/PartnerCompanySearch.vue'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import DetectionTable from '@/pages/quality/inspectMngt/popup/DetectionTable.vue'
    import { sendPostApi, requestOptions } from '@/apis/common';
    import { InspectionRequestWrite } from '@/pages/common/data/InptOptnList'
    import loader from '@ibsheet/loader'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

    export default {
        name: 'InspectMngtInfoView',
        mixins: [MsgBoxMixins],
        components: {
            PartnerCompanySearch,
            PopAlert,
            DetectionTable,
        },
        mixins: [authCheckMixns,MsgBoxMixins],
        data() {
            return {
                // footerBg: 'transparent',

                categoryData: [],
                categoryDataSub:[],
                categoryList:[],
                mounted: false,
                popMsg: '',                                                 // 알림창 메세지
                confirmUse: false,                                          // 알림창 버튼개수
                popId:'inspInfoViewAlert',                                  // 알림창 Id'

                mainCodeId:'',                                              // 공종 Id
                midCodeId:'',                                               // 세부공종 Id
                subCodeId:'',
                mainName:'',
                midName:'',
                subName:'',
                inptLc: '',                                                 // 검측부위
                drw:'',                                                     // 도면
                inptCn:'',                                                  // 검측내용
                ccpyId:'',                                                  // 협력업체 Id
                ccpyName:'',                                                // 협력업체명
                siteInptChkId:'',                                           // 검측점검표
                chkTitle:'',
                siteInptChkTitle:'',
                tradeType:'',
                aprvOptnType:'',
                inptRegistDate:'',
                inptDoc:'',
                progrsSttus:'',
                inptOrder:'',
                dsqlfcResultCnt : 0,

                editYn: false,
                saveYn : false,
                delYn:false,
                finalDelYn:false,
                infoWriteSheet:null,
                userId:'',
            }
        },
        props:{
            siteMstrId:{
                type: String,
                default: '',
            },
            siteInptDetailId:{
                type: String,
                default: '',
            },
            copyInptSeq:{
                type: [Number,String],
                default: 0,
            },
            allSiteYn:{
                type:Boolean,
                default:false,
            }
        },
        async mounted() {
            //tree tab menu[S]
            // await this.getCategoryData();
            // this.sheetCreate();
            this.mounted = true;
            //tree tab menu[E]
            this.userId = this.$store.getters['auth/getUserId'];
            await this.inptSttusDetailView();
        },
        beforeDestroy() {
        
        },
        watch:{

        },
        methods: {
            async inptSttusDetailView(){
                //console.log(this.siteInptDetailId);
                if(this.siteInptDetailId == '' || this.siteInptDetailId == null){
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name:'InspectMngtListSheet'});
                    return;
                }
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'siteInptDetailId':this.siteInptDetailId,
                    'copyInptSeq':this.copyInptSeq,
                };
                let rst = await API.inspect.inptSttusDetailView(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(rst);
                if(rst.data.rCode =='0000'){
                    let temp = rst.data.datas.dmDetail;
                    let chkList = rst.data.datas.dlChk;
                    let data = chkList;
                    // let options = InspectionRequestWrite.options;
                    // options.Cfg['CanEdit'] = 3;
                    // options.Cols[4]['Type'] = "Radio";
                    // options.Cols[5]['Type'] = "Radio";
                    // options.Cols[6]['Type'] = "Radio";
                    let options = {
                        Cfg:{
                            NoDataMessage:3,
                            CanEdit: 3,
                        },
                        Cols: [
                            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 3 }], RelWidth: 3, CanEdit:0, },
                            { Name: 'chkIem', Header: [{ Value: '검사항목', RowSpan: 3 }], Align: 'Left', RelWidth: 20,CanEdit:0, Type: "Lines",AcceptEnters: 3, },
                            { Name: 'stndrd', Header: [{ Value: '규격 및 기준', RowSpan: 3 }], Align: 'Left', RelWidth: 33,CanEdit:0, Type: "Lines",AcceptEnters: 3, },
                            { Name: 'cnst1JdgmntResult', Header: [{ Value: '검사결과', Span: 4 }, { Value: '1차', Span: 2 }, { Value: ' 시공사' }], Type: 'Enum', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE", RelWidth: 15, CanEdit:0 },
                            { Name: 'srvn1JdgmntResult', Header: [{}, {}, { Value: ' 건설사업관리단' }], RelWidth: 15, Type: 'Enum', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE", CanEdit:0 },
                            { Name: 'cnst2JdgmntResult', Header: [{}, { Value: '2차', Span: 2 }, { Value: ' 시공사' }], RelWidth: 15, Type: 'Enum', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE", CanEdit:0 },
                            { Name: 'srvn2JdgmntResult', Header: [{}, {}, { Value: ' 건설사업관리단' }], RelWidth: 15,CanEdit:0, Type: 'Enum', Enum: "|적합|부적합|해당 없음", EnumKeys: "|PASS|UNPASS|NONE", CanEdit:0 },
                            { Name: 'msrs', Header: [{ Value: '조치사항', RowSpan: 3 }], RelWidth: 15 },
                        ]
                    };

                    //console.log(temp);
                    //console.log(chkList);
                    this.mainCodeId=temp.mainCodeId;
                    this.midCodeId=temp.midCodeId;
                    this.subCodeId = temp.subCodeId;
                    this.mainName=temp.mainName;
                    this.midName=temp.midName;
                    this.subName = temp.subName;
                    this.inptLc= temp.inptLc;
                    this.drw=temp.drw;
                    this.inptCn=temp.inptCn;
                    this.ccpyId=temp.ccpyId;
                    this.ccpyName=temp.ccpyName;
                    this.siteInptChkId=temp.siteInptChkId;
                    this.tradeType=temp.tradeType;
                    this.siteInptChkTitle=temp.siteInptChkTitle;
                    this.inptRegistDate=temp.inptRegistDate;
                    this.inptDoc=temp.inptDoc;
                    this.progrsSttus=temp.progrsSttus;
                    this.inptOrder=temp.inptOrder;
                    this.dsqlfcResultCnt= temp.dsqlfcResultCnt;

                    loader.createSheet({
                        el: 'infoSheetTable',
                        data: data,
                        options: options,
                    }).then((sheet) => {
                        this.infoWriteSheet = sheet;
                    });
                }
            },
            saveChk: function(){
                this.popMsg = '';
                if(this.mainCodeId == '' || this.mainCodeId == null){
                    this.popMsg = '공종을 입력해주세요';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    return;
                }
                if(this.midCodeId == '' || this.midCodeId == null){
                    this.popMsg = '세부공종을 입력해주세요';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    return;
                }
                if(this.inptLc == '' || this.inptLc == null){
                    this.popMsg = '위치 및 검측부위를 입력해주세요';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    return;
                }
                if(this.inptCn == '' || this.inptCn == null){
                    this.popMsg = '검측내용을 입력해주세요';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    return;
                }
                if(this.ccpyId == '' || this.ccpyId == null){
                    this.popMsg = '협력업체를 선택해주세요';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    return;
                }
                if(this.siteInptChkId == '' || this.siteInptChkId == null){
                    this.popMsg = '검측 점검표를 선택해주세요';
                    this.confirmUse = false;
                    this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    return;
                }
                if(this.popMsg ==''){
                    this.confirm('저장하시겠습니까?',this.fnSave);
                    
                    //console.log('dd');
                }
            },
            fnSave: async function(){
                this.saveYn = false;
                this.delYn = false;
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'inptLc':this.inptLc,
                    'inptCn':this.inptCn,
                    'ccpyId':this.ccpyId,
                    'ccpyName':this.ccpyName,
                    'siteInptChkId':this.siteInptChkId,
                    'copyInptSeq':this.copyInptSeq,
                    'siteInptDetailId':this.siteInptDetailId,
                };
                if(this.drw!= '' && this.drw != null){
                    param['drw'] = this.drw;
                }
                
                let rst = await API.inspect.inptSttusChange(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(rst);
                if(rst.status == 200){
                    // this.saveYn = true;
                    // this.popMsg = '저장되었습니다';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    this.alert('저장되었습니다.',()=>{
                        this.editYn = false;
                        this.inptSttusDetailView();
                    });
                    return;
                }else{
                    // this.saveYn = false;
                    // this.popMsg = '저장에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    this.alert('저장에 실패했습니다.');
                    return;
                }
            },
            fnDelYn: function (){
                // this.delYn = true;
                // this.popMsg = '삭제하시겠습니까?';
                // this.confirmUse= true;
                // this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                this.confirm('삭제하시겠습니까?',this.fnDel);
            },
            fnDel: async function(){
                this.finalDelYn = false;
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'siteInptDetailId':this.siteInptDetailId,
                    'copyInptSeq':this.copyInptSeq,
                };
                let rst = await API.inspect.inptSttusDelete(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(rst);
                if(rst.status == 200){
                    // this.finalDelYn = true;
                    // this.popMsg = '삭제되었습니다';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    this.alert('삭제되었습니다.',this.fnBack);
                    return;
                }else{
                    // this.finalDelYn = false;
                    // this.popMsg = '삭제에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    this.alert('삭제에 실패했습니다.');
                    return;
                }
            },
            fnTossChk: function(){
                this.tossYn = false;
                if(this.inptOrder.toString() != '1' || this.progrsSttus != 'APRV'){
                    return;
                }
                // this.popMsg = '2차 실시하시겠습니까?';
                // this.confirmUse = true;
                // this.tossYn = true;
                // this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                this.confirm('2차 실시하시겠습니까?',this.fnToss);
            },
            fnToss: async function(){
                this.saveYn = false;
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'inptOrder':'2',
                    'siteInptDetailId':this.siteInptDetailId,
                    'copyInptSeq':this.copyInptSeq,
                    'progrsSttus':'INRG',
                    'requstSaveYn':'N',
                    'dspthSaveYn':'N', 
                };
                let rst = await API.inspect.requstDocAprvRecomWrite(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(rst);
                // if(rst.statusText == 'OK'){
                if(rst.status == 200){
                    // this.saveYn = true;
                    // this.popMsg = '저장되었습니다';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    // return;
                    this.alert('저장되었습니다.',()=>{
                        this.editYn = false;
                        this.inptSttusDetailView();
                    });
                    // return;
                }else{
                    // this.saveYn = false;
                    // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다';
                    // this.confirmUse = false;
                    // this.$root.$emit('bv::show::modal', 'inspInfoViewAlert');
                    // return;
                    this.alert('저장에 실패했습니다.');
                }
            },
            fnChoice:function(info){//체크리스트 검색 후 event
                this.siteInptChkTitle = info.chkTitle;
                this.siteInptChkId = info.siteInptChkId;
            },
            companyChoice : function(infoCompany){ //협력사 검색 후 event
                this.ccpyId = infoCompany.tradeId;
                this.ccpyName = infoCompany.tradeNm;
            },
            fnBack: function(){
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                if(!this.allSiteYn){
                    // this.$router.go(-1);
                    this.$router.push({name:'InspectMngtListSheet'});
                    return;
                }else{
                    this.$store.dispatch('setInformation', {
                        siteMstrId: this.siteMstrId,
                    })

                    let blankTemp = this.$router.resolve({
                        name : 'InspectMngtListAllSite',
                    });
                    window.open(blankTemp.href,'_blank');
                    // this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    // this.$router.go(-1);
                }
            },
            alertConfirmFn:function(){
                if(this.finalDelYn){
                    this.finalDelYn = false;
                    this.fnBack();
                }
                if(this.delYn){
                    this.delYn = false;
                    this.fnDel();
                    this.confirmUse = false;
                }
                if(this.saveYn){
                    this.saveYn = false;
                    this.editYn = false;
                    this.inptSttusDetailView();
                }
                if(this.tossYn){
                    this.tossYn = false;
                    this.fnToss();
                }
                this.$root.$emit('bv::hide::modal', 'inspInfoViewAlert');
            },
            closePop:function(){
                if(this.delYn){
                    this.delYn = false;
                    this.confirmUse = false;
                }
                this.finalDelYn = false;
                this.saveYn = false;
                this.tossYn = false;
                this.$root.$emit('bv::hide::modal', 'inspInfoViewAlert');
            },
            cancelBtn:function(){
                this.confirm('취소하시겠습니까?',()=>{
                    this.editYn = false;
                    this.inptSttusDetailView();
                });
            }
        }
    }
</script>