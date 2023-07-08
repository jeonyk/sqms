<template>
    <!-- 품질시험기관/담당자 추가 팝업 -->
     <b-modal :id="refId" title="품질시험기관/담당자 추가" modal-footer no-close-on-backdrop size="lg" :footer-bg-variant="footerBg" @shown="loadPopup">
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
                                <th><span class="emp_red">시험기관명</span></th>
                                <td>
                                    <span v-if="editMode == 'W'">
                                        <input type="text" v-model="dataInfo.testInsttName" class="form_control" maxlength="50">
                                    </span>
                                    <span v-else>{{dataInfo.testInsttName}}</span>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">담당자명</span></th>
                                <td>
                                    <span v-if="editMode == 'W' || editMode == 'U'">
                                        <input type="text" v-model="dataInfo.userNm" class="form_control" maxlength="20">
                                    </span>
                                    <span v-else>{{dataInfo.userNm}}</span>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">E-MAIL</span></th>
                                <td>
                                    <span v-if="editMode == 'W' || editMode == 'U'">
                                        <input type="text" v-model="dataInfo.email" class="form_control" maxlength="50">
                                    </span>
                                    <span v-else>{{dataInfo.email}}</span>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">연락처</span></th>
                                <td>
                                    <span v-if="editMode == 'W' || editMode == 'U'">
                                        <input type="text" v-model="dataInfo.cttpc" class="form_control" maxlength="13">
                                    </span>
                                    <span v-else>{{dataInfo.cttpc}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkblue" @click="saveChkData()" v-show="editMode=='W'" >추가</b-button>
            <b-button class="btn btn_md btn_outline btn_darkblue" @click="modeChange()" v-show="editMode=='S'" >수정</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')" v-show="editMode=='S'">닫기</b-button>
            <b-button class="btn btn_md btn_outline btn_darkblue" @click="saveChkData()" v-show="editMode=='U'" >저장</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')" v-show="editMode=='W' || editMode=='U'">취소</b-button>
        </template>
    </b-modal> 

</template>

<script>
import { sendPostApi, requestOptions } from '@/apis/common';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

export default {
    name: 'AddTestInsttPop',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'AddTestInsttPop',
        },
        requestParams : {
            type: Object,
            default: null
        }
    },
    mounted () {
        
    },
    data () {
        return {
            footerBg : 'transparent',
            dataInfo : {
                siteMstrId :'',     /* 현장정보 ID */
                testInsttId :'',    /* 시험기관ID */
                testInsttName :'',  /* 시험기관명 */
                userNm :'',         /* 사용자명 */
                email :'',          /* 이메일 */
                cttpc :'',          /* 연락처 */
            },
            editMode : '', // WSU
        }
    },
    methods: {
        loadPopup() {   // popup shown
            // console.log("requestParams : %o", this.requestParams)
            this.editMode    = this.requestParams.editMode;
            this.siteMstrId  = this.requestParams.siteMstrId;
            this.testInsttId = this.requestParams.testInsttId;

            if(this.siteMstrId != "" && this.testInsttId != ""){
                this.getInsttData();
            }
        },
        modeChange : function(){
            this.editMode = 'U';
        },
        getInsttData : async function(){
            const url = '/sendApi/api/testMngt/siteSetUp/qltyTestInstt/view';
                let payload = {
                    siteMstrId :  this.siteMstrId,
                    testInsttId : this.testInsttId,
                };
                const data = await sendPostApi(url, payload);

                if(data.status == 200){
                    this.dataInfo = data.data.datas.dmTestInstt;
                }
        },
        saveChkData : function(){
            if( this.dataInfo.testInsttName == ''){
                this.alert("시험기관명은 필수 입력 사항입니다.");
                return;
            }
            if( this.dataInfo.userNm  == ''){
                this.alert("사용자명은 필수 입력 사항입니다.");
                return;
            }
            if( this.dataInfo.email  == ''){
                this.alert("이메일은 필수 입력 사항입니다.");
                return;
            }
            if( this.dataInfo.cttpc  == ''){
                this.alert("연락처는 필수 입력 사항입니다.");
                return;
            }

            if( this.editMode == 'W' ){
                this.confirm('추가 하시겠습니까?', this.chkDplct, "");
            } else if( this.editMode == 'U' ){
                this.confirm('저장 하시겠습니까?', this.insttUpdSave, "");
            }
        },
        chkDplct : async function(){
            // console.log("chkDplct")
            let chkDplct = null;
            let url = '/sendApi/api/testMngt/siteSetUp/qltyTestInsttDplct/view';
            let payload = {
                ...this.dataInfo,
                siteMstrId : this.$cookies.get('siteMstrId')
            };

            const data = await sendPostApi(url, payload);

            if( data.status == 200 ){
                chkDplct = data.data.datas.dmDplctChk;
                if( chkDplct.dplctCnt > 0){
                    this.alert("이미 등록된 E-mail/연락처입니다.");
                    return;
                } else {
                    this.insttInsSave();
                }
            }
        },
        insttInsSave : async function(){
            // console.log("insttInsSave")
            let url = '/sendApi/api/testMngt/siteSetUp/qltyTestInstt/write';
            let payload = {
                ...this.dataInfo,
                siteMstrId : this.$cookies.get('siteMstrId')
            };

            const data = await sendPostApi(url, payload);

            // console.log("data : %o", data)
            if( data.status == 200 ){
                this.alert("추가 되었습니다.", this.popClose)
                // let paymentType = data.data.aprvOptnType;
            }
        },
        insttUpdSave : async function(){
            // console.log("insttUpdSave")
            let url = '/sendApi/api/testMngt/siteSetUp/qltyTestInstt/change';
            let payload = {
                ...this.dataInfo,
                siteMstrId : this.$cookies.get('siteMstrId')
            };

            const data = await sendPostApi(url, payload);

            // console.log("data : %o", data)
            if( data.status == 200 ){
                this.alert("수정 되었습니다.", this.popClose)
            }
        },
        popClose : function(){
            this.$emit('responseInsttCallback', this.requestParams);
        },
    },
}
</script>
