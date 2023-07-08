<template>
    <div class="tab_contents">
        <h2 class="sub_title">메뉴관리 &gt; 코드 상세</h2>
        <div class="inner" v-show="!editYn">
            <div class="table_normal_list table_write">
                <table>
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="148">
                        <col width="*">
                        <col width="148">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span class="emp_red">분류코드</span></th>
                            <td colspan="3">{{detailObj.groupCode}}</td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">코드</span></th>
                            <td colspan="3">{{detailObj.codeVal}}</td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">코드명(국문)</span></th>
                            <td>{{detailObj.codeNameKr}}</td>
                            <th><span class="emp_red">코드명(영문)</span></th>
                            <td>{{detailObj.codeNameEn}}</td>
                        </tr>
                        <tr>
                            <th><span class="">비고</span></th>
                            <td colspan="3">
                                <div class="textarea">{{detailObj.explanation}}</div>
                            </td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">사용여부</span></th>
                            <td>{{detailObj.useYn == 'Y'? '사용':'미사용'}}</td>
                            <th><span class="emp_red">정렬 순서</span></th>
                            <td>{{detailObj.sortOrder}}</td>
                        </tr>
                    </tbody>
                </table>
            </div> <!-- // table_normal_list table_write -->
            <div class="submit_area pt20 ar">
                <div class="fl">
                    <button class="btn btn_md btn_darkgray btn_outline" @click="fnUnuse()">삭제</button>
                </div>
                <div class="fr">
                    <button class="btn btn_md btn_darkgray" @click="changeEdit()">수정</button>
                    <button type="button" class="btn btn_md btn_gray" @click="fnBack()">목록</button>
                </div>
            </div>
        </div>

        <div class="inner" v-show="editYn">
            <div class="table_normal_list table_write">
                <table>
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="148">
                        <col width="*">
                        <col width="148">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><span class="emp_red">분류코드</span></th>
                            <td colspan="3"><input type="text" class="form_control xlarge" v-model="detailObj.groupCode"></td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">코드</span></th>
                            <td colspan='3'><input type="text" class="form_control" v-model="detailObj.codeVal"></td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">코드명(국문)</span></th>
                            <td><input type="text" class="form_control" v-model="detailObj.codeNameKr"></td>
                            <th><span class="emp_red">코드명(영문)</span></th>
                            <td><input type="text" class="form_control" v-model="detailObj.codeNameEn"></td>
                        </tr>
                        <tr>
                            <th><span class="">비고</span></th>
                            <td colspan="3"><textarea name="" id="" class="form_control" v-model="detailObj.explanation"></textarea></td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">사용여부</span></th>
                            <td>
                                <label class="input_radio" for="rdoSolar1">
                                    <input type="radio" id="rdoSolar1" name="birthday_type2" value="Y" v-model="detailObj.useYn">
                                    <span class="label_text">Y</span>
                                </label>
                                <label class="input_radio" for="rdoSolar2">
                                    <input type="radio" id="rdoSolar2" name="birthday_type2" value="N" v-model="detailObj.useYn">
                                    <span class="label_text">N</span>
                                </label>
                            </td>
                            <th><span class="emp_red">정렬 순서</span></th>
                            <td><input type="text" class="form_control" v-model="detailObj.sortOrder"></td>
                        </tr>
                    </tbody>
                </table>
            </div> <!-- // table_normal_list table_write -->
            <div class="submit_area pt20">
                <div class="fr">
                    <button class="btn btn_md btn_darkgray" @click="fnUpdate()">완료</button>
                    <button type="button" class="btn btn_md btn_gray" @click='editYn = false, dataLoad()'>취소</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { sendPostApi, requestOptions } from '@/apis/common';
import API from '@/apis/'

    export default {
        name: 'CodeMngtView',
        mixins: [MsgBoxMixins],
        components: {

        },
        data() {
            return {
                footerBg: 'transparent',
                groupCode:'',
                codeVal:'',
                codeNameKr:'',
                codeNameEn:'',
                explanation:'',
                sortOrder:'',
                useYn:'Y',
                editYn: false,
                detailObj: {
                    groupCode:'',
                    codeVal:'',
                    codeNameKr:'',
                    codeNameEn:'',
                    explanation:'',
                    sortOrder:'',
                    useYn:'Y',
                },
            }
        },
        props:{
            masterCodeId:{
                type:Number,
                default: 0,
            },
        },
        mounted() {
            if(this.masterCodeId == null || this.masterCodeId == '' || this.masterCodeId ==0){
                // console.log('dd');
                this.$router.push({
                    name : 'CodeMngtTab',
                });
                return;
            }else{
                this.dataLoad();
            }
        },
        beforeDestroy() {
            
        },

        methods: {
            dataLoad: async function(){
                // console.log(this.masterCodeId);
                let param = {
                    'masterCodeId':this.masterCodeId,
                    'useYn':'Y',
                };
                let rst = await API.crack.selectMasterCode(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log(rst);
                if(rst.status == 200){
                    this.detailObj = rst.data.data; 
                }
            },
            changeEdit: async function(){
                this.editYn = true;

            },
            fnUnuse: async function(){
                let param = this.detailObj;
                this.confirm('삭제하시겠습니까?', async()=>{
                    param.useYn = 'N';
                    param.delYn = 'Y';
                    let rst = await API.crack.masterCodeChange(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    // console.log(rst);
                    if(rst.data.rCode == '0000'){
                        this.alert('삭제되었습니다.',async() =>{
                            this.$router.push({
                                name : 'CodeMngtTab',
                            });
                        });
                    }else{
                        this.alert('오류로 인해 삭제되지 않았습니다.');
                    }
                });
            },
            fnUpdate: async function(){
                if(this.detailObj.groupCode == '' || this.detailObj.groupCode == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                if(this.detailObj.codeNameKr == '' || this.detailObj.codeNameKr == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                if(this.detailObj.codeNameEn == '' || this.detailObj.codeNameEn == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                if(this.detailObj.codeVal == '' || this.detailObj.codeVal == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                if(this.detailObj.useYn == '' || this.detailObj.useYn == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                this.detailObj.sortOrder = parseInt(this.detailObj.sortOrder);
                
                if(this.detailObj.sortOrder == '' || this.detailObj.sortOrder == null ||isNaN(this.detailObj.sortOrder)){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }

                this.detailObj.delYn = 'N';
                
                let rst = await API.crack.masterCodeChange(this.detailObj,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                
                // console.log(rst);
                if(rst.data.rCode == '0000'){
                    this.alert('수정되었습니다.',async() =>{
                        this.editYn = false;
                    });
                }else{
                    this.alert('오류로 인해 저장되지 않았습니다.');
                }
            },
            
            fnBack: function(){
                this.$router.push({
                    name : 'CodeMngtTab',
                });
            },
        },
        
   }
</script>