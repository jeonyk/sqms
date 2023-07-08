<template>
    <div class="tab_contents">
        <h2 class="sub_title">메뉴관리 &gt; 코드 등록</h2>
        <div class="inner">
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
                            <td colspan="3"><input type="text" class="form_control xlarge" v-model="groupCode"></td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">코드</span></th>
                            <td colspan="3"><input type="text" class="form_control xlarge" v-model="codeVal"></td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">코드명(국문)</span></th>
                            <td><input type="text" class="form_control" v-model="codeNameKr"></td>
                            <th><span class="emp_red">코드명(영문)</span></th>
                            <td><input type="text" class="form_control" v-model="codeNameEn"></td>
                        </tr>
                        <tr>
                            <th><span class="">비고</span></th>
                            <td colspan="3"><textarea name="" id="" class="form_control" v-model="explanation"></textarea></td>
                        </tr>
                        <tr>
                            <th><span class="emp_red">사용여부</span></th>
                            <td>
                                <label class="input_radio" for="rdoSolar1">
                                    <input type="radio" id="rdoSolar1" name="birthday_type2" value="Y" v-model="useYn">
                                    <span class="label_text">Y</span>
                                </label>
                                <label class="input_radio" for="rdoSolar2">
                                    <input type="radio" id="rdoSolar2" name="birthday_type2" value="N" v-model="useYn">
                                    <span class="label_text">N</span>
                                </label>
                            </td>
                            <th><span class="emp_red">정렬 순서</span></th>
                            <td><input type="text" class="form_control" v-model="sortOrder"></td>
                        </tr>
                    </tbody>
                </table>
            </div> <!-- // table_normal_list table_write -->
            <div class="submit_area pt20 ar">
                <button class="btn btn_md btn_darkgray" @click="fnSave">등록</button>
                <button type="button" class="btn btn_md btn_gray" @click="goList">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { sendPostApi, requestOptions } from '@/apis/common';
import API from '@/apis/'

    export default {
        name: 'CodeMngtWrite',
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
            }
        },
        mounted() {
            

        },
        beforeDestroy() {
            
        },

        methods: {
            goList: function(){
                this.confirm('취소하시겠습니까?', async() =>{
                    this.$router.push({
                        name : 'CodeMngtTab',
                    });
                });
            },
            fnSave: async function(){
                if(this.groupCode == '' || this.groupCode == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                if(this.codeNameKr == '' || this.codeNameKr == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                if(this.codeNameEn == '' || this.codeNameEn == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                if(this.codeVal == '' || this.codeVal == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                if(this.useYn == '' || this.useYn == null){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }
                this.sortOrder = parseInt(this.sortOrder);
                
                if(this.sortOrder == '' || this.sortOrder == null ||isNaN(this.sortOrder)){
                    this.alert('필수 입력 값이 입력되지 않았습니다.');
                    return;
                }

                let param ={
                    'groupCode':this.groupCode,
                    'codeVal':this.codeVal,
                    'codeNameKr':this.codeNameKr,
                    'codeNameEn':this.codeNameEn,
                    'explanation':this.explanation,
                    'useYn':this.useYn,
                    'sortOrder':this.sortOrder,
                };
                let rst = await API.crack.masterCodeWrite(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log('afterWrite',rst);
                if(rst.data.rCode == '0000'){
                    this.alert('등록 되었습니다.',async() =>{
                        this.$router.push({
                            name : 'CodeMngtTab',
                        });
                    });
                }else{
                    this.alert('오류로 인해 등록되지 않았습니다.');
                }
            },
        },
        
   }
</script>