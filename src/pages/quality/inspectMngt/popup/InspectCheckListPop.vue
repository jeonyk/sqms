<template>
    <!-- 체크리스트 추가 팝업 -->
    <b-modal :id="chkPopId" v-bind:title="title"
        size="lg" @shown="sheetLoad"
        :footer-bg-variant="footerBg" static>
        <template #default>
            <div class="pop_container">
                <div class="table_normal_list mt0">
                    <table>
                        <caption class="sr_only"></caption>
                        <colgroup>
                            <col width="15%">
                            <col width="*">
                            <col width="15%">
                            <col width="*">
                        </colgroup>
                        <tbody v-if="(chkId!=''&&chkId!=null)||(siteChkId!=''&&siteChkId!=null&&siteChkId!='default')">
                            <tr>
                                <th><span>대공종</span></th>
                                <td>{{mainName}}</td>
                                <th><span>공종</span></th>
                                <td>{{midName}}</td>
                            </tr>
                            <tr>
                                <th><span>세부 공종</span></th>
                                <td colspan="3">{{subName}}</td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td colspan="3"><input type="text" class="form_control" v-model="chkTitle"></td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <th><span class="emp_red">대공종</span></th>
                                <td>
                                    <select name="" id="mainCode" class="form_control size_md" v-model="mainCodeId" v-on:change="selectChange('main')">
                                        <option value="" selected>선택</option>
                                        <option v-for="(item,oneIndex) in mainCodeCombo" :key="oneIndex" :value="item.mainCodeId">
                                            {{ item.mainName }}
                                        </option>
                                        <!-- <option v-for="(item,oneIndex) in mainCodeCombo" v-bind:key="oneIndex" v-bind:value="item.mainCodeId">
                                            {{item.mainName}}
                                        </option> -->
                                    </select>
                                </td>
                                <th><span class="emp_red">공종</span></th>
                                <td>
                                    <select name="" id="midCode" class="form_control size_md" v-model="midCodeId" :disabled="mainCodeId == '' || mainCodeId==null ? true : false" v-on:change="selectChange('mid')">
                                        <option value="" selected>선택</option>
                                        <option v-for="(subItem,twoIndex) in relatedMidList" v-bind:key="twoIndex" v-bind:value="subItem.midCodeId">
                                            {{subItem.midName}}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">세부 공종</span></th>
                                <td colspan="3">
                                    <select name="" id="subCode" class="form_control size_md" v-model="subCodeId" :disabled="midCodeId == '' || midCodeId==null ? true : false">
                                        <option value="" selected>선택</option>
                                        <option v-for="(subItem,threeIndex) in relatedSubList" v-bind:key="threeIndex" v-bind:value="subItem.subCodeId">
                                            {{subItem.subName}}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td colspan="3"><input type="text" class="form_control" v-model="chkTitle"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="button_box">
                    <button type="button" class="btn btn_sm btn_excel" @click="$bvModal.show('InspectCheckListPop_ExcelUploadModal')">엑셀 업로드</button>
                    <button type="button" class="btn btn_sm btn_excel" @click="excelDown">엑셀 다운로드</button>
                    <div class="fr">                            
                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="copyRow">행 복사</button>
                        <div class="btn_number">
                            <select name="" id="" class="form_control num" v-model="addIdx">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            <button type="button" class="btn btn_sm" v-on:click="addRow">행 추가</button>
                        </div>
                        <button type="button" class="btn btn_sm btn_darkgray" v-on:click="delRow">행 삭제</button>
                    </div>
                </div>

                <div class="ib_wrap">
                    <div :id="`inspectCheckListPopsheetTable_${popIdx}`" class="ibsheet_table" style="max-height: 337px;"></div>
                </div>
                <PopAlert 
                    v-bind:msg="popMsg" v-bind:confirm-use="confirmUse" v-bind:pop-id="popId"
                    v-on:first-btn-fn="alertConfirmFn" v-on:second-btn-fn="closePop"
                />
            </div>

            <excel-upload-modal
                ref-id="InspectCheckListPop_ExcelUploadModal"
                mode="CHECK"
                fileType="ITP"
                columnLength="0"
                @import="fn_importExcel"
            />
        </template>
        <template #modal-footer="{ }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="saveCheck" v-if="(chkId!=''&&chkId!=null)||(siteChkId!=''&&siteChkId!=null&&siteChkId!='default')">수정</b-button>
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="saveCheck" v-else>추가</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hideChk">취소</b-button>
        </template>
    </b-modal>

    
</template>
<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { DetectionChecklist } from '../../../common/data/PopupList'
import { sendPostApi, requestOptions } from '@/apis/common';
import API from '@/apis/'
import loader from '@ibsheet/loader'
import PopAlert from '@/pages/common/popup/PopAlert.vue' 

import ExcelUploadModal from '@modal/common/ExcelUploadModal.vue'

export default {
    name: 'ChecklistWrite',
    mixins: [MsgBoxMixins],
    components: {
        PopAlert,
        ExcelUploadModal,
    },
    data() {
        return {
            footerBg: 'transparent',
            mounted:false,

            popMsg: '',                                 // 알림창 메세지
            confirmUse: false,                             // 알림창 버튼개수
            popId:'checkListPopAlert',                     // 알림창 Id
            popSheet:null,
            addIdx:1,
            saveCheckYn:false,

            mainCodeId : '',
            mainName : '',
            mainCodeCombo : [],
            midCodeId:'',
            midName:'',
            midCodeCombo : [],
            relatedMidList:[],
            subCodeId:'',
            subName:'',
            subCodeCombo : [],
            relatedSubList:[],

            title:'체크리스트 추가',
            chkTitle:'',
            delIds:[],
            insertIds:[],
            siteYn: false,
            siteMstrId:'',
            headChkId:'',
            data : []
        }
    },
    props:{
        chkId:{
            type:String,
            default:'',
        },
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
            default: '',
        },
        siteChkId:{
            type:String,
            default:'',
        },
        chkPopId:{
            type:String,
            default: 'ChecklistWrite',
        },
        popIdx:{
            type:String,
            default: '0',
        }
    },
    mounted(){
        this.mounted = true;
    },
    beforeDestroy(){
        // loader.removeSheet('pop1');
    },
/*     watch:{
        mainCodeId : function(){
            if (this.mounted) {
                if(this.mainCodeId == '' || this.mainCodeId == null){
                    document.getElementById('midCode').setAttribute('disabled',true);
                }else{
                    document.getElementById('midCode').removeAttribute('disabled');
                }
            }
        },
    }, */
    methods:{
        sheetLoad: async function() {
            // loader.removeSheet('pop1');
            this.siteMstrId = this.$cookies.get('siteMstrId');
            this.delIds = [];
            this.insertIds = [];
            this.mainCodeId = '';
            this.midCodeId = '';
            this.subCodeId = '';
            this.chkTitle = '';
            this.addIdx = 1;
            let data = [];
            let options = DetectionChecklist.options;
            if(this.siteChkId == 'default'){
                this.siteYn = true;
            }
            if(this.siteChkId != '' && this.siteChkId != null && this.siteChkId != 'default'){//현장 수정
                this.title = '체크리스트 수정';
                this.siteYn = true;
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'siteInptChkId':this.siteChkId,
                };
                const siteRst = await API.inspect.siteITPChkDataDtl(param,{
                    headers:{
                        //'Authorization': this.$cookies.get("Authorization")
                    }
                });

                // console.log("@@@@ siteRst : %o", siteRst);
                if(siteRst.data.rCode == '0000'){
                    this.mainName = siteRst.data.datas.dmTitle.mainName;
                    this.midName = siteRst.data.datas.dmTitle.midName;
                    this.subName = siteRst.data.datas.dmTitle.subName;
                    this.chkTitle = siteRst.data.datas.dmTitle.chkTitle;
                    this.headChkId = siteRst.data.datas.dmTitle.inptChkId== null?'': siteRst.data.datas.dmTitle.inptChkId;
                    this.data = siteRst.data.datas.dlItpChk;
                    //console.log("@@@ data : %o",data);
                }
            } else if(this.chkId != '' && this.chkId != null){// 본사 수정
                this.title = '체크리스트 수정';
                let param = {
                    'inptChkId':this.chkId,
                };
                const popRst = await API.inspect.getHeadSetupItrDtl(param,{
                    // headers:{
                    //     'Authorization': this.$cookies.get("Authorization")
                    // }
                });
                //console.log(popRst);
                if(popRst.data.rCode == '0000'){
                    this.mainName = popRst.data.datas.dmTitle.mainName;
                    this.midName = popRst.data.datas.dmTitle.midName;
                    this.subName = popRst.data.datas.dmTitle.subName;
                    this.chkTitle = popRst.data.datas.dmTitle.chkTitle;
                    this.data = popRst.data.datas.dlChkDetail;
                    //console.log("@@@@ data : %o",this.data);
                }
            } else {// 본사 등록, 현장등록
                this.title = '체크리스트 등록';
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/common/cntrwkType/list';
                let param = { codeType: 'INPT' };
                
                const response = await sendPostApi(url, param);
                let resultData = []
                // console.log('response : %o', response);

                if(response.status == '200' && response.data.dlMainCode.length > 0){
                    // for(let x = 0; x < response.data.dlMainCode.length; x++){
                    //     resultData.push(response.data.dlMainCode[x]);
                    // }
                    // this.mainCodeCombo = resultData;
                    this.mainCodeCombo = response.data.dlMainCode;
                    this.midCodeCombo = response.data.dlMidCode;
                    this.subCodeCombo = response.data.dlSubCode;
                }
                this.data = [];
                // console.log(this.mainCodeCombo);
            }

            options.Events = {
                onRenderFirstFinish: async () => {
                    this.popSheet.loadSearchData({
                        data: this.data,
                        append: false
                    })
                },
                onAfterClick:this.fnClick,
            }

            loader.createSheet({
                // id: 'pop1',
                el: `inspectCheckListPopsheetTable_${this.popIdx}`,
                data: this.data,
                options: {
                    Cfg: {
                        NoVScroll: 0,
                        NoDataMessage:3,
                    },
                    Cols: options.Cols,
                    Events: {
                        onAfterClick:this.fnClick,
                    },
                },
            }).then((sheet) => {
                this.popSheet= sheet;
            })
        },
        saveCheck: function(){
            this.popMsg = '';
            this.saveCheckYn = false;
            this.insertIds = [];
            let rows = this.popSheet.getDataRows();
            if(rows.length<=0){
                // this.confirmUse = false;
                // this.popMsg = '검사항목을 1개 이상 등록해주세요.';
                // this.saveCheckYn = false;
                // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                this.alert('검사항목을 입력해주세요.');
                return;
            }else{
                if(this.siteYn && this.siteChkId == 'default' && (this.mainCodeId == '' || this.mainCodeId == null)){
                    // this.confirmUse = false;
                    // this.popMsg = '공종을 선택해주세요.';
                    // this.saveCheckYn = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    this.alert('대공종을 선택해주세요.');
                    return;
                }
                if(this.siteYn && this.siteChkId == 'default' && (this.midCodeId == '' || this.midCodeId == null)){
                    // this.confirmUse = false;
                    // this.popMsg = '세부 공종을 선택해주세요.';
                    // this.saveCheckYn = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    this.alert('공종을 선택해주세요.');
                    return;
                }
                if(this.siteYn && this.siteChkId == 'default' && (this.subCodeId == '' || this.subCodeId == null)){
                    // this.confirmUse = false;
                    // this.popMsg = '세부 공종을 선택해주세요.';
                    // this.saveCheckYn = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    this.alert('세부공종을 선택해주세요.');
                    return;
                }
                if(!this.siteYn && (this.chkId == '' || this.chkId == null)&&(this.mainCodeId == '' || this.mainCodeId == null)){
                    // this.confirmUse = false;
                    // this.popMsg = '공종을 선택해주세요.';
                    // this.saveCheckYn = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    this.alert('대공종을 선택해주세요.');
                    return;
                }
                if(!this.siteYn && (this.chkId == '' || this.chkId == null)&&(this.midCodeId == '' || this.midCodeId == null)){
                    // this.confirmUse = false;
                    // this.popMsg = '세부 공종을 선택해주세요.';
                    // this.saveCheckYn = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    this.alert('공종을 선택해주세요.');
                    return;
                }
                if(!this.siteYn && (this.chkId == '' || this.chkId == null)&&(this.subCodeId == '' || this.subCodeId == null)){
                    // this.confirmUse = false;
                    // this.popMsg = '세부 공종을 선택해주세요.';
                    // this.saveCheckYn = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    this.alert('세부공종을 선택해주세요.');
                    return;
                }
                if(this.chkTitle == ''||this.chkTitle == null){
                    // this.confirmUse = false;
                    // this.popMsg = '제목을 입력해주세요.';
                    // this.saveCheckYn = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    this.alert('제목을 입력해주세요.');
                    return;
                }
                for(let x = 0; x<rows.length; x++){
                    let row = {};
                    if(rows[x].chkIem == ''||rows[x].chkIem == null){
                        // this.confirmUse = false;
                        // this.popMsg = '검사항목을 모두 입력해주세요.';
                        // this.saveCheckYn = false;
                        // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                        this.alert('검사항목을 입력해주세요.');
                        return;
                    }
                    if(rows[x].stndrd == ''||rows[x].stndrd == null){
                        // this.confirmUse = false;
                        // this.popMsg = '규격 및 기준을 모두 입력해주세요.';
                        // this.saveCheckYn = false;
                        // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                        this.alert('규격 및 기준을 입력해주세요.');
                        return;
                    }
                    row['status'] = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':rows[x].Changed?'Changed':'');
                    row['inptChkId'] = this.chkId;
                    row['siteInptChkId'] = this.siteChkId == 'default'?'':( this.siteChkId == ''?'':this.siteChkId);
                    if(this.siteChkId != null && this.siteChkId != '' && this.siteChkId != 'default'){
                        row['siteDetailIemSeq'] = rows[x].siteDetailIemSeq;
                    }else{
                        row['detailIemSeq'] = rows[x].detailIemSeq;
                    }
                    row['chkIem'] = rows[x].chkIem;
                    row['stndrd'] = rows[x].stndrd;
                    this.insertIds.push(row);
                }   
                // console.log(this.insertIds);
            }
            if(this.popMsg == ''){
                let str = '';
                if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                    str = '수정하시겠습니까?';
                }else{
                    str = '추가하시겠습니까?';
                }
                this.confirm(str, async () => {
                    // this.saveCheckYn = true;
                    this.finalSave();
                });
            }
        },
        finalSave: async function(){
            if(this.siteChkId!= '' && this.siteChkId != null && this.siteChkId != 'default'){
                //현장 수정
                for(let x = 0; x<this.delIds.length;x++){//삭제용
                    let temp = {
                        'siteInptChkId':this.siteChkId,
                        'siteDetailIemSeq':this.delIds[x],
                        'status':'Deleted',
                    };
                    this.insertIds.push(temp);
                }
                let param = {
                    'param':{
                        'siteMstrId':this.siteMstrId,
                        'siteInptChkId':this.siteChkId,
                        'chkTitle':this.chkTitle,
                    },
                    'listData':this.insertIds,
                };
                const siteChangeRst = await API.inspect.siteITPChkDataWrite(param, {
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(siteChangeRst);
                if(siteChangeRst.data.rCode != '9999' && siteChangeRst.data.rCode != '9998'){
                    // this.popMsg = '저장되었습니다';
                    // this.confirmUse = false;
                    // this.saveCheckYn  = true;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    let str = '';
                    if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                        str = '수정되었습니다.';
                    }else{
                        str = '추가되었습니다.';
                    }
                    this.alert(str,()=>{
                        this.chkTitle = '';
                        this.midName = '';
                        this.mainName = '';
                        this.subName = '';
                        this.data = [];
                        this.popSheet.dispose();                
                        this.$emit('insert',true);
                        this.$root.$emit('bv::hide::modal', this.chkPopId);
                    });
                }else{
                    // this.popMsg = siteChangeRst.data.rMsg;
                    let str = '';
                    if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                        str = '수정에 실패했습니다.';
                    }else{
                        str = '추가에 실패했습니다.';
                    }
                    this.alert(str);
                    return;
                    // this.popMsg = '저장에 실패했습니다.';
                    // this.confirmUse = false;
                    // this.saveCheckYn  = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                }
            } else if(this.siteChkId == 'default') {
                //현장 등록
                let siteParam = {
                    'param':{
                        'siteMstrId':this.siteMstrId,
                        'mainCodeId':this.mainCodeId,
                        'midCodeId':this.midCodeId,
                        'subCodeId':this.subCodeId,
                        'chkTitle':this.chkTitle,
                        'siteInptChkId':this.siteChkId == 'default'?'':( this.siteChkId == ''?'':this.siteChkId),
                    },
                    'listData':this.insertIds,
                };
                const rst4 = await API.inspect.siteITPChkDataWrite(siteParam,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(rst4);
                if(rst4.data.rCode != '9999' &&rst4.data.rCode != '9998'){
                    // this.popMsg = '저장이 완료되었습니다';
                    // this.confirmUse = false;
                    // this.saveCheckYn  = true;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    let str = '';
                    if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                        str = '수정되었습니다.';
                    }else{
                        str = '추가되었습니다.';
                    }
                    this.alert(str,()=>{
                        this.chkTitle = '';
                        this.midName = '';
                        this.mainName = '';
                        this.subName = '';
                        this.$root.$emit('bv::hide::modal', 'checkListPopAlert');
                        this.data = [];
                        this.popSheet.dispose();                
                        this.$emit('insert',true);
                        this.$root.$emit('bv::hide::modal', this.chkPopId);
                    });
                }else{
                    // this.popMsg = '오류로 인해 저장이 완료되지않았습니다.';
                    // // this.popMsg = rst4.data.rMsg;
                    // this.confirmUse = false;
                    // this.saveCheckYn  = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    let str = '';
                    if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                        str = '수정에 실패했습니다.';
                    }else{
                        str = '추가에 실패했습니다.';
                    }
                    this.alert(str);
                    return;
                }
            }else if(this.chkId != '' && this.chkId != null){
                //본사 수정
                for(let x = 0; x<this.delIds.length;x++){//삭제용
                    let temp = {
                        'inptChkId':this.chkId,
                        'detailIemSeq':this.delIds[x],
                        'status':'Deleted',
                    };
                    this.insertIds.push(temp);
                }
                let param = {
                    'param':{
                        'inptChkId':this.chkId,
                        'chkTitle':this.chkTitle,
                    },
                    'listData':this.insertIds,
                };
                const rst3 = await API.inspect.setHeadSetupItrDtl(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(rst3);
                if(rst3.status==200){
                    // this.popMsg = '저장이 완료되었습니다';
                    // this.confirmUse = false;
                    // this.saveCheckYn  = true;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    let str = '';
                    if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                        str = '수정되었습니다.';
                    }else{
                        str = '추가되었습니다.';
                    }
                    this.alert(str,()=>{
                        this.chkTitle = '';
                        this.midName = '';
                        this.mainName = '';
                        this.$root.$emit('bv::hide::modal', 'checkListPopAlert');
                        this.data = [];
                        this.popSheet.dispose();                
                        this.$emit('insert',true);
                        this.$root.$emit('bv::hide::modal', this.chkPopId);
                    });
                }else{
                    // this.popMsg = '오류로 인해 저장이 완료되지않았습니다.';
                    // this.confirmUse = false;
                    // this.saveCheckYn  = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    let str = '';
                    if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                        str = '수정에 실패했습니다.';
                    }else{
                        str = '추가에 실패했습니다.';
                    }
                    this.alert(str);
                    return;
                }
            }else{
                //본사 등록
                let param = {
                    'param':{
                        'mainCodeId':this.mainCodeId,
                        'midCodeId':this.midCodeId,
                        'subCodeId':this.subCodeId,
                        'chkTitle':this.chkTitle,
                    },
                    'listData':this.insertIds,
                };
                const rst4 = await API.inspect.writeHeadSetupItrDtl(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log(rst4);
                if(rst4.status==200){
                    // this.popMsg = '저장이 완료되었습니다';
                    // this.confirmUse = false;
                    // this.saveCheckYn  = true;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    let str = '';
                    if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                        str = '수정되었습니다.';
                    }else{
                        str = '추가되었습니다.';
                    }
                    this.alert(str,()=>{
                        this.chkTitle = '';
                        this.midName = '';
                        this.mainName = '';
                        this.subName = '';
                        this.$root.$emit('bv::hide::modal', 'checkListPopAlert');
                        this.data = [];
                        this.popSheet.dispose();                
                        this.$emit('insert',true);
                        this.$root.$emit('bv::hide::modal', this.chkPopId);
                    });
                }else{
                    // this.popMsg = '오류로 인해 저장이 완료되지않았습니다.';
                    // this.confirmUse = false;
                    // this.saveCheckYn  = false;
                    // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                    let str = '';
                    if((this.chkId!=''&&this.chkId!=null)||(this.siteChkId!=''&&this.siteChkId!=null&&this.siteChkId!='default')){
                        str = '수정에 실패했습니다.';
                    }else{
                        str = '추가에 실패했습니다.';
                    }
                    this.alert(str);
                    return;
                }
            }
        },
        delRow: function(){ //행삭제
            let sheet = this.popSheet;
            let rows = sheet.getRowsByChecked("selectYn");
            //console.log(rows);
            if(rows == []||rows.length == 0){
                // this.confirmUse = false;
                // this.popMsg = '삭제할 행을 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                this.alert('선택된 행이 없습니다.');
                return;
            }else{
                for(let i =0; i< rows.length; i++){
                    let id = '';
                    if(this.siteChkId != null && this.siteChkId != '' && this.siteChkId != 'default'){
                        id = rows[i].siteDetailIemSeq;
                    }else{
                        id = rows[i].detailIemSeq;
                    }
                    if(id != '' && id != null){
                        this.delIds.push(id);
                    }
                }
                sheet.removeRows(rows);
                //console.log(this.delIds);
            }
        },
        copyRow: function(){    //행복사
            let rows = this.popSheet.getRowsByChecked("selectYn");
            // //console.log(this.sheet1.getRowsByChecked("checkYn"));
            if(rows == []||rows.length == 0){
                // this.confirmUse = false;
                // this.popMsg = '복사할 행을 선택해주세요.';
                // this.$root.$emit('bv::show::modal', 'checkListPopAlert');
                this.alert('선택된 행이 없습니다.');
                return;
            }else{
                this.popSheet.copyRows({rows:rows,next:this.popSheet.getFirstRow()});
                for(let i = 1;i <=rows.length; i++){
                    let selectRow = this.popSheet.getRowByIndex(i);
                    selectRow['selectYn'] = 0;
                    selectRow['siteDetailIemSeq'] = '';
                    selectRow['detailIemSeq'] = '';
                    this.popSheet.refreshRow(selectRow);
                }
            }   
        },
        addRow:function(){  //행추가
            let row = this.popSheet.getRowsByChecked("selectYn");
            if(row.length>0){
                this.popSheet.addRows({"count":this.addIdx,"next":this.popSheet.getNextRow(row[0])});
            }else{
                this.popSheet.addRows({"count":this.addIdx,"next":this.popSheet.getFirstRow()});
            }
            for(let i = 1; i<= this.addIdx;i++){
                let selectRow = this.popSheet.getRowByIndex(i);
                // //console.log(selectRow);
                // selectRow['selectYn'] = 0;
                selectRow['detailIemSeq'] = '';
                selectRow['siteDetailIemSeq'] = '';
                selectRow['siteMstrId'] = this.siteMstrId;
                
                this.popSheet.refreshRow(selectRow);
            }
        },
        
        alertConfirmFn:function(){

            //console.log("@@@@ saveCheckYn : "+this.saveCheckYn);
            if(this.saveCheckYn){
                this.saveCheckYn = false;
                //this.chkId = '';     prop data는 변경이 불가함
                // this.mainId = '';
                // this.midId = '';
                this.chkTitle = '';
                this.midName = '';
                this.mainName = '';
                this.$root.$emit('bv::hide::modal', 'checkListPopAlert');
                this.data = [];
                this.popSheet.dispose();                
                this.$emit('insert',true);
                this.$root.$emit('bv::hide::modal', this.chkPopId);
                return;
            }
            if(!this.saveCheckYn){
                this.$root.$emit('bv::hide::modal', 'checkListPopAlert');
            }
            
        },
        hideChk: function(){
            this.confirm('취소하시겠습니까?',this.hidePop);
        },
        hidePop:function(){
            this.saveCheckYn = false;
            this.data = [];
            //this.chkId = '';
            // this.mainId = '';
            // this.midId = '';
            this.chkTitle = '';
            this.midName = '';
            this.mainName = '';
            this.popSheet.dispose();
            this.$root.$emit('bv::hide::modal', this.chkPopId);
        },
        closePop:function(){
            this.$root.$emit('bv::hide::modal', 'checkListPopAlert');
        },
        escEvent:function(){
            if(e.keyCode == 27) {
                this.hidePop();
            }
        },
        selectChange: function(type){
            this.subCodeId = '';
            this.relatedSubList = [];
            if(type == 'main'){
                this.midCodeId = '';
                // console.log(this.midCodeCombo);
                if(this.mainCodeId != ''){
                    this.relatedMidList = [];
                    this.midCodeCombo.forEach(item => {
                        // console.log('item',item.mainCodeId,'this',this.mainCodeId,item.mainCodeId  == this.mainCodeId);
                        if(item.mainCodeId  == this.mainCodeId){
                            this.relatedMidList.push(item);
                        }
                    });
                }   
            }else if(type == 'mid'){
                if(this.midCodeId != ''){
                    // console.log(this.subCodeCombo);
                    this.subCodeCombo.forEach(item => {
                        if(item.midCodeId  == this.midCodeId){
                            this.relatedSubList.push(item);
                        }
                    });
                    // console.log(this.relatedSubList);
                }   
            }
        },
        fn_importExcel: function (data) {
            for(let x = 0; x<data.length; x++){
                data[x]['Added'] = 1;
            }
            this.popSheet.loadSearchData({
                data: data,
                append: true,
                next: this.popSheet.getFirstRow()
            });
            this.$bvModal.hide('InspectCheckListPop_ExcelUploadModal');
        },
        excelDown:function(){
            this.popSheet.down2Excel({
                merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                downCols:   'SEQ|chkIem|stndrd',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                reqHeader:  {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Accept-Language': 'ko'
                },
                fileName:   `${this.title}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
            })
        },
        fnClick:function(evt){
            // console.log(evt.row);
        },
    },
}
</script>
