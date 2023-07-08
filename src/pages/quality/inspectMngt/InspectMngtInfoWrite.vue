<template>
    <div class="tab_contents">
        <div class="inner type2">
            <div class="button_box">
                <h2>{{title}}</h2>
                <div class="fr">
                    <button v-if="checkUser(this.userId,'write')" type="button" class="btn btn_md btn_outline btn_darkgray" @click="saveChk">저장</button>
                    <!-- <button type="button" class="btn btn_md btn_outline btn_darkgray">결재상신</button> -->
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fnBack">목록</button>
                </div>
            </div>
            <div class="table_normal_list table_write">
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
                            <th><span class="emp_red">대공종</span></th>
                            <td>
                                <select name="" id="mainCode" class="form_control" v-model="mainCodeId" v-on:change="selectChange('main')">
                                    <option value="" selected>선택</option>
                                    <option v-for="(item, index) in mainCodeCombo" :key="index" :value="item.mainCodeId">
                                        {{ item.mainName }}
                                    </option>
                                    <!-- <option v-for="(item,oneIndex) in categoryData" v-bind:key="oneIndex" v-bind:value="item.mainCodeId">
                                        {{item.mainName}}
                                    </option> -->
                                </select>
                            </td>
                            <th><span class="emp_red">공종</span></th>
                            <td>
                                <select name="" id="midCode" class="form_control" v-model="midCodeId" v-on:change="selectChange('mid')" :disabled="mainCodeId == '' || mainCodeId == null ? true : false">
                                    <option value="" selected>선택</option>
                                    <option v-for="(midItem, index) in midCodeCombo.filter(item => item.mainCodeId === mainCodeId)" :key="index" :value="midItem.midCodeId">
                                        {{midItem.midName}}
                                    </option>
                                    <!-- <option v-for="(subItem,twoIndex) in categoryDataSub" v-bind:key="twoIndex" v-bind:value="subItem.midCodeId">
                                        {{subItem.midName}}
                                    </option> -->
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">세부 공종</span></th>
                            <td colspan="3">
                                <select name="" id="subCode" class="form_control" v-model="subCodeId" v-on:change="selectChange('sub')" :disabled="midCodeId == '' || midCodeId == null ? true : false">
                                    <option value="" selected>선택</option>
                                    <option v-for="(subItem, index) in subCodeCombo.filter(item => item.midCodeId === midCodeId)" :key="index" :value="subItem.subCodeId">
                                        {{subItem.subName}}
                                    </option>
                                    <!-- <option v-for="(subItem,twoIndex) in categoryDataSub" v-bind:key="twoIndex" v-bind:value="subItem.midCodeId">
                                        {{subItem.midName}}
                                    </option> -->
                                </select>
                            </td>
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
                                    <input type="text" id="" class="form_control" readonly v-model="ccpyName" v-b-modal.InptInfoWrite_PartnerCompanySearch>
                                    <button type='button' class="btn btn_sm btn_darkblue btn_radius" v-b-modal.InptInfoWrite_PartnerCompanySearch>검색</button>
                                </div>
                            </td>
                            <th><span class="emp_red">검측 <br> 점검표</span></th>
                            <td>
                                <div class="btn_wrap">
                                    <input type="text" id="" class="form_control" readonly v-model="siteInptChkTitle" @click="inptChckTab">
                                    <button type='button' class="btn btn_sm btn_darkblue btn_radius" @click="inptChckTab">검색</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <PartnerCompanySearch :ref-id="'InptInfoWrite_PartnerCompanySearch'"  v-on:fn-company-choice="companyChoice" v-bind:trade-type-name="tradeType" :site-mstr-id="siteMstrId"/>
        <PopAlert 
            v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
            v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
        />
        <DetectionTable
            :main-id="mainCodeId"
            :main-nm="mainName"
            :mid-id="midCodeId" 
            :mid-nm="midName"
            :sub-id="subCodeId" 
            :sub-nm="subName"
            @fn-choice="fnChoice"/>
    </div>
</template>

<script>
    import { sendPostApi, requestOptions } from '@/apis/common'
    import PartnerCompanySearch from '@/pages/common/popup/PartnerCompanySearch.vue'
    import PopAlert from '@/pages/common/popup/PopAlert.vue' 
    import DetectionTable from '@/pages/quality/inspectMngt/popup/DetectionTable.vue' 
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import API from '@/apis/'
    import axios from 'axios'

   export default {
        name: 'InspectMngtInfoWrite',
        mixins: [MsgBoxMixins,authCheckMixns],
        components: {
            PartnerCompanySearch,
            PopAlert,
            DetectionTable,
        },
        data() {
            return {
                siteMstrId:'',
                mainCodeCombo : [],
                midCodeCombo : [],
                subCodeCombo : [],
                mainCodeId : '',    // 대공종 Id
                mainName : '',
                midCodeId : '',     // 공종 Id
                midName : '',
                subCodeId : '',     // 세부공종 Id
                subName : '',

                categoryData: [],
                categoryDataSub:[],
                categoryList:[],
                mounted: false,
                popMsg: '',                                                 // 알림창 메세지
                confirmUse: false,                                          // 알림창 버튼개수
                popId:'inspInfoWriteAlert',                                 // 알림창 Id
                inptLc: '',                                                 // 검측부위
                drw:'',                                                     // 도면
                inptCn:'',                                                  // 검측내용
                ccpyId:'',                                                  // 협력업체 Id
                ccpyName:'',                                                // 협력업체명
                siteInptChkId:'',                                           // 검측점검표
                tradeType:'',
                chkTitle:'',
                siteInptChkTitle:'',
                
                aprvOptnType:'',
                saveYn : false,
                siteInptDetailId:'',
                title: '',
                userId: '',
                newDocSeq:'',
                newDocSeq2:'',
            }
        },
        props:{
            detailObj:{
                Type: Object,
                default: function () {
                    return {}
                },
            }
        },
        async mounted() {
            //tree tab menu[S]
            await this.getCategoryData();
            // this.sheetCreate();
            this.mounted = true;
            //tree tab menu[E]
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
            await this.getaprvOptnType();
            //console.log(this.aprvOptnType);
            this.userId = this.$store.getters['auth/getUserId'];
        },
        beforeDestroy() {

        },
        watch:{
            mainCodeId : function(){
                if (this.mounted) {
                    if(this.mainCodeId == '' || this.mainCodeId == null){
                        document.getElementById('midCode').setAttribute('disabled', true);
                    }else{
                        document.getElementById('midCode').removeAttribute('disabled');
                    }
                }
            },
        },
        methods: {
            async getCategoryData () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                // let url = '/sendApi/api/common/codeCategory/list';
                let url = '/sendApi/api/common/cntrwkType/list';
                let param = { codeType : 'INPT' };
                
                try {
                    const data = await sendPostApi(url, param);

                    if( data.status == '200' ) {
                        this.mainCodeCombo = data.data.dlMainCode;
                        this.midCodeCombo  = data.data.dlMidCode;
                        this.subCodeCombo  = data.data.dlSubCode;
                    }
                    // this.categoryData = data.list;
                    // for(let x = 0; x<this.categoryData.length; x++){
                    //     this.categoryList.push(this.categoryData[x].mainCodeId);
                    // }
                    
                } catch (error) {
                    //console.log(error.response.data)
                }
                // if(this.detailObj.orgnSiteInptDetailId){
                //     this.midCodeId = this.detailObj.midCodeId;
                // }
                //console.log(this.midCodeId);
            },
            async loadData(){
                //console.log('detailObj',this.detailObj);
                if(Object.keys(this.detailObj).length !== 0 && this.detailObj.copyYn){
                    let param = {
                        'siteMstrId':this.detailObj.siteMstrId,
                        'siteInptDetailId':this.detailObj.siteInptDetailId,
                        'copyInptSeq':this.detailObj.copyInptSeq,
                    };
                    let rst = await API.inspect.inptSttusDetailView(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log(rst);

                    if(rst.data.rCode =='0000'){
                        this.title = '검측 복사 등록';
                        let temp = rst.data.datas.dmDetail;
                        //console.log(temp);
                        this.mainCodeId = temp.mainCodeId;
                        this.mainName   = temp.mainName;
                        this.midCodeId  = temp.midCodeId;
                        this.midName    = temp.midName;
                        this.subCodeId  = temp.subCodeId;
                        this.subName    = temp.subName;
                        this.inptLc     = temp.inptLc;
                        this.drw        = temp.drw;
                        this.inptCn     = temp.inptCn;
                        this.ccpyId     = temp.ccpyId;
                        this.ccpyName   = temp.ccpyName;
                        this.tradeType  = temp.tradeType;
                        // this.siteInptChkId       =temp.siteInptChkId;
                        // this.siteInptChkTitle    =temp.siteInptChkTitle;
                        this.inptRegistDate = temp.inptRegistDate;
                        this.progrsSttus    = temp.progrsSttus;
                        this.selectChange();
                    }
                }
            },
            async getaprvOptnType(){
                const url = '/sendApi/api/apvlOptn/approvalOption/view'
                const payload = {
                    codeType: 'INPT',
                    siteMstrId: this.siteMstrId,
                    aprvOptnType: this.aprvOptnType,
                }
                const options = {
                    headers: {
                        "Content-Type": "application/json;",
                        "Accept-Language": "ko",
                        "Authorization": this.$cookies.get("Authorization")
                    }
                }
            
                axios.post(url, payload, options)
                    .then(response => {
                        if(response.status === 200 && response.data?.data) {
                            this.aprvOptnType = response.data.data.aprvOptnType;
                            //console.log(this.aprvOptnType);
                        }
                    })
                    .catch(error => {
                        //console.error(error)
                        throw new Error(error)
                    })
                this.title = '검측 등록';
                this.loadData();
            },
            inptChckTab : function(){
                if( this.mainCodeId == '' ){
                    this.alert("대공종이 선택되지 않았습니다.");
                    return;
                } else {
                    let mainNm = document.getElementById("mainCode");
                    this.mainName = mainNm.options[mainNm.selectedIndex].text;
                }
                if( this.midCodeId == '' ){
                    this.alert("공종이 선택되지 않았습니다.");
                    return;
                } else {
                    let midNm = document.getElementById("midCode");
                    this.midName = midNm.options[midNm.selectedIndex].text;
                }
                if( this.subCodeId == '' ){
                    this.alert("세부공종이 선택되지 않았습니다.");
                    return;
                } else {
                    let subNm = document.getElementById("subCode");
                    this.subName = subNm.options[subNm.selectedIndex].text;
                }

                this.$root.$emit('bv::show::modal', 'DetectionTable');
            },
            saveChk: function(){
                this.popMsg = '';
                if(this.mainCodeId == '' || this.mainCodeId == null){
                    this.alert('대공종을 선택해주세요.');
                    return;
                }
                if(this.midCodeId == '' || this.midCodeId == null){
                    this.alert('공종을 선택해주세요.');
                    return;
                }
                if(this.subCodeId == '' || this.subCodeId == null){
                    this.alert('세부 공종을 선택해주세요.');
                    return;
                }
                if(this.inptLc == '' || this.inptLc == null){
                    this.alert('위치 및 검측부위를 입력해주세요.');
                    return;
                }
                if(this.inptCn == '' || this.inptCn == null){
                    this.alert('검측내용을 입력해주세요.');
                    return;
                }
                if(this.ccpyId == '' || this.ccpyId == null){
                    this.alert('협력업체를 선택해주세요.');
                    return;
                }
                if(this.siteInptChkId == '' || this.siteInptChkId == null){
                    this.alert('검측 점검표를 선택해주세요.');
                    return;
                }
                if(this.popMsg ==''){
                    this.confirm('저장하시겠습니까?', this.fnSave);
                    // this.fnSave();
                    //console.log('dd');
                }
            },
            fnSave: async function(){
                this.saveYn = false;
                let ruleUrl   = '/sendApi/api/docNum/docNumSettList';
                let docSeq = '/sendApi/api/docNum/selectDocNumSeq';
                let write = '/sendApi/api/inptMngt/inptSttus/inptSttus/write';
                let payload = {
                    siteMstrId: this.siteMstrId,
                    codeType: 'INPT',
                    codeDtlType: 'CREQ',
                    gjmcd:  this.mainCodeId,
                    gjscd: this.midCodeId,
                    aprvOptnType: this.aprvOptnType,
                    docType: '',
                };
                let payload2 = {
                    siteMstrId: this.siteMstrId,
                    codeType: 'INPT',
                    codeDtlType: 'CRES',
                    gjmcd:  this.mainCodeId,
                    gjscd: this.midCodeId,
                    aprvOptnType: this.aprvOptnType,
                    docType: '',
                };
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'mainCodeId':this.mainCodeId,
                    'midCodeId':this.midCodeId,
                    'subCodeId':this.subCodeId,
                    'inptLc':this.inptLc,
                    'inptCn':this.inptCn,
                    'ccpyId':this.ccpyId,
                    'ccpyName':this.ccpyName,
                    'siteInptChkId':this.siteInptChkId,
                    'siteInptChkTitle':this.siteInptChkTitle,
                };
                if(this.drw!= '' && this.drw != null){
                    param['drw'] = this.drw;
                }

                let options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(ruleUrl, payload2, options)
                .then(response => {
                    let requstSamenssYn   = response.data.datas.dlDocNum?.[0]?.requstSamenssYn;
                    if (requstSamenssYn === 'Y') {
                        return axios.all([
                            axios.post(docSeq, payload,options),
                        ])
                    } else {
                        return axios.all([
                            axios.post(docSeq, payload, options),
                            axios.post(docSeq, payload2, options),
                        ])
                    }
                }) .then(axios.spread((...response) => {
                    if (response.length > 1) {
                        this.newDocSeq  = response[0].data
                        this.newDocSeq2 = response[1].data
                    } else {
                        this.newDocSeq  = response[0].data
                        this.newDocSeq2 = response[0].data
                    }
                }))
                .catch(error => {
                    this.alert('저장에 실패했습니다.');
                    console.error(error)
                })
                .then(() => {
                    axios.post(
                        write,
                        {
                            ...payload,
                            inptDoc: this.newDocSeq,
                            dspthInptDoc:this.newDocSeq2,
                            siteMstrId:this.siteMstrId,
                            mainCodeId:this.mainCodeId,
                            midCodeId:this.midCodeId,
                            subCodeId:this.subCodeId,
                            inptLc:this.inptLc,
                            inptCn:this.inptCn,
                            ccpyId:this.ccpyId,
                            ccpyName:this.ccpyName,
                            siteInptChkId:this.siteInptChkId,
                            siteInptChkTitle:this.siteInptChkTitle,
                            drw:this.drw,
                        }, 
                        options)
                        .then(writeRes => {
                            //console.log(writeRes)
                            this.siteInptDetailId = writeRes.data.id;
                            // this.saveYn = true; 
                            // this.popMsg = '저장되었습니다';
                            // this.confirmUse = false;
                            // this.$root.$emit('bv::show::modal', 'inspInfoWriteAlert');
                            this.alert('저장되었습니다.',()=>{
                                this.newDocSeq = '';
                                this.newDocSeq2 = '';
                                this.mainCodeId = '';
                                this.midCodeId = '';
                                this.inptLc = '';
                                this.inptCn = '';
                                this.ccpyId = '';
                                this.ccpyName = '';
                                this.siteInptChkId = '';
                                this.siteInptChkTitle = '';
                                this.drw = '';
                                this.mainName = '';
                                this.midName = '';

                                let param = {
                                    'siteMstrId':this.siteMstrId,
                                    'siteInptDetailId':this.siteInptDetailId,
                                    'copyInptSeq':'0',
                                };
                                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                this.$router.push({
                                    name : 'InspectMngtInfoView',
                                    params: param,
                                });
                            });
                            return;
                    }).catch(error => {
                        // throw new Error(error)
                        //console.error(error);
                        // this.popMsg = '오류로 인해 저장이 완료되지 않았습니다';
                        // this.confirmUse = false;
                        // this.$root.$emit('bv::show::modal', 'inspInfoWriteAlert');
                        this.alert('저장에 실패했습니다.');
                        return;
                    })
                })
            },
            selectChange : function(type) {
                if( type == 'main' ) {
                    this.midCodeId = '';
                    this.subCodeId = '';
                    // 검측 점검표 초기화
                    this.siteInptChkId = '';
                    this.siteInptChkTitle = '';
                } else if( type == 'mid' ) {
                    this.subCodeId = ''
                    // 검측 점검표 초기화
                    this.siteInptChkId = '';
                    this.siteInptChkTitle = '';
                } else if( type == 'sub' ) {
                    // 검측 점검표 초기화
                    this.siteInptChkId = '';
                    this.siteInptChkTitle = '';
                }
                // let a = this.categoryList.indexOf(this.mainCodeId);
                // //console.log(a);
                // if(!this.detailObj.orgnSiteInptDetailId){
                //     this.midCodeId       = '';
                // }

                // if(a > -1){
                //     this.categoryDataSub = this.categoryData[a].midCodeList;
                //     this.mainName        = this.categoryData[a].mainName;
                //     this.midCodeId = ''
                // }else{
                //     this.categoryDataSub = []
                //     this.mainName        = ''
                //     this.midCodeId = ''
                // }
            },
            // midChange:function(){
            //     let target = document.getElementById('midCode');
            //     this.midName = target.options[target.selectedIndex].text;
            //     this.siteInptChkTitle = '';
            //     this.siteInptChkId = '';
            //     //console.log(this.midName);
            // },
            companyChoice : function(infoCompany){ //협력사 검색 후 event
                this.ccpyId = infoCompany.tradeId;
                this.ccpyName = infoCompany.tradeNm;
            },
            fnChoice:function(info){//체크리스트 검색 후 event
                this.siteInptChkTitle = info.chkTitle;
                this.siteInptChkId = info.siteInptChkId;
            },
            fnBack: function(){
                //this.$router.go(-1);
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name:'InspectMngtListSheet'});
            },
            alertConfirmFn:function(){
                if(this.saveYn){
                    this.saveYn = false;
                    let param = {
                        'siteMstrId':this.siteMstrId,
                        'siteInptDetailId':this.siteInptDetailId,
                        'copyInptSeq':'0',
                    };
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({
                        name : 'InspectMngtInfoView',
                        params: param,
                    });
                }
                this.$root.$emit('bv::hide::modal', 'inspInfoWriteAlert');
            },
            closePop:function(){
                this.$root.$emit('bv::hide::modal', 'inspInfoWriteAlert');
            },
        }
   }
</script>